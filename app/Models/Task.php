<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'case_id',
        'user_id',
        'created_by',
        'priority',
        'status',
        'due_date',
        'updates',
        'attachments',
    ];

    protected $casts = [
        'due_date' => 'date',
    ];

    public function socialCase()
    {
        return $this->belongsTo(SocialCase::class, 'case_id');
    }

    public function assignedEmployee()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function creator()
    {
        return $this->belongsTo(User::class, 'created_by');
    }
}
