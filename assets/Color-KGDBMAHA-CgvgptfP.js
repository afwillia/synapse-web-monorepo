import{ae as $,a2 as re,a0 as ge,c as me,af as ve,ag as pe}from"./DocsRenderer-PKQXORMH-BzgNH922.js";import{a as c,r as h,g as be}from"./index-Cu9bd8lq.js";import{c as w}from"./index-BQnKCE5h.js";import{d as xe}from"./_getPrototype-DSx75BAr.js";import{n as _e}from"./now-3qigre4W.js";import{t as Ee}from"./toNumber-DDV9Xfgs.js";import"./iframe-qqH-bWW7.js";import"../sb-preview/runtime.js";import"./react-18-Csevynif.js";import"./index-zcEXKDIA.js";import"./index-GEGPABih.js";import"./index-D-8MO0q_.js";import"./extends-CF3RwP-h.js";import"./index.modern-BSaf6tm9.js";import"./_commonjs-dynamic-modules-TDtrdbi3.js";import"./index-CPky23Xz.js";import"./index-DrFu-skq.js";function M(){return(M=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var a in r)Object.prototype.hasOwnProperty.call(r,a)&&(e[a]=r[a])}return e}).apply(this,arguments)}function K(e,t){if(e==null)return{};var r,a,n={},l=Object.keys(e);for(a=0;a<l.length;a++)t.indexOf(r=l[a])>=0||(n[r]=e[r]);return n}function W(e){var t=h.useRef(e),r=h.useRef(function(a){t.current&&t.current(a)});return t.current=e,r.current}var R=function(e,t,r){return t===void 0&&(t=0),r===void 0&&(r=1),e>r?r:e<t?t:e},H=function(e){return"touches"in e},V=function(e){return e&&e.ownerDocument.defaultView||self},U=function(e,t,r){var a=e.getBoundingClientRect(),n=H(t)?function(l,i){for(var o=0;o<l.length;o++)if(l[o].identifier===i)return l[o];return l[0]}(t.touches,r):t;return{left:R((n.pageX-(a.left+V(e).pageXOffset))/a.width),top:R((n.pageY-(a.top+V(e).pageYOffset))/a.height)}},J=function(e){!H(e)&&e.preventDefault()},q=c.memo(function(e){var t=e.onMove,r=e.onKey,a=K(e,["onMove","onKey"]),n=h.useRef(null),l=W(t),i=W(r),o=h.useRef(null),u=h.useRef(!1),s=h.useMemo(function(){var x=function(p){J(p),(H(p)?p.touches.length>0:p.buttons>0)&&n.current?l(U(n.current,p,o.current)):C(!1)},I=function(){return C(!1)};function C(p){var m=u.current,_=V(n.current),y=p?_.addEventListener:_.removeEventListener;y(m?"touchmove":"mousemove",x),y(m?"touchend":"mouseup",I)}return[function(p){var m=p.nativeEvent,_=n.current;if(_&&(J(m),!function(E,N){return N&&!H(E)}(m,u.current)&&_)){if(H(m)){u.current=!0;var y=m.changedTouches||[];y.length&&(o.current=y[0].identifier)}_.focus(),l(U(_,m,o.current)),C(!0)}},function(p){var m=p.which||p.keyCode;m<37||m>40||(p.preventDefault(),i({left:m===39?.05:m===37?-.05:0,top:m===40?.05:m===38?-.05:0}))},C]},[i,l]),g=s[0],d=s[1],f=s[2];return h.useEffect(function(){return f},[f]),c.createElement("div",M({},a,{onTouchStart:g,onMouseDown:g,className:"react-colorful__interactive",ref:n,onKeyDown:d,tabIndex:0,role:"slider"}))}),L=function(e){return e.filter(Boolean).join(" ")},A=function(e){var t=e.color,r=e.left,a=e.top,n=a===void 0?.5:a,l=L(["react-colorful__pointer",e.className]);return c.createElement("div",{className:l,style:{top:100*n+"%",left:100*r+"%"}},c.createElement("div",{className:"react-colorful__pointer-fill",style:{backgroundColor:t}}))},b=function(e,t,r){return t===void 0&&(t=0),r===void 0&&(r=Math.pow(10,t)),Math.round(r*e)/r},we={grad:.9,turn:360,rad:360/(2*Math.PI)},ye=function(e){return oe(D(e))},D=function(e){return e[0]==="#"&&(e=e.substring(1)),e.length<6?{r:parseInt(e[0]+e[0],16),g:parseInt(e[1]+e[1],16),b:parseInt(e[2]+e[2],16),a:e.length===4?b(parseInt(e[3]+e[3],16)/255,2):1}:{r:parseInt(e.substring(0,2),16),g:parseInt(e.substring(2,4),16),b:parseInt(e.substring(4,6),16),a:e.length===8?b(parseInt(e.substring(6,8),16)/255,2):1}},Ce=function(e,t){return t===void 0&&(t="deg"),Number(e)*(we[t]||1)},ke=function(e){var t=/hsla?\(?\s*(-?\d*\.?\d+)(deg|rad|grad|turn)?[,\s]+(-?\d*\.?\d+)%?[,\s]+(-?\d*\.?\d+)%?,?\s*[/\s]*(-?\d*\.?\d+)?(%)?\s*\)?/i.exec(e);return t?$e({h:Ce(t[1],t[2]),s:Number(t[3]),l:Number(t[4]),a:t[5]===void 0?1:Number(t[5])/(t[6]?100:1)}):{h:0,s:0,v:0,a:1}},$e=function(e){var t=e.s,r=e.l;return{h:e.h,s:(t*=(r<50?r:100-r)/100)>0?2*t/(r+t)*100:0,v:r+t,a:e.a}},Ne=function(e){return Se(ne(e))},ae=function(e){var t=e.s,r=e.v,a=e.a,n=(200-t)*r/100;return{h:b(e.h),s:b(n>0&&n<200?t*r/100/(n<=100?n:200-n)*100:0),l:b(n/2),a:b(a,2)}},F=function(e){var t=ae(e);return"hsl("+t.h+", "+t.s+"%, "+t.l+"%)"},B=function(e){var t=ae(e);return"hsla("+t.h+", "+t.s+"%, "+t.l+"%, "+t.a+")"},ne=function(e){var t=e.h,r=e.s,a=e.v,n=e.a;t=t/360*6,r/=100,a/=100;var l=Math.floor(t),i=a*(1-r),o=a*(1-(t-l)*r),u=a*(1-(1-t+l)*r),s=l%6;return{r:b(255*[a,o,i,i,u,a][s]),g:b(255*[u,a,a,o,i,i][s]),b:b(255*[i,i,u,a,a,o][s]),a:b(n,2)}},Me=function(e){var t=/rgba?\(?\s*(-?\d*\.?\d+)(%)?[,\s]+(-?\d*\.?\d+)(%)?[,\s]+(-?\d*\.?\d+)(%)?,?\s*[/\s]*(-?\d*\.?\d+)?(%)?\s*\)?/i.exec(e);return t?oe({r:Number(t[1])/(t[2]?100/255:1),g:Number(t[3])/(t[4]?100/255:1),b:Number(t[5])/(t[6]?100/255:1),a:t[7]===void 0?1:Number(t[7])/(t[8]?100:1)}):{h:0,s:0,v:0,a:1}},T=function(e){var t=e.toString(16);return t.length<2?"0"+t:t},Se=function(e){var t=e.r,r=e.g,a=e.b,n=e.a,l=n<1?T(b(255*n)):"";return"#"+T(t)+T(r)+T(a)+l},oe=function(e){var t=e.r,r=e.g,a=e.b,n=e.a,l=Math.max(t,r,a),i=l-Math.min(t,r,a),o=i?l===t?(r-a)/i:l===r?2+(a-t)/i:4+(t-r)/i:0;return{h:b(60*(o<0?o+6:o)),s:b(l?i/l*100:0),v:b(l/255*100),a:n}},le=c.memo(function(e){var t=e.hue,r=e.onChange,a=L(["react-colorful__hue",e.className]);return c.createElement("div",{className:a},c.createElement(q,{onMove:function(n){r({h:360*n.left})},onKey:function(n){r({h:R(t+360*n.left,0,360)})},"aria-label":"Hue","aria-valuenow":b(t),"aria-valuemax":"360","aria-valuemin":"0"},c.createElement(A,{className:"react-colorful__hue-pointer",left:t/360,color:F({h:t,s:100,v:100,a:1})})))}),ie=c.memo(function(e){var t=e.hsva,r=e.onChange,a={backgroundColor:F({h:t.h,s:100,v:100,a:1})};return c.createElement("div",{className:"react-colorful__saturation",style:a},c.createElement(q,{onMove:function(n){r({s:100*n.left,v:100-100*n.top})},onKey:function(n){r({s:R(t.s+100*n.left,0,100),v:R(t.v-100*n.top,0,100)})},"aria-label":"Color","aria-valuetext":"Saturation "+b(t.s)+"%, Brightness "+b(t.v)+"%"},c.createElement(A,{className:"react-colorful__saturation-pointer",top:1-t.v/100,left:t.s/100,color:F(t)})))}),ue=function(e,t){if(e===t)return!0;for(var r in e)if(e[r]!==t[r])return!1;return!0},se=function(e,t){return e.replace(/\s/g,"")===t.replace(/\s/g,"")},Re=function(e,t){return e.toLowerCase()===t.toLowerCase()||ue(D(e),D(t))};function ce(e,t,r){var a=W(r),n=h.useState(function(){return e.toHsva(t)}),l=n[0],i=n[1],o=h.useRef({color:t,hsva:l});h.useEffect(function(){if(!e.equal(t,o.current.color)){var s=e.toHsva(t);o.current={hsva:s,color:t},i(s)}},[t,e]),h.useEffect(function(){var s;ue(l,o.current.hsva)||e.equal(s=e.fromHsva(l),o.current.color)||(o.current={hsva:l,color:s},a(s))},[l,e,a]);var u=h.useCallback(function(s){i(function(g){return Object.assign({},g,s)})},[]);return[l,u]}var Ie=typeof window<"u"?h.useLayoutEffect:h.useEffect,Oe=function(){return typeof __webpack_nonce__<"u"?__webpack_nonce__:void 0},Q=new Map,fe=function(e){Ie(function(){var t=e.current?e.current.ownerDocument:document;if(t!==void 0&&!Q.has(t)){var r=t.createElement("style");r.innerHTML=`.react-colorful{position:relative;display:flex;flex-direction:column;width:200px;height:200px;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;cursor:default}.react-colorful__saturation{position:relative;flex-grow:1;border-color:transparent;border-bottom:12px solid #000;border-radius:8px 8px 0 0;background-image:linear-gradient(0deg,#000,transparent),linear-gradient(90deg,#fff,hsla(0,0%,100%,0))}.react-colorful__alpha-gradient,.react-colorful__pointer-fill{content:"";position:absolute;left:0;top:0;right:0;bottom:0;pointer-events:none;border-radius:inherit}.react-colorful__alpha-gradient,.react-colorful__saturation{box-shadow:inset 0 0 0 1px rgba(0,0,0,.05)}.react-colorful__alpha,.react-colorful__hue{position:relative;height:24px}.react-colorful__hue{background:linear-gradient(90deg,red 0,#ff0 17%,#0f0 33%,#0ff 50%,#00f 67%,#f0f 83%,red)}.react-colorful__last-control{border-radius:0 0 8px 8px}.react-colorful__interactive{position:absolute;left:0;top:0;right:0;bottom:0;border-radius:inherit;outline:none;touch-action:none}.react-colorful__pointer{position:absolute;z-index:1;box-sizing:border-box;width:28px;height:28px;transform:translate(-50%,-50%);background-color:#fff;border:2px solid #fff;border-radius:50%;box-shadow:0 2px 4px rgba(0,0,0,.2)}.react-colorful__interactive:focus .react-colorful__pointer{transform:translate(-50%,-50%) scale(1.1)}.react-colorful__alpha,.react-colorful__alpha-pointer{background-color:#fff;background-image:url('data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill-opacity=".05"><path d="M8 0h8v8H8zM0 8h8v8H0z"/></svg>')}.react-colorful__saturation-pointer{z-index:3}.react-colorful__hue-pointer{z-index:2}`,Q.set(t,r);var a=Oe();a&&r.setAttribute("nonce",a),t.head.appendChild(r)}},[])},He=function(e){var t=e.className,r=e.colorModel,a=e.color,n=a===void 0?r.defaultColor:a,l=e.onChange,i=K(e,["className","colorModel","color","onChange"]),o=h.useRef(null);fe(o);var u=ce(r,n,l),s=u[0],g=u[1],d=L(["react-colorful",t]);return c.createElement("div",M({},i,{ref:o,className:d}),c.createElement(ie,{hsva:s,onChange:g}),c.createElement(le,{hue:s.h,onChange:g,className:"react-colorful__last-control"}))},Le={defaultColor:"000",toHsva:ye,fromHsva:function(e){return Ne({h:e.h,s:e.s,v:e.v,a:1})},equal:Re},Te=function(e){return c.createElement(He,M({},e,{colorModel:Le}))},ze=function(e){var t=e.className,r=e.hsva,a=e.onChange,n={backgroundImage:"linear-gradient(90deg, "+B(Object.assign({},r,{a:0}))+", "+B(Object.assign({},r,{a:1}))+")"},l=L(["react-colorful__alpha",t]),i=b(100*r.a);return c.createElement("div",{className:l},c.createElement("div",{className:"react-colorful__alpha-gradient",style:n}),c.createElement(q,{onMove:function(o){a({a:o.left})},onKey:function(o){a({a:R(r.a+o.left)})},"aria-label":"Alpha","aria-valuetext":i+"%","aria-valuenow":i,"aria-valuemin":"0","aria-valuemax":"100"},c.createElement(A,{className:"react-colorful__alpha-pointer",left:r.a,color:B(r)})))},de=function(e){var t=e.className,r=e.colorModel,a=e.color,n=a===void 0?r.defaultColor:a,l=e.onChange,i=K(e,["className","colorModel","color","onChange"]),o=h.useRef(null);fe(o);var u=ce(r,n,l),s=u[0],g=u[1],d=L(["react-colorful",t]);return c.createElement("div",M({},i,{ref:o,className:d}),c.createElement(ie,{hsva:s,onChange:g}),c.createElement(le,{hue:s.h,onChange:g}),c.createElement(ze,{hsva:s,onChange:g,className:"react-colorful__last-control"}))},Pe={defaultColor:"hsla(0, 0%, 0%, 1)",toHsva:ke,fromHsva:B,equal:se},Be=function(e){return c.createElement(de,M({},e,{colorModel:Pe}))},Xe={defaultColor:"rgba(0, 0, 0, 1)",toHsva:Me,fromHsva:function(e){var t=ne(e);return"rgba("+t.r+", "+t.g+", "+t.b+", "+t.a+")"},equal:se},je=function(e){return c.createElement(de,M({},e,{colorModel:Xe}))},We=xe,j=_e,Z=Ee,Ve="Expected a function",De=Math.max,Fe=Math.min;function Ge(e,t,r){var a,n,l,i,o,u,s=0,g=!1,d=!1,f=!0;if(typeof e!="function")throw new TypeError(Ve);t=Z(t)||0,We(r)&&(g=!!r.leading,d="maxWait"in r,l=d?De(Z(r.maxWait)||0,t):l,f="trailing"in r?!!r.trailing:f);function x(v){var k=a,O=n;return a=n=void 0,s=v,i=e.apply(O,k),i}function I(v){return s=v,o=setTimeout(m,t),g?x(v):i}function C(v){var k=v-u,O=v-s,Y=t-k;return d?Fe(Y,l-O):Y}function p(v){var k=v-u,O=v-s;return u===void 0||k>=t||k<0||d&&O>=l}function m(){var v=j();if(p(v))return _(v);o=setTimeout(m,C(v))}function _(v){return o=void 0,f&&a?x(v):(a=n=void 0,i)}function y(){o!==void 0&&clearTimeout(o),s=0,a=u=n=o=void 0}function E(){return o===void 0?i:_(j())}function N(){var v=j(),k=p(v);if(a=arguments,n=this,u=v,k){if(o===void 0)return I(u);if(d)return clearTimeout(o),o=setTimeout(m,t),x(u)}return o===void 0&&(o=setTimeout(m,t)),i}return N.cancel=y,N.flush=E,N}var Ke=Ge;const qe=be(Ke);var Ae=$.div({position:"relative",maxWidth:250,'&[aria-readonly="true"]':{opacity:.5}}),Ye=$(re)({position:"absolute",zIndex:1,top:4,left:4,"[aria-readonly=true] &":{cursor:"not-allowed"}}),Ue=$.div({width:200,margin:5,".react-colorful__saturation":{borderRadius:"4px 4px 0 0"},".react-colorful__hue":{boxShadow:"inset 0 0 0 1px rgb(0 0 0 / 5%)"},".react-colorful__last-control":{borderRadius:"0 0 4px 4px"}}),Je=$(ge)(({theme:e})=>({fontFamily:e.typography.fonts.base})),Qe=$.div({display:"grid",gridTemplateColumns:"repeat(9, 16px)",gap:6,padding:3,marginTop:5,width:200}),Ze=$.div(({theme:e,active:t})=>({width:16,height:16,boxShadow:t?`${e.appBorderColor} 0 0 0 1px inset, ${e.textMutedColor}50 0 0 0 4px`:`${e.appBorderColor} 0 0 0 1px inset`,borderRadius:e.appBorderRadius})),et=`url('data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill-opacity=".05"><path d="M8 0h8v8H8zM0 8h8v8H0z"/></svg>')`,ee=({value:e,style:t,...r})=>{let a=`linear-gradient(${e}, ${e}), ${et}, linear-gradient(#fff, #fff)`;return c.createElement(Ze,{...r,style:{...t,backgroundImage:a}})},tt=$(me.Input)(({theme:e,readOnly:t})=>({width:"100%",paddingLeft:30,paddingRight:30,boxSizing:"border-box",fontFamily:e.typography.fonts.base})),rt=$(ve)(({theme:e})=>({position:"absolute",zIndex:1,top:6,right:7,width:20,height:20,padding:4,boxSizing:"border-box",cursor:"pointer",color:e.input.color})),he=(e=>(e.RGB="rgb",e.HSL="hsl",e.HEX="hex",e))(he||{}),z=Object.values(he),at=/\(([0-9]+),\s*([0-9]+)%?,\s*([0-9]+)%?,?\s*([0-9.]+)?\)/,nt=/^\s*rgba?\(([0-9]+),\s*([0-9]+),\s*([0-9]+),?\s*([0-9.]+)?\)\s*$/i,ot=/^\s*hsla?\(([0-9]+),\s*([0-9]+)%,\s*([0-9]+)%,?\s*([0-9.]+)?\)\s*$/i,G=/^\s*#?([0-9a-f]{3}|[0-9a-f]{6})\s*$/i,lt=/^\s*#?([0-9a-f]{3})\s*$/i,it={hex:Te,rgb:je,hsl:Be},P={hex:"transparent",rgb:"rgba(0, 0, 0, 0)",hsl:"hsla(0, 0%, 0%, 0)"},te=e=>{let t=e==null?void 0:e.match(at);if(!t)return[0,0,0,1];let[,r,a,n,l=1]=t;return[r,a,n,l].map(Number)},S=e=>{if(!e)return;let t=!0;if(nt.test(e)){let[i,o,u,s]=te(e),[g,d,f]=w.rgb.hsl([i,o,u])||[0,0,0];return{valid:t,value:e,keyword:w.rgb.keyword([i,o,u]),colorSpace:"rgb",rgb:e,hsl:`hsla(${g}, ${d}%, ${f}%, ${s})`,hex:`#${w.rgb.hex([i,o,u]).toLowerCase()}`}}if(ot.test(e)){let[i,o,u,s]=te(e),[g,d,f]=w.hsl.rgb([i,o,u])||[0,0,0];return{valid:t,value:e,keyword:w.hsl.keyword([i,o,u]),colorSpace:"hsl",rgb:`rgba(${g}, ${d}, ${f}, ${s})`,hsl:e,hex:`#${w.hsl.hex([i,o,u]).toLowerCase()}`}}let r=e.replace("#",""),a=w.keyword.rgb(r)||w.hex.rgb(r),n=w.rgb.hsl(a),l=e;if(/[^#a-f0-9]/i.test(e)?l=r:G.test(e)&&(l=`#${r}`),l.startsWith("#"))t=G.test(l);else try{w.keyword.hex(l)}catch{t=!1}return{valid:t,value:l,keyword:w.rgb.keyword(a),colorSpace:"hex",rgb:`rgba(${a[0]}, ${a[1]}, ${a[2]}, 1)`,hsl:`hsla(${n[0]}, ${n[1]}%, ${n[2]}%, 1)`,hex:l}},ut=(e,t,r)=>{if(!e||!(t!=null&&t.valid))return P[r];if(r!=="hex")return(t==null?void 0:t[r])||P[r];if(!t.hex.startsWith("#"))try{return`#${w.keyword.hex(t.hex)}`}catch{return P.hex}let a=t.hex.match(lt);if(!a)return G.test(t.hex)?t.hex:P.hex;let[n,l,i]=a[1].split("");return`#${n}${n}${l}${l}${i}${i}`},st=(e,t)=>{let[r,a]=h.useState(e||""),[n,l]=h.useState(()=>S(r)),[i,o]=h.useState((n==null?void 0:n.colorSpace)||"hex");h.useEffect(()=>{let d=e||"",f=S(d);a(d),l(f),o((f==null?void 0:f.colorSpace)||"hex")},[e]);let u=h.useMemo(()=>ut(r,n,i).toLowerCase(),[r,n,i]),s=h.useCallback(d=>{let f=S(d),x=(f==null?void 0:f.value)||d||"";a(x),x===""&&(l(void 0),t(void 0)),f&&(l(f),o(f.colorSpace),t(f.value))},[t]),g=h.useCallback(()=>{let d=z.indexOf(i)+1;d>=z.length&&(d=0),o(z[d]);let f=(n==null?void 0:n[z[d]])||"";a(f),t(f)},[n,i,t]);return{value:r,realValue:u,updateValue:s,color:n,colorSpace:i,cycleColorSpace:g}},X=e=>e.replace(/\s*/,"").toLowerCase(),ct=(e,t,r)=>{let[a,n]=h.useState(t!=null&&t.valid?[t]:[]);h.useEffect(()=>{t===void 0&&n([])},[t]);let l=h.useMemo(()=>(e||[]).map(o=>typeof o=="string"?S(o):o.title?{...S(o.color),keyword:o.title}:S(o.color)).concat(a).filter(Boolean).slice(-27),[e,a]),i=h.useCallback(o=>{o!=null&&o.valid&&(l.some(u=>X(u[r])===X(o[r]))||n(u=>u.concat(o)))},[r,l]);return{presets:l,addPreset:i}},ft=({name:e,value:t,onChange:r,onFocus:a,onBlur:n,presetColors:l,startOpen:i=!1,argType:o})=>{var y;let u=h.useCallback(qe(r,200),[r]),{value:s,realValue:g,updateValue:d,color:f,colorSpace:x,cycleColorSpace:I}=st(t,u),{presets:C,addPreset:p}=ct(l,f,x),m=it[x],_=!!((y=o==null?void 0:o.table)!=null&&y.readonly);return c.createElement(Ae,{"aria-readonly":_},c.createElement(Ye,{startOpen:i,trigger:_?[null]:void 0,closeOnOutsideClick:!0,onVisibleChange:()=>p(f),tooltip:c.createElement(Ue,null,c.createElement(m,{color:g==="transparent"?"#000000":g,onChange:d,onFocus:a,onBlur:n}),C.length>0&&c.createElement(Qe,null,C.map((E,N)=>c.createElement(re,{key:`${E.value}-${N}`,hasChrome:!1,tooltip:c.createElement(Je,{note:E.keyword||E.value})},c.createElement(ee,{value:E[x],active:f&&X(E[x])===X(f[x]),onClick:()=>d(E.value)})))))},c.createElement(ee,{value:g,style:{margin:4}})),c.createElement(tt,{id:pe(e),value:s,onChange:E=>d(E.target.value),onFocus:E=>E.target.select(),readOnly:_,placeholder:"Choose color..."}),s?c.createElement(rt,{onClick:I}):null)},St=ft;export{ft as ColorControl,St as default};
