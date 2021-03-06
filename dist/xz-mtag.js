(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("Mtag", [], factory);
	else if(typeof exports === 'object')
		exports["Mtag"] = factory();
	else
		root["Mtag"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	__webpack_require__.p = "/dist/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["a"] = ({
  props: {
    tags: {
      type: Array,
      default: function () {
        return new Array();
      }
    },
    checked: {
      type: Array,
      default: function () {
        return new Array();
      }
    }
  },
  data() {
    return {
      tagList: [], //初始化列表
      checkedCopy: [], //checked保存
      choosed: [], //已选择列表
      returnTags: [], //返回出已经选择的标签
      customTag: '', //自定义添加
      hasRepeat: false,
      preBtn: null //按钮列表
    };
  },
  methods: {
    chooseTag(e) {
      e.target.classList.add('xz-choosed');
      let num = e.target.dataset.sortnum;
      let name = e.target.innerText;
      /**判重**/
      for (let i = 0; i < this.choosed.length; i++) {
        if (this.choosed[i].num == num) {
          //已存在
          return;
        }
      }
      this.choosed.push({
        num: e.target.dataset.sortnum,
        value: e.target.innerText
      });
      this.returnTags.push(name);
      this.$emit('selected', this.returnTags); //返回选中项
    },
    //自定义添加
    addTag() {
      let tag = {
        num: -1,
        value: ''
      };
      let isExist = false;

      let nValue = this.customTag; //保存新标签
      /**需要判断自定义列表中是否有自定义添加的标签**/
      for (let i = 0; i < this.tagList.length; i++) {
        //如果列表中有
        if (this.tagList[i].value == nValue) {
          let tagBtn = this.$refs.buttons.getElementsByClassName("xz-tag-prepare");
          tagBtn[this.tagList[i].num].classList.add('xz-choosed');
          tag.num = this.tagList[i].num;
          tag.value = nValue;
          isExist = true;
          break;
        }
      }
      /**还是要去重**/
      for (let i = 0; i < this.choosed.length; i++) {
        if (this.choosed[i].num == tag.num) {
          //已存在
          this.hasRepeat = true;
          isExist = false;
          return;
        }
      }
      if (isExist == false) {
        tag.num = this.choosed.length + new Date().valueOf();
        tag.value = nValue;
      }
      this.choosed.push(tag);
      this.returnTags.push(nValue);
      this.customTag = '';

      this.$emit('selected', this.returnTags); //返回选中项
    },
    //删除已选项
    delSelected(e, index) {
      let num = e.target.dataset.sortnum;
      let chooseBtn = this.$refs.buttons.getElementsByClassName('xz-tag-prepare');
      if (chooseBtn[num]) {
        chooseBtn[num].classList.remove('xz-choosed');
      }
      this.choosed.splice(index, 1);
      this.returnTags.splice(index, 1);
      this.$emit('selected', this.returnTags); //返回选中项

    }
  },
  computed: {
    returnChecked() {
      //返回选择设置项
      this.checkedCopy = this.choosed;
      return this.checked;
    }
  },
  watch: {
    'customTag': function () {
      //判断提示文字是否出现
      if (this.customTag == '') {
        this.hasRepeat = false;
      }
    },
    'tags': {
      handler: function () {
        //设置初始化标签项
        let _this = this;
        _this.tagList = [];
        _this.choosed = [];
        this.checkedCopy = [];
        if (this.tags.length > 0) {
          this.tags.forEach(function (v, index) {
            _this.tagList.push({
              num: index,
              value: v
            });
          });
        }
        this.$nextTick(() => {
          this.checkedCopy = this.returnChecked;
        });
      },
      immediate: true
    },
    'checkedCopy': {
      handler: function () {
        let _this = this;
        this.$nextTick(() => {
          _this.choosed = [];
          //需要筛选
          _this.checkedCopy.forEach((v, index) => {
            let isExist = false;

            _this.preBtn = _this.$refs.buttons.getElementsByClassName('xz-tag-prepare'); //预选标签
            _this.checkBtn = _this.$refs.buttons.getElementsByClassName('xz-choosed-tag'); //已选择标签
            for (let i = 0; i < _this.tagList.length; i++) {
              if (v == _this.tagList[i].value) {
                //判断预标签中是否存在
                _this.choosed.push({
                  num: _this.tagList[i].num,
                  value: v
                });
                _this.preBtn[_this.tagList[i].num].classList.add('xz-choosed');
                isExist = true;
                break;
              }
            }
            //处理pre列表中不存在的
            if (isExist == false) {
              _this.choosed.push({
                num: _this.choosed.length + new Date().valueOf(),
                value: v
              });
            }
            _this.returnTags.push(v); //需要判断过才添加
          });
        });
      },
      immediate: true
    }
  }
});

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__manipulation_tag_vue__ = __webpack_require__(2);

