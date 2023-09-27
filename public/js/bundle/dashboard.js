(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["dashboard"],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/src/views/app/dashboard/dashboard.vue?vue&type=script&lang=js&":
/*!******************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/src/views/app/dashboard/dashboard.vue?vue&type=script&lang=js& ***!
  \******************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vuex__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vuex */ "./node_modules/vuex/dist/vuex.esm.js");
/* harmony import */ var vue_echarts_components_ECharts_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vue-echarts/components/ECharts.vue */ "./node_modules/vue-echarts/components/ECharts.vue");
/* harmony import */ var echarts_lib_chart_pie__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! echarts/lib/chart/pie */ "./node_modules/echarts/lib/chart/pie.js");
/* harmony import */ var echarts_lib_chart_pie__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(echarts_lib_chart_pie__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var echarts_lib_chart_bar__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! echarts/lib/chart/bar */ "./node_modules/echarts/lib/chart/bar.js");
/* harmony import */ var echarts_lib_chart_bar__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(echarts_lib_chart_bar__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var echarts_lib_chart_line__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! echarts/lib/chart/line */ "./node_modules/echarts/lib/chart/line.js");
/* harmony import */ var echarts_lib_chart_line__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(echarts_lib_chart_line__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var echarts_lib_component_tooltip__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! echarts/lib/component/tooltip */ "./node_modules/echarts/lib/component/tooltip.js");
/* harmony import */ var echarts_lib_component_tooltip__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(echarts_lib_component_tooltip__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var echarts_lib_component_legend__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! echarts/lib/component/legend */ "./node_modules/echarts/lib/component/legend.js");
/* harmony import */ var echarts_lib_component_legend__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(echarts_lib_component_legend__WEBPACK_IMPORTED_MODULE_6__);
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }



// import ECharts modules manually to reduce bundle size





