<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Appointment extends Model
{

    protected $dates = ['deleted_at'];

    protected $fillable = [
        'id', 'user_id', 'day', 'time'
    ];

    public function doctor()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

}
