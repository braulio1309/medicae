(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["edit_date"],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/src/views/app/pages/dates/Edit_date.vue?vue&type=script&lang=js&":
/*!********************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/src/views/app/pages/dates/Edit_date.vue?vue&type=script&lang=js& ***!
  \********************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue_upload_multiple_image__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue-upload-multiple-image */ "./node_modules/vue-upload-multiple-image/src/main.js");
/* harmony import */ var _johmun_vue_tags_input__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @johmun/vue-tags-input */ "./node_modules/@johmun/vue-tags-input/dist/vue-tags-input.js");
/* harmony import */ var _johmun_vue_tags_input__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_johmun_vue_tags_input__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var nprogress__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! nprogress */ "./node_modules/nprogress/nprogress.js");
/* harmony import */ var nprogress__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(nprogress__WEBPACK_IMPORTED_MODULE_2__);
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }



/* harmony default export */ __webpack_exports__["default"] = ({
  metaInfo: {
    title: "Edit Product"
  },
  data: function data() {
    return {
      tag: "",
      len: 8,
      images: [],
      imageArray: [],
      change: false,
      isLoading: true,
      SubmitProcessing: false,
      data: new FormData(),
      categories: [],
      Subcategories: [],
      units: [],
      units_sub: [],
      brands: [],
      roles: {},
      variants: [],
      product: {
        name: "",
        code: "",
        Type_barcode: "",
        cost: "",
        price: "",
        brand_id: "",
        category_id: "",
        TaxNet: "",
        tax_method: "1",
        unit_id: "",
        unit_sale_id: "",
        unit_purchase_id: "",
        stock_alert: "",
        image: "",
        note: "",
        is_variant: false
      },
      code_exist: ""
    };
  },
  components: {
    VueUploadMultipleImage: vue_upload_multiple_image__WEBPACK_IMPORTED_MODULE_0__["default"],
    VueTagsInput: _johmun_vue_tags_input__WEBPACK_IMPORTED_MODULE_1___default.a
  },
  methods: {
    //------------- Submit Validation Update Product
    Submit_Product: function Submit_Product() {
      var _this = this;
      this.$refs.Edit_Product.validate().then(function (success) {
        if (!success) {
          _this.makeToast("danger", _this.$t("Please_fill_the_form_correctly"), _this.$t("Failed"));
        } else {
          _this.Update_Product();
        }
      });
    },
    //------ Validation state fields
    getValidationState: function getValidationState(_ref) {
      var dirty = _ref.dirty,
        validated = _ref.validated,
        _ref$valid = _ref.valid,
        valid = _ref$valid === void 0 ? null : _ref$valid;
      return dirty || validated ? valid : null;
    },
    //------ Toast
    makeToast: function makeToast(variant, msg, title) {
      this.$root.$bvToast.toast(msg, {
        title: title,
        variant: variant,
        solid: true
      });
    },
    //------Show Notification If Variant is Duplicate
    showNotifDuplicate: function showNotifDuplicate() {
      this.makeToast("warning", this.$t("VariantDuplicate"), this.$t("Warning"));
    },
    //------ event upload Image Success
    uploadImageSuccess: function uploadImageSuccess(formData, index, fileList, imageArray) {
      this.images = fileList;
    },
    //------ event before Remove image
    beforeRemove: function beforeRemove(index, done, fileList) {
      var remove = confirm("remove image");
      if (remove == true) {
        this.images.splice(index, 1);
        done();
      } else {}
    },
    //---------------------------------------Get Product Elements ------------------------------\\
    GetElements: function GetElements() {
      var _this2 = this;
      var id = this.$route.params.id;
      axios.get("Products/".concat(id, "/edit")).then(function (response) {
        _this2.product = response.data.product;
        _this2.variants = response.data.product.ProductVariant;
        _this2.images = response.data.product.images;
        _this2.categories = response.data.categories;
        _this2.brands = response.data.brands;
        _this2.units = response.data.units;
        _this2.units_sub = response.data.units_sub;
        _this2.Subcategories = response.data.Subcategories;
        _this2.isLoading = false;
      })["catch"](function (response) {
        setTimeout(function () {
          _this2.isLoading = false;
        }, 500);
      });
    },
    //---------------------- Get Sub Units with Unit id ------------------------------\\
    Get_Units_SubBase: function Get_Units_SubBase(value) {
      var _this3 = this;
      axios.get("Get_Units_SubBase?id=" + value).then(function (_ref2) {
        var data = _ref2.data;
        return _this3.units_sub = data;
      });
    },
    //---------------------- Event Select Unit Product ------------------------------\\
    Selected_Unit: function Selected_Unit(value) {
      this.units_sub = [];
      this.product.unit_sale_id = "";
      this.product.unit_purchase_id = "";
      this.Get_Units_SubBase(value);
    },
    //------------------------------ Update Product ------------------------------\\
    Update_Product: function Update_Product() {
      var _this4 = this;
      nprogress__WEBPACK_IMPORTED_MODULE_2___default.a.start();
      nprogress__WEBPACK_IMPORTED_MODULE_2___default.a.set(0.1);
      var self = this;
      self.SubmitProcessing = true;
      if (self.product.is_variant && self.variants.length <= 0) {
        self.product.is_variant = false;
      }

      // append objet product
      Object.entries(self.product).forEach(function (_ref3) {
        var _ref4 = _slicedToArray(_ref3, 2),
          key = _ref4[0],
          value = _ref4[1];
        self.data.append(key, value);
      });

      //append array variants
      if (self.variants.length) {
        for (var i = 0; i < self.variants.length; i++) {
          Object.entries(self.variants[i]).forEach(function (_ref5) {
            var _ref6 = _slicedToArray(_ref5, 2),
              key = _ref6[0],
              value = _ref6[1];
            self.data.append("variants[" + i + "][" + key + "]", value);
          });
        }
      }

      //append array images
      if (self.images.length > 0) {
        for (var k = 0; k < self.images.length; k++) {
          Object.entries(self.images[k]).forEach(function (_ref7) {
            var _ref8 = _slicedToArray(_ref7, 2),
              key = _ref8[0],
              value = _ref8[1];
            self.data.append("images[" + k + "][" + key + "]", value);
          });
        }
      }
      self.data.append("_method", "put");

      //send Data with axios
      axios.post("Products/" + this.product.id, self.data).then(function (response) {
        nprogress__WEBPACK_IMPORTED_MODULE_2___default.a.done();
        self.SubmitProcessing = false;
        _this4.$router.push({
          name: "index_products"
        });
        _this4.makeToast("success", _this4.$t("Successfully_Updated"), _this4.$t("Success"));
      })["catch"](function (error) {
        if (error.errors.code.length > 0) {
          self.code_exist = error.errors.code[0];
        }
        nprogress__WEBPACK_IMPORTED_MODULE_2___default.a.done();
        _this4.makeToast("danger", _this4.$t("InvalidData"), _this4.$t("Failed"));
        self.SubmitProcessing = false;
      });
    }
  },
  //end Methods

  //-----------------------------Created function-------------------

  created: function created() {
    this.GetElements();
    this.imageArray = [];
    this.images = [];
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/src/views/app/pages/people/patientsData.vue?vue&type=script&lang=js&":
/*!************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/src/views/app/pages/people/patientsData.vue?vue&type=script&lang=js& ***!
  \************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var nprogress__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! nprogress */ "./node_modules/nprogress/nprogress.js");
/* harmony import */ var nprogress__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(nprogress__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var vuex__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vuex */ "./node_modules/vuex/dist/vuex.esm.js");
/* harmony import */ var date_fns__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! date-fns */ "./node_modules/date-fns/esm/index.js");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }



