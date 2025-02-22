<?php

namespace App\Events;

use ApiPlatform\Symfony\EventListener\EventPriorities;
use App\Entity\Recette;
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpKernel\Event\ViewEvent;
use Symfony\Component\HttpKernel\KernelEvents;

class CustomerUserRecette implements EventSubscriberInterface
{

        private $sécurity;


        public function __construct(Security $sécurity)
        {
                $this->sécurity = $sécurity;
        }

        public static function getSubscribedEvents()
        {
                return [
                        KernelEvents::VIEW => ['setUserForRecette', EventPriorities::PRE_VALIDATE]
                ];
        }
        public function setUserForRecette(ViewEvent $event)
        {
                $result = $event->getControllerResult();
                $method = $event->getRequest()->getMethod();
               

                if ($result instanceof Recette && $method === 'POST') {
                        $user = $this->sécurity->getUser();
                        $result->setUser($user);

                }
        }
}
