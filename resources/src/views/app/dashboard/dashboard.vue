<template>
  <!-- ============ Body content start ============= -->
  <div class="main-content">
    <b-row>
      <b-col cols="8">
        <div class="card" style="background-color: #FFFFFF; padding: 10px; height: 80%; ">
          <div class="row mb-6" style="margin-bottom: 10px; padding-top: 30px;">
            <div class="col-sm-4">
              <h2 class="text-center">Agenda del día</h2>
            </div>
            <div class="col-sm-4">
            </div>
            <div class="col-sm-4">
              <h1 class="text-center" style="color:#66CCF2; font-weight: 200;"><b>{{ this.currentDay }}</b></h1>
            </div>

          </div>

          <div class="col-sm-12">
            <div class="row text-center" style="" v-for="turn in this.todayTurns">
              <div class="col-sm-4">
                <h5>{{ new Date(turn.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }}</h5>
              </div>
              <div class="col-sm-4" style="letter-spacing: 2px;">
                ......................................
              </div>
              <div class="col-sm-4">
                <h5>{{ turn.firstname }} {{ turn.lastname }}</h5>
              </div>
            </div>
          </div>
        </div>
      </b-col>
      <b-col cols="4">
        <b-row>
          <b-col cols="12">
            <b-card class="mb-30">
              <h4 class="font-weight-bold mb-4">Ultimas citas</h4>
              <div class="">
                <!-- Título de la tarjeta -->
                <div class="row">
                  <div class="col-sm-12">
                    <div class="row mb-3" v-for="turn in this.last" style="border-bottom: 1px solid #e2e0e0;">
                      <div class="col-sm-2">
                        <b-avatar :src="'images/avatar/no_avatar.png'"></b-avatar>
                      </div>
                      <div class="col-sm-6">
                        <h5 class=""> {{ turn.firstname }} {{ turn.lastname }}</h5>
                        <h6 class="text-muted">
                          {{ formatHours(turn.date) }}
                        </h6>
                      </div>
                      <div class="col-sm-4">
                        <br>
                        <span class="badge rounded-pill bg-success">Actualizado</span>

                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </b-card>
          </b-col>

        </b-row>
        <b-row style="margin-top: -18px;">
          <b-col cols="12">

            <b-card class="mb-30" style="background-color: #FFFFFF;">
              <div class="row justify-text-center">
                <div class="col-sm-6 text-center">
                  <h2 class="card-title text-muted">Reservaciones del mes</h2>
                </div>
                <div class="col-sm-6 text-center" v-if="this.ReservationsMonth != ''">
                  <h3>{{ this.ReservationsMonth.current_month_reservations }} <span class="badge bg-danger"
                      style='font-size:12px; background-color: rgba(0,166,80,.1) !important; color:#00a650;'>{{
                        (this.ReservationsMonth.percentage_change.toFixed(2) < 0) ?
                        this.ReservationsMonth.percentage_change.toFixed(0) * -1 :
                        this.ReservationsMonth.percentage_change.toFixed(0) }}% </span>
                  </h3>

                </div>
              </div>
              <div class="chart-wrapper">
                <v-chart v-if="this.echartAppointment" :options="this.echartAppointment" :autoresize="true"></v-chart>

              </div>
            </b-card>
          </b-col>
        </b-row>
      </b-col>
    </b-row>

  </div>
  <!-- ============ Body content End ============= -->
</template>
<script>
import { mapGetters } from "vuex";
import ECharts from "vue-echarts/components/ECharts.vue";

// import ECharts modules manually to reduce bundle size
import "echarts/lib/chart/pie";
import "echarts/lib/chart/bar";
import "echarts/lib/chart/line";
import "echarts/lib/component/tooltip";
import "echarts/lib/component/legend";

export default {
  components: {
    "v-chart": ECharts,
  },
  metaInfo: {
    // if no subcomponents specify a metaInfo.title, this title will be used
    title: "Dashboard"
  },
  data() {
    return {
      appointments: [],
      stock_alerts: [],
      report_today: {
        revenue: 0,
        today_purchases: 0,
        return_sales: 0,
        profit: 0
      },
      CurrentMonth: "",
      patients: [],
      loading: true,
      echartSales: {},
      echartProduct: {},
      echartPatient: {},
      echartAppointment: null,
      todayTurns: [],
      currentDay: '',
      last: [],
      ReservationsMonth: ''

    }
  },
  computed: {
    ...mapGetters(["currentUser"]),
    columns_appointment() {
      return [
        {
          label: this.$t("Reference"),
          field: "id",
          tdClass: "gull-border-none text-left",
          thClass: "text-left",
          sortable: false
        },
        {
          label: this.$t("Doctor"),
          field: "doctor_name",
          tdClass: "gull-border-none text-left",
          thClass: "text-left",
          sortable: false
        },
        {
          label: this.$t("Patient"),
          field: "patient_name",
          tdClass: "gull-border-none text-left",
          thClass: "text-left",
          sortable: false
        },
        {
          label: this.$t("Day"),
          field: "day",
          html: true,
          sortable: false,
          tdClass: "text-left gull-border-none",
          thClass: "text-left"
        }
      ];
    },
    columns_stock() {
      return [
        {
          label: this.$t("ProductCode"),
          field: "code",
          tdClass: "text-left",
          thClass: "text-left",
          sortable: false
        },
        {
          label: this.$t("ProductName"),
          field: "name",
          tdClass: "text-left",
          thClass: "text-left",
          sortable: false
        },
        {
          label: this.$t("warehouse"),
          field: "warehouse",
          tdClass: "text-left",
          thClass: "text-left",
          sortable: false
        },
        {
          label: this.$t("Quantity"),
          field: "quantity",
          tdClass: "text-left",
          thClass: "text-left",
          sortable: false
        },
        {
          label: this.$t("AlertQuantity"),
          field: "stock_alert",
          tdClass: "text-left",
          thClass: "text-left",
          sortable: false
        }
      ];
    },
    columns_patients() {
      return [
        {
          label: this.$t("Name"),
          field: "name",
          tdClass: "text-left",
          thClass: "text-left",
          sortable: false
        },
      ];
    }
  },
  methods: {
    //---------------------------------- Report Dashboard With Echart
    report_with_echart() {
      axios
        .get(`chart/report_with_echart`)
        .then(response => {
          const responseData = response.data;
          console.log(responseData.appointments.original)


          console.log(this.appointments)
          this.echartAppointment = {
            tooltip: {
              trigger: "axis"
            },
            legend: {
              data: ["Citas Pasadas", "Citas Pendientes"]
            },
            grid: {
              left: "3%",
              right: "4%",
              bottom: "3%",
              containLabel: true
            },
            toolbox: {
              feature: {
                saveAsImage: {}
              }
            },
            xAxis: {
              type: "category",
              boundaryGap: false,
              data: responseData.appointments.original.days
            },
            yAxis: {
              type: "value"
            },
            series: [
              {
                name: "Citas Pasadas",
                type: "line",
                data: responseData.appointments.original.appointments_received
              },
              {
                name: "Citas Pendientes",
                type: "line",
                data: responseData.appointments.original.appointments_pending
              }
            ]
          };
          console.log(this.echartAppointment)

          // this.echartProduct = {
          //   color: ["#6D28D9", "#8B5CF6", "#A78BFA", "#C4B5FD", "#7C3AED"],
          //   tooltip: {
          //     show: true,
          //     backgroundColor: "rgba(0, 0, 0, .8)"
          //   },
          //   formatter: function(params) {
          //     return `${params.name}: (${params.percent}%)`;
          //   },
          //   series: [
          //     {
          //       name: "Top Selling Products",
          //       type: "pie",
          //       radius: "50%",
          //       center: "50%",

          //       data: responseData.product_report.original,
          //       itemStyle: {
          //         emphasis: {
          //           shadowBlur: 10,
          //           shadowOffsetX: 0,
          //           shadowColor: "rgba(0, 0, 0, 0.5)"
          //         }
          //       }
          //     }
          //   ]
          // };
          // this.echartSales = {
          //   legend: {
          //     borderRadius: 0,
          //     orient: "horizontal",
          //     x: "right",
          //     data: ["Sales", "Purchases"]
          //   },
          //   grid: {
          //     left: "8px",
          //     right: "8px",
          //     bottom: "0",
          //     containLabel: true
          //   },
          //   tooltip: {
          //     show: true,

          //     backgroundColor: "rgba(0, 0, 0, .8)"
          //   },

          //   xAxis: [
          //     {
          //       type: "category",
          //       data: responseData.sales.original.days,
          //       axisTick: {
          //         alignWithLabel: true
          //       },
          //       splitLine: {
          //         show: false
          //       },
          //       axisLabel: {
          //         color: dark_heading,
          //         interval: 0,
          //         rotate: 30
          //       },
          //       axisLine: {
          //         show: true,
          //         color: dark_heading,

          //         lineStyle: {
          //           color: dark_heading
          //         }
          //       }
          //     }
          //   ],
          //   yAxis: [
          //     {
          //       type: "value",

          //       axisLabel: {
          //         color: dark_heading
          //         // formatter: "${value}"
          //       },
          //       axisLine: {
          //         show: false,
          //         color: dark_heading,

          //         lineStyle: {
          //           color: dark_heading
          //         }
          //       },
          //       min: 0,
          //       splitLine: {
          //         show: true,
          //         interval: "auto"
          //       }
          //     }
          //   ],

          //   series: [
          //     {
          //       name: "Sales",
          //       data: responseData.sales.original.data,
          //       label: { show: false, color: "#8B5CF6" },
          //       type: "bar",
          //       color: "#A78BFA",
          //       smooth: true,
          //       itemStyle: {
          //         emphasis: {
          //           shadowBlur: 10,
          //           shadowOffsetX: 0,
          //           shadowOffsetY: -2,
          //           shadowColor: "rgba(0, 0, 0, 0.3)"
          //         }
          //       }
          //     },
          //     {
          //       name: "Purchases",
          //       data: responseData.purchases.original.data,

          //       label: { show: false, color: "#0168c1" },
          //       type: "bar",
          //       barGap: 0,
          //       color: "#DDD6FE",
          //       smooth: true,
          //       itemStyle: {
          //         emphasis: {
          //           shadowBlur: 10,
          //           shadowOffsetX: 0,
          //           shadowOffsetY: -2,
          //           shadowColor: "rgba(0, 0, 0, 0.3)"
          //         }
          //       }
          //     }
          //   ]
          // };
          this.loading = false;
        })
        .catch(response => { });
    },

    //------------------------------Get Month -------------------------\\
    GetMonth() {
      var months = [
        "Enero",
        "Febrero",
        "Marzo",
        "Abril",
        "Mayo",
        "Junio",
        "Julio",
        "Agosto",
        "Septiembre",
        "Octubre",
        "Noviembre",
        "Diciembre"
      ];

      var now = new Date();
      this.CurrentMonth = months[now.getMonth()];

    },

    //------------------------------Formetted Numbers -------------------------\\
    formatNumber(number, dec) {
      const value = (typeof number === "string"
        ? number
        : number.toString()
      ).split(".");
      if (dec <= 0) return value[0];
      let formated = value[1] || "";
      if (formated.length > dec)
        return `${value[0]}.${formated.substr(0, dec)}`;
      while (formated.length < dec) formated += "0";
      return `${value[0]}.${formated}`;
    },
    getTurns() {
      axios
        .get("Appointments/turns/today")
        .then(response => {
          this.todayTurns = response.data.turns;
        })
        .catch(error => {
          console.log(error)
        });
    },
    getReservationsMonth() {
      axios
        .get("Reservations/mounth")
        .then(response => {
          this.ReservationsMonth = response.data;
        })
        .catch(error => {
          console.log(error)
        });
    },
    getLastTurns() {
      axios
        .get("Appointments/turns/last")
        .then(response => {
          this.last = response.data.data;
        })
        .catch(error => {
          console.log(error)
        });
    },
    formatHours(inputDate) {
      const currentDate = new Date();
      const targetDate = new Date(inputDate);
      const timeDifference = currentDate - targetDate;
      const hoursDifference = Math.floor(timeDifference / (1000 * 60 * 60));

      if (hoursDifference === 0) {
        return "hace menos de una hora";
      } else if (hoursDifference === 1) {
        return "hace una hora";
      } else {
        return `hace ${hoursDifference} horas`;
      }
    },
  },
  async mounted() {
    this.GetMonth();
    this.getTurns();
    this.getLastTurns();
    // Obtener la fecha actual
    const currentDate = new Date();

    // Obtener el día de la semana como número (0 para domingo, 1 para lunes, etc.)
    const dayOfWeek = currentDate.getDay();

    // Crear un array con los nombres de los días de la semana
    const daysOfWeek = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];

    // Asignar el nombre del día actual a currentDay
    this.currentDay = daysOfWeek[dayOfWeek];
    await this.report_with_echart();
    this.getReservationsMonth();
    console.log(this.echartAppointment);
  },

};
</script>