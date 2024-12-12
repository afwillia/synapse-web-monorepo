import{j as i}from"./jsx-runtime-DoxjgJx5.js";import{r as v}from"./index-Cu9bd8lq.js";import{I as M}from"./IconSvg-xAN7XPj6.js";import{g as P,a as V,b as m,c as _,_ as W,d as O,e as n}from"./createTheme-BIBP8v0l.js";import{s as q,u as D,c as N}from"./styled-DKRXvDfM.js";import{a as A,b as H,B as G}from"./Button-j3jTttn9.js";import{P as F}from"./Tooltip-CTVx2uGI.js";import{G as U}from"./Grow-Bb1htYw2.js";import{P as J}from"./Paper-BxvgHMc4.js";import{M as K}from"./MenuList-Ckmb61NP.js";import{M as Q}from"./MenuItem-D3tilmmv.js";import{C as X}from"./ClickAwayListener-Ba-YFlDA.js";function Y(t){return v.Children.toArray(t).filter(o=>v.isValidElement(o))}function Z(t){return V("MuiButtonGroup",t)}const r=P("MuiButtonGroup",["root","contained","outlined","text","disableElevation","disabled","firstButton","fullWidth","vertical","grouped","groupedHorizontal","groupedVertical","groupedText","groupedTextHorizontal","groupedTextVertical","groupedTextPrimary","groupedTextSecondary","groupedOutlined","groupedOutlinedHorizontal","groupedOutlinedVertical","groupedOutlinedPrimary","groupedOutlinedSecondary","groupedContained","groupedContainedHorizontal","groupedContainedVertical","groupedContainedPrimary","groupedContainedSecondary","lastButton","middleButton"]),S=["children","className","color","component","disabled","disableElevation","disableFocusRipple","disableRipple","fullWidth","orientation","size","variant"],w=(t,o)=>{const{ownerState:e}=t;return[{[`& .${r.grouped}`]:o.grouped},{[`& .${r.grouped}`]:o[`grouped${n(e.orientation)}`]},{[`& .${r.grouped}`]:o[`grouped${n(e.variant)}`]},{[`& .${r.grouped}`]:o[`grouped${n(e.variant)}${n(e.orientation)}`]},{[`& .${r.grouped}`]:o[`grouped${n(e.variant)}${n(e.color)}`]},{[`& .${r.firstButton}`]:o.firstButton},{[`& .${r.lastButton}`]:o.lastButton},{[`& .${r.middleButton}`]:o.middleButton},o.root,o[e.variant],e.disableElevation===!0&&o.disableElevation,e.fullWidth&&o.fullWidth,e.orientation==="vertical"&&o.vertical]},oo=t=>{const{classes:o,color:e,disabled:u,disableElevation:B,fullWidth:h,orientation:a,variant:l}=t,d={root:["root",l,a==="vertical"&&"vertical",h&&"fullWidth",B&&"disableElevation"],grouped:["grouped",`grouped${n(a)}`,`grouped${n(l)}`,`grouped${n(l)}${n(a)}`,`grouped${n(l)}${n(e)}`,u&&"disabled"],firstButton:["firstButton"],lastButton:["lastButton"],middleButton:["middleButton"]};return N(d,Z,o)},to=q("div",{name:"MuiButtonGroup",slot:"Root",overridesResolver:w})(({theme:t,ownerState:o})=>m({display:"inline-flex",borderRadius:(t.vars||t).shape.borderRadius},o.variant==="contained"&&{boxShadow:(t.vars||t).shadows[2]},o.disableElevation&&{boxShadow:"none"},o.fullWidth&&{width:"100%"},o.orientation==="vertical"&&{flexDirection:"column"},{[`& .${r.grouped}`]:m({minWidth:40,"&:hover":m({},o.variant==="contained"&&{boxShadow:"none"})},o.variant==="contained"&&{boxShadow:"none"}),[`& .${r.firstButton},& .${r.middleButton}`]:m({},o.orientation==="horizontal"&&{borderTopRightRadius:0,borderBottomRightRadius:0},o.orientation==="vertical"&&{borderBottomRightRadius:0,borderBottomLeftRadius:0},o.variant==="text"&&o.orientation==="horizontal"&&{borderRight:t.vars?`1px solid rgba(${t.vars.palette.common.onBackgroundChannel} / 0.23)`:`1px solid ${t.palette.mode==="light"?"rgba(0, 0, 0, 0.23)":"rgba(255, 255, 255, 0.23)"}`,[`&.${r.disabled}`]:{borderRight:`1px solid ${(t.vars||t).palette.action.disabled}`}},o.variant==="text"&&o.orientation==="vertical"&&{borderBottom:t.vars?`1px solid rgba(${t.vars.palette.common.onBackgroundChannel} / 0.23)`:`1px solid ${t.palette.mode==="light"?"rgba(0, 0, 0, 0.23)":"rgba(255, 255, 255, 0.23)"}`,[`&.${r.disabled}`]:{borderBottom:`1px solid ${(t.vars||t).palette.action.disabled}`}},o.variant==="text"&&o.color!=="inherit"&&{borderColor:t.vars?`rgba(${t.vars.palette[o.color].mainChannel} / 0.5)`:_(t.palette[o.color].main,.5)},o.variant==="outlined"&&o.orientation==="horizontal"&&{borderRightColor:"transparent"},o.variant==="outlined"&&o.orientation==="vertical"&&{borderBottomColor:"transparent"},o.variant==="contained"&&o.orientation==="horizontal"&&{borderRight:`1px solid ${(t.vars||t).palette.grey[400]}`,[`&.${r.disabled}`]:{borderRight:`1px solid ${(t.vars||t).palette.action.disabled}`}},o.variant==="contained"&&o.orientation==="vertical"&&{borderBottom:`1px solid ${(t.vars||t).palette.grey[400]}`,[`&.${r.disabled}`]:{borderBottom:`1px solid ${(t.vars||t).palette.action.disabled}`}},o.variant==="contained"&&o.color!=="inherit"&&{borderColor:(t.vars||t).palette[o.color].dark},{"&:hover":m({},o.variant==="outlined"&&o.orientation==="horizontal"&&{borderRightColor:"currentColor"},o.variant==="outlined"&&o.orientation==="vertical"&&{borderBottomColor:"currentColor"})}),[`& .${r.lastButton},& .${r.middleButton}`]:m({},o.orientation==="horizontal"&&{borderTopLeftRadius:0,borderBottomLeftRadius:0},o.orientation==="vertical"&&{borderTopRightRadius:0,borderTopLeftRadius:0},o.variant==="outlined"&&o.orientation==="horizontal"&&{marginLeft:-1},o.variant==="outlined"&&o.orientation==="vertical"&&{marginTop:-1})})),eo=v.forwardRef(function(o,e){const u=D({props:o,name:"MuiButtonGroup"}),{children:B,className:h,color:a="primary",component:l="div",disabled:d=!1,disableElevation:b=!1,disableFocusRipple:c=!1,disableRipple:f=!1,fullWidth:C=!1,orientation:z="horizontal",size:x="medium",variant:$="outlined"}=u,p=W(u,S),g=m({},u,{color:a,component:l,disabled:d,disableElevation:b,disableFocusRipple:c,disableRipple:f,fullWidth:C,orientation:z,size:x,variant:$}),s=oo(g),y=v.useMemo(()=>({className:s.grouped,color:a,disabled:d,disableElevation:b,disableFocusRipple:c,disableRipple:f,fullWidth:C,size:x,variant:$}),[a,d,b,c,f,C,x,$,s.grouped]),j=Y(B),T=j.length,k=I=>{const R=I===0,E=I===T-1;return R&&E?"":R?s.firstButton:E?s.lastButton:s.middleButton};return i.jsx(to,m({as:l,role:"group",className:O(s.root,h),ref:e,ownerState:g},p,{children:i.jsx(A.Provider,{value:y,children:j.map((I,R)=>i.jsx(H.Provider,{value:k(R),children:I},R))})}))});function L(t){const{options:o,selectedIndex:e,setSelectedIndex:u,variant:B="contained",buttonGroupAriaLabel:h,onButtonClick:a,...l}=t,[d,b]=v.useState(!1),c=v.useRef(null),[f,C]=v.useState(e??0),z=(p,g)=>{u?u(g):C(g),b(!1)},x=()=>{b(p=>!p)},$=p=>{c.current&&c.current.contains(p.target)||b(!1)};return i.jsxs(i.Fragment,{children:[i.jsxs(eo,{variant:B,ref:c,"aria-label":"split button",...l,children:[i.jsx(G,{onClick:()=>{a?a(e??f):x()},children:o[e??f]}),i.jsx(G,{size:"small","aria-controls":d?"split-button-menu":void 0,"aria-expanded":d?"true":void 0,"aria-label":h,"aria-haspopup":"menu",onClick:x,sx:{width:"36px"},children:i.jsx(M,{icon:"expandMore",wrap:!1})})]}),i.jsx(F,{sx:{zIndex:10},open:d,placement:"bottom-start",anchorEl:c.current,role:void 0,transition:!0,disablePortal:!0,children:({TransitionProps:p,placement:g})=>i.jsx(U,{...p,style:{transformOrigin:g==="bottom"?"center top":"center bottom"},children:i.jsx(J,{children:i.jsx(X,{onClickAway:$,children:i.jsx(K,{id:"split-button-menu",autoFocusItem:!0,children:o.map((s,y)=>i.jsx(Q,{selected:y===e,onClick:j=>z(j,y),children:s},s))})})})})})]})}try{L.displayName="DropdownSelect",L.__docgenInfo={description:"Renders a button group that acts as a select group",displayName:"DropdownSelect",props:{ref:{defaultValue:null,description:"",name:"ref",required:!1,type:{name:"((instance: HTMLDivElement | null) => void) | RefObject<HTMLDivElement> | null"}},component:{defaultValue:null,description:"",name:"component",required:!1,type:{name:"ElementType<any, keyof IntrinsicElements>"}},options:{defaultValue:null,description:"",name:"options",required:!0,type:{name:"string[]"}},selectedIndex:{defaultValue:null,description:"",name:"selectedIndex",required:!1,type:{name:"number"}},setSelectedIndex:{defaultValue:null,description:"",name:"setSelectedIndex",required:!1,type:{name:"((selectedIndex: number) => void)"}},onButtonClick:{defaultValue:null,description:"",name:"onButtonClick",required:!1,type:{name:"((selectedIndex: number) => void)"}},buttonGroupAriaLabel:{defaultValue:null,description:"",name:"buttonGroupAriaLabel",required:!1,type:{name:"string"}}}}}catch{}export{eo as B,L as D};
