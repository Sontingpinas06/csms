<?php
require_once __DIR__ . '/../middleware.php';

corsHeaders();
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    error_response(405, 'method_not_allowed');
}

$token = get_bearer_token();
if (!$token) {
    error_response(401, 'missing_token');
}

$client = new SupabaseClient();
$resp = $client->logout($token);
$status = $resp['status'] ?? 500;
if ($status >= 300) {
    error_response($status, 'logout_failed', $resp);
}

json_response(200, ['ok' => true]);