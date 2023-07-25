(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["largeSidebar"],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/src/containers/layouts/common/footer.vue?vue&type=script&lang=js&":
/*!*********************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/src/containers/layouts/common/footer.vue?vue&type=script&lang=js& ***!
  \*********************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vuex__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vuex */ "./node_modules/vuex/dist/vuex.esm.js");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }

/* harmony default export */ __webpack_exports__["default"] = ({
  data: function data() {
    return {};
  },
  computed: _objectSpread({}, Object(vuex__WEBPACK_IMPORTED_MODULE_0__["mapGetters"])(["currentUser"])),
  methods: {}
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/src/containers/layouts/largeSidebar/Sidebar.vue?vue&type=script&lang=js&":
/*!****************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/src/containers/layouts/largeSidebar/Sidebar.vue?vue&type=script&lang=js& ***!
  \****************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _TopNav__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./TopNav */ "./resources/src/containers/layouts/largeSidebar/TopNav.vue");
/* harmony import */ var mobile_device_detect__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! mobile-device-detect */ "./node_modules/mobile-device-detect/dist/index.js");
/* harmony import */ var mobile_device_detect__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(mobile_device_detect__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var vuex__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! vuex */ "./node_modules/vuex/dist/vuex.esm.js");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }



/* harmony default export */ __webpack_exports__["default"] = ({
  components: {
    Topnav: _TopNav__WEBPACK_IMPORTED_MODULE_0__["default"]
  },
  data: function data() {
    return {
      isDisplay: true,
      isMenuOver: false,
      isStyle: true,
      selectedParentMenu: "",
      isMobile: mobile_device_detect__WEBPACK_IMPORTED_MODULE_1__["isMobile"]
    };
  },
  mounted: function mounted() {
    this.toggleSelectedParentMenu();
    window.addEventListener("resize", this.handleWindowResize);
    document.addEventListener("click", this.returnSelectedParentMenu);
    this.handleWindowResize();
  },
  beforeDestroy: function beforeDestroy() {
    document.removeEventListener("click", this.returnSelectedParentMenu);
    window.removeEventListener("resize", this.handleWindowResize);
  },
  computed: _objectSpread({}, Object(vuex__WEBPACK_IMPORTED_MODULE_2__["mapGetters"])(["getSideBarToggleProperties", "currentUserPermissions"])),
  methods: _objectSpread(_objectSpread({}, Object(vuex__WEBPACK_IMPORTED_MODULE_2__["mapActions"])(["changeSecondarySidebarProperties", "changeSecondarySidebarPropertiesViaMenuItem", "changeSecondarySidebarPropertiesViaOverlay", "changeSidebarProperties"])), {}, {
    handleWindowResize: function handleWindowResize() {
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
    toggleSelectedParentMenu: function toggleSelectedParentMenu() {
      var currentParentUrl = this.$route.path.split("/").filter(function (x) {
        return x !== "";
      })[1];
      if (currentParentUrl !== undefined || currentParentUrl !== null) {
        this.selectedParentMenu = currentParentUrl.toLowerCase();
      } else {
        this.selectedParentMenu = "dashboard";
      }
    },
    toggleSubMenu: function toggleSubMenu(e) {
      var hasSubmenu = e.target.dataset.submenu;
      var parent = e.target.dataset.item;
      if (hasSubmenu) {
        this.selectedParentMenu = parent;
        this.changeSecondarySidebarPropertiesViaMenuItem(true);
      } else {
        this.selectedParentMenu = parent;
        this.changeSecondarySidebarPropertiesViaMenuItem(false);
      }
    },
    removeOverlay: function removeOverlay() {
      this.changeSecondarySidebarPropertiesViaOverlay();
      if (window.innerWidth <= 1200) {
        this.changeSidebarProperties();
      }
      this.toggleSelectedParentMenu();
    },
    returnSelectedParentMenu: function returnSelectedParentMenu() {
      if (!this.isMenuOver) {
        this.toggleSelectedParentMenu();
      }
    },
    toggleSidebarDropdwon: function toggleSidebarDropdwon(event) {
      var dropdownMenus = this.$el.querySelectorAll(".dropdown-sidemenu.open");
      event.currentTarget.classList.toggle("open");
      dropdownMenus.forEach(function (dropdown) {
        dropdown.classList.remove("open");
      });
    }
  })
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/src/containers/layouts/largeSidebar/TopNav.vue?vue&type=script&lang=js&":
/*!***************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/src/containers/layouts/largeSidebar/TopNav.vue?vue&type=script&lang=js& ***!
  \***************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../../../utils */ "./resources/src/utils/index.js");
/* harmony import */ var mobile_device_detect__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! mobile-device-detect */ "./node_modules/mobile-device-detect/dist/index.js");
/* harmony import */ var mobile_device_detect__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(mobile_device_detect__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var vuex__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! vuex */ "./node_modules/vuex/dist/vuex.esm.js");
/* harmony import */ var vue_clickaway__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! vue-clickaway */ "./node_modules/vue-clickaway/dist/vue-clickaway.common.js");
/* harmony import */ var vue_clickaway__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(vue_clickaway__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var vue_flag_icon__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! vue-flag-icon */ "./node_modules/vue-flag-icon/index.js");
var _objectSpread2;
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }

