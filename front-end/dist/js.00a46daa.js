// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"js/utils/Html/html.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _default() {
  return new Html();
}

var Html =
/*#__PURE__*/
function () {
  function Html() {
    _classCallCheck(this, Html);
  }

  _createClass(Html, [{
    key: "addAttribute",
    value: function addAttribute(attributeToSet, attributeValue) {
      this.element.setAttribute(attributeToSet, attributeValue);
      return this;
    }
  }, {
    key: "addChild",
    value: function addChild(childToAdd) {
      this.element.append(childToAdd.render());
      return this;
    }
  }, {
    key: "addClass",
    value: function addClass(classToAdd) {
      if (this.element.classList.contains(classToAdd)) {
        throw new Error("duplicate class error");
      }

      this.element.classList.add(classToAdd);
      return this;
    }
  }, {
    key: "click",
    value: function click(callback) {
      this.element.addEventListener("click", callback);
      return this;
    }
  }, {
    key: "create",
    value: function create(elementType) {
      if (!elementType) {
        throw new Error("Must pass a HTML element");
      }

      this.element = document.createElement(elementType);

      if (this.element instanceof HTMLUnknownElement) {
        throw new Error("Invalid html element");
      }

      return this;
    }
  }, {
    key: "html",
    value: function html(contentToAdd) {
      if (contentToAdd === undefined) {
        return this.element.innerHTML;
      }

      this.element.innerHTML = contentToAdd;
      return this;
    }
  }, {
    key: "render",
    value: function render() {
      return this.element;
    }
  }, {
    key: "replace",
    value: function replace(replaceChild) {
      this.element.innerHTML = "";
      this.addChild(replaceChild);
      return this;
    }
  }, {
    key: "select",
    value: function select(query) {
      var selection = document.querySelectorAll(query);

      if (selection.length === 1) {
        this.element = selection[0];
      } else {
        this.element = selection;
      }

      return this;
    }
  }, {
    key: "text",
    value: function text(textToAdd) {
      if (textToAdd === undefined) {
        return this.element.textContent;
      }

      this.element.textContent = textToAdd;
      return this;
    }
  }]);

  return Html;
}();
},{}],"js/utils/Api/Api.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _default() {
  return new Api();
}

var Api =
/*#__PURE__*/
function () {
  function Api() {
    _classCallCheck(this, Api);
  }

  _createClass(Api, [{
    key: "getRequest",
    value: function getRequest(location, callback) {
      fetch(location).then(function (response) {
        return response.json();
      }).then(callback).catch(function (err) {
        return console.log(err);
      });
    }
  }]);

  return Api;
}();
},{}],"js/utils/Components/Components.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _html = _interopRequireDefault(require("../Html/html"));

