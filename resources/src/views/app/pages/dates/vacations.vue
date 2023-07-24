<template>
    <div class="main-content">
     <breadcumb :page="'Reserva de Cita'"/>
     <div v-if="isLoading" class="loading_page spinner spinner-primary mr-3"></div>
     <b-row v-if="!isLoading">
        
         <b-col md="12" >                

             <div class="form-group d-flex justify-content-center align-items-center mb-10">
                <label>Seleccione su rango de vacaciones:</label>

                <Calendar :minDate="minSelectableDate" v-model="dates" selectionMode="range" :manualInput="false" />
                <Button class="p-button-rounded float-right" @click="saveVacations" :disabled="dates.length == 0">Reservar Cita</Button>
                <div v-once class="typo__p" v-if="SubmitProcessing">
                    <div class="spinner sm spinner-primary mt-3"></div>
                </div>

             </div>
         </b-col>
         
     </b-row>

     <b-row v-if="!isLoading">
        
        <b-col md="12">
            <div class="form-group d-flex justify-content-center align-items-center">
                <vue-good-table
                    mode="remote"
                    :columns="columns"
                    :totalRows="5"
                    :rows="this.vacations"
                    :pagination-options="{
                    enabled: true,
                    mode: 'Resultados',
                    nextLabel: 'Siguiente',
                    prevLabel: 'Anterior',
                }"
                    styleClass="table-hover tableOne vgt-table"
                >
        <div slot="table-actions" class="mt-2 mb-3">
          
          <b-button size="sm" variant="outline-success m-1">
            <i class="i-File-Copy"></i> PDF
          </b-button>
          <b-button size="sm" variant="outline-danger m-1">
            <i class="i-File-Excel"></i> EXCEL
          </b-button>
          
          
        </div>
        <template slot="table-row" slot-scope="props">
          <span v-if="props.column.field == 'actions'">
            
            <a
              title="Delete"
              v-b-tooltip.hover
              @click="RemoveVacations(props.row.id)"
            >
              <i class="i-Close-Window text-25 text-danger"></i>
          </a>

          </span>

          <div v-else-if="props.column.field == 'statut'">
            <label class="switch switch-primary mr-3">
              <input @change="isChecked(props.row)" type="checkbox" v-model="props.row.statut">
              <span class="slider"></span>
            </label>
          </div>
        </template>
        
      </vue-good-table>
            </div>
        </b-col>
        
    </b-row>
   </div>
 </template>
   
 <script>
 import axios from 'axios';
 import Button from "primevue/button"
 
 import Dropdown from 'primevue/dropdown';
 import Calendar from 'primevue/calendar';
 import 'primevue/resources/primevue.min.css';
 import 'primevue/resources/themes/saga-blue/theme.css';
 import 'primeicons/primeicons.css';
 import NProgress from "nprogress";
 
 export default {
     metaInfo: {
         title: "Reserva de Cita"
     },
     components: {
       Dropdown,
       Calendar,
       Button
     },
     data() {
       return {
         SubmitProcessing:false,
         isLoading: true,
         selectedDate: null,
         selectedTime: null,
         minSelectableDate: new Date(), // Establece la fecha mínima como la fecha actual
         doctors: [], // Array de doctores disponibles, se carga desde el backend
         availableTimes: [], // Array de horarios disponibles para la fecha seleccionada y el doctor seleccionado, se carga desde el backend,
         dates: [],
         vacations: [],
         columns: [
                {
                label: 'Fecha Inicio',
                field: "startDate",
                tdClass: "text-left",
                thClass: "text-left"
                },
                {
                label: 'Fecha Final',
                field: "endDate",
                tdClass: "text-left",
                thClass: "text-left"
                },

                {
                label: 'Tiempo',
                field: "status",
                tdClass: "text-left",
                thClass: "text-left",
               
                },
                

                {
                label: 'Acciones',
                field: "actions",
                html: true,
                tdClass: "text-right",
                thClass: "text-right",
                sortable: false
                }
            ]
       };
     },
     mounted() {
       this.loadVacations();
     },
     methods: {
        loadVacations() {
        
            axios.get(`/vacations`)
                .then(response => {
                    console.log( response.data.vacations)
                    this.vacations = response.data.vacations;
                    this.isLoading = false;
                })
                .catch(error => {
                    console.error(error);
            });
         
       },
       RemoveVacations(id) {
        this.$swal({
            title: 'Eliminar',
            text: '¿Desea eliminar su periodo de vacación?',
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            cancelButtonText: 'Cancelar',
            confirmButtonText: 'Eliminar'
        }).then(result => {
            if (result.value) {
                NProgress.start();
                NProgress.set(0.1);
                axios
                    .delete("/vacations/" + id)
                    .then(() => {
                        this.$swal(
                            'Eliminado',
                            'Periodo de vacaciones eliminado',
                            "success"
                        );
                        this.loadVacations();
                        NProgress.done();
                    })
                    
                    .catch(() => {
                        this.$swal(
                            this.$t("Delete.Failed"),
                            this.$t("Delete.ClientError"),
                            "warning"
                        );
                    });
                }
            });
        },

       saveVacations() {
            this.SubmitProcessing = true;
            NProgress.start();
            NProgress.set(0.1);
            axios.post(`/vacations`, this.dates)
                .then(response => {
                    this.SubmitProcessing = false;
                    this.loadVacations();
                    NProgress.done();
                    this.makeToast(
                        "success",
                        'Vacaciones creada',
                        'Éxito'
                    );        
                })
                .catch(error => {
                    console.error(error);
            });
            this.SubmitProcessing = true;
           
        },
      
       computed: {
            columns() {
            return 
            },
        },
       loadAvailableTimes() {
         if (this.selectedDoctor && this.selectedDate) {
           // Realiza la llamada al backend para obtener los horarios disponibles del fisioterapeuta y la fecha seleccionada
           const dateObj = new Date(this.selectedDate);
           const day = String(dateObj.getDate()).padStart(2, '0');
           const month = String(dateObj.getMonth() + 1).padStart(2, '0');
           const year = dateObj.getFullYear();
           const formattedDate = `${day}-${month}-${year}`;
           axios.get(`/available-times?doctorId=${this.selectedDoctor}&date=${formattedDate}`)
             .then(response => {
                 
               this.availableTimes = response.data;
             })
             .catch(error => {
               console.error(error);
             });
         }
       },
       //------ Toast
     makeToast(variant, msg, title) {
         this.$root.$bvToast.toast(msg, {
             title: title,
             variant: variant,
             solid: true
         });
     },
       reserveAppointment() {
         if (this.selectedDoctor && this.selectedDate && this.selectedTime) {
             this.SubmitProcessing = true;
             NProgress.start();
             NProgress.set(0.1);
             const dateObj = new Date(this.selectedDate);
           const day = String(dateObj.getDate()).padStart(2, '0');
           const month = String(dateObj.getMonth() + 1).padStart(2, '0');
           const year = dateObj.getFullYear();
           const formattedDate = `${day}-${month}-${year}`;
           // Verificar si la fecha seleccionada ya ha sido reservada
           axios.get(`/check-availability?doctorId=${this.selectedDoctor}&date=${formattedDate}&time=${this.selectedTime}`)
             .then(response => {
               if (response.data.isAvailable) {
                 // La fecha está disponible, realizar la reserva
                 const appointment = {
                   doctorId: this.selectedDoctor,
                   date: this.selectedDate,
                   time: this.selectedTime
                 };
   
                 axios
                     .post("Appointments/turns/reserve", {
                         'turnId': this.selectedTime,
                         'date': this.selectedDate
                     })
                     .then(response => {
                         this.SubmitProcessing = false;
                         NProgress.done();
                         this.makeToast(
                             "success",
                             'Reserva exitosa',
                             'Éxito'
                         );                        
                     })
                     .catch(error => {
                         this.SubmitProcessing = false;
                         NProgress.done();
                         this.makeToast(
                             "danger",
                             'Error al realizar la Reserva',
                             'Falló'
                         ); 
                     });
                
               } else {
                 this.SubmitProcessing = false;
                 NProgress.done();
                 // La fecha ya ha sido reservada, mostrar mensaje o realizar las acciones correspondientes
                 this.makeToast(
                             "danger",
                             'La fecha ya ha sido reservada',
                             'Falló'
                 ); 
               }
             })
             .catch(error => {
                 this.SubmitProcessing = false;
                 NProgress.done();
                 this.makeToast(
                             "danger",
                             'Error al realizar la Reserva',
                             'Falló'
                 ); 
             });
         }
       }
   }
}
   </script>