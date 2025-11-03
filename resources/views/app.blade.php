<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="google-site-verification" content="Wc38Tm1PSS0l8qOj6Ror2NgGpVViCesxVwLBp_aHljw" />

        <title inertia>{{ config('app.name', 'Laravel') }}</title>
        @inertiaHead

        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Instrument+Sans:ital,wght@0,400..600;1,400..700&display=swap" rel="stylesheet">

        <link rel="icon" href="{{ asset('favicon.ico') }}" type="image/ico">

        <meta
            name="description"
            content="Semana Acadêmica | Jornada de Iniciação Científica "
        />
        <meta
            property="og:url"
            content="https://sathon.com.br/"
        />
        <meta
            property="og:type"
            content="website"
        />
        <meta
            property="og:title"
            content="SATHON 2025"
        />
        <meta
            property="og:description"
            content="Semana Acadêmica | Jornada de Iniciação Científica "
        />
        <meta
            property="og:image"
            content="https://sathon.com.br/favicon.ico"
        />

        <meta
            name="twitter:card"
            content="summary_large_image"
        />
        <meta
            property="twitter:domain"
            content="sathon.com.br"
        />
        <meta
            property="twitter:url"
            content="https://sathon.com.br/"
        />
        <meta
            name="twitter:title"
            content="SATHON 2025"
        />
        <meta
            name="twitter:description"
            content="Semana Acadêmica | Jornada de Iniciação Científica "
        />
        <meta
            name="twitter:image"
            content="https://sathon.com.br/favicon.ico"
        />

        @routes
        @viteReactRefresh
        @vite(['resources/js/app.tsx', "resources/js/pages/{$page['component']}.tsx"])
    </head>

    <body class="font-sans antialiased">
        @inertia
    </body>

</html>
