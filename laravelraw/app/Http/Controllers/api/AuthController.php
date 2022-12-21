<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use DB;
class AuthController extends Controller
{
    public function login(Type $var = null)
    {
       Request()->validate([
        'username'=>'required',
        'password'=>'required'
       ]);

    if (Auth::attempt(Request()->all())) {
        return response()->json([
        'status'=>200,
        'pesan'=>"Berhasil Login",
        'user'=>Auth()->user()
       ]);
    }else{
         return response()->json([
        'status'=>401,
        'pesan'=>"Username atau password salah"
       ]);
    }
    }

    public function signup(Type $var = null)
    {
       Request()->validate([
        'username'=>'required',
        'password'=>'required|min:8',
        'email'=>'required|unique:users,email',
       ]);

    $id =DB::table('users')->insertGetId([
         'username'=>Request()->username,
        'password'=>Request()->password,
        'email'=>Request()->email,
    ]);

     return response()->json([
        'status'=>200,
        'pesan'=>"Berhasil Mendaftar",
        'user'=>DB::table('users')->where('id',$id)->first()
       ]);
    }
    public function logout(Type $var = null)
    {
        # code...
    }
}
