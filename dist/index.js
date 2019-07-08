/******/ (function(modules) { // webpackBootstrap
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
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/redux/es/redux.js":
/*!****************************************!*\
  !*** ./node_modules/redux/es/redux.js ***!
  \****************************************/
/*! exports provided: createStore, combineReducers, bindActionCreators, applyMiddleware, compose, __DO_NOT_USE__ActionTypes */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createStore", function() { return createStore; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "combineReducers", function() { return combineReducers; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "bindActionCreators", function() { return bindActionCreators; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "applyMiddleware", function() { return applyMiddleware; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "compose", function() { return compose; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__DO_NOT_USE__ActionTypes", function() { return ActionTypes; });
/* harmony import */ var symbol_observable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! symbol-observable */ "./node_modules/symbol-observable/es/index.js");


/**
 * These are private action types reserved by Redux.
 * For any unknown actions, you must return the current state.
 * If the current state is undefined, you must return the initial state.
 * Do not reference these action types directly in your code.
 */
var randomString = function randomString() {
  return Math.random().toString(36).substring(7).split('').join('.');
};

var ActionTypes = {
  INIT: "@@redux/INIT" + randomString(),
  REPLACE: "@@redux/REPLACE" + randomString(),
  PROBE_UNKNOWN_ACTION: function PROBE_UNKNOWN_ACTION() {
    return "@@redux/PROBE_UNKNOWN_ACTION" + randomString();
  }
};

/**
 * @param {any} obj The object to inspect.
 * @returns {boolean} True if the argument appears to be a plain object.
 */
function isPlainObject(obj) {
  if (typeof obj !== 'object' || obj === null) return false;
  var proto = obj;

  while (Object.getPrototypeOf(proto) !== null) {
    proto = Object.getPrototypeOf(proto);
  }

  return Object.getPrototypeOf(obj) === proto;
}

/**
 * Creates a Redux store that holds the state tree.
 * The only way to change the data in the store is to call `dispatch()` on it.
 *
 * There should only be a single store in your app. To specify how different
 * parts of the state tree respond to actions, you may combine several reducers
 * into a single reducer function by using `combineReducers`.
 *
 * @param {Function} reducer A function that returns the next state tree, given
 * the current state tree and the action to handle.
 *
 * @param {any} [preloadedState] The initial state. You may optionally specify it
 * to hydrate the state from the server in universal apps, or to restore a
 * previously serialized user session.
 * If you use `combineReducers` to produce the root reducer function, this must be
 * an object with the same shape as `combineReducers` keys.
 *
 * @param {Function} [enhancer] The store enhancer. You may optionally specify it
 * to enhance the store with third-party capabilities such as middleware,
 * time travel, persistence, etc. The only store enhancer that ships with Redux
 * is `applyMiddleware()`.
 *
 * @returns {Store} A Redux store that lets you read the state, dispatch actions
 * and subscribe to changes.
 */

