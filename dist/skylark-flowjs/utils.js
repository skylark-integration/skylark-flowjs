/**
 * skylark-flowjs - A version of flowjs that ported to running on skylarkjs
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylark-integration/skylark-flowjs/
 * @license MIT
 */
define(["skylark-langx/langx","./flowjs"],function(n,e){function t(n,e,t){var i;if(n)if(void 0!==n.length){for(i=0;i<n.length;i++)if(!1===e.call(t,n[i],i))return}else for(i in n)if(n.hasOwnProperty(i)&&!1===e.call(t,n[i],i))return}return{arrayRemove:function(n,e){var t=n.indexOf(e);t>-1&&n.splice(t,1)},evalOpts:function(n,e){return"function"==typeof n&&(e=Array.prototype.slice.call(arguments),n=n.apply(null,e.slice(1))),n},async:function(n,e){setTimeout(n.bind(e),0)},extend:function(n,e){return t(arguments,function(e){e!==n&&t(e,function(e,t){n[t]=e})}),n},each:t}});
//# sourceMappingURL=sourcemaps/utils.js.map
