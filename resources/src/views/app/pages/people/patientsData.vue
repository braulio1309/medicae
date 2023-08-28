<template>
    <div class="main-content small">
      <breadcumb :page="$t('Patient')" :folder="user.firstname+' '+user.lastname"/>
      <div v-if="isLoading" class="loading_page spinner spinner-primary mr-3"></div>
  
      <div v-else class="row mb-4">
        <b-col sm="12" md="6" lg="6">
          <b-card class="card-height mb-2">
            <b-row>
              <b-col md="4" lg="4" sm="12" class="text-center border-right border-secondary">
                  <b-avatar :src="'images/avatar/'+user.avatar" size="6rem"></b-avatar>
                  <h5 class="mt-1"> {{user.firstname}} {{ user.lastname }}</h5>
                  <h6 class="mt-1"> {{ user.email }}</h6>
                  <h6 class="mt-1"> Appointments </h6>
                  <b-container>
                    <b-row class="text-center justify-content-center">
                      <b-col sm="6" md="6" lg="6">
                          <h3>{{ appointments_past.length }}</h3>
                          <p>Past</p>
                        </b-col>
                        <b-col sm="6" md="6" lg="6">
                          <h3>{{ appointments_pending.length }}</h3>
                          <p>Upcoming</p>
                        </b-col>
                        <button class="btn btn-primary">
                            Send Message
                        </button>
                        <button  @click="New_Recipe()" class="btn btn-primary mt-1">
                            Generar recipe
                        </button>
                    </b-row>
                  </b-container>
              </b-col>
              <b-col md="8" lg="8" sm="12">
                <b-container class="mt-5">
                  <b-row>
                    <b-col  md="6" lg="6" sm="12">
                      <label>Gender</label>
                      <p class="border-bottom border-secondary"></p>
                    </b-col>
                    <b-col  md="6" lg="6" sm="12">
                      <label>Birthday</label>
                      <p class="border-bottom border-secondary"></p>
                    </b-col>
                    <b-col  md="6" lg="6" sm="12">
                      <label>Phone Number</label>
                      <p class="border-bottom border-secondary">{{ user.phone }}</p>
                    </b-col>
                    <b-col  md="6" lg="6" sm="12">
                      <label>Address</label>
                      <p class="border-bottom border-secondary"></p>
                    </b-col>
                    <b-col  md="6" lg="6" sm="12">
                      <label>City</label>
                      <p class="border-bottom border-secondary"></p>
                    </b-col>
                    <b-col  md="6" lg="6" sm="12">
                      <label>ZIP Code</label>
                      <p class="border-bottom border-secondary"></p>
                    </b-col>
                    <b-col  md="6" lg="6" sm="12">
                      <label>Registration Date</label>
                      <p class="border-bottom border-secondary">{{ user.registration_date }}</p>
                    </b-col>
                    <b-col  md="6" lg="6" sm="12">
                      <label>Member Status</label>
                      <p class="border-bottom border-secondary">{{ user.name_role }}</p>
                    </b-col>
                  </b-row>
                </b-container>
              </b-col>
           </b-row>
          </b-card>
          
        </b-col>
        <b-col sm="12" md="3" lg="3">
          <div class="card user-profile card-height mb-2">
            <b-form @submit.prevent="updatedNote" enctype="multipart/form-data">
            <div class="card-body">
              <h6 class="font-weight-bold">Notas</h6>
              <textarea
                class="form-control"
                rows="8"
                placeholder="Ingresa tu texto aquí..."
                v-model="notes"
                ref="myTextarea"
              ></textarea>
              <!-- <Button label="Save note" class="p-button-sm float-right mt-2 btn-sm"/> -->
              <button class="btn btn-primary float-right mt-2 btn-sm">
                Save note
              </button>
            </div>
            </b-form>
          </div>
        </b-col>
        <!-- <div class="col-sm-3">
          <div class="card user-profile o-hidden mb-30">
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
        </div> -->
        <b-col md="3" sm="12" xs="12" lg="3">
          <div  class="card user-profile card-height">
            <div class="card-body">
              <input ref="fileInput" type="file" class="d-none" @change="onFileSelected" />
              <div class="col-md-12 col-lg-12 col-sm-12 mb-2 d-flex" style="justify-content:space-between">
                <h6 class="font-weight-bold">Files / Documents</h6>
                <a @click.prevent="openFileInput" class="float-right text-primary"  >
                  <i class="nav-icon i-Files"></i> Add Files
                </a>
              </div>
              <div class="card card-hover" v-for="(file, index) in user.files" :key="index">
                  <div class="container p-2" @click.prevent="loadLink(file)">
                    <h6 class="mt-1"><i class="center nav-icon i-Files"></i>{{ file.name }} </h6>
                  </div>
              </div>
            </div>
          </div>
        </b-col>
      </div>
      
      <b-row v-if="!isLoading">
        <b-col class="card-height" md="9" sm="12" xs="12" lg="9">
          <b-tabs>
            <b-tab title="Upcoming appointments" active>
              <b-card class="m-2" v-for="(appointment,index) in appointments_pending" :key="index">
                <b-row>
                  <b-col md="2">
                    <div class="circle"></div>
                    <div class="card-part">
                      <!-- Contenido de la primera parte -->
                      <h5>{{formatDate(appointment?.date)}}</h5>
                      <p></p>
                    </div>
                  </b-col>
                  <b-col md="2">
                    <div class="card-part">
                      <!-- Contenido de la segunda parte -->
                      <h4>Type</h4>
                      <p class="font-weight-bold"></p>
                    </div>
                  </b-col>
                  <b-col md="3">
                    <div class="card-part">
                      <!-- Contenido de la tercera parte -->
                      <h4>Doctor</h4>
                      <p class="font-weight-bold">{{ appointment?.appointment?.doctor?.firstname }} {{ appointment?.appointment?.doctor?.lastname }}</p>

                    </div>
                  </b-col>
                  <b-col md="3">
                    <div class="card-part">
                      <!-- Contenido de la cuarta parte -->
                      <h4>Nurse</h4>
                      <p class="font-weight-bold"></p>
                    </div>
                  </b-col>
                  <b-col md="2">
                    <div class="card-part">
                      <!-- Contenido de la cuarta parte -->
                      <button @click="focusTextarea(appointment)"><h5 class="text-primary text-center"><i class="nav-icon i-Notepad"></i> Notes</h5></button>
                    </div>
                  </b-col>
                </b-row>
              </b-card>
            </b-tab>
            <b-tab title="Past appointments">
              <b-card class="m-2" v-for="(appointment,index) in appointments_past" :key="index">
                <b-row>
                  <b-col md="2">
                    <div class="circle"></div>
                    <div class="card-part">
                      <!-- Contenido de la primera parte -->
                      <h5>{{formatDate(appointment?.date)}}</h5>
                      <p></p>
                    </div>
                  </b-col>
                  <b-col md="2">
                    <div class="card-part">
                      <!-- Contenido de la segunda parte -->
                      <h4>Type</h4>
                      <p class="font-weight-bold"></p>
                    </div>
                  </b-col>
                  <b-col md="3">
                    <div class="card-part">
                      <!-- Contenido de la tercera parte -->
                      <h4>Doctor</h4>
                      <p class="font-weight-bold">{{ appointment?.appointment?.doctor?.firstname }} {{ appointment?.appointment?.doctor?.lastname }}</p>

                    </div>
                  </b-col>
                  <b-col md="3">
                    <div class="card-part">
                      <!-- Contenido de la cuarta parte -->
                      <h4>Nurse</h4>
                      <p class="font-weight-bold"></p>
                    </div>
                  </b-col>
                  <b-col md="2">
                    <div class="card-part">
                      <!-- Contenido de la cuarta parte -->
                       <h5 class="text-primary text-center" @click="focusTextarea(appointment)"><i class="nav-icon i-Notepad"></i> Notes</h5>
                    </div>
                  </b-col>
                </b-row>
              </b-card>
            </b-tab>
          </b-tabs>
        </b-col>

        <b-col md="3" sm="12" xs="12" lg="3">
          <div  class="card card-height">
            <div class="card-body">
              <h6 class="font-weight-bold mb-2">Payments</h6>
              <b-table
                :striped="striped"
                :small="small"
                :items="items"
                :fields="fields"
              >
            </b-table>
            </div>
          </div>
        </b-col>
      </b-row>
          <!-- Add & Edit Recipe -->
      <validation-observer ref="Create_Recipe">
        <b-modal hide-footer size="lg" id="New_Recipe" :title="editmode?$t('Edit'):$t('Add')">
          <b-form @submit.prevent="Submit_Recipe" enctype="multipart/form-data">
            <b-row>
              <!-- Full name -->
              <b-col md="6" sm="12">
                <validation-provider
                  name="Name"
                  v-slot="validationContext"
                >
                  <b-form-group :label="'Nombre'">
                    <b-form-input
                      :state="getValidationState(validationContext)"
                      aria-describedby="Name-feedback"
                      label="Name"
                      readonly
                      :value="Fullname"
                    ></b-form-input>
                    <b-form-invalid-feedback id="Name-feedback">{{ validationContext.errors[0] }}</b-form-invalid-feedback>
                  </b-form-group>
                </validation-provider>
              </b-col>

              <b-col lg="6" md="6" sm="6">
                    <validation-provider
                      name="start_date"
                      v-slot="validationContext"
                    >
                      <b-form-group :label="$t('StartDate')">
                        <b-form-input
                          :state="getValidationState(validationContext)"
                          aria-describedby="date-feedback"
                          type="date"
                          readonly
                          v-model="user.date"
                        ></b-form-input>
                        <b-form-invalid-feedback
                          id="date-feedback"
                        >{{ validationContext.errors[0] }}</b-form-invalid-feedback>
                      </b-form-group>
                    </validation-provider>
                </b-col>

                 <!-- Date of Birth -->
               <b-col lg="4" md="4" sm="12">
                      <validation-provider
                        name="datebirth"
                        v-slot="validationContext"
                      >
                        <b-form-group :label="$t('datebirth')" id="DateBirth-input">
                          <b-form-input
                            label="datebirth"
                            v-model="user.birth"
                            :state="getValidationState(validationContext)"
                            aria-describedby="DateBirth-feedback"
                          ></b-form-input>
                         
                        </b-form-group>
                      </validation-provider>
                </b-col>
                 <!-- Age -->
               <b-col lg="4" md="4" sm="12">
                      <validation-provider
                        name="Age"
                        v-slot="validationContext"
                      >
                        <b-form-group :label="$t('Age')" id="Age-input">
                          <b-form-input
                            label="Age"
                            v-model="user.age"
                            :state="getValidationState(validationContext)"
                            aria-describedby="Age-feedback"
                          ></b-form-input>
                         
                        </b-form-group>
                      </validation-provider>
                </b-col>

               <!-- Gender -->
               <b-col lg="4" md="4" sm="12">
                      <validation-provider
                        name="Gender"
                        v-slot="validationContext"
                      >
                        <b-form-group :label="$t('Gender')" id="Gender-input">
                          <b-form-input
                            label="Gender"
                            v-model="user.gender"
                            :state="getValidationState(validationContext)"
                            aria-describedby="Gender-feedback"
                          ></b-form-input>
                         
                        </b-form-group>
                      </validation-provider>
                </b-col>

                  <!-- Diagnosic -->
               <b-col lg="12" md="12" sm="12">
                      <validation-provider
                        name="Diagnosic"
                        v-slot="validationContext"
                      >
                        <b-form-group :label="$t('Diagnosic')" id="Diagnostic-input">
                          <b-form-input
                            label="Diagnosic"
                            v-model="user.diagnosic"
                            :state="getValidationState(validationContext)"
                            aria-describedby="Diagnostic-feedback"
                          ></b-form-input>
                         
                        </b-form-group>
                      </validation-provider>
                </b-col>
               
                <!-- Recipe -->
               <b-col lg="12" md="12" sm="12">
                      <validation-provider
                        name="Recipe"
                        v-slot="validationContext"
                      >
                        <b-form-group :label="$t('Recipe')" id="Recipe-input">
                          <b-form-textarea
                            label="Recipe"
                            v-model="user.recipe"
                            rows="5"
                            :state="getValidationState(validationContext)"
                            aria-describedby="Recipe-feedback"
                          ></b-form-textarea>
                         
                        </b-form-group>
                      </validation-provider>
                </b-col>

              <b-col md="12" class="mt-3">
                  <b-button variant="primary" type="submit"  :disabled="SubmitProcessing">{{$t('submit')}}</b-button>
                    <div v-once class="typo__p" v-if="SubmitProcessing">
                      <div class="spinner sm spinner-primary mt-3"></div>
                    </div>
              </b-col>

            </b-row>
          </b-form>
        </b-modal>
      </validation-observer>
    </div>
  </template>
  
  
  <script>
  import NProgress from "nprogress";
  import { mapGetters, mapActions } from "vuex";
  import { format } from 'date-fns';

  export default {
    metaInfo: {
      title: "Profile"
    },
    data() {
      return {
        SubmitProcessing: false,
        data: new FormData(),
        avatar: "",
        username: "",
        fields: ['Transaction', 'Amount'],
        items: [
          { Amount: 40, Transaction: 'Dickerson' },
          { Amount: 21, Transaction: 'Larsen'},
          { Amount: 89, Transaction: 'Geneva'}
        ],
        appointments_pending:[],
        appointments_past:[],
        appointments:[],
        appointment:[],
        editmode:false,
        notes: '',
        isLoading: true,
        user: {
          id: "",
          firstname: "",
          lastname: "",
          username: "",
          registration_date:"",
          name_role:"",
          NewPassword: null,
          email: "",
          phone: "",
          avatar: "",
          notes: '',
          userId: "",
          weight: "",
          height: "",
          allergies: "",
          recipe: "",
          diagnosic: "",
          medication: "",
          file: '',
          files: '',
          date: new Date().toISOString().substr(0, 10)
        },
        patient: {
            
        }
      };
    },
    computed: {
      Avatar(){
        return this.user?.avatar ?? 'no-image.png'
      },
      Fullname(){
        return this.user?.firstname+' '+ this.user?.lastname
      },
      ...mapGetters(["currentUser"])
    },
  
    methods: {
      Submit_Recipe() {
        this.$refs.Create_Recipe.validate().then(success => {
          if (!success) {
            this.makeToast(
              "danger",
              this.$t("Please_fill_the_form_correctly"),
              this.$t("Failed")
            );
          } else {
            if (!this.editmode) {
              this.Create_Recipe();
            } else {
              this.Update_Recipe();
            }
          }
        });
      },
      //------------------------ Create Recipe ---------------------------\\
    Create_Recipe() {
      var self = this;
      self.SubmitProcessing = true;
      self.data.append("id", self.user.id);
      self.data.append("recipe", self.user.recipe);
      self.data.append("diagnosic", self.user.diagnosic);

      axios
        .post("patient/recipe", self.data, {
          responseType: "blob", // important
          headers: {
            "Content-Type": "application/json"
          }
        })
        .then(response => {
          self.SubmitProcessing = false;
          var file = new Blob([response.data], {type: 'application/pdf'});
          var fileURL = URL.createObjectURL(file);
          const pdfWindow = window.open();
          pdfWindow.document.title="Recipe"
          pdfWindow.document.write("<iframe width='100%' height='100%' src='"+ fileURL + "'></iframe>");
          //var printWindow = window.open(fileURL, '', 'width=800,height=500');
          //printWindow.print()
          this.makeToast(
            "success",
            this.$t("Create.TitleUser"),
            this.$t("Success")
          );
        })
        .catch(error => {
          self.SubmitProcessing = false;
          this.makeToast("danger", this.$t("InvalidData"), this.$t("Failed"));
        });
    },
      focusTextarea(appointment) {
        this.notes = appointment.notes; 
        this.appointment = appointment;
        this.user.files = appointment.documents;
        this.$refs.myTextarea.focus();
      },
      //------------------------------ Show Modal (Create User) -------------------------------\\
      New_Recipe() {
        this.editmode = false;
        this.$bvModal.show("New_Recipe");
      },
      openFileInput() {
        if(this.appointment.length==0 || typeof(this.appointment)=='undefined'){
          this.makeToast(
            "warning",
            "Seleccione una cita",
            this.$t("Warning"),
          );
          return ;
        }
        // Simula un clic en el botón de subir archivo oculto
        this.$refs.fileInput.click();
      },
      updatedNote(){
        if(this.notes=="" || this.appointment.length==0 || typeof(this.appointment)=='undefined'){
          this.makeToast(
            "warning",
            "Seleccione una cita",
            this.$t("Warning"),
          );
          return ;
        }
        var self = this;
        self.data.append("notes", self.notes);

        self.SubmitProcessing = true;
        axios
        .post("Reservations/updateNotes/" + this.appointment.id, self.data)
        .then(response => {
          this.makeToast(
            "success",
            this.$t("Success"),
            this.$t("Success")
          );
          this.appointment = [];
          this.user.files = [];
          this.notes = '';
          this.Get_Profile_Info();
          self.SubmitProcessing = false;
        })
        .catch(error => {
          this.makeToast("danger", this.$t("InvalidData"), this.$t("Failed"));
          self.SubmitProcessing = false;
        });
      },
      formatDate(date) {
        return format(new Date(date), 'dd-MM-yyyy HH:mm');
      },
      calculateTotalAmount(items) {
        return items.reduce((total, item) => total + item.Amount, 0);
      },
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

      loadLink(documento) {
        // const link = axios.get("/documents/"+document.id+'/download');
        // return link.data;
        axios({
          url: "/documents/" + documento.id + '/download',
          method: 'GET',
          responseType: 'blob', // Importante: establece el tipo de respuesta a 'blob'
        }).then(response => {
          const blob = new Blob([response.data], { type: response.headers['content-type'] });
          const link = document.createElement('a');
          link.href = URL.createObjectURL(blob);
          link.download = documento.name; // Establece el nombre del archivo para la descarga
          link.click();
          URL.revokeObjectURL(link.href); // Libera recursos después de la descarga
        });
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
            this.user.registration_date= response.data.user.registration_date;
            this.user.name_role= response.data.user.name_role;
            this.appointments_pending= response.data.user.reservations_pending;
            this.appointments_past= response.data.user.reservations_past;
            this.appointments= response.data.user.reservations;
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
        if (e) {
          this.user.file = e.target.files[0];
          this.Update_Profile();
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
        // self.data.append("firstname", self.user.firstname);
        // self.data.append("lastname", self.user.lastname);
        // self.data.append("username", self.user.username);
        // self.data.append("email", self.user.email);
        // self.data.append("NewPassword", self.user.NewPassword);
        // self.data.append("phone", self.user.phone);
        // self.data.append("avatar", self.user.avatar);
        self.data.append("file", self.user.file);

        this.user.userId = this.$route.params.id;
        // axios
        //   .post("patients" , { patients: this.user})
        //   .then(response => {
        //     this.makeToast(
        //       "success",
        //       this.$t("Update.TitleProfile"),
        //       this.$t("Success")
        //     );
        //     NProgress.done(), 500;
  
        //     setTimeout(() => {
        //       this.Get_Profile_Info();
        //     }, 500);
        //   })
        //   .catch(error => {
        //     NProgress.done(), 500;
        //   });

        axios
          .post("update/profile/patience/" + this.appointment.id, self.data)
          .then(response => {
            this.makeToast(
              "success",
              this.$t("Update.TitleProfile"),
              this.$t("Success")
            );
            NProgress.done(), 500;
            this.appointment = [];
            this.user.files = [];
            this.user.file = '';
            this.notes = '';
            setTimeout(() => {
              this.Get_Profile_Info();
            }, 500);
          })
          .catch(error => {
            console.log(error)
            NProgress.done()
          });
        
      }
    }, // END METHODS
  
    //----------------------------- Created function-------------------
    created: function() {
      this.Get_Profile_Info();
    }
  };
  </script>
<style>
  .card-height{
    height: 330px;
    overflow: auto;
    max-height: 330px;
    @media (max-width: 767px) {
      height: auto; /* Ajustar altura en pantallas pequeñas */
      max-height: none;
    }
    
  }

  .card-part {
    padding: 15px;
    text-align: center;
    border-radius: 5px;
    position: relative;
  }

  .circle {
  width: 20px;
  height: 20px;
  background-color: #007bff;
  border-radius: 50%;
  position: absolute;
  left: -10px;
  top: 50%;
  transform: translateY(-50%);
}

.card-hover:hover {
  background-color: #90979e; /* Change this color as desired */
}
</style>
  