function createStore(reducer, preloadedState, enhancer) {
  var _ref2;

  if (typeof preloadedState === 'function' && typeof enhancer === 'function' || typeof enhancer === 'function' && typeof arguments[3] === 'function') {
    throw new Error('It looks like you are passing several store enhancers to ' + 'createStore(). This is not supported. Instead, compose them ' + 'together to a single function');
  }

  if (typeof preloadedState === 'function' && typeof enhancer === 'undefined') {
    enhancer = preloadedState;
    preloadedState = undefined;
  }

  if (typeof enhancer !== 'undefined') {
    if (typeof enhancer !== 'function') {
      throw new Error('Expected the enhancer to be a function.');
    }

    return enhancer(createStore)(reducer, preloadedState);
  }

  if (typeof reducer !== 'function') {
    throw new Error('Expected the reducer to be a function.');
  }

  var currentReducer = reducer;
  var currentState = preloadedState;
  var currentListeners = [];
  var nextListeners = currentListeners;
  var isDispatching = false;

  function ensureCanMutateNextListeners() {
    if (nextListeners === currentListeners) {
      nextListeners = currentListeners.slice();
    }
  }
  /**
   * Reads the state tree managed by the store.
   *
   * @returns {any} The current state tree of your application.
   */


  function getState() {
    if (isDispatching) {
      throw new Error('You may not call store.getState() while the reducer is executing. ' + 'The reducer has already received the state as an argument. ' + 'Pass it down from the top reducer instead of reading it from the store.');
    }

    return currentState;
  }
  /**
   * Adds a change listener. It will be called any time an action is dispatched,
   * and some part of the state tree may potentially have changed. You may then
   * call `getState()` to read the current state tree inside the callback.
   *
   * You may call `dispatch()` from a change listener, with the following
   * caveats:
   *
   * 1. The subscriptions are snapshotted just before every `dispatch()` call.
   * If you subscribe or unsubscribe while the listeners are being invoked, this
   * will not have any effect on the `dispatch()` that is currently in progress.
   * However, the next `dispatch()` call, whether nested or not, will use a more
   * recent snapshot of the subscription list.
   *
   * 2. The listener should not expect to see all state changes, as the state
   * might have been updated multiple times during a nested `dispatch()` before
   * the listener is called. It is, however, guaranteed that all subscribers
   * registered before the `dispatch()` started will be called with the latest
   * state by the time it exits.
   *
   * @param {Function} listener A callback to be invoked on every dispatch.
   * @returns {Function} A function to remove this change listener.
   */


  function subscribe(listener) {
    if (typeof listener !== 'function') {
      throw new Error('Expected the listener to be a function.');
    }

    if (isDispatching) {
      throw new Error('You may not call store.subscribe() while the reducer is executing. ' + 'If you would like to be notified after the store has been updated, subscribe from a ' + 'component and invoke store.getState() in the callback to access the latest state. ' + 'See https://redux.js.org/api-reference/store#subscribe(listener) for more details.');
    }

    var isSubscribed = true;
    ensureCanMutateNextListeners();
    nextListeners.push(listener);
    return function unsubscribe() {
      if (!isSubscribed) {
        return;
      }

      if (isDispatching) {
        throw new Error('You may not unsubscribe from a store listener while the reducer is executing. ' + 'See https://redux.js.org/api-reference/store#subscribe(listener) for more details.');
      }

      isSubscribed = false;
      ensureCanMutateNextListeners();
      var index = nextListeners.indexOf(listener);
      nextListeners.splice(index, 1);
    };
  }
  /**
   * Dispatches an action. It is the only way to trigger a state change.
   *
   * The `reducer` function, used to create the store, will be called with the
   * current state tree and the given `action`. Its return value will
   * be considered the **next** state of the tree, and the change listeners
   * will be notified.
   *
   * The base implementation only supports plain object actions. If you want to
   * dispatch a Promise, an Observable, a thunk, or something else, you need to
   * wrap your store creating function into the corresponding middleware. For
   * example, see the documentation for the `redux-thunk` package. Even the
   * middleware will eventually dispatch plain object actions using this method.
   *
   * @param {Object} action A plain object representing “what changed”. It is
   * a good idea to keep actions serializable so you can record and replay user
   * sessions, or use the time travelling `redux-devtools`. An action must have
   * a `type` property which may not be `undefined`. It is a good idea to use
   * string constants for action types.
   *
   * @returns {Object} For convenience, the same action object you dispatched.
   *
   * Note that, if you use a custom middleware, it may wrap `dispatch()` to
   * return something else (for example, a Promise you can await).
   */


  function dispatch(action) {
    if (!isPlainObject(action)) {
      throw new Error('Actions must be plain objects. ' + 'Use custom middleware for async actions.');
    }

    if (typeof action.type === 'undefined') {
      throw new Error('Actions may not have an undefined "type" property. ' + 'Have you misspelled a constant?');
    }

    if (isDispatching) {
      throw new Error('Reducers may not dispatch actions.');
    }

    try {
      isDispatching = true;
      currentState = currentReducer(currentState, action);
    } finally {
      isDispatching = false;
    }

    var listeners = currentListeners = nextListeners;

    for (var i = 0; i < listeners.length; i++) {
      var listener = listeners[i];
      listener();
    }

    return action;
  }
  /**
   * Replaces the reducer currently used by the store to calculate the state.
   *
   * You might need this if your app implements code splitting and you want to
   * load some of the reducers dynamically. You might also need this if you
   * implement a hot reloading mechanism for Redux.
   *
   * @param {Function} nextReducer The reducer for the store to use instead.
   * @returns {void}
   */


  function replaceReducer(nextReducer) {
    if (typeof nextReducer !== 'function') {
      throw new Error('Expected the nextReducer to be a function.');
    }

    currentReducer = nextReducer;
    dispatch({
      type: ActionTypes.REPLACE
    });
  }
  /**
   * Interoperability point for observable/reactive libraries.
   * @returns {observable} A minimal observable of state changes.
   * For more information, see the observable proposal:
   * https://github.com/tc39/proposal-observable
   */


  function observable() {
    var _ref;

    var outerSubscribe = subscribe;
    return _ref = {
      /**
       * The minimal observable subscription method.
       * @param {Object} observer Any object that can be used as an observer.
       * The observer object should have a `next` method.
       * @returns {subscription} An object with an `unsubscribe` method that can
       * be used to unsubscribe the observable from the store, and prevent further
       * emission of values from the observable.
       */
      subscribe: function subscribe(observer) {
        if (typeof observer !== 'object' || observer === null) {
          throw new TypeError('Expected the observer to be an object.');
        }

        function observeState() {
          if (observer.next) {
            observer.next(getState());
          }
        }

        observeState();
        var unsubscribe = outerSubscribe(observeState);
        return {
          unsubscribe: unsubscribe
        };
      }
    }, _ref[symbol_observable__WEBPACK_IMPORTED_MODULE_0__["default"]] = function () {
      return this;
    }, _ref;
  } // When a store is created, an "INIT" action is dispatched so that every
  // reducer returns their initial state. This effectively populates
  // the initial state tree.


  dispatch({
    type: ActionTypes.INIT
  });
  return _ref2 = {
    dispatch: dispatch,
    subscribe: subscribe,
    getState: getState,
    replaceReducer: replaceReducer
  }, _ref2[symbol_observable__WEBPACK_IMPORTED_MODULE_0__["default"]] = observable, _ref2;
}

/**
 * Prints a warning in the console if it exists.
 *
 * @param {String} message The warning message.
 * @returns {void}
 */
function warning(message) {
  /* eslint-disable no-console */
  if (typeof console !== 'undefined' && typeof console.error === 'function') {
    console.error(message);
  }
  /* eslint-enable no-console */


  try {
    // This error was thrown as a convenience so that if you enable
    // "break on all exceptions" in your console,
    // it would pause the execution at this line.
    throw new Error(message);
  } catch (e) {} // eslint-disable-line no-empty

}

function getUndefinedStateErrorMessage(key, action) {
  var actionType = action && action.type;
  var actionDescription = actionType && "action \"" + String(actionType) + "\"" || 'an action';
  return "Given " + actionDescription + ", reducer \"" + key + "\" returned undefined. " + "To ignore an action, you must explicitly return the previous state. " + "If you want this reducer to hold no value, you can return null instead of undefined.";
}

function getUnexpectedStateShapeWarningMessage(inputState, reducers, action, unexpectedKeyCache) {
  var reducerKeys = Object.keys(reducers);
  var argumentName = action && action.type === ActionTypes.INIT ? 'preloadedState argument passed to createStore' : 'previous state received by the reducer';

  if (reducerKeys.length === 0) {
    return 'Store does not have a valid reducer. Make sure the argument passed ' + 'to combineReducers is an object whose values are reducers.';
  }

  if (!isPlainObject(inputState)) {
    return "The " + argumentName + " has unexpected type of \"" + {}.toString.call(inputState).match(/\s([a-z|A-Z]+)/)[1] + "\". Expected argument to be an object with the following " + ("keys: \"" + reducerKeys.join('", "') + "\"");
  }

  var unexpectedKeys = Object.keys(inputState).filter(function (key) {
    return !reducers.hasOwnProperty(key) && !unexpectedKeyCache[key];
  });
  unexpectedKeys.forEach(function (key) {
    unexpectedKeyCache[key] = true;
  });
  if (action && action.type === ActionTypes.REPLACE) return;

  if (unexpectedKeys.length > 0) {
    return "Unexpected " + (unexpectedKeys.length > 1 ? 'keys' : 'key') + " " + ("\"" + unexpectedKeys.join('", "') + "\" found in " + argumentName + ". ") + "Expected to find one of the known reducer keys instead: " + ("\"" + reducerKeys.join('", "') + "\". Unexpected keys will be ignored.");
  }
}

