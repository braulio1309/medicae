<template>
    <div class="main-content">
      <breadcumb :page="$t('profil')" :folder="$t('Settings')"/>
      <div v-if="isLoading" class="loading_page spinner spinner-primary mr-3"></div>
  
      <div class="row">
        <div class="col-sm-3">
          <div class="card user-profile o-hidden mb-30" v-if="!isLoading">
            <div class="user-info">
              <p class="m-0 text-24">{{user.firstname}} {{ user.lastname }}</p>
            </div>
            <div class="card-body">
              <!--  Profile -->
              <validation-observer ref="Update_Profile">
                <b-form @submit.prevent="Submit_Profile" enctype="multipart/form-data">
                  <b-row>
                    <!-- First name -->
                    <b-col md="6" sm="12">
                      <validation-provider
                        name="Firstname"
                        :rules="{ required: true , min:4 , max:20}"
                        v-slot="validationContext"
                      >
                        <b-form-group :label="$t('Firstname')">
                          <b-form-input
                            :state="getValidationState(validationContext)"
                            aria-describedby="Firstname-feedback"
                            label="Firstname"
                            v-model="user.firstname"
                          ></b-form-input>
                          <b-form-invalid-feedback
                            id="Firstname-feedback"
                          >{{ validationContext.errors[0] }}</b-form-invalid-feedback>
                        </b-form-group>
                      </validation-provider>
                    </b-col>
      
                    <!-- Last name -->
                    <b-col md="6" sm="12">
                      <validation-provider
                        name="lastname"
                        :rules="{ required: true , min:4 , max:20}"
                        v-slot="validationContext"
                      >
                        <b-form-group :label="$t('lastname')">
                          <b-form-input
                            :state="getValidationState(validationContext)"
                            aria-describedby="lastname-feedback"
                            label="lastname"
                            v-model="user.lastname"
                          ></b-form-input>
                          <b-form-invalid-feedback
                            id="lastname-feedback"
                          >{{ validationContext.errors[0] }}</b-form-invalid-feedback>
                        </b-form-group>
                      </validation-provider>
                    </b-col>
      
                    <!-- Username -->
                    <b-col md="6" sm="12">
                      <validation-provider
                        name="username"
                        :rules="{ required: true , min:4 , max:20}"
                        v-slot="validationContext"
                      >
                        <b-form-group :label="$t('username')">
                          <b-form-input
                            :state="getValidationState(validationContext)"
                            aria-describedby="username-feedback"
                            label="username"
                            v-model="user.username"
                          ></b-form-input>
                          <b-form-invalid-feedback
                            id="username-feedback"
                          >{{ validationContext.errors[0] }}</b-form-invalid-feedback>
                        </b-form-group>
                      </validation-provider>
                    </b-col>
      
                    <!-- Phone -->
                    <b-col md="6" sm="12">
                      <validation-provider
                        name="Phone"
                        :rules="{ required: true}"
                        v-slot="validationContext"
                      >
                        <b-form-group :label="$t('Phone')">
                          <b-form-input
                            :state="getValidationState(validationContext)"
                            aria-describedby="Phone-feedback"
                            label="Phone"
                            v-model="user.phone"
                          ></b-form-input>
                          <b-form-invalid-feedback id="Phone-feedback">{{ validationContext.errors[0] }}</b-form-invalid-feedback>
                        </b-form-group>
                      </validation-provider>
                    </b-col>
      
                    <!-- Email -->
                    <b-col md="6" sm="12">
                      <validation-provider
                        name="Email"
                        :rules="{ required: true}"
                        v-slot="validationContext"
                      >
                        <b-form-group :label="$t('Email')">
                          <b-form-input
                            :state="getValidationState(validationContext)"
                            aria-describedby="Email-feedback"
                            label="Email"
                            v-model="user.email"
                          ></b-form-input>
                          <b-form-invalid-feedback id="Email-feedback">{{ validationContext.errors[0] }}</b-form-invalid-feedback>
                        </b-form-group>
                      </validation-provider>
                    </b-col>

                    <b-col md="6" sm="12">
                        <b-form-group :label="'Peso'">
                          <b-form-input
                            aria-describedby="weight-feedback"
                            label="Peso"
                            v-model="user.weight"
                          ></b-form-input>
                        </b-form-group>
                    </b-col>

                    <b-col md="6" sm="12">
                        <b-form-group :label="'Altura'">
                          <b-form-input
                            aria-describedby="height-feedback"
                            label="altura"
                            v-model="user.height"
                          ></b-form-input>
                        </b-form-group>
                    </b-col>

                    <b-col md="6" sm="12">
                        <b-form-group :label="'Tipo de sangre'">
                          <b-form-input
                            aria-describedby="bloodType-feedback"
                            label="Tipo de sangre"
                            v-model="user.bloodType"
                          ></b-form-input>
                        </b-form-group>
                    </b-col>

                    <b-col md="12" class="mt-3">
                      <b-button variant="primary" type="submit">{{$t('submit')}}</b-button>
                    </b-col>
                  </b-row>
                </b-form>
              </validation-observer>
            </div>
          </div>
        </div>
        <div class="col-sm-3">
          <div class="card user-profile o-hidden mb-30" v-if="!isLoading">
            <div class="card-body">
              <h4 class="font-weight-bold">Notas</h4>
              <textarea
                class="form-control"
                rows="12"
                placeholder="Ingresa tu texto aquí..."
                v-model="user.medications"
              ></textarea>
            </div>
          </div>
        </div>
        <div class="col-sm-3">
          <div class="card user-profile o-hidden mb-30" v-if="!isLoading">
            <div class="card-body">
              <h4 class="font-weight-bold">Medicamentos</h4>
              <textarea
                class="form-control"
                rows="12"
                placeholder="Ingresa tu texto aquí..."
                v-model="user.allergies"
              ></textarea>
            </div>
          </div>
        </div>
        <div class="col-sm-3">
          <div class="card user-profile o-hidden mb-30" v-if="!isLoading">
            <div class="card-body">
              <h4 class="font-weight-bold">Documentos</h4>
              <input
                  @change="onFileSelected"
                  label="Cargar archivo"
                  type="file"
                >
              <div class="card mb-2" v-for="(document, index) in user.files">

                <div class="card-body">
                  <div class="row p-1">
                    <h4><a :href="loadLink(document)"><i class="center nav-icon i-Files mr-2 ml-1"></i></a></h4> <h4 class=""> {{ document.name }}</h4>
                  </div>
                </div>
              </div>
              
            </div>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-sm-9">
          <div class="container text-center">
            <div class="row align-items-start">
              <div class="col">
                Hora
              </div>
              <div class="col">
                Doctor
              </div>
              <div class="col">
              Tipo
              </div>
              <div class="col">
                Notas
              </div>
            </div>
          </div>
        </div>
        <div class="col-sm-3">
          <div class="card user-profile o-hidden mb-30" v-if="!isLoading">
            <div class="card-body">
              <h4 class="font-weight-bold">Pagos</h4>
              <div class="card mb-2">
                <div class="card-body">
                  <div class="row p-1">
                    <h4><i class="center nav-icon i-Files mr-2 ml-1"></i></h4> <h4 class="">Recetaanterior.pdf </h4>
                  </div>
                </div>
              </div>
              <div class="card">
                <div class="card-body">
                  <div class="row p-1">
                    <h4><i class="center nav-icon i-Files mr-2 ml-1"></i></h4> <h4 class="">Recetaanterior.pdf - 27KB</h4>

                  </div>
                </div>
                
              </div>
            </div>
          </div>
        </div>
        
      </div>
      
    </div>
  </template>
  
  
  <script>
  import NProgress from "nprogress";
  import { mapGetters, mapActions } from "vuex";
  
  export default {
    metaInfo: {
      // if no subcomponents specify a metaInfo.title, this title will be used
      title: "Profile"
    },
    data() {
      return {
        data: new FormData(),
        avatar: "",
        username: "",
        isLoading: true,
        user: {
          id: "",
          firstname: "",
          lastname: "",
          username: "",
          NewPassword: null,
          email: "",
          phone: "",
          avatar: "",
          notes: '',
          userId: "",
          weight: "",
          height: "",
          allergies: "",
          medication: "",
          file: '',
          files: ''
        },
        patient: {
            
        }
      };
    },
  
    computed: {
      ...mapGetters(["currentUser"])
    },
  
    methods: {
      //------------- Submit Update Profile
      Submit_Profile() {
        this.$refs.Update_Profile.validate().then(success => {
          if (!success) {
            this.makeToast(
              "danger",
              this.$t("Please_fill_the_form_correctly"),
              this.$t("Failed")
            );
          } else {
            this.Update_Profile();
          }
        });
      },
  
      //------ Toast
      makeToast(variant, msg, title) {
        this.$root.$bvToast.toast(msg, {
          title: title,
          variant: variant,
          solid: true
        });
      },
  
      //------ Validation State fields
      getValidationState({ dirty, validated, valid = null }) {
        return dirty || validated ? valid : null;
      },

      loadLink(document) {
        const link = axios.get("/documents/"+document.id+'/download');
        return link.data;
      },
  
      //------------------ Get Profile Info ----------------------\\
      Get_Profile_Info() {
        axios
          .get("patients/Get_Info/Profile/"+this.$route.params.id)
          .then(response => {
            this.user.id = response.data.user.id;
            this.user.firstname = response.data.user.firstname;
            this.user.lastname = response.data.user.lastname;
            this.user.email = response.data.user.email;
            this.user.phone = response.data.user.phone;
            this.user.username = response.data.user.username;
            this.user.files = response.data.user.documents;

            console.log(this.user)

            this.avatar = this.currentUser.avatar;
            this.username = this.currentUser.username;
            this.isLoading = false;
          })
          .catch(response => {
            this.isLoading = false;
          });

          axios
          .get("patients/"+this.$route.params.id)
          .then(response => {

            if(response.data.patient){
              this.user.weight = response.data.patient.weight;
              this.user.allergies = response.data.patient.allergies;
              this.user.height = response.data.patient.height;
              this.user.bloodType = response.data.patient.bloodType;

            }
                 
          })
          .catch(response => {
            this.isLoading = false;
          });
      },
  
      //------------------------------ Event Upload Avatar -------------------------------\\
      async onFileSelected(e) {
        
        if (1) {
          this.user.file = e.target.files[0];
        } else {
          this.user.file = "";
        }
      },
  
      //------------------ Update Profile ----------------------\\
      Update_Profile() {
        // Start the progress bar.
        NProgress.start();
        NProgress.set(0.1);
        var self = this;
        console.log(this.user.file)
        self.data.append("firstname", self.user.firstname);
        self.data.append("lastname", self.user.lastname);
        self.data.append("username", self.user.username);
        self.data.append("email", self.user.email);
        self.data.append("NewPassword", self.user.NewPassword);
        self.data.append("phone", self.user.phone);
        self.data.append("avatar", self.user.avatar);
        self.data.append("file", self.user.file);

        self.data.append("_method", "post");
  
        this.user.userId = this.$route.params.id;
        axios
          .post("patients" , { patients: this.user})
          .then(response => {
            this.makeToast(
              "success",
              this.$t("Update.TitleProfile"),
              this.$t("Success")
            );
            NProgress.done(), 500;
  
            setTimeout(() => {
              this.Get_Profile_Info();
            }, 500);
          })
          .catch(error => {
            NProgress.done(), 500;
          });

        axios
          .post("update/profile/patience/" + this.$route.params.id, self.data, { 
            headers: {
              "Content-Type": "multipart/form-data",
            }
          })
          .then(response => {
            this.makeToast(
              "success",
              this.$t("Update.TitleProfile"),
              this.$t("Success")
            );
            NProgress.done(), 500;
  
            setTimeout(() => {
              this.Get_Profile_Info();
            }, 500);
          })
          .catch(error => {
            NProgress.done(), 500;
          });
        
      }
    }, // END METHODS
  
    //----------------------------- Created function-------------------
    created: function() {
      this.Get_Profile_Info();
    }
  };
  </script>
  
  