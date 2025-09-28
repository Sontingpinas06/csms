<?php
// Simple .env loader and configuration access

function loadEnv($path)
{
    static $loaded = false;
    if ($loaded) return;
    if (!file_exists($path)) return;
    $lines = file($path, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    foreach ($lines as $line) {
        if (str_starts_with(trim($line), '#')) continue;
        [$key, $value] = array_pad(explode('=', $line, 2), 2, null);
        if ($key !== null && $value !== null) {
            // Trim quotes if present
            $value = trim($value);
            $value = trim($value, "\"' ");
            putenv("{$key}={$value}");
        }
    }
    $loaded = true;
}

function env($key, $default = null)
{
    $v = getenv($key);
    return $v !== false ? $v : $default;
}

// Load .env from api/.env if present
loadEnv(__DIR__ . '/.env');

define('SUPABASE_URL', env('SUPABASE_URL', ''));
define('SUPABASE_ANON_KEY', env('SUPABASE_ANON_KEY', ''));
define('SUPABASE_SERVICE_ROLE_KEY', env('SUPABASE_SERVICE_ROLE_KEY', ''));
define('ALLOW_ORIGIN', env('ALLOW_ORIGIN', '*'));
define('PASSWORD_RESET_REDIRECT', env('PASSWORD_RESET_REDIRECT', ''));

if (!function_exists('corsHeaders')) {
    function corsHeaders()
    {
        header('Access-Control-Allow-Origin: ' . ALLOW_ORIGIN);
        header('Access-Control-Allow-Methods: GET, POST, PUT, PATCH, DELETE, OPTIONS');
        header('Access-Control-Allow-Headers: Content-Type, Authorization');
        header('Access-Control-Max-Age: 600');
        if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
            http_response_code(204);
            exit;
        }
    }
}