/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "src/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _reactDom = __webpack_require__(1);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var React = __webpack_require__(2);
	var App = __webpack_require__(3);


	// Render the main component into the dom
	_reactDom2.default.render(React.createElement(App, null), document.getElementById('app'));

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = ReactDOM;

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = React;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(4);

	var React = __webpack_require__(2);

	var logoImage = __webpack_require__(8);

	var AppComponent = React.createClass({
	    displayName: 'AppComponent',

	    componentDidMount: function componentDidMount() {
	        var img = new Image();
	        img.src = logoImage;

	        if (img.complete) {
	            init();
	        } else {
	            img.onload = init;
	        }

	        var canvas = document.getElementById("canvas"),
	            ctx = canvas.getContext('2d'),
	            winWidth = document.documentElement.clientWidth,
	            winHeight = document.documentElement.clientHeight;
	        canvas.width = winWidth;
	        canvas.height = winHeight;

	        var dotList = [];

	        function init() {
	            var imgW = Math.min(winWidth * 0.8, 300),
	                imgH = imgW,
	                sx = winWidth / 2 - imgW / 2,
	                sy = winHeight / 2 - imgH / 2;
	            ctx.drawImage(img, sx, sy, imgW, imgH);
	            var imgData = ctx.getImageData(sx, sy, imgW, imgH);
	            console.log(imgData);
	            //每隔4像素取一点，直径2像素，空隙2像素。点所在的i的以y为高度，x为位移来计算
	            for (var x = 0; x <= imgData.width; x += 6) {
	                for (var y = 0; y <= imgData.height; y += 6) {
	                    var i = 4 * (x + y * imgData.width);
	                    if (imgData.data[i] <= 100 && imgData.data[i + 3] >= 128) {
	                        var dot = new Dot(x, y, 2);
	                        dotList.push(dot);
	                    }
	                }
	            }

	            draw();
	        }

	        function Dot(cx, cy, cr) {
	            this.x = cx;
	            this.y = cy;
	            this.r = cr;
	            this.now = 0;
	            this.all = Math.ceil(3000 / (16.66 * 2));
	            this.delay = this.all * Math.random();
	            this.delayCount = 0;
	        }

	        // t 当前时间
	        // b 初始值
	        // c 总位移
	        // d 总时间
	        function easeInOutCubic(t, b, c, d) {
	            if ((t /= d / 2) < 1) return c / 2 * t * t * t + b;
	            return c / 2 * ((t -= 2) * t * t + 2) + b;
	        }

	        var rafid;
	        var allnum = 0;
	        function draw() {
	            var imgW = Math.min(winWidth * 0.8, 300),
	                imgH = imgW,
	                sx = winWidth / 2 - imgW / 2,
	                sy = winHeight / 2 - imgH / 2;
	            ctx.clearRect(0, 0, winWidth, winHeight);
	            var len = dotList.length;
	            ctx.fillStyle = 'rgba(' + 255 + ',' + 255 + ',' + 255 + ',' + (allnum + 100) / (len + 100) + ')';
	            //console.log(allnum+":"+len);
	            var cn, ca;
	            var curX, curY, curDot;
	            allnum = 0;
	            for (var i = 0; i < len; i += 1) {

	                curDot = dotList[i];
	                if (curDot.delayCount < curDot.delay) {
	                    curDot.delayCount += 1;
	                    continue;
	                }

	                ctx.save();
	                ctx.beginPath();
	                cn = curDot.now;
	                ca = curDot.all;

	                if (cn < ca) {
	                    //console.log(cn+"::::"+ca);
	                    curX = easeInOutCubic(cn, 0, sx + curDot.x, ca);
	                    curY = easeInOutCubic(cn, 0, sy + curDot.y, ca);
	                    ctx.arc(curX, curY, curDot.r, 0, 2 * Math.PI);
	                    curDot.now += 1;
	                } else {
	                    ctx.arc(sx + curDot.x, sy + curDot.y, curDot.r, 0, 2 * Math.PI);
	                    allnum += 1;
	                }

	                ctx.fill();
	                ctx.restore();
	                if (len <= allnum) {
	                    cancelAnimationFrame(rafid);
	                    return;
	                }
	            }

	            rafid = requestAnimationFrame(draw);
	        }
	    },
	    render: function render() {
	        return React.createElement('div', null);
	    }
	});

	AppComponent.defaultProps = {};

	module.exports = AppComponent;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(5);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(7)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js!./../../node_modules/less-loader/index.js!./App.less", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js!./../../node_modules/less-loader/index.js!./App.less");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(6)();
	// imports


	// module
	exports.push([module.id, "/* Base Application Styles */\n@font-face {\n  font-family: 'webfont';\n  src: url('//at.alicdn.com/t/b33mefljb7p0hpvi.eot');\n  /* IE9*/\n  src: url('//at.alicdn.com/t/b33mefljb7p0hpvi.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */ url('//at.alicdn.com/t/b33mefljb7p0hpvi.woff') format('woff'), /* chrome、firefox */ url('//at.alicdn.com/t/b33mefljb7p0hpvi.ttf') format('truetype'), /* chrome、firefox、opera、Safari, Android, iOS 4.2+*/ url('//at.alicdn.com/t/b33mefljb7p0hpvi.svg#NotoSansHans-DemiLight') format('svg');\n  /* iOS 4.1- */\n}\n* {\n  margin: 0;\n  padding: 0;\n}\nbody,\nhtml {\n  font-family: 'webfont';\n  color: #FEFEFF;\n  background: #04243D;\n  font-size: 62.5%;\n}\n.index img {\n  margin: 4rem auto;\n  border-radius: 4px;\n  background: transparent;\n  display: block;\n  width: 16rem;\n}\n.index .notice {\n  margin: 2rem auto;\n  padding: 1.5rem 0;\n  text-align: center;\n  font-size: 1.6rem;\n  line-height: 2rem;\n  border: 1px solid transparent;\n  border-width: 1px 0;\n}\ncanvas {\n  display: block;\n}\n", ""]);

	// exports


/***/ },
/* 6 */
/***/ function(module, exports) {

	"use strict";

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function () {
		var list = [];

		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for (var i = 0; i < this.length; i++) {
				var item = this[i];
				if (item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};

		// import a list of modules into the list
		list.i = function (modules, mediaQuery) {
			if (typeof modules === "string") modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for (var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if (typeof id === "number") alreadyImportedModules[id] = true;
			}
			for (i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if (typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if (mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if (mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];

	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}

		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();

		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

		var styles = listToStyles(list);
		addStylesToDom(styles, options);

		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}

	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}

	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}

	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}

	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}

	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}

	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}

	function addStyle(obj, options) {
		var styleElement, update, remove;

		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}

		update(obj);

		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}

	var replaceText = (function () {
		var textStore = [];

		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();

	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}

	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;

		if(media) {
			styleElement.setAttribute("media", media)
		}

		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}

	function updateLink(linkElement, obj) {
		var css = obj.css;
		var sourceMap = obj.sourceMap;

		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}

		var blob = new Blob([css], { type: "text/css" });

		var oldSrc = linkElement.href;

		linkElement.href = URL.createObjectURL(blob);

		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "f2187a97dcfeda93998f53be5e9b7bba.png";

/***/ }
/******/ ]);