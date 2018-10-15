// This code is not meant to be human readable.

var scan,ui,mapping,param ;var paint, msg_int, onclick, ondrag, onidle, onidleout, onresize;/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

// https://tc39.github.io/ecma262/#sec-array.prototype.find
if (!Array.prototype.find) {
  Object.defineProperty(Array.prototype, 'find', {
    value: function value(predicate) {
      // 1. Let O be ? ToObject(this value).
      if (this == null) {
        throw new TypeError('"this" is null or not defined');
      }

      var o = Object(this); // 2. Let len be ? ToLength(? Get(O, "length")).

      var len = o.length >>> 0; // 3. If IsCallable(predicate) is false, throw a TypeError exception.

      if (typeof predicate !== 'function') {
        throw new TypeError('predicate must be a function');
      } // 4. If thisArg was supplied, let T be thisArg; else let T be undefined.


      var thisArg = arguments[1]; // 5. Let k be 0.

      var k = 0; // 6. Repeat, while k < len

      while (k < len) {
        // a. Let Pk be ! ToString(k).
        // b. Let kValue be ? Get(O, Pk).
        // c. Let testResult be ToBoolean(? Call(predicate, T, « kValue, k, O »)).
        // d. If testResult is true, return kValue.
        var kValue = o[k];

        if (predicate.call(thisArg, kValue, k, o)) {
          return kValue;
        } // e. Increase k by 1.


        k++;
      } // 7. Return undefined.


      return undefined;
    },
    configurable: true,
    writable: true
  });
}

if (!Array.prototype.fill) {
  Object.defineProperty(Array.prototype, 'fill', {
    value: function value(_value) {
      // Steps 1-2.
      if (this == null) {
        throw new TypeError('this is null or not defined');
      }

      var O = Object(this); // Steps 3-5.

      var len = O.length >>> 0; // Steps 6-7.

      var start = arguments[1];
      var relativeStart = start >> 0; // Step 8.

      var k = relativeStart < 0 ? Math.max(len + relativeStart, 0) : Math.min(relativeStart, len); // Steps 9-10.

      var end = arguments[2];
      var relativeEnd = end === undefined ? len : end >> 0; // Step 11.

      var final = relativeEnd < 0 ? Math.max(len + relativeEnd, 0) : Math.min(relativeEnd, len); // Step 12.

      while (k < final) {
        O[k] = _value;
        k++;
      } // Step 13.


      return O;
    }
  });
} // https://tc39.github.io/ecma262/#sec-array.prototype.findIndex


if (!Array.prototype.findIndex) {
  post('los');
  Object.defineProperty(Array.prototype, 'findIndex', {
    value: function value(predicate) {
      // 1. Let O be ? ToObject(this value).
      if (this == null) {
        throw new TypeError('"this" is null or not defined');
      }

      var o = Object(this); // 2. Let len be ? ToLength(? Get(O, "length")).

      var len = o.length >>> 0; // 3. If IsCallable(predicate) is false, throw a TypeError exception.

      if (typeof predicate !== 'function') {
        throw new TypeError('predicate must be a function');
      } // 4. If thisArg was supplied, let T be thisArg; else let T be undefined.


      var thisArg = arguments[1]; // 5. Let k be 0.

      var k = 0; // 6. Repeat, while k < len

      while (k < len) {
        // a. Let Pk be ! ToString(k).
        // b. Let kValue be ? Get(O, Pk).
        // c. Let testResult be ToBoolean(? Call(predicate, T, « kValue, k, O »)).
        // d. If testResult is true, return k.
        var kValue = o[k];

        if (predicate.call(thisArg, kValue, k, o)) {
          return k;
        } // e. Increase k by 1.


        k++;
      } // 7. Return -1.


      return -1;
    },
    configurable: true,
    writable: true
  });
}

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./src/matrix.js
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var isUndefined = function isUndefined(val) {
  return val === undefined;
};