function assertReducerShape(reducers) {
  Object.keys(reducers).forEach(function (key) {
    var reducer = reducers[key];
    var initialState = reducer(undefined, {
      type: ActionTypes.INIT
    });

    if (typeof initialState === 'undefined') {
      throw new Error("Reducer \"" + key + "\" returned undefined during initialization. " + "If the state passed to the reducer is undefined, you must " + "explicitly return the initial state. The initial state may " + "not be undefined. If you don't want to set a value for this reducer, " + "you can use null instead of undefined.");
    }

    if (typeof reducer(undefined, {
      type: ActionTypes.PROBE_UNKNOWN_ACTION()
    }) === 'undefined') {
      throw new Error("Reducer \"" + key + "\" returned undefined when probed with a random type. " + ("Don't try to handle " + ActionTypes.INIT + " or other actions in \"redux/*\" ") + "namespace. They are considered private. Instead, you must return the " + "current state for any unknown actions, unless it is undefined, " + "in which case you must return the initial state, regardless of the " + "action type. The initial state may not be undefined, but can be null.");
    }
  });
}
/**
 * Turns an object whose values are different reducer functions, into a single
 * reducer function. It will call every child reducer, and gather their results
 * into a single state object, whose keys correspond to the keys of the passed
 * reducer functions.
 *
 * @param {Object} reducers An object whose values correspond to different
 * reducer functions that need to be combined into one. One handy way to obtain
 * it is to use ES6 `import * as reducers` syntax. The reducers may never return
 * undefined for any action. Instead, they should return their initial state
 * if the state passed to them was undefined, and the current state for any
 * unrecognized action.
 *
 * @returns {Function} A reducer function that invokes every reducer inside the
 * passed object, and builds a state object with the same shape.
 */


function combineReducers(reducers) {
  var reducerKeys = Object.keys(reducers);
  var finalReducers = {};

  for (var i = 0; i < reducerKeys.length; i++) {
    var key = reducerKeys[i];

    if (true) {
      if (typeof reducers[key] === 'undefined') {
        warning("No reducer provided for key \"" + key + "\"");
      }
    }

    if (typeof reducers[key] === 'function') {
      finalReducers[key] = reducers[key];
    }
  }

  var finalReducerKeys = Object.keys(finalReducers);
  var unexpectedKeyCache;

  if (true) {
    unexpectedKeyCache = {};
  }

  var shapeAssertionError;

  try {
    assertReducerShape(finalReducers);
  } catch (e) {
    shapeAssertionError = e;
  }

  return function combination(state, action) {
    if (state === void 0) {
      state = {};
    }

    if (shapeAssertionError) {
      throw shapeAssertionError;
    }

    if (true) {
      var warningMessage = getUnexpectedStateShapeWarningMessage(state, finalReducers, action, unexpectedKeyCache);

      if (warningMessage) {
        warning(warningMessage);
      }
    }

    var hasChanged = false;
    var nextState = {};

    for (var _i = 0; _i < finalReducerKeys.length; _i++) {
      var _key = finalReducerKeys[_i];
      var reducer = finalReducers[_key];
      var previousStateForKey = state[_key];
      var nextStateForKey = reducer(previousStateForKey, action);

      if (typeof nextStateForKey === 'undefined') {
        var errorMessage = getUndefinedStateErrorMessage(_key, action);
        throw new Error(errorMessage);
      }

      nextState[_key] = nextStateForKey;
      hasChanged = hasChanged || nextStateForKey !== previousStateForKey;
    }

    return hasChanged ? nextState : state;
  };
}

function bindActionCreator(actionCreator, dispatch) {
  return function () {
    return dispatch(actionCreator.apply(this, arguments));
  };
}
/**
 * Turns an object whose values are action creators, into an object with the
 * same keys, but with every function wrapped into a `dispatch` call so they
 * may be invoked directly. This is just a convenience method, as you can call
 * `store.dispatch(MyActionCreators.doSomething())` yourself just fine.
 *
 * For convenience, you can also pass a single function as the first argument,
 * and get a function in return.
 *
 * @param {Function|Object} actionCreators An object whose values are action
 * creator functions. One handy way to obtain it is to use ES6 `import * as`
 * syntax. You may also pass a single function.
 *
 * @param {Function} dispatch The `dispatch` function available on your Redux
 * store.
 *
 * @returns {Function|Object} The object mimicking the original object, but with
 * every action creator wrapped into the `dispatch` call. If you passed a
 * function as `actionCreators`, the return value will also be a single
 * function.
 */


function bindActionCreators(actionCreators, dispatch) {
  if (typeof actionCreators === 'function') {
    return bindActionCreator(actionCreators, dispatch);
  }

  if (typeof actionCreators !== 'object' || actionCreators === null) {
    throw new Error("bindActionCreators expected an object or a function, instead received " + (actionCreators === null ? 'null' : typeof actionCreators) + ". " + "Did you write \"import ActionCreators from\" instead of \"import * as ActionCreators from\"?");
  }

  var keys = Object.keys(actionCreators);
  var boundActionCreators = {};

  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    var actionCreator = actionCreators[key];

    if (typeof actionCreator === 'function') {
      boundActionCreators[key] = bindActionCreator(actionCreator, dispatch);
    }
  }

  return boundActionCreators;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    var ownKeys = Object.keys(source);

    if (typeof Object.getOwnPropertySymbols === 'function') {
      ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
        return Object.getOwnPropertyDescriptor(source, sym).enumerable;
      }));
    }

    ownKeys.forEach(function (key) {
      _defineProperty(target, key, source[key]);
    });
  }

  return target;
}

