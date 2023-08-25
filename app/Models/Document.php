<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Document extends Model
{
    protected $fillable = ['name', 'path', 'userId','reservation_id'];

   
   public function reservation()
   {
       return $this->belongsTo(Reservation::class, 'reservation_id');
   }
   
}

?>