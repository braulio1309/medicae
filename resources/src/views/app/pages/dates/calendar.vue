<template>
    <div class="layout-px-spacing apps-calendar">
        <div class="row layout-top-spacing" id="cancel-row">
            <div class="col-xl-2 col-lg-2 col-md-2">
                <div class="row">
                    <div class="col-sm-12">
                        <h4 class="font-weight-bold">Visitas de hoy</h4>
                        <h6>{{ currentDate }}</h6>
                        <div class="card mb-2" v-for="reservation in this.todayTurns">
                            <div class="card-body">
                            <!-- Título de la tarjeta -->
                            <h5 class="card-title">{{ reservation.firstname }}</h5>
                            <!-- Subtítulo de la tarjeta -->
                            <h6 class="card-subtitle mb-2 text-muted">{{ reservation.date }}</h6>
                            <!-- Contenido adicional de la tarjeta si es necesario -->
                            <!-- ... -->
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>
            <div class="col-xl-10 col-lg-10 col-md-10">
                
                <div class="statbox panel box box-shadow">
                    <div class="panel-body">
                        <FullCalendar :options="this.options"/>
                           
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
  background-color: blue; /* Cambiar el color de fondo */
  color: white; /* Cambiar el color del texto */
  
}

.ocupado {
  background-color: red; /* Cambiar el color de fondo */
  color: white; /* Cambiar el color del texto */
}
</style>
<script>

    import { onMounted, ref } from 'vue';
    import 'moment/locale/es';
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
                disabledDates: ['2023-08-15'],
                options: {
                    eventRender: this.eventRender,
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
            };
        },
        methods: {
            eventRender(info) {
                const eventDate = info.event.start.toISOString().split('T')[0];
                if (this.disabledDates.includes(eventDate)) {
                    info.el.classList.add('disabled-event');
                    info.event.setProp('display', 'none');
                }
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
                //pide el axios con los horarios de los fisiatras 
                let data = await axios.get("Appointments/turns/available");
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
                        title: data[i].username,
                        startTime: data[i].time,
                        daysOfWeek: [day],
                        allDay: false,
                        description: 'Etiam a odio eget enim aliquet laoreet. Vivamus auctor nunc ultrices varius lobortis.',
                        classNames: (data[i].status == 0)? 'ocupado' : 'custom-event-class'
                    });
                };
                let info = await axios.get('/vacations/dates');
                info = info.data.vacation;
                console.log(info)
                let dateArray = [];
                let currentDate = moment(info.startDate);
                const endDate = moment(info.endDate);

                while (currentDate <= endDate) {
                    dateArray.push(currentDate.format('YYYY-MM-DD'));
                    currentDate.add(1, 'days');
                }

                this.options.events = dateArray.filter((date) =>{ return !exceptionDates.includes(date.startTime)});

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
                    
                    });
            }
        },
        mounted () {
            
            this.bind_events();
            this.options.eventClick = this.New_Company;
            this.getTurns();

        }
    };
</script>
