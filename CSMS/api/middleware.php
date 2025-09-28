<?php
require_once __DIR__ . '/config.php';
require_once __DIR__ . '/lib/SupabaseClient.php';

function json_response(int $status, $data = null)
{
    corsHeaders();
    header('Content-Type: application/json');
    http_response_code($status);
    echo json_encode($data ?? new stdClass(), JSON_UNESCAPED_SLASHES);
    exit;
}

function error_response(int $status, string $message, $details = null)
{
    json_response($status, ['error' => $message, 'details' => $details]);
}

function get_bearer_token(): ?string
{
    $auth = $_SERVER['HTTP_AUTHORIZATION'] ?? $_SERVER['Authorization'] ?? '';
    if (stripos($auth, 'Bearer ') === 0) {
        return trim(substr($auth, 7));
    }
    return null;
}

function require_auth(): array
{
    $token = get_bearer_token();
    if (!$token) {
        error_response(401, 'missing_token');
    }
    $client = new SupabaseClient();
    $result = $client->user($token);
    if (($result['status'] ?? 500) >= 300) {
        error_response(401, 'invalid_token', $result);
    }
    return $result['data'] ?? [];
}

function require_role(array $allowedRoles): array
{
    $user = require_auth();
    $meta = $user['user_metadata'] ?? [];
    $role = $meta['role'] ?? ($user['role'] ?? null);
    if (!$role || !in_array($role, $allowedRoles, true)) {
        error_response(403, 'forbidden_role', ['allowed' => $allowedRoles, 'role' => $role]);
    }
    return $user;
}

function read_json_body(): array
{
    $raw = file_get_contents('php://input');
    $data = json_decode($raw, true);
    if (!is_array($data)) {
        $data = [];
    }
    return $data;
}

function validate_required(array $data, array $fields): array
{
    $errors = [];
    foreach ($fields as $f) {
        if (!isset($data[$f]) || $data[$f] === '') {
            $errors[$f] = 'required';
        }
    }
    return $errors;
}