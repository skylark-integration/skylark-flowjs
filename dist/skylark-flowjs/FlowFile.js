/**
 * skylark-flowjs - A version of flowjs that ported to running on skylarkjs
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylark-integration/skylark-flowjs/
 * @license MIT
 */
define(["skylark-langx/langx","./flowjs","./utils","./FlowChunk"],function(e,t,s,i){"use strict";var r=s.each;function h(e,t,s){this.flowObj=e,this.bytes=null,this.file=t,this.name=t.fileName||t.name,this.size=t.size,this.relativePath=t.relativePath||t.webkitRelativePath||this.name,this.uniqueIdentifier=void 0===s?e.generateUniqueIdentifier(t):s,this.chunks=[],this.paused=!1,this.error=!1,this.averageSpeed=0,this.currentSpeed=0,this._lastProgressCallback=Date.now(),this._prevUploadedSize=0,this._prevProgress=0,this.bootstrap()}return h.prototype={measureSpeed:function(){var e=Date.now()-this._lastProgressCallback;if(e){var t=this.flowObj.opts.speedSmoothingFactor,s=this.sizeUploaded();this.currentSpeed=Math.max((s-this._prevUploadedSize)/e*1e3,0),this.averageSpeed=t*this.currentSpeed+(1-t)*this.averageSpeed,this._prevUploadedSize=s}},chunkEvent:function(e,t,s){switch(t){case"progress":if(Date.now()-this._lastProgressCallback<this.flowObj.opts.progressCallbacksInterval)break;this.measureSpeed(),this.flowObj.fire("fileProgress",this,e),this.flowObj.fire("progress"),this._lastProgressCallback=Date.now();break;case"error":this.error=!0,this.abort(!0),this.flowObj.fire("fileError",this,s,e),this.flowObj.fire("error",s,this,e);break;case"success":if(this.error)return;this.measureSpeed(),this.flowObj.fire("fileProgress",this,e),this.flowObj.fire("progress"),this._lastProgressCallback=Date.now(),this.isComplete()&&(this.currentSpeed=0,this.averageSpeed=0,this.flowObj.fire("fileSuccess",this,s,e));break;case"retry":this.flowObj.fire("fileRetry",this,e)}},pause:function(){this.paused=!0,this.abort()},resume:function(){this.paused=!1,this.flowObj.upload()},abort:function(e){this.currentSpeed=0,this.averageSpeed=0;var t=this.chunks;e&&(this.chunks=[]),r(t,function(e){"uploading"===e.status()&&(e.abort(),this.flowObj.uploadNextChunk())},this)},cancel:function(){this.flowObj.removeFile(this)},retry:function(){this.bootstrap(),this.flowObj.upload()},bootstrap:function(){"function"==typeof this.flowObj.opts.initFileFn&&this.flowObj.opts.initFileFn(this),this.abort(!0),this.error=!1,this._prevProgress=0;for(var e=this.flowObj.opts.forceChunkSize?Math.ceil:Math.floor,t=Math.max(e(this.size/this.flowObj.opts.chunkSize),1),s=0;s<t;s++)this.chunks.push(new i(this.flowObj,this,s))},progress:function(){if(this.error)return 1;if(1===this.chunks.length)return this._prevProgress=Math.max(this._prevProgress,this.chunks[0].progress()),this._prevProgress;var e=0;r(this.chunks,function(t){e+=t.progress()*(t.endByte-t.startByte)});var t=e/this.size;return this._prevProgress=Math.max(this._prevProgress,t>.9999?1:t),this._prevProgress},isUploading:function(){var e=!1;return r(this.chunks,function(t){if("uploading"===t.status())return e=!0,!1}),e},isComplete:function(){var e=!1;return r(this.chunks,function(t){var s=t.status();if("pending"===s||"uploading"===s||"reading"===s||1===t.preprocessState||1===t.readState)return e=!0,!1}),!e},sizeUploaded:function(){var e=0;return r(this.chunks,function(t){e+=t.sizeUploaded()}),e},timeRemaining:function(){if(this.paused||this.error)return 0;var e=this.size-this.sizeUploaded();return e&&!this.averageSpeed?Number.POSITIVE_INFINITY:e||this.averageSpeed?Math.floor(e/this.averageSpeed):0},getType:function(){return this.file.type&&this.file.type.split("/")[1]},getExtension:function(){return this.name.substr(2+(~-this.name.lastIndexOf(".")>>>0)).toLowerCase()}},t.FlowFile=h});
//# sourceMappingURL=sourcemaps/FlowFile.js.map