const comment = {
  install: function (Vue) {
    Vue.component('Mtag', __WEBPACK_IMPORTED_MODULE_0__manipulation_tag_vue__["a" /* default */]); //这里的名字就是项目中导出的名字
  }
};
// 这里的判断很重要
if (typeof window !== 'undefined' && window.Vue) {
  //vue挂载
  window.Vue.use(comment);
}
/* harmony default export */ __webpack_exports__["default"] = (comment);

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_manipulation_tag_vue__ = __webpack_require__(0);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_38a24c5e_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_manipulation_tag_vue__ = __webpack_require__(9);
function injectStyle (ssrContext) {
  __webpack_require__(3)
}
var normalizeComponent = __webpack_require__(8)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-38a24c5e"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_manipulation_tag_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_38a24c5e_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_manipulation_tag_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(4);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(6)("b89771d6", content, true, {});

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(5)(false);
// imports


// module
exports.push([module.i, ".xz-tag-prepare[data-v-38a24c5e]{border:1px solid #ddd;border-radius:4px;padding:10px 12px;color:#333;font-size:13px;margin:0 10px 10px 0;cursor:pointer;outline:none}.xz-choosed-tag[data-v-38a24c5e]{display:inline-block;padding:6px 12px;margin:0 10px 10px 0;color:#fff;background:#409eff;border-radius:4px;font-size:12px;line-height:20px}.xz-close[data-v-38a24c5e]{color:#fff;cursor:pointer;font-style:normal;font-size:16px;margin-left:5px;line-height:20px}.xz-close[data-v-38a24c5e]:after{content:\"x\"}.xz-choosed[data-v-38a24c5e]{background:#ebeef5!important}.xz-tag-input[data-v-38a24c5e]{font-size:14px;width:170px;padding:0 10px}.xz-tag-button[data-v-38a24c5e],.xz-tag-input[data-v-38a24c5e]{border:1px solid #ddd;border-radius:4px;height:38px;box-sizing:border-box;color:#333;outline:none}.xz-tag-button[data-v-38a24c5e]{padding:0 12px;font-size:13px;cursor:pointer}.xz-repeat-error[data-v-38a24c5e]{font-size:14px;margin-top:5px;color:#c82a2e}.fade-enter-active[data-v-38a24c5e],.fade-leave-active[data-v-38a24c5e]{transition:opacity .5s linear}.fade-enter-to[data-v-38a24c5e]{opacity:1}.fade-enter[data-v-38a24c5e],.fade-leave-to[data-v-38a24c5e]{opacity:0}", ""]);

// exports


/***/ }),
/* 5 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
  Modified by Evan You @yyx990803
*/

var hasDocument = typeof document !== 'undefined'

if (typeof DEBUG !== 'undefined' && DEBUG) {
  if (!hasDocument) {
    throw new Error(
    'vue-style-loader cannot be used in a non-browser environment. ' +
    "Use { target: 'node' } in your Webpack config to indicate a server-rendering environment."
  ) }
}

var listToStyles = __webpack_require__(7)

/*
type StyleObject = {
  id: number;
  parts: Array<StyleObjectPart>
}

type StyleObjectPart = {
  css: string;
  media: string;
  sourceMap: ?string
}
*/

var stylesInDom = {/*
  [id: number]: {
    id: number,
    refs: number,
    parts: Array<(obj?: StyleObjectPart) => void>
  }
*/}

