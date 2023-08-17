<template>
    <div class="main-content small">
      <breadcumb :page="$t('Patient')" :folder="user.firstname+' '+user.lastname"/>
      <div v-if="isLoading" class="loading_page spinner spinner-primary mr-3"></div>
  
      <div v-else class="row mb-4">
        <b-col sm="12" md="6" lg="6">
          <b-card class="card-height">
            <b-row>
              <b-col md="4" lg="4" sm="12" class="text-center border-right border-secondary">
                  <b-avatar src="https://placekitten.com/300/300" size="6rem"></b-avatar>
                  <h5 class="mt-1"> {{user.firstname}} {{ user.lastname }}</h5>
                  <h6 class="mt-1"> {{ user.email }}</h6>
                  <h6 class="mt-1"> Appointments </h6>
                  <b-container>
                    <b-row class="text-center justify-content-center">
                      <b-col sm="6" md="6" lg="6">
                          <h3>5</h3>
                          <p>Past</p>
                        </b-col>
                        <b-col sm="6" md="6" lg="6">
                          <h3>5</h3>
                          <p>Upcoming</p>
                        </b-col>
                        <Button label="Send Message"/>
                    </b-row>
                  </b-container>
              </b-col>
              <b-col md="8" lg="8" sm="12">
                <b-container class="mt-5">
                  <b-row>
                    <b-col  md="6" lg="6" sm="12">
                      <label>Gender</label>
                      <p class="border-bottom border-secondary">Female</p>
                    </b-col>
                    <b-col  md="6" lg="6" sm="12">
                      <label>Birthday</label>
                      <p class="border-bottom border-secondary">Oct, 25 1992</p>
                    </b-col>
                    <b-col  md="6" lg="6" sm="12">
                      <label>Phone Number</label>
                      <p class="border-bottom border-secondary"></p>
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
                      <p class="border-bottom border-secondary"></p>
                    </b-col>
                    <b-col  md="6" lg="6" sm="12">
                      <label>Member Status</label>
                      <p class="border-bottom border-secondary"></p>
                    </b-col>
                  </b-row>
                </b-container>
              </b-col>
           </b-row>
          </b-card>
          
        </b-col>
        <b-col sm="12" md="3" lg="3">
          <div class="card user-profile card-height">
            <div class="card-body">
              <h6 class="font-weight-bold">Notas</h6>
              <textarea
                class="form-control"
                rows="8"
                placeholder="Ingresa tu texto aquí..."
                v-model="user.medications"
              ></textarea>
              <Button label="Save note" class="p-button-sm float-right mt-2 btn-sm"/>
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
              <h6 class="font-weight-bold">Files / Documents</h6>
              <div class="card">
                  <div class="container p-2">
                    <h6 class="mt-1"><i class="center nav-icon i-Files"></i>Blood test.pdf </h6>
                  </div>
              </div>
            </div>
          </div>
        </b-col>
      </div>
      <b-row class="small">
        <b-col md="9" sm="12" xs="12" lg="9">
          <TabView class="tabview-custom">
            <TabPanel>
              <template #header>
                <span class="small">Upcoming appointments</span>
              </template>
              <b-row>
                <b-col md="4" lg="3" sm="12" xs="12">
                  <Timeline :value="events" align="left">
                    <template #content="slotProps">
                      {{slotProps.item.status}}
                    </template>
                  </Timeline>
                </b-col>
                
              </b-row>
            </TabPanel>
            <TabPanel>
              <template #header>
                <span class="small">Past appointments</span>
              </template>
              Content II
            </TabPanel>
            <TabPanel >
              <template #header>
                <span class="small">Medici</span>
              </template>
              Content II
            </TabPanel>
          </TabView>
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
              ></b-table>
            </div>
          </div>
        </b-col>
      </b-row>
    </div>
  </template>
  
  
  <script>
  import NProgress from "nprogress";
  import { mapGetters, mapActions } from "vuex";
  import TabView from 'primevue/tabview';
  import TabPanel from 'primevue/tabpanel';
  import Timeline from 'primevue/timeline';
  import Button from 'primevue/button';
  import 'primevue/resources/primevue.min.css';
  import 'primevue/resources/themes/saga-blue/theme.css';
  import 'primeicons/primeicons.css';
  export default {
    metaInfo: {
      // if no subcomponents specify a metaInfo.title, this title will be used
      title: "Profile"
    },
    data() {
      return {
        events: [
                {status: 'Ordered', date: '15/10/2020 10:30', icon: 'pi pi-shopping-cart', color: '#9C27B0', image: 'game-controller.jpg'},
                {status: 'Processing', date: '15/10/2020 14:00', icon: 'pi pi-cog', color: '#673AB7'},
                {status: 'Shipped', date: '15/10/2020 16:15', icon: 'pi pi-shopping-cart', color: '#FF9800'},
                {status: 'Delivered', date: '16/10/2020 10:00', icon: 'pi pi-check', color: '#607D8B'}
            ],
            events2: [
                "2020", "2021", "2022", "2023"
            ],
        data: new FormData(),
        avatar: "",
        username: "",
        fields: ['Transaction', 'Amount'],
        items: [
          { Amount: 40, Transaction: 'Dickerson' },
          { Amount: 21, Transaction: 'Larsen'},
          { Amount: 89, Transaction: 'Geneva'}
        ],
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
    components:{
      TabView,
      TabPanel,
      Timeline,
      Button
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
<style>
  .card-height{
    height: 330px;
    overflow: auto;
    max-height: 330px;
  }
</style>
  