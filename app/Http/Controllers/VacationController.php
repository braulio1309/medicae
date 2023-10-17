<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Vacation;
use Carbon\Carbon;

class VacationController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $data = Vacation::where('userId', '=', \Auth::user()->id)->get();

        $vacations = $data->map(function ($item) {
            $startDate = Carbon::parse($item->startDate);
            $endDate = Carbon::parse($item->endDate)->format('Y-m-d');
            $now = Carbon::now();
            
            if ($now->between($startDate, $endDate)) {
                $status = 'En curso';
            } elseif ($now->greaterThan($endDate)) {
                $status = 'Culminado';
            } elseif ($now->lessThan($startDate)) {
                $daysRemaining = $startDate->diffInDays($now);
                $status = "Quedan {$daysRemaining} días";
            }
            
            return [
                'id' => $item->id,
                'startDate' => $startDate->format('Y-m-d'),
                'endDate' => $endDate,
                'status' => $status,
                'flag' => isset($status) ? true : false,
            ];
        });

        return response()->json([
            'vacations' => $vacations
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request)
    {
       
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $data = $request->all();
        $vacation = new Vacation();
        $vacation->startDate = substr($data[0], 0, 10);
        $vacation->endDate = substr($data[1], 0, 10);
        $vacation->userId = \Auth::user()->id;
        
        $vacation->save();

        return response()->json([
            'vacation' => $vacation
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $vacation = Vacation::where('userId', '=', 1)
        ->orderBy('startDate', 'asc')
        ->first();
        $dates = [];
        if($vacation){
            $currentDate = \DateTime::createFromFormat('Y-m-d',$vacation->startDate);
            while ($currentDate <= \DateTime::createFromFormat('Y-m-d',$vacation->endDate)) {
                $dates[] = $currentDate->format('d/m/Y');
                $currentDate->modify('+1 day');
            }
        }
        

        return response()->json([
            'dates' => $dates
        ]);
        
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $vacation = Vacation::findOrFail($id);
        $vacation->delete();

        return response()->json([
            'vacation' => $vacation
        ]);
    }

    public function getVacations(){
        return response()->json([
            'vacation' => Vacation::where('user_id', auth()->user()->id)
            ->orderBy('created_at', 'desc')
            ->first()
        ]);
    }
}
