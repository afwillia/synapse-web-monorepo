import{j as e}from"./jsx-runtime-DoxjgJx5.js";import{a as y}from"./index-Cu9bd8lq.js";import{F as C}from"./FullWidthAlert-7vG6655N.js";import"./useFiles-DMbskdo6.js";import"./VerificationSubmission-DL9jxYsQ.js";import"./RegularExpressions-SKYrON-T.js";import"./OrientationBanner-6BqxDXOp.js";import{u as b}from"./useAccessRequirements-BCVys6Hm.js";import{d as a}from"./ToastMessage-CPW-dqej.js";import{C as x}from"./ConfirmationDialog-DV4m9oIq.js";import{F as j,a as I}from"./InputLabel-RHZu0c3g.js";import{R}from"./RadioGroup-clYTL0Ek.js";import{F as i}from"./FormControlLabel-CARkfAdu.js";import{R as l}from"./Radio-lcFkrfOW.js";import{T as v}from"./Typography-D6GCV-CB.js";function d(n){const c=e.jsxs(v,{variant:"smallText1",children:["Sage Bionetworks does not typically impose conditions for use on non-human data unless there is a legal, ethical or regulatory reason to do so. If you want to add conditions for use to this content, please contact the Synapse Access and Compliance Team (ACT) to discuss at"," ",e.jsx("a",{href:"mailto:act@sagebase.org",children:"act@sagebase.org"}),"."]}),{entityId:m,open:p,onClose:t}=n,[o,u]=y.useState(null),{mutate:f,isPending:r}=b({onSuccess:()=>{a("Successfully imposed restriction","success"),window.open("https://sagebionetworks.jira.com/servicedesk/customer/portal/8/group/15/create/134","_blank"),t()},onError:s=>{a(`Failed to impose restriction: ${s.reason}`,"danger")}});function g(){o?f(m):t()}function h(s){u(s.target.value==="true")}return e.jsx(x,{title:"Conditions for Use",onConfirm:()=>g(),titleHelpPopoverProps:{markdownText:"Conditions for use describes data use requirements that must be fulfilled before downloading.",helpUrl:"https://help.synapse.org/docs/Sharing-Settings,-Permissions,-and-Conditions-for-Use.2024276030.html#SharingSettings,Permissions,andConditionsforUse-ConditionsforUse"},confirmButtonProps:{disabled:o==null||r},cancelButtonProps:{disabled:r},onCancel:()=>t(),open:p,content:e.jsxs(j,{sx:{width:"100%"},children:[e.jsx(I,{id:"demo-radio-buttons-group-label",children:"Is this sensitive human data that must be protected?"}),e.jsxs(R,{value:o,onChange:h,children:[e.jsx(i,{control:e.jsx(l,{}),label:"Yes",value:!0}),e.jsx(i,{control:e.jsx(l,{}),label:"No",value:!1})]}),o===!1&&e.jsx(C,{variant:"warning",isGlobal:!1,description:c})]})})}try{d.displayName="ImposeRestrictionDialog",d.__docgenInfo={description:"",displayName:"ImposeRestrictionDialog",props:{entityId:{defaultValue:null,description:"",name:"entityId",required:!0,type:{name:"string"}},open:{defaultValue:null,description:"",name:"open",required:!0,type:{name:"boolean"}},onClose:{defaultValue:null,description:"",name:"onClose",required:!0,type:{name:"() => void"}}}}}catch{}export{d as I};