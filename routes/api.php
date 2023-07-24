<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
 */

/*auth middleware api passport token*/
Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});



//--------------------------- Reset Password  ---------------------------

Route::group([
    'prefix' => 'password',
], function () {
    Route::post('create', 'PasswordResetController@create');
    Route::post('reset', 'PasswordResetController@reset');
});
Route::post('/chat-bot', 'ChatBotController@listenToReplies');
Route::middleware(['auth:api', 'Is_Active'])->group(function () {

    //-------------------------- Clear Cache ---------------------------

    Route::get("Clear_Cache", "SettingsController@Clear_Cache");

    //-------------------------- Reports ---------------------------

    Route::get("report/client", "ReportController@Client_Report");
    Route::get("report/client/{id}", "ReportController@Client_Report_detail");
    Route::get("report/client_Sales", "ReportController@Sales_Client");
    Route::get("report/client_payments", "ReportController@Payments_Client");
    Route::get("report/client_quotations", "ReportController@Quotations_Client");
    Route::get("report/client_returns", "ReportController@Returns_Client");
    Route::get("report/client_Top_Clients", "ReportController@TopCustomers");
    Route::get("report/TopProducts_year", "ReportController@Top_Products_Year");
    Route::get("report/TopProducts_Month", "ReportController@TopProducts_Month");
    Route::get("report/provider", "ReportController@Providers_Report");
    Route::get("report/provider/{id}", "ReportController@Provider_Report_detail");
    Route::get("report/provider_purchases", "ReportController@Purchases_Provider");
    Route::get("report/provider_payments", "ReportController@Payments_Provider");
    Route::get("report/provider_returns", "ReportController@Returns_Provider");
    Route::get("report/ToProviders", "ReportController@ToProviders");
    Route::get("report/Sales", "ReportController@Report_Sales");
    Route::get("report/Purchases", "ReportController@Report_Purchases");
    Route::get("report/Get_last_Sales", "ReportController@Get_last_Sales");
    Route::get("report/stock_alert", "ReportController@Products_Alert");
    Route::get("report/Payment_chart", "ReportController@Payment_chart");
    Route::get("report/Warehouse_Report", "ReportController@Warehouse_Report");
    Route::get("report/Sales_Warehouse", "ReportController@Sales_Warehouse");
    Route::get("report/Quotations_Warehouse", "ReportController@Quotations_Warehouse");
    Route::get("report/Returns_Sale_Warehouse", "ReportController@Returns_Sale_Warehouse");
    Route::get("report/Returns_Purchase_Warehouse", "ReportController@Returns_Purchase_Warehouse");
    Route::get("report/Expenses_Warehouse", "ReportController@Expenses_Warehouse");
    Route::get("report/Warhouse_Count_Stock", "ReportController@Warhouse_Count_Stock");
    Route::get("report/Warhouse_Value_Stock", "ReportController@Warhouse_Value_Stock");
    Route::get("report/report_today", "ReportController@report_today");
    Route::get("report/count_quantity_alert", "ReportController@count_quantity_alert");
    Route::get("report/ProfitAndLoss", "ReportController@ProfitAndLoss");
    Route::get("chart/SalesPurchasesChart", "ReportController@SalesPurchasesChart");
    Route::get("chart/report_with_echart", "ReportController@report_with_echart");
    Route::get("report/report_dashboard", "ReportController@report_dashboard");


    //------------------------------ Companies -------------------------\\
    //------------------------------------------------------------------\\

    Route::resource('companies', 'CompanyController');
    Route::get('companies/export/Excel', 'CompanyController@exportExcel');
    Route::post('companies/import/csv', 'CompanyController@import_clients');
    Route::get('Get_Clients_Without_Paginate', 'CompanyController@Get_Clients_Without_Paginate');
    Route::post('companies/delete/by_selection', 'CompanyController@delete_by_selection');

    //------------------------------ Vacations -------------------------\\
    //------------------------------------------------------------------\\

    
    Route::resource('vacations', 'VacationController');



    //--------------------------- Appointments ------------------------\\
    //------------------------------------------------------------------\\

    Route::resource('Appointments', 'AppointmentsController');
    Route::get('Appointments/export/Excel', 'AppointmentsController@export_Excel');
    Route::post('Appointments/turns', 'AppointmentsController@getTurns');
    Route::get('Appointments/turns/available', 'AppointmentsController@getAvailableTurns');
    Route::post('Appointments/turns/reserve', 'AppointmentsController@reserveTurn');
    Route::post('Appointments/turns/reserve2', 'AppointmentsController@reserveTurn2');
    Route::post('Appointments/import/csv', 'AppointmentsController@import_products');
    Route::get('Appointments/Warehouse/{id}', 'AppointmentsController@Appointments_by_Warehouse');
    Route::get('Appointments/Detail/{id}', 'AppointmentsController@Get_Appointments_Details');
    Route::get('Appointments/Stock/Alerts', 'AppointmentsController@Appointments_Alert');
    Route::post('Appointments/delete/by_selection', 'AppointmentsController@delete_by_selection');

    // Rutas para obtener la lista de doctores
    Route::get('users/get_doctors', 'UserController@getInformationUsersDoctor');

    // Ruta para obtener los horarios disponibles de un doctor y fecha específicos
    Route::get('available-times', 'AppointmentsController@getAvailableTimes');

    // Ruta para verificar la disponibilidad de una fecha específica
    Route::get('check-availability', 'AppointmentsController@checkAvailability');

    // Ruta para reservar una cita
    Route::post('reserve-appointment', 'ReservationController@reserveAppointment');
    //--------------------------- Reservations ------------------------\\
    //------------------------------------------------------------------\\

    Route::get('Reservations/company', 'ReservationController@getReservationsByCompany');
    Route::get('Reservations/fisio', 'ReservationController@getReservationsByFisio');
    Route::post('Reservations/canceled', 'ReservationController@cancelReservation');
    Route::get('Reservations/turn/reserved/{id}', 'ReservationController@getReservationsTurn');

    //------------------------------- Users --------------------------\\
    //------------------------------------------------------------------\\

    Route::get('GetUserAuth', 'UserController@GetUserAuth');
    Route::get('users/get_information_users', 'UserController@getInformationUsers');
    Route::get("/GetPermissions", "UserController@GetPermissions");
    Route::resource('users', 'UserController');
    Route::put('users/Activated/{id}', 'UserController@IsActivated');
    Route::get('users/export/Excel', 'UserController@exportExcel');
    Route::get('users/Get_Info/Profile', 'UserController@GetInfoProfile');
    Route::put('updateProfile/{id}', 'UserController@updateProfile');

    Route::resource('fisioterapeuta', 'FisioController');
    Route::put('fisio/Activated/{id}', 'UserController@IsActivated');
    Route::get('fisio/export/Excel', 'UserController@exportExcel');
    Route::get('fisio/Get_Info/Profile', 'UserController@GetInfoProfile');
    Route::put('updateProfile/{id}', 'UserController@updateProfile');

    //------------------------------- Permission Groups user -----------\\
    //------------------------------------------------------------------\\

    Route::resource('roles', 'PermissionsController');
    Route::resource('roles/check/Create_page', 'PermissionsController@Check_Create_Page');
    Route::get('getRoleswithoutpaginate', 'PermissionsController@getRoleswithoutpaginate');
    Route::post('roles/delete/by_selection', 'PermissionsController@delete_by_selection');

    
    //------------------------------- Settings ------------------------\\
    //------------------------------------------------------------------\\    
    Route::resource('settings', 'SettingsController');

    Route::put('pos_settings/{id}', 'SettingsController@update_pos_settings');
    Route::get('get_pos_Settings', 'SettingsController@get_pos_Settings');
    
    Route::put('SMTP/{id}', 'SettingsController@updateSMTP');
    Route::post('SMTP', 'SettingsController@CreateSMTP');
    Route::get('getSettings', 'SettingsController@getSettings');
    Route::get('getSMTP', 'SettingsController@getSMTP');
    Route::get('get_sms_config', 'SettingsController@get_sms_config');


    Route::post('payment_gateway', 'SettingsController@Update_payment_gateway');
    Route::post('sms_config', 'SettingsController@sms_config');
    Route::get('Get_payment_gateway', 'SettingsController@Get_payment_gateway');

    //------------------------------- Backup --------------------------\\
    //------------------------------------------------------------------\\
    
    Route::get("GetBackup", "ReportController@GetBackup");
    Route::get("GenerateBackup", "ReportController@GenerateBackup");
    Route::delete("DeleteBackup/{name}", "ReportController@DeleteBackup");

});

    //-------------------------------  Print & PDF ------------------------\\
    //------------------------------------------------------------------\\

    // Route::get('Sale_PDF/{id}', 'SalesController@Sale_PDF');
