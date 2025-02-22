<?php

namespace App\Events;

use ApiPlatform\Symfony\EventListener\EventPriorities;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpKernel\Event\ViewEvent;
use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use App\Entity\User;
use Symfony\Component\HttpFoundation\Request as HttpFoundationRequest;

class PasswordEncoderSubscriber  implements EventSubscriberInterface
{
        private UserPasswordHasherInterface $passwordHasher; 

        public function __construct(UserPasswordHasherInterface $passwordHasher)
        {
                $this->passwordHasher = $passwordHasher;
        }

        public static function getSubscribedEvents()
        {
                return [
                        KernelEvents::VIEW => [
                                ['encodePassword', EventPriorities::PRE_WRITE],
                        ]
                ];
        }
        public function encodePassword(ViewEvent $event)
        {
                $result = $event->getControllerResult();
                $method = $event->getRequest()->getMethod();

                if ($result instanceof User && $method === "POST") {
                        $hash = $this->passwordHasher->hashPassword($result, $result->getPassword());
                        $result->setPassword($hash);
                }
        }
}
