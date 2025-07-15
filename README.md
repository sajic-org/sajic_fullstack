# Sajic Fullstack – Laravel + InertiaJS

## Sumário

- [Visão Geral do Projeto](#visão-geral-do-projeto)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Estrutura de Pastas](#estrutura-de-pastas)
- [Integração com InertiaJS](#integração-com-inertiajs)
- [Rotas](#rotas)
- [Controllers e Middleware](#controllers-e-middleware)
- [Estrutura do Front-End](#estrutura-do-front-end)
- [Dados Compartilhados e Autenticação](#dados-compartilhados-e-autenticação)
- [Desenvolvimento](#desenvolvimento)
- [Testes](#testes)
- [Licença](#licença)

---

## Visão Geral do Projeto

Esta aplicação gerencia inscrições em palestras, controle de presença e geração/envio de certificados para o evento Sajic. O sistema é composto por um back-end Laravel, front-end 100% Inertia/React e utiliza SSR opcional para SEO. O fluxo principal é:

- O usuário se inscreve em palestras.
- No dia do evento, um admin realiza o check-in dos presentes.
- O certificado é gerado e enviado por e-mail automaticamente após o check-in. O usuário também pode acessar seu certificado a qualquer momento pelo perfil.
- O usuário pode cancelar e reinscrever em palestras enquanto houver vagas.

Existem dois perfis de usuário:
- **Usuário comum:** pode se inscrever/cancelar em palestras, acessar certificados.
- **Admin:** pode criar/editar/remover palestras e palestrantes, fazer check-in, reabrir palestras lotadas, visualizar lista pública de presenças.

A lista de presença dos professores é pública (acessível apenas por link direto, não listada no site) e serve para informar à faculdade quem esteve presente no evento.

---

## Tecnologias Utilizadas

- **Backend:** Laravel (PHP)
- **SPA Bridge:** InertiaJS
- **Frontend:** React (TypeScript)
- **Build Tools:** Vite, Node.js
- **SSR:** Opcional, ativado para SEO, comandos artisan para start/stop
- **Banco de dados:** Neon (Postgres), configurável via `.env`
- **E-mail:** AWS SES
- **Infraestrutura:** AWS EC2 (Amazon Linux), Nginx + FastCGI, Cloudflare DNS/Proxy
- **Outros:** Ziggy (rotas JS), geração de PDF on demand

---

## Estrutura de Pastas

```
app/
  Http/
    Controllers/        # Controllers do Laravel (inscrições, check-in, certificados)
    Middleware/         # Middleware do Inertia
  Models/               # Modelos Eloquent

config/
  inertia.php           # Configuração do InertiaJS

resources/
  js/                   # SPA em React/TypeScript
    app.tsx             # Ponto de entrada
    pages/              # Páginas Inertia
    components/         # Componentes reutilizáveis
    layouts/            # Layouts globais
    ssr.tsx             # Entrypoint do SSR

views/                  # Blade (apenas root)
routes/
  web.php, admin.php, auth.php, settings.php
```

---

## Integração com InertiaJS

- **Middleware:** `app/Http/Middleware/HandleInertiaRequests.php` compartilha dados globais (usuário autenticado, mensagens flash, rotas Ziggy).
- **Controllers:** Usam `Inertia::render()` para entregar páginas React com dados do backend.
- **SPA:** `resources/js/app.tsx` é o ponto de entrada do front-end.
- **SSR:** Opcional, melhora SEO. Build via `npm run build:ssr`. Comandos: `php artisan start-ssr` / `php artisan stop-ssr`. Não é obrigatório para funcionamento do sistema.

---

## Rotas

- **Backend:**
  - Definidas em `routes/` (`web.php`, `admin.php`, `auth.php`, `settings.php`).
  - Exemplo:
    ```php
    Route::get('/palestras', [LectureController::class, 'index'])->name('lectures.index');
    ```
- **Frontend:**
  - Cada rota mapeia para uma página React em `resources/js/pages/`.
  - Ziggy permite uso de rotas nomeadas no JS.

---

## Controllers e Middleware

- **Controllers:**
  - `LectureController`: Inscrições, listagem, check-in, reabertura de palestras.
  - `UserController`: Certificados, cancelamento de inscrição.
  - `Auth/AuthenticatedSessionController`: Login/logout.
  - `Settings/ProfileController`: Perfil do usuário.
- **Middleware:**
  - `HandleInertiaRequests` compartilha dados globais (usuário, flash, Ziggy).
  - Middleware de autenticação protege rotas de admin e usuário logado.

---

## Estrutura do Front-End

- **Pages:** Cada arquivo em `resources/js/pages/` é uma página Inertia.
- **Components:** Componentes React reutilizáveis.
- **Layouts:** Layouts globais para páginas.

---

## Dados Compartilhados e Autenticação

- **Shared Props:**
  - Definidas no middleware `HandleInertiaRequests`.
  - Disponíveis em todas as páginas via hook `usePage()` no React.
  - Incluem:
    - `auth.user`: Usuário autenticado
    - `flash`: Mensagens flash
    - `ziggy`: Rotas nomeadas para JS
- **Autenticação:**
  - Padrão do Laravel (sessions/cookies), controlada por middleware.

---

## Desenvolvimento

### Pré-requisitos

- PHP, Composer
- Node.js, npm
- Banco de dados Postgres (Neon)

### Setup

1. **Instale as dependências PHP:**
   ```bash
   composer install
   ```
2. **Instale as dependências JS:**
   ```bash
   npm install
   ```
3. **Copie o arquivo de ambiente:**
   ```bash
   cp .env.example .env
   ```
   Configure banco, e-mail (AWS SES), e outras variáveis conforme necessário.
4. **Gere a chave da aplicação:**
   ```bash
   php artisan key:generate
   ```
5. **Rode as migrations:**
   ```bash
   php artisan migrate
   ```
6. **Compile os assets (dev):**
   ```bash
   npm run dev
   ```
7. **Build para produção (SPA + SSR):**
   ```bash
   npm run build:ssr
   ```
8. **Suba o servidor da aplicação:**
   ```bash
   php artisan serve
   ```
9. **(Opcional) Inicie/parar SSR:**
   ```bash
   php artisan start-ssr
   php artisan stop-ssr
   ```

---

## Testes

- **PHPUnit:**
  ```bash
  php artisan test
  ```

---

## Licença

See [LICENSE](LICENSE) file.
