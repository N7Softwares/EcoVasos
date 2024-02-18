<?php

// En app/Models/ColorsCategory.php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ColorsCategory extends Model
{
    use HasFactory;

    public function colors()
    {
        return $this->hasMany(Color::class);
    }
}
