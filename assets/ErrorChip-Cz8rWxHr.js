import{j as r}from"./jsx-runtime-DoxjgJx5.js";import{l as u,aR as d,aS as h,aT as x}from"./useFiles-cx7pZlDv.js";import{T as f}from"./Tooltip-CQm22TSO.js";import{C as E}from"./Chip-BeyCtz-t.js";import{A as _}from"./Avatar-DjHGVXZf.js";import{c as g}from"./createSvgIcon-BhV3a4Zr.js";import{E as y}from"./ErrorOutlined-T6sjfcxT.js";const C=g(r.jsx("path",{d:"M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2M9 6c0-1.66 1.34-3 3-3s3 1.34 3 3v2H9zm9 14H6V10h12zm-6-3c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2"}),"LockOutlined");function p(i){const{chipText:m,error:e}=i,{accessToken:n}=u(),o=(e.status===403||e.status===401)&&!n,s=e.status===403&&n;d({show:e.status>=500,issueCollector:"SWC",issueSummary:"",issueDescription:e.reason,issuePriority:"3"});const a=o?"warning":"error";let c,l;o||s?c=r.jsx(_,{sx:{bgcolor:`${a}.main`},children:r.jsx(C,{sx:{color:"white",width:"18px"}})}):l=o||s?void 0:r.jsx(y,{});let t;return o?t=r.jsx(h,{}):s?t=x:t=e.reason,r.jsx(f,{title:t,children:r.jsx(E,{avatar:c,color:a,variant:"outlined",icon:l,label:m})})}try{p.displayName="ErrorChip",p.__docgenInfo={description:"A chip component for handling inline errors, where some information can be shown (e.g. an ID) without breaking an entire component.",displayName:"ErrorChip",props:{chipText:{defaultValue:null,description:"",name:"chipText",required:!0,type:{name:"string"}},error:{defaultValue:null,description:"",name:"error",required:!0,type:{name:"SynapseClientError"}}}}}catch{}export{p as E};
