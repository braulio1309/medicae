<template>
  <div
    class="side-content-wrap"
    @mouseenter="isMenuOver = true"
    @mouseleave="isMenuOver = false"
    @touchstart="isMenuOver = true"
    v-if="this.currentUser"
  >
    <vue-perfect-scrollbar
      :settings="{ suppressScrollX: true, wheelPropagation: false }"
      :class="{ open: getSideBarToggleProperties.isSideNavOpen }"
      ref="myData"
      class="sidebar-left rtl-ps-none ps scroll"
    >
      <div>
        <ul class="navigation-left">
          <li
            @mouseenter="toggleSubMenu"
            :class="{ active: selectedParentMenu == 'dashboard' }"
            class="nav-item"
            data-item="dashboard"
          >
            <router-link tag="a" class="nav-item-hold" to="/app/dashboard">
              <!--<i class="nav-icon i-Bar-Chart"></i>-->
              <span class="nav-text">{{ $t("dashboard") }}</span>
            </router-link>
          </li>
          
          <li
            v-show="currentUserPermissions && currentUserPermissions.includes('patients_view')"
            @mouseenter="toggleSubMenu"
            :class="{ active: selectedParentMenu == 'Patients' }"
            class="nav-item"
            data-item="Patients"
            :data-submenu="false"
          >
          <router-link tag="a" class="nav-item-hold" to="/app/pages/people/patients">
              <!--<i class="nav-icon i-Business-Mens"></i>-->
              <span class="nav-text">{{ $t('Patients') }}</span>
            </router-link>
            
          </li>

          <li
            v-show="currentUserPermissions && (currentUserPermissions.includes('doctor_view'))"
            @mouseenter="toggleSubMenu"
            :class="{ active: selectedParentMenu == 'Doctor' }"
            class="nav-item"
            data-item="Doctor"
            :data-submenu="false"
          >
          <router-link tag="a" class="nav-item-hold" to="/app/pages/people/doctors">
              <!--<i class="nav-icon i-Business-Mens"></i>-->
              <span class="nav-text">{{ $t('Doctors') }}</span>
            </router-link>
            
          </li>

          <li
            v-show="currentUserPermissions && (currentUserPermissions.includes('vacations_view'))"
            @mouseenter="toggleSubMenu"
            :class="{ active: selectedParentMenu == 'Appointment' }"
            class="nav-item"
            data-item="Appointment"
            :data-submenu="false"
          >
          <router-link tag="a" class="nav-item-hold" to="/app/dates/date">
              <span class="nav-text">{{ $t('Appointment') }}</span>
            </router-link>
            
          </li>

          <li
            v-show="currentUserPermissions && (!currentUserPermissions.includes('vacations_view'))"
            @mouseenter="toggleSubMenu"
            :class="{ active: selectedParentMenu == 'Reservation' }"
            class="nav-item"
            data-item="Reservation"
            :data-submenu="false"
          >
          <router-link tag="a" class="nav-item-hold" to="/app/dates/store">
              <!--<i class="nav-icon pi pi-calendar"></i>-->
              <span class="nav-text">{{ $t('Schedules') }}</span>
            </router-link>
            
          </li>
          <li
            v-show="currentUserPermissions && (!currentUserPermissions.includes('vacations_view'))"
            @mouseenter="toggleSubMenu"
            :class="{ active: selectedParentMenu == 'Appointment' }"
            class="nav-item"
            data-item="Appointment"
            :data-submenu="false"
          >
          <router-link tag="a" class="nav-item-hold" to="/app/dates/date">
              <!--<i class="nav-icon i-Business-Mens"></i>-->
              <span class="nav-text">{{ $t('Appointment') }}</span>
            </router-link>
            
          </li>
          <li
            v-show="currentUserPermissions && (currentUserPermissions.includes('setting_system'))"
            @mouseenter="toggleSubMenu"
            :class="{ active: selectedParentMenu == 'settings' }"
            class="nav-item"
            data-item="settings"
            :data-submenu="false"
          >
          <router-link tag="a" class="nav-item-hold" to="/app/settings/permissions">
              <!--<i class="nav-icon pi pi-calendar"></i>-->
              <span class="nav-text">{{ $t('PermissionsManager') }}</span>
            </router-link>
            
          </li>

        </ul>
      </div>
    </vue-perfect-scrollbar>

    
    <div
      @click="removeOverlay()"
      class="sidebar-overlay"
      :class="{ open: getSideBarToggleProperties.isSecondarySideNavOpen }"
    ></div>
  </div>
  <!--=============== Left side End ================-->
