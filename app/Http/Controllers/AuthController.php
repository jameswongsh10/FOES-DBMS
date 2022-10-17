<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use PHPOpenSourceSaver\JWTAuth\JWTAuth;

class AuthController extends Controller
{
//    public function __construct()
//    {
//        $this->middleware('auth:api', ['except' => ['login']]);
//    }

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
                'message' => 'Invalid email or password',
            ], 401);
        }

        $user = Auth::user();
        return response()->json([
            'status' => true,
            'isSuperAdmin' => $user['isSuperAdmin'],
            'token' => $token,
            'type' => 'bearer',
            'exp' => time() + auth()->factory()->getTTL() * 60,
        ]);
    }

    public function logout()
    {
        if (Auth::check()) {
            Auth::logout();
            return response()->json([
                'status' => true,
                'message' => 'Successfully logged out',
            ]);
        }
        return response()->json([
            'status' => false,
            'message' => "Unauthorized user"
        ], 401);
    }

    public function refresh()
    {
        if (Auth::check()) {
            return response()->json([
                'status' => true,
                'user' => Auth::user(),
                'token' => Auth::refresh(),
                'type' => 'bearer',
                'exp' => time() + auth()->factory()->getTTL() * 60
            ]);
        }
        return response()->json([
            'status' => false,
            'message' => "Unauthorized user"
        ], 401);
    }
}
