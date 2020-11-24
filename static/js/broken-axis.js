/*
 Highcharts JS v7.0.2 (2019-01-17)

 (c) 2009-2019 Torstein Honsi

 License: www.highcharts.com/license
*/
(function(f){"object"===typeof module&&module.exports?(f["default"]=f,module.exports=f):"function"===typeof define&&define.amd?define(function(){return f}):f("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(f){(function(g){var f=g.addEvent,n=g.pick,u=g.extend,v=g.isArray,r=g.fireEvent,m=g.Axis,t=g.Series;u(m.prototype,{isInBreak:function(b,c){var e=b.repeat||Infinity,d=b.from,a=b.to-b.from;c=c>=d?(c-d)%e:e-(d-c)%e;return b.inclusive?c<=a:c<a&&0!==c},isInAnyBreak:function(b,c){var e=this.options.breaks,
    d=e&&e.length,a,k,h;if(d){for(;d--;)this.isInBreak(e[d],b)&&(a=!0,k||(k=n(e[d].showPoints,!this.isXAxis)));h=a&&c?a&&!k:a}return h}});f(m,"afterInit",function(){"function"===typeof this.setBreaks&&this.setBreaks(this.options.breaks,!1)});f(m,"afterSetTickPositions",function(){if(this.isBroken){var b=this.tickPositions,c=this.tickPositions.info,e=[],d;for(d=0;d<b.length;d++)this.isInAnyBreak(b[d])||e.push(b[d]);this.tickPositions=e;this.tickPositions.info=c}});f(m,"afterSetOptions",function(){this.isBroken&&
    (this.options.ordinal=!1)});m.prototype.setBreaks=function(b,c){function e(b){var d=b,c,e;for(e=0;e<a.breakArray.length;e++)if(c=a.breakArray[e],c.to<=b)d-=c.len;else if(c.from>=b)break;else if(a.isInBreak(c,b)){d-=b-c.from;break}return d}function d(b){var c,d;for(d=0;d<a.breakArray.length&&!(c=a.breakArray[d],c.from>=b);d++)c.to<b?b+=c.len:a.isInBreak(c,b)&&(b+=c.len);return b}var a=this,k=v(b)&&!!b.length;a.isDirty=a.isBroken!==k;a.isBroken=k;a.options.breaks=a.userOptions.breaks=b;a.forceRedraw=
    !0;k||a.val2lin!==e||(delete a.val2lin,delete a.lin2val);k&&(a.userOptions.ordinal=!1,a.val2lin=e,a.lin2val=d,a.setExtremes=function(a,b,c,d,e){if(this.isBroken){for(;this.isInAnyBreak(a);)a-=this.closestPointRange;for(;this.isInAnyBreak(b);)b-=this.closestPointRange}m.prototype.setExtremes.call(this,a,b,c,d,e)},a.setAxisTranslation=function(b){m.prototype.setAxisTranslation.call(this,b);this.unitLength=null;if(this.isBroken){b=a.options.breaks;var c=[],d=[],e=0,k,f,h=a.userMin||a.min,g=a.userMax||
    a.max,q=n(a.pointRangePadding,0),l,p;b.forEach(function(b){f=b.repeat||Infinity;a.isInBreak(b,h)&&(h+=b.to%f-h%f);a.isInBreak(b,g)&&(g-=g%f-b.from%f)});b.forEach(function(a){l=a.from;for(f=a.repeat||Infinity;l-f>h;)l-=f;for(;l<h;)l+=f;for(p=l;p<g;p+=f)c.push({value:p,move:"in"}),c.push({value:p+(a.to-a.from),move:"out",size:a.breakSize})});c.sort(function(a,b){return a.value===b.value?("in"===a.move?0:1)-("in"===b.move?0:1):a.value-b.value});k=0;l=h;c.forEach(function(a){k+="in"===a.move?1:-1;1===
    k&&"in"===a.move&&(l=a.value);0===k&&(d.push({from:l,to:a.value,len:a.value-l-(a.size||0)}),e+=a.value-l-(a.size||0))});a.breakArray=d;a.unitLength=g-h-e+q;r(a,"afterBreaks");a.staticScale?a.transA=a.staticScale:a.unitLength&&(a.transA*=(g-a.min+q)/a.unitLength);q&&(a.minPixelPadding=a.transA*a.minPointOffset);a.min=h;a.max=g}});n(c,!0)&&this.chart.redraw()};f(t,"afterGeneratePoints",function(){var b=this.xAxis,c=this.yAxis,e=this.points,d,a=e.length,f=this.options.connectNulls,h;if(b&&c&&(b.options.breaks||
    c.options.breaks))for(;a--;)d=e[a],h=null===d.y&&!1===f,h||!b.isInAnyBreak(d.x,!0)&&!c.isInAnyBreak(d.y,!0)||(e.splice(a,1),this.data[a]&&this.data[a].destroyElements())});f(t,"afterRender",function(){this.drawBreaks(this.xAxis,["x"]);this.drawBreaks(this.yAxis,n(this.pointArrayMap,["y"]))});g.Series.prototype.drawBreaks=function(b,c){var e=this,d=e.points,a,f,h,g;b&&c.forEach(function(c){a=b.breakArray||[];f=b.isXAxis?b.min:n(e.options.threshold,b.min);d.forEach(function(d){g=n(d["stack"+c.toUpperCase()],
    d[c]);a.forEach(function(a){h=!1;if(f<a.from&&g>a.to||f>a.from&&g<a.from)h="pointBreak";else if(f<a.from&&g>a.from&&g<a.to||f>a.from&&g>a.to&&g<a.from)h="pointInBreak";h&&r(b,h,{point:d,brk:a})})})})};g.Series.prototype.gappedPath=function(){var b=this.currentDataGrouping,c=b&&b.totalRange,b=this.options.gapSize,e=this.points.slice(),d=e.length-1,a=this.yAxis;if(b&&0<d)for("value"!==this.options.gapUnit&&(b*=this.closestPointRange),c&&c>b&&(b=c);d--;)e[d+1].x-e[d].x>b&&(c=(e[d].x+e[d+1].x)/2,e.splice(d+
    1,0,{isNull:!0,x:c}),this.options.stacking&&(c=a.stacks[this.stackKey][c]=new g.StackItem(a,a.options.stackLabels,!1,c,this.stack),c.total=0));return this.getGraphPath(e)}})(f)});
    //# sourceMappingURL=broken-axis.js.map