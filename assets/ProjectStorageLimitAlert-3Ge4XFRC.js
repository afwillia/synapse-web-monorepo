import{j as t}from"./jsx-runtime-DoxjgJx5.js";import{c as u}from"./calculateFriendlyFileSize-BVprIR7U.js";import{c as r}from"./SynapseConstants-D-PFMQZz.js";import{F as i}from"./FullWidthAlert-DhexvuWd.js";const l=.25;function n(a){const{usage:e,didUploadsExceedLimit:o}=a;if(e.maxAllowedFileBytes==null)return null;const s=e.maxAllowedFileBytes*(1-l),d=e.maxAllowedFileBytes-e.sumFileBytes;return!o&&e.sumFileBytes<s?null:e.isOverLimit?t.jsx(i,{variant:"danger",isGlobal:!1,title:"You have no data availability",description:"You do not have any remaining data within this project. In order to upload more files, you must edit your file list or upgrade your plan.",primaryButtonConfig:{text:"Learn more",href:r}}):o?t.jsx(i,{variant:"danger",isGlobal:!1,title:"Selected files exceed available storage",description:`This project has only ${u(d,1)} of storage remaining. To continue, you must upgrade your storage, or add custom storage.`,primaryButtonConfig:{text:"Learn more",href:r}}):t.jsx(i,{variant:"warning",isGlobal:!1,title:"Warning: Your storage availability is limited",description:`Your project has less than ${l*100}% remaining of available storage left. Upgrade your storage, or bring your own custom storage.`,primaryButtonConfig:{text:"Learn more",href:r}})}try{n.displayName="ProjectStorageLimitAlert",n.__docgenInfo={description:"",displayName:"ProjectStorageLimitAlert",props:{didUploadsExceedLimit:{defaultValue:null,description:"",name:"didUploadsExceedLimit",required:!0,type:{name:"boolean"}},usage:{defaultValue:null,description:"",name:"usage",required:!0,type:{name:"ProjectStorageLocationUsage"}}}}}catch{}export{n as P};
