<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;


class AuthController extends Controller
{
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'unique:users',

        ]);

        if ($validator->fails()) {
            return response()->json([
                'error' => true,
            ], 404);
        } else {
            User::create([
                'email' => $request->email,
                'name' => $request->firstName,
                'password' => $request->password,
            ]);
            return response()->json([
                'success' => true,
            ], 200);
        }
    }
}
