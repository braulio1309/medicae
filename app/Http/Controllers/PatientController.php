<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Patient;

class PatientController extends Controller
{
    public function index()
    {
        // Código para listar todos los registros (GET /posts)
    }

    public function create()
    {
        // Código para mostrar el formulario de creación (GET /posts/create)
    }

    public function store(Request $request)
    {
        $data = $request->all()['patients'];
       
        // Intentar buscar al Patient por su correo electrónico
        $Patient = Patient::where('userId', $data['userId'])->first();

        // Si el Patient no existe, crear uno nuevo
        if (!$Patient) {
            $Patient = new Patient;
        }

        // Actualizar los datos del Patient con la información recibida del formulario
        $Patient->bloodType = $data['bloodType'];
        $Patient->weight = $data['weight'];
        $Patient->height = $data['height'];
        $Patient->medication = $data['medication'];
        $Patient->allergies = $data['allergies'];
        $Patient->userId = $data['userId'];

        // Guardar el Patient en la base de datos
        $Patient->save();

        // Retornar una respuesta (puedes personalizar el mensaje según tus necesidades)
        return response()->json(['message' => 'Patient creado o actualizado correctamente'], 201);
    }

    public function show($id)
    {
        $Patient = Patient::where('id', $id)->get();
        return response()->json(['patient' => (count($Patient) == 0)? null: $Patient[0]], 201);
    }

    public function edit($id)
    {
        // Código para mostrar el formulario de edición (GET /posts/{id}/edit)
    }

    public function update(Request $request, $id)
    {
        // Código para actualizar un registro específico (PUT /posts/{id} o PATCH /posts/{id})
    }

    public function destroy($id)
    {
        // Código para eliminar un registro específico (DELETE /posts/{id})
    }
}