// import Sidebar from "./Sidebar";



// import { setTimeout } from 'timers';

/* harmony default export */ __webpack_exports__["default"] = ({
  mixins: [vue_clickaway__WEBPACK_IMPORTED_MODULE_3__["mixin"]],
  components: {
    FlagIcon: vue_flag_icon__WEBPACK_IMPORTED_MODULE_4__["default"]
  },
  data: function data() {
    return {
      langs: ["en", "fr", "ar", "de", "es", "it", "Ind", "thai", "tr_ch", "sm_ch", "tur", "ru", "hn", "vn"],
      isDisplay: true,
      isStyle: true,
      isSearchOpen: false,
      isMouseOnMegaMenu: true,
      isMegaMenuOpen: false,
      is_Load: false
      // alerts:0,
    };
  },

  computed: _objectSpread({}, Object(vuex__WEBPACK_IMPORTED_MODULE_2__["mapGetters"])(["currentUser", "getSideBarToggleProperties", "currentUserPermissions", "notifs_alert"])),
  methods: _objectSpread(_objectSpread({}, Object(vuex__WEBPACK_IMPORTED_MODULE_2__["mapActions"])(["changeSecondarySidebarProperties", "changeSidebarProperties", "changeThemeMode", "logout"])), {}, (_objectSpread2 = {
    logoutUser: function logoutUser() {
      this.$store.dispatch("logout");
    },
    SetLocal: function SetLocal(locale) {
      this.$i18n.locale = locale;
      this.$store.dispatch("language/setLanguage", locale);
      Fire.$emit("ChangeLanguage");
    },
    handleFullScreen: function handleFullScreen() {
      _utils__WEBPACK_IMPORTED_MODULE_0__["default"].toggleFullScreen();
    }
  }, _defineProperty(_objectSpread2, "logoutUser", function logoutUser() {
    this.logout();
  }), _defineProperty(_objectSpread2, "closeMegaMenu", function closeMegaMenu() {
    this.isMegaMenuOpen = false;
  }), _defineProperty(_objectSpread2, "toggleMegaMenu", function toggleMegaMenu() {
    this.isMegaMenuOpen = !this.isMegaMenuOpen;
  }), _defineProperty(_objectSpread2, "toggleSearch", function toggleSearch() {
    this.isSearchOpen = !this.isSearchOpen;
  }), _defineProperty(_objectSpread2, "sideBarToggle", function sideBarToggle(el) {
    if (this.getSideBarToggleProperties.isSideNavOpen && this.getSideBarToggleProperties.isSecondarySideNavOpen && mobile_device_detect__WEBPACK_IMPORTED_MODULE_1__["isMobile"]) {
      this.changeSidebarProperties();
      this.changeSecondarySidebarProperties();
    } else if (this.getSideBarToggleProperties.isSideNavOpen && this.getSideBarToggleProperties.isSecondarySideNavOpen) {
      this.changeSecondarySidebarProperties();
    } else if (this.getSideBarToggleProperties.isSideNavOpen) {
      this.changeSidebarProperties();
    } else if (!this.getSideBarToggleProperties.isSideNavOpen && !this.getSideBarToggleProperties.isSecondarySideNavOpen && !this.getSideBarToggleProperties.isActiveSecondarySideNav) {
      this.changeSidebarProperties();
    } else if (!this.getSideBarToggleProperties.isSideNavOpen && !this.getSideBarToggleProperties.isSecondarySideNavOpen) {
      this.changeSidebarProperties();
      this.changeSecondarySidebarProperties();
    }
  }), _objectSpread2))
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/src/containers/layouts/largeSidebar/index.vue?vue&type=script&lang=js&":
/*!**************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/src/containers/layouts/largeSidebar/index.vue?vue&type=script&lang=js& ***!
  \**************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Sidebar__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Sidebar */ "./resources/src/containers/layouts/largeSidebar/Sidebar.vue");
/* harmony import */ var _TopNav__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./TopNav */ "./resources/src/containers/layouts/largeSidebar/TopNav.vue");
/* harmony import */ var _common_footer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../common/footer */ "./resources/src/containers/layouts/common/footer.vue");
/* harmony import */ var vuex__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! vuex */ "./node_modules/vuex/dist/vuex.esm.js");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }




