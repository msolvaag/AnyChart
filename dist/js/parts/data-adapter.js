if(!_.data_adapter){_.data_adapter=1;(function($){var HQ=function(a){try{return a.b?a.b.responseText:""}catch(b){return""}},JQ=function(a,b,c,d,e,f,h,k,l){var m=IQ("fromXml",c,l);m&&(b=(0,$.qa)(JQ.b,void 0,b,c,l,m),$.hQ(a,b,d,e,f,h,k))},IQ=function(a,b,c){var d=$.dk.anychart;if(!d)return b&&b.call(c,500,"AnyChart in not present on the page."),null;d=d[a];return d?d:(b&&b.call(c,500,$.wa("anychart.%s is not available.",a)),null)},wfa=function(a){return[$.rQ(a)||null]},xfa=function(a){var b;try{b=a.b?a.b.responseXML:null}catch(c){b=null}return[$.dk.anychart.utils.xml2json(b).data]},
yfa=function(a){a=$.rQ(a);for(var b=a.feed.entry,c={title:a.feed.title.$t,rows:[]},d=0,e=b.length;d<e;d++){var f=b[d],h=f.gs$cell.$t,k=f.gs$cell.col-1,f=f.gs$cell.row-1;c.rows[f]||(c.rows[f]=[]);c.rows[f][k]=h}c.header=c.rows.shift();return[c,a]},zfa=function(a){return[HQ(a)]},KQ=function(a,b,c,d,e){e=e.target;if($.pQ(e)){try{var f=a(e)}catch(h){c&&c.call(d,500,h)}b.apply(d,f)}else c&&c.call(d,e.F,$.sQ(e))};$.dk.anychart.exports||$.ak(4,null,["Exporting"]);
JQ.b=function(a,b,c,d,e){e=e.target;if($.pQ(e)){try{var f=HQ(e),h=d(f)}catch(k){b&&b.call(c,500,k)}a?$.B(a)?(h.container(a),h.draw()):$.D(a)&&a.call(c,h):h.container()&&h.draw()}else b&&b.call(c,e.F,$.sQ(e))};$.F("anychart.fromXmlFile",JQ);$.F("anychart.fromJsonFile",function(a,b,c,d,e,f,h,k,l){var m=IQ("fromJson",c,l);m&&(b=(0,$.qa)(JQ.b,void 0,b,c,l,m),$.hQ(a,b,d,e,f,h,k))});
$.F("anychart.data.parseHtmlTable",function(a,b,c,d,e,f){var h=window.document.querySelector(a||"table");a=null;var k;if(h){d=d||"tr:first-child th";c=c||"td, th";b=b||"tr";a={};(e=h.querySelector(e||"caption"))&&(k=f?f.call(void 0,e):e.innerText);k&&(a.title=k);var l=h.querySelectorAll(d),m=[];e=null;d=0;for(k=l.length;d<k;d++){var p=l[d];p&&!e&&(e=$.Ge(p));m.push(f?f.call(void 0,p):p.innerText)}m.length&&(a.header=m);if((b=h.querySelectorAll(b))&&b.length){h=[];d=0;for(k=b.length;d<k;d++)if(m=b[d],
m!=e){l=[];if((m=m.querySelectorAll(c))&&m.length)for(var p=0,q=m.length;p<q;p++){var r=m[p];f?l.push(f.call(void 0,r)):l.push(r.innerText)}l.length&&h.push(l)}a.rows=h}}return a});$.F("anychart.data.loadJsonFile",function(a,b,c,d,e,f,h,k,l){b=(0,$.qa)(KQ,void 0,wfa,b,c,l);$.hQ(a,b,d,e,f,h,k)});$.F("anychart.data.loadXmlFile",function(a,b,c,d,e,f,h,k,l){b=(0,$.qa)(KQ,void 0,xfa,b,c,l);$.hQ(a,b,d,e,f,h,k)});
$.F("anychart.data.loadCsvFile",function(a,b,c,d,e,f,h,k,l){b=(0,$.qa)(KQ,void 0,zfa,b,c,l);$.hQ(a,b,d,e,f,h,k)});
$.F("anychart.data.loadGoogleSpreadsheet",function(a,b,c,d,e){b=(0,$.qa)(KQ,void 0,yfa,b,c,e);$.B(a)?(c=a,a="od6"):(c=a.key,a=$.n(a.sheet)?a.sheet:"od6");a=new $.FP("https://spreadsheets.google.com/feeds/cells/"+c+"/"+a+"/public/values");a.F.set("alt","json");c=Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^(0,$.jm)()).toString(36);a.F.set("zx",c);$.hQ(a.toString(),b,"GET",null,null,d)});}).call(this,$)}
