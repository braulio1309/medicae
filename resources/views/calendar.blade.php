@extends('layouts.master') <!-- Asegúrate de que el diseño (layout) coincida con el que utilizas en tu proyecto -->

@section('content')
<div class="main-content">
    <breadcumb :page="'Reserva de Cita'"/> <!-- Asegúrate de que la directiva 'breadcumb' esté configurada correctamente -->
    <div v-if="isLoading" class="loading_page spinner spinner-primary mr-3"></div>
    <b-row v-if="!isLoading">
        <b-col md="4">
            <!-- Contenido de la columna 1 -->
        </b-col>
        <b-col md="4">
            <div class="form-group">
                <Calendar :minDate="minSelectableDate" v-model="selectedDate" :disabled-dates="disabledDates" :disabledDays="[6]" :inline="true" id="date" @date-select="loadAvailableTimes" dateFormat="dd-mm-yy" />
            </div>
        </b-col>

        <b-col md="2">
            <div class="form-group" v-show="selectedDate">
                <div class="button-list">
                    <Button  v-for="time in availableTimes" :key="time.id" :label="time.time" :disabled="time.disabled == 1 ? true : false" :class="{ 'p-button-outlined p-button-danger' : time.disabled == 1 , 'p-button-outlined' : selectedTime!=time.id && time.disabled == 0}"  @click.prevent="selectedTime = time.id" />
                </div>
            </div>
        </b-col>
        <div class="w-100">
            <Button class="p-button-rounded float-right" @click="reserveAppointment" :disabled="!selectedDate || !selectedTime || SubmitProcessing">Reservar Cita</Button>
            <div v-once class="typo__p" v-if="SubmitProcessing">
                <div class="spinner sm spinner-primary mt-3"></div>
            </div>
        </div>
    </b-row>
</div>
@endsection

@section('scripts')
<!-- Agrega aquí los scripts de Vue.js y otras dependencias si es necesario -->
<script src="{{ asset('../resources/src/views/app/pages/calendar2.vue') }}"></script>
<!-- Asegúrate de reemplazar 'your-vue-component.js' con la ubicación correcta de tu script de Vue.js -->
@endsection
