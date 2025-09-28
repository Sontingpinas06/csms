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

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    error_response(422, 'invalid_email');
}

$client = new SupabaseClient();
$resp = $client->login($email, $password);
$status = $resp['status'] ?? 500;
if ($status >= 300) {
    error_response($status, 'login_failed', $resp);
}

json_response(200, $resp['data']);