var head = hasDocument && (document.head || document.getElementsByTagName('head')[0])
var singletonElement = null
var singletonCounter = 0
var isProduction = false
var noop = function () {}
var options = null
var ssrIdKey = 'data-vue-ssr-id'

// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
// tags it will allow on a page
var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\b/.test(navigator.userAgent.toLowerCase())

module.exports = function (parentId, list, _isProduction, _options) {
  isProduction = _isProduction

  options = _options || {}

  var styles = listToStyles(parentId, list)
  addStylesToDom(styles)

  return function update (newList) {
    var mayRemove = []
    for (var i = 0; i < styles.length; i++) {
      var item = styles[i]
      var domStyle = stylesInDom[item.id]
      domStyle.refs--
      mayRemove.push(domStyle)
    }
    if (newList) {
      styles = listToStyles(parentId, newList)
      addStylesToDom(styles)
    } else {
      styles = []
    }
    for (var i = 0; i < mayRemove.length; i++) {
      var domStyle = mayRemove[i]
      if (domStyle.refs === 0) {
        for (var j = 0; j < domStyle.parts.length; j++) {
          domStyle.parts[j]()
        }
        delete stylesInDom[domStyle.id]
      }
    }
  }
}

function addStylesToDom (styles /* Array<StyleObject> */) {
  for (var i = 0; i < styles.length; i++) {
    var item = styles[i]
    var domStyle = stylesInDom[item.id]
    if (domStyle) {
      domStyle.refs++
      for (var j = 0; j < domStyle.parts.length; j++) {
        domStyle.parts[j](item.parts[j])
      }
      for (; j < item.parts.length; j++) {
        domStyle.parts.push(addStyle(item.parts[j]))
      }
      if (domStyle.parts.length > item.parts.length) {
        domStyle.parts.length = item.parts.length
      }
    } else {
      var parts = []
      for (var j = 0; j < item.parts.length; j++) {
        parts.push(addStyle(item.parts[j]))
      }
      stylesInDom[item.id] = { id: item.id, refs: 1, parts: parts }
    }
  }
}

function createStyleElement () {
  var styleElement = document.createElement('style')
  styleElement.type = 'text/css'
  head.appendChild(styleElement)
  return styleElement
}

function addStyle (obj /* StyleObjectPart */) {
  var update, remove
  var styleElement = document.querySelector('style[' + ssrIdKey + '~="' + obj.id + '"]')

  if (styleElement) {
    if (isProduction) {
      // has SSR styles and in production mode.
      // simply do nothing.
      return noop
    } else {
      // has SSR styles but in dev mode.
      // for some reason Chrome can't handle source map in server-rendered
      // style tags - source maps in <style> only works if the style tag is
      // created and inserted dynamically. So we remove the server rendered
      // styles and inject new ones.
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  if (isOldIE) {
    // use singleton mode for IE9.
    var styleIndex = singletonCounter++
    styleElement = singletonElement || (singletonElement = createStyleElement())
    update = applyToSingletonTag.bind(null, styleElement, styleIndex, false)
    remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true)
  } else {
    // use multi-style-tag mode in all other cases
    styleElement = createStyleElement()
    update = applyToTag.bind(null, styleElement)
    remove = function () {
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  update(obj)

  return function updateStyle (newObj /* StyleObjectPart */) {
    if (newObj) {
      if (newObj.css === obj.css &&
          newObj.media === obj.media &&
          newObj.sourceMap === obj.sourceMap) {
        return
      }
      update(obj = newObj)
    } else {
      remove()
    }
  }
}

var replaceText = (function () {
  var textStore = []

  return function (index, replacement) {
    textStore[index] = replacement
    return textStore.filter(Boolean).join('\n')
  }
})()

function applyToSingletonTag (styleElement, index, remove, obj) {
  var css = remove ? '' : obj.css

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = replaceText(index, css)
  } else {
    var cssNode = document.createTextNode(css)
    var childNodes = styleElement.childNodes
    if (childNodes[index]) styleElement.removeChild(childNodes[index])
    if (childNodes.length) {
      styleElement.insertBefore(cssNode, childNodes[index])
    } else {
      styleElement.appendChild(cssNode)
    }
  }
}

function applyToTag (styleElement, obj) {
  var css = obj.css
  var media = obj.media
  var sourceMap = obj.sourceMap

  if (media) {
    styleElement.setAttribute('media', media)
  }
  if (options.ssrId) {
    styleElement.setAttribute(ssrIdKey, obj.id)
  }

  if (sourceMap) {
    // https://developer.chrome.com/devtools/docs/javascript-debugging
    // this makes source maps inside style tags work properly in Chrome
    css += '\n/*# sourceURL=' + sourceMap.sources[0] + ' */'
    // http://stackoverflow.com/a/26603875
    css += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + ' */'
  }

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild)
    }
    styleElement.appendChild(document.createTextNode(css))
  }
}


