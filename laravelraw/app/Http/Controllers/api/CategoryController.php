<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use DB;
class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $data = DB::table('categories')->paginate(10);
        if(Request()->has("q")){
            $data = DB::table('categories')
            ->where('title',"like","%".Request()->q."%")
            ->paginate(10);
        }

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
            "title"=>'required|unique:categories,title',
            "description"=>'required',
            'image'=>'required'
        ]);
       
        $image = Request()->file("image");
        $name = time().$image->getClientOriginalName();
        $image->move(public_path("/image"),$name);

        DB::table('categories')->insert([
            'title'=>Request()->title,
            'description'=>Request()->description,
            'imageUrl'=>$name,
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
        $data = DB::table('categories')->where('id',$id)->first();
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
            "title"=>'required',
            "description"=>'required',
        ]);

        if (Request()->has('image')) {
            Request()->validate([
                'image'=>'mime:png,jpg,jpeg'
            ]);
        }

        DB::table('categories')->where('id',$id)->update([
            'title'=>Request()->title,
            'description'=>Request()->description,
            'imageUrl'=>Request()->image,
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
        DB::table('categories')->where('id',$id)->delete();
        return response()->json(['status'=>200,'pesan'=>'Berhasil Menghapus Kategori']);

    }
}
