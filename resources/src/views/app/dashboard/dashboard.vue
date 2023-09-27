<template>
  <!-- ============ Body content start ============= -->
  <div class="main-content" >
    <b-row>
      <b-col cols="8">
        <div class="card" style="background-color: #F1F5F8; padding: 10px; height: 100%;">
          <div class="row mb-6" style="margin-bottom: 10px;">
            <div class="col-sm-4">
              <h2 class="text-center">Agenda del día</h2>
            </div>
              <div class="col-sm-4">
            </div>
            <div class="col-sm-4">
              <h2 class="text-center" style="color:">Miercoles</h2>
            </div>
            
          </div>
          
          <div class="col-sm-12">
            <div class="row text-center" style="font-size: 25px; ">
              <div class="col-sm-4" >
                8:00 am
              </div>
              <div class="col-sm-4" style="letter-spacing: 2px;">
                ......................................
              </div>
              <div class="col-sm-4">
                Braulio Zapata
              </div>
            </div>
            <div class="row text-center" style="font-size: 25px; ">
              <div class="col-sm-4" >
                9:00 am
              </div>
              <div class="col-sm-4" style="letter-spacing: 2px;">
                ......................................
              </div>
              <div class="col-sm-4">
                Matías Rodriguez
              </div>
            </div>
            <div class="row text-center" style="font-size: 25px; ">
              <div class="col-sm-4" >
                10:00 am
              </div>
              <div class="col-sm-4" style="letter-spacing: 2px;">
                ......................................
              </div>
              <div class="col-sm-4">
                Test Alex
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
                      <div class="row">
                        <div class="col-sm-2">
                          <b-avatar :src="'images/avatar/no_avatar.png'"></b-avatar>
                        </div>
                        <div class="col-sm-6">
                            <h5 class="">Braulio Zapata</h5>
                            <h6 class="text-muted">
                                Hace 1 hora 
                            </h6>
                        </div>
                        <div class="col-sm-4">
                          <br>
                          <span class="badge rounded-pill bg-success">Actualizado</span>

                        </div>
                      </div>
                      <hr style="margin-top: -1px;">
                    </div>
                </div>
              </div>
              <div class="">
                      <!-- Título de la tarjeta -->
                <div class="row">
                    <div class="col-sm-12">
                      <div class="row">
                        <div class="col-sm-2">
                          <b-avatar :src="'images/avatar/no_avatar.png'"></b-avatar>
                        </div>
                        <div class="col-sm-6">
                            <h5 class="">Braulio Zapata</h5>
                            <h6 class="text-muted">
                                Hace 1 hora 
                            </h6>
                        </div>
                        <div class="col-sm-4">
                          <br>
                          <span class="badge rounded-pill bg-success">Actualizado</span>
                        </div>
                      </div>
                      <hr style="margin-top: -1px;">
                    </div>
                </div>
              </div>
            </b-card>
          </b-col>

        </b-row>
        <b-row>
          <b-col cols="12">
            <b-card class="mb-30" style="background-color: #4B9AEB;">
            <h4 class="card-title m-0">{{ $t('TopPatient') }} ({{ CurrentMonth }})</h4>
            <div class="chart-wrapper">
              <v-chart :options="echartPatient" :autoresize="true"></v-chart>
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
    "v-chart": ECharts
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
      echartAppointment: {}
    };
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

          this.report_today = response.data.report_dashboard.original.report;
          // this.stock_alerts =
          // response.data.report_dashboard.original.stock_alert;
          this.appointments = response.data.report_dashboard.original.last_appointments;
          this.patients = response.data.report_dashboard.original.patients;
          var dark_heading = "#c2c6dc";
          this.echartPatient = {
            color: ["#6D28D9", "#8B5CF6", "#A78BFA", "#C4B5FD", "#7C3AED"],
            tooltip: {
              show: true,
              backgroundColor: "rgba(0, 0, 0, .8)"
            },

            formatter: function (params) {
              return `${params.name}: (${params.data.value} cita) (${params.percent
                }%)`;
            },

            series: [
              {
                name: "Top Patients",
                type: "pie",
                radius: "50%",
                center: "50%",

                data: responseData.patients.original,
                itemStyle: {
                  emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: "rgba(0, 0, 0, 0.5)"
                  }
                }
              }
            ]
          };
          this.echartAppointment = {
            tooltip: {
              trigger: "axis"
            },
            legend: {
              data: ["Citas Recibidas", "Citas Pendientes"]
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
                name: "Citas Recibidas",
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
    }
  },
  async mounted() {
    await this.report_with_echart();
    this.GetMonth();
  }
};
</script>