var Matrix =
/*#__PURE__*/
function () {
  function Matrix() {
    _classCallCheck(this, Matrix);

    this.matrix = new Array();
  }

  _createClass(Matrix, [{
    key: "getColumn",
    value: function getColumn(index) {
      if (!isUndefined(index)) {
        return this.matrix[index];
      } else {
        throw new Error('The column index has to be specified \n');
      }
    }
  }, {
    key: "getRow",
    value: function getRow(index) {
      if (!isUndefined(index)) {
        return this.matrix.map(function (row) {
          return row[index];
        });
      } else {
        throw new Error('The row index has to be specified \n');
      }
    }
  }, {
    key: "setColumn",
    value: function setColumn(index, array) {
      if (isUndefined(index)) {
        throw new Error('The column index has to be specified \n');
      } else if (isUndefined(array)) {
        throw new Error('A new column has to be specified \n');
      } else if (array.length != this.size[1] && this.size[1] != 0) {
        throw new Error("You are trying to add a column of size ".concat(array.length, " to a ").concat(this.size, " matrix. \n"));
      } else {
        this.matrix[index] = array;
      }

      return this;
    }
  }, {
    key: "setRow",
    value: function setRow(index, array) {
      if (isUndefined(index)) {
        throw new Error('The row index has to be specified \n');
      } else if (isUndefined(array)) {
        throw new Error('A new row has to be specified \n');
      } else if (array.length != this.size[0] && this.size[0] != 0) {
        throw new Error("You are trying to add a row of size ".concat(array.length, " to a ").concat(this.size, " matrix. \n"));
      } else {
        this.matrix.forEach(function (column, i) {
          column[index] = array[i];
        });
      }

      return this;
    }
  }, {
    key: "insertColumn",
    value: function insertColumn(index, array) {
      this.matrix.splice(index, 0, new Array(this.size[0]));
      this.matrix[index].fill(0);
      if (array) this.setColumn(index, array);
      return this;
    }
  }, {
    key: "insertRow",
    value: function insertRow(index, array) {
      if (this.matrix != null) {
        this.matrix.forEach(function (column) {
          column.splice(index, 0, 0);
        });
        if (array) this.setRow(index, array);
        return this;
      }
    }
  }, {
    key: "deleteColumn",
    value: function deleteColumn(index) {
      this.matrix.splice(index, 1);
      return this;
    }
  }, {
    key: "deleteRow",
    value: function deleteRow(index) {
      this.matrix.forEach(function (column) {
        column.splice(index, 1);
      });
      return this;
    }
  }, {
    key: "size",
    get: function get() {
      return [!isUndefined(this.matrix[0]) ? this.matrix[0].length : 0, this.matrix.length];
    }
  }]);

  return Matrix;
}();


// CONCATENATED MODULE: ./src/short-index.js
function short_index_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function short_index_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function short_index_createClass(Constructor, protoProps, staticProps) { if (protoProps) short_index_defineProperties(Constructor.prototype, protoProps); if (staticProps) short_index_defineProperties(Constructor, staticProps); return Constructor; }

var shortIndex =
/*#__PURE__*/
function () {
  function shortIndex() {
    short_index_classCallCheck(this, shortIndex);

    this.inArray = new Array();
    this.length = this.inArray.length;
  }

  short_index_createClass(shortIndex, [{
    key: "add",
    value: function add(index) {
      this.inArray.push(index);
      this.inArray.sort(function (a, b) {
        return a - b;
      });
      return this.getShort(index);
    }
  }, {
    key: "delete",
    value: function _delete(index) {
      var short = this.getShort(index);
      this.inArray.splice(short, 1);
      return short;
    }
  }, {
    key: "getShort",
    value: function getShort(index) {
      return this.inArray.indexOf(index);
    }
  }, {
    key: "getLong",
    value: function getLong(index) {
      return this.inArray[index];
    }
  }]);

  return shortIndex;
}();


// EXTERNAL MODULE: ./src/array-methods-polyfill.js
var array_methods_polyfill = __webpack_require__(0);

// CONCATENATED MODULE: ./src/mapnet.js
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }




/* GLOBAL VARIABLES*/

var settings = {
  slider: {
    sliderWidth: 20,
    textWidth: 13,
    color: [0.1, 0.5, 0.5, 1]
  },
  receive_distance: 30,
  hovColor: [0.346048, 0.962593, 0.976871, 0.4091],
  receiveName: 'mapnetcommunication'
};
var state = {
  width: box.rect[2] - box.rect[0],
  height: box.rect[3] - box.rect[1],
  mapping_objects: [],
  currentcolumn: [],
  isover: -1,
  //clicked settings.slider index
  mapmode: false,
  //mapmode on/off
  lastCC: -1,
  //last recieved controlles message index
  ginterface: true,
  shortParam: new shortIndex(),
  shortCC: new shortIndex(),
  mappableObj: new Array(),
  // all mappable objects in the patch
  paramObjList: new Array(),
  //mapped parameter objects
  weightingsMatrix: new Matrix(),
  valuesMatrix: new Matrix(),
  namelist: new Array(),
  changeCC: new Boolean(),
  prevCC: -1
  /* INIT*/

};
mgraphics.init();
mgraphics.relative_coords = 0;
mgraphics.autofill = 0; //init settings.slider

