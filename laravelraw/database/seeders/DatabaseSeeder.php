<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use DB;
use Hash;
class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        DB::table('users')->insert([
            'username'=>'admin2',
            "email"=>"admin2@gmail.com",
            "password"=>Hash::make("admin1234merdeka"),
            "role"=>"admin",
            "status"=>"active"
        ]);
    }
}
