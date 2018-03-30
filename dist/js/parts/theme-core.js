if(!_.theme_core){_.theme_core=1;(function($){var jH,wH,xH,CH;$.gH=function(a,b){var c=null===a||"boolean"==typeof a||""==a?window.NaN:+a;return(0,window.isNaN)(c)?a:$.Mq(c,b,void 0,void 0,void 0,void 0,void 0,void 0)};$.hH=function(){return $.gH(this.value)};$.iH=function(){return this.name||this.getData("id")};jH=function(){return this.x};$.kH=function(){return this.sourceColor};$.lH=function(){return $.Uk(this.sourceColor,.7,!0)};$.mH=function(){return $.Uk(this.sourceColor,.65,!0)};$.nH=function(){return $.Uk(this.sourceColor,.5,!0)};
$.oH=function(){return $.Uk(this.sourceColor,.85,!0)};$.pH=function(){return $.Qk(this.sourceColor)};$.qH=function(){return $.Pk(this.sourceColor)};$.rH=function(){return $.Uk($.Pk(this.sourceColor),.5,!0)};$.sH=function(){return $.Vk(this.sourceColor,1.5)};$.tH=function(){return $.Vk(this.sourceColor,1)};$.uH=function(){return $.Vk($.Pk(this.sourceColor),1.5)};$.vH=function(){return"High: "+$.gH(this.high)+"\nLow: "+$.gH(this.low)};
wH=function(){return"Open: "+$.gH(this.open)+"\nHigh: "+$.gH(this.high)+"\nLow: "+$.gH(this.low)+"\nClose: "+$.gH(this.close)};xH=function(){return $.Vk(this.sourceColor,1.5)};$.yH=function(){var a=this.chart,b=a.title();b=b&&b.enabled()&&b.text()?b.text():"";return(a.Ta()||"Anychart ")+" chart "+(b?" entitled "+b:"")};$.zH=function(){var a=this.chart,b=$.yH.apply(this);b+=", with "+a.yg("count")+" points. ";return b+="Min value is "+a.yg("min")+", max value is "+a.yg("max")+"."};
$.AH=function(){for(var a=this.chart,b=$.yH.call(this),c=a.am(),d={},e=0;e<c;e++){var g=a.Vh(e).hd();d.hasOwnProperty(g)?d[g]+=1:d[g]=1}b+=", with ";for(var h in d)b+=d[h]+" "+h+" series, ";b+=". ";d=a.bb();a=a.Wa();c=a.Ta();e=d.Ta();if("ordinal"==e){d=d.values();b+="Y-scale with "+d.length+" categories: ";for(e=0;e<d.length;e++)b+=d[e]+", ";b+=". "}else g=d.Jh(),d=d.ti(),"date-time"==e&&(g=$.Fq(g),d=$.Fq(d)),b+="Y-scale minimum value is "+g+" , maximum value is "+d+". ";if("ordinal"==c){a=a.values();
b+="X-scale with "+a.length+" categories: ";for(c=0;c<a.length;c++)b+=a[c]+", ";b+=". "}else g=a.Jh(),d=a.ti(),"date-time"==c&&(g=$.Fq(g),d=$.Fq(d)),b+="X-scale minimum value is "+g+" , maximum value is "+d+". ";return b};
$.BH=function(){for(var a=this.chart,b=$.yH.call(this),c=a.am(),d={},e=0;e<c;e++){var g=a.Vh(e).Ta();d.hasOwnProperty(g)?d[g]+=1:d[g]=1}b+=", with ";for(var h in d)b+=d[h]+" "+h+" series, ";b+=". ";d=a.bb();a=a.Wa();c=a.Ta();e=d.Ta();if("ordinal"==e){d=d.values();b+="Y-scale with "+d.length+" categories: ";for(e=0;e<d.length;e++)b+=d[e]+", ";b+=". "}else g=d.Jh(),d=d.ti(),"date-time"==e&&(g=$.Fq(g),d=$.Fq(d)),b+="Y-scale minimum value is "+g+", maximum value is "+d+". ";if("ordinal"==c){a=a.values();
b+="X-scale with "+a.length+" categories: ";for(c=0;c<a.length;c++)b+=a[c]+", ";b+=". "}else g=a.Jh(),d=a.ti(),"date-time"==c&&(g=$.Fq(g),d=$.Fq(d)),b+="X-scale minimum value is "+g+", maximum value is "+d+". ";return b};CH=function(a){switch(a.xScaleType){case "date-time":return $.Gq(a.x);default:return $.gH(a.x)}};
$.H("anychart.themes.defaultTheme",{palette:{type:"distinct",items:"#64b5f6 #1976d2 #ef6c00 #ffd54f #455a64 #96a6a6 #dd2c00 #00838f #00bfa5 #ffa000".split(" ")},hatchFillPalette:{items:"backward-diagonal forward-diagonal horizontal vertical dashed-backward-diagonal grid dashed-forward-diagonal dashed-horizontal dashed-vertical diagonal-cross diagonal-brick divot horizontal-brick vertical-brick checker-board confetti plaid solid-diamond zig-zag weave percent-05 percent-10 percent-20 percent-25 percent-30 percent-40 percent-50 percent-60 percent-70 percent-75 percent-80 percent-90".split(" ")},hatchFillPaletteFor3D:{items:"backward-diagonal forward-diagonal dashed-backward-diagonal grid dashed-forward-diagonal dashed-horizontal dashed-vertical diagonal-cross diagonal-brick divot horizontal-brick vertical-brick checker-board confetti plaid solid-diamond zig-zag weave percent-05 percent-10 percent-20 percent-25 percent-30 percent-40 percent-50 percent-60 percent-70 percent-75 percent-80 percent-90 horizontal vertical".split(" ")},
markerPalette:{items:"circle diamond square triangle-down triangle-up diagonal-cross pentagon cross v-line star5 star4 trapezium star7 star6 star10".split(" ")},defaultScaleSettings:{linear:{maxTicksCount:1E3,inverted:!1,maximum:null,minimum:null,minimumGap:.1,maximumGap:.1,softMinimum:null,softMaximum:null,alignMinimum:!0,alignMaximum:!0,ticks:{mode:"linear",base:0,explicit:null,minCount:4,maxCount:6,interval:window.NaN},minorTicks:{mode:"linear",base:0,explicit:null,count:5,interval:window.NaN},
stackMode:"none",stackDirection:"direct",stickToZero:!0},ordinal:{type:"ordinal",inverted:!1,names:[],ticks:{maxCount:100}},log:{type:"log",logBase:10,ticks:{mode:"log"},minorTicks:{mode:"log"}},dateTime:{type:"date-time",alignMinimum:!1,alignMaximum:!1,minimumGap:0,maximumGap:0,ticks:{count:4},minorTicks:{count:4}}},defaultFontSettings:{fontSize:13,fontFamily:"Verdana, Helvetica, Arial, sans-serif",fontColor:"#7c868e",textDirection:"ltr",fontOpacity:1,fontDecoration:"none",fontStyle:"normal",fontVariant:"normal",
fontWeight:"normal",letterSpacing:"normal",lineHeight:"normal",textIndent:0,vAlign:"top",hAlign:"start",wordWrap:"normal",wordBreak:"normal",textOverflow:"",selectable:!1,disablePointerEvents:!1,useHtml:!1},defaultBackground:{enabled:!1,fill:"#ffffff",stroke:"none",cornerType:"round",corners:0},defaultSeparator:{enabled:!1,fill:"#CECECE 0.3",width:"100%",height:1,margin:{top:5,right:0,bottom:5,left:0},orientation:"top",stroke:"none",zIndex:1},defaultLabelFactory:{enabled:!1,offsetX:0,offsetY:0,width:null,
height:null,clip:null,fontSize:12,minFontSize:8,maxFontSize:72,adjustFontSize:{width:!1,height:!1},anchor:"center",padding:4,rotation:0,format:$.hH,positionFormatter:$.hH},defaultMarkerFactory:{anchor:"center",size:6,offsetX:0,offsetY:0,rotation:0,positionFormatter:$.hH},defaultTitle:{enabled:!1,fontSize:16,text:"Title text",width:null,height:null,align:"center",hAlign:"center",padding:0,margin:0},defaultTooltip:{enabled:!0,title:{fontColor:"#ffffff",text:"",fontSize:14,rotation:0,align:"left",hAlign:"left",
orientation:"top",zIndex:1,background:{fill:"none",stroke:"none"}},contentInternal:{enabled:!0,fontSize:12,minFontSize:9,maxFontSize:13,fontColor:"#ffffff",hAlign:"left",text:"Tooltip Text",width:"100%",height:"100%",anchor:"left-top",offsetX:0,offsetY:0,position:"left-top",adjustFontSize:{width:!1,height:!1},padding:0,rotation:0,zIndex:1,background:{disablePointerEvents:!1,fill:"none",stroke:"none"}},fontSize:12,minFontSize:9,maxFontSize:13,fontColor:"#ffffff",text:"Tooltip Text",width:null,height:null,
adjustFontSize:{width:!1,height:!1},background:{enabled:!0,fill:"#212121 0.7",corners:3,zIndex:0,cornerType:"round"},offsetX:10,offsetY:10,padding:{top:5,right:10,bottom:5,left:10},valuePrefix:"",valuePostfix:"",position:"left-top",anchor:"left-top",hideDelay:0,titleFormat:$.hH,format:function(){return this.valuePrefix+$.gH(this.value)+this.valuePostfix},unionFormat:function(){return this.formattedValues.join("\n")},zIndex:0,allowLeaveChart:!0,allowLeaveScreen:!1,allowLeaveStage:!1},defaultAxis:{enabled:!0,
startAngle:0,drawLastLabel:!0,drawFirstLabel:!0,staggerMaxLines:2,staggerMode:!1,staggerLines:null,width:null,overlapMode:"no-overlap",stroke:"#CECECE",title:{padding:5,fontSize:13,text:"Axis title",fontColor:"#545f69",zIndex:35},labels:{enabled:!0,format:$.hH,zIndex:35},minorLabels:{fontSize:9,format:$.hH,zIndex:35},ticks:{enabled:!0,length:6,position:"outside",stroke:"#CECECE",zIndex:35},minorTicks:{enabled:!1,length:4,position:"outside",stroke:"#EAEAEA",zIndex:35},zIndex:35},defaultGridSettings:{enabled:!0,
isMinor:!1,drawFirstLine:!0,drawLastLine:!0,fill:function(){return this.palette.lc(this.index)},palette:["none"],stroke:"#CECECE",scale:1,zIndex:11},defaultMinorGridSettings:{isMinor:!0,stroke:"#EAEAEA",zIndex:10},defaultLineMarkerSettings:{enabled:!0,value:0,layout:null,stroke:{color:"#7c868e",thickness:2,opacity:1,dash:"",lineJoin:"miter",lineCap:"square"},zIndex:25.2,scale:1},defaultTextMarkerSettings:{enabled:!0,fontSize:12,value:0,anchor:"center",align:"center",layout:null,offsetX:0,offsetY:0,
text:"Text marker",width:null,height:null,zIndex:25.3,scale:1},defaultRangeMarkerSettings:{enabled:!0,from:0,to:0,layout:null,fill:"#c1c1c1 0.4",zIndex:25.1,scale:1},defaultLegend:{enabled:!1,vAlign:"bottom",fontSize:12,textOverflow:"...",itemsLayout:"horizontal",positionMode:"outside",itemsSpacing:15,items:null,itemsFormat:null,itemsSourceMode:"default",inverted:!1,hoverCursor:"pointer",iconTextSpacing:5,iconSize:15,width:null,height:null,position:"top",align:"center",padding:{top:0,right:10,bottom:10,
left:10},margin:0,title:{fontSize:15},paginator:{enabled:!0,fontSize:12,fontColor:"#545f69",orientation:"right",layout:"horizontal",padding:{top:0,right:0,bottom:0,left:5},margin:0,zIndex:30,buttonsSettings:{normal:{stroke:"#757575",fill:"#9e9e9e"},hover:{stroke:"#546e7a",fill:"#7c868e"},pushed:{stroke:"#7c868e",fill:"#9e9e9e"},disabled:{stroke:null,fill:"#e0e0e0"}}},titleFormat:null,tooltip:{enabled:!1,allowLeaveScreen:!0},drag:!1,maxWidth:null,maxHeight:null,zIndex:200},defaultCrosshairLabel:{x:0,
y:0,axisIndex:0,anchor:null,format:$.hH,enabled:!0,fontSize:12,minFontSize:8,maxFontSize:16,fontColor:"#ffffff",fontWeight:400,disablePointerEvents:!0,text:"Label text",background:{enabled:!0,disablePointerEvents:!0,fill:"#212121 0.7",corners:3,zIndex:0},padding:{top:5,right:10,bottom:5,left:10},width:null,height:null,offsetX:0,offsetY:0,adjustFontSize:{width:!1,height:!1},rotation:0},defaultCallout:{enabled:!0,orientation:"left",title:{enabled:!1},padding:0,margin:0,align:"center",labels:{enabled:!0,
vAlign:"middle",hAlign:"center",positionFormatter:$.hH,adjustFontSize:!1,connectorStroke:null}},defaultScroller:{enabled:!1,fill:"#f7f7f7",selectedFill:"#ddd",outlineStroke:"none",height:16,minHeight:null,maxHeight:null,autoHide:!1,orientation:"bottom",position:"after-axes",allowRangeChange:!0,thumbs:{enabled:!0,autoHide:!1,normal:{fill:"#E9E9E9",stroke:"#7c868e"},hovered:{fill:"#ffffff",stroke:"#757575"}},inverted:!1,zIndex:35},defaultLabelSettings:{enabled:!0,text:"Chart label",width:null,height:null,
anchor:"left-top",position:"left-top",offsetX:0,offsetY:0,minFontSize:8,maxFontSize:72,adjustFontSize:{width:!1,height:!1},rotation:0,zIndex:50},defaultButtonSettings:{padding:[3,5],normal:{background:{enabled:!0,stroke:"#dedede",fill:"#e7e7e7",corners:[0]},text:"Button",disablePointerEvents:!0,selectable:!1},hovered:{background:{stroke:"#cecece",fill:"#eee"}},pushed:{background:{stroke:"#d0d0d0",fill:"#d9d9d9"}}},defaultNoDataLabel:{padding:{},disablePointerEvents:!1,enabled:!1,background:{zIndex:0,
enabled:!1,visible:!1,disablePointerEvents:!1},fontFamily:"Arial",fontColor:"black",fontWeight:"bold",fontSize:15,position:"center",anchor:"center",zIndex:999999,text:"No data."},stageCredits:{text:"AnyChart",url:"https://www.anychart.com/?utm_source=registered",alt:"AnyChart - JavaScript Charts designed to be embedded and integrated{{anychart-version}}",imgAlt:"AnyChart - JavaScript Charts",logoSrc:"https://static.anychart.com/logo.png"},chart:{enabled:!0,padding:{top:10,right:20,bottom:15,left:10},
margin:0,autoRedraw:!0,background:{enabled:!0,zIndex:1},contextMenu:{fromTheme:!0,enabled:!0},title:{text:"Chart Title",padding:{top:0,right:0,bottom:10,left:0},zIndex:80,background:{zIndex:0}},animation:{enabled:!1,duration:1E3},interactivity:{hoverMode:"single",selectionMode:"multi-select",spotRadius:2,allowMultiSeriesSelection:!0,multiSelectOnClick:!1,unselectOnClickOutOfPoint:!0},tooltip:{displayMode:"single",positionMode:"float",title:{enabled:!0},separator:{enabled:!0},titleFormat:function(){return CH(this.points[0])},
format:function(){return this.formattedValues.join("\n")}},bounds:{top:null,right:null,bottom:null,left:null,width:null,height:null,minWidth:null,minHeight:null,maxWidth:null,maxHeight:null},credits:{},defaultSeriesSettings:{base:{enabled:!0,isVertical:null,background:{enabled:!0},tooltip:{titleFormat:function(){return CH(this)},format:function(){return this.seriesName+": "+this.valuePrefix+$.gH(this.value)+this.valuePostfix},zIndex:0},normal:{fill:$.mH,stroke:$.sH,lowStroke:$.sH,highStroke:$.sH,
hatchFill:!1,labels:{enabled:null,anchor:"auto",position:"value"},minLabels:{enabled:null},maxLabels:{enabled:null},outlierMarkers:{enabled:null},markers:{enabled:!1,disablePointerEvents:!1,position:"value",positionFormatter:$.hH,size:4}},hovered:{fill:$.kH,stroke:$.uH,lowStroke:$.uH,highStroke:$.uH,hatchFill:null,labels:{enabled:null},minLabels:{enabled:null},maxLabels:{enabled:null},outlierMarkers:{enabled:null},markers:{enabled:null,size:6}},selected:{fill:"#333 0.85",stroke:"#333 0.85",lowStroke:"#333 0.85",
highStroke:"#333 0.85",hatchFill:null,labels:{enabled:null},minLabels:{enabled:null},maxLabels:{enabled:null},outlierMarkers:{enabled:null},markers:{enabled:null,fill:"#333 0.85",stroke:"1.5 #212121",size:6}},legendItem:{enabled:!0,iconType:"square"},clip:!0,color:null,xScale:null,yScale:null,error:{mode:"both",xError:null,xUpperError:null,xLowerError:null,valueError:null,valueUpperError:null,valueLowerError:null,xErrorWidth:10,valueErrorWidth:10,xErrorStroke:$.pH,valueErrorStroke:$.pH},pointWidth:null,
connectMissingPoints:!1,a11y:{enabled:!1,titleFormat:"Series named {%SeriesName} with {%SeriesPointsCount} points. Min value is {%SeriesYMin}, max value is {%SeriesYMax}"}},marker:{normal:{fill:$.kH,stroke:xH,size:4,labels:{offsetY:3}},hovered:{fill:$.qH,stroke:xH,size:6},selected:{fill:"#333 0.85",stroke:"1.5 #212121",size:6},legendItem:{iconStroke:"none"}},bubble:{normal:{fill:$.lH,negativeFill:function(){return $.Qk($.Qk($.Qk(this.sourceColor)))},negativeStroke:function(){return $.Qk($.Qk($.Qk($.Qk(this.sourceColor))))},
negativeHatchFill:!1,labels:{anchor:"center"}},hovered:{fill:$.nH,negativeFill:function(){return $.Qk($.Qk($.Qk($.Qk(this.sourceColor))))},negativeStroke:function(){return $.Qk($.Qk($.Qk($.Qk($.Qk(this.sourceColor)))))},negativeHatchFill:null},selected:{negativeFill:function(){return $.Qk($.Qk($.Qk(this.sourceColor)))},negativeStroke:function(){return $.Qk($.Qk($.Qk($.Qk(this.sourceColor))))},negativeHatchFill:null},displayNegative:!1,legendItem:{iconStroke:"none"}},areaLike:{normal:{fill:$.mH},hovered:{fill:$.mH,
markers:{enabled:!0}},selected:{markers:{enabled:!0}},legendItem:{iconStroke:"none"},stepDirection:"center"},barLike:{normal:{fill:$.oH},hovered:{fill:$.mH},legendItem:{iconStroke:"none"}},lineLike:{hovered:{markers:{enabled:!0}},selected:{markers:{enabled:!0}},stepDirection:"center"},rangeLike:{normal:{labels:{format:function(){return $.gH(this.high)},position:"high"},markers:{position:"high"}},tooltip:{format:$.vH}},candlestick:{normal:{risingFill:"#64b5f6",risingStroke:"#64b5f6",fallingFill:"#ef6c00",
fallingStroke:"#ef6c00",risingHatchFill:!1,fallingHatchFill:!1,markers:{position:"high"},labels:{position:"high",format:jH}},hovered:{risingFill:$.qH,risingStroke:$.pH,fallingFill:$.qH,fallingStroke:$.pH,risingHatchFill:null,fallingHatchFill:null},selected:{risingFill:"#333 0.85",risingStroke:"#333 0.85",fallingFill:"#333 0.85",fallingStroke:"#333 0.85",risingHatchFill:null,fallingHatchFill:null},tooltip:{format:wH}},column:{isVertical:!1,normal:{labels:{offsetY:3}}},ohlc:{normal:{risingStroke:"#64b5f6",
fallingStroke:"#ef6c00",markers:{position:"high"},labels:{position:"high",format:jH}},hovered:{risingStroke:$.pH,fallingStroke:$.pH},selected:{risingStroke:"3 #333 0.85",fallingStroke:"3 #333 0.85"},tooltip:{format:wH}},stick:{normal:{stroke:$.tH}},jumpLine:{pointWidth:"100%"},hilo:{pointWidth:1}},chartLabels:[],maxBubbleSize:"20%",minBubbleSize:"5%",a11y:{enabled:!0,titleFormat:$.yH,mode:"chart-elements"},normal:{labels:{enabled:!1},minLabels:{enabled:null},maxLabels:{enabled:null}},hovered:{labels:{enabled:null},
minLabels:{enabled:null},maxLabels:{enabled:null}},selected:{labels:{enabled:null},minLabels:{enabled:null},maxLabels:{enabled:null}},crossing:{stroke:"none"},defaultQuarterSettings:{enabled:!1,zIndex:1,fill:"none",stroke:"none",title:{padding:5},defaultLabelSettings:{text:"Quarter label",anchor:"center",position:"center"},margin:{},padding:{}},quarters:{rightTop:{fill:"#e3f2fd",title:{orientation:"top"}},leftTop:{title:{orientation:"top"}},leftBottom:{fill:"#e3f2fd",title:{orientation:"bottom"}},
rightBottom:{title:{orientation:"bottom"}}},selectMarqueeFill:"#d3d3d3 0.4",selectMarqueeStroke:"#d3d3d3",maxPointWidth:"100%",minPointLength:0},cartesianBase:{defaultSeriesSettings:{base:{normal:{labels:{format:"{%Value}{decimalsCount:2}"}}},bar:{isVertical:!0,normal:{labels:{offsetY:3}},tooltip:{anchor:"left-top"}},column:{tooltip:{anchor:"left-top"}},rangeColumn:{isVertical:!1,tooltip:{anchor:"left-top",offsetX:10}},rangeBar:{normal:{labels:{offsetY:3}},isVertical:!0},box:{normal:{medianStroke:$.pH,
stemStroke:$.pH,whiskerStroke:$.pH,whiskerWidth:0,outlierMarkers:{enabled:!0,disablePointerEvents:!1,position:"center",rotation:0,anchor:"center",offsetX:0,offsetY:0,type:"circle",size:3,positionFormatter:$.hH},markers:{position:"median"},labels:{position:"highest",format:function(){return"Highest: "+$.gH(this.highest)+"\nMedian: "+$.gH(this.median)+"\nLowest: "+$.gH(this.lowest)}}},hovered:{medianStroke:$.kH,stemStroke:$.kH,whiskerStroke:$.pH,whiskerWidth:null,outlierMarkers:{enabled:null,size:4}},
selected:{medianStroke:"#333 0.85",stemStroke:"#333 0.85",whiskerStroke:"#333 0.85",whiskerWidth:null,outlierMarkers:{enabled:null,size:4,fill:"#333 0.85",stroke:"1.5 #212121"}},tooltip:{titleFormat:function(){return this.name||this.x},format:function(){return"Lowest: "+this.valuePrefix+$.gH(this.lowest)+this.valuePostfix+"\nQ1: "+this.valuePrefix+$.gH(this.q1)+this.valuePostfix+"\nMedian: "+this.valuePrefix+$.gH(this.median)+this.valuePostfix+"\nQ3: "+this.valuePrefix+$.gH(this.q3)+this.valuePostfix+
"\nHighest: "+this.valuePrefix+$.gH(this.highest)+this.valuePostfix}}}},defaultXAxisSettings:{orientation:"bottom",title:{text:"X-Axis",padding:{top:5,right:0,bottom:0,left:0}},labels:{format:function(){var a=this.tickValue;switch(this.scale.Ta()){case "ordinal":return this.value;case "date-time":var b=this.intervalUnit;return $.Fq(a,$.Dq($.Cq(b,b,"charts")));default:return $.Mq(this.value)}}},minorLabels:{format:function(){var a=this.tickValue;switch(this.scale.Ta()){case "ordinal":return this.value;
case "date-time":var b=this.minorIntervalUnit;return $.Fq(a,$.Dq($.Cq(b,$.Xn(b),"charts")));default:return $.Mq(this.value)}}},scale:0},defaultYAxisSettings:{orientation:"left",title:{text:"Y-Axis",padding:{top:0,right:0,bottom:5,left:0}},labels:{format:"{%Value}"},scale:1},defaultAnnotationSettings:{},annotations:{annotationsList:[],zIndex:2E3},xAxes:[{}],yAxes:[{}],xGrids:[],yGrids:[],xMinorGrids:[],yMinorGrids:[],series:[],lineAxesMarkers:[],rangeAxesMarkers:[],textAxesMarkers:[],xScale:0,yScale:1,
barsPadding:.4,barGroupsPadding:.8,maxBubbleSize:"20%",minBubbleSize:"5%",isVertical:!1,scales:[{type:"ordinal"},{type:"linear"}],crosshair:{enabled:!1,displayMode:"float",xStroke:"#969EA5",yStroke:"#969EA5",zIndex:41,xLabels:[{enabled:null}],yLabels:[{enabled:null}]},xZoom:{continuous:!0,startRatio:0,endRatio:1},a11y:{titleFormat:$.AH}},pieFunnelPyramidBase:{mode3d:!1,animation:{duration:500},normal:{fill:$.kH,stroke:"none",hatchFill:null,labels:{enabled:!0,fontColor:null,position:"inside",disablePointerEvents:!1,
autoRotate:!1,zIndex:34,format:function(){return this.name?this.name:this.x}},markers:{enabled:!1,position:"center",positionFormatter:$.hH,zIndex:33}},hovered:{fill:$.qH,stroke:$.kH,labels:{enabled:null},markers:{enabled:null}},selected:{fill:"#333 0.85",stroke:"1.5 #212121",labels:{enabled:null},markers:{enabled:null}},connectorStroke:"#CECECE",overlapMode:"no-overlap",connectorLength:20,baseWidth:"70%",neckWidth:null,neckHeight:null,pointsPadding:0,forceHoverLabels:!0,outsideLabels:{disablePointerEvents:!1,
autoColor:"#545f69"},insideLabels:{disablePointerEvents:!0,autoColor:"#ffffff"},legend:{enabled:!0,padding:{top:10,right:10,bottom:0,left:10},position:"bottom"},tooltip:{title:{enabled:!0},separator:{enabled:!0},titleFormat:function(){return this.name||this.x},format:function(){return"Value: "+$.gH(this.value)+"\nPercent Value: "+(100*this.value/this.getStat("sum")).toFixed(1)+"%"}},interactivity:{hoverMode:"single"}},defaultScrollBar:{barSize:10,backgroundFill:"#e0e0e0",backgroundStroke:"#d5d5d5",
sliderFill:"#d5d5d5",sliderStroke:"#656565",mouseOverOpacity:.45,mouseOutOpacity:.25,handlePositionChange:!0,startRatio:"0",endRatio:"1",buttonsVisible:!1,cornersRadius:5},standalones:{background:{enabled:!0,zIndex:0},label:{enabled:!0,text:"Label text",padding:0,width:null,height:null,anchor:"left-top",position:"left-top",offsetX:0,offsetY:0,minFontSize:8,maxFontSize:72,adjustFontSize:{width:!1,height:!1},rotation:0,zIndex:0},labelsFactory:{enabled:!0,zIndex:0},legend:{enabled:!0,zIndex:0},markersFactory:{enabled:!0,
zIndex:0},title:{enabled:!0,zIndex:0},linearAxis:{enabled:!0,zIndex:0,ticks:{enabled:!0},minorTicks:{enabled:!0}},polarAxis:{enabled:!0,startAngle:0,zIndex:0,ticks:{enabled:!0},minorTicks:{enabled:!0}},radarAxis:{enabled:!0,startAngle:0,zIndex:0,ticks:{enabled:!0},minorTicks:{enabled:!0}},radialAxis:{enabled:!0,startAngle:0,zIndex:0,ticks:{enabled:!0},minorTicks:{enabled:!0},minorLabels:{padding:{top:1,right:1,bottom:0,left:1}}},linearGrid:{enabled:!0,scale:null,zIndex:0},polarGrid:{enabled:!0,layout:"circuit",
zIndex:0},radarGrid:{enabled:!0,layout:"circuit",zIndex:0},lineAxisMarker:{enabled:!0,zIndex:0},textAxisMarker:{enabled:!0,zIndex:0},rangeAxisMarker:{enabled:!0,zIndex:0},scroller:{enabled:!0}}});}).call(this,$)}
