<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FamilyMember extends Model
{
    use HasFactory;

    protected $fillable = [
        'case_id',
        'name',
        'national_id',
        'relationship',
        'age',
        'medical_condition',
    ];

    public function socialCase()
    {
        return $this->belongsTo(SocialCase::class, 'case_id');
    }
}
