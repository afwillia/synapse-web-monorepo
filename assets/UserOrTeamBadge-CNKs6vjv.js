import{j as a}from"./jsx-runtime-Du8NFWEI.js";import"./useFiles-BCjzBg19.js";import"./VerificationSubmission-BmZsZ0JS.js";import"./StringUtils-DFpF2_59.js";import"./OrientationBanner-D-CGIdAn.js";import"./index-Dl6G-zuu.js";import{u as p,U as m}from"./UserBadge-WTkox1C4.js";import{T as f}from"./TeamBadge-Bup7Pj9e.js";import{S as c}from"./Skeleton-CW6YXi1_.js";function t(n){let e=n.principalId;const{disableHref:l,showCardOnHover:d,showFullName:s,userGroupHeader:r,openLinkInNewTab:i}=n;e==null&&(e=r==null?void 0:r.ownerId);const{data:u}=p((e??"").toString(),{enabled:!r}),o=r??u;return e==null&&r==null?(console.error("Expected one of principalId or userGroupHeader to be defined but both were null or undefined"),a.jsx(a.Fragment,{})):o===void 0?a.jsx(c,{width:125,height:30}):o.isIndividual?a.jsx(m,{userId:e.toString(),disableLink:l,showFullName:s,showCardOnHover:d,openLinkInNewTab:i}):a.jsx(f,{teamId:e,teamName:o.userName,disableHref:l,openLinkInNewTab:i})}try{t.displayName="UserOrTeamBadge",t.__docgenInfo={description:"",displayName:"UserOrTeamBadge",props:{principalId:{defaultValue:null,description:"",name:"principalId",required:!1,type:{name:"string | number"}},userGroupHeader:{defaultValue:null,description:"",name:"userGroupHeader",required:!1,type:{name:"UserGroupHeader"}},showFullName:{defaultValue:null,description:"",name:"showFullName",required:!1,type:{name:"boolean"}},disableHref:{defaultValue:null,description:"",name:"disableHref",required:!1,type:{name:"boolean"}},showCardOnHover:{defaultValue:null,description:"",name:"showCardOnHover",required:!1,type:{name:"boolean"}},openLinkInNewTab:{defaultValue:null,description:"",name:"openLinkInNewTab",required:!1,type:{name:"boolean"}}}}}catch{}export{t as U};