/***/ }),
/* 7 */
/***/ (function(module, exports) {

/**
 * Translates the list format produced by css-loader into something
 * easier to manipulate.
 */
module.exports = function listToStyles (parentId, list) {
  var styles = []
  var newStyles = {}
  for (var i = 0; i < list.length; i++) {
    var item = list[i]
    var id = item[0]
    var css = item[1]
    var media = item[2]
    var sourceMap = item[3]
    var part = {
      id: parentId + ':' + i,
      css: css,
      media: media,
      sourceMap: sourceMap
    }
    if (!newStyles[id]) {
      styles.push(newStyles[id] = { id: id, parts: [part] })
    } else {
      newStyles[id].parts.push(part)
    }
  }
  return styles
}


/***/ }),
/* 8 */
/***/ (function(module, exports) {

/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file.
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

module.exports = function normalizeComponent (
  rawScriptExports,
  compiledTemplate,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier /* server only */
) {
  var esModule
  var scriptExports = rawScriptExports = rawScriptExports || {}

  // ES6 modules interop
  var type = typeof rawScriptExports.default
  if (type === 'object' || type === 'function') {
    esModule = rawScriptExports
    scriptExports = rawScriptExports.default
  }

  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (compiledTemplate) {
    options.render = compiledTemplate.render
    options.staticRenderFns = compiledTemplate.staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = injectStyles
  }

  if (hook) {
    var functional = options.functional
    var existing = functional
      ? options.render
      : options.beforeCreate

    if (!functional) {
      // inject component registration as beforeCreate hook
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    } else {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return existing(h, context)
      }
    }
  }

  return {
    esModule: esModule,
    exports: scriptExports,
    options: options
  }
}


/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{ref:"buttons",staticClass:"xz-custom-tag"},[(_vm.choosed.length > 0)?_c('div',{staticClass:"xz-already-choose"},_vm._l((_vm.choosed),function(tag,index){return _c('span',{key:tag.num,staticClass:"xz-choosed-tag"},[_vm._v("\n      "+_vm._s(tag.value)+"\n      "),_c('i',{staticClass:"xz-close",attrs:{"data-sortnum":tag.num},on:{"click":function($event){return _vm.delSelected($event,index)}}})])}),0):_vm._e(),_vm._v(" "),(_vm.tags.length > 0)?_c('div',_vm._l((_vm.tagList),function(tag){return _c('button',{key:tag.num,staticClass:"xz-tag-prepare",attrs:{"data-sortnum":tag.num},on:{"click":function($event){return _vm.chooseTag($event)}}},[_vm._v(_vm._s(tag.value))])}),0):_vm._e(),_vm._v(" "),_c('div',{staticClass:"xz-add-tag"},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.customTag),expression:"customTag"}],staticClass:"xz-tag-input",attrs:{"type":"text"},domProps:{"value":(_vm.customTag)},on:{"input":function($event){if($event.target.composing){ return; }_vm.customTag=$event.target.value}}}),_vm._v(" "),_c('button',{staticClass:"xz-tag-button",on:{"click":_vm.addTag}},[_vm._v("新增标签")])]),_vm._v(" "),_c('transition',{attrs:{"name":"fade"}},[_c('p',{directives:[{name:"show",rawName:"v-show",value:(_vm.hasRepeat),expression:"hasRepeat"}],staticClass:"xz-repeat-error"},[_vm._v("标签已存在")])])],1)}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ })
/******/ ]);
});
//# sourceMappingURL=xz-mtag.js.map