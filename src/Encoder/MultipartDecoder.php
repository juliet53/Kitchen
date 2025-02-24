<?php

namespace App\Encoder;

use Symfony\Component\HttpFoundation\RequestStack;
use Symfony\Component\Serializer\Encoder\DecoderInterface;

final class MultipartDecoder implements DecoderInterface
{
    public const FORMAT = 'multipart';

    public function __construct(private readonly RequestStack $requestStack)
    {
    }

    public function decode(string $data, string $format, array $context = []): ?array
    {
        $request = $this->requestStack->getCurrentRequest();

        if (!$request) {
            return null;
        }

        // Récupérer les données du formulaire et les fichiers
        $formData = $request->request->all(); // Récupère les données POST
        $filesData = $request->files->all(); // Récupère les fichiers

        // Combine les données du formulaire et les fichiers
        return array_merge($formData, $filesData);
    }

    public function supportsDecoding(string $format): bool
    {
        return self::FORMAT === $format;
    }
}
