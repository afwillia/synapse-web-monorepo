import{j as e}from"./jsx-runtime-Du8NFWEI.js";import"./useFiles-BCjzBg19.js";import"./VerificationSubmission-BmZsZ0JS.js";import"./StringUtils-DFpF2_59.js";import"./OrientationBanner-D-CGIdAn.js";import"./index-Dl6G-zuu.js";import{e as p}from"./useAccessRequirements-DQPQPtUF.js";import{E as d}from"./EntityLink-B7rSc2P2.js";import{p as u}from"./pluralize-CVwSCrA2.js";import{T as y}from"./Typography-DrqHmlDD.js";import{L as j}from"./List-nAK0nmZc.js";import{L as f}from"./ListItem-C0gWuoZ7.js";import{A as x}from"./Alert-CduaGk2B.js";const a=i=>{const c={ids:[i.accessRequirementId]},{data:t,isError:n,error:m}=p(c),r=(t==null?void 0:t.pages.flatMap(s=>s.results)[0])??void 0,o=(r==null?void 0:r.relatedProjectIds.length)||0,l=`${u("project",o,!0)}${o>0?":":""}`;return e.jsxs(e.Fragment,{children:[r&&e.jsxs(e.Fragment,{children:[e.jsx(y,{variant:"body1",children:l}),e.jsx(j,{sx:{listStyleType:"disc",pl:4},children:r.relatedProjectIds.map(s=>e.jsx(f,{sx:{display:"list-item",py:"4px",".no-margin-y":{my:0}},children:e.jsx(d,{entity:s,link:!1,showIcon:!1,className:"no-margin-y"})},s))})]}),n&&e.jsx(x,{severity:"error",children:m.message})]})};try{a.displayName="AccessRequirementRelatedProjectsList",a.__docgenInfo={description:"",displayName:"AccessRequirementRelatedProjectsList",props:{accessRequirementId:{defaultValue:null,description:"",name:"accessRequirementId",required:!0,type:{name:"number"}}}}}catch{}export{a as A};
