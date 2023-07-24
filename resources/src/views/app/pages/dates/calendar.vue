<template>
    <div class="layout-px-spacing apps-calendar">
        <div class="row layout-top-spacing" id="cancel-row">
            <div class="col-xl-12 col-lg-12 col-md-12">
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
                                    <label for="start-date" class=""> Fisioterapeuta </label>
                                    <input type="text" :value='this.event.title' class="form-control" readonly/>
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


<script>

    import { onMounted, ref } from 'vue';
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
                event: {},
                options: {
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
                },
            };
        },
        methods: {
            New_Company(data) {
                this.event = data.event;
                console.log(this.event.start)
                let fecha = new Date(this.event.start);
                const year = fecha.getFullYear();
                const month = (fecha.getMonth() + 1).toString().padStart(2, '0');
                const day = fecha.getDate().toString().padStart(2, '0');
                const hours = fecha.getHours().toString().padStart(2, '0');
                const minutes = fecha.getMinutes().toString().padStart(2, '0');
                const seconds = fecha.getSeconds().toString().padStart(2, '0');
                this.date = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;


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

                    /*let info = await axios.get('Reservations/turn/reserved/'+data[i].id);
                    
                    info = info.data.data;
                    
                    info = info.map(function(data) {
                        
                        return data.date
                    })*/
                    this.options.events.push(
                    {
                        id: data[i].id,
                        title: data[i].username,
                        startTime: data[i].time,
                        daysOfWeek: [day],
                        allDay: false,
                        description: 'Etiam a odio eget enim aliquet laoreet. Vivamus auctor nunc ultrices varius lobortis.',
                    });
                };

                
                

                

            },
            edit_event(data) {
                this.selectedEvent = data;
            },
            save_event() {
                axios
                    .post("Appointments/turns/reserve", {
                        'turnId': this.event.id,
                        'date': this.date
                    })
                    .then(response => {
                        console.log(response)
                        this.makeToast(
                            "success",
                            'Reserva exitosa',
                            'Éxito'
                        );
                        this.$bvModal.hide("New_User");
                        
                    })
                    .catch(error => {
                    
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
        },
        mounted () {
            
            this.bind_events();
            this.options.eventClick = this.New_Company;

        }
    };
</script>
