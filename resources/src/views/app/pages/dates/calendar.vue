<template>
    <div class="layout-px-spacing apps-calendar">
        <div class="row layout-top-spacing" id="cancel-row">
            <div class="col-xl-3 col-lg-3 col-md-3">
                <div class="row">
                    <div class="col-sm-12">
                        <h4 class="font-weight-bold">Visitas de hoy</h4>
                        <h6>{{ currentDate }}</h6>
                            <div class="card mb-2" v-for="reservation in this.todayTurns" :key="reservation">
                                <a :href="'/app/dates/profile/patient/'+reservation.userId">

                                    <div class="card-body">
                                    <!-- Título de la tarjeta -->
                                        <div class="row">
                                            <div class="col-sm-4">
                                                <b-avatar :src="'images/avatar/no_avatar.png'" size="3rem"></b-avatar>
                                            </div>
                                            <div class="col-sm-8">
                                                <h6 class="card-subtitle mb-2 text-muted">
                                                    {{ new Date(reservation.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }} - 
                                                    {{ new Date(new Date(reservation.date).getTime() + 60 * 60 * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }}
                                                </h6>
                                                <h5 class="card-title">{{ reservation.firstname }} {{ reservation.lastname }}</h5>
                                            </div>
                                        </div>
                                    
                                    </div>
                                </a>

                            </div>
                    </div>
                    
                </div>
            </div>

            <div class="col-xl-9 col-lg-9 col-md-9">
                <div class="statbox panel box box-shadow vh-200 overflow-hidden" style="max-height: 210vh; overflow: hidden;">
                    <div class="panel-body">
                        <FullCalendar :options="this.options" ref="fullCalendar" style="max-height: 210vh; overflow: hidden;"/>
                           
                    </div>
                </div>

                <b-modal :v-show="this.addEventsModal" size="lg" id="New_User" :title="this.event.title">
                        <div class="">
                            <div class="modal-content mailbox-popup">
                                
                                <div class="modal-body">
                                    <div class="row">
                                        <div class="col-md-12">
                                            <div class="form-group mb-4">
                                                <label for="start-date" class=""> Doctor </label>
                                                <input type="text" :value="this.event.title" class="form-control" readonly/>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="row">
                                        <div class="col-md-12">
                                            <div class="form-group mb-4">
                                                <label class="">Inicio:</label>
                                                <input class='form-control' v-model='this.date' type="datetime-local">
                                            </div>
                                        </div>
                                    </div>

                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-default" data-dismiss="modal" data-bs-dismiss="modal">Descartar</button>
                                    <button type="button" class="btn btn-primary" @click="save_event">Reservar</button>
                                </div>
                            </div>
                        </div>
                </b-modal>
                
            </div>

            <!-- The Modal -->
            
        </div>
    </div>
</template>

<style>
/* Estilos CSS para la clase 'custom-event-class' */
.custom-event-class {
    background-color: rgba(255, 0, 0, 0.7); /* Color de fondo rojo con opacidad */
  color: white; /* Color del texto */
  border-radius: 10px; /* Esquinas redondeadas */
  padding: 2px 10px; /* Espaciado interno con height más angosto */
  
}
.vacation {
  background-color: rgba(40, 196, 40, 0.7); /* Color de fondo verdoso claro con opacidad */
  color: white; /* Color del texto */
  border-radius: 10px; /* Esquinas redondeadas */
  padding: 2px 10px; /* Espaciado interno con height más angosto */
}
.ocupado {
  background-color: rgba(255, 0, 0, 0.7); /* Color de fondo rojo con opacidad */
  color: white; /* Color del texto */
  border-radius: 10px; /* Esquinas redondeadas */
  padding: 2px 10px; /* Espaciado interno con height más angosto */
}

.full-height {
        height: 100vh; /* Establece la altura al 100% de la altura de la ventana gráfica */
        margin: 0; /* Elimina los márgenes */
        padding: 0; /* Elimina el relleno */
        overflow: hidden; /* Evita el desplazamiento */
        overflow-y: hidden;
    }
</style>
<script>

import { onMounted, ref } from 'vue';
import 'moment/locale/es';
import moment from "moment";
import FullCalendar from '@fullcalendar/vue3';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin, { Draggable } from '@fullcalendar/interaction';

export default {
        components: {
            FullCalendar, 
            dayGridPlugin,
            timeGridPlugin,
            interactionPlugin
        },
        data() {
            return {
                addEventsModal: false,
                currentDate: new Date().toLocaleDateString(),
                event: {},
                disabledDates: [],
                options: {
                    eventRender: this.eventRender,
                    dayRender: this.customDayRender,
                    initialView: 'timeGridWeek',
                    plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
                    headerToolbar: {
                        start: 'prev,next today',
                        center: 'title',
                        end: 'dayGridMonth,timeGridWeek,timeGridDay',
                    },
                    
                    eventClick: function(info){
                        this.New_Company(info)
                    },
                    
                    events: [],
                    locale: 'es',
                    buttonText: {
                        today: 'Hoy',
                        month: 'Mes',
                        week: 'Semana',
                        day: 'Día',
                        list: 'Lista'
                        },
                        dayNamesShort: ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'],
                    },
                    slotLabelInterval: '01:00:00', // Mostrar etiquetas de hora cada hora
                    slotDuration: '01:00:00',
                    todayTurns: ''
            }
        },
        methods: {
            customDayRender(date, cell) {
                const dateString = date.format('DD/MM/YYYY');
                if (this.disabledDates.includes(dateString)) {
                    cell.addClass('disabled-date');
                }
            },
            eventRender(info) {
                // const eventDate = info.event.start.toISOString().split('T')[0];
                // if (this.disabledDates.includes(eventDate)) {
                //     info.el.classList.add('disabled-event');
                //     info.event.setProp('display', 'none');
                // }
            },
            customDayRender(date, cell) {
                const dateString = date.format('DD/MM/YYYY');
                if (this.disabledDates.includes(dateString)) {
                    cell.addClass('disabled-date');
                }
            },
            disableDatesInCalendar() {
                const fullCalendarApi = this.$refs.fullCalendar.getApi();

                // Deseleccionar fechas deshabilitadas
                fullCalendarApi.removeAllEventSources();

                const disabledEventSource = {
                    events: this.disabledDates.map(date => ({
                    start: date,
                    display: 'background'
                    })),
                    backgroundColor: 'red', // Color de fondo para fechas deshabilitadas
                    borderColor: 'red' // Color de borde para fechas deshabilitadas
                };

                fullCalendarApi.addEventSource(disabledEventSource);
            },
            New_Company(data) {
                this.event = data.event;
                let fecha = new Date(this.event.start);
                const year = fecha.getFullYear();
                const month = (fecha.getMonth() + 1).toString().padStart(2, '0');
                const day = fecha.getDate().toString().padStart(2, '0');
                const hours = fecha.getHours().toString().padStart(2, '0');
                const minutes = fecha.getMinutes().toString().padStart(2, '0');
                const seconds = fecha.getSeconds().toString().padStart(2, '0');
                this.date = `${year}-${month}-${day}T${hours}:${minutes}`;


                this.$bvModal.show("New_User");
            },
            async bind_events () {
                let dt = new Date();
                let data = await axios.get("appointments/turns/reserved");
                data = data.data.data;
                for (let i = 0; i < data.length; i++) {
                    let day = 0;
                    if(data[i].day == 'Lunes')
                        day = 1;
                    if(data[i].day == 'Martes')
                        day = 2;
                    if(data[i].day == 'Miercoles')
                        day = 3;
                    if(data[i].day == 'Jueves')
                        day = 4;
                    if(data[i].day == 'Viernes')
                        day = 5;

                    this.options.events.push(
                    {
                        id: data[i].turnId,
                        title: data[i].firstname +' '+data[i].lastname,
                        start: data[i].date,
                        //daysOfWeek: [day],
                        allDay: false,
                        classNames: 'custom-event-class'
                    });
                    
                    
                };
                let info = await axios.get('/vacations/dates');
                

                for (let i = 0; i < info.data.dates.length; i++) {
                    // Crea una nueva fecha para el día actual del ciclo
                    let currentDate = info.data.dates[i];
                    const parts = currentDate.split('/');
                    // Obtener el año, mes y día
                    const year = parts[2];
                    const month = parts[1];
                    const day = parts[0];
                    
                    // Crear una nueva fecha con la hora predeterminada (08:00:00)
                    const formattedDate = new Date(`${year}-${month}-${day} 08:00:00`);
                    
                    // Formatear la fecha como cadena de texto
                    const result = formattedDate.toISOString().slice(0, 19).replace('T', ' ');

                    // Agrega el evento al arreglo this.options.events
                    this.options.events.push({
                        title: 'Vacation',
                        start: result, // Fecha actual del ciclo
                        allDay: true,
                        classNames: 'vacation'
                    });
                }

            },
            edit_event(data) {
                this.selectedEvent = data;
            },
            save_event() {
                axios
                    .post("Appointments/turns/reserve", {
                        'turnId': this.event.id,
                        'date': this.date,
                    })
                    .then(response => {
                        this.makeToast(
                            "success",
                            'Reserva exitosa',
                            'Éxito'
                        );
                        this.$bvModal.hide("New_User");
                        
                    })
                    .catch(error => {
                        this.makeToast(
                            "warning",
                            'Ya su cita fue tomada por otra persona',
                            'No se ha agendado'
                        );
                        this.$bvModal.hide("New_User");
                    });
            },
            makeToast(variant, msg, title) {
                this.$root.$bvToast.toast(msg, {
                    title: title,
                    variant: variant,
                    solid: true
                });
            },
            handleDateClick: function(arg) {
                alert('date click! ' + arg)
            },

            showMessage (msg = '', type = 'success') {
                const toast = window.Swal.mixin({
                    toast: true,
                    position: 'top',
                    showConfirmButton: false,
                    timer: 3000,
                });
                toast.fire({
                    icon: type,
                    title: msg,
                    padding: '10px 20px',
                });
            },
            edit_date (data){
                let obj = {
                    event: { start: data.start, end: data.end },
                };
                
                this.edit_event(obj);
            },
            getTurns(){
                axios
                    .get("Appointments/turns/today")
                    .then(response => {
                        this.todayTurns = response.data.turns;
                        console.log(this.todayTurns)
                        
                    })
                    .catch(error => {
                        console.log(error)
                    });
            },
        },
        mounted () {
            
            this.bind_events();
            this.options.eventClick = this.New_Company;
            this.getTurns();

        }
    };
</script>