/**
 * Composes single-argument functions from right to left. The rightmost
 * function can take multiple arguments as it provides the signature for
 * the resulting composite function.
 *
 * @param {...Function} funcs The functions to compose.
 * @returns {Function} A function obtained by composing the argument functions
 * from right to left. For example, compose(f, g, h) is identical to doing
 * (...args) => f(g(h(...args))).
 */
function compose() {
  for (var _len = arguments.length, funcs = new Array(_len), _key = 0; _key < _len; _key++) {
    funcs[_key] = arguments[_key];
  }

  if (funcs.length === 0) {
    return function (arg) {
      return arg;
    };
  }

  if (funcs.length === 1) {
    return funcs[0];
  }

  return funcs.reduce(function (a, b) {
    return function () {
      return a(b.apply(void 0, arguments));
    };
  });
}

/**
 * Creates a store enhancer that applies middleware to the dispatch method
 * of the Redux store. This is handy for a variety of tasks, such as expressing
 * asynchronous actions in a concise manner, or logging every action payload.
 *
 * See `redux-thunk` package as an example of the Redux middleware.
 *
 * Because middleware is potentially asynchronous, this should be the first
 * store enhancer in the composition chain.
 *
 * Note that each middleware will be given the `dispatch` and `getState` functions
 * as named arguments.
 *
 * @param {...Function} middlewares The middleware chain to be applied.
 * @returns {Function} A store enhancer applying the middleware.
 */

function applyMiddleware() {
  for (var _len = arguments.length, middlewares = new Array(_len), _key = 0; _key < _len; _key++) {
    middlewares[_key] = arguments[_key];
  }

  return function (createStore) {
    return function () {
      var store = createStore.apply(void 0, arguments);

      var _dispatch = function dispatch() {
        throw new Error("Dispatching while constructing your middleware is not allowed. " + "Other middleware would not be applied to this dispatch.");
      };

      var middlewareAPI = {
        getState: store.getState,
        dispatch: function dispatch() {
          return _dispatch.apply(void 0, arguments);
        }
      };
      var chain = middlewares.map(function (middleware) {
        return middleware(middlewareAPI);
      });
      _dispatch = compose.apply(void 0, chain)(store.dispatch);
      return _objectSpread({}, store, {
        dispatch: _dispatch
      });
    };
  };
}

/*
 * This is a dummy function to check if the function name has been altered by minification.
 * If the function has been minified and NODE_ENV !== 'production', warn the user.
 */

function isCrushed() {}

if ( true && typeof isCrushed.name === 'string' && isCrushed.name !== 'isCrushed') {
  warning('You are currently using minified code outside of NODE_ENV === "production". ' + 'This means that you are running a slower development build of Redux. ' + 'You can use loose-envify (https://github.com/zertosh/loose-envify) for browserify ' + 'or setting mode to production in webpack (https://webpack.js.org/concepts/mode/) ' + 'to ensure you have the correct code for your production build.');
}




/***/ }),

/***/ "./node_modules/symbol-observable/es/index.js":
/*!****************************************************!*\
  !*** ./node_modules/symbol-observable/es/index.js ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var _ponyfill_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ponyfill.js */ "./node_modules/symbol-observable/es/ponyfill.js");
/* global window */


var root;

if (typeof self !== 'undefined') {
  root = self;
} else if (typeof window !== 'undefined') {
  root = window;
} else if (typeof global !== 'undefined') {
  root = global;
} else if (true) {
  root = module;
} else {}

var result = Object(_ponyfill_js__WEBPACK_IMPORTED_MODULE_0__["default"])(root);
/* harmony default export */ __webpack_exports__["default"] = (result);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./node_modules/symbol-observable/es/ponyfill.js":
/*!*******************************************************!*\
  !*** ./node_modules/symbol-observable/es/ponyfill.js ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return symbolObservablePonyfill; });
function symbolObservablePonyfill(root) {
	var result;
	var Symbol = root.Symbol;

	if (typeof Symbol === 'function') {
		if (Symbol.observable) {
			result = Symbol.observable;
		} else {
			result = Symbol('observable');
			Symbol.observable = result;
		}
	} else {
		result = '@@observable';
	}

	return result;
};


/***/ }),

/***/ "./node_modules/webpack/buildin/harmony-module.js":
/*!*******************************************!*\
  !*** (webpack)/buildin/harmony-module.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function(originalModule) {
	if (!originalModule.webpackPolyfill) {
		var module = Object.create(originalModule);
		// module.parent = undefined by default
		if (!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		Object.defineProperty(module, "exports", {
			enumerable: true
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),

/***/ "./src/renderer/UIconnections.js":
/*!***************************************!*\
  !*** ./src/renderer/UIconnections.js ***!
  \***************************************/
/*! exports provided: weightsUI, inputsUI, outputsUI, mapmodeUI */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "weightsUI", function() { return weightsUI; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "inputsUI", function() { return inputsUI; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "outputsUI", function() { return outputsUI; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapmodeUI", function() { return mapmodeUI; });
const weightsUI = document.querySelector('#weights')
const inputsUI = document.querySelector('#inputs')
const outputsUI = document.querySelector('#outputs')
const mapmodeUI = document.querySelector('#mapmode input')




/***/ }),

/***/ "./src/renderer/UIfunction.js":
/*!************************************!*\
  !*** ./src/renderer/UIfunction.js ***!
  \************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _state__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./state */ "./src/renderer/state.js");
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./actions */ "./src/renderer/actions.js");
/* harmony import */ var _UIconnections__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./UIconnections */ "./src/renderer/UIconnections.js");
/* harmony import */ var _helpers_midi__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./helpers/midi */ "./src/renderer/helpers/midi.js");
/* harmony import */ var _mapping__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./mapping */ "./src/renderer/mapping.js");
/* harmony import */ var _parameters__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./parameters */ "./src/renderer/parameters.js");
/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! electron */ "electron");
/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(electron__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _weights__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./weights */ "./src/renderer/weights.js");









