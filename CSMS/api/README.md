Backend (PHP + Supabase)

Overview
- Provides secure authentication and role-based access control backed by Supabase.
- Exposes JSON endpoints for login, registration, logout, password recovery, and user profile.

Structure
- `config.php`: Loads environment from `.env` and sets CORS headers.
- `lib/SupabaseClient.php`: Minimal client for Supabase Auth and PostgREST.
- `middleware.php`: JSON response helpers, bearer token parsing, `require_auth`, `require_role`.
- `auth/*`: Auth endpoints (`register.php`, `login.php`, `logout.php`, `password_reset.php`, `me.php`).

Environment (`.env`)
```
SUPABASE_URL=https://your-project-ref.supabase.co
SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
ALLOW_ORIGIN=http://localhost:8000
PASSWORD_RESET_REDIRECT=http://localhost:8000/login.html
```

Endpoints
- `POST auth/register.php` body: `{ email, password, role? }` (role: `Admin` or `Teacher`, defaults to `Teacher`).
- `POST auth/login.php` body: `{ email, password }` → returns `{ access_token, refresh_token, user }`.
- `POST auth/logout.php` header: `Authorization: Bearer <access_token>`.
- `POST auth/password_reset.php` body: `{ email }` → triggers Supabase email reset.
- `GET auth/me.php` header: `Authorization: Bearer <access_token>` → returns current user.

Hosting
- Serve `/api` via PHP (Apache or Nginx + PHP-FPM). Ensure `.env` is present.
- Serve static frontend from project root. Point frontend to `/api/auth/*` endpoints.

Security
- Never expose `SUPABASE_SERVICE_ROLE_KEY` to the browser.
- Use CORS `ALLOW_ORIGIN` to restrict requests to your domain.
- Validate inputs server-side; endpoints already enforce required fields and email format.
- Prefer user-scoped operations with RLS using `access_token` where possible; reserve service role for admin tasks.