/* harmony default export */ __webpack_exports__["default"] = ({
  components: {
    Sidebar: _Sidebar__WEBPACK_IMPORTED_MODULE_0__["default"],
    TopNav: _TopNav__WEBPACK_IMPORTED_MODULE_1__["default"],
    appFooter: _common_footer__WEBPACK_IMPORTED_MODULE_2__["default"]
  },
  data: function data() {
    return {};
  },
  computed: _objectSpread({}, Object(vuex__WEBPACK_IMPORTED_MODULE_3__["mapGetters"])(["getSideBarToggleProperties"])),
  methods: {}
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/src/containers/layouts/common/footer.vue?vue&type=template&id=1dfb17ff&scoped=true&":
/*!*******************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!./node_modules/vue-loader/lib??vue-loader-options!./resources/src/containers/layouts/common/footer.vue?vue&type=template&id=1dfb17ff&scoped=true& ***!
  \*******************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c("div", {
    staticClass: "footer_wrap"
  }, [_c("div", {
    staticClass: "flex-grow-1"
  }), _vm._v(" "), _c("div", {
    staticClass: "app-footer"
  }, [_c("div", {
    staticClass: "row"
  }, [_c("div", {
    staticClass: "col-md-9"
  }, [_c("p", [_c("strong", [_vm._v(_vm._s(_vm.currentUser.footer))])])])]), _vm._v(" "), _c("div", {
    staticClass: "footer-bottom border-top pt-3 d-flex flex-column flex-sm-row align-items-center"
  }, [_c("div", {
    staticClass: "d-flex align-items-center"
  }, [_c("img", {
    staticClass: "logo",
    attrs: {
      src: "/images/" + _vm.currentUser.logo,
      alt: "",
      width: "60",
      height: "60"
    }
  }), _vm._v(" "), _c("div", [_c("div", [_c("p", {
    staticClass: "m-0"
  }, [_vm._v("© 2023 " + _vm._s(_vm.$t("developed_by")) + " " + _vm._s(_vm.currentUser.developed_by))]), _vm._v(" "), _c("p", {
    staticClass: "m-0"
  }, [_vm._v("All rights reserved - v3.7.0")])])]), _vm._v(" "), _c("span", {
    staticClass: "flex-grow-1"
  })])])])]);
};
var staticRenderFns = [];
render._withStripped = true;


/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/src/containers/layouts/largeSidebar/Sidebar.vue?vue&type=template&id=696fbebe&scoped=true&":
/*!**************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!./node_modules/vue-loader/lib??vue-loader-options!./resources/src/containers/layouts/largeSidebar/Sidebar.vue?vue&type=template&id=696fbebe&scoped=true& ***!
  \**************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c("div", {
    staticClass: "side-content-wrap",
    on: {
      mouseenter: function mouseenter($event) {
        _vm.isMenuOver = true;
      },
      mouseleave: function mouseleave($event) {
        _vm.isMenuOver = false;
      },
      touchstart: function touchstart($event) {
        _vm.isMenuOver = true;
      }
    }
  }, [_c("vue-perfect-scrollbar", {
    ref: "myData",
    staticClass: "sidebar-left rtl-ps-none ps scroll",
    "class": {
      open: _vm.getSideBarToggleProperties.isSideNavOpen
    },
    attrs: {
      settings: {
        suppressScrollX: true,
        wheelPropagation: false
      }
    }
  }, [_c("div", [_c("ul", {
    staticClass: "navigation-left"
  }, [_c("li", {
    staticClass: "nav-item",
    "class": {
      active: _vm.selectedParentMenu == "dashboard"
    },
    attrs: {
      "data-item": "dashboard"
    },
    on: {
      mouseenter: _vm.toggleSubMenu
    }
  }, [_c("router-link", {
    staticClass: "nav-item-hold",
    attrs: {
      tag: "a",
      to: "/app/dashboard"
    }
  }, [_c("i", {
    staticClass: "nav-icon i-Bar-Chart"
  }), _vm._v(" "), _c("span", {
    staticClass: "nav-text"
  }, [_vm._v(_vm._s(_vm.$t("dashboard")))])])], 1), _vm._v(" "), _c("li", {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: _vm.currentUserPermissions && (_vm.currentUserPermissions.includes("users_company_view") || _vm.currentUserPermissions.includes("users_patients_view") || _vm.currentUserPermissions.includes("users_fisio_view")),
      expression: "currentUserPermissions && (currentUserPermissions.includes('users_company_view') \n                                             || currentUserPermissions.includes('users_patients_view')\n                                             || currentUserPermissions.includes('users_fisio_view'))"
    }],
    staticClass: "nav-item",
    "class": {
      active: _vm.selectedParentMenu == "Patients"
    },
    attrs: {
      "data-item": "Patients",
      "data-submenu": false
    },
    on: {
      mouseenter: _vm.toggleSubMenu
    }
  }, [_c("router-link", {
    staticClass: "nav-item-hold",
    attrs: {
      tag: "a",
      to: "/app/pages/people/patients"
    }
  }, [_c("i", {
    staticClass: "nav-icon i-Business-Mens"
  }), _vm._v(" "), _c("span", {
    staticClass: "nav-text"
  }, [_vm._v(_vm._s(_vm.$t("Patients")))])])], 1), _vm._v(" "), _c("li", {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: _vm.currentUserPermissions && (_vm.currentUserPermissions.includes("users_company_view") || _vm.currentUserPermissions.includes("users_patients_view") || _vm.currentUserPermissions.includes("users_fisio_view")),
      expression: "currentUserPermissions && (currentUserPermissions.includes('users_company_view') \n                                             || currentUserPermissions.includes('users_patients_view')\n                                             || currentUserPermissions.includes('users_fisio_view'))"
    }],
    staticClass: "nav-item",
    "class": {
      active: _vm.selectedParentMenu == "Doctor"
    },
    attrs: {
      "data-item": "Doctor",
      "data-submenu": false
    },
    on: {
      mouseenter: _vm.toggleSubMenu
    }
  }, [_c("router-link", {
    staticClass: "nav-item-hold",
    attrs: {
      tag: "a",
      to: "/app/pages/people/doctors"
    }
  }, [_c("i", {
    staticClass: "nav-icon i-Business-Mens"
  }), _vm._v(" "), _c("span", {
    staticClass: "nav-text"
  }, [_vm._v(_vm._s(_vm.$t("Doctors")))])])], 1), _vm._v(" "), _c("li", {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: _vm.currentUserPermissions && (_vm.currentUserPermissions.includes("setting_system") || _vm.currentUserPermissions.includes("permissions_view")),
      expression: "currentUserPermissions && (currentUserPermissions.includes('setting_system') \n                      || currentUserPermissions.includes('permissions_view'))"
    }],
    staticClass: "nav-item",
    "class": {
      active: _vm.selectedParentMenu == "settings"
    },
    attrs: {
      "data-item": "settings",
      "data-submenu": true
    },
    on: {
      mouseenter: _vm.toggleSubMenu
    }
  }, [_c("a", {
    staticClass: "nav-item-hold",
    attrs: {
      href: "#"
    }
  }, [_c("i", {
    staticClass: "nav-icon i-Data-Settings"
  }), _vm._v(" "), _c("span", {
    staticClass: "nav-text"
  }, [_vm._v(_vm._s(_vm.$t("PermissionsManager")))])]), _vm._v(" "), _c("div", {
    staticClass: "triangle"
  })]), _vm._v(" "), _c("li", {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: _vm.currentUserPermissions && (_vm.currentUserPermissions.includes("reports_fisio") || _vm.currentUserPermissions.includes("reports_reservas") || _vm.currentUserPermissions.includes("reports_patients") || _vm.currentUserPermissions.includes("reports_company")),
      expression: "currentUserPermissions && \n                   (currentUserPermissions.includes('reports_fisio') \n                   || currentUserPermissions.includes('reports_reservas')\n                   || currentUserPermissions.includes('reports_patients')\n                   || currentUserPermissions.includes('reports_company')\n                   )"
    }],
    staticClass: "nav-item",
    "class": {
      active: _vm.selectedParentMenu == "reports"
    },
    attrs: {
      "data-item": "reports",
      "data-submenu": true
    },
    on: {
      mouseenter: _vm.toggleSubMenu
    }
  }, [_c("a", {
    staticClass: "nav-item-hold",
    attrs: {
      href: "#"
    }
  }, [_c("i", {
    staticClass: "nav-icon i-Line-Chart"
  }), _vm._v(" "), _c("span", {
    staticClass: "nav-text"
  }, [_vm._v(_vm._s(_vm.$t("Reports")))])]), _vm._v(" "), _c("div", {
    staticClass: "triangle"
  })])])])]), _vm._v(" "), _c("vue-perfect-scrollbar", {
    staticClass: "sidebar-left-secondary ps rtl-ps-none",
    "class": {
      open: _vm.getSideBarToggleProperties.isSecondarySideNavOpen
    },
    attrs: {
      settings: {
        suppressScrollX: true,
        wheelPropagation: false
      }
    }
  }, [_c("div", {
    ref: "sidebarChild"
  }, [_c("ul", {
    staticClass: "childNav d-none",
    "class": {
      "d-block": _vm.selectedParentMenu == ""
    },
    attrs: {
      "data-parent": "reservations"
    }
  }), _vm._v(" "), _c("ul", {
    staticClass: "childNav d-none",
    "class": {
      "d-block": _vm.selectedParentMenu == ""
    },
    attrs: {
      "data-parent": "appointments"
    }
  }), _vm._v(" "), _c("ul", {
    staticClass: "childNav d-none",
    "class": {
      "d-block": _vm.selectedParentMenu == "settings"
    },
    attrs: {
      "data-parent": "settings"
    }
  }, [_vm.currentUserPermissions && _vm.currentUserPermissions.includes("permissions_view") ? _c("li", {
    staticClass: "nav-item"
  }, [_c("router-link", {
    attrs: {
      tag: "a",
      to: "/app/settings/permissions"
    }
  }, [_c("i", {
    staticClass: "nav-icon i-Key"
  }), _vm._v(" "), _c("span", {
    staticClass: "item-name"
  }, [_vm._v("Gestión de permisos")])])], 1) : _vm._e()]), _vm._v(" "), _c("ul", {
    staticClass: "childNav d-none",
    "class": {
      "d-block": _vm.selectedParentMenu == "reports"
    },
    attrs: {
      "data-parent": "reports"
    }
  })])]), _vm._v(" "), _c("div", {
    staticClass: "sidebar-overlay",
    "class": {
      open: _vm.getSideBarToggleProperties.isSecondarySideNavOpen
    },
    on: {
      click: function click($event) {
        return _vm.removeOverlay();
      }
    }
  })], 1);
};
var staticRenderFns = [];
render._withStripped = true;


/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/src/containers/layouts/largeSidebar/TopNav.vue?vue&type=template&id=7dfa9f1c&":
/*!*************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!./node_modules/vue-loader/lib??vue-loader-options!./resources/src/containers/layouts/largeSidebar/TopNav.vue?vue&type=template&id=7dfa9f1c& ***!
  \*************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c("div", {
    staticClass: "main-header"
  }, [_c("div", {
    staticClass: "logo"
  }, [_c("router-link", {
    attrs: {
      to: "/app/dashboard"
    }
  }, [_c("img", {
    attrs: {
      src: "/images/" + _vm.currentUser.logo,
      alt: "",
      width: "4000",
      height: "2000"
    }
  })])], 1), _vm._v(" "), _c("div", {
    staticClass: "menu-toggle",
    on: {
      click: _vm.sideBarToggle
    }
  }, [_c("div"), _vm._v(" "), _c("div"), _vm._v(" "), _c("div")]), _vm._v(" "), _c("div", {
    staticStyle: {
      margin: "auto"
    }
  }), _vm._v(" "), _c("div", {
    staticClass: "header-part-right"
  }, [_c("div", {
    staticClass: "dropdown"
  }, [_c("b-dropdown", {
    staticClass: "m-md-2 badge-top-container d-none d-sm-inline-block",
    attrs: {
      id: "dropdown-1",
      text: "Dropdown Button",
      "toggle-class": "text-decoration-none",
      "no-caret": "",
      variant: "link"
    }
  }, [_c("template", {
    slot: "button-content"
  }, [_vm.notifs_alert > 0 ? _c("span", {
    staticClass: "badge badge-primary"
  }, [_vm._v("1")]) : _vm._e(), _vm._v(" "), _c("i", {
    staticClass: "i-Bell text-muted header-icon"
  })]), _vm._v(" "), _c("vue-perfect-scrollbar", {
    ref: "myData",
    staticClass: "dropdown-menu-right rtl-ps-none notification-dropdown ps scroll",
    "class": {
      open: _vm.getSideBarToggleProperties.isSideNavOpen
    },
    attrs: {
      settings: {
        suppressScrollX: true,
        wheelPropagation: false
      }
    }
  }, [_vm.notifs_alert > 0 ? _c("div", {
    staticClass: "dropdown-item d-flex"
  }, [_c("div", {
    staticClass: "notification-icon"
  }, [_c("i", {
    staticClass: "i-Bell text-primary mr-1"
  })])]) : _vm._e()])], 2)], 1), _vm._v(" "), _c("div", {
    staticClass: "dropdown"
  }, [_c("b-dropdown", {
    staticClass: "m-md-2 user col align-self-end d-md-block",
    attrs: {
      id: "dropdown-1",
      text: "Dropdown Button",
      "toggle-class": "text-decoration-none",
      "no-caret": "",
      variant: "link"
    }
  }, [_c("template", {
    slot: "button-content"
  }, [_c("i", {
    staticClass: "i-User text-muted header-icon"
  })]), _vm._v(" "), _c("div", {
    staticClass: "dropdown-menu-right",
    attrs: {
      "aria-labelledby": "userDropdown"
    }
  }, [_c("div", {
    staticClass: "dropdown-header"
  }, [_c("i", {
    staticClass: "i-Lock-User mr-1"
  }), _vm._v(" "), _c("span", [_vm._v(_vm._s(_vm.currentUser.username))])]), _vm._v(" "), _c("router-link", {
    staticClass: "dropdown-item",
    attrs: {
      to: "/app/profile"
    }
  }, [_vm._v("Perfil")]), _vm._v(" "), _vm.currentUserPermissions && _vm.currentUserPermissions.includes("setting_system") ? _c("router-link", {
    staticClass: "dropdown-item",
    attrs: {
      to: "/app/settings/System_settings"
    }
  }, [_vm._v(_vm._s(_vm.$t("Settings")))]) : _vm._e(), _vm._v(" "), _c("a", {
    staticClass: "dropdown-item",
    attrs: {
      href: "#"
    },
    on: {
      click: function click($event) {
        $event.preventDefault();
        return _vm.logoutUser.apply(null, arguments);
      }
    }
  }, [_vm._v("Cerrar sesión")])], 1)], 2)], 1)])]);
};
var staticRenderFns = [];
render._withStripped = true;


/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/src/containers/layouts/largeSidebar/index.vue?vue&type=template&id=427f8858&":
/*!************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!./node_modules/vue-loader/lib??vue-loader-options!./resources/src/containers/layouts/largeSidebar/index.vue?vue&type=template&id=427f8858& ***!
  \************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c("div", {
    staticClass: "app-admin-wrap layout-sidebar-large clearfix"
  }, [_c("top-nav"), _vm._v(" "), _c("sidebar"), _vm._v(" "), _c("main", [_c("div", {
    staticClass: "main-content-wrap d-flex flex-column flex-grow-1",
    "class": {
      "sidenav-open": _vm.getSideBarToggleProperties.isSideNavOpen
    }
  }, [_c("transition", {
    attrs: {
      name: "page",
      mode: "out-in"
    }
  }, [_c("router-view")], 1), _vm._v(" "), _c("div", {
    staticClass: "flex-grow-1"
  }), _vm._v(" "), _c("appFooter")], 1)])], 1);
};
var staticRenderFns = [];
render._withStripped = true;


/***/ }),

