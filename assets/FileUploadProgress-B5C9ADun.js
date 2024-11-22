import{j as e}from"./jsx-runtime-DoxjgJx5.js";import{d as w}from"./Close-CSFzIByn.js";import{E as S,c as h}from"./calculateFriendlyFileSize-BVprIR7U.js";import{B as o}from"./Box-D4TeY3X6.js";import{T as d}from"./Typography-CaL9sKMg.js";import{T as s}from"./Tooltip-CQm22TSO.js";import{I as n}from"./IconButton-DDEa3AGu.js";import{c as x}from"./createSvgIcon-BhV3a4Zr.js";import{D as T}from"./DeleteTwoTone-Dev5FGll.js";import{C as _}from"./CheckCircleTwoTone-JZD1d26p.js";import{L as R}from"./LinearProgress-3w3Lw59m.js";const z=x(e.jsx("path",{d:"M6 19h4V5H6zm8-14v14h4V5z"}),"Pause"),A=x(e.jsx("path",{d:"M8 5v14l11-7z"}),"PlayArrow"),D=92;function f(u){const{status:a,fileName:y,onCancel:j,onPause:v,onResume:P,onRemove:g,uploadedSizeInBytes:p=0,totalSizeInBytes:c,errorMessage:I}=u,E=a==="PAUSED",r=a==="CANCELED_BY_USER"||a==="FAILED",m=a==="COMPLETE",l=a==="FAILED",C=a==="UPLOADING",t=a==="PREPARING";let i=p/c*100;return t?i=void 0:(l||r)&&(i=0),e.jsxs(o,{py:2,height:`${D}px`,children:[e.jsxs(o,{display:"flex",flexWrap:"nowrap",flexDirection:"row",justifyContent:"space-between",alignItems:"center",height:"35px",children:[e.jsx(d,{variant:"body1",color:"primary.main",fontWeight:700,children:y}),!m&&e.jsxs(o,{display:"flex",alignItems:"center",gap:1,my:1,children:[l&&e.jsx(s,{title:I,children:e.jsx(S,{color:"error"})}),!r&&e.jsx(s,{title:"Cancel",children:e.jsx(n,{size:"small",onClick:()=>{j()},children:e.jsx(w,{})})}),C&&e.jsx(s,{title:"Pause",children:e.jsx(n,{size:"small",onClick:()=>{v()},children:e.jsx(z,{})})}),E&&e.jsx(s,{title:"Resume",children:e.jsx(n,{size:"small",onClick:()=>{P()},children:e.jsx(A,{})})}),r&&e.jsx(s,{title:"Remove",children:e.jsx(n,{size:"small",onClick:()=>{g()},children:e.jsx(T,{})})})]}),m&&e.jsx(_,{color:"success"})]}),e.jsxs(o,{display:"flex",flexWrap:"nowrap",alignItems:"center",children:[e.jsx(R,{color:"secondary",value:i,variant:t?"indeterminate":"determinate",sx:{width:"100%",mr:2.5}}),!r&&e.jsx(d,{variant:"body1",whiteSpace:"nowrap",flexShrink:0,children:t?"Preparing to upload...":e.jsxs(e.Fragment,{children:[e.jsx("span",{children:h(p,1)}),e.jsx(o,{component:"span",color:"grey.600",mx:.5,children:"|"}),e.jsx("span",{children:h(c,1)})]})}),r&&e.jsx(d,{variant:"body1",whiteSpace:"nowrap",flexShrink:0,children:l?"Failed":"Canceled"})]})]})}try{f.displayName="FileUploadProgress",f.__docgenInfo={description:"Component that displays the upload progress of a file, with controls to pause or cancel the upload.",displayName:"FileUploadProgress",props:{status:{defaultValue:null,description:"The status of the upload.",name:"status",required:!0,type:{name:"enum",value:[{value:'"PREPARING"'},{value:'"UPLOADING"'},{value:'"PAUSED"'},{value:'"CANCELED_BY_USER"'},{value:'"FAILED"'},{value:'"COMPLETE"'}]}},fileName:{defaultValue:null,description:"The name of the file",name:"fileName",required:!0,type:{name:"string"}},totalSizeInBytes:{defaultValue:null,description:"The size of the file, in bytes",name:"totalSizeInBytes",required:!0,type:{name:"number"}},uploadedSizeInBytes:{defaultValue:null,description:"The number of this file's bytes uploaded so far.",name:"uploadedSizeInBytes",required:!1,type:{name:"number"}},onCancel:{defaultValue:null,description:"Invoked when the upload is cancelled.",name:"onCancel",required:!0,type:{name:"() => void"}},onPause:{defaultValue:null,description:"Invoked when the upload is paused.",name:"onPause",required:!0,type:{name:"() => void"}},onResume:{defaultValue:null,description:"Invoked when the resumed.",name:"onResume",required:!0,type:{name:"() => void"}},onRemove:{defaultValue:null,description:"Invoked when the upload is removed from the list.",name:"onRemove",required:!0,type:{name:"() => void"}},errorMessage:{defaultValue:null,description:"An optional error message to display if the upload has been cancelled due to error.",name:"errorMessage",required:!1,type:{name:"string"}}}}}catch{}export{f as F,D as a};