</template>

<script>
import Topnav from "./TopNav";
import { isMobile } from "mobile-device-detect";

import { mapGetters, mapActions } from "vuex";

export default {
  components: {
    Topnav
  },

  data() {
    return {
      isDisplay: true,
      isMenuOver: false,
      isStyle: true,
      selectedParentMenu: "",
      isMobile,
      user: {
        id: "",
        firstname: "",
        lastname: "",
        username: "",
        registration_date: "",
        name_role: "",
        NewPassword: null,
        email: "",
        phone: "",
        avatar: "",
        city: '',
        address: '',
        zip: '',
        gender: '',
        birthday: '',
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
    };
  },
  mounted() {
    this.toggleSelectedParentMenu();
    window.addEventListener("resize", this.handleWindowResize);
    document.addEventListener("click", this.returnSelectedParentMenu);
    this.handleWindowResize();
    this.Get_Profile_Info();
    console.log(this.user)
  },

  beforeDestroy() {
    document.removeEventListener("click", this.returnSelectedParentMenu);
    window.removeEventListener("resize", this.handleWindowResize);
  },

  computed: {
    ...mapGetters(["getSideBarToggleProperties", "currentUserPermissions"])
  },

  methods: {
    ...mapActions([
      "changeSecondarySidebarProperties",
      "changeSecondarySidebarPropertiesViaMenuItem",
      "changeSecondarySidebarPropertiesViaOverlay",
      "changeSidebarProperties"
    ]),
    Get_Profile_Info() {
      axios
        .get("patients/Get_Info/Profile/"+ 0)
        .then(response => {
          this.user.id = response.data.user.id;
          this.user.firstname = response.data.user.firstname;
          this.user.lastname = response.data.user.lastname;
          this.user.email = response.data.user.email;
          this.user.phone = response.data.user.phone;
          this.user.registration_date = response.data.user.created_at;
          this.user.name_role = response.data.user.name_role;
          this.user.gender = response.data.user.gender;
          this.user.birthday = response.data.user.birthday;
          this.user.address = response.data.user.address;
          this.user.city = response.data.user.city;
          this.user.zip = response.data.user.zip;
          this.appointments_pending = response.data.user.reservations_pending;
          this.appointments_past = response.data.user.reservations_past;
          this.appointments = response.data.user.reservations;
          this.avatar = this.currentUser.avatar;
          this.username = this.currentUser.username;
          this.isLoading = false;
        })
        .catch(response => {
          this.isLoading = false;
        });

      
    },

    handleWindowResize() {
      if (window.innerWidth <= 1200) {
        if (this.getSideBarToggleProperties.isSideNavOpen) {
          this.changeSidebarProperties();
        }
        if (this.getSideBarToggleProperties.isSecondarySideNavOpen) {
          this.changeSecondarySidebarProperties();
        }
      } else {
        if (!this.getSideBarToggleProperties.isSideNavOpen) {
          this.changeSidebarProperties();
        }
      }
    },
    toggleSelectedParentMenu() {
      const currentParentUrl = this.$route.path
        .split("/")
        .filter(x => x !== "")[1];
      if (currentParentUrl !== undefined || currentParentUrl !== null) {
        this.selectedParentMenu = currentParentUrl.toLowerCase();
      } else {
        this.selectedParentMenu = "dashboard";
      }
    },
    toggleSubMenu(e) {
      let hasSubmenu = e.target.dataset.submenu;
      let parent = e.target.dataset.item;

      if (hasSubmenu) {
        this.selectedParentMenu = parent;

        this.changeSecondarySidebarPropertiesViaMenuItem(true);
      } else {
        this.selectedParentMenu = parent;
        this.changeSecondarySidebarPropertiesViaMenuItem(false);
      }
    },

    removeOverlay() {
      this.changeSecondarySidebarPropertiesViaOverlay();
      if (window.innerWidth <= 1200) {
        this.changeSidebarProperties();
      }
      this.toggleSelectedParentMenu();
    },
    returnSelectedParentMenu() {
      if (!this.isMenuOver) {
        this.toggleSelectedParentMenu();
      }
    },

    toggleSidebarDropdwon(event) {
      let dropdownMenus = this.$el.querySelectorAll(".dropdown-sidemenu.open");

      event.currentTarget.classList.toggle("open");

      dropdownMenus.forEach(dropdown => {
        dropdown.classList.remove("open");
      });
    },
   
  }
};
</script>

<style lang="" scoped>
</style>