_UIconnections__WEBPACK_IMPORTED_MODULE_2__["mapmodeUI"].addEventListener('change', event => {
  const mode = _UIconnections__WEBPACK_IMPORTED_MODULE_2__["mapmodeUI"].checked

  if (mode) {
    electron__WEBPACK_IMPORTED_MODULE_6__["ipcRenderer"].send('show-ontop')
    _actions__WEBPACK_IMPORTED_MODULE_1__["default"].mapmode(mode)
  } else {
    const currentState = _state__WEBPACK_IMPORTED_MODULE_0__["default"].getState()
    let feedback = []
    currentState.io.feedback.onmidimessage = midiMessage => {
      feedback.push(Object(_helpers_midi__WEBPACK_IMPORTED_MODULE_3__["toID"])(midiMessage.data))
    }
    [..._mapping__WEBPACK_IMPORTED_MODULE_4__["default"].parameters, ..._parameters__WEBPACK_IMPORTED_MODULE_5__["potentialParameters"]].forEach(parameter => {
      currentState.io.selected.output.send([...Object(_helpers_midi__WEBPACK_IMPORTED_MODULE_3__["fromID"])(parameter), 0])
    })
    setTimeout(() => {
      _parameters__WEBPACK_IMPORTED_MODULE_5__["potentialParameters"].forEach(parameter => {
        if (feedback.includes(parameter)) {
          if (!_mapping__WEBPACK_IMPORTED_MODULE_4__["default"].parameters.includes(parameter)) {
            _mapping__WEBPACK_IMPORTED_MODULE_4__["default"].addParameter(parameter)
          }
        } else {
          _mapping__WEBPACK_IMPORTED_MODULE_4__["default"].deleteParameter(parameter)
        }
      })
      // currentState.io.feedback.onmidimessage = undefined
      _actions__WEBPACK_IMPORTED_MODULE_1__["default"].mapmode(mode)
      _actions__WEBPACK_IMPORTED_MODULE_1__["default"].mapping()
      Object(_weights__WEBPACK_IMPORTED_MODULE_7__["render"])()
    }, 500)
  }
})


/***/ }),

/***/ "./src/renderer/actions.js":
/*!*********************************!*\
  !*** ./src/renderer/actions.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _state__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./state */ "./src/renderer/state.js");
/* harmony import */ var _mapping__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./mapping */ "./src/renderer/mapping.js");



const mapmode = (mode) => {
  // if (action.mode) {
  //
  // } else {
  //   mapping.parameters.forEach((parameter, index) => {
  //     mapping.output(parameter, 0)
  //   })
  // }
  _state__WEBPACK_IMPORTED_MODULE_0__["default"].dispatch({
    type: 'MAP_MODE',
    mode
  })
}

const input = (input) => {
  const currentState = _state__WEBPACK_IMPORTED_MODULE_0__["default"].getState()
  currentState.io.selected.input.onmidimessage = undefined
  input.onmidimessage = (midiMessage) => {
    document.dispatchEvent(new CustomEvent('midiIN', {detail: midiMessage.data}))
  }
  _state__WEBPACK_IMPORTED_MODULE_0__["default"].dispatch({
    type: 'IO::SELECT_INPUT',
    input
  })
}

const output = (output) => {
  _state__WEBPACK_IMPORTED_MODULE_0__["default"].dispatch({
    type: 'IO::SELECT_OUTPUT',
    output
  })
}

const available = (io) => {
  _state__WEBPACK_IMPORTED_MODULE_0__["default"].dispatch({
    type: 'IO::AVAILABLE',
    io
  })
}

const savemapping = () => {
  _state__WEBPACK_IMPORTED_MODULE_0__["default"].dispatch({
    type: 'MAPPING',
    mapping: _mapping__WEBPACK_IMPORTED_MODULE_1__["default"].mapping
  })
}

const action = {mapmode, io: {available, select: {input, output}}, mapping: savemapping}
/* harmony default export */ __webpack_exports__["default"] = (action);


/***/ }),

/***/ "./src/renderer/controllers.js":
/*!*************************************!*\
  !*** ./src/renderer/controllers.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _state__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./state */ "./src/renderer/state.js");
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./actions */ "./src/renderer/actions.js");
/* harmony import */ var _UIconnections__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./UIconnections */ "./src/renderer/UIconnections.js");




const startMIDI = onmidimessage => {
  navigator.requestMIDIAccess().then(midiAccess => {
    const getIO = (type, midiAccess) => Array.from(midiAccess[type].entries()).map(io => io[1])
    const allIOs = {
      inputs: getIO('inputs', midiAccess),
      outputs: getIO('outputs', midiAccess)
    }
    _actions__WEBPACK_IMPORTED_MODULE_1__["default"].io.available(allIOs)

    const makeUI = (ports, element) => {
      ports.forEach((io, index) => {
        const option = document.createElement('option')
        option.value = index
        option.innerHTML = io.name
        element.appendChild(option)
      })
    }
    makeUI(allIOs.inputs, _UIconnections__WEBPACK_IMPORTED_MODULE_2__["inputsUI"])
    makeUI(allIOs.outputs, _UIconnections__WEBPACK_IMPORTED_MODULE_2__["outputsUI"])

    inputs.addEventListener('change', e => {
      _actions__WEBPACK_IMPORTED_MODULE_1__["default"].io.select.input(_state__WEBPACK_IMPORTED_MODULE_0__["default"].getState().io.available.inputs[e.target.value])
    })

    outputs.addEventListener('change', e => {
      _actions__WEBPACK_IMPORTED_MODULE_1__["default"].io.select.output(_state__WEBPACK_IMPORTED_MODULE_0__["default"].getState().io.available.outputs[e.target.value])
    })

    _actions__WEBPACK_IMPORTED_MODULE_1__["default"].io.select.input(_state__WEBPACK_IMPORTED_MODULE_0__["default"].getState().io.available.inputs[0])
    _actions__WEBPACK_IMPORTED_MODULE_1__["default"].io.select.output(_state__WEBPACK_IMPORTED_MODULE_0__["default"].getState().io.available.outputs[1])
  })
}


/* harmony default export */ __webpack_exports__["default"] = (startMIDI);


