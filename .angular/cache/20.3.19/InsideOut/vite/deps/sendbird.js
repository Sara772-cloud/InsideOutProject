import {
  __commonJS
} from "./chunk-TXDUYLVM.js";

// node_modules/axios/lib/helpers/bind.js
var require_bind = __commonJS({
  "node_modules/axios/lib/helpers/bind.js"(exports, module) {
    "use strict";
    module.exports = function bind(fn, thisArg) {
      return function wrap() {
        var args = new Array(arguments.length);
        for (var i = 0; i < args.length; i++) {
          args[i] = arguments[i];
        }
        return fn.apply(thisArg, args);
      };
    };
  }
});

// node_modules/axios/lib/utils.js
var require_utils = __commonJS({
  "node_modules/axios/lib/utils.js"(exports, module) {
    "use strict";
    var bind = require_bind();
    var toString = Object.prototype.toString;
    var kindOf = /* @__PURE__ */ (function(cache) {
      return function(thing) {
        var str = toString.call(thing);
        return cache[str] || (cache[str] = str.slice(8, -1).toLowerCase());
      };
    })(/* @__PURE__ */ Object.create(null));
    function kindOfTest(type) {
      type = type.toLowerCase();
      return function isKindOf(thing) {
        return kindOf(thing) === type;
      };
    }
    function isArray(val) {
      return Array.isArray(val);
    }
    function isUndefined(val) {
      return typeof val === "undefined";
    }
    function isBuffer(val) {
      return val !== null && !isUndefined(val) && val.constructor !== null && !isUndefined(val.constructor) && typeof val.constructor.isBuffer === "function" && val.constructor.isBuffer(val);
    }
    var isArrayBuffer = kindOfTest("ArrayBuffer");
    function isArrayBufferView(val) {
      var result;
      if (typeof ArrayBuffer !== "undefined" && ArrayBuffer.isView) {
        result = ArrayBuffer.isView(val);
      } else {
        result = val && val.buffer && isArrayBuffer(val.buffer);
      }
      return result;
    }
    function isString(val) {
      return typeof val === "string";
    }
    function isNumber(val) {
      return typeof val === "number";
    }
    function isObject(val) {
      return val !== null && typeof val === "object";
    }
    function isPlainObject(val) {
      if (kindOf(val) !== "object") {
        return false;
      }
      var prototype = Object.getPrototypeOf(val);
      return prototype === null || prototype === Object.prototype;
    }
    var isDate = kindOfTest("Date");
    var isFile = kindOfTest("File");
    var isBlob = kindOfTest("Blob");
    var isFileList = kindOfTest("FileList");
    function isFunction(val) {
      return toString.call(val) === "[object Function]";
    }
    function isStream(val) {
      return isObject(val) && isFunction(val.pipe);
    }
    function isFormData(thing) {
      var pattern = "[object FormData]";
      return thing && (typeof FormData === "function" && thing instanceof FormData || toString.call(thing) === pattern || isFunction(thing.toString) && thing.toString() === pattern);
    }
    var isURLSearchParams = kindOfTest("URLSearchParams");
    function trim(str) {
      return str.trim ? str.trim() : str.replace(/^\s+|\s+$/g, "");
    }
    function isStandardBrowserEnv() {
      if (typeof navigator !== "undefined" && (navigator.product === "ReactNative" || navigator.product === "NativeScript" || navigator.product === "NS")) {
        return false;
      }
      return typeof window !== "undefined" && typeof document !== "undefined";
    }
    function forEach(obj, fn) {
      if (obj === null || typeof obj === "undefined") {
        return;
      }
      if (typeof obj !== "object") {
        obj = [obj];
      }
      if (isArray(obj)) {
        for (var i = 0, l = obj.length; i < l; i++) {
          fn.call(null, obj[i], i, obj);
        }
      } else {
        for (var key in obj) {
          if (Object.prototype.hasOwnProperty.call(obj, key)) {
            fn.call(null, obj[key], key, obj);
          }
        }
      }
    }
    function merge() {
      var result = {};
      function assignValue(val, key) {
        if (isPlainObject(result[key]) && isPlainObject(val)) {
          result[key] = merge(result[key], val);
        } else if (isPlainObject(val)) {
          result[key] = merge({}, val);
        } else if (isArray(val)) {
          result[key] = val.slice();
        } else {
          result[key] = val;
        }
      }
      for (var i = 0, l = arguments.length; i < l; i++) {
        forEach(arguments[i], assignValue);
      }
      return result;
    }
    function extend(a, b, thisArg) {
      forEach(b, function assignValue(val, key) {
        if (thisArg && typeof val === "function") {
          a[key] = bind(val, thisArg);
        } else {
          a[key] = val;
        }
      });
      return a;
    }
    function stripBOM(content) {
      if (content.charCodeAt(0) === 65279) {
        content = content.slice(1);
      }
      return content;
    }
    function inherits(constructor, superConstructor, props, descriptors) {
      constructor.prototype = Object.create(superConstructor.prototype, descriptors);
      constructor.prototype.constructor = constructor;
      props && Object.assign(constructor.prototype, props);
    }
    function toFlatObject(sourceObj, destObj, filter) {
      var props;
      var i;
      var prop;
      var merged = {};
      destObj = destObj || {};
      do {
        props = Object.getOwnPropertyNames(sourceObj);
        i = props.length;
        while (i-- > 0) {
          prop = props[i];
          if (!merged[prop]) {
            destObj[prop] = sourceObj[prop];
            merged[prop] = true;
          }
        }
        sourceObj = Object.getPrototypeOf(sourceObj);
      } while (sourceObj && (!filter || filter(sourceObj, destObj)) && sourceObj !== Object.prototype);
      return destObj;
    }
    function endsWith(str, searchString, position) {
      str = String(str);
      if (position === void 0 || position > str.length) {
        position = str.length;
      }
      position -= searchString.length;
      var lastIndex = str.indexOf(searchString, position);
      return lastIndex !== -1 && lastIndex === position;
    }
    function toArray(thing) {
      if (!thing) return null;
      var i = thing.length;
      if (isUndefined(i)) return null;
      var arr = new Array(i);
      while (i-- > 0) {
        arr[i] = thing[i];
      }
      return arr;
    }
    var isTypedArray = /* @__PURE__ */ (function(TypedArray) {
      return function(thing) {
        return TypedArray && thing instanceof TypedArray;
      };
    })(typeof Uint8Array !== "undefined" && Object.getPrototypeOf(Uint8Array));
    module.exports = {
      isArray,
      isArrayBuffer,
      isBuffer,
      isFormData,
      isArrayBufferView,
      isString,
      isNumber,
      isObject,
      isPlainObject,
      isUndefined,
      isDate,
      isFile,
      isBlob,
      isFunction,
      isStream,
      isURLSearchParams,
      isStandardBrowserEnv,
      forEach,
      merge,
      extend,
      trim,
      stripBOM,
      inherits,
      toFlatObject,
      kindOf,
      kindOfTest,
      endsWith,
      toArray,
      isTypedArray,
      isFileList
    };
  }
});

// node_modules/axios/lib/helpers/buildURL.js
var require_buildURL = __commonJS({
  "node_modules/axios/lib/helpers/buildURL.js"(exports, module) {
    "use strict";
    var utils = require_utils();
    function encode(val) {
      return encodeURIComponent(val).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]");
    }
    module.exports = function buildURL(url, params2, paramsSerializer) {
      if (!params2) {
        return url;
      }
      var serializedParams;
      if (paramsSerializer) {
        serializedParams = paramsSerializer(params2);
      } else if (utils.isURLSearchParams(params2)) {
        serializedParams = params2.toString();
      } else {
        var parts = [];
        utils.forEach(params2, function serialize(val, key) {
          if (val === null || typeof val === "undefined") {
            return;
          }
          if (utils.isArray(val)) {
            key = key + "[]";
          } else {
            val = [val];
          }
          utils.forEach(val, function parseValue(v) {
            if (utils.isDate(v)) {
              v = v.toISOString();
            } else if (utils.isObject(v)) {
              v = JSON.stringify(v);
            }
            parts.push(encode(key) + "=" + encode(v));
          });
        });
        serializedParams = parts.join("&");
      }
      if (serializedParams) {
        var hashmarkIndex = url.indexOf("#");
        if (hashmarkIndex !== -1) {
          url = url.slice(0, hashmarkIndex);
        }
        url += (url.indexOf("?") === -1 ? "?" : "&") + serializedParams;
      }
      return url;
    };
  }
});

// node_modules/axios/lib/core/InterceptorManager.js
var require_InterceptorManager = __commonJS({
  "node_modules/axios/lib/core/InterceptorManager.js"(exports, module) {
    "use strict";
    var utils = require_utils();
    function InterceptorManager() {
      this.handlers = [];
    }
    InterceptorManager.prototype.use = function use(fulfilled, rejected, options) {
      this.handlers.push({
        fulfilled,
        rejected,
        synchronous: options ? options.synchronous : false,
        runWhen: options ? options.runWhen : null
      });
      return this.handlers.length - 1;
    };
    InterceptorManager.prototype.eject = function eject(id) {
      if (this.handlers[id]) {
        this.handlers[id] = null;
      }
    };
    InterceptorManager.prototype.forEach = function forEach(fn) {
      utils.forEach(this.handlers, function forEachHandler(h) {
        if (h !== null) {
          fn(h);
        }
      });
    };
    module.exports = InterceptorManager;
  }
});

// node_modules/axios/lib/helpers/normalizeHeaderName.js
var require_normalizeHeaderName = __commonJS({
  "node_modules/axios/lib/helpers/normalizeHeaderName.js"(exports, module) {
    "use strict";
    var utils = require_utils();
    module.exports = function normalizeHeaderName(headers, normalizedName) {
      utils.forEach(headers, function processHeader(value, name) {
        if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
          headers[normalizedName] = value;
          delete headers[name];
        }
      });
    };
  }
});

// node_modules/axios/lib/core/AxiosError.js
var require_AxiosError = __commonJS({
  "node_modules/axios/lib/core/AxiosError.js"(exports, module) {
    "use strict";
    var utils = require_utils();
    function AxiosError(message, code, config, request, response) {
      Error.call(this);
      this.message = message;
      this.name = "AxiosError";
      code && (this.code = code);
      config && (this.config = config);
      request && (this.request = request);
      response && (this.response = response);
    }
    utils.inherits(AxiosError, Error, {
      toJSON: function toJSON() {
        return {
          // Standard
          message: this.message,
          name: this.name,
          // Microsoft
          description: this.description,
          number: this.number,
          // Mozilla
          fileName: this.fileName,
          lineNumber: this.lineNumber,
          columnNumber: this.columnNumber,
          stack: this.stack,
          // Axios
          config: this.config,
          code: this.code,
          status: this.response && this.response.status ? this.response.status : null
        };
      }
    });
    var prototype = AxiosError.prototype;
    var descriptors = {};
    [
      "ERR_BAD_OPTION_VALUE",
      "ERR_BAD_OPTION",
      "ECONNABORTED",
      "ETIMEDOUT",
      "ERR_NETWORK",
      "ERR_FR_TOO_MANY_REDIRECTS",
      "ERR_DEPRECATED",
      "ERR_BAD_RESPONSE",
      "ERR_BAD_REQUEST",
      "ERR_CANCELED"
      // eslint-disable-next-line func-names
    ].forEach(function(code) {
      descriptors[code] = { value: code };
    });
    Object.defineProperties(AxiosError, descriptors);
    Object.defineProperty(prototype, "isAxiosError", { value: true });
    AxiosError.from = function(error, code, config, request, response, customProps) {
      var axiosError = Object.create(prototype);
      utils.toFlatObject(error, axiosError, function filter(obj) {
        return obj !== Error.prototype;
      });
      AxiosError.call(axiosError, error.message, code, config, request, response);
      axiosError.name = error.name;
      customProps && Object.assign(axiosError, customProps);
      return axiosError;
    };
    module.exports = AxiosError;
  }
});

// node_modules/axios/lib/defaults/transitional.js
var require_transitional = __commonJS({
  "node_modules/axios/lib/defaults/transitional.js"(exports, module) {
    "use strict";
    module.exports = {
      silentJSONParsing: true,
      forcedJSONParsing: true,
      clarifyTimeoutError: false
    };
  }
});

// node_modules/axios/lib/helpers/toFormData.js
var require_toFormData = __commonJS({
  "node_modules/axios/lib/helpers/toFormData.js"(exports, module) {
    "use strict";
    var utils = require_utils();
    function toFormData(obj, formData) {
      formData = formData || new FormData();
      var stack = [];
      function convertValue(value) {
        if (value === null) return "";
        if (utils.isDate(value)) {
          return value.toISOString();
        }
        if (utils.isArrayBuffer(value) || utils.isTypedArray(value)) {
          return typeof Blob === "function" ? new Blob([value]) : Buffer.from(value);
        }
        return value;
      }
      function build(data, parentKey) {
        if (utils.isPlainObject(data) || utils.isArray(data)) {
          if (stack.indexOf(data) !== -1) {
            throw Error("Circular reference detected in " + parentKey);
          }
          stack.push(data);
          utils.forEach(data, function each(value, key) {
            if (utils.isUndefined(value)) return;
            var fullKey = parentKey ? parentKey + "." + key : key;
            var arr;
            if (value && !parentKey && typeof value === "object") {
              if (utils.endsWith(key, "{}")) {
                value = JSON.stringify(value);
              } else if (utils.endsWith(key, "[]") && (arr = utils.toArray(value))) {
                arr.forEach(function(el) {
                  !utils.isUndefined(el) && formData.append(fullKey, convertValue(el));
                });
                return;
              }
            }
            build(value, fullKey);
          });
          stack.pop();
        } else {
          formData.append(parentKey, convertValue(data));
        }
      }
      build(obj);
      return formData;
    }
    module.exports = toFormData;
  }
});

// node_modules/axios/lib/core/settle.js
var require_settle = __commonJS({
  "node_modules/axios/lib/core/settle.js"(exports, module) {
    "use strict";
    var AxiosError = require_AxiosError();
    module.exports = function settle(resolve, reject, response) {
      var validateStatus = response.config.validateStatus;
      if (!response.status || !validateStatus || validateStatus(response.status)) {
        resolve(response);
      } else {
        reject(new AxiosError(
          "Request failed with status code " + response.status,
          [AxiosError.ERR_BAD_REQUEST, AxiosError.ERR_BAD_RESPONSE][Math.floor(response.status / 100) - 4],
          response.config,
          response.request,
          response
        ));
      }
    };
  }
});

// node_modules/axios/lib/helpers/cookies.js
var require_cookies = __commonJS({
  "node_modules/axios/lib/helpers/cookies.js"(exports, module) {
    "use strict";
    var utils = require_utils();
    module.exports = utils.isStandardBrowserEnv() ? (
      // Standard browser envs support document.cookie
      /* @__PURE__ */ (function standardBrowserEnv() {
        return {
          write: function write(name, value, expires, path, domain, secure) {
            var cookie = [];
            cookie.push(name + "=" + encodeURIComponent(value));
            if (utils.isNumber(expires)) {
              cookie.push("expires=" + new Date(expires).toGMTString());
            }
            if (utils.isString(path)) {
              cookie.push("path=" + path);
            }
            if (utils.isString(domain)) {
              cookie.push("domain=" + domain);
            }
            if (secure === true) {
              cookie.push("secure");
            }
            document.cookie = cookie.join("; ");
          },
          read: function read(name) {
            var match = document.cookie.match(new RegExp("(^|;\\s*)(" + name + ")=([^;]*)"));
            return match ? decodeURIComponent(match[3]) : null;
          },
          remove: function remove(name) {
            this.write(name, "", Date.now() - 864e5);
          }
        };
      })()
    ) : (
      // Non standard browser env (web workers, react-native) lack needed support.
      /* @__PURE__ */ (function nonStandardBrowserEnv() {
        return {
          write: function write() {
          },
          read: function read() {
            return null;
          },
          remove: function remove() {
          }
        };
      })()
    );
  }
});

// node_modules/axios/lib/helpers/isAbsoluteURL.js
var require_isAbsoluteURL = __commonJS({
  "node_modules/axios/lib/helpers/isAbsoluteURL.js"(exports, module) {
    "use strict";
    module.exports = function isAbsoluteURL(url) {
      return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(url);
    };
  }
});

// node_modules/axios/lib/helpers/combineURLs.js
var require_combineURLs = __commonJS({
  "node_modules/axios/lib/helpers/combineURLs.js"(exports, module) {
    "use strict";
    module.exports = function combineURLs(baseURL, relativeURL) {
      return relativeURL ? baseURL.replace(/\/+$/, "") + "/" + relativeURL.replace(/^\/+/, "") : baseURL;
    };
  }
});

// node_modules/axios/lib/core/buildFullPath.js
var require_buildFullPath = __commonJS({
  "node_modules/axios/lib/core/buildFullPath.js"(exports, module) {
    "use strict";
    var isAbsoluteURL = require_isAbsoluteURL();
    var combineURLs = require_combineURLs();
    module.exports = function buildFullPath(baseURL, requestedURL) {
      if (baseURL && !isAbsoluteURL(requestedURL)) {
        return combineURLs(baseURL, requestedURL);
      }
      return requestedURL;
    };
  }
});

// node_modules/axios/lib/helpers/parseHeaders.js
var require_parseHeaders = __commonJS({
  "node_modules/axios/lib/helpers/parseHeaders.js"(exports, module) {
    "use strict";
    var utils = require_utils();
    var ignoreDuplicateOf = [
      "age",
      "authorization",
      "content-length",
      "content-type",
      "etag",
      "expires",
      "from",
      "host",
      "if-modified-since",
      "if-unmodified-since",
      "last-modified",
      "location",
      "max-forwards",
      "proxy-authorization",
      "referer",
      "retry-after",
      "user-agent"
    ];
    module.exports = function parseHeaders(headers) {
      var parsed = {};
      var key;
      var val;
      var i;
      if (!headers) {
        return parsed;
      }
      utils.forEach(headers.split("\n"), function parser(line) {
        i = line.indexOf(":");
        key = utils.trim(line.substr(0, i)).toLowerCase();
        val = utils.trim(line.substr(i + 1));
        if (key) {
          if (parsed[key] && ignoreDuplicateOf.indexOf(key) >= 0) {
            return;
          }
          if (key === "set-cookie") {
            parsed[key] = (parsed[key] ? parsed[key] : []).concat([val]);
          } else {
            parsed[key] = parsed[key] ? parsed[key] + ", " + val : val;
          }
        }
      });
      return parsed;
    };
  }
});

// node_modules/axios/lib/helpers/isURLSameOrigin.js
var require_isURLSameOrigin = __commonJS({
  "node_modules/axios/lib/helpers/isURLSameOrigin.js"(exports, module) {
    "use strict";
    var utils = require_utils();
    module.exports = utils.isStandardBrowserEnv() ? (
      // Standard browser envs have full support of the APIs needed to test
      // whether the request URL is of the same origin as current location.
      (function standardBrowserEnv() {
        var msie = /(msie|trident)/i.test(navigator.userAgent);
        var urlParsingNode = document.createElement("a");
        var originURL;
        function resolveURL(url) {
          var href = url;
          if (msie) {
            urlParsingNode.setAttribute("href", href);
            href = urlParsingNode.href;
          }
          urlParsingNode.setAttribute("href", href);
          return {
            href: urlParsingNode.href,
            protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, "") : "",
            host: urlParsingNode.host,
            search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, "") : "",
            hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, "") : "",
            hostname: urlParsingNode.hostname,
            port: urlParsingNode.port,
            pathname: urlParsingNode.pathname.charAt(0) === "/" ? urlParsingNode.pathname : "/" + urlParsingNode.pathname
          };
        }
        originURL = resolveURL(window.location.href);
        return function isURLSameOrigin(requestURL) {
          var parsed = utils.isString(requestURL) ? resolveURL(requestURL) : requestURL;
          return parsed.protocol === originURL.protocol && parsed.host === originURL.host;
        };
      })()
    ) : (
      // Non standard browser envs (web workers, react-native) lack needed support.
      /* @__PURE__ */ (function nonStandardBrowserEnv() {
        return function isURLSameOrigin() {
          return true;
        };
      })()
    );
  }
});

// node_modules/axios/lib/cancel/CanceledError.js
var require_CanceledError = __commonJS({
  "node_modules/axios/lib/cancel/CanceledError.js"(exports, module) {
    "use strict";
    var AxiosError = require_AxiosError();
    var utils = require_utils();
    function CanceledError(message) {
      AxiosError.call(this, message == null ? "canceled" : message, AxiosError.ERR_CANCELED);
      this.name = "CanceledError";
    }
    utils.inherits(CanceledError, AxiosError, {
      __CANCEL__: true
    });
    module.exports = CanceledError;
  }
});

// node_modules/axios/lib/helpers/parseProtocol.js
var require_parseProtocol = __commonJS({
  "node_modules/axios/lib/helpers/parseProtocol.js"(exports, module) {
    "use strict";
    module.exports = function parseProtocol(url) {
      var match = /^([-+\w]{1,25})(:?\/\/|:)/.exec(url);
      return match && match[1] || "";
    };
  }
});

// node_modules/axios/lib/adapters/xhr.js
var require_xhr = __commonJS({
  "node_modules/axios/lib/adapters/xhr.js"(exports, module) {
    "use strict";
    var utils = require_utils();
    var settle = require_settle();
    var cookies = require_cookies();
    var buildURL = require_buildURL();
    var buildFullPath = require_buildFullPath();
    var parseHeaders = require_parseHeaders();
    var isURLSameOrigin = require_isURLSameOrigin();
    var transitionalDefaults = require_transitional();
    var AxiosError = require_AxiosError();
    var CanceledError = require_CanceledError();
    var parseProtocol = require_parseProtocol();
    module.exports = function xhrAdapter(config) {
      return new Promise(function dispatchXhrRequest(resolve, reject) {
        var requestData = config.data;
        var requestHeaders = config.headers;
        var responseType = config.responseType;
        var onCanceled;
        function done() {
          if (config.cancelToken) {
            config.cancelToken.unsubscribe(onCanceled);
          }
          if (config.signal) {
            config.signal.removeEventListener("abort", onCanceled);
          }
        }
        if (utils.isFormData(requestData) && utils.isStandardBrowserEnv()) {
          delete requestHeaders["Content-Type"];
        }
        var request = new XMLHttpRequest();
        if (config.auth) {
          var username = config.auth.username || "";
          var password = config.auth.password ? unescape(encodeURIComponent(config.auth.password)) : "";
          requestHeaders.Authorization = "Basic " + btoa(username + ":" + password);
        }
        var fullPath = buildFullPath(config.baseURL, config.url);
        request.open(config.method.toUpperCase(), buildURL(fullPath, config.params, config.paramsSerializer), true);
        request.timeout = config.timeout;
        function onloadend() {
          if (!request) {
            return;
          }
          var responseHeaders = "getAllResponseHeaders" in request ? parseHeaders(request.getAllResponseHeaders()) : null;
          var responseData = !responseType || responseType === "text" || responseType === "json" ? request.responseText : request.response;
          var response = {
            data: responseData,
            status: request.status,
            statusText: request.statusText,
            headers: responseHeaders,
            config,
            request
          };
          settle(function _resolve(value) {
            resolve(value);
            done();
          }, function _reject(err) {
            reject(err);
            done();
          }, response);
          request = null;
        }
        if ("onloadend" in request) {
          request.onloadend = onloadend;
        } else {
          request.onreadystatechange = function handleLoad() {
            if (!request || request.readyState !== 4) {
              return;
            }
            if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf("file:") === 0)) {
              return;
            }
            setTimeout(onloadend);
          };
        }
        request.onabort = function handleAbort() {
          if (!request) {
            return;
          }
          reject(new AxiosError("Request aborted", AxiosError.ECONNABORTED, config, request));
          request = null;
        };
        request.onerror = function handleError() {
          reject(new AxiosError("Network Error", AxiosError.ERR_NETWORK, config, request, request));
          request = null;
        };
        request.ontimeout = function handleTimeout() {
          var timeoutErrorMessage = config.timeout ? "timeout of " + config.timeout + "ms exceeded" : "timeout exceeded";
          var transitional = config.transitional || transitionalDefaults;
          if (config.timeoutErrorMessage) {
            timeoutErrorMessage = config.timeoutErrorMessage;
          }
          reject(new AxiosError(
            timeoutErrorMessage,
            transitional.clarifyTimeoutError ? AxiosError.ETIMEDOUT : AxiosError.ECONNABORTED,
            config,
            request
          ));
          request = null;
        };
        if (utils.isStandardBrowserEnv()) {
          var xsrfValue = (config.withCredentials || isURLSameOrigin(fullPath)) && config.xsrfCookieName ? cookies.read(config.xsrfCookieName) : void 0;
          if (xsrfValue) {
            requestHeaders[config.xsrfHeaderName] = xsrfValue;
          }
        }
        if ("setRequestHeader" in request) {
          utils.forEach(requestHeaders, function setRequestHeader(val, key) {
            if (typeof requestData === "undefined" && key.toLowerCase() === "content-type") {
              delete requestHeaders[key];
            } else {
              request.setRequestHeader(key, val);
            }
          });
        }
        if (!utils.isUndefined(config.withCredentials)) {
          request.withCredentials = !!config.withCredentials;
        }
        if (responseType && responseType !== "json") {
          request.responseType = config.responseType;
        }
        if (typeof config.onDownloadProgress === "function") {
          request.addEventListener("progress", config.onDownloadProgress);
        }
        if (typeof config.onUploadProgress === "function" && request.upload) {
          request.upload.addEventListener("progress", config.onUploadProgress);
        }
        if (config.cancelToken || config.signal) {
          onCanceled = function(cancel) {
            if (!request) {
              return;
            }
            reject(!cancel || cancel && cancel.type ? new CanceledError() : cancel);
            request.abort();
            request = null;
          };
          config.cancelToken && config.cancelToken.subscribe(onCanceled);
          if (config.signal) {
            config.signal.aborted ? onCanceled() : config.signal.addEventListener("abort", onCanceled);
          }
        }
        if (!requestData) {
          requestData = null;
        }
        var protocol = parseProtocol(fullPath);
        if (protocol && ["http", "https", "file"].indexOf(protocol) === -1) {
          reject(new AxiosError("Unsupported protocol " + protocol + ":", AxiosError.ERR_BAD_REQUEST, config));
          return;
        }
        request.send(requestData);
      });
    };
  }
});

// node_modules/axios/lib/helpers/null.js
var require_null = __commonJS({
  "node_modules/axios/lib/helpers/null.js"(exports, module) {
    module.exports = null;
  }
});

// node_modules/axios/lib/defaults/index.js
var require_defaults = __commonJS({
  "node_modules/axios/lib/defaults/index.js"(exports, module) {
    "use strict";
    var utils = require_utils();
    var normalizeHeaderName = require_normalizeHeaderName();
    var AxiosError = require_AxiosError();
    var transitionalDefaults = require_transitional();
    var toFormData = require_toFormData();
    var DEFAULT_CONTENT_TYPE = {
      "Content-Type": "application/x-www-form-urlencoded"
    };
    function setContentTypeIfUnset(headers, value) {
      if (!utils.isUndefined(headers) && utils.isUndefined(headers["Content-Type"])) {
        headers["Content-Type"] = value;
      }
    }
    function getDefaultAdapter() {
      var adapter;
      if (typeof XMLHttpRequest !== "undefined") {
        adapter = require_xhr();
      } else if (typeof process !== "undefined" && Object.prototype.toString.call(process) === "[object process]") {
        adapter = require_xhr();
      }
      return adapter;
    }
    function stringifySafely(rawValue, parser, encoder) {
      if (utils.isString(rawValue)) {
        try {
          (parser || JSON.parse)(rawValue);
          return utils.trim(rawValue);
        } catch (e) {
          if (e.name !== "SyntaxError") {
            throw e;
          }
        }
      }
      return (encoder || JSON.stringify)(rawValue);
    }
    var defaults = {
      transitional: transitionalDefaults,
      adapter: getDefaultAdapter(),
      transformRequest: [function transformRequest(data, headers) {
        normalizeHeaderName(headers, "Accept");
        normalizeHeaderName(headers, "Content-Type");
        if (utils.isFormData(data) || utils.isArrayBuffer(data) || utils.isBuffer(data) || utils.isStream(data) || utils.isFile(data) || utils.isBlob(data)) {
          return data;
        }
        if (utils.isArrayBufferView(data)) {
          return data.buffer;
        }
        if (utils.isURLSearchParams(data)) {
          setContentTypeIfUnset(headers, "application/x-www-form-urlencoded;charset=utf-8");
          return data.toString();
        }
        var isObjectPayload = utils.isObject(data);
        var contentType = headers && headers["Content-Type"];
        var isFileList;
        if ((isFileList = utils.isFileList(data)) || isObjectPayload && contentType === "multipart/form-data") {
          var _FormData = this.env && this.env.FormData;
          return toFormData(isFileList ? { "files[]": data } : data, _FormData && new _FormData());
        } else if (isObjectPayload || contentType === "application/json") {
          setContentTypeIfUnset(headers, "application/json");
          return stringifySafely(data);
        }
        return data;
      }],
      transformResponse: [function transformResponse(data) {
        var transitional = this.transitional || defaults.transitional;
        var silentJSONParsing = transitional && transitional.silentJSONParsing;
        var forcedJSONParsing = transitional && transitional.forcedJSONParsing;
        var strictJSONParsing = !silentJSONParsing && this.responseType === "json";
        if (strictJSONParsing || forcedJSONParsing && utils.isString(data) && data.length) {
          try {
            return JSON.parse(data);
          } catch (e) {
            if (strictJSONParsing) {
              if (e.name === "SyntaxError") {
                throw AxiosError.from(e, AxiosError.ERR_BAD_RESPONSE, this, null, this.response);
              }
              throw e;
            }
          }
        }
        return data;
      }],
      /**
       * A timeout in milliseconds to abort a request. If set to 0 (default) a
       * timeout is not created.
       */
      timeout: 0,
      xsrfCookieName: "XSRF-TOKEN",
      xsrfHeaderName: "X-XSRF-TOKEN",
      maxContentLength: -1,
      maxBodyLength: -1,
      env: {
        FormData: require_null()
      },
      validateStatus: function validateStatus(status) {
        return status >= 200 && status < 300;
      },
      headers: {
        common: {
          "Accept": "application/json, text/plain, */*"
        }
      }
    };
    utils.forEach(["delete", "get", "head"], function forEachMethodNoData(method) {
      defaults.headers[method] = {};
    });
    utils.forEach(["post", "put", "patch"], function forEachMethodWithData(method) {
      defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
    });
    module.exports = defaults;
  }
});

// node_modules/axios/lib/core/transformData.js
var require_transformData = __commonJS({
  "node_modules/axios/lib/core/transformData.js"(exports, module) {
    "use strict";
    var utils = require_utils();
    var defaults = require_defaults();
    module.exports = function transformData(data, headers, fns) {
      var context = this || defaults;
      utils.forEach(fns, function transform(fn) {
        data = fn.call(context, data, headers);
      });
      return data;
    };
  }
});

// node_modules/axios/lib/cancel/isCancel.js
var require_isCancel = __commonJS({
  "node_modules/axios/lib/cancel/isCancel.js"(exports, module) {
    "use strict";
    module.exports = function isCancel(value) {
      return !!(value && value.__CANCEL__);
    };
  }
});

// node_modules/axios/lib/core/dispatchRequest.js
var require_dispatchRequest = __commonJS({
  "node_modules/axios/lib/core/dispatchRequest.js"(exports, module) {
    "use strict";
    var utils = require_utils();
    var transformData = require_transformData();
    var isCancel = require_isCancel();
    var defaults = require_defaults();
    var CanceledError = require_CanceledError();
    function throwIfCancellationRequested(config) {
      if (config.cancelToken) {
        config.cancelToken.throwIfRequested();
      }
      if (config.signal && config.signal.aborted) {
        throw new CanceledError();
      }
    }
    module.exports = function dispatchRequest(config) {
      throwIfCancellationRequested(config);
      config.headers = config.headers || {};
      config.data = transformData.call(
        config,
        config.data,
        config.headers,
        config.transformRequest
      );
      config.headers = utils.merge(
        config.headers.common || {},
        config.headers[config.method] || {},
        config.headers
      );
      utils.forEach(
        ["delete", "get", "head", "post", "put", "patch", "common"],
        function cleanHeaderConfig(method) {
          delete config.headers[method];
        }
      );
      var adapter = config.adapter || defaults.adapter;
      return adapter(config).then(function onAdapterResolution(response) {
        throwIfCancellationRequested(config);
        response.data = transformData.call(
          config,
          response.data,
          response.headers,
          config.transformResponse
        );
        return response;
      }, function onAdapterRejection(reason) {
        if (!isCancel(reason)) {
          throwIfCancellationRequested(config);
          if (reason && reason.response) {
            reason.response.data = transformData.call(
              config,
              reason.response.data,
              reason.response.headers,
              config.transformResponse
            );
          }
        }
        return Promise.reject(reason);
      });
    };
  }
});

// node_modules/axios/lib/core/mergeConfig.js
var require_mergeConfig = __commonJS({
  "node_modules/axios/lib/core/mergeConfig.js"(exports, module) {
    "use strict";
    var utils = require_utils();
    module.exports = function mergeConfig(config1, config2) {
      config2 = config2 || {};
      var config = {};
      function getMergedValue(target, source) {
        if (utils.isPlainObject(target) && utils.isPlainObject(source)) {
          return utils.merge(target, source);
        } else if (utils.isPlainObject(source)) {
          return utils.merge({}, source);
        } else if (utils.isArray(source)) {
          return source.slice();
        }
        return source;
      }
      function mergeDeepProperties(prop) {
        if (!utils.isUndefined(config2[prop])) {
          return getMergedValue(config1[prop], config2[prop]);
        } else if (!utils.isUndefined(config1[prop])) {
          return getMergedValue(void 0, config1[prop]);
        }
      }
      function valueFromConfig2(prop) {
        if (!utils.isUndefined(config2[prop])) {
          return getMergedValue(void 0, config2[prop]);
        }
      }
      function defaultToConfig2(prop) {
        if (!utils.isUndefined(config2[prop])) {
          return getMergedValue(void 0, config2[prop]);
        } else if (!utils.isUndefined(config1[prop])) {
          return getMergedValue(void 0, config1[prop]);
        }
      }
      function mergeDirectKeys(prop) {
        if (prop in config2) {
          return getMergedValue(config1[prop], config2[prop]);
        } else if (prop in config1) {
          return getMergedValue(void 0, config1[prop]);
        }
      }
      var mergeMap = {
        "url": valueFromConfig2,
        "method": valueFromConfig2,
        "data": valueFromConfig2,
        "baseURL": defaultToConfig2,
        "transformRequest": defaultToConfig2,
        "transformResponse": defaultToConfig2,
        "paramsSerializer": defaultToConfig2,
        "timeout": defaultToConfig2,
        "timeoutMessage": defaultToConfig2,
        "withCredentials": defaultToConfig2,
        "adapter": defaultToConfig2,
        "responseType": defaultToConfig2,
        "xsrfCookieName": defaultToConfig2,
        "xsrfHeaderName": defaultToConfig2,
        "onUploadProgress": defaultToConfig2,
        "onDownloadProgress": defaultToConfig2,
        "decompress": defaultToConfig2,
        "maxContentLength": defaultToConfig2,
        "maxBodyLength": defaultToConfig2,
        "beforeRedirect": defaultToConfig2,
        "transport": defaultToConfig2,
        "httpAgent": defaultToConfig2,
        "httpsAgent": defaultToConfig2,
        "cancelToken": defaultToConfig2,
        "socketPath": defaultToConfig2,
        "responseEncoding": defaultToConfig2,
        "validateStatus": mergeDirectKeys
      };
      utils.forEach(Object.keys(config1).concat(Object.keys(config2)), function computeConfigValue(prop) {
        var merge = mergeMap[prop] || mergeDeepProperties;
        var configValue = merge(prop);
        utils.isUndefined(configValue) && merge !== mergeDirectKeys || (config[prop] = configValue);
      });
      return config;
    };
  }
});

// node_modules/axios/lib/env/data.js
var require_data = __commonJS({
  "node_modules/axios/lib/env/data.js"(exports, module) {
    module.exports = {
      "version": "0.27.2"
    };
  }
});

// node_modules/axios/lib/helpers/validator.js
var require_validator = __commonJS({
  "node_modules/axios/lib/helpers/validator.js"(exports, module) {
    "use strict";
    var VERSION = require_data().version;
    var AxiosError = require_AxiosError();
    var validators = {};
    ["object", "boolean", "number", "function", "string", "symbol"].forEach(function(type, i) {
      validators[type] = function validator(thing) {
        return typeof thing === type || "a" + (i < 1 ? "n " : " ") + type;
      };
    });
    var deprecatedWarnings = {};
    validators.transitional = function transitional(validator, version, message) {
      function formatMessage(opt, desc) {
        return "[Axios v" + VERSION + "] Transitional option '" + opt + "'" + desc + (message ? ". " + message : "");
      }
      return function(value, opt, opts) {
        if (validator === false) {
          throw new AxiosError(
            formatMessage(opt, " has been removed" + (version ? " in " + version : "")),
            AxiosError.ERR_DEPRECATED
          );
        }
        if (version && !deprecatedWarnings[opt]) {
          deprecatedWarnings[opt] = true;
          console.warn(
            formatMessage(
              opt,
              " has been deprecated since v" + version + " and will be removed in the near future"
            )
          );
        }
        return validator ? validator(value, opt, opts) : true;
      };
    };
    function assertOptions(options, schema, allowUnknown) {
      if (typeof options !== "object") {
        throw new AxiosError("options must be an object", AxiosError.ERR_BAD_OPTION_VALUE);
      }
      var keys = Object.keys(options);
      var i = keys.length;
      while (i-- > 0) {
        var opt = keys[i];
        var validator = schema[opt];
        if (validator) {
          var value = options[opt];
          var result = value === void 0 || validator(value, opt, options);
          if (result !== true) {
            throw new AxiosError("option " + opt + " must be " + result, AxiosError.ERR_BAD_OPTION_VALUE);
          }
          continue;
        }
        if (allowUnknown !== true) {
          throw new AxiosError("Unknown option " + opt, AxiosError.ERR_BAD_OPTION);
        }
      }
    }
    module.exports = {
      assertOptions,
      validators
    };
  }
});

// node_modules/axios/lib/core/Axios.js
var require_Axios = __commonJS({
  "node_modules/axios/lib/core/Axios.js"(exports, module) {
    "use strict";
    var utils = require_utils();
    var buildURL = require_buildURL();
    var InterceptorManager = require_InterceptorManager();
    var dispatchRequest = require_dispatchRequest();
    var mergeConfig = require_mergeConfig();
    var buildFullPath = require_buildFullPath();
    var validator = require_validator();
    var validators = validator.validators;
    function Axios(instanceConfig) {
      this.defaults = instanceConfig;
      this.interceptors = {
        request: new InterceptorManager(),
        response: new InterceptorManager()
      };
    }
    Axios.prototype.request = function request(configOrUrl, config) {
      if (typeof configOrUrl === "string") {
        config = config || {};
        config.url = configOrUrl;
      } else {
        config = configOrUrl || {};
      }
      config = mergeConfig(this.defaults, config);
      if (config.method) {
        config.method = config.method.toLowerCase();
      } else if (this.defaults.method) {
        config.method = this.defaults.method.toLowerCase();
      } else {
        config.method = "get";
      }
      var transitional = config.transitional;
      if (transitional !== void 0) {
        validator.assertOptions(transitional, {
          silentJSONParsing: validators.transitional(validators.boolean),
          forcedJSONParsing: validators.transitional(validators.boolean),
          clarifyTimeoutError: validators.transitional(validators.boolean)
        }, false);
      }
      var requestInterceptorChain = [];
      var synchronousRequestInterceptors = true;
      this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
        if (typeof interceptor.runWhen === "function" && interceptor.runWhen(config) === false) {
          return;
        }
        synchronousRequestInterceptors = synchronousRequestInterceptors && interceptor.synchronous;
        requestInterceptorChain.unshift(interceptor.fulfilled, interceptor.rejected);
      });
      var responseInterceptorChain = [];
      this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
        responseInterceptorChain.push(interceptor.fulfilled, interceptor.rejected);
      });
      var promise;
      if (!synchronousRequestInterceptors) {
        var chain = [dispatchRequest, void 0];
        Array.prototype.unshift.apply(chain, requestInterceptorChain);
        chain = chain.concat(responseInterceptorChain);
        promise = Promise.resolve(config);
        while (chain.length) {
          promise = promise.then(chain.shift(), chain.shift());
        }
        return promise;
      }
      var newConfig = config;
      while (requestInterceptorChain.length) {
        var onFulfilled = requestInterceptorChain.shift();
        var onRejected = requestInterceptorChain.shift();
        try {
          newConfig = onFulfilled(newConfig);
        } catch (error) {
          onRejected(error);
          break;
        }
      }
      try {
        promise = dispatchRequest(newConfig);
      } catch (error) {
        return Promise.reject(error);
      }
      while (responseInterceptorChain.length) {
        promise = promise.then(responseInterceptorChain.shift(), responseInterceptorChain.shift());
      }
      return promise;
    };
    Axios.prototype.getUri = function getUri(config) {
      config = mergeConfig(this.defaults, config);
      var fullPath = buildFullPath(config.baseURL, config.url);
      return buildURL(fullPath, config.params, config.paramsSerializer);
    };
    utils.forEach(["delete", "get", "head", "options"], function forEachMethodNoData(method) {
      Axios.prototype[method] = function(url, config) {
        return this.request(mergeConfig(config || {}, {
          method,
          url,
          data: (config || {}).data
        }));
      };
    });
    utils.forEach(["post", "put", "patch"], function forEachMethodWithData(method) {
      function generateHTTPMethod(isForm) {
        return function httpMethod(url, data, config) {
          return this.request(mergeConfig(config || {}, {
            method,
            headers: isForm ? {
              "Content-Type": "multipart/form-data"
            } : {},
            url,
            data
          }));
        };
      }
      Axios.prototype[method] = generateHTTPMethod();
      Axios.prototype[method + "Form"] = generateHTTPMethod(true);
    });
    module.exports = Axios;
  }
});

// node_modules/axios/lib/cancel/CancelToken.js
var require_CancelToken = __commonJS({
  "node_modules/axios/lib/cancel/CancelToken.js"(exports, module) {
    "use strict";
    var CanceledError = require_CanceledError();
    function CancelToken(executor) {
      if (typeof executor !== "function") {
        throw new TypeError("executor must be a function.");
      }
      var resolvePromise;
      this.promise = new Promise(function promiseExecutor(resolve) {
        resolvePromise = resolve;
      });
      var token = this;
      this.promise.then(function(cancel) {
        if (!token._listeners) return;
        var i;
        var l = token._listeners.length;
        for (i = 0; i < l; i++) {
          token._listeners[i](cancel);
        }
        token._listeners = null;
      });
      this.promise.then = function(onfulfilled) {
        var _resolve;
        var promise = new Promise(function(resolve) {
          token.subscribe(resolve);
          _resolve = resolve;
        }).then(onfulfilled);
        promise.cancel = function reject() {
          token.unsubscribe(_resolve);
        };
        return promise;
      };
      executor(function cancel(message) {
        if (token.reason) {
          return;
        }
        token.reason = new CanceledError(message);
        resolvePromise(token.reason);
      });
    }
    CancelToken.prototype.throwIfRequested = function throwIfRequested() {
      if (this.reason) {
        throw this.reason;
      }
    };
    CancelToken.prototype.subscribe = function subscribe(listener) {
      if (this.reason) {
        listener(this.reason);
        return;
      }
      if (this._listeners) {
        this._listeners.push(listener);
      } else {
        this._listeners = [listener];
      }
    };
    CancelToken.prototype.unsubscribe = function unsubscribe(listener) {
      if (!this._listeners) {
        return;
      }
      var index = this._listeners.indexOf(listener);
      if (index !== -1) {
        this._listeners.splice(index, 1);
      }
    };
    CancelToken.source = function source() {
      var cancel;
      var token = new CancelToken(function executor(c) {
        cancel = c;
      });
      return {
        token,
        cancel
      };
    };
    module.exports = CancelToken;
  }
});

// node_modules/axios/lib/helpers/spread.js
var require_spread = __commonJS({
  "node_modules/axios/lib/helpers/spread.js"(exports, module) {
    "use strict";
    module.exports = function spread(callback) {
      return function wrap(arr) {
        return callback.apply(null, arr);
      };
    };
  }
});

// node_modules/axios/lib/helpers/isAxiosError.js
var require_isAxiosError = __commonJS({
  "node_modules/axios/lib/helpers/isAxiosError.js"(exports, module) {
    "use strict";
    var utils = require_utils();
    module.exports = function isAxiosError(payload) {
      return utils.isObject(payload) && payload.isAxiosError === true;
    };
  }
});

// node_modules/axios/lib/axios.js
var require_axios = __commonJS({
  "node_modules/axios/lib/axios.js"(exports, module) {
    "use strict";
    var utils = require_utils();
    var bind = require_bind();
    var Axios = require_Axios();
    var mergeConfig = require_mergeConfig();
    var defaults = require_defaults();
    function createInstance(defaultConfig) {
      var context = new Axios(defaultConfig);
      var instance = bind(Axios.prototype.request, context);
      utils.extend(instance, Axios.prototype, context);
      utils.extend(instance, context);
      instance.create = function create(instanceConfig) {
        return createInstance(mergeConfig(defaultConfig, instanceConfig));
      };
      return instance;
    }
    var axios = createInstance(defaults);
    axios.Axios = Axios;
    axios.CanceledError = require_CanceledError();
    axios.CancelToken = require_CancelToken();
    axios.isCancel = require_isCancel();
    axios.VERSION = require_data().version;
    axios.toFormData = require_toFormData();
    axios.AxiosError = require_AxiosError();
    axios.Cancel = axios.CanceledError;
    axios.all = function all(promises) {
      return Promise.all(promises);
    };
    axios.spread = require_spread();
    axios.isAxiosError = require_isAxiosError();
    module.exports = axios;
    module.exports.default = axios;
  }
});

// node_modules/axios/index.js
var require_axios2 = __commonJS({
  "node_modules/axios/index.js"(exports, module) {
    module.exports = require_axios();
  }
});

// node_modules/form-data/lib/browser.js
var require_browser = __commonJS({
  "node_modules/form-data/lib/browser.js"(exports, module) {
    "use strict";
    module.exports = typeof self === "object" ? self.FormData : window.FormData;
  }
});

// node_modules/sendbird/node_modules/ws/browser.js
var require_browser2 = __commonJS({
  "node_modules/sendbird/node_modules/ws/browser.js"(exports, module) {
    "use strict";
    module.exports = function() {
      throw new Error(
        "ws does not work in the browser. Browser clients must use the native WebSocket object"
      );
    };
  }
});

// node_modules/sendbird/SendBird.min.js
var require_SendBird_min = __commonJS({
  "node_modules/sendbird/SendBird.min.js"(exports, module) {
    !(function(e, t) {
      "object" == typeof exports && "undefined" != typeof module ? module.exports = t(require_axios2(), require_browser(), require_browser2()) : "function" == typeof define && define.amd ? define(["axios", "form-data", "ws"], t) : (e = "undefined" != typeof globalThis ? globalThis : e || self).SendBird = t(e.axios, e.FormData, e.WebSocket);
    })(exports, (function(e, t, n) {
      "use strict";
      function r(e2) {
        return e2 && "object" == typeof e2 && "default" in e2 ? e2 : { default: e2 };
      }
      var i = r(e), s = r(t), a = r(n);
      function o(e2, t2) {
        var n2 = Object.keys(e2);
        if (Object.getOwnPropertySymbols) {
          var r2 = Object.getOwnPropertySymbols(e2);
          t2 && (r2 = r2.filter((function(t3) {
            return Object.getOwnPropertyDescriptor(e2, t3).enumerable;
          }))), n2.push.apply(n2, r2);
        }
        return n2;
      }
      function l(e2) {
        for (var t2 = 1; t2 < arguments.length; t2++) {
          var n2 = null != arguments[t2] ? arguments[t2] : {};
          t2 % 2 ? o(Object(n2), true).forEach((function(t3) {
            p(e2, t3, n2[t3]);
          })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e2, Object.getOwnPropertyDescriptors(n2)) : o(Object(n2)).forEach((function(t3) {
            Object.defineProperty(e2, t3, Object.getOwnPropertyDescriptor(n2, t3));
          }));
        }
        return e2;
      }
      function u(e2) {
        return u = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e3) {
          return typeof e3;
        } : function(e3) {
          return e3 && "function" == typeof Symbol && e3.constructor === Symbol && e3 !== Symbol.prototype ? "symbol" : typeof e3;
        }, u(e2);
      }
      function c(e2, t2) {
        if (!(e2 instanceof t2)) throw new TypeError("Cannot call a class as a function");
      }
      function d(e2, t2) {
        for (var n2 = 0; n2 < t2.length; n2++) {
          var r2 = t2[n2];
          r2.enumerable = r2.enumerable || false, r2.configurable = true, "value" in r2 && (r2.writable = true), Object.defineProperty(e2, r2.key, r2);
        }
      }
      function h(e2, t2, n2) {
        return t2 && d(e2.prototype, t2), n2 && d(e2, n2), Object.defineProperty(e2, "prototype", { writable: false }), e2;
      }
      function p(e2, t2, n2) {
        return t2 in e2 ? Object.defineProperty(e2, t2, { value: n2, enumerable: true, configurable: true, writable: true }) : e2[t2] = n2, e2;
      }
      function f(e2, t2) {
        if ("function" != typeof t2 && null !== t2) throw new TypeError("Super expression must either be null or a function");
        e2.prototype = Object.create(t2 && t2.prototype, { constructor: { value: e2, writable: true, configurable: true } }), Object.defineProperty(e2, "prototype", { writable: false }), t2 && g(e2, t2);
      }
      function _(e2) {
        return _ = Object.setPrototypeOf ? Object.getPrototypeOf : function(e3) {
          return e3.__proto__ || Object.getPrototypeOf(e3);
        }, _(e2);
      }
      function g(e2, t2) {
        return g = Object.setPrototypeOf || function(e3, t3) {
          return e3.__proto__ = t3, e3;
        }, g(e2, t2);
      }
      function y(e2) {
        if (void 0 === e2) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return e2;
      }
      function m(e2, t2) {
        if (t2 && ("object" == typeof t2 || "function" == typeof t2)) return t2;
        if (void 0 !== t2) throw new TypeError("Derived constructors may only return object or undefined");
        return y(e2);
      }
      function E(e2) {
        var t2 = (function() {
          if ("undefined" == typeof Reflect || !Reflect.construct) return false;
          if (Reflect.construct.sham) return false;
          if ("function" == typeof Proxy) return true;
          try {
            return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], (function() {
            }))), true;
          } catch (e3) {
            return false;
          }
        })();
        return function() {
          var n2, r2 = _(e2);
          if (t2) {
            var i2 = _(this).constructor;
            n2 = Reflect.construct(r2, arguments, i2);
          } else n2 = r2.apply(this, arguments);
          return m(this, n2);
        };
      }
      function v(e2, t2) {
        for (; !Object.prototype.hasOwnProperty.call(e2, t2) && null !== (e2 = _(e2)); ) ;
        return e2;
      }
      function b() {
        return b = "undefined" != typeof Reflect && Reflect.get ? Reflect.get : function(e2, t2, n2) {
          var r2 = v(e2, t2);
          if (r2) {
            var i2 = Object.getOwnPropertyDescriptor(r2, t2);
            return i2.get ? i2.get.call(arguments.length < 3 ? e2 : n2) : i2.value;
          }
        }, b.apply(this, arguments);
      }
      function C(e2, t2) {
        return (function(e3) {
          if (Array.isArray(e3)) return e3;
        })(e2) || (function(e3, t3) {
          var n2 = null == e3 ? null : "undefined" != typeof Symbol && e3[Symbol.iterator] || e3["@@iterator"];
          if (null == n2) return;
          var r2, i2, s2 = [], a2 = true, o2 = false;
          try {
            for (n2 = n2.call(e3); !(a2 = (r2 = n2.next()).done) && (s2.push(r2.value), !t3 || s2.length !== t3); a2 = true) ;
          } catch (e4) {
            o2 = true, i2 = e4;
          } finally {
            try {
              a2 || null == n2.return || n2.return();
            } finally {
              if (o2) throw i2;
            }
          }
          return s2;
        })(e2, t2) || N(e2, t2) || (function() {
          throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
        })();
      }
      function A(e2) {
        return (function(e3) {
          if (Array.isArray(e3)) return S(e3);
        })(e2) || (function(e3) {
          if ("undefined" != typeof Symbol && null != e3[Symbol.iterator] || null != e3["@@iterator"]) return Array.from(e3);
        })(e2) || N(e2) || (function() {
          throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
        })();
      }
      function N(e2, t2) {
        if (e2) {
          if ("string" == typeof e2) return S(e2, t2);
          var n2 = Object.prototype.toString.call(e2).slice(8, -1);
          return "Object" === n2 && e2.constructor && (n2 = e2.constructor.name), "Map" === n2 || "Set" === n2 ? Array.from(e2) : "Arguments" === n2 || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n2) ? S(e2, t2) : void 0;
        }
      }
      function S(e2, t2) {
        (null == t2 || t2 > e2.length) && (t2 = e2.length);
        for (var n2 = 0, r2 = new Array(t2); n2 < t2; n2++) r2[n2] = e2[n2];
        return r2;
      }
      function I(e2, t2) {
        var n2 = "undefined" != typeof Symbol && e2[Symbol.iterator] || e2["@@iterator"];
        if (!n2) {
          if (Array.isArray(e2) || (n2 = N(e2)) || t2 && e2 && "number" == typeof e2.length) {
            n2 && (e2 = n2);
            var r2 = 0, i2 = function() {
            };
            return { s: i2, n: function() {
              return r2 >= e2.length ? { done: true } : { done: false, value: e2[r2++] };
            }, e: function(e3) {
              throw e3;
            }, f: i2 };
          }
          throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
        }
        var s2, a2 = true, o2 = false;
        return { s: function() {
          n2 = n2.call(e2);
        }, n: function() {
          var e3 = n2.next();
          return a2 = e3.done, e3;
        }, e: function(e3) {
          o2 = true, s2 = e3;
        }, f: function() {
          try {
            a2 || null == n2.return || n2.return();
          } finally {
            if (o2) throw s2;
          }
        } };
      }
      var T = (function() {
        function e2() {
        }
        return Object.defineProperty(e2, "OS_VERSION", { get: function() {
          return "undefined" != typeof navigator && navigator.userAgent ? navigator.userAgent.replace(/,/g, ".") : "noAgent";
        }, enumerable: false, configurable: true }), Object.defineProperty(e2, "SDK_VERSION", { get: function() {
          return "3.1.33";
        }, enumerable: false, configurable: true }), Object.defineProperty(e2, "SDK_MAJOR_VERSION", { get: function() {
          return e2.SDK_VERSION.split(".")[0];
        }, enumerable: false, configurable: true }), Object.defineProperty(e2, "DEFAULT_MAX_UNREAD_COUNT_OF_SUPER_GROUP_CHANNEL", { get: function() {
          return 100;
        }, enumerable: false, configurable: true }), Object.defineProperty(e2, "INTERNAL_CALL", { get: function() {
          return "ic";
        }, enumerable: false, configurable: true }), e2;
      })(), U = {}, O = (function() {
        function e2(e3) {
          this._container = e3;
        }
        return e2.create = function(t2, n2) {
          return U[t2] = new e2(n2), U[t2];
        }, e2.get = function(e3) {
          return e3 || (e3 = wi.getInstance()._iid), U[e3];
        }, Object.defineProperty(e2.prototype, "container", { get: function() {
          return this._container;
        }, enumerable: false, configurable: true }), e2.prototype.get = function(e3) {
          return this._container[e3];
        }, e2.prototype.set = function(e3, t2) {
          this._container[e3] = t2;
        }, e2.prototype.remove = function(e3) {
          this._container.hasOwnProperty(e3) && delete this._container[e3];
        }, e2;
      })(), M = function(e2, t2) {
        return M = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(e3, t3) {
          e3.__proto__ = t3;
        } || function(e3, t3) {
          for (var n2 in t3) Object.prototype.hasOwnProperty.call(t3, n2) && (e3[n2] = t3[n2]);
        }, M(e2, t2);
      };
      function k(e2, t2) {
        if ("function" != typeof t2 && null !== t2) throw new TypeError("Class extends value " + String(t2) + " is not a constructor or null");
        function n2() {
          this.constructor = e2;
        }
        M(e2, t2), e2.prototype = null === t2 ? Object.create(t2) : (n2.prototype = t2.prototype, new n2());
      }
      var R = function() {
        return R = Object.assign || function(e2) {
          for (var t2, n2 = 1, r2 = arguments.length; n2 < r2; n2++) for (var i2 in t2 = arguments[n2]) Object.prototype.hasOwnProperty.call(t2, i2) && (e2[i2] = t2[i2]);
          return e2;
        }, R.apply(this, arguments);
      };
      function L(e2, t2, n2, r2) {
        return new (n2 || (n2 = Promise))((function(i2, s2) {
          function a2(e3) {
            try {
              l2(r2.next(e3));
            } catch (e4) {
              s2(e4);
            }
          }
          function o2(e3) {
            try {
              l2(r2.throw(e3));
            } catch (e4) {
              s2(e4);
            }
          }
          function l2(e3) {
            var t3;
            e3.done ? i2(e3.value) : (t3 = e3.value, t3 instanceof n2 ? t3 : new n2((function(e4) {
              e4(t3);
            }))).then(a2, o2);
          }
          l2((r2 = r2.apply(e2, t2 || [])).next());
        }));
      }
      function w(e2, t2) {
        var n2, r2, i2, s2, a2 = { label: 0, sent: function() {
          if (1 & i2[0]) throw i2[1];
          return i2[1];
        }, trys: [], ops: [] };
        return s2 = { next: o2(0), throw: o2(1), return: o2(2) }, "function" == typeof Symbol && (s2[Symbol.iterator] = function() {
          return this;
        }), s2;
        function o2(s3) {
          return function(o3) {
            return (function(s4) {
              if (n2) throw new TypeError("Generator is already executing.");
              for (; a2; ) try {
                if (n2 = 1, r2 && (i2 = 2 & s4[0] ? r2.return : s4[0] ? r2.throw || ((i2 = r2.return) && i2.call(r2), 0) : r2.next) && !(i2 = i2.call(r2, s4[1])).done) return i2;
                switch (r2 = 0, i2 && (s4 = [2 & s4[0], i2.value]), s4[0]) {
                  case 0:
                  case 1:
                    i2 = s4;
                    break;
                  case 4:
                    return a2.label++, { value: s4[1], done: false };
                  case 5:
                    a2.label++, r2 = s4[1], s4 = [0];
                    continue;
                  case 7:
                    s4 = a2.ops.pop(), a2.trys.pop();
                    continue;
                  default:
                    if (!(i2 = a2.trys, (i2 = i2.length > 0 && i2[i2.length - 1]) || 6 !== s4[0] && 2 !== s4[0])) {
                      a2 = 0;
                      continue;
                    }
                    if (3 === s4[0] && (!i2 || s4[1] > i2[0] && s4[1] < i2[3])) {
                      a2.label = s4[1];
                      break;
                    }
                    if (6 === s4[0] && a2.label < i2[1]) {
                      a2.label = i2[1], i2 = s4;
                      break;
                    }
                    if (i2 && a2.label < i2[2]) {
                      a2.label = i2[2], a2.ops.push(s4);
                      break;
                    }
                    i2[2] && a2.ops.pop(), a2.trys.pop();
                    continue;
                }
                s4 = t2.call(e2, a2);
              } catch (e3) {
                s4 = [6, e3], r2 = 0;
              } finally {
                n2 = i2 = 0;
              }
              if (5 & s4[0]) throw s4[1];
              return { value: s4[0] ? s4[1] : void 0, done: true };
            })([s3, o3]);
          };
        }
      }
      function P(e2, t2, n2) {
        if (n2 || 2 === arguments.length) for (var r2, i2 = 0, s2 = t2.length; i2 < s2; i2++) !r2 && i2 in t2 || (r2 || (r2 = Array.prototype.slice.call(t2, 0, i2)), r2[i2] = t2[i2]);
        return e2.concat(r2 || Array.prototype.slice.call(t2));
      }
      var D, H = (function(e2) {
        function t2(n2, r2) {
          var i2 = e2.call(this, r2) || this;
          return i2.name = "SendBirdException", i2.code = r2 || 0, i2.message = n2, Object.setPrototypeOf(i2, t2.prototype), i2;
        }
        return k(t2, e2), Object.defineProperty(t2.prototype, "isInvalidTokenError", { get: function() {
          return this.code === t2.INVALID_TOKEN;
        }, enumerable: false, configurable: true }), Object.defineProperty(t2.prototype, "isSessionKeyExpiredError", { get: function() {
          return this.code === t2.SESSION_KEY_EXPIRED;
        }, enumerable: false, configurable: true }), Object.defineProperty(t2.prototype, "isSessionTokenExpiredError", { get: function() {
          return this.code === t2.SESSION_TOKEN_EXPIRED;
        }, enumerable: false, configurable: true }), Object.defineProperty(t2.prototype, "isSessionTokenRevokedError", { get: function() {
          return this.code === t2.SESSION_TOKEN_REVOKED;
        }, enumerable: false, configurable: true }), Object.defineProperty(t2, "INVALID_TOKEN", { get: function() {
          return 400111;
        }, enumerable: false, configurable: true }), Object.defineProperty(t2, "SESSION_KEY_EXPIRED", { get: function() {
          return 400309;
        }, enumerable: false, configurable: true }), Object.defineProperty(t2, "USER_DEACTIVATED", { get: function() {
          return 400300;
        }, enumerable: false, configurable: true }), Object.defineProperty(t2, "NON_EXISTING_USER", { get: function() {
          return 400301;
        }, enumerable: false, configurable: true }), Object.defineProperty(t2, "SESSION_TOKEN_EXPIRED", { get: function() {
          return 400302;
        }, enumerable: false, configurable: true }), Object.defineProperty(t2, "SESSION_TOKEN_REVOKED", { get: function() {
          return 400310;
        }, enumerable: false, configurable: true }), Object.defineProperty(t2, "INVALID_INITIALIZATION", { get: function() {
          return 800100;
        }, enumerable: false, configurable: true }), Object.defineProperty(t2, "CONNECTION_REQUIRED", { get: function() {
          return 800101;
        }, enumerable: false, configurable: true }), Object.defineProperty(t2, "CONNECTION_CANCELED", { get: function() {
          return 800102;
        }, enumerable: false, configurable: true }), Object.defineProperty(t2, "INVALID_PARAMETER", { get: function() {
          return 800110;
        }, enumerable: false, configurable: true }), Object.defineProperty(t2, "NETWORK_ERROR", { get: function() {
          return 800120;
        }, enumerable: false, configurable: true }), Object.defineProperty(t2, "NETWORK_ROUTING_ERROR", { get: function() {
          return 800121;
        }, enumerable: false, configurable: true }), Object.defineProperty(t2, "MALFORMED_DATA", { get: function() {
          return 800130;
        }, enumerable: false, configurable: true }), Object.defineProperty(t2, "MALFORMED_ERROR_DATA", { get: function() {
          return 800140;
        }, enumerable: false, configurable: true }), Object.defineProperty(t2, "WRONG_CHANNEL_TYPE", { get: function() {
          return 800150;
        }, enumerable: false, configurable: true }), Object.defineProperty(t2, "MARK_AS_READ_RATE_LIMIT_EXCEEDED", { get: function() {
          return 800160;
        }, enumerable: false, configurable: true }), Object.defineProperty(t2, "QUERY_IN_PROGRESS", { get: function() {
          return 800170;
        }, enumerable: false, configurable: true }), Object.defineProperty(t2, "ACK_TIMEOUT", { get: function() {
          return 800180;
        }, enumerable: false, configurable: true }), Object.defineProperty(t2, "LOGIN_TIMEOUT", { get: function() {
          return 800190;
        }, enumerable: false, configurable: true }), Object.defineProperty(t2, "WEBSOCKET_CONNECTION_CLOSED", { get: function() {
          return 800200;
        }, enumerable: false, configurable: true }), Object.defineProperty(t2, "WEBSOCKET_CONNECTION_FAILED", { get: function() {
          return 800210;
        }, enumerable: false, configurable: true }), Object.defineProperty(t2, "REQUEST_FAILED", { get: function() {
          return 800220;
        }, enumerable: false, configurable: true }), Object.defineProperty(t2, "FILE_UPLOAD_CANCEL_FAILED", { get: function() {
          return 800230;
        }, enumerable: false, configurable: true }), Object.defineProperty(t2, "REQUEST_CANCELED", { get: function() {
          return 800240;
        }, enumerable: false, configurable: true }), Object.defineProperty(t2, "REQUEST_DUPLICATED", { get: function() {
          return 800250;
        }, enumerable: false, configurable: true }), Object.defineProperty(t2, "FILE_SIZE_LIMIT_EXCEEDED", { get: function() {
          return 800260;
        }, enumerable: false, configurable: true }), Object.defineProperty(t2, "SESSION_TOKEN_REQUEST_FAILED", { get: function() {
          return 800500;
        }, enumerable: false, configurable: true }), Object.defineProperty(t2, "SESSION_REFRESH_SUCCESS", { get: function() {
          return 800501;
        }, enumerable: false, configurable: true }), Object.defineProperty(t2, "SESSION_REFRESH_FAILED", { get: function() {
          return 800502;
        }, enumerable: false, configurable: true }), Object.defineProperty(t2, "CHANNEL_NOT_FOUND", { get: function() {
          return 900500;
        }, enumerable: false, configurable: true }), Object.defineProperty(t2, "USER_NOT_MEMBER", { get: function() {
          return 900020;
        }, enumerable: false, configurable: true }), t2;
      })(Error), F = (function() {
        function e2() {
          this.sessionToken = null, this.sessionKey = null, this.eKey = null;
        }
        return e2.prototype.hasSession = function() {
          return !!this.sessionKey;
        }, e2;
      })(), G = {}, x = (function() {
        function e2(e3, t2) {
          void 0 === t2 && (t2 = {});
          var n2 = this;
          this._iid = e3, Object.keys(t2).forEach((function(e4) {
            var r2 = t2[e4];
            "function" == typeof r2 && (n2[e4] = n2.getClonedClass(r2));
          })), G[e3] = this;
        }
        return e2.get = function(e3) {
          return e3 ? G[e3] : {};
        }, e2.prototype.getClonedClass = function(e3) {
          var t2 = this._iid, n2 = (function(n3) {
            function r2() {
              for (var e4 = [], t3 = 0; t3 < arguments.length; t3++) e4[t3] = arguments[t3];
              return n3.apply(this, e4) || this;
            }
            return k(r2, n3), Object.defineProperty(r2, "_iid", { get: function() {
              return t2;
            }, enumerable: false, configurable: true }), Object.defineProperty(r2, "_name", { get: function() {
              return e3.name;
            }, enumerable: false, configurable: true }), Object.defineProperty(r2.prototype, "_iid", { get: function() {
              return t2;
            }, enumerable: false, configurable: true }), r2;
          })(e3);
          return n2;
        }, e2;
      })(), j = { verbose: "VERBOSE", info: "INFO", debug: "DEBUG", warn: "WARN", error: "ERROR", none: "NONE" }, B = (function(e2) {
        f(n2, e2);
        var t2 = E(n2);
        function n2() {
          return c(this, n2), t2.apply(this, arguments);
        }
        return h(n2, [{ key: "log", value: function(e3) {
          for (var t3, n3, r2, i2, s2, a2 = this.getLogLevelText(e3); a2.length < 8; ) a2 += " ";
          for (var o2 = arguments.length, l2 = new Array(o2 > 1 ? o2 - 1 : 0), u2 = 1; u2 < o2; u2++) l2[u2 - 1] = arguments[u2];
          switch (l2.unshift("[".concat(a2, "]")), e3) {
            case "verbose":
              (t3 = console).log.apply(t3, l2);
              break;
            case "debug":
              (n3 = console).log.apply(n3, l2);
              break;
            case "info":
              (r2 = console).info.apply(r2, l2);
              break;
            case "warn":
              (i2 = console).warn.apply(i2, l2);
              break;
            case "error":
              (s2 = console).error.apply(s2, l2);
          }
        } }, { key: "groupStart", value: function() {
          var e3;
          (e3 = console).group.apply(e3, arguments);
        } }, { key: "groupEnd", value: function() {
          var e3;
          (e3 = console).groupEnd.apply(e3, arguments);
        } }]), n2;
      })((function() {
        function e2() {
          c(this, e2);
        }
        return h(e2, [{ key: "getLogLevelText", value: function(e3) {
          return j[e3];
        } }]), e2;
      })()), V = { DEBUG: "debug", PRODUCTION: "production" }, q = V.PRODUCTION, K = { VERBOSE: "verbose", DEBUG: "debug", INFO: "info", WARN: "warn", ERROR: "error", NONE: "none" }, z = [K.NONE, K.ERROR, K.WARN, K.INFO, K.DEBUG, K.VERBOSE], Y = K.WARN, Q = z.indexOf(Y), W = [new B()], J = (function() {
        function e2() {
          c(this, e2);
        }
        return h(e2, null, [{ key: "Mode", get: function() {
          return V;
        } }, { key: "mode", get: function() {
          return q;
        }, set: function(t2) {
          Object.keys(e2.Mode).map((function(t3) {
            return e2.Mode[t3];
          })).indexOf(t2) > -1 && (q = t2);
        } }, { key: "supportedLogLevels", get: function() {
          return K;
        } }, { key: "logLevel", get: function() {
          return z[Q];
        }, set: function(e3) {
          z.includes(e3) || (e3 = Y), Q = z.indexOf(e3);
        } }, { key: "defaultLogLevel", get: function() {
          return Y;
        } }, { key: "isDisplayableLogLevel", value: function(e3) {
          var t2 = z.indexOf(e3);
          return 0 <= t2 && t2 <= Q;
        } }, { key: "log", value: function(t2) {
          for (var n2 = arguments.length, r2 = new Array(n2 > 1 ? n2 - 1 : 0), i2 = 1; i2 < n2; i2++) r2[i2 - 1] = arguments[i2];
          e2.isDisplayableLogLevel(t2) && W.forEach((function(e3) {
            return e3.log.apply(e3, [t2].concat(r2));
          }));
        } }, { key: "verbose", value: function() {
          for (var t2 = arguments.length, n2 = new Array(t2), r2 = 0; r2 < t2; r2++) n2[r2] = arguments[r2];
          e2.log.apply(e2, [K.VERBOSE].concat(n2));
        } }, { key: "debug", value: function() {
          for (var t2 = arguments.length, n2 = new Array(t2), r2 = 0; r2 < t2; r2++) n2[r2] = arguments[r2];
          e2.log.apply(e2, [K.DEBUG].concat(n2));
        } }, { key: "info", value: function() {
          for (var t2 = arguments.length, n2 = new Array(t2), r2 = 0; r2 < t2; r2++) n2[r2] = arguments[r2];
          e2.log.apply(e2, [K.INFO].concat(n2));
        } }, { key: "warn", value: function() {
          for (var t2 = arguments.length, n2 = new Array(t2), r2 = 0; r2 < t2; r2++) n2[r2] = arguments[r2];
          e2.log.apply(e2, [K.WARN].concat(n2));
        } }, { key: "error", value: function() {
          for (var t2 = arguments.length, n2 = new Array(t2), r2 = 0; r2 < t2; r2++) n2[r2] = arguments[r2];
          e2.log.apply(e2, [K.ERROR].concat(n2));
        } }, { key: "group", value: function() {
          for (var t2 = arguments.length, n2 = new Array(t2), r2 = 0; r2 < t2; r2++) n2[r2] = arguments[r2];
          var i2 = [];
          Array.isArray(n2[n2.length - 1]) && (i2 = n2.pop()), i2.some((function(t3) {
            return e2.isDisplayableLogLevel(t3.level);
          })) && W.filter((function(e3) {
            return e3 instanceof B;
          })).forEach((function(e3) {
            e3.groupStart.apply(e3, n2), i2.forEach((function(t3) {
              return e3.log.apply(e3, [t3.level].concat(A(t3.messages)));
            })), e3.groupEnd();
          }));
        } }]), e2;
      })(), X = (function() {
        function e2() {
          c(this, e2), this._queue = [], this.locked = false;
        }
        return h(e2, [{ key: "lock", value: function(e3) {
          var t2 = this;
          this.locked ? this._queue.push(e3) : (this.locked = true, e3((function() {
            return t2.unlock();
          })));
        } }, { key: "unlock", value: function() {
          if (this.locked = false, this._queue.length > 0) {
            var e3 = this._queue.shift();
            this.lock(e3);
          }
        } }]), e2;
      })(), Z = (function() {
        function e2(t2) {
          c(this, e2), this.sb = t2, this.mutex = new X(), this.pingTimer = null, this.pingTimeoutTimer = null;
        }
        return h(e2, [{ key: "ping", value: function() {
          var e3 = this, t2 = x.get(this.sb._iid).Command.bPing(), n2 = O.get(this.sb._iid).container, r2 = n2.wsAdapter, i2 = n2.pongTimeout;
          r2.client.send(t2), J.debug("`PING`"), this.pingTimeoutTimer = setTimeout((function() {
            J.debug("`PING` timeout."), e3.stop(), r2.client.handler && r2.client.handler.onError();
          }), i2);
        } }, { key: "pong", value: function() {
          this.pingTimeoutTimer && (clearTimeout(this.pingTimeoutTimer), this.pingTimeoutTimer = null);
        } }, { key: "refreshTimer", value: function() {
          var e3 = this, t2 = O.get(this.sb._iid).container.pingInterval;
          this.mutex.lock((function(n2) {
            e3.stop(), e3.pingTimer = setInterval((function() {
              e3.ping();
            }), t2), n2();
          }));
        } }, { key: "start", value: function() {
          this.refreshTimer(), this.ping();
        } }, { key: "stop", value: function() {
          this.pingTimer && (clearInterval(this.pingTimer), this.pingTimer = null), this.pingTimeoutTimer && (clearTimeout(this.pingTimeoutTimer), this.pingTimeoutTimer = null);
        } }]), e2;
      })(), $ = function() {
        return "undefined" == typeof document && "undefined" != typeof navigator && "ReactNative" == navigator.product;
      }, ee = function() {
        return "undefined" == typeof window && "undefined" != typeof process && ("node" === process.title || void 0 !== process.versions && process.versions.node || "[object process]" === String(process));
      };
      !(function(e2) {
        e2.FILE = "file", e2.BLOB = "blob", e2.BLOB_LIKE_OBJECT = "blobLikeObject", e2.URL = "url";
      })(D || (D = {}));
      var te = (function() {
        function e2() {
        }
        var t2;
        return e2.isFileLikeObject = function(e3) {
          return "object" == typeof e3 && null !== e3 && e3.hasOwnProperty("name") && "string" == typeof e3.name && e3.hasOwnProperty("uri") && "string" == typeof e3.uri && e3.hasOwnProperty("type") && "string" == typeof e3.type;
        }, t2 = e2, e2.convertFileToDataUrl = function(e3) {
          return new Promise((function(t3, n2) {
            var r2 = new FileReader();
            r2.onload = function(e4) {
              return t3(r2.result);
            }, r2.onerror = function(e4) {
              return n2(r2.error);
            }, r2.readAsDataURL(e3);
          }));
        }, e2.convertFileToArrayBuffer = function(e3) {
          return new Promise((function(t3, n2) {
            var r2 = new FileReader();
            r2.onload = function(e4) {
              return t3(r2.result);
            }, r2.onerror = function(e4) {
              return n2(r2.error);
            }, r2.readAsArrayBuffer(e3);
          }));
        }, e2.convertDataUrlToByteArray = function(e3) {
          for (var t3 = e3.split(","), n2 = t3[0].match(/:(.*?);/)[1], r2 = atob(t3[1]), i2 = r2.length, s2 = new Uint8Array(i2); i2--; ) s2[i2] = r2.charCodeAt(i2);
          return [s2, n2];
        }, e2.convertDataURLtoFile = function(e3, n2) {
          var r2 = t2.convertDataUrlToByteArray(e3), i2 = r2[0], s2 = r2[1];
          return new File([i2], n2, { type: s2 });
        }, e2.convertDataURLtoBlob = function(e3) {
          var n2 = t2.convertDataUrlToByteArray(e3), r2 = n2[0], i2 = n2[1];
          return new Blob([r2], { type: i2 });
        }, e2.convertArrayBufferToFile = function(e3, t3) {
          return new File([e3], t3);
        }, e2.isFile = function(e3) {
          return "undefined" != typeof window && "File" in window && "undefined" != typeof File && e3 instanceof File;
        }, e2.isBlob = function(e3) {
          return "undefined" != typeof window && "Blob" in window && "undefined" != typeof Blob && e3 instanceof Blob;
        }, e2.isFileTypeBlob = function(e3) {
          return e3 === D.BLOB || e3 === D.FILE;
        }, e2.convertBlobToBuffer = function(n2) {
          return L(void 0, void 0, void 0, (function() {
            var r2;
            return w(t2, (function(t3) {
              switch (t3.label) {
                case 0:
                  return [4, e2.convertFileToArrayBuffer(n2)];
                case 1:
                  return r2 = t3.sent(), [2, Buffer.from(r2)];
              }
            }));
          }));
        }, e2;
      })(), ne = [H.CONNECTION_REQUIRED, H.NETWORK_ERROR, H.ACK_TIMEOUT, H.WEBSOCKET_CONNECTION_CLOSED, H.WEBSOCKET_CONNECTION_FAILED, H.FILE_UPLOAD_CANCEL_FAILED, H.REQUEST_CANCELED, 500901, 500910, 900200], re = [H.SESSION_TOKEN_EXPIRED, H.SESSION_TOKEN_REVOKED, H.USER_DEACTIVATED, H.NON_EXISTING_USER], ie = [H.WEBSOCKET_CONNECTION_CLOSED, H.WEBSOCKET_CONNECTION_FAILED], se = (function() {
        function e2() {
        }
        return e2.deepEqual = function(e3, t2) {
          if (e3 !== t2) {
            var n2 = R({}, e3), r2 = R({}, t2);
            return (!n2.hasOwnProperty("messageId") || !r2.hasOwnProperty("messageId") || n2.messageId === r2.messageId) && ((!n2.hasOwnProperty("reqId") || !r2.hasOwnProperty("reqId") || n2.reqId === r2.reqId) && (n2.hasOwnProperty("messageId") && delete n2.messageId, n2.hasOwnProperty("reqId") && delete n2.reqId, r2.hasOwnProperty("messageId") && delete r2.messageId, r2.hasOwnProperty("reqId") && delete r2.reqId, JSON.stringify(n2) === JSON.stringify(r2)));
          }
          return true;
        }, e2.isResendableError = function(e3) {
          return e3 > 0 && ne.indexOf(e3) >= 0;
        }, e2.isAutoResendableError = function(e3) {
          return e3 > 0 && ie.indexOf(e3) >= 0;
        }, e2.isNonAutoReconnectableError = function(e3) {
          return e3 > 0 && re.indexOf(e3) >= 0;
        }, e2.isFile = function(e3) {
          var t2 = te.isFileLikeObject(e3);
          return t2 || (ee() ? "undefined" != typeof Buffer && e3 instanceof Buffer : "undefined" != typeof Blob ? e3 instanceof Blob : "undefined" != typeof File && e3 instanceof File);
        }, e2;
      })(), ae = (function() {
        function e2(e3) {
          var t2 = this;
          this.fields = {}, e3 && Object.keys(e3).forEach((function(n2) {
            t2.fields[n2] = { value: e3[n2] }, se.isFile(e3[n2]) && (t2.fields[n2].filename = e3[n2].name);
          })), this.options = {}, this.internal = false, this.upload = { reqId: null, deleteRequest: null, progressHandler: null };
        }
        return e2.prototype.add = function(e3, t2, n2) {
          void 0 === n2 && (n2 = null), this.fields[e3] = { value: t2, filename: n2 };
        }, e2.prototype.remove = function(e3) {
          this.fields.hasOwnProperty(e3) && delete this.fields[e3];
        }, e2.prototype.yield = function() {
          return L(this, void 0, void 0, (function() {
            var e3, t2, n2, r2, i2, a2, o2, l2, u2, c2, d2, h2, p2 = this;
            return w(this, (function(f2) {
              switch (f2.label) {
                case 0:
                  for (e3 = false, t2 = Object.keys(this.fields), n2 = 0, r2 = t2; n2 < r2.length; n2++) if (l2 = r2[n2], se.isFile(this.fields[l2].value)) {
                    e3 = true;
                    break;
                  }
                  if (!e3) return [3, 10];
                  i2 = new s.default(), a2 = 0, o2 = t2, f2.label = 1;
                case 1:
                  return a2 < o2.length ? (l2 = o2[a2], u2 = this.fields[l2], se.isFile(u2.value) ? (c2 = u2.value).filename || c2.name ? (i2.append(l2, u2.value, c2.filename || c2.name), [3, 6]) : [3, 2] : [3, 7]) : [3, 9];
                case 2:
                  return c2.data ? (i2.append(l2, u2.value, c2.data.name), [3, 6]) : [3, 3];
                case 3:
                  return d2 = u2.value, "undefined" != typeof window && "undefined" != typeof process && process.title.endsWith("node") && process.versions && process.versions.node && "undefined" != typeof Blob && d2 instanceof Blob || "undefined" != typeof File && d2 instanceof File ? [4, te.convertBlobToBuffer(d2)] : [3, 5];
                case 4:
                  d2 = f2.sent(), f2.label = 5;
                case 5:
                  i2.append(l2, d2, "unnamed"), f2.label = 6;
                case 6:
                  return [3, 8];
                case 7:
                  $() && Array.isArray(u2.value) ? i2.append(l2, String(u2.value)) : i2.append(l2, u2.value), f2.label = 8;
                case 8:
                  return a2++, [3, 1];
                case 9:
                  return [2, i2];
                case 10:
                  return h2 = {}, Object.keys(this.fields).forEach((function(e4) {
                    h2[e4] = p2.fields[e4].value;
                  })), [2, h2];
              }
            }));
          }));
        }, e2;
      })(), oe = function(e2, t2, n2) {
        return void 0 === n2 && (n2 = null), new Promise((function(r2, i2) {
          var s2 = function(t3, s3) {
            (void 0 === s3 && (s3 = null), n2) && (O.get(e2).get("isErrorFirstInCallback") ? n2(t3, s3) : n2(s3, t3));
            t3 ? i2(t3) : r2(s3);
          };
          s2.isPromisifyCallback = true, t2(s2);
        }));
      }, le = 888e3, ue = (function() {
        function e2(t2) {
          c(this, e2), this.sb = t2, this.cls = x.get(this.sb._iid);
        }
        return h(e2, [{ key: "checkRouting", value: function(e3) {
          if (this.sb.customApiHost && this.sb.customWsHost) "function" == typeof e3 && e3(null, { apiHost: this.sb.customApiHost, wsHost: this.sb.customWsHost });
          else {
            var t2 = this.sb.getApplicationId();
            e3(null, { apiHost: "https://api-".concat(t2, ".sendbird.com"), wsHost: "wss://ws-".concat(t2, ".sendbird.com") });
          }
        } }, { key: "_buildUrl", value: function(e3) {
          var t2 = e3.apiHost, n2 = e3.url, r2 = e3.params;
          return n2 ? r2 && r2.internal ? "".concat(t2, "/v").concat(T.SDK_MAJOR_VERSION, "/sdk").concat(n2) : "".concat(t2, "/v").concat(T.SDK_MAJOR_VERSION).concat(n2) : t2;
        } }, { key: "_createHeader", value: function() {
          var e3 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, t2 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, n2 = t2.noSessionKey, r2 = void 0 !== n2 && n2, i2 = t2.accessToken, a2 = void 0 === i2 ? null : i2, o2 = e3 instanceof s.default && "function" == typeof e3.getHeaders ? e3.getHeaders() : {}, l2 = O.get(this.sb._iid), u2 = l2.container, c2 = u2.appId, d2 = u2.auth, h2 = u2.extensions, p2 = u2.getUserAgentWithExtensions, f2 = wi.getAppVersion(), _2 = "JS,".concat(T.OS_VERSION, ",").concat(T.SDK_VERSION, ",").concat(c2);
          return f2 && (_2 += ",".concat(f2)), o2.SendBird = _2, o2["SB-User-Agent"] = encodeURIComponent(p2(h2)), !r2 && d2.sessionKey && (o2["Session-Key"] = d2.sessionKey), a2 && (o2["App-Id"] = c2, o2["Access-Token"] = a2), o2["Request-Sent-Timestamp"] = (/* @__PURE__ */ new Date()).getTime().toString(), e3 instanceof s.default && $() && (o2["Content-Type"] = "multipart/form-data"), o2;
        } }, { key: "_createQuery", value: function(e3) {
          var t2 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
          try {
            var n2 = [];
            return Object.keys(t2).forEach((function(e4) {
              var r2 = t2[e4];
              if (null != r2) {
                var i2 = "";
                i2 = "object" === u(r2) ? Array.isArray(r2) ? r2.map((function(e5) {
                  return encodeURIComponent("string" == typeof e5 ? e5.trim() : e5);
                })).join(",") : encodeURIComponent(JSON.stringify(r2)) : encodeURIComponent(r2), n2.push("".concat(e4, "=").concat(i2));
              }
            })), n2.length > 0 ? "".concat(e3, "?").concat(n2.join("&")) : e3;
          } catch (t3) {
            return J.debug("createWithEncodedGetParams is failed. - ", t3), e3;
          }
        } }, { key: "_request", value: function(e3, t2, n2, r2) {
          var a2 = this;
          this.checkRouting((function(o2, l2) {
            if (o2) r2(new H("Request failed.", H.REQUEST_FAILED), null);
            else {
              var u2 = a2._buildUrl({ apiHost: l2.apiHost, url: t2, params: n2 });
              (n2 ? n2.yield() : Promise.resolve({})).then((function(o3) {
                var l3 = a2._createHeader(o3, n2 ? n2.options : {}), c2 = [{ level: J.supportedLogLevels.DEBUG, messages: ["url:", t2] }, { level: J.supportedLogLevels.DEBUG, messages: ["data:", o3] }], d2 = null;
                switch (e3) {
                  case "GET":
                  case "DELETE":
                    d2 = a2._createQuery(u2, o3);
                    break;
                  case "POST":
                  case "PUT":
                    d2 = u2;
                }
                var h2 = null;
                if (("undefined" == typeof ServiceWorker || "undefined" == typeof ServiceWorkerRegistration || "undefined" != typeof ServiceWorkerContainer) && "undefined" == typeof Worker || ee() || "function" != typeof fetch) switch (e3) {
                  case "GET":
                    h2 = i.default.get(d2, { headers: l3, validateStatus: a2._validateStatus });
                    break;
                  case "POST":
                    var p2 = { headers: l3, validateStatus: a2._validateStatus, onUploadProgress: function(e4) {
                      n2.upload.progressHandler && n2.upload.progressHandler(e4, n2.upload.reqId);
                    } };
                    if (o3 instanceof s.default) {
                      var f2 = null;
                      "function" == typeof AbortController ? (f2 = new AbortController(), p2.signal = f2.signal) : (f2 = i.default.CancelToken.source(), p2.cancelToken = f2.token);
                      var _2 = a2.cls.FileMessageQueue, g2 = n2.upload.reqId;
                      g2 && (c2.push({ level: J.supportedLogLevels.DEBUG, messages: ["request id:", g2] }), _2.uploadRequest[g2] = f2);
                    }
                    h2 = i.default.post(d2, "function" == typeof o3.getBuffer ? o3.getBuffer() : o3, p2);
                    break;
                  case "PUT":
                    h2 = i.default.put(d2, o3, { headers: l3, validateStatus: a2._validateStatus });
                    break;
                  case "DELETE":
                    h2 = i.default.delete(d2, { headers: l3, validateStatus: a2._validateStatus });
                }
                else {
                  var y2 = { method: e3, headers: l3 };
                  switch (e3) {
                    case "GET":
                      break;
                    case "POST":
                      if (o3 instanceof s.default) {
                        if ("function" == typeof AbortController) {
                          var m2 = new AbortController(), E2 = m2.signal;
                          y2.signal = E2;
                          var v2 = a2.cls.FileMessageQueue, b2 = n2.upload.reqId;
                          b2 && (c2.push({ level: J.supportedLogLevels.DEBUG, messages: ["request id:", b2] }), v2.uploadRequest[b2] = m2);
                        }
                        y2.body = "function" == typeof o3.getBuffer ? o3.getBuffer() : o3;
                      } else l3["Content-Type"] = "application/json; charset=utf-8", y2.body = JSON.stringify(o3);
                      break;
                    case "PUT":
                      o3 instanceof s.default ? y2.body = "function" == typeof o3.getBuffer ? o3.getBuffer() : o3 : (l3["Content-Type"] = "application/json; charset=utf-8", y2.body = JSON.stringify(o3));
                  }
                  h2 = fetch(d2, y2).then((function(e4) {
                    return e4.json().then((function(t3) {
                      if (!a2._validateStatus(e4.status)) throw { request: { isAbort: false }, response: { data: t3 } };
                      return Promise.resolve({ data: t3 });
                    }));
                  }));
                }
                J.group("".concat(e3, " request"), c2), c2 = [], h2.then((function(t3) {
                  try {
                    var i2 = t3.data;
                    "POST" === e3 && "function" == typeof n2.upload.deleteRequest && n2.upload.deleteRequest(), c2.push({ level: J.supportedLogLevels.DEBUG, messages: ["data:", i2] }), r2(null, i2);
                  } catch (e4) {
                    throw { code: le, rawError: e4 };
                  }
                })).catch((function(i2) {
                  if (i2.code === le) throw i2.rawError;
                  "POST" === e3 && "function" == typeof n2.upload.deleteRequest && n2.upload.deleteRequest();
                  var s2 = a2._handleError(i2);
                  if (c2.push({ level: J.supportedLogLevels.DEBUG, messages: ["error:", s2] }), t2 && n2) if (n2.options && n2.options.isSessionRefresh) r2(s2, null);
                  else {
                    var o4 = O.get(a2.sb._iid).container.sessionManager;
                    o4.isSessionError(s2) ? o4.refreshSessionIfExpiredError(s2).then((function() {
                      return r2(new H("Session is refreshed successfully.", H.SESSION_REFRESH_SUCCESS), null);
                    })).catch((function(e4) {
                      return r2(new H("Session refresh failed.", H.SESSION_REFRESH_FAILED), null);
                    })) : r2(s2, null);
                  }
                  else r2(s2, null);
                })).finally((function() {
                  return J.group("".concat(e3, " response"), c2);
                }));
              }));
            }
          }));
        } }, { key: "_validateStatus", value: function(e3) {
          return e3 >= 200 && e3 < 400;
        } }, { key: "_handleError", value: function(e3) {
          var t2 = e3.request, n2 = e3.response;
          if (t2) {
            if (t2.isAbort || t2.aborted) return new H("Request has been canceled.", H.REQUEST_CANCELED);
            if (n2) {
              var r2 = n2.data, i2 = r2 ? r2.message : "Request failed.", s2 = r2 ? r2.code : H.REQUEST_FAILED;
              return new H(i2, s2);
            }
            return new H("Request failed.", H.REQUEST_FAILED);
          }
          return new H("There was a network error.", H.NETWORK_ERROR);
        } }, { key: "get", value: function(e3, t2, n2) {
          this._request("GET", e3, t2, n2);
        } }, { key: "dummyCall", value: function(e3) {
          this._request("GET", null, null, e3);
        } }, { key: "post", value: function(e3, t2, n2) {
          this._request("POST", e3, t2, n2);
        } }, { key: "put", value: function(e3, t2, n2) {
          this._request("PUT", e3, t2, n2);
        } }, { key: "delete", value: function(e3, t2, n2) {
          this._request("DELETE", e3, t2, n2);
        } }, { key: "refreshSessionKey", value: function(t2, n2) {
          var r2 = this, i2 = t2.accessToken;
          this.sb.ConnectionManager.ready((function(t3, s2) {
            if (t3) n2(t3, null);
            else {
              var a2 = e2.Path.USERS_USERID_SESSION_KEY.replace("%s", encodeURIComponent(s2.userId)), o2 = new ae();
              o2.add("expiring_session", true), o2.options.isSessionRefresh = true, o2.options.noSessionKey = true, o2.options.accessToken = i2, r2.post(a2, o2, n2);
            }
          }));
        } }, { key: "updateCurrentUserInfo", value: function(t2, n2) {
          var r2 = this, i2 = t2.nickname, s2 = t2.profileUrl, a2 = t2.profileImage, o2 = t2.preferredLanguages;
          this.sb.ConnectionManager.ready((function(t3, l2) {
            if (t3) n2(t3, null);
            else {
              var u2 = e2.Path.USERS_USERID.replace("%s", encodeURIComponent(l2.userId)), c2 = new ae();
              i2 && c2.add("nickname", i2), s2 && c2.add("profile_url", s2), a2 && c2.add("profile_file", a2, a2.name), o2 && c2.add("preferred_languages", o2), r2.put(u2, c2, n2);
            }
          }));
        } }, { key: "getMyGroupChannelChangeLogs", value: function(t2, n2) {
          var r2 = this;
          return oe(this.sb._iid, (function(n3) {
            var i2 = t2.ts, s2 = t2.token, a2 = t2.customTypes, o2 = t2.includeEmpty, l2 = t2.includeFrozen;
            r2.sb.ConnectionManager.ready((function(t3, u2) {
              if (t3) n3(t3, null);
              else {
                var c2 = e2.Path.USERS_USERID_MY_GROUP_CHANNEL_CHANGELOGS.replace("%s", encodeURIComponent(u2.userId)), d2 = new ae({ show_read_receipt: true, show_delivery_receipt: true, show_member: true });
                s2 && d2.add("token", s2), i2 && d2.add("change_ts", i2), a2 && a2.length > 0 && d2.add("custom_types", a2), "boolean" == typeof o2 && d2.add("show_empty", o2), "boolean" == typeof l2 && d2.add("show_frozen", l2), r2.get(c2, d2, n3);
              }
            }));
          }), n2);
        } }, { key: "getChannelInvitationPreference", value: function(t2, n2) {
          var r2 = this;
          this.sb.ConnectionManager.ready((function(t3, i2) {
            if (t3) n2(t3, null);
            else {
              var s2 = e2.Path.USERS_USERID_GROUP_CHANNEL_INVITATION_PREFERENCE.replace("%s", encodeURIComponent(i2.userId));
              r2.get(s2, null, n2);
            }
          }));
        } }, { key: "getGroupChannelCount", value: function(t2, n2) {
          var r2 = this, i2 = t2.memberStateFilter;
          this.sb.ConnectionManager.ready((function(t3, s2) {
            if (t3) n2(t3, null);
            else {
              var a2 = r2.cls.GroupChannel, o2 = e2.Path.USERS_USERID_GROUP_CHANNEL_COUNT.replace("%s", encodeURIComponent(s2.userId)), l2 = "";
              switch (i2) {
                case a2.MemberStateFilter.JOINED:
                  l2 = "joined";
                  break;
                case a2.MemberStateFilter.INVITED:
                  l2 = "invited";
                  break;
                case a2.MemberStateFilter.INVITED_BY_FRIEND:
                  l2 = "invited_by_friend";
                  break;
                case a2.MemberStateFilter.INVITED_BY_NON_FRIEND:
                  l2 = "invited_by_non_friend";
                  break;
                case a2.MemberStateFilter.LEFT:
                  l2 = "left";
                default:
                  l2 = "all";
              }
              var u2 = new ae({ state: l2 });
              r2.get(o2, u2, n2);
            }
          }));
        } }, { key: "getUnreadItemCount", value: function(t2, n2) {
          var r2 = this, i2 = t2.keys;
          this.sb.ConnectionManager.ready((function(t3, s2) {
            if (t3) n2(t3, null);
            else {
              var a2 = e2.Path.USERS_USERID_UNREAD_ITEM_COUNT.replace("%s", encodeURIComponent(s2.userId)), o2 = new ae({ item_keys: i2 });
              r2.get(a2, o2, n2);
            }
          }));
        } }, { key: "getTotalUnreadMessageCount", value: function(t2, n2) {
          var r2 = this, i2 = t2.customTypesFilter, s2 = t2.superChannelFilter;
          this.sb.ConnectionManager.ready((function(t3, a2) {
            if (t3) n2(t3, null);
            else {
              var o2 = e2.Path.USERS_USERID_UNREAD_MESSAGE_COUNT.replace("%s", encodeURIComponent(a2.userId)), l2 = new ae({ super_mode: s2 });
              null !== i2 && i2.length > 0 && l2.add("custom_types", i2), r2.get(o2, l2, n2);
            }
          }));
        } }, { key: "getTotalUnreadChannelCount", value: function(t2, n2) {
          var r2 = this, i2 = t2.customTypesFilter, s2 = t2.superChannelFilter;
          this.sb.ConnectionManager.ready((function(t3, a2) {
            if (t3) n2(t3, null);
            else {
              var o2 = e2.Path.USERS_USERID_UNREAD_CHANNEL_COUNT.replace("%s", encodeURIComponent(a2.userId)), l2 = new ae({ super_mode: s2 });
              null !== i2 && i2.length > 0 && l2.add("custom_types", i2), r2.get(o2, l2, n2);
            }
          }));
        } }, { key: "searchMessages", value: function(t2, n2) {
          var r2 = this, i2 = t2.keyword, s2 = t2.limit, a2 = t2.reverse, o2 = t2.exactMatch, l2 = t2.channelUrl, u2 = t2.channelCustomType, c2 = t2.messageTimestampFrom, d2 = t2.messageTimestampTo, h2 = t2.order, p2 = t2.nextToken, f2 = t2.advancedQuery, _2 = t2.targetFields;
          this.sb.ConnectionManager.ready((function(t3, g2) {
            if (t3) n2(t3, null);
            else {
              var y2 = e2.Path.SEARCH_MESSAGE, m2 = new ae({ limit: s2, reverse: a2, query: i2, custom_type: u2 });
              c2 && m2.add("message_ts_from", c2), d2 && m2.add("message_ts_to", d2), l2 && m2.add("channel_url", l2), h2 && m2.add("sort_field", h2), "boolean" == typeof o2 && m2.add("exact_match", o2), null !== p2 && p2.length > 0 && m2.add("after", p2), "boolean" == typeof f2 && m2.add("advanced_query", f2), _2 && Array.isArray(_2) && m2.add("target_fields", _2), r2.get(y2, m2, n2);
            }
          }));
        } }, { key: "markAsReadAll", value: function(t2, n2) {
          var r2 = this, i2 = t2.channelUrls;
          this.sb.ConnectionManager.ready((function(t3, s2) {
            if (t3) n2(t3, null);
            else {
              var a2 = e2.Path.USERS_USERID_MARKASREADALL.replace("%s", encodeURIComponent(s2.userId)), o2 = new ae();
              i2 && o2.add("channel_urls", i2), r2.put(a2, o2, n2);
            }
          }));
        } }, { key: "markAsDelivered", value: function(t2, n2) {
          var r2 = this, i2 = t2.channelUrl, s2 = t2.userId;
          this.sb.ConnectionManager.ready((function(t3, a2) {
            if (t3) n2(t3, null);
            else {
              var o2 = e2.Path.GROUPCHANNELS_CHANNELURL_MESSAGES_MARKASDELIVERED.replace("%s", encodeURIComponent(i2)), l2 = new ae();
              s2 && l2.add("user_id", s2), r2.put(o2, l2, n2);
            }
          }));
        } }, { key: "setChannelInvitationPreference", value: function(t2, n2) {
          var r2 = this, i2 = t2.isAutoAccept;
          this.sb.ConnectionManager.ready((function(t3, s2) {
            if (t3) n2(t3, null);
            else {
              var a2 = e2.Path.USERS_USERID_GROUP_CHANNEL_INVITATION_PREFERENCE.replace("%s", encodeURIComponent(s2.userId)), o2 = new ae({ auto_accept: i2 });
              r2.put(a2, o2, n2);
            }
          }));
        } }, { key: "blockUser", value: function(t2, n2) {
          var r2 = this, i2 = t2.blockedUserId;
          this.sb.ConnectionManager.ready((function(t3, s2) {
            if (t3) n2(t3, null);
            else {
              var a2 = e2.Path.USERS_USERID_BLOCK.replace("%s", encodeURIComponent(s2.userId)), o2 = new ae({ target_id: i2 });
              r2.post(a2, o2, n2);
            }
          }));
        } }, { key: "unblockUser", value: function(t2, n2) {
          var r2 = this, i2 = t2.unblockedUserId;
          this.sb.ConnectionManager.ready((function(t3, s2) {
            if (t3) n2(t3, null);
            else {
              var a2 = e2.Path.USERS_USERID_BLOCK_TARGETID.replace("%s", encodeURIComponent(s2.userId)).replace("%s", encodeURIComponent(i2));
              r2.delete(a2, null, n2);
            }
          }));
        } }, { key: "getPushTriggerOption", value: function(t2, n2) {
          var r2 = this;
          this.sb.ConnectionManager.ready((function(t3, i2) {
            if (t3) n2(t3, null);
            else {
              var s2 = e2.Path.USERS_USERID_PUSHPREFERENCE.replace("%s", encodeURIComponent(i2.userId));
              r2.get(s2, null, n2);
            }
          }));
        } }, { key: "setPushTriggerOption", value: function(t2, n2) {
          var r2 = this, i2 = t2.pushTriggerOption;
          this.sb.ConnectionManager.ready((function(t3, s2) {
            if (t3) n2(t3, null);
            else {
              var a2 = e2.Path.USERS_USERID_PUSHPREFERENCE.replace("%s", encodeURIComponent(s2.userId)), o2 = new ae({ push_trigger_option: i2 });
              r2.put(a2, o2, n2);
            }
          }));
        } }, { key: "getPushTokens", value: function(t2, n2) {
          var r2 = this, i2 = t2.ts, s2 = t2.token, a2 = t2.type;
          this.sb.ConnectionManager.ready((function(t3, o2) {
            if (t3) n2(t3, null);
            else {
              var l2 = e2.Path.USERS_USERID_PUSH_DEVICE_TOKENS.replace("%s", encodeURIComponent(o2.userId)).replace("%s", encodeURIComponent(a2)), u2 = new ae();
              s2 && u2.add("token", s2), i2 && u2.add("created_ts", i2), r2.get(l2, u2, n2);
            }
          }));
        } }, { key: "getPushTemplate", value: function(t2, n2) {
          var r2 = this;
          this.sb.ConnectionManager.ready((function(t3, i2) {
            if (t3) n2(t3, null);
            else {
              var s2 = e2.Path.USERS_USERID_PUSH_TEMPLATE.replace("%s", encodeURIComponent(i2.userId));
              r2.get(s2, null, n2);
            }
          }));
        } }, { key: "setPushTemplate", value: function(t2, n2) {
          var r2 = this, i2 = t2.templateName;
          this.sb.ConnectionManager.ready((function(t3, s2) {
            if (t3) n2(t3, null);
            else {
              var a2 = e2.Path.USERS_USERID_PUSH_TEMPLATE.replace("%s", encodeURIComponent(s2.userId)), o2 = new ae({ name: i2 });
              r2.put(a2, o2, n2);
            }
          }));
        } }, { key: "getDoNotDisturb", value: function(t2, n2) {
          var r2 = this;
          this.sb.ConnectionManager.ready((function(t3, i2) {
            if (t3) n2(t3, null);
            else {
              var s2 = e2.Path.USERS_USERID_PUSHPREFERENCE.replace("%s", encodeURIComponent(i2.userId));
              r2.get(s2, null, n2);
            }
          }));
        } }, { key: "setDoNotDisturb", value: function(t2, n2) {
          var r2 = this, i2 = t2.doNotDisturbOn, s2 = t2.startHour, a2 = t2.startMin, o2 = t2.endHour, l2 = t2.endMin, u2 = t2.timezone;
          this.sb.ConnectionManager.ready((function(t3, c2) {
            if (t3) n2(t3, null);
            else {
              var d2 = e2.Path.USERS_USERID_PUSHPREFERENCE.replace("%s", encodeURIComponent(c2.userId)), h2 = new ae({ do_not_disturb: i2, start_hour: s2, start_min: a2, end_hour: o2, end_min: l2, timezone: u2 });
              r2.put(d2, h2, n2);
            }
          }));
        } }, { key: "getSnoozePeriod", value: function(t2, n2) {
          var r2 = this;
          this.sb.ConnectionManager.ready((function(t3, i2) {
            if (t3) n2(t3, null);
            else {
              var s2 = e2.Path.USERS_USERID_PUSHPREFERENCE.replace("%s", encodeURIComponent(i2.userId));
              r2.get(s2, null, n2);
            }
          }));
        } }, { key: "setSnoozePeriod", value: function(t2, n2) {
          var r2 = this, i2 = t2.snoozeOn, s2 = t2.startTs, a2 = t2.endTs;
          this.sb.ConnectionManager.ready((function(t3, o2) {
            if (t3) n2(t3, null);
            else {
              var l2 = e2.Path.USERS_USERID_PUSHPREFERENCE.replace("%s", encodeURIComponent(o2.userId)), u2 = new ae({ snooze_enabled: i2, snooze_start_ts: s2, snooze_end_ts: a2 });
              r2.put(l2, u2, n2);
            }
          }));
        } }, { key: "registerGCMPushToken", value: function(t2, n2) {
          var r2 = this, i2 = t2.token;
          this.sb.ConnectionManager.ready((function(t3, s2) {
            if (t3) n2(t3, null);
            else {
              var a2 = e2.Path.USERS_USERID_PUSH_GCM.replace("%s", encodeURIComponent(s2.userId)), o2 = new ae({ gcm_reg_token: i2, always_push: true });
              r2.post(a2, o2, n2);
            }
          }));
        } }, { key: "unregisterGCMPushToken", value: function(t2, n2) {
          var r2 = this, i2 = t2.token;
          this.sb.ConnectionManager.ready((function(t3, s2) {
            if (t3) n2(t3, null);
            else {
              var a2 = e2.Path.USERS_USERID_PUSH_GCM_TOKEN.replace("%s", encodeURIComponent(s2.userId)).replace("%s", encodeURIComponent(i2));
              r2.delete(a2, null, n2);
            }
          }));
        } }, { key: "unregisterAllGCMPushTokens", value: function(t2, n2) {
          var r2 = this;
          this.sb.ConnectionManager.ready((function(t3, i2) {
            if (t3) n2(t3, null);
            else {
              var s2 = e2.Path.USERS_USERID_PUSH_GCM.replace("%s", encodeURIComponent(i2.userId));
              r2.delete(s2, null, n2);
            }
          }));
        } }, { key: "registerAPNSPushToken", value: function(t2, n2) {
          var r2 = this, i2 = t2.token;
          this.sb.ConnectionManager.ready((function(t3, s2) {
            if (t3) n2(t3, null);
            else {
              var a2 = e2.Path.USERS_USERID_PUSH_APNS.replace("%s", encodeURIComponent(s2.userId)), o2 = new ae({ apns_device_token: i2, always_push: true });
              r2.post(a2, o2, n2);
            }
          }));
        } }, { key: "unregisterAPNSPushToken", value: function(t2, n2) {
          var r2 = this, i2 = t2.token;
          this.sb.ConnectionManager.ready((function(t3, s2) {
            if (t3) n2(t3, null);
            else {
              var a2 = e2.Path.USERS_USERID_PUSH_APNS_TOKEN.replace("%s", encodeURIComponent(s2.userId)).replace("%s", encodeURIComponent(i2));
              r2.delete(a2, null, n2);
            }
          }));
        } }, { key: "unregisterAllAPNSPushTokens", value: function(t2, n2) {
          var r2 = this;
          this.sb.ConnectionManager.ready((function(t3, i2) {
            if (t3) n2(t3, null);
            else {
              var s2 = e2.Path.USERS_USERID_PUSH_APNS.replace("%s", encodeURIComponent(i2.userId));
              r2.delete(s2, null, n2);
            }
          }));
        } }, { key: "unregisterAllPushTokens", value: function(t2, n2) {
          var r2 = this;
          this.sb.ConnectionManager.ready((function(t3, i2) {
            if (t3) n2(t3, null);
            else {
              var s2 = e2.Path.USERS_USERID_PUSH.replace("%s", encodeURIComponent(i2.userId));
              r2.delete(s2, null, n2);
            }
          }));
        } }, { key: "loadFriendList", value: function(t2, n2) {
          var r2 = this, i2 = t2.token, s2 = t2.limit;
          this.sb.ConnectionManager.ready((function(t3, a2) {
            if (t3) n2(t3, null);
            else {
              var o2 = e2.Path.FRIENDS.replace("%s", encodeURIComponent(a2.userId)), l2 = new ae({ limit: s2, token: i2 });
              r2.get(o2, l2, n2);
            }
          }));
        } }, { key: "getFriendChangeLogsByToken", value: function(t2, n2) {
          var r2 = this, i2 = t2.token;
          this.sb.ConnectionManager.ready((function(t3, s2) {
            if (t3) n2(t3, null);
            else {
              var a2 = e2.Path.FRIENDS_CHANGE_LOGS.replace("%s", encodeURIComponent(s2.userId)), o2 = new ae();
              i2 && o2.add("token", i2), r2.get(a2, o2, n2);
            }
          }));
        } }, { key: "addFriends", value: function(t2, n2) {
          var r2 = this, i2 = t2.userIds;
          this.sb.ConnectionManager.ready((function(t3, s2) {
            if (t3) n2(t3, null);
            else {
              var a2 = e2.Path.FRIENDS.replace("%s", encodeURIComponent(s2.userId)), o2 = new ae({ user_ids: i2 });
              r2.post(a2, o2, n2);
            }
          }));
        } }, { key: "deleteFriends", value: function(t2, n2) {
          var r2 = this, i2 = t2.userIds;
          this.sb.ConnectionManager.ready((function(t3, s2) {
            if (t3) n2(t3, null);
            else {
              var a2 = e2.Path.FRIENDS.replace("%s", encodeURIComponent(s2.userId)), o2 = new ae({ user_ids: i2 });
              r2.delete(a2, o2, n2);
            }
          }));
        } }, { key: "uploadFriendDiscoveries", value: function(t2, n2) {
          var r2 = this, i2 = t2.discoveries;
          this.sb.ConnectionManager.ready((function(t3, s2) {
            if (t3) n2(t3, null);
            else {
              var a2 = e2.Path.FRIENDS_DISCOVERIES.replace("%s", encodeURIComponent(s2.userId)), o2 = [];
              i2.forEach((function(e3) {
                o2.push({ friend_discovery_key: e3.friendDiscoveryKey, friend_name: "string" == typeof e3.friendName || e3.friendName ? e3.friendName : null });
              }));
              var l2 = new ae({ friend_discoveries: o2 });
              r2.put(a2, l2, n2);
            }
          }));
        } }, { key: "deleteFriendDiscoveries", value: function(t2, n2) {
          var r2 = this, i2 = t2.discoveryKeys;
          this.sb.ConnectionManager.ready((function(t3, s2) {
            if (t3) n2(t3, null);
            else {
              var a2 = e2.Path.FRIENDS_DISCOVERIES.replace("%s", encodeURIComponent(s2.userId)), o2 = new ae({ friend_discovery_keys: i2 });
              r2.delete(a2, o2, n2);
            }
          }));
        } }, { key: "loadUserList", value: function(t2, n2) {
          var r2 = this, i2 = t2.token, s2 = t2.limit, a2 = t2.userIdsFilter, o2 = t2.metaDataKeyFilter, l2 = t2.metaDataValuesFilter, u2 = t2.nicknameStartsWithFilter;
          this.sb.ConnectionManager.ready((function(t3, c2) {
            if (t3) n2(t3, null);
            else {
              var d2 = e2.Path.USERS, h2 = new ae({ token: i2, limit: s2 });
              a2 && a2.length > 0 && h2.add("user_ids", a2), o2 && l2 && l2.length > 0 && (h2.add("metadatakey", o2), h2.add("metadatavalues_in", l2)), u2 && h2.add("nickname_startswith", u2), r2.get(d2, h2, n2);
            }
          }));
        } }, { key: "loadBlockedUserList", value: function(t2, n2) {
          var r2 = this, i2 = t2.token, s2 = t2.limit, a2 = t2.userIdsFilter;
          this.sb.ConnectionManager.ready((function(t3, o2) {
            if (t3) n2(t3, null);
            else {
              var l2 = e2.Path.USERS_USERID_BLOCK.replace("%s", encodeURIComponent(o2.userId)), u2 = new ae({ token: i2, limit: s2 });
              a2 && a2.length > 0 && u2.add("user_ids", a2), r2.get(l2, u2, n2);
            }
          }));
        } }, { key: "createUserMetaData", value: function(t2, n2) {
          var r2 = this, i2 = t2.metaData;
          this.sb.ConnectionManager.ready((function(t3, s2) {
            if (t3) n2(t3, null);
            else {
              var a2 = e2.Path.USERS_USERID_METADATA.replace("%s", encodeURIComponent(s2.userId)), o2 = new ae({ metadata: i2 });
              r2.post(a2, o2, n2);
            }
          }));
        } }, { key: "updateUserMetaData", value: function(t2, n2) {
          var r2 = this, i2 = t2.metaData, s2 = t2.upsert;
          this.sb.ConnectionManager.ready((function(t3, a2) {
            if (t3) n2(t3, null);
            else {
              var o2 = e2.Path.USERS_USERID_METADATA.replace("%s", encodeURIComponent(a2.userId)), l2 = new ae({ metadata: i2, upsert: s2 });
              r2.put(o2, l2, n2);
            }
          }));
        } }, { key: "deleteUserMetaData", value: function(t2, n2) {
          var r2 = this, i2 = t2.metaDataKey;
          this.sb.ConnectionManager.ready((function(t3, s2) {
            if (t3) n2(t3, null);
            else {
              var a2 = e2.Path.USERS_USERID_METADATA_KEY.replace("%s", encodeURIComponent(s2.userId)).replace("%s", encodeURIComponent(i2));
              r2.delete(a2, null, n2);
            }
          }));
        } }, { key: "deleteAllUserMetaData", value: function(t2, n2) {
          var r2 = this;
          this.sb.ConnectionManager.ready((function(t3, i2) {
            if (t3) n2(t3, null);
            else {
              var s2 = e2.Path.USERS_USERID_METADATA.replace("%s", encodeURIComponent(i2.userId));
              r2.delete(s2, null, n2);
            }
          }));
        } }, { key: "getMessageChangeLogs", value: function(t2, n2) {
          var r2 = this;
          return oe(this.sb._iid, (function(n3) {
            var i2 = t2.channelUrl, s2 = t2.ts, a2 = t2.timestamp, o2 = t2.token, l2 = t2.isOpenChannel, u2 = t2.includeMetaArray, c2 = t2.includeReaction, d2 = t2.includeReactions, h2 = t2.includeReplies, p2 = t2.includeParentMessageText, f2 = t2.includeThreadInfo, _2 = t2.replyType, g2 = t2.includeParentMessageInfo;
            r2.sb.ConnectionManager.ready((function(t3, y2) {
              if (t3) n3(t3, null);
              else {
                var m2 = l2 ? e2.Path.OPENCHANNELS_CHANNELURL_MESSAGES_CHANGELOGS.replace("%s", encodeURIComponent(i2)) : e2.Path.GROUPCHANNELS_CHANNELURL_MESSAGES_CHANGELOGS.replace("%s", encodeURIComponent(i2)), E2 = new ae();
                o2 && E2.add("token", o2), s2 && E2.add("change_ts", s2), a2 && E2.add("change_ts", a2), "boolean" == typeof u2 && E2.add("with_sorted_meta_array", u2), "boolean" == typeof d2 ? E2.add("include_reactions", d2) : E2.add("include_reactions", "boolean" == typeof c2 && c2), "boolean" == typeof f2 && E2.add("include_thread_info", f2), "string" == typeof _2 ? E2.add("include_reply_type", _2) : E2.add("include_reply_type", "boolean" == typeof h2 && h2 ? r2.cls.BaseMessage.ReplyType.ALL : r2.cls.BaseMessage.ReplyType.NONE), "boolean" == typeof g2 ? E2.add("include_parent_message_info", g2) : E2.add("include_parent_message_info", "boolean" == typeof p2 && p2), r2.get(m2, E2, n3);
              }
            }));
          }), n2);
        } }, { key: "getMyMutedInfo", value: function(t2, n2) {
          var r2 = this, i2 = t2.channelUrl, s2 = t2.userId, a2 = t2.isGroupChannel;
          this.sb.ConnectionManager.ready((function(t3, o2) {
            if (t3) n2(t3, null);
            else {
              var l2 = a2 ? e2.Path.GROUPCHANNELS_CHANNELURL_MUTE_USERID.replace("%s", encodeURIComponent(i2)).replace("%s", encodeURIComponent(s2)) : e2.Path.OPENCHANNELS_CHANNELURL_MUTE_USERID.replace("%s", encodeURIComponent(i2)).replace("%s", encodeURIComponent(s2));
              r2.get(l2, null, n2);
            }
          }));
        } }, { key: "loadBannedUserList", value: function(t2, n2) {
          var r2 = this, i2 = t2.token, s2 = t2.limit, a2 = t2.channelUrl, o2 = t2.isOpenChannel;
          this.sb.ConnectionManager.ready((function(t3, l2) {
            if (t3) n2(t3, null);
            else {
              var u2 = o2 ? e2.Path.OPENCHANNELS_CHANNELURL_BAN.replace("%s", encodeURIComponent(a2)) : e2.Path.GROUPCHANNELS_CHANNELURL_BAN.replace("%s", encodeURIComponent(a2)), c2 = new ae({ token: i2, limit: s2 });
              r2.get(u2, c2, n2);
            }
          }));
        } }, { key: "loadMutedUserList", value: function(t2, n2) {
          var r2 = this, i2 = t2.token, s2 = t2.limit, a2 = t2.channelUrl, o2 = t2.isOpenChannel;
          this.sb.ConnectionManager.ready((function(t3, l2) {
            if (t3) n2(t3, null);
            else {
              var u2 = o2 ? e2.Path.OPENCHANNELS_CHANNELURL_MUTE.replace("%s", encodeURIComponent(a2)) : e2.Path.GROUPCHANNELS_CHANNELURL_MUTE.replace("%s", encodeURIComponent(a2)), c2 = new ae({ token: i2, limit: s2 });
              r2.get(u2, c2, n2);
            }
          }));
        } }, { key: "getMessageList", value: function(t2, n2) {
          var r2 = this;
          return oe(this.sb._iid, (function(n3) {
            var i2 = t2.channel, s2 = t2.token, a2 = t2.tokenType, o2 = t2.isInclusive, l2 = t2.prevResultSize, u2 = void 0 === l2 ? 0 : l2, c2 = t2.nextResultSize, d2 = void 0 === c2 ? 0 : c2, h2 = t2.shouldReverse, p2 = t2.messageType, f2 = t2.customType, _2 = t2.customTypes, g2 = t2.senderUserIds, y2 = t2.includeMetaArray, m2 = t2.includeReaction, E2 = t2.includeReactions, v2 = t2.includeReplies, b2 = t2.includeParentMessageText, C2 = t2.includeThreadInfo, A2 = t2.replyType, N2 = t2.includeParentMessageInfo, S2 = t2.showSubchannelMessagesOnly, I2 = t2.rootMessageId, T2 = t2.parentMessageId;
            r2.sb.ConnectionManager.ready((function(t3, l3) {
              if (t3) n3(t3, null);
              else {
                var c3 = i2.isOpenChannel() ? e2.Path.OPENCHANNELS_CHANNELURL_MESSAGES.replace("%s", i2.url) : e2.Path.GROUPCHANNELS_CHANNELURL_MESSAGES.replace("%s", i2.url), U2 = new ae({ is_sdk: String(true), prev_limit: String(u2), next_limit: String(d2), include: String(o2), reverse: String(h2) });
                "timestamp" === a2 ? U2.add("message_ts", s2) : "messageId" === a2 && U2.add("message_id", String(s2)), p2 && U2.add("message_type", String(p2)), Array.isArray(_2) && (0 === _2.length && ("string" == typeof f2 ? _2.push(f2) : _2.push("*")), U2.add("custom_types", _2)), Array.isArray(g2) && g2.length > 0 && U2.add("sender_ids", g2), "boolean" == typeof y2 && U2.add("with_sorted_meta_array", y2), "boolean" == typeof E2 ? U2.add("include_reactions", E2) : U2.add("include_reactions", "boolean" == typeof m2 && m2), "boolean" == typeof C2 && U2.add("include_thread_info", C2), "string" == typeof A2 ? U2.add("include_reply_type", A2) : U2.add("include_reply_type", "boolean" == typeof v2 && v2 ? r2.cls.BaseMessage.ReplyType.ALL : r2.cls.BaseMessage.ReplyType.NONE), "boolean" == typeof N2 ? U2.add("include_parent_message_info", N2) : U2.add("include_parent_message_info", "boolean" == typeof b2 && b2), "boolean" == typeof S2 && i2.isOpenChannel() && U2.add("show_subchannel_messages_only", S2), I2 && U2.add("root_message_id", I2), T2 && U2.add("parent_message_id", T2), r2.get(c3, U2, n3);
              }
            }));
          }), n2);
        } }, { key: "checkMessageHugeGap", value: function(t2, n2) {
          var r2 = this;
          return oe(this.sb._iid, (function(n3) {
            var i2 = t2.channelUrl;
            t2.channelType;
            var s2 = t2.messageType, a2 = void 0 === s2 ? "" : s2, o2 = t2.customTypes, l2 = void 0 === o2 ? ["*"] : o2, u2 = t2.senderUserIds, c2 = void 0 === u2 ? [] : u2, d2 = t2.includeReactions, h2 = void 0 === d2 || d2, p2 = t2.includeMetaArray, f2 = void 0 !== p2 && p2, _2 = t2.showSubchannelMessagesOnly, g2 = void 0 !== _2 && _2, y2 = t2.threshold, m2 = t2.previous, E2 = t2.next, v2 = "".concat(e2.Path.GROUPCHANNELS_CHANNELURL_MESSAGES_GAP.replace("%s", encodeURIComponent(i2))), b2 = new ae({ huge_gap_threshold: y2, prev_start_ts: m2.from, prev_end_ts: m2.to, prev_cache_count: m2.cachedCount, next_start_ts: E2.from, next_end_ts: E2.to, next_cache_count: E2.cachedCount, reverse: true, custom_types: l2, message_type: a2, include_reactions: h2, with_sorted_meta_array: f2, show_subchannel_messages_only: g2 });
            Array.isArray(c2) && c2.length > 0 && b2.add("sender_ids", c2), r2.get(v2, b2, n3);
          }), n2);
        } }, { key: "translateUserMessage", value: function(t2, n2) {
          var r2 = this, i2 = t2.channelUrl, s2 = t2.isOpenChannel, a2 = t2.messageId, o2 = t2.translationTargetLanguages;
          this.sb.ConnectionManager.ready((function(t3, l2) {
            if (t3) n2(t3, null);
            else {
              var u2 = s2 ? e2.Path.OPENCHANNELS_CHANNELURL_MESSAGES_MESSAGEID_TRANSLATION.replace("%s", encodeURIComponent(i2)).replace("%s", a2) : e2.Path.GROUPCHANNELS_CHANNELURL_MESSAGES_MESSAGEID_TRANSLATION.replace("%s", encodeURIComponent(i2)).replace("%s", a2), c2 = new ae({ target_langs: o2 });
              r2.post(u2, c2, n2);
            }
          }));
        } }, { key: "getMessage", value: function(t2, n2) {
          var r2 = this, i2 = t2.channel, s2 = t2.messageId, a2 = t2.includeMetaArray, o2 = t2.includeReactions, l2 = t2.includeParentMessageText, u2 = t2.includeThreadInfo, c2 = t2.includeParentMessageInfo;
          this.sb.ConnectionManager.ready((function(t3, d2) {
            if (t3) n2(t3, null);
            else {
              var h2 = i2.isOpenChannel() ? e2.Path.OPENCHANNELS_CHANNELURL_MESSAGES_MESSAGEID.replace("%s", encodeURIComponent(i2.url)).replace("%s", encodeURIComponent(s2)) : e2.Path.GROUPCHANNELS_CHANNELURL_MESSAGES_MESSAGEID.replace("%s", encodeURIComponent(i2.url)).replace("%s", encodeURIComponent(s2)), p2 = new ae({ is_sdk: String(true) });
              "boolean" == typeof a2 && p2.add("with_sorted_meta_array", a2), "boolean" == typeof o2 && p2.add("include_reactions", o2), "boolean" == typeof u2 && p2.add("include_thread_info", u2), "boolean" == typeof c2 ? p2.add("include_parent_message_info", c2) : p2.add("include_parent_message_info", "boolean" == typeof l2 && l2), r2.get(h2, p2, n2);
            }
          }));
        } }, { key: "deleteMessage", value: function(t2, n2) {
          var r2 = this, i2 = t2.channelUrl, s2 = t2.isOpenChannel, a2 = t2.messageId;
          this.sb.ConnectionManager.ready((function(t3, o2) {
            if (t3) n2(t3, null);
            else {
              var l2 = s2 ? e2.Path.OPENCHANNELS_CHANNELURL_MESSAGES_MESSAGEID.replace("%s", encodeURIComponent(i2)).replace("%s", encodeURIComponent(a2)) : e2.Path.GROUPCHANNELS_CHANNELURL_MESSAGES_MESSAGEID.replace("%s", encodeURIComponent(i2)).replace("%s", encodeURIComponent(a2));
              r2.delete(l2, null, n2);
            }
          }));
        } }, { key: "muteUser", value: function(t2, n2) {
          var r2 = this, i2 = t2.channelUrl, s2 = t2.userId, a2 = t2.description, o2 = t2.seconds, l2 = t2.isGroupChannel;
          this.sb.ConnectionManager.ready((function(t3, u2) {
            if (t3) n2(t3, null);
            else {
              var c2 = l2 ? e2.Path.GROUPCHANNELS_CHANNELURL_MUTE.replace("%s", encodeURIComponent(i2)) : e2.Path.OPENCHANNELS_CHANNELURL_MUTE.replace("%s", encodeURIComponent(i2)), d2 = new ae({ user_id: s2 });
              o2 && (o2 > 0 || -1 !== o2) && d2.add("seconds", o2), a2 && d2.add("description", a2), r2.post(c2, d2, n2);
            }
          }));
        } }, { key: "unmuteUser", value: function(t2, n2) {
          var r2 = this, i2 = t2.channelUrl, s2 = t2.userId, a2 = t2.isGroupChannel;
          this.sb.ConnectionManager.ready((function(t3, o2) {
            if (t3) n2(t3, null);
            else {
              var l2 = a2 ? e2.Path.GROUPCHANNELS_CHANNELURL_MUTE_USERID.replace("%s", encodeURIComponent(i2)).replace("%s", encodeURIComponent(s2)) : e2.Path.OPENCHANNELS_CHANNELURL_MUTE_USERID.replace("%s", encodeURIComponent(i2)).replace("%s", encodeURIComponent(s2));
              r2.delete(l2, null, n2);
            }
          }));
        } }, { key: "banUser", value: function(t2, n2) {
          var r2 = this, i2 = t2.channelUrl, s2 = t2.userId, a2 = t2.description, o2 = t2.seconds, l2 = t2.isGroupChannel;
          this.sb.ConnectionManager.ready((function(t3, u2) {
            if (t3) n2(t3, null);
            else {
              var c2 = l2 ? e2.Path.GROUPCHANNELS_CHANNELURL_BAN.replace("%s", encodeURIComponent(i2)) : e2.Path.OPENCHANNELS_CHANNELURL_BAN.replace("%s", encodeURIComponent(i2)), d2 = new ae({ user_id: s2 });
              a2 && d2.add("description", a2), d2.add("seconds", String(o2)), r2.post(c2, d2, n2);
            }
          }));
        } }, { key: "unbanUser", value: function(t2, n2) {
          var r2 = this, i2 = t2.channelUrl, s2 = t2.userId, a2 = t2.isGroupChannel;
          this.sb.ConnectionManager.ready((function(t3, o2) {
            if (t3) n2(t3, null);
            else {
              var l2 = a2 ? e2.Path.GROUPCHANNELS_CHANNELURL_BAN_USERID.replace("%s", encodeURIComponent(i2)).replace("%s", encodeURIComponent(s2)) : e2.Path.OPENCHANNELS_CHANNELURL_BAN_USERID.replace("%s", encodeURIComponent(i2)).replace("%s", encodeURIComponent(s2));
              r2.delete(l2, null, n2);
            }
          }));
        } }, { key: "getMetaCounters", value: function(t2, n2) {
          var r2 = this, i2 = t2.channelUrl, s2 = t2.isOpenChannel, a2 = t2.keys;
          this.sb.ConnectionManager.ready((function(t3, o2) {
            if (t3) n2(t3, null);
            else {
              var l2 = s2 ? e2.Path.OPENCHANNELS_CHANNELURL_METACOUNTER.replace("%s", encodeURIComponent(i2)) : e2.Path.GROUPCHANNELS_CHANNELURL_METACOUNTER.replace("%s", encodeURIComponent(i2)), u2 = new ae({ keys: a2 });
              r2.get(l2, u2, n2);
            }
          }));
        } }, { key: "createMetaCounters", value: function(t2, n2) {
          var r2 = this, i2 = t2.channelUrl, s2 = t2.isOpenChannel, a2 = t2.metaCounter;
          this.sb.ConnectionManager.ready((function(t3, o2) {
            if (t3) n2(t3, null);
            else {
              var l2 = s2 ? e2.Path.OPENCHANNELS_CHANNELURL_METACOUNTER.replace("%s", encodeURIComponent(i2)) : e2.Path.GROUPCHANNELS_CHANNELURL_METACOUNTER.replace("%s", encodeURIComponent(i2)), u2 = new ae({ metacounter: a2 });
              r2.post(l2, u2, n2);
            }
          }));
        } }, { key: "updateMetaCounters", value: function(t2, n2) {
          var r2 = this, i2 = t2.channelUrl, s2 = t2.isOpenChannel, a2 = t2.metaCounter, o2 = t2.upsert, l2 = t2.mode;
          this.sb.ConnectionManager.ready((function(t3, u2) {
            if (t3) n2(t3, null);
            else {
              var c2 = s2 ? e2.Path.OPENCHANNELS_CHANNELURL_METACOUNTER.replace("%s", encodeURIComponent(i2)) : e2.Path.GROUPCHANNELS_CHANNELURL_METACOUNTER.replace("%s", encodeURIComponent(i2)), d2 = new ae({ metacounter: a2, upsert: o2, mode: l2 });
              r2.put(c2, d2, n2);
            }
          }));
        } }, { key: "deleteMetaCounter", value: function(t2, n2) {
          var r2 = this, i2 = t2.channelUrl, s2 = t2.isOpenChannel, a2 = t2.key;
          this.sb.ConnectionManager.ready((function(t3, o2) {
            if (t3) n2(t3, null);
            else {
              var l2 = s2 ? e2.Path.OPENCHANNELS_CHANNELURL_METACOUNTER_KEY.replace("%s", encodeURIComponent(i2)).replace("%s", a2) : e2.Path.GROUPCHANNELS_CHANNELURL_METACOUNTER_KEY.replace("%s", encodeURIComponent(i2)).replace("%s", a2);
              r2.delete(l2, null, n2);
            }
          }));
        } }, { key: "deleteAllMetaCounters", value: function(t2, n2) {
          var r2 = this, i2 = t2.channelUrl, s2 = t2.isOpenChannel;
          this.sb.ConnectionManager.ready((function(t3, a2) {
            if (t3) n2(t3, null);
            else {
              var o2 = s2 ? e2.Path.OPENCHANNELS_CHANNELURL_METACOUNTER.replace("%s", encodeURIComponent(i2)) : e2.Path.GROUPCHANNELS_CHANNELURL_METACOUNTER.replace("%s", encodeURIComponent(i2));
              r2.delete(o2, null, n2);
            }
          }));
        } }, { key: "getMetaData", value: function(t2, n2) {
          var r2 = this, i2 = t2.channelUrl, s2 = t2.isOpenChannel, a2 = t2.keys;
          this.sb.ConnectionManager.ready((function(t3, o2) {
            if (t3) n2(t3, null);
            else {
              var l2 = s2 ? e2.Path.OPENCHANNELS_CHANNELURL_METADATA.replace("%s", encodeURIComponent(i2)) : e2.Path.GROUPCHANNELS_CHANNELURL_METADATA.replace("%s", encodeURIComponent(i2)), u2 = new ae({ keys: a2, include_ts: true });
              r2.get(l2, u2, n2);
            }
          }));
        } }, { key: "createMetaData", value: function(t2, n2) {
          var r2 = this, i2 = t2.channelUrl, s2 = t2.isOpenChannel, a2 = t2.metaData;
          this.sb.ConnectionManager.ready((function(t3, o2) {
            if (t3) n2(t3, null);
            else {
              var l2 = s2 ? e2.Path.OPENCHANNELS_CHANNELURL_METADATA.replace("%s", encodeURIComponent(i2)) : e2.Path.GROUPCHANNELS_CHANNELURL_METADATA.replace("%s", encodeURIComponent(i2)), u2 = new ae({ metadata: a2, include_ts: true });
              r2.post(l2, u2, n2);
            }
          }));
        } }, { key: "updateMetaData", value: function(t2, n2) {
          var r2 = this, i2 = t2.channelUrl, s2 = t2.isOpenChannel, a2 = t2.metaData, o2 = t2.upsert;
          this.sb.ConnectionManager.ready((function(t3, l2) {
            if (t3) n2(t3, null);
            else {
              var u2 = s2 ? e2.Path.OPENCHANNELS_CHANNELURL_METADATA.replace("%s", encodeURIComponent(i2)) : e2.Path.GROUPCHANNELS_CHANNELURL_METADATA.replace("%s", encodeURIComponent(i2)), c2 = new ae({ metadata: a2, upsert: o2, include_ts: true });
              r2.put(u2, c2, n2);
            }
          }));
        } }, { key: "deleteMetaData", value: function(t2, n2) {
          var r2 = this, i2 = t2.channelUrl, s2 = t2.isOpenChannel, a2 = t2.key;
          this.sb.ConnectionManager.ready((function(t3, o2) {
            if (t3) n2(t3, null);
            else {
              var l2 = s2 ? e2.Path.OPENCHANNELS_CHANNELURL_METADATA_KEY.replace("%s", encodeURIComponent(i2)).replace("%s", a2) : e2.Path.GROUPCHANNELS_CHANNELURL_METADATA_KEY.replace("%s", encodeURIComponent(i2)).replace("%s", a2), u2 = new ae({ include_ts: true });
              r2.delete(l2, u2, n2);
            }
          }));
        } }, { key: "deleteAllMetaData", value: function(t2, n2) {
          var r2 = this, i2 = t2.channelUrl, s2 = t2.isOpenChannel;
          this.sb.ConnectionManager.ready((function(t3, a2) {
            if (t3) n2(t3, null);
            else {
              var o2 = s2 ? e2.Path.OPENCHANNELS_CHANNELURL_METADATA.replace("%s", encodeURIComponent(i2)) : e2.Path.GROUPCHANNELS_CHANNELURL_METADATA.replace("%s", encodeURIComponent(i2)), l2 = new ae({ include_ts: true });
              r2.delete(o2, l2, n2);
            }
          }));
        } }, { key: "loadOperatorList", value: function(t2, n2) {
          var r2 = this, i2 = t2.channelUrl, s2 = t2.isOpenChannel, a2 = t2.token, o2 = t2.limit;
          this.sb.ConnectionManager.ready((function(t3, l2) {
            if (t3) n2(t3, null);
            else {
              var u2 = s2 ? e2.Path.OPENCHANNELS_OPERATORS.replace("%s", encodeURIComponent(i2)) : e2.Path.GROUPCHANNELS_OPERATORS.replace("%s", encodeURIComponent(i2)), c2 = new ae({ token: a2, limit: o2 });
              r2.get(u2, c2, n2);
            }
          }));
        } }, { key: "getOpenChannel", value: function(t2, n2) {
          var r2 = this, i2 = t2.channelUrl, s2 = t2.internalCall;
          this.sb.ConnectionManager.ready((function(t3, a2) {
            if (t3) n2(t3, null);
            else {
              var o2 = e2.Path.OPENCHANNELS_CHANNELURL.replace("%s", encodeURIComponent(i2)), l2 = new ae({});
              l2.internal = s2 === T.INTERNAL_CALL, r2.get(o2, l2, n2);
            }
          }));
        } }, { key: "loadOpenChannelList", value: function(t2, n2) {
          var r2 = this, i2 = t2.token, s2 = t2.limit, a2 = t2.nameKeyword, o2 = t2.urlKeyword, l2 = t2.customTypes, u2 = t2.includeFrozen, c2 = t2.includeMetaData;
          this.sb.ConnectionManager.ready((function(t3, d2) {
            if (t3) n2(t3, null);
            else {
              var h2 = e2.Path.OPENCHANNELS, p2 = new ae({ token: i2, limit: s2 });
              a2 && p2.add("name_contains", a2), o2 && p2.add("url_contains", o2), l2 && l2.length > 0 && p2.add("custom_types", l2), "boolean" == typeof u2 && p2.add("show_frozen", u2), "boolean" == typeof c2 && p2.add("show_metadata", c2), r2.get(h2, p2, n2);
            }
          }));
        } }, { key: "loadParticipantList", value: function(t2, n2) {
          var r2 = this, i2 = t2.token, s2 = t2.limit, a2 = t2.channelUrl;
          this.sb.ConnectionManager.ready((function(t3, o2) {
            if (t3) n2(t3, null);
            else {
              var l2 = e2.Path.OPENCHANNELS_CHANNELURL_PARTICIPANTS.replace("%s", encodeURIComponent(a2)), u2 = new ae({ token: i2, limit: s2 });
              r2.get(l2, u2, n2);
            }
          }));
        } }, { key: "createOpenChannel", value: function(t2, n2) {
          var r2 = this, i2 = t2.name, s2 = t2.coverUrlOrImage, a2 = t2.data, o2 = t2.operatorUserIds, l2 = t2.customType, u2 = t2.channelUrl;
          this.sb.ConnectionManager.ready((function(t3, c2) {
            if (t3) n2(t3, null);
            else {
              var d2 = e2.Path.OPENCHANNELS, h2 = new ae();
              "string" == typeof s2 && h2.add("cover_url", s2), se.isFile(s2) && h2.add("cover_file", s2), null !== u2 && "string" == typeof u2 && h2.add("channel_url", u2), null !== i2 && "string" == typeof i2 && h2.add("name", i2), a2 && h2.add("data", a2), o2 && (Array.isArray(o2) ? h2.add("operators", o2) : h2.add("operators", [o2])), l2 && h2.add("custom_type", l2), r2.post(d2, h2, n2);
            }
          }));
        } }, { key: "updateOpenChannel", value: function(t2, n2) {
          var r2 = this, i2 = t2.channelUrl, s2 = t2.name, a2 = t2.coverUrlOrImage, o2 = t2.data, l2 = t2.operatorUserIds, u2 = t2.customType;
          this.sb.ConnectionManager.ready((function(t3, c2) {
            if (t3) n2(t3, null);
            else {
              var d2 = e2.Path.OPENCHANNELS_CHANNELURL.replace("%s", encodeURIComponent(i2)), h2 = new ae();
              "string" == typeof a2 && h2.add("cover_url", a2), se.isFile(a2) && h2.add("cover_file", a2, a2.name), null !== s2 && "string" == typeof s2 && h2.add("name", s2), null !== o2 && "string" == typeof o2 && h2.add("data", o2), null !== l2 && (Array.isArray(l2) ? h2.add("operator_ids", l2) : h2.add("operator_ids", [l2])), null !== u2 && "string" == typeof u2 && h2.add("custom_type", u2), r2.put(d2, h2, n2);
            }
          }));
        } }, { key: "deleteOpenChannel", value: function(t2, n2) {
          var r2 = this, i2 = t2.channelUrl;
          this.sb.ConnectionManager.ready((function(t3, s2) {
            if (t3) n2(t3, null);
            else {
              var a2 = e2.Path.OPENCHANNELS_CHANNELURL.replace("%s", encodeURIComponent(i2));
              r2.delete(a2, null, n2);
            }
          }));
        } }, { key: "getGroupChannel", value: function(t2, n2) {
          var r2 = this, i2 = t2.channelUrl, s2 = t2.showMember, a2 = t2.internalCall;
          this.sb.ConnectionManager.ready((function(t3, o2) {
            if (t3) n2(t3, null);
            else {
              var l2 = e2.Path.GROUPCHANNELS_CHANNELURL.replace("%s", encodeURIComponent(i2)), u2 = new ae({ show_member: s2, show_read_receipt: true, show_delivery_receipt: true });
              u2.internal = a2 === T.INTERNAL_CALL, r2.get(l2, u2, n2);
            }
          }));
        } }, { key: "loadGroupChannelList", value: function(t2, n2) {
          var r2 = this, i2 = t2.token, s2 = t2.limit, a2 = t2.includeEmpty, o2 = t2.order, l2 = t2.userIdsFilter, u2 = t2.nicknameContainsFilter, c2 = t2.nicknameStartsWithFilter, d2 = t2.nicknameExactMatchFilter, h2 = t2.channelNameContainsFilter, p2 = t2.channelUrlsFilter, f2 = t2.customTypesFilter, _2 = t2.customTypeStartsWithFilter, g2 = t2.memberStateFilter, y2 = t2.superChannelFilter, m2 = t2.publicChannelFilter, E2 = t2.unreadChannelFilter, v2 = t2.metadataOrderKeyFilter, b2 = t2.metadataKey, C2 = t2.metadataValues, A2 = t2.metadataValueStartsWith, N2 = t2.hiddenChannelFilter, S2 = t2.searchFilter, I2 = t2.includeFrozen, T2 = t2.includeMetaData;
          return oe(this.sb._iid, (function(t3) {
            r2.sb.ConnectionManager.ready((function(n3, U2) {
              if (n3) t3(n3, null);
              else {
                var O2 = e2.Path.MYGROUPCHANNELS.replace("%s", encodeURIComponent(U2.userId)), M2 = new ae({ token: i2, limit: s2, order: o2, show_member: true, show_read_receipt: true, show_delivery_receipt: true, show_empty: String(a2), member_state_filter: g2 });
                f2 && f2.length > 0 && M2.add("custom_types", f2), u2 && M2.add("members_nickname_contains", u2), c2 && M2.add("members_nickname_startswith", c2), d2 && M2.add("members_nickname", d2), h2 && M2.add("name_contains", h2), S2 && S2.hasOwnProperty("search_query") && S2.hasOwnProperty("search_fields") && (M2.add("search_query", S2.search_query), M2.add("search_fields", S2.search_fields)), l2 && l2.userIds && l2.userIds.length > 0 && (l2.includeMode ? (M2.add("members_include_in", l2.userIds), M2.add("query_type", l2.queryType.toUpperCase())) : M2.add("members_exactly_in", l2.userIds)), p2 && p2.length > 0 && M2.add("channel_urls", p2), M2.add("super_mode", y2), M2.add("public_mode", m2), M2.add("unread_filter", E2), v2 && M2.add("metadata_order_key", v2), b2 && M2.add("metadata_key", b2), C2 && C2.length > 0 && M2.add("metadata_values", C2), A2 && M2.add("metadata_value_startswith", A2), _2 && M2.add("custom_type_startswith", _2), N2 && M2.add("hidden_mode", N2), "boolean" == typeof I2 && M2.add("show_frozen", I2), "boolean" == typeof T2 && M2.add("show_metadata", T2), r2.get(O2, M2, t3);
              }
            }));
          }), n2);
        } }, { key: "loadPublicGroupChannelList", value: function(t2, n2) {
          var r2 = this, i2 = t2.token, s2 = t2.limit, a2 = t2.includeEmpty, o2 = t2.order, l2 = t2.channelNameContainsFilter, u2 = t2.channelUrlsFilter, c2 = t2.customTypesFilter, d2 = t2.customTypeStartsWithFilter, h2 = t2.superChannelFilter, p2 = t2.membershipFilter, f2 = t2.metadataOrderKeyFilter, _2 = t2.metadataKey, g2 = t2.metadataValues, y2 = t2.metadataValueStartsWith, m2 = t2.includeFrozen, E2 = t2.includeMetaData;
          this.sb.ConnectionManager.ready((function(t3, v2) {
            if (t3) n2(t3, null);
            else {
              var b2 = r2.cls.GroupChannel, C2 = e2.Path.GROUPCHANNELS, A2 = new ae({ token: i2, limit: s2, order: o2, show_member: true, show_read_receipt: true, show_delivery_receipt: true, show_empty: String(a2), public_mode: b2.PublicChannelFilter.PUBLIC, public_membership_mode: p2 });
              c2 && c2.length > 0 && A2.add("custom_types", c2), l2 && A2.add("name_contains", l2), u2 && u2.length > 0 && A2.add("channel_urls", u2), A2.add("super_mode", h2), f2 && A2.add("metadata_order_key", f2), _2 && A2.add("metadata_key", _2), g2 && g2.length > 0 && A2.add("metadata_values", g2), y2 && A2.add("metadata_value_startswith", y2), d2 && A2.add("custom_type_startswith", d2), "boolean" == typeof m2 && A2.add("show_frozen", m2), "boolean" == typeof E2 && A2.add("show_metadata", E2), r2.get(C2, A2, n2);
            }
          }));
        } }, { key: "createGroupChannel", value: function(t2, n2) {
          var r2 = this, i2 = t2.isDistinct, s2 = t2.isSuper, a2 = t2.isBroadcast, o2 = t2.isPublic, l2 = t2.channelUrl, u2 = t2.isDiscoverable, c2 = t2.isStrict, d2 = t2.name, h2 = t2.data, p2 = t2.customType, f2 = t2.coverUrl, _2 = t2.coverImage, g2 = t2.accessCode, y2 = t2.isEphemeral, m2 = t2._invitedUserIds, E2 = void 0 === m2 ? [] : m2, v2 = t2.operatorUserIds, b2 = t2.messageSurvivalSeconds;
          this.sb.ConnectionManager.ready((function(t3, m3) {
            if (t3) n2(t3, null);
            else {
              var C2 = e2.Path.GROUPCHANNELS, N2 = new ae({ user_ids: [m3.userId].concat(A(E2)).filter((function(e3, t4, n3) {
                return t4 === n3.indexOf(e3);
              })) });
              null !== f2 && "string" == typeof f2 && N2.add("cover_url", f2), se.isFile(_2) && N2.add("cover_file", _2, _2.name), null !== l2 && N2.add("channel_url", l2), null !== i2 && N2.add("is_distinct", i2), null !== s2 && N2.add("is_super", s2), null !== a2 && N2.add("is_broadcast", a2), null !== o2 && N2.add("is_public", o2), null !== u2 && N2.add("is_discoverable", u2), null !== c2 && N2.add("strict", c2), null !== y2 && N2.add("is_ephemeral", y2), g2 && N2.add("access_code", g2), null !== d2 && "string" == typeof d2 && N2.add("name", d2), h2 && N2.add("data", h2), p2 && N2.add("custom_type", p2), Array.isArray(v2) && v2.length > 0 && N2.add("operator_ids", v2), null !== b2 && b2 > -1 && N2.add("message_survival_seconds", b2), r2.post(C2, N2, n2);
            }
          }));
        } }, { key: "updateGroupChannel", value: function(t2, n2) {
          var r2 = this, i2 = t2.isDistinct, s2 = t2.isPublic, a2 = t2.channelUrl, o2 = t2.isDiscoverable, l2 = t2.name, u2 = t2.data, c2 = t2.customType, d2 = t2.coverUrl, h2 = t2.coverImage, p2 = t2.accessCode, f2 = t2.operatorUserIds, _2 = t2.messageSurvivalSeconds;
          this.sb.ConnectionManager.ready((function(t3, g2) {
            if (t3) n2(t3, null);
            else {
              var y2 = e2.Path.GROUPCHANNELS_CHANNELURL.replace("%s", encodeURIComponent(a2)), m2 = new ae();
              null !== i2 && m2.add("is_distinct", i2), null !== s2 && m2.add("is_public", s2), null !== o2 && m2.add("is_discoverable", o2), null !== p2 && m2.add("access_code", p2), null !== d2 && "string" == typeof d2 && m2.add("cover_url", d2), se.isFile(h2) && m2.add("cover_file", h2, h2.name), null !== l2 && "string" == typeof l2 && m2.add("name", l2), null !== u2 && "string" == typeof u2 && m2.add("data", u2), null !== c2 && "string" == typeof c2 && m2.add("custom_type", c2), null !== f2 && (Array.isArray(f2) ? m2.add("operator_ids", f2) : f2 && m2.add("operator_ids", [f2])), null !== _2 && _2 > -1 && m2.add("message_survival_seconds", _2), r2.put(y2, m2, n2);
            }
          }));
        } }, { key: "addOperators", value: function(t2, n2) {
          var r2 = this, i2 = t2.channelUrl, s2 = t2.isOpenChannel, a2 = void 0 !== s2 && s2, o2 = t2.operatorUserIds;
          this.sb.ConnectionManager.ready((function(t3, s3) {
            if (!t3) {
              var l2 = (a2 ? e2.Path.OPENCHANNELS_CHANNELURL_OPERATORS : e2.Path.GROUPCHANNELS_CHANNELURL_OPERATORS).replace("%s", encodeURIComponent(i2)), u2 = new ae({ operator_ids: o2 });
              r2.post(l2, u2, n2);
            }
          }));
        } }, { key: "removeOperators", value: function(t2, n2) {
          var r2 = this, i2 = t2.channelUrl, s2 = t2.isOpenChannel, a2 = void 0 !== s2 && s2, o2 = t2.operatorUserIds;
          this.sb.ConnectionManager.ready((function(t3, s3) {
            if (!t3) {
              var l2 = (a2 ? e2.Path.OPENCHANNELS_CHANNELURL_OPERATORS : e2.Path.GROUPCHANNELS_CHANNELURL_OPERATORS).replace("%s", encodeURIComponent(i2)), u2 = new ae({ operator_ids: o2 });
              r2.delete(l2, u2, n2);
            }
          }));
        } }, { key: "inviteToGroupChannel", value: function(t2, n2) {
          var r2 = this, i2 = t2.channelUrl, s2 = t2.userIds;
          this.sb.ConnectionManager.ready((function(t3, a2) {
            if (t3) n2(t3, null);
            else {
              var o2 = e2.Path.GROUPCHANNELS_CHANNELURL_INVITE.replace("%s", encodeURIComponent(i2)), l2 = new ae({ user_ids: s2 });
              r2.post(o2, l2, n2);
            }
          }));
        } }, { key: "acceptInvitation", value: function(t2, n2) {
          var r2 = this, i2 = t2.channelUrl, s2 = t2.accessCode;
          this.sb.ConnectionManager.ready((function(t3, a2) {
            if (t3) n2(t3, null);
            else {
              var o2 = e2.Path.GROUPCHANNELS_CHANNELURL_ACCEPT_INVITATION.replace("%s", encodeURIComponent(i2)), l2 = new ae({ user_id: a2.userId });
              s2 && l2.add("access_code", s2), r2.put(o2, l2, n2);
            }
          }));
        } }, { key: "declineInvitation", value: function(t2, n2) {
          var r2 = this, i2 = t2.channelUrl;
          this.sb.ConnectionManager.ready((function(t3, s2) {
            if (t3) n2(t3, null);
            else {
              var a2 = e2.Path.GROUPCHANNELS_CHANNELURL_DECLINE_INVITATION.replace("%s", encodeURIComponent(i2)), o2 = new ae({ user_id: s2.userId });
              r2.put(a2, o2, n2);
            }
          }));
        } }, { key: "joinGroupChannel", value: function(t2, n2) {
          var r2 = this, i2 = t2.channelUrl, s2 = t2.accessCode;
          this.sb.ConnectionManager.ready((function(t3, a2) {
            if (t3) n2(t3, null);
            else {
              var o2 = e2.Path.GROUPCHANNELS_CHANNELURL_JOIN.replace("%s", encodeURIComponent(i2)), l2 = new ae({ user_id: a2.userId });
              s2 && l2.add("access_code", s2), r2.put(o2, l2, n2);
            }
          }));
        } }, { key: "leaveGroupChannel", value: function(t2, n2) {
          var r2 = this, i2 = t2.channelUrl;
          this.sb.ConnectionManager.ready((function(t3, s2) {
            if (t3) n2(t3, null);
            else {
              var a2 = e2.Path.GROUPCHANNELS_CHANNELURL_LEAVE.replace("%s", encodeURIComponent(i2)), o2 = new ae({ user_id: s2.userId });
              r2.put(a2, o2, n2);
            }
          }));
        } }, { key: "hideGroupChannel", value: function(t2, n2) {
          var r2 = this, i2 = t2.channelUrl, s2 = t2.hidePreviousMessages, a2 = t2.allowAutoUnhide;
          this.sb.ConnectionManager.ready((function(t3, o2) {
            if (t3) n2(t3, null);
            else {
              var l2 = e2.Path.GROUPCHANNELS_CHANNELURL_HIDE.replace("%s", encodeURIComponent(i2)), u2 = new ae({ user_id: o2.userId, hide_previous_messages: s2, allow_auto_unhide: a2 });
              r2.put(l2, u2, n2);
            }
          }));
        } }, { key: "unhideGroupChannel", value: function(t2, n2) {
          var r2 = this, i2 = t2.channelUrl;
          this.sb.ConnectionManager.ready((function(t3, s2) {
            if (t3) n2(t3, null);
            else {
              var a2 = e2.Path.GROUPCHANNELS_CHANNELURL_HIDE.replace("%s", encodeURIComponent(i2));
              r2.delete(a2, null, n2);
            }
          }));
        } }, { key: "freeze", value: function(t2, n2) {
          var r2 = this, i2 = t2.channelUrl, s2 = t2.isGroupChannel, a2 = t2.freezing;
          this.sb.ConnectionManager.ready((function(t3, o2) {
            if (t3) n2(t3, null);
            else {
              var l2 = s2 ? e2.Path.GROUPCHANNELS_CHANNELURL_FREEZE.replace("%s", encodeURIComponent(i2)) : e2.Path.OPENCHANNELS_CHANNELURL_FREEZE.replace("%s", encodeURIComponent(i2)), u2 = new ae({ freeze: a2 });
              r2.put(l2, u2, n2);
            }
          }));
        } }, { key: "deleteGroupChannel", value: function(t2, n2) {
          var r2 = this, i2 = t2.channelUrl;
          this.sb.ConnectionManager.ready((function(t3, s2) {
            if (t3) n2(t3, null);
            else {
              var a2 = e2.Path.GROUPCHANNELS_CHANNELURL.replace("%s", encodeURIComponent(i2));
              r2.delete(a2, null, n2);
            }
          }));
        } }, { key: "loadMemberList", value: function(t2, n2) {
          var r2 = this, i2 = t2.channelUrl, s2 = t2.token, a2 = t2.limit, o2 = t2.mutedMemberFilter, l2 = t2.order, u2 = t2.memberStateFilter, c2 = t2.nicknameStartsWithFilter;
          this.sb.ConnectionManager.ready((function(t3, d2) {
            if (t3) n2(t3, null);
            else {
              var h2 = e2.Path.GROUPCHANNELS_MEMBERS.replace("%s", encodeURIComponent(i2)), p2 = new ae({ token: s2, limit: a2, order: l2.toLowerCase(), muted_member_filter: o2.toLowerCase(), member_state_filter: u2, show_member_is_muted: true, show_read_receipt: true, show_delivery_receipt: true });
              c2 && p2.add("nickname_startswith", c2), r2.get(h2, p2, n2);
            }
          }));
        } }, { key: "report", value: function(t2, n2) {
          var r2 = this, i2 = t2.channelUrl, s2 = t2.isOpenChannel, a2 = t2.reportCategory, o2 = t2.reportingUserId, l2 = t2.reportDescription;
          this.sb.ConnectionManager.ready((function(t3, u2) {
            if (t3) n2(t3, null);
            else {
              var c2 = e2.Path.REPORT_CHANNELS.replace("%s", encodeURIComponent(s2 ? "open_channels" : "group_channels")).replace("%s", encodeURIComponent(i2)), d2 = new ae({ report_category: a2 });
              null != o2 && d2.add("reporting_user_id", o2), null != l2 && d2.add("report_description", l2), r2.post(c2, d2, n2);
            }
          }));
        } }, { key: "reportUser", value: function(t2, n2) {
          var r2 = this, i2 = t2.offendingUserId, s2 = t2.channelUrl, a2 = t2.isOpenChannel, o2 = t2.reportCategory, l2 = t2.reportingUserId, u2 = t2.reportDescription;
          this.sb.ConnectionManager.ready((function(t3, c2) {
            if (t3) n2(t3, null);
            else {
              var d2 = e2.Path.REPORT_USERS.replace("%s", encodeURIComponent(i2)), h2 = new ae({ channel_url: s2, channel_type: a2 ? "open_channels" : "group_channels", report_category: o2 });
              null != l2 && h2.add("reporting_user_id", l2), null != u2 && h2.add("report_description", u2), r2.post(d2, h2, n2);
            }
          }));
        } }, { key: "reportMessage", value: function(t2, n2) {
          var r2 = this, i2 = t2.channelUrl, s2 = t2.isOpenChannel, a2 = t2.messageId, o2 = t2.reportCategory, l2 = t2.reportingUserId, u2 = t2.reportDescription, c2 = t2.offendingUserId;
          this.sb.ConnectionManager.ready((function(t3, d2) {
            if (t3) n2(t3, null);
            else {
              var h2 = e2.Path.REPORT_MESSAGES.replace("%s", encodeURIComponent(s2 ? "open_channels" : "group_channels")).replace("%s", encodeURIComponent(i2)).replace("%s", encodeURIComponent(a2)), p2 = new ae({ report_category: o2, offending_user_id: c2 });
              null != l2 && p2.add("reporting_user_id", l2), null != u2 && p2.add("report_description", u2), r2.post(h2, p2, n2);
            }
          }));
        } }, { key: "sendUserMessage", value: function(t2, n2) {
          var r2 = this, i2 = t2.channelUrl, s2 = t2.isOpenChannel, a2 = t2.message, o2 = t2.data, l2 = t2.customType, u2 = t2.translationTargetLanguages, c2 = t2.metaArrays, d2 = t2.mentionType, h2 = t2.mentionedUserIds, p2 = t2.mentionedMessageTemplate, f2 = t2.pushNotificationDeliveryOption, _2 = t2.rootMessageId, g2 = t2.parentMessageId, y2 = t2.appleCriticalAlertOptions, m2 = t2.isReplyToChannel;
          this.sb.ConnectionManager.ready((function(t3, E2) {
            if (t3) n2(t3, null);
            else {
              var v2 = r2.cls.FileMessageParams, b2 = s2 ? e2.Path.OPENCHANNELS_CHANNELURL_MESSAGES.replace("%s", encodeURIComponent(i2)) : e2.Path.GROUPCHANNELS_CHANNELURL_MESSAGES.replace("%s", encodeURIComponent(i2)), C2 = new ae({ message_type: "MESG", user_id: E2.userId, message: a2, mention_type: d2, mentioned_user_ids: [] });
              null != o2 && C2.add("data", o2), null != l2 && C2.add("custom_type", l2), u2 && C2.add("translation_target_langs", u2), c2 && c2.length > 0 && C2.add("sorted_metaarray", c2.map((function(e3) {
                return e3.encode();
              }))), d2 === r2.cls.BaseMessageParams.MentionType.CHANNEL ? C2.add("mentioned_user_ids", []) : Array.isArray(h2) && h2.length > 0 && C2.add("mentioned_user_ids", h2), p2 && C2.add("mentioned_message_template", p2), f2 && f2 !== v2.PushNotificationDeliveryOption.DEFAULT && C2.add("push_option", f2), _2 && C2.add("root_message_id", _2), g2 && C2.add("parent_message_id", g2), y2 && C2.add("apple_critical_alert_options", y2.serialize()), m2 && C2.add("reply_to_channel", m2), r2.post(b2, C2, n2);
            }
          }));
        } }, { key: "sendFileMessage", value: function(t2, n2) {
          var r2 = this, i2 = t2.reqId, s2 = t2.channelUrl, a2 = t2.isOpenChannel, o2 = t2.fileUrl, l2 = t2.fileName, u2 = t2.fileSize, c2 = t2.fileType, d2 = t2.data, h2 = t2.customType, p2 = t2.thumbnailSizes, f2 = t2.requireAuth, _2 = t2.metaArrays, g2 = t2.mentionType, y2 = t2.mentionedUserIds, m2 = t2.pushNotificationDeliveryOption, E2 = t2.rootMessageId, v2 = t2.parentMessageId, b2 = t2.appleCriticalAlertOptions, C2 = t2.isReplyToChannel;
          this.sb.ConnectionManager.ready((function(t3, A2) {
            if (t3) n2(t3, null);
            else {
              var N2 = r2.cls.FileMessageParams, S2 = a2 ? e2.Path.OPENCHANNELS_CHANNELURL_MESSAGES.replace("%s", encodeURIComponent(s2)) : e2.Path.GROUPCHANNELS_CHANNELURL_MESSAGES.replace("%s", encodeURIComponent(s2)), I2 = new ae({ message_type: "FILE", user_id: A2.userId, url: o2, mention_type: g2, mentioned_user_ids: [], req_id: i2 });
              null != l2 && I2.add("file_name", l2), null != u2 && I2.add("file_size", u2), null != c2 && I2.add("file_type", c2), null != d2 && I2.add("custom_field", d2), null != h2 && I2.add("custom_type", h2), p2 && I2.add("thumbnails", p2), f2 && I2.add("require_auth", f2), _2 && _2.length > 0 && I2.add("sorted_metaarray", _2.map((function(e3) {
                return e3.encode();
              }))), g2 === r2.cls.BaseMessageParams.MentionType.CHANNEL ? I2.add("mentioned_user_ids", []) : Array.isArray(y2) && y2.length > 0 && I2.add("mentioned_user_ids", y2), m2 && m2 !== N2.PushNotificationDeliveryOption.DEFAULT && I2.add("push_option", m2), E2 && I2.add("root_message_id", E2), v2 && I2.add("parent_message_id", v2), b2 && I2.add("apple_critical_alert_options", b2.serialize()), C2 && I2.add("reply_to_channel", C2), r2.post(S2, I2, n2);
            }
          }));
        } }, { key: "uploadFile", value: function(t2, n2) {
          var r2 = this, i2 = t2.file, s2 = t2.thumbnailSizes, a2 = t2.channelUrl, o2 = t2.progressHandler, l2 = t2.reqId;
          this.sb.ConnectionManager.ready((function(t3, u2) {
            if (t3) n2(t3, null);
            else {
              var c2 = O.get(r2.sb._iid).container.appInfo;
              if (c2) if ("number" == typeof i2.size || i2.size || (i2.size = 0), "number" == typeof i2.size) if (i2.size <= c2.uploadSizeLimit) {
                var d2 = e2.Path.STORAGE_FILE, h2 = new ae();
                if (h2.add("file", i2, i2.name), a2 && "string" == typeof a2 && h2.add("channel_url", a2), s2) for (var p2 = 0; p2 < s2.length; p2++) h2.add("thumbnail" + (p2 + 1), s2[p2].maxWidth + "," + s2[p2].maxHeight);
                h2.upload.reqId = l2, h2.upload.deleteRequest = function() {
                  var e3 = r2.cls.FileMessageQueue;
                  e3.uploadRequest[l2] && delete e3.uploadRequest[l2];
                }, h2.upload.progressHandler = function(e3) {
                  o2 && "function" == typeof o2 && o2(e3, l2);
                }, r2.post(d2, h2, n2);
              } else n2(new H("The file size exceeded the upload limit: ".concat(c2.uploadSizeLimit), H.FILE_SIZE_LIMIT_EXCEEDED), null);
              else n2(new H("Invalid file size: ".concat(i2.size), H.INVALID_PARAMETER), null);
              else n2(new H("Connection should be made first.", H.CONNECTION_REQUIRED), null);
            }
          }));
        } }, { key: "registerScheduledUserMessage", value: function(t2, n2) {
          var r2 = this, i2 = t2.groupChannelParams, s2 = t2.channelUrl, a2 = t2.isOpenChannel;
          this.sb.ConnectionManager.ready((function(t3, o2) {
            if (t3) n2(t3, null);
            else {
              var l2 = a2 ? e2.Path.OPENCHANNELS_CHANNELURL_SCHEDULED_MESSAGES.replace("%s", encodeURIComponent(s2)) : e2.Path.GROUPCHANNELS_CHANNELURL_SCHEDULED_MESSAGES.replace("%s", encodeURIComponent(s2)), u2 = new ae({ scheduled_dt: i2._getScheduleString(), user_id: o2.userId, message: i2.message, data: i2.data });
              i2.customType && u2.add("custom_type", i2.customType), i2.metaArrayKeys && Object.keys(i2.metaArrayKeys).length > 0 && u2.add("metaarray", i2.metaArrayKeys), i2.mentionType && u2.add("mention_type", i2._mentionType), i2._mentionType === r2.cls.BaseMessageParams.MentionType.CHANNEL ? u2.add("mentioned_user_ids", []) : Array.isArray(i2._mentionedUserIds) && i2._mentionedUserIds.length > 0 && u2.add("mentioned_user_ids", i2._mentionedUserIds), i2.translationTargetLanguages && i2.translationTargetLanguages.length > 0 && u2.add("translation_target_langs", i2.translationTargetLanguages), i2.pushNotificationDeliveryOption && i2.pushNotificationDeliveryOption !== r2.cls.BaseMessageParams.PushNotificationDeliveryOption.DEFAULT && u2.add("push_option", i2.pushNotificationDeliveryOption), i2.appleCriticalAlertOptions && u2.add("apple_critical_alert_options", i2.appleCriticalAlertOptions.serialize()), r2.post(l2, u2, n2);
            }
          }));
        } }, { key: "getMyPushTriggerOption", value: function(t2, n2) {
          var r2 = this, i2 = t2.channelUrl;
          this.sb.ConnectionManager.ready((function(t3, s2) {
            if (t3) n2(t3, null);
            else {
              var a2 = e2.Path.USERS_USERID_PUSHPREFERENCE_CHANNELURL.replace("%s", encodeURIComponent(s2.userId)).replace("%s", encodeURIComponent(i2));
              r2.get(a2, null, n2);
            }
          }));
        } }, { key: "setMyPushTriggerOption", value: function(t2, n2) {
          var r2 = this, i2 = t2.channelUrl, s2 = t2.pushTriggerOption, a2 = t2.enable;
          this.sb.ConnectionManager.ready((function(t3, o2) {
            if (t3) n2(t3, null);
            else {
              var l2 = e2.Path.USERS_USERID_PUSHPREFERENCE_CHANNELURL.replace("%s", encodeURIComponent(o2.userId)).replace("%s", encodeURIComponent(i2)), u2 = new ae();
              s2 && u2.add("push_trigger_option", s2), "boolean" == typeof a2 && u2.add("enable", a2), r2.put(l2, u2, n2);
            }
          }));
        } }, { key: "setMyCountPreference", value: function(t2, n2) {
          var r2 = this, i2 = t2.channelUrl, s2 = t2.countPreference;
          this.sb.ConnectionManager.ready((function(t3, a2) {
            if (t3) n2(t3, null);
            else {
              var o2 = e2.Path.USERS_COUNT_PREFERENCE.replace("%s", encodeURIComponent(a2.userId)).replace("%s", encodeURIComponent(i2)), l2 = new ae({ count_preference: s2 });
              r2.put(o2, l2, n2);
            }
          }));
        } }, { key: "resetMyHistory", value: function(t2, n2) {
          var r2 = this, i2 = t2.channelUrl;
          this.sb.ConnectionManager.ready((function(t3, s2) {
            if (t3) n2(t3, null);
            else {
              var a2 = e2.Path.GROUPCHANNELS_RESET_USER_HISTORY.replace("%s", encodeURIComponent(i2));
              r2.put(a2, null, n2);
            }
          }));
        } }, { key: "addReaction", value: function(t2, n2) {
          var r2 = this, i2 = t2.isGroupChannel, s2 = t2.channelUrl, a2 = t2.messageId, o2 = t2.key;
          this.sb.ConnectionManager.ready((function(t3, l2) {
            if (t3) n2(t3, null);
            else {
              var u2 = i2 ? e2.Path.GROUPCHANNELS_CHANNELURL_MESSAGES_MESSAGEID_REACTION.replace("%s", encodeURIComponent(s2)).replace("%s", encodeURIComponent(a2)) : e2.Path.OPENCHANNELS_CHANNELURL_MESSAGES_MESSAGEID_REACTION.replace("%s", encodeURIComponent(s2)).replace("%s", encodeURIComponent(a2)), c2 = new ae({ reaction: o2 });
              r2.post(u2, c2, n2);
            }
          }));
        } }, { key: "deleteReaction", value: function(t2, n2) {
          var r2 = this, i2 = t2.isGroupChannel, s2 = t2.channelUrl, a2 = t2.messageId, o2 = t2.key;
          this.sb.ConnectionManager.ready((function(t3, l2) {
            if (t3) n2(t3, null);
            else {
              var u2 = i2 ? e2.Path.GROUPCHANNELS_CHANNELURL_MESSAGES_MESSAGEID_REACTION.replace("%s", encodeURIComponent(s2)).replace("%s", encodeURIComponent(a2)) : e2.Path.OPENCHANNELS_CHANNELURL_MESSAGES_MESSAGEID_REACTION.replace("%s", encodeURIComponent(s2)).replace("%s", encodeURIComponent(a2)), c2 = new ae({ reaction: o2 });
              r2.delete(u2, c2, n2);
            }
          }));
        } }, { key: "getAllEmoji", value: function(t2) {
          var n2 = this;
          this.sb.ConnectionManager.ready((function(r2, i2) {
            r2 ? t2(r2, null) : n2.get(e2.Path.EMOJI_CATEGORIES, null, t2);
          }));
        } }, { key: "getEmojiCategory", value: function(t2, n2) {
          var r2 = this, i2 = t2.categoryId;
          this.sb.ConnectionManager.ready((function(t3, s2) {
            if (t3) n2(t3, null);
            else {
              var a2 = e2.Path.EMOJI_CATEGORIES_CATEGORYID.replace("%s", i2);
              r2.get(a2, null, n2);
            }
          }));
        } }, { key: "getEmoji", value: function(t2, n2) {
          var r2 = this, i2 = t2.emojiKey;
          this.sb.ConnectionManager.ready((function(t3, s2) {
            if (t3) n2(t3, null);
            else {
              var a2 = e2.Path.EMOJIS_EMOJIKEY.replace("%s", i2);
              r2.get(a2, null, n2);
            }
          }));
        } }, { key: "getAllowFriendDiscovery", value: function(t2) {
          var n2 = this;
          this.sb.ConnectionManager.ready((function(r2, i2) {
            if (r2) t2(r2, null);
            else {
              var s2 = e2.Path.USERS_USERID_ALLOW_FRIEND_DISCOVERY.replace("%s", encodeURIComponent(i2.userId));
              n2.get(s2, null, t2);
            }
          }));
        } }, { key: "setAllowFriendDiscovery", value: function(t2, n2) {
          var r2 = this, i2 = t2.allowFriendDiscovery;
          this.sb.ConnectionManager.ready((function(t3, s2) {
            if (t3) n2(t3, null);
            else {
              var a2 = e2.Path.USERS_USERID_ALLOW_FRIEND_DISCOVERY.replace("%s", encodeURIComponent(s2.userId)), o2 = new ae();
              "boolean" == typeof i2 && o2.add("allow_friend_discovery", i2), r2.put(a2, o2, n2);
            }
          }));
        } }], [{ key: "Path", get: function() {
          return { USERS: "/users", USERS_USERID: "/users/%s", USERS_USERID_LOGIN: "/users/%s/login", USERS_USERID_SESSION_KEY: "/users/%s/session_key", USERS_USERID_METADATA: "/users/%s/metadata", USERS_USERID_METADATA_KEY: "/users/%s/metadata/%s", USERS_USERID_MARKASREADALL: "/users/%s/mark_as_read_all", USERS_USERID_MY_GROUP_CHANNEL_CHANGELOGS: "/users/%s/my_group_channels/changelogs", USERS_USERID_UNREAD_ITEM_COUNT: "/users/%s/unread_item_count", USERS_USERID_UNREAD_MESSAGE_COUNT: "/users/%s/unread_message_count", USERS_USERID_UNREAD_CHANNEL_COUNT: "/users/%s/unread_channel_count", USERS_USERID_PUSH_GCM_TOKEN: "/users/%s/push/gcm/%s", USERS_USERID_PUSH_GCM: "/users/%s/push/gcm", USERS_USERID_PUSH_DEVICE_TOKENS: "/users/%s/push/%s/device_tokens", USERS_USERID_PUSHPREFERENCE_CHANNELURL: "/users/%s/push_preference/%s", USERS_USERID_PUSHPREFERENCE: "/users/%s/push_preference/", USERS_USERID_PUSH_TEMPLATE: "/users/%s/push/template", USERS_USERID_BLOCK: "/users/%s/block", USERS_USERID_BLOCK_TARGETID: "/users/%s/block/%s", USERS_USERID_PUSH_APNS_TOKEN: "/users/%s/push/apns/%s", USERS_USERID_PUSH_APNS: "/users/%s/push/apns", USERS_USERID_PUSH: "/users/%s/push", USERS_USERID_GROUP_CHANNEL_INVITATION_PREFERENCE: "/users/%s/channel_invitation_preference", USERS_USERID_GROUP_CHANNEL_COUNT: "/users/%s/group_channel_count", USERS_COUNT_PREFERENCE: "/users/%s/count_preference/%s", USERS_USERID_ALLOW_FRIEND_DISCOVERY: "/users/%s/allow_friend_discovery", OPENCHANNELS: "/open_channels", OPENCHANNELS_CHANNELURL: "/open_channels/%s", OPENCHANNELS_CHANNELURL_MESSAGES: "/open_channels/%s/messages", OPENCHANNELS_CHANNELURL_MESSAGES_MESSAGEID: "/open_channels/%s/messages/%s", OPENCHANNELS_CHANNELURL_MESSAGES_MESSAGEID_TRANSLATION: "/open_channels/%s/messages/%s/translation", OPENCHANNELS_CHANNELURL_MESSAGES_CHANGELOGS: "/open_channels/%s/messages/changelogs", OPENCHANNELS_CHANNELURL_SCHEDULED_MESSAGES: "/open_channels/%s/scheduled_messages", OPENCHANNELS_CHANNELURL_PARTICIPANTS: "/open_channels/%s/participants", OPENCHANNELS_CHANNELURL_OPERATORS: "/open_channels/%s/operators", OPENCHANNELS_CHANNELURL_METADATA: "/open_channels/%s/metadata", OPENCHANNELS_CHANNELURL_METADATA_KEY: "/open_channels/%s/metadata/%s", OPENCHANNELS_CHANNELURL_METACOUNTER: "/open_channels/%s/metacounter", OPENCHANNELS_CHANNELURL_METACOUNTER_KEY: "/open_channels/%s/metacounter/%s", OPENCHANNELS_CHANNELURL_BAN: "/open_channels/%s/ban", OPENCHANNELS_CHANNELURL_BAN_USERID: "/open_channels/%s/ban/%s", OPENCHANNELS_CHANNELURL_MUTE: "/open_channels/%s/mute", OPENCHANNELS_CHANNELURL_MUTE_USERID: "/open_channels/%s/mute/%s", OPENCHANNELS_CHANNELURL_FREEZE: "/open_channels/%s/freeze", OPENCHANNELS_OPERATORS: "/open_channels/%s/operators", OPENCHANNELS_CHANNELURL_MESSAGES_MESSAGEID_REACTION: "/open_channels/%s/messages/%s/reactions", GROUPCHANNELS: "/group_channels", MYGROUPCHANNELS: "/users/%s/my_group_channels", GROUPCHANNELS_CHANNELURL: "/group_channels/%s", GROUPCHANNELS_CHANNELURL_INVITE: "/group_channels/%s/invite", GROUPCHANNELS_CHANNELURL_ACCEPT_INVITATION: "/group_channels/%s/accept", GROUPCHANNELS_CHANNELURL_DECLINE_INVITATION: "/group_channels/%s/decline", GROUPCHANNELS_CHANNELURL_HIDE: "/group_channels/%s/hide", GROUPCHANNELS_CHANNELURL_LEAVE: "/group_channels/%s/leave", GROUPCHANNELS_CHANNELURL_JOIN: "/group_channels/%s/join", GROUPCHANNELS_CHANNELURL_OPERATORS: "/group_channels/%s/operators", GROUPCHANNELS_CHANNELURL_MESSAGES: "/group_channels/%s/messages", GROUPCHANNELS_CHANNELURL_MESSAGES_MARKASREAD: "/group_channels/%s/messages/mark_as_read", GROUPCHANNELS_CHANNELURL_MESSAGES_MARKASDELIVERED: "/group_channels/%s/messages/mark_as_delivered", GROUPCHANNELS_CHANNELURL_MESSAGES_TOTALCOUNT: "/group_channels/%s/messages/total_count", GROUPCHANNELS_CHANNELURL_MESSAGES_UNREADCOUNT: "/group_channels/%s/messages/unread_count", GROUPCHANNELS_CHANNELURL_MESSAGES_MESSAGEID: "/group_channels/%s/messages/%s", GROUPCHANNELS_CHANNELURL_MESSAGES_MESSAGEID_TRANSLATION: "/group_channels/%s/messages/%s/translation", GROUPCHANNELS_CHANNELURL_MESSAGES_CHANGELOGS: "/group_channels/%s/messages/changelogs", GROUPCHANNELS_CHANNELURL_MESSAGES_GAP: "/group_channels/%s/messages_gap", GROUPCHANNELS_CHANNELURL_SCHEDULED_MESSAGES: "/group_channels/%s/scheduled_messages", GROUPCHANNELS_CHANNELURL_MEMBERS: "/group_channels/%s/members", GROUPCHANNELS_CHANNELURL_METADATA: "/group_channels/%s/metadata", GROUPCHANNELS_CHANNELURL_METADATA_KEY: "/group_channels/%s/metadata/%s", GROUPCHANNELS_CHANNELURL_METACOUNTER: "/group_channels/%s/metacounter", GROUPCHANNELS_CHANNELURL_METACOUNTER_KEY: "/group_channels/%s/metacounter/%s", GROUPCHANNELS_RESET_USER_HISTORY: "/group_channels/%s/reset_user_history", GROUPCHANNELS_OPERATORS: "/group_channels/%s/operators", GROUPCHANNELS_MEMBERS: "/group_channels/%s/members", GROUPCHANNELS_CHANNELURL_BAN: "/group_channels/%s/ban", GROUPCHANNELS_CHANNELURL_BAN_USERID: "/group_channels/%s/ban/%s", GROUPCHANNELS_CHANNELURL_MUTE: "/group_channels/%s/mute", GROUPCHANNELS_CHANNELURL_MUTE_USERID: "/group_channels/%s/mute/%s", GROUPCHANNELS_CHANNELURL_FREEZE: "/group_channels/%s/freeze", GROUPCHANNELS_CHANNELURL_MESSAGES_MESSAGEID_REACTION: "/group_channels/%s/messages/%s/reactions", STORAGE_FILE: "/storage/file", STORAGE_PROFILE: "/storage/profile_image", FRIENDS: "/users/%s/friends", FRIENDS_CHANGE_LOGS: "/users/%s/friends/changelogs", FRIENDS_DISCOVERIES: "/users/%s/friend_discoveries", SEARCH_MESSAGE: "/search/messages", REPORT_USERS: "/report/users/%s", REPORT_CHANNELS: "/report/%s/%s", REPORT_MESSAGES: "/report/%s/%s/messages/%s", EMOJIS_EMOJIKEY: "/emojis/%s", EMOJI_CATEGORIES: "/emoji_categories", EMOJI_CATEGORIES_CATEGORYID: "/emoji_categories/%s" };
        } }]), e2;
      })(), ce = (function() {
        function e2(t2, n2) {
          c(this, e2), this.sb = t2, this.ws = null, this.wsHost = null, this.WebSocket = null, this.handler = n2 || new e2.ConnectionHandler(), this.explicitDisconnect = false, this.lastActiveMillis = 0;
          try {
            this.WebSocket = "undefined" == typeof WebSocket ? a.default : WebSocket;
          } catch (e3) {
            this.WebSocket = WebSocket;
          }
        }
        return h(e2, [{ key: "connect", value: function(e3, t2, n2) {
          var r2 = this;
          J.debug("`WebSocketClient.connect` called.");
          var i2 = O.get(this.sb._iid).container, s2 = i2.pinger, a2 = i2.auth, o2 = i2.extensions, l2 = i2.getUserAgentWithExtensions, u2 = i2.sessionManager, c2 = wi.getAppVersion();
          this.wsHost = n2;
          try {
            var d2 = "/?p=JS" + "&pv=".concat(encodeURIComponent(T.OS_VERSION)) + "&sv=".concat(encodeURIComponent(T.SDK_VERSION)) + "&ai=".concat(encodeURIComponent(this.sb.getApplicationId()));
            if (c2 && (d2 += "&av=".concat(encodeURIComponent(c2))), a2.sessionKey ? d2 += "&key=".concat(encodeURIComponent(a2.sessionKey)) : d2 += "&user_id=".concat(encodeURIComponent(e3), "&access_token=").concat(encodeURIComponent(t2)), d2 += "&active=1", d2 += "&SB-User-Agent=".concat(encodeURIComponent(l2(o2))), d2 += "&Request-Sent-Timestamp=".concat((/* @__PURE__ */ new Date()).getTime().toString()), d2 += "&include_extra_data=".concat(encodeURIComponent(["premium_feature_list", "file_upload_size_limit", "application_attributes", "emoji_hash"].join(","))), u2.handler && (d2 += "&expiring_session=1"), d2 += "&use_local_cache=1", this.ws = new this.WebSocket(this.wsHost + d2), !this.ws) return this.sb.isReconnectingOnError = true, void this.handler.onError({ message: "ws does not exist." });
          } catch (e4) {
            return this.sb.isReconnectingOnError = true, void this.handler.onError(e4);
          }
          try {
            this.sb.getDebugMode() && "undefined" != typeof window && (window.ws = this.ws);
          } catch (e4) {
            J.debug("`window` object does not exist.");
          }
          var h2 = false;
          this.ws.onopen = function(e4) {
            J.debug("`WebSocket.onopen` called."), r2.handler.onOpen(e4);
          }, this.ws.onmessage = function(e4) {
            r2.active();
            for (var t3 = e4.data.split("\n"), n3 = 0; n3 < t3.length; n3++) {
              var i3 = t3[n3];
              if (i3 && "string" == typeof i3) {
                try {
                  if ("PONG" === i3.substring(0, 4)) {
                    s2.pong();
                    continue;
                  }
                } catch (e5) {
                  J.debug("`WebSocket.onmessage` command check error:", e5);
                }
                r2.handler.onMessage(i3);
              }
            }
          }, this.ws.onerror = function(e4) {
            J.debug("`WebSocket.onerror` called:", e4), s2 && s2.stop(), h2 = true, r2.sb.isReconnectingOnError = true, r2.handler.onError(e4);
          }, this.ws.onclose = function(e4) {
            J.group("`WebSocket.onclose` called.", [{ level: J.supportedLogLevels.DEBUG, messages: ["e", e4] }, { level: J.supportedLogLevels.DEBUG, messages: ["explicitDisconnect", r2.explicitDisconnect] }]), s2 && s2.stop(), r2.explicitDisconnect ? r2.handler.onClose(e4) : h2 || r2.handler.onError(e4), r2.explicitDisconnect = false;
          };
        } }, { key: "disconnect", value: function(e3, t2) {
          J.group("`WebSocketClient.onclose` called.", [{ level: J.supportedLogLevels.DEBUG, messages: ["explicit", e3] }]);
          var n2 = O.get(this.sb._iid).container.pinger;
          n2 && n2.stop(), this.explicitDisconnect = true === e3, this.ws && (this.ws.onopen = function() {
          }, this.ws.onmessage = function() {
          }, this.ws.onclose = function() {
            t2 && t2();
          }, this.ws.onerror = function() {
          }, this.ws.close(), this.ws = null), this.explicitDisconnect ? this.handler.onClose() : this.handler.onError(), this.explicitDisconnect = false;
        } }, { key: "send", value: function(e3, t2) {
          if (1 !== this.ws.readyState) t2 && t2(new H("Connection is not valid. Please reconnect.", H.WEBSOCKET_CONNECTION_CLOSED), null);
          else {
            var n2 = O.get(this.sb._iid).container.pinger;
            this.ws.send(e3.encode()), "PING" !== e3.command && n2.refreshTimer(), t2 && t2(null, null);
          }
        } }, { key: "active", value: function() {
          this.lastActiveMillis = (/* @__PURE__ */ new Date()).getTime();
        } }, { key: "getConnectionState", value: function() {
          try {
            return 1 === this.ws.readyState ? this.sb.ConnectionState.OPEN : 0 === this.ws.readyState ? this.sb.ConnectionState.CONNECTING : this.sb.ConnectionState.CLOSED;
          } catch (e3) {
            return this.sb.ConnectionState.CLOSED;
          }
        } }]), e2;
      })();
      ce.ConnectionHandler = (function() {
        return h((function e2() {
          c(this, e2), this.onReady = function() {
          }, this.onOpen = function() {
          }, this.onClose = function() {
          }, this.onMessage = function() {
          }, this.onError = function() {
          };
        }));
      })();
      var de, he = {}, pe = (function() {
        function e2() {
          this._observers = [];
        }
        return e2.of = function(t2) {
          return he[t2] || (he[t2] = new e2()), he[t2];
        }, e2.prototype.invokeConnect = function() {
          for (var e3 = 0, t2 = this._observers; e3 < t2.length; e3++) {
            var n2 = t2[e3];
            n2.onConnect && n2.onConnect();
          }
        }, e2.prototype.invokeDisconnect = function() {
          for (var e3 = 0, t2 = this._observers; e3 < t2.length; e3++) {
            var n2 = t2[e3];
            n2.onDisconnect && n2.onDisconnect();
          }
        }, e2.prototype.addObserver = function(e3) {
          this._observers.push(e3);
        }, e2.prototype.removeObserver = function(e3) {
          var t2 = this._observers.indexOf(e3);
          t2 > -1 && this._observers.splice(t2, 1);
        }, e2;
      })();
      !(function(e2) {
        e2[e2.EVENT_CHANNEL_CHANGED = 0] = "EVENT_CHANNEL_CHANGED", e2[e2.EVENT_USER_RECEIVED_INVITATION = 1] = "EVENT_USER_RECEIVED_INVITATION", e2[e2.EVENT_USER_DECLINED_INVITATION = 2] = "EVENT_USER_DECLINED_INVITATION", e2[e2.EVENT_USER_JOINED = 3] = "EVENT_USER_JOINED", e2[e2.EVENT_USER_LEFT = 4] = "EVENT_USER_LEFT", e2[e2.EVENT_CHANNEL_ENTER = 5] = "EVENT_CHANNEL_ENTER", e2[e2.EVENT_CHANNEL_EXIT = 6] = "EVENT_CHANNEL_EXIT", e2[e2.EVENT_CHANNEL_FROZEN = 7] = "EVENT_CHANNEL_FROZEN", e2[e2.EVENT_CHANNEL_UNFROZEN = 8] = "EVENT_CHANNEL_UNFROZEN", e2[e2.EVENT_CHANNEL_HIDDEN = 9] = "EVENT_CHANNEL_HIDDEN", e2[e2.EVENT_CHANNEL_UNHIDDEN = 10] = "EVENT_CHANNEL_UNHIDDEN", e2[e2.EVENT_TYPING_STATUS_UPDATED = 11] = "EVENT_TYPING_STATUS_UPDATED", e2[e2.EVENT_OPERATOR_UPDATED = 12] = "EVENT_OPERATOR_UPDATED", e2[e2.EVENT_CHANNEL_METADATA_UPDATED = 13] = "EVENT_CHANNEL_METADATA_UPDATED", e2[e2.EVENT_CHANNEL_METADATA_DELETED = 14] = "EVENT_CHANNEL_METADATA_DELETED", e2[e2.EVENT_CHANNEL_METACOUNTER_UPDATED = 15] = "EVENT_CHANNEL_METACOUNTER_UPDATED", e2[e2.EVENT_CHANNEL_METACOUNTER_DELETED = 16] = "EVENT_CHANNEL_METACOUNTER_DELETED", e2[e2.EVENT_CHANNEL_DELETED = 17] = "EVENT_CHANNEL_DELETED", e2[e2.EVENT_USER_MUTED = 18] = "EVENT_USER_MUTED", e2[e2.EVENT_USER_UNMUTED = 19] = "EVENT_USER_UNMUTED", e2[e2.EVENT_USER_BANNED = 20] = "EVENT_USER_BANNED", e2[e2.EVENT_USER_UNBANNED = 21] = "EVENT_USER_UNBANNED", e2[e2.EVENT_MESSAGE_RECEIVED = 22] = "EVENT_MESSAGE_RECEIVED", e2[e2.EVENT_MESSAGE_SENT = 23] = "EVENT_MESSAGE_SENT", e2[e2.EVENT_MESSAGE_UPDATED = 24] = "EVENT_MESSAGE_UPDATED", e2[e2.EVENT_MESSAGE_DELETED = 25] = "EVENT_MESSAGE_DELETED", e2[e2.EVENT_READ_RECEIPT_UPDATED = 26] = "EVENT_READ_RECEIPT_UPDATED", e2[e2.EVENT_DELIVERY_RECEIPT_UPDATED = 27] = "EVENT_DELIVERY_RECEIPT_UPDATED", e2[e2.EVENT_MENTION = 28] = "EVENT_MENTION", e2[e2.EVENT_REACTION_UPDATED = 29] = "EVENT_REACTION_UPDATED", e2[e2.EVENT_THREAD_INFO_UPDATED = 30] = "EVENT_THREAD_INFO_UPDATED", e2[e2.CHANNEL_BACKGROUND = 1e3] = "CHANNEL_BACKGROUND", e2[e2.CHANNEL_CHANGELOG = 1001] = "CHANNEL_CHANGELOG", e2[e2.MESSAGE_BACKGROUND = 1002] = "MESSAGE_BACKGROUND", e2[e2.MESSAGE_FILL = 1003] = "MESSAGE_FILL", e2[e2.MESSAGE_CHANGELOG = 1004] = "MESSAGE_CHANGELOG", e2[e2.LOCAL_MESSAGE_PENDING_CREATED = 2e3] = "LOCAL_MESSAGE_PENDING_CREATED", e2[e2.LOCAL_MESSAGE_FAILED = 2001] = "LOCAL_MESSAGE_FAILED", e2[e2.LOCAL_MESSAGE_CANCELED = 2002] = "LOCAL_MESSAGE_CANCELED", e2[e2.LOCAL_MESSAGE_RESEND_STARTED = 2003] = "LOCAL_MESSAGE_RESEND_STARTED", e2[e2.MESSAGE_COLLECTION_FILTER_MISMATCH = 2004] = "MESSAGE_COLLECTION_FILTER_MISMATCH";
      })(de || (de = {}));
      var fe, _e = {}, ge = (function() {
        function e2() {
          this._observers = [];
        }
        return e2.of = function(t2) {
          return _e[t2] || (_e[t2] = new e2()), _e[t2];
        }, e2.prototype.addObserver = function(e3) {
          this._observers.push(e3);
        }, e2.prototype.removeObserver = function(e3) {
          var t2 = this._observers.indexOf(e3);
          t2 >= 0 && this._observers.splice(t2, 1);
        }, e2.prototype.send = function(e3) {
          for (var t2 = 0, n2 = this._observers; t2 < n2.length; t2++) {
            n2[t2].onevent(e3);
          }
        }, e2;
      })(), ye = (function() {
        function e2(t2) {
          c(this, e2), this.sb = t2, this.cls = x.get(this.sb._iid), this.client = new ce(this.sb), this.connectParams = { retryCount: 1 }, this.reconnectParams = { interval: 3, retryCount: 3, multiplier: 2, maxInterval: 24 }, this.connectCount = 0, this.reconnectCount = 0, this.reconnectDelay = 0;
        }
        return h(e2, [{ key: "isConnected", get: function() {
          return this.client && this.client.getConnectionState() === this.sb.ConnectionState.OPEN;
        } }, { key: "connect", value: function(e3, t2) {
          var n2 = this, r2 = O.get(this.sb._iid).container, i2 = r2.auth, s2 = r2.apiClient, a2 = r2.commandHandler;
          i2.sessionToken = t2 || null;
          var o2 = this.cls.GroupChannel, l2 = null, u2 = new ce.ConnectionHandler();
          this.client = new ce(this.sb, u2), u2.onMessage = function(e4) {
            a2.onRawCommandReceived(e4);
          }, this.sb.loginHandler = function(e4, t3) {
            if (n2.sb.connecting = false, n2.sb.reconnecting = false, e4) n2.disconnect({ clearSession: true, err: e4 }, null);
            else {
              clearInterval(n2.sb.globalTimer);
              var r3 = ge.of(n2.sb._iid), i3 = function() {
                o2.cachedChannels && Object.keys(o2.cachedChannels).forEach((function(e5) {
                  var t4 = o2.cachedChannels[e5];
                  t4.invalidateTypingStatus() && (Object.keys(n2.sb.channelHandlers).forEach((function(e6) {
                    n2.sb.channelHandlers[e6].onTypingStatusUpdated(t4);
                  })), r3.send({ source: de.EVENT_TYPING_STATUS_UPDATED, payload: { channel: t4 } }));
                }));
              };
              i3(), n2.sb.globalTimer = setInterval((function() {
                return i3();
              }), 1e3), n2.flushConnectionCallbacks(null, t3), n2.sb.ConnectionManager.processAllReadyHandler(null);
            }
          }, u2.onOpen = function() {
            n2.connectCount = 0, n2.sb.loginTimer = setTimeout((function() {
              n2.sb.loginTimer = null, n2.sb.onLoginTimerCancel = null, n2.flushConnectionCallbacks(new H("Connection timeout.", H.LOGIN_TIMEOUT), null), n2.sb.disconnect(null);
            }), n2.sb.Options.websocketResponseTimeout), n2.sb.onLoginTimerCancel = function() {
              n2.connectCount = 0, n2.flushConnectionCallbacks(new H("Connection has been canceled.", H.REQUEST_FAILED), null);
            }, n2.sb.connecting = false;
          }, u2.onError = function(r3) {
            if (J.debug("Connect: `WebSocketClient.ConnectionHandler.onError` called.", r3), i2.sessionKey) n2.sb.isReconnectingOnError = true, n2.sb.ConnectionManager.errorAllReadyHandler(), n2.reconnect(e3, true), n2.sb.connecting = false;
            else if (n2.connectCount < n2.connectParams.retryCount) n2.connectCount++, n2.client.connect(e3, t2, l2);
            else {
              var s3 = r3 ? r3.message : "Unknown error occurred.";
              n2.connectCount = 0, n2.flushConnectionCallbacks(new H("Websocket connection failed. ".concat(s3), H.WEBSOCKET_CONNECTION_FAILED), null), n2.sb.connecting = false;
            }
          }, u2.onClose = function() {
            J.debug("Connect: `WebSocketClient.ConnectionHandler.onClose` called."), n2.connectCount = 0, n2.sb.connecting = false;
          }, s2.checkRouting((function(r3, i3) {
            if (r3) return n2.sb.connecting = false, void n2.flushConnectionCallbacks(new H("Connection routing failed.", H.REQUEST_FAILED), null);
            l2 = i3.wsHost, s2.dummyCall((function(e4) {
              e4 && J.error("API dummy call failed:", e4);
            })), n2.client.connect(e3, t2, l2);
          }));
        } }, { key: "reconnect", value: function(e3) {
          var t2 = this, n2 = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1], r2 = O.get(this.sb._iid), i2 = r2.container, s2 = i2.auth, a2 = i2.apiClient, o2 = i2.commandHandler, l2 = i2.ackStateMap, u2 = i2.sessionManager, c2 = this.cls.OpenChannel;
          if (this.sb.connecting = false, this.sb.reconnecting = true, this.sb.reconnectTimer) J.debug("Reconnect: still reconnecting.");
          else {
            if (this.reconnectCount += 1, this.reconnectCount <= 1) {
              if (n2) {
                Object.keys(l2).forEach((function(e4) {
                  var t3 = l2[e4];
                  t3 && (clearTimeout(t3.timer), (0, t3.handler)(new H("Command received no ack.", H.ACK_TIMEOUT), null));
                  delete l2[e4];
                }));
                var d2 = pe.of(this.sb._iid);
                d2.invokeDisconnect(), Object.keys(this.sb.connectionHandlers).forEach((function(e4) {
                  t2.sb.connectionHandlers[e4].onReconnectStarted();
                }));
              }
              this.reconnectDelay = 0;
            } else this.reconnectDelay = Math.min(1e3 * this.reconnectParams.interval * Math.pow(this.reconnectParams.multiplier, this.reconnectCount - 2), this.reconnectParams.maxInterval > 0 ? 1e3 * this.reconnectParams.maxInterval : Number.MAX_SAFE_INTEGER);
            if (!e3 || !s2.sessionKey || this.reconnectParams.retryCount > 0 && this.reconnectCount > this.reconnectParams.retryCount) return this.disconnect({ clearSession: false, err: new H("Websocket connection failed with a number of retries.", H.WEBSOCKET_CONNECTION_FAILED) }, null), this.reconnectCount = 0, Object.keys(this.sb.connectionHandlers).forEach((function(e4) {
              t2.sb.connectionHandlers[e4].onReconnectFailed();
            })), this.sb.connecting = false, this.sb.reconnecting = false, this.sb.isReconnectingOnError = false, void this.sb.ConnectionManager.errorAllReadyHandler();
            this.sb.onReconnectTimerCancel = function() {
              t2.reconnectCount = 0;
            }, this.sb.reconnectTimer = setTimeout((function() {
              t2.sb.reconnectTimer = null, t2.sb.onReconnectTimerCancel = null, t2.client && t2.client.disconnect(true);
              var n3 = new ce.ConnectionHandler();
              t2.client = new ce(t2.sb, n3), t2.sb.loginHandler = function(n4, r3) {
                n4 ? u2.isSessionError(n4) ? u2.refreshSessionIfExpiredError(n4).then((function() {
                  clearTimeout(t2.sb.reconnectTimer), t2.sb.reconnectTimer = null, t2.reconnectCount = 0, t2.reconnect(e3, false);
                })).catch((function() {
                })) : (clearTimeout(t2.sb.reconnectTimer), t2.sb.reconnectTimer = null, t2.reconnect(e3, false)) : (t2.reconnectCount = 0, t2.sb.connecting = false, t2.sb.reconnecting = false, t2.sb.isReconnectingOnError = false, pe.of(t2.sb._iid).invokeConnect(), Object.keys(t2.sb.connectionHandlers).forEach((function(e4) {
                  t2.sb.connectionHandlers[e4].onReconnectSucceeded();
                })), t2.sb.ConnectionManager.processAllReadyHandler(null), t2.sb.isReconnectingOnError && Object.keys(t2.sb.ConnectionManager.networkHandlers).forEach((function(e4) {
                  t2.sb.ConnectionManager.networkHandlers[e4].onReconnected();
                })), Object.keys(c2.enteredChannels).forEach((function(e4) {
                  c2.enteredChannels[e4].enter((function(n5, r4) {
                    if (n5) {
                      var i3 = t2.cls.FileMessageQueue;
                      delete c2.enteredChannels[e4], i3.delete(e4);
                    }
                  }));
                })));
              }, n3.onOpen = function() {
                J.debug("Reconnect: `WebSocketClient.ConnectionHandler.onOpen` called."), t2.sb.loginTimer = setTimeout((function() {
                  J.debug("Reconnect: `loginTimer` timeout."), t2.sb.loginTimer = null, t2.reconnect(e3, true);
                }), t2.sb.Options.websocketResponseTimeout), t2.sb.onLoginTimerCancel = null;
              }, n3.onMessage = function(e4) {
                o2.onRawCommandReceived(e4);
              }, n3.onError = function(n4) {
                J.debug("Reconnect: `WebSocketClient.ConnectionHandler.onError` called.", n4), t2.sb.isReconnectingOnError = true, t2.sb.ConnectionManager.errorAllReadyHandler(), t2.reconnect(e3, true);
              }, n3.onClose = function() {
                J.debug("Reconnect: `WebSocketClient.ConnectionHandler.onClose` called."), t2.sb.reconnecting = false;
              }, a2.checkRouting((function(n4, r3) {
                n4 ? t2.reconnect(e3, true) : (t2.sb.getCurrentApiHost() !== r3.apiHost && a2.get("/", null, (function() {
                })), t2.client.connect(e3, null, r3.wsHost));
              }));
            }), this.reconnectDelay);
          }
        } }, { key: "disconnect", value: function(e3, t2) {
          var n2 = O.get(this.sb._iid), r2 = n2.container.ackStateMap, i2 = this.cls, s2 = i2.GroupChannel, a2 = i2.OpenChannel, o2 = e3.clearSession, l2 = e3.err;
          this.sb.loginTimer && (clearTimeout(this.sb.loginTimer), this.sb.onLoginTimerCancel && (this.sb.onLoginTimerCancel(), this.sb.onLoginTimerCancel = null), this.sb.loginTimer = null), this.sb.reconnectTimer && (clearTimeout(this.sb.reconnectTimer), this.sb.onReconnectTimerCancel && (this.sb.onReconnectTimerCancel(), this.sb.onReconnectTimerCancel = null), this.sb.reconnectTimer = null), this.client && (this.reconnectCount = 0, this.client.disconnect(true), this.client = null), Object.keys(r2).forEach((function(e4) {
            var t3 = r2[e4];
            t3 && (clearTimeout(t3.timer), (0, t3.handler)(new H("WebSocket connection must be made first.", H.WEBSOCKET_CONNECTION_CLOSED), null));
          })), n2.set("ackStateMap", {}), o2 && (a2.clearEnteredChannels(), a2.clearCache(), s2.clearCache(), this.sb.globalTimer && (clearInterval(this.sb.globalTimer), this.sb.globalTimer = null), this.sb.currentUser = null, n2.set("subscribedUnreadMessageCount", { all: 0, custom_types: {}, ts: 0 }), n2.set("auth", new F())), l2 && (this.flushConnectionCallbacks(l2, null), this.sb.connecting = false, this.sb.reconnecting = false, this.sb.isReconnectingOnError = false), t2 && t2(null, null);
        } }, { key: "flushConnectionCallbacks", value: function(e3, t2) {
          var n2 = this, r2 = O.get(this.sb._iid).container, i2 = r2.store, s2 = r2.localCacheEnabled, a2 = this.sb.connectionCallbacks;
          if (this.sb.connectionCallbacks = [], e3) if (s2) {
            var o2 = this.sb._getCurrentUserDataKey();
            se.isNonAutoReconnectableError(e3.code) ? i2.remove(o2).catch((function(e4) {
              return J.debug("Sendbird connect store remove error: ", e4);
            })).finally((function() {
              return a2.forEach((function(t3) {
                return t3(e3, null);
              }));
            })) : i2.get(o2).then((function(e4) {
              n2.sb._populateVaultFromCurrentUserData(e4);
            })).catch((function(e4) {
              J.debug("Sendbird connect store fetch error: ", e4);
            })).finally((function() {
              n2.sb.currentUser ? a2.forEach((function(t3) {
                return t3(e3, n2.sb.currentUser);
              })) : a2.forEach((function(t3) {
                return t3(e3, null);
              }));
            }));
          } else a2.forEach((function(t3) {
            return t3(e3, null);
          }));
          else pe.of(this.sb._iid).invokeConnect(), s2 ? i2.set({ key: this.sb._getCurrentUserDataKey(), value: this._createCurrentUserData(t2), generation: 1 }).catch((function(e4) {
            return J.debug("Sendbird connect store write error: ", e4);
          })).finally((function() {
            return a2.forEach((function(e4) {
              return e4(null, n2.sb.currentUser);
            }));
          })) : a2.forEach((function(e4) {
            return e4(null, t2);
          }));
        } }, { key: "_createCurrentUserData", value: function(e3) {
          var t2 = O.get(this.sb._iid).container, n2 = t2.auth, r2 = t2.maxUnreadCountOfSuperGroupChannel, i2 = t2.profileImageEncryption, s2 = t2.appInfo, a2 = t2.connectedAt, o2 = t2.firstConnectedAt, l2 = t2.concurrentCallLimit, u2 = t2.backOffDelay, c2 = { currentUser: (e3 || this.sb.currentUser).serialize(), maxUnreadCountOfSuperGroupChannel: T.DEFAULT_MAX_UNREAD_COUNT_OF_SUPER_GROUP_CHANNEL, profileImageEncryption: false };
          return n2.sessionKey && (c2.sessionKey = n2.sessionKey), n2.eKey && (c2.eKey = n2.eKey), r2 && (c2.maxUnreadCountOfSuperGroupChannel = r2), i2 && (c2.profileImageEncryption = i2), s2 && (c2.appInfo = s2._objectify()), a2 && o2 && (c2.connectedAt = a2, c2.firstConnectedAt = o2), l2 && u2 && (c2.concurrentCallLimit = l2, c2.backOffDelay = u2), c2;
        } }]), e2;
      })(), me = (function() {
        function e2(t2) {
          var n2 = t2.type, r2 = t2.nullable, i2 = void 0 !== r2 && r2, s2 = t2.optional, a2 = void 0 !== s2 && s2, o2 = t2.optionalIf, l2 = void 0 === o2 ? null : o2, u2 = t2.ignoreIf, d2 = void 0 === u2 ? null : u2, h2 = t2.defaultValue, p2 = void 0 === h2 ? null : h2, f2 = t2.constraint, _2 = void 0 === f2 ? null : f2;
          c(this, e2), this.type = n2, this.nullable = i2, this.optional = a2, this.optionalIf = l2, this.ignoreIf = d2, this.defaultValue = p2, this.constraint = _2;
        }
        return h(e2, [{ key: "isMatchingType", value: function(e3) {
          var t2 = function(t3, n2) {
            return "string" == typeof n2 ? u(t3) === n2 || "array" === n2 && Array.isArray(t3) || "file" === n2 && se.isFile(t3) || "null" === n2 && null === t3 || "date" === n2 && t3 instanceof Date : "function" == typeof n2 ? t3 instanceof n2 : "object" === u(n2) && Object.keys(n2).map((function(e4) {
              return n2[e4];
            })).indexOf(e3) > -1;
          };
          return t2(e3, this.type) || Array.isArray(this.type) && this.type.some((function(n2) {
            return t2(e3, n2);
          })) || this.nullable && null === e3;
        } }], [{ key: "parse", value: function(t2, n2) {
          for (t2 = e2.toArray(t2); t2.length > 0 && void 0 === t2[t2.length - 1]; ) t2.pop();
          var r2 = false, i2 = null;
          "callback" === n2[n2.length - 1].type && ("function" == typeof t2[t2.length - 1] && (i2 = t2.pop()), n2.pop(), r2 = true);
          var s2 = [], a2 = null, o2 = 0;
          return n2.forEach((function(n3) {
            "function" == typeof n3.ignoreIf && n3.ignoreIf(t2) ? s2.push(n3.hasOwnProperty("defaultValue") ? n3.defaultValue : null) : n3.isMatchingType(t2[o2]) ? (n3.nullable && null === t2[o2] || !n3.constraint || n3.constraint(t2[o2]) || (a2 = e2.error), s2.push(t2[o2]), o2++) : n3.optional || "function" == typeof n3.optionalIf && n3.optionalIf(t2) ? s2.push(n3.hasOwnProperty("defaultValue") ? n3.defaultValue : null) : (a2 = e2.error, s2.push(t2[o2]), o2++);
          })), r2 && i2 && s2.push(i2), t2.length !== o2 && (a2 = e2.error), [a2].concat(s2);
        } }, { key: "error", get: function() {
          return new H("Invalid parameter.", H.INVALID_PARAMETER);
        } }, { key: "toArray", value: function(e3) {
          for (var t2 = [], n2 = 0; n2 < e3.length; n2++) t2.push(e3[n2]);
          return t2;
        } }]), e2;
      })(), Ee = (function() {
        function e2(t2) {
          c(this, e2), this.sb = t2, this.authCount = 0, this.readyHandlers = [], this.networkHandlers = {}, this.authenticateTimer = 1e4, this.authInfoRequester = null;
        }
        return h(e2, [{ key: "addReadyHandler", value: function(e3) {
          e3 && "function" == typeof e3 && this.readyHandlers.push(e3);
        } }, { key: "ready", value: function(e3) {
          var t2 = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1], n2 = O.get(this.sb._iid), r2 = n2.container, i2 = r2.auth, s2 = r2.isInBackground;
          t2 && i2.hasSession() ? e3 && (this.sb.currentUser ? e3(null, this.sb.currentUser) : (this.addReadyHandler(e3), this.errorAllReadyHandler()), this.sb.getConnectionState() !== this.sb.ConnectionState.CLOSED || s2 || this.sb.reconnect()) : (this.addReadyHandler(e3), this.sb.isReconnectingOnError ? this.errorAllReadyHandler() : this.sb.getConnectionState() === this.sb.ConnectionState.OPEN ? this.processAllReadyHandler(null) : this.sb.getConnectionState() === this.sb.ConnectionState.CONNECTING || this.errorAllReadyHandler());
        } }, { key: "processAllReadyHandler", value: function(e3) {
          if (this.readyHandlers.length > 0) {
            var t2 = this.sb.currentUser, n2 = this.readyHandlers;
            this.readyHandlers = [], n2.forEach((function(n3) {
              n3 && "function" == typeof n3 && n3(e3, t2);
            }));
          }
        } }, { key: "errorAllReadyHandler", value: function() {
          var e3 = O.get(this.sb._iid).container.auth;
          this.processAllReadyHandler(e3 && e3.hasSession() ? new H("WebSocket connection must be made first.", H.WEBSOCKET_CONNECTION_CLOSED) : new H("Connection should be made first.", H.CONNECTION_REQUIRED));
        } }, { key: "NetworkHandler", value: function() {
          this.onReconnected = function() {
          };
        } }, { key: "addNetworkHandler", value: function(e3, t2) {
          J.warn("`ConnectionManager` will be deprecated."), this.networkHandlers[e3] = t2;
        } }, { key: "removeNetworkHandler", value: function(e3) {
          J.warn("`ConnectionManager` will be deprecated."), delete this.networkHandlers[e3];
        } }, { key: "removeAllNetworkHandler", value: function() {
          J.warn("`ConnectionManager` will be deprecated."), this.networkHandlers = {};
        } }, { key: "authenticate", value: function(e3) {
          var t2 = this;
          if (J.warn("`ConnectionManager` will be deprecated."), this.sb.getConnectionState() === this.sb.ConnectionState.OPEN || this.sb.reconnecting) this.sb.connecting = false, e3(null, this.sb.currentUser);
          else if (this.authInfoRequester && "function" == typeof this.authInfoRequester) {
            this.sb.connecting = true, this.authCount++;
            var n2 = setTimeout((function() {
              n2 = null, t2.authCount--, 0 === t2.authCount && 0 === t2.sb.connectionCallbacks.length && (t2.sb.connecting = false), t2.errorAllReadyHandler(), e3(new H("Connection should be made first.", H.CONNECTION_REQUIRED), null);
            }), this.authenticateTimer);
            this.authInfoRequester((function(r2) {
              if (n2) {
                clearTimeout(n2), n2 = null, t2.authCount--;
                var i2 = function(n3, r3) {
                  t2.sb.connecting = false, e3(n3, null);
                };
                r2 && r2.hasOwnProperty("userId") ? r2.accessToken ? r2.apiHost && r2.wsHost ? t2.sb.connect(r2.userId, r2.accessToken, r2.apiHost, r2.wsHost, i2) : t2.sb.connect(r2.userId, r2.accessToken, i2) : r2.apiHost && r2.wsHost ? t2.sb.connect(r2.userId, r2.apiHost, r2.wsHost, i2) : t2.sb.connect(r2.userId, i2) : e3(me.error, null);
              }
            }));
          } else e3(me.error, null);
        } }]), e2;
      })(), ve = function() {
        this.onSessionExpired = function() {
        }, this.onSessionTokenRequired = function(e2, t2) {
          return e2(null);
        }, this.onSessionError = function(e2) {
        }, this.onSessionRefreshed = function() {
        }, this.onSessionClosed = function() {
        };
      }, be = (function() {
        function e2() {
          c(this, e2), this.handler = null, this.resolvers = [];
        }
        return h(e2, [{ key: "_refreshSessionToken", value: function() {
          var t2 = this;
          return new Promise((function(n2, r2) {
            var i2 = null, s2 = function() {
              i2 && (clearTimeout(i2), i2 = null);
            }, a2 = function() {
              i2 && (s2(), r2(e2.sessionTokenRequestFailedError));
            };
            i2 = setTimeout((function() {
              return a2();
            }), 3e4), t2.handler.onSessionTokenRequired((function(e3) {
              i2 && (s2(), n2(e3));
            }), a2);
          }));
        } }, { key: "_refreshSessionKey", value: function() {
          var t2 = this;
          return new Promise((function(n2, r2) {
            var i2 = O.get(t2._iid).container, s2 = i2.auth, a2 = i2.wsAdapter;
            s2.sessionToken ? a2.isConnected ? t2._refreshSessionKeyByCommand().then((function() {
              return n2();
            })).catch((function(e3) {
              e3.isSessionTokenExpiredError ? r2(e3) : t2._refreshSessionKeyByApi().then((function() {
                return n2();
              })).catch((function(e4) {
                return r2(e4);
              }));
            })) : t2._refreshSessionKeyByApi().then((function() {
              return n2();
            })).catch((function(e3) {
              return r2(e3);
            })) : r2(e2.sessionTokenNotFoundError);
          }));
        } }, { key: "_refreshSessionKeyByCommand", value: function() {
          var t2 = this;
          return new Promise((function(n2, r2) {
            var i2 = wi.getInstance(t2._iid), s2 = O.get(t2._iid).container.auth, a2 = x.get(t2._iid).Command, o2 = a2.bSessionRefresh({ token: s2.sessionToken, requestId: a2.generateRequestId() });
            i2.sendCommand(o2, (function(t3, a3) {
              if (!i2.getErrorFirstCallback()) {
                var o3 = [t3, a3];
                a3 = o3[0], t3 = o3[1];
              }
              t3 ? r2(t3) : a3 ? a3.hasOwnProperty("error") ? r2(e2.sessionKeyRefreshFailedError) : (a3.hasOwnProperty("new_key") && (s2.sessionKey = a3.new_key), n2()) : r2(e2.sessionKeyRefreshFailedError);
            }));
          }));
        } }, { key: "_refreshSessionKeyByApi", value: function() {
          var t2 = this;
          return new Promise((function(n2, r2) {
            !(function i2(s2) {
              if (s2 < 3) {
                var a2 = O.get(t2._iid).container, o2 = a2.auth, l2 = a2.apiClient, u2 = {};
                o2.sessionToken && (u2.accessToken = o2.sessionToken), l2.refreshSessionKey(u2, (function(e3, t3) {
                  if (e3) e3.isSessionTokenExpiredError || e3.isSessionTokenRevokedError ? r2(e3) : i2(s2 + 1);
                  else {
                    var a3 = t3.key;
                    o2.sessionKey = a3, n2();
                  }
                }));
              } else r2(e2.sessionKeyRefreshFailedError);
            })(0);
          }));
        } }, { key: "_handleSessionToken", value: function(t2) {
          var n2 = this;
          t2 ? (O.get(this._iid).container.auth.sessionToken = t2, this._refreshSessionKey().then((function() {
            return n2._handleSessionRefreshSuccess();
          })).catch((function() {
            return n2._handleSessionRefreshError(e2.sessionTokenRequestFailedError);
          }))) : this._handleSessionClosed(e2.sessionTokenRequestFailedError);
        } }, { key: "_handleSessionRefreshSuccess", value: function() {
          this.handler.onSessionRefreshed(), this._flushResolvers(null);
        } }, { key: "_handleSessionRefreshError", value: function(e3) {
          this._cancelConnection(), this.handler.onSessionError(e3), this._flushResolvers(e3);
        } }, { key: "_handleSessionClosed", value: function(e3) {
          this._cancelConnection(), this.handler.onSessionClosed(), this._flushResolvers(e3);
        } }, { key: "_cancelConnection", value: function() {
          var e3 = wi.getInstance(this._iid);
          e3.reconnecting && (Object.keys(e3.connectionHandlers).forEach((function(t2) {
            e3.connectionHandlers[t2].onReconnectFailed();
          })), e3.reconnecting = false), e3.disconnect();
        } }, { key: "_flushResolvers", value: function(e3) {
          for (var t2 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null, n2 = 0; n2 < this.resolvers.length; n2++) e3 ? this.resolvers[n2].reject(e3) : this.resolvers[n2].resolve(t2);
          this.resolvers = [];
        } }, { key: "setHandler", value: function(e3) {
          e3 instanceof ve && (this.handler = e3);
        } }, { key: "isSessionError", value: function(e3) {
          return e3.isSessionTokenExpiredError || e3.isSessionTokenRevokedError || e3.isSessionKeyExpiredError;
        } }, { key: "refreshSessionToken", value: function() {
          var t2 = this;
          return new Promise((function(n2, r2) {
            t2.handler ? (t2.resolvers.push({ resolve: n2, reject: r2 }), 1 === t2.resolvers.length && t2._refreshSessionToken().then((function(e3) {
              return t2._handleSessionToken(e3);
            })).catch((function() {
              return t2._handleSessionRefreshError(e2.sessionTokenRequestFailedError);
            }))) : n2();
          }));
        } }, { key: "refreshSessionKey", value: function() {
          var e3 = this;
          return new Promise((function(t2, n2) {
            e3.handler ? (e3.resolvers.push({ resolve: t2, reject: n2 }), 1 === e3.resolvers.length && e3._refreshSessionKey().then((function() {
              return e3._handleSessionRefreshSuccess();
            })).catch((function(t3) {
              t3.isSessionTokenExpiredError ? e3._refreshSessionToken().then((function(t4) {
                return e3._handleSessionToken(t4);
              })).catch((function(t4) {
                return e3._handleSessionRefreshError(t4);
              })) : t3.isSessionTokenRevokedError ? e3._handleSessionClosed(t3) : e3._handleSessionRefreshError(t3);
            }))) : t2();
          }));
        } }, { key: "refreshSessionIfExpiredError", value: function(e3) {
          var t2 = this;
          return e3.isSessionTokenExpiredError ? this.refreshSessionToken() : e3.isSessionKeyExpiredError ? this.refreshSessionKey() : e3.isSessionTokenRevokedError ? new Promise((function(e4, n2) {
            return n2(t2.closeSession());
          })) : Promise.reject(e3);
        } }, { key: "closeSession", value: function() {
          var t2 = e2.sessionTokenRequestFailedError;
          return this._handleSessionClosed(t2), t2;
        } }], [{ key: "sessionTokenNotFoundError", get: function() {
          return new H("Session token is not found.", H.SESSION_TOKEN_EXPIRED);
        } }, { key: "sessionTokenExpiredError", get: function() {
          return new H("Session token is expired.", H.SESSION_TOKEN_EXPIRED);
        } }, { key: "sessionKeyRefreshFailedError", get: function() {
          return new H("Failed to refresh the session key.", H.SESSION_KEY_REFRESH_FAILED);
        } }, { key: "sessionTokenRequestFailedError", get: function() {
          return new H("Failed to get the session token.", H.SESSION_TOKEN_REQUEST_FAILED);
        } }]), e2;
      })(), Ce = (function() {
        function e2(e3) {
          var t2 = this;
          this.sb = e3, this.unsubscribes = [], this.isOnline = false, this.onlineWorker = function() {
            t2.isOnline = true;
            var e4 = O.get(t2.sb._iid).container.auth;
            t2.sb.reconnecting || t2.sb.connecting || !e4.sessionKey || t2.sb.getConnectionState() === t2.sb.ConnectionState.OPEN || t2.sb.reconnect();
          }, this.offlineWorker = function() {
            t2.isOnline = false, t2.sb.setIsProcessingAutoResend(false);
            var e4 = O.get(t2.sb._iid).container, n2 = e4.auth, r2 = e4.pinger;
            t2.sb.reconnecting || t2.sb.connecting || !n2.sessionKey || (r2 && r2.stop(), t2.sb.reconnect());
          }, this.onlineListener = function(e4) {
            try {
              if ("undefined" != typeof window && window.addEventListener && "ononline" in window && "onoffline" in window && "undefined" != typeof navigator && "boolean" == typeof navigator.onLine) return window.addEventListener("online", e4), function() {
                return window.removeEventListener("online", e4, false);
              };
            } catch (e5) {
              J.debug("There is no `window.addEventListener.ononline` or `navigator.onLine`");
            }
            return function() {
            };
          }, this.offlineListener = function(e4) {
            try {
              if ("undefined" != typeof window && window.addEventListener && "ononline" in window && "onoffline" in window && "undefined" != typeof navigator && "boolean" == typeof navigator.onLine) return window.addEventListener("offline", e4), function() {
                return window.removeEventListener("offline", e4, false);
              };
            } catch (e5) {
              J.debug("There is no `window.addEventListener.ononline` or `navigator.onLine`");
            }
            return function() {
            };
          }, this.setOnlineListener = function(e4) {
            Boolean(e4) && "function" == typeof e4 && (t2.onlineListener = e4);
          }, this.setOfflineListener = function(e4) {
            Boolean(e4) && "function" == typeof e4 && (t2.offlineListener = e4);
          }, this.sb = e3, "undefined" != typeof window && "undefined" != typeof navigator && "boolean" == typeof navigator.onLine && (this.isOnline = window.navigator.onLine);
        }
        return e2.prototype.start = function() {
          this.unsubscribes = [this.onlineListener(this.onlineWorker), this.offlineListener(this.offlineWorker)];
        }, e2.prototype.stop = function() {
          this.unsubscribes.forEach((function(e3) {
            try {
              null == e3 || e3();
            } catch (e4) {
            }
          }));
        }, e2;
      })(), Ae = (/* @__PURE__ */ new Date()).getTime(), Ne = (function() {
        function e2(t2, n2) {
          var r2 = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : null;
          switch (c(this, e2), this.command = t2, this.requestId = r2, arguments.length) {
            case 1:
              if (!t2 || t2.length <= 4) this.command = "NOOP", this.payload = "{}";
              else if (this.decode(t2), this.isRequestIdCommand) {
                var i2 = this.getJsonElement();
                i2 && (this.requestId = i2.req_id || "");
              }
              break;
            case 2:
            case 3:
              !this.requestId && this.isRequestIdCommand && (this.requestId = e2.generateRequestId()), n2.req_id = this.requestId || "", this.payload = JSON.stringify(n2);
          }
        }
        return h(e2, [{ key: "isRequestIdCommand", get: function() {
          return this.isAckRequired || "EROR" === this.command;
        } }, { key: "isAckRequired", get: function() {
          return "LOGI" === this.command || "MESG" === this.command || "FILE" === this.command || "ENTR" === this.command || "EXIT" === this.command || "READ" === this.command || "MEDI" === this.command || "FEDI" === this.command;
        } }, { key: "encode", value: function() {
          return this.command + this.payload + "\n";
        } }, { key: "decode", value: function(e3) {
          e3 = e3.trim(), this.command = e3.substring(0, 4), this.payload = e3.substring(4);
        } }, { key: "getJsonElement", value: function() {
          return JSON.parse(this.payload);
        } }], [{ key: "bSessionRefresh", value: function(e3) {
          return new this("LOGI", { token: e3.token, expiring_session: 1 }, e3.requestId);
        } }, { key: "bPing", value: function() {
          return new this("PING", { id: (/* @__PURE__ */ new Date()).getTime(), active: 1 });
        } }, { key: "bMessage", value: function(e3) {
          var t2 = e3.channelUrl, n2 = e3.message, r2 = e3.data, i2 = e3.customType, s2 = e3.metaArrays, a2 = e3.mentionType, o2 = e3.mentionedUserIds, l2 = e3.mentionedMessageTemplate, u2 = e3.translationTargetLanguages, c2 = e3.pushNotificationDeliveryOption, d2 = e3.appleCriticalAlertOptions, h2 = e3.requestId, p2 = void 0 === h2 ? null : h2, f2 = e3.silent, _2 = void 0 !== f2 && f2, g2 = e3.rootMessageId, y2 = void 0 === g2 ? null : g2, m2 = e3.parentMessageId, E2 = void 0 === m2 ? null : m2, v2 = e3.isReplyToChannel, b2 = void 0 !== v2 && v2, C2 = x.get(this._iid), A2 = C2.UserMessageParams, N2 = C2.BaseMessageParams, S2 = {};
          return S2.channel_url = t2, S2.message = n2, S2.data = r2, s2 && s2.length > 0 && (S2.metaarray = s2.map((function(e4) {
            return e4.encode();
          }))), a2 && (S2.mention_type = a2), S2.mentioned_user_ids = [], a2 === N2.MentionType.CHANNEL ? S2.mentioned_user_ids = [] : Array.isArray(o2) && o2.length > 0 && (S2.mentioned_user_ids = o2), l2 && (S2.mentioned_message_template = l2), i2 && (S2.custom_type = i2), u2 && u2.length > 0 && (S2.target_langs = u2), c2 && c2 !== A2.PushNotificationDeliveryOption.DEFAULT && (S2.push_option = c2), d2 && (S2.apple_critical_alert_options = d2.serialize()), _2 && (S2.silent = _2), y2 && (S2.root_message_id = y2), E2 && (S2.parent_message_id = E2), b2 && (S2.reply_to_channel = b2), new this("MESG", S2, p2);
        } }, { key: "bFile", value: function(e3) {
          var t2 = e3.channelUrl, n2 = e3.url, r2 = e3.name, i2 = e3.type, s2 = e3.size, a2 = e3.data, o2 = e3.customType, l2 = e3.thumbnailSizes, u2 = e3.requireAuth, c2 = e3.metaArrays, d2 = e3.mentionType, h2 = e3.mentionedUserIds, p2 = e3.pushNotificationDeliveryOption, f2 = e3.appleCriticalAlertOptions, _2 = e3.requestId, g2 = void 0 === _2 ? null : _2, y2 = e3.silent, m2 = void 0 !== y2 && y2, E2 = e3.rootMessageId, v2 = void 0 === E2 ? null : E2, b2 = e3.parentMessageId, C2 = void 0 === b2 ? null : b2, A2 = e3.isReplyToChannel, N2 = void 0 !== A2 && A2, S2 = x.get(this._iid), I2 = S2.BaseMessageParams, T2 = S2.FileMessageParams, U2 = {};
          return U2.channel_url = t2, U2.url = n2, U2.name = r2 || "", U2.type = i2 || "", U2.size = s2 || 0, U2.custom = a2, o2 && (U2.custom_type = o2), l2 && (U2.thumbnails = l2), u2 && (U2.require_auth = u2), c2 && c2.length > 0 && (U2.metaarray = c2.map((function(e4) {
            return e4.encode();
          }))), d2 && (U2.mention_type = d2), U2.mentioned_user_ids = [], d2 === I2.MentionType.CHANNEL ? U2.mentioned_user_ids = [] : Array.isArray(h2) && h2.length > 0 && (U2.mentioned_user_ids = h2), p2 && p2 !== T2.PushNotificationDeliveryOption.DEFAULT && (U2.push_option = p2), f2 && (U2.apple_critical_alert_options = f2.serialize()), m2 && (U2.silent = m2), v2 && (U2.root_message_id = v2), C2 && (U2.parent_message_id = C2), N2 && (U2.reply_to_channel = N2), new this("FILE", U2, g2);
        } }, { key: "bUpdateUserMessage", value: function(e3) {
          var t2 = e3.channelUrl, n2 = e3.messageId, r2 = e3.appleCriticalAlertOptions, i2 = e3.message, s2 = void 0 === i2 ? null : i2, a2 = e3.data, o2 = void 0 === a2 ? null : a2, l2 = e3.customType, u2 = void 0 === l2 ? null : l2, c2 = e3.mentionType, d2 = void 0 === c2 ? null : c2, h2 = e3.mentionedUserIds, p2 = void 0 === h2 ? null : h2, f2 = e3.mentionedMessageTemplate, _2 = void 0 === f2 ? null : f2, g2 = e3.metaArrayParams, y2 = void 0 === g2 ? null : g2, m2 = x.get(this._iid).BaseMessageParams, E2 = {};
          return E2.channel_url = t2, E2.msg_id = n2, null != s2 && void 0 !== s2 && (E2.message = s2), null != o2 && void 0 !== o2 && (E2.data = o2), null != u2 && void 0 !== u2 && (E2.custom_type = u2), d2 && (E2.mention_type = d2), d2 === m2.MentionType.CHANNEL ? E2.mentioned_user_ids = [] : Array.isArray(p2) && p2.length >= 0 && (E2.mentioned_user_ids = p2), _2 && (E2.mentioned_message_template = _2), y2 && (E2.metaarray = y2), r2 && (E2.apple_critical_alert_options = r2.serialize()), new this("MEDI", E2);
        } }, { key: "bUpdateFileMessage", value: function(e3) {
          var t2 = e3.channelUrl, n2 = e3.messageId, r2 = e3.appleCriticalAlertOptions, i2 = e3.data, s2 = void 0 === i2 ? null : i2, a2 = e3.customType, o2 = void 0 === a2 ? null : a2, l2 = e3.mentionType, u2 = void 0 === l2 ? null : l2, c2 = e3.mentionedUserIds, d2 = void 0 === c2 ? null : c2, h2 = e3.metaArrayParams, p2 = void 0 === h2 ? null : h2, f2 = x.get(this._iid).BaseMessageParams, _2 = {};
          return _2.channel_url = t2, _2.msg_id = n2, null != s2 && void 0 !== s2 && (_2.data = s2), null != o2 && void 0 !== o2 && (_2.custom_type = o2), u2 && (_2.mention_type = u2), u2 === f2.MentionType.CHANNEL ? _2.mentioned_user_ids = [] : Array.isArray(d2) && d2.length >= 0 && (_2.mentioned_user_ids = d2), p2 && (_2.metaarray = p2), r2 && (_2.apple_critical_alert_options = r2.serialize()), new this("FEDI", _2);
        } }, { key: "bRead", value: function(e3) {
          var t2 = e3.channelUrl, n2 = {};
          return n2.channel_url = t2, new this("READ", n2);
        } }, { key: "bMessageAck", value: function(e3) {
          var t2 = e3.channelUrl, n2 = e3.messageId, r2 = {};
          return r2.channel_url = t2, r2.msg_id = n2, new this("MACK", r2);
        } }, { key: "bTypeStart", value: function(e3) {
          var t2 = e3.channelUrl, n2 = e3.time, r2 = {};
          return r2.channel_url = t2, r2.time = n2, new this("TPST", r2);
        } }, { key: "bTypeEnd", value: function(e3) {
          var t2 = e3.channelUrl, n2 = e3.time, r2 = {};
          return r2.channel_url = t2, r2.time = n2, new this("TPEN", r2);
        } }, { key: "bEnter", value: function(e3) {
          var t2 = e3.channelUrl, n2 = {};
          return n2.channel_url = t2, new this("ENTR", n2);
        } }, { key: "bExit", value: function(e3) {
          var t2 = e3.channelUrl, n2 = {};
          return n2.channel_url = t2, new this("EXIT", n2);
        } }, { key: "generateRequestId", value: function() {
          return Ae++, String(Ae);
        } }]), e2;
      })(), Se = 1048576, Ie = (function() {
        function e2(e3) {
          void 0 === e3 && (e3 = {}), this._emojiHash = e3.emoji_hash || "", this._uploadSizeLimit = e3.file_upload_size_limit ? e3.file_upload_size_limit * Se : Number.MAX_VALUE, this._useReaction = !!e3.use_reaction, this._applicationAttributes = e3.application_attributes || [], this._premiumFeatureList = e3.premium_feature_list || [], this._disableSupergroupMack = e3.disable_supergroup_mack || false;
        }
        return Object.defineProperty(e2.prototype, "emojiHash", { get: function() {
          return this._emojiHash;
        }, enumerable: false, configurable: true }), Object.defineProperty(e2.prototype, "uploadSizeLimit", { get: function() {
          return this._uploadSizeLimit;
        }, enumerable: false, configurable: true }), Object.defineProperty(e2.prototype, "isUsingReaction", { get: function() {
          return this._useReaction;
        }, enumerable: false, configurable: true }), Object.defineProperty(e2.prototype, "applicationAttributes", { get: function() {
          return this._applicationAttributes;
        }, enumerable: false, configurable: true }), Object.defineProperty(e2.prototype, "premiumFeatureList", { get: function() {
          return this._premiumFeatureList;
        }, enumerable: false, configurable: true }), Object.defineProperty(e2.prototype, "isSupergroupMackDisabled", { get: function() {
          return this._disableSupergroupMack;
        }, enumerable: false, configurable: true }), Object.defineProperty(e2.prototype, "enabledChannelMemberShipHistory", { get: function() {
          return this._applicationAttributes.includes("channel_membership_history");
        }, enumerable: false, configurable: true }), e2.prototype._objectify = function() {
          var e3 = {};
          return e3.emoji_hash = this._emojiHash, this._uploadSizeLimit !== Number.MAX_VALUE && (e3.file_upload_size_limit = this._uploadSizeLimit / Se), e3.use_reaction = this._useReaction, e3.application_attributes = this._applicationAttributes, e3.premium_feature_list = this._premiumFeatureList, e3.disable_supergroup_mack = this._disableSupergroupMack, e3;
        }, e2;
      })(), Te = (function() {
        function e2(e3) {
          this._source = e3;
        }
        return Object.defineProperty(e2.prototype, "source", { get: function() {
          return this._source;
        }, enumerable: false, configurable: true }), Object.defineProperty(e2.prototype, "isFromEvent", { get: function() {
          return this._source >= 2e3;
        }, enumerable: false, configurable: true }), e2;
      })(), Ue = function(e2) {
        return L(void 0, void 0, void 0, (function() {
          return w(this, (function(t2) {
            return [2, new Promise((function(t3) {
              return setTimeout(t3, e2);
            }))];
          }));
        }));
      }, Oe = function() {
        var e2 = (/* @__PURE__ */ new Date()).getTime();
        return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (function(t2) {
          var n2 = (e2 + 16 * Math.random()) % 16 | 0;
          return e2 = Math.floor(e2 / 16), ("x" === t2 ? n2 : 3 & n2 | 8).toString(16);
        }));
      }, Me = /* @__PURE__ */ new Map(), ke = /* @__PURE__ */ new Map(), Re = (function() {
        function e2(t2) {
          var n2 = t2.key, r2 = t2.concurrentCallLimit, i2 = void 0 === r2 ? 2 : r2, s2 = t2.backOffDelay, a2 = void 0 === s2 ? 0 : s2;
          this._holdersKey = e2.createSemaphoreHoldersKey(n2), this._resolversKey = e2.createSemaphoreResolversKey(n2), this._numLocks = i2, this._backOffDelay = a2, this.holders || (this.holders = []), this.resolvers || (this.resolvers = []);
        }
        return e2.createSemaphoreHoldersKey = function(e3) {
          return "collection@semaphore_holders_for:" + e3;
        }, e2.createSemaphoreResolversKey = function(e3) {
          return "collection@semaphore_resolvers_for:" + e3;
        }, e2.createChainProcessStateKey = function(e3) {
          return "collection@semaphore_chain_process_state_for:" + e3;
        }, Object.defineProperty(e2.prototype, "numLocksAvailable", { get: function() {
          return this._numLocks - this.holders.length;
        }, enumerable: false, configurable: true }), Object.defineProperty(e2.prototype, "resolvers", { get: function() {
          return ke[this._resolversKey];
        }, set: function(e3) {
          ke[this._resolversKey] = e3;
        }, enumerable: false, configurable: true }), Object.defineProperty(e2.prototype, "holders", { get: function() {
          return Me[this._holdersKey];
        }, set: function(e3) {
          Me[this._holdersKey] = e3;
        }, enumerable: false, configurable: true }), e2.prototype.tryObtainLock = function() {
          this.numLocksAvailable > 0 && this.resolvers.length > 0 && this.giveLockToFirstResolver();
        }, e2.prototype.giveLockToFirstResolver = function() {
          var e3 = this.resolvers.shift();
          this.holders = P(P([], this.holders, true), [e3.key], false), e3.resolver(e3.key);
        }, e2.prototype.queueForLock = function() {
          return L(this, void 0, void 0, (function() {
            var e3 = this;
            return w(this, (function(t2) {
              return [2, new Promise((function(t3) {
                var n2 = { key: Oe(), resolver: function(e4) {
                  return t3(e4);
                } };
                e3.resolvers.push(n2), e3.tryObtainLock();
              }))];
            }));
          }));
        }, e2.prototype.releaseLock = function(e3) {
          return L(this, void 0, void 0, (function() {
            var t2;
            return w(this, (function(n2) {
              switch (n2.label) {
                case 0:
                  return (t2 = this.holders.indexOf(e3)) >= 0 ? (this.holders.splice(t2, 1), [4, Ue(this._backOffDelay)]) : [3, 2];
                case 1:
                  n2.sent(), this.tryObtainLock(), n2.label = 2;
                case 2:
                  return [2];
              }
            }));
          }));
        }, e2;
      })();
      !(function(e2) {
        e2[e2.IDLE = 0] = "IDLE", e2[e2.RUNNING = 1] = "RUNNING", e2[e2.END = 2] = "END";
      })(fe || (fe = {}));
      var Le, we = function() {
      }, Pe = (function() {
        function e2(e3, t2, n2, r2) {
          void 0 === n2 && (n2 = 2), void 0 === r2 && (r2 = 10), this._worker = null, this._state = fe.IDLE, this._retryCount = 0, this._retryLimit = 3, this._isPaused = false, this.onProgress = we, this.onStop = we, this.onError = we, this.onEnd = we, this._key = e3, this._worker = t2, this._semaphore = new Re({ key: e3, concurrentCallLimit: n2, backOffDelay: r2 });
        }
        return Object.defineProperty(e2.prototype, "isIdle", { get: function() {
          return this._state === fe.IDLE;
        }, enumerable: false, configurable: true }), Object.defineProperty(e2.prototype, "isRunning", { get: function() {
          return this._state === fe.RUNNING;
        }, enumerable: false, configurable: true }), Object.defineProperty(e2.prototype, "isDone", { get: function() {
          return this._state === fe.END;
        }, enumerable: false, configurable: true }), Object.defineProperty(e2.prototype, "isPaused", { get: function() {
          return this._isPaused;
        }, enumerable: false, configurable: true }), Object.defineProperty(e2.prototype, "retryCount", { get: function() {
          return this._retryCount;
        }, enumerable: false, configurable: true }), Object.defineProperty(e2.prototype, "retryLimit", { get: function() {
          return this._retryLimit;
        }, enumerable: false, configurable: true }), e2.prototype.resume = function(e3, t2) {
          return void 0 === t2 && (t2 = false), this._isPaused = false, this.isDone && t2 && (this._state = fe.IDLE), this.run(e3);
        }, e2.prototype.run = function(e3) {
          return L(this, void 0, void 0, (function() {
            var t2, n2, r2;
            return w(this, (function(i2) {
              switch (i2.label) {
                case 0:
                  return this._isPaused || !this.isIdle ? [3, 5] : (t2 = this, [4, this._semaphore.queueForLock()]);
                case 1:
                  t2._key = i2.sent(), this._state = fe.RUNNING, i2.label = 2;
                case 2:
                  return i2.trys.push([2, 4, , 5]), [4, this._worker(e3)];
                case 3:
                  return n2 = i2.sent(), this._retryCount = 0, this.onProgress(n2), n2.hasNext ? (this._state = fe.IDLE, this._isPaused ? (this._semaphore.releaseLock(this._key), this.onStop()) : (this.run(n2.nextParams), this._semaphore.releaseLock(this._key))) : (this._state = fe.END, this._semaphore.releaseLock(this._key), this.onEnd(), this._isPaused && this.onStop()), [3, 5];
                case 4:
                  return r2 = i2.sent(), J.warn("Collection sync run error: ", r2), this._state = fe.IDLE, this._semaphore.releaseLock(this._key), this.onError(r2), this._retryCount < this._retryLimit ? (this._retryCount++, J.debug("Failed collection sync retry count: ", this._retryCount), this.run(e3)) : (J.debug("Failed collection sync all retries failed."), this.stop(), this.onStop()), [3, 5];
                case 5:
                  return [2];
              }
            }));
          }));
        }, e2.prototype.stop = function() {
          this._isPaused = true;
        }, e2;
      })(), De = (function() {
        function e2(e3) {
          var t2 = e3.top, n2 = e3.bottom;
          this.top = t2, this.bottom = n2;
        }
        return e2.prototype.include = function(e3) {
          return this.top <= e3 && e3 <= this.bottom;
        }, e2.prototype.overlap = function(e3) {
          return this.include(e3.top) || this.include(e3.bottom);
        }, e2;
      })(), He = {}, Fe = (function() {
        function e2(e3) {
          var t2 = e3.iid, n2 = e3.limit, r2 = void 0 === n2 ? We : n2, i2 = this;
          this._token = "", this._sync = null, this._syncRange = new De({ top: Number.MAX_SAFE_INTEGER, bottom: 0 }), this._completed = false, this._pkIndex = Date.now(), this._iid = t2, this._limit = r2;
          var s2 = x.get(this._iid).GroupChannel, a2 = O.get(this._iid), o2 = a2.get("currentUserId"), l2 = a2.get("apiClient"), u2 = a2.get("store"), c2 = $e.of(this._iid), d2 = ge.of(this._iid), h2 = "sendbird:".concat(o2, "@groupchannel/sync");
          this._sync = new Pe(h2, (function(e4) {
            return L(i2, void 0, void 0, (function() {
              var e5, t3, n3, r3, i3, a3, o3 = this;
              return w(this, (function(p2) {
                switch (p2.label) {
                  case 0:
                    return e5 = { hasNext: true, nextParams: "" }, [4, u2.get(h2)];
                  case 1:
                    if ((t3 = p2.sent()) && t3.completed) return [3, 10];
                    t3 && (this._token = t3.token, this._syncRange = t3.range, this._pkIndex = t3.primaryKeyIndex), n3 = { token: this._token, limit: this._limit, includeEmpty: true, order: "chronological" }, p2.label = 2;
                  case 2:
                    return p2.trys.push([2, 6, , 9]), [4, l2.loadGroupChannelList(n3)];
                  case 3:
                    return r3 = p2.sent(), i3 = r3.channels.map((function(e6) {
                      return r3.ts && (e6.ts = r3.ts), e6.cached_primary_key = o3._pkIndex--, s2.upsert(e6);
                    })), this._syncRange.top = Math.min(this._syncRange.top, Math.min.apply(Math, i3.map((function(e6) {
                      return e6.createdAt;
                    })))), this._syncRange.bottom = Math.max(this._syncRange.bottom, Math.max.apply(Math, i3.map((function(e6) {
                      return e6.createdAt;
                    })))), e5.hasNext = i3.length >= this._limit, e5.nextParams = this._token = r3.next, this._token || (e5.hasNext = false), this._completed = !e5.hasNext, J.debug("Group channel collection background sync fetched channels count: ", i3.length), [4, c2.upsert(i3)];
                  case 4:
                    return p2.sent(), [4, u2.set({ key: h2, value: { token: this._token, range: this._syncRange, completed: this._completed, primaryKeyIndex: this._pkIndex }, generation: 1 })];
                  case 5:
                    return p2.sent(), a3 = { source: de.CHANNEL_BACKGROUND, payload: { channels: i3 } }, d2.send(a3), [3, 9];
                  case 6:
                    return p2.sent().isInvalidTokenError ? [4, u2.remove(h2)] : [3, 8];
                  case 7:
                    p2.sent(), p2.label = 8;
                  case 8:
                    return [3, 9];
                  case 9:
                    return [3, 11];
                  case 10:
                    J.debug("Group channel collection background sync has finished."), e5.hasNext = false, p2.label = 11;
                  case 11:
                    return [2, e5];
                }
              }));
            }));
          }));
        }
        return e2.of = function(t2, n2) {
          return void 0 === n2 && (n2 = We), He[t2] || (He[t2] = new e2({ iid: t2, limit: n2 })), He[t2];
        }, Object.defineProperty(e2.prototype, "range", { get: function() {
          return this._syncRange;
        }, enumerable: false, configurable: true }), Object.defineProperty(e2.prototype, "completed", { get: function() {
          return this._completed;
        }, enumerable: false, configurable: true }), e2.prototype.resume = function() {
          J.debug("Group channel collection background sync has resumed."), this._sync.resume("");
        }, e2.prototype.pause = function() {
          J.debug("Group channel collection background sync has paused."), this._sync.stop();
        }, e2;
      })(), Ge = {}, xe = (function() {
        function e2(e3) {
          var t2 = e3.iid, n2 = this;
          this._token = 0, this._sync = null, this._pkIndex = Date.now(), this._iid = t2;
          var r2 = x.get(this._iid).GroupChannel, i2 = O.get(this._iid);
          this._token = i2.get("firstConnectedAt") / 1e3;
          var s2 = i2.get("currentUserId"), a2 = i2.get("store"), o2 = i2.get("apiClient"), l2 = i2.container.localCacheEnabled, u2 = $e.of(this._iid), c2 = ge.of(this._iid), d2 = "sendbird:".concat(s2, "@groupchannel/changelogs");
          this._sync = new Pe(d2, (function(e4) {
            return L(n2, void 0, void 0, (function() {
              var e5, t3, n3, i3, s3, h2, p2, f2, _2 = this;
              return w(this, (function(g2) {
                switch (g2.label) {
                  case 0:
                    return e5 = { hasNext: true, nextParams: "" }, l2 ? [4, a2.get(d2)] : [3, 2];
                  case 1:
                    return n3 = g2.sent(), [3, 3];
                  case 2:
                    n3 = null, g2.label = 3;
                  case 3:
                    (t3 = n3) && (this._token = t3.token, this._pkIndex = t3.primaryKeyIndex), i3 = {}, "number" == typeof this._token ? i3.ts = this._token : i3.token = this._token, g2.label = 4;
                  case 4:
                    return g2.trys.push([4, 10, , 13]), [4, o2.getMyGroupChannelChangeLogs(i3)];
                  case 5:
                    return s3 = g2.sent(), h2 = { updatedChannels: s3.updated.map((function(e6) {
                      return e6.cached_primary_key = _2._pkIndex--, r2.upsert(e6);
                    })), deletedChannelUrls: s3.deleted }, e5.hasNext = s3.has_more, (h2.updatedChannels.length > 0 || h2.deletedChannelUrls.length > 0) && (e5.nextParams = this._token = s3.next), J.debug("Group channel collection changelog sync update channels count: ", h2.updatedChannels.length), J.debug("Group channel collection changelog sync deleted channel urls count: ", h2.deletedChannelUrls.length), l2 ? [4, u2.upsert(h2.updatedChannels)] : [3, 9];
                  case 6:
                    return g2.sent(), [4, u2.remove(h2.deletedChannelUrls)];
                  case 7:
                    return g2.sent(), [4, a2.set({ key: d2, value: { token: this._token, primaryKeyIndex: this._pkIndex }, generation: 1 })];
                  case 8:
                    g2.sent(), g2.label = 9;
                  case 9:
                    return p2 = { source: de.CHANNEL_CHANGELOG, payload: h2 }, c2.send(p2), [2, e5];
                  case 10:
                    return (f2 = g2.sent()).isInvalidTokenError ? [4, a2.remove(d2)] : [3, 12];
                  case 11:
                    g2.sent(), g2.label = 12;
                  case 12:
                    throw f2;
                  case 13:
                    return [2];
                }
              }));
            }));
          }));
        }
        return e2.of = function(t2) {
          return Ge[t2] || (Ge[t2] = new e2({ iid: t2 })), Ge[t2];
        }, e2.prototype.resume = function() {
          J.debug("Group channel collection changelog sync has resumed."), this._sync.resume(0, true);
        }, e2.prototype.pause = function() {
          J.debug("Group channel collection changelog sync has paused."), this._sync.stop();
        }, e2;
      })(), je = function(e2, t2) {
        for (var n2 = 0; n2 < e2.length; n2++) if (e2[n2].url === t2.url) return n2;
        return -1;
      }, Be = function(e2, t2, n2) {
        if (e2.length > 0) {
          for (var r2 = 0, i2 = e2.length - 1, s2 = Math.floor((r2 + i2) / 2); r2 < i2; ) {
            var a2 = qe(e2[s2], t2, n2);
            if (a2 > 0) i2 = s2, s2 = Math.floor((r2 + i2) / 2);
            else {
              if (!(a2 < 0)) return s2;
              r2 = s2 + 1, s2 = Math.floor((r2 + i2) / 2);
            }
          }
          return qe(e2[s2], t2, n2) > 0 ? s2 : s2 + 1;
        }
        return e2.length;
      }, Ve = function(e2, t2) {
        return t2 - e2;
      }, qe = function(e2, t2, n2) {
        switch (n2) {
          case Le.LATEST_LAST_MESSAGE:
            if (e2.lastMessage && !t2.lastMessage) return -1;
            if (!e2.lastMessage && t2.lastMessage) return 1;
            if (e2.lastMessage && t2.lastMessage) {
              var r2 = e2.lastMessage.createdAt;
              if (0 === (s2 = t2.lastMessage.createdAt - r2)) {
                var i2 = e2.createdAt;
                0 === (s2 = t2.createdAt - i2) && (s2 = Ve(e2.cachedPrimaryKey, t2.cachedPrimaryKey));
              }
              return s2;
            }
            r2 = e2.createdAt;
            return 0 === (s2 = t2.createdAt - r2) && (s2 = Ve(e2.cachedPrimaryKey, t2.cachedPrimaryKey)), s2;
          case Le.CHRONOLOGICAL:
            return 0 === (s2 = t2.createdAt - e2.createdAt) && (s2 = Ve(e2.cachedPrimaryKey, t2.cachedPrimaryKey)), s2;
          case Le.CHANNEL_NAME_ALPHABETICAL:
            var s2;
            return 0 === (s2 = e2.name.localeCompare(t2.name)) && (s2 = Ve(e2.cachedPrimaryKey, t2.cachedPrimaryKey)), s2;
        }
      }, Ke = function() {
      }, ze = { NAME_ALPHABETICAL: ["name", "-pk"], CHRONOLOGICAL: ["-createdAt", "-pk"], LATEST_LAST_MESSAGE: ["-lastMessageCreatedAt", "-createdAt", "-pk"] }, Ye = { LATEST: ["channelUrl", "-createdAt", "-messageId"], LATEST_UNSENT: ["channelUrl", "sendingStatus", "createdAt"], CHILD_MESSAGE_FIRST: ["channelUrl", "-parentMessageId", "-createdAt"] }, Qe = (function() {
        function e2() {
        }
        return e2.prototype.isNetworkConnected = function() {
          return !("undefined" == typeof navigator || !navigator.onLine);
        }, e2.ready = function() {
          return L(this, void 0, void 0, (function() {
            return w(this, (function(e3) {
              return "undefined" != typeof navigator && navigator && "boolean" == typeof navigator.onLine ? [2, navigator.onLine] : [2, new Promise((function(e4, t2) {
                i.default.get("https://www.google.com").then((function() {
                  return e4(true);
                })).catch((function() {
                  return e4(false);
                }));
              }))];
            }));
          }));
        }, e2;
      })(), We = 40;
      !(function(e2) {
        e2.LATEST_LAST_MESSAGE = "latest_last_message", e2.CHRONOLOGICAL = "chronological", e2.CHANNEL_NAME_ALPHABETICAL = "channel_name_alphabetical";
      })(Le || (Le = {}));
      var Je, Xe = (function() {
        function e2(e3) {
          var t2 = e3.iid, n2 = e3.filter, r2 = e3.order, i2 = e3.limit, s2 = void 0 === i2 ? 20 : i2, a2 = this;
          this._channels = [], this._token = null, this._hasMore = true, this._iid = t2, this._filter = n2, this._order = r2, this._limit = s2, this._syncLimit = Math.max(s2, We), this._eventObserver = { onevent: function(e4) {
            return L(a2, void 0, void 0, (function() {
              return w(this, (function(t3) {
                return [2, this._handleEvent(e4)];
              }));
            }));
          } }, this._eventHandler = { onChannelsAdded: Ke, onChannelsUpdated: Ke, onChannelsDeleted: Ke };
          var o2 = O.get(this._iid);
          this._localCacheEnabled = o2.container.localCacheEnabled, this._localCacheEnabled && (this._backgroundSync = Fe.of(this._iid, this._syncLimit), this._backgroundSync.resume()), this._changelogSync = xe.of(this._iid), this._changelogSync.resume(), ge.of(this._iid).addObserver(this._eventObserver), this._connectionStateObserver = { onConnect: function() {
            a2._localCacheEnabled && a2._backgroundSync.resume(), a2._changelogSync.resume();
          }, onDisconnect: function() {
            return L(a2, void 0, void 0, (function() {
              return w(this, (function(e4) {
                switch (e4.label) {
                  case 0:
                    return [4, Qe.ready()];
                  case 1:
                    return e4.sent() || (this._localCacheEnabled && this._backgroundSync.pause(), this._changelogSync.pause()), [2];
                }
              }));
            }));
          } }, pe.of(this._iid).addObserver(this._connectionStateObserver);
        }
        return e2.prototype._handleEvent = function(e3) {
          var t2 = this, n2 = e3.source, r2 = e3.payload, i2 = O.get(this._iid), s2 = new Te(n2);
          switch (n2) {
            case de.CHANNEL_BACKGROUND:
              break;
            case de.CHANNEL_CHANGELOG:
              var a2 = r2, o2 = a2.updatedChannels, l2 = a2.deletedChannelUrls, u2 = o2.filter((function(e4) {
                return t2._filter.match(e4);
              }));
              this._addChannelsToView(u2, { context: s2 }), this._removeChannelsFromView(l2, { context: s2 });
              break;
            case de.EVENT_USER_DECLINED_INVITATION:
              var c2 = i2.get("currentUserId"), d2 = r2, h2 = d2.channel;
              d2.invitee.userId === c2 ? this._removeChannelsFromView([h2.url], { context: s2 }) : this._filter.match(h2) ? this._addChannelsToView([h2], { context: s2 }) : this._removeChannelsFromView([h2.url], { context: s2 });
              break;
            case de.EVENT_USER_LEFT:
              c2 = i2.get("currentUserId");
              var p2 = r2;
              h2 = p2.channel;
              p2.user.userId === c2 ? this._removeChannelsFromView([h2.url], { context: s2 }) : this._filter.match(h2) ? this._addChannelsToView([h2], { context: s2 }) : this._removeChannelsFromView([h2.url], { context: s2 });
              break;
            case de.EVENT_USER_BANNED:
            case de.EVENT_USER_UNBANNED:
              break;
            case de.EVENT_USER_MUTED:
            case de.EVENT_USER_UNMUTED:
            case de.EVENT_TYPING_STATUS_UPDATED:
            case de.EVENT_OPERATOR_UPDATED:
            case de.EVENT_CHANNEL_METADATA_UPDATED:
            case de.EVENT_CHANNEL_METADATA_DELETED:
            case de.EVENT_CHANNEL_METACOUNTER_UPDATED:
            case de.EVENT_CHANNEL_METACOUNTER_DELETED:
              h2 = r2.channel;
              this._filter.match(h2) ? this._addChannelsToView([h2], { context: s2 }) : this._removeChannelsFromView([h2.url], { context: s2 });
              break;
            case de.EVENT_READ_RECEIPT_UPDATED:
            case de.EVENT_USER_RECEIVED_INVITATION:
            case de.EVENT_USER_JOINED:
            case de.EVENT_CHANNEL_FROZEN:
            case de.EVENT_CHANNEL_UNFROZEN:
            case de.EVENT_CHANNEL_HIDDEN:
            case de.EVENT_CHANNEL_UNHIDDEN:
            case de.EVENT_CHANNEL_CHANGED:
              h2 = r2.channel;
              this._filter.match(h2) ? this._addChannelsToView([h2], { context: s2 }) : this._removeChannelsFromView([h2.url], { context: s2 });
              break;
            case de.EVENT_CHANNEL_DELETED:
              var f2 = r2.channelUrl;
              this._removeChannelsFromView([f2], { context: s2 });
          }
        }, e2.prototype._getRemoteChannels = function() {
          return L(this, void 0, void 0, (function() {
            var e3, t2, n2, r2;
            return w(this, (function(i2) {
              switch (i2.label) {
                case 0:
                  return e3 = x.get(this._iid).GroupChannel, t2 = O.get(this._iid), [4, t2.get("apiClient").loadGroupChannelList(R(R({}, this._filter), { order: this._order, token: this._token, limit: this._limit, userIdsFilter: this._filter.userIdsFilter, searchFilter: (s2 = this._filter.searchFilter, s2.searchQuery && s2.searchFields ? { search_query: s2.searchQuery, search_fields: s2.searchFields.join(",").toLocaleLowerCase() } : {}) }))];
                case 1:
                  return n2 = i2.sent(), r2 = n2.channels.map((function(t3) {
                    return "number" == typeof n2.ts && (t3.ts = n2.ts), e3.upsert(t3);
                  })), [4, $e.of(this._iid).upsert(r2)];
                case 2:
                  return i2.sent(), [2, [r2, n2.next]];
              }
              var s2;
            }));
          }));
        }, e2.prototype._addChannelsToView = function(e3, t2) {
          void 0 === t2 && (t2 = {});
          for (var n2 = t2.context, r2 = void 0 === n2 ? null : n2, i2 = [], s2 = [], a2 = 0, o2 = e3; a2 < o2.length; a2++) {
            var l2 = o2[a2], u2 = je(this._channels, l2);
            if (u2 < 0) {
              i2.push(l2), (c2 = Be(this._channels, l2, this._order)) === this._channels.length ? this._channels.push(l2) : this._channels.splice(c2, 0, l2);
            } else {
              s2.push(l2), this._channels.splice(u2, 1);
              var c2 = Be(this._channels, l2, this._order);
              this._channels.splice(c2, 0, l2);
            }
          }
          r2 && (i2.length > 0 && this._eventHandler.onChannelsAdded(r2, i2), s2.length > 0 && this._eventHandler.onChannelsUpdated(r2, s2));
        }, e2.prototype._removeChannelsFromView = function(e3, t2) {
          void 0 === t2 && (t2 = {});
          for (var n2 = t2.context, r2 = void 0 === n2 ? null : n2, i2 = [], s2 = 0, a2 = e3; s2 < a2.length; s2++) {
            var o2 = a2[s2], l2 = this._channels.map((function(e4) {
              return e4.url;
            })).indexOf(o2);
            l2 >= 0 && (i2.push(this._channels[l2].url), this._channels.splice(l2, 1));
          }
          return r2 && i2.length > 0 && this._eventHandler.onChannelsDeleted(r2, i2), i2;
        }, Object.defineProperty(e2.prototype, "channelList", { get: function() {
          return this._channels;
        }, enumerable: false, configurable: true }), Object.defineProperty(e2.prototype, "hasMore", { get: function() {
          return this._hasMore;
        }, enumerable: false, configurable: true }), e2.prototype.loadMore = function() {
          return L(this, void 0, void 0, (function() {
            var e3, t2, n2, r2, i2;
            return w(this, (function(s2) {
              switch (s2.label) {
                case 0:
                  return this._hasMore ? [4, Qe.ready()] : [3, 5];
                case 1:
                  return s2.sent() ? [3, 3] : (J.debug("Group channel collection loadMore() from the cache."), e3 = $e.of(this._iid), t2 = e3.getNextContainerToken(this._order, this._channels), [4, e3.getNextChannels(this._filter, this._order, t2, this._limit)]);
                case 2:
                  return r2 = s2.sent(), this._addChannelsToView(r2), [2, r2];
                case 3:
                  return J.debug("Group channel collection loadMore() from the server."), [4, this._getRemoteChannels()];
                case 4:
                  return n2 = s2.sent(), r2 = n2[0], i2 = n2[1], this._token = i2, this._token || (this._hasMore = false), this._addChannelsToView(r2), [2, r2];
                case 5:
                  return [2, []];
              }
            }));
          }));
        }, e2.prototype.dispose = function() {
          pe.of(this._iid).removeObserver(this._connectionStateObserver), this._localCacheEnabled && this._backgroundSync.pause(), this._changelogSync.pause(), ge.of(this._iid).removeObserver(this._eventObserver);
        }, e2.prototype.setGroupChannelCollectionHandler = function(e3) {
          this._eventHandler = e3;
        }, e2.GroupChannelOrder = Le, e2;
      })(), Ze = {}, $e = (function() {
        function e2(e3) {
          var t2 = e3.iid, n2 = e3.collection, r2 = void 0 === n2 ? null : n2;
          this._collection = null, this._pkIndex = Date.now(), this._lastFetchedPrimaryKey = Date.now(), this._iid = t2, this._collection = r2, Ze[t2] = this;
        }
        return e2.of = function(e3) {
          return Ze[e3];
        }, e2.prototype._serialize = function(e3) {
          var t2 = this._createPk();
          return e3.cachedPrimaryKey = t2, R(R({}, e3.serialize()), { lastMessageCreatedAt: e3.lastMessage ? e3.lastMessage.createdAt : -1, pk: t2 });
        }, e2.prototype._deserialize = function(e3) {
          return e3 ? x.get(this._iid).GroupChannel.buildFromSerializedData(e3) : null;
        }, Object.defineProperty(e2.prototype, "_localCacheEnabled", { get: function() {
          return O.get(this._iid).get("localCacheEnabled");
        }, enumerable: false, configurable: true }), e2.prototype._createPk = function() {
          return this._pkIndex++;
        }, e2.prototype._fetch = function(e3, t2, n2) {
          return L(this, void 0, void 0, (function() {
            var r2, i2, s2, a2, o2, l2, u2, c2 = this;
            return w(this, (function(d2) {
              switch (d2.label) {
                case 0:
                  if (!this._localCacheEnabled) return [3, 2];
                  switch (r2 = ze.LATEST_LAST_MESSAGE, t2) {
                    case Le.CHANNEL_NAME_ALPHABETICAL:
                      r2 = ze.NAME_ALPHABETICAL;
                      break;
                    case Le.CHRONOLOGICAL:
                      r2 = ze.CHRONOLOGICAL;
                      break;
                    case Le.LATEST_LAST_MESSAGE:
                      r2 = ze.LATEST_LAST_MESSAGE;
                  }
                  return i2 = n2.containerToken, s2 = i2.lastMessageCreatedAt, a2 = i2.createdAt, o2 = i2.name, l2 = i2.lastFetchedPrimaryKey, u2 = { where: function(n3) {
                    switch (t2) {
                      case Le.LATEST_LAST_MESSAGE:
                        if (n3.lastMessageCreatedAt > s2) return false;
                        if (n3.lastMessageCreatedAt === s2 && Ve(l2, n3.pk) >= 0) return false;
                        if (n3.lastMessageCreatedAt < 0) {
                          if (n3.createdAt > a2) return false;
                          if (n3.createdAt === a2 && Ve(l2, n3.pk) >= 0) return false;
                        }
                        break;
                      case Le.CHANNEL_NAME_ALPHABETICAL:
                        var r3 = n3.name.localeCompare(o2);
                        if (r3 < 0) return false;
                        if (0 === r3 && Ve(l2, n3.pk) >= 0) return false;
                        break;
                      case Le.CHRONOLOGICAL:
                        if (n3.createdAt > a2) return false;
                        if (n3.createdAt === a2 && Ve(l2, n3.pk) >= 0) return false;
                    }
                    return e3.match(c2._deserialize(n3));
                  }, index: r2 }, [4, this._collection.query(u2).fetch({ limit: n2.limit })];
                case 1:
                  return [2, d2.sent().map((function(e4) {
                    return c2._deserialize(e4);
                  }))];
                case 2:
                  return [2, []];
              }
            }));
          }));
        }, e2.prototype.getNextContainerToken = function(e3, t2) {
          switch (e3) {
            case Le.LATEST_LAST_MESSAGE:
              return t2.length > 0 ? { lastMessageCreatedAt: (n2 = t2[t2.length - 1]).lastMessage ? n2.lastMessage.createdAt : -1, createdAt: n2.createdAt, lastFetchedPrimaryKey: n2.cachedPrimaryKey } : { lastMessageCreatedAt: Number.MAX_SAFE_INTEGER, createdAt: Number.MAX_SAFE_INTEGER, lastFetchedPrimaryKey: this._lastFetchedPrimaryKey };
            case Le.CHRONOLOGICAL:
              return t2.length > 0 ? { createdAt: (n2 = t2[t2.length - 1]).createdAt, lastFetchedPrimaryKey: n2.cachedPrimaryKey } : { createdAt: Number.MAX_SAFE_INTEGER, lastFetchedPrimaryKey: this._lastFetchedPrimaryKey };
            case Le.CHANNEL_NAME_ALPHABETICAL:
              var n2;
              return t2.length > 0 ? { name: (n2 = t2[t2.length - 1]).name, lastFetchedPrimaryKey: n2.cachedPrimaryKey } : { name: "", lastFetchedPrimaryKey: this._lastFetchedPrimaryKey };
          }
        }, e2.prototype.get = function(e3) {
          return L(this, void 0, void 0, (function() {
            var t2;
            return w(this, (function(n2) {
              switch (n2.label) {
                case 0:
                  return this._localCacheEnabled ? (t2 = this._deserialize, [4, this._collection.getByKey(e3)]) : [3, 2];
                case 1:
                  return [2, t2.apply(this, [n2.sent()])];
                case 2:
                  return [2, null];
              }
            }));
          }));
        }, e2.prototype.getNextChannels = function(e3, t2, n2, r2) {
          return void 0 === r2 && (r2 = 100), L(this, void 0, void 0, (function() {
            return w(this, (function(i2) {
              switch (i2.label) {
                case 0:
                  return [4, this._fetch(e3, t2, { containerToken: n2, limit: r2 })];
                case 1:
                  return [2, i2.sent()];
              }
            }));
          }));
        }, e2.prototype.upsert = function(e3) {
          return L(this, void 0, void 0, (function() {
            var t2, n2 = this;
            return w(this, (function(r2) {
              switch (r2.label) {
                case 0:
                  return this._localCacheEnabled ? (t2 = e3.map((function(e4) {
                    return n2._serialize(e4);
                  })), [4, this._collection.upsertMany(t2)]) : [3, 2];
                case 1:
                  r2.sent(), r2.label = 2;
                case 2:
                  return [2];
              }
            }));
          }));
        }, e2.prototype.remove = function(e3) {
          return L(this, void 0, void 0, (function() {
            return w(this, (function(t2) {
              switch (t2.label) {
                case 0:
                  return this._localCacheEnabled ? [4, this._collection.removeIf({ where: { url: { "/in": e3 } } })] : [3, 3];
                case 1:
                  return t2.sent(), [4, wi.getInstance(this._iid).clearCachedMessages(e3)];
                case 2:
                  t2.sent(), t2.label = 3;
                case 3:
                  return [2];
              }
            }));
          }));
        }, e2.prototype.clear = function() {
          return L(this, void 0, void 0, (function() {
            return w(this, (function(e3) {
              switch (e3.label) {
                case 0:
                  return this._localCacheEnabled ? [4, this._collection.clear()] : [3, 2];
                case 1:
                  e3.sent(), e3.label = 2;
                case 2:
                  return [2];
              }
            }));
          }));
        }, e2;
      })(), et = (function() {
        function e2() {
          this.messageType = "", this.customTypes = ["*"], this.senderUserIds = [], this.sendingStatus = null;
        }
        return e2.prototype.clone = function() {
          var t2 = new e2(), n2 = JSON.parse(JSON.stringify(this));
          return Object.keys(n2).forEach((function(e3) {
            t2[e3] = n2[e3];
          })), t2;
        }, e2.prototype.match = function(e3) {
          if (this.messageType && this.messageType !== e3.messageType) return false;
          if (!this.customTypes.includes("*") && !this.customTypes.includes(e3.customType)) return false;
          if (this.senderUserIds.length > 0) {
            if (!e3.isUserMessage() && !e3.isFileMessage()) return false;
            if (!this.senderUserIds.includes(e3.sender.userId)) return false;
          }
          return !this.sendingStatus || this.sendingStatus === e3.sendingStatus;
        }, e2;
      })(), tt = function(e2, t2) {
        if (e2.length > 0) {
          for (var n2 = 0, r2 = e2.length - 1, i2 = Math.floor((n2 + r2) / 2); n2 < r2; ) {
            var s2 = e2[i2].createdAt - t2.createdAt;
            if (s2 > 0) r2 = i2, i2 = Math.floor((n2 + r2) / 2);
            else {
              if (!(s2 < 0)) return i2;
              n2 = i2 + 1, i2 = Math.floor((n2 + r2) / 2);
            }
          }
          return e2[i2].createdAt > t2.createdAt ? i2 : i2 + 1;
        }
        return e2.length;
      }, nt = function(e2) {
        var t2 = e2.channel, n2 = e2.ts, r2 = e2.prevLimit, i2 = void 0 === r2 ? 0 : r2, s2 = e2.nextLimit, a2 = void 0 === s2 ? 0 : s2, o2 = e2.filter, l2 = { channel: t2, token: n2, tokenType: "timestamp", isInclusive: true, prevResultSize: i2, nextResultSize: a2, shouldReverse: false, includeMetaArray: true, includeReactions: true, includeThreadInfo: true, includeReplies: true, includeParentMessageText: true, showSubchannelMessagesOnly: true };
        if (o2) {
          var u2 = o2.messageType, c2 = o2.customTypes, d2 = o2.senderUserIds;
          u2 && (l2.messageType = u2), c2.length > 0 && (l2.customTypes = c2), d2.length > 0 && (l2.senderUserIds = d2);
        }
        return l2;
      }, rt = function(e2, t2, n2) {
        if (n2.length > 0) {
          var r2 = n2.map((function(e3) {
            return e3.createdAt;
          }));
          t2.includes("prev") && (e2.top = Math.min.apply(Math, P([e2.top], r2, false))), t2.includes("next") && (e2.bottom = Math.max.apply(Math, P([e2.bottom], r2, false)));
        }
      }, it = function(e2) {
        return new Promise((function(t2, n2) {
          setTimeout((function() {
            return t2();
          }), e2);
        }));
      }, st = {};
      !(function(e2) {
        e2.SUCCEEDED = "succeeded", e2.UNSENT = "unsent";
      })(Je || (Je = {}));
      var at, ot = (function() {
        function e2(e3) {
          var t2 = e3.iid, n2 = e3.collections;
          this._iid = t2, this._collections = n2, st[t2] = this;
        }
        return e2.of = function(e3) {
          return st[e3];
        }, e2.prototype._serialize = function(e3) {
          return e3.serialize();
        }, e2.prototype._deserialize = function(e3) {
          if (e3) {
            var t2 = R(R({}, e3), { messageId: parseInt(e3.messageId) }), n2 = x.get(this._iid), r2 = n2.UserMessage, i2 = n2.FileMessage, s2 = n2.AdminMessage;
            if ("user" === t2.messageType) return r2.buildFromSerializedData(t2);
            if ("file" === t2.messageType) return i2.buildFromSerializedData(t2);
            if ("admin" === t2.messageType) return s2.buildFromSerializedData(t2);
          }
          return null;
        }, e2.deserialize = function(e3, t2) {
          if (t2) {
            var n2 = R(R({}, t2), { messageId: parseInt(t2.messageId) }), r2 = x.get(e3), i2 = r2.UserMessage, s2 = r2.FileMessage, a2 = r2.AdminMessage;
            if ("user" === n2.messageType) return i2.buildFromSerializedData(n2);
            if ("file" === n2.messageType) return s2.buildFromSerializedData(n2);
            if ("admin" === n2.messageType) return a2.buildFromSerializedData(n2);
          }
          return null;
        }, Object.defineProperty(e2.prototype, "_localCacheEnabled", { get: function() {
          return O.get(this._iid).get("localCacheEnabled");
        }, enumerable: false, configurable: true }), e2.prototype._getMessageCollectionByType = function(e3) {
          return e3 ? this._collections[e3] : this._collections.succeeded;
        }, e2.prototype._getIndexByCollection = function(e3) {
          return "UnsentMessage" === e3.name ? Ye.LATEST_UNSENT : Ye.LATEST;
        }, e2.prototype._fetch = function(e3, t2, n2) {
          return L(this, void 0, void 0, (function() {
            var r2, i2, s2 = this;
            return w(this, (function(a2) {
              switch (a2.label) {
                case 0:
                  return this._localCacheEnabled ? (r2 = { where: function(r3) {
                    if (!r3) return false;
                    if (e3 && r3.channelUrl !== e3) return false;
                    if (n2.parentMessageId && r3.parentMessageId !== n2.parentMessageId) return false;
                    if (n2.backward) {
                      if (r3.createdAt <= n2.token) return false;
                    } else if (r3.createdAt >= n2.token) return false;
                    return !!t2.match(s2._deserialize(r3));
                  }, index: n2.index, backward: n2.backward }, [4, n2.collection.query(r2)]) : [3, 3];
                case 1:
                  return [4, a2.sent().fetch({ limit: n2.limit })];
                case 2:
                  return i2 = a2.sent(), [2, Promise.all(i2.map((function(e4) {
                    return L(s2, void 0, void 0, (function() {
                      var t3, r3, i3;
                      return w(this, (function(s3) {
                        switch (s3.label) {
                          case 0:
                            return t3 = this._deserialize(e4), (r3 = e4.messageParams) && r3.file && te.isFileTypeBlob(r3.fileType) && "string" == typeof t3._messageParams.file ? (i3 = t3._messageParams, [4, n2.collection.getBlob(r3.file)]) : [3, 2];
                          case 1:
                            i3._file = s3.sent(), s3.label = 2;
                          case 2:
                            return [2, t3];
                        }
                      }));
                    }));
                  })))];
                case 3:
                  return [2, []];
              }
            }));
          }));
        }, e2.fetch = function(t2, n2, r2) {
          return L(this, void 0, void 0, (function() {
            var i2, s2, a2 = this;
            return w(this, (function(o2) {
              switch (o2.label) {
                case 0:
                  return i2 = { where: function(i3) {
                    if (!i3) return false;
                    if (r2.backward) {
                      if (i3.createdAt <= r2.token) return false;
                    } else if (i3.createdAt >= r2.token) return false;
                    return !!n2.match(e2.deserialize(t2, i3));
                  }, index: r2.index, backward: r2.backward }, [4, r2.collection.query(i2)];
                case 1:
                  return [4, o2.sent().fetch({ limit: r2.limit })];
                case 2:
                  return s2 = o2.sent(), [2, Promise.all(s2.map((function(n3) {
                    return L(a2, void 0, void 0, (function() {
                      var i3, s3, a3;
                      return w(this, (function(o3) {
                        switch (o3.label) {
                          case 0:
                            return i3 = e2.deserialize(t2, n3), (s3 = n3.messageParams) && s3.file && te.isFileTypeBlob(s3.fileType) && "string" == typeof i3._messageParams.file ? (a3 = i3._messageParams, [4, r2.collection.getBlob(s3.file)]) : [3, 2];
                          case 1:
                            a3.file = o3.sent(), o3.label = 2;
                          case 2:
                            return [2, i3];
                        }
                      }));
                    }));
                  })))];
              }
            }));
          }));
        }, e2.prototype.get = function(e3, t2) {
          return L(this, void 0, void 0, (function() {
            var n2, r2;
            return w(this, (function(i2) {
              switch (i2.label) {
                case 0:
                  return this._localCacheEnabled ? (n2 = this._getMessageCollectionByType(t2), r2 = this._deserialize, [4, n2.getByKey(e3)]) : [3, 2];
                case 1:
                  return [2, r2.apply(this, [i2.sent()])];
                case 2:
                  return [2, null];
              }
            }));
          }));
        }, e2.prototype.getPreviousAndNextMessages = function(e3, t2, n2, r2, i2) {
          return void 0 === r2 && (r2 = 30), L(this, void 0, void 0, (function() {
            var s2, a2;
            return w(this, (function(o2) {
              switch (o2.label) {
                case 0:
                  return [4, this.getPreviousMessages(e3, t2, n2, r2, i2)];
                case 1:
                  return s2 = o2.sent(), [4, this.getNextMessages(e3, t2, n2, r2, i2)];
                case 2:
                  return a2 = o2.sent(), [2, (function(e4) {
                    for (var t3 = [], n3 = {}, r3 = 0, i3 = e4; r3 < i3.length; r3++) {
                      var s3 = i3[r3];
                      s3.messageId ? n3[s3.messageId] || (n3[s3.messageId] = true, t3.push(s3)) : t3.push(s3);
                    }
                    return t3;
                  })(P(P([], s2, true), a2, true))];
              }
            }));
          }));
        }, e2.prototype.getPreviousMessages = function(e3, t2, n2, r2, i2) {
          return void 0 === r2 && (r2 = 30), L(this, void 0, void 0, (function() {
            var s2;
            return w(this, (function(a2) {
              switch (a2.label) {
                case 0:
                  return s2 = this._getMessageCollectionByType(i2), [4, this._fetch(e3, t2, { token: n2, limit: r2, backward: false, collection: s2, index: this._getIndexByCollection(s2) })];
                case 1:
                  return [2, a2.sent().reverse()];
              }
            }));
          }));
        }, e2.prototype.getNextMessages = function(e3, t2, n2, r2, i2) {
          return void 0 === r2 && (r2 = 30), L(this, void 0, void 0, (function() {
            var s2;
            return w(this, (function(a2) {
              switch (a2.label) {
                case 0:
                  return s2 = this._getMessageCollectionByType(i2), [4, this._fetch(e3, t2, { token: n2, limit: r2, backward: true, collection: s2, index: this._getIndexByCollection(s2) })];
                case 1:
                  return [2, a2.sent()];
              }
            }));
          }));
        }, e2.prototype.getAllChildMessages = function(e3, t2, n2) {
          return L(this, void 0, void 0, (function() {
            return w(this, (function(r2) {
              switch (r2.label) {
                case 0:
                  return [4, this._fetch(e3.channelUrl, t2, { token: Date.now(), limit: null, collection: n2, backward: false, index: Ye.CHILD_MESSAGE_FIRST, parentMessageId: e3.messageId })];
                case 1:
                  return [2, r2.sent()];
              }
            }));
          }));
        }, e2.prototype.getUnsentMessages = function(e3, t2) {
          return L(this, void 0, void 0, (function() {
            var n2;
            return w(this, (function(r2) {
              switch (r2.label) {
                case 0:
                  return n2 = this._getMessageCollectionByType(Je.UNSENT), [4, this._fetch(e3, t2, { token: 0, limit: null, collection: n2, backward: true, index: Ye.LATEST_UNSENT })];
                case 1:
                  return [2, r2.sent()];
              }
            }));
          }));
        }, e2.prototype.getAllUnsentMessages = function(t2) {
          return L(this, void 0, void 0, (function() {
            var n2;
            return w(this, (function(r2) {
              switch (r2.label) {
                case 0:
                  return n2 = this._getMessageCollectionByType(Je.UNSENT), [4, e2.fetch(this._iid, t2, { token: Date.now(), limit: null, collection: n2, backward: false, index: Ye.LATEST_UNSENT })];
                case 1:
                  return [2, r2.sent()];
              }
            }));
          }));
        }, e2.prototype.countBetween = function(e3, t2, n2, r2, i2) {
          return L(this, void 0, void 0, (function() {
            var s2, a2 = this;
            return w(this, (function(o2) {
              switch (o2.label) {
                case 0:
                  return this._localCacheEnabled ? (s2 = { where: function(i3) {
                    return i3.channelUrl === e3 && (!(n2 > i3.createdAt || i3.createdAt > r2) && t2.match(a2._deserialize(i3)));
                  }, index: Ye.LATEST }, [4, this._getMessageCollectionByType(i2).query(s2)]) : [3, 3];
                case 1:
                  return [4, o2.sent().count()];
                case 2:
                  return [2, o2.sent()];
                case 3:
                  return [2, 0];
              }
            }));
          }));
        }, e2.prototype._serializeMessages = function(e3, t2) {
          return L(this, void 0, void 0, (function() {
            var n2, r2, i2 = this;
            return w(this, (function(s2) {
              switch (s2.label) {
                case 0:
                  return n2 = this._getMessageCollectionByType(t2), r2 = [], [4, Promise.all(e3.map((function(e4) {
                    return L(i2, void 0, void 0, (function() {
                      var t3, i3;
                      return w(this, (function(s3) {
                        switch (s3.label) {
                          case 0:
                            return (t3 = e4.serialize()) ? ((t3 = R({}, t3)).messageParams && (t3.messageParams = R({}, t3.messageParams)), e4.sendingStatus && "succeeded" !== e4.sendingStatus ? t3.messageId = "unsent-".concat(e4.reqId) : t3.messageId = "".concat(e4.messageId), e4.isFileMessage() && e4._messageParams && e4._messageParams.file && te.isBlob(e4._messageParams.file) && te.isFileTypeBlob(e4._messageParams.fileType) ? [4, n2.saveBlob(e4._messageParams.file, e4.reqId)] : [3, 2]) : [3, 3];
                          case 1:
                            i3 = s3.sent(), t3.messageParams.file = i3, s3.label = 2;
                          case 2:
                            r2.push(t3), s3.label = 3;
                          case 3:
                            return [2];
                        }
                      }));
                    }));
                  })))];
                case 1:
                  return s2.sent(), [2, r2];
              }
            }));
          }));
        }, e2.prototype.upsert = function(e3, t2) {
          return L(this, void 0, void 0, (function() {
            var n2, r2, i2, s2, a2, o2, l2, u2, c2, d2, h2, p2, f2, _2, g2;
            return w(this, (function(y2) {
              switch (y2.label) {
                case 0:
                  return this._localCacheEnabled ? (n2 = wi.getInstance(this._iid), r2 = this._getMessageCollectionByType(t2), [4, this._serializeMessages(e3, t2)]) : [3, 13];
                case 1:
                  return i2 = y2.sent(), [4, r2.upsertMany(i2)];
                case 2:
                  if (y2.sent(), t2 && t2 !== Je.SUCCEEDED) return [3, 13];
                  s2 = [], a2 = [], o2 = 0, y2.label = 3;
                case 3:
                  return o2 < e3.length ? (l2 = e3[o2]).sendingStatus && l2.sendingStatus === n2.MessageSendingStatus.SUCCEEDED && l2.updatedAt > 0 ? (c2 = (u2 = s2).concat, [4, this._locallyUpdateChildMessages(l2, Je.SUCCEEDED)]) : [3, 6] : [3, 7];
                case 4:
                  return s2 = c2.apply(u2, [y2.sent()]), h2 = (d2 = a2).concat, [4, this._locallyUpdateChildMessages(l2, Je.UNSENT)];
                case 5:
                  a2 = h2.apply(d2, [y2.sent()]), y2.label = 6;
                case 6:
                  return o2++, [3, 3];
                case 7:
                  return s2.length > 0 ? (p2 = this._getMessageCollectionByType(Je.SUCCEEDED), [4, this._serializeMessages(s2, Je.SUCCEEDED)]) : [3, 10];
                case 8:
                  return f2 = y2.sent(), [4, p2.upsertMany(f2)];
                case 9:
                  y2.sent(), y2.label = 10;
                case 10:
                  return a2.length > 0 ? (_2 = this._getMessageCollectionByType(Je.UNSENT), [4, this._serializeMessages(a2, Je.UNSENT)]) : [3, 13];
                case 11:
                  return g2 = y2.sent(), [4, _2.upsertMany(g2)];
                case 12:
                  y2.sent(), y2.label = 13;
                case 13:
                  return [2];
              }
            }));
          }));
        }, e2.prototype._locallyUpdateChildMessages = function(e3, t2) {
          return L(this, void 0, void 0, (function() {
            var n2, r2, i2;
            return w(this, (function(s2) {
              switch (s2.label) {
                case 0:
                  return n2 = new et(), r2 = [], i2 = this._getMessageCollectionByType(t2), [4, this.getAllChildMessages(e3, n2, i2)];
                case 1:
                  return s2.sent().forEach((function(t3) {
                    t3.applyParentMessage(e3) && r2.push(t3);
                  })), [2, r2];
              }
            }));
          }));
        }, e2.prototype.remove = function(e3, t2) {
          return L(this, void 0, void 0, (function() {
            var n2, r2;
            return w(this, (function(i2) {
              switch (i2.label) {
                case 0:
                  return this._localCacheEnabled ? [4, it(500)] : [3, 3];
                case 1:
                  return i2.sent(), n2 = this._getMessageCollectionByType(t2), r2 = { messageId: { "/in": e3.map((function(e4) {
                    return "".concat(e4);
                  })) } }, [4, n2.removeIf({ where: r2 })];
                case 2:
                  i2.sent(), i2.label = 3;
                case 3:
                  return [2];
              }
            }));
          }));
        }, e2.prototype.removeUnsentMessages = function(e3) {
          return L(this, void 0, void 0, (function() {
            var t2, n2, r2, i2, s2, a2;
            return w(this, (function(o2) {
              switch (o2.label) {
                case 0:
                  return t2 = e3.channelUrl, n2 = e3.sendingStatus, r2 = e3.reqIds, i2 = [], this._localCacheEnabled ? [4, it(500)] : [3, 3];
                case 1:
                  return o2.sent(), s2 = this._getMessageCollectionByType(Je.UNSENT), a2 = { channelUrl: { "=": t2 } }, n2 && (a2.sendingStatus = { "=": n2 }), r2 && r2.length > 0 && (a2.reqId = { "/in": r2 }), [4, s2.removeIf({ where: a2 })];
                case 2:
                  i2 = o2.sent(), o2.label = 3;
                case 3:
                  return [2, i2];
              }
            }));
          }));
        }, e2.prototype.removeFailedMessages = function(e3, t2) {
          return L(this, void 0, void 0, (function() {
            var n2, r2, i2, s2;
            return w(this, (function(a2) {
              switch (a2.label) {
                case 0:
                  return n2 = [], this._localCacheEnabled ? [4, it(500)] : [3, 3];
                case 1:
                  return a2.sent(), r2 = this._getMessageCollectionByType(Je.UNSENT), i2 = wi.getInstance(this._iid), s2 = { channelUrl: { "=": e3 }, sendingStatus: { "=": i2.MessageSendingStatus.FAILED } }, t2 && t2.length > 0 && (s2.reqId = { "/in": t2 }), [4, r2.removeIf({ where: s2 })];
                case 2:
                  n2 = a2.sent(), a2.label = 3;
                case 3:
                  return [2, n2];
              }
            }));
          }));
        }, e2.prototype.clearByChannelUrl = function(e3) {
          return L(this, void 0, void 0, (function() {
            var t2 = this;
            return w(this, (function(n2) {
              switch (n2.label) {
                case 0:
                  return [4, Promise.all(Object.keys(Je).map((function(n3) {
                    var r2 = t2._getMessageCollectionByType(Je[n3]), i2 = { channelUrl: { "=": e3 } };
                    return r2.removeIf({ where: i2 });
                  })))];
                case 1:
                  return n2.sent(), [2];
              }
            }));
          }));
        }, e2.prototype.clear = function(e3) {
          return L(this, void 0, void 0, (function() {
            return w(this, (function(t2) {
              switch (t2.label) {
                case 0:
                  return this._localCacheEnabled ? [4, this._getMessageCollectionByType(e3).clear()] : [3, 2];
                case 1:
                  t2.sent(), t2.label = 2;
                case 2:
                  return [2];
              }
            }));
          }));
        }, e2.prototype.clearAll = function() {
          return L(this, void 0, void 0, (function() {
            var e3 = this;
            return w(this, (function(t2) {
              switch (t2.label) {
                case 0:
                  return this._localCacheEnabled ? [4, Promise.all(Object.keys(Je).map((function(t3) {
                    return e3.clear(Je[t3]);
                  })))] : [3, 2];
                case 1:
                  t2.sent(), t2.label = 2;
                case 2:
                  return [2];
              }
            }));
          }));
        }, e2.prototype.clearAbove = function(e3, t2) {
          return L(this, void 0, void 0, (function() {
            var n2, r2;
            return w(this, (function(i2) {
              switch (i2.label) {
                case 0:
                  return this._localCacheEnabled ? (n2 = this._getMessageCollectionByType(t2), r2 = { createdAt: { "<": e3 } }, [4, n2.removeIf({ where: r2 })]) : [3, 2];
                case 1:
                  i2.sent(), i2.label = 2;
                case 2:
                  return [2];
              }
            }));
          }));
        }, e2;
      })(), lt = (function() {
        function e2() {
          this.messageId = null, this.userId = null, this.key = null, this.operation = "", this.updatedAt = null;
        }
        return e2.createFromJson = function(e3) {
          var t2 = parseInt(e3.msg_id), n2 = e3.user_id, r2 = e3.operation, i2 = e3.reaction, s2 = e3.updated_at;
          if (t2 && "string" == typeof n2 && "string" == typeof r2 && ["add", "delete"].indexOf(r2.toLowerCase()) >= 0 && "string" == typeof i2 && i2 && "number" == typeof s2) {
            var a2 = new this();
            return a2.messageId = t2, a2.userId = n2, a2.key = i2, a2.operation = r2.toLowerCase(), a2.updatedAt = s2, a2;
          }
          return null;
        }, e2;
      })(), ut = function(e2) {
        return Object.keys(e2).forEach((function(t2) {
          e2[t2] && "object" == typeof e2[t2] && ut(e2[t2]);
        })), Object.freeze(e2);
      }, ct = (function() {
        function e2() {
        }
        return e2.serialize = function(e3, t2) {
          void 0 === t2 && (t2 = null);
          var n2 = JSON.parse(JSON.stringify(e3));
          return t2 && t2(n2), ut(n2);
        }, e2.serializeWithoutFreeze = function(e3, t2) {
          void 0 === t2 && (t2 = null);
          var n2 = JSON.parse(JSON.stringify(e3));
          return t2 && t2(n2), n2;
        }, e2.deserialize = function(e3, t2) {
          void 0 === t2 && (t2 = null);
          var n2 = JSON.parse(JSON.stringify(e3));
          return t2 && t2(n2), n2;
        }, e2;
      })(), dt = { TIMESTAMP: "timestamp", MESSAGE_ID: "messageId" }, ht = /* @__PURE__ */ new WeakMap(), pt = (function() {
        function e2(t2) {
          c(this, e2), this.messageId = 0, this.messageType = e2.MESSAGE_TYPE_BASE, this.channelUrl = "", this.data = null, this.customType = null, this.silent = false, this.createdAt = 0, this.updatedAt = 0, this.channelType = null, this.metaArrays = [], this.reactions = [], this.mentionType = null, this.mentionedUsers = [], this.mentionedUserIds = [], this.mentionedMessageTemplate = null, this.sendingStatus = null, ht.set(this, 0), this.parentMessageId = 0, this.parentMessageText = null, this.threadInfo = null, this.isReplyToChannel = false, this.parentMessage = null, this.ogMetaData = null, this.isOperatorMessage = false, this.appleCriticalAlertOptions = null, this.reqId = "", this._isAutoResendRegistered = false, t2 && this.__update(t2);
        }
        return h(e2, [{ key: "serialize", value: function(e3) {
          var t2 = this;
          return ct.serialize(this, (function(n2) {
            n2.hasOwnProperty("_sender") && (n2.sender = n2._sender, delete n2._sender), n2.hasOwnProperty("_isAutoResendRegistered") && (n2.isAutoResendRegistered = n2._isAutoResendRegistered, delete n2._isAutoResendRegistered), t2.appleCriticalAlertOptions && (n2.appleCriticalAlertOptions = t2.appleCriticalAlertOptions.serialize()), e3 && e3(n2);
          }));
        } }, { key: "isIdentical", value: function(e3) {
          return !("object" !== u(e3) || !e3.hasOwnProperty("messageId")) && (0 !== this.messageId && 0 !== e3.messageId ? this.messageId === e3.messageId : this.reqId === e3.reqId);
        } }, { key: "isEqual", value: function(e3) {
          return se.deepEqual(this, e3);
        } }, { key: "isOpenChannel", value: function() {
          var e3 = x.get(this._iid).BaseChannel;
          return this.channelType === e3.CHANNEL_TYPE_OPEN;
        } }, { key: "isGroupChannel", value: function() {
          var e3 = x.get(this._iid).BaseChannel;
          return this.channelType === e3.CHANNEL_TYPE_GROUP;
        } }, { key: "isUserMessage", value: function() {
          return this.messageType === e2.MESSAGE_TYPE_USER;
        } }, { key: "isAdminMessage", value: function() {
          return this.messageType === e2.MESSAGE_TYPE_ADMIN;
        } }, { key: "isFileMessage", value: function() {
          return this.messageType === e2.MESSAGE_TYPE_FILE;
        } }, { key: "__update", value: function(e3) {
          var t2 = this, n2 = wi.getInstance(this._iid), r2 = x.get(this._iid), i2 = r2.User, s2 = r2.BaseChannel, a2 = r2.BaseMessageParams, o2 = r2.BaseMessage, u2 = r2.Reaction, c2 = r2.MessageMetaArray, d2 = r2.ThreadInfo, h2 = r2.OGMetaData, p2 = r2.AppleCriticalAlertOptions;
          if (e3.hasOwnProperty("msg_id") && e3.msg_id && (this.messageId = parseInt(e3.msg_id)), e3.hasOwnProperty("type")) switch (e3.type) {
            case "MESG":
              this.messageType = o2.MESSAGE_TYPE_USER;
              break;
            case "FILE":
              this.messageType = o2.MESSAGE_TYPE_FILE;
              break;
            case "BRDM":
            case "ADMM":
              this.messageType = o2.MESSAGE_TYPE_ADMIN;
          }
          e3.hasOwnProperty("message_id") && e3.message_id && (this.messageId = parseInt(e3.message_id)), this.channelUrl = e3.hasOwnProperty("channel_url") ? String(e3.channel_url) : "", this.data = e3.hasOwnProperty("data") ? String(e3.data) : "", this.customType = e3.hasOwnProperty("custom_type") ? String(e3.custom_type) : "", e3.hasOwnProperty("silent") && (this.silent = e3.silent), this.createdAt = e3.hasOwnProperty("ts") ? parseInt(e3.ts) : 0, e3.hasOwnProperty("created_at") && (this.createdAt = parseInt(e3.created_at)), this.updatedAt = e3.hasOwnProperty("updated_at") ? parseInt(e3.updated_at) : 0, this.channelType = e3.hasOwnProperty("channel_type") ? String(e3.channel_type) : s2.CHANNEL_TYPE_GROUP;
          var f2 = e3.hasOwnProperty("metaarray") ? e3.metaarray : {}, _2 = e3.hasOwnProperty("metaarray_key_order") ? e3.metaarray_key_order : Object.keys(f2).sort((function(e4, t3) {
            return e4.localeCompare(t3);
          }));
          this.metaArrays = [];
          for (var g2 = 0; g2 < _2.length; g2++) {
            var y2 = _2[g2];
            this.metaArrays.push(new c2(y2, f2[y2] || []));
          }
          if (e3.hasOwnProperty("sorted_metaarray")) {
            var m2 = e3.sorted_metaarray;
            Array.isArray(m2) && (this.metaArrays = m2.map((function(e4) {
              return new c2(e4.key, e4.value);
            })));
          }
          if (this.reactions = [], e3.hasOwnProperty("reactions") && Array.isArray(e3.reactions)) for (var E2 = 0; E2 < e3.reactions.length; E2++) {
            var v2 = u2.createFromJson(e3.reactions[E2]);
            v2 && this.reactions.push(v2);
          }
          (this.mentionType = e3.hasOwnProperty("mention_type") ? e3.mention_type : a2.MentionType.USERS, this.mentionedUsers = [], e3.hasOwnProperty("mentioned_users")) && e3.mentioned_users.forEach((function(e4) {
            var n3 = new i2(e4);
            t2.mentionedUsers.push(n3);
          }));
          if (this.mentionedUserIds = [], e3.hasOwnProperty("mentioned_user_ids") && (this.mentionedUserIds = e3.mentioned_user_ids), e3.hasOwnProperty("mentioned_message_template") && e3.mentioned_message_template && (this.mentionedMessageTemplate = e3.mentioned_message_template), this.sendingStatus = this.messageId > 0 ? n2.MessageSendingStatus.SUCCEEDED : n2.MessageSendingStatus.FAILED, e3.hasOwnProperty("sending_status") && (this.sendingStatus = e3.sending_status), e3.hasOwnProperty("root_message_id") && e3.root_message_id && ht.set(this, parseInt(e3.root_message_id)), e3.hasOwnProperty("parent_message_id") && e3.parent_message_id && (this.parentMessageId = parseInt(e3.parent_message_id)), this.threadInfo = new d2(e3.thread_info), this.isReplyToChannel = !!e3.hasOwnProperty("is_reply_to_channel") && e3.is_reply_to_channel, e3.hasOwnProperty("parent_message_info")) {
            var b2 = l({}, e3.parent_message_info);
            e3.parent_message_info.hasOwnProperty("file") && (b2.require_auth = !!e3.parent_message_info.file.require_auth);
            var C2 = { channelType: this.channelType, channelUrl: this.channelUrl };
            switch (this.parentMessage = s2.buildMessage(b2, C2), this.parentMessage.messageType) {
              case o2.MESSAGE_TYPE_USER:
                this.parentMessageText = this.parentMessage.message;
                break;
              case o2.MESSAGE_TYPE_FILE:
                this.parentMessageText = this.parentMessage.name;
            }
          }
          e3.hasOwnProperty("og_tag") && (this.ogMetaData = new h2(e3.og_tag)), e3.hasOwnProperty("is_op_msg") && (this.isOperatorMessage = e3.is_op_msg), e3.hasOwnProperty("apple_critical_alert_options") && (this.appleCriticalAlertOptions = new p2(e3.apple_critical_alert_options)), e3.hasOwnProperty("is_auto_resend_registered") && (this._isAutoResendRegistered = e3.is_auto_resend_registered), this.reqId = e3.hasOwnProperty("req_id") ? e3.req_id : "";
        } }, { key: "getMetaArraysByKeys", value: function(e3) {
          return Array.isArray(e3) ? this.metaArrays.filter((function(t2) {
            return e3.indexOf(t2.key) > -1;
          })) : [];
        } }, { key: "metaArray", get: function() {
          var e3 = {};
          return this.metaArrays.forEach((function(t2) {
            e3[t2.key] = t2.value;
          })), e3;
        }, set: function(e3) {
          if ("object" === u(e3) && e3) {
            var t2 = x.get(this._iid).MessageMetaArray, n2 = [];
            Object.keys(e3).forEach((function(r2) {
              n2.push(new t2(r2, e3[r2]));
            })), this.metaArrays = n2;
          }
        } }, { key: "getMetaArrayByKeys", value: function(e3) {
          var t2 = {};
          return this.getMetaArraysByKeys(e3).forEach((function(e4) {
            t2[e4.key] = e4.value;
          })), t2;
        } }, { key: "applyReactionEvent", value: function(e3) {
          var t2 = this, n2 = x.get(this._iid), r2 = n2.Reaction, i2 = null, s2 = me.parse(arguments, [new me({ type: lt, constraint: function(e4) {
            return parseInt(e4.messageId) === parseInt(t2.messageId);
          } })]), a2 = C(s2, 2);
          if (i2 = a2[0], e3 = a2[1], !i2) {
            for (var o2 = false, l2 = 0; l2 < this.reactions.length; l2++) if (this.reactions[l2].key === e3.key) {
              this.reactions[l2]._applyEvent(e3), this.reactions[l2].isEmpty && this.reactions.splice(l2, 1), o2 = true;
              break;
            }
            o2 || "add" !== e3.operation || this.reactions.push(new r2(e3.key, [e3.userId], e3.updatedAt));
          }
        } }, { key: "_getThreadedMessageList", value: function(t2, n2, r2, i2) {
          var s2 = this, a2 = x.get(this._iid), o2 = a2.ThreadedMessageListParams, u2 = null, c2 = me.parse(arguments, [new me({ type: "number" }), new me({ type: "string", constraint: function(e3) {
            return Object.values(dt).includes(e3);
          } }), new me({ type: o2, constraint: function(e3) {
            return e3._validate();
          } }), new me({ type: "callback" })]), d2 = C(c2, 5);
          return u2 = d2[0], t2 = d2[1], n2 = d2[2], r2 = d2[3], i2 = d2[4], oe(this._iid, (function(i3) {
            if (u2) i3(u2, null);
            else {
              var a3 = x.get(s2._iid), o3 = a3.GroupChannel, c3 = a3.OpenChannel;
              s2.isGroupChannel() ? o3.getChannel(s2.channelUrl, T.INTERNAL_CALL, (function(a4, o4) {
                if (wi.getInstance(s2._iid).getErrorFirstCallback()) {
                  var u3 = [a4, o4];
                  o4 = u3[0], a4 = u3[1];
                }
                o4 ? i3(o4, null) : O.get(s2._iid).container.apiClient.getMessageList(l(l({ channel: a4, token: t2, tokenType: n2 }, r2), {}, { shouldReverse: r2.reverse, parentMessageId: s2.messageId, includeThreadInfo: true, replyType: e2.ReplyType.ALL })).then((function(e3) {
                  var t3 = x.get(s2._iid).BaseChannel, n3 = e3.messages.map((function(e4) {
                    return t3.buildMessage(e4, a4);
                  })).filter((function(e4) {
                    return null !== e4;
                  })), r3 = n3.filter((function(e4) {
                    return e4.messageId === s2.messageId;
                  }))[0], o5 = n3.filter((function(e4) {
                    return e4.parentMessageId === s2.messageId;
                  }));
                  i3(null, { parentMessage: r3, threadedReplies: o5 });
                })).catch((function(e3) {
                  i3(e3, null);
                }));
              })) : s2.isOpenChannel() && c3.getChannel(s2.channelUrl, T.INTERNAL_CALL, (function(a4, o4) {
                if (wi.getInstance(s2._iid).getErrorFirstCallback()) {
                  var u3 = [a4, o4];
                  o4 = u3[0], a4 = u3[1];
                }
                o4 ? i3(o4, null) : O.get(s2._iid).container.apiClient.getMessageList(l(l({ channel: a4, token: t2, tokenType: n2 }, r2), {}, { shouldReverse: r2.reverse, parentMessageId: s2.messageId, includeThreadInfo: true, replyType: e2.ReplyType.ALL })).then((function(e3) {
                  var t3 = x.get(s2._iid).BaseChannel, n3 = e3.messages.map((function(e4) {
                    return t3.buildMessage(e4, a4);
                  })).filter((function(e4) {
                    return null !== e4;
                  })), r3 = n3.filter((function(e4) {
                    return e4.messageId === s2.messageId;
                  }))[0], o5 = n3.filter((function(e4) {
                    return e4.parentMessageId === s2.messageId;
                  }));
                  i3(null, { parentMessage: r3, threadedReplies: o5 });
                })).catch((function(e3) {
                  i3(e3, null);
                }));
              }));
            }
          }), i2);
        } }, { key: "getThreadedMessagesByTimestamp", value: function(e3, t2, n2) {
          return this._getThreadedMessageList(e3, dt.TIMESTAMP, t2, n2);
        } }, { key: "applyThreadInfoUpdateEvent", value: function(e3) {
          var t2 = this, n2 = x.get(this._iid), r2 = n2.ThreadInfoUpdateEvent, i2 = null, s2 = me.parse(arguments, [new me({ type: r2, constraint: function(e4) {
            return parseInt(e4.targetMessageId) === parseInt(t2.messageId);
          } })]), a2 = C(s2, 2);
          return i2 = a2[0], e3 = a2[1], !i2 && (this.threadInfo = e3.threadInfo, true);
        } }, { key: "applyParentMessage", value: function(e3) {
          if (this.parentMessageId === e3.messageId) {
            var t2 = this.parentMessage.updatedAt;
            if (e3.updatedAt >= t2) return this.parentMessage = e3, true;
          }
          return false;
        } }, { key: "_setRootMessageId", value: function(e3) {
          ht.set(this, e3);
        } }], [{ key: "MESSAGE_TYPE_BASE", get: function() {
          return "base";
        } }, { key: "MESSAGE_TYPE_ADMIN", get: function() {
          return "admin";
        } }, { key: "MESSAGE_TYPE_USER", get: function() {
          return "user";
        } }, { key: "MESSAGE_TYPE_FILE", get: function() {
          return "file";
        } }, { key: "SendingStatus", get: function() {
          return { NONE: "none", PENDING: "pending", FAILED: "failed", CANCELED: "canceled", SUCCEEDED: "succeeded" };
        } }, { key: "ReplyType", get: function() {
          return { ALL: "all", NONE: "none", ONLY_REPLY_TO_CHANNEL: "only_reply_to_channel" };
        } }, { key: "getMessage", value: function(e3, t2) {
          var n2 = this, r2 = x.get(this._iid), i2 = r2.BaseChannel, s2 = r2.MessageRetrievalParams, a2 = null, o2 = me.parse(arguments, [new me({ type: s2, constraint: function(e4) {
            return e4._validate();
          } }), new me({ type: "callback" })]), u2 = C(o2, 3);
          return a2 = u2[0], e3 = u2[1], t2 = u2[2], oe(this._iid, (function(t3) {
            if (a2) t3(a2, null);
            else {
              var r3 = x.get(n2._iid), s3 = r3.GroupChannel, o3 = r3.OpenChannel;
              switch (e3.channelType) {
                case i2.CHANNEL_TYPE_GROUP:
                  s3.getChannel(e3.channelUrl, T.INTERNAL_CALL, (function(r4, s4) {
                    if (wi.getInstance(n2._iid).getErrorFirstCallback()) {
                      var a3 = [r4, s4];
                      s4 = a3[0], r4 = a3[1];
                    }
                    s4 ? t3(s4, null) : O.get(n2._iid).container.apiClient.getMessage(l({ channel: r4 }, e3), (function(e4, n3) {
                      if (e4) t3(e4, null);
                      else {
                        var s5 = i2.buildMessage(n3, r4);
                        t3(null, s5);
                      }
                    }));
                  }));
                  break;
                case i2.CHANNEL_TYPE_OPEN:
                  o3.getChannel(e3.channelUrl, T.INTERNAL_CALL, (function(r4, s4) {
                    if (wi.getInstance(n2._iid).getErrorFirstCallback()) {
                      var a3 = [r4, s4];
                      s4 = a3[0], r4 = a3[1];
                    }
                    s4 ? t3(s4, null) : O.get(n2._iid).container.apiClient.getMessage(l({ channel: r4 }, e3), (function(e4, n3) {
                      if (e4) t3(e4, null);
                      else {
                        var s5 = i2.buildMessage(n3, r4);
                        t3(null, s5);
                      }
                    }));
                  }));
              }
            }
          }), t2);
        } }]), e2;
      })(), ft = (function() {
        function e2(e3) {
          this.nickname = "", this.plainProfileUrl = "", this.userId = "", this.connectionStatus = "", this.lastSeenAt = null, this.metaData = {}, this.isActive = true, this.friendDiscoveryKey = null, this.friendName = null, this._preferredLanguages = null, this.requireAuth = null, e3 && this.__update(e3);
        }
        return e2.objectify = function(e3) {
          var t2 = e3.userId, n2 = void 0 === t2 ? null : t2, r2 = e3.nickname, i2 = void 0 === r2 ? "" : r2, s2 = e3.plainProfileUrl, a2 = void 0 === s2 ? "" : s2, o2 = e3.connectionStatus, l2 = void 0 === o2 ? "" : o2, u2 = e3.lastSeenAt, c2 = void 0 === u2 ? 0 : u2, d2 = e3.metaData, h2 = void 0 === d2 ? {} : d2, p2 = e3.isActive, f2 = void 0 === p2 || p2, _2 = e3.friendDiscoveryKey, g2 = void 0 === _2 ? null : _2, y2 = e3.friendName, m2 = void 0 === y2 ? null : y2, E2 = e3.preferredLanguages, v2 = void 0 === E2 ? null : E2, b2 = e3.requireAuth;
          return { user_id: n2, nickname: i2, profile_url: a2, is_online: l2, last_seen_at: c2, metadata: h2, is_active: f2, friend_discovery_key: g2, friend_name: m2, preferred_languages: v2, require_auth_for_profile_image: void 0 !== b2 && b2 };
        }, e2.buildFromSerializedData = function(e3) {
          var t2 = x.get(this._iid).User, n2 = ct.deserialize(e3);
          return new t2(t2.objectify(n2));
        }, Object.defineProperty(e2.prototype, "preferredLanguages", { get: function() {
          return this._preferredLanguages;
        }, enumerable: false, configurable: true }), e2.prototype.__update = function(t2) {
          var n2 = O.get(this._iid).container.auth;
          t2.hasOwnProperty("guest_id") && (this.userId = t2.guest_id), t2.hasOwnProperty("user_id") && (this.userId = t2.user_id), t2.hasOwnProperty("name") && (this.nickname = t2.name), t2.hasOwnProperty("nickname") && (this.nickname = t2.nickname), t2.hasOwnProperty("require_auth_for_profile_image") ? this.requireAuth = t2.require_auth_for_profile_image : this.requireAuth = null, (t2.hasOwnProperty("image") || t2.hasOwnProperty("profile_url")) && (this.plainProfileUrl = t2.image || t2.profile_url || "", Object.defineProperty(this, "profileUrl", { value: this.requireAuth ? "".concat(this.plainProfileUrl, "?auth=").concat(n2.eKey) : this.plainProfileUrl, configurable: true, writable: false })), t2.hasOwnProperty("is_online") ? t2.is_online === e2.NON_AVAILABLE ? this.connectionStatus = e2.NON_AVAILABLE : this.connectionStatus = t2.is_online ? e2.ONLINE : e2.OFFLINE : this.connectionStatus = e2.NON_AVAILABLE, t2.hasOwnProperty("last_seen_at") ? this.lastSeenAt = parseInt(t2.last_seen_at) : this.lastSeenAt = 0, t2.hasOwnProperty("metadata") ? this.metaData = t2.metadata : this.metaData = {}, t2.hasOwnProperty("is_active") ? this.isActive = void 0 === t2.is_active || t2.is_active : this.isActive = true, t2.hasOwnProperty("friend_discovery_key") ? this.friendDiscoveryKey = t2.friend_discovery_key : this.friendDiscoveryKey = null, t2.hasOwnProperty("friend_name") ? this.friendName = t2.friend_name : this.friendName = null, t2.hasOwnProperty("preferred_languages") ? this._preferredLanguages = t2.preferred_languages || null : this._preferredLanguages = null;
        }, e2.prototype._updateMetaData = function(e3, t2) {
          var n2 = this;
          void 0 === t2 && (t2 = false);
          var r2 = x.get(this._iid).GroupChannel;
          Object.keys(e3).forEach((function(r3) {
            t2 ? delete n2.metaData[r3] : n2.metaData[r3] = e3[r3];
          })), Object.keys(r2.cachedChannels).forEach((function(e4) {
            if (r2.cachedChannels.hasOwnProperty(e4)) {
              var t3 = r2.cachedChannels[e4];
              if (t3.memberMap.hasOwnProperty(n2.userId)) t3.memberMap[n2.userId].metaData = n2.metaData;
            }
          }));
        }, e2.prototype.serialize = function() {
          return ct.serialize(this, (function(e3) {
            e3.hasOwnProperty("_preferredLanguages") && (e3.preferredLanguages = e3._preferredLanguages, delete e3._preferredLanguages);
          }));
        }, e2.prototype.getOriginalProfileUrl = function() {
          var e3 = "";
          if (((e3 = (e3 = this.plainProfileUrl.indexOf("://") > -1 ? this.plainProfileUrl.split("/")[2] : this.plainProfileUrl.split("/")[0]).split("?")[0]).indexOf("sendbird.com") > -1 || e3.indexOf("sendbirdtest.com") > -1 || e3.indexOf("intoz.com") > -1 || e3.indexOf("file-local") > -1) && this.plainProfileUrl.indexOf(e3 + "/profile_images/") > -1) {
            var t2 = this.plainProfileUrl.replace("profile_images/", "");
            return t2 === this.plainProfileUrl ? "" : t2;
          }
          return "";
        }, e2.prototype.createMetaData = function(e3, t2) {
          var n2, r2 = this, i2 = null;
          return n2 = me.parse(arguments, [new me({ type: "object", constraint: function(e4) {
            return Object.keys(e4).length > 0 && !Array.isArray(e4);
          } }), new me({ type: "callback" })]), i2 = n2[0], e3 = n2[1], t2 = n2[2], oe(this._iid, (function(t3) {
            i2 ? t3(i2, null) : O.get(r2._iid).container.apiClient.createUserMetaData({ metaData: e3 }, (function(e4, n3) {
              e4 || r2._updateMetaData(n3), t3(e4, n3);
            }));
          }), t2);
        }, e2.prototype.updateMetaData = function(e3, t2, n2) {
          var r2, i2 = this, s2 = null;
          return r2 = me.parse(arguments, [new me({ type: "object", constraint: function(e4) {
            return !Array.isArray(e4) && Object.keys(e4).length > 0 && Object.keys(e4).map((function(t3) {
              return e4[t3];
            })).every((function(e5) {
              return "string" == typeof e5;
            }));
          } }), new me({ type: "boolean", optional: true, defaultValue: false }), new me({ type: "callback" })]), s2 = r2[0], e3 = r2[1], t2 = r2[2], n2 = r2[3], oe(this._iid, (function(n3) {
            s2 ? n3(s2, null) : O.get(i2._iid).container.apiClient.updateUserMetaData({ metaData: e3, upsert: t2 }, (function(e4, t3) {
              e4 || i2._updateMetaData(t3), n3(e4, t3);
            }));
          }), n2);
        }, e2.prototype.deleteMetaData = function(e3, t2) {
          var n2, r2 = this, i2 = null;
          return n2 = me.parse(arguments, [new me({ type: "string", constraint: function(e4) {
            return e4.length > 0;
          } }), new me({ type: "callback" })]), i2 = n2[0], e3 = n2[1], t2 = n2[2], oe(this._iid, (function(t3) {
            if (i2) t3(i2, null);
            else {
              var n3 = {};
              n3[e3] = "", O.get(r2._iid).container.apiClient.deleteUserMetaData({ metaDataKey: e3 }, (function(e4, i3) {
                e4 || r2._updateMetaData(n3, true), t3(e4, i3);
              }));
            }
          }), t2);
        }, e2.prototype.deleteAllMetaData = function(e3) {
          var t2 = this;
          return oe(this._iid, (function(e4) {
            var n2 = t2.metaData;
            O.get(t2._iid).container.apiClient.deleteAllUserMetaData({}, (function(r2, i2) {
              r2 || t2._updateMetaData(n2, true), e4(r2, i2);
            }));
          }), e3);
        }, Object.defineProperty(e2, "NON_AVAILABLE", { get: function() {
          return "nonavailable";
        }, enumerable: false, configurable: true }), Object.defineProperty(e2, "ONLINE", { get: function() {
          return "online";
        }, enumerable: false, configurable: true }), Object.defineProperty(e2, "OFFLINE", { get: function() {
          return "offline";
        }, enumerable: false, configurable: true }), e2;
      })(), _t = (function() {
        function e2(e3, t2) {
          this._source = e3, this._sendingStatus = t2;
        }
        return Object.defineProperty(e2.prototype, "source", { get: function() {
          return this._source;
        }, enumerable: false, configurable: true }), Object.defineProperty(e2.prototype, "isFromEvent", { get: function() {
          return this._source >= 2e3;
        }, enumerable: false, configurable: true }), Object.defineProperty(e2.prototype, "sendingStatus", { get: function() {
          return this._sendingStatus;
        }, enumerable: false, configurable: true }), e2;
      })(), gt = {}, yt = function(e2, t2) {
        return "sendbird:".concat(e2, "@channel/").concat(t2, "/message/sync");
      }, mt = (function() {
        function e2(e3) {
          var t2 = e3.iid, n2 = e3.channel, r2 = e3.limit, i2 = void 0 === r2 ? Nt : r2, s2 = this;
          this._prevSync = null, this._nextSync = null, this._syncRange = new De({ top: Number.MAX_SAFE_INTEGER, bottom: -1 }), this._isPrevSyncComplete = false, this._isNextSyncComplete = false, this._iid = t2, this._channel = n2, this._limit = i2;
          var a2 = x.get(this._iid).BaseChannel, o2 = O.get(this._iid), l2 = o2.get("currentUserId"), u2 = o2.get("store"), c2 = o2.get("apiClient"), d2 = ot.of(this._iid), h2 = ge.of(this._iid), p2 = yt(l2, this._channel.url), f2 = o2.container.concurrentCallLimit, _2 = o2.container.backOffDelay;
          this._prevSync = new Pe(p2, (function(e4) {
            return L(s2, void 0, void 0, (function() {
              var e5, t3, r3, i3, s3, o3, l3, f3, _3, g2 = this;
              return w(this, (function(y2) {
                switch (y2.label) {
                  case 0:
                    return e5 = { hasNext: true, nextParams: null }, [4, u2.get(p2)];
                  case 1:
                    return (t3 = y2.sent()) && t3.isPrevSyncComplete ? [3, 7] : (t3 && (this._syncRange = t3.range, this._isPrevSyncComplete = t3.isPrevSyncComplete), r3 = nt({ channel: this._channel, ts: this._syncRange.top, prevLimit: this._limit }), [4, c2.getMessageList(r3)]);
                  case 2:
                    return i3 = y2.sent(), s3 = [], o3 = i3.messages.map((function(e6) {
                      var t4 = a2.buildMessage(e6, g2._channel);
                      return (t4.isUserMessage() || t4.isFileMessage()) && t4._isSentByMe() && s3.push(t4.reqId), t4;
                    })), l3 = this.getMinCreatedAt(o3), this._syncRange.top = Math.min(this._syncRange.top, l3), this._syncRange.bottom < 0 && (this._syncRange.bottom = this.getMaxCreatedAt(o3)), this._isPrevSyncComplete = o3.length < this._limit, J.debug("Message collection background sync fetched messages count: ", o3.length), [4, d2.upsert(o3)];
                  case 3:
                    return y2.sent(), s3.length > 0 ? [4, d2.removeUnsentMessages({ channelUrl: this._channel.url, reqIds: s3 })] : [3, 5];
                  case 4:
                    y2.sent(), y2.label = 5;
                  case 5:
                    return f3 = { range: this._syncRange, isPrevSyncComplete: this._isPrevSyncComplete, isNextSyncComplete: t3 ? t3.isNextSyncComplete : this._isNextSyncComplete }, [4, u2.set({ key: p2, value: f3, generation: 1 })];
                  case 6:
                    return y2.sent(), _3 = { source: de.MESSAGE_BACKGROUND, payload: { channel: n2, messages: o3 } }, h2.send(_3), e5.hasNext = !this._isPrevSyncComplete, [3, 8];
                  case 7:
                    J.debug("Message collection background sync has finished."), e5.hasNext = false, y2.label = 8;
                  case 8:
                    return [2, e5];
                }
              }));
            }));
          }), f2, _2), this._nextSync = new Pe(p2, (function(e4) {
            return L(s2, void 0, void 0, (function() {
              var e5, t3, r3, i3, s3, o3, l3, f3, _3, g2 = this;
              return w(this, (function(y2) {
                switch (y2.label) {
                  case 0:
                    return e5 = { hasNext: true, nextParams: null }, [4, u2.get(p2)];
                  case 1:
                    return (t3 = y2.sent()) ? (this._syncRange = t3.range, r3 = nt({ channel: this._channel, ts: this._syncRange.bottom, nextLimit: this._limit }), [4, c2.getMessageList(r3)]) : [3, 7];
                  case 2:
                    return i3 = y2.sent(), s3 = [], o3 = i3.messages.map((function(e6) {
                      var t4 = a2.buildMessage(e6, g2._channel);
                      return (t4.isUserMessage() || t4.isFileMessage()) && t4._isSentByMe() && s3.push(t4.reqId), t4;
                    })), l3 = this.getMaxCreatedAt(o3), this._syncRange.bottom = Math.max(this._syncRange.bottom, l3), this._isNextSyncComplete = o3.length < this._limit, [4, d2.upsert(o3)];
                  case 3:
                    return y2.sent(), s3.length > 0 ? [4, d2.removeUnsentMessages({ channelUrl: this._channel.url, reqIds: s3 })] : [3, 5];
                  case 4:
                    y2.sent(), y2.label = 5;
                  case 5:
                    return f3 = { range: this._syncRange, isPrevSyncComplete: t3 ? t3.isPrevSyncComplete : this._isPrevSyncComplete, isNextSyncComplete: this._isNextSyncComplete }, [4, u2.set({ key: p2, value: f3, generation: 1 })];
                  case 6:
                    y2.sent(), _3 = { source: de.MESSAGE_BACKGROUND, payload: { channel: n2, messages: o3 } }, h2.send(_3), e5.hasNext = !this._isNextSyncComplete, y2.label = 7;
                  case 7:
                    return [2, e5];
                }
              }));
            }));
          }), f2, _2);
        }
        return e2.of = function(t2, n2, r2) {
          return void 0 === r2 && (r2 = Nt), gt[t2] || (gt[t2] = {}), gt[t2][n2.url] || (gt[t2][n2.url] = new e2({ iid: t2, channel: n2, limit: r2 })), gt[t2][n2.url];
        }, Object.defineProperty(e2.prototype, "range", { get: function() {
          return this._syncRange;
        }, enumerable: false, configurable: true }), e2.prototype.resume = function() {
          J.debug("Message collection background sync has resumed."), this._isPrevSyncComplete || this._prevSync.resume(null), this._isNextSyncComplete || this._nextSync.resume(null);
        }, e2.prototype.pause = function() {
          J.debug("Message collection background sync has paused."), this._prevSync.stop(), this._nextSync.stop();
        }, e2.prototype.getMinCreatedAt = function(e3) {
          var t2 = Number.MAX_SAFE_INTEGER;
          return e3.forEach((function(e4) {
            var n2 = e4.createdAt;
            n2 < t2 && (t2 = n2);
          })), t2;
        }, e2.prototype.getMaxCreatedAt = function(e3) {
          var t2 = 0;
          return e3.forEach((function(e4) {
            var n2 = e4.createdAt;
            n2 > t2 && (t2 = n2);
          })), t2;
        }, e2;
      })(), Et = {}, vt = function(e2, t2) {
        return "sendbird:".concat(e2, "@channel/").concat(t2, "/message/changelogs");
      }, bt = (function() {
        function e2(e3) {
          var t2 = e3.iid, n2 = e3.channel, r2 = this;
          this._token = 0, this._sync = null, this._iid = t2, this._channel = n2;
          var i2 = x.get(this._iid).BaseChannel, s2 = O.get(this._iid), a2 = s2.get("currentUserId"), o2 = s2.get("store"), l2 = s2.get("apiClient"), u2 = s2.container.localCacheEnabled, c2 = ot.of(this._iid), d2 = ge.of(this._iid), h2 = vt(a2, this._channel.url);
          this._sync = new Pe(h2, (function(e4) {
            return L(r2, void 0, void 0, (function() {
              var e5, t3, r3, a3, p2, f2, _2, g2, y2, m2, E2 = this;
              return w(this, (function(v2) {
                switch (v2.label) {
                  case 0:
                    return e5 = { hasNext: true, nextParams: "" }, u2 ? [4, o2.get(h2)] : [3, 2];
                  case 1:
                    return r3 = v2.sent(), [3, 3];
                  case 2:
                    r3 = null, v2.label = 3;
                  case 3:
                    t3 = r3, this._token = t3 ? t3.token : s2.get("firstConnectedAt") / 1e3, a3 = { channelUrl: this._channel.url, isOpenChannel: this._channel.isOpenChannel(), includeMetaArray: true, includeReactions: true, includeReplies: true, includeParentMessageText: true, includeThreadInfo: true }, "number" == typeof this._token ? a3.timestamp = this._token : a3.token = this._token, v2.label = 4;
                  case 4:
                    return v2.trys.push([4, 12, , 15]), [4, l2.getMessageChangeLogs(a3)];
                  case 5:
                    return p2 = v2.sent(), f2 = p2.updated.map((function(e6) {
                      return i2.buildMessage(e6, E2._channel);
                    })), _2 = { updatedMessages: f2, deletedMessageIds: p2.deleted.map((function(e6) {
                      return parseInt(e6.message_id);
                    })) }, e5.hasNext = p2.has_more, (_2.updatedMessages.length > 0 || _2.deletedMessageIds.length > 0) && (e5.nextParams = this._token = p2.next), u2 ? (g2 = [], f2.forEach((function(e6) {
                      (e6.isUserMessage() || e6.isFileMessage()) && e6._isSentByMe() && g2.push(e6.reqId);
                    })), g2.length > 0 ? [4, c2.removeUnsentMessages({ channelUrl: this._channel.url, reqIds: g2 })] : [3, 7]) : [3, 11];
                  case 6:
                    v2.sent(), v2.label = 7;
                  case 7:
                    return [4, c2.upsert(f2)];
                  case 8:
                    return v2.sent(), [4, c2.remove(_2.deletedMessageIds)];
                  case 9:
                    return v2.sent(), [4, o2.set({ key: h2, value: { token: this._token }, generation: 1 })];
                  case 10:
                    v2.sent(), v2.label = 11;
                  case 11:
                    return J.debug("Message collection changelog sync update messages count: ", _2.updatedMessages.length), J.debug("Message collection changelog sync deleted message ids count: ", _2.deletedMessageIds.length), y2 = { source: de.MESSAGE_CHANGELOG, payload: R({ channel: n2 }, _2) }, d2.send(y2), [2, e5];
                  case 12:
                    return (m2 = v2.sent()).isInvalidTokenError ? [4, o2.remove(h2)] : [3, 14];
                  case 13:
                    v2.sent(), v2.label = 14;
                  case 14:
                    throw m2;
                  case 15:
                    return [2];
                }
              }));
            }));
          }));
        }
        return e2.of = function(t2, n2) {
          return Et[t2] || (Et[t2] = {}), Et[t2][n2.url] || (Et[t2][n2.url] = new e2({ iid: t2, channel: n2 })), Et[t2][n2.url];
        }, e2.prototype.resume = function() {
          J.debug("Message collection changelog sync has resumed."), this._sync.resume(null, true);
        }, e2.prototype.pause = function() {
          J.debug("Message collection changelog sync has paused."), this._sync.stop();
        }, e2;
      })();
      !(function(e2) {
        e2.CACHE_AND_REPLACE_BY_API = "cache_and_replace_by_api", e2.CACHE_ONLY = "cache_only";
      })(at || (at = {}));
      var Ct, At = (function() {
        function e2() {
          this._onCacheResult = null, this._onApiResult = null;
        }
        return e2.prototype.invokeCacheResult = function(e3, t2) {
          this._onCacheResult(e3, t2);
        }, e2.prototype.invokeApiResult = function(e3, t2) {
          this._onApiResult(e3, t2);
        }, e2.prototype.onCacheResult = function(e3) {
          return this._onCacheResult = e3, this;
        }, e2.prototype.onApiResult = function(e3) {
          return this._onApiResult = e3, this;
        }, e2;
      })();
      !(function(e2) {
        e2[e2.BACKGROUND_SYNC_CLOSE = 0] = "BACKGROUND_SYNC_CLOSE", e2[e2.BACKGROUND_SYNC_OPEN = 1] = "BACKGROUND_SYNC_OPEN", e2[e2.FILL = 2] = "FILL", e2[e2.USER_CALL = 3] = "USER_CALL";
      })(Ct || (Ct = {}));
      var Nt = 100, St = new De({ top: Number.MAX_SAFE_INTEGER, bottom: 0 }), It = /* @__PURE__ */ new Map(), Tt = function(e2) {
        return "sendbird@message/fill/".concat(e2, "/").concat(Oe());
      }, Ut = (function() {
        function e2(e3) {
          var t2 = e3.iid, n2 = e3.channel, r2 = e3.startingPoint, i2 = e3.filter, s2 = e3.limit, a2 = void 0 === s2 ? 100 : s2, o2 = this;
          this._hugeGapCheckTimer = null, this._messages = [], this._syncRange = new De(R({}, St)), this._hasPrevious = true, this._hasNext = true, this._unsentMessages = [], this._iid = t2, this._channel = n2, this._startingPoint = r2, this._filter = i2, this._limit = a2, this._syncLimit = Math.max(a2, Nt), this._eventObserver = { onevent: function(e4) {
            return L(o2, void 0, void 0, (function() {
              return w(this, (function(t3) {
                switch (t3.label) {
                  case 0:
                    return [4, this._handleEvent(e4)];
                  case 1:
                    return t3.sent(), [2];
                }
              }));
            }));
          } }, this._eventHandler = { onMessagesAdded: Ke, onMessagesUpdated: Ke, onMessagesDeleted: Ke, onChannelUpdated: Ke, onChannelDeleted: Ke, onHugeGapDetected: Ke };
          var l2 = O.get(this._iid);
          this._localCacheEnabled = l2.container.localCacheEnabled, this._localCacheEnabled && (this._backgroundSync = mt.of(this._iid, this._channel, this._syncLimit), this._backgroundSync.resume()), this._changelogSync = bt.of(this._iid, this._channel), this._changelogSync.resume(), this._connectionObserver = { onConnect: function() {
            o2._checkHugeGap(), o2._localCacheEnabled && o2._backgroundSync.resume(), o2._changelogSync.resume();
          }, onDisconnect: function() {
            return L(o2, void 0, void 0, (function() {
              return w(this, (function(e4) {
                switch (e4.label) {
                  case 0:
                    return [4, Qe.ready()];
                  case 1:
                    return e4.sent() || (this._previousFillSync.stop(), this._nextFillSync.stop(), this._localCacheEnabled && this._backgroundSync.pause(), this._changelogSync.pause()), [2];
                }
              }));
            }));
          } }, this._previousFillSync = new Pe(Tt("prev"), (function(e4) {
            return L(o2, void 0, void 0, (function() {
              var t3, n3, r3;
              return w(this, (function(i3) {
                switch (i3.label) {
                  case 0:
                    return [4, this._getRemoteMessages({ ts: e4, prevLimit: this._syncLimit })];
                  case 1:
                    return (t3 = i3.sent()).length > 0 ? (n3 = Math.min.apply(Math, t3.map((function(e5) {
                      return e5.createdAt;
                    }))), this._syncRange.top = Math.min(this._syncRange.top, n3), r3 = new _t(de.MESSAGE_FILL, t3[0].sendingStatus), this._addOnlyMessageToView(t3, { context: r3 }), [2, { hasNext: t3.length < this._syncLimit || this._syncRange.top >= n3, nextParams: this._syncRange.top }]) : [2, { hasNext: false, nextParams: 0 }];
                }
              }));
            }));
          })), this._nextFillSync = new Pe(Tt("next"), (function(e4) {
            return L(o2, void 0, void 0, (function() {
              var t3, n3, r3;
              return w(this, (function(i3) {
                switch (i3.label) {
                  case 0:
                    return [4, this._getRemoteMessages({ ts: e4, nextLimit: this._syncLimit })];
                  case 1:
                    return (t3 = i3.sent()).length > 0 ? (n3 = Math.max.apply(Math, t3.map((function(e5) {
                      return e5.createdAt;
                    }))), this._syncRange.bottom = Math.max(this._syncRange.bottom, n3), r3 = new _t(de.MESSAGE_FILL, t3[0].sendingStatus), this._addOnlyMessageToView(t3, { context: r3 }), [2, { hasNext: t3.length < this._syncLimit || this._syncRange.bottom <= n3, nextParams: this._syncRange.bottom }]) : [2, { hasNext: false, nextParams: 0 }];
                }
              }));
            }));
          })), pe.of(this._iid).addObserver(this._connectionObserver);
        }
        return e2.prototype._handleEvent = function(e3) {
          var t2 = e3.source, n2 = e3.payload, r2 = void 0 === n2 ? {} : n2, i2 = wi.getInstance(this._iid);
          switch (e3.source) {
            case de.MESSAGE_BACKGROUND:
              break;
            case de.MESSAGE_CHANGELOG:
              var s2 = r2, a2 = s2.channel, o2 = s2.updatedMessages, l2 = s2.deletedMessageIds;
              if (a2 && a2.url === this._channel.url) {
                if (o2 && o2.length > 0) {
                  this._removeMatchingUnsentMessagesFromView(o2);
                  var u2 = new _t(t2, o2[0].sendingStatus);
                  this._addMessagesToView(o2, { context: u2 });
                }
                if (l2 && l2.length > 0) {
                  if ((p2 = this._removeMessagesFromView(l2, {})).length > 0) {
                    u2 = new _t(t2, p2[0].sendingStatus);
                    this._eventHandler.onMessagesDeleted(u2, this._channel, p2);
                  }
                }
              }
              break;
            case de.LOCAL_MESSAGE_PENDING_CREATED:
            case de.LOCAL_MESSAGE_RESEND_STARTED:
            case de.LOCAL_MESSAGE_CANCELED:
              var c2 = r2, d2 = (a2 = c2.channel, c2.message);
              u2 = new _t(t2, d2.sendingStatus);
              a2.url === this._channel.url && this._upsertUnsentMessagesToView([d2], { context: u2 });
              break;
            case de.EVENT_MESSAGE_SENT:
              var h2 = r2;
              a2 = h2.channel, d2 = h2.message;
              if (a2.url === this._channel.url) {
                var p2 = this._removeMatchingUnsentMessagesFromView([d2]);
                if (this._hasNext) {
                  if (p2.length > 0) {
                    u2 = new _t(t2, p2[0].sendingStatus);
                    this._eventHandler.onMessagesDeleted(u2, a2, p2);
                  }
                } else {
                  this._addMessagesToView([d2], {});
                  var u2 = new _t(t2, d2.sendingStatus);
                  p2.length > 0 ? this._eventHandler.onMessagesUpdated(u2, a2, [d2]) : this._eventHandler.onMessagesAdded(u2, a2, [d2]);
                }
              }
              break;
            case de.EVENT_MESSAGE_RECEIVED:
              var f2 = r2;
              a2 = f2.channel, d2 = f2.message;
              if (a2.url === this._channel.url && !this._hasNext) {
                u2 = new _t(t2, d2.sendingStatus);
                this._addMessagesToView([d2], { context: u2 });
              }
              break;
            case de.LOCAL_MESSAGE_FAILED:
              var _2 = r2;
              a2 = _2.channel, d2 = _2.message;
              if (a2.url === this._channel.url && d2.sendingStatus === i2.MessageSendingStatus.FAILED) {
                u2 = new _t(t2, d2.sendingStatus);
                this._upsertUnsentMessagesToView([d2], { context: u2 });
              }
              break;
            case de.EVENT_MESSAGE_UPDATED:
              var g2 = r2;
              a2 = g2.channel, d2 = g2.message;
              if (a2.url === this._channel.url) {
                u2 = new _t(t2, d2.sendingStatus);
                this._addMessagesToView([d2], { context: u2, isUpdateOnly: true });
              }
              break;
            case de.EVENT_MESSAGE_DELETED:
              var y2 = r2, m2 = (a2 = y2.channel, y2.messageId);
              if (a2.url === this._channel.url) {
                if (It.delete(m2), (p2 = this._removeMessagesFromView([m2], {})).length > 0) {
                  u2 = new _t(t2, p2[0].sendingStatus);
                  this._eventHandler.onMessagesDeleted(u2, this._channel, p2);
                }
              }
              break;
            case de.EVENT_DELIVERY_RECEIPT_UPDATED:
            case de.EVENT_READ_RECEIPT_UPDATED:
              if ((a2 = r2.channel).isGroupChannel()) {
                o2 = [];
                for (var E2 = 0, v2 = this._messages; E2 < v2.length; E2++) {
                  d2 = v2[E2];
                  (It.get(d2.messageId) || 0) !== (T2 = this.channel.getUnreadMemberCount(d2)) && (o2.push(d2), T2 > 0 ? It.set(d2.messageId, T2) : It.delete(d2.messageId));
                }
                if (o2.length > 0) {
                  u2 = new _t(t2, o2[0].sendingStatus);
                  this._eventHandler.onMessagesUpdated(u2, a2, o2);
                }
              }
              break;
            case de.EVENT_USER_LEFT:
              var b2 = O.get(this._iid), C2 = r2, A2 = (a2 = C2.channel, C2.user), N2 = b2.get("currentUserId");
              if (A2.userId !== N2) {
                o2 = [];
                for (var S2 = 0, I2 = this._messages; S2 < I2.length; S2++) {
                  var T2;
                  d2 = I2[S2];
                  (It.get(d2.messageId) || 0) !== (T2 = this.channel.getUnreadMemberCount(d2)) && (o2.push(d2), T2 > 0 ? It.set(d2.messageId, T2) : It.delete(d2.messageId));
                }
                if (o2.length > 0) {
                  u2 = new _t(t2, o2[0].sendingStatus);
                  this._eventHandler.onMessagesUpdated(u2, a2, o2);
                }
              } else {
                u2 = new Te(t2);
                this._eventHandler.onChannelDeleted(u2, a2.url);
              }
              break;
            case de.EVENT_CHANNEL_CHANGED:
            case de.EVENT_USER_RECEIVED_INVITATION:
            case de.EVENT_USER_JOINED:
            case de.EVENT_CHANNEL_FROZEN:
            case de.EVENT_CHANNEL_UNFROZEN:
            case de.EVENT_CHANNEL_HIDDEN:
            case de.EVENT_CHANNEL_UNHIDDEN:
            case de.EVENT_USER_MUTED:
            case de.EVENT_USER_UNMUTED:
            case de.EVENT_TYPING_STATUS_UPDATED:
            case de.EVENT_OPERATOR_UPDATED:
            case de.EVENT_CHANNEL_METADATA_UPDATED:
            case de.EVENT_CHANNEL_METADATA_DELETED:
            case de.EVENT_CHANNEL_METACOUNTER_UPDATED:
            case de.EVENT_CHANNEL_METACOUNTER_DELETED:
              a2 = r2.channel, u2 = new Te(t2);
              this._eventHandler.onChannelUpdated(u2, a2);
              break;
            case de.EVENT_CHANNEL_DELETED:
              a2 = r2.channel, u2 = new Te(t2);
              this._eventHandler.onChannelDeleted(u2, a2.url);
          }
        }, e2.prototype._createRemoteMessageParams = function(e3) {
          var t2 = e3.prevLimit, n2 = void 0 === t2 ? 0 : t2, r2 = e3.nextLimit, i2 = void 0 === r2 ? 0 : r2, s2 = new (0, x.get(this._iid).MessageListParams)();
          return s2.isInclusive = true, s2.prevResultSize = n2, s2.nextResultSize = i2, s2.includeMetaArray = true, s2.includeReactions = true, s2.includeThreadInfo = true, s2.includeReplies = true, s2.includeParentMessageText = true, this._filter.messageType && (s2.messageType = this._filter.messageType), this._filter.customTypes.length > 0 && (s2.customTypes = this._filter.customTypes), this._filter.senderUserIds.length > 0 && (s2.senderUserIds = this._filter.senderUserIds), s2;
        }, e2.prototype._getRemoteMessages = function(e3) {
          var t2 = e3.ts, n2 = e3.prevLimit, r2 = void 0 === n2 ? 0 : n2, i2 = e3.nextLimit, s2 = void 0 === i2 ? 0 : i2;
          return L(this, void 0, void 0, (function() {
            var e4, n3, i3, a2;
            return w(this, (function(o2) {
              switch (o2.label) {
                case 0:
                  return e4 = [], r2 > 0 ? (i3 = this._createRemoteMessageParams({ prevLimit: r2, nextLimit: 0 }), [4, this._channel.getMessagesByTimestamp(t2, i3)]) : [3, 2];
                case 1:
                  n3 = o2.sent(), e4 = e4.concat(n3), this._hasPrevious = n3.length >= r2, o2.label = 2;
                case 2:
                  return s2 > 0 ? (i3 = this._createRemoteMessageParams({ prevLimit: 0, nextLimit: s2 }), [4, this._channel.getMessagesByTimestamp(t2, i3)]) : [3, 4];
                case 3:
                  a2 = o2.sent(), e4 = e4.concat(a2), this._hasNext = a2.length >= s2, o2.label = 4;
                case 4:
                  return e4.length > 0 ? [4, this._upsertRemotelyFetchedMessages(e4)] : [3, 6];
                case 5:
                  o2.sent(), o2.label = 6;
                case 6:
                  return [2, e4];
              }
            }));
          }));
        }, e2.prototype._upsertRemotelyFetchedMessages = function(e3, t2) {
          return void 0 === t2 && (t2 = {}), L(this, void 0, void 0, (function() {
            var n2, r2, i2, s2;
            return w(this, (function(a2) {
              switch (a2.label) {
                case 0:
                  return n2 = t2.context, r2 = void 0 === n2 ? null : n2, i2 = ot.of(this._iid), s2 = e3.map((function(e4) {
                    return e4.reqId;
                  })), [4, i2.removeUnsentMessages({ channelUrl: this.channel.url, reqIds: s2 })];
                case 1:
                  return a2.sent(), this._removeMatchingUnsentMessagesFromView(e3, { context: r2 }), [4, i2.upsert(e3, Je.SUCCEEDED)];
                case 2:
                  return a2.sent(), [2];
              }
            }));
          }));
        }, e2.prototype._checkHugeGap = function() {
          return L(this, void 0, void 0, (function() {
            var e3, t2, n2, r2, i2, s2, a2, o2, l2, u2, c2, d2, h2, p2, f2, _2 = this;
            return w(this, (function(g2) {
              switch (g2.label) {
                case 0:
                  return g2.trys.push([0, 12, , 13]), e3 = x.get(this._iid).BaseChannel, t2 = O.get(this._iid), n2 = t2.get("apiClient"), this._messages.length > 0 ? (r2 = ot.of(this._iid), i2 = { from: this._messages[0].createdAt, to: Math.min(this._syncRange.top, this._messages[this._messages.length - 1].createdAt), cachedCount: 0 }, s2 = i2, [4, r2.countBetween(this._channel.url, this._filter, i2.from, i2.to)]) : [3, 8];
                case 1:
                  return s2.cachedCount = g2.sent(), a2 = { from: Math.max(this._syncRange.bottom, this._messages[0].createdAt), to: this.hasNext ? this._messages[this._messages.length - 1].createdAt : Number.MAX_SAFE_INTEGER, cachedCount: 0 }, o2 = a2, [4, r2.countBetween(this._channel.url, this._filter, a2.from, a2.to)];
                case 2:
                  return o2.cachedCount = g2.sent(), l2 = { iid: this._iid, channelUrl: this._channel.url, channelType: this._channel.channelType, filter: this._filter, previous: i2, next: a2 }, [4, n2.checkMessageHugeGap(R(R({}, l2), l2.filter))];
                case 3:
                  return u2 = g2.sent(), (c2 = { isHugeGap: !!u2.is_huge_gap, previousMessages: u2.prev_messages.map((function(t3) {
                    return e3.buildMessage(t3, _2._channel);
                  })) || [], previousHasMore: !!u2.prev_hasmore, nextMessages: u2.next_messages.map((function(t3) {
                    return e3.buildMessage(t3, _2._channel);
                  })) || [], nextHasMore: !!u2.next_hasmore }).isHugeGap ? [3, 6] : (h2 = P(P([], c2.previousMessages, true), c2.nextMessages, true), J.debug("Message collection non-huge gap message fill count: ", h2.length), h2.length > 0 ? (p2 = new _t(de.MESSAGE_FILL, h2[0].sendingStatus), [4, this._upsertRemotelyFetchedMessages(h2, { context: p2 })]) : [3, 5]);
                case 4:
                  g2.sent(), this._addOnlyMessageToView(h2, { context: p2 }), this._extendSyncRange(["prev"], c2.previousMessages), this._extendSyncRange(["next"], c2.nextMessages), c2.previousHasMore && this._previousFillSync.run(this._syncRange.top), c2.nextHasMore && this._nextFillSync.run(this._syncRange.bottom), g2.label = 5;
                case 5:
                  return [3, 7];
                case 6:
                  setTimeout((function() {
                    return _2._eventHandler.onHugeGapDetected();
                  }), 10), g2.label = 7;
                case 7:
                  return [3, 11];
                case 8:
                  return d2 = Math.floor(this._syncLimit / 2), [4, this._getRemoteMessages({ ts: this._startingPoint, prevLimit: d2, nextLimit: d2 })];
                case 9:
                  return (h2 = g2.sent()).length > 0 ? (p2 = new _t(de.MESSAGE_FILL, h2[0].sendingStatus), [4, this._upsertRemotelyFetchedMessages(h2, { context: p2 })]) : [3, 11];
                case 10:
                  g2.sent(), this._addOnlyMessageToView(h2, { context: p2 }), this._extendSyncRange(["prev", "next"], this._messages), g2.label = 11;
                case 11:
                  return [3, 13];
                case 12:
                  return f2 = g2.sent(), J.warn("Message collection huge gap checker error: ", f2), this._hugeGapCheckTimer = setTimeout((function() {
                    _2._hugeGapCheckTimer = null, _2._checkHugeGap();
                  }), 3e3), [3, 13];
                case 13:
                  return [2];
              }
            }));
          }));
        }, e2.prototype._extendSyncRange = function(e3, t2) {
          if (t2.length > 0) {
            var n2 = t2.map((function(e4) {
              return e4.createdAt;
            }));
            e3.includes("prev") && (this._syncRange.top = Math.min.apply(Math, P([this._syncRange.top], n2, false))), e3.includes("next") && (this._syncRange.bottom = Math.max.apply(Math, P([this._syncRange.bottom], n2, false)));
          }
        }, e2.prototype._updateChildMessagesInView = function(e3) {
          var t2 = [];
          return this._messages.forEach((function(n2) {
            n2.applyParentMessage(e3) && t2.push(n2);
          })), t2;
        }, e2.prototype._addOnlyMessageToView = function(e3, t2) {
          void 0 === t2 && (t2 = {});
          var n2 = t2.context, r2 = void 0 === n2 ? null : n2;
          t2.isUpdateOnly;
          for (var i2 = wi.getInstance(this._iid), s2 = [], a2 = 0, o2 = e3; a2 < o2.length; a2++) {
            var l2 = o2[a2];
            if (l2.sendingStatus === i2.MessageSendingStatus.SUCCEEDED) {
              var u2 = this._messages.map((function(e4) {
                return e4.messageId;
              })).indexOf(l2.messageId);
              if (this._filter.match(l2)) {
                var c2 = this._channel.getUnreadMemberCount(l2);
                if (It.set(l2.messageId, c2), -1 === u2) {
                  var d2 = tt(this._messages, l2);
                  s2.push(l2), this._messages.splice(d2, 0, l2);
                }
              }
            }
          }
          r2 && s2.length > 0 && this._eventHandler.onMessagesAdded(r2, this._channel, s2);
        }, e2.prototype._addMessagesToView = function(e3, t2) {
          void 0 === t2 && (t2 = {});
          for (var n2 = t2.context, r2 = void 0 === n2 ? null : n2, i2 = t2.isUpdateOnly, s2 = void 0 !== i2 && i2, a2 = wi.getInstance(this._iid), o2 = [], l2 = [], u2 = [], c2 = 0, d2 = e3; c2 < d2.length; c2++) {
            var h2 = d2[c2];
            if (h2.sendingStatus === a2.MessageSendingStatus.SUCCEEDED) {
              var p2 = this._messages.map((function(e4) {
                return e4.messageId;
              })).indexOf(h2.messageId);
              if (this._filter.match(h2)) {
                var f2 = this._channel.getUnreadMemberCount(h2);
                if (It.set(h2.messageId, f2), p2 >= 0) {
                  if (l2.push(h2), this._messages[p2] = h2, h2.updatedAt > 0) {
                    var _2 = this._updateChildMessagesInView(h2);
                    l2 = l2.concat(_2);
                  }
                } else if (!s2) {
                  var g2 = tt(this._messages, h2);
                  o2.push(h2), this._messages.splice(g2, 0, h2);
                }
              } else p2 >= 0 && (u2.push(h2), this._messages.splice(p2, 1));
            }
          }
          r2 && (o2.length > 0 && this._eventHandler.onMessagesAdded(r2, this._channel, o2), l2.length > 0 && this._eventHandler.onMessagesUpdated(r2, this._channel, l2), u2.length > 0 && this._eventHandler.onMessagesDeleted(r2, this._channel, u2));
        }, e2.prototype._removeMessagesFromView = function(e3, t2) {
          void 0 === t2 && (t2 = {});
          for (var n2 = t2.context, r2 = void 0 === n2 ? null : n2, i2 = [], s2 = 0, a2 = e3; s2 < a2.length; s2++) {
            var o2 = a2[s2], l2 = this._messages.map((function(e4) {
              return e4.messageId;
            })).indexOf(o2);
            if (l2 >= 0) {
              var u2 = this._messages[l2];
              i2.push(u2), this._messages.splice(l2, 1);
            }
          }
          return r2 && i2.length > 0 && this._eventHandler.onMessagesDeleted(r2, this._channel, i2), i2;
        }, e2.prototype._upsertUnsentMessagesToView = function(e3, t2) {
          void 0 === t2 && (t2 = {});
          for (var n2 = t2.context, r2 = void 0 === n2 ? null : n2, i2 = [], s2 = [], a2 = [], o2 = 0, l2 = e3; o2 < l2.length; o2++) {
            var u2 = l2[o2], c2 = this._unsentMessages.map((function(e4) {
              return e4.reqId;
            })).indexOf(u2.reqId);
            if (this._filter.match(u2)) if (c2 >= 0) s2.push(u2), this._unsentMessages[c2] = u2;
            else {
              var d2 = tt(this._unsentMessages, u2);
              i2.push(u2), this._unsentMessages.splice(d2, 0, u2);
            }
            else c2 >= 0 && (this._unsentMessages.splice(c2, 1), a2.push(u2));
          }
          r2 && (i2.length > 0 && this._eventHandler.onMessagesAdded(r2, this._channel, i2), s2.length > 0 && this._eventHandler.onMessagesUpdated(r2, this._channel, s2), a2.length > 0 && this._eventHandler.onMessagesDeleted(r2, this._channel, a2));
        }, e2.prototype._removeMatchingUnsentMessagesFromView = function(e3, t2) {
          void 0 === t2 && (t2 = {});
          for (var n2 = t2.context, r2 = void 0 === n2 ? null : n2, i2 = [], s2 = 0, a2 = e3; s2 < a2.length; s2++) {
            var o2 = a2[s2];
            if ((o2.isUserMessage() || o2.isFileMessage()) && o2._isSentByMe()) {
              var l2 = this._unsentMessages.map((function(e4) {
                return e4.reqId;
              })).indexOf(o2.reqId);
              if (l2 >= 0) {
                var u2 = this._unsentMessages[l2];
                i2.push(u2), this._unsentMessages.splice(l2, 1);
              }
            }
          }
          return r2 && i2.length > 0 && this._eventHandler.onMessagesDeleted(r2, this._channel, i2), i2;
        }, e2.prototype._removeFailedMessagesFromView = function(e3) {
          var t2 = wi.getInstance(this._iid), n2 = [], r2 = [], i2 = this._unsentMessages.map((function(e4) {
            return e4.reqId;
          }));
          if (e3) for (var s2 = 0, a2 = e3; s2 < a2.length; s2++) {
            var o2 = a2[s2], l2 = i2.indexOf(o2.reqId);
            l2 >= 0 && this._unsentMessages[l2].sendingStatus === t2.MessageSendingStatus.FAILED ? n2.push(this._unsentMessages[l2]) : r2.push(this._unsentMessages[l2]);
          }
          else for (var u2 = 0, c2 = this._unsentMessages; u2 < c2.length; u2++) {
            (o2 = c2[u2]).sendingStatus === t2.MessageSendingStatus.FAILED ? n2.push(o2) : r2.push(o2);
          }
          return this._unsentMessages = r2, n2;
        }, e2._processNextAutoResend = function(e3) {
          if (e3.isCacheEnabled && !e3.isInBackground && e3.getConnectionState() === e3.ConnectionState.OPEN) try {
            var t2 = e3.getAutoResendQueue();
            if (t2.length > 0) {
              e3.getIsProcessingAutoResend() || (J.debug("Auto-resend queue started."), e3.setIsProcessingAutoResend(true));
              var n2 = t2[0];
              J.debug("Processing auto-resend for message request id: ", n2.reqId), x.get(e3._iid).GroupChannel.getChannel(n2.channelUrl, T.INTERNAL_CALL, (function(t3, r2) {
                var i2;
                if (e3.getErrorFirstCallback() && (r2 = (i2 = [t3, r2])[0], t3 = i2[1]), r2) throw r2;
                n2.isUserMessage() ? t3._autoResendUserMessage(n2) : n2.isFileMessage() && t3._autoResendFileMessage(n2);
              }));
            } else J.debug("Auto-resend queue finished."), e3.setIsProcessingAutoResend(false);
          } catch (t3) {
            J.warn("Process auto-resend error: ", t3), e3.setIsProcessingAutoResend(false);
          }
        }, e2._completeCurrentAndProcessNextAutoResend = function(e3, t2) {
          if (e3.isCacheEnabled && t2._isAutoResendRegistered) {
            var n2 = e3.getAutoResendQueue();
            if (t2.sendingStatus === e3.MessageSendingStatus.SUCCEEDED || t2.sendingStatus === e3.MessageSendingStatus.FAILED && !se.isAutoResendableError(t2.errorCode)) n2.length > 0 && t2.reqId === n2[0].reqId && (n2.shift(), this._processNextAutoResend(e3));
            else if (t2.sendingStatus === e3.MessageSendingStatus.PENDING) {
              if (n2.length > 0 && n2.map((function(e4) {
                return e4.reqId;
              })).indexOf(t2.reqId) > -1) return;
              n2.push(t2), !e3.getIsProcessingAutoResend() && n2.length > 0 && this._processNextAutoResend(e3);
            }
          }
        }, e2._processAutoResendRegisteredPendingMessages = function(e3) {
          return L(this, void 0, void 0, (function() {
            var t2, n2, r2, i2, s2, a2, o2, l2, u2, c2, d2, h2;
            return w(this, (function(p2) {
              switch (p2.label) {
                case 0:
                  return t2 = ot.of(e3._iid), n2 = ge.of(e3._iid), (r2 = new et()).sendingStatus = e3.MessageSendingStatus.PENDING, [4, t2.getAllUnsentMessages(r2)];
                case 1:
                  i2 = p2.sent(), s2 = 0, a2 = i2, p2.label = 2;
                case 2:
                  return s2 < a2.length ? (o2 = a2[s2], [4, e3.GroupChannel.getChannel(o2.channelUrl)]) : [3, 7];
                case 3:
                  return l2 = p2.sent(), o2._isAutoResendRegistered ? (u2 = (/* @__PURE__ */ new Date()).getTime(), c2 = o2.createdAt + 2592e5, u2 <= c2 ? (-1 === (d2 = e3.getAutoResendQueue()).map((function(e4) {
                    return e4.reqId;
                  })).indexOf(o2.reqId) && d2.push(o2), [3, 6]) : [3, 4]) : [3, 6];
                case 4:
                  return J.debug("Auto-resend registered pending messaged expired. Expiration date: ", new Date(c2).toLocaleString()), (h2 = o2._clone()).sendingStatus = e3.MessageSendingStatus.FAILED, h2.requestState = e3.MessageRequestState.FAILED, h2._isAutoResendRegistered = false, [4, t2.upsert([h2], Je.UNSENT)];
                case 5:
                  p2.sent(), n2.send({ source: de.LOCAL_MESSAGE_FAILED, payload: { channel: l2, message: h2 } }), p2.label = 6;
                case 6:
                  return s2++, [3, 2];
                case 7:
                  return [2];
              }
            }));
          }));
        }, e2._processNonAutoResendRegisteredPendingMessages = function(e3) {
          return L(this, void 0, void 0, (function() {
            var t2, n2, r2, i2, s2, a2, o2, l2, u2;
            return w(this, (function(c2) {
              switch (c2.label) {
                case 0:
                  return t2 = ot.of(e3._iid), n2 = ge.of(e3._iid), (r2 = new et()).sendingStatus = e3.MessageSendingStatus.PENDING, [4, t2.getAllUnsentMessages(r2)];
                case 1:
                  i2 = c2.sent(), s2 = 0, a2 = i2, c2.label = 2;
                case 2:
                  return s2 < a2.length ? (o2 = a2[s2], [4, e3.GroupChannel.getChannel(o2.channelUrl)]) : [3, 6];
                case 3:
                  return l2 = c2.sent(), o2._isAutoResendRegistered ? [3, 5] : (J.debug("Cached pending message is not auto-resend registered. Changing its sending status to failed: ", o2.reqId), (u2 = o2._clone()).sendingStatus = e3.MessageSendingStatus.FAILED, u2.requestState = e3.MessageRequestState.FAILED, u2.errorCode = H.ACK_TIMEOUT, [4, t2.upsert([u2], Je.UNSENT)]);
                case 4:
                  c2.sent(), n2.send({ source: de.LOCAL_MESSAGE_FAILED, payload: { channel: l2, message: u2 } }), c2.label = 5;
                case 5:
                  return s2++, [3, 2];
                case 6:
                  return [2];
              }
            }));
          }));
        }, Object.defineProperty(e2.prototype, "channel", { get: function() {
          return this._channel;
        }, enumerable: false, configurable: true }), Object.defineProperty(e2.prototype, "succeededMessages", { get: function() {
          return this._messages;
        }, enumerable: false, configurable: true }), Object.defineProperty(e2.prototype, "pendingMessages", { get: function() {
          var e3 = wi.getInstance(this._iid);
          return this._unsentMessages.filter((function(t2) {
            return t2.sendingStatus === e3.MessageSendingStatus.PENDING;
          }));
        }, enumerable: false, configurable: true }), Object.defineProperty(e2.prototype, "failedMessages", { get: function() {
          var e3 = wi.getInstance(this._iid);
          return this._unsentMessages.filter((function(t2) {
            return t2.sendingStatus === e3.MessageSendingStatus.FAILED;
          }));
        }, enumerable: false, configurable: true }), Object.defineProperty(e2.prototype, "startingPoint", { get: function() {
          return this._startingPoint;
        }, enumerable: false, configurable: true }), Object.defineProperty(e2.prototype, "hasPrevious", { get: function() {
          return this._hasPrevious;
        }, enumerable: false, configurable: true }), Object.defineProperty(e2.prototype, "hasNext", { get: function() {
          return this._hasNext;
        }, enumerable: false, configurable: true }), e2.prototype.initialize = function(e3) {
          var t2 = this, n2 = new At();
          this._messages = [], this._syncRange = new De(R({}, St)), this._hasNext = true, this._hasPrevious = true;
          var r2 = Math.floor(this._limit / 2), i2 = ot.of(this._iid), s2 = ge.of(this._iid);
          switch (e3) {
            case at.CACHE_ONLY:
              i2.getPreviousAndNextMessages(this._channel.url, this._filter, this._startingPoint, r2).then((function(e4) {
                return L(t2, void 0, void 0, (function() {
                  var t3;
                  return w(this, (function(r3) {
                    switch (r3.label) {
                      case 0:
                        return [4, i2.getUnsentMessages(this._channel.url, this._filter)];
                      case 1:
                        return t3 = r3.sent(), this._upsertUnsentMessagesToView(t3), this._addMessagesToView(e4), n2.invokeCacheResult(null, e4), [2];
                    }
                  }));
                }));
              })).catch((function(e4) {
                n2.invokeCacheResult(e4, null);
              })).finally((function() {
                s2.addObserver(t2._eventObserver);
              }));
              break;
            case at.CACHE_AND_REPLACE_BY_API:
              i2.getPreviousAndNextMessages(this._channel.url, this._filter, this._startingPoint, r2).then((function(e4) {
                return L(t2, void 0, void 0, (function() {
                  var t3;
                  return w(this, (function(r3) {
                    switch (r3.label) {
                      case 0:
                        return [4, i2.getUnsentMessages(this._channel.url, this._filter)];
                      case 1:
                        return t3 = r3.sent(), this._upsertUnsentMessagesToView(t3), this._addMessagesToView(e4), n2.invokeCacheResult(null, e4), [2];
                    }
                  }));
                }));
              })).catch((function(e4) {
                n2.invokeCacheResult(e4, null);
              })).finally((function() {
                t2._getRemoteMessages({ ts: t2._startingPoint, prevLimit: r2, nextLimit: r2 }).then((function(e4) {
                  t2._messages = [], t2._addMessagesToView(e4), t2._extendSyncRange(["prev", "next"], t2._messages), n2.invokeApiResult(null, e4);
                })).catch((function(e4) {
                  n2.invokeApiResult(e4, null);
                })).finally((function() {
                  s2.addObserver(t2._eventObserver);
                }));
              }));
          }
          return n2;
        }, e2.prototype.loadPrevious = function() {
          return L(this, void 0, void 0, (function() {
            var e3, t2;
            return w(this, (function(n2) {
              switch (n2.label) {
                case 0:
                  return this._hasPrevious ? (e3 = this._messages.length > 0 ? Math.min.apply(Math, this._messages.map((function(e4) {
                    return e4.createdAt;
                  }))) : Number.MAX_SAFE_INTEGER, [4, Qe.ready()]) : [3, 5];
                case 1:
                  return n2.sent() ? [3, 3] : (J.debug("Message collection loadPrevious() from the cache."), [4, ot.of(this._iid).getPreviousMessages(this._channel.url, this._filter, e3, this._limit)]);
                case 2:
                  return t2 = n2.sent(), this._addMessagesToView(t2), [2, t2];
                case 3:
                  return J.debug("Message collection loadPrevious() from the server."), [4, this._getRemoteMessages({ ts: e3, prevLimit: this._limit })];
                case 4:
                  return t2 = n2.sent(), this._addMessagesToView(t2), rt(this._syncRange, ["prev"], this._messages), [2, t2];
                case 5:
                  return [2, []];
              }
            }));
          }));
        }, e2.prototype.loadNext = function() {
          return L(this, void 0, void 0, (function() {
            var e3, t2;
            return w(this, (function(n2) {
              switch (n2.label) {
                case 0:
                  return this._hasNext ? (e3 = this._messages.length > 0 ? Math.max.apply(Math, this._messages.map((function(e4) {
                    return e4.createdAt;
                  }))) : 0, [4, Qe.ready()]) : [3, 5];
                case 1:
                  return n2.sent() ? [3, 3] : (J.debug("Message collection loadNext() from the cache."), [4, ot.of(this._iid).getNextMessages(this._channel.url, this._filter, e3, this._limit)]);
                case 2:
                  return t2 = n2.sent(), this._addMessagesToView(t2), [2, t2];
                case 3:
                  return J.debug("Message collection loadNext() from the server."), [4, this._getRemoteMessages({ ts: e3, nextLimit: this._limit })];
                case 4:
                  return t2 = n2.sent(), this._addMessagesToView(t2), rt(this._syncRange, ["next"], this._messages), [2, t2];
                case 5:
                  return [2, []];
              }
            }));
          }));
        }, e2.prototype.removeFailedMessages = function(e3) {
          return L(this, void 0, void 0, (function() {
            var t2, n2, r2, i2;
            return w(this, (function(s2) {
              switch (s2.label) {
                case 0:
                  return t2 = wi.getInstance(this._iid), n2 = ot.of(this._iid), r2 = e3.map((function(e4) {
                    return e4.reqId;
                  })), [4, n2.removeUnsentMessages({ channelUrl: this.channel.url, sendingStatus: t2.MessageSendingStatus.FAILED, reqIds: r2 })];
                case 1:
                  return i2 = s2.sent(), this._removeFailedMessagesFromView(e3), [2, i2];
              }
            }));
          }));
        }, e2.prototype.removeAllFailedMessages = function() {
          return L(this, void 0, void 0, (function() {
            var e3;
            return w(this, (function(t2) {
              switch (t2.label) {
                case 0:
                  return e3 = wi.getInstance(this._iid), [4, ot.of(this._iid).removeUnsentMessages({ channelUrl: this.channel.url, sendingStatus: e3.MessageSendingStatus.FAILED })];
                case 1:
                  return t2.sent(), this._removeFailedMessagesFromView(), [2];
              }
            }));
          }));
        }, e2.prototype.dispose = function() {
          this._localCacheEnabled && (this._previousFillSync.stop(), this._nextFillSync.stop(), this._backgroundSync.pause()), this._changelogSync.pause(), pe.of(this._iid).removeObserver(this._connectionObserver), this._hugeGapCheckTimer && (clearTimeout(this._hugeGapCheckTimer), this._hugeGapCheckTimer = null), ge.of(this._iid).removeObserver(this._eventObserver);
        }, e2.prototype.setMessageCollectionHandler = function(e3) {
          this._eventHandler = e3;
        }, e2;
      })(), Ot = { TIMESTAMP: "timestamp", MESSAGE_ID: "messageId" }, Mt = /* @__PURE__ */ new WeakMap(), kt = /* @__PURE__ */ new WeakMap(), Rt = (function() {
        function e2(t2) {
          c(this, e2), this.url = "", this.channelType = e2.CHANNEL_TYPE_BASE, this.name = "", this.coverUrl = "", this.creator = null, this.createdAt = 0, this.data = null, this.customType = null, this.isFrozen = false, this.isEphemeral = false, Mt.set(this, {}), kt.set(this, ""), t2 && this.__update(t2);
        }
        return h(e2, [{ key: "__update", value: function(e3) {
          this.url = e3.hasOwnProperty("channel_url") ? String(e3.channel_url) : "", this.name = e3.hasOwnProperty("name") ? String(e3.name) : "", this.coverUrl = e3.hasOwnProperty("cover_url") ? String(e3.cover_url) : "", this.createdAt = e3.hasOwnProperty("created_at") ? 1e3 * e3.created_at : 0, this.data = e3.hasOwnProperty("data") ? String(e3.data) : "", this.customType = e3.hasOwnProperty("custom_type") ? e3.custom_type : "", this.isFrozen = !!e3.hasOwnProperty("freeze") && e3.freeze, this.isEphemeral = !!e3.hasOwnProperty("is_ephemeral") && e3.is_ephemeral, e3.hasOwnProperty("created_by") && null !== e3.created_by && "object" === u(e3.created_by) && Object.keys(e3.created_by).length > 0 ? this.creator = new ft(e3.created_by) : this.creator = null, e3.hasOwnProperty("metadata") && null !== e3.metadata && (e3.hasOwnProperty("ts") && "number" == typeof e3.ts ? this._refreshMetaData(e3.metadata, e3.ts) : this._refreshMetaData(e3.metadata, -1)), e3.hasOwnProperty("cached_primary_key") && (this.cachedPrimaryKey = e3.cached_primary_key);
        } }, { key: "_addOrUpdateCachedMetaData", value: function(e3, t2) {
          var n2 = this, r2 = Mt.get(this);
          Object.keys(e3).forEach((function(i2) {
            var s2 = r2[i2], a2 = e3[i2];
            s2 ? t2 > s2.updatedAt && (s2.value = a2, s2.updatedAt = t2, s2.isRemoved = false) : r2[i2] = { value: a2, updatedAt: t2, isRemoved: false }, $e.of(n2._iid).upsert([n2]).then((function() {
            })).catch((function(e4) {
              J.error(e4);
            }));
          }));
        } }, { key: "_markAsDeletedCachedMetaData", value: function(e3, t2) {
          var n2 = this, r2 = Mt.get(this);
          e3.forEach((function(e4) {
            var i2 = r2[e4];
            i2 ? t2 > i2.updatedAt && (i2.isRemoved = true, i2.updatedAt = t2) : r2[e4] = { value: null, updatedAt: t2, isRemoved: true }, $e.of(n2._iid).upsert([n2]).then((function() {
            })).catch((function(e5) {
              J.error(e5);
            }));
          }));
        } }, { key: "_refreshMetaData", value: function(e3, t2) {
          var n2 = {};
          Object.keys(e3).forEach((function(r2) {
            n2[r2] = { value: e3[r2], updatedAt: t2, isRemoved: false };
          })), Mt.set(this, n2);
        } }, { key: "_clearCachedMetaData", value: function() {
          Mt.set(this, {});
        } }, { key: "cachedPrimaryKey", get: function() {
          return kt.get(this);
        }, set: function(e3) {
          kt.set(this, e3);
        } }, { key: "isGroupChannel", value: function() {
          var e3 = x.get(this._iid).BaseChannel;
          return this.channelType === e3.CHANNEL_TYPE_GROUP;
        } }, { key: "isOpenChannel", value: function() {
          var e3 = x.get(this._iid).BaseChannel;
          return this.channelType === e3.CHANNEL_TYPE_OPEN;
        } }, { key: "createOperatorListQuery", value: function() {
          return new (0, x.get(this._iid).OperatorListQuery)(this);
        } }, { key: "createMessageListQuery", value: function() {
          return new (0, x.get(this._iid).MessageListQuery)(this);
        } }, { key: "createPreviousMessageListQuery", value: function() {
          return new (0, x.get(this._iid).PreviousMessageListQuery)(this);
        } }, { key: "serialize", value: function() {
          var e3 = this;
          return ct.serialize(this, (function(t2) {
            if (null !== t2.lastMessage && "object" === u(t2.lastMessage)) {
              var n2 = t2.lastMessage;
              n2.hasOwnProperty("_sender") && (n2.sender = n2._sender, delete n2._sender, t2.lastMessage = n2);
            }
            t2.hasOwnProperty("_messageOffsetTimestamp") && (t2.messageOffsetTimestamp = t2._messageOffsetTimestamp, delete t2._messageOffsetTimestamp), t2.metadata = e3.getCachedMetaData(), e3.cachedPrimaryKey && (t2.cachedPrimaryKey = e3.cachedPrimaryKey);
          }));
        } }, { key: "getMessageChangeLogsByTimestamp", value: function(e3, t2, n2, r2) {
          var i2 = this, s2 = null, a2 = me.parse(arguments, [new me({ type: "number", constraint: function(e4) {
            return e4 >= 0;
          } }), new me({ type: "boolean", optional: true, defaultValue: false }), new me({ type: "boolean", optional: true, defaultValue: false }), new me({ type: "callback" })]), o2 = C(a2, 5);
          return s2 = o2[0], e3 = o2[1], t2 = o2[2], n2 = o2[3], r2 = o2[4], oe(this._iid, (function(r3) {
            s2 ? r3(s2, null) : O.get(i2._iid).container.apiClient.getMessageChangeLogs({ channelUrl: i2.url, ts: e3, token: null, isOpenChannel: i2.isOpenChannel(), includeMetaArray: t2, includeReactions: n2 }).then((function(e4) {
              var t3 = x.get(i2._iid).BaseChannel, n3 = { updatedMessages: e4.updated.map((function(e5) {
                return t3.buildMessage(e5, i2);
              })), deletedMessageIds: e4.deleted.map((function(e5) {
                return parseInt(e5.message_id);
              })), hasMore: e4.has_more, token: e4.next };
              r3(null, n3);
            })).catch((function(e4) {
              r3(e4, null);
            }));
          }), r2);
        } }, { key: "getMessageChangeLogsByToken", value: function(e3, t2, n2, r2) {
          var i2 = this, s2 = null, a2 = me.parse(arguments, [new me({ type: "string", nullable: true }), new me({ type: "boolean", optional: true, defaultValue: false }), new me({ type: "boolean", optional: true, defaultValue: false }), new me({ type: "callback" })]), o2 = C(a2, 5);
          return s2 = o2[0], e3 = o2[1], t2 = o2[2], n2 = o2[3], r2 = o2[4], oe(this._iid, (function(r3) {
            s2 ? r3(s2, null) : O.get(i2._iid).container.apiClient.getMessageChangeLogs({ channelUrl: i2.url, ts: null, token: e3, isOpenChannel: i2.isOpenChannel(), includeMetaArray: t2, includeReactions: n2 }).then((function(e4) {
              var t3 = x.get(i2._iid).BaseChannel, n3 = { updatedMessages: e4.updated.map((function(e5) {
                return t3.buildMessage(e5, i2);
              })), deletedMessageIds: e4.deleted.map((function(e5) {
                return parseInt(e5.message_id);
              })), hasMore: e4.has_more, token: e4.next };
              r3(null, n3);
            })).catch((function(e4) {
              r3(e4, null);
            }));
          }), r2);
        } }, { key: "getMessageChangeLogsSinceToken", value: function(e3, t2, n2) {
          var r2 = this, i2 = x.get(this._iid), s2 = i2.BaseChannel, a2 = i2.MessageChangeLogsParams, o2 = null, u2 = me.parse(arguments, [new me({ type: "string", nullable: true }), new me({ type: a2, constraint: function(e4) {
            return e4._validate();
          } }), new me({ type: "callback" })]), c2 = C(u2, 4);
          return o2 = c2[0], e3 = c2[1], t2 = c2[2], n2 = c2[3], oe(this._iid, (function(n3) {
            o2 ? n3(o2, null) : O.get(r2._iid).container.apiClient.getMessageChangeLogs(l({ channelUrl: r2.url, ts: null, token: e3, isOpenChannel: r2.isOpenChannel() }, t2)).then((function(e4) {
              var t3 = { updatedMessages: e4.updated.map((function(e5) {
                return s2.buildMessage(e5, r2);
              })), deletedMessageIds: e4.deleted.map((function(e5) {
                return parseInt(e5.message_id);
              })), hasMore: e4.has_more, token: e4.next };
              n3(null, t3);
            })).catch((function(e4) {
              n3(e4, null);
            }));
          }), n2);
        } }, { key: "getMessageChangeLogsSinceTimestamp", value: function(e3, t2, n2) {
          var r2 = this, i2 = x.get(this._iid), s2 = i2.BaseChannel, a2 = i2.MessageChangeLogsParams, o2 = null, u2 = me.parse(arguments, [new me({ type: "number", constraint: function(e4) {
            return e4 >= 0;
          } }), new me({ type: a2, constraint: function(e4) {
            return e4._validate();
          } }), new me({ type: "callback" })]), c2 = C(u2, 4);
          return o2 = c2[0], e3 = c2[1], t2 = c2[2], n2 = c2[3], oe(this._iid, (function(n3) {
            o2 ? n3(o2, null) : O.get(r2._iid).container.apiClient.getMessageChangeLogs(l({ channelUrl: r2.url, timestamp: e3, token: null, isOpenChannel: r2.isOpenChannel() }, t2)).then((function(e4) {
              var t3 = { updatedMessages: e4.updated.map((function(e5) {
                return s2.buildMessage(e5, r2);
              })), deletedMessageIds: e4.deleted.map((function(e5) {
                return parseInt(e5.message_id);
              })), hasMore: e4.has_more, token: e4.next };
              n3(null, t3);
            })).catch((function(e4) {
              n3(e4, null);
            }));
          }), n2);
        } }, { key: "getMyMutedInfo", value: function(e3) {
          var t2 = this;
          return oe(this._iid, (function(e4) {
            var n2 = wi.getInstance(t2._iid);
            O.get(t2._iid).container.apiClient.getMyMutedInfo({ channelUrl: t2.url, userId: n2.currentUser ? n2.currentUser.userId : null, isGroupChannel: t2.isGroupChannel() }, (function(t3, n3) {
              var r2 = null;
              t3 || (r2 = { isMuted: n3.is_muted, startAt: n3.start_at, endAt: n3.end_at, remainingDuration: n3.remaining_duration, description: n3.description }), e4(t3, r2);
            }));
          }), e3);
        } }, { key: "_parseMessageListParams", value: function(e3) {
          for (var t2 = x.get(this._iid), n2 = t2.MessageListParams, r2 = new n2(), i2 = null, s2 = false, a2 = 0, o2 = 0, l2 = false, u2 = "", c2 = "", d2 = null, h2 = false, p2 = false, f2 = null, _2 = arguments.length, g2 = new Array(_2 > 1 ? _2 - 1 : 0), y2 = 1; y2 < _2; y2++) g2[y2 - 1] = arguments[y2];
          switch (e3) {
            case "prev":
              var m2 = me.parse(g2, [new me({ type: "number" }), new me({ type: "boolean" }), new me({ type: "number" }), new me({ type: "boolean" }), new me({ type: "string" }), new me({ type: "string" }), new me({ type: "array", optional: true }), new me({ type: "boolean", optional: true, defaultValue: false }), new me({ type: "boolean", optional: true, defaultValue: false }), new me({ type: "callback" })]), E2 = C(m2, 11);
              i2 = E2[0], s2 = E2[2], a2 = E2[3], l2 = E2[4], u2 = E2[5], c2 = E2[6], d2 = E2[7], h2 = E2[8], p2 = E2[9], f2 = E2[10];
              break;
            case "next":
              var v2 = me.parse(g2, [new me({ type: "number" }), new me({ type: "boolean" }), new me({ type: "number" }), new me({ type: "boolean" }), new me({ type: "string" }), new me({ type: "string" }), new me({ type: "array", optional: true }), new me({ type: "boolean", optional: true, defaultValue: false }), new me({ type: "boolean", optional: true, defaultValue: false }), new me({ type: "callback" })]), b2 = C(v2, 11);
              i2 = b2[0], s2 = b2[2], o2 = b2[3], l2 = b2[4], u2 = b2[5], c2 = b2[6], d2 = b2[7], h2 = b2[8], p2 = b2[9], f2 = b2[10];
              break;
            case "prevnext":
              var A2 = me.parse(g2, [new me({ type: "number" }), new me({ type: "number" }), new me({ type: "number" }), new me({ type: "boolean" }), new me({ type: "string" }), new me({ type: "string" }), new me({ type: "array", optional: true }), new me({ type: "boolean", optional: true, defaultValue: false }), new me({ type: "boolean", optional: true, defaultValue: false }), new me({ type: "callback" })]), N2 = C(A2, 11);
              i2 = N2[0], a2 = N2[2], o2 = N2[3], l2 = N2[4], u2 = N2[5], c2 = N2[6], d2 = N2[7], h2 = N2[8], p2 = N2[9], f2 = N2[10], s2 = true;
          }
          return i2 ? [null, f2] : (r2.isInclusive = s2, r2.prevResultSize = a2, r2.nextResultSize = o2, r2.reverse = l2, r2.messageType = u2, r2.customType = c2, "" === r2.customType && (r2.customType = "*"), r2.senderUserIds = d2, r2.includeMetaArray = h2, r2.includeReactions = p2, [r2, f2]);
        } }, { key: "_getMessageList", value: function(e3, t2, n2, r2) {
          var i2 = this, s2 = x.get(this._iid), a2 = s2.MessageListParams, o2 = null, u2 = me.parse(arguments, [new me({ type: "number" }), new me({ type: "string", constraint: function(e4) {
            return Object.values(Ot).includes(e4);
          } }), new me({ type: a2, constraint: function(e4) {
            return e4._validate();
          } }), new me({ type: "callback" })]), c2 = C(u2, 5);
          return o2 = c2[0], e3 = c2[1], t2 = c2[2], n2 = c2[3], r2 = c2[4], oe(this._iid, (function(r3) {
            o2 ? r3(o2, null) : O.get(i2._iid).container.apiClient.getMessageList(l(l({ channel: i2, token: e3, tokenType: t2 }, n2), {}, { shouldReverse: n2.reverse })).then((function(e4) {
              var t3 = x.get(i2._iid).BaseChannel, n3 = e4.messages.map((function(e5) {
                return t3.buildMessage(e5, i2);
              })).filter((function(e5) {
                return null !== e5;
              }));
              r3(null, n3);
            })).catch((function(e4) {
              r3(e4, null);
            }));
          }), r2);
        } }, { key: "getPreviousMessagesByTimestamp", value: function(e3) {
          var t2 = this._parseMessageListParams.apply(this, ["prev"].concat(A(me.toArray(arguments)))), n2 = C(t2, 2), r2 = n2[0], i2 = n2[1];
          return this._getMessageList(e3, Ot.TIMESTAMP, r2, i2);
        } }, { key: "getNextMessagesByTimestamp", value: function(e3) {
          var t2 = this._parseMessageListParams.apply(this, ["next"].concat(A(me.toArray(arguments)))), n2 = C(t2, 2), r2 = n2[0], i2 = n2[1];
          return this._getMessageList(e3, Ot.TIMESTAMP, r2, i2);
        } }, { key: "getPreviousAndNextMessagesByTimestamp", value: function(e3) {
          var t2 = this._parseMessageListParams.apply(this, ["prevnext"].concat(A(me.toArray(arguments)))), n2 = C(t2, 2), r2 = n2[0], i2 = n2[1];
          return this._getMessageList(e3, Ot.TIMESTAMP, r2, i2);
        } }, { key: "getPreviousMessagesByID", value: function(e3) {
          var t2 = this._parseMessageListParams.apply(this, ["prev"].concat(A(me.toArray(arguments)))), n2 = C(t2, 2), r2 = n2[0], i2 = n2[1];
          return this._getMessageList(e3, Ot.MESSAGE_ID, r2, i2);
        } }, { key: "getNextMessagesByID", value: function(e3) {
          var t2 = this._parseMessageListParams.apply(this, ["next"].concat(A(me.toArray(arguments)))), n2 = C(t2, 2), r2 = n2[0], i2 = n2[1];
          return this._getMessageList(e3, Ot.MESSAGE_ID, r2, i2);
        } }, { key: "getPreviousAndNextMessagesByID", value: function(e3) {
          var t2 = this._parseMessageListParams.apply(this, ["prevnext"].concat(A(me.toArray(arguments)))), n2 = C(t2, 2), r2 = n2[0], i2 = n2[1];
          return this._getMessageList(e3, Ot.MESSAGE_ID, r2, i2);
        } }, { key: "getMessagesByTimestamp", value: function(e3, t2, n2) {
          return this._getMessageList(e3, Ot.TIMESTAMP, t2, n2);
        } }, { key: "getMessagesByMessageId", value: function(e3, t2, n2) {
          return this._getMessageList(e3, Ot.MESSAGE_ID, t2, n2);
        } }, { key: "_sendUserMessage", value: function(e3) {
          var t2 = this, n2 = e3.reqId, r2 = e3.message, i2 = e3.data, s2 = e3.customType, a2 = e3.metaArrays, o2 = e3.mentionType, u2 = e3.mentionedUserIds, c2 = e3.mentionedUsers, d2 = e3.mentionedMessageTemplate, h2 = e3.pushNotificationDeliveryOption, p2 = e3.rootMessageId, f2 = e3.parentMessageId, _2 = e3.translationTargetLanguages, g2 = e3.appleCriticalAlertOptions, y2 = e3.silent, m2 = void 0 !== y2 && y2, E2 = e3.isReplyToChannel, v2 = e3.messageParams, b2 = e3.oldMessage, C2 = void 0 === b2 ? null : b2, A2 = e3.isManualResend, N2 = void 0 !== A2 && A2, S2 = e3.callback, I2 = x.get(this._iid), T2 = I2.Command, U2 = I2.UserMessage, M2 = wi.getInstance(this._iid), k2 = ot.of(this._iid), R2 = $e.of(this._iid), L2 = ge.of(this._iid), w2 = O.get(this._iid).container.localCacheEnabled;
          n2 || (n2 = T2.generateRequestId());
          var P2 = {};
          Array.isArray(_2) && _2.forEach((function(e4) {
            return P2[e4] = "";
          }));
          var D2 = U2.objectify({ messageId: 0, reqId: n2, user: M2.currentUser || {}, channel: this, message: r2, data: i2, customType: s2, metaArrays: a2, mentionType: o2, mentionedUserIds: u2, mentionedUsers: c2, mentionedMessageTemplate: d2, rootMessageId: p2, parentMessageId: f2, translations: P2, silent: m2, appleCriticalAlertOptions: g2, isReplyToChannel: E2, messageParams: v2, createdAt: (/* @__PURE__ */ new Date()).getTime() }), F2 = new U2(D2);
          if (F2.requestState = M2.MessageRequestState.PENDING, F2.sendingStatus = M2.MessageSendingStatus.PENDING, F2.requestedMentionUserIds = u2, F2._messageParams = v2, !M2.currentUser) {
            var G2 = new H("Connection should be made first.", H.CONNECTION_REQUIRED), j2 = new U2(D2);
            return j2.requestState = M2.MessageRequestState.FAILED, j2.sendingStatus = M2.MessageSendingStatus.FAILED, j2.requestedMentionUserIds = u2, j2.errorCode = G2.code, S2(G2, j2), F2;
          }
          return (!t2.isGroupChannel() || C2 && C2._isAutoResendRegistered ? Promise.resolve() : k2.upsert([F2], Je.UNSENT).then((function() {
            L2.send({ source: N2 ? de.LOCAL_MESSAGE_RESEND_STARTED : de.LOCAL_MESSAGE_PENDING_CREATED, payload: { channel: t2, message: F2 } });
          }))).then((function() {
            var e4 = T2.bMessage({ channelUrl: t2.url, message: r2, data: i2, customType: s2, metaArrays: a2, mentionType: o2, mentionedUserIds: u2, mentionedMessageTemplate: d2, requestId: n2, rootMessageId: p2, parentMessageId: f2, silent: m2, translationTargetLanguages: _2, pushNotificationDeliveryOption: h2, appleCriticalAlertOptions: g2, isReplyToChannel: E2 });
            (F2.reqId = e4.requestId, t2.isGroupChannel() && M2.getConnectionState() !== M2.ConnectionState.OPEN && M2.currentUser && !M2.connecting && !M2.reconnecting && "string" == typeof s2 && 0 === s2.indexOf("SB_VIDEOCHAT")) ? O.get(M2._iid).container.apiClient.sendUserMessage({ channelUrl: t2.url, isOpenChannel: t2.isOpenChannel(), message: r2, data: i2, customType: s2, translationTargetLanguages: _2, metaArrays: a2, mentionType: o2, mentionedUserIds: u2, mentionedMessageTemplate: d2, pushNotificationDeliveryOption: h2, rootMessageId: p2, parentMessageId: f2, appleCriticalAlertOptions: g2, isReplyToChannel: E2 }, (function(e5, r3) {
              var i3 = null;
              if (e5) {
                if (F2._isAutoResendRegistered && se.isAutoResendableError(e5.code)) return;
                (i3 = new U2(D2)).requestState = M2.MessageRequestState.FAILED, i3.requestedMentionUserIds = u2, C2 && (i3._isAutoResendRegistered = C2._isAutoResendRegistered), e5.code === H.REQUEST_CANCELED ? (i3.sendingStatus = M2.MessageSendingStatus.CANCELED, k2.removeUnsentMessages({ channelUrl: t2.url, sendingStatus: M2.MessageSendingStatus.PENDING, reqIds: [n2] }).then((function() {
                  L2.send({ source: de.LOCAL_MESSAGE_CANCELED, payload: { channel: t2, message: i3 } });
                })).catch((function(e6) {
                  return J.error(e6);
                })).finally((function() {
                  S2 && S2(new H(e5.message, e5.code), i3);
                }))) : (i3.errorCode = e5.code, i3.sendingStatus = M2.MessageSendingStatus.FAILED, w2 && se.isAutoResendableError(e5.code) && (i3.sendingStatus = M2.MessageSendingStatus.PENDING, i3.errorCode = 0, i3._isAutoResendRegistered = true), k2.upsert([i3], Je.UNSENT).then((function() {
                  Ut._completeCurrentAndProcessNextAutoResend(M2, i3), L2.send({ source: de.LOCAL_MESSAGE_FAILED, payload: { channel: t2, message: i3 } });
                })).catch((function(e6) {
                  return J.error(e6);
                })).finally((function() {
                  var t3 = i3._clone();
                  t3.sendingStatus = M2.MessageSendingStatus.FAILED, t3.errorCode = e5.code, t3._isAutoResendRegistered = false, S2 && S2(new H(e5.message, e5.code), t3);
                })));
              } else {
                for (var s3 in (i3 = new U2(r3)).reqId = n2, i3.requestState = M2.MessageRequestState.SUCCEEDED, i3.sendingStatus = M2.MessageSendingStatus.SUCCEEDED, C2 && (i3._isAutoResendRegistered = C2._isAutoResendRegistered), t2.lastMessage = i3, M2.channelHandlers) {
                  M2.channelHandlers[s3].onChannelChanged(t2);
                }
                R2.upsert([t2]).then((function() {
                  L2.send({ source: de.EVENT_CHANNEL_CHANGED, payload: { channel: t2 } });
                })).then((function() {
                  return k2.removeUnsentMessages({ channelUrl: t2.url, sendingStatus: M2.MessageSendingStatus.PENDING, reqIds: [n2] });
                })).then((function() {
                  return k2.upsert([i3], Je.SUCCEEDED);
                })).then((function() {
                  Ut._completeCurrentAndProcessNextAutoResend(M2, i3), L2.send({ source: de.EVENT_MESSAGE_SENT, payload: { channel: t2, message: i3 } });
                })).catch((function(e6) {
                  return J.error(e6);
                })).finally((function() {
                  S2 && S2(null, i3);
                }));
              }
            })) : M2.sendCommand(e4, (function(r3, i3) {
              if (M2.getErrorFirstCallback()) {
                var s3 = [r3, i3];
                i3 = s3[0], r3 = s3[1];
              }
              if (i3) {
                if (F2._isAutoResendRegistered && se.isAutoResendableError(i3.code)) return;
                var a3 = new U2(D2);
                a3.reqId = e4.requestId, a3.requestState = M2.MessageRequestState.FAILED, i3.code === H.REQUEST_CANCELED ? (a3.sendingStatus = M2.MessageSendingStatus.CANCELED, t2.isGroupChannel() && k2.removeUnsentMessages({ channelUrl: t2.url, sendingStatus: M2.MessageSendingStatus.PENDING, reqIds: [n2] }).then((function() {
                  L2.send({ source: de.LOCAL_MESSAGE_CANCELED, payload: { channel: t2, message: a3 } });
                })).catch((function(e5) {
                  return J.error(e5);
                })).finally((function() {
                  S2 && S2(new H(i3.message, i3.code), a3);
                }))) : (a3.sendingStatus = M2.MessageSendingStatus.FAILED, a3.errorCode = i3.code, a3.requestedMentionUserIds = u2, t2.isGroupChannel() ? (w2 && se.isAutoResendableError(i3.code) && (a3.sendingStatus = M2.MessageSendingStatus.PENDING, a3.errorCode = 0, a3._isAutoResendRegistered = true), k2.upsert([a3], Je.UNSENT).then((function() {
                  return Ut._completeCurrentAndProcessNextAutoResend(M2, a3), L2.send({ source: de.LOCAL_MESSAGE_FAILED, payload: { channel: t2, message: a3 } });
                })).catch((function(e5) {
                  return J.error(e5);
                })).finally((function() {
                  var e5 = a3._clone();
                  e5.sendingStatus = M2.MessageSendingStatus.FAILED, e5.errorCode = i3.code, e5._isAutoResendRegistered = false, S2 && S2(new H(i3.message, i3.code), e5);
                }))) : S2 && S2(new H(i3.message, i3.code), a3));
              } else {
                var o3 = new U2(l(l({}, r3.getJsonElement()), {}, { messageParams: v2 }));
                o3.reqId = n2, o3.requestState = M2.MessageRequestState.SUCCEEDED, o3.sendingStatus = M2.MessageSendingStatus.SUCCEEDED, C2 && (o3._isAutoResendRegistered = C2._isAutoResendRegistered);
                var c3 = M2.currentUser;
                if (c3 && o3._sender && c3.userId === o3._sender.userId && (c3.nickname !== o3._sender.nickname && (c3.nickname = o3._sender.nickname), c3.plainProfileUrl !== o3._sender.plainProfileUrl && (c3.plainProfileUrl = o3._sender.plainProfileUrl), se.deepEqual(c3.metaData, o3._sender.metaData) || (c3.metaData = o3._sender.metaData)), t2.isGroupChannel()) {
                  t2.lastMessage = o3, Object.keys(M2.channelHandlers).forEach((function(e5) {
                    M2.channelHandlers[e5].onChannelChanged(t2);
                  }));
                  var d3 = ge.of(t2._iid);
                  $e.of(t2._iid).upsert([t2]).then((function() {
                    d3.send({ source: de.EVENT_CHANNEL_CHANGED, payload: { channel: t2 } });
                  })).then((function() {
                    return k2.removeUnsentMessages({ channelUrl: t2.url, sendingStatus: M2.MessageSendingStatus.PENDING, reqIds: [n2] });
                  })).then((function() {
                    return k2.upsert([o3], Je.SUCCEEDED);
                  })).then((function() {
                    Ut._completeCurrentAndProcessNextAutoResend(M2, o3), d3.send({ source: de.EVENT_MESSAGE_SENT, payload: { channel: t2, message: o3 } });
                  })).catch((function(e5) {
                    return J.error(e5);
                  })).finally((function() {
                    S2 && S2(null, o3);
                  }));
                } else S2 && S2(null, o3);
              }
            }));
          })), F2;
        } }, { key: "sendUserMessage", value: function() {
          var e3 = me.toArray(arguments), t2 = e3.pop(), n2 = null, r2 = null, i2 = x.get(this._iid), s2 = i2.UserMessageParams;
          if ("function" == typeof t2) if (e3[0] instanceof s2) null === (r2 = e3[0]).data && (r2.data = ""), null === r2.customType && (r2.customType = "");
          else if ("string" == typeof e3[0]) switch ((r2 = new s2()).data = "", r2.customType = "", r2.message = e3[0], e3.length) {
            case 1:
              break;
            case 2:
              r2.data = e3[1] || "";
              break;
            case 3:
              r2.data = e3[1] || "", r2.customType = e3[2] || "";
              break;
            case 4:
              r2.data = e3[1] || "", r2.customType = e3[2] || "", r2.translationTargetLanguages = Array.isArray(e3[3]) ? e3[3] : [e3[3]];
              break;
            default:
              n2 = me.error;
          }
          else n2 = me.error;
          else n2 = me.error;
          var a2 = O.get(this._iid), o2 = a2.container.isErrorFirstInCallback;
          return !n2 && r2._validate() && r2.message ? this._sendUserMessage(l(l({}, r2), {}, { metaArrays: r2.metaArrays, mentionType: r2.mentionType, mentionedUserIds: r2._mentionedUserIds, mentionedUsers: r2.mentionedUsers, mentionedMessageTemplate: r2.mentionedMessageTemplate, rootMessageId: r2.rootMessageId, parentMessageId: r2.parentMessageId, translationTargetLanguages: r2._translationTargetLanguages, messageParams: r2, callback: function(e4, n3) {
            o2 ? t2(e4, n3) : t2(n3, e4);
          } })) : (o2 ? t2(me.error, null) : t2(null, me.error), null);
        } }, { key: "_autoResendUserMessage", value: function(e3) {
          var t2 = this, n2 = wi.getInstance(this._iid);
          if (n2 && n2.currentUser) {
            var r2 = e3._messageParams;
            return new Promise((function(n3, i2) {
              return t2._sendUserMessage(l(l({}, r2), {}, { reqId: e3.reqId, metaArrays: r2.metaArrays, mentionType: r2.mentionType, mentionedUserIds: r2._mentionedUserIds, rootMessageId: r2.rootMessageId, parentMessageId: r2.parentMessageId, translationTargetLanguages: r2._translationTargetLanguages, pushNotificationDeliveryOption: r2.pushNotificationDeliveryOption, messageParams: r2, oldMessage: e3, callback: function(e4, t3) {
                e4 ? i2(e4) : n3(t3);
              } }));
            }));
          }
        } }, { key: "_autoResendFileMessage", value: function(e3) {
          var t2 = wi.getInstance(this._iid);
          if (t2 && t2.currentUser) {
            var n2 = this._parsePendingFileMessage(e3), r2 = x.get(this._iid).FileMessageQueue;
            r2.create(this).addJob(new r2.Job({ fileInfo: n2, pendingMessage: e3._clone(), requestId: e3.reqId, error: n2.error, response: null }));
          }
        } }, { key: "resendUserMessage", value: function(e3, t2) {
          var n2 = this, r2 = x.get(this._iid), i2 = r2.UserMessage, s2 = r2.UserMessageParams, a2 = null, o2 = me.parse(arguments, [new me({ type: i2, constraint: function(e4) {
            return 0 === e4.messageId && e4.isResendable() && e4.reqId && e4.channelUrl === n2.url && "string" == typeof e4.message && "string" == typeof e4.data && "string" == typeof e4.customType && "object" === u(e4.translations) && !Array.isArray(e4.translations);
          } }), new me({ type: "callback" })]), c2 = C(o2, 3);
          return a2 = c2[0], e3 = c2[1], t2 = c2[2], oe(this._iid, (function(t3) {
            if (a2) a2.message += " Please check if the failed message is resend-able with `message.isResendable().`", t3(a2, null);
            else {
              var r3 = Object.keys(e3.translations), i3 = s2.PushNotificationDeliveryOption.DEFAULT;
              n2._sendUserMessage(l(l({}, e3), {}, { mentionedUserIds: e3.requestedMentionUserIds, translationTargetLanguages: r3, pushNotificationDeliveryOption: i3, reqId: e3.reqId, messageParams: e3._messageParams, isManualResend: true, callback: t3 }));
            }
          }), t2);
        } }, { key: "updateUserMessage", value: function(e3, t2, n2, r2, i2) {
          var s2 = this, a2 = x.get(this._iid), o2 = a2.Command, u2 = a2.UserMessage, c2 = a2.UserMessageParams, d2 = arguments, h2 = null, p2 = null;
          if ("number" == typeof e3) switch (d2.length) {
            case 3:
              var f2 = me.parse(d2, [new me({ type: "number" }), new me({ type: c2 }), new me({ type: "callback" })]), _2 = C(f2, 4);
              h2 = _2[0], e3 = _2[1], p2 = _2[2], i2 = _2[3];
              break;
            case 5:
              p2 = new c2();
              var g2 = me.parse(d2, [new me({ type: "number" }), new me({ type: "string", nullable: true }), new me({ type: "string", nullable: true }), new me({ type: "string", nullable: true }), new me({ type: "callback" })]), y2 = C(g2, 6);
              h2 = y2[0], e3 = y2[1], t2 = y2[2], n2 = y2[3], r2 = y2[4], i2 = y2[5], p2.message = t2, p2.data = n2, p2.customType = r2;
          }
          return oe(this._iid, (function(t3) {
            if (!h2 && p2 && p2._validate()) {
              var n3 = o2.bUpdateUserMessage(l(l({ channelUrl: s2.url, messageId: e3 }, p2), {}, { mentionType: p2._mentionType, mentionedUserIds: p2._mentionedUserIds, mentionedMessageTemplate: p2.mentionedMessageTemplate })), r3 = wi.getInstance(s2._iid);
              r3.sendCommand(n3, (function(e4, n4) {
                if (r3.getErrorFirstCallback()) {
                  var i3 = [e4, n4];
                  n4 = i3[0], e4 = i3[1];
                }
                var a3 = null;
                if (!n4 && (a3 = new u2(l(l({}, e4.getJsonElement()), {}, { messageParams: p2 })), s2.isGroupChannel())) {
                  var o3 = false;
                  s2.lastMessage ? (s2.lastMessage.createdAt < a3.createdAt || s2.lastMessage.createdAt === a3.createdAt && s2.lastMessage.messageId === a3.messageId && s2.lastMessage.updatedAt < a3.updatedAt) && (s2.lastMessage = a3, o3 = true) : (s2.lastMessage = a3, o3 = true);
                  var c3 = ge.of(s2._iid);
                  if (!a3.silent && o3) Object.keys(r3.channelHandlers).forEach((function(e5) {
                    r3.channelHandlers[e5].onChannelChanged(s2);
                  })), $e.of(s2._iid).upsert([s2]).then((function() {
                    c3.send({ source: de.EVENT_CHANNEL_CHANGED, payload: { channel: s2 } });
                  })).catch((function(e5) {
                    return J.error(e5);
                  }));
                  ot.of(s2._iid).upsert([a3], Je.SUCCEEDED).then((function() {
                    c3.send({ source: de.EVENT_MESSAGE_UPDATED, payload: { channel: s2, message: a3 } });
                  })).catch((function(e5) {
                    return J.error(e5);
                  }));
                }
                t3(n4, a3);
              }));
            } else t3(me.error, null);
          }), i2);
        } }, { key: "translateUserMessage", value: function(e3, t2, n2) {
          var r2 = this, i2 = wi.getInstance(this._iid), s2 = x.get(this._iid), a2 = s2.UserMessage, o2 = null, l2 = me.parse(arguments, [new me({ type: a2, constraint: function(e4) {
            return e4.channelUrl === r2.url && e4.sendingStatus === i2.MessageSendingStatus.SUCCEEDED;
          } }), new me({ type: "array", constraint: function(e4) {
            return e4.every((function(e5) {
              return "string" == typeof e5;
            }));
          } }), new me({ type: "callback" })]), u2 = C(l2, 4);
          return o2 = u2[0], e3 = u2[1], t2 = u2[2], n2 = u2[3], oe(this._iid, (function(n3) {
            o2 ? n3(o2, null) : O.get(r2._iid).container.apiClient.translateUserMessage({ channelUrl: r2.url, isOpenChannel: r2.isOpenChannel(), messageId: e3.messageId, translationTargetLanguages: t2 }, (function(e4, t3) {
              var r3 = null;
              e4 || (r3 = new a2(t3)), n3(e4, r3);
            }));
          }), n2);
        } }, { key: "_parsePendingFileMessage", value: function(e3) {
          var t2 = e3._messageParams.serialize(), n2 = t2.data, r2 = t2.customType, i2 = t2.fileUrl, s2 = t2.thumbnailSizes, a2 = t2.mentionType, o2 = t2.mentionedUserIds, l2 = t2.metaArrays, u2 = t2.parentMessageId, c2 = t2.pushNotificationDeliveryOption, d2 = e3._messageParams;
          return { file: d2.file ? d2.file : i2, name: e3.name, type: e3.type, size: e3.size, data: n2, customType: r2, thumbnailSizes: s2, metaArrays: l2, mentionType: a2, mentionedUserIds: o2, pushNotificationDeliveryOption: c2, rootMessageId: u2, parentMessageId: u2, appleCriticalAlertOptions: d2.appleCriticalAlertOptions, messageParams: e3._messageParams, silent: e3.silent, error: null, progressHandler: null, callback: null };
        } }, { key: "_parseFileMessageArguments", value: function(e3) {
          var t2 = x.get(this._iid), n2 = t2.BaseMessageParams, r2 = t2.FileMessageParams, i2 = { reqId: null, error: null, file: null, name: null, type: null, size: null, data: "", customType: "", thumbnailSizes: [], metaArrays: [], mentionType: n2.MentionType.USERS, mentionedUserIds: [], pushNotificationDeliveryOption: r2.PushNotificationDeliveryOption.DEFAULT, rootMessageId: null, parentMessageId: null, progressHandler: null, silent: false, appleCriticalAlertOptions: null, isReplyToChannel: false, messageParams: null, callback: null };
          if ("function" == typeof e3[e3.length - 1] && (i2.callback = e3.pop()), "function" == typeof e3[e3.length - 1] && (i2.progressHandler = e3.pop()), e3[0] instanceof r2) i2.reqId = e3[0]._reqId, i2.file = e3[0].file || e3[0].fileUrl, i2.name = e3[0].fileName, i2.type = e3[0].mimeType, i2.size = e3[0].fileSize, i2.data = e3[0].data, i2.customType = e3[0].customType, i2.thumbnailSizes = e3[0].thumbnailSizes, i2.metaArrays = e3[0].metaArrays, i2.mentionType = e3[0]._mentionType, i2.mentionedUserIds = e3[0]._mentionedUserIds, i2.pushNotificationDeliveryOption = e3[0].pushNotificationDeliveryOption ? e3[0].pushNotificationDeliveryOption : r2.PushNotificationDeliveryOption.DEFAULT, i2.rootMessageId = e3[0].rootMessageId, i2.parentMessageId = e3[0].parentMessageId, i2.silent = e3[0].silent, e3[0]._validate() || (i2.error = me.error), i2.appleCriticalAlertOptions = e3[0].appleCriticalAlertOptions, i2.isReplyToChannel = e3[0].isReplyToChannel, i2.messageParams = e3[0];
          else if (se.isFile(e3[0]) || "string" == typeof e3[0]) {
            switch (i2.file = e3[0], e3.length) {
              case 1:
                break;
              case 2:
                i2.data = e3[1];
                break;
              case 3:
                i2.data = e3[1], i2.customType = e3[2];
                break;
              case 4:
                i2.data = e3[1], i2.customType = e3[2], i2.thumbnailSizes = e3[3];
                break;
              case 5:
                i2.name = e3[1], i2.type = e3[2], i2.size = e3[3], i2.data = e3[4];
                break;
              case 6:
                i2.name = e3[1], i2.type = e3[2], i2.size = e3[3], i2.data = e3[4], i2.customType = e3[5];
                break;
              case 7:
                i2.name = e3[1], i2.type = e3[2], i2.size = e3[3], i2.data = e3[4], i2.customType = e3[5], i2.thumbnailSizes = e3[6];
            }
            var s2 = C(me.parse([i2.file, i2.name, i2.type, i2.size, i2.data, i2.customType, i2.thumbnailSizes], [new me({ type: ["file", "string"] }), new me({ type: "string", nullable: true }), new me({ type: "string", nullable: true }), new me({ type: "number", nullable: true, constraint: function(e4) {
              return e4 >= 0;
            } }), new me({ type: "string", nullable: true }), new me({ type: "string", nullable: true }), new me({ type: "array" })]), 8);
            i2.error = s2[0], i2.file = s2[1], i2.name = s2[2], i2.type = s2[3], i2.size = s2[4], i2.data = s2[5], i2.customType = s2[6], i2.thumbnailSizes = s2[7];
            var a2 = se.isFile(i2.file);
            a2 && (i2.name = i2.name || i2.file.name, i2.type = i2.type || i2.file.type, i2.size = i2.size || i2.file.size), i2.messageParams = { mentionType: n2.MentionType.USERS, mentionedUserIds: i2.mentionedUserIds, cachedMentionedUsers: [], cachedMentionedUserIds: [], metaArrays: i2.metaArrays, parentMessageId: i2.parentMessageId, pushNotificationDeliveryOption: i2.pushNotificationDeliveryOption, appleCriticalAlertOptions: i2.appleCriticalAlertOptions, fileName: i2.name, mimeType: i2.type, fileSize: i2.size, data: i2.data, customType: i2.customType, isUpdate: false, file: a2 ? i2.file : null, fileUrl: a2 ? null : i2.file, thumbnailSizes: i2.thumbnailSizes };
          } else i2.error = me.error;
          return se.isFile(i2.file) && (i2.name = i2.name || i2.file.name, i2.type = i2.type || i2.file.type, i2.size = i2.size || i2.file.size), i2;
        } }, { key: "_createTempFileMessage", value: function(e3) {
          try {
            var t2, n2 = wi.getInstance(this._iid), r2 = x.get(this._iid), i2 = r2.Command, s2 = r2.FileMessage, a2 = l(l({}, e3), {}, { messageId: 0, reqId: null !== (t2 = e3.reqId) && void 0 !== t2 ? t2 : i2.generateRequestId(), user: n2.currentUser || {}, channel: this, plainUrl: "string" == typeof e3.file ? e3.file : "", thumbnails: e3.thumbnailSizes.map((function(e4) {
              return { url: "", plainUrl: "", width: e4.maxWidth, height: e4.maxHeight, real_width: 0, real_height: 0 };
            })), sendingStatus: n2.MessageSendingStatus.PENDING, createdAt: (/* @__PURE__ */ new Date()).getTime() }), o2 = s2.objectify(a2);
            return new s2(o2);
          } catch (e4) {
            return null;
          }
        } }, { key: "sendFileMessage", value: function() {
          var e3 = this, t2 = me.toArray(arguments), n2 = this._parseFileMessageArguments(t2), r2 = x.get(this._iid), i2 = r2.Command, s2 = null, a2 = i2.generateRequestId();
          n2.error || ((s2 = this._createTempFileMessage(n2)).requestedMentionUserIds = n2.mentionedUserIds, a2 = s2.reqId);
          var o2 = wi.getInstance(this._iid);
          if (o2 && o2.currentUser || (n2.error = new H("Connection should be made first.", H.CONNECTION_REQUIRED)), this.isGroupChannel()) {
            var l2 = ot.of(this._iid), u2 = ge.of(this._iid);
            l2.upsert([s2], Je.UNSENT).then((function() {
              u2.send({ source: de.LOCAL_MESSAGE_PENDING_CREATED, payload: { channel: e3, message: s2 } });
            }));
          }
          var c2 = x.get(this._iid), d2 = c2.FileMessageQueue, h2 = d2.create(this);
          return h2.addJob(new d2.Job({ fileInfo: n2, pendingMessage: s2, requestId: a2, error: n2.error, response: null })), s2;
        } }, { key: "sendFileMessages", value: function(e3) {
          var t2 = this, n2 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, r2 = n2.progress ? n2.progress : function() {
          }, i2 = n2.sent ? n2.sent : function() {
          }, s2 = n2.complete ? n2.complete : function() {
          };
          if (Array.isArray(e3) && e3.length > 0 && e3.length <= 20) {
            var a2 = [];
            return e3.forEach((function(n3, o2) {
              a2.push(t2.sendFileMessage(n3, r2, (function(t3, n4) {
                i2(t3, n4), o2 === e3.length - 1 && s2(null);
              })));
            })), a2;
          }
          return s2(me.error), null;
        } }, { key: "resendFileMessage", value: function(e3, t2, n2) {
          var r2 = this, i2 = x.get(this._iid), s2 = i2.FileMessage, a2 = i2.FileMessageParams, o2 = null, l2 = me.parse(arguments, [new me({ type: s2, constraint: function(e4) {
            return 0 === e4.messageId && e4.isResendable() && e4.reqId && e4.channelUrl === r2.url && Array.isArray(e4.thumbnails);
          } }), new me({ type: "file", optionalIf: function(e4) {
            var t3, n3, r3 = !!e4[0].plainUrl, i3 = se.isFile(null === (t3 = e4[0]) || void 0 === t3 || null === (n3 = t3.messageParams) || void 0 === n3 ? void 0 : n3.file);
            return r3 || i3;
          }, defaultValue: null }), new me({ type: "callback" })]), u2 = C(l2, 4);
          return o2 = u2[0], e3 = u2[1], t2 = u2[2], n2 = u2[3], oe(this._iid, (function(n3) {
            if (o2) o2.message += " Please check if the failed message is resend-able with `message.isResendable().`", n3(o2, null);
            else {
              var i3, s3 = new a2();
              s3._reqId = e3.reqId, e3.plainUrl ? s3.fileUrl = e3.plainUrl : t2 ? s3.file = t2 : se.isFile(null === (i3 = e3.messageParams) || void 0 === i3 ? void 0 : i3.file) && (s3.file = e3.messageParams.file), s3.fileName = e3.name, s3.fileSize = e3.size, s3.mimeType = e3.type, s3.data = e3.data, s3.customType = e3.customType, s3.mentionType = e3.mentionType, s3.mentionedUserIds = e3.requestedMentionUserIds, s3.metaArrays = e3.metaArrays, s3.thumbnailSizes = e3.thumbnails.map((function(e4) {
                return { maxWidth: e4.width, maxHeight: e4.height };
              })), s3.appleCriticalAlertOptions = e3.appleCriticalAlertOptions, r2.sendFileMessage(s3, n3);
            }
          }), n2);
        } }, { key: "updateFileMessage", value: function(e3, t2, n2, r2) {
          var i2 = this, s2 = x.get(this._iid), a2 = s2.Command, o2 = s2.FileMessage, u2 = s2.FileMessageParams, c2 = arguments, d2 = null, h2 = null;
          if ("number" == typeof e3) switch (c2.length) {
            case 3:
              var p2 = me.parse(c2, [new me({ type: "number" }), new me({ type: u2 }), new me({ type: "callback" })]), f2 = C(p2, 4);
              d2 = f2[0], e3 = f2[1], h2 = f2[2], r2 = f2[3], h2 && (h2._isUpdate = true);
              break;
            case 4:
              h2 = new u2();
              var _2 = me.parse(c2, [new me({ type: "number" }), new me({ type: "string", nullable: true }), new me({ type: "string", nullable: true }), new me({ type: "callback" })]), g2 = C(_2, 5);
              d2 = g2[0], e3 = g2[1], t2 = g2[2], n2 = g2[3], r2 = g2[4], h2.data = t2, h2.customType = n2, h2._isUpdate = true;
          }
          return oe(this._iid, (function(t3) {
            if (!d2 && h2 && h2._validate()) {
              var n3 = a2.bUpdateFileMessage(l(l({ channelUrl: i2.url, messageId: e3 }, h2), {}, { mentionType: h2._mentionType, mentionedUserIds: h2._mentionedUserIds })), r3 = wi.getInstance(i2._iid);
              r3.sendCommand(n3, (function(e4, n4) {
                if (r3.getErrorFirstCallback()) {
                  var s3 = [e4, n4];
                  n4 = s3[0], e4 = s3[1];
                }
                var a3 = null;
                if (!n4 && (a3 = new o2(l(l({}, e4.getJsonElement()), {}, { messageParams: h2 })), i2.isGroupChannel())) {
                  var u3 = false;
                  i2.lastMessage ? (i2.lastMessage.createdAt < a3.createdAt || i2.lastMessage.createdAt === a3.createdAt && i2.lastMessage.messageId === a3.messageId && i2.lastMessage.updatedAt < a3.updatedAt) && (i2.lastMessage = a3, u3 = true) : (i2.lastMessage = a3, u3 = true);
                  var c3 = ge.of(i2._iid);
                  if (!a3.silent && u3) Object.keys(r3.channelHandlers).forEach((function(e5) {
                    r3.channelHandlers[e5].onChannelChanged(i2);
                  })), $e.of(i2._iid).upsert([i2]).then((function() {
                    c3.send({ source: de.EVENT_CHANNEL_CHANGED, payload: { channel: i2 } });
                  })).catch((function(e5) {
                    return J.error(e5);
                  }));
                  ot.of(i2._iid).upsert([a3], Je.SUCCEEDED).then((function() {
                    c3.send({ source: de.EVENT_MESSAGE_UPDATED, payload: { channel: i2, message: a3 } });
                  })).catch((function(e5) {
                    return J.error(e5);
                  }));
                }
                t3(n4, a3);
              }));
            } else t3(me.error, null);
          }), r2);
        } }, { key: "cancelUploadingFileMessage", value: function(e3, t2) {
          var n2 = null, r2 = me.parse(arguments, [new me({ type: ["number", "string"] }), new me({ type: "callback" })]), i2 = C(r2, 3);
          n2 = i2[0], e3 = i2[1], t2 = i2[2];
          var s2 = O.get(this._iid), a2 = s2.container.isErrorFirstInCallback;
          if (n2) return a2 ? t2(n2, null) : t2(null, n2), false;
          var o2 = x.get(this._iid), l2 = o2.FileMessageQueue, u2 = l2.create(this);
          return u2.cancelUploadItemByRequestId(e3, (function(e4, n3) {
            return a2 ? t2(e4, n3) : t2(n3, e4);
          }));
        } }, { key: "addReaction", value: function(e3, t2, n2) {
          var r2 = this, i2 = wi.getInstance(this._iid), s2 = x.get(this._iid), a2 = s2.ReactionEvent, o2 = null, u2 = me.parse(arguments, [new me({ type: pt }), new me({ type: "string", constraint: function(e4) {
            return e4.length > 0;
          } }), new me({ type: "callback" })]), c2 = C(u2, 4);
          return o2 = c2[0], e3 = c2[1], t2 = c2[2], n2 = c2[3], oe(this._iid, (function(n3) {
            o2 ? n3(o2, null) : e3.sendingStatus === i2.MessageSendingStatus.SUCCEEDED ? O.get(r2._iid).container.apiClient.addReaction({ isGroupChannel: e3.isGroupChannel(), channelUrl: e3.channelUrl, messageId: e3.messageId, key: t2 }, (function(t3, r3) {
              var i3 = null;
              t3 || (i3 = a2.createFromJson(l(l({}, r3), {}, { msg_id: e3.messageId }))), n3(t3, i3);
            })) : n3(new H("Cannot add reaction to a non-succeeded message.", H.REQUEST_FAILED), null);
          }), n2);
        } }, { key: "deleteReaction", value: function(e3, t2, n2) {
          var r2 = this, i2 = wi.getInstance(this._iid), s2 = x.get(this._iid), a2 = s2.ReactionEvent, o2 = null, u2 = me.parse(arguments, [new me({ type: pt }), new me({ type: "string", constraint: function(e4) {
            return e4.length > 0;
          } }), new me({ type: "callback" })]), c2 = C(u2, 4);
          return o2 = c2[0], e3 = c2[1], t2 = c2[2], n2 = c2[3], oe(this._iid, (function(n3) {
            o2 ? n3(o2, null) : e3.sendingStatus === i2.MessageSendingStatus.SUCCEEDED ? O.get(r2._iid).container.apiClient.deleteReaction({ isGroupChannel: e3.isGroupChannel(), channelUrl: e3.channelUrl, messageId: e3.messageId, key: t2 }, (function(t3, r3) {
              var i3 = null;
              t3 || (i3 = a2.createFromJson(l(l({}, r3), {}, { msg_id: e3.messageId }))), n3(t3, i3);
            })) : n3(new H("Cannot remove reaction to a non-succeeded message.", H.REQUEST_FAILED), null);
          }), n2);
        } }, { key: "deleteMessage", value: function(e3, t2) {
          var n2 = this, r2 = null, i2 = me.parse(arguments, [new me({ type: "object", constraint: function(e4) {
            return !Array.isArray(e4) && null !== e4 && e4.hasOwnProperty("messageId");
          } }), new me({ type: "callback" })]), s2 = C(i2, 3);
          return r2 = s2[0], e3 = s2[1], t2 = s2[2], oe(this._iid, (function(t3) {
            r2 ? t3(r2, null) : O.get(n2._iid).container.apiClient.deleteMessage({ channelUrl: n2.url, isOpenChannel: n2.isOpenChannel(), messageId: e3.messageId }, (function(r3, i3) {
              if (!r3 && n2.isGroupChannel()) {
                var s3 = ot.of(n2._iid), a2 = ge.of(n2._iid);
                s3.remove([e3.messageId], Je.SUCCEEDED).then((function() {
                  a2.send({ source: de.EVENT_MESSAGE_DELETED, payload: { channel: n2, message: e3 } });
                })).catch((function(e4) {
                  return J.error(e4);
                }));
              }
              t3(r3, null);
            }));
          }), t2);
        } }, { key: "copyUserMessage", value: function(t2, n2, r2) {
          var i2 = x.get(this._iid);
          i2.Command;
          var s2 = i2.UserMessage, a2 = i2.BaseMessageParams, o2 = null, u2 = me.parse(arguments, [new me({ type: e2 }), new me({ type: s2 }), new me({ type: "callback" })]), c2 = C(u2, 4);
          o2 = c2[0], t2 = c2[1], n2 = c2[2], r2 = c2[3];
          var d2 = O.get(this._iid), h2 = d2.container.isErrorFirstInCallback;
          if (o2) return h2 ? r2(me.error, null) : r2(null, me.error), null;
          if (this.url !== n2.channelUrl) {
            var p2 = new H("The message does not belong to this channel", H.INVALID_PARAMETER);
            return h2 ? r2(p2, null) : r2(null, p2), null;
          }
          var f2 = Object.keys(n2.translations);
          f2.forEach((function(e3) {
            return "";
          }));
          var _2 = a2.PushNotificationDeliveryOption.DEFAULT;
          return t2._sendUserMessage(l(l({}, n2), {}, { reqId: null, pushNotificationDeliveryOption: _2, translationTargetLanguages: f2, rootMessageId: null, parentMessageId: null, parentMessageText: null, messageParams: n2._messageParams, callback: r2 }));
        } }, { key: "copyFileMessage", value: function(t2, n2, r2) {
          var i2 = this, s2 = x.get(this._iid), a2 = s2.Command;
          s2.GroupChannel;
          var o2 = s2.FileMessage, l2 = s2.BaseMessageParams;
          s2.FileMessageParams;
          var u2 = s2.User, c2 = null, d2 = me.parse(arguments, [new me({ type: e2 }), new me({ type: o2 }), new me({ type: "callback" })]), h2 = C(d2, 4);
          c2 = h2[0], t2 = h2[1], n2 = h2[2], r2 = h2[3];
          var p2 = O.get(this._iid), f2 = p2.container.isErrorFirstInCallback;
          if (c2) return f2 ? r2(me.error, null) : r2(null, me.error), null;
          if (this.url !== n2.channelUrl) {
            var _2 = new H("The message does not belong to this channel");
            return f2 ? r2(_2, null) : r2(null, _2), null;
          }
          var g2 = wi.getInstance(this._iid), y2 = n2, m2 = y2.url, E2 = y2.name, v2 = y2.type, b2 = y2.size, A2 = y2.data, N2 = y2.customType, S2 = y2.mentionType, I2 = y2.mentionedUserIds, T2 = y2.mentionedUsers, U2 = y2.metaArrays, M2 = y2.thumbnails, k2 = y2.requireAuth, R2 = y2.messageSurvivalSeconds, L2 = y2.silent, w2 = y2.appleCriticalAlertOptions, P2 = a2.generateRequestId(), D2 = g2.currentUser || {}, F2 = t2.url, G2 = t2.isOpenChannel(), j2 = T2.filter((function(e3) {
            return new u2(u2.objectify(e3));
          })), B2 = l2.PushNotificationDeliveryOption.DEFAULT, V2 = o2.objectify({ messageId: 0, reqId: P2, user: D2, channel: t2, plainUrl: m2, name: E2, type: v2, size: b2, data: A2, customType: N2, mentionType: S2, mentionedUserIds: I2, mentionedUsers: j2, requestedMentionUserIds: I2, metaArrays: U2, thumbnails: M2, requireAuth: k2, messageSurvivalSeconds: R2, silent: L2, createdAt: (/* @__PURE__ */ new Date()).getTime(), appleCriticalAlertOptions: w2 }), q2 = new o2(V2);
          if (q2.requestState = g2.MessageRequestState.PENDING, q2.sendingStatus = g2.MessageSendingStatus.PENDING, !g2.currentUser) {
            var K2 = new H("Connection should be made first.", H.CONNECTION_REQUIRED), z2 = new o2(V2);
            return z2.requestState = g2.MessageRequestState.FAILED, z2.sendingStatus = g2.MessageSendingStatus.FAILED, z2.errorCode = K2.code, f2 ? r2(K2, z2) : r2(z2, K2), q2;
          }
          var Y2 = a2.bFile({ requestId: P2, channelUrl: F2, url: m2, name: E2, type: v2, size: b2, data: A2, customType: N2, metaArrays: U2, mentionType: S2, mentionedUserIds: I2, thumbnailSizes: M2, requireAuth: k2, pushNotificationDeliveryOption: B2, silent: L2, appleCriticalAlertOptions: w2 });
          return g2.getConnectionState() === g2.ConnectionState.OPEN || g2.connecting || g2.reconnecting ? g2.sendCommand(Y2, (function(e3, n3) {
            if (g2.getErrorFirstCallback()) {
              var s3 = [e3, n3];
              n3 = s3[0], e3 = s3[1];
            }
            if (n3) if (n3.code !== H.INVALID_PARAMETER) {
              var a3 = new o2(V2);
              a3.requestState = g2.MessageRequestState.FAILED, a3.sendingStatus = g2.MessageSendingStatus.FAILED, n3.code !== H.FILE_UPLOAD_CANCEL_FAILED && n3.code !== H.REQUEST_CANCELED || (a3.sendingStatus = g2.MessageSendingStatus.CANCELED), a3.errorCode = n3.code, f2 ? r2(n3, a3) : r2(a3, n3);
            } else f2 ? r2(n3, null) : r2(null, n3);
            else {
              var l3 = new o2(e3.getJsonElement()), u3 = l3._sender;
              if (D2 && u3 && D2.userId === u3.userId && (D2.nickname !== u3.nickname && (D2.nickname = u3.nickname), D2.plainProfileUrl !== u3.plainProfileUrl && (D2.plainProfileUrl = u3.plainProfileUrl)), t2.isGroupChannel()) {
                t2.lastMessage = l3, Object.keys(g2.channelHandlers).forEach((function(e4) {
                  g2.channelHandlers[e4].onChannelChanged(t2);
                }));
                var c3 = ge.of(i2._iid);
                $e.of(i2._iid).upsert([t2]).then((function() {
                  c3.send({ source: de.EVENT_CHANNEL_CHANGED, payload: { channel: t2 } });
                })).catch((function(e4) {
                  return J.error(e4);
                })), ot.of(i2._iid).upsert([l3]).then((function() {
                  c3.send({ source: de.EVENT_MESSAGE_SENT, payload: { channel: i2, message: l3 } });
                })).catch((function(e4) {
                  return J.error(e4);
                }));
              }
              f2 ? r2(null, l3) : r2(l3, null);
            }
          })) : p2.container.apiClient.sendFileMessage({ channelUrl: F2, isOpenChannel: G2, fileUrl: m2, fileName: E2, fileType: v2, fileSize: b2, data: A2, customType: N2, metaArrays: U2, mentionType: S2, mentionedUserIds: I2, thumbnailSizes: M2, requireAuth: k2, pushNotificationDeliveryOption: B2, appleCriticalAlertOptions: w2 }, (function(e3, n3) {
            if (e3) if (e3.code !== H.INVALID_PARAMETER) {
              var i3 = new o2(commnad.getJsonElement());
              i3.requestState = g2.MessageRequestState.FAILED, i3.sendingStatus = g2.MessageSendingStatus.FAILED, e3.code !== H.FILE_UPLOAD_CANCEL_FAILED && e3.code !== H.REQUEST_CANCELED || (i3.sendingStatus = g2.MessageSendingStatus.CANCELED), i3.errorCode = e3.code, f2 ? r2(e3, i3) : r2(i3, e3);
            } else f2 ? r2(e3, null) : r2(null, e3);
            else {
              var s3 = new o2(n3), a3 = s3._sender;
              D2 && a3 && D2.userId === a3.userId && (D2.nickname !== a3.nickname && (D2.nickname = a3.nickname), D2.plainProfileUrl !== a3.plainProfileUrl && (D2.plainProfileUrl = a3.plainProfileUrl)), t2.isGroupChannel() && (t2.lastMessage = s3, Object.keys(g2.channelHandlers).forEach((function(e4) {
                g2.channelHandlers[e4].onChannelChanged(t2);
              }))), f2 ? r2(null, s3) : r2(s3, null);
            }
          })), q2;
        } }, { key: "addOperators", value: function(e3, t2) {
          var n2 = this, r2 = null, i2 = me.parse(arguments, [new me({ type: "array", constraint: function(e4) {
            return Object.keys(e4).map((function(t3) {
              return e4[t3];
            })).every((function(e5) {
              return "string" == typeof e5;
            }));
          } }), new me({ type: "callback" })]), s2 = C(i2, 3);
          return r2 = s2[0], e3 = s2[1], t2 = s2[2], oe(this._iid, (function(t3) {
            r2 ? t3(r2, null) : O.get(n2._iid).container.apiClient.addOperators({ channelUrl: n2.url, isOpenChannel: n2.isOpenChannel(), operatorUserIds: e3 }, (function(e4, n3) {
              return t3(e4, n3);
            }));
          }), t2);
        } }, { key: "removeOperators", value: function(e3, t2) {
          var n2 = this, r2 = null, i2 = me.parse(arguments, [new me({ type: "array", constraint: function(e4) {
            return Object.keys(e4).map((function(t3) {
              return e4[t3];
            })).every((function(e5) {
              return "string" == typeof e5;
            }));
          } }), new me({ type: "callback" })]), s2 = C(i2, 3);
          return r2 = s2[0], e3 = s2[1], t2 = s2[2], oe(this._iid, (function(t3) {
            r2 ? t3(r2, null) : O.get(n2._iid).container.apiClient.removeOperators({ channelUrl: n2.url, isOpenChannel: n2.isOpenChannel(), operatorUserIds: e3 }, (function(e4, n3) {
              return t3(e4, n3);
            }));
          }), t2);
        } }, { key: "getMetaCounters", value: function(e3, t2) {
          var n2 = this, r2 = null, i2 = me.parse(arguments, [new me({ type: "array", constraint: function(e4) {
            return Object.keys(e4).map((function(t3) {
              return e4[t3];
            })).every((function(e5) {
              return "string" == typeof e5;
            }));
          } }), new me({ type: "callback" })]), s2 = C(i2, 3);
          return r2 = s2[0], e3 = s2[1], t2 = s2[2], oe(this._iid, (function(t3) {
            r2 ? t3(r2, null) : O.get(n2._iid).container.apiClient.getMetaCounters({ channelUrl: n2.url, isOpenChannel: n2.isOpenChannel(), keys: e3 }, (function(e4, n3) {
              return t3(e4, n3);
            }));
          }), t2);
        } }, { key: "getAllMetaCounters", value: function(e3) {
          var t2 = this;
          return oe(this._iid, (function(e4) {
            O.get(t2._iid).container.apiClient.getMetaCounters({ channelUrl: t2.url, isOpenChannel: t2.isOpenChannel(), keys: [] }, (function(t3, n2) {
              return e4(t3, n2);
            }));
          }), e3);
        } }, { key: "createMetaCounters", value: function(e3, t2) {
          var n2 = this, r2 = null, i2 = me.parse(arguments, [new me({ type: "object", constraint: function(e4) {
            return e4 && !Array.isArray(e4) && Object.keys(e4).length > 0 && Object.keys(e4).map((function(t3) {
              return e4[t3];
            })).every((function(e5) {
              return "number" == typeof e5;
            }));
          } }), new me({ type: "callback" })]), s2 = C(i2, 3);
          return r2 = s2[0], e3 = s2[1], t2 = s2[2], oe(this._iid, (function(t3) {
            r2 ? t3(r2, null) : O.get(n2._iid).container.apiClient.createMetaCounters({ channelUrl: n2.url, isOpenChannel: n2.isOpenChannel(), metaCounter: e3 }, (function(e4, n3) {
              return t3(e4, n3);
            }));
          }), t2);
        } }, { key: "updateMetaCounters", value: function(e3, t2, n2) {
          var r2 = this, i2 = null, s2 = me.parse(arguments, [new me({ type: "object", constraint: function(e4) {
            return e4 && !Array.isArray(e4) && Object.keys(e4).length > 0 && Object.keys(e4).map((function(t3) {
              return e4[t3];
            })).every((function(e5) {
              return "number" == typeof e5;
            }));
          } }), new me({ type: "boolean", optional: true, defaultValue: false }), new me({ type: "callback" })]), a2 = C(s2, 4);
          return i2 = a2[0], e3 = a2[1], t2 = a2[2], n2 = a2[3], oe(this._iid, (function(n3) {
            i2 ? n3(i2, null) : O.get(r2._iid).container.apiClient.updateMetaCounters({ channelUrl: r2.url, isOpenChannel: r2.isOpenChannel(), metaCounter: e3, upsert: t2, mode: "set" }, (function(e4, t3) {
              return n3(e4, t3);
            }));
          }), n2);
        } }, { key: "increaseMetaCounters", value: function(e3, t2) {
          var n2 = this, r2 = null, i2 = me.parse(arguments, [new me({ type: "object", constraint: function(e4) {
            return e4 && !Array.isArray(e4) && Object.keys(e4).length > 0 && Object.keys(e4).map((function(t3) {
              return e4[t3];
            })).every((function(e5) {
              return "number" == typeof e5;
            }));
          } }), new me({ type: "callback" })]), s2 = C(i2, 3);
          return r2 = s2[0], e3 = s2[1], t2 = s2[2], oe(this._iid, (function(t3) {
            r2 ? t3(r2, null) : O.get(n2._iid).container.apiClient.updateMetaCounters({ channelUrl: n2.url, isOpenChannel: n2.isOpenChannel(), metaCounter: e3, upsert: false, mode: "increase" }, (function(e4, n3) {
              return t3(e4, n3);
            }));
          }), t2);
        } }, { key: "decreaseMetaCounters", value: function(e3, t2) {
          var n2 = this, r2 = null, i2 = me.parse(arguments, [new me({ type: "object", constraint: function(e4) {
            return e4 && !Array.isArray(e4) && Object.keys(e4).length > 0 && Object.keys(e4).map((function(t3) {
              return e4[t3];
            })).every((function(e5) {
              return "number" == typeof e5;
            }));
          } }), new me({ type: "callback" })]), s2 = C(i2, 3);
          return r2 = s2[0], e3 = s2[1], t2 = s2[2], oe(this._iid, (function(t3) {
            r2 ? t3(r2, null) : O.get(n2._iid).container.apiClient.updateMetaCounters({ channelUrl: n2.url, isOpenChannel: n2.isOpenChannel(), metaCounter: e3, upsert: false, mode: "decrease" }, (function(e4, n3) {
              var r3 = null;
              e4 || (r3 = {}, Object.keys(n3).forEach((function(e5) {
                r3[e5] = n3[e5];
              }))), t3(e4, r3);
            }));
          }), t2);
        } }, { key: "deleteMetaCounter", value: function(e3, t2) {
          var n2 = this, r2 = null, i2 = me.parse(arguments, [new me({ type: "string" }), new me({ type: "callback" })]), s2 = C(i2, 3);
          return r2 = s2[0], e3 = s2[1], t2 = s2[2], oe(this._iid, (function(t3) {
            r2 ? t3(r2, null) : O.get(n2._iid).container.apiClient.deleteMetaCounter({ channelUrl: n2.url, isOpenChannel: n2.isOpenChannel(), key: e3 }, (function(e4, n3) {
              return t3(e4, n3);
            }));
          }), t2);
        } }, { key: "deleteAllMetaCounters", value: function(e3) {
          var t2 = this;
          return oe(this._iid, (function(e4) {
            O.get(t2._iid).container.apiClient.deleteAllMetaCounters({ channelUrl: t2.url, isOpenChannel: t2.isOpenChannel() }, (function(t3, n2) {
              return e4(t3, n2);
            }));
          }), e3);
        } }, { key: "getCachedMetaData", value: function() {
          var e3 = Mt.get(this), t2 = {};
          return Object.keys(e3).forEach((function(n2) {
            var r2 = e3[n2];
            r2.isRemoved || (t2[n2] = r2.value);
          })), t2;
        } }, { key: "getMetaData", value: function(e3, t2) {
          var n2 = this, r2 = null, i2 = me.parse(arguments, [new me({ type: "array", constraint: function(e4) {
            return Object.keys(e4).map((function(t3) {
              return e4[t3];
            })).every((function(e5) {
              return "string" == typeof e5;
            }));
          } }), new me({ type: "callback" })]), s2 = C(i2, 3);
          return r2 = s2[0], e3 = s2[1], t2 = s2[2], oe(this._iid, (function(t3) {
            r2 ? t3(r2, null) : O.get(n2._iid).container.apiClient.getMetaData({ channelUrl: n2.url, isOpenChannel: n2.isOpenChannel(), keys: e3 }, (function(e4, r3) {
              if (r3 && r3.ts) {
                var i3 = r3.metadata;
                n2._addOrUpdateCachedMetaData(i3, r3.ts), t3(e4, i3);
              } else t3(e4, r3);
            }));
          }), t2);
        } }, { key: "getAllMetaData", value: function(e3) {
          var t2 = this;
          return oe(this._iid, (function(e4) {
            O.get(t2._iid).container.apiClient.getMetaData({ channelUrl: t2.url, isOpenChannel: t2.isOpenChannel(), keys: [] }, (function(n2, r2) {
              if (r2 && r2.ts) {
                var i2 = r2.metadata;
                t2._refreshMetaData(i2, r2.ts), e4(n2, i2);
              } else e4(n2, r2);
            }));
          }), e3);
        } }, { key: "createMetaData", value: function(e3, t2) {
          var n2 = this, r2 = null, i2 = me.parse(arguments, [new me({ type: "object", constraint: function(e4) {
            return e4 && !Array.isArray(e4) && Object.keys(e4).length > 0;
          } }), new me({ type: "callback" })]), s2 = C(i2, 3);
          return r2 = s2[0], e3 = s2[1], t2 = s2[2], oe(this._iid, (function(t3) {
            r2 ? t3(r2, null) : O.get(n2._iid).container.apiClient.createMetaData({ channelUrl: n2.url, isOpenChannel: n2.isOpenChannel(), metaData: e3 }, (function(e4, n3) {
              t3(e4, n3 && n3.ts ? n3.metadata : n3);
            }));
          }), t2);
        } }, { key: "updateMetaData", value: function(e3, t2, n2) {
          var r2 = this, i2 = null, s2 = me.parse(arguments, [new me({ type: "object", constraint: function(e4) {
            return e4 && !Array.isArray(e4) && Object.keys(e4).length > 0;
          } }), new me({ type: "boolean", optional: true, defaultValue: false }), new me({ type: "callback" })]), a2 = C(s2, 4);
          return i2 = a2[0], e3 = a2[1], t2 = a2[2], n2 = a2[3], oe(this._iid, (function(n3) {
            i2 ? n3(i2, null) : O.get(r2._iid).container.apiClient.updateMetaData({ channelUrl: r2.url, isOpenChannel: r2.isOpenChannel(), metaData: e3, upsert: t2 }, (function(e4, t3) {
              n3(e4, t3 && t3.ts ? t3.metadata : t3);
            }));
          }), n2);
        } }, { key: "deleteMetaData", value: function(e3, t2) {
          var n2 = this, r2 = null, i2 = me.parse(arguments, [new me({ type: "string" }), new me({ type: "callback" })]), s2 = C(i2, 3);
          return r2 = s2[0], e3 = s2[1], t2 = s2[2], oe(this._iid, (function(t3) {
            r2 ? t3(r2, null) : O.get(n2._iid).container.apiClient.deleteMetaData({ channelUrl: n2.url, isOpenChannel: n2.isOpenChannel(), key: e3 }, (function(e4, n3) {
              t3(e4, n3 && n3.ts ? {} : n3);
            }));
          }), t2);
        } }, { key: "deleteAllMetaData", value: function(e3) {
          var t2 = this;
          return oe(this._iid, (function(e4) {
            O.get(t2._iid).container.apiClient.deleteAllMetaData({ channelUrl: t2.url, isOpenChannel: t2.isOpenChannel() }, (function(t3, n2) {
              return e4(t3, n2 && n2.ts ? {} : n2);
            }));
          }), e3);
        } }, { key: "_updateMessageMetaArray", value: function(e3, t2, n2, r2) {
          var i2 = this;
          return oe(this._iid, (function(r3) {
            var s2 = x.get(i2._iid), a2 = s2.Command, o2 = s2.UserMessage, l2 = s2.FileMessage, u2 = s2.AdminMessage, c2 = null;
            if (t2.isUserMessage() ? c2 = a2.bUpdateUserMessage({ channelUrl: e3, messageId: t2.messageId, metaArrayParams: n2 }) : t2.isFileMessage() && (c2 = a2.bUpdateFileMessage({ channelUrl: e3, messageId: t2.messageId, metaArrayParams: n2 })), c2) {
              var d2 = wi.getInstance(i2._iid);
              d2.sendCommand(c2, (function(e4, n3) {
                if (d2.getErrorFirstCallback()) {
                  var i3 = [e4, n3];
                  n3 = i3[0], e4 = i3[1];
                }
                var s3 = null;
                n3 || (t2.isUserMessage() ? s3 = new o2(e4.getJsonElement()) : t2.isFileMessage() ? s3 = new l2(e4.getJsonElement()) : t2.isAdminMessage() && (s3 = new u2(e4.getJsonElement()))), r3(n3, s3);
              }));
            } else r3(me.error, null);
          }), r2);
        } }, { key: "createMessageMetaArrayKeys", value: function(e3, t2, n2) {
          var r2 = x.get(this._iid), i2 = r2.MessageMetaArray, s2 = null, a2 = me.parse(arguments, [new me({ type: pt }), new me({ type: "array", constraint: function(e4) {
            return e4.every((function(e5) {
              return "string" == typeof e5 && "" !== e5;
            }));
          } }), new me({ type: "callback" })]), o2 = C(a2, 4);
          if (s2 = o2[0], e3 = o2[1], t2 = o2[2], n2 = o2[3], s2) return oe(this._iid, (function(e4) {
            e4(s2, null);
          }), n2);
          var l2 = [];
          if (Array.isArray(t2)) for (var u2 = 0; u2 < t2.length; u2++) {
            var c2 = t2[u2];
            l2.push(new i2(c2, []));
          }
          return this._updateMessageMetaArray(this.url, e3, { array: l2.map((function(e4) {
            return e4.encode();
          })), mode: "add", upsert: true }, n2);
        } }, { key: "deleteMessageMetaArrayKeys", value: function(e3, t2, n2) {
          var r2 = x.get(this._iid), i2 = r2.MessageMetaArray, s2 = null, a2 = me.parse(arguments, [new me({ type: pt }), new me({ type: "array", constraint: function(e4) {
            return e4.every((function(e5) {
              return "string" == typeof e5 && "" !== e5;
            }));
          } }), new me({ type: "callback" })]), o2 = C(a2, 4);
          if (s2 = o2[0], e3 = o2[1], t2 = o2[2], n2 = o2[3], s2) return oe(this._iid, (function(e4) {
            e4(s2, null);
          }), n2);
          var l2 = [];
          if (Array.isArray(t2)) for (var u2 = 0; u2 < t2.length; u2++) {
            var c2 = t2[u2];
            l2.push(new i2(c2, []));
          }
          return this._updateMessageMetaArray(this.url, e3, { array: l2.map((function(e4) {
            return e4.encode();
          })), mode: "remove", upsert: true }, n2);
        } }, { key: "addMessageMetaArrayValues", value: function(e3, t2, n2) {
          var r2 = x.get(this._iid), i2 = r2.MessageMetaArray, s2 = null, a2 = me.parse(arguments, [new me({ type: pt }), new me({ type: "object", constraint: function(e4) {
            return e4 && (Array.isArray(e4) && e4.length > 0 && e4.every((function(e5) {
              return e5 instanceof i2;
            })) || Object.keys(e4).length > 0 && Object.keys(e4).every((function(t3) {
              return Array.isArray(e4[t3]) && e4[t3].length > 0 && e4[t3].every((function(e5) {
                return "string" == typeof e5 && e5.length > 0;
              }));
            })));
          } }), new me({ type: "callback" })]), o2 = C(a2, 4);
          if (s2 = o2[0], e3 = o2[1], t2 = o2[2], n2 = o2[3], s2) return oe(this._iid, (function(e4) {
            e4(s2, null);
          }), n2);
          var l2 = Array.isArray(t2) ? t2.map((function(e4) {
            return e4.encode();
          })) : Object.keys(t2).map((function(e4) {
            return { key: e4, value: t2[e4] };
          }));
          return this._updateMessageMetaArray(this.url, e3, { array: l2, mode: "add", upsert: true }, n2);
        } }, { key: "removeMessageMetaArrayValues", value: function(e3, t2, n2) {
          var r2 = x.get(this._iid), i2 = r2.MessageMetaArray, s2 = null, a2 = me.parse(arguments, [new me({ type: pt }), new me({ type: "object", constraint: function(e4) {
            return e4 && (Array.isArray(e4) && e4.length > 0 && e4.every((function(e5) {
              return e5 instanceof i2;
            })) || Object.keys(e4).length > 0 && Object.keys(e4).every((function(t3) {
              return Array.isArray(e4[t3]) && e4[t3].length > 0 && e4[t3].every((function(e5) {
                return "string" == typeof e5 && e5.length > 0;
              }));
            })));
          } }), new me({ type: "callback" })]), o2 = C(a2, 4);
          if (s2 = o2[0], e3 = o2[1], t2 = o2[2], n2 = o2[3], s2) return oe(this._iid, (function(e4) {
            e4(s2, null);
          }), n2);
          var l2 = Array.isArray(t2) ? t2.map((function(e4) {
            return e4.encode();
          })) : Object.keys(t2).map((function(e4) {
            return { key: e4, value: t2[e4] };
          }));
          return this._updateMessageMetaArray(this.url, e3, { array: l2, mode: "remove", upsert: true }, n2);
        } }, { key: "report", value: function(e3, t2, n2) {
          var r2 = this, i2 = x.get(this._iid), s2 = i2.BaseChannel, a2 = null, o2 = me.parse(arguments, [new me({ type: s2.ReportCategory }), new me({ type: "string" }), new me({ type: "callback" })]), l2 = C(o2, 4);
          return a2 = l2[0], e3 = l2[1], t2 = l2[2], n2 = l2[3], oe(this._iid, (function(n3) {
            if (a2) n3(a2, null);
            else {
              var i3 = wi.getInstance(r2._iid);
              O.get(r2._iid).container.apiClient.report({ channelUrl: r2.url, isOpenChannel: r2.isOpenChannel(), reportCategory: e3, reportingUserId: i3.currentUser ? i3.currentUser.userId : null, reportDescription: t2 }, (function(e4, t3) {
                n3(e4, null);
              }));
            }
          }), n2);
        } }, { key: "reportUser", value: function(e3, t2, n2, r2) {
          var i2 = this, s2 = x.get(this._iid), a2 = s2.BaseChannel, o2 = null, l2 = me.parse(arguments, [new me({ type: ft }), new me({ type: a2.ReportCategory }), new me({ type: "string" }), new me({ type: "callback" })]), u2 = C(l2, 5);
          return o2 = u2[0], e3 = u2[1], t2 = u2[2], n2 = u2[3], r2 = u2[4], oe(this._iid, (function(r3) {
            if (o2) r3(o2, null);
            else {
              var s3 = wi.getInstance(i2._iid);
              O.get(i2._iid).container.apiClient.reportUser({ channelUrl: i2.url, isOpenChannel: i2.isOpenChannel(), reportCategory: t2, offendingUserId: e3.userId, reportingUserId: s3.currentUser ? s3.currentUser.userId : null, reportDescription: n2 }, (function(e4, t3) {
                r3(e4, null);
              }));
            }
          }), r2);
        } }, { key: "reportMessage", value: function(e3, t2, n2, r2) {
          var i2 = this, s2 = x.get(this._iid), a2 = s2.BaseChannel, o2 = null, l2 = me.parse(arguments, [new me({ type: pt }), new me({ type: a2.ReportCategory }), new me({ type: "string" }), new me({ type: "callback" })]), u2 = C(l2, 5);
          return o2 = u2[0], e3 = u2[1], t2 = u2[2], n2 = u2[3], r2 = u2[4], oe(this._iid, (function(r3) {
            if (o2) r3(o2, null);
            else {
              var s3 = wi.getInstance(i2._iid);
              O.get(i2._iid).container.apiClient.reportMessage({ messageId: e3.messageId, channelUrl: i2.url, isOpenChannel: i2.isOpenChannel(), reportCategory: t2, offendingUserId: e3.sender.userId, reportingUserId: s3.currentUser ? s3.currentUser.userId : null, reportDescription: n2 }, (function(e4, t3) {
                r3(e4, null);
              }));
            }
          }), r2);
        } }], [{ key: "CHANNEL_TYPE_OPEN", get: function() {
          return "open";
        } }, { key: "CHANNEL_TYPE_GROUP", get: function() {
          return "group";
        } }, { key: "CHANNEL_TYPE_BASE", get: function() {
          return "base";
        } }, { key: "MessageTypeFilter", get: function() {
          return { ALL: "", USER: "MESG", FILE: "FILE", ADMIN: "ADMM" };
        } }, { key: "ReportCategory", get: function() {
          return { SPAM: "spam", HARASSING: "harassing", SUSPICIOUS: "suspicious", INAPPROPRIATE: "inappropriate" };
        } }, { key: "buildMessage", value: function(e3, t2) {
          var n2 = x.get(this._iid), r2 = n2.UserMessage, i2 = n2.FileMessage, s2 = n2.AdminMessage;
          if (e3) switch (e3.hasOwnProperty("channel_type") || (e3.channel_type = t2.channelType), e3.type) {
            case "MESG":
              return new r2(e3);
            case "FILE":
              var a2 = e3.file;
              return new i2(l(l({}, e3), {}, { url: String(a2.url), name: String(a2.name), type: String(a2.type), size: parseInt(a2.size), data: String(a2.data) }));
            case "BRDM":
            case "ADMM":
              return new s2(e3);
          }
          return null;
        } }]), e2;
      })(), Lt = (function() {
        function e2(t2) {
          c(this, e2), t2 && (this.category = t2.hasOwnProperty("cat") ? parseInt(t2.cat) : 0, this.data = t2.hasOwnProperty("data") ? t2.data : null, this.channelUrl = t2.hasOwnProperty("channel_url") ? String(t2.channel_url) : "", this.channelType = t2.hasOwnProperty("channel_type") ? String(t2.channel_type) : Rt.CHANNEL_TYPE_GROUP, this.channel = t2.hasOwnProperty("channel") ? t2.channel : null);
        }
        return h(e2, [{ key: "isGroupChannel", value: function() {
          return this.channelType === Rt.CHANNEL_TYPE_GROUP;
        } }, { key: "isOpenChannel", value: function() {
          return this.channelType === Rt.CHANNEL_TYPE_OPEN;
        } }]), e2;
      })();
      Lt.CATEGORY_NONE = 0, Lt.CATEGORY_CHANNEL_ENTER = 10102, Lt.CATEGORY_CHANNEL_EXIT = 10103, Lt.CATEGORY_USER_CHANNEL_MUTE = 10201, Lt.CATEGORY_USER_CHANNEL_UNMUTE = 10200, Lt.CATEGORY_USER_CHANNEL_BAN = 10601, Lt.CATEGORY_USER_CHANNEL_UNBAN = 10600, Lt.CATEGORY_CHANNEL_FREEZE = 10701, Lt.CATEGORY_CHANNEL_UNFREEZE = 10700, Lt.CATEGORY_TYPING_START = 10900, Lt.CATEGORY_TYPING_END = 10901, Lt.CATEGORY_CHANNEL_JOIN = 1e4, Lt.CATEGORY_CHANNEL_LEAVE = 10001, Lt.CATEGORY_CHANNEL_OPERATOR_UPDATE = 10002, Lt.CATEGORY_CHANNEL_INVITE = 10020, Lt.CATEGORY_CHANNEL_DECLINE_INVITE = 10022, Lt.CATEGORY_CHANNEL_PROP_CHANGED = 11e3, Lt.CATEGORY_CHANNEL_DELETED = 12e3, Lt.CATEGORY_CHANNEL_META_DATA_CHANGED = 11100, Lt.CATEGORY_CHANNEL_META_COUNTERS_CHANGED = 11200, Lt.CATEGORY_CHANNEL_HIDE = 13e3, Lt.CATEGORY_CHANNEL_UNHIDE = 13001;
      var wt = h((function e2(t2) {
        c(this, e2), t2 && (this.category = t2.hasOwnProperty("cat") ? parseInt(t2.cat) : 0);
      }));
      wt.CATEGORY_USER_BLOCK = 20001, wt.CATEGORY_USER_UNBLOCK = 2e4, wt.CATEGORY_FRIEND_DISCOVERED = 20900;
      var Pt = (function() {
        function e2(t2) {
          c(this, e2), this.sb = t2, this.cls = x.get(this.sb._iid);
        }
        return h(e2, [{ key: "onRawCommandReceived", value: function(e3) {
          var t2 = this, n2 = this.cls, r2 = n2.Command, i2 = n2.User, s2 = n2.Member, a2 = n2.RestrictedUser, o2 = n2.BaseChannel, c2 = n2.GroupChannel, d2 = n2.OpenChannel, h2 = n2.UserMessage, p2 = n2.FileMessage, f2 = n2.AdminMessage, _2 = n2.BaseMessageParams, g2 = n2.ReactionEvent, y2 = n2.ReadStatus, m2 = n2.ThreadInfoUpdateEvent, E2 = n2.RestrictionInfo, v2 = O.get(this.sb._iid), b2 = v2.container, C2 = b2.pinger, A2 = b2.auth, N2 = b2.subscribedUnreadMessageCount, S2 = b2.sessionManager, U2 = b2.ackStateMap, M2 = new r2(e3), k2 = M2.getJsonElement();
          if (k2.hasOwnProperty("unread_cnt") && "object" === u(k2.unread_cnt)) {
            var R2 = false, L2 = k2.unread_cnt.ts;
            "number" == typeof L2 && L2 > N2.ts && (N2.all !== k2.unread_cnt.all && (R2 = true), N2.all = k2.unread_cnt.all >= 0 ? k2.unread_cnt.all : 0, k2.unread_cnt.custom_types && Object.keys(k2.unread_cnt.custom_types).forEach((function(e4) {
              N2.custom_types[e4] !== k2.unread_cnt.custom_types[e4] && (R2 = true), N2.custom_types[e4] = k2.unread_cnt.custom_types[e4];
            })), R2 = R2 && N2.ts > 0, N2.ts = L2), R2 && Object.keys(this.sb.userEventHandlers).forEach((function(e4) {
              t2.sb.userEventHandlers[e4].onTotalUnreadMessageCountUpdated(N2.all, N2.custom_types);
            }));
          }
          var w2 = M2.requestId;
          if (w2) {
            var P2 = U2[w2];
            if (P2) {
              clearTimeout(P2.timer);
              var D2 = P2.handler;
              U2.hasOwnProperty(w2) && delete U2[w2], D2 && ("EROR" === M2.command ? D2(new H(k2.message, k2.code), null) : D2(null, M2));
            }
          } else {
            C2 && "LOGI" !== M2.command && C2.refreshTimer();
            var F2, G2 = $e.of(this.sb._iid), x2 = ot.of(this.sb._iid), j2 = ge.of(this.sb._iid);
            switch (M2.command) {
              case "LOGI":
                if (this.sb.loginTimer) if (clearTimeout(this.sb.loginTimer), this.sb.loginTimer = null, this.sb.onLoginTimerCancel = null, k2.hasOwnProperty("error")) this.sb.isSessionOpened = false, this.sb.loginHandler(new H(k2.message, k2.code), null);
                else {
                  if (this.sb.isSessionOpened = true, k2.hasOwnProperty("key") && (A2.sessionKey = k2.key), k2.hasOwnProperty("ekey") && (A2.eKey = k2.ekey), k2.hasOwnProperty("user_id") && (this.sb.currentUser = new i2(k2)), "number" == typeof k2.ping_interval && k2.ping_interval > 0 && v2.set("pingInterval", 1e3 * k2.ping_interval), "number" == typeof k2.pong_timeout && k2.pong_timeout > 0 && v2.set("pongTimeout", 1e3 * k2.pong_timeout), "number" == typeof k2.login_ts) {
                    var B2 = 1e3 * k2.login_ts;
                    v2.set("connectedAt", B2);
                    var V2 = v2.container, q2 = V2.firstConnectedAt, K2 = V2.localCacheEnabled, z2 = V2.store;
                    if (!q2) {
                      var Y2 = B2;
                      if (K2) {
                        var Q2 = (F2 = this.sb.currentUser.userId, "sendbird:".concat(F2, "@firstConnectedAt"));
                        z2.get(Q2).then((function(e4) {
                          e4 && (Y2 = e4.ts);
                        })).catch((function(e4) {
                          t2.handleCacheError(e4);
                        })).finally((function() {
                          v2.set("firstConnectedAt", Y2);
                        }));
                      } else v2.set("firstConnectedAt", Y2);
                    }
                  }
                  if (k2.hasOwnProperty("reconnect") && "object" === u(k2.reconnect)) {
                    var W2 = k2.reconnect, X2 = v2.container.wsAdapter;
                    W2.hasOwnProperty("interval") && "number" == typeof W2.interval && (X2.reconnectParams.interval = W2.interval), W2.hasOwnProperty("max_interval") && "number" == typeof W2.max_interval && (X2.reconnectParams.maxInterval = W2.max_interval), W2.hasOwnProperty("mul") && "number" == typeof W2.mul && (X2.reconnectParams.multiplier = W2.mul), W2.hasOwnProperty("retry_cnt") && "number" == typeof W2.retry_cnt && (X2.reconnectParams.retryCount = W2.retry_cnt);
                  }
                  "number" == typeof k2.max_unread_cnt_on_super_group ? v2.set("maxUnreadCountOfSuperGroupChannel", k2.max_unread_cnt_on_super_group) : v2.set("maxUnreadCountOfSuperGroupChannel", T.DEFAULT_MAX_UNREAD_COUNT_OF_SUPER_GROUP_CHANNEL), k2.profile_image_encryption && v2.set("profileImageEncryption", true), C2 && C2.start(), k2.hasOwnProperty("file_upload_size_limit") && k2.hasOwnProperty("premium_feature_list") && k2.hasOwnProperty("emoji_hash") && v2.set("appInfo", new Ie(k2)), k2.hasOwnProperty("concurrent_call_limit") && k2.hasOwnProperty("back_off_delay") && (v2.set("concurrentCallLimit", k2.concurrent_call_limit), v2.set("backOffDelay", k2.back_off_delay)), this.sb.loginHandler(null, this.sb.currentUser);
                }
                break;
              case "EXPR":
                var Z2 = new H("The session would be expired.", k2.reason || H.SESSION_KEY_EXPIRED);
                S2.refreshSessionIfExpiredError(Z2).then((function() {
                })).catch((function() {
                }));
                break;
              case "MESG":
              case "FILE":
              case "BRDM":
              case "ADMM":
                var $2 = null;
                if ("MESG" === M2.command ? $2 = new h2(k2) : "FILE" === M2.command ? $2 = new p2(k2) : "BRDM" !== M2.command && "ADMM" !== M2.command || ($2 = new f2(k2)), $2) {
                  var ee2 = this.sb.currentUser ? this.sb.currentUser.userId : null, te2 = $2.silent, ne2 = !!k2.force_update_last_message, re2 = $2._sender && $2._sender.userId === ee2;
                  if ($2.isGroupChannel()) {
                    var ie2 = c2.cachedChannels.hasOwnProperty($2.channelUrl);
                    c2.getChannel($2.channelUrl, T.INTERNAL_CALL, (function(e4, n3) {
                      if (t2.sb.getErrorFirstCallback()) {
                        var i3 = [e4, n3];
                        n3 = i3[0], e4 = i3[1];
                      }
                      if (!n3) {
                        if (!v2.container.appInfo.isSupergroupMackDisabled || !e4.isSuper || e4.isBroadcast) {
                          var s3 = r2.bMessageAck({ channelUrl: $2.channelUrl, messageId: $2.messageId });
                          t2.sb.sendCommand(s3);
                        }
                        if (e4.isHidden = false, e4.hiddenState = c2.HiddenState.UNHIDDEN, c2.cachedChannels[e4.url] = e4, $2._sender && e4.memberMap.hasOwnProperty($2._sender.userId)) {
                          var a3 = e4.memberMap[$2._sender.userId];
                          a3.nickname !== $2._sender.nickname && (a3.nickname = $2._sender.nickname), a3.plainProfileUrl !== $2._sender.plainProfileUrl && (a3.plainProfileUrl = $2._sender.plainProfileUrl), se.deepEqual(a3.metaData, $2._sender.metaData) || (a3.metaData = $2._sender.metaData), a3.isBlockedByMe !== $2._sender.isBlockedByMe && (a3.isBlockedByMe = $2._sender.isBlockedByMe);
                        }
                        var o3 = t2.sb.currentUser;
                        o3 && re2 && (o3.nickname !== $2._sender.nickname && (o3.nickname = $2._sender.nickname), o3.plainProfileUrl !== $2._sender.plainProfileUrl && (o3.plainProfileUrl = $2._sender.plainProfileUrl), se.deepEqual(o3.metaData, $2._sender.metaData) || (o3.metaData = $2._sender.metaData));
                        var l2 = false;
                        if ($2.mentionType === _2.MentionType.CHANNEL) re2 || (l2 = true);
                        else if ($2.mentionType === _2.MentionType.USERS) {
                          for (var u2 = 0; u2 < $2.mentionedUsers.length; u2++) if (!re2 && $2.mentionedUsers[u2].userId === ee2) {
                            l2 = true;
                            break;
                          }
                        }
                        te2 && !re2 || (e4.isEphemeral || ie2) && ((!e4.lastMessage || e4.lastMessage.createdAt < $2.createdAt) && (e4.lastMessage = $2), re2 || e4._setGroupChannelUnreadCount(e4.unreadMessageCount + 1, e4.unreadMentionCount + (l2 ? 1 : 0))), ne2 && (!e4.lastMessage || e4.lastMessage.createdAt < $2.createdAt) && (e4.lastMessage = $2), te2 && !re2 || (G2.upsert([e4]).then((function() {
                          j2.send({ source: de.EVENT_CHANNEL_CHANGED, payload: { channel: e4 } });
                        })).catch((function(e5) {
                          t2.handleCacheError(e5);
                        })), Object.keys(t2.sb.channelHandlers).forEach((function(n4) {
                          t2.sb.channelHandlers[n4].onChannelChanged(e4);
                        }))), Object.keys(t2.sb.channelHandlers).forEach((function(n4) {
                          var r3 = t2.sb.channelHandlers[n4];
                          r3.onMessageReceived(e4, $2), l2 && r3.onMentionReceived(e4, $2);
                        })), x2.upsert([$2]).then((function() {
                          j2.send({ source: de.EVENT_MESSAGE_RECEIVED, payload: { channel: e4, message: $2 } });
                        })).catch((function(e5) {
                          t2.handleCacheError(e5);
                        }));
                      }
                    }));
                  } else $2.isOpenChannel() && d2.getChannel($2.channelUrl, T.INTERNAL_CALL, (function(e4, n3) {
                    if (t2.sb.getErrorFirstCallback()) {
                      var r3 = [e4, n3];
                      n3 = r3[0], e4 = r3[1];
                    }
                    if (!n3) {
                      var i3 = false;
                      if ($2.mentionType === _2.MentionType.CHANNEL) i3 = true;
                      else if ($2.mentionType === _2.MentionType.USERS) {
                        for (var s3 = 0; s3 < $2.mentionedUsers.length; s3++) if ($2.mentionedUsers[s3].userId === ee2) {
                          i3 = true;
                          break;
                        }
                      }
                      Object.keys(t2.sb.channelHandlers).forEach((function(n4) {
                        var r4 = t2.sb.channelHandlers[n4];
                        d2.enteredChannels[e4.url] && r4.onMessageReceived(e4, $2), i3 && r4.onMentionReceived(e4, $2);
                      })), d2.enteredChannels[e4.url] && j2.send({ source: de.EVENT_MESSAGE_RECEIVED, payload: { channel: e4, message: $2 } });
                    }
                  }));
                }
                break;
              case "MEDI":
              case "FEDI":
              case "AEDI":
                var ae2 = null;
                if ("MEDI" === M2.command ? ae2 = new h2(k2) : "FEDI" === M2.command ? ae2 = new p2(k2) : "AEDI" === M2.command && (ae2 = new f2(k2)), ae2) {
                  var oe2 = this.sb.currentUser ? this.sb.currentUser.userId : null, le2 = ae2.silent, ue2 = ae2.sender && ae2.sender.userId === oe2;
                  if (ae2.isGroupChannel()) {
                    var ce2 = c2.cachedChannels.hasOwnProperty(ae2.channelUrl);
                    c2.getChannel(ae2.channelUrl, T.INTERNAL_CALL, (function(e4, n3) {
                      if (t2.sb.getErrorFirstCallback()) {
                        var r3 = [e4, n3];
                        n3 = r3[0], e4 = r3[1];
                      }
                      if (!n3) {
                        var i3 = e4.cachedReadReceiptStatus[oe2], s3 = i3 && i3 >= ae2.createAt, a3 = t2.sb.currentUser;
                        a3 && ue2 && (a3.nickname !== ae2._sender.nickname && (a3.nickname = ae2._sender.nickname), a3.plainProfileUrl !== ae2._sender.plainProfileUrl && (a3.plainProfileUrl = ae2._sender.plainProfileUrl), se.deepEqual(a3.metaData, ae2._sender.metaData) || (a3.metaData = ae2._sender.metaData));
                        var o3 = false, l2 = false;
                        if (!ue2 && !s3 && k2 && k2.hasOwnProperty("old_values")) {
                          var u2 = k2.old_values.mention_type || ae2.mentionType, c3 = k2.old_values.mentioned_user_ids || ae2.mentionedUsers.map((function(e5) {
                            return e5.userId;
                          }));
                          if (u2 === _2.MentionType.USERS && ae2.mentionType === _2.MentionType.USERS) {
                            for (var d3 = false, h3 = false, p3 = 0; p3 < c3.length; p3++) if (c3[p3] === oe2) {
                              d3 = true;
                              break;
                            }
                            for (var f3 = 0; f3 < ae2.mentionedUsers.length; f3++) if (ae2.mentionedUsers[f3].userId === oe2) {
                              h3 = true;
                              break;
                            }
                            !d3 && h3 && (l2 = true, !le2 && ce2 && (e4._setGroupChannelUnreadCount(e4.unreadMessageCount, e4.unreadMentionCount + 1), o3 = true));
                          } else if (u2 === _2.MentionType.USERS && ae2.mentionType === _2.MentionType.CHANNEL) {
                            for (var g3 = false, y3 = 0; y3 < c3.length; y3++) if (c3[y3] === oe2) {
                              g3 = true;
                              break;
                            }
                            g3 || (l2 = true, !le2 && ce2 && (e4._setGroupChannelUnreadCount(e4.unreadMessageCount, e4.unreadMentionCount + 1), o3 = true));
                          }
                        }
                        e4.lastMessage ? e4.lastMessage.createdAt < ae2.createdAt ? (e4.lastMessage = ae2, o3 = true) : e4.lastMessage.createdAt === ae2.createdAt && e4.lastMessage.messageId === ae2.messageId && (ce2 ? e4.lastMessage.updatedAt < ae2.updatedAt && (e4.lastMessage = ae2, o3 = true) : o3 = true) : (e4.lastMessage = ae2, o3 = true), le2 && !ue2 || !o3 || (Object.keys(t2.sb.channelHandlers).forEach((function(n4) {
                          t2.sb.channelHandlers[n4].onChannelChanged(e4);
                        })), G2.upsert([e4]).then((function() {
                          j2.send({ source: de.EVENT_CHANNEL_CHANGED, payload: { channel: e4 } });
                        })).catch((function(e5) {
                          t2.handleCacheError(e5);
                        }))), Object.keys(t2.sb.channelHandlers).forEach((function(n4) {
                          var r4 = t2.sb.channelHandlers[n4];
                          r4.onMessageUpdated(e4, ae2), l2 && r4.onMentionReceived(e4, ae2);
                        })), x2.upsert([ae2]).then((function() {
                          j2.send({ source: de.EVENT_MESSAGE_UPDATED, payload: { channel: e4, message: ae2 } });
                        })).catch((function(e5) {
                          t2.handleCacheError(e5);
                        }));
                      }
                    }));
                  } else ae2.isOpenChannel() && d2.getChannel(ae2.channelUrl, T.INTERNAL_CALL, (function(e4, n3) {
                    if (t2.sb.getErrorFirstCallback()) {
                      var r3 = [e4, n3];
                      n3 = r3[0], e4 = r3[1];
                    }
                    n3 || (Object.keys(t2.sb.channelHandlers).forEach((function(n4) {
                      t2.sb.channelHandlers[n4].onMessageUpdated(e4, ae2);
                    })), j2.send({ source: de.EVENT_MESSAGE_UPDATED, payload: { channel: e4, message: ae2 } }));
                  }));
                }
                break;
              case "DELM":
                var he2 = String(k2.channel_type), pe2 = String(k2.channel_url), fe2 = parseInt(k2.msg_id);
                switch (he2) {
                  case o2.CHANNEL_TYPE_GROUP:
                    c2.getChannel(pe2, T.INTERNAL_CALL, (function(e4, n3) {
                      if (t2.sb.getErrorFirstCallback()) {
                        var r3 = [e4, n3];
                        n3 = r3[0], e4 = r3[1];
                      }
                      n3 ? J.debug("Discard command:", "`".concat(M2.command, "`")) : (Object.keys(t2.sb.channelHandlers).forEach((function(n4) {
                        t2.sb.channelHandlers[n4].onMessageDeleted(e4, fe2);
                      })), x2.remove(["".concat(fe2)]).then((function() {
                        j2.send({ source: de.EVENT_MESSAGE_DELETED, payload: { channel: e4, messageId: fe2 } });
                      })).catch((function(e5) {
                        t2.handleCacheError(e5);
                      })));
                    }));
                    break;
                  case o2.CHANNEL_TYPE_OPEN:
                    d2.getChannel(pe2, T.INTERNAL_CALL, (function(e4, n3) {
                      if (t2.sb.getErrorFirstCallback()) {
                        var r3 = [e4, n3];
                        n3 = r3[0], e4 = r3[1];
                      }
                      n3 ? J.debug("Discard command:", "`".concat(M2.command, "`")) : (Object.keys(t2.sb.channelHandlers).forEach((function(n4) {
                        t2.sb.channelHandlers[n4].onMessageDeleted(e4, fe2);
                      })), j2.send({ source: de.EVENT_MESSAGE_DELETED, payload: { channel: e4, messageId: fe2 } }));
                    }));
                }
                break;
              case "READ":
                var _e2 = new y2(k2), ye2 = c2.cachedChannels.hasOwnProperty(_e2.channelUrl);
                c2.getChannel(_e2.channelUrl, T.INTERNAL_CALL, (function(e4, n3) {
                  if (t2.sb.getErrorFirstCallback()) {
                    var r3 = [e4, n3];
                    n3 = r3[0], e4 = r3[1];
                  }
                  n3 || (ye2 && e4.updateReadReceipt(_e2.reader.userId, _e2.timestamp), t2.sb.currentUser && (_e2.reader.userId === t2.sb.currentUser.userId ? ye2 ? (e4.unreadMessageCount > 0 || e4.unreadMentionCount > 0) && (e4._setGroupChannelUnreadCount(0, 0), Object.keys(t2.sb.channelHandlers).forEach((function(n4) {
                    t2.sb.channelHandlers[n4].onChannelChanged(e4);
                  })), G2.upsert([e4]).then((function() {
                    j2.send({ source: de.EVENT_CHANNEL_CHANGED, payload: { channel: e4 } });
                  })).catch((function(e5) {
                    t2.handleCacheError(e5);
                  }))) : 0 !== e4.unreadMessageCount && 0 !== e4.unreadMentionCount || (Object.keys(t2.sb.channelHandlers).forEach((function(n4) {
                    t2.sb.channelHandlers[n4].onChannelChanged(e4);
                  })), G2.upsert([e4]).then((function() {
                    j2.send({ source: de.EVENT_CHANNEL_CHANGED, payload: { channel: e4 } });
                  })).catch((function(e5) {
                    t2.handleCacheError(e5);
                  }))) : Object.keys(t2.sb.channelHandlers).forEach((function(n4) {
                    t2.sb.channelHandlers[n4].onReadReceiptUpdated(e4);
                  })), j2.send({ source: de.EVENT_READ_RECEIPT_UPDATED, payload: { channel: e4, user: _e2.reader } })));
                }));
                break;
              case "MRCT":
                var me2 = String(k2.channel_type), Ee2 = String(k2.channel_url), ve2 = g2.createFromJson(k2);
                switch (me2) {
                  case o2.CHANNEL_TYPE_GROUP:
                    c2.getChannel(Ee2, T.INTERNAL_CALL, (function(e4, n3) {
                      if (t2.sb.getErrorFirstCallback()) {
                        var r3 = [e4, n3];
                        n3 = r3[0], e4 = r3[1];
                      }
                      n3 ? J.debug("Discard command:", "`".concat(M2.command, "`")) : (Object.keys(t2.sb.channelHandlers).forEach((function(n4) {
                        t2.sb.channelHandlers[n4].onReactionUpdated(e4, ve2);
                      })), x2.get("".concat(ve2.messageId)).then((function(n4) {
                        n4 && (n4.applyReactionEvent(ve2), x2.upsert([n4]).then((function() {
                          j2.send({ source: de.EVENT_REACTION_UPDATED, payload: { channel: e4, reactionEvent: ve2 } });
                        })).catch((function(e5) {
                          t2.handleCacheError(e5);
                        })));
                      })).catch((function(e5) {
                        t2.handleCacheError(e5);
                      })));
                    }));
                    break;
                  case o2.CHANNEL_TYPE_OPEN:
                    d2.getChannel(Ee2, T.INTERNAL_CALL, (function(e4, n3) {
                      if (t2.sb.getErrorFirstCallback()) {
                        var r3 = [e4, n3];
                        n3 = r3[0], e4 = r3[1];
                      }
                      n3 ? J.debug("Discard command:", "`".concat(M2.command, "`")) : (Object.keys(t2.sb.channelHandlers).forEach((function(n4) {
                        t2.sb.channelHandlers[n4].onReactionUpdated(e4, ve2);
                      })), j2.send({ source: de.EVENT_REACTION_UPDATED, payload: { channel: e4, reactionEvent: ve2 } }));
                    }));
                }
                break;
              case "DLVR":
                var be2 = String(k2.channel_url), Ce2 = k2.hasOwnProperty("updated") ? k2.updated : null, Ae2 = c2.cachedChannels.hasOwnProperty(be2);
                c2.getChannel(be2, T.INTERNAL_CALL, (function(e4, n3) {
                  if (t2.sb.getErrorFirstCallback()) {
                    var r3 = [e4, n3];
                    n3 = r3[0], e4 = r3[1];
                  }
                  if (!n3) {
                    var i3 = false;
                    Object.keys(Ce2).forEach((function(n4) {
                      t2.sb.currentUser && n4 === t2.sb.currentUser.userId && (i3 = true), Ae2 && e4.updateDeliveryReceipt(n4, parseInt(Ce2[n4]));
                    })), c2.cachedChannels[e4.url] = e4, i3 && 1 === Object.keys(Ce2).length || (Object.keys(t2.sb.channelHandlers).forEach((function(n4) {
                      t2.sb.channelHandlers[n4].onDeliveryReceiptUpdated(e4);
                    })), j2.send({ source: de.EVENT_DELIVERY_RECEIPT_UPDATED, payload: { channel: e4 } }));
                  }
                }));
                break;
              case "MTHD":
                var Ne2 = String(k2.channel_url), Se2 = String(k2.channel_type), Te2 = m2.createFromJson(k2);
                switch (Se2) {
                  case o2.CHANNEL_TYPE_GROUP:
                    c2.getChannel(Ne2, T.INTERNAL_CALL, (function(e4, n3) {
                      if (t2.sb.getErrorFirstCallback()) {
                        var r3 = [e4, n3];
                        n3 = r3[0], e4 = r3[1];
                      }
                      n3 || (Object.keys(t2.sb.channelHandlers).forEach((function(n4) {
                        t2.sb.channelHandlers[n4].onThreadInfoUpdated(e4, Te2);
                      })), x2.get("".concat(Te2.targetMessageId)).then((function(n4) {
                        n4 && (n4.applyThreadInfoUpdateEvent(Te2), x2.upsert([n4]).then((function() {
                          j2.send({ source: de.EVENT_THREAD_INFO_UPDATED, payload: { channel: e4, threadInfoUpdateEvent: Te2 } });
                        })).catch((function(e5) {
                          t2.handleCacheError(e5);
                        })));
                      })).catch((function(e5) {
                        t2.handleCacheError(e5);
                      })));
                    }));
                    break;
                  case o2.CHANNEL_TYPE_OPEN:
                    d2.getChannel(Ne2, T.INTERNAL_CALL, (function(e4, n3) {
                      if (t2.sb.getErrorFirstCallback()) {
                        var r3 = [e4, n3];
                        n3 = r3[0], e4 = r3[1];
                      }
                      n3 || (Object.keys(t2.sb.channelHandlers).forEach((function(n4) {
                        t2.sb.channelHandlers[n4].onThreadInfoUpdated(e4, Te2);
                      })), j2.send({ source: de.EVENT_THREAD_INFO_UPDATED, payload: { channel: e4, threadInfoUpdateEvent: Te2 } }));
                    }));
                }
                break;
              case "MCNT":
                if (k2.hasOwnProperty("group_channels") && Array.isArray(k2.group_channels)) {
                  var Ue2, Oe2 = [], Me2 = I(k2.group_channels);
                  try {
                    for (Me2.s(); !(Ue2 = Me2.n()).done; ) {
                      var ke2 = Ue2.value;
                      if (ke2) {
                        var Re2 = c2.cachedChannels[ke2.channel_url];
                        if (Re2 && Re2.isBroadcast) Re2.setLatestMemberCount(ke2.member_count, ke2.joined_member_count, ke2.ts) && Oe2.push(Re2);
                      }
                    }
                  } catch (e4) {
                    Me2.e(e4);
                  } finally {
                    Me2.f();
                  }
                  Oe2.length > 0 && (Object.keys(this.sb.channelHandlers).forEach((function(e4) {
                    t2.sb.channelHandlers[e4].onChannelMemberCountChanged(Oe2);
                  })), G2.upsert(Oe2).then((function() {
                    var e4, t3 = I(Oe2);
                    try {
                      for (t3.s(); !(e4 = t3.n()).done; ) {
                        var n3 = e4.value;
                        j2.send({ source: de.EVENT_CHANNEL_CHANGED, payload: { channel: n3 } });
                      }
                    } catch (e5) {
                      t3.e(e5);
                    } finally {
                      t3.f();
                    }
                  })).catch((function(e4) {
                    t2.handleCacheError(e4);
                  })));
                }
                if (k2.hasOwnProperty("open_channels") && Array.isArray(k2.open_channels)) {
                  var Le2, we2 = [], Pe2 = I(k2.open_channels);
                  try {
                    for (Pe2.s(); !(Le2 = Pe2.n()).done; ) {
                      var De2 = Le2.value;
                      if (De2) {
                        var He2 = d2.cachedChannels[De2.channel_url];
                        if (He2) He2.setLatestParticipantCount(De2.participant_count, De2.ts) && we2.push(He2);
                      }
                    }
                  } catch (e4) {
                    Pe2.e(e4);
                  } finally {
                    Pe2.f();
                  }
                  if (we2.length > 0) {
                    Object.keys(this.sb.channelHandlers).forEach((function(e4) {
                      t2.sb.channelHandlers[e4].onChannelParticipantCountChanged(we2);
                    }));
                    var Fe2, Ge2 = I(we2);
                    try {
                      for (Ge2.s(); !(Fe2 = Ge2.n()).done; ) {
                        var xe2 = Fe2.value;
                        j2.send({ source: de.EVENT_CHANNEL_CHANGED, payload: { channel: xe2 } });
                      }
                    } catch (e4) {
                      Ge2.e(e4);
                    } finally {
                      Ge2.f();
                    }
                  }
                }
                break;
              case "SYEV":
                var je2 = new Lt(k2), Be2 = k2.ts;
                switch (je2.category) {
                  case Lt.CATEGORY_CHANNEL_JOIN:
                  case Lt.CATEGORY_CHANNEL_LEAVE:
                    c2.getChannel(je2.channelUrl, T.INTERNAL_CALL, (function(e4, n3) {
                      if (t2.sb.getErrorFirstCallback()) {
                        var r3 = [e4, n3];
                        n3 = r3[0], e4 = r3[1];
                      }
                      if (n3) J.debug("Discard command:", "`".concat(M2.command, "`"), je2.category);
                      else {
                        var a3 = je2.data.hasOwnProperty("member_count") ? je2.data.member_count : null, o3 = je2.data.hasOwnProperty("joined_member_count") ? je2.data.joined_member_count : null, l2 = false;
                        if (je2.category === Lt.CATEGORY_CHANNEL_JOIN) {
                          (je2.data.hasOwnProperty("users") ? je2.data.users : [je2.data]).forEach((function(n4) {
                            e4.isSuper || e4.isBroadcast ? l2 = e4.setLatestMemberCount(a3, o3, k2.ts) : (n4.state = s2.JOINED, e4.addMember(new s2(n4), Be2), e4.updateJoinedMemberCount());
                            var r4 = new i2(n4);
                            t2.sb.currentUser && r4.userId === t2.sb.currentUser.userId && (e4.myMemberState = "joined", c2.cachedChannels[e4.url] = e4), Object.keys(t2.sb.channelHandlers).forEach((function(n5) {
                              var i3 = t2.sb.channelHandlers[n5];
                              i3.onUserJoined(e4, r4), e4.isBroadcast && l2 && i3.onChannelMemberCountChanged([e4]);
                            })), G2.upsert([e4]).then((function() {
                              j2.send({ source: de.EVENT_USER_JOINED, payload: { channel: e4, user: r4 } });
                            })).catch((function(e5) {
                              t2.handleCacheError(e5);
                            }));
                          }));
                        } else {
                          var u2 = new i2(je2.data);
                          if (t2.sb.currentUser && u2.userId === t2.sb.currentUser.userId ? (e4.isPublic || c2.removeCachedChannel(je2.channelUrl), e4.myMemberState = "none", e4.invitedAt = 0, e4.joinedAt = 0, e4._setGroupChannelUnreadCount(0, 0)) : c2.cachedChannels[e4.url] = e4, e4.isSuper || e4.isBroadcast) l2 = e4.setLatestMemberCount(a3, o3, k2.ts);
                          else v2.container.appInfo.enabledChannelMemberShipHistory ? (e4.memberMap[u2.userId].state = c2.MemberStateFilter.LEFT, e4.memberCount = je2.data.member_count) : e4.removeMember(u2), e4.updateJoinedMemberCount();
                          Object.keys(t2.sb.channelHandlers).forEach((function(n4) {
                            var r4 = t2.sb.channelHandlers[n4];
                            r4.onUserLeft(e4, u2), e4.isBroadcast && l2 && r4.onChannelMemberCountChanged([e4]);
                          })), G2.upsert([e4]).then((function() {
                            j2.send({ source: de.EVENT_USER_LEFT, payload: { channel: e4, user: u2 } });
                          })).catch((function(e5) {
                            t2.handleCacheError(e5);
                          }));
                        }
                      }
                    }));
                    break;
                  case Lt.CATEGORY_CHANNEL_OPERATOR_UPDATE:
                    je2.isGroupChannel() ? c2.getChannel(je2.channelUrl, T.INTERNAL_CALL, (function(e4, n3) {
                      if (t2.sb.getErrorFirstCallback()) {
                        var r3 = [e4, n3];
                        n3 = r3[0], e4 = r3[1];
                      }
                      if (n3) J.debug("Discard command:", "`".concat(M2.command, "`"), je2.category);
                      else {
                        for (var s3 = je2.data.operators.map((function(e5) {
                          return new i2(e5);
                        })), a3 = s3.map((function(e5) {
                          return e5.userId;
                        })), o3 = 0; o3 < e4.members.length; o3++) e4.members[o3].role = a3.indexOf(e4.members[o3].userId) >= 0 ? c2.Role.OPERATOR : c2.Role.NONE;
                        e4.myRole = t2.sb.currentUser && a3.indexOf(t2.sb.currentUser.userId) >= 0 ? c2.Role.OPERATOR : c2.Role.NONE, Object.keys(t2.sb.channelHandlers).forEach((function(n4) {
                          t2.sb.channelHandlers[n4].onOperatorUpdated(e4, s3);
                        })), G2.upsert([e4]).then((function() {
                          j2.send({ source: de.EVENT_OPERATOR_UPDATED, payload: { channel: e4, operators: s3 } });
                        })).catch((function(e5) {
                          t2.handleCacheError(e5);
                        }));
                      }
                    })) : je2.isOpenChannel() && d2.getChannel(je2.channelUrl, T.INTERNAL_CALL, (function(e4, n3) {
                      if (t2.sb.getErrorFirstCallback()) {
                        var r3 = [e4, n3];
                        n3 = r3[0], e4 = r3[1];
                      }
                      n3 ? J.debug("Discard command:", "`".concat(M2.command, "`"), je2.category) : (e4.operators = je2.data.operators.map((function(e5) {
                        return new i2(e5);
                      })), Object.keys(t2.sb.channelHandlers).forEach((function(n4) {
                        t2.sb.channelHandlers[n4].onOperatorUpdated(e4, e4.operators);
                      })));
                    }));
                    break;
                  case Lt.CATEGORY_CHANNEL_INVITE:
                    c2.getChannel(je2.channelUrl, T.INTERNAL_CALL, (function(e4, n3) {
                      if (t2.sb.getErrorFirstCallback()) {
                        var r3 = [e4, n3];
                        n3 = r3[0], e4 = r3[1];
                      }
                      if (n3) J.debug("Discard command:", "`".concat(M2.command, "`"), je2.category);
                      else {
                        var a3 = null;
                        je2.data && je2.data.inviter && Object.keys(je2.data.inviter).length > 0 && (a3 = new i2(je2.data.inviter));
                        for (var o3 = [], l2 = 0; l2 < je2.data.invitees.length; l2++) {
                          var u2 = new i2(je2.data.invitees[l2]);
                          o3.push(u2), je2.data.invitees[l2].state = s2.INVITED;
                          var d3 = new s2(je2.data.invitees[l2]);
                          if (e4.isSuper || e4.isBroadcast) {
                            var h3 = je2.data.hasOwnProperty("member_count") ? je2.data.member_count : null, p3 = je2.data.hasOwnProperty("joined_member_count") ? je2.data.joined_member_count : null;
                            e4.setLatestMemberCount(h3, p3, k2.ts);
                          } else e4.addMember(d3, Be2);
                          t2.sb.currentUser && d3.userId === t2.sb.currentUser.userId && (e4.isHidden = false, "joined" !== e4.myMemberState && (e4.myMemberState = "invited"), e4.invitedAt = k2.ts, c2.cachedChannels[e4.url] = e4);
                        }
                        Object.keys(t2.sb.channelHandlers).forEach((function(n4) {
                          t2.sb.channelHandlers[n4].onUserReceivedInvitation(e4, a3, o3);
                        })), G2.upsert([e4]).then((function() {
                          j2.send({ source: de.EVENT_USER_RECEIVED_INVITATION, payload: { channel: e4, inviter: a3, invitees: o3 } });
                        })).catch((function(e5) {
                          t2.handleCacheError(e5);
                        }));
                      }
                    }));
                    break;
                  case Lt.CATEGORY_CHANNEL_DECLINE_INVITE:
                    c2.getChannel(je2.channelUrl, T.INTERNAL_CALL, (function(e4, n3) {
                      if (t2.sb.getErrorFirstCallback()) {
                        var r3 = [e4, n3];
                        n3 = r3[0], e4 = r3[1];
                      }
                      if (n3) J.debug("Discard command:", "`".concat(M2.command, "`"), je2.category);
                      else {
                        var s3 = null;
                        je2.data && je2.data.inviter && Object.keys(je2.data.inviter).length > 0 && (s3 = new i2(je2.data.inviter));
                        var a3 = new i2(je2.data.invitee);
                        if (t2.sb.currentUser && a3.userId === t2.sb.currentUser.userId && (e4.invitedAt = 0, e4.myMemberState = "none", e4.isPublic || c2.removeCachedChannel(je2.channelUrl)), e4.isSuper || e4.isBroadcast) {
                          var o3 = je2.data.hasOwnProperty("member_count") ? je2.data.member_count : null, l2 = je2.data.hasOwnProperty("joined_member_count") ? je2.data.joined_member_count : null;
                          e4.setLatestMemberCount(o3, l2, k2.ts);
                        } else e4.removeMember(a3);
                        t2.sb.currentUser && a3.userId !== t2.sb.currentUser.userId && (c2.cachedChannels[e4.url] = e4), Object.keys(t2.sb.channelHandlers).forEach((function(n4) {
                          t2.sb.channelHandlers[n4].onUserDeclinedInvitation(e4, s3, a3);
                        })), G2.upsert([e4]).then((function() {
                          j2.send({ source: de.EVENT_USER_DECLINED_INVITATION, payload: { channel: e4, inviter: s3, invitee: a3 } });
                        })).catch((function(e5) {
                          t2.handleCacheError(e5);
                        }));
                      }
                    }));
                    break;
                  case Lt.CATEGORY_TYPING_START:
                  case Lt.CATEGORY_TYPING_END:
                    c2.getChannel(je2.channelUrl, T.INTERNAL_CALL, (function(e4, n3) {
                      if (t2.sb.getErrorFirstCallback()) {
                        var r3 = [e4, n3];
                        n3 = r3[0], e4 = r3[1];
                      }
                      if (n3) J.debug("Discard command:", "`".concat(M2.command, "`"), je2.category);
                      else {
                        var s3 = new i2(je2.data);
                        je2.category === Lt.CATEGORY_TYPING_START ? e4.updateTypingStatus(s3, true) : e4.updateTypingStatus(s3, false), Object.keys(t2.sb.channelHandlers).forEach((function(n4) {
                          t2.sb.channelHandlers[n4].onTypingStatusUpdated(e4);
                        })), G2.upsert([e4]).then((function() {
                          j2.send({ source: de.EVENT_TYPING_STATUS_UPDATED, payload: { channel: e4 } });
                        })).catch((function(e5) {
                          t2.handleCacheError(e5);
                        }));
                      }
                    }));
                    break;
                  case Lt.CATEGORY_CHANNEL_ENTER:
                  case Lt.CATEGORY_CHANNEL_EXIT:
                    d2.getChannel(je2.channelUrl, T.INTERNAL_CALL, (function(e4, n3) {
                      if (t2.sb.getErrorFirstCallback()) {
                        var r3 = [e4, n3];
                        n3 = r3[0], e4 = r3[1];
                      }
                      if (n3) J.debug("Discard command:", "`".concat(M2.command, "`"), je2.category);
                      else {
                        var s3 = je2.data.hasOwnProperty("participant_count") ? je2.data.participant_count : null, a3 = e4.setLatestParticipantCount(s3, k2.ts), o3 = new i2(je2.data);
                        je2.category === Lt.CATEGORY_CHANNEL_ENTER ? (Object.keys(t2.sb.channelHandlers).forEach((function(n4) {
                          var r4 = t2.sb.channelHandlers[n4];
                          r4.onUserEntered(e4, o3), a3 && r4.onChannelParticipantCountChanged([e4]);
                        })), j2.send({ source: de.EVENT_CHANNEL_ENTER, payload: { channel: e4, user: o3 } })) : (Object.keys(t2.sb.channelHandlers).forEach((function(n4) {
                          var r4 = t2.sb.channelHandlers[n4];
                          r4.onUserExited(e4, o3), a3 && r4.onChannelParticipantCountChanged([e4]);
                        })), j2.send({ source: de.EVENT_CHANNEL_EXIT, payload: { channel: e4, user: o3 } }));
                      }
                    }));
                    break;
                  case Lt.CATEGORY_USER_CHANNEL_MUTE:
                  case Lt.CATEGORY_USER_CHANNEL_UNMUTE:
                    var Ve2 = je2.category === Lt.CATEGORY_USER_CHANNEL_MUTE, qe2 = l({}, je2.data);
                    Ve2 && (qe2.restriction_type = a2.RestrictionType.MUTED);
                    var Ke2 = Ve2 ? new a2(qe2) : new i2(je2.data), ze2 = Ve2 ? "muted" : "unmuted";
                    je2.isOpenChannel() ? d2.getChannel(je2.channelUrl, T.INTERNAL_CALL, (function(e4, n3) {
                      if (t2.sb.getErrorFirstCallback()) {
                        var r3 = [e4, n3];
                        n3 = r3[0], e4 = r3[1];
                      }
                      n3 ? J.debug("Discard command:", "`".concat(M2.command, "`"), je2.category) : Ve2 ? (Object.keys(t2.sb.channelHandlers).forEach((function(n4) {
                        t2.sb.channelHandlers[n4].onUserMuted(e4, Ke2);
                      })), j2.send({ source: de.EVENT_USER_MUTED, payload: { channel: e4, user: Ke2 } })) : (Object.keys(t2.sb.channelHandlers).forEach((function(n4) {
                        t2.sb.channelHandlers[n4].onUserUnmuted(e4, Ke2);
                      })), j2.send({ source: de.EVENT_USER_UNMUTED, payload: { channel: e4, user: Ke2 } }));
                    })) : c2.getChannel(je2.channelUrl, T.INTERNAL_CALL, (function(e4, n3) {
                      if (t2.sb.getErrorFirstCallback()) {
                        var r3 = [e4, n3];
                        n3 = r3[0], e4 = r3[1];
                      }
                      n3 ? J.debug("Discard command:", "`".concat(M2.command, "`"), je2.category) : (t2.sb.currentUser && Ke2.userId === t2.sb.currentUser.userId && (e4.myMutedState = ze2), Array.isArray(e4.members) && e4.members.filter((function(e5) {
                        return e5 && e5.userId === Ke2.userId;
                      })).forEach((function(e5) {
                        e5.isMuted = Ve2, e5.restrictionInfo = new E2(qe2);
                      })), Ve2 ? (Object.keys(t2.sb.channelHandlers).forEach((function(n4) {
                        t2.sb.channelHandlers[n4].onUserMuted(e4, Ke2);
                      })), G2.upsert([e4]).then((function() {
                        j2.send({ source: de.EVENT_USER_MUTED, payload: { channel: e4, user: Ke2 } });
                      })).catch((function(e5) {
                        t2.handleCacheError(e5);
                      }))) : (Object.keys(t2.sb.channelHandlers).forEach((function(n4) {
                        t2.sb.channelHandlers[n4].onUserUnmuted(e4, Ke2);
                      })), G2.upsert([e4]).then((function() {
                        j2.send({ source: de.EVENT_USER_UNMUTED, payload: { channel: e4, user: Ke2 } });
                      })).catch((function(e5) {
                        t2.handleCacheError(e5);
                      }))));
                    }));
                    break;
                  case Lt.CATEGORY_USER_CHANNEL_BAN:
                  case Lt.CATEGORY_USER_CHANNEL_UNBAN:
                    var Ye2 = je2.category === Lt.CATEGORY_USER_CHANNEL_BAN, Qe2 = l({}, je2.data);
                    Ye2 && (Qe2.restriction_type = a2.RestrictionType.BANNED);
                    var We2 = Ye2 ? new a2(Qe2) : new i2(je2.data);
                    je2.isOpenChannel() ? d2.getChannel(je2.channelUrl, T.INTERNAL_CALL, (function(e4, n3) {
                      if (t2.sb.getErrorFirstCallback()) {
                        var r3 = [e4, n3];
                        n3 = r3[0], e4 = r3[1];
                      }
                      if (n3) J.debug("Discard command:", "`".concat(M2.command, "`"), je2.category);
                      else if (Ye2) {
                        if (t2.sb.currentUser && We2.userId === t2.sb.currentUser.userId) delete d2.enteredChannels[je2.channelUrl], t2.cls.FileMessageQueue.delete(je2.channelUrl);
                        Object.keys(t2.sb.channelHandlers).forEach((function(n4) {
                          t2.sb.channelHandlers[n4].onUserBanned(e4, We2);
                        })), j2.send({ source: de.EVENT_USER_BANNED, payload: { channel: e4, user: We2 } });
                      } else Object.keys(t2.sb.channelHandlers).forEach((function(n4) {
                        t2.sb.channelHandlers[n4].onUserUnbanned(e4, We2);
                      })), j2.send({ source: de.EVENT_USER_UNBANNED, payload: { channel: e4, user: We2 } });
                    })) : c2.getChannel(je2.channelUrl, T.INTERNAL_CALL, (function(e4, n3) {
                      if (t2.sb.getErrorFirstCallback()) {
                        var r3 = [e4, n3];
                        n3 = r3[0], e4 = r3[1];
                      }
                      if (n3) J.debug("Discard command:", "`".concat(M2.command, "`"), je2.category);
                      else if (Ye2) {
                        if (t2.sb.currentUser && We2.userId === t2.sb.currentUser.userId && (e4.isPublic || c2.removeCachedChannel(je2.channelUrl), e4.myMemberState = "none", e4.invitedAt = 0, e4.joinedAt = 0, e4._setGroupChannelUnreadCount(0, 0)), e4.isSuper || e4.isBroadcast) {
                          var i3 = je2.data.hasOwnProperty("member_count") ? je2.data.member_count : null, s3 = je2.data.hasOwnProperty("joined_member_count") ? je2.data.joined_member_count : null;
                          e4.setLatestMemberCount(i3, s3, k2.ts);
                        } else e4.removeMember(We2), e4.updateJoinedMemberCount();
                        Object.keys(t2.sb.channelHandlers).forEach((function(n4) {
                          t2.sb.channelHandlers[n4].onUserBanned(e4, We2);
                        })), j2.send({ source: de.EVENT_USER_BANNED, payload: { channel: e4, user: We2 } });
                      } else Object.keys(t2.sb.channelHandlers).forEach((function(n4) {
                        t2.sb.channelHandlers[n4].onUserUnbanned(e4, We2);
                      })), j2.send({ source: de.EVENT_USER_UNBANNED, payload: { channel: e4, user: We2 } });
                    }));
                    break;
                  case Lt.CATEGORY_CHANNEL_FREEZE:
                  case Lt.CATEGORY_CHANNEL_UNFREEZE:
                    je2.isOpenChannel() ? d2.getChannel(je2.channelUrl, T.INTERNAL_CALL, (function(e4, n3) {
                      if (t2.sb.getErrorFirstCallback()) {
                        var r3 = [e4, n3];
                        n3 = r3[0], e4 = r3[1];
                      }
                      n3 ? J.debug("Discard command:", "`".concat(M2.command, "`"), je2.category) : (e4.isFrozen = je2.data.freeze, d2.cachedChannels[e4.url] = e4, je2.category === Lt.CATEGORY_CHANNEL_FREEZE ? (Object.keys(t2.sb.channelHandlers).forEach((function(n4) {
                        t2.sb.channelHandlers[n4].onChannelFrozen(e4);
                      })), j2.send({ source: de.EVENT_CHANNEL_FROZEN, payload: { channel: e4 } })) : (Object.keys(t2.sb.channelHandlers).forEach((function(n4) {
                        t2.sb.channelHandlers[n4].onChannelUnfrozen(e4);
                      })), j2.send({ source: de.EVENT_CHANNEL_UNFROZEN, payload: { channel: e4 } })));
                    })) : c2.getChannel(je2.channelUrl, T.INTERNAL_CALL, (function(e4, n3) {
                      if (t2.sb.getErrorFirstCallback()) {
                        var r3 = [e4, n3];
                        n3 = r3[0], e4 = r3[1];
                      }
                      n3 ? J.debug("Discard command:", "`".concat(M2.command, "`"), je2.category) : (e4.isFrozen = je2.data.freeze, c2.cachedChannels[e4.url] = e4, je2.category === Lt.CATEGORY_CHANNEL_FREEZE ? (Object.keys(t2.sb.channelHandlers).forEach((function(n4) {
                        t2.sb.channelHandlers[n4].onChannelFrozen(e4);
                      })), G2.upsert([e4]).then((function() {
                        j2.send({ source: de.EVENT_CHANNEL_FROZEN, payload: { channel: e4 } });
                      })).catch((function(e5) {
                        t2.handleCacheError(e5);
                      }))) : (Object.keys(t2.sb.channelHandlers).forEach((function(n4) {
                        t2.sb.channelHandlers[n4].onChannelUnfrozen(e4);
                      })), G2.upsert([e4]).then((function() {
                        j2.send({ source: de.EVENT_CHANNEL_UNFROZEN, payload: { channel: e4 } });
                      })).catch((function(e5) {
                        t2.handleCacheError(e5);
                      }))));
                    }));
                    break;
                  case Lt.CATEGORY_CHANNEL_DELETED:
                    je2.isGroupChannel() ? c2.removeCachedChannel(je2.channelUrl) : d2.removeCachedChannel(je2.channelUrl);
                    var Je2 = je2.channelUrl, Xe2 = je2.isGroupChannel() ? "group" : "open";
                    Object.keys(this.sb.channelHandlers).forEach((function(e4) {
                      t2.sb.channelHandlers[e4].onChannelDeleted(Je2, Xe2);
                    })), G2.remove([Je2]).then((function() {
                      j2.send({ source: de.EVENT_CHANNEL_DELETED, payload: { channelUrl: Je2, channelType: Xe2 } });
                    })).catch((function(e4) {
                      t2.handleCacheError(e4);
                    }));
                    break;
                  case Lt.CATEGORY_CHANNEL_PROP_CHANGED:
                    je2.isOpenChannel() ? d2.getChannelWithoutCache(je2.channelUrl, (function(e4, n3) {
                      if (t2.sb.getErrorFirstCallback()) {
                        var r3 = [e4, n3];
                        n3 = r3[0], e4 = r3[1];
                      }
                      n3 ? J.debug("Discard command:", "`".concat(M2.command, "`"), je2.category) : (Object.keys(t2.sb.channelHandlers).forEach((function(n4) {
                        t2.sb.channelHandlers[n4].onChannelChanged(e4);
                      })), j2.send({ source: de.EVENT_CHANNEL_CHANGED, payload: { channel: e4 } }));
                    })) : c2.getChannelWithoutCache(je2.channelUrl, (function(e4, n3) {
                      if (t2.sb.getErrorFirstCallback()) {
                        var r3 = [e4, n3];
                        n3 = r3[0], e4 = r3[1];
                      }
                      if (n3) J.debug("Discard command:", "`".concat(M2.command, "`"), je2.category);
                      else {
                        var i3 = e4.unreadMessageCount, s3 = e4.unreadMentionCount;
                        e4.myCountPreference !== c2.CountPreference.ALL && (e4.myCountPreference === c2.CountPreference.UNREAD_MESSAGE_COUNT_ONLY ? s3 = 0 : e4.myCountPreference === c2.CountPreference.UNREAD_MENTION_COUNT_ONLY ? i3 = 0 : (i3 = 0, s3 = 0)), e4._setGroupChannelUnreadCount(i3, s3), Object.keys(t2.sb.channelHandlers).forEach((function(n4) {
                          t2.sb.channelHandlers[n4].onChannelChanged(e4);
                        })), G2.upsert([e4]).then((function() {
                          j2.send({ source: de.EVENT_CHANNEL_CHANGED, payload: { channel: e4 } });
                        })).catch((function(e5) {
                          t2.handleCacheError(e5);
                        }));
                      }
                    }));
                    break;
                  case Lt.CATEGORY_CHANNEL_META_DATA_CHANGED:
                  case Lt.CATEGORY_CHANNEL_META_COUNTERS_CHANGED:
                    var Ze2 = je2.data.hasOwnProperty("created"), et2 = je2.data.hasOwnProperty("updated"), tt2 = je2.data.hasOwnProperty("deleted");
                    (je2.isOpenChannel() ? d2.getChannel(je2.channelUrl, T.INTERNAL_CALL) : c2.getChannel(je2.channelUrl, T.INTERNAL_CALL)).then((function(e4) {
                      var n3 = je2.data.created, r3 = je2.data.updated, i3 = je2.data.deleted;
                      Object.keys(t2.sb.channelHandlers).forEach((function(s3) {
                        var a3 = t2.sb.channelHandlers[s3];
                        if (je2.category === Lt.CATEGORY_CHANNEL_META_DATA_CHANGED) {
                          var o3 = k2.ts;
                          Ze2 && e4._addOrUpdateCachedMetaData(n3, o3), et2 && e4._addOrUpdateCachedMetaData(r3, o3), tt2 && e4._markAsDeletedCachedMetaData(i3, o3), Ze2 && a3.onMetaDataCreated(e4, n3), et2 && a3.onMetaDataUpdated(e4, r3), tt2 && a3.onMetaDataDeleted(e4, i3), (Ze2 || et2) && j2.send({ source: de.EVENT_CHANNEL_METADATA_UPDATED, payload: { channel: e4, metaData: l(l({}, n3), r3) } }), tt2 && j2.send({ source: de.EVENT_CHANNEL_METADATA_DELETED, payload: { channel: e4, metaData: l({}, i3) } });
                        } else Ze2 && a3.onMetaCountersCreated(e4, n3), et2 && a3.onMetaCountersUpdated(e4, r3), tt2 && a3.onMetaCountersDeleted(e4, i3), (Ze2 || et2) && j2.send({ source: de.EVENT_CHANNEL_METACOUNTER_UPDATED, payload: { channel: e4, metaData: l(l({}, n3), r3) } }), tt2 && j2.send({ source: de.EVENT_CHANNEL_METACOUNTER_DELETED, payload: { channel: e4, metaData: l({}, i3) } });
                      }));
                    })).catch((function(e4) {
                      return J.debug("Discard command:", "`".concat(M2.command, "`"), je2.category);
                    }));
                    break;
                  case Lt.CATEGORY_CHANNEL_HIDE:
                  case Lt.CATEGORY_CHANNEL_UNHIDE:
                    c2.getChannel(je2.channelUrl, T.INTERNAL_CALL, (function(e4, n3) {
                      if (t2.sb.getErrorFirstCallback()) {
                        var r3 = [e4, n3];
                        n3 = r3[0], e4 = r3[1];
                      }
                      n3 ? J.debug("Discard command:", "`".concat(M2.command, "`"), je2.category) : je2.category === Lt.CATEGORY_CHANNEL_HIDE ? (e4.isHidden = true, je2.data && (je2.data.hasOwnProperty("allow_auto_unhide") && (e4.hiddenState = je2.data.allow_auto_unhide ? c2.HiddenState.HIDDEN_ALLOW_AUTO_UNHIDE : c2.HiddenState.HIDDEN_PREVENT_AUTO_UNHIDE), je2.data.hasOwnProperty("hide_previous_messages") && je2.data.hide_previous_messages && e4._setGroupChannelUnreadCount(0, 0)), k2.hasOwnProperty("ts_message_offset") && (e4._messageOffsetTimestamp = k2.ts_message_offset), c2.cachedChannels[e4.url] = e4, Object.keys(t2.sb.channelHandlers).forEach((function(n4) {
                        t2.sb.channelHandlers[n4].onChannelHidden(e4);
                      })), G2.upsert([e4]).then((function() {
                        j2.send({ source: de.EVENT_CHANNEL_HIDDEN, payload: { channel: e4 } });
                      })).catch((function(e5) {
                        t2.handleCacheError(e5);
                      }))) : (e4.isHidden = false, e4.hiddenState = c2.HiddenState.UNHIDDEN, c2.cachedChannels[e4.url] = e4, Object.keys(t2.sb.channelHandlers).forEach((function(n4) {
                        t2.sb.channelHandlers[n4].onChannelChanged(e4);
                      })), G2.upsert([e4]).then((function() {
                        j2.send({ source: de.EVENT_CHANNEL_UNHIDDEN, payload: { channel: e4 } });
                      })).catch((function(e5) {
                        t2.handleCacheError(e5);
                      })));
                    }));
                }
                break;
              case "USEV":
                var nt2 = new Lt(k2);
                switch (nt2.category) {
                  case wt.CATEGORY_USER_BLOCK:
                  case wt.CATEGORY_USER_UNBLOCK:
                    var rt2 = nt2.data.blocker.user_id, it2 = nt2.data.blockee.user_id;
                    Object.keys(c2.cachedChannels).forEach((function(e4) {
                      var n3 = c2.cachedChannels[e4];
                      try {
                        t2.sb.currentUser && (t2.sb.currentUser.userId === rt2 ? n3.memberMap[it2].isBlockedByMe = nt2.category === wt.CATEGORY_USER_BLOCK : t2.sb.currentUser.userId === it2 && (n3.memberMap[rt2].isBlockingMe = nt2.category === wt.CATEGORY_USER_BLOCK));
                      } catch (e5) {
                      }
                    }));
                    break;
                  case wt.CATEGORY_FRIEND_DISCOVERED:
                    var st2 = nt2.data.friend_discoveries.map((function(e4) {
                      return new i2(e4);
                    }));
                    Object.keys(this.sb.userEventHandlers).forEach((function(e4) {
                      t2.sb.userEventHandlers[e4].onFriendsDiscovered(st2);
                    }));
                }
                break;
              case "LEAV":
              case "JOIN":
              case "PONG":
              case "MTIO":
              case "TPST":
              case "TPEN":
                break;
              default:
                J.debug("Discard command:", "`".concat(M2.command, "`"));
            }
          }
        } }, { key: "handleCacheError", value: function(e3) {
          J.error(e3);
        } }]), e2;
      })(), Dt = 200, Ht = {}, Ft = {}, Gt = (function() {
        function e2(t2) {
          c(this, e2), this.channel = t2, this.uploadQueue = [], this.messageQueue = [], this.latestTimestampToSendMessage = 0, x.get(this._iid).FileMessageQueue.queueMap[t2.url] = this;
        }
        return h(e2, [{ key: "_handleMessageQueueUpdated", value: function(e3) {
          var t2 = this;
          switch (J.debug("`fileMessageQueue` message queue updated:", this.messageQueue), e3) {
            case "add":
              this.uploadQueue.length < 6 && this._moveFirstPendingMessageToUploadQueue();
              break;
            case "update":
            case "remove":
              if (this.messageQueue.length > 0) {
                var n2 = x.get(this._iid).FileMessageQueue, r2 = this.messageQueue[0];
                if (r2) if (r2.state === n2.State.UPLOADED) if (r2.state = n2.State.SENDING, navigator && "boolean" == typeof navigator.onLine) if (navigator.onLine) {
                  for (0 === this.latestTimestampToSendMessage && (this.latestTimestampToSendMessage = (/* @__PURE__ */ new Date()).getTime() - Dt); (/* @__PURE__ */ new Date()).getTime() - this.latestTimestampToSendMessage < Dt; ) ;
                  this.latestTimestampToSendMessage = (/* @__PURE__ */ new Date()).getTime(), this._sendUploadedMessage(r2, (function(e4, i2) {
                    r2.state = n2.State.SENT, r2.error = e4 || null, r2.response = i2 || null, t2._handleMessageQueueUpdated("update");
                  }));
                } else r2.state = n2.State.SENT, r2.error = new H("Connection is not valid. Please reconnect.", H.WEBSOCKET_CONNECTION_CLOSED), r2.response = null, this._finalizeMessage();
                else Qe.ready().then((function(e4) {
                  if (e4) {
                    for (0 === t2.latestTimestampToSendMessage && (t2.latestTimestampToSendMessage = (/* @__PURE__ */ new Date()).getTime() - Dt); (/* @__PURE__ */ new Date()).getTime() - t2.latestTimestampToSendMessage < Dt; ) ;
                    t2.latestTimestampToSendMessage = (/* @__PURE__ */ new Date()).getTime(), t2._sendUploadedMessage(r2, (function(e5, i2) {
                      r2.state = n2.State.SENT, r2.error = e5 || null, r2.response = i2 || null, t2._handleMessageQueueUpdated("update");
                    }));
                  } else r2.state = n2.State.SENT, r2.error = new H("Connection is not valid. Please reconnect.", H.WEBSOCKET_CONNECTION_CLOSED), r2.response = null, t2._finalizeMessage();
                }));
                else r2.state === n2.State.SENT && this._finalizeMessage();
              }
          }
        } }, { key: "_handleUploadQueueUpdated", value: function(e3, t2) {
          var n2 = this;
          switch (J.debug("`fileMessageQueue` upload queue updated:", this.uploadQueue), e3) {
            case "add":
              var r2 = x.get(this._iid).FileMessageQueue;
              if (t2.state = r2.State.UPLOADING, t2.error) {
                var i2 = this.messageQueue.map((function(e4) {
                  return e4.requestId;
                })).indexOf(t2.requestId);
                i2 > -1 && (t2.state = r2.State.SENT, this._handleMessageQueueUpdated("update")), this._finalizeUpload(t2.requestId);
              } else navigator && "boolean" == typeof navigator.onLine ? navigator.onLine ? this._uploadFile(t2, (function(e4) {
                t2.error && t2.error.code === H.REQUEST_FAILED && (t2.error = new H("Failed to upload a file.", H.NETWORK_ERROR)), t2.error && t2.state === r2.State.SENT || (t2.state = r2.State.UPLOADED), t2.fileInfo = e4, n2._handleMessageQueueUpdated("update"), n2._finalizeUpload(t2.requestId);
              })) : (t2.state = r2.State.SENT, t2.error = new H("Connection is not valid. Please reconnect.", H.WEBSOCKET_CONNECTION_CLOSED), t2.response = null, this._handleMessageQueueUpdated("update"), this._finalizeUpload(t2.requestId)) : Qe.ready().then((function(e4) {
                e4 ? n2._uploadFile(t2, (function(e5) {
                  t2.error && t2.error.code === H.REQUEST_FAILED && (t2.error = new H("Failed to upload a file.", H.NETWORK_ERROR)), t2.error && t2.state === r2.State.SENT || (t2.state = r2.State.UPLOADED), t2.fileInfo = e5, n2._handleMessageQueueUpdated("update"), n2._finalizeUpload(t2.requestId);
                })) : (t2.state = r2.State.SENT, t2.error = new H("Connection is not valid. Please reconnect.", H.WEBSOCKET_CONNECTION_CLOSED), t2.response = null, n2._handleMessageQueueUpdated("update"), n2._finalizeUpload(t2.requestId));
              }));
              break;
            case "update":
              break;
            case "remove":
              this.uploadQueue.length < 6 && this._moveFirstPendingMessageToUploadQueue();
          }
        } }, { key: "_moveFirstPendingMessageToUploadQueue", value: function() {
          var e3 = x.get(this._iid).FileMessageQueue, t2 = this.messageQueue.filter((function(t3) {
            return t3.state === e3.State.PENDING;
          }));
          if (t2.length > 0) {
            var n2 = t2[0];
            this.uploadQueue.push(n2), this._handleUploadQueueUpdated("add", n2);
          }
        } }, { key: "_sendUploadedMessage", value: function(e3, t2) {
          var n2 = x.get(this._iid), r2 = n2.Command, i2 = n2.FileMessage, s2 = e3.fileInfo, a2 = r2.bFile(l(l({}, s2), {}, { requestId: e3.requestId, channelUrl: this.channel.url, url: s2.file, metaArrays: s2.metaArrays })), o2 = wi.getInstance(this._iid), u2 = O.get(this._iid);
          o2.getConnectionState() === o2.ConnectionState.OPEN || !o2.currentUser || o2.connecting || o2.reconnecting ? o2.sendCommand(a2, (function(e4, n3) {
            if (o2.getErrorFirstCallback()) {
              var r3 = [e4, n3];
              n3 = r3[0], e4 = r3[1];
            }
            if (n3) {
              var l2 = new i2(a2.getJsonElement());
              l2.requestedMentionUserIds = s2.mentionedUserIds, t2(n3, l2);
            } else {
              var u3 = new i2(e4.getJsonElement());
              t2(null, u3);
            }
          })) : u2.container.apiClient.sendFileMessage(l(l({ reqId: e3.requestId, channelUrl: this.channel.url, isOpenChannel: this.channel.isOpenChannel() }, s2), {}, { fileUrl: s2.file, fileName: s2.name, fileSize: s2.size, fileType: s2.type, metaArrays: s2.metaArrays }), (function(e4, n3) {
            var r3 = new i2(e4 ? a2.getJsonElement() : n3);
            e4 && (r3.requestedMentionUserIds = s2.mentionedUserIds), t2(e4, r3);
          }));
        } }, { key: "_uploadFile", value: function(e3, t2) {
          var n2 = e3.fileInfo, r2 = e3.pendingMessage;
          if ("string" != typeof n2.file && n2.file) {
            var i2 = x.get(this._iid).FileMessageQueue;
            O.get(this._iid).container.apiClient.uploadFile(l(l({}, n2), {}, { fileType: n2.type, channelUrl: this.channel.url, reqId: r2 ? r2.reqId : null }), (function(r3, s2) {
              if (r3) e3.state = i2.State.SENT, e3.error = r3, e3.response = null, t2(n2);
              else {
                var a2 = "object" === u(s2) ? s2 : JSON.parse(s2);
                n2.file = a2.url, n2.thumbnailSizes = a2.hasOwnProperty("thumbnails") ? a2.thumbnails : [], n2.requireAuth = !!a2.hasOwnProperty("require_auth") && a2.require_auth, n2.size = a2.hasOwnProperty("file_size") ? a2.file_size : n2.size, t2(n2);
              }
            }));
          } else n2.thumbnailSizes = [], n2.requireAuth = false, t2(n2);
        } }, { key: "_finalizeUpload", value: function(e3) {
          var t2 = this.uploadQueue.map((function(e4) {
            return e4.requestId;
          })).indexOf(e3);
          if (t2 > -1) {
            var n2 = this.uploadQueue.splice(t2, 1);
            n2.length > 0 && this._handleUploadQueueUpdated("remove", n2[0]);
          }
        } }, { key: "_finalizeMessage", value: function() {
          var e3 = this, t2 = O.get(this._iid), n2 = t2.container.localCacheEnabled, r2 = t2.container.isErrorFirstInCallback, i2 = wi.getInstance(this._iid), s2 = $e.of(this._iid), a2 = ot.of(this._iid), o2 = ge.of(this._iid), l2 = x.get(this._iid).FileMessageQueue, u2 = this.messageQueue[0], c2 = u2.pendingMessage;
          if (u2 && u2.state === l2.State.SENT) {
            u2.state = l2.State.DONE;
            var d2 = u2.response;
            d2 && c2 && (d2._isAutoResendRegistered = c2._isAutoResendRegistered);
            var h2 = u2.error, p2 = h2 ? new H(h2.message, h2.code) : null, f2 = u2.fileInfo.callback;
            if (d2 && !h2) {
              d2.reqId = c2.reqId, d2.requestState = i2.MessageRequestState.SUCCEEDED, d2.sendingStatus = i2.MessageSendingStatus.SUCCEEDED;
              var _2 = i2.currentUser;
              if (_2 && d2._sender && _2.userId === d2._sender.userId && (_2.nickname !== d2._sender.nickname && (_2.nickname = d2._sender.nickname), _2.plainProfileUrl !== d2._sender.plainProfileUrl && (_2.plainProfileUrl = d2._sender.plainProfileUrl)), this.channel.isGroupChannel()) return this.channel.lastMessage = d2, Object.keys(i2.channelHandlers).forEach((function(t3) {
                i2.channelHandlers[t3].onChannelChanged(e3.channel);
              })), void s2.upsert([this.channel]).then((function() {
                o2.send({ source: de.EVENT_CHANNEL_CHANGED, payload: { channel: e3.channel } });
              })).then((function() {
                return a2.removeUnsentMessages({ channelUrl: e3.channel.url, sendingStatus: i2.MessageSendingStatus.PENDING, reqIds: [d2.reqId] });
              })).then((function() {
                return a2.upsert([d2], Je.SUCCEEDED);
              })).then((function() {
                Ut._completeCurrentAndProcessNextAutoResend(i2, d2), o2.send({ source: de.EVENT_MESSAGE_SENT, payload: { channel: e3.channel, message: d2 } });
              })).catch((function(e4) {
                return J.error(e4);
              })).finally((function() {
                f2 && (f2.isPromisifyCallback || r2 ? f2(null, d2) : f2(d2, null)), e3.messageQueue.shift(), e3._handleMessageQueueUpdated("remove");
              }));
            }
            if (h2) {
              if (d2 && d2._isAutoResendRegistered && se.isAutoResendableError(h2.code)) return this.messageQueue.shift(), void this._handleMessageQueueUpdated("remove");
              if (u2.pendingMessage && (d2 = u2.pendingMessage._clone()), d2 && h2.code !== H.INVALID_PARAMETER) {
                if (d2.requestState = i2.MessageRequestState.FAILED, h2.code === H.FILE_UPLOAD_CANCEL_FAILED || h2.code === H.REQUEST_CANCELED) {
                  if (d2.sendingStatus = i2.MessageSendingStatus.CANCELED, this.channel.isGroupChannel()) return void a2.removeUnsentMessages({ channelUrl: this.channel.url, sendingStatus: i2.MessageSendingStatus.PENDING, reqIds: [d2.reqId] }).then((function() {
                    o2.send({ source: de.LOCAL_MESSAGE_CANCELED, payload: { channel: e3.channel, message: d2 } });
                  })).catch((function(e4) {
                    return J.error(e4);
                  })).finally((function() {
                    f2 && (f2.isPromisifyCallback || r2 ? f2(p2, d2) : f2(d2, p2)), e3.messageQueue.shift(), e3._handleMessageQueueUpdated("remove");
                  }));
                } else if (d2.sendingStatus = i2.MessageSendingStatus.FAILED, d2.errorCode = h2.code, d2.requestedMentionUserIds = u2.fileInfo.mentionedUserIds, h2.code === H.FILE_SIZE_LIMIT_EXCEEDED && d2._messageParams && d2._messageParams.file && (d2._messageParams.file = null), this.channel.isGroupChannel()) return void (h2.code === H.USER_NOT_MEMBER || h2.code === H.CHANNEL_NOT_FOUND ? s2.remove([this.channel.url]).then((function() {
                  return a2.removeUnsentMessages({ channelUrl: e3.channel.url, sendingStatus: i2.MessageSendingStatus.PENDING, reqIds: [d2.reqId] });
                })).then((function() {
                  o2.send({ source: de.LOCAL_MESSAGE_FAILED, payload: { channel: e3.channel, message: d2 } });
                })).catch((function(e4) {
                  return J.error(e4);
                })).finally((function() {
                  f2 && (f2.isPromisifyCallback || r2 ? f2(p2, d2) : f2(d2, p2)), e3.messageQueue.shift(), e3._handleMessageQueueUpdated("remove");
                })) : (n2 && se.isAutoResendableError(h2.code) && (d2.sendingStatus = i2.MessageSendingStatus.PENDING, d2.errorCode = 0, d2._isAutoResendRegistered = true), a2.upsert([d2], Je.UNSENT).then((function() {
                  Ut._completeCurrentAndProcessNextAutoResend(i2, d2), o2.send({ source: de.LOCAL_MESSAGE_FAILED, payload: { channel: e3.channel, message: d2 } });
                })).catch((function(e4) {
                  return J.error(e4);
                })).finally((function() {
                  var t3 = d2._clone();
                  t3.sendingStatus = i2.MessageSendingStatus.FAILED, t3.errorCode = h2.code, t3._isAutoResendRegistered = false, f2 && (f2.isPromisifyCallback || r2 ? f2(p2, t3) : f2(t3, p2)), e3.messageQueue.shift(), e3._handleMessageQueueUpdated("remove");
                }))));
              }
            }
            f2 && (f2.isPromisifyCallback || r2 ? f2(p2, d2) : f2(d2, p2)), this.messageQueue.shift(), this._handleMessageQueueUpdated("remove");
          }
        } }, { key: "addJob", value: function(e3) {
          this.messageQueue.push(e3), this._handleMessageQueueUpdated("add");
        } }, { key: "cancelUploadItemByRequestId", value: function(e3, t2) {
          this._finalizeUpload(e3);
          var n2 = this.messageQueue.map((function(e4) {
            return e4.requestId;
          })).indexOf(e3);
          if (n2 > -1) {
            var r2 = x.get(this._iid).FileMessageQueue, i2 = this.messageQueue[n2];
            !i2 || i2.state !== r2.State.UPLOADING && i2.state !== r2.State.PENDING || (i2.state = r2.State.SENT, i2.response = null, i2.error = new H("Uploading has been completed or canceled.", H.FILE_UPLOAD_CANCEL_FAILED), this._handleMessageQueueUpdated("update"));
            var s2 = r2.uploadRequest[e3];
            if (s2) return "function" == typeof s2.abort ? s2.abort() : "function" == typeof s2.cancel && s2.cancel("Upload has been canceled."), t2(null, true), true;
            t2(new H("Uploading has been completed or canceled.", H.FILE_UPLOAD_CANCEL_FAILED), false);
          } else t2(new H("Uploading has been completed or canceled.", H.FILE_UPLOAD_CANCEL_FAILED), false);
          return false;
        } }], [{ key: "State", get: function() {
          return { PENDING: "pending", UPLOADING: "uploading", UPLOADED: "uploaded", SENDING: "sending", SENT: "sent", DONE: "done" };
        } }, { key: "getByChannelUrl", value: function(e3) {
          return x.get(this._iid).FileMessageQueue.queueMap[e3];
        } }, { key: "create", value: function(e3) {
          var t2 = x.get(this._iid).FileMessageQueue;
          return t2.queueMap.hasOwnProperty(e3.url) || (t2.queueMap[e3.url] = new t2(e3)), t2.queueMap[e3.url];
        } }, { key: "delete", value: function(e3) {
          var t2 = x.get(this._iid).FileMessageQueue;
          t2.queueMap.hasOwnProperty(e3) && delete t2.queueMap[e3];
        } }, { key: "clear", value: function() {
          Ft[this._iid] = {};
        } }, { key: "queueMap", get: function() {
          return Ft[this._iid] || (Ft[this._iid] = {}), Ft[this._iid];
        } }, { key: "uploadRequest", get: function() {
          return Ht[this._iid] || (Ht[this._iid] = {}), Ht[this._iid];
        } }]), e2;
      })();
      Gt.Job = (function() {
        return h((function e2(t2) {
          var n2 = t2.fileInfo, r2 = t2.requestId, i2 = t2.pendingMessage, s2 = t2.state, a2 = t2.error, o2 = void 0 === a2 ? null : a2, l2 = t2.response, u2 = void 0 === l2 ? null : l2;
          c(this, e2), this.fileInfo = n2, this.requestId = r2, this.pendingMessage = i2, this.state = s2 || Gt.State.PENDING, this.error = o2, this.response = u2;
        }));
      })();
      var xt, jt = {}, Bt = (function() {
        function e2(e3) {
          var t2 = e3.dbname, n2 = e3.itemSizeLimit, r2 = void 0 === n2 ? 1048576 : n2, i2 = e3.cacheLimit, s2 = void 0 === i2 ? 256 : i2, a2 = e3.blockHashBase, o2 = void 0 === a2 ? 2 : a2, l2 = e3.blockHashMultiplier, u2 = void 0 === l2 ? 10 : l2, c2 = e3.blockHashConstant, d2 = void 0 === c2 ? 11 : c2, h2 = e3.transactionApplyDelay, p2 = void 0 === h2 ? 200 : h2, f2 = e3.disableLogger, _2 = void 0 !== f2 && f2;
          return jt[t2] || (this.itemSizeLimit = r2, this.cacheLimit = s2, this.blockHashBase = o2, this.blockHashMultiplier = u2, this.blockHashConstant = d2, this.transactionApplyDelay = p2, this.disableLogger = _2, jt[t2] = this), jt[t2];
        }
        return e2.get = function(e3) {
          return jt[e3];
        }, e2;
      })();
      !(function(e2) {
        e2[e2.UNKNOWN_ERROR = 6e7] = "UNKNOWN_ERROR", e2[e2.STORE_NOT_DEFINED = 61001e3] = "STORE_NOT_DEFINED", e2[e2.STORE_NOT_AVAILABLE = 61001001] = "STORE_NOT_AVAILABLE", e2[e2.STORE_NOT_AVAILABLE_IN_PRIVATE_BROWSING = 61001002] = "STORE_NOT_AVAILABLE_IN_PRIVATE_BROWSING", e2[e2.STORE_IS_FULL = 61001003] = "STORE_IS_FULL", e2[e2.STORE_INVALID_KEY_TYPE = 61002e3] = "STORE_INVALID_KEY_TYPE", e2[e2.STORE_BROKEN_INTEGRITY = 61002001] = "STORE_BROKEN_INTEGRITY", e2[e2.STORE_BROKEN_BLOB = 61002002] = "STORE_BROKEN_BLOB", e2[e2.STORE_ENCRYPTION_INVALID = 61002003] = "STORE_ENCRYPTION_INVALID", e2[e2.STORE_ITEM_SIZE_LIMIT_EXCEEDED = 61017e3] = "STORE_ITEM_SIZE_LIMIT_EXCEEDED", e2[e2.STORE_READ_FAILED = 61017001] = "STORE_READ_FAILED", e2[e2.STORE_WRITE_FAILED = 61017002] = "STORE_WRITE_FAILED", e2[e2.DATABASE_SCHEMA_NOT_ON_UPGRADE = 62002e3] = "DATABASE_SCHEMA_NOT_ON_UPGRADE", e2[e2.COLLECTION_NOT_READY = 63001e3] = "COLLECTION_NOT_READY", e2[e2.COLLECTION_KEY_NOT_MATCH = 63002e3] = "COLLECTION_KEY_NOT_MATCH", e2[e2.COLLECTION_QUERY_NOT_VALID = 63002001] = "COLLECTION_QUERY_NOT_VALID", e2[e2.COLLECTION_KEY_NOT_FOUND = 63004e3] = "COLLECTION_KEY_NOT_FOUND", e2[e2.COLLECTION_KEY_NOT_GIVEN = 63004001] = "COLLECTION_KEY_NOT_GIVEN", e2[e2.COLLECTION_INSERT_DUPLICATE = 63009e3] = "COLLECTION_INSERT_DUPLICATE", e2[e2.COLLECTION_WRITE_FAILED = 63017e3] = "COLLECTION_WRITE_FAILED", e2[e2.COLLECTION_ITEM_SIZE_LIMIT_EXCEEDED = 63017001] = "COLLECTION_ITEM_SIZE_LIMIT_EXCEEDED", e2[e2.INDEX_TABLE_IS_REQUIRED = 65001e3] = "INDEX_TABLE_IS_REQUIRED", e2[e2.INDEX_TYPE_NOT_MATCH = 65002e3] = "INDEX_TYPE_NOT_MATCH", e2[e2.COMPARE_TYPE_NOT_MATCH = 69002001] = "COMPARE_TYPE_NOT_MATCH", e2[e2.CIRCULAR_REFERENCE_FOUND = 69002002] = "CIRCULAR_REFERENCE_FOUND";
      })(xt || (xt = {}));
      var Vt, qt = (function(e2) {
        function t2(n2) {
          var r2 = n2.code, i2 = void 0 === r2 ? xt.UNKNOWN_ERROR : r2, s2 = n2.message, a2 = void 0 === s2 ? "Unknown error occurred." : s2, o2 = e2.call(this, a2) || this;
          return o2.code = i2, Object.setPrototypeOf(o2, t2.prototype), o2;
        }
        return k(t2, e2), Object.defineProperty(t2, "storeNotDefined", { get: function() {
          return new t2({ code: xt.STORE_NOT_DEFINED, message: "Store is not defined. Specify the store on NestDB()" });
        }, enumerable: false, configurable: true }), Object.defineProperty(t2, "storeNotAvailable", { get: function() {
          return new t2({ code: xt.STORE_NOT_AVAILABLE, message: "Store is not available. Check your environment settings." });
        }, enumerable: false, configurable: true }), Object.defineProperty(t2, "storeNotAvailableInPrivateBrowsing", { get: function() {
          return new t2({ code: xt.STORE_NOT_AVAILABLE_IN_PRIVATE_BROWSING, message: "Store is not available because it is in private browsing." });
        }, enumerable: false, configurable: true }), Object.defineProperty(t2, "storeIsFull", { get: function() {
          return new t2({ code: xt.STORE_IS_FULL, message: "Store is full." });
        }, enumerable: false, configurable: true }), Object.defineProperty(t2, "storeKeyTypeIsInvalid", { get: function() {
          return new t2({ code: xt.STORE_INVALID_KEY_TYPE, message: "Store key should be string type." });
        }, enumerable: false, configurable: true }), Object.defineProperty(t2, "storeBrokenIntegrity", { get: function() {
          return new t2({ code: xt.STORE_BROKEN_INTEGRITY, message: "Data should be in a store but it does not. Integrity is broken." });
        }, enumerable: false, configurable: true }), Object.defineProperty(t2, "storeBrokenBlob", { get: function() {
          return new t2({ code: xt.STORE_BROKEN_BLOB, message: "Data should be in a store but it does not. Blob data is broken." });
        }, enumerable: false, configurable: true }), Object.defineProperty(t2, "storeEncryptionInvalid", { get: function() {
          return new t2({ code: xt.STORE_ENCRYPTION_INVALID, message: "Encryption algorithm has changed. All the store should reset." });
        }, enumerable: false, configurable: true }), Object.defineProperty(t2, "storeItemSizeExceeded", { get: function() {
          return new t2({ code: xt.STORE_ITEM_SIZE_LIMIT_EXCEEDED, message: "The size of the item exceeds the limit that the store allows." });
        }, enumerable: false, configurable: true }), Object.defineProperty(t2, "storeReadFailed", { get: function() {
          return new t2({ code: xt.STORE_READ_FAILED, message: "Failed to read from store." });
        }, enumerable: false, configurable: true }), Object.defineProperty(t2, "storeWriteFailed", { get: function() {
          return new t2({ code: xt.STORE_WRITE_FAILED, message: "Failed to write to store." });
        }, enumerable: false, configurable: true }), Object.defineProperty(t2, "databaseSchemaNotOnUpgrade", { get: function() {
          return new t2({ code: xt.DATABASE_SCHEMA_NOT_ON_UPGRADE, message: "Committing schema is not allowed when upgrade is not running." });
        }, enumerable: false, configurable: true }), Object.defineProperty(t2, "collectionNotReady", { get: function() {
          return new t2({ code: xt.COLLECTION_NOT_READY, message: "Collection is not ready due to an error during initialization." });
        }, enumerable: false, configurable: true }), Object.defineProperty(t2, "collectionKeyNotMatch", { get: function() {
          return new t2({ code: xt.COLLECTION_KEY_NOT_MATCH, message: "keyName of collection could not change." });
        }, enumerable: false, configurable: true }), Object.defineProperty(t2, "collectionQueryNotValid", { get: function() {
          return new t2({ code: xt.COLLECTION_QUERY_NOT_VALID, message: "Query parameter is not a valid format." });
        }, enumerable: false, configurable: true }), Object.defineProperty(t2, "collectionInsertDuplicate", { get: function() {
          return new t2({ code: xt.COLLECTION_INSERT_DUPLICATE, message: "The key already exists." });
        }, enumerable: false, configurable: true }), Object.defineProperty(t2, "collectionKeyNotFound", { get: function() {
          return new t2({ code: xt.COLLECTION_KEY_NOT_FOUND, message: "The key is not found." });
        }, enumerable: false, configurable: true }), Object.defineProperty(t2, "collectionKeyNotGiven", { get: function() {
          return new t2({ code: xt.COLLECTION_KEY_NOT_GIVEN, message: "The item should contain [keyName] property." });
        }, enumerable: false, configurable: true }), Object.defineProperty(t2, "collectionWriteFailed", { get: function() {
          return new t2({ code: xt.COLLECTION_WRITE_FAILED, message: "Failed to write an item." });
        }, enumerable: false, configurable: true }), Object.defineProperty(t2, "collectionItemSizeExceeded", { get: function() {
          return new t2({ code: xt.COLLECTION_ITEM_SIZE_LIMIT_EXCEEDED, message: "The size of the item exceeds the limit that a collection allows." });
        }, enumerable: false, configurable: true }), Object.defineProperty(t2, "indexTableIsRequired", { get: function() {
          return new t2({ code: xt.INDEX_TABLE_IS_REQUIRED, message: "Index table is required." });
        }, enumerable: false, configurable: true }), Object.defineProperty(t2, "indexTypesNotMatch", { get: function() {
          return new t2({ code: xt.INDEX_TYPE_NOT_MATCH, message: "Indexed column should have primitive type." });
        }, enumerable: false, configurable: true }), Object.defineProperty(t2, "compareTypesNotMatch", { get: function() {
          return new t2({ code: xt.COMPARE_TYPE_NOT_MATCH, message: "Values to compare have different types." });
        }, enumerable: false, configurable: true }), Object.defineProperty(t2, "circularReferenceFound", { get: function() {
          return new t2({ code: xt.CIRCULAR_REFERENCE_FOUND, message: "Cannot handle circular referenced object." });
        }, enumerable: false, configurable: true }), t2;
      })(Error);
      !(function(e2) {
        e2.INIT = "init", e2.READY = "ready", e2.CLOSED = "closed";
      })(Vt || (Vt = {}));
      var Kt, zt = function(e2, t2) {
        if (void 0 === t2 && (t2 = /* @__PURE__ */ new WeakMap()), "object" == typeof e2 && null !== e2) {
          if (t2.has(e2)) throw qt.circularReferenceFound;
          t2.set(e2, true);
          var n2 = null;
          if (Array.isArray(e2)) n2 = e2.map((function(e3) {
            return zt(e3, t2);
          }));
          else if (e2 instanceof RegExp) n2 = e2;
          else if (e2 instanceof Date) n2 = e2;
          else for (var r2 in n2 = {}, e2) n2[r2] = zt(e2[r2], t2);
          return t2.delete(e2), n2;
        }
        return e2;
      }, Yt = function(e2, t2) {
        if (null == t2) return 1;
        if (null == e2) return -1;
        if (typeof e2 != typeof t2) throw qt.compareTypesNotMatch;
        var n2 = 0;
        switch (typeof e2) {
          case "boolean":
          case "number":
            n2 = e2 - t2;
            break;
          case "string":
            n2 = e2.localeCompare(t2);
        }
        return n2;
      }, Qt = function(e2, t2) {
        for (var n2 = 0, r2 = 0; r2 < e2.length; r2++) n2 = e2.charCodeAt(r2) + (n2 << 6) + (n2 << 16) - n2;
        return (n2 >>> 0) % t2;
      }, Wt = function(e2) {
        return new Promise((function(t2) {
          setTimeout((function() {
            return t2();
          }), e2);
        }));
      }, Jt = function(e2, t2) {
        if (!t2) return false;
        if ("function" != typeof e2) {
          for (var n2 in e2) {
            if (["/and", "&&"].includes(n2)) {
              if (e2[n2].some((function(e3) {
                return !Jt(e3, t2);
              }))) return false;
            } else if (["/or", "||"].includes(n2)) {
              if (e2[n2].every((function(e3) {
                return !Jt(e3, t2);
              }))) return false;
            } else if ("/where" === n2) {
              if (!(0, e2[n2])(t2)) return false;
            } else {
              var r2 = n2;
              if ("object" == typeof e2[r2]) {
                var i2 = e2[r2];
                for (var s2 in i2) switch (s2) {
                  case "/eq":
                  case "=":
                    if ((a2 = t2[r2]) !== (o2 = i2[s2])) return false;
                    break;
                  case "/neq":
                  case "!=":
                    if ((a2 = t2[r2]) === (o2 = i2[s2])) return false;
                    break;
                  case "/gt":
                  case ">":
                    var a2 = t2[r2], o2 = i2[s2];
                    if (!(Yt(a2, o2) > 0)) return false;
                    break;
                  case "/gte":
                  case ">=":
                    a2 = t2[r2], o2 = i2[s2];
                    if (!(Yt(a2, o2) >= 0)) return false;
                    break;
                  case "/lt":
                  case "<":
                    a2 = t2[r2], o2 = i2[s2];
                    if (!(Yt(a2, o2) < 0)) return false;
                    break;
                  case "/lte":
                  case "<=":
                    a2 = t2[r2], o2 = i2[s2];
                    if (!(Yt(a2, o2) <= 0)) return false;
                    break;
                  case "/in":
                    a2 = t2[r2];
                    if (!(o2 = i2[s2]).includes(a2)) return false;
                    break;
                  case "/nin":
                    a2 = t2[r2];
                    if ((o2 = i2[s2]).includes(a2)) return false;
                    break;
                  case "/contain":
                    a2 = t2[r2], o2 = i2[s2];
                    if (!a2.includes(o2)) return false;
                    break;
                  case "/regex":
                    a2 = t2[r2];
                    if (!(o2 = i2[s2]).test(a2)) return false;
                    break;
                  case "/where":
                    a2 = t2[r2];
                    if (!(0, i2[s2])(a2)) return false;
                }
              } else if ("function" == typeof e2[r2]) {
                if (!e2[r2](t2[r2])) return false;
              } else if (e2[r2] !== t2[r2]) return false;
            }
          }
          return true;
        }
        return e2(t2);
      }, Xt = function() {
      }, Zt = function() {
        return Promise.resolve();
      }, $t = function(e2) {
        return e2;
      }, en = function(e2, t2) {
        t2(null);
      };
      !(function(e2) {
        e2[e2.FORWARD = 0] = "FORWARD", e2[e2.BACKWARD = 1] = "BACKWARD";
      })(Kt || (Kt = {}));
      var tn, nn, rn, sn = (function() {
        function e2(e3) {
          var t2 = e3.initialPrevValue, n2 = void 0 === t2 ? null : t2, r2 = e3.initialNextValue, i2 = void 0 === r2 ? null : r2, s2 = e3.iterator, a2 = e3.map, o2 = void 0 === a2 ? $t : a2, l2 = e3.backward, u2 = void 0 === l2 ? Zt : l2, c2 = e3.forward, d2 = void 0 === c2 ? Zt : c2, h2 = e3.complete, p2 = void 0 === h2 ? Xt : h2;
          this._prevValue = n2, this._nextValue = i2, this._error = null, this._map = o2, this._backward = u2, this._forward = d2, this._iterator = s2, this._complete = p2;
        }
        return Object.defineProperty(e2.prototype, "prevValue", { get: function() {
          return this._map(this._prevValue);
        }, enumerable: false, configurable: true }), Object.defineProperty(e2.prototype, "nextValue", { get: function() {
          return this._map(this._nextValue);
        }, enumerable: false, configurable: true }), Object.defineProperty(e2.prototype, "error", { get: function() {
          return this._error;
        }, enumerable: false, configurable: true }), Object.defineProperty(e2.prototype, "hasPrevious", { get: function() {
          return !!this._prevValue;
        }, enumerable: false, configurable: true }), Object.defineProperty(e2.prototype, "hasNext", { get: function() {
          return !!this._nextValue;
        }, enumerable: false, configurable: true }), e2.prototype.prev = function() {
          return L(this, void 0, void 0, (function() {
            var e3, t2, n2;
            return w(this, (function(r2) {
              switch (r2.label) {
                case 0:
                  if (!this.hasPrevious) return [3, 6];
                  r2.label = 1;
                case 1:
                  return r2.trys.push([1, 3, , 4]), e3 = this._prevValue, t2 = this, [4, this._backward()];
                case 2:
                  return t2._prevValue = r2.sent() || null, this._nextValue = e3, [3, 4];
                case 3:
                  return n2 = r2.sent(), this._error = n2, [3, 4];
                case 4:
                  return [4, this._iterator(this)];
                case 5:
                  return [2, r2.sent()];
                case 6:
                  this._complete(), r2.label = 7;
                case 7:
                  return [2];
              }
            }));
          }));
        }, e2.prototype.next = function() {
          return L(this, void 0, void 0, (function() {
            var e3, t2, n2;
            return w(this, (function(r2) {
              switch (r2.label) {
                case 0:
                  if (!this.hasNext) return [3, 6];
                  r2.label = 1;
                case 1:
                  return r2.trys.push([1, 3, , 4]), e3 = this._nextValue, t2 = this, [4, this._forward()];
                case 2:
                  return t2._nextValue = r2.sent() || null, this._prevValue = e3, [3, 4];
                case 3:
                  return n2 = r2.sent(), this._error = n2, [3, 4];
                case 4:
                  return [4, this._iterator(this)];
                case 5:
                  return [2, r2.sent()];
                case 6:
                  this._complete(), r2.label = 7;
                case 7:
                  return [2];
              }
            }));
          }));
        }, e2.prototype.stop = function() {
          this._prevValue = null, this._nextValue = null, this._complete();
        }, e2;
      })(), an = (function() {
        function e2(e3) {
          var t2 = e3.condition, n2 = void 0 === t2 ? {} : t2, r2 = e3.backward, i2 = void 0 !== r2 && r2, s2 = e3.blockManager, a2 = e3.indexer;
          this.condition = n2, this.backward = i2, this._blockManager = s2, this._indexer = a2;
        }
        return e2.prototype.findOptimizedStartPosition = function() {
          var e3 = this, t2 = ["=", "/eq", ">", ">=", "/gt", "/gte"], n2 = ["=", "/eq", "<", "<=", "/lt", "/lte"];
          if (this.backward) {
            var r2 = this._indexer.origin.length - 1;
            if ("function" != typeof this.condition) for (var i2 in this._indexer.fields) {
              var s2 = this._indexer.fields[i2], a2 = 1;
              if ("-" === s2[0] && (s2 = s2.slice(1), a2 = -1), this.condition[s2]) {
                if ("object" == typeof this.condition[s2]) {
                  var o2 = a2 > 0 ? n2 : t2;
                  for (var l2 in this.condition[s2]) if (o2.includes(l2)) {
                    for (var u2 = r2; u2 >= 0; u2--) if (a2 * Yt(this._indexer.origin[u2].columnValues[i2], this.condition[s2][l2]) <= 0) {
                      r2 = u2;
                      break;
                    }
                  }
                } else for (u2 = r2; u2 >= 0; u2--) if (a2 * Yt(this._indexer.origin[u2].columnValues[i2], this.condition[s2]) <= 0) {
                  r2 = u2;
                  break;
                }
              }
            }
            return Math.min(r2 + 1, this._indexer.origin.length - 1);
          }
          var c2 = 0;
          if ("function" != typeof this.condition) for (var d2 = function(r3) {
            var i3 = h2._indexer.fields[r3], s3 = 1;
            if ("-" === i3[0] && (i3 = i3.slice(1), s3 = -1), h2.condition[i3]) {
              if ("object" == typeof h2.condition[i3]) Object.keys(h2.condition[i3]).forEach((function(a4) {
                if ((s3 > 0 ? t2 : n2).includes(a4)) {
                  for (var o3 = c2; o3 < e3._indexer.origin.length; o3++) if (s3 * Yt(e3._indexer.origin[o3].columnValues[r3], e3.condition[i3][a4]) >= 0) {
                    c2 = o3;
                    break;
                  }
                }
              }));
              else for (var a3 = c2; a3 < h2._indexer.origin.length; a3++) if (s3 * Yt(h2._indexer.origin[a3].columnValues[r3], h2.condition[i3]) >= 0) {
                c2 = a3;
                break;
              }
            }
          }, h2 = this, i2 = 0; i2 < this._indexer.fields.length; i2++) d2(i2);
          return Math.max(c2 - 1, 0);
        }, e2.prototype.each = function(e3) {
          return L(this, void 0, void 0, (function() {
            var t2, n2, r2, i2, s2, a2, o2, l2 = this;
            return w(this, (function(u2) {
              switch (u2.label) {
                case 0:
                  if (t2 = this.findOptimizedStartPosition(), n2 = 0, this.backward && this._indexer.origin[t2] && (n2 = this._indexer.origin[t2].keys.length - 1), r2 = function() {
                    if (l2._indexer.origin[t2]) {
                      if (!l2._indexer.origin[t2].keys[++n2]) {
                        if (!l2._indexer.origin[++t2]) return false;
                        n2 = 0;
                      }
                      return true;
                    }
                    return false;
                  }, i2 = function() {
                    if (l2._indexer.origin[t2]) {
                      if (!l2._indexer.origin[t2].keys[--n2]) {
                        if (!l2._indexer.origin[--t2]) return false;
                        n2 = l2._indexer.origin[t2].keys.length - 1;
                      }
                      return true;
                    }
                    return false;
                  }, s2 = null, !this._indexer.origin[t2]) return [3, 4];
                  a2 = this.backward ? i2 : r2, u2.label = 1;
                case 1:
                  return [4, this._blockManager.getFromBlock(this._indexer.origin[t2].keys[n2])];
                case 2:
                  if (o2 = u2.sent(), Jt(this.condition, o2)) return s2 = o2, [3, 4];
                  u2.label = 3;
                case 3:
                  if (a2()) return [3, 1];
                  u2.label = 4;
                case 4:
                  return [4, new Promise((function(a3) {
                    var o3 = new sn({ initialNextValue: zt(s2), iterator: e3, forward: function() {
                      return L(l2, void 0, void 0, (function() {
                        var e4, s3;
                        return w(this, (function(a4) {
                          switch (a4.label) {
                            case 0:
                              e4 = this.backward ? i2 : r2, a4.label = 1;
                            case 1:
                              return e4() ? [4, this._blockManager.getFromBlock(this._indexer.origin[t2].keys[n2])] : [3, 3];
                            case 2:
                              return s3 = a4.sent(), Jt(this.condition, s3) ? [2, zt(s3)] : [3, 1];
                            case 3:
                              return [2, null];
                          }
                        }));
                      }));
                    }, backward: function() {
                      return L(l2, void 0, void 0, (function() {
                        var e4, s3;
                        return w(this, (function(a4) {
                          switch (a4.label) {
                            case 0:
                              e4 = this.backward ? r2 : i2, a4.label = 1;
                            case 1:
                              return e4() ? [4, this._blockManager.getFromBlock(this._indexer.origin[t2].keys[n2])] : [3, 3];
                            case 2:
                              return s3 = a4.sent(), Jt(this.condition, s3) ? [2, zt(s3)] : [3, 1];
                            case 3:
                              return [2, null];
                          }
                        }));
                      }));
                    }, complete: a3 });
                    e3(o3);
                  }))];
                case 5:
                  return [2, u2.sent()];
              }
            }));
          }));
        }, e2;
      })(), on = (function() {
        function e2(e3) {
          var t2 = e3.condition, n2 = void 0 === t2 ? {} : t2, r2 = e3.backward, i2 = void 0 !== r2 && r2, s2 = e3.mutex, a2 = e3.blockManager, o2 = e3.indexer;
          this._mutex = s2, this._iterator = new an({ condition: n2, backward: i2, blockManager: a2, indexer: o2 });
        }
        return e2.prototype.fetch = function(e3) {
          return void 0 === e3 && (e3 = {}), L(this, void 0, void 0, (function() {
            var t2, n2, r2, i2, s2 = this;
            return w(this, (function(a2) {
              switch (a2.label) {
                case 0:
                  if (t2 = Math.max(e3.offset || 0, 0), 0 === (n2 = "number" == typeof e3.limit ? e3.limit : Number.MAX_SAFE_INTEGER)) return [2, []];
                  if (n2 < 0) throw qt.collectionQueryNotValid;
                  a2.label = 1;
                case 1:
                  return a2.trys.push([1, 4, , 5]), r2 = [], [4, this._mutex.lock()];
                case 2:
                  return a2.sent(), [4, this._iterator.each((function(e4) {
                    return L(s2, void 0, void 0, (function() {
                      return w(this, (function(i3) {
                        return e4.error ? e4.stop() : e4.hasNext ? 0 === t2 ? (r2.push(e4.nextValue), 0 < n2 && n2 <= r2.length ? e4.stop() : e4.next()) : (t2--, e4.next()) : e4.stop(), [2];
                      }));
                    }));
                  }))];
                case 3:
                  return a2.sent(), this._mutex.unlock(), [2, r2];
                case 4:
                  throw i2 = a2.sent(), this._mutex.unlock(), i2;
                case 5:
                  return [2];
              }
            }));
          }));
        }, e2.prototype.count = function() {
          return L(this, void 0, void 0, (function() {
            var e3, t2, n2 = this;
            return w(this, (function(r2) {
              switch (r2.label) {
                case 0:
                  return r2.trys.push([0, 3, , 4]), e3 = 0, [4, this._mutex.lock()];
                case 1:
                  return r2.sent(), [4, this._iterator.each((function(t3) {
                    return L(n2, void 0, void 0, (function() {
                      return w(this, (function(n3) {
                        return t3.error ? t3.stop() : t3.hasNext ? (e3++, t3.next()) : t3.stop(), [2];
                      }));
                    }));
                  }))];
                case 2:
                  return r2.sent(), this._mutex.unlock(), [2, e3];
                case 3:
                  throw t2 = r2.sent(), this._mutex.unlock(), t2;
                case 4:
                  return [2];
              }
            }));
          }));
        }, e2;
      })(), ln = function(e2) {
        return "".concat("nest", "@").concat(e2);
      }, un = function(e2, t2) {
        return "".concat(ln(e2), "/").concat(t2);
      }, cn = function(e2, t2) {
        return "".concat(un(e2, t2), ".metadata");
      }, dn = function(e2, t2) {
        return "".concat(un(e2, t2), "/block.");
      }, hn = function(e2, t2) {
        return "".concat(un(e2, t2), "/blob.");
      }, pn = function(e2, t2, n2, r2) {
        return void 0 === r2 && (r2 = 0), "".concat(hn(e2, t2)).concat(n2, ".").concat(r2);
      }, fn = (function() {
        function e2(e3) {
          var t2 = e3.dbname, n2 = e3.collectionName, r2 = e3.store;
          this.dbname = t2, this.collectionName = n2, this._store = r2;
        }
        return e2.prototype._makeShards = function(e3, t2) {
          var n2 = Math.max(this._store.itemSizeLimit - 1024, 0);
          if (n2 > 0) {
            for (var r2 = Math.ceil(e3.data.length / n2), i2 = "".concat(r2, ".").concat(e3.type, ".").concat(t2), s2 = [], a2 = 0; a2 < e3.data.length; a2 += n2) {
              var o2 = e3.data.slice(a2, a2 + n2);
              s2.push(o2);
            }
            return { blobId: i2, shards: s2 };
          }
          return { blobId: null, shards: null };
        }, e2.prototype._encode = function(e3) {
          return L(this, void 0, void 0, (function() {
            return w(this, (function(t2) {
              switch (t2.label) {
                case 0:
                  return [4, new Promise((function(t3) {
                    var n2 = new FileReader();
                    n2.onload = function() {
                      t3({ data: n2.result, type: e3.type });
                    }, n2.readAsDataURL(e3);
                  }))];
                case 1:
                  return [2, t2.sent()];
              }
            }));
          }));
        }, e2.prototype._decode = function(e3) {
          return L(this, void 0, void 0, (function() {
            var t2, n2, r2, i2, s2, a2;
            return w(this, (function(o2) {
              switch (o2.label) {
                case 0:
                  return "undefined" == typeof fetch ? [3, 3] : [4, fetch(e3.data)];
                case 1:
                  return [4, o2.sent().blob()];
                case 2:
                  return [2, o2.sent()];
                case 3:
                  for (512, t2 = [], n2 = atob(e3.data.split(",")[1]), r2 = 0; r2 < n2.length; r2 += 512) {
                    for (i2 = n2.slice(r2, r2 + 512), s2 = new Array(i2.length), a2 = 0; a2 < i2.length; a2++) s2[a2] = i2.charCodeAt(a2);
                    t2.push(new Uint8Array(s2));
                  }
                  return [2, new Blob(t2, { type: e3.type })];
              }
            }));
          }));
        }, e2.prototype.get = function(e3) {
          return L(this, void 0, void 0, (function() {
            var t2, n2, r2, i2, s2, a2, o2, l2;
            return w(this, (function(u2) {
              switch (u2.label) {
                case 0:
                  if (t2 = [], n2 = e3.split("."), r2 = n2[0], i2 = n2[1], !((s2 = parseInt(r2)) > 0)) return [3, 6];
                  a2 = 0, u2.label = 1;
                case 1:
                  return a2 < s2 ? (o2 = pn(this.dbname, this.collectionName, e3, a2), [4, this._store.get(o2)]) : [3, 4];
                case 2:
                  if (!(l2 = u2.sent()) || !l2.d) throw qt.storeBrokenBlob;
                  t2.push(l2.d), u2.label = 3;
                case 3:
                  return a2++, [3, 1];
                case 4:
                  return [4, this._decode({ data: t2.join(""), type: i2 })];
                case 5:
                  return [2, u2.sent()];
                case 6:
                  return [2, null];
              }
            }));
          }));
        }, e2.prototype.save = function(e3, t2) {
          return void 0 === t2 && (t2 = "".concat(Date.now())), L(this, void 0, void 0, (function() {
            var n2, r2, i2, s2, a2, o2, l2;
            return w(this, (function(u2) {
              switch (u2.label) {
                case 0:
                  return n2 = [], [4, this._encode(e3)];
                case 1:
                  if (r2 = u2.sent(), i2 = this._makeShards(r2, t2), s2 = i2.blobId, a2 = i2.shards, !s2) return [3, 3];
                  for (o2 = 0; o2 < a2.length; o2++) l2 = pn(this.dbname, this.collectionName, s2, o2), n2.push({ key: l2, value: { d: a2[o2] }, generation: 1 });
                  return [4, this._store.setMany(n2)];
                case 2:
                  if (u2.sent().some((function(e4) {
                    return e4 instanceof Error;
                  }))) throw qt.storeWriteFailed;
                  return [2, s2];
                case 3:
                  return [2, null];
              }
            }));
          }));
        }, e2.prototype.remove = function(e3) {
          return L(this, void 0, void 0, (function() {
            var t2, n2, r2, i2;
            return w(this, (function(s2) {
              switch (s2.label) {
                case 0:
                  if (t2 = [], n2 = e3.split(".")[0], !((r2 = parseInt(n2)) > 0)) return [3, 2];
                  for (i2 = 0; i2 < r2; i2++) t2.push(pn(this.dbname, this.collectionName, e3, i2));
                  return [4, this._store.removeMany(t2)];
                case 1:
                  s2.sent(), s2.label = 2;
                case 2:
                  return [2];
              }
            }));
          }));
        }, e2.prototype.clear = function() {
          return L(this, void 0, void 0, (function() {
            var e3, t2, n2, r2, i2, s2;
            return w(this, (function(a2) {
              switch (a2.label) {
                case 0:
                  return e3 = hn(this.dbname, this.collectionName), t2 = [], [4, this._store.getAllKeys()];
                case 1:
                  for (n2 = a2.sent(), r2 = 0, i2 = n2; r2 < i2.length; r2++) (s2 = i2[r2]).startsWith(e3) && t2.push(s2);
                  return [4, this._store.removeMany(n2)];
                case 2:
                  return a2.sent(), [2];
              }
            }));
          }));
        }, e2;
      })();
      !(function(e2) {
        e2[e2.COMMIT = 0] = "COMMIT", e2[e2.WRITE = 1] = "WRITE", e2[e2.ERROR = 2] = "ERROR";
      })(tn || (tn = {})), (function(e2) {
        e2.PENDING = "pending", e2.PERSISTENT = "persistent", e2.VOLATILE = "volatile";
      })(nn || (nn = {})), (function(e2) {
        e2[e2.NO_CACHE = 0] = "NO_CACHE", e2[e2.DEFAULT = 1] = "DEFAULT", e2[e2.PERSISTENT = 2] = "PERSISTENT";
      })(rn || (rn = {}));
      var _n = [nn.PENDING, nn.VOLATILE], gn = {}, yn = (function() {
        function e2(e3) {
          var t2 = e3.dbname, n2 = e3.limit, r2 = void 0 === n2 ? 256 : n2;
          return gn[t2] || (this.dbname = t2, this._items = [], this._limit = r2, gn[t2] = this), gn[t2];
        }
        return e2.get = function(e3) {
          return gn[e3];
        }, Object.defineProperty(e2.prototype, "items", { get: function() {
          return this._items;
        }, enumerable: false, configurable: true }), e2.prototype.find = function(e3, t2, n2) {
          return void 0 === n2 && (n2 = rn.DEFAULT), L(this, void 0, void 0, (function() {
            var r2, i2;
            return w(this, (function(s2) {
              switch (s2.label) {
                case 0:
                  return (r2 = this.get(t2)) ? [3, 2] : [4, e3.get(t2)];
                case 1:
                  return (i2 = s2.sent()) && (r2 = { key: t2, value: i2, generation: 1, state: n2 === rn.PERSISTENT ? nn.PERSISTENT : nn.VOLATILE }, this.put(r2)), [3, 3];
                case 2:
                  n2 === rn.PERSISTENT && (r2.state = nn.PERSISTENT), s2.label = 3;
                case 3:
                  return [2, r2];
              }
            }));
          }));
        }, e2.prototype.get = function(e3, t2) {
          void 0 === t2 && (t2 = rn.DEFAULT);
          var n2 = this._items.map((function(e4) {
            return e4.key;
          })).indexOf(e3);
          if (n2 > -1) {
            var r2 = this._items[n2];
            return t2 === rn.PERSISTENT && (r2.state = nn.PERSISTENT), t2 !== rn.NO_CACHE && this.put(r2), r2;
          }
          return null;
        }, e2.prototype.put = function(e3) {
          if (this._limit > 0) {
            var t2 = this._items.map((function(e4) {
              return e4.key;
            })).indexOf(e3.key);
            if (t2 > -1) _n.includes(this._items[t2].state) && _n.includes(e3.state) ? (this._items.splice(t2, 1), this._items.push(e3)) : (this._items[t2].state = e3.state, this._items[t2].generation = e3.generation, this._items[t2].value = e3.value);
            else {
              this._items.push(e3);
              var n2 = this._items.filter((function(e4) {
                return e4.state === nn.VOLATILE;
              })), r2 = n2.length - this._limit;
              if (r2 > 0) {
                for (var i2 = [], s2 = 0, a2 = this._items; s2 < a2.length; s2++) {
                  var o2 = a2[s2];
                  o2.state === nn.VOLATILE && r2 > 0 ? r2-- : i2.push(o2);
                }
                this._items = i2;
              }
            }
          }
        }, e2.prototype.remove = function(e3) {
          var t2 = this._items.map((function(e4) {
            return e4.key;
          })).indexOf(e3);
          t2 > -1 && this._items.splice(t2, 1);
        }, e2.prototype.clearByCondition = function(e3) {
          this._items = this._items.filter((function(t2) {
            return !e3(t2);
          }));
        }, e2.prototype.clear = function(e3) {
          void 0 === e3 && (e3 = false), this._items = e3 ? [] : this._items.filter((function(e4) {
            return e4.state !== nn.VOLATILE;
          }));
        }, e2;
      })(), mn = (function() {
        function e2(e3) {
          var t2 = e3.dbname, n2 = e3.collectionName, r2 = e3.store;
          this._metadata = null, this._requests = [], this._onCommit = /* @__PURE__ */ new Map(), this._onWrite = /* @__PURE__ */ new Map(), this._onError = /* @__PURE__ */ new Map(), this.dbname = t2, this.collectionName = n2, this.metadataKey = (function(e4, t3) {
            return "".concat(un(e4, t3), "/trans.metadata");
          })(t2, n2), this.recordsetKey = (function(e4, t3) {
            return "".concat(un(e4, t3), "/trans.recordset");
          })(t2, n2), this._store = r2;
        }
        return Object.defineProperty(e2.prototype, "generation", { get: function() {
          return this._metadata ? this._metadata.generation : 0;
        }, enumerable: false, configurable: true }), Object.defineProperty(e2.prototype, "requestCount", { get: function() {
          return this._requests.length;
        }, enumerable: false, configurable: true }), e2.prototype._getReducedRecordset = function(e3) {
          return void 0 === e3 && (e3 = []), L(this, void 0, void 0, (function() {
            var t2;
            return w(this, (function(n2) {
              switch (n2.label) {
                case 0:
                  return [4, this._store.get(this.recordsetKey)];
                case 1:
                  return (t2 = n2.sent() || []).push.apply(t2, e3), [2, this._reduceRecordSet(t2)];
              }
            }));
          }));
        }, e2.prototype._reduceRecordSet = function(e3) {
          for (var t2 = [], n2 = {}, r2 = e3.length - 1; r2 >= 0; r2--) {
            for (var i2 = e3[r2], s2 = [], a2 = i2.requests.length - 1; a2 >= 0; a2--) {
              var o2 = i2.requests[a2], l2 = o2.data;
              n2[l2.key] || (s2.unshift(o2), n2[l2.key] = true);
            }
            s2.length > 0 && (i2.requests = s2, t2.unshift(i2));
          }
          return t2;
        }, e2.prototype._applyRecord = function(e3, t2) {
          return L(this, void 0, void 0, (function() {
            var n2, r2, i2, s2, a2, o2, l2, u2, c2;
            return w(this, (function(d2) {
              switch (d2.label) {
                case 0:
                  n2 = yn.get(this.dbname), r2 = t2.generation, i2 = t2.requests, s2 = null, d2.label = 1;
                case 1:
                  return d2.trys.push([1, 3, , 4]), [4, this._store.setMany(i2.map((function(e4) {
                    return R(R({}, e4.data), { generation: r2 });
                  })))];
                case 2:
                  for (a2 = d2.sent(), o2 = 0; o2 < i2.length; o2++) a2[o2] instanceof Error && (s2 || (s2 = a2[o2]), l2 = i2[o2].data, n2.put(R(R({}, l2), { generation: r2, state: nn.PERSISTENT })));
                  return [3, 4];
                case 3:
                  return u2 = d2.sent(), s2 = u2, [3, 4];
                case 4:
                  return s2 ? [3, 6] : (c2 = e3.filter((function(e4) {
                    return e4.generation !== r2;
                  })), [4, this._store.set({ key: this.recordsetKey, value: c2, generation: r2 })]);
                case 5:
                  return d2.sent(), this._onWrite.forEach((function(e4) {
                    e4(i2.map((function(e5) {
                      return e5.data;
                    })));
                  })), [3, 7];
                case 6:
                  this._onError.forEach((function(e4) {
                    return e4(s2);
                  })), d2.label = 7;
                case 7:
                  return [2];
              }
            }));
          }));
        }, e2.prototype.init = function() {
          return L(this, void 0, void 0, (function() {
            var e3, t2, n2, r2, i2;
            return w(this, (function(s2) {
              switch (s2.label) {
                case 0:
                  return e3 = this, [4, this._store.get(this.metadataKey)];
                case 1:
                  return e3._metadata = s2.sent() || { generation: 1 }, [4, this._getReducedRecordset()];
                case 2:
                  t2 = s2.sent(), n2 = 0, r2 = t2, s2.label = 3;
                case 3:
                  return n2 < r2.length ? (i2 = r2[n2], [4, this._applyRecord(t2, i2)]) : [3, 6];
                case 4:
                  s2.sent(), s2.label = 5;
                case 5:
                  return n2++, [3, 3];
                case 6:
                  return [2];
              }
            }));
          }));
        }, e2.prototype.on = function(e3, t2, n2) {
          switch (e3) {
            case tn.COMMIT:
              this._onCommit.set(t2, n2);
              break;
            case tn.WRITE:
              this._onWrite.set(t2, n2);
              break;
            case tn.ERROR:
              this._onError.set(t2, n2);
          }
        }, e2.prototype.requestWrite = function(e3, t2) {
          void 0 === t2 && (t2 = null), this._requests.push({ data: e3, options: t2 }), yn.get(this.dbname).put(R({ state: nn.PENDING, generation: this.generation }, e3));
        }, e2.prototype.requestMultipleWrite = function(e3, t2) {
          void 0 === t2 && (t2 = null);
          for (var n2 = yn.get(this.dbname), r2 = 0, i2 = e3; r2 < i2.length; r2++) {
            var s2 = i2[r2];
            this._requests.push({ data: s2, options: t2 }), n2.put(R({ state: nn.PENDING, generation: this.generation }, s2));
          }
        }, e2.prototype.clear = function() {
          return L(this, void 0, void 0, (function() {
            return w(this, (function(e3) {
              return yn.get(this.dbname).clearByCondition((function(e4) {
                return e4.state === nn.PENDING;
              })), this._requests = [], [2];
            }));
          }));
        }, e2.prototype.commit = function() {
          return L(this, void 0, void 0, (function() {
            var e3, t2, n2, r2, i2, s2, a2, o2, l2, u2, c2, d2, h2 = this;
            return w(this, (function(p2) {
              switch (p2.label) {
                case 0:
                  if (!((e3 = this._requests).length > 0)) return [3, 4];
                  for (t2 = [], n2 = {}, o2 = e3.length - 1; o2 >= 0; o2--) r2 = e3[o2], u2 = r2.data, n2[u2.key] || (n2[u2.key] = true, t2.unshift(r2));
                  return i2 = { generation: this.generation, requests: t2 }, [4, this._getReducedRecordset([i2])];
                case 1:
                  return s2 = p2.sent(), [4, this._store.set({ key: this.recordsetKey, value: s2, generation: this.generation })];
                case 2:
                  return p2.sent(), this._metadata.generation++, [4, this._store.set({ key: this.metadataKey, value: this._metadata, generation: 1 })];
                case 3:
                  for (p2.sent(), a2 = yn.get(this.dbname), o2 = 0; o2 < t2.length; o2++) l2 = t2[o2], u2 = l2.data, c2 = l2.options, a2.put(R(R({}, u2), { generation: i2.generation, state: c2 && c2.persistent ? nn.PERSISTENT : nn.VOLATILE }));
                  this._requests = [], this._onCommit.forEach((function(t3) {
                    t3(e3.map((function(e4) {
                      return e4.data;
                    })));
                  })), d2 = Bt.get(this.dbname), setTimeout((function() {
                    try {
                      h2._applyRecord(s2, i2);
                    } catch (e4) {
                      h2._onError.forEach((function(t3) {
                        return t3(e4);
                      }));
                    }
                  }), d2.transactionApplyDelay), p2.label = 4;
                case 4:
                  return [2];
              }
            }));
          }));
        }, e2;
      })(), En = (function() {
        function e2(e3) {
          var t2 = e3.blockId, n2 = e3.keyName, r2 = e3.items, i2 = void 0 === r2 ? [] : r2, s2 = e3.limit;
          this.blockId = t2, this.keyName = n2, this.limit = s2, this._items = P([], i2, true);
        }
        return e2.createFromCacheItem = function(t2) {
          return t2 ? new e2(t2.value) : null;
        }, Object.defineProperty(e2.prototype, "isEmpty", { get: function() {
          return 0 === this._items.length;
        }, enumerable: false, configurable: true }), Object.defineProperty(e2.prototype, "items", { get: function() {
          return this._items;
        }, enumerable: false, configurable: true }), e2.prototype.serialize = function() {
          return { blockId: this.blockId, keyName: this.keyName, limit: this.limit, items: this._items };
        }, e2.prototype.getItemByKey = function(e3) {
          var t2 = this;
          return this._items.find((function(n2) {
            var r2 = n2[t2.keyName];
            return e3 === r2;
          }));
        }, e2.prototype.has = function(e3) {
          var t2 = this;
          return this._items.map((function(e4) {
            return e4[t2.keyName];
          })).includes(e3);
        }, e2.prototype.add = function(e3) {
          var t2 = this, n2 = this._items.map((function(e4) {
            return e4[t2.keyName];
          })).indexOf(e3[this.keyName]);
          return n2 < 0 ? this._items.length < this.limit && (this._items.push(e3), true) : (this._items[n2] = e3, true);
        }, e2.prototype.remove = function(e3) {
          for (var t2 in this._items) if (this._items[t2][this.keyName] === e3) return this._items.splice(parseInt(t2), 1), true;
          return false;
        }, e2.prototype.clear = function() {
          this._items = [];
        }, e2;
      })(), vn = (function() {
        function e2(e3) {
          var t2 = e3.dbname, n2 = e3.collectionName, r2 = e3.metadata, i2 = e3.hashFunction, s2 = void 0 === i2 ? Qt : i2, a2 = e3.transaction, o2 = e3.store;
          this.dbname = t2, this.collectionName = n2, this.hashFunction = s2, this.metadata = r2, this._transaction = a2, this._store = o2;
        }
        return Object.defineProperty(e2.prototype, "keyName", { get: function() {
          return this.metadata.keyName;
        }, enumerable: false, configurable: true }), e2.prototype.createBlockId = function(e3, t2) {
          return void 0 === t2 && (t2 = this.metadata.blockLevel), n2 = this.dbname, r2 = this.collectionName, i2 = t2, s2 = "".concat((function(e4, t3, n3) {
            var r3 = n3.base * Math.pow(n3.multiplier, t3) + n3.constant;
            return (n3.hashFunction || Qt)(e4, r3);
          })(e3, t2, { hashFunction: this.hashFunction, base: this.metadata.blockHashBase, multiplier: this.metadata.blockHashMultiplier, constant: this.metadata.blockHashConstant })), "".concat(dn(n2, r2)).concat(i2, ".").concat(s2);
          var n2, r2, i2, s2;
        }, e2.prototype._findBlock = function(e3) {
          return L(this, void 0, void 0, (function() {
            var t2, n2, r2, i2, s2;
            return w(this, (function(a2) {
              switch (a2.label) {
                case 0:
                  t2 = yn.get(this.dbname), n2 = this.metadata.blockLevel, a2.label = 1;
                case 1:
                  return n2 > 0 ? (r2 = this.createBlockId(e3, n2), [4, t2.find(this._store, r2)]) : [3, 4];
                case 2:
                  if ((i2 = a2.sent()) && (s2 = En.createFromCacheItem(i2), s2.getItemByKey(e3))) return [2, s2];
                  a2.label = 3;
                case 3:
                  return n2--, [3, 1];
                case 4:
                  return [2, null];
              }
            }));
          }));
        }, e2.prototype.getFromBlock = function(e3) {
          return L(this, void 0, void 0, (function() {
            var t2;
            return w(this, (function(n2) {
              switch (n2.label) {
                case 0:
                  return [4, this._findBlock(e3)];
                case 1:
                  return [2, (t2 = n2.sent()) ? t2.getItemByKey(e3) : null];
              }
            }));
          }));
        }, e2.prototype.putToBlock = function(e3, t2) {
          return L(this, void 0, void 0, (function() {
            var n2, r2, i2, s2, a2;
            return w(this, (function(o2) {
              switch (o2.label) {
                case 0:
                  return n2 = Bt.get(this.dbname), r2 = this.createBlockId(e3), i2 = Math.floor(this._store.itemSizeLimit / n2.itemSizeLimit), [4, yn.get(this.dbname).find(this._store, r2)];
                case 1:
                  return s2 = o2.sent(), (a2 = s2 ? En.createFromCacheItem(s2) : new En({ blockId: r2, keyName: this.keyName, items: [], limit: i2 })).add(t2) ? (this._transaction.requestWrite({ key: a2.blockId, value: a2.serialize() }), [2, true]) : [2, false];
              }
            }));
          }));
        }, e2.prototype.removeFromBlock = function(e3) {
          return L(this, void 0, void 0, (function() {
            var t2;
            return w(this, (function(n2) {
              switch (n2.label) {
                case 0:
                  return [4, this._findBlock(e3)];
                case 1:
                  return (t2 = n2.sent()) && t2.remove(e3) ? (this._transaction.requestWrite({ key: t2.blockId, value: t2.serialize() }), [2, true]) : [2, false];
              }
            }));
          }));
        }, e2.prototype.clearAllBlocks = function() {
          return L(this, void 0, void 0, (function() {
            var e3, t2, n2, r2, i2, s2, a2;
            return w(this, (function(o2) {
              switch (o2.label) {
                case 0:
                  return e3 = dn(this.dbname, this.collectionName), [4, this._store.getAllKeys()];
                case 1:
                  return t2 = o2.sent(), n2 = t2.filter((function(t3) {
                    return t3.startsWith(e3);
                  })), [4, this._store.removeMany(n2)];
                case 2:
                  for (o2.sent(), r2 = yn.get(this.dbname), i2 = 0, s2 = n2; i2 < s2.length; i2++) a2 = s2[i2], r2.remove(a2);
                  return [2];
              }
            }));
          }));
        }, e2;
      })(), bn = (function() {
        function e2(e3) {
          var t2 = e3.dbname, n2 = e3.collectionName, r2 = e3.keyName, i2 = e3.fields, s2 = e3.transaction, a2 = e3.store, o2 = this;
          this._origin = [], this._table = [], this.dbname = t2, this.collectionName = n2, this.keyName = r2, this.fields = i2, this.indexerKey = (function(e4, t3, n3) {
            return "".concat(un(e4, t3), "/index.").concat(n3);
          })(this.dbname, this.collectionName, this.fields.join(">")), this._transaction = s2, this._store = a2, this._transaction.on(tn.COMMIT, this.indexerKey, (function() {
            return o2.commit();
          })), this._transaction.on(tn.ERROR, this.indexerKey, (function() {
            return o2.abort();
          }));
        }
        return e2.createKey = function(e3) {
          return e3.join(">");
        }, e2.parseKey = function(e3) {
          return e3.split(">");
        }, e2.prototype._addItem = function(e3) {
          var t2 = e3[this.keyName], n2 = this.getColumnValues(e3), r2 = this.indexOf(n2), i2 = r2[0];
          return r2[1] ? !this._table[i2].keys.includes(t2) && (this._table[i2].keys.push(t2), true) : (this._table.splice(i2, 0, { columnValues: n2, keys: [t2] }), true);
        }, e2.prototype._removeItem = function(e3) {
          var t2 = e3[this.keyName], n2 = this.getColumnValues(e3), r2 = this.indexOf(n2), i2 = r2[0];
          if (r2[1]) {
            var s2 = this._table[i2].keys.indexOf(t2);
            if (s2 > -1) return this._table[i2].keys.splice(s2, 1), 0 === this._table[i2].keys.length && this._table.splice(i2, 1), true;
          }
          return false;
        }, Object.defineProperty(e2.prototype, "origin", { get: function() {
          return this._origin;
        }, enumerable: false, configurable: true }), Object.defineProperty(e2.prototype, "table", { get: function() {
          return this._table;
        }, enumerable: false, configurable: true }), e2.prototype.getColumnValues = function(e3) {
          for (var t2, n2, r2 = [], i2 = 0, s2 = this.fields; i2 < s2.length; i2++) {
            var a2 = s2[i2];
            if ("-" === a2[0] && (a2 = a2.slice(1)), t2 = e3[a2], n2 = void 0, n2 = typeof t2, null !== t2 && "undefined" !== n2 && "boolean" !== n2 && "number" !== n2 && "string" !== n2) throw qt.indexTypesNotMatch;
            r2.push(e3[a2]);
          }
          return r2;
        }, e2.prototype.diff = function(e3, t2) {
          for (var n2 in this.fields) {
            var r2 = "-" === this.fields[n2][0] ? -1 : 1, i2 = Yt(e3[n2], t2[n2]);
            if (0 !== i2) return r2 * i2;
          }
          return 0;
        }, e2.prototype.indexOf = function(e3) {
          if (this._table.length > 0) {
            for (var t2 = 0, n2 = this._table.length - 1; t2 <= n2; ) {
              var r2 = Math.floor((t2 + n2) / 2), i2 = this.diff(e3, this._table[r2].columnValues);
              if (i2 > 0) t2 = r2 + 1;
              else {
                if (!(i2 < 0)) return [r2, true];
                n2 = r2 - 1;
              }
            }
            return [t2, false];
          }
          return [0, false];
        }, e2.prototype.ensure = function() {
          return L(this, void 0, void 0, (function() {
            var e3, t2, n2, r2, i2, s2, a2, o2, l2, u2, c2, d2;
            return w(this, (function(h2) {
              switch (h2.label) {
                case 0:
                  return [4, (e3 = yn.get(this.dbname)).find(this._store, this.indexerKey, rn.PERSISTENT)];
                case 1:
                  return (t2 = h2.sent()) ? [3, 7] : (n2 = dn(this.dbname, this.collectionName), [4, this._store.getAllKeys()]);
                case 2:
                  r2 = h2.sent(), i2 = 0, s2 = r2, h2.label = 3;
                case 3:
                  return i2 < s2.length ? (a2 = s2[i2]).startsWith(n2) ? [4, e3.find(this._store, a2, rn.NO_CACHE)] : [3, 5] : [3, 6];
                case 4:
                  for (o2 = h2.sent(), l2 = En.createFromCacheItem(o2), u2 = 0, c2 = l2.items; u2 < c2.length; u2++) d2 = c2[u2], this._addItem(d2);
                  h2.label = 5;
                case 5:
                  return i2++, [3, 3];
                case 6:
                  return this._transaction.requestWrite({ key: this.indexerKey, value: this._table }, { persistent: true }), [3, 8];
                case 7:
                  this._origin = t2.value, this._table = zt(this._origin), h2.label = 8;
                case 8:
                  return [2];
              }
            }));
          }));
        }, e2.prototype.drop = function() {
          return L(this, void 0, void 0, (function() {
            return w(this, (function(e3) {
              switch (e3.label) {
                case 0:
                  return yn.get(this.dbname).remove(this.indexerKey), [4, this._store.remove(this.indexerKey)];
                case 1:
                  return e3.sent(), [2];
              }
            }));
          }));
        }, e2.prototype.addItem = function(e3) {
          return L(this, void 0, void 0, (function() {
            return w(this, (function(t2) {
              return this._addItem(e3) && this._transaction.requestWrite({ key: this.indexerKey, value: this._table }, { persistent: true }), [2];
            }));
          }));
        }, e2.prototype.removeItem = function(e3) {
          return L(this, void 0, void 0, (function() {
            return w(this, (function(t2) {
              return this._removeItem(e3) && this._transaction.requestWrite({ key: this.indexerKey, value: this._table }, { persistent: true }), [2];
            }));
          }));
        }, e2.prototype.clear = function() {
          return L(this, void 0, void 0, (function() {
            return w(this, (function(e3) {
              return this._table = [], this._transaction.requestWrite({ key: this.indexerKey, value: this._table }, { persistent: true }), [2];
            }));
          }));
        }, e2.prototype.commit = function() {
          this._origin = this._table, this._table = zt(this._origin);
        }, e2.prototype.abort = function() {
          this._table = zt(this._origin);
        }, e2;
      })(), Cn = "undefined" != typeof document && "undefined" != typeof navigator;
      Cn && navigator.userAgent && navigator.userAgent.includes("Chrome/") && navigator.userAgent.includes("Chromium/");
      var An = Cn && navigator.userAgent && navigator.userAgent.includes("Firefox/") && !navigator.userAgent.includes("Seamonkey/");
      Cn && navigator.userAgent && navigator.userAgent.includes("Safari/") && !navigator.userAgent.includes("Chrome/") && navigator.userAgent.includes("Chromium/"), Cn && navigator.userAgent && (navigator.userAgent.includes("OPR/") || navigator.userAgent.includes("Opera/")), Cn && navigator.userAgent && navigator.userAgent.includes("Trident/7.0");
      var Nn, Sn, In = Cn && navigator.userAgent && navigator.userAgent.includes("Edge/"), Tn = function() {
        var e2 = (/* @__PURE__ */ new Date()).getTime();
        return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (function(t2) {
          var n2 = (e2 + 16 * Math.random()) % 16 | 0;
          return e2 = Math.floor(e2 / 16), ("x" === t2 ? n2 : 3 & n2 | 8).toString(16);
        }));
      };
      !(function(e2) {
        e2[e2.PROCESSING = 0] = "PROCESSING", e2[e2.DONE = 1] = "DONE";
      })(Nn || (Nn = {})), (function(e2) {
        e2.NEWNODE = "newnode", e2.REMOVENODE = "removenode", e2.CLAIM_HOST = "claimhost", e2.SYNC_HOST = "synchost", e2.REQUEST_LOCK = "requestlock", e2.ACQUIRE_LOCK = "acquirelock", e2.RELEASE_LOCK = "releaselock";
      })(Sn || (Sn = {}));
      var Un, On = {}, Mn = (function() {
        function e2(e3, t2) {
          void 0 === t2 && (t2 = {});
          var n2 = this;
          return this._state = Nn.PROCESSING, this._hostId = null, this._queue = [], this._currentItem = null, this._activationTimeout = null, this._activationQueue = [], On[e3] && !t2.forceCreate || (this.nodeId = Tn(), this.key = e3, Cn && (t2.startAsInvisible ? this.registerNode() : "visible" === document.visibilityState ? this.claimHost() : this.registerNode(), document.addEventListener("visibilitychange", (function() {
            "visible" === document.visibilityState && n2.claimHost();
          })), window.addEventListener("message", (function(e4) {
            var t3 = e4.data, r2 = t3.nodeId, i2 = t3.requestId, s2 = t3.key, a2 = t3.op, o2 = t3.data;
            if (r2 !== n2.nodeId && s2 === n2.key) switch (a2) {
              case Sn.NEWNODE:
                n2._sendSync();
                break;
              case Sn.CLAIM_HOST:
                n2._sendSync(), n2._hostId = r2;
                break;
              case Sn.SYNC_HOST:
                if (!n2.isInSync) {
                  n2._activationTimeout && clearTimeout(n2._activationTimeout);
                  for (var l2 = o2, u2 = l2.currentItemRequestId, c2 = function(e5) {
                    var t4 = n2._queue.findIndex((function(t5) {
                      return t5.requestId === e5.requestId;
                    }));
                    t4 < 0 && n2._requestLock({ nodeId: e5.nodeId, requestId: e5.requestId, key: n2.key, op: Sn.REQUEST_LOCK, ts: e5.ts });
                  }, d2 = 0, h2 = l2.queue; d2 < h2.length; d2++) {
                    c2(h2[d2]);
                  }
                  n2._currentItem = n2._queue.find((function(e5) {
                    return e5.requestId === u2;
                  })), n2._completeSync();
                }
                break;
              case Sn.REMOVENODE:
                n2._queue = n2._queue.filter((function(e5) {
                  return e5.nodeId !== t3.nodeId;
                })), n2._currentItem && n2._currentItem.nodeId === t3.nodeId && (n2._currentItem = null, n2._acquire(n2._queue[0]));
                break;
              case Sn.REQUEST_LOCK:
                n2._requestLock(t3);
                break;
              case Sn.ACQUIRE_LOCK:
                var p2 = n2._queue.find((function(e5) {
                  return e5.requestId === i2;
                }));
                n2._acquire(p2);
                break;
              case Sn.RELEASE_LOCK:
                n2._release(i2);
            }
          })), window.addEventListener("beforeunload", (function() {
            n2._send(Sn.REMOVENODE);
          }))), On[e3] = this), On[e3];
        }
        return Object.defineProperty(e2.prototype, "locked", { get: function() {
          return !!this._currentItem;
        }, enumerable: false, configurable: true }), Object.defineProperty(e2.prototype, "isHost", { get: function() {
          return this._hostId === this.nodeId;
        }, enumerable: false, configurable: true }), Object.defineProperty(e2.prototype, "isInSync", { get: function() {
          return this._state == Nn.DONE;
        }, enumerable: false, configurable: true }), e2.prototype._send = function(e3, t2) {
          var n2, r2;
          void 0 === t2 && (t2 = {});
          var i2 = { nodeId: this.nodeId, requestId: null !== (n2 = null == t2 ? void 0 : t2.requestId) && void 0 !== n2 ? n2 : Tn(), key: this.key, op: e3, data: null !== (r2 = t2.data) && void 0 !== r2 ? r2 : null, ts: Date.now() };
          return Cn && window.postMessage(i2, "*"), i2;
        }, e2.prototype._acquire = function(e3) {
          void 0 === e3 && (e3 = null), e3 ? (this._currentItem = e3, this._currentItem.onAcquired(e3.requestId)) : this._currentItem = null;
        }, e2.prototype._release = function(e3) {
          if (this._currentItem && this._currentItem.requestId === e3) {
            var t2 = this._currentItem;
            this._currentItem = null, t2.nodeId === this.nodeId && this._send(Sn.RELEASE_LOCK, { requestId: t2.requestId });
            var n2 = this._queue.findIndex((function(t3) {
              return t3.requestId === e3;
            }));
            n2 > -1 && this._queue.splice(n2, 1), t2.onReleased(e3);
          }
        }, e2.prototype._requestLock = function(e3) {
          var t2 = this;
          return new Promise((function(n2) {
            var r2 = { nodeId: e3.nodeId, requestId: e3.requestId, ts: e3.ts, onAcquired: function(e4) {
              t2.isHost && t2._send(Sn.ACQUIRE_LOCK, { requestId: e4 }), n2();
            }, onReleased: function() {
              t2._acquire(t2._queue[0]);
            } }, i2 = false;
            for (var s2 in t2._queue) if (t2._queue[s2].ts > r2.ts) {
              t2._queue.splice(parseInt(s2), 0, r2), i2 = true;
              break;
            }
            i2 || t2._queue.push(r2), t2._currentItem || t2._acquire(t2._queue[0]);
          }));
        }, e2.prototype._sendSync = function() {
          var e3;
          this.isHost && this._send(Sn.SYNC_HOST, { data: { currentItemRequestId: null === (e3 = this._currentItem) || void 0 === e3 ? void 0 : e3.requestId, queue: this._queue.map((function(e4) {
            return { nodeId: e4.nodeId, requestId: e4.requestId, ts: e4.ts };
          })) } });
        }, e2.prototype._waitUntilSyncCompleted = function() {
          return L(this, void 0, void 0, (function() {
            var e3 = this;
            return w(this, (function(t2) {
              return this.isHost && !this.isInSync ? [2, new Promise((function(t3) {
                e3._activationQueue.push(t3);
              }))] : [2];
            }));
          }));
        }, e2.prototype._waitSync = function() {
          var e3 = this;
          this.isInSync || (this._activationTimeout = setTimeout((function() {
            e3._completeSync();
          }), 8));
        }, e2.prototype._completeSync = function() {
          this.isInSync || (this._state = Nn.DONE, this._activationQueue.forEach((function(e3) {
            return e3();
          })), this._activationQueue = []);
        }, e2.prototype.registerNode = function() {
          this._send(Sn.NEWNODE), this._waitSync();
        }, e2.prototype.claimHost = function() {
          this._hostId = this.nodeId, this._send(Sn.CLAIM_HOST), this._waitSync();
        }, e2.prototype.lock = function() {
          return L(this, void 0, void 0, (function() {
            var e3;
            return w(this, (function(t2) {
              switch (t2.label) {
                case 0:
                  return [4, this._waitUntilSyncCompleted()];
                case 1:
                  return t2.sent(), e3 = this._send(Sn.REQUEST_LOCK), [4, this._requestLock(e3)];
                case 2:
                  return t2.sent(), [2];
              }
            }));
          }));
        }, e2.prototype.unlock = function() {
          var e3;
          this._release(null === (e3 = this._currentItem) || void 0 === e3 ? void 0 : e3.requestId);
        }, e2;
      })(), kn = (function() {
        function e2(e3) {
          var t2 = e3.dbname, n2 = e3.collectionName, r2 = e3.keyName, i2 = e3.keyHash, s2 = e3.indexes, a2 = e3.store, o2 = this;
          this._state = Vt.INIT, this._metadata = null, this._indexers = [], this.dbname = t2, this.name = n2, this.keyName = r2, this.indexes = P([[r2]], s2.filter((function(e4) {
            return bn.createKey(e4) !== o2.keyName;
          })), true), this._keyHash = i2, this._store = a2, this._mutex = new Mn((function(e4, t3) {
            return "".concat(un(e4, t3), ".lock");
          })(t2, n2)), this._blobContainer = new fn({ dbname: t2, collectionName: n2, store: a2 }), this._transaction = new mn({ dbname: t2, collectionName: n2, store: a2 });
        }
        return e2.metadataOf = function(e3, t2, n2) {
          return L(this, void 0, void 0, (function() {
            var r2;
            return w(this, (function(i2) {
              switch (i2.label) {
                case 0:
                  return r2 = cn(e3, t2), [4, n2.get(r2)];
                case 1:
                  return [2, i2.sent()];
              }
            }));
          }));
        }, Object.defineProperty(e2.prototype, "state", { get: function() {
          return this._state;
        }, enumerable: false, configurable: true }), e2.prototype.init = function() {
          return L(this, void 0, void 0, (function() {
            var t2, n2, r2, i2, s2, a2, o2, l2, u2, c2, d2, h2, p2 = this;
            return w(this, (function(f2) {
              switch (f2.label) {
                case 0:
                  return [4, this._mutex.lock()];
                case 1:
                  f2.sent(), f2.label = 2;
                case 2:
                  return f2.trys.push([2, 9, , 10]), t2 = Bt.get(this.dbname), [4, e2.metadataOf(this.dbname, this.name, this._store)];
                case 3:
                  return n2 = f2.sent(), this._metadata = n2 || { keyName: this.keyName, blockLevel: 1, blockHashBase: t2.blockHashBase, blockHashMultiplier: t2.blockHashMultiplier, blockHashConstant: t2.blockHashConstant, indexes: this.indexes }, [4, this._transaction.init()];
                case 4:
                  for (f2.sent(), this._blockManager = new vn({ dbname: this.dbname, collectionName: this.name, hashFunction: this._keyHash, metadata: this._metadata, transaction: this._transaction, store: this._store }), r2 = P([], this.indexes, true), i2 = [], s2 = r2.map((function(e3) {
                    return bn.createKey(e3);
                  })), a2 = n2 ? n2.indexes.map((function(e3) {
                    return bn.createKey(e3);
                  })) : [], o2 = 0, l2 = a2; o2 < l2.length; o2++) u2 = l2[o2], s2.includes(u2) || i2.push(bn.parseKey(u2));
                  return (c2 = []).push.apply(c2, r2.map((function(e3) {
                    var t3 = new bn({ dbname: p2.dbname, collectionName: p2.name, keyName: p2.keyName, fields: e3, transaction: p2._transaction, store: p2._store });
                    return p2._indexers.push(t3), t3.ensure();
                  }))), c2.push.apply(c2, i2.map((function(e3) {
                    return new bn({ dbname: p2.dbname, collectionName: p2.name, keyName: p2.keyName, fields: e3, transaction: p2._transaction, store: p2._store }).drop();
                  }))), [4, Promise.all(c2)];
                case 5:
                  return f2.sent(), [4, this._transaction.commit()];
                case 6:
                  return f2.sent(), s2.sort().join(",") === a2.sort().join(",") ? [3, 8] : (d2 = cn(this.dbname, this.name), this._metadata.indexes = r2, [4, this._store.set({ key: d2, value: this._metadata, generation: 1 })]);
                case 7:
                  f2.sent(), f2.label = 8;
                case 8:
                  return this._state = Vt.READY, this._mutex.unlock(), [3, 10];
                case 9:
                  throw h2 = f2.sent(), this._mutex.unlock(), h2;
                case 10:
                  return [2];
              }
            }));
          }));
        }, e2.prototype.close = function() {
          this._state = Vt.CLOSED;
        }, e2.prototype._hasPropertyOfKeyName = function(e3) {
          var t2 = e3[this.keyName];
          return "string" == typeof t2 && !!t2;
        }, e2.prototype._getIndexerBy = function(e3) {
          void 0 === e3 && (e3 = null), e3 || (e3 = [this.keyName]);
          for (var t2 = bn.createKey(e3), n2 = 0, r2 = this._indexers; n2 < r2.length; n2++) {
            var i2 = r2[n2];
            if (t2 === bn.createKey(i2.fields)) return i2;
          }
          return null;
        }, e2.prototype._upgradeBlockLevel = function() {
          return L(this, void 0, void 0, (function() {
            var e3;
            return w(this, (function(t2) {
              switch (t2.label) {
                case 0:
                  return e3 = cn(this.dbname, this.name), this._metadata.blockLevel++, [4, this._store.set({ key: e3, value: this._metadata, generation: 1 })];
                case 1:
                  return t2.sent(), [2];
              }
            }));
          }));
        }, e2.prototype._requestInsert = function(e3) {
          return L(this, void 0, void 0, (function() {
            var t2, n2, r2;
            return w(this, (function(i2) {
              switch (i2.label) {
                case 0:
                  return t2 = e3[this.keyName], [4, this._blockManager.getFromBlock(t2)];
                case 1:
                  return i2.sent() ? [3, 10] : [4, this._blockManager.putToBlock(t2, e3)];
                case 2:
                  return i2.sent() ? [3, 5] : [4, this._upgradeBlockLevel()];
                case 3:
                  return i2.sent(), [4, this._blockManager.putToBlock(t2, e3)];
                case 4:
                  i2.sent(), i2.label = 5;
                case 5:
                  n2 = 0, r2 = this._indexers, i2.label = 6;
                case 6:
                  return n2 < r2.length ? [4, r2[n2].addItem(e3)] : [3, 9];
                case 7:
                  i2.sent(), i2.label = 8;
                case 8:
                  return n2++, [3, 6];
                case 9:
                  return [3, 11];
                case 10:
                  throw qt.collectionInsertDuplicate;
                case 11:
                  return [2];
              }
            }));
          }));
        }, e2.prototype._requestUpsert = function(e3) {
          return L(this, void 0, void 0, (function() {
            var t2, n2, r2, i2, s2, a2, o2;
            return w(this, (function(l2) {
              switch (l2.label) {
                case 0:
                  return t2 = e3[this.keyName], [4, this._blockManager.getFromBlock(t2)];
                case 1:
                  return (n2 = l2.sent()) ? [3, 10] : [4, this._blockManager.putToBlock(t2, e3)];
                case 2:
                  return l2.sent() ? [3, 5] : [4, this._upgradeBlockLevel()];
                case 3:
                  return l2.sent(), [4, this._blockManager.putToBlock(t2, e3)];
                case 4:
                  l2.sent(), l2.label = 5;
                case 5:
                  r2 = 0, i2 = this._indexers, l2.label = 6;
                case 6:
                  return r2 < i2.length ? [4, (o2 = i2[r2]).addItem(e3)] : [3, 9];
                case 7:
                  l2.sent(), l2.label = 8;
                case 8:
                  return r2++, [3, 6];
                case 9:
                  return [3, 16];
                case 10:
                  return [4, this._blockManager.putToBlock(t2, e3)];
                case 11:
                  l2.sent(), s2 = 0, a2 = this._indexers, l2.label = 12;
                case 12:
                  return s2 < a2.length ? 0 === (o2 = a2[s2]).diff(o2.getColumnValues(n2), o2.getColumnValues(e3)) ? [3, 15] : [4, o2.removeItem(n2)] : [3, 16];
                case 13:
                  return l2.sent(), [4, o2.addItem(e3)];
                case 14:
                  l2.sent(), l2.label = 15;
                case 15:
                  return s2++, [3, 12];
                case 16:
                  return [2];
              }
            }));
          }));
        }, e2.prototype._requestUpdate = function(e3) {
          return L(this, void 0, void 0, (function() {
            var t2, n2, r2, i2, s2;
            return w(this, (function(a2) {
              switch (a2.label) {
                case 0:
                  return t2 = e3[this.keyName], [4, this._blockManager.getFromBlock(t2)];
                case 1:
                  return (n2 = a2.sent()) ? [4, this._blockManager.putToBlock(t2, e3)] : [3, 7];
                case 2:
                  a2.sent(), r2 = 0, i2 = this._indexers, a2.label = 3;
                case 3:
                  return r2 < i2.length ? 0 === (s2 = i2[r2]).diff(s2.getColumnValues(n2), s2.getColumnValues(e3)) ? [3, 6] : [4, s2.removeItem(n2)] : [3, 7];
                case 4:
                  return a2.sent(), [4, s2.addItem(e3)];
                case 5:
                  a2.sent(), a2.label = 6;
                case 6:
                  return r2++, [3, 3];
                case 7:
                  return [2];
              }
            }));
          }));
        }, e2.prototype._requestRemove = function(e3) {
          return L(this, void 0, void 0, (function() {
            var t2, n2, r2;
            return w(this, (function(i2) {
              switch (i2.label) {
                case 0:
                  return [4, this._blockManager.getFromBlock(e3)];
                case 1:
                  return (t2 = i2.sent()) ? [4, this._blockManager.removeFromBlock(e3)] : [3, 6];
                case 2:
                  i2.sent(), n2 = 0, r2 = this._indexers, i2.label = 3;
                case 3:
                  return n2 < r2.length ? [4, r2[n2].removeItem(t2)] : [3, 6];
                case 4:
                  i2.sent(), i2.label = 5;
                case 5:
                  return n2++, [3, 3];
                case 6:
                  return [2];
              }
            }));
          }));
        }, e2.prototype._requestClear = function() {
          return L(this, void 0, void 0, (function() {
            var e3, t2;
            return w(this, (function(n2) {
              switch (n2.label) {
                case 0:
                  return [4, this._blockManager.clearAllBlocks()];
                case 1:
                  n2.sent(), e3 = 0, t2 = this._indexers, n2.label = 2;
                case 2:
                  return e3 < t2.length ? [4, t2[e3].clear()] : [3, 5];
                case 3:
                  n2.sent(), n2.label = 4;
                case 4:
                  return e3++, [3, 2];
                case 5:
                  return [2];
              }
            }));
          }));
        }, e2.prototype.getByKey = function(e3) {
          return L(this, void 0, void 0, (function() {
            var t2, n2;
            return w(this, (function(r2) {
              switch (r2.label) {
                case 0:
                  return this._state !== Vt.READY ? [3, 6] : [4, this._mutex.lock()];
                case 1:
                  r2.sent(), r2.label = 2;
                case 2:
                  return r2.trys.push([2, 4, , 5]), [4, this._blockManager.getFromBlock(e3)];
                case 3:
                  return t2 = r2.sent(), this._mutex.unlock(), [2, zt(t2)];
                case 4:
                  throw n2 = r2.sent(), this._mutex.unlock(), n2;
                case 5:
                  return [3, 7];
                case 6:
                  throw qt.collectionNotReady;
                case 7:
                  return [2];
              }
            }));
          }));
        }, e2.prototype.query = function(e3) {
          return void 0 === e3 && (e3 = {}), this._state === Vt.READY ? new on({ condition: e3.where, mutex: this._mutex, blockManager: this._blockManager, indexer: this._getIndexerBy(e3.index), backward: !!e3.backward }) : null;
        }, e2.prototype.insertOne = function(e3) {
          return L(this, void 0, void 0, (function() {
            var t2;
            return w(this, (function(n2) {
              switch (n2.label) {
                case 0:
                  return this._state !== Vt.READY ? [3, 8] : [4, this._mutex.lock()];
                case 1:
                  n2.sent(), n2.label = 2;
                case 2:
                  if (n2.trys.push([2, 5, , 7]), !this._hasPropertyOfKeyName(e3)) throw qt.collectionKeyNotGiven;
                  return [4, this._requestInsert(zt(e3))];
                case 3:
                  return n2.sent(), [4, this._transaction.commit()];
                case 4:
                  return n2.sent(), this._mutex.unlock(), [2, e3];
                case 5:
                  return t2 = n2.sent(), [4, this._transaction.clear()];
                case 6:
                  throw n2.sent(), this._mutex.unlock(), t2;
                case 7:
                  return [3, 9];
                case 8:
                  throw qt.collectionNotReady;
                case 9:
                  return [2];
              }
            }));
          }));
        }, e2.prototype.insertMany = function(e3) {
          return L(this, void 0, void 0, (function() {
            var t2, n2, r2, i2, s2 = this;
            return w(this, (function(a2) {
              switch (a2.label) {
                case 0:
                  return this._state !== Vt.READY ? [3, 11] : [4, this._mutex.lock()];
                case 1:
                  a2.sent(), a2.label = 2;
                case 2:
                  if (a2.trys.push([2, 8, , 10]), e3.some((function(e4) {
                    return !s2._hasPropertyOfKeyName(e4);
                  }))) throw qt.collectionKeyNotGiven;
                  t2 = 0, n2 = e3, a2.label = 3;
                case 3:
                  return t2 < n2.length ? (r2 = n2[t2], [4, this._requestInsert(zt(r2))]) : [3, 6];
                case 4:
                  a2.sent(), a2.label = 5;
                case 5:
                  return t2++, [3, 3];
                case 6:
                  return [4, this._transaction.commit()];
                case 7:
                  return a2.sent(), this._mutex.unlock(), [2, e3];
                case 8:
                  return i2 = a2.sent(), [4, this._transaction.clear()];
                case 9:
                  throw a2.sent(), this._mutex.unlock(), i2;
                case 10:
                  return [3, 12];
                case 11:
                  throw qt.collectionNotReady;
                case 12:
                  return [2];
              }
            }));
          }));
        }, e2.prototype.upsertOne = function(e3) {
          return L(this, void 0, void 0, (function() {
            var t2;
            return w(this, (function(n2) {
              switch (n2.label) {
                case 0:
                  return this._state !== Vt.READY ? [3, 8] : [4, this._mutex.lock()];
                case 1:
                  n2.sent(), n2.label = 2;
                case 2:
                  if (n2.trys.push([2, 5, , 7]), !this._hasPropertyOfKeyName(e3)) throw qt.collectionKeyNotGiven;
                  return [4, this._requestUpsert(zt(e3))];
                case 3:
                  return n2.sent(), [4, this._transaction.commit()];
                case 4:
                  return n2.sent(), this._mutex.unlock(), [2, e3];
                case 5:
                  return t2 = n2.sent(), [4, this._transaction.clear()];
                case 6:
                  throw n2.sent(), this._mutex.unlock(), t2;
                case 7:
                  return [3, 9];
                case 8:
                  throw qt.collectionNotReady;
                case 9:
                  return [2];
              }
            }));
          }));
        }, e2.prototype.upsertMany = function(e3) {
          return L(this, void 0, void 0, (function() {
            var t2, n2, r2, i2, s2 = this;
            return w(this, (function(a2) {
              switch (a2.label) {
                case 0:
                  return this._state !== Vt.READY ? [3, 11] : [4, this._mutex.lock()];
                case 1:
                  a2.sent(), a2.label = 2;
                case 2:
                  if (a2.trys.push([2, 8, , 10]), e3.some((function(e4) {
                    return !s2._hasPropertyOfKeyName(e4);
                  }))) throw qt.collectionKeyNotGiven;
                  t2 = 0, n2 = e3, a2.label = 3;
                case 3:
                  return t2 < n2.length ? (r2 = n2[t2], [4, this._requestUpsert(zt(r2))]) : [3, 6];
                case 4:
                  a2.sent(), a2.label = 5;
                case 5:
                  return t2++, [3, 3];
                case 6:
                  return [4, this._transaction.commit()];
                case 7:
                  return a2.sent(), this._mutex.unlock(), [2, e3];
                case 8:
                  return i2 = a2.sent(), [4, this._transaction.clear()];
                case 9:
                  throw a2.sent(), this._mutex.unlock(), i2;
                case 10:
                  return [3, 12];
                case 11:
                  throw qt.collectionNotReady;
                case 12:
                  return [2];
              }
            }));
          }));
        }, e2.prototype.update = function(e3) {
          return L(this, void 0, void 0, (function() {
            var t2;
            return w(this, (function(n2) {
              switch (n2.label) {
                case 0:
                  return this._state !== Vt.READY ? [3, 8] : [4, this._mutex.lock()];
                case 1:
                  n2.sent(), n2.label = 2;
                case 2:
                  if (n2.trys.push([2, 5, , 7]), !this._hasPropertyOfKeyName(e3)) throw qt.collectionKeyNotGiven;
                  return [4, this._requestUpdate(zt(e3))];
                case 3:
                  return n2.sent(), [4, this._transaction.commit()];
                case 4:
                  return n2.sent(), this._mutex.unlock(), [2, e3];
                case 5:
                  return t2 = n2.sent(), [4, this._transaction.clear()];
                case 6:
                  throw n2.sent(), this._mutex.unlock(), t2;
                case 7:
                  return [3, 9];
                case 8:
                  throw qt.collectionNotReady;
                case 9:
                  return [2];
              }
            }));
          }));
        }, e2.prototype.updateIf = function(e3, t2) {
          return L(this, void 0, void 0, (function() {
            var n2, r2, i2, s2, a2, o2, l2, u2, c2, d2, h2, p2 = this;
            return w(this, (function(f2) {
              switch (f2.label) {
                case 0:
                  return this._state !== Vt.READY ? [3, 12] : [4, this._mutex.lock()];
                case 1:
                  f2.sent(), f2.label = 2;
                case 2:
                  return f2.trys.push([2, 9, , 11]), n2 = e3.where, r2 = void 0 === n2 ? {} : n2, i2 = e3.index, s2 = void 0 === i2 ? null : i2, a2 = e3.backward, o2 = void 0 !== a2 && a2, l2 = [], [4, new an({ condition: r2, blockManager: this._blockManager, backward: o2, indexer: this._getIndexerBy(s2) }).each((function(e4) {
                    return L(p2, void 0, void 0, (function() {
                      var n3, i3;
                      return w(this, (function(s3) {
                        if (e4.error) throw e4.stop(), e4.error;
                        if (e4.hasNext) {
                          if (n3 = e4.nextValue, Jt(r2, n3) && t2.set) {
                            if ("function" != typeof t2.set) for (i3 in t2.set) n3[i3] = t2.set[i3];
                            else t2.set(n3);
                            l2.push(n3);
                          }
                          e4.next();
                        } else e4.stop();
                        return [2];
                      }));
                    }));
                  }))];
                case 3:
                  f2.sent(), u2 = 0, c2 = l2, f2.label = 4;
                case 4:
                  return u2 < c2.length ? (d2 = c2[u2], [4, this._requestUpdate(zt(d2))]) : [3, 7];
                case 5:
                  f2.sent(), f2.label = 6;
                case 6:
                  return u2++, [3, 4];
                case 7:
                  return [4, this._transaction.commit()];
                case 8:
                  return f2.sent(), this._mutex.unlock(), [2, l2];
                case 9:
                  return h2 = f2.sent(), [4, this._transaction.clear()];
                case 10:
                  throw f2.sent(), this._mutex.unlock(), h2;
                case 11:
                  return [3, 13];
                case 12:
                  throw this._transaction.clear(), qt.collectionNotReady;
                case 13:
                  return [2];
              }
            }));
          }));
        }, e2.prototype.remove = function(e3) {
          return L(this, void 0, void 0, (function() {
            var t2;
            return w(this, (function(n2) {
              switch (n2.label) {
                case 0:
                  return this._state !== Vt.READY ? [3, 8] : [4, this._mutex.lock()];
                case 1:
                  n2.sent(), n2.label = 2;
                case 2:
                  return n2.trys.push([2, 5, , 7]), [4, this._requestRemove(e3)];
                case 3:
                  return n2.sent(), [4, this._transaction.commit()];
                case 4:
                  return n2.sent(), this._mutex.unlock(), [3, 7];
                case 5:
                  return t2 = n2.sent(), [4, this._transaction.clear()];
                case 6:
                  throw n2.sent(), this._mutex.unlock(), t2;
                case 7:
                  return [3, 9];
                case 8:
                  throw qt.collectionNotReady;
                case 9:
                  return [2];
              }
            }));
          }));
        }, e2.prototype.removeIf = function(e3) {
          return L(this, void 0, void 0, (function() {
            var t2, n2, r2, i2, s2, a2, o2, l2, u2, c2, d2, h2 = this;
            return w(this, (function(p2) {
              switch (p2.label) {
                case 0:
                  return this._state !== Vt.READY ? [3, 11] : [4, this._mutex.lock()];
                case 1:
                  p2.sent(), p2.label = 2;
                case 2:
                  return p2.trys.push([2, 9, , 10]), t2 = e3.where, n2 = void 0 === t2 ? {} : t2, r2 = e3.index, i2 = void 0 === r2 ? null : r2, s2 = e3.backward, a2 = void 0 !== s2 && s2, o2 = [], [4, new an({ condition: n2, blockManager: this._blockManager, backward: a2, indexer: this._getIndexerBy(i2) }).each((function(e4) {
                    return L(h2, void 0, void 0, (function() {
                      var t3, r3;
                      return w(this, (function(i3) {
                        if (e4.error) throw e4.stop(), e4.error;
                        return e4.hasNext ? (t3 = e4.nextValue, Jt(n2, t3) && (r3 = t3[this.keyName], o2.push(r3)), e4.next()) : e4.stop(), [2];
                      }));
                    }));
                  }))];
                case 3:
                  p2.sent(), l2 = 0, u2 = o2, p2.label = 4;
                case 4:
                  return l2 < u2.length ? (c2 = u2[l2], [4, this._requestRemove(c2)]) : [3, 7];
                case 5:
                  p2.sent(), p2.label = 6;
                case 6:
                  return l2++, [3, 4];
                case 7:
                  return [4, this._transaction.commit()];
                case 8:
                  return p2.sent(), this._mutex.unlock(), [2, o2];
                case 9:
                  throw d2 = p2.sent(), this._mutex.unlock(), d2;
                case 10:
                  return [3, 12];
                case 11:
                  throw this._transaction.clear(), qt.collectionNotReady;
                case 12:
                  return [2];
              }
            }));
          }));
        }, e2.prototype.clear = function() {
          return L(this, void 0, void 0, (function() {
            var e3;
            return w(this, (function(t2) {
              switch (t2.label) {
                case 0:
                  return this._state !== Vt.READY ? [3, 8] : [4, this._mutex.lock()];
                case 1:
                  t2.sent(), t2.label = 2;
                case 2:
                  return t2.trys.push([2, 5, , 7]), [4, this._requestClear()];
                case 3:
                  return t2.sent(), [4, this._transaction.commit()];
                case 4:
                  return t2.sent(), this._mutex.unlock(), [3, 7];
                case 5:
                  return e3 = t2.sent(), [4, this._transaction.clear()];
                case 6:
                  throw t2.sent(), this._mutex.unlock(), e3;
                case 7:
                  return [3, 9];
                case 8:
                  throw qt.collectionNotReady;
                case 9:
                  return [2];
              }
            }));
          }));
        }, e2.prototype.getBlob = function(e3) {
          return L(this, void 0, void 0, (function() {
            return w(this, (function(t2) {
              switch (t2.label) {
                case 0:
                  return [4, this._blobContainer.get(e3)];
                case 1:
                  return [2, t2.sent()];
              }
            }));
          }));
        }, e2.prototype.saveBlob = function(e3, t2) {
          return void 0 === t2 && (t2 = null), L(this, void 0, void 0, (function() {
            return w(this, (function(n2) {
              switch (n2.label) {
                case 0:
                  return [4, this._blobContainer.save(e3, t2)];
                case 1:
                  return [2, n2.sent()];
              }
            }));
          }));
        }, e2.prototype.removeBlob = function(e3) {
          return L(this, void 0, void 0, (function() {
            return w(this, (function(t2) {
              switch (t2.label) {
                case 0:
                  return [4, this._blobContainer.remove(e3)];
                case 1:
                  return t2.sent(), [2];
              }
            }));
          }));
        }, e2.prototype.removeAllBlobs = function() {
          return L(this, void 0, void 0, (function() {
            return w(this, (function(e3) {
              switch (e3.label) {
                case 0:
                  return [4, this._blobContainer.clear()];
                case 1:
                  return e3.sent(), [2];
              }
            }));
          }));
        }, e2;
      })(), Rn = { key: "__ev", value: { k: "__ev", v: "scs" }, generation: 1 }, Ln = { encrypt: function(e2) {
        return e2;
      }, decrypt: function(e2) {
        return e2;
      } }, wn = {}, Pn = (function() {
        function e2(e3) {
          void 0 === e3 && (e3 = {});
          var t2 = e3.itemSizeLimit, n2 = void 0 === t2 ? 4194304 : t2, r2 = e3.delay, i2 = void 0 === r2 ? 1 : r2, s2 = e3.encryption, a2 = void 0 === s2 ? Ln : s2;
          this._encryption = a2, this.itemSizeLimit = n2, this.delay = i2, this.observer = {};
        }
        return Object.defineProperty(e2.prototype, "rawData", { get: function() {
          return wn[this.dbname];
        }, set: function(e3) {
          wn[this.dbname] = e3;
        }, enumerable: false, configurable: true }), e2.prototype.observe = function(e3, t2, n2) {
          var r2 = this;
          this.observer[e3] = {}, t2.forEach((function(t3) {
            return r2.observer[e3][t3] = n2;
          }));
        }, e2.prototype.init = function(e3) {
          return L(this, void 0, void 0, (function() {
            var t2;
            return w(this, (function(n2) {
              switch (n2.label) {
                case 0:
                  this.dbname = e3, wn[this.dbname] = {}, n2.label = 1;
                case 1:
                  return n2.trys.push([1, , 3, 5]), [4, this.get(Rn.key)];
                case 2:
                  if ((t2 = n2.sent()) && JSON.stringify(t2) !== JSON.stringify(Rn.value)) throw qt.storeEncryptionInvalid;
                  return [3, 5];
                case 3:
                  return [4, this.set(Rn)];
                case 4:
                  return n2.sent(), [7];
                case 5:
                  return [2];
              }
            }));
          }));
        }, e2.prototype.getAllKeys = function() {
          return L(this, void 0, void 0, (function() {
            return w(this, (function(e3) {
              return [2, Object.keys(wn[this.dbname]).filter((function(e4) {
                return e4 !== Rn.key;
              }))];
            }));
          }));
        }, e2.prototype.get = function(e3) {
          return L(this, void 0, void 0, (function() {
            var t2, n2;
            return w(this, (function(r2) {
              switch (r2.label) {
                case 0:
                  return [4, Wt(this.delay)];
                case 1:
                  if (r2.sent(), t2 = this.observer[e3], n2 = t2 && t2.get ? t2.get(e3) : null) throw n2;
                  return [2, wn[this.dbname][e3] ? this._encryption.decrypt(wn[this.dbname][e3]) : null];
              }
            }));
          }));
        }, e2.prototype.set = function(e3) {
          return L(this, void 0, void 0, (function() {
            var t2, n2, r2, i2, s2, a2;
            return w(this, (function(o2) {
              switch (o2.label) {
                case 0:
                  return [4, Wt(this.delay)];
                case 1:
                  if (o2.sent(), t2 = e3.key, n2 = e3.value, r2 = this.observer[t2], i2 = r2 && r2.set ? r2.set(t2) : null) throw i2;
                  if (s2 = this._encryption.encrypt(n2), a2 = JSON.stringify(s2), t2 === Rn.key || a2.length < this.itemSizeLimit) return wn[this.dbname][t2] = s2, [2, wn[this.dbname][t2]];
                  throw qt.storeItemSizeExceeded;
              }
            }));
          }));
        }, e2.prototype.setMany = function(e3) {
          return L(this, void 0, void 0, (function() {
            var t2, n2 = this;
            return w(this, (function(r2) {
              switch (r2.label) {
                case 0:
                  return [4, Wt(this.delay)];
                case 1:
                  return r2.sent(), t2 = [], e3.forEach((function(e4) {
                    var r3 = e4.key, i2 = e4.value, s2 = n2.observer[r3];
                    if (s2 && s2.set ? s2.set(r3) : null) t2.push(qt.collectionWriteFailed);
                    else {
                      var a2 = n2._encryption.encrypt(i2), o2 = JSON.stringify(a2);
                      r3 === Rn.key || o2.length < n2.itemSizeLimit ? (wn[n2.dbname][r3] = a2, t2.push(i2)) : t2.push(qt.storeItemSizeExceeded);
                    }
                  })), [2, t2];
              }
            }));
          }));
        }, e2.prototype.remove = function(e3) {
          return L(this, void 0, void 0, (function() {
            var t2, n2;
            return w(this, (function(r2) {
              switch (r2.label) {
                case 0:
                  return [4, Wt(this.delay)];
                case 1:
                  if (r2.sent(), t2 = this.observer[e3], n2 = t2 && t2.remove ? t2.remove(e3) : null) throw n2;
                  return wn[this.dbname][e3] && delete wn[this.dbname][e3], [2, e3];
              }
            }));
          }));
        }, e2.prototype.removeMany = function(e3) {
          return L(this, void 0, void 0, (function() {
            var t2, n2, r2, i2, s2;
            return w(this, (function(a2) {
              switch (a2.label) {
                case 0:
                  return [4, Wt(this.delay)];
                case 1:
                  for (a2.sent(), t2 = 0, n2 = e3; t2 < n2.length; t2++) {
                    if (r2 = n2[t2], i2 = this.observer[r2], s2 = i2 && i2.remove ? i2.remove(r2) : null) throw s2;
                    wn[this.dbname][r2] && delete wn[this.dbname][r2];
                  }
                  return [2, e3];
              }
            }));
          }));
        }, e2.prototype.clear = function() {
          return L(this, void 0, void 0, (function() {
            return w(this, (function(e3) {
              switch (e3.label) {
                case 0:
                  return [4, Wt(this.delay)];
                case 1:
                  return e3.sent(), wn[this.dbname] = {}, [2];
              }
            }));
          }));
        }, e2;
      })(), Dn = "NestDBStore", Hn = (function() {
        function e2(e3) {
          void 0 === e3 && (e3 = {}), this.itemSizeLimit = 104857600;
          var t2 = e3.encryption, n2 = void 0 === t2 ? Ln : t2;
          this._window = "undefined" != typeof window ? window : null, this._indexedDB = this._window ? this._window.indexedDB || this._window.mozIndexedDB || this._window.webkitIndexedDB || this._window.msIndexedDB : null, this._encryption = n2;
        }
        return e2.prototype.init = function(e3) {
          return L(this, void 0, void 0, (function() {
            var t2, n2, r2 = this;
            return w(this, (function(i2) {
              switch (i2.label) {
                case 0:
                  return this.dbname = e3, [4, new Promise((function(e4, t3) {
                    if (r2._window && Cn) if (An) {
                      var n3 = r2._indexedDB.open("_testMozilla");
                      n3.onerror = function() {
                        return t3(qt.storeNotAvailableInPrivateBrowsing);
                      }, n3.onsuccess = function() {
                        return e4();
                      };
                    } else In ? r2._window.indexedDB || !r2._window.PointerEvent && !r2._window.MSPointerEvent || t3(qt.storeNotAvailableInPrivateBrowsing) : e4();
                    else t3(qt.storeNotAvailable);
                  }))];
                case 1:
                  return i2.sent(), t2 = this, [4, new Promise((function(t3, n3) {
                    var i3 = r2._indexedDB.open(e3);
                    i3.addEventListener("upgradeneeded", (function(e4) {
                      e4.target.result.createObjectStore(Dn, { keyPath: "key" });
                    })), i3.addEventListener("success", (function(e4) {
                      return t3(e4.target.result);
                    })), i3.addEventListener("error", (function(e4) {
                      return n3(e4.target.error);
                    }));
                  }))];
                case 2:
                  t2._database = i2.sent(), i2.label = 3;
                case 3:
                  return i2.trys.push([3, , 5, 7]), [4, this.get(Rn.key)];
                case 4:
                  if ((n2 = i2.sent()) && JSON.stringify(n2) !== JSON.stringify(Rn.value)) throw qt.storeEncryptionInvalid;
                  return [3, 7];
                case 5:
                  return [4, this.set(Rn)];
                case 6:
                  return i2.sent(), [7];
                case 7:
                  return [2];
              }
            }));
          }));
        }, e2.prototype.getAllKeys = function() {
          return L(this, void 0, void 0, (function() {
            var e3 = this;
            return w(this, (function(t2) {
              switch (t2.label) {
                case 0:
                  return [4, new Promise((function(t3, n2) {
                    var r2 = e3._database.transaction(Dn, "readonly").objectStore(Dn).getAllKeys();
                    r2.addEventListener("success", (function(e4) {
                      t3(e4.target.result.filter((function(e5) {
                        return e5 !== Rn.key;
                      })));
                    })), r2.addEventListener("error", (function(e4) {
                      return n2(e4.target.error);
                    }));
                  }))];
                case 1:
                  return [2, t2.sent()];
              }
            }));
          }));
        }, e2.prototype.get = function(e3) {
          return L(this, void 0, void 0, (function() {
            var t2 = this;
            return w(this, (function(n2) {
              switch (n2.label) {
                case 0:
                  return [4, new Promise((function(n3, r2) {
                    var i2 = t2._database.transaction(Dn, "readonly").objectStore(Dn).get(e3);
                    i2.addEventListener("success", (function(e4) {
                      return n3(e4.target.result ? t2._encryption.decrypt(e4.target.result.value) : null);
                    })), i2.addEventListener("error", (function(e4) {
                      return r2(e4.target.error);
                    }));
                  }))];
                case 1:
                  return [2, n2.sent()];
              }
            }));
          }));
        }, e2.prototype.set = function(e3) {
          return L(this, void 0, void 0, (function() {
            var t2, n2, r2 = this;
            return w(this, (function(i2) {
              switch (i2.label) {
                case 0:
                  return t2 = e3.key, n2 = e3.value, [4, new Promise((function(e4, i3) {
                    var s2 = r2._database.transaction(Dn, "readwrite").objectStore(Dn).put({ key: t2, value: r2._encryption.encrypt(n2) });
                    s2.addEventListener("success", (function(t3) {
                      e4(t3.target.result);
                    })), s2.addEventListener("error", (function(e5) {
                      return i3(e5.target.error);
                    }));
                  }))];
                case 1:
                  return i2.sent(), [2, n2];
              }
            }));
          }));
        }, e2.prototype.setMany = function(e3) {
          return L(this, void 0, void 0, (function() {
            var t2, n2, r2 = this;
            return w(this, (function(i2) {
              switch (i2.label) {
                case 0:
                  return t2 = [], n2 = this._database.transaction(Dn, "readwrite").objectStore(Dn), e3.forEach((function(e4) {
                    var i3 = e4.key, s2 = e4.value;
                    t2.push(new Promise((function(e5) {
                      var t3 = n2.put({ key: i3, value: r2._encryption.encrypt(s2) });
                      t3.addEventListener("success", (function(t4) {
                        e5(t4.target.result);
                      })), t3.addEventListener("error", (function() {
                        e5(qt.collectionWriteFailed);
                      }));
                    })));
                  })), [4, Promise.all(t2)];
                case 1:
                  return i2.sent(), [2, e3.map((function(e4) {
                    return e4.value;
                  }))];
              }
            }));
          }));
        }, e2.prototype.remove = function(e3) {
          return L(this, void 0, void 0, (function() {
            var t2 = this;
            return w(this, (function(n2) {
              switch (n2.label) {
                case 0:
                  return [4, new Promise((function(n3, r2) {
                    var i2 = t2._database.transaction(Dn, "readwrite").objectStore(Dn).delete(e3);
                    i2.addEventListener("success", (function() {
                      return n3(e3);
                    })), i2.addEventListener("error", (function(e4) {
                      return r2(e4.target.error);
                    }));
                  }))];
                case 1:
                  return [2, n2.sent()];
              }
            }));
          }));
        }, e2.prototype.removeMany = function(e3) {
          return L(this, void 0, void 0, (function() {
            var t2;
            return w(this, (function(n2) {
              switch (n2.label) {
                case 0:
                  return t2 = this._database.transaction(Dn, "readwrite").objectStore(Dn), [4, Promise.all(e3.map((function(e4) {
                    return new Promise((function(n3, r2) {
                      var i2 = t2.delete(e4);
                      i2.addEventListener("success", (function() {
                        return n3(e4);
                      })), i2.addEventListener("error", (function(e5) {
                        return r2(e5.target.error);
                      }));
                    }));
                  })))];
                case 1:
                  return [2, n2.sent()];
              }
            }));
          }));
        }, e2.prototype.clear = function() {
          return L(this, void 0, void 0, (function() {
            var e3 = this;
            return w(this, (function(t2) {
              switch (t2.label) {
                case 0:
                  return [4, new Promise((function(t3, n2) {
                    var r2 = e3._database.transaction(Dn, "readwrite").objectStore(Dn).clear();
                    r2.addEventListener("success", (function() {
                      return t3();
                    })), r2.addEventListener("error", (function(e4) {
                      return n2(e4.target.error);
                    }));
                  }))];
                case 1:
                  return [2, t2.sent()];
              }
            }));
          }));
        }, e2;
      })(), Fn = (function() {
        function e2(e3) {
          var t2 = e3.AsyncStorage, n2 = e3.encryption, r2 = void 0 === n2 ? Ln : n2;
          this.itemSizeLimit = 6291456, this._asyncStorage = t2, this._encryption = r2;
        }
        return e2.prototype._isBelonging = function(e3) {
          return e3.startsWith("".concat(this.dbname, "/"));
        }, e2.prototype._getActualKey = function(e3) {
          return "".concat(this.dbname, "/").concat(e3);
        }, e2.prototype.init = function(e3) {
          return L(this, void 0, void 0, (function() {
            var t2;
            return w(this, (function(n2) {
              switch (n2.label) {
                case 0:
                  this.dbname = e3, n2.label = 1;
                case 1:
                  return n2.trys.push([1, , 3, 5]), [4, this.get(Rn.key)];
                case 2:
                  if ((t2 = n2.sent()) && JSON.stringify(t2) !== JSON.stringify(Rn.value)) throw qt.storeEncryptionInvalid;
                  return [3, 5];
                case 3:
                  return [4, this.set(Rn)];
                case 4:
                  return n2.sent(), [7];
                case 5:
                  return [2];
              }
            }));
          }));
        }, e2.prototype.getAllKeys = function() {
          return L(this, void 0, void 0, (function() {
            var e3, t2, n2 = this;
            return w(this, (function(r2) {
              switch (r2.label) {
                case 0:
                  return e3 = this._getActualKey(Rn.key), [4, this._asyncStorage.getAllKeys()];
                case 1:
                  return t2 = r2.sent(), [2, t2.filter((function(t3) {
                    return n2._isBelonging(t3) && t3 !== e3;
                  })).map((function(e4) {
                    return e4.substring("".concat(n2.dbname, "/").length);
                  }))];
              }
            }));
          }));
        }, e2.prototype.get = function(e3) {
          return L(this, void 0, void 0, (function() {
            var t2;
            return w(this, (function(n2) {
              switch (n2.label) {
                case 0:
                  return [4, this._asyncStorage.getItem(this._getActualKey(e3))];
                case 1:
                  return [2, (t2 = n2.sent()) ? this._encryption.decrypt(JSON.parse(t2)) : null];
              }
            }));
          }));
        }, e2.prototype.set = function(e3) {
          return L(this, void 0, void 0, (function() {
            var t2, n2, r2;
            return w(this, (function(i2) {
              switch (i2.label) {
                case 0:
                  return t2 = e3.key, n2 = e3.value, r2 = JSON.stringify(this._encryption.encrypt(n2)), t2 === Rn.key || r2.length < this.itemSizeLimit ? [4, this._asyncStorage.setItem(this._getActualKey(t2), r2)] : [3, 2];
                case 1:
                  return i2.sent(), [2, JSON.parse(r2)];
                case 2:
                  throw qt.storeItemSizeExceeded;
              }
            }));
          }));
        }, e2.prototype.setMany = function(e3) {
          return L(this, void 0, void 0, (function() {
            var t2, n2, r2, i2, s2, a2, o2;
            return w(this, (function(l2) {
              switch (l2.label) {
                case 0:
                  t2 = [], n2 = 0, r2 = e3, l2.label = 1;
                case 1:
                  if (!(n2 < r2.length)) return [3, 8];
                  i2 = r2[n2], l2.label = 2;
                case 2:
                  return l2.trys.push([2, 6, , 7]), s2 = i2.key, a2 = i2.value, o2 = JSON.stringify(this._encryption.encrypt(a2)), s2 === Rn.key || o2.length < this.itemSizeLimit ? [4, this._asyncStorage.setItem(this._getActualKey(s2), o2)] : [3, 4];
                case 3:
                  return l2.sent(), t2.push(a2), [3, 5];
                case 4:
                  t2.push(qt.storeItemSizeExceeded), l2.label = 5;
                case 5:
                  return [3, 7];
                case 6:
                  return l2.sent(), t2.push(qt.collectionWriteFailed), [3, 7];
                case 7:
                  return n2++, [3, 1];
                case 8:
                  return [2, t2];
              }
            }));
          }));
        }, e2.prototype.remove = function(e3) {
          return L(this, void 0, void 0, (function() {
            return w(this, (function(t2) {
              switch (t2.label) {
                case 0:
                  return [4, this._asyncStorage.removeItem(this._getActualKey(e3))];
                case 1:
                  return t2.sent(), [2, e3];
              }
            }));
          }));
        }, e2.prototype.removeMany = function(e3) {
          return L(this, void 0, void 0, (function() {
            var t2, n2, r2;
            return w(this, (function(i2) {
              switch (i2.label) {
                case 0:
                  t2 = 0, n2 = e3, i2.label = 1;
                case 1:
                  return t2 < n2.length ? (r2 = n2[t2], [4, this._asyncStorage.removeItem(this._getActualKey(r2))]) : [3, 4];
                case 2:
                  i2.sent(), i2.label = 3;
                case 3:
                  return t2++, [3, 1];
                case 4:
                  return [2, e3];
              }
            }));
          }));
        }, e2.prototype.clear = function() {
          return L(this, void 0, void 0, (function() {
            var e3;
            return w(this, (function(t2) {
              switch (t2.label) {
                case 0:
                  return [4, this.getAllKeys()];
                case 1:
                  return e3 = t2.sent(), [4, this.removeMany(e3)];
                case 2:
                  return t2.sent(), [4, this.remove(Rn.key)];
                case 3:
                  return t2.sent(), [2];
              }
            }));
          }));
        }, e2;
      })(), Gn = (function() {
        function e2(e3) {
          var t2 = e3.MMKV, n2 = e3.encryption, r2 = void 0 === n2 ? Ln : n2;
          this.itemSizeLimit = 6291456, this._mmkv = t2, this._encryption = r2;
        }
        return e2.prototype._isBelonging = function(e3) {
          return e3.startsWith("".concat(this.dbname, "/"));
        }, e2.prototype._getActualKey = function(e3) {
          return "".concat(this.dbname, "/").concat(e3);
        }, e2.prototype.init = function(e3) {
          return L(this, void 0, void 0, (function() {
            var t2;
            return w(this, (function(n2) {
              switch (n2.label) {
                case 0:
                  this.dbname = e3, n2.label = 1;
                case 1:
                  return n2.trys.push([1, , 3, 5]), [4, this.get(Rn.key)];
                case 2:
                  if ((t2 = n2.sent()) && JSON.stringify(t2) !== JSON.stringify(Rn.value)) throw qt.storeEncryptionInvalid;
                  return [3, 5];
                case 3:
                  return [4, this.set(Rn)];
                case 4:
                  return n2.sent(), [7];
                case 5:
                  return [2];
              }
            }));
          }));
        }, e2.prototype.getAllKeys = function() {
          return L(this, void 0, void 0, (function() {
            var e3, t2, n2 = this;
            return w(this, (function(r2) {
              return e3 = this._getActualKey(Rn.key), t2 = this._mmkv.getAllKeys(), [2, t2.filter((function(t3) {
                return n2._isBelonging(t3) && t3 !== e3;
              })).map((function(e4) {
                return e4.substr("".concat(n2.dbname, "/").length);
              }))];
            }));
          }));
        }, e2.prototype.get = function(e3) {
          return L(this, void 0, void 0, (function() {
            var t2;
            return w(this, (function(n2) {
              switch (n2.label) {
                case 0:
                  return [4, this._mmkv.getString(this._getActualKey(e3))];
                case 1:
                  return [2, (t2 = n2.sent()) ? this._encryption.decrypt(JSON.parse(t2)) : null];
              }
            }));
          }));
        }, e2.prototype.set = function(e3) {
          return L(this, void 0, void 0, (function() {
            var t2, n2, r2;
            return w(this, (function(i2) {
              if (t2 = e3.key, n2 = e3.value, r2 = JSON.stringify(this._encryption.encrypt(n2)), t2 === Rn.key || r2.length < this.itemSizeLimit) return this._mmkv.set(this._getActualKey(t2), r2), [2, JSON.parse(r2)];
              throw qt.storeItemSizeExceeded;
            }));
          }));
        }, e2.prototype.setMany = function(e3) {
          return L(this, void 0, void 0, (function() {
            var t2, n2, r2, i2, s2, a2, o2;
            return w(this, (function(l2) {
              for (t2 = [], n2 = 0, r2 = e3; n2 < r2.length; n2++) {
                i2 = r2[n2];
                try {
                  s2 = i2.key, a2 = i2.value, o2 = JSON.stringify(this._encryption.encrypt(a2)), s2 === Rn.key || o2.length < this.itemSizeLimit ? (this._mmkv.set(this._getActualKey(s2), o2), t2.push(a2)) : t2.push(qt.storeItemSizeExceeded);
                } catch (e4) {
                  t2.push(qt.collectionWriteFailed);
                }
              }
              return [2, t2];
            }));
          }));
        }, e2.prototype.remove = function(e3) {
          return L(this, void 0, void 0, (function() {
            return w(this, (function(t2) {
              return this._mmkv.delete(this._getActualKey(e3)), [2, e3];
            }));
          }));
        }, e2.prototype.removeMany = function(e3) {
          return L(this, void 0, void 0, (function() {
            var t2, n2, r2;
            return w(this, (function(i2) {
              for (t2 = 0, n2 = e3; t2 < n2.length; t2++) r2 = n2[t2], this._mmkv.delete(this._getActualKey(r2));
              return [2, e3];
            }));
          }));
        }, e2.prototype.clear = function() {
          return L(this, void 0, void 0, (function() {
            var e3;
            return w(this, (function(t2) {
              switch (t2.label) {
                case 0:
                  return [4, this.getAllKeys()];
                case 1:
                  return e3 = t2.sent(), [4, this.removeMany(e3)];
                case 2:
                  return t2.sent(), [4, this.remove(Rn.key)];
                case 3:
                  return t2.sent(), [2];
              }
            }));
          }));
        }, e2;
      })(), xn = "[NESTDB]", jn = true, Bn = (function() {
        function e2() {
        }
        return e2.off = function() {
          jn = false;
        }, e2.log = function() {
          for (var e3 = [], t2 = 0; t2 < arguments.length; t2++) e3[t2] = arguments[t2];
          jn && console.log.apply(console, P(["".concat(xn, "[LOG]")], e3, false));
        }, e2.warning = function() {
          for (var e3 = [], t2 = 0; t2 < arguments.length; t2++) e3[t2] = arguments[t2];
          jn && console.warn.apply(console, P(["".concat(xn, "[WARNING]")], e3, false));
        }, e2.error = function() {
          for (var e3 = [], t2 = 0; t2 < arguments.length; t2++) e3[t2] = arguments[t2];
          jn && console.error.apply(console, P(["".concat(xn, "[ERROR]")], e3, false));
        }, e2;
      })();
      !(function(e2) {
        e2.INIT = "INIT", e2.OPENING = "OPENING", e2.OPENED = "OPENED", e2.CLOSED = "CLOSED";
      })(Un || (Un = {}));
      var Vn, qn, Kn, zn, Yn, Qn, Wn, Jn = (function() {
        function e2(e3) {
          var t2 = e3.name, n2 = e3.version, r2 = e3.store, i2 = e3.config;
          this.name = t2, this._version = n2, this._state = Un.INIT, this._config = i2 || new Bt({ dbname: t2 }), this._store = r2, this._event = { success: Xt, error: Xt, upgrade: en }, this._collections = /* @__PURE__ */ new Map(), this._globalMutex = new Mn("".concat(this.name, ".lock")), this._config.disableLogger && Bn.off(), new yn({ dbname: t2, limit: this._config.cacheLimit });
        }
        return Object.defineProperty(e2.prototype, "version", { get: function() {
          return this._version;
        }, enumerable: false, configurable: true }), Object.defineProperty(e2.prototype, "state", { get: function() {
          return this._state;
        }, enumerable: false, configurable: true }), e2.prototype.commitSchema = function(e3) {
          return L(this, void 0, void 0, (function() {
            var t2 = this;
            return w(this, (function(n2) {
              switch (n2.label) {
                case 0:
                  return this._state !== Un.OPENING ? [3, 2] : [4, Promise.all(e3.map((function(e4) {
                    return L(t2, void 0, void 0, (function() {
                      var t3, n3, r2, i2;
                      return w(this, (function(s2) {
                        switch (s2.label) {
                          case 0:
                            return t3 = e4.collectionName, n3 = e4.keyName, r2 = e4.index, i2 = void 0 === r2 ? [] : r2, this._collections.has(t3) || this._collections.set(t3, new kn({ dbname: this.name, collectionName: t3, keyName: n3, keyHash: e4.keyHash || null, indexes: i2, store: this._store })), [4, this._collections.get(t3).init()];
                          case 1:
                            return s2.sent(), [2];
                        }
                      }));
                    }));
                  })))];
                case 1:
                  return n2.sent(), [3, 3];
                case 2:
                  throw qt.databaseSchemaNotOnUpgrade;
                case 3:
                  return [2];
              }
            }));
          }));
        }, e2.prototype.open = function() {
          var e3;
          return L(this, void 0, void 0, (function() {
            var t2, n2, r2, i2, s2 = this;
            return w(this, (function(a2) {
              switch (a2.label) {
                case 0:
                  return [4, this._globalMutex.lock()];
                case 1:
                  if (a2.sent(), this._state === Un.OPENED) return [3, 15];
                  this._state = Un.OPENING, a2.label = 2;
                case 2:
                  return a2.trys.push([2, 5, , 15]), [4, this._store.init(this.name)];
                case 3:
                  return a2.sent(), o2 = this.name, t2 = "".concat(ln(o2), ".metadata"), n2 = { version: 0, collectionNames: [] }, [4, this._store.get(t2)];
                case 4:
                  return r2 = null !== (e3 = a2.sent()) && void 0 !== e3 ? e3 : n2, [2, new Promise((function(e4, n3) {
                    var i3 = function(e5) {
                      r2.version < s2._version ? s2._event.upgrade(r2.version, (function(n4) {
                        return L(s2, void 0, void 0, (function() {
                          var i4;
                          return w(this, (function(s3) {
                            switch (s3.label) {
                              case 0:
                                if (n4) return [3, 5];
                                r2.version++, r2.collectionNames = Array.from(this._collections.keys()), s3.label = 1;
                              case 1:
                                return s3.trys.push([1, 3, , 4]), [4, this._store.set({ key: t2, value: r2, generation: this._version })];
                              case 2:
                                return s3.sent(), e5({ continued: true }), [3, 4];
                              case 3:
                                return i4 = s3.sent(), e5({ continued: false, err: i4 }), [3, 4];
                              case 4:
                                return [3, 6];
                              case 5:
                                e5({ continued: false, err: n4 }), s3.label = 6;
                              case 6:
                                return [2];
                            }
                          }));
                        }));
                      })) : e5({ continued: false });
                    }, a3 = function(t3) {
                      var o3 = t3.continued, l2 = void 0 !== o3 && o3, u2 = t3.err, c2 = void 0 === u2 ? null : u2;
                      if (l2) setTimeout((function() {
                        return i3(a3);
                      }), 10);
                      else if (c2) Bn.error(c2.message), s2._globalMutex.unlock(), s2._event.error(c2), n3(c2);
                      else {
                        var d2 = [];
                        r2.collectionNames.forEach((function(e5) {
                          s2._collections.has(e5) || d2.push(L(s2, void 0, void 0, (function() {
                            var t4, n4;
                            return w(this, (function(r3) {
                              switch (r3.label) {
                                case 0:
                                  return [4, kn.metadataOf(this.name, e5, this._store)];
                                case 1:
                                  return (t4 = r3.sent()) ? (n4 = new kn({ dbname: this.name, collectionName: e5, keyName: t4.keyName, indexes: t4.indexes, store: this._store }), this._collections.set(e5, n4), [4, n4.init()]) : [3, 3];
                                case 2:
                                  r3.sent(), r3.label = 3;
                                case 3:
                                  return [2];
                              }
                            }));
                          })));
                        })), Promise.all(d2).then((function() {
                          s2._state = Un.OPENED, s2._globalMutex.unlock(), s2._event.success(), e4();
                        })).catch((function(e5) {
                          Bn.error(e5.message), s2._globalMutex.unlock(), s2._event.error(e5), n3(e5);
                        }));
                      }
                    };
                    i3(a3);
                  }))];
                case 5:
                  switch (i2 = a2.sent(), i2.code) {
                    case xt.STORE_NOT_AVAILABLE_IN_PRIVATE_BROWSING:
                      return [3, 6];
                    case xt.STORE_NOT_AVAILABLE:
                      return [3, 8];
                    case xt.STORE_ENCRYPTION_INVALID:
                      return [3, 10];
                  }
                  return [3, 13];
                case 6:
                  return Bn.warning("Access to the local storage is not allowed in private browsing. Switched to MemoryStore automatically."), this._store = new Pn({}), this._globalMutex.unlock(), this._event.error(i2), [4, this.open()];
                case 7:
                  return a2.sent(), [3, 14];
                case 8:
                  return Bn.warning("IndexedDB is not available in this environment. Switched to MemoryStore automatically. Consider using other store to save data persistently (e.g. AsyncStorage)."), this._store = new Pn({}), this._globalMutex.unlock(), this._event.error(i2), [4, this.open()];
                case 9:
                  return a2.sent(), [3, 14];
                case 10:
                  return Bn.warning("Encryption algorithm has changed. Stored data would be cleared."), [4, this._store.clear()];
                case 11:
                  return a2.sent(), this._globalMutex.unlock(), this._event.error(i2), [4, this.open()];
                case 12:
                  return a2.sent(), [3, 14];
                case 13:
                  throw Bn.error(i2.message), this._globalMutex.unlock(), this._event.error(i2), i2;
                case 14:
                  return [3, 15];
                case 15:
                  return [2];
              }
              var o2;
            }));
          }));
        }, e2.prototype.close = function() {
          this._state = Un.CLOSED, this._collections.forEach((function(e3) {
            return e3.close();
          }));
        }, e2.prototype.reset = function() {
          return L(this, void 0, void 0, (function() {
            var e3, t2 = this;
            return w(this, (function(n2) {
              switch (n2.label) {
                case 0:
                  return (e3 = yn.get(this.name)) && e3.clearByCondition((function(e4) {
                    return e4.key.startsWith(ln(t2.name));
                  })), [4, this._store.clear()];
                case 1:
                  return n2.sent(), [2];
              }
            }));
          }));
        }, e2.prototype.on = function(e3, t2) {
          this._event[e3] = t2;
        }, e2.prototype.off = function(e3) {
          if ("function" == typeof this._event[e3]) if ("upgrade" === e3) this._event[e3] = en;
          else this._event[e3] = Xt;
        }, e2.prototype.collection = function(e3) {
          return this._collections.get(e3) || null;
        }, e2;
      })(), Xn = (function() {
        function e2() {
        }
        return e2.create = function() {
          return "".concat(Math.floor(1e5 * Math.random()), "-").concat((/* @__PURE__ */ new Date()).getTime());
        }, e2;
      })();
      !(function(e2) {
        e2.AND = "AND", e2.OR = "OR";
      })(Vn || (Vn = {})), (function(e2) {
        e2.MEMBER_NICKNAME = "member_nickname", e2.CHANNEL_NAME = "channel_name";
      })(qn || (qn = {})), (function(e2) {
        e2.ALL = "all", e2.JOINED = "joined_only", e2.INVITED = "invited_only", e2.INVITED_BY_FRIEND = "invited_by_friend", e2.INVITED_BY_NON_FRIEND = "invited_by_non_friend";
      })(Kn || (Kn = {})), (function(e2) {
        e2.ALL = "all", e2.SUPER = "super", e2.NON_SUPER = "nonsuper";
      })(zn || (zn = {})), (function(e2) {
        e2.ALL = "all", e2.PUBLIC = "public", e2.PRIVATE = "private";
      })(Yn || (Yn = {})), (function(e2) {
        e2.ALL = "all", e2.UNREAD_MESSAGE = "unread_message";
      })(Qn || (Qn = {})), (function(e2) {
        e2.ALL = "all", e2.UNHIDDEN = "unhidden_only", e2.HIDDEN = "hidden_only", e2.HIDDEN_ALLOW_AUTO_UNHIDE = "hidden_allow_auto_unhide", e2.HIDDEN_PREVENT_AUTO_UNHIDE = "hidden_prevent_auto_unhide";
      })(Wn || (Wn = {}));
      var Zn = (function() {
        function e2() {
          this._iid = null, this._searchFilter = {}, this._userIdsFilter = { userIds: [], includeMode: true, queryType: Vn.AND }, this.includeEmpty = false, this.nicknameContainsFilter = "", this.nicknameStartsWithFilter = "", this.nicknameExactMatchFilter = "", this.channelNameContainsFilter = "", this.memberStateFilter = Kn.ALL, this.customTypesFilter = [], this.channelUrlsFilter = [], this.superChannelFilter = zn.ALL, this.publicChannelFilter = Yn.ALL, this.customTypeStartsWithFilter = null, this.unreadChannelFilter = Qn.ALL, this.hiddenChannelFilter = Wn.UNHIDDEN, this.includeFrozen = true;
        }
        return Object.defineProperty(e2.prototype, "searchFilter", { get: function() {
          return this._searchFilter;
        }, enumerable: false, configurable: true }), e2.prototype._isFriend = function(e3) {
          return !!e3.friendDiscoveryKey || !!e3.friendName;
        }, Object.defineProperty(e2.prototype, "iid", { set: function(e3) {
          this._iid = e3;
        }, enumerable: false, configurable: true }), e2.prototype.setSearchFilter = function(e3, t2) {
          Array.isArray(e3) && 0 !== e3.length && "string" == typeof t2 && t2 && (this._searchFilter = { searchQuery: t2, searchFields: e3 });
        }, Object.defineProperty(e2.prototype, "userIdsFilter", { get: function() {
          return this._userIdsFilter;
        }, enumerable: false, configurable: true }), e2.prototype.setUserIdsFilter = function(e3, t2, n2) {
          void 0 === n2 && (n2 = Vn.AND), this._userIdsFilter = { userIds: e3, includeMode: t2, queryType: n2 };
        }, e2.prototype.clone = function() {
          var t2 = new e2();
          t2.setSearchFilter(this.searchFilter.searchFields, this.searchFilter.searchQuery), t2.setUserIdsFilter(this.userIdsFilter.userIds, this.userIdsFilter.includeMode, this.userIdsFilter.queryType);
          var n2 = JSON.parse(JSON.stringify(this));
          return Object.keys(n2).forEach((function(e3) {
            t2[e3] = n2[e3];
          })), t2;
        }, e2.prototype.match = function(e3) {
          var t2 = this._searchFilter, n2 = t2.searchQuery, r2 = t2.searchFields;
          if (n2 && r2 && r2.length > 0 && !r2.some((function(t3) {
            switch (t3) {
              case qn.CHANNEL_NAME:
                return e3.name.toLowerCase().includes(n2.toLowerCase());
              case qn.MEMBER_NICKNAME:
                return e3.members.some((function(e4) {
                  return e4.nickname.toLowerCase().includes(n2.toLowerCase());
                }));
              default:
                return true;
            }
          }))) return false;
          var i2 = this._userIdsFilter, s2 = i2.includeMode, a2 = i2.queryType, o2 = i2.userIds, l2 = O.get(this._iid).get("currentUserId"), u2 = e3.members.map((function(e4) {
            return e4.userId;
          }));
          if (s2) {
            if (o2.length > 0) switch (a2) {
              case Vn.AND:
                if (o2.some((function(e4) {
                  return !u2.includes(e4);
                }))) return false;
                break;
              case Vn.OR:
                if (o2.every((function(e4) {
                  return !u2.includes(e4);
                }))) return false;
            }
          } else {
            if (o2.includes(l2) || o2.push(l2), e3.members.length > o2.length) return false;
            if (!(function(e4, t3) {
              if (e4 === t3) return true;
              if (null == e4 || null == t3) return false;
              if (e4.length !== t3.length) return false;
              for (var n3 = P([], e4, true).sort(), r3 = P([], t3, true).sort(), i3 = 0; i3 < n3.length; ++i3) if (n3[i3] !== r3[i3]) return false;
              return true;
            })(o2, u2)) return false;
          }
          if (!this.includeEmpty && !e3.lastMessage) return false;
          if (!this.includeFrozen && e3.isFrozen) return false;
          if (this.customTypesFilter.length > 0 && !this.customTypesFilter.includes(e3.customType)) return false;
          if (this.customTypeStartsWithFilter && !new RegExp("^".concat(this.customTypeStartsWithFilter)).test(e3.customType)) return false;
          if (this.channelNameContainsFilter && !e3.name.toLowerCase().includes(this.channelNameContainsFilter.toLowerCase())) return false;
          if (this.nicknameContainsFilter) {
            var c2 = this.nicknameContainsFilter.toLowerCase();
            if (!e3.members.some((function(e4) {
              return e4.userId !== l2 && e4.nickname.toLowerCase().includes(c2);
            }))) return false;
          }
          if (this.nicknameStartsWithFilter) {
            var d2 = this.nicknameStartsWithFilter.toLowerCase();
            if (!e3.members.some((function(e4) {
              return e4.userId !== l2 && e4.nickname.toLowerCase().startsWith(d2);
            }))) return false;
          }
          if (this.nicknameExactMatchFilter) {
            var h2 = this.nicknameExactMatchFilter.toLowerCase();
            if (!e3.members.some((function(e4) {
              return e4.userId !== l2 && e4.nickname.toLowerCase() !== h2;
            }))) return false;
          }
          if (this.channelUrlsFilter.length > 0 && !this.channelUrlsFilter.includes(e3.url)) return false;
          if (this.memberStateFilter) switch (this.memberStateFilter) {
            case Kn.JOINED:
              if ("joined" !== e3.myMemberState) return false;
              break;
            case Kn.INVITED:
              if ("invited" !== e3.myMemberState) return false;
              break;
            case Kn.INVITED_BY_FRIEND:
              if ("invited" !== e3.myMemberState || !this._isFriend(e3.inviter)) return false;
              break;
            case Kn.INVITED_BY_NON_FRIEND:
              if ("invited" !== e3.myMemberState || this._isFriend(e3.inviter)) return false;
          }
          if (this.hiddenChannelFilter) switch (this.hiddenChannelFilter) {
            case Wn.UNHIDDEN:
              if (e3.isHidden || "unhidden" !== e3.hiddenState) return false;
              break;
            case Wn.HIDDEN:
              if (!e3.isHidden) return false;
              break;
            case Wn.HIDDEN_ALLOW_AUTO_UNHIDE:
              if (!e3.isHidden || "hidden_allow_auto_unhide" !== e3.hiddenState) return false;
              break;
            case Wn.HIDDEN_PREVENT_AUTO_UNHIDE:
              if (!e3.isHidden || "hidden_prevent_auto_unhide" !== e3.hiddenState) return false;
          }
          if (this.unreadChannelFilter && this.unreadChannelFilter === Qn.UNREAD_MESSAGE) {
            if (0 === e3.unreadMessageCount) return false;
          }
          if (this.publicChannelFilter) switch (this.publicChannelFilter) {
            case Yn.PUBLIC:
              if (!e3.isPublic || "none" === e3.myMemberState) return false;
              break;
            case Yn.PRIVATE:
              if (e3.isPublic) return false;
          }
          if (this.superChannelFilter) switch (this.superChannelFilter) {
            case zn.SUPER:
              if (!e3.isSuper) return false;
              break;
            case zn.NON_SUPER:
              if (e3.isSuper) return false;
          }
          return true;
        }, e2.QueryType = Vn, e2.SearchField = qn, e2.MemberStateFilter = Kn, e2.SuperChannelFilter = zn, e2.PublicChannelFilter = Yn, e2.UnreadChannelFilter = Qn, e2.HiddenChannelFilter = Wn, e2;
      })(), $n = (function() {
        function e2(e3) {
          var t2 = e3.iid;
          this._iid = t2, this._filter = new Zn(), this._filter.iid = this._iid, this._order = Le.LATEST_LAST_MESSAGE, this._limit = 20;
        }
        return e2.prototype.setFilter = function(e3) {
          return this._filter = e3.clone(), this._filter.iid = this._iid, this;
        }, e2.prototype.setOrder = function(e3) {
          return this._order = e3, this;
        }, e2.prototype.setLimit = function(e3) {
          return this._limit = e3, this;
        }, e2.prototype.build = function() {
          return new Xe({ iid: this._iid, filter: this._filter, order: this._order, limit: this._limit });
        }, e2;
      })(), er = (function() {
        function e2(e3) {
          var t2 = e3.iid, n2 = e3.channel;
          this._iid = t2, this._channel = n2, this._startingPoint = Date.now(), this._filter = new et(), this._limit = 100;
        }
        return e2.prototype.setFilter = function(e3) {
          return this._filter = e3.clone(), this;
        }, e2.prototype.setStartingPoint = function(e3) {
          return this._startingPoint = e3, this;
        }, e2.prototype.setLimit = function(e3) {
          return this._limit = e3, this;
        }, e2.prototype.build = function() {
          return new Ut({ iid: this._iid, channel: this._channel, startingPoint: this._startingPoint, filter: this._filter, limit: this._limit });
        }, e2;
      })(), tr = {}, nr = {}, rr = /* @__PURE__ */ new WeakMap(), ir = /* @__PURE__ */ new WeakMap(), sr = /* @__PURE__ */ new WeakMap(), ar = (function(e2) {
        f(n2, e2);
        var t2 = E(n2);
        function n2(e3) {
          var r2;
          return c(this, n2), (r2 = t2.call(this, e3)).channelType = Rt.CHANNEL_TYPE_GROUP, r2.isDistinct = false, r2.isSuper = false, r2.isBroadcast = false, r2.isPublic = false, r2.unreadMessageCount = 0, r2.inviter = null, r2.members = [], r2.memberMap = {}, r2.lastMessage = null, r2.memberCount = 0, r2.joinedMemberCount = 0, r2.cachedReadReceiptStatus = {}, r2.cachedDeliveryReceiptStatus = null, r2.myPushTriggerOption = n2.PushTriggerOption.DEFAULT, r2.isPushEnabled, r2.isHidden = false, r2.hiddenState = n2.HiddenState.UNHIDDEN, r2.isDiscoverable = true, r2.myLastRead = 0, r2.messageSurvivalSeconds = -1, r2.invitedAt = 0, r2.joinedAt = 0, r2._messageOffsetTimestamp = 0, r2._cachedLastDeliveredReceipt = { sentAt: 0, timeout: null }, rr.set(y(r2), {}), ir.set(y(r2), { start: 0, end: 0 }), sr.set(y(r2), 0), e3 && r2._update(e3), r2;
        }
        return h(n2, [{ key: "messageOffsetTimestamp", get: function() {
          return this._messageOffsetTimestamp;
        } }, { key: "createMessageCollection", value: function() {
          return new er({ iid: this._iid, channel: this });
        } }, { key: "_setGroupChannelUnreadCount", value: function(e3, t3) {
          try {
            if ("number" == typeof e3 && e3 >= 0) if ("all" === this.myCountPreference || "unread_message_count_only" === this.myCountPreference) if (this.isSuper || this.isBroadcast) {
              var n3 = O.get(this._iid).container.maxUnreadCountOfSuperGroupChannel;
              this.unreadMessageCount = e3 >= n3 ? n3 : e3;
            } else this.unreadMessageCount = e3;
            else this.unreadMessageCount = 0;
            "number" == typeof t3 && t3 >= 0 && ("all" === this.myCountPreference || "unread_mention_count_only" === this.myCountPreference ? this.unreadMentionCount = t3 : this.unreadMentionCount = 0);
          } catch (e4) {
          }
        } }, { key: "_update", value: function(e3) {
          var t3 = this, n3 = x.get(this._iid), r2 = n3.BaseChannel, i2 = n3.GroupChannel, s2 = n3.User, a2 = n3.Member;
          if (this.isAccessCodeRequired = !!e3.is_access_code_required && e3.is_access_code_required, this.isDistinct = !!e3.is_distinct && e3.is_distinct, this.isPushEnabled = !!e3.is_push_enabled && e3.is_push_enabled, this.isHidden = !!e3.hasOwnProperty("is_hidden") && e3.is_hidden, this.myPushTriggerOption = e3.push_trigger_option ? e3.push_trigger_option : i2.PushTriggerOption.DEFAULT, this.myCountPreference = e3.hasOwnProperty("count_preference") ? e3.count_preference : i2.CountPreference.ALL, this.unreadMessageCount = 0, this.unreadMentionCount = 0, this._setGroupChannelUnreadCount(parseInt(e3.unread_message_count), parseInt(e3.unread_mention_count)), e3.hasOwnProperty("read_receipt") && (this.cachedReadReceiptStatus = {}, Object.keys(e3.read_receipt).forEach((function(n4) {
            var r3 = e3.read_receipt[n4];
            t3.updateReadReceipt(n4, parseInt(r3));
          }))), e3.hasOwnProperty("delivery_receipt") && "object" === u(e3.delivery_receipt) && null !== e3.delivery_receipt && (this.cachedDeliveryReceiptStatus || (this.cachedDeliveryReceiptStatus = {}), Object.keys(e3.delivery_receipt).forEach((function(n4) {
            var r3 = e3.delivery_receipt[n4];
            t3.updateDeliveryReceipt(n4, parseInt(r3));
          }))), e3.hasOwnProperty("user_last_read") && "number" == typeof e3.user_last_read ? this.myLastRead = e3.user_last_read : this.myLastRead = 0, e3.hasOwnProperty("members")) {
            this.members = [], this.memberMap = {};
            for (var o2 = 0; o2 < e3.members.length; o2++) {
              var l2 = new a2(e3.members[o2]);
              this.members.push(l2), this.memberMap[l2.userId] = l2;
            }
          }
          this.myMemberState = e3.member_state || "none", this.myRole = e3.my_role || i2.Role.NONE, e3.hasOwnProperty("is_muted") ? "string" == typeof e3.is_muted ? this.myMutedState = e3.is_muted : "boolean" == typeof e3.is_muted ? this.myMutedState = e3.is_muted ? "muted" : "unmuted" : this.myMutedState = "unmuted" : this.myMutedState = "unmuted", e3.hasOwnProperty("member_count") && (this.memberCount = parseInt(e3.member_count)), e3.hasOwnProperty("joined_member_count") && (this.joinedMemberCount = parseInt(e3.joined_member_count)), e3.hasOwnProperty("last_message") && "object" === u(e3.last_message) && e3.last_message ? e3.last_message instanceof pt ? this.lastMessage = e3.last_message : this.lastMessage = r2.buildMessage(e3.last_message, this) : this.lastMessage = null, e3.hasOwnProperty("inviter") && null !== e3.inviter && "object" === u(e3.inviter) && Object.keys(e3.inviter).length > 0 ? this.inviter = new s2(e3.inviter) : this.inviter = null, this.invitedAt = e3.invited_at || 0, this.joinedAt = e3.joined_ts || 0, e3.hasOwnProperty("is_super") && "boolean" == typeof e3.is_super ? this.isSuper = e3.is_super : this.isSuper = false, e3.hasOwnProperty("is_broadcast") && "boolean" == typeof e3.is_broadcast ? this.isBroadcast = e3.is_broadcast : this.isBroadcast = false, e3.hasOwnProperty("is_public") && "boolean" == typeof e3.is_public ? this.isPublic = e3.is_public : this.isPublic = false, e3.hasOwnProperty("hidden_state") ? this.hiddenState = e3.hidden_state : this.hiddenState = i2.HiddenState.UNHIDDEN, e3.hasOwnProperty("is_discoverable") && "boolean" == typeof e3.is_discoverable ? this.isDiscoverable = e3.is_discoverable : this.isDiscoverable = this.isPublic, e3.hasOwnProperty("ts_message_offset") && (this._messageOffsetTimestamp = e3.ts_message_offset), e3.hasOwnProperty("message_survival_seconds") && "number" == typeof e3.message_survival_seconds && (this.messageSurvivalSeconds = e3.message_survival_seconds);
        } }, { key: "addMember", value: function(e3) {
          var t3 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0;
          if (!this.isSuper && !this.isBroadcast) {
            var n3 = x.get(this._iid), r2 = n3.Member, i2 = this.removeMember(e3);
            i2 && i2.state === r2.JOINED && (e3.state = r2.JOINED), this.memberMap[e3.userId] = e3, this.members.push(e3), this.memberCount++, this.updateReadReceipt(e3.userId, t3), this.updateDeliveryReceipt(e3.userId, t3);
          }
        } }, { key: "removeMember", value: function(e3) {
          var t3 = null;
          if (!this.isSuper && !this.isBroadcast && this.memberMap.hasOwnProperty(e3.userId)) {
            delete this.memberMap[e3.userId];
            for (var n3 = 0; n3 < this.members.length; n3++) {
              var r2 = this.members[n3];
              if (r2.userId === e3.userId) {
                t3 = r2, this.members.splice(n3, 1);
                break;
              }
            }
            this.memberCount--;
          }
          return t3;
        } }, { key: "parse", value: function(e3) {
          this._update(e3);
        } }, { key: "update", value: function(e3) {
          this.__update(e3), this._update(e3);
        } }, { key: "isIdentical", value: function(e3) {
          return e3 && this.url === e3.url;
        } }, { key: "isEqual", value: function(e3) {
          return se.deepEqual(this, e3);
        } }, { key: "createMemberListQuery", value: function() {
          return new (0, x.get(this._iid).MemberListQuery)(this.url);
        } }, { key: "createBannedUserListQuery", value: function() {
          return new (0, x.get(this._iid).BannedUserListQuery)({ channelUrl: this.url, isOpenChannel: this.isOpenChannel() });
        } }, { key: "refresh", value: function(e3) {
          return x.get(this._iid).GroupChannel.getChannelWithoutCache(this.url, e3);
        } }, { key: "updateChannel", value: function() {
          var e3 = this, t3 = me.toArray(arguments), n3 = void 0;
          "function" == typeof t3[t3.length - 1] && (n3 = t3.pop());
          var r2 = x.get(this._iid), i2 = r2.GroupChannel, s2 = r2.GroupChannelParams;
          if (t3[0] instanceof s2 && 1 === t3.length) return oe(this._iid, (function(n4) {
            var r3 = t3[0];
            (r3.channelUrl = e3.url, r3._validate()) ? O.get(e3._iid).container.apiClient.updateGroupChannel(l(l({}, r3), {}, { operatorUserIds: r3.operatorUserIds }), (function(e4, t4) {
              var r4 = null;
              e4 || (r4 = i2.upsert(t4)), n4(e4, r4);
            })) : n4(me.error, null);
          }), n3);
          if (3 === t3.length) {
            var a2 = new s2();
            return a2.channelUrl = this.url, a2.name = t3[0], "string" == typeof t3[1] ? a2.coverUrl = t3[1] : a2.coverImage = t3[1], a2.data = t3[2], n3 ? this.updateChannel(a2, n3) : this.updateChannel(a2);
          }
          if (4 === t3.length) {
            var o2 = new s2();
            return o2.channelUrl = this.url, o2.isDistinct = t3[0], o2.name = t3[1], "string" == typeof t3[1] ? o2.coverUrl = t3[2] : o2.coverImage = t3[2], o2.data = t3[3], n3 ? this.updateChannel(o2, n3) : this.updateChannel(o2);
          }
          if (5 === t3.length) {
            var u2 = new s2();
            return u2.channelUrl = this.url, u2.isDistinct = t3[0], u2.name = t3[1], "string" == typeof t3[2] ? u2.coverUrl = t3[2] : u2.coverImage = t3[2], u2.data = t3[3], u2.customType = t3[4], n3 ? this.updateChannel(u2, n3) : this.updateChannel(u2);
          }
          return oe(this._iid, (function(e4) {
            return e4(me.error, null);
          }), n3);
        } }, { key: "invite", value: function(e3, t3) {
          var n3 = null, r2 = me.parse(arguments, [new me({ type: "array", constraint: function(e4) {
            return e4.length > 0 && e4.every((function(e5) {
              return !!e5.userId && "string" == typeof e5.userId;
            }));
          } }), new me({ type: "callback" })]), i2 = C(r2, 3);
          return n3 = i2[0], e3 = i2[1], t3 = i2[2], n3 ? oe(this._iid, (function(e4) {
            return e4(me.error, null);
          }), t3) : this.inviteWithUserIds(e3.map((function(e4) {
            return e4.userId;
          })), t3);
        } }, { key: "inviteWithUserIds", value: function(e3, t3) {
          var n3 = this, r2 = null, i2 = me.parse(arguments, [new me({ type: "array", constraint: function(e4) {
            return e4.every((function(e5) {
              return "string" == typeof e5;
            }));
          } }), new me({ type: "callback" })]), s2 = C(i2, 3);
          return r2 = s2[0], e3 = s2[1], t3 = s2[2], oe(this._iid, (function(t4) {
            r2 ? t4(r2, null) : O.get(n3._iid).container.apiClient.inviteToGroupChannel({ channelUrl: n3.url, userIds: e3 }, (function(e4, r3) {
              var i3 = null;
              e4 || (i3 = x.get(n3._iid).GroupChannel.upsert(r3));
              t4(e4, i3);
            }));
          }), t3);
        } }, { key: "acceptInvitation", value: function(e3, t3) {
          var n3 = this, r2 = null, i2 = me.parse(arguments, [new me({ type: "string", optional: true, defaultValue: null }), new me({ type: "callback" })]), s2 = C(i2, 3);
          return r2 = s2[0], e3 = s2[1], t3 = s2[2], oe(this._iid, (function(t4) {
            r2 ? t4(r2, null) : O.get(n3._iid).container.apiClient.acceptInvitation({ channelUrl: n3.url, accessCode: e3 }, (function(e4, r3) {
              var i3 = null;
              e4 || ((i3 = x.get(n3._iid).GroupChannel.upsert(r3)).myMemberState = "joined");
              t4(e4, i3);
            }));
          }), t3);
        } }, { key: "declineInvitation", value: function(e3) {
          var t3 = this;
          return oe(this._iid, (function(e4) {
            O.get(t3._iid).container.apiClient.declineInvitation({ channelUrl: t3.url }, (function(n3, r2) {
              var i2 = null;
              if (!n3) {
                var s2 = x.get(t3._iid).GroupChannel;
                (i2 = s2.upsert(r2)).myMemberState = "none", t3.isPublic || s2.removeCachedChannel(t3.url);
              }
              e4(n3, i2);
            }));
          }), e3);
        } }, { key: "join", value: function(e3, t3) {
          var n3 = this, r2 = null, i2 = me.parse(arguments, [new me({ type: "string", optional: true, defaultValue: null }), new me({ type: "callback" })]), s2 = C(i2, 3);
          return r2 = s2[0], e3 = s2[1], t3 = s2[2], oe(this._iid, (function(t4) {
            r2 ? t4(r2, null) : O.get(n3._iid).container.apiClient.joinGroupChannel({ channelUrl: n3.url, accessCode: e3 }, (function(e4, r3) {
              var i3 = null;
              e4 || ((i3 = x.get(n3._iid).GroupChannel.upsert(r3)).myMemberState = "joined");
              t4(e4, i3);
            }));
          }), t3);
        } }, { key: "leave", value: function(e3) {
          var t3 = this;
          return oe(this._iid, (function(e4) {
            O.get(t3._iid).container.apiClient.leaveGroupChannel({ channelUrl: t3.url }, (function(t4, n3) {
              return e4(t4, null);
            }));
          }), e3);
        } }, { key: "muteUser", value: function(e3, t3, n3, r2) {
          return this.muteUserWithUserId(e3 ? e3.userId : null, t3, n3, r2);
        } }, { key: "muteUserWithUserId", value: function(e3, t3, n3, r2) {
          var i2 = this, s2 = null, a2 = me.parse(arguments, [new me({ type: "string" }), new me({ type: "number", optional: true, defaultValue: -1, constraint: function(e4) {
            return e4 >= -1;
          } }), new me({ type: "string", optional: true, defaultValue: "" }), new me({ type: "callback" })]), o2 = C(a2, 5);
          return s2 = o2[0], e3 = o2[1], t3 = o2[2], n3 = o2[3], r2 = o2[4], oe(this._iid, (function(r3) {
            s2 ? r3(s2, null) : O.get(i2._iid).container.apiClient.muteUser({ channelUrl: i2.url, userId: e3, description: n3, seconds: t3, isGroupChannel: true }, (function(e4, t4) {
              r3(e4, null);
            }));
          }), r2);
        } }, { key: "unmuteUser", value: function(e3, t3) {
          return this.unmuteUserWithUserId(e3 ? e3.userId : null, t3);
        } }, { key: "unmuteUserWithUserId", value: function(e3, t3) {
          var n3 = this, r2 = null, i2 = me.parse(arguments, [new me({ type: "string" }), new me({ type: "callback" })]), s2 = C(i2, 3);
          return r2 = s2[0], e3 = s2[1], t3 = s2[2], oe(this._iid, (function(t4) {
            r2 ? t4(r2, null) : O.get(n3._iid).container.apiClient.unmuteUser({ channelUrl: n3.url, userId: e3, isGroupChannel: true }, (function(e4, n4) {
              t4(e4, null);
            }));
          }), t3);
        } }, { key: "banUser", value: function(e3, t3, n3, r2) {
          return this.banUserWithUserId(e3 ? e3.userId : null, t3, n3, r2);
        } }, { key: "banUserWithUserId", value: function(e3, t3, n3, r2) {
          var i2 = this, s2 = null, a2 = me.parse(arguments, [new me({ type: "string" }), new me({ type: "number", optional: true, defaultValue: -1, constraint: function(e4) {
            return e4 >= -1;
          } }), new me({ type: "string" }), new me({ type: "callback" })]), o2 = C(a2, 5);
          return s2 = o2[0], e3 = o2[1], t3 = o2[2], n3 = o2[3], r2 = o2[4], oe(this._iid, (function(r3) {
            s2 ? r3(s2, null) : O.get(i2._iid).container.apiClient.banUser({ channelUrl: i2.url, userId: e3, description: n3, seconds: t3, isGroupChannel: true }, (function(e4, t4) {
              r3(e4, null);
            }));
          }), r2);
        } }, { key: "unbanUser", value: function(e3, t3) {
          return this.unbanUserWithUserId(e3 ? e3.userId : null, t3);
        } }, { key: "unbanUserWithUserId", value: function(e3, t3) {
          var n3 = this, r2 = null, i2 = me.parse(arguments, [new me({ type: "string" }), new me({ type: "callback" })]), s2 = C(i2, 3);
          return r2 = s2[0], e3 = s2[1], t3 = s2[2], oe(this._iid, (function(t4) {
            r2 ? t4(r2, null) : O.get(n3._iid).container.apiClient.unbanUser({ channelUrl: n3.url, userId: e3, isGroupChannel: true }, (function(e4, n4) {
              t4(e4, null);
            }));
          }), t3);
        } }, { key: "updateJoinedMemberCount", value: function() {
          if (!this.isSuper && !this.isBroadcast) {
            var e3 = x.get(this._iid).Member;
            this.joinedMemberCount = this.members.filter((function(t3) {
              return t3.state === e3.JOINED;
            })).length;
          }
        } }, { key: "setLatestMemberCount", value: function(e3, t3, n3) {
          var r2 = false;
          return "number" == typeof e3 && "number" == typeof t3 && "number" == typeof n3 && n3 >= sr.get(this) && (sr.set(this, n3), r2 = t3 !== this.joinedMemberCount || e3 !== this.memberCount, this.memberCount = e3, this.joinedMemberCount = t3), r2;
        } }, { key: "hide", value: function(e3, t3, n3) {
          var r2 = this, i2 = null, s2 = me.parse(arguments, [new me({ type: "boolean", optional: true, defaultValue: false }), new me({ type: "boolean", optional: true, defaultValue: true }), new me({ type: "callback" })]), a2 = C(s2, 4);
          return i2 = a2[0], e3 = a2[1], t3 = a2[2], n3 = a2[3], oe(this._iid, (function(n4) {
            i2 ? n4(i2, null) : O.get(r2._iid).container.apiClient.hideGroupChannel({ channelUrl: r2.url, hidePreviousMessages: e3, allowAutoUnhide: t3 }, (function(i3, s3) {
              if (!i3) {
                var a3 = x.get(r2._iid).GroupChannel;
                r2.isHidden = true, r2.hiddenState = t3 ? a3.HiddenState.HIDDEN_ALLOW_AUTO_UNHIDE : a3.HiddenState.HIDDEN_PREVENT_AUTO_UNHIDE, e3 && r2._setGroupChannelUnreadCount(0, 0), s3.hasOwnProperty("ts_message_offset") && (r2._messageOffsetTimestamp = s3.ts_message_offset), a3.cachedChannels[r2.url] = r2;
              }
              n4(i3, s3);
            }));
          }), n3);
        } }, { key: "unhide", value: function(e3) {
          var t3 = this;
          return oe(this._iid, (function(e4) {
            O.get(t3._iid).container.apiClient.unhideGroupChannel({ channelUrl: t3.url }, (function(n3, r2) {
              if (!n3) {
                var i2 = x.get(t3._iid).GroupChannel;
                t3.isHidden = false, t3.hiddenState = i2.HiddenState.UNHIDDEN, i2.cachedChannels[t3.url] = t3;
              }
              e4(n3, r2);
            }));
          }), e3);
        } }, { key: "freeze", value: function(e3) {
          var t3 = this;
          return oe(this._iid, (function(e4) {
            O.get(t3._iid).container.apiClient.freeze({ channelUrl: t3.url, isGroupChannel: true, freezing: true }, (function(n3, r2) {
              if (!n3) {
                var i2 = x.get(t3._iid).GroupChannel;
                t3.isFrozen = true, i2.cachedChannels[t3.url] = t3;
              }
              e4(n3, null);
            }));
          }), e3);
        } }, { key: "unfreeze", value: function(e3) {
          var t3 = this;
          return oe(this._iid, (function(e4) {
            O.get(t3._iid).container.apiClient.freeze({ channelUrl: t3.url, isGroupChannel: true, freezing: false }, (function(n3, r2) {
              if (!n3) {
                var i2 = x.get(t3._iid).GroupChannel;
                t3.isFrozen = false, i2.cachedChannels[t3.url] = t3;
              }
              e4(n3, null);
            }));
          }), e3);
        } }, { key: "delete", value: function(e3) {
          var t3 = this;
          return oe(this._iid, (function(e4) {
            O.get(t3._iid).container.apiClient.deleteGroupChannel({ channelUrl: t3.url }, (function(n3, r2) {
              n3 || x.get(t3._iid).GroupChannel.removeCachedChannel(t3.url);
              e4(n3, r2);
            }));
          }), e3);
        } }, { key: "markAsRead", value: function(e3) {
          var t3 = this;
          return oe(this._iid, (function(e4) {
            var n3 = x.get(t3._iid).Command, r2 = wi.getInstance(t3._iid), i2 = n3.bRead({ channelUrl: t3.url });
            r2.sendCommand(i2, (function(n4, i3) {
              if (r2.getErrorFirstCallback()) {
                var s2 = [n4, i3];
                i3 = s2[0], n4 = s2[1];
              }
              if (i3) e4(i3, null);
              else if (r2.currentUser) {
                var a2 = $e.of(t3._iid), o2 = ge.of(t3._iid);
                t3.updateReadReceipt(r2.currentUser.userId, n4.getJsonElement().ts);
                var l2 = false;
                (t3.unreadMessageCount > 0 || t3.unreadMentionCount > 0) && (t3._setGroupChannelUnreadCount(0, 0), Object.keys(r2.channelHandlers).forEach((function(e5) {
                  r2.channelHandlers[e5].onChannelChanged(t3);
                })), l2 = true), e4(null, null), a2.upsert([t3]).then((function() {
                  l2 && o2.send({ source: de.EVENT_CHANNEL_CHANGED, payload: { channel: t3 } }), o2.send({ source: de.EVENT_READ_RECEIPT_UPDATED, payload: { channel: t3 } });
                })).catch((function(e5) {
                  return J.error(e5);
                }));
              } else {
                var u2 = new SendBirdException("Connection should be made first.", SendBirdException.CONNECTION_REQUIRED);
                e4(u2, null);
              }
            }));
          }), e3);
        } }, { key: "getUnreadMemberCount", value: function(e3) {
          var t3 = O.get(this._iid), n3 = x.get(this._iid).Member, r2 = t3.container.currentUserId;
          if (e3 instanceof pt && !e3.isAdminMessage() && r2 && !this.isSuper && !this.isBroadcast) {
            for (var i2 = 0, s2 = e3.createdAt, a2 = this.members, o2 = 0; o2 < a2.length; o2++) {
              var l2 = a2[o2];
              if (r2 !== l2.userId && l2.state === n3.JOINED && (!e3.sender || e3.sender.userId !== l2.userId)) (this.cachedReadReceiptStatus[l2.userId] || 0) < s2 && i2++;
            }
            return i2;
          }
          return 0;
        } }, { key: "getReadReceipt", value: function(e3) {
          return this.getUnreadMemberCount(e3);
        } }, { key: "markAsDelivered", value: function() {
          var e3 = this, t3 = wi.getInstance(this._iid), n3 = t3.currentUser ? t3.currentUser.userId : null;
          O.get(this._iid).container.apiClient.markAsDelivered({ channelUrl: this.url, userId: n3 }, (function(t4, r2) {
            if (t4) J.debug(t4);
            else {
              var i2 = r2.hasOwnProperty("ts") ? r2.ts : 0;
              e3.updateDeliveryReceipt(n3, i2);
            }
          }));
        } }, { key: "getUndeliveredMemberCount", value: function(e3) {
          var t3 = O.get(this._iid), n3 = x.get(this._iid).Member, r2 = t3.container.currentUserId;
          if (this.cachedDeliveryReceiptStatus && e3 instanceof pt && !e3.isAdminMessage() && r2 && !this.isSuper && !this.isBroadcast) {
            var i2, s2 = e3.createdAt, a2 = 0, o2 = I(this.members);
            try {
              for (o2.s(); !(i2 = o2.n()).done; ) {
                var l2 = i2.value;
                r2 === l2.userId || l2.state !== n3.JOINED || e3.sender && e3.sender.userId === l2.userId || this.cachedDeliveryReceiptStatus[l2.userId] < s2 && a2++;
              }
            } catch (e4) {
              o2.e(e4);
            } finally {
              o2.f();
            }
            return a2;
          }
          return 0;
        } }, { key: "getDeliveryReceipt", value: function(e3) {
          return this.getUndeliveredMemberCount(e3);
        } }, { key: "getReadMembers", value: function(e3) {
          var t3 = arguments.length > 1 && void 0 !== arguments[1] && arguments[1], n3 = wi.getInstance(this._iid);
          if (n3.currentUser && !this.isSuper && !this.isBroadcast && e3 instanceof pt && !e3.isAdminMessage()) {
            for (var r2 = [], i2 = 0; i2 < this.members.length; i2++) {
              var s2 = this.members[i2];
              if (t3 || s2.userId !== n3.currentUser.userId && s2.userId !== e3.sender.userId) {
                var a2 = this.cachedReadReceiptStatus[s2.userId] || 0;
                a2 >= e3.createdAt && r2.push(s2);
              }
            }
            return r2;
          }
          return [];
        } }, { key: "getUnreadMembers", value: function(e3) {
          var t3 = arguments.length > 1 && void 0 !== arguments[1] && arguments[1], n3 = wi.getInstance(this._iid);
          if (n3.currentUser && !this.isSuper && !this.isBroadcast && e3 instanceof pt && !e3.isAdminMessage()) {
            for (var r2 = [], i2 = 0; i2 < this.members.length; i2++) {
              var s2 = this.members[i2];
              if (t3 || s2.userId !== n3.currentUser.userId && s2.userId !== e3.sender.userId) {
                var a2 = this.cachedReadReceiptStatus[s2.userId] || 0;
                a2 < e3.createdAt && r2.push(s2);
              }
            }
            return r2;
          }
          return [];
        } }, { key: "getReadStatus", value: function() {
          var e3 = this, t3 = arguments.length > 0 && void 0 !== arguments[0] && arguments[0], n3 = wi.getInstance(this._iid);
          if (n3.currentUser && !this.isSuper && !this.isBroadcast) {
            for (var r2 = {}, i2 = Object.keys(this.cachedReadReceiptStatus), s2 = function(s3) {
              var a3 = i2[s3];
              if (!t3 && a3 === n3.currentUser.userId) return "continue";
              var o2 = e3.cachedReadReceiptStatus[a3], l2 = e3.members.filter((function(e4) {
                return e4.userId === a3;
              }));
              r2[a3] = { user: l2.length > 0 ? l2[0] : null, last_seen_at: parseInt(o2) };
            }, a2 = 0; a2 < i2.length; a2++) s2(a2);
            return r2;
          }
          return {};
        } }, { key: "updateReadReceipt", value: function(e3, t3) {
          var n3 = this.cachedReadReceiptStatus[e3];
          if (!n3 || n3 < t3) {
            this.cachedReadReceiptStatus[e3] = t3;
            var r2 = wi.getInstance(this._iid);
            r2.currentUser && e3 === r2.currentUser.userId && (this.myLastRead = t3);
          }
        } }, { key: "updateDeliveryReceipt", value: function(e3, t3) {
          if (this.cachedDeliveryReceiptStatus) if (this.cachedDeliveryReceiptStatus.hasOwnProperty(e3)) {
            var n3 = this.cachedDeliveryReceiptStatus[e3];
            (!n3 || n3 < t3) && (this.cachedDeliveryReceiptStatus[e3] = t3);
          } else this.cachedDeliveryReceiptStatus[e3] = t3;
        } }, { key: "startTyping", value: function() {
          var e3 = wi.getInstance(this._iid), t3 = (/* @__PURE__ */ new Date()).getTime(), n3 = e3.Options.typingIndicatorThrottle;
          ("number" != typeof n3 || n3 < 1e3 || n3 > 9e3) && (n3 = 1e3);
          var r2 = ir.get(this);
          if (t3 - r2.start >= n3) {
            r2.end = 0, r2.start = t3;
            var i2 = x.get(this._iid).Command.bTypeStart({ channelUrl: this.url, time: r2.start });
            e3.sendCommand(i2, null);
          }
        } }, { key: "endTyping", value: function() {
          var e3 = wi.getInstance(this._iid), t3 = (/* @__PURE__ */ new Date()).getTime(), n3 = e3.Options.typingIndicatorThrottle;
          ("number" != typeof n3 || n3 < 1e3 || n3 > 9e3) && (n3 = 1e3);
          var r2 = ir.get(this);
          if (t3 - r2.end >= n3) {
            r2.start = 0, r2.end = t3;
            var i2 = x.get(this._iid).Command.bTypeEnd({ channelUrl: this.url, time: r2.end });
            e3.sendCommand(i2, null);
          }
        } }, { key: "invalidateTypingStatus", value: function() {
          var e3 = rr.get(this), t3 = (/* @__PURE__ */ new Date()).getTime(), n3 = false;
          return Object.keys(e3).forEach((function(r2) {
            var i2 = e3[r2].ts;
            t3 - i2 >= 1e4 && (delete e3[r2], n3 = true);
          })), n3;
        } }, { key: "getTypingMembers", value: function() {
          var e3 = this, t3 = rr.get(this), n3 = [];
          return Object.keys(t3).forEach((function(t4) {
            var r2 = e3.memberMap[t4];
            r2 && n3.push(r2);
          })), n3;
        } }, { key: "getTypingUsers", value: function() {
          var e3 = rr.get(this), t3 = [];
          return Object.keys(e3).forEach((function(n3) {
            var r2 = e3[n3].user;
            t3.push(r2);
          })), t3;
        } }, { key: "updateTypingStatus", value: function(e3, t3) {
          var n3 = rr.get(this);
          t3 ? n3[e3.userId] = { user: e3, ts: (/* @__PURE__ */ new Date()).getTime() } : delete n3[e3.userId];
        } }, { key: "isTyping", value: function() {
          var e3 = rr.get(this);
          return 0 !== Object.keys(e3).length;
        } }, { key: "registerScheduledUserMessage", value: function(e3, t3) {
          var n3 = this, r2 = x.get(this._iid), i2 = r2.ScheduledUserMessage, s2 = r2.ScheduledUserMessageParams, a2 = null, o2 = me.parse(arguments, [new me({ type: s2, constraint: function(e4) {
            return "string" == typeof e4.message && "string" == typeof e4._getScheduleString();
          } }), new me({ type: "callback" })]), l2 = C(o2, 3);
          return a2 = l2[0], e3 = l2[1], t3 = l2[2], oe(this._iid, (function(t4) {
            a2 ? t4(a2, null) : O.get(n3._iid).container.apiClient.registerScheduledUserMessage({ groupChannelParams: e3, channelUrl: n3.url, isOpenChannel: false }, (function(e4, r3) {
              var s3 = null;
              if (!e4) {
                s3 = new i2(r3);
                var a3 = wi.getInstance(n3._iid).currentUser;
                a3 && s3._sender && a3.userId === s3._sender.userId && (a3.nickname = s3._sender.nickname, a3.plainProfileUrl = s3._sender.plainProfileUrl, a3.metaData = s3._sender.metaData);
              }
              t4(e4, s3);
            }));
          }), t3);
        } }, { key: "getPushPreference", value: function(e3) {
          var t3 = this;
          return oe(this._iid, (function(e4) {
            O.get(t3._iid).container.apiClient.getMyPushTriggerOption({ channelUrl: t3.url }, (function(n3, r2) {
              var i2 = null;
              if (!n3) {
                try {
                  i2 = r2.enable;
                } catch (e5) {
                  i2 = false;
                }
                t3.isPushEnabled = i2;
              }
              e4 && e4(n3, i2);
            }));
          }), e3);
        } }, { key: "setPushPreference", value: function(e3, t3) {
          var n3 = this;
          return oe(this._iid, (function(t4) {
            var r2 = x.get(n3._iid).GroupChannel;
            O.get(n3._iid).container.apiClient.setMyPushTriggerOption({ channelUrl: n3.url, enable: e3 }, (function(e4, i2) {
              e4 || (n3.isPushEnabled = i2.enable, n3.isPushEnabled || (n3.myPushTriggerOption = r2.PushTriggerOption.OFF)), t4(e4, i2);
            }));
          }), t3);
        } }, { key: "getMyPushTriggerOption", value: function(e3) {
          var t3 = this;
          return oe(this._iid, (function(e4) {
            O.get(t3._iid).container.apiClient.getMyPushTriggerOption({ channelUrl: t3.url }, (function(r2, i2) {
              var s2 = null;
              if (!r2) {
                try {
                  s2 = i2.push_trigger_option || n2.PushTriggerOption.DEFAULT;
                } catch (e5) {
                  J.debug(e5);
                }
                t3.myPushTriggerOption = s2;
              }
              e4(r2, s2);
            }));
          }), e3);
        } }, { key: "setMyPushTriggerOption", value: function(e3, t3) {
          var n3 = this, r2 = x.get(this._iid), i2 = r2.GroupChannel, s2 = null, a2 = me.parse(arguments, [new me({ type: i2.PushTriggerOption }), new me({ type: "callback" })]), o2 = C(a2, 3);
          return s2 = o2[0], e3 = o2[1], t3 = o2[2], oe(this._iid, (function(t4) {
            s2 ? t4(s2, null) : O.get(n3._iid).container.apiClient.setMyPushTriggerOption({ channelUrl: n3.url, pushTriggerOption: e3 }, (function(e4, r3) {
              var i3 = null;
              if (!e4) {
                try {
                  i3 = r3.push_trigger_option;
                } catch (e5) {
                  J.debug(e5);
                }
                n3.myPushTriggerOption = i3;
              }
              t4(e4, i3);
            }));
          }), t3);
        } }, { key: "setMyCountPreference", value: function(e3, t3) {
          var n3 = this, r2 = x.get(this._iid), i2 = r2.GroupChannel, s2 = null, a2 = me.parse(arguments, [new me({ type: i2.CountPreference }), new me({ type: "callback" })]), o2 = C(a2, 3);
          return s2 = o2[0], e3 = o2[1], t3 = o2[2], oe(this._iid, (function(t4) {
            s2 ? t4(s2, null) : O.get(n3._iid).container.apiClient.setMyCountPreference({ channelUrl: n3.url, countPreference: e3 }, (function(e4, r3) {
              var s3 = null;
              e4 || (s3 = n3.myCountPreference = r3.count_preference, n3._setGroupChannelUnreadCount(n3.unreadMessageCount, n3.unreadMentionCount), i2.cachedChannels[n3.url] = n3), t4(e4, s3);
            }));
          }), t3);
        } }, { key: "resetMyHistory", value: function(e3) {
          var t3 = this;
          return oe(this._iid, (function(e4) {
            O.get(t3._iid).container.apiClient.resetMyHistory({ channelUrl: t3.url }, (function(n3, r2) {
              if (!n3 && r2.hasOwnProperty("ts_message_offset")) {
                var i2 = x.get(t3._iid).GroupChannel;
                t3._messageOffsetTimestamp = r2.ts_message_offset, i2.cachedChannels[t3.url] = t3;
              }
              e4(n3, r2);
            }));
          }), e3);
        } }], [{ key: "MemberStateFilter", get: function() {
          return { ALL: "all", JOINED: "joined_only", INVITED: "invited_only", INVITED_BY_FRIEND: "invited_by_friend", INVITED_BY_NON_FRIEND: "invited_by_non_friend", LEFT: "left" };
        } }, { key: "PushTriggerOption", get: function() {
          return { DEFAULT: "default", ALL: "all", MENTION_ONLY: "mention_only", OFF: "off" };
        } }, { key: "CountPreference", get: function() {
          return { ALL: "all", UNREAD_MESSAGE_COUNT_ONLY: "unread_message_count_only", UNREAD_MENTION_COUNT_ONLY: "unread_mention_count_only", OFF: "off" };
        } }, { key: "HiddenState", get: function() {
          return { UNHIDDEN: "unhidden", HIDDEN_ALLOW_AUTO_UNHIDE: "hidden_allow_auto_unhide", HIDDEN_PREVENT_AUTO_UNHIDE: "hidden_prevent_auto_unhide" };
        } }, { key: "PublicChannelFilter", get: function() {
          return { ALL: "all", PUBLIC: "public", PRIVATE: "private" };
        } }, { key: "SuperChannelFilter", get: function() {
          return { ALL: "all", SUPER: "super", NON_SUPER: "nonsuper", BROADCAST_ONLY: "broadcast_only" };
        } }, { key: "UnreadChannelFilter", get: function() {
          return { ALL: "all", UNREAD_MESSAGE: "unread_message" };
        } }, { key: "HiddenChannelFilter", get: function() {
          return { ALL: "all", UNHIDDEN: "unhidden_only", HIDDEN: "hidden_only", HIDDEN_ALLOW_AUTO_UNHIDE: "hidden_allow_auto_unhide", HIDDEN_PREVENT_AUTO_UNHIDE: "hidden_prevent_auto_unhide" };
        } }, { key: "Role", get: function() {
          return { OPERATOR: "operator", NONE: "none" };
        } }, { key: "UnreadItemKey", get: function() {
          return { GROUP_CHANNEL_UNREAD_MENTION_COUNT: "group_channel_unread_mention_count", NONSUPER_UNREAD_MENTION_COUNT: "non_super_group_channel_unread_mention_count", SUPER_UNREAD_MENTION_COUNT: "super_group_channel_unread_mention_count", GROUP_CHANNEL_UNREAD_MESSAGE_COUNT: "group_channel_unread_message_count", NONSUPER_UNREAD_MESSAGE_COUNT: "non_super_group_channel_unread_message_count", SUPER_UNREAD_MESSAGE_COUNT: "super_group_channel_unread_message_count", GROUP_CHANNEL_INVITATION_COUNT: "group_channel_invitation_count", NONSUPER_INVITATION_COUNT: "non_super_group_channel_invitation_count", SUPER_INVITATION_COUNT: "super_group_channel_invitation_count" };
        } }, { key: "cachedChannels", get: function() {
          return tr[this._iid] || (tr[this._iid] = {}), tr[this._iid];
        } }, { key: "createGroupChannelCollection", value: function() {
          return new $n({ iid: this._iid });
        } }, { key: "buildFromSerializedData", value: function(e3) {
          var t3 = x.get(this._iid), n3 = t3.User, r2 = t3.Member, i2 = t3.GroupChannel, s2 = t3.BaseMessage, a2 = t3.UserMessage, o2 = t3.FileMessage, c2 = t3.AdminMessage, d2 = ct.deserialize(e3), h2 = (function(e4) {
            return null != e4 && "object" === u(e4) ? e4.messageType === s2.MESSAGE_TYPE_USER ? new a2(a2.objectify(l(l({}, e4), {}, { channel: { url: e4.channelUrl, channelType: e4.channelType }, user: e4.sender, mentionedUsers: e4.mentionedUsers }))) : e4.messageType === s2.MESSAGE_TYPE_FILE ? new o2(o2.objectify(l(l({}, e4), {}, { channel: { url: e4.channelUrl, channelType: e4.channelType }, user: e4.sender, mentionedUsers: e4.mentionedUsers }))) : new c2(c2.objectify(l(l({}, e4), {}, { channel: { url: e4.channelUrl, channelType: e4.channelType }, mentionedUsers: e4.mentionedUsers }))) : null;
          })(d2.lastMessage);
          return new i2({ channel_url: d2.url, name: d2.name, cover_url: d2.coverUrl, data: d2.data, custom_type: d2.customType, invited_at: d2.invitedAt, created_at: d2.createdAt / 1e3, joined_ts: d2.joinedAt, is_access_code_required: d2.isAccessCodeRequired, is_distinct: d2.isDistinct, is_super: d2.isSuper, is_broadcast: d2.isBroadcast, is_public: d2.isPublic, is_discoverable: d2.isDiscoverable, is_hidden: d2.isHidden, is_ephemeral: d2.isEphemeral, is_muted: d2.myMutedState, is_push_enabled: d2.isPushEnabled, freeze: d2.isFrozen, unread_message_count: d2.unreadMessageCount, unread_mention_count: d2.unreadMentionCount, push_trigger_option: d2.myPushTriggerOption, count_preference: d2.myCountPreference, hidden_state: d2.hiddenState, member_count: d2.memberCount, joined_member_count: d2.joinedMemberCount, member_state: d2.myMemberState, my_role: d2.myRole, user_last_read: d2.myLastRead, ts_message_offset: d2.messageOffsetTimestamp, message_survival_seconds: d2.messageSurvivalSeconds, read_receipt: d2.cachedReadReceiptStatus, delivery_receipt: d2.cachedDeliveryReceiptStatus, members: d2.members.map((function(e4) {
            return r2.objectify(l({}, e4));
          })), last_message: h2, created_by: null !== d2.creator && void 0 !== d2.creator && "object" === u(d2.creator) ? n3.objectify(d2.creator) : null, inviter: null !== d2.inviter && void 0 !== d2.inviter && "object" === u(d2.inviter) ? n3.objectify(d2.inviter) : null, metadata: d2.metadata, cached_primary_key: d2.cachedPrimaryKey });
        } }, { key: "upsert", value: function(e3) {
          var t3 = x.get(this._iid).GroupChannel, n3 = new t3(e3);
          if (t3.cachedChannels.hasOwnProperty(n3.url)) {
            if (n3.isEphemeral) {
              var r2 = t3.cachedChannels[n3.url];
              e3.last_message = r2.lastMessage, e3.unread_message_count = r2.unreadMessageCount;
            }
            t3.cachedChannels[n3.url].update(e3);
          } else t3.cachedChannels[n3.url] = n3;
          return t3.cachedChannels[n3.url];
        } }, { key: "removeCachedChannel", value: function(e3) {
          var t3 = x.get(this._iid), n3 = t3.GroupChannel, r2 = t3.FileMessageQueue;
          n3.cachedChannels[e3] && delete n3.cachedChannels[e3], r2.delete(e3);
        } }, { key: "clearCache", value: function() {
          tr[this._iid] = {}, x.get(this._iid).FileMessageQueue.clear();
        } }, { key: "getChannel", value: function(e3, t3) {
          var n3 = null, r2 = null, i2 = me.parse(arguments, [new me({ type: "string", constraint: function(e4) {
            return e4.length > 0;
          } }), new me({ type: "string", optional: true, nullable: true, defaultValue: null }), new me({ type: "callback" })]), s2 = C(i2, 4);
          if (n3 = s2[0], e3 = s2[1], r2 = s2[2], t3 = s2[3], n3) return oe(this._iid, (function(e4) {
            e4(n3, null);
          }), t3);
          var a2 = x.get(this._iid), o2 = a2.GroupChannel;
          return o2.cachedChannels[e3] ? oe(this._iid, (function(t4) {
            t4(null, o2.cachedChannels[e3]);
          }), t3) : o2.getChannelWithoutCache(e3, r2, t3);
        } }, { key: "getChannelWithoutCache", value: function(e3, t3) {
          var n3 = this, r2 = null, i2 = null, s2 = me.parse(arguments, [new me({ type: "string", constraint: function(e4) {
            return e4.length > 0;
          } }), new me({ type: "string", optional: true, nullable: true, defaultValue: null }), new me({ type: "callback" })]), a2 = C(s2, 4);
          return r2 = a2[0], e3 = a2[1], i2 = a2[2], t3 = a2[3], oe(this._iid, (function(t4) {
            r2 ? t4(r2, null) : O.get(n3._iid).container.apiClient.getGroupChannel({ channelUrl: e3, internalCall: i2, showMember: true }, (function(e4, r3) {
              var i3 = null;
              e4 || (i3 = n3.upsert(r3)), t4(e4, i3);
            }));
          }), t3);
        } }, { key: "createDistinctChannelIfNotExist", value: function(e3, t3) {
          var n3 = this, r2 = x.get(this._iid), i2 = r2.GroupChannelParams, s2 = null, a2 = me.parse(arguments, [new me({ type: i2, constraint: function(e4) {
            return e4._validate();
          } }), new me({ type: "callback" })]), o2 = C(a2, 3);
          return s2 = o2[0], e3 = o2[1], t3 = o2[2], oe(this._iid, (function(t4) {
            s2 ? t4(s2, null) : (e3.isPublic || (e3.accessCode = null), O.get(n3._iid).container.apiClient.createGroupChannel(l(l({}, e3), {}, { isDistinct: true }), (function(e4, r3) {
              var i3 = null;
              if (!e4) {
                var s3 = x.get(n3._iid).GroupChannel;
                i3 = { channel: new s3(r3), isCreated: r3.is_created }, s3.cachedChannels[i3.channel.url] = i3.channel;
              }
              t4(e4, i3);
            })));
          }), t3);
        } }, { key: "createChannel", value: function() {
          var e3 = this, t3 = me.toArray(arguments), n3 = void 0;
          "function" == typeof t3[t3.length - 1] && (n3 = t3.pop());
          var r2 = x.get(this._iid), i2 = r2.GroupChannel, s2 = r2.GroupChannelParams;
          if (t3[0] instanceof s2 && 1 === t3.length) return oe(this._iid, (function(n4) {
            var r3 = t3[0];
            (r3.isPublic || (r3.accessCode = null), r3._validate()) ? O.get(e3._iid).container.apiClient.createGroupChannel(r3, (function(e4, t4) {
              var r4 = null;
              e4 || (r4 = new i2(t4), i2.cachedChannels[r4.url] = r4), n4(e4, r4);
            })) : n4(me.error, null);
          }), n3);
          if (Array.isArray(t3[0])) {
            var a2 = new s2();
            switch (t3.length) {
              case 1:
                a2.addUsers(t3[0]);
                break;
              case 2:
                a2.addUsers(t3[0]), a2.isDistinct = t3[1];
                break;
              case 3:
                a2.addUsers(t3[0]), a2.isDistinct = t3[1], a2.customType = t3[2];
                break;
              case 5:
                a2.addUsers(t3[0]), a2.isDistinct = t3[1], a2.name = t3[2], "string" == typeof t3[3] ? a2.coverUrl = t3[3] : a2.coverImage = t3[3], a2.data = t3[4];
                break;
              case 6:
                a2.addUsers(t3[0]), a2.isDistinct = t3[1], a2.name = t3[2], "string" == typeof t3[3] ? a2.coverUrl = t3[3] : a2.coverImage = t3[3], a2.data = t3[4], a2.customType = t3[5];
                break;
              default:
                return oe(this._iid, (function(e4) {
                  return e4(me.error, null);
                }), n3);
            }
            return n3 ? i2.createChannel(a2, n3) : i2.createChannel(a2);
          }
          return oe(this._iid, (function(e4) {
            return e4(me.error, null);
          }), n3);
        } }, { key: "createChannelWithUserIds", value: function() {
          var e3 = me.toArray(arguments), t3 = void 0;
          "function" == typeof e3[e3.length - 1] && (t3 = e3.pop());
          var n3 = x.get(this._iid), r2 = n3.GroupChannel, i2 = n3.GroupChannelParams, s2 = new i2();
          switch (e3.length) {
            case 1:
              s2.addUserIds(e3[0]);
              break;
            case 2:
              s2.addUserIds(e3[0]), s2.isDistinct = e3[1];
              break;
            case 3:
              s2.addUserIds(e3[0]), s2.isDistinct = e3[1], s2.customType = e3[2];
              break;
            case 5:
              s2.addUserIds(e3[0]), s2.isDistinct = e3[1], s2.name = e3[2], "string" == typeof e3[3] ? s2.coverUrl = e3[3] : s2.coverImage = e3[3], s2.data = e3[4];
              break;
            case 6:
              s2.addUserIds(e3[0]), s2.isDistinct = e3[1], s2.name = e3[2], "string" == typeof e3[3] ? s2.coverUrl = e3[3] : s2.coverImage = e3[3], s2.data = e3[4], s2.customType = e3[5];
              break;
            default:
              return oe(this._iid, (function(e4) {
                return e4(me.error, null);
              }), t3);
          }
          return t3 ? r2.createChannel(s2, t3) : r2.createChannel(s2);
        } }, { key: "createMyGroupChannelListQuery", value: function() {
          return new (0, x.get(this._iid).GroupChannelListQuery)();
        } }, { key: "createPublicGroupChannelListQuery", value: function() {
          return new (0, x.get(this._iid).PublicGroupChannelListQuery)();
        } }, { key: "markAsReadAllLastSentAt", get: function() {
          return nr[this._iid] || 0;
        }, set: function(e3) {
          nr[this._iid] = e3;
        } }, { key: "getChannelCount", value: function(e3, t3) {
          return wi.getInstance(this._iid).getGroupChannelCount(e3, t3);
        } }, { key: "getUnreadItemCount", value: function(e3, t3) {
          return wi.getInstance(this._iid).getUnreadItemCount(e3, t3);
        } }, { key: "getTotalUnreadMessageCount", value: function() {
          var e3 = me.toArray(arguments), t3 = "function" == typeof e3[e3.length - 1] ? e3.pop() : null, n3 = wi.getInstance(this._iid);
          return n3.getTotalUnreadMessageCount.apply(n3, A(e3).concat([t3]));
        } }, { key: "getTotalUnreadChannelCount", value: function(e3) {
          return wi.getInstance(this._iid).getTotalUnreadChannelCount(e3);
        } }]), n2;
      })(Rt), or = (function(e2) {
        function t2(t3) {
          var n2 = e2.call(this, t3) || this;
          return n2.state = "", n2.role = "", n2.isMuted = false, n2.isBlockedByMe = false, n2.isBlockingMe = false, n2.restrictionInfo = null, t3 && n2._update(t3), n2;
        }
        return k(t2, e2), t2.objectify = function(e3) {
          var t3 = x.get(this._iid), n2 = t3.User, r2 = t3.RestrictedUser, i2 = t3.RestrictionInfo, s2 = e3.state, a2 = e3.role, o2 = void 0 === a2 ? "" : a2, l2 = e3.isMuted, u2 = void 0 !== l2 && l2, c2 = e3.isBlockedByMe, d2 = void 0 !== c2 && c2, h2 = e3.isBlockingMe, p2 = void 0 !== h2 && h2, f2 = e3.restrictionInfo, _2 = void 0 === f2 ? null : f2, g2 = u2 ? r2.objectify(e3) : n2.objectify(e3);
          if (g2.state = s2, g2.role = o2, g2.is_muted = u2, g2.is_blocked_by_me = d2, g2.is_blocking_me = p2, _2) {
            var y2 = i2.objectify(_2);
            g2.restriction_type = y2.restriction_type, g2.muted_description = y2.description, g2.muted_end_at = y2.end_at;
          }
          return g2;
        }, t2.buildFromSerializedData = function(e3) {
          var t3 = x.get(this._iid).Member, n2 = ct.deserialize(e3);
          return new t3(t3.objectify(R({}, n2)));
        }, t2.prototype._update = function(e3) {
          var t3 = x.get(this._iid), n2 = t3.RestrictedUser, r2 = t3.RestrictionInfo;
          this.state = e3.state, this.role = e3.role || ar.Role.NONE, e3.hasOwnProperty("is_muted") && (this.isMuted = e3.is_muted), e3.hasOwnProperty("is_blocked_by_me") && (this.isBlockedByMe = e3.is_blocked_by_me), e3.hasOwnProperty("is_blocking_me") && (this.isBlockingMe = e3.is_blocking_me), this.isMuted && (this.restrictionInfo = new r2(e3), this.restrictionInfo.restrictionType = n2.RestrictionType.MUTED);
        }, t2.prototype.parse = function(e3) {
          this._update(e3);
        }, Object.defineProperty(t2, "JOINED", { get: function() {
          return "joined";
        }, enumerable: false, configurable: true }), Object.defineProperty(t2, "INVITED", { get: function() {
          return "invited";
        }, enumerable: false, configurable: true }), Object.defineProperty(t2, "LEFT", { get: function() {
          return "left";
        }, enumerable: false, configurable: true }), t2;
      })(ft), lr = (function(e2) {
        function t2(t3) {
          var n2 = e2.call(this, t3) || this;
          return n2.role = "", n2.isBlockedByMe = false, t3 && n2._update(t3), n2;
        }
        return k(t2, e2), t2.objectify = function(e3) {
          var t3 = x.get(this._iid).User, n2 = e3.role, r2 = void 0 === n2 ? "" : n2, i2 = e3.isBlockedByMe, s2 = void 0 !== i2 && i2, a2 = t3.objectify(e3);
          return a2.role = r2, a2.is_blocked_by_me = s2, a2;
        }, t2.buildFromSerializedData = function(e3) {
          var t3 = x.get(this._iid).Sender, n2 = ct.deserialize(e3);
          return new t3(t3.objectify(R({}, n2)));
        }, t2.prototype.parse = function(e3) {
          this._update(e3);
        }, t2.prototype._update = function(e3) {
          this.role = e3.role || ar.Role.NONE, e3.hasOwnProperty("is_blocked_by_me") && (this.isBlockedByMe = e3.is_blocked_by_me);
        }, t2;
      })(ft), ur = (function(e2) {
        f(n2, e2);
        var t2 = E(n2);
        function n2(e3) {
          var r2;
          return c(this, n2), (r2 = t2.call(this, e3)).restrictionInfo = null, e3 && r2._update(e3), r2;
        }
        return h(n2, [{ key: "_update", value: function(e3) {
          var t3 = x.get(this._iid).RestrictionInfo;
          this.restrictionInfo = new t3(e3);
        } }], [{ key: "RestrictionType", get: function() {
          return { MUTED: "muted", BANNED: "banned" };
        } }, { key: "objectify", value: function(e3) {
          var t3 = x.get(this._iid), n3 = t3.User, r2 = t3.RestrictionInfo, i2 = e3.restrictionInfo, s2 = void 0 === i2 ? {} : i2;
          return l(l({}, n3.objectify(e3)), r2.objectify(s2));
        } }]), n2;
      })(ft), cr = (function() {
        function e2(e3) {
          this.emojiHash = null, this.emojiCategories = null, e3 && this._update(e3);
        }
        return e2.prototype._update = function(e3) {
          var t2 = x.get(this._iid).EmojiCategory;
          this.emojiHash = e3.emoji_hash || "", this.emojiCategories = e3.emoji_categories ? e3.emoji_categories.map((function(e4) {
            return new t2(e4);
          })) : [];
        }, e2;
      })(), dr = (function() {
        function e2(e3) {
          this.id = null, this.name = null, this.url = null, this.emojis = null, e3 && this._update(e3);
        }
        return e2.prototype._update = function(e3) {
          var t2 = x.get(this._iid).Emoji;
          this.id = e3.id || 0, this.name = e3.name || "", this.url = e3.url || "", this.emojis = e3.emojis ? e3.emojis.map((function(e4) {
            return new t2(e4);
          })) : [];
        }, e2;
      })(), hr = (function() {
        function e2(e3) {
          this.key = null, this.url = null, e3 && this._update(e3);
        }
        return e2.prototype._update = function(e3) {
          this.key = e3.key, this.url = e3.url;
        }, e2;
      })(), pr = {}, fr = {}, _r = /* @__PURE__ */ new WeakMap(), gr = (function(e2) {
        f(n2, e2);
        var t2 = E(n2);
        function n2(e3) {
          var r2;
          return c(this, n2), (r2 = t2.call(this, e3)).channelType = Rt.CHANNEL_TYPE_OPEN, r2.participantCount = 0, _r.set(y(r2), 0), r2.operators = [], e3 && r2._update(e3), r2;
        }
        return h(n2, [{ key: "_update", value: function(e3) {
          var t3 = x.get(this._iid).User;
          e3.hasOwnProperty("participant_count") && (this.participantCount = parseInt(e3.participant_count)), e3.hasOwnProperty("operators") && Array.isArray(e3.operators) && (this.operators = e3.operators.map((function(e4) {
            return new t3(e4);
          })));
        } }, { key: "parse", value: function(e3) {
          this._update(e3);
        } }, { key: "update", value: function(e3) {
          this.__update(e3), this._update(e3);
        } }, { key: "createParticipantListQuery", value: function() {
          return new (0, x.get(this._iid).ParticipantListQuery)({ channelUrl: this.url });
        } }, { key: "createMutedUserListQuery", value: function() {
          return new (0, x.get(this._iid).MutedUserListQuery)({ channelUrl: this.url, isOpenChannel: true });
        } }, { key: "createBannedUserListQuery", value: function() {
          return new (0, x.get(this._iid).BannedUserListQuery)({ channelUrl: this.url, isOpenChannel: true });
        } }, { key: "isOperator", value: function(e3) {
          return !!e3 && this.isOperatorWithUserId(e3.userId);
        } }, { key: "isOperatorWithUserId", value: function(e3) {
          return this.operators.map((function(e4) {
            return e4.userId;
          })).indexOf(e3) > -1;
        } }, { key: "refresh", value: function(e3) {
          return x.get(this._iid).OpenChannel.getChannelWithoutCache(this.url, e3);
        } }, { key: "enter", value: function(e3) {
          var t3 = this;
          return oe(this._iid, (function(e4) {
            var n3 = x.get(t3._iid).Command.bEnter({ channelUrl: t3.url }), r2 = wi.getInstance(t3._iid);
            r2.sendCommand(n3, (function(n4, i2) {
              if (r2.getErrorFirstCallback()) {
                var s2 = [n4, i2];
                i2 = s2[0], n4 = s2[1];
              }
              i2 ? (i2 = i2 ? new H(i2.message, i2.code) : null, e4(i2, null)) : (x.get(t3._iid).OpenChannel.enteredChannels[t3.url] = t3, ge.of(t3._iid).send({ source: de.EVENT_CHANNEL_ENTER, payload: { channel: t3 } }), t3.refresh((function() {
                return e4(null, null);
              })));
            }));
          }), e3);
        } }, { key: "exit", value: function(e3) {
          var t3 = this;
          return oe(this._iid, (function(e4) {
            var n3 = x.get(t3._iid), r2 = n3.Command, i2 = n3.FileMessageQueue, s2 = r2.bExit({ channelUrl: t3.url }), a2 = wi.getInstance(t3._iid);
            a2.sendCommand(s2, (function(n4, r3) {
              if (a2.getErrorFirstCallback()) {
                var s3 = [n4, r3];
                r3 = s3[0], n4 = s3[1];
              }
              r3 ? (r3 = r3 ? new H(r3.message, r3.code) : null, e4(r3, null)) : (delete x.get(t3._iid).OpenChannel.enteredChannels[t3.url], i2.delete(t3.url), ge.of(t3._iid).send({ source: de.EVENT_CHANNEL_EXIT, payload: { channel: t3 } }), e4(null, null));
            }));
          }), e3);
        } }, { key: "updateChannel", value: function() {
          var e3 = this, t3 = me.toArray(arguments), n3 = null;
          "function" == typeof t3[t3.length - 1] && (n3 = t3.pop());
          var r2 = x.get(this._iid), i2 = r2.OpenChannel, s2 = r2.OpenChannelParams;
          if (t3[0] instanceof s2 && 1 === t3.length) return oe(this._iid, (function(n4) {
            var r3 = t3[0];
            (r3.channelUrl = e3.url, r3._validate()) ? O.get(e3._iid).container.apiClient.updateOpenChannel(r3, (function(e4, t4) {
              var r4 = null;
              e4 || (r4 = i2.upsert(t4)), n4(e4, r4);
            })) : n4(me.error, null);
          }), n3);
          if (3 === t3.length) {
            var a2 = new s2();
            return a2.channelUrl = this.url, a2.name = t3[0], a2.coverUrlOrImage = t3[1], a2.data = t3[2], a2.operatorUserIds = this.operators.map((function(e4) {
              return e4.userId;
            })), n3 ? this.updateChannel(a2, n3) : this.updateChannel(a2);
          }
          if (4 === t3.length) {
            var o2 = new s2();
            return o2.channelUrl = this.url, o2.name = t3[0], o2.coverUrlOrImage = t3[1], o2.data = t3[2], Array.isArray(t3[3]) && (o2.operatorUserIds = t3[3]), n3 ? this.updateChannel(o2, n3) : this.updateChannel(o2);
          }
          if (5 === t3.length) {
            var l2 = new s2();
            return l2.channelUrl = this.url, l2.name = t3[0], l2.coverUrlOrImage = t3[1], l2.data = t3[2], Array.isArray(t3[3]) && (l2.operatorUserIds = t3[3]), l2.customType = t3[4], n3 ? this.updateChannel(l2, n3) : this.updateChannel(l2);
          }
          return oe(this._iid, (function(e4) {
            return e4(me.error, null);
          }), n3);
        } }, { key: "updateChannelWithOperatorUserIds", value: function() {
          var e3 = me.toArray(arguments), t3 = void 0;
          switch ("function" == typeof e3[e3.length - 1] && (t3 = e3.pop()), e3.length) {
            case 4:
            case 5:
              return t3 ? this.updateChannel(params, t3) : this.updateChannel(params);
            default:
              return oe(this._iid, (function(e4) {
                return e4(me.error, null);
              }), t3);
          }
        } }, { key: "muteUser", value: function(e3, t3, n3, r2) {
          return this.muteUserWithUserId(e3 ? e3.userId : null, t3, n3, r2);
        } }, { key: "muteUserWithUserId", value: function(e3, t3, n3, r2) {
          var i2 = this, s2 = null, a2 = me.parse(arguments, [new me({ type: "string" }), new me({ type: "number", optional: true, defaultValue: -1, constraint: function(e4) {
            return e4 >= -1;
          } }), new me({ type: "string", optional: true, defaultValue: "" }), new me({ type: "callback" })]), o2 = C(a2, 5);
          return s2 = o2[0], e3 = o2[1], t3 = o2[2], n3 = o2[3], r2 = o2[4], oe(this._iid, (function(r3) {
            s2 ? r3(s2, null) : O.get(i2._iid).container.apiClient.muteUser({ channelUrl: i2.url, userId: e3, description: n3, seconds: t3, isGroupChannel: false }, (function(e4, t4) {
              r3(e4, null);
            }));
          }), r2);
        } }, { key: "unmuteUser", value: function(e3, t3) {
          return this.unmuteUserWithUserId(e3 ? e3.userId : null, t3);
        } }, { key: "unmuteUserWithUserId", value: function(e3, t3) {
          var n3 = this, r2 = null, i2 = me.parse(arguments, [new me({ type: "string" }), new me({ type: "callback" })]), s2 = C(i2, 3);
          return r2 = s2[0], e3 = s2[1], t3 = s2[2], oe(this._iid, (function(t4) {
            r2 ? t4(r2, null) : O.get(n3._iid).container.apiClient.unmuteUser({ channelUrl: n3.url, userId: e3, isGroupChannel: false }, (function(e4, n4) {
              t4(e4, null);
            }));
          }), t3);
        } }, { key: "banUser", value: function(e3, t3, n3) {
          return this.banUserWithUserId(e3 ? e3.userId : null, t3, n3);
        } }, { key: "banUserWithUserId", value: function(e3, t3, n3) {
          var r2 = this, i2 = null, s2 = me.parse(arguments, [new me({ type: "string" }), new me({ type: "number", optional: true, defaultValue: -1, constraint: function(e4) {
            return e4 >= -1;
          } }), new me({ type: "callback" })]), a2 = C(s2, 4);
          return i2 = a2[0], e3 = a2[1], t3 = a2[2], n3 = a2[3], oe(this._iid, (function(n4) {
            i2 ? n4(i2, null) : O.get(r2._iid).container.apiClient.banUser({ channelUrl: r2.url, userId: e3, description: null, seconds: t3, isGroupChannel: false }, (function(e4, t4) {
              n4(e4, null);
            }));
          }), n3);
        } }, { key: "unbanUser", value: function(e3, t3) {
          return this.unbanUserWithUserId(e3 ? e3.userId : null, t3);
        } }, { key: "unbanUserWithUserId", value: function(e3, t3) {
          var n3 = this, r2 = null, i2 = me.parse(arguments, [new me({ type: "string" }), new me({ type: "callback" })]), s2 = C(i2, 3);
          return r2 = s2[0], e3 = s2[1], t3 = s2[2], oe(this._iid, (function(t4) {
            r2 ? t4(r2, null) : O.get(n3._iid).container.apiClient.unbanUser({ channelUrl: n3.url, userId: e3, isGroupChannel: false }, (function(e4, n4) {
              t4(e4, null);
            }));
          }), t3);
        } }, { key: "setLatestParticipantCount", value: function(e3, t3) {
          var n3 = false;
          return "number" == typeof e3 && "number" == typeof t3 && t3 >= _r.get(this) && (_r.set(this, t3), n3 = e3 !== this.participantCount, this.participantCount = e3), n3;
        } }, { key: "delete", value: function(e3) {
          var t3 = this;
          return oe(this._iid, (function(e4) {
            O.get(t3._iid).container.apiClient.deleteOpenChannel({ channelUrl: t3.url }, (function(n3, r2) {
              n3 || (delete x.get(t3._iid).OpenChannel.cachedChannels[t3.url], x.get(t3._iid).FileMessageQueue.delete(t3.url));
              e4(n3, r2);
            }));
          }), e3);
        } }], [{ key: "cachedChannels", get: function() {
          return pr[this._iid] || (pr[this._iid] = {}), pr[this._iid];
        } }, { key: "enteredChannels", get: function() {
          return fr[this._iid] || (fr[this._iid] = {}), fr[this._iid];
        } }, { key: "buildFromSerializedData", value: function(e3) {
          var t3 = x.get(this._iid), n3 = t3.User, r2 = t3.OpenChannel, i2 = ct.deserialize(e3);
          return new r2({ channel_url: i2.url, name: i2.name, cover_url: i2.coverUrl, data: i2.data, custom_type: i2.customType, created_at: i2.createdAt / 1e3, freeze: i2.isFrozen, is_ephemeral: i2.isEphemeral, participant_count: i2.participantCount, operators: i2.operators.map((function(e4) {
            return n3.objectify(e4);
          })) });
        } }, { key: "getChannel", value: function(e3, t3) {
          var n3 = null, r2 = null, i2 = me.parse(arguments, [new me({ type: "string", constraint: function(e4) {
            return e4.length > 0;
          } }), new me({ type: "string", optional: true, nullable: true, defaultValue: null }), new me({ type: "callback" })]), s2 = C(i2, 4);
          if (n3 = s2[0], e3 = s2[1], r2 = s2[2], t3 = s2[3], n3) return oe(this._iid, (function(e4) {
            e4(n3, null);
          }), t3);
          var a2 = x.get(this._iid), o2 = a2.OpenChannel;
          return o2.cachedChannels[e3] ? oe(this._iid, (function(t4) {
            t4(null, o2.cachedChannels[e3]);
          }), t3) : o2.getChannelWithoutCache(e3, r2, t3);
        } }, { key: "getChannelWithoutCache", value: function(e3, t3) {
          var n3 = this, r2 = null, i2 = null, s2 = me.parse(arguments, [new me({ type: "string", constraint: function(e4) {
            return e4.length > 0;
          } }), new me({ type: "string", optional: true, nullable: true, defaultValue: null }), new me({ type: "callback" })]), a2 = C(s2, 4);
          return r2 = a2[0], e3 = a2[1], i2 = a2[2], t3 = a2[3], oe(this._iid, (function(t4) {
            r2 ? t4(r2, null) : O.get(n3._iid).container.apiClient.getOpenChannel({ channelUrl: e3, internalCall: i2 }, (function(e4, r3) {
              var i3 = null;
              e4 || (i3 = x.get(n3._iid).OpenChannel.upsert(r3));
              t4(e4, i3);
            }));
          }), t3);
        } }, { key: "createChannel", value: function() {
          var e3 = this, t3 = me.toArray(arguments), n3 = null;
          "function" == typeof t3[t3.length - 1] && (n3 = t3.pop());
          var r2 = x.get(this._iid), i2 = r2.OpenChannel, s2 = r2.OpenChannelParams;
          if (t3[0] instanceof s2 && 1 === t3.length) return oe(this._iid, (function(n4) {
            var r3 = t3[0];
            r3._validate() ? O.get(e3._iid).container.apiClient.createOpenChannel(r3, (function(t4, r4) {
              var i3 = null;
              t4 || (i3 = x.get(e3._iid).OpenChannel.upsert(r4));
              n4(t4, i3);
            })) : n4(me.error, null);
          }), n3);
          var a2 = new s2();
          switch (t3.length) {
            case 0:
              break;
            case 1:
              a2.name = t3[0];
              break;
            case 2:
              a2.name = t3[0], a2.coverUrlOrImage = t3[1];
              break;
            case 3:
              a2.name = t3[0], a2.coverUrlOrImage = t3[1], a2.data = t3[2];
              break;
            case 4:
              a2.name = t3[0], a2.coverUrlOrImage = t3[1], a2.data = t3[2], a2.operatorUserIds = t3[3];
              break;
            case 5:
              a2.name = t3[0], a2.coverUrlOrImage = t3[1], a2.data = t3[2], a2.operatorUserIds = t3[3], a2.customType = t3[4];
              break;
            default:
              return oe(this._iid, (function(e4) {
                return e4(me.error, null);
              }), n3);
          }
          return n3 ? i2.createChannel(a2, n3) : i2.createChannel(a2);
        } }, { key: "createChannelWithOperatorUserIds", value: function() {
          var e3 = me.toArray(arguments), t3 = void 0;
          switch ("function" == typeof e3[e3.length - 1] && (t3 = e3.pop()), e3.length) {
            case 4:
            case 5:
              return t3 ? this.createChannel.apply(this, A(e3).concat([t3])) : this.createChannel.apply(this, A(e3));
            default:
              return oe(this._iid, (function(e4) {
                return e4(me.error, null);
              }), t3);
          }
        } }, { key: "upsert", value: function(e3) {
          var t3 = new (0, x.get(this._iid).OpenChannel)(e3);
          return this.cachedChannels.hasOwnProperty(t3.url) ? this.cachedChannels[t3.url].update(e3) : this.cachedChannels[t3.url] = t3, this.cachedChannels[t3.url];
        } }, { key: "removeCachedChannel", value: function(e3) {
          this.cachedChannels[e3] && delete this.cachedChannels[e3], x.get(this._iid).FileMessageQueue.delete(e3);
        } }, { key: "clearCache", value: function() {
          pr[this._iid] = {}, x.get(this._iid).FileMessageQueue.clear();
        } }, { key: "clearEnteredChannels", value: function() {
          fr[this._iid] = {};
        } }, { key: "createOpenChannelListQuery", value: function() {
          return new (0, x.get(this._iid).OpenChannelListQuery)();
        } }]), n2;
      })(Rt), yr = "default", mr = (function() {
        function e2(e3) {
          this.name = yr, this.volume = 1, e3 && this._update(e3);
        }
        return e2.prototype._update = function(e3) {
          e3.hasOwnProperty("name") && (this.name = e3.name), e3.hasOwnProperty("volume") && (this.volume = e3.volume);
        }, e2.objectify = function(e3) {
          var t2 = e3.name, n2 = void 0 === t2 ? yr : t2, r2 = e3.volume;
          return { name: n2, volume: void 0 === r2 ? 1 : r2 };
        }, e2.prototype.serialize = function() {
          return ct.serialize(this);
        }, e2;
      })(), Er = (function() {
        function e2(e3, t2) {
          void 0 === t2 && (t2 = []), this.key = e3, this.value = Array.isArray(t2) && t2.every((function(e4) {
            return "string" == typeof e4;
          })) ? t2 : [];
        }
        return e2.prototype.encode = function() {
          return { key: this.key, value: this.value || [] };
        }, e2;
      })(), vr = /* @__PURE__ */ new WeakMap(), br = (function() {
        function e2(t2) {
          c(this, e2), this._mentionType = e2.MentionType.USERS, this._mentionedUserIds = [], this._cachedMentionedUsers = [], this._cachedMentionedUserIds = [], this._metaArrays = [], vr.set(this, null), this._parentMessageId = null, this._reqId = null, this.data = null, this.customType = null, this.pushNotificationDeliveryOption = null, this.appleCriticalAlertOptions = null, this.isReplyToChannel = false, this.mentionedMessageTemplate = null, t2 && this._update(t2);
        }
        return h(e2, [{ key: "mentionType", get: function() {
          return this._mentionType;
        }, set: function(e3) {
          var t2 = x.get(this._iid).BaseMessageParams;
          Object.keys(t2.MentionType).map((function(e4) {
            return t2.MentionType[e4];
          })).indexOf(e3) > -1 && (this._mentionType = e3);
        } }, { key: "mentionedUserIds", get: function() {
          return this._cachedMentionedUserIds;
        }, set: function(e3) {
          if (Array.isArray(e3)) {
            if (0 === e3.length) return this._cachedMentionedUserIds = [], void (this._mentionedUserIds = []);
            for (var t2 = wi.getInstance(this._iid), n2 = 0; n2 < e3.length; n2++) {
              var r2 = e3[n2];
              if ("string" != typeof r2) {
                this._cachedMentionedUserIds = [], this._mentionedUserIds = [];
                break;
              }
              this._mentionedUserIds.indexOf(r2) < 0 && t2.currentUser && t2.currentUser.userId !== r2 && (this._cachedMentionedUserIds.push(r2), this._mentionedUserIds.push(r2));
            }
          }
        } }, { key: "mentionedUsers", get: function() {
          return this._cachedMentionedUsers;
        }, set: function(e3) {
          if (Array.isArray(e3)) {
            if (0 === e3.length) return this._cachedMentionedUserIds = [], void (this._mentionedUserIds = []);
            for (var t2 = wi.getInstance(this._iid), n2 = 0; n2 < e3.length; n2++) {
              var r2 = e3[n2];
              if (!r2.hasOwnProperty("userId")) {
                this._cachedMentionedUsers = [], this._mentionedUserIds = [];
                break;
              }
              this._mentionedUserIds.indexOf(r2.userId) < 0 && t2.currentUser && t2.currentUser.userId !== r2.userId && (this._cachedMentionedUsers.push(r2), this._mentionedUserIds.push(r2.userId));
            }
          }
        } }, { key: "metaArrayKeys", get: function() {
          return this._metaArrays.map((function(e3) {
            return e3.key;
          }));
        }, set: function(e3) {
          var t2 = x.get(this._iid).MessageMetaArray, n2 = {};
          if (Array.isArray(e3)) {
            this._metaArrays = [];
            for (var r2 = 0; r2 < e3.length; r2++) "string" != typeof e3[r2] || n2[e3[r2]] || (n2[e3[r2]] = true, this._metaArrays.push(new t2(e3[r2])));
          }
        } }, { key: "metaArrays", get: function() {
          return this._metaArrays;
        }, set: function(e3) {
          var t2 = x.get(this._iid).MessageMetaArray;
          if (Array.isArray(e3)) {
            this._metaArrays = [];
            for (var n2 = 0; n2 < e3.length; n2++) {
              var r2 = e3[n2];
              if (r2 instanceof t2) {
                var i2, s2 = this._metaArrays.map((function(e4) {
                  return e4.key;
                })).indexOf(r2.key);
                if (s2 < 0) this._metaArrays.push(r2);
                else (i2 = this._metaArrays[s2].value).push.apply(i2, A(r2.value));
              }
            }
          }
        } }, { key: "rootMessageId", get: function() {
          return vr.get(this);
        } }, { key: "parentMessageId", get: function() {
          return this._parentMessageId;
        }, set: function(e3) {
          vr.set(this, e3), this._parentMessageId = e3;
        } }, { key: "_serialize", value: function(e3) {
          return ct.serialize(this, (function(t2) {
            t2.hasOwnProperty("_mentionType") && (t2.mentionType = t2._mentionType, delete t2._mentionType), t2.hasOwnProperty("_mentionedUserIds") && (t2.mentionedUserIds = t2._mentionedUserIds, delete t2._mentionedUserIds), t2.hasOwnProperty("_cachedMentionedUsers") && (t2.cachedMentionedUsers = t2._cachedMentionedUsers, delete t2._cachedMentionedUsers), t2.hasOwnProperty("_cachedMentionedUserIds") && (t2.cachedMentionedUserIds = t2._cachedMentionedUserIds, delete t2._cachedMentionedUserIds), t2.hasOwnProperty("_metaArrays") && (t2.metaArrays = t2._metaArrays, delete t2._metaArrays), t2.hasOwnProperty("_parentMessageId") && (t2.parentMessageId = t2._parentMessageId, delete t2._parentMessageId), e3 && e3(t2);
          }));
        } }, { key: "_update", value: function(e3) {
          e3.hasOwnProperty("mention_type") && (this._mentionType = e3.mention_type), e3.hasOwnProperty("mentioned_user_ids") && (this._mentionedUserIds = e3.mentioned_user_ids), e3.hasOwnProperty("mentioned_message_template") && (this.mentionedMessageTemplate = e3.mentioned_message_template), e3.hasOwnProperty("cached_mentioned_users") && (this._cachedMentionedUsers = e3.cached_mentioned_users), e3.hasOwnProperty("cached_mentioned_user_ids") && (this._cachedMentionedUserIds = e3.cached_mentioned_user_ids), e3.hasOwnProperty("meta_arrays") && (this._metaArrays = e3.meta_arrays.map((function(e4) {
            return new Er(e4.key, e4.value);
          }))), e3.hasOwnProperty("parent_message_id") && (this.parentMessageId = e3.parent_message_id), e3.hasOwnProperty("data") && (this.data = e3.data), e3.hasOwnProperty("custom_type") && (this.customType = e3.custom_type), e3.hasOwnProperty("push_notification_delivery_option") && (this.pushNotificationDeliveryOption = e3.push_notification_delivery_option), e3.hasOwnProperty("apple_critical_alert_options") && (this.appleCriticalAlertOptions = new mr(e3.apple_critical_alert_options)), e3.hasOwnProperty("is_reply_to_channel") && (this.isReplyToChannel = e3.is_reply_to_channel);
        } }, { key: "_validate", value: function() {
          var e3 = x.get(this._iid), t2 = e3.BaseMessageParams, n2 = e3.MessageMetaArray, r2 = vr.get(this);
          return Object.keys(t2.MentionType).map((function(e4) {
            return t2.MentionType[e4];
          })).indexOf(this.mentionType) > -1 && this._mentionedUserIds.every((function(e4) {
            return "string" == typeof e4;
          })) && ("string" == typeof this.mentionedMessageTemplate || null === this.mentionedMessageTemplate) && Array.isArray(this._metaArrays) && this._metaArrays.every((function(e4) {
            return e4 instanceof n2;
          })) && ("number" == typeof r2 || null === r2) && ("number" == typeof this._parentMessageId || null === this._parentMessageId) && ("string" == typeof this.data || null === this.data) && ("string" == typeof this.customType || null === this.customType) && (null === this.pushNotificationDeliveryOption || Object.keys(t2.PushNotificationDeliveryOption).map((function(e4) {
            return t2.PushNotificationDeliveryOption[e4];
          })).indexOf(this.pushNotificationDeliveryOption) > -1) && (null === this.appleCriticalAlertOptions || this.appleCriticalAlertOptions instanceof mr) && "boolean" == typeof this.isReplyToChannel;
        } }], [{ key: "_objectify", value: function(t2) {
          var n2 = t2.mentionType, r2 = void 0 === n2 ? e2.MentionType.USERS : n2, i2 = t2.mentionedUserIds, s2 = void 0 === i2 ? [] : i2, a2 = t2.mentionedMessageTemplate, o2 = void 0 === a2 ? null : a2, l2 = t2.cachedMentionedUsers, u2 = void 0 === l2 ? [] : l2, c2 = t2.cachedMentionedUserIds, d2 = void 0 === c2 ? [] : c2, h2 = t2.metaArrays, p2 = void 0 === h2 ? [] : h2, f2 = t2.parentMessageId, _2 = void 0 === f2 ? null : f2, g2 = t2.pushNotificationDeliveryOption, y2 = void 0 === g2 ? null : g2, m2 = t2.appleCriticalAlertOptions, E2 = void 0 === m2 ? null : m2, v2 = t2.isReplyToChannel;
          return { mention_type: r2, mentioned_user_ids: s2, mentioned_message_template: o2, cached_mentioned_users: u2, cached_mentioned_user_ids: d2, meta_arrays: p2, parent_message_id: _2, push_notification_delivery_option: y2, apple_critical_alert_options: E2, is_reply_to_channel: void 0 !== v2 && v2 };
        } }, { key: "MentionType", get: function() {
          return { USERS: "users", CHANNEL: "channel" };
        } }, { key: "PushNotificationDeliveryOption", get: function() {
          return { DEFAULT: "default", SUPPRESS: "suppress" };
        } }]), e2;
      })(), Cr = (function(e2) {
        f(n2, e2);
        var t2 = E(n2);
        function n2(e3) {
          var r2;
          return c(this, n2), (r2 = t2.call(this, e3)).message = null, r2._translationTargetLanguages = [], e3 && r2._update(e3), r2;
        }
        return h(n2, [{ key: "serialize", value: function() {
          return b(_(n2.prototype), "_serialize", this).call(this, (function(e3) {
            e3.hasOwnProperty("_translationTargetLanguages") && (e3.translationTargetLanguages = e3._translationTargetLanguages, delete e3._translationTargetLanguages);
          }));
        } }, { key: "targetLanguages", get: function() {
          return this.translationTargetLanguages;
        }, set: function(e3) {
          this.translationTargetLanguages = e3;
        } }, { key: "translationTargetLanguages", get: function() {
          return this._translationTargetLanguages;
        }, set: function(e3) {
          if (Array.isArray(e3)) {
            for (var t3 = 0; t3 < e3.length; t3++) if ("string" != typeof e3[t3]) return void (this._translationTargetLanguages = []);
            this._translationTargetLanguages = e3;
          }
        } }, { key: "_update", value: function(e3) {
          b(_(n2.prototype), "_update", this).call(this, e3), e3.hasOwnProperty("message") && (this.message = e3.message), e3.hasOwnProperty("translation_target_languages") && (this._translationTargetLanguages = e3.translation_target_languages);
        } }, { key: "_validate", value: function() {
          return b(_(n2.prototype), "_validate", this).call(this) && ("string" == typeof this.message || null === this.message) && Array.isArray(this.translationTargetLanguages) && this.translationTargetLanguages.every((function(e3) {
            return "string" == typeof e3;
          }));
        } }], [{ key: "objectify", value: function(e3) {
          var t3 = e3.message, n3 = void 0 === t3 ? null : t3, r2 = e3.data, i2 = void 0 === r2 ? null : r2, s2 = e3.customType, a2 = void 0 === s2 ? null : s2, o2 = e3.translationTargetLanguages, u2 = void 0 === o2 ? [] : o2;
          return l(l({}, br._objectify(e3)), {}, { message: n3, data: i2, custom_type: a2, translation_target_languages: u2 });
        } }]), n2;
      })(br), Ar = (function() {
        function e2(e3, t2, n2) {
          void 0 === t2 && (t2 = []), void 0 === n2 && (n2 = 0), this.key = e3, this.userIds = t2, this.updatedAt = n2;
          for (var r2 = {}, i2 = 0, s2 = this.userIds; i2 < s2.length; i2++) {
            r2[s2[i2]] = this.updatedAt;
          }
          this._version = r2;
        }
        return Object.defineProperty(e2.prototype, "isEmpty", { get: function() {
          return 0 === this.userIds.length;
        }, enumerable: false, configurable: true }), e2.createFromJson = function(e3) {
          var t2 = e3.key, n2 = e3.user_ids, r2 = e3.updated_at;
          return "string" == typeof t2 && t2 && Array.isArray(n2) && n2.length > 0 && "number" == typeof r2 ? new this(t2, n2, r2) : null;
        }, e2.objectify = function(e3) {
          return { key: e3.key, user_ids: e3.userIds, updated_at: e3.updatedAt };
        }, e2.prototype._applyEvent = function(e3) {
          if (e3.key === this.key && (!this._version[e3.userId] || this._version[e3.userId] < e3.updatedAt)) {
            var t2 = this.userIds.indexOf(e3.userId);
            switch (e3.operation) {
              case "add":
                t2 < 0 && this.userIds.push(e3.userId);
                break;
              case "delete":
                t2 >= 0 && this.userIds.splice(t2, 1);
            }
            this._version[e3.userId] = e3.updatedAt;
          }
        }, e2;
      })(), Nr = (function(e2) {
        f(n2, e2);
        var t2 = E(n2);
        function n2(e3) {
          var r2;
          return c(this, n2), (r2 = t2.call(this, e3)).messageType = pt.MESSAGE_TYPE_USER, r2.message = null, r2._sender = null, r2.translations = {}, r2.requestState = null, r2.requestedMentionUserIds = [], r2.errorCode = 0, r2.messageSurvivalSeconds = -1, r2.plugins = [], r2._messageParams = null, e3 && r2._update(e3), r2;
        }
        return h(n2, [{ key: "_update", value: function(e3) {
          var t3 = wi.getInstance(this._iid), n3 = x.get(this._iid), r2 = n3.Sender, i2 = n3.Plugin;
          this.message = String(e3.message), this._sender = new r2(e3.user), this.reqId = e3.hasOwnProperty("req_id") ? String(e3.req_id) : "", this.translations = e3.hasOwnProperty("translations") ? e3.translations : {}, this.requestState = this.messageId > 0 ? t3.MessageRequestState.SUCCEEDED : t3.MessageRequestState.FAILED, e3.hasOwnProperty("sending_status") && (this.requestState = e3.sending_status, this.requestState === t3.MessageSendingStatus.CANCELED && (this.requestState = t3.MessageRequestState.FAILED)), this.requestedMentionUserIds = [], e3.hasOwnProperty("requested_mention_user_ids") && (this.requestedMentionUserIds = e3.requested_mention_user_ids), this.errorCode = 0, e3.hasOwnProperty("error_code") && (this.errorCode = e3.error_code), this.messageSurvivalSeconds = -1, e3.hasOwnProperty("message_survival_seconds") && (this.messageSurvivalSeconds = e3.message_survival_seconds), this.plugins = [], e3.hasOwnProperty("plugins") && Array.isArray(e3.plugins) && (this.plugins = e3.plugins.map((function(e4) {
            return new i2(e4);
          }))), e3.hasOwnProperty("message_params") && (this._messageParams = new Cr(e3.message_params));
        } }, { key: "sender", get: function() {
          var e3 = wi.getInstance(this._iid), t3 = x.get(this._iid).GroupChannel;
          if (this._sender && e3.Options.useMemberAsMessageSender && this.isGroupChannel()) {
            var n3 = t3.cachedChannels[this.channelUrl];
            if (n3) {
              var r2 = n3.memberMap[this._sender.userId];
              r2 && (this._sender.nickname !== r2.nickname && (this._sender.nickname = r2.nickname), this._sender.plainProfileUrl !== r2.plainProfileUrl && (this._sender.plainProfileUrl = r2.plainProfileUrl), se.deepEqual(this._sender.metaData, r2.metaData) || (this._sender.metaData = r2.metaData));
            }
          }
          return this._sender;
        }, set: function(e3) {
          this._sender = e3;
        } }, { key: "isResendable", value: function() {
          var e3 = wi.getInstance(this._iid);
          return this.sendingStatus === e3.MessageSendingStatus.FAILED && se.isResendableError(this.errorCode);
        } }, { key: "serialize", value: function() {
          var e3 = this;
          return b(_(n2.prototype), "serialize", this).call(this, (function(t3) {
            e3._messageParams && (t3.messageParams = e3._messageParams.serialize());
          }));
        } }, { key: "messageParams", get: function() {
          return this._messageParams;
        } }, { key: "_clone", value: function() {
          return x.get(this._iid).UserMessage.buildFromSerializedData(this.serialize());
        } }, { key: "_isSentByMe", value: function() {
          var e3 = wi.getInstance(this._iid);
          return this.sendingStatus === e3.MessageSendingStatus.SUCCEEDED && 0 === this.updatedAt && this._sender && this._sender.userId === e3.currentUser.userId;
        } }], [{ key: "objectify", value: function(e3) {
          var t3 = wi.getInstance(this._iid), n3 = x.get(this._iid), r2 = n3.BaseChannel, i2 = n3.BaseMessageParams, s2 = n3.Sender, a2 = n3.User, o2 = n3.UserMessage, u2 = n3.FileMessage, c2 = n3.AdminMessage, d2 = n3.ThreadInfo, h2 = n3.OGMetaData, p2 = n3.Plugin, f2 = n3.Reaction, _2 = n3.AppleCriticalAlertOptions, g2 = n3.UserMessageParams, y2 = e3.messageId, m2 = e3.messageType, E2 = void 0 === m2 ? pt.MESSAGE_TYPE_BASE : m2, v2 = e3.reqId, b2 = void 0 === v2 ? "" : v2, C2 = e3.user, A2 = e3.channel, N2 = void 0 === A2 ? null : A2, S2 = e3.channelUrl, I2 = void 0 === S2 ? "" : S2, T2 = e3.channelType, U2 = void 0 === T2 ? r2.CHANNEL_TYPE_OPEN : T2, O2 = e3.message, M2 = e3.data, k2 = void 0 === M2 ? "" : M2, R2 = e3.customType, L2 = void 0 === R2 ? "" : R2, w2 = e3.mentionType, P2 = void 0 === w2 ? i2.MentionType.USERS : w2, D2 = e3.mentionedUsers, H2 = void 0 === D2 ? [] : D2, F2 = e3.mentionedUserIds, G2 = void 0 === F2 ? [] : F2, j2 = e3.mentionedMessageTemplate, B2 = void 0 === j2 ? null : j2, V2 = e3.requestedMentionUserIds, q2 = void 0 === V2 ? [] : V2, K2 = e3.reactions, z2 = void 0 === K2 ? [] : K2, Y2 = e3.metaArrays, Q2 = void 0 === Y2 ? [] : Y2, W2 = e3.rootMessageId, J2 = void 0 === W2 ? 0 : W2, X2 = e3.parentMessageId, Z2 = void 0 === X2 ? 0 : X2, $2 = e3.parentMessageText, ee2 = void 0 === $2 ? "" : $2, te2 = e3.threadInfo, ne2 = void 0 === te2 ? null : te2, re2 = e3.isReplyToChannel, ie2 = void 0 !== re2 && re2, se2 = e3.parentMessage, ae2 = void 0 === se2 ? null : se2, oe2 = e3.translations, le2 = void 0 === oe2 ? {} : oe2, ue2 = e3.sendingStatus, ce2 = e3.errorCode, de2 = void 0 === ce2 ? 0 : ce2, he2 = e3.silent, pe2 = void 0 !== he2 && he2, fe2 = e3.isGlobalBlocked, _e2 = void 0 !== fe2 && fe2, ge2 = e3.messageSurvivalSeconds, ye2 = void 0 === ge2 ? -1 : ge2, me2 = e3.ogMetaData, Ee2 = void 0 === me2 ? null : me2, ve2 = e3.isOperatorMessage, be2 = void 0 !== ve2 && ve2, Ce2 = e3.plugins, Ae2 = void 0 === Ce2 ? [] : Ce2, Ne2 = e3.appleCriticalAlertOptions, Se2 = e3.createdAt, Ie2 = e3.updatedAt, Te2 = void 0 === Ie2 ? 0 : Ie2, Ue2 = e3.messageParams, Oe2 = void 0 === Ue2 ? null : Ue2, Me2 = e3.isAutoResendRegistered, ke2 = void 0 !== Me2 && Me2, Re2 = {};
          switch (Re2.req_id = b2, Re2.msg_id = y2, E2) {
            case pt.MESSAGE_TYPE_USER:
              Re2.type = "MESG";
              break;
            case pt.MESSAGE_TYPE_FILE:
              Re2.type = "FILE";
              break;
            case pt.MESSAGE_TYPE_ADMIN:
              Re2.type = "ADMM";
          }
          if (Re2.user = s2.objectify(l({}, C2)), Re2.channel_url = N2 ? N2.url : I2, Re2.channel_type = N2 ? N2.channelType : U2, Re2.message = O2, Re2.data = k2, Re2.custom_type = L2, Re2.translations = le2, Re2.is_global_block = !!_e2, Re2.ts = Se2, Re2.updated_at = Te2, Re2.mention_type = P2, Re2.mentioned_users = H2.map((function(e4) {
            return a2.objectify(e4);
          })), Re2.mentioned_user_ids = G2, Re2.mentioned_message_template = B2, Re2.requested_mention_user_ids = q2, Re2.reactions = z2.map((function(e4) {
            return f2.objectify(e4);
          })), Re2.metaarray = {}, Q2.forEach((function(e4) {
            var t4 = e4.key;
            Re2.metaarray[t4] = e4.value;
          })), Re2.metaarray_key_order = Q2.map((function(e4) {
            return e4.key;
          })), Re2.root_message_id = J2, Re2.parent_message_id = Z2, Re2.parent_message_text = ee2, ne2 && (Re2.thread_info = d2.objectify(ne2)), Re2.is_reply_to_channel = ie2, ae2) switch (ae2.messageType) {
            case pt.MESSAGE_TYPE_USER:
              Re2.parent_message_info = o2._objectifySerializedData(ae2);
              break;
            case pt.MESSAGE_TYPE_FILE:
              Re2.parent_message_info = u2._objectifySerializedData(ae2);
              break;
            case pt.MESSAGE_TYPE_ADMIN:
              Re2.parent_message_info = c2._objectifySerializedData(ae2);
          }
          return Re2.sending_status = y2 > 0 ? t3.MessageSendingStatus.SUCCEEDED : t3.MessageSendingStatus.FAILED, ue2 && (Re2.sending_status = ue2), Re2.silent = !!pe2, Re2.error_code = de2, Re2.message_survival_seconds = ye2, Ee2 && (Re2.og_tag = h2.objectify(Ee2)), Re2.is_op_msg = !!be2, Re2.plugins = Ae2.map((function(e4) {
            return p2.objectify(e4);
          })), Ne2 && (Re2.apple_critical_alert_options = _2.objectify(Ne2)), Oe2 && (Re2.message_params = g2.objectify(Oe2)), Re2.is_auto_resend_registered = ke2, Re2;
        } }, { key: "build", value: function(e3, t3, n3, r2, i2, s2, a2, o2, l2, u2, c2, d2, h2, p2, f2, _2, g2, y2, m2, E2, v2, b2, C2, A2, N2, S2, I2, T2, U2, O2) {
          return this.objectify({ messageId: t3, reqId: e3, user: n3, channel: r2, message: i2, data: s2, customType: a2, mentionType: p2, mentionedUsers: f2, mentionedUserIds: E2, mentionedMessageTemplate: v2, requestedMentionUserIds: C2, reactions: h2, metaArrays: d2, rootMessageId: _2, parentMessageId: g2, parentMessageText: y2, threadInfo: m2, translations: o2, sendingStatus: b2, errorCode: A2, isGlobalBlocked: l2, messageSurvivalSeconds: N2, ogMetaData: S2, isOperatorMessage: I2, plugins: T2, appleCriticalAlertOptions: U2, createdAt: u2, updatedAt: c2, messageParams: O2 });
        } }, { key: "buildFromSerializedData", value: function(e3) {
          var t3 = x.get(this._iid).UserMessage, n3 = ct.deserialize(e3);
          return new t3(this._objectifySerializedData(n3));
        } }, { key: "_objectifySerializedData", value: function(e3) {
          return x.get(this._iid).UserMessage.objectify(l(l({}, e3), {}, { channel: { url: e3.channelUrl, channelType: e3.channelType }, user: e3.sender, messageParams: e3.messageParams ? new Cr(Cr.objectify(e3.messageParams)) : null }));
        } }]), n2;
      })(pt), Sr = (function(e2) {
        f(n2, e2);
        var t2 = E(n2);
        function n2(e3) {
          var r2;
          return c(this, n2), (r2 = t2.call(this, e3)).fileName = null, r2.mimeType = null, r2.fileSize = null, r2._isUpdate = false, r2._file = null, r2._fileType = null, r2._fileUrl = null, r2._thumbnailSizes = [], e3 && r2._update(e3), r2;
        }
        return h(n2, [{ key: "serialize", value: function() {
          return b(_(n2.prototype), "_serialize", this).call(this, (function(e3) {
            e3.hasOwnProperty("_isUpdate") && (e3.isUpdate = e3._isUpdate, delete e3._isUpdate), e3.hasOwnProperty("_file") && (e3.file = e3._file, delete e3._file), e3.hasOwnProperty("_fileType") && (e3.fileType = e3._fileType, delete e3._fileType), e3.hasOwnProperty("_fileUrl") && (e3.fileUrl = e3._fileUrl, delete e3._fileUrl), e3.hasOwnProperty("_thumbnailSizes") && (e3.thumbnailSizes = e3._thumbnailSizes, delete e3._thumbnailSizes);
          }));
        } }, { key: "file", get: function() {
          return this._file;
        }, set: function(e3) {
          se.isFile(e3) && (this._fileUrl = null, this._file = e3, te.isFile(e3) ? this._fileType = D.FILE : te.isBlob(e3) ? this._fileType = D.BLOB : te.isFileLikeObject(e3) ? this._fileType = D.BLOB_LIKE_OBJECT : "string" == typeof e3 && (this._fileType = D.URL));
        } }, { key: "fileType", get: function() {
          return this._fileType;
        } }, { key: "fileUrl", get: function() {
          return this._fileUrl;
        }, set: function(e3) {
          "string" == typeof e3 && (this._fileUrl = e3, this._file = null);
        } }, { key: "thumbnailSizes", get: function() {
          return this._thumbnailSizes;
        }, set: function(e3) {
          if (Array.isArray(e3)) {
            for (var t3 = 0; t3 < e3.length; t3++) if ("object" !== u(e3[t3]) || "number" != typeof e3[t3].maxWidth || "number" != typeof e3[t3].maxHeight) return void (this._thumbnailSizes = []);
            this._thumbnailSizes = e3;
          }
        } }, { key: "_update", value: function(e3) {
          b(_(n2.prototype), "_update", this).call(this, e3), e3.hasOwnProperty("file_name") && (this.fileName = e3.file_name), e3.hasOwnProperty("mime_type") && (this.mimeType = e3.mime_type), e3.hasOwnProperty("file_size") && (this.fileSize = e3.file_size), e3.hasOwnProperty("is_update") && (this._isUpdate = e3.is_update), e3.hasOwnProperty("file") && (this._file = e3.file), e3.hasOwnProperty("file_type") && (this._fileType = e3.file_type), e3.hasOwnProperty("file_url") && (this._fileUrl = e3.file_url), e3.hasOwnProperty("thumbnail_sizes") && (this._thumbnailSizes = e3.thumbnail_sizes);
        } }, { key: "_validate", value: function() {
          return b(_(n2.prototype), "_validate", this).call(this) && (this._isUpdate || se.isFile(this.file) || "string" == typeof this.fileUrl) && ("string" == typeof this.fileName || null === this.fileName) && ("string" == typeof this.mimeType || null === this.mimeType) && ("number" == typeof this.fileSize || null === this.fileSize) && (null === this._thumbnailSizes || this._thumbnailSizes.every((function(e3) {
            return "object" === u(e3) && e3.maxWidth > 0 && e3.maxHeight > 0;
          })));
        } }], [{ key: "objectify", value: function(e3) {
          var t3 = e3.fileName, n3 = void 0 === t3 ? null : t3, r2 = e3.mimeType, i2 = void 0 === r2 ? null : r2, s2 = e3.fileSize, a2 = void 0 === s2 ? null : s2, o2 = e3.data, u2 = void 0 === o2 ? null : o2, c2 = e3.customType, d2 = void 0 === c2 ? null : c2, h2 = e3.isUpdate, p2 = void 0 !== h2 && h2, f2 = e3.file, _2 = void 0 === f2 ? null : f2, g2 = e3.fileType, y2 = void 0 === g2 ? null : g2, m2 = e3.fileUrl, E2 = void 0 === m2 ? null : m2, v2 = e3.thumbnailSizes, b2 = void 0 === v2 ? [] : v2;
          return l(l({}, br._objectify(e3)), {}, { file_name: n3, mime_type: i2, file_size: a2, data: u2, custom_type: d2, is_update: p2, file: _2, file_type: y2, file_url: E2, thumbnail_sizes: b2 });
        } }]), n2;
      })(br), Ir = (function(e2) {
        f(n2, e2);
        var t2 = E(n2);
        function n2(e3) {
          var r2;
          return c(this, n2), (r2 = t2.call(this, e3)).messageType = pt.MESSAGE_TYPE_FILE, r2.plainUrl = null, r2.name = "File", r2.size = 0, r2.type = null, r2.thumbnails = [], r2._sender = null, r2.requireAuth = null, r2.requestState = null, r2.requestedMentionUserIds = [], r2.errorCode = 0, r2.messageSurvivalSeconds = -1, r2._messageParams = null, e3 && r2._update(e3), r2;
        }
        return h(n2, [{ key: "_update", value: function(e3) {
          var t3 = wi.getInstance(this._iid), n3 = O.get(this._iid).container.auth, r2 = x.get(this._iid).Sender;
          if (this._sender = new r2(e3.user), this.requireAuth = !!e3.hasOwnProperty("require_auth") && e3.require_auth, e3.hasOwnProperty("url") && (this.plainUrl = e3.url.split("?auth=")[0]), this.name = e3.hasOwnProperty("name") ? e3.name : "File", this.size = parseInt(e3.size) || 0, this.type = e3.type, e3.hasOwnProperty("custom") && (this.data = e3.custom), e3.hasOwnProperty("file")) {
            var i2 = e3.file;
            i2.hasOwnProperty("url") && (this.plainUrl = i2.url), i2.hasOwnProperty("name") && (this.name = i2.name), i2.hasOwnProperty("size") && (this.size = i2.size), i2.hasOwnProperty("type") && (this.type = i2.type), i2.hasOwnProperty("custom") && (this.data = i2.custom);
          }
          if (Object.defineProperty(this, "url", { value: this.requireAuth ? "".concat(this.plainUrl, "?auth=").concat(n3.eKey) : this.plainUrl, configurable: true, writable: false }), this.reqId = e3.hasOwnProperty("req_id") ? String(e3.req_id) : "", this.thumbnails = e3.hasOwnProperty("thumbnails") ? e3.thumbnails : [], this.requireAuth) for (var s2 = 0; s2 < this.thumbnails.length; s2++) this.thumbnails[s2].plainUrl = String(this.thumbnails[s2].url).split("?auth=")[0], this.thumbnails[s2].url = this.requireAuth ? "".concat(this.thumbnails[s2].plainUrl, "?auth=").concat(n3.eKey) : this.thumbnails[s2].plainUrl;
          this.requestState = this.messageId > 0 ? t3.MessageRequestState.SUCCEEDED : t3.MessageRequestState.FAILED, e3.hasOwnProperty("sending_status") && (this.requestState = e3.sending_status, this.requestState === t3.MessageSendingStatus.CANCELED && (this.requestState = t3.MessageRequestState.FAILED)), this.requestedMentionUserIds = [], e3.hasOwnProperty("requested_mention_user_ids") && (this.requestedMentionUserIds = e3.requested_mention_user_ids), this.errorCode = 0, e3.hasOwnProperty("error_code") && (this.errorCode = e3.error_code), this.messageSurvivalSeconds = -1, e3.hasOwnProperty("message_survival_seconds") && (this.messageSurvivalSeconds = e3.message_survival_seconds), e3.hasOwnProperty("message_params") && (this._messageParams = new Sr(e3.message_params));
        } }, { key: "sender", get: function() {
          var e3 = wi.getInstance(this._iid), t3 = x.get(this._iid).GroupChannel;
          if (this._sender && e3.Options.useMemberAsMessageSender && this.isGroupChannel()) {
            var n3 = t3.cachedChannels[this.channelUrl];
            if (n3) {
              var r2 = n3.memberMap[this._sender.userId];
              r2 && (this._sender.nickname !== r2.nickname && (this._sender.nickname = r2.nickname), this._sender.plainProfileUrl !== r2.plainProfileUrl && (this._sender.plainProfileUrl = r2.plainProfileUrl), se.deepEqual(this._sender.metaData, r2.metaData) || (this._sender.metaData = r2.metaData));
            }
          }
          return this._sender;
        }, set: function(e3) {
          this._sender = e3;
        } }, { key: "isResendable", value: function() {
          var e3 = wi.getInstance(this._iid);
          return this.sendingStatus === e3.MessageSendingStatus.FAILED && se.isResendableError(this.errorCode);
        } }, { key: "serialize", value: function() {
          var e3 = this;
          return b(_(n2.prototype), "serialize", this).call(this, (function(t3) {
            e3._messageParams && (t3.messageParams = e3._messageParams.serialize());
          }));
        } }, { key: "messageParams", get: function() {
          return this._messageParams;
        } }, { key: "_clone", value: function() {
          var e3 = x.get(this._iid).FileMessage.buildFromSerializedData(this.serialize());
          if (this._messageParams && e3._messageParams) {
            var t3 = this._messageParams.file;
            t3 && te.isBlob(t3) && (e3._messageParams.file = t3.slice());
          }
          return e3;
        } }, { key: "_isSentByMe", value: function() {
          var e3 = wi.getInstance(this._iid);
          return this.sendingStatus === e3.MessageSendingStatus.SUCCEEDED && 0 === this.updatedAt && this._sender && this._sender.userId === e3.currentUser.userId;
        } }], [{ key: "objectify", value: function(e3) {
          var t3 = wi.getInstance(this._iid), n3 = x.get(this._iid), r2 = n3.BaseChannel, i2 = n3.BaseMessageParams, s2 = n3.Sender, a2 = n3.User, o2 = n3.UserMessage, u2 = n3.FileMessage, c2 = n3.AdminMessage, d2 = n3.ThreadInfo, h2 = n3.OGMetaData, p2 = n3.Reaction, f2 = n3.FileMessageParams, _2 = n3.AppleCriticalAlertOptions, g2 = e3.messageId, y2 = e3.messageType, m2 = void 0 === y2 ? pt.MESSAGE_TYPE_BASE : y2, E2 = e3.reqId, v2 = void 0 === E2 ? "" : E2, b2 = e3.user, C2 = void 0 === b2 ? {} : b2, A2 = e3.channel, N2 = e3.plainUrl, S2 = e3.name, I2 = void 0 === S2 ? null : S2, T2 = e3.type, U2 = e3.size, O2 = void 0 === U2 ? 0 : U2, M2 = e3.data, k2 = void 0 === M2 ? "" : M2, R2 = e3.customType, L2 = void 0 === R2 ? "" : R2, w2 = e3.mentionType, P2 = void 0 === w2 ? i2.MentionType.USERS : w2, D2 = e3.mentionedUsers, H2 = void 0 === D2 ? [] : D2, F2 = e3.mentionedUserIds, G2 = void 0 === F2 ? [] : F2, j2 = e3.requestedMentionUserIds, B2 = void 0 === j2 ? [] : j2, V2 = e3.reactions, q2 = void 0 === V2 ? [] : V2, K2 = e3.metaArrays, z2 = void 0 === K2 ? [] : K2, Y2 = e3.rootMessageId, Q2 = void 0 === Y2 ? 0 : Y2, W2 = e3.parentMessageId, J2 = void 0 === W2 ? 0 : W2, X2 = e3.parentMessageText, Z2 = void 0 === X2 ? "" : X2, $2 = e3.threadInfo, ee2 = void 0 === $2 ? null : $2, te2 = e3.isReplyToChannel, ne2 = void 0 !== te2 && te2, re2 = e3.parentMessage, ie2 = void 0 === re2 ? null : re2, se2 = e3.thumbnails, ae2 = void 0 === se2 ? [] : se2, oe2 = e3.requireAuth, le2 = void 0 !== oe2 && oe2, ue2 = e3.sendingStatus, ce2 = e3.errorCode, de2 = void 0 === ce2 ? 0 : ce2, he2 = e3.silent, pe2 = void 0 !== he2 && he2, fe2 = e3.isGlobalBlocked, _e2 = void 0 !== fe2 && fe2, ge2 = e3.messageSurvivalSeconds, ye2 = void 0 === ge2 ? -1 : ge2, me2 = e3.ogMetaData, Ee2 = void 0 === me2 ? null : me2, ve2 = e3.isOperatorMessage, be2 = void 0 !== ve2 && ve2, Ce2 = e3.appleCriticalAlertOptions, Ae2 = e3.createdAt, Ne2 = e3.updatedAt, Se2 = void 0 === Ne2 ? 0 : Ne2, Ie2 = e3.messageParams, Te2 = void 0 === Ie2 ? null : Ie2, Ue2 = e3.isAutoResendRegistered, Oe2 = void 0 !== Ue2 && Ue2, Me2 = {};
          switch (Me2.req_id = v2, Me2.msg_id = g2, m2) {
            case pt.MESSAGE_TYPE_USER:
              Me2.type = "MESG";
              break;
            case pt.MESSAGE_TYPE_FILE:
              Me2.type = "FILE";
              break;
            case pt.MESSAGE_TYPE_ADMIN:
              Me2.type = "ADMM";
          }
          Me2.user = s2.objectify(l({}, C2)), Me2.channel_url = A2.url, Me2.channel_type = A2.channelType === r2.CHANNEL_TYPE_OPEN ? r2.CHANNEL_TYPE_OPEN : r2.CHANNEL_TYPE_GROUP, Me2.url = N2, Me2.name = I2, Me2.type = T2, Me2.size = O2, Me2.custom = k2, Me2.custom_type = L2, Me2.thumbnails = ae2, Me2.require_auth = le2, Me2.is_global_block = !!_e2, Me2.ts = Ae2, Me2.updated_at = Se2, Me2.mention_type = P2, Me2.mentioned_users = H2.map((function(e4) {
            return a2.objectify(e4);
          })), Me2.mentioned_user_ids = G2, Me2.requested_mention_user_ids = B2, Me2.reactions = q2.map((function(e4) {
            return p2.objectify(e4);
          })), Me2.metaarray = {};
          for (var ke2 = 0; ke2 < z2.length; ke2++) {
            var Re2 = z2[ke2].key;
            Me2.metaarray[Re2] = z2[ke2].value;
          }
          if (Me2.metaarray_key_order = z2.map((function(e4) {
            return e4.key;
          })), Me2.root_message_id = Q2, Me2.parent_message_id = J2, Me2.parent_message_text = Z2, ee2 && (Me2.thread_info = d2.objectify(ee2)), Me2.is_reply_to_channel = ne2, ie2) switch (ie2.messageType) {
            case r2.MESSAGE_TYPE_USER:
              Me2.parent_message_info = o2._objectifySerializedData(ie2);
              break;
            case r2.MESSAGE_TYPE_FILE:
              Me2.parent_message_info = u2._objectifySerializedData(ie2);
              break;
            case r2.MESSAGE_TYPE_ADMIN:
              Me2.parent_message_info = c2._objectifySerializedData(ie2);
          }
          return Me2.sending_status = g2 > 0 ? t3.MessageSendingStatus.SUCCEEDED : t3.MessageSendingStatus.FAILED, ue2 && (Me2.sending_status = ue2), Me2.silent = !!pe2, Me2.error_code = de2, Me2.message_survival_seconds = ye2, Ee2 && (Me2.og_tag = h2.objectify(Ee2)), Me2.is_op_msg = !!be2, Ce2 && (Me2.apple_critical_alert_options = _2.objectify(Ce2)), Te2 && (Me2.message_params = f2.objectify(Te2)), Me2.is_auto_resend_registered = Oe2, Me2;
        } }, { key: "build", value: function(e3, t3, n3, r2, i2, s2, a2, o2, l2, u2, c2, d2, h2, p2, f2, _2, g2, y2, m2, E2, v2, b2, C2, A2, N2, S2, I2, T2, U2, O2, M2, k2) {
          return this.objectify({ messageId: t3, reqId: e3, user: n3, channel: r2, plainUrl: i2, name: s2, type: a2, size: o2, data: l2, customType: u2, mentionType: y2, mentionedUsers: m2, mentionedUserIds: A2, requestedMentionUserIds: S2, reactions: g2, metaArrays: _2, rootMessageId: E2, parentMessageId: v2, parentMessageText: b2, threadInfo: C2, thumbnails: h2, requireAuth: p2, sendingStatus: N2, errorCode: I2, isGlobalBlocked: c2, messageSurvivalSeconds: T2, ogMetaData: U2, isOperatorMessage: O2, appleCriticalAlertOptions: M2, createdAt: d2, updatedAt: f2, messageParams: k2 });
        } }, { key: "buildFromSerializedData", value: function(e3) {
          var t3 = x.get(this._iid).FileMessage, n3 = ct.deserialize(e3);
          return new t3(this._objectifySerializedData(n3));
        } }, { key: "_objectifySerializedData", value: function(e3) {
          return x.get(this._iid).FileMessage.objectify(l(l({}, e3), {}, { channel: { url: e3.channelUrl, channelType: e3.channelType }, user: e3.sender, messageParams: e3.messageParams ? new Sr(Sr.objectify(e3.messageParams)) : null }));
        } }]), n2;
      })(pt), Tr = (function(e2) {
        f(n2, e2);
        var t2 = E(n2);
        function n2(e3) {
          var r2;
          return c(this, n2), (r2 = t2.call(this, e3)).messageType = pt.MESSAGE_TYPE_ADMIN, r2.message = "", r2.translations = {}, e3 && r2._update(e3), r2;
        }
        return h(n2, [{ key: "_update", value: function(e3) {
          this.message = String(e3.message), this.translations = e3.hasOwnProperty("translations") ? e3.translations : {};
        } }], [{ key: "objectify", value: function(e3) {
          var t3 = x.get(this._iid), n3 = t3.BaseChannel, r2 = t3.BaseMessageParams, i2 = t3.UserMessage, s2 = t3.FileMessage, a2 = t3.AdminMessage, o2 = t3.User, l2 = t3.ThreadInfo, u2 = t3.OGMetaData, c2 = t3.Reaction, d2 = e3.messageId, h2 = e3.messageType, p2 = void 0 === h2 ? pt.MESSAGE_TYPE_BASE : h2, f2 = e3.channel, _2 = e3.message, g2 = e3.data, y2 = void 0 === g2 ? "" : g2, m2 = e3.customType, E2 = void 0 === m2 ? "" : m2, v2 = e3.mentionType, b2 = void 0 === v2 ? r2.MentionType.USERS : v2, C2 = e3.mentionedUsers, A2 = void 0 === C2 ? [] : C2, N2 = e3.mentionedMessageTemplate, S2 = void 0 === N2 ? null : N2, I2 = e3.reactions, T2 = void 0 === I2 ? [] : I2, U2 = e3.metaArrays, O2 = void 0 === U2 ? [] : U2, M2 = e3.rootMessageId, k2 = void 0 === M2 ? 0 : M2, R2 = e3.parentMessageId, L2 = void 0 === R2 ? 0 : R2, w2 = e3.parentMessageText, P2 = void 0 === w2 ? "" : w2, D2 = e3.threadInfo, H2 = void 0 === D2 ? null : D2, F2 = e3.isReplyToChannel, G2 = void 0 !== F2 && F2, j2 = e3.parentMessage, B2 = void 0 === j2 ? null : j2, V2 = e3.translations, q2 = void 0 === V2 ? {} : V2, K2 = e3.silent, z2 = void 0 !== K2 && K2, Y2 = e3.ogMetaData, Q2 = void 0 === Y2 ? null : Y2, W2 = e3.createdAt, J2 = e3.updatedAt, X2 = void 0 === J2 ? 0 : J2, Z2 = { msg_id: d2, channel_url: f2.url, channel_type: f2.channelType === n3.CHANNEL_TYPE_OPEN ? n3.CHANNEL_TYPE_OPEN : n3.CHANNEL_TYPE_GROUP, message: _2, data: y2, custom_type: E2, silent: z2, ts: W2, updated_at: X2 };
          switch (p2) {
            case pt.MESSAGE_TYPE_USER:
              Z2.type = "MESG";
              break;
            case pt.MESSAGE_TYPE_FILE:
              Z2.type = "FILE";
              break;
            case pt.MESSAGE_TYPE_ADMIN:
              Z2.type = "ADMM";
          }
          Z2.translations = q2, Z2.mention_type = b2, Z2.mentioned_users = A2.map((function(e4) {
            return o2.objectify(e4);
          })), Z2.mentioned_message_template = S2, Z2.reactions = T2.map((function(e4) {
            return c2.objectify(e4);
          })), Z2.metaarray = {};
          for (var $2 = 0; $2 < O2.length; $2++) {
            var ee2 = O2[$2].key;
            Z2.metaarray[ee2] = O2[$2].value;
          }
          if (Z2.metaarray_key_order = O2.map((function(e4) {
            return e4.key;
          })), Z2.root_message_id = k2, Z2.parent_message_id = L2, Z2.parent_message_text = P2, H2 && (Z2.thread_info = l2.objectify(H2)), Z2.is_reply_to_channel = G2, B2) switch (B2.messageType) {
            case n3.MESSAGE_TYPE_USER:
              Z2.parent_message_info = i2._objectifySerializedData(B2);
              break;
            case n3.MESSAGE_TYPE_FILE:
              Z2.parent_message_info = s2._objectifySerializedData(B2);
              break;
            case n3.MESSAGE_TYPE_ADMIN:
              Z2.parent_message_info = a2._objectifySerializedData(B2);
          }
          return Q2 && (Z2.og_tag = u2.objectify(Q2)), Z2;
        } }, { key: "build", value: function(e3, t3, n3, r2, i2, s2, a2, o2, l2, u2, c2, d2, h2, p2, f2, _2, g2, y2) {
          return this.objectify({ messageId: e3, channel: t3, message: n3, data: r2, customType: i2, mentionType: c2, mentionedUsers: d2, mentionedMessageTemplate: h2, reactions: u2, metaArrays: l2, rootMessageId: p2, parentMessageId: f2, parentMessageText: _2, threadInfo: g2, translations: s2, ogMetaData: y2, createdAt: a2, updatedAt: o2 });
        } }, { key: "buildFromSerializedData", value: function(e3) {
          var t3 = x.get(this._iid).AdminMessage, n3 = ct.deserialize(e3);
          return new t3(this._objectifySerializedData(n3));
        } }, { key: "_objectifySerializedData", value: function(e3) {
          return x.get(this._iid).AdminMessage.objectify(l(l({}, e3), {}, { channel: { url: e3.channelUrl, channelType: e3.channelType } }));
        } }]), n2;
      })(pt), Ur = (function() {
        function e2(t2) {
          c(this, e2);
          var n2 = x.get(this._iid), r2 = n2.BaseMessage, i2 = n2.BaseMessageParams;
          this.scheduledId = 0, this.scheduledDateTimeString = "", this.scheduledTimezone = "", this.status = e2.Status.SCHEDULED, this.createdAt = 0, this.updatedAt = 0, this._messageType = r2.MESSAGE_TYPE_BASE, this._sender = null, this._channelType = "", this.channelUrl = "", this.message = "", this.customType = "", this.data = "", this.metaArrays = [], this.mentionType = i2.MentionType.USERS, this.mentionedUsers = [], this.pushNotificationDeliveryOption = i2.PushNotificationDeliveryOption.DEFAULT, this.translationTargetLanguages = [], this.errorMessage = "", this.errorCode = 0, this.appleCriticalAlertOptions = null, t2 && this._update(t2);
        }
        return h(e2, [{ key: "sender", get: function() {
          var e3 = wi.getInstance(this._iid), t2 = x.get(this._iid).GroupChannel;
          if (e3.Options.useMemberAsMessageSender && this.isGroupChannel()) {
            var n2 = t2.cachedChannels[this.channelUrl];
            if (n2) {
              var r2 = n2.memberMap[this._sender.userId];
              r2 && (this._sender.nickname !== r2.nickname && (this._sender.nickname = r2.nickname), this._sender.plainProfileUrl !== r2.plainProfileUrl && (this._sender.plainProfileUrl = r2.plainProfileUrl), se.deepEqual(this._sender.metaData, r2.metaData) || (this._sender.metaData = r2.metaData));
            }
          }
          return this._sender;
        }, set: function(e3) {
          this._sender = e3;
        } }, { key: "_update", value: function(t2) {
          var n2 = this, r2 = x.get(this._iid), i2 = r2.User, s2 = r2.Sender, a2 = r2.BaseMessageParams, o2 = r2.MessageMetaArray, l2 = r2.AppleCriticalAlertOptions;
          this.scheduledId = t2.hasOwnProperty("scheduled_id") ? parseInt(t2.scheduled_id) : 0, this.scheduledDateTimeString = t2.hasOwnProperty("scheduled_dt") ? String(t2.scheduled_dt) : "", this.scheduledTimezone = t2.hasOwnProperty("scheduled_timezone") ? String(t2.scheduled_timezone) : "", this.status = t2.hasOwnProperty("status") ? String(t2.status) : "", this.createdAt = t2.hasOwnProperty("created_at") ? parseInt(t2.created_at) : 0, this.updatedAt = t2.hasOwnProperty("updated_at") ? parseInt(t2.updated_at) : 0, this.channelUrl = t2.hasOwnProperty("channel_url") ? String(t2.channel_url) : "", this._channelType = t2.hasOwnProperty("channel_type") ? String(t2.channel_type) : "", this._messageType = t2.hasOwnProperty("type") ? String(t2.type) : "", this._sender = t2.hasOwnProperty("user") ? new s2(t2.user) : null, this.message = t2.hasOwnProperty("message") ? String(t2.message) : "", this.customType = t2.hasOwnProperty("custom_type") ? String(t2.custom_type) : "", this.data = t2.hasOwnProperty("data") ? String(t2.data) : "";
          var u2 = t2.hasOwnProperty("metaarray") ? t2.metaarray : {}, c2 = t2.hasOwnProperty("metaarray_key_order") ? t2.metaarray_key_order : Object.keys(u2).sort((function(e3, t3) {
            return e3.localeCompare(t3);
          }));
          this.metaArrays = [];
          for (var d2 = 0; d2 < c2.length; d2++) {
            var h2 = c2[d2];
            this.metaArrays.push(new o2(h2, u2[h2] || []));
          }
          (this.mentionType = t2.hasOwnProperty("mention_type") ? t2.mention_type : a2.MentionType.USERS, this.mentionedUsers = [], t2.hasOwnProperty("mentioned_users")) && t2.mentioned_users.forEach((function(e3) {
            var t3 = new i2(e3);
            n2.mentionedUsers.push(t3);
          }));
          this.pushNotificationDeliveryOption = t2.hasOwnProperty("push_option") ? t2.push_option : a2.PushNotificationDeliveryOption.DEFAULT, this.translationTargetLanguages = t2.hasOwnProperty("translation_target_langs") ? t2.translation_target_langs : [], this.status === e2.Status.FAILED && (t2.hasOwnProperty("error") && t2.error.hasOwnProperty("message") && (this.errorMessage = String(t2.error.message)), t2.hasOwnProperty("error") && t2.error.hasOwnProperty("code") && (this.errorCode = parseInt(t2.error.code))), t2.hasOwnProperty("apple_critical_alert_options") && (this.appleCriticalAlertOptions = new l2(t2.apple_critical_alert_options));
        } }, { key: "isOpenChannel", value: function() {
          var e3 = x.get(this._iid).BaseChannel;
          return this._channelType === e3.CHANNEL_TYPE_OPEN;
        } }, { key: "isGroupChannel", value: function() {
          var e3 = x.get(this._iid).BaseChannel;
          return this._channelType === e3.CHANNEL_TYPE_GROUP;
        } }, { key: "metaArray", get: function() {
          var e3 = {};
          return this.metaArrays.forEach((function(t2) {
            e3[t2.key] = t2.value;
          })), e3;
        }, set: function(e3) {
          if ("object" === u(e3) && e3) {
            var t2 = x.get(this._iid).MessageMetaArray, n2 = [];
            Object.keys(e3).forEach((function(r2) {
              n2.push(new t2(r2, e3[r2]));
            })), this.metaArrays = n2;
          }
        } }], [{ key: "Status", get: function() {
          return { SCHEDULED: "scheduled", SENT: "sent", CANCELED: "canceled", FAILED: "failed" };
        } }]), e2;
      })(), Or = (function() {
        function e2() {
          this.threadInfo = null, this.targetMessageId = 0, this.channelUrl = null, this.channelType = null;
        }
        return e2.createFromJson = function(e3) {
          var t2 = x.get(this._iid), n2 = t2.BaseChannel, r2 = t2.ThreadInfo, i2 = e3.thread_info, s2 = e3.root_message_id, a2 = e3.channel_url, o2 = e3.channel_type;
          if (i2 && "object" == typeof i2 && ("string" == typeof s2 || "number" == typeof s2) && "string" == typeof a2 && "string" == typeof o2 && [n2.CHANNEL_TYPE_GROUP, n2.CHANNEL_TYPE_OPEN].includes(o2)) {
            var l2 = new this();
            return l2.threadInfo = new r2(i2), l2.targetMessageId = parseInt(s2 + ""), l2.channelUrl = a2, l2.channelType = o2, l2;
          }
          return null;
        }, e2;
      })(), Mr = (function() {
        function e2() {
          c(this, e2), this.isLoading = false, this.hasNext = true, this.limit = 20, this.userIdsFilter = [], this.metaDataKeyFilter = "", this.metaDataValuesFilter = [], this.nicknameStartsWithFilter = null, this._token = "";
        }
        return h(e2, [{ key: "next", value: function(e3) {
          var t2 = this;
          return oe(this._iid, (function(e4) {
            "number" == typeof t2.limit && t2.limit > 0 && Array.isArray(t2.userIdsFilter) && "string" == typeof t2.metaDataKeyFilter && Array.isArray(t2.metaDataValuesFilter) && !!t2.metaDataKeyFilter == t2.metaDataValuesFilter.length > 0 && ("string" == typeof t2.nicknameStartsWithFilter || null === t2.nicknameStartsWithFilter) ? t2.isLoading ? e4(new H("Query in progress.", H.QUERY_IN_PROGRESS), null) : t2.hasNext ? (t2.isLoading = true, O.get(t2._iid).container.apiClient.loadUserList(l(l({}, t2), {}, { token: t2._token }), (function(n2, r2) {
              var i2 = null;
              if (!n2) {
                var s2 = x.get(t2._iid).User, a2 = String(r2.next);
                t2._token = a2, t2.hasNext = !!a2, i2 = r2.users.map((function(e5) {
                  return new s2(e5);
                }));
              }
              t2.isLoading = false, e4(n2, i2);
            }))) : e4(null, []) : e4(me.error, null);
          }), e3);
        } }]), e2;
      })(), kr = (function() {
        function e2(t2) {
          c(this, e2), this.isLoading = false, this.hasNext = true, this.limit = 20, this._isOpenChannel = false, this._channelUrl = null, this._token = "", t2.channelUrl && (this._channelUrl = t2.channelUrl), t2.isOpenChannel && (this._isOpenChannel = t2.isOpenChannel);
        }
        return h(e2, [{ key: "next", value: function(e3) {
          var t2 = this;
          return oe(this._iid, (function(e4) {
            "number" == typeof t2.limit && t2.limit > 0 ? t2.isLoading ? e4(new H("Query in progress.", H.QUERY_IN_PROGRESS), null) : t2.hasNext ? (t2.isLoading = true, O.get(t2._iid).container.apiClient.loadBannedUserList(l(l({}, t2), {}, { channelUrl: t2._channelUrl, isOpenChannel: t2._isOpenChannel, token: t2._token }), (function(n2, r2) {
              var i2 = null;
              if (!n2) {
                var s2 = x.get(t2._iid).RestrictedUser, a2 = String(r2.next);
                t2._token = a2, t2.hasNext = !!a2, i2 = r2.banned_list.map((function(e5) {
                  var t3 = new s2(e5);
                  return t3.restrictionInfo.restrictionType = s2.RestrictionType.BANNED, t3;
                }));
              }
              t2.isLoading = false, e4(n2, i2);
            }))) : e4(null, []) : e4(me.error, null);
          }), e3);
        } }]), e2;
      })(), Rr = (function() {
        function e2() {
          c(this, e2), this.isLoading = false, this.hasNext = true, this.limit = 20, this.userIdsFilter = [], this._token = "";
        }
        return h(e2, [{ key: "next", value: function(e3) {
          var t2 = this;
          return oe(this._iid, (function(e4) {
            "number" == typeof t2.limit && t2.limit > 0 && Array.isArray(t2.userIdsFilter) ? t2.isLoading ? e4(new H("Query in progress.", H.QUERY_IN_PROGRESS), null) : t2.hasNext ? (t2.isLoading = true, O.get(t2._iid).container.apiClient.loadBlockedUserList(l(l({}, t2), {}, { token: t2._token }), (function(n2, r2) {
              var i2 = null;
              if (!n2) {
                var s2 = x.get(t2._iid).User, a2 = String(r2.next);
                t2._token = a2, t2.hasNext = !!a2, i2 = r2.users.map((function(e5) {
                  return new s2(e5);
                }));
              }
              t2.isLoading = false, e4(n2, i2);
            }))) : e4(null, []) : e4(me.error, null);
          }), e3);
        } }]), e2;
      })(), Lr = (function() {
        function e2() {
          c(this, e2), this.isLoading = false, this.hasMore = true, this.limit = 20, this._token = "";
        }
        return h(e2, [{ key: "next", value: function(e3) {
          var t2 = this;
          return oe(this._iid, (function(e4) {
            "number" == typeof t2.limit && t2.limit > 0 ? t2.isLoading ? e4(new H("Query in progress.", H.QUERY_IN_PROGRESS), null) : t2.hasMore ? (t2.isLoading = true, O.get(t2._iid).container.apiClient.loadFriendList(l(l({}, t2), {}, { token: t2._token }), (function(n2, r2) {
              var i2 = null;
              if (!n2) {
                var s2 = x.get(t2._iid).User, a2 = String(r2.next);
                t2._token = a2, t2.hasMore = !!a2, i2 = r2.users.map((function(e5) {
                  return new s2(e5);
                }));
              }
              t2.isLoading = false, e4(n2, i2);
            }))) : e4(null, []) : e4(me.error, null);
          }), e3);
        } }]), e2;
      })(), wr = (function() {
        function e2() {
          c(this, e2), this.isLoading = false, this.hasNext = true, this.limit = 20, this.includeEmpty = false, this.order = e2.ORDER_LATEST_LAST_MESSAGE, this._token = "", this._searchFilter = {}, this._userIdsFilter = { userIds: [], includeMode: true, queryType: e2.QueryType.AND }, this._userIdsExactFilter = [], this._userIdsIncludeFilter = [], this._userIdsIncludeFilterQueryType = e2.QueryType.AND, this.nicknameContainsFilter = "", this.nicknameStartsWithFilter = "", this.nicknameExactMatchFilter = "", this.channelNameContainsFilter = "", this.memberStateFilter = ar.MemberStateFilter.ALL, this.customTypesFilter = [], this.channelUrlsFilter = [], this.superChannelFilter = ar.SuperChannelFilter.ALL, this.publicChannelFilter = ar.PublicChannelFilter.ALL, this.customTypeStartsWithFilter = null, this.unreadChannelFilter = ar.UnreadChannelFilter.ALL, this.metadataOrderKeyFilter = null, this.metadataKey = null, this.metadataValues = [], this.metadataValueStartsWith = null, this.hiddenChannelFilter = ar.HiddenChannelFilter.UNHIDDEN, this.includeFrozen = true, this.includeMetaData = true;
        }
        return h(e2, [{ key: "userIdsExactFilter", get: function() {
          return this._userIdsExactFilter;
        }, set: function(e3) {
          Array.isArray(e3) && (this._userIdsExactFilter = e3, this._userIdsIncludeFilter = [], this._userIdsFilter.userIds = this._userIdsExactFilter, this._userIdsFilter.includeMode = false);
        } }, { key: "userIdsIncludeFilter", get: function() {
          return this._userIdsIncludeFilter;
        }, set: function(e3) {
          Array.isArray(e3) && (this._userIdsIncludeFilter = e3, this._userIdsExactFilter = [], this._userIdsFilter.userIds = this._userIdsIncludeFilter, this._userIdsFilter.includeMode = true);
        } }, { key: "userIdsIncludeFilterQueryType", get: function() {
          return this._userIdsIncludeFilterQueryType;
        }, set: function(t2) {
          Object.keys(e2.QueryType).map((function(t3) {
            return e2.QueryType[t3];
          })).indexOf(t2) > -1 && (this._userIdsIncludeFilterQueryType = t2.toUpperCase(), this._userIdsFilter.queryType = this._userIdsIncludeFilterQueryType);
        } }, { key: "setSearchFilter", value: function(e3, t2) {
          Array.isArray(e3) && 0 !== e3.length && "string" == typeof t2 && t2 && (this._searchFilter = { search_query: t2, search_fields: e3.join(",").toLocaleLowerCase() });
        } }, { key: "serialize", value: function() {
          return ct.serialize(this, (function(e3) {
            e3.isLoading = false;
          }));
        } }, { key: "next", value: function(e3) {
          var t2 = this;
          return oe(this._iid, (function(e4) {
            var n2 = x.get(t2._iid), r2 = n2.GroupChannel, i2 = n2.GroupChannelListQuery;
            !("number" == typeof t2.limit && t2.limit > 0 && "boolean" == typeof t2.includeEmpty && "string" == typeof t2.order && [i2.ORDER_CHRONOLOGICAL, i2.ORDER_LATEST_LAST_MESSAGE, i2.CHANNEL_NAME_ALPHABETICAL, i2.METADATA_VALUE_ALPHABETICAL].indexOf(t2.order.toLowerCase()) > -1 && Array.isArray(t2._userIdsExactFilter) && Array.isArray(t2._userIdsIncludeFilter) && Array.isArray(t2.customTypesFilter) && Array.isArray(t2.channelUrlsFilter) && Object.keys(i2.QueryType).map((function(e5) {
              return i2.QueryType[e5];
            })).indexOf(t2._userIdsIncludeFilterQueryType.toUpperCase()) > -1 && Object.keys(r2.MemberStateFilter).map((function(e5) {
              return r2.MemberStateFilter[e5];
            })).indexOf(t2.memberStateFilter) > -1 && Object.keys(r2.SuperChannelFilter).map((function(e5) {
              return r2.SuperChannelFilter[e5];
            })).indexOf(t2.superChannelFilter) > -1 && Object.keys(r2.PublicChannelFilter).map((function(e5) {
              return r2.PublicChannelFilter[e5];
            })).indexOf(t2.publicChannelFilter) > -1 && Object.keys(r2.UnreadChannelFilter).map((function(e5) {
              return r2.UnreadChannelFilter[e5];
            })).indexOf(t2.unreadChannelFilter) > -1 && Object.keys(r2.HiddenChannelFilter).map((function(e5) {
              return r2.HiddenChannelFilter[e5];
            })).indexOf(t2.hiddenChannelFilter) > -1) || "string" != typeof t2.customTypeStartsWithFilter && null !== t2.customTypeStartsWithFilter || "string" != typeof t2.nicknameContainsFilter || "string" != typeof t2.nicknameStartsWithFilter || "string" != typeof t2.nicknameExactMatchFilter || "string" != typeof t2.channelNameContainsFilter || "string" != typeof t2.metadataOrderKeyFilter && null !== t2.metadataOrderKeyFilter || "string" != typeof t2.metadataKey && null !== t2.metadataKey || !Array.isArray(t2.metadataValues) || !t2.metadataValues.every((function(e5) {
              return "string" == typeof e5;
            })) || "string" != typeof t2.metadataValueStartsWith && null !== t2.metadataValueStartsWith || "boolean" != typeof t2.includeFrozen || "boolean" != typeof t2.includeMetaData ? e4(me.error, null) : t2.isLoading ? e4(new H("Query in progress.", H.QUERY_IN_PROGRESS), null) : t2.hasNext ? (t2.isLoading = true, O.get(t2._iid).container.apiClient.loadGroupChannelList(l(l({}, t2), {}, { token: t2._token, userIdsFilter: t2._userIdsFilter, searchFilter: t2._searchFilter })).then((function(n3) {
              var r3 = x.get(t2._iid).GroupChannel, i3 = String(n3.next);
              t2._token = i3, t2.hasNext = !!i3;
              var s2 = n3.channels;
              if (!s2 || !Array.isArray(s2)) throw new H("Failed at loading group channels.", H.MALFORMED_DATA);
              var a2 = s2.map((function(e5) {
                return "number" == typeof n3.ts && (e5.ts = n3.ts), r3.upsert(e5);
              }));
              t2.isLoading = false, e4(null, a2);
            })).catch((function(n3) {
              t2.isLoading = false, e4(n3, null);
            }))) : e4(null, []);
          }), e3);
        } }], [{ key: "ORDER_LATEST_LAST_MESSAGE", get: function() {
          return "latest_last_message";
        } }, { key: "ORDER_CHRONOLOGICAL", get: function() {
          return "chronological";
        } }, { key: "CHANNEL_NAME_ALPHABETICAL", get: function() {
          return "channel_name_alphabetical";
        } }, { key: "METADATA_VALUE_ALPHABETICAL", get: function() {
          return "metadata_value_alphabetical";
        } }, { key: "QueryType", get: function() {
          return { AND: "AND", OR: "OR" };
        } }, { key: "SearchField", get: function() {
          return { MEMBER_NICKNAME: "member_nickname", CHANNEL_NAME: "channel_name" };
        } }, { key: "buildFromSerializedData", value: function(e3) {
          var t2 = x.get(this._iid).GroupChannel, n2 = ct.deserialize(e3), r2 = t2.createMyGroupChannelListQuery();
          return Object.keys(n2).forEach((function(e4) {
            r2.hasOwnProperty(e4) && (r2[e4] = n2[e4]);
          })), r2;
        } }]), e2;
      })(), Pr = (function() {
        function e2(t2) {
          c(this, e2), this.isLoading = false, this.hasNext = true, this.limit = 20, this.mutedMemberFilter = e2.MutedMemberFilter.ALL, this.memberStateFilter = ar.MemberStateFilter.ALL, this.nicknameStartsWithFilter = null, this.order = e2.Order.MEMBER_NICKNAME_ALPHABETICAL, this._token = "", this._channelUrl = t2;
        }
        return h(e2, [{ key: "next", value: function(e3) {
          var t2 = this;
          return oe(this._iid, (function(e4) {
            var n2 = x.get(t2._iid), r2 = n2.GroupChannel, i2 = n2.Member, s2 = n2.MemberListQuery;
            if ("number" == typeof t2.limit && t2.limit > 0 && Object.keys(s2.MutedMemberFilter).map((function(e5) {
              return s2.MutedMemberFilter[e5];
            })).indexOf(t2.mutedMemberFilter) > -1 && Object.keys(r2.MemberStateFilter).map((function(e5) {
              return r2.MemberStateFilter[e5];
            })).indexOf(t2.memberStateFilter) > -1 && Object.keys(s2.Order).map((function(e5) {
              return s2.Order[e5];
            })).indexOf(t2.order) > -1 && ("string" == typeof t2.nicknameStartsWithFilter || null === t2.nicknameStartsWithFilter)) if (t2.isLoading) e4(new H("Query in progress.", H.QUERY_IN_PROGRESS), null);
            else if (t2.hasNext) {
              t2.isLoading = true;
              var a2 = O.get(t2._iid);
              t2.memberStateFilter === r2.MemberStateFilter.LEFT && (t2.memberStateFilter = r2.MemberStateFilter.ALL), a2.container.apiClient.loadMemberList(l(l({}, t2), {}, { channelUrl: t2._channelUrl, token: t2._token }), (function(n3, r3) {
                var s3 = null;
                if (!n3) {
                  var a3 = String(r3.next);
                  t2._token = a3, t2.hasNext = !!a3, s3 = r3.members.map((function(e5) {
                    return new i2(e5);
                  }));
                }
                t2.isLoading = false, e4(n3, s3);
              }));
            } else e4(null, []);
            else e4(me.error, null);
          }), e3);
        } }], [{ key: "MutedMemberFilter", get: function() {
          return { ALL: "all", MUTED: "muted", UNMUTED: "unmuted" };
        } }, { key: "Order", get: function() {
          return { MEMBER_NICKNAME_ALPHABETICAL: "member_nickname_alphabetical", OPERATOR_THEN_MEMBER_ALPHABETICAL: "operator_then_member_alphabetical" };
        } }]), e2;
      })(), Dr = (function() {
        function e2(t2) {
          c(this, e2), this.isLoading = false, this.hasNext = true, this.limit = 20, this._token = "", t2.channelUrl && (this._channelUrl = t2.channelUrl), t2.isOpenChannel && (this._isOpenChannel = t2.isOpenChannel);
        }
        return h(e2, [{ key: "next", value: function(e3) {
          var t2 = this;
          return oe(this._iid, (function(e4) {
            "number" == typeof t2.limit && t2.limit > 0 ? t2.isLoading ? e4(new H("Query in progress.", H.QUERY_IN_PROGRESS), null) : t2.hasNext ? (t2.isLoading = true, O.get(t2._iid).container.apiClient.loadMutedUserList(l(l({}, t2), {}, { channelUrl: t2._channelUrl, isOpenChannel: t2._isOpenChannel, token: t2._token }), (function(n2, r2) {
              var i2 = null;
              if (!n2) {
                var s2 = x.get(t2._iid).RestrictedUser, a2 = String(r2.next);
                t2._token = a2, t2.hasNext = !!a2, i2 = r2.muted_list.map((function(e5) {
                  var t3 = new s2(e5);
                  return t3.restrictionInfo.restrictionType = s2.RestrictionType.MUTED, t3;
                }));
              }
              t2.isLoading = false, e4(n2, i2);
            }))) : e4(null, []) : e4(me.error, null);
          }), e3);
        } }]), e2;
      })(), Hr = (function() {
        function e2() {
          c(this, e2), this.limit = 20, this.isLoading = false, this.hasNext = true, this.nameKeyword = null, this.urlKeyword = null, this.customTypes = [], this.includeFrozen = true, this.includeMetaData = true;
        }
        return h(e2, [{ key: "next", value: function(e3) {
          var t2 = this;
          return oe(this._iid, (function(e4) {
            !("number" == typeof t2.limit && t2.limit > 0 && Array.isArray(t2.customTypes)) || "string" != typeof t2.nameKeyword && null !== t2.nameKeyword || "string" != typeof t2.urlKeyword && null !== t2.urlKeyword || "boolean" != typeof t2.includeFrozen || "boolean" != typeof t2.includeMetaData ? e4(me.error, null) : t2.isLoading ? e4(new H("Query in progress.", H.QUERY_IN_PROGRESS), null) : t2.hasNext ? (t2.isLoading = true, O.get(t2._iid).container.apiClient.loadOpenChannelList(l(l({}, t2), {}, { token: t2._token }), (function(n2, r2) {
              var i2 = null;
              if (!n2) {
                var s2 = x.get(t2._iid).OpenChannel, a2 = String(r2.next);
                t2._token = a2, t2.hasNext = !!a2;
                var o2 = r2.channels;
                o2 && Array.isArray(o2) ? i2 = o2.map((function(e5) {
                  return "number" == typeof r2.ts && (e5.ts = r2.ts), s2.upsert(e5);
                })) : n2 = new H("Failed at loading open channels.", H.MALFORMED_DATA);
              }
              t2.isLoading = false, e4(n2, i2);
            }))) : e4(null, []);
          }), e3);
        } }]), e2;
      })(), Fr = /* @__PURE__ */ new WeakMap(), Gr = (function() {
        function e2(t2) {
          c(this, e2), this.isLoading = false, this.hasNext = true, this.limit = 20, this._token = "", Fr.set(this, t2);
        }
        return h(e2, [{ key: "next", value: function(e3) {
          var t2 = this;
          return oe(this._iid, (function(e4) {
            if ("number" == typeof t2.limit && t2.limit > 0) if (t2.isLoading) e4(new H("Query in progress.", H.QUERY_IN_PROGRESS), null);
            else if (t2.hasNext) {
              t2.isLoading = true;
              var n2 = Fr.get(t2);
              O.get(t2._iid).container.apiClient.loadOperatorList(l(l({}, t2), {}, { token: t2._token, channelUrl: n2.url, isOpenChannel: n2.isOpenChannel() }), (function(n3, r2) {
                var i2 = null;
                if (!n3) {
                  var s2 = x.get(t2._iid).User, a2 = String(r2.next);
                  t2._token = a2, t2.hasNext = !!a2, i2 = r2.operators.map((function(e5) {
                    return new s2(e5);
                  }));
                }
                t2.isLoading = false, e4(n3, i2);
              }));
            } else e4(null, []);
            else e4(me.error, null);
          }), e3);
        } }]), e2;
      })(), xr = /* @__PURE__ */ new WeakMap(), jr = (function() {
        function e2(t2) {
          c(this, e2), this.isLoading = false, this.hasNext = true, this.limit = 20, this._token = "", t2 && xr.set(this, t2.channelUrl);
        }
        return h(e2, [{ key: "next", value: function(e3) {
          var t2 = this;
          return oe(this._iid, (function(e4) {
            "number" == typeof t2.limit && t2.limit > 0 ? t2.isLoading ? e4(new H("Query in progress.", H.QUERY_IN_PROGRESS), null) : t2.hasNext ? (t2.isLoading = true, O.get(t2._iid).container.apiClient.loadParticipantList(l(l({}, t2), {}, { channelUrl: xr.get(t2), token: t2._token }), (function(n2, r2) {
              var i2 = null;
              if (!n2) {
                var s2 = x.get(t2._iid).User, a2 = String(r2.next);
                t2._token = a2, t2.hasNext = !!a2, i2 = r2.participants.map((function(e5) {
                  return new s2(e5);
                }));
              }
              t2.isLoading = false, e4(n2, i2);
            }))) : e4(null, []) : e4(me.error, null);
          }), e3);
        } }]), e2;
      })(), Br = /* @__PURE__ */ new WeakMap(), Vr = (function() {
        function e2(t2) {
          var n2 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, r2 = n2.limit, i2 = void 0 === r2 ? 20 : r2, s2 = n2.reverse, a2 = void 0 !== s2 && s2, o2 = n2.exactMatch, l2 = void 0 !== o2 && o2, u2 = n2.channelUrl, d2 = void 0 === u2 ? "" : u2, h2 = n2.channelCustomType, p2 = void 0 === h2 ? "" : h2, f2 = n2.messageTimestampFrom, _2 = void 0 === f2 ? null : f2, g2 = n2.messageTimestampTo, y2 = void 0 === g2 ? null : g2, m2 = n2.order, E2 = void 0 === m2 ? "score" : m2, v2 = n2.advancedQuery, b2 = void 0 !== v2 && v2, C2 = n2.targetFields, A2 = void 0 === C2 ? null : C2;
          c(this, e2), this.isLoading = false, this.hasNext = true, Br.set(this, { keyword: t2, limit: i2, reverse: a2, exactMatch: l2, channelUrl: d2, channelCustomType: p2, messageTimestampFrom: _2, messageTimestampTo: y2, order: E2, advancedQuery: b2, targetFields: A2, previousToken: "", nextToken: "" });
        }
        return h(e2, [{ key: "key", get: function() {
          return Br.get(this).keyword;
        } }, { key: "limit", get: function() {
          return Br.get(this).limit;
        } }, { key: "reverse", get: function() {
          return Br.get(this).reverse;
        } }, { key: "exactMatch", get: function() {
          return Br.get(this).exactMatch;
        } }, { key: "channelUrl", get: function() {
          return Br.get(this).channelUrl;
        } }, { key: "channelCustomType", get: function() {
          return Br.get(this).channelCustomType;
        } }, { key: "messageTimestampFrom", get: function() {
          return Br.get(this).messageTimestampFrom;
        } }, { key: "messageTimestampTo", get: function() {
          return Br.get(this).messageTimestampTo;
        } }, { key: "order", get: function() {
          return Br.get(this).order;
        } }, { key: "next", value: function(e3) {
          var t2 = this, n2 = x.get(this._iid), r2 = n2.BaseChannel, i2 = n2.GroupChannel, s2 = n2.OpenChannel;
          return oe(this._iid, (function(e4) {
            var n3 = Br.get(t2), a2 = n3.keyword, o2 = n3.limit, l2 = n3.reverse, u2 = n3.exactMatch, c2 = n3.channelUrl, d2 = n3.channelCustomType, h2 = n3.messageTimestampFrom, p2 = n3.messageTimestampTo, f2 = n3.order, _2 = n3.advancedQuery, g2 = n3.targetFields, y2 = n3.nextToken;
            !("number" == typeof o2 && o2 > 0 && o2 <= 1e3 && "boolean" == typeof l2 && "boolean" == typeof u2) || "string" != typeof c2 && null !== c2 || "string" != typeof d2 && null !== d2 || "number" != typeof h2 && null !== h2 || "number" != typeof p2 && null !== p2 || !(["score", "ts"].indexOf(f2) >= 0) || "boolean" != typeof _2 && null !== _2 || !Array.isArray(g2) && null !== g2 ? e4(me.error, null) : t2.isLoading ? e4(new H("Query in progress.", H.QUERY_IN_PROGRESS), null) : t2.hasNext ? (t2.isLoading = true, O.get(t2._iid).container.apiClient.searchMessages({ keyword: a2, limit: o2, reverse: l2, exactMatch: u2, channelUrl: c2, channelCustomType: d2, messageTimestampFrom: h2, messageTimestampTo: p2, order: f2, advancedQuery: _2, targetFields: g2, nextToken: y2 }, (function(n4, a3) {
              var o3 = null;
              n4 || (o3 = [], a3.results.forEach((function(e5) {
                if (e5.channel.hasOwnProperty("members")) {
                  var t3 = new i2(e5.channel);
                  i2.cachedChannels[t3.url] = t3, o3.push(r2.buildMessage(e5, t3));
                } else {
                  var n5 = new s2(e5.channel);
                  s2.cachedChannels[n5.url] = n5, o3.push(r2.buildMessage(e5, n5));
                }
              })), t2.hasNext = a3.has_next, Br.get(t2).nextToken = a3.end_cursor), t2.isLoading = false, e4(n4, o3);
            }))) : e4(null, []);
          }), e3);
        } }]), e2;
      })(), qr = /* @__PURE__ */ new WeakMap(), Kr = /* @__PURE__ */ new WeakMap(), zr = (function() {
        function e2(t2) {
          c(this, e2), this.isLoading = false, this.hasMore = true, this.limit = 20, Kr.set(this, Number.MAX_SAFE_INTEGER), qr.set(this, t2), this.reverse = false, this.messageTypeFilter = null, this.customTypeFilter = null, this.customTypesFilter = [], this.senderUserIdsFilter = [], this.includeMetaArray = false, this.includeReaction = null, this.includeReactions = null, this.includeReplies = null, this.includeParentMessageText = null, this.includeThreadInfo = false, this.replyType = null, this.includeParentMessageInfo = null, this.showSubchannelMessagesOnly = false;
        }
        return h(e2, [{ key: "load", value: function(e3, t2, n2, r2) {
          var i2 = this, s2 = x.get(this._iid), a2 = s2.BaseChannel, o2 = s2.BaseMessage, l2 = null, u2 = me.parse(arguments, [new me({ type: "number", optional: true, defaultValue: this.limit }), new me({ type: "boolean", optional: true, defaultValue: this.reverse }), new me({ type: ["string", "number"], optional: true, defaultValue: this.messageTypeFilter, constraint: function(e4) {
            return Object.keys(a2.MessageTypeFilter).map((function(e5) {
              return a2.MessageTypeFilter[e5];
            })).indexOf(e4) > -1 || [0, 1, 2, 3].indexOf(e4) > -1;
          } }), new me({ type: "callback" })]), c2 = C(u2, 5);
          return l2 = c2[0], e3 = c2[1], t2 = c2[2], n2 = c2[3], r2 = c2[4], oe(this._iid, (function(r3) {
            if (("string" != typeof i2.customTypeFilter && null !== i2.customTypeFilter || !Array.isArray(i2.customTypesFilter) || !i2.customTypesFilter.every((function(e4) {
              return "string" == typeof e4 || null === e4;
            })) || !Array.isArray(i2.senderUserIdsFilter) || !i2.senderUserIdsFilter.every((function(e4) {
              return "string" == typeof e4;
            })) || "boolean" != typeof i2.includeMetaArray || null !== i2.includeReaction && "boolean" != typeof i2.includeReaction || null !== i2.includeReactions && "boolean" != typeof i2.includeReactions || "boolean" != typeof i2.includeThreadInfo || null !== i2.includeReplies && "boolean" != typeof i2.includeReplies || !(null === i2.replyType || "string" == typeof i2.replyType && Object.values(o2.ReplyType).includes(i2.replyType)) || null !== i2.includeParentMessageText && "boolean" != typeof i2.includeParentMessageText || null !== i2.includeParentMessageInfo && "boolean" != typeof i2.includeParentMessageInfo || "boolean" != typeof i2.showSubchannelMessagesOnly) && (l2 = me.error), l2) r3(l2, null);
            else {
              if (i2.limit = e3, i2.reverse = t2, i2.messageTypeFilter = n2, "number" == typeof i2.messageTypeFilter) switch (i2.messageTypeFilter) {
                case 0:
                  i2.messageTypeFilter = a2.MessageTypeFilter.ALL;
                  break;
                case 1:
                  i2.messageTypeFilter = a2.MessageTypeFilter.USER;
                  break;
                case 2:
                  i2.messageTypeFilter = a2.MessageTypeFilter.FILE;
                  break;
                case 3:
                  i2.messageTypeFilter = a2.MessageTypeFilter.ADMIN;
              }
              if (i2.isLoading) r3(new H("Query in progress.", H.QUERY_IN_PROGRESS), null);
              else if (i2.hasMore) {
                i2.isLoading = true;
                var s3 = qr.get(i2);
                O.get(i2._iid).container.apiClient.getMessageList({ channel: s3, token: Kr.get(i2) || (/* @__PURE__ */ new Date()).getTime() + 1e4, tokenType: "timestamp", isInclusive: false, prevResultSize: e3, nextResultSize: 0, shouldReverse: t2, messageType: i2.messageTypeFilter, customType: i2.customTypeFilter, customTypes: i2.customTypesFilter, senderUserIds: i2.senderUserIdsFilter, includeMetaArray: i2.includeMetaArray, includeReaction: i2.includeReaction, includeReactions: i2.includeReactions, includeReplies: i2.includeReplies, includeParentMessageText: i2.includeParentMessageText, includeThreadInfo: i2.includeThreadInfo, replyType: i2.replyType, includeParentMessageInfo: i2.includeParentMessageInfo, showSubchannelMessagesOnly: i2.showSubchannelMessagesOnly }).then((function(t3) {
                  var n3 = t3.messages.map((function(e4) {
                    return a2.buildMessage(e4, s3);
                  }));
                  (0 === n3.length || n3.length < e3) && (i2.hasMore = false);
                  var o3 = Kr.get(i2);
                  Kr.set(i2, Math.min.apply(Math, A(n3.map((function(e4) {
                    return e4.createdAt;
                  }))).concat([o3]))), i2.isLoading = false, r3(null, n3);
                })).catch((function(e4) {
                  i2.isLoading = false, r3(e4, null);
                }));
              } else r3(null, []);
            }
          }), r2);
        } }]), e2;
      })(), Yr = (function() {
        function e2() {
          c(this, e2), this.isLoading = false, this.hasNext = true, this.limit = 20, this.includeEmpty = false, this.order = wr.ORDER_LATEST_LAST_MESSAGE, this._token = "", this.channelNameContainsFilter = "", this.channelUrlsFilter = [], this.customTypesFilter = [], this.customTypeStartsWithFilter = null, this.superChannelFilter = ar.SuperChannelFilter.ALL, this.membershipFilter = e2.MembershipType.JOINED, this.metadataOrderKeyFilter = null, this.metadataKey = null, this.metadataValues = [], this.metadataValueStartsWith = null, this.includeFrozen = true, this.includeMetaData = true;
        }
        return h(e2, [{ key: "next", value: function(t2) {
          var n2 = this;
          return oe(this._iid, (function(t3) {
            var r2 = x.get(n2._iid).GroupChannel;
            !("number" == typeof n2.limit && n2.limit > 0 && "boolean" == typeof n2.includeEmpty && "string" == typeof n2.order && [e2.ORDER_CHRONOLOGICAL, e2.CHANNEL_NAME_ALPHABETICAL, e2.METADATA_VALUE_ALPHABETICAL, e2.ORDER_LATEST_LAST_MESSAGE].indexOf(n2.order.toLowerCase()) > -1 && Array.isArray(n2.customTypesFilter) && Array.isArray(n2.channelUrlsFilter) && Object.keys(e2.MembershipType).map((function(t4) {
              return e2.MembershipType[t4];
            })).indexOf(n2.membershipFilter) > -1 && Object.keys(r2.SuperChannelFilter).map((function(e3) {
              return r2.SuperChannelFilter[e3];
            })).indexOf(n2.superChannelFilter) > -1) || "string" != typeof n2.customTypeStartsWithFilter && null !== n2.customTypeStartsWithFilter || "string" != typeof n2.channelNameContainsFilter || "string" != typeof n2.metadataOrderKeyFilter && null !== n2.metadataOrderKeyFilter || "string" != typeof n2.metadataKey && null !== n2.metadataKey || !Array.isArray(n2.metadataValues) || !n2.metadataValues.every((function(e3) {
              return "string" == typeof e3;
            })) || "string" != typeof n2.metadataValueStartsWith && null !== n2.metadataValueStartsWith || "boolean" != typeof n2.includeFrozen || "boolean" != typeof n2.includeMetaData ? t3(me.error, null) : n2.isLoading ? t3(new H("Query in progress.", H.QUERY_IN_PROGRESS), null) : n2.hasNext ? (n2.isLoading = true, O.get(n2._iid).container.apiClient.loadPublicGroupChannelList(l(l({}, n2), {}, { token: n2._token }), (function(e3, i2) {
              var s2 = null;
              if (!e3) {
                var a2 = String(i2.next);
                n2._token = a2, n2.hasNext = !!a2;
                var o2 = i2.channels;
                o2 && Array.isArray(o2) ? s2 = o2.map((function(e4) {
                  return "number" == typeof i2.ts && (e4.ts = i2.ts), r2.upsert(e4);
                })) : e3 = new H("Failed at loading group channels.", H.MALFORMED_DATA);
              }
              n2.isLoading = false, t3(e3, s2);
            }))) : t3(null, []);
          }), t2);
        } }], [{ key: "MembershipType", get: function() {
          return { ALL: "all", JOINED: "joined" };
        } }, { key: "ORDER_LATEST_LAST_MESSAGE", get: function() {
          return "latest_last_message";
        } }, { key: "ORDER_CHRONOLOGICAL", get: function() {
          return "chronological";
        } }, { key: "CHANNEL_NAME_ALPHABETICAL", get: function() {
          return "channel_name_alphabetical";
        } }, { key: "METADATA_VALUE_ALPHABETICAL", get: function() {
          return "metadata_value_alphabetical";
        } }]), e2;
      })(), Qr = (function() {
        function e2() {
          c(this, e2), this.isDistinct = null, this.isSuper = null, this.isBroadcast = null, this.isPublic = null, this.channelUrl = null, this.isEphemeral = null, this.isDiscoverable = null, this.isStrict = null, this.name = null, this.data = null, this.customType = null, this.channelCover = null, this.coverUrl = null, this.coverImage = null, this.accessCode = null, this.messageSurvivalSeconds = null, this._invitedUserIds = [];
          var t2 = null;
          Object.defineProperty(this, "operators", { set: function(e3) {
            Array.isArray(e3) && (e3.filter((function(e4) {
              return e4.hasOwnProperty("userId");
            })).length === e3.length && (t2 = e3.map((function(e4) {
              return e4.userId;
            }))));
          } }), Object.defineProperty(this, "operatorUserIds", { get: function() {
            return t2;
          }, set: function(e3) {
            Array.isArray(e3) && (e3.filter((function(e4) {
              return "string" == typeof e4;
            })).length === e3.length && (t2 = e3));
          } });
        }
        return h(e2, [{ key: "_validate", value: function() {
          return Array.isArray(this._invitedUserIds) && this._invitedUserIds.every((function(e3) {
            return "string" == typeof e3;
          })) && ("string" == typeof this.channelUrl || null === this.channelUrl) && ("string" == typeof this.coverUrl || null === this.coverUrl) && (se.isFile(this.coverImage) || null === this.coverImage) && ("string" == typeof this.name || null === this.name) && ("string" == typeof this.data || null === this.data) && ("string" == typeof this.customType || null === this.customType) && ("boolean" == typeof this.isDistinct || null === this.isDistinct) && ("boolean" == typeof this.isSuper || null === this.isSuper) && ("boolean" == typeof this.isBroadcast || null === this.isBroadcast) && ("boolean" == typeof this.isPublic || null === this.isPublic) && ("boolean" == typeof this.isEphemeral || null === this.isEphemeral) && ("boolean" == typeof this.isDiscoverable || null === this.isDiscoverable) && ("boolean" == typeof this.isStrict || null === this.isStrict) && (Array.isArray(this.operatorUserIds) && this.operatorUserIds.every((function(e3) {
            return "string" == typeof e3;
          })) || null === this.operatorUserIds) && ("string" == typeof this.accessCode || null === this.accessCode) && ("number" == typeof this.messageSurvivalSeconds || null === this.messageSurvivalSeconds);
        } }, { key: "addUsers", value: function(e3) {
          if (Array.isArray(e3)) {
            var t2, n2 = e3.filter((function(e4) {
              return e4.hasOwnProperty("userId") && "string" == typeof e4.userId;
            })).map((function(e4) {
              return e4.userId;
            }));
            (t2 = this._invitedUserIds).push.apply(t2, A(n2));
          }
        } }, { key: "addUser", value: function(e3) {
          e3.hasOwnProperty("userId") && "string" == typeof e3.userId && this._invitedUserIds.push(e3.userId);
        } }, { key: "addUserIds", value: function(e3) {
          if (Array.isArray(e3)) {
            var t2, n2 = e3.filter((function(e4) {
              return "string" == typeof e4;
            }));
            (t2 = this._invitedUserIds).push.apply(t2, A(n2));
          }
        } }, { key: "addUserId", value: function(e3) {
          "string" == typeof e3 && this._invitedUserIds.push(e3);
        } }]), e2;
      })(), Wr = (function() {
        function e2() {
          c(this, e2), this.channelUrl = null, this.name = null, this.coverUrlOrImage = null, this.data = null, this.customType = null, this._operatorUserIds = [];
        }
        return h(e2, [{ key: "operatorUserIds", get: function() {
          return this._operatorUserIds;
        }, set: function(e3) {
          Array.isArray(e3) && e3.every((function(e4) {
            return "string" == typeof e4;
          })) && (this._operatorUserIds = e3);
        } }, { key: "operators", set: function(e3) {
          Array.isArray(e3) && e3.every((function(e4) {
            return e4.hasOwnProperty("userId");
          })) && (this._operatorUserIds = e3.map((function(e4) {
            return e4.userId;
          })));
        } }, { key: "_validate", value: function() {
          return (Array.isArray(this.operatorUserIds) && this.operatorUserIds.every((function(e3) {
            return "string" == typeof e3;
          })) || null === this.operatorUserIds) && ("string" == typeof this.coverUrlOrImage || se.isFile(this.coverUrlOrImage) || null === this.coverUrlOrImage) && ("string" == typeof this.name || null === this.name) && ("string" == typeof this.data || null === this.data) && ("string" == typeof this.customType || null === this.customType) && ("string" == typeof this.channelUrl && /^\w+$/.test(this.channelUrl) || null === this.channelUrl);
        } }]), e2;
      })(), Jr = (function(e2) {
        f(n2, e2);
        var t2 = E(n2);
        function n2(e3) {
          var r2;
          return c(this, n2), (r2 = t2.call(this)).year = null, r2.month = null, r2.day = null, r2.hour = null, r2.min = null, r2.timezone = null, r2._scheduledDateTimeString = null, e3 && r2._update(e3), r2;
        }
        return h(n2, [{ key: "scheduledDateTimeString", get: function() {
          return this._scheduledDateTimeString ? this._scheduledDateTimeString : "number" == typeof this.year && 4 === this.year.toString().length && "number" == typeof this.month && this.month >= 1 && this.month <= 12 && "number" == typeof this.day && this.day >= 1 && this.day <= 31 && "number" == typeof this.hour && this.hour >= 0 && this.hour <= 24 && "number" == typeof this.min && this.min >= 0 && this.min <= 60 && "string" == typeof this.timezone && this.timezone.length > 0 ? this.year.toString() + "-" + ("0" + this.month.toString()).substr(-2) + "-" + ("0" + this.day.toString()).substr(-2) + " " + ("0" + this.hour.toString()).substr(-2) + ":" + ("0" + this.min.toString()).substr(-2) : null;
        }, set: function(e3) {
          e3 && "string" == typeof e3 && (this._scheduledDateTimeString = e3);
        } }, { key: "_update", value: function(e3) {
          e3.hasOwnProperty("message") && (this.message = e3.message), e3.hasOwnProperty("year") && (this.year = e3.year), e3.hasOwnProperty("month") && (this.month = e3.month), e3.hasOwnProperty("day") && (this.day = e3.day), e3.hasOwnProperty("hour") && (this.hour = e3.hour), e3.hasOwnProperty("min") && (this.min = e3.min), e3.hasOwnProperty("timezone") && (this.timezone = e3.timezone);
        } }, { key: "_getScheduleString", value: function() {
          return this.scheduledDateTimeString ? this.scheduledDateTimeString + " " + this.timezone : "number" == typeof this.year && 4 === this.year.toString().length && "number" == typeof this.month && this.month >= 1 && this.month <= 12 && "number" == typeof this.day && this.day >= 1 && this.day <= 31 && "number" == typeof this.hour && this.hour >= 0 && this.hour <= 24 && "number" == typeof this.min && this.min >= 0 && this.min <= 60 && "string" == typeof this.timezone && this.timezone.length > 0 ? this.year.toString() + "-" + ("0" + this.month.toString()).substr(-2) + "-" + ("0" + this.day.toString()).substr(-2) + " " + ("0" + this.hour.toString()).substr(-2) + ":" + ("0" + this.min.toString()).substr(-2) + " " + this.timezone : null;
        } }, { key: "setSchedule", value: function(e3, t3, n3, r2, i2, s2) {
          "number" == typeof e3 && 4 === e3.toString().length && "number" == typeof t3 && t3 >= 1 && t3 <= 12 && "number" == typeof n3 && n3 >= 1 && n3 <= 31 && "number" == typeof r2 && r2 >= 0 && r2 <= 24 && "number" == typeof i2 && i2 >= 0 && i2 <= 60 && "string" == typeof s2 && s2.length > 0 && (this.scheduledDateTimeString = e3.toString() + "-" + ("0" + t3.toString()).substr(-2) + "-" + ("0" + n3.toString()).substr(-2) + " " + ("0" + r2.toString()).substr(-2) + ":" + ("0" + i2.toString()).substr(-2), this.timezone = s2);
        } }]), n2;
      })(Cr), Xr = h((function e2() {
        c(this, e2), this.channelCustomTypesFilter = [], this.superChannelFilter = ar.SuperChannelFilter.ALL;
      })), Zr = (function(e2) {
        f(n2, e2);
        var t2 = E(n2);
        function n2() {
          return c(this, n2), t2.call(this);
        }
        return h(n2);
      })(Xr), $r = (function(e2) {
        f(n2, e2);
        var t2 = E(n2);
        function n2() {
          return c(this, n2), t2.call(this);
        }
        return h(n2);
      })(Xr), ei = (function() {
        function e2() {
          c(this, e2), this.channelUrl = null, this.channelType = null, this.messageId = 0, this.includeMetaArray = false, this.includeReactions = false, this.includeParentMessageText = null, this.includeThreadInfo = false, this.includeParentMessageInfo = null;
        }
        return h(e2, [{ key: "_validate", value: function() {
          var e3 = x.get(this._iid).BaseChannel;
          return "string" == typeof this.channelUrl && "string" == typeof this.channelType && [e3.CHANNEL_TYPE_BASE, e3.CHANNEL_TYPE_OPEN, e3.CHANNEL_TYPE_GROUP].includes(this.channelType) && "number" == typeof this.messageId && "boolean" == typeof this.includeMetaArray && "boolean" == typeof this.includeReactions && "boolean" == typeof this.includeThreadInfo && (null === this.includeParentMessageText || "boolean" == typeof this.includeParentMessageText) && (null === this.includeParentMessageInfo || "boolean" == typeof this.includeParentMessageInfo);
        } }]), e2;
      })(), ti = (function() {
        function e2() {
          c(this, e2);
          var t2 = x.get(this._iid).BaseChannel;
          this.prevResultSize = 0, this.nextResultSize = 0, this.isInclusive = false, this.reverse = false, this.messageType = t2.MessageTypeFilter.ALL, this.customType = null, this.customTypes = [], this.senderUserIds = null, this.includeMetaArray = false, this.includeReaction = null, this.includeReactions = null, this.includeReplies = null, this.includeParentMessageText = null, this.includeThreadInfo = false, this.replyType = null, this.includeParentMessageInfo = null, this.showSubchannelMessagesOnly = false;
        }
        return h(e2, [{ key: "_validate", value: function() {
          var e3 = x.get(this._iid), t2 = e3.BaseChannel, n2 = e3.BaseMessage;
          return "number" == typeof this.prevResultSize && "number" == typeof this.nextResultSize && "boolean" == typeof this.isInclusive && "boolean" == typeof this.reverse && "string" == typeof this.messageType && Object.values(t2.MessageTypeFilter).includes(this.messageType) && ("string" == typeof this.customType || null === this.customType) && Array.isArray(this.customTypes) && this.customTypes.every((function(e4) {
            return "string" == typeof e4 || null === e4;
          })) && (Array.isArray(this.senderUserIds) && this.senderUserIds.every((function(e4) {
            return "string" == typeof e4;
          })) || null === this.senderUserIds) && "boolean" == typeof this.includeMetaArray && (null === this.includeReaction || "boolean" == typeof this.includeReaction) && (null === this.includeReactions || "boolean" == typeof this.includeReactions) && "boolean" == typeof this.includeThreadInfo && (null === this.includeReplies || "boolean" == typeof this.includeReplies) && (null === this.replyType || "string" == typeof this.replyType && Object.values(n2.ReplyType).includes(this.replyType)) && (null === this.includeParentMessageText || "boolean" == typeof this.includeParentMessageText) && (null === this.includeParentMessageInfo || "boolean" == typeof this.includeParentMessageInfo) && "boolean" == typeof this.showSubchannelMessagesOnly;
        } }, { key: "belongsTo", value: function(e3) {
          var t2 = x.get(this._iid), n2 = t2.BaseChannel, r2 = t2.UserMessageParams, i2 = t2.FileMessageParams, s2 = t2.BaseMessage;
          if (this.messageType !== n2.MessageTypeFilter.ALL) {
            if (e3 instanceof r2 && this.messageType !== n2.MessageTypeFilter.USER) return false;
            if (e3 instanceof i2 && this.messageType !== n2.MessageTypeFilter.FILE) return false;
          }
          if (Array.isArray(this.customTypes) && this.customTypes.length > 0 && !this.customTypes.includes(e3.customType)) return false;
          if ("string" == typeof this.customType && this.customType !== e3.customType) return false;
          if (Array.isArray(this.senderUserIds) && this.senderUserIds.length > 0) {
            var a2 = wi.getInstance(e3._iid);
            if (!a2 || !a2.currentUser || !this.senderUserIds.includes(a2.currentUser.userId)) return false;
          }
          if ("string" == typeof this.replyType && e3.parentMessageId) {
            if (this.replyType === s2.ReplyType.NONE) return false;
            if (this.replyType === s2.ReplyType.ONLY_REPLY_TO_CHANNEL && !e3.isReplyToChannel) return false;
          } else if (false === this.includeReplies && e3.parentMessageId) return false;
          return true;
        } }]), e2;
      })(), ni = (function() {
        function e2() {
          c(this, e2);
          var t2 = x.get(this._iid).BaseChannel;
          this.prevResultSize = 0, this.nextResultSize = 0, this.isInclusive = false, this.reverse = false, this.messageType = t2.MessageTypeFilter.ALL, this.customType = null, this.customTypes = [], this.senderUserIds = null, this.includeMetaArray = false, this.includeReaction = null, this.includeReactions = null, this.includeParentMessageText = null, this.includeParentMessageInfo = null;
        }
        return h(e2, [{ key: "_validate", value: function() {
          var e3 = x.get(this._iid).BaseChannel;
          return "number" == typeof this.prevResultSize && "number" == typeof this.nextResultSize && "boolean" == typeof this.isInclusive && "boolean" == typeof this.reverse && "string" == typeof this.messageType && Object.values(e3.MessageTypeFilter).includes(this.messageType) && ("string" == typeof this.customType || null === this.customType) && Array.isArray(this.customTypes) && this.customTypes.every((function(e4) {
            return "string" == typeof e4 || null === e4;
          })) && (Array.isArray(this.senderUserIds) && this.senderUserIds.every((function(e4) {
            return "string" == typeof e4;
          })) || null === this.senderUserIds) && "boolean" == typeof this.includeMetaArray && (null === this.includeReaction || "boolean" == typeof this.includeReaction) && (null === this.includeReactions || "boolean" == typeof this.includeReactions) && (null === this.includeParentMessageText || "boolean" == typeof this.includeParentMessageText) && (null === this.includeParentMessageInfo || "boolean" == typeof this.includeParentMessageInfo);
        } }]), e2;
      })(), ri = (function() {
        function e2() {
          c(this, e2), this.includeMetaArray = false, this.includeReaction = null, this.includeReactions = null, this.includeReplies = null, this.includeParentMessageText = null, this.includeThreadInfo = false, this.replyType = null, this.includeParentMessageInfo = null;
        }
        return h(e2, [{ key: "_validate", value: function() {
          return "boolean" == typeof this.includeMetaArray && (null === this.includeReaction || "boolean" == typeof this.includeReaction) && (null === this.includeReactions || "boolean" == typeof this.includeReactions) && "boolean" == typeof this.includeThreadInfo && (null === this.includeReplies || "boolean" == typeof this.includeReplies) && (null === this.replyType || "string" == typeof this.replyType && Object.values(BaseMessage.ReplyType).includes(this.replyType)) && (null === this.includeParentMessageText || "boolean" == typeof this.includeParentMessageText) && (null === this.includeParentMessageInfo || "boolean" == typeof this.includeParentMessageInfo);
        } }]), e2;
      })(), ii = (function() {
        function e2() {
          c(this, e2), this.customTypes = [], this.includeEmpty = false, this.includeFrozen = true;
        }
        return h(e2, [{ key: "_validate", value: function() {
          return (Array.isArray(this.customTypes) && this.customTypes.every((function(e3) {
            return "string" == typeof e3;
          })) || null === this.customTypes) && ("boolean" == typeof this.includeEmpty || null === this.includeEmpty) && "boolean" == typeof this.includeFrozen;
        } }]), e2;
      })(), si = function() {
        this.onReconnectStarted = function() {
        }, this.onReconnectSucceeded = function() {
        }, this.onReconnectFailed = function() {
        };
      }, ai = function() {
        this.onFriendsDiscovered = function() {
        }, this.onTotalUnreadMessageCountUpdated = function() {
        };
      }, oi = h((function e2() {
        c(this, e2), this.onMessageReceived = function(e3, t2) {
        }, this.onMessageUpdated = function(e3, t2) {
        }, this.onMessageDeleted = function(e3, t2) {
        }, this.onReadReceiptUpdated = function(e3) {
        }, this.onReactionUpdated = function(e3, t2) {
        }, this.onDeliveryReceiptUpdated = function(e3) {
        }, this.onTypingStatusUpdated = function(e3) {
        }, this.onUserJoined = function(e3, t2) {
        }, this.onUserLeft = function(e3, t2) {
        }, this.onOperatorUpdated = function(e3, t2) {
        }, this.onUserEntered = function(e3, t2) {
        }, this.onUserExited = function(e3, t2) {
        }, this.onUserMuted = function(e3, t2) {
        }, this.onUserUnmuted = function(e3, t2) {
        }, this.onUserBanned = function(e3, t2) {
        }, this.onUserUnbanned = function(e3, t2) {
        }, this.onChannelFrozen = function(e3) {
        }, this.onChannelUnfrozen = function(e3) {
        }, this.onChannelChanged = function(e3) {
        }, this.onChannelDeleted = function(e3, t2) {
        }, this.onUserReceivedInvitation = function(e3, t2, n2) {
        }, this.onUserDeclinedInvitation = function(e3, t2, n2) {
        }, this.onMetaDataCreated = function(e3, t2) {
        }, this.onMetaDataUpdated = function(e3, t2) {
        }, this.onMetaDataDeleted = function(e3, t2) {
        }, this.onMetaCountersCreated = function(e3, t2) {
        }, this.onMetaCountersUpdated = function(e3, t2) {
        }, this.onMetaCountersDeleted = function(e3, t2) {
        }, this.onChannelHidden = function(e3) {
        }, this.onMentionReceived = function(e3, t2) {
        }, this.onThreadInfoUpdated = function(e3, t2) {
        }, this.onChannelMemberCountChanged = function(e3) {
        }, this.onChannelParticipantCountChanged = function(e3) {
        };
      })), li = h((function e2(t2) {
        if (c(this, e2), t2) {
          var n2 = x.get(this._iid), r2 = n2.User, i2 = n2.BaseChannel;
          this.reader = new r2(t2.user), this.timestamp = parseInt(t2.ts), this.channelUrl = t2.hasOwnProperty("channel_url") ? String(t2.channel_url) : "", this.channelType = t2.hasOwnProperty("channel_type") ? String(t2.channel_type) : i2.CHANNEL_TYPE_GROUP;
        }
      })), ui = (function() {
        function e2(e3) {
          this.replyCount = 0, this.mostRepliedUsers = [], this.lastRepliedAt = 0, this.updatedAt = 0, e3 && this._update(e3);
        }
        return e2.objectify = function(e3) {
          var t2 = x.get(this._iid).User, n2 = e3.replyCount, r2 = void 0 === n2 ? 0 : n2, i2 = e3.mostRepliedUsers, s2 = void 0 === i2 ? [] : i2, a2 = e3.lastRepliedAt, o2 = void 0 === a2 ? 0 : a2, l2 = e3.updatedAt, u2 = void 0 === l2 ? 0 : l2, c2 = {};
          return c2.reply_count = r2, Array.isArray(s2) && s2.every((function(e4) {
            return e4 instanceof t2;
          })) && (c2.most_replies = s2.map((function(e4) {
            return t2.objectify(e4);
          }))), c2.last_replied_at = o2, c2.updated_at = u2, c2;
        }, e2.build = function(e3, t2, n2, r2) {
          return this.objectify({ replyCount: e3, mostRepliedUsers: t2, lastRepliedAt: n2, updatedAt: r2 });
        }, e2.prototype._update = function(e3) {
          var t2 = x.get(this._iid).User;
          e3.hasOwnProperty("reply_count") && (this.replyCount = parseInt(e3.reply_count)), e3.hasOwnProperty("most_replies") && Array.isArray(e3.most_replies) && e3.most_replies.every((function(e4) {
            return "object" == typeof e4;
          })) && (this.mostRepliedUsers = e3.most_replies.map((function(e4) {
            return new t2(e4);
          }))), e3.hasOwnProperty("last_replied_at") && (this.lastRepliedAt = parseInt(e3.last_replied_at)), e3.hasOwnProperty("updated_at") && (this.updatedAt = parseInt(e3.updated_at));
        }, e2;
      })(), ci = (function() {
        function e2(e3) {
          this.title = null, this.url = null, this.description = null, this.defaultImage = null, e3 && this._update(e3);
        }
        return e2.objectify = function(e3) {
          var t2 = x.get(this._iid).OGImage, n2 = e3.title, r2 = void 0 === n2 ? null : n2, i2 = e3.url, s2 = void 0 === i2 ? null : i2, a2 = e3.description, o2 = void 0 === a2 ? null : a2, l2 = e3.defaultImage, u2 = void 0 === l2 ? null : l2, c2 = {};
          return c2["og:title"] = r2, c2["og:url"] = s2, c2["og:description"] = o2, u2 && (c2["og:image"] = t2.objectify(u2)), c2;
        }, e2.prototype._update = function(e3) {
          var t2 = x.get(this._iid).OGImage;
          e3.hasOwnProperty("og:title") && (this.title = e3["og:title"]), e3.hasOwnProperty("og:url") && (this.url = e3["og:url"]), e3.hasOwnProperty("og:description") && (this.description = e3["og:description"]), e3.hasOwnProperty("og:image") && (this.defaultImage = new t2(e3["og:image"]));
        }, e2;
      })(), di = (function() {
        function e2(e3) {
          this.url = null, this.secureUrl = null, this.type = null, this.width = 0, this.height = 0, this.alt = null, e3 && this._update(e3);
        }
        return e2.objectify = function(e3) {
          var t2 = e3.url, n2 = void 0 === t2 ? null : t2, r2 = e3.secureUrl, i2 = void 0 === r2 ? null : r2, s2 = e3.type, a2 = void 0 === s2 ? null : s2, o2 = e3.width, l2 = void 0 === o2 ? 0 : o2, u2 = e3.height, c2 = void 0 === u2 ? 0 : u2, d2 = e3.alt, h2 = void 0 === d2 ? null : d2, p2 = {};
          return p2.url = n2, p2.secure_url = i2, p2.type = a2, p2.width = l2, p2.height = c2, p2.alt = h2, p2;
        }, e2.prototype._update = function(e3) {
          e3.hasOwnProperty("url") && (this.url = e3.url), e3.hasOwnProperty("secure_url") && (this.secureUrl = e3.secure_url), e3.hasOwnProperty("type") && (this.type = e3.type), e3.hasOwnProperty("width") && (this.width = parseInt(e3.width)), e3.hasOwnProperty("height") && (this.height = parseInt(e3.height)), e3.hasOwnProperty("alt") && (this.alt = e3.alt);
        }, e2;
      })(), hi = (function() {
        function e2(e3) {
          this.type = null, this.vendor = null, this.detail = {}, e3 && this._update(e3);
        }
        return e2.objectify = function(e3) {
          var t2 = e3.type, n2 = void 0 === t2 ? "" : t2, r2 = e3.vendor, i2 = void 0 === r2 ? "" : r2, s2 = e3.detail, a2 = void 0 === s2 ? {} : s2, o2 = {};
          return o2.type = n2, o2.vendor = i2, o2.detail = a2, o2;
        }, e2.prototype._update = function(e3) {
          this.type = e3.hasOwnProperty("type") ? e3.type : "", this.vendor = e3.hasOwnProperty("vendor") ? e3.vendor : "", e3.hasOwnProperty("detail") && "object" == typeof e3.detail && !Array.isArray(e3.detail) && (this.detail = e3.detail);
        }, e2;
      })(), pi = (function() {
        function e2(t2) {
          c(this, e2), this.restrictionType = null, this.description = null, this.endAt = -1, t2 && this._update(t2);
        }
        return h(e2, [{ key: "_update", value: function(e3) {
          e3.hasOwnProperty("restriction_type") && (this.restrictionType = e3.restriction_type), e3.hasOwnProperty("description") ? this.description = e3.description : e3.hasOwnProperty("muted_description") && (this.description = e3.muted_description), e3.hasOwnProperty("end_at") ? this.endAt = parseInt(e3.end_at) : e3.hasOwnProperty("muted_end_at") && (this.endAt = parseInt(e3.muted_end_at));
        } }], [{ key: "objectify", value: function(e3) {
          var t2 = e3.restrictionType, n2 = void 0 === t2 ? null : t2, r2 = e3.description, i2 = void 0 === r2 ? null : r2, s2 = e3.endAt, a2 = void 0 === s2 ? -1 : s2, o2 = {};
          return o2.restriction_type = n2, o2.description = i2, o2.end_at = a2, o2;
        } }]), e2;
      })(), fi = (function() {
        function e2() {
          var t2 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [];
          c(this, e2), this.isLoading = false, this.hasNext = true, this.limit = 20, this.userIds = t2, this.metaDataKey = "", this.metaDataValues = [], this._token = "";
        }
        return h(e2, [{ key: "next", value: function(e3) {
          var t2 = this;
          return oe(this._iid, (function(e4) {
            "number" == typeof t2.limit && t2.limit > 0 && Array.isArray(t2.userIds) && "string" == typeof t2.metaDataKey && Array.isArray(t2.metaDataValues) && !!t2.metaDataKey == t2.metaDataValues.length > 0 ? t2.isLoading ? e4(new H("Query in progress.", H.QUERY_IN_PROGRESS), null) : t2.hasNext ? (t2.isLoading = true, O.get(t2._iid).container.apiClient.loadUserList(l(l({}, t2), {}, { userIdsFilter: t2.userIds, metaDataKeyFilter: t2.metaDataKey, metaDataValuesFilter: t2.metaDataValues, token: t2._token }), (function(n2, r2) {
              var i2 = null;
              if (!n2) {
                var s2 = x.get(t2._iid).User, a2 = String(r2.next);
                t2._token = a2, t2.hasNext = !!a2, i2 = r2.users.map((function(e5) {
                  return new s2(e5);
                }));
              }
              t2.isLoading = false, e4(n2, i2);
            }))) : e4(null, []) : e4(me.error, null);
          }), e3);
        } }]), e2;
      })(), _i = /* @__PURE__ */ new WeakMap(), gi = (function() {
        function e2(t2) {
          c(this, e2), this.isLoading = false, _i.set(this, t2);
        }
        return h(e2, [{ key: "prev", value: function(e3, t2, n2, r2) {
          var i2 = arguments, s2 = this;
          return oe(this._iid, (function(r3) {
            var a2, o2 = x.get(s2._iid).BaseChannel, l2 = C(me.parse(i2, [new me({ type: "number" }), new me({ type: "number" }), new me({ type: "boolean" }), new me({ type: "function" })]), 5);
            if (a2 = l2[0], e3 = l2[1], t2 = l2[2], n2 = l2[3], r3 = l2[4], a2) r3(a2, null);
            else if (s2.isLoading) r3(new H("Query in progress.", H.QUERY_IN_PROGRESS), null);
            else {
              s2.isLoading = true;
              var u2 = _i.get(s2);
              O.get(s2._iid).container.apiClient.getMessageList({ channelUrl: u2.url, channelType: u2.channelType, token: e3, tokenType: "timestamp", isInclusive: false, prevResultSize: t2, nextResultSize: 0, shouldReverse: n2, messageType: "", customType: "" }).then((function(e4) {
                var t3 = e4.messages.map((function(e5) {
                  return o2.buildMessage(e5, u2);
                }));
                s2.isLoading = false, r3(null, t3);
              })).catch((function(e4) {
                s2.isLoading = false, r3(e4, null);
              }));
            }
          }), r2);
        } }, { key: "next", value: function(e3, t2, n2, r2) {
          var i2 = arguments, s2 = this;
          return oe(this._iid, (function(r3) {
            var a2, o2 = x.get(s2._iid).BaseChannel, l2 = C(me.parse(i2, [new me({ type: "number" }), new me({ type: "number" }), new me({ type: "boolean" }), new me({ type: "function" })]), 5);
            if (a2 = l2[0], e3 = l2[1], t2 = l2[2], n2 = l2[3], r3 = l2[4], a2) r3(a2, null);
            else if (s2.isLoading) r3(new H("Query in progress.", H.QUERY_IN_PROGRESS), null);
            else {
              s2.isLoading = true;
              var u2 = _i.get(s2);
              O.get(s2._iid).container.apiClient.getMessageList({ channelUrl: u2.url, channelType: u2.channelType, token: e3, tokenType: "timestamp", isInclusive: false, prevResultSize: 0, nextResultSize: t2, shouldReverse: n2, messageType: "", customType: "" }).then((function(e4) {
                var t3 = e4.messages.map((function(e5) {
                  return o2.buildMessage(e5, u2);
                }));
                s2.isLoading = false, r3(null, t3);
              })).catch((function(e4) {
                s2.isLoading = false, r3(e4, null);
              }));
            }
          }), r2);
        } }, { key: "load", value: function(e3, t2, n2, r2, i2) {
          var s2 = arguments, a2 = this;
          return oe(this._iid, (function(i3) {
            var o2, l2 = x.get(a2._iid).BaseChannel, u2 = C(me.parse(s2, [new me({ type: "number" }), new me({ type: "number" }), new me({ type: "number" }), new me({ type: "boolean" }), new me({ type: "callback" })]), 6);
            if (o2 = u2[0], e3 = u2[1], t2 = u2[2], n2 = u2[3], r2 = u2[4], i3 = u2[5], o2) i3(o2, null);
            else if (a2.isLoading) i3(new H("Query in progress.", H.QUERY_IN_PROGRESS), null);
            else {
              a2.isLoading = true;
              var c2 = _i.get(a2);
              O.get(a2._iid).container.apiClient.getMessageList({ channelUrl: c2.url, channelType: c2.channelType, token: e3, tokenType: "timestamp", isInclusive: false, prevResultSize: t2, nextResultSize: n2, shouldReverse: r2, messageType: "", customType: "" }).then((function(e4) {
                var t3 = e4.messages.map((function(e5) {
                  return l2.buildMessage(e5, c2);
                }));
                a2.isLoading = false, i3(null, t3);
              })).catch((function(e4) {
                a2.isLoading = false, i3(e4, null);
              }));
            }
          }), i2);
        } }]), e2;
      })(), yi = 0, mi = 1, Ei = 2, vi = (function() {
        function e2(t2) {
          var n2 = this;
          c(this, e2), this.state = yi, this._value = null, this._reason = null;
          var r2 = function(e3) {
            n2.state === yi && (n2.state = Ei, n2._reason = e3);
          };
          if ("function" != typeof t2) throw "Promise resolver ".concat(t2, " is not a function");
          try {
            t2((function(e3) {
              n2.state === yi && (n2.state = mi, n2._value = e3);
            }), r2);
          } catch (e3) {
            r2(e3);
          }
        }
        return h(e2, [{ key: "length", get: function() {
          return 1;
        } }, { key: "then", value: function(t2, n2) {
          var r2 = this, i2 = this;
          switch (this.state) {
            case yi:
              setTimeout((function() {
                return r2.then(t2, n2);
              }), 2);
              break;
            case mi:
              t2 && "function" == typeof t2 && (i2 = t2(this._value));
              break;
            case Ei:
              n2 && "function" == typeof n2 && (i2 = n2(this._reason));
          }
          return i2 instanceof e2 ? i2 : this;
        } }, { key: "catch", value: function(t2) {
          var n2 = this, r2 = this;
          switch (this.state) {
            case yi:
              setTimeout((function() {
                return n2.catch(t2);
              }), 2);
              break;
            case mi:
              break;
            case Ei:
              r2 = t2(this._reason);
          }
          return r2 instanceof e2 ? r2 : this;
        } }, { key: "finally", value: function(t2) {
          var n2 = this, r2 = this;
          switch (this.state) {
            case yi:
              setTimeout((function() {
                return n2.finally(t2);
              }), 2);
              break;
            case mi:
            case Ei:
              r2 = t2();
          }
          return r2 instanceof e2 ? r2 : this;
        } }], [{ key: "all", value: function(t2) {
          return new e2((function(n2, r2) {
            if (Array.isArray(t2) || "string" == typeof t2) if (t2.length > 0) {
              for (var i2 = [], s2 = 0; s2 < t2.length; s2++) t2[s2] instanceof e2 ? i2.push(t2[s2]) : i2.push(e2.resolve(t2[s2]));
              var a2 = new Array(i2.length).fill(null), o2 = i2.length, l2 = function(e3, t3, i3) {
                t3 ? r2(t3) : (o2--, a2[e3] = i3, o2 <= 0 && n2(a2));
              };
              i2.forEach((function(e3, t3) {
                e3.then((function(e4) {
                  l2(t3, null, e4);
                })).catch((function(e4) {
                  l2(t3, e4, null);
                }));
              }));
            } else n2([]);
            else r2(new Error("Uncaught (in promise) TypeError: ".concat(u(t2), " ").concat(t2, " is not iterable")));
          }));
        } }, { key: "resolve", value: function(t2) {
          return new e2((function(n2, r2) {
            t2 instanceof e2 ? t2.then((function(t3) {
              return e2.resolve(t3);
            })).catch((function(e3) {
              return r2(e3);
            })) : n2(t2);
          }));
        } }, { key: "reject", value: function(t2) {
          return new e2((function(e3, n2) {
            n2(t2);
          }));
        } }]), e2;
      })(), bi = function() {
        "undefined" != typeof Promise && Promise.prototype.finally || ("undefined" != typeof window ? window.Promise = vi : "undefined" != typeof global ? global.Promise = vi : "undefined" != typeof self ? self.Promise = vi : "undefined" != typeof globalThis && (globalThis.Promise = vi)), Object.values || (Object.values = function(e2) {
          return Object.keys(e2).map((function(t2) {
            return e2[t2];
          }));
        }), Number.MAX_SAFE_INTEGER || Object.defineProperty(Number, "MAX_SAFE_INTEGER", { value: Math.pow(2, 53) - 1 });
      }, Ci = "collection@semaphore_holders_for:", Ai = "collection@semaphore_resolvers_for:", Ni = "collection@semaphore_chain_process_state_for:", Si = /* @__PURE__ */ new Map(), Ii = /* @__PURE__ */ new Map(), Ti = /* @__PURE__ */ new Map(), Ui = (function() {
        function e2(t2) {
          var n2 = t2.key, r2 = t2.concurrentCallLimit, i2 = void 0 === r2 ? 2 : r2, s2 = t2.backOffDelay, a2 = void 0 === s2 ? 0 : s2, o2 = this;
          this._holdersKey = e2.createSemaphoreHoldersKey(n2), this._resolversKey = e2.createSemaphoreResolversKey(n2), this._chainProcessStateKey = e2.createChainProcessStateKey(n2), this._numLocks = i2, this._backOffDelay = a2, this._localAcquiredKeys = [], this._localResolversData = [], $() ? (Si[this._holdersKey] || (Si[this._holdersKey] = []), Ii[this._resolversKey] || (Ii[this._resolversKey] = [])) : (window.addEventListener("storage", (function(e3) {
            return L(o2, void 0, void 0, (function() {
              var t3, n3;
              return w(this, (function(r3) {
                if (this._localResolversData.length > 0 && this.numLocksAvailable > 0 && !this._isProcessChainAcquireRunning() && this._hasHighestPriorityResolver()) switch (e3.key) {
                  case this._holdersKey:
                    if (t3 = JSON.parse(e3.oldValue), n3 = JSON.parse(e3.newValue), !t3 || !n3 || n3.length >= t3.length) return [2];
                    this._processChainResolve();
                    break;
                  case this._chainProcessStateKey:
                    if (JSON.parse(e3.newValue)) return [2];
                    this._processChainResolve();
                    break;
                  default:
                    return [2];
                }
                return [2];
              }));
            }));
          })), window.addEventListener("beforeunload", (function() {
            var e3 = o2._getLocalResolversData(), t3 = o2._localResolversData.map((function(e4) {
              return e4.key;
            })), n3 = e3.filter((function(e4) {
              return t3.indexOf(e4.key) < 0;
            }));
            n3.length > 0 ? window.localStorage.setItem(o2._resolversKey, JSON.stringify(n3)) : window.localStorage.removeItem(o2._resolversKey), o2._localAcquiredKeys.forEach((function(e4) {
              return o2.release(e4);
            }));
          })));
        }
        return e2.createSemaphoreHoldersKey = function(e3) {
          return Ci + e3;
        }, e2.createSemaphoreResolversKey = function(e3) {
          return Ai + e3;
        }, e2.createChainProcessStateKey = function(e3) {
          return Ni + e3;
        }, e2.removeAllSemaphoreKeys = function() {
          if ("undefined" != typeof document && "undefined" != typeof navigator && "undefined" != typeof localStorage) {
            for (var e3 = [], t2 = 0; t2 < localStorage.length; t2++) {
              var n2 = localStorage.key(t2);
              (n2.startsWith(Ci) || n2.startsWith(Ai) || n2.startsWith(Ni)) && e3.push(n2);
            }
            for (t2 = 0; t2 < e3.length; t2++) localStorage.removeItem(e3[t2]);
          }
        }, Object.defineProperty(e2.prototype, "numLocks", { get: function() {
          return this._numLocks;
        }, enumerable: false, configurable: true }), Object.defineProperty(e2.prototype, "backOffDelay", { get: function() {
          return this._backOffDelay;
        }, enumerable: false, configurable: true }), Object.defineProperty(e2.prototype, "numLocksAvailable", { get: function() {
          if ($()) return this.numLocks - Si[this._holdersKey].length;
          var e3 = this._getLocalHoldersData();
          return this.numLocks - e3.length;
        }, enumerable: false, configurable: true }), Object.defineProperty(e2.prototype, "waitCount", { get: function() {
          return $() ? Ii[this._resolversKey].length : this._getLocalResolversData().length;
        }, enumerable: false, configurable: true }), e2.prototype._hasHighestPriorityResolver = function() {
          var e3 = this._getLocalResolversData();
          return e3.length > 0 && this._localResolversData.map((function(e4) {
            return e4.key;
          })).indexOf(e3[0].key) >= 0;
        }, e2.prototype._isProcessChainAcquireRunning = function() {
          if ($()) return Ti[this._chainProcessStateKey];
          var e3 = window.localStorage[this._chainProcessStateKey];
          return void 0 !== e3 && JSON.parse(e3);
        }, e2.prototype._setProcessChainAcquireRunning = function(e3) {
          $() ? Ti[this._chainProcessStateKey] = e3 : e3 ? window.localStorage.setItem(this._chainProcessStateKey, JSON.stringify(e3)) : window.localStorage.removeItem(this._chainProcessStateKey);
        }, e2.prototype._processChainResolve = function() {
          return L(this, void 0, void 0, (function() {
            var e3;
            return w(this, (function(t2) {
              switch (t2.label) {
                case 0:
                  return this.waitCount > 0 && this.numLocksAvailable > 0 && !this._isProcessChainAcquireRunning() ? (this._setProcessChainAcquireRunning(true), this._tryResolve() ? [4, Ue(this._backOffDelay)] : [3, 2]) : [3, 3];
                case 1:
                  t2.sent(), t2.label = 2;
                case 2:
                  this._setProcessChainAcquireRunning(false), $() ? this._processChainResolve() : (e3 = new StorageEvent("storage", { key: this._chainProcessStateKey, oldValue: JSON.stringify(true), newValue: JSON.stringify(false) }), dispatchEvent(e3)), t2.label = 3;
                case 3:
                  return [2];
              }
            }));
          }));
        }, e2.prototype.acquire = function(e3) {
          return void 0 === e3 && (e3 = Ct.BACKGROUND_SYNC_CLOSE), L(this, void 0, void 0, (function() {
            var t2, n2 = this;
            return w(this, (function(r2) {
              return $() ? [2, new Promise((function(t3) {
                var r3 = { key: Oe(), resolver: function(e4) {
                  return t3(e4);
                }, priority: e3 };
                switch (e3) {
                  case Ct.USER_CALL:
                  case Ct.FILL:
                  case Ct.BACKGROUND_SYNC_OPEN:
                    for (var i2 = Ii[n2._resolversKey], s2 = -1, a2 = 0; a2 < i2.length && s2 < 0; a2++) e3 > i2[a2].priority && (s2 = a2);
                    if (s2 >= 0) {
                      Ii[n2._resolversKey].splice(s2, 0, r3);
                      break;
                    }
                  case Ct.BACKGROUND_SYNC_CLOSE:
                    Ii[n2._resolversKey].push(r3);
                }
                n2._processChainResolve();
              }))] : (t2 = this._getLocalResolversData(), [2, new Promise((function(r3) {
                var i2 = Oe(), s2 = { key: i2, priority: e3 }, a2 = { key: i2, resolver: function(e4) {
                  return r3(e4);
                }, priority: e3 };
                switch (e3) {
                  case Ct.USER_CALL:
                  case Ct.FILL:
                  case Ct.BACKGROUND_SYNC_OPEN:
                    for (var o2 = -1, l2 = 0; l2 < t2.length && o2 < 0; l2++) e3 > t2[l2].priority && (o2 = l2);
                    if (o2 >= 0) {
                      t2.splice(o2, 0, s2), window.localStorage.setItem(n2._resolversKey, JSON.stringify(t2)), n2._localResolversData.splice(o2, 0, a2);
                      break;
                    }
                  case Ct.BACKGROUND_SYNC_CLOSE:
                    t2.push(s2), window.localStorage.setItem(n2._resolversKey, JSON.stringify(t2)), n2._localResolversData.push(a2);
                }
                n2._processChainResolve();
              }))]);
            }));
          }));
        }, e2.prototype.release = function(e3) {
          if ($()) {
            if ((t2 = Si[this._holdersKey].indexOf(e3)) >= 0) return Si[this._holdersKey].splice(t2, 1), this._processChainResolve(), true;
          } else {
            var t2, n2 = JSON.parse(window.localStorage[this._holdersKey]), r2 = P([], n2, true);
            if ((t2 = n2.indexOf(e3)) >= 0) {
              n2.splice(t2, 1), n2.length > 0 ? window.localStorage.setItem(this._holdersKey, JSON.stringify(n2)) : window.localStorage.removeItem(this._holdersKey), this._localAcquiredKeys.splice(this._localAcquiredKeys.indexOf(e3), 1);
              var i2 = new StorageEvent("storage", { key: this._holdersKey, oldValue: JSON.stringify(r2), newValue: JSON.stringify(n2) });
              return dispatchEvent(i2), true;
            }
          }
          return false;
        }, e2.prototype._tryResolve = function() {
          if ($()) {
            if (Si[this._holdersKey].length < this.numLocks) {
              var e3 = Oe();
              return Si[this._holdersKey] = P(P([], Si[this._holdersKey], true), [e3], false), (n2 = Ii[this._resolversKey].shift()).resolver(e3), true;
            }
          } else {
            var t2 = this._getLocalHoldersData();
            if (t2.length < this.numLocks) {
              e3 = Oe();
              var n2 = this._localResolversData.shift(), r2 = this._getLocalResolversData(), i2 = r2.map((function(e4) {
                return e4.key;
              })).indexOf(n2.key);
              r2.splice(i2, 1), r2.length > 0 ? window.localStorage.setItem(this._resolversKey, JSON.stringify(r2)) : window.localStorage.removeItem(this._resolversKey), window.localStorage.setItem(this._holdersKey, JSON.stringify(P(P([], t2, true), [e3], false))), this._localAcquiredKeys.push(e3);
              var s2 = new StorageEvent("storage", { key: this._holdersKey, oldValue: JSON.stringify(P([], t2, true)), newValue: JSON.stringify(P(P([], t2, true), [e3], false)) });
              return dispatchEvent(s2), (0, n2.resolver)(e3), true;
            }
          }
          return false;
        }, e2.prototype._getLocalHoldersData = function() {
          var e3 = window.localStorage[this._holdersKey];
          return void 0 !== e3 ? JSON.parse(e3) : [];
        }, e2.prototype._getLocalResolversData = function() {
          var e3 = window.localStorage[this._resolversKey];
          return void 0 !== e3 ? JSON.parse(e3) : [];
        }, e2;
      })(), Oi = 3e5, Mi = null, ki = {}, Ri = false, Li = null, wi = (function() {
        function e2() {
          var t2 = this, n2 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
          c(this, e2), bi();
          var r2 = false;
          if ((n2.newInstance || !Mi || Mi && n2.appId !== Mi.getApplicationId() && Mi.getConnectionState() === Mi.ConnectionState.CLOSED) && (r2 = true, Mi = this), r2) {
            try {
              if (!n2.hasOwnProperty("appId")) return J.warn("Must be set appId."), Mi = null, null;
            } catch (e3) {
              return J.warn("Must be set appId."), Mi = null, null;
            }
            var i2 = Xn.create();
            Object.defineProperty(this, "_iid", { get: function() {
              return i2;
            } }), ki[i2] = this, this.customApiHost = null, this.customWsHost = null, this.connecting = false, this.reconnecting = false, this.isReconnectingOnError = false, this.connectionCallbacks = [], this.ConnectionManager = new Ee(this), this.GCMPushToken = "", this.APNSPushToken = "", this.PUSH_TEMPLATE_DEFAULT = "default", this.PUSH_TEMPLATE_ALTERNATIVE = "alternative", this.currentUser = null, this.isSessionOpened = false, this.globalTimer, this.loginTimer, this.reconnectTimer, this.loginHandler = null, this.onLoginTimerCancel, this.onReconnectTimerCancel, this.BaseChannel = { MessageTypeFilter: Rt.MessageTypeFilter }, this.GroupChannelFilter = Zn, this.MessageFilter = et, this.GroupChannelCollection = { GroupChannelOrder: Le }, this.MessageCollection = { MessageCollectionInitPolicy: at }, this.CollectionEventSource = de, this._currentUserId = null;
            var s2 = { User: ft, Member: or, RestrictedUser: ur, GroupChannel: ar, OpenChannel: gr, UserMessage: Nr, FileMessage: Ir, AdminMessage: Tr, GroupChannelListQuery: wr, MemberListQuery: Pr, GroupChannelParams: Qr, OpenChannelParams: Wr, BaseMessageParams: br, UserMessageParams: Cr, FileMessageParams: Sr, ScheduledUserMessageParams: Jr, GroupChannelTotalUnreadMessageCountParams: Zr, GroupChannelTotalUnreadChannelCountParams: $r, MessageRetrievalParams: ei, MessageListParams: ti, ThreadedMessageListParams: ni, MessageChangeLogsParams: ri, GroupChannelChangeLogsParams: ii, MessageMetaArray: Er, UserEventHandler: ai, SessionHandler: ve, ChannelHandler: oi, ConnectionHandler: si, AppleCriticalAlertOptions: mr }, a2 = { SessionManager: be, BaseChannel: Rt, BaseMessage: pt, UserListQuery: fi, ApplicationUserListQuery: Mr, BannedUserListQuery: kr, BlockedUserListQuery: Rr, FriendListQuery: Lr, MutedUserListQuery: Dr, OpenChannelListQuery: Hr, OperatorListQuery: Gr, ParticipantListQuery: jr, MessageListQuery: gi, PreviousMessageListQuery: zr, MessageSearchQuery: Vr, PublicGroupChannelListQuery: Yr, ScheduledUserMessage: Ur, ThreadInfo: ui, ThreadInfoUpdateEvent: Or, OGMetaData: ci, OGImage: di, Plugin: hi, Command: Ne, Sender: lr, ReadStatus: li, Reaction: Ar, ReactionEvent: lt, Emoji: hr, EmojiCategory: dr, EmojiContainer: cr, RestrictionInfo: pi, FileMessageQueue: Gt }, o2 = new x(this._iid, l(l({}, s2), a2));
            this.BaseMessage = { ReplyType: pt.ReplyType, getMessage: o2.BaseMessage.getMessage.bind(o2.BaseMessage) }, Object.keys(o2).forEach((function(e3) {
              s2[e3] && (t2[e3] = o2[e3]);
            }));
            var u2 = { encrypt: function(e3) {
              return e3;
            }, decrypt: function(e3) {
              return e3;
            } };
            O.create(i2, { appId: n2.appId, pinger: new Z(this), apiClient: new ue(this), wsAdapter: new ye(this), commandHandler: new Pt(this), onlineDetector: new Ce(this), ackStateMap: {}, subscribedUnreadMessageCount: { all: 0, custom_types: {}, ts: 0 }, maxUnreadCountOfSuperGroupChannel: T.DEFAULT_MAX_UNREAD_COUNT_OF_SUPER_GROUP_CHANNEL, nestdb: null, currentUserId: null, localCacheEnabled: "boolean" == typeof n2.localCacheEnabled && n2.localCacheEnabled, localCacheLock: new X(), debugCache: false, encryption: u2, store: new Hn({ encryption: u2 }), preference: null, auth: new F(), appInfo: null, pingInterval: 15e3, pongTimeout: 5e3, connectedAt: 0, extensions: {}, supportedExtensionKeys: ["sb_uikit", "sb_syncmanager", "device-os-platform"], getUserAgentWithExtensions: function(e3) {
              var t3 = $() ? "reactnative" : "JS", n3 = e3.sb_syncmanager ? "s".concat(e3.sb_syncmanager) : "", r3 = e3.sb_uikit ? "u".concat(e3.sb_uikit) : "", i3 = e3["device-os-platform"] ? "o".concat(e3["device-os-platform"]) : "";
              return "".concat(t3, "/c").concat(T.SDK_VERSION, "/").concat(n3, "/").concat(r3, "/").concat(i3);
            }, sessionManager: new o2.SessionManager(this), stateChangeEnabled: true, isInBackground: false, closedByGoingBackground: false, isErrorFirstInCallback: false, autoResendQueue: [], isProcessingAutoResend: false }), this.userEventHandlers = {}, this.channelHandlers = {}, this.connectionHandlers = {}, this.Options = { _useMemberAsMessageSender: true, get UseMemberAsMessageSender() {
              return this._useMemberAsMessageSender;
            }, set UseMemberAsMessageSender(e3) {
              "boolean" == typeof e3 && (this._useMemberAsMessageSender = e3);
            }, get useMemberAsMessageSender() {
              return this._useMemberAsMessageSender;
            }, set useMemberAsMessageSender(e3) {
              "boolean" == typeof e3 && (this._useMemberAsMessageSender = e3);
            }, _typingIndicatorThrottle: 1e3, get typingIndicatorThrottle() {
              return this._typingIndicatorThrottle;
            }, set typingIndicatorThrottle(e3) {
              "number" == typeof e3 && e3 >= 1e3 && e3 <= 9e3 && (this._typingIndicatorThrottle = e3);
            }, _websocketResponseTimeout: 1e4, get websocketResponseTimeout() {
              return this._websocketResponseTimeout;
            }, set websocketResponseTimeout(e3) {
              "number" == typeof e3 && e3 >= 5e3 && e3 <= Oi && (this._websocketResponseTimeout = e3);
            } };
            var d2 = pe.of(i2);
            d2.addObserver({ onConnect: function() {
              t2.isCacheEnabled && !t2.getIsProcessingAutoResend() && (0 === t2.getAutoResendQueue().length ? Ut._processAutoResendRegisteredPendingMessages(t2).then((function() {
                Ut._processNextAutoResend(t2);
              })) : Ut._processNextAutoResend(t2));
            }, onDisconnect: function() {
            } });
          }
          return Mi;
        }
        return h(e2, [{ key: "ConnectionState", get: function() {
          return { CONNECTING: "CONNECTING", OPEN: "OPEN", CLOSED: "CLOSED" };
        } }, { key: "MessageRequestState", get: function() {
          return { NONE: "none", PENDING: "pending", FAILED: "failed", SUCCEEDED: "succeeded" };
        } }, { key: "MessageSendingStatus", get: function() {
          return { NONE: "none", PENDING: "pending", FAILED: "failed", CANCELED: "canceled", SUCCEEDED: "succeeded" };
        } }, { key: "pushTokenRegistrationState", get: function() {
          return { SUCCESS: "success", PENDING: "pending", ERROR: "error" };
        } }, { key: "PushTriggerOption", get: function() {
          return { ALL: "all", MENTION_ONLY: "mention_only", OFF: "off" };
        } }, { key: "appInfo", get: function() {
          return O.get(this._iid).container.appInfo;
        } }, { key: "isCacheEnabled", get: function() {
          return O.get(this._iid).container.localCacheEnabled;
        } }, { key: "ekey", get: function() {
          var e3 = O.get(this._iid).container.auth;
          return e3 ? e3.eKey : "";
        } }, { key: "getApplicationId", value: function() {
          return O.get(this._iid).get("appId");
        } }, { key: "getCurrentUserId", value: function() {
          return this.currentUser ? this.currentUser.userId : null;
        } }, { key: "getDebugMode", value: function() {
          return Ri;
        } }, { key: "setDebugMode", value: function(e3) {
          Ri = e3, J.mode = e3 ? J.Mode.DEBUG : J.Mode.PRODUCTION;
        } }, { key: "getErrorFirstCallback", value: function() {
          return O.get(this._iid).container.isErrorFirstInCallback;
        } }, { key: "setErrorFirstCallback", value: function(e3) {
          "boolean" == typeof e3 && O.get(this._iid).set("isErrorFirstInCallback", e3);
        } }, { key: "getAutoResendQueue", value: function() {
          return O.get(this._iid).container.autoResendQueue;
        } }, { key: "getIsProcessingAutoResend", value: function() {
          return O.get(this._iid).container.isProcessingAutoResend;
        } }, { key: "setIsProcessingAutoResend", value: function(e3) {
          O.get(this._iid).set("isProcessingAutoResend", e3);
        } }, { key: "getCurrentApiHost", value: function() {
          return this.customApiHost ? this.customApiHost : "https://api.sendbird.com";
        } }, { key: "clearCurrentApiHost", value: function() {
          this.customApiHost = null;
        } }, { key: "getCurrentWsHost", value: function() {
          return this.customWsHost ? this.customWsHost : "wss://ws.sendbird.com";
        } }, { key: "clearCurrentWsHost", value: function() {
          this.customWsHost = null;
        } }, { key: "getConnectionState", value: function() {
          try {
            var e3 = O.get(this._iid).container.wsAdapter;
            return this.connecting || this.reconnecting ? this.ConnectionState.CONNECTING : e3.client ? this.connecting || this.reconnecting ? this.ConnectionState.CONNECTING : this.isSessionOpened ? e3.client.getConnectionState() : this.ConnectionState.CLOSED : this.ConnectionState.CLOSED;
          } catch (e4) {
            return this.ConnectionState.CLOSED;
          }
        } }, { key: "getPendingGCMToken", value: function() {
          return this.GCMPushToken;
        } }, { key: "getPendingAPNSToken", value: function() {
          return this.APNSPushToken;
        } }, { key: "hasLoggedIn", value: function() {
          var e3 = O.get(this._iid);
          return this.currentUser && e3.get("auth").hasSession();
        } }, { key: "getLastConnectedAt", value: function() {
          var e3 = O.get(this._iid);
          return this.getConnectionState() === this.ConnectionState.OPEN && this.currentUser ? e3.get("connectedAt") : 0;
        } }, { key: "setOnlineListener", value: function(e3) {
          O.get(this._iid).container.onlineDetector.setOnlineListener(e3);
        } }, { key: "setOfflineListener", value: function(e3) {
          O.get(this._iid).container.onlineDetector.setOfflineListener(e3);
        } }, { key: "getMemoryStoreForDebugging", value: function() {
          var e3 = O.get(this._iid);
          return e3.container.debugCache && e3.container.store instanceof Pn ? e3.container.store : null;
        } }, { key: "useMemoryAsDatabaseForDebugging", value: function() {
          var e3 = O.get(this._iid);
          e3.container.debugCache = true, e3.container.store = new Pn();
        } }, { key: "useAsyncStorageAsDatabase", value: function(e3) {
          var t2 = O.get(this._iid);
          t2.container.store = new Fn({ AsyncStorage: e3, encryption: t2.container.encryption });
        } }, { key: "useMMKVAsDatabase", value: function(e3) {
          var t2 = O.get(this._iid);
          t2.container.store = new Gn({ MMKV: e3, encryption: t2.container.encryption });
        } }, { key: "initializeDatabase", value: function(e3, t2) {
          var n2 = this, r2 = O.get(this._iid), i2 = r2.container, s2 = i2.appId, a2 = i2.nestdb, o2 = i2.store, l2 = i2.localCacheEnabled;
          return oe(this._iid, (function(t3) {
            if (l2) if (a2) t3(null);
            else {
              var i3 = r2.container.nestdb = new Jn({ name: "sendbird=".concat(s2, "-").concat(e3, ".db"), version: 1, store: o2 });
              i3.on("upgrade", (function(e4, t4) {
                if (0 === e4) i3.commitSchema([{ collectionName: "GroupChannel", keyName: "url", index: [ze.NAME_ALPHABETICAL, ze.CHRONOLOGICAL, ze.LATEST_LAST_MESSAGE] }, { collectionName: "SucceededMessage", keyName: "messageId", index: [Ye.LATEST, Ye.CHILD_MESSAGE_FIRST] }, { collectionName: "UnsentMessage", keyName: "reqId", index: [Ye.LATEST_UNSENT, Ye.CHILD_MESSAGE_FIRST] }]).then((function() {
                  return t4();
                })).catch((function(e5) {
                  throw e5;
                }));
                else t4();
              })), i3.on("error", (function(e4) {
                e4 ? e4.code === xt.STORE_NOT_AVAILABLE || e4.code === xt.STORE_NOT_AVAILABLE_IN_PRIVATE_BROWSING ? t3(null) : (J.error("Database initialize failed with an error: ", e4), t3(e4)) : t3(null);
              })), i3.on("success", (function() {
                r2.container.currentUserId = e3, new $e({ iid: n2._iid, collection: i3.collection("GroupChannel") }), new ot({ iid: n2._iid, collections: { succeeded: i3.collection("SucceededMessage"), unsent: i3.collection("UnsentMessage") } }), J.debug("Database initialize succeeded."), t3(null);
              })), i3.open();
            }
            else r2.container.currentUserId = e3, new $e({ iid: n2._iid, collection: null }), new ot({ iid: n2._iid, collections: { succeeded: null, unsent: null } }), t3(null);
          }), t2);
        } }, { key: "clearCachedData", value: function() {
          var e3 = O.get(this._iid), t2 = e3.container, n2 = t2.localCacheEnabled, r2 = t2.nestdb;
          return new Promise((function(t3, i2) {
            n2 && r2 ? (r2.close(), r2.reset().then((function() {
              J.debug("Database clear succeeded."), e3.container.nestdb = null, t3();
            })).catch((function(e4) {
              J.error("Database clear failed with an error: ", e4), i2(e4);
            }))) : t3();
          }));
        } }, { key: "connect", value: function(e3, t2, n2, r2, i2) {
          var s2 = this, a2 = O.get(this._iid), o2 = a2.container, l2 = o2.wsAdapter, u2 = o2.onlineDetector, c2 = o2.localCacheEnabled;
          Ui.removeAllSemaphoreKeys(), u2 && u2.start();
          var d2 = null, h2 = me.parse(arguments, [new me({ type: "string", constraint: function(e4) {
            return e4.length > 0;
          } }), new me({ type: "string", nullable: true, ignoreIf: function(e4) {
            return 1 === e4.length || 3 === e4.length;
          } }), new me({ type: "string", nullable: true, ignoreIf: function(e4) {
            return 1 === e4.length || 2 === e4.length;
          } }), new me({ type: "string", nullable: true, ignoreIf: function(e4) {
            return 1 === e4.length || 2 === e4.length;
          } }), new me({ type: "callback" })]), p2 = C(h2, 6);
          return d2 = p2[0], e3 = p2[1], t2 = p2[2], n2 = p2[3], r2 = p2[4], i2 = p2[5], (n2 || r2) && J.debug("Please note that apiHost and wsHost are for internal use only."), oe(this._iid, (function(i3) {
            if (d2) i3(d2, null);
            else if (s2.customApiHost = n2, s2.customWsHost = r2, s2.connecting = true, s2.reconnecting = false, s2.isReconnectingOnError = false, s2.reconnectTimer && (clearTimeout(s2.reconnectTimer), s2.reconnectTimer = null, s2.onReconnectTimerCancel = null), s2.getConnectionState() === s2.ConnectionState.OPEN && s2.currentUser && s2.currentUser.userId === e3) s2.connecting = false, i3(null, s2.currentUser);
            else if (c2 && (s2._currentUserId = e3), s2.connectionCallbacks.push(i3), 1 === s2.connectionCallbacks.length) {
              l2.disconnect({ clearSession: true, err: null }, null);
              var o3 = a2.container, u3 = o3.nestdb, h3 = o3.localCacheLock;
              u3 ? l2.connect(e3, t2).then((function() {
                if (c2) return Ut._processNonAutoResendRegisteredPendingMessages(s2);
              })) : h3.lock((function(n3) {
                s2.initializeDatabase(e3).then((function() {
                  n3(), l2.connect(e3, t2);
                })).then((function() {
                  if (c2) return Ut._processNonAutoResendRegisteredPendingMessages(s2);
                })).catch((function(e4) {
                  a2.container.localCacheEnabled = false, n3(), i3(e4, null);
                }));
              }));
            }
          }), i2);
        } }, { key: "reconnect", value: function() {
          var e3 = this, t2 = O.get(this._iid).container, n2 = t2.wsAdapter, r2 = t2.auth, i2 = t2.localCacheLock;
          if (r2.sessionKey && this.currentUser) {
            var s2 = true;
            return n2.reconnectCount > 0 && (s2 = false), i2.lock((function(t3) {
              n2.disconnect({ clearSession: false, err: new H("Connection has been canceled.", H.CONNECTION_CANCELED) }, null), n2.reconnectCount = 0, n2.reconnect(e3.currentUser.userId, s2), t3();
            })), true;
          }
          return false;
        } }, { key: "disconnect", value: function(e3) {
          var t2 = this;
          return oe(this._iid, (function(e4) {
            var n2 = O.get(t2._iid).container, r2 = n2.localCacheLock, i2 = n2.wsAdapter, s2 = n2.onlineDetector;
            s2 && s2.stop(), r2.lock((function(n3) {
              i2.disconnect({ clearSession: true, err: new H("Connection has been canceled.", H.CONNECTION_CANCELED) }, (function() {
                t2.clearCachedData().finally((function() {
                  n3(), e4(null);
                }));
              }));
            }));
          }), e3);
        } }, { key: "setBackgroundState", value: function() {
          var e3 = O.get(this._iid), t2 = e3.container, n2 = t2.wsAdapter, r2 = t2.stateChangeEnabled;
          !t2.isInBackground && r2 && (e3.set("isInBackground", true), this.getConnectionState() !== this.ConnectionState.CLOSED ? (e3.set("closedByGoingBackground", true), n2.disconnect({ clearSession: false, err: new H("Websocket connection failed as the app goes background.", H.WEBSOCKET_CONNECTION_FAILED) }, null), pe.of(this._iid).invokeDisconnect()) : e3.set("closedByGoingBackground", false));
        } }, { key: "isInBackground", get: function() {
          return O.get(this._iid).container.isInBackground;
        } }, { key: "setForegroundState", value: function() {
          var e3 = O.get(this._iid), t2 = e3.container, n2 = t2.wsAdapter, r2 = t2.stateChangeEnabled, i2 = t2.isInBackground, s2 = t2.closedByGoingBackground;
          i2 && r2 && (e3.set("isInBackground", false), s2 && this.currentUser && n2.reconnect(this.currentUser.userId, true));
        } }, { key: "enableStateChange", value: function() {
          O.get(this._iid).set("enableStateChange", true);
        } }, { key: "disableStateChange", value: function() {
          O.get(this._iid).set("enableStateChange", false);
        } }, { key: "addExtension", value: function(e3, t2) {
          var n2 = O.get(this._iid).container, r2 = n2.extensions;
          n2.supportedExtensionKeys.indexOf(e3) > -1 && (r2[e3] = t2);
        } }, { key: "createUserListQuery", value: function(e3) {
          return new (0, x.get(this._iid).UserListQuery)(e3);
        } }, { key: "createApplicationUserListQuery", value: function() {
          return new (0, x.get(this._iid).ApplicationUserListQuery)();
        } }, { key: "createBlockedUserListQuery", value: function() {
          return new (0, x.get(this._iid).BlockedUserListQuery)();
        } }, { key: "createFriendListQuery", value: function() {
          return new (0, x.get(this._iid).FriendListQuery)();
        } }, { key: "createMessageSearchQuery", value: function(e3, t2) {
          return new (0, x.get(this._iid).MessageSearchQuery)(e3, t2);
        } }, { key: "sendCommand", value: function(e3, t2) {
          var n2 = this;
          return oe(this._iid, (function(t3) {
            n2.ConnectionManager.ready((function(r2, i2) {
              if (r2) t3(r2, null);
              else {
                var s2 = O.get(n2._iid).container, a2 = s2.wsAdapter, o2 = s2.ackStateMap;
                if (null == a2 || null == a2.client || a2.client.getConnectionState() !== n2.ConnectionState.OPEN || n2.getConnectionState() !== n2.ConnectionState.OPEN) return void t3(new H("Connection is not valid. Please reconnect.", H.WEBSOCKET_CONNECTION_CLOSED), null);
                if (e3.isAckRequired) {
                  var l2 = e3.requestId, u2 = { handler: t3, timer: setTimeout((function() {
                    t3(new H("Command received no ack.", H.ACK_TIMEOUT), null), delete o2[l2];
                  }), n2.Options.websocketResponseTimeout) };
                  o2[l2] = u2, a2.client.send(e3, (function(e4) {
                    e4 && (clearTimeout(u2.timer), t3(e4, null));
                  }));
                } else a2.client.send(e3, t3);
              }
            }), false);
          }), t2).catch((function(e4) {
            J.debug(e4);
          }));
        } }, { key: "setSessionHandler", value: function(e3) {
          O.get(this._iid).container.sessionManager.setHandler(e3);
        } }, { key: "addUserEventHandler", value: function(e3, t2) {
          t2 instanceof x.get(this._iid).UserEventHandler && (this.userEventHandlers[e3] = t2);
        } }, { key: "removeUserEventHandler", value: function(e3) {
          delete this.userEventHandlers[e3];
        } }, { key: "removeAllUserEventHandler", value: function() {
          this.userEventHandlers = {};
        } }, { key: "addChannelHandler", value: function(e3, t2) {
          t2 instanceof x.get(this._iid).ChannelHandler && (this.channelHandlers[e3] = t2);
        } }, { key: "removeChannelHandler", value: function(e3) {
          delete this.channelHandlers[e3];
        } }, { key: "removeAllChannelHandlers", value: function() {
          this.channelHandlers = {};
        } }, { key: "addConnectionHandler", value: function(e3, t2) {
          t2 instanceof x.get(this._iid).ConnectionHandler && (this.connectionHandlers[e3] = t2);
        } }, { key: "removeConnectionHandler", value: function(e3) {
          delete this.connectionHandlers[e3];
        } }, { key: "removeAllConnectionHandlers", value: function() {
          this.connectionHandlers = {};
        } }, { key: "updateCurrentUserInfo", value: function(e3, t2, n2) {
          var r2 = this, i2 = null, s2 = me.parse(arguments, [new me({ type: "string", nullable: true }), new me({ type: "string", nullable: true }), new me({ type: "callback" })]), a2 = C(s2, 4);
          return i2 = a2[0], e3 = a2[1], t2 = a2[2], n2 = a2[3], oe(this._iid, (function(n3) {
            if (i2) n3(i2, null);
            else {
              var s3 = O.get(r2._iid);
              s3.container.apiClient.updateCurrentUserInfo({ nickname: e3, profileUrl: t2 }, (function(i3, a3) {
                var o2 = null;
                i3 || (r2.currentUser && (e3 && (r2.currentUser.nickname = e3), t2 && (r2.currentUser.plainProfileUrl = t2, Object.defineProperty(r2.currentUser, "profileUrl", { value: r2.currentUser.requireAuth ? "".concat(r2.currentUser.plainProfileUrl, "?auth=").concat(s3.container.auth.eKey) : r2.currentUser.plainProfileUrl, configurable: true, writable: false }))), o2 = r2.currentUser), n3(i3, o2);
              }));
            }
          }), n2);
        } }, { key: "updateCurrentUserInfoWithProfileImage", value: function(e3, t2, n2) {
          var r2 = this, i2 = null, s2 = me.parse(arguments, [new me({ type: "string", nullable: true }), new me({ type: "file", nullable: true }), new me({ type: "callback" })]), a2 = C(s2, 4);
          return i2 = a2[0], e3 = a2[1], t2 = a2[2], n2 = a2[3], oe(this._iid, (function(n3) {
            if (i2) n3(i2, null);
            else {
              var s3 = O.get(r2._iid);
              s3.container.apiClient.updateCurrentUserInfo({ nickname: e3, profileImage: t2 }, (function(t3, i3) {
                var a3 = null;
                t3 || (r2.currentUser && (e3 && (r2.currentUser.nickname = e3), i3.profile_url && (r2.currentUser.plainProfileUrl = i3.profile_url, Object.defineProperty(r2.currentUser, "profileUrl", { value: r2.currentUser.requireAuth ? "".concat(r2.currentUser.plainProfileUrl, "?auth=").concat(s3.container.auth.eKey) : r2.currentUser.plainProfileUrl, configurable: true, writable: false }))), a3 = r2.currentUser), n3(t3, a3);
              }));
            }
          }), n2);
        } }, { key: "updateCurrentUserInfoWithPreferredLanguages", value: function(e3, t2) {
          var n2 = this, r2 = null, i2 = me.parse(arguments, [new me({ type: "array", constraint: function(e4) {
            return e4.every((function(e5) {
              return "string" == typeof e5;
            }));
          } }), new me({ type: "callback" })]), s2 = C(i2, 3);
          return r2 = s2[0], e3 = s2[1], t2 = s2[2], oe(this._iid, (function(t3) {
            r2 ? t3(r2, null) : O.get(n2._iid).container.apiClient.updateCurrentUserInfo({ preferredLanguages: e3 }, (function(r3, i3) {
              var s3 = null;
              r3 || (n2.currentUser && e3 && (n2.currentUser._preferredLanguages = e3), s3 = n2.currentUser), t3(r3, s3);
            }));
          }), t2);
        } }, { key: "registerGCMPushTokenForCurrentUser", value: function(e3, t2) {
          var n2 = this, r2 = null, i2 = me.parse(arguments, [new me({ type: "string", constraint: function(e4) {
            return e4.length > 0;
          } }), new me({ type: "callback" })]), s2 = C(i2, 3);
          return r2 = s2[0], e3 = s2[1], t2 = s2[2], oe(this._iid, (function(t3) {
            r2 ? t3(r2, n2.pushTokenRegistrationState.ERROR) : n2.currentUser ? O.get(n2._iid).container.apiClient.registerGCMPushToken({ token: e3 }, (function(e4, r3) {
              var i3 = n2.pushTokenRegistrationState.ERROR;
              e4 || (n2.GCMPushToken = "", i3 = n2.pushTokenRegistrationState.SUCCESS), t3(e4, i3);
            })) : (n2.GCMPushToken = e3, t3(null, n2.pushTokenRegistrationState.PENDING));
          }), t2);
        } }, { key: "unregisterGCMPushTokenForCurrentUser", value: function(e3, t2) {
          var n2 = this, r2 = null, i2 = me.parse(arguments, [new me({ type: "string", constraint: function(e4) {
            return e4.length > 0;
          } }), new me({ type: "callback" })]), s2 = C(i2, 3);
          return r2 = s2[0], e3 = s2[1], t2 = s2[2], oe(this._iid, (function(t3) {
            r2 ? t3(r2, null) : n2.currentUser ? O.get(n2._iid).container.apiClient.unregisterGCMPushToken({ token: e3 }, (function(e4, n3) {
              t3(e4, null);
            })) : (n2.GCMPushToken = e3, t3(null, n2.pushTokenRegistrationState.PENDING));
          }), t2);
        } }, { key: "unregisterGCMPushTokenAllForCurrentUser", value: function(e3) {
          var t2 = this;
          return oe(this._iid, (function(e4) {
            O.get(t2._iid).container.apiClient.unregisterAllGCMPushTokens({}, (function(t3, n2) {
              e4(t3, null);
            }));
          }), e3);
        } }, { key: "registerAPNSPushTokenForCurrentUser", value: function(e3, t2) {
          var n2 = this, r2 = null, i2 = me.parse(arguments, [new me({ type: "string", constraint: function(e4) {
            return e4.length > 0;
          } }), new me({ type: "callback" })]), s2 = C(i2, 3);
          return r2 = s2[0], e3 = s2[1], t2 = s2[2], oe(this._iid, (function(t3) {
            r2 ? t3(r2, n2.pushTokenRegistrationState.ERROR) : n2.currentUser ? O.get(n2._iid).container.apiClient.registerAPNSPushToken({ token: e3 }, (function(e4, r3) {
              var i3 = n2.pushTokenRegistrationState.ERROR;
              e4 || (n2.APNSPushToken = "", i3 = n2.pushTokenRegistrationState.SUCCESS), t3(e4, i3);
            })) : (n2.APNSPushToken = e3, t3(null, n2.pushTokenRegistrationState.PENDING));
          }), t2);
        } }, { key: "unregisterAPNSPushTokenForCurrentUser", value: function(e3, t2) {
          var n2 = this, r2 = null, i2 = me.parse(arguments, [new me({ type: "string", constraint: function(e4) {
            return e4.length > 0;
          } }), new me({ type: "callback" })]), s2 = C(i2, 3);
          return r2 = s2[0], e3 = s2[1], t2 = s2[2], oe(this._iid, (function(t3) {
            r2 ? t3(r2, null) : n2.currentUser ? O.get(n2._iid).container.apiClient.unregisterAPNSPushToken({ token: e3 }, (function(e4, n3) {
              t3(e4, null);
            })) : (n2.APNSPushToken = e3, t3(null, n2.pushTokenRegistrationState.PENDING));
          }), t2);
        } }, { key: "unregisterAPNSPushTokenAllForCurrentUser", value: function(e3) {
          var t2 = this;
          return oe(this._iid, (function(e4) {
            O.get(t2._iid).container.apiClient.unregisterAllAPNSPushTokens({}, (function(t3, n2) {
              e4(t3, null);
            }));
          }), e3);
        } }, { key: "unregisterPushTokenAllForCurrentUser", value: function(e3) {
          var t2 = this;
          return oe(this._iid, (function(e4) {
            O.get(t2._iid).container.apiClient.unregisterAllPushTokens({}, (function(t3, n2) {
              e4(t3, null);
            }));
          }), e3);
        } }, { key: "getMyGroupChannelChangeLogsByToken", value: function(e3, t2, n2, r2) {
          var i2 = this, s2 = null, a2 = me.parse(arguments, [new me({ type: "string", nullable: true }), new me({ type: "array", optional: true, nullable: true, defaultValue: null }), new me({ type: "boolean", nullable: true, optional: true, defaultValue: null }), new me({ type: "callback" })]), o2 = C(a2, 5);
          s2 = o2[0], e3 = o2[1], t2 = o2[2], n2 = o2[3], r2 = o2[4];
          var u2 = x.get(this._iid), c2 = u2.GroupChannelChangeLogsParams, d2 = null;
          if (s2) {
            var h2 = me.parse(arguments, [new me({ type: "string", nullable: true }), new me({ type: c2, constraint: function(e4) {
              return e4._validate();
            } }), new me({ type: "callback" })]), p2 = C(h2, 4);
            s2 = p2[0], e3 = p2[1], d2 = p2[2], r2 = p2[3];
          } else (d2 = new c2()).customTypes = t2, d2.includeEmpty = n2, d2.includeFrozen = true;
          return oe(this._iid, (function(t3) {
            s2 ? t3(s2, null) : O.get(i2._iid).container.apiClient.getMyGroupChannelChangeLogs(l({ ts: null, token: e3 }, d2)).then((function(e4) {
              var n3 = x.get(i2._iid).GroupChannel, r3 = e4.updated.map((function(e5) {
                return new n3(e5);
              })), s3 = e4.deleted, a3 = e4.has_more, o3 = e4.next;
              t3(null, { updatedChannels: r3, deletedChannelUrls: s3, hasMore: a3, token: o3 });
            })).catch((function(e4) {
              t3(e4, null);
            }));
          }), r2);
        } }, { key: "getMyGroupChannelChangeLogsByTimestamp", value: function(e3, t2, n2, r2) {
          var i2 = this, s2 = null, a2 = me.parse(arguments, [new me({ type: "number", constraint: function(e4) {
            return e4 >= 0;
          } }), new me({ type: "array", optional: true, nullable: true, defaultValue: null }), new me({ type: "boolean", nullable: true, optional: true, defaultValue: null }), new me({ type: "callback" })]), o2 = C(a2, 5);
          s2 = o2[0], e3 = o2[1], t2 = o2[2], n2 = o2[3], r2 = o2[4];
          var u2 = x.get(this._iid), c2 = u2.GroupChannelChangeLogsParams, d2 = null;
          if (s2) {
            var h2 = me.parse(arguments, [new me({ type: "number", constraint: function(e4) {
              return e4 >= 0;
            } }), new me({ type: c2, constraint: function(e4) {
              return e4._validate();
            } }), new me({ type: "callback" })]), p2 = C(h2, 4);
            s2 = p2[0], e3 = p2[1], d2 = p2[2], r2 = p2[3];
          } else (d2 = new c2()).customTypes = t2, d2.includeEmpty = n2, d2.includeFrozen = true;
          return oe(this._iid, (function(t3) {
            s2 ? t3(s2, null) : O.get(i2._iid).container.apiClient.getMyGroupChannelChangeLogs(l({ ts: e3, token: null }, d2)).then((function(e4) {
              var n3 = x.get(i2._iid).GroupChannel, r3 = e4.updated.map((function(e5) {
                return new n3(e5);
              })), s3 = e4.deleted, a3 = e4.has_more, o3 = e4.next;
              t3(null, { updatedChannels: r3, deletedChannelUrls: s3, hasMore: a3, token: o3 });
            })).catch((function(e4) {
              t3(e4, null);
            }));
          }), r2);
        } }, { key: "getChannelInvitationPreference", value: function(e3) {
          var t2 = this;
          return oe(this._iid, (function(e4) {
            O.get(t2._iid).container.apiClient.getChannelInvitationPreference({}, (function(t3, n2) {
              var r2 = null;
              t3 || (r2 = { autoAccept: n2.auto_accept }), e4(t3, r2);
            }));
          }), e3);
        } }, { key: "setChannelInvitationPreference", value: function(e3, t2) {
          var n2 = this, r2 = null, i2 = me.parse(arguments, [new me({ type: "boolean" }), new me({ type: "callback" })]), s2 = C(i2, 3);
          return r2 = s2[0], e3 = s2[1], t2 = s2[2], oe(this._iid, (function(t3) {
            r2 ? t3(r2, null) : O.get(n2._iid).container.apiClient.setChannelInvitationPreference({ isAutoAccept: e3 }, (function(e4, n3) {
              var r3 = null;
              e4 || (r3 = { autoAccept: n3.auto_accept }), t3(e4, r3);
            }));
          }), t2);
        } }, { key: "getDoNotDisturb", value: function(e3) {
          var t2 = this;
          return oe(this._iid, (function(e4) {
            O.get(t2._iid).container.apiClient.getDoNotDisturb({}, (function(t3, n2) {
              var r2 = null;
              t3 || (r2 = { doNotDisturbOn: n2.do_not_disturb, startHour: n2.start_hour, startMin: n2.start_min, endHour: n2.end_hour, endMin: n2.end_min, timezone: n2.timezone }), e4(t3, r2);
            }));
          }), e3);
        } }, { key: "setDoNotDisturb", value: function(e3, t2, n2, r2, i2, s2, a2) {
          var o2 = this, l2 = null, u2 = me.parse(arguments, [new me({ type: "boolean" }), new me({ type: "number", constraint: function(e4) {
            return 0 <= e4 && e4 <= 23;
          } }), new me({ type: "number", constraint: function(e4) {
            return 0 <= e4 && e4 <= 59;
          } }), new me({ type: "number", constraint: function(e4) {
            return 0 <= e4 && e4 <= 23;
          } }), new me({ type: "number", constraint: function(e4) {
            return 0 <= e4 && e4 <= 59;
          } }), new me({ type: "string" }), new me({ type: "callback" })]), c2 = C(u2, 8);
          return l2 = c2[0], e3 = c2[1], t2 = c2[2], n2 = c2[3], r2 = c2[4], i2 = c2[5], s2 = c2[6], a2 = c2[7], oe(this._iid, (function(a3) {
            l2 ? a3(l2, null) : O.get(o2._iid).container.apiClient.setDoNotDisturb({ doNotDisturbOn: e3, startHour: t2, startMin: n2, endHour: r2, endMin: i2, timezone: s2 }, (function(e4, t3) {
              var n3 = null;
              e4 || (n3 = { doNotDisturbOn: t3.do_not_disturb, startHour: t3.start_hour, startMin: t3.start_min, endHour: t3.end_hour, endMin: t3.end_min, timezone: t3.timezone }), a3(e4, n3);
            }));
          }), a2);
        } }, { key: "getSnoozePeriod", value: function(e3) {
          var t2 = this;
          return oe(this._iid, (function(e4) {
            O.get(t2._iid).container.apiClient.getSnoozePeriod({}, (function(t3, n2) {
              var r2 = null;
              t3 || (r2 = { isSnoozeOn: n2.snooze_enabled, startTs: n2.snooze_start_ts, endTs: n2.snooze_end_ts }), e4(t3, r2);
            }));
          }), e3);
        } }, { key: "setSnoozePeriod", value: function(e3, t2, n2, r2) {
          var i2 = this, s2 = null, a2 = me.parse(arguments, [new me({ type: "boolean" }), new me({ type: "number", constraint: function(e4) {
            return e4 > 0;
          } }), new me({ type: "number", constraint: function(e4) {
            return e4 > 0;
          } }), new me({ type: "callback" })]), o2 = C(a2, 5);
          return s2 = o2[0], e3 = o2[1], t2 = o2[2], n2 = o2[3], r2 = o2[4], oe(this._iid, (function(r3) {
            s2 ? r3(s2, null) : O.get(i2._iid).container.apiClient.setSnoozePeriod({ snoozeOn: e3, startTs: t2, endTs: n2 }, (function(e4, t3) {
              var n3 = null;
              e4 || (n3 = { isSnoozeOn: t3.snooze_enabled, startTs: t3.snooze_start_ts, endTs: t3.snooze_end_ts }), r3(e4, n3);
            }));
          }), r2);
        } }, { key: "blockUser", value: function(e3, t2) {
          var n2 = null, r2 = me.parse(arguments, [new me({ type: "object", constraint: function(e4) {
            return e4 && e4.hasOwnProperty("userId");
          } }), new me({ type: "callback" })]), i2 = C(r2, 3);
          return n2 = i2[0], e3 = i2[1], t2 = i2[2], n2 ? oe(this._iid, (function(e4) {
            e4(n2, null);
          }), t2) : this.blockUserWithUserId(e3.userId, t2);
        } }, { key: "blockUserWithUserId", value: function(e3, t2) {
          var n2 = this, r2 = null, i2 = me.parse(arguments, [new me({ type: "string", constraint: function(e4) {
            return e4 && (!n2.currentUser || e4 !== n2.currentUser.userId);
          } }), new me({ type: "callback" })]), s2 = C(i2, 3);
          return r2 = s2[0], e3 = s2[1], t2 = s2[2], oe(this._iid, (function(t3) {
            r2 ? t3(r2, null) : O.get(n2._iid).container.apiClient.blockUser({ blockedUserId: e3 }, (function(e4, n3) {
              var r3 = null;
              e4 || (r3 = new ft(n3)), t3(e4, r3);
            }));
          }), t2);
        } }, { key: "unblockUser", value: function(e3, t2) {
          var n2 = null, r2 = me.parse(arguments, [new me({ type: "object", constraint: function(e4) {
            return e4 && e4.hasOwnProperty("userId");
          } }), new me({ type: "callback" })]), i2 = C(r2, 3);
          return n2 = i2[0], e3 = i2[1], t2 = i2[2], n2 ? oe(this._iid, (function(e4) {
            e4(n2, null);
          }), t2) : this.unblockUserWithUserId(e3.userId, t2);
        } }, { key: "unblockUserWithUserId", value: function(e3, t2) {
          var n2 = this, r2 = null, i2 = me.parse(arguments, [new me({ type: "string", constraint: function(e4) {
            return e4 && (!n2.currentUser || e4 !== n2.currentUser.userId);
          } }), new me({ type: "callback" })]), s2 = C(i2, 3);
          return r2 = s2[0], e3 = s2[1], t2 = s2[2], oe(this._iid, (function(t3) {
            r2 ? t3(r2, null) : O.get(n2._iid).container.apiClient.unblockUser({ unblockedUserId: e3 }, (function(e4, n3) {
              t3(e4, null);
            }));
          }), t2);
        } }, { key: "getPushTriggerOption", value: function(e3) {
          var t2 = this;
          return oe(this._iid, (function(e4) {
            O.get(t2._iid).container.apiClient.getPushTriggerOption({}, (function(t3, n2) {
              e4(t3, n2 ? n2.push_trigger_option : null);
            }));
          }), e3);
        } }, { key: "setPushTriggerOption", value: function(e3, t2) {
          var n2 = this;
          return oe(this._iid, (function(t3) {
            Object.keys(n2.PushTriggerOption).map((function(e4) {
              return n2.PushTriggerOption[e4];
            })).indexOf(e3) > -1 ? O.get(n2._iid).container.apiClient.setPushTriggerOption({ pushTriggerOption: e3 }, (function(e4, n3) {
              t3(e4, n3 ? n3.push_trigger_option : null);
            })) : t3(me.error, null);
          }), t2);
        } }, { key: "getGroupChannelCount", value: function(e3, t2) {
          var n2 = this, r2 = x.get(this._iid), i2 = r2.GroupChannel, s2 = null, a2 = me.parse(arguments, [new me({ type: i2.MemberStateFilter, optional: true, defaultValue: i2.MemberStateFilter.ALL }), new me({ type: "callback" })]), o2 = C(a2, 3);
          return s2 = o2[0], e3 = o2[1], t2 = o2[2], oe(this._iid, (function(t3) {
            s2 ? t3(s2, null) : O.get(n2._iid).container.apiClient.getGroupChannelCount({ memberStateFilter: e3 }, (function(e4, n3) {
              var r3 = null;
              e4 || (r3 = parseInt(n3.group_channel_count)), t3(e4, r3);
            }));
          }), t2);
        } }, { key: "getTotalUnreadChannelCount", value: function(e3, t2) {
          var n2 = this, r2 = x.get(this._iid), i2 = r2.GroupChannel, s2 = r2.GroupChannelTotalUnreadChannelCountParams, a2 = null, o2 = me.parse(arguments, [new me({ type: "object", optional: true, defaultValue: null, constraint: function(e4) {
            return e4 instanceof s2;
          } }), new me({ type: "callback" })]), l2 = C(o2, 3);
          return a2 = l2[0], e3 = l2[1], t2 = l2[2], oe(this._iid, (function(t3) {
            if (a2) t3(a2, null);
            else {
              var r3 = null, s3 = i2.SuperChannelFilter.ALL;
              e3 && (r3 = e3.channelCustomTypesFilter, s3 = e3.superChannelFilter), O.get(n2._iid).container.apiClient.getTotalUnreadChannelCount({ customTypesFilter: r3, superChannelFilter: s3 }, (function(e4, n3) {
                var r4 = null;
                e4 || (r4 = parseInt(n3.unread_count)), t3(e4, r4);
              }));
            }
          }), t2);
        } }, { key: "getTotalUnreadMessageCount", value: function(e3, t2) {
          var n2 = this, r2 = x.get(this._iid), i2 = r2.GroupChannel, s2 = r2.GroupChannelTotalUnreadMessageCountParams, a2 = null, o2 = me.parse(arguments, [new me({ type: "object", optional: true, defaultValue: null, constraint: function(e4) {
            return Array.isArray(e4) && e4.every((function(e5) {
              return "string" == typeof e5;
            })) || e4 instanceof s2;
          } }), new me({ type: "callback" })]), l2 = C(o2, 3);
          return a2 = l2[0], e3 = l2[1], t2 = l2[2], oe(this._iid, (function(t3) {
            if (a2) t3(a2, null);
            else {
              var r3 = i2.SuperChannelFilter.ALL;
              if (e3 instanceof s2) {
                var o3 = e3;
                e3 = o3.channelCustomTypesFilter, r3 = o3.superChannelFilter;
              }
              O.get(n2._iid).container.apiClient.getTotalUnreadMessageCount({ customTypesFilter: e3, superChannelFilter: r3 }, (function(e4, n3) {
                var r4 = null;
                e4 || (r4 = parseInt(n3.unread_count)), t3(e4, r4);
              }));
            }
          }), t2);
        } }, { key: "getUnreadItemCount", value: function(e3, t2) {
          var n2 = this, r2 = null, i2 = me.parse(arguments, [new me({ type: "array", constraint: function(e4) {
            return e4.length > 0 && e4.every((function(e5) {
              return Object.keys(ar.UnreadItemKey).map((function(e6) {
                return ar.UnreadItemKey[e6];
              })).indexOf(e5) > -1;
            }));
          } }), new me({ type: "callback" })]), s2 = C(i2, 3);
          return r2 = s2[0], e3 = s2[1], t2 = s2[2], oe(this._iid, (function(t3) {
            if (r2) t3(r2, null);
            else {
              var i3 = e3.filter((function(t4, n3) {
                return e3.indexOf(t4) === n3;
              }));
              O.get(n2._iid).container.apiClient.getUnreadItemCount({ keys: i3 }, (function(e4, n3) {
                t3(e4, n3);
              }));
            }
          }), t2);
        } }, { key: "getSubscribedTotalUnreadMessageCount", value: function() {
          var e3 = O.get(this._iid).container.subscribedUnreadMessageCount;
          return e3.all >= 0 ? e3.all : 0;
        } }, { key: "getSubscribedCustomTypeTotalUnreadMessageCount", value: function() {
          var e3 = O.get(this._iid).container.subscribedUnreadMessageCount;
          if (Object.keys(e3.custom_types).length > 0) {
            var t2 = 0;
            return Object.keys(e3.custom_types).forEach((function(n2) {
              t2 += e3.custom_types[n2];
            })), t2;
          }
          return 0;
        } }, { key: "getSubscribedCustomTypeUnreadMessageCount", value: function(e3) {
          if (e3 && "string" == typeof e3) {
            var t2 = O.get(this._iid).container.subscribedUnreadMessageCount;
            return t2.custom_types.hasOwnProperty(e3) ? t2.custom_types[e3] : 0;
          }
          return 0;
        } }, { key: "getMyPushTokensByToken", value: function(e3, t2, n2) {
          var r2 = this, i2 = null, s2 = me.parse(arguments, [new me({ type: "string" }), new me({ type: "string", constraint: function(e4) {
            return ["gcm", "apns", "apns_voip"].indexOf(e4) > -1;
          } }), new me({ type: "callback" })]), a2 = C(s2, 4);
          return i2 = a2[0], e3 = a2[1], t2 = a2[2], n2 = a2[3], oe(this._iid, (function(n3) {
            i2 ? n3(i2, null) : O.get(r2._iid).container.apiClient.getPushTokens({ ts: null, token: e3, type: t2 }, (function(e4, t3) {
              if (e4) n3(e4, null);
              else {
                var r3 = t3.type;
                n3(null, { deviceTokens: t3.device_tokens, type: r3 ? r3.toLowerCase() : "unknown", hasMore: t3.has_more, token: t3.token });
              }
            }));
          }), n2);
        } }, { key: "getPushTemplate", value: function(e3) {
          var t2 = this;
          return oe(this._iid, (function(e4) {
            O.get(t2._iid).container.apiClient.getPushTemplate({}, (function(t3, n2) {
              var r2 = null;
              t3 || (r2 = n2.name.toString()), e4(t3, r2);
            }));
          }), e3);
        } }, { key: "setPushTemplate", value: function(e3, t2) {
          var n2 = this;
          return oe(this._iid, (function(t3) {
            [n2.PUSH_TEMPLATE_DEFAULT, n2.PUSH_TEMPLATE_ALTERNATIVE].indexOf(e3) > -1 ? O.get(n2._iid).container.apiClient.setPushTemplate({ templateName: e3 }, (function(e4, n3) {
              var r2 = null;
              e4 || (r2 = n3.name.toString()), t3(e4, r2);
            })) : t3(me.error, null);
          }), t2);
        } }, { key: "markAsReadAll", value: function(e3) {
          var t2 = this;
          return oe(this._iid, (function(e4) {
            var n2 = x.get(t2._iid).GroupChannel, r2 = (/* @__PURE__ */ new Date()).getTime();
            r2 - n2.markAsReadAllLastSentAt < 1e3 ? e4(new H("MarkAsRead rate limit exceeded.", H.MARK_AS_READ_RATE_LIMIT_EXCEEDED), null) : (n2.markAsReadAllLastSentAt = r2, O.get(t2._iid).container.apiClient.markAsReadAll({ channelUrls: null }, (function(i2, s2) {
              i2 || Object.keys(n2.cachedChannels).forEach((function(e5) {
                t2.currentUser && n2.cachedChannels[e5].updateReadReceipt(t2.currentUser.userId, r2), n2.cachedChannels[e5]._setGroupChannelUnreadCount(0, 0);
              })), e4(i2, null);
            })));
          }), e3);
        } }, { key: "markAsReadWithChannelUrls", value: function(e3, t2) {
          var n2 = this, r2 = null, i2 = me.parse(arguments, [new me({ type: "array", constraint: function(e4) {
            return e4.every((function(e5) {
              return "string" == typeof e5;
            }));
          } }), new me({ type: "callback" })]), s2 = C(i2, 3);
          return r2 = s2[0], e3 = s2[1], t2 = s2[2], oe(this._iid, (function(t3) {
            if (r2) t3(r2, null);
            else {
              var i3 = (/* @__PURE__ */ new Date()).getTime();
              O.get(n2._iid).container.apiClient.markAsReadAll({ channelUrls: e3 }, (function(r3, s3) {
                r3 || e3.forEach((function(e4) {
                  ar.cachedChannels[e4] && (n2.currentUser && ar.cachedChannels[e4].updateReadReceipt(n2.currentUser.userId, i3), ar.cachedChannels[e4]._setGroupChannelUnreadCount(0, 0));
                })), t3(r3, null);
              }));
            }
          }), t2);
        } }, { key: "markAsDelivered", value: function(e3) {
          "string" == typeof e3 && x.get(this._iid).GroupChannel.getChannel(e3, T.INTERNAL_CALL).then((function(e4) {
            return e4.markAsDelivered();
          })).catch((function(e4) {
            return J.debug(e4);
          }));
        } }, { key: "getFriendChangeLogsByToken", value: function(e3, t2) {
          var n2 = this, r2 = null, i2 = me.parse(arguments, [new me({ type: "string", optional: true, defaultValue: null }), new me({ type: "callback" })]), s2 = C(i2, 3);
          return r2 = s2[0], e3 = s2[1], t2 = s2[2], oe(this._iid, (function(t3) {
            r2 ? t3(r2, null) : O.get(n2._iid).container.apiClient.getFriendChangeLogsByToken({ token: e3 }, (function(e4, r3) {
              var i3 = null;
              if (!e4) {
                var s3 = x.get(n2._iid).User;
                i3 = { updatedUsers: r3.updated.map((function(e5) {
                  return new s3(e5);
                })), deletedUserIds: r3.deleted, hasMore: r3.has_more, token: r3.next };
              }
              t3(e4, i3);
            }));
          }), t2);
        } }, { key: "uploadFriendDiscoveries", value: function(e3, t2) {
          var n2 = this, r2 = null, i2 = me.parse(arguments, [new me({ type: "array", constraint: function(e4) {
            return e4.every((function(e5) {
              return e5.hasOwnProperty("friendDiscoveryKey");
            }));
          } }), new me({ type: "callback" })]), s2 = C(i2, 3);
          return r2 = s2[0], e3 = s2[1], t2 = s2[2], oe(this._iid, (function(t3) {
            r2 ? t3(r2, null) : O.get(n2._iid).container.apiClient.uploadFriendDiscoveries({ discoveries: e3 }, (function(e4, n3) {
              t3(e4, n3);
            }));
          }), t2);
        } }, { key: "deleteFriendDiscovery", value: function(e3, t2) {
          var n2 = null, r2 = me.parse(arguments, [new me({ type: "string" }), new me({ type: "callback" })]), i2 = C(r2, 3);
          return n2 = i2[0], e3 = i2[1], t2 = i2[2], n2 ? oe(this._iid, (function(e4) {
            e4(n2, null);
          }), t2) : this.deleteFriendDiscoveries([e3], t2);
        } }, { key: "deleteFriendDiscoveries", value: function(e3, t2) {
          var n2 = this, r2 = null, i2 = me.parse(arguments, [new me({ type: "array", constraint: function(e4) {
            return e4.every((function(e5) {
              return "string" == typeof e5;
            }));
          } }), new me({ type: "callback" })]), s2 = C(i2, 3);
          return r2 = s2[0], e3 = s2[1], t2 = s2[2], oe(this._iid, (function(t3) {
            r2 ? t3(r2, null) : O.get(n2._iid).container.apiClient.deleteFriendDiscoveries({ discoveryKeys: e3 }, (function(e4, n3) {
              t3(e4, n3);
            }));
          }), t2);
        } }, { key: "addFriends", value: function(e3, t2) {
          var n2 = this, r2 = null, i2 = me.parse(arguments, [new me({ type: "array", constraint: function(e4) {
            return e4.every((function(e5) {
              return "string" == typeof e5;
            }));
          } }), new me({ type: "callback" })]), s2 = C(i2, 3);
          return r2 = s2[0], e3 = s2[1], t2 = s2[2], oe(this._iid, (function(t3) {
            r2 ? t3(r2, null) : O.get(n2._iid).container.apiClient.addFriends({ userIds: e3 }, (function(e4, r3) {
              var i3 = null;
              if (!e4) {
                var s3 = x.get(n2._iid).User;
                i3 = r3.users.map((function(e5) {
                  return new s3(e5);
                }));
              }
              t3(e4, i3);
            }));
          }), t2);
        } }, { key: "deleteFriend", value: function(e3, t2) {
          var n2 = null, r2 = me.parse(arguments, [new me({ type: "string" }), new me({ type: "callback" })]), i2 = C(r2, 3);
          return n2 = i2[0], e3 = i2[1], t2 = i2[2], n2 ? oe(this._iid, (function(e4) {
            e4(n2, null);
          }), t2) : this.deleteFriends([e3], t2);
        } }, { key: "deleteFriends", value: function(e3, t2) {
          var n2 = this, r2 = null, i2 = me.parse(arguments, [new me({ type: "array", constraint: function(e4) {
            return e4.every((function(e5) {
              return "string" == typeof e5;
            }));
          } }), new me({ type: "callback" })]), s2 = C(i2, 3);
          return r2 = s2[0], e3 = s2[1], t2 = s2[2], oe(this._iid, (function(t3) {
            r2 ? t3(r2, null) : O.get(n2._iid).container.apiClient.deleteFriends({ userIds: e3 }, (function(e4, n3) {
              t3(e4, n3);
            }));
          }), t2);
        } }, { key: "getAllEmoji", value: function(e3) {
          var t2 = this, n2 = null, r2 = me.parse(arguments, [new me({ type: "callback" })]), i2 = C(r2, 2);
          return n2 = i2[0], e3 = i2[1], oe(this._iid, (function(e4) {
            n2 ? e4(n2, null) : O.get(t2._iid).container.apiClient.getAllEmoji((function(n3, r3) {
              if (n3) e4(n3, null);
              else {
                var i3 = new (0, x.get(t2._iid).EmojiContainer)(r3);
                e4(null, i3);
              }
            }));
          }), e3);
        } }, { key: "getEmojiCategory", value: function(e3, t2) {
          var n2 = this, r2 = null, i2 = me.parse(arguments, [new me({ type: "number", constraint: function(e4) {
            return e4 >= 0;
          } }), new me({ type: "callback" })]), s2 = C(i2, 3);
          return r2 = s2[0], e3 = s2[1], t2 = s2[2], oe(this._iid, (function(t3) {
            r2 ? t3(r2, null) : O.get(n2._iid).container.apiClient.getEmojiCategory({ categoryId: e3 }, (function(e4, r3) {
              if (e4) t3(e4, null);
              else {
                var i3 = new (0, x.get(n2._iid).EmojiCategory)(r3);
                t3(null, i3);
              }
            }));
          }), t2);
        } }, { key: "getEmoji", value: function(e3, t2) {
          var n2 = this, r2 = null, i2 = me.parse(arguments, [new me({ type: "string" }), new me({ type: "callback" })]), s2 = C(i2, 3);
          return r2 = s2[0], e3 = s2[1], t2 = s2[2], oe(this._iid, (function(t3) {
            r2 ? t3(r2, null) : O.get(n2._iid).container.apiClient.getEmoji({ emojiKey: e3 }, (function(e4, r3) {
              if (e4) t3(e4, null);
              else {
                var i3 = new (0, x.get(n2._iid).Emoji)(r3);
                t3(null, i3);
              }
            }));
          }), t2);
        } }, { key: "getAllowFriendDiscovery", value: function(e3) {
          var t2 = this, n2 = null, r2 = me.parse(arguments, [new me({ type: "callback" })]), i2 = C(r2, 2);
          return n2 = i2[0], e3 = i2[1], oe(this._iid, (function(e4) {
            n2 ? e4(n2, null) : O.get(t2._iid).container.apiClient.getAllowFriendDiscovery((function(t3, n3) {
              var r3 = n3.allow_friend_discovery;
              t3 ? e4(t3, null) : e4(null, r3);
            }));
          }), e3);
        } }, { key: "setAllowFriendDiscovery", value: function(e3, t2) {
          var n2 = this, r2 = null, i2 = me.parse(arguments, [new me({ type: "boolean" }), new me({ type: "callback" })]), s2 = C(i2, 3);
          return r2 = s2[0], e3 = s2[1], t2 = s2[2], oe(this._iid, (function(t3) {
            r2 ? t3(r2, null) : O.get(n2._iid).container.apiClient.setAllowFriendDiscovery({ allowFriendDiscovery: e3 }, (function(n3, r3) {
              n3 ? t3(n3, null) : t3(null, e3);
            }));
          }), t2);
        } }, { key: "clearCachedMessages", value: function(e3) {
          var t2 = this, n2 = ot.of(this._iid);
          if (n2) {
            var r2 = O.get(this._iid).container.store;
            return Promise.all(e3.map((function(e4) {
              return new Promise((function(i2, s2) {
                n2.clearByChannelUrl(e4).then((function() {
                  var n3 = yt(t2._currentUserId, e4);
                  return r2.remove(n3);
                })).then((function() {
                  var n3 = vt(t2._currentUserId, e4);
                  return r2.remove(n3);
                })).then((function() {
                  i2();
                })).catch((function(e5) {
                  s2(e5);
                }));
              }));
            })));
          }
          return Promise.resolve([]);
        } }, { key: "_getCurrentUserDataKey", value: function() {
          return "sendbird:".concat(this._currentUserId, "@currentUserData");
        } }, { key: "_populateVaultFromCurrentUserData", value: function(e3) {
          var t2 = O.get(this._iid), n2 = t2.container.auth, r2 = x.get(this._iid).User, i2 = e3.currentUser, s2 = e3.maxUnreadCountOfSuperGroupChannel, a2 = e3.profileImageEncryption, o2 = e3.sessionKey, l2 = e3.eKey, u2 = e3.appInfo, c2 = e3.connectedAt, d2 = e3.firstConnectedAt, h2 = e3.concurrentCallLimit, p2 = e3.backOffDelay;
          i2 && (this.currentUser = r2.buildFromSerializedData(i2)), s2 && t2.set("maxUnreadCountOfSuperGroupChannel", s2), a2 && t2.set("profileImageEncryption", a2), n2 ? (o2 && (n2.sessionKey = o2), l2 && (n2.ekey = l2)) : J.debug("Auth should have been created when populating current user data."), u2 && t2.set("appInfo", new Ie(u2)), c2 && t2.set("connectedAt", c2), d2 && t2.set("firstConnectedAt", d2), h2 && t2.set("concurrentCallLimit", h2), p2 && t2.set("backOffDelay", p2);
        } }], [{ key: "version", get: function() {
          return T.SDK_VERSION;
        } }, { key: "LogLevel", get: function() {
          return J.supportedLogLevels;
        } }, { key: "getInstance", value: function(e3) {
          return e3 ? ki[e3] : Mi;
        } }, { key: "getLogLevel", value: function() {
          return J.logLevel;
        } }, { key: "setLogLevel", value: function(e3) {
          var t2 = Object.values(J.supportedLogLevels);
          if (t2.includes(e3)) J.logLevel = e3;
          else {
            J.logLevel = J.defaultLogLevel;
            var n2 = t2.map((function(e4) {
              return "'".concat(e4, "'");
            })).join(", ");
            J.warn("`logLevel` parameter should be one of", "".concat(n2, ","), "not `'".concat(e3, "'`."), "Set to default log level", "`".concat(J.defaultLogLevel, "`."));
          }
        } }, { key: "getAppVersion", value: function() {
          return Li;
        } }, { key: "setAppVersion", value: function(e3) {
          "string" == typeof e3 && $() && (Li = e3);
        } }]), e2;
      })();
      return wi;
    }));
  }
});
export default require_SendBird_min();
//# sourceMappingURL=sendbird.js.map
