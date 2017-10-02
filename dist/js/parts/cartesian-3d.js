if(!_.cartesian_3d){_.cartesian_3d=1;(function($){var k9=function(a){return $.ra(a.fl())+"_"+$.ra(a.bb())},l9=function(a,b,c){if(a=a.j[b])a.zIndex=c},m9=function(){$.Ov.call(this)},n9=function(){$.Ov.call(this)},o9=function(){$.Tw.call(this)},p9=function(){$.Ww.call(this)},q9=function(){$.Lv.call(this)},r9=function(a){$.Fx.call(this,a)},s9=function(a){$.Fx.call(this,a)},t9=function(a,b,c){var d=b.G("x"),e=b.G("zero"),f=b.G("value");a.b||(d+=a.J,e-=a.g,f-=a.g);b=c.bottom;var h=c.back,k=c.left,l=c.right,m=c.front,p=c.top,q=c.rightHatch,r=c.frontHatch;
c=c.topHatch;var t=a.B,u=a.F,v,w,x=m.stroke().thickness%2/2||0;a.b?(w=a.o,v=Math.min(e,f)+a.J,d=d-w/2-a.g,a=Math.abs(e-f),e=x,f=0):(a=a.o,v=d-a/2,d=Math.min(e,f),w=Math.abs(e-f),f=e=-x);b.moveTo(v+x,d+w).lineTo(v+a,d+w).lineTo(v+a+t-x,d+w-u+x).lineTo(v+t,d+w-u).close();h.moveTo(v+t,d-u).lineTo(v+t+a,d-u).lineTo(v+t+a,d-u+w).lineTo(v+t,d-u+w).close();k.moveTo(v,d).lineTo(v+t+e,d-u+x).lineTo(v+t,d+w-u).lineTo(v,d+w-x).close();l.moveTo(v+a,d).lineTo(v+a+t+f,d-u+x).lineTo(v+a+t,d+w-u).lineTo(v+a,d+w-
x).close();q.moveTo(v+a,d).lineTo(v+a+t+f,d-u+x).lineTo(v+a+t,d+w-u).lineTo(v+a,d+w-x).close();m.moveTo(v,d).lineTo(v+a,d).lineTo(v+a,d+w).lineTo(v,d+w).close();r.moveTo(v,d).lineTo(v+a,d).lineTo(v+a,d+w).lineTo(v,d+w).close();p.moveTo(v+x,d).lineTo(v+a,d).lineTo(v+a+t-x,d-u+x).lineTo(v+t,d-u).close();c.moveTo(v+x,d).lineTo(v+a,d).lineTo(v+a+t-x,d-u+x).lineTo(v+t,d-u).close()},u9=function(a){$.Fx.call(this,a)},v9=function(){$.Ly.call(this);this.Na=0;this.R="cartesian-3d"},w9=function(a){var b=$.Un(a.domTarget);
if(b&&b.ia&&b.ia.check(4)){var c=$.Un(a.relatedDomTarget);c&&c.ia&&c.ia==b.ia&&c.index==b.index||(b=b.ia)&&!b.Ed&&b.enabled()&&(c=b.tg(),b.mb(null),b.wg(a.iF),b.mb(c))}},x9=function(a,b,c){var d,e,f,h,k;k=$.bm("fill",1,!0)(a,c);c=$.A(k)?k.opacity:1;e=$.A(k)?k.color:k;if(k=$.Ml(e)){e=k.Pf;var l=$.Fl(e);f=$.Jl(l,.2);k=$.Jl(l,.25);h=$.Il([255,255,255],l,.1);d=$.uc($.Il(l,f,.7));h=$.uc($.Il(f,h,.1));l=$.uc($.Il(l,f,.1));a={angle:a.N("isVertical")?0:90,opacity:c,keys:[$.Ql(d,.2),$.Ql(e,.3)]};e=$.Ql(l,
.2);d=$.Ql(d,.2);f=$.uc(f);k=$.uc(k)}else a=e=d=f=h=k="none";b.bottom.fill({color:f,opacity:c});b.back.fill({color:h,opacity:c});b.left.fill({color:k,opacity:c});b.right.fill({color:e,opacity:c});b.top.fill({color:d,opacity:c});b.front.fill(a)},y9=function(){var a=new v9;a.va(!0,$.km("cartesian3d"));return a},A9=function(a,b){var c=z9(a),d=a.b,e=a.Ea;!b&&a.N("zDistribution")&&(e=(e-d*(c-1))/c);return e},B9=function(a,b){var c=z9(a),d=a.K,e=a.za;!b&&a.N("zDistribution")&&(e=(e-d*(c-1))/c);return e},
z9=function(a){return $.$a(a.Ya,function(a){return!!(a&&a.enabled()&&a.check($.gy))})},C9=function(a,b){for(var c=0,d=0,e=Math.min(a.Ya.length-1,b);d<=e;d++){var f=a.Ya[d];f&&f.enabled()&&f.check($.gy)&&c++}return c-1},D9=function(a){var b=new v9;b.R="area-3d";b.va(!0,$.km("area3d"));arguments.length&&b.Rj.apply(b,arguments);return b},E9=function(a){var b=new v9;b.R="bar-3d";b.va(!0,$.km("bar3d"));arguments.length&&b.Rj.apply(b,arguments);return b},F9=function(a){var b=new v9;b.R="column-3d";b.va(!0,
$.km("column3d"));arguments.length&&b.Rj.apply(b,arguments);return b},G9=function(a){var b=new v9;b.R="line-3d";b.va(!0,$.km("line3d"));arguments.length&&b.Rj.apply(b,arguments);return b},Jga={qu:"area",YA:"bar",Rw:"column",xn:"line",iga:"line-2d"},H9={name:"topHatch",xc:"path",Hc:"hatchFill",Jc:null,Bc:!0,lc:!0,zIndex:6E-6},I9={name:"rightHatch",xc:"path",Hc:"hatchFill",Jc:null,Bc:!0,lc:!0,zIndex:7E-6},J9={name:"frontHatch",xc:"path",Hc:"hatchFill",Jc:null,Bc:!0,lc:!0,zIndex:8E-6},K9={name:"back",
xc:"path",Hc:null,Jc:"stroke",Bc:!0,lc:!1,zIndex:0},L9={name:"right",xc:"path",Hc:null,Jc:"stroke",Bc:!0,lc:!1,zIndex:4E-6},M9={name:"left",xc:"path",Hc:null,Jc:"stroke",Bc:!0,lc:!1,zIndex:1E-6},N9={name:"bottom",xc:"path",Hc:null,Jc:"stroke",Bc:!0,lc:!1,zIndex:2E-6},O9={name:"top",xc:"path",Hc:null,Jc:"stroke",Bc:!0,lc:!1,zIndex:3E-6};$.G(m9,$.Ov);
m9.prototype.tD=function(a,b){var c=this.oa()||$.cn(0,0,0,0),d=Math.round(c.Ka()-a*c.height);1==a?d-=b:d+=b;var e=c.gb()+this.Ea,f=d-this.za;this.j.moveTo(c.gb(),d).lineTo(e,f).lineTo(c.Ra()+this.Ea,f)};m9.prototype.uD=function(a,b){var c=this.oa()||$.cn(0,0,0,0),d=Math.round(c.gb()+a*c.width);1==a?d+=b:d-=b;var e=d+this.Ea,f=c.Ka()-this.za;this.j.moveTo(d,c.Ka()).lineTo(e,f).lineTo(e,c.Hb()-this.za)};
m9.prototype.rD=function(a,b,c,d){if(!(0,window.isNaN)(b)){var e=this.oa()||$.cn(0,0,0,0),f,h;f=Math.round(e.Ka()-b*e.height);h=Math.round(e.Ka()-a*e.height);1==a?h-=d:h+=d;1==b?f-=d:f+=d;c.moveTo(e.gb(),f).lineTo(e.gb()+this.Ea,f-this.za).lineTo(e.Ra()+this.Ea,f-this.za).lineTo(e.Ra()+this.Ea,h-this.za).lineTo(e.gb()+this.Ea,h-this.za).lineTo(e.gb(),h).close()}};
m9.prototype.sD=function(a,b,c,d){if(!(0,window.isNaN)(b)){var e=this.oa()||$.cn(0,0,0,0),f,h;f=Math.round(e.gb()+b*e.width);h=Math.round(e.gb()+a*e.width);1==a?h+=d:h-=d;1==b?f+=d:f-=d;c.moveTo(f+this.Ea,e.Hb()-this.za).lineTo(h+this.Ea,e.Hb()-this.za).lineTo(h+this.Ea,e.Ka()-this.za).lineTo(h,e.Ka()).lineTo(f,e.Ka()).lineTo(f+this.Ea,e.Ka()-this.za).close()}};$.G(n9,m9);$.os(n9,m9);var P9=m9.prototype;P9.isHorizontal=P9.zb;P9.scale=P9.scale;P9.axis=P9.Eg;P9=n9.prototype;
$.F("anychart.standalones.grids.linear3d",function(){var a=new n9;a.X($.km("standalones.linearGrid"));return a});P9.layout=P9.Fd;P9.draw=P9.ea;P9.parentBounds=P9.oa;P9.container=P9.$;$.G(o9,$.Tw);
o9.prototype.zs=function(){var a=$.Hb(this.scale().transform(this.value(),.5),0,1);if(!(0,window.isNaN)(a)){var b=$.Av(this).hq()%2?-.5:0,c=this.oa(),d=this.Vj();$.Av(this).clear();var e=this.Yb().Ea,f=this.Yb().za;if("horizontal"==this.Fd()){var h=Math.round(c.Hb()+c.height-a*c.height);1==a?h-=b:h+=b;$.Av(this).moveTo(c.gb(),h).lineTo(c.gb()+e,h-f).lineTo(c.Ra()+e,h-f)}else"vertical"==this.Fd()&&(h=Math.round(c.gb()+a*c.width),1==a?h+=b:h-=b,$.Av(this).moveTo(h+e,c.Hb()-f).lineTo(h+e,c.Ka()-f).lineTo(h,
c.Ka()));c.top-=f;c.height+=f;c.width+=e;$.Av(this).clip(d.wh(c))}};$.G(p9,$.Ww);
p9.prototype.zs=function(){var a=this.Fd(),b=this.from(),c=this.ld();this.from()>this.ld()&&(b=this.from(),c=this.ld());var d=$.Hb(this.scale().transform(b,0),0,1),e=$.Hb(this.scale().transform(c,1),0,1);if(!(0,window.isNaN)(d)&&!(0,window.isNaN)(e)){c=this.oa();b=this.Vj();$.Av(this).clear();var f=this.Yb().Ea,h=this.Yb().za;if("horizontal"==a){var e=Math.floor(c.Ka()-c.height*e),d=Math.ceil(c.Ka()-c.height*d),a=c.gb(),k=c.Ra();$.Av(this).moveTo(a,e).lineTo(a+f,e-h).lineTo(k+f,e-h).lineTo(k+f,d-
h).lineTo(a+f,d-h).lineTo(a,d).close()}else"vertical"==a&&(a=c.Ka(),k=c.Hb(),d=Math.floor(c.gb()+c.width*d),e=Math.ceil(c.gb()+c.width*e),$.Av(this).moveTo(d,a).lineTo(d+f,a-h).lineTo(d+f,k-h).lineTo(e+f,k-h).lineTo(e+f,a-h).lineTo(e,a).close());c.top-=h;c.height+=h;c.width+=f;$.Av(this).clip(b.wh(c))}};$.G(q9,$.Zw);q9.prototype.oa=function(a,b,c,d){b=q9.I.oa.call(this,a,b,c,d);$.n(a)||(a=this.Yb().Ea,c=this.Yb().za,b.top-=c,b.height+=c,b.width+=a);return b};$.G(r9,$.Fx);$.$B[2]=r9;$.g=r9.prototype;$.g.type=2;$.g.Te=$.gy|49;$.g.ef={top:"path",bottom:"path",left:"path",right:"path",back:"path",front:"path",frontHatch:"path"};$.g.uB=function(){for(var a=this.ia.qf();a.advance();){var b=a.G("shapes");if(b){var c=a.G("zIndex");this.sc.An(c+1E-8*a.sa(),b)}}};
$.g.Be=function(a){r9.I.Be.call(this,a);this.aa=!0;a=this.ia.ya;var b=this.ia.sa(),c=this.ia.We(),d=k9(this.ia);this.fa=!c||b==a.Pg[d];this.ca=a.VD(b,c);this.P=a.WD(b,c);this.J=A9(a,c);this.B=B9(a,c);a.Qa().Md()?(l9(this.sc,"left",4E-6),l9(this.sc,"right",1E-6)):(l9(this.sc,"left",1E-6),l9(this.sc,"right",4E-6));a.bb().Md()?(l9(this.sc,"top",2E-6),l9(this.sc,"bottom",3E-6)):(l9(this.sc,"top",3E-6),l9(this.sc,"bottom",2E-6))};
$.g.pk=function(a){var b=this.sc.Dc(this.j,null,this.ia.zIndex()),c=a.G("x")+this.ca,d=a.G("zero")-this.P,e=a.G("zeroMissing");a=a.G("value")-this.P;b.front.moveTo(c,d).lineTo(c,a);b.frontHatch.moveTo(c,d).lineTo(c,a);this.ia.We()?this.g=[c,d,e]:(b.back.moveTo(c+this.J,d-this.B).lineTo(c+this.J,a-this.B),b.bottom.moveTo(c,d).lineTo(c+this.J,d-this.B),b.left.moveTo(c,d).lineTo(c,a).lineTo(c+this.J,a-this.B).lineTo(c+this.J,d-this.B).close());this.F=c;this.Y=a;this.Wf=this.ba=d};
$.g.Je=function(a){var b=this.sc.Dc(this.j),c=a.G("x")+this.ca,d=a.G("zero")-this.P,e=a.G("zeroMissing");a=a.G("value")-this.P;this.ia.We()?this.g.push(c,d,e):(b.bottom.lineTo(c+this.J,d-this.B),b.back.lineTo(c+this.J,a-this.B));this.fa&&(e=b.front.iO(),this.aa?b.top.moveTo(e.x,e.y).lineTo(e.x+this.J,e.y-this.B).lineTo(c+this.J,a-this.B).lineTo(c,a).close():b.top.moveTo(e.x,e.y).lineTo(c,a).lineTo(c+this.J,a-this.B).lineTo(e.x+this.J,e.y-this.B).close(),this.aa=!this.aa);b.front.lineTo(c,a);b.frontHatch.lineTo(c,
a);this.F=c;this.Y=a;this.ba=d};
$.g.vj=function(){if(this.K){var a=this.sc.Dc(this.j),b=a.front,c=a.frontHatch;if(this.g){for(var d=window.NaN,e=window.NaN,f=!1,h=this.g.length-1;0<=h;h-=3){var k=this.g[h-2],l=this.g[h-1],m=this.g[h];m&&!(0,window.isNaN)(d)?(b.lineTo(d,l),c.lineTo(d,l)):f&&!(0,window.isNaN)(e)&&(b.lineTo(k,e),c.lineTo(k,e));b.lineTo(k,l);c.lineTo(k,l);d=k;e=l;f=m}b.close();c.close();this.g=null}else(0,window.isNaN)(this.F)||(b.lineTo(this.F,this.Wf).close(),c.lineTo(this.F,this.Wf).close(),a.back.lineTo(this.F+
this.J,this.Wf-this.B).close(),a.bottom.lineTo(this.F,this.Wf).close());(0,window.isNaN)(this.F)||a.right.moveTo(this.F,this.ba).lineTo(this.F,this.Y).lineTo(this.F+this.J,this.Y-this.B).lineTo(this.F+this.J,this.ba-this.B).close()}};$.G(s9,$.Fx);$.$B[7]=s9;$.g=s9.prototype;$.g.type=7;$.g.Te=$.gy|263717;$.g.ef={top:"path",bottom:"path",left:"path",right:"path",back:"path",front:"path",frontHatch:"path",rightHatch:"path",topHatch:"path"};$.g.Be=function(a){s9.I.Be.call(this,a);a=this.ia.ya;var b=this.ia.sa(),c=this.ia.We();this.J=a.VD(b,c);this.g=a.WD(b,c);this.B=A9(a,c);this.F=B9(a,c)};$.g.uB=function(a){for(var b=this.ia.qf();b.advance();){var c=b.G("shapes");c&&(a=b.G("zIndex"),this.sc.An(a+1E-8*b.sa(),c))}};
$.g.Je=function(a,b){var c=a.G("zIndex"),c=this.sc.Dc(b,null,c+1E-8*a.sa());t9(this,a,c)};$.g.zn=function(a){var b=a.G("shapes"),c;for(c in b)b[c].clear();t9(this,a,b)};$.G(u9,$.Fx);$.$B[33]=u9;$.g=u9.prototype;$.g.type=33;$.g.Te=$.gy|32848;$.g.ef={path:"path"};$.g.uB=function(){for(var a=this.ia.qf();a.advance();){var b=a.G("shapes");if(b){var c=a.G("zIndex");this.sc.An(c+1E-8*a.sa(),b)}}};$.g.Be=function(a){u9.I.Be.call(this,a);this.P=!0;a=this.ia.ya;var b=this.ia.sa();this.aa=a.VD(b,!1);this.Y=a.WD(b,!1);this.B=A9(a,!1);this.F=B9(a,!1)};$.g.pk=function(a){this.g=a.G("x")+this.aa;this.J=a.G("value")-this.Y};
$.g.Je=function(a){var b=this.sc.Dc(this.j),c=a.G("x")+this.aa;a=a.G("value")-this.Y;this.P?b.path.moveTo(this.g,this.J).lineTo(this.g+this.B,this.J-this.F).lineTo(c+this.B,a-this.F).lineTo(c,a).close():b.path.moveTo(this.g,this.J).lineTo(c,a).lineTo(c+this.B,a-this.F).lineTo(this.g+this.B,this.J-this.F).close();this.P=!this.P;this.g=c;this.J=a};$.G(v9,$.Ly);v9.prototype.tj=function(a){w9(a);v9.I.tj.call(this,a)};v9.prototype.yn=function(a){w9(a);v9.I.yn.call(this,a)};v9.prototype.Ml=function(a){w9(a);v9.I.Ml.call(this,a)};v9.prototype.dg=function(a){w9(a);v9.I.dg.call(this,a)};var Q9={},R9=$.iy|5767168;
Q9.area={ob:2,xb:1,yb:[{name:"top",xc:"path",Hc:null,Jc:null,Bc:!1,lc:!1,zIndex:3E-6},N9,M9,L9,K9,$.JC,J9],vb:null,qb:function(a,b,c){var d,e,f,h,k;c=$.bm("fill",1,!0)(a,c);a=$.A(c)?c.opacity:1;d=$.A(c)?c.color:c;if(c=$.Ml(d)){d=c.Pf;h=$.Fl(d);var l=$.Jl(h,.2);f=$.Jl(h,.3);c=$.Jl(h,.25);k=$.Il([255,255,255],h,.1);e=$.uc($.Il(h,l,.7));f=$.uc($.Il(h,f,.7));k=$.uc($.Il(l,k,.1));h=$.uc($.Il(h,l,.1));d={angle:90,opacity:a,keys:[$.Ql(e,.2),$.Ql(d,.3)]};e=$.Ql(f,.2);f=h=$.Ql(h,.2);c=$.uc(c)}else d=e=f=h=
k=c="none";b.bottom.fill({color:h,opacity:a});b.back.fill({color:k,opacity:a});b.left.fill({color:c,opacity:a});b.right.fill({color:f,opacity:a});b.top.fill({color:e,opacity:a});b.front.fill(d);b.top.stroke({color:e,thickness:.8})},nb:R9,lb:"value",kb:"zero"};Q9.bar={ob:7,xb:2,yb:[O9,N9,M9,L9,K9,$.JC,J9,I9,H9],vb:null,qb:x9,nb:R9,lb:"value",kb:"zero"};Q9.column={ob:7,xb:2,yb:[O9,N9,M9,L9,K9,$.JC,J9,I9,H9],vb:null,qb:x9,nb:R9,lb:"value",kb:"zero"};
Q9.line={ob:33,xb:1,yb:[{name:"path",xc:"path",Hc:null,Jc:null,Bc:!1,lc:!1,zIndex:0}],vb:null,qb:function(a,b,c){c=$.bm("fill",1,!0)(a,c);a=$.A(c)?c.opacity:1;c=$.A(c)?c.color:c;(c=$.Ml(c))?(c=c.Pf,c=$.Fl(c),c=$.uc($.Il(c,$.Jl(c,.3),.7)),c=$.Ql(c,.2)):c="none";b.path.fill({color:c,opacity:a}).stroke({color:c,thickness:.8})},nb:R9,lb:"value",kb:"value"};Q9["line-2d"]={ob:8,xb:1,yb:[{name:"stroke",xc:"path",Hc:null,Jc:"stroke",Bc:!0,lc:!1,zIndex:9E-6}],vb:null,qb:null,nb:R9|2097152,lb:"value",kb:"value"};
v9.prototype.zg=Q9;$.vw(v9,v9.prototype.zg);$.Zo["cartesian-3d"]=y9;$.g=v9.prototype;$.g.bn=function(a){return $.wk(Jga,a,"column")};$.g.tU=function(){return!0};$.g.VD=function(a,b){var c;b||!this.N("zDistribution")?c=0:(c=z9(this),a=C9(this,a),c=c-a-1,c*=A9(this,b)+this.b);return c};$.g.WD=function(a,b){var c;b||!this.N("zDistribution")?c=0:(c=z9(this),a=C9(this,a),c=c-a-1,c*=B9(this,b)+this.K);return c};$.g.qx=function(){return new m9};$.g.YR=function(){var a=new o9;a.Oa=this;return a};
$.g.cS=function(){var a=new p9;a.Oa=this;return a};$.g.fS=function(){var a=new q9;a.Oa=this;return a};
$.g.eM=function(){this.Pg={};for(var a=this.we(),b,c=0;c<a.length;c++)if((b=a[c])&&b.enabled())if(b.check($.gy))if(b.vf())for(var d=b.hc();d.advance();){var e=b,f=1E-5*e.sa(),h=e.la(),k=$.O(h.get("value")),l=30;0<k?l=e.N("isVertical")?e.We()?l+f:this.N("zDistribution")?l+f:l-f:l+f:0>k&&(l=e.N("isVertical")?l-f:e.We()?l-f:l+f);h.G("zIndex",l)}else b.check(32)&&(this.Pg[k9(b)]=c);else d=1E-5*b.Hg()+32,b.pg=d};
$.g.mT=function(a){a=a.clone().round();var b=this.Ou(a),c=z9(this),d=this.N("zAngle"),e=this.N("zAspect"),f=this.N("zPadding"),h=this.N("zDistribution"),k=$.H(d),d=$.H(90-d);if($.Wn(e)){for(var l=(0,window.parseFloat)(e)/100,e=l*Math.sin(d),m=l*Math.sin(k),p=l=0,q=this.we(),r,t=0;t<q.length;t++)if((r=q[t])&&r.enabled()&&r.check($.gy)){var u=r.Qa(),u=1/("ordinal"==u.Va()?u.values().length:r.la().Ib()),v;v=this.N("barsPadding");var w=this.N("barGroupsPadding");v=r.We()||h?1/(1+w):1/(c+(c-1)*v+w);u*=
v;!r.We()&&h?(l+=u*e,p+=u*m):l||(l=u*e,p=u*m)}this.b=Math.round(f*Math.sin(d));this.K=Math.round(f*Math.sin(k));f=this.ba?b.height/(1+l):b.width/(1+l);this.Ea=f*l;this.za=f*p;!this.Cg&&h&&(this.Ea+=this.b*(c-1),this.za+=this.K*(c-1));this.Ea=Math.round(this.Ea);this.za=Math.round(this.za)}else this.Na=!this.Cg&&h?e*c+f*(c-1):$.O(e),this.Ea=Math.round(this.Na*Math.sin(d)),this.za=Math.round(this.Na*Math.sin(k)),h=c-1,f*h>=this.Na&&(f=(this.Na-c)/h),this.b=Math.round(f*Math.sin(d)),this.K=Math.round(f*
Math.sin(k));this.Ea=Math.max(this.Ea,0)||0;this.za=Math.max(this.za,0)||0;this.b=Math.max(this.b,0)||0;this.K=Math.max(this.K,0)||0;a.top+=this.za;a.height-=this.za;a.width-=this.Ea;return a};$.g.nD=function(a,b,c){if(!this.Cg&&this.N("zDistribution")){if(0<a){a=1+this.N("barGroupsPadding");for(var d=1/a,e=0;e<b.length;e++)a=b[e].ia,a.check(262144)&&c^a.N("isVertical")&&($.Yx(a,.5),$.Xx(a,d))}}else v9.I.nD.call(this,a,b,c)};
$.g.Hf=function(a){var b=$.Un(a.target);return(b=b&&b.ia)&&!b.Ed&&b.enabled()?b.Hf(a):v9.I.Hf.call(this,a)};var S9=v9.prototype;$.F("anychart.cartesian3d",y9);S9.xScale=S9.Qa;S9.yScale=S9.bb;S9.crosshair=S9.Oo;S9.xGrid=S9.ts;S9.yGrid=S9.us;S9.xMinorGrid=S9.Pu;S9.yMinorGrid=S9.Qu;S9.xAxis=S9.Bq;S9.getXAxesCount=S9.Ov;S9.yAxis=S9.Po;S9.getYAxesCount=S9.Qv;S9.getSeries=S9.je;S9.lineMarker=S9.qs;S9.rangeMarker=S9.rs;S9.textMarker=S9.ss;S9.palette=S9.Sk;S9.markerPalette=S9.Bi;S9.hatchFillPalette=S9.Ll;
S9.getType=S9.Va;S9.addSeries=S9.Rj;S9.getSeriesAt=S9.Wi;S9.getSeriesCount=S9.Cq;S9.removeSeries=S9.So;S9.removeSeriesAt=S9.To;S9.removeAllSeries=S9.Ro;S9.getPlotBounds=S9.Ne;S9.xZoom=S9.wi;S9.xScroller=S9.Qk;S9.getStat=S9.af;S9.getXScales=S9.er;S9.getYScales=S9.fr;$.Zo["area-3d"]=D9;$.Zo["bar-3d"]=E9;$.Zo["column-3d"]=F9;$.Zo["line-3d"]=G9;$.F("anychart.area3d",D9);$.F("anychart.bar3d",E9);$.F("anychart.column3d",F9);$.F("anychart.line3d",G9);}).call(this,$)}