/***/ }),

/***/ "./src/renderer/helpers/classes.js":
/*!*****************************************!*\
  !*** ./src/renderer/helpers/classes.js ***!
  \*****************************************/
/*! exports provided: Change, Counter */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Change", function() { return Change; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Counter", function() { return Counter; });
class Change {
  constructor() {
    this.item
  }
  check(i){
    const change = this.item == i
    this.item = i
    return change
  }
}

class Counter {
  constructor(init = 0, exclude = []){
    this.init = init
    this.value = this.init
    this.exclude = exclude
  }
  next(){
    this.value += 1
    while (this.exclude.includes(this.value)) {
      this.value += 1
    }
    return this.value
  }
  reset(){
    return this.value = this.init
  }
}




/***/ }),

/***/ "./src/renderer/helpers/mappingClass.js":
/*!**********************************************!*\
  !*** ./src/renderer/helpers/mappingClass.js ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Mapping; });
/* harmony import */ var _matrix__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./matrix */ "./src/renderer/helpers/matrix.js");


// TODO: store all last control values and trigger this.value when this.editWeight is triggered.

const bothMatrices = function(callback) {
  [this.weights, this.values].forEach(callback)
}

class Mapping {
  constructor(mapping = {}) {
    this.output
    this.values = new _matrix__WEBPACK_IMPORTED_MODULE_0__["default"]()
    this.weights = new _matrix__WEBPACK_IMPORTED_MODULE_0__["default"]()
    this.controls = new Array()
    this.parameters = new Array()
    this.mapping = mapping
    this.matrices = bothMatrices.bind(this)
  }
  input(control, value){
    const index = this.controls.indexOf(control)
    const controlColumn = this.weights.getColumn(index)
    for (let i = 0; i < controlColumn.length; i++) {
      this.values[i][index] = controlColumn[i] * value
    }
    console.dir(this.values);
    for (let i = 0; i < controlColumn.length; i++) {
      if (controlColumn[i] != 0) {
        let outputValue = 0
        for (let j = 0; j < this.values[i].length; j++) {
          outputValue += this.values[i][j]
        }
        this.output(this.parameters[i], outputValue)
      }
    }
  }
  addControl(control){
    this.controls.push(control)
    this.matrices((matrix) => {
      matrix.addColumn()
    })
  }
  addParameter(parameter){
    this.parameters.push(parameter)
    this.matrices((matrix) => {
      matrix.addRow()
    })
  }
  deleteControl(control){
    const index = this.controls.indexOf(control)
    this.controls.splice(index, 1)
    this.matrices((matrix) => {
      matrix.deleteColumn(index)
    })
  }
  deleteParameter(parameter){
    const index = this.parameters.indexOf(parameter)
    this.controls.splice(index, 1)
    this.matrices((matrix) => {
      matrix.deleteRow(index)
    })
  }
  edit(row, column, value){
    return this.weights.edit(row, column, value)
  }
  changeControlIndex(control, to){

  }
  changeParameterIndex(parameter, to){

  }
  get mapping() {
    return {
      weights: new _matrix__WEBPACK_IMPORTED_MODULE_0__["default"](this.weights),
      controls: [...this.controls],
      parameters: [...this.parameters]
    }
  }
  set mapping(newMapping) {
    Object.assign(this, newMapping)
  }
}


/***/ }),

/***/ "./src/renderer/helpers/matrix.js":
/*!****************************************!*\
  !*** ./src/renderer/helpers/matrix.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Matrix; });
const relative = (row, c, value) => {
  row[c] = value
  let sum = 0
  for (let i = 0; i < row.length; i++) {
    sum += row[i]
  }
  if (sum == 0) {
    row[c] = 1
    sum = 1
  } else {
    for (let i = 0; i < row.length; i++) {
      row[i] = row[i] / sum
    }
  }
  return row
}

const absolute = (row, c, value) => {
  const oldValue = row.splice(c, 1)[0]
  if (oldValue == 1) {
    for (let i = 0; i < row.length; i++) {
      row.fill((1 - value)/row.length)
    }
  } else {
    for (let i = 0; i < row.length; i++) {
      row[i] = (row[i] / (1 - oldValue)) * (1 - value)
    }
  }
  row.splice(c, 0, value)
  return row
}

class Matrix extends Array {
  constructor(matrix = []) {
    super(...matrix)
    this._columns = matrix._columns || 0
  }

  setRow(index, array) {
    return this[index] = array
  }

  setColumn(index, array) {
    this.forEach((row, i) => {
      this[i][index] = array[i]
    })
    return this
  }

  getColumn(index){
    let column = []
    for (let i = 0; i < this.length; i++) {
      column[i] = this[i][index]
    }
    return column
  }

  addRow() {
    let row = new Array(this._columns).fill(0)
    row[this._columns <= this.length ? this._columns -1 : this.length] = 1
    this.push(row)
    return this
  }

  addColumn() {
    this.forEach((row, i) => {
      this[i].push(0)
    })
    this._columns += 1
    return this
  }

  edit(r, c, value){
    // absolute(this[r], c, value)
    const row = absolute(this[r], c, value)
    this[r] = row
    return row
  }

  deleteRow(index) {
    if (this.length > 0) {
      this.splice(index, 1)
    }
    return this
  }

  deleteColumn(index) {
    if (this.length != 0) {
      this.forEach((row, i) => {
        this[i].splice(index, 1)
      })
      this._columns -= 1
    }
    return this
  }
}


/***/ }),

/***/ "./src/renderer/helpers/midi.js":
/*!**************************************!*\
  !*** ./src/renderer/helpers/midi.js ***!
  \**************************************/
