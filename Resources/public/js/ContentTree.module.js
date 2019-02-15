!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t(require("react"),require("prop-types")):"function"==typeof define&&define.amd?define(["react","prop-types"],t):"object"==typeof exports?exports.ContentTree=t(require("react"),require("prop-types")):(e.eZ=e.eZ||{},e.eZ.modules=e.eZ.modules||{},e.eZ.modules.ContentTree=t(e.React,e.PropTypes))}("undefined"!=typeof self?self:this,function(e,t){return function(e){var t={};function n(i){if(t[i])return t[i].exports;var s=t[i]={i,l:!1,exports:{}};return e[i].call(s.exports,s,s.exports,n),s.l=!0,s.exports}return n.m=e,n.c=t,n.d=function(e,t,i){n.o(e,t)||Object.defineProperty(e,t,{configurable:!1,enumerable:!0,get:i})},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=60)}({0:function(t,n){t.exports=e},1:function(e,n){e.exports=t},2:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=r(n(0)),s=r(n(1));function r(e){return e&&e.__esModule?e:{default:e}}const a=e=>{const t=e.customPath?e.customPath:`/bundles/ezplatformadminui/img/ez-icons.svg#${e.name}`;let n="ez-icon";return e.extraClasses&&(n=`${n} ${e.extraClasses}`),i.default.createElement("svg",{className:n},i.default.createElement("use",{xlinkHref:t}))};a.propTypes={extraClasses:s.default.string.isRequired,name:s.default.string,customPath:s.default.string},a.defaultProps={customPath:null,name:null},t.default=a},60:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=n(0),s=o(i),r=o(n(1)),a=o(n(61));function o(e){return e&&e.__esModule?e:{default:e}}const d="ez-is-tree-resizing";class l extends i.Component{constructor(e){super(e),this.changeContainerWidth=this.changeContainerWidth.bind(this),this.addWidthChangeListener=this.addWidthChangeListener.bind(this),this.removeWidthChangeListener=this.removeWidthChangeListener.bind(this),this._refTreeContainer=s.default.createRef(),this.state={locations:e.preloadedLocations,resizeStartPositionX:0,containerWidth:0,resizedContainerWidth:0,isResizing:!1}}componentWillUnmount(){this.clearDocumentResizingState()}changeContainerWidth({clientX:e}){const t=e;this.setState(e=>({resizedContainerWidth:e.containerWidth+(t-e.resizeStartPositionX)}))}addWidthChangeListener({nativeEvent:e}){const t=e.clientX,n=parseInt(window.getComputedStyle(this._refTreeContainer.current).width,10);window.document.addEventListener("mousemove",this.changeContainerWidth,!1),window.document.addEventListener("mouseup",this.removeWidthChangeListener,!1),window.document.body.classList.add(d),this.setState(()=>({resizeStartPositionX:t,containerWidth:n,isResizing:!0}))}removeWidthChangeListener(){this.clearDocumentResizingState(),this.setState(e=>({resizeStartPositionX:0,containerWidth:e.resizedContainerWidth,isResizing:!1}))}clearDocumentResizingState(){window.document.removeEventListener("mousemove",this.changeContainerWidth),window.document.removeEventListener("mouseup",this.removeWidthChangeListener),window.document.body.classList.remove(d)}render(){var e=this.state;const t=e.isResizing,n=e.containerWidth,i=e.resizedContainerWidth,r=t?i:n,o={className:"m-tree",ref:this._refTreeContainer};return r&&(o.style={width:`${r}px`}),s.default.createElement("div",o,s.default.createElement(a.default,{items:this.state.locations,currentLocationId:this.props.currentLocationId}),s.default.createElement("div",{className:"m-tree__resize-handler",onMouseDown:this.addWidthChangeListener}))}}t.default=l,l.propTypes={currentLocationId:r.default.number,preloadedLocations:r.default.arrayOf(r.default.object)},l.defaultProps={preloadedLocations:[]}},61:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var i in n)Object.prototype.hasOwnProperty.call(n,i)&&(e[i]=n[i])}return e},s=o(n(0)),r=o(n(1)),a=o(n(62));function o(e){return e&&e.__esModule?e:{default:e}}const d=e=>{return s.default.createElement("ul",{className:"c-list"},e.items.map(t=>s.default.createElement(a.default,i({key:t.id},t,{selected:t.id===e.currentLocationId,onItemClick:e.onItemClick}),t.subItems.length?s.default.createElement(d,{items:t.subItems,currentLocationId:e.currentLocationId,onItemClick:e.onItemClick}):null)))};d.propTypes={items:r.default.arrayOf(r.default.object).isRequired,currentLocationId:r.default.number,onItemClick:r.default.func.isRequired},t.default=d},62:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=n(0),s=o(i),r=o(n(1)),a=o(n(2));function o(e){return e&&e.__esModule?e:{default:e}}class d extends i.Component{constructor(e){super(e),this.toggleExpandedState=this.toggleExpandedState.bind(this),this.state={isExpanded:!1}}toggleExpandedState(){this.setState(e=>({isExpanded:!e.isExpanded}))}renderIcon(){var e=this.props;const t=e.contentTypeIdentifier,n=e.selected,i={customPath:eZ.helpers.contentType.getContentTypeIconUrl(t)||eZ.helpers.contentType.getContentTypeIconUrl("file"),extraClasses:`ez-icon--small ez-icon--${n?"light":"dark"}`};return s.default.createElement("span",{className:"c-list-item__icon"},s.default.createElement(a.default,i))}render(){var e=this.props;const t=e.subItems,n=e.totalSubItems,i=e.name,r=e.children,a=e.hidden,o=e.selected,d=e.href,l={className:"c-list-item"},c={className:"c-list-item__toggler",onClick:this.toggleExpandedState,tabIndex:-1};return t.length&&(l.className=`${l.className} c-list-item--has-sub-items`),t.length<n&&(l.className=`${l.className} c-list-item--can-load-more`),this.state.isExpanded&&(l.className=`${l.className} c-list-item--is-expanded`),a&&(l.className=`${l.className} c-list-item--is-hidden`),o&&(l.className=`${l.className} c-list-item--is-selected`,c.className=`${c.className} c-list-item__toggler--light`),s.default.createElement("li",l,s.default.createElement("div",{className:"c-list-item__label"},s.default.createElement("span",c),s.default.createElement("a",{className:"c-list-item__link",href:d},this.renderIcon()," ",i)),r)}}d.propTypes={id:r.default.number.isRequired,href:r.default.string.isRequired,name:r.default.string.isRequired,contentTypeIdentifier:r.default.string.isRequired,totalSubItems:r.default.number.isRequired,subItems:r.default.array.isRequired,children:r.default.element,hidden:r.default.bool.isRequired,selected:r.default.bool.isRequired},t.default=d}}).default});
//# sourceMappingURL=ContentTree.module.js.map