/* harmony default export */ __webpack_exports__["default"] = ({
  metaInfo: {
    title: "Profile"
  },
  data: function data() {
    return {
      SubmitProcessing: false,
      data: new FormData(),
      avatar: "",
      username: "",
      fields: ['Transaction', 'Amount'],
      items: [{
        Amount: 40,
        Transaction: 'Dickerson'
      }, {
        Amount: 21,
        Transaction: 'Larsen'
      }, {
        Amount: 89,
        Transaction: 'Geneva'
      }],
      appointments_pending: [],
      appointments_past: [],
      appointments: [],
      appointment: [],
      editmode: false,
      notes: '',
      isLoading: true,
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
      patient: {}
    };
  },
  computed: _objectSpread({
    Avatar: function Avatar() {
      var _this$user$avatar, _this$user;
      return (_this$user$avatar = (_this$user = this.user) === null || _this$user === void 0 ? void 0 : _this$user.avatar) !== null && _this$user$avatar !== void 0 ? _this$user$avatar : 'no-image.png';
    },
    Fullname: function Fullname() {
      var _this$user2, _this$user3;
      return ((_this$user2 = this.user) === null || _this$user2 === void 0 ? void 0 : _this$user2.firstname) + ' ' + ((_this$user3 = this.user) === null || _this$user3 === void 0 ? void 0 : _this$user3.lastname);
    }
  }, Object(vuex__WEBPACK_IMPORTED_MODULE_1__["mapGetters"])(["currentUser"])),
  methods: {
    Submit_Recipe: function Submit_Recipe() {
      var _this = this;
      this.$refs.Create_Recipe.validate().then(function (success) {
        if (!success) {
          _this.makeToast("danger", _this.$t("Please_fill_the_form_correctly"), _this.$t("Failed"));
        } else {
          if (!_this.editmode) {
            _this.Create_Recipe();
          } else {
            _this.Update_Recipe();
          }
        }
      });
    },
    //------------------------ Create Recipe ---------------------------\\
    Create_Recipe: function Create_Recipe() {
      var _this2 = this;
      var self = this;
      self.SubmitProcessing = true;
      self.data.append("id", self.user.id);
      self.data.append("recipe", self.user.recipe);
      self.data.append("diagnosic", self.user.diagnosic);
      self.data.append('reservation_id', self.appointment.id);
      axios.post("patient/recipe", self.data, {
        responseType: "blob",
        // important
        headers: {
          "Content-Type": "application/json"
        }
      }).then(function (response) {
        self.SubmitProcessing = false;
        var file = new Blob([response.data], {
          type: 'application/pdf'
        });
        var fileURL = URL.createObjectURL(file);
        var pdfWindow = window.open();
        pdfWindow.document.title = "Recipe";
        pdfWindow.document.write("<iframe width='100%' height='100%' src='" + fileURL + "'></iframe>");
        /*var printWindow = window.open(fileURL, '', 'width=800,height=500');
        printWindow.print()*/
        _this2.appointment = [];
        _this2.user.files = [];
        _this2.user.file = '';
        _this2.notes = '';
        setTimeout(function () {
          _this2.Get_Profile_Info();
        }, 500);
        _this2.makeToast("success", _this2.$t("Create.TitleUser"), _this2.$t("Success"));
      })["catch"](function (error) {
        self.SubmitProcessing = false;
        _this2.makeToast("danger", _this2.$t("InvalidData"), _this2.$t("Failed"));
      });
    },
    focusTextarea: function focusTextarea(appointment) {
      this.notes = appointment.notes;
      this.appointment = appointment;
      this.user.files = appointment.documents;
      this.$refs.myTextarea.focus();
    },
    //------------------------------ Show Modal (Create User) -------------------------------\\
    New_Recipe: function New_Recipe() {
      this.editmode = false;
      this.$bvModal.show("New_Recipe");
    },
    openFileInput: function openFileInput() {
      if (this.appointment.length == 0 || typeof this.appointment == 'undefined') {
        this.makeToast("warning", "Seleccione una cita", this.$t("Warning"));
        return;
      }
      // Simula un clic en el botón de subir archivo oculto
      this.$refs.fileInput.click();
    },
    updatedNote: function updatedNote() {
      var _this3 = this;
      if (this.notes == "" || this.appointment.length == 0 || typeof this.appointment == 'undefined') {
        this.makeToast("warning", "Seleccione una cita", this.$t("Warning"));
        return;
      }
      var self = this;
      self.data.append("notes", self.notes);
      self.SubmitProcessing = true;
      axios.post("Reservations/updateNotes/" + this.appointment.id, self.data).then(function (response) {
        _this3.makeToast("success", _this3.$t("Success"), _this3.$t("Success"));
        _this3.appointment = [];
        _this3.user.files = [];
        _this3.notes = '';
        _this3.Get_Profile_Info();
        self.SubmitProcessing = false;
      })["catch"](function (error) {
        _this3.makeToast("danger", _this3.$t("InvalidData"), _this3.$t("Failed"));
        self.SubmitProcessing = false;
      });
    },
    formatDate: function formatDate(date) {
      return Object(date_fns__WEBPACK_IMPORTED_MODULE_2__["format"])(new Date(date), 'dd-MM-yyyy');
    },
    calculateTotalAmount: function calculateTotalAmount(items) {
      return items.reduce(function (total, item) {
        return total + item.Amount;
      }, 0);
    },
    //------------- Submit Update Profile
    Submit_Profile: function Submit_Profile() {
      var _this4 = this;
      this.$refs.Update_Profile.validate().then(function (success) {
        if (!success) {
          _this4.makeToast("danger", _this4.$t("Please_fill_the_form_correctly"), _this4.$t("Failed"));
        } else {
          _this4.Update_Profile();
        }
      });
    },
    //------ Toast
    makeToast: function makeToast(variant, msg, title) {
      this.$root.$bvToast.toast(msg, {
        title: title,
        variant: variant,
        solid: true
      });
    },
    //------ Validation State fields
    getValidationState: function getValidationState(_ref) {
      var dirty = _ref.dirty,
        validated = _ref.validated,
        _ref$valid = _ref.valid,
        valid = _ref$valid === void 0 ? null : _ref$valid;
      return dirty || validated ? valid : null;
    },
    loadLink: function loadLink(documento) {
      // const link = axios.get("/documents/"+document.id+'/download');
      // return link.data;
      axios({
        url: "/documents/" + documento.id + '/download',
        method: 'GET',
        responseType: 'blob' // Importante: establece el tipo de respuesta a 'blob'
      }).then(function (response) {
        var blob = new Blob([response.data], {
          type: response.headers['content-type']
        });
        var link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = documento.name; // Establece el nombre del archivo para la descarga
        link.click();
        URL.revokeObjectURL(link.href); // Libera recursos después de la descarga
      });
    },
    //------------------ Get Profile Info ----------------------\\
    Get_Profile_Info: function Get_Profile_Info() {
      var _this5 = this;
      axios.get("patients/Get_Info/Profile/" + this.$route.params.id).then(function (response) {
        _this5.user.id = response.data.user.id;
        _this5.user.firstname = response.data.user.firstname;
        _this5.user.lastname = response.data.user.lastname;
        _this5.user.email = response.data.user.email;
        _this5.user.phone = response.data.user.phone;
        _this5.user.registration_date = response.data.user.registration_date;
        _this5.user.name_role = response.data.user.name_role;
        _this5.appointments_pending = response.data.user.reservations_pending;
        _this5.appointments_past = response.data.user.reservations_past;
        _this5.appointments = response.data.user.reservations;
        _this5.avatar = _this5.currentUser.avatar;
        _this5.username = _this5.currentUser.username;
        _this5.isLoading = false;
      })["catch"](function (response) {
        _this5.isLoading = false;
      });
      axios.get("patients/" + this.$route.params.id).then(function (response) {
        if (response.data.patient) {
          _this5.user.weight = response.data.patient.weight;
          _this5.user.allergies = response.data.patient.allergies;
          _this5.user.height = response.data.patient.height;
          _this5.user.bloodType = response.data.patient.bloodType;
        }
      })["catch"](function (response) {
        _this5.isLoading = false;
      });
    },
    //------------------------------ Event Upload Avatar -------------------------------\\
    onFileSelected: function onFileSelected(e) {
      var _this6 = this;
      return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              if (e) {
                _this6.user.file = e.target.files[0];
                _this6.Update_Profile();
              } else {
                _this6.user.file = "";
              }
            case 1:
            case "end":
              return _context.stop();
          }
        }, _callee);
      }))();
    },
    //------------------ Update Profile ----------------------\\
    Update_Profile: function Update_Profile() {
      var _this7 = this;
      // Start the progress bar.
      nprogress__WEBPACK_IMPORTED_MODULE_0___default.a.start();
      nprogress__WEBPACK_IMPORTED_MODULE_0___default.a.set(0.1);
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

      axios.post("update/profile/patience/" + this.appointment.id, self.data).then(function (response) {
        _this7.makeToast("success", _this7.$t("Update.TitleProfile"), _this7.$t("Success"));
        nprogress__WEBPACK_IMPORTED_MODULE_0___default.a.done(), 500;
        _this7.appointment = [];
        _this7.user.files = [];
        _this7.user.file = '';
        _this7.notes = '';
        setTimeout(function () {
          _this7.Get_Profile_Info();
        }, 500);
      })["catch"](function (error) {
        console.log(error);
        nprogress__WEBPACK_IMPORTED_MODULE_0___default.a.done();
      });
    }
  },
  // END METHODS

  //----------------------------- Created function-------------------
  created: function created() {
    this.Get_Profile_Info();
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/src/views/app/pages/dates/Edit_date.vue?vue&type=template&id=768e3e68&":
/*!******************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!./node_modules/vue-loader/lib??vue-loader-options!./resources/src/views/app/pages/dates/Edit_date.vue?vue&type=template&id=768e3e68& ***!
  \******************************************************************************************************************************************************************************************************************************************************/
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
      page: "Update Product",
      folder: _vm.$t("Products")
    }
  }), _vm._v(" "), _vm.isLoading ? _c("div", {
    staticClass: "loading_page spinner spinner-primary mr-3"
  }) : _vm._e(), _vm._v(" "), !_vm.isLoading ? _c("validation-observer", {
    ref: "Edit_Product"
  }, [_c("b-form", {
    attrs: {
      enctype: "multipart/form-data"
    },
    on: {
      submit: function submit($event) {
        $event.preventDefault();
        return _vm.Submit_Product.apply(null, arguments);
      }
    }
  }, [_c("b-row", [_c("b-col", {
    attrs: {
      md: "8"
    }
  }, [_c("b-card", [_c("b-card-body", [_c("b-row", [_c("b-col", {
    staticClass: "mb-2",
    attrs: {
      md: "6"
    }
  }, [_c("validation-provider", {
    attrs: {
      name: "name",
      rules: {
        required: true,
        min: 3,
        max: 55
      }
    },
    scopedSlots: _vm._u([{
      key: "default",
      fn: function fn(validationContext) {
        return [_c("b-form-group", {
          attrs: {
            label: _vm.$t("Name_product")
          }
        }, [_c("b-form-input", {
          attrs: {
            state: _vm.getValidationState(validationContext),
            "aria-describedby": "name-feedback",
            label: "name",
            placeholder: _vm.$t("Enter_Name_Product")
          },
          model: {
            value: _vm.product.name,
            callback: function callback($$v) {
              _vm.$set(_vm.product, "name", $$v);
            },
            expression: "product.name"
          }
        }), _vm._v(" "), _c("b-form-invalid-feedback", {
          attrs: {
            id: "name-feedback"
          }
        }, [_vm._v(_vm._s(validationContext.errors[0]))])], 1)];
      }
    }], null, false, 2669341686)
  })], 1), _vm._v(" "), _c("b-col", {
    staticClass: "mb-2",
    attrs: {
      md: "6"
    }
  }, [_c("validation-provider", {
    attrs: {
      name: "Code Product",
      rules: {
        required: true
      }
    },
    scopedSlots: _vm._u([{
      key: "default",
      fn: function fn(validationContext) {
        return [_c("b-form-group", {
          attrs: {
            label: _vm.$t("CodeProduct")
          }
        }, [_c("div", {
          staticClass: "input-group"
        }, [_c("input", {
          directives: [{
            name: "model",
            rawName: "v-model",
            value: _vm.product.code,
            expression: "product.code"
          }],
          staticClass: "form-control",
          attrs: {
            state: _vm.getValidationState(validationContext),
            "aria-describedby": "CodeProduct-feedback",
            type: "text"
          },
          domProps: {
            value: _vm.product.code
          },
          on: {
            input: function input($event) {
              if ($event.target.composing) return;
              _vm.$set(_vm.product, "code", $event.target.value);
            }
          }
        }), _vm._v(" "), _c("b-form-invalid-feedback", {
          attrs: {
            id: "CodeProduct-feedback"
          }
        }, [_vm._v(_vm._s(validationContext.errors[0]))])], 1), _vm._v(" "), _c("span", [_vm._v(_vm._s(_vm.$t("Scan_your_barcode_and_select_the_correct_symbology_below")))]), _vm._v(" "), _vm.code_exist != "" ? _c("b-alert", {
          staticClass: "error mt-1",
          attrs: {
            show: "",
            variant: "danger"
          }
        }, [_vm._v(_vm._s(_vm.code_exist))]) : _vm._e()], 1)];
      }
    }], null, false, 1408029394)
  })], 1), _vm._v(" "), _c("b-col", {
    staticClass: "mb-2",
    attrs: {
      md: "6"
    }
  }, [_c("validation-provider", {
    attrs: {
      name: "category",
      rules: {
        required: true
      }
    },
    scopedSlots: _vm._u([{
      key: "default",
      fn: function fn(_ref) {
        var valid = _ref.valid,
          errors = _ref.errors;
        return _c("b-form-group", {
          attrs: {
            label: _vm.$t("Categorie")
          }
        }, [_c("v-select", {
          "class": {
            "is-invalid": !!errors.length
          },
          attrs: {
            state: errors[0] ? false : valid ? true : null,
            reduce: function reduce(label) {
              return label.value;
            },
            placeholder: _vm.$t("Choose_Category"),
            options: _vm.categories.map(function (categories) {
              return {
                label: categories.name,
                value: categories.id
              };
            })
          },
          model: {
            value: _vm.product.category_id,
            callback: function callback($$v) {
              _vm.$set(_vm.product, "category_id", $$v);
            },
            expression: "product.category_id"
          }
        }), _vm._v(" "), _c("b-form-invalid-feedback", [_vm._v(_vm._s(errors[0]))])], 1);
      }
    }], null, false, 442498797)
  })], 1), _vm._v(" "), _c("b-col", {
    staticClass: "mb-2",
    attrs: {
      md: "6"
    }
  }, [_c("b-form-group", {
    attrs: {
      label: _vm.$t("Brand")
    }
  }, [_c("v-select", {
    attrs: {
      placeholder: _vm.$t("Choose_Brand"),
      reduce: function reduce(label) {
        return label.value;
      },
      options: _vm.brands.map(function (brands) {
        return {
          label: brands.name,
          value: brands.id
        };
      })
    },
    model: {
      value: _vm.product.brand_id,
      callback: function callback($$v) {
        _vm.$set(_vm.product, "brand_id", $$v);
      },
      expression: "product.brand_id"
    }
  })], 1)], 1), _vm._v(" "), _c("b-col", {
    staticClass: "mb-2",
    attrs: {
      md: "6"
    }
  }, [_c("validation-provider", {
    attrs: {
      name: "Barcode Symbology",
      rules: {
        required: true
      }
    },
    scopedSlots: _vm._u([{
      key: "default",
      fn: function fn(_ref2) {
        var valid = _ref2.valid,
          errors = _ref2.errors;
        return _c("b-form-group", {
          attrs: {
            label: _vm.$t("BarcodeSymbology")
          }
        }, [_c("v-select", {
          "class": {
            "is-invalid": !!errors.length
          },
          attrs: {
            state: errors[0] ? false : valid ? true : null,
            reduce: function reduce(label) {
              return label.value;
            },
            placeholder: _vm.$t("Choose_Symbology"),
            options: [{
              label: "Code 128",
              value: "CODE128"
            }, {
              label: "Code 39",
              value: "CODE39"
            }, {
              label: "EAN8",
              value: "EAN8"
            }, {
              label: "EAN13",
              value: "EAN13"
            }, {
              label: "UPC",
              value: "UPC"
            }]
          },
          model: {
            value: _vm.product.Type_barcode,
            callback: function callback($$v) {
              _vm.$set(_vm.product, "Type_barcode", $$v);
            },
            expression: "product.Type_barcode"
          }
        }), _vm._v(" "), _c("b-form-invalid-feedback", [_vm._v(_vm._s(errors[0]))])], 1);
      }
    }], null, false, 4092838316)
  })], 1), _vm._v(" "), _c("b-col", {
    staticClass: "mb-2",
    attrs: {
      md: "6"
    }
  }, [_c("validation-provider", {
    attrs: {
      name: "Product Cost",
      rules: {
        required: true,
        regex: /^\d*\.?\d*$/
      }
    },
    scopedSlots: _vm._u([{
      key: "default",
      fn: function fn(validationContext) {
        return [_c("b-form-group", {
          attrs: {
            label: _vm.$t("ProductCost")
          }
        }, [_c("b-form-input", {
          attrs: {
            state: _vm.getValidationState(validationContext),
            "aria-describedby": "ProductCost-feedback",
            label: "Cost",
            placeholder: _vm.$t("Enter_Product_Cost")
          },
          model: {
            value: _vm.product.cost,
            callback: function callback($$v) {
              _vm.$set(_vm.product, "cost", $$v);
            },
            expression: "product.cost"
          }
        }), _vm._v(" "), _c("b-form-invalid-feedback", {
          attrs: {
            id: "ProductCost-feedback"
          }
        }, [_vm._v(_vm._s(validationContext.errors[0]))])], 1)];
      }
    }], null, false, 1613947113)
  })], 1), _vm._v(" "), _c("b-col", {
    staticClass: "mb-2",
    attrs: {
      md: "6"
    }
  }, [_c("validation-provider", {
    attrs: {
      name: "Product Price",
      rules: {
        required: true,
        regex: /^\d*\.?\d*$/
      }
    },
    scopedSlots: _vm._u([{
      key: "default",
      fn: function fn(validationContext) {
        return [_c("b-form-group", {
          attrs: {
            label: _vm.$t("ProductPrice")
          }
        }, [_c("b-form-input", {
          attrs: {
            state: _vm.getValidationState(validationContext),
            "aria-describedby": "ProductPrice-feedback",
            label: "Price",
            placeholder: _vm.$t("Enter_Product_Price")
          },
          model: {
            value: _vm.product.price,
            callback: function callback($$v) {
              _vm.$set(_vm.product, "price", $$v);
            },
            expression: "product.price"
          }
        }), _vm._v(" "), _c("b-form-invalid-feedback", {
          attrs: {
            id: "ProductPrice-feedback"
          }
        }, [_vm._v(_vm._s(validationContext.errors[0]))])], 1)];
      }
    }], null, false, 3709170025)
  })], 1), _vm._v(" "), _c("b-col", {
    staticClass: "mb-2",
    attrs: {
      md: "6"
    }
  }, [_c("validation-provider", {
    attrs: {
      name: "Unit Product",
      rules: {
        required: true
      }
    },
    scopedSlots: _vm._u([{
      key: "default",
      fn: function fn(_ref3) {
        var valid = _ref3.valid,
          errors = _ref3.errors;
        return _c("b-form-group", {
          attrs: {
            label: _vm.$t("UnitProduct")
          }
        }, [_c("v-select", {
          staticClass: "required",
          "class": {
            "is-invalid": !!errors.length
          },
          attrs: {
            state: errors[0] ? false : valid ? true : null,
            required: "",
            placeholder: _vm.$t("Choose_Unit_Product"),
            reduce: function reduce(label) {
              return label.value;
            },
            options: _vm.units.map(function (units) {
              return {
                label: units.name,
                value: units.id
              };
            })
          },
          on: {
            input: _vm.Selected_Unit
          },
          model: {
            value: _vm.product.unit_id,
            callback: function callback($$v) {
              _vm.$set(_vm.product, "unit_id", $$v);
            },
            expression: "product.unit_id"
          }
        }), _vm._v(" "), _c("b-form-invalid-feedback", [_vm._v(_vm._s(errors[0]))])], 1);
      }
    }], null, false, 748547594)
  })], 1), _vm._v(" "), _c("b-col", {
    staticClass: "mb-2",
    attrs: {
      md: "6"
    }
  }, [_c("validation-provider", {
    attrs: {
      name: "Unit Sale",
      rules: {
        required: true
      }
    },
    scopedSlots: _vm._u([{
      key: "default",
      fn: function fn(_ref4) {
        var valid = _ref4.valid,
          errors = _ref4.errors;
        return _c("b-form-group", {
          attrs: {
            label: _vm.$t("UnitSale")
          }
        }, [_c("v-select", {
          "class": {
            "is-invalid": !!errors.length
          },
          attrs: {
            state: errors[0] ? false : valid ? true : null,
            placeholder: _vm.$t("Choose_Unit_Sale"),
            reduce: function reduce(label) {
              return label.value;
            },
            options: _vm.units_sub.map(function (units_sub) {
              return {
                label: units_sub.name,
                value: units_sub.id
              };
            })
          },
          model: {
            value: _vm.product.unit_sale_id,
            callback: function callback($$v) {
              _vm.$set(_vm.product, "unit_sale_id", $$v);
            },
            expression: "product.unit_sale_id"
          }
        }), _vm._v(" "), _c("b-form-invalid-feedback", [_vm._v(_vm._s(errors[0]))])], 1);
      }
    }], null, false, 616760917)
  })], 1), _vm._v(" "), _c("b-col", {
    staticClass: "mb-2",
    attrs: {
      md: "6"
    }
  }, [_c("validation-provider", {
    attrs: {
      name: "Unit Purchase",
      rules: {
        required: true
      }
    },
    scopedSlots: _vm._u([{
      key: "default",
      fn: function fn(_ref5) {
        var valid = _ref5.valid,
          errors = _ref5.errors;
        return _c("b-form-group", {
          attrs: {
            label: _vm.$t("UnitPurchase")
          }
        }, [_c("v-select", {
          "class": {
            "is-invalid": !!errors.length
          },
          attrs: {
            state: errors[0] ? false : valid ? true : null,
            placeholder: _vm.$t("Choose_Unit_Purchase"),
            reduce: function reduce(label) {
              return label.value;
            },
            options: _vm.units_sub.map(function (units_sub) {
              return {
                label: units_sub.name,
                value: units_sub.id
              };
            })
          },
          model: {
            value: _vm.product.unit_purchase_id,
            callback: function callback($$v) {
              _vm.$set(_vm.product, "unit_purchase_id", $$v);
            },
            expression: "product.unit_purchase_id"
          }
        }), _vm._v(" "), _c("b-form-invalid-feedback", [_vm._v(_vm._s(errors[0]))])], 1);
      }
    }], null, false, 3136313157)
  })], 1), _vm._v(" "), _c("b-col", {
    staticClass: "mb-2",
    attrs: {
      md: "6"
    }
  }, [_c("validation-provider", {
    attrs: {
      name: "Stock Alert",
      rules: {
        regex: /^\d*\.?\d*$/
      }
    },
    scopedSlots: _vm._u([{
      key: "default",
      fn: function fn(validationContext) {
        return [_c("b-form-group", {
          attrs: {
            label: _vm.$t("StockAlert")
          }
        }, [_c("b-form-input", {
          attrs: {
            state: _vm.getValidationState(validationContext),
            "aria-describedby": "StockAlert-feedback",
            label: "Stock alert",
            placeholder: _vm.$t("Enter_Stock_alert")
          },
          model: {
            value: _vm.product.stock_alert,
            callback: function callback($$v) {
              _vm.$set(_vm.product, "stock_alert", $$v);
            },
            expression: "product.stock_alert"
          }
        }), _vm._v(" "), _c("b-form-invalid-feedback", {
          attrs: {
            id: "StockAlert-feedback"
          }
        }, [_vm._v(_vm._s(validationContext.errors[0]))])], 1)];
      }
    }], null, false, 1999382198)
  })], 1), _vm._v(" "), _c("b-col", {
    staticClass: "mb-2",
    attrs: {
      md: "6"
    }
  }, [_c("validation-provider", {
    attrs: {
      name: "Order Tax",
      rules: {
        regex: /^\d*\.?\d*$/
      }
    },
    scopedSlots: _vm._u([{
      key: "default",
      fn: function fn(validationContext) {
        return [_c("b-form-group", {
          attrs: {
            label: _vm.$t("OrderTax")
          }
        }, [_c("div", {
          staticClass: "input-group"
        }, [_c("input", {
          directives: [{
            name: "model",
            rawName: "v-model",
            value: _vm.product.TaxNet,
            expression: "product.TaxNet"
          }],
          staticClass: "form-control",
          attrs: {
            state: _vm.getValidationState(validationContext),
            "aria-describedby": "OrderTax-feedback",
            type: "number"
          },
          domProps: {
            value: _vm.product.TaxNet
          },
          on: {
            input: function input($event) {
              if ($event.target.composing) return;
              _vm.$set(_vm.product, "TaxNet", $event.target.value);
            }
          }
        }), _vm._v(" "), _c("div", {
          staticClass: "input-group-append"
        }, [_c("span", {
          staticClass: "input-group-text"
        }, [_vm._v("%")])])]), _vm._v(" "), _c("b-form-invalid-feedback", {
          attrs: {
            id: "OrderTax-feedback"
          }
        }, [_vm._v(_vm._s(validationContext.errors[0]))])], 1)];
      }
    }], null, false, 2796358256)
  })], 1), _vm._v(" "), _c("b-col", {
    staticClass: "mb-2",
    attrs: {
      lg: "6",
      md: "6",
      sm: "12"
    }
  }, [_c("validation-provider", {
    attrs: {
      name: "Tax Method",
      rules: {
        required: true
      }
    },
    scopedSlots: _vm._u([{
      key: "default",
      fn: function fn(_ref6) {
        var valid = _ref6.valid,
          errors = _ref6.errors;
        return _c("b-form-group", {
          attrs: {
            label: _vm.$t("TaxMethod")
          }
        }, [_c("v-select", {
          "class": {
            "is-invalid": !!errors.length
          },
          attrs: {
            state: errors[0] ? false : valid ? true : null,
            reduce: function reduce(label) {
              return label.value;
            },
            placeholder: _vm.$t("Choose_Method"),
            options: [{
              label: "Exclusive",
              value: "1"
            }, {
              label: "Inclusive",
              value: "2"
            }]
          },
          model: {
            value: _vm.product.tax_method,
            callback: function callback($$v) {
              _vm.$set(_vm.product, "tax_method", $$v);
            },
            expression: "product.tax_method"
          }
        }), _vm._v(" "), _c("b-form-invalid-feedback", [_vm._v(_vm._s(errors[0]))])], 1);
      }
    }], null, false, 2612488639)
  })], 1), _vm._v(" "), _c("b-col", {
    staticClass: "mb-2",
    attrs: {
      md: "12"
    }
  }, [_c("b-form-group", {
    attrs: {
      label: _vm.$t("Note")
    }
  }, [_c("textarea", {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: _vm.product.note,
      expression: "product.note"
    }],
    staticClass: "form-control",
    attrs: {
      rows: "4",
      placeholder: _vm.$t("Afewwords")
    },
    domProps: {
      value: _vm.product.note
    },
    on: {
      input: function input($event) {
        if ($event.target.composing) return;
        _vm.$set(_vm.product, "note", $event.target.value);
      }
    }
  })])], 1)], 1)], 1)], 1)], 1), _vm._v(" "), _c("b-col", {
    attrs: {
      md: "4"
    }
  }, [_c("b-card", [_c("div", {
    staticClass: "card-header"
  }, [_c("h5", [_vm._v(_vm._s(_vm.$t("MultipleImage")))])]), _vm._v(" "), _c("div", {
    staticClass: "card-body"
  }, [_c("b-row", {
    staticClass: "form-group"
  }, [_c("b-col", {
    attrs: {
      md: "12 mb-5"
    }
  }, [_c("div", {
    staticClass: "d-flex justify-content-center",
    attrs: {
      id: "my-strictly-unique-vue-upload-multiple-image"
    }
  }, [_c("vue-upload-multiple-image", {
    attrs: {
      dragText: "Drag & Drop Multiple images For product",
      dropText: "Drag & Drop image",
      browseText: "(or) Select",
      accept: "image/gif,image/jpeg,image/png,image/bmp,image/jpg",
      primaryText: "success",
      markIsPrimaryText: "success",
      popupText: "have been successfully uploaded",
      "data-images": _vm.images,
      idUpload: "myIdUpload",
      showEdit: false
    },
    on: {
      "upload-success": _vm.uploadImageSuccess,
      "before-remove": _vm.beforeRemove
    }
  })], 1)]), _vm._v(" "), _c("b-col", {
    attrs: {
      md: "12 mb-2"
    }
  }, [_c("div", {
    staticClass: "form-check"
  }, [_c("label", {
    staticClass: "checkbox checkbox-outline-primary"
  }, [_c("input", {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: _vm.product.is_variant,
      expression: "product.is_variant"
    }],
    attrs: {
      type: "checkbox"
    },
    domProps: {
      checked: Array.isArray(_vm.product.is_variant) ? _vm._i(_vm.product.is_variant, null) > -1 : _vm.product.is_variant
    },
    on: {
      change: function change($event) {
        var $$a = _vm.product.is_variant,
          $$el = $event.target,
          $$c = $$el.checked ? true : false;
        if (Array.isArray($$a)) {
          var $$v = null,
            $$i = _vm._i($$a, $$v);
          if ($$el.checked) {
            $$i < 0 && _vm.$set(_vm.product, "is_variant", $$a.concat([$$v]));
          } else {
            $$i > -1 && _vm.$set(_vm.product, "is_variant", $$a.slice(0, $$i).concat($$a.slice($$i + 1)));
          }
        } else {
          _vm.$set(_vm.product, "is_variant", $$c);
        }
      }
    }
  }), _vm._v(" "), _c("span", [_vm._v(_vm._s(_vm.$t("ProductHasMultiVariants")))]), _vm._v(" "), _c("span", {
    staticClass: "checkmark"
  })])])]), _vm._v(" "), _c("b-col", {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: _vm.product.is_variant,
      expression: "product.is_variant"
    }],
    attrs: {
      md: "12 mb-5"
    }
  }, [_c("vue-tags-input", {
    staticClass: "tag-custom text-15",
    attrs: {
      placeholder: "+ add",
      tags: _vm.variants
    },
    on: {
      "adding-duplicate": function addingDuplicate($event) {
        return _vm.showNotifDuplicate();
      },
      "tags-changed": function tagsChanged(newTags) {
        return _vm.variants = newTags;
      }
    },
    model: {
      value: _vm.tag,
      callback: function callback($$v) {
        _vm.tag = $$v;
      },
      expression: "tag"
    }
  })], 1)], 1)], 1)])], 1), _vm._v(" "), _c("b-col", {
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
  }, [_vm._v(_vm._s(_vm.$t("submit")))]), _vm._v(" "), _vm.SubmitProcessing ? _vm._m(0) : _vm._e()], 1)], 1)], 1)], 1) : _vm._e()], 1);
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

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/src/views/app/pages/people/patientsData.vue?vue&type=template&id=d1a0a6ea&":
/*!**********************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!./node_modules/vue-loader/lib??vue-loader-options!./resources/src/views/app/pages/people/patientsData.vue?vue&type=template&id=d1a0a6ea& ***!
  \**********************************************************************************************************************************************************************************************************************************************************/
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
    staticClass: "main-content small"
  }, [_vm.isLoading ? _c("div", {
    staticClass: "loading_page spinner spinner-primary mr-3"
  }) : _c("div", {
    staticClass: "row mb-4"
  }, [_c("b-col", {
    attrs: {
      sm: "12",
      md: "6",
      lg: "6"
    }
  }, [_c("b-card", {
    staticClass: "card-height mb-2"
  }, [_c("b-row", [_c("b-col", {
    staticClass: "text-center border-right border-secondary",
    attrs: {
      md: "4",
      lg: "4",
      sm: "12"
    }
  }, [_c("b-avatar", {
    attrs: {
      src: "images/avatar/" + _vm.user.avatar,
      size: "6rem"
    }
  }), _vm._v(" "), _c("h5", {
    staticClass: "mt-1"
  }, [_vm._v(" " + _vm._s(_vm.user.firstname) + " " + _vm._s(_vm.user.lastname))]), _vm._v(" "), _c("h6", {
    staticClass: "mt-1"
  }, [_vm._v(" " + _vm._s(_vm.user.email))]), _vm._v(" "), _c("h6", {
    staticClass: "mt-1"
  }, [_vm._v(" Appointments ")]), _vm._v(" "), _c("b-container", [_c("b-row", {
    staticClass: "text-center justify-content-center"
  }, [_c("b-col", {
    attrs: {
      sm: "6",
      md: "6",
      lg: "6"
    }
  }, [_c("h3", [_vm._v(_vm._s(_vm.appointments_past.length))]), _vm._v(" "), _c("p", [_vm._v("Past")])]), _vm._v(" "), _c("b-col", {
    attrs: {
      sm: "6",
      md: "6",
      lg: "6"
    }
  }, [_c("h3", [_vm._v(_vm._s(_vm.appointments_pending.length))]), _vm._v(" "), _c("p", [_vm._v("Upcoming")])]), _vm._v(" "), _c("button", {
    staticClass: "btn btn-primary mt-1",
    on: {
      click: function click($event) {
        return _vm.New_Recipe();
      }
    }
  }, [_vm._v("\n                  Generar recipe\n                ")])], 1)], 1)], 1), _vm._v(" "), _c("b-col", {
    attrs: {
      md: "8",
      lg: "8",
      sm: "12"
    }
  }, [_c("b-container", {
    staticClass: "mt-5 infouser"
  }, [_c("b-row", [_c("b-col", {
    attrs: {
      md: "6",
      lg: "6",
      sm: "12"
    }
  }, [_c("label", [_vm._v("Gender")]), _vm._v(" "), _c("p", {
    staticClass: "border-bottom border-secondary"
  })]), _vm._v(" "), _c("b-col", {
    attrs: {
      md: "6",
      lg: "6",
      sm: "12"
    }
  }, [_c("label", [_vm._v("Birthday")]), _vm._v(" "), _c("p", {
    staticClass: "border-bottom border-secondary"
  })]), _vm._v(" "), _c("b-col", {
    attrs: {
      md: "6",
      lg: "6",
      sm: "12"
    }
  }, [_c("label", [_vm._v("Phone Number")]), _vm._v(" "), _c("p", {
    staticClass: "border-bottom border-secondary"
  }, [_vm._v(_vm._s(_vm.user.phone))])]), _vm._v(" "), _c("b-col", {
    attrs: {
      md: "6",
      lg: "6",
      sm: "12"
    }
  }, [_c("label", [_vm._v("Address")]), _vm._v(" "), _c("p", {
    staticClass: "border-bottom border-secondary"
  })]), _vm._v(" "), _c("b-col", {
    attrs: {
      md: "6",
      lg: "6",
      sm: "12"
    }
  }, [_c("label", [_vm._v("City")]), _vm._v(" "), _c("p", {
    staticClass: "border-bottom border-secondary"
  })]), _vm._v(" "), _c("b-col", {
    attrs: {
      md: "6",
      lg: "6",
      sm: "12"
    }
  }, [_c("label", [_vm._v("ZIP Code")]), _vm._v(" "), _c("p", {
    staticClass: "border-bottom border-secondary"
  })]), _vm._v(" "), _c("b-col", {
    attrs: {
      md: "6",
      lg: "6",
      sm: "12"
    }
  }, [_c("label", [_vm._v("Registration Date")]), _vm._v(" "), _c("p", {
    staticClass: "border-bottom border-secondary"
  }, [_vm._v(_vm._s(_vm.user.registration_date))])]), _vm._v(" "), _c("b-col", {
    attrs: {
      md: "6",
      lg: "6",
      sm: "12"
    }
  }, [_c("label", [_vm._v("Member Status")]), _vm._v(" "), _c("p", {
    staticClass: "border-bottom border-secondary"
  }, [_vm._v(_vm._s(_vm.user.name_role))])])], 1)], 1)], 1)], 1)], 1)], 1), _vm._v(" "), _c("b-col", {
    attrs: {
      sm: "12",
      md: "3",
      lg: "3"
    }
  }, [_c("div", {
    staticClass: "card user-profile card-height mb-2",
    staticStyle: {
      height: "100%"
    }
  }, [_c("b-form", {
    attrs: {
      enctype: "multipart/form-data"
    },
    on: {
      submit: function submit($event) {
        $event.preventDefault();
        return _vm.updatedNote.apply(null, arguments);
      }
    }
  }, [_c("div", {
    staticClass: "card-body"
  }, [_c("h6", {
    staticClass: "font-weight-bold"
  }, [_vm._v("Notas")]), _vm._v(" "), _c("textarea", {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: _vm.notes,
      expression: "notes"
    }],
    ref: "myTextarea",
    staticClass: "form-control",
    attrs: {
      rows: "8",
      placeholder: "Ingresa tu texto aquí..."
    },
    domProps: {
      value: _vm.notes
    },
    on: {
      input: function input($event) {
        if ($event.target.composing) return;
        _vm.notes = $event.target.value;
      }
    }
  }), _vm._v(" "), _c("button", {
    staticClass: "btn btn-primary float-right mt-2 btn-sm"
  }, [_vm._v("\n              Save note\n            ")])])])], 1)]), _vm._v(" "), _c("b-col", {
    attrs: {
      md: "3",
      sm: "12",
      xs: "12",
      lg: "3"
    }
  }, [_c("div", {
    staticClass: "card user-profile card-height",
    staticStyle: {
      "max-height": "340px",
      "overflow-y": "auto"
    }
  }, [_c("div", {
    staticClass: "card-body"
  }, [_c("input", {
    ref: "fileInput",
    staticClass: "d-none",
    attrs: {
      type: "file"
    },
    on: {
      change: _vm.onFileSelected
    }
  }), _vm._v(" "), _c("div", {
    staticClass: "col-md-12 col-lg-12 col-sm-12 mb-2 d-flex",
    staticStyle: {
      "justify-content": "space-between"
    }
  }, [_c("h6", {
    staticClass: "font-weight-bold"
  }, [_vm._v("Files / Documents")]), _vm._v(" "), _c("a", {
    staticClass: "float-right text-primary",
    on: {
      click: function click($event) {
        $event.preventDefault();
        return _vm.openFileInput.apply(null, arguments);
      }
    }
  }, [_c("i", {
    staticClass: "nav-icon i-Files"
  }), _vm._v(" Add Files\n            ")])]), _vm._v(" "), _vm._l(_vm.user.files, function (file, index) {
    return _c("div", {
      key: index,
      staticClass: "card card-hover"
    }, [_c("div", {
      staticClass: "container p-2",
      on: {
        click: function click($event) {
          $event.preventDefault();
          return _vm.loadLink(file);
        }
      }
    }, [_c("h6", {
      staticClass: "mt-1"
    }, [_c("i", {
      staticClass: "center nav-icon i-Files"
    }), _vm._v(_vm._s(file.name) + " ")])])]);
  })], 2)])])], 1), _vm._v(" "), !_vm.isLoading ? _c("b-row", [_c("b-col", {
    staticClass: "card-height",
    attrs: {
      md: "9",
      sm: "12",
      xs: "12",
      lg: "9"
    }
  }, [_c("b-tabs", [_c("b-tab", {
    attrs: {
      title: "Upcoming appointments",
      active: ""
    }
  }, _vm._l(_vm.appointments_pending, function (appointment, index) {
    var _appointment$appointm, _appointment$appointm2, _appointment$appointm3, _appointment$appointm4;
    return _c("b-card", {
      key: index,
      staticClass: "m-2"
    }, [_c("b-row", [_c("b-col", {
      attrs: {
        md: "4"
      }
    }, [_c("div", {
      staticClass: "circle"
    }), _vm._v(" "), _c("div", {
      staticClass: "card-part"
    }, [_c("h5", [_vm._v(_vm._s(_vm.formatDate(appointment === null || appointment === void 0 ? void 0 : appointment.date)))]), _vm._v(" "), _c("p")])]), _vm._v(" "), _c("b-col", {
      attrs: {
        md: "6"
      }
    }, [_c("div", {
      staticClass: "card-part"
    }, [_c("h4", [_vm._v("Doctor")]), _vm._v(" "), _c("p", {
      staticClass: "font-weight-bold"
    }, [_vm._v(_vm._s(appointment === null || appointment === void 0 ? void 0 : (_appointment$appointm = appointment.appointment) === null || _appointment$appointm === void 0 ? void 0 : (_appointment$appointm2 = _appointment$appointm.doctor) === null || _appointment$appointm2 === void 0 ? void 0 : _appointment$appointm2.firstname) + " " + _vm._s(appointment === null || appointment === void 0 ? void 0 : (_appointment$appointm3 = appointment.appointment) === null || _appointment$appointm3 === void 0 ? void 0 : (_appointment$appointm4 = _appointment$appointm3.doctor) === null || _appointment$appointm4 === void 0 ? void 0 : _appointment$appointm4.lastname))])])]), _vm._v(" "), _c("b-col", {
      attrs: {
        md: "2"
      }
    }, [_c("div", {
      staticClass: "card-part"
    }, [_c("button", {
      staticClass: "btn btn-primary",
      on: {
        click: function click($event) {
          return _vm.focusTextarea(appointment);
        }
      }
    }, [_c("i", {
      staticClass: "nav-icon i-Notepad"
    }), _vm._v(" Notes\n                  ")])])])], 1)], 1);
  }), 1), _vm._v(" "), _c("b-tab", {
    attrs: {
      title: "Past appointments"
    }
  }, _vm._l(_vm.appointments_past, function (appointment, index) {
    var _appointment$appointm5, _appointment$appointm6, _appointment$appointm7, _appointment$appointm8;
    return _c("b-card", {
      key: index,
      staticClass: "m-2"
    }, [_c("b-row", [_c("b-col", {
      attrs: {
        md: "2"
      }
    }, [_c("div", {
      staticClass: "circle"
    }), _vm._v(" "), _c("div", {
      staticClass: "card-part"
    }, [_c("h5", [_vm._v(_vm._s(_vm.formatDate(appointment === null || appointment === void 0 ? void 0 : appointment.date)))]), _vm._v(" "), _c("p")])]), _vm._v(" "), _c("b-col", {
      attrs: {
        md: "3"
      }
    }, [_c("div", {
      staticClass: "card-part"
    }, [_c("h4", [_vm._v("Doctor")]), _vm._v(" "), _c("p", {
      staticClass: "font-weight-bold"
    }, [_vm._v(_vm._s(appointment === null || appointment === void 0 ? void 0 : (_appointment$appointm5 = appointment.appointment) === null || _appointment$appointm5 === void 0 ? void 0 : (_appointment$appointm6 = _appointment$appointm5.doctor) === null || _appointment$appointm6 === void 0 ? void 0 : _appointment$appointm6.firstname) + " " + _vm._s(appointment === null || appointment === void 0 ? void 0 : (_appointment$appointm7 = appointment.appointment) === null || _appointment$appointm7 === void 0 ? void 0 : (_appointment$appointm8 = _appointment$appointm7.doctor) === null || _appointment$appointm8 === void 0 ? void 0 : _appointment$appointm8.lastname))])])]), _vm._v(" "), _c("b-col", {
      attrs: {
        md: "2"
      }
    }, [_c("div", {
      staticClass: "card-part"
    }, [_c("h5", {
      staticClass: "text-primary text-center",
      on: {
        click: function click($event) {
          return _vm.focusTextarea(appointment);
        }
      }
    }, [_c("i", {
      staticClass: "nav-icon i-Notepad"
    }), _vm._v(" Notes")])])])], 1)], 1);
  }), 1)], 1)], 1), _vm._v(" "), _c("b-col", {
    attrs: {
      md: "3",
      sm: "12",
      xs: "12",
      lg: "3"
    }
  }, [_c("div", {
    staticClass: "card card-height"
  }, [_c("div", {
    staticClass: "card-body"
  }, [_c("h6", {
    staticClass: "font-weight-bold mb-2"
  }, [_vm._v("Payments")]), _vm._v(" "), _c("b-table", {
    attrs: {
      striped: _vm.striped,
      small: _vm.small,
      items: _vm.items,
      fields: _vm.fields
    }
  })], 1)])])], 1) : _vm._e(), _vm._v(" "), _c("validation-observer", {
    ref: "Create_Recipe"
  }, [_c("b-modal", {
    attrs: {
      "hide-footer": "",
      size: "lg",
      id: "New_Recipe",
      title: _vm.editmode ? _vm.$t("Edit") : _vm.$t("Add")
    }
  }, [_c("b-form", {
    attrs: {
      enctype: "multipart/form-data"
    },
    on: {
      submit: function submit($event) {
        $event.preventDefault();
        return _vm.Submit_Recipe.apply(null, arguments);
      }
    }
  }, [_c("b-row", [_c("b-col", {
    attrs: {
      md: "6",
      sm: "12"
    }
  }, [_c("validation-provider", {
    attrs: {
      name: "Name"
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
            "aria-describedby": "Name-feedback",
            label: "Name",
            readonly: "",
            value: _vm.Fullname
          }
        }), _vm._v(" "), _c("b-form-invalid-feedback", {
          attrs: {
            id: "Name-feedback"
          }
        }, [_vm._v(_vm._s(validationContext.errors[0]))])], 1)];
      }
    }])
  })], 1), _vm._v(" "), _c("b-col", {
    attrs: {
      lg: "6",
      md: "6",
      sm: "6"
    }
  }, [_c("validation-provider", {
    attrs: {
      name: "start_date"
    },
    scopedSlots: _vm._u([{
      key: "default",
      fn: function fn(validationContext) {
        return [_c("b-form-group", {
          attrs: {
            label: _vm.$t("StartDate")
          }
        }, [_c("b-form-input", {
          attrs: {
            state: _vm.getValidationState(validationContext),
            "aria-describedby": "date-feedback",
            type: "date",
            readonly: ""
          },
          model: {
            value: _vm.user.date,
            callback: function callback($$v) {
              _vm.$set(_vm.user, "date", $$v);
            },
            expression: "user.date"
          }
        }), _vm._v(" "), _c("b-form-invalid-feedback", {
          attrs: {
            id: "date-feedback"
          }
        }, [_vm._v(_vm._s(validationContext.errors[0]))])], 1)];
      }
    }])
  })], 1), _vm._v(" "), _c("b-col", {
    attrs: {
      lg: "4",
      md: "4",
      sm: "12"
    }
  }, [_c("validation-provider", {
    attrs: {
      name: "datebirth"
    },
    scopedSlots: _vm._u([{
      key: "default",
      fn: function fn(validationContext) {
        return [_c("b-form-group", {
          attrs: {
            label: _vm.$t("datebirth"),
            id: "DateBirth-input"
          }
        }, [_c("b-form-input", {
          attrs: {
            label: "datebirth",
            state: _vm.getValidationState(validationContext),
            "aria-describedby": "DateBirth-feedback"
          },
          model: {
            value: _vm.user.birth,
            callback: function callback($$v) {
              _vm.$set(_vm.user, "birth", $$v);
            },
            expression: "user.birth"
          }
        })], 1)];
      }
    }])
  })], 1), _vm._v(" "), _c("b-col", {
    attrs: {
      lg: "4",
      md: "4",
      sm: "12"
    }
  }, [_c("validation-provider", {
    attrs: {
      name: "Age"
    },
    scopedSlots: _vm._u([{
      key: "default",
      fn: function fn(validationContext) {
        return [_c("b-form-group", {
          attrs: {
            label: _vm.$t("Age"),
            id: "Age-input"
          }
        }, [_c("b-form-input", {
          attrs: {
            label: "Age",
            state: _vm.getValidationState(validationContext),
            "aria-describedby": "Age-feedback"
          },
          model: {
            value: _vm.user.age,
            callback: function callback($$v) {
              _vm.$set(_vm.user, "age", $$v);
            },
            expression: "user.age"
          }
        })], 1)];
      }
    }])
  })], 1), _vm._v(" "), _c("b-col", {
    attrs: {
      lg: "4",
      md: "4",
      sm: "12"
    }
  }, [_c("validation-provider", {
    attrs: {
      name: "Gender"
    },
    scopedSlots: _vm._u([{
      key: "default",
      fn: function fn(validationContext) {
        return [_c("b-form-group", {
          attrs: {
            label: _vm.$t("Gender"),
            id: "Gender-input"
          }
        }, [_c("b-form-input", {
          attrs: {
            label: "Gender",
            state: _vm.getValidationState(validationContext),
            "aria-describedby": "Gender-feedback"
          },
          model: {
            value: _vm.user.gender,
            callback: function callback($$v) {
              _vm.$set(_vm.user, "gender", $$v);
            },
            expression: "user.gender"
          }
        })], 1)];
      }
    }])
  })], 1), _vm._v(" "), _c("b-col", {
    attrs: {
      lg: "12",
      md: "12",
      sm: "12"
    }
  }, [_c("validation-provider", {
    attrs: {
      name: "Diagnosic"
    },
    scopedSlots: _vm._u([{
      key: "default",
      fn: function fn(validationContext) {
        return [_c("b-form-group", {
          attrs: {
            label: _vm.$t("Diagnosic"),
            id: "Diagnostic-input"
          }
        }, [_c("b-form-input", {
          attrs: {
            label: "Diagnosic",
            state: _vm.getValidationState(validationContext),
            "aria-describedby": "Diagnostic-feedback"
          },
          model: {
            value: _vm.user.diagnosic,
            callback: function callback($$v) {
              _vm.$set(_vm.user, "diagnosic", $$v);
            },
            expression: "user.diagnosic"
          }
        })], 1)];
      }
    }])
  })], 1), _vm._v(" "), _c("b-col", {
    attrs: {
      lg: "12",
      md: "12",
      sm: "12"
    }
  }, [_c("validation-provider", {
    attrs: {
      name: "Recipe"
    },
    scopedSlots: _vm._u([{
      key: "default",
      fn: function fn(validationContext) {
        return [_c("b-form-group", {
          attrs: {
            label: _vm.$t("Recipe"),
            id: "Recipe-input"
          }
        }, [_c("b-form-textarea", {
          attrs: {
            label: "Recipe",
            rows: "5",
            state: _vm.getValidationState(validationContext),
            "aria-describedby": "Recipe-feedback"
          },
          model: {
            value: _vm.user.recipe,
            callback: function callback($$v) {
              _vm.$set(_vm.user, "recipe", $$v);
            },
            expression: "user.recipe"
          }
        })], 1)];
      }
    }])
  })], 1), _vm._v(" "), _c("b-col", {
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

/***/ "./resources/src/views/app/pages/dates/Edit_date.vue":
/*!***********************************************************!*\
  !*** ./resources/src/views/app/pages/dates/Edit_date.vue ***!
  \***********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Edit_date_vue_vue_type_template_id_768e3e68___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Edit_date.vue?vue&type=template&id=768e3e68& */ "./resources/src/views/app/pages/dates/Edit_date.vue?vue&type=template&id=768e3e68&");
/* harmony import */ var _Edit_date_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Edit_date.vue?vue&type=script&lang=js& */ "./resources/src/views/app/pages/dates/Edit_date.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Edit_date_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Edit_date_vue_vue_type_template_id_768e3e68___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Edit_date_vue_vue_type_template_id_768e3e68___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/src/views/app/pages/dates/Edit_date.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/src/views/app/pages/dates/Edit_date.vue?vue&type=script&lang=js&":
/*!************************************************************************************!*\
  !*** ./resources/src/views/app/pages/dates/Edit_date.vue?vue&type=script&lang=js& ***!
  \************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Edit_date_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./Edit_date.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/src/views/app/pages/dates/Edit_date.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Edit_date_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/src/views/app/pages/dates/Edit_date.vue?vue&type=template&id=768e3e68&":
/*!******************************************************************************************!*\
  !*** ./resources/src/views/app/pages/dates/Edit_date.vue?vue&type=template&id=768e3e68& ***!
  \******************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_vue_loader_lib_index_js_vue_loader_options_Edit_date_vue_vue_type_template_id_768e3e68___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./Edit_date.vue?vue&type=template&id=768e3e68& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/src/views/app/pages/dates/Edit_date.vue?vue&type=template&id=768e3e68&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_vue_loader_lib_index_js_vue_loader_options_Edit_date_vue_vue_type_template_id_768e3e68___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_vue_loader_lib_index_js_vue_loader_options_Edit_date_vue_vue_type_template_id_768e3e68___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/src/views/app/pages/people/patientsData.vue":
/*!***************************************************************!*\
  !*** ./resources/src/views/app/pages/people/patientsData.vue ***!
  \***************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _patientsData_vue_vue_type_template_id_d1a0a6ea___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./patientsData.vue?vue&type=template&id=d1a0a6ea& */ "./resources/src/views/app/pages/people/patientsData.vue?vue&type=template&id=d1a0a6ea&");
