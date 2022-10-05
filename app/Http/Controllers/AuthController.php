<?php

namespace App\Http\Controllers;

use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;
use Symfony\Component\Routing\Exception\RouteNotFoundException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;


class AuthController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['login']]);
    }

    public function login()
    {
        $data = json_decode(file_get_contents('php://input'), true);

        $credentials = [];

        foreach ($data as $key => $value) {
            $credentials[$key] = $value;
        }

        $token = Auth::attempt($credentials);
        if (!$token) {
            return response()->json([
                'status' => false,
                'message' => 'Unauthorized',
            ], 401);
        }

        $user = Auth::user();
        return response()->json([
            'status' => true,
            'isSuperAdmin' => $user['isSuperAdmin'],
            'token' => $token,
            'expires_in' => auth('api')->factory()->getTTL() * 60,
            'type' => 'bearer',
        ]);
    }

    public function logout()
    {
        try {
            Auth::logout();
            return response()->json([
                'status' => true,
                'message' => 'Successfully logged out'
            ]);
        } catch(AccessDeniedHttpException $e) {
            return response()->json([
                'status' => false,
                'message' => $e
            ]);
        }

    }

    public function refresh()
    {
        return response()->json([
            'status' => 'success',
            'user' => Auth::user(),
            'authorisation' => [
                'token' => Auth::refresh(),
                'type' => 'bearer',
            ]
        ]);
    }
}