settings.slider.width = settings.slider.sliderWidth + settings.slider.textWidth; //get mappable objects

scan = function scan() {
  var _this = this;

  //clear mappableObj list
  state.mappableObj = new Array();

  var objCondition = function objCondition(obj) {
    return obj.varname != '' && obj.understands('rawfloat') && obj.patcher.box != _this.patcher.box;
  };

  this.patcher.applydeep(function (obj) {
    if (objCondition(obj)) state.mappableObj.push(obj);
  });
}; //controller in message (CC, Value)


msg_int = function msg_int(cc, value) {
  state.lastCC = cc; //detect cc change

  state.changeCC = cc != state.prevCC;
  state.prevCC = cc;
  var sCC;

  if (state.changeCC) {
    sCC = state.shortCC.getShort(cc);
    if (sCC > -1) state.currentcolumn = state.weightingsMatrix.getColumn(sCC);

    if (state.ginterface && sCC > -1) {
      mgraphics.redraw();
    } //if mapping is on and a new CC comes in, check if it is an new or en existing


    if (state.mapmode) {
      //if new
      if (sCC < 0) {
        var newsCC = state.shortCC.add(cc);
        state.weightingsMatrix.insertColumn(newsCC);
        state.valuesMatrix.insertColumn(newsCC);
        state.currentcolumn = state.weightingsMatrix.getColumn(newsCC);
        mgraphics.redraw();
      }
    }
  } //play mode


  if (!state.mapmode && sCC > -1) {
    state.prevCC = -1; //make state.prevCC = -1 (none) to make sure state.changeCC is going to be 1 on mapmode

    var scalecolumn = new Array();

    if (state.weightingsMatrix.matrix[sCC] != null) {
      //scale weights of one CC
      state.currentcolumn.forEach(function (column) {
        scalecolumn.push(column * value);
      }); //set it on the corresponding position on the valuesMatrix

      state.valuesMatrix.setColumn(sCC, scalecolumn);
      state.currentcolumn.forEach(function (column, i) {
        if (column != 0.) {
          var p = 0;
          var w = 0;
          state.shortCC.inArray.forEach(function (ar, j) {
            p += state.valuesMatrix.matrix[j][i];
            w += state.weightingsMatrix.matrix[j][i];
          });
          state.paramObjList[i].message('rawfloat', p / w);
        }
      });
    }
  }
};

ui = function ui(on) {
  return state.ginterface = on != 0 ? false : true;
};

param = function param(on, index) {
  if (on) {
    var sindex = state.shortParam.add(index);
    state.paramObjList.splice(sindex, 0, state.mappableObj[index]);
    state.namelist.splice(sindex, 0, state.mappableObj[index].varname);
    state.weightingsMatrix.insertRow(sindex);
    state.valuesMatrix.insertRow(sindex);
  } else {
    var _sindex = state.shortParam.delete(index);

    state.paramObjList.splice(_sindex, 1);
    state.namelist.splice(_sindex, 1);
    state.weightingsMatrix.deleteRow(_sindex);
    state.valuesMatrix.deleteRow(_sindex);
  } //msg_int(lastCC)


  setsize();
  mgraphics.redraw();
};

function setsize() {
  box.size(state.paramObjList.length * settings.slider.width, box.rect[3] - box.rect[1]);
}

paint = function paint() {
  if (state.ginterface) {
    var startpoint;
    mgraphics.set_line_width(3); // drawsliders

    if (state.currentcolumn.length > 0) {
      state.currentcolumn.forEach(function (column, i) {
        var _mgraphics;

        (_mgraphics = mgraphics).set_source_rgba.apply(_mgraphics, _toConsumableArray(settings.slider.color)); //sliders


        mgraphics.rectangle_rounded(settings.slider.width * i + settings.slider.textWidth, (1 - column) * state.height, settings.slider.sliderWidth, state.height, 0, 0, 0, 0); //text

        startpoint = settings.slider.width * i + 3;
        mgraphics.fill();
        mgraphics.set_source_rgba(0., 0., 0., 0.5);
        mgraphics.identity_matrix;
        mgraphics.move_to(startpoint, state.height / 10.);
        mgraphics.rotate(1.570796);
        mgraphics.show_text(state.namelist[i]);
        mgraphics.identity_matrix();
      });
    }
  }
};

