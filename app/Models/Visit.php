<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Visit extends Model
{
    use HasFactory;

    protected $fillable = [
        'case_id',
        'user_id',
        'visit_date',
        'status',
        'notes',
    ];

    protected $casts = [
        'visit_date' => 'date',
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