/* harmony default export */ __webpack_exports__["default"] = ({
  components: {
    "v-chart": vue_echarts_components_ECharts_vue__WEBPACK_IMPORTED_MODULE_1__["default"]
  },
  metaInfo: {
    // if no subcomponents specify a metaInfo.title, this title will be used
    title: "Dashboard"
  },
  data: function data() {
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
  computed: _objectSpread(_objectSpread({}, Object(vuex__WEBPACK_IMPORTED_MODULE_0__["mapGetters"])(["currentUser"])), {}, {
    columns_appointment: function columns_appointment() {
      return [{
        label: this.$t("Reference"),
        field: "id",
        tdClass: "gull-border-none text-left",
        thClass: "text-left",
        sortable: false
      }, {
        label: this.$t("Doctor"),
        field: "doctor_name",
        tdClass: "gull-border-none text-left",
        thClass: "text-left",
        sortable: false
      }, {
        label: this.$t("Patient"),
        field: "patient_name",
        tdClass: "gull-border-none text-left",
        thClass: "text-left",
        sortable: false
      }, {
        label: this.$t("Day"),
        field: "day",
        html: true,
        sortable: false,
        tdClass: "text-left gull-border-none",
        thClass: "text-left"
      }];
    },
    columns_stock: function columns_stock() {
      return [{
        label: this.$t("ProductCode"),
        field: "code",
        tdClass: "text-left",
        thClass: "text-left",
        sortable: false
      }, {
        label: this.$t("ProductName"),
        field: "name",
        tdClass: "text-left",
        thClass: "text-left",
        sortable: false
      }, {
        label: this.$t("warehouse"),
        field: "warehouse",
        tdClass: "text-left",
        thClass: "text-left",
        sortable: false
      }, {
        label: this.$t("Quantity"),
        field: "quantity",
        tdClass: "text-left",
        thClass: "text-left",
        sortable: false
      }, {
        label: this.$t("AlertQuantity"),
        field: "stock_alert",
        tdClass: "text-left",
        thClass: "text-left",
        sortable: false
      }];
    },
    columns_patients: function columns_patients() {
      return [{
        label: this.$t("Name"),
        field: "name",
        tdClass: "text-left",
        thClass: "text-left",
        sortable: false
      }];
    }
  }),
  methods: {
    //---------------------------------- Report Dashboard With Echart
    report_with_echart: function report_with_echart() {
      var _this = this;
      axios.get("chart/report_with_echart").then(function (response) {
        var responseData = response.data;
        _this.report_today = response.data.report_dashboard.original.report;
        // this.stock_alerts =
        // response.data.report_dashboard.original.stock_alert;
        _this.appointments = response.data.report_dashboard.original.last_appointments;
        _this.patients = response.data.report_dashboard.original.patients;
        var dark_heading = "#c2c6dc";
        _this.echartPatient = {
          color: ["#6D28D9", "#8B5CF6", "#A78BFA", "#C4B5FD", "#7C3AED"],
          tooltip: {
            show: true,
            backgroundColor: "rgba(0, 0, 0, .8)"
          },
          formatter: function formatter(params) {
            return "".concat(params.name, ": (").concat(params.data.value, " cita) (").concat(params.percent, "%)");
          },
          series: [{
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
          }]
        };
        _this.echartAppointment = {
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
          series: [{
            name: "Citas Recibidas",
            type: "line",
            data: responseData.appointments.original.appointments_received
          }, {
            name: "Citas Pendientes",
            type: "line",
            data: responseData.appointments.original.appointments_pending
          }]
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
        _this.loading = false;
      })["catch"](function (response) {});
    },
    //------------------------------Get Month -------------------------\\
    GetMonth: function GetMonth() {
      var months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
      var now = new Date();
      this.CurrentMonth = months[now.getMonth()];
    },
    //------------------------------Formetted Numbers -------------------------\\
    formatNumber: function formatNumber(number, dec) {
      var value = (typeof number === "string" ? number : number.toString()).split(".");
      if (dec <= 0) return value[0];
      var formated = value[1] || "";
      if (formated.length > dec) return "".concat(value[0], ".").concat(formated.substr(0, dec));
      while (formated.length < dec) formated += "0";
      return "".concat(value[0], ".").concat(formated);
    }
  },
  mounted: function mounted() {
    var _this2 = this;
    return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _this2.report_with_echart();
          case 2:
            _this2.GetMonth();
          case 3:
          case "end":
            return _context.stop();
        }
      }, _callee);
    }))();
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/src/views/app/dashboard/dashboard.vue?vue&type=template&id=5fd1f857&":
/*!****************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!./node_modules/vue-loader/lib??vue-loader-options!./resources/src/views/app/dashboard/dashboard.vue?vue&type=template&id=5fd1f857& ***!
  \****************************************************************************************************************************************************************************************************************************************************/
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
  }, [_c("b-row", [_c("b-col", {
    attrs: {
      cols: "8"
    }
  }, [_c("div", {
    staticClass: "card",
    staticStyle: {
      "background-color": "#F1F5F8",
      padding: "10px",
      height: "100%"
    }
  }, [_c("div", {
    staticClass: "row mb-6",
    staticStyle: {
      "margin-bottom": "10px"
    }
  }, [_c("div", {
    staticClass: "col-sm-4"
  }, [_c("h2", {
    staticClass: "text-center"
  }, [_vm._v("Agenda del día")])]), _vm._v(" "), _c("div", {
    staticClass: "col-sm-4"
  }), _vm._v(" "), _c("div", {
    staticClass: "col-sm-4"
  }, [_c("h2", {
    staticClass: "text-center",
    staticStyle: {}
  }, [_vm._v("Miercoles")])])]), _vm._v(" "), _c("div", {
    staticClass: "col-sm-12"
  }, [_c("div", {
    staticClass: "row text-center",
    staticStyle: {
      "font-size": "25px"
    }
  }, [_c("div", {
    staticClass: "col-sm-4"
  }, [_vm._v("\n              8:00 am\n            ")]), _vm._v(" "), _c("div", {
    staticClass: "col-sm-4",
    staticStyle: {
      "letter-spacing": "2px"
    }
  }, [_vm._v("\n              ......................................\n            ")]), _vm._v(" "), _c("div", {
    staticClass: "col-sm-4"
  }, [_vm._v("\n              Braulio Zapata\n            ")])]), _vm._v(" "), _c("div", {
    staticClass: "row text-center",
    staticStyle: {
      "font-size": "25px"
    }
  }, [_c("div", {
    staticClass: "col-sm-4"
  }, [_vm._v("\n              9:00 am\n            ")]), _vm._v(" "), _c("div", {
    staticClass: "col-sm-4",
    staticStyle: {
      "letter-spacing": "2px"
    }
  }, [_vm._v("\n              ......................................\n            ")]), _vm._v(" "), _c("div", {
    staticClass: "col-sm-4"
  }, [_vm._v("\n              Matías Rodriguez\n            ")])]), _vm._v(" "), _c("div", {
    staticClass: "row text-center",
    staticStyle: {
      "font-size": "25px"
    }
  }, [_c("div", {
    staticClass: "col-sm-4"
  }, [_vm._v("\n              10:00 am\n            ")]), _vm._v(" "), _c("div", {
    staticClass: "col-sm-4",
    staticStyle: {
      "letter-spacing": "2px"
    }
  }, [_vm._v("\n              ......................................\n            ")]), _vm._v(" "), _c("div", {
    staticClass: "col-sm-4"
  }, [_vm._v("\n              Test Alex\n            ")])])])])]), _vm._v(" "), _c("b-col", {
    attrs: {
      cols: "4"
    }
  }, [_c("b-row", [_c("b-col", {
    attrs: {
      cols: "12"
    }
  }, [_c("b-card", {
    staticClass: "mb-30"
  }, [_c("h4", {
    staticClass: "font-weight-bold mb-4"
  }, [_vm._v("Ultimas citas")]), _vm._v(" "), _c("div", {}, [_c("div", {
    staticClass: "row"
  }, [_c("div", {
    staticClass: "col-sm-12"
  }, [_c("div", {
    staticClass: "row"
  }, [_c("div", {
    staticClass: "col-sm-2"
  }, [_c("b-avatar", {
    attrs: {
      src: "images/avatar/no_avatar.png"
    }
  })], 1), _vm._v(" "), _c("div", {
    staticClass: "col-sm-6"
  }, [_c("h5", {}, [_vm._v("Braulio Zapata")]), _vm._v(" "), _c("h6", {
    staticClass: "text-muted"
  }, [_vm._v("\n                              Hace 1 hora \n                          ")])]), _vm._v(" "), _c("div", {
    staticClass: "col-sm-4"
  }, [_c("br"), _vm._v(" "), _c("span", {
    staticClass: "badge rounded-pill bg-success"
  }, [_vm._v("Actualizado")])])]), _vm._v(" "), _c("hr", {
    staticStyle: {
      "margin-top": "-1px"
    }
  })])])]), _vm._v(" "), _c("div", {}, [_c("div", {
    staticClass: "row"
  }, [_c("div", {
    staticClass: "col-sm-12"
  }, [_c("div", {
    staticClass: "row"
  }, [_c("div", {
    staticClass: "col-sm-2"
  }, [_c("b-avatar", {
    attrs: {
      src: "images/avatar/no_avatar.png"
    }
  })], 1), _vm._v(" "), _c("div", {
    staticClass: "col-sm-6"
  }, [_c("h5", {}, [_vm._v("Braulio Zapata")]), _vm._v(" "), _c("h6", {
    staticClass: "text-muted"
  }, [_vm._v("\n                              Hace 1 hora \n                          ")])]), _vm._v(" "), _c("div", {
    staticClass: "col-sm-4"
  }, [_c("br"), _vm._v(" "), _c("span", {
    staticClass: "badge rounded-pill bg-success"
  }, [_vm._v("Actualizado")])])]), _vm._v(" "), _c("hr", {
    staticStyle: {
      "margin-top": "-1px"
    }
  })])])])])], 1)], 1), _vm._v(" "), _c("b-row", [_c("b-col", {
    attrs: {
      cols: "12"
    }
  }, [_c("b-card", {
    staticClass: "mb-30",
    staticStyle: {
      "background-color": "#4B9AEB"
    }
  }, [_c("h4", {
    staticClass: "card-title m-0"
  }, [_vm._v(_vm._s(_vm.$t("TopPatient")) + " (" + _vm._s(_vm.CurrentMonth) + ")")]), _vm._v(" "), _c("div", {
    staticClass: "chart-wrapper"
  }, [_c("v-chart", {
    attrs: {
      options: _vm.echartPatient,
      autoresize: true
    }
  })], 1)])], 1)], 1)], 1)], 1)], 1);
};
var staticRenderFns = [];
render._withStripped = true;


