(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(self, () => {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
// @ts-ignore
var AApp = __webpack_require__(2);
// @ts-ignore
var App = /** @class */ (function (_super) {
    __extends(App, _super);
    function App() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.valueOfInput = '';
        return _this;
    }
    App.prototype.createEl = function (_a // типы прописаны в абстрактном классе
    ) {
        var tag = _a.tag, attributs = _a.attributs, classNames = _a.classNames;
        var createTag = document.createElement(tag);
        if (attributs !== undefined) {
            for (var attr in attributs) {
                createTag.setAttribute(attr, attributs[attr]);
            }
            ;
        }
        ;
        if (classNames !== undefined) {
            while (classNames.length > 0) {
                var deletedClassName = classNames.shift();
                createTag.classList.add(deletedClassName);
            }
            ;
        }
        ;
        return createTag;
    };
    ;
    App.prototype.createMainPage = function () {
        var main = this.createEl({
            tag: "div",
            classNames: ['main_page']
        });
        main.appendChild(this.entryField());
        main.appendChild(this.btnGetGetDiagram());
        main.appendChild(this.table());
        return main;
    };
    ;
    App.prototype.entryField = function () {
        var _this = this;
        var self = this;
        var placeForText = self.createEl({
            tag: "input",
            attributs: {
                value: '',
                placeholder: 'введите текст'
            },
            classNames: ['input']
        });
        placeForText.oninput = function (e) {
            _this.valueOfInput = e.target.value;
        };
        return placeForText;
    };
    ;
    App.prototype.createDiagram = function () {
        if (this.valueOfInput) {
            var str = this.valueOfInput.split(/(\(|\d+|\))/).filter(Boolean).filter(function (el) { return el !== " "; });
            var place = {
                rows: 0,
                column: 0,
                symbols: []
            };
            var symboldForTable = [];
            var numberOnLine = 0;
            var pointString = undefined;
            var numberColumn = 0;
            for (var _i = 0, str_1 = str; _i < str_1.length; _i++) {
                var strEl = str_1[_i];
                if (!!Number(strEl)) {
                    place.rows += 1;
                    if (pointString === undefined) {
                        pointString = 0;
                    }
                    else {
                        pointString += 1;
                    }
                    ;
                    symboldForTable.push([]);
                    for (var i = 2; i <= numberOnLine; i++) {
                        symboldForTable[pointString].push(" ");
                    }
                    ;
                    symboldForTable[pointString].push(strEl);
                    /**** логика для горизонтальной черты между цифрами *************/
                    var lengthChildSFT = symboldForTable[pointString].length;
                    var lengthChildSFTMinusOne = lengthChildSFT - 1;
                    for (var _a = 0, symboldForTable_1 = symboldForTable; _a < symboldForTable_1.length; _a++) {
                        var prevRow = symboldForTable_1[_a];
                        if (!!prevRow && prevRow[lengthChildSFTMinusOne] === " ") {
                            prevRow[lengthChildSFTMinusOne] = "|";
                        }
                        ;
                    }
                    ;
                    /****************************************************************/
                }
                else if (strEl === '(') {
                    numberColumn += 1;
                    numberOnLine += 1;
                    if (pointString !== undefined) {
                        symboldForTable[pointString].push("-", "+");
                        numberOnLine += 1;
                    }
                    ;
                }
                else if (strEl === ')') {
                    numberColumn -= 1;
                    numberOnLine -= 2;
                }
                ;
                if (numberColumn > place.column) {
                    place.column = numberColumn;
                }
                ;
            }
            ;
            place.column = place.column * 2 - 1; // для учета пробела между цифрами 
            var divContainDiagram = this.createEl({ tag: 'div' });
            for (var i = 0; i < symboldForTable.length; i++) {
                var createdEl = this.createEl({ tag: 'div', classNames: ['line'] });
                for (var j = 0; j < symboldForTable[i].length; j++) {
                    var classNames = [];
                    var textContent = " ";
                    switch (symboldForTable[i][j]) {
                        case '-':
                            classNames.push('h_hyphen');
                            break;
                        case '|':
                            classNames.push('v_hyphen');
                            break;
                        case '+':
                            classNames.push('arrow');
                            break;
                        default:
                            textContent = symboldForTable[i][j];
                            break;
                    }
                    ;
                    var createdChildEl = this.createEl({ tag: 'div', classNames: classNames });
                    createdChildEl.textContent = textContent;
                    createdEl.append(createdChildEl);
                }
                ;
                divContainDiagram.append(createdEl);
            }
            ;
            return divContainDiagram;
        }
        ;
    };
    ;
    App.prototype.renderDiagram = function () {
        var table = document.querySelector(".table");
        table.innerHTML = '';
        table.append(this.createDiagram());
    };
    ;
    App.prototype.btnGetGetDiagram = function () {
        var btn = this.createEl({ tag: 'button', classNames: ['button'] });
        btn.textContent = "Отрисовать";
        btn.onclick = this.renderDiagram.bind(this);
        return btn;
    };
    ;
    App.prototype.table = function () {
        var table = this.createEl({
            tag: "div",
            classNames: ['table']
        });
        return table;
    };
    ;
    return App;
}(AApp));
;
module.exports = App;


/***/ }),
/* 2 */
/***/ ((module) => {


// @ts-ignore
var AApp = /** @class */ (function () {
    function AApp() {
        this.inint();
    }
    ;
    AApp.prototype.inint = function () {
        var body = document.querySelector('body');
        console.log("body");
        if (body) {
            body.appendChild(this.createMainPage());
        }
        ;
    };
    ;
    return AApp;
}());
;
module.exports = AApp;


/***/ })
/******/ 	]);
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
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {

// @ts-ignore 
// игнор стоит на то, что название индетификаторов экспорта и импорта совпадает. Это можно избежать изменив нахвание пр импорте.
var App = __webpack_require__(1);
function bootstrup() {
    new App;
}
;
bootstrup();

})();

/******/ 	return __webpack_exports__;
/******/ })()
;
});