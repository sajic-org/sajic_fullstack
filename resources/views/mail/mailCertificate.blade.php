<x-mail::message>
# Obrigado por participar

Clique no botão abaixo para acessar seu certificado!

<x-mail::button :url="$url">
Acessar certificado
</x-mail::button>

(você também pode acessar todos seus certificado pelo site)

Agradeçemos sua participação,<br>
{{ config('app.name') }}
</x-mail::message>
