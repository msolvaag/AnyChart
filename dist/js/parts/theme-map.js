if(!_.theme_map){_.theme_map=1;(function($){$.wa($.fa.anychart.themes.defaultTheme,{map:{defaultCalloutSettings:{},defaultSeriesSettings:{base:{normal:{fill:function(){return this.scaledColor||this.sourceColor},stroke:$.DG,hatchFill:!1,labels:{anchor:"center-bottom",enabled:null,adjustFontSize:{width:!0,height:!0},format:function(){return this.getData("name")?this.getData("name"):this.name?this.name:this.getData("id")?this.getData("id"):"lat: "+this.lat+"\nlong: "+this["long"]}},markers:{enabled:!1,disablePointerEvents:!1}},hovered:{fill:"#757575",
stroke:{thickness:.5,color:"#545f69"},labels:{enabled:null},markers:{enabled:null}},selected:{fill:"#333 0.85",stroke:{thickness:.5,color:"#545f69"},labels:{enabled:null},markers:{enabled:null}},color:null,tooltip:{titleFormat:function(){return this.name||this.getData("name")||"Tooltip title"},format:function(){return"Id: "+this.id+"\nValue: "+this.valuePrefix+$.uG(this.value)+this.valuePostfix}},xScale:null,yScale:null,a11y:{titleFormat:"Series named {%SeriesName}"},clip:!1},choropleth:{normal:{labels:{fontColor:"#212121",
anchor:"center"},markers:{anchor:null}},colorScale:{}},connector:{startSize:0,endSize:0,curvature:.3,normal:{stroke:function(){return{thickness:2,color:this.sourceColor,lineJoin:"round"}},markers:{position:"middle",enabled:!0,size:15,stroke:"1.5 #f7f7f7",rotation:null,anchor:null,type:"arrowhead"},labels:{enabled:!1,position:"middle",anchor:null,format:function(){return"from: "+this.startPoint.lat+","+this.startPoint["long"]+"\nto: "+this.endPoint.lat+","+this.endPoint["long"]}}},hovered:{stroke:$.EG,
markers:{stroke:"1.5 #f7f7f7",size:15}},selected:{stroke:"2 #333 0.85",markers:{fill:"#333 0.85",stroke:"1.5 #f7f7f7",size:15}},tooltip:{title:{enabled:!1},separator:{enabled:!1},format:function(){return"from: "+this.startPoint.lat+", "+this.startPoint["long"]+"\nto: "+this.endPoint.lat+", "+this.endPoint["long"]}}},bubble:{normal:{stroke:function(){return{thickness:2,color:$.Rl(this.sourceColor)}},labels:{anchor:"center"}},hovered:{fill:"#757575"},selected:{fill:"#333 0.85"},tooltip:{format:function(){var a;
a=this.id?"Id: "+this.id:"lat: "+this.lat+"\nlong: "+this["long"];this.size&&(a+="\nValue: "+this.valuePrefix+$.uG(this.size)+this.valuePostfix);return a}}},marker:{normal:{labels:{enabled:!0}},hovered:{labels:{fontWeight:"bold"}},selected:{labels:{fontWeight:"bold"}},tooltip:{format:function(){var a;a=this.id?"Id: "+this.id:"lat: "+this.lat+"\nlong: "+this["long"];this.value&&(a+="\nValue: "+this.valuePrefix+$.uG(this.value)+this.valuePostfix);return a}}}},colorRange:{zIndex:50},geoScale:{maxTicksCount:1E3,
precision:2},callouts:[],axesSettings:{enabled:!1,title:{padding:5,fontSize:13,text:"Axis title",fontColor:"#545f69",zIndex:10},labels:{enabled:!0,padding:2,rotation:null,fontSize:10,anchor:"auto",zIndex:5},minorLabels:{padding:2,rotation:null,fontSize:9,anchor:null,zIndex:4},overlapMode:"no-overlap",ticks:{enabled:!0,length:5,position:"outside",stroke:"#CECECE",zIndex:3},minorTicks:{enabled:!1,length:2,position:"outside",stroke:"#CECECE",zIndex:2},drawFirstLabel:!0,drawLastLabel:!0,stroke:"#CECECE"},
gridsSettings:{enabled:!1,minorStroke:"none",zIndex:5},crosshair:{enabled:!1,xStroke:"#969EA5",yStroke:"#969EA5",zIndex:110,xLabel:{axisIndex:2},yLabel:{axisIndex:3}},unboundRegions:{enabled:!0,fill:"#F7F7F7",stroke:"#e0e0e0"},maxBubbleSize:"20%",minBubbleSize:"5%",geoIdField:"id",interactivity:{copyFormat:function(a){a=a.seriesStatus;for(var b="",c=0,d=a.length;c<d;c++){var e=a[c];if(e.points.length){for(var b=b+("Series "+e.series.getIndex()+":\n"),f=0,h=e.points.length;f<h;f++){var k=e.points[f],
b=b+("id: "+k.id+" index: "+k.index);f!=h-1&&(b+="\n")}c!=d-1&&(b+="\n")}}return b||"no selected points"},drag:!0,zoomOnMouseWheel:!1,keyboardZoomAndMove:!0,zoomOnDoubleClick:!1},minZoomLevel:1,maxZoomLevel:10,overlapMode:"no-overlap",crsAnimation:{enabled:!0,duration:300},legend:{enabled:!1,tooltip:{contentInternal:{background:{disablePointerEvents:!1}}}}},choropleth:{},bubbleMap:{},markerMap:{},connector:{},seatMap:{}});}).call(this,$)}
