<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Storage;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
 */

//------------------------------------------------------------------\\
Route::get('/prueba-pdf', function (Codedge\Fpdf\Fpdf\Fpdf $fpdf) {

    $fpdf->AddPage();

    $fpdf->setXY(10,10);
    $fpdf->SetFont('Arial', 'B', 10);
    $fpdf->Cell(30, 5, 'MEDICAL CENTER');
    $fpdf->setXY(10,15);
    $fpdf->SetFont('Arial', '', 10);
    $fpdf->Cell(30, 5, 'COMPANY NAME');
    
    $fpdf->setXY(160,10);
    $fpdf->SetFont('Arial', '', 9);
    $fpdf->Cell(30, 5, '123 Lorem ipsum St.');
    $fpdf->setXY(160,15);
    $fpdf->Cell(30, 5, '+00 123 456 789');
    $fpdf->setXY(160,20);
    $fpdf->Cell(30, 5, 'clinicname@email.com');
    
    $fpdf->Image('images/logo.png', 90, 35, 30, 30);
    
    $fpdf->setXY(85,55);
    $fpdf->SetFont('Arial', 'B', 14);
    $fpdf->Cell(30, 5, 'MD. PETER LEWIS');
    
    $fpdf->setXY(90,60);
    $fpdf->SetFont('Arial', 'B', 8);
    $fpdf->Cell(30, 5, 'NEUROLOGIST DOCTOR');
    
    $fpdf->setXY(95,65);
    $fpdf->SetFont('Arial', '', 8);
    $fpdf->Cell(30, 5, 'ID No. 123456789');

    $fpdf->setXY(150,70);
    $fpdf->SetFont('Arial', '', 9);
    $fpdf->Cell(15, 5, 'S. No.');
    $fpdf->Cell(30, 5, '',1);
    
    $fpdf->setXY(10,80);
    $fpdf->SetFont('Arial', '', 9);
    $fpdf->Cell(25, 5, "Patient's Name");
    $fpdf->Cell(112, 5, '',1);

    $fpdf->setXY(150,80);
    $fpdf->Cell(15,5,'Date');
    $fpdf->Cell(30, 5, '',1);
    
    $fpdf->setXY(10,90);
    $fpdf->SetFont('Arial', '', 9);
    $fpdf->Cell(20, 5, "Date of birth");
    $fpdf->Cell(50, 5, '',1);
    
    $fpdf->setXY(85,90);
    $fpdf->SetFont('Arial', '', 9);
    $fpdf->Cell(15, 5, "Age");
    $fpdf->Cell(47, 5, '',1);

    $fpdf->setXY(150,90);
    $fpdf->Cell(15,5,'Gender');
    $fpdf->Cell(30, 5, '',1);

    $fpdf->setXY(10,100);
    $fpdf->SetFont('Arial', '', 9);
    $fpdf->Cell(18, 5, "Diagnosis");
    $fpdf->Cell(167, 5, '',1);

    $fpdf->setXY(10,115);
    $fpdf->SetFont('Arial', 'B', 24);
    $fpdf->Cell(15, 5, 'Rx:');



    $fpdf->Line($fpdf->GetPageWidth() -70, $fpdf->GetPageHeight() - 30, $fpdf->GetPageWidth() - 10, $fpdf->GetPageHeight() - 30);

    // Agrega el texto "Doctor's Signature" debajo de la línea
    $fpdf->SetFont('Arial', '', 12);
    $fpdf->Text($fpdf->GetPageWidth() - 57, $fpdf->GetPageHeight() - 20, "Doctor's Signature");


    $fpdf->Output();
    exit;

});
Route::post('/login', [
    'uses' => 'Auth\LoginController@login',
    'middleware' => 'Is_Active',
]);

Route::get('password/find/{token}', 'PasswordResetController@find');

//------------------------------------------------------------------\\

$installed = Storage::disk('public')->exists('installed');

if ($installed === false) {
    Route::get('/setup', [
        'uses' => 'SetupController@viewCheck',
    ])->name('setup');

    Route::get('/setup/step-1', [
        'uses' => 'SetupController@viewStep1',
    ]);

    Route::post('/setup/step-2', [
        'as' => 'setupStep1', 'uses' => 'SetupController@setupStep1',
    ]);

    Route::post('/setup/testDB', [
        'as' => 'testDB', 'uses' => 'TestDbController@testDB',
    ]);

    Route::get('/setup/step-2', [
        'uses' => 'SetupController@viewStep2',
    ]);

    Route::get('/setup/step-3', [
        'uses' => 'SetupController@viewStep3',
    ]);

    Route::get('/setup/finish', function () {

        return view('setup.finishedSetup');
    });

    Route::get('/setup/getNewAppKey', [
        'as' => 'getNewAppKey', 'uses' => 'SetupController@getNewAppKey',
    ]);

    Route::get('/setup/getPassport', [
        'as' => 'getPassport', 'uses' => 'SetupController@getPassport',
    ]);

    Route::get('/setup/getMegrate', [
        'as' => 'getMegrate', 'uses' => 'SetupController@getMegrate',
    ]);

    Route::post('/setup/step-3', [
        'as' => 'setupStep2', 'uses' => 'SetupController@setupStep2',
    ]);

    Route::post('/setup/step-4', [
        'as' => 'setupStep3', 'uses' => 'SetupController@setupStep3',
    ]);

    Route::post('/setup/step-5', [
        'as' => 'setupStep4', 'uses' => 'SetupController@setupStep4',
    ]);

    Route::post('/setup/lastStep', [
        'as' => 'lastStep', 'uses' => 'SetupController@lastStep',
    ]);

    Route::get('setup/lastStep', function () {
        return redirect('/setup', 301);
    });

} else {
    Route::any('/setup/{vue}', function () {
        abort(403);
    });
}

//------------------------------------------------------------------\\

Route::group(['middleware' => ['auth', 'Is_Active']], function () {

    Route::get('/login', function () {
        $installed = Storage::disk('public')->exists('installed');
        if ($installed === false) {
            return redirect('/setup');
        } else {
            return redirect('/login');
        }
    });


    Route::get('/{vue?}',
        function () {
            $installed = Storage::disk('public')->exists('installed');
            if ($installed === false) {
                return redirect('/setup');
            } else {
                return view('layouts.master');
            }
        })->where('vue', '^(?!setup|update|password).*$');


    });
    
    Auth::routes([
        'register' => false,
    ]);


//------------------------------------------------------------------\\

Route::get('/update', 'UpdateController@viewStep1');

Route::get('/update/finish', function () {

    return view('update.finishedUpdate');
});

Route::post('/update/lastStep', [
    'as' => 'update_lastStep', 'uses' => 'UpdateController@lastStep',
]);


