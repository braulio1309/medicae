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
            <div class="card-body">
              <h6 class="font-weight-bold">Notas</h6>
              <textarea
                class="form-control"
                rows="8"
                placeholder="Ingresa tu texto aquí..."
                v-model="user.medications"
              ></textarea>
              <!-- <Button label="Save note" class="p-button-sm float-right mt-2 btn-sm"/> -->
              <button class="btn btn-primary float-right mt-2 btn-sm">
                Save note
              </button>
            </div>
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
              <div class="card" v-for="(file, index) in user.files" :key="index">
                  <div class="container p-2">
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
                      <h4>{{appointment?.date}}</h4>
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
                      <h5 class="text-primary text-center"><i class="nav-icon i-Notepad"></i> Notes</h5>
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
                      <h4>{{appointment?.date}}</h4>
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
                      <h5 class="text-primary text-center"><i class="nav-icon i-Notepad"></i> Notes</h5>
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
    </div>
  </template>
  
  
  <script>
  import NProgress from "nprogress";
  import { mapGetters, mapActions } from "vuex";
  export default {
    metaInfo: {
      title: "Profile"
    },
    data() {
      return {
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
          medication: "",
          file: '',
          files: ''
        },
        patient: {
            
        }
      };
    },
    computed: {
      Avatar(){
        return this.user?.avatar ?? 'no-image.png'
      },
      ...mapGetters(["currentUser"])
    },
  
    methods: {
      openFileInput() {
        // Simula un clic en el botón de subir archivo oculto
        this.$refs.fileInput.click();
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
            this.user.registration_date= response.data.user.registration_date;
            this.user.name_role= response.data.user.name_role;
            this.appointments_pending= response.data.user.reservations_pending;
            this.appointments_past= response.data.user.reservations_past;
            this.appointments= response.data.user.reservations;
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

</style>
  