/***/ }),

/***/ "./resources/src/views/app/dashboard/dashboard.vue":
/*!*********************************************************!*\
  !*** ./resources/src/views/app/dashboard/dashboard.vue ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _dashboard_vue_vue_type_template_id_5fd1f857___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dashboard.vue?vue&type=template&id=5fd1f857& */ "./resources/src/views/app/dashboard/dashboard.vue?vue&type=template&id=5fd1f857&");
/* harmony import */ var _dashboard_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dashboard.vue?vue&type=script&lang=js& */ "./resources/src/views/app/dashboard/dashboard.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _dashboard_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _dashboard_vue_vue_type_template_id_5fd1f857___WEBPACK_IMPORTED_MODULE_0__["render"],
  _dashboard_vue_vue_type_template_id_5fd1f857___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/src/views/app/dashboard/dashboard.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/src/views/app/dashboard/dashboard.vue?vue&type=script&lang=js&":
/*!**********************************************************************************!*\
  !*** ./resources/src/views/app/dashboard/dashboard.vue?vue&type=script&lang=js& ***!
  \**********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_dashboard_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./dashboard.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/src/views/app/dashboard/dashboard.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_dashboard_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/src/views/app/dashboard/dashboard.vue?vue&type=template&id=5fd1f857&":
/*!****************************************************************************************!*\
  !*** ./resources/src/views/app/dashboard/dashboard.vue?vue&type=template&id=5fd1f857& ***!
  \****************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_vue_loader_lib_index_js_vue_loader_options_dashboard_vue_vue_type_template_id_5fd1f857___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!../../../../../node_modules/vue-loader/lib??vue-loader-options!./dashboard.vue?vue&type=template&id=5fd1f857& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/src/views/app/dashboard/dashboard.vue?vue&type=template&id=5fd1f857&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_vue_loader_lib_index_js_vue_loader_options_dashboard_vue_vue_type_template_id_5fd1f857___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_vue_loader_lib_index_js_vue_loader_options_dashboard_vue_vue_type_template_id_5fd1f857___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);