/***/ "./resources/src/containers/layouts/common/footer.vue":
/*!************************************************************!*\
  !*** ./resources/src/containers/layouts/common/footer.vue ***!
  \************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _footer_vue_vue_type_template_id_1dfb17ff_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./footer.vue?vue&type=template&id=1dfb17ff&scoped=true& */ "./resources/src/containers/layouts/common/footer.vue?vue&type=template&id=1dfb17ff&scoped=true&");
/* harmony import */ var _footer_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./footer.vue?vue&type=script&lang=js& */ "./resources/src/containers/layouts/common/footer.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _footer_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _footer_vue_vue_type_template_id_1dfb17ff_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _footer_vue_vue_type_template_id_1dfb17ff_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "1dfb17ff",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/src/containers/layouts/common/footer.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/src/containers/layouts/common/footer.vue?vue&type=script&lang=js&":
/*!*************************************************************************************!*\
  !*** ./resources/src/containers/layouts/common/footer.vue?vue&type=script&lang=js& ***!
  \*************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_footer_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./footer.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/src/containers/layouts/common/footer.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_footer_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/src/containers/layouts/common/footer.vue?vue&type=template&id=1dfb17ff&scoped=true&":
/*!*******************************************************************************************************!*\
  !*** ./resources/src/containers/layouts/common/footer.vue?vue&type=template&id=1dfb17ff&scoped=true& ***!
  \*******************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_vue_loader_lib_index_js_vue_loader_options_footer_vue_vue_type_template_id_1dfb17ff_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!../../../../../node_modules/vue-loader/lib??vue-loader-options!./footer.vue?vue&type=template&id=1dfb17ff&scoped=true& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/src/containers/layouts/common/footer.vue?vue&type=template&id=1dfb17ff&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_vue_loader_lib_index_js_vue_loader_options_footer_vue_vue_type_template_id_1dfb17ff_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_vue_loader_lib_index_js_vue_loader_options_footer_vue_vue_type_template_id_1dfb17ff_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/src/containers/layouts/largeSidebar/Sidebar.vue":
/*!*******************************************************************!*\
  !*** ./resources/src/containers/layouts/largeSidebar/Sidebar.vue ***!
  \*******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Sidebar_vue_vue_type_template_id_696fbebe_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Sidebar.vue?vue&type=template&id=696fbebe&scoped=true& */ "./resources/src/containers/layouts/largeSidebar/Sidebar.vue?vue&type=template&id=696fbebe&scoped=true&");
