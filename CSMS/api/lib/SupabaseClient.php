<?php
require_once __DIR__ . '/../config.php';

class SupabaseClient
{
    private string $baseUrl;
    private string $anonKey;
    private string $serviceRoleKey;

    public function __construct()
    {
        $this->baseUrl = rtrim(SUPABASE_URL, '/');
        $this->anonKey = SUPABASE_ANON_KEY;
        $this->serviceRoleKey = SUPABASE_SERVICE_ROLE_KEY;
    }

    private function request(string $method, string $url, array $headers = [], $body = null): array
    {
        $ch = curl_init($url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, $method);
        if ($body !== null) {
            $json = is_string($body) ? $body : json_encode($body);
            curl_setopt($ch, CURLOPT_POSTFIELDS, $json);
            $headers[] = 'Content-Type: application/json';
        }
        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);

        $response = curl_exec($ch);
        $status = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        $err = curl_error($ch);
        curl_close($ch);

        if ($err) {
            return ['status' => 500, 'error' => 'curl_error', 'message' => $err];
        }

        $data = json_decode($response, true);
        if ($data === null && $response !== '' && $response !== false) {
            $data = ['raw' => $response];
        }
        return ['status' => $status, 'data' => $data];
    }

    // Auth endpoints
    public function signup(string $email, string $password, array $userMetadata = []): array
    {
        $url = $this->baseUrl . '/auth/v1/signup';
        $headers = [
            'apikey: ' . $this->anonKey,
        ];
        $payload = [
            'email' => $email,
            'password' => $password,
            'data' => $userMetadata,
        ];
        return $this->request('POST', $url, $headers, $payload);
    }

    public function login(string $email, string $password): array
    {
        $url = $this->baseUrl . '/auth/v1/token?grant_type=password';
        $headers = [
            'apikey: ' . $this->anonKey,
        ];
        $payload = [
            'email' => $email,
            'password' => $password,
        ];
        return $this->request('POST', $url, $headers, $payload);
    }

    public function logout(string $accessToken): array
    {
        $url = $this->baseUrl . '/auth/v1/logout';
        $headers = [
            'apikey: ' . $this->anonKey,
            'Authorization: Bearer ' . $accessToken,
        ];
        return $this->request('POST', $url, $headers);
    }

    public function recover(string $email, ?string $redirectTo = null): array
    {
        $url = $this->baseUrl . '/auth/v1/recover';
        $headers = [
            'apikey: ' . $this->anonKey,
        ];
        $payload = ['email' => $email];
        if ($redirectTo) {
            $payload['redirect_to'] = $redirectTo;
        }
        return $this->request('POST', $url, $headers, $payload);
    }

    public function user(string $accessToken): array
    {
        $url = $this->baseUrl . '/auth/v1/user';
        $headers = [
            'apikey: ' . $this->anonKey,
            'Authorization: Bearer ' . $accessToken,
        ];
        return $this->request('GET', $url, $headers);
    }

    // PostgREST helpers
    public function rest(string $path, string $method = 'GET', array $headers = [], $body = null): array
    {
        $url = $this->baseUrl . '/rest/v1/' . ltrim($path, '/');
        $defaultHeaders = ['apikey: ' . $this->serviceRoleKey];
        $headers = array_merge($defaultHeaders, $headers);
        return $this->request($method, $url, $headers, $body);
    }
}