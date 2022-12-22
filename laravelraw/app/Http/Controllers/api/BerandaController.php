<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use DB;
use Hash;
class BerandaController extends Controller
{
    public function index()
    {
       $trending = DB::table('assets')
        ->select('assets.title','assets.id','assets.description','assets.price','categories.title as name_category','assets.status','username','assets.imageUrl')
        ->selectRaw("DATE_FORMAT(assets.created_at, '%d %b %Y %H:%i') as created_at")
        ->join('users','assets.id_seller','users.id')
        ->join('transaction','assets.id','transaction.id_asset')
        ->join('categories','assets.id_category','categories.id')
        ->limit(10)
        ->whereRaw('week(transaction.created_at) = '.date('W'))
        ->where('assets.status','active')
        ->groupBy('assets.id')
        ->orderByRaw('count(transaction.id) DESC')
        ->get();

        $arrayCollectCategory = [];

        $category = DB::table('categories')->limit(5)->get();
        
        foreach ($category as $cat) {
            $arrayCollectCategory[] = [
                "id"=>$cat->id,
                "title"=>$cat->title,
                "description"=>$cat->description,
                "imageUrl   "=>$cat->imageUrl,
                "items"=>DB::table('assets')
                ->select("assets.*")
                ->join('users','assets.id_seller','users.id')
                ->where('id_category',$cat->id)
                ->where('assets.status','active')
                ->limit(6)
                ->get()
            ];
        }


        return response()->json(['status'=>200,'trending'=>$trending,'categoryCollect'=>$arrayCollectCategory]);
    }


    public function detail()
    {
       

        $detail =DB::table('assets')->where('id',Request()->id)->first();
       
        $arrayDetail = [
           "id"=> $detail->id,
            "title"=> $detail->title,
            "description"=>  $detail->description,
            "price"=>  $detail->price,
            "created_at"=>  $detail->created_at,
            "imageUrl"=> $detail->imageUrl,
            "status"=> "active",
            "status"=> $detail->status,
        "categories"=> $category = DB::table('categories')->where('id',$detail->id_category)->first()
        ];


        
        return response()->json(['status'=>200,"data"=>$arrayDetail]);



    }

    public function search()
    {
      $serachData =  DB::table('assets')
        ->select('assets.title','assets.id','assets.description','assets.price','categories.title as name_category','assets.status','username','assets.imageUrl')
        ->selectRaw("DATE_FORMAT(assets.created_at, '%d %b %Y %H:%i') as created_at")
        ->join('users','assets.id_seller','users.id')
        ->leftJoin('transaction','assets.id','transaction.id_asset')
        ->join('categories','assets.id_category','categories.id')
        ->limit(10)
        ->where('assets.status','active')
        ->where('assets.title','like',"%".Request()->q."%")
        ->orWhere('assets.description','like',"%".Request()->q."%")
        ->orWhere('categories.title','like',"%".Request()->q."%")
        ->groupBy('assets.id')
        ->orderByRaw('count(transaction.id) DESC')
        ->get();



        return response()->json(['status'=>200,"data"=>$serachData]);
    }

}