/* harmony import */ var _Sidebar_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Sidebar.vue?vue&type=script&lang=js& */ "./resources/src/containers/layouts/largeSidebar/Sidebar.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Sidebar_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Sidebar_vue_vue_type_template_id_696fbebe_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Sidebar_vue_vue_type_template_id_696fbebe_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "696fbebe",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/src/containers/layouts/largeSidebar/Sidebar.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/src/containers/layouts/largeSidebar/Sidebar.vue?vue&type=script&lang=js&":
/*!********************************************************************************************!*\
  !*** ./resources/src/containers/layouts/largeSidebar/Sidebar.vue?vue&type=script&lang=js& ***!
  \********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Sidebar_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Sidebar.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/src/containers/layouts/largeSidebar/Sidebar.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Sidebar_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/src/containers/layouts/largeSidebar/Sidebar.vue?vue&type=template&id=696fbebe&scoped=true&":
/*!**************************************************************************************************************!*\
  !*** ./resources/src/containers/layouts/largeSidebar/Sidebar.vue?vue&type=template&id=696fbebe&scoped=true& ***!
  \**************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_vue_loader_lib_index_js_vue_loader_options_Sidebar_vue_vue_type_template_id_696fbebe_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Sidebar.vue?vue&type=template&id=696fbebe&scoped=true& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/src/containers/layouts/largeSidebar/Sidebar.vue?vue&type=template&id=696fbebe&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_vue_loader_lib_index_js_vue_loader_options_Sidebar_vue_vue_type_template_id_696fbebe_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_vue_loader_lib_index_js_vue_loader_options_Sidebar_vue_vue_type_template_id_696fbebe_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/src/containers/layouts/largeSidebar/TopNav.vue":
/*!******************************************************************!*\
  !*** ./resources/src/containers/layouts/largeSidebar/TopNav.vue ***!
  \******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _TopNav_vue_vue_type_template_id_7dfa9f1c___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./TopNav.vue?vue&type=template&id=7dfa9f1c& */ "./resources/src/containers/layouts/largeSidebar/TopNav.vue?vue&type=template&id=7dfa9f1c&");
