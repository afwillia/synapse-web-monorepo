import{g as U,a as E,b as o,_ as S,d as I,c as x}from"./createTheme-CWLQ-DuD.js";import{r as d}from"./index-Cu9bd8lq.js";import{s as N,u as w,c as T}from"./styled-BNZh1-oq.js";import{a as L}from"./List-CqRim60B.js";import{j as l}from"./jsx-runtime-DoxjgJx5.js";import{l as Z}from"./listItemButtonClasses-C_th0LMc.js";import{a as tt,u as et}from"./useForkRef-Bm_QQ74L.js";import{i as st}from"./isMuiElement-yx-QWTmT.js";import{i as F}from"./isHostComponent-DVu5iVWx.js";import{B as ot}from"./ButtonBase-CE85FUiZ.js";function at(t){return E("MuiListItem",t)}const f=U("MuiListItem",["root","container","focusVisible","dense","alignItemsFlexStart","disabled","divider","gutters","padding","button","secondaryAction","selected"]);function nt(t){return E("MuiListItemSecondaryAction",t)}U("MuiListItemSecondaryAction",["root","disableGutters"]);const it=["className"],rt=t=>{const{disableGutters:e,classes:s}=t;return T({root:["root",e&&"disableGutters"]},nt,s)},ct=N("div",{name:"MuiListItemSecondaryAction",slot:"Root",overridesResolver:(t,e)=>{const{ownerState:s}=t;return[e.root,s.disableGutters&&e.disableGutters]}})(({ownerState:t})=>o({position:"absolute",right:16,top:"50%",transform:"translateY(-50%)"},t.disableGutters&&{right:0})),D=d.forwardRef(function(e,s){const a=w({props:e,name:"MuiListItemSecondaryAction"}),{className:n}=a,i=S(a,it),p=d.useContext(L),u=o({},a,{disableGutters:p.disableGutters}),b=rt(u);return l.jsx(ct,o({className:I(b.root,n),ownerState:u,ref:s},i))});D.muiName="ListItemSecondaryAction";const lt=["className"],dt=["alignItems","autoFocus","button","children","className","component","components","componentsProps","ContainerComponent","ContainerProps","dense","disabled","disableGutters","disablePadding","divider","focusVisibleClassName","secondaryAction","selected","slotProps","slots"],pt=(t,e)=>{const{ownerState:s}=t;return[e.root,s.dense&&e.dense,s.alignItems==="flex-start"&&e.alignItemsFlexStart,s.divider&&e.divider,!s.disableGutters&&e.gutters,!s.disablePadding&&e.padding,s.button&&e.button,s.hasSecondaryAction&&e.secondaryAction]},ut=t=>{const{alignItems:e,button:s,classes:a,dense:n,disabled:i,disableGutters:p,disablePadding:u,divider:b,hasSecondaryAction:g,selected:A}=t;return T({root:["root",n&&"dense",!p&&"gutters",!u&&"padding",b&&"divider",i&&"disabled",s&&"button",e==="flex-start"&&"alignItemsFlexStart",g&&"secondaryAction",A&&"selected"],container:["container"]},at,a)},mt=N("div",{name:"MuiListItem",slot:"Root",overridesResolver:pt})(({theme:t,ownerState:e})=>o({display:"flex",justifyContent:"flex-start",alignItems:"center",position:"relative",textDecoration:"none",width:"100%",boxSizing:"border-box",textAlign:"left"},!e.disablePadding&&o({paddingTop:8,paddingBottom:8},e.dense&&{paddingTop:4,paddingBottom:4},!e.disableGutters&&{paddingLeft:16,paddingRight:16},!!e.secondaryAction&&{paddingRight:48}),!!e.secondaryAction&&{[`& > .${Z.root}`]:{paddingRight:48}},{[`&.${f.focusVisible}`]:{backgroundColor:(t.vars||t).palette.action.focus},[`&.${f.selected}`]:{backgroundColor:t.vars?`rgba(${t.vars.palette.primary.mainChannel} / ${t.vars.palette.action.selectedOpacity})`:x(t.palette.primary.main,t.palette.action.selectedOpacity),[`&.${f.focusVisible}`]:{backgroundColor:t.vars?`rgba(${t.vars.palette.primary.mainChannel} / calc(${t.vars.palette.action.selectedOpacity} + ${t.vars.palette.action.focusOpacity}))`:x(t.palette.primary.main,t.palette.action.selectedOpacity+t.palette.action.focusOpacity)}},[`&.${f.disabled}`]:{opacity:(t.vars||t).palette.action.disabledOpacity}},e.alignItems==="flex-start"&&{alignItems:"flex-start"},e.divider&&{borderBottom:`1px solid ${(t.vars||t).palette.divider}`,backgroundClip:"padding-box"},e.button&&{transition:t.transitions.create("background-color",{duration:t.transitions.duration.shortest}),"&:hover":{textDecoration:"none",backgroundColor:(t.vars||t).palette.action.hover,"@media (hover: none)":{backgroundColor:"transparent"}},[`&.${f.selected}:hover`]:{backgroundColor:t.vars?`rgba(${t.vars.palette.primary.mainChannel} / calc(${t.vars.palette.action.selectedOpacity} + ${t.vars.palette.action.hoverOpacity}))`:x(t.palette.primary.main,t.palette.action.selectedOpacity+t.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:t.vars?`rgba(${t.vars.palette.primary.mainChannel} / ${t.vars.palette.action.selectedOpacity})`:x(t.palette.primary.main,t.palette.action.selectedOpacity)}}},e.hasSecondaryAction&&{paddingRight:48})),ft=N("li",{name:"MuiListItem",slot:"Container",overridesResolver:(t,e)=>e.container})({position:"relative"}),Rt=d.forwardRef(function(e,s){const a=w({props:e,name:"MuiListItem"}),{alignItems:n="center",autoFocus:i=!1,button:p=!1,children:u,className:b,component:g,components:A={},componentsProps:G={},ContainerComponent:O="li",ContainerProps:{className:z}={},dense:j=!1,disabled:M=!1,disableGutters:P=!1,disablePadding:H=!1,divider:W=!1,focusVisibleClassName:Y,secondaryAction:h,selected:q=!1,slotProps:J={},slots:K={}}=a,Q=S(a.ContainerProps,lt),X=S(a,dt),k=d.useContext(L),R=d.useMemo(()=>({dense:j||k.dense||!1,alignItems:n,disableGutters:P}),[n,k.dense,j,P]),$=d.useRef(null);tt(()=>{i&&$.current&&$.current.focus()},[i]);const m=d.Children.toArray(u),B=m.length&&st(m[m.length-1],["ListItemSecondaryAction"]),y=o({},a,{alignItems:n,autoFocus:i,button:p,dense:R.dense,disabled:M,disableGutters:P,disablePadding:H,divider:W,hasSecondaryAction:B,selected:q}),V=ut(y),_=et($,s),C=K.root||A.Root||mt,v=J.root||G.root||{},r=o({className:I(V.root,v.className,b),disabled:M},X);let c=g||"li";return p&&(r.component=g||"div",r.focusVisibleClassName=I(f.focusVisible,Y),c=ot),B?(c=!r.component&&!g?"div":c,O==="li"&&(c==="li"?c="div":r.component==="li"&&(r.component="div")),l.jsx(L.Provider,{value:R,children:l.jsxs(ft,o({as:O,className:I(V.container,z),ref:_,ownerState:y},Q,{children:[l.jsx(C,o({},v,!F(C)&&{as:c,ownerState:o({},y,v.ownerState)},r,{children:m})),m.pop()]}))})):l.jsx(L.Provider,{value:R,children:l.jsxs(C,o({},v,{as:c,ref:_},!F(C)&&{ownerState:o({},y,v.ownerState)},r,{children:[m,h&&l.jsx(D,{children:h})]}))})});export{Rt as L};
