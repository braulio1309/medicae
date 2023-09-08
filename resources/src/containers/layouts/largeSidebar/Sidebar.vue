<template>
  <div
    class="side-content-wrap"
    @mouseenter="isMenuOver = true"
    @mouseleave="isMenuOver = false"
    @touchstart="isMenuOver = true"
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
              <!--<i class="nav-icon i-Business-Mens"></i>-->
              <span class="nav-text">{{ $t('Appointment') }}</span>
            </router-link>
            
          </li>

          <li
            v-show="currentUserPermissions && (currentUserPermissions.includes('vacations_view'))"
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
          <router-link tag="a" class="nav-item-hold" to="/app/dates/date2">
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
      isMobile
    };
  },
  mounted() {
    this.toggleSelectedParentMenu();
    window.addEventListener("resize", this.handleWindowResize);
    document.addEventListener("click", this.returnSelectedParentMenu);
    this.handleWindowResize();
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
    }
  }
};
</script>

<style lang="" scoped>
</style>