/*! exports provided: midiFormat, midiParse, toID, fromID */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "midiFormat", function() { return midiFormat; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "midiParse", function() { return midiParse; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "toID", function() { return toID; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fromID", function() { return fromID; });
const midiParse = midiMessage => {
  return {
    type: (midiMessage.data[0] >> 4) - 9,
    index: midiMessage.data[1],
    value: midiMessage.data[2] / 127,
    midiChannel: (midiMessage.data[0] & 15) + 1
  }
}

const midiFormat = midi => {
  return [
    ((midi.type + 9) << 4) | (midi.midiChannel -1),
    midi.index,
    midi.value * 127
  ]
}

const toID = (array) => {
  return (array[0] << 7) | array[1]
}

const fromID = (id) => {
  return [id >> 7, id & 127]
}





/***/ }),

/***/ "./src/renderer/index.js":
/*!*******************************!*\
  !*** ./src/renderer/index.js ***!
  \*******************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _mapnet__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./mapnet */ "./src/renderer/mapnet.js");
/* harmony import */ var _makeUI__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./makeUI */ "./src/renderer/makeUI.js");



/***/ }),

/***/ "./src/renderer/makeUI.js":
/*!********************************!*\
  !*** ./src/renderer/makeUI.js ***!
  \********************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _UIconnections__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./UIconnections */ "./src/renderer/UIconnections.js");


document.querySelector('#mapmode').addEventListener('click', (event) => {
  if (_UIconnections__WEBPACK_IMPORTED_MODULE_0__["mapmodeUI"].checked) {
    event.target.classList.remove('checked')
    _UIconnections__WEBPACK_IMPORTED_MODULE_0__["mapmodeUI"].checked = false
  } else {
    event.target.classList.add('checked')
    _UIconnections__WEBPACK_IMPORTED_MODULE_0__["mapmodeUI"].checked = true
  }
  let evt = document.createEvent("HTMLEvents");
  evt.initEvent("change", false, true);
  _UIconnections__WEBPACK_IMPORTED_MODULE_0__["mapmodeUI"].dispatchEvent(evt);
})


/***/ }),

/***/ "./src/renderer/mapnet.js":
/*!********************************!*\
  !*** ./src/renderer/mapnet.js ***!
  \********************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _state__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./state */ "./src/renderer/state.js");
/* harmony import */ var _helpers_classes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./helpers/classes */ "./src/renderer/helpers/classes.js");
/* harmony import */ var _helpers_midi__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./helpers/midi */ "./src/renderer/helpers/midi.js");
/* harmony import */ var _mapping__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./mapping */ "./src/renderer/mapping.js");
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./actions */ "./src/renderer/actions.js");
/* harmony import */ var _UIfunction__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./UIfunction */ "./src/renderer/UIfunction.js");
/* harmony import */ var _controllers__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./controllers */ "./src/renderer/controllers.js");
/* harmony import */ var _weights__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./weights */ "./src/renderer/weights.js");










// TERMINOLOGY
// control: midi input to be mapped
// weight: the factor that scales the value of a control targeted to a specific parameter
// parameter: a parameter on a DAW that is MIDI mappable

// newControl.check(value) returns true if value != previousValue
const newControl = new _helpers_classes__WEBPACK_IMPORTED_MODULE_1__["Change"]()

const parseMIDI = event => [Object(_helpers_midi__WEBPACK_IMPORTED_MODULE_2__["toID"])(event.detail), value = event.detail[2]]

// MIDI INPUT
// add when mapmode in on and map when it's off
document.addEventListener('midiIN', event => {
  const [id, value] = parseMIDI(),
  {mapmode} = _state__WEBPACK_IMPORTED_MODULE_0__["default"].getState()
  // if the midi id is different than the previous one, and mapmode is on, and the id is not allready mapped
  if (newControl.check(id) && mapmode && !_mapping__WEBPACK_IMPORTED_MODULE_3__["default"].controls.includes(id)){
    // add a new column
      _mapping__WEBPACK_IMPORTED_MODULE_3__["default"].addControl(id)
    // update UI
      Object(_weights__WEBPACK_IMPORTED_MODULE_7__["render"])()
    // and ?
      _actions__WEBPACK_IMPORTED_MODULE_4__["default"].mapping()
    }
  // if the mapmode is off and the midi id is mapped
  if (!mapmode && _mapping__WEBPACK_IMPORTED_MODULE_3__["default"].controls.includes(id)) {
    // send a value to the mapper matrix
      _mapping__WEBPACK_IMPORTED_MODULE_3__["default"].input(id, value / 127)
    }
  })

const weightIn = (r, c, value) => {
  return _mapping__WEBPACK_IMPORTED_MODULE_3__["default"].edit(r, c, value)
}

const newParameter = new _helpers_classes__WEBPACK_IMPORTED_MODULE_1__["Change"]()
const parameterIn = id => {
  if (newParameter.check(id) && currentState.mapmode && !_mapping__WEBPACK_IMPORTED_MODULE_3__["default"].parameters.includes(id)) {
    _mapping__WEBPACK_IMPORTED_MODULE_3__["default"].addParameter(id)
  }
}

Object(_controllers__WEBPACK_IMPORTED_MODULE_6__["default"])()
Object(_weights__WEBPACK_IMPORTED_MODULE_7__["connectWeights"])(weightIn)
// connectParameters(parameterIn)

// connectGUI()
//
// test init
// for (let i = 0; i < 2; i++) {
//   mapMatrix.addControl(toID([176, i]))
// }
//
// for (let i = 0; i < 2; i++) {
//   mapMatrix.addParameter(toID([176, i]))
// }

// render()
// const currentState = state.getState()
// console.dir(currentState.input);


/***/ }),

/***/ "./src/renderer/mapping.js":
/*!*********************************!*\
  !*** ./src/renderer/mapping.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _state__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./state */ "./src/renderer/state.js");
/* harmony import */ var _helpers_mappingClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./helpers/mappingClass */ "./src/renderer/helpers/mappingClass.js");
/* harmony import */ var _helpers_midi__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./helpers/midi */ "./src/renderer/helpers/midi.js");




window.mapping = new _helpers_mappingClass__WEBPACK_IMPORTED_MODULE_1__["default"]()

mapping.output = (id, value) => {
  _state__WEBPACK_IMPORTED_MODULE_0__["default"].getState().io.selected.output.send([...Object(_helpers_midi__WEBPACK_IMPORTED_MODULE_2__["fromID"])(id), value * 127])
}

/* harmony default export */ __webpack_exports__["default"] = (mapping);


/***/ }),

