<template>
  <div class="main-content">
    <breadcumb :page="$t('AppointmentManagement')" :folder="$t('Schedules')" />
    <div v-if="isLoading" class="loading_page spinner spinner-primary mr-3"></div>

    <validation-observer v-if="!isLoading">
      <b-form @submit.prevent="Submit_Appointment" enctype="multipart/form-data">
        <b-row>
          <b-col md="12">
            <h1>{{$t('AppointmentManagement')}}</h1>
            <label for="duracion-consulta">{{$t('DurationOfAppointment')}}</label>
            <input
              type="number"
              class='form-control col-xs-5 col-sm-5 col-md-5 col-lg-5' 
              id="duracion-consulta"
              v-model="this.duration"
            />
            <div v-for="(day, index) in dayss" :key="index" class="mt-1">
              <b-card>
                <h6 class="d-inline">{{ day }}</h6>
                <b-button @click="toggleSlots(day)" variant="link" class="float-right">
                  <i :class="visibleDays.includes(day) ? 'i-Remove' : 'i-Add'"></i>
                </b-button>
                <b-collapse :visible="visibleDays.includes(day)">
                  <div>
                    <input class='btn btn-primary' type='button' @click="agregarInput(day)" value="Agregar horas"/>
                     <div class="m-3 row" v-for="(input, index) in slots[day]" :key="index">
                      <!--<input  class='form-control col-xs-8 col-sm-8 col-md-10 col-lg-10' :key="index" type="time" v-model="input.horas" placeholder="Ingrese las horas">-->
                      
                      <div class="col-sm-2">
                        <label for="hora-final">Desde:</label>
                        <Calendar
                          id="hora-inicio"
                          v-model="input.startHour"
                          timeOnly 
                        />
                      </div>
                      <div class="col-sm-2">
                        <label for="hora-final">Hasta:</label>
                        <Calendar
                          id="hora-final"
                          v-model="input.finalHour"
                          timeOnly 
                        />
                      </div>
                      

                      <div class="col-sm-2">
                        <label for="hora-final">Desde (Descanso):</label>
                        <Calendar
                          id="hora-inicio"
                          v-model="input.startHourRest"
                          :timeOnly="true"
                          :showSeconds="false"
                          :showMillisec="false"
                        />
                      </div>
                      <div class="col-sm-2">
                        <label for="hora-final">Hasta (Descanso):</label>

                        <Calendar
                          id="hora-final"
                          v-model="input.finalHourRest"
                          :timeOnly="true"
                          :showSeconds="false"
                          :showMillisec="false"
                        />         
                      </div>
                                   
                      <div class="col-xs-4 col-sm-4 col-md-2 col-lg-2 m-auto">
                        <!--<a class='' @click.prevent="eliminarInput(day, index)"><i class="i-Close-Window text-25 text-danger"></i></a>-->
                      </div>

                    </div>
                  </div>
                </b-collapse>
              </b-card>
            </div>
          </b-col>
        </b-row>
        <button class='btn btn-success' @click="Create_Appointment">Guardar</button>
      </b-form>
    </validation-observer>
  </div>
</template>


<script>
import VueTagsInput from "@johmun/vue-tags-input";
import NProgress from "nprogress";
import Calendar from 'primevue/calendar';
 import 'primevue/resources/primevue.min.css';
 import 'primevue/resources/themes/saga-blue/theme.css';
 import 'primeicons/primeicons.css';

