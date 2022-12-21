<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use DB;
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
        ->groupBy('assets.id')
        ->orderByRaw('count(transaction.id) DESC')
        ->get();
        
        $categoryCollectArray = [];

        $categoryCollect = DB::table('assets')
        ->select('assets.title','assets.id','assets.description','assets.price','categories.title as name_category','assets.status','username','assets.imageUrl')
        ->selectRaw("DATE_FORMAT(assets.created_at, '%d %b %Y %H:%i') as created_at")
        ->join('users','assets.id_seller','users.id')
        ->join('transaction','assets.id','transaction.id_asset')
        ->join('categories','assets.id_category','categories.id')
        ->limit(10)
        ->whereRaw('week(transaction.created_at) = '.date('W'))
        ->where('assets.status','active')
        ->groupBy('categories.id')
        ->orderByRaw('count(transaction.id) DESC')
        ->get();

        $arrayCollectCategory = [];

        $category = DB::table('categories')->limit(5)->get();
        
        foreach ($category as $cat) {
            $arrayCollectCategory[] = [
                "title"=>$cat->title,
                "description"=>$cat->description,
                "imageUrl   "=>$cat->imageUrl,
                "items"=>DB::table('assets')->where('id_category',$cat->id)->where('assets.status','active')
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
            "imageUrl"=> "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPkPxu2hJf59E7PUI4SlOXZHmtJkTqO-utb1yXEGVcPagg3ztgfSXg3GJV8sgxfSW9rUwiYw&s",
            "status"=> "active",
        "categories"=> $category = DB::table('categories')->where('id',$detail->id_category)->first()
        ];


        
        return response()->json(['status'=>200,"data"=>$arrayDetail]);



    }


}
