import{_ as j,b as l,g as F,a as N,e as z,j as b,l as L,d as W}from"./createTheme-BIBP8v0l.js";import{r as H}from"./index-Cu9bd8lq.js";import{u as U,s as M,c as V}from"./styled-DKRXvDfM.js";import{r as Z,m as q,a as D}from"./mergeSlotProps-D9SyexBH.js";import{u as G}from"./useForkRef-Bm_QQ74L.js";import{c as x}from"./createSvgIcon-Dn0UJ7ef.js";import{j as s}from"./jsx-runtime-DoxjgJx5.js";import{P as J}from"./Paper-BxvgHMc4.js";import{I as K}from"./IconButton-DhHKwBf8.js";const Q=["className","elementType","ownerState","externalForwardedProps","getSlotOwnerState","internalForwardedProps"],X=["component","slots","slotProps"],Y=["component"];function R(o,e){const{className:r,elementType:t,ownerState:a,externalForwardedProps:p,getSlotOwnerState:C,internalForwardedProps:d}=e,S=j(e,Q),{component:u,slots:f={[o]:void 0},slotProps:A={[o]:void 0}}=p,h=j(p,X),g=f[o]||t,m=Z(A[o],a),i=q(l({className:r},S,{externalForwardedProps:o==="root"?h:void 0,externalSlotProps:m})),{props:{component:P},internalRef:w}=i,y=j(i.props,Y),$=G(w,m==null?void 0:m.ref,e.ref),n=C?C(y):{},c=l({},a,n),v=o==="root"?P||u:P,I=D(g,l({},o==="root"&&!u&&!f[o]&&d,o!=="root"&&!f[o]&&d,y,v&&{as:v},{ref:$}),c);return Object.keys(n).forEach(O=>{delete I[O]}),[g,I]}function oo(o){return U}function to(o){return N("MuiAlert",o)}const k=F("MuiAlert",["root","action","icon","message","filled","colorSuccess","colorInfo","colorWarning","colorError","filledSuccess","filledInfo","filledWarning","filledError","outlined","outlinedSuccess","outlinedInfo","outlinedWarning","outlinedError","standard","standardSuccess","standardInfo","standardWarning","standardError"]),eo=x(s.jsx("path",{d:"M20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4C12.76,4 13.5,4.11 14.2, 4.31L15.77,2.74C14.61,2.26 13.34,2 12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0, 0 22,12M7.91,10.08L6.5,11.5L11,16L21,6L19.59,4.58L11,13.17L7.91,10.08Z"}),"SuccessOutlined"),so=x(s.jsx("path",{d:"M12 5.99L19.53 19H4.47L12 5.99M12 2L1 21h22L12 2zm1 14h-2v2h2v-2zm0-6h-2v4h2v-4z"}),"ReportProblemOutlined"),ro=x(s.jsx("path",{d:"M11 15h2v2h-2zm0-8h2v6h-2zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"}),"ErrorOutline"),no=x(s.jsx("path",{d:"M11,9H13V7H11M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20, 12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10, 10 0 0,0 12,2M11,17H13V11H11V17Z"}),"InfoOutlined"),lo=x(s.jsx("path",{d:"M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"}),"Close"),ao=["action","children","className","closeText","color","components","componentsProps","icon","iconMapping","onClose","role","severity","slotProps","slots","variant"],io=oo(),co=o=>{const{variant:e,color:r,severity:t,classes:a}=o,p={root:["root",`color${z(r||t)}`,`${e}${z(r||t)}`,`${e}`],icon:["icon"],message:["message"],action:["action"]};return V(p,to,a)},po=M(J,{name:"MuiAlert",slot:"Root",overridesResolver:(o,e)=>{const{ownerState:r}=o;return[e.root,e[r.variant],e[`${r.variant}${z(r.color||r.severity)}`]]}})(({theme:o})=>{const e=o.palette.mode==="light"?b:L,r=o.palette.mode==="light"?L:b;return l({},o.typography.body2,{backgroundColor:"transparent",display:"flex",padding:"6px 16px",variants:[...Object.entries(o.palette).filter(([,t])=>t.main&&t.light).map(([t])=>({props:{colorSeverity:t,variant:"standard"},style:{color:o.vars?o.vars.palette.Alert[`${t}Color`]:e(o.palette[t].light,.6),backgroundColor:o.vars?o.vars.palette.Alert[`${t}StandardBg`]:r(o.palette[t].light,.9),[`& .${k.icon}`]:o.vars?{color:o.vars.palette.Alert[`${t}IconColor`]}:{color:o.palette[t].main}}})),...Object.entries(o.palette).filter(([,t])=>t.main&&t.light).map(([t])=>({props:{colorSeverity:t,variant:"outlined"},style:{color:o.vars?o.vars.palette.Alert[`${t}Color`]:e(o.palette[t].light,.6),border:`1px solid ${(o.vars||o).palette[t].light}`,[`& .${k.icon}`]:o.vars?{color:o.vars.palette.Alert[`${t}IconColor`]}:{color:o.palette[t].main}}})),...Object.entries(o.palette).filter(([,t])=>t.main&&t.dark).map(([t])=>({props:{colorSeverity:t,variant:"filled"},style:l({fontWeight:o.typography.fontWeightMedium},o.vars?{color:o.vars.palette.Alert[`${t}FilledColor`],backgroundColor:o.vars.palette.Alert[`${t}FilledBg`]}:{backgroundColor:o.palette.mode==="dark"?o.palette[t].dark:o.palette[t].main,color:o.palette.getContrastText(o.palette[t].main)})}))]})}),uo=M("div",{name:"MuiAlert",slot:"Icon",overridesResolver:(o,e)=>e.icon})({marginRight:12,padding:"7px 0",display:"flex",fontSize:22,opacity:.9}),fo=M("div",{name:"MuiAlert",slot:"Message",overridesResolver:(o,e)=>e.message})({padding:"8px 0",minWidth:0,overflow:"auto"}),T=M("div",{name:"MuiAlert",slot:"Action",overridesResolver:(o,e)=>e.action})({display:"flex",alignItems:"flex-start",padding:"4px 0 0 16px",marginLeft:"auto",marginRight:-8}),E={success:s.jsx(eo,{fontSize:"inherit"}),warning:s.jsx(so,{fontSize:"inherit"}),error:s.jsx(ro,{fontSize:"inherit"}),info:s.jsx(no,{fontSize:"inherit"})},Io=H.forwardRef(function(e,r){const t=io({props:e,name:"MuiAlert"}),{action:a,children:p,className:C,closeText:d="Close",color:S,components:u={},componentsProps:f={},icon:A,iconMapping:h=E,onClose:g,role:m="alert",severity:i="success",slotProps:P={},slots:w={},variant:y="standard"}=t,$=j(t,ao),n=l({},t,{color:S,severity:i,variant:y,colorSeverity:S||i}),c=co(n),v={slots:l({closeButton:u.CloseButton,closeIcon:u.CloseIcon},w),slotProps:l({},f,P)},[I,O]=R("closeButton",{elementType:K,externalForwardedProps:v,ownerState:n}),[_,B]=R("closeIcon",{elementType:lo,externalForwardedProps:v,ownerState:n});return s.jsxs(po,l({role:m,elevation:0,ownerState:n,className:W(c.root,C),ref:r},$,{children:[A!==!1?s.jsx(uo,{ownerState:n,className:c.icon,children:A||h[i]||E[i]}):null,s.jsx(fo,{ownerState:n,className:c.message,children:p}),a!=null?s.jsx(T,{ownerState:n,className:c.action,children:a}):null,a==null&&g?s.jsx(T,{ownerState:n,className:c.action,children:s.jsx(I,l({size:"small","aria-label":d,title:d,color:"inherit",onClick:g},O,{children:s.jsx(_,l({fontSize:"small"},B))}))}):null]}))});export{Io as A,lo as C,oo as c,R as u};