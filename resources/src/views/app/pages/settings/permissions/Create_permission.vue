<template>
  <div class="main-content">
    <breadcumb :page="'Gestión de permisos'" :folder="$t('Settings')"/>
    <div v-if="isLoading" class="loading_page spinner spinner-primary mr-3"></div>

    <validation-observer ref="Create_Permission" v-if="!isLoading">
      <b-form @submit.prevent="Submit_Permission">
        <b-row>
          <b-col lg="12" md="12" sm="12">
            <b-card>
              <b-row>
                <!-- Role Name -->
                <b-col md="6">
                  <validation-provider
                    name="Role name"
                    :rules="{ required: true}"
                    v-slot="validationContext"
                  >
                    <b-form-group :label="$t('RoleName')">
                      <b-form-input
                        :placeholder="$t('Enter_Role_Name')"
                        :state="getValidationState(validationContext)"
                        aria-describedby="Role-feedback"
                        v-model="role.name"
                      ></b-form-input>
                      <b-form-invalid-feedback id="Role-feedback">{{ validationContext.errors[0] }}</b-form-invalid-feedback>
                    </b-form-group>
                  </validation-provider>
                </b-col>

                <!-- Role Description -->
                <b-col md="6">
                  <b-form-group :label="$t('RoleDescription')">
                    <b-form-input
                      :placeholder="$t('Enter_Role_Description')"
                      v-model="role.description"
                    ></b-form-input>
                  </b-form-group>
                </b-col>
              </b-row>

              <b-row class="mt-4">
                <!--  Permissions -->
                <b-col md="4">
                  <b-card no-body class="ul-card__border-radius">
                    <b-card-header header-tag="header" class="p-1" role="tab">
                      <b-button
                        class="card-title mb-0"
                        block
                        href="#"
                        v-b-toggle.panel-Permissions
                        variant="transparent"
                      >Permisos</b-button>
                    </b-card-header>
                    <b-collapse
                      id="panel-Permissions "
                      :visible="true"
                      accordion="my-accordion1"
                      role="tabpanel"
                    >
                      <b-card-body>
                        <b-card-text>
                          <b-row>
                            <!--Permissions View -->
                            <b-col md="6">
                              <label class="checkbox checkbox-outline-primary">
                                <input
                                  type="checkbox"
                                  checked
                                  v-model="permissions"
                                  value="permissions_view"
                                >
                                <span>{{$t('View')}}</span>
                                <span class="checkmark"></span>
                              </label>
                            </b-col>
                            <!--Permissions ADD -->
                            <b-col md="6">
                              <label class="checkbox checkbox-outline-primary">
                                <input
                                  type="checkbox"
                                  checked
                                  v-model="permissions"
                                  value="permissions_add"
                                >
                                <span>{{$t('Add')}}</span>
                                <span class="checkmark"></span>
                              </label>
                            </b-col>
                            <!--Permissions Edit -->
                            <b-col md="6">
                              <label class="checkbox checkbox-outline-primary">
                                <input
                                  type="checkbox"
                                  checked
                                  v-model="permissions"
                                  value="permissions_edit"
                                >
                                <span>{{$t('Edit')}}</span>
                                <span class="checkmark"></span>
                              </label>
                            </b-col>
                            <!--Permissions Delete -->
                            <b-col md="6">
                              <label class="checkbox checkbox-outline-primary">
                                <input
                                  type="checkbox"
                                  checked
                                  v-model="permissions"
                                  value="permissions_delete"
                                >
                                <span>{{$t('Del')}}</span>
                                <span class="checkmark"></span>
                              </label>
                            </b-col>
                          </b-row>
                        </b-card-text>
                      </b-card-body>
                    </b-collapse>
                  </b-card>
                </b-col>

                <!--  Users Patients -->
                <b-col md="4">
                  <b-card no-body class="ul-card__border-radius">
                    <b-card-header header-tag="header" class="p-1" role="tab">
                      <b-button
                        class="card-title mb-0"
                        block
                        href="#"
                        v-b-toggle.panel-Products
                        variant="transparent"
                      >Pacientes</b-button>
                    </b-card-header>
                    <b-collapse
                      id="panel-Products"
                      :visible="true"
                      accordion="my-accordion4"
                      role="tabpanel"
                    >
                      <b-card-body>
                        <b-card-text>
                          <b-row>
                            <!--Products View -->
                            <b-col md="6">
                              <label class="checkbox checkbox-outline-primary">
                                <input
                                  type="checkbox"
                                  checked
                                  v-model="permissions"
                                  value="users_patients_view"
                                >
                                <span>{{$t('View')}}</span>
                                <span class="checkmark"></span>
                              </label>
                            </b-col>
                            <!--Products ADD -->
                            <b-col md="6">
                              <label class="checkbox checkbox-outline-primary">
                                <input
                                  type="checkbox"
                                  checked
                                  v-model="permissions"
                                  value="users_patients_add"
                                >
                                <span>{{$t('Add')}}</span>
                                <span class="checkmark"></span>
                              </label>
                            </b-col>
                            <!--Products Edit -->
                            <b-col md="6">
                              <label class="checkbox checkbox-outline-primary">
                                <input
                                  type="checkbox"
                                  checked
                                  v-model="permissions"
                                  value="users_patients_edit"
                                >
                                <span>{{$t('Edit')}}</span>
                                <span class="checkmark"></span>
                              </label>
                            </b-col>
                            <!--Products Delete -->
                            <b-col md="6">
                              <label class="checkbox checkbox-outline-primary">
                                <input
                                  type="checkbox"
                                  checked
                                  v-model="permissions"
                                  value="users_patients_delete"
                                >
                                <span>{{$t('Del')}}</span>
                                <span class="checkmark"></span>
                              </label>
                            </b-col>
                          </b-row>
                        </b-card-text>
                      </b-card-body>
                    </b-collapse>
                  </b-card>
                </b-col>
                
                <!--  Appointment-->
                <b-col md="4">
                  <b-card no-body class="ul-card__border-radius">
                    <b-card-header header-tag="header" class="p-1" role="tab">
                      <b-button
                        class="card-title mb-0"
                        block
                        href="#"
                        v-b-toggle.panel-Products
                        variant="transparent"
                      >Citas</b-button>
                    </b-card-header>
                    <b-collapse
                      id="panel-Products"
                      :visible="true"
                      accordion="my-accordion5"
                      role="tabpanel"
                    >
                      <b-card-body>
                        <b-card-text>
                          <b-row>
                            <!--Products View -->
                            <b-col md="6">
                              <label class="checkbox checkbox-outline-primary">
                                <input
                                  type="checkbox"
                                  checked
                                  v-model="permissions"
                                  value="appointments_view"
                                >
                                <span>{{$t('View')}}</span>
                                <span class="checkmark"></span>
                              </label>
                            </b-col>
                            <!--Products ADD -->
                            <b-col md="6">
                              <label class="checkbox checkbox-outline-primary">
                                <input
                                  type="checkbox"
                                  checked
                                  v-model="permissions"
                                  value="appointments_add"
                                >
                                <span>{{$t('Add')}}</span>
                                <span class="checkmark"></span>
                              </label>
                            </b-col>
                            <!--Products Edit -->
                            <b-col md="6">
                              <label class="checkbox checkbox-outline-primary">
                                <input
                                  type="checkbox"
                                  checked
                                  v-model="permissions"
                                  value="appointments_edit"
                                >
                                <span>{{$t('Edit')}}</span>
                                <span class="checkmark"></span>
                              </label>
                            </b-col>
                            <!--Products Delete -->
                            <b-col md="6">
                              <label class="checkbox checkbox-outline-primary">
                                <input
                                  type="checkbox"
                                  checked
                                  v-model="permissions"
                                  value="appointments_delete"
                                >
                                <span>{{$t('Del')}}</span>
                                <span class="checkmark"></span>
                              </label>
                            </b-col>
                          </b-row>
                        </b-card-text>
                      </b-card-body>
                    </b-collapse>
                  </b-card>
                </b-col>
                
                <!--  Reservations-->
                <b-col md="4">
                  <b-card no-body class="ul-card__border-radius">
                    <b-card-header header-tag="header" class="p-1" role="tab">
                      <b-button
                        class="card-title mb-0"
                        block
                        href="#"
                        v-b-toggle.panel-Products
                        variant="transparent"
                      >Horarios de Doctores</b-button>
                    </b-card-header>
                    <b-collapse
                      id="panel-Products"
                      :visible="true"
                      accordion="my-accordion6"
                      role="tabpanel"
                    >
                      <b-card-body>
                        <b-card-text>
                          <b-row>
                            <!--Products View -->
                            <b-col md="6">
                              <label class="checkbox checkbox-outline-primary">
                                <input
                                  type="checkbox"
                                  checked
                                  v-model="permissions"
                                  value="reservations_view"
                                >
                                <span>{{$t('View')}}</span>
                                <span class="checkmark"></span>
                              </label>
                            </b-col>
                            <!--Products ADD -->
                            <b-col md="6">
                              <label class="checkbox checkbox-outline-primary">
                                <input
                                  type="checkbox"
                                  checked
                                  v-model="permissions"
                                  value="reservations_add"
                                >
                                <span>{{$t('Add')}}</span>
                                <span class="checkmark"></span>
                              </label>
                            </b-col>
                            <!--Products Edit -->
                            <b-col md="6">
                              <label class="checkbox checkbox-outline-primary">
                                <input
                                  type="checkbox"
                                  checked
                                  v-model="permissions"
                                  value="reservations_edit"
                                >
                                <span>{{$t('Edit')}}</span>
                                <span class="checkmark"></span>
                              </label>
                            </b-col>
                            <!--Products Delete -->
                            <b-col md="6">
                              <label class="checkbox checkbox-outline-primary">
                                <input
                                  type="checkbox"
                                  checked
                                  v-model="permissions"
                                  value="reservations_delete"
                                >
                                <span>{{$t('Del')}}</span>
                                <span class="checkmark"></span>
                              </label>
                            </b-col>
                          </b-row>
                        </b-card-text>
                      </b-card-body>
                    </b-collapse>
                  </b-card>
                </b-col>

                <!-- Reports -->
                <b-col md="4">
                  <b-card no-body class="ul-card__border-radius">
                    <b-card-header header-tag="header" class="p-1" role="tab">
                      <b-button
                        class="card-title mb-0"
                        block
                        href="#"
                        v-b-toggle.panel-Reports
                        variant="transparent"
                      >Reportes</b-button>
                    </b-card-header>
                    <b-collapse
                      id="panel-Reports"
                      :visible="true"
                      accordion="my-accordion7"
                      role="tabpanel"
                    >
                      <b-card-body>
                        <b-card-text>
                          <b-row>
                           
                            <!--Reports_payments_Purchases  -->
                            <b-col md="12">
                              <label class="checkbox checkbox-outline-primary">
                                <input
                                  type="checkbox"
                                  checked
                                  v-model="permissions"
                                  value="reports_reservas"
                                >
                                <span>Reportes de reservas</span>
                                <span class="checkmark"></span>
                              </label>
                            </b-col>
                            <!--Reports_payments_Sale_Returns  -->
                            <b-col md="12">
                              <label class="checkbox checkbox-outline-primary">
                                <input
                                  type="checkbox"
                                  checked
                                  v-model="permissions"
                                  value="reports_patients"
                                >
                                <span>Reportes de Pacientes</span>
                                <span class="checkmark"></span>
                              </label>
                            </b-col>
                           
                          </b-row>
                        </b-card-text>
                      </b-card-body>
                    </b-collapse>
                  </b-card>
                </b-col>

                <!-- Settings -->
                <b-col md="4">
                  <b-card no-body class="ul-card__border-radius">
                    <b-card-header header-tag="header" class="p-1" role="tab">
                      <b-button
                        class="card-title mb-0"
                        block
                        href="#"
                        v-b-toggle.panel-Settings
                        variant="transparent"
                      >Configuración</b-button>
                    </b-card-header>
                    <b-collapse
                      id="panel-Settings"
                      :visible="true"
                      accordion="my-accordion8"
                      role="tabpanel"
                    >
                      <b-card-body>
                        <b-card-text>
                          <b-row>
                            <!--Settings System -->
                            <b-col md="6">
                              <label class="checkbox checkbox-outline-primary">
                                <input
                                  type="checkbox"
                                  checked
                                  v-model="permissions"
                                  value="setting_system"
                                >
                                <span>{{$t('SystemSettings')}}</span>
                                <span class="checkmark"></span>
                              </label>
                            </b-col>
                           
                           
                            <!--Backup-->
                            <!-- <b-col md="6">
                              <label class="checkbox checkbox-outline-primary">
                                <input type="checkbox" checked v-model="permissions" value="backup">
                                <span>{{$t('Backup')}}</span>
                                <span class="checkmark"></span>
                              </label>
                            </b-col> -->
                          </b-row>
                        </b-card-text>
                      </b-card-body>
                    </b-collapse>
                  </b-card>
                </b-col>
              </b-row>
              <!-- End row -->
              
               <b-col md="12">
                <b-button variant="primary" type="submit"  :disabled="SubmitProcessing">{{$t('submit')}}</b-button>
                  <div v-once class="typo__p" v-if="SubmitProcessing">
                    <div class="spinner sm spinner-primary mt-3"></div>
                  </div>
                </b-col>

            </b-card>
          </b-col>
        </b-row>
      </b-form>
    </validation-observer>
  </div>
