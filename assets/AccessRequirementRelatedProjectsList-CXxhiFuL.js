import{j as e}from"./jsx-runtime-DoxjgJx5.js";import"./useFiles-DMbskdo6.js";import"./VerificationSubmission-DL9jxYsQ.js";import"./RegularExpressions-SKYrON-T.js";import"./OrientationBanner-6BqxDXOp.js";import"./index-Cu9bd8lq.js";import{e as p}from"./useAccessRequirements-BCVys6Hm.js";import{E as d}from"./EntityLink-CvQscVaR.js";import{p as u}from"./pluralize-D3rOHoU0.js";import{T as y}from"./Typography-D6GCV-CB.js";import{L as j}from"./List-BhKoI0Qm.js";import{L as f}from"./ListItem-CA4Es91E.js";import{A as x}from"./Alert-B6PGsAkP.js";const a=i=>{const c={ids:[i.accessRequirementId]},{data:t,isError:n,error:m}=p(c),r=(t==null?void 0:t.pages.flatMap(s=>s.results)[0])??void 0,o=(r==null?void 0:r.relatedProjectIds.length)||0,l=`${u("project",o,!0)}${o>0?":":""}`;return e.jsxs(e.Fragment,{children:[r&&e.jsxs(e.Fragment,{children:[e.jsx(y,{variant:"body1",children:l}),e.jsx(j,{sx:{listStyleType:"disc",pl:4},children:r.relatedProjectIds.map(s=>e.jsx(f,{sx:{display:"list-item",py:"4px",".no-margin-y":{my:0}},children:e.jsx(d,{entity:s,link:!1,showIcon:!1,className:"no-margin-y"})},s))})]}),n&&e.jsx(x,{severity:"error",children:m.message})]})};try{a.displayName="AccessRequirementRelatedProjectsList",a.__docgenInfo={description:"",displayName:"AccessRequirementRelatedProjectsList",props:{accessRequirementId:{defaultValue:null,description:"",name:"accessRequirementId",required:!0,type:{name:"number"}}}}}catch{}export{a as A};