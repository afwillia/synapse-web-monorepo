import{b as l,E as I,_ as P,g as E,a as T,d as _}from"./createTheme-CWLQ-DuD.js";import{r as p}from"./index-Cu9bd8lq.js";import{s as d,u as $,c as A}from"./styled-BNZh1-oq.js";import{c as N}from"./createSvgIcon-BhV3a4Zr.js";import{j as t}from"./jsx-runtime-DoxjgJx5.js";import{B as U}from"./ButtonBase-CE85FUiZ.js";import{T as L}from"./Typography-CaL9sKMg.js";import{u as H}from"./Grow-Bq_CDIHS.js";const O=N(t.jsx("path",{d:"M6 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm12 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"}),"MoreHoriz"),W=["slots","slotProps"],q=d(U)(({theme:e})=>l({display:"flex",marginLeft:`calc(${e.spacing(1)} * 0.5)`,marginRight:`calc(${e.spacing(1)} * 0.5)`},e.palette.mode==="light"?{backgroundColor:e.palette.grey[100],color:e.palette.grey[700]}:{backgroundColor:e.palette.grey[700],color:e.palette.grey[100]},{borderRadius:2,"&:hover, &:focus":l({},e.palette.mode==="light"?{backgroundColor:e.palette.grey[200]}:{backgroundColor:e.palette.grey[600]}),"&:active":l({boxShadow:e.shadows[0]},e.palette.mode==="light"?{backgroundColor:I(e.palette.grey[200],.12)}:{backgroundColor:I(e.palette.grey[600],.12)})})),V=d(O)({width:24,height:16});function D(e){const{slots:o={},slotProps:n={}}=e,a=P(e,W),r=e;return t.jsx("li",{children:t.jsx(q,l({focusRipple:!0},a,{ownerState:r,children:t.jsx(V,l({as:o.CollapsedIcon,ownerState:r},n.collapsedIcon))}))})}function F(e){return T("MuiBreadcrumbs",e)}const G=E("MuiBreadcrumbs",["root","ol","li","separator"]),J=["children","className","component","slots","slotProps","expandText","itemsAfterCollapse","itemsBeforeCollapse","maxItems","separator"],K=e=>{const{classes:o}=e;return A({root:["root"],li:["li"],ol:["ol"],separator:["separator"]},F,o)},Q=d(L,{name:"MuiBreadcrumbs",slot:"Root",overridesResolver:(e,o)=>[{[`& .${G.li}`]:o.li},o.root]})({}),X=d("ol",{name:"MuiBreadcrumbs",slot:"Ol",overridesResolver:(e,o)=>o.ol})({display:"flex",flexWrap:"wrap",alignItems:"center",padding:0,margin:0,listStyle:"none"}),Y=d("li",{name:"MuiBreadcrumbs",slot:"Separator",overridesResolver:(e,o)=>o.separator})({display:"flex",userSelect:"none",marginLeft:8,marginRight:8});function Z(e,o,n,a){return e.reduce((r,u,c)=>(c<e.length-1?r=r.concat(u,t.jsx(Y,{"aria-hidden":!0,className:o,ownerState:a,children:n},`separator-${c}`)):r.push(u),r),[])}const ce=p.forwardRef(function(o,n){const a=$({props:o,name:"MuiBreadcrumbs"}),{children:r,className:u,component:c="nav",slots:C={},slotProps:v={},expandText:B="Show path",itemsAfterCollapse:g=1,itemsBeforeCollapse:f=1,maxItems:x=8,separator:y="/"}=a,M=P(a,J),[S,k]=p.useState(!1),i=l({},a,{component:c,expanded:S,expandText:B,itemsAfterCollapse:g,itemsBeforeCollapse:f,maxItems:x,separator:y}),m=K(i),w=H({elementType:C.CollapsedIcon,externalSlotProps:v.collapsedIcon,ownerState:i}),R=p.useRef(null),z=s=>{const h=()=>{k(!0);const j=R.current.querySelector("a[href],button,[tabindex]");j&&j.focus()};return f+g>=s.length?s:[...s.slice(0,f),t.jsx(D,{"aria-label":B,slots:{CollapsedIcon:C.CollapsedIcon},slotProps:{collapsedIcon:w},onClick:h},"ellipsis"),...s.slice(s.length-g,s.length)]},b=p.Children.toArray(r).filter(s=>p.isValidElement(s)).map((s,h)=>t.jsx("li",{className:m.li,children:s},`child-${h}`));return t.jsx(Q,l({ref:n,component:c,color:"text.secondary",className:_(m.root,u),ownerState:i},M,{children:t.jsx(X,{className:m.ol,ref:R,ownerState:i,children:Z(S||x&&b.length<=x?b:z(b),m.separator,y,i)})}))});export{ce as B};