/* harmony import */ var _patientsData_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./patientsData.vue?vue&type=script&lang=js& */ "./resources/src/views/app/pages/people/patientsData.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _patientsData_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _patientsData_vue_vue_type_template_id_d1a0a6ea___WEBPACK_IMPORTED_MODULE_0__["render"],
  _patientsData_vue_vue_type_template_id_d1a0a6ea___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/src/views/app/pages/people/patientsData.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/src/views/app/pages/people/patientsData.vue?vue&type=script&lang=js&":
/*!****************************************************************************************!*\
  !*** ./resources/src/views/app/pages/people/patientsData.vue?vue&type=script&lang=js& ***!
  \****************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_patientsData_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./patientsData.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/src/views/app/pages/people/patientsData.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_patientsData_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/src/views/app/pages/people/patientsData.vue?vue&type=template&id=d1a0a6ea&":
/*!**********************************************************************************************!*\
  !*** ./resources/src/views/app/pages/people/patientsData.vue?vue&type=template&id=d1a0a6ea& ***!
  \**********************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_vue_loader_lib_index_js_vue_loader_options_patientsData_vue_vue_type_template_id_d1a0a6ea___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./patientsData.vue?vue&type=template&id=d1a0a6ea& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/src/views/app/pages/people/patientsData.vue?vue&type=template&id=d1a0a6ea&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_vue_loader_lib_index_js_vue_loader_options_patientsData_vue_vue_type_template_id_d1a0a6ea___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_vue_loader_lib_index_js_vue_loader_options_patientsData_vue_vue_type_template_id_d1a0a6ea___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);