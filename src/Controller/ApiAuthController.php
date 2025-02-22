<?php

namespace App\Controller;

use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Security\Core\Exception\AuthenticationException;
use Symfony\Component\Routing\Annotation\Route;

class ApiAuthController extends AbstractController
{
        private JWTTokenManagerInterface $jwtManager;

        public function __construct(JWTTokenManagerInterface $jwtManager)
        {
                $this->jwtManager = $jwtManager;
        }

        /**
         * @Route("/api/login_check", name="api_login_check", methods={"POST"})
         */
        public function loginCheck(Request $request)
        {
                // Récupérer les données de la requête JSON (email et mot de passe)
                $data = json_decode($request->getContent(), true);

                if (empty($data['email']) || empty($data['password'])) {
                        throw new AuthenticationException('Email ou mot de passe manquant.');
                }

                // Utilisez la méthode Symfony pour vérifier l'authentification (en fonction de votre configuration de sécurité)
                $user = $this->getUser();

                if (!$user) {
                        throw new AuthenticationException('Utilisateur non trouvé.');
                }

                // Créer un token JWT pour l'utilisateur
                $token = $this->jwtManager->create($user);

                // Retourner le token JWT dans la réponse
                return new JsonResponse([
                        'token' => $token,
                ]);
        }
}
