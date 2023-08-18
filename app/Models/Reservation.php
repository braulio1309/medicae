<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Reservation extends Model
{
    use HasFactory;

    protected $fillable = [
        'id', 'turnId', 'date', 'user_id', 'canceled', 'note'
    ];

    public function appointment()
    {
        return $this->belongsTo(Appointment::class, 'turnId');
    }
    
    public function patient()
    {
        return $this->belongsTo(User::class, 'user_id');
    }


}
