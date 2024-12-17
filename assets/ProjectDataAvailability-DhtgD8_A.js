import{j as e}from"./jsx-runtime-DoxjgJx5.js";import{l as g,S as j,H as F}from"./useFiles-DFdLn1TY.js";import{c as P}from"./SynapseConstants-binLeAzi.js";import"./index-Cu9bd8lq.js";import"./VerificationSubmission-DL9jxYsQ.js";import"./RegularExpressions-SKYrON-T.js";import{u as w}from"./useQuery-BEUP4ZKU.js";import"./OrientationBanner-6TFYkqd5.js";import{g as _}from"./ConfirmationDialog-Gg6sPqgv.js";import{c as u}from"./calculateFriendlyFileSize-DBeyIXBK.js";import{B as a}from"./Box-Bt_N9PQN.js";import{T as p}from"./Typography-D6GCV-CB.js";import{T as b}from"./Tooltip-CTVx2uGI.js";function v(t,i){const{accessToken:r,keyFactory:s}=g();return w({...i,queryKey:s.getProjectStorageUsageKey(t),queryFn:()=>j.getProjectStorageUsage(t,r)})}const d=142;function f({projectId:t,sx:i}){const{accessToken:r}=g(),s=!!r,{data:n}=v(t,{enabled:!!t&&s}),o=n==null?void 0:n.locations.filter(S=>S.storageLocationId==F),l=(o==null?void 0:o.length)==1?o[0]:void 0;if(!l)return e.jsx(e.Fragment,{});const{sumFileBytes:x=0,maxAllowedFileBytes:c=0}=l;if(c==0)return e.jsx(e.Fragment,{});const y=Math.min(Math.round(x/c*d),d),h=u(x,1),m=u(c,1).replace(/\.0\s/," ");return e.jsxs(a,{display:"flex",flexDirection:"column",width:"210px",fontFamily:"DM Sans",color:"white",px:"10px",sx:i,children:[e.jsxs(a,{display:"flex",flexDirection:"row",gap:"5px",children:[e.jsxs(p,{sx:{fontWeight:700,fontSize:"16px"},children:["Data Availability"," "]})," ",e.jsx(_,{containerSx:{fontSize:"12px"},markdownText:`Hosting Plan Options:
- Basic Plan: Free, for sharing small datasets (<100GB) with self-service setup. No direct support.
- Self-Managed Plan: Ideal for data longevity, FAIR principles, and NIH compliance. Includes consultation services and data access management tools.
- Data Coordination Plan: For large, multi-institutional projects, with personalized consulting, data curation, and a custom data portal.`,helpUrl:P})]}),l.maxAllowedFileBytes&&e.jsx(b,{title:`Using ${h} out of ${m}`,children:e.jsxs(a,{display:"flex",flexDirection:"row",gap:"5px",alignItems:"center",children:[e.jsx(p,{variant:"body1",fontSize:"12px",children:"0"}),e.jsx(a,{width:`${d}px`,height:"4px",sx:{backgroundColor:"white",borderRadius:"50px"},children:e.jsx(a,{width:`${y}px`,height:"4px",sx:{backgroundColor:"#EDC766",borderRadius:"50px"}})}),e.jsx(p,{variant:"body1",fontSize:"12px",sx:{whiteSpace:"nowrap"},children:m})]})})]})}try{f.displayName="ProjectDataAvailability",f.__docgenInfo={description:"",displayName:"ProjectDataAvailability",props:{projectId:{defaultValue:null,description:"",name:"projectId",required:!1,type:{name:"string"}},sx:{defaultValue:null,description:"",name:"sx",required:!1,type:{name:"SxProps"}}}}}catch{}export{f as P};