/* harmony import */ var _TopNav_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./TopNav.vue?vue&type=script&lang=js& */ "./resources/src/containers/layouts/largeSidebar/TopNav.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _TopNav_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _TopNav_vue_vue_type_template_id_7dfa9f1c___WEBPACK_IMPORTED_MODULE_0__["render"],
  _TopNav_vue_vue_type_template_id_7dfa9f1c___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/src/containers/layouts/largeSidebar/TopNav.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/src/containers/layouts/largeSidebar/TopNav.vue?vue&type=script&lang=js&":
/*!*******************************************************************************************!*\
  !*** ./resources/src/containers/layouts/largeSidebar/TopNav.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_TopNav_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./TopNav.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/src/containers/layouts/largeSidebar/TopNav.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_TopNav_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/src/containers/layouts/largeSidebar/TopNav.vue?vue&type=template&id=7dfa9f1c&":
/*!*************************************************************************************************!*\
  !*** ./resources/src/containers/layouts/largeSidebar/TopNav.vue?vue&type=template&id=7dfa9f1c& ***!
  \*************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_vue_loader_lib_index_js_vue_loader_options_TopNav_vue_vue_type_template_id_7dfa9f1c___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!../../../../../node_modules/vue-loader/lib??vue-loader-options!./TopNav.vue?vue&type=template&id=7dfa9f1c& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/src/containers/layouts/largeSidebar/TopNav.vue?vue&type=template&id=7dfa9f1c&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_vue_loader_lib_index_js_vue_loader_options_TopNav_vue_vue_type_template_id_7dfa9f1c___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_vue_loader_lib_index_js_vue_loader_options_TopNav_vue_vue_type_template_id_7dfa9f1c___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/src/containers/layouts/largeSidebar/index.vue":
/*!*****************************************************************!*\
  !*** ./resources/src/containers/layouts/largeSidebar/index.vue ***!
  \*****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _index_vue_vue_type_template_id_427f8858___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.vue?vue&type=template&id=427f8858& */ "./resources/src/containers/layouts/largeSidebar/index.vue?vue&type=template&id=427f8858&");
