<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use DB;
class CollectionController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
     public function index()
    {
        $data = DB::table('assets')
        ->select('assets.title',"assets.id",'assets.description','assets.price','categories.title as name_category','assets.status','username')
        ->selectRaw("DATE_FORMAT(assets.created_at, '%d %b %Y %H:%i') as created_at")
        ->join('users','assets.id_seller','users.id')
        ->join('categories','assets.id_category','categories.id')
        ;

        if(Request()->category)$data->where('categories.title',Request()->category);
        if(Request()->status)$data->where('assets.status',Request()->status);

        if(Request()->has("q")){
           
            $data->where('assets.title',"like","%".Request()->q."%");
            if(Request()->has('filter')) $data->where('status',Request()->filter);

        }
        $data = $data->paginate(10);
        $categories = DB::table('categories')->get();
        return response()->json(['status'=>200,'data'=>$data,"categories"=>$categories]);
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
            "description"=>'required',
            'image'=>'required'
        ]);
       
        $image = Request()->file("image");
        // $name = time().$image->getClientOriginalName();
        // $image->move(public_path(),"s");

        DB::table('assets')->insert([
            'title'=>Request()->title,
            'description'=>Request()->description,
            'imageUrl'=>Request()->image,
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
        $data = DB::table('assets')->where('id',$id)->first();
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

        DB::table('assets')->where('id',$id)->update([
          'status'=>Request()->status
        ]);

        return response()->json(['status'=>200,'pesan'=>'Berhasil Mengedit Collection']);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        DB::table('assets')->where('id',$id)->delete();
        return response()->json(['status'=>200,'pesan'=>'Berhasil Menghapus Kategori']);

    }
}
