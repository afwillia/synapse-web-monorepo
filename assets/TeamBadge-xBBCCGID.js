import{j as i}from"./jsx-runtime-DoxjgJx5.js";import{P as m}from"./useFiles-DMbskdo6.js";import{I as d}from"./IconSvg-ESskBwc4.js";import{a as p,P as u}from"./SynapseConstants-BOdbxuBd.js";import{B as I}from"./Box-Bt_N9PQN.js";import{L as c}from"./Link-DPsc3TBb.js";const f="All registered Synapse users",T="Anyone on the web";function o(a){const{teamId:n,openLinkInNewTab:s}=a;let{teamName:t,disableHref:e}=a,r="team";n==p&&(r="public",t=f,e=!0),n==u&&(r="public",t=T,e=!0);const l=e?"span":c;return i.jsxs(I,{component:"span",display:"inline-flex",alignItems:"center",children:[i.jsx(d,{icon:r,fontSize:"small"}),i.jsx(l,{style:{marginLeft:"5px"},href:e?void 0:`${m.PORTAL}Team:${n}`,target:s?"_blank":"",children:t})]})}try{o.displayName="TeamBadge",o.__docgenInfo={description:"",displayName:"TeamBadge",props:{teamId:{defaultValue:null,description:"",name:"teamId",required:!0,type:{name:"string | number"}},teamName:{defaultValue:null,description:"",name:"teamName",required:!0,type:{name:"string"}},disableHref:{defaultValue:null,description:"",name:"disableHref",required:!1,type:{name:"boolean"}},openLinkInNewTab:{defaultValue:null,description:"",name:"openLinkInNewTab",required:!1,type:{name:"boolean"}}}}}catch{}export{o as T};