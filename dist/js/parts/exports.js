if(!_.exports){_.exports=1;(function($){var pP,qP,rP,tP,uP,efa,wP,xP,zP,AP,BP,CP,DP,EP,ffa,GP,HP,IP,KP,MP,ifa,LP,NP,jfa,QP,OP,PP,gfa,SP,WP,lfa,YP,UP,XP,ZP,VP,$P,aQ,cQ,dQ,eQ,bQ,fQ,nfa,qfa,ofa,jQ,lQ,qQ,mQ,kQ,nQ,oQ,tQ,vQ,wQ,xQ,yQ,zQ,AQ,BQ,CQ,oP,sP,vP,yP,sfa,JP;pP=function(a){if(oP[a])return oP[a];a=String(a);if(!oP[a]){var b=/function ([^\(]+)/.exec(a);oP[a]=b?b[1]:"[Anonymous]"}return oP[a]};
qP=function(a,b){var c=[];if($.Sa(b,a))c.push("[...circular reference...]");else if(a&&50>b.length){c.push(pP(a)+"(");for(var d=a.arguments,e=0;d&&e<d.length;e++){0<e&&c.push(", ");var f;f=d[e];switch(typeof f){case "object":f=f?"object":"null";break;case "string":break;case "number":f=String(f);break;case "boolean":f=f?"true":"false";break;case "function":f=(f=pP(f))?f:"[fn]";break;default:f=typeof f}40<f.length&&(f=f.substr(0,40)+"...");c.push(f)}b.push(a);c.push(")\n");try{c.push(qP(a.caller,b))}catch(h){c.push("[exception trying to get caller]\n")}}else a?
c.push("[...long stack...]"):c.push("[end]");return c.join("")};rP=function(a,b){var c;a&&(c=$.te("STYLE"),c.type="text/css",c.styleSheet?c.styleSheet.cssText=a:c.appendChild(window.document.createTextNode(String(a))),$.Ae($.ie("head",void 0,b)[0],c,0))};tP=function(){sP&&(window.document.body.removeChild(sP),sP=null)};
uP=function(a){var b;b=Error();if(Error.captureStackTrace)Error.captureStackTrace(b,a||uP),b=String(b.stack);else{try{throw b;}catch(c){b=c}b=(b=b.stack)?String(b):null}b||(b=qP(a||arguments.callee.caller,[]));return b};
efa=function(){if(sP){var a=sP,b=a.contentWindow;$.Kn?(vP=$.ea.open(),vP.document.write(b.document.documentElement.innerHTML),tP(),vP.onafterprint=function(){(0,window.setTimeout)(function(){vP.close()},0)},(0,window.setTimeout)(function(){vP.focus();vP.print()},0)):$.Lc?(0,window.setTimeout)(function(){$.Ve(a,"visibility","");b.onafterprint=tP;b.focus();b.print()},0):($.Ai(tP,6),b.focus(),b.print())}};
wP=function(){if(!sP){var a=window.document.createElement("iframe");sP=a;$.Ve(a,{visibility:"hidden",position:"fixed",right:0,bottom:0});window.document.body.appendChild(a);for(var b=$.Yi(),c,d=0,e=b.length;d<e;d++)if(c=b[d],5==c.type){var f="";c.cssText?f=c.cssText:c.style&&c.style.cssText&&c.selectorText&&(f=c.style.cssText.replace(/\s*-closure-parent-stylesheet:\s*\[object\];?\s*/gi,"").replace(/\s*-closure-rule-index:\s*[\d]+;?\s*/gi,""),f=c.selectorText+" { "+f+" }");rP(f,a.contentWindow.document)}rP("body{padding:0;margin:0;height:100%;}@page {size: auto; margin: 0; padding:0}",
a.contentWindow.document)}return sP};xP=function(a){if(a instanceof $.Td)return a;a=$.Wd(a);var b;b=$.Ud(a);b=$.za(b.replace(/  /g," &#160;"),void 0);return $.Vd(b,a.Rv())};
zP=function(a,b,c){$.n(c)||(c="a4");c=yP[c];$.n(a)&&$.n(b)?$.B(a)&&$.na(b)?(a=a.toLowerCase(),(a=yP[a])&&(b?c={width:a.height,height:a.width}:c=a)):(c.width=String(a),c.height=String(b)):$.n(a)&&(a=yP[String(a)])&&(c=a);$.ua(c.width,"px")||$.ua(c.width,"mm")||(c.width+="px");$.ua(c.height,"px")||$.ua(c.height,"mm")||(c.height+="px");return c};
AP=function(a){if(a.lo&&"function"==typeof a.lo)return a.lo();if(!a.jn||"function"!=typeof a.jn){if($.ka(a)||$.B(a)){var b=[];a=a.length;for(var c=0;c<a;c++)b.push(c);return b}return $.rc(a)}};BP=function(a){if(a.jn&&"function"==typeof a.jn)return a.jn();if($.B(a))return a.split("");if($.ka(a)){for(var b=[],c=a.length,d=0;d<c;d++)b.push(a[d]);return b}return $.qc(a)};
CP=function(a,b){if(a.forEach&&"function"==typeof a.forEach)a.forEach(b,void 0);else if($.ka(a)||$.B(a))(0,$.Na)(a,b,void 0);else for(var c=AP(a),d=BP(a),e=d.length,f=0;f<e;f++)b.call(void 0,d[f],c&&c[f],a)};DP=function(a,b,c){var d={};b="object"==$.ja(b)?b:null;$.pc(a,function(a,f){d[f]=b?$.n(b[f])?b[f]:void 0:a;$.n(c)&&(d[f]=d[f]||c[f])});return d};EP=function(a){return a.contentDocument||a.contentWindow.document};
ffa=function(a,b){if(a)for(var c=a.split("&"),d=0;d<c.length;d++){var e=c[d].indexOf("="),f,h=null;0<=e?(f=c[d].substring(0,e),h=c[d].substring(e+1)):f=c[d];b(f,h?(0,window.decodeURIComponent)(h.replace(/\+/g," ")):"")}};
$.FP=function(a,b){this.B=this.K=this.j="";this.I=null;this.o=this.b="";this.g=!1;var c;a instanceof $.FP?(this.g=$.n(b)?b:a.g,GP(this,a.j),this.K=a.K,this.B=a.B,HP(this,a.I),this.b=a.b,IP(this,a.F.clone()),this.o=a.o):a&&(c=String(a).match(JP))?(this.g=!!b,GP(this,c[1]||"",!0),this.K=KP(c[2]||""),this.B=KP(c[3]||"",!0),HP(this,c[4]),this.b=KP(c[5]||"",!0),IP(this,c[6]||"",!0),this.o=KP(c[7]||"")):(this.g=!!b,this.F=new LP(null,0,this.g))};
GP=function(a,b,c){a.j=c?KP(b,!0):b;a.j&&(a.j=a.j.replace(/:$/,""))};HP=function(a,b){if(b){b=Number(b);if((0,window.isNaN)(b)||0>b)throw Error("Bad port number "+b);a.I=b}else a.I=null};IP=function(a,b,c){b instanceof LP?(a.F=b,gfa(a.F,a.g)):(c||(b=MP(b,hfa)),a.F=new LP(b,0,a.g))};KP=function(a,b){return a?b?(0,window.decodeURI)(a.replace(/%25/g,"%2525")):(0,window.decodeURIComponent)(a):""};
MP=function(a,b,c){return $.B(a)?(a=(0,window.encodeURI)(a).replace(b,ifa),c&&(a=a.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),a):null};ifa=function(a){a=a.charCodeAt(0);return"%"+(a>>4&15).toString(16)+(a&15).toString(16)};LP=function(a,b,c){this.g=this.b=null;this.F=a||null;this.j=!!c};NP=function(a){a.b||(a.b=new $.Nx,a.g=0,a.F&&ffa(a.F,function(b,c){a.add((0,window.decodeURIComponent)(b.replace(/\+/g," ")),c)}))};
jfa=function(a){var b=AP(a);if("undefined"==typeof b)throw Error("Keys are undefined");var c=new LP(null,0,void 0);a=BP(a);for(var d=0;d<b.length;d++){var e=b[d],f=a[d];$.y(f)?OP(c,e,f):c.add(e,f)}return c};QP=function(a,b){NP(a);b=PP(a,b);return $.Ox(a.b.g,b)};OP=function(a,b,c){a.remove(b);0<c.length&&(a.F=null,a.b.set(PP(a,b),$.$a(c)),a.g+=c.length)};PP=function(a,b){var c=String(b);a.j&&(c=c.toLowerCase());return c};
gfa=function(a,b){b&&!a.j&&(NP(a),a.F=null,a.b.forEach(function(a,b){var c=b.toLowerCase();b!=c&&(this.remove(b),OP(this,c,a))},a));a.j=b};SP=function(){$.Se.call(this);this.ef="closure_frame"+kfa++;this.g=[];RP[this.ef]=this};
WP=function(a,b){var c=new SP;$.ed(c,"ready",c.Rc,!1,c);if(c.Ip)throw Error("[goog.net.IframeIo] Unable to send, already active.");var d=new $.FP(a);c.JT=d;if(!TP){TP=$.te("FORM");TP.acceptCharset="utf-8";var e=TP.style;e.position="absolute";e.visibility="hidden";e.top=e.left="-10px";e.width=e.height="10px";e.overflow="hidden";window.document.body.appendChild(TP)}c.yh=TP;b&&lfa(c.yh,b);c.yh.action=d.toString();c.yh.method="POST";c.Ip=!0;c.At=c.ef+"_"+(c.tba++).toString(36);d={name:c.At,id:c.At};$.Lc&&
7>Number($.Fc)&&(d.src='javascript:""');c.Ai=$.ee(c.yh).Lb("IFRAME",d);d=c.Ai.style;d.visibility="hidden";d.width=d.height="10px";d.display="none";$.Uc?d.marginTop=d.marginLeft="-10px":(d.position="absolute",d.top=d.left="-10px");if($.Lc&&!$.Gc("11")){c.yh.target=c.At||"";$.ee(c.yh).b.body.appendChild(c.Ai);$.ed(c.Ai,"readystatechange",c.XL,!1,c);try{c.b=!1,c.yh.submit()}catch(S){$.qd(c.Ai,"readystatechange",c.XL,!1,c),UP(c)}}else{$.ee(c.yh).b.body.appendChild(c.Ai);var d=c.At+"_inner",e=EP(c.Ai),
f;window.document.baseURI?(f=$.Aa(d),$.Bd("Short HTML snippet, input escaped, safe URL, for performance"),f='<head><base href="'+$.Aa(window.document.baseURI)+'"></head><body><iframe id="'+f+'" name="'+f+'"></iframe>',f=$.Vd(f,null)):(f=$.Aa(d),$.Bd("Short HTML snippet, input escaped, for performance"),f=$.Vd('<body><iframe id="'+f+'" name="'+f+'"></iframe>',null));$.Xe&&!$.Uc?e.documentElement.innerHTML=$.Ud(f):e.write($.Ud(f));$.ed(e.getElementById(d),"load",c.nF,!1,c);var h=$.ge("TEXTAREA",c.yh);
f=0;for(var k=h.length;f<k;f++){var l=h[f].value;$.Le(h[f])!=l&&($.Ie(h[f],l),h[f].value=l)}h=e.importNode(c.yh,!0);h.target=d;h.action=c.yh.action;e.body.appendChild(h);var l=$.ge("SELECT",c.yh),m=$.ge("SELECT",h);f=0;for(k=l.length;f<k;f++)for(var p=$.ge("OPTION",l[f]),q=$.ge("OPTION",m[f]),r=0,t=p.length;r<t;r++)q[r].selected=p[r].selected;l=$.ge("INPUT",c.yh);m=$.ge("INPUT",h);f=0;for(k=l.length;f<k;f++)if("file"==l[f].type&&l[f].value!=m[f].value){c.yh.target=d;h=c.yh;break}try{c.b=!1,h.submit(),
e.close(),$.Kc&&$.Ai(c.NW,250,c)}catch(S){var u;try{var v;var w=$.ga("window.location.href");if($.B(S))v={message:S,name:"Unknown error",lineNumber:"Not available",fileName:w,stack:"Not available"};else{var x,z;f=!1;try{x=S.lineNumber||S.bc||"Not available"}catch(Y){x="Not available",f=!0}try{z=S.fileName||S.filename||S.sourceURL||$.ea.$googDebugFname||w}catch(Y){z="Not available",f=!0}v=!f&&S.lineNumber&&S.fileName&&S.stack&&S.message&&S.name?S:{message:S.message||"Not available",name:S.name||"UnknownError",
lineNumber:x,fileName:z,stack:S.stack||"Not available"}}var E;var N=v.fileName;null!=N||(N="");if(/^https?:\/\//i.test(N)){var Q=$.Od(N);$.Bd("view-source scheme plus HTTP/HTTPS URL");var O="view-source:"+$.Md(Q);E=$.Nd(O)}else{var V=$.Bd("sanitizedviewsrc");E=$.Nd($.Ad(V))}u=$.Yd(xP("Message: "+v.message+"\nUrl: "),$.Zd("a",{href:E,target:"_new"},v.fileName),xP("\nLine: "+v.lineNumber+"\n\nBrowser stack:\n"+v.stack+"-> [end]\n\nJS stack traversal:\n"+uP(void 0)+"-> "))}catch(Y){u=xP("Exception trying to expose exception! You win, we lose. "+
Y)}$.Ud(u);$.qd(e.getElementById(d),"load",c.nF,!1,c);e.close();UP(c)}}VP(c)};lfa=function(a,b){var c=$.ee(a);CP(b,function(b,e){$.y(b)||(b=[b]);(0,$.Na)(b,function(b){b=c.Lb("INPUT",{type:"hidden",name:e,value:b});a.appendChild(b)})})};YP=function(a,b){a.Ip=!1;var c;try{var d=b.body;a.uU=d.textContent||d.innerText}catch(e){c=1}c||"function"!=typeof a.F||(d=a.F(b))&&(c=4);c?UP(a):(a.dispatchEvent("complete"),a.dispatchEvent("success"),XP(a))};
UP=function(a){a.b||(a.Ip=!1,a.dispatchEvent("complete"),a.dispatchEvent("error"),XP(a),a.b=!0)};XP=function(a){ZP(a);VP(a);a.yh=null;a.dispatchEvent("ready")};ZP=function(a){var b=a.Ai;b&&(b.onreadystatechange=null,b.onload=null,b.onerror=null,a.g.push(b));a.zt&&($.Bi(a.zt),a.zt=null);$.Kc||$.Xe&&!$.Uc?a.zt=$.Ai(a.pS,2E3,a):a.pS();a.Ai=null;a.At=null};VP=function(a){a.yh&&a.yh==TP&&$.ze(a.yh)};$P=function(a){return a.Ai?$.Lc&&!$.Gc("11")?a.Ai:EP(a.Ai).getElementById(a.At+"_inner"):null};aQ=function(){};
cQ=function(a){var b;(b=a.b)||(b={},bQ(a)&&(b[0]=!0,b[1]=!0),b=a.b=b);return b};dQ=function(){};eQ=function(a){return(a=bQ(a))?new window.ActiveXObject(a):new window.XMLHttpRequest};
bQ=function(a){if(!a.g&&"undefined"==typeof window.XMLHttpRequest&&"undefined"!=typeof window.ActiveXObject){for(var b=["MSXML2.XMLHTTP.6.0","MSXML2.XMLHTTP.3.0","MSXML2.XMLHTTP","Microsoft.XMLHTTP"],c=0;c<b.length;c++){var d=b[c];try{return new window.ActiveXObject(d),a.g=d}catch(e){}}throw Error("Could not create ActiveXObject. ActiveX might be disabled, or MSXML might not be installed");}return a.g};
fQ=function(a){$.Se.call(this);this.headers=new $.Nx;this.wa=a||null;this.g=!1;this.P=this.b=null;this.ia=this.U="";this.F=0;this.B="";this.j=this.$=this.I=this.R=!1;this.o=0;this.K=null;this.ga=mfa;this.ea=this.ba=!1};$.hQ=function(a,b,c,d,e,f,h){var k=new fQ;gQ.push(k);b&&k.pa("complete",b);k.Sd("ready",k.W7);f&&(k.o=Math.max(0,f));h&&(k.ba=h);nfa(k,a,c,d,e)};
nfa=function(a,b,c,d,e){if(a.b)throw Error("[goog.net.XhrIo] Object is active with another request="+a.U+"; newUri="+b);c=c?c.toUpperCase():"GET";a.U=b;a.B="";a.F=0;a.ia=c;a.R=!1;a.g=!0;a.b=a.wa?eQ(a.wa):eQ(iQ);a.P=a.wa?cQ(a.wa):cQ(iQ);a.b.onreadystatechange=(0,$.qa)(a.dV,a);try{a.$=!0,a.b.open(c,String(b),!0),a.$=!1}catch(h){jQ(a,h);return}b=d||"";var f=a.headers.clone();e&&CP(e,function(a,b){f.set(b,a)});e=$.Qa(f.lo(),ofa);d=$.ea.FormData&&b instanceof $.ea.FormData;!$.Sa(pfa,c)||e||d||f.set("Content-Type",
"application/x-www-form-urlencoded;charset=utf-8");f.forEach(function(a,b){this.b.setRequestHeader(b,a)},a);a.ga&&(a.b.responseType=a.ga);"withCredentials"in a.b&&a.b.withCredentials!==a.ba&&(a.b.withCredentials=a.ba);try{kQ(a),0<a.o&&(a.ea=qfa(a.b),a.ea?(a.b.timeout=a.o,a.b.ontimeout=(0,$.qa)(a.SW,a)):a.K=$.Ai(a.SW,a.o,a)),a.I=!0,a.b.send(b),a.I=!1}catch(h){jQ(a,h)}};qfa=function(a){return $.Lc&&$.Gc(9)&&$.C(a.timeout)&&$.n(a.ontimeout)};ofa=function(a){return $.va("Content-Type",a)};
jQ=function(a,b){a.g=!1;a.b&&(a.j=!0,a.b.abort(),a.j=!1);a.B=b;a.F=5;lQ(a);mQ(a)};lQ=function(a){a.R||(a.R=!0,a.dispatchEvent("complete"),a.dispatchEvent("error"))};qQ=function(a){if(a.g&&"undefined"!=typeof $.zy&&(!a.P[1]||4!=nQ(a)||2!=oQ(a)))if(a.I&&4==nQ(a))$.Ai(a.dV,0,a);else if(a.dispatchEvent("readystatechange"),4==nQ(a)){a.g=!1;try{if($.pQ(a))a.dispatchEvent("complete"),a.dispatchEvent("success");else{a.F=6;var b;try{b=2<nQ(a)?a.b.statusText:""}catch(c){b=""}a.B=b+" ["+oQ(a)+"]";lQ(a)}}finally{mQ(a)}}};
mQ=function(a,b){if(a.b){kQ(a);var c=a.b,d=a.P[0]?$.ha:null;a.b=null;a.P=null;b||a.dispatchEvent("ready");try{c.onreadystatechange=d}catch(e){}}};kQ=function(a){a.b&&a.ea&&(a.b.ontimeout=null);$.C(a.K)&&($.Bi(a.K),a.K=null)};
$.pQ=function(a){var b=oQ(a),c;a:switch(b){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:c=!0;break a;default:c=!1}if(!c){if(b=!b)a=String(a.U).match(JP)[1]||null,!a&&$.ea.self&&$.ea.self.location&&(a=$.ea.self.location.protocol,a=a.substr(0,a.length-1)),b=!rfa.test(a?a.toLowerCase():"");c=b}return c};nQ=function(a){return a.b?a.b.readyState:0};oQ=function(a){try{return 2<nQ(a)?a.b.status:-1}catch(b){return-1}};$.rQ=function(a){if(a.b)return $.Bm(a.b.responseText)};
$.sQ=function(a){return $.B(a.B)?a.B:String(a.B)};tQ=function(a,b,c){var d=a.width()/a.height();b=$.n(b)?b:c?Math.round(c*d):a.width();c=$.n(c)?c:b?Math.round(b/d):a.height();return{width:b,height:c}};vQ=function(a,b,c,d,e,f){c&&(b.responseType="base64");d&&(b.save=!0);var h=f||$.ha,k=d?"url":"result";b=jfa(new $.Nx(b));$.hQ(uQ+"/"+a,function(a){a=a.target;$.pQ(a)?e($.rQ(a)[k]):h($.sQ(a))},"POST",b.toString())};
wQ=function(a,b,c,d,e,f){c=tQ(a,c,d);b.data=a.$l(c.width,c.height);b.dataType="svg";b.responseType="file";b.width=c.width;b.height=c.height;$.n(e)&&(b.quality=e);$.n(f)&&(b["file-name"]=f)};xQ=function(a,b,c,d,e,f,h){c=tQ(a,c,d);b.data=a.$l(c.width,c.height);b.dataType="svg";b.responseType="file";b.width=c.width;b.height=c.height;$.n(e)&&(b.quality=e);$.n(f)&&(b["force-transparent-white"]=f);$.n(h)&&(b["file-name"]=h)};
yQ=function(a,b,c,d,e){b.data=a.$l(c,d);b.dataType="svg";b.responseType="file";$.n(e)&&(b["file-name"]=e)};
zQ=function(a,b,c,d,e,f,h){var k=null;$.n(c)?$.C(c)?(b["pdf-width"]=c,b["pdf-height"]=$.C(d)?d:a.height()):$.B(c)?(b["pdf-size"]=c||"a4",b.landscape=!!d,k=sfa[b["pdf-size"]],b.landscape&&(k={width:k.height,height:k.width})):(b["pdf-width"]=a.width(),b["pdf-height"]=a.height()):(b["pdf-width"]=a.width(),b["pdf-height"]=a.height());$.n(e)&&(b["pdf-x"]=e);$.n(f)&&(b["pdf-y"]=f);$.n(h)&&(b["file-name"]=h);k?(c=k.width,k=k.height,d=a.width(),h=a.height(),k=c<k?[c,c/d*h]:c>k?[k/h*d,k]:[c,k],k[0]-=e||0,
k[1]-=f||0,a=a.$l(k[0],k[1])):a=a.$l(b["pdf-width"],b["pdf-height"]);b.data=a;b.dataType="svg";b.responseType="file"};AQ=function(a){var b="";a&&(b=(new window.XMLSerializer).serializeToString(a));return b};BQ=function(){this.b={};this.g={};this.B={};this.F={};this.j={}};CQ=function(a,b,c){if($.A(c)){var d={};$.pc(c,function(a,b){$.n(a)&&(d[b]=a)});$.uc(d)||(a[b]=d)}else $.n(c)&&(a[b]=c)};oP={};sP=null;vP=null;
yP={usletter:{width:"215.9mm",height:"279.4mm"},a0:{width:"841mm",height:"1189mm"},a1:{width:"594mm",height:"841mm"},a2:{width:"420mm",height:"594mm"},a3:{width:"297mm",height:"420mm"},a4:{width:"210mm",height:"279mm"},a5:{width:"148mm",height:"210mm"},a6:{width:"105mm",height:"148mm"}};
sfa={a0:{width:2384,height:3370},a1:{width:1684,height:2384},a2:{width:1191,height:1684},a3:{width:842,height:1191},a4:{width:595,height:842},a5:{width:420,height:595},a6:{width:297,height:420},a7:{width:210,height:297},a8:{width:48,height:210},a9:{width:105,height:148},b0:{width:2834,height:4008},b1:{width:2004,height:2834},b2:{width:1417,height:2004},b3:{width:1E3,height:1417},b4:{width:708,height:1E3},b5:{width:498,height:708},b6:{width:354,height:498},b7:{width:249,height:354},b8:{width:175,height:249},
b9:{width:124,height:175},"arch-a":{width:648,height:864},"arch-b":{width:864,height:1296},"arch-c":{width:1296,height:1728},"arch-d":{width:1728,height:2592},"arch-e":{width:2592,height:3456},"crown-octavo":{width:348,height:527},"crown-quarto":{width:535,height:697},"demy-octavo":{width:391,height:612},"demy-quarto":{width:620,height:782},"royal-octavo":{width:442,height:663},"royal-quarto":{width:671,height:884},executive:{width:522,height:756},halfletter:{width:396,height:612},ledger:{width:1224,
height:792},legal:{width:612,height:1008},letter:{width:612,height:792},tabloid:{width:792,height:1224}};JP=/^(?:([^:/?#.]+):)?(?:\/\/(?:([^/?#]*)@)?([^/#?]*?)(?::([0-9]+))?(?=[/#?]|$))?([^?#]+)?(?:\?([^#]*))?(?:#([\s\S]*))?$/;$.FP.prototype.toString=function(){var a=[],b=this.j;b&&a.push(MP(b,DQ,!0),":");var c=this.B;if(c||"file"==b)a.push("//"),(b=this.K)&&a.push(MP(b,DQ,!0),"@"),a.push((0,window.encodeURIComponent)(String(c)).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),c=this.I,null!=c&&a.push(":",String(c));if(c=this.b)this.B&&"/"!=c.charAt(0)&&a.push("/"),a.push(MP(c,"/"==c.charAt(0)?tfa:ufa,!0));(c=this.F.toString())&&a.push("?",c);(c=this.o)&&a.push("#",MP(c,vfa));return a.join("")};$.FP.prototype.clone=function(){return new $.FP(this)};
var DQ=/[#\/\?@]/g,ufa=/[\#\?:]/g,tfa=/[\#\?]/g,hfa=/[\#\?@]/g,vfa=/#/g;$.g=LP.prototype;$.g.Lv=function(){NP(this);return this.g};$.g.add=function(a,b){NP(this);this.F=null;a=PP(this,a);var c=this.b.get(a);c||this.b.set(a,c=[]);c.push(b);this.g+=1;return this};$.g.remove=function(a){NP(this);a=PP(this,a);return $.Ox(this.b.g,a)?(this.F=null,this.g-=this.b.get(a).length,this.b.remove(a)):!1};$.g.clear=function(){this.b=this.F=null;this.g=0};$.g.xg=function(){NP(this);return 0==this.g};
$.g.lo=function(){NP(this);for(var a=this.b.jn(),b=this.b.lo(),c=[],d=0;d<b.length;d++)for(var e=a[d],f=0;f<e.length;f++)c.push(b[d]);return c};$.g.jn=function(a){NP(this);var b=[];if($.B(a))QP(this,a)&&(b=$.Za(b,this.b.get(PP(this,a))));else{a=this.b.jn();for(var c=0;c<a.length;c++)b=$.Za(b,a[c])}return b};$.g.set=function(a,b){NP(this);this.F=null;a=PP(this,a);QP(this,a)&&(this.g-=this.b.get(a).length);this.b.set(a,[b]);this.g+=1;return this};
$.g.get=function(a,b){var c=a?this.jn(a):[];return 0<c.length?String(c[0]):b};$.g.toString=function(){if(this.F)return this.F;if(!this.b)return"";for(var a=[],b=this.b.lo(),c=0;c<b.length;c++)for(var d=b[c],e=(0,window.encodeURIComponent)(String(d)),d=this.jn(d),f=0;f<d.length;f++){var h=e;""!==d[f]&&(h+="="+(0,window.encodeURIComponent)(String(d[f])));a.push(h)}return this.F=a.join("&")};$.g.clone=function(){var a=new LP;a.F=this.F;this.b&&(a.b=this.b.clone(),a.g=this.g);return a};var TP;$.G(SP,$.Se);var RP={},kfa=0;$.g=SP.prototype;$.g.yh=null;$.g.Ai=null;$.g.At=null;$.g.tba=0;$.g.Ip=!1;$.g.JT=null;$.g.uU=null;$.g.zt=null;$.g.abort=function(){this.Ip&&($.sd($P(this)),this.Ip=!1,this.dispatchEvent("abort"),XP(this))};$.g.ca=function(){this.Ip&&this.abort();SP.J.ca.call(this);this.Ai&&ZP(this);VP(this);delete this.F;this.JT=this.uU=this.yh=null;delete RP[this.ef]};$.g.Vk=function(){return this.Ip};
$.g.XL=function(){if("complete"==this.Ai.readyState){$.qd(this.Ai,"readystatechange",this.XL,!1,this);var a;try{if(a=EP(this.Ai),$.Lc&&"about:blank"==a.location&&!window.navigator.onLine){UP(this);return}}catch(b){UP(this);return}YP(this,a)}};$.g.nF=function(){if(!$.Xe||$.Uc||"about:blank"!=(this.Ai?EP($P(this)):null).location){$.qd($P(this),"load",this.nF,!1,this);try{YP(this,this.Ai?EP($P(this)):null)}catch(a){UP(this)}}};
$.g.pS=function(){this.zt&&($.Bi(this.zt),this.zt=null);for(;this.g.length;){var a=this.g.pop();$.Be(a)}};$.g.NW=function(){if(this.Ip){var a=this.Ai?EP($P(this)):null;a&&!$.Cc(a,"documentUri")?($.qd($P(this),"load",this.nF,!1,this),UP(this)):$.Ai(this.NW,250,this)}};aQ.prototype.b=null;var iQ;$.G(dQ,aQ);iQ=new dQ;$.G(fQ,$.Se);var mfa="",rfa=/^https?$/i,pfa=["POST","PUT"],gQ=[];$.g=fQ.prototype;$.g.W7=function(){this.Rc();$.Ya(gQ,this)};$.g.SW=function(){"undefined"!=typeof $.zy&&this.b&&(this.B="Timed out after "+this.o+"ms, aborting",this.F=8,this.dispatchEvent("timeout"),this.abort(8))};$.g.abort=function(a){this.b&&this.g&&(this.g=!1,this.j=!0,this.b.abort(),this.j=!1,this.F=a||7,this.dispatchEvent("complete"),this.dispatchEvent("abort"),mQ(this))};
$.g.ca=function(){this.b&&(this.g&&(this.g=!1,this.j=!0,this.b.abort(),this.j=!1),mQ(this,!0));fQ.J.ca.call(this)};$.g.dV=function(){this.od||(this.$||this.I||this.j?qQ(this):this.jca())};$.g.jca=function(){qQ(this)};$.g.Vk=function(){return!!this.b};var uQ="//export.anychart.com";$.g=$.Qi.prototype;$.g.Io=function(a,b,c,d,e,f,h){if("svg"==$.ej){var k={};wQ(this,k,d,e,f,h);vQ("png",k,!!c,!0,a,b)}else(0,window.alert)($.Oc(15))};$.g.hu=function(a,b,c,d,e,f,h,k){if("svg"==$.ej){var l={};xQ(this,l,d,e,f,h,k);vQ("jpg",l,!!c,!0,a,b)}else(0,window.alert)($.Oc(15))};$.g.ju=function(a,b,c,d,e,f){if("svg"==$.ej){var h={};yQ(this,h,d,e,f);vQ("svg",h,!!c,!0,a,b)}else(0,window.alert)($.Oc(15))};
$.g.iu=function(a,b,c,d,e,f,h,k){if("svg"==$.ej){var l={};zQ(this,l,d,e,f,h,k);vQ("pdf",l,!!c,!0,a,b)}else(0,window.alert)($.Oc(15))};$.g.st=function(a,b,c,d,e){if("svg"==$.ej){var f={};wQ(this,f,c,d,e);vQ("png",f,!0,!1,a,b)}else(0,window.alert)($.Oc(15))};$.g.qt=function(a,b,c,d,e,f){if("svg"==$.ej){var h={};xQ(this,h,c,d,e,f);vQ("jpg",h,!0,!1,a,b)}else(0,window.alert)($.Oc(15))};$.g.ut=function(a,b,c,d){if("svg"==$.ej){var e={};yQ(this,e,c,d);vQ("svg",e,!0,!1,a,b)}else(0,window.alert)($.Oc(15))};
$.g.rt=function(a,b,c,d,e,f){if("svg"==$.ej){var h={};zQ(this,h,c,d,e,f);vQ("pdf",h,!0,!1,a,b)}else(0,window.alert)($.Oc(15))};$.g.kq=function(a,b,c,d){if("svg"==$.ej){var e={};wQ(this,e,a,b,c,d);WP(uQ+"/png",e)}else(0,window.alert)($.Oc(15))};$.g.iq=function(a,b,c,d,e){if("svg"==$.ej){var f={};xQ(this,f,a,b,c,d,e);WP(uQ+"/jpg",f)}else(0,window.alert)($.Oc(15))};$.g.jq=function(a,b,c,d,e){if("svg"==$.ej){var f={};zQ(this,f,a,b,c,d,e);WP(uQ+"/pdf",f)}else(0,window.alert)($.Oc(15))};
$.g.lq=function(a,b,c){if("svg"==$.ej){var d={};yQ(this,d,a,b,c);WP(uQ+"/svg",d)}else(0,window.alert)($.Oc(15))};
$.g.print=function(a,b){if($.n(a)||$.n(b)){var c=zP(a,b,"us-letter"),d=wP().contentWindow.document,e=$.te("DIV");$.Ve(e,{width:c.width,height:c.height});d.body.appendChild(e);var c=this.width(),d=this.height(),f=$.uf(e);this.Ku(f.width,f.height);f=this.ka();"svg"==f.tagName&&f.cloneNode?(f=f.cloneNode(!0),e.appendChild(f)):$.fj(e).data(this.data());this.Ku(c,d)}else e=wP().contentWindow.document,d=this.ka(),"svg"==d.tagName?d.cloneNode?c=d.cloneNode(!0):(d=$.fj(e.body),d.data(this.data()),c=d.ka()):
(d=$.fj(e.body),d.data(this.data())),d=$.Jf(),f=c,d.Mb(f,"width","100%"),d.Mb(f,"height","100%"),d.Mb(f,"viewBox","0 0 "+this.width()+" "+this.height()),$.Ve(f,"width","100%"),$.Ve(f,"height",""),$.Ve(f,"max-height","100%"),e.body.appendChild(c);efa()};
$.g.$l=function(a,b){if("svg"!=$.ej)return"";var c;if($.n(a)||$.n(b)){c=zP(a,b);var d=$.Ge(this.ka()),e=$.Ye(d,"width"),d=$.Ye(d,"height");this.Ku(c.width,c.height);c=AQ(this.ka());this.Ku(e,d)}else $.Jf().cG(this.ka(),this.width(),this.height()),c=AQ(this.ka()),$.Jf().cG(this.ka(),"100%","100%");return'<?xml version="1.0" encoding="UTF-8" standalone="no"?>'+c};$.F("acgraph.server",function(a){$.n(a)&&(uQ=a);return uQ});var EQ=$.Qi.prototype;EQ.saveAsPNG=EQ.kq;EQ.saveAsJPG=EQ.iq;EQ.saveAsPDF=EQ.jq;
EQ.saveAsSVG=EQ.lq;EQ.saveAsPng=EQ.kq;EQ.saveAsJpg=EQ.iq;EQ.saveAsPdf=EQ.jq;EQ.saveAsSvg=EQ.lq;EQ.shareAsPng=EQ.Io;EQ.shareAsJpg=EQ.hu;EQ.shareAsPdf=EQ.iu;EQ.shareAsSvg=EQ.ju;EQ.getPngBase64String=EQ.st;EQ.getJpgBase64String=EQ.qt;EQ.getSvgBase64String=EQ.ut;EQ.getPdfBase64String=EQ.rt;EQ.print=EQ.print;EQ.toSvg=EQ.$l;$.g=BQ.prototype;$.g.filename=function(a){$.n(a)&&(this.o=a);return this.o};$.g.xc=function(a,b){return this.b=DP({width:a,height:b},a,this.b)};$.g.US=function(a,b,c,d,e,f,h){return this.g=DP({caption:a,link:b,name:c,description:d,width:e,height:f,appId:h},a,this.g)};$.g.$W=function(a,b,c){return this.B=DP({url:a,width:b,height:c},a,this.B)};$.g.AU=function(a,b,c,d){return this.F=DP({caption:a,description:b,width:c,height:d},a,this.F)};
$.g.kV=function(a,b,c,d){return this.j=DP({link:a,description:b,width:c,height:d},a,this.j)};$.g.O=function(){var a={};CQ(a,"filename",this.o);CQ(a,"image",this.b);CQ(a,"facebook",this.g);CQ(a,"twitter",this.B);CQ(a,"linkedin",this.F);CQ(a,"pinterest",this.j);return a};$.g.fa=function(a){this.filename(a.filename);this.xc(a.image);this.US(a.facebook);this.$W(a.twitter);this.AU(a.linkedin);this.kV(a.pinterest)};var FQ=BQ.prototype;FQ.filename=FQ.filename;FQ.image=FQ.xc;FQ.facebook=FQ.US;
FQ.twitter=FQ.$W;FQ.linkedin=FQ.AU;FQ.pinterest=FQ.kV;var GQ=new BQ;GQ.o="anychart";GQ.b={width:void 0,height:void 0};GQ.g={caption:$.dk.location?$.dk.location.hostname:"",link:void 0,name:void 0,description:void 0,appId:0x42607363aa4b7,width:1200,height:630};GQ.B={url:"https://export.anychart.com/sharing/twitter",width:1024,height:800};GQ.F={caption:"AnyChart",description:void 0,width:1200,height:630};GQ.j={link:void 0,description:void 0,width:1200,height:800};GQ.create=function(){return new BQ};
GQ.wc=function(a,b){var c=a.exports?a.exports()[b]():void 0,d=$.ea.anychart.exports[b](),e;"object"==$.ja(c)?e=DP(d,c,d):e=$.n(c)?c:d;return e};GQ.I=$.dk.acgraph.server;GQ.kq=function(a,b,c,d,e,f){if(b=b?b.Ea():null){var h=GQ.wc(a,"image");a=DP({width:c,height:d,quality:e,filename:f},c,{width:h.width,height:h.height,filename:GQ.wc(a,"filename")});b.kq(a.width,a.height,a.quality,a.filename)}};
GQ.iq=function(a,b,c,d,e,f,h){if(b=b?b.Ea():null){var k=GQ.wc(a,"image");a=DP({width:c,height:d,quality:e,forceTransparentWhite:f,filename:h},c,{width:k.width,height:k.height,filename:GQ.wc(a,"filename")});b.iq(a.width,a.height,a.quality,a.forceTransparentWhite,a.filename)}};
GQ.jq=function(a,b,c,d,e,f,h){if(b=b?b.Ea():null){var k=GQ.wc(a,"image");a=DP({paperSize:c,width:c,landscape:d,height:d,x:e,y:f,filename:h},c,{width:k.width,height:k.height,filename:GQ.wc(a,"filename")});b.jq(a.paperSize||a.width,a.landscape||a.height,a.x,a.y,a.filename)}};
GQ.lq=function(a,b,c,d,e){if(b=b?b.Ea():null){var f=GQ.wc(a,"image");a=DP({paperSize:c,width:c,landscape:d,height:d,filename:e},c,{width:f.width,height:f.height,filename:GQ.wc(a,"filename")});b.lq(a.paperSize||a.width,a.landscape||a.height,a.filename)}};GQ.$l=function(a,b,c,d){return(b=b?b.Ea():null)?(a=GQ.wc(a,"image"),c=DP({paperSize:c,width:c,landscape:d,height:d},c,{width:a.width,height:a.height}),b.$l(c.paperSize||c.width,c.landscape||c.height)):""};
GQ.UF=function(a,b,c){var d={};d["file-name"]=c||GQ.wc(a,"filename");d.data=b;d.dataType="xml";d.responseType="file";WP(uQ+"/xml",d)};GQ.TF=function(a,b,c){var d={};d["file-name"]=c||GQ.wc(a,"filename");d.data=b;d.dataType="json";d.responseType="file";WP(uQ+"/json",d)};GQ.Dw=function(a,b,c){var d={};d["file-name"]=c||GQ.wc(a,"filename");d.data=b;d.dataType="csv";d.responseType="file";WP(uQ+"/csv",d)};
GQ.Ew=function(a,b,c){var d={};d["file-name"]=c||GQ.wc(a,"filename");d.data=b;d.dataType="xlsx";d.responseType="file";WP(uQ+"/xlsx",d)};GQ.Io=function(a,b,c,d,e,f,h,k,l){if(b=b?b.Ea():null){var m=GQ.wc(a,"image");a=DP({onSuccess:c,onError:d,asBase64:e,width:f,height:h,quality:k,filename:l},c,{width:m.width,height:m.height,filename:GQ.wc(a,"filename")});b.Io(a.onSuccess,a.onError,a.asBase64,a.width,a.height,a.quality,a.filename)}};
GQ.hu=function(a,b,c,d,e,f,h,k,l,m){if(b=b?b.Ea():null){var p=GQ.wc(a,"image");a=DP({onSuccess:c,onError:d,asBase64:e,width:f,height:h,quality:k,forceTransparentWhite:l,filename:m},c,{width:p.width,height:p.height,filename:GQ.wc(a,"filename")});b.hu(a.onSuccess,a.onError,a.asBase64,a.width,a.height,a.quality,a.forceTransparentWhite,a.filename)}};
GQ.ju=function(a,b,c,d,e,f,h,k){if(b=b?b.Ea():null){var l=GQ.wc(a,"image");a=DP({onSuccess:c,onError:d,asBase64:e,paperSize:f,width:f,landscape:h,height:h,filename:k},c,{width:l.width,height:l.height,filename:GQ.wc(a,"filename")});b.ju(a.onSuccess,a.onError,a.asBase64,a.paperSize||a.width,a.landscape||a.height,a.filename)}};
GQ.iu=function(a,b,c,d,e,f,h,k,l,m){if(b=b?b.Ea():null){var p=GQ.wc(a,"image");a=DP({onSuccess:c,onError:d,asBase64:e,paperSize:f,width:f,landscape:h,height:h,x:k,y:l,filename:m},c,{width:p.width,height:p.height,filename:GQ.wc(a,"filename")});b.iu(a.onSuccess,a.onError,a.asBase64,a.paperSize||a.width,a.landscape||a.height,a.x,a.y,a.filename)}};
GQ.st=function(a,b,c,d,e,f,h){if(b=b?b.Ea():null)a=GQ.wc(a,"image"),c=DP({onSuccess:c,onError:d,width:e,height:f,quality:h},c,{width:a.width,height:a.height}),b.st(c.onSuccess,c.onError,c.width,c.height,c.quality)};GQ.qt=function(a,b,c,d,e,f,h,k){if(b=b?b.Ea():null)a=GQ.wc(a,"image"),c=DP({onSuccess:c,onError:d,width:e,height:f,quality:h,forceTransparentWhite:k},c,{width:a.width,height:a.height}),b.qt(c.onSuccess,c.onError,c.width,c.height,c.quality,c.forceTransparentWhite)};
GQ.ut=function(a,b,c,d,e,f){if(b=b?b.Ea():null)a=GQ.wc(a,"image"),c=DP({onSuccess:c,onError:d,paperSize:e,width:e,landscape:f,height:f},c,{width:a.width,height:a.height}),b.ut(c.onSuccess,c.onError,c.paperSize||c.width,c.landscape||c.height)};GQ.rt=function(a,b,c,d,e,f,h,k){if(b=b?b.Ea():null)a=GQ.wc(a,"image"),c=DP({onSuccess:c,onError:d,paperSize:e,width:e,landscape:f,height:f,x:h,y:k},c,{width:a.width,height:a.height}),b.rt(c.onSuccess,c.onError,c.paperSize||c.width,c.landscape||c.height,c.x,c.y)};
GQ.print=function(a,b,c,d){if(a=b?b.Ea():null)c=DP({paperSize:c,landscape:d},c),a.print(c.paperSize,c.landscape)};
GQ.eG=function(a,b,c,d,e,f){var h=GQ.wc(a,"facebook"),k=DP({caption:c,link:d,name:e,description:f},c,h),l=$.dk.open("","_blank","scrollbars=yes, width=550, height=550, top="+Number(window.screen.height/2-275)+", left="+Number(window.screen.width/2-275));GQ.Io(a,b,function(a){a={app_id:h.appId,display:"popup",picture:a};a.caption=k.caption;k.link&&(a.link=k.link,k.name&&(a.name=k.name),k.description&&(a.description=k.description));var b="",c;for(c in a)b+=b?"&":"",b+=c+"="+a[c];l.location.href="https://www.facebook.com/dialog/feed?"+
b},void 0,!1,h.width,h.height)};
GQ.hG=function(a,b){var c=GQ.wc(a,"twitter"),d=Number(window.screen.width/2-300),e=Number(window.screen.height/2-260),f,h;f=$.ie("INPUT","ac-share-twitter-data-input");if(0<f.length)h=f[0],f=$.ie("FORM","ac-share-twitter-form")[0];else{f=window.document.createElement("FORM");$.Ki(f,"ac-share-twitter-form");f.target="Map";f.method="POST";f.action=c.url;h=window.document.createElement("INPUT");$.Ki(h,"ac-share-twitter-data-input");h.type="hidden";h.name="data";var k=window.document.createElement("INPUT");
k.type="hidden";k.name="dataType";k.value="svg";f.appendChild(h);f.appendChild(k);$.ge("BODY")[0].appendChild(f)}$.n(f)&&$.n(h)&&(h.value=GQ.$l(a,b,c.width,c.height),$.dk.open("","Map","status=0,title=0,height=520,width=600,scrollbars=1, width=600, height=520, top="+e+", left="+d)&&f.submit())};
GQ.fG=function(a,b,c,d){var e=GQ.wc(a,"linkedin"),f=DP({caption:c,description:d},c,e),h=$.dk.open("","_blank","scrollbars=yes, width=550, height=520, top="+Number(window.screen.height/2-260)+", left="+Number(window.screen.width/2-275));GQ.Io(a,b,function(a){a={mini:"true",url:a};a.title=f.caption;f.description&&(a.summary=f.description);var b="",c;for(c in a)b+=b?"&":"",b+=c+"="+a[c];h.location.href="https://www.linkedin.com/shareArticle?"+b},void 0,!1,e.width,e.height)};
GQ.gG=function(a,b,c,d){var e=GQ.wc(a,"pinterest"),f=DP({link:c,description:d},c,e),h=$.dk.open("","_blank","scrollbars=yes, width=550, height=520, top="+Number(window.screen.height/2-260)+", left="+Number(window.screen.width/2-275));GQ.Io(a,b,function(a){a={media:a};f.link&&(a.url=f.link);f.description&&(a.description=f.description);var b="",c;for(c in a)b+=b?"&":"",b+=c+"="+a[c];h.location.href="https://pinterest.com/pin/create/link?"+b},void 0,!1,e.width,e.height)};$.F("anychart.exports",GQ);
$.F("anychart.exports.server",GQ.I);}).call(this,$)}
