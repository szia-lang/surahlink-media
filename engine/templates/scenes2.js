// Extra background scenes. Loaded by growth.html; relies on rng/noise1/grain/vignette defined there.
function darken(ctx,w,h,a){ctx.fillStyle=`rgba(0,0,0,${a})`;ctx.fillRect(0,0,w,h)}
function blob(ctx,x,y,r,col){ctx.fillStyle=col;ctx.beginPath();ctx.arc(x,y,r,0,7);ctx.fill()}

// rain on a window at night
function rain(ctx,w,h,seed){const r=rng(seed);
 let g=ctx.createLinearGradient(0,0,0,h);g.addColorStop(0,'#0b1220');g.addColorStop(.6,'#18222e');g.addColorStop(1,'#231b17');ctx.fillStyle=g;ctx.fillRect(0,0,w,h);
 ctx.globalCompositeOperation='lighter';ctx.filter='blur(28px)';
 for(let i=0;i<70;i++){const warm=r()<.7;blob(ctx,r()*w,h*(.25+r()*.7),20+r()*70,warm?`rgba(255,${170+r()*60|0},${90+r()*60|0},.28)`:`rgba(120,170,255,.22)`)}
 ctx.filter='none';ctx.globalCompositeOperation='source-over';
 // streaks
 for(let i=0;i<70;i++){let x=r()*w,y=r()*h*.6;const len=200+r()*700;ctx.strokeStyle=`rgba(220,235,255,${.05+r()*.1})`;ctx.lineWidth=1.5+r()*3;ctx.beginPath();ctx.moveTo(x,y);
  for(let k=0;k<len;k+=20){x+=(r()-.5)*4;ctx.lineTo(x,y+k)}ctx.stroke()}
 // droplets
 for(let i=0;i<900;i++){const x=r()*w,y=r()*h,s=1.5+r()*r()*9;
  ctx.fillStyle=`rgba(0,0,0,${.15+r()*.2})`;ctx.beginPath();ctx.ellipse(x,y+s*.3,s,s*1.15,0,0,7);ctx.fill();
  ctx.fillStyle=`rgba(230,240,255,${.12+r()*.25})`;ctx.beginPath();ctx.ellipse(x,y,s*.85,s,0,0,7);ctx.fill();
  ctx.fillStyle=`rgba(255,255,255,${.35+r()*.4})`;ctx.beginPath();ctx.arc(x-s*.3,y-s*.4,s*.25,0,7);ctx.fill()}
 grain(ctx,w,h,22,seed);vignette(ctx,w,h,.5);darken(ctx,w,h,.15)}

// candlelight
function candle(ctx,w,h,seed){const r=rng(seed);
 ctx.fillStyle='#120b07';ctx.fillRect(0,0,w,h);
 const cx=w*.5,base=h*.86,top=h*.7;
 let rg=ctx.createRadialGradient(cx,top-30,10,cx,top,h*.6);rg.addColorStop(0,'rgba(255,190,110,.55)');rg.addColorStop(.3,'rgba(190,110,50,.25)');rg.addColorStop(1,'rgba(0,0,0,0)');ctx.fillStyle=rg;ctx.fillRect(0,0,w,h);
 // background blurred candles
 ctx.filter='blur(18px)';for(const [x,s] of [[.18,.7],[.82,.55]]){const t=h*(.62+ (1-s)*.15);ctx.fillStyle='rgba(230,200,160,.35)';ctx.fillRect(w*x-50*s,t,100*s,h);blob(ctx,w*x,t-40*s,40*s,'rgba(255,200,120,.5)')}ctx.filter='none';
 // candle body
 let g=ctx.createLinearGradient(cx-110,0,cx+110,0);g.addColorStop(0,'#8a7766');g.addColorStop(.35,'#efe3cf');g.addColorStop(.7,'#d9c8ae');g.addColorStop(1,'#6e5d4e');
 ctx.fillStyle=g;ctx.beginPath();ctx.moveTo(cx-110,top);ctx.quadraticCurveTo(cx,top+28,cx+110,top);ctx.lineTo(cx+110,h);ctx.lineTo(cx-110,h);ctx.fill();
 ctx.fillStyle='rgba(255,220,170,.35)';ctx.beginPath();ctx.ellipse(cx,top+4,108,20,0,0,7);ctx.fill();
 ctx.strokeStyle='#2a1a10';ctx.lineWidth=5;ctx.beginPath();ctx.moveTo(cx,top+6);ctx.lineTo(cx+2,top-22);ctx.stroke();
 // flame
 ctx.filter='blur(3px)';let fg=ctx.createRadialGradient(cx,top-60,4,cx,top-55,60);fg.addColorStop(0,'rgba(255,255,240,1)');fg.addColorStop(.4,'rgba(255,210,120,.95)');fg.addColorStop(1,'rgba(255,120,30,0)');
 ctx.fillStyle=fg;ctx.beginPath();ctx.moveTo(cx,top-140);ctx.bezierCurveTo(cx+38,top-70,cx+30,top-20,cx,top-18);ctx.bezierCurveTo(cx-30,top-20,cx-38,top-70,cx,top-140);ctx.fill();ctx.filter='none';
 ctx.globalCompositeOperation='lighter';ctx.filter='blur(40px)';blob(ctx,cx,top-70,90,'rgba(255,170,80,.35)');ctx.filter='none';ctx.globalCompositeOperation='source-over';
 grain(ctx,w,h,26,seed);vignette(ctx,w,h,.55);darken(ctx,w,h,.08)}