mapping = function mapping(st) {
  state.mapmode = st != 0;

  if (state.mapmode) {
    state.prevCC = -1; //receive

    var receive = this.patcher.newdefault(this.box.rect[0], this.box.rect[1] - settings.receive_distance, 'receive', settings.receiveName);
    state.mapping_objects.push(receive);
    this.patcher.connect(receive, 0, this.box, 0); //map buttons and sends

    state.mappableObj.forEach(function (obj, i) {
      var r = obj.rect;
      var x, y, w, h;
      x = r[0];
      y = r[1];
      w = r[2] - r[0];
      h = r[3] - r[1]; //objects (ubtn, on, off, snd)
      //ubutton

      var ubtn = obj.patcher.newdefault(x, y, 'ubutton', '@patching_rect', x, y, w, h, '@presentation_rect', x, y, w, h, '@orderfront', 1, '@toggle', 1, '@presentation', 1, '@ignoreclick', 0);

      if (state.shortParam.getShort(i) > -1) {
        ubtn.message('set', 1);
      } //messages


      var on = obj.patcher.newdefault(x + 20, y + 50, 'message');
      var off = obj.patcher.newdefault(x, y + 50, 'message');
      on.message('set', 'param', 1, i);
      off.message('set', 'param', 0, i); //send

      var snd = obj.patcher.newdefault(x, y + 100, 'send', settings.receiveName); //collect all objects in an Array

      state.mapping_objects.push(ubtn, on, off, snd); //connections

      obj.patcher.connect(ubtn, 1, on, 0);
      obj.patcher.connect(ubtn, 0, off, 0);
      obj.patcher.connect(on, 0, snd, 0);
      obj.patcher.connect(off, 0, snd, 0);
    });
  } else {
    //delete mapping objects
    state.mapping_objects.forEach(function (mapping) {
      mapping.patcher.remove(mapping);
    });
    state.prevCC = -1;
    /*/delete empty columns
    for(i=0i<state.weightingsMatrix.matrix.lengthi++){
        let c = 0
        let cAr = state.weightingsMatrix.getColumn(i)
        for(j=0j<cAr.lengthj++){c += cAr[j]}
        if(c==0){
            state.weightingsMatrix.deleteColumn(i)
            state.valuesMatrix.deletecolumn(i)
        }
    }*/

    state.mapping_objects = [];
  }
};

function isoverslider(x) {
  return state.currentcolumn.findIndex(function (column, i) {
    return x >= settings.slider.width * i && x < settings.slider.width * (i + 1);
  });
}

onclick = function onclick(x, y) {
  state.isover = isoverslider(x);
  ondrag(x, y, 1);
};

ondrag = function ondrag(x, y, button) {
  if (button) {
    if (state.isover > -1) {
      if (y < 0) {
        y = 0;
      }

      if (y > state.height) {
        y = state.height;
      }

      state.currentcolumn[state.isover] = 1 - y / state.height;
      mgraphics.redraw();
    }
  } else {
    state.weightingsMatrix.setColumn(state.shortCC.getShort(state.lastCC), state.currentcolumn);
  }
};

var last_isover = -1;
var hov;

onidle = function onidle(x, y) {
  if (state.currentcolumn.length > 0) {
    state.isover = isoverslider(x);
    var change = last_isover != state.isover;
    var object = state.mappableObj[state.shortParam.getLong(state.isover)];

    if (state.isover > -1 && last_isover != state.isover) {
      try {
        hov.patcher.remove(hov);
      } catch (err) {}

      var r = object.rect;

      var _x, _y, w, h;

      _x = r[0];
      _y = r[1];
      w = r[2] - r[0];
      h = r[3] - r[1];
      var hovColor = settings.hovColor;
      hov = object.patcher.newdefault(_x, _y, 'panel', '@patching_rect', _x, _y, w, h, '@presentation_rect', _x, _y, w, h, '@bgfillcolor_type', 'color', '@bgfillcolor_color', hovColor[0], hovColor[1], hovColor[2], hovColor[3], '@orderfront', 1, '@presentation', 1);
    }

    last_isover = state.isover;
  }
};

onidleout = function onidleout() {
  last_isover = -1;

  try {
    hov.patcher.remove(hov);
  } catch (err) {}
};

onresize = function onresize() {
  box.size(settings.slider.width * state.currentcolumn.length, box.rect[3] - box.rect[1]);
  state.width = box.rect[2] - box.rect[0];
  state.height = box.rect[3] - box.rect[1];
  mgraphics.redraw();
};

/***/ })
/******/ ]);