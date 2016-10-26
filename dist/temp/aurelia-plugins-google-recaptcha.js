'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Recaptcha = exports.Config = undefined;

var _dec, _dec2, _dec3, _class, _desc, _value, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4;

exports.configure = configure;

var _aureliaDependencyInjection = require('aurelia-dependency-injection');

var _aureliaTemplating = require('aurelia-templating');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

function _initDefineProp(target, property, descriptor, context) {
  if (!descriptor) return;
  Object.defineProperty(target, property, {
    enumerable: descriptor.enumerable,
    configurable: descriptor.configurable,
    writable: descriptor.writable,
    value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
  });
}

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
  var desc = {};
  Object['ke' + 'ys'](descriptor).forEach(function (key) {
    desc[key] = descriptor[key];
  });
  desc.enumerable = !!desc.enumerable;
  desc.configurable = !!desc.configurable;

  if ('value' in desc || desc.initializer) {
    desc.writable = true;
  }

  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
    return decorator(target, property, desc) || desc;
  }, desc);

  if (context && desc.initializer !== void 0) {
    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
    desc.initializer = undefined;
  }

  if (desc.initializer === void 0) {
    Object['define' + 'Property'](target, property, desc);
    desc = null;
  }

  return desc;
}

function _initializerWarningHelper(descriptor, context) {
  throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
}

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Config = exports.Config = function () {
  function Config() {
    _classCallCheck(this, Config);

    this._config = { hl: 'en', siteKey: '' };
  }

  Config.prototype.get = function get(key) {
    return this._config[key];
  };

  Config.prototype.options = function options(obj) {
    Object.assign(this._config, obj);
  };

  Config.prototype.set = function set(key, value) {
    this._config[key] = value;
    return this._config[key];
  };

  return Config;
}();

var Recaptcha = exports.Recaptcha = (_dec = (0, _aureliaTemplating.customElement)('aup-google-recaptcha'), _dec2 = (0, _aureliaTemplating.noView)(), _dec3 = (0, _aureliaDependencyInjection.inject)(Element, Config), _dec(_class = _dec2(_class = _dec3(_class = (_class2 = function () {
  function Recaptcha(element, config) {
    _classCallCheck(this, Recaptcha);

    this._scriptPromise = null;

    _initDefineProp(this, 'callback', _descriptor, this);

    _initDefineProp(this, 'size', _descriptor2, this);

    _initDefineProp(this, 'theme', _descriptor3, this);

    _initDefineProp(this, 'type', _descriptor4, this);

    this._config = config;
    this._element = element;
    if (!this._config.get('siteKey')) return console.error('No sitekey has been specified.');
    this._loadApiScript();
    this._initialize();
  }

  Recaptcha.prototype._initialize = function () {
    var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return this._scriptPromise;

            case 2:
              window.grecaptcha.render(this._element, { callback: this.callback, sitekey: this._config.get('siteKey'), size: this.size, theme: this.theme, type: this.type });

            case 3:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function _initialize() {
      return _ref.apply(this, arguments);
    }

    return _initialize;
  }();

  Recaptcha.prototype._loadApiScript = function _loadApiScript() {
    if (this._scriptPromise) return;
    if (window.grecaptcha === undefined) {
      var script = document.createElement('script');
      script.async = true;
      script.defer = true;
      script.src = 'https://www.google.com/recaptcha/api.js?hl=' + this._config.get('hl') + '&onload=aureliaPluginsGoogleRecaptchaOnLoad&render=explicit';
      script.type = 'text/javascript';
      document.head.appendChild(script);
      this._scriptPromise = new Promise(function (resolve, reject) {
        window.aureliaPluginsGoogleRecaptchaOnLoad = function () {
          resolve();
        };
        script.onerror = function (error) {
          reject(error);
        };
      });
    } else if (window.grecaptcha) {
      this._scriptPromise = new Promise(function (resolve) {
        resolve();
      });
    }
  };

  return Recaptcha;
}(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'callback', [_aureliaTemplating.bindable], {
  enumerable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, 'size', [_aureliaTemplating.bindable], {
  enumerable: true,
  initializer: function initializer() {
    return 'normal';
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, 'theme', [_aureliaTemplating.bindable], {
  enumerable: true,
  initializer: function initializer() {
    return 'light';
  }
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, 'type', [_aureliaTemplating.bindable], {
  enumerable: true,
  initializer: function initializer() {
    return 'image';
  }
})), _class2)) || _class) || _class) || _class);
function configure(aurelia, configCallback) {
  var instance = aurelia.container.get(Config);
  if (configCallback !== undefined && typeof configCallback === 'function') configCallback(instance);
  aurelia.globalResources('./aurelia-plugins-google-recaptcha-element');
}