</template>

<script>
import NProgress from "nprogress";

export default {
  metaInfo: {
    title: "Create Permissions"
  },
  data() {
    return {
      SubmitProcessing:false,
      isLoading: true,
      permissions: [],
      role: {
        name: "",
        description: ""
      }
    };
  },

  methods: {
    //------------- Submit Validation Create Permissions
    Submit_Permission() {
      this.$refs.Create_Permission.validate().then(success => {
        if (!success) {
          this.makeToast(
            "danger",
            this.$t("Please_fill_the_form_correctly"),
            this.$t("Failed")
          );
        } else {
          this.Create_Permission();
        }
      });
    },

    //---Validate State Fields
    getValidationState({ dirty, validated, valid = null }) {
      return dirty || validated ? valid : null;
    },

    //------ Toast
    makeToast(variant, msg, title) {
      this.$root.$bvToast.toast(msg, {
        title: title,
        variant: variant,
        solid: true
      });
    },
    //------------------------Check_Create_Page -------------------\\
    Check_Create_Page() {
      axios
        .get("roles/check/Create_page")
        .then(response => {
          this.isLoading = false;
        })
        .catch(response => {
          setTimeout(() => {
            this.isLoading = false;
          }, 500);
        });
    },

    //------------------------ Create Permissions -------------------\\
    Create_Permission() {
      this.SubmitProcessing = true;
      NProgress.start();
      NProgress.set(0.1);
      axios
        .post("roles", {
          role: this.role,
          permissions: this.permissions
        })
        .then(response => {
          this.SubmitProcessing = false;
          NProgress.done();
          this.makeToast(
            "success",
            this.$t("Create.TitleRole"),
            this.$t("Success")
          );

          this.$router.push({
            name: "groupPermission"
          });
        })
        .catch(error => {
          this.SubmitProcessing = false;
          NProgress.done();
          this.makeToast("danger", this.$t("InvalidData"), this.$t("Failed"));
        });
    }
  }, //end Methods

  created: function() {
    this.Check_Create_Page();
  }
};
</script>
