<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use DB;
use Hash;
class AuthController extends Controller
{
    public function login(Type $var = null)
    {
    
       Request()->validate([
        'username'=>'required',
        'password'=>'required'
       ]);
     
       $user = DB::table("users")->where("username",Request()->username)->first();
       if ($user) {
      
        try {
       
         if (Request()->password . "merdeka" === decrypt($user->password)) {
            return response()->json([
               'status'=>200,
               'pesan'=>"Berhasil Login",
               'user'=>$user
              ]);
         }else{
            return response()->json([
               'status'=>401,
               'pesan'=>"Username atau password salah",
              ]);
         }
        } catch (\Throwable $th) {
         $data  = [
            "username"=>Request()->username,
            "password"=>Request()->password . "merdeka",
         ];
         if (Auth::attempt($data)) {
            return response()->json([
            'status'=>200,
            'pesan'=>"Berhasil Login",
            'user'=>Auth()->user()
           ]);
        }else{
             return response()->json([
            'status'=>401,
            'pesan'=>"Username atau password salah",
           ]);
      }
        }

            
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
        'password'=>encrypt(Request()->password . "merdeka"),
        'email'=>Request()->email,
    ]);
   //  $id =DB::table('users')->insertGetId([
   //       'username'=>Request()->username,
   //      'password'=>Hash::make(Request()->password),
   //      'email'=>Request()->email,
   //  ]);

     return response()->json([
        'status'=>200,
        'pesan'=>"Berhasil Mendaftar",
        'user'=>DB::table('users')->where('id',$id)->first()
       ]);
    }
    public function forgetPassword()
    {
      $ada = DB::table("users")->where("email",Request()->email)->first();

      if ($ada) {
    
         if (Request()->has("newPassword")) {
            DB::table("users")->where("email",Request()->email)->update(["password"=>Hash::make(Request()->newPassword . "merdeka")]);
           return response()->json([
              'status'=>200,
              'pesan'=>"Berhasil Mengganti Password",
             ]);
         }
         return response()->json([
            'status'=>200,
            'pesan'=>"Email terdaftar",
            'pesan'=>Request()->email,
           ]);
           
      }else{
         return response()->json([
            'status'=>401,
            'pesan'=>"Email tidak ada",
           ]);
      }

      
    }
   
}
