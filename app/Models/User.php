<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Passport\HasApiTokens;
use App\Models\Document;

class User extends Authenticatable
{
    use HasApiTokens, Notifiable;
    protected $dates = ['deleted_at'];

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'firstname', 'lastname', 'username', 'email', 'password', 'phone', 'status', 'avatar', 
        'role_id','user_id', 'bloodType', 'waiting_for_doctor', 'waiting_for_doctor_selection', 'doctor_options', 'gender',
        'address', 'city', 'birthday', 'zip'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'role_id' => 'integer',
        'statut' => 'integer',
        'doctor_options' => 'array',
    ];

    public function oauthAccessToken()
    {
        return $this->hasMany('\App\Models\OauthAccessToken');
    }

    public function roles()
    {
        return $this->belongsToMany(Role::class);
    }

    public function documents()
    {
        return $this->hasMany(Document::class, 'documents', 'userId', 'id');
    }

    public function assignRole(Role $role)
    {
        return $this->roles()->save($role);
    }

    public function hasRole($role)
    {
        if (is_string($role)) {
            return $this->roles->contains('name', $role);
        }
        return !!$role->intersect($this->roles)->count();
    }

    public function reservations()
    {
        return $this->hasMany(Reservation::class, 'user_id', 'id');
    }

    public function reservations_pending(){
        return $this->hasMany(Reservation::class, 'user_id', 'id')
                     ->where('canceled',0)
                     ->where('date','<',now());

    }
    
    public function reservations_past(){
        return $this->hasMany(Reservation::class, 'user_id', 'id')
                     ->where('canceled',0)
                     ->where('date','>',now());

    }
}
