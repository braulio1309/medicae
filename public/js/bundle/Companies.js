(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["Companies"],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/src/views/app/pages/people/companies.vue?vue&type=script&lang=js&":
/*!*********************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/src/views/app/pages/people/companies.vue?vue&type=script&lang=js& ***!
  \*********************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vuex__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vuex */ "./node_modules/vuex/dist/vuex.esm.js");
/* harmony import */ var nprogress__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! nprogress */ "./node_modules/nprogress/nprogress.js");
/* harmony import */ var nprogress__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(nprogress__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var jspdf__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! jspdf */ "./node_modules/jspdf/dist/jspdf.es.min.js");
/* harmony import */ var jspdf_autotable__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! jspdf-autotable */ "./node_modules/jspdf-autotable/dist/jspdf.plugin.autotable.js");
/* harmony import */ var jspdf_autotable__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(jspdf_autotable__WEBPACK_IMPORTED_MODULE_3__);
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }




/* harmony default export */ __webpack_exports__["default"] = ({
  metaInfo: {
    title: "Company"
  },
  data: function data() {
    return {
      editmode: false,
      isLoading: true,
      SubmitProcessing: false,
      email_exist: "",
      serverParams: {
        columnFilters: {},
        sort: {
          field: "id",
          type: "desc"
        },
        page: 1,
        perPage: 10
      },
      totalRows: "",
      search: "",
      limit: "10",
      Filter_Name: "",
      Filter_Email: "",
      Filter_status: "",
      Filter_Phone: "",
      permissions: {},
      companies: [],
      roles: [],
      data: new FormData(),
      user: {
        firstname: "",
        lastname: "",
        username: "",
        password: "",
        NewPassword: null,
        email: "",
        phone: "",
        statut: "",
        role_id: "",
        avatar: ""
      }
    };
  },
  computed: _objectSpread(_objectSpread({}, Object(vuex__WEBPACK_IMPORTED_MODULE_0__["mapGetters"])(["currentUserPermissions"])), {}, {
    columns: function columns() {
      return [{
        label: 'Nombre',
        field: "firstname",
        tdClass: "text-left",
        thClass: "text-left"
      }, {
        label: 'Apellido',
        field: "lastname",
        tdClass: "text-left",
        thClass: "text-left"
      }, {
        label: this.$t("username"),
        field: "username",
        tdClass: "text-left",
        thClass: "text-left"
      }, {
        label: this.$t("Email"),
        field: "email",
        tdClass: "text-left",
        thClass: "text-left"
      }, {
        label: 'Telefono',
        field: "phone",
        tdClass: "text-left",
        thClass: "text-left"
      }, {
        label: this.$t("Status"),
        field: "statut",
        html: true,
        sortable: false,
        tdClass: "text-center",
        thClass: "text-center"
      }, {
        label: 'Acciones',
        field: "actions",
        html: true,
        tdClass: "text-right",
        thClass: "text-right",
        sortable: false
      }];
    }
  }),
  methods: {
    //------------- Submit Validation Create & Edit User
    Submit_Company: function Submit_Company() {
      var _this = this;
      this.$refs.Create_Company.validate().then(function (success) {
        if (!success) {
          _this.makeToast("danger", _this.$t("Please_fill_the_form_correctly"), _this.$t("Failed"));
        } else {
          if (!_this.editmode) {
            _this.Create_Company();
          } else {
            _this.Update_Company();
          }
        }
      });
    },
    updateParams: function updateParams(newProps) {
      this.serverParams = Object.assign({}, this.serverParams, newProps);
    },
    //---- Event Page Change
    onPageChange: function onPageChange(_ref) {
      var currentPage = _ref.currentPage;
      if (this.serverParams.page !== currentPage) {
        this.updateParams({
          page: currentPage
        });
        this.Get_Companies(currentPage);
      }
    },
    //---- Event Per Page Change
    onPerPageChange: function onPerPageChange(_ref2) {
      var currentPerPage = _ref2.currentPerPage;
      if (this.limit !== currentPerPage) {
        this.limit = currentPerPage;
        this.updateParams({
          page: 1,
          perPage: currentPerPage
        });
        this.Get_Companies(1);
      }
    },
    //------ Event Sort Change
    onSortChange: function onSortChange(params) {
      this.updateParams({
        sort: {
          type: params[0].type,
          field: params[0].field
        }
      });
      this.Get_Companies(this.serverParams.page);
    },
    //------ Event Search
    onSearch: function onSearch(value) {
      this.search = value.searchTerm;
      this.Get_Companies(this.serverParams.page);
    },
    //------ Event Validation State
    getValidationState: function getValidationState(_ref3) {
      var dirty = _ref3.dirty,
        validated = _ref3.validated,
        _ref3$valid = _ref3.valid,
        valid = _ref3$valid === void 0 ? null : _ref3$valid;
      return dirty || validated ? valid : null;
    },
    //------ Reset Filter
    Reset_Filter: function Reset_Filter() {
      this.search = "";
      this.Filter_Name = "";
      this.Filter_status = "";
      this.Filter_Phone = "";
      this.Filter_Email = "";
      this.Get_Companys(this.serverParams.page);
    },
    //------ Toast
    makeToast: function makeToast(variant, msg, title) {
      this.$root.$bvToast.toast(msg, {
        title: title,
        variant: variant,
        solid: true
      });
    },
    //------ Checked Status User
    isChecked: function isChecked(user) {
      var _this2 = this;
      axios.put("users/Activated/" + user.id, {
        statut: user.statut,
        id: user.id
      }).then(function (response) {
        if (response.data.success) {
          if (user.statut) {
            user.statut = 1;
            _this2.makeToast("success", _this2.$t("ActivateUser"), _this2.$t("Success"));
          } else {
            user.statut = 0;
            _this2.makeToast("success", _this2.$t("DisActivateUser"), _this2.$t("Success"));
          }
        } else {
          user.statut = 1;
          _this2.makeToast("warning", _this2.$t("Delete.Therewassomethingwronge"), _this2.$t("Warning"));
        }
      })["catch"](function (error) {
        user.statut = 1;
        _this2.makeToast("warning", _this2.$t("Delete.Therewassomethingwronge"), _this2.$t("Warning"));
      });
    },
    //--------------------------- Companies PDF ---------------------------\\
    Companies_PDF: function Companies_PDF() {
      var self = this;
      var pdf = new jspdf__WEBPACK_IMPORTED_MODULE_2__["default"]("p", "pt");
      var columns = [{
        title: "First Name",
        dataKey: "firstname"
      }, {
        title: "Last Name",
        dataKey: "lastname"
      }, {
        title: "Username",
        dataKey: "username"
      }, {
        title: "Email",
        dataKey: "email"
      }, {
        title: "Phone",
        dataKey: "phone"
      }];
      pdf.autoTable(columns, self.clients);
      pdf.text("Company List", 40, 25);
      pdf.save("Customer_List.pdf");
    },
    //------------------------ Companies Excel ---------------------------\\
    Companies_Excel: function Companies_Excel() {
      // Start the progress bar.
      nprogress__WEBPACK_IMPORTED_MODULE_1___default.a.start();
      nprogress__WEBPACK_IMPORTED_MODULE_1___default.a.set(0.1);
      axios.get("users/export/Excel", {
        responseType: "blob",
        // important
        headers: {
          "Content-Type": "application/json"
        }
      }).then(function (response) {
        var url = window.URL.createObjectURL(new Blob([response.data]));
        var link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "List_Companys.xlsx");
        document.body.appendChild(link);
        link.click();
        // Complete the animation of theprogress bar.
        setTimeout(function () {
          return nprogress__WEBPACK_IMPORTED_MODULE_1___default.a.done();
        }, 500);
      })["catch"](function () {
        // Complete the animation of theprogress bar.
        setTimeout(function () {
          return nprogress__WEBPACK_IMPORTED_MODULE_1___default.a.done();
        }, 500);
      });
    },
    // Simply replaces null values with strings=''
    setToStrings: function setToStrings() {
      if (this.Filter_status === null) {
        this.Filter_status = "";
      }
    },
    //--------------------------------------- Get All Clients -------------------------------\\
    Get_Companys: function Get_Companys(page) {
      var _this3 = this;
      // Start the progress bar.
      nprogress__WEBPACK_IMPORTED_MODULE_1___default.a.start();
      nprogress__WEBPACK_IMPORTED_MODULE_1___default.a.set(0.1);
      this.setToStrings();
      axios.get("companies?page=" + page + "&name=" + this.Filter_Name + "&statut=" + this.Filter_status + "&phone=" + this.Filter_Phone + "&email=" + this.Filter_Email + "&SortField=" + this.serverParams.sort.field + "&SortType=" + this.serverParams.sort.type + "&search=" + this.search + "&limit=" + this.limit).then(function (response) {
        _this3.companies = response.data.companies;
        _this3.totalRows = response.data.totalRows;

        // Complete the animation of theprogress bar.
        nprogress__WEBPACK_IMPORTED_MODULE_1___default.a.done();
        _this3.isLoading = false;
      })["catch"](function (response) {
        // Complete the animation of theprogress bar.
        nprogress__WEBPACK_IMPORTED_MODULE_1___default.a.done();
        setTimeout(function () {
          _this3.isLoading = false;
        }, 500);
      });
    },
    //----------------------------------- Show import Client -------------------------------\\
    Show_import_clients: function Show_import_clients() {
      this.$bvModal.show("importClients");
    },
    //------------------------------ Event Import clients -------------------------------\\
    onFileSelected: function onFileSelected(e) {
      this.import_clients = "";
      var file = e.target.files[0];
      var errorFilesize;
      if (file["size"] < 1048576) {
        // 1 mega = 1,048,576 Bytes
        errorFilesize = false;
      } else {
        this.makeToast("danger", this.$t("file_size_must_be_less_than_1_mega"), this.$t("Failed"));
      }
      if (errorFilesize === false) {
        this.import_clients = file;
      }
    },
    //----------------------------------------Submit  import clients-----------------\\
    Submit_import: function Submit_import() {
      var _this4 = this;
      // Start the progress bar.
      nprogress__WEBPACK_IMPORTED_MODULE_1___default.a.start();
      nprogress__WEBPACK_IMPORTED_MODULE_1___default.a.set(0.1);
      var self = this;
      self.ImportProcessing = true;
      self.data.append("clients", self.import_clients);
      axios.post("companies/import/csv", self.data).then(function (response) {
        self.ImportProcessing = false;
        if (response.data.status === true) {
          _this4.makeToast("success", _this4.$t("Successfully_Imported"), _this4.$t("Success"));
          Fire.$emit("Event_import");
        } else if (response.data.status === false) {
          _this4.makeToast("danger", _this4.$t("field_must_be_in_csv_format"), _this4.$t("Failed"));
        }
        // Complete the animation of theprogress bar.
        nprogress__WEBPACK_IMPORTED_MODULE_1___default.a.done();
      })["catch"](function (error) {
        self.ImportProcessing = false;
        nprogress__WEBPACK_IMPORTED_MODULE_1___default.a.done();
        _this4.makeToast("danger", _this4.$t("Please_follow_the_import_instructions"), _this4.$t("Failed"));
      });
    },
    //----------------------------------- Show Details Client -------------------------------\\
    showDetails: function showDetails(client) {
      // Start the progress bar.
      nprogress__WEBPACK_IMPORTED_MODULE_1___default.a.start();
      nprogress__WEBPACK_IMPORTED_MODULE_1___default.a.set(0.1);
      this.client = client;
      Fire.$emit("Get_Details_customers");
    },
    //------------------------------ Show Modal (Create User) -------------------------------\\
    New_Company: function New_Company() {
      this.reset_Form();
      this.editmode = false;
      this.$bvModal.show("New_Company");
    },
    //------------------------------ Show Modal (Update User) -------------------------------\\
    Edit_Company: function Edit_Company(user) {
      this.Get_Companies(this.serverParams.page);
      this.reset_Form();
      this.user = user;
      this.user.NewPassword = null;
      this.editmode = true;
      this.$bvModal.show("New_Company");
    },
    //---------------------------------------- Create new Client -------------------------------\\
    Create_Company: function Create_Company() {
      var _this5 = this;
      var self = this;
      self.SubmitProcessing = true;
      self.data.append("firstname", self.user.firstname);
      self.data.append("lastname", self.user.lastname);
      self.data.append("username", self.user.username);
      self.data.append("email", self.user.email);
      self.data.append("password", self.user.password);
      self.data.append("phone", self.user.phone);
      axios.post("companies", self.data).then(function (response) {
        Fire.$emit("Event_Company");
        _this5.makeToast("success", _this5.$t("Create.TitleUser"), _this5.$t("Success"));
      })["catch"](function (error) {
        self.SubmitProcessing = false;
        if (error.errors.email.length > 0) {
          self.email_exist = error.errors.email[0];
        }
        _this5.makeToast("danger", _this5.$t("InvalidData"), _this5.$t("Failed"));
      });
    },
    //----------------------------------- Update Client -------------------------------\\
    Update_Company: function Update_Company() {
      var _this6 = this;
      var self = this;
      self.SubmitProcessing = true;
      self.data.append("firstname", self.user.firstname);
      self.data.append("lastname", self.user.lastname);
      self.data.append("username", self.user.username);
      self.data.append("email", self.user.email);
      self.data.append("NewPassword", self.user.NewPassword);
      self.data.append("phone", self.user.phone);
      self.data.append("statut", self.user.statut);
      self.data.append("_method", "put");
      axios.post("companies/" + this.user.id, self.data).then(function (response) {
        Fire.$emit("Event_Company");
        _this6.makeToast("success", _this6.$t("Update.TitleUser"), _this6.$t("Success"));
        Fire.$emit("Event_User");
        self.SubmitProcessing = false;
      })["catch"](function (error) {
        if (error.errors.email.length > 0) {
          self.email_exist = error.errors.email[0];
        }
        _this6.makeToast("danger", _this6.$t("InvalidData"), _this6.$t("Failed"));
        self.SubmitProcessing = false;
      });
    },
    //----------------------------- Reset Form ---------------------------\\
    reset_Form: function reset_Form() {
      this.user = {
        id: "",
        firstname: "",
        lastname: "",
        username: "",
        password: "",
        NewPassword: null,
        email: "",
        phone: "",
        statut: "",
        role_id: "",
        avatar: ""
      };
      this.email_exist = "";
    },
    //------------------------------- Remove Client -------------------------------\\
    Remove_Company: function Remove_Company(id) {
      var _this7 = this;
      this.$swal({
        title: this.$t("Delete.Title"),
        text: this.$t("Delete.Text"),
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        cancelButtonText: this.$t("Delete.cancelButtonText"),
        confirmButtonText: this.$t("Delete.confirmButtonText")
      }).then(function (result) {
        if (result.value) {
          axios["delete"]("companies/" + id).then(function () {
            _this7.$swal(_this7.$t("Delete.Deleted"), _this7.$t("Delete.UserDeleted"), "success");
            Fire.$emit("Delete_Company");
          })["catch"](function () {
            _this7.$swal(_this7.$t("Delete.Failed"), _this7.$t("Delete.ClientError"), "warning");
          });
        }
      });
    },
    //---- Delete Clients by selection
    delete_by_selected: function delete_by_selected() {
      var _this8 = this;
      this.$swal({
        title: this.$t("Delete.Title"),
        text: this.$t("Delete.Text"),
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        cancelButtonText: this.$t("Delete.cancelButtonText"),
        confirmButtonText: this.$t("Delete.confirmButtonText")
      }).then(function (result) {
        if (result.value) {
          // Start the progress bar.
          nprogress__WEBPACK_IMPORTED_MODULE_1___default.a.start();
          nprogress__WEBPACK_IMPORTED_MODULE_1___default.a.set(0.1);
          axios.post("companies/delete/by_selection", {
            selectedIds: _this8.selectedIds
          }).then(function () {
            _this8.$swal(_this8.$t("Delete.Deleted"), _this8.$t("Delete.CustomerDeleted"), "success");
            Fire.$emit("Delete_Company");
          })["catch"](function () {
            // Complete the animation of theprogress bar.
            setTimeout(function () {
              return nprogress__WEBPACK_IMPORTED_MODULE_1___default.a.done();
            }, 500);
            _this8.$swal(_this8.$t("Delete.Failed"), _this8.$t("Delete.Therewassomethingwronge"), "warning");
          });
        }
      });
    }
  },
  // END METHODS

  //----------------------------- Created function-------------------
  created: function created() {
    var _this9 = this;
    this.Get_Companys(1);
    Fire.$on("Get_Details_customers", function () {
      // Complete the animation of theprogress bar.
      setTimeout(function () {
        return nprogress__WEBPACK_IMPORTED_MODULE_1___default.a.done();
      }, 500);
      _this9.$bvModal.show("showDetails");
    });
    Fire.$on("Event_Company", function () {
      setTimeout(function () {
        _this9.Get_Companys(_this9.serverParams.page);
        _this9.$bvModal.hide("New_Company");
      }, 500);
    });
    Fire.$on("Delete_Company", function () {
      setTimeout(function () {
        _this9.Get_Companys(_this9.serverParams.page);
      }, 500);
    });
    Fire.$on("Event_import", function () {
      setTimeout(function () {
        _this9.Get_Companys(_this9.serverParams.page);
        _this9.$bvModal.hide("importClients");
      }, 500);
    });
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/src/views/app/pages/people/companies.vue?vue&type=template&id=d9fd0c90&":
/*!*******************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!./node_modules/vue-loader/lib??vue-loader-options!./resources/src/views/app/pages/people/companies.vue?vue&type=template&id=d9fd0c90& ***!
  \*******************************************************************************************************************************************************************************************************************************************************/
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
    staticClass: "main-content"
  }, [_c("breadcumb", {
    attrs: {
      page: "Gestión de Empresas"
    }
  }), _vm._v(" "), _vm.isLoading ? _c("div", {
    staticClass: "loading_page spinner spinner-primary mr-3"
  }) : _c("div", [_c("vue-good-table", {
    attrs: {
      mode: "remote",
      columns: _vm.columns,
      totalRows: _vm.totalRows,
      rows: _vm.companies,
      "search-options": {
        enabled: true,
        placeholder: "Buscar"
      },
      "pagination-options": {
        enabled: true,
        mode: "Resultados",
        nextLabel: "Siguiente",
        prevLabel: "Anterior"
      },
      styleClass: "table-hover tableOne vgt-table"
    },
    on: {
      "on-page-change": _vm.onPageChange,
      "on-per-page-change": _vm.onPerPageChange,
      "on-sort-change": _vm.onSortChange,
      "on-search": _vm.onSearch
    },
    scopedSlots: _vm._u([{
      key: "table-row",
      fn: function fn(props) {
        return [props.column.field == "actions" ? _c("span", [_vm.currentUserPermissions && _vm.currentUserPermissions.includes("users_edit") ? _c("a", {
          directives: [{
            name: "b-tooltip",
            rawName: "v-b-tooltip.hover",
            modifiers: {
              hover: true
            }
          }],
          attrs: {
            title: "Edit"
          },
          on: {
            click: function click($event) {
              return _vm.Edit_Company(props.row);
            }
          }
        }, [_c("i", {
          staticClass: "i-Edit text-25 text-success"
        })]) : _vm._e(), _vm._v(" "), _vm.currentUserPermissions && _vm.currentUserPermissions.includes("users_delete") ? _c("a", {
          directives: [{
            name: "b-tooltip",
            rawName: "v-b-tooltip.hover",
            modifiers: {
              hover: true
            }
          }],
          attrs: {
            title: "Delete"
          },
          on: {
            click: function click($event) {
              return _vm.Remove_Company(props.row.id);
            }
          }
        }, [_c("i", {
          staticClass: "i-Close-Window text-25 text-danger"
        })]) : _vm._e()]) : props.column.field == "statut" ? _c("div", [_c("label", {
          staticClass: "switch switch-primary mr-3"
        }, [_c("input", {
          directives: [{
            name: "model",
            rawName: "v-model",
            value: props.row.statut,
            expression: "props.row.statut"
          }],
          attrs: {
            type: "checkbox"
          },
          domProps: {
            checked: Array.isArray(props.row.statut) ? _vm._i(props.row.statut, null) > -1 : props.row.statut
          },
          on: {
            change: [function ($event) {
              var $$a = props.row.statut,
                $$el = $event.target,
                $$c = $$el.checked ? true : false;
              if (Array.isArray($$a)) {
                var $$v = null,
                  $$i = _vm._i($$a, $$v);
                if ($$el.checked) {
                  $$i < 0 && _vm.$set(props.row, "statut", $$a.concat([$$v]));
                } else {
                  $$i > -1 && _vm.$set(props.row, "statut", $$a.slice(0, $$i).concat($$a.slice($$i + 1)));
                }
              } else {
                _vm.$set(props.row, "statut", $$c);
              }
            }, function ($event) {
              return _vm.isChecked(props.row);
            }]
          }
        }), _vm._v(" "), _c("span", {
          staticClass: "slider"
        })])]) : _vm._e()];
      }
    }])
  }, [_c("div", {
    staticClass: "mt-2 mb-3",
    attrs: {
      slot: "table-actions"
    },
    slot: "table-actions"
  }, [_c("b-button", {
    directives: [{
      name: "b-toggle",
      rawName: "v-b-toggle.sidebar-right",
      modifiers: {
        "sidebar-right": true
      }
    }],
    attrs: {
      variant: "outline-info m-1",
      size: "sm"
    }
  }, [_c("i", {
    staticClass: "i-Filter-2"
  }), _vm._v("\n          " + _vm._s(_vm.$t("Filter")) + "\n        ")]), _vm._v(" "), _c("b-button", {
    attrs: {
      size: "sm",
      variant: "outline-success m-1"
    },
    on: {
      click: function click($event) {
        return _vm.Companies_PDF();
      }
    }
  }, [_c("i", {
    staticClass: "i-File-Copy"
  }), _vm._v(" PDF\n        ")]), _vm._v(" "), _c("b-button", {
    attrs: {
      size: "sm",
      variant: "outline-danger m-1"
    },
    on: {
      click: function click($event) {
        return _vm.Companies_Excel();
      }
    }
  }, [_c("i", {
    staticClass: "i-File-Excel"
  }), _vm._v(" EXCEL\n        ")]), _vm._v(" "), _vm.currentUserPermissions && _vm.currentUserPermissions.includes("users_import") ? _c("b-button", {
    attrs: {
      size: "sm",
      variant: "info m-1"
    },
    on: {
      click: function click($event) {
        return _vm.Show_import_clients();
      }
    }
  }, [_c("i", {
    staticClass: "i-Download"
  }), _vm._v("\n          " + _vm._s(_vm.$t("Import_Companys")) + "\n        ")]) : _vm._e(), _vm._v(" "), _vm.currentUserPermissions && _vm.currentUserPermissions.includes("users_add") ? _c("b-button", {
    attrs: {
      size: "sm",
      variant: "btn btn-primary btn-icon m-1"
    },
    on: {
      click: function click($event) {
        return _vm.New_Company();
      }
    }
  }, [_c("i", {
    staticClass: "i-Add"
  }), _vm._v("\n          Crear\n        ")]) : _vm._e()], 1)])], 1), _vm._v(" "), _c("b-sidebar", {
    attrs: {
      id: "sidebar-right",
      title: _vm.$t("Filter"),
      "bg-variant": "white",
      right: "",
      shadow: ""
    }
  }, [_c("div", {
    staticClass: "px-3 py-2"
  }, [_c("b-row", [_c("b-col", {
    attrs: {
      md: "12"
    }
  }, [_c("b-form-group", {
    attrs: {
      label: "Usuario"
    }
  }, [_c("b-form-input", {
    attrs: {
      label: "Code",
      placeholder: _vm.$t("username")
    },
    model: {
      value: _vm.Filter_Name,
      callback: function callback($$v) {
        _vm.Filter_Name = $$v;
      },
      expression: "Filter_Name"
    }
  })], 1)], 1), _vm._v(" "), _c("b-col", {
    attrs: {
      md: "12"
    }
  }, [_c("b-form-group", {
    attrs: {
      label: "Telefono"
    }
  }, [_c("b-form-input", {
    attrs: {
      label: "Phone",
      placeholder: _vm.$t("SearchByPhone")
    },
    model: {
      value: _vm.Filter_Phone,
      callback: function callback($$v) {
        _vm.Filter_Phone = $$v;
      },
      expression: "Filter_Phone"
    }
  })], 1)], 1), _vm._v(" "), _c("b-col", {
    attrs: {
      md: "12"
    }
  }, [_c("b-form-group", {
    attrs: {
      label: "email"
    }
  }, [_c("b-form-input", {
    attrs: {
      label: "Email",
      placeholder: _vm.$t("SearchByEmail")
    },
    model: {
      value: _vm.Filter_Email,
      callback: function callback($$v) {
        _vm.Filter_Email = $$v;
      },
      expression: "Filter_Email"
    }
  })], 1)], 1), _vm._v(" "), _c("b-col", {
    attrs: {
      md: "12"
    }
  }, [_c("b-form-group", {
    attrs: {
      label: _vm.$t("Status")
    }
  }, [_c("v-select", {
    attrs: {
      reduce: function reduce(label) {
        return label.value;
      },
      placeholder: _vm.$t("Choose_Status"),
      options: [{
        label: "Actif",
        value: "1"
      }, {
        label: "Inactif",
        value: "0"
      }]
    },
    model: {
      value: _vm.Filter_status,
      callback: function callback($$v) {
        _vm.Filter_status = $$v;
      },
      expression: "Filter_status"
    }
  })], 1)], 1), _vm._v(" "), _c("b-col", {
    attrs: {
      md: "6",
      sm: "12"
    }
  }, [_c("b-button", {
    attrs: {
      variant: "primary m-1",
      size: "sm",
      block: ""
    },
    on: {
      click: function click($event) {
        return _vm.Get_Companies(_vm.serverParams.page);
      }
    }
  }, [_c("i", {
    staticClass: "i-Filter-2"
  }), _vm._v("\n            " + _vm._s(_vm.$t("Filter")) + "\n          ")])], 1), _vm._v(" "), _c("b-col", {
    attrs: {
      md: "6",
      sm: "12"
    }
  }, [_c("b-button", {
    attrs: {
      variant: "danger m-1",
      size: "sm",
      block: ""
    },
    on: {
      click: function click($event) {
        return _vm.Reset_Filter();
      }
    }
  }, [_c("i", {
    staticClass: "i-Power-2"
  }), _vm._v("\n            " + _vm._s(_vm.$t("Reset")) + "\n          ")])], 1)], 1)], 1)]), _vm._v(" "), _c("validation-observer", {
    ref: "Create_Company"
  }, [_c("b-modal", {
    attrs: {
      "hide-footer": "",
      size: "lg",
      id: "New_Company",
      title: _vm.editmode ? _vm.$t("Edit") : _vm.$t("Add")
    }
  }, [_c("b-form", {
    attrs: {
      enctype: "multipart/form-data"
    },
    on: {
      submit: function submit($event) {
        $event.preventDefault();
        return _vm.Submit_Company.apply(null, arguments);
      }
    }
  }, [_c("b-row", [_c("b-col", {
    attrs: {
      md: "6",
      sm: "12"
    }
  }, [_c("validation-provider", {
    attrs: {
      name: "Firstname",
      rules: {
        required: true,
        min: 3,
        max: 30
      }
    },
    scopedSlots: _vm._u([{
      key: "default",
      fn: function fn(validationContext) {
        return [_c("b-form-group", {
          attrs: {
            label: "Nombre"
          }
        }, [_c("b-form-input", {
          attrs: {
            state: _vm.getValidationState(validationContext),
            "aria-describedby": "Firstname-feedback",
            label: "Firstname"
          },
          model: {
            value: _vm.user.firstname,
            callback: function callback($$v) {
              _vm.$set(_vm.user, "firstname", $$v);
            },
            expression: "user.firstname"
          }
        }), _vm._v(" "), _c("b-form-invalid-feedback", {
          attrs: {
            id: "Firstname-feedback"
          }
        }, [_vm._v(_vm._s(validationContext.errors[0]))])], 1)];
      }
    }])
  })], 1), _vm._v(" "), _c("b-col", {
    attrs: {
      md: "6",
      sm: "12"
    }
  }, [_c("validation-provider", {
    attrs: {
      name: "lastname",
      rules: {
        required: true,
        min: 3,
        max: 30
      }
    },
    scopedSlots: _vm._u([{
      key: "default",
      fn: function fn(validationContext) {
        return [_c("b-form-group", {
          attrs: {
            label: "Apellido"
          }
        }, [_c("b-form-input", {
          attrs: {
            state: _vm.getValidationState(validationContext),
            "aria-describedby": "lastname-feedback",
            label: "lastname"
          },
          model: {
            value: _vm.user.lastname,
            callback: function callback($$v) {
              _vm.$set(_vm.user, "lastname", $$v);
            },
            expression: "user.lastname"
          }
        }), _vm._v(" "), _c("b-form-invalid-feedback", {
          attrs: {
            id: "lastname-feedback"
          }
        }, [_vm._v(_vm._s(validationContext.errors[0]))])], 1)];
      }
    }])
  })], 1), _vm._v(" "), _c("b-col", {
    attrs: {
      md: "6",
      sm: "12"
    }
  }, [_c("validation-provider", {
    attrs: {
      name: "username",
      rules: {
        required: true,
        min: 3,
        max: 30
      }
    },
    scopedSlots: _vm._u([{
      key: "default",
      fn: function fn(validationContext) {
        return [_c("b-form-group", {
          attrs: {
            label: _vm.$t("username")
          }
        }, [_c("b-form-input", {
          attrs: {
            state: _vm.getValidationState(validationContext),
            "aria-describedby": "username-feedback",
            label: "username"
          },
          model: {
            value: _vm.user.username,
            callback: function callback($$v) {
              _vm.$set(_vm.user, "username", $$v);
            },
            expression: "user.username"
          }
        }), _vm._v(" "), _c("b-form-invalid-feedback", {
          attrs: {
            id: "username-feedback"
          }
        }, [_vm._v(_vm._s(validationContext.errors[0]))])], 1)];
      }
    }])
  })], 1), _vm._v(" "), _c("b-col", {
    attrs: {
      md: "6",
      sm: "12"
    }
  }, [_c("validation-provider", {
    attrs: {
      name: "Phone",
      rules: {
        required: true
      }
    },
    scopedSlots: _vm._u([{
      key: "default",
      fn: function fn(validationContext) {
        return [_c("b-form-group", {
          attrs: {
            label: "Telefono"
          }
        }, [_c("b-form-input", {
          attrs: {
            state: _vm.getValidationState(validationContext),
            "aria-describedby": "Phone-feedback",
            label: "Phone"
          },
          model: {
            value: _vm.user.phone,
            callback: function callback($$v) {
              _vm.$set(_vm.user, "phone", $$v);
            },
            expression: "user.phone"
          }
        }), _vm._v(" "), _c("b-form-invalid-feedback", {
          attrs: {
            id: "Phone-feedback"
          }
        }, [_vm._v(_vm._s(validationContext.errors[0]))])], 1)];
      }
    }])
  })], 1), _vm._v(" "), _c("b-col", {
    attrs: {
      md: "6",
      sm: "12"
    }
  }, [_c("validation-provider", {
    attrs: {
      name: "Email",
      rules: {
        required: true
      }
    },
    scopedSlots: _vm._u([{
      key: "default",
      fn: function fn(validationContext) {
        return [_c("b-form-group", {
          attrs: {
            label: _vm.$t("Email")
          }
        }, [_c("b-form-input", {
          attrs: {
            state: _vm.getValidationState(validationContext),
            "aria-describedby": "Email-feedback",
            label: "Email"
          },
          model: {
            value: _vm.user.email,
            callback: function callback($$v) {
              _vm.$set(_vm.user, "email", $$v);
            },
            expression: "user.email"
          }
        }), _vm._v(" "), _c("b-form-invalid-feedback", {
          attrs: {
            id: "Email-feedback"
          }
        }, [_vm._v(_vm._s(validationContext.errors[0]))]), _vm._v(" "), _vm.email_exist != "" ? _c("b-alert", {
          staticClass: "error mt-1",
          attrs: {
            show: "",
            variant: "danger"
          }
        }, [_vm._v(_vm._s(_vm.email_exist))]) : _vm._e()], 1)];
      }
    }])
  })], 1), _vm._v(" "), !_vm.editmode ? _c("b-col", {
    attrs: {
      md: "6",
      sm: "12"
    }
  }, [_c("validation-provider", {
    attrs: {
      name: "password",
      rules: {
        required: true,
        min: 6,
        max: 14
      }
    },
    scopedSlots: _vm._u([{
      key: "default",
      fn: function fn(validationContext) {
        return [_c("b-form-group", {
          attrs: {
            label: "Contraseña"
          }
        }, [_c("b-form-input", {
          attrs: {
            state: _vm.getValidationState(validationContext),
            "aria-describedby": "password-feedback",
            label: "password",
            type: "password"
          },
          model: {
            value: _vm.user.password,
            callback: function callback($$v) {
              _vm.$set(_vm.user, "password", $$v);
            },
            expression: "user.password"
          }
        }), _vm._v(" "), _c("b-form-invalid-feedback", {
          attrs: {
            id: "password-feedback"
          }
        }, [_vm._v(_vm._s(validationContext.errors[0]))])], 1)];
      }
    }], null, false, 3424259420)
  })], 1) : _vm._e(), _vm._v(" "), _vm.editmode ? _c("b-col", {
    attrs: {
      md: "6"
    }
  }, [_c("validation-provider", {
    attrs: {
      name: "New password",
      rules: {
        min: 6,
        max: 14
      }
    },
    scopedSlots: _vm._u([{
      key: "default",
      fn: function fn(validationContext) {
        return [_c("b-form-group", {
          attrs: {
            label: _vm.$t("Newpassword")
          }
        }, [_c("b-form-input", {
          attrs: {
            state: _vm.getValidationState(validationContext),
            "aria-describedby": "Nawpassword-feedback",
            placeholder: _vm.$t("LeaveBlank"),
            label: "New password"
          },
          model: {
            value: _vm.user.NewPassword,
            callback: function callback($$v) {
              _vm.$set(_vm.user, "NewPassword", $$v);
            },
            expression: "user.NewPassword"
          }
        }), _vm._v(" "), _c("b-form-invalid-feedback", {
          attrs: {
            id: "Nawpassword-feedback"
          }
        }, [_vm._v(_vm._s(validationContext.errors[0]))])], 1)];
      }
    }], null, false, 1010016937)
  })], 1) : _vm._e(), _vm._v(" "), _c("b-col", {
    staticClass: "mt-3",
    attrs: {
      md: "12"
    }
  }, [_c("b-button", {
    attrs: {
      variant: "primary",
      type: "submit",
      disabled: _vm.SubmitProcessing
    }
  }, [_vm._v(_vm._s(_vm.$t("submit")))]), _vm._v(" "), _vm.SubmitProcessing ? _vm._m(0) : _vm._e()], 1)], 1)], 1)], 1)], 1)], 1);
};
var staticRenderFns = [function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c("div", {
    staticClass: "typo__p"
  }, [_c("div", {
    staticClass: "spinner sm spinner-primary mt-3"
  })]);
}];
render._withStripped = true;