// ocean at dusk
function ocean(ctx,w,h,seed){const r=rng(seed);const hz=h*.58;
 let g=ctx.createLinearGradient(0,0,0,hz);g.addColorStop(0,'#1f2645');g.addColorStop(.45,'#6b4c6e');g.addColorStop(.8,'#d98a6a');g.addColorStop(1,'#f2c08c');ctx.fillStyle=g;ctx.fillRect(0,0,w,hz);
 ctx.filter='blur(26px)';for(let i=0;i<10;i++){ctx.fillStyle=`rgba(255,${170+r()*50|0},${150+r()*40|0},${.12+r()*.18})`;ctx.beginPath();ctx.ellipse(r()*w,hz*(.25+r()*.6),220+r()*300,22+r()*30,0,0,7);ctx.fill()}ctx.filter='none';
 let sg=ctx.createRadialGradient(w*.5,hz,5,w*.5,hz,320);sg.addColorStop(0,'rgba(255,240,205,1)');sg.addColorStop(.12,'rgba(255,215,160,.8)');sg.addColorStop(1,'rgba(255,190,140,0)');ctx.fillStyle=sg;ctx.fillRect(0,0,w,hz);
 g=ctx.createLinearGradient(0,hz,0,h);g.addColorStop(0,'#7a5a6a');g.addColorStop(.25,'#3a3550');g.addColorStop(1,'#0f1424');ctx.fillStyle=g;ctx.fillRect(0,hz,w,h-hz);
 for(let i=0;i<700;i++){const y=hz+Math.pow(r(),1.6)*(h-hz),d=(y-hz)/(h-hz);const spread=60+d*520;const x=w*.5+(r()-.5)*2*spread*(r()<.75?.6:1.6);
  const near=Math.abs(x-w*.5)<spread*.6;ctx.fillStyle=near?`rgba(255,${200+r()*40|0},150,${.25+r()*.4*(1-d)})`:`rgba(180,170,210,${.06+r()*.1})`;ctx.fillRect(x,y,8+d*60*r(),1.5+d*3)}
 grain(ctx,w,h,22,seed);vignette(ctx,w,h,.45);darken(ctx,w,h,.18)}

// misty mountains
function mountains(ctx,w,h,seed){const n=noise1(seed),n2=noise1(seed+5);
 let g=ctx.createLinearGradient(0,0,0,h);g.addColorStop(0,'#5d6d7e');g.addColorStop(.5,'#a9b3b8');g.addColorStop(1,'#c9cbc4');ctx.fillStyle=g;ctx.fillRect(0,0,w,h);
 const layers=[['#8d9aa3',.42],['#6f7f88',.52],['#53636c',.62],['#3a4950',.72],['#232f34',.84]];
 layers.forEach(([c,y0],li)=>{ctx.fillStyle=c;ctx.beginPath();ctx.moveTo(0,h);for(let x=0;x<=w;x+=6){const y=h*y0-(n(x/(260-li*30)+li*9)*180+n2(x/60+li*3)*30)*(1-li*.1);ctx.lineTo(x,y)}ctx.lineTo(w,h);ctx.fill();
  ctx.filter='blur(40px)';ctx.fillStyle='rgba(225,228,224,.45)';ctx.fillRect(-100,h*y0-20,w+200,120);ctx.filter='none'});
 grain(ctx,w,h,20,seed);vignette(ctx,w,h,.4);darken(ctx,w,h,.32)}