var _Api = _interopRequireDefault(require("../Api/Api"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// import pictureUrl from "../../../images/music.jpg";
var _default = function _default() {
  return new Components();
};

exports.default = _default;

var Components =
/*#__PURE__*/
function () {
  function Components() {
    _classCallCheck(this, Components);
  }

  _createClass(Components, [{
    key: "getAppContext",
    value: function getAppContext() {
      return (0, _html.default)().select("#app");
    }
  }, {
    key: "getWrapperDiv",
    value: function getWrapperDiv() {
      return (0, _html.default)().create("div").addClass("wrapper");
    }
  }, {
    key: "renderHeaderBlock",
    value: function renderHeaderBlock(requestData) {
      var headerBlock = (0, _html.default)().create('header').addClass('main-header');
      var titleBlock = (0, _html.default)().create('h1').addClass('main-header__title').text("Code 'N' Chill");
      var nav = this.renderNavBlock();
      headerBlock.addChild(titleBlock);
      headerBlock.addChild(nav);
      return headerBlock;
    }
  }, {
    key: "renderNavBlock",
    value: function renderNavBlock() {
      var _this = this;

      var navBlock = (0, _html.default)().create('nav').addClass('nav');
      var navList = (0, _html.default)().create('ul').addClass('nav__list');
      var navListItemOne = (0, _html.default)().create('li').addClass('nav__list-item').addChild((0, _html.default)().create('a').addAttribute('href', '#').text("Home").click(function (event) {
        event.preventDefault();

        _this.renderPageHome();
      }));
      var navListItemTwo = (0, _html.default)().create('li').addClass('nav__list-item').addChild((0, _html.default)().create('a').addAttribute('href', 'allActorsTemplate.html').text("Actors").click(function (event) {
        event.preventDefault();

        _this.renderPageActors();
      }));
      var navListItemThree = (0, _html.default)().create('li').addClass('nav__list-item').addChild((0, _html.default)().create('a').addAttribute('href', 'allSeriesTemplate.html').text("Series").click(function (event) {
        event.preventDefault();

        _this.renderPageSeries();
      }));
      var navListItemFour = (0, _html.default)().create('li').addClass('nav__list-item').addChild((0, _html.default)().create('a').addAttribute('href', 'allMoviesTemplate.html').text("Movies").click(function (event) {
        event.preventDefault();

        _this.renderPageMovies();
      }));
      navList.addChild(navListItemOne);
      navList.addChild(navListItemTwo);
      navList.addChild(navListItemThree);
      navList.addChild(navListItemFour);
      navBlock.addChild(navList);
      return navBlock;
    }
  }, {
    key: "renderFooter",
    value: function renderFooter() {
      var footer = (0, _html.default)().create('footer').addClass('footer');
      var footerText = (0, _html.default)().create('small').addClass('footer__text').html('&copy; 2019');
      footer.addChild(footerText);
      return footer;
    }
  }, {
    key: "generateSingleSeriesPage",
    value: function generateSingleSeriesPage(idNumber) {
      var entityType = 'series';
      this.generateSingleItemPage(entityType, idNumber);
    }
  }, {
    key: "generateSingleActorPage",
    value: function generateSingleActorPage(idNumber) {
      var entityType = 'actors';
      this.generateSingleItemPage(entityType, idNumber);
    }
  }, {
    key: "generateSingleItemPage",
    value: function generateSingleItemPage(entityType, idNumber) {
      var _this2 = this;

      var header = (0, _html.default)().create('h1').addClass('block__title');
      var image = (0, _html.default)().create('img').addClass('block__image');
      var infoP1 = (0, _html.default)().create('p').addClass('block__info');
      var infoP2 = (0, _html.default)().create('p').addClass('block__info');
      var blockList = (0, _html.default)().create('div').addClass('block-list');
      var api = (0, _Api.default)().getRequest("http://localhost:8080/api/".concat(entityType, "/").concat(idNumber), function (responseObject) {
        var title;

        if (responseObject.name) {
          title = responseObject.name;
        } else {
          title = responseObject.title;
        }

        var actorImageUrl = responseObject.imageUrl;
        var infoP1Text;

        if (responseObject.dateOfBirth) {
          infoP1Text = responseObject.dateOfBirth;
        }

        if (responseObject.recordLabel) {
          infoP1Text = responseObject.recordLabel;
        }

        var infoP2Text;

        if (responseObject.homeTown) {
          infoP2Text = responseObject.homeTown;
        }

        var itemList;

        if (responseObject.series) {
          itemList = responseObject.series;
        }

        if (responseObject.movies) {
          itemList = responseObject.movies;
        }

        header = header.text(title);
        image = image.addAttribute("src", actorImageUrl);
        infoP1 = infoP1.text(infoP1Text);
        infoP2 = infoP2.text(infoP2Text);
        itemList.forEach(function (item) {
          var id;
          id = item.id;
          var name;
          name = item.name;

          if (item.title) {
            name = item.title;
          }

          var imageUrl;
          imageUrl = item.imageUrl;

          if (!imageUrl) {
            imageUrl = pictureUrl;
          }

          var itemLink;
          itemLink = "#";

          if (item.link) {
            itemLink = item.link;
          }

          var article = (0, _html.default)().create("article").addClass("card");
          var itemAnchorLink = (0, _html.default)().create("a").addClass("card__anchor").addAttribute("href", itemLink).addAttribute("target", "_blank").click(function (event) {
            console.log("test");

            if (item.series) {
              event.preventDefault();

              _this2.generateSingleActorPage(id);
            }

            if (item.movies) {
              event.preventDefault();

              _this2.generateSingleSeriesPage(id);
            }
          });
          var img = (0, _html.default)().create("img").addClass("card__image").addAttribute("src", imageUrl).addAttribute("alt", "alt picture");
          var section = (0, _html.default)().create("section").addClass("card__item");
          var sectionHeader = (0, _html.default)().create("h2").addClass("card__item--text").text(name);
          section.addChild(sectionHeader);
          itemAnchorLink.addChild(img);
          itemAnchorLink.addChild(section);
          article.addChild(itemAnchorLink);
          blockList.addChild(article);
        });
      });
      var container = this.getWrapperDiv().select(".container");
      container.replace(header);
      container.addChild(image);
      container.addChild(infoP1);
      container.addChild(infoP2);
      container.addChild(blockList);
    }
  }, {
    key: "generateActorList",
    value: function generateActorList() {
      return this.generateContentBlockListFromApi("actors");
    }
  }, {
    key: "generateSeriesList",
    value: function generateSeriesList() {
      return this.generateContentBlockListFromApi("series");
    }
  }, {
    key: "generateMoviesList",
    value: function generateMoviesList() {
      return this.generateContentBlockListFromApi("movies");
    }
  }, {
    key: "renderPageActors",
    value: function renderPageActors() {
      this.replaceContainerContent("actors");
    }
  }, {
    key: "renderPageSeries",
    value: function renderPageSeries() {
      this.replaceContainerContent("series");
    }
  }, {
    key: "renderPageMovies",
    value: function renderPageMovies() {
      this.replaceContainerContent("movies");
    }
  }, {
    key: "renderPageHome",
    value: function renderPageHome() {
      this.replaceContainerContent();
    }
  }, {
    key: "replaceContainerContent",
    value: function replaceContainerContent(requestedContent) {
      var container = this.getWrapperDiv().select(".container");
      container.replace(this.generateContentHeader(requestedContent));
      container.addChild(this.generateContentBlockListFromApi(requestedContent));
    }
  }, {
    key: "generateContentHeader",
    value: function generateContentHeader(requestedContent) {
      var contentHeaderText;
      contentHeaderText = "";

      if (requestedContent) {
        contentHeaderText = requestedContent.charAt(0).toUpperCase() + requestedContent.slice(1);
      }

      return (0, _html.default)().create("h1").addClass("block__title").text(contentHeaderText);
    }
  }, {
    key: "renderWholePage",
    value: function renderWholePage(requestedContent) {
      var blockHeader = this.generateContentHeader(requestedContent);
      var blockList = this.generateContentBlockListFromApi(requestedContent);
      var app = this.getAppContext();
      var wrapperDiv = this.getWrapperDiv();
      var mainHeader = this.renderHeaderBlock();
      var mainFooter = this.renderFooter();
      var container = (0, _html.default)().create("div").addClass("container");
      var block = (0, _html.default)().create("section").addClass("block");
      container.addChild(blockHeader);
      container.addChild(blockList);
      wrapperDiv.addChild(mainHeader);
      wrapperDiv.addChild(container);
      wrapperDiv.addChild(mainFooter);
      app.addChild(wrapperDiv);
      return app;
    }
  }, {
    key: "generateContentBlockListFromApi",
    value: function generateContentBlockListFromApi(requestedContent) {
      var _this3 = this;

      var blockList = (0, _html.default)().create("div").addClass("block-list");

      if (!requestedContent) {
        return blockList;
      }

      var contentLink = "http://localhost:8080/api/".concat(requestedContent);
      (0, _Api.default)().getRequest(contentLink, function (responseCollection) {
        responseCollection.forEach(function (item) {
          var id;
          id = item.id;
          var name;
          name = item.name;

          if (item.title) {
            name = item.title;
          }

          var imageUrl;
          imageUrl = item.imageUrl;

          if (!imageUrl) {
            imageUrl = pictureUrl;
          }

          var itemLink;
          itemLink = "#";

          if (item.link) {
            itemLink = item.link;
          }

          var article = (0, _html.default)().create("article").addClass("card");
          var itemAnchorLink = (0, _html.default)().create("a").addClass("card__anchor").addAttribute("href", itemLink).addAttribute("target", "_blank").click(function (event) {
            if (item.series) {
              event.preventDefault();

              _this3.generateSingleActorPage(id);
            }

            if (item.movies) {
              event.preventDefault();

              _this3.generateSingleSeriesPage(id);
            }
          });
          var img = (0, _html.default)().create("img").addClass("card__image").addAttribute("src", imageUrl).addAttribute("alt", "alt picture");
          var section = (0, _html.default)().create("section").addClass("card__item");
          var sectionHeader = (0, _html.default)().create("h2").addClass("card__item--text").text(name);
          section.addChild(sectionHeader);
          itemAnchorLink.addChild(img);
          itemAnchorLink.addChild(section);
          article.addChild(itemAnchorLink);
          blockList.addChild(article);
        });
      });
      return blockList;
    }
  }]);

  return Components;
}();
},{"../Html/html":"js/utils/Html/html.js","../Api/Api":"js/utils/Api/Api.js"}],"js/main.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = main;

var _Components = _interopRequireDefault(require("./utils/Components/Components"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function main() {
  (0, _Components.default)().renderWholePage();
}
},{"./utils/Components/Components":"js/utils/Components/Components.js"}],"js/index.js":[function(require,module,exports) {
"use strict";

var _main = _interopRequireDefault(require("./main"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _main.default)();
},{"./main":"js/main.js"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "50008" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else {
        window.location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","js/index.js"], null)
//# sourceMappingURL=/js.00a46daa.js.map