/***/ }),

/***/ "./resources/src/views/app/pages/people/companies.vue":
/*!************************************************************!*\
  !*** ./resources/src/views/app/pages/people/companies.vue ***!
  \************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _companies_vue_vue_type_template_id_d9fd0c90___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./companies.vue?vue&type=template&id=d9fd0c90& */ "./resources/src/views/app/pages/people/companies.vue?vue&type=template&id=d9fd0c90&");
/* harmony import */ var _companies_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./companies.vue?vue&type=script&lang=js& */ "./resources/src/views/app/pages/people/companies.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _companies_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _companies_vue_vue_type_template_id_d9fd0c90___WEBPACK_IMPORTED_MODULE_0__["render"],
  _companies_vue_vue_type_template_id_d9fd0c90___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/src/views/app/pages/people/companies.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/src/views/app/pages/people/companies.vue?vue&type=script&lang=js&":
/*!*************************************************************************************!*\
  !*** ./resources/src/views/app/pages/people/companies.vue?vue&type=script&lang=js& ***!
  \*************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_companies_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./companies.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/src/views/app/pages/people/companies.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_companies_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/src/views/app/pages/people/companies.vue?vue&type=template&id=d9fd0c90&":
/*!*******************************************************************************************!*\
  !*** ./resources/src/views/app/pages/people/companies.vue?vue&type=template&id=d9fd0c90& ***!
  \*******************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_vue_loader_lib_index_js_vue_loader_options_companies_vue_vue_type_template_id_d9fd0c90___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./companies.vue?vue&type=template&id=d9fd0c90& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/src/views/app/pages/people/companies.vue?vue&type=template&id=d9fd0c90&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_vue_loader_lib_index_js_vue_loader_options_companies_vue_vue_type_template_id_d9fd0c90___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_vue_loader_lib_index_js_vue_loader_options_companies_vue_vue_type_template_id_d9fd0c90___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);