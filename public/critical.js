/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./app/critical.js":
/*!*************************!*\
  !*** ./app/critical.js ***!
  \*************************/
/***/ (() => {

console.log("Preloader");

/***/ }),

/***/ "./node_modules/ansi-html-community/index.js":
/*!***************************************************!*\
  !*** ./node_modules/ansi-html-community/index.js ***!
  \***************************************************/
/***/ ((module) => {

"use strict";


module.exports = ansiHTML;

// Reference to https://github.com/sindresorhus/ansi-regex
var _regANSI = /(?:(?:\u001b\[)|\u009b)(?:(?:[0-9]{1,3})?(?:(?:;[0-9]{0,3})*)?[A-M|f-m])|\u001b[A-M]/;
var _defColors = {
  reset: ['fff', '000'],
  // [FOREGROUD_COLOR, BACKGROUND_COLOR]
  black: '000',
  red: 'ff0000',
  green: '209805',
  yellow: 'e8bf03',
  blue: '0000ff',
  magenta: 'ff00ff',
  cyan: '00ffee',
  lightgrey: 'f0f0f0',
  darkgrey: '888'
};
var _styles = {
  30: 'black',
  31: 'red',
  32: 'green',
  33: 'yellow',
  34: 'blue',
  35: 'magenta',
  36: 'cyan',
  37: 'lightgrey'
};
var _openTags = {
  '1': 'font-weight:bold',
  // bold
  '2': 'opacity:0.5',
  // dim
  '3': '<i>',
  // italic
  '4': '<u>',
  // underscore
  '8': 'display:none',
  // hidden
  '9': '<del>' // delete
};
var _closeTags = {
  '23': '</i>',
  // reset italic
  '24': '</u>',
  // reset underscore
  '29': '</del>' // reset delete
};
[0, 21, 22, 27, 28, 39, 49].forEach(function (n) {
  _closeTags[n] = '</span>';
});

/**
 * Converts text with ANSI color codes to HTML markup.
 * @param {String} text
 * @returns {*}
 */
function ansiHTML(text) {
  // Returns the text if the string has no ANSI escape code.
  if (!_regANSI.test(text)) {
    return text;
  }

  // Cache opened sequence.
  var ansiCodes = [];
  // Replace with markup.
  var ret = text.replace(/\033\[(\d+)m/g, function (match, seq) {
    var ot = _openTags[seq];
    if (ot) {
      // If current sequence has been opened, close it.
      if (!!~ansiCodes.indexOf(seq)) {
        // eslint-disable-line no-extra-boolean-cast
        ansiCodes.pop();
        return '</span>';
      }
      // Open tag.
      ansiCodes.push(seq);
      return ot[0] === '<' ? ot : '<span style="' + ot + ';">';
    }
    var ct = _closeTags[seq];
    if (ct) {
      // Pop sequence
      ansiCodes.pop();
      return ct;
    }
    return '';
  });

  // Make sure tags are closed.
  var l = ansiCodes.length;
  l > 0 && (ret += Array(l + 1).join('</span>'));
  return ret;
}

/**
 * Customize colors.
 * @param {Object} colors reference to _defColors
 */
ansiHTML.setColors = function (colors) {
  if (typeof colors !== 'object') {
    throw new Error('`colors` parameter must be an Object.');
  }
  var _finalColors = {};
  for (var key in _defColors) {
    var hex = colors.hasOwnProperty(key) ? colors[key] : null;
    if (!hex) {
      _finalColors[key] = _defColors[key];
      continue;
    }
    if ('reset' === key) {
      if (typeof hex === 'string') {
        hex = [hex];
      }
      if (!Array.isArray(hex) || hex.length === 0 || hex.some(function (h) {
        return typeof h !== 'string';
      })) {
        throw new Error('The value of `' + key + '` property must be an Array and each item could only be a hex string, e.g.: FF0000');
      }
      var defHexColor = _defColors[key];
      if (!hex[0]) {
        hex[0] = defHexColor[0];
      }
      if (hex.length === 1 || !hex[1]) {
        hex = [hex[0]];
        hex.push(defHexColor[1]);
      }
      hex = hex.slice(0, 2);
    } else if (typeof hex !== 'string') {
      throw new Error('The value of `' + key + '` property must be a hex string, e.g.: FF0000');
    }
    _finalColors[key] = hex;
  }
  _setTags(_finalColors);
};

/**
 * Reset colors.
 */
ansiHTML.reset = function () {
  _setTags(_defColors);
};

/**
 * Expose tags, including open and close.
 * @type {Object}
 */
ansiHTML.tags = {};
if (Object.defineProperty) {
  Object.defineProperty(ansiHTML.tags, 'open', {
    get: function () {
      return _openTags;
    }
  });
  Object.defineProperty(ansiHTML.tags, 'close', {
    get: function () {
      return _closeTags;
    }
  });
} else {
  ansiHTML.tags.open = _openTags;
  ansiHTML.tags.close = _closeTags;
}
function _setTags(colors) {
  // reset all
  _openTags['0'] = 'font-weight:normal;opacity:1;color:#' + colors.reset[0] + ';background:#' + colors.reset[1];
  // inverse
  _openTags['7'] = 'color:#' + colors.reset[1] + ';background:#' + colors.reset[0];
  // dark grey
  _openTags['90'] = 'color:#' + colors.darkgrey;
  for (var code in _styles) {
    var color = _styles[code];
    var oriColor = colors[color] || '000';
    _openTags[code] = 'color:#' + oriColor;
    code = parseInt(code);
    _openTags[(code + 10).toString()] = 'background:#' + oriColor;
  }
}
ansiHTML.reset();

/***/ }),

/***/ "./node_modules/events/events.js":
/*!***************************************!*\
  !*** ./node_modules/events/events.js ***!
  \***************************************/
/***/ ((module) => {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



var R = typeof Reflect === 'object' ? Reflect : null;
var ReflectApply = R && typeof R.apply === 'function' ? R.apply : function ReflectApply(target, receiver, args) {
  return Function.prototype.apply.call(target, receiver, args);
};
var ReflectOwnKeys;
if (R && typeof R.ownKeys === 'function') {
  ReflectOwnKeys = R.ownKeys;
} else if (Object.getOwnPropertySymbols) {
  ReflectOwnKeys = function ReflectOwnKeys(target) {
    return Object.getOwnPropertyNames(target).concat(Object.getOwnPropertySymbols(target));
  };
} else {
  ReflectOwnKeys = function ReflectOwnKeys(target) {
    return Object.getOwnPropertyNames(target);
  };
}
function ProcessEmitWarning(warning) {
  if (console && console.warn) console.warn(warning);
}
var NumberIsNaN = Number.isNaN || function NumberIsNaN(value) {
  return value !== value;
};
function EventEmitter() {
  EventEmitter.init.call(this);
}
module.exports = EventEmitter;
module.exports.once = once;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;
EventEmitter.prototype._events = undefined;
EventEmitter.prototype._eventsCount = 0;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
var defaultMaxListeners = 10;
function checkListener(listener) {
  if (typeof listener !== 'function') {
    throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
  }
}
Object.defineProperty(EventEmitter, 'defaultMaxListeners', {
  enumerable: true,
  get: function () {
    return defaultMaxListeners;
  },
  set: function (arg) {
    if (typeof arg !== 'number' || arg < 0 || NumberIsNaN(arg)) {
      throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + arg + '.');
    }
    defaultMaxListeners = arg;
  }
});
EventEmitter.init = function () {
  if (this._events === undefined || this._events === Object.getPrototypeOf(this)._events) {
    this._events = Object.create(null);
    this._eventsCount = 0;
  }
  this._maxListeners = this._maxListeners || undefined;
};

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function setMaxListeners(n) {
  if (typeof n !== 'number' || n < 0 || NumberIsNaN(n)) {
    throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + n + '.');
  }
  this._maxListeners = n;
  return this;
};
function _getMaxListeners(that) {
  if (that._maxListeners === undefined) return EventEmitter.defaultMaxListeners;
  return that._maxListeners;
}
EventEmitter.prototype.getMaxListeners = function getMaxListeners() {
  return _getMaxListeners(this);
};
EventEmitter.prototype.emit = function emit(type) {
  var args = [];
  for (var i = 1; i < arguments.length; i++) args.push(arguments[i]);
  var doError = type === 'error';
  var events = this._events;
  if (events !== undefined) doError = doError && events.error === undefined;else if (!doError) return false;

  // If there is no 'error' event listener then throw.
  if (doError) {
    var er;
    if (args.length > 0) er = args[0];
    if (er instanceof Error) {
      // Note: The comments on the `throw` lines are intentional, they show
      // up in Node's output if this results in an unhandled exception.
      throw er; // Unhandled 'error' event
    }
    // At least give some kind of context to the user
    var err = new Error('Unhandled error.' + (er ? ' (' + er.message + ')' : ''));
    err.context = er;
    throw err; // Unhandled 'error' event
  }
  var handler = events[type];
  if (handler === undefined) return false;
  if (typeof handler === 'function') {
    ReflectApply(handler, this, args);
  } else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);
    for (var i = 0; i < len; ++i) ReflectApply(listeners[i], this, args);
  }
  return true;
};
function _addListener(target, type, listener, prepend) {
  var m;
  var events;
  var existing;
  checkListener(listener);
  events = target._events;
  if (events === undefined) {
    events = target._events = Object.create(null);
    target._eventsCount = 0;
  } else {
    // To avoid recursion in the case that type === "newListener"! Before
    // adding it to the listeners, first emit "newListener".
    if (events.newListener !== undefined) {
      target.emit('newListener', type, listener.listener ? listener.listener : listener);

      // Re-assign `events` because a newListener handler could have caused the
      // this._events to be assigned to a new object
      events = target._events;
    }
    existing = events[type];
  }
  if (existing === undefined) {
    // Optimize the case of one listener. Don't need the extra array object.
    existing = events[type] = listener;
    ++target._eventsCount;
  } else {
    if (typeof existing === 'function') {
      // Adding the second element, need to change to array.
      existing = events[type] = prepend ? [listener, existing] : [existing, listener];
      // If we've already got an array, just append.
    } else if (prepend) {
      existing.unshift(listener);
    } else {
      existing.push(listener);
    }

    // Check for listener leak
    m = _getMaxListeners(target);
    if (m > 0 && existing.length > m && !existing.warned) {
      existing.warned = true;
      // No error code for this since it is a Warning
      // eslint-disable-next-line no-restricted-syntax
      var w = new Error('Possible EventEmitter memory leak detected. ' + existing.length + ' ' + String(type) + ' listeners ' + 'added. Use emitter.setMaxListeners() to ' + 'increase limit');
      w.name = 'MaxListenersExceededWarning';
      w.emitter = target;
      w.type = type;
      w.count = existing.length;
      ProcessEmitWarning(w);
    }
  }
  return target;
}
EventEmitter.prototype.addListener = function addListener(type, listener) {
  return _addListener(this, type, listener, false);
};
EventEmitter.prototype.on = EventEmitter.prototype.addListener;
EventEmitter.prototype.prependListener = function prependListener(type, listener) {
  return _addListener(this, type, listener, true);
};
function onceWrapper() {
  if (!this.fired) {
    this.target.removeListener(this.type, this.wrapFn);
    this.fired = true;
    if (arguments.length === 0) return this.listener.call(this.target);
    return this.listener.apply(this.target, arguments);
  }
}
function _onceWrap(target, type, listener) {
  var state = {
    fired: false,
    wrapFn: undefined,
    target: target,
    type: type,
    listener: listener
  };
  var wrapped = onceWrapper.bind(state);
  wrapped.listener = listener;
  state.wrapFn = wrapped;
  return wrapped;
}
EventEmitter.prototype.once = function once(type, listener) {
  checkListener(listener);
  this.on(type, _onceWrap(this, type, listener));
  return this;
};
EventEmitter.prototype.prependOnceListener = function prependOnceListener(type, listener) {
  checkListener(listener);
  this.prependListener(type, _onceWrap(this, type, listener));
  return this;
};

// Emits a 'removeListener' event if and only if the listener was removed.
EventEmitter.prototype.removeListener = function removeListener(type, listener) {
  var list, events, position, i, originalListener;
  checkListener(listener);
  events = this._events;
  if (events === undefined) return this;
  list = events[type];
  if (list === undefined) return this;
  if (list === listener || list.listener === listener) {
    if (--this._eventsCount === 0) this._events = Object.create(null);else {
      delete events[type];
      if (events.removeListener) this.emit('removeListener', type, list.listener || listener);
    }
  } else if (typeof list !== 'function') {
    position = -1;
    for (i = list.length - 1; i >= 0; i--) {
      if (list[i] === listener || list[i].listener === listener) {
        originalListener = list[i].listener;
        position = i;
        break;
      }
    }
    if (position < 0) return this;
    if (position === 0) list.shift();else {
      spliceOne(list, position);
    }
    if (list.length === 1) events[type] = list[0];
    if (events.removeListener !== undefined) this.emit('removeListener', type, originalListener || listener);
  }
  return this;
};
EventEmitter.prototype.off = EventEmitter.prototype.removeListener;
EventEmitter.prototype.removeAllListeners = function removeAllListeners(type) {
  var listeners, events, i;
  events = this._events;
  if (events === undefined) return this;

  // not listening for removeListener, no need to emit
  if (events.removeListener === undefined) {
    if (arguments.length === 0) {
      this._events = Object.create(null);
      this._eventsCount = 0;
    } else if (events[type] !== undefined) {
      if (--this._eventsCount === 0) this._events = Object.create(null);else delete events[type];
    }
    return this;
  }

  // emit removeListener for all listeners on all events
  if (arguments.length === 0) {
    var keys = Object.keys(events);
    var key;
    for (i = 0; i < keys.length; ++i) {
      key = keys[i];
      if (key === 'removeListener') continue;
      this.removeAllListeners(key);
    }
    this.removeAllListeners('removeListener');
    this._events = Object.create(null);
    this._eventsCount = 0;
    return this;
  }
  listeners = events[type];
  if (typeof listeners === 'function') {
    this.removeListener(type, listeners);
  } else if (listeners !== undefined) {
    // LIFO order
    for (i = listeners.length - 1; i >= 0; i--) {
      this.removeListener(type, listeners[i]);
    }
  }
  return this;
};
function _listeners(target, type, unwrap) {
  var events = target._events;
  if (events === undefined) return [];
  var evlistener = events[type];
  if (evlistener === undefined) return [];
  if (typeof evlistener === 'function') return unwrap ? [evlistener.listener || evlistener] : [evlistener];
  return unwrap ? unwrapListeners(evlistener) : arrayClone(evlistener, evlistener.length);
}
EventEmitter.prototype.listeners = function listeners(type) {
  return _listeners(this, type, true);
};
EventEmitter.prototype.rawListeners = function rawListeners(type) {
  return _listeners(this, type, false);
};
EventEmitter.listenerCount = function (emitter, type) {
  if (typeof emitter.listenerCount === 'function') {
    return emitter.listenerCount(type);
  } else {
    return listenerCount.call(emitter, type);
  }
};
EventEmitter.prototype.listenerCount = listenerCount;
function listenerCount(type) {
  var events = this._events;
  if (events !== undefined) {
    var evlistener = events[type];
    if (typeof evlistener === 'function') {
      return 1;
    } else if (evlistener !== undefined) {
      return evlistener.length;
    }
  }
  return 0;
}
EventEmitter.prototype.eventNames = function eventNames() {
  return this._eventsCount > 0 ? ReflectOwnKeys(this._events) : [];
};
function arrayClone(arr, n) {
  var copy = new Array(n);
  for (var i = 0; i < n; ++i) copy[i] = arr[i];
  return copy;
}
function spliceOne(list, index) {
  for (; index + 1 < list.length; index++) list[index] = list[index + 1];
  list.pop();
}
function unwrapListeners(arr) {
  var ret = new Array(arr.length);
  for (var i = 0; i < ret.length; ++i) {
    ret[i] = arr[i].listener || arr[i];
  }
  return ret;
}
function once(emitter, name) {
  return new Promise(function (resolve, reject) {
    function errorListener(err) {
      emitter.removeListener(name, resolver);
      reject(err);
    }
    function resolver() {
      if (typeof emitter.removeListener === 'function') {
        emitter.removeListener('error', errorListener);
      }
      resolve([].slice.call(arguments));
    }
    ;
    eventTargetAgnosticAddListener(emitter, name, resolver, {
      once: true
    });
    if (name !== 'error') {
      addErrorHandlerIfEventEmitter(emitter, errorListener, {
        once: true
      });
    }
  });
}
function addErrorHandlerIfEventEmitter(emitter, handler, flags) {
  if (typeof emitter.on === 'function') {
    eventTargetAgnosticAddListener(emitter, 'error', handler, flags);
  }
}
function eventTargetAgnosticAddListener(emitter, name, listener, flags) {
  if (typeof emitter.on === 'function') {
    if (flags.once) {
      emitter.once(name, listener);
    } else {
      emitter.on(name, listener);
    }
  } else if (typeof emitter.addEventListener === 'function') {
    // EventTarget does not have `error` event semantics like Node
    // EventEmitters, we do not listen for `error` events here.
    emitter.addEventListener(name, function wrapListener(arg) {
      // IE does not have builtin `{ once: true }` support so we
      // have to do it manually.
      if (flags.once) {
        emitter.removeEventListener(name, wrapListener);
      }
      listener(arg);
    });
  } else {
    throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type ' + typeof emitter);
  }
}

/***/ }),

/***/ "./node_modules/webpack-dev-server/client/clients/WebSocketClient.js":
/*!***************************************************************************!*\
  !*** ./node_modules/webpack-dev-server/client/clients/WebSocketClient.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ WebSocketClient)
/* harmony export */ });
/* harmony import */ var _utils_log_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/log.js */ "./node_modules/webpack-dev-server/client/utils/log.js");
function _typeof(o) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
    return typeof o;
  } : function (o) {
    return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
  }, _typeof(o);
}
function _classCallCheck(a, n) {
  if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function");
}
function _defineProperties(e, r) {
  for (var t = 0; t < r.length; t++) {
    var o = r[t];
    o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o);
  }
}
function _createClass(e, r, t) {
  return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", {
    writable: !1
  }), e;
}
function _toPropertyKey(t) {
  var i = _toPrimitive(t, "string");
  return "symbol" == _typeof(i) ? i : i + "";
}
function _toPrimitive(t, r) {
  if ("object" != _typeof(t) || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r || "default");
    if ("object" != _typeof(i)) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}

var WebSocketClient = /*#__PURE__*/function () {
  /**
   * @param {string} url
   */
  function WebSocketClient(url) {
    _classCallCheck(this, WebSocketClient);
    this.client = new WebSocket(url);
    this.client.onerror = function (error) {
      _utils_log_js__WEBPACK_IMPORTED_MODULE_0__.log.error(error);
    };
  }

  /**
   * @param {(...args: any[]) => void} f
   */
  return _createClass(WebSocketClient, [{
    key: "onOpen",
    value: function onOpen(f) {
      this.client.onopen = f;
    }

    /**
     * @param {(...args: any[]) => void} f
     */
  }, {
    key: "onClose",
    value: function onClose(f) {
      this.client.onclose = f;
    }

    // call f with the message string as the first argument
    /**
     * @param {(...args: any[]) => void} f
     */
  }, {
    key: "onMessage",
    value: function onMessage(f) {
      this.client.onmessage = function (e) {
        f(e.data);
      };
    }
  }]);
}();


/***/ }),

/***/ "./node_modules/webpack-dev-server/client/index.js?protocol=ws%3A&hostname=0.0.0.0&port=8080&pathname=%2Fws&logging=info&overlay=true&reconnect=10&hot=true&live-reload=true":
/*!***********************************************************************************************************************************************************************************!*\
  !*** ./node_modules/webpack-dev-server/client/index.js?protocol=ws%3A&hostname=0.0.0.0&port=8080&pathname=%2Fws&logging=info&overlay=true&reconnect=10&hot=true&live-reload=true ***!
  \***********************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
var __resourceQuery = "?protocol=ws%3A&hostname=0.0.0.0&port=8080&pathname=%2Fws&logging=info&overlay=true&reconnect=10&hot=true&live-reload=true";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createSocketURL: () => (/* binding */ createSocketURL),
/* harmony export */   getCurrentScriptSource: () => (/* binding */ getCurrentScriptSource),
/* harmony export */   parseURL: () => (/* binding */ parseURL)
/* harmony export */ });
/* harmony import */ var webpack_hot_log_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! webpack/hot/log.js */ "./node_modules/webpack/hot/log.js");
/* harmony import */ var webpack_hot_log_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(webpack_hot_log_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var webpack_hot_emitter_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! webpack/hot/emitter.js */ "./node_modules/webpack/hot/emitter.js");
/* harmony import */ var webpack_hot_emitter_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(webpack_hot_emitter_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _socket_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./socket.js */ "./node_modules/webpack-dev-server/client/socket.js");
/* harmony import */ var _overlay_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./overlay.js */ "./node_modules/webpack-dev-server/client/overlay.js");
/* harmony import */ var _utils_log_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./utils/log.js */ "./node_modules/webpack-dev-server/client/utils/log.js");
/* harmony import */ var _utils_sendMessage_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./utils/sendMessage.js */ "./node_modules/webpack-dev-server/client/utils/sendMessage.js");
/* harmony import */ var _progress_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./progress.js */ "./node_modules/webpack-dev-server/client/progress.js");
function ownKeys(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function (r) {
      return Object.getOwnPropertyDescriptor(e, r).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys(Object(t), !0).forEach(function (r) {
      _defineProperty(e, r, t[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
    });
  }
  return e;
}
function _defineProperty(e, r, t) {
  return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
    value: t,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[r] = t, e;
}
function _toPropertyKey(t) {
  var i = _toPrimitive(t, "string");
  return "symbol" == _typeof(i) ? i : i + "";
}
function _toPrimitive(t, r) {
  if ("object" != _typeof(t) || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r || "default");
    if ("object" != _typeof(i)) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
function _typeof(o) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
    return typeof o;
  } : function (o) {
    return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
  }, _typeof(o);
}
/* global __resourceQuery, __webpack_hash__ */
/// <reference types="webpack/module" />








/**
 * @typedef {Object} OverlayOptions
 * @property {boolean | (error: Error) => boolean} [warnings]
 * @property {boolean | (error: Error) => boolean} [errors]
 * @property {boolean | (error: Error) => boolean} [runtimeErrors]
 * @property {string} [trustedTypesPolicyName]
 */

/**
 * @typedef {Object} Options
 * @property {boolean} hot
 * @property {boolean} liveReload
 * @property {boolean} progress
 * @property {boolean | OverlayOptions} overlay
 * @property {string} [logging]
 * @property {number} [reconnect]
 */

/**
 * @typedef {Object} Status
 * @property {boolean} isUnloading
 * @property {string} currentHash
 * @property {string} [previousHash]
 */

/**
 * @param {boolean | { warnings?: boolean | string; errors?: boolean | string; runtimeErrors?: boolean | string; }} overlayOptions
 */
var decodeOverlayOptions = function decodeOverlayOptions(overlayOptions) {
  if (_typeof(overlayOptions) === "object") {
    ["warnings", "errors", "runtimeErrors"].forEach(function (property) {
      if (typeof overlayOptions[property] === "string") {
        var overlayFilterFunctionString = decodeURIComponent(overlayOptions[property]);

        // eslint-disable-next-line no-new-func
        overlayOptions[property] = new Function("message", "var callback = ".concat(overlayFilterFunctionString, "\n        return callback(message)"));
      }
    });
  }
};

/**
 * @type {Status}
 */
var status = {
  isUnloading: false,
  // eslint-disable-next-line camelcase
  currentHash: __webpack_require__.h()
};

/**
 * @returns {string}
 */
var getCurrentScriptSource = function getCurrentScriptSource() {
  // `document.currentScript` is the most accurate way to find the current script,
  // but is not supported in all browsers.
  if (document.currentScript) {
    return document.currentScript.getAttribute("src");
  }

  // Fallback to getting all scripts running in the document.
  var scriptElements = document.scripts || [];
  var scriptElementsWithSrc = Array.prototype.filter.call(scriptElements, function (element) {
    return element.getAttribute("src");
  });
  if (scriptElementsWithSrc.length > 0) {
    var currentScript = scriptElementsWithSrc[scriptElementsWithSrc.length - 1];
    return currentScript.getAttribute("src");
  }

  // Fail as there was no script to use.
  throw new Error("[webpack-dev-server] Failed to get current script source.");
};

/**
 * @param {string} resourceQuery
 * @returns {{ [key: string]: string | boolean }}
 */
var parseURL = function parseURL(resourceQuery) {
  /** @type {{ [key: string]: string }} */
  var result = {};
  if (typeof resourceQuery === "string" && resourceQuery !== "") {
    var searchParams = resourceQuery.slice(1).split("&");
    for (var i = 0; i < searchParams.length; i++) {
      var pair = searchParams[i].split("=");
      result[pair[0]] = decodeURIComponent(pair[1]);
    }
  } else {
    // Else, get the url from the <script> this file was called with.
    var scriptSource = getCurrentScriptSource();
    var scriptSourceURL;
    try {
      // The placeholder `baseURL` with `window.location.href`,
      // is to allow parsing of path-relative or protocol-relative URLs,
      // and will have no effect if `scriptSource` is a fully valid URL.
      scriptSourceURL = new URL(scriptSource, self.location.href);
    } catch (error) {
      // URL parsing failed, do nothing.
      // We will still proceed to see if we can recover using `resourceQuery`
    }
    if (scriptSourceURL) {
      result = scriptSourceURL;
      result.fromCurrentScript = true;
    }
  }
  return result;
};
var parsedResourceQuery = parseURL(__resourceQuery);
var enabledFeatures = {
  "Hot Module Replacement": false,
  "Live Reloading": false,
  Progress: false,
  Overlay: false
};

/** @type {Options} */
var options = {
  hot: false,
  liveReload: false,
  progress: false,
  overlay: false
};
if (parsedResourceQuery.hot === "true") {
  options.hot = true;
  enabledFeatures["Hot Module Replacement"] = true;
}
if (parsedResourceQuery["live-reload"] === "true") {
  options.liveReload = true;
  enabledFeatures["Live Reloading"] = true;
}
if (parsedResourceQuery.progress === "true") {
  options.progress = true;
  enabledFeatures.Progress = true;
}
if (parsedResourceQuery.overlay) {
  try {
    options.overlay = JSON.parse(parsedResourceQuery.overlay);
  } catch (e) {
    _utils_log_js__WEBPACK_IMPORTED_MODULE_4__.log.error("Error parsing overlay options from resource query:", e);
  }

  // Fill in default "true" params for partially-specified objects.
  if (_typeof(options.overlay) === "object") {
    options.overlay = _objectSpread({
      errors: true,
      warnings: true,
      runtimeErrors: true
    }, options.overlay);
    decodeOverlayOptions(options.overlay);
  }
  enabledFeatures.Overlay = options.overlay !== false;
}
if (parsedResourceQuery.logging) {
  options.logging = parsedResourceQuery.logging;
}
if (typeof parsedResourceQuery.reconnect !== "undefined") {
  options.reconnect = Number(parsedResourceQuery.reconnect);
}

/**
 * @param {string} level
 */
var setAllLogLevel = function setAllLogLevel(level) {
  // This is needed because the HMR logger operate separately from dev server logger
  webpack_hot_log_js__WEBPACK_IMPORTED_MODULE_0___default().setLogLevel(level === "verbose" || level === "log" ? "info" : level);
  (0,_utils_log_js__WEBPACK_IMPORTED_MODULE_4__.setLogLevel)(level);
};
if (options.logging) {
  setAllLogLevel(options.logging);
}
var logEnabledFeatures = function logEnabledFeatures(features) {
  var listEnabledFeatures = Object.keys(features);
  if (!features || listEnabledFeatures.length === 0) {
    return;
  }
  var logString = "Server started:";

  // Server started: Hot Module Replacement enabled, Live Reloading enabled, Overlay disabled.
  for (var i = 0; i < listEnabledFeatures.length; i++) {
    var key = listEnabledFeatures[i];
    logString += " ".concat(key, " ").concat(features[key] ? "enabled" : "disabled", ",");
  }
  // replace last comma with a period
  logString = logString.slice(0, -1).concat(".");
  _utils_log_js__WEBPACK_IMPORTED_MODULE_4__.log.info(logString);
};
logEnabledFeatures(enabledFeatures);
self.addEventListener("beforeunload", function () {
  status.isUnloading = true;
});
var overlay = typeof window !== "undefined" ? (0,_overlay_js__WEBPACK_IMPORTED_MODULE_3__.createOverlay)(_typeof(options.overlay) === "object" ? {
  trustedTypesPolicyName: options.overlay.trustedTypesPolicyName,
  catchRuntimeError: options.overlay.runtimeErrors
} : {
  trustedTypesPolicyName: false,
  catchRuntimeError: options.overlay
}) : {
  send: function send() {}
};

/**
 * @param {Options} options
 * @param {Status} currentStatus
 */
var reloadApp = function reloadApp(_ref, currentStatus) {
  var hot = _ref.hot,
    liveReload = _ref.liveReload;
  if (currentStatus.isUnloading) {
    return;
  }
  var currentHash = currentStatus.currentHash,
    previousHash = currentStatus.previousHash;
  var isInitial = currentHash.indexOf(/** @type {string} */previousHash) >= 0;
  if (isInitial) {
    return;
  }

  /**
   * @param {Window} rootWindow
   * @param {number} intervalId
   */
  function applyReload(rootWindow, intervalId) {
    clearInterval(intervalId);
    _utils_log_js__WEBPACK_IMPORTED_MODULE_4__.log.info("App updated. Reloading...");
    rootWindow.location.reload();
  }
  var search = self.location.search.toLowerCase();
  var allowToHot = search.indexOf("webpack-dev-server-hot=false") === -1;
  var allowToLiveReload = search.indexOf("webpack-dev-server-live-reload=false") === -1;
  if (hot && allowToHot) {
    _utils_log_js__WEBPACK_IMPORTED_MODULE_4__.log.info("App hot update...");
    webpack_hot_emitter_js__WEBPACK_IMPORTED_MODULE_1___default().emit("webpackHotUpdate", currentStatus.currentHash);
    if (typeof self !== "undefined" && self.window) {
      // broadcast update to window
      self.postMessage("webpackHotUpdate".concat(currentStatus.currentHash), "*");
    }
  }
  // allow refreshing the page only if liveReload isn't disabled
  else if (liveReload && allowToLiveReload) {
    var rootWindow = self;

    // use parent window for reload (in case we're in an iframe with no valid src)
    var intervalId = self.setInterval(function () {
      if (rootWindow.location.protocol !== "about:") {
        // reload immediately if protocol is valid
        applyReload(rootWindow, intervalId);
      } else {
        rootWindow = rootWindow.parent;
        if (rootWindow.parent === rootWindow) {
          // if parent equals current window we've reached the root which would continue forever, so trigger a reload anyways
          applyReload(rootWindow, intervalId);
        }
      }
    });
  }
};
var ansiRegex = new RegExp(["[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]+)*|[a-zA-Z\\d]+(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?\\u0007)", "(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-nq-uy=><~]))"].join("|"), "g");

/**
 *
 * Strip [ANSI escape codes](https://en.wikipedia.org/wiki/ANSI_escape_code) from a string.
 * Adapted from code originally released by Sindre Sorhus
 * Licensed the MIT License
 *
 * @param {string} string
 * @return {string}
 */
var stripAnsi = function stripAnsi(string) {
  if (typeof string !== "string") {
    throw new TypeError("Expected a `string`, got `".concat(_typeof(string), "`"));
  }
  return string.replace(ansiRegex, "");
};
var onSocketMessage = {
  hot: function hot() {
    if (parsedResourceQuery.hot === "false") {
      return;
    }
    options.hot = true;
  },
  liveReload: function liveReload() {
    if (parsedResourceQuery["live-reload"] === "false") {
      return;
    }
    options.liveReload = true;
  },
  invalid: function invalid() {
    _utils_log_js__WEBPACK_IMPORTED_MODULE_4__.log.info("App updated. Recompiling...");

    // Fixes #1042. overlay doesn't clear if errors are fixed but warnings remain.
    if (options.overlay) {
      overlay.send({
        type: "DISMISS"
      });
    }
    (0,_utils_sendMessage_js__WEBPACK_IMPORTED_MODULE_5__["default"])("Invalid");
  },
  /**
   * @param {string} hash
   */
  hash: function hash(_hash) {
    status.previousHash = status.currentHash;
    status.currentHash = _hash;
  },
  logging: setAllLogLevel,
  /**
   * @param {boolean} value
   */
  overlay: function overlay(value) {
    if (typeof document === "undefined") {
      return;
    }
    options.overlay = value;
    decodeOverlayOptions(options.overlay);
  },
  /**
   * @param {number} value
   */
  reconnect: function reconnect(value) {
    if (parsedResourceQuery.reconnect === "false") {
      return;
    }
    options.reconnect = value;
  },
  /**
   * @param {boolean} value
   */
  progress: function progress(value) {
    options.progress = value;
  },
  /**
   * @param {{ pluginName?: string, percent: number, msg: string }} data
   */
  "progress-update": function progressUpdate(data) {
    if (options.progress) {
      _utils_log_js__WEBPACK_IMPORTED_MODULE_4__.log.info("".concat(data.pluginName ? "[".concat(data.pluginName, "] ") : "").concat(data.percent, "% - ").concat(data.msg, "."));
    }
    if ((0,_progress_js__WEBPACK_IMPORTED_MODULE_6__.isProgressSupported)()) {
      if (typeof options.progress === "string") {
        var progress = document.querySelector("wds-progress");
        if (!progress) {
          (0,_progress_js__WEBPACK_IMPORTED_MODULE_6__.defineProgressElement)();
          progress = document.createElement("wds-progress");
          document.body.appendChild(progress);
        }
        progress.setAttribute("progress", data.percent);
        progress.setAttribute("type", options.progress);
      }
    }
    (0,_utils_sendMessage_js__WEBPACK_IMPORTED_MODULE_5__["default"])("Progress", data);
  },
  "still-ok": function stillOk() {
    _utils_log_js__WEBPACK_IMPORTED_MODULE_4__.log.info("Nothing changed.");
    if (options.overlay) {
      overlay.send({
        type: "DISMISS"
      });
    }
    (0,_utils_sendMessage_js__WEBPACK_IMPORTED_MODULE_5__["default"])("StillOk");
  },
  ok: function ok() {
    (0,_utils_sendMessage_js__WEBPACK_IMPORTED_MODULE_5__["default"])("Ok");
    if (options.overlay) {
      overlay.send({
        type: "DISMISS"
      });
    }
    reloadApp(options, status);
  },
  /**
   * @param {string} file
   */
  "static-changed": function staticChanged(file) {
    _utils_log_js__WEBPACK_IMPORTED_MODULE_4__.log.info("".concat(file ? "\"".concat(file, "\"") : "Content", " from static directory was changed. Reloading..."));
    self.location.reload();
  },
  /**
   * @param {Error[]} warnings
   * @param {any} params
   */
  warnings: function warnings(_warnings, params) {
    _utils_log_js__WEBPACK_IMPORTED_MODULE_4__.log.warn("Warnings while compiling.");
    var printableWarnings = _warnings.map(function (error) {
      var _formatProblem = (0,_overlay_js__WEBPACK_IMPORTED_MODULE_3__.formatProblem)("warning", error),
        header = _formatProblem.header,
        body = _formatProblem.body;
      return "".concat(header, "\n").concat(stripAnsi(body));
    });
    (0,_utils_sendMessage_js__WEBPACK_IMPORTED_MODULE_5__["default"])("Warnings", printableWarnings);
    for (var i = 0; i < printableWarnings.length; i++) {
      _utils_log_js__WEBPACK_IMPORTED_MODULE_4__.log.warn(printableWarnings[i]);
    }
    var overlayWarningsSetting = typeof options.overlay === "boolean" ? options.overlay : options.overlay && options.overlay.warnings;
    if (overlayWarningsSetting) {
      var warningsToDisplay = typeof overlayWarningsSetting === "function" ? _warnings.filter(overlayWarningsSetting) : _warnings;
      if (warningsToDisplay.length) {
        overlay.send({
          type: "BUILD_ERROR",
          level: "warning",
          messages: _warnings
        });
      }
    }
    if (params && params.preventReloading) {
      return;
    }
    reloadApp(options, status);
  },
  /**
   * @param {Error[]} errors
   */
  errors: function errors(_errors) {
    _utils_log_js__WEBPACK_IMPORTED_MODULE_4__.log.error("Errors while compiling. Reload prevented.");
    var printableErrors = _errors.map(function (error) {
      var _formatProblem2 = (0,_overlay_js__WEBPACK_IMPORTED_MODULE_3__.formatProblem)("error", error),
        header = _formatProblem2.header,
        body = _formatProblem2.body;
      return "".concat(header, "\n").concat(stripAnsi(body));
    });
    (0,_utils_sendMessage_js__WEBPACK_IMPORTED_MODULE_5__["default"])("Errors", printableErrors);
    for (var i = 0; i < printableErrors.length; i++) {
      _utils_log_js__WEBPACK_IMPORTED_MODULE_4__.log.error(printableErrors[i]);
    }
    var overlayErrorsSettings = typeof options.overlay === "boolean" ? options.overlay : options.overlay && options.overlay.errors;
    if (overlayErrorsSettings) {
      var errorsToDisplay = typeof overlayErrorsSettings === "function" ? _errors.filter(overlayErrorsSettings) : _errors;
      if (errorsToDisplay.length) {
        overlay.send({
          type: "BUILD_ERROR",
          level: "error",
          messages: _errors
        });
      }
    }
  },
  /**
   * @param {Error} error
   */
  error: function error(_error) {
    _utils_log_js__WEBPACK_IMPORTED_MODULE_4__.log.error(_error);
  },
  close: function close() {
    _utils_log_js__WEBPACK_IMPORTED_MODULE_4__.log.info("Disconnected!");
    if (options.overlay) {
      overlay.send({
        type: "DISMISS"
      });
    }
    (0,_utils_sendMessage_js__WEBPACK_IMPORTED_MODULE_5__["default"])("Close");
  }
};

/**
 * @param {{ protocol?: string, auth?: string, hostname?: string, port?: string, pathname?: string, search?: string, hash?: string, slashes?: boolean }} objURL
 * @returns {string}
 */
var formatURL = function formatURL(objURL) {
  var protocol = objURL.protocol || "";
  if (protocol && protocol.substr(-1) !== ":") {
    protocol += ":";
  }
  var auth = objURL.auth || "";
  if (auth) {
    auth = encodeURIComponent(auth);
    auth = auth.replace(/%3A/i, ":");
    auth += "@";
  }
  var host = "";
  if (objURL.hostname) {
    host = auth + (objURL.hostname.indexOf(":") === -1 ? objURL.hostname : "[".concat(objURL.hostname, "]"));
    if (objURL.port) {
      host += ":".concat(objURL.port);
    }
  }
  var pathname = objURL.pathname || "";
  if (objURL.slashes) {
    host = "//".concat(host || "");
    if (pathname && pathname.charAt(0) !== "/") {
      pathname = "/".concat(pathname);
    }
  } else if (!host) {
    host = "";
  }
  var search = objURL.search || "";
  if (search && search.charAt(0) !== "?") {
    search = "?".concat(search);
  }
  var hash = objURL.hash || "";
  if (hash && hash.charAt(0) !== "#") {
    hash = "#".concat(hash);
  }
  pathname = pathname.replace(/[?#]/g,
  /**
   * @param {string} match
   * @returns {string}
   */
  function (match) {
    return encodeURIComponent(match);
  });
  search = search.replace("#", "%23");
  return "".concat(protocol).concat(host).concat(pathname).concat(search).concat(hash);
};

/**
 * @param {URL & { fromCurrentScript?: boolean }} parsedURL
 * @returns {string}
 */
var createSocketURL = function createSocketURL(parsedURL) {
  var hostname = parsedURL.hostname;

  // Node.js module parses it as `::`
  // `new URL(urlString, [baseURLString])` parses it as '[::]'
  var isInAddrAny = hostname === "0.0.0.0" || hostname === "::" || hostname === "[::]";

  // why do we need this check?
  // hostname n/a for file protocol (example, when using electron, ionic)
  // see: https://github.com/webpack/webpack-dev-server/pull/384
  if (isInAddrAny && self.location.hostname && self.location.protocol.indexOf("http") === 0) {
    hostname = self.location.hostname;
  }
  var socketURLProtocol = parsedURL.protocol || self.location.protocol;

  // When https is used in the app, secure web sockets are always necessary because the browser doesn't accept non-secure web sockets.
  if (socketURLProtocol === "auto:" || hostname && isInAddrAny && self.location.protocol === "https:") {
    socketURLProtocol = self.location.protocol;
  }
  socketURLProtocol = socketURLProtocol.replace(/^(?:http|.+-extension|file)/i, "ws");
  var socketURLAuth = "";

  // `new URL(urlString, [baseURLstring])` doesn't have `auth` property
  // Parse authentication credentials in case we need them
  if (parsedURL.username) {
    socketURLAuth = parsedURL.username;

    // Since HTTP basic authentication does not allow empty username,
    // we only include password if the username is not empty.
    if (parsedURL.password) {
      // Result: <username>:<password>
      socketURLAuth = socketURLAuth.concat(":", parsedURL.password);
    }
  }

  // In case the host is a raw IPv6 address, it can be enclosed in
  // the brackets as the brackets are needed in the final URL string.
  // Need to remove those as url.format blindly adds its own set of brackets
  // if the host string contains colons. That would lead to non-working
  // double brackets (e.g. [[::]]) host
  //
  // All of these web socket url params are optionally passed in through resourceQuery,
  // so we need to fall back to the default if they are not provided
  var socketURLHostname = (hostname || self.location.hostname || "localhost").replace(/^\[(.*)\]$/, "$1");
  var socketURLPort = parsedURL.port;
  if (!socketURLPort || socketURLPort === "0") {
    socketURLPort = self.location.port;
  }

  // If path is provided it'll be passed in via the resourceQuery as a
  // query param so it has to be parsed out of the querystring in order for the
  // client to open the socket to the correct location.
  var socketURLPathname = "/ws";
  if (parsedURL.pathname && !parsedURL.fromCurrentScript) {
    socketURLPathname = parsedURL.pathname;
  }
  return formatURL({
    protocol: socketURLProtocol,
    auth: socketURLAuth,
    hostname: socketURLHostname,
    port: socketURLPort,
    pathname: socketURLPathname,
    slashes: true
  });
};
var socketURL = createSocketURL(parsedResourceQuery);
(0,_socket_js__WEBPACK_IMPORTED_MODULE_2__["default"])(socketURL, onSocketMessage, options.reconnect);


/***/ }),

/***/ "./node_modules/webpack-dev-server/client/modules/logger/index.js":
/*!************************************************************************!*\
  !*** ./node_modules/webpack-dev-server/client/modules/logger/index.js ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, exports) => {

/******/(function () {
  // webpackBootstrap
  /******/
  "use strict";

  /******/
  var __webpack_modules__ = {
    /***/"./client-src/modules/logger/tapable.js": (
    /*!**********************************************!*\
      !*** ./client-src/modules/logger/tapable.js ***!
      \**********************************************/
    /***/
    function (__unused_webpack_module, __nested_webpack_exports__, __nested_webpack_require_404__) {
      __nested_webpack_require_404__.r(__nested_webpack_exports__);
      /* harmony export */
      __nested_webpack_require_404__.d(__nested_webpack_exports__, {
        /* harmony export */SyncBailHook: function () {
          return /* binding */SyncBailHook;
        }
        /* harmony export */
      });
      function SyncBailHook() {
        return {
          call: function call() {}
        };
      }

      /**
       * Client stub for tapable SyncBailHook
       */
      // eslint-disable-next-line import/prefer-default-export

      /***/
    }),
    /***/"./node_modules/webpack/lib/logging/Logger.js": (
    /*!****************************************************!*\
      !*** ./node_modules/webpack/lib/logging/Logger.js ***!
      \****************************************************/
    /***/
    function (module) {
      /*
      	MIT License http://www.opensource.org/licenses/mit-license.php
      	Author Tobias Koppers @sokra
      */

      function _typeof(o) {
        "@babel/helpers - typeof";

        return _typeof = "function" == typeof (typeof Symbol !== "undefined" ? Symbol : function (i) {
          return i;
        }) && "symbol" == typeof (typeof Symbol !== "undefined" ? Symbol : function (i) {
          return i;
        }).iterator ? function (o) {
          return typeof o;
        } : function (o) {
          return o && "function" == typeof (typeof Symbol !== "undefined" ? Symbol : function (i) {
            return i;
          }) && o.constructor === (typeof Symbol !== "undefined" ? Symbol : function (i) {
            return i;
          }) && o !== (typeof Symbol !== "undefined" ? Symbol : function (i) {
            return i;
          }).prototype ? "symbol" : typeof o;
        }, _typeof(o);
      }
      function _toConsumableArray(r) {
        return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread();
      }
      function _nonIterableSpread() {
        throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
      }
      function _unsupportedIterableToArray(r, a) {
        if (r) {
          if ("string" == typeof r) return _arrayLikeToArray(r, a);
          var t = {}.toString.call(r).slice(8, -1);
          return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0;
        }
      }
      function _iterableToArray(r) {
        if ("undefined" != typeof (typeof Symbol !== "undefined" ? Symbol : function (i) {
          return i;
        }) && null != r[(typeof Symbol !== "undefined" ? Symbol : function (i) {
          return i;
        }).iterator] || null != r["@@iterator"]) return Array.from(r);
      }
      function _arrayWithoutHoles(r) {
        if (Array.isArray(r)) return _arrayLikeToArray(r);
      }
      function _arrayLikeToArray(r, a) {
        (null == a || a > r.length) && (a = r.length);
        for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
        return n;
      }
      function _classCallCheck(a, n) {
        if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function");
      }
      function _defineProperties(e, r) {
        for (var t = 0; t < r.length; t++) {
          var o = r[t];
          o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o);
        }
      }
      function _createClass(e, r, t) {
        return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", {
          writable: !1
        }), e;
      }
      function _toPropertyKey(t) {
        var i = _toPrimitive(t, "string");
        return "symbol" == _typeof(i) ? i : i + "";
      }
      function _toPrimitive(t, r) {
        if ("object" != _typeof(t) || !t) return t;
        var e = t[(typeof Symbol !== "undefined" ? Symbol : function (i) {
          return i;
        }).toPrimitive];
        if (void 0 !== e) {
          var i = e.call(t, r || "default");
          if ("object" != _typeof(i)) return i;
          throw new TypeError("@@toPrimitive must return a primitive value.");
        }
        return ("string" === r ? String : Number)(t);
      }
      var LogType = Object.freeze({
        error: (/** @type {"error"} */"error"),
        // message, c style arguments
        warn: (/** @type {"warn"} */"warn"),
        // message, c style arguments
        info: (/** @type {"info"} */"info"),
        // message, c style arguments
        log: (/** @type {"log"} */"log"),
        // message, c style arguments
        debug: (/** @type {"debug"} */"debug"),
        // message, c style arguments

        trace: (/** @type {"trace"} */"trace"),
        // no arguments

        group: (/** @type {"group"} */"group"),
        // [label]
        groupCollapsed: (/** @type {"groupCollapsed"} */"groupCollapsed"),
        // [label]
        groupEnd: (/** @type {"groupEnd"} */"groupEnd"),
        // [label]

        profile: (/** @type {"profile"} */"profile"),
        // [profileName]
        profileEnd: (/** @type {"profileEnd"} */"profileEnd"),
        // [profileName]

        time: (/** @type {"time"} */"time"),
        // name, time as [seconds, nanoseconds]

        clear: (/** @type {"clear"} */"clear"),
        // no arguments
        status: (/** @type {"status"} */"status") // message, arguments
      });
      module.exports.LogType = LogType;

      /** @typedef {typeof LogType[keyof typeof LogType]} LogTypeEnum */

      var LOG_SYMBOL = (typeof Symbol !== "undefined" ? Symbol : function (i) {
        return i;
      })("webpack logger raw log method");
      var TIMERS_SYMBOL = (typeof Symbol !== "undefined" ? Symbol : function (i) {
        return i;
      })("webpack logger times");
      var TIMERS_AGGREGATES_SYMBOL = (typeof Symbol !== "undefined" ? Symbol : function (i) {
        return i;
      })("webpack logger aggregated times");
      var WebpackLogger = /*#__PURE__*/function () {
        /**
         * @param {(type: LogTypeEnum, args?: EXPECTED_ANY[]) => void} log log function
         * @param {(name: string | (() => string)) => WebpackLogger} getChildLogger function to create child logger
         */
        function WebpackLogger(log, getChildLogger) {
          _classCallCheck(this, WebpackLogger);
          this[LOG_SYMBOL] = log;
          this.getChildLogger = getChildLogger;
        }

        /**
         * @param {...EXPECTED_ANY} args args
         */
        return _createClass(WebpackLogger, [{
          key: "error",
          value: function error() {
            for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
              args[_key] = arguments[_key];
            }
            this[LOG_SYMBOL](LogType.error, args);
          }

          /**
           * @param {...EXPECTED_ANY} args args
           */
        }, {
          key: "warn",
          value: function warn() {
            for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
              args[_key2] = arguments[_key2];
            }
            this[LOG_SYMBOL](LogType.warn, args);
          }

          /**
           * @param {...EXPECTED_ANY} args args
           */
        }, {
          key: "info",
          value: function info() {
            for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
              args[_key3] = arguments[_key3];
            }
            this[LOG_SYMBOL](LogType.info, args);
          }

          /**
           * @param {...EXPECTED_ANY} args args
           */
        }, {
          key: "log",
          value: function log() {
            for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
              args[_key4] = arguments[_key4];
            }
            this[LOG_SYMBOL](LogType.log, args);
          }

          /**
           * @param {...EXPECTED_ANY} args args
           */
        }, {
          key: "debug",
          value: function debug() {
            for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
              args[_key5] = arguments[_key5];
            }
            this[LOG_SYMBOL](LogType.debug, args);
          }

          /**
           * @param {EXPECTED_ANY} assertion assertion
           * @param {...EXPECTED_ANY} args args
           */
        }, {
          key: "assert",
          value: function assert(assertion) {
            if (!assertion) {
              for (var _len6 = arguments.length, args = new Array(_len6 > 1 ? _len6 - 1 : 0), _key6 = 1; _key6 < _len6; _key6++) {
                args[_key6 - 1] = arguments[_key6];
              }
              this[LOG_SYMBOL](LogType.error, args);
            }
          }
        }, {
          key: "trace",
          value: function trace() {
            this[LOG_SYMBOL](LogType.trace, ["Trace"]);
          }
        }, {
          key: "clear",
          value: function clear() {
            this[LOG_SYMBOL](LogType.clear);
          }

          /**
           * @param {...EXPECTED_ANY} args args
           */
        }, {
          key: "status",
          value: function status() {
            for (var _len7 = arguments.length, args = new Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
              args[_key7] = arguments[_key7];
            }
            this[LOG_SYMBOL](LogType.status, args);
          }

          /**
           * @param {...EXPECTED_ANY} args args
           */
        }, {
          key: "group",
          value: function group() {
            for (var _len8 = arguments.length, args = new Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {
              args[_key8] = arguments[_key8];
            }
            this[LOG_SYMBOL](LogType.group, args);
          }

          /**
           * @param {...EXPECTED_ANY} args args
           */
        }, {
          key: "groupCollapsed",
          value: function groupCollapsed() {
            for (var _len9 = arguments.length, args = new Array(_len9), _key9 = 0; _key9 < _len9; _key9++) {
              args[_key9] = arguments[_key9];
            }
            this[LOG_SYMBOL](LogType.groupCollapsed, args);
          }
        }, {
          key: "groupEnd",
          value: function groupEnd() {
            this[LOG_SYMBOL](LogType.groupEnd);
          }

          /**
           * @param {string=} label label
           */
        }, {
          key: "profile",
          value: function profile(label) {
            this[LOG_SYMBOL](LogType.profile, [label]);
          }

          /**
           * @param {string=} label label
           */
        }, {
          key: "profileEnd",
          value: function profileEnd(label) {
            this[LOG_SYMBOL](LogType.profileEnd, [label]);
          }

          /**
           * @param {string} label label
           */
        }, {
          key: "time",
          value: function time(label) {
            /** @type {Map<string | undefined, [number, number]>} */
            this[TIMERS_SYMBOL] = this[TIMERS_SYMBOL] || new Map();
            this[TIMERS_SYMBOL].set(label, process.hrtime());
          }

          /**
           * @param {string=} label label
           */
        }, {
          key: "timeLog",
          value: function timeLog(label) {
            var prev = this[TIMERS_SYMBOL] && this[TIMERS_SYMBOL].get(label);
            if (!prev) {
              throw new Error("No such label '".concat(label, "' for WebpackLogger.timeLog()"));
            }
            var time = process.hrtime(prev);
            this[LOG_SYMBOL](LogType.time, [label].concat(_toConsumableArray(time)));
          }

          /**
           * @param {string=} label label
           */
        }, {
          key: "timeEnd",
          value: function timeEnd(label) {
            var prev = this[TIMERS_SYMBOL] && this[TIMERS_SYMBOL].get(label);
            if (!prev) {
              throw new Error("No such label '".concat(label, "' for WebpackLogger.timeEnd()"));
            }
            var time = process.hrtime(prev);
            /** @type {Map<string | undefined, [number, number]>} */
            this[TIMERS_SYMBOL].delete(label);
            this[LOG_SYMBOL](LogType.time, [label].concat(_toConsumableArray(time)));
          }

          /**
           * @param {string=} label label
           */
        }, {
          key: "timeAggregate",
          value: function timeAggregate(label) {
            var prev = this[TIMERS_SYMBOL] && this[TIMERS_SYMBOL].get(label);
            if (!prev) {
              throw new Error("No such label '".concat(label, "' for WebpackLogger.timeAggregate()"));
            }
            var time = process.hrtime(prev);
            /** @type {Map<string | undefined, [number, number]>} */
            this[TIMERS_SYMBOL].delete(label);
            /** @type {Map<string | undefined, [number, number]>} */
            this[TIMERS_AGGREGATES_SYMBOL] = this[TIMERS_AGGREGATES_SYMBOL] || new Map();
            var current = this[TIMERS_AGGREGATES_SYMBOL].get(label);
            if (current !== undefined) {
              if (time[1] + current[1] > 1e9) {
                time[0] += current[0] + 1;
                time[1] = time[1] - 1e9 + current[1];
              } else {
                time[0] += current[0];
                time[1] += current[1];
              }
            }
            this[TIMERS_AGGREGATES_SYMBOL].set(label, time);
          }

          /**
           * @param {string=} label label
           */
        }, {
          key: "timeAggregateEnd",
          value: function timeAggregateEnd(label) {
            if (this[TIMERS_AGGREGATES_SYMBOL] === undefined) return;
            var time = this[TIMERS_AGGREGATES_SYMBOL].get(label);
            if (time === undefined) return;
            this[TIMERS_AGGREGATES_SYMBOL].delete(label);
            this[LOG_SYMBOL](LogType.time, [label].concat(_toConsumableArray(time)));
          }
        }]);
      }();
      module.exports.Logger = WebpackLogger;

      /***/
    }),
    /***/"./node_modules/webpack/lib/logging/createConsoleLogger.js": (
    /*!*****************************************************************!*\
      !*** ./node_modules/webpack/lib/logging/createConsoleLogger.js ***!
      \*****************************************************************/
    /***/
    function (module, __unused_webpack_exports, __nested_webpack_require_15131__) {
      /*
      	MIT License http://www.opensource.org/licenses/mit-license.php
      	Author Tobias Koppers @sokra
      */

      function _slicedToArray(r, e) {
        return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest();
      }
      function _nonIterableRest() {
        throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
      }
      function _iterableToArrayLimit(r, l) {
        var t = null == r ? null : "undefined" != typeof (typeof Symbol !== "undefined" ? Symbol : function (i) {
          return i;
        }) && r[(typeof Symbol !== "undefined" ? Symbol : function (i) {
          return i;
        }).iterator] || r["@@iterator"];
        if (null != t) {
          var e,
            n,
            i,
            u,
            a = [],
            f = !0,
            o = !1;
          try {
            if (i = (t = t.call(r)).next, 0 === l) {
              if (Object(t) !== t) return;
              f = !1;
            } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0);
          } catch (r) {
            o = !0, n = r;
          } finally {
            try {
              if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return;
            } finally {
              if (o) throw n;
            }
          }
          return a;
        }
      }
      function _arrayWithHoles(r) {
        if (Array.isArray(r)) return r;
      }
      function _toConsumableArray(r) {
        return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread();
      }
      function _nonIterableSpread() {
        throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
      }
      function _unsupportedIterableToArray(r, a) {
        if (r) {
          if ("string" == typeof r) return _arrayLikeToArray(r, a);
          var t = {}.toString.call(r).slice(8, -1);
          return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0;
        }
      }
      function _iterableToArray(r) {
        if ("undefined" != typeof (typeof Symbol !== "undefined" ? Symbol : function (i) {
          return i;
        }) && null != r[(typeof Symbol !== "undefined" ? Symbol : function (i) {
          return i;
        }).iterator] || null != r["@@iterator"]) return Array.from(r);
      }
      function _arrayWithoutHoles(r) {
        if (Array.isArray(r)) return _arrayLikeToArray(r);
      }
      function _arrayLikeToArray(r, a) {
        (null == a || a > r.length) && (a = r.length);
        for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
        return n;
      }
      function _typeof(o) {
        "@babel/helpers - typeof";

        return _typeof = "function" == typeof (typeof Symbol !== "undefined" ? Symbol : function (i) {
          return i;
        }) && "symbol" == typeof (typeof Symbol !== "undefined" ? Symbol : function (i) {
          return i;
        }).iterator ? function (o) {
          return typeof o;
        } : function (o) {
          return o && "function" == typeof (typeof Symbol !== "undefined" ? Symbol : function (i) {
            return i;
          }) && o.constructor === (typeof Symbol !== "undefined" ? Symbol : function (i) {
            return i;
          }) && o !== (typeof Symbol !== "undefined" ? Symbol : function (i) {
            return i;
          }).prototype ? "symbol" : typeof o;
        }, _typeof(o);
      }
      var _require = __nested_webpack_require_15131__(/*! ./Logger */"./node_modules/webpack/lib/logging/Logger.js"),
        LogType = _require.LogType;

      /** @typedef {import("../../declarations/WebpackOptions").FilterItemTypes} FilterItemTypes */
      /** @typedef {import("../../declarations/WebpackOptions").FilterTypes} FilterTypes */
      /** @typedef {import("./Logger").LogTypeEnum} LogTypeEnum */

      /** @typedef {(item: string) => boolean} FilterFunction */
      /** @typedef {(value: string, type: LogTypeEnum, args?: EXPECTED_ANY[]) => void} LoggingFunction */

      /**
       * @typedef {object} LoggerConsole
       * @property {() => void} clear
       * @property {() => void} trace
       * @property {(...args: EXPECTED_ANY[]) => void} info
       * @property {(...args: EXPECTED_ANY[]) => void} log
       * @property {(...args: EXPECTED_ANY[]) => void} warn
       * @property {(...args: EXPECTED_ANY[]) => void} error
       * @property {(...args: EXPECTED_ANY[]) => void=} debug
       * @property {(...args: EXPECTED_ANY[]) => void=} group
       * @property {(...args: EXPECTED_ANY[]) => void=} groupCollapsed
       * @property {(...args: EXPECTED_ANY[]) => void=} groupEnd
       * @property {(...args: EXPECTED_ANY[]) => void=} status
       * @property {(...args: EXPECTED_ANY[]) => void=} profile
       * @property {(...args: EXPECTED_ANY[]) => void=} profileEnd
       * @property {(...args: EXPECTED_ANY[]) => void=} logTime
       */

      /**
       * @typedef {object} LoggerOptions
       * @property {false|true|"none"|"error"|"warn"|"info"|"log"|"verbose"} level loglevel
       * @property {FilterTypes|boolean} debug filter for debug logging
       * @property {LoggerConsole} console the console to log to
       */

      /**
       * @param {FilterItemTypes} item an input item
       * @returns {FilterFunction | undefined} filter function
       */
      var filterToFunction = function filterToFunction(item) {
        if (typeof item === "string") {
          var regExp = new RegExp("[\\\\/]".concat(item.replace(/[-[\]{}()*+?.\\^$|]/g, "\\$&"), "([\\\\/]|$|!|\\?)"));
          return function (ident) {
            return regExp.test(ident);
          };
        }
        if (item && _typeof(item) === "object" && typeof item.test === "function") {
          return function (ident) {
            return item.test(ident);
          };
        }
        if (typeof item === "function") {
          return item;
        }
        if (typeof item === "boolean") {
          return function () {
            return item;
          };
        }
      };

      /**
       * @enum {number}
       */
      var LogLevel = {
        none: 6,
        false: 6,
        error: 5,
        warn: 4,
        info: 3,
        log: 2,
        true: 2,
        verbose: 1
      };

      /**
       * @param {LoggerOptions} options options object
       * @returns {LoggingFunction} logging function
       */
      module.exports = function (_ref) {
        var _ref$level = _ref.level,
          level = _ref$level === void 0 ? "info" : _ref$level,
          _ref$debug = _ref.debug,
          debug = _ref$debug === void 0 ? false : _ref$debug,
          console = _ref.console;
        var debugFilters = /** @type {FilterFunction[]} */

        typeof debug === "boolean" ? [function () {
          return debug;
        }] : /** @type {FilterItemTypes[]} */[].concat(debug).map(filterToFunction);
        var loglevel = LogLevel["".concat(level)] || 0;

        /**
         * @param {string} name name of the logger
         * @param {LogTypeEnum} type type of the log entry
         * @param {EXPECTED_ANY[]=} args arguments of the log entry
         * @returns {void}
         */
        var logger = function logger(name, type, args) {
          var labeledArgs = function labeledArgs() {
            if (Array.isArray(args)) {
              if (args.length > 0 && typeof args[0] === "string") {
                return ["[".concat(name, "] ").concat(args[0])].concat(_toConsumableArray(args.slice(1)));
              }
              return ["[".concat(name, "]")].concat(_toConsumableArray(args));
            }
            return [];
          };
          var debug = debugFilters.some(function (f) {
            return f(name);
          });
          switch (type) {
            case LogType.debug:
              if (!debug) return;
              if (typeof console.debug === "function") {
                console.debug.apply(console, _toConsumableArray(labeledArgs()));
              } else {
                console.log.apply(console, _toConsumableArray(labeledArgs()));
              }
              break;
            case LogType.log:
              if (!debug && loglevel > LogLevel.log) return;
              console.log.apply(console, _toConsumableArray(labeledArgs()));
              break;
            case LogType.info:
              if (!debug && loglevel > LogLevel.info) return;
              console.info.apply(console, _toConsumableArray(labeledArgs()));
              break;
            case LogType.warn:
              if (!debug && loglevel > LogLevel.warn) return;
              console.warn.apply(console, _toConsumableArray(labeledArgs()));
              break;
            case LogType.error:
              if (!debug && loglevel > LogLevel.error) return;
              console.error.apply(console, _toConsumableArray(labeledArgs()));
              break;
            case LogType.trace:
              if (!debug) return;
              console.trace();
              break;
            case LogType.groupCollapsed:
              if (!debug && loglevel > LogLevel.log) return;
              if (!debug && loglevel > LogLevel.verbose) {
                if (typeof console.groupCollapsed === "function") {
                  console.groupCollapsed.apply(console, _toConsumableArray(labeledArgs()));
                } else {
                  console.log.apply(console, _toConsumableArray(labeledArgs()));
                }
                break;
              }
            // falls through
            case LogType.group:
              if (!debug && loglevel > LogLevel.log) return;
              if (typeof console.group === "function") {
                console.group.apply(console, _toConsumableArray(labeledArgs()));
              } else {
                console.log.apply(console, _toConsumableArray(labeledArgs()));
              }
              break;
            case LogType.groupEnd:
              if (!debug && loglevel > LogLevel.log) return;
              if (typeof console.groupEnd === "function") {
                console.groupEnd();
              }
              break;
            case LogType.time:
              {
                if (!debug && loglevel > LogLevel.log) return;
                var _args = _slicedToArray(/** @type {[string, number, number]} */
                  args, 3),
                  label = _args[0],
                  start = _args[1],
                  end = _args[2];
                var ms = start * 1000 + end / 1000000;
                var msg = "[".concat(name, "] ").concat(label, ": ").concat(ms, " ms");
                if (typeof console.logTime === "function") {
                  console.logTime(msg);
                } else {
                  console.log(msg);
                }
                break;
              }
            case LogType.profile:
              if (typeof console.profile === "function") {
                console.profile.apply(console, _toConsumableArray(labeledArgs()));
              }
              break;
            case LogType.profileEnd:
              if (typeof console.profileEnd === "function") {
                console.profileEnd.apply(console, _toConsumableArray(labeledArgs()));
              }
              break;
            case LogType.clear:
              if (!debug && loglevel > LogLevel.log) return;
              if (typeof console.clear === "function") {
                console.clear();
              }
              break;
            case LogType.status:
              if (!debug && loglevel > LogLevel.info) return;
              if (typeof console.status === "function") {
                if (!args || args.length === 0) {
                  console.status();
                } else {
                  console.status.apply(console, _toConsumableArray(labeledArgs()));
                }
              } else if (args && args.length !== 0) {
                console.info.apply(console, _toConsumableArray(labeledArgs()));
              }
              break;
            default:
              throw new Error("Unexpected LogType ".concat(type));
          }
        };
        return logger;
      };

      /***/
    }),
    /***/"./node_modules/webpack/lib/logging/runtime.js": (
    /*!*****************************************************!*\
      !*** ./node_modules/webpack/lib/logging/runtime.js ***!
      \*****************************************************/
    /***/
    function (module, __unused_webpack_exports, __nested_webpack_require_27984__) {
      /*
      	MIT License http://www.opensource.org/licenses/mit-license.php
      	Author Tobias Koppers @sokra
      */

      function _extends() {
        return _extends = Object.assign ? Object.assign.bind() : function (n) {
          for (var e = 1; e < arguments.length; e++) {
            var t = arguments[e];
            for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
          }
          return n;
        }, _extends.apply(null, arguments);
      }
      var _require = __nested_webpack_require_27984__(/*! tapable */"./client-src/modules/logger/tapable.js"),
        SyncBailHook = _require.SyncBailHook;
      var _require2 = __nested_webpack_require_27984__(/*! ./Logger */"./node_modules/webpack/lib/logging/Logger.js"),
        Logger = _require2.Logger;
      var createConsoleLogger = __nested_webpack_require_27984__(/*! ./createConsoleLogger */"./node_modules/webpack/lib/logging/createConsoleLogger.js");

      /** @type {createConsoleLogger.LoggerOptions} */
      var currentDefaultLoggerOptions = {
        level: "info",
        debug: false,
        console: console
      };
      var currentDefaultLogger = createConsoleLogger(currentDefaultLoggerOptions);

      /**
       * @param {string} name name of the logger
       * @returns {Logger} a logger
       */
      module.exports.getLogger = function (name) {
        return new Logger(function (type, args) {
          if (module.exports.hooks.log.call(name, type, args) === undefined) {
            currentDefaultLogger(name, type, args);
          }
        }, function (childName) {
          return module.exports.getLogger("".concat(name, "/").concat(childName));
        });
      };

      /**
       * @param {createConsoleLogger.LoggerOptions} options new options, merge with old options
       * @returns {void}
       */
      module.exports.configureDefaultLogger = function (options) {
        _extends(currentDefaultLoggerOptions, options);
        currentDefaultLogger = createConsoleLogger(currentDefaultLoggerOptions);
      };
      module.exports.hooks = {
        log: new SyncBailHook(["origin", "type", "args"])
      };

      /***/
    })

    /******/
  };
  /************************************************************************/
  /******/ // The module cache
  /******/
  var __webpack_module_cache__ = {};
  /******/
  /******/ // The require function
  /******/
  function __nested_webpack_require_30373__(moduleId) {
    /******/ // Check if module is in cache
    /******/var cachedModule = __webpack_module_cache__[moduleId];
    /******/
    if (cachedModule !== undefined) {
      /******/return cachedModule.exports;
      /******/
    }
    /******/ // Create a new module (and put it into the cache)
    /******/
    var module = __webpack_module_cache__[moduleId] = {
      /******/ // no module.id needed
      /******/ // no module.loaded needed
      /******/exports: {}
      /******/
    };
    /******/
    /******/ // Execute the module function
    /******/
    __webpack_modules__[moduleId](module, module.exports, __nested_webpack_require_30373__);
    /******/
    /******/ // Return the exports of the module
    /******/
    return module.exports;
    /******/
  }
  /******/
  /************************************************************************/
  /******/ /* webpack/runtime/define property getters */
  /******/
  !function () {
    /******/ // define getter functions for harmony exports
    /******/__nested_webpack_require_30373__.d = function (exports, definition) {
      /******/for (var key in definition) {
        /******/if (__nested_webpack_require_30373__.o(definition, key) && !__nested_webpack_require_30373__.o(exports, key)) {
          /******/Object.defineProperty(exports, key, {
            enumerable: true,
            get: definition[key]
          });
          /******/
        }
        /******/
      }
      /******/
    };
    /******/
  }();
  /******/
  /******/ /* webpack/runtime/hasOwnProperty shorthand */
  /******/
  !function () {
    /******/__nested_webpack_require_30373__.o = function (obj, prop) {
      return Object.prototype.hasOwnProperty.call(obj, prop);
    };
    /******/
  }();
  /******/
  /******/ /* webpack/runtime/make namespace object */
  /******/
  !function () {
    /******/ // define __esModule on exports
    /******/__nested_webpack_require_30373__.r = function (exports) {
      /******/if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
        /******/Object.defineProperty(exports, Symbol.toStringTag, {
          value: 'Module'
        });
        /******/
      }
      /******/
      Object.defineProperty(exports, '__esModule', {
        value: true
      });
      /******/
    };
    /******/
  }();
  /******/
  /************************************************************************/
  var __nested_webpack_exports__ = {};
  // This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
  !function () {
    /*!********************************************!*\
      !*** ./client-src/modules/logger/index.js ***!
      \********************************************/
    __nested_webpack_require_30373__.r(__nested_webpack_exports__);
    /* harmony export */
    __nested_webpack_require_30373__.d(__nested_webpack_exports__, {
      /* harmony export */"default": function () {
        return /* reexport default export from named module */webpack_lib_logging_runtime_js__WEBPACK_IMPORTED_MODULE_0__;
      }
      /* harmony export */
    });
    /* harmony import */
    var webpack_lib_logging_runtime_js__WEBPACK_IMPORTED_MODULE_0__ = __nested_webpack_require_30373__(/*! webpack/lib/logging/runtime.js */"./node_modules/webpack/lib/logging/runtime.js");
  }();
  var __webpack_export_target__ = exports;
  for (var __webpack_i__ in __nested_webpack_exports__) __webpack_export_target__[__webpack_i__] = __nested_webpack_exports__[__webpack_i__];
  if (__nested_webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", {
    value: true
  });
  /******/
})();

/***/ }),

/***/ "./node_modules/webpack-dev-server/client/overlay.js":
/*!***********************************************************!*\
  !*** ./node_modules/webpack-dev-server/client/overlay.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createOverlay: () => (/* binding */ createOverlay),
/* harmony export */   formatProblem: () => (/* binding */ formatProblem)
/* harmony export */ });
/* harmony import */ var ansi_html_community__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ansi-html-community */ "./node_modules/ansi-html-community/index.js");
/* harmony import */ var ansi_html_community__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(ansi_html_community__WEBPACK_IMPORTED_MODULE_0__);
function _typeof(o) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
    return typeof o;
  } : function (o) {
    return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
  }, _typeof(o);
}
function ownKeys(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function (r) {
      return Object.getOwnPropertyDescriptor(e, r).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys(Object(t), !0).forEach(function (r) {
      _defineProperty(e, r, t[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
    });
  }
  return e;
}
function _defineProperty(e, r, t) {
  return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
    value: t,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[r] = t, e;
}
function _toPropertyKey(t) {
  var i = _toPrimitive(t, "string");
  return "symbol" == _typeof(i) ? i : i + "";
}
function _toPrimitive(t, r) {
  if ("object" != _typeof(t) || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r || "default");
    if ("object" != _typeof(i)) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
// The error overlay is inspired (and mostly copied) from Create React App (https://github.com/facebookincubator/create-react-app)
// They, in turn, got inspired by webpack-hot-middleware (https://github.com/glenjamin/webpack-hot-middleware).



/**
 * @type {(input: string, position: number) => string}
 */
var getCodePoint = String.prototype.codePointAt ? function (input, position) {
  return input.codePointAt(position);
} : function (input, position) {
  return (input.charCodeAt(position) - 0xd800) * 0x400 + input.charCodeAt(position + 1) - 0xdc00 + 0x10000;
};

/**
 * @param {string} macroText
 * @param {RegExp} macroRegExp
 * @param {(input: string) => string} macroReplacer
 * @returns {string}
 */
var replaceUsingRegExp = function replaceUsingRegExp(macroText, macroRegExp, macroReplacer) {
  macroRegExp.lastIndex = 0;
  var replaceMatch = macroRegExp.exec(macroText);
  var replaceResult;
  if (replaceMatch) {
    replaceResult = "";
    var replaceLastIndex = 0;
    do {
      if (replaceLastIndex !== replaceMatch.index) {
        replaceResult += macroText.substring(replaceLastIndex, replaceMatch.index);
      }
      var replaceInput = replaceMatch[0];
      replaceResult += macroReplacer(replaceInput);
      replaceLastIndex = replaceMatch.index + replaceInput.length;
      // eslint-disable-next-line no-cond-assign
    } while (replaceMatch = macroRegExp.exec(macroText));
    if (replaceLastIndex !== macroText.length) {
      replaceResult += macroText.substring(replaceLastIndex);
    }
  } else {
    replaceResult = macroText;
  }
  return replaceResult;
};
var references = {
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&apos;",
  "&": "&amp;"
};

/**
 * @param {string} text text
 * @returns {string}
 */
function encode(text) {
  if (!text) {
    return "";
  }
  return replaceUsingRegExp(text, /[<>'"&]/g, function (input) {
    var result = references[input];
    if (!result) {
      var code = input.length > 1 ? getCodePoint(input, 0) : input.charCodeAt(0);
      result = "&#".concat(code, ";");
    }
    return result;
  });
}

/**
 * @typedef {Object} StateDefinitions
 * @property {{[event: string]: { target: string; actions?: Array<string> }}} [on]
 */

/**
 * @typedef {Object} Options
 * @property {{[state: string]: StateDefinitions}} states
 * @property {object} context;
 * @property {string} initial
 */

/**
 * @typedef {Object} Implementation
 * @property {{[actionName: string]: (ctx: object, event: any) => object}} actions
 */

/**
 * A simplified `createMachine` from `@xstate/fsm` with the following differences:
 *
 *  - the returned machine is technically a "service". No `interpret(machine).start()` is needed.
 *  - the state definition only support `on` and target must be declared with { target: 'nextState', actions: [] } explicitly.
 *  - event passed to `send` must be an object with `type` property.
 *  - actions implementation will be [assign action](https://xstate.js.org/docs/guides/context.html#assign-action) if you return any value.
 *  Do not return anything if you just want to invoke side effect.
 *
 * The goal of this custom function is to avoid installing the entire `'xstate/fsm'` package, while enabling modeling using
 * state machine. You can copy the first parameter into the editor at https://stately.ai/viz to visualize the state machine.
 *
 * @param {Options} options
 * @param {Implementation} implementation
 */
function createMachine(_ref, _ref2) {
  var states = _ref.states,
    context = _ref.context,
    initial = _ref.initial;
  var actions = _ref2.actions;
  var currentState = initial;
  var currentContext = context;
  return {
    send: function send(event) {
      var currentStateOn = states[currentState].on;
      var transitionConfig = currentStateOn && currentStateOn[event.type];
      if (transitionConfig) {
        currentState = transitionConfig.target;
        if (transitionConfig.actions) {
          transitionConfig.actions.forEach(function (actName) {
            var actionImpl = actions[actName];
            var nextContextValue = actionImpl && actionImpl(currentContext, event);
            if (nextContextValue) {
              currentContext = _objectSpread(_objectSpread({}, currentContext), nextContextValue);
            }
          });
        }
      }
    }
  };
}

/**
 * @typedef {Object} ShowOverlayData
 * @property {'warning' | 'error'} level
 * @property {Array<string  | { moduleIdentifier?: string, moduleName?: string, loc?: string, message?: string }>} messages
 * @property {'build' | 'runtime'} messageSource
 */

/**
 * @typedef {Object} CreateOverlayMachineOptions
 * @property {(data: ShowOverlayData) => void} showOverlay
 * @property {() => void} hideOverlay
 */

/**
 * @param {CreateOverlayMachineOptions} options
 */
var createOverlayMachine = function createOverlayMachine(options) {
  var hideOverlay = options.hideOverlay,
    showOverlay = options.showOverlay;
  return createMachine({
    initial: "hidden",
    context: {
      level: "error",
      messages: [],
      messageSource: "build"
    },
    states: {
      hidden: {
        on: {
          BUILD_ERROR: {
            target: "displayBuildError",
            actions: ["setMessages", "showOverlay"]
          },
          RUNTIME_ERROR: {
            target: "displayRuntimeError",
            actions: ["setMessages", "showOverlay"]
          }
        }
      },
      displayBuildError: {
        on: {
          DISMISS: {
            target: "hidden",
            actions: ["dismissMessages", "hideOverlay"]
          },
          BUILD_ERROR: {
            target: "displayBuildError",
            actions: ["appendMessages", "showOverlay"]
          }
        }
      },
      displayRuntimeError: {
        on: {
          DISMISS: {
            target: "hidden",
            actions: ["dismissMessages", "hideOverlay"]
          },
          RUNTIME_ERROR: {
            target: "displayRuntimeError",
            actions: ["appendMessages", "showOverlay"]
          },
          BUILD_ERROR: {
            target: "displayBuildError",
            actions: ["setMessages", "showOverlay"]
          }
        }
      }
    }
  }, {
    actions: {
      dismissMessages: function dismissMessages() {
        return {
          messages: [],
          level: "error",
          messageSource: "build"
        };
      },
      appendMessages: function appendMessages(context, event) {
        return {
          messages: context.messages.concat(event.messages),
          level: event.level || context.level,
          messageSource: event.type === "RUNTIME_ERROR" ? "runtime" : "build"
        };
      },
      setMessages: function setMessages(context, event) {
        return {
          messages: event.messages,
          level: event.level || context.level,
          messageSource: event.type === "RUNTIME_ERROR" ? "runtime" : "build"
        };
      },
      hideOverlay: hideOverlay,
      showOverlay: showOverlay
    }
  });
};

/**
 *
 * @param {Error} error
 */
var parseErrorToStacks = function parseErrorToStacks(error) {
  if (!error || !(error instanceof Error)) {
    throw new Error("parseErrorToStacks expects Error object");
  }
  if (typeof error.stack === "string") {
    return error.stack.split("\n").filter(function (stack) {
      return stack !== "Error: ".concat(error.message);
    });
  }
};

/**
 * @callback ErrorCallback
 * @param {ErrorEvent} error
 * @returns {void}
 */

/**
 * @param {ErrorCallback} callback
 */
var listenToRuntimeError = function listenToRuntimeError(callback) {
  window.addEventListener("error", callback);
  return function cleanup() {
    window.removeEventListener("error", callback);
  };
};

/**
 * @callback UnhandledRejectionCallback
 * @param {PromiseRejectionEvent} rejectionEvent
 * @returns {void}
 */

/**
 * @param {UnhandledRejectionCallback} callback
 */
var listenToUnhandledRejection = function listenToUnhandledRejection(callback) {
  window.addEventListener("unhandledrejection", callback);
  return function cleanup() {
    window.removeEventListener("unhandledrejection", callback);
  };
};

// Styles are inspired by `react-error-overlay`

var msgStyles = {
  error: {
    backgroundColor: "rgba(206, 17, 38, 0.1)",
    color: "#fccfcf"
  },
  warning: {
    backgroundColor: "rgba(251, 245, 180, 0.1)",
    color: "#fbf5b4"
  }
};
var iframeStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  width: "100vw",
  height: "100vh",
  border: "none",
  "z-index": 9999999999
};
var containerStyle = {
  position: "fixed",
  boxSizing: "border-box",
  left: 0,
  top: 0,
  right: 0,
  bottom: 0,
  width: "100vw",
  height: "100vh",
  fontSize: "large",
  padding: "2rem 2rem 4rem 2rem",
  lineHeight: "1.2",
  whiteSpace: "pre-wrap",
  overflow: "auto",
  backgroundColor: "rgba(0, 0, 0, 0.9)",
  color: "white"
};
var headerStyle = {
  color: "#e83b46",
  fontSize: "2em",
  whiteSpace: "pre-wrap",
  fontFamily: "sans-serif",
  margin: "0 2rem 2rem 0",
  flex: "0 0 auto",
  maxHeight: "50%",
  overflow: "auto"
};
var dismissButtonStyle = {
  color: "#ffffff",
  lineHeight: "1rem",
  fontSize: "1.5rem",
  padding: "1rem",
  cursor: "pointer",
  position: "absolute",
  right: 0,
  top: 0,
  backgroundColor: "transparent",
  border: "none"
};
var msgTypeStyle = {
  color: "#e83b46",
  fontSize: "1.2em",
  marginBottom: "1rem",
  fontFamily: "sans-serif"
};
var msgTextStyle = {
  lineHeight: "1.5",
  fontSize: "1rem",
  fontFamily: "Menlo, Consolas, monospace"
};

// ANSI HTML

var colors = {
  reset: ["transparent", "transparent"],
  black: "181818",
  red: "E36049",
  green: "B3CB74",
  yellow: "FFD080",
  blue: "7CAFC2",
  magenta: "7FACCA",
  cyan: "C3C2EF",
  lightgrey: "EBE7E3",
  darkgrey: "6D7891"
};
ansi_html_community__WEBPACK_IMPORTED_MODULE_0___default().setColors(colors);

/**
 * @param {string} type
 * @param {string  | { file?: string, moduleName?: string, loc?: string, message?: string; stack?: string[] }} item
 * @returns {{ header: string, body: string }}
 */
var formatProblem = function formatProblem(type, item) {
  var header = type === "warning" ? "WARNING" : "ERROR";
  var body = "";
  if (typeof item === "string") {
    body += item;
  } else {
    var file = item.file || "";
    // eslint-disable-next-line no-nested-ternary
    var moduleName = item.moduleName ? item.moduleName.indexOf("!") !== -1 ? "".concat(item.moduleName.replace(/^(\s|\S)*!/, ""), " (").concat(item.moduleName, ")") : "".concat(item.moduleName) : "";
    var loc = item.loc;
    header += "".concat(moduleName || file ? " in ".concat(moduleName ? "".concat(moduleName).concat(file ? " (".concat(file, ")") : "") : file).concat(loc ? " ".concat(loc) : "") : "");
    body += item.message || "";
  }
  if (Array.isArray(item.stack)) {
    item.stack.forEach(function (stack) {
      if (typeof stack === "string") {
        body += "\r\n".concat(stack);
      }
    });
  }
  return {
    header: header,
    body: body
  };
};

/**
 * @typedef {Object} CreateOverlayOptions
 * @property {string | null} trustedTypesPolicyName
 * @property {boolean | (error: Error) => void} [catchRuntimeError]
 */

/**
 *
 * @param {CreateOverlayOptions} options
 */
var createOverlay = function createOverlay(options) {
  /** @type {HTMLIFrameElement | null | undefined} */
  var iframeContainerElement;
  /** @type {HTMLDivElement | null | undefined} */
  var containerElement;
  /** @type {HTMLDivElement | null | undefined} */
  var headerElement;
  /** @type {Array<(element: HTMLDivElement) => void>} */
  var onLoadQueue = [];
  /** @type {TrustedTypePolicy | undefined} */
  var overlayTrustedTypesPolicy;

  /**
   *
   * @param {HTMLElement} element
   * @param {CSSStyleDeclaration} style
   */
  function applyStyle(element, style) {
    Object.keys(style).forEach(function (prop) {
      element.style[prop] = style[prop];
    });
  }

  /**
   * @param {string | null} trustedTypesPolicyName
   */
  function createContainer(trustedTypesPolicyName) {
    // Enable Trusted Types if they are available in the current browser.
    if (window.trustedTypes) {
      overlayTrustedTypesPolicy = window.trustedTypes.createPolicy(trustedTypesPolicyName || "webpack-dev-server#overlay", {
        createHTML: function createHTML(value) {
          return value;
        }
      });
    }
    iframeContainerElement = document.createElement("iframe");
    iframeContainerElement.id = "webpack-dev-server-client-overlay";
    iframeContainerElement.src = "about:blank";
    applyStyle(iframeContainerElement, iframeStyle);
    iframeContainerElement.onload = function () {
      var contentElement = /** @type {Document} */
      (/** @type {HTMLIFrameElement} */
      iframeContainerElement.contentDocument).createElement("div");
      containerElement = /** @type {Document} */
      (/** @type {HTMLIFrameElement} */
      iframeContainerElement.contentDocument).createElement("div");
      contentElement.id = "webpack-dev-server-client-overlay-div";
      applyStyle(contentElement, containerStyle);
      headerElement = document.createElement("div");
      headerElement.innerText = "Compiled with problems:";
      applyStyle(headerElement, headerStyle);
      var closeButtonElement = document.createElement("button");
      applyStyle(closeButtonElement, dismissButtonStyle);
      closeButtonElement.innerText = "×";
      closeButtonElement.ariaLabel = "Dismiss";
      closeButtonElement.addEventListener("click", function () {
        // eslint-disable-next-line no-use-before-define
        overlayService.send({
          type: "DISMISS"
        });
      });
      contentElement.appendChild(headerElement);
      contentElement.appendChild(closeButtonElement);
      contentElement.appendChild(containerElement);

      /** @type {Document} */
      (/** @type {HTMLIFrameElement} */
      iframeContainerElement.contentDocument).body.appendChild(contentElement);
      onLoadQueue.forEach(function (onLoad) {
        onLoad(/** @type {HTMLDivElement} */contentElement);
      });
      onLoadQueue = [];

      /** @type {HTMLIFrameElement} */
      iframeContainerElement.onload = null;
    };
    document.body.appendChild(iframeContainerElement);
  }

  /**
   * @param {(element: HTMLDivElement) => void} callback
   * @param {string | null} trustedTypesPolicyName
   */
  function ensureOverlayExists(callback, trustedTypesPolicyName) {
    if (containerElement) {
      containerElement.innerHTML = overlayTrustedTypesPolicy ? overlayTrustedTypesPolicy.createHTML("") : "";
      // Everything is ready, call the callback right away.
      callback(containerElement);
      return;
    }
    onLoadQueue.push(callback);
    if (iframeContainerElement) {
      return;
    }
    createContainer(trustedTypesPolicyName);
  }

  // Successful compilation.
  function hide() {
    if (!iframeContainerElement) {
      return;
    }

    // Clean up and reset internal state.
    document.body.removeChild(iframeContainerElement);
    iframeContainerElement = null;
    containerElement = null;
  }

  // Compilation with errors (e.g. syntax error or missing modules).
  /**
   * @param {string} type
   * @param {Array<string  | { moduleIdentifier?: string, moduleName?: string, loc?: string, message?: string }>} messages
   * @param {string | null} trustedTypesPolicyName
   * @param {'build' | 'runtime'} messageSource
   */
  function show(type, messages, trustedTypesPolicyName, messageSource) {
    ensureOverlayExists(function () {
      headerElement.innerText = messageSource === "runtime" ? "Uncaught runtime errors:" : "Compiled with problems:";
      messages.forEach(function (message) {
        var entryElement = document.createElement("div");
        var msgStyle = type === "warning" ? msgStyles.warning : msgStyles.error;
        applyStyle(entryElement, _objectSpread(_objectSpread({}, msgStyle), {}, {
          padding: "1rem 1rem 1.5rem 1rem"
        }));
        var typeElement = document.createElement("div");
        var _formatProblem = formatProblem(type, message),
          header = _formatProblem.header,
          body = _formatProblem.body;
        typeElement.innerText = header;
        applyStyle(typeElement, msgTypeStyle);
        if (message.moduleIdentifier) {
          applyStyle(typeElement, {
            cursor: "pointer"
          });
          // element.dataset not supported in IE
          typeElement.setAttribute("data-can-open", true);
          typeElement.addEventListener("click", function () {
            fetch("/webpack-dev-server/open-editor?fileName=".concat(message.moduleIdentifier));
          });
        }

        // Make it look similar to our terminal.
        var text = ansi_html_community__WEBPACK_IMPORTED_MODULE_0___default()(encode(body));
        var messageTextNode = document.createElement("div");
        applyStyle(messageTextNode, msgTextStyle);
        messageTextNode.innerHTML = overlayTrustedTypesPolicy ? overlayTrustedTypesPolicy.createHTML(text) : text;
        entryElement.appendChild(typeElement);
        entryElement.appendChild(messageTextNode);

        /** @type {HTMLDivElement} */
        containerElement.appendChild(entryElement);
      });
    }, trustedTypesPolicyName);
  }
  var overlayService = createOverlayMachine({
    showOverlay: function showOverlay(_ref3) {
      var _ref3$level = _ref3.level,
        level = _ref3$level === void 0 ? "error" : _ref3$level,
        messages = _ref3.messages,
        messageSource = _ref3.messageSource;
      return show(level, messages, options.trustedTypesPolicyName, messageSource);
    },
    hideOverlay: hide
  });
  if (options.catchRuntimeError) {
    /**
     * @param {Error | undefined} error
     * @param {string} fallbackMessage
     */
    var handleError = function handleError(error, fallbackMessage) {
      var errorObject = error instanceof Error ? error : new Error(error || fallbackMessage);
      var shouldDisplay = typeof options.catchRuntimeError === "function" ? options.catchRuntimeError(errorObject) : true;
      if (shouldDisplay) {
        overlayService.send({
          type: "RUNTIME_ERROR",
          messages: [{
            message: errorObject.message,
            stack: parseErrorToStacks(errorObject)
          }]
        });
      }
    };
    listenToRuntimeError(function (errorEvent) {
      // error property may be empty in older browser like IE
      var error = errorEvent.error,
        message = errorEvent.message;
      if (!error && !message) {
        return;
      }

      // if error stack indicates a React error boundary caught the error, do not show overlay.
      if (error && error.stack && error.stack.includes("invokeGuardedCallbackDev")) {
        return;
      }
      handleError(error, message);
    });
    listenToUnhandledRejection(function (promiseRejectionEvent) {
      var reason = promiseRejectionEvent.reason;
      handleError(reason, "Unknown promise rejection reason");
    });
  }
  return overlayService;
};


/***/ }),

/***/ "./node_modules/webpack-dev-server/client/progress.js":
/*!************************************************************!*\
  !*** ./node_modules/webpack-dev-server/client/progress.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   defineProgressElement: () => (/* binding */ defineProgressElement),
/* harmony export */   isProgressSupported: () => (/* binding */ isProgressSupported)
/* harmony export */ });
function _typeof(o) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
    return typeof o;
  } : function (o) {
    return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
  }, _typeof(o);
}
function _classCallCheck(a, n) {
  if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function");
}
function _defineProperties(e, r) {
  for (var t = 0; t < r.length; t++) {
    var o = r[t];
    o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o);
  }
}
function _createClass(e, r, t) {
  return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", {
    writable: !1
  }), e;
}
function _toPropertyKey(t) {
  var i = _toPrimitive(t, "string");
  return "symbol" == _typeof(i) ? i : i + "";
}
function _toPrimitive(t, r) {
  if ("object" != _typeof(t) || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r || "default");
    if ("object" != _typeof(i)) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
function _callSuper(t, o, e) {
  return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e));
}
function _possibleConstructorReturn(t, e) {
  if (e && ("object" == _typeof(e) || "function" == typeof e)) return e;
  if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined");
  return _assertThisInitialized(t);
}
function _assertThisInitialized(e) {
  if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function _inherits(t, e) {
  if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
  t.prototype = Object.create(e && e.prototype, {
    constructor: {
      value: t,
      writable: !0,
      configurable: !0
    }
  }), Object.defineProperty(t, "prototype", {
    writable: !1
  }), e && _setPrototypeOf(t, e);
}
function _wrapNativeSuper(t) {
  var r = "function" == typeof Map ? new Map() : void 0;
  return _wrapNativeSuper = function _wrapNativeSuper(t) {
    if (null === t || !_isNativeFunction(t)) return t;
    if ("function" != typeof t) throw new TypeError("Super expression must either be null or a function");
    if (void 0 !== r) {
      if (r.has(t)) return r.get(t);
      r.set(t, Wrapper);
    }
    function Wrapper() {
      return _construct(t, arguments, _getPrototypeOf(this).constructor);
    }
    return Wrapper.prototype = Object.create(t.prototype, {
      constructor: {
        value: Wrapper,
        enumerable: !1,
        writable: !0,
        configurable: !0
      }
    }), _setPrototypeOf(Wrapper, t);
  }, _wrapNativeSuper(t);
}
function _construct(t, e, r) {
  if (_isNativeReflectConstruct()) return Reflect.construct.apply(null, arguments);
  var o = [null];
  o.push.apply(o, e);
  var p = new (t.bind.apply(t, o))();
  return r && _setPrototypeOf(p, r.prototype), p;
}
function _isNativeReflectConstruct() {
  try {
    var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
  } catch (t) {}
  return (_isNativeReflectConstruct = function _isNativeReflectConstruct() {
    return !!t;
  })();
}
function _isNativeFunction(t) {
  try {
    return -1 !== Function.toString.call(t).indexOf("[native code]");
  } catch (n) {
    return "function" == typeof t;
  }
}
function _setPrototypeOf(t, e) {
  return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) {
    return t.__proto__ = e, t;
  }, _setPrototypeOf(t, e);
}
function _getPrototypeOf(t) {
  return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) {
    return t.__proto__ || Object.getPrototypeOf(t);
  }, _getPrototypeOf(t);
}
function _classPrivateMethodInitSpec(e, a) {
  _checkPrivateRedeclaration(e, a), a.add(e);
}
function _checkPrivateRedeclaration(e, t) {
  if (t.has(e)) throw new TypeError("Cannot initialize the same private elements twice on an object");
}
function _assertClassBrand(e, t, n) {
  if ("function" == typeof e ? e === t : e.has(t)) return arguments.length < 3 ? t : n;
  throw new TypeError("Private element is not present on this object");
}
function isProgressSupported() {
  return "customElements" in self && !!HTMLElement.prototype.attachShadow;
}
function defineProgressElement() {
  var _WebpackDevServerProgress;
  if (customElements.get("wds-progress")) {
    return;
  }
  var _WebpackDevServerProgress_brand = /*#__PURE__*/new WeakSet();
  var WebpackDevServerProgress = /*#__PURE__*/function (_HTMLElement) {
    function WebpackDevServerProgress() {
      var _this;
      _classCallCheck(this, WebpackDevServerProgress);
      _this = _callSuper(this, WebpackDevServerProgress);
      _classPrivateMethodInitSpec(_this, _WebpackDevServerProgress_brand);
      _this.attachShadow({
        mode: "open"
      });
      _this.maxDashOffset = -219.99078369140625;
      _this.animationTimer = null;
      return _this;
    }
    _inherits(WebpackDevServerProgress, _HTMLElement);
    return _createClass(WebpackDevServerProgress, [{
      key: "connectedCallback",
      value: function connectedCallback() {
        _assertClassBrand(_WebpackDevServerProgress_brand, this, _reset).call(this);
      }
    }, {
      key: "attributeChangedCallback",
      value: function attributeChangedCallback(name, oldValue, newValue) {
        if (name === "progress") {
          _assertClassBrand(_WebpackDevServerProgress_brand, this, _update).call(this, Number(newValue));
        } else if (name === "type") {
          _assertClassBrand(_WebpackDevServerProgress_brand, this, _reset).call(this);
        }
      }
    }], [{
      key: "observedAttributes",
      get: function get() {
        return ["progress", "type"];
      }
    }]);
  }(/*#__PURE__*/_wrapNativeSuper(HTMLElement));
  _WebpackDevServerProgress = WebpackDevServerProgress;
  function _reset() {
    var _this$getAttribute, _Number;
    clearTimeout(this.animationTimer);
    this.animationTimer = null;
    var typeAttr = (_this$getAttribute = this.getAttribute("type")) === null || _this$getAttribute === void 0 ? void 0 : _this$getAttribute.toLowerCase();
    this.type = typeAttr === "circular" ? "circular" : "linear";
    var innerHTML = this.type === "circular" ? _circularTemplate.call(_WebpackDevServerProgress) : _linearTemplate.call(_WebpackDevServerProgress);
    this.shadowRoot.innerHTML = innerHTML;
    this.initialProgress = (_Number = Number(this.getAttribute("progress"))) !== null && _Number !== void 0 ? _Number : 0;
    _assertClassBrand(_WebpackDevServerProgress_brand, this, _update).call(this, this.initialProgress);
  }
  function _circularTemplate() {
    return "\n        <style>\n        :host {\n            width: 200px;\n            height: 200px;\n            position: fixed;\n            right: 5%;\n            top: 5%;\n            transition: opacity .25s ease-in-out;\n            z-index: 2147483645;\n        }\n\n        circle {\n            fill: #282d35;\n        }\n\n        path {\n            fill: rgba(0, 0, 0, 0);\n            stroke: rgb(186, 223, 172);\n            stroke-dasharray: 219.99078369140625;\n            stroke-dashoffset: -219.99078369140625;\n            stroke-width: 10;\n            transform: rotate(90deg) translate(0px, -80px);\n        }\n\n        text {\n            font-family: 'Open Sans', sans-serif;\n            font-size: 18px;\n            fill: #ffffff;\n            dominant-baseline: middle;\n            text-anchor: middle;\n        }\n\n        tspan#percent-super {\n            fill: #bdc3c7;\n            font-size: 0.45em;\n            baseline-shift: 10%;\n        }\n\n        @keyframes fade {\n            0% { opacity: 1; transform: scale(1); }\n            100% { opacity: 0; transform: scale(0); }\n        }\n\n        .disappear {\n            animation: fade 0.3s;\n            animation-fill-mode: forwards;\n            animation-delay: 0.5s;\n        }\n\n        .hidden {\n            display: none;\n        }\n        </style>\n        <svg id=\"progress\" class=\"hidden noselect\" viewBox=\"0 0 80 80\">\n        <circle cx=\"50%\" cy=\"50%\" r=\"35\"></circle>\n        <path d=\"M5,40a35,35 0 1,0 70,0a35,35 0 1,0 -70,0\"></path>\n        <text x=\"50%\" y=\"51%\">\n            <tspan id=\"percent-value\">0</tspan>\n            <tspan id=\"percent-super\">%</tspan>\n        </text>\n        </svg>\n      ";
  }
  function _linearTemplate() {
    return "\n        <style>\n        :host {\n            position: fixed;\n            top: 0;\n            left: 0;\n            height: 4px;\n            width: 100vw;\n            z-index: 2147483645;\n        }\n\n        #bar {\n            width: 0%;\n            height: 4px;\n            background-color: rgb(186, 223, 172);\n        }\n\n        @keyframes fade {\n            0% { opacity: 1; }\n            100% { opacity: 0; }\n        }\n\n        .disappear {\n            animation: fade 0.3s;\n            animation-fill-mode: forwards;\n            animation-delay: 0.5s;\n        }\n\n        .hidden {\n            display: none;\n        }\n        </style>\n        <div id=\"progress\"></div>\n        ";
  }
  function _update(percent) {
    var element = this.shadowRoot.querySelector("#progress");
    if (this.type === "circular") {
      var path = this.shadowRoot.querySelector("path");
      var value = this.shadowRoot.querySelector("#percent-value");
      var offset = (100 - percent) / 100 * this.maxDashOffset;
      path.style.strokeDashoffset = offset;
      value.textContent = percent;
    } else {
      element.style.width = "".concat(percent, "%");
    }
    if (percent >= 100) {
      _assertClassBrand(_WebpackDevServerProgress_brand, this, _hide).call(this);
    } else if (percent > 0) {
      _assertClassBrand(_WebpackDevServerProgress_brand, this, _show).call(this);
    }
  }
  function _show() {
    var element = this.shadowRoot.querySelector("#progress");
    element.classList.remove("hidden");
  }
  function _hide() {
    var _this2 = this;
    var element = this.shadowRoot.querySelector("#progress");
    if (this.type === "circular") {
      element.classList.add("disappear");
      element.addEventListener("animationend", function () {
        element.classList.add("hidden");
        _assertClassBrand(_WebpackDevServerProgress_brand, _this2, _update).call(_this2, 0);
      }, {
        once: true
      });
    } else if (this.type === "linear") {
      element.classList.add("disappear");
      this.animationTimer = setTimeout(function () {
        element.classList.remove("disappear");
        element.classList.add("hidden");
        element.style.width = "0%";
        _this2.animationTimer = null;
      }, 800);
    }
  }
  customElements.define("wds-progress", WebpackDevServerProgress);
}

/***/ }),

/***/ "./node_modules/webpack-dev-server/client/socket.js":
/*!**********************************************************!*\
  !*** ./node_modules/webpack-dev-server/client/socket.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   client: () => (/* binding */ client),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _clients_WebSocketClient_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./clients/WebSocketClient.js */ "./node_modules/webpack-dev-server/client/clients/WebSocketClient.js");
/* harmony import */ var _utils_log_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils/log.js */ "./node_modules/webpack-dev-server/client/utils/log.js");
/* provided dependency */ var __webpack_dev_server_client__ = __webpack_require__(/*! ./node_modules/webpack-dev-server/client/clients/WebSocketClient.js */ "./node_modules/webpack-dev-server/client/clients/WebSocketClient.js");
/* global __webpack_dev_server_client__ */




// this WebsocketClient is here as a default fallback, in case the client is not injected
/* eslint-disable camelcase */
var Client =
// eslint-disable-next-line no-nested-ternary
typeof __webpack_dev_server_client__ !== "undefined" ? typeof __webpack_dev_server_client__.default !== "undefined" ? __webpack_dev_server_client__.default : __webpack_dev_server_client__ : _clients_WebSocketClient_js__WEBPACK_IMPORTED_MODULE_0__["default"];
/* eslint-enable camelcase */

var retries = 0;
var maxRetries = 10;

// Initialized client is exported so external consumers can utilize the same instance
// It is mutable to enforce singleton
// eslint-disable-next-line import/no-mutable-exports
var client = null;
var timeout;

/**
 * @param {string} url
 * @param {{ [handler: string]: (data?: any, params?: any) => any }} handlers
 * @param {number} [reconnect]
 */
var socket = function initSocket(url, handlers, reconnect) {
  client = new Client(url);
  client.onOpen(function () {
    retries = 0;
    if (timeout) {
      clearTimeout(timeout);
    }
    if (typeof reconnect !== "undefined") {
      maxRetries = reconnect;
    }
  });
  client.onClose(function () {
    if (retries === 0) {
      handlers.close();
    }

    // Try to reconnect.
    client = null;

    // After 10 retries stop trying, to prevent logspam.
    if (retries < maxRetries) {
      // Exponentially increase timeout to reconnect.
      // Respectfully copied from the package `got`.
      // eslint-disable-next-line no-restricted-properties
      var retryInMs = 1000 * Math.pow(2, retries) + Math.random() * 100;
      retries += 1;
      _utils_log_js__WEBPACK_IMPORTED_MODULE_1__.log.info("Trying to reconnect...");
      timeout = setTimeout(function () {
        socket(url, handlers, reconnect);
      }, retryInMs);
    }
  });
  client.onMessage(
  /**
   * @param {any} data
   */
  function (data) {
    var message = JSON.parse(data);
    if (handlers[message.type]) {
      handlers[message.type](message.data, message.params);
    }
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (socket);

/***/ }),

/***/ "./node_modules/webpack-dev-server/client/utils/log.js":
/*!*************************************************************!*\
  !*** ./node_modules/webpack-dev-server/client/utils/log.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   log: () => (/* binding */ log),
/* harmony export */   setLogLevel: () => (/* binding */ setLogLevel)
/* harmony export */ });
/* harmony import */ var _modules_logger_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../modules/logger/index.js */ "./node_modules/webpack-dev-server/client/modules/logger/index.js");
/* harmony import */ var _modules_logger_index_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_modules_logger_index_js__WEBPACK_IMPORTED_MODULE_0__);

var name = "webpack-dev-server";
// default level is set on the client side, so it does not need
// to be set by the CLI or API
var defaultLevel = "info";

// options new options, merge with old options
/**
 * @param {false | true | "none" | "error" | "warn" | "info" | "log" | "verbose"} level
 * @returns {void}
 */
function setLogLevel(level) {
  _modules_logger_index_js__WEBPACK_IMPORTED_MODULE_0___default().configureDefaultLogger({
    level: level
  });
}
setLogLevel(defaultLevel);
var log = _modules_logger_index_js__WEBPACK_IMPORTED_MODULE_0___default().getLogger(name);


/***/ }),

/***/ "./node_modules/webpack-dev-server/client/utils/sendMessage.js":
/*!*********************************************************************!*\
  !*** ./node_modules/webpack-dev-server/client/utils/sendMessage.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* global __resourceQuery WorkerGlobalScope */

// Send messages to the outside, so plugins can consume it.
/**
 * @param {string} type
 * @param {any} [data]
 */
function sendMsg(type, data) {
  if (typeof self !== "undefined" && (typeof WorkerGlobalScope === "undefined" || !(self instanceof WorkerGlobalScope))) {
    self.postMessage({
      type: "webpack".concat(type),
      data: data
    }, "*");
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (sendMsg);

/***/ }),

/***/ "./node_modules/webpack/hot/dev-server.js":
/*!************************************************!*\
  !*** ./node_modules/webpack/hot/dev-server.js ***!
  \************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
/* globals __webpack_hash__ */
if (true) {
  /** @type {undefined|string} */
  var lastHash;
  var upToDate = function upToDate() {
    return /** @type {string} */lastHash.indexOf(__webpack_require__.h()) >= 0;
  };
  var log = __webpack_require__(/*! ./log */ "./node_modules/webpack/hot/log.js");
  var check = function check() {
    module.hot.check(true).then(function (updatedModules) {
      if (!updatedModules) {
        log("warning", "[HMR] Cannot find update. " + (typeof window !== "undefined" ? "Need to do a full reload!" : "Please reload manually!"));
        log("warning", "[HMR] (Probably because of restarting the webpack-dev-server)");
        if (typeof window !== "undefined") {
          window.location.reload();
        }
        return;
      }
      if (!upToDate()) {
        check();
      }
      __webpack_require__(/*! ./log-apply-result */ "./node_modules/webpack/hot/log-apply-result.js")(updatedModules, updatedModules);
      if (upToDate()) {
        log("info", "[HMR] App is up to date.");
      }
    }).catch(function (err) {
      var status = module.hot.status();
      if (["abort", "fail"].indexOf(status) >= 0) {
        log("warning", "[HMR] Cannot apply update. " + (typeof window !== "undefined" ? "Need to do a full reload!" : "Please reload manually!"));
        log("warning", "[HMR] " + log.formatError(err));
        if (typeof window !== "undefined") {
          window.location.reload();
        }
      } else {
        log("warning", "[HMR] Update failed: " + log.formatError(err));
      }
    });
  };
  var hotEmitter = __webpack_require__(/*! ./emitter */ "./node_modules/webpack/hot/emitter.js");
  hotEmitter.on("webpackHotUpdate", function (currentHash) {
    lastHash = currentHash;
    if (!upToDate() && module.hot.status() === "idle") {
      log("info", "[HMR] Checking for updates on the server...");
      check();
    }
  });
  log("info", "[HMR] Waiting for update signal from WDS...");
} else // removed by dead control flow
{}

/***/ }),

/***/ "./node_modules/webpack/hot/emitter.js":
/*!*********************************************!*\
  !*** ./node_modules/webpack/hot/emitter.js ***!
  \*********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var EventEmitter = __webpack_require__(/*! events */ "./node_modules/events/events.js");
module.exports = new EventEmitter();

/***/ }),

/***/ "./node_modules/webpack/hot/log-apply-result.js":
/*!******************************************************!*\
  !*** ./node_modules/webpack/hot/log-apply-result.js ***!
  \******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

/**
 * @param {(string | number)[]} updatedModules updated modules
 * @param {(string | number)[] | null} renewedModules renewed modules
 */
module.exports = function (updatedModules, renewedModules) {
  var unacceptedModules = updatedModules.filter(function (moduleId) {
    return renewedModules && renewedModules.indexOf(moduleId) < 0;
  });
  var log = __webpack_require__(/*! ./log */ "./node_modules/webpack/hot/log.js");
  if (unacceptedModules.length > 0) {
    log("warning", "[HMR] The following modules couldn't be hot updated: (They would need a full reload!)");
    unacceptedModules.forEach(function (moduleId) {
      log("warning", "[HMR]  - " + moduleId);
    });
  }
  if (!renewedModules || renewedModules.length === 0) {
    log("info", "[HMR] Nothing hot updated.");
  } else {
    log("info", "[HMR] Updated modules:");
    renewedModules.forEach(function (moduleId) {
      if (typeof moduleId === "string" && moduleId.indexOf("!") !== -1) {
        var parts = moduleId.split("!");
        log.groupCollapsed("info", "[HMR]  - " + parts.pop());
        log("info", "[HMR]  - " + moduleId);
        log.groupEnd("info");
      } else {
        log("info", "[HMR]  - " + moduleId);
      }
    });
    var numberIds = renewedModules.every(function (moduleId) {
      return typeof moduleId === "number";
    });
    if (numberIds) log("info", '[HMR] Consider using the optimization.moduleIds: "named" for module names.');
  }
};

/***/ }),

/***/ "./node_modules/webpack/hot/log.js":
/*!*****************************************!*\
  !*** ./node_modules/webpack/hot/log.js ***!
  \*****************************************/
/***/ ((module) => {

/** @typedef {"info" | "warning" | "error"} LogLevel */

/** @type {LogLevel} */
var logLevel = "info";
function dummy() {}

/**
 * @param {LogLevel} level log level
 * @returns {boolean} true, if should log
 */
function shouldLog(level) {
  var shouldLog = logLevel === "info" && level === "info" || ["info", "warning"].indexOf(logLevel) >= 0 && level === "warning" || ["info", "warning", "error"].indexOf(logLevel) >= 0 && level === "error";
  return shouldLog;
}

/**
 * @param {(msg?: string) => void} logFn log function
 * @returns {(level: LogLevel, msg?: string) => void} function that logs when log level is sufficient
 */
function logGroup(logFn) {
  return function (level, msg) {
    if (shouldLog(level)) {
      logFn(msg);
    }
  };
}

/**
 * @param {LogLevel} level log level
 * @param {string|Error} msg message
 */
module.exports = function (level, msg) {
  if (shouldLog(level)) {
    if (level === "info") {
      console.log(msg);
    } else if (level === "warning") {
      console.warn(msg);
    } else if (level === "error") {
      console.error(msg);
    }
  }
};

/**
 * @param {Error} err error
 * @returns {string} formatted error
 */
module.exports.formatError = function (err) {
  var message = err.message;
  var stack = err.stack;
  if (!stack) {
    return message;
  } else if (stack.indexOf(message) < 0) {
    return message + "\n" + stack;
  }
  return stack;
};
var group = console.group || dummy;
var groupCollapsed = console.groupCollapsed || dummy;
var groupEnd = console.groupEnd || dummy;
module.exports.group = logGroup(group);
module.exports.groupCollapsed = logGroup(groupCollapsed);
module.exports.groupEnd = logGroup(groupEnd);

/**
 * @param {LogLevel} level log level
 */
module.exports.setLogLevel = function (level) {
  logLevel = level;
};

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		var execOptions = { id: moduleId, module: module, factory: __webpack_modules__[moduleId], require: __webpack_require__ };
/******/ 		__webpack_require__.i.forEach(function(handler) { handler(execOptions); });
/******/ 		module = execOptions.module;
/******/ 		execOptions.factory.call(module.exports, module, module.exports, execOptions.require);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = __webpack_module_cache__;
/******/ 	
/******/ 	// expose the module execution interceptor
/******/ 	__webpack_require__.i = [];
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/get javascript update chunk filename */
/******/ 	(() => {
/******/ 		// This function allow to reference all chunks
/******/ 		__webpack_require__.hu = (chunkId) => {
/******/ 			// return url for filenames based on template
/******/ 			return "" + chunkId + "." + __webpack_require__.h() + ".hot-update.js";
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/get mini-css chunk filename */
/******/ 	(() => {
/******/ 		// This function allow to reference all chunks
/******/ 		__webpack_require__.miniCssF = (chunkId) => {
/******/ 			// return url for filenames based on template
/******/ 			return undefined;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/get update manifest filename */
/******/ 	(() => {
/******/ 		__webpack_require__.hmrF = () => ("critical." + __webpack_require__.h() + ".hot-update.json");
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/getFullHash */
/******/ 	(() => {
/******/ 		__webpack_require__.h = () => ("ef84ce66cc15b3f78401")
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/load script */
/******/ 	(() => {
/******/ 		var inProgress = {};
/******/ 		var dataWebpackPrefix = "vanilla_javascript_quick_start:";
/******/ 		// loadScript function to load a script via script tag
/******/ 		__webpack_require__.l = (url, done, key, chunkId) => {
/******/ 			if(inProgress[url]) { inProgress[url].push(done); return; }
/******/ 			var script, needAttach;
/******/ 			if(key !== undefined) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				for(var i = 0; i < scripts.length; i++) {
/******/ 					var s = scripts[i];
/******/ 					if(s.getAttribute("src") == url || s.getAttribute("data-webpack") == dataWebpackPrefix + key) { script = s; break; }
/******/ 				}
/******/ 			}
/******/ 			if(!script) {
/******/ 				needAttach = true;
/******/ 				script = document.createElement('script');
/******/ 		
/******/ 				script.charset = 'utf-8';
/******/ 				if (__webpack_require__.nc) {
/******/ 					script.setAttribute("nonce", __webpack_require__.nc);
/******/ 				}
/******/ 				script.setAttribute("data-webpack", dataWebpackPrefix + key);
/******/ 		
/******/ 				script.src = url;
/******/ 			}
/******/ 			inProgress[url] = [done];
/******/ 			var onScriptComplete = (prev, event) => {
/******/ 				// avoid mem leaks in IE.
/******/ 				script.onerror = script.onload = null;
/******/ 				clearTimeout(timeout);
/******/ 				var doneFns = inProgress[url];
/******/ 				delete inProgress[url];
/******/ 				script.parentNode && script.parentNode.removeChild(script);
/******/ 				doneFns && doneFns.forEach((fn) => (fn(event)));
/******/ 				if(prev) return prev(event);
/******/ 			}
/******/ 			var timeout = setTimeout(onScriptComplete.bind(null, undefined, { type: 'timeout', target: script }), 120000);
/******/ 			script.onerror = onScriptComplete.bind(null, script.onerror);
/******/ 			script.onload = onScriptComplete.bind(null, script.onload);
/******/ 			needAttach && document.head.appendChild(script);
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hot module replacement */
/******/ 	(() => {
/******/ 		var currentModuleData = {};
/******/ 		var installedModules = __webpack_require__.c;
/******/ 		
/******/ 		// module and require creation
/******/ 		var currentChildModule;
/******/ 		var currentParents = [];
/******/ 		
/******/ 		// status
/******/ 		var registeredStatusHandlers = [];
/******/ 		var currentStatus = "idle";
/******/ 		
/******/ 		// while downloading
/******/ 		var blockingPromises = 0;
/******/ 		var blockingPromisesWaiting = [];
/******/ 		
/******/ 		// The update info
/******/ 		var currentUpdateApplyHandlers;
/******/ 		var queuedInvalidatedModules;
/******/ 		
/******/ 		__webpack_require__.hmrD = currentModuleData;
/******/ 		
/******/ 		__webpack_require__.i.push(function (options) {
/******/ 			var module = options.module;
/******/ 			var require = createRequire(options.require, options.id);
/******/ 			module.hot = createModuleHotObject(options.id, module);
/******/ 			module.parents = currentParents;
/******/ 			module.children = [];
/******/ 			currentParents = [];
/******/ 			options.require = require;
/******/ 		});
/******/ 		
/******/ 		__webpack_require__.hmrC = {};
/******/ 		__webpack_require__.hmrI = {};
/******/ 		
/******/ 		function createRequire(require, moduleId) {
/******/ 			var me = installedModules[moduleId];
/******/ 			if (!me) return require;
/******/ 			var fn = function (request) {
/******/ 				if (me.hot.active) {
/******/ 					if (installedModules[request]) {
/******/ 						var parents = installedModules[request].parents;
/******/ 						if (parents.indexOf(moduleId) === -1) {
/******/ 							parents.push(moduleId);
/******/ 						}
/******/ 					} else {
/******/ 						currentParents = [moduleId];
/******/ 						currentChildModule = request;
/******/ 					}
/******/ 					if (me.children.indexOf(request) === -1) {
/******/ 						me.children.push(request);
/******/ 					}
/******/ 				} else {
/******/ 					console.warn(
/******/ 						"[HMR] unexpected require(" +
/******/ 							request +
/******/ 							") from disposed module " +
/******/ 							moduleId
/******/ 					);
/******/ 					currentParents = [];
/******/ 				}
/******/ 				return require(request);
/******/ 			};
/******/ 			var createPropertyDescriptor = function (name) {
/******/ 				return {
/******/ 					configurable: true,
/******/ 					enumerable: true,
/******/ 					get: function () {
/******/ 						return require[name];
/******/ 					},
/******/ 					set: function (value) {
/******/ 						require[name] = value;
/******/ 					}
/******/ 				};
/******/ 			};
/******/ 			for (var name in require) {
/******/ 				if (Object.prototype.hasOwnProperty.call(require, name) && name !== "e") {
/******/ 					Object.defineProperty(fn, name, createPropertyDescriptor(name));
/******/ 				}
/******/ 			}
/******/ 			fn.e = function (chunkId, fetchPriority) {
/******/ 				return trackBlockingPromise(require.e(chunkId, fetchPriority));
/******/ 			};
/******/ 			return fn;
/******/ 		}
/******/ 		
/******/ 		function createModuleHotObject(moduleId, me) {
/******/ 			var _main = currentChildModule !== moduleId;
/******/ 			var hot = {
/******/ 				// private stuff
/******/ 				_acceptedDependencies: {},
/******/ 				_acceptedErrorHandlers: {},
/******/ 				_declinedDependencies: {},
/******/ 				_selfAccepted: false,
/******/ 				_selfDeclined: false,
/******/ 				_selfInvalidated: false,
/******/ 				_disposeHandlers: [],
/******/ 				_main: _main,
/******/ 				_requireSelf: function () {
/******/ 					currentParents = me.parents.slice();
/******/ 					currentChildModule = _main ? undefined : moduleId;
/******/ 					__webpack_require__(moduleId);
/******/ 				},
/******/ 		
/******/ 				// Module API
/******/ 				active: true,
/******/ 				accept: function (dep, callback, errorHandler) {
/******/ 					if (dep === undefined) hot._selfAccepted = true;
/******/ 					else if (typeof dep === "function") hot._selfAccepted = dep;
/******/ 					else if (typeof dep === "object" && dep !== null) {
/******/ 						for (var i = 0; i < dep.length; i++) {
/******/ 							hot._acceptedDependencies[dep[i]] = callback || function () {};
/******/ 							hot._acceptedErrorHandlers[dep[i]] = errorHandler;
/******/ 						}
/******/ 					} else {
/******/ 						hot._acceptedDependencies[dep] = callback || function () {};
/******/ 						hot._acceptedErrorHandlers[dep] = errorHandler;
/******/ 					}
/******/ 				},
/******/ 				decline: function (dep) {
/******/ 					if (dep === undefined) hot._selfDeclined = true;
/******/ 					else if (typeof dep === "object" && dep !== null)
/******/ 						for (var i = 0; i < dep.length; i++)
/******/ 							hot._declinedDependencies[dep[i]] = true;
/******/ 					else hot._declinedDependencies[dep] = true;
/******/ 				},
/******/ 				dispose: function (callback) {
/******/ 					hot._disposeHandlers.push(callback);
/******/ 				},
/******/ 				addDisposeHandler: function (callback) {
/******/ 					hot._disposeHandlers.push(callback);
/******/ 				},
/******/ 				removeDisposeHandler: function (callback) {
/******/ 					var idx = hot._disposeHandlers.indexOf(callback);
/******/ 					if (idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 				},
/******/ 				invalidate: function () {
/******/ 					this._selfInvalidated = true;
/******/ 					switch (currentStatus) {
/******/ 						case "idle":
/******/ 							currentUpdateApplyHandlers = [];
/******/ 							Object.keys(__webpack_require__.hmrI).forEach(function (key) {
/******/ 								__webpack_require__.hmrI[key](
/******/ 									moduleId,
/******/ 									currentUpdateApplyHandlers
/******/ 								);
/******/ 							});
/******/ 							setStatus("ready");
/******/ 							break;
/******/ 						case "ready":
/******/ 							Object.keys(__webpack_require__.hmrI).forEach(function (key) {
/******/ 								__webpack_require__.hmrI[key](
/******/ 									moduleId,
/******/ 									currentUpdateApplyHandlers
/******/ 								);
/******/ 							});
/******/ 							break;
/******/ 						case "prepare":
/******/ 						case "check":
/******/ 						case "dispose":
/******/ 						case "apply":
/******/ 							(queuedInvalidatedModules = queuedInvalidatedModules || []).push(
/******/ 								moduleId
/******/ 							);
/******/ 							break;
/******/ 						default:
/******/ 							// ignore requests in error states
/******/ 							break;
/******/ 					}
/******/ 				},
/******/ 		
/******/ 				// Management API
/******/ 				check: hotCheck,
/******/ 				apply: hotApply,
/******/ 				status: function (l) {
/******/ 					if (!l) return currentStatus;
/******/ 					registeredStatusHandlers.push(l);
/******/ 				},
/******/ 				addStatusHandler: function (l) {
/******/ 					registeredStatusHandlers.push(l);
/******/ 				},
/******/ 				removeStatusHandler: function (l) {
/******/ 					var idx = registeredStatusHandlers.indexOf(l);
/******/ 					if (idx >= 0) registeredStatusHandlers.splice(idx, 1);
/******/ 				},
/******/ 		
/******/ 				// inherit from previous dispose call
/******/ 				data: currentModuleData[moduleId]
/******/ 			};
/******/ 			currentChildModule = undefined;
/******/ 			return hot;
/******/ 		}
/******/ 		
/******/ 		function setStatus(newStatus) {
/******/ 			currentStatus = newStatus;
/******/ 			var results = [];
/******/ 		
/******/ 			for (var i = 0; i < registeredStatusHandlers.length; i++)
/******/ 				results[i] = registeredStatusHandlers[i].call(null, newStatus);
/******/ 		
/******/ 			return Promise.all(results).then(function () {});
/******/ 		}
/******/ 		
/******/ 		function unblock() {
/******/ 			if (--blockingPromises === 0) {
/******/ 				setStatus("ready").then(function () {
/******/ 					if (blockingPromises === 0) {
/******/ 						var list = blockingPromisesWaiting;
/******/ 						blockingPromisesWaiting = [];
/******/ 						for (var i = 0; i < list.length; i++) {
/******/ 							list[i]();
/******/ 						}
/******/ 					}
/******/ 				});
/******/ 			}
/******/ 		}
/******/ 		
/******/ 		function trackBlockingPromise(promise) {
/******/ 			switch (currentStatus) {
/******/ 				case "ready":
/******/ 					setStatus("prepare");
/******/ 				/* fallthrough */
/******/ 				case "prepare":
/******/ 					blockingPromises++;
/******/ 					promise.then(unblock, unblock);
/******/ 					return promise;
/******/ 				default:
/******/ 					return promise;
/******/ 			}
/******/ 		}
/******/ 		
/******/ 		function waitForBlockingPromises(fn) {
/******/ 			if (blockingPromises === 0) return fn();
/******/ 			return new Promise(function (resolve) {
/******/ 				blockingPromisesWaiting.push(function () {
/******/ 					resolve(fn());
/******/ 				});
/******/ 			});
/******/ 		}
/******/ 		
/******/ 		function hotCheck(applyOnUpdate) {
/******/ 			if (currentStatus !== "idle") {
/******/ 				throw new Error("check() is only allowed in idle status");
/******/ 			}
/******/ 			return setStatus("check")
/******/ 				.then(__webpack_require__.hmrM)
/******/ 				.then(function (update) {
/******/ 					if (!update) {
/******/ 						return setStatus(applyInvalidatedModules() ? "ready" : "idle").then(
/******/ 							function () {
/******/ 								return null;
/******/ 							}
/******/ 						);
/******/ 					}
/******/ 		
/******/ 					return setStatus("prepare").then(function () {
/******/ 						var updatedModules = [];
/******/ 						currentUpdateApplyHandlers = [];
/******/ 		
/******/ 						return Promise.all(
/******/ 							Object.keys(__webpack_require__.hmrC).reduce(function (
/******/ 								promises,
/******/ 								key
/******/ 							) {
/******/ 								__webpack_require__.hmrC[key](
/******/ 									update.c,
/******/ 									update.r,
/******/ 									update.m,
/******/ 									promises,
/******/ 									currentUpdateApplyHandlers,
/******/ 									updatedModules
/******/ 								);
/******/ 								return promises;
/******/ 							}, [])
/******/ 						).then(function () {
/******/ 							return waitForBlockingPromises(function () {
/******/ 								if (applyOnUpdate) {
/******/ 									return internalApply(applyOnUpdate);
/******/ 								}
/******/ 								return setStatus("ready").then(function () {
/******/ 									return updatedModules;
/******/ 								});
/******/ 							});
/******/ 						});
/******/ 					});
/******/ 				});
/******/ 		}
/******/ 		
/******/ 		function hotApply(options) {
/******/ 			if (currentStatus !== "ready") {
/******/ 				return Promise.resolve().then(function () {
/******/ 					throw new Error(
/******/ 						"apply() is only allowed in ready status (state: " +
/******/ 							currentStatus +
/******/ 							")"
/******/ 					);
/******/ 				});
/******/ 			}
/******/ 			return internalApply(options);
/******/ 		}
/******/ 		
/******/ 		function internalApply(options) {
/******/ 			options = options || {};
/******/ 		
/******/ 			applyInvalidatedModules();
/******/ 		
/******/ 			var results = currentUpdateApplyHandlers.map(function (handler) {
/******/ 				return handler(options);
/******/ 			});
/******/ 			currentUpdateApplyHandlers = undefined;
/******/ 		
/******/ 			var errors = results
/******/ 				.map(function (r) {
/******/ 					return r.error;
/******/ 				})
/******/ 				.filter(Boolean);
/******/ 		
/******/ 			if (errors.length > 0) {
/******/ 				return setStatus("abort").then(function () {
/******/ 					throw errors[0];
/******/ 				});
/******/ 			}
/******/ 		
/******/ 			// Now in "dispose" phase
/******/ 			var disposePromise = setStatus("dispose");
/******/ 		
/******/ 			results.forEach(function (result) {
/******/ 				if (result.dispose) result.dispose();
/******/ 			});
/******/ 		
/******/ 			// Now in "apply" phase
/******/ 			var applyPromise = setStatus("apply");
/******/ 		
/******/ 			var error;
/******/ 			var reportError = function (err) {
/******/ 				if (!error) error = err;
/******/ 			};
/******/ 		
/******/ 			var outdatedModules = [];
/******/ 		
/******/ 			var onAccepted = function () {
/******/ 				return Promise.all([disposePromise, applyPromise]).then(function () {
/******/ 					// handle errors in accept handlers and self accepted module load
/******/ 					if (error) {
/******/ 						return setStatus("fail").then(function () {
/******/ 							throw error;
/******/ 						});
/******/ 					}
/******/ 		
/******/ 					if (queuedInvalidatedModules) {
/******/ 						return internalApply(options).then(function (list) {
/******/ 							outdatedModules.forEach(function (moduleId) {
/******/ 								if (list.indexOf(moduleId) < 0) list.push(moduleId);
/******/ 							});
/******/ 							return list;
/******/ 						});
/******/ 					}
/******/ 		
/******/ 					return setStatus("idle").then(function () {
/******/ 						return outdatedModules;
/******/ 					});
/******/ 				});
/******/ 			};
/******/ 		
/******/ 			return Promise.all(
/******/ 				results
/******/ 					.filter(function (result) {
/******/ 						return result.apply;
/******/ 					})
/******/ 					.map(function (result) {
/******/ 						return result.apply(reportError);
/******/ 					})
/******/ 			)
/******/ 				.then(function (applyResults) {
/******/ 					applyResults.forEach(function (modules) {
/******/ 						if (modules) {
/******/ 							for (var i = 0; i < modules.length; i++) {
/******/ 								outdatedModules.push(modules[i]);
/******/ 							}
/******/ 						}
/******/ 					});
/******/ 				})
/******/ 				.then(onAccepted);
/******/ 		}
/******/ 		
/******/ 		function applyInvalidatedModules() {
/******/ 			if (queuedInvalidatedModules) {
/******/ 				if (!currentUpdateApplyHandlers) currentUpdateApplyHandlers = [];
/******/ 				Object.keys(__webpack_require__.hmrI).forEach(function (key) {
/******/ 					queuedInvalidatedModules.forEach(function (moduleId) {
/******/ 						__webpack_require__.hmrI[key](
/******/ 							moduleId,
/******/ 							currentUpdateApplyHandlers
/******/ 						);
/******/ 					});
/******/ 				});
/******/ 				queuedInvalidatedModules = undefined;
/******/ 				return true;
/******/ 			}
/******/ 		}
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript && document.currentScript.tagName.toUpperCase() === 'SCRIPT')
/******/ 				scriptUrl = document.currentScript.src;
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) {
/******/ 					var i = scripts.length - 1;
/******/ 					while (i > -1 && (!scriptUrl || !/^http(s?):/.test(scriptUrl))) scriptUrl = scripts[i--].src;
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/^blob:/, "").replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/css loading */
/******/ 	(() => {
/******/ 		if (typeof document === "undefined") return;
/******/ 		var createStylesheet = (chunkId, fullhref, oldTag, resolve, reject) => {
/******/ 			var linkTag = document.createElement("link");
/******/ 		
/******/ 			linkTag.rel = "stylesheet";
/******/ 			linkTag.type = "text/css";
/******/ 			if (__webpack_require__.nc) {
/******/ 				linkTag.nonce = __webpack_require__.nc;
/******/ 			}
/******/ 			var onLinkComplete = (event) => {
/******/ 				// avoid mem leaks.
/******/ 				linkTag.onerror = linkTag.onload = null;
/******/ 				if (event.type === 'load') {
/******/ 					resolve();
/******/ 				} else {
/******/ 					var errorType = event && event.type;
/******/ 					var realHref = event && event.target && event.target.href || fullhref;
/******/ 					var err = new Error("Loading CSS chunk " + chunkId + " failed.\n(" + errorType + ": " + realHref + ")");
/******/ 					err.name = "ChunkLoadError";
/******/ 					err.code = "CSS_CHUNK_LOAD_FAILED";
/******/ 					err.type = errorType;
/******/ 					err.request = realHref;
/******/ 					if (linkTag.parentNode) linkTag.parentNode.removeChild(linkTag)
/******/ 					reject(err);
/******/ 				}
/******/ 			}
/******/ 			linkTag.onerror = linkTag.onload = onLinkComplete;
/******/ 			linkTag.href = fullhref;
/******/ 		
/******/ 		
/******/ 			if (oldTag) {
/******/ 				oldTag.parentNode.insertBefore(linkTag, oldTag.nextSibling);
/******/ 			} else {
/******/ 				document.head.appendChild(linkTag);
/******/ 			}
/******/ 			return linkTag;
/******/ 		};
/******/ 		var findStylesheet = (href, fullhref) => {
/******/ 			var existingLinkTags = document.getElementsByTagName("link");
/******/ 			for(var i = 0; i < existingLinkTags.length; i++) {
/******/ 				var tag = existingLinkTags[i];
/******/ 				var dataHref = tag.getAttribute("data-href") || tag.getAttribute("href");
/******/ 				if(tag.rel === "stylesheet" && (dataHref === href || dataHref === fullhref)) return tag;
/******/ 			}
/******/ 			var existingStyleTags = document.getElementsByTagName("style");
/******/ 			for(var i = 0; i < existingStyleTags.length; i++) {
/******/ 				var tag = existingStyleTags[i];
/******/ 				var dataHref = tag.getAttribute("data-href");
/******/ 				if(dataHref === href || dataHref === fullhref) return tag;
/******/ 			}
/******/ 		};
/******/ 		var loadStylesheet = (chunkId) => {
/******/ 			return new Promise((resolve, reject) => {
/******/ 				var href = __webpack_require__.miniCssF(chunkId);
/******/ 				var fullhref = __webpack_require__.p + href;
/******/ 				if(findStylesheet(href, fullhref)) return resolve();
/******/ 				createStylesheet(chunkId, fullhref, null, resolve, reject);
/******/ 			});
/******/ 		}
/******/ 		// no chunk loading
/******/ 		
/******/ 		var oldTags = [];
/******/ 		var newTags = [];
/******/ 		var applyHandler = (options) => {
/******/ 			return { dispose: () => {
/******/ 				for(var i = 0; i < oldTags.length; i++) {
/******/ 					var oldTag = oldTags[i];
/******/ 					if(oldTag.parentNode) oldTag.parentNode.removeChild(oldTag);
/******/ 				}
/******/ 				oldTags.length = 0;
/******/ 			}, apply: () => {
/******/ 				for(var i = 0; i < newTags.length; i++) newTags[i].rel = "stylesheet";
/******/ 				newTags.length = 0;
/******/ 			} };
/******/ 		}
/******/ 		__webpack_require__.hmrC.miniCss = (chunkIds, removedChunks, removedModules, promises, applyHandlers, updatedModulesList) => {
/******/ 			applyHandlers.push(applyHandler);
/******/ 			chunkIds.forEach((chunkId) => {
/******/ 				var href = __webpack_require__.miniCssF(chunkId);
/******/ 				var fullhref = __webpack_require__.p + href;
/******/ 				var oldTag = findStylesheet(href, fullhref);
/******/ 				if(!oldTag) return;
/******/ 				promises.push(new Promise((resolve, reject) => {
/******/ 					var tag = createStylesheet(chunkId, fullhref, oldTag, () => {
/******/ 						tag.as = "style";
/******/ 						tag.rel = "preload";
/******/ 						resolve();
/******/ 					}, reject);
/******/ 					oldTags.push(oldTag);
/******/ 					newTags.push(tag);
/******/ 				}));
/******/ 			});
/******/ 		}
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = __webpack_require__.hmrS_jsonp = __webpack_require__.hmrS_jsonp || {
/******/ 			"critical": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		var currentUpdatedModulesList;
/******/ 		var waitingUpdateResolves = {};
/******/ 		function loadUpdateChunk(chunkId, updatedModulesList) {
/******/ 			currentUpdatedModulesList = updatedModulesList;
/******/ 			return new Promise((resolve, reject) => {
/******/ 				waitingUpdateResolves[chunkId] = resolve;
/******/ 				// start update chunk loading
/******/ 				var url = __webpack_require__.p + __webpack_require__.hu(chunkId);
/******/ 				// create error before stack unwound to get useful stacktrace later
/******/ 				var error = new Error();
/******/ 				var loadingEnded = (event) => {
/******/ 					if(waitingUpdateResolves[chunkId]) {
/******/ 						waitingUpdateResolves[chunkId] = undefined
/******/ 						var errorType = event && (event.type === 'load' ? 'missing' : event.type);
/******/ 						var realSrc = event && event.target && event.target.src;
/******/ 						error.message = 'Loading hot update chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')';
/******/ 						error.name = 'ChunkLoadError';
/******/ 						error.type = errorType;
/******/ 						error.request = realSrc;
/******/ 						reject(error);
/******/ 					}
/******/ 				};
/******/ 				__webpack_require__.l(url, loadingEnded);
/******/ 			});
/******/ 		}
/******/ 		
/******/ 		self["webpackHotUpdatevanilla_javascript_quick_start"] = (chunkId, moreModules, runtime) => {
/******/ 			for(var moduleId in moreModules) {
/******/ 				if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 					currentUpdate[moduleId] = moreModules[moduleId];
/******/ 					if(currentUpdatedModulesList) currentUpdatedModulesList.push(moduleId);
/******/ 				}
/******/ 			}
/******/ 			if(runtime) currentUpdateRuntime.push(runtime);
/******/ 			if(waitingUpdateResolves[chunkId]) {
/******/ 				waitingUpdateResolves[chunkId]();
/******/ 				waitingUpdateResolves[chunkId] = undefined;
/******/ 			}
/******/ 		};
/******/ 		
/******/ 		var currentUpdateChunks;
/******/ 		var currentUpdate;
/******/ 		var currentUpdateRemovedChunks;
/******/ 		var currentUpdateRuntime;
/******/ 		function applyHandler(options) {
/******/ 			if (__webpack_require__.f) delete __webpack_require__.f.jsonpHmr;
/******/ 			currentUpdateChunks = undefined;
/******/ 			function getAffectedModuleEffects(updateModuleId) {
/******/ 				var outdatedModules = [updateModuleId];
/******/ 				var outdatedDependencies = {};
/******/ 		
/******/ 				var queue = outdatedModules.map(function (id) {
/******/ 					return {
/******/ 						chain: [id],
/******/ 						id: id
/******/ 					};
/******/ 				});
/******/ 				while (queue.length > 0) {
/******/ 					var queueItem = queue.pop();
/******/ 					var moduleId = queueItem.id;
/******/ 					var chain = queueItem.chain;
/******/ 					var module = __webpack_require__.c[moduleId];
/******/ 					if (
/******/ 						!module ||
/******/ 						(module.hot._selfAccepted && !module.hot._selfInvalidated)
/******/ 					)
/******/ 						continue;
/******/ 					if (module.hot._selfDeclined) {
/******/ 						return {
/******/ 							type: "self-declined",
/******/ 							chain: chain,
/******/ 							moduleId: moduleId
/******/ 						};
/******/ 					}
/******/ 					if (module.hot._main) {
/******/ 						return {
/******/ 							type: "unaccepted",
/******/ 							chain: chain,
/******/ 							moduleId: moduleId
/******/ 						};
/******/ 					}
/******/ 					for (var i = 0; i < module.parents.length; i++) {
/******/ 						var parentId = module.parents[i];
/******/ 						var parent = __webpack_require__.c[parentId];
/******/ 						if (!parent) continue;
/******/ 						if (parent.hot._declinedDependencies[moduleId]) {
/******/ 							return {
/******/ 								type: "declined",
/******/ 								chain: chain.concat([parentId]),
/******/ 								moduleId: moduleId,
/******/ 								parentId: parentId
/******/ 							};
/******/ 						}
/******/ 						if (outdatedModules.indexOf(parentId) !== -1) continue;
/******/ 						if (parent.hot._acceptedDependencies[moduleId]) {
/******/ 							if (!outdatedDependencies[parentId])
/******/ 								outdatedDependencies[parentId] = [];
/******/ 							addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 							continue;
/******/ 						}
/******/ 						delete outdatedDependencies[parentId];
/******/ 						outdatedModules.push(parentId);
/******/ 						queue.push({
/******/ 							chain: chain.concat([parentId]),
/******/ 							id: parentId
/******/ 						});
/******/ 					}
/******/ 				}
/******/ 		
/******/ 				return {
/******/ 					type: "accepted",
/******/ 					moduleId: updateModuleId,
/******/ 					outdatedModules: outdatedModules,
/******/ 					outdatedDependencies: outdatedDependencies
/******/ 				};
/******/ 			}
/******/ 		
/******/ 			function addAllToSet(a, b) {
/******/ 				for (var i = 0; i < b.length; i++) {
/******/ 					var item = b[i];
/******/ 					if (a.indexOf(item) === -1) a.push(item);
/******/ 				}
/******/ 			}
/******/ 		
/******/ 			// at begin all updates modules are outdated
/******/ 			// the "outdated" status can propagate to parents if they don't accept the children
/******/ 			var outdatedDependencies = {};
/******/ 			var outdatedModules = [];
/******/ 			var appliedUpdate = {};
/******/ 		
/******/ 			var warnUnexpectedRequire = function warnUnexpectedRequire(module) {
/******/ 				console.warn(
/******/ 					"[HMR] unexpected require(" + module.id + ") to disposed module"
/******/ 				);
/******/ 			};
/******/ 		
/******/ 			for (var moduleId in currentUpdate) {
/******/ 				if (__webpack_require__.o(currentUpdate, moduleId)) {
/******/ 					var newModuleFactory = currentUpdate[moduleId];
/******/ 					var result = newModuleFactory
/******/ 						? getAffectedModuleEffects(moduleId)
/******/ 						: {
/******/ 								type: "disposed",
/******/ 								moduleId: moduleId
/******/ 							};
/******/ 					/** @type {Error|false} */
/******/ 					var abortError = false;
/******/ 					var doApply = false;
/******/ 					var doDispose = false;
/******/ 					var chainInfo = "";
/******/ 					if (result.chain) {
/******/ 						chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 					}
/******/ 					switch (result.type) {
/******/ 						case "self-declined":
/******/ 							if (options.onDeclined) options.onDeclined(result);
/******/ 							if (!options.ignoreDeclined)
/******/ 								abortError = new Error(
/******/ 									"Aborted because of self decline: " +
/******/ 										result.moduleId +
/******/ 										chainInfo
/******/ 								);
/******/ 							break;
/******/ 						case "declined":
/******/ 							if (options.onDeclined) options.onDeclined(result);
/******/ 							if (!options.ignoreDeclined)
/******/ 								abortError = new Error(
/******/ 									"Aborted because of declined dependency: " +
/******/ 										result.moduleId +
/******/ 										" in " +
/******/ 										result.parentId +
/******/ 										chainInfo
/******/ 								);
/******/ 							break;
/******/ 						case "unaccepted":
/******/ 							if (options.onUnaccepted) options.onUnaccepted(result);
/******/ 							if (!options.ignoreUnaccepted)
/******/ 								abortError = new Error(
/******/ 									"Aborted because " + moduleId + " is not accepted" + chainInfo
/******/ 								);
/******/ 							break;
/******/ 						case "accepted":
/******/ 							if (options.onAccepted) options.onAccepted(result);
/******/ 							doApply = true;
/******/ 							break;
/******/ 						case "disposed":
/******/ 							if (options.onDisposed) options.onDisposed(result);
/******/ 							doDispose = true;
/******/ 							break;
/******/ 						default:
/******/ 							throw new Error("Unexception type " + result.type);
/******/ 					}
/******/ 					if (abortError) {
/******/ 						return {
/******/ 							error: abortError
/******/ 						};
/******/ 					}
/******/ 					if (doApply) {
/******/ 						appliedUpdate[moduleId] = newModuleFactory;
/******/ 						addAllToSet(outdatedModules, result.outdatedModules);
/******/ 						for (moduleId in result.outdatedDependencies) {
/******/ 							if (__webpack_require__.o(result.outdatedDependencies, moduleId)) {
/******/ 								if (!outdatedDependencies[moduleId])
/******/ 									outdatedDependencies[moduleId] = [];
/******/ 								addAllToSet(
/******/ 									outdatedDependencies[moduleId],
/******/ 									result.outdatedDependencies[moduleId]
/******/ 								);
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 					if (doDispose) {
/******/ 						addAllToSet(outdatedModules, [result.moduleId]);
/******/ 						appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 			currentUpdate = undefined;
/******/ 		
/******/ 			// Store self accepted outdated modules to require them later by the module system
/******/ 			var outdatedSelfAcceptedModules = [];
/******/ 			for (var j = 0; j < outdatedModules.length; j++) {
/******/ 				var outdatedModuleId = outdatedModules[j];
/******/ 				var module = __webpack_require__.c[outdatedModuleId];
/******/ 				if (
/******/ 					module &&
/******/ 					(module.hot._selfAccepted || module.hot._main) &&
/******/ 					// removed self-accepted modules should not be required
/******/ 					appliedUpdate[outdatedModuleId] !== warnUnexpectedRequire &&
/******/ 					// when called invalidate self-accepting is not possible
/******/ 					!module.hot._selfInvalidated
/******/ 				) {
/******/ 					outdatedSelfAcceptedModules.push({
/******/ 						module: outdatedModuleId,
/******/ 						require: module.hot._requireSelf,
/******/ 						errorHandler: module.hot._selfAccepted
/******/ 					});
/******/ 				}
/******/ 			}
/******/ 		
/******/ 			var moduleOutdatedDependencies;
/******/ 		
/******/ 			return {
/******/ 				dispose: function () {
/******/ 					currentUpdateRemovedChunks.forEach(function (chunkId) {
/******/ 						delete installedChunks[chunkId];
/******/ 					});
/******/ 					currentUpdateRemovedChunks = undefined;
/******/ 		
/******/ 					var idx;
/******/ 					var queue = outdatedModules.slice();
/******/ 					while (queue.length > 0) {
/******/ 						var moduleId = queue.pop();
/******/ 						var module = __webpack_require__.c[moduleId];
/******/ 						if (!module) continue;
/******/ 		
/******/ 						var data = {};
/******/ 		
/******/ 						// Call dispose handlers
/******/ 						var disposeHandlers = module.hot._disposeHandlers;
/******/ 						for (j = 0; j < disposeHandlers.length; j++) {
/******/ 							disposeHandlers[j].call(null, data);
/******/ 						}
/******/ 						__webpack_require__.hmrD[moduleId] = data;
/******/ 		
/******/ 						// disable module (this disables requires from this module)
/******/ 						module.hot.active = false;
/******/ 		
/******/ 						// remove module from cache
/******/ 						delete __webpack_require__.c[moduleId];
/******/ 		
/******/ 						// when disposing there is no need to call dispose handler
/******/ 						delete outdatedDependencies[moduleId];
/******/ 		
/******/ 						// remove "parents" references from all children
/******/ 						for (j = 0; j < module.children.length; j++) {
/******/ 							var child = __webpack_require__.c[module.children[j]];
/******/ 							if (!child) continue;
/******/ 							idx = child.parents.indexOf(moduleId);
/******/ 							if (idx >= 0) {
/******/ 								child.parents.splice(idx, 1);
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 		
/******/ 					// remove outdated dependency from module children
/******/ 					var dependency;
/******/ 					for (var outdatedModuleId in outdatedDependencies) {
/******/ 						if (__webpack_require__.o(outdatedDependencies, outdatedModuleId)) {
/******/ 							module = __webpack_require__.c[outdatedModuleId];
/******/ 							if (module) {
/******/ 								moduleOutdatedDependencies =
/******/ 									outdatedDependencies[outdatedModuleId];
/******/ 								for (j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 									dependency = moduleOutdatedDependencies[j];
/******/ 									idx = module.children.indexOf(dependency);
/******/ 									if (idx >= 0) module.children.splice(idx, 1);
/******/ 								}
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 				},
/******/ 				apply: function (reportError) {
/******/ 					var acceptPromises = [];
/******/ 					// insert new code
/******/ 					for (var updateModuleId in appliedUpdate) {
/******/ 						if (__webpack_require__.o(appliedUpdate, updateModuleId)) {
/******/ 							__webpack_require__.m[updateModuleId] = appliedUpdate[updateModuleId];
/******/ 						}
/******/ 					}
/******/ 		
/******/ 					// run new runtime modules
/******/ 					for (var i = 0; i < currentUpdateRuntime.length; i++) {
/******/ 						currentUpdateRuntime[i](__webpack_require__);
/******/ 					}
/******/ 		
/******/ 					// call accept handlers
/******/ 					for (var outdatedModuleId in outdatedDependencies) {
/******/ 						if (__webpack_require__.o(outdatedDependencies, outdatedModuleId)) {
/******/ 							var module = __webpack_require__.c[outdatedModuleId];
/******/ 							if (module) {
/******/ 								moduleOutdatedDependencies =
/******/ 									outdatedDependencies[outdatedModuleId];
/******/ 								var callbacks = [];
/******/ 								var errorHandlers = [];
/******/ 								var dependenciesForCallbacks = [];
/******/ 								for (var j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 									var dependency = moduleOutdatedDependencies[j];
/******/ 									var acceptCallback =
/******/ 										module.hot._acceptedDependencies[dependency];
/******/ 									var errorHandler =
/******/ 										module.hot._acceptedErrorHandlers[dependency];
/******/ 									if (acceptCallback) {
/******/ 										if (callbacks.indexOf(acceptCallback) !== -1) continue;
/******/ 										callbacks.push(acceptCallback);
/******/ 										errorHandlers.push(errorHandler);
/******/ 										dependenciesForCallbacks.push(dependency);
/******/ 									}
/******/ 								}
/******/ 								for (var k = 0; k < callbacks.length; k++) {
/******/ 									var result;
/******/ 									try {
/******/ 										result = callbacks[k].call(null, moduleOutdatedDependencies);
/******/ 									} catch (err) {
/******/ 										if (typeof errorHandlers[k] === "function") {
/******/ 											try {
/******/ 												errorHandlers[k](err, {
/******/ 													moduleId: outdatedModuleId,
/******/ 													dependencyId: dependenciesForCallbacks[k]
/******/ 												});
/******/ 											} catch (err2) {
/******/ 												if (options.onErrored) {
/******/ 													options.onErrored({
/******/ 														type: "accept-error-handler-errored",
/******/ 														moduleId: outdatedModuleId,
/******/ 														dependencyId: dependenciesForCallbacks[k],
/******/ 														error: err2,
/******/ 														originalError: err
/******/ 													});
/******/ 												}
/******/ 												if (!options.ignoreErrored) {
/******/ 													reportError(err2);
/******/ 													reportError(err);
/******/ 												}
/******/ 											}
/******/ 										} else {
/******/ 											if (options.onErrored) {
/******/ 												options.onErrored({
/******/ 													type: "accept-errored",
/******/ 													moduleId: outdatedModuleId,
/******/ 													dependencyId: dependenciesForCallbacks[k],
/******/ 													error: err
/******/ 												});
/******/ 											}
/******/ 											if (!options.ignoreErrored) {
/******/ 												reportError(err);
/******/ 											}
/******/ 										}
/******/ 									}
/******/ 									if (result && typeof result.then === "function") {
/******/ 										acceptPromises.push(result);
/******/ 									}
/******/ 								}
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 		
/******/ 					var onAccepted = function () {
/******/ 						// Load self accepted modules
/******/ 						for (var o = 0; o < outdatedSelfAcceptedModules.length; o++) {
/******/ 							var item = outdatedSelfAcceptedModules[o];
/******/ 							var moduleId = item.module;
/******/ 							try {
/******/ 								item.require(moduleId);
/******/ 							} catch (err) {
/******/ 								if (typeof item.errorHandler === "function") {
/******/ 									try {
/******/ 										item.errorHandler(err, {
/******/ 											moduleId: moduleId,
/******/ 											module: __webpack_require__.c[moduleId]
/******/ 										});
/******/ 									} catch (err1) {
/******/ 										if (options.onErrored) {
/******/ 											options.onErrored({
/******/ 												type: "self-accept-error-handler-errored",
/******/ 												moduleId: moduleId,
/******/ 												error: err1,
/******/ 												originalError: err
/******/ 											});
/******/ 										}
/******/ 										if (!options.ignoreErrored) {
/******/ 											reportError(err1);
/******/ 											reportError(err);
/******/ 										}
/******/ 									}
/******/ 								} else {
/******/ 									if (options.onErrored) {
/******/ 										options.onErrored({
/******/ 											type: "self-accept-errored",
/******/ 											moduleId: moduleId,
/******/ 											error: err
/******/ 										});
/******/ 									}
/******/ 									if (!options.ignoreErrored) {
/******/ 										reportError(err);
/******/ 									}
/******/ 								}
/******/ 							}
/******/ 						}
/******/ 					};
/******/ 		
/******/ 					return Promise.all(acceptPromises)
/******/ 						.then(onAccepted)
/******/ 						.then(function () {
/******/ 							return outdatedModules;
/******/ 						});
/******/ 				}
/******/ 			};
/******/ 		}
/******/ 		__webpack_require__.hmrI.jsonp = function (moduleId, applyHandlers) {
/******/ 			if (!currentUpdate) {
/******/ 				currentUpdate = {};
/******/ 				currentUpdateRuntime = [];
/******/ 				currentUpdateRemovedChunks = [];
/******/ 				applyHandlers.push(applyHandler);
/******/ 			}
/******/ 			if (!__webpack_require__.o(currentUpdate, moduleId)) {
/******/ 				currentUpdate[moduleId] = __webpack_require__.m[moduleId];
/******/ 			}
/******/ 		};
/******/ 		__webpack_require__.hmrC.jsonp = function (
/******/ 			chunkIds,
/******/ 			removedChunks,
/******/ 			removedModules,
/******/ 			promises,
/******/ 			applyHandlers,
/******/ 			updatedModulesList
/******/ 		) {
/******/ 			applyHandlers.push(applyHandler);
/******/ 			currentUpdateChunks = {};
/******/ 			currentUpdateRemovedChunks = removedChunks;
/******/ 			currentUpdate = removedModules.reduce(function (obj, key) {
/******/ 				obj[key] = false;
/******/ 				return obj;
/******/ 			}, {});
/******/ 			currentUpdateRuntime = [];
/******/ 			chunkIds.forEach(function (chunkId) {
/******/ 				if (
/******/ 					__webpack_require__.o(installedChunks, chunkId) &&
/******/ 					installedChunks[chunkId] !== undefined
/******/ 				) {
/******/ 					promises.push(loadUpdateChunk(chunkId, updatedModulesList));
/******/ 					currentUpdateChunks[chunkId] = true;
/******/ 				} else {
/******/ 					currentUpdateChunks[chunkId] = false;
/******/ 				}
/******/ 			});
/******/ 			if (__webpack_require__.f) {
/******/ 				__webpack_require__.f.jsonpHmr = function (chunkId, promises) {
/******/ 					if (
/******/ 						currentUpdateChunks &&
/******/ 						__webpack_require__.o(currentUpdateChunks, chunkId) &&
/******/ 						!currentUpdateChunks[chunkId]
/******/ 					) {
/******/ 						promises.push(loadUpdateChunk(chunkId));
/******/ 						currentUpdateChunks[chunkId] = true;
/******/ 					}
/******/ 				};
/******/ 			}
/******/ 		};
/******/ 		
/******/ 		__webpack_require__.hmrM = () => {
/******/ 			if (typeof fetch === "undefined") throw new Error("No browser support: need fetch API");
/******/ 			return fetch(__webpack_require__.p + __webpack_require__.hmrF()).then((response) => {
/******/ 				if(response.status === 404) return; // no update available
/******/ 				if(!response.ok) throw new Error("Failed to fetch update manifest " + response.statusText);
/******/ 				return response.json();
/******/ 			});
/******/ 		};
/******/ 		
/******/ 		// no on chunks loaded
/******/ 		
/******/ 		// no jsonp function
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// module cache are used so entry inlining is disabled
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	__webpack_require__("./node_modules/webpack-dev-server/client/index.js?protocol=ws%3A&hostname=0.0.0.0&port=8080&pathname=%2Fws&logging=info&overlay=true&reconnect=10&hot=true&live-reload=true");
/******/ 	__webpack_require__("./node_modules/webpack/hot/dev-server.js");
/******/ 	var __webpack_exports__ = __webpack_require__("./app/critical.js");
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLEVBQUUsSUFBSTtXQUNOO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxJQUFJO1dBQ0o7V0FDQTtXQUNBLEVBQUU7V0FDRjtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTs7V0FFQTtXQUNBO1dBQ0E7V0FDQSxzQ0FBc0M7V0FDdEM7V0FDQTtXQUNBLEVBQUU7V0FDRjs7V0FFQTs7V0FFQSxvQjs7Ozs7VUVyZ0JBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL3ZhbmlsbGFfamF2YXNjcmlwdF9xdWlja19zdGFydC8uL2FwcC9jcml0aWNhbC5qcyIsIndlYnBhY2s6Ly92YW5pbGxhX2phdmFzY3JpcHRfcXVpY2tfc3RhcnQvLi9ub2RlX21vZHVsZXMvYW5zaS1odG1sLWNvbW11bml0eS9pbmRleC5qcyIsIndlYnBhY2s6Ly92YW5pbGxhX2phdmFzY3JpcHRfcXVpY2tfc3RhcnQvLi9ub2RlX21vZHVsZXMvZXZlbnRzL2V2ZW50cy5qcyIsIndlYnBhY2s6Ly92YW5pbGxhX2phdmFzY3JpcHRfcXVpY2tfc3RhcnQvLi9ub2RlX21vZHVsZXMvd2VicGFjay1kZXYtc2VydmVyL2NsaWVudC9jbGllbnRzL1dlYlNvY2tldENsaWVudC5qcyIsIndlYnBhY2s6Ly92YW5pbGxhX2phdmFzY3JpcHRfcXVpY2tfc3RhcnQvLi9ub2RlX21vZHVsZXMvd2VicGFjay1kZXYtc2VydmVyL2NsaWVudC9pbmRleC5qcyIsIndlYnBhY2s6Ly92YW5pbGxhX2phdmFzY3JpcHRfcXVpY2tfc3RhcnQvLi9ub2RlX21vZHVsZXMvd2VicGFjay1kZXYtc2VydmVyL2NsaWVudC9tb2R1bGVzL2xvZ2dlci9pbmRleC5qcyIsIndlYnBhY2s6Ly92YW5pbGxhX2phdmFzY3JpcHRfcXVpY2tfc3RhcnQvLi9ub2RlX21vZHVsZXMvd2VicGFjay1kZXYtc2VydmVyL2NsaWVudC9vdmVybGF5LmpzIiwid2VicGFjazovL3ZhbmlsbGFfamF2YXNjcmlwdF9xdWlja19zdGFydC8uL25vZGVfbW9kdWxlcy93ZWJwYWNrLWRldi1zZXJ2ZXIvY2xpZW50L3Byb2dyZXNzLmpzIiwid2VicGFjazovL3ZhbmlsbGFfamF2YXNjcmlwdF9xdWlja19zdGFydC8uL25vZGVfbW9kdWxlcy93ZWJwYWNrLWRldi1zZXJ2ZXIvY2xpZW50L3NvY2tldC5qcyIsIndlYnBhY2s6Ly92YW5pbGxhX2phdmFzY3JpcHRfcXVpY2tfc3RhcnQvLi9ub2RlX21vZHVsZXMvd2VicGFjay1kZXYtc2VydmVyL2NsaWVudC91dGlscy9sb2cuanMiLCJ3ZWJwYWNrOi8vdmFuaWxsYV9qYXZhc2NyaXB0X3F1aWNrX3N0YXJ0Ly4vbm9kZV9tb2R1bGVzL3dlYnBhY2stZGV2LXNlcnZlci9jbGllbnQvdXRpbHMvc2VuZE1lc3NhZ2UuanMiLCJ3ZWJwYWNrOi8vdmFuaWxsYV9qYXZhc2NyaXB0X3F1aWNrX3N0YXJ0Ly4vbm9kZV9tb2R1bGVzL3dlYnBhY2svaG90L2Rldi1zZXJ2ZXIuanMiLCJ3ZWJwYWNrOi8vdmFuaWxsYV9qYXZhc2NyaXB0X3F1aWNrX3N0YXJ0Ly4vbm9kZV9tb2R1bGVzL3dlYnBhY2svaG90L2VtaXR0ZXIuanMiLCJ3ZWJwYWNrOi8vdmFuaWxsYV9qYXZhc2NyaXB0X3F1aWNrX3N0YXJ0Ly4vbm9kZV9tb2R1bGVzL3dlYnBhY2svaG90L2xvZy1hcHBseS1yZXN1bHQuanMiLCJ3ZWJwYWNrOi8vdmFuaWxsYV9qYXZhc2NyaXB0X3F1aWNrX3N0YXJ0Ly4vbm9kZV9tb2R1bGVzL3dlYnBhY2svaG90L2xvZy5qcyIsIndlYnBhY2s6Ly92YW5pbGxhX2phdmFzY3JpcHRfcXVpY2tfc3RhcnQvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vdmFuaWxsYV9qYXZhc2NyaXB0X3F1aWNrX3N0YXJ0L3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL3ZhbmlsbGFfamF2YXNjcmlwdF9xdWlja19zdGFydC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vdmFuaWxsYV9qYXZhc2NyaXB0X3F1aWNrX3N0YXJ0L3dlYnBhY2svcnVudGltZS9nZXQgamF2YXNjcmlwdCB1cGRhdGUgY2h1bmsgZmlsZW5hbWUiLCJ3ZWJwYWNrOi8vdmFuaWxsYV9qYXZhc2NyaXB0X3F1aWNrX3N0YXJ0L3dlYnBhY2svcnVudGltZS9nZXQgbWluaS1jc3MgY2h1bmsgZmlsZW5hbWUiLCJ3ZWJwYWNrOi8vdmFuaWxsYV9qYXZhc2NyaXB0X3F1aWNrX3N0YXJ0L3dlYnBhY2svcnVudGltZS9nZXQgdXBkYXRlIG1hbmlmZXN0IGZpbGVuYW1lIiwid2VicGFjazovL3ZhbmlsbGFfamF2YXNjcmlwdF9xdWlja19zdGFydC93ZWJwYWNrL3J1bnRpbWUvZ2V0RnVsbEhhc2giLCJ3ZWJwYWNrOi8vdmFuaWxsYV9qYXZhc2NyaXB0X3F1aWNrX3N0YXJ0L3dlYnBhY2svcnVudGltZS9nbG9iYWwiLCJ3ZWJwYWNrOi8vdmFuaWxsYV9qYXZhc2NyaXB0X3F1aWNrX3N0YXJ0L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdmFuaWxsYV9qYXZhc2NyaXB0X3F1aWNrX3N0YXJ0L3dlYnBhY2svcnVudGltZS9sb2FkIHNjcmlwdCIsIndlYnBhY2s6Ly92YW5pbGxhX2phdmFzY3JpcHRfcXVpY2tfc3RhcnQvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly92YW5pbGxhX2phdmFzY3JpcHRfcXVpY2tfc3RhcnQvd2VicGFjay9ydW50aW1lL2hvdCBtb2R1bGUgcmVwbGFjZW1lbnQiLCJ3ZWJwYWNrOi8vdmFuaWxsYV9qYXZhc2NyaXB0X3F1aWNrX3N0YXJ0L3dlYnBhY2svcnVudGltZS9wdWJsaWNQYXRoIiwid2VicGFjazovL3ZhbmlsbGFfamF2YXNjcmlwdF9xdWlja19zdGFydC93ZWJwYWNrL3J1bnRpbWUvY3NzIGxvYWRpbmciLCJ3ZWJwYWNrOi8vdmFuaWxsYV9qYXZhc2NyaXB0X3F1aWNrX3N0YXJ0L3dlYnBhY2svcnVudGltZS9qc29ucCBjaHVuayBsb2FkaW5nIiwid2VicGFjazovL3ZhbmlsbGFfamF2YXNjcmlwdF9xdWlja19zdGFydC93ZWJwYWNrL2JlZm9yZS1zdGFydHVwIiwid2VicGFjazovL3ZhbmlsbGFfamF2YXNjcmlwdF9xdWlja19zdGFydC93ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrOi8vdmFuaWxsYV9qYXZhc2NyaXB0X3F1aWNrX3N0YXJ0L3dlYnBhY2svYWZ0ZXItc3RhcnR1cCJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zb2xlLmxvZyhcIlByZWxvYWRlclwiKTtcbiIsIid1c2Ugc3RyaWN0J1xuXG5tb2R1bGUuZXhwb3J0cyA9IGFuc2lIVE1MXG5cbi8vIFJlZmVyZW5jZSB0byBodHRwczovL2dpdGh1Yi5jb20vc2luZHJlc29yaHVzL2Fuc2ktcmVnZXhcbnZhciBfcmVnQU5TSSA9IC8oPzooPzpcXHUwMDFiXFxbKXxcXHUwMDliKSg/Oig/OlswLTldezEsM30pPyg/Oig/OjtbMC05XXswLDN9KSopP1tBLU18Zi1tXSl8XFx1MDAxYltBLU1dL1xuXG52YXIgX2RlZkNvbG9ycyA9IHtcbiAgcmVzZXQ6IFsnZmZmJywgJzAwMCddLCAvLyBbRk9SRUdST1VEX0NPTE9SLCBCQUNLR1JPVU5EX0NPTE9SXVxuICBibGFjazogJzAwMCcsXG4gIHJlZDogJ2ZmMDAwMCcsXG4gIGdyZWVuOiAnMjA5ODA1JyxcbiAgeWVsbG93OiAnZThiZjAzJyxcbiAgYmx1ZTogJzAwMDBmZicsXG4gIG1hZ2VudGE6ICdmZjAwZmYnLFxuICBjeWFuOiAnMDBmZmVlJyxcbiAgbGlnaHRncmV5OiAnZjBmMGYwJyxcbiAgZGFya2dyZXk6ICc4ODgnXG59XG52YXIgX3N0eWxlcyA9IHtcbiAgMzA6ICdibGFjaycsXG4gIDMxOiAncmVkJyxcbiAgMzI6ICdncmVlbicsXG4gIDMzOiAneWVsbG93JyxcbiAgMzQ6ICdibHVlJyxcbiAgMzU6ICdtYWdlbnRhJyxcbiAgMzY6ICdjeWFuJyxcbiAgMzc6ICdsaWdodGdyZXknXG59XG52YXIgX29wZW5UYWdzID0ge1xuICAnMSc6ICdmb250LXdlaWdodDpib2xkJywgLy8gYm9sZFxuICAnMic6ICdvcGFjaXR5OjAuNScsIC8vIGRpbVxuICAnMyc6ICc8aT4nLCAvLyBpdGFsaWNcbiAgJzQnOiAnPHU+JywgLy8gdW5kZXJzY29yZVxuICAnOCc6ICdkaXNwbGF5Om5vbmUnLCAvLyBoaWRkZW5cbiAgJzknOiAnPGRlbD4nIC8vIGRlbGV0ZVxufVxudmFyIF9jbG9zZVRhZ3MgPSB7XG4gICcyMyc6ICc8L2k+JywgLy8gcmVzZXQgaXRhbGljXG4gICcyNCc6ICc8L3U+JywgLy8gcmVzZXQgdW5kZXJzY29yZVxuICAnMjknOiAnPC9kZWw+JyAvLyByZXNldCBkZWxldGVcbn1cblxuO1swLCAyMSwgMjIsIDI3LCAyOCwgMzksIDQ5XS5mb3JFYWNoKGZ1bmN0aW9uIChuKSB7XG4gIF9jbG9zZVRhZ3Nbbl0gPSAnPC9zcGFuPidcbn0pXG5cbi8qKlxuICogQ29udmVydHMgdGV4dCB3aXRoIEFOU0kgY29sb3IgY29kZXMgdG8gSFRNTCBtYXJrdXAuXG4gKiBAcGFyYW0ge1N0cmluZ30gdGV4dFxuICogQHJldHVybnMgeyp9XG4gKi9cbmZ1bmN0aW9uIGFuc2lIVE1MICh0ZXh0KSB7XG4gIC8vIFJldHVybnMgdGhlIHRleHQgaWYgdGhlIHN0cmluZyBoYXMgbm8gQU5TSSBlc2NhcGUgY29kZS5cbiAgaWYgKCFfcmVnQU5TSS50ZXN0KHRleHQpKSB7XG4gICAgcmV0dXJuIHRleHRcbiAgfVxuXG4gIC8vIENhY2hlIG9wZW5lZCBzZXF1ZW5jZS5cbiAgdmFyIGFuc2lDb2RlcyA9IFtdXG4gIC8vIFJlcGxhY2Ugd2l0aCBtYXJrdXAuXG4gIHZhciByZXQgPSB0ZXh0LnJlcGxhY2UoL1xcMDMzXFxbKFxcZCspbS9nLCBmdW5jdGlvbiAobWF0Y2gsIHNlcSkge1xuICAgIHZhciBvdCA9IF9vcGVuVGFnc1tzZXFdXG4gICAgaWYgKG90KSB7XG4gICAgICAvLyBJZiBjdXJyZW50IHNlcXVlbmNlIGhhcyBiZWVuIG9wZW5lZCwgY2xvc2UgaXQuXG4gICAgICBpZiAoISF+YW5zaUNvZGVzLmluZGV4T2Yoc2VxKSkgeyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLWV4dHJhLWJvb2xlYW4tY2FzdFxuICAgICAgICBhbnNpQ29kZXMucG9wKClcbiAgICAgICAgcmV0dXJuICc8L3NwYW4+J1xuICAgICAgfVxuICAgICAgLy8gT3BlbiB0YWcuXG4gICAgICBhbnNpQ29kZXMucHVzaChzZXEpXG4gICAgICByZXR1cm4gb3RbMF0gPT09ICc8JyA/IG90IDogJzxzcGFuIHN0eWxlPVwiJyArIG90ICsgJztcIj4nXG4gICAgfVxuXG4gICAgdmFyIGN0ID0gX2Nsb3NlVGFnc1tzZXFdXG4gICAgaWYgKGN0KSB7XG4gICAgICAvLyBQb3Agc2VxdWVuY2VcbiAgICAgIGFuc2lDb2Rlcy5wb3AoKVxuICAgICAgcmV0dXJuIGN0XG4gICAgfVxuICAgIHJldHVybiAnJ1xuICB9KVxuXG4gIC8vIE1ha2Ugc3VyZSB0YWdzIGFyZSBjbG9zZWQuXG4gIHZhciBsID0gYW5zaUNvZGVzLmxlbmd0aFxuICA7KGwgPiAwKSAmJiAocmV0ICs9IEFycmF5KGwgKyAxKS5qb2luKCc8L3NwYW4+JykpXG5cbiAgcmV0dXJuIHJldFxufVxuXG4vKipcbiAqIEN1c3RvbWl6ZSBjb2xvcnMuXG4gKiBAcGFyYW0ge09iamVjdH0gY29sb3JzIHJlZmVyZW5jZSB0byBfZGVmQ29sb3JzXG4gKi9cbmFuc2lIVE1MLnNldENvbG9ycyA9IGZ1bmN0aW9uIChjb2xvcnMpIHtcbiAgaWYgKHR5cGVvZiBjb2xvcnMgIT09ICdvYmplY3QnKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdgY29sb3JzYCBwYXJhbWV0ZXIgbXVzdCBiZSBhbiBPYmplY3QuJylcbiAgfVxuXG4gIHZhciBfZmluYWxDb2xvcnMgPSB7fVxuICBmb3IgKHZhciBrZXkgaW4gX2RlZkNvbG9ycykge1xuICAgIHZhciBoZXggPSBjb2xvcnMuaGFzT3duUHJvcGVydHkoa2V5KSA/IGNvbG9yc1trZXldIDogbnVsbFxuICAgIGlmICghaGV4KSB7XG4gICAgICBfZmluYWxDb2xvcnNba2V5XSA9IF9kZWZDb2xvcnNba2V5XVxuICAgICAgY29udGludWVcbiAgICB9XG4gICAgaWYgKCdyZXNldCcgPT09IGtleSkge1xuICAgICAgaWYgKHR5cGVvZiBoZXggPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIGhleCA9IFtoZXhdXG4gICAgICB9XG4gICAgICBpZiAoIUFycmF5LmlzQXJyYXkoaGV4KSB8fCBoZXgubGVuZ3RoID09PSAwIHx8IGhleC5zb21lKGZ1bmN0aW9uIChoKSB7XG4gICAgICAgIHJldHVybiB0eXBlb2YgaCAhPT0gJ3N0cmluZydcbiAgICAgIH0pKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignVGhlIHZhbHVlIG9mIGAnICsga2V5ICsgJ2AgcHJvcGVydHkgbXVzdCBiZSBhbiBBcnJheSBhbmQgZWFjaCBpdGVtIGNvdWxkIG9ubHkgYmUgYSBoZXggc3RyaW5nLCBlLmcuOiBGRjAwMDAnKVxuICAgICAgfVxuICAgICAgdmFyIGRlZkhleENvbG9yID0gX2RlZkNvbG9yc1trZXldXG4gICAgICBpZiAoIWhleFswXSkge1xuICAgICAgICBoZXhbMF0gPSBkZWZIZXhDb2xvclswXVxuICAgICAgfVxuICAgICAgaWYgKGhleC5sZW5ndGggPT09IDEgfHwgIWhleFsxXSkge1xuICAgICAgICBoZXggPSBbaGV4WzBdXVxuICAgICAgICBoZXgucHVzaChkZWZIZXhDb2xvclsxXSlcbiAgICAgIH1cblxuICAgICAgaGV4ID0gaGV4LnNsaWNlKDAsIDIpXG4gICAgfSBlbHNlIGlmICh0eXBlb2YgaGV4ICE9PSAnc3RyaW5nJykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdUaGUgdmFsdWUgb2YgYCcgKyBrZXkgKyAnYCBwcm9wZXJ0eSBtdXN0IGJlIGEgaGV4IHN0cmluZywgZS5nLjogRkYwMDAwJylcbiAgICB9XG4gICAgX2ZpbmFsQ29sb3JzW2tleV0gPSBoZXhcbiAgfVxuICBfc2V0VGFncyhfZmluYWxDb2xvcnMpXG59XG5cbi8qKlxuICogUmVzZXQgY29sb3JzLlxuICovXG5hbnNpSFRNTC5yZXNldCA9IGZ1bmN0aW9uICgpIHtcbiAgX3NldFRhZ3MoX2RlZkNvbG9ycylcbn1cblxuLyoqXG4gKiBFeHBvc2UgdGFncywgaW5jbHVkaW5nIG9wZW4gYW5kIGNsb3NlLlxuICogQHR5cGUge09iamVjdH1cbiAqL1xuYW5zaUhUTUwudGFncyA9IHt9XG5cbmlmIChPYmplY3QuZGVmaW5lUHJvcGVydHkpIHtcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGFuc2lIVE1MLnRhZ3MsICdvcGVuJywge1xuICAgIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gX29wZW5UYWdzIH1cbiAgfSlcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGFuc2lIVE1MLnRhZ3MsICdjbG9zZScsIHtcbiAgICBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIF9jbG9zZVRhZ3MgfVxuICB9KVxufSBlbHNlIHtcbiAgYW5zaUhUTUwudGFncy5vcGVuID0gX29wZW5UYWdzXG4gIGFuc2lIVE1MLnRhZ3MuY2xvc2UgPSBfY2xvc2VUYWdzXG59XG5cbmZ1bmN0aW9uIF9zZXRUYWdzIChjb2xvcnMpIHtcbiAgLy8gcmVzZXQgYWxsXG4gIF9vcGVuVGFnc1snMCddID0gJ2ZvbnQtd2VpZ2h0Om5vcm1hbDtvcGFjaXR5OjE7Y29sb3I6IycgKyBjb2xvcnMucmVzZXRbMF0gKyAnO2JhY2tncm91bmQ6IycgKyBjb2xvcnMucmVzZXRbMV1cbiAgLy8gaW52ZXJzZVxuICBfb3BlblRhZ3NbJzcnXSA9ICdjb2xvcjojJyArIGNvbG9ycy5yZXNldFsxXSArICc7YmFja2dyb3VuZDojJyArIGNvbG9ycy5yZXNldFswXVxuICAvLyBkYXJrIGdyZXlcbiAgX29wZW5UYWdzWyc5MCddID0gJ2NvbG9yOiMnICsgY29sb3JzLmRhcmtncmV5XG5cbiAgZm9yICh2YXIgY29kZSBpbiBfc3R5bGVzKSB7XG4gICAgdmFyIGNvbG9yID0gX3N0eWxlc1tjb2RlXVxuICAgIHZhciBvcmlDb2xvciA9IGNvbG9yc1tjb2xvcl0gfHwgJzAwMCdcbiAgICBfb3BlblRhZ3NbY29kZV0gPSAnY29sb3I6IycgKyBvcmlDb2xvclxuICAgIGNvZGUgPSBwYXJzZUludChjb2RlKVxuICAgIF9vcGVuVGFnc1soY29kZSArIDEwKS50b1N0cmluZygpXSA9ICdiYWNrZ3JvdW5kOiMnICsgb3JpQ29sb3JcbiAgfVxufVxuXG5hbnNpSFRNTC5yZXNldCgpXG4iLCIvLyBDb3B5cmlnaHQgSm95ZW50LCBJbmMuIGFuZCBvdGhlciBOb2RlIGNvbnRyaWJ1dG9ycy5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYVxuLy8gY29weSBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZVxuLy8gXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbCBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nXG4vLyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0cyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsXG4vLyBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0XG4vLyBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGVcbi8vIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkXG4vLyBpbiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTXG4vLyBPUiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GXG4vLyBNRVJDSEFOVEFCSUxJVFksIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOXG4vLyBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSxcbi8vIERBTUFHRVMgT1IgT1RIRVIgTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUlxuLy8gT1RIRVJXSVNFLCBBUklTSU5HIEZST00sIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRVxuLy8gVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRSBTT0ZUV0FSRS5cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgUiA9IHR5cGVvZiBSZWZsZWN0ID09PSAnb2JqZWN0JyA/IFJlZmxlY3QgOiBudWxsXG52YXIgUmVmbGVjdEFwcGx5ID0gUiAmJiB0eXBlb2YgUi5hcHBseSA9PT0gJ2Z1bmN0aW9uJ1xuICA/IFIuYXBwbHlcbiAgOiBmdW5jdGlvbiBSZWZsZWN0QXBwbHkodGFyZ2V0LCByZWNlaXZlciwgYXJncykge1xuICAgIHJldHVybiBGdW5jdGlvbi5wcm90b3R5cGUuYXBwbHkuY2FsbCh0YXJnZXQsIHJlY2VpdmVyLCBhcmdzKTtcbiAgfVxuXG52YXIgUmVmbGVjdE93bktleXNcbmlmIChSICYmIHR5cGVvZiBSLm93bktleXMgPT09ICdmdW5jdGlvbicpIHtcbiAgUmVmbGVjdE93bktleXMgPSBSLm93bktleXNcbn0gZWxzZSBpZiAoT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scykge1xuICBSZWZsZWN0T3duS2V5cyA9IGZ1bmN0aW9uIFJlZmxlY3RPd25LZXlzKHRhcmdldCkge1xuICAgIHJldHVybiBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyh0YXJnZXQpXG4gICAgICAuY29uY2F0KE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHModGFyZ2V0KSk7XG4gIH07XG59IGVsc2Uge1xuICBSZWZsZWN0T3duS2V5cyA9IGZ1bmN0aW9uIFJlZmxlY3RPd25LZXlzKHRhcmdldCkge1xuICAgIHJldHVybiBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyh0YXJnZXQpO1xuICB9O1xufVxuXG5mdW5jdGlvbiBQcm9jZXNzRW1pdFdhcm5pbmcod2FybmluZykge1xuICBpZiAoY29uc29sZSAmJiBjb25zb2xlLndhcm4pIGNvbnNvbGUud2Fybih3YXJuaW5nKTtcbn1cblxudmFyIE51bWJlcklzTmFOID0gTnVtYmVyLmlzTmFOIHx8IGZ1bmN0aW9uIE51bWJlcklzTmFOKHZhbHVlKSB7XG4gIHJldHVybiB2YWx1ZSAhPT0gdmFsdWU7XG59XG5cbmZ1bmN0aW9uIEV2ZW50RW1pdHRlcigpIHtcbiAgRXZlbnRFbWl0dGVyLmluaXQuY2FsbCh0aGlzKTtcbn1cbm1vZHVsZS5leHBvcnRzID0gRXZlbnRFbWl0dGVyO1xubW9kdWxlLmV4cG9ydHMub25jZSA9IG9uY2U7XG5cbi8vIEJhY2t3YXJkcy1jb21wYXQgd2l0aCBub2RlIDAuMTAueFxuRXZlbnRFbWl0dGVyLkV2ZW50RW1pdHRlciA9IEV2ZW50RW1pdHRlcjtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5fZXZlbnRzID0gdW5kZWZpbmVkO1xuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5fZXZlbnRzQ291bnQgPSAwO1xuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5fbWF4TGlzdGVuZXJzID0gdW5kZWZpbmVkO1xuXG4vLyBCeSBkZWZhdWx0IEV2ZW50RW1pdHRlcnMgd2lsbCBwcmludCBhIHdhcm5pbmcgaWYgbW9yZSB0aGFuIDEwIGxpc3RlbmVycyBhcmVcbi8vIGFkZGVkIHRvIGl0LiBUaGlzIGlzIGEgdXNlZnVsIGRlZmF1bHQgd2hpY2ggaGVscHMgZmluZGluZyBtZW1vcnkgbGVha3MuXG52YXIgZGVmYXVsdE1heExpc3RlbmVycyA9IDEwO1xuXG5mdW5jdGlvbiBjaGVja0xpc3RlbmVyKGxpc3RlbmVyKSB7XG4gIGlmICh0eXBlb2YgbGlzdGVuZXIgIT09ICdmdW5jdGlvbicpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdUaGUgXCJsaXN0ZW5lclwiIGFyZ3VtZW50IG11c3QgYmUgb2YgdHlwZSBGdW5jdGlvbi4gUmVjZWl2ZWQgdHlwZSAnICsgdHlwZW9mIGxpc3RlbmVyKTtcbiAgfVxufVxuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoRXZlbnRFbWl0dGVyLCAnZGVmYXVsdE1heExpc3RlbmVycycsIHtcbiAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gZGVmYXVsdE1heExpc3RlbmVycztcbiAgfSxcbiAgc2V0OiBmdW5jdGlvbihhcmcpIHtcbiAgICBpZiAodHlwZW9mIGFyZyAhPT0gJ251bWJlcicgfHwgYXJnIDwgMCB8fCBOdW1iZXJJc05hTihhcmcpKSB7XG4gICAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignVGhlIHZhbHVlIG9mIFwiZGVmYXVsdE1heExpc3RlbmVyc1wiIGlzIG91dCBvZiByYW5nZS4gSXQgbXVzdCBiZSBhIG5vbi1uZWdhdGl2ZSBudW1iZXIuIFJlY2VpdmVkICcgKyBhcmcgKyAnLicpO1xuICAgIH1cbiAgICBkZWZhdWx0TWF4TGlzdGVuZXJzID0gYXJnO1xuICB9XG59KTtcblxuRXZlbnRFbWl0dGVyLmluaXQgPSBmdW5jdGlvbigpIHtcblxuICBpZiAodGhpcy5fZXZlbnRzID09PSB1bmRlZmluZWQgfHxcbiAgICAgIHRoaXMuX2V2ZW50cyA9PT0gT2JqZWN0LmdldFByb3RvdHlwZU9mKHRoaXMpLl9ldmVudHMpIHtcbiAgICB0aGlzLl9ldmVudHMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICAgIHRoaXMuX2V2ZW50c0NvdW50ID0gMDtcbiAgfVxuXG4gIHRoaXMuX21heExpc3RlbmVycyA9IHRoaXMuX21heExpc3RlbmVycyB8fCB1bmRlZmluZWQ7XG59O1xuXG4vLyBPYnZpb3VzbHkgbm90IGFsbCBFbWl0dGVycyBzaG91bGQgYmUgbGltaXRlZCB0byAxMC4gVGhpcyBmdW5jdGlvbiBhbGxvd3Ncbi8vIHRoYXQgdG8gYmUgaW5jcmVhc2VkLiBTZXQgdG8gemVybyBmb3IgdW5saW1pdGVkLlxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5zZXRNYXhMaXN0ZW5lcnMgPSBmdW5jdGlvbiBzZXRNYXhMaXN0ZW5lcnMobikge1xuICBpZiAodHlwZW9mIG4gIT09ICdudW1iZXInIHx8IG4gPCAwIHx8IE51bWJlcklzTmFOKG4pKSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ1RoZSB2YWx1ZSBvZiBcIm5cIiBpcyBvdXQgb2YgcmFuZ2UuIEl0IG11c3QgYmUgYSBub24tbmVnYXRpdmUgbnVtYmVyLiBSZWNlaXZlZCAnICsgbiArICcuJyk7XG4gIH1cbiAgdGhpcy5fbWF4TGlzdGVuZXJzID0gbjtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5mdW5jdGlvbiBfZ2V0TWF4TGlzdGVuZXJzKHRoYXQpIHtcbiAgaWYgKHRoYXQuX21heExpc3RlbmVycyA9PT0gdW5kZWZpbmVkKVxuICAgIHJldHVybiBFdmVudEVtaXR0ZXIuZGVmYXVsdE1heExpc3RlbmVycztcbiAgcmV0dXJuIHRoYXQuX21heExpc3RlbmVycztcbn1cblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5nZXRNYXhMaXN0ZW5lcnMgPSBmdW5jdGlvbiBnZXRNYXhMaXN0ZW5lcnMoKSB7XG4gIHJldHVybiBfZ2V0TWF4TGlzdGVuZXJzKHRoaXMpO1xufTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5lbWl0ID0gZnVuY3Rpb24gZW1pdCh0eXBlKSB7XG4gIHZhciBhcmdzID0gW107XG4gIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSBhcmdzLnB1c2goYXJndW1lbnRzW2ldKTtcbiAgdmFyIGRvRXJyb3IgPSAodHlwZSA9PT0gJ2Vycm9yJyk7XG5cbiAgdmFyIGV2ZW50cyA9IHRoaXMuX2V2ZW50cztcbiAgaWYgKGV2ZW50cyAhPT0gdW5kZWZpbmVkKVxuICAgIGRvRXJyb3IgPSAoZG9FcnJvciAmJiBldmVudHMuZXJyb3IgPT09IHVuZGVmaW5lZCk7XG4gIGVsc2UgaWYgKCFkb0Vycm9yKVxuICAgIHJldHVybiBmYWxzZTtcblxuICAvLyBJZiB0aGVyZSBpcyBubyAnZXJyb3InIGV2ZW50IGxpc3RlbmVyIHRoZW4gdGhyb3cuXG4gIGlmIChkb0Vycm9yKSB7XG4gICAgdmFyIGVyO1xuICAgIGlmIChhcmdzLmxlbmd0aCA+IDApXG4gICAgICBlciA9IGFyZ3NbMF07XG4gICAgaWYgKGVyIGluc3RhbmNlb2YgRXJyb3IpIHtcbiAgICAgIC8vIE5vdGU6IFRoZSBjb21tZW50cyBvbiB0aGUgYHRocm93YCBsaW5lcyBhcmUgaW50ZW50aW9uYWwsIHRoZXkgc2hvd1xuICAgICAgLy8gdXAgaW4gTm9kZSdzIG91dHB1dCBpZiB0aGlzIHJlc3VsdHMgaW4gYW4gdW5oYW5kbGVkIGV4Y2VwdGlvbi5cbiAgICAgIHRocm93IGVyOyAvLyBVbmhhbmRsZWQgJ2Vycm9yJyBldmVudFxuICAgIH1cbiAgICAvLyBBdCBsZWFzdCBnaXZlIHNvbWUga2luZCBvZiBjb250ZXh0IHRvIHRoZSB1c2VyXG4gICAgdmFyIGVyciA9IG5ldyBFcnJvcignVW5oYW5kbGVkIGVycm9yLicgKyAoZXIgPyAnICgnICsgZXIubWVzc2FnZSArICcpJyA6ICcnKSk7XG4gICAgZXJyLmNvbnRleHQgPSBlcjtcbiAgICB0aHJvdyBlcnI7IC8vIFVuaGFuZGxlZCAnZXJyb3InIGV2ZW50XG4gIH1cblxuICB2YXIgaGFuZGxlciA9IGV2ZW50c1t0eXBlXTtcblxuICBpZiAoaGFuZGxlciA9PT0gdW5kZWZpbmVkKVxuICAgIHJldHVybiBmYWxzZTtcblxuICBpZiAodHlwZW9mIGhhbmRsZXIgPT09ICdmdW5jdGlvbicpIHtcbiAgICBSZWZsZWN0QXBwbHkoaGFuZGxlciwgdGhpcywgYXJncyk7XG4gIH0gZWxzZSB7XG4gICAgdmFyIGxlbiA9IGhhbmRsZXIubGVuZ3RoO1xuICAgIHZhciBsaXN0ZW5lcnMgPSBhcnJheUNsb25lKGhhbmRsZXIsIGxlbik7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47ICsraSlcbiAgICAgIFJlZmxlY3RBcHBseShsaXN0ZW5lcnNbaV0sIHRoaXMsIGFyZ3MpO1xuICB9XG5cbiAgcmV0dXJuIHRydWU7XG59O1xuXG5mdW5jdGlvbiBfYWRkTGlzdGVuZXIodGFyZ2V0LCB0eXBlLCBsaXN0ZW5lciwgcHJlcGVuZCkge1xuICB2YXIgbTtcbiAgdmFyIGV2ZW50cztcbiAgdmFyIGV4aXN0aW5nO1xuXG4gIGNoZWNrTGlzdGVuZXIobGlzdGVuZXIpO1xuXG4gIGV2ZW50cyA9IHRhcmdldC5fZXZlbnRzO1xuICBpZiAoZXZlbnRzID09PSB1bmRlZmluZWQpIHtcbiAgICBldmVudHMgPSB0YXJnZXQuX2V2ZW50cyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgdGFyZ2V0Ll9ldmVudHNDb3VudCA9IDA7XG4gIH0gZWxzZSB7XG4gICAgLy8gVG8gYXZvaWQgcmVjdXJzaW9uIGluIHRoZSBjYXNlIHRoYXQgdHlwZSA9PT0gXCJuZXdMaXN0ZW5lclwiISBCZWZvcmVcbiAgICAvLyBhZGRpbmcgaXQgdG8gdGhlIGxpc3RlbmVycywgZmlyc3QgZW1pdCBcIm5ld0xpc3RlbmVyXCIuXG4gICAgaWYgKGV2ZW50cy5uZXdMaXN0ZW5lciAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICB0YXJnZXQuZW1pdCgnbmV3TGlzdGVuZXInLCB0eXBlLFxuICAgICAgICAgICAgICAgICAgbGlzdGVuZXIubGlzdGVuZXIgPyBsaXN0ZW5lci5saXN0ZW5lciA6IGxpc3RlbmVyKTtcblxuICAgICAgLy8gUmUtYXNzaWduIGBldmVudHNgIGJlY2F1c2UgYSBuZXdMaXN0ZW5lciBoYW5kbGVyIGNvdWxkIGhhdmUgY2F1c2VkIHRoZVxuICAgICAgLy8gdGhpcy5fZXZlbnRzIHRvIGJlIGFzc2lnbmVkIHRvIGEgbmV3IG9iamVjdFxuICAgICAgZXZlbnRzID0gdGFyZ2V0Ll9ldmVudHM7XG4gICAgfVxuICAgIGV4aXN0aW5nID0gZXZlbnRzW3R5cGVdO1xuICB9XG5cbiAgaWYgKGV4aXN0aW5nID09PSB1bmRlZmluZWQpIHtcbiAgICAvLyBPcHRpbWl6ZSB0aGUgY2FzZSBvZiBvbmUgbGlzdGVuZXIuIERvbid0IG5lZWQgdGhlIGV4dHJhIGFycmF5IG9iamVjdC5cbiAgICBleGlzdGluZyA9IGV2ZW50c1t0eXBlXSA9IGxpc3RlbmVyO1xuICAgICsrdGFyZ2V0Ll9ldmVudHNDb3VudDtcbiAgfSBlbHNlIHtcbiAgICBpZiAodHlwZW9mIGV4aXN0aW5nID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAvLyBBZGRpbmcgdGhlIHNlY29uZCBlbGVtZW50LCBuZWVkIHRvIGNoYW5nZSB0byBhcnJheS5cbiAgICAgIGV4aXN0aW5nID0gZXZlbnRzW3R5cGVdID1cbiAgICAgICAgcHJlcGVuZCA/IFtsaXN0ZW5lciwgZXhpc3RpbmddIDogW2V4aXN0aW5nLCBsaXN0ZW5lcl07XG4gICAgICAvLyBJZiB3ZSd2ZSBhbHJlYWR5IGdvdCBhbiBhcnJheSwganVzdCBhcHBlbmQuXG4gICAgfSBlbHNlIGlmIChwcmVwZW5kKSB7XG4gICAgICBleGlzdGluZy51bnNoaWZ0KGxpc3RlbmVyKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZXhpc3RpbmcucHVzaChsaXN0ZW5lcik7XG4gICAgfVxuXG4gICAgLy8gQ2hlY2sgZm9yIGxpc3RlbmVyIGxlYWtcbiAgICBtID0gX2dldE1heExpc3RlbmVycyh0YXJnZXQpO1xuICAgIGlmIChtID4gMCAmJiBleGlzdGluZy5sZW5ndGggPiBtICYmICFleGlzdGluZy53YXJuZWQpIHtcbiAgICAgIGV4aXN0aW5nLndhcm5lZCA9IHRydWU7XG4gICAgICAvLyBObyBlcnJvciBjb2RlIGZvciB0aGlzIHNpbmNlIGl0IGlzIGEgV2FybmluZ1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXJlc3RyaWN0ZWQtc3ludGF4XG4gICAgICB2YXIgdyA9IG5ldyBFcnJvcignUG9zc2libGUgRXZlbnRFbWl0dGVyIG1lbW9yeSBsZWFrIGRldGVjdGVkLiAnICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgZXhpc3RpbmcubGVuZ3RoICsgJyAnICsgU3RyaW5nKHR5cGUpICsgJyBsaXN0ZW5lcnMgJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICdhZGRlZC4gVXNlIGVtaXR0ZXIuc2V0TWF4TGlzdGVuZXJzKCkgdG8gJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICdpbmNyZWFzZSBsaW1pdCcpO1xuICAgICAgdy5uYW1lID0gJ01heExpc3RlbmVyc0V4Y2VlZGVkV2FybmluZyc7XG4gICAgICB3LmVtaXR0ZXIgPSB0YXJnZXQ7XG4gICAgICB3LnR5cGUgPSB0eXBlO1xuICAgICAgdy5jb3VudCA9IGV4aXN0aW5nLmxlbmd0aDtcbiAgICAgIFByb2Nlc3NFbWl0V2FybmluZyh3KTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gdGFyZ2V0O1xufVxuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmFkZExpc3RlbmVyID0gZnVuY3Rpb24gYWRkTGlzdGVuZXIodHlwZSwgbGlzdGVuZXIpIHtcbiAgcmV0dXJuIF9hZGRMaXN0ZW5lcih0aGlzLCB0eXBlLCBsaXN0ZW5lciwgZmFsc2UpO1xufTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5vbiA9IEV2ZW50RW1pdHRlci5wcm90b3R5cGUuYWRkTGlzdGVuZXI7XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUucHJlcGVuZExpc3RlbmVyID1cbiAgICBmdW5jdGlvbiBwcmVwZW5kTGlzdGVuZXIodHlwZSwgbGlzdGVuZXIpIHtcbiAgICAgIHJldHVybiBfYWRkTGlzdGVuZXIodGhpcywgdHlwZSwgbGlzdGVuZXIsIHRydWUpO1xuICAgIH07XG5cbmZ1bmN0aW9uIG9uY2VXcmFwcGVyKCkge1xuICBpZiAoIXRoaXMuZmlyZWQpIHtcbiAgICB0aGlzLnRhcmdldC5yZW1vdmVMaXN0ZW5lcih0aGlzLnR5cGUsIHRoaXMud3JhcEZuKTtcbiAgICB0aGlzLmZpcmVkID0gdHJ1ZTtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMClcbiAgICAgIHJldHVybiB0aGlzLmxpc3RlbmVyLmNhbGwodGhpcy50YXJnZXQpO1xuICAgIHJldHVybiB0aGlzLmxpc3RlbmVyLmFwcGx5KHRoaXMudGFyZ2V0LCBhcmd1bWVudHMpO1xuICB9XG59XG5cbmZ1bmN0aW9uIF9vbmNlV3JhcCh0YXJnZXQsIHR5cGUsIGxpc3RlbmVyKSB7XG4gIHZhciBzdGF0ZSA9IHsgZmlyZWQ6IGZhbHNlLCB3cmFwRm46IHVuZGVmaW5lZCwgdGFyZ2V0OiB0YXJnZXQsIHR5cGU6IHR5cGUsIGxpc3RlbmVyOiBsaXN0ZW5lciB9O1xuICB2YXIgd3JhcHBlZCA9IG9uY2VXcmFwcGVyLmJpbmQoc3RhdGUpO1xuICB3cmFwcGVkLmxpc3RlbmVyID0gbGlzdGVuZXI7XG4gIHN0YXRlLndyYXBGbiA9IHdyYXBwZWQ7XG4gIHJldHVybiB3cmFwcGVkO1xufVxuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLm9uY2UgPSBmdW5jdGlvbiBvbmNlKHR5cGUsIGxpc3RlbmVyKSB7XG4gIGNoZWNrTGlzdGVuZXIobGlzdGVuZXIpO1xuICB0aGlzLm9uKHR5cGUsIF9vbmNlV3JhcCh0aGlzLCB0eXBlLCBsaXN0ZW5lcikpO1xuICByZXR1cm4gdGhpcztcbn07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUucHJlcGVuZE9uY2VMaXN0ZW5lciA9XG4gICAgZnVuY3Rpb24gcHJlcGVuZE9uY2VMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lcikge1xuICAgICAgY2hlY2tMaXN0ZW5lcihsaXN0ZW5lcik7XG4gICAgICB0aGlzLnByZXBlbmRMaXN0ZW5lcih0eXBlLCBfb25jZVdyYXAodGhpcywgdHlwZSwgbGlzdGVuZXIpKTtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG5cbi8vIEVtaXRzIGEgJ3JlbW92ZUxpc3RlbmVyJyBldmVudCBpZiBhbmQgb25seSBpZiB0aGUgbGlzdGVuZXIgd2FzIHJlbW92ZWQuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLnJlbW92ZUxpc3RlbmVyID1cbiAgICBmdW5jdGlvbiByZW1vdmVMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lcikge1xuICAgICAgdmFyIGxpc3QsIGV2ZW50cywgcG9zaXRpb24sIGksIG9yaWdpbmFsTGlzdGVuZXI7XG5cbiAgICAgIGNoZWNrTGlzdGVuZXIobGlzdGVuZXIpO1xuXG4gICAgICBldmVudHMgPSB0aGlzLl9ldmVudHM7XG4gICAgICBpZiAoZXZlbnRzID09PSB1bmRlZmluZWQpXG4gICAgICAgIHJldHVybiB0aGlzO1xuXG4gICAgICBsaXN0ID0gZXZlbnRzW3R5cGVdO1xuICAgICAgaWYgKGxpc3QgPT09IHVuZGVmaW5lZClcbiAgICAgICAgcmV0dXJuIHRoaXM7XG5cbiAgICAgIGlmIChsaXN0ID09PSBsaXN0ZW5lciB8fCBsaXN0Lmxpc3RlbmVyID09PSBsaXN0ZW5lcikge1xuICAgICAgICBpZiAoLS10aGlzLl9ldmVudHNDb3VudCA9PT0gMClcbiAgICAgICAgICB0aGlzLl9ldmVudHMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICAgICAgICBlbHNlIHtcbiAgICAgICAgICBkZWxldGUgZXZlbnRzW3R5cGVdO1xuICAgICAgICAgIGlmIChldmVudHMucmVtb3ZlTGlzdGVuZXIpXG4gICAgICAgICAgICB0aGlzLmVtaXQoJ3JlbW92ZUxpc3RlbmVyJywgdHlwZSwgbGlzdC5saXN0ZW5lciB8fCBsaXN0ZW5lcik7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGxpc3QgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgcG9zaXRpb24gPSAtMTtcblxuICAgICAgICBmb3IgKGkgPSBsaXN0Lmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgICAgaWYgKGxpc3RbaV0gPT09IGxpc3RlbmVyIHx8IGxpc3RbaV0ubGlzdGVuZXIgPT09IGxpc3RlbmVyKSB7XG4gICAgICAgICAgICBvcmlnaW5hbExpc3RlbmVyID0gbGlzdFtpXS5saXN0ZW5lcjtcbiAgICAgICAgICAgIHBvc2l0aW9uID0gaTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChwb3NpdGlvbiA8IDApXG4gICAgICAgICAgcmV0dXJuIHRoaXM7XG5cbiAgICAgICAgaWYgKHBvc2l0aW9uID09PSAwKVxuICAgICAgICAgIGxpc3Quc2hpZnQoKTtcbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgc3BsaWNlT25lKGxpc3QsIHBvc2l0aW9uKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChsaXN0Lmxlbmd0aCA9PT0gMSlcbiAgICAgICAgICBldmVudHNbdHlwZV0gPSBsaXN0WzBdO1xuXG4gICAgICAgIGlmIChldmVudHMucmVtb3ZlTGlzdGVuZXIgIT09IHVuZGVmaW5lZClcbiAgICAgICAgICB0aGlzLmVtaXQoJ3JlbW92ZUxpc3RlbmVyJywgdHlwZSwgb3JpZ2luYWxMaXN0ZW5lciB8fCBsaXN0ZW5lcik7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUub2ZmID0gRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5yZW1vdmVMaXN0ZW5lcjtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5yZW1vdmVBbGxMaXN0ZW5lcnMgPVxuICAgIGZ1bmN0aW9uIHJlbW92ZUFsbExpc3RlbmVycyh0eXBlKSB7XG4gICAgICB2YXIgbGlzdGVuZXJzLCBldmVudHMsIGk7XG5cbiAgICAgIGV2ZW50cyA9IHRoaXMuX2V2ZW50cztcbiAgICAgIGlmIChldmVudHMgPT09IHVuZGVmaW5lZClcbiAgICAgICAgcmV0dXJuIHRoaXM7XG5cbiAgICAgIC8vIG5vdCBsaXN0ZW5pbmcgZm9yIHJlbW92ZUxpc3RlbmVyLCBubyBuZWVkIHRvIGVtaXRcbiAgICAgIGlmIChldmVudHMucmVtb3ZlTGlzdGVuZXIgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgIHRoaXMuX2V2ZW50cyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgICAgICAgdGhpcy5fZXZlbnRzQ291bnQgPSAwO1xuICAgICAgICB9IGVsc2UgaWYgKGV2ZW50c1t0eXBlXSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgaWYgKC0tdGhpcy5fZXZlbnRzQ291bnQgPT09IDApXG4gICAgICAgICAgICB0aGlzLl9ldmVudHMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgIGRlbGV0ZSBldmVudHNbdHlwZV07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICB9XG5cbiAgICAgIC8vIGVtaXQgcmVtb3ZlTGlzdGVuZXIgZm9yIGFsbCBsaXN0ZW5lcnMgb24gYWxsIGV2ZW50c1xuICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgdmFyIGtleXMgPSBPYmplY3Qua2V5cyhldmVudHMpO1xuICAgICAgICB2YXIga2V5O1xuICAgICAgICBmb3IgKGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7ICsraSkge1xuICAgICAgICAgIGtleSA9IGtleXNbaV07XG4gICAgICAgICAgaWYgKGtleSA9PT0gJ3JlbW92ZUxpc3RlbmVyJykgY29udGludWU7XG4gICAgICAgICAgdGhpcy5yZW1vdmVBbGxMaXN0ZW5lcnMoa2V5KTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnJlbW92ZUFsbExpc3RlbmVycygncmVtb3ZlTGlzdGVuZXInKTtcbiAgICAgICAgdGhpcy5fZXZlbnRzID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICAgICAgdGhpcy5fZXZlbnRzQ291bnQgPSAwO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgIH1cblxuICAgICAgbGlzdGVuZXJzID0gZXZlbnRzW3R5cGVdO1xuXG4gICAgICBpZiAodHlwZW9mIGxpc3RlbmVycyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICB0aGlzLnJlbW92ZUxpc3RlbmVyKHR5cGUsIGxpc3RlbmVycyk7XG4gICAgICB9IGVsc2UgaWYgKGxpc3RlbmVycyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIC8vIExJRk8gb3JkZXJcbiAgICAgICAgZm9yIChpID0gbGlzdGVuZXJzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgICAgdGhpcy5yZW1vdmVMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lcnNbaV0pO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG5cbmZ1bmN0aW9uIF9saXN0ZW5lcnModGFyZ2V0LCB0eXBlLCB1bndyYXApIHtcbiAgdmFyIGV2ZW50cyA9IHRhcmdldC5fZXZlbnRzO1xuXG4gIGlmIChldmVudHMgPT09IHVuZGVmaW5lZClcbiAgICByZXR1cm4gW107XG5cbiAgdmFyIGV2bGlzdGVuZXIgPSBldmVudHNbdHlwZV07XG4gIGlmIChldmxpc3RlbmVyID09PSB1bmRlZmluZWQpXG4gICAgcmV0dXJuIFtdO1xuXG4gIGlmICh0eXBlb2YgZXZsaXN0ZW5lciA9PT0gJ2Z1bmN0aW9uJylcbiAgICByZXR1cm4gdW53cmFwID8gW2V2bGlzdGVuZXIubGlzdGVuZXIgfHwgZXZsaXN0ZW5lcl0gOiBbZXZsaXN0ZW5lcl07XG5cbiAgcmV0dXJuIHVud3JhcCA/XG4gICAgdW53cmFwTGlzdGVuZXJzKGV2bGlzdGVuZXIpIDogYXJyYXlDbG9uZShldmxpc3RlbmVyLCBldmxpc3RlbmVyLmxlbmd0aCk7XG59XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUubGlzdGVuZXJzID0gZnVuY3Rpb24gbGlzdGVuZXJzKHR5cGUpIHtcbiAgcmV0dXJuIF9saXN0ZW5lcnModGhpcywgdHlwZSwgdHJ1ZSk7XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLnJhd0xpc3RlbmVycyA9IGZ1bmN0aW9uIHJhd0xpc3RlbmVycyh0eXBlKSB7XG4gIHJldHVybiBfbGlzdGVuZXJzKHRoaXMsIHR5cGUsIGZhbHNlKTtcbn07XG5cbkV2ZW50RW1pdHRlci5saXN0ZW5lckNvdW50ID0gZnVuY3Rpb24oZW1pdHRlciwgdHlwZSkge1xuICBpZiAodHlwZW9mIGVtaXR0ZXIubGlzdGVuZXJDb3VudCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIHJldHVybiBlbWl0dGVyLmxpc3RlbmVyQ291bnQodHlwZSk7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGxpc3RlbmVyQ291bnQuY2FsbChlbWl0dGVyLCB0eXBlKTtcbiAgfVxufTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5saXN0ZW5lckNvdW50ID0gbGlzdGVuZXJDb3VudDtcbmZ1bmN0aW9uIGxpc3RlbmVyQ291bnQodHlwZSkge1xuICB2YXIgZXZlbnRzID0gdGhpcy5fZXZlbnRzO1xuXG4gIGlmIChldmVudHMgIT09IHVuZGVmaW5lZCkge1xuICAgIHZhciBldmxpc3RlbmVyID0gZXZlbnRzW3R5cGVdO1xuXG4gICAgaWYgKHR5cGVvZiBldmxpc3RlbmVyID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICByZXR1cm4gMTtcbiAgICB9IGVsc2UgaWYgKGV2bGlzdGVuZXIgIT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuIGV2bGlzdGVuZXIubGVuZ3RoO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiAwO1xufVxuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmV2ZW50TmFtZXMgPSBmdW5jdGlvbiBldmVudE5hbWVzKCkge1xuICByZXR1cm4gdGhpcy5fZXZlbnRzQ291bnQgPiAwID8gUmVmbGVjdE93bktleXModGhpcy5fZXZlbnRzKSA6IFtdO1xufTtcblxuZnVuY3Rpb24gYXJyYXlDbG9uZShhcnIsIG4pIHtcbiAgdmFyIGNvcHkgPSBuZXcgQXJyYXkobik7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbjsgKytpKVxuICAgIGNvcHlbaV0gPSBhcnJbaV07XG4gIHJldHVybiBjb3B5O1xufVxuXG5mdW5jdGlvbiBzcGxpY2VPbmUobGlzdCwgaW5kZXgpIHtcbiAgZm9yICg7IGluZGV4ICsgMSA8IGxpc3QubGVuZ3RoOyBpbmRleCsrKVxuICAgIGxpc3RbaW5kZXhdID0gbGlzdFtpbmRleCArIDFdO1xuICBsaXN0LnBvcCgpO1xufVxuXG5mdW5jdGlvbiB1bndyYXBMaXN0ZW5lcnMoYXJyKSB7XG4gIHZhciByZXQgPSBuZXcgQXJyYXkoYXJyLmxlbmd0aCk7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgcmV0Lmxlbmd0aDsgKytpKSB7XG4gICAgcmV0W2ldID0gYXJyW2ldLmxpc3RlbmVyIHx8IGFycltpXTtcbiAgfVxuICByZXR1cm4gcmV0O1xufVxuXG5mdW5jdGlvbiBvbmNlKGVtaXR0ZXIsIG5hbWUpIHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICBmdW5jdGlvbiBlcnJvckxpc3RlbmVyKGVycikge1xuICAgICAgZW1pdHRlci5yZW1vdmVMaXN0ZW5lcihuYW1lLCByZXNvbHZlcik7XG4gICAgICByZWplY3QoZXJyKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiByZXNvbHZlcigpIHtcbiAgICAgIGlmICh0eXBlb2YgZW1pdHRlci5yZW1vdmVMaXN0ZW5lciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICBlbWl0dGVyLnJlbW92ZUxpc3RlbmVyKCdlcnJvcicsIGVycm9yTGlzdGVuZXIpO1xuICAgICAgfVxuICAgICAgcmVzb2x2ZShbXS5zbGljZS5jYWxsKGFyZ3VtZW50cykpO1xuICAgIH07XG5cbiAgICBldmVudFRhcmdldEFnbm9zdGljQWRkTGlzdGVuZXIoZW1pdHRlciwgbmFtZSwgcmVzb2x2ZXIsIHsgb25jZTogdHJ1ZSB9KTtcbiAgICBpZiAobmFtZSAhPT0gJ2Vycm9yJykge1xuICAgICAgYWRkRXJyb3JIYW5kbGVySWZFdmVudEVtaXR0ZXIoZW1pdHRlciwgZXJyb3JMaXN0ZW5lciwgeyBvbmNlOiB0cnVlIH0pO1xuICAgIH1cbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGFkZEVycm9ySGFuZGxlcklmRXZlbnRFbWl0dGVyKGVtaXR0ZXIsIGhhbmRsZXIsIGZsYWdzKSB7XG4gIGlmICh0eXBlb2YgZW1pdHRlci5vbiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIGV2ZW50VGFyZ2V0QWdub3N0aWNBZGRMaXN0ZW5lcihlbWl0dGVyLCAnZXJyb3InLCBoYW5kbGVyLCBmbGFncyk7XG4gIH1cbn1cblxuZnVuY3Rpb24gZXZlbnRUYXJnZXRBZ25vc3RpY0FkZExpc3RlbmVyKGVtaXR0ZXIsIG5hbWUsIGxpc3RlbmVyLCBmbGFncykge1xuICBpZiAodHlwZW9mIGVtaXR0ZXIub24gPT09ICdmdW5jdGlvbicpIHtcbiAgICBpZiAoZmxhZ3Mub25jZSkge1xuICAgICAgZW1pdHRlci5vbmNlKG5hbWUsIGxpc3RlbmVyKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZW1pdHRlci5vbihuYW1lLCBsaXN0ZW5lcik7XG4gICAgfVxuICB9IGVsc2UgaWYgKHR5cGVvZiBlbWl0dGVyLmFkZEV2ZW50TGlzdGVuZXIgPT09ICdmdW5jdGlvbicpIHtcbiAgICAvLyBFdmVudFRhcmdldCBkb2VzIG5vdCBoYXZlIGBlcnJvcmAgZXZlbnQgc2VtYW50aWNzIGxpa2UgTm9kZVxuICAgIC8vIEV2ZW50RW1pdHRlcnMsIHdlIGRvIG5vdCBsaXN0ZW4gZm9yIGBlcnJvcmAgZXZlbnRzIGhlcmUuXG4gICAgZW1pdHRlci5hZGRFdmVudExpc3RlbmVyKG5hbWUsIGZ1bmN0aW9uIHdyYXBMaXN0ZW5lcihhcmcpIHtcbiAgICAgIC8vIElFIGRvZXMgbm90IGhhdmUgYnVpbHRpbiBgeyBvbmNlOiB0cnVlIH1gIHN1cHBvcnQgc28gd2VcbiAgICAgIC8vIGhhdmUgdG8gZG8gaXQgbWFudWFsbHkuXG4gICAgICBpZiAoZmxhZ3Mub25jZSkge1xuICAgICAgICBlbWl0dGVyLnJlbW92ZUV2ZW50TGlzdGVuZXIobmFtZSwgd3JhcExpc3RlbmVyKTtcbiAgICAgIH1cbiAgICAgIGxpc3RlbmVyKGFyZyk7XG4gICAgfSk7XG4gIH0gZWxzZSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignVGhlIFwiZW1pdHRlclwiIGFyZ3VtZW50IG11c3QgYmUgb2YgdHlwZSBFdmVudEVtaXR0ZXIuIFJlY2VpdmVkIHR5cGUgJyArIHR5cGVvZiBlbWl0dGVyKTtcbiAgfVxufVxuIiwiZnVuY3Rpb24gX3R5cGVvZihvKSB7IFwiQGJhYmVsL2hlbHBlcnMgLSB0eXBlb2ZcIjsgcmV0dXJuIF90eXBlb2YgPSBcImZ1bmN0aW9uXCIgPT0gdHlwZW9mIFN5bWJvbCAmJiBcInN5bWJvbFwiID09IHR5cGVvZiBTeW1ib2wuaXRlcmF0b3IgPyBmdW5jdGlvbiAobykgeyByZXR1cm4gdHlwZW9mIG87IH0gOiBmdW5jdGlvbiAobykgeyByZXR1cm4gbyAmJiBcImZ1bmN0aW9uXCIgPT0gdHlwZW9mIFN5bWJvbCAmJiBvLmNvbnN0cnVjdG9yID09PSBTeW1ib2wgJiYgbyAhPT0gU3ltYm9sLnByb3RvdHlwZSA/IFwic3ltYm9sXCIgOiB0eXBlb2YgbzsgfSwgX3R5cGVvZihvKTsgfVxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGEsIG4pIHsgaWYgKCEoYSBpbnN0YW5jZW9mIG4pKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpOyB9XG5mdW5jdGlvbiBfZGVmaW5lUHJvcGVydGllcyhlLCByKSB7IGZvciAodmFyIHQgPSAwOyB0IDwgci5sZW5ndGg7IHQrKykgeyB2YXIgbyA9IHJbdF07IG8uZW51bWVyYWJsZSA9IG8uZW51bWVyYWJsZSB8fCAhMSwgby5jb25maWd1cmFibGUgPSAhMCwgXCJ2YWx1ZVwiIGluIG8gJiYgKG8ud3JpdGFibGUgPSAhMCksIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShlLCBfdG9Qcm9wZXJ0eUtleShvLmtleSksIG8pOyB9IH1cbmZ1bmN0aW9uIF9jcmVhdGVDbGFzcyhlLCByLCB0KSB7IHJldHVybiByICYmIF9kZWZpbmVQcm9wZXJ0aWVzKGUucHJvdG90eXBlLCByKSwgdCAmJiBfZGVmaW5lUHJvcGVydGllcyhlLCB0KSwgT2JqZWN0LmRlZmluZVByb3BlcnR5KGUsIFwicHJvdG90eXBlXCIsIHsgd3JpdGFibGU6ICExIH0pLCBlOyB9XG5mdW5jdGlvbiBfdG9Qcm9wZXJ0eUtleSh0KSB7IHZhciBpID0gX3RvUHJpbWl0aXZlKHQsIFwic3RyaW5nXCIpOyByZXR1cm4gXCJzeW1ib2xcIiA9PSBfdHlwZW9mKGkpID8gaSA6IGkgKyBcIlwiOyB9XG5mdW5jdGlvbiBfdG9QcmltaXRpdmUodCwgcikgeyBpZiAoXCJvYmplY3RcIiAhPSBfdHlwZW9mKHQpIHx8ICF0KSByZXR1cm4gdDsgdmFyIGUgPSB0W1N5bWJvbC50b1ByaW1pdGl2ZV07IGlmICh2b2lkIDAgIT09IGUpIHsgdmFyIGkgPSBlLmNhbGwodCwgciB8fCBcImRlZmF1bHRcIik7IGlmIChcIm9iamVjdFwiICE9IF90eXBlb2YoaSkpIHJldHVybiBpOyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQEB0b1ByaW1pdGl2ZSBtdXN0IHJldHVybiBhIHByaW1pdGl2ZSB2YWx1ZS5cIik7IH0gcmV0dXJuIChcInN0cmluZ1wiID09PSByID8gU3RyaW5nIDogTnVtYmVyKSh0KTsgfVxuaW1wb3J0IHsgbG9nIH0gZnJvbSBcIi4uL3V0aWxzL2xvZy5qc1wiO1xudmFyIFdlYlNvY2tldENsaWVudCA9IC8qI19fUFVSRV9fKi9mdW5jdGlvbiAoKSB7XG4gIC8qKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gdXJsXG4gICAqL1xuICBmdW5jdGlvbiBXZWJTb2NrZXRDbGllbnQodXJsKSB7XG4gICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIFdlYlNvY2tldENsaWVudCk7XG4gICAgdGhpcy5jbGllbnQgPSBuZXcgV2ViU29ja2V0KHVybCk7XG4gICAgdGhpcy5jbGllbnQub25lcnJvciA9IGZ1bmN0aW9uIChlcnJvcikge1xuICAgICAgbG9nLmVycm9yKGVycm9yKTtcbiAgICB9O1xuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7KC4uLmFyZ3M6IGFueVtdKSA9PiB2b2lkfSBmXG4gICAqL1xuICByZXR1cm4gX2NyZWF0ZUNsYXNzKFdlYlNvY2tldENsaWVudCwgW3tcbiAgICBrZXk6IFwib25PcGVuXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIG9uT3BlbihmKSB7XG4gICAgICB0aGlzLmNsaWVudC5vbm9wZW4gPSBmO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7KC4uLmFyZ3M6IGFueVtdKSA9PiB2b2lkfSBmXG4gICAgICovXG4gIH0sIHtcbiAgICBrZXk6IFwib25DbG9zZVwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBvbkNsb3NlKGYpIHtcbiAgICAgIHRoaXMuY2xpZW50Lm9uY2xvc2UgPSBmO1xuICAgIH1cblxuICAgIC8vIGNhbGwgZiB3aXRoIHRoZSBtZXNzYWdlIHN0cmluZyBhcyB0aGUgZmlyc3QgYXJndW1lbnRcbiAgICAvKipcbiAgICAgKiBAcGFyYW0geyguLi5hcmdzOiBhbnlbXSkgPT4gdm9pZH0gZlxuICAgICAqL1xuICB9LCB7XG4gICAga2V5OiBcIm9uTWVzc2FnZVwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBvbk1lc3NhZ2UoZikge1xuICAgICAgdGhpcy5jbGllbnQub25tZXNzYWdlID0gZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgZihlLmRhdGEpO1xuICAgICAgfTtcbiAgICB9XG4gIH1dKTtcbn0oKTtcbmV4cG9ydCB7IFdlYlNvY2tldENsaWVudCBhcyBkZWZhdWx0IH07IiwiZnVuY3Rpb24gb3duS2V5cyhlLCByKSB7IHZhciB0ID0gT2JqZWN0LmtleXMoZSk7IGlmIChPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKSB7IHZhciBvID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhlKTsgciAmJiAobyA9IG8uZmlsdGVyKGZ1bmN0aW9uIChyKSB7IHJldHVybiBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKGUsIHIpLmVudW1lcmFibGU7IH0pKSwgdC5wdXNoLmFwcGx5KHQsIG8pOyB9IHJldHVybiB0OyB9XG5mdW5jdGlvbiBfb2JqZWN0U3ByZWFkKGUpIHsgZm9yICh2YXIgciA9IDE7IHIgPCBhcmd1bWVudHMubGVuZ3RoOyByKyspIHsgdmFyIHQgPSBudWxsICE9IGFyZ3VtZW50c1tyXSA/IGFyZ3VtZW50c1tyXSA6IHt9OyByICUgMiA/IG93bktleXMoT2JqZWN0KHQpLCAhMCkuZm9yRWFjaChmdW5jdGlvbiAocikgeyBfZGVmaW5lUHJvcGVydHkoZSwgciwgdFtyXSk7IH0pIDogT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcnMgPyBPYmplY3QuZGVmaW5lUHJvcGVydGllcyhlLCBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9ycyh0KSkgOiBvd25LZXlzKE9iamVjdCh0KSkuZm9yRWFjaChmdW5jdGlvbiAocikgeyBPYmplY3QuZGVmaW5lUHJvcGVydHkoZSwgciwgT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0LCByKSk7IH0pOyB9IHJldHVybiBlOyB9XG5mdW5jdGlvbiBfZGVmaW5lUHJvcGVydHkoZSwgciwgdCkgeyByZXR1cm4gKHIgPSBfdG9Qcm9wZXJ0eUtleShyKSkgaW4gZSA/IE9iamVjdC5kZWZpbmVQcm9wZXJ0eShlLCByLCB7IHZhbHVlOiB0LCBlbnVtZXJhYmxlOiAhMCwgY29uZmlndXJhYmxlOiAhMCwgd3JpdGFibGU6ICEwIH0pIDogZVtyXSA9IHQsIGU7IH1cbmZ1bmN0aW9uIF90b1Byb3BlcnR5S2V5KHQpIHsgdmFyIGkgPSBfdG9QcmltaXRpdmUodCwgXCJzdHJpbmdcIik7IHJldHVybiBcInN5bWJvbFwiID09IF90eXBlb2YoaSkgPyBpIDogaSArIFwiXCI7IH1cbmZ1bmN0aW9uIF90b1ByaW1pdGl2ZSh0LCByKSB7IGlmIChcIm9iamVjdFwiICE9IF90eXBlb2YodCkgfHwgIXQpIHJldHVybiB0OyB2YXIgZSA9IHRbU3ltYm9sLnRvUHJpbWl0aXZlXTsgaWYgKHZvaWQgMCAhPT0gZSkgeyB2YXIgaSA9IGUuY2FsbCh0LCByIHx8IFwiZGVmYXVsdFwiKTsgaWYgKFwib2JqZWN0XCIgIT0gX3R5cGVvZihpKSkgcmV0dXJuIGk7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJAQHRvUHJpbWl0aXZlIG11c3QgcmV0dXJuIGEgcHJpbWl0aXZlIHZhbHVlLlwiKTsgfSByZXR1cm4gKFwic3RyaW5nXCIgPT09IHIgPyBTdHJpbmcgOiBOdW1iZXIpKHQpOyB9XG5mdW5jdGlvbiBfdHlwZW9mKG8pIHsgXCJAYmFiZWwvaGVscGVycyAtIHR5cGVvZlwiOyByZXR1cm4gX3R5cGVvZiA9IFwiZnVuY3Rpb25cIiA9PSB0eXBlb2YgU3ltYm9sICYmIFwic3ltYm9sXCIgPT0gdHlwZW9mIFN5bWJvbC5pdGVyYXRvciA/IGZ1bmN0aW9uIChvKSB7IHJldHVybiB0eXBlb2YgbzsgfSA6IGZ1bmN0aW9uIChvKSB7IHJldHVybiBvICYmIFwiZnVuY3Rpb25cIiA9PSB0eXBlb2YgU3ltYm9sICYmIG8uY29uc3RydWN0b3IgPT09IFN5bWJvbCAmJiBvICE9PSBTeW1ib2wucHJvdG90eXBlID8gXCJzeW1ib2xcIiA6IHR5cGVvZiBvOyB9LCBfdHlwZW9mKG8pOyB9XG4vKiBnbG9iYWwgX19yZXNvdXJjZVF1ZXJ5LCBfX3dlYnBhY2tfaGFzaF9fICovXG4vLy8gPHJlZmVyZW5jZSB0eXBlcz1cIndlYnBhY2svbW9kdWxlXCIgLz5cbmltcG9ydCB3ZWJwYWNrSG90TG9nIGZyb20gXCJ3ZWJwYWNrL2hvdC9sb2cuanNcIjtcbmltcG9ydCBob3RFbWl0dGVyIGZyb20gXCJ3ZWJwYWNrL2hvdC9lbWl0dGVyLmpzXCI7XG5pbXBvcnQgc29ja2V0IGZyb20gXCIuL3NvY2tldC5qc1wiO1xuaW1wb3J0IHsgZm9ybWF0UHJvYmxlbSwgY3JlYXRlT3ZlcmxheSB9IGZyb20gXCIuL292ZXJsYXkuanNcIjtcbmltcG9ydCB7IGxvZywgc2V0TG9nTGV2ZWwgfSBmcm9tIFwiLi91dGlscy9sb2cuanNcIjtcbmltcG9ydCBzZW5kTWVzc2FnZSBmcm9tIFwiLi91dGlscy9zZW5kTWVzc2FnZS5qc1wiO1xuaW1wb3J0IHsgaXNQcm9ncmVzc1N1cHBvcnRlZCwgZGVmaW5lUHJvZ3Jlc3NFbGVtZW50IH0gZnJvbSBcIi4vcHJvZ3Jlc3MuanNcIjtcblxuLyoqXG4gKiBAdHlwZWRlZiB7T2JqZWN0fSBPdmVybGF5T3B0aW9uc1xuICogQHByb3BlcnR5IHtib29sZWFuIHwgKGVycm9yOiBFcnJvcikgPT4gYm9vbGVhbn0gW3dhcm5pbmdzXVxuICogQHByb3BlcnR5IHtib29sZWFuIHwgKGVycm9yOiBFcnJvcikgPT4gYm9vbGVhbn0gW2Vycm9yc11cbiAqIEBwcm9wZXJ0eSB7Ym9vbGVhbiB8IChlcnJvcjogRXJyb3IpID0+IGJvb2xlYW59IFtydW50aW1lRXJyb3JzXVxuICogQHByb3BlcnR5IHtzdHJpbmd9IFt0cnVzdGVkVHlwZXNQb2xpY3lOYW1lXVxuICovXG5cbi8qKlxuICogQHR5cGVkZWYge09iamVjdH0gT3B0aW9uc1xuICogQHByb3BlcnR5IHtib29sZWFufSBob3RcbiAqIEBwcm9wZXJ0eSB7Ym9vbGVhbn0gbGl2ZVJlbG9hZFxuICogQHByb3BlcnR5IHtib29sZWFufSBwcm9ncmVzc1xuICogQHByb3BlcnR5IHtib29sZWFuIHwgT3ZlcmxheU9wdGlvbnN9IG92ZXJsYXlcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBbbG9nZ2luZ11cbiAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBbcmVjb25uZWN0XVxuICovXG5cbi8qKlxuICogQHR5cGVkZWYge09iamVjdH0gU3RhdHVzXG4gKiBAcHJvcGVydHkge2Jvb2xlYW59IGlzVW5sb2FkaW5nXG4gKiBAcHJvcGVydHkge3N0cmluZ30gY3VycmVudEhhc2hcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBbcHJldmlvdXNIYXNoXVxuICovXG5cbi8qKlxuICogQHBhcmFtIHtib29sZWFuIHwgeyB3YXJuaW5ncz86IGJvb2xlYW4gfCBzdHJpbmc7IGVycm9ycz86IGJvb2xlYW4gfCBzdHJpbmc7IHJ1bnRpbWVFcnJvcnM/OiBib29sZWFuIHwgc3RyaW5nOyB9fSBvdmVybGF5T3B0aW9uc1xuICovXG52YXIgZGVjb2RlT3ZlcmxheU9wdGlvbnMgPSBmdW5jdGlvbiBkZWNvZGVPdmVybGF5T3B0aW9ucyhvdmVybGF5T3B0aW9ucykge1xuICBpZiAoX3R5cGVvZihvdmVybGF5T3B0aW9ucykgPT09IFwib2JqZWN0XCIpIHtcbiAgICBbXCJ3YXJuaW5nc1wiLCBcImVycm9yc1wiLCBcInJ1bnRpbWVFcnJvcnNcIl0uZm9yRWFjaChmdW5jdGlvbiAocHJvcGVydHkpIHtcbiAgICAgIGlmICh0eXBlb2Ygb3ZlcmxheU9wdGlvbnNbcHJvcGVydHldID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgIHZhciBvdmVybGF5RmlsdGVyRnVuY3Rpb25TdHJpbmcgPSBkZWNvZGVVUklDb21wb25lbnQob3ZlcmxheU9wdGlvbnNbcHJvcGVydHldKTtcblxuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tbmV3LWZ1bmNcbiAgICAgICAgb3ZlcmxheU9wdGlvbnNbcHJvcGVydHldID0gbmV3IEZ1bmN0aW9uKFwibWVzc2FnZVwiLCBcInZhciBjYWxsYmFjayA9IFwiLmNvbmNhdChvdmVybGF5RmlsdGVyRnVuY3Rpb25TdHJpbmcsIFwiXFxuICAgICAgICByZXR1cm4gY2FsbGJhY2sobWVzc2FnZSlcIikpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG59O1xuXG4vKipcbiAqIEB0eXBlIHtTdGF0dXN9XG4gKi9cbnZhciBzdGF0dXMgPSB7XG4gIGlzVW5sb2FkaW5nOiBmYWxzZSxcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGNhbWVsY2FzZVxuICBjdXJyZW50SGFzaDogX193ZWJwYWNrX2hhc2hfX1xufTtcblxuLyoqXG4gKiBAcmV0dXJucyB7c3RyaW5nfVxuICovXG52YXIgZ2V0Q3VycmVudFNjcmlwdFNvdXJjZSA9IGZ1bmN0aW9uIGdldEN1cnJlbnRTY3JpcHRTb3VyY2UoKSB7XG4gIC8vIGBkb2N1bWVudC5jdXJyZW50U2NyaXB0YCBpcyB0aGUgbW9zdCBhY2N1cmF0ZSB3YXkgdG8gZmluZCB0aGUgY3VycmVudCBzY3JpcHQsXG4gIC8vIGJ1dCBpcyBub3Qgc3VwcG9ydGVkIGluIGFsbCBicm93c2Vycy5cbiAgaWYgKGRvY3VtZW50LmN1cnJlbnRTY3JpcHQpIHtcbiAgICByZXR1cm4gZG9jdW1lbnQuY3VycmVudFNjcmlwdC5nZXRBdHRyaWJ1dGUoXCJzcmNcIik7XG4gIH1cblxuICAvLyBGYWxsYmFjayB0byBnZXR0aW5nIGFsbCBzY3JpcHRzIHJ1bm5pbmcgaW4gdGhlIGRvY3VtZW50LlxuICB2YXIgc2NyaXB0RWxlbWVudHMgPSBkb2N1bWVudC5zY3JpcHRzIHx8IFtdO1xuICB2YXIgc2NyaXB0RWxlbWVudHNXaXRoU3JjID0gQXJyYXkucHJvdG90eXBlLmZpbHRlci5jYWxsKHNjcmlwdEVsZW1lbnRzLCBmdW5jdGlvbiAoZWxlbWVudCkge1xuICAgIHJldHVybiBlbGVtZW50LmdldEF0dHJpYnV0ZShcInNyY1wiKTtcbiAgfSk7XG4gIGlmIChzY3JpcHRFbGVtZW50c1dpdGhTcmMubGVuZ3RoID4gMCkge1xuICAgIHZhciBjdXJyZW50U2NyaXB0ID0gc2NyaXB0RWxlbWVudHNXaXRoU3JjW3NjcmlwdEVsZW1lbnRzV2l0aFNyYy5sZW5ndGggLSAxXTtcbiAgICByZXR1cm4gY3VycmVudFNjcmlwdC5nZXRBdHRyaWJ1dGUoXCJzcmNcIik7XG4gIH1cblxuICAvLyBGYWlsIGFzIHRoZXJlIHdhcyBubyBzY3JpcHQgdG8gdXNlLlxuICB0aHJvdyBuZXcgRXJyb3IoXCJbd2VicGFjay1kZXYtc2VydmVyXSBGYWlsZWQgdG8gZ2V0IGN1cnJlbnQgc2NyaXB0IHNvdXJjZS5cIik7XG59O1xuXG4vKipcbiAqIEBwYXJhbSB7c3RyaW5nfSByZXNvdXJjZVF1ZXJ5XG4gKiBAcmV0dXJucyB7eyBba2V5OiBzdHJpbmddOiBzdHJpbmcgfCBib29sZWFuIH19XG4gKi9cbnZhciBwYXJzZVVSTCA9IGZ1bmN0aW9uIHBhcnNlVVJMKHJlc291cmNlUXVlcnkpIHtcbiAgLyoqIEB0eXBlIHt7IFtrZXk6IHN0cmluZ106IHN0cmluZyB9fSAqL1xuICB2YXIgcmVzdWx0ID0ge307XG4gIGlmICh0eXBlb2YgcmVzb3VyY2VRdWVyeSA9PT0gXCJzdHJpbmdcIiAmJiByZXNvdXJjZVF1ZXJ5ICE9PSBcIlwiKSB7XG4gICAgdmFyIHNlYXJjaFBhcmFtcyA9IHJlc291cmNlUXVlcnkuc2xpY2UoMSkuc3BsaXQoXCImXCIpO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc2VhcmNoUGFyYW1zLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgcGFpciA9IHNlYXJjaFBhcmFtc1tpXS5zcGxpdChcIj1cIik7XG4gICAgICByZXN1bHRbcGFpclswXV0gPSBkZWNvZGVVUklDb21wb25lbnQocGFpclsxXSk7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIC8vIEVsc2UsIGdldCB0aGUgdXJsIGZyb20gdGhlIDxzY3JpcHQ+IHRoaXMgZmlsZSB3YXMgY2FsbGVkIHdpdGguXG4gICAgdmFyIHNjcmlwdFNvdXJjZSA9IGdldEN1cnJlbnRTY3JpcHRTb3VyY2UoKTtcbiAgICB2YXIgc2NyaXB0U291cmNlVVJMO1xuICAgIHRyeSB7XG4gICAgICAvLyBUaGUgcGxhY2Vob2xkZXIgYGJhc2VVUkxgIHdpdGggYHdpbmRvdy5sb2NhdGlvbi5ocmVmYCxcbiAgICAgIC8vIGlzIHRvIGFsbG93IHBhcnNpbmcgb2YgcGF0aC1yZWxhdGl2ZSBvciBwcm90b2NvbC1yZWxhdGl2ZSBVUkxzLFxuICAgICAgLy8gYW5kIHdpbGwgaGF2ZSBubyBlZmZlY3QgaWYgYHNjcmlwdFNvdXJjZWAgaXMgYSBmdWxseSB2YWxpZCBVUkwuXG4gICAgICBzY3JpcHRTb3VyY2VVUkwgPSBuZXcgVVJMKHNjcmlwdFNvdXJjZSwgc2VsZi5sb2NhdGlvbi5ocmVmKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgLy8gVVJMIHBhcnNpbmcgZmFpbGVkLCBkbyBub3RoaW5nLlxuICAgICAgLy8gV2Ugd2lsbCBzdGlsbCBwcm9jZWVkIHRvIHNlZSBpZiB3ZSBjYW4gcmVjb3ZlciB1c2luZyBgcmVzb3VyY2VRdWVyeWBcbiAgICB9XG4gICAgaWYgKHNjcmlwdFNvdXJjZVVSTCkge1xuICAgICAgcmVzdWx0ID0gc2NyaXB0U291cmNlVVJMO1xuICAgICAgcmVzdWx0LmZyb21DdXJyZW50U2NyaXB0ID0gdHJ1ZTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn07XG52YXIgcGFyc2VkUmVzb3VyY2VRdWVyeSA9IHBhcnNlVVJMKF9fcmVzb3VyY2VRdWVyeSk7XG52YXIgZW5hYmxlZEZlYXR1cmVzID0ge1xuICBcIkhvdCBNb2R1bGUgUmVwbGFjZW1lbnRcIjogZmFsc2UsXG4gIFwiTGl2ZSBSZWxvYWRpbmdcIjogZmFsc2UsXG4gIFByb2dyZXNzOiBmYWxzZSxcbiAgT3ZlcmxheTogZmFsc2Vcbn07XG5cbi8qKiBAdHlwZSB7T3B0aW9uc30gKi9cbnZhciBvcHRpb25zID0ge1xuICBob3Q6IGZhbHNlLFxuICBsaXZlUmVsb2FkOiBmYWxzZSxcbiAgcHJvZ3Jlc3M6IGZhbHNlLFxuICBvdmVybGF5OiBmYWxzZVxufTtcbmlmIChwYXJzZWRSZXNvdXJjZVF1ZXJ5LmhvdCA9PT0gXCJ0cnVlXCIpIHtcbiAgb3B0aW9ucy5ob3QgPSB0cnVlO1xuICBlbmFibGVkRmVhdHVyZXNbXCJIb3QgTW9kdWxlIFJlcGxhY2VtZW50XCJdID0gdHJ1ZTtcbn1cbmlmIChwYXJzZWRSZXNvdXJjZVF1ZXJ5W1wibGl2ZS1yZWxvYWRcIl0gPT09IFwidHJ1ZVwiKSB7XG4gIG9wdGlvbnMubGl2ZVJlbG9hZCA9IHRydWU7XG4gIGVuYWJsZWRGZWF0dXJlc1tcIkxpdmUgUmVsb2FkaW5nXCJdID0gdHJ1ZTtcbn1cbmlmIChwYXJzZWRSZXNvdXJjZVF1ZXJ5LnByb2dyZXNzID09PSBcInRydWVcIikge1xuICBvcHRpb25zLnByb2dyZXNzID0gdHJ1ZTtcbiAgZW5hYmxlZEZlYXR1cmVzLlByb2dyZXNzID0gdHJ1ZTtcbn1cbmlmIChwYXJzZWRSZXNvdXJjZVF1ZXJ5Lm92ZXJsYXkpIHtcbiAgdHJ5IHtcbiAgICBvcHRpb25zLm92ZXJsYXkgPSBKU09OLnBhcnNlKHBhcnNlZFJlc291cmNlUXVlcnkub3ZlcmxheSk7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICBsb2cuZXJyb3IoXCJFcnJvciBwYXJzaW5nIG92ZXJsYXkgb3B0aW9ucyBmcm9tIHJlc291cmNlIHF1ZXJ5OlwiLCBlKTtcbiAgfVxuXG4gIC8vIEZpbGwgaW4gZGVmYXVsdCBcInRydWVcIiBwYXJhbXMgZm9yIHBhcnRpYWxseS1zcGVjaWZpZWQgb2JqZWN0cy5cbiAgaWYgKF90eXBlb2Yob3B0aW9ucy5vdmVybGF5KSA9PT0gXCJvYmplY3RcIikge1xuICAgIG9wdGlvbnMub3ZlcmxheSA9IF9vYmplY3RTcHJlYWQoe1xuICAgICAgZXJyb3JzOiB0cnVlLFxuICAgICAgd2FybmluZ3M6IHRydWUsXG4gICAgICBydW50aW1lRXJyb3JzOiB0cnVlXG4gICAgfSwgb3B0aW9ucy5vdmVybGF5KTtcbiAgICBkZWNvZGVPdmVybGF5T3B0aW9ucyhvcHRpb25zLm92ZXJsYXkpO1xuICB9XG4gIGVuYWJsZWRGZWF0dXJlcy5PdmVybGF5ID0gb3B0aW9ucy5vdmVybGF5ICE9PSBmYWxzZTtcbn1cbmlmIChwYXJzZWRSZXNvdXJjZVF1ZXJ5LmxvZ2dpbmcpIHtcbiAgb3B0aW9ucy5sb2dnaW5nID0gcGFyc2VkUmVzb3VyY2VRdWVyeS5sb2dnaW5nO1xufVxuaWYgKHR5cGVvZiBwYXJzZWRSZXNvdXJjZVF1ZXJ5LnJlY29ubmVjdCAhPT0gXCJ1bmRlZmluZWRcIikge1xuICBvcHRpb25zLnJlY29ubmVjdCA9IE51bWJlcihwYXJzZWRSZXNvdXJjZVF1ZXJ5LnJlY29ubmVjdCk7XG59XG5cbi8qKlxuICogQHBhcmFtIHtzdHJpbmd9IGxldmVsXG4gKi9cbnZhciBzZXRBbGxMb2dMZXZlbCA9IGZ1bmN0aW9uIHNldEFsbExvZ0xldmVsKGxldmVsKSB7XG4gIC8vIFRoaXMgaXMgbmVlZGVkIGJlY2F1c2UgdGhlIEhNUiBsb2dnZXIgb3BlcmF0ZSBzZXBhcmF0ZWx5IGZyb20gZGV2IHNlcnZlciBsb2dnZXJcbiAgd2VicGFja0hvdExvZy5zZXRMb2dMZXZlbChsZXZlbCA9PT0gXCJ2ZXJib3NlXCIgfHwgbGV2ZWwgPT09IFwibG9nXCIgPyBcImluZm9cIiA6IGxldmVsKTtcbiAgc2V0TG9nTGV2ZWwobGV2ZWwpO1xufTtcbmlmIChvcHRpb25zLmxvZ2dpbmcpIHtcbiAgc2V0QWxsTG9nTGV2ZWwob3B0aW9ucy5sb2dnaW5nKTtcbn1cbnZhciBsb2dFbmFibGVkRmVhdHVyZXMgPSBmdW5jdGlvbiBsb2dFbmFibGVkRmVhdHVyZXMoZmVhdHVyZXMpIHtcbiAgdmFyIGxpc3RFbmFibGVkRmVhdHVyZXMgPSBPYmplY3Qua2V5cyhmZWF0dXJlcyk7XG4gIGlmICghZmVhdHVyZXMgfHwgbGlzdEVuYWJsZWRGZWF0dXJlcy5sZW5ndGggPT09IDApIHtcbiAgICByZXR1cm47XG4gIH1cbiAgdmFyIGxvZ1N0cmluZyA9IFwiU2VydmVyIHN0YXJ0ZWQ6XCI7XG5cbiAgLy8gU2VydmVyIHN0YXJ0ZWQ6IEhvdCBNb2R1bGUgUmVwbGFjZW1lbnQgZW5hYmxlZCwgTGl2ZSBSZWxvYWRpbmcgZW5hYmxlZCwgT3ZlcmxheSBkaXNhYmxlZC5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0RW5hYmxlZEZlYXR1cmVzLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGtleSA9IGxpc3RFbmFibGVkRmVhdHVyZXNbaV07XG4gICAgbG9nU3RyaW5nICs9IFwiIFwiLmNvbmNhdChrZXksIFwiIFwiKS5jb25jYXQoZmVhdHVyZXNba2V5XSA/IFwiZW5hYmxlZFwiIDogXCJkaXNhYmxlZFwiLCBcIixcIik7XG4gIH1cbiAgLy8gcmVwbGFjZSBsYXN0IGNvbW1hIHdpdGggYSBwZXJpb2RcbiAgbG9nU3RyaW5nID0gbG9nU3RyaW5nLnNsaWNlKDAsIC0xKS5jb25jYXQoXCIuXCIpO1xuICBsb2cuaW5mbyhsb2dTdHJpbmcpO1xufTtcbmxvZ0VuYWJsZWRGZWF0dXJlcyhlbmFibGVkRmVhdHVyZXMpO1xuc2VsZi5hZGRFdmVudExpc3RlbmVyKFwiYmVmb3JldW5sb2FkXCIsIGZ1bmN0aW9uICgpIHtcbiAgc3RhdHVzLmlzVW5sb2FkaW5nID0gdHJ1ZTtcbn0pO1xudmFyIG92ZXJsYXkgPSB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gY3JlYXRlT3ZlcmxheShfdHlwZW9mKG9wdGlvbnMub3ZlcmxheSkgPT09IFwib2JqZWN0XCIgPyB7XG4gIHRydXN0ZWRUeXBlc1BvbGljeU5hbWU6IG9wdGlvbnMub3ZlcmxheS50cnVzdGVkVHlwZXNQb2xpY3lOYW1lLFxuICBjYXRjaFJ1bnRpbWVFcnJvcjogb3B0aW9ucy5vdmVybGF5LnJ1bnRpbWVFcnJvcnNcbn0gOiB7XG4gIHRydXN0ZWRUeXBlc1BvbGljeU5hbWU6IGZhbHNlLFxuICBjYXRjaFJ1bnRpbWVFcnJvcjogb3B0aW9ucy5vdmVybGF5XG59KSA6IHtcbiAgc2VuZDogZnVuY3Rpb24gc2VuZCgpIHt9XG59O1xuXG4vKipcbiAqIEBwYXJhbSB7T3B0aW9uc30gb3B0aW9uc1xuICogQHBhcmFtIHtTdGF0dXN9IGN1cnJlbnRTdGF0dXNcbiAqL1xudmFyIHJlbG9hZEFwcCA9IGZ1bmN0aW9uIHJlbG9hZEFwcChfcmVmLCBjdXJyZW50U3RhdHVzKSB7XG4gIHZhciBob3QgPSBfcmVmLmhvdCxcbiAgICBsaXZlUmVsb2FkID0gX3JlZi5saXZlUmVsb2FkO1xuICBpZiAoY3VycmVudFN0YXR1cy5pc1VubG9hZGluZykge1xuICAgIHJldHVybjtcbiAgfVxuICB2YXIgY3VycmVudEhhc2ggPSBjdXJyZW50U3RhdHVzLmN1cnJlbnRIYXNoLFxuICAgIHByZXZpb3VzSGFzaCA9IGN1cnJlbnRTdGF0dXMucHJldmlvdXNIYXNoO1xuICB2YXIgaXNJbml0aWFsID0gY3VycmVudEhhc2guaW5kZXhPZigvKiogQHR5cGUge3N0cmluZ30gKi9wcmV2aW91c0hhc2gpID49IDA7XG4gIGlmIChpc0luaXRpYWwpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHtXaW5kb3d9IHJvb3RXaW5kb3dcbiAgICogQHBhcmFtIHtudW1iZXJ9IGludGVydmFsSWRcbiAgICovXG4gIGZ1bmN0aW9uIGFwcGx5UmVsb2FkKHJvb3RXaW5kb3csIGludGVydmFsSWQpIHtcbiAgICBjbGVhckludGVydmFsKGludGVydmFsSWQpO1xuICAgIGxvZy5pbmZvKFwiQXBwIHVwZGF0ZWQuIFJlbG9hZGluZy4uLlwiKTtcbiAgICByb290V2luZG93LmxvY2F0aW9uLnJlbG9hZCgpO1xuICB9XG4gIHZhciBzZWFyY2ggPSBzZWxmLmxvY2F0aW9uLnNlYXJjaC50b0xvd2VyQ2FzZSgpO1xuICB2YXIgYWxsb3dUb0hvdCA9IHNlYXJjaC5pbmRleE9mKFwid2VicGFjay1kZXYtc2VydmVyLWhvdD1mYWxzZVwiKSA9PT0gLTE7XG4gIHZhciBhbGxvd1RvTGl2ZVJlbG9hZCA9IHNlYXJjaC5pbmRleE9mKFwid2VicGFjay1kZXYtc2VydmVyLWxpdmUtcmVsb2FkPWZhbHNlXCIpID09PSAtMTtcbiAgaWYgKGhvdCAmJiBhbGxvd1RvSG90KSB7XG4gICAgbG9nLmluZm8oXCJBcHAgaG90IHVwZGF0ZS4uLlwiKTtcbiAgICBob3RFbWl0dGVyLmVtaXQoXCJ3ZWJwYWNrSG90VXBkYXRlXCIsIGN1cnJlbnRTdGF0dXMuY3VycmVudEhhc2gpO1xuICAgIGlmICh0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiAmJiBzZWxmLndpbmRvdykge1xuICAgICAgLy8gYnJvYWRjYXN0IHVwZGF0ZSB0byB3aW5kb3dcbiAgICAgIHNlbGYucG9zdE1lc3NhZ2UoXCJ3ZWJwYWNrSG90VXBkYXRlXCIuY29uY2F0KGN1cnJlbnRTdGF0dXMuY3VycmVudEhhc2gpLCBcIipcIik7XG4gICAgfVxuICB9XG4gIC8vIGFsbG93IHJlZnJlc2hpbmcgdGhlIHBhZ2Ugb25seSBpZiBsaXZlUmVsb2FkIGlzbid0IGRpc2FibGVkXG4gIGVsc2UgaWYgKGxpdmVSZWxvYWQgJiYgYWxsb3dUb0xpdmVSZWxvYWQpIHtcbiAgICB2YXIgcm9vdFdpbmRvdyA9IHNlbGY7XG5cbiAgICAvLyB1c2UgcGFyZW50IHdpbmRvdyBmb3IgcmVsb2FkIChpbiBjYXNlIHdlJ3JlIGluIGFuIGlmcmFtZSB3aXRoIG5vIHZhbGlkIHNyYylcbiAgICB2YXIgaW50ZXJ2YWxJZCA9IHNlbGYuc2V0SW50ZXJ2YWwoZnVuY3Rpb24gKCkge1xuICAgICAgaWYgKHJvb3RXaW5kb3cubG9jYXRpb24ucHJvdG9jb2wgIT09IFwiYWJvdXQ6XCIpIHtcbiAgICAgICAgLy8gcmVsb2FkIGltbWVkaWF0ZWx5IGlmIHByb3RvY29sIGlzIHZhbGlkXG4gICAgICAgIGFwcGx5UmVsb2FkKHJvb3RXaW5kb3csIGludGVydmFsSWQpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcm9vdFdpbmRvdyA9IHJvb3RXaW5kb3cucGFyZW50O1xuICAgICAgICBpZiAocm9vdFdpbmRvdy5wYXJlbnQgPT09IHJvb3RXaW5kb3cpIHtcbiAgICAgICAgICAvLyBpZiBwYXJlbnQgZXF1YWxzIGN1cnJlbnQgd2luZG93IHdlJ3ZlIHJlYWNoZWQgdGhlIHJvb3Qgd2hpY2ggd291bGQgY29udGludWUgZm9yZXZlciwgc28gdHJpZ2dlciBhIHJlbG9hZCBhbnl3YXlzXG4gICAgICAgICAgYXBwbHlSZWxvYWQocm9vdFdpbmRvdywgaW50ZXJ2YWxJZCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcbiAgfVxufTtcbnZhciBhbnNpUmVnZXggPSBuZXcgUmVnRXhwKFtcIltcXFxcdTAwMUJcXFxcdTAwOUJdW1tcXFxcXSgpIzs/XSooPzooPzooPzooPzo7Wy1hLXpBLVpcXFxcZFxcXFwvIyYuOj0/JUB+X10rKSp8W2EtekEtWlxcXFxkXSsoPzo7Wy1hLXpBLVpcXFxcZFxcXFwvIyYuOj0/JUB+X10qKSopP1xcXFx1MDAwNylcIiwgXCIoPzooPzpcXFxcZHsxLDR9KD86O1xcXFxkezAsNH0pKik/W1xcXFxkQS1QUi1UWmNmLW5xLXV5PT48fl0pKVwiXS5qb2luKFwifFwiKSwgXCJnXCIpO1xuXG4vKipcbiAqXG4gKiBTdHJpcCBbQU5TSSBlc2NhcGUgY29kZXNdKGh0dHBzOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL0FOU0lfZXNjYXBlX2NvZGUpIGZyb20gYSBzdHJpbmcuXG4gKiBBZGFwdGVkIGZyb20gY29kZSBvcmlnaW5hbGx5IHJlbGVhc2VkIGJ5IFNpbmRyZSBTb3JodXNcbiAqIExpY2Vuc2VkIHRoZSBNSVQgTGljZW5zZVxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBzdHJpbmdcbiAqIEByZXR1cm4ge3N0cmluZ31cbiAqL1xudmFyIHN0cmlwQW5zaSA9IGZ1bmN0aW9uIHN0cmlwQW5zaShzdHJpbmcpIHtcbiAgaWYgKHR5cGVvZiBzdHJpbmcgIT09IFwic3RyaW5nXCIpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiRXhwZWN0ZWQgYSBgc3RyaW5nYCwgZ290IGBcIi5jb25jYXQoX3R5cGVvZihzdHJpbmcpLCBcImBcIikpO1xuICB9XG4gIHJldHVybiBzdHJpbmcucmVwbGFjZShhbnNpUmVnZXgsIFwiXCIpO1xufTtcbnZhciBvblNvY2tldE1lc3NhZ2UgPSB7XG4gIGhvdDogZnVuY3Rpb24gaG90KCkge1xuICAgIGlmIChwYXJzZWRSZXNvdXJjZVF1ZXJ5LmhvdCA9PT0gXCJmYWxzZVwiKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIG9wdGlvbnMuaG90ID0gdHJ1ZTtcbiAgfSxcbiAgbGl2ZVJlbG9hZDogZnVuY3Rpb24gbGl2ZVJlbG9hZCgpIHtcbiAgICBpZiAocGFyc2VkUmVzb3VyY2VRdWVyeVtcImxpdmUtcmVsb2FkXCJdID09PSBcImZhbHNlXCIpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgb3B0aW9ucy5saXZlUmVsb2FkID0gdHJ1ZTtcbiAgfSxcbiAgaW52YWxpZDogZnVuY3Rpb24gaW52YWxpZCgpIHtcbiAgICBsb2cuaW5mbyhcIkFwcCB1cGRhdGVkLiBSZWNvbXBpbGluZy4uLlwiKTtcblxuICAgIC8vIEZpeGVzICMxMDQyLiBvdmVybGF5IGRvZXNuJ3QgY2xlYXIgaWYgZXJyb3JzIGFyZSBmaXhlZCBidXQgd2FybmluZ3MgcmVtYWluLlxuICAgIGlmIChvcHRpb25zLm92ZXJsYXkpIHtcbiAgICAgIG92ZXJsYXkuc2VuZCh7XG4gICAgICAgIHR5cGU6IFwiRElTTUlTU1wiXG4gICAgICB9KTtcbiAgICB9XG4gICAgc2VuZE1lc3NhZ2UoXCJJbnZhbGlkXCIpO1xuICB9LFxuICAvKipcbiAgICogQHBhcmFtIHtzdHJpbmd9IGhhc2hcbiAgICovXG4gIGhhc2g6IGZ1bmN0aW9uIGhhc2goX2hhc2gpIHtcbiAgICBzdGF0dXMucHJldmlvdXNIYXNoID0gc3RhdHVzLmN1cnJlbnRIYXNoO1xuICAgIHN0YXR1cy5jdXJyZW50SGFzaCA9IF9oYXNoO1xuICB9LFxuICBsb2dnaW5nOiBzZXRBbGxMb2dMZXZlbCxcbiAgLyoqXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gdmFsdWVcbiAgICovXG4gIG92ZXJsYXk6IGZ1bmN0aW9uIG92ZXJsYXkodmFsdWUpIHtcbiAgICBpZiAodHlwZW9mIGRvY3VtZW50ID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIG9wdGlvbnMub3ZlcmxheSA9IHZhbHVlO1xuICAgIGRlY29kZU92ZXJsYXlPcHRpb25zKG9wdGlvbnMub3ZlcmxheSk7XG4gIH0sXG4gIC8qKlxuICAgKiBAcGFyYW0ge251bWJlcn0gdmFsdWVcbiAgICovXG4gIHJlY29ubmVjdDogZnVuY3Rpb24gcmVjb25uZWN0KHZhbHVlKSB7XG4gICAgaWYgKHBhcnNlZFJlc291cmNlUXVlcnkucmVjb25uZWN0ID09PSBcImZhbHNlXCIpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgb3B0aW9ucy5yZWNvbm5lY3QgPSB2YWx1ZTtcbiAgfSxcbiAgLyoqXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gdmFsdWVcbiAgICovXG4gIHByb2dyZXNzOiBmdW5jdGlvbiBwcm9ncmVzcyh2YWx1ZSkge1xuICAgIG9wdGlvbnMucHJvZ3Jlc3MgPSB2YWx1ZTtcbiAgfSxcbiAgLyoqXG4gICAqIEBwYXJhbSB7eyBwbHVnaW5OYW1lPzogc3RyaW5nLCBwZXJjZW50OiBudW1iZXIsIG1zZzogc3RyaW5nIH19IGRhdGFcbiAgICovXG4gIFwicHJvZ3Jlc3MtdXBkYXRlXCI6IGZ1bmN0aW9uIHByb2dyZXNzVXBkYXRlKGRhdGEpIHtcbiAgICBpZiAob3B0aW9ucy5wcm9ncmVzcykge1xuICAgICAgbG9nLmluZm8oXCJcIi5jb25jYXQoZGF0YS5wbHVnaW5OYW1lID8gXCJbXCIuY29uY2F0KGRhdGEucGx1Z2luTmFtZSwgXCJdIFwiKSA6IFwiXCIpLmNvbmNhdChkYXRhLnBlcmNlbnQsIFwiJSAtIFwiKS5jb25jYXQoZGF0YS5tc2csIFwiLlwiKSk7XG4gICAgfVxuICAgIGlmIChpc1Byb2dyZXNzU3VwcG9ydGVkKCkpIHtcbiAgICAgIGlmICh0eXBlb2Ygb3B0aW9ucy5wcm9ncmVzcyA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICB2YXIgcHJvZ3Jlc3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwid2RzLXByb2dyZXNzXCIpO1xuICAgICAgICBpZiAoIXByb2dyZXNzKSB7XG4gICAgICAgICAgZGVmaW5lUHJvZ3Jlc3NFbGVtZW50KCk7XG4gICAgICAgICAgcHJvZ3Jlc3MgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwid2RzLXByb2dyZXNzXCIpO1xuICAgICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQocHJvZ3Jlc3MpO1xuICAgICAgICB9XG4gICAgICAgIHByb2dyZXNzLnNldEF0dHJpYnV0ZShcInByb2dyZXNzXCIsIGRhdGEucGVyY2VudCk7XG4gICAgICAgIHByb2dyZXNzLnNldEF0dHJpYnV0ZShcInR5cGVcIiwgb3B0aW9ucy5wcm9ncmVzcyk7XG4gICAgICB9XG4gICAgfVxuICAgIHNlbmRNZXNzYWdlKFwiUHJvZ3Jlc3NcIiwgZGF0YSk7XG4gIH0sXG4gIFwic3RpbGwtb2tcIjogZnVuY3Rpb24gc3RpbGxPaygpIHtcbiAgICBsb2cuaW5mbyhcIk5vdGhpbmcgY2hhbmdlZC5cIik7XG4gICAgaWYgKG9wdGlvbnMub3ZlcmxheSkge1xuICAgICAgb3ZlcmxheS5zZW5kKHtcbiAgICAgICAgdHlwZTogXCJESVNNSVNTXCJcbiAgICAgIH0pO1xuICAgIH1cbiAgICBzZW5kTWVzc2FnZShcIlN0aWxsT2tcIik7XG4gIH0sXG4gIG9rOiBmdW5jdGlvbiBvaygpIHtcbiAgICBzZW5kTWVzc2FnZShcIk9rXCIpO1xuICAgIGlmIChvcHRpb25zLm92ZXJsYXkpIHtcbiAgICAgIG92ZXJsYXkuc2VuZCh7XG4gICAgICAgIHR5cGU6IFwiRElTTUlTU1wiXG4gICAgICB9KTtcbiAgICB9XG4gICAgcmVsb2FkQXBwKG9wdGlvbnMsIHN0YXR1cyk7XG4gIH0sXG4gIC8qKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gZmlsZVxuICAgKi9cbiAgXCJzdGF0aWMtY2hhbmdlZFwiOiBmdW5jdGlvbiBzdGF0aWNDaGFuZ2VkKGZpbGUpIHtcbiAgICBsb2cuaW5mbyhcIlwiLmNvbmNhdChmaWxlID8gXCJcXFwiXCIuY29uY2F0KGZpbGUsIFwiXFxcIlwiKSA6IFwiQ29udGVudFwiLCBcIiBmcm9tIHN0YXRpYyBkaXJlY3Rvcnkgd2FzIGNoYW5nZWQuIFJlbG9hZGluZy4uLlwiKSk7XG4gICAgc2VsZi5sb2NhdGlvbi5yZWxvYWQoKTtcbiAgfSxcbiAgLyoqXG4gICAqIEBwYXJhbSB7RXJyb3JbXX0gd2FybmluZ3NcbiAgICogQHBhcmFtIHthbnl9IHBhcmFtc1xuICAgKi9cbiAgd2FybmluZ3M6IGZ1bmN0aW9uIHdhcm5pbmdzKF93YXJuaW5ncywgcGFyYW1zKSB7XG4gICAgbG9nLndhcm4oXCJXYXJuaW5ncyB3aGlsZSBjb21waWxpbmcuXCIpO1xuICAgIHZhciBwcmludGFibGVXYXJuaW5ncyA9IF93YXJuaW5ncy5tYXAoZnVuY3Rpb24gKGVycm9yKSB7XG4gICAgICB2YXIgX2Zvcm1hdFByb2JsZW0gPSBmb3JtYXRQcm9ibGVtKFwid2FybmluZ1wiLCBlcnJvciksXG4gICAgICAgIGhlYWRlciA9IF9mb3JtYXRQcm9ibGVtLmhlYWRlcixcbiAgICAgICAgYm9keSA9IF9mb3JtYXRQcm9ibGVtLmJvZHk7XG4gICAgICByZXR1cm4gXCJcIi5jb25jYXQoaGVhZGVyLCBcIlxcblwiKS5jb25jYXQoc3RyaXBBbnNpKGJvZHkpKTtcbiAgICB9KTtcbiAgICBzZW5kTWVzc2FnZShcIldhcm5pbmdzXCIsIHByaW50YWJsZVdhcm5pbmdzKTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHByaW50YWJsZVdhcm5pbmdzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBsb2cud2FybihwcmludGFibGVXYXJuaW5nc1tpXSk7XG4gICAgfVxuICAgIHZhciBvdmVybGF5V2FybmluZ3NTZXR0aW5nID0gdHlwZW9mIG9wdGlvbnMub3ZlcmxheSA9PT0gXCJib29sZWFuXCIgPyBvcHRpb25zLm92ZXJsYXkgOiBvcHRpb25zLm92ZXJsYXkgJiYgb3B0aW9ucy5vdmVybGF5Lndhcm5pbmdzO1xuICAgIGlmIChvdmVybGF5V2FybmluZ3NTZXR0aW5nKSB7XG4gICAgICB2YXIgd2FybmluZ3NUb0Rpc3BsYXkgPSB0eXBlb2Ygb3ZlcmxheVdhcm5pbmdzU2V0dGluZyA9PT0gXCJmdW5jdGlvblwiID8gX3dhcm5pbmdzLmZpbHRlcihvdmVybGF5V2FybmluZ3NTZXR0aW5nKSA6IF93YXJuaW5ncztcbiAgICAgIGlmICh3YXJuaW5nc1RvRGlzcGxheS5sZW5ndGgpIHtcbiAgICAgICAgb3ZlcmxheS5zZW5kKHtcbiAgICAgICAgICB0eXBlOiBcIkJVSUxEX0VSUk9SXCIsXG4gICAgICAgICAgbGV2ZWw6IFwid2FybmluZ1wiLFxuICAgICAgICAgIG1lc3NhZ2VzOiBfd2FybmluZ3NcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChwYXJhbXMgJiYgcGFyYW1zLnByZXZlbnRSZWxvYWRpbmcpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgcmVsb2FkQXBwKG9wdGlvbnMsIHN0YXR1cyk7XG4gIH0sXG4gIC8qKlxuICAgKiBAcGFyYW0ge0Vycm9yW119IGVycm9yc1xuICAgKi9cbiAgZXJyb3JzOiBmdW5jdGlvbiBlcnJvcnMoX2Vycm9ycykge1xuICAgIGxvZy5lcnJvcihcIkVycm9ycyB3aGlsZSBjb21waWxpbmcuIFJlbG9hZCBwcmV2ZW50ZWQuXCIpO1xuICAgIHZhciBwcmludGFibGVFcnJvcnMgPSBfZXJyb3JzLm1hcChmdW5jdGlvbiAoZXJyb3IpIHtcbiAgICAgIHZhciBfZm9ybWF0UHJvYmxlbTIgPSBmb3JtYXRQcm9ibGVtKFwiZXJyb3JcIiwgZXJyb3IpLFxuICAgICAgICBoZWFkZXIgPSBfZm9ybWF0UHJvYmxlbTIuaGVhZGVyLFxuICAgICAgICBib2R5ID0gX2Zvcm1hdFByb2JsZW0yLmJvZHk7XG4gICAgICByZXR1cm4gXCJcIi5jb25jYXQoaGVhZGVyLCBcIlxcblwiKS5jb25jYXQoc3RyaXBBbnNpKGJvZHkpKTtcbiAgICB9KTtcbiAgICBzZW5kTWVzc2FnZShcIkVycm9yc1wiLCBwcmludGFibGVFcnJvcnMpO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcHJpbnRhYmxlRXJyb3JzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBsb2cuZXJyb3IocHJpbnRhYmxlRXJyb3JzW2ldKTtcbiAgICB9XG4gICAgdmFyIG92ZXJsYXlFcnJvcnNTZXR0aW5ncyA9IHR5cGVvZiBvcHRpb25zLm92ZXJsYXkgPT09IFwiYm9vbGVhblwiID8gb3B0aW9ucy5vdmVybGF5IDogb3B0aW9ucy5vdmVybGF5ICYmIG9wdGlvbnMub3ZlcmxheS5lcnJvcnM7XG4gICAgaWYgKG92ZXJsYXlFcnJvcnNTZXR0aW5ncykge1xuICAgICAgdmFyIGVycm9yc1RvRGlzcGxheSA9IHR5cGVvZiBvdmVybGF5RXJyb3JzU2V0dGluZ3MgPT09IFwiZnVuY3Rpb25cIiA/IF9lcnJvcnMuZmlsdGVyKG92ZXJsYXlFcnJvcnNTZXR0aW5ncykgOiBfZXJyb3JzO1xuICAgICAgaWYgKGVycm9yc1RvRGlzcGxheS5sZW5ndGgpIHtcbiAgICAgICAgb3ZlcmxheS5zZW5kKHtcbiAgICAgICAgICB0eXBlOiBcIkJVSUxEX0VSUk9SXCIsXG4gICAgICAgICAgbGV2ZWw6IFwiZXJyb3JcIixcbiAgICAgICAgICBtZXNzYWdlczogX2Vycm9yc1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG4gIH0sXG4gIC8qKlxuICAgKiBAcGFyYW0ge0Vycm9yfSBlcnJvclxuICAgKi9cbiAgZXJyb3I6IGZ1bmN0aW9uIGVycm9yKF9lcnJvcikge1xuICAgIGxvZy5lcnJvcihfZXJyb3IpO1xuICB9LFxuICBjbG9zZTogZnVuY3Rpb24gY2xvc2UoKSB7XG4gICAgbG9nLmluZm8oXCJEaXNjb25uZWN0ZWQhXCIpO1xuICAgIGlmIChvcHRpb25zLm92ZXJsYXkpIHtcbiAgICAgIG92ZXJsYXkuc2VuZCh7XG4gICAgICAgIHR5cGU6IFwiRElTTUlTU1wiXG4gICAgICB9KTtcbiAgICB9XG4gICAgc2VuZE1lc3NhZ2UoXCJDbG9zZVwiKTtcbiAgfVxufTtcblxuLyoqXG4gKiBAcGFyYW0ge3sgcHJvdG9jb2w/OiBzdHJpbmcsIGF1dGg/OiBzdHJpbmcsIGhvc3RuYW1lPzogc3RyaW5nLCBwb3J0Pzogc3RyaW5nLCBwYXRobmFtZT86IHN0cmluZywgc2VhcmNoPzogc3RyaW5nLCBoYXNoPzogc3RyaW5nLCBzbGFzaGVzPzogYm9vbGVhbiB9fSBvYmpVUkxcbiAqIEByZXR1cm5zIHtzdHJpbmd9XG4gKi9cbnZhciBmb3JtYXRVUkwgPSBmdW5jdGlvbiBmb3JtYXRVUkwob2JqVVJMKSB7XG4gIHZhciBwcm90b2NvbCA9IG9ialVSTC5wcm90b2NvbCB8fCBcIlwiO1xuICBpZiAocHJvdG9jb2wgJiYgcHJvdG9jb2wuc3Vic3RyKC0xKSAhPT0gXCI6XCIpIHtcbiAgICBwcm90b2NvbCArPSBcIjpcIjtcbiAgfVxuICB2YXIgYXV0aCA9IG9ialVSTC5hdXRoIHx8IFwiXCI7XG4gIGlmIChhdXRoKSB7XG4gICAgYXV0aCA9IGVuY29kZVVSSUNvbXBvbmVudChhdXRoKTtcbiAgICBhdXRoID0gYXV0aC5yZXBsYWNlKC8lM0EvaSwgXCI6XCIpO1xuICAgIGF1dGggKz0gXCJAXCI7XG4gIH1cbiAgdmFyIGhvc3QgPSBcIlwiO1xuICBpZiAob2JqVVJMLmhvc3RuYW1lKSB7XG4gICAgaG9zdCA9IGF1dGggKyAob2JqVVJMLmhvc3RuYW1lLmluZGV4T2YoXCI6XCIpID09PSAtMSA/IG9ialVSTC5ob3N0bmFtZSA6IFwiW1wiLmNvbmNhdChvYmpVUkwuaG9zdG5hbWUsIFwiXVwiKSk7XG4gICAgaWYgKG9ialVSTC5wb3J0KSB7XG4gICAgICBob3N0ICs9IFwiOlwiLmNvbmNhdChvYmpVUkwucG9ydCk7XG4gICAgfVxuICB9XG4gIHZhciBwYXRobmFtZSA9IG9ialVSTC5wYXRobmFtZSB8fCBcIlwiO1xuICBpZiAob2JqVVJMLnNsYXNoZXMpIHtcbiAgICBob3N0ID0gXCIvL1wiLmNvbmNhdChob3N0IHx8IFwiXCIpO1xuICAgIGlmIChwYXRobmFtZSAmJiBwYXRobmFtZS5jaGFyQXQoMCkgIT09IFwiL1wiKSB7XG4gICAgICBwYXRobmFtZSA9IFwiL1wiLmNvbmNhdChwYXRobmFtZSk7XG4gICAgfVxuICB9IGVsc2UgaWYgKCFob3N0KSB7XG4gICAgaG9zdCA9IFwiXCI7XG4gIH1cbiAgdmFyIHNlYXJjaCA9IG9ialVSTC5zZWFyY2ggfHwgXCJcIjtcbiAgaWYgKHNlYXJjaCAmJiBzZWFyY2guY2hhckF0KDApICE9PSBcIj9cIikge1xuICAgIHNlYXJjaCA9IFwiP1wiLmNvbmNhdChzZWFyY2gpO1xuICB9XG4gIHZhciBoYXNoID0gb2JqVVJMLmhhc2ggfHwgXCJcIjtcbiAgaWYgKGhhc2ggJiYgaGFzaC5jaGFyQXQoMCkgIT09IFwiI1wiKSB7XG4gICAgaGFzaCA9IFwiI1wiLmNvbmNhdChoYXNoKTtcbiAgfVxuICBwYXRobmFtZSA9IHBhdGhuYW1lLnJlcGxhY2UoL1s/I10vZyxcbiAgLyoqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBtYXRjaFxuICAgKiBAcmV0dXJucyB7c3RyaW5nfVxuICAgKi9cbiAgZnVuY3Rpb24gKG1hdGNoKSB7XG4gICAgcmV0dXJuIGVuY29kZVVSSUNvbXBvbmVudChtYXRjaCk7XG4gIH0pO1xuICBzZWFyY2ggPSBzZWFyY2gucmVwbGFjZShcIiNcIiwgXCIlMjNcIik7XG4gIHJldHVybiBcIlwiLmNvbmNhdChwcm90b2NvbCkuY29uY2F0KGhvc3QpLmNvbmNhdChwYXRobmFtZSkuY29uY2F0KHNlYXJjaCkuY29uY2F0KGhhc2gpO1xufTtcblxuLyoqXG4gKiBAcGFyYW0ge1VSTCAmIHsgZnJvbUN1cnJlbnRTY3JpcHQ/OiBib29sZWFuIH19IHBhcnNlZFVSTFxuICogQHJldHVybnMge3N0cmluZ31cbiAqL1xudmFyIGNyZWF0ZVNvY2tldFVSTCA9IGZ1bmN0aW9uIGNyZWF0ZVNvY2tldFVSTChwYXJzZWRVUkwpIHtcbiAgdmFyIGhvc3RuYW1lID0gcGFyc2VkVVJMLmhvc3RuYW1lO1xuXG4gIC8vIE5vZGUuanMgbW9kdWxlIHBhcnNlcyBpdCBhcyBgOjpgXG4gIC8vIGBuZXcgVVJMKHVybFN0cmluZywgW2Jhc2VVUkxTdHJpbmddKWAgcGFyc2VzIGl0IGFzICdbOjpdJ1xuICB2YXIgaXNJbkFkZHJBbnkgPSBob3N0bmFtZSA9PT0gXCIwLjAuMC4wXCIgfHwgaG9zdG5hbWUgPT09IFwiOjpcIiB8fCBob3N0bmFtZSA9PT0gXCJbOjpdXCI7XG5cbiAgLy8gd2h5IGRvIHdlIG5lZWQgdGhpcyBjaGVjaz9cbiAgLy8gaG9zdG5hbWUgbi9hIGZvciBmaWxlIHByb3RvY29sIChleGFtcGxlLCB3aGVuIHVzaW5nIGVsZWN0cm9uLCBpb25pYylcbiAgLy8gc2VlOiBodHRwczovL2dpdGh1Yi5jb20vd2VicGFjay93ZWJwYWNrLWRldi1zZXJ2ZXIvcHVsbC8zODRcbiAgaWYgKGlzSW5BZGRyQW55ICYmIHNlbGYubG9jYXRpb24uaG9zdG5hbWUgJiYgc2VsZi5sb2NhdGlvbi5wcm90b2NvbC5pbmRleE9mKFwiaHR0cFwiKSA9PT0gMCkge1xuICAgIGhvc3RuYW1lID0gc2VsZi5sb2NhdGlvbi5ob3N0bmFtZTtcbiAgfVxuICB2YXIgc29ja2V0VVJMUHJvdG9jb2wgPSBwYXJzZWRVUkwucHJvdG9jb2wgfHwgc2VsZi5sb2NhdGlvbi5wcm90b2NvbDtcblxuICAvLyBXaGVuIGh0dHBzIGlzIHVzZWQgaW4gdGhlIGFwcCwgc2VjdXJlIHdlYiBzb2NrZXRzIGFyZSBhbHdheXMgbmVjZXNzYXJ5IGJlY2F1c2UgdGhlIGJyb3dzZXIgZG9lc24ndCBhY2NlcHQgbm9uLXNlY3VyZSB3ZWIgc29ja2V0cy5cbiAgaWYgKHNvY2tldFVSTFByb3RvY29sID09PSBcImF1dG86XCIgfHwgaG9zdG5hbWUgJiYgaXNJbkFkZHJBbnkgJiYgc2VsZi5sb2NhdGlvbi5wcm90b2NvbCA9PT0gXCJodHRwczpcIikge1xuICAgIHNvY2tldFVSTFByb3RvY29sID0gc2VsZi5sb2NhdGlvbi5wcm90b2NvbDtcbiAgfVxuICBzb2NrZXRVUkxQcm90b2NvbCA9IHNvY2tldFVSTFByb3RvY29sLnJlcGxhY2UoL14oPzpodHRwfC4rLWV4dGVuc2lvbnxmaWxlKS9pLCBcIndzXCIpO1xuICB2YXIgc29ja2V0VVJMQXV0aCA9IFwiXCI7XG5cbiAgLy8gYG5ldyBVUkwodXJsU3RyaW5nLCBbYmFzZVVSTHN0cmluZ10pYCBkb2Vzbid0IGhhdmUgYGF1dGhgIHByb3BlcnR5XG4gIC8vIFBhcnNlIGF1dGhlbnRpY2F0aW9uIGNyZWRlbnRpYWxzIGluIGNhc2Ugd2UgbmVlZCB0aGVtXG4gIGlmIChwYXJzZWRVUkwudXNlcm5hbWUpIHtcbiAgICBzb2NrZXRVUkxBdXRoID0gcGFyc2VkVVJMLnVzZXJuYW1lO1xuXG4gICAgLy8gU2luY2UgSFRUUCBiYXNpYyBhdXRoZW50aWNhdGlvbiBkb2VzIG5vdCBhbGxvdyBlbXB0eSB1c2VybmFtZSxcbiAgICAvLyB3ZSBvbmx5IGluY2x1ZGUgcGFzc3dvcmQgaWYgdGhlIHVzZXJuYW1lIGlzIG5vdCBlbXB0eS5cbiAgICBpZiAocGFyc2VkVVJMLnBhc3N3b3JkKSB7XG4gICAgICAvLyBSZXN1bHQ6IDx1c2VybmFtZT46PHBhc3N3b3JkPlxuICAgICAgc29ja2V0VVJMQXV0aCA9IHNvY2tldFVSTEF1dGguY29uY2F0KFwiOlwiLCBwYXJzZWRVUkwucGFzc3dvcmQpO1xuICAgIH1cbiAgfVxuXG4gIC8vIEluIGNhc2UgdGhlIGhvc3QgaXMgYSByYXcgSVB2NiBhZGRyZXNzLCBpdCBjYW4gYmUgZW5jbG9zZWQgaW5cbiAgLy8gdGhlIGJyYWNrZXRzIGFzIHRoZSBicmFja2V0cyBhcmUgbmVlZGVkIGluIHRoZSBmaW5hbCBVUkwgc3RyaW5nLlxuICAvLyBOZWVkIHRvIHJlbW92ZSB0aG9zZSBhcyB1cmwuZm9ybWF0IGJsaW5kbHkgYWRkcyBpdHMgb3duIHNldCBvZiBicmFja2V0c1xuICAvLyBpZiB0aGUgaG9zdCBzdHJpbmcgY29udGFpbnMgY29sb25zLiBUaGF0IHdvdWxkIGxlYWQgdG8gbm9uLXdvcmtpbmdcbiAgLy8gZG91YmxlIGJyYWNrZXRzIChlLmcuIFtbOjpdXSkgaG9zdFxuICAvL1xuICAvLyBBbGwgb2YgdGhlc2Ugd2ViIHNvY2tldCB1cmwgcGFyYW1zIGFyZSBvcHRpb25hbGx5IHBhc3NlZCBpbiB0aHJvdWdoIHJlc291cmNlUXVlcnksXG4gIC8vIHNvIHdlIG5lZWQgdG8gZmFsbCBiYWNrIHRvIHRoZSBkZWZhdWx0IGlmIHRoZXkgYXJlIG5vdCBwcm92aWRlZFxuICB2YXIgc29ja2V0VVJMSG9zdG5hbWUgPSAoaG9zdG5hbWUgfHwgc2VsZi5sb2NhdGlvbi5ob3N0bmFtZSB8fCBcImxvY2FsaG9zdFwiKS5yZXBsYWNlKC9eXFxbKC4qKVxcXSQvLCBcIiQxXCIpO1xuICB2YXIgc29ja2V0VVJMUG9ydCA9IHBhcnNlZFVSTC5wb3J0O1xuICBpZiAoIXNvY2tldFVSTFBvcnQgfHwgc29ja2V0VVJMUG9ydCA9PT0gXCIwXCIpIHtcbiAgICBzb2NrZXRVUkxQb3J0ID0gc2VsZi5sb2NhdGlvbi5wb3J0O1xuICB9XG5cbiAgLy8gSWYgcGF0aCBpcyBwcm92aWRlZCBpdCdsbCBiZSBwYXNzZWQgaW4gdmlhIHRoZSByZXNvdXJjZVF1ZXJ5IGFzIGFcbiAgLy8gcXVlcnkgcGFyYW0gc28gaXQgaGFzIHRvIGJlIHBhcnNlZCBvdXQgb2YgdGhlIHF1ZXJ5c3RyaW5nIGluIG9yZGVyIGZvciB0aGVcbiAgLy8gY2xpZW50IHRvIG9wZW4gdGhlIHNvY2tldCB0byB0aGUgY29ycmVjdCBsb2NhdGlvbi5cbiAgdmFyIHNvY2tldFVSTFBhdGhuYW1lID0gXCIvd3NcIjtcbiAgaWYgKHBhcnNlZFVSTC5wYXRobmFtZSAmJiAhcGFyc2VkVVJMLmZyb21DdXJyZW50U2NyaXB0KSB7XG4gICAgc29ja2V0VVJMUGF0aG5hbWUgPSBwYXJzZWRVUkwucGF0aG5hbWU7XG4gIH1cbiAgcmV0dXJuIGZvcm1hdFVSTCh7XG4gICAgcHJvdG9jb2w6IHNvY2tldFVSTFByb3RvY29sLFxuICAgIGF1dGg6IHNvY2tldFVSTEF1dGgsXG4gICAgaG9zdG5hbWU6IHNvY2tldFVSTEhvc3RuYW1lLFxuICAgIHBvcnQ6IHNvY2tldFVSTFBvcnQsXG4gICAgcGF0aG5hbWU6IHNvY2tldFVSTFBhdGhuYW1lLFxuICAgIHNsYXNoZXM6IHRydWVcbiAgfSk7XG59O1xudmFyIHNvY2tldFVSTCA9IGNyZWF0ZVNvY2tldFVSTChwYXJzZWRSZXNvdXJjZVF1ZXJ5KTtcbnNvY2tldChzb2NrZXRVUkwsIG9uU29ja2V0TWVzc2FnZSwgb3B0aW9ucy5yZWNvbm5lY3QpO1xuZXhwb3J0IHsgZ2V0Q3VycmVudFNjcmlwdFNvdXJjZSwgcGFyc2VVUkwsIGNyZWF0ZVNvY2tldFVSTCB9OyIsIi8qKioqKiovIChmdW5jdGlvbigpIHsgLy8gd2VicGFja0Jvb3RzdHJhcFxuLyoqKioqKi8gXHRcInVzZSBzdHJpY3RcIjtcbi8qKioqKiovIFx0dmFyIF9fd2VicGFja19tb2R1bGVzX18gPSAoe1xuXG4vKioqLyBcIi4vY2xpZW50LXNyYy9tb2R1bGVzL2xvZ2dlci90YXBhYmxlLmpzXCI6XG4vKiEqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqISpcXFxuICAhKioqIC4vY2xpZW50LXNyYy9tb2R1bGVzL2xvZ2dlci90YXBhYmxlLmpzICoqKiFcbiAgXFwqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuLyoqKi8gKGZ1bmN0aW9uKF9fdW51c2VkX3dlYnBhY2tfbW9kdWxlLCBfX3dlYnBhY2tfZXhwb3J0c19fLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cbl9fd2VicGFja19yZXF1aXJlX18ucihfX3dlYnBhY2tfZXhwb3J0c19fKTtcbi8qIGhhcm1vbnkgZXhwb3J0ICovIF9fd2VicGFja19yZXF1aXJlX18uZChfX3dlYnBhY2tfZXhwb3J0c19fLCB7XG4vKiBoYXJtb255IGV4cG9ydCAqLyAgIFN5bmNCYWlsSG9vazogZnVuY3Rpb24oKSB7IHJldHVybiAvKiBiaW5kaW5nICovIFN5bmNCYWlsSG9vazsgfVxuLyogaGFybW9ueSBleHBvcnQgKi8gfSk7XG5mdW5jdGlvbiBTeW5jQmFpbEhvb2soKSB7XG4gIHJldHVybiB7XG4gICAgY2FsbDogZnVuY3Rpb24gY2FsbCgpIHt9XG4gIH07XG59XG5cbi8qKlxuICogQ2xpZW50IHN0dWIgZm9yIHRhcGFibGUgU3luY0JhaWxIb29rXG4gKi9cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBpbXBvcnQvcHJlZmVyLWRlZmF1bHQtZXhwb3J0XG5cblxuLyoqKi8gfSksXG5cbi8qKiovIFwiLi9ub2RlX21vZHVsZXMvd2VicGFjay9saWIvbG9nZ2luZy9Mb2dnZXIuanNcIjpcbi8qISoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiohKlxcXG4gICEqKiogLi9ub2RlX21vZHVsZXMvd2VicGFjay9saWIvbG9nZ2luZy9Mb2dnZXIuanMgKioqIVxuICBcXCoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlKSB7XG5cbi8qXG5cdE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG5cdEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiovXG5cblxuXG5mdW5jdGlvbiBfdHlwZW9mKG8pIHtcbiAgXCJAYmFiZWwvaGVscGVycyAtIHR5cGVvZlwiO1xuXG4gIHJldHVybiBfdHlwZW9mID0gXCJmdW5jdGlvblwiID09IHR5cGVvZiAodHlwZW9mIFN5bWJvbCAhPT0gXCJ1bmRlZmluZWRcIiA/IFN5bWJvbCA6IGZ1bmN0aW9uIChpKSB7IHJldHVybiBpOyB9KSAmJiBcInN5bWJvbFwiID09IHR5cGVvZiAodHlwZW9mIFN5bWJvbCAhPT0gXCJ1bmRlZmluZWRcIiA/IFN5bWJvbCA6IGZ1bmN0aW9uIChpKSB7IHJldHVybiBpOyB9KS5pdGVyYXRvciA/IGZ1bmN0aW9uIChvKSB7XG4gICAgcmV0dXJuIHR5cGVvZiBvO1xuICB9IDogZnVuY3Rpb24gKG8pIHtcbiAgICByZXR1cm4gbyAmJiBcImZ1bmN0aW9uXCIgPT0gdHlwZW9mICh0eXBlb2YgU3ltYm9sICE9PSBcInVuZGVmaW5lZFwiID8gU3ltYm9sIDogZnVuY3Rpb24gKGkpIHsgcmV0dXJuIGk7IH0pICYmIG8uY29uc3RydWN0b3IgPT09ICh0eXBlb2YgU3ltYm9sICE9PSBcInVuZGVmaW5lZFwiID8gU3ltYm9sIDogZnVuY3Rpb24gKGkpIHsgcmV0dXJuIGk7IH0pICYmIG8gIT09ICh0eXBlb2YgU3ltYm9sICE9PSBcInVuZGVmaW5lZFwiID8gU3ltYm9sIDogZnVuY3Rpb24gKGkpIHsgcmV0dXJuIGk7IH0pLnByb3RvdHlwZSA/IFwic3ltYm9sXCIgOiB0eXBlb2YgbztcbiAgfSwgX3R5cGVvZihvKTtcbn1cbmZ1bmN0aW9uIF90b0NvbnN1bWFibGVBcnJheShyKSB7XG4gIHJldHVybiBfYXJyYXlXaXRob3V0SG9sZXMocikgfHwgX2l0ZXJhYmxlVG9BcnJheShyKSB8fCBfdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkocikgfHwgX25vbkl0ZXJhYmxlU3ByZWFkKCk7XG59XG5mdW5jdGlvbiBfbm9uSXRlcmFibGVTcHJlYWQoKSB7XG4gIHRocm93IG5ldyBUeXBlRXJyb3IoXCJJbnZhbGlkIGF0dGVtcHQgdG8gc3ByZWFkIG5vbi1pdGVyYWJsZSBpbnN0YW5jZS5cXG5JbiBvcmRlciB0byBiZSBpdGVyYWJsZSwgbm9uLWFycmF5IG9iamVjdHMgbXVzdCBoYXZlIGEgW1N5bWJvbC5pdGVyYXRvcl0oKSBtZXRob2QuXCIpO1xufVxuZnVuY3Rpb24gX3Vuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5KHIsIGEpIHtcbiAgaWYgKHIpIHtcbiAgICBpZiAoXCJzdHJpbmdcIiA9PSB0eXBlb2YgcikgcmV0dXJuIF9hcnJheUxpa2VUb0FycmF5KHIsIGEpO1xuICAgIHZhciB0ID0ge30udG9TdHJpbmcuY2FsbChyKS5zbGljZSg4LCAtMSk7XG4gICAgcmV0dXJuIFwiT2JqZWN0XCIgPT09IHQgJiYgci5jb25zdHJ1Y3RvciAmJiAodCA9IHIuY29uc3RydWN0b3IubmFtZSksIFwiTWFwXCIgPT09IHQgfHwgXCJTZXRcIiA9PT0gdCA/IEFycmF5LmZyb20ocikgOiBcIkFyZ3VtZW50c1wiID09PSB0IHx8IC9eKD86VWl8SSludCg/Ojh8MTZ8MzIpKD86Q2xhbXBlZCk/QXJyYXkkLy50ZXN0KHQpID8gX2FycmF5TGlrZVRvQXJyYXkociwgYSkgOiB2b2lkIDA7XG4gIH1cbn1cbmZ1bmN0aW9uIF9pdGVyYWJsZVRvQXJyYXkocikge1xuICBpZiAoXCJ1bmRlZmluZWRcIiAhPSB0eXBlb2YgKHR5cGVvZiBTeW1ib2wgIT09IFwidW5kZWZpbmVkXCIgPyBTeW1ib2wgOiBmdW5jdGlvbiAoaSkgeyByZXR1cm4gaTsgfSkgJiYgbnVsbCAhPSByWyh0eXBlb2YgU3ltYm9sICE9PSBcInVuZGVmaW5lZFwiID8gU3ltYm9sIDogZnVuY3Rpb24gKGkpIHsgcmV0dXJuIGk7IH0pLml0ZXJhdG9yXSB8fCBudWxsICE9IHJbXCJAQGl0ZXJhdG9yXCJdKSByZXR1cm4gQXJyYXkuZnJvbShyKTtcbn1cbmZ1bmN0aW9uIF9hcnJheVdpdGhvdXRIb2xlcyhyKSB7XG4gIGlmIChBcnJheS5pc0FycmF5KHIpKSByZXR1cm4gX2FycmF5TGlrZVRvQXJyYXkocik7XG59XG5mdW5jdGlvbiBfYXJyYXlMaWtlVG9BcnJheShyLCBhKSB7XG4gIChudWxsID09IGEgfHwgYSA+IHIubGVuZ3RoKSAmJiAoYSA9IHIubGVuZ3RoKTtcbiAgZm9yICh2YXIgZSA9IDAsIG4gPSBBcnJheShhKTsgZSA8IGE7IGUrKykgbltlXSA9IHJbZV07XG4gIHJldHVybiBuO1xufVxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGEsIG4pIHtcbiAgaWYgKCEoYSBpbnN0YW5jZW9mIG4pKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpO1xufVxuZnVuY3Rpb24gX2RlZmluZVByb3BlcnRpZXMoZSwgcikge1xuICBmb3IgKHZhciB0ID0gMDsgdCA8IHIubGVuZ3RoOyB0KyspIHtcbiAgICB2YXIgbyA9IHJbdF07XG4gICAgby5lbnVtZXJhYmxlID0gby5lbnVtZXJhYmxlIHx8ICExLCBvLmNvbmZpZ3VyYWJsZSA9ICEwLCBcInZhbHVlXCIgaW4gbyAmJiAoby53cml0YWJsZSA9ICEwKSwgT2JqZWN0LmRlZmluZVByb3BlcnR5KGUsIF90b1Byb3BlcnR5S2V5KG8ua2V5KSwgbyk7XG4gIH1cbn1cbmZ1bmN0aW9uIF9jcmVhdGVDbGFzcyhlLCByLCB0KSB7XG4gIHJldHVybiByICYmIF9kZWZpbmVQcm9wZXJ0aWVzKGUucHJvdG90eXBlLCByKSwgdCAmJiBfZGVmaW5lUHJvcGVydGllcyhlLCB0KSwgT2JqZWN0LmRlZmluZVByb3BlcnR5KGUsIFwicHJvdG90eXBlXCIsIHtcbiAgICB3cml0YWJsZTogITFcbiAgfSksIGU7XG59XG5mdW5jdGlvbiBfdG9Qcm9wZXJ0eUtleSh0KSB7XG4gIHZhciBpID0gX3RvUHJpbWl0aXZlKHQsIFwic3RyaW5nXCIpO1xuICByZXR1cm4gXCJzeW1ib2xcIiA9PSBfdHlwZW9mKGkpID8gaSA6IGkgKyBcIlwiO1xufVxuZnVuY3Rpb24gX3RvUHJpbWl0aXZlKHQsIHIpIHtcbiAgaWYgKFwib2JqZWN0XCIgIT0gX3R5cGVvZih0KSB8fCAhdCkgcmV0dXJuIHQ7XG4gIHZhciBlID0gdFsodHlwZW9mIFN5bWJvbCAhPT0gXCJ1bmRlZmluZWRcIiA/IFN5bWJvbCA6IGZ1bmN0aW9uIChpKSB7IHJldHVybiBpOyB9KS50b1ByaW1pdGl2ZV07XG4gIGlmICh2b2lkIDAgIT09IGUpIHtcbiAgICB2YXIgaSA9IGUuY2FsbCh0LCByIHx8IFwiZGVmYXVsdFwiKTtcbiAgICBpZiAoXCJvYmplY3RcIiAhPSBfdHlwZW9mKGkpKSByZXR1cm4gaTtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQEB0b1ByaW1pdGl2ZSBtdXN0IHJldHVybiBhIHByaW1pdGl2ZSB2YWx1ZS5cIik7XG4gIH1cbiAgcmV0dXJuIChcInN0cmluZ1wiID09PSByID8gU3RyaW5nIDogTnVtYmVyKSh0KTtcbn1cbnZhciBMb2dUeXBlID0gT2JqZWN0LmZyZWV6ZSh7XG4gIGVycm9yOiAoLyoqIEB0eXBlIHtcImVycm9yXCJ9ICovXCJlcnJvclwiKSxcbiAgLy8gbWVzc2FnZSwgYyBzdHlsZSBhcmd1bWVudHNcbiAgd2FybjogKC8qKiBAdHlwZSB7XCJ3YXJuXCJ9ICovXCJ3YXJuXCIpLFxuICAvLyBtZXNzYWdlLCBjIHN0eWxlIGFyZ3VtZW50c1xuICBpbmZvOiAoLyoqIEB0eXBlIHtcImluZm9cIn0gKi9cImluZm9cIiksXG4gIC8vIG1lc3NhZ2UsIGMgc3R5bGUgYXJndW1lbnRzXG4gIGxvZzogKC8qKiBAdHlwZSB7XCJsb2dcIn0gKi9cImxvZ1wiKSxcbiAgLy8gbWVzc2FnZSwgYyBzdHlsZSBhcmd1bWVudHNcbiAgZGVidWc6ICgvKiogQHR5cGUge1wiZGVidWdcIn0gKi9cImRlYnVnXCIpLFxuICAvLyBtZXNzYWdlLCBjIHN0eWxlIGFyZ3VtZW50c1xuXG4gIHRyYWNlOiAoLyoqIEB0eXBlIHtcInRyYWNlXCJ9ICovXCJ0cmFjZVwiKSxcbiAgLy8gbm8gYXJndW1lbnRzXG5cbiAgZ3JvdXA6ICgvKiogQHR5cGUge1wiZ3JvdXBcIn0gKi9cImdyb3VwXCIpLFxuICAvLyBbbGFiZWxdXG4gIGdyb3VwQ29sbGFwc2VkOiAoLyoqIEB0eXBlIHtcImdyb3VwQ29sbGFwc2VkXCJ9ICovXCJncm91cENvbGxhcHNlZFwiKSxcbiAgLy8gW2xhYmVsXVxuICBncm91cEVuZDogKC8qKiBAdHlwZSB7XCJncm91cEVuZFwifSAqL1wiZ3JvdXBFbmRcIiksXG4gIC8vIFtsYWJlbF1cblxuICBwcm9maWxlOiAoLyoqIEB0eXBlIHtcInByb2ZpbGVcIn0gKi9cInByb2ZpbGVcIiksXG4gIC8vIFtwcm9maWxlTmFtZV1cbiAgcHJvZmlsZUVuZDogKC8qKiBAdHlwZSB7XCJwcm9maWxlRW5kXCJ9ICovXCJwcm9maWxlRW5kXCIpLFxuICAvLyBbcHJvZmlsZU5hbWVdXG5cbiAgdGltZTogKC8qKiBAdHlwZSB7XCJ0aW1lXCJ9ICovXCJ0aW1lXCIpLFxuICAvLyBuYW1lLCB0aW1lIGFzIFtzZWNvbmRzLCBuYW5vc2Vjb25kc11cblxuICBjbGVhcjogKC8qKiBAdHlwZSB7XCJjbGVhclwifSAqL1wiY2xlYXJcIiksXG4gIC8vIG5vIGFyZ3VtZW50c1xuICBzdGF0dXM6ICgvKiogQHR5cGUge1wic3RhdHVzXCJ9ICovXCJzdGF0dXNcIikgLy8gbWVzc2FnZSwgYXJndW1lbnRzXG59KTtcbm1vZHVsZS5leHBvcnRzLkxvZ1R5cGUgPSBMb2dUeXBlO1xuXG4vKiogQHR5cGVkZWYge3R5cGVvZiBMb2dUeXBlW2tleW9mIHR5cGVvZiBMb2dUeXBlXX0gTG9nVHlwZUVudW0gKi9cblxudmFyIExPR19TWU1CT0wgPSAodHlwZW9mIFN5bWJvbCAhPT0gXCJ1bmRlZmluZWRcIiA/IFN5bWJvbCA6IGZ1bmN0aW9uIChpKSB7IHJldHVybiBpOyB9KShcIndlYnBhY2sgbG9nZ2VyIHJhdyBsb2cgbWV0aG9kXCIpO1xudmFyIFRJTUVSU19TWU1CT0wgPSAodHlwZW9mIFN5bWJvbCAhPT0gXCJ1bmRlZmluZWRcIiA/IFN5bWJvbCA6IGZ1bmN0aW9uIChpKSB7IHJldHVybiBpOyB9KShcIndlYnBhY2sgbG9nZ2VyIHRpbWVzXCIpO1xudmFyIFRJTUVSU19BR0dSRUdBVEVTX1NZTUJPTCA9ICh0eXBlb2YgU3ltYm9sICE9PSBcInVuZGVmaW5lZFwiID8gU3ltYm9sIDogZnVuY3Rpb24gKGkpIHsgcmV0dXJuIGk7IH0pKFwid2VicGFjayBsb2dnZXIgYWdncmVnYXRlZCB0aW1lc1wiKTtcbnZhciBXZWJwYWNrTG9nZ2VyID0gLyojX19QVVJFX18qL2Z1bmN0aW9uICgpIHtcbiAgLyoqXG4gICAqIEBwYXJhbSB7KHR5cGU6IExvZ1R5cGVFbnVtLCBhcmdzPzogRVhQRUNURURfQU5ZW10pID0+IHZvaWR9IGxvZyBsb2cgZnVuY3Rpb25cbiAgICogQHBhcmFtIHsobmFtZTogc3RyaW5nIHwgKCgpID0+IHN0cmluZykpID0+IFdlYnBhY2tMb2dnZXJ9IGdldENoaWxkTG9nZ2VyIGZ1bmN0aW9uIHRvIGNyZWF0ZSBjaGlsZCBsb2dnZXJcbiAgICovXG4gIGZ1bmN0aW9uIFdlYnBhY2tMb2dnZXIobG9nLCBnZXRDaGlsZExvZ2dlcikge1xuICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBXZWJwYWNrTG9nZ2VyKTtcbiAgICB0aGlzW0xPR19TWU1CT0xdID0gbG9nO1xuICAgIHRoaXMuZ2V0Q2hpbGRMb2dnZXIgPSBnZXRDaGlsZExvZ2dlcjtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0gey4uLkVYUEVDVEVEX0FOWX0gYXJncyBhcmdzXG4gICAqL1xuICByZXR1cm4gX2NyZWF0ZUNsYXNzKFdlYnBhY2tMb2dnZXIsIFt7XG4gICAga2V5OiBcImVycm9yXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGVycm9yKCkge1xuICAgICAgZm9yICh2YXIgX2xlbiA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBuZXcgQXJyYXkoX2xlbiksIF9rZXkgPSAwOyBfa2V5IDwgX2xlbjsgX2tleSsrKSB7XG4gICAgICAgIGFyZ3NbX2tleV0gPSBhcmd1bWVudHNbX2tleV07XG4gICAgICB9XG4gICAgICB0aGlzW0xPR19TWU1CT0xdKExvZ1R5cGUuZXJyb3IsIGFyZ3MpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7Li4uRVhQRUNURURfQU5ZfSBhcmdzIGFyZ3NcbiAgICAgKi9cbiAgfSwge1xuICAgIGtleTogXCJ3YXJuXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHdhcm4oKSB7XG4gICAgICBmb3IgKHZhciBfbGVuMiA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBuZXcgQXJyYXkoX2xlbjIpLCBfa2V5MiA9IDA7IF9rZXkyIDwgX2xlbjI7IF9rZXkyKyspIHtcbiAgICAgICAgYXJnc1tfa2V5Ml0gPSBhcmd1bWVudHNbX2tleTJdO1xuICAgICAgfVxuICAgICAgdGhpc1tMT0dfU1lNQk9MXShMb2dUeXBlLndhcm4sIGFyZ3MpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7Li4uRVhQRUNURURfQU5ZfSBhcmdzIGFyZ3NcbiAgICAgKi9cbiAgfSwge1xuICAgIGtleTogXCJpbmZvXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGluZm8oKSB7XG4gICAgICBmb3IgKHZhciBfbGVuMyA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBuZXcgQXJyYXkoX2xlbjMpLCBfa2V5MyA9IDA7IF9rZXkzIDwgX2xlbjM7IF9rZXkzKyspIHtcbiAgICAgICAgYXJnc1tfa2V5M10gPSBhcmd1bWVudHNbX2tleTNdO1xuICAgICAgfVxuICAgICAgdGhpc1tMT0dfU1lNQk9MXShMb2dUeXBlLmluZm8sIGFyZ3MpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7Li4uRVhQRUNURURfQU5ZfSBhcmdzIGFyZ3NcbiAgICAgKi9cbiAgfSwge1xuICAgIGtleTogXCJsb2dcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gbG9nKCkge1xuICAgICAgZm9yICh2YXIgX2xlbjQgPSBhcmd1bWVudHMubGVuZ3RoLCBhcmdzID0gbmV3IEFycmF5KF9sZW40KSwgX2tleTQgPSAwOyBfa2V5NCA8IF9sZW40OyBfa2V5NCsrKSB7XG4gICAgICAgIGFyZ3NbX2tleTRdID0gYXJndW1lbnRzW19rZXk0XTtcbiAgICAgIH1cbiAgICAgIHRoaXNbTE9HX1NZTUJPTF0oTG9nVHlwZS5sb2csIGFyZ3MpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7Li4uRVhQRUNURURfQU5ZfSBhcmdzIGFyZ3NcbiAgICAgKi9cbiAgfSwge1xuICAgIGtleTogXCJkZWJ1Z1wiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBkZWJ1ZygpIHtcbiAgICAgIGZvciAodmFyIF9sZW41ID0gYXJndW1lbnRzLmxlbmd0aCwgYXJncyA9IG5ldyBBcnJheShfbGVuNSksIF9rZXk1ID0gMDsgX2tleTUgPCBfbGVuNTsgX2tleTUrKykge1xuICAgICAgICBhcmdzW19rZXk1XSA9IGFyZ3VtZW50c1tfa2V5NV07XG4gICAgICB9XG4gICAgICB0aGlzW0xPR19TWU1CT0xdKExvZ1R5cGUuZGVidWcsIGFyZ3MpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7RVhQRUNURURfQU5ZfSBhc3NlcnRpb24gYXNzZXJ0aW9uXG4gICAgICogQHBhcmFtIHsuLi5FWFBFQ1RFRF9BTll9IGFyZ3MgYXJnc1xuICAgICAqL1xuICB9LCB7XG4gICAga2V5OiBcImFzc2VydFwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBhc3NlcnQoYXNzZXJ0aW9uKSB7XG4gICAgICBpZiAoIWFzc2VydGlvbikge1xuICAgICAgICBmb3IgKHZhciBfbGVuNiA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBuZXcgQXJyYXkoX2xlbjYgPiAxID8gX2xlbjYgLSAxIDogMCksIF9rZXk2ID0gMTsgX2tleTYgPCBfbGVuNjsgX2tleTYrKykge1xuICAgICAgICAgIGFyZ3NbX2tleTYgLSAxXSA9IGFyZ3VtZW50c1tfa2V5Nl07XG4gICAgICAgIH1cbiAgICAgICAgdGhpc1tMT0dfU1lNQk9MXShMb2dUeXBlLmVycm9yLCBhcmdzKTtcbiAgICAgIH1cbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwidHJhY2VcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gdHJhY2UoKSB7XG4gICAgICB0aGlzW0xPR19TWU1CT0xdKExvZ1R5cGUudHJhY2UsIFtcIlRyYWNlXCJdKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiY2xlYXJcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gY2xlYXIoKSB7XG4gICAgICB0aGlzW0xPR19TWU1CT0xdKExvZ1R5cGUuY2xlYXIpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7Li4uRVhQRUNURURfQU5ZfSBhcmdzIGFyZ3NcbiAgICAgKi9cbiAgfSwge1xuICAgIGtleTogXCJzdGF0dXNcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gc3RhdHVzKCkge1xuICAgICAgZm9yICh2YXIgX2xlbjcgPSBhcmd1bWVudHMubGVuZ3RoLCBhcmdzID0gbmV3IEFycmF5KF9sZW43KSwgX2tleTcgPSAwOyBfa2V5NyA8IF9sZW43OyBfa2V5NysrKSB7XG4gICAgICAgIGFyZ3NbX2tleTddID0gYXJndW1lbnRzW19rZXk3XTtcbiAgICAgIH1cbiAgICAgIHRoaXNbTE9HX1NZTUJPTF0oTG9nVHlwZS5zdGF0dXMsIGFyZ3MpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7Li4uRVhQRUNURURfQU5ZfSBhcmdzIGFyZ3NcbiAgICAgKi9cbiAgfSwge1xuICAgIGtleTogXCJncm91cFwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBncm91cCgpIHtcbiAgICAgIGZvciAodmFyIF9sZW44ID0gYXJndW1lbnRzLmxlbmd0aCwgYXJncyA9IG5ldyBBcnJheShfbGVuOCksIF9rZXk4ID0gMDsgX2tleTggPCBfbGVuODsgX2tleTgrKykge1xuICAgICAgICBhcmdzW19rZXk4XSA9IGFyZ3VtZW50c1tfa2V5OF07XG4gICAgICB9XG4gICAgICB0aGlzW0xPR19TWU1CT0xdKExvZ1R5cGUuZ3JvdXAsIGFyZ3MpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7Li4uRVhQRUNURURfQU5ZfSBhcmdzIGFyZ3NcbiAgICAgKi9cbiAgfSwge1xuICAgIGtleTogXCJncm91cENvbGxhcHNlZFwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBncm91cENvbGxhcHNlZCgpIHtcbiAgICAgIGZvciAodmFyIF9sZW45ID0gYXJndW1lbnRzLmxlbmd0aCwgYXJncyA9IG5ldyBBcnJheShfbGVuOSksIF9rZXk5ID0gMDsgX2tleTkgPCBfbGVuOTsgX2tleTkrKykge1xuICAgICAgICBhcmdzW19rZXk5XSA9IGFyZ3VtZW50c1tfa2V5OV07XG4gICAgICB9XG4gICAgICB0aGlzW0xPR19TWU1CT0xdKExvZ1R5cGUuZ3JvdXBDb2xsYXBzZWQsIGFyZ3MpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJncm91cEVuZFwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBncm91cEVuZCgpIHtcbiAgICAgIHRoaXNbTE9HX1NZTUJPTF0oTG9nVHlwZS5ncm91cEVuZCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtzdHJpbmc9fSBsYWJlbCBsYWJlbFxuICAgICAqL1xuICB9LCB7XG4gICAga2V5OiBcInByb2ZpbGVcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gcHJvZmlsZShsYWJlbCkge1xuICAgICAgdGhpc1tMT0dfU1lNQk9MXShMb2dUeXBlLnByb2ZpbGUsIFtsYWJlbF0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nPX0gbGFiZWwgbGFiZWxcbiAgICAgKi9cbiAgfSwge1xuICAgIGtleTogXCJwcm9maWxlRW5kXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHByb2ZpbGVFbmQobGFiZWwpIHtcbiAgICAgIHRoaXNbTE9HX1NZTUJPTF0oTG9nVHlwZS5wcm9maWxlRW5kLCBbbGFiZWxdKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbGFiZWwgbGFiZWxcbiAgICAgKi9cbiAgfSwge1xuICAgIGtleTogXCJ0aW1lXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHRpbWUobGFiZWwpIHtcbiAgICAgIC8qKiBAdHlwZSB7TWFwPHN0cmluZyB8IHVuZGVmaW5lZCwgW251bWJlciwgbnVtYmVyXT59ICovXG4gICAgICB0aGlzW1RJTUVSU19TWU1CT0xdID0gdGhpc1tUSU1FUlNfU1lNQk9MXSB8fCBuZXcgTWFwKCk7XG4gICAgICB0aGlzW1RJTUVSU19TWU1CT0xdLnNldChsYWJlbCwgcHJvY2Vzcy5ocnRpbWUoKSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtzdHJpbmc9fSBsYWJlbCBsYWJlbFxuICAgICAqL1xuICB9LCB7XG4gICAga2V5OiBcInRpbWVMb2dcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gdGltZUxvZyhsYWJlbCkge1xuICAgICAgdmFyIHByZXYgPSB0aGlzW1RJTUVSU19TWU1CT0xdICYmIHRoaXNbVElNRVJTX1NZTUJPTF0uZ2V0KGxhYmVsKTtcbiAgICAgIGlmICghcHJldikge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJObyBzdWNoIGxhYmVsICdcIi5jb25jYXQobGFiZWwsIFwiJyBmb3IgV2VicGFja0xvZ2dlci50aW1lTG9nKClcIikpO1xuICAgICAgfVxuICAgICAgdmFyIHRpbWUgPSBwcm9jZXNzLmhydGltZShwcmV2KTtcbiAgICAgIHRoaXNbTE9HX1NZTUJPTF0oTG9nVHlwZS50aW1lLCBbbGFiZWxdLmNvbmNhdChfdG9Db25zdW1hYmxlQXJyYXkodGltZSkpKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge3N0cmluZz19IGxhYmVsIGxhYmVsXG4gICAgICovXG4gIH0sIHtcbiAgICBrZXk6IFwidGltZUVuZFwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiB0aW1lRW5kKGxhYmVsKSB7XG4gICAgICB2YXIgcHJldiA9IHRoaXNbVElNRVJTX1NZTUJPTF0gJiYgdGhpc1tUSU1FUlNfU1lNQk9MXS5nZXQobGFiZWwpO1xuICAgICAgaWYgKCFwcmV2KSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIk5vIHN1Y2ggbGFiZWwgJ1wiLmNvbmNhdChsYWJlbCwgXCInIGZvciBXZWJwYWNrTG9nZ2VyLnRpbWVFbmQoKVwiKSk7XG4gICAgICB9XG4gICAgICB2YXIgdGltZSA9IHByb2Nlc3MuaHJ0aW1lKHByZXYpO1xuICAgICAgLyoqIEB0eXBlIHtNYXA8c3RyaW5nIHwgdW5kZWZpbmVkLCBbbnVtYmVyLCBudW1iZXJdPn0gKi9cbiAgICAgIHRoaXNbVElNRVJTX1NZTUJPTF0uZGVsZXRlKGxhYmVsKTtcbiAgICAgIHRoaXNbTE9HX1NZTUJPTF0oTG9nVHlwZS50aW1lLCBbbGFiZWxdLmNvbmNhdChfdG9Db25zdW1hYmxlQXJyYXkodGltZSkpKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge3N0cmluZz19IGxhYmVsIGxhYmVsXG4gICAgICovXG4gIH0sIHtcbiAgICBrZXk6IFwidGltZUFnZ3JlZ2F0ZVwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiB0aW1lQWdncmVnYXRlKGxhYmVsKSB7XG4gICAgICB2YXIgcHJldiA9IHRoaXNbVElNRVJTX1NZTUJPTF0gJiYgdGhpc1tUSU1FUlNfU1lNQk9MXS5nZXQobGFiZWwpO1xuICAgICAgaWYgKCFwcmV2KSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIk5vIHN1Y2ggbGFiZWwgJ1wiLmNvbmNhdChsYWJlbCwgXCInIGZvciBXZWJwYWNrTG9nZ2VyLnRpbWVBZ2dyZWdhdGUoKVwiKSk7XG4gICAgICB9XG4gICAgICB2YXIgdGltZSA9IHByb2Nlc3MuaHJ0aW1lKHByZXYpO1xuICAgICAgLyoqIEB0eXBlIHtNYXA8c3RyaW5nIHwgdW5kZWZpbmVkLCBbbnVtYmVyLCBudW1iZXJdPn0gKi9cbiAgICAgIHRoaXNbVElNRVJTX1NZTUJPTF0uZGVsZXRlKGxhYmVsKTtcbiAgICAgIC8qKiBAdHlwZSB7TWFwPHN0cmluZyB8IHVuZGVmaW5lZCwgW251bWJlciwgbnVtYmVyXT59ICovXG4gICAgICB0aGlzW1RJTUVSU19BR0dSRUdBVEVTX1NZTUJPTF0gPSB0aGlzW1RJTUVSU19BR0dSRUdBVEVTX1NZTUJPTF0gfHwgbmV3IE1hcCgpO1xuICAgICAgdmFyIGN1cnJlbnQgPSB0aGlzW1RJTUVSU19BR0dSRUdBVEVTX1NZTUJPTF0uZ2V0KGxhYmVsKTtcbiAgICAgIGlmIChjdXJyZW50ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgaWYgKHRpbWVbMV0gKyBjdXJyZW50WzFdID4gMWU5KSB7XG4gICAgICAgICAgdGltZVswXSArPSBjdXJyZW50WzBdICsgMTtcbiAgICAgICAgICB0aW1lWzFdID0gdGltZVsxXSAtIDFlOSArIGN1cnJlbnRbMV07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGltZVswXSArPSBjdXJyZW50WzBdO1xuICAgICAgICAgIHRpbWVbMV0gKz0gY3VycmVudFsxXTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgdGhpc1tUSU1FUlNfQUdHUkVHQVRFU19TWU1CT0xdLnNldChsYWJlbCwgdGltZSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtzdHJpbmc9fSBsYWJlbCBsYWJlbFxuICAgICAqL1xuICB9LCB7XG4gICAga2V5OiBcInRpbWVBZ2dyZWdhdGVFbmRcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gdGltZUFnZ3JlZ2F0ZUVuZChsYWJlbCkge1xuICAgICAgaWYgKHRoaXNbVElNRVJTX0FHR1JFR0FURVNfU1lNQk9MXSA9PT0gdW5kZWZpbmVkKSByZXR1cm47XG4gICAgICB2YXIgdGltZSA9IHRoaXNbVElNRVJTX0FHR1JFR0FURVNfU1lNQk9MXS5nZXQobGFiZWwpO1xuICAgICAgaWYgKHRpbWUgPT09IHVuZGVmaW5lZCkgcmV0dXJuO1xuICAgICAgdGhpc1tUSU1FUlNfQUdHUkVHQVRFU19TWU1CT0xdLmRlbGV0ZShsYWJlbCk7XG4gICAgICB0aGlzW0xPR19TWU1CT0xdKExvZ1R5cGUudGltZSwgW2xhYmVsXS5jb25jYXQoX3RvQ29uc3VtYWJsZUFycmF5KHRpbWUpKSk7XG4gICAgfVxuICB9XSk7XG59KCk7XG5tb2R1bGUuZXhwb3J0cy5Mb2dnZXIgPSBXZWJwYWNrTG9nZ2VyO1xuXG4vKioqLyB9KSxcblxuLyoqKi8gXCIuL25vZGVfbW9kdWxlcy93ZWJwYWNrL2xpYi9sb2dnaW5nL2NyZWF0ZUNvbnNvbGVMb2dnZXIuanNcIjpcbi8qISoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqISpcXFxuICAhKioqIC4vbm9kZV9tb2R1bGVzL3dlYnBhY2svbGliL2xvZ2dpbmcvY3JlYXRlQ29uc29sZUxvZ2dlci5qcyAqKiohXG4gIFxcKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBfX3VudXNlZF93ZWJwYWNrX2V4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuLypcblx0TUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcblx0QXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxuKi9cblxuXG5cbmZ1bmN0aW9uIF9zbGljZWRUb0FycmF5KHIsIGUpIHtcbiAgcmV0dXJuIF9hcnJheVdpdGhIb2xlcyhyKSB8fCBfaXRlcmFibGVUb0FycmF5TGltaXQociwgZSkgfHwgX3Vuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5KHIsIGUpIHx8IF9ub25JdGVyYWJsZVJlc3QoKTtcbn1cbmZ1bmN0aW9uIF9ub25JdGVyYWJsZVJlc3QoKSB7XG4gIHRocm93IG5ldyBUeXBlRXJyb3IoXCJJbnZhbGlkIGF0dGVtcHQgdG8gZGVzdHJ1Y3R1cmUgbm9uLWl0ZXJhYmxlIGluc3RhbmNlLlxcbkluIG9yZGVyIHRvIGJlIGl0ZXJhYmxlLCBub24tYXJyYXkgb2JqZWN0cyBtdXN0IGhhdmUgYSBbU3ltYm9sLml0ZXJhdG9yXSgpIG1ldGhvZC5cIik7XG59XG5mdW5jdGlvbiBfaXRlcmFibGVUb0FycmF5TGltaXQociwgbCkge1xuICB2YXIgdCA9IG51bGwgPT0gciA/IG51bGwgOiBcInVuZGVmaW5lZFwiICE9IHR5cGVvZiAodHlwZW9mIFN5bWJvbCAhPT0gXCJ1bmRlZmluZWRcIiA/IFN5bWJvbCA6IGZ1bmN0aW9uIChpKSB7IHJldHVybiBpOyB9KSAmJiByWyh0eXBlb2YgU3ltYm9sICE9PSBcInVuZGVmaW5lZFwiID8gU3ltYm9sIDogZnVuY3Rpb24gKGkpIHsgcmV0dXJuIGk7IH0pLml0ZXJhdG9yXSB8fCByW1wiQEBpdGVyYXRvclwiXTtcbiAgaWYgKG51bGwgIT0gdCkge1xuICAgIHZhciBlLFxuICAgICAgbixcbiAgICAgIGksXG4gICAgICB1LFxuICAgICAgYSA9IFtdLFxuICAgICAgZiA9ICEwLFxuICAgICAgbyA9ICExO1xuICAgIHRyeSB7XG4gICAgICBpZiAoaSA9ICh0ID0gdC5jYWxsKHIpKS5uZXh0LCAwID09PSBsKSB7XG4gICAgICAgIGlmIChPYmplY3QodCkgIT09IHQpIHJldHVybjtcbiAgICAgICAgZiA9ICExO1xuICAgICAgfSBlbHNlIGZvciAoOyAhKGYgPSAoZSA9IGkuY2FsbCh0KSkuZG9uZSkgJiYgKGEucHVzaChlLnZhbHVlKSwgYS5sZW5ndGggIT09IGwpOyBmID0gITApO1xuICAgIH0gY2F0Y2ggKHIpIHtcbiAgICAgIG8gPSAhMCwgbiA9IHI7XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGlmICghZiAmJiBudWxsICE9IHQucmV0dXJuICYmICh1ID0gdC5yZXR1cm4oKSwgT2JqZWN0KHUpICE9PSB1KSkgcmV0dXJuO1xuICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgaWYgKG8pIHRocm93IG47XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBhO1xuICB9XG59XG5mdW5jdGlvbiBfYXJyYXlXaXRoSG9sZXMocikge1xuICBpZiAoQXJyYXkuaXNBcnJheShyKSkgcmV0dXJuIHI7XG59XG5mdW5jdGlvbiBfdG9Db25zdW1hYmxlQXJyYXkocikge1xuICByZXR1cm4gX2FycmF5V2l0aG91dEhvbGVzKHIpIHx8IF9pdGVyYWJsZVRvQXJyYXkocikgfHwgX3Vuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5KHIpIHx8IF9ub25JdGVyYWJsZVNwcmVhZCgpO1xufVxuZnVuY3Rpb24gX25vbkl0ZXJhYmxlU3ByZWFkKCkge1xuICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiSW52YWxpZCBhdHRlbXB0IHRvIHNwcmVhZCBub24taXRlcmFibGUgaW5zdGFuY2UuXFxuSW4gb3JkZXIgdG8gYmUgaXRlcmFibGUsIG5vbi1hcnJheSBvYmplY3RzIG11c3QgaGF2ZSBhIFtTeW1ib2wuaXRlcmF0b3JdKCkgbWV0aG9kLlwiKTtcbn1cbmZ1bmN0aW9uIF91bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheShyLCBhKSB7XG4gIGlmIChyKSB7XG4gICAgaWYgKFwic3RyaW5nXCIgPT0gdHlwZW9mIHIpIHJldHVybiBfYXJyYXlMaWtlVG9BcnJheShyLCBhKTtcbiAgICB2YXIgdCA9IHt9LnRvU3RyaW5nLmNhbGwocikuc2xpY2UoOCwgLTEpO1xuICAgIHJldHVybiBcIk9iamVjdFwiID09PSB0ICYmIHIuY29uc3RydWN0b3IgJiYgKHQgPSByLmNvbnN0cnVjdG9yLm5hbWUpLCBcIk1hcFwiID09PSB0IHx8IFwiU2V0XCIgPT09IHQgPyBBcnJheS5mcm9tKHIpIDogXCJBcmd1bWVudHNcIiA9PT0gdCB8fCAvXig/OlVpfEkpbnQoPzo4fDE2fDMyKSg/OkNsYW1wZWQpP0FycmF5JC8udGVzdCh0KSA/IF9hcnJheUxpa2VUb0FycmF5KHIsIGEpIDogdm9pZCAwO1xuICB9XG59XG5mdW5jdGlvbiBfaXRlcmFibGVUb0FycmF5KHIpIHtcbiAgaWYgKFwidW5kZWZpbmVkXCIgIT0gdHlwZW9mICh0eXBlb2YgU3ltYm9sICE9PSBcInVuZGVmaW5lZFwiID8gU3ltYm9sIDogZnVuY3Rpb24gKGkpIHsgcmV0dXJuIGk7IH0pICYmIG51bGwgIT0gclsodHlwZW9mIFN5bWJvbCAhPT0gXCJ1bmRlZmluZWRcIiA/IFN5bWJvbCA6IGZ1bmN0aW9uIChpKSB7IHJldHVybiBpOyB9KS5pdGVyYXRvcl0gfHwgbnVsbCAhPSByW1wiQEBpdGVyYXRvclwiXSkgcmV0dXJuIEFycmF5LmZyb20ocik7XG59XG5mdW5jdGlvbiBfYXJyYXlXaXRob3V0SG9sZXMocikge1xuICBpZiAoQXJyYXkuaXNBcnJheShyKSkgcmV0dXJuIF9hcnJheUxpa2VUb0FycmF5KHIpO1xufVxuZnVuY3Rpb24gX2FycmF5TGlrZVRvQXJyYXkociwgYSkge1xuICAobnVsbCA9PSBhIHx8IGEgPiByLmxlbmd0aCkgJiYgKGEgPSByLmxlbmd0aCk7XG4gIGZvciAodmFyIGUgPSAwLCBuID0gQXJyYXkoYSk7IGUgPCBhOyBlKyspIG5bZV0gPSByW2VdO1xuICByZXR1cm4gbjtcbn1cbmZ1bmN0aW9uIF90eXBlb2Yobykge1xuICBcIkBiYWJlbC9oZWxwZXJzIC0gdHlwZW9mXCI7XG5cbiAgcmV0dXJuIF90eXBlb2YgPSBcImZ1bmN0aW9uXCIgPT0gdHlwZW9mICh0eXBlb2YgU3ltYm9sICE9PSBcInVuZGVmaW5lZFwiID8gU3ltYm9sIDogZnVuY3Rpb24gKGkpIHsgcmV0dXJuIGk7IH0pICYmIFwic3ltYm9sXCIgPT0gdHlwZW9mICh0eXBlb2YgU3ltYm9sICE9PSBcInVuZGVmaW5lZFwiID8gU3ltYm9sIDogZnVuY3Rpb24gKGkpIHsgcmV0dXJuIGk7IH0pLml0ZXJhdG9yID8gZnVuY3Rpb24gKG8pIHtcbiAgICByZXR1cm4gdHlwZW9mIG87XG4gIH0gOiBmdW5jdGlvbiAobykge1xuICAgIHJldHVybiBvICYmIFwiZnVuY3Rpb25cIiA9PSB0eXBlb2YgKHR5cGVvZiBTeW1ib2wgIT09IFwidW5kZWZpbmVkXCIgPyBTeW1ib2wgOiBmdW5jdGlvbiAoaSkgeyByZXR1cm4gaTsgfSkgJiYgby5jb25zdHJ1Y3RvciA9PT0gKHR5cGVvZiBTeW1ib2wgIT09IFwidW5kZWZpbmVkXCIgPyBTeW1ib2wgOiBmdW5jdGlvbiAoaSkgeyByZXR1cm4gaTsgfSkgJiYgbyAhPT0gKHR5cGVvZiBTeW1ib2wgIT09IFwidW5kZWZpbmVkXCIgPyBTeW1ib2wgOiBmdW5jdGlvbiAoaSkgeyByZXR1cm4gaTsgfSkucHJvdG90eXBlID8gXCJzeW1ib2xcIiA6IHR5cGVvZiBvO1xuICB9LCBfdHlwZW9mKG8pO1xufVxudmFyIF9yZXF1aXJlID0gX193ZWJwYWNrX3JlcXVpcmVfXygvKiEgLi9Mb2dnZXIgKi8gXCIuL25vZGVfbW9kdWxlcy93ZWJwYWNrL2xpYi9sb2dnaW5nL0xvZ2dlci5qc1wiKSxcbiAgTG9nVHlwZSA9IF9yZXF1aXJlLkxvZ1R5cGU7XG5cbi8qKiBAdHlwZWRlZiB7aW1wb3J0KFwiLi4vLi4vZGVjbGFyYXRpb25zL1dlYnBhY2tPcHRpb25zXCIpLkZpbHRlckl0ZW1UeXBlc30gRmlsdGVySXRlbVR5cGVzICovXG4vKiogQHR5cGVkZWYge2ltcG9ydChcIi4uLy4uL2RlY2xhcmF0aW9ucy9XZWJwYWNrT3B0aW9uc1wiKS5GaWx0ZXJUeXBlc30gRmlsdGVyVHlwZXMgKi9cbi8qKiBAdHlwZWRlZiB7aW1wb3J0KFwiLi9Mb2dnZXJcIikuTG9nVHlwZUVudW19IExvZ1R5cGVFbnVtICovXG5cbi8qKiBAdHlwZWRlZiB7KGl0ZW06IHN0cmluZykgPT4gYm9vbGVhbn0gRmlsdGVyRnVuY3Rpb24gKi9cbi8qKiBAdHlwZWRlZiB7KHZhbHVlOiBzdHJpbmcsIHR5cGU6IExvZ1R5cGVFbnVtLCBhcmdzPzogRVhQRUNURURfQU5ZW10pID0+IHZvaWR9IExvZ2dpbmdGdW5jdGlvbiAqL1xuXG4vKipcbiAqIEB0eXBlZGVmIHtvYmplY3R9IExvZ2dlckNvbnNvbGVcbiAqIEBwcm9wZXJ0eSB7KCkgPT4gdm9pZH0gY2xlYXJcbiAqIEBwcm9wZXJ0eSB7KCkgPT4gdm9pZH0gdHJhY2VcbiAqIEBwcm9wZXJ0eSB7KC4uLmFyZ3M6IEVYUEVDVEVEX0FOWVtdKSA9PiB2b2lkfSBpbmZvXG4gKiBAcHJvcGVydHkgeyguLi5hcmdzOiBFWFBFQ1RFRF9BTllbXSkgPT4gdm9pZH0gbG9nXG4gKiBAcHJvcGVydHkgeyguLi5hcmdzOiBFWFBFQ1RFRF9BTllbXSkgPT4gdm9pZH0gd2FyblxuICogQHByb3BlcnR5IHsoLi4uYXJnczogRVhQRUNURURfQU5ZW10pID0+IHZvaWR9IGVycm9yXG4gKiBAcHJvcGVydHkgeyguLi5hcmdzOiBFWFBFQ1RFRF9BTllbXSkgPT4gdm9pZD19IGRlYnVnXG4gKiBAcHJvcGVydHkgeyguLi5hcmdzOiBFWFBFQ1RFRF9BTllbXSkgPT4gdm9pZD19IGdyb3VwXG4gKiBAcHJvcGVydHkgeyguLi5hcmdzOiBFWFBFQ1RFRF9BTllbXSkgPT4gdm9pZD19IGdyb3VwQ29sbGFwc2VkXG4gKiBAcHJvcGVydHkgeyguLi5hcmdzOiBFWFBFQ1RFRF9BTllbXSkgPT4gdm9pZD19IGdyb3VwRW5kXG4gKiBAcHJvcGVydHkgeyguLi5hcmdzOiBFWFBFQ1RFRF9BTllbXSkgPT4gdm9pZD19IHN0YXR1c1xuICogQHByb3BlcnR5IHsoLi4uYXJnczogRVhQRUNURURfQU5ZW10pID0+IHZvaWQ9fSBwcm9maWxlXG4gKiBAcHJvcGVydHkgeyguLi5hcmdzOiBFWFBFQ1RFRF9BTllbXSkgPT4gdm9pZD19IHByb2ZpbGVFbmRcbiAqIEBwcm9wZXJ0eSB7KC4uLmFyZ3M6IEVYUEVDVEVEX0FOWVtdKSA9PiB2b2lkPX0gbG9nVGltZVxuICovXG5cbi8qKlxuICogQHR5cGVkZWYge29iamVjdH0gTG9nZ2VyT3B0aW9uc1xuICogQHByb3BlcnR5IHtmYWxzZXx0cnVlfFwibm9uZVwifFwiZXJyb3JcInxcIndhcm5cInxcImluZm9cInxcImxvZ1wifFwidmVyYm9zZVwifSBsZXZlbCBsb2dsZXZlbFxuICogQHByb3BlcnR5IHtGaWx0ZXJUeXBlc3xib29sZWFufSBkZWJ1ZyBmaWx0ZXIgZm9yIGRlYnVnIGxvZ2dpbmdcbiAqIEBwcm9wZXJ0eSB7TG9nZ2VyQ29uc29sZX0gY29uc29sZSB0aGUgY29uc29sZSB0byBsb2cgdG9cbiAqL1xuXG4vKipcbiAqIEBwYXJhbSB7RmlsdGVySXRlbVR5cGVzfSBpdGVtIGFuIGlucHV0IGl0ZW1cbiAqIEByZXR1cm5zIHtGaWx0ZXJGdW5jdGlvbiB8IHVuZGVmaW5lZH0gZmlsdGVyIGZ1bmN0aW9uXG4gKi9cbnZhciBmaWx0ZXJUb0Z1bmN0aW9uID0gZnVuY3Rpb24gZmlsdGVyVG9GdW5jdGlvbihpdGVtKSB7XG4gIGlmICh0eXBlb2YgaXRlbSA9PT0gXCJzdHJpbmdcIikge1xuICAgIHZhciByZWdFeHAgPSBuZXcgUmVnRXhwKFwiW1xcXFxcXFxcL11cIi5jb25jYXQoaXRlbS5yZXBsYWNlKC9bLVtcXF17fSgpKis/LlxcXFxeJHxdL2csIFwiXFxcXCQmXCIpLCBcIihbXFxcXFxcXFwvXXwkfCF8XFxcXD8pXCIpKTtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGlkZW50KSB7XG4gICAgICByZXR1cm4gcmVnRXhwLnRlc3QoaWRlbnQpO1xuICAgIH07XG4gIH1cbiAgaWYgKGl0ZW0gJiYgX3R5cGVvZihpdGVtKSA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgaXRlbS50ZXN0ID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGlkZW50KSB7XG4gICAgICByZXR1cm4gaXRlbS50ZXN0KGlkZW50KTtcbiAgICB9O1xuICB9XG4gIGlmICh0eXBlb2YgaXRlbSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgcmV0dXJuIGl0ZW07XG4gIH1cbiAgaWYgKHR5cGVvZiBpdGVtID09PSBcImJvb2xlYW5cIikge1xuICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gaXRlbTtcbiAgICB9O1xuICB9XG59O1xuXG4vKipcbiAqIEBlbnVtIHtudW1iZXJ9XG4gKi9cbnZhciBMb2dMZXZlbCA9IHtcbiAgbm9uZTogNixcbiAgZmFsc2U6IDYsXG4gIGVycm9yOiA1LFxuICB3YXJuOiA0LFxuICBpbmZvOiAzLFxuICBsb2c6IDIsXG4gIHRydWU6IDIsXG4gIHZlcmJvc2U6IDFcbn07XG5cbi8qKlxuICogQHBhcmFtIHtMb2dnZXJPcHRpb25zfSBvcHRpb25zIG9wdGlvbnMgb2JqZWN0XG4gKiBAcmV0dXJucyB7TG9nZ2luZ0Z1bmN0aW9ufSBsb2dnaW5nIGZ1bmN0aW9uXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKF9yZWYpIHtcbiAgdmFyIF9yZWYkbGV2ZWwgPSBfcmVmLmxldmVsLFxuICAgIGxldmVsID0gX3JlZiRsZXZlbCA9PT0gdm9pZCAwID8gXCJpbmZvXCIgOiBfcmVmJGxldmVsLFxuICAgIF9yZWYkZGVidWcgPSBfcmVmLmRlYnVnLFxuICAgIGRlYnVnID0gX3JlZiRkZWJ1ZyA9PT0gdm9pZCAwID8gZmFsc2UgOiBfcmVmJGRlYnVnLFxuICAgIGNvbnNvbGUgPSBfcmVmLmNvbnNvbGU7XG4gIHZhciBkZWJ1Z0ZpbHRlcnMgPSAvKiogQHR5cGUge0ZpbHRlckZ1bmN0aW9uW119ICovXG5cbiAgdHlwZW9mIGRlYnVnID09PSBcImJvb2xlYW5cIiA/IFtmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIGRlYnVnO1xuICB9XSA6IC8qKiBAdHlwZSB7RmlsdGVySXRlbVR5cGVzW119ICovW10uY29uY2F0KGRlYnVnKS5tYXAoZmlsdGVyVG9GdW5jdGlvbik7XG4gIHZhciBsb2dsZXZlbCA9IExvZ0xldmVsW1wiXCIuY29uY2F0KGxldmVsKV0gfHwgMDtcblxuICAvKipcbiAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgbmFtZSBvZiB0aGUgbG9nZ2VyXG4gICAqIEBwYXJhbSB7TG9nVHlwZUVudW19IHR5cGUgdHlwZSBvZiB0aGUgbG9nIGVudHJ5XG4gICAqIEBwYXJhbSB7RVhQRUNURURfQU5ZW109fSBhcmdzIGFyZ3VtZW50cyBvZiB0aGUgbG9nIGVudHJ5XG4gICAqIEByZXR1cm5zIHt2b2lkfVxuICAgKi9cbiAgdmFyIGxvZ2dlciA9IGZ1bmN0aW9uIGxvZ2dlcihuYW1lLCB0eXBlLCBhcmdzKSB7XG4gICAgdmFyIGxhYmVsZWRBcmdzID0gZnVuY3Rpb24gbGFiZWxlZEFyZ3MoKSB7XG4gICAgICBpZiAoQXJyYXkuaXNBcnJheShhcmdzKSkge1xuICAgICAgICBpZiAoYXJncy5sZW5ndGggPiAwICYmIHR5cGVvZiBhcmdzWzBdID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgICAgcmV0dXJuIFtcIltcIi5jb25jYXQobmFtZSwgXCJdIFwiKS5jb25jYXQoYXJnc1swXSldLmNvbmNhdChfdG9Db25zdW1hYmxlQXJyYXkoYXJncy5zbGljZSgxKSkpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBbXCJbXCIuY29uY2F0KG5hbWUsIFwiXVwiKV0uY29uY2F0KF90b0NvbnN1bWFibGVBcnJheShhcmdzKSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gW107XG4gICAgfTtcbiAgICB2YXIgZGVidWcgPSBkZWJ1Z0ZpbHRlcnMuc29tZShmdW5jdGlvbiAoZikge1xuICAgICAgcmV0dXJuIGYobmFtZSk7XG4gICAgfSk7XG4gICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICBjYXNlIExvZ1R5cGUuZGVidWc6XG4gICAgICAgIGlmICghZGVidWcpIHJldHVybjtcbiAgICAgICAgaWYgKHR5cGVvZiBjb25zb2xlLmRlYnVnID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICBjb25zb2xlLmRlYnVnLmFwcGx5KGNvbnNvbGUsIF90b0NvbnN1bWFibGVBcnJheShsYWJlbGVkQXJncygpKSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY29uc29sZS5sb2cuYXBwbHkoY29uc29sZSwgX3RvQ29uc3VtYWJsZUFycmF5KGxhYmVsZWRBcmdzKCkpKTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgTG9nVHlwZS5sb2c6XG4gICAgICAgIGlmICghZGVidWcgJiYgbG9nbGV2ZWwgPiBMb2dMZXZlbC5sb2cpIHJldHVybjtcbiAgICAgICAgY29uc29sZS5sb2cuYXBwbHkoY29uc29sZSwgX3RvQ29uc3VtYWJsZUFycmF5KGxhYmVsZWRBcmdzKCkpKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIExvZ1R5cGUuaW5mbzpcbiAgICAgICAgaWYgKCFkZWJ1ZyAmJiBsb2dsZXZlbCA+IExvZ0xldmVsLmluZm8pIHJldHVybjtcbiAgICAgICAgY29uc29sZS5pbmZvLmFwcGx5KGNvbnNvbGUsIF90b0NvbnN1bWFibGVBcnJheShsYWJlbGVkQXJncygpKSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBMb2dUeXBlLndhcm46XG4gICAgICAgIGlmICghZGVidWcgJiYgbG9nbGV2ZWwgPiBMb2dMZXZlbC53YXJuKSByZXR1cm47XG4gICAgICAgIGNvbnNvbGUud2Fybi5hcHBseShjb25zb2xlLCBfdG9Db25zdW1hYmxlQXJyYXkobGFiZWxlZEFyZ3MoKSkpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgTG9nVHlwZS5lcnJvcjpcbiAgICAgICAgaWYgKCFkZWJ1ZyAmJiBsb2dsZXZlbCA+IExvZ0xldmVsLmVycm9yKSByZXR1cm47XG4gICAgICAgIGNvbnNvbGUuZXJyb3IuYXBwbHkoY29uc29sZSwgX3RvQ29uc3VtYWJsZUFycmF5KGxhYmVsZWRBcmdzKCkpKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIExvZ1R5cGUudHJhY2U6XG4gICAgICAgIGlmICghZGVidWcpIHJldHVybjtcbiAgICAgICAgY29uc29sZS50cmFjZSgpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgTG9nVHlwZS5ncm91cENvbGxhcHNlZDpcbiAgICAgICAgaWYgKCFkZWJ1ZyAmJiBsb2dsZXZlbCA+IExvZ0xldmVsLmxvZykgcmV0dXJuO1xuICAgICAgICBpZiAoIWRlYnVnICYmIGxvZ2xldmVsID4gTG9nTGV2ZWwudmVyYm9zZSkge1xuICAgICAgICAgIGlmICh0eXBlb2YgY29uc29sZS5ncm91cENvbGxhcHNlZCA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgICBjb25zb2xlLmdyb3VwQ29sbGFwc2VkLmFwcGx5KGNvbnNvbGUsIF90b0NvbnN1bWFibGVBcnJheShsYWJlbGVkQXJncygpKSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nLmFwcGx5KGNvbnNvbGUsIF90b0NvbnN1bWFibGVBcnJheShsYWJlbGVkQXJncygpKSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAvLyBmYWxscyB0aHJvdWdoXG4gICAgICBjYXNlIExvZ1R5cGUuZ3JvdXA6XG4gICAgICAgIGlmICghZGVidWcgJiYgbG9nbGV2ZWwgPiBMb2dMZXZlbC5sb2cpIHJldHVybjtcbiAgICAgICAgaWYgKHR5cGVvZiBjb25zb2xlLmdyb3VwID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICBjb25zb2xlLmdyb3VwLmFwcGx5KGNvbnNvbGUsIF90b0NvbnN1bWFibGVBcnJheShsYWJlbGVkQXJncygpKSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY29uc29sZS5sb2cuYXBwbHkoY29uc29sZSwgX3RvQ29uc3VtYWJsZUFycmF5KGxhYmVsZWRBcmdzKCkpKTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgTG9nVHlwZS5ncm91cEVuZDpcbiAgICAgICAgaWYgKCFkZWJ1ZyAmJiBsb2dsZXZlbCA+IExvZ0xldmVsLmxvZykgcmV0dXJuO1xuICAgICAgICBpZiAodHlwZW9mIGNvbnNvbGUuZ3JvdXBFbmQgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgIGNvbnNvbGUuZ3JvdXBFbmQoKTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgTG9nVHlwZS50aW1lOlxuICAgICAgICB7XG4gICAgICAgICAgaWYgKCFkZWJ1ZyAmJiBsb2dsZXZlbCA+IExvZ0xldmVsLmxvZykgcmV0dXJuO1xuICAgICAgICAgIHZhciBfYXJncyA9IF9zbGljZWRUb0FycmF5KC8qKiBAdHlwZSB7W3N0cmluZywgbnVtYmVyLCBudW1iZXJdfSAqL1xuICAgICAgICAgICAgYXJncywgMyksXG4gICAgICAgICAgICBsYWJlbCA9IF9hcmdzWzBdLFxuICAgICAgICAgICAgc3RhcnQgPSBfYXJnc1sxXSxcbiAgICAgICAgICAgIGVuZCA9IF9hcmdzWzJdO1xuICAgICAgICAgIHZhciBtcyA9IHN0YXJ0ICogMTAwMCArIGVuZCAvIDEwMDAwMDA7XG4gICAgICAgICAgdmFyIG1zZyA9IFwiW1wiLmNvbmNhdChuYW1lLCBcIl0gXCIpLmNvbmNhdChsYWJlbCwgXCI6IFwiKS5jb25jYXQobXMsIFwiIG1zXCIpO1xuICAgICAgICAgIGlmICh0eXBlb2YgY29uc29sZS5sb2dUaW1lID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nVGltZShtc2cpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhtc2cpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgY2FzZSBMb2dUeXBlLnByb2ZpbGU6XG4gICAgICAgIGlmICh0eXBlb2YgY29uc29sZS5wcm9maWxlID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICBjb25zb2xlLnByb2ZpbGUuYXBwbHkoY29uc29sZSwgX3RvQ29uc3VtYWJsZUFycmF5KGxhYmVsZWRBcmdzKCkpKTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgTG9nVHlwZS5wcm9maWxlRW5kOlxuICAgICAgICBpZiAodHlwZW9mIGNvbnNvbGUucHJvZmlsZUVuZCA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgY29uc29sZS5wcm9maWxlRW5kLmFwcGx5KGNvbnNvbGUsIF90b0NvbnN1bWFibGVBcnJheShsYWJlbGVkQXJncygpKSk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIExvZ1R5cGUuY2xlYXI6XG4gICAgICAgIGlmICghZGVidWcgJiYgbG9nbGV2ZWwgPiBMb2dMZXZlbC5sb2cpIHJldHVybjtcbiAgICAgICAgaWYgKHR5cGVvZiBjb25zb2xlLmNsZWFyID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICBjb25zb2xlLmNsZWFyKCk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIExvZ1R5cGUuc3RhdHVzOlxuICAgICAgICBpZiAoIWRlYnVnICYmIGxvZ2xldmVsID4gTG9nTGV2ZWwuaW5mbykgcmV0dXJuO1xuICAgICAgICBpZiAodHlwZW9mIGNvbnNvbGUuc3RhdHVzID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICBpZiAoIWFyZ3MgfHwgYXJncy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIGNvbnNvbGUuc3RhdHVzKCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnNvbGUuc3RhdHVzLmFwcGx5KGNvbnNvbGUsIF90b0NvbnN1bWFibGVBcnJheShsYWJlbGVkQXJncygpKSk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKGFyZ3MgJiYgYXJncy5sZW5ndGggIT09IDApIHtcbiAgICAgICAgICBjb25zb2xlLmluZm8uYXBwbHkoY29uc29sZSwgX3RvQ29uc3VtYWJsZUFycmF5KGxhYmVsZWRBcmdzKCkpKTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIlVuZXhwZWN0ZWQgTG9nVHlwZSBcIi5jb25jYXQodHlwZSkpO1xuICAgIH1cbiAgfTtcbiAgcmV0dXJuIGxvZ2dlcjtcbn07XG5cbi8qKiovIH0pLFxuXG4vKioqLyBcIi4vbm9kZV9tb2R1bGVzL3dlYnBhY2svbGliL2xvZ2dpbmcvcnVudGltZS5qc1wiOlxuLyohKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiohKlxcXG4gICEqKiogLi9ub2RlX21vZHVsZXMvd2VicGFjay9saWIvbG9nZ2luZy9ydW50aW1lLmpzICoqKiFcbiAgXFwqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIF9fdW51c2VkX3dlYnBhY2tfZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG4vKlxuXHRNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuXHRBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXG4qL1xuXG5cblxuZnVuY3Rpb24gX2V4dGVuZHMoKSB7XG4gIHJldHVybiBfZXh0ZW5kcyA9IE9iamVjdC5hc3NpZ24gPyBPYmplY3QuYXNzaWduLmJpbmQoKSA6IGZ1bmN0aW9uIChuKSB7XG4gICAgZm9yICh2YXIgZSA9IDE7IGUgPCBhcmd1bWVudHMubGVuZ3RoOyBlKyspIHtcbiAgICAgIHZhciB0ID0gYXJndW1lbnRzW2VdO1xuICAgICAgZm9yICh2YXIgciBpbiB0KSAoe30pLmhhc093blByb3BlcnR5LmNhbGwodCwgcikgJiYgKG5bcl0gPSB0W3JdKTtcbiAgICB9XG4gICAgcmV0dXJuIG47XG4gIH0sIF9leHRlbmRzLmFwcGx5KG51bGwsIGFyZ3VtZW50cyk7XG59XG52YXIgX3JlcXVpcmUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKC8qISB0YXBhYmxlICovIFwiLi9jbGllbnQtc3JjL21vZHVsZXMvbG9nZ2VyL3RhcGFibGUuanNcIiksXG4gIFN5bmNCYWlsSG9vayA9IF9yZXF1aXJlLlN5bmNCYWlsSG9vaztcbnZhciBfcmVxdWlyZTIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKC8qISAuL0xvZ2dlciAqLyBcIi4vbm9kZV9tb2R1bGVzL3dlYnBhY2svbGliL2xvZ2dpbmcvTG9nZ2VyLmpzXCIpLFxuICBMb2dnZXIgPSBfcmVxdWlyZTIuTG9nZ2VyO1xudmFyIGNyZWF0ZUNvbnNvbGVMb2dnZXIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKC8qISAuL2NyZWF0ZUNvbnNvbGVMb2dnZXIgKi8gXCIuL25vZGVfbW9kdWxlcy93ZWJwYWNrL2xpYi9sb2dnaW5nL2NyZWF0ZUNvbnNvbGVMb2dnZXIuanNcIik7XG5cbi8qKiBAdHlwZSB7Y3JlYXRlQ29uc29sZUxvZ2dlci5Mb2dnZXJPcHRpb25zfSAqL1xudmFyIGN1cnJlbnREZWZhdWx0TG9nZ2VyT3B0aW9ucyA9IHtcbiAgbGV2ZWw6IFwiaW5mb1wiLFxuICBkZWJ1ZzogZmFsc2UsXG4gIGNvbnNvbGU6IGNvbnNvbGVcbn07XG52YXIgY3VycmVudERlZmF1bHRMb2dnZXIgPSBjcmVhdGVDb25zb2xlTG9nZ2VyKGN1cnJlbnREZWZhdWx0TG9nZ2VyT3B0aW9ucyk7XG5cbi8qKlxuICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgbmFtZSBvZiB0aGUgbG9nZ2VyXG4gKiBAcmV0dXJucyB7TG9nZ2VyfSBhIGxvZ2dlclxuICovXG5tb2R1bGUuZXhwb3J0cy5nZXRMb2dnZXIgPSBmdW5jdGlvbiAobmFtZSkge1xuICByZXR1cm4gbmV3IExvZ2dlcihmdW5jdGlvbiAodHlwZSwgYXJncykge1xuICAgIGlmIChtb2R1bGUuZXhwb3J0cy5ob29rcy5sb2cuY2FsbChuYW1lLCB0eXBlLCBhcmdzKSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBjdXJyZW50RGVmYXVsdExvZ2dlcihuYW1lLCB0eXBlLCBhcmdzKTtcbiAgICB9XG4gIH0sIGZ1bmN0aW9uIChjaGlsZE5hbWUpIHtcbiAgICByZXR1cm4gbW9kdWxlLmV4cG9ydHMuZ2V0TG9nZ2VyKFwiXCIuY29uY2F0KG5hbWUsIFwiL1wiKS5jb25jYXQoY2hpbGROYW1lKSk7XG4gIH0pO1xufTtcblxuLyoqXG4gKiBAcGFyYW0ge2NyZWF0ZUNvbnNvbGVMb2dnZXIuTG9nZ2VyT3B0aW9uc30gb3B0aW9ucyBuZXcgb3B0aW9ucywgbWVyZ2Ugd2l0aCBvbGQgb3B0aW9uc1xuICogQHJldHVybnMge3ZvaWR9XG4gKi9cbm1vZHVsZS5leHBvcnRzLmNvbmZpZ3VyZURlZmF1bHRMb2dnZXIgPSBmdW5jdGlvbiAob3B0aW9ucykge1xuICBfZXh0ZW5kcyhjdXJyZW50RGVmYXVsdExvZ2dlck9wdGlvbnMsIG9wdGlvbnMpO1xuICBjdXJyZW50RGVmYXVsdExvZ2dlciA9IGNyZWF0ZUNvbnNvbGVMb2dnZXIoY3VycmVudERlZmF1bHRMb2dnZXJPcHRpb25zKTtcbn07XG5tb2R1bGUuZXhwb3J0cy5ob29rcyA9IHtcbiAgbG9nOiBuZXcgU3luY0JhaWxIb29rKFtcIm9yaWdpblwiLCBcInR5cGVcIiwgXCJhcmdzXCJdKVxufTtcblxuLyoqKi8gfSlcblxuLyoqKioqKi8gXHR9KTtcbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG4vKioqKioqLyBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbi8qKioqKiovIFx0dmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuLyoqKioqKi8gXHRcbi8qKioqKiovIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbi8qKioqKiovIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuLyoqKioqKi8gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuLyoqKioqKi8gXHRcdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuLyoqKioqKi8gXHRcdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuLyoqKioqKi8gXHRcdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuLyoqKioqKi8gXHRcdH1cbi8qKioqKiovIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuLyoqKioqKi8gXHRcdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuLyoqKioqKi8gXHRcdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuLyoqKioqKi8gXHRcdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcbi8qKioqKiovIFx0XHRcdGV4cG9ydHM6IHt9XG4vKioqKioqLyBcdFx0fTtcbi8qKioqKiovIFx0XG4vKioqKioqLyBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4vKioqKioqLyBcdFx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG4vKioqKioqLyBcdFxuLyoqKioqKi8gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4vKioqKioqLyBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuLyoqKioqKi8gXHR9XG4vKioqKioqLyBcdFxuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbi8qKioqKiovIFx0Lyogd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzICovXG4vKioqKioqLyBcdCFmdW5jdGlvbigpIHtcbi8qKioqKiovIFx0XHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG4vKioqKioqLyBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgZGVmaW5pdGlvbikge1xuLyoqKioqKi8gXHRcdFx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuLyoqKioqKi8gXHRcdFx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcbi8qKioqKiovIFx0XHRcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuLyoqKioqKi8gXHRcdFx0XHR9XG4vKioqKioqLyBcdFx0XHR9XG4vKioqKioqLyBcdFx0fTtcbi8qKioqKiovIFx0fSgpO1xuLyoqKioqKi8gXHRcbi8qKioqKiovIFx0Lyogd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCAqL1xuLyoqKioqKi8gXHQhZnVuY3Rpb24oKSB7XG4vKioqKioqLyBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqLCBwcm9wKSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKTsgfVxuLyoqKioqKi8gXHR9KCk7XG4vKioqKioqLyBcdFxuLyoqKioqKi8gXHQvKiB3ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0ICovXG4vKioqKioqLyBcdCFmdW5jdGlvbigpIHtcbi8qKioqKiovIFx0XHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4vKioqKioqLyBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuLyoqKioqKi8gXHRcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4vKioqKioqLyBcdFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuLyoqKioqKi8gXHRcdFx0fVxuLyoqKioqKi8gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbi8qKioqKiovIFx0XHR9O1xuLyoqKioqKi8gXHR9KCk7XG4vKioqKioqLyBcdFxuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0ge307XG4vLyBUaGlzIGVudHJ5IG5lZWRzIHRvIGJlIHdyYXBwZWQgaW4gYW4gSUlGRSBiZWNhdXNlIGl0IG5lZWRzIHRvIGJlIGlzb2xhdGVkIGFnYWluc3Qgb3RoZXIgbW9kdWxlcyBpbiB0aGUgY2h1bmsuXG4hZnVuY3Rpb24oKSB7XG4vKiEqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiEqXFxcbiAgISoqKiAuL2NsaWVudC1zcmMvbW9kdWxlcy9sb2dnZXIvaW5kZXguanMgKioqIVxuICBcXCoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yKF9fd2VicGFja19leHBvcnRzX18pO1xuLyogaGFybW9ueSBleHBvcnQgKi8gX193ZWJwYWNrX3JlcXVpcmVfXy5kKF9fd2VicGFja19leHBvcnRzX18sIHtcbi8qIGhhcm1vbnkgZXhwb3J0ICovICAgXCJkZWZhdWx0XCI6IGZ1bmN0aW9uKCkgeyByZXR1cm4gLyogcmVleHBvcnQgZGVmYXVsdCBleHBvcnQgZnJvbSBuYW1lZCBtb2R1bGUgKi8gd2VicGFja19saWJfbG9nZ2luZ19ydW50aW1lX2pzX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8wX187IH1cbi8qIGhhcm1vbnkgZXhwb3J0ICovIH0pO1xuLyogaGFybW9ueSBpbXBvcnQgKi8gdmFyIHdlYnBhY2tfbGliX2xvZ2dpbmdfcnVudGltZV9qc19fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMF9fID0gX193ZWJwYWNrX3JlcXVpcmVfXygvKiEgd2VicGFjay9saWIvbG9nZ2luZy9ydW50aW1lLmpzICovIFwiLi9ub2RlX21vZHVsZXMvd2VicGFjay9saWIvbG9nZ2luZy9ydW50aW1lLmpzXCIpO1xuXG59KCk7XG52YXIgX193ZWJwYWNrX2V4cG9ydF90YXJnZXRfXyA9IGV4cG9ydHM7XG5mb3IodmFyIF9fd2VicGFja19pX18gaW4gX193ZWJwYWNrX2V4cG9ydHNfXykgX193ZWJwYWNrX2V4cG9ydF90YXJnZXRfX1tfX3dlYnBhY2tfaV9fXSA9IF9fd2VicGFja19leHBvcnRzX19bX193ZWJwYWNrX2lfX107XG5pZihfX3dlYnBhY2tfZXhwb3J0c19fLl9fZXNNb2R1bGUpIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShfX3dlYnBhY2tfZXhwb3J0X3RhcmdldF9fLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbi8qKioqKiovIH0pKClcbjsiLCJmdW5jdGlvbiBfdHlwZW9mKG8pIHsgXCJAYmFiZWwvaGVscGVycyAtIHR5cGVvZlwiOyByZXR1cm4gX3R5cGVvZiA9IFwiZnVuY3Rpb25cIiA9PSB0eXBlb2YgU3ltYm9sICYmIFwic3ltYm9sXCIgPT0gdHlwZW9mIFN5bWJvbC5pdGVyYXRvciA/IGZ1bmN0aW9uIChvKSB7IHJldHVybiB0eXBlb2YgbzsgfSA6IGZ1bmN0aW9uIChvKSB7IHJldHVybiBvICYmIFwiZnVuY3Rpb25cIiA9PSB0eXBlb2YgU3ltYm9sICYmIG8uY29uc3RydWN0b3IgPT09IFN5bWJvbCAmJiBvICE9PSBTeW1ib2wucHJvdG90eXBlID8gXCJzeW1ib2xcIiA6IHR5cGVvZiBvOyB9LCBfdHlwZW9mKG8pOyB9XG5mdW5jdGlvbiBvd25LZXlzKGUsIHIpIHsgdmFyIHQgPSBPYmplY3Qua2V5cyhlKTsgaWYgKE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMpIHsgdmFyIG8gPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKGUpOyByICYmIChvID0gby5maWx0ZXIoZnVuY3Rpb24gKHIpIHsgcmV0dXJuIE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoZSwgcikuZW51bWVyYWJsZTsgfSkpLCB0LnB1c2guYXBwbHkodCwgbyk7IH0gcmV0dXJuIHQ7IH1cbmZ1bmN0aW9uIF9vYmplY3RTcHJlYWQoZSkgeyBmb3IgKHZhciByID0gMTsgciA8IGFyZ3VtZW50cy5sZW5ndGg7IHIrKykgeyB2YXIgdCA9IG51bGwgIT0gYXJndW1lbnRzW3JdID8gYXJndW1lbnRzW3JdIDoge307IHIgJSAyID8gb3duS2V5cyhPYmplY3QodCksICEwKS5mb3JFYWNoKGZ1bmN0aW9uIChyKSB7IF9kZWZpbmVQcm9wZXJ0eShlLCByLCB0W3JdKTsgfSkgOiBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9ycyA/IE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKGUsIE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JzKHQpKSA6IG93bktleXMoT2JqZWN0KHQpKS5mb3JFYWNoKGZ1bmN0aW9uIChyKSB7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eShlLCByLCBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHQsIHIpKTsgfSk7IH0gcmV0dXJuIGU7IH1cbmZ1bmN0aW9uIF9kZWZpbmVQcm9wZXJ0eShlLCByLCB0KSB7IHJldHVybiAociA9IF90b1Byb3BlcnR5S2V5KHIpKSBpbiBlID8gT2JqZWN0LmRlZmluZVByb3BlcnR5KGUsIHIsIHsgdmFsdWU6IHQsIGVudW1lcmFibGU6ICEwLCBjb25maWd1cmFibGU6ICEwLCB3cml0YWJsZTogITAgfSkgOiBlW3JdID0gdCwgZTsgfVxuZnVuY3Rpb24gX3RvUHJvcGVydHlLZXkodCkgeyB2YXIgaSA9IF90b1ByaW1pdGl2ZSh0LCBcInN0cmluZ1wiKTsgcmV0dXJuIFwic3ltYm9sXCIgPT0gX3R5cGVvZihpKSA/IGkgOiBpICsgXCJcIjsgfVxuZnVuY3Rpb24gX3RvUHJpbWl0aXZlKHQsIHIpIHsgaWYgKFwib2JqZWN0XCIgIT0gX3R5cGVvZih0KSB8fCAhdCkgcmV0dXJuIHQ7IHZhciBlID0gdFtTeW1ib2wudG9QcmltaXRpdmVdOyBpZiAodm9pZCAwICE9PSBlKSB7IHZhciBpID0gZS5jYWxsKHQsIHIgfHwgXCJkZWZhdWx0XCIpOyBpZiAoXCJvYmplY3RcIiAhPSBfdHlwZW9mKGkpKSByZXR1cm4gaTsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkBAdG9QcmltaXRpdmUgbXVzdCByZXR1cm4gYSBwcmltaXRpdmUgdmFsdWUuXCIpOyB9IHJldHVybiAoXCJzdHJpbmdcIiA9PT0gciA/IFN0cmluZyA6IE51bWJlcikodCk7IH1cbi8vIFRoZSBlcnJvciBvdmVybGF5IGlzIGluc3BpcmVkIChhbmQgbW9zdGx5IGNvcGllZCkgZnJvbSBDcmVhdGUgUmVhY3QgQXBwIChodHRwczovL2dpdGh1Yi5jb20vZmFjZWJvb2tpbmN1YmF0b3IvY3JlYXRlLXJlYWN0LWFwcClcbi8vIFRoZXksIGluIHR1cm4sIGdvdCBpbnNwaXJlZCBieSB3ZWJwYWNrLWhvdC1taWRkbGV3YXJlIChodHRwczovL2dpdGh1Yi5jb20vZ2xlbmphbWluL3dlYnBhY2staG90LW1pZGRsZXdhcmUpLlxuXG5pbXBvcnQgYW5zaUhUTUwgZnJvbSBcImFuc2ktaHRtbC1jb21tdW5pdHlcIjtcblxuLyoqXG4gKiBAdHlwZSB7KGlucHV0OiBzdHJpbmcsIHBvc2l0aW9uOiBudW1iZXIpID0+IHN0cmluZ31cbiAqL1xudmFyIGdldENvZGVQb2ludCA9IFN0cmluZy5wcm90b3R5cGUuY29kZVBvaW50QXQgPyBmdW5jdGlvbiAoaW5wdXQsIHBvc2l0aW9uKSB7XG4gIHJldHVybiBpbnB1dC5jb2RlUG9pbnRBdChwb3NpdGlvbik7XG59IDogZnVuY3Rpb24gKGlucHV0LCBwb3NpdGlvbikge1xuICByZXR1cm4gKGlucHV0LmNoYXJDb2RlQXQocG9zaXRpb24pIC0gMHhkODAwKSAqIDB4NDAwICsgaW5wdXQuY2hhckNvZGVBdChwb3NpdGlvbiArIDEpIC0gMHhkYzAwICsgMHgxMDAwMDtcbn07XG5cbi8qKlxuICogQHBhcmFtIHtzdHJpbmd9IG1hY3JvVGV4dFxuICogQHBhcmFtIHtSZWdFeHB9IG1hY3JvUmVnRXhwXG4gKiBAcGFyYW0geyhpbnB1dDogc3RyaW5nKSA9PiBzdHJpbmd9IG1hY3JvUmVwbGFjZXJcbiAqIEByZXR1cm5zIHtzdHJpbmd9XG4gKi9cbnZhciByZXBsYWNlVXNpbmdSZWdFeHAgPSBmdW5jdGlvbiByZXBsYWNlVXNpbmdSZWdFeHAobWFjcm9UZXh0LCBtYWNyb1JlZ0V4cCwgbWFjcm9SZXBsYWNlcikge1xuICBtYWNyb1JlZ0V4cC5sYXN0SW5kZXggPSAwO1xuICB2YXIgcmVwbGFjZU1hdGNoID0gbWFjcm9SZWdFeHAuZXhlYyhtYWNyb1RleHQpO1xuICB2YXIgcmVwbGFjZVJlc3VsdDtcbiAgaWYgKHJlcGxhY2VNYXRjaCkge1xuICAgIHJlcGxhY2VSZXN1bHQgPSBcIlwiO1xuICAgIHZhciByZXBsYWNlTGFzdEluZGV4ID0gMDtcbiAgICBkbyB7XG4gICAgICBpZiAocmVwbGFjZUxhc3RJbmRleCAhPT0gcmVwbGFjZU1hdGNoLmluZGV4KSB7XG4gICAgICAgIHJlcGxhY2VSZXN1bHQgKz0gbWFjcm9UZXh0LnN1YnN0cmluZyhyZXBsYWNlTGFzdEluZGV4LCByZXBsYWNlTWF0Y2guaW5kZXgpO1xuICAgICAgfVxuICAgICAgdmFyIHJlcGxhY2VJbnB1dCA9IHJlcGxhY2VNYXRjaFswXTtcbiAgICAgIHJlcGxhY2VSZXN1bHQgKz0gbWFjcm9SZXBsYWNlcihyZXBsYWNlSW5wdXQpO1xuICAgICAgcmVwbGFjZUxhc3RJbmRleCA9IHJlcGxhY2VNYXRjaC5pbmRleCArIHJlcGxhY2VJbnB1dC5sZW5ndGg7XG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tY29uZC1hc3NpZ25cbiAgICB9IHdoaWxlIChyZXBsYWNlTWF0Y2ggPSBtYWNyb1JlZ0V4cC5leGVjKG1hY3JvVGV4dCkpO1xuICAgIGlmIChyZXBsYWNlTGFzdEluZGV4ICE9PSBtYWNyb1RleHQubGVuZ3RoKSB7XG4gICAgICByZXBsYWNlUmVzdWx0ICs9IG1hY3JvVGV4dC5zdWJzdHJpbmcocmVwbGFjZUxhc3RJbmRleCk7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIHJlcGxhY2VSZXN1bHQgPSBtYWNyb1RleHQ7XG4gIH1cbiAgcmV0dXJuIHJlcGxhY2VSZXN1bHQ7XG59O1xudmFyIHJlZmVyZW5jZXMgPSB7XG4gIFwiPFwiOiBcIiZsdDtcIixcbiAgXCI+XCI6IFwiJmd0O1wiLFxuICAnXCInOiBcIiZxdW90O1wiLFxuICBcIidcIjogXCImYXBvcztcIixcbiAgXCImXCI6IFwiJmFtcDtcIlxufTtcblxuLyoqXG4gKiBAcGFyYW0ge3N0cmluZ30gdGV4dCB0ZXh0XG4gKiBAcmV0dXJucyB7c3RyaW5nfVxuICovXG5mdW5jdGlvbiBlbmNvZGUodGV4dCkge1xuICBpZiAoIXRleHQpIHtcbiAgICByZXR1cm4gXCJcIjtcbiAgfVxuICByZXR1cm4gcmVwbGFjZVVzaW5nUmVnRXhwKHRleHQsIC9bPD4nXCImXS9nLCBmdW5jdGlvbiAoaW5wdXQpIHtcbiAgICB2YXIgcmVzdWx0ID0gcmVmZXJlbmNlc1tpbnB1dF07XG4gICAgaWYgKCFyZXN1bHQpIHtcbiAgICAgIHZhciBjb2RlID0gaW5wdXQubGVuZ3RoID4gMSA/IGdldENvZGVQb2ludChpbnB1dCwgMCkgOiBpbnB1dC5jaGFyQ29kZUF0KDApO1xuICAgICAgcmVzdWx0ID0gXCImI1wiLmNvbmNhdChjb2RlLCBcIjtcIik7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH0pO1xufVxuXG4vKipcbiAqIEB0eXBlZGVmIHtPYmplY3R9IFN0YXRlRGVmaW5pdGlvbnNcbiAqIEBwcm9wZXJ0eSB7e1tldmVudDogc3RyaW5nXTogeyB0YXJnZXQ6IHN0cmluZzsgYWN0aW9ucz86IEFycmF5PHN0cmluZz4gfX19IFtvbl1cbiAqL1xuXG4vKipcbiAqIEB0eXBlZGVmIHtPYmplY3R9IE9wdGlvbnNcbiAqIEBwcm9wZXJ0eSB7e1tzdGF0ZTogc3RyaW5nXTogU3RhdGVEZWZpbml0aW9uc319IHN0YXRlc1xuICogQHByb3BlcnR5IHtvYmplY3R9IGNvbnRleHQ7XG4gKiBAcHJvcGVydHkge3N0cmluZ30gaW5pdGlhbFxuICovXG5cbi8qKlxuICogQHR5cGVkZWYge09iamVjdH0gSW1wbGVtZW50YXRpb25cbiAqIEBwcm9wZXJ0eSB7e1thY3Rpb25OYW1lOiBzdHJpbmddOiAoY3R4OiBvYmplY3QsIGV2ZW50OiBhbnkpID0+IG9iamVjdH19IGFjdGlvbnNcbiAqL1xuXG4vKipcbiAqIEEgc2ltcGxpZmllZCBgY3JlYXRlTWFjaGluZWAgZnJvbSBgQHhzdGF0ZS9mc21gIHdpdGggdGhlIGZvbGxvd2luZyBkaWZmZXJlbmNlczpcbiAqXG4gKiAgLSB0aGUgcmV0dXJuZWQgbWFjaGluZSBpcyB0ZWNobmljYWxseSBhIFwic2VydmljZVwiLiBObyBgaW50ZXJwcmV0KG1hY2hpbmUpLnN0YXJ0KClgIGlzIG5lZWRlZC5cbiAqICAtIHRoZSBzdGF0ZSBkZWZpbml0aW9uIG9ubHkgc3VwcG9ydCBgb25gIGFuZCB0YXJnZXQgbXVzdCBiZSBkZWNsYXJlZCB3aXRoIHsgdGFyZ2V0OiAnbmV4dFN0YXRlJywgYWN0aW9uczogW10gfSBleHBsaWNpdGx5LlxuICogIC0gZXZlbnQgcGFzc2VkIHRvIGBzZW5kYCBtdXN0IGJlIGFuIG9iamVjdCB3aXRoIGB0eXBlYCBwcm9wZXJ0eS5cbiAqICAtIGFjdGlvbnMgaW1wbGVtZW50YXRpb24gd2lsbCBiZSBbYXNzaWduIGFjdGlvbl0oaHR0cHM6Ly94c3RhdGUuanMub3JnL2RvY3MvZ3VpZGVzL2NvbnRleHQuaHRtbCNhc3NpZ24tYWN0aW9uKSBpZiB5b3UgcmV0dXJuIGFueSB2YWx1ZS5cbiAqICBEbyBub3QgcmV0dXJuIGFueXRoaW5nIGlmIHlvdSBqdXN0IHdhbnQgdG8gaW52b2tlIHNpZGUgZWZmZWN0LlxuICpcbiAqIFRoZSBnb2FsIG9mIHRoaXMgY3VzdG9tIGZ1bmN0aW9uIGlzIHRvIGF2b2lkIGluc3RhbGxpbmcgdGhlIGVudGlyZSBgJ3hzdGF0ZS9mc20nYCBwYWNrYWdlLCB3aGlsZSBlbmFibGluZyBtb2RlbGluZyB1c2luZ1xuICogc3RhdGUgbWFjaGluZS4gWW91IGNhbiBjb3B5IHRoZSBmaXJzdCBwYXJhbWV0ZXIgaW50byB0aGUgZWRpdG9yIGF0IGh0dHBzOi8vc3RhdGVseS5haS92aXogdG8gdmlzdWFsaXplIHRoZSBzdGF0ZSBtYWNoaW5lLlxuICpcbiAqIEBwYXJhbSB7T3B0aW9uc30gb3B0aW9uc1xuICogQHBhcmFtIHtJbXBsZW1lbnRhdGlvbn0gaW1wbGVtZW50YXRpb25cbiAqL1xuZnVuY3Rpb24gY3JlYXRlTWFjaGluZShfcmVmLCBfcmVmMikge1xuICB2YXIgc3RhdGVzID0gX3JlZi5zdGF0ZXMsXG4gICAgY29udGV4dCA9IF9yZWYuY29udGV4dCxcbiAgICBpbml0aWFsID0gX3JlZi5pbml0aWFsO1xuICB2YXIgYWN0aW9ucyA9IF9yZWYyLmFjdGlvbnM7XG4gIHZhciBjdXJyZW50U3RhdGUgPSBpbml0aWFsO1xuICB2YXIgY3VycmVudENvbnRleHQgPSBjb250ZXh0O1xuICByZXR1cm4ge1xuICAgIHNlbmQ6IGZ1bmN0aW9uIHNlbmQoZXZlbnQpIHtcbiAgICAgIHZhciBjdXJyZW50U3RhdGVPbiA9IHN0YXRlc1tjdXJyZW50U3RhdGVdLm9uO1xuICAgICAgdmFyIHRyYW5zaXRpb25Db25maWcgPSBjdXJyZW50U3RhdGVPbiAmJiBjdXJyZW50U3RhdGVPbltldmVudC50eXBlXTtcbiAgICAgIGlmICh0cmFuc2l0aW9uQ29uZmlnKSB7XG4gICAgICAgIGN1cnJlbnRTdGF0ZSA9IHRyYW5zaXRpb25Db25maWcudGFyZ2V0O1xuICAgICAgICBpZiAodHJhbnNpdGlvbkNvbmZpZy5hY3Rpb25zKSB7XG4gICAgICAgICAgdHJhbnNpdGlvbkNvbmZpZy5hY3Rpb25zLmZvckVhY2goZnVuY3Rpb24gKGFjdE5hbWUpIHtcbiAgICAgICAgICAgIHZhciBhY3Rpb25JbXBsID0gYWN0aW9uc1thY3ROYW1lXTtcbiAgICAgICAgICAgIHZhciBuZXh0Q29udGV4dFZhbHVlID0gYWN0aW9uSW1wbCAmJiBhY3Rpb25JbXBsKGN1cnJlbnRDb250ZXh0LCBldmVudCk7XG4gICAgICAgICAgICBpZiAobmV4dENvbnRleHRWYWx1ZSkge1xuICAgICAgICAgICAgICBjdXJyZW50Q29udGV4dCA9IF9vYmplY3RTcHJlYWQoX29iamVjdFNwcmVhZCh7fSwgY3VycmVudENvbnRleHQpLCBuZXh0Q29udGV4dFZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfTtcbn1cblxuLyoqXG4gKiBAdHlwZWRlZiB7T2JqZWN0fSBTaG93T3ZlcmxheURhdGFcbiAqIEBwcm9wZXJ0eSB7J3dhcm5pbmcnIHwgJ2Vycm9yJ30gbGV2ZWxcbiAqIEBwcm9wZXJ0eSB7QXJyYXk8c3RyaW5nICB8IHsgbW9kdWxlSWRlbnRpZmllcj86IHN0cmluZywgbW9kdWxlTmFtZT86IHN0cmluZywgbG9jPzogc3RyaW5nLCBtZXNzYWdlPzogc3RyaW5nIH0+fSBtZXNzYWdlc1xuICogQHByb3BlcnR5IHsnYnVpbGQnIHwgJ3J1bnRpbWUnfSBtZXNzYWdlU291cmNlXG4gKi9cblxuLyoqXG4gKiBAdHlwZWRlZiB7T2JqZWN0fSBDcmVhdGVPdmVybGF5TWFjaGluZU9wdGlvbnNcbiAqIEBwcm9wZXJ0eSB7KGRhdGE6IFNob3dPdmVybGF5RGF0YSkgPT4gdm9pZH0gc2hvd092ZXJsYXlcbiAqIEBwcm9wZXJ0eSB7KCkgPT4gdm9pZH0gaGlkZU92ZXJsYXlcbiAqL1xuXG4vKipcbiAqIEBwYXJhbSB7Q3JlYXRlT3ZlcmxheU1hY2hpbmVPcHRpb25zfSBvcHRpb25zXG4gKi9cbnZhciBjcmVhdGVPdmVybGF5TWFjaGluZSA9IGZ1bmN0aW9uIGNyZWF0ZU92ZXJsYXlNYWNoaW5lKG9wdGlvbnMpIHtcbiAgdmFyIGhpZGVPdmVybGF5ID0gb3B0aW9ucy5oaWRlT3ZlcmxheSxcbiAgICBzaG93T3ZlcmxheSA9IG9wdGlvbnMuc2hvd092ZXJsYXk7XG4gIHJldHVybiBjcmVhdGVNYWNoaW5lKHtcbiAgICBpbml0aWFsOiBcImhpZGRlblwiLFxuICAgIGNvbnRleHQ6IHtcbiAgICAgIGxldmVsOiBcImVycm9yXCIsXG4gICAgICBtZXNzYWdlczogW10sXG4gICAgICBtZXNzYWdlU291cmNlOiBcImJ1aWxkXCJcbiAgICB9LFxuICAgIHN0YXRlczoge1xuICAgICAgaGlkZGVuOiB7XG4gICAgICAgIG9uOiB7XG4gICAgICAgICAgQlVJTERfRVJST1I6IHtcbiAgICAgICAgICAgIHRhcmdldDogXCJkaXNwbGF5QnVpbGRFcnJvclwiLFxuICAgICAgICAgICAgYWN0aW9uczogW1wic2V0TWVzc2FnZXNcIiwgXCJzaG93T3ZlcmxheVwiXVxuICAgICAgICAgIH0sXG4gICAgICAgICAgUlVOVElNRV9FUlJPUjoge1xuICAgICAgICAgICAgdGFyZ2V0OiBcImRpc3BsYXlSdW50aW1lRXJyb3JcIixcbiAgICAgICAgICAgIGFjdGlvbnM6IFtcInNldE1lc3NhZ2VzXCIsIFwic2hvd092ZXJsYXlcIl1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBkaXNwbGF5QnVpbGRFcnJvcjoge1xuICAgICAgICBvbjoge1xuICAgICAgICAgIERJU01JU1M6IHtcbiAgICAgICAgICAgIHRhcmdldDogXCJoaWRkZW5cIixcbiAgICAgICAgICAgIGFjdGlvbnM6IFtcImRpc21pc3NNZXNzYWdlc1wiLCBcImhpZGVPdmVybGF5XCJdXG4gICAgICAgICAgfSxcbiAgICAgICAgICBCVUlMRF9FUlJPUjoge1xuICAgICAgICAgICAgdGFyZ2V0OiBcImRpc3BsYXlCdWlsZEVycm9yXCIsXG4gICAgICAgICAgICBhY3Rpb25zOiBbXCJhcHBlbmRNZXNzYWdlc1wiLCBcInNob3dPdmVybGF5XCJdXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgZGlzcGxheVJ1bnRpbWVFcnJvcjoge1xuICAgICAgICBvbjoge1xuICAgICAgICAgIERJU01JU1M6IHtcbiAgICAgICAgICAgIHRhcmdldDogXCJoaWRkZW5cIixcbiAgICAgICAgICAgIGFjdGlvbnM6IFtcImRpc21pc3NNZXNzYWdlc1wiLCBcImhpZGVPdmVybGF5XCJdXG4gICAgICAgICAgfSxcbiAgICAgICAgICBSVU5USU1FX0VSUk9SOiB7XG4gICAgICAgICAgICB0YXJnZXQ6IFwiZGlzcGxheVJ1bnRpbWVFcnJvclwiLFxuICAgICAgICAgICAgYWN0aW9uczogW1wiYXBwZW5kTWVzc2FnZXNcIiwgXCJzaG93T3ZlcmxheVwiXVxuICAgICAgICAgIH0sXG4gICAgICAgICAgQlVJTERfRVJST1I6IHtcbiAgICAgICAgICAgIHRhcmdldDogXCJkaXNwbGF5QnVpbGRFcnJvclwiLFxuICAgICAgICAgICAgYWN0aW9uczogW1wic2V0TWVzc2FnZXNcIiwgXCJzaG93T3ZlcmxheVwiXVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfSwge1xuICAgIGFjdGlvbnM6IHtcbiAgICAgIGRpc21pc3NNZXNzYWdlczogZnVuY3Rpb24gZGlzbWlzc01lc3NhZ2VzKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIG1lc3NhZ2VzOiBbXSxcbiAgICAgICAgICBsZXZlbDogXCJlcnJvclwiLFxuICAgICAgICAgIG1lc3NhZ2VTb3VyY2U6IFwiYnVpbGRcIlxuICAgICAgICB9O1xuICAgICAgfSxcbiAgICAgIGFwcGVuZE1lc3NhZ2VzOiBmdW5jdGlvbiBhcHBlbmRNZXNzYWdlcyhjb250ZXh0LCBldmVudCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIG1lc3NhZ2VzOiBjb250ZXh0Lm1lc3NhZ2VzLmNvbmNhdChldmVudC5tZXNzYWdlcyksXG4gICAgICAgICAgbGV2ZWw6IGV2ZW50LmxldmVsIHx8IGNvbnRleHQubGV2ZWwsXG4gICAgICAgICAgbWVzc2FnZVNvdXJjZTogZXZlbnQudHlwZSA9PT0gXCJSVU5USU1FX0VSUk9SXCIgPyBcInJ1bnRpbWVcIiA6IFwiYnVpbGRcIlxuICAgICAgICB9O1xuICAgICAgfSxcbiAgICAgIHNldE1lc3NhZ2VzOiBmdW5jdGlvbiBzZXRNZXNzYWdlcyhjb250ZXh0LCBldmVudCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIG1lc3NhZ2VzOiBldmVudC5tZXNzYWdlcyxcbiAgICAgICAgICBsZXZlbDogZXZlbnQubGV2ZWwgfHwgY29udGV4dC5sZXZlbCxcbiAgICAgICAgICBtZXNzYWdlU291cmNlOiBldmVudC50eXBlID09PSBcIlJVTlRJTUVfRVJST1JcIiA/IFwicnVudGltZVwiIDogXCJidWlsZFwiXG4gICAgICAgIH07XG4gICAgICB9LFxuICAgICAgaGlkZU92ZXJsYXk6IGhpZGVPdmVybGF5LFxuICAgICAgc2hvd092ZXJsYXk6IHNob3dPdmVybGF5XG4gICAgfVxuICB9KTtcbn07XG5cbi8qKlxuICpcbiAqIEBwYXJhbSB7RXJyb3J9IGVycm9yXG4gKi9cbnZhciBwYXJzZUVycm9yVG9TdGFja3MgPSBmdW5jdGlvbiBwYXJzZUVycm9yVG9TdGFja3MoZXJyb3IpIHtcbiAgaWYgKCFlcnJvciB8fCAhKGVycm9yIGluc3RhbmNlb2YgRXJyb3IpKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwicGFyc2VFcnJvclRvU3RhY2tzIGV4cGVjdHMgRXJyb3Igb2JqZWN0XCIpO1xuICB9XG4gIGlmICh0eXBlb2YgZXJyb3Iuc3RhY2sgPT09IFwic3RyaW5nXCIpIHtcbiAgICByZXR1cm4gZXJyb3Iuc3RhY2suc3BsaXQoXCJcXG5cIikuZmlsdGVyKGZ1bmN0aW9uIChzdGFjaykge1xuICAgICAgcmV0dXJuIHN0YWNrICE9PSBcIkVycm9yOiBcIi5jb25jYXQoZXJyb3IubWVzc2FnZSk7XG4gICAgfSk7XG4gIH1cbn07XG5cbi8qKlxuICogQGNhbGxiYWNrIEVycm9yQ2FsbGJhY2tcbiAqIEBwYXJhbSB7RXJyb3JFdmVudH0gZXJyb3JcbiAqIEByZXR1cm5zIHt2b2lkfVxuICovXG5cbi8qKlxuICogQHBhcmFtIHtFcnJvckNhbGxiYWNrfSBjYWxsYmFja1xuICovXG52YXIgbGlzdGVuVG9SdW50aW1lRXJyb3IgPSBmdW5jdGlvbiBsaXN0ZW5Ub1J1bnRpbWVFcnJvcihjYWxsYmFjaykge1xuICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImVycm9yXCIsIGNhbGxiYWNrKTtcbiAgcmV0dXJuIGZ1bmN0aW9uIGNsZWFudXAoKSB7XG4gICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJlcnJvclwiLCBjYWxsYmFjayk7XG4gIH07XG59O1xuXG4vKipcbiAqIEBjYWxsYmFjayBVbmhhbmRsZWRSZWplY3Rpb25DYWxsYmFja1xuICogQHBhcmFtIHtQcm9taXNlUmVqZWN0aW9uRXZlbnR9IHJlamVjdGlvbkV2ZW50XG4gKiBAcmV0dXJucyB7dm9pZH1cbiAqL1xuXG4vKipcbiAqIEBwYXJhbSB7VW5oYW5kbGVkUmVqZWN0aW9uQ2FsbGJhY2t9IGNhbGxiYWNrXG4gKi9cbnZhciBsaXN0ZW5Ub1VuaGFuZGxlZFJlamVjdGlvbiA9IGZ1bmN0aW9uIGxpc3RlblRvVW5oYW5kbGVkUmVqZWN0aW9uKGNhbGxiYWNrKSB7XG4gIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwidW5oYW5kbGVkcmVqZWN0aW9uXCIsIGNhbGxiYWNrKTtcbiAgcmV0dXJuIGZ1bmN0aW9uIGNsZWFudXAoKSB7XG4gICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJ1bmhhbmRsZWRyZWplY3Rpb25cIiwgY2FsbGJhY2spO1xuICB9O1xufTtcblxuLy8gU3R5bGVzIGFyZSBpbnNwaXJlZCBieSBgcmVhY3QtZXJyb3Itb3ZlcmxheWBcblxudmFyIG1zZ1N0eWxlcyA9IHtcbiAgZXJyb3I6IHtcbiAgICBiYWNrZ3JvdW5kQ29sb3I6IFwicmdiYSgyMDYsIDE3LCAzOCwgMC4xKVwiLFxuICAgIGNvbG9yOiBcIiNmY2NmY2ZcIlxuICB9LFxuICB3YXJuaW5nOiB7XG4gICAgYmFja2dyb3VuZENvbG9yOiBcInJnYmEoMjUxLCAyNDUsIDE4MCwgMC4xKVwiLFxuICAgIGNvbG9yOiBcIiNmYmY1YjRcIlxuICB9XG59O1xudmFyIGlmcmFtZVN0eWxlID0ge1xuICBwb3NpdGlvbjogXCJmaXhlZFwiLFxuICB0b3A6IDAsXG4gIGxlZnQ6IDAsXG4gIHJpZ2h0OiAwLFxuICBib3R0b206IDAsXG4gIHdpZHRoOiBcIjEwMHZ3XCIsXG4gIGhlaWdodDogXCIxMDB2aFwiLFxuICBib3JkZXI6IFwibm9uZVwiLFxuICBcInotaW5kZXhcIjogOTk5OTk5OTk5OVxufTtcbnZhciBjb250YWluZXJTdHlsZSA9IHtcbiAgcG9zaXRpb246IFwiZml4ZWRcIixcbiAgYm94U2l6aW5nOiBcImJvcmRlci1ib3hcIixcbiAgbGVmdDogMCxcbiAgdG9wOiAwLFxuICByaWdodDogMCxcbiAgYm90dG9tOiAwLFxuICB3aWR0aDogXCIxMDB2d1wiLFxuICBoZWlnaHQ6IFwiMTAwdmhcIixcbiAgZm9udFNpemU6IFwibGFyZ2VcIixcbiAgcGFkZGluZzogXCIycmVtIDJyZW0gNHJlbSAycmVtXCIsXG4gIGxpbmVIZWlnaHQ6IFwiMS4yXCIsXG4gIHdoaXRlU3BhY2U6IFwicHJlLXdyYXBcIixcbiAgb3ZlcmZsb3c6IFwiYXV0b1wiLFxuICBiYWNrZ3JvdW5kQ29sb3I6IFwicmdiYSgwLCAwLCAwLCAwLjkpXCIsXG4gIGNvbG9yOiBcIndoaXRlXCJcbn07XG52YXIgaGVhZGVyU3R5bGUgPSB7XG4gIGNvbG9yOiBcIiNlODNiNDZcIixcbiAgZm9udFNpemU6IFwiMmVtXCIsXG4gIHdoaXRlU3BhY2U6IFwicHJlLXdyYXBcIixcbiAgZm9udEZhbWlseTogXCJzYW5zLXNlcmlmXCIsXG4gIG1hcmdpbjogXCIwIDJyZW0gMnJlbSAwXCIsXG4gIGZsZXg6IFwiMCAwIGF1dG9cIixcbiAgbWF4SGVpZ2h0OiBcIjUwJVwiLFxuICBvdmVyZmxvdzogXCJhdXRvXCJcbn07XG52YXIgZGlzbWlzc0J1dHRvblN0eWxlID0ge1xuICBjb2xvcjogXCIjZmZmZmZmXCIsXG4gIGxpbmVIZWlnaHQ6IFwiMXJlbVwiLFxuICBmb250U2l6ZTogXCIxLjVyZW1cIixcbiAgcGFkZGluZzogXCIxcmVtXCIsXG4gIGN1cnNvcjogXCJwb2ludGVyXCIsXG4gIHBvc2l0aW9uOiBcImFic29sdXRlXCIsXG4gIHJpZ2h0OiAwLFxuICB0b3A6IDAsXG4gIGJhY2tncm91bmRDb2xvcjogXCJ0cmFuc3BhcmVudFwiLFxuICBib3JkZXI6IFwibm9uZVwiXG59O1xudmFyIG1zZ1R5cGVTdHlsZSA9IHtcbiAgY29sb3I6IFwiI2U4M2I0NlwiLFxuICBmb250U2l6ZTogXCIxLjJlbVwiLFxuICBtYXJnaW5Cb3R0b206IFwiMXJlbVwiLFxuICBmb250RmFtaWx5OiBcInNhbnMtc2VyaWZcIlxufTtcbnZhciBtc2dUZXh0U3R5bGUgPSB7XG4gIGxpbmVIZWlnaHQ6IFwiMS41XCIsXG4gIGZvbnRTaXplOiBcIjFyZW1cIixcbiAgZm9udEZhbWlseTogXCJNZW5sbywgQ29uc29sYXMsIG1vbm9zcGFjZVwiXG59O1xuXG4vLyBBTlNJIEhUTUxcblxudmFyIGNvbG9ycyA9IHtcbiAgcmVzZXQ6IFtcInRyYW5zcGFyZW50XCIsIFwidHJhbnNwYXJlbnRcIl0sXG4gIGJsYWNrOiBcIjE4MTgxOFwiLFxuICByZWQ6IFwiRTM2MDQ5XCIsXG4gIGdyZWVuOiBcIkIzQ0I3NFwiLFxuICB5ZWxsb3c6IFwiRkZEMDgwXCIsXG4gIGJsdWU6IFwiN0NBRkMyXCIsXG4gIG1hZ2VudGE6IFwiN0ZBQ0NBXCIsXG4gIGN5YW46IFwiQzNDMkVGXCIsXG4gIGxpZ2h0Z3JleTogXCJFQkU3RTNcIixcbiAgZGFya2dyZXk6IFwiNkQ3ODkxXCJcbn07XG5hbnNpSFRNTC5zZXRDb2xvcnMoY29sb3JzKTtcblxuLyoqXG4gKiBAcGFyYW0ge3N0cmluZ30gdHlwZVxuICogQHBhcmFtIHtzdHJpbmcgIHwgeyBmaWxlPzogc3RyaW5nLCBtb2R1bGVOYW1lPzogc3RyaW5nLCBsb2M/OiBzdHJpbmcsIG1lc3NhZ2U/OiBzdHJpbmc7IHN0YWNrPzogc3RyaW5nW10gfX0gaXRlbVxuICogQHJldHVybnMge3sgaGVhZGVyOiBzdHJpbmcsIGJvZHk6IHN0cmluZyB9fVxuICovXG52YXIgZm9ybWF0UHJvYmxlbSA9IGZ1bmN0aW9uIGZvcm1hdFByb2JsZW0odHlwZSwgaXRlbSkge1xuICB2YXIgaGVhZGVyID0gdHlwZSA9PT0gXCJ3YXJuaW5nXCIgPyBcIldBUk5JTkdcIiA6IFwiRVJST1JcIjtcbiAgdmFyIGJvZHkgPSBcIlwiO1xuICBpZiAodHlwZW9mIGl0ZW0gPT09IFwic3RyaW5nXCIpIHtcbiAgICBib2R5ICs9IGl0ZW07XG4gIH0gZWxzZSB7XG4gICAgdmFyIGZpbGUgPSBpdGVtLmZpbGUgfHwgXCJcIjtcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tbmVzdGVkLXRlcm5hcnlcbiAgICB2YXIgbW9kdWxlTmFtZSA9IGl0ZW0ubW9kdWxlTmFtZSA/IGl0ZW0ubW9kdWxlTmFtZS5pbmRleE9mKFwiIVwiKSAhPT0gLTEgPyBcIlwiLmNvbmNhdChpdGVtLm1vZHVsZU5hbWUucmVwbGFjZSgvXihcXHN8XFxTKSohLywgXCJcIiksIFwiIChcIikuY29uY2F0KGl0ZW0ubW9kdWxlTmFtZSwgXCIpXCIpIDogXCJcIi5jb25jYXQoaXRlbS5tb2R1bGVOYW1lKSA6IFwiXCI7XG4gICAgdmFyIGxvYyA9IGl0ZW0ubG9jO1xuICAgIGhlYWRlciArPSBcIlwiLmNvbmNhdChtb2R1bGVOYW1lIHx8IGZpbGUgPyBcIiBpbiBcIi5jb25jYXQobW9kdWxlTmFtZSA/IFwiXCIuY29uY2F0KG1vZHVsZU5hbWUpLmNvbmNhdChmaWxlID8gXCIgKFwiLmNvbmNhdChmaWxlLCBcIilcIikgOiBcIlwiKSA6IGZpbGUpLmNvbmNhdChsb2MgPyBcIiBcIi5jb25jYXQobG9jKSA6IFwiXCIpIDogXCJcIik7XG4gICAgYm9keSArPSBpdGVtLm1lc3NhZ2UgfHwgXCJcIjtcbiAgfVxuICBpZiAoQXJyYXkuaXNBcnJheShpdGVtLnN0YWNrKSkge1xuICAgIGl0ZW0uc3RhY2suZm9yRWFjaChmdW5jdGlvbiAoc3RhY2spIHtcbiAgICAgIGlmICh0eXBlb2Ygc3RhY2sgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgYm9keSArPSBcIlxcclxcblwiLmNvbmNhdChzdGFjayk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbiAgcmV0dXJuIHtcbiAgICBoZWFkZXI6IGhlYWRlcixcbiAgICBib2R5OiBib2R5XG4gIH07XG59O1xuXG4vKipcbiAqIEB0eXBlZGVmIHtPYmplY3R9IENyZWF0ZU92ZXJsYXlPcHRpb25zXG4gKiBAcHJvcGVydHkge3N0cmluZyB8IG51bGx9IHRydXN0ZWRUeXBlc1BvbGljeU5hbWVcbiAqIEBwcm9wZXJ0eSB7Ym9vbGVhbiB8IChlcnJvcjogRXJyb3IpID0+IHZvaWR9IFtjYXRjaFJ1bnRpbWVFcnJvcl1cbiAqL1xuXG4vKipcbiAqXG4gKiBAcGFyYW0ge0NyZWF0ZU92ZXJsYXlPcHRpb25zfSBvcHRpb25zXG4gKi9cbnZhciBjcmVhdGVPdmVybGF5ID0gZnVuY3Rpb24gY3JlYXRlT3ZlcmxheShvcHRpb25zKSB7XG4gIC8qKiBAdHlwZSB7SFRNTElGcmFtZUVsZW1lbnQgfCBudWxsIHwgdW5kZWZpbmVkfSAqL1xuICB2YXIgaWZyYW1lQ29udGFpbmVyRWxlbWVudDtcbiAgLyoqIEB0eXBlIHtIVE1MRGl2RWxlbWVudCB8IG51bGwgfCB1bmRlZmluZWR9ICovXG4gIHZhciBjb250YWluZXJFbGVtZW50O1xuICAvKiogQHR5cGUge0hUTUxEaXZFbGVtZW50IHwgbnVsbCB8IHVuZGVmaW5lZH0gKi9cbiAgdmFyIGhlYWRlckVsZW1lbnQ7XG4gIC8qKiBAdHlwZSB7QXJyYXk8KGVsZW1lbnQ6IEhUTUxEaXZFbGVtZW50KSA9PiB2b2lkPn0gKi9cbiAgdmFyIG9uTG9hZFF1ZXVlID0gW107XG4gIC8qKiBAdHlwZSB7VHJ1c3RlZFR5cGVQb2xpY3kgfCB1bmRlZmluZWR9ICovXG4gIHZhciBvdmVybGF5VHJ1c3RlZFR5cGVzUG9saWN5O1xuXG4gIC8qKlxuICAgKlxuICAgKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbGVtZW50XG4gICAqIEBwYXJhbSB7Q1NTU3R5bGVEZWNsYXJhdGlvbn0gc3R5bGVcbiAgICovXG4gIGZ1bmN0aW9uIGFwcGx5U3R5bGUoZWxlbWVudCwgc3R5bGUpIHtcbiAgICBPYmplY3Qua2V5cyhzdHlsZSkuZm9yRWFjaChmdW5jdGlvbiAocHJvcCkge1xuICAgICAgZWxlbWVudC5zdHlsZVtwcm9wXSA9IHN0eWxlW3Byb3BdO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7c3RyaW5nIHwgbnVsbH0gdHJ1c3RlZFR5cGVzUG9saWN5TmFtZVxuICAgKi9cbiAgZnVuY3Rpb24gY3JlYXRlQ29udGFpbmVyKHRydXN0ZWRUeXBlc1BvbGljeU5hbWUpIHtcbiAgICAvLyBFbmFibGUgVHJ1c3RlZCBUeXBlcyBpZiB0aGV5IGFyZSBhdmFpbGFibGUgaW4gdGhlIGN1cnJlbnQgYnJvd3Nlci5cbiAgICBpZiAod2luZG93LnRydXN0ZWRUeXBlcykge1xuICAgICAgb3ZlcmxheVRydXN0ZWRUeXBlc1BvbGljeSA9IHdpbmRvdy50cnVzdGVkVHlwZXMuY3JlYXRlUG9saWN5KHRydXN0ZWRUeXBlc1BvbGljeU5hbWUgfHwgXCJ3ZWJwYWNrLWRldi1zZXJ2ZXIjb3ZlcmxheVwiLCB7XG4gICAgICAgIGNyZWF0ZUhUTUw6IGZ1bmN0aW9uIGNyZWF0ZUhUTUwodmFsdWUpIHtcbiAgICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgICBpZnJhbWVDb250YWluZXJFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlmcmFtZVwiKTtcbiAgICBpZnJhbWVDb250YWluZXJFbGVtZW50LmlkID0gXCJ3ZWJwYWNrLWRldi1zZXJ2ZXItY2xpZW50LW92ZXJsYXlcIjtcbiAgICBpZnJhbWVDb250YWluZXJFbGVtZW50LnNyYyA9IFwiYWJvdXQ6YmxhbmtcIjtcbiAgICBhcHBseVN0eWxlKGlmcmFtZUNvbnRhaW5lckVsZW1lbnQsIGlmcmFtZVN0eWxlKTtcbiAgICBpZnJhbWVDb250YWluZXJFbGVtZW50Lm9ubG9hZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciBjb250ZW50RWxlbWVudCA9IC8qKiBAdHlwZSB7RG9jdW1lbnR9ICovXG4gICAgICAoLyoqIEB0eXBlIHtIVE1MSUZyYW1lRWxlbWVudH0gKi9cbiAgICAgIGlmcmFtZUNvbnRhaW5lckVsZW1lbnQuY29udGVudERvY3VtZW50KS5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgY29udGFpbmVyRWxlbWVudCA9IC8qKiBAdHlwZSB7RG9jdW1lbnR9ICovXG4gICAgICAoLyoqIEB0eXBlIHtIVE1MSUZyYW1lRWxlbWVudH0gKi9cbiAgICAgIGlmcmFtZUNvbnRhaW5lckVsZW1lbnQuY29udGVudERvY3VtZW50KS5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgY29udGVudEVsZW1lbnQuaWQgPSBcIndlYnBhY2stZGV2LXNlcnZlci1jbGllbnQtb3ZlcmxheS1kaXZcIjtcbiAgICAgIGFwcGx5U3R5bGUoY29udGVudEVsZW1lbnQsIGNvbnRhaW5lclN0eWxlKTtcbiAgICAgIGhlYWRlckVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgaGVhZGVyRWxlbWVudC5pbm5lclRleHQgPSBcIkNvbXBpbGVkIHdpdGggcHJvYmxlbXM6XCI7XG4gICAgICBhcHBseVN0eWxlKGhlYWRlckVsZW1lbnQsIGhlYWRlclN0eWxlKTtcbiAgICAgIHZhciBjbG9zZUJ1dHRvbkVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICAgICAgYXBwbHlTdHlsZShjbG9zZUJ1dHRvbkVsZW1lbnQsIGRpc21pc3NCdXR0b25TdHlsZSk7XG4gICAgICBjbG9zZUJ1dHRvbkVsZW1lbnQuaW5uZXJUZXh0ID0gXCLDl1wiO1xuICAgICAgY2xvc2VCdXR0b25FbGVtZW50LmFyaWFMYWJlbCA9IFwiRGlzbWlzc1wiO1xuICAgICAgY2xvc2VCdXR0b25FbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11c2UtYmVmb3JlLWRlZmluZVxuICAgICAgICBvdmVybGF5U2VydmljZS5zZW5kKHtcbiAgICAgICAgICB0eXBlOiBcIkRJU01JU1NcIlxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgICAgY29udGVudEVsZW1lbnQuYXBwZW5kQ2hpbGQoaGVhZGVyRWxlbWVudCk7XG4gICAgICBjb250ZW50RWxlbWVudC5hcHBlbmRDaGlsZChjbG9zZUJ1dHRvbkVsZW1lbnQpO1xuICAgICAgY29udGVudEVsZW1lbnQuYXBwZW5kQ2hpbGQoY29udGFpbmVyRWxlbWVudCk7XG5cbiAgICAgIC8qKiBAdHlwZSB7RG9jdW1lbnR9ICovXG4gICAgICAoLyoqIEB0eXBlIHtIVE1MSUZyYW1lRWxlbWVudH0gKi9cbiAgICAgIGlmcmFtZUNvbnRhaW5lckVsZW1lbnQuY29udGVudERvY3VtZW50KS5ib2R5LmFwcGVuZENoaWxkKGNvbnRlbnRFbGVtZW50KTtcbiAgICAgIG9uTG9hZFF1ZXVlLmZvckVhY2goZnVuY3Rpb24gKG9uTG9hZCkge1xuICAgICAgICBvbkxvYWQoLyoqIEB0eXBlIHtIVE1MRGl2RWxlbWVudH0gKi9jb250ZW50RWxlbWVudCk7XG4gICAgICB9KTtcbiAgICAgIG9uTG9hZFF1ZXVlID0gW107XG5cbiAgICAgIC8qKiBAdHlwZSB7SFRNTElGcmFtZUVsZW1lbnR9ICovXG4gICAgICBpZnJhbWVDb250YWluZXJFbGVtZW50Lm9ubG9hZCA9IG51bGw7XG4gICAgfTtcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGlmcmFtZUNvbnRhaW5lckVsZW1lbnQpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7KGVsZW1lbnQ6IEhUTUxEaXZFbGVtZW50KSA9PiB2b2lkfSBjYWxsYmFja1xuICAgKiBAcGFyYW0ge3N0cmluZyB8IG51bGx9IHRydXN0ZWRUeXBlc1BvbGljeU5hbWVcbiAgICovXG4gIGZ1bmN0aW9uIGVuc3VyZU92ZXJsYXlFeGlzdHMoY2FsbGJhY2ssIHRydXN0ZWRUeXBlc1BvbGljeU5hbWUpIHtcbiAgICBpZiAoY29udGFpbmVyRWxlbWVudCkge1xuICAgICAgY29udGFpbmVyRWxlbWVudC5pbm5lckhUTUwgPSBvdmVybGF5VHJ1c3RlZFR5cGVzUG9saWN5ID8gb3ZlcmxheVRydXN0ZWRUeXBlc1BvbGljeS5jcmVhdGVIVE1MKFwiXCIpIDogXCJcIjtcbiAgICAgIC8vIEV2ZXJ5dGhpbmcgaXMgcmVhZHksIGNhbGwgdGhlIGNhbGxiYWNrIHJpZ2h0IGF3YXkuXG4gICAgICBjYWxsYmFjayhjb250YWluZXJFbGVtZW50KTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgb25Mb2FkUXVldWUucHVzaChjYWxsYmFjayk7XG4gICAgaWYgKGlmcmFtZUNvbnRhaW5lckVsZW1lbnQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY3JlYXRlQ29udGFpbmVyKHRydXN0ZWRUeXBlc1BvbGljeU5hbWUpO1xuICB9XG5cbiAgLy8gU3VjY2Vzc2Z1bCBjb21waWxhdGlvbi5cbiAgZnVuY3Rpb24gaGlkZSgpIHtcbiAgICBpZiAoIWlmcmFtZUNvbnRhaW5lckVsZW1lbnQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyBDbGVhbiB1cCBhbmQgcmVzZXQgaW50ZXJuYWwgc3RhdGUuXG4gICAgZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZChpZnJhbWVDb250YWluZXJFbGVtZW50KTtcbiAgICBpZnJhbWVDb250YWluZXJFbGVtZW50ID0gbnVsbDtcbiAgICBjb250YWluZXJFbGVtZW50ID0gbnVsbDtcbiAgfVxuXG4gIC8vIENvbXBpbGF0aW9uIHdpdGggZXJyb3JzIChlLmcuIHN5bnRheCBlcnJvciBvciBtaXNzaW5nIG1vZHVsZXMpLlxuICAvKipcbiAgICogQHBhcmFtIHtzdHJpbmd9IHR5cGVcbiAgICogQHBhcmFtIHtBcnJheTxzdHJpbmcgIHwgeyBtb2R1bGVJZGVudGlmaWVyPzogc3RyaW5nLCBtb2R1bGVOYW1lPzogc3RyaW5nLCBsb2M/OiBzdHJpbmcsIG1lc3NhZ2U/OiBzdHJpbmcgfT59IG1lc3NhZ2VzXG4gICAqIEBwYXJhbSB7c3RyaW5nIHwgbnVsbH0gdHJ1c3RlZFR5cGVzUG9saWN5TmFtZVxuICAgKiBAcGFyYW0geydidWlsZCcgfCAncnVudGltZSd9IG1lc3NhZ2VTb3VyY2VcbiAgICovXG4gIGZ1bmN0aW9uIHNob3codHlwZSwgbWVzc2FnZXMsIHRydXN0ZWRUeXBlc1BvbGljeU5hbWUsIG1lc3NhZ2VTb3VyY2UpIHtcbiAgICBlbnN1cmVPdmVybGF5RXhpc3RzKGZ1bmN0aW9uICgpIHtcbiAgICAgIGhlYWRlckVsZW1lbnQuaW5uZXJUZXh0ID0gbWVzc2FnZVNvdXJjZSA9PT0gXCJydW50aW1lXCIgPyBcIlVuY2F1Z2h0IHJ1bnRpbWUgZXJyb3JzOlwiIDogXCJDb21waWxlZCB3aXRoIHByb2JsZW1zOlwiO1xuICAgICAgbWVzc2FnZXMuZm9yRWFjaChmdW5jdGlvbiAobWVzc2FnZSkge1xuICAgICAgICB2YXIgZW50cnlFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgdmFyIG1zZ1N0eWxlID0gdHlwZSA9PT0gXCJ3YXJuaW5nXCIgPyBtc2dTdHlsZXMud2FybmluZyA6IG1zZ1N0eWxlcy5lcnJvcjtcbiAgICAgICAgYXBwbHlTdHlsZShlbnRyeUVsZW1lbnQsIF9vYmplY3RTcHJlYWQoX29iamVjdFNwcmVhZCh7fSwgbXNnU3R5bGUpLCB7fSwge1xuICAgICAgICAgIHBhZGRpbmc6IFwiMXJlbSAxcmVtIDEuNXJlbSAxcmVtXCJcbiAgICAgICAgfSkpO1xuICAgICAgICB2YXIgdHlwZUVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICB2YXIgX2Zvcm1hdFByb2JsZW0gPSBmb3JtYXRQcm9ibGVtKHR5cGUsIG1lc3NhZ2UpLFxuICAgICAgICAgIGhlYWRlciA9IF9mb3JtYXRQcm9ibGVtLmhlYWRlcixcbiAgICAgICAgICBib2R5ID0gX2Zvcm1hdFByb2JsZW0uYm9keTtcbiAgICAgICAgdHlwZUVsZW1lbnQuaW5uZXJUZXh0ID0gaGVhZGVyO1xuICAgICAgICBhcHBseVN0eWxlKHR5cGVFbGVtZW50LCBtc2dUeXBlU3R5bGUpO1xuICAgICAgICBpZiAobWVzc2FnZS5tb2R1bGVJZGVudGlmaWVyKSB7XG4gICAgICAgICAgYXBwbHlTdHlsZSh0eXBlRWxlbWVudCwge1xuICAgICAgICAgICAgY3Vyc29yOiBcInBvaW50ZXJcIlxuICAgICAgICAgIH0pO1xuICAgICAgICAgIC8vIGVsZW1lbnQuZGF0YXNldCBub3Qgc3VwcG9ydGVkIGluIElFXG4gICAgICAgICAgdHlwZUVsZW1lbnQuc2V0QXR0cmlidXRlKFwiZGF0YS1jYW4tb3BlblwiLCB0cnVlKTtcbiAgICAgICAgICB0eXBlRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgZmV0Y2goXCIvd2VicGFjay1kZXYtc2VydmVyL29wZW4tZWRpdG9yP2ZpbGVOYW1lPVwiLmNvbmNhdChtZXNzYWdlLm1vZHVsZUlkZW50aWZpZXIpKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIE1ha2UgaXQgbG9vayBzaW1pbGFyIHRvIG91ciB0ZXJtaW5hbC5cbiAgICAgICAgdmFyIHRleHQgPSBhbnNpSFRNTChlbmNvZGUoYm9keSkpO1xuICAgICAgICB2YXIgbWVzc2FnZVRleHROb2RlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgYXBwbHlTdHlsZShtZXNzYWdlVGV4dE5vZGUsIG1zZ1RleHRTdHlsZSk7XG4gICAgICAgIG1lc3NhZ2VUZXh0Tm9kZS5pbm5lckhUTUwgPSBvdmVybGF5VHJ1c3RlZFR5cGVzUG9saWN5ID8gb3ZlcmxheVRydXN0ZWRUeXBlc1BvbGljeS5jcmVhdGVIVE1MKHRleHQpIDogdGV4dDtcbiAgICAgICAgZW50cnlFbGVtZW50LmFwcGVuZENoaWxkKHR5cGVFbGVtZW50KTtcbiAgICAgICAgZW50cnlFbGVtZW50LmFwcGVuZENoaWxkKG1lc3NhZ2VUZXh0Tm9kZSk7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtIVE1MRGl2RWxlbWVudH0gKi9cbiAgICAgICAgY29udGFpbmVyRWxlbWVudC5hcHBlbmRDaGlsZChlbnRyeUVsZW1lbnQpO1xuICAgICAgfSk7XG4gICAgfSwgdHJ1c3RlZFR5cGVzUG9saWN5TmFtZSk7XG4gIH1cbiAgdmFyIG92ZXJsYXlTZXJ2aWNlID0gY3JlYXRlT3ZlcmxheU1hY2hpbmUoe1xuICAgIHNob3dPdmVybGF5OiBmdW5jdGlvbiBzaG93T3ZlcmxheShfcmVmMykge1xuICAgICAgdmFyIF9yZWYzJGxldmVsID0gX3JlZjMubGV2ZWwsXG4gICAgICAgIGxldmVsID0gX3JlZjMkbGV2ZWwgPT09IHZvaWQgMCA/IFwiZXJyb3JcIiA6IF9yZWYzJGxldmVsLFxuICAgICAgICBtZXNzYWdlcyA9IF9yZWYzLm1lc3NhZ2VzLFxuICAgICAgICBtZXNzYWdlU291cmNlID0gX3JlZjMubWVzc2FnZVNvdXJjZTtcbiAgICAgIHJldHVybiBzaG93KGxldmVsLCBtZXNzYWdlcywgb3B0aW9ucy50cnVzdGVkVHlwZXNQb2xpY3lOYW1lLCBtZXNzYWdlU291cmNlKTtcbiAgICB9LFxuICAgIGhpZGVPdmVybGF5OiBoaWRlXG4gIH0pO1xuICBpZiAob3B0aW9ucy5jYXRjaFJ1bnRpbWVFcnJvcikge1xuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7RXJyb3IgfCB1bmRlZmluZWR9IGVycm9yXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGZhbGxiYWNrTWVzc2FnZVxuICAgICAqL1xuICAgIHZhciBoYW5kbGVFcnJvciA9IGZ1bmN0aW9uIGhhbmRsZUVycm9yKGVycm9yLCBmYWxsYmFja01lc3NhZ2UpIHtcbiAgICAgIHZhciBlcnJvck9iamVjdCA9IGVycm9yIGluc3RhbmNlb2YgRXJyb3IgPyBlcnJvciA6IG5ldyBFcnJvcihlcnJvciB8fCBmYWxsYmFja01lc3NhZ2UpO1xuICAgICAgdmFyIHNob3VsZERpc3BsYXkgPSB0eXBlb2Ygb3B0aW9ucy5jYXRjaFJ1bnRpbWVFcnJvciA9PT0gXCJmdW5jdGlvblwiID8gb3B0aW9ucy5jYXRjaFJ1bnRpbWVFcnJvcihlcnJvck9iamVjdCkgOiB0cnVlO1xuICAgICAgaWYgKHNob3VsZERpc3BsYXkpIHtcbiAgICAgICAgb3ZlcmxheVNlcnZpY2Uuc2VuZCh7XG4gICAgICAgICAgdHlwZTogXCJSVU5USU1FX0VSUk9SXCIsXG4gICAgICAgICAgbWVzc2FnZXM6IFt7XG4gICAgICAgICAgICBtZXNzYWdlOiBlcnJvck9iamVjdC5tZXNzYWdlLFxuICAgICAgICAgICAgc3RhY2s6IHBhcnNlRXJyb3JUb1N0YWNrcyhlcnJvck9iamVjdClcbiAgICAgICAgICB9XVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9O1xuICAgIGxpc3RlblRvUnVudGltZUVycm9yKGZ1bmN0aW9uIChlcnJvckV2ZW50KSB7XG4gICAgICAvLyBlcnJvciBwcm9wZXJ0eSBtYXkgYmUgZW1wdHkgaW4gb2xkZXIgYnJvd3NlciBsaWtlIElFXG4gICAgICB2YXIgZXJyb3IgPSBlcnJvckV2ZW50LmVycm9yLFxuICAgICAgICBtZXNzYWdlID0gZXJyb3JFdmVudC5tZXNzYWdlO1xuICAgICAgaWYgKCFlcnJvciAmJiAhbWVzc2FnZSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIC8vIGlmIGVycm9yIHN0YWNrIGluZGljYXRlcyBhIFJlYWN0IGVycm9yIGJvdW5kYXJ5IGNhdWdodCB0aGUgZXJyb3IsIGRvIG5vdCBzaG93IG92ZXJsYXkuXG4gICAgICBpZiAoZXJyb3IgJiYgZXJyb3Iuc3RhY2sgJiYgZXJyb3Iuc3RhY2suaW5jbHVkZXMoXCJpbnZva2VHdWFyZGVkQ2FsbGJhY2tEZXZcIikpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgaGFuZGxlRXJyb3IoZXJyb3IsIG1lc3NhZ2UpO1xuICAgIH0pO1xuICAgIGxpc3RlblRvVW5oYW5kbGVkUmVqZWN0aW9uKGZ1bmN0aW9uIChwcm9taXNlUmVqZWN0aW9uRXZlbnQpIHtcbiAgICAgIHZhciByZWFzb24gPSBwcm9taXNlUmVqZWN0aW9uRXZlbnQucmVhc29uO1xuICAgICAgaGFuZGxlRXJyb3IocmVhc29uLCBcIlVua25vd24gcHJvbWlzZSByZWplY3Rpb24gcmVhc29uXCIpO1xuICAgIH0pO1xuICB9XG4gIHJldHVybiBvdmVybGF5U2VydmljZTtcbn07XG5leHBvcnQgeyBmb3JtYXRQcm9ibGVtLCBjcmVhdGVPdmVybGF5IH07IiwiZnVuY3Rpb24gX3R5cGVvZihvKSB7IFwiQGJhYmVsL2hlbHBlcnMgLSB0eXBlb2ZcIjsgcmV0dXJuIF90eXBlb2YgPSBcImZ1bmN0aW9uXCIgPT0gdHlwZW9mIFN5bWJvbCAmJiBcInN5bWJvbFwiID09IHR5cGVvZiBTeW1ib2wuaXRlcmF0b3IgPyBmdW5jdGlvbiAobykgeyByZXR1cm4gdHlwZW9mIG87IH0gOiBmdW5jdGlvbiAobykgeyByZXR1cm4gbyAmJiBcImZ1bmN0aW9uXCIgPT0gdHlwZW9mIFN5bWJvbCAmJiBvLmNvbnN0cnVjdG9yID09PSBTeW1ib2wgJiYgbyAhPT0gU3ltYm9sLnByb3RvdHlwZSA/IFwic3ltYm9sXCIgOiB0eXBlb2YgbzsgfSwgX3R5cGVvZihvKTsgfVxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGEsIG4pIHsgaWYgKCEoYSBpbnN0YW5jZW9mIG4pKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpOyB9XG5mdW5jdGlvbiBfZGVmaW5lUHJvcGVydGllcyhlLCByKSB7IGZvciAodmFyIHQgPSAwOyB0IDwgci5sZW5ndGg7IHQrKykgeyB2YXIgbyA9IHJbdF07IG8uZW51bWVyYWJsZSA9IG8uZW51bWVyYWJsZSB8fCAhMSwgby5jb25maWd1cmFibGUgPSAhMCwgXCJ2YWx1ZVwiIGluIG8gJiYgKG8ud3JpdGFibGUgPSAhMCksIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShlLCBfdG9Qcm9wZXJ0eUtleShvLmtleSksIG8pOyB9IH1cbmZ1bmN0aW9uIF9jcmVhdGVDbGFzcyhlLCByLCB0KSB7IHJldHVybiByICYmIF9kZWZpbmVQcm9wZXJ0aWVzKGUucHJvdG90eXBlLCByKSwgdCAmJiBfZGVmaW5lUHJvcGVydGllcyhlLCB0KSwgT2JqZWN0LmRlZmluZVByb3BlcnR5KGUsIFwicHJvdG90eXBlXCIsIHsgd3JpdGFibGU6ICExIH0pLCBlOyB9XG5mdW5jdGlvbiBfdG9Qcm9wZXJ0eUtleSh0KSB7IHZhciBpID0gX3RvUHJpbWl0aXZlKHQsIFwic3RyaW5nXCIpOyByZXR1cm4gXCJzeW1ib2xcIiA9PSBfdHlwZW9mKGkpID8gaSA6IGkgKyBcIlwiOyB9XG5mdW5jdGlvbiBfdG9QcmltaXRpdmUodCwgcikgeyBpZiAoXCJvYmplY3RcIiAhPSBfdHlwZW9mKHQpIHx8ICF0KSByZXR1cm4gdDsgdmFyIGUgPSB0W1N5bWJvbC50b1ByaW1pdGl2ZV07IGlmICh2b2lkIDAgIT09IGUpIHsgdmFyIGkgPSBlLmNhbGwodCwgciB8fCBcImRlZmF1bHRcIik7IGlmIChcIm9iamVjdFwiICE9IF90eXBlb2YoaSkpIHJldHVybiBpOyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQEB0b1ByaW1pdGl2ZSBtdXN0IHJldHVybiBhIHByaW1pdGl2ZSB2YWx1ZS5cIik7IH0gcmV0dXJuIChcInN0cmluZ1wiID09PSByID8gU3RyaW5nIDogTnVtYmVyKSh0KTsgfVxuZnVuY3Rpb24gX2NhbGxTdXBlcih0LCBvLCBlKSB7IHJldHVybiBvID0gX2dldFByb3RvdHlwZU9mKG8pLCBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybih0LCBfaXNOYXRpdmVSZWZsZWN0Q29uc3RydWN0KCkgPyBSZWZsZWN0LmNvbnN0cnVjdChvLCBlIHx8IFtdLCBfZ2V0UHJvdG90eXBlT2YodCkuY29uc3RydWN0b3IpIDogby5hcHBseSh0LCBlKSk7IH1cbmZ1bmN0aW9uIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHQsIGUpIHsgaWYgKGUgJiYgKFwib2JqZWN0XCIgPT0gX3R5cGVvZihlKSB8fCBcImZ1bmN0aW9uXCIgPT0gdHlwZW9mIGUpKSByZXR1cm4gZTsgaWYgKHZvaWQgMCAhPT0gZSkgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkRlcml2ZWQgY29uc3RydWN0b3JzIG1heSBvbmx5IHJldHVybiBvYmplY3Qgb3IgdW5kZWZpbmVkXCIpOyByZXR1cm4gX2Fzc2VydFRoaXNJbml0aWFsaXplZCh0KTsgfVxuZnVuY3Rpb24gX2Fzc2VydFRoaXNJbml0aWFsaXplZChlKSB7IGlmICh2b2lkIDAgPT09IGUpIHRocm93IG5ldyBSZWZlcmVuY2VFcnJvcihcInRoaXMgaGFzbid0IGJlZW4gaW5pdGlhbGlzZWQgLSBzdXBlcigpIGhhc24ndCBiZWVuIGNhbGxlZFwiKTsgcmV0dXJuIGU7IH1cbmZ1bmN0aW9uIF9pbmhlcml0cyh0LCBlKSB7IGlmIChcImZ1bmN0aW9uXCIgIT0gdHlwZW9mIGUgJiYgbnVsbCAhPT0gZSkgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN1cGVyIGV4cHJlc3Npb24gbXVzdCBlaXRoZXIgYmUgbnVsbCBvciBhIGZ1bmN0aW9uXCIpOyB0LnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoZSAmJiBlLnByb3RvdHlwZSwgeyBjb25zdHJ1Y3RvcjogeyB2YWx1ZTogdCwgd3JpdGFibGU6ICEwLCBjb25maWd1cmFibGU6ICEwIH0gfSksIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0LCBcInByb3RvdHlwZVwiLCB7IHdyaXRhYmxlOiAhMSB9KSwgZSAmJiBfc2V0UHJvdG90eXBlT2YodCwgZSk7IH1cbmZ1bmN0aW9uIF93cmFwTmF0aXZlU3VwZXIodCkgeyB2YXIgciA9IFwiZnVuY3Rpb25cIiA9PSB0eXBlb2YgTWFwID8gbmV3IE1hcCgpIDogdm9pZCAwOyByZXR1cm4gX3dyYXBOYXRpdmVTdXBlciA9IGZ1bmN0aW9uIF93cmFwTmF0aXZlU3VwZXIodCkgeyBpZiAobnVsbCA9PT0gdCB8fCAhX2lzTmF0aXZlRnVuY3Rpb24odCkpIHJldHVybiB0OyBpZiAoXCJmdW5jdGlvblwiICE9IHR5cGVvZiB0KSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3VwZXIgZXhwcmVzc2lvbiBtdXN0IGVpdGhlciBiZSBudWxsIG9yIGEgZnVuY3Rpb25cIik7IGlmICh2b2lkIDAgIT09IHIpIHsgaWYgKHIuaGFzKHQpKSByZXR1cm4gci5nZXQodCk7IHIuc2V0KHQsIFdyYXBwZXIpOyB9IGZ1bmN0aW9uIFdyYXBwZXIoKSB7IHJldHVybiBfY29uc3RydWN0KHQsIGFyZ3VtZW50cywgX2dldFByb3RvdHlwZU9mKHRoaXMpLmNvbnN0cnVjdG9yKTsgfSByZXR1cm4gV3JhcHBlci5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHQucHJvdG90eXBlLCB7IGNvbnN0cnVjdG9yOiB7IHZhbHVlOiBXcmFwcGVyLCBlbnVtZXJhYmxlOiAhMSwgd3JpdGFibGU6ICEwLCBjb25maWd1cmFibGU6ICEwIH0gfSksIF9zZXRQcm90b3R5cGVPZihXcmFwcGVyLCB0KTsgfSwgX3dyYXBOYXRpdmVTdXBlcih0KTsgfVxuZnVuY3Rpb24gX2NvbnN0cnVjdCh0LCBlLCByKSB7IGlmIChfaXNOYXRpdmVSZWZsZWN0Q29uc3RydWN0KCkpIHJldHVybiBSZWZsZWN0LmNvbnN0cnVjdC5hcHBseShudWxsLCBhcmd1bWVudHMpOyB2YXIgbyA9IFtudWxsXTsgby5wdXNoLmFwcGx5KG8sIGUpOyB2YXIgcCA9IG5ldyAodC5iaW5kLmFwcGx5KHQsIG8pKSgpOyByZXR1cm4gciAmJiBfc2V0UHJvdG90eXBlT2YocCwgci5wcm90b3R5cGUpLCBwOyB9XG5mdW5jdGlvbiBfaXNOYXRpdmVSZWZsZWN0Q29uc3RydWN0KCkgeyB0cnkgeyB2YXIgdCA9ICFCb29sZWFuLnByb3RvdHlwZS52YWx1ZU9mLmNhbGwoUmVmbGVjdC5jb25zdHJ1Y3QoQm9vbGVhbiwgW10sIGZ1bmN0aW9uICgpIHt9KSk7IH0gY2F0Y2ggKHQpIHt9IHJldHVybiAoX2lzTmF0aXZlUmVmbGVjdENvbnN0cnVjdCA9IGZ1bmN0aW9uIF9pc05hdGl2ZVJlZmxlY3RDb25zdHJ1Y3QoKSB7IHJldHVybiAhIXQ7IH0pKCk7IH1cbmZ1bmN0aW9uIF9pc05hdGl2ZUZ1bmN0aW9uKHQpIHsgdHJ5IHsgcmV0dXJuIC0xICE9PSBGdW5jdGlvbi50b1N0cmluZy5jYWxsKHQpLmluZGV4T2YoXCJbbmF0aXZlIGNvZGVdXCIpOyB9IGNhdGNoIChuKSB7IHJldHVybiBcImZ1bmN0aW9uXCIgPT0gdHlwZW9mIHQ7IH0gfVxuZnVuY3Rpb24gX3NldFByb3RvdHlwZU9mKHQsIGUpIHsgcmV0dXJuIF9zZXRQcm90b3R5cGVPZiA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiA/IE9iamVjdC5zZXRQcm90b3R5cGVPZi5iaW5kKCkgOiBmdW5jdGlvbiAodCwgZSkgeyByZXR1cm4gdC5fX3Byb3RvX18gPSBlLCB0OyB9LCBfc2V0UHJvdG90eXBlT2YodCwgZSk7IH1cbmZ1bmN0aW9uIF9nZXRQcm90b3R5cGVPZih0KSB7IHJldHVybiBfZ2V0UHJvdG90eXBlT2YgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgPyBPYmplY3QuZ2V0UHJvdG90eXBlT2YuYmluZCgpIDogZnVuY3Rpb24gKHQpIHsgcmV0dXJuIHQuX19wcm90b19fIHx8IE9iamVjdC5nZXRQcm90b3R5cGVPZih0KTsgfSwgX2dldFByb3RvdHlwZU9mKHQpOyB9XG5mdW5jdGlvbiBfY2xhc3NQcml2YXRlTWV0aG9kSW5pdFNwZWMoZSwgYSkgeyBfY2hlY2tQcml2YXRlUmVkZWNsYXJhdGlvbihlLCBhKSwgYS5hZGQoZSk7IH1cbmZ1bmN0aW9uIF9jaGVja1ByaXZhdGVSZWRlY2xhcmF0aW9uKGUsIHQpIHsgaWYgKHQuaGFzKGUpKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGluaXRpYWxpemUgdGhlIHNhbWUgcHJpdmF0ZSBlbGVtZW50cyB0d2ljZSBvbiBhbiBvYmplY3RcIik7IH1cbmZ1bmN0aW9uIF9hc3NlcnRDbGFzc0JyYW5kKGUsIHQsIG4pIHsgaWYgKFwiZnVuY3Rpb25cIiA9PSB0eXBlb2YgZSA/IGUgPT09IHQgOiBlLmhhcyh0KSkgcmV0dXJuIGFyZ3VtZW50cy5sZW5ndGggPCAzID8gdCA6IG47IHRocm93IG5ldyBUeXBlRXJyb3IoXCJQcml2YXRlIGVsZW1lbnQgaXMgbm90IHByZXNlbnQgb24gdGhpcyBvYmplY3RcIik7IH1cbmV4cG9ydCBmdW5jdGlvbiBpc1Byb2dyZXNzU3VwcG9ydGVkKCkge1xuICByZXR1cm4gXCJjdXN0b21FbGVtZW50c1wiIGluIHNlbGYgJiYgISFIVE1MRWxlbWVudC5wcm90b3R5cGUuYXR0YWNoU2hhZG93O1xufVxuZXhwb3J0IGZ1bmN0aW9uIGRlZmluZVByb2dyZXNzRWxlbWVudCgpIHtcbiAgdmFyIF9XZWJwYWNrRGV2U2VydmVyUHJvZ3Jlc3M7XG4gIGlmIChjdXN0b21FbGVtZW50cy5nZXQoXCJ3ZHMtcHJvZ3Jlc3NcIikpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgdmFyIF9XZWJwYWNrRGV2U2VydmVyUHJvZ3Jlc3NfYnJhbmQgPSAvKiNfX1BVUkVfXyovbmV3IFdlYWtTZXQoKTtcbiAgdmFyIFdlYnBhY2tEZXZTZXJ2ZXJQcm9ncmVzcyA9IC8qI19fUFVSRV9fKi9mdW5jdGlvbiAoX0hUTUxFbGVtZW50KSB7XG4gICAgZnVuY3Rpb24gV2VicGFja0RldlNlcnZlclByb2dyZXNzKCkge1xuICAgICAgdmFyIF90aGlzO1xuICAgICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIFdlYnBhY2tEZXZTZXJ2ZXJQcm9ncmVzcyk7XG4gICAgICBfdGhpcyA9IF9jYWxsU3VwZXIodGhpcywgV2VicGFja0RldlNlcnZlclByb2dyZXNzKTtcbiAgICAgIF9jbGFzc1ByaXZhdGVNZXRob2RJbml0U3BlYyhfdGhpcywgX1dlYnBhY2tEZXZTZXJ2ZXJQcm9ncmVzc19icmFuZCk7XG4gICAgICBfdGhpcy5hdHRhY2hTaGFkb3coe1xuICAgICAgICBtb2RlOiBcIm9wZW5cIlxuICAgICAgfSk7XG4gICAgICBfdGhpcy5tYXhEYXNoT2Zmc2V0ID0gLTIxOS45OTA3ODM2OTE0MDYyNTtcbiAgICAgIF90aGlzLmFuaW1hdGlvblRpbWVyID0gbnVsbDtcbiAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG4gICAgX2luaGVyaXRzKFdlYnBhY2tEZXZTZXJ2ZXJQcm9ncmVzcywgX0hUTUxFbGVtZW50KTtcbiAgICByZXR1cm4gX2NyZWF0ZUNsYXNzKFdlYnBhY2tEZXZTZXJ2ZXJQcm9ncmVzcywgW3tcbiAgICAgIGtleTogXCJjb25uZWN0ZWRDYWxsYmFja1wiLFxuICAgICAgdmFsdWU6IGZ1bmN0aW9uIGNvbm5lY3RlZENhbGxiYWNrKCkge1xuICAgICAgICBfYXNzZXJ0Q2xhc3NCcmFuZChfV2VicGFja0RldlNlcnZlclByb2dyZXNzX2JyYW5kLCB0aGlzLCBfcmVzZXQpLmNhbGwodGhpcyk7XG4gICAgICB9XG4gICAgfSwge1xuICAgICAga2V5OiBcImF0dHJpYnV0ZUNoYW5nZWRDYWxsYmFja1wiLFxuICAgICAgdmFsdWU6IGZ1bmN0aW9uIGF0dHJpYnV0ZUNoYW5nZWRDYWxsYmFjayhuYW1lLCBvbGRWYWx1ZSwgbmV3VmFsdWUpIHtcbiAgICAgICAgaWYgKG5hbWUgPT09IFwicHJvZ3Jlc3NcIikge1xuICAgICAgICAgIF9hc3NlcnRDbGFzc0JyYW5kKF9XZWJwYWNrRGV2U2VydmVyUHJvZ3Jlc3NfYnJhbmQsIHRoaXMsIF91cGRhdGUpLmNhbGwodGhpcywgTnVtYmVyKG5ld1ZhbHVlKSk7XG4gICAgICAgIH0gZWxzZSBpZiAobmFtZSA9PT0gXCJ0eXBlXCIpIHtcbiAgICAgICAgICBfYXNzZXJ0Q2xhc3NCcmFuZChfV2VicGFja0RldlNlcnZlclByb2dyZXNzX2JyYW5kLCB0aGlzLCBfcmVzZXQpLmNhbGwodGhpcyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XSwgW3tcbiAgICAgIGtleTogXCJvYnNlcnZlZEF0dHJpYnV0ZXNcIixcbiAgICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgICByZXR1cm4gW1wicHJvZ3Jlc3NcIiwgXCJ0eXBlXCJdO1xuICAgICAgfVxuICAgIH1dKTtcbiAgfSgvKiNfX1BVUkVfXyovX3dyYXBOYXRpdmVTdXBlcihIVE1MRWxlbWVudCkpO1xuICBfV2VicGFja0RldlNlcnZlclByb2dyZXNzID0gV2VicGFja0RldlNlcnZlclByb2dyZXNzO1xuICBmdW5jdGlvbiBfcmVzZXQoKSB7XG4gICAgdmFyIF90aGlzJGdldEF0dHJpYnV0ZSwgX051bWJlcjtcbiAgICBjbGVhclRpbWVvdXQodGhpcy5hbmltYXRpb25UaW1lcik7XG4gICAgdGhpcy5hbmltYXRpb25UaW1lciA9IG51bGw7XG4gICAgdmFyIHR5cGVBdHRyID0gKF90aGlzJGdldEF0dHJpYnV0ZSA9IHRoaXMuZ2V0QXR0cmlidXRlKFwidHlwZVwiKSkgPT09IG51bGwgfHwgX3RoaXMkZ2V0QXR0cmlidXRlID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfdGhpcyRnZXRBdHRyaWJ1dGUudG9Mb3dlckNhc2UoKTtcbiAgICB0aGlzLnR5cGUgPSB0eXBlQXR0ciA9PT0gXCJjaXJjdWxhclwiID8gXCJjaXJjdWxhclwiIDogXCJsaW5lYXJcIjtcbiAgICB2YXIgaW5uZXJIVE1MID0gdGhpcy50eXBlID09PSBcImNpcmN1bGFyXCIgPyBfY2lyY3VsYXJUZW1wbGF0ZS5jYWxsKF9XZWJwYWNrRGV2U2VydmVyUHJvZ3Jlc3MpIDogX2xpbmVhclRlbXBsYXRlLmNhbGwoX1dlYnBhY2tEZXZTZXJ2ZXJQcm9ncmVzcyk7XG4gICAgdGhpcy5zaGFkb3dSb290LmlubmVySFRNTCA9IGlubmVySFRNTDtcbiAgICB0aGlzLmluaXRpYWxQcm9ncmVzcyA9IChfTnVtYmVyID0gTnVtYmVyKHRoaXMuZ2V0QXR0cmlidXRlKFwicHJvZ3Jlc3NcIikpKSAhPT0gbnVsbCAmJiBfTnVtYmVyICE9PSB2b2lkIDAgPyBfTnVtYmVyIDogMDtcbiAgICBfYXNzZXJ0Q2xhc3NCcmFuZChfV2VicGFja0RldlNlcnZlclByb2dyZXNzX2JyYW5kLCB0aGlzLCBfdXBkYXRlKS5jYWxsKHRoaXMsIHRoaXMuaW5pdGlhbFByb2dyZXNzKTtcbiAgfVxuICBmdW5jdGlvbiBfY2lyY3VsYXJUZW1wbGF0ZSgpIHtcbiAgICByZXR1cm4gXCJcXG4gICAgICAgIDxzdHlsZT5cXG4gICAgICAgIDpob3N0IHtcXG4gICAgICAgICAgICB3aWR0aDogMjAwcHg7XFxuICAgICAgICAgICAgaGVpZ2h0OiAyMDBweDtcXG4gICAgICAgICAgICBwb3NpdGlvbjogZml4ZWQ7XFxuICAgICAgICAgICAgcmlnaHQ6IDUlO1xcbiAgICAgICAgICAgIHRvcDogNSU7XFxuICAgICAgICAgICAgdHJhbnNpdGlvbjogb3BhY2l0eSAuMjVzIGVhc2UtaW4tb3V0O1xcbiAgICAgICAgICAgIHotaW5kZXg6IDIxNDc0ODM2NDU7XFxuICAgICAgICB9XFxuXFxuICAgICAgICBjaXJjbGUge1xcbiAgICAgICAgICAgIGZpbGw6ICMyODJkMzU7XFxuICAgICAgICB9XFxuXFxuICAgICAgICBwYXRoIHtcXG4gICAgICAgICAgICBmaWxsOiByZ2JhKDAsIDAsIDAsIDApO1xcbiAgICAgICAgICAgIHN0cm9rZTogcmdiKDE4NiwgMjIzLCAxNzIpO1xcbiAgICAgICAgICAgIHN0cm9rZS1kYXNoYXJyYXk6IDIxOS45OTA3ODM2OTE0MDYyNTtcXG4gICAgICAgICAgICBzdHJva2UtZGFzaG9mZnNldDogLTIxOS45OTA3ODM2OTE0MDYyNTtcXG4gICAgICAgICAgICBzdHJva2Utd2lkdGg6IDEwO1xcbiAgICAgICAgICAgIHRyYW5zZm9ybTogcm90YXRlKDkwZGVnKSB0cmFuc2xhdGUoMHB4LCAtODBweCk7XFxuICAgICAgICB9XFxuXFxuICAgICAgICB0ZXh0IHtcXG4gICAgICAgICAgICBmb250LWZhbWlseTogJ09wZW4gU2FucycsIHNhbnMtc2VyaWY7XFxuICAgICAgICAgICAgZm9udC1zaXplOiAxOHB4O1xcbiAgICAgICAgICAgIGZpbGw6ICNmZmZmZmY7XFxuICAgICAgICAgICAgZG9taW5hbnQtYmFzZWxpbmU6IG1pZGRsZTtcXG4gICAgICAgICAgICB0ZXh0LWFuY2hvcjogbWlkZGxlO1xcbiAgICAgICAgfVxcblxcbiAgICAgICAgdHNwYW4jcGVyY2VudC1zdXBlciB7XFxuICAgICAgICAgICAgZmlsbDogI2JkYzNjNztcXG4gICAgICAgICAgICBmb250LXNpemU6IDAuNDVlbTtcXG4gICAgICAgICAgICBiYXNlbGluZS1zaGlmdDogMTAlO1xcbiAgICAgICAgfVxcblxcbiAgICAgICAgQGtleWZyYW1lcyBmYWRlIHtcXG4gICAgICAgICAgICAwJSB7IG9wYWNpdHk6IDE7IHRyYW5zZm9ybTogc2NhbGUoMSk7IH1cXG4gICAgICAgICAgICAxMDAlIHsgb3BhY2l0eTogMDsgdHJhbnNmb3JtOiBzY2FsZSgwKTsgfVxcbiAgICAgICAgfVxcblxcbiAgICAgICAgLmRpc2FwcGVhciB7XFxuICAgICAgICAgICAgYW5pbWF0aW9uOiBmYWRlIDAuM3M7XFxuICAgICAgICAgICAgYW5pbWF0aW9uLWZpbGwtbW9kZTogZm9yd2FyZHM7XFxuICAgICAgICAgICAgYW5pbWF0aW9uLWRlbGF5OiAwLjVzO1xcbiAgICAgICAgfVxcblxcbiAgICAgICAgLmhpZGRlbiB7XFxuICAgICAgICAgICAgZGlzcGxheTogbm9uZTtcXG4gICAgICAgIH1cXG4gICAgICAgIDwvc3R5bGU+XFxuICAgICAgICA8c3ZnIGlkPVxcXCJwcm9ncmVzc1xcXCIgY2xhc3M9XFxcImhpZGRlbiBub3NlbGVjdFxcXCIgdmlld0JveD1cXFwiMCAwIDgwIDgwXFxcIj5cXG4gICAgICAgIDxjaXJjbGUgY3g9XFxcIjUwJVxcXCIgY3k9XFxcIjUwJVxcXCIgcj1cXFwiMzVcXFwiPjwvY2lyY2xlPlxcbiAgICAgICAgPHBhdGggZD1cXFwiTTUsNDBhMzUsMzUgMCAxLDAgNzAsMGEzNSwzNSAwIDEsMCAtNzAsMFxcXCI+PC9wYXRoPlxcbiAgICAgICAgPHRleHQgeD1cXFwiNTAlXFxcIiB5PVxcXCI1MSVcXFwiPlxcbiAgICAgICAgICAgIDx0c3BhbiBpZD1cXFwicGVyY2VudC12YWx1ZVxcXCI+MDwvdHNwYW4+XFxuICAgICAgICAgICAgPHRzcGFuIGlkPVxcXCJwZXJjZW50LXN1cGVyXFxcIj4lPC90c3Bhbj5cXG4gICAgICAgIDwvdGV4dD5cXG4gICAgICAgIDwvc3ZnPlxcbiAgICAgIFwiO1xuICB9XG4gIGZ1bmN0aW9uIF9saW5lYXJUZW1wbGF0ZSgpIHtcbiAgICByZXR1cm4gXCJcXG4gICAgICAgIDxzdHlsZT5cXG4gICAgICAgIDpob3N0IHtcXG4gICAgICAgICAgICBwb3NpdGlvbjogZml4ZWQ7XFxuICAgICAgICAgICAgdG9wOiAwO1xcbiAgICAgICAgICAgIGxlZnQ6IDA7XFxuICAgICAgICAgICAgaGVpZ2h0OiA0cHg7XFxuICAgICAgICAgICAgd2lkdGg6IDEwMHZ3O1xcbiAgICAgICAgICAgIHotaW5kZXg6IDIxNDc0ODM2NDU7XFxuICAgICAgICB9XFxuXFxuICAgICAgICAjYmFyIHtcXG4gICAgICAgICAgICB3aWR0aDogMCU7XFxuICAgICAgICAgICAgaGVpZ2h0OiA0cHg7XFxuICAgICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDE4NiwgMjIzLCAxNzIpO1xcbiAgICAgICAgfVxcblxcbiAgICAgICAgQGtleWZyYW1lcyBmYWRlIHtcXG4gICAgICAgICAgICAwJSB7IG9wYWNpdHk6IDE7IH1cXG4gICAgICAgICAgICAxMDAlIHsgb3BhY2l0eTogMDsgfVxcbiAgICAgICAgfVxcblxcbiAgICAgICAgLmRpc2FwcGVhciB7XFxuICAgICAgICAgICAgYW5pbWF0aW9uOiBmYWRlIDAuM3M7XFxuICAgICAgICAgICAgYW5pbWF0aW9uLWZpbGwtbW9kZTogZm9yd2FyZHM7XFxuICAgICAgICAgICAgYW5pbWF0aW9uLWRlbGF5OiAwLjVzO1xcbiAgICAgICAgfVxcblxcbiAgICAgICAgLmhpZGRlbiB7XFxuICAgICAgICAgICAgZGlzcGxheTogbm9uZTtcXG4gICAgICAgIH1cXG4gICAgICAgIDwvc3R5bGU+XFxuICAgICAgICA8ZGl2IGlkPVxcXCJwcm9ncmVzc1xcXCI+PC9kaXY+XFxuICAgICAgICBcIjtcbiAgfVxuICBmdW5jdGlvbiBfdXBkYXRlKHBlcmNlbnQpIHtcbiAgICB2YXIgZWxlbWVudCA9IHRoaXMuc2hhZG93Um9vdC5xdWVyeVNlbGVjdG9yKFwiI3Byb2dyZXNzXCIpO1xuICAgIGlmICh0aGlzLnR5cGUgPT09IFwiY2lyY3VsYXJcIikge1xuICAgICAgdmFyIHBhdGggPSB0aGlzLnNoYWRvd1Jvb3QucXVlcnlTZWxlY3RvcihcInBhdGhcIik7XG4gICAgICB2YXIgdmFsdWUgPSB0aGlzLnNoYWRvd1Jvb3QucXVlcnlTZWxlY3RvcihcIiNwZXJjZW50LXZhbHVlXCIpO1xuICAgICAgdmFyIG9mZnNldCA9ICgxMDAgLSBwZXJjZW50KSAvIDEwMCAqIHRoaXMubWF4RGFzaE9mZnNldDtcbiAgICAgIHBhdGguc3R5bGUuc3Ryb2tlRGFzaG9mZnNldCA9IG9mZnNldDtcbiAgICAgIHZhbHVlLnRleHRDb250ZW50ID0gcGVyY2VudDtcbiAgICB9IGVsc2Uge1xuICAgICAgZWxlbWVudC5zdHlsZS53aWR0aCA9IFwiXCIuY29uY2F0KHBlcmNlbnQsIFwiJVwiKTtcbiAgICB9XG4gICAgaWYgKHBlcmNlbnQgPj0gMTAwKSB7XG4gICAgICBfYXNzZXJ0Q2xhc3NCcmFuZChfV2VicGFja0RldlNlcnZlclByb2dyZXNzX2JyYW5kLCB0aGlzLCBfaGlkZSkuY2FsbCh0aGlzKTtcbiAgICB9IGVsc2UgaWYgKHBlcmNlbnQgPiAwKSB7XG4gICAgICBfYXNzZXJ0Q2xhc3NCcmFuZChfV2VicGFja0RldlNlcnZlclByb2dyZXNzX2JyYW5kLCB0aGlzLCBfc2hvdykuY2FsbCh0aGlzKTtcbiAgICB9XG4gIH1cbiAgZnVuY3Rpb24gX3Nob3coKSB7XG4gICAgdmFyIGVsZW1lbnQgPSB0aGlzLnNoYWRvd1Jvb3QucXVlcnlTZWxlY3RvcihcIiNwcm9ncmVzc1wiKTtcbiAgICBlbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoXCJoaWRkZW5cIik7XG4gIH1cbiAgZnVuY3Rpb24gX2hpZGUoKSB7XG4gICAgdmFyIF90aGlzMiA9IHRoaXM7XG4gICAgdmFyIGVsZW1lbnQgPSB0aGlzLnNoYWRvd1Jvb3QucXVlcnlTZWxlY3RvcihcIiNwcm9ncmVzc1wiKTtcbiAgICBpZiAodGhpcy50eXBlID09PSBcImNpcmN1bGFyXCIpIHtcbiAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LmFkZChcImRpc2FwcGVhclwiKTtcbiAgICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImFuaW1hdGlvbmVuZFwiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LmFkZChcImhpZGRlblwiKTtcbiAgICAgICAgX2Fzc2VydENsYXNzQnJhbmQoX1dlYnBhY2tEZXZTZXJ2ZXJQcm9ncmVzc19icmFuZCwgX3RoaXMyLCBfdXBkYXRlKS5jYWxsKF90aGlzMiwgMCk7XG4gICAgICB9LCB7XG4gICAgICAgIG9uY2U6IHRydWVcbiAgICAgIH0pO1xuICAgIH0gZWxzZSBpZiAodGhpcy50eXBlID09PSBcImxpbmVhclwiKSB7XG4gICAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJkaXNhcHBlYXJcIik7XG4gICAgICB0aGlzLmFuaW1hdGlvblRpbWVyID0gc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShcImRpc2FwcGVhclwiKTtcbiAgICAgICAgZWxlbWVudC5jbGFzc0xpc3QuYWRkKFwiaGlkZGVuXCIpO1xuICAgICAgICBlbGVtZW50LnN0eWxlLndpZHRoID0gXCIwJVwiO1xuICAgICAgICBfdGhpczIuYW5pbWF0aW9uVGltZXIgPSBudWxsO1xuICAgICAgfSwgODAwKTtcbiAgICB9XG4gIH1cbiAgY3VzdG9tRWxlbWVudHMuZGVmaW5lKFwid2RzLXByb2dyZXNzXCIsIFdlYnBhY2tEZXZTZXJ2ZXJQcm9ncmVzcyk7XG59IiwiLyogZ2xvYmFsIF9fd2VicGFja19kZXZfc2VydmVyX2NsaWVudF9fICovXG5cbmltcG9ydCBXZWJTb2NrZXRDbGllbnQgZnJvbSBcIi4vY2xpZW50cy9XZWJTb2NrZXRDbGllbnQuanNcIjtcbmltcG9ydCB7IGxvZyB9IGZyb20gXCIuL3V0aWxzL2xvZy5qc1wiO1xuXG4vLyB0aGlzIFdlYnNvY2tldENsaWVudCBpcyBoZXJlIGFzIGEgZGVmYXVsdCBmYWxsYmFjaywgaW4gY2FzZSB0aGUgY2xpZW50IGlzIG5vdCBpbmplY3RlZFxuLyogZXNsaW50LWRpc2FibGUgY2FtZWxjYXNlICovXG52YXIgQ2xpZW50ID1cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1uZXN0ZWQtdGVybmFyeVxudHlwZW9mIF9fd2VicGFja19kZXZfc2VydmVyX2NsaWVudF9fICE9PSBcInVuZGVmaW5lZFwiID8gdHlwZW9mIF9fd2VicGFja19kZXZfc2VydmVyX2NsaWVudF9fLmRlZmF1bHQgIT09IFwidW5kZWZpbmVkXCIgPyBfX3dlYnBhY2tfZGV2X3NlcnZlcl9jbGllbnRfXy5kZWZhdWx0IDogX193ZWJwYWNrX2Rldl9zZXJ2ZXJfY2xpZW50X18gOiBXZWJTb2NrZXRDbGllbnQ7XG4vKiBlc2xpbnQtZW5hYmxlIGNhbWVsY2FzZSAqL1xuXG52YXIgcmV0cmllcyA9IDA7XG52YXIgbWF4UmV0cmllcyA9IDEwO1xuXG4vLyBJbml0aWFsaXplZCBjbGllbnQgaXMgZXhwb3J0ZWQgc28gZXh0ZXJuYWwgY29uc3VtZXJzIGNhbiB1dGlsaXplIHRoZSBzYW1lIGluc3RhbmNlXG4vLyBJdCBpcyBtdXRhYmxlIHRvIGVuZm9yY2Ugc2luZ2xldG9uXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgaW1wb3J0L25vLW11dGFibGUtZXhwb3J0c1xuZXhwb3J0IHZhciBjbGllbnQgPSBudWxsO1xudmFyIHRpbWVvdXQ7XG5cbi8qKlxuICogQHBhcmFtIHtzdHJpbmd9IHVybFxuICogQHBhcmFtIHt7IFtoYW5kbGVyOiBzdHJpbmddOiAoZGF0YT86IGFueSwgcGFyYW1zPzogYW55KSA9PiBhbnkgfX0gaGFuZGxlcnNcbiAqIEBwYXJhbSB7bnVtYmVyfSBbcmVjb25uZWN0XVxuICovXG52YXIgc29ja2V0ID0gZnVuY3Rpb24gaW5pdFNvY2tldCh1cmwsIGhhbmRsZXJzLCByZWNvbm5lY3QpIHtcbiAgY2xpZW50ID0gbmV3IENsaWVudCh1cmwpO1xuICBjbGllbnQub25PcGVuKGZ1bmN0aW9uICgpIHtcbiAgICByZXRyaWVzID0gMDtcbiAgICBpZiAodGltZW91dCkge1xuICAgICAgY2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xuICAgIH1cbiAgICBpZiAodHlwZW9mIHJlY29ubmVjdCAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgbWF4UmV0cmllcyA9IHJlY29ubmVjdDtcbiAgICB9XG4gIH0pO1xuICBjbGllbnQub25DbG9zZShmdW5jdGlvbiAoKSB7XG4gICAgaWYgKHJldHJpZXMgPT09IDApIHtcbiAgICAgIGhhbmRsZXJzLmNsb3NlKCk7XG4gICAgfVxuXG4gICAgLy8gVHJ5IHRvIHJlY29ubmVjdC5cbiAgICBjbGllbnQgPSBudWxsO1xuXG4gICAgLy8gQWZ0ZXIgMTAgcmV0cmllcyBzdG9wIHRyeWluZywgdG8gcHJldmVudCBsb2dzcGFtLlxuICAgIGlmIChyZXRyaWVzIDwgbWF4UmV0cmllcykge1xuICAgICAgLy8gRXhwb25lbnRpYWxseSBpbmNyZWFzZSB0aW1lb3V0IHRvIHJlY29ubmVjdC5cbiAgICAgIC8vIFJlc3BlY3RmdWxseSBjb3BpZWQgZnJvbSB0aGUgcGFja2FnZSBgZ290YC5cbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1yZXN0cmljdGVkLXByb3BlcnRpZXNcbiAgICAgIHZhciByZXRyeUluTXMgPSAxMDAwICogTWF0aC5wb3coMiwgcmV0cmllcykgKyBNYXRoLnJhbmRvbSgpICogMTAwO1xuICAgICAgcmV0cmllcyArPSAxO1xuICAgICAgbG9nLmluZm8oXCJUcnlpbmcgdG8gcmVjb25uZWN0Li4uXCIpO1xuICAgICAgdGltZW91dCA9IHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICBzb2NrZXQodXJsLCBoYW5kbGVycywgcmVjb25uZWN0KTtcbiAgICAgIH0sIHJldHJ5SW5Ncyk7XG4gICAgfVxuICB9KTtcbiAgY2xpZW50Lm9uTWVzc2FnZShcbiAgLyoqXG4gICAqIEBwYXJhbSB7YW55fSBkYXRhXG4gICAqL1xuICBmdW5jdGlvbiAoZGF0YSkge1xuICAgIHZhciBtZXNzYWdlID0gSlNPTi5wYXJzZShkYXRhKTtcbiAgICBpZiAoaGFuZGxlcnNbbWVzc2FnZS50eXBlXSkge1xuICAgICAgaGFuZGxlcnNbbWVzc2FnZS50eXBlXShtZXNzYWdlLmRhdGEsIG1lc3NhZ2UucGFyYW1zKTtcbiAgICB9XG4gIH0pO1xufTtcbmV4cG9ydCBkZWZhdWx0IHNvY2tldDsiLCJpbXBvcnQgbG9nZ2VyIGZyb20gXCIuLi9tb2R1bGVzL2xvZ2dlci9pbmRleC5qc1wiO1xudmFyIG5hbWUgPSBcIndlYnBhY2stZGV2LXNlcnZlclwiO1xuLy8gZGVmYXVsdCBsZXZlbCBpcyBzZXQgb24gdGhlIGNsaWVudCBzaWRlLCBzbyBpdCBkb2VzIG5vdCBuZWVkXG4vLyB0byBiZSBzZXQgYnkgdGhlIENMSSBvciBBUElcbnZhciBkZWZhdWx0TGV2ZWwgPSBcImluZm9cIjtcblxuLy8gb3B0aW9ucyBuZXcgb3B0aW9ucywgbWVyZ2Ugd2l0aCBvbGQgb3B0aW9uc1xuLyoqXG4gKiBAcGFyYW0ge2ZhbHNlIHwgdHJ1ZSB8IFwibm9uZVwiIHwgXCJlcnJvclwiIHwgXCJ3YXJuXCIgfCBcImluZm9cIiB8IFwibG9nXCIgfCBcInZlcmJvc2VcIn0gbGV2ZWxcbiAqIEByZXR1cm5zIHt2b2lkfVxuICovXG5mdW5jdGlvbiBzZXRMb2dMZXZlbChsZXZlbCkge1xuICBsb2dnZXIuY29uZmlndXJlRGVmYXVsdExvZ2dlcih7XG4gICAgbGV2ZWw6IGxldmVsXG4gIH0pO1xufVxuc2V0TG9nTGV2ZWwoZGVmYXVsdExldmVsKTtcbnZhciBsb2cgPSBsb2dnZXIuZ2V0TG9nZ2VyKG5hbWUpO1xuZXhwb3J0IHsgbG9nLCBzZXRMb2dMZXZlbCB9OyIsIi8qIGdsb2JhbCBfX3Jlc291cmNlUXVlcnkgV29ya2VyR2xvYmFsU2NvcGUgKi9cblxuLy8gU2VuZCBtZXNzYWdlcyB0byB0aGUgb3V0c2lkZSwgc28gcGx1Z2lucyBjYW4gY29uc3VtZSBpdC5cbi8qKlxuICogQHBhcmFtIHtzdHJpbmd9IHR5cGVcbiAqIEBwYXJhbSB7YW55fSBbZGF0YV1cbiAqL1xuZnVuY3Rpb24gc2VuZE1zZyh0eXBlLCBkYXRhKSB7XG4gIGlmICh0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiAmJiAodHlwZW9mIFdvcmtlckdsb2JhbFNjb3BlID09PSBcInVuZGVmaW5lZFwiIHx8ICEoc2VsZiBpbnN0YW5jZW9mIFdvcmtlckdsb2JhbFNjb3BlKSkpIHtcbiAgICBzZWxmLnBvc3RNZXNzYWdlKHtcbiAgICAgIHR5cGU6IFwid2VicGFja1wiLmNvbmNhdCh0eXBlKSxcbiAgICAgIGRhdGE6IGRhdGFcbiAgICB9LCBcIipcIik7XG4gIH1cbn1cbmV4cG9ydCBkZWZhdWx0IHNlbmRNc2c7IiwiLypcblx0TUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcblx0QXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxuKi9cbi8qIGdsb2JhbHMgX193ZWJwYWNrX2hhc2hfXyAqL1xuaWYgKG1vZHVsZS5ob3QpIHtcblx0LyoqIEB0eXBlIHt1bmRlZmluZWR8c3RyaW5nfSAqL1xuXHR2YXIgbGFzdEhhc2g7XG5cdHZhciB1cFRvRGF0ZSA9IGZ1bmN0aW9uIHVwVG9EYXRlKCkge1xuXHRcdHJldHVybiAvKiogQHR5cGUge3N0cmluZ30gKi8gKGxhc3RIYXNoKS5pbmRleE9mKF9fd2VicGFja19oYXNoX18pID49IDA7XG5cdH07XG5cdHZhciBsb2cgPSByZXF1aXJlKFwiLi9sb2dcIik7XG5cdHZhciBjaGVjayA9IGZ1bmN0aW9uIGNoZWNrKCkge1xuXHRcdG1vZHVsZS5ob3Rcblx0XHRcdC5jaGVjayh0cnVlKVxuXHRcdFx0LnRoZW4oZnVuY3Rpb24gKHVwZGF0ZWRNb2R1bGVzKSB7XG5cdFx0XHRcdGlmICghdXBkYXRlZE1vZHVsZXMpIHtcblx0XHRcdFx0XHRsb2coXG5cdFx0XHRcdFx0XHRcIndhcm5pbmdcIixcblx0XHRcdFx0XHRcdFwiW0hNUl0gQ2Fubm90IGZpbmQgdXBkYXRlLiBcIiArXG5cdFx0XHRcdFx0XHRcdCh0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiXG5cdFx0XHRcdFx0XHRcdFx0PyBcIk5lZWQgdG8gZG8gYSBmdWxsIHJlbG9hZCFcIlxuXHRcdFx0XHRcdFx0XHRcdDogXCJQbGVhc2UgcmVsb2FkIG1hbnVhbGx5IVwiKVxuXHRcdFx0XHRcdCk7XG5cdFx0XHRcdFx0bG9nKFxuXHRcdFx0XHRcdFx0XCJ3YXJuaW5nXCIsXG5cdFx0XHRcdFx0XHRcIltITVJdIChQcm9iYWJseSBiZWNhdXNlIG9mIHJlc3RhcnRpbmcgdGhlIHdlYnBhY2stZGV2LXNlcnZlcilcIlxuXHRcdFx0XHRcdCk7XG5cdFx0XHRcdFx0aWYgKHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIpIHtcblx0XHRcdFx0XHRcdHdpbmRvdy5sb2NhdGlvbi5yZWxvYWQoKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0aWYgKCF1cFRvRGF0ZSgpKSB7XG5cdFx0XHRcdFx0Y2hlY2soKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHJlcXVpcmUoXCIuL2xvZy1hcHBseS1yZXN1bHRcIikodXBkYXRlZE1vZHVsZXMsIHVwZGF0ZWRNb2R1bGVzKTtcblxuXHRcdFx0XHRpZiAodXBUb0RhdGUoKSkge1xuXHRcdFx0XHRcdGxvZyhcImluZm9cIiwgXCJbSE1SXSBBcHAgaXMgdXAgdG8gZGF0ZS5cIik7XG5cdFx0XHRcdH1cblx0XHRcdH0pXG5cdFx0XHQuY2F0Y2goZnVuY3Rpb24gKGVycikge1xuXHRcdFx0XHR2YXIgc3RhdHVzID0gbW9kdWxlLmhvdC5zdGF0dXMoKTtcblx0XHRcdFx0aWYgKFtcImFib3J0XCIsIFwiZmFpbFwiXS5pbmRleE9mKHN0YXR1cykgPj0gMCkge1xuXHRcdFx0XHRcdGxvZyhcblx0XHRcdFx0XHRcdFwid2FybmluZ1wiLFxuXHRcdFx0XHRcdFx0XCJbSE1SXSBDYW5ub3QgYXBwbHkgdXBkYXRlLiBcIiArXG5cdFx0XHRcdFx0XHRcdCh0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiXG5cdFx0XHRcdFx0XHRcdFx0PyBcIk5lZWQgdG8gZG8gYSBmdWxsIHJlbG9hZCFcIlxuXHRcdFx0XHRcdFx0XHRcdDogXCJQbGVhc2UgcmVsb2FkIG1hbnVhbGx5IVwiKVxuXHRcdFx0XHRcdCk7XG5cdFx0XHRcdFx0bG9nKFwid2FybmluZ1wiLCBcIltITVJdIFwiICsgbG9nLmZvcm1hdEVycm9yKGVycikpO1xuXHRcdFx0XHRcdGlmICh0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiKSB7XG5cdFx0XHRcdFx0XHR3aW5kb3cubG9jYXRpb24ucmVsb2FkKCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdGxvZyhcIndhcm5pbmdcIiwgXCJbSE1SXSBVcGRhdGUgZmFpbGVkOiBcIiArIGxvZy5mb3JtYXRFcnJvcihlcnIpKTtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdH07XG5cdHZhciBob3RFbWl0dGVyID0gcmVxdWlyZShcIi4vZW1pdHRlclwiKTtcblx0aG90RW1pdHRlci5vbihcIndlYnBhY2tIb3RVcGRhdGVcIiwgZnVuY3Rpb24gKGN1cnJlbnRIYXNoKSB7XG5cdFx0bGFzdEhhc2ggPSBjdXJyZW50SGFzaDtcblx0XHRpZiAoIXVwVG9EYXRlKCkgJiYgbW9kdWxlLmhvdC5zdGF0dXMoKSA9PT0gXCJpZGxlXCIpIHtcblx0XHRcdGxvZyhcImluZm9cIiwgXCJbSE1SXSBDaGVja2luZyBmb3IgdXBkYXRlcyBvbiB0aGUgc2VydmVyLi4uXCIpO1xuXHRcdFx0Y2hlY2soKTtcblx0XHR9XG5cdH0pO1xuXHRsb2coXCJpbmZvXCIsIFwiW0hNUl0gV2FpdGluZyBmb3IgdXBkYXRlIHNpZ25hbCBmcm9tIFdEUy4uLlwiKTtcbn0gZWxzZSB7XG5cdHRocm93IG5ldyBFcnJvcihcIltITVJdIEhvdCBNb2R1bGUgUmVwbGFjZW1lbnQgaXMgZGlzYWJsZWQuXCIpO1xufVxuIiwidmFyIEV2ZW50RW1pdHRlciA9IHJlcXVpcmUoXCJldmVudHNcIik7XG5tb2R1bGUuZXhwb3J0cyA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiIsIi8qXG5cdE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG5cdEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiovXG5cbi8qKlxuICogQHBhcmFtIHsoc3RyaW5nIHwgbnVtYmVyKVtdfSB1cGRhdGVkTW9kdWxlcyB1cGRhdGVkIG1vZHVsZXNcbiAqIEBwYXJhbSB7KHN0cmluZyB8IG51bWJlcilbXSB8IG51bGx9IHJlbmV3ZWRNb2R1bGVzIHJlbmV3ZWQgbW9kdWxlc1xuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICh1cGRhdGVkTW9kdWxlcywgcmVuZXdlZE1vZHVsZXMpIHtcblx0dmFyIHVuYWNjZXB0ZWRNb2R1bGVzID0gdXBkYXRlZE1vZHVsZXMuZmlsdGVyKGZ1bmN0aW9uIChtb2R1bGVJZCkge1xuXHRcdHJldHVybiByZW5ld2VkTW9kdWxlcyAmJiByZW5ld2VkTW9kdWxlcy5pbmRleE9mKG1vZHVsZUlkKSA8IDA7XG5cdH0pO1xuXHR2YXIgbG9nID0gcmVxdWlyZShcIi4vbG9nXCIpO1xuXG5cdGlmICh1bmFjY2VwdGVkTW9kdWxlcy5sZW5ndGggPiAwKSB7XG5cdFx0bG9nKFxuXHRcdFx0XCJ3YXJuaW5nXCIsXG5cdFx0XHRcIltITVJdIFRoZSBmb2xsb3dpbmcgbW9kdWxlcyBjb3VsZG4ndCBiZSBob3QgdXBkYXRlZDogKFRoZXkgd291bGQgbmVlZCBhIGZ1bGwgcmVsb2FkISlcIlxuXHRcdCk7XG5cdFx0dW5hY2NlcHRlZE1vZHVsZXMuZm9yRWFjaChmdW5jdGlvbiAobW9kdWxlSWQpIHtcblx0XHRcdGxvZyhcIndhcm5pbmdcIiwgXCJbSE1SXSAgLSBcIiArIG1vZHVsZUlkKTtcblx0XHR9KTtcblx0fVxuXG5cdGlmICghcmVuZXdlZE1vZHVsZXMgfHwgcmVuZXdlZE1vZHVsZXMubGVuZ3RoID09PSAwKSB7XG5cdFx0bG9nKFwiaW5mb1wiLCBcIltITVJdIE5vdGhpbmcgaG90IHVwZGF0ZWQuXCIpO1xuXHR9IGVsc2Uge1xuXHRcdGxvZyhcImluZm9cIiwgXCJbSE1SXSBVcGRhdGVkIG1vZHVsZXM6XCIpO1xuXHRcdHJlbmV3ZWRNb2R1bGVzLmZvckVhY2goZnVuY3Rpb24gKG1vZHVsZUlkKSB7XG5cdFx0XHRpZiAodHlwZW9mIG1vZHVsZUlkID09PSBcInN0cmluZ1wiICYmIG1vZHVsZUlkLmluZGV4T2YoXCIhXCIpICE9PSAtMSkge1xuXHRcdFx0XHR2YXIgcGFydHMgPSBtb2R1bGVJZC5zcGxpdChcIiFcIik7XG5cdFx0XHRcdGxvZy5ncm91cENvbGxhcHNlZChcImluZm9cIiwgXCJbSE1SXSAgLSBcIiArIHBhcnRzLnBvcCgpKTtcblx0XHRcdFx0bG9nKFwiaW5mb1wiLCBcIltITVJdICAtIFwiICsgbW9kdWxlSWQpO1xuXHRcdFx0XHRsb2cuZ3JvdXBFbmQoXCJpbmZvXCIpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0bG9nKFwiaW5mb1wiLCBcIltITVJdICAtIFwiICsgbW9kdWxlSWQpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHRcdHZhciBudW1iZXJJZHMgPSByZW5ld2VkTW9kdWxlcy5ldmVyeShmdW5jdGlvbiAobW9kdWxlSWQpIHtcblx0XHRcdHJldHVybiB0eXBlb2YgbW9kdWxlSWQgPT09IFwibnVtYmVyXCI7XG5cdFx0fSk7XG5cdFx0aWYgKG51bWJlcklkcylcblx0XHRcdGxvZyhcblx0XHRcdFx0XCJpbmZvXCIsXG5cdFx0XHRcdCdbSE1SXSBDb25zaWRlciB1c2luZyB0aGUgb3B0aW1pemF0aW9uLm1vZHVsZUlkczogXCJuYW1lZFwiIGZvciBtb2R1bGUgbmFtZXMuJ1xuXHRcdFx0KTtcblx0fVxufTtcbiIsIi8qKiBAdHlwZWRlZiB7XCJpbmZvXCIgfCBcIndhcm5pbmdcIiB8IFwiZXJyb3JcIn0gTG9nTGV2ZWwgKi9cblxuLyoqIEB0eXBlIHtMb2dMZXZlbH0gKi9cbnZhciBsb2dMZXZlbCA9IFwiaW5mb1wiO1xuXG5mdW5jdGlvbiBkdW1teSgpIHt9XG5cbi8qKlxuICogQHBhcmFtIHtMb2dMZXZlbH0gbGV2ZWwgbG9nIGxldmVsXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gdHJ1ZSwgaWYgc2hvdWxkIGxvZ1xuICovXG5mdW5jdGlvbiBzaG91bGRMb2cobGV2ZWwpIHtcblx0dmFyIHNob3VsZExvZyA9XG5cdFx0KGxvZ0xldmVsID09PSBcImluZm9cIiAmJiBsZXZlbCA9PT0gXCJpbmZvXCIpIHx8XG5cdFx0KFtcImluZm9cIiwgXCJ3YXJuaW5nXCJdLmluZGV4T2YobG9nTGV2ZWwpID49IDAgJiYgbGV2ZWwgPT09IFwid2FybmluZ1wiKSB8fFxuXHRcdChbXCJpbmZvXCIsIFwid2FybmluZ1wiLCBcImVycm9yXCJdLmluZGV4T2YobG9nTGV2ZWwpID49IDAgJiYgbGV2ZWwgPT09IFwiZXJyb3JcIik7XG5cdHJldHVybiBzaG91bGRMb2c7XG59XG5cbi8qKlxuICogQHBhcmFtIHsobXNnPzogc3RyaW5nKSA9PiB2b2lkfSBsb2dGbiBsb2cgZnVuY3Rpb25cbiAqIEByZXR1cm5zIHsobGV2ZWw6IExvZ0xldmVsLCBtc2c/OiBzdHJpbmcpID0+IHZvaWR9IGZ1bmN0aW9uIHRoYXQgbG9ncyB3aGVuIGxvZyBsZXZlbCBpcyBzdWZmaWNpZW50XG4gKi9cbmZ1bmN0aW9uIGxvZ0dyb3VwKGxvZ0ZuKSB7XG5cdHJldHVybiBmdW5jdGlvbiAobGV2ZWwsIG1zZykge1xuXHRcdGlmIChzaG91bGRMb2cobGV2ZWwpKSB7XG5cdFx0XHRsb2dGbihtc2cpO1xuXHRcdH1cblx0fTtcbn1cblxuLyoqXG4gKiBAcGFyYW0ge0xvZ0xldmVsfSBsZXZlbCBsb2cgbGV2ZWxcbiAqIEBwYXJhbSB7c3RyaW5nfEVycm9yfSBtc2cgbWVzc2FnZVxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChsZXZlbCwgbXNnKSB7XG5cdGlmIChzaG91bGRMb2cobGV2ZWwpKSB7XG5cdFx0aWYgKGxldmVsID09PSBcImluZm9cIikge1xuXHRcdFx0Y29uc29sZS5sb2cobXNnKTtcblx0XHR9IGVsc2UgaWYgKGxldmVsID09PSBcIndhcm5pbmdcIikge1xuXHRcdFx0Y29uc29sZS53YXJuKG1zZyk7XG5cdFx0fSBlbHNlIGlmIChsZXZlbCA9PT0gXCJlcnJvclwiKSB7XG5cdFx0XHRjb25zb2xlLmVycm9yKG1zZyk7XG5cdFx0fVxuXHR9XG59O1xuXG4vKipcbiAqIEBwYXJhbSB7RXJyb3J9IGVyciBlcnJvclxuICogQHJldHVybnMge3N0cmluZ30gZm9ybWF0dGVkIGVycm9yXG4gKi9cbm1vZHVsZS5leHBvcnRzLmZvcm1hdEVycm9yID0gZnVuY3Rpb24gKGVycikge1xuXHR2YXIgbWVzc2FnZSA9IGVyci5tZXNzYWdlO1xuXHR2YXIgc3RhY2sgPSBlcnIuc3RhY2s7XG5cdGlmICghc3RhY2spIHtcblx0XHRyZXR1cm4gbWVzc2FnZTtcblx0fSBlbHNlIGlmIChzdGFjay5pbmRleE9mKG1lc3NhZ2UpIDwgMCkge1xuXHRcdHJldHVybiBtZXNzYWdlICsgXCJcXG5cIiArIHN0YWNrO1xuXHR9XG5cdHJldHVybiBzdGFjaztcbn07XG5cbnZhciBncm91cCA9IGNvbnNvbGUuZ3JvdXAgfHwgZHVtbXk7XG52YXIgZ3JvdXBDb2xsYXBzZWQgPSBjb25zb2xlLmdyb3VwQ29sbGFwc2VkIHx8IGR1bW15O1xudmFyIGdyb3VwRW5kID0gY29uc29sZS5ncm91cEVuZCB8fCBkdW1teTtcblxubW9kdWxlLmV4cG9ydHMuZ3JvdXAgPSBsb2dHcm91cChncm91cCk7XG5cbm1vZHVsZS5leHBvcnRzLmdyb3VwQ29sbGFwc2VkID0gbG9nR3JvdXAoZ3JvdXBDb2xsYXBzZWQpO1xuXG5tb2R1bGUuZXhwb3J0cy5ncm91cEVuZCA9IGxvZ0dyb3VwKGdyb3VwRW5kKTtcblxuLyoqXG4gKiBAcGFyYW0ge0xvZ0xldmVsfSBsZXZlbCBsb2cgbGV2ZWxcbiAqL1xubW9kdWxlLmV4cG9ydHMuc2V0TG9nTGV2ZWwgPSBmdW5jdGlvbiAobGV2ZWwpIHtcblx0bG9nTGV2ZWwgPSBsZXZlbDtcbn07XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdHZhciBleGVjT3B0aW9ucyA9IHsgaWQ6IG1vZHVsZUlkLCBtb2R1bGU6IG1vZHVsZSwgZmFjdG9yeTogX193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0sIHJlcXVpcmU6IF9fd2VicGFja19yZXF1aXJlX18gfTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5pLmZvckVhY2goZnVuY3Rpb24oaGFuZGxlcikgeyBoYW5kbGVyKGV4ZWNPcHRpb25zKTsgfSk7XG5cdG1vZHVsZSA9IGV4ZWNPcHRpb25zLm1vZHVsZTtcblx0ZXhlY09wdGlvbnMuZmFjdG9yeS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBleGVjT3B0aW9ucy5yZXF1aXJlKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbi8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBfX3dlYnBhY2tfbW9kdWxlc19fO1xuXG4vLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuX193ZWJwYWNrX3JlcXVpcmVfXy5jID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fO1xuXG4vLyBleHBvc2UgdGhlIG1vZHVsZSBleGVjdXRpb24gaW50ZXJjZXB0b3Jcbl9fd2VicGFja19yZXF1aXJlX18uaSA9IFtdO1xuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIi8vIFRoaXMgZnVuY3Rpb24gYWxsb3cgdG8gcmVmZXJlbmNlIGFsbCBjaHVua3Ncbl9fd2VicGFja19yZXF1aXJlX18uaHUgPSAoY2h1bmtJZCkgPT4ge1xuXHQvLyByZXR1cm4gdXJsIGZvciBmaWxlbmFtZXMgYmFzZWQgb24gdGVtcGxhdGVcblx0cmV0dXJuIFwiXCIgKyBjaHVua0lkICsgXCIuXCIgKyBfX3dlYnBhY2tfcmVxdWlyZV9fLmgoKSArIFwiLmhvdC11cGRhdGUuanNcIjtcbn07IiwiLy8gVGhpcyBmdW5jdGlvbiBhbGxvdyB0byByZWZlcmVuY2UgYWxsIGNodW5rc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5taW5pQ3NzRiA9IChjaHVua0lkKSA9PiB7XG5cdC8vIHJldHVybiB1cmwgZm9yIGZpbGVuYW1lcyBiYXNlZCBvbiB0ZW1wbGF0ZVxuXHRyZXR1cm4gdW5kZWZpbmVkO1xufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmhtckYgPSAoKSA9PiAoXCJjcml0aWNhbC5cIiArIF9fd2VicGFja19yZXF1aXJlX18uaCgpICsgXCIuaG90LXVwZGF0ZS5qc29uXCIpOyIsIl9fd2VicGFja19yZXF1aXJlX18uaCA9ICgpID0+IChcImVmODRjZTY2Y2MxNWIzZjc4NDAxXCIpIiwiX193ZWJwYWNrX3JlcXVpcmVfXy5nID0gKGZ1bmN0aW9uKCkge1xuXHRpZiAodHlwZW9mIGdsb2JhbFRoaXMgPT09ICdvYmplY3QnKSByZXR1cm4gZ2xvYmFsVGhpcztcblx0dHJ5IHtcblx0XHRyZXR1cm4gdGhpcyB8fCBuZXcgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcblx0fSBjYXRjaCAoZSkge1xuXHRcdGlmICh0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0JykgcmV0dXJuIHdpbmRvdztcblx0fVxufSkoKTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwidmFyIGluUHJvZ3Jlc3MgPSB7fTtcbnZhciBkYXRhV2VicGFja1ByZWZpeCA9IFwidmFuaWxsYV9qYXZhc2NyaXB0X3F1aWNrX3N0YXJ0OlwiO1xuLy8gbG9hZFNjcmlwdCBmdW5jdGlvbiB0byBsb2FkIGEgc2NyaXB0IHZpYSBzY3JpcHQgdGFnXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmwgPSAodXJsLCBkb25lLCBrZXksIGNodW5rSWQpID0+IHtcblx0aWYoaW5Qcm9ncmVzc1t1cmxdKSB7IGluUHJvZ3Jlc3NbdXJsXS5wdXNoKGRvbmUpOyByZXR1cm47IH1cblx0dmFyIHNjcmlwdCwgbmVlZEF0dGFjaDtcblx0aWYoa2V5ICE9PSB1bmRlZmluZWQpIHtcblx0XHR2YXIgc2NyaXB0cyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwic2NyaXB0XCIpO1xuXHRcdGZvcih2YXIgaSA9IDA7IGkgPCBzY3JpcHRzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHR2YXIgcyA9IHNjcmlwdHNbaV07XG5cdFx0XHRpZihzLmdldEF0dHJpYnV0ZShcInNyY1wiKSA9PSB1cmwgfHwgcy5nZXRBdHRyaWJ1dGUoXCJkYXRhLXdlYnBhY2tcIikgPT0gZGF0YVdlYnBhY2tQcmVmaXggKyBrZXkpIHsgc2NyaXB0ID0gczsgYnJlYWs7IH1cblx0XHR9XG5cdH1cblx0aWYoIXNjcmlwdCkge1xuXHRcdG5lZWRBdHRhY2ggPSB0cnVlO1xuXHRcdHNjcmlwdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpO1xuXG5cdFx0c2NyaXB0LmNoYXJzZXQgPSAndXRmLTgnO1xuXHRcdGlmIChfX3dlYnBhY2tfcmVxdWlyZV9fLm5jKSB7XG5cdFx0XHRzY3JpcHQuc2V0QXR0cmlidXRlKFwibm9uY2VcIiwgX193ZWJwYWNrX3JlcXVpcmVfXy5uYyk7XG5cdFx0fVxuXHRcdHNjcmlwdC5zZXRBdHRyaWJ1dGUoXCJkYXRhLXdlYnBhY2tcIiwgZGF0YVdlYnBhY2tQcmVmaXggKyBrZXkpO1xuXG5cdFx0c2NyaXB0LnNyYyA9IHVybDtcblx0fVxuXHRpblByb2dyZXNzW3VybF0gPSBbZG9uZV07XG5cdHZhciBvblNjcmlwdENvbXBsZXRlID0gKHByZXYsIGV2ZW50KSA9PiB7XG5cdFx0Ly8gYXZvaWQgbWVtIGxlYWtzIGluIElFLlxuXHRcdHNjcmlwdC5vbmVycm9yID0gc2NyaXB0Lm9ubG9hZCA9IG51bGw7XG5cdFx0Y2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xuXHRcdHZhciBkb25lRm5zID0gaW5Qcm9ncmVzc1t1cmxdO1xuXHRcdGRlbGV0ZSBpblByb2dyZXNzW3VybF07XG5cdFx0c2NyaXB0LnBhcmVudE5vZGUgJiYgc2NyaXB0LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc2NyaXB0KTtcblx0XHRkb25lRm5zICYmIGRvbmVGbnMuZm9yRWFjaCgoZm4pID0+IChmbihldmVudCkpKTtcblx0XHRpZihwcmV2KSByZXR1cm4gcHJldihldmVudCk7XG5cdH1cblx0dmFyIHRpbWVvdXQgPSBzZXRUaW1lb3V0KG9uU2NyaXB0Q29tcGxldGUuYmluZChudWxsLCB1bmRlZmluZWQsIHsgdHlwZTogJ3RpbWVvdXQnLCB0YXJnZXQ6IHNjcmlwdCB9KSwgMTIwMDAwKTtcblx0c2NyaXB0Lm9uZXJyb3IgPSBvblNjcmlwdENvbXBsZXRlLmJpbmQobnVsbCwgc2NyaXB0Lm9uZXJyb3IpO1xuXHRzY3JpcHQub25sb2FkID0gb25TY3JpcHRDb21wbGV0ZS5iaW5kKG51bGwsIHNjcmlwdC5vbmxvYWQpO1xuXHRuZWVkQXR0YWNoICYmIGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQoc2NyaXB0KTtcbn07IiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwidmFyIGN1cnJlbnRNb2R1bGVEYXRhID0ge307XG52YXIgaW5zdGFsbGVkTW9kdWxlcyA9IF9fd2VicGFja19yZXF1aXJlX18uYztcblxuLy8gbW9kdWxlIGFuZCByZXF1aXJlIGNyZWF0aW9uXG52YXIgY3VycmVudENoaWxkTW9kdWxlO1xudmFyIGN1cnJlbnRQYXJlbnRzID0gW107XG5cbi8vIHN0YXR1c1xudmFyIHJlZ2lzdGVyZWRTdGF0dXNIYW5kbGVycyA9IFtdO1xudmFyIGN1cnJlbnRTdGF0dXMgPSBcImlkbGVcIjtcblxuLy8gd2hpbGUgZG93bmxvYWRpbmdcbnZhciBibG9ja2luZ1Byb21pc2VzID0gMDtcbnZhciBibG9ja2luZ1Byb21pc2VzV2FpdGluZyA9IFtdO1xuXG4vLyBUaGUgdXBkYXRlIGluZm9cbnZhciBjdXJyZW50VXBkYXRlQXBwbHlIYW5kbGVycztcbnZhciBxdWV1ZWRJbnZhbGlkYXRlZE1vZHVsZXM7XG5cbl9fd2VicGFja19yZXF1aXJlX18uaG1yRCA9IGN1cnJlbnRNb2R1bGVEYXRhO1xuXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmkucHVzaChmdW5jdGlvbiAob3B0aW9ucykge1xuXHR2YXIgbW9kdWxlID0gb3B0aW9ucy5tb2R1bGU7XG5cdHZhciByZXF1aXJlID0gY3JlYXRlUmVxdWlyZShvcHRpb25zLnJlcXVpcmUsIG9wdGlvbnMuaWQpO1xuXHRtb2R1bGUuaG90ID0gY3JlYXRlTW9kdWxlSG90T2JqZWN0KG9wdGlvbnMuaWQsIG1vZHVsZSk7XG5cdG1vZHVsZS5wYXJlbnRzID0gY3VycmVudFBhcmVudHM7XG5cdG1vZHVsZS5jaGlsZHJlbiA9IFtdO1xuXHRjdXJyZW50UGFyZW50cyA9IFtdO1xuXHRvcHRpb25zLnJlcXVpcmUgPSByZXF1aXJlO1xufSk7XG5cbl9fd2VicGFja19yZXF1aXJlX18uaG1yQyA9IHt9O1xuX193ZWJwYWNrX3JlcXVpcmVfXy5obXJJID0ge307XG5cbmZ1bmN0aW9uIGNyZWF0ZVJlcXVpcmUocmVxdWlyZSwgbW9kdWxlSWQpIHtcblx0dmFyIG1lID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF07XG5cdGlmICghbWUpIHJldHVybiByZXF1aXJlO1xuXHR2YXIgZm4gPSBmdW5jdGlvbiAocmVxdWVzdCkge1xuXHRcdGlmIChtZS5ob3QuYWN0aXZlKSB7XG5cdFx0XHRpZiAoaW5zdGFsbGVkTW9kdWxlc1tyZXF1ZXN0XSkge1xuXHRcdFx0XHR2YXIgcGFyZW50cyA9IGluc3RhbGxlZE1vZHVsZXNbcmVxdWVzdF0ucGFyZW50cztcblx0XHRcdFx0aWYgKHBhcmVudHMuaW5kZXhPZihtb2R1bGVJZCkgPT09IC0xKSB7XG5cdFx0XHRcdFx0cGFyZW50cy5wdXNoKG1vZHVsZUlkKTtcblx0XHRcdFx0fVxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0Y3VycmVudFBhcmVudHMgPSBbbW9kdWxlSWRdO1xuXHRcdFx0XHRjdXJyZW50Q2hpbGRNb2R1bGUgPSByZXF1ZXN0O1xuXHRcdFx0fVxuXHRcdFx0aWYgKG1lLmNoaWxkcmVuLmluZGV4T2YocmVxdWVzdCkgPT09IC0xKSB7XG5cdFx0XHRcdG1lLmNoaWxkcmVuLnB1c2gocmVxdWVzdCk7XG5cdFx0XHR9XG5cdFx0fSBlbHNlIHtcblx0XHRcdGNvbnNvbGUud2Fybihcblx0XHRcdFx0XCJbSE1SXSB1bmV4cGVjdGVkIHJlcXVpcmUoXCIgK1xuXHRcdFx0XHRcdHJlcXVlc3QgK1xuXHRcdFx0XHRcdFwiKSBmcm9tIGRpc3Bvc2VkIG1vZHVsZSBcIiArXG5cdFx0XHRcdFx0bW9kdWxlSWRcblx0XHRcdCk7XG5cdFx0XHRjdXJyZW50UGFyZW50cyA9IFtdO1xuXHRcdH1cblx0XHRyZXR1cm4gcmVxdWlyZShyZXF1ZXN0KTtcblx0fTtcblx0dmFyIGNyZWF0ZVByb3BlcnR5RGVzY3JpcHRvciA9IGZ1bmN0aW9uIChuYW1lKSB7XG5cdFx0cmV0dXJuIHtcblx0XHRcdGNvbmZpZ3VyYWJsZTogdHJ1ZSxcblx0XHRcdGVudW1lcmFibGU6IHRydWUsXG5cdFx0XHRnZXQ6IGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0cmV0dXJuIHJlcXVpcmVbbmFtZV07XG5cdFx0XHR9LFxuXHRcdFx0c2V0OiBmdW5jdGlvbiAodmFsdWUpIHtcblx0XHRcdFx0cmVxdWlyZVtuYW1lXSA9IHZhbHVlO1xuXHRcdFx0fVxuXHRcdH07XG5cdH07XG5cdGZvciAodmFyIG5hbWUgaW4gcmVxdWlyZSkge1xuXHRcdGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocmVxdWlyZSwgbmFtZSkgJiYgbmFtZSAhPT0gXCJlXCIpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShmbiwgbmFtZSwgY3JlYXRlUHJvcGVydHlEZXNjcmlwdG9yKG5hbWUpKTtcblx0XHR9XG5cdH1cblx0Zm4uZSA9IGZ1bmN0aW9uIChjaHVua0lkLCBmZXRjaFByaW9yaXR5KSB7XG5cdFx0cmV0dXJuIHRyYWNrQmxvY2tpbmdQcm9taXNlKHJlcXVpcmUuZShjaHVua0lkLCBmZXRjaFByaW9yaXR5KSk7XG5cdH07XG5cdHJldHVybiBmbjtcbn1cblxuZnVuY3Rpb24gY3JlYXRlTW9kdWxlSG90T2JqZWN0KG1vZHVsZUlkLCBtZSkge1xuXHR2YXIgX21haW4gPSBjdXJyZW50Q2hpbGRNb2R1bGUgIT09IG1vZHVsZUlkO1xuXHR2YXIgaG90ID0ge1xuXHRcdC8vIHByaXZhdGUgc3R1ZmZcblx0XHRfYWNjZXB0ZWREZXBlbmRlbmNpZXM6IHt9LFxuXHRcdF9hY2NlcHRlZEVycm9ySGFuZGxlcnM6IHt9LFxuXHRcdF9kZWNsaW5lZERlcGVuZGVuY2llczoge30sXG5cdFx0X3NlbGZBY2NlcHRlZDogZmFsc2UsXG5cdFx0X3NlbGZEZWNsaW5lZDogZmFsc2UsXG5cdFx0X3NlbGZJbnZhbGlkYXRlZDogZmFsc2UsXG5cdFx0X2Rpc3Bvc2VIYW5kbGVyczogW10sXG5cdFx0X21haW46IF9tYWluLFxuXHRcdF9yZXF1aXJlU2VsZjogZnVuY3Rpb24gKCkge1xuXHRcdFx0Y3VycmVudFBhcmVudHMgPSBtZS5wYXJlbnRzLnNsaWNlKCk7XG5cdFx0XHRjdXJyZW50Q2hpbGRNb2R1bGUgPSBfbWFpbiA/IHVuZGVmaW5lZCA6IG1vZHVsZUlkO1xuXHRcdFx0X193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCk7XG5cdFx0fSxcblxuXHRcdC8vIE1vZHVsZSBBUElcblx0XHRhY3RpdmU6IHRydWUsXG5cdFx0YWNjZXB0OiBmdW5jdGlvbiAoZGVwLCBjYWxsYmFjaywgZXJyb3JIYW5kbGVyKSB7XG5cdFx0XHRpZiAoZGVwID09PSB1bmRlZmluZWQpIGhvdC5fc2VsZkFjY2VwdGVkID0gdHJ1ZTtcblx0XHRcdGVsc2UgaWYgKHR5cGVvZiBkZXAgPT09IFwiZnVuY3Rpb25cIikgaG90Ll9zZWxmQWNjZXB0ZWQgPSBkZXA7XG5cdFx0XHRlbHNlIGlmICh0eXBlb2YgZGVwID09PSBcIm9iamVjdFwiICYmIGRlcCAhPT0gbnVsbCkge1xuXHRcdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGRlcC5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHRcdGhvdC5fYWNjZXB0ZWREZXBlbmRlbmNpZXNbZGVwW2ldXSA9IGNhbGxiYWNrIHx8IGZ1bmN0aW9uICgpIHt9O1xuXHRcdFx0XHRcdGhvdC5fYWNjZXB0ZWRFcnJvckhhbmRsZXJzW2RlcFtpXV0gPSBlcnJvckhhbmRsZXI7XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGhvdC5fYWNjZXB0ZWREZXBlbmRlbmNpZXNbZGVwXSA9IGNhbGxiYWNrIHx8IGZ1bmN0aW9uICgpIHt9O1xuXHRcdFx0XHRob3QuX2FjY2VwdGVkRXJyb3JIYW5kbGVyc1tkZXBdID0gZXJyb3JIYW5kbGVyO1xuXHRcdFx0fVxuXHRcdH0sXG5cdFx0ZGVjbGluZTogZnVuY3Rpb24gKGRlcCkge1xuXHRcdFx0aWYgKGRlcCA9PT0gdW5kZWZpbmVkKSBob3QuX3NlbGZEZWNsaW5lZCA9IHRydWU7XG5cdFx0XHRlbHNlIGlmICh0eXBlb2YgZGVwID09PSBcIm9iamVjdFwiICYmIGRlcCAhPT0gbnVsbClcblx0XHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBkZXAubGVuZ3RoOyBpKyspXG5cdFx0XHRcdFx0aG90Ll9kZWNsaW5lZERlcGVuZGVuY2llc1tkZXBbaV1dID0gdHJ1ZTtcblx0XHRcdGVsc2UgaG90Ll9kZWNsaW5lZERlcGVuZGVuY2llc1tkZXBdID0gdHJ1ZTtcblx0XHR9LFxuXHRcdGRpc3Bvc2U6IGZ1bmN0aW9uIChjYWxsYmFjaykge1xuXHRcdFx0aG90Ll9kaXNwb3NlSGFuZGxlcnMucHVzaChjYWxsYmFjayk7XG5cdFx0fSxcblx0XHRhZGREaXNwb3NlSGFuZGxlcjogZnVuY3Rpb24gKGNhbGxiYWNrKSB7XG5cdFx0XHRob3QuX2Rpc3Bvc2VIYW5kbGVycy5wdXNoKGNhbGxiYWNrKTtcblx0XHR9LFxuXHRcdHJlbW92ZURpc3Bvc2VIYW5kbGVyOiBmdW5jdGlvbiAoY2FsbGJhY2spIHtcblx0XHRcdHZhciBpZHggPSBob3QuX2Rpc3Bvc2VIYW5kbGVycy5pbmRleE9mKGNhbGxiYWNrKTtcblx0XHRcdGlmIChpZHggPj0gMCkgaG90Ll9kaXNwb3NlSGFuZGxlcnMuc3BsaWNlKGlkeCwgMSk7XG5cdFx0fSxcblx0XHRpbnZhbGlkYXRlOiBmdW5jdGlvbiAoKSB7XG5cdFx0XHR0aGlzLl9zZWxmSW52YWxpZGF0ZWQgPSB0cnVlO1xuXHRcdFx0c3dpdGNoIChjdXJyZW50U3RhdHVzKSB7XG5cdFx0XHRcdGNhc2UgXCJpZGxlXCI6XG5cdFx0XHRcdFx0Y3VycmVudFVwZGF0ZUFwcGx5SGFuZGxlcnMgPSBbXTtcblx0XHRcdFx0XHRPYmplY3Qua2V5cyhfX3dlYnBhY2tfcmVxdWlyZV9fLmhtckkpLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuXHRcdFx0XHRcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5obXJJW2tleV0oXG5cdFx0XHRcdFx0XHRcdG1vZHVsZUlkLFxuXHRcdFx0XHRcdFx0XHRjdXJyZW50VXBkYXRlQXBwbHlIYW5kbGVyc1xuXHRcdFx0XHRcdFx0KTtcblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRzZXRTdGF0dXMoXCJyZWFkeVwiKTtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0Y2FzZSBcInJlYWR5XCI6XG5cdFx0XHRcdFx0T2JqZWN0LmtleXMoX193ZWJwYWNrX3JlcXVpcmVfXy5obXJJKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcblx0XHRcdFx0XHRcdF9fd2VicGFja19yZXF1aXJlX18uaG1ySVtrZXldKFxuXHRcdFx0XHRcdFx0XHRtb2R1bGVJZCxcblx0XHRcdFx0XHRcdFx0Y3VycmVudFVwZGF0ZUFwcGx5SGFuZGxlcnNcblx0XHRcdFx0XHRcdCk7XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdGNhc2UgXCJwcmVwYXJlXCI6XG5cdFx0XHRcdGNhc2UgXCJjaGVja1wiOlxuXHRcdFx0XHRjYXNlIFwiZGlzcG9zZVwiOlxuXHRcdFx0XHRjYXNlIFwiYXBwbHlcIjpcblx0XHRcdFx0XHQocXVldWVkSW52YWxpZGF0ZWRNb2R1bGVzID0gcXVldWVkSW52YWxpZGF0ZWRNb2R1bGVzIHx8IFtdKS5wdXNoKFxuXHRcdFx0XHRcdFx0bW9kdWxlSWRcblx0XHRcdFx0XHQpO1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHRcdC8vIGlnbm9yZSByZXF1ZXN0cyBpbiBlcnJvciBzdGF0ZXNcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdH1cblx0XHR9LFxuXG5cdFx0Ly8gTWFuYWdlbWVudCBBUElcblx0XHRjaGVjazogaG90Q2hlY2ssXG5cdFx0YXBwbHk6IGhvdEFwcGx5LFxuXHRcdHN0YXR1czogZnVuY3Rpb24gKGwpIHtcblx0XHRcdGlmICghbCkgcmV0dXJuIGN1cnJlbnRTdGF0dXM7XG5cdFx0XHRyZWdpc3RlcmVkU3RhdHVzSGFuZGxlcnMucHVzaChsKTtcblx0XHR9LFxuXHRcdGFkZFN0YXR1c0hhbmRsZXI6IGZ1bmN0aW9uIChsKSB7XG5cdFx0XHRyZWdpc3RlcmVkU3RhdHVzSGFuZGxlcnMucHVzaChsKTtcblx0XHR9LFxuXHRcdHJlbW92ZVN0YXR1c0hhbmRsZXI6IGZ1bmN0aW9uIChsKSB7XG5cdFx0XHR2YXIgaWR4ID0gcmVnaXN0ZXJlZFN0YXR1c0hhbmRsZXJzLmluZGV4T2YobCk7XG5cdFx0XHRpZiAoaWR4ID49IDApIHJlZ2lzdGVyZWRTdGF0dXNIYW5kbGVycy5zcGxpY2UoaWR4LCAxKTtcblx0XHR9LFxuXG5cdFx0Ly8gaW5oZXJpdCBmcm9tIHByZXZpb3VzIGRpc3Bvc2UgY2FsbFxuXHRcdGRhdGE6IGN1cnJlbnRNb2R1bGVEYXRhW21vZHVsZUlkXVxuXHR9O1xuXHRjdXJyZW50Q2hpbGRNb2R1bGUgPSB1bmRlZmluZWQ7XG5cdHJldHVybiBob3Q7XG59XG5cbmZ1bmN0aW9uIHNldFN0YXR1cyhuZXdTdGF0dXMpIHtcblx0Y3VycmVudFN0YXR1cyA9IG5ld1N0YXR1cztcblx0dmFyIHJlc3VsdHMgPSBbXTtcblxuXHRmb3IgKHZhciBpID0gMDsgaSA8IHJlZ2lzdGVyZWRTdGF0dXNIYW5kbGVycy5sZW5ndGg7IGkrKylcblx0XHRyZXN1bHRzW2ldID0gcmVnaXN0ZXJlZFN0YXR1c0hhbmRsZXJzW2ldLmNhbGwobnVsbCwgbmV3U3RhdHVzKTtcblxuXHRyZXR1cm4gUHJvbWlzZS5hbGwocmVzdWx0cykudGhlbihmdW5jdGlvbiAoKSB7fSk7XG59XG5cbmZ1bmN0aW9uIHVuYmxvY2soKSB7XG5cdGlmICgtLWJsb2NraW5nUHJvbWlzZXMgPT09IDApIHtcblx0XHRzZXRTdGF0dXMoXCJyZWFkeVwiKS50aGVuKGZ1bmN0aW9uICgpIHtcblx0XHRcdGlmIChibG9ja2luZ1Byb21pc2VzID09PSAwKSB7XG5cdFx0XHRcdHZhciBsaXN0ID0gYmxvY2tpbmdQcm9taXNlc1dhaXRpbmc7XG5cdFx0XHRcdGJsb2NraW5nUHJvbWlzZXNXYWl0aW5nID0gW107XG5cdFx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHRcdGxpc3RbaV0oKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0pO1xuXHR9XG59XG5cbmZ1bmN0aW9uIHRyYWNrQmxvY2tpbmdQcm9taXNlKHByb21pc2UpIHtcblx0c3dpdGNoIChjdXJyZW50U3RhdHVzKSB7XG5cdFx0Y2FzZSBcInJlYWR5XCI6XG5cdFx0XHRzZXRTdGF0dXMoXCJwcmVwYXJlXCIpO1xuXHRcdC8qIGZhbGx0aHJvdWdoICovXG5cdFx0Y2FzZSBcInByZXBhcmVcIjpcblx0XHRcdGJsb2NraW5nUHJvbWlzZXMrKztcblx0XHRcdHByb21pc2UudGhlbih1bmJsb2NrLCB1bmJsb2NrKTtcblx0XHRcdHJldHVybiBwcm9taXNlO1xuXHRcdGRlZmF1bHQ6XG5cdFx0XHRyZXR1cm4gcHJvbWlzZTtcblx0fVxufVxuXG5mdW5jdGlvbiB3YWl0Rm9yQmxvY2tpbmdQcm9taXNlcyhmbikge1xuXHRpZiAoYmxvY2tpbmdQcm9taXNlcyA9PT0gMCkgcmV0dXJuIGZuKCk7XG5cdHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSkge1xuXHRcdGJsb2NraW5nUHJvbWlzZXNXYWl0aW5nLnB1c2goZnVuY3Rpb24gKCkge1xuXHRcdFx0cmVzb2x2ZShmbigpKTtcblx0XHR9KTtcblx0fSk7XG59XG5cbmZ1bmN0aW9uIGhvdENoZWNrKGFwcGx5T25VcGRhdGUpIHtcblx0aWYgKGN1cnJlbnRTdGF0dXMgIT09IFwiaWRsZVwiKSB7XG5cdFx0dGhyb3cgbmV3IEVycm9yKFwiY2hlY2soKSBpcyBvbmx5IGFsbG93ZWQgaW4gaWRsZSBzdGF0dXNcIik7XG5cdH1cblx0cmV0dXJuIHNldFN0YXR1cyhcImNoZWNrXCIpXG5cdFx0LnRoZW4oX193ZWJwYWNrX3JlcXVpcmVfXy5obXJNKVxuXHRcdC50aGVuKGZ1bmN0aW9uICh1cGRhdGUpIHtcblx0XHRcdGlmICghdXBkYXRlKSB7XG5cdFx0XHRcdHJldHVybiBzZXRTdGF0dXMoYXBwbHlJbnZhbGlkYXRlZE1vZHVsZXMoKSA/IFwicmVhZHlcIiA6IFwiaWRsZVwiKS50aGVuKFxuXHRcdFx0XHRcdGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0XHRcdHJldHVybiBudWxsO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0KTtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIHNldFN0YXR1cyhcInByZXBhcmVcIikudGhlbihmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdHZhciB1cGRhdGVkTW9kdWxlcyA9IFtdO1xuXHRcdFx0XHRjdXJyZW50VXBkYXRlQXBwbHlIYW5kbGVycyA9IFtdO1xuXG5cdFx0XHRcdHJldHVybiBQcm9taXNlLmFsbChcblx0XHRcdFx0XHRPYmplY3Qua2V5cyhfX3dlYnBhY2tfcmVxdWlyZV9fLmhtckMpLnJlZHVjZShmdW5jdGlvbiAoXG5cdFx0XHRcdFx0XHRwcm9taXNlcyxcblx0XHRcdFx0XHRcdGtleVxuXHRcdFx0XHRcdCkge1xuXHRcdFx0XHRcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5obXJDW2tleV0oXG5cdFx0XHRcdFx0XHRcdHVwZGF0ZS5jLFxuXHRcdFx0XHRcdFx0XHR1cGRhdGUucixcblx0XHRcdFx0XHRcdFx0dXBkYXRlLm0sXG5cdFx0XHRcdFx0XHRcdHByb21pc2VzLFxuXHRcdFx0XHRcdFx0XHRjdXJyZW50VXBkYXRlQXBwbHlIYW5kbGVycyxcblx0XHRcdFx0XHRcdFx0dXBkYXRlZE1vZHVsZXNcblx0XHRcdFx0XHRcdCk7XG5cdFx0XHRcdFx0XHRyZXR1cm4gcHJvbWlzZXM7XG5cdFx0XHRcdFx0fSwgW10pXG5cdFx0XHRcdCkudGhlbihmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdFx0cmV0dXJuIHdhaXRGb3JCbG9ja2luZ1Byb21pc2VzKGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0XHRcdGlmIChhcHBseU9uVXBkYXRlKSB7XG5cdFx0XHRcdFx0XHRcdHJldHVybiBpbnRlcm5hbEFwcGx5KGFwcGx5T25VcGRhdGUpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0cmV0dXJuIHNldFN0YXR1cyhcInJlYWR5XCIpLnRoZW4oZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRcdFx0XHRyZXR1cm4gdXBkYXRlZE1vZHVsZXM7XG5cdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0fSk7XG5cdFx0XHR9KTtcblx0XHR9KTtcbn1cblxuZnVuY3Rpb24gaG90QXBwbHkob3B0aW9ucykge1xuXHRpZiAoY3VycmVudFN0YXR1cyAhPT0gXCJyZWFkeVwiKSB7XG5cdFx0cmV0dXJuIFByb21pc2UucmVzb2x2ZSgpLnRoZW4oZnVuY3Rpb24gKCkge1xuXHRcdFx0dGhyb3cgbmV3IEVycm9yKFxuXHRcdFx0XHRcImFwcGx5KCkgaXMgb25seSBhbGxvd2VkIGluIHJlYWR5IHN0YXR1cyAoc3RhdGU6IFwiICtcblx0XHRcdFx0XHRjdXJyZW50U3RhdHVzICtcblx0XHRcdFx0XHRcIilcIlxuXHRcdFx0KTtcblx0XHR9KTtcblx0fVxuXHRyZXR1cm4gaW50ZXJuYWxBcHBseShvcHRpb25zKTtcbn1cblxuZnVuY3Rpb24gaW50ZXJuYWxBcHBseShvcHRpb25zKSB7XG5cdG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuXG5cdGFwcGx5SW52YWxpZGF0ZWRNb2R1bGVzKCk7XG5cblx0dmFyIHJlc3VsdHMgPSBjdXJyZW50VXBkYXRlQXBwbHlIYW5kbGVycy5tYXAoZnVuY3Rpb24gKGhhbmRsZXIpIHtcblx0XHRyZXR1cm4gaGFuZGxlcihvcHRpb25zKTtcblx0fSk7XG5cdGN1cnJlbnRVcGRhdGVBcHBseUhhbmRsZXJzID0gdW5kZWZpbmVkO1xuXG5cdHZhciBlcnJvcnMgPSByZXN1bHRzXG5cdFx0Lm1hcChmdW5jdGlvbiAocikge1xuXHRcdFx0cmV0dXJuIHIuZXJyb3I7XG5cdFx0fSlcblx0XHQuZmlsdGVyKEJvb2xlYW4pO1xuXG5cdGlmIChlcnJvcnMubGVuZ3RoID4gMCkge1xuXHRcdHJldHVybiBzZXRTdGF0dXMoXCJhYm9ydFwiKS50aGVuKGZ1bmN0aW9uICgpIHtcblx0XHRcdHRocm93IGVycm9yc1swXTtcblx0XHR9KTtcblx0fVxuXG5cdC8vIE5vdyBpbiBcImRpc3Bvc2VcIiBwaGFzZVxuXHR2YXIgZGlzcG9zZVByb21pc2UgPSBzZXRTdGF0dXMoXCJkaXNwb3NlXCIpO1xuXG5cdHJlc3VsdHMuZm9yRWFjaChmdW5jdGlvbiAocmVzdWx0KSB7XG5cdFx0aWYgKHJlc3VsdC5kaXNwb3NlKSByZXN1bHQuZGlzcG9zZSgpO1xuXHR9KTtcblxuXHQvLyBOb3cgaW4gXCJhcHBseVwiIHBoYXNlXG5cdHZhciBhcHBseVByb21pc2UgPSBzZXRTdGF0dXMoXCJhcHBseVwiKTtcblxuXHR2YXIgZXJyb3I7XG5cdHZhciByZXBvcnRFcnJvciA9IGZ1bmN0aW9uIChlcnIpIHtcblx0XHRpZiAoIWVycm9yKSBlcnJvciA9IGVycjtcblx0fTtcblxuXHR2YXIgb3V0ZGF0ZWRNb2R1bGVzID0gW107XG5cblx0dmFyIG9uQWNjZXB0ZWQgPSBmdW5jdGlvbiAoKSB7XG5cdFx0cmV0dXJuIFByb21pc2UuYWxsKFtkaXNwb3NlUHJvbWlzZSwgYXBwbHlQcm9taXNlXSkudGhlbihmdW5jdGlvbiAoKSB7XG5cdFx0XHQvLyBoYW5kbGUgZXJyb3JzIGluIGFjY2VwdCBoYW5kbGVycyBhbmQgc2VsZiBhY2NlcHRlZCBtb2R1bGUgbG9hZFxuXHRcdFx0aWYgKGVycm9yKSB7XG5cdFx0XHRcdHJldHVybiBzZXRTdGF0dXMoXCJmYWlsXCIpLnRoZW4oZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRcdHRocm93IGVycm9yO1xuXHRcdFx0XHR9KTtcblx0XHRcdH1cblxuXHRcdFx0aWYgKHF1ZXVlZEludmFsaWRhdGVkTW9kdWxlcykge1xuXHRcdFx0XHRyZXR1cm4gaW50ZXJuYWxBcHBseShvcHRpb25zKS50aGVuKGZ1bmN0aW9uIChsaXN0KSB7XG5cdFx0XHRcdFx0b3V0ZGF0ZWRNb2R1bGVzLmZvckVhY2goZnVuY3Rpb24gKG1vZHVsZUlkKSB7XG5cdFx0XHRcdFx0XHRpZiAobGlzdC5pbmRleE9mKG1vZHVsZUlkKSA8IDApIGxpc3QucHVzaChtb2R1bGVJZCk7XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0cmV0dXJuIGxpc3Q7XG5cdFx0XHRcdH0pO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gc2V0U3RhdHVzKFwiaWRsZVwiKS50aGVuKGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0cmV0dXJuIG91dGRhdGVkTW9kdWxlcztcblx0XHRcdH0pO1xuXHRcdH0pO1xuXHR9O1xuXG5cdHJldHVybiBQcm9taXNlLmFsbChcblx0XHRyZXN1bHRzXG5cdFx0XHQuZmlsdGVyKGZ1bmN0aW9uIChyZXN1bHQpIHtcblx0XHRcdFx0cmV0dXJuIHJlc3VsdC5hcHBseTtcblx0XHRcdH0pXG5cdFx0XHQubWFwKGZ1bmN0aW9uIChyZXN1bHQpIHtcblx0XHRcdFx0cmV0dXJuIHJlc3VsdC5hcHBseShyZXBvcnRFcnJvcik7XG5cdFx0XHR9KVxuXHQpXG5cdFx0LnRoZW4oZnVuY3Rpb24gKGFwcGx5UmVzdWx0cykge1xuXHRcdFx0YXBwbHlSZXN1bHRzLmZvckVhY2goZnVuY3Rpb24gKG1vZHVsZXMpIHtcblx0XHRcdFx0aWYgKG1vZHVsZXMpIHtcblx0XHRcdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IG1vZHVsZXMubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0XHRcdG91dGRhdGVkTW9kdWxlcy5wdXNoKG1vZHVsZXNbaV0pO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0fSlcblx0XHQudGhlbihvbkFjY2VwdGVkKTtcbn1cblxuZnVuY3Rpb24gYXBwbHlJbnZhbGlkYXRlZE1vZHVsZXMoKSB7XG5cdGlmIChxdWV1ZWRJbnZhbGlkYXRlZE1vZHVsZXMpIHtcblx0XHRpZiAoIWN1cnJlbnRVcGRhdGVBcHBseUhhbmRsZXJzKSBjdXJyZW50VXBkYXRlQXBwbHlIYW5kbGVycyA9IFtdO1xuXHRcdE9iamVjdC5rZXlzKF9fd2VicGFja19yZXF1aXJlX18uaG1ySSkuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG5cdFx0XHRxdWV1ZWRJbnZhbGlkYXRlZE1vZHVsZXMuZm9yRWFjaChmdW5jdGlvbiAobW9kdWxlSWQpIHtcblx0XHRcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5obXJJW2tleV0oXG5cdFx0XHRcdFx0bW9kdWxlSWQsXG5cdFx0XHRcdFx0Y3VycmVudFVwZGF0ZUFwcGx5SGFuZGxlcnNcblx0XHRcdFx0KTtcblx0XHRcdH0pO1xuXHRcdH0pO1xuXHRcdHF1ZXVlZEludmFsaWRhdGVkTW9kdWxlcyA9IHVuZGVmaW5lZDtcblx0XHRyZXR1cm4gdHJ1ZTtcblx0fVxufSIsInZhciBzY3JpcHRVcmw7XG5pZiAoX193ZWJwYWNrX3JlcXVpcmVfXy5nLmltcG9ydFNjcmlwdHMpIHNjcmlwdFVybCA9IF9fd2VicGFja19yZXF1aXJlX18uZy5sb2NhdGlvbiArIFwiXCI7XG52YXIgZG9jdW1lbnQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLmcuZG9jdW1lbnQ7XG5pZiAoIXNjcmlwdFVybCAmJiBkb2N1bWVudCkge1xuXHRpZiAoZG9jdW1lbnQuY3VycmVudFNjcmlwdCAmJiBkb2N1bWVudC5jdXJyZW50U2NyaXB0LnRhZ05hbWUudG9VcHBlckNhc2UoKSA9PT0gJ1NDUklQVCcpXG5cdFx0c2NyaXB0VXJsID0gZG9jdW1lbnQuY3VycmVudFNjcmlwdC5zcmM7XG5cdGlmICghc2NyaXB0VXJsKSB7XG5cdFx0dmFyIHNjcmlwdHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcInNjcmlwdFwiKTtcblx0XHRpZihzY3JpcHRzLmxlbmd0aCkge1xuXHRcdFx0dmFyIGkgPSBzY3JpcHRzLmxlbmd0aCAtIDE7XG5cdFx0XHR3aGlsZSAoaSA+IC0xICYmICghc2NyaXB0VXJsIHx8ICEvXmh0dHAocz8pOi8udGVzdChzY3JpcHRVcmwpKSkgc2NyaXB0VXJsID0gc2NyaXB0c1tpLS1dLnNyYztcblx0XHR9XG5cdH1cbn1cbi8vIFdoZW4gc3VwcG9ydGluZyBicm93c2VycyB3aGVyZSBhbiBhdXRvbWF0aWMgcHVibGljUGF0aCBpcyBub3Qgc3VwcG9ydGVkIHlvdSBtdXN0IHNwZWNpZnkgYW4gb3V0cHV0LnB1YmxpY1BhdGggbWFudWFsbHkgdmlhIGNvbmZpZ3VyYXRpb25cbi8vIG9yIHBhc3MgYW4gZW1wdHkgc3RyaW5nIChcIlwiKSBhbmQgc2V0IHRoZSBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyB2YXJpYWJsZSBmcm9tIHlvdXIgY29kZSB0byB1c2UgeW91ciBvd24gbG9naWMuXG5pZiAoIXNjcmlwdFVybCkgdGhyb3cgbmV3IEVycm9yKFwiQXV0b21hdGljIHB1YmxpY1BhdGggaXMgbm90IHN1cHBvcnRlZCBpbiB0aGlzIGJyb3dzZXJcIik7XG5zY3JpcHRVcmwgPSBzY3JpcHRVcmwucmVwbGFjZSgvXmJsb2I6LywgXCJcIikucmVwbGFjZSgvIy4qJC8sIFwiXCIpLnJlcGxhY2UoL1xcPy4qJC8sIFwiXCIpLnJlcGxhY2UoL1xcL1teXFwvXSskLywgXCIvXCIpO1xuX193ZWJwYWNrX3JlcXVpcmVfXy5wID0gc2NyaXB0VXJsOyIsImlmICh0eXBlb2YgZG9jdW1lbnQgPT09IFwidW5kZWZpbmVkXCIpIHJldHVybjtcbnZhciBjcmVhdGVTdHlsZXNoZWV0ID0gKGNodW5rSWQsIGZ1bGxocmVmLCBvbGRUYWcsIHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXHR2YXIgbGlua1RhZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaW5rXCIpO1xuXG5cdGxpbmtUYWcucmVsID0gXCJzdHlsZXNoZWV0XCI7XG5cdGxpbmtUYWcudHlwZSA9IFwidGV4dC9jc3NcIjtcblx0aWYgKF9fd2VicGFja19yZXF1aXJlX18ubmMpIHtcblx0XHRsaW5rVGFnLm5vbmNlID0gX193ZWJwYWNrX3JlcXVpcmVfXy5uYztcblx0fVxuXHR2YXIgb25MaW5rQ29tcGxldGUgPSAoZXZlbnQpID0+IHtcblx0XHQvLyBhdm9pZCBtZW0gbGVha3MuXG5cdFx0bGlua1RhZy5vbmVycm9yID0gbGlua1RhZy5vbmxvYWQgPSBudWxsO1xuXHRcdGlmIChldmVudC50eXBlID09PSAnbG9hZCcpIHtcblx0XHRcdHJlc29sdmUoKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dmFyIGVycm9yVHlwZSA9IGV2ZW50ICYmIGV2ZW50LnR5cGU7XG5cdFx0XHR2YXIgcmVhbEhyZWYgPSBldmVudCAmJiBldmVudC50YXJnZXQgJiYgZXZlbnQudGFyZ2V0LmhyZWYgfHwgZnVsbGhyZWY7XG5cdFx0XHR2YXIgZXJyID0gbmV3IEVycm9yKFwiTG9hZGluZyBDU1MgY2h1bmsgXCIgKyBjaHVua0lkICsgXCIgZmFpbGVkLlxcbihcIiArIGVycm9yVHlwZSArIFwiOiBcIiArIHJlYWxIcmVmICsgXCIpXCIpO1xuXHRcdFx0ZXJyLm5hbWUgPSBcIkNodW5rTG9hZEVycm9yXCI7XG5cdFx0XHRlcnIuY29kZSA9IFwiQ1NTX0NIVU5LX0xPQURfRkFJTEVEXCI7XG5cdFx0XHRlcnIudHlwZSA9IGVycm9yVHlwZTtcblx0XHRcdGVyci5yZXF1ZXN0ID0gcmVhbEhyZWY7XG5cdFx0XHRpZiAobGlua1RhZy5wYXJlbnROb2RlKSBsaW5rVGFnLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQobGlua1RhZylcblx0XHRcdHJlamVjdChlcnIpO1xuXHRcdH1cblx0fVxuXHRsaW5rVGFnLm9uZXJyb3IgPSBsaW5rVGFnLm9ubG9hZCA9IG9uTGlua0NvbXBsZXRlO1xuXHRsaW5rVGFnLmhyZWYgPSBmdWxsaHJlZjtcblxuXG5cdGlmIChvbGRUYWcpIHtcblx0XHRvbGRUYWcucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUobGlua1RhZywgb2xkVGFnLm5leHRTaWJsaW5nKTtcblx0fSBlbHNlIHtcblx0XHRkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKGxpbmtUYWcpO1xuXHR9XG5cdHJldHVybiBsaW5rVGFnO1xufTtcbnZhciBmaW5kU3R5bGVzaGVldCA9IChocmVmLCBmdWxsaHJlZikgPT4ge1xuXHR2YXIgZXhpc3RpbmdMaW5rVGFncyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwibGlua1wiKTtcblx0Zm9yKHZhciBpID0gMDsgaSA8IGV4aXN0aW5nTGlua1RhZ3MubGVuZ3RoOyBpKyspIHtcblx0XHR2YXIgdGFnID0gZXhpc3RpbmdMaW5rVGFnc1tpXTtcblx0XHR2YXIgZGF0YUhyZWYgPSB0YWcuZ2V0QXR0cmlidXRlKFwiZGF0YS1ocmVmXCIpIHx8IHRhZy5nZXRBdHRyaWJ1dGUoXCJocmVmXCIpO1xuXHRcdGlmKHRhZy5yZWwgPT09IFwic3R5bGVzaGVldFwiICYmIChkYXRhSHJlZiA9PT0gaHJlZiB8fCBkYXRhSHJlZiA9PT0gZnVsbGhyZWYpKSByZXR1cm4gdGFnO1xuXHR9XG5cdHZhciBleGlzdGluZ1N0eWxlVGFncyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwic3R5bGVcIik7XG5cdGZvcih2YXIgaSA9IDA7IGkgPCBleGlzdGluZ1N0eWxlVGFncy5sZW5ndGg7IGkrKykge1xuXHRcdHZhciB0YWcgPSBleGlzdGluZ1N0eWxlVGFnc1tpXTtcblx0XHR2YXIgZGF0YUhyZWYgPSB0YWcuZ2V0QXR0cmlidXRlKFwiZGF0YS1ocmVmXCIpO1xuXHRcdGlmKGRhdGFIcmVmID09PSBocmVmIHx8IGRhdGFIcmVmID09PSBmdWxsaHJlZikgcmV0dXJuIHRhZztcblx0fVxufTtcbnZhciBsb2FkU3R5bGVzaGVldCA9IChjaHVua0lkKSA9PiB7XG5cdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cdFx0dmFyIGhyZWYgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLm1pbmlDc3NGKGNodW5rSWQpO1xuXHRcdHZhciBmdWxsaHJlZiA9IF9fd2VicGFja19yZXF1aXJlX18ucCArIGhyZWY7XG5cdFx0aWYoZmluZFN0eWxlc2hlZXQoaHJlZiwgZnVsbGhyZWYpKSByZXR1cm4gcmVzb2x2ZSgpO1xuXHRcdGNyZWF0ZVN0eWxlc2hlZXQoY2h1bmtJZCwgZnVsbGhyZWYsIG51bGwsIHJlc29sdmUsIHJlamVjdCk7XG5cdH0pO1xufVxuLy8gbm8gY2h1bmsgbG9hZGluZ1xuXG52YXIgb2xkVGFncyA9IFtdO1xudmFyIG5ld1RhZ3MgPSBbXTtcbnZhciBhcHBseUhhbmRsZXIgPSAob3B0aW9ucykgPT4ge1xuXHRyZXR1cm4geyBkaXNwb3NlOiAoKSA9PiB7XG5cdFx0Zm9yKHZhciBpID0gMDsgaSA8IG9sZFRhZ3MubGVuZ3RoOyBpKyspIHtcblx0XHRcdHZhciBvbGRUYWcgPSBvbGRUYWdzW2ldO1xuXHRcdFx0aWYob2xkVGFnLnBhcmVudE5vZGUpIG9sZFRhZy5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKG9sZFRhZyk7XG5cdFx0fVxuXHRcdG9sZFRhZ3MubGVuZ3RoID0gMDtcblx0fSwgYXBwbHk6ICgpID0+IHtcblx0XHRmb3IodmFyIGkgPSAwOyBpIDwgbmV3VGFncy5sZW5ndGg7IGkrKykgbmV3VGFnc1tpXS5yZWwgPSBcInN0eWxlc2hlZXRcIjtcblx0XHRuZXdUYWdzLmxlbmd0aCA9IDA7XG5cdH0gfTtcbn1cbl9fd2VicGFja19yZXF1aXJlX18uaG1yQy5taW5pQ3NzID0gKGNodW5rSWRzLCByZW1vdmVkQ2h1bmtzLCByZW1vdmVkTW9kdWxlcywgcHJvbWlzZXMsIGFwcGx5SGFuZGxlcnMsIHVwZGF0ZWRNb2R1bGVzTGlzdCkgPT4ge1xuXHRhcHBseUhhbmRsZXJzLnB1c2goYXBwbHlIYW5kbGVyKTtcblx0Y2h1bmtJZHMuZm9yRWFjaCgoY2h1bmtJZCkgPT4ge1xuXHRcdHZhciBocmVmID0gX193ZWJwYWNrX3JlcXVpcmVfXy5taW5pQ3NzRihjaHVua0lkKTtcblx0XHR2YXIgZnVsbGhyZWYgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLnAgKyBocmVmO1xuXHRcdHZhciBvbGRUYWcgPSBmaW5kU3R5bGVzaGVldChocmVmLCBmdWxsaHJlZik7XG5cdFx0aWYoIW9sZFRhZykgcmV0dXJuO1xuXHRcdHByb21pc2VzLnB1c2gobmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXHRcdFx0dmFyIHRhZyA9IGNyZWF0ZVN0eWxlc2hlZXQoY2h1bmtJZCwgZnVsbGhyZWYsIG9sZFRhZywgKCkgPT4ge1xuXHRcdFx0XHR0YWcuYXMgPSBcInN0eWxlXCI7XG5cdFx0XHRcdHRhZy5yZWwgPSBcInByZWxvYWRcIjtcblx0XHRcdFx0cmVzb2x2ZSgpO1xuXHRcdFx0fSwgcmVqZWN0KTtcblx0XHRcdG9sZFRhZ3MucHVzaChvbGRUYWcpO1xuXHRcdFx0bmV3VGFncy5wdXNoKHRhZyk7XG5cdFx0fSkpO1xuXHR9KTtcbn1cblxuLy8gbm8gcHJlZmV0Y2hpbmdcblxuLy8gbm8gcHJlbG9hZGVkIiwiLy8gbm8gYmFzZVVSSVxuXG4vLyBvYmplY3QgdG8gc3RvcmUgbG9hZGVkIGFuZCBsb2FkaW5nIGNodW5rc1xuLy8gdW5kZWZpbmVkID0gY2h1bmsgbm90IGxvYWRlZCwgbnVsbCA9IGNodW5rIHByZWxvYWRlZC9wcmVmZXRjaGVkXG4vLyBbcmVzb2x2ZSwgcmVqZWN0LCBQcm9taXNlXSA9IGNodW5rIGxvYWRpbmcsIDAgPSBjaHVuayBsb2FkZWRcbnZhciBpbnN0YWxsZWRDaHVua3MgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLmhtclNfanNvbnAgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLmhtclNfanNvbnAgfHwge1xuXHRcImNyaXRpY2FsXCI6IDBcbn07XG5cbi8vIG5vIGNodW5rIG9uIGRlbWFuZCBsb2FkaW5nXG5cbi8vIG5vIHByZWZldGNoaW5nXG5cbi8vIG5vIHByZWxvYWRlZFxuXG52YXIgY3VycmVudFVwZGF0ZWRNb2R1bGVzTGlzdDtcbnZhciB3YWl0aW5nVXBkYXRlUmVzb2x2ZXMgPSB7fTtcbmZ1bmN0aW9uIGxvYWRVcGRhdGVDaHVuayhjaHVua0lkLCB1cGRhdGVkTW9kdWxlc0xpc3QpIHtcblx0Y3VycmVudFVwZGF0ZWRNb2R1bGVzTGlzdCA9IHVwZGF0ZWRNb2R1bGVzTGlzdDtcblx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcblx0XHR3YWl0aW5nVXBkYXRlUmVzb2x2ZXNbY2h1bmtJZF0gPSByZXNvbHZlO1xuXHRcdC8vIHN0YXJ0IHVwZGF0ZSBjaHVuayBsb2FkaW5nXG5cdFx0dmFyIHVybCA9IF9fd2VicGFja19yZXF1aXJlX18ucCArIF9fd2VicGFja19yZXF1aXJlX18uaHUoY2h1bmtJZCk7XG5cdFx0Ly8gY3JlYXRlIGVycm9yIGJlZm9yZSBzdGFjayB1bndvdW5kIHRvIGdldCB1c2VmdWwgc3RhY2t0cmFjZSBsYXRlclxuXHRcdHZhciBlcnJvciA9IG5ldyBFcnJvcigpO1xuXHRcdHZhciBsb2FkaW5nRW5kZWQgPSAoZXZlbnQpID0+IHtcblx0XHRcdGlmKHdhaXRpbmdVcGRhdGVSZXNvbHZlc1tjaHVua0lkXSkge1xuXHRcdFx0XHR3YWl0aW5nVXBkYXRlUmVzb2x2ZXNbY2h1bmtJZF0gPSB1bmRlZmluZWRcblx0XHRcdFx0dmFyIGVycm9yVHlwZSA9IGV2ZW50ICYmIChldmVudC50eXBlID09PSAnbG9hZCcgPyAnbWlzc2luZycgOiBldmVudC50eXBlKTtcblx0XHRcdFx0dmFyIHJlYWxTcmMgPSBldmVudCAmJiBldmVudC50YXJnZXQgJiYgZXZlbnQudGFyZ2V0LnNyYztcblx0XHRcdFx0ZXJyb3IubWVzc2FnZSA9ICdMb2FkaW5nIGhvdCB1cGRhdGUgY2h1bmsgJyArIGNodW5rSWQgKyAnIGZhaWxlZC5cXG4oJyArIGVycm9yVHlwZSArICc6ICcgKyByZWFsU3JjICsgJyknO1xuXHRcdFx0XHRlcnJvci5uYW1lID0gJ0NodW5rTG9hZEVycm9yJztcblx0XHRcdFx0ZXJyb3IudHlwZSA9IGVycm9yVHlwZTtcblx0XHRcdFx0ZXJyb3IucmVxdWVzdCA9IHJlYWxTcmM7XG5cdFx0XHRcdHJlamVjdChlcnJvcik7XG5cdFx0XHR9XG5cdFx0fTtcblx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmwodXJsLCBsb2FkaW5nRW5kZWQpO1xuXHR9KTtcbn1cblxuc2VsZltcIndlYnBhY2tIb3RVcGRhdGV2YW5pbGxhX2phdmFzY3JpcHRfcXVpY2tfc3RhcnRcIl0gPSAoY2h1bmtJZCwgbW9yZU1vZHVsZXMsIHJ1bnRpbWUpID0+IHtcblx0Zm9yKHZhciBtb2R1bGVJZCBpbiBtb3JlTW9kdWxlcykge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhtb3JlTW9kdWxlcywgbW9kdWxlSWQpKSB7XG5cdFx0XHRjdXJyZW50VXBkYXRlW21vZHVsZUlkXSA9IG1vcmVNb2R1bGVzW21vZHVsZUlkXTtcblx0XHRcdGlmKGN1cnJlbnRVcGRhdGVkTW9kdWxlc0xpc3QpIGN1cnJlbnRVcGRhdGVkTW9kdWxlc0xpc3QucHVzaChtb2R1bGVJZCk7XG5cdFx0fVxuXHR9XG5cdGlmKHJ1bnRpbWUpIGN1cnJlbnRVcGRhdGVSdW50aW1lLnB1c2gocnVudGltZSk7XG5cdGlmKHdhaXRpbmdVcGRhdGVSZXNvbHZlc1tjaHVua0lkXSkge1xuXHRcdHdhaXRpbmdVcGRhdGVSZXNvbHZlc1tjaHVua0lkXSgpO1xuXHRcdHdhaXRpbmdVcGRhdGVSZXNvbHZlc1tjaHVua0lkXSA9IHVuZGVmaW5lZDtcblx0fVxufTtcblxudmFyIGN1cnJlbnRVcGRhdGVDaHVua3M7XG52YXIgY3VycmVudFVwZGF0ZTtcbnZhciBjdXJyZW50VXBkYXRlUmVtb3ZlZENodW5rcztcbnZhciBjdXJyZW50VXBkYXRlUnVudGltZTtcbmZ1bmN0aW9uIGFwcGx5SGFuZGxlcihvcHRpb25zKSB7XG5cdGlmIChfX3dlYnBhY2tfcmVxdWlyZV9fLmYpIGRlbGV0ZSBfX3dlYnBhY2tfcmVxdWlyZV9fLmYuanNvbnBIbXI7XG5cdGN1cnJlbnRVcGRhdGVDaHVua3MgPSB1bmRlZmluZWQ7XG5cdGZ1bmN0aW9uIGdldEFmZmVjdGVkTW9kdWxlRWZmZWN0cyh1cGRhdGVNb2R1bGVJZCkge1xuXHRcdHZhciBvdXRkYXRlZE1vZHVsZXMgPSBbdXBkYXRlTW9kdWxlSWRdO1xuXHRcdHZhciBvdXRkYXRlZERlcGVuZGVuY2llcyA9IHt9O1xuXG5cdFx0dmFyIHF1ZXVlID0gb3V0ZGF0ZWRNb2R1bGVzLm1hcChmdW5jdGlvbiAoaWQpIHtcblx0XHRcdHJldHVybiB7XG5cdFx0XHRcdGNoYWluOiBbaWRdLFxuXHRcdFx0XHRpZDogaWRcblx0XHRcdH07XG5cdFx0fSk7XG5cdFx0d2hpbGUgKHF1ZXVlLmxlbmd0aCA+IDApIHtcblx0XHRcdHZhciBxdWV1ZUl0ZW0gPSBxdWV1ZS5wb3AoKTtcblx0XHRcdHZhciBtb2R1bGVJZCA9IHF1ZXVlSXRlbS5pZDtcblx0XHRcdHZhciBjaGFpbiA9IHF1ZXVlSXRlbS5jaGFpbjtcblx0XHRcdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLmNbbW9kdWxlSWRdO1xuXHRcdFx0aWYgKFxuXHRcdFx0XHQhbW9kdWxlIHx8XG5cdFx0XHRcdChtb2R1bGUuaG90Ll9zZWxmQWNjZXB0ZWQgJiYgIW1vZHVsZS5ob3QuX3NlbGZJbnZhbGlkYXRlZClcblx0XHRcdClcblx0XHRcdFx0Y29udGludWU7XG5cdFx0XHRpZiAobW9kdWxlLmhvdC5fc2VsZkRlY2xpbmVkKSB7XG5cdFx0XHRcdHJldHVybiB7XG5cdFx0XHRcdFx0dHlwZTogXCJzZWxmLWRlY2xpbmVkXCIsXG5cdFx0XHRcdFx0Y2hhaW46IGNoYWluLFxuXHRcdFx0XHRcdG1vZHVsZUlkOiBtb2R1bGVJZFxuXHRcdFx0XHR9O1xuXHRcdFx0fVxuXHRcdFx0aWYgKG1vZHVsZS5ob3QuX21haW4pIHtcblx0XHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0XHR0eXBlOiBcInVuYWNjZXB0ZWRcIixcblx0XHRcdFx0XHRjaGFpbjogY2hhaW4sXG5cdFx0XHRcdFx0bW9kdWxlSWQ6IG1vZHVsZUlkXG5cdFx0XHRcdH07XG5cdFx0XHR9XG5cdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IG1vZHVsZS5wYXJlbnRzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdHZhciBwYXJlbnRJZCA9IG1vZHVsZS5wYXJlbnRzW2ldO1xuXHRcdFx0XHR2YXIgcGFyZW50ID0gX193ZWJwYWNrX3JlcXVpcmVfXy5jW3BhcmVudElkXTtcblx0XHRcdFx0aWYgKCFwYXJlbnQpIGNvbnRpbnVlO1xuXHRcdFx0XHRpZiAocGFyZW50LmhvdC5fZGVjbGluZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdKSB7XG5cdFx0XHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0XHRcdHR5cGU6IFwiZGVjbGluZWRcIixcblx0XHRcdFx0XHRcdGNoYWluOiBjaGFpbi5jb25jYXQoW3BhcmVudElkXSksXG5cdFx0XHRcdFx0XHRtb2R1bGVJZDogbW9kdWxlSWQsXG5cdFx0XHRcdFx0XHRwYXJlbnRJZDogcGFyZW50SWRcblx0XHRcdFx0XHR9O1xuXHRcdFx0XHR9XG5cdFx0XHRcdGlmIChvdXRkYXRlZE1vZHVsZXMuaW5kZXhPZihwYXJlbnRJZCkgIT09IC0xKSBjb250aW51ZTtcblx0XHRcdFx0aWYgKHBhcmVudC5ob3QuX2FjY2VwdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXSkge1xuXHRcdFx0XHRcdGlmICghb3V0ZGF0ZWREZXBlbmRlbmNpZXNbcGFyZW50SWRdKVxuXHRcdFx0XHRcdFx0b3V0ZGF0ZWREZXBlbmRlbmNpZXNbcGFyZW50SWRdID0gW107XG5cdFx0XHRcdFx0YWRkQWxsVG9TZXQob3V0ZGF0ZWREZXBlbmRlbmNpZXNbcGFyZW50SWRdLCBbbW9kdWxlSWRdKTtcblx0XHRcdFx0XHRjb250aW51ZTtcblx0XHRcdFx0fVxuXHRcdFx0XHRkZWxldGUgb3V0ZGF0ZWREZXBlbmRlbmNpZXNbcGFyZW50SWRdO1xuXHRcdFx0XHRvdXRkYXRlZE1vZHVsZXMucHVzaChwYXJlbnRJZCk7XG5cdFx0XHRcdHF1ZXVlLnB1c2goe1xuXHRcdFx0XHRcdGNoYWluOiBjaGFpbi5jb25jYXQoW3BhcmVudElkXSksXG5cdFx0XHRcdFx0aWQ6IHBhcmVudElkXG5cdFx0XHRcdH0pO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiB7XG5cdFx0XHR0eXBlOiBcImFjY2VwdGVkXCIsXG5cdFx0XHRtb2R1bGVJZDogdXBkYXRlTW9kdWxlSWQsXG5cdFx0XHRvdXRkYXRlZE1vZHVsZXM6IG91dGRhdGVkTW9kdWxlcyxcblx0XHRcdG91dGRhdGVkRGVwZW5kZW5jaWVzOiBvdXRkYXRlZERlcGVuZGVuY2llc1xuXHRcdH07XG5cdH1cblxuXHRmdW5jdGlvbiBhZGRBbGxUb1NldChhLCBiKSB7XG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBiLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHR2YXIgaXRlbSA9IGJbaV07XG5cdFx0XHRpZiAoYS5pbmRleE9mKGl0ZW0pID09PSAtMSkgYS5wdXNoKGl0ZW0pO1xuXHRcdH1cblx0fVxuXG5cdC8vIGF0IGJlZ2luIGFsbCB1cGRhdGVzIG1vZHVsZXMgYXJlIG91dGRhdGVkXG5cdC8vIHRoZSBcIm91dGRhdGVkXCIgc3RhdHVzIGNhbiBwcm9wYWdhdGUgdG8gcGFyZW50cyBpZiB0aGV5IGRvbid0IGFjY2VwdCB0aGUgY2hpbGRyZW5cblx0dmFyIG91dGRhdGVkRGVwZW5kZW5jaWVzID0ge307XG5cdHZhciBvdXRkYXRlZE1vZHVsZXMgPSBbXTtcblx0dmFyIGFwcGxpZWRVcGRhdGUgPSB7fTtcblxuXHR2YXIgd2FyblVuZXhwZWN0ZWRSZXF1aXJlID0gZnVuY3Rpb24gd2FyblVuZXhwZWN0ZWRSZXF1aXJlKG1vZHVsZSkge1xuXHRcdGNvbnNvbGUud2Fybihcblx0XHRcdFwiW0hNUl0gdW5leHBlY3RlZCByZXF1aXJlKFwiICsgbW9kdWxlLmlkICsgXCIpIHRvIGRpc3Bvc2VkIG1vZHVsZVwiXG5cdFx0KTtcblx0fTtcblxuXHRmb3IgKHZhciBtb2R1bGVJZCBpbiBjdXJyZW50VXBkYXRlKSB7XG5cdFx0aWYgKF9fd2VicGFja19yZXF1aXJlX18ubyhjdXJyZW50VXBkYXRlLCBtb2R1bGVJZCkpIHtcblx0XHRcdHZhciBuZXdNb2R1bGVGYWN0b3J5ID0gY3VycmVudFVwZGF0ZVttb2R1bGVJZF07XG5cdFx0XHR2YXIgcmVzdWx0ID0gbmV3TW9kdWxlRmFjdG9yeVxuXHRcdFx0XHQ/IGdldEFmZmVjdGVkTW9kdWxlRWZmZWN0cyhtb2R1bGVJZClcblx0XHRcdFx0OiB7XG5cdFx0XHRcdFx0XHR0eXBlOiBcImRpc3Bvc2VkXCIsXG5cdFx0XHRcdFx0XHRtb2R1bGVJZDogbW9kdWxlSWRcblx0XHRcdFx0XHR9O1xuXHRcdFx0LyoqIEB0eXBlIHtFcnJvcnxmYWxzZX0gKi9cblx0XHRcdHZhciBhYm9ydEVycm9yID0gZmFsc2U7XG5cdFx0XHR2YXIgZG9BcHBseSA9IGZhbHNlO1xuXHRcdFx0dmFyIGRvRGlzcG9zZSA9IGZhbHNlO1xuXHRcdFx0dmFyIGNoYWluSW5mbyA9IFwiXCI7XG5cdFx0XHRpZiAocmVzdWx0LmNoYWluKSB7XG5cdFx0XHRcdGNoYWluSW5mbyA9IFwiXFxuVXBkYXRlIHByb3BhZ2F0aW9uOiBcIiArIHJlc3VsdC5jaGFpbi5qb2luKFwiIC0+IFwiKTtcblx0XHRcdH1cblx0XHRcdHN3aXRjaCAocmVzdWx0LnR5cGUpIHtcblx0XHRcdFx0Y2FzZSBcInNlbGYtZGVjbGluZWRcIjpcblx0XHRcdFx0XHRpZiAob3B0aW9ucy5vbkRlY2xpbmVkKSBvcHRpb25zLm9uRGVjbGluZWQocmVzdWx0KTtcblx0XHRcdFx0XHRpZiAoIW9wdGlvbnMuaWdub3JlRGVjbGluZWQpXG5cdFx0XHRcdFx0XHRhYm9ydEVycm9yID0gbmV3IEVycm9yKFxuXHRcdFx0XHRcdFx0XHRcIkFib3J0ZWQgYmVjYXVzZSBvZiBzZWxmIGRlY2xpbmU6IFwiICtcblx0XHRcdFx0XHRcdFx0XHRyZXN1bHQubW9kdWxlSWQgK1xuXHRcdFx0XHRcdFx0XHRcdGNoYWluSW5mb1xuXHRcdFx0XHRcdFx0KTtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0Y2FzZSBcImRlY2xpbmVkXCI6XG5cdFx0XHRcdFx0aWYgKG9wdGlvbnMub25EZWNsaW5lZCkgb3B0aW9ucy5vbkRlY2xpbmVkKHJlc3VsdCk7XG5cdFx0XHRcdFx0aWYgKCFvcHRpb25zLmlnbm9yZURlY2xpbmVkKVxuXHRcdFx0XHRcdFx0YWJvcnRFcnJvciA9IG5ldyBFcnJvcihcblx0XHRcdFx0XHRcdFx0XCJBYm9ydGVkIGJlY2F1c2Ugb2YgZGVjbGluZWQgZGVwZW5kZW5jeTogXCIgK1xuXHRcdFx0XHRcdFx0XHRcdHJlc3VsdC5tb2R1bGVJZCArXG5cdFx0XHRcdFx0XHRcdFx0XCIgaW4gXCIgK1xuXHRcdFx0XHRcdFx0XHRcdHJlc3VsdC5wYXJlbnRJZCArXG5cdFx0XHRcdFx0XHRcdFx0Y2hhaW5JbmZvXG5cdFx0XHRcdFx0XHQpO1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRjYXNlIFwidW5hY2NlcHRlZFwiOlxuXHRcdFx0XHRcdGlmIChvcHRpb25zLm9uVW5hY2NlcHRlZCkgb3B0aW9ucy5vblVuYWNjZXB0ZWQocmVzdWx0KTtcblx0XHRcdFx0XHRpZiAoIW9wdGlvbnMuaWdub3JlVW5hY2NlcHRlZClcblx0XHRcdFx0XHRcdGFib3J0RXJyb3IgPSBuZXcgRXJyb3IoXG5cdFx0XHRcdFx0XHRcdFwiQWJvcnRlZCBiZWNhdXNlIFwiICsgbW9kdWxlSWQgKyBcIiBpcyBub3QgYWNjZXB0ZWRcIiArIGNoYWluSW5mb1xuXHRcdFx0XHRcdFx0KTtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0Y2FzZSBcImFjY2VwdGVkXCI6XG5cdFx0XHRcdFx0aWYgKG9wdGlvbnMub25BY2NlcHRlZCkgb3B0aW9ucy5vbkFjY2VwdGVkKHJlc3VsdCk7XG5cdFx0XHRcdFx0ZG9BcHBseSA9IHRydWU7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdGNhc2UgXCJkaXNwb3NlZFwiOlxuXHRcdFx0XHRcdGlmIChvcHRpb25zLm9uRGlzcG9zZWQpIG9wdGlvbnMub25EaXNwb3NlZChyZXN1bHQpO1xuXHRcdFx0XHRcdGRvRGlzcG9zZSA9IHRydWU7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKFwiVW5leGNlcHRpb24gdHlwZSBcIiArIHJlc3VsdC50eXBlKTtcblx0XHRcdH1cblx0XHRcdGlmIChhYm9ydEVycm9yKSB7XG5cdFx0XHRcdHJldHVybiB7XG5cdFx0XHRcdFx0ZXJyb3I6IGFib3J0RXJyb3Jcblx0XHRcdFx0fTtcblx0XHRcdH1cblx0XHRcdGlmIChkb0FwcGx5KSB7XG5cdFx0XHRcdGFwcGxpZWRVcGRhdGVbbW9kdWxlSWRdID0gbmV3TW9kdWxlRmFjdG9yeTtcblx0XHRcdFx0YWRkQWxsVG9TZXQob3V0ZGF0ZWRNb2R1bGVzLCByZXN1bHQub3V0ZGF0ZWRNb2R1bGVzKTtcblx0XHRcdFx0Zm9yIChtb2R1bGVJZCBpbiByZXN1bHQub3V0ZGF0ZWREZXBlbmRlbmNpZXMpIHtcblx0XHRcdFx0XHRpZiAoX193ZWJwYWNrX3JlcXVpcmVfXy5vKHJlc3VsdC5vdXRkYXRlZERlcGVuZGVuY2llcywgbW9kdWxlSWQpKSB7XG5cdFx0XHRcdFx0XHRpZiAoIW91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXSlcblx0XHRcdFx0XHRcdFx0b3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdID0gW107XG5cdFx0XHRcdFx0XHRhZGRBbGxUb1NldChcblx0XHRcdFx0XHRcdFx0b3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdLFxuXHRcdFx0XHRcdFx0XHRyZXN1bHQub3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdXG5cdFx0XHRcdFx0XHQpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0aWYgKGRvRGlzcG9zZSkge1xuXHRcdFx0XHRhZGRBbGxUb1NldChvdXRkYXRlZE1vZHVsZXMsIFtyZXN1bHQubW9kdWxlSWRdKTtcblx0XHRcdFx0YXBwbGllZFVwZGF0ZVttb2R1bGVJZF0gPSB3YXJuVW5leHBlY3RlZFJlcXVpcmU7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cdGN1cnJlbnRVcGRhdGUgPSB1bmRlZmluZWQ7XG5cblx0Ly8gU3RvcmUgc2VsZiBhY2NlcHRlZCBvdXRkYXRlZCBtb2R1bGVzIHRvIHJlcXVpcmUgdGhlbSBsYXRlciBieSB0aGUgbW9kdWxlIHN5c3RlbVxuXHR2YXIgb3V0ZGF0ZWRTZWxmQWNjZXB0ZWRNb2R1bGVzID0gW107XG5cdGZvciAodmFyIGogPSAwOyBqIDwgb3V0ZGF0ZWRNb2R1bGVzLmxlbmd0aDsgaisrKSB7XG5cdFx0dmFyIG91dGRhdGVkTW9kdWxlSWQgPSBvdXRkYXRlZE1vZHVsZXNbal07XG5cdFx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19yZXF1aXJlX18uY1tvdXRkYXRlZE1vZHVsZUlkXTtcblx0XHRpZiAoXG5cdFx0XHRtb2R1bGUgJiZcblx0XHRcdChtb2R1bGUuaG90Ll9zZWxmQWNjZXB0ZWQgfHwgbW9kdWxlLmhvdC5fbWFpbikgJiZcblx0XHRcdC8vIHJlbW92ZWQgc2VsZi1hY2NlcHRlZCBtb2R1bGVzIHNob3VsZCBub3QgYmUgcmVxdWlyZWRcblx0XHRcdGFwcGxpZWRVcGRhdGVbb3V0ZGF0ZWRNb2R1bGVJZF0gIT09IHdhcm5VbmV4cGVjdGVkUmVxdWlyZSAmJlxuXHRcdFx0Ly8gd2hlbiBjYWxsZWQgaW52YWxpZGF0ZSBzZWxmLWFjY2VwdGluZyBpcyBub3QgcG9zc2libGVcblx0XHRcdCFtb2R1bGUuaG90Ll9zZWxmSW52YWxpZGF0ZWRcblx0XHQpIHtcblx0XHRcdG91dGRhdGVkU2VsZkFjY2VwdGVkTW9kdWxlcy5wdXNoKHtcblx0XHRcdFx0bW9kdWxlOiBvdXRkYXRlZE1vZHVsZUlkLFxuXHRcdFx0XHRyZXF1aXJlOiBtb2R1bGUuaG90Ll9yZXF1aXJlU2VsZixcblx0XHRcdFx0ZXJyb3JIYW5kbGVyOiBtb2R1bGUuaG90Ll9zZWxmQWNjZXB0ZWRcblx0XHRcdH0pO1xuXHRcdH1cblx0fVxuXG5cdHZhciBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcztcblxuXHRyZXR1cm4ge1xuXHRcdGRpc3Bvc2U6IGZ1bmN0aW9uICgpIHtcblx0XHRcdGN1cnJlbnRVcGRhdGVSZW1vdmVkQ2h1bmtzLmZvckVhY2goZnVuY3Rpb24gKGNodW5rSWQpIHtcblx0XHRcdFx0ZGVsZXRlIGluc3RhbGxlZENodW5rc1tjaHVua0lkXTtcblx0XHRcdH0pO1xuXHRcdFx0Y3VycmVudFVwZGF0ZVJlbW92ZWRDaHVua3MgPSB1bmRlZmluZWQ7XG5cblx0XHRcdHZhciBpZHg7XG5cdFx0XHR2YXIgcXVldWUgPSBvdXRkYXRlZE1vZHVsZXMuc2xpY2UoKTtcblx0XHRcdHdoaWxlIChxdWV1ZS5sZW5ndGggPiAwKSB7XG5cdFx0XHRcdHZhciBtb2R1bGVJZCA9IHF1ZXVlLnBvcCgpO1xuXHRcdFx0XHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX3JlcXVpcmVfXy5jW21vZHVsZUlkXTtcblx0XHRcdFx0aWYgKCFtb2R1bGUpIGNvbnRpbnVlO1xuXG5cdFx0XHRcdHZhciBkYXRhID0ge307XG5cblx0XHRcdFx0Ly8gQ2FsbCBkaXNwb3NlIGhhbmRsZXJzXG5cdFx0XHRcdHZhciBkaXNwb3NlSGFuZGxlcnMgPSBtb2R1bGUuaG90Ll9kaXNwb3NlSGFuZGxlcnM7XG5cdFx0XHRcdGZvciAoaiA9IDA7IGogPCBkaXNwb3NlSGFuZGxlcnMubGVuZ3RoOyBqKyspIHtcblx0XHRcdFx0XHRkaXNwb3NlSGFuZGxlcnNbal0uY2FsbChudWxsLCBkYXRhKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmhtckRbbW9kdWxlSWRdID0gZGF0YTtcblxuXHRcdFx0XHQvLyBkaXNhYmxlIG1vZHVsZSAodGhpcyBkaXNhYmxlcyByZXF1aXJlcyBmcm9tIHRoaXMgbW9kdWxlKVxuXHRcdFx0XHRtb2R1bGUuaG90LmFjdGl2ZSA9IGZhbHNlO1xuXG5cdFx0XHRcdC8vIHJlbW92ZSBtb2R1bGUgZnJvbSBjYWNoZVxuXHRcdFx0XHRkZWxldGUgX193ZWJwYWNrX3JlcXVpcmVfXy5jW21vZHVsZUlkXTtcblxuXHRcdFx0XHQvLyB3aGVuIGRpc3Bvc2luZyB0aGVyZSBpcyBubyBuZWVkIHRvIGNhbGwgZGlzcG9zZSBoYW5kbGVyXG5cdFx0XHRcdGRlbGV0ZSBvdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF07XG5cblx0XHRcdFx0Ly8gcmVtb3ZlIFwicGFyZW50c1wiIHJlZmVyZW5jZXMgZnJvbSBhbGwgY2hpbGRyZW5cblx0XHRcdFx0Zm9yIChqID0gMDsgaiA8IG1vZHVsZS5jaGlsZHJlbi5sZW5ndGg7IGorKykge1xuXHRcdFx0XHRcdHZhciBjaGlsZCA9IF9fd2VicGFja19yZXF1aXJlX18uY1ttb2R1bGUuY2hpbGRyZW5bal1dO1xuXHRcdFx0XHRcdGlmICghY2hpbGQpIGNvbnRpbnVlO1xuXHRcdFx0XHRcdGlkeCA9IGNoaWxkLnBhcmVudHMuaW5kZXhPZihtb2R1bGVJZCk7XG5cdFx0XHRcdFx0aWYgKGlkeCA+PSAwKSB7XG5cdFx0XHRcdFx0XHRjaGlsZC5wYXJlbnRzLnNwbGljZShpZHgsIDEpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHQvLyByZW1vdmUgb3V0ZGF0ZWQgZGVwZW5kZW5jeSBmcm9tIG1vZHVsZSBjaGlsZHJlblxuXHRcdFx0dmFyIGRlcGVuZGVuY3k7XG5cdFx0XHRmb3IgKHZhciBvdXRkYXRlZE1vZHVsZUlkIGluIG91dGRhdGVkRGVwZW5kZW5jaWVzKSB7XG5cdFx0XHRcdGlmIChfX3dlYnBhY2tfcmVxdWlyZV9fLm8ob3V0ZGF0ZWREZXBlbmRlbmNpZXMsIG91dGRhdGVkTW9kdWxlSWQpKSB7XG5cdFx0XHRcdFx0bW9kdWxlID0gX193ZWJwYWNrX3JlcXVpcmVfXy5jW291dGRhdGVkTW9kdWxlSWRdO1xuXHRcdFx0XHRcdGlmIChtb2R1bGUpIHtcblx0XHRcdFx0XHRcdG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzID1cblx0XHRcdFx0XHRcdFx0b3V0ZGF0ZWREZXBlbmRlbmNpZXNbb3V0ZGF0ZWRNb2R1bGVJZF07XG5cdFx0XHRcdFx0XHRmb3IgKGogPSAwOyBqIDwgbW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXMubGVuZ3RoOyBqKyspIHtcblx0XHRcdFx0XHRcdFx0ZGVwZW5kZW5jeSA9IG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzW2pdO1xuXHRcdFx0XHRcdFx0XHRpZHggPSBtb2R1bGUuY2hpbGRyZW4uaW5kZXhPZihkZXBlbmRlbmN5KTtcblx0XHRcdFx0XHRcdFx0aWYgKGlkeCA+PSAwKSBtb2R1bGUuY2hpbGRyZW4uc3BsaWNlKGlkeCwgMSk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fSxcblx0XHRhcHBseTogZnVuY3Rpb24gKHJlcG9ydEVycm9yKSB7XG5cdFx0XHR2YXIgYWNjZXB0UHJvbWlzZXMgPSBbXTtcblx0XHRcdC8vIGluc2VydCBuZXcgY29kZVxuXHRcdFx0Zm9yICh2YXIgdXBkYXRlTW9kdWxlSWQgaW4gYXBwbGllZFVwZGF0ZSkge1xuXHRcdFx0XHRpZiAoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGFwcGxpZWRVcGRhdGUsIHVwZGF0ZU1vZHVsZUlkKSkge1xuXHRcdFx0XHRcdF9fd2VicGFja19yZXF1aXJlX18ubVt1cGRhdGVNb2R1bGVJZF0gPSBhcHBsaWVkVXBkYXRlW3VwZGF0ZU1vZHVsZUlkXTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHQvLyBydW4gbmV3IHJ1bnRpbWUgbW9kdWxlc1xuXHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBjdXJyZW50VXBkYXRlUnVudGltZS5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHRjdXJyZW50VXBkYXRlUnVudGltZVtpXShfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gY2FsbCBhY2NlcHQgaGFuZGxlcnNcblx0XHRcdGZvciAodmFyIG91dGRhdGVkTW9kdWxlSWQgaW4gb3V0ZGF0ZWREZXBlbmRlbmNpZXMpIHtcblx0XHRcdFx0aWYgKF9fd2VicGFja19yZXF1aXJlX18ubyhvdXRkYXRlZERlcGVuZGVuY2llcywgb3V0ZGF0ZWRNb2R1bGVJZCkpIHtcblx0XHRcdFx0XHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX3JlcXVpcmVfXy5jW291dGRhdGVkTW9kdWxlSWRdO1xuXHRcdFx0XHRcdGlmIChtb2R1bGUpIHtcblx0XHRcdFx0XHRcdG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzID1cblx0XHRcdFx0XHRcdFx0b3V0ZGF0ZWREZXBlbmRlbmNpZXNbb3V0ZGF0ZWRNb2R1bGVJZF07XG5cdFx0XHRcdFx0XHR2YXIgY2FsbGJhY2tzID0gW107XG5cdFx0XHRcdFx0XHR2YXIgZXJyb3JIYW5kbGVycyA9IFtdO1xuXHRcdFx0XHRcdFx0dmFyIGRlcGVuZGVuY2llc0ZvckNhbGxiYWNrcyA9IFtdO1xuXHRcdFx0XHRcdFx0Zm9yICh2YXIgaiA9IDA7IGogPCBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcy5sZW5ndGg7IGorKykge1xuXHRcdFx0XHRcdFx0XHR2YXIgZGVwZW5kZW5jeSA9IG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzW2pdO1xuXHRcdFx0XHRcdFx0XHR2YXIgYWNjZXB0Q2FsbGJhY2sgPVxuXHRcdFx0XHRcdFx0XHRcdG1vZHVsZS5ob3QuX2FjY2VwdGVkRGVwZW5kZW5jaWVzW2RlcGVuZGVuY3ldO1xuXHRcdFx0XHRcdFx0XHR2YXIgZXJyb3JIYW5kbGVyID1cblx0XHRcdFx0XHRcdFx0XHRtb2R1bGUuaG90Ll9hY2NlcHRlZEVycm9ySGFuZGxlcnNbZGVwZW5kZW5jeV07XG5cdFx0XHRcdFx0XHRcdGlmIChhY2NlcHRDYWxsYmFjaykge1xuXHRcdFx0XHRcdFx0XHRcdGlmIChjYWxsYmFja3MuaW5kZXhPZihhY2NlcHRDYWxsYmFjaykgIT09IC0xKSBjb250aW51ZTtcblx0XHRcdFx0XHRcdFx0XHRjYWxsYmFja3MucHVzaChhY2NlcHRDYWxsYmFjayk7XG5cdFx0XHRcdFx0XHRcdFx0ZXJyb3JIYW5kbGVycy5wdXNoKGVycm9ySGFuZGxlcik7XG5cdFx0XHRcdFx0XHRcdFx0ZGVwZW5kZW5jaWVzRm9yQ2FsbGJhY2tzLnB1c2goZGVwZW5kZW5jeSk7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdGZvciAodmFyIGsgPSAwOyBrIDwgY2FsbGJhY2tzLmxlbmd0aDsgaysrKSB7XG5cdFx0XHRcdFx0XHRcdHZhciByZXN1bHQ7XG5cdFx0XHRcdFx0XHRcdHRyeSB7XG5cdFx0XHRcdFx0XHRcdFx0cmVzdWx0ID0gY2FsbGJhY2tzW2tdLmNhbGwobnVsbCwgbW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXMpO1xuXHRcdFx0XHRcdFx0XHR9IGNhdGNoIChlcnIpIHtcblx0XHRcdFx0XHRcdFx0XHRpZiAodHlwZW9mIGVycm9ySGFuZGxlcnNba10gPT09IFwiZnVuY3Rpb25cIikge1xuXHRcdFx0XHRcdFx0XHRcdFx0dHJ5IHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0ZXJyb3JIYW5kbGVyc1trXShlcnIsIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRtb2R1bGVJZDogb3V0ZGF0ZWRNb2R1bGVJZCxcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRkZXBlbmRlbmN5SWQ6IGRlcGVuZGVuY2llc0ZvckNhbGxiYWNrc1trXVxuXHRcdFx0XHRcdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRcdFx0XHRcdH0gY2F0Y2ggKGVycjIpIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25FcnJvcmVkKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0b3B0aW9ucy5vbkVycm9yZWQoe1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0dHlwZTogXCJhY2NlcHQtZXJyb3ItaGFuZGxlci1lcnJvcmVkXCIsXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRtb2R1bGVJZDogb3V0ZGF0ZWRNb2R1bGVJZCxcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdGRlcGVuZGVuY3lJZDogZGVwZW5kZW5jaWVzRm9yQ2FsbGJhY2tzW2tdLFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0ZXJyb3I6IGVycjIsXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRvcmlnaW5hbEVycm9yOiBlcnJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdFx0XHRpZiAoIW9wdGlvbnMuaWdub3JlRXJyb3JlZCkge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdHJlcG9ydEVycm9yKGVycjIpO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdHJlcG9ydEVycm9yKGVycik7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25FcnJvcmVkKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdG9wdGlvbnMub25FcnJvcmVkKHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHR0eXBlOiBcImFjY2VwdC1lcnJvcmVkXCIsXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0bW9kdWxlSWQ6IG91dGRhdGVkTW9kdWxlSWQsXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0ZGVwZW5kZW5jeUlkOiBkZXBlbmRlbmNpZXNGb3JDYWxsYmFja3Nba10sXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0ZXJyb3I6IGVyclxuXHRcdFx0XHRcdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHRcdGlmICghb3B0aW9ucy5pZ25vcmVFcnJvcmVkKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdHJlcG9ydEVycm9yKGVycik7XG5cdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdGlmIChyZXN1bHQgJiYgdHlwZW9mIHJlc3VsdC50aGVuID09PSBcImZ1bmN0aW9uXCIpIHtcblx0XHRcdFx0XHRcdFx0XHRhY2NlcHRQcm9taXNlcy5wdXNoKHJlc3VsdCk7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0dmFyIG9uQWNjZXB0ZWQgPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdC8vIExvYWQgc2VsZiBhY2NlcHRlZCBtb2R1bGVzXG5cdFx0XHRcdGZvciAodmFyIG8gPSAwOyBvIDwgb3V0ZGF0ZWRTZWxmQWNjZXB0ZWRNb2R1bGVzLmxlbmd0aDsgbysrKSB7XG5cdFx0XHRcdFx0dmFyIGl0ZW0gPSBvdXRkYXRlZFNlbGZBY2NlcHRlZE1vZHVsZXNbb107XG5cdFx0XHRcdFx0dmFyIG1vZHVsZUlkID0gaXRlbS5tb2R1bGU7XG5cdFx0XHRcdFx0dHJ5IHtcblx0XHRcdFx0XHRcdGl0ZW0ucmVxdWlyZShtb2R1bGVJZCk7XG5cdFx0XHRcdFx0fSBjYXRjaCAoZXJyKSB7XG5cdFx0XHRcdFx0XHRpZiAodHlwZW9mIGl0ZW0uZXJyb3JIYW5kbGVyID09PSBcImZ1bmN0aW9uXCIpIHtcblx0XHRcdFx0XHRcdFx0dHJ5IHtcblx0XHRcdFx0XHRcdFx0XHRpdGVtLmVycm9ySGFuZGxlcihlcnIsIHtcblx0XHRcdFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBtb2R1bGVJZCxcblx0XHRcdFx0XHRcdFx0XHRcdG1vZHVsZTogX193ZWJwYWNrX3JlcXVpcmVfXy5jW21vZHVsZUlkXVxuXHRcdFx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdFx0XHR9IGNhdGNoIChlcnIxKSB7XG5cdFx0XHRcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25FcnJvcmVkKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRvcHRpb25zLm9uRXJyb3JlZCh7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdHR5cGU6IFwic2VsZi1hY2NlcHQtZXJyb3ItaGFuZGxlci1lcnJvcmVkXCIsXG5cdFx0XHRcdFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBtb2R1bGVJZCxcblx0XHRcdFx0XHRcdFx0XHRcdFx0ZXJyb3I6IGVycjEsXG5cdFx0XHRcdFx0XHRcdFx0XHRcdG9yaWdpbmFsRXJyb3I6IGVyclxuXHRcdFx0XHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdGlmICghb3B0aW9ucy5pZ25vcmVFcnJvcmVkKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRyZXBvcnRFcnJvcihlcnIxKTtcblx0XHRcdFx0XHRcdFx0XHRcdHJlcG9ydEVycm9yKGVycik7XG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vbkVycm9yZWQpIHtcblx0XHRcdFx0XHRcdFx0XHRvcHRpb25zLm9uRXJyb3JlZCh7XG5cdFx0XHRcdFx0XHRcdFx0XHR0eXBlOiBcInNlbGYtYWNjZXB0LWVycm9yZWRcIixcblx0XHRcdFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBtb2R1bGVJZCxcblx0XHRcdFx0XHRcdFx0XHRcdGVycm9yOiBlcnJcblx0XHRcdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRpZiAoIW9wdGlvbnMuaWdub3JlRXJyb3JlZCkge1xuXHRcdFx0XHRcdFx0XHRcdHJlcG9ydEVycm9yKGVycik7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH07XG5cblx0XHRcdHJldHVybiBQcm9taXNlLmFsbChhY2NlcHRQcm9taXNlcylcblx0XHRcdFx0LnRoZW4ob25BY2NlcHRlZClcblx0XHRcdFx0LnRoZW4oZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRcdHJldHVybiBvdXRkYXRlZE1vZHVsZXM7XG5cdFx0XHRcdH0pO1xuXHRcdH1cblx0fTtcbn1cbl9fd2VicGFja19yZXF1aXJlX18uaG1ySS5qc29ucCA9IGZ1bmN0aW9uIChtb2R1bGVJZCwgYXBwbHlIYW5kbGVycykge1xuXHRpZiAoIWN1cnJlbnRVcGRhdGUpIHtcblx0XHRjdXJyZW50VXBkYXRlID0ge307XG5cdFx0Y3VycmVudFVwZGF0ZVJ1bnRpbWUgPSBbXTtcblx0XHRjdXJyZW50VXBkYXRlUmVtb3ZlZENodW5rcyA9IFtdO1xuXHRcdGFwcGx5SGFuZGxlcnMucHVzaChhcHBseUhhbmRsZXIpO1xuXHR9XG5cdGlmICghX193ZWJwYWNrX3JlcXVpcmVfXy5vKGN1cnJlbnRVcGRhdGUsIG1vZHVsZUlkKSkge1xuXHRcdGN1cnJlbnRVcGRhdGVbbW9kdWxlSWRdID0gX193ZWJwYWNrX3JlcXVpcmVfXy5tW21vZHVsZUlkXTtcblx0fVxufTtcbl9fd2VicGFja19yZXF1aXJlX18uaG1yQy5qc29ucCA9IGZ1bmN0aW9uIChcblx0Y2h1bmtJZHMsXG5cdHJlbW92ZWRDaHVua3MsXG5cdHJlbW92ZWRNb2R1bGVzLFxuXHRwcm9taXNlcyxcblx0YXBwbHlIYW5kbGVycyxcblx0dXBkYXRlZE1vZHVsZXNMaXN0XG4pIHtcblx0YXBwbHlIYW5kbGVycy5wdXNoKGFwcGx5SGFuZGxlcik7XG5cdGN1cnJlbnRVcGRhdGVDaHVua3MgPSB7fTtcblx0Y3VycmVudFVwZGF0ZVJlbW92ZWRDaHVua3MgPSByZW1vdmVkQ2h1bmtzO1xuXHRjdXJyZW50VXBkYXRlID0gcmVtb3ZlZE1vZHVsZXMucmVkdWNlKGZ1bmN0aW9uIChvYmosIGtleSkge1xuXHRcdG9ialtrZXldID0gZmFsc2U7XG5cdFx0cmV0dXJuIG9iajtcblx0fSwge30pO1xuXHRjdXJyZW50VXBkYXRlUnVudGltZSA9IFtdO1xuXHRjaHVua0lkcy5mb3JFYWNoKGZ1bmN0aW9uIChjaHVua0lkKSB7XG5cdFx0aWYgKFxuXHRcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vKGluc3RhbGxlZENodW5rcywgY2h1bmtJZCkgJiZcblx0XHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXSAhPT0gdW5kZWZpbmVkXG5cdFx0KSB7XG5cdFx0XHRwcm9taXNlcy5wdXNoKGxvYWRVcGRhdGVDaHVuayhjaHVua0lkLCB1cGRhdGVkTW9kdWxlc0xpc3QpKTtcblx0XHRcdGN1cnJlbnRVcGRhdGVDaHVua3NbY2h1bmtJZF0gPSB0cnVlO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRjdXJyZW50VXBkYXRlQ2h1bmtzW2NodW5rSWRdID0gZmFsc2U7XG5cdFx0fVxuXHR9KTtcblx0aWYgKF9fd2VicGFja19yZXF1aXJlX18uZikge1xuXHRcdF9fd2VicGFja19yZXF1aXJlX18uZi5qc29ucEhtciA9IGZ1bmN0aW9uIChjaHVua0lkLCBwcm9taXNlcykge1xuXHRcdFx0aWYgKFxuXHRcdFx0XHRjdXJyZW50VXBkYXRlQ2h1bmtzICYmXG5cdFx0XHRcdF9fd2VicGFja19yZXF1aXJlX18ubyhjdXJyZW50VXBkYXRlQ2h1bmtzLCBjaHVua0lkKSAmJlxuXHRcdFx0XHQhY3VycmVudFVwZGF0ZUNodW5rc1tjaHVua0lkXVxuXHRcdFx0KSB7XG5cdFx0XHRcdHByb21pc2VzLnB1c2gobG9hZFVwZGF0ZUNodW5rKGNodW5rSWQpKTtcblx0XHRcdFx0Y3VycmVudFVwZGF0ZUNodW5rc1tjaHVua0lkXSA9IHRydWU7XG5cdFx0XHR9XG5cdFx0fTtcblx0fVxufTtcblxuX193ZWJwYWNrX3JlcXVpcmVfXy5obXJNID0gKCkgPT4ge1xuXHRpZiAodHlwZW9mIGZldGNoID09PSBcInVuZGVmaW5lZFwiKSB0aHJvdyBuZXcgRXJyb3IoXCJObyBicm93c2VyIHN1cHBvcnQ6IG5lZWQgZmV0Y2ggQVBJXCIpO1xuXHRyZXR1cm4gZmV0Y2goX193ZWJwYWNrX3JlcXVpcmVfXy5wICsgX193ZWJwYWNrX3JlcXVpcmVfXy5obXJGKCkpLnRoZW4oKHJlc3BvbnNlKSA9PiB7XG5cdFx0aWYocmVzcG9uc2Uuc3RhdHVzID09PSA0MDQpIHJldHVybjsgLy8gbm8gdXBkYXRlIGF2YWlsYWJsZVxuXHRcdGlmKCFyZXNwb25zZS5vaykgdGhyb3cgbmV3IEVycm9yKFwiRmFpbGVkIHRvIGZldGNoIHVwZGF0ZSBtYW5pZmVzdCBcIiArIHJlc3BvbnNlLnN0YXR1c1RleHQpO1xuXHRcdHJldHVybiByZXNwb25zZS5qc29uKCk7XG5cdH0pO1xufTtcblxuLy8gbm8gb24gY2h1bmtzIGxvYWRlZFxuXG4vLyBubyBqc29ucCBmdW5jdGlvbiIsIiIsIi8vIG1vZHVsZSBjYWNoZSBhcmUgdXNlZCBzbyBlbnRyeSBpbmxpbmluZyBpcyBkaXNhYmxlZFxuLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9ub2RlX21vZHVsZXMvd2VicGFjay1kZXYtc2VydmVyL2NsaWVudC9pbmRleC5qcz9wcm90b2NvbD13cyUzQSZob3N0bmFtZT0wLjAuMC4wJnBvcnQ9ODA4MCZwYXRobmFtZT0lMkZ3cyZsb2dnaW5nPWluZm8mb3ZlcmxheT10cnVlJnJlY29ubmVjdD0xMCZob3Q9dHJ1ZSZsaXZlLXJlbG9hZD10cnVlXCIpO1xuX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vbm9kZV9tb2R1bGVzL3dlYnBhY2svaG90L2Rldi1zZXJ2ZXIuanNcIik7XG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18oXCIuL2FwcC9jcml0aWNhbC5qc1wiKTtcbiIsIiJdLCJuYW1lcyI6WyJjb25zb2xlIiwibG9nIiwibW9kdWxlIiwiZXhwb3J0cyIsImFuc2lIVE1MIiwiX3JlZ0FOU0kiLCJfZGVmQ29sb3JzIiwicmVzZXQiLCJibGFjayIsInJlZCIsImdyZWVuIiwieWVsbG93IiwiYmx1ZSIsIm1hZ2VudGEiLCJjeWFuIiwibGlnaHRncmV5IiwiZGFya2dyZXkiLCJfc3R5bGVzIiwiX29wZW5UYWdzIiwiX2Nsb3NlVGFncyIsImZvckVhY2giLCJuIiwidGV4dCIsInRlc3QiLCJhbnNpQ29kZXMiLCJyZXQiLCJyZXBsYWNlIiwibWF0Y2giLCJzZXEiLCJvdCIsImluZGV4T2YiLCJwb3AiLCJwdXNoIiwiY3QiLCJsIiwibGVuZ3RoIiwiQXJyYXkiLCJqb2luIiwic2V0Q29sb3JzIiwiY29sb3JzIiwiRXJyb3IiLCJfZmluYWxDb2xvcnMiLCJrZXkiLCJoZXgiLCJoYXNPd25Qcm9wZXJ0eSIsImlzQXJyYXkiLCJzb21lIiwiaCIsImRlZkhleENvbG9yIiwic2xpY2UiLCJfc2V0VGFncyIsInRhZ3MiLCJPYmplY3QiLCJkZWZpbmVQcm9wZXJ0eSIsImdldCIsIm9wZW4iLCJjbG9zZSIsImNvZGUiLCJjb2xvciIsIm9yaUNvbG9yIiwicGFyc2VJbnQiLCJ0b1N0cmluZyIsIlIiLCJSZWZsZWN0IiwiUmVmbGVjdEFwcGx5IiwiYXBwbHkiLCJ0YXJnZXQiLCJyZWNlaXZlciIsImFyZ3MiLCJGdW5jdGlvbiIsInByb3RvdHlwZSIsImNhbGwiLCJSZWZsZWN0T3duS2V5cyIsIm93bktleXMiLCJnZXRPd25Qcm9wZXJ0eVN5bWJvbHMiLCJnZXRPd25Qcm9wZXJ0eU5hbWVzIiwiY29uY2F0IiwiUHJvY2Vzc0VtaXRXYXJuaW5nIiwid2FybmluZyIsIndhcm4iLCJOdW1iZXJJc05hTiIsIk51bWJlciIsImlzTmFOIiwidmFsdWUiLCJFdmVudEVtaXR0ZXIiLCJpbml0Iiwib25jZSIsIl9ldmVudHMiLCJ1bmRlZmluZWQiLCJfZXZlbnRzQ291bnQiLCJfbWF4TGlzdGVuZXJzIiwiZGVmYXVsdE1heExpc3RlbmVycyIsImNoZWNrTGlzdGVuZXIiLCJsaXN0ZW5lciIsIlR5cGVFcnJvciIsImVudW1lcmFibGUiLCJzZXQiLCJhcmciLCJSYW5nZUVycm9yIiwiZ2V0UHJvdG90eXBlT2YiLCJjcmVhdGUiLCJzZXRNYXhMaXN0ZW5lcnMiLCJfZ2V0TWF4TGlzdGVuZXJzIiwidGhhdCIsImdldE1heExpc3RlbmVycyIsImVtaXQiLCJ0eXBlIiwiaSIsImFyZ3VtZW50cyIsImRvRXJyb3IiLCJldmVudHMiLCJlcnJvciIsImVyIiwiZXJyIiwibWVzc2FnZSIsImNvbnRleHQiLCJoYW5kbGVyIiwibGVuIiwibGlzdGVuZXJzIiwiYXJyYXlDbG9uZSIsIl9hZGRMaXN0ZW5lciIsInByZXBlbmQiLCJtIiwiZXhpc3RpbmciLCJuZXdMaXN0ZW5lciIsInVuc2hpZnQiLCJ3YXJuZWQiLCJ3IiwiU3RyaW5nIiwibmFtZSIsImVtaXR0ZXIiLCJjb3VudCIsImFkZExpc3RlbmVyIiwib24iLCJwcmVwZW5kTGlzdGVuZXIiLCJvbmNlV3JhcHBlciIsImZpcmVkIiwicmVtb3ZlTGlzdGVuZXIiLCJ3cmFwRm4iLCJfb25jZVdyYXAiLCJzdGF0ZSIsIndyYXBwZWQiLCJiaW5kIiwicHJlcGVuZE9uY2VMaXN0ZW5lciIsImxpc3QiLCJwb3NpdGlvbiIsIm9yaWdpbmFsTGlzdGVuZXIiLCJzaGlmdCIsInNwbGljZU9uZSIsIm9mZiIsInJlbW92ZUFsbExpc3RlbmVycyIsImtleXMiLCJfbGlzdGVuZXJzIiwidW53cmFwIiwiZXZsaXN0ZW5lciIsInVud3JhcExpc3RlbmVycyIsInJhd0xpc3RlbmVycyIsImxpc3RlbmVyQ291bnQiLCJldmVudE5hbWVzIiwiYXJyIiwiY29weSIsImluZGV4IiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJlcnJvckxpc3RlbmVyIiwicmVzb2x2ZXIiLCJldmVudFRhcmdldEFnbm9zdGljQWRkTGlzdGVuZXIiLCJhZGRFcnJvckhhbmRsZXJJZkV2ZW50RW1pdHRlciIsImZsYWdzIiwiYWRkRXZlbnRMaXN0ZW5lciIsIndyYXBMaXN0ZW5lciIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJfdHlwZW9mIiwibyIsIlN5bWJvbCIsIml0ZXJhdG9yIiwiY29uc3RydWN0b3IiLCJfY2xhc3NDYWxsQ2hlY2siLCJhIiwiX2RlZmluZVByb3BlcnRpZXMiLCJlIiwiciIsInQiLCJjb25maWd1cmFibGUiLCJ3cml0YWJsZSIsIl90b1Byb3BlcnR5S2V5IiwiX2NyZWF0ZUNsYXNzIiwiX3RvUHJpbWl0aXZlIiwidG9QcmltaXRpdmUiLCJXZWJTb2NrZXRDbGllbnQiLCJ1cmwiLCJjbGllbnQiLCJXZWJTb2NrZXQiLCJvbmVycm9yIiwib25PcGVuIiwiZiIsIm9ub3BlbiIsIm9uQ2xvc2UiLCJvbmNsb3NlIiwib25NZXNzYWdlIiwib25tZXNzYWdlIiwiZGF0YSIsImRlZmF1bHQiLCJmaWx0ZXIiLCJnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IiLCJfb2JqZWN0U3ByZWFkIiwiX2RlZmluZVByb3BlcnR5IiwiZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9ycyIsImRlZmluZVByb3BlcnRpZXMiLCJ3ZWJwYWNrSG90TG9nIiwiaG90RW1pdHRlciIsInNvY2tldCIsImZvcm1hdFByb2JsZW0iLCJjcmVhdGVPdmVybGF5Iiwic2V0TG9nTGV2ZWwiLCJzZW5kTWVzc2FnZSIsImlzUHJvZ3Jlc3NTdXBwb3J0ZWQiLCJkZWZpbmVQcm9ncmVzc0VsZW1lbnQiLCJkZWNvZGVPdmVybGF5T3B0aW9ucyIsIm92ZXJsYXlPcHRpb25zIiwicHJvcGVydHkiLCJvdmVybGF5RmlsdGVyRnVuY3Rpb25TdHJpbmciLCJkZWNvZGVVUklDb21wb25lbnQiLCJzdGF0dXMiLCJpc1VubG9hZGluZyIsImN1cnJlbnRIYXNoIiwiX193ZWJwYWNrX2hhc2hfXyIsImdldEN1cnJlbnRTY3JpcHRTb3VyY2UiLCJkb2N1bWVudCIsImN1cnJlbnRTY3JpcHQiLCJnZXRBdHRyaWJ1dGUiLCJzY3JpcHRFbGVtZW50cyIsInNjcmlwdHMiLCJzY3JpcHRFbGVtZW50c1dpdGhTcmMiLCJlbGVtZW50IiwicGFyc2VVUkwiLCJyZXNvdXJjZVF1ZXJ5IiwicmVzdWx0Iiwic2VhcmNoUGFyYW1zIiwic3BsaXQiLCJwYWlyIiwic2NyaXB0U291cmNlIiwic2NyaXB0U291cmNlVVJMIiwiVVJMIiwic2VsZiIsImxvY2F0aW9uIiwiaHJlZiIsImZyb21DdXJyZW50U2NyaXB0IiwicGFyc2VkUmVzb3VyY2VRdWVyeSIsIl9fcmVzb3VyY2VRdWVyeSIsImVuYWJsZWRGZWF0dXJlcyIsIlByb2dyZXNzIiwiT3ZlcmxheSIsIm9wdGlvbnMiLCJob3QiLCJsaXZlUmVsb2FkIiwicHJvZ3Jlc3MiLCJvdmVybGF5IiwiSlNPTiIsInBhcnNlIiwiZXJyb3JzIiwid2FybmluZ3MiLCJydW50aW1lRXJyb3JzIiwibG9nZ2luZyIsInJlY29ubmVjdCIsInNldEFsbExvZ0xldmVsIiwibGV2ZWwiLCJsb2dFbmFibGVkRmVhdHVyZXMiLCJmZWF0dXJlcyIsImxpc3RFbmFibGVkRmVhdHVyZXMiLCJsb2dTdHJpbmciLCJpbmZvIiwid2luZG93IiwidHJ1c3RlZFR5cGVzUG9saWN5TmFtZSIsImNhdGNoUnVudGltZUVycm9yIiwic2VuZCIsInJlbG9hZEFwcCIsIl9yZWYiLCJjdXJyZW50U3RhdHVzIiwicHJldmlvdXNIYXNoIiwiaXNJbml0aWFsIiwiYXBwbHlSZWxvYWQiLCJyb290V2luZG93IiwiaW50ZXJ2YWxJZCIsImNsZWFySW50ZXJ2YWwiLCJyZWxvYWQiLCJzZWFyY2giLCJ0b0xvd2VyQ2FzZSIsImFsbG93VG9Ib3QiLCJhbGxvd1RvTGl2ZVJlbG9hZCIsInBvc3RNZXNzYWdlIiwic2V0SW50ZXJ2YWwiLCJwcm90b2NvbCIsInBhcmVudCIsImFuc2lSZWdleCIsIlJlZ0V4cCIsInN0cmlwQW5zaSIsInN0cmluZyIsIm9uU29ja2V0TWVzc2FnZSIsImludmFsaWQiLCJoYXNoIiwiX2hhc2giLCJwcm9ncmVzc1VwZGF0ZSIsInBsdWdpbk5hbWUiLCJwZXJjZW50IiwibXNnIiwicXVlcnlTZWxlY3RvciIsImNyZWF0ZUVsZW1lbnQiLCJib2R5IiwiYXBwZW5kQ2hpbGQiLCJzZXRBdHRyaWJ1dGUiLCJzdGlsbE9rIiwib2siLCJzdGF0aWNDaGFuZ2VkIiwiZmlsZSIsIl93YXJuaW5ncyIsInBhcmFtcyIsInByaW50YWJsZVdhcm5pbmdzIiwibWFwIiwiX2Zvcm1hdFByb2JsZW0iLCJoZWFkZXIiLCJvdmVybGF5V2FybmluZ3NTZXR0aW5nIiwid2FybmluZ3NUb0Rpc3BsYXkiLCJtZXNzYWdlcyIsInByZXZlbnRSZWxvYWRpbmciLCJfZXJyb3JzIiwicHJpbnRhYmxlRXJyb3JzIiwiX2Zvcm1hdFByb2JsZW0yIiwib3ZlcmxheUVycm9yc1NldHRpbmdzIiwiZXJyb3JzVG9EaXNwbGF5IiwiX2Vycm9yIiwiZm9ybWF0VVJMIiwib2JqVVJMIiwic3Vic3RyIiwiYXV0aCIsImVuY29kZVVSSUNvbXBvbmVudCIsImhvc3QiLCJob3N0bmFtZSIsInBvcnQiLCJwYXRobmFtZSIsInNsYXNoZXMiLCJjaGFyQXQiLCJjcmVhdGVTb2NrZXRVUkwiLCJwYXJzZWRVUkwiLCJpc0luQWRkckFueSIsInNvY2tldFVSTFByb3RvY29sIiwic29ja2V0VVJMQXV0aCIsInVzZXJuYW1lIiwicGFzc3dvcmQiLCJzb2NrZXRVUkxIb3N0bmFtZSIsInNvY2tldFVSTFBvcnQiLCJzb2NrZXRVUkxQYXRobmFtZSIsInNvY2tldFVSTCIsIl9fd2VicGFja19tb2R1bGVzX18iLCIuL2NsaWVudC1zcmMvbW9kdWxlcy9sb2dnZXIvdGFwYWJsZS5qcyIsIl9fdW51c2VkX3dlYnBhY2tfbW9kdWxlIiwiX193ZWJwYWNrX2V4cG9ydHNfXyIsIl9fd2VicGFja19yZXF1aXJlX18iLCJkIiwiU3luY0JhaWxIb29rIiwiLi9ub2RlX21vZHVsZXMvd2VicGFjay9saWIvbG9nZ2luZy9Mb2dnZXIuanMiLCJfdG9Db25zdW1hYmxlQXJyYXkiLCJfYXJyYXlXaXRob3V0SG9sZXMiLCJfaXRlcmFibGVUb0FycmF5IiwiX3Vuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5IiwiX25vbkl0ZXJhYmxlU3ByZWFkIiwiX2FycmF5TGlrZVRvQXJyYXkiLCJmcm9tIiwiTG9nVHlwZSIsImZyZWV6ZSIsImRlYnVnIiwidHJhY2UiLCJncm91cCIsImdyb3VwQ29sbGFwc2VkIiwiZ3JvdXBFbmQiLCJwcm9maWxlIiwicHJvZmlsZUVuZCIsInRpbWUiLCJjbGVhciIsIkxPR19TWU1CT0wiLCJUSU1FUlNfU1lNQk9MIiwiVElNRVJTX0FHR1JFR0FURVNfU1lNQk9MIiwiV2VicGFja0xvZ2dlciIsImdldENoaWxkTG9nZ2VyIiwiX2xlbiIsIl9rZXkiLCJfbGVuMiIsIl9rZXkyIiwiX2xlbjMiLCJfa2V5MyIsIl9sZW40IiwiX2tleTQiLCJfbGVuNSIsIl9rZXk1IiwiYXNzZXJ0IiwiYXNzZXJ0aW9uIiwiX2xlbjYiLCJfa2V5NiIsIl9sZW43IiwiX2tleTciLCJfbGVuOCIsIl9rZXk4IiwiX2xlbjkiLCJfa2V5OSIsImxhYmVsIiwiTWFwIiwicHJvY2VzcyIsImhydGltZSIsInRpbWVMb2ciLCJwcmV2IiwidGltZUVuZCIsImRlbGV0ZSIsInRpbWVBZ2dyZWdhdGUiLCJjdXJyZW50IiwidGltZUFnZ3JlZ2F0ZUVuZCIsIkxvZ2dlciIsIi4vbm9kZV9tb2R1bGVzL3dlYnBhY2svbGliL2xvZ2dpbmcvY3JlYXRlQ29uc29sZUxvZ2dlci5qcyIsIl9fdW51c2VkX3dlYnBhY2tfZXhwb3J0cyIsIl9zbGljZWRUb0FycmF5IiwiX2FycmF5V2l0aEhvbGVzIiwiX2l0ZXJhYmxlVG9BcnJheUxpbWl0IiwiX25vbkl0ZXJhYmxlUmVzdCIsInUiLCJuZXh0IiwiZG9uZSIsInJldHVybiIsIl9yZXF1aXJlIiwiZmlsdGVyVG9GdW5jdGlvbiIsIml0ZW0iLCJyZWdFeHAiLCJpZGVudCIsIkxvZ0xldmVsIiwibm9uZSIsImZhbHNlIiwidHJ1ZSIsInZlcmJvc2UiLCJfcmVmJGxldmVsIiwiX3JlZiRkZWJ1ZyIsImRlYnVnRmlsdGVycyIsImxvZ2xldmVsIiwibG9nZ2VyIiwibGFiZWxlZEFyZ3MiLCJfYXJncyIsInN0YXJ0IiwiZW5kIiwibXMiLCJsb2dUaW1lIiwiLi9ub2RlX21vZHVsZXMvd2VicGFjay9saWIvbG9nZ2luZy9ydW50aW1lLmpzIiwiX2V4dGVuZHMiLCJhc3NpZ24iLCJfcmVxdWlyZTIiLCJjcmVhdGVDb25zb2xlTG9nZ2VyIiwiY3VycmVudERlZmF1bHRMb2dnZXJPcHRpb25zIiwiY3VycmVudERlZmF1bHRMb2dnZXIiLCJnZXRMb2dnZXIiLCJob29rcyIsImNoaWxkTmFtZSIsImNvbmZpZ3VyZURlZmF1bHRMb2dnZXIiLCJfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18iLCJtb2R1bGVJZCIsImNhY2hlZE1vZHVsZSIsImRlZmluaXRpb24iLCJvYmoiLCJwcm9wIiwidG9TdHJpbmdUYWciLCJ3ZWJwYWNrX2xpYl9sb2dnaW5nX3J1bnRpbWVfanNfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzBfXyIsIl9fd2VicGFja19leHBvcnRfdGFyZ2V0X18iLCJfX3dlYnBhY2tfaV9fIiwiX19lc01vZHVsZSIsImdldENvZGVQb2ludCIsImNvZGVQb2ludEF0IiwiaW5wdXQiLCJjaGFyQ29kZUF0IiwicmVwbGFjZVVzaW5nUmVnRXhwIiwibWFjcm9UZXh0IiwibWFjcm9SZWdFeHAiLCJtYWNyb1JlcGxhY2VyIiwibGFzdEluZGV4IiwicmVwbGFjZU1hdGNoIiwiZXhlYyIsInJlcGxhY2VSZXN1bHQiLCJyZXBsYWNlTGFzdEluZGV4Iiwic3Vic3RyaW5nIiwicmVwbGFjZUlucHV0IiwicmVmZXJlbmNlcyIsImVuY29kZSIsImNyZWF0ZU1hY2hpbmUiLCJfcmVmMiIsInN0YXRlcyIsImluaXRpYWwiLCJhY3Rpb25zIiwiY3VycmVudFN0YXRlIiwiY3VycmVudENvbnRleHQiLCJldmVudCIsImN1cnJlbnRTdGF0ZU9uIiwidHJhbnNpdGlvbkNvbmZpZyIsImFjdE5hbWUiLCJhY3Rpb25JbXBsIiwibmV4dENvbnRleHRWYWx1ZSIsImNyZWF0ZU92ZXJsYXlNYWNoaW5lIiwiaGlkZU92ZXJsYXkiLCJzaG93T3ZlcmxheSIsIm1lc3NhZ2VTb3VyY2UiLCJoaWRkZW4iLCJCVUlMRF9FUlJPUiIsIlJVTlRJTUVfRVJST1IiLCJkaXNwbGF5QnVpbGRFcnJvciIsIkRJU01JU1MiLCJkaXNwbGF5UnVudGltZUVycm9yIiwiZGlzbWlzc01lc3NhZ2VzIiwiYXBwZW5kTWVzc2FnZXMiLCJzZXRNZXNzYWdlcyIsInBhcnNlRXJyb3JUb1N0YWNrcyIsInN0YWNrIiwibGlzdGVuVG9SdW50aW1lRXJyb3IiLCJjYWxsYmFjayIsImNsZWFudXAiLCJsaXN0ZW5Ub1VuaGFuZGxlZFJlamVjdGlvbiIsIm1zZ1N0eWxlcyIsImJhY2tncm91bmRDb2xvciIsImlmcmFtZVN0eWxlIiwidG9wIiwibGVmdCIsInJpZ2h0IiwiYm90dG9tIiwid2lkdGgiLCJoZWlnaHQiLCJib3JkZXIiLCJjb250YWluZXJTdHlsZSIsImJveFNpemluZyIsImZvbnRTaXplIiwicGFkZGluZyIsImxpbmVIZWlnaHQiLCJ3aGl0ZVNwYWNlIiwib3ZlcmZsb3ciLCJoZWFkZXJTdHlsZSIsImZvbnRGYW1pbHkiLCJtYXJnaW4iLCJmbGV4IiwibWF4SGVpZ2h0IiwiZGlzbWlzc0J1dHRvblN0eWxlIiwiY3Vyc29yIiwibXNnVHlwZVN0eWxlIiwibWFyZ2luQm90dG9tIiwibXNnVGV4dFN0eWxlIiwibW9kdWxlTmFtZSIsImxvYyIsImlmcmFtZUNvbnRhaW5lckVsZW1lbnQiLCJjb250YWluZXJFbGVtZW50IiwiaGVhZGVyRWxlbWVudCIsIm9uTG9hZFF1ZXVlIiwib3ZlcmxheVRydXN0ZWRUeXBlc1BvbGljeSIsImFwcGx5U3R5bGUiLCJzdHlsZSIsImNyZWF0ZUNvbnRhaW5lciIsInRydXN0ZWRUeXBlcyIsImNyZWF0ZVBvbGljeSIsImNyZWF0ZUhUTUwiLCJpZCIsInNyYyIsIm9ubG9hZCIsImNvbnRlbnRFbGVtZW50IiwiY29udGVudERvY3VtZW50IiwiaW5uZXJUZXh0IiwiY2xvc2VCdXR0b25FbGVtZW50IiwiYXJpYUxhYmVsIiwib3ZlcmxheVNlcnZpY2UiLCJvbkxvYWQiLCJlbnN1cmVPdmVybGF5RXhpc3RzIiwiaW5uZXJIVE1MIiwiaGlkZSIsInJlbW92ZUNoaWxkIiwic2hvdyIsImVudHJ5RWxlbWVudCIsIm1zZ1N0eWxlIiwidHlwZUVsZW1lbnQiLCJtb2R1bGVJZGVudGlmaWVyIiwiZmV0Y2giLCJtZXNzYWdlVGV4dE5vZGUiLCJfcmVmMyIsIl9yZWYzJGxldmVsIiwiaGFuZGxlRXJyb3IiLCJmYWxsYmFja01lc3NhZ2UiLCJlcnJvck9iamVjdCIsInNob3VsZERpc3BsYXkiLCJlcnJvckV2ZW50IiwiaW5jbHVkZXMiLCJwcm9taXNlUmVqZWN0aW9uRXZlbnQiLCJyZWFzb24iLCJfY2FsbFN1cGVyIiwiX2dldFByb3RvdHlwZU9mIiwiX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4iLCJfaXNOYXRpdmVSZWZsZWN0Q29uc3RydWN0IiwiY29uc3RydWN0IiwiX2Fzc2VydFRoaXNJbml0aWFsaXplZCIsIlJlZmVyZW5jZUVycm9yIiwiX2luaGVyaXRzIiwiX3NldFByb3RvdHlwZU9mIiwiX3dyYXBOYXRpdmVTdXBlciIsIl9pc05hdGl2ZUZ1bmN0aW9uIiwiaGFzIiwiV3JhcHBlciIsIl9jb25zdHJ1Y3QiLCJwIiwiQm9vbGVhbiIsInZhbHVlT2YiLCJzZXRQcm90b3R5cGVPZiIsIl9fcHJvdG9fXyIsIl9jbGFzc1ByaXZhdGVNZXRob2RJbml0U3BlYyIsIl9jaGVja1ByaXZhdGVSZWRlY2xhcmF0aW9uIiwiYWRkIiwiX2Fzc2VydENsYXNzQnJhbmQiLCJIVE1MRWxlbWVudCIsImF0dGFjaFNoYWRvdyIsIl9XZWJwYWNrRGV2U2VydmVyUHJvZ3Jlc3MiLCJjdXN0b21FbGVtZW50cyIsIl9XZWJwYWNrRGV2U2VydmVyUHJvZ3Jlc3NfYnJhbmQiLCJXZWFrU2V0IiwiV2VicGFja0RldlNlcnZlclByb2dyZXNzIiwiX0hUTUxFbGVtZW50IiwiX3RoaXMiLCJtb2RlIiwibWF4RGFzaE9mZnNldCIsImFuaW1hdGlvblRpbWVyIiwiY29ubmVjdGVkQ2FsbGJhY2siLCJfcmVzZXQiLCJhdHRyaWJ1dGVDaGFuZ2VkQ2FsbGJhY2siLCJvbGRWYWx1ZSIsIm5ld1ZhbHVlIiwiX3VwZGF0ZSIsIl90aGlzJGdldEF0dHJpYnV0ZSIsIl9OdW1iZXIiLCJjbGVhclRpbWVvdXQiLCJ0eXBlQXR0ciIsIl9jaXJjdWxhclRlbXBsYXRlIiwiX2xpbmVhclRlbXBsYXRlIiwic2hhZG93Um9vdCIsImluaXRpYWxQcm9ncmVzcyIsInBhdGgiLCJvZmZzZXQiLCJzdHJva2VEYXNob2Zmc2V0IiwidGV4dENvbnRlbnQiLCJfaGlkZSIsIl9zaG93IiwiY2xhc3NMaXN0IiwicmVtb3ZlIiwiX3RoaXMyIiwic2V0VGltZW91dCIsImRlZmluZSIsIkNsaWVudCIsIl9fd2VicGFja19kZXZfc2VydmVyX2NsaWVudF9fIiwicmV0cmllcyIsIm1heFJldHJpZXMiLCJ0aW1lb3V0IiwiaW5pdFNvY2tldCIsImhhbmRsZXJzIiwicmV0cnlJbk1zIiwiTWF0aCIsInBvdyIsInJhbmRvbSIsImRlZmF1bHRMZXZlbCIsInNlbmRNc2ciLCJXb3JrZXJHbG9iYWxTY29wZSIsImxhc3RIYXNoIiwidXBUb0RhdGUiLCJyZXF1aXJlIiwiY2hlY2siLCJ0aGVuIiwidXBkYXRlZE1vZHVsZXMiLCJjYXRjaCIsImZvcm1hdEVycm9yIiwicmVuZXdlZE1vZHVsZXMiLCJ1bmFjY2VwdGVkTW9kdWxlcyIsInBhcnRzIiwibnVtYmVySWRzIiwiZXZlcnkiLCJsb2dMZXZlbCIsImR1bW15Iiwic2hvdWxkTG9nIiwibG9nR3JvdXAiLCJsb2dGbiJdLCJzb3VyY2VSb290IjoiIn0=