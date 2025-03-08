<?php

namespace App\Events;

use Lexik\Bundle\JWTAuthenticationBundle\Event\JWTCreatedEvent;
use Symfony\Component\EventDispatcher\Attribute\AsEventListener;
use Symfony\Component\Security\Core\User\UserInterface;
use App\Entity\User; // 👈 Ajoute cette ligne !

#[AsEventListener(event: 'lexik_jwt_authentication.on_jwt_created', method: 'onJWTCreated')]
class JWTCreatedListener
{
    public function onJWTCreated(JWTCreatedEvent $event)
    {
        $user = $event->getUser();

        if (!$user instanceof User) { // 👈 Vérifie que $user est bien un User
            return;
        }

        // Récupérer les données actuelles du token
        $payload = $event->getData();

        // Ajouter l'ID utilisateur
        $payload['userId'] = $user->getId(); // 🚀 Plus d'erreur ici !

        // Mettre à jour le payload du token
        $event->setData($payload);
    }
}
