import{s}from"./styled-BNZh1-oq.js";import{B as x}from"./Button-CnDFdqMc.js";import{j as e}from"./jsx-runtime-DoxjgJx5.js";import{I as f}from"./Icon-CHleRtUp.js";import{P as g}from"./Paper-CK0RlmZk.js";import{B as r}from"./Box-D4TeY3X6.js";import{T as a}from"./Typography-CaL9sKMg.js";import{S as n}from"./Skeleton-D27KV3ni.js";const o=s(x,{label:"WideButton"})(({theme:t})=>({minWidth:"168px",padding:"10px",fontSize:"16px"}));try{o.displayName="WideButton",o.__docgenInfo={description:"",displayName:"WideButton",props:{ref:{defaultValue:null,description:"",name:"ref",required:!1,type:{name:"((instance: HTMLButtonElement | null) => void) | RefObject<HTMLButtonElement> | null"}},component:{defaultValue:null,description:"",name:"component",required:!1,type:{name:"ElementType<any, keyof IntrinsicElements>"}}}}}catch{}const l=s(g,{label:"ActionRequiredCardContainer"})(({theme:t})=>({padding:`${t.spacing(2.5)} ${t.spacing(4)}`,display:"grid",alignItems:"center",gridTemplateColumns:"160px auto 200px",gap:t.spacing(4)}));function d(t){if(t.isLoading)return e.jsx(y,{});const{title:c,description:u,iconType:p,count:i,actionNode:m}=t;return e.jsxs(l,{children:[e.jsx(r,{sx:{textAlign:"center",minWidth:"100px"},children:e.jsx(f,{type:p})}),e.jsxs(r,{sx:{flexGrow:1},children:[e.jsx(a,{variant:"headline3",sx:{mb:1},children:c}),i&&e.jsxs(a,{variant:"smallText1",sx:{my:1,color:"grey.700"},children:[i," File",i!=1?"s":""]}),e.jsx(a,{variant:"smallText1",children:u})]}),e.jsx(r,{sx:{textAlign:"center",marginLeft:"auto"},children:m})]})}function y(){return e.jsxs(l,{children:[e.jsx(n,{variant:"rectangular",width:136,height:74}),e.jsxs("div",{children:[e.jsx(n,{width:320}),e.jsx(n,{width:100})]}),e.jsx(n,{variant:"rectangular",width:160,height:33})]})}try{d.displayName="ActionRequiredCard",d.__docgenInfo={description:`The ActionRequiredCard component renders a generic card that represents some action that a user must take to gain
download access to a file.`,displayName:"ActionRequiredCard",props:{title:{defaultValue:null,description:"",name:"title",required:!0,type:{name:"ReactNode"}},description:{defaultValue:null,description:"",name:"description",required:!0,type:{name:"ReactNode"}},actionNode:{defaultValue:null,description:"",name:"actionNode",required:!0,type:{name:"ReactNode"}},iconType:{defaultValue:null,description:"",name:"iconType",required:!0,type:{name:"string"}},count:{defaultValue:null,description:"",name:"count",required:!1,type:{name:"number"}},isLoading:{defaultValue:null,description:"",name:"isLoading",required:!1,type:{name:"boolean"}}}}}catch{}export{d as A,y as L,o as W};
