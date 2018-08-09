/* Umbrella JS 3.0.1 umbrellajs.com */
var u=function(t,e){return this instanceof u?t instanceof u?t:("string"==typeof t&&(t=this.select(t,e)),t&&t.nodeName&&(t=[t]),void(this.nodes=this.slice(t))):new u(t,e)};u.prototype={get length(){return this.nodes.length}},u.prototype.nodes=[],u.prototype.addClass=function(){return this.eacharg(arguments,function(t,e){t.classList.add(e)})},u.prototype.adjacent=function(i,t,n){return"number"==typeof t&&(t=0===t?[]:new Array(t).join().split(",").map(Number.call,Number)),this.each(function(r,o){var e=document.createDocumentFragment();u(t||{}).map(function(t,e){var n="function"==typeof i?i.call(this,t,e,r,o):i;return"string"==typeof n?this.generate(n):u(n)}).each(function(t){this.isInPage(t)?e.appendChild(u(t).clone().first()):e.appendChild(t)}),n.call(this,r,e)})},u.prototype.after=function(t,e){return this.adjacent(t,e,function(t,e){t.parentNode.insertBefore(e,t.nextSibling)})},u.prototype.append=function(t,e){return this.adjacent(t,e,function(t,e){t.appendChild(e)})},u.prototype.args=function(t,e,n){return"function"==typeof t&&(t=t(e,n)),"string"!=typeof t&&(t=this.slice(t).map(this.str(e,n))),t.toString().split(/[\s,]+/).filter(function(t){return t.length})},u.prototype.array=function(o){o=o;var i=this;return this.nodes.reduce(function(t,e,n){var r;return o?((r=o.call(i,e,n))||(r=!1),"string"==typeof r&&(r=u(r)),r instanceof u&&(r=r.nodes)):r=e.innerHTML,t.concat(!1!==r?r:[])},[])},u.prototype.attr=function(t,e,r){return r=r?"data-":"",this.pairs(t,e,function(t,e){return t.getAttribute(r+e)},function(t,e,n){t.setAttribute(r+e,n)})},u.prototype.before=function(t,e){return this.adjacent(t,e,function(t,e){t.parentNode.insertBefore(e,t)})},u.prototype.children=function(t){return this.map(function(t){return this.slice(t.children)}).filter(t)},u.prototype.clone=function(){return this.map(function(t,e){var n=t.cloneNode(!0),r=this.getAll(n);return this.getAll(t).each(function(t,e){for(var n in this.mirror)this.mirror[n]&&this.mirror[n](t,r.nodes[e])}),n})},u.prototype.getAll=function(t){return u([t].concat(u("*",t).nodes))},u.prototype.mirror={},u.prototype.mirror.events=function(t,e){if(t._e)for(var n in t._e)t._e[n].forEach(function(t){u(e).on(n,t)})},u.prototype.mirror.select=function(t,e){u(t).is("select")&&(e.value=t.value)},u.prototype.mirror.textarea=function(t,e){u(t).is("textarea")&&(e.value=t.value)},u.prototype.closest=function(e){return this.map(function(t){do{if(u(t).is(e))return t}while((t=t.parentNode)&&t!==document)})},u.prototype.data=function(t,e){return this.attr(t,e,!0)},u.prototype.each=function(t){return this.nodes.forEach(t.bind(this)),this},u.prototype.eacharg=function(n,r){return this.each(function(e,t){this.args(n,e,t).forEach(function(t){r.call(this,e,t)},this)})},u.prototype.empty=function(){return this.each(function(t){for(;t.firstChild;)t.removeChild(t.firstChild)})},u.prototype.filter=function(e){var t=function(t){return t.matches=t.matches||t.msMatchesSelector||t.webkitMatchesSelector,t.matches(e||"*")};return"function"==typeof e&&(t=e),e instanceof u&&(t=function(t){return-1!==e.nodes.indexOf(t)}),u(this.nodes.filter(t))},u.prototype.find=function(e){return this.map(function(t){return u(e||"*",t)})},u.prototype.first=function(){return this.nodes[0]||!1},u.prototype.generate=function(t){return/^\s*<tr[> ]/.test(t)?u(document.createElement("table")).html(t).children().children().nodes:/^\s*<t(h|d)[> ]/.test(t)?u(document.createElement("table")).html(t).children().children().children().nodes:/^\s*</.test(t)?u(document.createElement("div")).html(t).children().nodes:document.createTextNode(t)},u.prototype.handle=function(){var t=this.slice(arguments).map(function(e){return"function"==typeof e?function(t){t.preventDefault(),e.apply(this,arguments)}:e},this);return this.on.apply(this,t)},u.prototype.hasClass=function(){return this.is("."+this.args(arguments).join("."))},u.prototype.html=function(e){return void 0===e?this.first().innerHTML||"":this.each(function(t){t.innerHTML=e})},u.prototype.is=function(t){return 0<this.filter(t).length},u.prototype.isInPage=function(t){return t!==document.body&&document.body.contains(t)},u.prototype.last=function(){return this.nodes[this.length-1]||!1},u.prototype.map=function(t){return t?u(this.array(t)).unique():this},u.prototype.not=function(e){return this.filter(function(t){return!u(t).is(e||!0)})},u.prototype.off=function(t){return this.eacharg(t,function(e,n){u(e._e?e._e[n]:[]).each(function(t){e.removeEventListener(n,t)})})},u.prototype.on=function(t,e,r){if("string"==typeof e){var o=e;e=function(e){var n=arguments;u(e.currentTarget).find(o).each(function(t){if(t===e.target||t.contains(e.target)){try{Object.defineProperty(e,"currentTarget",{get:function(){return t}})}catch(t){}r.apply(t,n)}})}}var n=function(t){return e.apply(this,[t].concat(t.detail||[]))};return this.eacharg(t,function(t,e){t.addEventListener(e,n),t._e=t._e||{},t._e[e]=t._e[e]||[],t._e[e].push(n)})},u.prototype.pairs=function(n,t,e,r){if(void 0!==t){var o=n;(n={})[o]=t}return"object"==typeof n?this.each(function(t){for(var e in n)r(t,e,n[e])}):this.length?e(this.first(),n):""},u.prototype.param=function(e){return Object.keys(e).map(function(t){return this.uri(t)+"="+this.uri(e[t])}.bind(this)).join("&")},u.prototype.parent=function(t){return this.map(function(t){return t.parentNode}).filter(t)},u.prototype.prepend=function(t,e){return this.adjacent(t,e,function(t,e){t.insertBefore(e,t.firstChild)})},u.prototype.remove=function(){return this.each(function(t){t.parentNode&&t.parentNode.removeChild(t)})},u.prototype.removeClass=function(){return this.eacharg(arguments,function(t,e){t.classList.remove(e)})},u.prototype.replace=function(t,e){var n=[];return this.adjacent(t,e,function(t,e){n=n.concat(this.slice(e.children)),t.parentNode.replaceChild(e,t)}),u(n)},u.prototype.scroll=function(){return this.first().scrollIntoView({behavior:"smooth"}),this},u.prototype.select=function(t,e){return t=t.replace(/^\s*/,"").replace(/\s*$/,""),/^</.test(t)?u().generate(t):(e||document).querySelectorAll(t)},u.prototype.serialize=function(){var r=this;return this.slice(this.first().elements).reduce(function(e,n){return!n.name||n.disabled||"file"===n.type?e:/(checkbox|radio)/.test(n.type)&&!n.checked?e:"select-multiple"===n.type?(u(n.options).each(function(t){t.selected&&(e+="&"+r.uri(n.name)+"="+r.uri(t.value))}),e):e+"&"+r.uri(n.name)+"="+r.uri(n.value)},"").slice(1)},u.prototype.siblings=function(t){return this.parent().children(t).not(this)},u.prototype.size=function(){return this.first().getBoundingClientRect()},u.prototype.slice=function(t){return t&&0!==t.length&&"string"!=typeof t&&"[object Function]"!==t.toString()?t.length?[].slice.call(t.nodes||t):[t]:[]},u.prototype.str=function(e,n){return function(t){return"function"==typeof t?t.call(this,e,n):t.toString()}},u.prototype.text=function(e){return void 0===e?this.first().textContent||"":this.each(function(t){t.textContent=e})},u.prototype.toggleClass=function(t,e){return!!e===e?this[e?"addClass":"removeClass"](t):this.eacharg(t,function(t,e){t.classList.toggle(e)})},u.prototype.trigger=function(t){var o=this.slice(arguments).slice(1);return this.eacharg(t,function(t,e){var n,r={bubbles:!0,cancelable:!0,detail:o};try{n=new window.CustomEvent(e,r)}catch(t){(n=document.createEvent("CustomEvent")).initCustomEvent(e,!0,!0,o)}t.dispatchEvent(n)})},u.prototype.unique=function(){return u(this.nodes.reduce(function(t,e){return null!=e&&!1!==e&&-1===t.indexOf(e)?t.concat(e):t},[]))},u.prototype.uri=function(t){return encodeURIComponent(t).replace(/!/g,"%21").replace(/'/g,"%27").replace(/\(/g,"%28").replace(/\)/g,"%29").replace(/\*/g,"%2A").replace(/%20/g,"+")},u.prototype.wrap=function(t){return this.map(function(e){return u(t).each(function(t){(function(t){for(;t.firstElementChild;)t=t.firstElementChild;return u(t)})(t).append(e.cloneNode(!0)),e.parentNode.replaceChild(t,e)})})},"object"==typeof module&&module.exports&&(module.exports={u:u});

//FASTCLICK
!function(){"use strict";function t(e,o){function i(t,e){return function(){return t.apply(e,arguments)}}var r;if(o=o||{},this.trackingClick=!1,this.trackingClickStart=0,this.targetElement=null,this.touchStartX=0,this.touchStartY=0,this.lastTouchIdentifier=0,this.touchBoundary=o.touchBoundary||10,this.layer=e,this.tapDelay=o.tapDelay||200,this.tapTimeout=o.tapTimeout||700,!t.notNeeded(e)){for(var a=["onMouse","onClick","onTouchStart","onTouchMove","onTouchEnd","onTouchCancel"],c=this,s=0,u=a.length;u>s;s++)c[a[s]]=i(c[a[s]],c);n&&(e.addEventListener("mouseover",this.onMouse,!0),e.addEventListener("mousedown",this.onMouse,!0),e.addEventListener("mouseup",this.onMouse,!0)),e.addEventListener("click",this.onClick,!0),e.addEventListener("touchstart",this.onTouchStart,!1),e.addEventListener("touchmove",this.onTouchMove,!1),e.addEventListener("touchend",this.onTouchEnd,!1),e.addEventListener("touchcancel",this.onTouchCancel,!1),Event.prototype.stopImmediatePropagation||(e.removeEventListener=function(t,n,o){var i=Node.prototype.removeEventListener;"click"===t?i.call(e,t,n.hijacked||n,o):i.call(e,t,n,o)},e.addEventListener=function(t,n,o){var i=Node.prototype.addEventListener;"click"===t?i.call(e,t,n.hijacked||(n.hijacked=function(t){t.propagationStopped||n(t)}),o):i.call(e,t,n,o)}),"function"==typeof e.onclick&&(r=e.onclick,e.addEventListener("click",function(t){r(t)},!1),e.onclick=null)}}var e=navigator.userAgent.indexOf("Windows Phone")>=0,n=navigator.userAgent.indexOf("Android")>0&&!e,o=/iP(ad|hone|od)/.test(navigator.userAgent)&&!e,i=o&&/OS 4_\d(_\d)?/.test(navigator.userAgent),r=o&&/OS [6-7]_\d/.test(navigator.userAgent),a=navigator.userAgent.indexOf("BB10")>0;t.prototype.needsClick=function(t){switch(t.nodeName.toLowerCase()){case"button":case"select":case"textarea":if(t.disabled)return!0;break;case"input":if(o&&"file"===t.type||t.disabled)return!0;break;case"label":case"iframe":case"video":return!0}return/\bneedsclick\b/.test(t.className)},t.prototype.needsFocus=function(t){switch(t.nodeName.toLowerCase()){case"textarea":return!0;case"select":return!n;case"input":switch(t.type){case"button":case"checkbox":case"file":case"image":case"radio":case"submit":return!1}return!t.disabled&&!t.readOnly;default:return/\bneedsfocus\b/.test(t.className)}},t.prototype.sendClick=function(t,e){var n,o;document.activeElement&&document.activeElement!==t&&document.activeElement.blur(),o=e.changedTouches[0],n=document.createEvent("MouseEvents"),n.initMouseEvent(this.determineEventType(t),!0,!0,window,1,o.screenX,o.screenY,o.clientX,o.clientY,!1,!1,!1,!1,0,null),n.forwardedTouchEvent=!0,t.dispatchEvent(n)},t.prototype.determineEventType=function(t){return n&&"select"===t.tagName.toLowerCase()?"mousedown":"click"},t.prototype.focus=function(t){var e;o&&t.setSelectionRange&&0!==t.type.indexOf("date")&&"time"!==t.type&&"month"!==t.type?(e=t.value.length,t.setSelectionRange(e,e)):t.focus()},t.prototype.updateScrollParent=function(t){var e,n;if(e=t.fastClickScrollParent,!e||!e.contains(t)){n=t;do{if(n.scrollHeight>n.offsetHeight){e=n,t.fastClickScrollParent=n;break}n=n.parentElement}while(n)}e&&(e.fastClickLastScrollTop=e.scrollTop)},t.prototype.getTargetElementFromEventTarget=function(t){return t.nodeType===Node.TEXT_NODE?t.parentNode:t},t.prototype.onTouchStart=function(t){var e,n,r;if(t.targetTouches.length>1)return!0;if(e=this.getTargetElementFromEventTarget(t.target),n=t.targetTouches[0],o){if(r=window.getSelection(),r.rangeCount&&!r.isCollapsed)return!0;if(!i){if(n.identifier&&n.identifier===this.lastTouchIdentifier)return t.preventDefault(),!1;this.lastTouchIdentifier=n.identifier,this.updateScrollParent(e)}}return this.trackingClick=!0,this.trackingClickStart=t.timeStamp,this.targetElement=e,this.touchStartX=n.pageX,this.touchStartY=n.pageY,t.timeStamp-this.lastClickTime<this.tapDelay&&t.preventDefault(),!0},t.prototype.touchHasMoved=function(t){var e=t.changedTouches[0],n=this.touchBoundary;return Math.abs(e.pageX-this.touchStartX)>n||Math.abs(e.pageY-this.touchStartY)>n?!0:!1},t.prototype.onTouchMove=function(t){return this.trackingClick?((this.targetElement!==this.getTargetElementFromEventTarget(t.target)||this.touchHasMoved(t))&&(this.trackingClick=!1,this.targetElement=null),!0):!0},t.prototype.findControl=function(t){return void 0!==t.control?t.control:t.htmlFor?document.getElementById(t.htmlFor):t.querySelector("button, input:not([type=hidden]), keygen, meter, output, progress, select, textarea")},t.prototype.onTouchEnd=function(t){var e,a,c,s,u,l=this.targetElement;if(!this.trackingClick)return!0;if(t.timeStamp-this.lastClickTime<this.tapDelay)return this.cancelNextClick=!0,!0;if(t.timeStamp-this.trackingClickStart>this.tapTimeout)return!0;if(this.cancelNextClick=!1,this.lastClickTime=t.timeStamp,a=this.trackingClickStart,this.trackingClick=!1,this.trackingClickStart=0,r&&(u=t.changedTouches[0],l=document.elementFromPoint(u.pageX-window.pageXOffset,u.pageY-window.pageYOffset)||l,l.fastClickScrollParent=this.targetElement.fastClickScrollParent),c=l.tagName.toLowerCase(),"label"===c){if(e=this.findControl(l)){if(this.focus(l),n)return!1;l=e}}else if(this.needsFocus(l))return t.timeStamp-a>100||o&&window.top!==window&&"input"===c?(this.targetElement=null,!1):(this.focus(l),this.sendClick(l,t),o&&"select"===c||(this.targetElement=null,t.preventDefault()),!1);return o&&!i&&(s=l.fastClickScrollParent,s&&s.fastClickLastScrollTop!==s.scrollTop)?!0:(this.needsClick(l)||(t.preventDefault(),this.sendClick(l,t)),!1)},t.prototype.onTouchCancel=function(){this.trackingClick=!1,this.targetElement=null},t.prototype.onMouse=function(t){return this.targetElement?t.forwardedTouchEvent?!0:t.cancelable&&(!this.needsClick(this.targetElement)||this.cancelNextClick)?(t.stopImmediatePropagation?t.stopImmediatePropagation():t.propagationStopped=!0,t.stopPropagation(),t.preventDefault(),!1):!0:!0},t.prototype.onClick=function(t){var e;return this.trackingClick?(this.targetElement=null,this.trackingClick=!1,!0):"submit"===t.target.type&&0===t.detail?!0:(e=this.onMouse(t),e||(this.targetElement=null),e)},t.prototype.destroy=function(){var t=this.layer;n&&(t.removeEventListener("mouseover",this.onMouse,!0),t.removeEventListener("mousedown",this.onMouse,!0),t.removeEventListener("mouseup",this.onMouse,!0)),t.removeEventListener("click",this.onClick,!0),t.removeEventListener("touchstart",this.onTouchStart,!1),t.removeEventListener("touchmove",this.onTouchMove,!1),t.removeEventListener("touchend",this.onTouchEnd,!1),t.removeEventListener("touchcancel",this.onTouchCancel,!1)},t.notNeeded=function(t){var e,o,i;if("undefined"==typeof window.ontouchstart)return!0;if(o=+(/Chrome\/([0-9]+)/.exec(navigator.userAgent)||[,0])[1]){if(!n)return!0;if(e=document.querySelector("meta[name=viewport]")){if(-1!==e.content.indexOf("user-scalable=no"))return!0;if(o>31&&document.documentElement.scrollWidth<=window.outerWidth)return!0}}if(a&&(i=navigator.userAgent.match(/Version\/([0-9]*)\.([0-9]*)/),i[1]>=10&&i[2]>=3&&(e=document.querySelector("meta[name=viewport]")))){if(-1!==e.content.indexOf("user-scalable=no"))return!0;if(document.documentElement.scrollWidth<=window.outerWidth)return!0}return"none"===t.style.msTouchAction?!0:"none"===t.style.touchAction?!0:!1},t.attach=function(e,n){return new t(e,n)},"function"==typeof define&&"object"==typeof define.amd&&define.amd?define(function(){return t}):"undefined"!=typeof module&&module.exports?(module.exports=t.attach,module.exports.FastClick=t):window.FastClick=t}();

//https://github.com/electerious/basicLightbox
!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{("undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this).basicLightbox=e()}}(function(){return function i(a,f,l){function c(t,e){if(!f[t]){if(!a[t]){var o="function"==typeof require&&require;if(!e&&o)return o(t,!0);if(s)return s(t,!0);var n=new Error("Cannot find module '"+t+"'");throw n.code="MODULE_NOT_FOUND",n}var r=f[t]={exports:{}};a[t][0].call(r.exports,function(e){return c(a[t][1][e]||e)},r,r.exports,i,a,f,l)}return f[t].exports}for(var s="function"==typeof require&&require,e=0;e<l.length;e++)c(l[e]);return c}({1:[function(e,t,o){"use strict";Object.defineProperty(o,"__esModule",{value:!0});var l=function(e,t){var o=e.children;return 1===o.length&&o[0].tagName===t},a=o.visible=function(e){return null!=(e=e||document.querySelector(".basicLightbox"))&&!0===e.ownerDocument.body.contains(e)},f=function(){var e,t=0<arguments.length&&void 0!==arguments[0]?arguments[0]:"",o=arguments[1],n=document.createElement("div");n.classList.add("basicLightbox"),null!=o.className&&(e=n.classList).add.apply(e,function(e){if(Array.isArray(e)){for(var t=0,o=Array(e.length);t<e.length;t++)o[t]=e[t];return o}return Array.from(e)}(o.className.split(" "))),n.innerHTML="\n\t\t"+o.beforePlaceholder+'\n\t\t<div class="basicLightbox__placeholder" role="dialog">\n\t\t\t'+t+"\n\t\t</div>\n\t\t"+o.afterPlaceholder+"\n\t";var r=n.querySelector(".basicLightbox__placeholder"),i=l(r,"IMG"),a=l(r,"VIDEO"),f=l(r,"IFRAME");return!0===i&&n.classList.add("basicLightbox--img"),!0===a&&n.classList.add("basicLightbox--video"),!0===f&&n.classList.add("basicLightbox--iframe"),n};o.create=function(e,n){n=function(){var e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{};return!1!==(e=Object.assign({},e)).closable&&(e.closable=!0),"function"==typeof e.className&&(e.className=e.className()),"string"!=typeof e.className&&(e.className=null),"function"!=typeof e.beforeShow&&(e.beforeShow=function(){}),"function"!=typeof e.afterShow&&(e.afterShow=function(){}),"function"!=typeof e.beforeClose&&(e.beforeClose=function(){}),"function"!=typeof e.afterClose&&(e.afterClose=function(){}),"function"==typeof e.beforePlaceholder&&(e.beforePlaceholder=e.beforePlaceholder()),"string"!=typeof e.beforePlaceholder&&(e.beforePlaceholder=""),"function"==typeof e.afterPlaceholder&&(e.afterPlaceholder=e.afterPlaceholder()),"string"!=typeof e.afterPlaceholder&&(e.afterPlaceholder=""),e}(n);var r=f(e,n),o=function(e){return!1!==n.beforeClose(i)&&(o=function(){if(n.afterClose(i),"function"==typeof e)return e(i)},(t=r).classList.remove("basicLightbox--visible"),setTimeout(function(){return!1===a(t)||t.parentElement.removeChild(t),o()},410),!0);var t,o};!0===n.closable&&(r.onclick=function(e){var t;e.target===this&&(o(),"function"==typeof(t=e).stopPropagation&&t.stopPropagation(),"function"==typeof t.preventDefault&&t.preventDefault())});var i={element:function(){return r},visible:function(){return a(r)},show:function(e){return!1!==n.beforeShow(i)&&(t=r,o=function(){if(n.afterShow(i),"function"==typeof e)return e(i)},document.body.appendChild(t),setTimeout(function(){requestAnimationFrame(function(){return t.classList.add("basicLightbox--visible"),o()})},10),!0);var t,o},close:o};return i}},{}]},{},[1])(1)});

//https://github.com/jehna/ga-lite
!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports.galite=e():t.galite=e()}(this,function(){return function(t){function e(r){if(n[r])return n[r].exports;var i=n[r]={i:r,l:!1,exports:{}};return t[r].call(i.exports,i,i.exports,e),i.l=!0,i.exports}var n={};return e.m=t,e.c=n,e.d=function(t,n,r){e.o(t,n)||Object.defineProperty(t,n,{configurable:!1,enumerable:!0,get:r})},e.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(n,"a",n),n},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="",e(e.s=2)}([function(t,e,n){"use strict";function r(t,e){a[t]=e}function i(t){return a[t]}e.a=r,e.b=i;var a={}},function(t,e,n){"use strict";function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function i(){return(new Date).getTime()}function a(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[];if(1===e.length&&e[0].constructor===Object)return e[0];switch(t){case"pageview":return{page:f(e,1)[0]};case"event":var n=f(e,4);return{eventCategory:n[0],eventAction:n[1],eventLabel:n[2],eventValue:n[3]};case"social":var r=f(e,3);return{socialNetwork:r[0],socialAction:r[1],socialTarget:r[2]};case"timing":var i=f(e,4);return{timingCategory:i[0],timingVar:i[1],timingValue:i[2],timingLabel:i[3]};default:return{}}}n.d(e,"a",function(){return d});var o=n(6),c=n(7),u=n(8),f=function(){function t(t,e){var n=[],r=!0,i=!1,a=void 0;try{for(var o,c=t[Symbol.iterator]();!(r=(o=c.next()).done)&&(n.push(o.value),!e||n.length!==e);r=!0);}catch(t){i=!0,a=t}finally{try{!r&&c.return&&c.return()}finally{if(i)throw a}}return n}return function(e,n){if(Array.isArray(e))return e;if(Symbol.iterator in Object(e))return t(e,n);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}(),s=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(t[r]=n[r])}return t},l=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),d="t0",p=function(){function t(e){r(this,t),this.fields={trackingId:e},this.userId=Object(c.a)(),this._sendTo=o.a,this._getTime=i}return l(t,[{key:"send",value:function(t){for(var e=arguments.length,n=Array(e>1?e-1:0),r=1;r<e;r++)n[r-1]=arguments[r];var i=s({hitType:t},a(t,n),this.fields),o=Object(u.a)(this.fields.trackingId,this._getTime(),this.userId,i);this._sendTo(o)}},{key:"get",value:function(t){return this.fields[t]}},{key:"set",value:function(t,e){this.fields[t]=e}}]),t}();e.b=p},function(t,e,n){"use strict";function r(t){if(Array.isArray(t)){for(var e=0,n=Array(t.length);e<t.length;e++)n[e]=t[e];return n}return Array.from(t)}function i(t){if(!Object(o.a)()){for(var e=a(t),n=d(e,2),r=n[0],i=n[1],s=!!c.a[t],l=!!f.b.prototype[i]&&"constructor"!==i,p=arguments.length,v=Array(p>1?p-1:0),g=1;g<p;g++)v[g-1]=arguments[g];if(s)c.a[t].apply(c.a,v);else if(l){var y=Object(u.b)(r);y[i].apply(y,v)}else{if("function"!=typeof t)throw new Error("Command "+t+" is not available in ga-lite");var b=Object(u.b)(r);t(b)}}}function a(t){return"string"==typeof t&&t.indexOf(".")>-1?t.split("."):[f.a,t]}Object.defineProperty(e,"__esModule",{value:!0}),e.default=i;var o=n(3),c=n(4),u=n(0),f=n(1),s=n(14),l=n(15),d=(n.n(l),function(){function t(t,e){var n=[],r=!0,i=!1,a=void 0;try{for(var o,c=t[Symbol.iterator]();!(r=(o=c.next()).done)&&(n.push(o.value),!e||n.length!==e);r=!0);}catch(t){i=!0,a=t}finally{try{!r&&c.return&&c.return()}finally{if(i)throw a}}return n}return function(e,n){if(Array.isArray(e))return e;if(Symbol.iterator in Object(e))return t(e,n);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}());Object.keys(c.a).forEach(function(t){i[t]=c.a[t]}),Object(s.a)().forEach(function(t){return i.apply(void 0,r(t))})},function(t,e,n){"use strict";function r(){return 1===parseInt(navigator.msDoNotTrack||window.doNotTrack||navigator.doNotTrack,10)}e.a=r},function(t,e,n){"use strict";var r=n(5),i=n(13),a={create:r.a,getByName:i.a};e.a=a},function(t,e,n){"use strict";function r(t,e){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:a.a,r=(arguments[3],new a.b(t));return Object(i.a)(n,r),r}e.a=r;var i=n(0),a=n(1)},function(t,e,n){"use strict";function r(t){if("undefined"!=typeof navigator&&navigator.sendBeacon){if(navigator.sendBeacon(t))return}try{var e=new window.XMLHttpRequest;e.open("GET",t,!1),e.send()}catch(e){var n=new window.Image;n.src=t}}e.a=r},function(t,e,n){"use strict";function r(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:window?window.localStorage:null;if(t&&t.getItem(i))return t.getItem(i);var e=Math.random()+"."+Math.random();return t&&t.setItem(i,e),e}e.a=r;var i="uid"},function(t,e,n){"use strict";function r(t,e,n){var r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:{},c=arguments.length>4&&void 0!==arguments[4]&&arguments[4],u=Object(a.a)(Object(o.a)(r));return Object(i.a)()+(u?"&"+u:"")+(c?"&aip=1":"")+"&cid="+n+"&tid="+t+"&z="+e}e.a=r;var i=n(9),a=n(11),o=n(12)},function(t,e,n){"use strict";function r(t,e){return"https://www.google-analytics.com/collect?v=1&ul=en-us&de=UTF-8"+Object(i.a)("dl",[document.location.href])+Object(i.a)("dt",[document.title])+Object(i.a)("sd",[window.screen.colorDepth,"-bit"])+Object(i.a)("sr",[window.screen.availHeight,"x",window.screen.availWidth])+Object(i.a)("vp",[window.innerWidth,"x",window.innerHeight])+Object(i.a)("dr",[document.referrer])}e.a=r;var i=n(10)},function(t,e,n){"use strict";function r(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[];return!t||e.indexOf(void 0)>-1?"":"&"+t+"="+e.map(encodeURIComponent).join("")}e.a=r},function(t,e,n){"use strict";function r(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return Object.keys(t).map(function(e){return[e,t[e]].map(i).map(encodeURIComponent).join("=")}).join("&")}function i(t){return"boolean"==typeof t?+t:t}e.a=r},function(t,e,n){"use strict";function r(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function i(t){return Object.keys(t).filter(function(t){return o.hasOwnProperty(t)}).filter(function(e){return t[e]}).reduce(function(e,n){return a({},e,r({},o[n],t[n]))},{})}e.a=i;var a=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(t[r]=n[r])}return t},o={anonymizeIp:"aip",dataSource:"ds",queueTime:"qt",userId:"uid",sessionControl:"sc",referrer:"dr",campaignName:"cn",campaignSource:"cs",campaignMedium:"cm",campaignKeyword:"ck",campaignContent:"cc",campaignId:"ci",screenResolution:"sr",viewportSize:"vp",encoding:"de",screenColors:"sd",language:"ul",javaEnabled:"je",flashVersion:"fl",hitType:"t",nonInteraction:"ni",location:"dl",hostname:"dh",page:"dp",title:"dt",screenName:"cd",linkid:"linkid",appName:"an",appId:"aid",appVersion:"av",appInstallerId:"aiid",eventCategory:"ec",eventAction:"ea",eventLabel:"el",eventValue:"ev",currencyCode:"cu",socialNetwork:"sn",socialAction:"sa",socialTarget:"st",timingCategory:"utc",timingVar:"utv",timingValue:"utt",timingLabel:"utl",exDescription:"exd",exFatal:"exf",expId:"xid",expVar:"xvar"}},function(t,e,n){"use strict";function r(t){return Object(i.b)(t)}e.a=r;var i=n(0)},function(t,e,n){"use strict";function r(){return"undefined"==typeof window?[]:window.galite&&window.galite.q||[]}e.a=r},function(t,e){Array.from=Array.from||function(){var t;return(t=Array.prototype.slice).call.apply(t,arguments)}}]).default});
galite('create', 'UA-56336810-1', 'auto');
galite('send', 'pageview');