/* harmony import */ var _index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./index.vue?vue&type=script&lang=js& */ "./resources/src/containers/layouts/largeSidebar/index.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _index_vue_vue_type_template_id_427f8858___WEBPACK_IMPORTED_MODULE_0__["render"],
  _index_vue_vue_type_template_id_427f8858___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/src/containers/layouts/largeSidebar/index.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/src/containers/layouts/largeSidebar/index.vue?vue&type=script&lang=js&":
/*!******************************************************************************************!*\
  !*** ./resources/src/containers/layouts/largeSidebar/index.vue?vue&type=script&lang=js& ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./index.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/src/containers/layouts/largeSidebar/index.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/src/containers/layouts/largeSidebar/index.vue?vue&type=template&id=427f8858&":
/*!************************************************************************************************!*\
  !*** ./resources/src/containers/layouts/largeSidebar/index.vue?vue&type=template&id=427f8858& ***!
  \************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_template_id_427f8858___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!../../../../../node_modules/vue-loader/lib??vue-loader-options!./index.vue?vue&type=template&id=427f8858& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/src/containers/layouts/largeSidebar/index.vue?vue&type=template&id=427f8858&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_template_id_427f8858___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_template_id_427f8858___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/src/utils/index.js":
/*!**************************************!*\
  !*** ./resources/src/utils/index.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var toggleFullScreen = function toggleFullScreen() {
  var doc = window.document;
  var docEl = doc.documentElement;
  var requestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen;
  var cancelFullScreen = doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen;
  if (!doc.fullscreenElement && !doc.mozFullScreenElement && !doc.webkitFullscreenElement && !doc.msFullscreenElement) {
    requestFullScreen.call(docEl);
  } else {
    cancelFullScreen.call(doc);
  }
};
/* harmony default export */ __webpack_exports__["default"] = ({
  toggleFullScreen: toggleFullScreen
});

/***/ })

}]);