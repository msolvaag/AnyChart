if(!_.theme_core){_.theme_core=1;(function($){var wG,xG,JG,KG,OG;$.uG=function(a,b){var c=null===a||"boolean"==typeof a||""==a?window.NaN:+a;return(0,window.isNaN)(c)?a:$.sr(c,b,void 0,void 0,void 0,void 0,void 0,void 0)};$.vG=function(){return $.uG(this.value)};wG=function(){return $.uG(this.value,10)};xG=function(){return this.x};$.yG=function(){return this.sourceColor};$.zG=function(){return $.Ul(this.sourceColor,.7,!0)};$.AG=function(){return $.Ul(this.sourceColor,.65,!0)};$.BG=function(){return $.Ul(this.sourceColor,.5,!0)};
$.CG=function(){return $.Ul(this.sourceColor,.85,!0)};$.DG=function(){return $.Rl(this.sourceColor)};$.EG=function(){return $.Ql(this.sourceColor)};$.FG=function(){return $.Vl(this.sourceColor,1.5)};$.GG=function(){return $.Vl(this.sourceColor,1)};$.HG=function(){return $.Vl($.Ql(this.sourceColor),1.5)};$.IG=function(){return"High: "+$.uG(this.high)+"\nLow: "+$.uG(this.low)};JG=function(){return"Open: "+$.uG(this.open)+"\nHigh: "+$.uG(this.high)+"\nLow: "+$.uG(this.low)+"\nClose: "+$.uG(this.close)};
KG=function(){return $.Vl(this.sourceColor,1.5)};$.LG=function(){var a=this.chart,b=a.title(),b=b&&b.enabled()&&b.text()?b.text():"";return(a.Va()||"Anychart ")+" chart "+(b?" entitled "+b:"")};
$.MG=function(){for(var a=this.chart,b=$.LG.call(this),c=a.Ya.length,d={},e=0;e<c;e++){var f=a.Wi(e).Fc();d.hasOwnProperty(f)?d[f]+=1:d[f]=1}var b=b+", with ",h;for(h in d)b+=d[h]+" "+h+" series, ";b+=". ";d=a.bb();a=a.Qa();c=a.Va();e=d.Va();if("ordinal"==e){d=d.values();b+="Y-scale with "+d.length+" categories: ";for(e=0;e<d.length;e++)b+=d[e]+", ";b+=". "}else f=d.Qf(),d=d.yg(),"date-time"==e&&(f=$.or(f),d=$.or(d)),b+="Y-scale minimum value is "+f+" , maximum value is "+d+". ";if("ordinal"==c){a=
a.values();b+="X-scale with "+a.length+" categories: ";for(c=0;c<a.length;c++)b+=a[c]+", ";b+=". "}else f=a.Qf(),d=a.yg(),"date-time"==c&&(f=$.or(f),d=$.or(d)),b+="X-scale minimum value is "+f+" , maximum value is "+d+". ";return b};
$.NG=function(){for(var a=this.chart,b=$.LG.call(this),c=a.Ya.length,d={},e=0;e<c;e++){var f=a.Wi(e).Va();d.hasOwnProperty(f)?d[f]+=1:d[f]=1}var b=b+", with ",h;for(h in d)b+=d[h]+" "+h+" series, ";b+=". ";d=a.bb();a=a.Qa();c=a.Va();e=d.Va();if("ordinal"==e){d=d.values();b+="Y-scale with "+d.length+" categories: ";for(e=0;e<d.length;e++)b+=d[e]+", ";b+=". "}else f=d.Qf(),d=d.yg(),"date-time"==e&&(f=$.or(f),d=$.or(d)),b+="Y-scale minimum value is "+f+", maximum value is "+d+". ";if("ordinal"==c){a=
a.values();b+="X-scale with "+a.length+" categories: ";for(c=0;c<a.length;c++)b+=a[c]+", ";b+=". "}else f=a.Qf(),d=a.yg(),"date-time"==c&&(f=$.or(f),d=$.or(d)),b+="X-scale minimum value is "+f+", maximum value is "+d+". ";return b};OG=function(a){switch(a.xScaleType){case "date-time":return $.pr(a.x);default:return $.uG(a.x)}};
$.F("anychart.themes.defaultTheme",{palette:{type:"distinct",items:"#64b5f6 #1976d2 #ef6c00 #ffd54f #455a64 #96a6a6 #dd2c00 #00838f #00bfa5 #ffa000".split(" ")},hatchFillPalette:{items:"backward-diagonal forward-diagonal horizontal vertical dashed-backward-diagonal grid dashed-forward-diagonal dashed-horizontal dashed-vertical diagonal-cross diagonal-brick divot horizontal-brick vertical-brick checker-board confetti plaid solid-diamond zig-zag weave percent-05 percent-10 percent-20 percent-25 percent-30 percent-40 percent-50 percent-60 percent-70 percent-75 percent-80 percent-90".split(" ")},hatchFillPaletteFor3D:{items:"backward-diagonal forward-diagonal dashed-backward-diagonal grid dashed-forward-diagonal dashed-horizontal dashed-vertical diagonal-cross diagonal-brick divot horizontal-brick vertical-brick checker-board confetti plaid solid-diamond zig-zag weave percent-05 percent-10 percent-20 percent-25 percent-30 percent-40 percent-50 percent-60 percent-70 percent-75 percent-80 percent-90 horizontal vertical".split(" ")},
markerPalette:{items:"circle diamond square triangle-down triangle-up diagonal-cross pentagon cross v-line star5 star4 trapezium star7 star6 star10".split(" ")},defaultScaleSettings:{linear:{maxTicksCount:1E3,inverted:!1,maximum:null,minimum:null,minimumGap:.1,maximumGap:.1,softMinimum:null,softMaximum:null,ticks:{mode:"linear",base:0,explicit:null,minCount:4,maxCount:6,interval:window.NaN},minorTicks:{mode:"linear",base:0,explicit:null,count:5,interval:window.NaN},stackMode:"none",stackDirection:"direct",
stickToZero:!0},ordinal:{type:"ordinal",inverted:!1,names:[],ticks:{maxCount:100}},log:{type:"log",logBase:10,ticks:{mode:"log"},minorTicks:{mode:"log"}},dateTime:{type:"date-time",ticks:{count:4},minorTicks:{count:4}}},defaultFontSettings:{fontSize:13,fontFamily:"Verdana, Helvetica, Arial, sans-serif",fontColor:"#7c868e",textDirection:"ltr",fontOpacity:1,fontDecoration:"none",fontStyle:"normal",fontVariant:"normal",fontWeight:"normal",letterSpacing:"normal",lineHeight:"normal",textIndent:0,vAlign:"top",
hAlign:"start",wordWrap:"normal",wordBreak:"normal",textOverflow:"",selectable:!1,disablePointerEvents:!1,useHtml:!1},defaultBackground:{enabled:!1,fill:"#ffffff",stroke:"none",cornerType:"round",corners:0},defaultSeparator:{enabled:!1,fill:"#CECECE 0.3",width:"100%",height:1,margin:{top:5,right:0,bottom:5,left:0},orientation:"top",stroke:"none",zIndex:1},defaultLabelFactory:{enabled:!1,offsetX:0,offsetY:0,width:null,height:null,clip:null,fontSize:12,minFontSize:8,maxFontSize:72,adjustFontSize:{width:!1,
height:!1},anchor:"center",padding:4,rotation:0,format:$.vG,positionFormatter:$.vG},defaultMarkerFactory:{anchor:"center",size:6,offsetX:0,offsetY:0,rotation:0,positionFormatter:$.vG},defaultTitle:{enabled:!1,fontSize:16,text:"Title text",width:null,height:null,align:"center",hAlign:"center",padding:0,margin:0},defaultTooltip:{enabled:!0,title:{fontColor:"#ffffff",text:"",fontSize:14,rotation:0,align:"left",hAlign:"left",orientation:"top",zIndex:1,background:{fill:"none",stroke:"none"}},contentInternal:{enabled:!0,
fontSize:12,minFontSize:9,maxFontSize:13,fontColor:"#ffffff",hAlign:"left",text:"Tooltip Text",width:"100%",height:"100%",anchor:"left-top",offsetX:0,offsetY:0,position:"left-top",adjustFontSize:{width:!1,height:!1},padding:0,rotation:0,zIndex:1,background:{disablePointerEvents:!1,fill:"none",stroke:"none"}},fontSize:12,minFontSize:9,maxFontSize:13,fontColor:"#ffffff",text:"Tooltip Text",width:null,height:null,adjustFontSize:{width:!1,height:!1},background:{enabled:!0,fill:"#212121 0.7",corners:3,
zIndex:0,cornerType:"round"},offsetX:10,offsetY:10,padding:{top:5,right:10,bottom:5,left:10},valuePrefix:"",valuePostfix:"",position:"left-top",anchor:"left-top",hideDelay:0,titleFormat:$.vG,format:function(){return this.valuePrefix+$.uG(this.value)+this.valuePostfix},unionFormat:function(){return this.formattedValues.join("\n")},zIndex:0,allowLeaveChart:!0,allowLeaveScreen:!1,allowLeaveStage:!1},defaultAxis:{enabled:!0,startAngle:0,drawLastLabel:!0,drawFirstLabel:!0,staggerMaxLines:2,staggerMode:!1,
staggerLines:null,width:null,overlapMode:"no-overlap",stroke:"#CECECE",title:{padding:5,fontSize:13,text:"Axis title",fontColor:"#545f69",zIndex:35},labels:{enabled:!0,format:wG,zIndex:35},minorLabels:{fontSize:9,format:wG,zIndex:35},ticks:{enabled:!0,length:6,position:"outside",stroke:"#CECECE",zIndex:35},minorTicks:{enabled:!1,length:4,position:"outside",stroke:"#EAEAEA",zIndex:35},zIndex:35},defaultGridSettings:{enabled:!0,isMinor:!1,drawFirstLine:!0,drawLastLine:!0,fill:function(){return this.palette.pd(this.index)},
palette:["none"],stroke:"#CECECE",scale:1,zIndex:11},defaultMinorGridSettings:{isMinor:!0,stroke:"#EAEAEA",zIndex:10},defaultLineMarkerSettings:{enabled:!0,value:0,layout:null,stroke:{color:"#7c868e",thickness:2,opacity:1,dash:"",lineJoin:"miter",lineCap:"square"},zIndex:25.2,scale:1},defaultTextMarkerSettings:{enabled:!0,fontSize:12,value:0,anchor:"center",align:"center",layout:null,offsetX:0,offsetY:0,text:"Text marker",width:null,height:null,zIndex:25.3,scale:1},defaultRangeMarkerSettings:{enabled:!0,
from:0,to:0,layout:null,fill:"#c1c1c1 0.4",zIndex:25.1,scale:1},defaultLegend:{enabled:!1,vAlign:"bottom",fontSize:12,textOverflow:"...",itemsLayout:"horizontal",positionMode:"outside",itemsSpacing:15,items:null,itemsFormat:null,itemsSourceMode:"default",inverted:!1,hoverCursor:"pointer",iconTextSpacing:5,iconSize:15,width:null,height:null,position:"top",align:"center",padding:{top:0,right:10,bottom:10,left:10},margin:0,title:{fontSize:15},paginator:{enabled:!0,fontSize:12,fontColor:"#545f69",orientation:"right",
layout:"horizontal",padding:{top:0,right:0,bottom:0,left:5},margin:0,zIndex:30,buttonsSettings:{normal:{stroke:"#757575",fill:"#9e9e9e"},hover:{stroke:"#546e7a",fill:"#7c868e"},pushed:{stroke:"#7c868e",fill:"#9e9e9e"},disabled:{stroke:null,fill:"#e0e0e0"}}},titleFormat:null,tooltip:{enabled:!1,allowLeaveScreen:!0},drag:!1,maxWidth:null,maxHeight:null,zIndex:200},defaultCrosshairLabel:{x:0,y:0,axisIndex:0,anchor:null,format:$.vG,enabled:!0,fontSize:12,minFontSize:8,maxFontSize:16,fontColor:"#ffffff",
fontWeight:400,disablePointerEvents:!0,text:"Label text",background:{enabled:!0,disablePointerEvents:!0,fill:"#212121 0.7",corners:3,zIndex:0},padding:{top:5,right:10,bottom:5,left:10},width:null,height:null,offsetX:0,offsetY:0,adjustFontSize:{width:!1,height:!1},rotation:0},defaultCallout:{enabled:!0,orientation:"left",title:{enabled:!1},padding:0,margin:0,align:"center",labels:{enabled:!0,vAlign:"middle",hAlign:"center",positionFormatter:$.vG,adjustFontSize:!1,connectorStroke:null}},defaultScroller:{enabled:!1,
fill:"#f7f7f7",selectedFill:"#ddd",outlineStroke:"none",height:16,minHeight:null,maxHeight:null,autoHide:!1,orientation:"bottom",position:"after-axes",allowRangeChange:!0,thumbs:{enabled:!0,autoHide:!1,normal:{fill:"#E9E9E9",stroke:"#7c868e"},hovered:{fill:"#ffffff",stroke:"#757575"}},inverted:!1,zIndex:35},defaultLabelSettings:{enabled:!0,text:"Chart label",width:null,height:null,anchor:"left-top",position:"left-top",offsetX:0,offsetY:0,minFontSize:8,maxFontSize:72,adjustFontSize:{width:!1,height:!1},
rotation:0,zIndex:50},defaultNoDataLabel:{padding:{},disablePointerEvents:!1,enabled:!1,background:{zIndex:0,enabled:!1,visible:!1,disablePointerEvents:!1},fontFamily:"Arial",fontColor:"black",fontWeight:"bold",fontSize:15,position:"center",anchor:"center",zIndex:999999,text:"No data."},stageCredits:{text:"AnyChart",url:"https://www.anychart.com/?utm_source=registered",alt:"AnyChart - JavaScript Charts designed to be embedded and integrated{{anychart-version}}",imgAlt:"AnyChart - JavaScript Charts",
logoSrc:"https://static.anychart.com/logo.png"},chart:{enabled:!0,padding:{top:10,right:20,bottom:15,left:10},margin:0,background:{enabled:!0,zIndex:1},contextMenu:{fromTheme:!0,enabled:!0},title:{text:"Chart Title",padding:{top:0,right:0,bottom:10,left:0},zIndex:80,background:{zIndex:0}},animation:{enabled:!1,duration:1E3},interactivity:{hoverMode:"single",selectionMode:"multi-select",spotRadius:2,allowMultiSeriesSelection:!0},tooltip:{displayMode:"single",positionMode:"float",title:{enabled:!0},
separator:{enabled:!0},titleFormat:function(){return OG(this.points[0])},format:function(){return this.formattedValues.join("\n")}},bounds:{top:null,right:null,bottom:null,left:null,width:null,height:null,minWidth:null,minHeight:null,maxWidth:null,maxHeight:null},credits:{},defaultSeriesSettings:{base:{enabled:!0,isVertical:null,background:{enabled:!0},tooltip:{titleFormat:function(){return OG(this)},format:function(){return this.seriesName+": "+this.valuePrefix+$.uG(this.value)+this.valuePostfix},
zIndex:0},normal:{fill:$.AG,stroke:$.FG,lowStroke:$.FG,highStroke:$.FG,hatchFill:!1,labels:{enabled:null,anchor:"auto",position:"value"},markers:{enabled:!1,disablePointerEvents:!1,position:"value",positionFormatter:$.vG,size:4}},hovered:{fill:$.yG,stroke:$.HG,lowStroke:$.HG,highStroke:$.HG,hatchFill:null,labels:{enabled:null},markers:{enabled:null,size:6}},selected:{fill:"#333 0.85",stroke:"#333 0.85",lowStroke:"#333 0.85",highStroke:"#333 0.85",hatchFill:null,labels:{enabled:null},markers:{enabled:null,
fill:"#333 0.85",stroke:"1.5 #212121",size:6}},legendItem:{enabled:!0,iconType:"square"},clip:!0,color:null,xScale:null,yScale:null,error:{mode:"both",xError:null,xUpperError:null,xLowerError:null,valueError:null,valueUpperError:null,valueLowerError:null,xErrorWidth:10,valueErrorWidth:10,xErrorStroke:$.DG,valueErrorStroke:$.DG},pointWidth:null,connectMissingPoints:!1,a11y:{enabled:!1,titleFormat:"Series named {%SeriesName} with {%SeriesPointsCount} points. Min value is {%SeriesYMin}, max value is {%SeriesYMax}"}},
marker:{normal:{fill:$.yG,stroke:KG,size:4,labels:{offsetY:3}},hovered:{fill:$.EG,stroke:KG,size:6},selected:{fill:"#333 0.85",stroke:"1.5 #212121",size:6},legendItem:{iconStroke:"none"}},bubble:{normal:{fill:$.zG,negativeFill:function(){return $.Rl($.Rl($.Rl(this.sourceColor)))},negativeStroke:function(){return $.Rl($.Rl($.Rl($.Rl(this.sourceColor))))},negativeHatchFill:!1,labels:{anchor:"center"}},hovered:{fill:$.BG,negativeFill:function(){return $.Rl($.Rl($.Rl($.Rl(this.sourceColor))))},negativeStroke:function(){return $.Rl($.Rl($.Rl($.Rl($.Rl(this.sourceColor)))))},
negativeHatchFill:null},selected:{negativeFill:function(){return $.Rl($.Rl($.Rl(this.sourceColor)))},negativeStroke:function(){return $.Rl($.Rl($.Rl($.Rl(this.sourceColor))))},negativeHatchFill:null},displayNegative:!1,legendItem:{iconStroke:"none"}},areaLike:{normal:{fill:$.AG},hovered:{fill:$.AG,markers:{enabled:!0}},selected:{markers:{enabled:!0}},legendItem:{iconStroke:"none"},stepDirection:"center"},barLike:{normal:{fill:$.CG},hovered:{fill:$.AG},legendItem:{iconStroke:"none"}},lineLike:{hovered:{markers:{enabled:!0}},
selected:{markers:{enabled:!0}},stepDirection:"center"},rangeLike:{normal:{labels:{format:function(){return $.uG(this.high)},position:"high"},markers:{position:"high"}},tooltip:{format:$.IG}},candlestick:{normal:{risingFill:"#64b5f6",risingStroke:"#64b5f6",fallingFill:"#ef6c00",fallingStroke:"#ef6c00",risingHatchFill:!1,fallingHatchFill:!1,markers:{position:"high"},labels:{position:"high",format:xG}},hovered:{risingFill:$.EG,risingStroke:$.DG,fallingFill:$.EG,fallingStroke:$.DG,risingHatchFill:null,
fallingHatchFill:null},selected:{risingFill:"#333 0.85",risingStroke:"#333 0.85",fallingFill:"#333 0.85",fallingStroke:"#333 0.85",risingHatchFill:null,fallingHatchFill:null},tooltip:{format:JG}},column:{isVertical:!1,normal:{labels:{offsetY:3}}},ohlc:{normal:{risingStroke:"#64b5f6",fallingStroke:"#ef6c00",markers:{position:"high"},labels:{position:"high",format:xG}},hovered:{risingStroke:$.DG,fallingStroke:$.DG},selected:{risingStroke:"3 #333 0.85",fallingStroke:"3 #333 0.85"},tooltip:{format:JG}},
stick:{normal:{stroke:$.GG}},jumpLine:{pointWidth:"100%",maxPointWidth:"100%"},hilo:{pointWidth:1}},chartLabels:[],maxBubbleSize:"20%",minBubbleSize:"5%",a11y:{enabled:!0,titleFormat:$.LG,mode:"chart-elements"},normal:{labels:{enabled:!1}},hovered:{labels:{enabled:null}},selected:{labels:{enabled:null}},crossing:{stroke:"none"},defaultQuarterSettings:{enabled:!1,zIndex:1,fill:"none",stroke:"none",title:{padding:5},defaultLabelSettings:{text:"Quarter label",anchor:"center",position:"center"},margin:{},
padding:{}},quarters:{rightTop:{fill:"#e3f2fd",title:{orientation:"top"}},leftTop:{title:{orientation:"top"}},leftBottom:{fill:"#e3f2fd",title:{orientation:"bottom"}},rightBottom:{title:{orientation:"bottom"}}},selectMarqueeFill:"#d3d3d3 0.4",selectMarqueeStroke:"#d3d3d3",maxPointWidth:"90%",minPointLength:0},cartesianBase:{defaultSeriesSettings:{base:{normal:{outlierMarkers:{enabled:null},labels:{format:"{%Value}{decimalsCount:2}"}},hovered:{outlierMarkers:{enabled:null}},selected:{outlierMarkers:{enabled:null}}},
bar:{isVertical:!0,normal:{labels:{offsetY:3}},tooltip:{anchor:"left-top"}},column:{tooltip:{anchor:"left-top"}},rangeColumn:{isVertical:!1,tooltip:{anchor:"left-top",offsetX:10}},rangeBar:{normal:{labels:{offsetY:3}},isVertical:!0},box:{normal:{medianStroke:$.DG,stemStroke:$.DG,whiskerStroke:$.DG,whiskerWidth:0,outlierMarkers:{enabled:!0,disablePointerEvents:!1,position:"center",rotation:0,anchor:"center",offsetX:0,offsetY:0,type:"circle",size:3,positionFormatter:$.vG},markers:{position:"median"},
labels:{position:"highest",format:function(){return"Highest: "+$.uG(this.highest)+"\nMedian: "+$.uG(this.median)+"\nLowest: "+$.uG(this.lowest)}}},hovered:{medianStroke:$.yG,stemStroke:$.yG,whiskerStroke:$.DG,whiskerWidth:null,outlierMarkers:{enabled:null,size:4}},selected:{medianStroke:"#333 0.85",stemStroke:"#333 0.85",whiskerStroke:"#333 0.85",whiskerWidth:null,outlierMarkers:{enabled:null,size:4,fill:"#333 0.85",stroke:"1.5 #212121"}},tooltip:{titleFormat:function(){return this.name||this.x},
format:function(){return"Lowest: "+this.valuePrefix+$.uG(this.lowest)+this.valuePostfix+"\nQ1: "+this.valuePrefix+$.uG(this.q1)+this.valuePostfix+"\nMedian: "+this.valuePrefix+$.uG(this.median)+this.valuePostfix+"\nQ3: "+this.valuePrefix+$.uG(this.q3)+this.valuePostfix+"\nHighest: "+this.valuePrefix+$.uG(this.highest)+this.valuePostfix}}}},defaultXAxisSettings:{orientation:"bottom",title:{text:"X-Axis",padding:{top:5,right:0,bottom:0,left:0}},labels:{format:"{%Value}{decimalsCount:10}"},scale:0},
defaultYAxisSettings:{orientation:"left",title:{text:"Y-Axis",padding:{top:0,right:0,bottom:5,left:0}},labels:{format:"{%Value}{decimalsCount:10}"},scale:1},defaultAnnotationSettings:{},annotations:{annotationsList:[],zIndex:2E3},xAxes:[{}],yAxes:[{}],xGrids:[],yGrids:[],xMinorGrids:[],yMinorGrids:[],series:[],lineAxesMarkers:[],rangeAxesMarkers:[],textAxesMarkers:[],xScale:0,yScale:1,barsPadding:.4,barGroupsPadding:.8,maxBubbleSize:"20%",minBubbleSize:"5%",isVertical:!1,scales:[{type:"ordinal"},
{type:"linear"}],crosshair:{enabled:!1,displayMode:"float",xStroke:"#969EA5",yStroke:"#969EA5",zIndex:41},xZoom:{continuous:!0,startRatio:0,endRatio:1},a11y:{titleFormat:$.MG}},pieFunnelPyramidBase:{mode3d:!1,animation:{duration:500},normal:{fill:$.yG,stroke:"none",hatchFill:null,labels:{enabled:!0,fontColor:null,position:"inside",disablePointerEvents:!1,autoRotate:!1,zIndex:34,format:function(){return this.name?this.name:this.x}},markers:{enabled:!1,position:"center",positionFormatter:$.vG,zIndex:33}},
hovered:{fill:$.EG,stroke:$.yG,labels:{enabled:null},markers:{enabled:null}},selected:{fill:"#333 0.85",stroke:"1.5 #212121",labels:{enabled:null},markers:{enabled:null}},connectorStroke:"#CECECE",overlapMode:"no-overlap",connectorLength:20,baseWidth:"70%",neckWidth:null,neckHeight:null,pointsPadding:0,forceHoverLabels:!1,outsideLabels:{disablePointerEvents:!1,autoColor:"#545f69"},insideLabels:{disablePointerEvents:!0,autoColor:"#ffffff"},legend:{enabled:!0,padding:{top:10,right:10,bottom:0,left:10},
position:"bottom"},tooltip:{title:{enabled:!0},separator:{enabled:!0},titleFormat:function(){return this.name||this.x},format:function(){return"Value: "+$.uG(this.value)+"\nPercent Value: "+(100*this.value/this.getStat("sum")).toFixed(1)+"%"}},interactivity:{hoverMode:"single"}},defaultScrollBar:{barSize:10,backgroundFill:"#e0e0e0",backgroundStroke:"#d5d5d5",sliderFill:"#d5d5d5",sliderStroke:"#656565",mouseOverOpacity:.45,mouseOutOpacity:.25,handlePositionChange:!0,startRatio:"0",endRatio:"1",buttonsVisible:!1,
cornersRadius:5},defaultDataGrid:{isStandalone:!0,headerHeight:25,backgroundFill:"#fff",columnStroke:"#cecece",rowStroke:"#cecece",rowOddFill:"#fff",rowEvenFill:"#fff",rowFill:"#fff",hoverFill:"#F8FAFB",rowSelectedFill:"#ebf1f4",zIndex:5,editing:!1,editStructurePreviewFill:{color:"#4285F4",opacity:.2},editStructurePreviewStroke:{color:"#4285F4",thickness:2},editStructurePreviewDashStroke:{color:"#4285F4",dash:"4 4"},headerFill:"#f7f7f7",tooltip:{padding:5,title:{enabled:!0,fontSize:"14px",fontWeight:"normal",
fontColor:"#e5e5e5"},separator:{enabled:!0},format:function(){var a=this.name;return void 0!==a?a+"":""}},defaultColumnSettings:{width:90,buttonCursor:"pointer",cellTextSettings:{enabled:!0,wordBreak:"break-all",anchor:"left-top",vAlign:"middle",padding:{top:0,right:5,bottom:0,left:5},background:null,fontSize:11,disablePointerEvents:!0},depthPaddingMultiplier:0,collapseExpandButtons:!1,title:{enabled:!0,margin:0,vAlign:"middle",background:{enabled:!1}},format:function(){return""}},columns:[{width:50,
format:function(){var a=this.item.meta("index");return null!=a?a+1+"":""},title:{text:"#"}},{width:170,collapseExpandButtons:!0,depthPaddingMultiplier:15,format:function(){var a=this.name;return null!=a?a+"":""},title:{text:"Name"}}]},defaultTimeline:{isStandalone:!0,columnStroke:"#cecece",rowStroke:"#cecece",backgroundFill:"none",rowOddFill:"#fff",rowEvenFill:"#fff",rowFill:"#fff",hoverFill:"#F8FAFB",rowSelectedFill:"#ebf1f4",zIndex:5,headerHeight:70,editing:!1,connectorPreviewStroke:{color:"#545f69",
dash:"3 3"},editPreviewFill:{color:"#fff",opacity:1E-5},editPreviewStroke:{color:"#aaa",dash:"3 3"},editProgressFill:"#EAEAEA",editProgressStroke:"#545f69",editIntervalThumbFill:"#EAEAEA",editIntervalThumbStroke:"#545f69",editConnectorThumbFill:"#EAEAEA",editConnectorThumbStroke:"#545f69",editStructurePreviewFill:{color:"#4285F4",opacity:.2},editStructurePreviewStroke:{color:"#4285F4",thickness:2},editStructurePreviewDashStroke:{color:"#4285F4",dash:"4 4"},baseFill:"#7ec1f5",baseStroke:"#74b2e2",
progressFill:"#1976d2",progressStroke:{color:"#fff",opacity:1E-5},editStartConnectorMarkerType:"circle",editStartConnectorMarkerSize:10,editStartConnectorMarkerHorizontalOffset:0,editStartConnectorMarkerVerticalOffset:0,editFinishConnectorMarkerType:"circle",editFinishConnectorMarkerSize:10,editFinishConnectorMarkerHorizontalOffset:0,editFinishConnectorMarkerVerticalOffset:0,editIntervalWidth:3,baselineFill:"#d5ebfc",baselineStroke:"#bfd1e0",parentFill:"#455a64",parentStroke:"#2f3f46",milestoneFill:"#ffa000",
milestoneStroke:"#d26104",connectorFill:"#545f69",connectorStroke:"#545f69",selectedElementFill:"#ef6c00",selectedElementStroke:"#bc5704",selectedConnectorStroke:"2 #bc5704",baselineAbove:!1,tooltip:{padding:5,title:{enabled:!0,fontSize:"14px",fontWeight:"normal",fontColor:"#e5e5e5"},separator:{enabled:!0},zIndex:100,allowLeaveChart:!1},labels:{enabled:!0,anchor:"left-center",position:"right-center",padding:{top:3,right:5,bottom:3,left:5},vAlign:"middle",background:null,fontSize:11,zIndex:40,disablePointerEvents:!0},
markers:{anchor:"center-top",zIndex:50,type:"star5",fill:"#ff0",stroke:"2 red"},defaultLineMarkerSettings:{layout:"vertical",zIndex:1.5},defaultRangeMarkerSettings:{layout:"vertical",zIndex:1},defaultTextMarkerSettings:{layout:"vertical",zIndex:2},header:{backgroundFill:"#cecece",levelsSeparationStroke:"#cecece",topLevel:{tileFill:"#f7f7f7",tilesSeparationStroke:"#cecece",labels:{enabled:!0,anchor:"left-top",fontSize:10,vAlign:"middle",padding:{top:0,right:5,bottom:0,left:5},background:null,disablePointerEvents:!0}},
midLevel:{tileFill:"#f7f7f7",tilesSeparationStroke:"#cecece",labels:{enabled:!0,anchor:"left-top",fontSize:10,vAlign:"middle",padding:{top:0,right:5,bottom:0,left:5},background:null,disablePointerEvents:!0}},lowLevel:{tileFill:"#f7f7f7",tilesSeparationStroke:"#cecece",labels:{enabled:!0,anchor:"left-top",fontSize:10,vAlign:"middle",padding:{top:0,right:5,bottom:0,left:5},background:null,disablePointerEvents:!0}}}},standalones:{background:{enabled:!0,zIndex:0},label:{enabled:!0,text:"Label text",padding:0,
width:null,height:null,anchor:"left-top",position:"left-top",offsetX:0,offsetY:0,minFontSize:8,maxFontSize:72,adjustFontSize:{width:!1,height:!1},rotation:0,zIndex:0},labelsFactory:{enabled:!0,zIndex:0},legend:{enabled:!0,zIndex:0},markersFactory:{enabled:!0,zIndex:0},title:{enabled:!0,zIndex:0},linearAxis:{enabled:!0,zIndex:0,ticks:{enabled:!0},minorTicks:{enabled:!0}},polarAxis:{enabled:!0,startAngle:0,zIndex:0,ticks:{enabled:!0},minorTicks:{enabled:!0}},radarAxis:{enabled:!0,startAngle:0,zIndex:0,
ticks:{enabled:!0},minorTicks:{enabled:!0}},radialAxis:{enabled:!0,startAngle:0,zIndex:0,ticks:{enabled:!0},minorTicks:{enabled:!0},minorLabels:{padding:{top:1,right:1,bottom:0,left:1}}},linearGrid:{enabled:!0,scale:null,zIndex:0},polarGrid:{enabled:!0,layout:"circuit",zIndex:0},radarGrid:{enabled:!0,layout:"circuit",zIndex:0},lineAxisMarker:{enabled:!0,zIndex:0},textAxisMarker:{enabled:!0,zIndex:0},rangeAxisMarker:{enabled:!0,zIndex:0},scroller:{enabled:!0}}});}).call(this,$)}
