<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CaseActivity extends Model
{
    use HasFactory;

    protected $fillable = [
        'case_id',
        'user_id',
        'type',
        'title',
        'description',
        'metadata',
    ];

    protected $casts = [
        'metadata' => 'array',
    ];

    public function socialCase()
    {
        return $this->belongsTo(SocialCase::class, 'case_id');
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
