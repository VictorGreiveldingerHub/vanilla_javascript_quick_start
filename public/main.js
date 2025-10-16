/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./app/index.js":
/*!**********************!*\
  !*** ./app/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ App)
/* harmony export */ });
// Import components

// Import partials

// Import WebGL

class App {
  constructor() {
    // Local
    this.sections = {};
    this.partials = {};
    this.canvas = {};
    this.webGL = {};

    // Méthodes
    this.initSections();
    this.initPartials();
    this.initCanvas();
    this.initWEGL();
    console.log("Hello depuis app");
  }
  initSections() {
    this.sections = {};
  }
  initPartials() {
    this.partials = {};
  }
  initCanvas() {
    this.canvas = {};
  }
  initWEGL() {
    this.webGL = {};
  }
  animateElementsIn() {}
}

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

/***/ "./node_modules/mini-css-extract-plugin/dist/hmr/hotModuleReplacement.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/hmr/hotModuleReplacement.js ***!
  \*******************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


/* global document */
/*
  eslint-disable
  no-console,
  func-names
*/
var normalizeUrl = __webpack_require__(/*! ./normalize-url */ "./node_modules/mini-css-extract-plugin/dist/hmr/normalize-url.js");
var srcByModuleId = Object.create(null);
var noDocument = typeof document === "undefined";
var forEach = Array.prototype.forEach;

// eslint-disable-next-line jsdoc/no-restricted-syntax
/**
 * @param {Function} fn any function
 * @param {number} time time
 * @returns {() => void} wrapped function
 */
function debounce(fn, time) {
  var timeout = 0;
  return function () {
    // @ts-expect-error
    var self = this;
    // eslint-disable-next-line prefer-rest-params
    var args = arguments;
    // eslint-disable-next-line func-style
    var functionCall = function functionCall() {
      return fn.apply(self, args);
    };
    clearTimeout(timeout);

    // @ts-expect-error
    timeout = setTimeout(functionCall, time);
  };
}

/**
 * @returns {void}
 */
function noop() {}

/** @typedef {(filename?: string) => string[]} GetScriptSrc */

/**
 * @param {string | number} moduleId a module id
 * @returns {GetScriptSrc} current script url
 */
function getCurrentScriptUrl(moduleId) {
  var src = srcByModuleId[moduleId];
  if (!src) {
    if (document.currentScript) {
      src = (/** @type {HTMLScriptElement} */document.currentScript).src;
    } else {
      var scripts = document.getElementsByTagName("script");
      var lastScriptTag = scripts[scripts.length - 1];
      if (lastScriptTag) {
        src = lastScriptTag.src;
      }
    }
    srcByModuleId[moduleId] = src;
  }

  /** @type {GetScriptSrc} */
  return function (fileMap) {
    if (!src) {
      return [];
    }
    var splitResult = src.split(/([^\\/]+)\.js$/);
    var filename = splitResult && splitResult[1];
    if (!filename) {
      return [src.replace(".js", ".css")];
    }
    if (!fileMap) {
      return [src.replace(".js", ".css")];
    }
    return fileMap.split(",").map(function (mapRule) {
      var reg = new RegExp("".concat(filename, "\\.js$"), "g");
      return normalizeUrl(src.replace(reg, "".concat(mapRule.replace(/{fileName}/g, filename), ".css")));
    });
  };
}

/**
 * @param {string} url URL
 * @returns {boolean} true when URL can be request, otherwise false
 */
function isUrlRequest(url) {
  // An URL is not an request if

  // It is not http or https
  if (!/^[a-zA-Z][a-zA-Z\d+\-.]*:/.test(url)) {
    return false;
  }
  return true;
}

/** @typedef {HTMLLinkElement & { isLoaded: boolean, visited: boolean }} HotHTMLLinkElement */

/**
 * @param {HotHTMLLinkElement} el html link element
 * @param {string=} url a URL
 */
function updateCss(el, url) {
  if (!url) {
    if (!el.href) {
      return;
    }

    // eslint-disable-next-line
    url = el.href.split("?")[0];
  }
  if (!isUrlRequest(/** @type {string} */url)) {
    return;
  }
  if (el.isLoaded === false) {
    // We seem to be about to replace a css link that hasn't loaded yet.
    // We're probably changing the same file more than once.
    return;
  }

  // eslint-disable-next-line unicorn/prefer-includes
  if (!url || !(url.indexOf(".css") > -1)) {
    return;
  }
  el.visited = true;
  var newEl = /** @type {HotHTMLLinkElement} */
  el.cloneNode();
  newEl.isLoaded = false;
  newEl.addEventListener("load", function () {
    if (newEl.isLoaded) {
      return;
    }
    newEl.isLoaded = true;
    if (el.parentNode) {
      el.parentNode.removeChild(el);
    }
  });
  newEl.addEventListener("error", function () {
    if (newEl.isLoaded) {
      return;
    }
    newEl.isLoaded = true;
    if (el.parentNode) {
      el.parentNode.removeChild(el);
    }
  });
  newEl.href = "".concat(url, "?").concat(Date.now());
  if (el.parentNode) {
    if (el.nextSibling) {
      el.parentNode.insertBefore(newEl, el.nextSibling);
    } else {
      el.parentNode.appendChild(newEl);
    }
  }
}

/**
 * @param {string} href href
 * @param {string[]} src src
 * @returns {undefined | string} a reload url
 */
function getReloadUrl(href, src) {
  var ret;
  href = normalizeUrl(href);
  src.some(
  /**
   * @param {string} url url
   */
  // eslint-disable-next-line array-callback-return
  function (url) {
    // @ts-expect-error fix me in the next major release
    // eslint-disable-next-line unicorn/prefer-includes
    if (href.indexOf(src) > -1) {
      ret = url;
    }
  });
  return ret;
}

/**
 * @param {string[]} src source
 * @returns {boolean} true when loaded, otherwise false
 */
function reloadStyle(src) {
  var elements = document.querySelectorAll("link");
  var loaded = false;
  forEach.call(elements, function (el) {
    if (!el.href) {
      return;
    }
    var url = getReloadUrl(el.href, src);
    if (url && !isUrlRequest(url)) {
      return;
    }
    if (el.visited === true) {
      return;
    }
    if (url) {
      updateCss(el, url);
      loaded = true;
    }
  });
  return loaded;
}

/**
 * @returns {void}
 */
function reloadAll() {
  var elements = document.querySelectorAll("link");
  forEach.call(elements, function (el) {
    if (el.visited === true) {
      return;
    }
    updateCss(el);
  });
}

/**
 * @param {number | string} moduleId a module id
 * @param {{ filename?: string, locals?: boolean }} options options
 * @returns {() => void} wrapper function
 */
module.exports = function (moduleId, options) {
  if (noDocument) {
    console.log("no window.document found, will not HMR CSS");
    return noop;
  }
  var getScriptSrc = getCurrentScriptUrl(moduleId);

  /**
   * @returns {void}
   */
  function update() {
    var src = getScriptSrc(options.filename);
    var reloaded = reloadStyle(src);
    if (options.locals) {
      console.log("[HMR] Detected local css modules. Reload all css");
      reloadAll();
      return;
    }
    if (reloaded) {
      console.log("[HMR] css reload %s", src.join(" "));
    } else {
      console.log("[HMR] Reload all css");
      reloadAll();
    }
  }
  return debounce(update, 50);
};

/***/ }),

/***/ "./node_modules/mini-css-extract-plugin/dist/hmr/normalize-url.js":
/*!************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/hmr/normalize-url.js ***!
  \************************************************************************/
/***/ ((module) => {

"use strict";


/**
 * @param {string[]} pathComponents path components
 * @returns {string} normalized url
 */
function normalizeUrlInner(pathComponents) {
  return pathComponents.reduce(function (accumulator, item) {
    switch (item) {
      case "..":
        accumulator.pop();
        break;
      case ".":
        break;
      default:
        accumulator.push(item);
    }
    return accumulator;
  }, /** @type {string[]} */[]).join("/");
}

/**
 * @param {string} urlString url string
 * @returns {string} normalized url string
 */
module.exports = function normalizeUrl(urlString) {
  urlString = urlString.trim();
  if (/^data:/i.test(urlString)) {
    return urlString;
  }
  var protocol =
  // eslint-disable-next-line unicorn/prefer-includes
  urlString.indexOf("//") !== -1 ? "".concat(urlString.split("//")[0], "//") : "";
  var components = urlString.replace(new RegExp(protocol, "i"), "").split("/");
  var host = components[0].toLowerCase().replace(/\.$/, "");
  components[0] = "";
  var path = normalizeUrlInner(components);
  return protocol + host + path;
};

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

/***/ }),

/***/ "./styles/index.scss":
/*!***************************!*\
  !*** ./styles/index.scss ***!
  \***************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin

    if(true) {
      (function() {
        var localsJsonString = undefined;
        // 1760621284834
        var cssReload = __webpack_require__(/*! ../node_modules/mini-css-extract-plugin/dist/hmr/hotModuleReplacement.js */ "./node_modules/mini-css-extract-plugin/dist/hmr/hotModuleReplacement.js")(module.id, {"publicPath":""});
        // only invalidate when locals change
        if (
          module.hot.data &&
          module.hot.data.value &&
          module.hot.data.value !== localsJsonString
        ) {
          module.hot.invalidate();
        } else {
          module.hot.accept();
        }
        module.hot.dispose(function(data) {
          data.value = localsJsonString;
          cssReload();
        });
      })();
    }
  

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
/******/ 			id: moduleId,
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
/******/ 			return "" + chunkId + ".css";
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/get update manifest filename */
/******/ 	(() => {
/******/ 		__webpack_require__.hmrF = () => ("main." + __webpack_require__.h() + ".hot-update.json");
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/getFullHash */
/******/ 	(() => {
/******/ 		__webpack_require__.h = () => ("6b810dcecc8afd89ad14")
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
/******/ 			"main": 0
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
/******/ 	__webpack_require__("./app/index.js");
/******/ 	var __webpack_exports__ = __webpack_require__("./styles/index.scss");
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsbUJBQW1CLDJCQUEyQjtXQUM5QztXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsS0FBSztXQUNMO1dBQ0E7O1dBRUE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7O1dBRUE7V0FDQSxrQkFBa0IsY0FBYztXQUNoQztXQUNBO1dBQ0E7V0FDQTs7V0FFQTtXQUNBO1dBQ0E7V0FDQTtXQUNBOztXQUVBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7O1dBRUE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsY0FBYyxhQUFhO1dBQzNCO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTs7V0FFQTtXQUNBO1dBQ0EsaUJBQWlCLDRCQUE0QjtXQUM3QztXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsSUFBSTtXQUNKO1dBQ0E7O1dBRUE7O1dBRUE7V0FDQTtXQUNBO1dBQ0E7V0FDQSxJQUFJO1dBQ0o7O1dBRUE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBOztXQUVBOztXQUVBO1dBQ0E7V0FDQSxnQkFBZ0IsNEJBQTRCO1dBQzVDO1dBQ0E7V0FDQTs7V0FFQTtXQUNBOztXQUVBO1dBQ0E7O1dBRUE7V0FDQTs7V0FFQTtXQUNBLGdCQUFnQiw0QkFBNEI7V0FDNUM7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTs7V0FFQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0Esa0JBQWtCLHVDQUF1QztXQUN6RDtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLEdBQUc7V0FDSDtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBOztXQUVBO1dBQ0EsbUJBQW1CLGlDQUFpQztXQUNwRDtXQUNBOztXQUVBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0Esc0JBQXNCLHVDQUF1QztXQUM3RDtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxzQkFBc0Isc0JBQXNCO1dBQzVDO1dBQ0E7V0FDQTtXQUNBLFNBQVM7V0FDVDtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsV0FBVztXQUNYLFdBQVc7V0FDWDtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLFlBQVk7V0FDWjtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxVQUFVO1dBQ1Y7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsV0FBVztXQUNYO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBOztXQUVBO1dBQ0E7V0FDQSxvQkFBb0Isd0NBQXdDO1dBQzVEO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsT0FBTztXQUNQO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxTQUFTO1dBQ1QsU0FBUztXQUNUO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLFVBQVU7V0FDVjtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxRQUFRO1dBQ1I7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLFNBQVM7V0FDVDtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBOztXQUVBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsS0FBSztXQUNMO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsRUFBRSxJQUFJO1dBQ047V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLElBQUk7V0FDSjtXQUNBO1dBQ0EsRUFBRTtXQUNGO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBOztXQUVBO1dBQ0E7V0FDQTtXQUNBLHNDQUFzQztXQUN0QztXQUNBO1dBQ0EsRUFBRTtXQUNGOztXQUVBOztXQUVBLG9COzs7OztVRXJnQkE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly92YW5pbGxhX2phdmFzY3JpcHRfcXVpY2tfc3RhcnQvLi9hcHAvaW5kZXguanMiLCJ3ZWJwYWNrOi8vdmFuaWxsYV9qYXZhc2NyaXB0X3F1aWNrX3N0YXJ0Ly4vbm9kZV9tb2R1bGVzL2Fuc2ktaHRtbC1jb21tdW5pdHkvaW5kZXguanMiLCJ3ZWJwYWNrOi8vdmFuaWxsYV9qYXZhc2NyaXB0X3F1aWNrX3N0YXJ0Ly4vbm9kZV9tb2R1bGVzL2V2ZW50cy9ldmVudHMuanMiLCJ3ZWJwYWNrOi8vdmFuaWxsYV9qYXZhc2NyaXB0X3F1aWNrX3N0YXJ0Ly4vbm9kZV9tb2R1bGVzL21pbmktY3NzLWV4dHJhY3QtcGx1Z2luL2Rpc3QvaG1yL2hvdE1vZHVsZVJlcGxhY2VtZW50LmpzIiwid2VicGFjazovL3ZhbmlsbGFfamF2YXNjcmlwdF9xdWlja19zdGFydC8uL25vZGVfbW9kdWxlcy9taW5pLWNzcy1leHRyYWN0LXBsdWdpbi9kaXN0L2htci9ub3JtYWxpemUtdXJsLmpzIiwid2VicGFjazovL3ZhbmlsbGFfamF2YXNjcmlwdF9xdWlja19zdGFydC8uL25vZGVfbW9kdWxlcy93ZWJwYWNrLWRldi1zZXJ2ZXIvY2xpZW50L2NsaWVudHMvV2ViU29ja2V0Q2xpZW50LmpzIiwid2VicGFjazovL3ZhbmlsbGFfamF2YXNjcmlwdF9xdWlja19zdGFydC8uL25vZGVfbW9kdWxlcy93ZWJwYWNrLWRldi1zZXJ2ZXIvY2xpZW50L2luZGV4LmpzIiwid2VicGFjazovL3ZhbmlsbGFfamF2YXNjcmlwdF9xdWlja19zdGFydC8uL25vZGVfbW9kdWxlcy93ZWJwYWNrLWRldi1zZXJ2ZXIvY2xpZW50L21vZHVsZXMvbG9nZ2VyL2luZGV4LmpzIiwid2VicGFjazovL3ZhbmlsbGFfamF2YXNjcmlwdF9xdWlja19zdGFydC8uL25vZGVfbW9kdWxlcy93ZWJwYWNrLWRldi1zZXJ2ZXIvY2xpZW50L292ZXJsYXkuanMiLCJ3ZWJwYWNrOi8vdmFuaWxsYV9qYXZhc2NyaXB0X3F1aWNrX3N0YXJ0Ly4vbm9kZV9tb2R1bGVzL3dlYnBhY2stZGV2LXNlcnZlci9jbGllbnQvcHJvZ3Jlc3MuanMiLCJ3ZWJwYWNrOi8vdmFuaWxsYV9qYXZhc2NyaXB0X3F1aWNrX3N0YXJ0Ly4vbm9kZV9tb2R1bGVzL3dlYnBhY2stZGV2LXNlcnZlci9jbGllbnQvc29ja2V0LmpzIiwid2VicGFjazovL3ZhbmlsbGFfamF2YXNjcmlwdF9xdWlja19zdGFydC8uL25vZGVfbW9kdWxlcy93ZWJwYWNrLWRldi1zZXJ2ZXIvY2xpZW50L3V0aWxzL2xvZy5qcyIsIndlYnBhY2s6Ly92YW5pbGxhX2phdmFzY3JpcHRfcXVpY2tfc3RhcnQvLi9ub2RlX21vZHVsZXMvd2VicGFjay1kZXYtc2VydmVyL2NsaWVudC91dGlscy9zZW5kTWVzc2FnZS5qcyIsIndlYnBhY2s6Ly92YW5pbGxhX2phdmFzY3JpcHRfcXVpY2tfc3RhcnQvLi9ub2RlX21vZHVsZXMvd2VicGFjay9ob3QvZGV2LXNlcnZlci5qcyIsIndlYnBhY2s6Ly92YW5pbGxhX2phdmFzY3JpcHRfcXVpY2tfc3RhcnQvLi9ub2RlX21vZHVsZXMvd2VicGFjay9ob3QvZW1pdHRlci5qcyIsIndlYnBhY2s6Ly92YW5pbGxhX2phdmFzY3JpcHRfcXVpY2tfc3RhcnQvLi9ub2RlX21vZHVsZXMvd2VicGFjay9ob3QvbG9nLWFwcGx5LXJlc3VsdC5qcyIsIndlYnBhY2s6Ly92YW5pbGxhX2phdmFzY3JpcHRfcXVpY2tfc3RhcnQvLi9ub2RlX21vZHVsZXMvd2VicGFjay9ob3QvbG9nLmpzIiwid2VicGFjazovL3ZhbmlsbGFfamF2YXNjcmlwdF9xdWlja19zdGFydC8uL3N0eWxlcy9pbmRleC5zY3NzPzMyMWYiLCJ3ZWJwYWNrOi8vdmFuaWxsYV9qYXZhc2NyaXB0X3F1aWNrX3N0YXJ0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3ZhbmlsbGFfamF2YXNjcmlwdF9xdWlja19zdGFydC93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly92YW5pbGxhX2phdmFzY3JpcHRfcXVpY2tfc3RhcnQvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3ZhbmlsbGFfamF2YXNjcmlwdF9xdWlja19zdGFydC93ZWJwYWNrL3J1bnRpbWUvZ2V0IGphdmFzY3JpcHQgdXBkYXRlIGNodW5rIGZpbGVuYW1lIiwid2VicGFjazovL3ZhbmlsbGFfamF2YXNjcmlwdF9xdWlja19zdGFydC93ZWJwYWNrL3J1bnRpbWUvZ2V0IG1pbmktY3NzIGNodW5rIGZpbGVuYW1lIiwid2VicGFjazovL3ZhbmlsbGFfamF2YXNjcmlwdF9xdWlja19zdGFydC93ZWJwYWNrL3J1bnRpbWUvZ2V0IHVwZGF0ZSBtYW5pZmVzdCBmaWxlbmFtZSIsIndlYnBhY2s6Ly92YW5pbGxhX2phdmFzY3JpcHRfcXVpY2tfc3RhcnQvd2VicGFjay9ydW50aW1lL2dldEZ1bGxIYXNoIiwid2VicGFjazovL3ZhbmlsbGFfamF2YXNjcmlwdF9xdWlja19zdGFydC93ZWJwYWNrL3J1bnRpbWUvZ2xvYmFsIiwid2VicGFjazovL3ZhbmlsbGFfamF2YXNjcmlwdF9xdWlja19zdGFydC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3ZhbmlsbGFfamF2YXNjcmlwdF9xdWlja19zdGFydC93ZWJwYWNrL3J1bnRpbWUvbG9hZCBzY3JpcHQiLCJ3ZWJwYWNrOi8vdmFuaWxsYV9qYXZhc2NyaXB0X3F1aWNrX3N0YXJ0L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vdmFuaWxsYV9qYXZhc2NyaXB0X3F1aWNrX3N0YXJ0L3dlYnBhY2svcnVudGltZS9ob3QgbW9kdWxlIHJlcGxhY2VtZW50Iiwid2VicGFjazovL3ZhbmlsbGFfamF2YXNjcmlwdF9xdWlja19zdGFydC93ZWJwYWNrL3J1bnRpbWUvcHVibGljUGF0aCIsIndlYnBhY2s6Ly92YW5pbGxhX2phdmFzY3JpcHRfcXVpY2tfc3RhcnQvd2VicGFjay9ydW50aW1lL2NzcyBsb2FkaW5nIiwid2VicGFjazovL3ZhbmlsbGFfamF2YXNjcmlwdF9xdWlja19zdGFydC93ZWJwYWNrL3J1bnRpbWUvanNvbnAgY2h1bmsgbG9hZGluZyIsIndlYnBhY2s6Ly92YW5pbGxhX2phdmFzY3JpcHRfcXVpY2tfc3RhcnQvd2VicGFjay9iZWZvcmUtc3RhcnR1cCIsIndlYnBhY2s6Ly92YW5pbGxhX2phdmFzY3JpcHRfcXVpY2tfc3RhcnQvd2VicGFjay9zdGFydHVwIiwid2VicGFjazovL3ZhbmlsbGFfamF2YXNjcmlwdF9xdWlja19zdGFydC93ZWJwYWNrL2FmdGVyLXN0YXJ0dXAiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gSW1wb3J0IGNvbXBvbmVudHNcblxuLy8gSW1wb3J0IHBhcnRpYWxzXG5cbi8vIEltcG9ydCBXZWJHTFxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBcHAge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICAvLyBMb2NhbFxuICAgIHRoaXMuc2VjdGlvbnMgPSB7fTtcbiAgICB0aGlzLnBhcnRpYWxzID0ge307XG4gICAgdGhpcy5jYW52YXMgPSB7fTtcbiAgICB0aGlzLndlYkdMID0ge307XG5cbiAgICAvLyBNw6l0aG9kZXNcbiAgICB0aGlzLmluaXRTZWN0aW9ucygpO1xuICAgIHRoaXMuaW5pdFBhcnRpYWxzKCk7XG4gICAgdGhpcy5pbml0Q2FudmFzKCk7XG4gICAgdGhpcy5pbml0V0VHTCgpO1xuXG4gICAgY29uc29sZS5sb2coXCJIZWxsbyBkZXB1aXMgYXBwXCIpO1xuICB9XG5cbiAgaW5pdFNlY3Rpb25zKCkge1xuICAgIHRoaXMuc2VjdGlvbnMgPSB7fTtcbiAgfVxuXG4gIGluaXRQYXJ0aWFscygpIHtcbiAgICB0aGlzLnBhcnRpYWxzID0ge307XG4gIH1cblxuICBpbml0Q2FudmFzKCkge1xuICAgIHRoaXMuY2FudmFzID0ge307XG4gIH1cblxuICBpbml0V0VHTCgpIHtcbiAgICB0aGlzLndlYkdMID0ge307XG4gIH1cblxuICBhbmltYXRlRWxlbWVudHNJbigpIHt9XG59XG4iLCIndXNlIHN0cmljdCdcblxubW9kdWxlLmV4cG9ydHMgPSBhbnNpSFRNTFxuXG4vLyBSZWZlcmVuY2UgdG8gaHR0cHM6Ly9naXRodWIuY29tL3NpbmRyZXNvcmh1cy9hbnNpLXJlZ2V4XG52YXIgX3JlZ0FOU0kgPSAvKD86KD86XFx1MDAxYlxcWyl8XFx1MDA5YikoPzooPzpbMC05XXsxLDN9KT8oPzooPzo7WzAtOV17MCwzfSkqKT9bQS1NfGYtbV0pfFxcdTAwMWJbQS1NXS9cblxudmFyIF9kZWZDb2xvcnMgPSB7XG4gIHJlc2V0OiBbJ2ZmZicsICcwMDAnXSwgLy8gW0ZPUkVHUk9VRF9DT0xPUiwgQkFDS0dST1VORF9DT0xPUl1cbiAgYmxhY2s6ICcwMDAnLFxuICByZWQ6ICdmZjAwMDAnLFxuICBncmVlbjogJzIwOTgwNScsXG4gIHllbGxvdzogJ2U4YmYwMycsXG4gIGJsdWU6ICcwMDAwZmYnLFxuICBtYWdlbnRhOiAnZmYwMGZmJyxcbiAgY3lhbjogJzAwZmZlZScsXG4gIGxpZ2h0Z3JleTogJ2YwZjBmMCcsXG4gIGRhcmtncmV5OiAnODg4J1xufVxudmFyIF9zdHlsZXMgPSB7XG4gIDMwOiAnYmxhY2snLFxuICAzMTogJ3JlZCcsXG4gIDMyOiAnZ3JlZW4nLFxuICAzMzogJ3llbGxvdycsXG4gIDM0OiAnYmx1ZScsXG4gIDM1OiAnbWFnZW50YScsXG4gIDM2OiAnY3lhbicsXG4gIDM3OiAnbGlnaHRncmV5J1xufVxudmFyIF9vcGVuVGFncyA9IHtcbiAgJzEnOiAnZm9udC13ZWlnaHQ6Ym9sZCcsIC8vIGJvbGRcbiAgJzInOiAnb3BhY2l0eTowLjUnLCAvLyBkaW1cbiAgJzMnOiAnPGk+JywgLy8gaXRhbGljXG4gICc0JzogJzx1PicsIC8vIHVuZGVyc2NvcmVcbiAgJzgnOiAnZGlzcGxheTpub25lJywgLy8gaGlkZGVuXG4gICc5JzogJzxkZWw+JyAvLyBkZWxldGVcbn1cbnZhciBfY2xvc2VUYWdzID0ge1xuICAnMjMnOiAnPC9pPicsIC8vIHJlc2V0IGl0YWxpY1xuICAnMjQnOiAnPC91PicsIC8vIHJlc2V0IHVuZGVyc2NvcmVcbiAgJzI5JzogJzwvZGVsPicgLy8gcmVzZXQgZGVsZXRlXG59XG5cbjtbMCwgMjEsIDIyLCAyNywgMjgsIDM5LCA0OV0uZm9yRWFjaChmdW5jdGlvbiAobikge1xuICBfY2xvc2VUYWdzW25dID0gJzwvc3Bhbj4nXG59KVxuXG4vKipcbiAqIENvbnZlcnRzIHRleHQgd2l0aCBBTlNJIGNvbG9yIGNvZGVzIHRvIEhUTUwgbWFya3VwLlxuICogQHBhcmFtIHtTdHJpbmd9IHRleHRcbiAqIEByZXR1cm5zIHsqfVxuICovXG5mdW5jdGlvbiBhbnNpSFRNTCAodGV4dCkge1xuICAvLyBSZXR1cm5zIHRoZSB0ZXh0IGlmIHRoZSBzdHJpbmcgaGFzIG5vIEFOU0kgZXNjYXBlIGNvZGUuXG4gIGlmICghX3JlZ0FOU0kudGVzdCh0ZXh0KSkge1xuICAgIHJldHVybiB0ZXh0XG4gIH1cblxuICAvLyBDYWNoZSBvcGVuZWQgc2VxdWVuY2UuXG4gIHZhciBhbnNpQ29kZXMgPSBbXVxuICAvLyBSZXBsYWNlIHdpdGggbWFya3VwLlxuICB2YXIgcmV0ID0gdGV4dC5yZXBsYWNlKC9cXDAzM1xcWyhcXGQrKW0vZywgZnVuY3Rpb24gKG1hdGNoLCBzZXEpIHtcbiAgICB2YXIgb3QgPSBfb3BlblRhZ3Nbc2VxXVxuICAgIGlmIChvdCkge1xuICAgICAgLy8gSWYgY3VycmVudCBzZXF1ZW5jZSBoYXMgYmVlbiBvcGVuZWQsIGNsb3NlIGl0LlxuICAgICAgaWYgKCEhfmFuc2lDb2Rlcy5pbmRleE9mKHNlcSkpIHsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1leHRyYS1ib29sZWFuLWNhc3RcbiAgICAgICAgYW5zaUNvZGVzLnBvcCgpXG4gICAgICAgIHJldHVybiAnPC9zcGFuPidcbiAgICAgIH1cbiAgICAgIC8vIE9wZW4gdGFnLlxuICAgICAgYW5zaUNvZGVzLnB1c2goc2VxKVxuICAgICAgcmV0dXJuIG90WzBdID09PSAnPCcgPyBvdCA6ICc8c3BhbiBzdHlsZT1cIicgKyBvdCArICc7XCI+J1xuICAgIH1cblxuICAgIHZhciBjdCA9IF9jbG9zZVRhZ3Nbc2VxXVxuICAgIGlmIChjdCkge1xuICAgICAgLy8gUG9wIHNlcXVlbmNlXG4gICAgICBhbnNpQ29kZXMucG9wKClcbiAgICAgIHJldHVybiBjdFxuICAgIH1cbiAgICByZXR1cm4gJydcbiAgfSlcblxuICAvLyBNYWtlIHN1cmUgdGFncyBhcmUgY2xvc2VkLlxuICB2YXIgbCA9IGFuc2lDb2Rlcy5sZW5ndGhcbiAgOyhsID4gMCkgJiYgKHJldCArPSBBcnJheShsICsgMSkuam9pbignPC9zcGFuPicpKVxuXG4gIHJldHVybiByZXRcbn1cblxuLyoqXG4gKiBDdXN0b21pemUgY29sb3JzLlxuICogQHBhcmFtIHtPYmplY3R9IGNvbG9ycyByZWZlcmVuY2UgdG8gX2RlZkNvbG9yc1xuICovXG5hbnNpSFRNTC5zZXRDb2xvcnMgPSBmdW5jdGlvbiAoY29sb3JzKSB7XG4gIGlmICh0eXBlb2YgY29sb3JzICE9PSAnb2JqZWN0Jykge1xuICAgIHRocm93IG5ldyBFcnJvcignYGNvbG9yc2AgcGFyYW1ldGVyIG11c3QgYmUgYW4gT2JqZWN0LicpXG4gIH1cblxuICB2YXIgX2ZpbmFsQ29sb3JzID0ge31cbiAgZm9yICh2YXIga2V5IGluIF9kZWZDb2xvcnMpIHtcbiAgICB2YXIgaGV4ID0gY29sb3JzLmhhc093blByb3BlcnR5KGtleSkgPyBjb2xvcnNba2V5XSA6IG51bGxcbiAgICBpZiAoIWhleCkge1xuICAgICAgX2ZpbmFsQ29sb3JzW2tleV0gPSBfZGVmQ29sb3JzW2tleV1cbiAgICAgIGNvbnRpbnVlXG4gICAgfVxuICAgIGlmICgncmVzZXQnID09PSBrZXkpIHtcbiAgICAgIGlmICh0eXBlb2YgaGV4ID09PSAnc3RyaW5nJykge1xuICAgICAgICBoZXggPSBbaGV4XVxuICAgICAgfVxuICAgICAgaWYgKCFBcnJheS5pc0FycmF5KGhleCkgfHwgaGV4Lmxlbmd0aCA9PT0gMCB8fCBoZXguc29tZShmdW5jdGlvbiAoaCkge1xuICAgICAgICByZXR1cm4gdHlwZW9mIGggIT09ICdzdHJpbmcnXG4gICAgICB9KSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1RoZSB2YWx1ZSBvZiBgJyArIGtleSArICdgIHByb3BlcnR5IG11c3QgYmUgYW4gQXJyYXkgYW5kIGVhY2ggaXRlbSBjb3VsZCBvbmx5IGJlIGEgaGV4IHN0cmluZywgZS5nLjogRkYwMDAwJylcbiAgICAgIH1cbiAgICAgIHZhciBkZWZIZXhDb2xvciA9IF9kZWZDb2xvcnNba2V5XVxuICAgICAgaWYgKCFoZXhbMF0pIHtcbiAgICAgICAgaGV4WzBdID0gZGVmSGV4Q29sb3JbMF1cbiAgICAgIH1cbiAgICAgIGlmIChoZXgubGVuZ3RoID09PSAxIHx8ICFoZXhbMV0pIHtcbiAgICAgICAgaGV4ID0gW2hleFswXV1cbiAgICAgICAgaGV4LnB1c2goZGVmSGV4Q29sb3JbMV0pXG4gICAgICB9XG5cbiAgICAgIGhleCA9IGhleC5zbGljZSgwLCAyKVxuICAgIH0gZWxzZSBpZiAodHlwZW9mIGhleCAhPT0gJ3N0cmluZycpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignVGhlIHZhbHVlIG9mIGAnICsga2V5ICsgJ2AgcHJvcGVydHkgbXVzdCBiZSBhIGhleCBzdHJpbmcsIGUuZy46IEZGMDAwMCcpXG4gICAgfVxuICAgIF9maW5hbENvbG9yc1trZXldID0gaGV4XG4gIH1cbiAgX3NldFRhZ3MoX2ZpbmFsQ29sb3JzKVxufVxuXG4vKipcbiAqIFJlc2V0IGNvbG9ycy5cbiAqL1xuYW5zaUhUTUwucmVzZXQgPSBmdW5jdGlvbiAoKSB7XG4gIF9zZXRUYWdzKF9kZWZDb2xvcnMpXG59XG5cbi8qKlxuICogRXhwb3NlIHRhZ3MsIGluY2x1ZGluZyBvcGVuIGFuZCBjbG9zZS5cbiAqIEB0eXBlIHtPYmplY3R9XG4gKi9cbmFuc2lIVE1MLnRhZ3MgPSB7fVxuXG5pZiAoT2JqZWN0LmRlZmluZVByb3BlcnR5KSB7XG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShhbnNpSFRNTC50YWdzLCAnb3BlbicsIHtcbiAgICBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIF9vcGVuVGFncyB9XG4gIH0pXG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShhbnNpSFRNTC50YWdzLCAnY2xvc2UnLCB7XG4gICAgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBfY2xvc2VUYWdzIH1cbiAgfSlcbn0gZWxzZSB7XG4gIGFuc2lIVE1MLnRhZ3Mub3BlbiA9IF9vcGVuVGFnc1xuICBhbnNpSFRNTC50YWdzLmNsb3NlID0gX2Nsb3NlVGFnc1xufVxuXG5mdW5jdGlvbiBfc2V0VGFncyAoY29sb3JzKSB7XG4gIC8vIHJlc2V0IGFsbFxuICBfb3BlblRhZ3NbJzAnXSA9ICdmb250LXdlaWdodDpub3JtYWw7b3BhY2l0eToxO2NvbG9yOiMnICsgY29sb3JzLnJlc2V0WzBdICsgJztiYWNrZ3JvdW5kOiMnICsgY29sb3JzLnJlc2V0WzFdXG4gIC8vIGludmVyc2VcbiAgX29wZW5UYWdzWyc3J10gPSAnY29sb3I6IycgKyBjb2xvcnMucmVzZXRbMV0gKyAnO2JhY2tncm91bmQ6IycgKyBjb2xvcnMucmVzZXRbMF1cbiAgLy8gZGFyayBncmV5XG4gIF9vcGVuVGFnc1snOTAnXSA9ICdjb2xvcjojJyArIGNvbG9ycy5kYXJrZ3JleVxuXG4gIGZvciAodmFyIGNvZGUgaW4gX3N0eWxlcykge1xuICAgIHZhciBjb2xvciA9IF9zdHlsZXNbY29kZV1cbiAgICB2YXIgb3JpQ29sb3IgPSBjb2xvcnNbY29sb3JdIHx8ICcwMDAnXG4gICAgX29wZW5UYWdzW2NvZGVdID0gJ2NvbG9yOiMnICsgb3JpQ29sb3JcbiAgICBjb2RlID0gcGFyc2VJbnQoY29kZSlcbiAgICBfb3BlblRhZ3NbKGNvZGUgKyAxMCkudG9TdHJpbmcoKV0gPSAnYmFja2dyb3VuZDojJyArIG9yaUNvbG9yXG4gIH1cbn1cblxuYW5zaUhUTUwucmVzZXQoKVxuIiwiLy8gQ29weXJpZ2h0IEpveWVudCwgSW5jLiBhbmQgb3RoZXIgTm9kZSBjb250cmlidXRvcnMuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGFcbi8vIGNvcHkgb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGVcbi8vIFwiU29mdHdhcmVcIiksIHRvIGRlYWwgaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZ1xuLy8gd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHMgdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLFxuLy8gZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdFxuLy8gcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpcyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlXG4vLyBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZFxuLy8gaW4gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTU1xuLy8gT1IgSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRlxuLy8gTUVSQ0hBTlRBQklMSVRZLCBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTlxuLy8gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sXG4vLyBEQU1BR0VTIE9SIE9USEVSIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1Jcbi8vIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLCBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEVcbi8vIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEUgU09GVFdBUkUuXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIFIgPSB0eXBlb2YgUmVmbGVjdCA9PT0gJ29iamVjdCcgPyBSZWZsZWN0IDogbnVsbFxudmFyIFJlZmxlY3RBcHBseSA9IFIgJiYgdHlwZW9mIFIuYXBwbHkgPT09ICdmdW5jdGlvbidcbiAgPyBSLmFwcGx5XG4gIDogZnVuY3Rpb24gUmVmbGVjdEFwcGx5KHRhcmdldCwgcmVjZWl2ZXIsIGFyZ3MpIHtcbiAgICByZXR1cm4gRnVuY3Rpb24ucHJvdG90eXBlLmFwcGx5LmNhbGwodGFyZ2V0LCByZWNlaXZlciwgYXJncyk7XG4gIH1cblxudmFyIFJlZmxlY3RPd25LZXlzXG5pZiAoUiAmJiB0eXBlb2YgUi5vd25LZXlzID09PSAnZnVuY3Rpb24nKSB7XG4gIFJlZmxlY3RPd25LZXlzID0gUi5vd25LZXlzXG59IGVsc2UgaWYgKE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMpIHtcbiAgUmVmbGVjdE93bktleXMgPSBmdW5jdGlvbiBSZWZsZWN0T3duS2V5cyh0YXJnZXQpIHtcbiAgICByZXR1cm4gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXModGFyZ2V0KVxuICAgICAgLmNvbmNhdChPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKHRhcmdldCkpO1xuICB9O1xufSBlbHNlIHtcbiAgUmVmbGVjdE93bktleXMgPSBmdW5jdGlvbiBSZWZsZWN0T3duS2V5cyh0YXJnZXQpIHtcbiAgICByZXR1cm4gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXModGFyZ2V0KTtcbiAgfTtcbn1cblxuZnVuY3Rpb24gUHJvY2Vzc0VtaXRXYXJuaW5nKHdhcm5pbmcpIHtcbiAgaWYgKGNvbnNvbGUgJiYgY29uc29sZS53YXJuKSBjb25zb2xlLndhcm4od2FybmluZyk7XG59XG5cbnZhciBOdW1iZXJJc05hTiA9IE51bWJlci5pc05hTiB8fCBmdW5jdGlvbiBOdW1iZXJJc05hTih2YWx1ZSkge1xuICByZXR1cm4gdmFsdWUgIT09IHZhbHVlO1xufVxuXG5mdW5jdGlvbiBFdmVudEVtaXR0ZXIoKSB7XG4gIEV2ZW50RW1pdHRlci5pbml0LmNhbGwodGhpcyk7XG59XG5tb2R1bGUuZXhwb3J0cyA9IEV2ZW50RW1pdHRlcjtcbm1vZHVsZS5leHBvcnRzLm9uY2UgPSBvbmNlO1xuXG4vLyBCYWNrd2FyZHMtY29tcGF0IHdpdGggbm9kZSAwLjEwLnhcbkV2ZW50RW1pdHRlci5FdmVudEVtaXR0ZXIgPSBFdmVudEVtaXR0ZXI7XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuX2V2ZW50cyA9IHVuZGVmaW5lZDtcbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuX2V2ZW50c0NvdW50ID0gMDtcbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuX21heExpc3RlbmVycyA9IHVuZGVmaW5lZDtcblxuLy8gQnkgZGVmYXVsdCBFdmVudEVtaXR0ZXJzIHdpbGwgcHJpbnQgYSB3YXJuaW5nIGlmIG1vcmUgdGhhbiAxMCBsaXN0ZW5lcnMgYXJlXG4vLyBhZGRlZCB0byBpdC4gVGhpcyBpcyBhIHVzZWZ1bCBkZWZhdWx0IHdoaWNoIGhlbHBzIGZpbmRpbmcgbWVtb3J5IGxlYWtzLlxudmFyIGRlZmF1bHRNYXhMaXN0ZW5lcnMgPSAxMDtcblxuZnVuY3Rpb24gY2hlY2tMaXN0ZW5lcihsaXN0ZW5lcikge1xuICBpZiAodHlwZW9mIGxpc3RlbmVyICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignVGhlIFwibGlzdGVuZXJcIiBhcmd1bWVudCBtdXN0IGJlIG9mIHR5cGUgRnVuY3Rpb24uIFJlY2VpdmVkIHR5cGUgJyArIHR5cGVvZiBsaXN0ZW5lcik7XG4gIH1cbn1cblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KEV2ZW50RW1pdHRlciwgJ2RlZmF1bHRNYXhMaXN0ZW5lcnMnLCB7XG4gIGVudW1lcmFibGU6IHRydWUsXG4gIGdldDogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIGRlZmF1bHRNYXhMaXN0ZW5lcnM7XG4gIH0sXG4gIHNldDogZnVuY3Rpb24oYXJnKSB7XG4gICAgaWYgKHR5cGVvZiBhcmcgIT09ICdudW1iZXInIHx8IGFyZyA8IDAgfHwgTnVtYmVySXNOYU4oYXJnKSkge1xuICAgICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ1RoZSB2YWx1ZSBvZiBcImRlZmF1bHRNYXhMaXN0ZW5lcnNcIiBpcyBvdXQgb2YgcmFuZ2UuIEl0IG11c3QgYmUgYSBub24tbmVnYXRpdmUgbnVtYmVyLiBSZWNlaXZlZCAnICsgYXJnICsgJy4nKTtcbiAgICB9XG4gICAgZGVmYXVsdE1heExpc3RlbmVycyA9IGFyZztcbiAgfVxufSk7XG5cbkV2ZW50RW1pdHRlci5pbml0ID0gZnVuY3Rpb24oKSB7XG5cbiAgaWYgKHRoaXMuX2V2ZW50cyA9PT0gdW5kZWZpbmVkIHx8XG4gICAgICB0aGlzLl9ldmVudHMgPT09IE9iamVjdC5nZXRQcm90b3R5cGVPZih0aGlzKS5fZXZlbnRzKSB7XG4gICAgdGhpcy5fZXZlbnRzID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICB0aGlzLl9ldmVudHNDb3VudCA9IDA7XG4gIH1cblxuICB0aGlzLl9tYXhMaXN0ZW5lcnMgPSB0aGlzLl9tYXhMaXN0ZW5lcnMgfHwgdW5kZWZpbmVkO1xufTtcblxuLy8gT2J2aW91c2x5IG5vdCBhbGwgRW1pdHRlcnMgc2hvdWxkIGJlIGxpbWl0ZWQgdG8gMTAuIFRoaXMgZnVuY3Rpb24gYWxsb3dzXG4vLyB0aGF0IHRvIGJlIGluY3JlYXNlZC4gU2V0IHRvIHplcm8gZm9yIHVubGltaXRlZC5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuc2V0TWF4TGlzdGVuZXJzID0gZnVuY3Rpb24gc2V0TWF4TGlzdGVuZXJzKG4pIHtcbiAgaWYgKHR5cGVvZiBuICE9PSAnbnVtYmVyJyB8fCBuIDwgMCB8fCBOdW1iZXJJc05hTihuKSkge1xuICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdUaGUgdmFsdWUgb2YgXCJuXCIgaXMgb3V0IG9mIHJhbmdlLiBJdCBtdXN0IGJlIGEgbm9uLW5lZ2F0aXZlIG51bWJlci4gUmVjZWl2ZWQgJyArIG4gKyAnLicpO1xuICB9XG4gIHRoaXMuX21heExpc3RlbmVycyA9IG47XG4gIHJldHVybiB0aGlzO1xufTtcblxuZnVuY3Rpb24gX2dldE1heExpc3RlbmVycyh0aGF0KSB7XG4gIGlmICh0aGF0Ll9tYXhMaXN0ZW5lcnMgPT09IHVuZGVmaW5lZClcbiAgICByZXR1cm4gRXZlbnRFbWl0dGVyLmRlZmF1bHRNYXhMaXN0ZW5lcnM7XG4gIHJldHVybiB0aGF0Ll9tYXhMaXN0ZW5lcnM7XG59XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuZ2V0TWF4TGlzdGVuZXJzID0gZnVuY3Rpb24gZ2V0TWF4TGlzdGVuZXJzKCkge1xuICByZXR1cm4gX2dldE1heExpc3RlbmVycyh0aGlzKTtcbn07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuZW1pdCA9IGZ1bmN0aW9uIGVtaXQodHlwZSkge1xuICB2YXIgYXJncyA9IFtdO1xuICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykgYXJncy5wdXNoKGFyZ3VtZW50c1tpXSk7XG4gIHZhciBkb0Vycm9yID0gKHR5cGUgPT09ICdlcnJvcicpO1xuXG4gIHZhciBldmVudHMgPSB0aGlzLl9ldmVudHM7XG4gIGlmIChldmVudHMgIT09IHVuZGVmaW5lZClcbiAgICBkb0Vycm9yID0gKGRvRXJyb3IgJiYgZXZlbnRzLmVycm9yID09PSB1bmRlZmluZWQpO1xuICBlbHNlIGlmICghZG9FcnJvcilcbiAgICByZXR1cm4gZmFsc2U7XG5cbiAgLy8gSWYgdGhlcmUgaXMgbm8gJ2Vycm9yJyBldmVudCBsaXN0ZW5lciB0aGVuIHRocm93LlxuICBpZiAoZG9FcnJvcikge1xuICAgIHZhciBlcjtcbiAgICBpZiAoYXJncy5sZW5ndGggPiAwKVxuICAgICAgZXIgPSBhcmdzWzBdO1xuICAgIGlmIChlciBpbnN0YW5jZW9mIEVycm9yKSB7XG4gICAgICAvLyBOb3RlOiBUaGUgY29tbWVudHMgb24gdGhlIGB0aHJvd2AgbGluZXMgYXJlIGludGVudGlvbmFsLCB0aGV5IHNob3dcbiAgICAgIC8vIHVwIGluIE5vZGUncyBvdXRwdXQgaWYgdGhpcyByZXN1bHRzIGluIGFuIHVuaGFuZGxlZCBleGNlcHRpb24uXG4gICAgICB0aHJvdyBlcjsgLy8gVW5oYW5kbGVkICdlcnJvcicgZXZlbnRcbiAgICB9XG4gICAgLy8gQXQgbGVhc3QgZ2l2ZSBzb21lIGtpbmQgb2YgY29udGV4dCB0byB0aGUgdXNlclxuICAgIHZhciBlcnIgPSBuZXcgRXJyb3IoJ1VuaGFuZGxlZCBlcnJvci4nICsgKGVyID8gJyAoJyArIGVyLm1lc3NhZ2UgKyAnKScgOiAnJykpO1xuICAgIGVyci5jb250ZXh0ID0gZXI7XG4gICAgdGhyb3cgZXJyOyAvLyBVbmhhbmRsZWQgJ2Vycm9yJyBldmVudFxuICB9XG5cbiAgdmFyIGhhbmRsZXIgPSBldmVudHNbdHlwZV07XG5cbiAgaWYgKGhhbmRsZXIgPT09IHVuZGVmaW5lZClcbiAgICByZXR1cm4gZmFsc2U7XG5cbiAgaWYgKHR5cGVvZiBoYW5kbGVyID09PSAnZnVuY3Rpb24nKSB7XG4gICAgUmVmbGVjdEFwcGx5KGhhbmRsZXIsIHRoaXMsIGFyZ3MpO1xuICB9IGVsc2Uge1xuICAgIHZhciBsZW4gPSBoYW5kbGVyLmxlbmd0aDtcbiAgICB2YXIgbGlzdGVuZXJzID0gYXJyYXlDbG9uZShoYW5kbGVyLCBsZW4pO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyArK2kpXG4gICAgICBSZWZsZWN0QXBwbHkobGlzdGVuZXJzW2ldLCB0aGlzLCBhcmdzKTtcbiAgfVxuXG4gIHJldHVybiB0cnVlO1xufTtcblxuZnVuY3Rpb24gX2FkZExpc3RlbmVyKHRhcmdldCwgdHlwZSwgbGlzdGVuZXIsIHByZXBlbmQpIHtcbiAgdmFyIG07XG4gIHZhciBldmVudHM7XG4gIHZhciBleGlzdGluZztcblxuICBjaGVja0xpc3RlbmVyKGxpc3RlbmVyKTtcblxuICBldmVudHMgPSB0YXJnZXQuX2V2ZW50cztcbiAgaWYgKGV2ZW50cyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgZXZlbnRzID0gdGFyZ2V0Ll9ldmVudHMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICAgIHRhcmdldC5fZXZlbnRzQ291bnQgPSAwO1xuICB9IGVsc2Uge1xuICAgIC8vIFRvIGF2b2lkIHJlY3Vyc2lvbiBpbiB0aGUgY2FzZSB0aGF0IHR5cGUgPT09IFwibmV3TGlzdGVuZXJcIiEgQmVmb3JlXG4gICAgLy8gYWRkaW5nIGl0IHRvIHRoZSBsaXN0ZW5lcnMsIGZpcnN0IGVtaXQgXCJuZXdMaXN0ZW5lclwiLlxuICAgIGlmIChldmVudHMubmV3TGlzdGVuZXIgIT09IHVuZGVmaW5lZCkge1xuICAgICAgdGFyZ2V0LmVtaXQoJ25ld0xpc3RlbmVyJywgdHlwZSxcbiAgICAgICAgICAgICAgICAgIGxpc3RlbmVyLmxpc3RlbmVyID8gbGlzdGVuZXIubGlzdGVuZXIgOiBsaXN0ZW5lcik7XG5cbiAgICAgIC8vIFJlLWFzc2lnbiBgZXZlbnRzYCBiZWNhdXNlIGEgbmV3TGlzdGVuZXIgaGFuZGxlciBjb3VsZCBoYXZlIGNhdXNlZCB0aGVcbiAgICAgIC8vIHRoaXMuX2V2ZW50cyB0byBiZSBhc3NpZ25lZCB0byBhIG5ldyBvYmplY3RcbiAgICAgIGV2ZW50cyA9IHRhcmdldC5fZXZlbnRzO1xuICAgIH1cbiAgICBleGlzdGluZyA9IGV2ZW50c1t0eXBlXTtcbiAgfVxuXG4gIGlmIChleGlzdGluZyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgLy8gT3B0aW1pemUgdGhlIGNhc2Ugb2Ygb25lIGxpc3RlbmVyLiBEb24ndCBuZWVkIHRoZSBleHRyYSBhcnJheSBvYmplY3QuXG4gICAgZXhpc3RpbmcgPSBldmVudHNbdHlwZV0gPSBsaXN0ZW5lcjtcbiAgICArK3RhcmdldC5fZXZlbnRzQ291bnQ7XG4gIH0gZWxzZSB7XG4gICAgaWYgKHR5cGVvZiBleGlzdGluZyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgLy8gQWRkaW5nIHRoZSBzZWNvbmQgZWxlbWVudCwgbmVlZCB0byBjaGFuZ2UgdG8gYXJyYXkuXG4gICAgICBleGlzdGluZyA9IGV2ZW50c1t0eXBlXSA9XG4gICAgICAgIHByZXBlbmQgPyBbbGlzdGVuZXIsIGV4aXN0aW5nXSA6IFtleGlzdGluZywgbGlzdGVuZXJdO1xuICAgICAgLy8gSWYgd2UndmUgYWxyZWFkeSBnb3QgYW4gYXJyYXksIGp1c3QgYXBwZW5kLlxuICAgIH0gZWxzZSBpZiAocHJlcGVuZCkge1xuICAgICAgZXhpc3RpbmcudW5zaGlmdChsaXN0ZW5lcik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGV4aXN0aW5nLnB1c2gobGlzdGVuZXIpO1xuICAgIH1cblxuICAgIC8vIENoZWNrIGZvciBsaXN0ZW5lciBsZWFrXG4gICAgbSA9IF9nZXRNYXhMaXN0ZW5lcnModGFyZ2V0KTtcbiAgICBpZiAobSA+IDAgJiYgZXhpc3RpbmcubGVuZ3RoID4gbSAmJiAhZXhpc3Rpbmcud2FybmVkKSB7XG4gICAgICBleGlzdGluZy53YXJuZWQgPSB0cnVlO1xuICAgICAgLy8gTm8gZXJyb3IgY29kZSBmb3IgdGhpcyBzaW5jZSBpdCBpcyBhIFdhcm5pbmdcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1yZXN0cmljdGVkLXN5bnRheFxuICAgICAgdmFyIHcgPSBuZXcgRXJyb3IoJ1Bvc3NpYmxlIEV2ZW50RW1pdHRlciBtZW1vcnkgbGVhayBkZXRlY3RlZC4gJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGV4aXN0aW5nLmxlbmd0aCArICcgJyArIFN0cmluZyh0eXBlKSArICcgbGlzdGVuZXJzICcgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAnYWRkZWQuIFVzZSBlbWl0dGVyLnNldE1heExpc3RlbmVycygpIHRvICcgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAnaW5jcmVhc2UgbGltaXQnKTtcbiAgICAgIHcubmFtZSA9ICdNYXhMaXN0ZW5lcnNFeGNlZWRlZFdhcm5pbmcnO1xuICAgICAgdy5lbWl0dGVyID0gdGFyZ2V0O1xuICAgICAgdy50eXBlID0gdHlwZTtcbiAgICAgIHcuY291bnQgPSBleGlzdGluZy5sZW5ndGg7XG4gICAgICBQcm9jZXNzRW1pdFdhcm5pbmcodyk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRhcmdldDtcbn1cblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5hZGRMaXN0ZW5lciA9IGZ1bmN0aW9uIGFkZExpc3RlbmVyKHR5cGUsIGxpc3RlbmVyKSB7XG4gIHJldHVybiBfYWRkTGlzdGVuZXIodGhpcywgdHlwZSwgbGlzdGVuZXIsIGZhbHNlKTtcbn07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUub24gPSBFdmVudEVtaXR0ZXIucHJvdG90eXBlLmFkZExpc3RlbmVyO1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLnByZXBlbmRMaXN0ZW5lciA9XG4gICAgZnVuY3Rpb24gcHJlcGVuZExpc3RlbmVyKHR5cGUsIGxpc3RlbmVyKSB7XG4gICAgICByZXR1cm4gX2FkZExpc3RlbmVyKHRoaXMsIHR5cGUsIGxpc3RlbmVyLCB0cnVlKTtcbiAgICB9O1xuXG5mdW5jdGlvbiBvbmNlV3JhcHBlcigpIHtcbiAgaWYgKCF0aGlzLmZpcmVkKSB7XG4gICAgdGhpcy50YXJnZXQucmVtb3ZlTGlzdGVuZXIodGhpcy50eXBlLCB0aGlzLndyYXBGbik7XG4gICAgdGhpcy5maXJlZCA9IHRydWU7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDApXG4gICAgICByZXR1cm4gdGhpcy5saXN0ZW5lci5jYWxsKHRoaXMudGFyZ2V0KTtcbiAgICByZXR1cm4gdGhpcy5saXN0ZW5lci5hcHBseSh0aGlzLnRhcmdldCwgYXJndW1lbnRzKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBfb25jZVdyYXAodGFyZ2V0LCB0eXBlLCBsaXN0ZW5lcikge1xuICB2YXIgc3RhdGUgPSB7IGZpcmVkOiBmYWxzZSwgd3JhcEZuOiB1bmRlZmluZWQsIHRhcmdldDogdGFyZ2V0LCB0eXBlOiB0eXBlLCBsaXN0ZW5lcjogbGlzdGVuZXIgfTtcbiAgdmFyIHdyYXBwZWQgPSBvbmNlV3JhcHBlci5iaW5kKHN0YXRlKTtcbiAgd3JhcHBlZC5saXN0ZW5lciA9IGxpc3RlbmVyO1xuICBzdGF0ZS53cmFwRm4gPSB3cmFwcGVkO1xuICByZXR1cm4gd3JhcHBlZDtcbn1cblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5vbmNlID0gZnVuY3Rpb24gb25jZSh0eXBlLCBsaXN0ZW5lcikge1xuICBjaGVja0xpc3RlbmVyKGxpc3RlbmVyKTtcbiAgdGhpcy5vbih0eXBlLCBfb25jZVdyYXAodGhpcywgdHlwZSwgbGlzdGVuZXIpKTtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLnByZXBlbmRPbmNlTGlzdGVuZXIgPVxuICAgIGZ1bmN0aW9uIHByZXBlbmRPbmNlTGlzdGVuZXIodHlwZSwgbGlzdGVuZXIpIHtcbiAgICAgIGNoZWNrTGlzdGVuZXIobGlzdGVuZXIpO1xuICAgICAgdGhpcy5wcmVwZW5kTGlzdGVuZXIodHlwZSwgX29uY2VXcmFwKHRoaXMsIHR5cGUsIGxpc3RlbmVyKSk7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuXG4vLyBFbWl0cyBhICdyZW1vdmVMaXN0ZW5lcicgZXZlbnQgaWYgYW5kIG9ubHkgaWYgdGhlIGxpc3RlbmVyIHdhcyByZW1vdmVkLlxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5yZW1vdmVMaXN0ZW5lciA9XG4gICAgZnVuY3Rpb24gcmVtb3ZlTGlzdGVuZXIodHlwZSwgbGlzdGVuZXIpIHtcbiAgICAgIHZhciBsaXN0LCBldmVudHMsIHBvc2l0aW9uLCBpLCBvcmlnaW5hbExpc3RlbmVyO1xuXG4gICAgICBjaGVja0xpc3RlbmVyKGxpc3RlbmVyKTtcblxuICAgICAgZXZlbnRzID0gdGhpcy5fZXZlbnRzO1xuICAgICAgaWYgKGV2ZW50cyA9PT0gdW5kZWZpbmVkKVxuICAgICAgICByZXR1cm4gdGhpcztcblxuICAgICAgbGlzdCA9IGV2ZW50c1t0eXBlXTtcbiAgICAgIGlmIChsaXN0ID09PSB1bmRlZmluZWQpXG4gICAgICAgIHJldHVybiB0aGlzO1xuXG4gICAgICBpZiAobGlzdCA9PT0gbGlzdGVuZXIgfHwgbGlzdC5saXN0ZW5lciA9PT0gbGlzdGVuZXIpIHtcbiAgICAgICAgaWYgKC0tdGhpcy5fZXZlbnRzQ291bnQgPT09IDApXG4gICAgICAgICAgdGhpcy5fZXZlbnRzID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgZGVsZXRlIGV2ZW50c1t0eXBlXTtcbiAgICAgICAgICBpZiAoZXZlbnRzLnJlbW92ZUxpc3RlbmVyKVxuICAgICAgICAgICAgdGhpcy5lbWl0KCdyZW1vdmVMaXN0ZW5lcicsIHR5cGUsIGxpc3QubGlzdGVuZXIgfHwgbGlzdGVuZXIpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKHR5cGVvZiBsaXN0ICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHBvc2l0aW9uID0gLTE7XG5cbiAgICAgICAgZm9yIChpID0gbGlzdC5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgICAgIGlmIChsaXN0W2ldID09PSBsaXN0ZW5lciB8fCBsaXN0W2ldLmxpc3RlbmVyID09PSBsaXN0ZW5lcikge1xuICAgICAgICAgICAgb3JpZ2luYWxMaXN0ZW5lciA9IGxpc3RbaV0ubGlzdGVuZXI7XG4gICAgICAgICAgICBwb3NpdGlvbiA9IGk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocG9zaXRpb24gPCAwKVxuICAgICAgICAgIHJldHVybiB0aGlzO1xuXG4gICAgICAgIGlmIChwb3NpdGlvbiA9PT0gMClcbiAgICAgICAgICBsaXN0LnNoaWZ0KCk7XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIHNwbGljZU9uZShsaXN0LCBwb3NpdGlvbik7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAobGlzdC5sZW5ndGggPT09IDEpXG4gICAgICAgICAgZXZlbnRzW3R5cGVdID0gbGlzdFswXTtcblxuICAgICAgICBpZiAoZXZlbnRzLnJlbW92ZUxpc3RlbmVyICE9PSB1bmRlZmluZWQpXG4gICAgICAgICAgdGhpcy5lbWl0KCdyZW1vdmVMaXN0ZW5lcicsIHR5cGUsIG9yaWdpbmFsTGlzdGVuZXIgfHwgbGlzdGVuZXIpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLm9mZiA9IEV2ZW50RW1pdHRlci5wcm90b3R5cGUucmVtb3ZlTGlzdGVuZXI7XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUucmVtb3ZlQWxsTGlzdGVuZXJzID1cbiAgICBmdW5jdGlvbiByZW1vdmVBbGxMaXN0ZW5lcnModHlwZSkge1xuICAgICAgdmFyIGxpc3RlbmVycywgZXZlbnRzLCBpO1xuXG4gICAgICBldmVudHMgPSB0aGlzLl9ldmVudHM7XG4gICAgICBpZiAoZXZlbnRzID09PSB1bmRlZmluZWQpXG4gICAgICAgIHJldHVybiB0aGlzO1xuXG4gICAgICAvLyBub3QgbGlzdGVuaW5nIGZvciByZW1vdmVMaXN0ZW5lciwgbm8gbmVlZCB0byBlbWl0XG4gICAgICBpZiAoZXZlbnRzLnJlbW92ZUxpc3RlbmVyID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICB0aGlzLl9ldmVudHMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICAgICAgICAgIHRoaXMuX2V2ZW50c0NvdW50ID0gMDtcbiAgICAgICAgfSBlbHNlIGlmIChldmVudHNbdHlwZV0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIGlmICgtLXRoaXMuX2V2ZW50c0NvdW50ID09PSAwKVxuICAgICAgICAgICAgdGhpcy5fZXZlbnRzID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICAgICAgICBlbHNlXG4gICAgICAgICAgICBkZWxldGUgZXZlbnRzW3R5cGVdO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgfVxuXG4gICAgICAvLyBlbWl0IHJlbW92ZUxpc3RlbmVyIGZvciBhbGwgbGlzdGVuZXJzIG9uIGFsbCBldmVudHNcbiAgICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHZhciBrZXlzID0gT2JqZWN0LmtleXMoZXZlbnRzKTtcbiAgICAgICAgdmFyIGtleTtcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IGtleXMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICBrZXkgPSBrZXlzW2ldO1xuICAgICAgICAgIGlmIChrZXkgPT09ICdyZW1vdmVMaXN0ZW5lcicpIGNvbnRpbnVlO1xuICAgICAgICAgIHRoaXMucmVtb3ZlQWxsTGlzdGVuZXJzKGtleSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5yZW1vdmVBbGxMaXN0ZW5lcnMoJ3JlbW92ZUxpc3RlbmVyJyk7XG4gICAgICAgIHRoaXMuX2V2ZW50cyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgICAgIHRoaXMuX2V2ZW50c0NvdW50ID0gMDtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICB9XG5cbiAgICAgIGxpc3RlbmVycyA9IGV2ZW50c1t0eXBlXTtcblxuICAgICAgaWYgKHR5cGVvZiBsaXN0ZW5lcnMgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgdGhpcy5yZW1vdmVMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lcnMpO1xuICAgICAgfSBlbHNlIGlmIChsaXN0ZW5lcnMgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAvLyBMSUZPIG9yZGVyXG4gICAgICAgIGZvciAoaSA9IGxpc3RlbmVycy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgICAgIHRoaXMucmVtb3ZlTGlzdGVuZXIodHlwZSwgbGlzdGVuZXJzW2ldKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuXG5mdW5jdGlvbiBfbGlzdGVuZXJzKHRhcmdldCwgdHlwZSwgdW53cmFwKSB7XG4gIHZhciBldmVudHMgPSB0YXJnZXQuX2V2ZW50cztcblxuICBpZiAoZXZlbnRzID09PSB1bmRlZmluZWQpXG4gICAgcmV0dXJuIFtdO1xuXG4gIHZhciBldmxpc3RlbmVyID0gZXZlbnRzW3R5cGVdO1xuICBpZiAoZXZsaXN0ZW5lciA9PT0gdW5kZWZpbmVkKVxuICAgIHJldHVybiBbXTtcblxuICBpZiAodHlwZW9mIGV2bGlzdGVuZXIgPT09ICdmdW5jdGlvbicpXG4gICAgcmV0dXJuIHVud3JhcCA/IFtldmxpc3RlbmVyLmxpc3RlbmVyIHx8IGV2bGlzdGVuZXJdIDogW2V2bGlzdGVuZXJdO1xuXG4gIHJldHVybiB1bndyYXAgP1xuICAgIHVud3JhcExpc3RlbmVycyhldmxpc3RlbmVyKSA6IGFycmF5Q2xvbmUoZXZsaXN0ZW5lciwgZXZsaXN0ZW5lci5sZW5ndGgpO1xufVxuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmxpc3RlbmVycyA9IGZ1bmN0aW9uIGxpc3RlbmVycyh0eXBlKSB7XG4gIHJldHVybiBfbGlzdGVuZXJzKHRoaXMsIHR5cGUsIHRydWUpO1xufTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5yYXdMaXN0ZW5lcnMgPSBmdW5jdGlvbiByYXdMaXN0ZW5lcnModHlwZSkge1xuICByZXR1cm4gX2xpc3RlbmVycyh0aGlzLCB0eXBlLCBmYWxzZSk7XG59O1xuXG5FdmVudEVtaXR0ZXIubGlzdGVuZXJDb3VudCA9IGZ1bmN0aW9uKGVtaXR0ZXIsIHR5cGUpIHtcbiAgaWYgKHR5cGVvZiBlbWl0dGVyLmxpc3RlbmVyQ291bnQgPT09ICdmdW5jdGlvbicpIHtcbiAgICByZXR1cm4gZW1pdHRlci5saXN0ZW5lckNvdW50KHR5cGUpO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBsaXN0ZW5lckNvdW50LmNhbGwoZW1pdHRlciwgdHlwZSk7XG4gIH1cbn07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUubGlzdGVuZXJDb3VudCA9IGxpc3RlbmVyQ291bnQ7XG5mdW5jdGlvbiBsaXN0ZW5lckNvdW50KHR5cGUpIHtcbiAgdmFyIGV2ZW50cyA9IHRoaXMuX2V2ZW50cztcblxuICBpZiAoZXZlbnRzICE9PSB1bmRlZmluZWQpIHtcbiAgICB2YXIgZXZsaXN0ZW5lciA9IGV2ZW50c1t0eXBlXTtcblxuICAgIGlmICh0eXBlb2YgZXZsaXN0ZW5lciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgcmV0dXJuIDE7XG4gICAgfSBlbHNlIGlmIChldmxpc3RlbmVyICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybiBldmxpc3RlbmVyLmxlbmd0aDtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gMDtcbn1cblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5ldmVudE5hbWVzID0gZnVuY3Rpb24gZXZlbnROYW1lcygpIHtcbiAgcmV0dXJuIHRoaXMuX2V2ZW50c0NvdW50ID4gMCA/IFJlZmxlY3RPd25LZXlzKHRoaXMuX2V2ZW50cykgOiBbXTtcbn07XG5cbmZ1bmN0aW9uIGFycmF5Q2xvbmUoYXJyLCBuKSB7XG4gIHZhciBjb3B5ID0gbmV3IEFycmF5KG4pO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IG47ICsraSlcbiAgICBjb3B5W2ldID0gYXJyW2ldO1xuICByZXR1cm4gY29weTtcbn1cblxuZnVuY3Rpb24gc3BsaWNlT25lKGxpc3QsIGluZGV4KSB7XG4gIGZvciAoOyBpbmRleCArIDEgPCBsaXN0Lmxlbmd0aDsgaW5kZXgrKylcbiAgICBsaXN0W2luZGV4XSA9IGxpc3RbaW5kZXggKyAxXTtcbiAgbGlzdC5wb3AoKTtcbn1cblxuZnVuY3Rpb24gdW53cmFwTGlzdGVuZXJzKGFycikge1xuICB2YXIgcmV0ID0gbmV3IEFycmF5KGFyci5sZW5ndGgpO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHJldC5sZW5ndGg7ICsraSkge1xuICAgIHJldFtpXSA9IGFycltpXS5saXN0ZW5lciB8fCBhcnJbaV07XG4gIH1cbiAgcmV0dXJuIHJldDtcbn1cblxuZnVuY3Rpb24gb25jZShlbWl0dGVyLCBuYW1lKSB7XG4gIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgZnVuY3Rpb24gZXJyb3JMaXN0ZW5lcihlcnIpIHtcbiAgICAgIGVtaXR0ZXIucmVtb3ZlTGlzdGVuZXIobmFtZSwgcmVzb2x2ZXIpO1xuICAgICAgcmVqZWN0KGVycik7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcmVzb2x2ZXIoKSB7XG4gICAgICBpZiAodHlwZW9mIGVtaXR0ZXIucmVtb3ZlTGlzdGVuZXIgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgZW1pdHRlci5yZW1vdmVMaXN0ZW5lcignZXJyb3InLCBlcnJvckxpc3RlbmVyKTtcbiAgICAgIH1cbiAgICAgIHJlc29sdmUoW10uc2xpY2UuY2FsbChhcmd1bWVudHMpKTtcbiAgICB9O1xuXG4gICAgZXZlbnRUYXJnZXRBZ25vc3RpY0FkZExpc3RlbmVyKGVtaXR0ZXIsIG5hbWUsIHJlc29sdmVyLCB7IG9uY2U6IHRydWUgfSk7XG4gICAgaWYgKG5hbWUgIT09ICdlcnJvcicpIHtcbiAgICAgIGFkZEVycm9ySGFuZGxlcklmRXZlbnRFbWl0dGVyKGVtaXR0ZXIsIGVycm9yTGlzdGVuZXIsIHsgb25jZTogdHJ1ZSB9KTtcbiAgICB9XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBhZGRFcnJvckhhbmRsZXJJZkV2ZW50RW1pdHRlcihlbWl0dGVyLCBoYW5kbGVyLCBmbGFncykge1xuICBpZiAodHlwZW9mIGVtaXR0ZXIub24gPT09ICdmdW5jdGlvbicpIHtcbiAgICBldmVudFRhcmdldEFnbm9zdGljQWRkTGlzdGVuZXIoZW1pdHRlciwgJ2Vycm9yJywgaGFuZGxlciwgZmxhZ3MpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGV2ZW50VGFyZ2V0QWdub3N0aWNBZGRMaXN0ZW5lcihlbWl0dGVyLCBuYW1lLCBsaXN0ZW5lciwgZmxhZ3MpIHtcbiAgaWYgKHR5cGVvZiBlbWl0dGVyLm9uID09PSAnZnVuY3Rpb24nKSB7XG4gICAgaWYgKGZsYWdzLm9uY2UpIHtcbiAgICAgIGVtaXR0ZXIub25jZShuYW1lLCBsaXN0ZW5lcik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGVtaXR0ZXIub24obmFtZSwgbGlzdGVuZXIpO1xuICAgIH1cbiAgfSBlbHNlIGlmICh0eXBlb2YgZW1pdHRlci5hZGRFdmVudExpc3RlbmVyID09PSAnZnVuY3Rpb24nKSB7XG4gICAgLy8gRXZlbnRUYXJnZXQgZG9lcyBub3QgaGF2ZSBgZXJyb3JgIGV2ZW50IHNlbWFudGljcyBsaWtlIE5vZGVcbiAgICAvLyBFdmVudEVtaXR0ZXJzLCB3ZSBkbyBub3QgbGlzdGVuIGZvciBgZXJyb3JgIGV2ZW50cyBoZXJlLlxuICAgIGVtaXR0ZXIuYWRkRXZlbnRMaXN0ZW5lcihuYW1lLCBmdW5jdGlvbiB3cmFwTGlzdGVuZXIoYXJnKSB7XG4gICAgICAvLyBJRSBkb2VzIG5vdCBoYXZlIGJ1aWx0aW4gYHsgb25jZTogdHJ1ZSB9YCBzdXBwb3J0IHNvIHdlXG4gICAgICAvLyBoYXZlIHRvIGRvIGl0IG1hbnVhbGx5LlxuICAgICAgaWYgKGZsYWdzLm9uY2UpIHtcbiAgICAgICAgZW1pdHRlci5yZW1vdmVFdmVudExpc3RlbmVyKG5hbWUsIHdyYXBMaXN0ZW5lcik7XG4gICAgICB9XG4gICAgICBsaXN0ZW5lcihhcmcpO1xuICAgIH0pO1xuICB9IGVsc2Uge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1RoZSBcImVtaXR0ZXJcIiBhcmd1bWVudCBtdXN0IGJlIG9mIHR5cGUgRXZlbnRFbWl0dGVyLiBSZWNlaXZlZCB0eXBlICcgKyB0eXBlb2YgZW1pdHRlcik7XG4gIH1cbn1cbiIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBnbG9iYWwgZG9jdW1lbnQgKi9cbi8qXG4gIGVzbGludC1kaXNhYmxlXG4gIG5vLWNvbnNvbGUsXG4gIGZ1bmMtbmFtZXNcbiovXG5cbnZhciBub3JtYWxpemVVcmwgPSByZXF1aXJlKFwiLi9ub3JtYWxpemUtdXJsXCIpO1xudmFyIHNyY0J5TW9kdWxlSWQgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xudmFyIG5vRG9jdW1lbnQgPSB0eXBlb2YgZG9jdW1lbnQgPT09IFwidW5kZWZpbmVkXCI7XG52YXIgZm9yRWFjaCA9IEFycmF5LnByb3RvdHlwZS5mb3JFYWNoO1xuXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUganNkb2Mvbm8tcmVzdHJpY3RlZC1zeW50YXhcbi8qKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gYW55IGZ1bmN0aW9uXG4gKiBAcGFyYW0ge251bWJlcn0gdGltZSB0aW1lXG4gKiBAcmV0dXJucyB7KCkgPT4gdm9pZH0gd3JhcHBlZCBmdW5jdGlvblxuICovXG5mdW5jdGlvbiBkZWJvdW5jZShmbiwgdGltZSkge1xuICB2YXIgdGltZW91dCA9IDA7XG4gIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgLy8gQHRzLWV4cGVjdC1lcnJvclxuICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcHJlZmVyLXJlc3QtcGFyYW1zXG4gICAgdmFyIGFyZ3MgPSBhcmd1bWVudHM7XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGZ1bmMtc3R5bGVcbiAgICB2YXIgZnVuY3Rpb25DYWxsID0gZnVuY3Rpb24gZnVuY3Rpb25DYWxsKCkge1xuICAgICAgcmV0dXJuIGZuLmFwcGx5KHNlbGYsIGFyZ3MpO1xuICAgIH07XG4gICAgY2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xuXG4gICAgLy8gQHRzLWV4cGVjdC1lcnJvclxuICAgIHRpbWVvdXQgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uQ2FsbCwgdGltZSk7XG4gIH07XG59XG5cbi8qKlxuICogQHJldHVybnMge3ZvaWR9XG4gKi9cbmZ1bmN0aW9uIG5vb3AoKSB7fVxuXG4vKiogQHR5cGVkZWYgeyhmaWxlbmFtZT86IHN0cmluZykgPT4gc3RyaW5nW119IEdldFNjcmlwdFNyYyAqL1xuXG4vKipcbiAqIEBwYXJhbSB7c3RyaW5nIHwgbnVtYmVyfSBtb2R1bGVJZCBhIG1vZHVsZSBpZFxuICogQHJldHVybnMge0dldFNjcmlwdFNyY30gY3VycmVudCBzY3JpcHQgdXJsXG4gKi9cbmZ1bmN0aW9uIGdldEN1cnJlbnRTY3JpcHRVcmwobW9kdWxlSWQpIHtcbiAgdmFyIHNyYyA9IHNyY0J5TW9kdWxlSWRbbW9kdWxlSWRdO1xuICBpZiAoIXNyYykge1xuICAgIGlmIChkb2N1bWVudC5jdXJyZW50U2NyaXB0KSB7XG4gICAgICBzcmMgPSAoLyoqIEB0eXBlIHtIVE1MU2NyaXB0RWxlbWVudH0gKi9kb2N1bWVudC5jdXJyZW50U2NyaXB0KS5zcmM7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBzY3JpcHRzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJzY3JpcHRcIik7XG4gICAgICB2YXIgbGFzdFNjcmlwdFRhZyA9IHNjcmlwdHNbc2NyaXB0cy5sZW5ndGggLSAxXTtcbiAgICAgIGlmIChsYXN0U2NyaXB0VGFnKSB7XG4gICAgICAgIHNyYyA9IGxhc3RTY3JpcHRUYWcuc3JjO1xuICAgICAgfVxuICAgIH1cbiAgICBzcmNCeU1vZHVsZUlkW21vZHVsZUlkXSA9IHNyYztcbiAgfVxuXG4gIC8qKiBAdHlwZSB7R2V0U2NyaXB0U3JjfSAqL1xuICByZXR1cm4gZnVuY3Rpb24gKGZpbGVNYXApIHtcbiAgICBpZiAoIXNyYykge1xuICAgICAgcmV0dXJuIFtdO1xuICAgIH1cbiAgICB2YXIgc3BsaXRSZXN1bHQgPSBzcmMuc3BsaXQoLyhbXlxcXFwvXSspXFwuanMkLyk7XG4gICAgdmFyIGZpbGVuYW1lID0gc3BsaXRSZXN1bHQgJiYgc3BsaXRSZXN1bHRbMV07XG4gICAgaWYgKCFmaWxlbmFtZSkge1xuICAgICAgcmV0dXJuIFtzcmMucmVwbGFjZShcIi5qc1wiLCBcIi5jc3NcIildO1xuICAgIH1cbiAgICBpZiAoIWZpbGVNYXApIHtcbiAgICAgIHJldHVybiBbc3JjLnJlcGxhY2UoXCIuanNcIiwgXCIuY3NzXCIpXTtcbiAgICB9XG4gICAgcmV0dXJuIGZpbGVNYXAuc3BsaXQoXCIsXCIpLm1hcChmdW5jdGlvbiAobWFwUnVsZSkge1xuICAgICAgdmFyIHJlZyA9IG5ldyBSZWdFeHAoXCJcIi5jb25jYXQoZmlsZW5hbWUsIFwiXFxcXC5qcyRcIiksIFwiZ1wiKTtcbiAgICAgIHJldHVybiBub3JtYWxpemVVcmwoc3JjLnJlcGxhY2UocmVnLCBcIlwiLmNvbmNhdChtYXBSdWxlLnJlcGxhY2UoL3tmaWxlTmFtZX0vZywgZmlsZW5hbWUpLCBcIi5jc3NcIikpKTtcbiAgICB9KTtcbiAgfTtcbn1cblxuLyoqXG4gKiBAcGFyYW0ge3N0cmluZ30gdXJsIFVSTFxuICogQHJldHVybnMge2Jvb2xlYW59IHRydWUgd2hlbiBVUkwgY2FuIGJlIHJlcXVlc3QsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc1VybFJlcXVlc3QodXJsKSB7XG4gIC8vIEFuIFVSTCBpcyBub3QgYW4gcmVxdWVzdCBpZlxuXG4gIC8vIEl0IGlzIG5vdCBodHRwIG9yIGh0dHBzXG4gIGlmICghL15bYS16QS1aXVthLXpBLVpcXGQrXFwtLl0qOi8udGVzdCh1cmwpKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHJldHVybiB0cnVlO1xufVxuXG4vKiogQHR5cGVkZWYge0hUTUxMaW5rRWxlbWVudCAmIHsgaXNMb2FkZWQ6IGJvb2xlYW4sIHZpc2l0ZWQ6IGJvb2xlYW4gfX0gSG90SFRNTExpbmtFbGVtZW50ICovXG5cbi8qKlxuICogQHBhcmFtIHtIb3RIVE1MTGlua0VsZW1lbnR9IGVsIGh0bWwgbGluayBlbGVtZW50XG4gKiBAcGFyYW0ge3N0cmluZz19IHVybCBhIFVSTFxuICovXG5mdW5jdGlvbiB1cGRhdGVDc3MoZWwsIHVybCkge1xuICBpZiAoIXVybCkge1xuICAgIGlmICghZWwuaHJlZikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZVxuICAgIHVybCA9IGVsLmhyZWYuc3BsaXQoXCI/XCIpWzBdO1xuICB9XG4gIGlmICghaXNVcmxSZXF1ZXN0KC8qKiBAdHlwZSB7c3RyaW5nfSAqL3VybCkpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgaWYgKGVsLmlzTG9hZGVkID09PSBmYWxzZSkge1xuICAgIC8vIFdlIHNlZW0gdG8gYmUgYWJvdXQgdG8gcmVwbGFjZSBhIGNzcyBsaW5rIHRoYXQgaGFzbid0IGxvYWRlZCB5ZXQuXG4gICAgLy8gV2UncmUgcHJvYmFibHkgY2hhbmdpbmcgdGhlIHNhbWUgZmlsZSBtb3JlIHRoYW4gb25jZS5cbiAgICByZXR1cm47XG4gIH1cblxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgdW5pY29ybi9wcmVmZXItaW5jbHVkZXNcbiAgaWYgKCF1cmwgfHwgISh1cmwuaW5kZXhPZihcIi5jc3NcIikgPiAtMSkpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgZWwudmlzaXRlZCA9IHRydWU7XG4gIHZhciBuZXdFbCA9IC8qKiBAdHlwZSB7SG90SFRNTExpbmtFbGVtZW50fSAqL1xuICBlbC5jbG9uZU5vZGUoKTtcbiAgbmV3RWwuaXNMb2FkZWQgPSBmYWxzZTtcbiAgbmV3RWwuYWRkRXZlbnRMaXN0ZW5lcihcImxvYWRcIiwgZnVuY3Rpb24gKCkge1xuICAgIGlmIChuZXdFbC5pc0xvYWRlZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBuZXdFbC5pc0xvYWRlZCA9IHRydWU7XG4gICAgaWYgKGVsLnBhcmVudE5vZGUpIHtcbiAgICAgIGVsLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoZWwpO1xuICAgIH1cbiAgfSk7XG4gIG5ld0VsLmFkZEV2ZW50TGlzdGVuZXIoXCJlcnJvclwiLCBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKG5ld0VsLmlzTG9hZGVkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIG5ld0VsLmlzTG9hZGVkID0gdHJ1ZTtcbiAgICBpZiAoZWwucGFyZW50Tm9kZSkge1xuICAgICAgZWwucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChlbCk7XG4gICAgfVxuICB9KTtcbiAgbmV3RWwuaHJlZiA9IFwiXCIuY29uY2F0KHVybCwgXCI/XCIpLmNvbmNhdChEYXRlLm5vdygpKTtcbiAgaWYgKGVsLnBhcmVudE5vZGUpIHtcbiAgICBpZiAoZWwubmV4dFNpYmxpbmcpIHtcbiAgICAgIGVsLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKG5ld0VsLCBlbC5uZXh0U2libGluZyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGVsLnBhcmVudE5vZGUuYXBwZW5kQ2hpbGQobmV3RWwpO1xuICAgIH1cbiAgfVxufVxuXG4vKipcbiAqIEBwYXJhbSB7c3RyaW5nfSBocmVmIGhyZWZcbiAqIEBwYXJhbSB7c3RyaW5nW119IHNyYyBzcmNcbiAqIEByZXR1cm5zIHt1bmRlZmluZWQgfCBzdHJpbmd9IGEgcmVsb2FkIHVybFxuICovXG5mdW5jdGlvbiBnZXRSZWxvYWRVcmwoaHJlZiwgc3JjKSB7XG4gIHZhciByZXQ7XG4gIGhyZWYgPSBub3JtYWxpemVVcmwoaHJlZik7XG4gIHNyYy5zb21lKFxuICAvKipcbiAgICogQHBhcmFtIHtzdHJpbmd9IHVybCB1cmxcbiAgICovXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBhcnJheS1jYWxsYmFjay1yZXR1cm5cbiAgZnVuY3Rpb24gKHVybCkge1xuICAgIC8vIEB0cy1leHBlY3QtZXJyb3IgZml4IG1lIGluIHRoZSBuZXh0IG1ham9yIHJlbGVhc2VcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgdW5pY29ybi9wcmVmZXItaW5jbHVkZXNcbiAgICBpZiAoaHJlZi5pbmRleE9mKHNyYykgPiAtMSkge1xuICAgICAgcmV0ID0gdXJsO1xuICAgIH1cbiAgfSk7XG4gIHJldHVybiByZXQ7XG59XG5cbi8qKlxuICogQHBhcmFtIHtzdHJpbmdbXX0gc3JjIHNvdXJjZVxuICogQHJldHVybnMge2Jvb2xlYW59IHRydWUgd2hlbiBsb2FkZWQsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiByZWxvYWRTdHlsZShzcmMpIHtcbiAgdmFyIGVsZW1lbnRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcImxpbmtcIik7XG4gIHZhciBsb2FkZWQgPSBmYWxzZTtcbiAgZm9yRWFjaC5jYWxsKGVsZW1lbnRzLCBmdW5jdGlvbiAoZWwpIHtcbiAgICBpZiAoIWVsLmhyZWYpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdmFyIHVybCA9IGdldFJlbG9hZFVybChlbC5ocmVmLCBzcmMpO1xuICAgIGlmICh1cmwgJiYgIWlzVXJsUmVxdWVzdCh1cmwpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmIChlbC52aXNpdGVkID09PSB0cnVlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmICh1cmwpIHtcbiAgICAgIHVwZGF0ZUNzcyhlbCwgdXJsKTtcbiAgICAgIGxvYWRlZCA9IHRydWU7XG4gICAgfVxuICB9KTtcbiAgcmV0dXJuIGxvYWRlZDtcbn1cblxuLyoqXG4gKiBAcmV0dXJucyB7dm9pZH1cbiAqL1xuZnVuY3Rpb24gcmVsb2FkQWxsKCkge1xuICB2YXIgZWxlbWVudHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwibGlua1wiKTtcbiAgZm9yRWFjaC5jYWxsKGVsZW1lbnRzLCBmdW5jdGlvbiAoZWwpIHtcbiAgICBpZiAoZWwudmlzaXRlZCA9PT0gdHJ1ZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB1cGRhdGVDc3MoZWwpO1xuICB9KTtcbn1cblxuLyoqXG4gKiBAcGFyYW0ge251bWJlciB8IHN0cmluZ30gbW9kdWxlSWQgYSBtb2R1bGUgaWRcbiAqIEBwYXJhbSB7eyBmaWxlbmFtZT86IHN0cmluZywgbG9jYWxzPzogYm9vbGVhbiB9fSBvcHRpb25zIG9wdGlvbnNcbiAqIEByZXR1cm5zIHsoKSA9PiB2b2lkfSB3cmFwcGVyIGZ1bmN0aW9uXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG1vZHVsZUlkLCBvcHRpb25zKSB7XG4gIGlmIChub0RvY3VtZW50KSB7XG4gICAgY29uc29sZS5sb2coXCJubyB3aW5kb3cuZG9jdW1lbnQgZm91bmQsIHdpbGwgbm90IEhNUiBDU1NcIik7XG4gICAgcmV0dXJuIG5vb3A7XG4gIH1cbiAgdmFyIGdldFNjcmlwdFNyYyA9IGdldEN1cnJlbnRTY3JpcHRVcmwobW9kdWxlSWQpO1xuXG4gIC8qKlxuICAgKiBAcmV0dXJucyB7dm9pZH1cbiAgICovXG4gIGZ1bmN0aW9uIHVwZGF0ZSgpIHtcbiAgICB2YXIgc3JjID0gZ2V0U2NyaXB0U3JjKG9wdGlvbnMuZmlsZW5hbWUpO1xuICAgIHZhciByZWxvYWRlZCA9IHJlbG9hZFN0eWxlKHNyYyk7XG4gICAgaWYgKG9wdGlvbnMubG9jYWxzKSB7XG4gICAgICBjb25zb2xlLmxvZyhcIltITVJdIERldGVjdGVkIGxvY2FsIGNzcyBtb2R1bGVzLiBSZWxvYWQgYWxsIGNzc1wiKTtcbiAgICAgIHJlbG9hZEFsbCgpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAocmVsb2FkZWQpIHtcbiAgICAgIGNvbnNvbGUubG9nKFwiW0hNUl0gY3NzIHJlbG9hZCAlc1wiLCBzcmMuam9pbihcIiBcIikpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zb2xlLmxvZyhcIltITVJdIFJlbG9hZCBhbGwgY3NzXCIpO1xuICAgICAgcmVsb2FkQWxsKCk7XG4gICAgfVxuICB9XG4gIHJldHVybiBkZWJvdW5jZSh1cGRhdGUsIDUwKTtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qKlxuICogQHBhcmFtIHtzdHJpbmdbXX0gcGF0aENvbXBvbmVudHMgcGF0aCBjb21wb25lbnRzXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBub3JtYWxpemVkIHVybFxuICovXG5mdW5jdGlvbiBub3JtYWxpemVVcmxJbm5lcihwYXRoQ29tcG9uZW50cykge1xuICByZXR1cm4gcGF0aENvbXBvbmVudHMucmVkdWNlKGZ1bmN0aW9uIChhY2N1bXVsYXRvciwgaXRlbSkge1xuICAgIHN3aXRjaCAoaXRlbSkge1xuICAgICAgY2FzZSBcIi4uXCI6XG4gICAgICAgIGFjY3VtdWxhdG9yLnBvcCgpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCIuXCI6XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgYWNjdW11bGF0b3IucHVzaChpdGVtKTtcbiAgICB9XG4gICAgcmV0dXJuIGFjY3VtdWxhdG9yO1xuICB9LCAvKiogQHR5cGUge3N0cmluZ1tdfSAqL1tdKS5qb2luKFwiL1wiKTtcbn1cblxuLyoqXG4gKiBAcGFyYW0ge3N0cmluZ30gdXJsU3RyaW5nIHVybCBzdHJpbmdcbiAqIEByZXR1cm5zIHtzdHJpbmd9IG5vcm1hbGl6ZWQgdXJsIHN0cmluZ1xuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIG5vcm1hbGl6ZVVybCh1cmxTdHJpbmcpIHtcbiAgdXJsU3RyaW5nID0gdXJsU3RyaW5nLnRyaW0oKTtcbiAgaWYgKC9eZGF0YTovaS50ZXN0KHVybFN0cmluZykpIHtcbiAgICByZXR1cm4gdXJsU3RyaW5nO1xuICB9XG4gIHZhciBwcm90b2NvbCA9XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSB1bmljb3JuL3ByZWZlci1pbmNsdWRlc1xuICB1cmxTdHJpbmcuaW5kZXhPZihcIi8vXCIpICE9PSAtMSA/IFwiXCIuY29uY2F0KHVybFN0cmluZy5zcGxpdChcIi8vXCIpWzBdLCBcIi8vXCIpIDogXCJcIjtcbiAgdmFyIGNvbXBvbmVudHMgPSB1cmxTdHJpbmcucmVwbGFjZShuZXcgUmVnRXhwKHByb3RvY29sLCBcImlcIiksIFwiXCIpLnNwbGl0KFwiL1wiKTtcbiAgdmFyIGhvc3QgPSBjb21wb25lbnRzWzBdLnRvTG93ZXJDYXNlKCkucmVwbGFjZSgvXFwuJC8sIFwiXCIpO1xuICBjb21wb25lbnRzWzBdID0gXCJcIjtcbiAgdmFyIHBhdGggPSBub3JtYWxpemVVcmxJbm5lcihjb21wb25lbnRzKTtcbiAgcmV0dXJuIHByb3RvY29sICsgaG9zdCArIHBhdGg7XG59OyIsImZ1bmN0aW9uIF90eXBlb2YobykgeyBcIkBiYWJlbC9oZWxwZXJzIC0gdHlwZW9mXCI7IHJldHVybiBfdHlwZW9mID0gXCJmdW5jdGlvblwiID09IHR5cGVvZiBTeW1ib2wgJiYgXCJzeW1ib2xcIiA9PSB0eXBlb2YgU3ltYm9sLml0ZXJhdG9yID8gZnVuY3Rpb24gKG8pIHsgcmV0dXJuIHR5cGVvZiBvOyB9IDogZnVuY3Rpb24gKG8pIHsgcmV0dXJuIG8gJiYgXCJmdW5jdGlvblwiID09IHR5cGVvZiBTeW1ib2wgJiYgby5jb25zdHJ1Y3RvciA9PT0gU3ltYm9sICYmIG8gIT09IFN5bWJvbC5wcm90b3R5cGUgPyBcInN5bWJvbFwiIDogdHlwZW9mIG87IH0sIF90eXBlb2Yobyk7IH1cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhhLCBuKSB7IGlmICghKGEgaW5zdGFuY2VvZiBuKSkgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTsgfVxuZnVuY3Rpb24gX2RlZmluZVByb3BlcnRpZXMoZSwgcikgeyBmb3IgKHZhciB0ID0gMDsgdCA8IHIubGVuZ3RoOyB0KyspIHsgdmFyIG8gPSByW3RdOyBvLmVudW1lcmFibGUgPSBvLmVudW1lcmFibGUgfHwgITEsIG8uY29uZmlndXJhYmxlID0gITAsIFwidmFsdWVcIiBpbiBvICYmIChvLndyaXRhYmxlID0gITApLCBPYmplY3QuZGVmaW5lUHJvcGVydHkoZSwgX3RvUHJvcGVydHlLZXkoby5rZXkpLCBvKTsgfSB9XG5mdW5jdGlvbiBfY3JlYXRlQ2xhc3MoZSwgciwgdCkgeyByZXR1cm4gciAmJiBfZGVmaW5lUHJvcGVydGllcyhlLnByb3RvdHlwZSwgciksIHQgJiYgX2RlZmluZVByb3BlcnRpZXMoZSwgdCksIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShlLCBcInByb3RvdHlwZVwiLCB7IHdyaXRhYmxlOiAhMSB9KSwgZTsgfVxuZnVuY3Rpb24gX3RvUHJvcGVydHlLZXkodCkgeyB2YXIgaSA9IF90b1ByaW1pdGl2ZSh0LCBcInN0cmluZ1wiKTsgcmV0dXJuIFwic3ltYm9sXCIgPT0gX3R5cGVvZihpKSA/IGkgOiBpICsgXCJcIjsgfVxuZnVuY3Rpb24gX3RvUHJpbWl0aXZlKHQsIHIpIHsgaWYgKFwib2JqZWN0XCIgIT0gX3R5cGVvZih0KSB8fCAhdCkgcmV0dXJuIHQ7IHZhciBlID0gdFtTeW1ib2wudG9QcmltaXRpdmVdOyBpZiAodm9pZCAwICE9PSBlKSB7IHZhciBpID0gZS5jYWxsKHQsIHIgfHwgXCJkZWZhdWx0XCIpOyBpZiAoXCJvYmplY3RcIiAhPSBfdHlwZW9mKGkpKSByZXR1cm4gaTsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkBAdG9QcmltaXRpdmUgbXVzdCByZXR1cm4gYSBwcmltaXRpdmUgdmFsdWUuXCIpOyB9IHJldHVybiAoXCJzdHJpbmdcIiA9PT0gciA/IFN0cmluZyA6IE51bWJlcikodCk7IH1cbmltcG9ydCB7IGxvZyB9IGZyb20gXCIuLi91dGlscy9sb2cuanNcIjtcbnZhciBXZWJTb2NrZXRDbGllbnQgPSAvKiNfX1BVUkVfXyovZnVuY3Rpb24gKCkge1xuICAvKipcbiAgICogQHBhcmFtIHtzdHJpbmd9IHVybFxuICAgKi9cbiAgZnVuY3Rpb24gV2ViU29ja2V0Q2xpZW50KHVybCkge1xuICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBXZWJTb2NrZXRDbGllbnQpO1xuICAgIHRoaXMuY2xpZW50ID0gbmV3IFdlYlNvY2tldCh1cmwpO1xuICAgIHRoaXMuY2xpZW50Lm9uZXJyb3IgPSBmdW5jdGlvbiAoZXJyb3IpIHtcbiAgICAgIGxvZy5lcnJvcihlcnJvcik7XG4gICAgfTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0geyguLi5hcmdzOiBhbnlbXSkgPT4gdm9pZH0gZlxuICAgKi9cbiAgcmV0dXJuIF9jcmVhdGVDbGFzcyhXZWJTb2NrZXRDbGllbnQsIFt7XG4gICAga2V5OiBcIm9uT3BlblwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBvbk9wZW4oZikge1xuICAgICAgdGhpcy5jbGllbnQub25vcGVuID0gZjtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0geyguLi5hcmdzOiBhbnlbXSkgPT4gdm9pZH0gZlxuICAgICAqL1xuICB9LCB7XG4gICAga2V5OiBcIm9uQ2xvc2VcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gb25DbG9zZShmKSB7XG4gICAgICB0aGlzLmNsaWVudC5vbmNsb3NlID0gZjtcbiAgICB9XG5cbiAgICAvLyBjYWxsIGYgd2l0aCB0aGUgbWVzc2FnZSBzdHJpbmcgYXMgdGhlIGZpcnN0IGFyZ3VtZW50XG4gICAgLyoqXG4gICAgICogQHBhcmFtIHsoLi4uYXJnczogYW55W10pID0+IHZvaWR9IGZcbiAgICAgKi9cbiAgfSwge1xuICAgIGtleTogXCJvbk1lc3NhZ2VcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gb25NZXNzYWdlKGYpIHtcbiAgICAgIHRoaXMuY2xpZW50Lm9ubWVzc2FnZSA9IGZ1bmN0aW9uIChlKSB7XG4gICAgICAgIGYoZS5kYXRhKTtcbiAgICAgIH07XG4gICAgfVxuICB9XSk7XG59KCk7XG5leHBvcnQgeyBXZWJTb2NrZXRDbGllbnQgYXMgZGVmYXVsdCB9OyIsImZ1bmN0aW9uIG93bktleXMoZSwgcikgeyB2YXIgdCA9IE9iamVjdC5rZXlzKGUpOyBpZiAoT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scykgeyB2YXIgbyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMoZSk7IHIgJiYgKG8gPSBvLmZpbHRlcihmdW5jdGlvbiAocikgeyByZXR1cm4gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihlLCByKS5lbnVtZXJhYmxlOyB9KSksIHQucHVzaC5hcHBseSh0LCBvKTsgfSByZXR1cm4gdDsgfVxuZnVuY3Rpb24gX29iamVjdFNwcmVhZChlKSB7IGZvciAodmFyIHIgPSAxOyByIDwgYXJndW1lbnRzLmxlbmd0aDsgcisrKSB7IHZhciB0ID0gbnVsbCAhPSBhcmd1bWVudHNbcl0gPyBhcmd1bWVudHNbcl0gOiB7fTsgciAlIDIgPyBvd25LZXlzKE9iamVjdCh0KSwgITApLmZvckVhY2goZnVuY3Rpb24gKHIpIHsgX2RlZmluZVByb3BlcnR5KGUsIHIsIHRbcl0pOyB9KSA6IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JzID8gT2JqZWN0LmRlZmluZVByb3BlcnRpZXMoZSwgT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcnModCkpIDogb3duS2V5cyhPYmplY3QodCkpLmZvckVhY2goZnVuY3Rpb24gKHIpIHsgT2JqZWN0LmRlZmluZVByb3BlcnR5KGUsIHIsIE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodCwgcikpOyB9KTsgfSByZXR1cm4gZTsgfVxuZnVuY3Rpb24gX2RlZmluZVByb3BlcnR5KGUsIHIsIHQpIHsgcmV0dXJuIChyID0gX3RvUHJvcGVydHlLZXkocikpIGluIGUgPyBPYmplY3QuZGVmaW5lUHJvcGVydHkoZSwgciwgeyB2YWx1ZTogdCwgZW51bWVyYWJsZTogITAsIGNvbmZpZ3VyYWJsZTogITAsIHdyaXRhYmxlOiAhMCB9KSA6IGVbcl0gPSB0LCBlOyB9XG5mdW5jdGlvbiBfdG9Qcm9wZXJ0eUtleSh0KSB7IHZhciBpID0gX3RvUHJpbWl0aXZlKHQsIFwic3RyaW5nXCIpOyByZXR1cm4gXCJzeW1ib2xcIiA9PSBfdHlwZW9mKGkpID8gaSA6IGkgKyBcIlwiOyB9XG5mdW5jdGlvbiBfdG9QcmltaXRpdmUodCwgcikgeyBpZiAoXCJvYmplY3RcIiAhPSBfdHlwZW9mKHQpIHx8ICF0KSByZXR1cm4gdDsgdmFyIGUgPSB0W1N5bWJvbC50b1ByaW1pdGl2ZV07IGlmICh2b2lkIDAgIT09IGUpIHsgdmFyIGkgPSBlLmNhbGwodCwgciB8fCBcImRlZmF1bHRcIik7IGlmIChcIm9iamVjdFwiICE9IF90eXBlb2YoaSkpIHJldHVybiBpOyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQEB0b1ByaW1pdGl2ZSBtdXN0IHJldHVybiBhIHByaW1pdGl2ZSB2YWx1ZS5cIik7IH0gcmV0dXJuIChcInN0cmluZ1wiID09PSByID8gU3RyaW5nIDogTnVtYmVyKSh0KTsgfVxuZnVuY3Rpb24gX3R5cGVvZihvKSB7IFwiQGJhYmVsL2hlbHBlcnMgLSB0eXBlb2ZcIjsgcmV0dXJuIF90eXBlb2YgPSBcImZ1bmN0aW9uXCIgPT0gdHlwZW9mIFN5bWJvbCAmJiBcInN5bWJvbFwiID09IHR5cGVvZiBTeW1ib2wuaXRlcmF0b3IgPyBmdW5jdGlvbiAobykgeyByZXR1cm4gdHlwZW9mIG87IH0gOiBmdW5jdGlvbiAobykgeyByZXR1cm4gbyAmJiBcImZ1bmN0aW9uXCIgPT0gdHlwZW9mIFN5bWJvbCAmJiBvLmNvbnN0cnVjdG9yID09PSBTeW1ib2wgJiYgbyAhPT0gU3ltYm9sLnByb3RvdHlwZSA/IFwic3ltYm9sXCIgOiB0eXBlb2YgbzsgfSwgX3R5cGVvZihvKTsgfVxuLyogZ2xvYmFsIF9fcmVzb3VyY2VRdWVyeSwgX193ZWJwYWNrX2hhc2hfXyAqL1xuLy8vIDxyZWZlcmVuY2UgdHlwZXM9XCJ3ZWJwYWNrL21vZHVsZVwiIC8+XG5pbXBvcnQgd2VicGFja0hvdExvZyBmcm9tIFwid2VicGFjay9ob3QvbG9nLmpzXCI7XG5pbXBvcnQgaG90RW1pdHRlciBmcm9tIFwid2VicGFjay9ob3QvZW1pdHRlci5qc1wiO1xuaW1wb3J0IHNvY2tldCBmcm9tIFwiLi9zb2NrZXQuanNcIjtcbmltcG9ydCB7IGZvcm1hdFByb2JsZW0sIGNyZWF0ZU92ZXJsYXkgfSBmcm9tIFwiLi9vdmVybGF5LmpzXCI7XG5pbXBvcnQgeyBsb2csIHNldExvZ0xldmVsIH0gZnJvbSBcIi4vdXRpbHMvbG9nLmpzXCI7XG5pbXBvcnQgc2VuZE1lc3NhZ2UgZnJvbSBcIi4vdXRpbHMvc2VuZE1lc3NhZ2UuanNcIjtcbmltcG9ydCB7IGlzUHJvZ3Jlc3NTdXBwb3J0ZWQsIGRlZmluZVByb2dyZXNzRWxlbWVudCB9IGZyb20gXCIuL3Byb2dyZXNzLmpzXCI7XG5cbi8qKlxuICogQHR5cGVkZWYge09iamVjdH0gT3ZlcmxheU9wdGlvbnNcbiAqIEBwcm9wZXJ0eSB7Ym9vbGVhbiB8IChlcnJvcjogRXJyb3IpID0+IGJvb2xlYW59IFt3YXJuaW5nc11cbiAqIEBwcm9wZXJ0eSB7Ym9vbGVhbiB8IChlcnJvcjogRXJyb3IpID0+IGJvb2xlYW59IFtlcnJvcnNdXG4gKiBAcHJvcGVydHkge2Jvb2xlYW4gfCAoZXJyb3I6IEVycm9yKSA9PiBib29sZWFufSBbcnVudGltZUVycm9yc11cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBbdHJ1c3RlZFR5cGVzUG9saWN5TmFtZV1cbiAqL1xuXG4vKipcbiAqIEB0eXBlZGVmIHtPYmplY3R9IE9wdGlvbnNcbiAqIEBwcm9wZXJ0eSB7Ym9vbGVhbn0gaG90XG4gKiBAcHJvcGVydHkge2Jvb2xlYW59IGxpdmVSZWxvYWRcbiAqIEBwcm9wZXJ0eSB7Ym9vbGVhbn0gcHJvZ3Jlc3NcbiAqIEBwcm9wZXJ0eSB7Ym9vbGVhbiB8IE92ZXJsYXlPcHRpb25zfSBvdmVybGF5XG4gKiBAcHJvcGVydHkge3N0cmluZ30gW2xvZ2dpbmddXG4gKiBAcHJvcGVydHkge251bWJlcn0gW3JlY29ubmVjdF1cbiAqL1xuXG4vKipcbiAqIEB0eXBlZGVmIHtPYmplY3R9IFN0YXR1c1xuICogQHByb3BlcnR5IHtib29sZWFufSBpc1VubG9hZGluZ1xuICogQHByb3BlcnR5IHtzdHJpbmd9IGN1cnJlbnRIYXNoXG4gKiBAcHJvcGVydHkge3N0cmluZ30gW3ByZXZpb3VzSGFzaF1cbiAqL1xuXG4vKipcbiAqIEBwYXJhbSB7Ym9vbGVhbiB8IHsgd2FybmluZ3M/OiBib29sZWFuIHwgc3RyaW5nOyBlcnJvcnM/OiBib29sZWFuIHwgc3RyaW5nOyBydW50aW1lRXJyb3JzPzogYm9vbGVhbiB8IHN0cmluZzsgfX0gb3ZlcmxheU9wdGlvbnNcbiAqL1xudmFyIGRlY29kZU92ZXJsYXlPcHRpb25zID0gZnVuY3Rpb24gZGVjb2RlT3ZlcmxheU9wdGlvbnMob3ZlcmxheU9wdGlvbnMpIHtcbiAgaWYgKF90eXBlb2Yob3ZlcmxheU9wdGlvbnMpID09PSBcIm9iamVjdFwiKSB7XG4gICAgW1wid2FybmluZ3NcIiwgXCJlcnJvcnNcIiwgXCJydW50aW1lRXJyb3JzXCJdLmZvckVhY2goZnVuY3Rpb24gKHByb3BlcnR5KSB7XG4gICAgICBpZiAodHlwZW9mIG92ZXJsYXlPcHRpb25zW3Byb3BlcnR5XSA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICB2YXIgb3ZlcmxheUZpbHRlckZ1bmN0aW9uU3RyaW5nID0gZGVjb2RlVVJJQ29tcG9uZW50KG92ZXJsYXlPcHRpb25zW3Byb3BlcnR5XSk7XG5cbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLW5ldy1mdW5jXG4gICAgICAgIG92ZXJsYXlPcHRpb25zW3Byb3BlcnR5XSA9IG5ldyBGdW5jdGlvbihcIm1lc3NhZ2VcIiwgXCJ2YXIgY2FsbGJhY2sgPSBcIi5jb25jYXQob3ZlcmxheUZpbHRlckZ1bmN0aW9uU3RyaW5nLCBcIlxcbiAgICAgICAgcmV0dXJuIGNhbGxiYWNrKG1lc3NhZ2UpXCIpKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxufTtcblxuLyoqXG4gKiBAdHlwZSB7U3RhdHVzfVxuICovXG52YXIgc3RhdHVzID0ge1xuICBpc1VubG9hZGluZzogZmFsc2UsXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBjYW1lbGNhc2VcbiAgY3VycmVudEhhc2g6IF9fd2VicGFja19oYXNoX19cbn07XG5cbi8qKlxuICogQHJldHVybnMge3N0cmluZ31cbiAqL1xudmFyIGdldEN1cnJlbnRTY3JpcHRTb3VyY2UgPSBmdW5jdGlvbiBnZXRDdXJyZW50U2NyaXB0U291cmNlKCkge1xuICAvLyBgZG9jdW1lbnQuY3VycmVudFNjcmlwdGAgaXMgdGhlIG1vc3QgYWNjdXJhdGUgd2F5IHRvIGZpbmQgdGhlIGN1cnJlbnQgc2NyaXB0LFxuICAvLyBidXQgaXMgbm90IHN1cHBvcnRlZCBpbiBhbGwgYnJvd3NlcnMuXG4gIGlmIChkb2N1bWVudC5jdXJyZW50U2NyaXB0KSB7XG4gICAgcmV0dXJuIGRvY3VtZW50LmN1cnJlbnRTY3JpcHQuZ2V0QXR0cmlidXRlKFwic3JjXCIpO1xuICB9XG5cbiAgLy8gRmFsbGJhY2sgdG8gZ2V0dGluZyBhbGwgc2NyaXB0cyBydW5uaW5nIGluIHRoZSBkb2N1bWVudC5cbiAgdmFyIHNjcmlwdEVsZW1lbnRzID0gZG9jdW1lbnQuc2NyaXB0cyB8fCBbXTtcbiAgdmFyIHNjcmlwdEVsZW1lbnRzV2l0aFNyYyA9IEFycmF5LnByb3RvdHlwZS5maWx0ZXIuY2FsbChzY3JpcHRFbGVtZW50cywgZnVuY3Rpb24gKGVsZW1lbnQpIHtcbiAgICByZXR1cm4gZWxlbWVudC5nZXRBdHRyaWJ1dGUoXCJzcmNcIik7XG4gIH0pO1xuICBpZiAoc2NyaXB0RWxlbWVudHNXaXRoU3JjLmxlbmd0aCA+IDApIHtcbiAgICB2YXIgY3VycmVudFNjcmlwdCA9IHNjcmlwdEVsZW1lbnRzV2l0aFNyY1tzY3JpcHRFbGVtZW50c1dpdGhTcmMubGVuZ3RoIC0gMV07XG4gICAgcmV0dXJuIGN1cnJlbnRTY3JpcHQuZ2V0QXR0cmlidXRlKFwic3JjXCIpO1xuICB9XG5cbiAgLy8gRmFpbCBhcyB0aGVyZSB3YXMgbm8gc2NyaXB0IHRvIHVzZS5cbiAgdGhyb3cgbmV3IEVycm9yKFwiW3dlYnBhY2stZGV2LXNlcnZlcl0gRmFpbGVkIHRvIGdldCBjdXJyZW50IHNjcmlwdCBzb3VyY2UuXCIpO1xufTtcblxuLyoqXG4gKiBAcGFyYW0ge3N0cmluZ30gcmVzb3VyY2VRdWVyeVxuICogQHJldHVybnMge3sgW2tleTogc3RyaW5nXTogc3RyaW5nIHwgYm9vbGVhbiB9fVxuICovXG52YXIgcGFyc2VVUkwgPSBmdW5jdGlvbiBwYXJzZVVSTChyZXNvdXJjZVF1ZXJ5KSB7XG4gIC8qKiBAdHlwZSB7eyBba2V5OiBzdHJpbmddOiBzdHJpbmcgfX0gKi9cbiAgdmFyIHJlc3VsdCA9IHt9O1xuICBpZiAodHlwZW9mIHJlc291cmNlUXVlcnkgPT09IFwic3RyaW5nXCIgJiYgcmVzb3VyY2VRdWVyeSAhPT0gXCJcIikge1xuICAgIHZhciBzZWFyY2hQYXJhbXMgPSByZXNvdXJjZVF1ZXJ5LnNsaWNlKDEpLnNwbGl0KFwiJlwiKTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNlYXJjaFBhcmFtcy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIHBhaXIgPSBzZWFyY2hQYXJhbXNbaV0uc3BsaXQoXCI9XCIpO1xuICAgICAgcmVzdWx0W3BhaXJbMF1dID0gZGVjb2RlVVJJQ29tcG9uZW50KHBhaXJbMV0pO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICAvLyBFbHNlLCBnZXQgdGhlIHVybCBmcm9tIHRoZSA8c2NyaXB0PiB0aGlzIGZpbGUgd2FzIGNhbGxlZCB3aXRoLlxuICAgIHZhciBzY3JpcHRTb3VyY2UgPSBnZXRDdXJyZW50U2NyaXB0U291cmNlKCk7XG4gICAgdmFyIHNjcmlwdFNvdXJjZVVSTDtcbiAgICB0cnkge1xuICAgICAgLy8gVGhlIHBsYWNlaG9sZGVyIGBiYXNlVVJMYCB3aXRoIGB3aW5kb3cubG9jYXRpb24uaHJlZmAsXG4gICAgICAvLyBpcyB0byBhbGxvdyBwYXJzaW5nIG9mIHBhdGgtcmVsYXRpdmUgb3IgcHJvdG9jb2wtcmVsYXRpdmUgVVJMcyxcbiAgICAgIC8vIGFuZCB3aWxsIGhhdmUgbm8gZWZmZWN0IGlmIGBzY3JpcHRTb3VyY2VgIGlzIGEgZnVsbHkgdmFsaWQgVVJMLlxuICAgICAgc2NyaXB0U291cmNlVVJMID0gbmV3IFVSTChzY3JpcHRTb3VyY2UsIHNlbGYubG9jYXRpb24uaHJlZik7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIC8vIFVSTCBwYXJzaW5nIGZhaWxlZCwgZG8gbm90aGluZy5cbiAgICAgIC8vIFdlIHdpbGwgc3RpbGwgcHJvY2VlZCB0byBzZWUgaWYgd2UgY2FuIHJlY292ZXIgdXNpbmcgYHJlc291cmNlUXVlcnlgXG4gICAgfVxuICAgIGlmIChzY3JpcHRTb3VyY2VVUkwpIHtcbiAgICAgIHJlc3VsdCA9IHNjcmlwdFNvdXJjZVVSTDtcbiAgICAgIHJlc3VsdC5mcm9tQ3VycmVudFNjcmlwdCA9IHRydWU7XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59O1xudmFyIHBhcnNlZFJlc291cmNlUXVlcnkgPSBwYXJzZVVSTChfX3Jlc291cmNlUXVlcnkpO1xudmFyIGVuYWJsZWRGZWF0dXJlcyA9IHtcbiAgXCJIb3QgTW9kdWxlIFJlcGxhY2VtZW50XCI6IGZhbHNlLFxuICBcIkxpdmUgUmVsb2FkaW5nXCI6IGZhbHNlLFxuICBQcm9ncmVzczogZmFsc2UsXG4gIE92ZXJsYXk6IGZhbHNlXG59O1xuXG4vKiogQHR5cGUge09wdGlvbnN9ICovXG52YXIgb3B0aW9ucyA9IHtcbiAgaG90OiBmYWxzZSxcbiAgbGl2ZVJlbG9hZDogZmFsc2UsXG4gIHByb2dyZXNzOiBmYWxzZSxcbiAgb3ZlcmxheTogZmFsc2Vcbn07XG5pZiAocGFyc2VkUmVzb3VyY2VRdWVyeS5ob3QgPT09IFwidHJ1ZVwiKSB7XG4gIG9wdGlvbnMuaG90ID0gdHJ1ZTtcbiAgZW5hYmxlZEZlYXR1cmVzW1wiSG90IE1vZHVsZSBSZXBsYWNlbWVudFwiXSA9IHRydWU7XG59XG5pZiAocGFyc2VkUmVzb3VyY2VRdWVyeVtcImxpdmUtcmVsb2FkXCJdID09PSBcInRydWVcIikge1xuICBvcHRpb25zLmxpdmVSZWxvYWQgPSB0cnVlO1xuICBlbmFibGVkRmVhdHVyZXNbXCJMaXZlIFJlbG9hZGluZ1wiXSA9IHRydWU7XG59XG5pZiAocGFyc2VkUmVzb3VyY2VRdWVyeS5wcm9ncmVzcyA9PT0gXCJ0cnVlXCIpIHtcbiAgb3B0aW9ucy5wcm9ncmVzcyA9IHRydWU7XG4gIGVuYWJsZWRGZWF0dXJlcy5Qcm9ncmVzcyA9IHRydWU7XG59XG5pZiAocGFyc2VkUmVzb3VyY2VRdWVyeS5vdmVybGF5KSB7XG4gIHRyeSB7XG4gICAgb3B0aW9ucy5vdmVybGF5ID0gSlNPTi5wYXJzZShwYXJzZWRSZXNvdXJjZVF1ZXJ5Lm92ZXJsYXkpO1xuICB9IGNhdGNoIChlKSB7XG4gICAgbG9nLmVycm9yKFwiRXJyb3IgcGFyc2luZyBvdmVybGF5IG9wdGlvbnMgZnJvbSByZXNvdXJjZSBxdWVyeTpcIiwgZSk7XG4gIH1cblxuICAvLyBGaWxsIGluIGRlZmF1bHQgXCJ0cnVlXCIgcGFyYW1zIGZvciBwYXJ0aWFsbHktc3BlY2lmaWVkIG9iamVjdHMuXG4gIGlmIChfdHlwZW9mKG9wdGlvbnMub3ZlcmxheSkgPT09IFwib2JqZWN0XCIpIHtcbiAgICBvcHRpb25zLm92ZXJsYXkgPSBfb2JqZWN0U3ByZWFkKHtcbiAgICAgIGVycm9yczogdHJ1ZSxcbiAgICAgIHdhcm5pbmdzOiB0cnVlLFxuICAgICAgcnVudGltZUVycm9yczogdHJ1ZVxuICAgIH0sIG9wdGlvbnMub3ZlcmxheSk7XG4gICAgZGVjb2RlT3ZlcmxheU9wdGlvbnMob3B0aW9ucy5vdmVybGF5KTtcbiAgfVxuICBlbmFibGVkRmVhdHVyZXMuT3ZlcmxheSA9IG9wdGlvbnMub3ZlcmxheSAhPT0gZmFsc2U7XG59XG5pZiAocGFyc2VkUmVzb3VyY2VRdWVyeS5sb2dnaW5nKSB7XG4gIG9wdGlvbnMubG9nZ2luZyA9IHBhcnNlZFJlc291cmNlUXVlcnkubG9nZ2luZztcbn1cbmlmICh0eXBlb2YgcGFyc2VkUmVzb3VyY2VRdWVyeS5yZWNvbm5lY3QgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgb3B0aW9ucy5yZWNvbm5lY3QgPSBOdW1iZXIocGFyc2VkUmVzb3VyY2VRdWVyeS5yZWNvbm5lY3QpO1xufVxuXG4vKipcbiAqIEBwYXJhbSB7c3RyaW5nfSBsZXZlbFxuICovXG52YXIgc2V0QWxsTG9nTGV2ZWwgPSBmdW5jdGlvbiBzZXRBbGxMb2dMZXZlbChsZXZlbCkge1xuICAvLyBUaGlzIGlzIG5lZWRlZCBiZWNhdXNlIHRoZSBITVIgbG9nZ2VyIG9wZXJhdGUgc2VwYXJhdGVseSBmcm9tIGRldiBzZXJ2ZXIgbG9nZ2VyXG4gIHdlYnBhY2tIb3RMb2cuc2V0TG9nTGV2ZWwobGV2ZWwgPT09IFwidmVyYm9zZVwiIHx8IGxldmVsID09PSBcImxvZ1wiID8gXCJpbmZvXCIgOiBsZXZlbCk7XG4gIHNldExvZ0xldmVsKGxldmVsKTtcbn07XG5pZiAob3B0aW9ucy5sb2dnaW5nKSB7XG4gIHNldEFsbExvZ0xldmVsKG9wdGlvbnMubG9nZ2luZyk7XG59XG52YXIgbG9nRW5hYmxlZEZlYXR1cmVzID0gZnVuY3Rpb24gbG9nRW5hYmxlZEZlYXR1cmVzKGZlYXR1cmVzKSB7XG4gIHZhciBsaXN0RW5hYmxlZEZlYXR1cmVzID0gT2JqZWN0LmtleXMoZmVhdHVyZXMpO1xuICBpZiAoIWZlYXR1cmVzIHx8IGxpc3RFbmFibGVkRmVhdHVyZXMubGVuZ3RoID09PSAwKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIHZhciBsb2dTdHJpbmcgPSBcIlNlcnZlciBzdGFydGVkOlwiO1xuXG4gIC8vIFNlcnZlciBzdGFydGVkOiBIb3QgTW9kdWxlIFJlcGxhY2VtZW50IGVuYWJsZWQsIExpdmUgUmVsb2FkaW5nIGVuYWJsZWQsIE92ZXJsYXkgZGlzYWJsZWQuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGlzdEVuYWJsZWRGZWF0dXJlcy5sZW5ndGg7IGkrKykge1xuICAgIHZhciBrZXkgPSBsaXN0RW5hYmxlZEZlYXR1cmVzW2ldO1xuICAgIGxvZ1N0cmluZyArPSBcIiBcIi5jb25jYXQoa2V5LCBcIiBcIikuY29uY2F0KGZlYXR1cmVzW2tleV0gPyBcImVuYWJsZWRcIiA6IFwiZGlzYWJsZWRcIiwgXCIsXCIpO1xuICB9XG4gIC8vIHJlcGxhY2UgbGFzdCBjb21tYSB3aXRoIGEgcGVyaW9kXG4gIGxvZ1N0cmluZyA9IGxvZ1N0cmluZy5zbGljZSgwLCAtMSkuY29uY2F0KFwiLlwiKTtcbiAgbG9nLmluZm8obG9nU3RyaW5nKTtcbn07XG5sb2dFbmFibGVkRmVhdHVyZXMoZW5hYmxlZEZlYXR1cmVzKTtcbnNlbGYuYWRkRXZlbnRMaXN0ZW5lcihcImJlZm9yZXVubG9hZFwiLCBmdW5jdGlvbiAoKSB7XG4gIHN0YXR1cy5pc1VubG9hZGluZyA9IHRydWU7XG59KTtcbnZhciBvdmVybGF5ID0gdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IGNyZWF0ZU92ZXJsYXkoX3R5cGVvZihvcHRpb25zLm92ZXJsYXkpID09PSBcIm9iamVjdFwiID8ge1xuICB0cnVzdGVkVHlwZXNQb2xpY3lOYW1lOiBvcHRpb25zLm92ZXJsYXkudHJ1c3RlZFR5cGVzUG9saWN5TmFtZSxcbiAgY2F0Y2hSdW50aW1lRXJyb3I6IG9wdGlvbnMub3ZlcmxheS5ydW50aW1lRXJyb3JzXG59IDoge1xuICB0cnVzdGVkVHlwZXNQb2xpY3lOYW1lOiBmYWxzZSxcbiAgY2F0Y2hSdW50aW1lRXJyb3I6IG9wdGlvbnMub3ZlcmxheVxufSkgOiB7XG4gIHNlbmQ6IGZ1bmN0aW9uIHNlbmQoKSB7fVxufTtcblxuLyoqXG4gKiBAcGFyYW0ge09wdGlvbnN9IG9wdGlvbnNcbiAqIEBwYXJhbSB7U3RhdHVzfSBjdXJyZW50U3RhdHVzXG4gKi9cbnZhciByZWxvYWRBcHAgPSBmdW5jdGlvbiByZWxvYWRBcHAoX3JlZiwgY3VycmVudFN0YXR1cykge1xuICB2YXIgaG90ID0gX3JlZi5ob3QsXG4gICAgbGl2ZVJlbG9hZCA9IF9yZWYubGl2ZVJlbG9hZDtcbiAgaWYgKGN1cnJlbnRTdGF0dXMuaXNVbmxvYWRpbmcpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgdmFyIGN1cnJlbnRIYXNoID0gY3VycmVudFN0YXR1cy5jdXJyZW50SGFzaCxcbiAgICBwcmV2aW91c0hhc2ggPSBjdXJyZW50U3RhdHVzLnByZXZpb3VzSGFzaDtcbiAgdmFyIGlzSW5pdGlhbCA9IGN1cnJlbnRIYXNoLmluZGV4T2YoLyoqIEB0eXBlIHtzdHJpbmd9ICovcHJldmlvdXNIYXNoKSA+PSAwO1xuICBpZiAoaXNJbml0aWFsKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7V2luZG93fSByb290V2luZG93XG4gICAqIEBwYXJhbSB7bnVtYmVyfSBpbnRlcnZhbElkXG4gICAqL1xuICBmdW5jdGlvbiBhcHBseVJlbG9hZChyb290V2luZG93LCBpbnRlcnZhbElkKSB7XG4gICAgY2xlYXJJbnRlcnZhbChpbnRlcnZhbElkKTtcbiAgICBsb2cuaW5mbyhcIkFwcCB1cGRhdGVkLiBSZWxvYWRpbmcuLi5cIik7XG4gICAgcm9vdFdpbmRvdy5sb2NhdGlvbi5yZWxvYWQoKTtcbiAgfVxuICB2YXIgc2VhcmNoID0gc2VsZi5sb2NhdGlvbi5zZWFyY2gudG9Mb3dlckNhc2UoKTtcbiAgdmFyIGFsbG93VG9Ib3QgPSBzZWFyY2guaW5kZXhPZihcIndlYnBhY2stZGV2LXNlcnZlci1ob3Q9ZmFsc2VcIikgPT09IC0xO1xuICB2YXIgYWxsb3dUb0xpdmVSZWxvYWQgPSBzZWFyY2guaW5kZXhPZihcIndlYnBhY2stZGV2LXNlcnZlci1saXZlLXJlbG9hZD1mYWxzZVwiKSA9PT0gLTE7XG4gIGlmIChob3QgJiYgYWxsb3dUb0hvdCkge1xuICAgIGxvZy5pbmZvKFwiQXBwIGhvdCB1cGRhdGUuLi5cIik7XG4gICAgaG90RW1pdHRlci5lbWl0KFwid2VicGFja0hvdFVwZGF0ZVwiLCBjdXJyZW50U3RhdHVzLmN1cnJlbnRIYXNoKTtcbiAgICBpZiAodHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgJiYgc2VsZi53aW5kb3cpIHtcbiAgICAgIC8vIGJyb2FkY2FzdCB1cGRhdGUgdG8gd2luZG93XG4gICAgICBzZWxmLnBvc3RNZXNzYWdlKFwid2VicGFja0hvdFVwZGF0ZVwiLmNvbmNhdChjdXJyZW50U3RhdHVzLmN1cnJlbnRIYXNoKSwgXCIqXCIpO1xuICAgIH1cbiAgfVxuICAvLyBhbGxvdyByZWZyZXNoaW5nIHRoZSBwYWdlIG9ubHkgaWYgbGl2ZVJlbG9hZCBpc24ndCBkaXNhYmxlZFxuICBlbHNlIGlmIChsaXZlUmVsb2FkICYmIGFsbG93VG9MaXZlUmVsb2FkKSB7XG4gICAgdmFyIHJvb3RXaW5kb3cgPSBzZWxmO1xuXG4gICAgLy8gdXNlIHBhcmVudCB3aW5kb3cgZm9yIHJlbG9hZCAoaW4gY2FzZSB3ZSdyZSBpbiBhbiBpZnJhbWUgd2l0aCBubyB2YWxpZCBzcmMpXG4gICAgdmFyIGludGVydmFsSWQgPSBzZWxmLnNldEludGVydmFsKGZ1bmN0aW9uICgpIHtcbiAgICAgIGlmIChyb290V2luZG93LmxvY2F0aW9uLnByb3RvY29sICE9PSBcImFib3V0OlwiKSB7XG4gICAgICAgIC8vIHJlbG9hZCBpbW1lZGlhdGVseSBpZiBwcm90b2NvbCBpcyB2YWxpZFxuICAgICAgICBhcHBseVJlbG9hZChyb290V2luZG93LCBpbnRlcnZhbElkKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJvb3RXaW5kb3cgPSByb290V2luZG93LnBhcmVudDtcbiAgICAgICAgaWYgKHJvb3RXaW5kb3cucGFyZW50ID09PSByb290V2luZG93KSB7XG4gICAgICAgICAgLy8gaWYgcGFyZW50IGVxdWFscyBjdXJyZW50IHdpbmRvdyB3ZSd2ZSByZWFjaGVkIHRoZSByb290IHdoaWNoIHdvdWxkIGNvbnRpbnVlIGZvcmV2ZXIsIHNvIHRyaWdnZXIgYSByZWxvYWQgYW55d2F5c1xuICAgICAgICAgIGFwcGx5UmVsb2FkKHJvb3RXaW5kb3csIGludGVydmFsSWQpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbn07XG52YXIgYW5zaVJlZ2V4ID0gbmV3IFJlZ0V4cChbXCJbXFxcXHUwMDFCXFxcXHUwMDlCXVtbXFxcXF0oKSM7P10qKD86KD86KD86KD86O1stYS16QS1aXFxcXGRcXFxcLyMmLjo9PyVAfl9dKykqfFthLXpBLVpcXFxcZF0rKD86O1stYS16QS1aXFxcXGRcXFxcLyMmLjo9PyVAfl9dKikqKT9cXFxcdTAwMDcpXCIsIFwiKD86KD86XFxcXGR7MSw0fSg/OjtcXFxcZHswLDR9KSopP1tcXFxcZEEtUFItVFpjZi1ucS11eT0+PH5dKSlcIl0uam9pbihcInxcIiksIFwiZ1wiKTtcblxuLyoqXG4gKlxuICogU3RyaXAgW0FOU0kgZXNjYXBlIGNvZGVzXShodHRwczovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9BTlNJX2VzY2FwZV9jb2RlKSBmcm9tIGEgc3RyaW5nLlxuICogQWRhcHRlZCBmcm9tIGNvZGUgb3JpZ2luYWxseSByZWxlYXNlZCBieSBTaW5kcmUgU29yaHVzXG4gKiBMaWNlbnNlZCB0aGUgTUlUIExpY2Vuc2VcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gc3RyaW5nXG4gKiBAcmV0dXJuIHtzdHJpbmd9XG4gKi9cbnZhciBzdHJpcEFuc2kgPSBmdW5jdGlvbiBzdHJpcEFuc2koc3RyaW5nKSB7XG4gIGlmICh0eXBlb2Ygc3RyaW5nICE9PSBcInN0cmluZ1wiKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkV4cGVjdGVkIGEgYHN0cmluZ2AsIGdvdCBgXCIuY29uY2F0KF90eXBlb2Yoc3RyaW5nKSwgXCJgXCIpKTtcbiAgfVxuICByZXR1cm4gc3RyaW5nLnJlcGxhY2UoYW5zaVJlZ2V4LCBcIlwiKTtcbn07XG52YXIgb25Tb2NrZXRNZXNzYWdlID0ge1xuICBob3Q6IGZ1bmN0aW9uIGhvdCgpIHtcbiAgICBpZiAocGFyc2VkUmVzb3VyY2VRdWVyeS5ob3QgPT09IFwiZmFsc2VcIikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBvcHRpb25zLmhvdCA9IHRydWU7XG4gIH0sXG4gIGxpdmVSZWxvYWQ6IGZ1bmN0aW9uIGxpdmVSZWxvYWQoKSB7XG4gICAgaWYgKHBhcnNlZFJlc291cmNlUXVlcnlbXCJsaXZlLXJlbG9hZFwiXSA9PT0gXCJmYWxzZVwiKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIG9wdGlvbnMubGl2ZVJlbG9hZCA9IHRydWU7XG4gIH0sXG4gIGludmFsaWQ6IGZ1bmN0aW9uIGludmFsaWQoKSB7XG4gICAgbG9nLmluZm8oXCJBcHAgdXBkYXRlZC4gUmVjb21waWxpbmcuLi5cIik7XG5cbiAgICAvLyBGaXhlcyAjMTA0Mi4gb3ZlcmxheSBkb2Vzbid0IGNsZWFyIGlmIGVycm9ycyBhcmUgZml4ZWQgYnV0IHdhcm5pbmdzIHJlbWFpbi5cbiAgICBpZiAob3B0aW9ucy5vdmVybGF5KSB7XG4gICAgICBvdmVybGF5LnNlbmQoe1xuICAgICAgICB0eXBlOiBcIkRJU01JU1NcIlxuICAgICAgfSk7XG4gICAgfVxuICAgIHNlbmRNZXNzYWdlKFwiSW52YWxpZFwiKTtcbiAgfSxcbiAgLyoqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBoYXNoXG4gICAqL1xuICBoYXNoOiBmdW5jdGlvbiBoYXNoKF9oYXNoKSB7XG4gICAgc3RhdHVzLnByZXZpb3VzSGFzaCA9IHN0YXR1cy5jdXJyZW50SGFzaDtcbiAgICBzdGF0dXMuY3VycmVudEhhc2ggPSBfaGFzaDtcbiAgfSxcbiAgbG9nZ2luZzogc2V0QWxsTG9nTGV2ZWwsXG4gIC8qKlxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IHZhbHVlXG4gICAqL1xuICBvdmVybGF5OiBmdW5jdGlvbiBvdmVybGF5KHZhbHVlKSB7XG4gICAgaWYgKHR5cGVvZiBkb2N1bWVudCA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBvcHRpb25zLm92ZXJsYXkgPSB2YWx1ZTtcbiAgICBkZWNvZGVPdmVybGF5T3B0aW9ucyhvcHRpb25zLm92ZXJsYXkpO1xuICB9LFxuICAvKipcbiAgICogQHBhcmFtIHtudW1iZXJ9IHZhbHVlXG4gICAqL1xuICByZWNvbm5lY3Q6IGZ1bmN0aW9uIHJlY29ubmVjdCh2YWx1ZSkge1xuICAgIGlmIChwYXJzZWRSZXNvdXJjZVF1ZXJ5LnJlY29ubmVjdCA9PT0gXCJmYWxzZVwiKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIG9wdGlvbnMucmVjb25uZWN0ID0gdmFsdWU7XG4gIH0sXG4gIC8qKlxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IHZhbHVlXG4gICAqL1xuICBwcm9ncmVzczogZnVuY3Rpb24gcHJvZ3Jlc3ModmFsdWUpIHtcbiAgICBvcHRpb25zLnByb2dyZXNzID0gdmFsdWU7XG4gIH0sXG4gIC8qKlxuICAgKiBAcGFyYW0ge3sgcGx1Z2luTmFtZT86IHN0cmluZywgcGVyY2VudDogbnVtYmVyLCBtc2c6IHN0cmluZyB9fSBkYXRhXG4gICAqL1xuICBcInByb2dyZXNzLXVwZGF0ZVwiOiBmdW5jdGlvbiBwcm9ncmVzc1VwZGF0ZShkYXRhKSB7XG4gICAgaWYgKG9wdGlvbnMucHJvZ3Jlc3MpIHtcbiAgICAgIGxvZy5pbmZvKFwiXCIuY29uY2F0KGRhdGEucGx1Z2luTmFtZSA/IFwiW1wiLmNvbmNhdChkYXRhLnBsdWdpbk5hbWUsIFwiXSBcIikgOiBcIlwiKS5jb25jYXQoZGF0YS5wZXJjZW50LCBcIiUgLSBcIikuY29uY2F0KGRhdGEubXNnLCBcIi5cIikpO1xuICAgIH1cbiAgICBpZiAoaXNQcm9ncmVzc1N1cHBvcnRlZCgpKSB7XG4gICAgICBpZiAodHlwZW9mIG9wdGlvbnMucHJvZ3Jlc3MgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgdmFyIHByb2dyZXNzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIndkcy1wcm9ncmVzc1wiKTtcbiAgICAgICAgaWYgKCFwcm9ncmVzcykge1xuICAgICAgICAgIGRlZmluZVByb2dyZXNzRWxlbWVudCgpO1xuICAgICAgICAgIHByb2dyZXNzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIndkcy1wcm9ncmVzc1wiKTtcbiAgICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHByb2dyZXNzKTtcbiAgICAgICAgfVxuICAgICAgICBwcm9ncmVzcy5zZXRBdHRyaWJ1dGUoXCJwcm9ncmVzc1wiLCBkYXRhLnBlcmNlbnQpO1xuICAgICAgICBwcm9ncmVzcy5zZXRBdHRyaWJ1dGUoXCJ0eXBlXCIsIG9wdGlvbnMucHJvZ3Jlc3MpO1xuICAgICAgfVxuICAgIH1cbiAgICBzZW5kTWVzc2FnZShcIlByb2dyZXNzXCIsIGRhdGEpO1xuICB9LFxuICBcInN0aWxsLW9rXCI6IGZ1bmN0aW9uIHN0aWxsT2soKSB7XG4gICAgbG9nLmluZm8oXCJOb3RoaW5nIGNoYW5nZWQuXCIpO1xuICAgIGlmIChvcHRpb25zLm92ZXJsYXkpIHtcbiAgICAgIG92ZXJsYXkuc2VuZCh7XG4gICAgICAgIHR5cGU6IFwiRElTTUlTU1wiXG4gICAgICB9KTtcbiAgICB9XG4gICAgc2VuZE1lc3NhZ2UoXCJTdGlsbE9rXCIpO1xuICB9LFxuICBvazogZnVuY3Rpb24gb2soKSB7XG4gICAgc2VuZE1lc3NhZ2UoXCJPa1wiKTtcbiAgICBpZiAob3B0aW9ucy5vdmVybGF5KSB7XG4gICAgICBvdmVybGF5LnNlbmQoe1xuICAgICAgICB0eXBlOiBcIkRJU01JU1NcIlxuICAgICAgfSk7XG4gICAgfVxuICAgIHJlbG9hZEFwcChvcHRpb25zLCBzdGF0dXMpO1xuICB9LFxuICAvKipcbiAgICogQHBhcmFtIHtzdHJpbmd9IGZpbGVcbiAgICovXG4gIFwic3RhdGljLWNoYW5nZWRcIjogZnVuY3Rpb24gc3RhdGljQ2hhbmdlZChmaWxlKSB7XG4gICAgbG9nLmluZm8oXCJcIi5jb25jYXQoZmlsZSA/IFwiXFxcIlwiLmNvbmNhdChmaWxlLCBcIlxcXCJcIikgOiBcIkNvbnRlbnRcIiwgXCIgZnJvbSBzdGF0aWMgZGlyZWN0b3J5IHdhcyBjaGFuZ2VkLiBSZWxvYWRpbmcuLi5cIikpO1xuICAgIHNlbGYubG9jYXRpb24ucmVsb2FkKCk7XG4gIH0sXG4gIC8qKlxuICAgKiBAcGFyYW0ge0Vycm9yW119IHdhcm5pbmdzXG4gICAqIEBwYXJhbSB7YW55fSBwYXJhbXNcbiAgICovXG4gIHdhcm5pbmdzOiBmdW5jdGlvbiB3YXJuaW5ncyhfd2FybmluZ3MsIHBhcmFtcykge1xuICAgIGxvZy53YXJuKFwiV2FybmluZ3Mgd2hpbGUgY29tcGlsaW5nLlwiKTtcbiAgICB2YXIgcHJpbnRhYmxlV2FybmluZ3MgPSBfd2FybmluZ3MubWFwKGZ1bmN0aW9uIChlcnJvcikge1xuICAgICAgdmFyIF9mb3JtYXRQcm9ibGVtID0gZm9ybWF0UHJvYmxlbShcIndhcm5pbmdcIiwgZXJyb3IpLFxuICAgICAgICBoZWFkZXIgPSBfZm9ybWF0UHJvYmxlbS5oZWFkZXIsXG4gICAgICAgIGJvZHkgPSBfZm9ybWF0UHJvYmxlbS5ib2R5O1xuICAgICAgcmV0dXJuIFwiXCIuY29uY2F0KGhlYWRlciwgXCJcXG5cIikuY29uY2F0KHN0cmlwQW5zaShib2R5KSk7XG4gICAgfSk7XG4gICAgc2VuZE1lc3NhZ2UoXCJXYXJuaW5nc1wiLCBwcmludGFibGVXYXJuaW5ncyk7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwcmludGFibGVXYXJuaW5ncy5sZW5ndGg7IGkrKykge1xuICAgICAgbG9nLndhcm4ocHJpbnRhYmxlV2FybmluZ3NbaV0pO1xuICAgIH1cbiAgICB2YXIgb3ZlcmxheVdhcm5pbmdzU2V0dGluZyA9IHR5cGVvZiBvcHRpb25zLm92ZXJsYXkgPT09IFwiYm9vbGVhblwiID8gb3B0aW9ucy5vdmVybGF5IDogb3B0aW9ucy5vdmVybGF5ICYmIG9wdGlvbnMub3ZlcmxheS53YXJuaW5ncztcbiAgICBpZiAob3ZlcmxheVdhcm5pbmdzU2V0dGluZykge1xuICAgICAgdmFyIHdhcm5pbmdzVG9EaXNwbGF5ID0gdHlwZW9mIG92ZXJsYXlXYXJuaW5nc1NldHRpbmcgPT09IFwiZnVuY3Rpb25cIiA/IF93YXJuaW5ncy5maWx0ZXIob3ZlcmxheVdhcm5pbmdzU2V0dGluZykgOiBfd2FybmluZ3M7XG4gICAgICBpZiAod2FybmluZ3NUb0Rpc3BsYXkubGVuZ3RoKSB7XG4gICAgICAgIG92ZXJsYXkuc2VuZCh7XG4gICAgICAgICAgdHlwZTogXCJCVUlMRF9FUlJPUlwiLFxuICAgICAgICAgIGxldmVsOiBcIndhcm5pbmdcIixcbiAgICAgICAgICBtZXNzYWdlczogX3dhcm5pbmdzXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAocGFyYW1zICYmIHBhcmFtcy5wcmV2ZW50UmVsb2FkaW5nKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHJlbG9hZEFwcChvcHRpb25zLCBzdGF0dXMpO1xuICB9LFxuICAvKipcbiAgICogQHBhcmFtIHtFcnJvcltdfSBlcnJvcnNcbiAgICovXG4gIGVycm9yczogZnVuY3Rpb24gZXJyb3JzKF9lcnJvcnMpIHtcbiAgICBsb2cuZXJyb3IoXCJFcnJvcnMgd2hpbGUgY29tcGlsaW5nLiBSZWxvYWQgcHJldmVudGVkLlwiKTtcbiAgICB2YXIgcHJpbnRhYmxlRXJyb3JzID0gX2Vycm9ycy5tYXAoZnVuY3Rpb24gKGVycm9yKSB7XG4gICAgICB2YXIgX2Zvcm1hdFByb2JsZW0yID0gZm9ybWF0UHJvYmxlbShcImVycm9yXCIsIGVycm9yKSxcbiAgICAgICAgaGVhZGVyID0gX2Zvcm1hdFByb2JsZW0yLmhlYWRlcixcbiAgICAgICAgYm9keSA9IF9mb3JtYXRQcm9ibGVtMi5ib2R5O1xuICAgICAgcmV0dXJuIFwiXCIuY29uY2F0KGhlYWRlciwgXCJcXG5cIikuY29uY2F0KHN0cmlwQW5zaShib2R5KSk7XG4gICAgfSk7XG4gICAgc2VuZE1lc3NhZ2UoXCJFcnJvcnNcIiwgcHJpbnRhYmxlRXJyb3JzKTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHByaW50YWJsZUVycm9ycy5sZW5ndGg7IGkrKykge1xuICAgICAgbG9nLmVycm9yKHByaW50YWJsZUVycm9yc1tpXSk7XG4gICAgfVxuICAgIHZhciBvdmVybGF5RXJyb3JzU2V0dGluZ3MgPSB0eXBlb2Ygb3B0aW9ucy5vdmVybGF5ID09PSBcImJvb2xlYW5cIiA/IG9wdGlvbnMub3ZlcmxheSA6IG9wdGlvbnMub3ZlcmxheSAmJiBvcHRpb25zLm92ZXJsYXkuZXJyb3JzO1xuICAgIGlmIChvdmVybGF5RXJyb3JzU2V0dGluZ3MpIHtcbiAgICAgIHZhciBlcnJvcnNUb0Rpc3BsYXkgPSB0eXBlb2Ygb3ZlcmxheUVycm9yc1NldHRpbmdzID09PSBcImZ1bmN0aW9uXCIgPyBfZXJyb3JzLmZpbHRlcihvdmVybGF5RXJyb3JzU2V0dGluZ3MpIDogX2Vycm9ycztcbiAgICAgIGlmIChlcnJvcnNUb0Rpc3BsYXkubGVuZ3RoKSB7XG4gICAgICAgIG92ZXJsYXkuc2VuZCh7XG4gICAgICAgICAgdHlwZTogXCJCVUlMRF9FUlJPUlwiLFxuICAgICAgICAgIGxldmVsOiBcImVycm9yXCIsXG4gICAgICAgICAgbWVzc2FnZXM6IF9lcnJvcnNcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuICB9LFxuICAvKipcbiAgICogQHBhcmFtIHtFcnJvcn0gZXJyb3JcbiAgICovXG4gIGVycm9yOiBmdW5jdGlvbiBlcnJvcihfZXJyb3IpIHtcbiAgICBsb2cuZXJyb3IoX2Vycm9yKTtcbiAgfSxcbiAgY2xvc2U6IGZ1bmN0aW9uIGNsb3NlKCkge1xuICAgIGxvZy5pbmZvKFwiRGlzY29ubmVjdGVkIVwiKTtcbiAgICBpZiAob3B0aW9ucy5vdmVybGF5KSB7XG4gICAgICBvdmVybGF5LnNlbmQoe1xuICAgICAgICB0eXBlOiBcIkRJU01JU1NcIlxuICAgICAgfSk7XG4gICAgfVxuICAgIHNlbmRNZXNzYWdlKFwiQ2xvc2VcIik7XG4gIH1cbn07XG5cbi8qKlxuICogQHBhcmFtIHt7IHByb3RvY29sPzogc3RyaW5nLCBhdXRoPzogc3RyaW5nLCBob3N0bmFtZT86IHN0cmluZywgcG9ydD86IHN0cmluZywgcGF0aG5hbWU/OiBzdHJpbmcsIHNlYXJjaD86IHN0cmluZywgaGFzaD86IHN0cmluZywgc2xhc2hlcz86IGJvb2xlYW4gfX0gb2JqVVJMXG4gKiBAcmV0dXJucyB7c3RyaW5nfVxuICovXG52YXIgZm9ybWF0VVJMID0gZnVuY3Rpb24gZm9ybWF0VVJMKG9ialVSTCkge1xuICB2YXIgcHJvdG9jb2wgPSBvYmpVUkwucHJvdG9jb2wgfHwgXCJcIjtcbiAgaWYgKHByb3RvY29sICYmIHByb3RvY29sLnN1YnN0cigtMSkgIT09IFwiOlwiKSB7XG4gICAgcHJvdG9jb2wgKz0gXCI6XCI7XG4gIH1cbiAgdmFyIGF1dGggPSBvYmpVUkwuYXV0aCB8fCBcIlwiO1xuICBpZiAoYXV0aCkge1xuICAgIGF1dGggPSBlbmNvZGVVUklDb21wb25lbnQoYXV0aCk7XG4gICAgYXV0aCA9IGF1dGgucmVwbGFjZSgvJTNBL2ksIFwiOlwiKTtcbiAgICBhdXRoICs9IFwiQFwiO1xuICB9XG4gIHZhciBob3N0ID0gXCJcIjtcbiAgaWYgKG9ialVSTC5ob3N0bmFtZSkge1xuICAgIGhvc3QgPSBhdXRoICsgKG9ialVSTC5ob3N0bmFtZS5pbmRleE9mKFwiOlwiKSA9PT0gLTEgPyBvYmpVUkwuaG9zdG5hbWUgOiBcIltcIi5jb25jYXQob2JqVVJMLmhvc3RuYW1lLCBcIl1cIikpO1xuICAgIGlmIChvYmpVUkwucG9ydCkge1xuICAgICAgaG9zdCArPSBcIjpcIi5jb25jYXQob2JqVVJMLnBvcnQpO1xuICAgIH1cbiAgfVxuICB2YXIgcGF0aG5hbWUgPSBvYmpVUkwucGF0aG5hbWUgfHwgXCJcIjtcbiAgaWYgKG9ialVSTC5zbGFzaGVzKSB7XG4gICAgaG9zdCA9IFwiLy9cIi5jb25jYXQoaG9zdCB8fCBcIlwiKTtcbiAgICBpZiAocGF0aG5hbWUgJiYgcGF0aG5hbWUuY2hhckF0KDApICE9PSBcIi9cIikge1xuICAgICAgcGF0aG5hbWUgPSBcIi9cIi5jb25jYXQocGF0aG5hbWUpO1xuICAgIH1cbiAgfSBlbHNlIGlmICghaG9zdCkge1xuICAgIGhvc3QgPSBcIlwiO1xuICB9XG4gIHZhciBzZWFyY2ggPSBvYmpVUkwuc2VhcmNoIHx8IFwiXCI7XG4gIGlmIChzZWFyY2ggJiYgc2VhcmNoLmNoYXJBdCgwKSAhPT0gXCI/XCIpIHtcbiAgICBzZWFyY2ggPSBcIj9cIi5jb25jYXQoc2VhcmNoKTtcbiAgfVxuICB2YXIgaGFzaCA9IG9ialVSTC5oYXNoIHx8IFwiXCI7XG4gIGlmIChoYXNoICYmIGhhc2guY2hhckF0KDApICE9PSBcIiNcIikge1xuICAgIGhhc2ggPSBcIiNcIi5jb25jYXQoaGFzaCk7XG4gIH1cbiAgcGF0aG5hbWUgPSBwYXRobmFtZS5yZXBsYWNlKC9bPyNdL2csXG4gIC8qKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gbWF0Y2hcbiAgICogQHJldHVybnMge3N0cmluZ31cbiAgICovXG4gIGZ1bmN0aW9uIChtYXRjaCkge1xuICAgIHJldHVybiBlbmNvZGVVUklDb21wb25lbnQobWF0Y2gpO1xuICB9KTtcbiAgc2VhcmNoID0gc2VhcmNoLnJlcGxhY2UoXCIjXCIsIFwiJTIzXCIpO1xuICByZXR1cm4gXCJcIi5jb25jYXQocHJvdG9jb2wpLmNvbmNhdChob3N0KS5jb25jYXQocGF0aG5hbWUpLmNvbmNhdChzZWFyY2gpLmNvbmNhdChoYXNoKTtcbn07XG5cbi8qKlxuICogQHBhcmFtIHtVUkwgJiB7IGZyb21DdXJyZW50U2NyaXB0PzogYm9vbGVhbiB9fSBwYXJzZWRVUkxcbiAqIEByZXR1cm5zIHtzdHJpbmd9XG4gKi9cbnZhciBjcmVhdGVTb2NrZXRVUkwgPSBmdW5jdGlvbiBjcmVhdGVTb2NrZXRVUkwocGFyc2VkVVJMKSB7XG4gIHZhciBob3N0bmFtZSA9IHBhcnNlZFVSTC5ob3N0bmFtZTtcblxuICAvLyBOb2RlLmpzIG1vZHVsZSBwYXJzZXMgaXQgYXMgYDo6YFxuICAvLyBgbmV3IFVSTCh1cmxTdHJpbmcsIFtiYXNlVVJMU3RyaW5nXSlgIHBhcnNlcyBpdCBhcyAnWzo6XSdcbiAgdmFyIGlzSW5BZGRyQW55ID0gaG9zdG5hbWUgPT09IFwiMC4wLjAuMFwiIHx8IGhvc3RuYW1lID09PSBcIjo6XCIgfHwgaG9zdG5hbWUgPT09IFwiWzo6XVwiO1xuXG4gIC8vIHdoeSBkbyB3ZSBuZWVkIHRoaXMgY2hlY2s/XG4gIC8vIGhvc3RuYW1lIG4vYSBmb3IgZmlsZSBwcm90b2NvbCAoZXhhbXBsZSwgd2hlbiB1c2luZyBlbGVjdHJvbiwgaW9uaWMpXG4gIC8vIHNlZTogaHR0cHM6Ly9naXRodWIuY29tL3dlYnBhY2svd2VicGFjay1kZXYtc2VydmVyL3B1bGwvMzg0XG4gIGlmIChpc0luQWRkckFueSAmJiBzZWxmLmxvY2F0aW9uLmhvc3RuYW1lICYmIHNlbGYubG9jYXRpb24ucHJvdG9jb2wuaW5kZXhPZihcImh0dHBcIikgPT09IDApIHtcbiAgICBob3N0bmFtZSA9IHNlbGYubG9jYXRpb24uaG9zdG5hbWU7XG4gIH1cbiAgdmFyIHNvY2tldFVSTFByb3RvY29sID0gcGFyc2VkVVJMLnByb3RvY29sIHx8IHNlbGYubG9jYXRpb24ucHJvdG9jb2w7XG5cbiAgLy8gV2hlbiBodHRwcyBpcyB1c2VkIGluIHRoZSBhcHAsIHNlY3VyZSB3ZWIgc29ja2V0cyBhcmUgYWx3YXlzIG5lY2Vzc2FyeSBiZWNhdXNlIHRoZSBicm93c2VyIGRvZXNuJ3QgYWNjZXB0IG5vbi1zZWN1cmUgd2ViIHNvY2tldHMuXG4gIGlmIChzb2NrZXRVUkxQcm90b2NvbCA9PT0gXCJhdXRvOlwiIHx8IGhvc3RuYW1lICYmIGlzSW5BZGRyQW55ICYmIHNlbGYubG9jYXRpb24ucHJvdG9jb2wgPT09IFwiaHR0cHM6XCIpIHtcbiAgICBzb2NrZXRVUkxQcm90b2NvbCA9IHNlbGYubG9jYXRpb24ucHJvdG9jb2w7XG4gIH1cbiAgc29ja2V0VVJMUHJvdG9jb2wgPSBzb2NrZXRVUkxQcm90b2NvbC5yZXBsYWNlKC9eKD86aHR0cHwuKy1leHRlbnNpb258ZmlsZSkvaSwgXCJ3c1wiKTtcbiAgdmFyIHNvY2tldFVSTEF1dGggPSBcIlwiO1xuXG4gIC8vIGBuZXcgVVJMKHVybFN0cmluZywgW2Jhc2VVUkxzdHJpbmddKWAgZG9lc24ndCBoYXZlIGBhdXRoYCBwcm9wZXJ0eVxuICAvLyBQYXJzZSBhdXRoZW50aWNhdGlvbiBjcmVkZW50aWFscyBpbiBjYXNlIHdlIG5lZWQgdGhlbVxuICBpZiAocGFyc2VkVVJMLnVzZXJuYW1lKSB7XG4gICAgc29ja2V0VVJMQXV0aCA9IHBhcnNlZFVSTC51c2VybmFtZTtcblxuICAgIC8vIFNpbmNlIEhUVFAgYmFzaWMgYXV0aGVudGljYXRpb24gZG9lcyBub3QgYWxsb3cgZW1wdHkgdXNlcm5hbWUsXG4gICAgLy8gd2Ugb25seSBpbmNsdWRlIHBhc3N3b3JkIGlmIHRoZSB1c2VybmFtZSBpcyBub3QgZW1wdHkuXG4gICAgaWYgKHBhcnNlZFVSTC5wYXNzd29yZCkge1xuICAgICAgLy8gUmVzdWx0OiA8dXNlcm5hbWU+OjxwYXNzd29yZD5cbiAgICAgIHNvY2tldFVSTEF1dGggPSBzb2NrZXRVUkxBdXRoLmNvbmNhdChcIjpcIiwgcGFyc2VkVVJMLnBhc3N3b3JkKTtcbiAgICB9XG4gIH1cblxuICAvLyBJbiBjYXNlIHRoZSBob3N0IGlzIGEgcmF3IElQdjYgYWRkcmVzcywgaXQgY2FuIGJlIGVuY2xvc2VkIGluXG4gIC8vIHRoZSBicmFja2V0cyBhcyB0aGUgYnJhY2tldHMgYXJlIG5lZWRlZCBpbiB0aGUgZmluYWwgVVJMIHN0cmluZy5cbiAgLy8gTmVlZCB0byByZW1vdmUgdGhvc2UgYXMgdXJsLmZvcm1hdCBibGluZGx5IGFkZHMgaXRzIG93biBzZXQgb2YgYnJhY2tldHNcbiAgLy8gaWYgdGhlIGhvc3Qgc3RyaW5nIGNvbnRhaW5zIGNvbG9ucy4gVGhhdCB3b3VsZCBsZWFkIHRvIG5vbi13b3JraW5nXG4gIC8vIGRvdWJsZSBicmFja2V0cyAoZS5nLiBbWzo6XV0pIGhvc3RcbiAgLy9cbiAgLy8gQWxsIG9mIHRoZXNlIHdlYiBzb2NrZXQgdXJsIHBhcmFtcyBhcmUgb3B0aW9uYWxseSBwYXNzZWQgaW4gdGhyb3VnaCByZXNvdXJjZVF1ZXJ5LFxuICAvLyBzbyB3ZSBuZWVkIHRvIGZhbGwgYmFjayB0byB0aGUgZGVmYXVsdCBpZiB0aGV5IGFyZSBub3QgcHJvdmlkZWRcbiAgdmFyIHNvY2tldFVSTEhvc3RuYW1lID0gKGhvc3RuYW1lIHx8IHNlbGYubG9jYXRpb24uaG9zdG5hbWUgfHwgXCJsb2NhbGhvc3RcIikucmVwbGFjZSgvXlxcWyguKilcXF0kLywgXCIkMVwiKTtcbiAgdmFyIHNvY2tldFVSTFBvcnQgPSBwYXJzZWRVUkwucG9ydDtcbiAgaWYgKCFzb2NrZXRVUkxQb3J0IHx8IHNvY2tldFVSTFBvcnQgPT09IFwiMFwiKSB7XG4gICAgc29ja2V0VVJMUG9ydCA9IHNlbGYubG9jYXRpb24ucG9ydDtcbiAgfVxuXG4gIC8vIElmIHBhdGggaXMgcHJvdmlkZWQgaXQnbGwgYmUgcGFzc2VkIGluIHZpYSB0aGUgcmVzb3VyY2VRdWVyeSBhcyBhXG4gIC8vIHF1ZXJ5IHBhcmFtIHNvIGl0IGhhcyB0byBiZSBwYXJzZWQgb3V0IG9mIHRoZSBxdWVyeXN0cmluZyBpbiBvcmRlciBmb3IgdGhlXG4gIC8vIGNsaWVudCB0byBvcGVuIHRoZSBzb2NrZXQgdG8gdGhlIGNvcnJlY3QgbG9jYXRpb24uXG4gIHZhciBzb2NrZXRVUkxQYXRobmFtZSA9IFwiL3dzXCI7XG4gIGlmIChwYXJzZWRVUkwucGF0aG5hbWUgJiYgIXBhcnNlZFVSTC5mcm9tQ3VycmVudFNjcmlwdCkge1xuICAgIHNvY2tldFVSTFBhdGhuYW1lID0gcGFyc2VkVVJMLnBhdGhuYW1lO1xuICB9XG4gIHJldHVybiBmb3JtYXRVUkwoe1xuICAgIHByb3RvY29sOiBzb2NrZXRVUkxQcm90b2NvbCxcbiAgICBhdXRoOiBzb2NrZXRVUkxBdXRoLFxuICAgIGhvc3RuYW1lOiBzb2NrZXRVUkxIb3N0bmFtZSxcbiAgICBwb3J0OiBzb2NrZXRVUkxQb3J0LFxuICAgIHBhdGhuYW1lOiBzb2NrZXRVUkxQYXRobmFtZSxcbiAgICBzbGFzaGVzOiB0cnVlXG4gIH0pO1xufTtcbnZhciBzb2NrZXRVUkwgPSBjcmVhdGVTb2NrZXRVUkwocGFyc2VkUmVzb3VyY2VRdWVyeSk7XG5zb2NrZXQoc29ja2V0VVJMLCBvblNvY2tldE1lc3NhZ2UsIG9wdGlvbnMucmVjb25uZWN0KTtcbmV4cG9ydCB7IGdldEN1cnJlbnRTY3JpcHRTb3VyY2UsIHBhcnNlVVJMLCBjcmVhdGVTb2NrZXRVUkwgfTsiLCIvKioqKioqLyAoZnVuY3Rpb24oKSB7IC8vIHdlYnBhY2tCb290c3RyYXBcbi8qKioqKiovIFx0XCJ1c2Ugc3RyaWN0XCI7XG4vKioqKioqLyBcdHZhciBfX3dlYnBhY2tfbW9kdWxlc19fID0gKHtcblxuLyoqKi8gXCIuL2NsaWVudC1zcmMvbW9kdWxlcy9sb2dnZXIvdGFwYWJsZS5qc1wiOlxuLyohKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiEqXFxcbiAgISoqKiAuL2NsaWVudC1zcmMvbW9kdWxlcy9sb2dnZXIvdGFwYWJsZS5qcyAqKiohXG4gIFxcKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbi8qKiovIChmdW5jdGlvbihfX3VudXNlZF93ZWJwYWNrX21vZHVsZSwgX193ZWJwYWNrX2V4cG9ydHNfXywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIoX193ZWJwYWNrX2V4cG9ydHNfXyk7XG4vKiBoYXJtb255IGV4cG9ydCAqLyBfX3dlYnBhY2tfcmVxdWlyZV9fLmQoX193ZWJwYWNrX2V4cG9ydHNfXywge1xuLyogaGFybW9ueSBleHBvcnQgKi8gICBTeW5jQmFpbEhvb2s6IGZ1bmN0aW9uKCkgeyByZXR1cm4gLyogYmluZGluZyAqLyBTeW5jQmFpbEhvb2s7IH1cbi8qIGhhcm1vbnkgZXhwb3J0ICovIH0pO1xuZnVuY3Rpb24gU3luY0JhaWxIb29rKCkge1xuICByZXR1cm4ge1xuICAgIGNhbGw6IGZ1bmN0aW9uIGNhbGwoKSB7fVxuICB9O1xufVxuXG4vKipcbiAqIENsaWVudCBzdHViIGZvciB0YXBhYmxlIFN5bmNCYWlsSG9va1xuICovXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgaW1wb3J0L3ByZWZlci1kZWZhdWx0LWV4cG9ydFxuXG5cbi8qKiovIH0pLFxuXG4vKioqLyBcIi4vbm9kZV9tb2R1bGVzL3dlYnBhY2svbGliL2xvZ2dpbmcvTG9nZ2VyLmpzXCI6XG4vKiEqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqISpcXFxuICAhKioqIC4vbm9kZV9tb2R1bGVzL3dlYnBhY2svbGliL2xvZ2dpbmcvTG9nZ2VyLmpzICoqKiFcbiAgXFwqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSkge1xuXG4vKlxuXHRNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuXHRBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXG4qL1xuXG5cblxuZnVuY3Rpb24gX3R5cGVvZihvKSB7XG4gIFwiQGJhYmVsL2hlbHBlcnMgLSB0eXBlb2ZcIjtcblxuICByZXR1cm4gX3R5cGVvZiA9IFwiZnVuY3Rpb25cIiA9PSB0eXBlb2YgKHR5cGVvZiBTeW1ib2wgIT09IFwidW5kZWZpbmVkXCIgPyBTeW1ib2wgOiBmdW5jdGlvbiAoaSkgeyByZXR1cm4gaTsgfSkgJiYgXCJzeW1ib2xcIiA9PSB0eXBlb2YgKHR5cGVvZiBTeW1ib2wgIT09IFwidW5kZWZpbmVkXCIgPyBTeW1ib2wgOiBmdW5jdGlvbiAoaSkgeyByZXR1cm4gaTsgfSkuaXRlcmF0b3IgPyBmdW5jdGlvbiAobykge1xuICAgIHJldHVybiB0eXBlb2YgbztcbiAgfSA6IGZ1bmN0aW9uIChvKSB7XG4gICAgcmV0dXJuIG8gJiYgXCJmdW5jdGlvblwiID09IHR5cGVvZiAodHlwZW9mIFN5bWJvbCAhPT0gXCJ1bmRlZmluZWRcIiA/IFN5bWJvbCA6IGZ1bmN0aW9uIChpKSB7IHJldHVybiBpOyB9KSAmJiBvLmNvbnN0cnVjdG9yID09PSAodHlwZW9mIFN5bWJvbCAhPT0gXCJ1bmRlZmluZWRcIiA/IFN5bWJvbCA6IGZ1bmN0aW9uIChpKSB7IHJldHVybiBpOyB9KSAmJiBvICE9PSAodHlwZW9mIFN5bWJvbCAhPT0gXCJ1bmRlZmluZWRcIiA/IFN5bWJvbCA6IGZ1bmN0aW9uIChpKSB7IHJldHVybiBpOyB9KS5wcm90b3R5cGUgPyBcInN5bWJvbFwiIDogdHlwZW9mIG87XG4gIH0sIF90eXBlb2Yobyk7XG59XG5mdW5jdGlvbiBfdG9Db25zdW1hYmxlQXJyYXkocikge1xuICByZXR1cm4gX2FycmF5V2l0aG91dEhvbGVzKHIpIHx8IF9pdGVyYWJsZVRvQXJyYXkocikgfHwgX3Vuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5KHIpIHx8IF9ub25JdGVyYWJsZVNwcmVhZCgpO1xufVxuZnVuY3Rpb24gX25vbkl0ZXJhYmxlU3ByZWFkKCkge1xuICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiSW52YWxpZCBhdHRlbXB0IHRvIHNwcmVhZCBub24taXRlcmFibGUgaW5zdGFuY2UuXFxuSW4gb3JkZXIgdG8gYmUgaXRlcmFibGUsIG5vbi1hcnJheSBvYmplY3RzIG11c3QgaGF2ZSBhIFtTeW1ib2wuaXRlcmF0b3JdKCkgbWV0aG9kLlwiKTtcbn1cbmZ1bmN0aW9uIF91bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheShyLCBhKSB7XG4gIGlmIChyKSB7XG4gICAgaWYgKFwic3RyaW5nXCIgPT0gdHlwZW9mIHIpIHJldHVybiBfYXJyYXlMaWtlVG9BcnJheShyLCBhKTtcbiAgICB2YXIgdCA9IHt9LnRvU3RyaW5nLmNhbGwocikuc2xpY2UoOCwgLTEpO1xuICAgIHJldHVybiBcIk9iamVjdFwiID09PSB0ICYmIHIuY29uc3RydWN0b3IgJiYgKHQgPSByLmNvbnN0cnVjdG9yLm5hbWUpLCBcIk1hcFwiID09PSB0IHx8IFwiU2V0XCIgPT09IHQgPyBBcnJheS5mcm9tKHIpIDogXCJBcmd1bWVudHNcIiA9PT0gdCB8fCAvXig/OlVpfEkpbnQoPzo4fDE2fDMyKSg/OkNsYW1wZWQpP0FycmF5JC8udGVzdCh0KSA/IF9hcnJheUxpa2VUb0FycmF5KHIsIGEpIDogdm9pZCAwO1xuICB9XG59XG5mdW5jdGlvbiBfaXRlcmFibGVUb0FycmF5KHIpIHtcbiAgaWYgKFwidW5kZWZpbmVkXCIgIT0gdHlwZW9mICh0eXBlb2YgU3ltYm9sICE9PSBcInVuZGVmaW5lZFwiID8gU3ltYm9sIDogZnVuY3Rpb24gKGkpIHsgcmV0dXJuIGk7IH0pICYmIG51bGwgIT0gclsodHlwZW9mIFN5bWJvbCAhPT0gXCJ1bmRlZmluZWRcIiA/IFN5bWJvbCA6IGZ1bmN0aW9uIChpKSB7IHJldHVybiBpOyB9KS5pdGVyYXRvcl0gfHwgbnVsbCAhPSByW1wiQEBpdGVyYXRvclwiXSkgcmV0dXJuIEFycmF5LmZyb20ocik7XG59XG5mdW5jdGlvbiBfYXJyYXlXaXRob3V0SG9sZXMocikge1xuICBpZiAoQXJyYXkuaXNBcnJheShyKSkgcmV0dXJuIF9hcnJheUxpa2VUb0FycmF5KHIpO1xufVxuZnVuY3Rpb24gX2FycmF5TGlrZVRvQXJyYXkociwgYSkge1xuICAobnVsbCA9PSBhIHx8IGEgPiByLmxlbmd0aCkgJiYgKGEgPSByLmxlbmd0aCk7XG4gIGZvciAodmFyIGUgPSAwLCBuID0gQXJyYXkoYSk7IGUgPCBhOyBlKyspIG5bZV0gPSByW2VdO1xuICByZXR1cm4gbjtcbn1cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhhLCBuKSB7XG4gIGlmICghKGEgaW5zdGFuY2VvZiBuKSkgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTtcbn1cbmZ1bmN0aW9uIF9kZWZpbmVQcm9wZXJ0aWVzKGUsIHIpIHtcbiAgZm9yICh2YXIgdCA9IDA7IHQgPCByLmxlbmd0aDsgdCsrKSB7XG4gICAgdmFyIG8gPSByW3RdO1xuICAgIG8uZW51bWVyYWJsZSA9IG8uZW51bWVyYWJsZSB8fCAhMSwgby5jb25maWd1cmFibGUgPSAhMCwgXCJ2YWx1ZVwiIGluIG8gJiYgKG8ud3JpdGFibGUgPSAhMCksIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShlLCBfdG9Qcm9wZXJ0eUtleShvLmtleSksIG8pO1xuICB9XG59XG5mdW5jdGlvbiBfY3JlYXRlQ2xhc3MoZSwgciwgdCkge1xuICByZXR1cm4gciAmJiBfZGVmaW5lUHJvcGVydGllcyhlLnByb3RvdHlwZSwgciksIHQgJiYgX2RlZmluZVByb3BlcnRpZXMoZSwgdCksIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShlLCBcInByb3RvdHlwZVwiLCB7XG4gICAgd3JpdGFibGU6ICExXG4gIH0pLCBlO1xufVxuZnVuY3Rpb24gX3RvUHJvcGVydHlLZXkodCkge1xuICB2YXIgaSA9IF90b1ByaW1pdGl2ZSh0LCBcInN0cmluZ1wiKTtcbiAgcmV0dXJuIFwic3ltYm9sXCIgPT0gX3R5cGVvZihpKSA/IGkgOiBpICsgXCJcIjtcbn1cbmZ1bmN0aW9uIF90b1ByaW1pdGl2ZSh0LCByKSB7XG4gIGlmIChcIm9iamVjdFwiICE9IF90eXBlb2YodCkgfHwgIXQpIHJldHVybiB0O1xuICB2YXIgZSA9IHRbKHR5cGVvZiBTeW1ib2wgIT09IFwidW5kZWZpbmVkXCIgPyBTeW1ib2wgOiBmdW5jdGlvbiAoaSkgeyByZXR1cm4gaTsgfSkudG9QcmltaXRpdmVdO1xuICBpZiAodm9pZCAwICE9PSBlKSB7XG4gICAgdmFyIGkgPSBlLmNhbGwodCwgciB8fCBcImRlZmF1bHRcIik7XG4gICAgaWYgKFwib2JqZWN0XCIgIT0gX3R5cGVvZihpKSkgcmV0dXJuIGk7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkBAdG9QcmltaXRpdmUgbXVzdCByZXR1cm4gYSBwcmltaXRpdmUgdmFsdWUuXCIpO1xuICB9XG4gIHJldHVybiAoXCJzdHJpbmdcIiA9PT0gciA/IFN0cmluZyA6IE51bWJlcikodCk7XG59XG52YXIgTG9nVHlwZSA9IE9iamVjdC5mcmVlemUoe1xuICBlcnJvcjogKC8qKiBAdHlwZSB7XCJlcnJvclwifSAqL1wiZXJyb3JcIiksXG4gIC8vIG1lc3NhZ2UsIGMgc3R5bGUgYXJndW1lbnRzXG4gIHdhcm46ICgvKiogQHR5cGUge1wid2FyblwifSAqL1wid2FyblwiKSxcbiAgLy8gbWVzc2FnZSwgYyBzdHlsZSBhcmd1bWVudHNcbiAgaW5mbzogKC8qKiBAdHlwZSB7XCJpbmZvXCJ9ICovXCJpbmZvXCIpLFxuICAvLyBtZXNzYWdlLCBjIHN0eWxlIGFyZ3VtZW50c1xuICBsb2c6ICgvKiogQHR5cGUge1wibG9nXCJ9ICovXCJsb2dcIiksXG4gIC8vIG1lc3NhZ2UsIGMgc3R5bGUgYXJndW1lbnRzXG4gIGRlYnVnOiAoLyoqIEB0eXBlIHtcImRlYnVnXCJ9ICovXCJkZWJ1Z1wiKSxcbiAgLy8gbWVzc2FnZSwgYyBzdHlsZSBhcmd1bWVudHNcblxuICB0cmFjZTogKC8qKiBAdHlwZSB7XCJ0cmFjZVwifSAqL1widHJhY2VcIiksXG4gIC8vIG5vIGFyZ3VtZW50c1xuXG4gIGdyb3VwOiAoLyoqIEB0eXBlIHtcImdyb3VwXCJ9ICovXCJncm91cFwiKSxcbiAgLy8gW2xhYmVsXVxuICBncm91cENvbGxhcHNlZDogKC8qKiBAdHlwZSB7XCJncm91cENvbGxhcHNlZFwifSAqL1wiZ3JvdXBDb2xsYXBzZWRcIiksXG4gIC8vIFtsYWJlbF1cbiAgZ3JvdXBFbmQ6ICgvKiogQHR5cGUge1wiZ3JvdXBFbmRcIn0gKi9cImdyb3VwRW5kXCIpLFxuICAvLyBbbGFiZWxdXG5cbiAgcHJvZmlsZTogKC8qKiBAdHlwZSB7XCJwcm9maWxlXCJ9ICovXCJwcm9maWxlXCIpLFxuICAvLyBbcHJvZmlsZU5hbWVdXG4gIHByb2ZpbGVFbmQ6ICgvKiogQHR5cGUge1wicHJvZmlsZUVuZFwifSAqL1wicHJvZmlsZUVuZFwiKSxcbiAgLy8gW3Byb2ZpbGVOYW1lXVxuXG4gIHRpbWU6ICgvKiogQHR5cGUge1widGltZVwifSAqL1widGltZVwiKSxcbiAgLy8gbmFtZSwgdGltZSBhcyBbc2Vjb25kcywgbmFub3NlY29uZHNdXG5cbiAgY2xlYXI6ICgvKiogQHR5cGUge1wiY2xlYXJcIn0gKi9cImNsZWFyXCIpLFxuICAvLyBubyBhcmd1bWVudHNcbiAgc3RhdHVzOiAoLyoqIEB0eXBlIHtcInN0YXR1c1wifSAqL1wic3RhdHVzXCIpIC8vIG1lc3NhZ2UsIGFyZ3VtZW50c1xufSk7XG5tb2R1bGUuZXhwb3J0cy5Mb2dUeXBlID0gTG9nVHlwZTtcblxuLyoqIEB0eXBlZGVmIHt0eXBlb2YgTG9nVHlwZVtrZXlvZiB0eXBlb2YgTG9nVHlwZV19IExvZ1R5cGVFbnVtICovXG5cbnZhciBMT0dfU1lNQk9MID0gKHR5cGVvZiBTeW1ib2wgIT09IFwidW5kZWZpbmVkXCIgPyBTeW1ib2wgOiBmdW5jdGlvbiAoaSkgeyByZXR1cm4gaTsgfSkoXCJ3ZWJwYWNrIGxvZ2dlciByYXcgbG9nIG1ldGhvZFwiKTtcbnZhciBUSU1FUlNfU1lNQk9MID0gKHR5cGVvZiBTeW1ib2wgIT09IFwidW5kZWZpbmVkXCIgPyBTeW1ib2wgOiBmdW5jdGlvbiAoaSkgeyByZXR1cm4gaTsgfSkoXCJ3ZWJwYWNrIGxvZ2dlciB0aW1lc1wiKTtcbnZhciBUSU1FUlNfQUdHUkVHQVRFU19TWU1CT0wgPSAodHlwZW9mIFN5bWJvbCAhPT0gXCJ1bmRlZmluZWRcIiA/IFN5bWJvbCA6IGZ1bmN0aW9uIChpKSB7IHJldHVybiBpOyB9KShcIndlYnBhY2sgbG9nZ2VyIGFnZ3JlZ2F0ZWQgdGltZXNcIik7XG52YXIgV2VicGFja0xvZ2dlciA9IC8qI19fUFVSRV9fKi9mdW5jdGlvbiAoKSB7XG4gIC8qKlxuICAgKiBAcGFyYW0geyh0eXBlOiBMb2dUeXBlRW51bSwgYXJncz86IEVYUEVDVEVEX0FOWVtdKSA9PiB2b2lkfSBsb2cgbG9nIGZ1bmN0aW9uXG4gICAqIEBwYXJhbSB7KG5hbWU6IHN0cmluZyB8ICgoKSA9PiBzdHJpbmcpKSA9PiBXZWJwYWNrTG9nZ2VyfSBnZXRDaGlsZExvZ2dlciBmdW5jdGlvbiB0byBjcmVhdGUgY2hpbGQgbG9nZ2VyXG4gICAqL1xuICBmdW5jdGlvbiBXZWJwYWNrTG9nZ2VyKGxvZywgZ2V0Q2hpbGRMb2dnZXIpIHtcbiAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgV2VicGFja0xvZ2dlcik7XG4gICAgdGhpc1tMT0dfU1lNQk9MXSA9IGxvZztcbiAgICB0aGlzLmdldENoaWxkTG9nZ2VyID0gZ2V0Q2hpbGRMb2dnZXI7XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHsuLi5FWFBFQ1RFRF9BTll9IGFyZ3MgYXJnc1xuICAgKi9cbiAgcmV0dXJuIF9jcmVhdGVDbGFzcyhXZWJwYWNrTG9nZ2VyLCBbe1xuICAgIGtleTogXCJlcnJvclwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBlcnJvcigpIHtcbiAgICAgIGZvciAodmFyIF9sZW4gPSBhcmd1bWVudHMubGVuZ3RoLCBhcmdzID0gbmV3IEFycmF5KF9sZW4pLCBfa2V5ID0gMDsgX2tleSA8IF9sZW47IF9rZXkrKykge1xuICAgICAgICBhcmdzW19rZXldID0gYXJndW1lbnRzW19rZXldO1xuICAgICAgfVxuICAgICAgdGhpc1tMT0dfU1lNQk9MXShMb2dUeXBlLmVycm9yLCBhcmdzKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gey4uLkVYUEVDVEVEX0FOWX0gYXJncyBhcmdzXG4gICAgICovXG4gIH0sIHtcbiAgICBrZXk6IFwid2FyblwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiB3YXJuKCkge1xuICAgICAgZm9yICh2YXIgX2xlbjIgPSBhcmd1bWVudHMubGVuZ3RoLCBhcmdzID0gbmV3IEFycmF5KF9sZW4yKSwgX2tleTIgPSAwOyBfa2V5MiA8IF9sZW4yOyBfa2V5MisrKSB7XG4gICAgICAgIGFyZ3NbX2tleTJdID0gYXJndW1lbnRzW19rZXkyXTtcbiAgICAgIH1cbiAgICAgIHRoaXNbTE9HX1NZTUJPTF0oTG9nVHlwZS53YXJuLCBhcmdzKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gey4uLkVYUEVDVEVEX0FOWX0gYXJncyBhcmdzXG4gICAgICovXG4gIH0sIHtcbiAgICBrZXk6IFwiaW5mb1wiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBpbmZvKCkge1xuICAgICAgZm9yICh2YXIgX2xlbjMgPSBhcmd1bWVudHMubGVuZ3RoLCBhcmdzID0gbmV3IEFycmF5KF9sZW4zKSwgX2tleTMgPSAwOyBfa2V5MyA8IF9sZW4zOyBfa2V5MysrKSB7XG4gICAgICAgIGFyZ3NbX2tleTNdID0gYXJndW1lbnRzW19rZXkzXTtcbiAgICAgIH1cbiAgICAgIHRoaXNbTE9HX1NZTUJPTF0oTG9nVHlwZS5pbmZvLCBhcmdzKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gey4uLkVYUEVDVEVEX0FOWX0gYXJncyBhcmdzXG4gICAgICovXG4gIH0sIHtcbiAgICBrZXk6IFwibG9nXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGxvZygpIHtcbiAgICAgIGZvciAodmFyIF9sZW40ID0gYXJndW1lbnRzLmxlbmd0aCwgYXJncyA9IG5ldyBBcnJheShfbGVuNCksIF9rZXk0ID0gMDsgX2tleTQgPCBfbGVuNDsgX2tleTQrKykge1xuICAgICAgICBhcmdzW19rZXk0XSA9IGFyZ3VtZW50c1tfa2V5NF07XG4gICAgICB9XG4gICAgICB0aGlzW0xPR19TWU1CT0xdKExvZ1R5cGUubG9nLCBhcmdzKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gey4uLkVYUEVDVEVEX0FOWX0gYXJncyBhcmdzXG4gICAgICovXG4gIH0sIHtcbiAgICBrZXk6IFwiZGVidWdcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gZGVidWcoKSB7XG4gICAgICBmb3IgKHZhciBfbGVuNSA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBuZXcgQXJyYXkoX2xlbjUpLCBfa2V5NSA9IDA7IF9rZXk1IDwgX2xlbjU7IF9rZXk1KyspIHtcbiAgICAgICAgYXJnc1tfa2V5NV0gPSBhcmd1bWVudHNbX2tleTVdO1xuICAgICAgfVxuICAgICAgdGhpc1tMT0dfU1lNQk9MXShMb2dUeXBlLmRlYnVnLCBhcmdzKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge0VYUEVDVEVEX0FOWX0gYXNzZXJ0aW9uIGFzc2VydGlvblxuICAgICAqIEBwYXJhbSB7Li4uRVhQRUNURURfQU5ZfSBhcmdzIGFyZ3NcbiAgICAgKi9cbiAgfSwge1xuICAgIGtleTogXCJhc3NlcnRcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gYXNzZXJ0KGFzc2VydGlvbikge1xuICAgICAgaWYgKCFhc3NlcnRpb24pIHtcbiAgICAgICAgZm9yICh2YXIgX2xlbjYgPSBhcmd1bWVudHMubGVuZ3RoLCBhcmdzID0gbmV3IEFycmF5KF9sZW42ID4gMSA/IF9sZW42IC0gMSA6IDApLCBfa2V5NiA9IDE7IF9rZXk2IDwgX2xlbjY7IF9rZXk2KyspIHtcbiAgICAgICAgICBhcmdzW19rZXk2IC0gMV0gPSBhcmd1bWVudHNbX2tleTZdO1xuICAgICAgICB9XG4gICAgICAgIHRoaXNbTE9HX1NZTUJPTF0oTG9nVHlwZS5lcnJvciwgYXJncyk7XG4gICAgICB9XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcInRyYWNlXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHRyYWNlKCkge1xuICAgICAgdGhpc1tMT0dfU1lNQk9MXShMb2dUeXBlLnRyYWNlLCBbXCJUcmFjZVwiXSk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcImNsZWFyXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGNsZWFyKCkge1xuICAgICAgdGhpc1tMT0dfU1lNQk9MXShMb2dUeXBlLmNsZWFyKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gey4uLkVYUEVDVEVEX0FOWX0gYXJncyBhcmdzXG4gICAgICovXG4gIH0sIHtcbiAgICBrZXk6IFwic3RhdHVzXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHN0YXR1cygpIHtcbiAgICAgIGZvciAodmFyIF9sZW43ID0gYXJndW1lbnRzLmxlbmd0aCwgYXJncyA9IG5ldyBBcnJheShfbGVuNyksIF9rZXk3ID0gMDsgX2tleTcgPCBfbGVuNzsgX2tleTcrKykge1xuICAgICAgICBhcmdzW19rZXk3XSA9IGFyZ3VtZW50c1tfa2V5N107XG4gICAgICB9XG4gICAgICB0aGlzW0xPR19TWU1CT0xdKExvZ1R5cGUuc3RhdHVzLCBhcmdzKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gey4uLkVYUEVDVEVEX0FOWX0gYXJncyBhcmdzXG4gICAgICovXG4gIH0sIHtcbiAgICBrZXk6IFwiZ3JvdXBcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gZ3JvdXAoKSB7XG4gICAgICBmb3IgKHZhciBfbGVuOCA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBuZXcgQXJyYXkoX2xlbjgpLCBfa2V5OCA9IDA7IF9rZXk4IDwgX2xlbjg7IF9rZXk4KyspIHtcbiAgICAgICAgYXJnc1tfa2V5OF0gPSBhcmd1bWVudHNbX2tleThdO1xuICAgICAgfVxuICAgICAgdGhpc1tMT0dfU1lNQk9MXShMb2dUeXBlLmdyb3VwLCBhcmdzKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gey4uLkVYUEVDVEVEX0FOWX0gYXJncyBhcmdzXG4gICAgICovXG4gIH0sIHtcbiAgICBrZXk6IFwiZ3JvdXBDb2xsYXBzZWRcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gZ3JvdXBDb2xsYXBzZWQoKSB7XG4gICAgICBmb3IgKHZhciBfbGVuOSA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBuZXcgQXJyYXkoX2xlbjkpLCBfa2V5OSA9IDA7IF9rZXk5IDwgX2xlbjk7IF9rZXk5KyspIHtcbiAgICAgICAgYXJnc1tfa2V5OV0gPSBhcmd1bWVudHNbX2tleTldO1xuICAgICAgfVxuICAgICAgdGhpc1tMT0dfU1lNQk9MXShMb2dUeXBlLmdyb3VwQ29sbGFwc2VkLCBhcmdzKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiZ3JvdXBFbmRcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gZ3JvdXBFbmQoKSB7XG4gICAgICB0aGlzW0xPR19TWU1CT0xdKExvZ1R5cGUuZ3JvdXBFbmQpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nPX0gbGFiZWwgbGFiZWxcbiAgICAgKi9cbiAgfSwge1xuICAgIGtleTogXCJwcm9maWxlXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHByb2ZpbGUobGFiZWwpIHtcbiAgICAgIHRoaXNbTE9HX1NZTUJPTF0oTG9nVHlwZS5wcm9maWxlLCBbbGFiZWxdKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge3N0cmluZz19IGxhYmVsIGxhYmVsXG4gICAgICovXG4gIH0sIHtcbiAgICBrZXk6IFwicHJvZmlsZUVuZFwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBwcm9maWxlRW5kKGxhYmVsKSB7XG4gICAgICB0aGlzW0xPR19TWU1CT0xdKExvZ1R5cGUucHJvZmlsZUVuZCwgW2xhYmVsXSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGxhYmVsIGxhYmVsXG4gICAgICovXG4gIH0sIHtcbiAgICBrZXk6IFwidGltZVwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiB0aW1lKGxhYmVsKSB7XG4gICAgICAvKiogQHR5cGUge01hcDxzdHJpbmcgfCB1bmRlZmluZWQsIFtudW1iZXIsIG51bWJlcl0+fSAqL1xuICAgICAgdGhpc1tUSU1FUlNfU1lNQk9MXSA9IHRoaXNbVElNRVJTX1NZTUJPTF0gfHwgbmV3IE1hcCgpO1xuICAgICAgdGhpc1tUSU1FUlNfU1lNQk9MXS5zZXQobGFiZWwsIHByb2Nlc3MuaHJ0aW1lKCkpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nPX0gbGFiZWwgbGFiZWxcbiAgICAgKi9cbiAgfSwge1xuICAgIGtleTogXCJ0aW1lTG9nXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHRpbWVMb2cobGFiZWwpIHtcbiAgICAgIHZhciBwcmV2ID0gdGhpc1tUSU1FUlNfU1lNQk9MXSAmJiB0aGlzW1RJTUVSU19TWU1CT0xdLmdldChsYWJlbCk7XG4gICAgICBpZiAoIXByZXYpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiTm8gc3VjaCBsYWJlbCAnXCIuY29uY2F0KGxhYmVsLCBcIicgZm9yIFdlYnBhY2tMb2dnZXIudGltZUxvZygpXCIpKTtcbiAgICAgIH1cbiAgICAgIHZhciB0aW1lID0gcHJvY2Vzcy5ocnRpbWUocHJldik7XG4gICAgICB0aGlzW0xPR19TWU1CT0xdKExvZ1R5cGUudGltZSwgW2xhYmVsXS5jb25jYXQoX3RvQ29uc3VtYWJsZUFycmF5KHRpbWUpKSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtzdHJpbmc9fSBsYWJlbCBsYWJlbFxuICAgICAqL1xuICB9LCB7XG4gICAga2V5OiBcInRpbWVFbmRcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gdGltZUVuZChsYWJlbCkge1xuICAgICAgdmFyIHByZXYgPSB0aGlzW1RJTUVSU19TWU1CT0xdICYmIHRoaXNbVElNRVJTX1NZTUJPTF0uZ2V0KGxhYmVsKTtcbiAgICAgIGlmICghcHJldikge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJObyBzdWNoIGxhYmVsICdcIi5jb25jYXQobGFiZWwsIFwiJyBmb3IgV2VicGFja0xvZ2dlci50aW1lRW5kKClcIikpO1xuICAgICAgfVxuICAgICAgdmFyIHRpbWUgPSBwcm9jZXNzLmhydGltZShwcmV2KTtcbiAgICAgIC8qKiBAdHlwZSB7TWFwPHN0cmluZyB8IHVuZGVmaW5lZCwgW251bWJlciwgbnVtYmVyXT59ICovXG4gICAgICB0aGlzW1RJTUVSU19TWU1CT0xdLmRlbGV0ZShsYWJlbCk7XG4gICAgICB0aGlzW0xPR19TWU1CT0xdKExvZ1R5cGUudGltZSwgW2xhYmVsXS5jb25jYXQoX3RvQ29uc3VtYWJsZUFycmF5KHRpbWUpKSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtzdHJpbmc9fSBsYWJlbCBsYWJlbFxuICAgICAqL1xuICB9LCB7XG4gICAga2V5OiBcInRpbWVBZ2dyZWdhdGVcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gdGltZUFnZ3JlZ2F0ZShsYWJlbCkge1xuICAgICAgdmFyIHByZXYgPSB0aGlzW1RJTUVSU19TWU1CT0xdICYmIHRoaXNbVElNRVJTX1NZTUJPTF0uZ2V0KGxhYmVsKTtcbiAgICAgIGlmICghcHJldikge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJObyBzdWNoIGxhYmVsICdcIi5jb25jYXQobGFiZWwsIFwiJyBmb3IgV2VicGFja0xvZ2dlci50aW1lQWdncmVnYXRlKClcIikpO1xuICAgICAgfVxuICAgICAgdmFyIHRpbWUgPSBwcm9jZXNzLmhydGltZShwcmV2KTtcbiAgICAgIC8qKiBAdHlwZSB7TWFwPHN0cmluZyB8IHVuZGVmaW5lZCwgW251bWJlciwgbnVtYmVyXT59ICovXG4gICAgICB0aGlzW1RJTUVSU19TWU1CT0xdLmRlbGV0ZShsYWJlbCk7XG4gICAgICAvKiogQHR5cGUge01hcDxzdHJpbmcgfCB1bmRlZmluZWQsIFtudW1iZXIsIG51bWJlcl0+fSAqL1xuICAgICAgdGhpc1tUSU1FUlNfQUdHUkVHQVRFU19TWU1CT0xdID0gdGhpc1tUSU1FUlNfQUdHUkVHQVRFU19TWU1CT0xdIHx8IG5ldyBNYXAoKTtcbiAgICAgIHZhciBjdXJyZW50ID0gdGhpc1tUSU1FUlNfQUdHUkVHQVRFU19TWU1CT0xdLmdldChsYWJlbCk7XG4gICAgICBpZiAoY3VycmVudCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGlmICh0aW1lWzFdICsgY3VycmVudFsxXSA+IDFlOSkge1xuICAgICAgICAgIHRpbWVbMF0gKz0gY3VycmVudFswXSArIDE7XG4gICAgICAgICAgdGltZVsxXSA9IHRpbWVbMV0gLSAxZTkgKyBjdXJyZW50WzFdO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRpbWVbMF0gKz0gY3VycmVudFswXTtcbiAgICAgICAgICB0aW1lWzFdICs9IGN1cnJlbnRbMV07XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHRoaXNbVElNRVJTX0FHR1JFR0FURVNfU1lNQk9MXS5zZXQobGFiZWwsIHRpbWUpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nPX0gbGFiZWwgbGFiZWxcbiAgICAgKi9cbiAgfSwge1xuICAgIGtleTogXCJ0aW1lQWdncmVnYXRlRW5kXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHRpbWVBZ2dyZWdhdGVFbmQobGFiZWwpIHtcbiAgICAgIGlmICh0aGlzW1RJTUVSU19BR0dSRUdBVEVTX1NZTUJPTF0gPT09IHVuZGVmaW5lZCkgcmV0dXJuO1xuICAgICAgdmFyIHRpbWUgPSB0aGlzW1RJTUVSU19BR0dSRUdBVEVTX1NZTUJPTF0uZ2V0KGxhYmVsKTtcbiAgICAgIGlmICh0aW1lID09PSB1bmRlZmluZWQpIHJldHVybjtcbiAgICAgIHRoaXNbVElNRVJTX0FHR1JFR0FURVNfU1lNQk9MXS5kZWxldGUobGFiZWwpO1xuICAgICAgdGhpc1tMT0dfU1lNQk9MXShMb2dUeXBlLnRpbWUsIFtsYWJlbF0uY29uY2F0KF90b0NvbnN1bWFibGVBcnJheSh0aW1lKSkpO1xuICAgIH1cbiAgfV0pO1xufSgpO1xubW9kdWxlLmV4cG9ydHMuTG9nZ2VyID0gV2VicGFja0xvZ2dlcjtcblxuLyoqKi8gfSksXG5cbi8qKiovIFwiLi9ub2RlX21vZHVsZXMvd2VicGFjay9saWIvbG9nZ2luZy9jcmVhdGVDb25zb2xlTG9nZ2VyLmpzXCI6XG4vKiEqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiEqXFxcbiAgISoqKiAuL25vZGVfbW9kdWxlcy93ZWJwYWNrL2xpYi9sb2dnaW5nL2NyZWF0ZUNvbnNvbGVMb2dnZXIuanMgKioqIVxuICBcXCoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgX191bnVzZWRfd2VicGFja19leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cbi8qXG5cdE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG5cdEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiovXG5cblxuXG5mdW5jdGlvbiBfc2xpY2VkVG9BcnJheShyLCBlKSB7XG4gIHJldHVybiBfYXJyYXlXaXRoSG9sZXMocikgfHwgX2l0ZXJhYmxlVG9BcnJheUxpbWl0KHIsIGUpIHx8IF91bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheShyLCBlKSB8fCBfbm9uSXRlcmFibGVSZXN0KCk7XG59XG5mdW5jdGlvbiBfbm9uSXRlcmFibGVSZXN0KCkge1xuICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiSW52YWxpZCBhdHRlbXB0IHRvIGRlc3RydWN0dXJlIG5vbi1pdGVyYWJsZSBpbnN0YW5jZS5cXG5JbiBvcmRlciB0byBiZSBpdGVyYWJsZSwgbm9uLWFycmF5IG9iamVjdHMgbXVzdCBoYXZlIGEgW1N5bWJvbC5pdGVyYXRvcl0oKSBtZXRob2QuXCIpO1xufVxuZnVuY3Rpb24gX2l0ZXJhYmxlVG9BcnJheUxpbWl0KHIsIGwpIHtcbiAgdmFyIHQgPSBudWxsID09IHIgPyBudWxsIDogXCJ1bmRlZmluZWRcIiAhPSB0eXBlb2YgKHR5cGVvZiBTeW1ib2wgIT09IFwidW5kZWZpbmVkXCIgPyBTeW1ib2wgOiBmdW5jdGlvbiAoaSkgeyByZXR1cm4gaTsgfSkgJiYgclsodHlwZW9mIFN5bWJvbCAhPT0gXCJ1bmRlZmluZWRcIiA/IFN5bWJvbCA6IGZ1bmN0aW9uIChpKSB7IHJldHVybiBpOyB9KS5pdGVyYXRvcl0gfHwgcltcIkBAaXRlcmF0b3JcIl07XG4gIGlmIChudWxsICE9IHQpIHtcbiAgICB2YXIgZSxcbiAgICAgIG4sXG4gICAgICBpLFxuICAgICAgdSxcbiAgICAgIGEgPSBbXSxcbiAgICAgIGYgPSAhMCxcbiAgICAgIG8gPSAhMTtcbiAgICB0cnkge1xuICAgICAgaWYgKGkgPSAodCA9IHQuY2FsbChyKSkubmV4dCwgMCA9PT0gbCkge1xuICAgICAgICBpZiAoT2JqZWN0KHQpICE9PSB0KSByZXR1cm47XG4gICAgICAgIGYgPSAhMTtcbiAgICAgIH0gZWxzZSBmb3IgKDsgIShmID0gKGUgPSBpLmNhbGwodCkpLmRvbmUpICYmIChhLnB1c2goZS52YWx1ZSksIGEubGVuZ3RoICE9PSBsKTsgZiA9ICEwKTtcbiAgICB9IGNhdGNoIChyKSB7XG4gICAgICBvID0gITAsIG4gPSByO1xuICAgIH0gZmluYWxseSB7XG4gICAgICB0cnkge1xuICAgICAgICBpZiAoIWYgJiYgbnVsbCAhPSB0LnJldHVybiAmJiAodSA9IHQucmV0dXJuKCksIE9iamVjdCh1KSAhPT0gdSkpIHJldHVybjtcbiAgICAgIH0gZmluYWxseSB7XG4gICAgICAgIGlmIChvKSB0aHJvdyBuO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gYTtcbiAgfVxufVxuZnVuY3Rpb24gX2FycmF5V2l0aEhvbGVzKHIpIHtcbiAgaWYgKEFycmF5LmlzQXJyYXkocikpIHJldHVybiByO1xufVxuZnVuY3Rpb24gX3RvQ29uc3VtYWJsZUFycmF5KHIpIHtcbiAgcmV0dXJuIF9hcnJheVdpdGhvdXRIb2xlcyhyKSB8fCBfaXRlcmFibGVUb0FycmF5KHIpIHx8IF91bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheShyKSB8fCBfbm9uSXRlcmFibGVTcHJlYWQoKTtcbn1cbmZ1bmN0aW9uIF9ub25JdGVyYWJsZVNwcmVhZCgpIHtcbiAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkludmFsaWQgYXR0ZW1wdCB0byBzcHJlYWQgbm9uLWl0ZXJhYmxlIGluc3RhbmNlLlxcbkluIG9yZGVyIHRvIGJlIGl0ZXJhYmxlLCBub24tYXJyYXkgb2JqZWN0cyBtdXN0IGhhdmUgYSBbU3ltYm9sLml0ZXJhdG9yXSgpIG1ldGhvZC5cIik7XG59XG5mdW5jdGlvbiBfdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkociwgYSkge1xuICBpZiAocikge1xuICAgIGlmIChcInN0cmluZ1wiID09IHR5cGVvZiByKSByZXR1cm4gX2FycmF5TGlrZVRvQXJyYXkociwgYSk7XG4gICAgdmFyIHQgPSB7fS50b1N0cmluZy5jYWxsKHIpLnNsaWNlKDgsIC0xKTtcbiAgICByZXR1cm4gXCJPYmplY3RcIiA9PT0gdCAmJiByLmNvbnN0cnVjdG9yICYmICh0ID0gci5jb25zdHJ1Y3Rvci5uYW1lKSwgXCJNYXBcIiA9PT0gdCB8fCBcIlNldFwiID09PSB0ID8gQXJyYXkuZnJvbShyKSA6IFwiQXJndW1lbnRzXCIgPT09IHQgfHwgL14oPzpVaXxJKW50KD86OHwxNnwzMikoPzpDbGFtcGVkKT9BcnJheSQvLnRlc3QodCkgPyBfYXJyYXlMaWtlVG9BcnJheShyLCBhKSA6IHZvaWQgMDtcbiAgfVxufVxuZnVuY3Rpb24gX2l0ZXJhYmxlVG9BcnJheShyKSB7XG4gIGlmIChcInVuZGVmaW5lZFwiICE9IHR5cGVvZiAodHlwZW9mIFN5bWJvbCAhPT0gXCJ1bmRlZmluZWRcIiA/IFN5bWJvbCA6IGZ1bmN0aW9uIChpKSB7IHJldHVybiBpOyB9KSAmJiBudWxsICE9IHJbKHR5cGVvZiBTeW1ib2wgIT09IFwidW5kZWZpbmVkXCIgPyBTeW1ib2wgOiBmdW5jdGlvbiAoaSkgeyByZXR1cm4gaTsgfSkuaXRlcmF0b3JdIHx8IG51bGwgIT0gcltcIkBAaXRlcmF0b3JcIl0pIHJldHVybiBBcnJheS5mcm9tKHIpO1xufVxuZnVuY3Rpb24gX2FycmF5V2l0aG91dEhvbGVzKHIpIHtcbiAgaWYgKEFycmF5LmlzQXJyYXkocikpIHJldHVybiBfYXJyYXlMaWtlVG9BcnJheShyKTtcbn1cbmZ1bmN0aW9uIF9hcnJheUxpa2VUb0FycmF5KHIsIGEpIHtcbiAgKG51bGwgPT0gYSB8fCBhID4gci5sZW5ndGgpICYmIChhID0gci5sZW5ndGgpO1xuICBmb3IgKHZhciBlID0gMCwgbiA9IEFycmF5KGEpOyBlIDwgYTsgZSsrKSBuW2VdID0gcltlXTtcbiAgcmV0dXJuIG47XG59XG5mdW5jdGlvbiBfdHlwZW9mKG8pIHtcbiAgXCJAYmFiZWwvaGVscGVycyAtIHR5cGVvZlwiO1xuXG4gIHJldHVybiBfdHlwZW9mID0gXCJmdW5jdGlvblwiID09IHR5cGVvZiAodHlwZW9mIFN5bWJvbCAhPT0gXCJ1bmRlZmluZWRcIiA/IFN5bWJvbCA6IGZ1bmN0aW9uIChpKSB7IHJldHVybiBpOyB9KSAmJiBcInN5bWJvbFwiID09IHR5cGVvZiAodHlwZW9mIFN5bWJvbCAhPT0gXCJ1bmRlZmluZWRcIiA/IFN5bWJvbCA6IGZ1bmN0aW9uIChpKSB7IHJldHVybiBpOyB9KS5pdGVyYXRvciA/IGZ1bmN0aW9uIChvKSB7XG4gICAgcmV0dXJuIHR5cGVvZiBvO1xuICB9IDogZnVuY3Rpb24gKG8pIHtcbiAgICByZXR1cm4gbyAmJiBcImZ1bmN0aW9uXCIgPT0gdHlwZW9mICh0eXBlb2YgU3ltYm9sICE9PSBcInVuZGVmaW5lZFwiID8gU3ltYm9sIDogZnVuY3Rpb24gKGkpIHsgcmV0dXJuIGk7IH0pICYmIG8uY29uc3RydWN0b3IgPT09ICh0eXBlb2YgU3ltYm9sICE9PSBcInVuZGVmaW5lZFwiID8gU3ltYm9sIDogZnVuY3Rpb24gKGkpIHsgcmV0dXJuIGk7IH0pICYmIG8gIT09ICh0eXBlb2YgU3ltYm9sICE9PSBcInVuZGVmaW5lZFwiID8gU3ltYm9sIDogZnVuY3Rpb24gKGkpIHsgcmV0dXJuIGk7IH0pLnByb3RvdHlwZSA/IFwic3ltYm9sXCIgOiB0eXBlb2YgbztcbiAgfSwgX3R5cGVvZihvKTtcbn1cbnZhciBfcmVxdWlyZSA9IF9fd2VicGFja19yZXF1aXJlX18oLyohIC4vTG9nZ2VyICovIFwiLi9ub2RlX21vZHVsZXMvd2VicGFjay9saWIvbG9nZ2luZy9Mb2dnZXIuanNcIiksXG4gIExvZ1R5cGUgPSBfcmVxdWlyZS5Mb2dUeXBlO1xuXG4vKiogQHR5cGVkZWYge2ltcG9ydChcIi4uLy4uL2RlY2xhcmF0aW9ucy9XZWJwYWNrT3B0aW9uc1wiKS5GaWx0ZXJJdGVtVHlwZXN9IEZpbHRlckl0ZW1UeXBlcyAqL1xuLyoqIEB0eXBlZGVmIHtpbXBvcnQoXCIuLi8uLi9kZWNsYXJhdGlvbnMvV2VicGFja09wdGlvbnNcIikuRmlsdGVyVHlwZXN9IEZpbHRlclR5cGVzICovXG4vKiogQHR5cGVkZWYge2ltcG9ydChcIi4vTG9nZ2VyXCIpLkxvZ1R5cGVFbnVtfSBMb2dUeXBlRW51bSAqL1xuXG4vKiogQHR5cGVkZWYgeyhpdGVtOiBzdHJpbmcpID0+IGJvb2xlYW59IEZpbHRlckZ1bmN0aW9uICovXG4vKiogQHR5cGVkZWYgeyh2YWx1ZTogc3RyaW5nLCB0eXBlOiBMb2dUeXBlRW51bSwgYXJncz86IEVYUEVDVEVEX0FOWVtdKSA9PiB2b2lkfSBMb2dnaW5nRnVuY3Rpb24gKi9cblxuLyoqXG4gKiBAdHlwZWRlZiB7b2JqZWN0fSBMb2dnZXJDb25zb2xlXG4gKiBAcHJvcGVydHkgeygpID0+IHZvaWR9IGNsZWFyXG4gKiBAcHJvcGVydHkgeygpID0+IHZvaWR9IHRyYWNlXG4gKiBAcHJvcGVydHkgeyguLi5hcmdzOiBFWFBFQ1RFRF9BTllbXSkgPT4gdm9pZH0gaW5mb1xuICogQHByb3BlcnR5IHsoLi4uYXJnczogRVhQRUNURURfQU5ZW10pID0+IHZvaWR9IGxvZ1xuICogQHByb3BlcnR5IHsoLi4uYXJnczogRVhQRUNURURfQU5ZW10pID0+IHZvaWR9IHdhcm5cbiAqIEBwcm9wZXJ0eSB7KC4uLmFyZ3M6IEVYUEVDVEVEX0FOWVtdKSA9PiB2b2lkfSBlcnJvclxuICogQHByb3BlcnR5IHsoLi4uYXJnczogRVhQRUNURURfQU5ZW10pID0+IHZvaWQ9fSBkZWJ1Z1xuICogQHByb3BlcnR5IHsoLi4uYXJnczogRVhQRUNURURfQU5ZW10pID0+IHZvaWQ9fSBncm91cFxuICogQHByb3BlcnR5IHsoLi4uYXJnczogRVhQRUNURURfQU5ZW10pID0+IHZvaWQ9fSBncm91cENvbGxhcHNlZFxuICogQHByb3BlcnR5IHsoLi4uYXJnczogRVhQRUNURURfQU5ZW10pID0+IHZvaWQ9fSBncm91cEVuZFxuICogQHByb3BlcnR5IHsoLi4uYXJnczogRVhQRUNURURfQU5ZW10pID0+IHZvaWQ9fSBzdGF0dXNcbiAqIEBwcm9wZXJ0eSB7KC4uLmFyZ3M6IEVYUEVDVEVEX0FOWVtdKSA9PiB2b2lkPX0gcHJvZmlsZVxuICogQHByb3BlcnR5IHsoLi4uYXJnczogRVhQRUNURURfQU5ZW10pID0+IHZvaWQ9fSBwcm9maWxlRW5kXG4gKiBAcHJvcGVydHkgeyguLi5hcmdzOiBFWFBFQ1RFRF9BTllbXSkgPT4gdm9pZD19IGxvZ1RpbWVcbiAqL1xuXG4vKipcbiAqIEB0eXBlZGVmIHtvYmplY3R9IExvZ2dlck9wdGlvbnNcbiAqIEBwcm9wZXJ0eSB7ZmFsc2V8dHJ1ZXxcIm5vbmVcInxcImVycm9yXCJ8XCJ3YXJuXCJ8XCJpbmZvXCJ8XCJsb2dcInxcInZlcmJvc2VcIn0gbGV2ZWwgbG9nbGV2ZWxcbiAqIEBwcm9wZXJ0eSB7RmlsdGVyVHlwZXN8Ym9vbGVhbn0gZGVidWcgZmlsdGVyIGZvciBkZWJ1ZyBsb2dnaW5nXG4gKiBAcHJvcGVydHkge0xvZ2dlckNvbnNvbGV9IGNvbnNvbGUgdGhlIGNvbnNvbGUgdG8gbG9nIHRvXG4gKi9cblxuLyoqXG4gKiBAcGFyYW0ge0ZpbHRlckl0ZW1UeXBlc30gaXRlbSBhbiBpbnB1dCBpdGVtXG4gKiBAcmV0dXJucyB7RmlsdGVyRnVuY3Rpb24gfCB1bmRlZmluZWR9IGZpbHRlciBmdW5jdGlvblxuICovXG52YXIgZmlsdGVyVG9GdW5jdGlvbiA9IGZ1bmN0aW9uIGZpbHRlclRvRnVuY3Rpb24oaXRlbSkge1xuICBpZiAodHlwZW9mIGl0ZW0gPT09IFwic3RyaW5nXCIpIHtcbiAgICB2YXIgcmVnRXhwID0gbmV3IFJlZ0V4cChcIltcXFxcXFxcXC9dXCIuY29uY2F0KGl0ZW0ucmVwbGFjZSgvWy1bXFxde30oKSorPy5cXFxcXiR8XS9nLCBcIlxcXFwkJlwiKSwgXCIoW1xcXFxcXFxcL118JHwhfFxcXFw/KVwiKSk7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChpZGVudCkge1xuICAgICAgcmV0dXJuIHJlZ0V4cC50ZXN0KGlkZW50KTtcbiAgICB9O1xuICB9XG4gIGlmIChpdGVtICYmIF90eXBlb2YoaXRlbSkgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIGl0ZW0udGVzdCA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChpZGVudCkge1xuICAgICAgcmV0dXJuIGl0ZW0udGVzdChpZGVudCk7XG4gICAgfTtcbiAgfVxuICBpZiAodHlwZW9mIGl0ZW0gPT09IFwiZnVuY3Rpb25cIikge1xuICAgIHJldHVybiBpdGVtO1xuICB9XG4gIGlmICh0eXBlb2YgaXRlbSA9PT0gXCJib29sZWFuXCIpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIGl0ZW07XG4gICAgfTtcbiAgfVxufTtcblxuLyoqXG4gKiBAZW51bSB7bnVtYmVyfVxuICovXG52YXIgTG9nTGV2ZWwgPSB7XG4gIG5vbmU6IDYsXG4gIGZhbHNlOiA2LFxuICBlcnJvcjogNSxcbiAgd2FybjogNCxcbiAgaW5mbzogMyxcbiAgbG9nOiAyLFxuICB0cnVlOiAyLFxuICB2ZXJib3NlOiAxXG59O1xuXG4vKipcbiAqIEBwYXJhbSB7TG9nZ2VyT3B0aW9uc30gb3B0aW9ucyBvcHRpb25zIG9iamVjdFxuICogQHJldHVybnMge0xvZ2dpbmdGdW5jdGlvbn0gbG9nZ2luZyBmdW5jdGlvblxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChfcmVmKSB7XG4gIHZhciBfcmVmJGxldmVsID0gX3JlZi5sZXZlbCxcbiAgICBsZXZlbCA9IF9yZWYkbGV2ZWwgPT09IHZvaWQgMCA/IFwiaW5mb1wiIDogX3JlZiRsZXZlbCxcbiAgICBfcmVmJGRlYnVnID0gX3JlZi5kZWJ1ZyxcbiAgICBkZWJ1ZyA9IF9yZWYkZGVidWcgPT09IHZvaWQgMCA/IGZhbHNlIDogX3JlZiRkZWJ1ZyxcbiAgICBjb25zb2xlID0gX3JlZi5jb25zb2xlO1xuICB2YXIgZGVidWdGaWx0ZXJzID0gLyoqIEB0eXBlIHtGaWx0ZXJGdW5jdGlvbltdfSAqL1xuXG4gIHR5cGVvZiBkZWJ1ZyA9PT0gXCJib29sZWFuXCIgPyBbZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBkZWJ1ZztcbiAgfV0gOiAvKiogQHR5cGUge0ZpbHRlckl0ZW1UeXBlc1tdfSAqL1tdLmNvbmNhdChkZWJ1ZykubWFwKGZpbHRlclRvRnVuY3Rpb24pO1xuICB2YXIgbG9nbGV2ZWwgPSBMb2dMZXZlbFtcIlwiLmNvbmNhdChsZXZlbCldIHx8IDA7XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lIG5hbWUgb2YgdGhlIGxvZ2dlclxuICAgKiBAcGFyYW0ge0xvZ1R5cGVFbnVtfSB0eXBlIHR5cGUgb2YgdGhlIGxvZyBlbnRyeVxuICAgKiBAcGFyYW0ge0VYUEVDVEVEX0FOWVtdPX0gYXJncyBhcmd1bWVudHMgb2YgdGhlIGxvZyBlbnRyeVxuICAgKiBAcmV0dXJucyB7dm9pZH1cbiAgICovXG4gIHZhciBsb2dnZXIgPSBmdW5jdGlvbiBsb2dnZXIobmFtZSwgdHlwZSwgYXJncykge1xuICAgIHZhciBsYWJlbGVkQXJncyA9IGZ1bmN0aW9uIGxhYmVsZWRBcmdzKCkge1xuICAgICAgaWYgKEFycmF5LmlzQXJyYXkoYXJncykpIHtcbiAgICAgICAgaWYgKGFyZ3MubGVuZ3RoID4gMCAmJiB0eXBlb2YgYXJnc1swXSA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICAgIHJldHVybiBbXCJbXCIuY29uY2F0KG5hbWUsIFwiXSBcIikuY29uY2F0KGFyZ3NbMF0pXS5jb25jYXQoX3RvQ29uc3VtYWJsZUFycmF5KGFyZ3Muc2xpY2UoMSkpKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gW1wiW1wiLmNvbmNhdChuYW1lLCBcIl1cIildLmNvbmNhdChfdG9Db25zdW1hYmxlQXJyYXkoYXJncykpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIFtdO1xuICAgIH07XG4gICAgdmFyIGRlYnVnID0gZGVidWdGaWx0ZXJzLnNvbWUoZnVuY3Rpb24gKGYpIHtcbiAgICAgIHJldHVybiBmKG5hbWUpO1xuICAgIH0pO1xuICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgY2FzZSBMb2dUeXBlLmRlYnVnOlxuICAgICAgICBpZiAoIWRlYnVnKSByZXR1cm47XG4gICAgICAgIGlmICh0eXBlb2YgY29uc29sZS5kZWJ1ZyA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgY29uc29sZS5kZWJ1Zy5hcHBseShjb25zb2xlLCBfdG9Db25zdW1hYmxlQXJyYXkobGFiZWxlZEFyZ3MoKSkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbnNvbGUubG9nLmFwcGx5KGNvbnNvbGUsIF90b0NvbnN1bWFibGVBcnJheShsYWJlbGVkQXJncygpKSk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIExvZ1R5cGUubG9nOlxuICAgICAgICBpZiAoIWRlYnVnICYmIGxvZ2xldmVsID4gTG9nTGV2ZWwubG9nKSByZXR1cm47XG4gICAgICAgIGNvbnNvbGUubG9nLmFwcGx5KGNvbnNvbGUsIF90b0NvbnN1bWFibGVBcnJheShsYWJlbGVkQXJncygpKSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBMb2dUeXBlLmluZm86XG4gICAgICAgIGlmICghZGVidWcgJiYgbG9nbGV2ZWwgPiBMb2dMZXZlbC5pbmZvKSByZXR1cm47XG4gICAgICAgIGNvbnNvbGUuaW5mby5hcHBseShjb25zb2xlLCBfdG9Db25zdW1hYmxlQXJyYXkobGFiZWxlZEFyZ3MoKSkpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgTG9nVHlwZS53YXJuOlxuICAgICAgICBpZiAoIWRlYnVnICYmIGxvZ2xldmVsID4gTG9nTGV2ZWwud2FybikgcmV0dXJuO1xuICAgICAgICBjb25zb2xlLndhcm4uYXBwbHkoY29uc29sZSwgX3RvQ29uc3VtYWJsZUFycmF5KGxhYmVsZWRBcmdzKCkpKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIExvZ1R5cGUuZXJyb3I6XG4gICAgICAgIGlmICghZGVidWcgJiYgbG9nbGV2ZWwgPiBMb2dMZXZlbC5lcnJvcikgcmV0dXJuO1xuICAgICAgICBjb25zb2xlLmVycm9yLmFwcGx5KGNvbnNvbGUsIF90b0NvbnN1bWFibGVBcnJheShsYWJlbGVkQXJncygpKSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBMb2dUeXBlLnRyYWNlOlxuICAgICAgICBpZiAoIWRlYnVnKSByZXR1cm47XG4gICAgICAgIGNvbnNvbGUudHJhY2UoKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIExvZ1R5cGUuZ3JvdXBDb2xsYXBzZWQ6XG4gICAgICAgIGlmICghZGVidWcgJiYgbG9nbGV2ZWwgPiBMb2dMZXZlbC5sb2cpIHJldHVybjtcbiAgICAgICAgaWYgKCFkZWJ1ZyAmJiBsb2dsZXZlbCA+IExvZ0xldmVsLnZlcmJvc2UpIHtcbiAgICAgICAgICBpZiAodHlwZW9mIGNvbnNvbGUuZ3JvdXBDb2xsYXBzZWQgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgICAgY29uc29sZS5ncm91cENvbGxhcHNlZC5hcHBseShjb25zb2xlLCBfdG9Db25zdW1hYmxlQXJyYXkobGFiZWxlZEFyZ3MoKSkpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZy5hcHBseShjb25zb2xlLCBfdG9Db25zdW1hYmxlQXJyYXkobGFiZWxlZEFyZ3MoKSkpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgLy8gZmFsbHMgdGhyb3VnaFxuICAgICAgY2FzZSBMb2dUeXBlLmdyb3VwOlxuICAgICAgICBpZiAoIWRlYnVnICYmIGxvZ2xldmVsID4gTG9nTGV2ZWwubG9nKSByZXR1cm47XG4gICAgICAgIGlmICh0eXBlb2YgY29uc29sZS5ncm91cCA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgY29uc29sZS5ncm91cC5hcHBseShjb25zb2xlLCBfdG9Db25zdW1hYmxlQXJyYXkobGFiZWxlZEFyZ3MoKSkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbnNvbGUubG9nLmFwcGx5KGNvbnNvbGUsIF90b0NvbnN1bWFibGVBcnJheShsYWJlbGVkQXJncygpKSk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIExvZ1R5cGUuZ3JvdXBFbmQ6XG4gICAgICAgIGlmICghZGVidWcgJiYgbG9nbGV2ZWwgPiBMb2dMZXZlbC5sb2cpIHJldHVybjtcbiAgICAgICAgaWYgKHR5cGVvZiBjb25zb2xlLmdyb3VwRW5kID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICBjb25zb2xlLmdyb3VwRW5kKCk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIExvZ1R5cGUudGltZTpcbiAgICAgICAge1xuICAgICAgICAgIGlmICghZGVidWcgJiYgbG9nbGV2ZWwgPiBMb2dMZXZlbC5sb2cpIHJldHVybjtcbiAgICAgICAgICB2YXIgX2FyZ3MgPSBfc2xpY2VkVG9BcnJheSgvKiogQHR5cGUge1tzdHJpbmcsIG51bWJlciwgbnVtYmVyXX0gKi9cbiAgICAgICAgICAgIGFyZ3MsIDMpLFxuICAgICAgICAgICAgbGFiZWwgPSBfYXJnc1swXSxcbiAgICAgICAgICAgIHN0YXJ0ID0gX2FyZ3NbMV0sXG4gICAgICAgICAgICBlbmQgPSBfYXJnc1syXTtcbiAgICAgICAgICB2YXIgbXMgPSBzdGFydCAqIDEwMDAgKyBlbmQgLyAxMDAwMDAwO1xuICAgICAgICAgIHZhciBtc2cgPSBcIltcIi5jb25jYXQobmFtZSwgXCJdIFwiKS5jb25jYXQobGFiZWwsIFwiOiBcIikuY29uY2F0KG1zLCBcIiBtc1wiKTtcbiAgICAgICAgICBpZiAodHlwZW9mIGNvbnNvbGUubG9nVGltZSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZ1RpbWUobXNnKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc29sZS5sb2cobXNnKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIGNhc2UgTG9nVHlwZS5wcm9maWxlOlxuICAgICAgICBpZiAodHlwZW9mIGNvbnNvbGUucHJvZmlsZSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgY29uc29sZS5wcm9maWxlLmFwcGx5KGNvbnNvbGUsIF90b0NvbnN1bWFibGVBcnJheShsYWJlbGVkQXJncygpKSk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIExvZ1R5cGUucHJvZmlsZUVuZDpcbiAgICAgICAgaWYgKHR5cGVvZiBjb25zb2xlLnByb2ZpbGVFbmQgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgIGNvbnNvbGUucHJvZmlsZUVuZC5hcHBseShjb25zb2xlLCBfdG9Db25zdW1hYmxlQXJyYXkobGFiZWxlZEFyZ3MoKSkpO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBMb2dUeXBlLmNsZWFyOlxuICAgICAgICBpZiAoIWRlYnVnICYmIGxvZ2xldmVsID4gTG9nTGV2ZWwubG9nKSByZXR1cm47XG4gICAgICAgIGlmICh0eXBlb2YgY29uc29sZS5jbGVhciA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgY29uc29sZS5jbGVhcigpO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBMb2dUeXBlLnN0YXR1czpcbiAgICAgICAgaWYgKCFkZWJ1ZyAmJiBsb2dsZXZlbCA+IExvZ0xldmVsLmluZm8pIHJldHVybjtcbiAgICAgICAgaWYgKHR5cGVvZiBjb25zb2xlLnN0YXR1cyA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgaWYgKCFhcmdzIHx8IGFyZ3MubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICBjb25zb2xlLnN0YXR1cygpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zb2xlLnN0YXR1cy5hcHBseShjb25zb2xlLCBfdG9Db25zdW1hYmxlQXJyYXkobGFiZWxlZEFyZ3MoKSkpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmIChhcmdzICYmIGFyZ3MubGVuZ3RoICE9PSAwKSB7XG4gICAgICAgICAgY29uc29sZS5pbmZvLmFwcGx5KGNvbnNvbGUsIF90b0NvbnN1bWFibGVBcnJheShsYWJlbGVkQXJncygpKSk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJVbmV4cGVjdGVkIExvZ1R5cGUgXCIuY29uY2F0KHR5cGUpKTtcbiAgICB9XG4gIH07XG4gIHJldHVybiBsb2dnZXI7XG59O1xuXG4vKioqLyB9KSxcblxuLyoqKi8gXCIuL25vZGVfbW9kdWxlcy93ZWJwYWNrL2xpYi9sb2dnaW5nL3J1bnRpbWUuanNcIjpcbi8qISoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqISpcXFxuICAhKioqIC4vbm9kZV9tb2R1bGVzL3dlYnBhY2svbGliL2xvZ2dpbmcvcnVudGltZS5qcyAqKiohXG4gIFxcKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBfX3VudXNlZF93ZWJwYWNrX2V4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuLypcblx0TUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcblx0QXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxuKi9cblxuXG5cbmZ1bmN0aW9uIF9leHRlbmRzKCkge1xuICByZXR1cm4gX2V4dGVuZHMgPSBPYmplY3QuYXNzaWduID8gT2JqZWN0LmFzc2lnbi5iaW5kKCkgOiBmdW5jdGlvbiAobikge1xuICAgIGZvciAodmFyIGUgPSAxOyBlIDwgYXJndW1lbnRzLmxlbmd0aDsgZSsrKSB7XG4gICAgICB2YXIgdCA9IGFyZ3VtZW50c1tlXTtcbiAgICAgIGZvciAodmFyIHIgaW4gdCkgKHt9KS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHQsIHIpICYmIChuW3JdID0gdFtyXSk7XG4gICAgfVxuICAgIHJldHVybiBuO1xuICB9LCBfZXh0ZW5kcy5hcHBseShudWxsLCBhcmd1bWVudHMpO1xufVxudmFyIF9yZXF1aXJlID0gX193ZWJwYWNrX3JlcXVpcmVfXygvKiEgdGFwYWJsZSAqLyBcIi4vY2xpZW50LXNyYy9tb2R1bGVzL2xvZ2dlci90YXBhYmxlLmpzXCIpLFxuICBTeW5jQmFpbEhvb2sgPSBfcmVxdWlyZS5TeW5jQmFpbEhvb2s7XG52YXIgX3JlcXVpcmUyID0gX193ZWJwYWNrX3JlcXVpcmVfXygvKiEgLi9Mb2dnZXIgKi8gXCIuL25vZGVfbW9kdWxlcy93ZWJwYWNrL2xpYi9sb2dnaW5nL0xvZ2dlci5qc1wiKSxcbiAgTG9nZ2VyID0gX3JlcXVpcmUyLkxvZ2dlcjtcbnZhciBjcmVhdGVDb25zb2xlTG9nZ2VyID0gX193ZWJwYWNrX3JlcXVpcmVfXygvKiEgLi9jcmVhdGVDb25zb2xlTG9nZ2VyICovIFwiLi9ub2RlX21vZHVsZXMvd2VicGFjay9saWIvbG9nZ2luZy9jcmVhdGVDb25zb2xlTG9nZ2VyLmpzXCIpO1xuXG4vKiogQHR5cGUge2NyZWF0ZUNvbnNvbGVMb2dnZXIuTG9nZ2VyT3B0aW9uc30gKi9cbnZhciBjdXJyZW50RGVmYXVsdExvZ2dlck9wdGlvbnMgPSB7XG4gIGxldmVsOiBcImluZm9cIixcbiAgZGVidWc6IGZhbHNlLFxuICBjb25zb2xlOiBjb25zb2xlXG59O1xudmFyIGN1cnJlbnREZWZhdWx0TG9nZ2VyID0gY3JlYXRlQ29uc29sZUxvZ2dlcihjdXJyZW50RGVmYXVsdExvZ2dlck9wdGlvbnMpO1xuXG4vKipcbiAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lIG5hbWUgb2YgdGhlIGxvZ2dlclxuICogQHJldHVybnMge0xvZ2dlcn0gYSBsb2dnZXJcbiAqL1xubW9kdWxlLmV4cG9ydHMuZ2V0TG9nZ2VyID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgcmV0dXJuIG5ldyBMb2dnZXIoZnVuY3Rpb24gKHR5cGUsIGFyZ3MpIHtcbiAgICBpZiAobW9kdWxlLmV4cG9ydHMuaG9va3MubG9nLmNhbGwobmFtZSwgdHlwZSwgYXJncykgPT09IHVuZGVmaW5lZCkge1xuICAgICAgY3VycmVudERlZmF1bHRMb2dnZXIobmFtZSwgdHlwZSwgYXJncyk7XG4gICAgfVxuICB9LCBmdW5jdGlvbiAoY2hpbGROYW1lKSB7XG4gICAgcmV0dXJuIG1vZHVsZS5leHBvcnRzLmdldExvZ2dlcihcIlwiLmNvbmNhdChuYW1lLCBcIi9cIikuY29uY2F0KGNoaWxkTmFtZSkpO1xuICB9KTtcbn07XG5cbi8qKlxuICogQHBhcmFtIHtjcmVhdGVDb25zb2xlTG9nZ2VyLkxvZ2dlck9wdGlvbnN9IG9wdGlvbnMgbmV3IG9wdGlvbnMsIG1lcmdlIHdpdGggb2xkIG9wdGlvbnNcbiAqIEByZXR1cm5zIHt2b2lkfVxuICovXG5tb2R1bGUuZXhwb3J0cy5jb25maWd1cmVEZWZhdWx0TG9nZ2VyID0gZnVuY3Rpb24gKG9wdGlvbnMpIHtcbiAgX2V4dGVuZHMoY3VycmVudERlZmF1bHRMb2dnZXJPcHRpb25zLCBvcHRpb25zKTtcbiAgY3VycmVudERlZmF1bHRMb2dnZXIgPSBjcmVhdGVDb25zb2xlTG9nZ2VyKGN1cnJlbnREZWZhdWx0TG9nZ2VyT3B0aW9ucyk7XG59O1xubW9kdWxlLmV4cG9ydHMuaG9va3MgPSB7XG4gIGxvZzogbmV3IFN5bmNCYWlsSG9vayhbXCJvcmlnaW5cIiwgXCJ0eXBlXCIsIFwiYXJnc1wiXSlcbn07XG5cbi8qKiovIH0pXG5cbi8qKioqKiovIFx0fSk7XG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuLyoqKioqKi8gXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4vKioqKioqLyBcdHZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcbi8qKioqKiovIFx0XG4vKioqKioqLyBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4vKioqKioqLyBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcbi8qKioqKiovIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbi8qKioqKiovIFx0XHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcbi8qKioqKiovIFx0XHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcbi8qKioqKiovIFx0XHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcbi8qKioqKiovIFx0XHR9XG4vKioqKioqLyBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbi8qKioqKiovIFx0XHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcbi8qKioqKiovIFx0XHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcbi8qKioqKiovIFx0XHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG4vKioqKioqLyBcdFx0XHRleHBvcnRzOiB7fVxuLyoqKioqKi8gXHRcdH07XG4vKioqKioqLyBcdFxuLyoqKioqKi8gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuLyoqKioqKi8gXHRcdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuLyoqKioqKi8gXHRcbi8qKioqKiovIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuLyoqKioqKi8gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbi8qKioqKiovIFx0fVxuLyoqKioqKi8gXHRcbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG4vKioqKioqLyBcdC8qIHdlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyAqL1xuLyoqKioqKi8gXHQhZnVuY3Rpb24oKSB7XG4vKioqKioqLyBcdFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuLyoqKioqKi8gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIGRlZmluaXRpb24pIHtcbi8qKioqKiovIFx0XHRcdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcbi8qKioqKiovIFx0XHRcdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG4vKioqKioqLyBcdFx0XHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcbi8qKioqKiovIFx0XHRcdFx0fVxuLyoqKioqKi8gXHRcdFx0fVxuLyoqKioqKi8gXHRcdH07XG4vKioqKioqLyBcdH0oKTtcbi8qKioqKiovIFx0XG4vKioqKioqLyBcdC8qIHdlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQgKi9cbi8qKioqKiovIFx0IWZ1bmN0aW9uKCkge1xuLyoqKioqKi8gXHRcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iaiwgcHJvcCkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCk7IH1cbi8qKioqKiovIFx0fSgpO1xuLyoqKioqKi8gXHRcbi8qKioqKiovIFx0Lyogd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCAqL1xuLyoqKioqKi8gXHQhZnVuY3Rpb24oKSB7XG4vKioqKioqLyBcdFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuLyoqKioqKi8gXHRcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbi8qKioqKiovIFx0XHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuLyoqKioqKi8gXHRcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbi8qKioqKiovIFx0XHRcdH1cbi8qKioqKiovIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4vKioqKioqLyBcdFx0fTtcbi8qKioqKiovIFx0fSgpO1xuLyoqKioqKi8gXHRcbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IHt9O1xuLy8gVGhpcyBlbnRyeSBuZWVkcyB0byBiZSB3cmFwcGVkIGluIGFuIElJRkUgYmVjYXVzZSBpdCBuZWVkcyB0byBiZSBpc29sYXRlZCBhZ2FpbnN0IG90aGVyIG1vZHVsZXMgaW4gdGhlIGNodW5rLlxuIWZ1bmN0aW9uKCkge1xuLyohKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiohKlxcXG4gICEqKiogLi9jbGllbnQtc3JjL21vZHVsZXMvbG9nZ2VyL2luZGV4LmpzICoqKiFcbiAgXFwqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbl9fd2VicGFja19yZXF1aXJlX18ucihfX3dlYnBhY2tfZXhwb3J0c19fKTtcbi8qIGhhcm1vbnkgZXhwb3J0ICovIF9fd2VicGFja19yZXF1aXJlX18uZChfX3dlYnBhY2tfZXhwb3J0c19fLCB7XG4vKiBoYXJtb255IGV4cG9ydCAqLyAgIFwiZGVmYXVsdFwiOiBmdW5jdGlvbigpIHsgcmV0dXJuIC8qIHJlZXhwb3J0IGRlZmF1bHQgZXhwb3J0IGZyb20gbmFtZWQgbW9kdWxlICovIHdlYnBhY2tfbGliX2xvZ2dpbmdfcnVudGltZV9qc19fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMF9fOyB9XG4vKiBoYXJtb255IGV4cG9ydCAqLyB9KTtcbi8qIGhhcm1vbnkgaW1wb3J0ICovIHZhciB3ZWJwYWNrX2xpYl9sb2dnaW5nX3J1bnRpbWVfanNfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzBfXyA9IF9fd2VicGFja19yZXF1aXJlX18oLyohIHdlYnBhY2svbGliL2xvZ2dpbmcvcnVudGltZS5qcyAqLyBcIi4vbm9kZV9tb2R1bGVzL3dlYnBhY2svbGliL2xvZ2dpbmcvcnVudGltZS5qc1wiKTtcblxufSgpO1xudmFyIF9fd2VicGFja19leHBvcnRfdGFyZ2V0X18gPSBleHBvcnRzO1xuZm9yKHZhciBfX3dlYnBhY2tfaV9fIGluIF9fd2VicGFja19leHBvcnRzX18pIF9fd2VicGFja19leHBvcnRfdGFyZ2V0X19bX193ZWJwYWNrX2lfX10gPSBfX3dlYnBhY2tfZXhwb3J0c19fW19fd2VicGFja19pX19dO1xuaWYoX193ZWJwYWNrX2V4cG9ydHNfXy5fX2VzTW9kdWxlKSBPYmplY3QuZGVmaW5lUHJvcGVydHkoX193ZWJwYWNrX2V4cG9ydF90YXJnZXRfXywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG4vKioqKioqLyB9KSgpXG47IiwiZnVuY3Rpb24gX3R5cGVvZihvKSB7IFwiQGJhYmVsL2hlbHBlcnMgLSB0eXBlb2ZcIjsgcmV0dXJuIF90eXBlb2YgPSBcImZ1bmN0aW9uXCIgPT0gdHlwZW9mIFN5bWJvbCAmJiBcInN5bWJvbFwiID09IHR5cGVvZiBTeW1ib2wuaXRlcmF0b3IgPyBmdW5jdGlvbiAobykgeyByZXR1cm4gdHlwZW9mIG87IH0gOiBmdW5jdGlvbiAobykgeyByZXR1cm4gbyAmJiBcImZ1bmN0aW9uXCIgPT0gdHlwZW9mIFN5bWJvbCAmJiBvLmNvbnN0cnVjdG9yID09PSBTeW1ib2wgJiYgbyAhPT0gU3ltYm9sLnByb3RvdHlwZSA/IFwic3ltYm9sXCIgOiB0eXBlb2YgbzsgfSwgX3R5cGVvZihvKTsgfVxuZnVuY3Rpb24gb3duS2V5cyhlLCByKSB7IHZhciB0ID0gT2JqZWN0LmtleXMoZSk7IGlmIChPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKSB7IHZhciBvID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhlKTsgciAmJiAobyA9IG8uZmlsdGVyKGZ1bmN0aW9uIChyKSB7IHJldHVybiBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKGUsIHIpLmVudW1lcmFibGU7IH0pKSwgdC5wdXNoLmFwcGx5KHQsIG8pOyB9IHJldHVybiB0OyB9XG5mdW5jdGlvbiBfb2JqZWN0U3ByZWFkKGUpIHsgZm9yICh2YXIgciA9IDE7IHIgPCBhcmd1bWVudHMubGVuZ3RoOyByKyspIHsgdmFyIHQgPSBudWxsICE9IGFyZ3VtZW50c1tyXSA/IGFyZ3VtZW50c1tyXSA6IHt9OyByICUgMiA/IG93bktleXMoT2JqZWN0KHQpLCAhMCkuZm9yRWFjaChmdW5jdGlvbiAocikgeyBfZGVmaW5lUHJvcGVydHkoZSwgciwgdFtyXSk7IH0pIDogT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcnMgPyBPYmplY3QuZGVmaW5lUHJvcGVydGllcyhlLCBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9ycyh0KSkgOiBvd25LZXlzKE9iamVjdCh0KSkuZm9yRWFjaChmdW5jdGlvbiAocikgeyBPYmplY3QuZGVmaW5lUHJvcGVydHkoZSwgciwgT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0LCByKSk7IH0pOyB9IHJldHVybiBlOyB9XG5mdW5jdGlvbiBfZGVmaW5lUHJvcGVydHkoZSwgciwgdCkgeyByZXR1cm4gKHIgPSBfdG9Qcm9wZXJ0eUtleShyKSkgaW4gZSA/IE9iamVjdC5kZWZpbmVQcm9wZXJ0eShlLCByLCB7IHZhbHVlOiB0LCBlbnVtZXJhYmxlOiAhMCwgY29uZmlndXJhYmxlOiAhMCwgd3JpdGFibGU6ICEwIH0pIDogZVtyXSA9IHQsIGU7IH1cbmZ1bmN0aW9uIF90b1Byb3BlcnR5S2V5KHQpIHsgdmFyIGkgPSBfdG9QcmltaXRpdmUodCwgXCJzdHJpbmdcIik7IHJldHVybiBcInN5bWJvbFwiID09IF90eXBlb2YoaSkgPyBpIDogaSArIFwiXCI7IH1cbmZ1bmN0aW9uIF90b1ByaW1pdGl2ZSh0LCByKSB7IGlmIChcIm9iamVjdFwiICE9IF90eXBlb2YodCkgfHwgIXQpIHJldHVybiB0OyB2YXIgZSA9IHRbU3ltYm9sLnRvUHJpbWl0aXZlXTsgaWYgKHZvaWQgMCAhPT0gZSkgeyB2YXIgaSA9IGUuY2FsbCh0LCByIHx8IFwiZGVmYXVsdFwiKTsgaWYgKFwib2JqZWN0XCIgIT0gX3R5cGVvZihpKSkgcmV0dXJuIGk7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJAQHRvUHJpbWl0aXZlIG11c3QgcmV0dXJuIGEgcHJpbWl0aXZlIHZhbHVlLlwiKTsgfSByZXR1cm4gKFwic3RyaW5nXCIgPT09IHIgPyBTdHJpbmcgOiBOdW1iZXIpKHQpOyB9XG4vLyBUaGUgZXJyb3Igb3ZlcmxheSBpcyBpbnNwaXJlZCAoYW5kIG1vc3RseSBjb3BpZWQpIGZyb20gQ3JlYXRlIFJlYWN0IEFwcCAoaHR0cHM6Ly9naXRodWIuY29tL2ZhY2Vib29raW5jdWJhdG9yL2NyZWF0ZS1yZWFjdC1hcHApXG4vLyBUaGV5LCBpbiB0dXJuLCBnb3QgaW5zcGlyZWQgYnkgd2VicGFjay1ob3QtbWlkZGxld2FyZSAoaHR0cHM6Ly9naXRodWIuY29tL2dsZW5qYW1pbi93ZWJwYWNrLWhvdC1taWRkbGV3YXJlKS5cblxuaW1wb3J0IGFuc2lIVE1MIGZyb20gXCJhbnNpLWh0bWwtY29tbXVuaXR5XCI7XG5cbi8qKlxuICogQHR5cGUgeyhpbnB1dDogc3RyaW5nLCBwb3NpdGlvbjogbnVtYmVyKSA9PiBzdHJpbmd9XG4gKi9cbnZhciBnZXRDb2RlUG9pbnQgPSBTdHJpbmcucHJvdG90eXBlLmNvZGVQb2ludEF0ID8gZnVuY3Rpb24gKGlucHV0LCBwb3NpdGlvbikge1xuICByZXR1cm4gaW5wdXQuY29kZVBvaW50QXQocG9zaXRpb24pO1xufSA6IGZ1bmN0aW9uIChpbnB1dCwgcG9zaXRpb24pIHtcbiAgcmV0dXJuIChpbnB1dC5jaGFyQ29kZUF0KHBvc2l0aW9uKSAtIDB4ZDgwMCkgKiAweDQwMCArIGlucHV0LmNoYXJDb2RlQXQocG9zaXRpb24gKyAxKSAtIDB4ZGMwMCArIDB4MTAwMDA7XG59O1xuXG4vKipcbiAqIEBwYXJhbSB7c3RyaW5nfSBtYWNyb1RleHRcbiAqIEBwYXJhbSB7UmVnRXhwfSBtYWNyb1JlZ0V4cFxuICogQHBhcmFtIHsoaW5wdXQ6IHN0cmluZykgPT4gc3RyaW5nfSBtYWNyb1JlcGxhY2VyXG4gKiBAcmV0dXJucyB7c3RyaW5nfVxuICovXG52YXIgcmVwbGFjZVVzaW5nUmVnRXhwID0gZnVuY3Rpb24gcmVwbGFjZVVzaW5nUmVnRXhwKG1hY3JvVGV4dCwgbWFjcm9SZWdFeHAsIG1hY3JvUmVwbGFjZXIpIHtcbiAgbWFjcm9SZWdFeHAubGFzdEluZGV4ID0gMDtcbiAgdmFyIHJlcGxhY2VNYXRjaCA9IG1hY3JvUmVnRXhwLmV4ZWMobWFjcm9UZXh0KTtcbiAgdmFyIHJlcGxhY2VSZXN1bHQ7XG4gIGlmIChyZXBsYWNlTWF0Y2gpIHtcbiAgICByZXBsYWNlUmVzdWx0ID0gXCJcIjtcbiAgICB2YXIgcmVwbGFjZUxhc3RJbmRleCA9IDA7XG4gICAgZG8ge1xuICAgICAgaWYgKHJlcGxhY2VMYXN0SW5kZXggIT09IHJlcGxhY2VNYXRjaC5pbmRleCkge1xuICAgICAgICByZXBsYWNlUmVzdWx0ICs9IG1hY3JvVGV4dC5zdWJzdHJpbmcocmVwbGFjZUxhc3RJbmRleCwgcmVwbGFjZU1hdGNoLmluZGV4KTtcbiAgICAgIH1cbiAgICAgIHZhciByZXBsYWNlSW5wdXQgPSByZXBsYWNlTWF0Y2hbMF07XG4gICAgICByZXBsYWNlUmVzdWx0ICs9IG1hY3JvUmVwbGFjZXIocmVwbGFjZUlucHV0KTtcbiAgICAgIHJlcGxhY2VMYXN0SW5kZXggPSByZXBsYWNlTWF0Y2guaW5kZXggKyByZXBsYWNlSW5wdXQubGVuZ3RoO1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWNvbmQtYXNzaWduXG4gICAgfSB3aGlsZSAocmVwbGFjZU1hdGNoID0gbWFjcm9SZWdFeHAuZXhlYyhtYWNyb1RleHQpKTtcbiAgICBpZiAocmVwbGFjZUxhc3RJbmRleCAhPT0gbWFjcm9UZXh0Lmxlbmd0aCkge1xuICAgICAgcmVwbGFjZVJlc3VsdCArPSBtYWNyb1RleHQuc3Vic3RyaW5nKHJlcGxhY2VMYXN0SW5kZXgpO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICByZXBsYWNlUmVzdWx0ID0gbWFjcm9UZXh0O1xuICB9XG4gIHJldHVybiByZXBsYWNlUmVzdWx0O1xufTtcbnZhciByZWZlcmVuY2VzID0ge1xuICBcIjxcIjogXCImbHQ7XCIsXG4gIFwiPlwiOiBcIiZndDtcIixcbiAgJ1wiJzogXCImcXVvdDtcIixcbiAgXCInXCI6IFwiJmFwb3M7XCIsXG4gIFwiJlwiOiBcIiZhbXA7XCJcbn07XG5cbi8qKlxuICogQHBhcmFtIHtzdHJpbmd9IHRleHQgdGV4dFxuICogQHJldHVybnMge3N0cmluZ31cbiAqL1xuZnVuY3Rpb24gZW5jb2RlKHRleHQpIHtcbiAgaWYgKCF0ZXh0KSB7XG4gICAgcmV0dXJuIFwiXCI7XG4gIH1cbiAgcmV0dXJuIHJlcGxhY2VVc2luZ1JlZ0V4cCh0ZXh0LCAvWzw+J1wiJl0vZywgZnVuY3Rpb24gKGlucHV0KSB7XG4gICAgdmFyIHJlc3VsdCA9IHJlZmVyZW5jZXNbaW5wdXRdO1xuICAgIGlmICghcmVzdWx0KSB7XG4gICAgICB2YXIgY29kZSA9IGlucHV0Lmxlbmd0aCA+IDEgPyBnZXRDb2RlUG9pbnQoaW5wdXQsIDApIDogaW5wdXQuY2hhckNvZGVBdCgwKTtcbiAgICAgIHJlc3VsdCA9IFwiJiNcIi5jb25jYXQoY29kZSwgXCI7XCIpO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9KTtcbn1cblxuLyoqXG4gKiBAdHlwZWRlZiB7T2JqZWN0fSBTdGF0ZURlZmluaXRpb25zXG4gKiBAcHJvcGVydHkge3tbZXZlbnQ6IHN0cmluZ106IHsgdGFyZ2V0OiBzdHJpbmc7IGFjdGlvbnM/OiBBcnJheTxzdHJpbmc+IH19fSBbb25dXG4gKi9cblxuLyoqXG4gKiBAdHlwZWRlZiB7T2JqZWN0fSBPcHRpb25zXG4gKiBAcHJvcGVydHkge3tbc3RhdGU6IHN0cmluZ106IFN0YXRlRGVmaW5pdGlvbnN9fSBzdGF0ZXNcbiAqIEBwcm9wZXJ0eSB7b2JqZWN0fSBjb250ZXh0O1xuICogQHByb3BlcnR5IHtzdHJpbmd9IGluaXRpYWxcbiAqL1xuXG4vKipcbiAqIEB0eXBlZGVmIHtPYmplY3R9IEltcGxlbWVudGF0aW9uXG4gKiBAcHJvcGVydHkge3tbYWN0aW9uTmFtZTogc3RyaW5nXTogKGN0eDogb2JqZWN0LCBldmVudDogYW55KSA9PiBvYmplY3R9fSBhY3Rpb25zXG4gKi9cblxuLyoqXG4gKiBBIHNpbXBsaWZpZWQgYGNyZWF0ZU1hY2hpbmVgIGZyb20gYEB4c3RhdGUvZnNtYCB3aXRoIHRoZSBmb2xsb3dpbmcgZGlmZmVyZW5jZXM6XG4gKlxuICogIC0gdGhlIHJldHVybmVkIG1hY2hpbmUgaXMgdGVjaG5pY2FsbHkgYSBcInNlcnZpY2VcIi4gTm8gYGludGVycHJldChtYWNoaW5lKS5zdGFydCgpYCBpcyBuZWVkZWQuXG4gKiAgLSB0aGUgc3RhdGUgZGVmaW5pdGlvbiBvbmx5IHN1cHBvcnQgYG9uYCBhbmQgdGFyZ2V0IG11c3QgYmUgZGVjbGFyZWQgd2l0aCB7IHRhcmdldDogJ25leHRTdGF0ZScsIGFjdGlvbnM6IFtdIH0gZXhwbGljaXRseS5cbiAqICAtIGV2ZW50IHBhc3NlZCB0byBgc2VuZGAgbXVzdCBiZSBhbiBvYmplY3Qgd2l0aCBgdHlwZWAgcHJvcGVydHkuXG4gKiAgLSBhY3Rpb25zIGltcGxlbWVudGF0aW9uIHdpbGwgYmUgW2Fzc2lnbiBhY3Rpb25dKGh0dHBzOi8veHN0YXRlLmpzLm9yZy9kb2NzL2d1aWRlcy9jb250ZXh0Lmh0bWwjYXNzaWduLWFjdGlvbikgaWYgeW91IHJldHVybiBhbnkgdmFsdWUuXG4gKiAgRG8gbm90IHJldHVybiBhbnl0aGluZyBpZiB5b3UganVzdCB3YW50IHRvIGludm9rZSBzaWRlIGVmZmVjdC5cbiAqXG4gKiBUaGUgZ29hbCBvZiB0aGlzIGN1c3RvbSBmdW5jdGlvbiBpcyB0byBhdm9pZCBpbnN0YWxsaW5nIHRoZSBlbnRpcmUgYCd4c3RhdGUvZnNtJ2AgcGFja2FnZSwgd2hpbGUgZW5hYmxpbmcgbW9kZWxpbmcgdXNpbmdcbiAqIHN0YXRlIG1hY2hpbmUuIFlvdSBjYW4gY29weSB0aGUgZmlyc3QgcGFyYW1ldGVyIGludG8gdGhlIGVkaXRvciBhdCBodHRwczovL3N0YXRlbHkuYWkvdml6IHRvIHZpc3VhbGl6ZSB0aGUgc3RhdGUgbWFjaGluZS5cbiAqXG4gKiBAcGFyYW0ge09wdGlvbnN9IG9wdGlvbnNcbiAqIEBwYXJhbSB7SW1wbGVtZW50YXRpb259IGltcGxlbWVudGF0aW9uXG4gKi9cbmZ1bmN0aW9uIGNyZWF0ZU1hY2hpbmUoX3JlZiwgX3JlZjIpIHtcbiAgdmFyIHN0YXRlcyA9IF9yZWYuc3RhdGVzLFxuICAgIGNvbnRleHQgPSBfcmVmLmNvbnRleHQsXG4gICAgaW5pdGlhbCA9IF9yZWYuaW5pdGlhbDtcbiAgdmFyIGFjdGlvbnMgPSBfcmVmMi5hY3Rpb25zO1xuICB2YXIgY3VycmVudFN0YXRlID0gaW5pdGlhbDtcbiAgdmFyIGN1cnJlbnRDb250ZXh0ID0gY29udGV4dDtcbiAgcmV0dXJuIHtcbiAgICBzZW5kOiBmdW5jdGlvbiBzZW5kKGV2ZW50KSB7XG4gICAgICB2YXIgY3VycmVudFN0YXRlT24gPSBzdGF0ZXNbY3VycmVudFN0YXRlXS5vbjtcbiAgICAgIHZhciB0cmFuc2l0aW9uQ29uZmlnID0gY3VycmVudFN0YXRlT24gJiYgY3VycmVudFN0YXRlT25bZXZlbnQudHlwZV07XG4gICAgICBpZiAodHJhbnNpdGlvbkNvbmZpZykge1xuICAgICAgICBjdXJyZW50U3RhdGUgPSB0cmFuc2l0aW9uQ29uZmlnLnRhcmdldDtcbiAgICAgICAgaWYgKHRyYW5zaXRpb25Db25maWcuYWN0aW9ucykge1xuICAgICAgICAgIHRyYW5zaXRpb25Db25maWcuYWN0aW9ucy5mb3JFYWNoKGZ1bmN0aW9uIChhY3ROYW1lKSB7XG4gICAgICAgICAgICB2YXIgYWN0aW9uSW1wbCA9IGFjdGlvbnNbYWN0TmFtZV07XG4gICAgICAgICAgICB2YXIgbmV4dENvbnRleHRWYWx1ZSA9IGFjdGlvbkltcGwgJiYgYWN0aW9uSW1wbChjdXJyZW50Q29udGV4dCwgZXZlbnQpO1xuICAgICAgICAgICAgaWYgKG5leHRDb250ZXh0VmFsdWUpIHtcbiAgICAgICAgICAgICAgY3VycmVudENvbnRleHQgPSBfb2JqZWN0U3ByZWFkKF9vYmplY3RTcHJlYWQoe30sIGN1cnJlbnRDb250ZXh0KSwgbmV4dENvbnRleHRWYWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH07XG59XG5cbi8qKlxuICogQHR5cGVkZWYge09iamVjdH0gU2hvd092ZXJsYXlEYXRhXG4gKiBAcHJvcGVydHkgeyd3YXJuaW5nJyB8ICdlcnJvcid9IGxldmVsXG4gKiBAcHJvcGVydHkge0FycmF5PHN0cmluZyAgfCB7IG1vZHVsZUlkZW50aWZpZXI/OiBzdHJpbmcsIG1vZHVsZU5hbWU/OiBzdHJpbmcsIGxvYz86IHN0cmluZywgbWVzc2FnZT86IHN0cmluZyB9Pn0gbWVzc2FnZXNcbiAqIEBwcm9wZXJ0eSB7J2J1aWxkJyB8ICdydW50aW1lJ30gbWVzc2FnZVNvdXJjZVxuICovXG5cbi8qKlxuICogQHR5cGVkZWYge09iamVjdH0gQ3JlYXRlT3ZlcmxheU1hY2hpbmVPcHRpb25zXG4gKiBAcHJvcGVydHkgeyhkYXRhOiBTaG93T3ZlcmxheURhdGEpID0+IHZvaWR9IHNob3dPdmVybGF5XG4gKiBAcHJvcGVydHkgeygpID0+IHZvaWR9IGhpZGVPdmVybGF5XG4gKi9cblxuLyoqXG4gKiBAcGFyYW0ge0NyZWF0ZU92ZXJsYXlNYWNoaW5lT3B0aW9uc30gb3B0aW9uc1xuICovXG52YXIgY3JlYXRlT3ZlcmxheU1hY2hpbmUgPSBmdW5jdGlvbiBjcmVhdGVPdmVybGF5TWFjaGluZShvcHRpb25zKSB7XG4gIHZhciBoaWRlT3ZlcmxheSA9IG9wdGlvbnMuaGlkZU92ZXJsYXksXG4gICAgc2hvd092ZXJsYXkgPSBvcHRpb25zLnNob3dPdmVybGF5O1xuICByZXR1cm4gY3JlYXRlTWFjaGluZSh7XG4gICAgaW5pdGlhbDogXCJoaWRkZW5cIixcbiAgICBjb250ZXh0OiB7XG4gICAgICBsZXZlbDogXCJlcnJvclwiLFxuICAgICAgbWVzc2FnZXM6IFtdLFxuICAgICAgbWVzc2FnZVNvdXJjZTogXCJidWlsZFwiXG4gICAgfSxcbiAgICBzdGF0ZXM6IHtcbiAgICAgIGhpZGRlbjoge1xuICAgICAgICBvbjoge1xuICAgICAgICAgIEJVSUxEX0VSUk9SOiB7XG4gICAgICAgICAgICB0YXJnZXQ6IFwiZGlzcGxheUJ1aWxkRXJyb3JcIixcbiAgICAgICAgICAgIGFjdGlvbnM6IFtcInNldE1lc3NhZ2VzXCIsIFwic2hvd092ZXJsYXlcIl1cbiAgICAgICAgICB9LFxuICAgICAgICAgIFJVTlRJTUVfRVJST1I6IHtcbiAgICAgICAgICAgIHRhcmdldDogXCJkaXNwbGF5UnVudGltZUVycm9yXCIsXG4gICAgICAgICAgICBhY3Rpb25zOiBbXCJzZXRNZXNzYWdlc1wiLCBcInNob3dPdmVybGF5XCJdXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgZGlzcGxheUJ1aWxkRXJyb3I6IHtcbiAgICAgICAgb246IHtcbiAgICAgICAgICBESVNNSVNTOiB7XG4gICAgICAgICAgICB0YXJnZXQ6IFwiaGlkZGVuXCIsXG4gICAgICAgICAgICBhY3Rpb25zOiBbXCJkaXNtaXNzTWVzc2FnZXNcIiwgXCJoaWRlT3ZlcmxheVwiXVxuICAgICAgICAgIH0sXG4gICAgICAgICAgQlVJTERfRVJST1I6IHtcbiAgICAgICAgICAgIHRhcmdldDogXCJkaXNwbGF5QnVpbGRFcnJvclwiLFxuICAgICAgICAgICAgYWN0aW9uczogW1wiYXBwZW5kTWVzc2FnZXNcIiwgXCJzaG93T3ZlcmxheVwiXVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGRpc3BsYXlSdW50aW1lRXJyb3I6IHtcbiAgICAgICAgb246IHtcbiAgICAgICAgICBESVNNSVNTOiB7XG4gICAgICAgICAgICB0YXJnZXQ6IFwiaGlkZGVuXCIsXG4gICAgICAgICAgICBhY3Rpb25zOiBbXCJkaXNtaXNzTWVzc2FnZXNcIiwgXCJoaWRlT3ZlcmxheVwiXVxuICAgICAgICAgIH0sXG4gICAgICAgICAgUlVOVElNRV9FUlJPUjoge1xuICAgICAgICAgICAgdGFyZ2V0OiBcImRpc3BsYXlSdW50aW1lRXJyb3JcIixcbiAgICAgICAgICAgIGFjdGlvbnM6IFtcImFwcGVuZE1lc3NhZ2VzXCIsIFwic2hvd092ZXJsYXlcIl1cbiAgICAgICAgICB9LFxuICAgICAgICAgIEJVSUxEX0VSUk9SOiB7XG4gICAgICAgICAgICB0YXJnZXQ6IFwiZGlzcGxheUJ1aWxkRXJyb3JcIixcbiAgICAgICAgICAgIGFjdGlvbnM6IFtcInNldE1lc3NhZ2VzXCIsIFwic2hvd092ZXJsYXlcIl1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH0sIHtcbiAgICBhY3Rpb25zOiB7XG4gICAgICBkaXNtaXNzTWVzc2FnZXM6IGZ1bmN0aW9uIGRpc21pc3NNZXNzYWdlcygpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBtZXNzYWdlczogW10sXG4gICAgICAgICAgbGV2ZWw6IFwiZXJyb3JcIixcbiAgICAgICAgICBtZXNzYWdlU291cmNlOiBcImJ1aWxkXCJcbiAgICAgICAgfTtcbiAgICAgIH0sXG4gICAgICBhcHBlbmRNZXNzYWdlczogZnVuY3Rpb24gYXBwZW5kTWVzc2FnZXMoY29udGV4dCwgZXZlbnQpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBtZXNzYWdlczogY29udGV4dC5tZXNzYWdlcy5jb25jYXQoZXZlbnQubWVzc2FnZXMpLFxuICAgICAgICAgIGxldmVsOiBldmVudC5sZXZlbCB8fCBjb250ZXh0LmxldmVsLFxuICAgICAgICAgIG1lc3NhZ2VTb3VyY2U6IGV2ZW50LnR5cGUgPT09IFwiUlVOVElNRV9FUlJPUlwiID8gXCJydW50aW1lXCIgOiBcImJ1aWxkXCJcbiAgICAgICAgfTtcbiAgICAgIH0sXG4gICAgICBzZXRNZXNzYWdlczogZnVuY3Rpb24gc2V0TWVzc2FnZXMoY29udGV4dCwgZXZlbnQpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBtZXNzYWdlczogZXZlbnQubWVzc2FnZXMsXG4gICAgICAgICAgbGV2ZWw6IGV2ZW50LmxldmVsIHx8IGNvbnRleHQubGV2ZWwsXG4gICAgICAgICAgbWVzc2FnZVNvdXJjZTogZXZlbnQudHlwZSA9PT0gXCJSVU5USU1FX0VSUk9SXCIgPyBcInJ1bnRpbWVcIiA6IFwiYnVpbGRcIlxuICAgICAgICB9O1xuICAgICAgfSxcbiAgICAgIGhpZGVPdmVybGF5OiBoaWRlT3ZlcmxheSxcbiAgICAgIHNob3dPdmVybGF5OiBzaG93T3ZlcmxheVxuICAgIH1cbiAgfSk7XG59O1xuXG4vKipcbiAqXG4gKiBAcGFyYW0ge0Vycm9yfSBlcnJvclxuICovXG52YXIgcGFyc2VFcnJvclRvU3RhY2tzID0gZnVuY3Rpb24gcGFyc2VFcnJvclRvU3RhY2tzKGVycm9yKSB7XG4gIGlmICghZXJyb3IgfHwgIShlcnJvciBpbnN0YW5jZW9mIEVycm9yKSkge1xuICAgIHRocm93IG5ldyBFcnJvcihcInBhcnNlRXJyb3JUb1N0YWNrcyBleHBlY3RzIEVycm9yIG9iamVjdFwiKTtcbiAgfVxuICBpZiAodHlwZW9mIGVycm9yLnN0YWNrID09PSBcInN0cmluZ1wiKSB7XG4gICAgcmV0dXJuIGVycm9yLnN0YWNrLnNwbGl0KFwiXFxuXCIpLmZpbHRlcihmdW5jdGlvbiAoc3RhY2spIHtcbiAgICAgIHJldHVybiBzdGFjayAhPT0gXCJFcnJvcjogXCIuY29uY2F0KGVycm9yLm1lc3NhZ2UpO1xuICAgIH0pO1xuICB9XG59O1xuXG4vKipcbiAqIEBjYWxsYmFjayBFcnJvckNhbGxiYWNrXG4gKiBAcGFyYW0ge0Vycm9yRXZlbnR9IGVycm9yXG4gKiBAcmV0dXJucyB7dm9pZH1cbiAqL1xuXG4vKipcbiAqIEBwYXJhbSB7RXJyb3JDYWxsYmFja30gY2FsbGJhY2tcbiAqL1xudmFyIGxpc3RlblRvUnVudGltZUVycm9yID0gZnVuY3Rpb24gbGlzdGVuVG9SdW50aW1lRXJyb3IoY2FsbGJhY2spIHtcbiAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJlcnJvclwiLCBjYWxsYmFjayk7XG4gIHJldHVybiBmdW5jdGlvbiBjbGVhbnVwKCkge1xuICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwiZXJyb3JcIiwgY2FsbGJhY2spO1xuICB9O1xufTtcblxuLyoqXG4gKiBAY2FsbGJhY2sgVW5oYW5kbGVkUmVqZWN0aW9uQ2FsbGJhY2tcbiAqIEBwYXJhbSB7UHJvbWlzZVJlamVjdGlvbkV2ZW50fSByZWplY3Rpb25FdmVudFxuICogQHJldHVybnMge3ZvaWR9XG4gKi9cblxuLyoqXG4gKiBAcGFyYW0ge1VuaGFuZGxlZFJlamVjdGlvbkNhbGxiYWNrfSBjYWxsYmFja1xuICovXG52YXIgbGlzdGVuVG9VbmhhbmRsZWRSZWplY3Rpb24gPSBmdW5jdGlvbiBsaXN0ZW5Ub1VuaGFuZGxlZFJlamVjdGlvbihjYWxsYmFjaykge1xuICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInVuaGFuZGxlZHJlamVjdGlvblwiLCBjYWxsYmFjayk7XG4gIHJldHVybiBmdW5jdGlvbiBjbGVhbnVwKCkge1xuICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwidW5oYW5kbGVkcmVqZWN0aW9uXCIsIGNhbGxiYWNrKTtcbiAgfTtcbn07XG5cbi8vIFN0eWxlcyBhcmUgaW5zcGlyZWQgYnkgYHJlYWN0LWVycm9yLW92ZXJsYXlgXG5cbnZhciBtc2dTdHlsZXMgPSB7XG4gIGVycm9yOiB7XG4gICAgYmFja2dyb3VuZENvbG9yOiBcInJnYmEoMjA2LCAxNywgMzgsIDAuMSlcIixcbiAgICBjb2xvcjogXCIjZmNjZmNmXCJcbiAgfSxcbiAgd2FybmluZzoge1xuICAgIGJhY2tncm91bmRDb2xvcjogXCJyZ2JhKDI1MSwgMjQ1LCAxODAsIDAuMSlcIixcbiAgICBjb2xvcjogXCIjZmJmNWI0XCJcbiAgfVxufTtcbnZhciBpZnJhbWVTdHlsZSA9IHtcbiAgcG9zaXRpb246IFwiZml4ZWRcIixcbiAgdG9wOiAwLFxuICBsZWZ0OiAwLFxuICByaWdodDogMCxcbiAgYm90dG9tOiAwLFxuICB3aWR0aDogXCIxMDB2d1wiLFxuICBoZWlnaHQ6IFwiMTAwdmhcIixcbiAgYm9yZGVyOiBcIm5vbmVcIixcbiAgXCJ6LWluZGV4XCI6IDk5OTk5OTk5OTlcbn07XG52YXIgY29udGFpbmVyU3R5bGUgPSB7XG4gIHBvc2l0aW9uOiBcImZpeGVkXCIsXG4gIGJveFNpemluZzogXCJib3JkZXItYm94XCIsXG4gIGxlZnQ6IDAsXG4gIHRvcDogMCxcbiAgcmlnaHQ6IDAsXG4gIGJvdHRvbTogMCxcbiAgd2lkdGg6IFwiMTAwdndcIixcbiAgaGVpZ2h0OiBcIjEwMHZoXCIsXG4gIGZvbnRTaXplOiBcImxhcmdlXCIsXG4gIHBhZGRpbmc6IFwiMnJlbSAycmVtIDRyZW0gMnJlbVwiLFxuICBsaW5lSGVpZ2h0OiBcIjEuMlwiLFxuICB3aGl0ZVNwYWNlOiBcInByZS13cmFwXCIsXG4gIG92ZXJmbG93OiBcImF1dG9cIixcbiAgYmFja2dyb3VuZENvbG9yOiBcInJnYmEoMCwgMCwgMCwgMC45KVwiLFxuICBjb2xvcjogXCJ3aGl0ZVwiXG59O1xudmFyIGhlYWRlclN0eWxlID0ge1xuICBjb2xvcjogXCIjZTgzYjQ2XCIsXG4gIGZvbnRTaXplOiBcIjJlbVwiLFxuICB3aGl0ZVNwYWNlOiBcInByZS13cmFwXCIsXG4gIGZvbnRGYW1pbHk6IFwic2Fucy1zZXJpZlwiLFxuICBtYXJnaW46IFwiMCAycmVtIDJyZW0gMFwiLFxuICBmbGV4OiBcIjAgMCBhdXRvXCIsXG4gIG1heEhlaWdodDogXCI1MCVcIixcbiAgb3ZlcmZsb3c6IFwiYXV0b1wiXG59O1xudmFyIGRpc21pc3NCdXR0b25TdHlsZSA9IHtcbiAgY29sb3I6IFwiI2ZmZmZmZlwiLFxuICBsaW5lSGVpZ2h0OiBcIjFyZW1cIixcbiAgZm9udFNpemU6IFwiMS41cmVtXCIsXG4gIHBhZGRpbmc6IFwiMXJlbVwiLFxuICBjdXJzb3I6IFwicG9pbnRlclwiLFxuICBwb3NpdGlvbjogXCJhYnNvbHV0ZVwiLFxuICByaWdodDogMCxcbiAgdG9wOiAwLFxuICBiYWNrZ3JvdW5kQ29sb3I6IFwidHJhbnNwYXJlbnRcIixcbiAgYm9yZGVyOiBcIm5vbmVcIlxufTtcbnZhciBtc2dUeXBlU3R5bGUgPSB7XG4gIGNvbG9yOiBcIiNlODNiNDZcIixcbiAgZm9udFNpemU6IFwiMS4yZW1cIixcbiAgbWFyZ2luQm90dG9tOiBcIjFyZW1cIixcbiAgZm9udEZhbWlseTogXCJzYW5zLXNlcmlmXCJcbn07XG52YXIgbXNnVGV4dFN0eWxlID0ge1xuICBsaW5lSGVpZ2h0OiBcIjEuNVwiLFxuICBmb250U2l6ZTogXCIxcmVtXCIsXG4gIGZvbnRGYW1pbHk6IFwiTWVubG8sIENvbnNvbGFzLCBtb25vc3BhY2VcIlxufTtcblxuLy8gQU5TSSBIVE1MXG5cbnZhciBjb2xvcnMgPSB7XG4gIHJlc2V0OiBbXCJ0cmFuc3BhcmVudFwiLCBcInRyYW5zcGFyZW50XCJdLFxuICBibGFjazogXCIxODE4MThcIixcbiAgcmVkOiBcIkUzNjA0OVwiLFxuICBncmVlbjogXCJCM0NCNzRcIixcbiAgeWVsbG93OiBcIkZGRDA4MFwiLFxuICBibHVlOiBcIjdDQUZDMlwiLFxuICBtYWdlbnRhOiBcIjdGQUNDQVwiLFxuICBjeWFuOiBcIkMzQzJFRlwiLFxuICBsaWdodGdyZXk6IFwiRUJFN0UzXCIsXG4gIGRhcmtncmV5OiBcIjZENzg5MVwiXG59O1xuYW5zaUhUTUwuc2V0Q29sb3JzKGNvbG9ycyk7XG5cbi8qKlxuICogQHBhcmFtIHtzdHJpbmd9IHR5cGVcbiAqIEBwYXJhbSB7c3RyaW5nICB8IHsgZmlsZT86IHN0cmluZywgbW9kdWxlTmFtZT86IHN0cmluZywgbG9jPzogc3RyaW5nLCBtZXNzYWdlPzogc3RyaW5nOyBzdGFjaz86IHN0cmluZ1tdIH19IGl0ZW1cbiAqIEByZXR1cm5zIHt7IGhlYWRlcjogc3RyaW5nLCBib2R5OiBzdHJpbmcgfX1cbiAqL1xudmFyIGZvcm1hdFByb2JsZW0gPSBmdW5jdGlvbiBmb3JtYXRQcm9ibGVtKHR5cGUsIGl0ZW0pIHtcbiAgdmFyIGhlYWRlciA9IHR5cGUgPT09IFwid2FybmluZ1wiID8gXCJXQVJOSU5HXCIgOiBcIkVSUk9SXCI7XG4gIHZhciBib2R5ID0gXCJcIjtcbiAgaWYgKHR5cGVvZiBpdGVtID09PSBcInN0cmluZ1wiKSB7XG4gICAgYm9keSArPSBpdGVtO1xuICB9IGVsc2Uge1xuICAgIHZhciBmaWxlID0gaXRlbS5maWxlIHx8IFwiXCI7XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLW5lc3RlZC10ZXJuYXJ5XG4gICAgdmFyIG1vZHVsZU5hbWUgPSBpdGVtLm1vZHVsZU5hbWUgPyBpdGVtLm1vZHVsZU5hbWUuaW5kZXhPZihcIiFcIikgIT09IC0xID8gXCJcIi5jb25jYXQoaXRlbS5tb2R1bGVOYW1lLnJlcGxhY2UoL14oXFxzfFxcUykqIS8sIFwiXCIpLCBcIiAoXCIpLmNvbmNhdChpdGVtLm1vZHVsZU5hbWUsIFwiKVwiKSA6IFwiXCIuY29uY2F0KGl0ZW0ubW9kdWxlTmFtZSkgOiBcIlwiO1xuICAgIHZhciBsb2MgPSBpdGVtLmxvYztcbiAgICBoZWFkZXIgKz0gXCJcIi5jb25jYXQobW9kdWxlTmFtZSB8fCBmaWxlID8gXCIgaW4gXCIuY29uY2F0KG1vZHVsZU5hbWUgPyBcIlwiLmNvbmNhdChtb2R1bGVOYW1lKS5jb25jYXQoZmlsZSA/IFwiIChcIi5jb25jYXQoZmlsZSwgXCIpXCIpIDogXCJcIikgOiBmaWxlKS5jb25jYXQobG9jID8gXCIgXCIuY29uY2F0KGxvYykgOiBcIlwiKSA6IFwiXCIpO1xuICAgIGJvZHkgKz0gaXRlbS5tZXNzYWdlIHx8IFwiXCI7XG4gIH1cbiAgaWYgKEFycmF5LmlzQXJyYXkoaXRlbS5zdGFjaykpIHtcbiAgICBpdGVtLnN0YWNrLmZvckVhY2goZnVuY3Rpb24gKHN0YWNrKSB7XG4gICAgICBpZiAodHlwZW9mIHN0YWNrID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgIGJvZHkgKz0gXCJcXHJcXG5cIi5jb25jYXQoc3RhY2spO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG4gIHJldHVybiB7XG4gICAgaGVhZGVyOiBoZWFkZXIsXG4gICAgYm9keTogYm9keVxuICB9O1xufTtcblxuLyoqXG4gKiBAdHlwZWRlZiB7T2JqZWN0fSBDcmVhdGVPdmVybGF5T3B0aW9uc1xuICogQHByb3BlcnR5IHtzdHJpbmcgfCBudWxsfSB0cnVzdGVkVHlwZXNQb2xpY3lOYW1lXG4gKiBAcHJvcGVydHkge2Jvb2xlYW4gfCAoZXJyb3I6IEVycm9yKSA9PiB2b2lkfSBbY2F0Y2hSdW50aW1lRXJyb3JdXG4gKi9cblxuLyoqXG4gKlxuICogQHBhcmFtIHtDcmVhdGVPdmVybGF5T3B0aW9uc30gb3B0aW9uc1xuICovXG52YXIgY3JlYXRlT3ZlcmxheSA9IGZ1bmN0aW9uIGNyZWF0ZU92ZXJsYXkob3B0aW9ucykge1xuICAvKiogQHR5cGUge0hUTUxJRnJhbWVFbGVtZW50IHwgbnVsbCB8IHVuZGVmaW5lZH0gKi9cbiAgdmFyIGlmcmFtZUNvbnRhaW5lckVsZW1lbnQ7XG4gIC8qKiBAdHlwZSB7SFRNTERpdkVsZW1lbnQgfCBudWxsIHwgdW5kZWZpbmVkfSAqL1xuICB2YXIgY29udGFpbmVyRWxlbWVudDtcbiAgLyoqIEB0eXBlIHtIVE1MRGl2RWxlbWVudCB8IG51bGwgfCB1bmRlZmluZWR9ICovXG4gIHZhciBoZWFkZXJFbGVtZW50O1xuICAvKiogQHR5cGUge0FycmF5PChlbGVtZW50OiBIVE1MRGl2RWxlbWVudCkgPT4gdm9pZD59ICovXG4gIHZhciBvbkxvYWRRdWV1ZSA9IFtdO1xuICAvKiogQHR5cGUge1RydXN0ZWRUeXBlUG9saWN5IHwgdW5kZWZpbmVkfSAqL1xuICB2YXIgb3ZlcmxheVRydXN0ZWRUeXBlc1BvbGljeTtcblxuICAvKipcbiAgICpcbiAgICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxlbWVudFxuICAgKiBAcGFyYW0ge0NTU1N0eWxlRGVjbGFyYXRpb259IHN0eWxlXG4gICAqL1xuICBmdW5jdGlvbiBhcHBseVN0eWxlKGVsZW1lbnQsIHN0eWxlKSB7XG4gICAgT2JqZWN0LmtleXMoc3R5bGUpLmZvckVhY2goZnVuY3Rpb24gKHByb3ApIHtcbiAgICAgIGVsZW1lbnQuc3R5bGVbcHJvcF0gPSBzdHlsZVtwcm9wXTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge3N0cmluZyB8IG51bGx9IHRydXN0ZWRUeXBlc1BvbGljeU5hbWVcbiAgICovXG4gIGZ1bmN0aW9uIGNyZWF0ZUNvbnRhaW5lcih0cnVzdGVkVHlwZXNQb2xpY3lOYW1lKSB7XG4gICAgLy8gRW5hYmxlIFRydXN0ZWQgVHlwZXMgaWYgdGhleSBhcmUgYXZhaWxhYmxlIGluIHRoZSBjdXJyZW50IGJyb3dzZXIuXG4gICAgaWYgKHdpbmRvdy50cnVzdGVkVHlwZXMpIHtcbiAgICAgIG92ZXJsYXlUcnVzdGVkVHlwZXNQb2xpY3kgPSB3aW5kb3cudHJ1c3RlZFR5cGVzLmNyZWF0ZVBvbGljeSh0cnVzdGVkVHlwZXNQb2xpY3lOYW1lIHx8IFwid2VicGFjay1kZXYtc2VydmVyI292ZXJsYXlcIiwge1xuICAgICAgICBjcmVhdGVIVE1MOiBmdW5jdGlvbiBjcmVhdGVIVE1MKHZhbHVlKSB7XG4gICAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gICAgaWZyYW1lQ29udGFpbmVyRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpZnJhbWVcIik7XG4gICAgaWZyYW1lQ29udGFpbmVyRWxlbWVudC5pZCA9IFwid2VicGFjay1kZXYtc2VydmVyLWNsaWVudC1vdmVybGF5XCI7XG4gICAgaWZyYW1lQ29udGFpbmVyRWxlbWVudC5zcmMgPSBcImFib3V0OmJsYW5rXCI7XG4gICAgYXBwbHlTdHlsZShpZnJhbWVDb250YWluZXJFbGVtZW50LCBpZnJhbWVTdHlsZSk7XG4gICAgaWZyYW1lQ29udGFpbmVyRWxlbWVudC5vbmxvYWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgY29udGVudEVsZW1lbnQgPSAvKiogQHR5cGUge0RvY3VtZW50fSAqL1xuICAgICAgKC8qKiBAdHlwZSB7SFRNTElGcmFtZUVsZW1lbnR9ICovXG4gICAgICBpZnJhbWVDb250YWluZXJFbGVtZW50LmNvbnRlbnREb2N1bWVudCkuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgIGNvbnRhaW5lckVsZW1lbnQgPSAvKiogQHR5cGUge0RvY3VtZW50fSAqL1xuICAgICAgKC8qKiBAdHlwZSB7SFRNTElGcmFtZUVsZW1lbnR9ICovXG4gICAgICBpZnJhbWVDb250YWluZXJFbGVtZW50LmNvbnRlbnREb2N1bWVudCkuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgIGNvbnRlbnRFbGVtZW50LmlkID0gXCJ3ZWJwYWNrLWRldi1zZXJ2ZXItY2xpZW50LW92ZXJsYXktZGl2XCI7XG4gICAgICBhcHBseVN0eWxlKGNvbnRlbnRFbGVtZW50LCBjb250YWluZXJTdHlsZSk7XG4gICAgICBoZWFkZXJFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgIGhlYWRlckVsZW1lbnQuaW5uZXJUZXh0ID0gXCJDb21waWxlZCB3aXRoIHByb2JsZW1zOlwiO1xuICAgICAgYXBwbHlTdHlsZShoZWFkZXJFbGVtZW50LCBoZWFkZXJTdHlsZSk7XG4gICAgICB2YXIgY2xvc2VCdXR0b25FbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgICAgIGFwcGx5U3R5bGUoY2xvc2VCdXR0b25FbGVtZW50LCBkaXNtaXNzQnV0dG9uU3R5bGUpO1xuICAgICAgY2xvc2VCdXR0b25FbGVtZW50LmlubmVyVGV4dCA9IFwiw5dcIjtcbiAgICAgIGNsb3NlQnV0dG9uRWxlbWVudC5hcmlhTGFiZWwgPSBcIkRpc21pc3NcIjtcbiAgICAgIGNsb3NlQnV0dG9uRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdXNlLWJlZm9yZS1kZWZpbmVcbiAgICAgICAgb3ZlcmxheVNlcnZpY2Uuc2VuZCh7XG4gICAgICAgICAgdHlwZTogXCJESVNNSVNTXCJcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICAgIGNvbnRlbnRFbGVtZW50LmFwcGVuZENoaWxkKGhlYWRlckVsZW1lbnQpO1xuICAgICAgY29udGVudEVsZW1lbnQuYXBwZW5kQ2hpbGQoY2xvc2VCdXR0b25FbGVtZW50KTtcbiAgICAgIGNvbnRlbnRFbGVtZW50LmFwcGVuZENoaWxkKGNvbnRhaW5lckVsZW1lbnQpO1xuXG4gICAgICAvKiogQHR5cGUge0RvY3VtZW50fSAqL1xuICAgICAgKC8qKiBAdHlwZSB7SFRNTElGcmFtZUVsZW1lbnR9ICovXG4gICAgICBpZnJhbWVDb250YWluZXJFbGVtZW50LmNvbnRlbnREb2N1bWVudCkuYm9keS5hcHBlbmRDaGlsZChjb250ZW50RWxlbWVudCk7XG4gICAgICBvbkxvYWRRdWV1ZS5mb3JFYWNoKGZ1bmN0aW9uIChvbkxvYWQpIHtcbiAgICAgICAgb25Mb2FkKC8qKiBAdHlwZSB7SFRNTERpdkVsZW1lbnR9ICovY29udGVudEVsZW1lbnQpO1xuICAgICAgfSk7XG4gICAgICBvbkxvYWRRdWV1ZSA9IFtdO1xuXG4gICAgICAvKiogQHR5cGUge0hUTUxJRnJhbWVFbGVtZW50fSAqL1xuICAgICAgaWZyYW1lQ29udGFpbmVyRWxlbWVudC5vbmxvYWQgPSBudWxsO1xuICAgIH07XG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChpZnJhbWVDb250YWluZXJFbGVtZW50KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0geyhlbGVtZW50OiBIVE1MRGl2RWxlbWVudCkgPT4gdm9pZH0gY2FsbGJhY2tcbiAgICogQHBhcmFtIHtzdHJpbmcgfCBudWxsfSB0cnVzdGVkVHlwZXNQb2xpY3lOYW1lXG4gICAqL1xuICBmdW5jdGlvbiBlbnN1cmVPdmVybGF5RXhpc3RzKGNhbGxiYWNrLCB0cnVzdGVkVHlwZXNQb2xpY3lOYW1lKSB7XG4gICAgaWYgKGNvbnRhaW5lckVsZW1lbnQpIHtcbiAgICAgIGNvbnRhaW5lckVsZW1lbnQuaW5uZXJIVE1MID0gb3ZlcmxheVRydXN0ZWRUeXBlc1BvbGljeSA/IG92ZXJsYXlUcnVzdGVkVHlwZXNQb2xpY3kuY3JlYXRlSFRNTChcIlwiKSA6IFwiXCI7XG4gICAgICAvLyBFdmVyeXRoaW5nIGlzIHJlYWR5LCBjYWxsIHRoZSBjYWxsYmFjayByaWdodCBhd2F5LlxuICAgICAgY2FsbGJhY2soY29udGFpbmVyRWxlbWVudCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIG9uTG9hZFF1ZXVlLnB1c2goY2FsbGJhY2spO1xuICAgIGlmIChpZnJhbWVDb250YWluZXJFbGVtZW50KSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNyZWF0ZUNvbnRhaW5lcih0cnVzdGVkVHlwZXNQb2xpY3lOYW1lKTtcbiAgfVxuXG4gIC8vIFN1Y2Nlc3NmdWwgY29tcGlsYXRpb24uXG4gIGZ1bmN0aW9uIGhpZGUoKSB7XG4gICAgaWYgKCFpZnJhbWVDb250YWluZXJFbGVtZW50KSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gQ2xlYW4gdXAgYW5kIHJlc2V0IGludGVybmFsIHN0YXRlLlxuICAgIGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQoaWZyYW1lQ29udGFpbmVyRWxlbWVudCk7XG4gICAgaWZyYW1lQ29udGFpbmVyRWxlbWVudCA9IG51bGw7XG4gICAgY29udGFpbmVyRWxlbWVudCA9IG51bGw7XG4gIH1cblxuICAvLyBDb21waWxhdGlvbiB3aXRoIGVycm9ycyAoZS5nLiBzeW50YXggZXJyb3Igb3IgbWlzc2luZyBtb2R1bGVzKS5cbiAgLyoqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSB0eXBlXG4gICAqIEBwYXJhbSB7QXJyYXk8c3RyaW5nICB8IHsgbW9kdWxlSWRlbnRpZmllcj86IHN0cmluZywgbW9kdWxlTmFtZT86IHN0cmluZywgbG9jPzogc3RyaW5nLCBtZXNzYWdlPzogc3RyaW5nIH0+fSBtZXNzYWdlc1xuICAgKiBAcGFyYW0ge3N0cmluZyB8IG51bGx9IHRydXN0ZWRUeXBlc1BvbGljeU5hbWVcbiAgICogQHBhcmFtIHsnYnVpbGQnIHwgJ3J1bnRpbWUnfSBtZXNzYWdlU291cmNlXG4gICAqL1xuICBmdW5jdGlvbiBzaG93KHR5cGUsIG1lc3NhZ2VzLCB0cnVzdGVkVHlwZXNQb2xpY3lOYW1lLCBtZXNzYWdlU291cmNlKSB7XG4gICAgZW5zdXJlT3ZlcmxheUV4aXN0cyhmdW5jdGlvbiAoKSB7XG4gICAgICBoZWFkZXJFbGVtZW50LmlubmVyVGV4dCA9IG1lc3NhZ2VTb3VyY2UgPT09IFwicnVudGltZVwiID8gXCJVbmNhdWdodCBydW50aW1lIGVycm9yczpcIiA6IFwiQ29tcGlsZWQgd2l0aCBwcm9ibGVtczpcIjtcbiAgICAgIG1lc3NhZ2VzLmZvckVhY2goZnVuY3Rpb24gKG1lc3NhZ2UpIHtcbiAgICAgICAgdmFyIGVudHJ5RWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgIHZhciBtc2dTdHlsZSA9IHR5cGUgPT09IFwid2FybmluZ1wiID8gbXNnU3R5bGVzLndhcm5pbmcgOiBtc2dTdHlsZXMuZXJyb3I7XG4gICAgICAgIGFwcGx5U3R5bGUoZW50cnlFbGVtZW50LCBfb2JqZWN0U3ByZWFkKF9vYmplY3RTcHJlYWQoe30sIG1zZ1N0eWxlKSwge30sIHtcbiAgICAgICAgICBwYWRkaW5nOiBcIjFyZW0gMXJlbSAxLjVyZW0gMXJlbVwiXG4gICAgICAgIH0pKTtcbiAgICAgICAgdmFyIHR5cGVFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgdmFyIF9mb3JtYXRQcm9ibGVtID0gZm9ybWF0UHJvYmxlbSh0eXBlLCBtZXNzYWdlKSxcbiAgICAgICAgICBoZWFkZXIgPSBfZm9ybWF0UHJvYmxlbS5oZWFkZXIsXG4gICAgICAgICAgYm9keSA9IF9mb3JtYXRQcm9ibGVtLmJvZHk7XG4gICAgICAgIHR5cGVFbGVtZW50LmlubmVyVGV4dCA9IGhlYWRlcjtcbiAgICAgICAgYXBwbHlTdHlsZSh0eXBlRWxlbWVudCwgbXNnVHlwZVN0eWxlKTtcbiAgICAgICAgaWYgKG1lc3NhZ2UubW9kdWxlSWRlbnRpZmllcikge1xuICAgICAgICAgIGFwcGx5U3R5bGUodHlwZUVsZW1lbnQsIHtcbiAgICAgICAgICAgIGN1cnNvcjogXCJwb2ludGVyXCJcbiAgICAgICAgICB9KTtcbiAgICAgICAgICAvLyBlbGVtZW50LmRhdGFzZXQgbm90IHN1cHBvcnRlZCBpbiBJRVxuICAgICAgICAgIHR5cGVFbGVtZW50LnNldEF0dHJpYnV0ZShcImRhdGEtY2FuLW9wZW5cIiwgdHJ1ZSk7XG4gICAgICAgICAgdHlwZUVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGZldGNoKFwiL3dlYnBhY2stZGV2LXNlcnZlci9vcGVuLWVkaXRvcj9maWxlTmFtZT1cIi5jb25jYXQobWVzc2FnZS5tb2R1bGVJZGVudGlmaWVyKSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBNYWtlIGl0IGxvb2sgc2ltaWxhciB0byBvdXIgdGVybWluYWwuXG4gICAgICAgIHZhciB0ZXh0ID0gYW5zaUhUTUwoZW5jb2RlKGJvZHkpKTtcbiAgICAgICAgdmFyIG1lc3NhZ2VUZXh0Tm9kZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgIGFwcGx5U3R5bGUobWVzc2FnZVRleHROb2RlLCBtc2dUZXh0U3R5bGUpO1xuICAgICAgICBtZXNzYWdlVGV4dE5vZGUuaW5uZXJIVE1MID0gb3ZlcmxheVRydXN0ZWRUeXBlc1BvbGljeSA/IG92ZXJsYXlUcnVzdGVkVHlwZXNQb2xpY3kuY3JlYXRlSFRNTCh0ZXh0KSA6IHRleHQ7XG4gICAgICAgIGVudHJ5RWxlbWVudC5hcHBlbmRDaGlsZCh0eXBlRWxlbWVudCk7XG4gICAgICAgIGVudHJ5RWxlbWVudC5hcHBlbmRDaGlsZChtZXNzYWdlVGV4dE5vZGUpO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7SFRNTERpdkVsZW1lbnR9ICovXG4gICAgICAgIGNvbnRhaW5lckVsZW1lbnQuYXBwZW5kQ2hpbGQoZW50cnlFbGVtZW50KTtcbiAgICAgIH0pO1xuICAgIH0sIHRydXN0ZWRUeXBlc1BvbGljeU5hbWUpO1xuICB9XG4gIHZhciBvdmVybGF5U2VydmljZSA9IGNyZWF0ZU92ZXJsYXlNYWNoaW5lKHtcbiAgICBzaG93T3ZlcmxheTogZnVuY3Rpb24gc2hvd092ZXJsYXkoX3JlZjMpIHtcbiAgICAgIHZhciBfcmVmMyRsZXZlbCA9IF9yZWYzLmxldmVsLFxuICAgICAgICBsZXZlbCA9IF9yZWYzJGxldmVsID09PSB2b2lkIDAgPyBcImVycm9yXCIgOiBfcmVmMyRsZXZlbCxcbiAgICAgICAgbWVzc2FnZXMgPSBfcmVmMy5tZXNzYWdlcyxcbiAgICAgICAgbWVzc2FnZVNvdXJjZSA9IF9yZWYzLm1lc3NhZ2VTb3VyY2U7XG4gICAgICByZXR1cm4gc2hvdyhsZXZlbCwgbWVzc2FnZXMsIG9wdGlvbnMudHJ1c3RlZFR5cGVzUG9saWN5TmFtZSwgbWVzc2FnZVNvdXJjZSk7XG4gICAgfSxcbiAgICBoaWRlT3ZlcmxheTogaGlkZVxuICB9KTtcbiAgaWYgKG9wdGlvbnMuY2F0Y2hSdW50aW1lRXJyb3IpIHtcbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge0Vycm9yIHwgdW5kZWZpbmVkfSBlcnJvclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBmYWxsYmFja01lc3NhZ2VcbiAgICAgKi9cbiAgICB2YXIgaGFuZGxlRXJyb3IgPSBmdW5jdGlvbiBoYW5kbGVFcnJvcihlcnJvciwgZmFsbGJhY2tNZXNzYWdlKSB7XG4gICAgICB2YXIgZXJyb3JPYmplY3QgPSBlcnJvciBpbnN0YW5jZW9mIEVycm9yID8gZXJyb3IgOiBuZXcgRXJyb3IoZXJyb3IgfHwgZmFsbGJhY2tNZXNzYWdlKTtcbiAgICAgIHZhciBzaG91bGREaXNwbGF5ID0gdHlwZW9mIG9wdGlvbnMuY2F0Y2hSdW50aW1lRXJyb3IgPT09IFwiZnVuY3Rpb25cIiA/IG9wdGlvbnMuY2F0Y2hSdW50aW1lRXJyb3IoZXJyb3JPYmplY3QpIDogdHJ1ZTtcbiAgICAgIGlmIChzaG91bGREaXNwbGF5KSB7XG4gICAgICAgIG92ZXJsYXlTZXJ2aWNlLnNlbmQoe1xuICAgICAgICAgIHR5cGU6IFwiUlVOVElNRV9FUlJPUlwiLFxuICAgICAgICAgIG1lc3NhZ2VzOiBbe1xuICAgICAgICAgICAgbWVzc2FnZTogZXJyb3JPYmplY3QubWVzc2FnZSxcbiAgICAgICAgICAgIHN0YWNrOiBwYXJzZUVycm9yVG9TdGFja3MoZXJyb3JPYmplY3QpXG4gICAgICAgICAgfV1cbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfTtcbiAgICBsaXN0ZW5Ub1J1bnRpbWVFcnJvcihmdW5jdGlvbiAoZXJyb3JFdmVudCkge1xuICAgICAgLy8gZXJyb3IgcHJvcGVydHkgbWF5IGJlIGVtcHR5IGluIG9sZGVyIGJyb3dzZXIgbGlrZSBJRVxuICAgICAgdmFyIGVycm9yID0gZXJyb3JFdmVudC5lcnJvcixcbiAgICAgICAgbWVzc2FnZSA9IGVycm9yRXZlbnQubWVzc2FnZTtcbiAgICAgIGlmICghZXJyb3IgJiYgIW1lc3NhZ2UpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICAvLyBpZiBlcnJvciBzdGFjayBpbmRpY2F0ZXMgYSBSZWFjdCBlcnJvciBib3VuZGFyeSBjYXVnaHQgdGhlIGVycm9yLCBkbyBub3Qgc2hvdyBvdmVybGF5LlxuICAgICAgaWYgKGVycm9yICYmIGVycm9yLnN0YWNrICYmIGVycm9yLnN0YWNrLmluY2x1ZGVzKFwiaW52b2tlR3VhcmRlZENhbGxiYWNrRGV2XCIpKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGhhbmRsZUVycm9yKGVycm9yLCBtZXNzYWdlKTtcbiAgICB9KTtcbiAgICBsaXN0ZW5Ub1VuaGFuZGxlZFJlamVjdGlvbihmdW5jdGlvbiAocHJvbWlzZVJlamVjdGlvbkV2ZW50KSB7XG4gICAgICB2YXIgcmVhc29uID0gcHJvbWlzZVJlamVjdGlvbkV2ZW50LnJlYXNvbjtcbiAgICAgIGhhbmRsZUVycm9yKHJlYXNvbiwgXCJVbmtub3duIHByb21pc2UgcmVqZWN0aW9uIHJlYXNvblwiKTtcbiAgICB9KTtcbiAgfVxuICByZXR1cm4gb3ZlcmxheVNlcnZpY2U7XG59O1xuZXhwb3J0IHsgZm9ybWF0UHJvYmxlbSwgY3JlYXRlT3ZlcmxheSB9OyIsImZ1bmN0aW9uIF90eXBlb2YobykgeyBcIkBiYWJlbC9oZWxwZXJzIC0gdHlwZW9mXCI7IHJldHVybiBfdHlwZW9mID0gXCJmdW5jdGlvblwiID09IHR5cGVvZiBTeW1ib2wgJiYgXCJzeW1ib2xcIiA9PSB0eXBlb2YgU3ltYm9sLml0ZXJhdG9yID8gZnVuY3Rpb24gKG8pIHsgcmV0dXJuIHR5cGVvZiBvOyB9IDogZnVuY3Rpb24gKG8pIHsgcmV0dXJuIG8gJiYgXCJmdW5jdGlvblwiID09IHR5cGVvZiBTeW1ib2wgJiYgby5jb25zdHJ1Y3RvciA9PT0gU3ltYm9sICYmIG8gIT09IFN5bWJvbC5wcm90b3R5cGUgPyBcInN5bWJvbFwiIDogdHlwZW9mIG87IH0sIF90eXBlb2Yobyk7IH1cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhhLCBuKSB7IGlmICghKGEgaW5zdGFuY2VvZiBuKSkgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTsgfVxuZnVuY3Rpb24gX2RlZmluZVByb3BlcnRpZXMoZSwgcikgeyBmb3IgKHZhciB0ID0gMDsgdCA8IHIubGVuZ3RoOyB0KyspIHsgdmFyIG8gPSByW3RdOyBvLmVudW1lcmFibGUgPSBvLmVudW1lcmFibGUgfHwgITEsIG8uY29uZmlndXJhYmxlID0gITAsIFwidmFsdWVcIiBpbiBvICYmIChvLndyaXRhYmxlID0gITApLCBPYmplY3QuZGVmaW5lUHJvcGVydHkoZSwgX3RvUHJvcGVydHlLZXkoby5rZXkpLCBvKTsgfSB9XG5mdW5jdGlvbiBfY3JlYXRlQ2xhc3MoZSwgciwgdCkgeyByZXR1cm4gciAmJiBfZGVmaW5lUHJvcGVydGllcyhlLnByb3RvdHlwZSwgciksIHQgJiYgX2RlZmluZVByb3BlcnRpZXMoZSwgdCksIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShlLCBcInByb3RvdHlwZVwiLCB7IHdyaXRhYmxlOiAhMSB9KSwgZTsgfVxuZnVuY3Rpb24gX3RvUHJvcGVydHlLZXkodCkgeyB2YXIgaSA9IF90b1ByaW1pdGl2ZSh0LCBcInN0cmluZ1wiKTsgcmV0dXJuIFwic3ltYm9sXCIgPT0gX3R5cGVvZihpKSA/IGkgOiBpICsgXCJcIjsgfVxuZnVuY3Rpb24gX3RvUHJpbWl0aXZlKHQsIHIpIHsgaWYgKFwib2JqZWN0XCIgIT0gX3R5cGVvZih0KSB8fCAhdCkgcmV0dXJuIHQ7IHZhciBlID0gdFtTeW1ib2wudG9QcmltaXRpdmVdOyBpZiAodm9pZCAwICE9PSBlKSB7IHZhciBpID0gZS5jYWxsKHQsIHIgfHwgXCJkZWZhdWx0XCIpOyBpZiAoXCJvYmplY3RcIiAhPSBfdHlwZW9mKGkpKSByZXR1cm4gaTsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkBAdG9QcmltaXRpdmUgbXVzdCByZXR1cm4gYSBwcmltaXRpdmUgdmFsdWUuXCIpOyB9IHJldHVybiAoXCJzdHJpbmdcIiA9PT0gciA/IFN0cmluZyA6IE51bWJlcikodCk7IH1cbmZ1bmN0aW9uIF9jYWxsU3VwZXIodCwgbywgZSkgeyByZXR1cm4gbyA9IF9nZXRQcm90b3R5cGVPZihvKSwgX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4odCwgX2lzTmF0aXZlUmVmbGVjdENvbnN0cnVjdCgpID8gUmVmbGVjdC5jb25zdHJ1Y3QobywgZSB8fCBbXSwgX2dldFByb3RvdHlwZU9mKHQpLmNvbnN0cnVjdG9yKSA6IG8uYXBwbHkodCwgZSkpOyB9XG5mdW5jdGlvbiBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybih0LCBlKSB7IGlmIChlICYmIChcIm9iamVjdFwiID09IF90eXBlb2YoZSkgfHwgXCJmdW5jdGlvblwiID09IHR5cGVvZiBlKSkgcmV0dXJuIGU7IGlmICh2b2lkIDAgIT09IGUpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJEZXJpdmVkIGNvbnN0cnVjdG9ycyBtYXkgb25seSByZXR1cm4gb2JqZWN0IG9yIHVuZGVmaW5lZFwiKTsgcmV0dXJuIF9hc3NlcnRUaGlzSW5pdGlhbGl6ZWQodCk7IH1cbmZ1bmN0aW9uIF9hc3NlcnRUaGlzSW5pdGlhbGl6ZWQoZSkgeyBpZiAodm9pZCAwID09PSBlKSB0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3IoXCJ0aGlzIGhhc24ndCBiZWVuIGluaXRpYWxpc2VkIC0gc3VwZXIoKSBoYXNuJ3QgYmVlbiBjYWxsZWRcIik7IHJldHVybiBlOyB9XG5mdW5jdGlvbiBfaW5oZXJpdHModCwgZSkgeyBpZiAoXCJmdW5jdGlvblwiICE9IHR5cGVvZiBlICYmIG51bGwgIT09IGUpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTdXBlciBleHByZXNzaW9uIG11c3QgZWl0aGVyIGJlIG51bGwgb3IgYSBmdW5jdGlvblwiKTsgdC5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKGUgJiYgZS5wcm90b3R5cGUsIHsgY29uc3RydWN0b3I6IHsgdmFsdWU6IHQsIHdyaXRhYmxlOiAhMCwgY29uZmlndXJhYmxlOiAhMCB9IH0pLCBPYmplY3QuZGVmaW5lUHJvcGVydHkodCwgXCJwcm90b3R5cGVcIiwgeyB3cml0YWJsZTogITEgfSksIGUgJiYgX3NldFByb3RvdHlwZU9mKHQsIGUpOyB9XG5mdW5jdGlvbiBfd3JhcE5hdGl2ZVN1cGVyKHQpIHsgdmFyIHIgPSBcImZ1bmN0aW9uXCIgPT0gdHlwZW9mIE1hcCA/IG5ldyBNYXAoKSA6IHZvaWQgMDsgcmV0dXJuIF93cmFwTmF0aXZlU3VwZXIgPSBmdW5jdGlvbiBfd3JhcE5hdGl2ZVN1cGVyKHQpIHsgaWYgKG51bGwgPT09IHQgfHwgIV9pc05hdGl2ZUZ1bmN0aW9uKHQpKSByZXR1cm4gdDsgaWYgKFwiZnVuY3Rpb25cIiAhPSB0eXBlb2YgdCkgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN1cGVyIGV4cHJlc3Npb24gbXVzdCBlaXRoZXIgYmUgbnVsbCBvciBhIGZ1bmN0aW9uXCIpOyBpZiAodm9pZCAwICE9PSByKSB7IGlmIChyLmhhcyh0KSkgcmV0dXJuIHIuZ2V0KHQpOyByLnNldCh0LCBXcmFwcGVyKTsgfSBmdW5jdGlvbiBXcmFwcGVyKCkgeyByZXR1cm4gX2NvbnN0cnVjdCh0LCBhcmd1bWVudHMsIF9nZXRQcm90b3R5cGVPZih0aGlzKS5jb25zdHJ1Y3Rvcik7IH0gcmV0dXJuIFdyYXBwZXIucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZSh0LnByb3RvdHlwZSwgeyBjb25zdHJ1Y3RvcjogeyB2YWx1ZTogV3JhcHBlciwgZW51bWVyYWJsZTogITEsIHdyaXRhYmxlOiAhMCwgY29uZmlndXJhYmxlOiAhMCB9IH0pLCBfc2V0UHJvdG90eXBlT2YoV3JhcHBlciwgdCk7IH0sIF93cmFwTmF0aXZlU3VwZXIodCk7IH1cbmZ1bmN0aW9uIF9jb25zdHJ1Y3QodCwgZSwgcikgeyBpZiAoX2lzTmF0aXZlUmVmbGVjdENvbnN0cnVjdCgpKSByZXR1cm4gUmVmbGVjdC5jb25zdHJ1Y3QuYXBwbHkobnVsbCwgYXJndW1lbnRzKTsgdmFyIG8gPSBbbnVsbF07IG8ucHVzaC5hcHBseShvLCBlKTsgdmFyIHAgPSBuZXcgKHQuYmluZC5hcHBseSh0LCBvKSkoKTsgcmV0dXJuIHIgJiYgX3NldFByb3RvdHlwZU9mKHAsIHIucHJvdG90eXBlKSwgcDsgfVxuZnVuY3Rpb24gX2lzTmF0aXZlUmVmbGVjdENvbnN0cnVjdCgpIHsgdHJ5IHsgdmFyIHQgPSAhQm9vbGVhbi5wcm90b3R5cGUudmFsdWVPZi5jYWxsKFJlZmxlY3QuY29uc3RydWN0KEJvb2xlYW4sIFtdLCBmdW5jdGlvbiAoKSB7fSkpOyB9IGNhdGNoICh0KSB7fSByZXR1cm4gKF9pc05hdGl2ZVJlZmxlY3RDb25zdHJ1Y3QgPSBmdW5jdGlvbiBfaXNOYXRpdmVSZWZsZWN0Q29uc3RydWN0KCkgeyByZXR1cm4gISF0OyB9KSgpOyB9XG5mdW5jdGlvbiBfaXNOYXRpdmVGdW5jdGlvbih0KSB7IHRyeSB7IHJldHVybiAtMSAhPT0gRnVuY3Rpb24udG9TdHJpbmcuY2FsbCh0KS5pbmRleE9mKFwiW25hdGl2ZSBjb2RlXVwiKTsgfSBjYXRjaCAobikgeyByZXR1cm4gXCJmdW5jdGlvblwiID09IHR5cGVvZiB0OyB9IH1cbmZ1bmN0aW9uIF9zZXRQcm90b3R5cGVPZih0LCBlKSB7IHJldHVybiBfc2V0UHJvdG90eXBlT2YgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgPyBPYmplY3Quc2V0UHJvdG90eXBlT2YuYmluZCgpIDogZnVuY3Rpb24gKHQsIGUpIHsgcmV0dXJuIHQuX19wcm90b19fID0gZSwgdDsgfSwgX3NldFByb3RvdHlwZU9mKHQsIGUpOyB9XG5mdW5jdGlvbiBfZ2V0UHJvdG90eXBlT2YodCkgeyByZXR1cm4gX2dldFByb3RvdHlwZU9mID0gT2JqZWN0LnNldFByb3RvdHlwZU9mID8gT2JqZWN0LmdldFByb3RvdHlwZU9mLmJpbmQoKSA6IGZ1bmN0aW9uICh0KSB7IHJldHVybiB0Ll9fcHJvdG9fXyB8fCBPYmplY3QuZ2V0UHJvdG90eXBlT2YodCk7IH0sIF9nZXRQcm90b3R5cGVPZih0KTsgfVxuZnVuY3Rpb24gX2NsYXNzUHJpdmF0ZU1ldGhvZEluaXRTcGVjKGUsIGEpIHsgX2NoZWNrUHJpdmF0ZVJlZGVjbGFyYXRpb24oZSwgYSksIGEuYWRkKGUpOyB9XG5mdW5jdGlvbiBfY2hlY2tQcml2YXRlUmVkZWNsYXJhdGlvbihlLCB0KSB7IGlmICh0LmhhcyhlKSkgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBpbml0aWFsaXplIHRoZSBzYW1lIHByaXZhdGUgZWxlbWVudHMgdHdpY2Ugb24gYW4gb2JqZWN0XCIpOyB9XG5mdW5jdGlvbiBfYXNzZXJ0Q2xhc3NCcmFuZChlLCB0LCBuKSB7IGlmIChcImZ1bmN0aW9uXCIgPT0gdHlwZW9mIGUgPyBlID09PSB0IDogZS5oYXModCkpIHJldHVybiBhcmd1bWVudHMubGVuZ3RoIDwgMyA/IHQgOiBuOyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiUHJpdmF0ZSBlbGVtZW50IGlzIG5vdCBwcmVzZW50IG9uIHRoaXMgb2JqZWN0XCIpOyB9XG5leHBvcnQgZnVuY3Rpb24gaXNQcm9ncmVzc1N1cHBvcnRlZCgpIHtcbiAgcmV0dXJuIFwiY3VzdG9tRWxlbWVudHNcIiBpbiBzZWxmICYmICEhSFRNTEVsZW1lbnQucHJvdG90eXBlLmF0dGFjaFNoYWRvdztcbn1cbmV4cG9ydCBmdW5jdGlvbiBkZWZpbmVQcm9ncmVzc0VsZW1lbnQoKSB7XG4gIHZhciBfV2VicGFja0RldlNlcnZlclByb2dyZXNzO1xuICBpZiAoY3VzdG9tRWxlbWVudHMuZ2V0KFwid2RzLXByb2dyZXNzXCIpKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIHZhciBfV2VicGFja0RldlNlcnZlclByb2dyZXNzX2JyYW5kID0gLyojX19QVVJFX18qL25ldyBXZWFrU2V0KCk7XG4gIHZhciBXZWJwYWNrRGV2U2VydmVyUHJvZ3Jlc3MgPSAvKiNfX1BVUkVfXyovZnVuY3Rpb24gKF9IVE1MRWxlbWVudCkge1xuICAgIGZ1bmN0aW9uIFdlYnBhY2tEZXZTZXJ2ZXJQcm9ncmVzcygpIHtcbiAgICAgIHZhciBfdGhpcztcbiAgICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBXZWJwYWNrRGV2U2VydmVyUHJvZ3Jlc3MpO1xuICAgICAgX3RoaXMgPSBfY2FsbFN1cGVyKHRoaXMsIFdlYnBhY2tEZXZTZXJ2ZXJQcm9ncmVzcyk7XG4gICAgICBfY2xhc3NQcml2YXRlTWV0aG9kSW5pdFNwZWMoX3RoaXMsIF9XZWJwYWNrRGV2U2VydmVyUHJvZ3Jlc3NfYnJhbmQpO1xuICAgICAgX3RoaXMuYXR0YWNoU2hhZG93KHtcbiAgICAgICAgbW9kZTogXCJvcGVuXCJcbiAgICAgIH0pO1xuICAgICAgX3RoaXMubWF4RGFzaE9mZnNldCA9IC0yMTkuOTkwNzgzNjkxNDA2MjU7XG4gICAgICBfdGhpcy5hbmltYXRpb25UaW1lciA9IG51bGw7XG4gICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuICAgIF9pbmhlcml0cyhXZWJwYWNrRGV2U2VydmVyUHJvZ3Jlc3MsIF9IVE1MRWxlbWVudCk7XG4gICAgcmV0dXJuIF9jcmVhdGVDbGFzcyhXZWJwYWNrRGV2U2VydmVyUHJvZ3Jlc3MsIFt7XG4gICAgICBrZXk6IFwiY29ubmVjdGVkQ2FsbGJhY2tcIixcbiAgICAgIHZhbHVlOiBmdW5jdGlvbiBjb25uZWN0ZWRDYWxsYmFjaygpIHtcbiAgICAgICAgX2Fzc2VydENsYXNzQnJhbmQoX1dlYnBhY2tEZXZTZXJ2ZXJQcm9ncmVzc19icmFuZCwgdGhpcywgX3Jlc2V0KS5jYWxsKHRoaXMpO1xuICAgICAgfVxuICAgIH0sIHtcbiAgICAgIGtleTogXCJhdHRyaWJ1dGVDaGFuZ2VkQ2FsbGJhY2tcIixcbiAgICAgIHZhbHVlOiBmdW5jdGlvbiBhdHRyaWJ1dGVDaGFuZ2VkQ2FsbGJhY2sobmFtZSwgb2xkVmFsdWUsIG5ld1ZhbHVlKSB7XG4gICAgICAgIGlmIChuYW1lID09PSBcInByb2dyZXNzXCIpIHtcbiAgICAgICAgICBfYXNzZXJ0Q2xhc3NCcmFuZChfV2VicGFja0RldlNlcnZlclByb2dyZXNzX2JyYW5kLCB0aGlzLCBfdXBkYXRlKS5jYWxsKHRoaXMsIE51bWJlcihuZXdWYWx1ZSkpO1xuICAgICAgICB9IGVsc2UgaWYgKG5hbWUgPT09IFwidHlwZVwiKSB7XG4gICAgICAgICAgX2Fzc2VydENsYXNzQnJhbmQoX1dlYnBhY2tEZXZTZXJ2ZXJQcm9ncmVzc19icmFuZCwgdGhpcywgX3Jlc2V0KS5jYWxsKHRoaXMpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfV0sIFt7XG4gICAgICBrZXk6IFwib2JzZXJ2ZWRBdHRyaWJ1dGVzXCIsXG4gICAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgICAgcmV0dXJuIFtcInByb2dyZXNzXCIsIFwidHlwZVwiXTtcbiAgICAgIH1cbiAgICB9XSk7XG4gIH0oLyojX19QVVJFX18qL193cmFwTmF0aXZlU3VwZXIoSFRNTEVsZW1lbnQpKTtcbiAgX1dlYnBhY2tEZXZTZXJ2ZXJQcm9ncmVzcyA9IFdlYnBhY2tEZXZTZXJ2ZXJQcm9ncmVzcztcbiAgZnVuY3Rpb24gX3Jlc2V0KCkge1xuICAgIHZhciBfdGhpcyRnZXRBdHRyaWJ1dGUsIF9OdW1iZXI7XG4gICAgY2xlYXJUaW1lb3V0KHRoaXMuYW5pbWF0aW9uVGltZXIpO1xuICAgIHRoaXMuYW5pbWF0aW9uVGltZXIgPSBudWxsO1xuICAgIHZhciB0eXBlQXR0ciA9IChfdGhpcyRnZXRBdHRyaWJ1dGUgPSB0aGlzLmdldEF0dHJpYnV0ZShcInR5cGVcIikpID09PSBudWxsIHx8IF90aGlzJGdldEF0dHJpYnV0ZSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX3RoaXMkZ2V0QXR0cmlidXRlLnRvTG93ZXJDYXNlKCk7XG4gICAgdGhpcy50eXBlID0gdHlwZUF0dHIgPT09IFwiY2lyY3VsYXJcIiA/IFwiY2lyY3VsYXJcIiA6IFwibGluZWFyXCI7XG4gICAgdmFyIGlubmVySFRNTCA9IHRoaXMudHlwZSA9PT0gXCJjaXJjdWxhclwiID8gX2NpcmN1bGFyVGVtcGxhdGUuY2FsbChfV2VicGFja0RldlNlcnZlclByb2dyZXNzKSA6IF9saW5lYXJUZW1wbGF0ZS5jYWxsKF9XZWJwYWNrRGV2U2VydmVyUHJvZ3Jlc3MpO1xuICAgIHRoaXMuc2hhZG93Um9vdC5pbm5lckhUTUwgPSBpbm5lckhUTUw7XG4gICAgdGhpcy5pbml0aWFsUHJvZ3Jlc3MgPSAoX051bWJlciA9IE51bWJlcih0aGlzLmdldEF0dHJpYnV0ZShcInByb2dyZXNzXCIpKSkgIT09IG51bGwgJiYgX051bWJlciAhPT0gdm9pZCAwID8gX051bWJlciA6IDA7XG4gICAgX2Fzc2VydENsYXNzQnJhbmQoX1dlYnBhY2tEZXZTZXJ2ZXJQcm9ncmVzc19icmFuZCwgdGhpcywgX3VwZGF0ZSkuY2FsbCh0aGlzLCB0aGlzLmluaXRpYWxQcm9ncmVzcyk7XG4gIH1cbiAgZnVuY3Rpb24gX2NpcmN1bGFyVGVtcGxhdGUoKSB7XG4gICAgcmV0dXJuIFwiXFxuICAgICAgICA8c3R5bGU+XFxuICAgICAgICA6aG9zdCB7XFxuICAgICAgICAgICAgd2lkdGg6IDIwMHB4O1xcbiAgICAgICAgICAgIGhlaWdodDogMjAwcHg7XFxuICAgICAgICAgICAgcG9zaXRpb246IGZpeGVkO1xcbiAgICAgICAgICAgIHJpZ2h0OiA1JTtcXG4gICAgICAgICAgICB0b3A6IDUlO1xcbiAgICAgICAgICAgIHRyYW5zaXRpb246IG9wYWNpdHkgLjI1cyBlYXNlLWluLW91dDtcXG4gICAgICAgICAgICB6LWluZGV4OiAyMTQ3NDgzNjQ1O1xcbiAgICAgICAgfVxcblxcbiAgICAgICAgY2lyY2xlIHtcXG4gICAgICAgICAgICBmaWxsOiAjMjgyZDM1O1xcbiAgICAgICAgfVxcblxcbiAgICAgICAgcGF0aCB7XFxuICAgICAgICAgICAgZmlsbDogcmdiYSgwLCAwLCAwLCAwKTtcXG4gICAgICAgICAgICBzdHJva2U6IHJnYigxODYsIDIyMywgMTcyKTtcXG4gICAgICAgICAgICBzdHJva2UtZGFzaGFycmF5OiAyMTkuOTkwNzgzNjkxNDA2MjU7XFxuICAgICAgICAgICAgc3Ryb2tlLWRhc2hvZmZzZXQ6IC0yMTkuOTkwNzgzNjkxNDA2MjU7XFxuICAgICAgICAgICAgc3Ryb2tlLXdpZHRoOiAxMDtcXG4gICAgICAgICAgICB0cmFuc2Zvcm06IHJvdGF0ZSg5MGRlZykgdHJhbnNsYXRlKDBweCwgLTgwcHgpO1xcbiAgICAgICAgfVxcblxcbiAgICAgICAgdGV4dCB7XFxuICAgICAgICAgICAgZm9udC1mYW1pbHk6ICdPcGVuIFNhbnMnLCBzYW5zLXNlcmlmO1xcbiAgICAgICAgICAgIGZvbnQtc2l6ZTogMThweDtcXG4gICAgICAgICAgICBmaWxsOiAjZmZmZmZmO1xcbiAgICAgICAgICAgIGRvbWluYW50LWJhc2VsaW5lOiBtaWRkbGU7XFxuICAgICAgICAgICAgdGV4dC1hbmNob3I6IG1pZGRsZTtcXG4gICAgICAgIH1cXG5cXG4gICAgICAgIHRzcGFuI3BlcmNlbnQtc3VwZXIge1xcbiAgICAgICAgICAgIGZpbGw6ICNiZGMzYzc7XFxuICAgICAgICAgICAgZm9udC1zaXplOiAwLjQ1ZW07XFxuICAgICAgICAgICAgYmFzZWxpbmUtc2hpZnQ6IDEwJTtcXG4gICAgICAgIH1cXG5cXG4gICAgICAgIEBrZXlmcmFtZXMgZmFkZSB7XFxuICAgICAgICAgICAgMCUgeyBvcGFjaXR5OiAxOyB0cmFuc2Zvcm06IHNjYWxlKDEpOyB9XFxuICAgICAgICAgICAgMTAwJSB7IG9wYWNpdHk6IDA7IHRyYW5zZm9ybTogc2NhbGUoMCk7IH1cXG4gICAgICAgIH1cXG5cXG4gICAgICAgIC5kaXNhcHBlYXIge1xcbiAgICAgICAgICAgIGFuaW1hdGlvbjogZmFkZSAwLjNzO1xcbiAgICAgICAgICAgIGFuaW1hdGlvbi1maWxsLW1vZGU6IGZvcndhcmRzO1xcbiAgICAgICAgICAgIGFuaW1hdGlvbi1kZWxheTogMC41cztcXG4gICAgICAgIH1cXG5cXG4gICAgICAgIC5oaWRkZW4ge1xcbiAgICAgICAgICAgIGRpc3BsYXk6IG5vbmU7XFxuICAgICAgICB9XFxuICAgICAgICA8L3N0eWxlPlxcbiAgICAgICAgPHN2ZyBpZD1cXFwicHJvZ3Jlc3NcXFwiIGNsYXNzPVxcXCJoaWRkZW4gbm9zZWxlY3RcXFwiIHZpZXdCb3g9XFxcIjAgMCA4MCA4MFxcXCI+XFxuICAgICAgICA8Y2lyY2xlIGN4PVxcXCI1MCVcXFwiIGN5PVxcXCI1MCVcXFwiIHI9XFxcIjM1XFxcIj48L2NpcmNsZT5cXG4gICAgICAgIDxwYXRoIGQ9XFxcIk01LDQwYTM1LDM1IDAgMSwwIDcwLDBhMzUsMzUgMCAxLDAgLTcwLDBcXFwiPjwvcGF0aD5cXG4gICAgICAgIDx0ZXh0IHg9XFxcIjUwJVxcXCIgeT1cXFwiNTElXFxcIj5cXG4gICAgICAgICAgICA8dHNwYW4gaWQ9XFxcInBlcmNlbnQtdmFsdWVcXFwiPjA8L3RzcGFuPlxcbiAgICAgICAgICAgIDx0c3BhbiBpZD1cXFwicGVyY2VudC1zdXBlclxcXCI+JTwvdHNwYW4+XFxuICAgICAgICA8L3RleHQ+XFxuICAgICAgICA8L3N2Zz5cXG4gICAgICBcIjtcbiAgfVxuICBmdW5jdGlvbiBfbGluZWFyVGVtcGxhdGUoKSB7XG4gICAgcmV0dXJuIFwiXFxuICAgICAgICA8c3R5bGU+XFxuICAgICAgICA6aG9zdCB7XFxuICAgICAgICAgICAgcG9zaXRpb246IGZpeGVkO1xcbiAgICAgICAgICAgIHRvcDogMDtcXG4gICAgICAgICAgICBsZWZ0OiAwO1xcbiAgICAgICAgICAgIGhlaWdodDogNHB4O1xcbiAgICAgICAgICAgIHdpZHRoOiAxMDB2dztcXG4gICAgICAgICAgICB6LWluZGV4OiAyMTQ3NDgzNjQ1O1xcbiAgICAgICAgfVxcblxcbiAgICAgICAgI2JhciB7XFxuICAgICAgICAgICAgd2lkdGg6IDAlO1xcbiAgICAgICAgICAgIGhlaWdodDogNHB4O1xcbiAgICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6IHJnYigxODYsIDIyMywgMTcyKTtcXG4gICAgICAgIH1cXG5cXG4gICAgICAgIEBrZXlmcmFtZXMgZmFkZSB7XFxuICAgICAgICAgICAgMCUgeyBvcGFjaXR5OiAxOyB9XFxuICAgICAgICAgICAgMTAwJSB7IG9wYWNpdHk6IDA7IH1cXG4gICAgICAgIH1cXG5cXG4gICAgICAgIC5kaXNhcHBlYXIge1xcbiAgICAgICAgICAgIGFuaW1hdGlvbjogZmFkZSAwLjNzO1xcbiAgICAgICAgICAgIGFuaW1hdGlvbi1maWxsLW1vZGU6IGZvcndhcmRzO1xcbiAgICAgICAgICAgIGFuaW1hdGlvbi1kZWxheTogMC41cztcXG4gICAgICAgIH1cXG5cXG4gICAgICAgIC5oaWRkZW4ge1xcbiAgICAgICAgICAgIGRpc3BsYXk6IG5vbmU7XFxuICAgICAgICB9XFxuICAgICAgICA8L3N0eWxlPlxcbiAgICAgICAgPGRpdiBpZD1cXFwicHJvZ3Jlc3NcXFwiPjwvZGl2PlxcbiAgICAgICAgXCI7XG4gIH1cbiAgZnVuY3Rpb24gX3VwZGF0ZShwZXJjZW50KSB7XG4gICAgdmFyIGVsZW1lbnQgPSB0aGlzLnNoYWRvd1Jvb3QucXVlcnlTZWxlY3RvcihcIiNwcm9ncmVzc1wiKTtcbiAgICBpZiAodGhpcy50eXBlID09PSBcImNpcmN1bGFyXCIpIHtcbiAgICAgIHZhciBwYXRoID0gdGhpcy5zaGFkb3dSb290LnF1ZXJ5U2VsZWN0b3IoXCJwYXRoXCIpO1xuICAgICAgdmFyIHZhbHVlID0gdGhpcy5zaGFkb3dSb290LnF1ZXJ5U2VsZWN0b3IoXCIjcGVyY2VudC12YWx1ZVwiKTtcbiAgICAgIHZhciBvZmZzZXQgPSAoMTAwIC0gcGVyY2VudCkgLyAxMDAgKiB0aGlzLm1heERhc2hPZmZzZXQ7XG4gICAgICBwYXRoLnN0eWxlLnN0cm9rZURhc2hvZmZzZXQgPSBvZmZzZXQ7XG4gICAgICB2YWx1ZS50ZXh0Q29udGVudCA9IHBlcmNlbnQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIGVsZW1lbnQuc3R5bGUud2lkdGggPSBcIlwiLmNvbmNhdChwZXJjZW50LCBcIiVcIik7XG4gICAgfVxuICAgIGlmIChwZXJjZW50ID49IDEwMCkge1xuICAgICAgX2Fzc2VydENsYXNzQnJhbmQoX1dlYnBhY2tEZXZTZXJ2ZXJQcm9ncmVzc19icmFuZCwgdGhpcywgX2hpZGUpLmNhbGwodGhpcyk7XG4gICAgfSBlbHNlIGlmIChwZXJjZW50ID4gMCkge1xuICAgICAgX2Fzc2VydENsYXNzQnJhbmQoX1dlYnBhY2tEZXZTZXJ2ZXJQcm9ncmVzc19icmFuZCwgdGhpcywgX3Nob3cpLmNhbGwodGhpcyk7XG4gICAgfVxuICB9XG4gIGZ1bmN0aW9uIF9zaG93KCkge1xuICAgIHZhciBlbGVtZW50ID0gdGhpcy5zaGFkb3dSb290LnF1ZXJ5U2VsZWN0b3IoXCIjcHJvZ3Jlc3NcIik7XG4gICAgZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKFwiaGlkZGVuXCIpO1xuICB9XG4gIGZ1bmN0aW9uIF9oaWRlKCkge1xuICAgIHZhciBfdGhpczIgPSB0aGlzO1xuICAgIHZhciBlbGVtZW50ID0gdGhpcy5zaGFkb3dSb290LnF1ZXJ5U2VsZWN0b3IoXCIjcHJvZ3Jlc3NcIik7XG4gICAgaWYgKHRoaXMudHlwZSA9PT0gXCJjaXJjdWxhclwiKSB7XG4gICAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJkaXNhcHBlYXJcIik7XG4gICAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJhbmltYXRpb25lbmRcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJoaWRkZW5cIik7XG4gICAgICAgIF9hc3NlcnRDbGFzc0JyYW5kKF9XZWJwYWNrRGV2U2VydmVyUHJvZ3Jlc3NfYnJhbmQsIF90aGlzMiwgX3VwZGF0ZSkuY2FsbChfdGhpczIsIDApO1xuICAgICAgfSwge1xuICAgICAgICBvbmNlOiB0cnVlXG4gICAgICB9KTtcbiAgICB9IGVsc2UgaWYgKHRoaXMudHlwZSA9PT0gXCJsaW5lYXJcIikge1xuICAgICAgZWxlbWVudC5jbGFzc0xpc3QuYWRkKFwiZGlzYXBwZWFyXCIpO1xuICAgICAgdGhpcy5hbmltYXRpb25UaW1lciA9IHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICBlbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoXCJkaXNhcHBlYXJcIik7XG4gICAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LmFkZChcImhpZGRlblwiKTtcbiAgICAgICAgZWxlbWVudC5zdHlsZS53aWR0aCA9IFwiMCVcIjtcbiAgICAgICAgX3RoaXMyLmFuaW1hdGlvblRpbWVyID0gbnVsbDtcbiAgICAgIH0sIDgwMCk7XG4gICAgfVxuICB9XG4gIGN1c3RvbUVsZW1lbnRzLmRlZmluZShcIndkcy1wcm9ncmVzc1wiLCBXZWJwYWNrRGV2U2VydmVyUHJvZ3Jlc3MpO1xufSIsIi8qIGdsb2JhbCBfX3dlYnBhY2tfZGV2X3NlcnZlcl9jbGllbnRfXyAqL1xuXG5pbXBvcnQgV2ViU29ja2V0Q2xpZW50IGZyb20gXCIuL2NsaWVudHMvV2ViU29ja2V0Q2xpZW50LmpzXCI7XG5pbXBvcnQgeyBsb2cgfSBmcm9tIFwiLi91dGlscy9sb2cuanNcIjtcblxuLy8gdGhpcyBXZWJzb2NrZXRDbGllbnQgaXMgaGVyZSBhcyBhIGRlZmF1bHQgZmFsbGJhY2ssIGluIGNhc2UgdGhlIGNsaWVudCBpcyBub3QgaW5qZWN0ZWRcbi8qIGVzbGludC1kaXNhYmxlIGNhbWVsY2FzZSAqL1xudmFyIENsaWVudCA9XG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tbmVzdGVkLXRlcm5hcnlcbnR5cGVvZiBfX3dlYnBhY2tfZGV2X3NlcnZlcl9jbGllbnRfXyAhPT0gXCJ1bmRlZmluZWRcIiA/IHR5cGVvZiBfX3dlYnBhY2tfZGV2X3NlcnZlcl9jbGllbnRfXy5kZWZhdWx0ICE9PSBcInVuZGVmaW5lZFwiID8gX193ZWJwYWNrX2Rldl9zZXJ2ZXJfY2xpZW50X18uZGVmYXVsdCA6IF9fd2VicGFja19kZXZfc2VydmVyX2NsaWVudF9fIDogV2ViU29ja2V0Q2xpZW50O1xuLyogZXNsaW50LWVuYWJsZSBjYW1lbGNhc2UgKi9cblxudmFyIHJldHJpZXMgPSAwO1xudmFyIG1heFJldHJpZXMgPSAxMDtcblxuLy8gSW5pdGlhbGl6ZWQgY2xpZW50IGlzIGV4cG9ydGVkIHNvIGV4dGVybmFsIGNvbnN1bWVycyBjYW4gdXRpbGl6ZSB0aGUgc2FtZSBpbnN0YW5jZVxuLy8gSXQgaXMgbXV0YWJsZSB0byBlbmZvcmNlIHNpbmdsZXRvblxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGltcG9ydC9uby1tdXRhYmxlLWV4cG9ydHNcbmV4cG9ydCB2YXIgY2xpZW50ID0gbnVsbDtcbnZhciB0aW1lb3V0O1xuXG4vKipcbiAqIEBwYXJhbSB7c3RyaW5nfSB1cmxcbiAqIEBwYXJhbSB7eyBbaGFuZGxlcjogc3RyaW5nXTogKGRhdGE/OiBhbnksIHBhcmFtcz86IGFueSkgPT4gYW55IH19IGhhbmRsZXJzXG4gKiBAcGFyYW0ge251bWJlcn0gW3JlY29ubmVjdF1cbiAqL1xudmFyIHNvY2tldCA9IGZ1bmN0aW9uIGluaXRTb2NrZXQodXJsLCBoYW5kbGVycywgcmVjb25uZWN0KSB7XG4gIGNsaWVudCA9IG5ldyBDbGllbnQodXJsKTtcbiAgY2xpZW50Lm9uT3BlbihmdW5jdGlvbiAoKSB7XG4gICAgcmV0cmllcyA9IDA7XG4gICAgaWYgKHRpbWVvdXQpIHtcbiAgICAgIGNsZWFyVGltZW91dCh0aW1lb3V0KTtcbiAgICB9XG4gICAgaWYgKHR5cGVvZiByZWNvbm5lY3QgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgIG1heFJldHJpZXMgPSByZWNvbm5lY3Q7XG4gICAgfVxuICB9KTtcbiAgY2xpZW50Lm9uQ2xvc2UoZnVuY3Rpb24gKCkge1xuICAgIGlmIChyZXRyaWVzID09PSAwKSB7XG4gICAgICBoYW5kbGVycy5jbG9zZSgpO1xuICAgIH1cblxuICAgIC8vIFRyeSB0byByZWNvbm5lY3QuXG4gICAgY2xpZW50ID0gbnVsbDtcblxuICAgIC8vIEFmdGVyIDEwIHJldHJpZXMgc3RvcCB0cnlpbmcsIHRvIHByZXZlbnQgbG9nc3BhbS5cbiAgICBpZiAocmV0cmllcyA8IG1heFJldHJpZXMpIHtcbiAgICAgIC8vIEV4cG9uZW50aWFsbHkgaW5jcmVhc2UgdGltZW91dCB0byByZWNvbm5lY3QuXG4gICAgICAvLyBSZXNwZWN0ZnVsbHkgY29waWVkIGZyb20gdGhlIHBhY2thZ2UgYGdvdGAuXG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcmVzdHJpY3RlZC1wcm9wZXJ0aWVzXG4gICAgICB2YXIgcmV0cnlJbk1zID0gMTAwMCAqIE1hdGgucG93KDIsIHJldHJpZXMpICsgTWF0aC5yYW5kb20oKSAqIDEwMDtcbiAgICAgIHJldHJpZXMgKz0gMTtcbiAgICAgIGxvZy5pbmZvKFwiVHJ5aW5nIHRvIHJlY29ubmVjdC4uLlwiKTtcbiAgICAgIHRpbWVvdXQgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgc29ja2V0KHVybCwgaGFuZGxlcnMsIHJlY29ubmVjdCk7XG4gICAgICB9LCByZXRyeUluTXMpO1xuICAgIH1cbiAgfSk7XG4gIGNsaWVudC5vbk1lc3NhZ2UoXG4gIC8qKlxuICAgKiBAcGFyYW0ge2FueX0gZGF0YVxuICAgKi9cbiAgZnVuY3Rpb24gKGRhdGEpIHtcbiAgICB2YXIgbWVzc2FnZSA9IEpTT04ucGFyc2UoZGF0YSk7XG4gICAgaWYgKGhhbmRsZXJzW21lc3NhZ2UudHlwZV0pIHtcbiAgICAgIGhhbmRsZXJzW21lc3NhZ2UudHlwZV0obWVzc2FnZS5kYXRhLCBtZXNzYWdlLnBhcmFtcyk7XG4gICAgfVxuICB9KTtcbn07XG5leHBvcnQgZGVmYXVsdCBzb2NrZXQ7IiwiaW1wb3J0IGxvZ2dlciBmcm9tIFwiLi4vbW9kdWxlcy9sb2dnZXIvaW5kZXguanNcIjtcbnZhciBuYW1lID0gXCJ3ZWJwYWNrLWRldi1zZXJ2ZXJcIjtcbi8vIGRlZmF1bHQgbGV2ZWwgaXMgc2V0IG9uIHRoZSBjbGllbnQgc2lkZSwgc28gaXQgZG9lcyBub3QgbmVlZFxuLy8gdG8gYmUgc2V0IGJ5IHRoZSBDTEkgb3IgQVBJXG52YXIgZGVmYXVsdExldmVsID0gXCJpbmZvXCI7XG5cbi8vIG9wdGlvbnMgbmV3IG9wdGlvbnMsIG1lcmdlIHdpdGggb2xkIG9wdGlvbnNcbi8qKlxuICogQHBhcmFtIHtmYWxzZSB8IHRydWUgfCBcIm5vbmVcIiB8IFwiZXJyb3JcIiB8IFwid2FyblwiIHwgXCJpbmZvXCIgfCBcImxvZ1wiIHwgXCJ2ZXJib3NlXCJ9IGxldmVsXG4gKiBAcmV0dXJucyB7dm9pZH1cbiAqL1xuZnVuY3Rpb24gc2V0TG9nTGV2ZWwobGV2ZWwpIHtcbiAgbG9nZ2VyLmNvbmZpZ3VyZURlZmF1bHRMb2dnZXIoe1xuICAgIGxldmVsOiBsZXZlbFxuICB9KTtcbn1cbnNldExvZ0xldmVsKGRlZmF1bHRMZXZlbCk7XG52YXIgbG9nID0gbG9nZ2VyLmdldExvZ2dlcihuYW1lKTtcbmV4cG9ydCB7IGxvZywgc2V0TG9nTGV2ZWwgfTsiLCIvKiBnbG9iYWwgX19yZXNvdXJjZVF1ZXJ5IFdvcmtlckdsb2JhbFNjb3BlICovXG5cbi8vIFNlbmQgbWVzc2FnZXMgdG8gdGhlIG91dHNpZGUsIHNvIHBsdWdpbnMgY2FuIGNvbnN1bWUgaXQuXG4vKipcbiAqIEBwYXJhbSB7c3RyaW5nfSB0eXBlXG4gKiBAcGFyYW0ge2FueX0gW2RhdGFdXG4gKi9cbmZ1bmN0aW9uIHNlbmRNc2codHlwZSwgZGF0YSkge1xuICBpZiAodHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgJiYgKHR5cGVvZiBXb3JrZXJHbG9iYWxTY29wZSA9PT0gXCJ1bmRlZmluZWRcIiB8fCAhKHNlbGYgaW5zdGFuY2VvZiBXb3JrZXJHbG9iYWxTY29wZSkpKSB7XG4gICAgc2VsZi5wb3N0TWVzc2FnZSh7XG4gICAgICB0eXBlOiBcIndlYnBhY2tcIi5jb25jYXQodHlwZSksXG4gICAgICBkYXRhOiBkYXRhXG4gICAgfSwgXCIqXCIpO1xuICB9XG59XG5leHBvcnQgZGVmYXVsdCBzZW5kTXNnOyIsIi8qXG5cdE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG5cdEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiovXG4vKiBnbG9iYWxzIF9fd2VicGFja19oYXNoX18gKi9cbmlmIChtb2R1bGUuaG90KSB7XG5cdC8qKiBAdHlwZSB7dW5kZWZpbmVkfHN0cmluZ30gKi9cblx0dmFyIGxhc3RIYXNoO1xuXHR2YXIgdXBUb0RhdGUgPSBmdW5jdGlvbiB1cFRvRGF0ZSgpIHtcblx0XHRyZXR1cm4gLyoqIEB0eXBlIHtzdHJpbmd9ICovIChsYXN0SGFzaCkuaW5kZXhPZihfX3dlYnBhY2tfaGFzaF9fKSA+PSAwO1xuXHR9O1xuXHR2YXIgbG9nID0gcmVxdWlyZShcIi4vbG9nXCIpO1xuXHR2YXIgY2hlY2sgPSBmdW5jdGlvbiBjaGVjaygpIHtcblx0XHRtb2R1bGUuaG90XG5cdFx0XHQuY2hlY2sodHJ1ZSlcblx0XHRcdC50aGVuKGZ1bmN0aW9uICh1cGRhdGVkTW9kdWxlcykge1xuXHRcdFx0XHRpZiAoIXVwZGF0ZWRNb2R1bGVzKSB7XG5cdFx0XHRcdFx0bG9nKFxuXHRcdFx0XHRcdFx0XCJ3YXJuaW5nXCIsXG5cdFx0XHRcdFx0XHRcIltITVJdIENhbm5vdCBmaW5kIHVwZGF0ZS4gXCIgK1xuXHRcdFx0XHRcdFx0XHQodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIlxuXHRcdFx0XHRcdFx0XHRcdD8gXCJOZWVkIHRvIGRvIGEgZnVsbCByZWxvYWQhXCJcblx0XHRcdFx0XHRcdFx0XHQ6IFwiUGxlYXNlIHJlbG9hZCBtYW51YWxseSFcIilcblx0XHRcdFx0XHQpO1xuXHRcdFx0XHRcdGxvZyhcblx0XHRcdFx0XHRcdFwid2FybmluZ1wiLFxuXHRcdFx0XHRcdFx0XCJbSE1SXSAoUHJvYmFibHkgYmVjYXVzZSBvZiByZXN0YXJ0aW5nIHRoZSB3ZWJwYWNrLWRldi1zZXJ2ZXIpXCJcblx0XHRcdFx0XHQpO1xuXHRcdFx0XHRcdGlmICh0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiKSB7XG5cdFx0XHRcdFx0XHR3aW5kb3cubG9jYXRpb24ucmVsb2FkKCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGlmICghdXBUb0RhdGUoKSkge1xuXHRcdFx0XHRcdGNoZWNrKCk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRyZXF1aXJlKFwiLi9sb2ctYXBwbHktcmVzdWx0XCIpKHVwZGF0ZWRNb2R1bGVzLCB1cGRhdGVkTW9kdWxlcyk7XG5cblx0XHRcdFx0aWYgKHVwVG9EYXRlKCkpIHtcblx0XHRcdFx0XHRsb2coXCJpbmZvXCIsIFwiW0hNUl0gQXBwIGlzIHVwIHRvIGRhdGUuXCIpO1xuXHRcdFx0XHR9XG5cdFx0XHR9KVxuXHRcdFx0LmNhdGNoKGZ1bmN0aW9uIChlcnIpIHtcblx0XHRcdFx0dmFyIHN0YXR1cyA9IG1vZHVsZS5ob3Quc3RhdHVzKCk7XG5cdFx0XHRcdGlmIChbXCJhYm9ydFwiLCBcImZhaWxcIl0uaW5kZXhPZihzdGF0dXMpID49IDApIHtcblx0XHRcdFx0XHRsb2coXG5cdFx0XHRcdFx0XHRcIndhcm5pbmdcIixcblx0XHRcdFx0XHRcdFwiW0hNUl0gQ2Fubm90IGFwcGx5IHVwZGF0ZS4gXCIgK1xuXHRcdFx0XHRcdFx0XHQodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIlxuXHRcdFx0XHRcdFx0XHRcdD8gXCJOZWVkIHRvIGRvIGEgZnVsbCByZWxvYWQhXCJcblx0XHRcdFx0XHRcdFx0XHQ6IFwiUGxlYXNlIHJlbG9hZCBtYW51YWxseSFcIilcblx0XHRcdFx0XHQpO1xuXHRcdFx0XHRcdGxvZyhcIndhcm5pbmdcIiwgXCJbSE1SXSBcIiArIGxvZy5mb3JtYXRFcnJvcihlcnIpKTtcblx0XHRcdFx0XHRpZiAodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIikge1xuXHRcdFx0XHRcdFx0d2luZG93LmxvY2F0aW9uLnJlbG9hZCgpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRsb2coXCJ3YXJuaW5nXCIsIFwiW0hNUl0gVXBkYXRlIGZhaWxlZDogXCIgKyBsb2cuZm9ybWF0RXJyb3IoZXJyKSk7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHR9O1xuXHR2YXIgaG90RW1pdHRlciA9IHJlcXVpcmUoXCIuL2VtaXR0ZXJcIik7XG5cdGhvdEVtaXR0ZXIub24oXCJ3ZWJwYWNrSG90VXBkYXRlXCIsIGZ1bmN0aW9uIChjdXJyZW50SGFzaCkge1xuXHRcdGxhc3RIYXNoID0gY3VycmVudEhhc2g7XG5cdFx0aWYgKCF1cFRvRGF0ZSgpICYmIG1vZHVsZS5ob3Quc3RhdHVzKCkgPT09IFwiaWRsZVwiKSB7XG5cdFx0XHRsb2coXCJpbmZvXCIsIFwiW0hNUl0gQ2hlY2tpbmcgZm9yIHVwZGF0ZXMgb24gdGhlIHNlcnZlci4uLlwiKTtcblx0XHRcdGNoZWNrKCk7XG5cdFx0fVxuXHR9KTtcblx0bG9nKFwiaW5mb1wiLCBcIltITVJdIFdhaXRpbmcgZm9yIHVwZGF0ZSBzaWduYWwgZnJvbSBXRFMuLi5cIik7XG59IGVsc2Uge1xuXHR0aHJvdyBuZXcgRXJyb3IoXCJbSE1SXSBIb3QgTW9kdWxlIFJlcGxhY2VtZW50IGlzIGRpc2FibGVkLlwiKTtcbn1cbiIsInZhciBFdmVudEVtaXR0ZXIgPSByZXF1aXJlKFwiZXZlbnRzXCIpO1xubW9kdWxlLmV4cG9ydHMgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4iLCIvKlxuXHRNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuXHRBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXG4qL1xuXG4vKipcbiAqIEBwYXJhbSB7KHN0cmluZyB8IG51bWJlcilbXX0gdXBkYXRlZE1vZHVsZXMgdXBkYXRlZCBtb2R1bGVzXG4gKiBAcGFyYW0geyhzdHJpbmcgfCBudW1iZXIpW10gfCBudWxsfSByZW5ld2VkTW9kdWxlcyByZW5ld2VkIG1vZHVsZXNcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAodXBkYXRlZE1vZHVsZXMsIHJlbmV3ZWRNb2R1bGVzKSB7XG5cdHZhciB1bmFjY2VwdGVkTW9kdWxlcyA9IHVwZGF0ZWRNb2R1bGVzLmZpbHRlcihmdW5jdGlvbiAobW9kdWxlSWQpIHtcblx0XHRyZXR1cm4gcmVuZXdlZE1vZHVsZXMgJiYgcmVuZXdlZE1vZHVsZXMuaW5kZXhPZihtb2R1bGVJZCkgPCAwO1xuXHR9KTtcblx0dmFyIGxvZyA9IHJlcXVpcmUoXCIuL2xvZ1wiKTtcblxuXHRpZiAodW5hY2NlcHRlZE1vZHVsZXMubGVuZ3RoID4gMCkge1xuXHRcdGxvZyhcblx0XHRcdFwid2FybmluZ1wiLFxuXHRcdFx0XCJbSE1SXSBUaGUgZm9sbG93aW5nIG1vZHVsZXMgY291bGRuJ3QgYmUgaG90IHVwZGF0ZWQ6IChUaGV5IHdvdWxkIG5lZWQgYSBmdWxsIHJlbG9hZCEpXCJcblx0XHQpO1xuXHRcdHVuYWNjZXB0ZWRNb2R1bGVzLmZvckVhY2goZnVuY3Rpb24gKG1vZHVsZUlkKSB7XG5cdFx0XHRsb2coXCJ3YXJuaW5nXCIsIFwiW0hNUl0gIC0gXCIgKyBtb2R1bGVJZCk7XG5cdFx0fSk7XG5cdH1cblxuXHRpZiAoIXJlbmV3ZWRNb2R1bGVzIHx8IHJlbmV3ZWRNb2R1bGVzLmxlbmd0aCA9PT0gMCkge1xuXHRcdGxvZyhcImluZm9cIiwgXCJbSE1SXSBOb3RoaW5nIGhvdCB1cGRhdGVkLlwiKTtcblx0fSBlbHNlIHtcblx0XHRsb2coXCJpbmZvXCIsIFwiW0hNUl0gVXBkYXRlZCBtb2R1bGVzOlwiKTtcblx0XHRyZW5ld2VkTW9kdWxlcy5mb3JFYWNoKGZ1bmN0aW9uIChtb2R1bGVJZCkge1xuXHRcdFx0aWYgKHR5cGVvZiBtb2R1bGVJZCA9PT0gXCJzdHJpbmdcIiAmJiBtb2R1bGVJZC5pbmRleE9mKFwiIVwiKSAhPT0gLTEpIHtcblx0XHRcdFx0dmFyIHBhcnRzID0gbW9kdWxlSWQuc3BsaXQoXCIhXCIpO1xuXHRcdFx0XHRsb2cuZ3JvdXBDb2xsYXBzZWQoXCJpbmZvXCIsIFwiW0hNUl0gIC0gXCIgKyBwYXJ0cy5wb3AoKSk7XG5cdFx0XHRcdGxvZyhcImluZm9cIiwgXCJbSE1SXSAgLSBcIiArIG1vZHVsZUlkKTtcblx0XHRcdFx0bG9nLmdyb3VwRW5kKFwiaW5mb1wiKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGxvZyhcImluZm9cIiwgXCJbSE1SXSAgLSBcIiArIG1vZHVsZUlkKTtcblx0XHRcdH1cblx0XHR9KTtcblx0XHR2YXIgbnVtYmVySWRzID0gcmVuZXdlZE1vZHVsZXMuZXZlcnkoZnVuY3Rpb24gKG1vZHVsZUlkKSB7XG5cdFx0XHRyZXR1cm4gdHlwZW9mIG1vZHVsZUlkID09PSBcIm51bWJlclwiO1xuXHRcdH0pO1xuXHRcdGlmIChudW1iZXJJZHMpXG5cdFx0XHRsb2coXG5cdFx0XHRcdFwiaW5mb1wiLFxuXHRcdFx0XHQnW0hNUl0gQ29uc2lkZXIgdXNpbmcgdGhlIG9wdGltaXphdGlvbi5tb2R1bGVJZHM6IFwibmFtZWRcIiBmb3IgbW9kdWxlIG5hbWVzLidcblx0XHRcdCk7XG5cdH1cbn07XG4iLCIvKiogQHR5cGVkZWYge1wiaW5mb1wiIHwgXCJ3YXJuaW5nXCIgfCBcImVycm9yXCJ9IExvZ0xldmVsICovXG5cbi8qKiBAdHlwZSB7TG9nTGV2ZWx9ICovXG52YXIgbG9nTGV2ZWwgPSBcImluZm9cIjtcblxuZnVuY3Rpb24gZHVtbXkoKSB7fVxuXG4vKipcbiAqIEBwYXJhbSB7TG9nTGV2ZWx9IGxldmVsIGxvZyBsZXZlbFxuICogQHJldHVybnMge2Jvb2xlYW59IHRydWUsIGlmIHNob3VsZCBsb2dcbiAqL1xuZnVuY3Rpb24gc2hvdWxkTG9nKGxldmVsKSB7XG5cdHZhciBzaG91bGRMb2cgPVxuXHRcdChsb2dMZXZlbCA9PT0gXCJpbmZvXCIgJiYgbGV2ZWwgPT09IFwiaW5mb1wiKSB8fFxuXHRcdChbXCJpbmZvXCIsIFwid2FybmluZ1wiXS5pbmRleE9mKGxvZ0xldmVsKSA+PSAwICYmIGxldmVsID09PSBcIndhcm5pbmdcIikgfHxcblx0XHQoW1wiaW5mb1wiLCBcIndhcm5pbmdcIiwgXCJlcnJvclwiXS5pbmRleE9mKGxvZ0xldmVsKSA+PSAwICYmIGxldmVsID09PSBcImVycm9yXCIpO1xuXHRyZXR1cm4gc2hvdWxkTG9nO1xufVxuXG4vKipcbiAqIEBwYXJhbSB7KG1zZz86IHN0cmluZykgPT4gdm9pZH0gbG9nRm4gbG9nIGZ1bmN0aW9uXG4gKiBAcmV0dXJucyB7KGxldmVsOiBMb2dMZXZlbCwgbXNnPzogc3RyaW5nKSA9PiB2b2lkfSBmdW5jdGlvbiB0aGF0IGxvZ3Mgd2hlbiBsb2cgbGV2ZWwgaXMgc3VmZmljaWVudFxuICovXG5mdW5jdGlvbiBsb2dHcm91cChsb2dGbikge1xuXHRyZXR1cm4gZnVuY3Rpb24gKGxldmVsLCBtc2cpIHtcblx0XHRpZiAoc2hvdWxkTG9nKGxldmVsKSkge1xuXHRcdFx0bG9nRm4obXNnKTtcblx0XHR9XG5cdH07XG59XG5cbi8qKlxuICogQHBhcmFtIHtMb2dMZXZlbH0gbGV2ZWwgbG9nIGxldmVsXG4gKiBAcGFyYW0ge3N0cmluZ3xFcnJvcn0gbXNnIG1lc3NhZ2VcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobGV2ZWwsIG1zZykge1xuXHRpZiAoc2hvdWxkTG9nKGxldmVsKSkge1xuXHRcdGlmIChsZXZlbCA9PT0gXCJpbmZvXCIpIHtcblx0XHRcdGNvbnNvbGUubG9nKG1zZyk7XG5cdFx0fSBlbHNlIGlmIChsZXZlbCA9PT0gXCJ3YXJuaW5nXCIpIHtcblx0XHRcdGNvbnNvbGUud2Fybihtc2cpO1xuXHRcdH0gZWxzZSBpZiAobGV2ZWwgPT09IFwiZXJyb3JcIikge1xuXHRcdFx0Y29uc29sZS5lcnJvcihtc2cpO1xuXHRcdH1cblx0fVxufTtcblxuLyoqXG4gKiBAcGFyYW0ge0Vycm9yfSBlcnIgZXJyb3JcbiAqIEByZXR1cm5zIHtzdHJpbmd9IGZvcm1hdHRlZCBlcnJvclxuICovXG5tb2R1bGUuZXhwb3J0cy5mb3JtYXRFcnJvciA9IGZ1bmN0aW9uIChlcnIpIHtcblx0dmFyIG1lc3NhZ2UgPSBlcnIubWVzc2FnZTtcblx0dmFyIHN0YWNrID0gZXJyLnN0YWNrO1xuXHRpZiAoIXN0YWNrKSB7XG5cdFx0cmV0dXJuIG1lc3NhZ2U7XG5cdH0gZWxzZSBpZiAoc3RhY2suaW5kZXhPZihtZXNzYWdlKSA8IDApIHtcblx0XHRyZXR1cm4gbWVzc2FnZSArIFwiXFxuXCIgKyBzdGFjaztcblx0fVxuXHRyZXR1cm4gc3RhY2s7XG59O1xuXG52YXIgZ3JvdXAgPSBjb25zb2xlLmdyb3VwIHx8IGR1bW15O1xudmFyIGdyb3VwQ29sbGFwc2VkID0gY29uc29sZS5ncm91cENvbGxhcHNlZCB8fCBkdW1teTtcbnZhciBncm91cEVuZCA9IGNvbnNvbGUuZ3JvdXBFbmQgfHwgZHVtbXk7XG5cbm1vZHVsZS5leHBvcnRzLmdyb3VwID0gbG9nR3JvdXAoZ3JvdXApO1xuXG5tb2R1bGUuZXhwb3J0cy5ncm91cENvbGxhcHNlZCA9IGxvZ0dyb3VwKGdyb3VwQ29sbGFwc2VkKTtcblxubW9kdWxlLmV4cG9ydHMuZ3JvdXBFbmQgPSBsb2dHcm91cChncm91cEVuZCk7XG5cbi8qKlxuICogQHBhcmFtIHtMb2dMZXZlbH0gbGV2ZWwgbG9nIGxldmVsXG4gKi9cbm1vZHVsZS5leHBvcnRzLnNldExvZ0xldmVsID0gZnVuY3Rpb24gKGxldmVsKSB7XG5cdGxvZ0xldmVsID0gbGV2ZWw7XG59O1xuIiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307XG4gICAgaWYobW9kdWxlLmhvdCkge1xuICAgICAgKGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgbG9jYWxzSnNvblN0cmluZyA9IHVuZGVmaW5lZDtcbiAgICAgICAgLy8gMTc2MDYyMTI4NDgzNFxuICAgICAgICB2YXIgY3NzUmVsb2FkID0gcmVxdWlyZShcIi4uL25vZGVfbW9kdWxlcy9taW5pLWNzcy1leHRyYWN0LXBsdWdpbi9kaXN0L2htci9ob3RNb2R1bGVSZXBsYWNlbWVudC5qc1wiKShtb2R1bGUuaWQsIHtcInB1YmxpY1BhdGhcIjpcIlwifSk7XG4gICAgICAgIC8vIG9ubHkgaW52YWxpZGF0ZSB3aGVuIGxvY2FscyBjaGFuZ2VcbiAgICAgICAgaWYgKFxuICAgICAgICAgIG1vZHVsZS5ob3QuZGF0YSAmJlxuICAgICAgICAgIG1vZHVsZS5ob3QuZGF0YS52YWx1ZSAmJlxuICAgICAgICAgIG1vZHVsZS5ob3QuZGF0YS52YWx1ZSAhPT0gbG9jYWxzSnNvblN0cmluZ1xuICAgICAgICApIHtcbiAgICAgICAgICBtb2R1bGUuaG90LmludmFsaWRhdGUoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBtb2R1bGUuaG90LmFjY2VwdCgpO1xuICAgICAgICB9XG4gICAgICAgIG1vZHVsZS5ob3QuZGlzcG9zZShmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgICAgZGF0YS52YWx1ZSA9IGxvY2Fsc0pzb25TdHJpbmc7XG4gICAgICAgICAgY3NzUmVsb2FkKCk7XG4gICAgICAgIH0pO1xuICAgICAgfSkoKTtcbiAgICB9XG4gICIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0aWQ6IG1vZHVsZUlkLFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0dmFyIGV4ZWNPcHRpb25zID0geyBpZDogbW9kdWxlSWQsIG1vZHVsZTogbW9kdWxlLCBmYWN0b3J5OiBfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXSwgcmVxdWlyZTogX193ZWJwYWNrX3JlcXVpcmVfXyB9O1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmkuZm9yRWFjaChmdW5jdGlvbihoYW5kbGVyKSB7IGhhbmRsZXIoZXhlY09wdGlvbnMpOyB9KTtcblx0bW9kdWxlID0gZXhlY09wdGlvbnMubW9kdWxlO1xuXHRleGVjT3B0aW9ucy5mYWN0b3J5LmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIGV4ZWNPcHRpb25zLnJlcXVpcmUpO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuLy8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbl9fd2VicGFja19yZXF1aXJlX18ubSA9IF9fd2VicGFja19tb2R1bGVzX187XG5cbi8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX187XG5cbi8vIGV4cG9zZSB0aGUgbW9kdWxlIGV4ZWN1dGlvbiBpbnRlcmNlcHRvclxuX193ZWJwYWNrX3JlcXVpcmVfXy5pID0gW107XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiLy8gVGhpcyBmdW5jdGlvbiBhbGxvdyB0byByZWZlcmVuY2UgYWxsIGNodW5rc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5odSA9IChjaHVua0lkKSA9PiB7XG5cdC8vIHJldHVybiB1cmwgZm9yIGZpbGVuYW1lcyBiYXNlZCBvbiB0ZW1wbGF0ZVxuXHRyZXR1cm4gXCJcIiArIGNodW5rSWQgKyBcIi5cIiArIF9fd2VicGFja19yZXF1aXJlX18uaCgpICsgXCIuaG90LXVwZGF0ZS5qc1wiO1xufTsiLCIvLyBUaGlzIGZ1bmN0aW9uIGFsbG93IHRvIHJlZmVyZW5jZSBhbGwgY2h1bmtzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm1pbmlDc3NGID0gKGNodW5rSWQpID0+IHtcblx0Ly8gcmV0dXJuIHVybCBmb3IgZmlsZW5hbWVzIGJhc2VkIG9uIHRlbXBsYXRlXG5cdHJldHVybiBcIlwiICsgY2h1bmtJZCArIFwiLmNzc1wiO1xufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmhtckYgPSAoKSA9PiAoXCJtYWluLlwiICsgX193ZWJwYWNrX3JlcXVpcmVfXy5oKCkgKyBcIi5ob3QtdXBkYXRlLmpzb25cIik7IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5oID0gKCkgPT4gKFwiNmI4MTBkY2VjYzhhZmQ4OWFkMTRcIikiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmcgPSAoZnVuY3Rpb24oKSB7XG5cdGlmICh0eXBlb2YgZ2xvYmFsVGhpcyA9PT0gJ29iamVjdCcpIHJldHVybiBnbG9iYWxUaGlzO1xuXHR0cnkge1xuXHRcdHJldHVybiB0aGlzIHx8IG5ldyBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuXHR9IGNhdGNoIChlKSB7XG5cdFx0aWYgKHR5cGVvZiB3aW5kb3cgPT09ICdvYmplY3QnKSByZXR1cm4gd2luZG93O1xuXHR9XG59KSgpOyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCJ2YXIgaW5Qcm9ncmVzcyA9IHt9O1xudmFyIGRhdGFXZWJwYWNrUHJlZml4ID0gXCJ2YW5pbGxhX2phdmFzY3JpcHRfcXVpY2tfc3RhcnQ6XCI7XG4vLyBsb2FkU2NyaXB0IGZ1bmN0aW9uIHRvIGxvYWQgYSBzY3JpcHQgdmlhIHNjcmlwdCB0YWdcbl9fd2VicGFja19yZXF1aXJlX18ubCA9ICh1cmwsIGRvbmUsIGtleSwgY2h1bmtJZCkgPT4ge1xuXHRpZihpblByb2dyZXNzW3VybF0pIHsgaW5Qcm9ncmVzc1t1cmxdLnB1c2goZG9uZSk7IHJldHVybjsgfVxuXHR2YXIgc2NyaXB0LCBuZWVkQXR0YWNoO1xuXHRpZihrZXkgIT09IHVuZGVmaW5lZCkge1xuXHRcdHZhciBzY3JpcHRzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJzY3JpcHRcIik7XG5cdFx0Zm9yKHZhciBpID0gMDsgaSA8IHNjcmlwdHMubGVuZ3RoOyBpKyspIHtcblx0XHRcdHZhciBzID0gc2NyaXB0c1tpXTtcblx0XHRcdGlmKHMuZ2V0QXR0cmlidXRlKFwic3JjXCIpID09IHVybCB8fCBzLmdldEF0dHJpYnV0ZShcImRhdGEtd2VicGFja1wiKSA9PSBkYXRhV2VicGFja1ByZWZpeCArIGtleSkgeyBzY3JpcHQgPSBzOyBicmVhazsgfVxuXHRcdH1cblx0fVxuXHRpZighc2NyaXB0KSB7XG5cdFx0bmVlZEF0dGFjaCA9IHRydWU7XG5cdFx0c2NyaXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0Jyk7XG5cblx0XHRzY3JpcHQuY2hhcnNldCA9ICd1dGYtOCc7XG5cdFx0aWYgKF9fd2VicGFja19yZXF1aXJlX18ubmMpIHtcblx0XHRcdHNjcmlwdC5zZXRBdHRyaWJ1dGUoXCJub25jZVwiLCBfX3dlYnBhY2tfcmVxdWlyZV9fLm5jKTtcblx0XHR9XG5cdFx0c2NyaXB0LnNldEF0dHJpYnV0ZShcImRhdGEtd2VicGFja1wiLCBkYXRhV2VicGFja1ByZWZpeCArIGtleSk7XG5cblx0XHRzY3JpcHQuc3JjID0gdXJsO1xuXHR9XG5cdGluUHJvZ3Jlc3NbdXJsXSA9IFtkb25lXTtcblx0dmFyIG9uU2NyaXB0Q29tcGxldGUgPSAocHJldiwgZXZlbnQpID0+IHtcblx0XHQvLyBhdm9pZCBtZW0gbGVha3MgaW4gSUUuXG5cdFx0c2NyaXB0Lm9uZXJyb3IgPSBzY3JpcHQub25sb2FkID0gbnVsbDtcblx0XHRjbGVhclRpbWVvdXQodGltZW91dCk7XG5cdFx0dmFyIGRvbmVGbnMgPSBpblByb2dyZXNzW3VybF07XG5cdFx0ZGVsZXRlIGluUHJvZ3Jlc3NbdXJsXTtcblx0XHRzY3JpcHQucGFyZW50Tm9kZSAmJiBzY3JpcHQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzY3JpcHQpO1xuXHRcdGRvbmVGbnMgJiYgZG9uZUZucy5mb3JFYWNoKChmbikgPT4gKGZuKGV2ZW50KSkpO1xuXHRcdGlmKHByZXYpIHJldHVybiBwcmV2KGV2ZW50KTtcblx0fVxuXHR2YXIgdGltZW91dCA9IHNldFRpbWVvdXQob25TY3JpcHRDb21wbGV0ZS5iaW5kKG51bGwsIHVuZGVmaW5lZCwgeyB0eXBlOiAndGltZW91dCcsIHRhcmdldDogc2NyaXB0IH0pLCAxMjAwMDApO1xuXHRzY3JpcHQub25lcnJvciA9IG9uU2NyaXB0Q29tcGxldGUuYmluZChudWxsLCBzY3JpcHQub25lcnJvcik7XG5cdHNjcmlwdC5vbmxvYWQgPSBvblNjcmlwdENvbXBsZXRlLmJpbmQobnVsbCwgc2NyaXB0Lm9ubG9hZCk7XG5cdG5lZWRBdHRhY2ggJiYgZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChzY3JpcHQpO1xufTsiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJ2YXIgY3VycmVudE1vZHVsZURhdGEgPSB7fTtcbnZhciBpbnN0YWxsZWRNb2R1bGVzID0gX193ZWJwYWNrX3JlcXVpcmVfXy5jO1xuXG4vLyBtb2R1bGUgYW5kIHJlcXVpcmUgY3JlYXRpb25cbnZhciBjdXJyZW50Q2hpbGRNb2R1bGU7XG52YXIgY3VycmVudFBhcmVudHMgPSBbXTtcblxuLy8gc3RhdHVzXG52YXIgcmVnaXN0ZXJlZFN0YXR1c0hhbmRsZXJzID0gW107XG52YXIgY3VycmVudFN0YXR1cyA9IFwiaWRsZVwiO1xuXG4vLyB3aGlsZSBkb3dubG9hZGluZ1xudmFyIGJsb2NraW5nUHJvbWlzZXMgPSAwO1xudmFyIGJsb2NraW5nUHJvbWlzZXNXYWl0aW5nID0gW107XG5cbi8vIFRoZSB1cGRhdGUgaW5mb1xudmFyIGN1cnJlbnRVcGRhdGVBcHBseUhhbmRsZXJzO1xudmFyIHF1ZXVlZEludmFsaWRhdGVkTW9kdWxlcztcblxuX193ZWJwYWNrX3JlcXVpcmVfXy5obXJEID0gY3VycmVudE1vZHVsZURhdGE7XG5cbl9fd2VicGFja19yZXF1aXJlX18uaS5wdXNoKGZ1bmN0aW9uIChvcHRpb25zKSB7XG5cdHZhciBtb2R1bGUgPSBvcHRpb25zLm1vZHVsZTtcblx0dmFyIHJlcXVpcmUgPSBjcmVhdGVSZXF1aXJlKG9wdGlvbnMucmVxdWlyZSwgb3B0aW9ucy5pZCk7XG5cdG1vZHVsZS5ob3QgPSBjcmVhdGVNb2R1bGVIb3RPYmplY3Qob3B0aW9ucy5pZCwgbW9kdWxlKTtcblx0bW9kdWxlLnBhcmVudHMgPSBjdXJyZW50UGFyZW50cztcblx0bW9kdWxlLmNoaWxkcmVuID0gW107XG5cdGN1cnJlbnRQYXJlbnRzID0gW107XG5cdG9wdGlvbnMucmVxdWlyZSA9IHJlcXVpcmU7XG59KTtcblxuX193ZWJwYWNrX3JlcXVpcmVfXy5obXJDID0ge307XG5fX3dlYnBhY2tfcmVxdWlyZV9fLmhtckkgPSB7fTtcblxuZnVuY3Rpb24gY3JlYXRlUmVxdWlyZShyZXF1aXJlLCBtb2R1bGVJZCkge1xuXHR2YXIgbWUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXTtcblx0aWYgKCFtZSkgcmV0dXJuIHJlcXVpcmU7XG5cdHZhciBmbiA9IGZ1bmN0aW9uIChyZXF1ZXN0KSB7XG5cdFx0aWYgKG1lLmhvdC5hY3RpdmUpIHtcblx0XHRcdGlmIChpbnN0YWxsZWRNb2R1bGVzW3JlcXVlc3RdKSB7XG5cdFx0XHRcdHZhciBwYXJlbnRzID0gaW5zdGFsbGVkTW9kdWxlc1tyZXF1ZXN0XS5wYXJlbnRzO1xuXHRcdFx0XHRpZiAocGFyZW50cy5pbmRleE9mKG1vZHVsZUlkKSA9PT0gLTEpIHtcblx0XHRcdFx0XHRwYXJlbnRzLnB1c2gobW9kdWxlSWQpO1xuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRjdXJyZW50UGFyZW50cyA9IFttb2R1bGVJZF07XG5cdFx0XHRcdGN1cnJlbnRDaGlsZE1vZHVsZSA9IHJlcXVlc3Q7XG5cdFx0XHR9XG5cdFx0XHRpZiAobWUuY2hpbGRyZW4uaW5kZXhPZihyZXF1ZXN0KSA9PT0gLTEpIHtcblx0XHRcdFx0bWUuY2hpbGRyZW4ucHVzaChyZXF1ZXN0KTtcblx0XHRcdH1cblx0XHR9IGVsc2Uge1xuXHRcdFx0Y29uc29sZS53YXJuKFxuXHRcdFx0XHRcIltITVJdIHVuZXhwZWN0ZWQgcmVxdWlyZShcIiArXG5cdFx0XHRcdFx0cmVxdWVzdCArXG5cdFx0XHRcdFx0XCIpIGZyb20gZGlzcG9zZWQgbW9kdWxlIFwiICtcblx0XHRcdFx0XHRtb2R1bGVJZFxuXHRcdFx0KTtcblx0XHRcdGN1cnJlbnRQYXJlbnRzID0gW107XG5cdFx0fVxuXHRcdHJldHVybiByZXF1aXJlKHJlcXVlc3QpO1xuXHR9O1xuXHR2YXIgY3JlYXRlUHJvcGVydHlEZXNjcmlwdG9yID0gZnVuY3Rpb24gKG5hbWUpIHtcblx0XHRyZXR1cm4ge1xuXHRcdFx0Y29uZmlndXJhYmxlOiB0cnVlLFxuXHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcblx0XHRcdGdldDogZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRyZXR1cm4gcmVxdWlyZVtuYW1lXTtcblx0XHRcdH0sXG5cdFx0XHRzZXQ6IGZ1bmN0aW9uICh2YWx1ZSkge1xuXHRcdFx0XHRyZXF1aXJlW25hbWVdID0gdmFsdWU7XG5cdFx0XHR9XG5cdFx0fTtcblx0fTtcblx0Zm9yICh2YXIgbmFtZSBpbiByZXF1aXJlKSB7XG5cdFx0aWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChyZXF1aXJlLCBuYW1lKSAmJiBuYW1lICE9PSBcImVcIikge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGZuLCBuYW1lLCBjcmVhdGVQcm9wZXJ0eURlc2NyaXB0b3IobmFtZSkpO1xuXHRcdH1cblx0fVxuXHRmbi5lID0gZnVuY3Rpb24gKGNodW5rSWQsIGZldGNoUHJpb3JpdHkpIHtcblx0XHRyZXR1cm4gdHJhY2tCbG9ja2luZ1Byb21pc2UocmVxdWlyZS5lKGNodW5rSWQsIGZldGNoUHJpb3JpdHkpKTtcblx0fTtcblx0cmV0dXJuIGZuO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVNb2R1bGVIb3RPYmplY3QobW9kdWxlSWQsIG1lKSB7XG5cdHZhciBfbWFpbiA9IGN1cnJlbnRDaGlsZE1vZHVsZSAhPT0gbW9kdWxlSWQ7XG5cdHZhciBob3QgPSB7XG5cdFx0Ly8gcHJpdmF0ZSBzdHVmZlxuXHRcdF9hY2NlcHRlZERlcGVuZGVuY2llczoge30sXG5cdFx0X2FjY2VwdGVkRXJyb3JIYW5kbGVyczoge30sXG5cdFx0X2RlY2xpbmVkRGVwZW5kZW5jaWVzOiB7fSxcblx0XHRfc2VsZkFjY2VwdGVkOiBmYWxzZSxcblx0XHRfc2VsZkRlY2xpbmVkOiBmYWxzZSxcblx0XHRfc2VsZkludmFsaWRhdGVkOiBmYWxzZSxcblx0XHRfZGlzcG9zZUhhbmRsZXJzOiBbXSxcblx0XHRfbWFpbjogX21haW4sXG5cdFx0X3JlcXVpcmVTZWxmOiBmdW5jdGlvbiAoKSB7XG5cdFx0XHRjdXJyZW50UGFyZW50cyA9IG1lLnBhcmVudHMuc2xpY2UoKTtcblx0XHRcdGN1cnJlbnRDaGlsZE1vZHVsZSA9IF9tYWluID8gdW5kZWZpbmVkIDogbW9kdWxlSWQ7XG5cdFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKTtcblx0XHR9LFxuXG5cdFx0Ly8gTW9kdWxlIEFQSVxuXHRcdGFjdGl2ZTogdHJ1ZSxcblx0XHRhY2NlcHQ6IGZ1bmN0aW9uIChkZXAsIGNhbGxiYWNrLCBlcnJvckhhbmRsZXIpIHtcblx0XHRcdGlmIChkZXAgPT09IHVuZGVmaW5lZCkgaG90Ll9zZWxmQWNjZXB0ZWQgPSB0cnVlO1xuXHRcdFx0ZWxzZSBpZiAodHlwZW9mIGRlcCA9PT0gXCJmdW5jdGlvblwiKSBob3QuX3NlbGZBY2NlcHRlZCA9IGRlcDtcblx0XHRcdGVsc2UgaWYgKHR5cGVvZiBkZXAgPT09IFwib2JqZWN0XCIgJiYgZGVwICE9PSBudWxsKSB7XG5cdFx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgZGVwLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdFx0aG90Ll9hY2NlcHRlZERlcGVuZGVuY2llc1tkZXBbaV1dID0gY2FsbGJhY2sgfHwgZnVuY3Rpb24gKCkge307XG5cdFx0XHRcdFx0aG90Ll9hY2NlcHRlZEVycm9ySGFuZGxlcnNbZGVwW2ldXSA9IGVycm9ySGFuZGxlcjtcblx0XHRcdFx0fVxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0aG90Ll9hY2NlcHRlZERlcGVuZGVuY2llc1tkZXBdID0gY2FsbGJhY2sgfHwgZnVuY3Rpb24gKCkge307XG5cdFx0XHRcdGhvdC5fYWNjZXB0ZWRFcnJvckhhbmRsZXJzW2RlcF0gPSBlcnJvckhhbmRsZXI7XG5cdFx0XHR9XG5cdFx0fSxcblx0XHRkZWNsaW5lOiBmdW5jdGlvbiAoZGVwKSB7XG5cdFx0XHRpZiAoZGVwID09PSB1bmRlZmluZWQpIGhvdC5fc2VsZkRlY2xpbmVkID0gdHJ1ZTtcblx0XHRcdGVsc2UgaWYgKHR5cGVvZiBkZXAgPT09IFwib2JqZWN0XCIgJiYgZGVwICE9PSBudWxsKVxuXHRcdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGRlcC5sZW5ndGg7IGkrKylcblx0XHRcdFx0XHRob3QuX2RlY2xpbmVkRGVwZW5kZW5jaWVzW2RlcFtpXV0gPSB0cnVlO1xuXHRcdFx0ZWxzZSBob3QuX2RlY2xpbmVkRGVwZW5kZW5jaWVzW2RlcF0gPSB0cnVlO1xuXHRcdH0sXG5cdFx0ZGlzcG9zZTogZnVuY3Rpb24gKGNhbGxiYWNrKSB7XG5cdFx0XHRob3QuX2Rpc3Bvc2VIYW5kbGVycy5wdXNoKGNhbGxiYWNrKTtcblx0XHR9LFxuXHRcdGFkZERpc3Bvc2VIYW5kbGVyOiBmdW5jdGlvbiAoY2FsbGJhY2spIHtcblx0XHRcdGhvdC5fZGlzcG9zZUhhbmRsZXJzLnB1c2goY2FsbGJhY2spO1xuXHRcdH0sXG5cdFx0cmVtb3ZlRGlzcG9zZUhhbmRsZXI6IGZ1bmN0aW9uIChjYWxsYmFjaykge1xuXHRcdFx0dmFyIGlkeCA9IGhvdC5fZGlzcG9zZUhhbmRsZXJzLmluZGV4T2YoY2FsbGJhY2spO1xuXHRcdFx0aWYgKGlkeCA+PSAwKSBob3QuX2Rpc3Bvc2VIYW5kbGVycy5zcGxpY2UoaWR4LCAxKTtcblx0XHR9LFxuXHRcdGludmFsaWRhdGU6IGZ1bmN0aW9uICgpIHtcblx0XHRcdHRoaXMuX3NlbGZJbnZhbGlkYXRlZCA9IHRydWU7XG5cdFx0XHRzd2l0Y2ggKGN1cnJlbnRTdGF0dXMpIHtcblx0XHRcdFx0Y2FzZSBcImlkbGVcIjpcblx0XHRcdFx0XHRjdXJyZW50VXBkYXRlQXBwbHlIYW5kbGVycyA9IFtdO1xuXHRcdFx0XHRcdE9iamVjdC5rZXlzKF9fd2VicGFja19yZXF1aXJlX18uaG1ySSkuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG5cdFx0XHRcdFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmhtcklba2V5XShcblx0XHRcdFx0XHRcdFx0bW9kdWxlSWQsXG5cdFx0XHRcdFx0XHRcdGN1cnJlbnRVcGRhdGVBcHBseUhhbmRsZXJzXG5cdFx0XHRcdFx0XHQpO1xuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdHNldFN0YXR1cyhcInJlYWR5XCIpO1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRjYXNlIFwicmVhZHlcIjpcblx0XHRcdFx0XHRPYmplY3Qua2V5cyhfX3dlYnBhY2tfcmVxdWlyZV9fLmhtckkpLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuXHRcdFx0XHRcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5obXJJW2tleV0oXG5cdFx0XHRcdFx0XHRcdG1vZHVsZUlkLFxuXHRcdFx0XHRcdFx0XHRjdXJyZW50VXBkYXRlQXBwbHlIYW5kbGVyc1xuXHRcdFx0XHRcdFx0KTtcblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0Y2FzZSBcInByZXBhcmVcIjpcblx0XHRcdFx0Y2FzZSBcImNoZWNrXCI6XG5cdFx0XHRcdGNhc2UgXCJkaXNwb3NlXCI6XG5cdFx0XHRcdGNhc2UgXCJhcHBseVwiOlxuXHRcdFx0XHRcdChxdWV1ZWRJbnZhbGlkYXRlZE1vZHVsZXMgPSBxdWV1ZWRJbnZhbGlkYXRlZE1vZHVsZXMgfHwgW10pLnB1c2goXG5cdFx0XHRcdFx0XHRtb2R1bGVJZFxuXHRcdFx0XHRcdCk7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdFx0Ly8gaWdub3JlIHJlcXVlc3RzIGluIGVycm9yIHN0YXRlc1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0fVxuXHRcdH0sXG5cblx0XHQvLyBNYW5hZ2VtZW50IEFQSVxuXHRcdGNoZWNrOiBob3RDaGVjayxcblx0XHRhcHBseTogaG90QXBwbHksXG5cdFx0c3RhdHVzOiBmdW5jdGlvbiAobCkge1xuXHRcdFx0aWYgKCFsKSByZXR1cm4gY3VycmVudFN0YXR1cztcblx0XHRcdHJlZ2lzdGVyZWRTdGF0dXNIYW5kbGVycy5wdXNoKGwpO1xuXHRcdH0sXG5cdFx0YWRkU3RhdHVzSGFuZGxlcjogZnVuY3Rpb24gKGwpIHtcblx0XHRcdHJlZ2lzdGVyZWRTdGF0dXNIYW5kbGVycy5wdXNoKGwpO1xuXHRcdH0sXG5cdFx0cmVtb3ZlU3RhdHVzSGFuZGxlcjogZnVuY3Rpb24gKGwpIHtcblx0XHRcdHZhciBpZHggPSByZWdpc3RlcmVkU3RhdHVzSGFuZGxlcnMuaW5kZXhPZihsKTtcblx0XHRcdGlmIChpZHggPj0gMCkgcmVnaXN0ZXJlZFN0YXR1c0hhbmRsZXJzLnNwbGljZShpZHgsIDEpO1xuXHRcdH0sXG5cblx0XHQvLyBpbmhlcml0IGZyb20gcHJldmlvdXMgZGlzcG9zZSBjYWxsXG5cdFx0ZGF0YTogY3VycmVudE1vZHVsZURhdGFbbW9kdWxlSWRdXG5cdH07XG5cdGN1cnJlbnRDaGlsZE1vZHVsZSA9IHVuZGVmaW5lZDtcblx0cmV0dXJuIGhvdDtcbn1cblxuZnVuY3Rpb24gc2V0U3RhdHVzKG5ld1N0YXR1cykge1xuXHRjdXJyZW50U3RhdHVzID0gbmV3U3RhdHVzO1xuXHR2YXIgcmVzdWx0cyA9IFtdO1xuXG5cdGZvciAodmFyIGkgPSAwOyBpIDwgcmVnaXN0ZXJlZFN0YXR1c0hhbmRsZXJzLmxlbmd0aDsgaSsrKVxuXHRcdHJlc3VsdHNbaV0gPSByZWdpc3RlcmVkU3RhdHVzSGFuZGxlcnNbaV0uY2FsbChudWxsLCBuZXdTdGF0dXMpO1xuXG5cdHJldHVybiBQcm9taXNlLmFsbChyZXN1bHRzKS50aGVuKGZ1bmN0aW9uICgpIHt9KTtcbn1cblxuZnVuY3Rpb24gdW5ibG9jaygpIHtcblx0aWYgKC0tYmxvY2tpbmdQcm9taXNlcyA9PT0gMCkge1xuXHRcdHNldFN0YXR1cyhcInJlYWR5XCIpLnRoZW4oZnVuY3Rpb24gKCkge1xuXHRcdFx0aWYgKGJsb2NraW5nUHJvbWlzZXMgPT09IDApIHtcblx0XHRcdFx0dmFyIGxpc3QgPSBibG9ja2luZ1Byb21pc2VzV2FpdGluZztcblx0XHRcdFx0YmxvY2tpbmdQcm9taXNlc1dhaXRpbmcgPSBbXTtcblx0XHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdFx0bGlzdFtpXSgpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH1cbn1cblxuZnVuY3Rpb24gdHJhY2tCbG9ja2luZ1Byb21pc2UocHJvbWlzZSkge1xuXHRzd2l0Y2ggKGN1cnJlbnRTdGF0dXMpIHtcblx0XHRjYXNlIFwicmVhZHlcIjpcblx0XHRcdHNldFN0YXR1cyhcInByZXBhcmVcIik7XG5cdFx0LyogZmFsbHRocm91Z2ggKi9cblx0XHRjYXNlIFwicHJlcGFyZVwiOlxuXHRcdFx0YmxvY2tpbmdQcm9taXNlcysrO1xuXHRcdFx0cHJvbWlzZS50aGVuKHVuYmxvY2ssIHVuYmxvY2spO1xuXHRcdFx0cmV0dXJuIHByb21pc2U7XG5cdFx0ZGVmYXVsdDpcblx0XHRcdHJldHVybiBwcm9taXNlO1xuXHR9XG59XG5cbmZ1bmN0aW9uIHdhaXRGb3JCbG9ja2luZ1Byb21pc2VzKGZuKSB7XG5cdGlmIChibG9ja2luZ1Byb21pc2VzID09PSAwKSByZXR1cm4gZm4oKTtcblx0cmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlKSB7XG5cdFx0YmxvY2tpbmdQcm9taXNlc1dhaXRpbmcucHVzaChmdW5jdGlvbiAoKSB7XG5cdFx0XHRyZXNvbHZlKGZuKCkpO1xuXHRcdH0pO1xuXHR9KTtcbn1cblxuZnVuY3Rpb24gaG90Q2hlY2soYXBwbHlPblVwZGF0ZSkge1xuXHRpZiAoY3VycmVudFN0YXR1cyAhPT0gXCJpZGxlXCIpIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoXCJjaGVjaygpIGlzIG9ubHkgYWxsb3dlZCBpbiBpZGxlIHN0YXR1c1wiKTtcblx0fVxuXHRyZXR1cm4gc2V0U3RhdHVzKFwiY2hlY2tcIilcblx0XHQudGhlbihfX3dlYnBhY2tfcmVxdWlyZV9fLmhtck0pXG5cdFx0LnRoZW4oZnVuY3Rpb24gKHVwZGF0ZSkge1xuXHRcdFx0aWYgKCF1cGRhdGUpIHtcblx0XHRcdFx0cmV0dXJuIHNldFN0YXR1cyhhcHBseUludmFsaWRhdGVkTW9kdWxlcygpID8gXCJyZWFkeVwiIDogXCJpZGxlXCIpLnRoZW4oXG5cdFx0XHRcdFx0ZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRcdFx0cmV0dXJuIG51bGw7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHQpO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gc2V0U3RhdHVzKFwicHJlcGFyZVwiKS50aGVuKGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0dmFyIHVwZGF0ZWRNb2R1bGVzID0gW107XG5cdFx0XHRcdGN1cnJlbnRVcGRhdGVBcHBseUhhbmRsZXJzID0gW107XG5cblx0XHRcdFx0cmV0dXJuIFByb21pc2UuYWxsKFxuXHRcdFx0XHRcdE9iamVjdC5rZXlzKF9fd2VicGFja19yZXF1aXJlX18uaG1yQykucmVkdWNlKGZ1bmN0aW9uIChcblx0XHRcdFx0XHRcdHByb21pc2VzLFxuXHRcdFx0XHRcdFx0a2V5XG5cdFx0XHRcdFx0KSB7XG5cdFx0XHRcdFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmhtckNba2V5XShcblx0XHRcdFx0XHRcdFx0dXBkYXRlLmMsXG5cdFx0XHRcdFx0XHRcdHVwZGF0ZS5yLFxuXHRcdFx0XHRcdFx0XHR1cGRhdGUubSxcblx0XHRcdFx0XHRcdFx0cHJvbWlzZXMsXG5cdFx0XHRcdFx0XHRcdGN1cnJlbnRVcGRhdGVBcHBseUhhbmRsZXJzLFxuXHRcdFx0XHRcdFx0XHR1cGRhdGVkTW9kdWxlc1xuXHRcdFx0XHRcdFx0KTtcblx0XHRcdFx0XHRcdHJldHVybiBwcm9taXNlcztcblx0XHRcdFx0XHR9LCBbXSlcblx0XHRcdFx0KS50aGVuKGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0XHRyZXR1cm4gd2FpdEZvckJsb2NraW5nUHJvbWlzZXMoZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRcdFx0aWYgKGFwcGx5T25VcGRhdGUpIHtcblx0XHRcdFx0XHRcdFx0cmV0dXJuIGludGVybmFsQXBwbHkoYXBwbHlPblVwZGF0ZSk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRyZXR1cm4gc2V0U3RhdHVzKFwicmVhZHlcIikudGhlbihmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdFx0XHRcdHJldHVybiB1cGRhdGVkTW9kdWxlcztcblx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHR9KTtcblx0XHRcdH0pO1xuXHRcdH0pO1xufVxuXG5mdW5jdGlvbiBob3RBcHBseShvcHRpb25zKSB7XG5cdGlmIChjdXJyZW50U3RhdHVzICE9PSBcInJlYWR5XCIpIHtcblx0XHRyZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCkudGhlbihmdW5jdGlvbiAoKSB7XG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoXG5cdFx0XHRcdFwiYXBwbHkoKSBpcyBvbmx5IGFsbG93ZWQgaW4gcmVhZHkgc3RhdHVzIChzdGF0ZTogXCIgK1xuXHRcdFx0XHRcdGN1cnJlbnRTdGF0dXMgK1xuXHRcdFx0XHRcdFwiKVwiXG5cdFx0XHQpO1xuXHRcdH0pO1xuXHR9XG5cdHJldHVybiBpbnRlcm5hbEFwcGx5KG9wdGlvbnMpO1xufVxuXG5mdW5jdGlvbiBpbnRlcm5hbEFwcGx5KG9wdGlvbnMpIHtcblx0b3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG5cblx0YXBwbHlJbnZhbGlkYXRlZE1vZHVsZXMoKTtcblxuXHR2YXIgcmVzdWx0cyA9IGN1cnJlbnRVcGRhdGVBcHBseUhhbmRsZXJzLm1hcChmdW5jdGlvbiAoaGFuZGxlcikge1xuXHRcdHJldHVybiBoYW5kbGVyKG9wdGlvbnMpO1xuXHR9KTtcblx0Y3VycmVudFVwZGF0ZUFwcGx5SGFuZGxlcnMgPSB1bmRlZmluZWQ7XG5cblx0dmFyIGVycm9ycyA9IHJlc3VsdHNcblx0XHQubWFwKGZ1bmN0aW9uIChyKSB7XG5cdFx0XHRyZXR1cm4gci5lcnJvcjtcblx0XHR9KVxuXHRcdC5maWx0ZXIoQm9vbGVhbik7XG5cblx0aWYgKGVycm9ycy5sZW5ndGggPiAwKSB7XG5cdFx0cmV0dXJuIHNldFN0YXR1cyhcImFib3J0XCIpLnRoZW4oZnVuY3Rpb24gKCkge1xuXHRcdFx0dGhyb3cgZXJyb3JzWzBdO1xuXHRcdH0pO1xuXHR9XG5cblx0Ly8gTm93IGluIFwiZGlzcG9zZVwiIHBoYXNlXG5cdHZhciBkaXNwb3NlUHJvbWlzZSA9IHNldFN0YXR1cyhcImRpc3Bvc2VcIik7XG5cblx0cmVzdWx0cy5mb3JFYWNoKGZ1bmN0aW9uIChyZXN1bHQpIHtcblx0XHRpZiAocmVzdWx0LmRpc3Bvc2UpIHJlc3VsdC5kaXNwb3NlKCk7XG5cdH0pO1xuXG5cdC8vIE5vdyBpbiBcImFwcGx5XCIgcGhhc2Vcblx0dmFyIGFwcGx5UHJvbWlzZSA9IHNldFN0YXR1cyhcImFwcGx5XCIpO1xuXG5cdHZhciBlcnJvcjtcblx0dmFyIHJlcG9ydEVycm9yID0gZnVuY3Rpb24gKGVycikge1xuXHRcdGlmICghZXJyb3IpIGVycm9yID0gZXJyO1xuXHR9O1xuXG5cdHZhciBvdXRkYXRlZE1vZHVsZXMgPSBbXTtcblxuXHR2YXIgb25BY2NlcHRlZCA9IGZ1bmN0aW9uICgpIHtcblx0XHRyZXR1cm4gUHJvbWlzZS5hbGwoW2Rpc3Bvc2VQcm9taXNlLCBhcHBseVByb21pc2VdKS50aGVuKGZ1bmN0aW9uICgpIHtcblx0XHRcdC8vIGhhbmRsZSBlcnJvcnMgaW4gYWNjZXB0IGhhbmRsZXJzIGFuZCBzZWxmIGFjY2VwdGVkIG1vZHVsZSBsb2FkXG5cdFx0XHRpZiAoZXJyb3IpIHtcblx0XHRcdFx0cmV0dXJuIHNldFN0YXR1cyhcImZhaWxcIikudGhlbihmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdFx0dGhyb3cgZXJyb3I7XG5cdFx0XHRcdH0pO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAocXVldWVkSW52YWxpZGF0ZWRNb2R1bGVzKSB7XG5cdFx0XHRcdHJldHVybiBpbnRlcm5hbEFwcGx5KG9wdGlvbnMpLnRoZW4oZnVuY3Rpb24gKGxpc3QpIHtcblx0XHRcdFx0XHRvdXRkYXRlZE1vZHVsZXMuZm9yRWFjaChmdW5jdGlvbiAobW9kdWxlSWQpIHtcblx0XHRcdFx0XHRcdGlmIChsaXN0LmluZGV4T2YobW9kdWxlSWQpIDwgMCkgbGlzdC5wdXNoKG1vZHVsZUlkKTtcblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRyZXR1cm4gbGlzdDtcblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiBzZXRTdGF0dXMoXCJpZGxlXCIpLnRoZW4oZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRyZXR1cm4gb3V0ZGF0ZWRNb2R1bGVzO1xuXHRcdFx0fSk7XG5cdFx0fSk7XG5cdH07XG5cblx0cmV0dXJuIFByb21pc2UuYWxsKFxuXHRcdHJlc3VsdHNcblx0XHRcdC5maWx0ZXIoZnVuY3Rpb24gKHJlc3VsdCkge1xuXHRcdFx0XHRyZXR1cm4gcmVzdWx0LmFwcGx5O1xuXHRcdFx0fSlcblx0XHRcdC5tYXAoZnVuY3Rpb24gKHJlc3VsdCkge1xuXHRcdFx0XHRyZXR1cm4gcmVzdWx0LmFwcGx5KHJlcG9ydEVycm9yKTtcblx0XHRcdH0pXG5cdClcblx0XHQudGhlbihmdW5jdGlvbiAoYXBwbHlSZXN1bHRzKSB7XG5cdFx0XHRhcHBseVJlc3VsdHMuZm9yRWFjaChmdW5jdGlvbiAobW9kdWxlcykge1xuXHRcdFx0XHRpZiAobW9kdWxlcykge1xuXHRcdFx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgbW9kdWxlcy5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHRcdFx0b3V0ZGF0ZWRNb2R1bGVzLnB1c2gobW9kdWxlc1tpXSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHR9KVxuXHRcdC50aGVuKG9uQWNjZXB0ZWQpO1xufVxuXG5mdW5jdGlvbiBhcHBseUludmFsaWRhdGVkTW9kdWxlcygpIHtcblx0aWYgKHF1ZXVlZEludmFsaWRhdGVkTW9kdWxlcykge1xuXHRcdGlmICghY3VycmVudFVwZGF0ZUFwcGx5SGFuZGxlcnMpIGN1cnJlbnRVcGRhdGVBcHBseUhhbmRsZXJzID0gW107XG5cdFx0T2JqZWN0LmtleXMoX193ZWJwYWNrX3JlcXVpcmVfXy5obXJJKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcblx0XHRcdHF1ZXVlZEludmFsaWRhdGVkTW9kdWxlcy5mb3JFYWNoKGZ1bmN0aW9uIChtb2R1bGVJZCkge1xuXHRcdFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmhtcklba2V5XShcblx0XHRcdFx0XHRtb2R1bGVJZCxcblx0XHRcdFx0XHRjdXJyZW50VXBkYXRlQXBwbHlIYW5kbGVyc1xuXHRcdFx0XHQpO1xuXHRcdFx0fSk7XG5cdFx0fSk7XG5cdFx0cXVldWVkSW52YWxpZGF0ZWRNb2R1bGVzID0gdW5kZWZpbmVkO1xuXHRcdHJldHVybiB0cnVlO1xuXHR9XG59IiwidmFyIHNjcmlwdFVybDtcbmlmIChfX3dlYnBhY2tfcmVxdWlyZV9fLmcuaW1wb3J0U2NyaXB0cykgc2NyaXB0VXJsID0gX193ZWJwYWNrX3JlcXVpcmVfXy5nLmxvY2F0aW9uICsgXCJcIjtcbnZhciBkb2N1bWVudCA9IF9fd2VicGFja19yZXF1aXJlX18uZy5kb2N1bWVudDtcbmlmICghc2NyaXB0VXJsICYmIGRvY3VtZW50KSB7XG5cdGlmIChkb2N1bWVudC5jdXJyZW50U2NyaXB0ICYmIGRvY3VtZW50LmN1cnJlbnRTY3JpcHQudGFnTmFtZS50b1VwcGVyQ2FzZSgpID09PSAnU0NSSVBUJylcblx0XHRzY3JpcHRVcmwgPSBkb2N1bWVudC5jdXJyZW50U2NyaXB0LnNyYztcblx0aWYgKCFzY3JpcHRVcmwpIHtcblx0XHR2YXIgc2NyaXB0cyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwic2NyaXB0XCIpO1xuXHRcdGlmKHNjcmlwdHMubGVuZ3RoKSB7XG5cdFx0XHR2YXIgaSA9IHNjcmlwdHMubGVuZ3RoIC0gMTtcblx0XHRcdHdoaWxlIChpID4gLTEgJiYgKCFzY3JpcHRVcmwgfHwgIS9eaHR0cChzPyk6Ly50ZXN0KHNjcmlwdFVybCkpKSBzY3JpcHRVcmwgPSBzY3JpcHRzW2ktLV0uc3JjO1xuXHRcdH1cblx0fVxufVxuLy8gV2hlbiBzdXBwb3J0aW5nIGJyb3dzZXJzIHdoZXJlIGFuIGF1dG9tYXRpYyBwdWJsaWNQYXRoIGlzIG5vdCBzdXBwb3J0ZWQgeW91IG11c3Qgc3BlY2lmeSBhbiBvdXRwdXQucHVibGljUGF0aCBtYW51YWxseSB2aWEgY29uZmlndXJhdGlvblxuLy8gb3IgcGFzcyBhbiBlbXB0eSBzdHJpbmcgKFwiXCIpIGFuZCBzZXQgdGhlIF9fd2VicGFja19wdWJsaWNfcGF0aF9fIHZhcmlhYmxlIGZyb20geW91ciBjb2RlIHRvIHVzZSB5b3VyIG93biBsb2dpYy5cbmlmICghc2NyaXB0VXJsKSB0aHJvdyBuZXcgRXJyb3IoXCJBdXRvbWF0aWMgcHVibGljUGF0aCBpcyBub3Qgc3VwcG9ydGVkIGluIHRoaXMgYnJvd3NlclwiKTtcbnNjcmlwdFVybCA9IHNjcmlwdFVybC5yZXBsYWNlKC9eYmxvYjovLCBcIlwiKS5yZXBsYWNlKC8jLiokLywgXCJcIikucmVwbGFjZSgvXFw/LiokLywgXCJcIikucmVwbGFjZSgvXFwvW15cXC9dKyQvLCBcIi9cIik7XG5fX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBzY3JpcHRVcmw7IiwiaWYgKHR5cGVvZiBkb2N1bWVudCA9PT0gXCJ1bmRlZmluZWRcIikgcmV0dXJuO1xudmFyIGNyZWF0ZVN0eWxlc2hlZXQgPSAoY2h1bmtJZCwgZnVsbGhyZWYsIG9sZFRhZywgcmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cdHZhciBsaW5rVGFnID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpbmtcIik7XG5cblx0bGlua1RhZy5yZWwgPSBcInN0eWxlc2hlZXRcIjtcblx0bGlua1RhZy50eXBlID0gXCJ0ZXh0L2Nzc1wiO1xuXHRpZiAoX193ZWJwYWNrX3JlcXVpcmVfXy5uYykge1xuXHRcdGxpbmtUYWcubm9uY2UgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLm5jO1xuXHR9XG5cdHZhciBvbkxpbmtDb21wbGV0ZSA9IChldmVudCkgPT4ge1xuXHRcdC8vIGF2b2lkIG1lbSBsZWFrcy5cblx0XHRsaW5rVGFnLm9uZXJyb3IgPSBsaW5rVGFnLm9ubG9hZCA9IG51bGw7XG5cdFx0aWYgKGV2ZW50LnR5cGUgPT09ICdsb2FkJykge1xuXHRcdFx0cmVzb2x2ZSgpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR2YXIgZXJyb3JUeXBlID0gZXZlbnQgJiYgZXZlbnQudHlwZTtcblx0XHRcdHZhciByZWFsSHJlZiA9IGV2ZW50ICYmIGV2ZW50LnRhcmdldCAmJiBldmVudC50YXJnZXQuaHJlZiB8fCBmdWxsaHJlZjtcblx0XHRcdHZhciBlcnIgPSBuZXcgRXJyb3IoXCJMb2FkaW5nIENTUyBjaHVuayBcIiArIGNodW5rSWQgKyBcIiBmYWlsZWQuXFxuKFwiICsgZXJyb3JUeXBlICsgXCI6IFwiICsgcmVhbEhyZWYgKyBcIilcIik7XG5cdFx0XHRlcnIubmFtZSA9IFwiQ2h1bmtMb2FkRXJyb3JcIjtcblx0XHRcdGVyci5jb2RlID0gXCJDU1NfQ0hVTktfTE9BRF9GQUlMRURcIjtcblx0XHRcdGVyci50eXBlID0gZXJyb3JUeXBlO1xuXHRcdFx0ZXJyLnJlcXVlc3QgPSByZWFsSHJlZjtcblx0XHRcdGlmIChsaW5rVGFnLnBhcmVudE5vZGUpIGxpbmtUYWcucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChsaW5rVGFnKVxuXHRcdFx0cmVqZWN0KGVycik7XG5cdFx0fVxuXHR9XG5cdGxpbmtUYWcub25lcnJvciA9IGxpbmtUYWcub25sb2FkID0gb25MaW5rQ29tcGxldGU7XG5cdGxpbmtUYWcuaHJlZiA9IGZ1bGxocmVmO1xuXG5cblx0aWYgKG9sZFRhZykge1xuXHRcdG9sZFRhZy5wYXJlbnROb2RlLmluc2VydEJlZm9yZShsaW5rVGFnLCBvbGRUYWcubmV4dFNpYmxpbmcpO1xuXHR9IGVsc2Uge1xuXHRcdGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQobGlua1RhZyk7XG5cdH1cblx0cmV0dXJuIGxpbmtUYWc7XG59O1xudmFyIGZpbmRTdHlsZXNoZWV0ID0gKGhyZWYsIGZ1bGxocmVmKSA9PiB7XG5cdHZhciBleGlzdGluZ0xpbmtUYWdzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJsaW5rXCIpO1xuXHRmb3IodmFyIGkgPSAwOyBpIDwgZXhpc3RpbmdMaW5rVGFncy5sZW5ndGg7IGkrKykge1xuXHRcdHZhciB0YWcgPSBleGlzdGluZ0xpbmtUYWdzW2ldO1xuXHRcdHZhciBkYXRhSHJlZiA9IHRhZy5nZXRBdHRyaWJ1dGUoXCJkYXRhLWhyZWZcIikgfHwgdGFnLmdldEF0dHJpYnV0ZShcImhyZWZcIik7XG5cdFx0aWYodGFnLnJlbCA9PT0gXCJzdHlsZXNoZWV0XCIgJiYgKGRhdGFIcmVmID09PSBocmVmIHx8IGRhdGFIcmVmID09PSBmdWxsaHJlZikpIHJldHVybiB0YWc7XG5cdH1cblx0dmFyIGV4aXN0aW5nU3R5bGVUYWdzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJzdHlsZVwiKTtcblx0Zm9yKHZhciBpID0gMDsgaSA8IGV4aXN0aW5nU3R5bGVUYWdzLmxlbmd0aDsgaSsrKSB7XG5cdFx0dmFyIHRhZyA9IGV4aXN0aW5nU3R5bGVUYWdzW2ldO1xuXHRcdHZhciBkYXRhSHJlZiA9IHRhZy5nZXRBdHRyaWJ1dGUoXCJkYXRhLWhyZWZcIik7XG5cdFx0aWYoZGF0YUhyZWYgPT09IGhyZWYgfHwgZGF0YUhyZWYgPT09IGZ1bGxocmVmKSByZXR1cm4gdGFnO1xuXHR9XG59O1xudmFyIGxvYWRTdHlsZXNoZWV0ID0gKGNodW5rSWQpID0+IHtcblx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcblx0XHR2YXIgaHJlZiA9IF9fd2VicGFja19yZXF1aXJlX18ubWluaUNzc0YoY2h1bmtJZCk7XG5cdFx0dmFyIGZ1bGxocmVmID0gX193ZWJwYWNrX3JlcXVpcmVfXy5wICsgaHJlZjtcblx0XHRpZihmaW5kU3R5bGVzaGVldChocmVmLCBmdWxsaHJlZikpIHJldHVybiByZXNvbHZlKCk7XG5cdFx0Y3JlYXRlU3R5bGVzaGVldChjaHVua0lkLCBmdWxsaHJlZiwgbnVsbCwgcmVzb2x2ZSwgcmVqZWN0KTtcblx0fSk7XG59XG4vLyBubyBjaHVuayBsb2FkaW5nXG5cbnZhciBvbGRUYWdzID0gW107XG52YXIgbmV3VGFncyA9IFtdO1xudmFyIGFwcGx5SGFuZGxlciA9IChvcHRpb25zKSA9PiB7XG5cdHJldHVybiB7IGRpc3Bvc2U6ICgpID0+IHtcblx0XHRmb3IodmFyIGkgPSAwOyBpIDwgb2xkVGFncy5sZW5ndGg7IGkrKykge1xuXHRcdFx0dmFyIG9sZFRhZyA9IG9sZFRhZ3NbaV07XG5cdFx0XHRpZihvbGRUYWcucGFyZW50Tm9kZSkgb2xkVGFnLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQob2xkVGFnKTtcblx0XHR9XG5cdFx0b2xkVGFncy5sZW5ndGggPSAwO1xuXHR9LCBhcHBseTogKCkgPT4ge1xuXHRcdGZvcih2YXIgaSA9IDA7IGkgPCBuZXdUYWdzLmxlbmd0aDsgaSsrKSBuZXdUYWdzW2ldLnJlbCA9IFwic3R5bGVzaGVldFwiO1xuXHRcdG5ld1RhZ3MubGVuZ3RoID0gMDtcblx0fSB9O1xufVxuX193ZWJwYWNrX3JlcXVpcmVfXy5obXJDLm1pbmlDc3MgPSAoY2h1bmtJZHMsIHJlbW92ZWRDaHVua3MsIHJlbW92ZWRNb2R1bGVzLCBwcm9taXNlcywgYXBwbHlIYW5kbGVycywgdXBkYXRlZE1vZHVsZXNMaXN0KSA9PiB7XG5cdGFwcGx5SGFuZGxlcnMucHVzaChhcHBseUhhbmRsZXIpO1xuXHRjaHVua0lkcy5mb3JFYWNoKChjaHVua0lkKSA9PiB7XG5cdFx0dmFyIGhyZWYgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLm1pbmlDc3NGKGNodW5rSWQpO1xuXHRcdHZhciBmdWxsaHJlZiA9IF9fd2VicGFja19yZXF1aXJlX18ucCArIGhyZWY7XG5cdFx0dmFyIG9sZFRhZyA9IGZpbmRTdHlsZXNoZWV0KGhyZWYsIGZ1bGxocmVmKTtcblx0XHRpZighb2xkVGFnKSByZXR1cm47XG5cdFx0cHJvbWlzZXMucHVzaChuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cdFx0XHR2YXIgdGFnID0gY3JlYXRlU3R5bGVzaGVldChjaHVua0lkLCBmdWxsaHJlZiwgb2xkVGFnLCAoKSA9PiB7XG5cdFx0XHRcdHRhZy5hcyA9IFwic3R5bGVcIjtcblx0XHRcdFx0dGFnLnJlbCA9IFwicHJlbG9hZFwiO1xuXHRcdFx0XHRyZXNvbHZlKCk7XG5cdFx0XHR9LCByZWplY3QpO1xuXHRcdFx0b2xkVGFncy5wdXNoKG9sZFRhZyk7XG5cdFx0XHRuZXdUYWdzLnB1c2godGFnKTtcblx0XHR9KSk7XG5cdH0pO1xufVxuXG4vLyBubyBwcmVmZXRjaGluZ1xuXG4vLyBubyBwcmVsb2FkZWQiLCIvLyBubyBiYXNlVVJJXG5cbi8vIG9iamVjdCB0byBzdG9yZSBsb2FkZWQgYW5kIGxvYWRpbmcgY2h1bmtzXG4vLyB1bmRlZmluZWQgPSBjaHVuayBub3QgbG9hZGVkLCBudWxsID0gY2h1bmsgcHJlbG9hZGVkL3ByZWZldGNoZWRcbi8vIFtyZXNvbHZlLCByZWplY3QsIFByb21pc2VdID0gY2h1bmsgbG9hZGluZywgMCA9IGNodW5rIGxvYWRlZFxudmFyIGluc3RhbGxlZENodW5rcyA9IF9fd2VicGFja19yZXF1aXJlX18uaG1yU19qc29ucCA9IF9fd2VicGFja19yZXF1aXJlX18uaG1yU19qc29ucCB8fCB7XG5cdFwibWFpblwiOiAwXG59O1xuXG4vLyBubyBjaHVuayBvbiBkZW1hbmQgbG9hZGluZ1xuXG4vLyBubyBwcmVmZXRjaGluZ1xuXG4vLyBubyBwcmVsb2FkZWRcblxudmFyIGN1cnJlbnRVcGRhdGVkTW9kdWxlc0xpc3Q7XG52YXIgd2FpdGluZ1VwZGF0ZVJlc29sdmVzID0ge307XG5mdW5jdGlvbiBsb2FkVXBkYXRlQ2h1bmsoY2h1bmtJZCwgdXBkYXRlZE1vZHVsZXNMaXN0KSB7XG5cdGN1cnJlbnRVcGRhdGVkTW9kdWxlc0xpc3QgPSB1cGRhdGVkTW9kdWxlc0xpc3Q7XG5cdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cdFx0d2FpdGluZ1VwZGF0ZVJlc29sdmVzW2NodW5rSWRdID0gcmVzb2x2ZTtcblx0XHQvLyBzdGFydCB1cGRhdGUgY2h1bmsgbG9hZGluZ1xuXHRcdHZhciB1cmwgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLnAgKyBfX3dlYnBhY2tfcmVxdWlyZV9fLmh1KGNodW5rSWQpO1xuXHRcdC8vIGNyZWF0ZSBlcnJvciBiZWZvcmUgc3RhY2sgdW53b3VuZCB0byBnZXQgdXNlZnVsIHN0YWNrdHJhY2UgbGF0ZXJcblx0XHR2YXIgZXJyb3IgPSBuZXcgRXJyb3IoKTtcblx0XHR2YXIgbG9hZGluZ0VuZGVkID0gKGV2ZW50KSA9PiB7XG5cdFx0XHRpZih3YWl0aW5nVXBkYXRlUmVzb2x2ZXNbY2h1bmtJZF0pIHtcblx0XHRcdFx0d2FpdGluZ1VwZGF0ZVJlc29sdmVzW2NodW5rSWRdID0gdW5kZWZpbmVkXG5cdFx0XHRcdHZhciBlcnJvclR5cGUgPSBldmVudCAmJiAoZXZlbnQudHlwZSA9PT0gJ2xvYWQnID8gJ21pc3NpbmcnIDogZXZlbnQudHlwZSk7XG5cdFx0XHRcdHZhciByZWFsU3JjID0gZXZlbnQgJiYgZXZlbnQudGFyZ2V0ICYmIGV2ZW50LnRhcmdldC5zcmM7XG5cdFx0XHRcdGVycm9yLm1lc3NhZ2UgPSAnTG9hZGluZyBob3QgdXBkYXRlIGNodW5rICcgKyBjaHVua0lkICsgJyBmYWlsZWQuXFxuKCcgKyBlcnJvclR5cGUgKyAnOiAnICsgcmVhbFNyYyArICcpJztcblx0XHRcdFx0ZXJyb3IubmFtZSA9ICdDaHVua0xvYWRFcnJvcic7XG5cdFx0XHRcdGVycm9yLnR5cGUgPSBlcnJvclR5cGU7XG5cdFx0XHRcdGVycm9yLnJlcXVlc3QgPSByZWFsU3JjO1xuXHRcdFx0XHRyZWplY3QoZXJyb3IpO1xuXHRcdFx0fVxuXHRcdH07XG5cdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5sKHVybCwgbG9hZGluZ0VuZGVkKTtcblx0fSk7XG59XG5cbnNlbGZbXCJ3ZWJwYWNrSG90VXBkYXRldmFuaWxsYV9qYXZhc2NyaXB0X3F1aWNrX3N0YXJ0XCJdID0gKGNodW5rSWQsIG1vcmVNb2R1bGVzLCBydW50aW1lKSA9PiB7XG5cdGZvcih2YXIgbW9kdWxlSWQgaW4gbW9yZU1vZHVsZXMpIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8obW9yZU1vZHVsZXMsIG1vZHVsZUlkKSkge1xuXHRcdFx0Y3VycmVudFVwZGF0ZVttb2R1bGVJZF0gPSBtb3JlTW9kdWxlc1ttb2R1bGVJZF07XG5cdFx0XHRpZihjdXJyZW50VXBkYXRlZE1vZHVsZXNMaXN0KSBjdXJyZW50VXBkYXRlZE1vZHVsZXNMaXN0LnB1c2gobW9kdWxlSWQpO1xuXHRcdH1cblx0fVxuXHRpZihydW50aW1lKSBjdXJyZW50VXBkYXRlUnVudGltZS5wdXNoKHJ1bnRpbWUpO1xuXHRpZih3YWl0aW5nVXBkYXRlUmVzb2x2ZXNbY2h1bmtJZF0pIHtcblx0XHR3YWl0aW5nVXBkYXRlUmVzb2x2ZXNbY2h1bmtJZF0oKTtcblx0XHR3YWl0aW5nVXBkYXRlUmVzb2x2ZXNbY2h1bmtJZF0gPSB1bmRlZmluZWQ7XG5cdH1cbn07XG5cbnZhciBjdXJyZW50VXBkYXRlQ2h1bmtzO1xudmFyIGN1cnJlbnRVcGRhdGU7XG52YXIgY3VycmVudFVwZGF0ZVJlbW92ZWRDaHVua3M7XG52YXIgY3VycmVudFVwZGF0ZVJ1bnRpbWU7XG5mdW5jdGlvbiBhcHBseUhhbmRsZXIob3B0aW9ucykge1xuXHRpZiAoX193ZWJwYWNrX3JlcXVpcmVfXy5mKSBkZWxldGUgX193ZWJwYWNrX3JlcXVpcmVfXy5mLmpzb25wSG1yO1xuXHRjdXJyZW50VXBkYXRlQ2h1bmtzID0gdW5kZWZpbmVkO1xuXHRmdW5jdGlvbiBnZXRBZmZlY3RlZE1vZHVsZUVmZmVjdHModXBkYXRlTW9kdWxlSWQpIHtcblx0XHR2YXIgb3V0ZGF0ZWRNb2R1bGVzID0gW3VwZGF0ZU1vZHVsZUlkXTtcblx0XHR2YXIgb3V0ZGF0ZWREZXBlbmRlbmNpZXMgPSB7fTtcblxuXHRcdHZhciBxdWV1ZSA9IG91dGRhdGVkTW9kdWxlcy5tYXAoZnVuY3Rpb24gKGlkKSB7XG5cdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHRjaGFpbjogW2lkXSxcblx0XHRcdFx0aWQ6IGlkXG5cdFx0XHR9O1xuXHRcdH0pO1xuXHRcdHdoaWxlIChxdWV1ZS5sZW5ndGggPiAwKSB7XG5cdFx0XHR2YXIgcXVldWVJdGVtID0gcXVldWUucG9wKCk7XG5cdFx0XHR2YXIgbW9kdWxlSWQgPSBxdWV1ZUl0ZW0uaWQ7XG5cdFx0XHR2YXIgY2hhaW4gPSBxdWV1ZUl0ZW0uY2hhaW47XG5cdFx0XHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX3JlcXVpcmVfXy5jW21vZHVsZUlkXTtcblx0XHRcdGlmIChcblx0XHRcdFx0IW1vZHVsZSB8fFxuXHRcdFx0XHQobW9kdWxlLmhvdC5fc2VsZkFjY2VwdGVkICYmICFtb2R1bGUuaG90Ll9zZWxmSW52YWxpZGF0ZWQpXG5cdFx0XHQpXG5cdFx0XHRcdGNvbnRpbnVlO1xuXHRcdFx0aWYgKG1vZHVsZS5ob3QuX3NlbGZEZWNsaW5lZCkge1xuXHRcdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHRcdHR5cGU6IFwic2VsZi1kZWNsaW5lZFwiLFxuXHRcdFx0XHRcdGNoYWluOiBjaGFpbixcblx0XHRcdFx0XHRtb2R1bGVJZDogbW9kdWxlSWRcblx0XHRcdFx0fTtcblx0XHRcdH1cblx0XHRcdGlmIChtb2R1bGUuaG90Ll9tYWluKSB7XG5cdFx0XHRcdHJldHVybiB7XG5cdFx0XHRcdFx0dHlwZTogXCJ1bmFjY2VwdGVkXCIsXG5cdFx0XHRcdFx0Y2hhaW46IGNoYWluLFxuXHRcdFx0XHRcdG1vZHVsZUlkOiBtb2R1bGVJZFxuXHRcdFx0XHR9O1xuXHRcdFx0fVxuXHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBtb2R1bGUucGFyZW50cy5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHR2YXIgcGFyZW50SWQgPSBtb2R1bGUucGFyZW50c1tpXTtcblx0XHRcdFx0dmFyIHBhcmVudCA9IF9fd2VicGFja19yZXF1aXJlX18uY1twYXJlbnRJZF07XG5cdFx0XHRcdGlmICghcGFyZW50KSBjb250aW51ZTtcblx0XHRcdFx0aWYgKHBhcmVudC5ob3QuX2RlY2xpbmVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXSkge1xuXHRcdFx0XHRcdHJldHVybiB7XG5cdFx0XHRcdFx0XHR0eXBlOiBcImRlY2xpbmVkXCIsXG5cdFx0XHRcdFx0XHRjaGFpbjogY2hhaW4uY29uY2F0KFtwYXJlbnRJZF0pLFxuXHRcdFx0XHRcdFx0bW9kdWxlSWQ6IG1vZHVsZUlkLFxuXHRcdFx0XHRcdFx0cGFyZW50SWQ6IHBhcmVudElkXG5cdFx0XHRcdFx0fTtcblx0XHRcdFx0fVxuXHRcdFx0XHRpZiAob3V0ZGF0ZWRNb2R1bGVzLmluZGV4T2YocGFyZW50SWQpICE9PSAtMSkgY29udGludWU7XG5cdFx0XHRcdGlmIChwYXJlbnQuaG90Ll9hY2NlcHRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF0pIHtcblx0XHRcdFx0XHRpZiAoIW91dGRhdGVkRGVwZW5kZW5jaWVzW3BhcmVudElkXSlcblx0XHRcdFx0XHRcdG91dGRhdGVkRGVwZW5kZW5jaWVzW3BhcmVudElkXSA9IFtdO1xuXHRcdFx0XHRcdGFkZEFsbFRvU2V0KG91dGRhdGVkRGVwZW5kZW5jaWVzW3BhcmVudElkXSwgW21vZHVsZUlkXSk7XG5cdFx0XHRcdFx0Y29udGludWU7XG5cdFx0XHRcdH1cblx0XHRcdFx0ZGVsZXRlIG91dGRhdGVkRGVwZW5kZW5jaWVzW3BhcmVudElkXTtcblx0XHRcdFx0b3V0ZGF0ZWRNb2R1bGVzLnB1c2gocGFyZW50SWQpO1xuXHRcdFx0XHRxdWV1ZS5wdXNoKHtcblx0XHRcdFx0XHRjaGFpbjogY2hhaW4uY29uY2F0KFtwYXJlbnRJZF0pLFxuXHRcdFx0XHRcdGlkOiBwYXJlbnRJZFxuXHRcdFx0XHR9KTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4ge1xuXHRcdFx0dHlwZTogXCJhY2NlcHRlZFwiLFxuXHRcdFx0bW9kdWxlSWQ6IHVwZGF0ZU1vZHVsZUlkLFxuXHRcdFx0b3V0ZGF0ZWRNb2R1bGVzOiBvdXRkYXRlZE1vZHVsZXMsXG5cdFx0XHRvdXRkYXRlZERlcGVuZGVuY2llczogb3V0ZGF0ZWREZXBlbmRlbmNpZXNcblx0XHR9O1xuXHR9XG5cblx0ZnVuY3Rpb24gYWRkQWxsVG9TZXQoYSwgYikge1xuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgYi5sZW5ndGg7IGkrKykge1xuXHRcdFx0dmFyIGl0ZW0gPSBiW2ldO1xuXHRcdFx0aWYgKGEuaW5kZXhPZihpdGVtKSA9PT0gLTEpIGEucHVzaChpdGVtKTtcblx0XHR9XG5cdH1cblxuXHQvLyBhdCBiZWdpbiBhbGwgdXBkYXRlcyBtb2R1bGVzIGFyZSBvdXRkYXRlZFxuXHQvLyB0aGUgXCJvdXRkYXRlZFwiIHN0YXR1cyBjYW4gcHJvcGFnYXRlIHRvIHBhcmVudHMgaWYgdGhleSBkb24ndCBhY2NlcHQgdGhlIGNoaWxkcmVuXG5cdHZhciBvdXRkYXRlZERlcGVuZGVuY2llcyA9IHt9O1xuXHR2YXIgb3V0ZGF0ZWRNb2R1bGVzID0gW107XG5cdHZhciBhcHBsaWVkVXBkYXRlID0ge307XG5cblx0dmFyIHdhcm5VbmV4cGVjdGVkUmVxdWlyZSA9IGZ1bmN0aW9uIHdhcm5VbmV4cGVjdGVkUmVxdWlyZShtb2R1bGUpIHtcblx0XHRjb25zb2xlLndhcm4oXG5cdFx0XHRcIltITVJdIHVuZXhwZWN0ZWQgcmVxdWlyZShcIiArIG1vZHVsZS5pZCArIFwiKSB0byBkaXNwb3NlZCBtb2R1bGVcIlxuXHRcdCk7XG5cdH07XG5cblx0Zm9yICh2YXIgbW9kdWxlSWQgaW4gY3VycmVudFVwZGF0ZSkge1xuXHRcdGlmIChfX3dlYnBhY2tfcmVxdWlyZV9fLm8oY3VycmVudFVwZGF0ZSwgbW9kdWxlSWQpKSB7XG5cdFx0XHR2YXIgbmV3TW9kdWxlRmFjdG9yeSA9IGN1cnJlbnRVcGRhdGVbbW9kdWxlSWRdO1xuXHRcdFx0dmFyIHJlc3VsdCA9IG5ld01vZHVsZUZhY3Rvcnlcblx0XHRcdFx0PyBnZXRBZmZlY3RlZE1vZHVsZUVmZmVjdHMobW9kdWxlSWQpXG5cdFx0XHRcdDoge1xuXHRcdFx0XHRcdFx0dHlwZTogXCJkaXNwb3NlZFwiLFxuXHRcdFx0XHRcdFx0bW9kdWxlSWQ6IG1vZHVsZUlkXG5cdFx0XHRcdFx0fTtcblx0XHRcdC8qKiBAdHlwZSB7RXJyb3J8ZmFsc2V9ICovXG5cdFx0XHR2YXIgYWJvcnRFcnJvciA9IGZhbHNlO1xuXHRcdFx0dmFyIGRvQXBwbHkgPSBmYWxzZTtcblx0XHRcdHZhciBkb0Rpc3Bvc2UgPSBmYWxzZTtcblx0XHRcdHZhciBjaGFpbkluZm8gPSBcIlwiO1xuXHRcdFx0aWYgKHJlc3VsdC5jaGFpbikge1xuXHRcdFx0XHRjaGFpbkluZm8gPSBcIlxcblVwZGF0ZSBwcm9wYWdhdGlvbjogXCIgKyByZXN1bHQuY2hhaW4uam9pbihcIiAtPiBcIik7XG5cdFx0XHR9XG5cdFx0XHRzd2l0Y2ggKHJlc3VsdC50eXBlKSB7XG5cdFx0XHRcdGNhc2UgXCJzZWxmLWRlY2xpbmVkXCI6XG5cdFx0XHRcdFx0aWYgKG9wdGlvbnMub25EZWNsaW5lZCkgb3B0aW9ucy5vbkRlY2xpbmVkKHJlc3VsdCk7XG5cdFx0XHRcdFx0aWYgKCFvcHRpb25zLmlnbm9yZURlY2xpbmVkKVxuXHRcdFx0XHRcdFx0YWJvcnRFcnJvciA9IG5ldyBFcnJvcihcblx0XHRcdFx0XHRcdFx0XCJBYm9ydGVkIGJlY2F1c2Ugb2Ygc2VsZiBkZWNsaW5lOiBcIiArXG5cdFx0XHRcdFx0XHRcdFx0cmVzdWx0Lm1vZHVsZUlkICtcblx0XHRcdFx0XHRcdFx0XHRjaGFpbkluZm9cblx0XHRcdFx0XHRcdCk7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdGNhc2UgXCJkZWNsaW5lZFwiOlxuXHRcdFx0XHRcdGlmIChvcHRpb25zLm9uRGVjbGluZWQpIG9wdGlvbnMub25EZWNsaW5lZChyZXN1bHQpO1xuXHRcdFx0XHRcdGlmICghb3B0aW9ucy5pZ25vcmVEZWNsaW5lZClcblx0XHRcdFx0XHRcdGFib3J0RXJyb3IgPSBuZXcgRXJyb3IoXG5cdFx0XHRcdFx0XHRcdFwiQWJvcnRlZCBiZWNhdXNlIG9mIGRlY2xpbmVkIGRlcGVuZGVuY3k6IFwiICtcblx0XHRcdFx0XHRcdFx0XHRyZXN1bHQubW9kdWxlSWQgK1xuXHRcdFx0XHRcdFx0XHRcdFwiIGluIFwiICtcblx0XHRcdFx0XHRcdFx0XHRyZXN1bHQucGFyZW50SWQgK1xuXHRcdFx0XHRcdFx0XHRcdGNoYWluSW5mb1xuXHRcdFx0XHRcdFx0KTtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0Y2FzZSBcInVuYWNjZXB0ZWRcIjpcblx0XHRcdFx0XHRpZiAob3B0aW9ucy5vblVuYWNjZXB0ZWQpIG9wdGlvbnMub25VbmFjY2VwdGVkKHJlc3VsdCk7XG5cdFx0XHRcdFx0aWYgKCFvcHRpb25zLmlnbm9yZVVuYWNjZXB0ZWQpXG5cdFx0XHRcdFx0XHRhYm9ydEVycm9yID0gbmV3IEVycm9yKFxuXHRcdFx0XHRcdFx0XHRcIkFib3J0ZWQgYmVjYXVzZSBcIiArIG1vZHVsZUlkICsgXCIgaXMgbm90IGFjY2VwdGVkXCIgKyBjaGFpbkluZm9cblx0XHRcdFx0XHRcdCk7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdGNhc2UgXCJhY2NlcHRlZFwiOlxuXHRcdFx0XHRcdGlmIChvcHRpb25zLm9uQWNjZXB0ZWQpIG9wdGlvbnMub25BY2NlcHRlZChyZXN1bHQpO1xuXHRcdFx0XHRcdGRvQXBwbHkgPSB0cnVlO1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRjYXNlIFwiZGlzcG9zZWRcIjpcblx0XHRcdFx0XHRpZiAob3B0aW9ucy5vbkRpc3Bvc2VkKSBvcHRpb25zLm9uRGlzcG9zZWQocmVzdWx0KTtcblx0XHRcdFx0XHRkb0Rpc3Bvc2UgPSB0cnVlO1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHRcdHRocm93IG5ldyBFcnJvcihcIlVuZXhjZXB0aW9uIHR5cGUgXCIgKyByZXN1bHQudHlwZSk7XG5cdFx0XHR9XG5cdFx0XHRpZiAoYWJvcnRFcnJvcikge1xuXHRcdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHRcdGVycm9yOiBhYm9ydEVycm9yXG5cdFx0XHRcdH07XG5cdFx0XHR9XG5cdFx0XHRpZiAoZG9BcHBseSkge1xuXHRcdFx0XHRhcHBsaWVkVXBkYXRlW21vZHVsZUlkXSA9IG5ld01vZHVsZUZhY3Rvcnk7XG5cdFx0XHRcdGFkZEFsbFRvU2V0KG91dGRhdGVkTW9kdWxlcywgcmVzdWx0Lm91dGRhdGVkTW9kdWxlcyk7XG5cdFx0XHRcdGZvciAobW9kdWxlSWQgaW4gcmVzdWx0Lm91dGRhdGVkRGVwZW5kZW5jaWVzKSB7XG5cdFx0XHRcdFx0aWYgKF9fd2VicGFja19yZXF1aXJlX18ubyhyZXN1bHQub3V0ZGF0ZWREZXBlbmRlbmNpZXMsIG1vZHVsZUlkKSkge1xuXHRcdFx0XHRcdFx0aWYgKCFvdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF0pXG5cdFx0XHRcdFx0XHRcdG91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXSA9IFtdO1xuXHRcdFx0XHRcdFx0YWRkQWxsVG9TZXQoXG5cdFx0XHRcdFx0XHRcdG91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXSxcblx0XHRcdFx0XHRcdFx0cmVzdWx0Lm91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXVxuXHRcdFx0XHRcdFx0KTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdGlmIChkb0Rpc3Bvc2UpIHtcblx0XHRcdFx0YWRkQWxsVG9TZXQob3V0ZGF0ZWRNb2R1bGVzLCBbcmVzdWx0Lm1vZHVsZUlkXSk7XG5cdFx0XHRcdGFwcGxpZWRVcGRhdGVbbW9kdWxlSWRdID0gd2FyblVuZXhwZWN0ZWRSZXF1aXJlO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXHRjdXJyZW50VXBkYXRlID0gdW5kZWZpbmVkO1xuXG5cdC8vIFN0b3JlIHNlbGYgYWNjZXB0ZWQgb3V0ZGF0ZWQgbW9kdWxlcyB0byByZXF1aXJlIHRoZW0gbGF0ZXIgYnkgdGhlIG1vZHVsZSBzeXN0ZW1cblx0dmFyIG91dGRhdGVkU2VsZkFjY2VwdGVkTW9kdWxlcyA9IFtdO1xuXHRmb3IgKHZhciBqID0gMDsgaiA8IG91dGRhdGVkTW9kdWxlcy5sZW5ndGg7IGorKykge1xuXHRcdHZhciBvdXRkYXRlZE1vZHVsZUlkID0gb3V0ZGF0ZWRNb2R1bGVzW2pdO1xuXHRcdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLmNbb3V0ZGF0ZWRNb2R1bGVJZF07XG5cdFx0aWYgKFxuXHRcdFx0bW9kdWxlICYmXG5cdFx0XHQobW9kdWxlLmhvdC5fc2VsZkFjY2VwdGVkIHx8IG1vZHVsZS5ob3QuX21haW4pICYmXG5cdFx0XHQvLyByZW1vdmVkIHNlbGYtYWNjZXB0ZWQgbW9kdWxlcyBzaG91bGQgbm90IGJlIHJlcXVpcmVkXG5cdFx0XHRhcHBsaWVkVXBkYXRlW291dGRhdGVkTW9kdWxlSWRdICE9PSB3YXJuVW5leHBlY3RlZFJlcXVpcmUgJiZcblx0XHRcdC8vIHdoZW4gY2FsbGVkIGludmFsaWRhdGUgc2VsZi1hY2NlcHRpbmcgaXMgbm90IHBvc3NpYmxlXG5cdFx0XHQhbW9kdWxlLmhvdC5fc2VsZkludmFsaWRhdGVkXG5cdFx0KSB7XG5cdFx0XHRvdXRkYXRlZFNlbGZBY2NlcHRlZE1vZHVsZXMucHVzaCh7XG5cdFx0XHRcdG1vZHVsZTogb3V0ZGF0ZWRNb2R1bGVJZCxcblx0XHRcdFx0cmVxdWlyZTogbW9kdWxlLmhvdC5fcmVxdWlyZVNlbGYsXG5cdFx0XHRcdGVycm9ySGFuZGxlcjogbW9kdWxlLmhvdC5fc2VsZkFjY2VwdGVkXG5cdFx0XHR9KTtcblx0XHR9XG5cdH1cblxuXHR2YXIgbW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXM7XG5cblx0cmV0dXJuIHtcblx0XHRkaXNwb3NlOiBmdW5jdGlvbiAoKSB7XG5cdFx0XHRjdXJyZW50VXBkYXRlUmVtb3ZlZENodW5rcy5mb3JFYWNoKGZ1bmN0aW9uIChjaHVua0lkKSB7XG5cdFx0XHRcdGRlbGV0ZSBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF07XG5cdFx0XHR9KTtcblx0XHRcdGN1cnJlbnRVcGRhdGVSZW1vdmVkQ2h1bmtzID0gdW5kZWZpbmVkO1xuXG5cdFx0XHR2YXIgaWR4O1xuXHRcdFx0dmFyIHF1ZXVlID0gb3V0ZGF0ZWRNb2R1bGVzLnNsaWNlKCk7XG5cdFx0XHR3aGlsZSAocXVldWUubGVuZ3RoID4gMCkge1xuXHRcdFx0XHR2YXIgbW9kdWxlSWQgPSBxdWV1ZS5wb3AoKTtcblx0XHRcdFx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19yZXF1aXJlX18uY1ttb2R1bGVJZF07XG5cdFx0XHRcdGlmICghbW9kdWxlKSBjb250aW51ZTtcblxuXHRcdFx0XHR2YXIgZGF0YSA9IHt9O1xuXG5cdFx0XHRcdC8vIENhbGwgZGlzcG9zZSBoYW5kbGVyc1xuXHRcdFx0XHR2YXIgZGlzcG9zZUhhbmRsZXJzID0gbW9kdWxlLmhvdC5fZGlzcG9zZUhhbmRsZXJzO1xuXHRcdFx0XHRmb3IgKGogPSAwOyBqIDwgZGlzcG9zZUhhbmRsZXJzLmxlbmd0aDsgaisrKSB7XG5cdFx0XHRcdFx0ZGlzcG9zZUhhbmRsZXJzW2pdLmNhbGwobnVsbCwgZGF0YSk7XG5cdFx0XHRcdH1cblx0XHRcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5obXJEW21vZHVsZUlkXSA9IGRhdGE7XG5cblx0XHRcdFx0Ly8gZGlzYWJsZSBtb2R1bGUgKHRoaXMgZGlzYWJsZXMgcmVxdWlyZXMgZnJvbSB0aGlzIG1vZHVsZSlcblx0XHRcdFx0bW9kdWxlLmhvdC5hY3RpdmUgPSBmYWxzZTtcblxuXHRcdFx0XHQvLyByZW1vdmUgbW9kdWxlIGZyb20gY2FjaGVcblx0XHRcdFx0ZGVsZXRlIF9fd2VicGFja19yZXF1aXJlX18uY1ttb2R1bGVJZF07XG5cblx0XHRcdFx0Ly8gd2hlbiBkaXNwb3NpbmcgdGhlcmUgaXMgbm8gbmVlZCB0byBjYWxsIGRpc3Bvc2UgaGFuZGxlclxuXHRcdFx0XHRkZWxldGUgb3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdO1xuXG5cdFx0XHRcdC8vIHJlbW92ZSBcInBhcmVudHNcIiByZWZlcmVuY2VzIGZyb20gYWxsIGNoaWxkcmVuXG5cdFx0XHRcdGZvciAoaiA9IDA7IGogPCBtb2R1bGUuY2hpbGRyZW4ubGVuZ3RoOyBqKyspIHtcblx0XHRcdFx0XHR2YXIgY2hpbGQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLmNbbW9kdWxlLmNoaWxkcmVuW2pdXTtcblx0XHRcdFx0XHRpZiAoIWNoaWxkKSBjb250aW51ZTtcblx0XHRcdFx0XHRpZHggPSBjaGlsZC5wYXJlbnRzLmluZGV4T2YobW9kdWxlSWQpO1xuXHRcdFx0XHRcdGlmIChpZHggPj0gMCkge1xuXHRcdFx0XHRcdFx0Y2hpbGQucGFyZW50cy5zcGxpY2UoaWR4LCAxKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0Ly8gcmVtb3ZlIG91dGRhdGVkIGRlcGVuZGVuY3kgZnJvbSBtb2R1bGUgY2hpbGRyZW5cblx0XHRcdHZhciBkZXBlbmRlbmN5O1xuXHRcdFx0Zm9yICh2YXIgb3V0ZGF0ZWRNb2R1bGVJZCBpbiBvdXRkYXRlZERlcGVuZGVuY2llcykge1xuXHRcdFx0XHRpZiAoX193ZWJwYWNrX3JlcXVpcmVfXy5vKG91dGRhdGVkRGVwZW5kZW5jaWVzLCBvdXRkYXRlZE1vZHVsZUlkKSkge1xuXHRcdFx0XHRcdG1vZHVsZSA9IF9fd2VicGFja19yZXF1aXJlX18uY1tvdXRkYXRlZE1vZHVsZUlkXTtcblx0XHRcdFx0XHRpZiAobW9kdWxlKSB7XG5cdFx0XHRcdFx0XHRtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcyA9XG5cdFx0XHRcdFx0XHRcdG91dGRhdGVkRGVwZW5kZW5jaWVzW291dGRhdGVkTW9kdWxlSWRdO1xuXHRcdFx0XHRcdFx0Zm9yIChqID0gMDsgaiA8IG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzLmxlbmd0aDsgaisrKSB7XG5cdFx0XHRcdFx0XHRcdGRlcGVuZGVuY3kgPSBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llc1tqXTtcblx0XHRcdFx0XHRcdFx0aWR4ID0gbW9kdWxlLmNoaWxkcmVuLmluZGV4T2YoZGVwZW5kZW5jeSk7XG5cdFx0XHRcdFx0XHRcdGlmIChpZHggPj0gMCkgbW9kdWxlLmNoaWxkcmVuLnNwbGljZShpZHgsIDEpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0sXG5cdFx0YXBwbHk6IGZ1bmN0aW9uIChyZXBvcnRFcnJvcikge1xuXHRcdFx0dmFyIGFjY2VwdFByb21pc2VzID0gW107XG5cdFx0XHQvLyBpbnNlcnQgbmV3IGNvZGVcblx0XHRcdGZvciAodmFyIHVwZGF0ZU1vZHVsZUlkIGluIGFwcGxpZWRVcGRhdGUpIHtcblx0XHRcdFx0aWYgKF9fd2VicGFja19yZXF1aXJlX18ubyhhcHBsaWVkVXBkYXRlLCB1cGRhdGVNb2R1bGVJZCkpIHtcblx0XHRcdFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLm1bdXBkYXRlTW9kdWxlSWRdID0gYXBwbGllZFVwZGF0ZVt1cGRhdGVNb2R1bGVJZF07XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0Ly8gcnVuIG5ldyBydW50aW1lIG1vZHVsZXNcblx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgY3VycmVudFVwZGF0ZVJ1bnRpbWUubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0Y3VycmVudFVwZGF0ZVJ1bnRpbWVbaV0oX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cdFx0XHR9XG5cblx0XHRcdC8vIGNhbGwgYWNjZXB0IGhhbmRsZXJzXG5cdFx0XHRmb3IgKHZhciBvdXRkYXRlZE1vZHVsZUlkIGluIG91dGRhdGVkRGVwZW5kZW5jaWVzKSB7XG5cdFx0XHRcdGlmIChfX3dlYnBhY2tfcmVxdWlyZV9fLm8ob3V0ZGF0ZWREZXBlbmRlbmNpZXMsIG91dGRhdGVkTW9kdWxlSWQpKSB7XG5cdFx0XHRcdFx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19yZXF1aXJlX18uY1tvdXRkYXRlZE1vZHVsZUlkXTtcblx0XHRcdFx0XHRpZiAobW9kdWxlKSB7XG5cdFx0XHRcdFx0XHRtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcyA9XG5cdFx0XHRcdFx0XHRcdG91dGRhdGVkRGVwZW5kZW5jaWVzW291dGRhdGVkTW9kdWxlSWRdO1xuXHRcdFx0XHRcdFx0dmFyIGNhbGxiYWNrcyA9IFtdO1xuXHRcdFx0XHRcdFx0dmFyIGVycm9ySGFuZGxlcnMgPSBbXTtcblx0XHRcdFx0XHRcdHZhciBkZXBlbmRlbmNpZXNGb3JDYWxsYmFja3MgPSBbXTtcblx0XHRcdFx0XHRcdGZvciAodmFyIGogPSAwOyBqIDwgbW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXMubGVuZ3RoOyBqKyspIHtcblx0XHRcdFx0XHRcdFx0dmFyIGRlcGVuZGVuY3kgPSBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llc1tqXTtcblx0XHRcdFx0XHRcdFx0dmFyIGFjY2VwdENhbGxiYWNrID1cblx0XHRcdFx0XHRcdFx0XHRtb2R1bGUuaG90Ll9hY2NlcHRlZERlcGVuZGVuY2llc1tkZXBlbmRlbmN5XTtcblx0XHRcdFx0XHRcdFx0dmFyIGVycm9ySGFuZGxlciA9XG5cdFx0XHRcdFx0XHRcdFx0bW9kdWxlLmhvdC5fYWNjZXB0ZWRFcnJvckhhbmRsZXJzW2RlcGVuZGVuY3ldO1xuXHRcdFx0XHRcdFx0XHRpZiAoYWNjZXB0Q2FsbGJhY2spIHtcblx0XHRcdFx0XHRcdFx0XHRpZiAoY2FsbGJhY2tzLmluZGV4T2YoYWNjZXB0Q2FsbGJhY2spICE9PSAtMSkgY29udGludWU7XG5cdFx0XHRcdFx0XHRcdFx0Y2FsbGJhY2tzLnB1c2goYWNjZXB0Q2FsbGJhY2spO1xuXHRcdFx0XHRcdFx0XHRcdGVycm9ySGFuZGxlcnMucHVzaChlcnJvckhhbmRsZXIpO1xuXHRcdFx0XHRcdFx0XHRcdGRlcGVuZGVuY2llc0ZvckNhbGxiYWNrcy5wdXNoKGRlcGVuZGVuY3kpO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRmb3IgKHZhciBrID0gMDsgayA8IGNhbGxiYWNrcy5sZW5ndGg7IGsrKykge1xuXHRcdFx0XHRcdFx0XHR2YXIgcmVzdWx0O1xuXHRcdFx0XHRcdFx0XHR0cnkge1xuXHRcdFx0XHRcdFx0XHRcdHJlc3VsdCA9IGNhbGxiYWNrc1trXS5jYWxsKG51bGwsIG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzKTtcblx0XHRcdFx0XHRcdFx0fSBjYXRjaCAoZXJyKSB7XG5cdFx0XHRcdFx0XHRcdFx0aWYgKHR5cGVvZiBlcnJvckhhbmRsZXJzW2tdID09PSBcImZ1bmN0aW9uXCIpIHtcblx0XHRcdFx0XHRcdFx0XHRcdHRyeSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdGVycm9ySGFuZGxlcnNba10oZXJyLCB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0bW9kdWxlSWQ6IG91dGRhdGVkTW9kdWxlSWQsXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0ZGVwZW5kZW5jeUlkOiBkZXBlbmRlbmNpZXNGb3JDYWxsYmFja3Nba11cblx0XHRcdFx0XHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0XHRcdFx0XHR9IGNhdGNoIChlcnIyKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdGlmIChvcHRpb25zLm9uRXJyb3JlZCkge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdG9wdGlvbnMub25FcnJvcmVkKHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHR5cGU6IFwiYWNjZXB0LWVycm9yLWhhbmRsZXItZXJyb3JlZFwiLFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0bW9kdWxlSWQ6IG91dGRhdGVkTW9kdWxlSWQsXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRkZXBlbmRlbmN5SWQ6IGRlcGVuZGVuY2llc0ZvckNhbGxiYWNrc1trXSxcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdGVycm9yOiBlcnIyLFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0b3JpZ2luYWxFcnJvcjogZXJyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHRcdFx0aWYgKCFvcHRpb25zLmlnbm9yZUVycm9yZWQpIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRyZXBvcnRFcnJvcihlcnIyKTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRyZXBvcnRFcnJvcihlcnIpO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdFx0XHRcdGlmIChvcHRpb25zLm9uRXJyb3JlZCkge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRvcHRpb25zLm9uRXJyb3JlZCh7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0dHlwZTogXCJhY2NlcHQtZXJyb3JlZFwiLFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBvdXRkYXRlZE1vZHVsZUlkLFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdGRlcGVuZGVuY3lJZDogZGVwZW5kZW5jaWVzRm9yQ2FsbGJhY2tzW2tdLFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdGVycm9yOiBlcnJcblx0XHRcdFx0XHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0XHRpZiAoIW9wdGlvbnMuaWdub3JlRXJyb3JlZCkge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRyZXBvcnRFcnJvcihlcnIpO1xuXHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRpZiAocmVzdWx0ICYmIHR5cGVvZiByZXN1bHQudGhlbiA9PT0gXCJmdW5jdGlvblwiKSB7XG5cdFx0XHRcdFx0XHRcdFx0YWNjZXB0UHJvbWlzZXMucHVzaChyZXN1bHQpO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdHZhciBvbkFjY2VwdGVkID0gZnVuY3Rpb24gKCkge1xuXHRcdFx0XHQvLyBMb2FkIHNlbGYgYWNjZXB0ZWQgbW9kdWxlc1xuXHRcdFx0XHRmb3IgKHZhciBvID0gMDsgbyA8IG91dGRhdGVkU2VsZkFjY2VwdGVkTW9kdWxlcy5sZW5ndGg7IG8rKykge1xuXHRcdFx0XHRcdHZhciBpdGVtID0gb3V0ZGF0ZWRTZWxmQWNjZXB0ZWRNb2R1bGVzW29dO1xuXHRcdFx0XHRcdHZhciBtb2R1bGVJZCA9IGl0ZW0ubW9kdWxlO1xuXHRcdFx0XHRcdHRyeSB7XG5cdFx0XHRcdFx0XHRpdGVtLnJlcXVpcmUobW9kdWxlSWQpO1xuXHRcdFx0XHRcdH0gY2F0Y2ggKGVycikge1xuXHRcdFx0XHRcdFx0aWYgKHR5cGVvZiBpdGVtLmVycm9ySGFuZGxlciA9PT0gXCJmdW5jdGlvblwiKSB7XG5cdFx0XHRcdFx0XHRcdHRyeSB7XG5cdFx0XHRcdFx0XHRcdFx0aXRlbS5lcnJvckhhbmRsZXIoZXJyLCB7XG5cdFx0XHRcdFx0XHRcdFx0XHRtb2R1bGVJZDogbW9kdWxlSWQsXG5cdFx0XHRcdFx0XHRcdFx0XHRtb2R1bGU6IF9fd2VicGFja19yZXF1aXJlX18uY1ttb2R1bGVJZF1cblx0XHRcdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRcdFx0fSBjYXRjaCAoZXJyMSkge1xuXHRcdFx0XHRcdFx0XHRcdGlmIChvcHRpb25zLm9uRXJyb3JlZCkge1xuXHRcdFx0XHRcdFx0XHRcdFx0b3B0aW9ucy5vbkVycm9yZWQoe1xuXHRcdFx0XHRcdFx0XHRcdFx0XHR0eXBlOiBcInNlbGYtYWNjZXB0LWVycm9yLWhhbmRsZXItZXJyb3JlZFwiLFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRtb2R1bGVJZDogbW9kdWxlSWQsXG5cdFx0XHRcdFx0XHRcdFx0XHRcdGVycm9yOiBlcnIxLFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRvcmlnaW5hbEVycm9yOiBlcnJcblx0XHRcdFx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHRpZiAoIW9wdGlvbnMuaWdub3JlRXJyb3JlZCkge1xuXHRcdFx0XHRcdFx0XHRcdFx0cmVwb3J0RXJyb3IoZXJyMSk7XG5cdFx0XHRcdFx0XHRcdFx0XHRyZXBvcnRFcnJvcihlcnIpO1xuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25FcnJvcmVkKSB7XG5cdFx0XHRcdFx0XHRcdFx0b3B0aW9ucy5vbkVycm9yZWQoe1xuXHRcdFx0XHRcdFx0XHRcdFx0dHlwZTogXCJzZWxmLWFjY2VwdC1lcnJvcmVkXCIsXG5cdFx0XHRcdFx0XHRcdFx0XHRtb2R1bGVJZDogbW9kdWxlSWQsXG5cdFx0XHRcdFx0XHRcdFx0XHRlcnJvcjogZXJyXG5cdFx0XHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0aWYgKCFvcHRpb25zLmlnbm9yZUVycm9yZWQpIHtcblx0XHRcdFx0XHRcdFx0XHRyZXBvcnRFcnJvcihlcnIpO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9O1xuXG5cdFx0XHRyZXR1cm4gUHJvbWlzZS5hbGwoYWNjZXB0UHJvbWlzZXMpXG5cdFx0XHRcdC50aGVuKG9uQWNjZXB0ZWQpXG5cdFx0XHRcdC50aGVuKGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0XHRyZXR1cm4gb3V0ZGF0ZWRNb2R1bGVzO1xuXHRcdFx0XHR9KTtcblx0XHR9XG5cdH07XG59XG5fX3dlYnBhY2tfcmVxdWlyZV9fLmhtckkuanNvbnAgPSBmdW5jdGlvbiAobW9kdWxlSWQsIGFwcGx5SGFuZGxlcnMpIHtcblx0aWYgKCFjdXJyZW50VXBkYXRlKSB7XG5cdFx0Y3VycmVudFVwZGF0ZSA9IHt9O1xuXHRcdGN1cnJlbnRVcGRhdGVSdW50aW1lID0gW107XG5cdFx0Y3VycmVudFVwZGF0ZVJlbW92ZWRDaHVua3MgPSBbXTtcblx0XHRhcHBseUhhbmRsZXJzLnB1c2goYXBwbHlIYW5kbGVyKTtcblx0fVxuXHRpZiAoIV9fd2VicGFja19yZXF1aXJlX18ubyhjdXJyZW50VXBkYXRlLCBtb2R1bGVJZCkpIHtcblx0XHRjdXJyZW50VXBkYXRlW21vZHVsZUlkXSA9IF9fd2VicGFja19yZXF1aXJlX18ubVttb2R1bGVJZF07XG5cdH1cbn07XG5fX3dlYnBhY2tfcmVxdWlyZV9fLmhtckMuanNvbnAgPSBmdW5jdGlvbiAoXG5cdGNodW5rSWRzLFxuXHRyZW1vdmVkQ2h1bmtzLFxuXHRyZW1vdmVkTW9kdWxlcyxcblx0cHJvbWlzZXMsXG5cdGFwcGx5SGFuZGxlcnMsXG5cdHVwZGF0ZWRNb2R1bGVzTGlzdFxuKSB7XG5cdGFwcGx5SGFuZGxlcnMucHVzaChhcHBseUhhbmRsZXIpO1xuXHRjdXJyZW50VXBkYXRlQ2h1bmtzID0ge307XG5cdGN1cnJlbnRVcGRhdGVSZW1vdmVkQ2h1bmtzID0gcmVtb3ZlZENodW5rcztcblx0Y3VycmVudFVwZGF0ZSA9IHJlbW92ZWRNb2R1bGVzLnJlZHVjZShmdW5jdGlvbiAob2JqLCBrZXkpIHtcblx0XHRvYmpba2V5XSA9IGZhbHNlO1xuXHRcdHJldHVybiBvYmo7XG5cdH0sIHt9KTtcblx0Y3VycmVudFVwZGF0ZVJ1bnRpbWUgPSBbXTtcblx0Y2h1bmtJZHMuZm9yRWFjaChmdW5jdGlvbiAoY2h1bmtJZCkge1xuXHRcdGlmIChcblx0XHRcdF9fd2VicGFja19yZXF1aXJlX18ubyhpbnN0YWxsZWRDaHVua3MsIGNodW5rSWQpICYmXG5cdFx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gIT09IHVuZGVmaW5lZFxuXHRcdCkge1xuXHRcdFx0cHJvbWlzZXMucHVzaChsb2FkVXBkYXRlQ2h1bmsoY2h1bmtJZCwgdXBkYXRlZE1vZHVsZXNMaXN0KSk7XG5cdFx0XHRjdXJyZW50VXBkYXRlQ2h1bmtzW2NodW5rSWRdID0gdHJ1ZTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0Y3VycmVudFVwZGF0ZUNodW5rc1tjaHVua0lkXSA9IGZhbHNlO1xuXHRcdH1cblx0fSk7XG5cdGlmIChfX3dlYnBhY2tfcmVxdWlyZV9fLmYpIHtcblx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmYuanNvbnBIbXIgPSBmdW5jdGlvbiAoY2h1bmtJZCwgcHJvbWlzZXMpIHtcblx0XHRcdGlmIChcblx0XHRcdFx0Y3VycmVudFVwZGF0ZUNodW5rcyAmJlxuXHRcdFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8oY3VycmVudFVwZGF0ZUNodW5rcywgY2h1bmtJZCkgJiZcblx0XHRcdFx0IWN1cnJlbnRVcGRhdGVDaHVua3NbY2h1bmtJZF1cblx0XHRcdCkge1xuXHRcdFx0XHRwcm9taXNlcy5wdXNoKGxvYWRVcGRhdGVDaHVuayhjaHVua0lkKSk7XG5cdFx0XHRcdGN1cnJlbnRVcGRhdGVDaHVua3NbY2h1bmtJZF0gPSB0cnVlO1xuXHRcdFx0fVxuXHRcdH07XG5cdH1cbn07XG5cbl9fd2VicGFja19yZXF1aXJlX18uaG1yTSA9ICgpID0+IHtcblx0aWYgKHR5cGVvZiBmZXRjaCA9PT0gXCJ1bmRlZmluZWRcIikgdGhyb3cgbmV3IEVycm9yKFwiTm8gYnJvd3NlciBzdXBwb3J0OiBuZWVkIGZldGNoIEFQSVwiKTtcblx0cmV0dXJuIGZldGNoKF9fd2VicGFja19yZXF1aXJlX18ucCArIF9fd2VicGFja19yZXF1aXJlX18uaG1yRigpKS50aGVuKChyZXNwb25zZSkgPT4ge1xuXHRcdGlmKHJlc3BvbnNlLnN0YXR1cyA9PT0gNDA0KSByZXR1cm47IC8vIG5vIHVwZGF0ZSBhdmFpbGFibGVcblx0XHRpZighcmVzcG9uc2Uub2spIHRocm93IG5ldyBFcnJvcihcIkZhaWxlZCB0byBmZXRjaCB1cGRhdGUgbWFuaWZlc3QgXCIgKyByZXNwb25zZS5zdGF0dXNUZXh0KTtcblx0XHRyZXR1cm4gcmVzcG9uc2UuanNvbigpO1xuXHR9KTtcbn07XG5cbi8vIG5vIG9uIGNodW5rcyBsb2FkZWRcblxuLy8gbm8ganNvbnAgZnVuY3Rpb24iLCIiLCIvLyBtb2R1bGUgY2FjaGUgYXJlIHVzZWQgc28gZW50cnkgaW5saW5pbmcgaXMgZGlzYWJsZWRcbi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vbm9kZV9tb2R1bGVzL3dlYnBhY2stZGV2LXNlcnZlci9jbGllbnQvaW5kZXguanM/cHJvdG9jb2w9d3MlM0EmaG9zdG5hbWU9MC4wLjAuMCZwb3J0PTgwODAmcGF0aG5hbWU9JTJGd3MmbG9nZ2luZz1pbmZvJm92ZXJsYXk9dHJ1ZSZyZWNvbm5lY3Q9MTAmaG90PXRydWUmbGl2ZS1yZWxvYWQ9dHJ1ZVwiKTtcbl9fd2VicGFja19yZXF1aXJlX18oXCIuL25vZGVfbW9kdWxlcy93ZWJwYWNrL2hvdC9kZXYtc2VydmVyLmpzXCIpO1xuX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vYXBwL2luZGV4LmpzXCIpO1xudmFyIF9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zdHlsZXMvaW5kZXguc2Nzc1wiKTtcbiIsIiJdLCJuYW1lcyI6WyJBcHAiLCJjb25zdHJ1Y3RvciIsInNlY3Rpb25zIiwicGFydGlhbHMiLCJjYW52YXMiLCJ3ZWJHTCIsImluaXRTZWN0aW9ucyIsImluaXRQYXJ0aWFscyIsImluaXRDYW52YXMiLCJpbml0V0VHTCIsImNvbnNvbGUiLCJsb2ciLCJhbmltYXRlRWxlbWVudHNJbiIsIm1vZHVsZSIsImV4cG9ydHMiLCJhbnNpSFRNTCIsIl9yZWdBTlNJIiwiX2RlZkNvbG9ycyIsInJlc2V0IiwiYmxhY2siLCJyZWQiLCJncmVlbiIsInllbGxvdyIsImJsdWUiLCJtYWdlbnRhIiwiY3lhbiIsImxpZ2h0Z3JleSIsImRhcmtncmV5IiwiX3N0eWxlcyIsIl9vcGVuVGFncyIsIl9jbG9zZVRhZ3MiLCJmb3JFYWNoIiwibiIsInRleHQiLCJ0ZXN0IiwiYW5zaUNvZGVzIiwicmV0IiwicmVwbGFjZSIsIm1hdGNoIiwic2VxIiwib3QiLCJpbmRleE9mIiwicG9wIiwicHVzaCIsImN0IiwibCIsImxlbmd0aCIsIkFycmF5Iiwiam9pbiIsInNldENvbG9ycyIsImNvbG9ycyIsIkVycm9yIiwiX2ZpbmFsQ29sb3JzIiwia2V5IiwiaGV4IiwiaGFzT3duUHJvcGVydHkiLCJpc0FycmF5Iiwic29tZSIsImgiLCJkZWZIZXhDb2xvciIsInNsaWNlIiwiX3NldFRhZ3MiLCJ0YWdzIiwiT2JqZWN0IiwiZGVmaW5lUHJvcGVydHkiLCJnZXQiLCJvcGVuIiwiY2xvc2UiLCJjb2RlIiwiY29sb3IiLCJvcmlDb2xvciIsInBhcnNlSW50IiwidG9TdHJpbmciLCJSIiwiUmVmbGVjdCIsIlJlZmxlY3RBcHBseSIsImFwcGx5IiwidGFyZ2V0IiwicmVjZWl2ZXIiLCJhcmdzIiwiRnVuY3Rpb24iLCJwcm90b3R5cGUiLCJjYWxsIiwiUmVmbGVjdE93bktleXMiLCJvd25LZXlzIiwiZ2V0T3duUHJvcGVydHlTeW1ib2xzIiwiZ2V0T3duUHJvcGVydHlOYW1lcyIsImNvbmNhdCIsIlByb2Nlc3NFbWl0V2FybmluZyIsIndhcm5pbmciLCJ3YXJuIiwiTnVtYmVySXNOYU4iLCJOdW1iZXIiLCJpc05hTiIsInZhbHVlIiwiRXZlbnRFbWl0dGVyIiwiaW5pdCIsIm9uY2UiLCJfZXZlbnRzIiwidW5kZWZpbmVkIiwiX2V2ZW50c0NvdW50IiwiX21heExpc3RlbmVycyIsImRlZmF1bHRNYXhMaXN0ZW5lcnMiLCJjaGVja0xpc3RlbmVyIiwibGlzdGVuZXIiLCJUeXBlRXJyb3IiLCJlbnVtZXJhYmxlIiwic2V0IiwiYXJnIiwiUmFuZ2VFcnJvciIsImdldFByb3RvdHlwZU9mIiwiY3JlYXRlIiwic2V0TWF4TGlzdGVuZXJzIiwiX2dldE1heExpc3RlbmVycyIsInRoYXQiLCJnZXRNYXhMaXN0ZW5lcnMiLCJlbWl0IiwidHlwZSIsImkiLCJhcmd1bWVudHMiLCJkb0Vycm9yIiwiZXZlbnRzIiwiZXJyb3IiLCJlciIsImVyciIsIm1lc3NhZ2UiLCJjb250ZXh0IiwiaGFuZGxlciIsImxlbiIsImxpc3RlbmVycyIsImFycmF5Q2xvbmUiLCJfYWRkTGlzdGVuZXIiLCJwcmVwZW5kIiwibSIsImV4aXN0aW5nIiwibmV3TGlzdGVuZXIiLCJ1bnNoaWZ0Iiwid2FybmVkIiwidyIsIlN0cmluZyIsIm5hbWUiLCJlbWl0dGVyIiwiY291bnQiLCJhZGRMaXN0ZW5lciIsIm9uIiwicHJlcGVuZExpc3RlbmVyIiwib25jZVdyYXBwZXIiLCJmaXJlZCIsInJlbW92ZUxpc3RlbmVyIiwid3JhcEZuIiwiX29uY2VXcmFwIiwic3RhdGUiLCJ3cmFwcGVkIiwiYmluZCIsInByZXBlbmRPbmNlTGlzdGVuZXIiLCJsaXN0IiwicG9zaXRpb24iLCJvcmlnaW5hbExpc3RlbmVyIiwic2hpZnQiLCJzcGxpY2VPbmUiLCJvZmYiLCJyZW1vdmVBbGxMaXN0ZW5lcnMiLCJrZXlzIiwiX2xpc3RlbmVycyIsInVud3JhcCIsImV2bGlzdGVuZXIiLCJ1bndyYXBMaXN0ZW5lcnMiLCJyYXdMaXN0ZW5lcnMiLCJsaXN0ZW5lckNvdW50IiwiZXZlbnROYW1lcyIsImFyciIsImNvcHkiLCJpbmRleCIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0IiwiZXJyb3JMaXN0ZW5lciIsInJlc29sdmVyIiwiZXZlbnRUYXJnZXRBZ25vc3RpY0FkZExpc3RlbmVyIiwiYWRkRXJyb3JIYW5kbGVySWZFdmVudEVtaXR0ZXIiLCJmbGFncyIsImFkZEV2ZW50TGlzdGVuZXIiLCJ3cmFwTGlzdGVuZXIiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwibm9ybWFsaXplVXJsIiwicmVxdWlyZSIsInNyY0J5TW9kdWxlSWQiLCJub0RvY3VtZW50IiwiZG9jdW1lbnQiLCJkZWJvdW5jZSIsImZuIiwidGltZSIsInRpbWVvdXQiLCJzZWxmIiwiZnVuY3Rpb25DYWxsIiwiY2xlYXJUaW1lb3V0Iiwic2V0VGltZW91dCIsIm5vb3AiLCJnZXRDdXJyZW50U2NyaXB0VXJsIiwibW9kdWxlSWQiLCJzcmMiLCJjdXJyZW50U2NyaXB0Iiwic2NyaXB0cyIsImdldEVsZW1lbnRzQnlUYWdOYW1lIiwibGFzdFNjcmlwdFRhZyIsImZpbGVNYXAiLCJzcGxpdFJlc3VsdCIsInNwbGl0IiwiZmlsZW5hbWUiLCJtYXAiLCJtYXBSdWxlIiwicmVnIiwiUmVnRXhwIiwiaXNVcmxSZXF1ZXN0IiwidXJsIiwidXBkYXRlQ3NzIiwiZWwiLCJocmVmIiwiaXNMb2FkZWQiLCJ2aXNpdGVkIiwibmV3RWwiLCJjbG9uZU5vZGUiLCJwYXJlbnROb2RlIiwicmVtb3ZlQ2hpbGQiLCJEYXRlIiwibm93IiwibmV4dFNpYmxpbmciLCJpbnNlcnRCZWZvcmUiLCJhcHBlbmRDaGlsZCIsImdldFJlbG9hZFVybCIsInJlbG9hZFN0eWxlIiwiZWxlbWVudHMiLCJxdWVyeVNlbGVjdG9yQWxsIiwibG9hZGVkIiwicmVsb2FkQWxsIiwib3B0aW9ucyIsImdldFNjcmlwdFNyYyIsInVwZGF0ZSIsInJlbG9hZGVkIiwibG9jYWxzIiwibm9ybWFsaXplVXJsSW5uZXIiLCJwYXRoQ29tcG9uZW50cyIsInJlZHVjZSIsImFjY3VtdWxhdG9yIiwiaXRlbSIsInVybFN0cmluZyIsInRyaW0iLCJwcm90b2NvbCIsImNvbXBvbmVudHMiLCJob3N0IiwidG9Mb3dlckNhc2UiLCJwYXRoIiwiX3R5cGVvZiIsIm8iLCJTeW1ib2wiLCJpdGVyYXRvciIsIl9jbGFzc0NhbGxDaGVjayIsImEiLCJfZGVmaW5lUHJvcGVydGllcyIsImUiLCJyIiwidCIsImNvbmZpZ3VyYWJsZSIsIndyaXRhYmxlIiwiX3RvUHJvcGVydHlLZXkiLCJfY3JlYXRlQ2xhc3MiLCJfdG9QcmltaXRpdmUiLCJ0b1ByaW1pdGl2ZSIsIldlYlNvY2tldENsaWVudCIsImNsaWVudCIsIldlYlNvY2tldCIsIm9uZXJyb3IiLCJvbk9wZW4iLCJmIiwib25vcGVuIiwib25DbG9zZSIsIm9uY2xvc2UiLCJvbk1lc3NhZ2UiLCJvbm1lc3NhZ2UiLCJkYXRhIiwiZGVmYXVsdCIsImZpbHRlciIsImdldE93blByb3BlcnR5RGVzY3JpcHRvciIsIl9vYmplY3RTcHJlYWQiLCJfZGVmaW5lUHJvcGVydHkiLCJnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JzIiwiZGVmaW5lUHJvcGVydGllcyIsIndlYnBhY2tIb3RMb2ciLCJob3RFbWl0dGVyIiwic29ja2V0IiwiZm9ybWF0UHJvYmxlbSIsImNyZWF0ZU92ZXJsYXkiLCJzZXRMb2dMZXZlbCIsInNlbmRNZXNzYWdlIiwiaXNQcm9ncmVzc1N1cHBvcnRlZCIsImRlZmluZVByb2dyZXNzRWxlbWVudCIsImRlY29kZU92ZXJsYXlPcHRpb25zIiwib3ZlcmxheU9wdGlvbnMiLCJwcm9wZXJ0eSIsIm92ZXJsYXlGaWx0ZXJGdW5jdGlvblN0cmluZyIsImRlY29kZVVSSUNvbXBvbmVudCIsInN0YXR1cyIsImlzVW5sb2FkaW5nIiwiY3VycmVudEhhc2giLCJfX3dlYnBhY2tfaGFzaF9fIiwiZ2V0Q3VycmVudFNjcmlwdFNvdXJjZSIsImdldEF0dHJpYnV0ZSIsInNjcmlwdEVsZW1lbnRzIiwic2NyaXB0RWxlbWVudHNXaXRoU3JjIiwiZWxlbWVudCIsInBhcnNlVVJMIiwicmVzb3VyY2VRdWVyeSIsInJlc3VsdCIsInNlYXJjaFBhcmFtcyIsInBhaXIiLCJzY3JpcHRTb3VyY2UiLCJzY3JpcHRTb3VyY2VVUkwiLCJVUkwiLCJsb2NhdGlvbiIsImZyb21DdXJyZW50U2NyaXB0IiwicGFyc2VkUmVzb3VyY2VRdWVyeSIsIl9fcmVzb3VyY2VRdWVyeSIsImVuYWJsZWRGZWF0dXJlcyIsIlByb2dyZXNzIiwiT3ZlcmxheSIsImhvdCIsImxpdmVSZWxvYWQiLCJwcm9ncmVzcyIsIm92ZXJsYXkiLCJKU09OIiwicGFyc2UiLCJlcnJvcnMiLCJ3YXJuaW5ncyIsInJ1bnRpbWVFcnJvcnMiLCJsb2dnaW5nIiwicmVjb25uZWN0Iiwic2V0QWxsTG9nTGV2ZWwiLCJsZXZlbCIsImxvZ0VuYWJsZWRGZWF0dXJlcyIsImZlYXR1cmVzIiwibGlzdEVuYWJsZWRGZWF0dXJlcyIsImxvZ1N0cmluZyIsImluZm8iLCJ3aW5kb3ciLCJ0cnVzdGVkVHlwZXNQb2xpY3lOYW1lIiwiY2F0Y2hSdW50aW1lRXJyb3IiLCJzZW5kIiwicmVsb2FkQXBwIiwiX3JlZiIsImN1cnJlbnRTdGF0dXMiLCJwcmV2aW91c0hhc2giLCJpc0luaXRpYWwiLCJhcHBseVJlbG9hZCIsInJvb3RXaW5kb3ciLCJpbnRlcnZhbElkIiwiY2xlYXJJbnRlcnZhbCIsInJlbG9hZCIsInNlYXJjaCIsImFsbG93VG9Ib3QiLCJhbGxvd1RvTGl2ZVJlbG9hZCIsInBvc3RNZXNzYWdlIiwic2V0SW50ZXJ2YWwiLCJwYXJlbnQiLCJhbnNpUmVnZXgiLCJzdHJpcEFuc2kiLCJzdHJpbmciLCJvblNvY2tldE1lc3NhZ2UiLCJpbnZhbGlkIiwiaGFzaCIsIl9oYXNoIiwicHJvZ3Jlc3NVcGRhdGUiLCJwbHVnaW5OYW1lIiwicGVyY2VudCIsIm1zZyIsInF1ZXJ5U2VsZWN0b3IiLCJjcmVhdGVFbGVtZW50IiwiYm9keSIsInNldEF0dHJpYnV0ZSIsInN0aWxsT2siLCJvayIsInN0YXRpY0NoYW5nZWQiLCJmaWxlIiwiX3dhcm5pbmdzIiwicGFyYW1zIiwicHJpbnRhYmxlV2FybmluZ3MiLCJfZm9ybWF0UHJvYmxlbSIsImhlYWRlciIsIm92ZXJsYXlXYXJuaW5nc1NldHRpbmciLCJ3YXJuaW5nc1RvRGlzcGxheSIsIm1lc3NhZ2VzIiwicHJldmVudFJlbG9hZGluZyIsIl9lcnJvcnMiLCJwcmludGFibGVFcnJvcnMiLCJfZm9ybWF0UHJvYmxlbTIiLCJvdmVybGF5RXJyb3JzU2V0dGluZ3MiLCJlcnJvcnNUb0Rpc3BsYXkiLCJfZXJyb3IiLCJmb3JtYXRVUkwiLCJvYmpVUkwiLCJzdWJzdHIiLCJhdXRoIiwiZW5jb2RlVVJJQ29tcG9uZW50IiwiaG9zdG5hbWUiLCJwb3J0IiwicGF0aG5hbWUiLCJzbGFzaGVzIiwiY2hhckF0IiwiY3JlYXRlU29ja2V0VVJMIiwicGFyc2VkVVJMIiwiaXNJbkFkZHJBbnkiLCJzb2NrZXRVUkxQcm90b2NvbCIsInNvY2tldFVSTEF1dGgiLCJ1c2VybmFtZSIsInBhc3N3b3JkIiwic29ja2V0VVJMSG9zdG5hbWUiLCJzb2NrZXRVUkxQb3J0Iiwic29ja2V0VVJMUGF0aG5hbWUiLCJzb2NrZXRVUkwiLCJfX3dlYnBhY2tfbW9kdWxlc19fIiwiLi9jbGllbnQtc3JjL21vZHVsZXMvbG9nZ2VyL3RhcGFibGUuanMiLCJfX3VudXNlZF93ZWJwYWNrX21vZHVsZSIsIl9fd2VicGFja19leHBvcnRzX18iLCJfX3dlYnBhY2tfcmVxdWlyZV9fIiwiZCIsIlN5bmNCYWlsSG9vayIsIi4vbm9kZV9tb2R1bGVzL3dlYnBhY2svbGliL2xvZ2dpbmcvTG9nZ2VyLmpzIiwiX3RvQ29uc3VtYWJsZUFycmF5IiwiX2FycmF5V2l0aG91dEhvbGVzIiwiX2l0ZXJhYmxlVG9BcnJheSIsIl91bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheSIsIl9ub25JdGVyYWJsZVNwcmVhZCIsIl9hcnJheUxpa2VUb0FycmF5IiwiZnJvbSIsIkxvZ1R5cGUiLCJmcmVlemUiLCJkZWJ1ZyIsInRyYWNlIiwiZ3JvdXAiLCJncm91cENvbGxhcHNlZCIsImdyb3VwRW5kIiwicHJvZmlsZSIsInByb2ZpbGVFbmQiLCJjbGVhciIsIkxPR19TWU1CT0wiLCJUSU1FUlNfU1lNQk9MIiwiVElNRVJTX0FHR1JFR0FURVNfU1lNQk9MIiwiV2VicGFja0xvZ2dlciIsImdldENoaWxkTG9nZ2VyIiwiX2xlbiIsIl9rZXkiLCJfbGVuMiIsIl9rZXkyIiwiX2xlbjMiLCJfa2V5MyIsIl9sZW40IiwiX2tleTQiLCJfbGVuNSIsIl9rZXk1IiwiYXNzZXJ0IiwiYXNzZXJ0aW9uIiwiX2xlbjYiLCJfa2V5NiIsIl9sZW43IiwiX2tleTciLCJfbGVuOCIsIl9rZXk4IiwiX2xlbjkiLCJfa2V5OSIsImxhYmVsIiwiTWFwIiwicHJvY2VzcyIsImhydGltZSIsInRpbWVMb2ciLCJwcmV2IiwidGltZUVuZCIsImRlbGV0ZSIsInRpbWVBZ2dyZWdhdGUiLCJjdXJyZW50IiwidGltZUFnZ3JlZ2F0ZUVuZCIsIkxvZ2dlciIsIi4vbm9kZV9tb2R1bGVzL3dlYnBhY2svbGliL2xvZ2dpbmcvY3JlYXRlQ29uc29sZUxvZ2dlci5qcyIsIl9fdW51c2VkX3dlYnBhY2tfZXhwb3J0cyIsIl9zbGljZWRUb0FycmF5IiwiX2FycmF5V2l0aEhvbGVzIiwiX2l0ZXJhYmxlVG9BcnJheUxpbWl0IiwiX25vbkl0ZXJhYmxlUmVzdCIsInUiLCJuZXh0IiwiZG9uZSIsInJldHVybiIsIl9yZXF1aXJlIiwiZmlsdGVyVG9GdW5jdGlvbiIsInJlZ0V4cCIsImlkZW50IiwiTG9nTGV2ZWwiLCJub25lIiwiZmFsc2UiLCJ0cnVlIiwidmVyYm9zZSIsIl9yZWYkbGV2ZWwiLCJfcmVmJGRlYnVnIiwiZGVidWdGaWx0ZXJzIiwibG9nbGV2ZWwiLCJsb2dnZXIiLCJsYWJlbGVkQXJncyIsIl9hcmdzIiwic3RhcnQiLCJlbmQiLCJtcyIsImxvZ1RpbWUiLCIuL25vZGVfbW9kdWxlcy93ZWJwYWNrL2xpYi9sb2dnaW5nL3J1bnRpbWUuanMiLCJfZXh0ZW5kcyIsImFzc2lnbiIsIl9yZXF1aXJlMiIsImNyZWF0ZUNvbnNvbGVMb2dnZXIiLCJjdXJyZW50RGVmYXVsdExvZ2dlck9wdGlvbnMiLCJjdXJyZW50RGVmYXVsdExvZ2dlciIsImdldExvZ2dlciIsImhvb2tzIiwiY2hpbGROYW1lIiwiY29uZmlndXJlRGVmYXVsdExvZ2dlciIsIl9fd2VicGFja19tb2R1bGVfY2FjaGVfXyIsImNhY2hlZE1vZHVsZSIsImRlZmluaXRpb24iLCJvYmoiLCJwcm9wIiwidG9TdHJpbmdUYWciLCJ3ZWJwYWNrX2xpYl9sb2dnaW5nX3J1bnRpbWVfanNfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzBfXyIsIl9fd2VicGFja19leHBvcnRfdGFyZ2V0X18iLCJfX3dlYnBhY2tfaV9fIiwiX19lc01vZHVsZSIsImdldENvZGVQb2ludCIsImNvZGVQb2ludEF0IiwiaW5wdXQiLCJjaGFyQ29kZUF0IiwicmVwbGFjZVVzaW5nUmVnRXhwIiwibWFjcm9UZXh0IiwibWFjcm9SZWdFeHAiLCJtYWNyb1JlcGxhY2VyIiwibGFzdEluZGV4IiwicmVwbGFjZU1hdGNoIiwiZXhlYyIsInJlcGxhY2VSZXN1bHQiLCJyZXBsYWNlTGFzdEluZGV4Iiwic3Vic3RyaW5nIiwicmVwbGFjZUlucHV0IiwicmVmZXJlbmNlcyIsImVuY29kZSIsImNyZWF0ZU1hY2hpbmUiLCJfcmVmMiIsInN0YXRlcyIsImluaXRpYWwiLCJhY3Rpb25zIiwiY3VycmVudFN0YXRlIiwiY3VycmVudENvbnRleHQiLCJldmVudCIsImN1cnJlbnRTdGF0ZU9uIiwidHJhbnNpdGlvbkNvbmZpZyIsImFjdE5hbWUiLCJhY3Rpb25JbXBsIiwibmV4dENvbnRleHRWYWx1ZSIsImNyZWF0ZU92ZXJsYXlNYWNoaW5lIiwiaGlkZU92ZXJsYXkiLCJzaG93T3ZlcmxheSIsIm1lc3NhZ2VTb3VyY2UiLCJoaWRkZW4iLCJCVUlMRF9FUlJPUiIsIlJVTlRJTUVfRVJST1IiLCJkaXNwbGF5QnVpbGRFcnJvciIsIkRJU01JU1MiLCJkaXNwbGF5UnVudGltZUVycm9yIiwiZGlzbWlzc01lc3NhZ2VzIiwiYXBwZW5kTWVzc2FnZXMiLCJzZXRNZXNzYWdlcyIsInBhcnNlRXJyb3JUb1N0YWNrcyIsInN0YWNrIiwibGlzdGVuVG9SdW50aW1lRXJyb3IiLCJjYWxsYmFjayIsImNsZWFudXAiLCJsaXN0ZW5Ub1VuaGFuZGxlZFJlamVjdGlvbiIsIm1zZ1N0eWxlcyIsImJhY2tncm91bmRDb2xvciIsImlmcmFtZVN0eWxlIiwidG9wIiwibGVmdCIsInJpZ2h0IiwiYm90dG9tIiwid2lkdGgiLCJoZWlnaHQiLCJib3JkZXIiLCJjb250YWluZXJTdHlsZSIsImJveFNpemluZyIsImZvbnRTaXplIiwicGFkZGluZyIsImxpbmVIZWlnaHQiLCJ3aGl0ZVNwYWNlIiwib3ZlcmZsb3ciLCJoZWFkZXJTdHlsZSIsImZvbnRGYW1pbHkiLCJtYXJnaW4iLCJmbGV4IiwibWF4SGVpZ2h0IiwiZGlzbWlzc0J1dHRvblN0eWxlIiwiY3Vyc29yIiwibXNnVHlwZVN0eWxlIiwibWFyZ2luQm90dG9tIiwibXNnVGV4dFN0eWxlIiwibW9kdWxlTmFtZSIsImxvYyIsImlmcmFtZUNvbnRhaW5lckVsZW1lbnQiLCJjb250YWluZXJFbGVtZW50IiwiaGVhZGVyRWxlbWVudCIsIm9uTG9hZFF1ZXVlIiwib3ZlcmxheVRydXN0ZWRUeXBlc1BvbGljeSIsImFwcGx5U3R5bGUiLCJzdHlsZSIsImNyZWF0ZUNvbnRhaW5lciIsInRydXN0ZWRUeXBlcyIsImNyZWF0ZVBvbGljeSIsImNyZWF0ZUhUTUwiLCJpZCIsIm9ubG9hZCIsImNvbnRlbnRFbGVtZW50IiwiY29udGVudERvY3VtZW50IiwiaW5uZXJUZXh0IiwiY2xvc2VCdXR0b25FbGVtZW50IiwiYXJpYUxhYmVsIiwib3ZlcmxheVNlcnZpY2UiLCJvbkxvYWQiLCJlbnN1cmVPdmVybGF5RXhpc3RzIiwiaW5uZXJIVE1MIiwiaGlkZSIsInNob3ciLCJlbnRyeUVsZW1lbnQiLCJtc2dTdHlsZSIsInR5cGVFbGVtZW50IiwibW9kdWxlSWRlbnRpZmllciIsImZldGNoIiwibWVzc2FnZVRleHROb2RlIiwiX3JlZjMiLCJfcmVmMyRsZXZlbCIsImhhbmRsZUVycm9yIiwiZmFsbGJhY2tNZXNzYWdlIiwiZXJyb3JPYmplY3QiLCJzaG91bGREaXNwbGF5IiwiZXJyb3JFdmVudCIsImluY2x1ZGVzIiwicHJvbWlzZVJlamVjdGlvbkV2ZW50IiwicmVhc29uIiwiX2NhbGxTdXBlciIsIl9nZXRQcm90b3R5cGVPZiIsIl9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuIiwiX2lzTmF0aXZlUmVmbGVjdENvbnN0cnVjdCIsImNvbnN0cnVjdCIsIl9hc3NlcnRUaGlzSW5pdGlhbGl6ZWQiLCJSZWZlcmVuY2VFcnJvciIsIl9pbmhlcml0cyIsIl9zZXRQcm90b3R5cGVPZiIsIl93cmFwTmF0aXZlU3VwZXIiLCJfaXNOYXRpdmVGdW5jdGlvbiIsImhhcyIsIldyYXBwZXIiLCJfY29uc3RydWN0IiwicCIsIkJvb2xlYW4iLCJ2YWx1ZU9mIiwic2V0UHJvdG90eXBlT2YiLCJfX3Byb3RvX18iLCJfY2xhc3NQcml2YXRlTWV0aG9kSW5pdFNwZWMiLCJfY2hlY2tQcml2YXRlUmVkZWNsYXJhdGlvbiIsImFkZCIsIl9hc3NlcnRDbGFzc0JyYW5kIiwiSFRNTEVsZW1lbnQiLCJhdHRhY2hTaGFkb3ciLCJfV2VicGFja0RldlNlcnZlclByb2dyZXNzIiwiY3VzdG9tRWxlbWVudHMiLCJfV2VicGFja0RldlNlcnZlclByb2dyZXNzX2JyYW5kIiwiV2Vha1NldCIsIldlYnBhY2tEZXZTZXJ2ZXJQcm9ncmVzcyIsIl9IVE1MRWxlbWVudCIsIl90aGlzIiwibW9kZSIsIm1heERhc2hPZmZzZXQiLCJhbmltYXRpb25UaW1lciIsImNvbm5lY3RlZENhbGxiYWNrIiwiX3Jlc2V0IiwiYXR0cmlidXRlQ2hhbmdlZENhbGxiYWNrIiwib2xkVmFsdWUiLCJuZXdWYWx1ZSIsIl91cGRhdGUiLCJfdGhpcyRnZXRBdHRyaWJ1dGUiLCJfTnVtYmVyIiwidHlwZUF0dHIiLCJfY2lyY3VsYXJUZW1wbGF0ZSIsIl9saW5lYXJUZW1wbGF0ZSIsInNoYWRvd1Jvb3QiLCJpbml0aWFsUHJvZ3Jlc3MiLCJvZmZzZXQiLCJzdHJva2VEYXNob2Zmc2V0IiwidGV4dENvbnRlbnQiLCJfaGlkZSIsIl9zaG93IiwiY2xhc3NMaXN0IiwicmVtb3ZlIiwiX3RoaXMyIiwiZGVmaW5lIiwiQ2xpZW50IiwiX193ZWJwYWNrX2Rldl9zZXJ2ZXJfY2xpZW50X18iLCJyZXRyaWVzIiwibWF4UmV0cmllcyIsImluaXRTb2NrZXQiLCJoYW5kbGVycyIsInJldHJ5SW5NcyIsIk1hdGgiLCJwb3ciLCJyYW5kb20iLCJkZWZhdWx0TGV2ZWwiLCJzZW5kTXNnIiwiV29ya2VyR2xvYmFsU2NvcGUiLCJsYXN0SGFzaCIsInVwVG9EYXRlIiwiY2hlY2siLCJ0aGVuIiwidXBkYXRlZE1vZHVsZXMiLCJjYXRjaCIsImZvcm1hdEVycm9yIiwicmVuZXdlZE1vZHVsZXMiLCJ1bmFjY2VwdGVkTW9kdWxlcyIsInBhcnRzIiwibnVtYmVySWRzIiwiZXZlcnkiLCJsb2dMZXZlbCIsImR1bW15Iiwic2hvdWxkTG9nIiwibG9nR3JvdXAiLCJsb2dGbiJdLCJzb3VyY2VSb290IjoiIn0=