import{g as P,a as y,e as l,b as s,c as B,_ as g,d as M}from"./createTheme-CWLQ-DuD.js";import{r as m}from"./index-Cu9bd8lq.js";import{S}from"./FormControlLabel-BehRBTI5.js";import{c as h}from"./createSvgIcon-BhV3a4Zr.js";import{j as t}from"./jsx-runtime-DoxjgJx5.js";import{s as _,r as R,u as H,c as E}from"./styled-BNZh1-oq.js";const O=h(t.jsx("path",{d:"M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"}),"CheckBoxOutlineBlank"),U=h(t.jsx("path",{d:"M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"}),"CheckBox"),V=h(t.jsx("path",{d:"M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10H7v-2h10v2z"}),"IndeterminateCheckBox");function L(o){return y("MuiCheckbox",o)}const u=P("MuiCheckbox",["root","checked","disabled","indeterminate","colorPrimary","colorSecondary","sizeSmall","sizeMedium"]),N=["checkedIcon","color","icon","indeterminate","indeterminateIcon","inputProps","size","className"],F=o=>{const{classes:e,indeterminate:c,color:a,size:r}=o,n={root:["root",c&&"indeterminate",`color${l(a)}`,`size${l(r)}`]},d=E(n,L,e);return s({},e,d)},T=_(S,{shouldForwardProp:o=>R(o)||o==="classes",name:"MuiCheckbox",slot:"Root",overridesResolver:(o,e)=>{const{ownerState:c}=o;return[e.root,c.indeterminate&&e.indeterminate,e[`size${l(c.size)}`],c.color!=="default"&&e[`color${l(c.color)}`]]}})(({theme:o,ownerState:e})=>s({color:(o.vars||o).palette.text.secondary},!e.disableRipple&&{"&:hover":{backgroundColor:o.vars?`rgba(${e.color==="default"?o.vars.palette.action.activeChannel:o.vars.palette[e.color].mainChannel} / ${o.vars.palette.action.hoverOpacity})`:B(e.color==="default"?o.palette.action.active:o.palette[e.color].main,o.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:"transparent"}}},e.color!=="default"&&{[`&.${u.checked}, &.${u.indeterminate}`]:{color:(o.vars||o).palette[e.color].main},[`&.${u.disabled}`]:{color:(o.vars||o).palette.action.disabled}})),W=t.jsx(U,{}),q=t.jsx(O,{}),w=t.jsx(V,{}),X=m.forwardRef(function(e,c){var a,r;const n=H({props:e,name:"MuiCheckbox"}),{checkedIcon:d=W,color:b="primary",icon:z=q,indeterminate:i=!1,indeterminateIcon:x=w,inputProps:I,size:p="medium",className:$}=n,j=g(n,N),C=i?x:z,k=i?x:d,f=s({},n,{color:b,indeterminate:i,size:p}),v=F(f);return t.jsx(T,s({type:"checkbox",inputProps:s({"data-indeterminate":i},I),icon:m.cloneElement(C,{fontSize:(a=C.props.fontSize)!=null?a:p}),checkedIcon:m.cloneElement(k,{fontSize:(r=k.props.fontSize)!=null?r:p}),ownerState:f,ref:c,className:M(v.root,$)},j,{classes:v}))});export{X as C};
