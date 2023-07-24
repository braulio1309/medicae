<template>
    <div class="layout-px-spacing apps-calendar">
        <div class="row layout-top-spacing" id="cancel-row">
            <div class="col-xl-12 col-lg-12 col-md-12">
                <div class="statbox panel box box-shadow">
                    <div class="panel-body">

                        <FullCalendar :options="this.options"/>
                           
                    </div>
                </div>

<!-- Add & Edit User -->
      <b-modal :v-show="this.addEventsModal" size="lg" id="New_User" :title="this.event.title">
         
            <div class="">
                <div class="modal-content mailbox-popup">
                    
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-md-12">
                                <div class="form-group mb-4">
                                    <label for="start-date" class=""> Trabajador </label>
                                    <input type="text" :value='this.event.title' class="form-control" readonly/>
                                </div>
                            </div>

                        
                        </div>

                        <div class="row">
                            <div class="col-md-12">
                                <div class="form-group mb-4">
                                    <label class="">Inicio:</label>
                                    <input class='form-control' v-model='this.date' type="datetime-local" readonly>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-danger" @click="cancel_event">Cancelar reserva</button>
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
                let data = await axios.get("Reservations/fisio");
                data = data.data.data;
                console.log(data)
                for (let i = 0; i < data.length; i++) {
                    
                    this.options.events.push(
                    {
                        id: data[i].id,
                        title: data[i].firstname + ' ' + data[i].lastname ,
                        start: data[i].date,
                        allDay: false,
                        description: '',
                        backgroundColor: (data[i].canceled == 1)? 'red': ''
                    });
                };

                
                

                

            },
            edit_event(data) {
                this.selectedEvent = data;
            },
            cancel_event() {
                axios
                    .post("Reservations/canceled", {
                        'turnId': this.event.id,
                        'date': this.date
                    })
                    .then(response => {
                        this.makeToast(
                            "success",
                            'Reserva cancelada con exito, se le notificó al usuario',
                            'Éxito'
                        );
                        this.$bvModal.hide("New_User");
                        
                    })
                    .catch(error => {
                        this.makeToast(
                            "danger",
                            'No se puede cancelar la reserva por quedar menos de 30 minutos para comenzar' ,
                            'Error'
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
        },
        mounted () {
            
            this.bind_events();
            this.options.eventClick = this.New_Company;

        }
    };
</script>
