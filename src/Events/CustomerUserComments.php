<?php

namespace App\Events;

use ApiPlatform\Symfony\EventListener\EventPriorities;
use App\Entity\Commentaire;
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpKernel\Event\ViewEvent;
use Symfony\Component\HttpKernel\KernelEvents;

class CustomerUserComments implements EventSubscriberInterface
{

        private $sécurity;


        public function __construct(Security $sécurity)
        {
                $this->sécurity = $sécurity;
        }

        public static function getSubscribedEvents()
        {
                return [
                        KernelEvents::VIEW => ['setUserForComment', EventPriorities::PRE_VALIDATE]
                ];
        }
        public function setUserForComment(ViewEvent $event)
        {
                $result = $event->getControllerResult();
                $method = $event->getRequest()->getMethod();
               

                if ($result instanceof Commentaire && $method === 'POST') {
                        $user = $this->sécurity->getUser();
                        $result->setUser($user);

                }
        }
}
