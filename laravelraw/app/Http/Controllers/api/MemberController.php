<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use DB;
class MemberController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
  public function index()
    {
        $data = DB::table('users')
                ->selectRaw("users.*,DATE_FORMAT(users.created_at, '%d %b %Y %H:%i') as created_at")
                ->where('role','member');

        if(Request()->has('filter'))$data->where('status',Request()->filter);

        if(Request()->has("q")){
               $data->where('username',"like","%".Request()->q."%");
               $data->orWhere('email',"like","%".Request()->q."%");
               if(Request()->has('filter')) $data->where('status',Request()->filter);
        }

       $data =  $data->paginate(10);
    

        return response()->json(['status'=>200,compact('data')]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        Request()->validate([
            "status"=>'required',
            "email"=>'required|unique:users,email',
            'password'=>'required|min:6',
        ]);
        DB::table('users')->insert([
            'username'=>Request()->username,
            'email'=>Request()->email,
            'password'=>Request()->password,
        ]);

        return response()->json(['status'=>200,'pesan'=>'Berhasil Menambah Kategori']);

    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $data = DB::table('users')->where('id',$id)->first();
        return response()->json(['status'=>200,compact('data')]);

    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        Request()->validate([
            "status"=>'required',
        ]);

      

        DB::table('users')->where('id',$id)->update([
            'status'=>Request()->status ,
        ]);

        return response()->json(['status'=>200,'pesan'=>'Berhasil Mengedit Kategori']);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        DB::table('users')->where('id',$id)->delete();
        return response()->json(['status'=>200,'pesan'=>'Berhasil Menghapus Kategori']);

    }
}
