/*
 Highcharts JS v7.0.2 (2019-01-17)

 (c) 2009-2019 Torstein Honsi

 License: www.highcharts.com/license
*/
(function(r){"object"===typeof module&&module.exports?(r["default"]=r,module.exports=r):"function"===typeof define&&define.amd?define(function(){return r}):r("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(r){(function(n){function r(d,c,a,g,e,f){d=(f-c)*(a-d)-(g-c)*(e-d);return 0<d?!0:!(0>d)}function v(d,c,a,g,e,f,b,h){return r(d,c,e,f,b,h)!==r(a,g,e,f,b,h)&&r(d,c,a,g,e,f)!==r(d,c,a,g,b,h)}function A(d,c,a,g,e,f,b,h){return v(d,c,d+a,c,e,f,b,h)||v(d+a,c,d+a,c+g,e,f,b,h)||v(d,c+g,d+a,
    c+g,e,f,b,h)||v(d,c,d,c+g,e,f,b,h)}function B(d){var c=this,a=Math.max(n.animObject(c.renderer.globalAnimation).duration,250);c.labelSeries=[];c.labelSeriesMaxSum=0;n.clearTimeout(c.seriesLabelTimer);c.series.forEach(function(g){var e=g.options.label,f=g.labelBySeries,b=f&&f.closest;e.enabled&&g.visible&&(g.graph||g.area)&&!g.isSeriesBoosting&&(c.labelSeries.push(g),e.minFontSize&&e.maxFontSize&&(g.sum=g.yData.reduce(function(a,b){return(a||0)+(b||0)},0),c.labelSeriesMaxSum=Math.max(c.labelSeriesMaxSum,
    g.sum)),"load"===d.type&&(a=Math.max(a,n.animObject(g.options.animation).duration)),b&&(void 0!==b[0].plotX?f.animate({x:b[0].plotX+b[1],y:b[0].plotY+b[2]}):f.attr({opacity:0})))});c.seriesLabelTimer=n.syncTimeout(function(){c.series&&c.labelSeries&&c.drawSeriesLabels()},c.renderer.forExport?0:a)}var C=n.addEvent,D=n.extend,x=n.isNumber,y=n.pick,w=n.Series,E=n.SVGRenderer,z=n.Chart;n.setOptions({plotOptions:{series:{label:{enabled:!0,connectorAllowed:!1,connectorNeighbourDistance:24,minFontSize:null,
    maxFontSize:null,onArea:null,style:{fontWeight:"bold"},boxesToAvoid:[]}}}});E.prototype.symbols.connector=function(d,c,a,g,e){var f=e&&e.anchorX;e=e&&e.anchorY;var b,h,l=a/2;x(f)&&x(e)&&(b=["M",f,e],h=c-e,0>h&&(h=-g-h),h<a&&(l=f<d+a/2?h:a-h),e>c+g?b.push("L",d+l,c+g):e<c?b.push("L",d+l,c):f<d?b.push("L",d,c+g/2):f>d+a&&b.push("L",d+a,c+g/2));return b||[]};w.prototype.getPointsOnGraph=function(){function d(a){var b=Math.round(a.plotX/8)+","+Math.round(a.plotY/8);u[b]||(u[b]=1,e.push(a))}if(this.xAxis||
    this.yAxis){var c=this.points,a,g,e=[],f,b,h,l;b=this.graph||this.area;h=b.element;var q=this.chart.inverted,t=this.xAxis;a=this.yAxis;var p=q?a.pos:t.pos,q=q?t.pos:a.pos,t=y(this.options.label.onArea,!!this.area),m=a.getThreshold(this.options.threshold),u={};if(this.getPointSpline&&h.getPointAtLength&&!t&&c.length<this.chart.plotSizeX/16){b.toD&&(g=b.attr("d"),b.attr({d:b.toD}));l=h.getTotalLength();for(f=0;f<l;f+=16)a=h.getPointAtLength(f),d({chartX:p+a.x,chartY:q+a.y,plotX:a.x,plotY:a.y});g&&b.attr({d:g});
    a=c[c.length-1];a.chartX=p+a.plotX;a.chartY=q+a.plotY;d(a)}else for(l=c.length,f=0;f<l;f+=1){a=c[f];g=c[f-1];a.chartX=p+a.plotX;a.chartY=q+a.plotY;t&&(a.chartCenterY=q+(a.plotY+y(a.yBottom,m))/2);if(0<f&&(b=Math.abs(a.chartX-g.chartX),h=Math.abs(a.chartY-g.chartY),b=Math.max(b,h),16<b))for(b=Math.ceil(b/16),h=1;h<b;h+=1)d({chartX:g.chartX+h/b*(a.chartX-g.chartX),chartY:g.chartY+h/b*(a.chartY-g.chartY),chartCenterY:g.chartCenterY+h/b*(a.chartCenterY-g.chartCenterY),plotX:g.plotX+h/b*(a.plotX-g.plotX),
    plotY:g.plotY+h/b*(a.plotY-g.plotY)});x(a.plotY)&&d(a)}return e}};w.prototype.labelFontSize=function(d,c){return d+this.sum/this.chart.labelSeriesMaxSum*(c-d)+"px"};w.prototype.checkClearPoint=function(d,c,a,g){var e=Number.MAX_VALUE,f=Number.MAX_VALUE,b,h,l=this.options.label.connectorAllowed,q=y(this.options.label.onArea,!!this.area),t=this.chart,p,m,u,r,n,k;for(n=0;n<t.boxesToAvoid.length;n+=1)if(m=t.boxesToAvoid[n],k=d+a.width,p=c,u=c+a.height,!(d>m.right||k<m.left||p>m.bottom||u<m.top))return!1;
    for(n=0;n<t.series.length;n+=1)if(p=t.series[n],m=p.interpolatedPoints,p.visible&&m){for(k=1;k<m.length;k+=1){if(m[k].chartX>=d-16&&m[k-1].chartX<=d+a.width+16){if(A(d,c,a.width,a.height,m[k-1].chartX,m[k-1].chartY,m[k].chartX,m[k].chartY))return!1;this===p&&!b&&g&&(b=A(d-16,c-16,a.width+32,a.height+32,m[k-1].chartX,m[k-1].chartY,m[k].chartX,m[k].chartY))}!l&&!b||this===p&&!q||(u=d+a.width/2-m[k].chartX,r=c+a.height/2-m[k].chartY,e=Math.min(e,u*u+r*r))}if(!q&&l&&this===p&&(g&&!b||e<Math.pow(this.options.label.connectorNeighbourDistance,
    2))){for(k=1;k<m.length;k+=1)b=Math.min(Math.pow(d+a.width/2-m[k].chartX,2)+Math.pow(c+a.height/2-m[k].chartY,2),Math.pow(d-m[k].chartX,2)+Math.pow(c-m[k].chartY,2),Math.pow(d+a.width-m[k].chartX,2)+Math.pow(c-m[k].chartY,2),Math.pow(d+a.width-m[k].chartX,2)+Math.pow(c+a.height-m[k].chartY,2),Math.pow(d-m[k].chartX,2)+Math.pow(c+a.height-m[k].chartY,2)),b<f&&(f=b,h=m[k]);b=!0}}return!g||b?{x:d,y:c,weight:e-(h?f:0),connectorPoint:h}:!1};z.prototype.drawSeriesLabels=function(){var d=this,c=this.labelSeries;
    d.boxesToAvoid=[];c.forEach(function(a){a.interpolatedPoints=a.getPointsOnGraph();(a.options.label.boxesToAvoid||[]).forEach(function(a){d.boxesToAvoid.push(a)})});d.series.forEach(function(a){function c(a,b,c){return a>m&&a<=m+v-c.width&&b>=r&&b<=r+x-c.height}if(a.xAxis||a.yAxis){var e,f,b,h=[],l,q,n=a.options.label,p=d.inverted,m=p?a.yAxis.pos:a.xAxis.pos,r=p?a.xAxis.pos:a.yAxis.pos,v=d.inverted?a.yAxis.len:a.xAxis.len,x=d.inverted?a.xAxis.len:a.yAxis.len,k=a.interpolatedPoints,w=y(n.onArea,!!a.area),
    p=a.labelBySeries;e=n.minFontSize;f=n.maxFontSize;if(a.visible&&!a.isSeriesBoosting&&k){p||(a.labelBySeries=p=d.renderer.label(a.name,0,-9999,"connector").addClass("highcharts-series-label highcharts-series-label-"+a.index+" "+(a.options.className||"")).css(D({color:w?d.renderer.getContrast(a.color):a.color},a.options.label.style)),e&&f&&p.css({fontSize:a.labelFontSize(e,f)}),p.attr({padding:0,opacity:d.renderer.forExport?1:0,stroke:a.color,"stroke-width":1,zIndex:3}).add().animate({opacity:1},{duration:200}));
    e=p.getBBox();e.width=Math.round(e.width);for(q=k.length-1;0<q;--q)w?(f=k[q].chartX-e.width/2,b=k[q].chartCenterY-e.height/2,c(f,b,e)&&(l=a.checkClearPoint(f,b,e))):(f=k[q].chartX+3,b=k[q].chartY-e.height-3,c(f,b,e)&&(l=a.checkClearPoint(f,b,e,!0)),l&&h.push(l),f=k[q].chartX+3,b=k[q].chartY+3,c(f,b,e)&&(l=a.checkClearPoint(f,b,e,!0)),l&&h.push(l),f=k[q].chartX-e.width-3,b=k[q].chartY+3,c(f,b,e)&&(l=a.checkClearPoint(f,b,e,!0)),l&&h.push(l),f=k[q].chartX-e.width-3,b=k[q].chartY-e.height-3,c(f,b,e)&&
    (l=a.checkClearPoint(f,b,e,!0))),l&&h.push(l);if(n.connectorAllowed&&!h.length&&!w)for(f=m+v-e.width;f>=m;f-=16)for(b=r;b<r+x-e.height;b+=16)(l=a.checkClearPoint(f,b,e,!0))&&h.push(l);if(h.length){if(h.sort(function(a,b){return b.weight-a.weight}),l=h[0],d.boxesToAvoid.push({left:l.x,right:l.x+e.width,top:l.y,bottom:l.y+e.height}),h=Math.sqrt(Math.pow(Math.abs(l.x-p.x),2),Math.pow(Math.abs(l.y-p.y),2)))n={opacity:d.renderer.forExport?1:0,x:l.x,y:l.y},k={opacity:1},10>=h&&(k={x:n.x,y:n.y},n={}),a.labelBySeries.attr(D(n,
    {anchorX:l.connectorPoint&&l.connectorPoint.plotX+m,anchorY:l.connectorPoint&&l.connectorPoint.plotY+r})).animate(k),a.options.kdNow=!0,a.buildKDTree(),a=a.searchPoint({chartX:l.x,chartY:l.y},!0),p.closest=[a,l.x-a.plotX,l.y-a.plotY]}else p&&(a.labelBySeries=p.destroy())}else p&&(a.labelBySeries=p.destroy())}})};C(z,"load",B);C(z,"redraw",B)})(r)});
    //# sourceMappingURL=series-label.js.map