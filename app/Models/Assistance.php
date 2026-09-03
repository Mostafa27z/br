<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Assistance extends Model
{
    use HasFactory;

    protected $fillable = [
        'case_id',
        'user_id',
        'type',
        'description',
        'amount',
        'date',
        'attachments',
    ];

    protected $casts = [
        'date' => 'date',
        'amount' => 'decimal:2',
    ];

    public function socialCase()
    {
        return $this->belongsTo(SocialCase::class, 'case_id');
    }

    public function employee()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
