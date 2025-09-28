<?php
require_once __DIR__ . '/../middleware.php';

corsHeaders();
if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    error_response(405, 'method_not_allowed');
}

$user = require_auth();
json_response(200, ['user' => $user]);