export default {
  metaInfo: {
    title: "Registrar Reserva"
  },
  data() {
    return {
      tag: "",
      len: 8,
      change: false,
      isLoading: true,
      SubmitProcessing: false,
      data: new FormData(),
      slots: {
        Lunes: [],
        Martes: [],
        Miercoles: [],
        Jueves: [],
        Viernes: [],
        Sabado: [],
        Domingo: []
      },
      visibleDays: [],
      selectedSlots: {},
      // days: [],
      dayss: ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo'],
      units_sub: [],
      roles: {},
      variants: [],
      inputs: [{ startHour: null, finalHour: null, startHourRest: null, finalHourRest: null }],
      appointment: {
        name: "",
        code: "",
        Type_barcode: "",
        cost: "",
        price: "",
        brand_id: "",
        category_id: "",
        TaxNet: "0",
        tax_method: "1",
        unit_id: "",
        unit_sale_id: "",
        unit_purchase_id: "",
        stock_alert: "0",
        image: "",
        note: "",
        is_variant: false,
      },
      hours: [],
      code_exist: "",
      duration: 0
    };
  },

  components: {
    VueTagsInput,
    Calendar
  },
  mounted() {
       this.loadHours();
     },
  methods: {
    //------------- Submit Validation Create Product
    Submit_Appointment() {
      this.$refs.Create_Appointment.validate().then(success => {
        if (!success) {
          this.makeToast(
            "danger",
            this.$t("Please_fill_the_form_correctly"),
            this.$t("Failed")
          );
        } else {
          //this.Create_Appointment();
        }
      });
    },

    agregarInput(day) {
      
      this.slots[day].push({ startHour: null, finalHour: null, startHourRest: null, finalHourRest: null });
    },
    loadHours() {
      axios.post(`/Appointments/turns`, {})
          .then(response => {
              this.hours = response.data.turns;
                
                for(let turns of this.hours){
                  this.slots[turns.day].push({startHour: turns.startHour, finalHour: turns.finalHour,
                    startHourRest: turns.startHourRest, finalHourRest: turns.finalHourRest });
                }

              
                
          })
          .catch(error => {
              console.error(error);
      });

    },
    eliminarInput(day,index) {
      this.slots[day].splice(index, 1);
    },

    //------ Toast
    makeToast(variant, msg, title) {
      this.$root.$bvToast.toast(msg, {
        title: title,
        variant: variant,
        solid: true
      });
    },

    toggleSlots(day) {
      if (this.visibleDays.includes(day)) {
        this.visibleDays = this.visibleDays.filter(d => d !== day);
      } else {
        this.visibleDays.push(day);
      }
    },

    //------ Validation State
    getValidationState({ dirty, validated, valid = null }) {
      return dirty || validated ? valid : null;
    },

    //------Show Notification If Variant is Duplicate
    showNotifDuplicate() {
      this.makeToast(
        "warning",
        this.$t("VariantDuplicate"),
        this.$t("Warning")
      );
    },

    //-------------- Product Get Elements
    GetElements() {
      axios
        .get("Appointments/create")
        .then(response => {
          this.days = response.data.days;
          this.isLoading = false;
        })
        .catch(response => {
          setTimeout(() => {
            this.isLoading = false;
          }, 500);
          this.makeToast("danger", this.$t("InvalidData"), this.$t("Failed"));
        });
    },

    //---------------------- Get Sub Units with Unit id ------------------------------\\
    Get_Units_SubBase(value) {
      axios
        .get("Get_Units_SubBase?id=" + value)
        .then(({ data }) => (this.units_sub = data));
    },

    //---------------------- Event Select Unit Product ------------------------------\\
    Selected_Unit(value) {
      this.units_sub = [];
      this.appointment.unit_sale_id = "";
      this.appointment.unit_purchase_id = "";
      this.Get_Units_SubBase(value);
    },

    agregarCeros(numero) {
      return numero < 10 ? '0' + numero : numero;
    },

    convertDate(date){
      const fechaOriginal = new Date(date);

      const anio = fechaOriginal.getFullYear();
      const mes = fechaOriginal.getMonth() + 1; // Los meses en JavaScript están indexados desde 0, por lo que sumamos 1
      const dia = fechaOriginal.getDate();
      const hora = fechaOriginal.getHours();
      const minutos = fechaOriginal.getMinutes();
      const segundos = fechaOriginal.getSeconds();
      const milisegundos = fechaOriginal.getMilliseconds();

      return `${anio}-${this.agregarCeros(mes)}-${this.agregarCeros(dia)}T${this.agregarCeros(hora)}:${this.agregarCeros(minutos)}:${this.agregarCeros(segundos)}.${milisegundos}Z`;
    },

    prepareSlots(){
      this.slots.Lunes = this.slots.Lunes.map((data) => {
        return {
          startHour: this.convertDate(data.startHour),
          finalHour: this.convertDate(data.finalHour),
          startHourRest: this.convertDate(data.startHourRest),
          finalHourRest: this.convertDate(data.finalHourRest),
        }
      });

      this.slots.Martes = this.slots.Martes.map((data) => {
        return {
          startHour: this.convertDate(data.startHour),
          finalHour: this.convertDate(data.finalHour),
          startHourRest: this.convertDate(data.startHourRest),
          finalHourRest: this.convertDate(data.finalHourRest),
        }
      });

      this.slots.Miercoles = this.slots.Martes.map((data) => {
        return {
          startHour: this.convertDate(data.startHour),
          finalHour: this.convertDate(data.finalHour),
          startHourRest: this.convertDate(data.startHourRest),
          finalHourRest: this.convertDate(data.finalHourRest),
        }
      });

      this.slots.Jueves = this.slots.Jueves.map((data) => {
        return {
          startHour: this.convertDate(data.startHour),
          finalHour: this.convertDate(data.finalHour),
          startHourRest: this.convertDate(data.startHourRest),
          finalHourRest: this.convertDate(data.finalHourRest),
        }
      });

      this.slots.Viernes = this.slots.Viernes.map((data) => {
        return {
          startHour: this.convertDate(data.startHour),
          finalHour: this.convertDate(data.finalHour),
          startHourRest: this.convertDate(data.startHourRest),
          finalHourRest: this.convertDate(data.finalHourRest),
        }
      });

      this.slots.Sabado = this.slots.Sabado.map((data) => {
        return {
          startHour: this.convertDate(data.startHour),
          finalHour: this.convertDate(data.finalHour),
          startHourRest: this.convertDate(data.startHourRest),
          finalHourRest: this.convertDate(data.finalHourRest),
        }
      });

      this.slots.Domingo = this.slots.Domingo.map((data) => {
        return {
          startHour: this.convertDate(data.startHour),
          finalHour: this.convertDate(data.finalHour),
          startHourRest: this.convertDate(data.startHourRest),
          finalHourRest: this.convertDate(data.finalHourRest),
        }
      });

    },
    //------------------------------ Create new Product ------------------------------\\
    Create_Appointment() {
      // Send Data with axios
      
      this.prepareSlots();
      axios
        .post("Appointments", {
          'hours': this.slots,
          'duration': this.duration
        })
        .then(response => {
          // Complete the animation of theprogress bar.
          NProgress.done();
          self.SubmitProcessing = false;
          this.$router.push({ path: "/app/dates/store" });
          this.makeToast(
            "success",
            this.$t("Successfully_Created"),
            this.$t("Success")
          );
        })
        .catch(error => {
          // Complete the animation of theprogress bar.
          NProgress.done();
          if (error.errors.code.length > 0) {
            self.code_exist = error.errors.code[0];
          }
          this.makeToast("danger", this.$t("InvalidData"), this.$t("Failed"));
          self.SubmitProcessing = false;
        });
    }
  }, //end Methods

  //-----------------------------Created function-------------------
  created: function () {
    this.GetElements();
  },

  
};
</script>

<style scoped>
.b-collapse {
  display: flex;
  flex-wrap: wrap;
}

.b-list-group-item {
  flex: 0 0 25%;
}
</style>