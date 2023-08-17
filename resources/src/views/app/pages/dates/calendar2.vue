<template>
   <div class="main-content">
    <breadcumb :page="'Reserva de Cita'"/>
    <div v-if="isLoading" class="loading_page spinner spinner-primary mr-3"></div>
    <b-row v-if="!isLoading">
        <b-col md="4">
            
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
</template>
  
<script>
import axios from 'axios';
import { ref } from 'vue';
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
        selectedDoctor: null,
        SubmitProcessing:false,
        disabledDates: [],
        isLoading: true,
        selectedDate: null,
        disabledDates: [],
        selectedTime: null,
        minSelectableDate: new Date(), // Establece la fecha mínima como la fecha actual
        doctors: [], // Array de doctores disponibles, se carga desde el backend
        availableTimes: [] // Array de horarios disponibles para la fecha seleccionada y el doctor seleccionado, se carga desde el backend
      };
    },
    mounted() {
      this.loadVacations();
    },
    methods: {
      loadVacations() {
        axios.get(`/vacations/` + 1)
            .then(response => {
              this.disabledDates = response.data.dates.map(date => {
                const [day, month, year] = date.split('/');
                return new Date(`${month}/${day}/${year}`);
              });
              NProgress.done();
              this.isLoading = false;
              console.log(this.disabledDates)
            })
            .catch(error => {
                console.error(error);
        });
      },
      
      
      loadAvailableTimes() {
        if (this.selectedDate) {
          // Realiza la llamada al backend para obtener los horarios disponibles del fisioterapeuta y la fecha seleccionada
          const dateObj = new Date(this.selectedDate);
          const day = String(dateObj.getDate()).padStart(2, '0');
          const month = String(dateObj.getMonth() + 1).padStart(2, '0');
          const year = dateObj.getFullYear();
          const formattedDate = `${day}-${month}-${year}`;
          axios.get(`/available-times?doctorId=${1}&date=${formattedDate}`)
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
        if (this.selectedDate && this.selectedTime) {
            this.SubmitProcessing = true;
            NProgress.start();
            NProgress.set(0.1);
            const dateObj = new Date(this.selectedDate);
          const day = String(dateObj.getDate()).padStart(2, '0');
          const month = String(dateObj.getMonth() + 1).padStart(2, '0');
          const year = dateObj.getFullYear();
          const formattedDate = `${day}-${month}-${year}`;
          // Verificar si la fecha seleccionada ya ha sido reservada
          axios.get(`/check-availability?doctorId=${1}&date=${formattedDate}&time=${this.selectedTime}`)
            .then(response => {
              if (response.data.isAvailable) {
                axios
                    .post("Appointments/turns/reserve2", {
                        'turnId': this.selectedTime,
                        'date': formattedDate
                    })
                    .then(response => {
                        this.SubmitProcessing = false;
                        this.selectedDoctor= null;
                        this.selectedDate= null;
                        this.selectedTime= null;
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
  };
  </script>