/***/ "./src/renderer/parameters.js":
/*!************************************!*\
  !*** ./src/renderer/parameters.js ***!
  \************************************/
/*! exports provided: potentialParameters */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "potentialParameters", function() { return potentialParameters; });
/* harmony import */ var _state__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./state */ "./src/renderer/state.js");
/* harmony import */ var _helpers_classes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./helpers/classes */ "./src/renderer/helpers/classes.js");
/* harmony import */ var _helpers_midi__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./helpers/midi */ "./src/renderer/helpers/midi.js");
/* harmony import */ var _mapping__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./mapping */ "./src/renderer/mapping.js");
/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! electron */ "electron");
/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(electron__WEBPACK_IMPORTED_MODULE_4__);






const counter = new _helpers_classes__WEBPACK_IMPORTED_MODULE_1__["Counter"](22528, _mapping__WEBPACK_IMPORTED_MODULE_3__["default"].parameters)
const potentialParameters = []

electron__WEBPACK_IMPORTED_MODULE_4__["ipcRenderer"].on('ontop-clicked-los', () => {
  const message = counter.next()
  // controlIn(message)
  potentialParameters.push(message)
  _state__WEBPACK_IMPORTED_MODULE_0__["default"].getState().io.selected.output.send([...Object(_helpers_midi__WEBPACK_IMPORTED_MODULE_2__["fromID"])(message), 0])
})




/***/ }),

/***/ "./src/renderer/state.js":
/*!*******************************!*\
  !*** ./src/renderer/state.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var _helpers_matrix__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./helpers/matrix */ "./src/renderer/helpers/matrix.js");



const io = (state, action) => {
  state = state ? state : {
    selected: {
      input: {},
      output: {},
    },
    available: {
      inputs: {},
      outputs: {},
    },
    // feedback contains MIDI outputs that correspond to the selected midi inputs
    // these are usefull for sending feedback to the MIDI controler
    feedback: {},
  }
  switch (action.type) {
    case 'IO::SELECT_INPUT':
      return Object.assign(state, {
        selected: Object.assign(state.selected, {input: action.input})
      })
      break
    case 'IO::SELECT_OUTPUT':
      return Object.assign(state, {
        selected: Object.assign(state.selected, {output: action.output}),
        feedback: state.available.inputs.find(input => input.name == action.output.name || input.id == action.output.id)
      })
      break
    case 'IO::AVAILABLE':
    return Object.assign(state, {
      available: Object.assign(state.available, action.io)
    })
    default:
      return state
  }
}

const mapmode = (state = false, action) => {
  if (action.type == 'MAP_MODE') {
    return action.mode
  } else {
    return state
  }
}

const mapping = (state = {}, action) => {
  if (action.type == 'MAPPING') {
    return action.mapping
  } else {
    return state
  }
}

const reducer = Object(redux__WEBPACK_IMPORTED_MODULE_0__["combineReducers"])({io, mapmode, mapping})

let state = Object(redux__WEBPACK_IMPORTED_MODULE_0__["createStore"])(reducer)
window.state = state

state.subscribe(() => {
  const c = state.getState()
  console.dir(c);
})

/* harmony default export */ __webpack_exports__["default"] = (state);


/***/ }),

/***/ "./src/renderer/weights.js":
/*!*********************************!*\
  !*** ./src/renderer/weights.js ***!
  \*********************************/
/*! exports provided: connectWeights, render */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "connectWeights", function() { return connectWeights; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony import */ var _mapping__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./mapping */ "./src/renderer/mapping.js");
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./actions */ "./src/renderer/actions.js");
/* harmony import */ var _UIconnections__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./UIconnections */ "./src/renderer/UIconnections.js");




const grayscale = brightness => `rgb(${[brightness, brightness, brightness]})`

// TODO: on mapmode pass MIDI messages through, from the controller to the DAW.
//       That way a one-by-one matrix is made.

let table;
let callback;
let saveCallback;

const clicking = (rowElement, r, c) => {
  return event => {
    const initY = event.clientY
    const weight = _mapping__WEBPACK_IMPORTED_MODULE_0__["default"].weights[r][c]
    const dragging = event => {
      let value = (initY - event.clientY) * 0.006 + weight
      value = value > 1 ? 1 : value < 0 ? 0 : value
      const newColumn = callback(r, c, value)
      rowElement.childNodes.forEach((item, i) => {
        item.style.backgroundColor = grayscale(255 - newColumn[i] * 255)
      })
    }
    document.addEventListener('mousemove', dragging)
    const mouseup = event => {
      _actions__WEBPACK_IMPORTED_MODULE_1__["default"].mapping()
      document.removeEventListener('mousemove', dragging)
      document.removeEventListener('mouseup', mouseup)
    }
    document.addEventListener('mouseup', mouseup)
  }
}

const render = () => {
  table.innerHTML = ''
  _mapping__WEBPACK_IMPORTED_MODULE_0__["default"].weights.forEach((row, r) => {
    const rowElement = document.createElement('tr')
    row.forEach((cell, c) => {
      const item = document.createElement('th')
      item.style.backgroundColor = grayscale(255 - _mapping__WEBPACK_IMPORTED_MODULE_0__["default"].weights[r][c] * 255)
      item.onmousedown = clicking(rowElement, r, c)

      rowElement.appendChild(item)
    })
    table.appendChild(rowElement)
  })
}

const connectWeights = cb => {
  callback = cb
  _UIconnections__WEBPACK_IMPORTED_MODULE_2__["weightsUI"].innerHTML = ''
  table = document.createElement('table')
  render()
  _UIconnections__WEBPACK_IMPORTED_MODULE_2__["weightsUI"].appendChild(table)
}




/***/ }),

/***/ 0:
/*!*************************************!*\
  !*** multi ./src/renderer/index.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /Users/dimitriaatos/Dropbox/why sesame/Max/mapping network/mapnet/src/renderer/index.js */"./src/renderer/index.js");


/***/ }),

/***/ "electron":
/*!***************************!*\
  !*** external "electron" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("electron");

/***/ })

/******/ });
//# sourceMappingURL=index.js.map