// prayer mat with tasbih heart
function prayerMat(ctx,w,h,seed,o={}){const r=rng(seed);const col=o.mat||[38,62,52];const c=(m,a=1)=>`rgba(${col[0]*m|0},${col[1]*m|0},${col[2]*m|0},${a})`;
 ctx.fillStyle='#6d6a66';ctx.fillRect(0,0,w,h);for(let i=0;i<40000;i++){const v=90+r()*40|0;ctx.fillStyle=`rgba(${v},${v-3},${v-6},.5)`;ctx.fillRect(r()*w,r()*h*.2,2,2)}
 const mx=60,my=h*.14;ctx.fillStyle=c(1);ctx.fillRect(mx,my,w-mx*2+200,h);
 // fringe
 ctx.strokeStyle=c(1.8,.9);ctx.lineWidth=3;for(let x=mx;x<w;x+=7){ctx.beginPath();ctx.moveTo(x,my);ctx.lineTo(x+(r()-.5)*10,my-40-r()*30);ctx.stroke()}
 // embossed pattern
 const emb=(fn)=>{ctx.save();ctx.translate(-2,-2);ctx.strokeStyle=c(1.45,.8);fn();ctx.restore();ctx.save();ctx.translate(2,2);ctx.strokeStyle=c(.55,.9);fn();ctx.restore()};
 ctx.lineWidth=6;
 emb(()=>{ctx.strokeRect(mx+60,my+60,w-mx*2-120+200,h)});
 emb(()=>{ctx.strokeRect(mx+120,my+120,w-mx*2-240+200,h)});
 emb(()=>{ctx.beginPath();for(let x=mx+80;x<w;x+=56){ctx.moveTo(x,my+75);ctx.lineTo(x+40,my+75);ctx.lineTo(x+40,my+105);ctx.lineTo(x+16,my+105);ctx.lineTo(x+16,my+90)}ctx.stroke()});
 emb(()=>{ctx.beginPath();const ax=w*.52,ay=my+380;ctx.moveTo(ax-250,h);ctx.lineTo(ax-250,ay+180);ctx.quadraticCurveTo(ax-250,ay,ax,ay-120);ctx.quadraticCurveTo(ax+250,ay,ax+250,ay+180);ctx.lineTo(ax+250,h);ctx.stroke()});
 // pile texture
 for(let i=0;i<60000;i++){ctx.fillStyle=r()<.5?c(1.3,.12):c(.6,.15);ctx.fillRect(r()*w,my+r()*(h-my),2,2)}
 // tasbih heart
 const hx=w*.5,hy=h*.19,sc=6.4,beads=[];for(let t=0;t<Math.PI*2;t+=Math.PI*2/33){const x=16*Math.pow(Math.sin(t),3),y=-(13*Math.cos(t)-5*Math.cos(2*t)-2*Math.cos(3*t)-Math.cos(4*t));beads.push([hx+x*sc,hy+y*sc])}
 for(const [x,y] of beads){ctx.fillStyle='rgba(0,0,0,.35)';ctx.beginPath();ctx.arc(x+4,y+6,15,0,7);ctx.fill();let bg=ctx.createRadialGradient(x-5,y-6,2,x,y,16);bg.addColorStop(0,'#fff4f2');bg.addColorStop(.5,'#e9b9b6');bg.addColorStop(1,'#b98682');ctx.fillStyle=bg;ctx.beginPath();ctx.arc(x,y,15,0,7);ctx.fill()}
 const [bx,by]=beads[17];ctx.fillStyle='#efe6dc';ctx.fillRect(bx-9,by+10,18,36);ctx.strokeStyle='#efe6dc';ctx.lineWidth=2;for(let k=-8;k<=8;k+=2){ctx.beginPath();ctx.moveTo(bx,by+44);ctx.lineTo(bx+k*1.4,by+110);ctx.stroke()}
 grain(ctx,w,h,20,seed);vignette(ctx,w,h,.45);darken(ctx,w,h,.15)}

// golden window light on a wall
function windowLight(ctx,w,h,seed){const r=rng(seed);
 let g=ctx.createLinearGradient(0,0,w,h);g.addColorStop(0,'#7a5e45');g.addColorStop(1,'#4a3729');ctx.fillStyle=g;ctx.fillRect(0,0,w,h);
 ctx.save();ctx.filter='blur(14px)';ctx.translate(w*.1,h*.08);ctx.transform(1,0.18,-0.35,1,0,0);
 ctx.fillStyle='rgba(255,200,130,.55)';const pw=300,ph=520,gap=26;for(let i=0;i<2;i++)for(let j=0;j<2;j++)ctx.fillRect(i*(pw+gap),j*(ph+gap),pw,ph);ctx.restore();
 ctx.filter='blur(10px)';ctx.fillStyle='rgba(30,20,12,.55)';
 for(let i=0;i<14;i++){ctx.save();ctx.translate(w*(.45+r()*.4),h*(.2+r()*.35));ctx.rotate(r()*3);ctx.beginPath();ctx.ellipse(0,0,24+r()*30,80+r()*90,0,0,7);ctx.fill();ctx.restore()}
 ctx.lineWidth=8;ctx.strokeStyle='rgba(30,20,12,.5)';ctx.beginPath();ctx.moveTo(w*.62,h*.62);ctx.quadraticCurveTo(w*.7,h*.35,w*.66,h*.16);ctx.stroke();ctx.filter='none';
 grain(ctx,w,h,24,seed);vignette(ctx,w,h,.5);darken(ctx,w,h,.2)}
