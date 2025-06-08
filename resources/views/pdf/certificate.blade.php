<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Certificado de conclusão</title>
        <style>
            .logo {
                width: 200px;
            }
            .title {
                font-family: Helvetica;
                text-align: center;
            }
            .description {
                font-family: courier;
                text-align: center;
            }
            .link {
                display: block;
                width: 100%;

                color: gray;
                text-align: center;

                position: absolute;
                bottom: 0;
                left: 0;
            }
        </style>
    </head>
    <body>
        <img class="logo" src="/public/assets/logo_preto_com_bg_branco.jpg" alt="Logo da SAJIC"/>
        <h1 class="title">Declaração de participação</h1>
        <p class="description">
            Declaramos para os devidos fins que o aluno <strong>{{ $name }}</strong>,
            participou da palestra <strong>{{ $title }}</strong> da <strong>Semana Acadêmica Jornada de Iniciação
            Científica - SAJIC</strong> em <strong>{{ $date }}/2025</strong> das <strong>{{ $start }}</strong>
            horas até às <strong>{{ $end }}</strong>.
        </p>

        <a class="link" href="https://sajic.marce1in.com.br/certificate/{{ $id }}">
            https://sajic.marce1in.com.br/certificate/{{ $id }}
        </a>

    </body>
</html>
