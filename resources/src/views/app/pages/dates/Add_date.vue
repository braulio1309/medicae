<template>
  <div class="main-content">
    <div v-if="isLoading" class="loading_page spinner spinner-primary mr-3"></div>
    <div>
      <b-tabs content-class="mt-3">
        <b-tab title="Horario" active>
          <validation-observer v-if="!isLoading">
            <b-form @submit.prevent="Submit_Appointment" enctype="multipart/form-data">
              <b-row>
                <b-col md="12">
                  <h1>{{ $t('AppointmentManagement') }}</h1>
                  <label for="duracion-consulta">{{ $t('DurationOfAppointment') }}</label>
                  <input type="number" class='form-control col-xs-5 col-sm-5 col-md-5 col-lg-5' id="duracion-consulta"
                    v-model="this.duration" />
                  <div v-for="(day, index) in dayss" :key="index" class="mt-1">
                    <b-card>
                      <h6 class="d-inline">{{ day }}</h6>
                      <b-button @click="toggleSlots(day)" variant="link" class="float-right">
                        <i :class="visibleDays.includes(day) ? 'i-Remove' : 'i-Add'"></i>
                      </b-button>
                      <b-collapse :visible="visibleDays.includes(day)">
                        <div>
                          <input class='btn btn-primary' type='button' @click="agregarInput(day)" value="Agregar horas" />
                          <div class="m-3 row" v-for="(input, index) in slots[day]" :key="index">
                            <!--<input  class='form-control col-xs-8 col-sm-8 col-md-10 col-lg-10' :key="index" type="time" v-model="input.horas" placeholder="Ingrese las horas">-->

                            <div class="col-sm-2">
                              <label for="hora-final">Desde:</label>
                              <Calendar id="hora-inicio" v-model="input.startHour" timeOnly />
                            </div>
                            <div class="col-sm-2">
                              <label for="hora-final">Hasta:</label>
                              <Calendar id="hora-final" v-model="input.finalHour" timeOnly />
                            </div>


                            <div class="col-sm-2">
                              <label for="hora-final">Desde (Descanso):</label>
                              <Calendar id="hora-inicio" v-model="input.startHourRest" :timeOnly="true"
                                :showSeconds="false" :showMillisec="false" />
                            </div>
                            <div class="col-sm-2">
                              <label for="hora-final">Hasta (Descanso):</label>

                              <Calendar id="hora-final" v-model="input.finalHourRest" :timeOnly="true"
                                :showSeconds="false" :showMillisec="false" />
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
        </b-tab>
        <b-tab title="Vacaciones">
          <div class="main-content">
            <div v-if="isLoading" class="loading_page spinner spinner-primary mr-3"></div>
            <b-row v-if="!isLoading">

              <b-col md="12">

                <div class="form-group d-flex justify-content-center align-items-center mb-10">
                  <label>Seleccione su rango de vacaciones:</label>

                  <Calendar :minDate="minSelectableDate" v-model="dates" selectionMode="range" :manualInput="false" />
                  <Button class="p-button-rounded float-right" @click="saveVacations"
                    :disabled="dates.length == 0">Reservar
                    Cita</Button>
                  <div v-once class="typo__p" v-if="SubmitProcessing">
                    <div class="spinner sm spinner-primary mt-3"></div>
                  </div>

                </div>
              </b-col>

            </b-row>

            <b-row v-if="!isLoading">

              <b-col md="12">
                <div class="form-group d-flex justify-content-center align-items-center">
                  <vue-good-table mode="remote" :columns="columns" :totalRows="5" :rows="this.vacations"
                    :pagination-options="{
                      enabled: true,
                      mode: 'Resultados',
                      nextLabel: 'Siguiente',
                      prevLabel: 'Anterior',
                    }" styleClass="table-hover tableOne vgt-table">
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

                        <a title="Delete" v-b-tooltip.hover @click="RemoveVacations(props.row.id)">
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
        </b-tab>
      </b-tabs>
    </div>


  </div>
</template>


<script>
import VueTagsInput from "@johmun/vue-tags-input";
import { TabView, TabPanel } from 'primevue/tabview';
import Button from "primevue/button"
import Calendar from 'primevue/calendar';
import 'primevue/resources/primevue.min.css';
import 'primevue/resources/themes/saga-blue/theme.css';
import 'primeicons/primeicons.css';
import NProgress from "nprogress";


export default {
  metaInfo: {
    title: "Registrar Reserva"
  },
  data() {
    return {
      SubmitProcessing: false,
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
      ],
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
    Calendar,
    TabView,
    TabPanel,
    Button
  },
  mounted() {
    this.loadHours();
    this.loadVacations();
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

          for (let turns of this.hours) {
            this.slots[turns.day].push({
              startHour: turns.startHour, finalHour: turns.finalHour,
              startHourRest: turns.startHourRest, finalHourRest: turns.finalHourRest
            });
          }



        })
        .catch(error => {
          console.error(error);
        });

    },
    eliminarInput(day, index) {
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

    convertDate(date) {
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

    prepareSlots() {
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
    },
    loadVacations() {

      axios.get(`/vacations`)
        .then(response => {
          console.log(response.data.vacations)
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
}</style>