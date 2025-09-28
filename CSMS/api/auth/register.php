<?php
require_once __DIR__ . '/../middleware.php';

corsHeaders();
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    error_response(405, 'method_not_allowed');
}

$input = read_json_body();
$errors = validate_required($input, ['email', 'password']);
if ($errors) {
    error_response(422, 'validation_error', $errors);
}

$email = strtolower(trim($input['email']));
$password = (string)$input['password'];
$role = isset($input['role']) ? (string)$input['role'] : 'Teacher';
$allowedRoles = ['Admin','Teacher'];
if (!in_array($role, $allowedRoles, true)) {
    $role = 'Teacher';
}

// Basic input hardening
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    error_response(422, 'invalid_email');
}
if (strlen($password) < 8) {
    error_response(422, 'weak_password', ['min_length' => 8]);
}

$client = new SupabaseClient();
$resp = $client->signup($email, $password, ['role' => $role]);
$status = $resp['status'] ?? 500;
if ($status >= 300) {
    error_response($status, 'signup_failed', $resp);
}

json_response(201, ['user' => $resp['data']]);