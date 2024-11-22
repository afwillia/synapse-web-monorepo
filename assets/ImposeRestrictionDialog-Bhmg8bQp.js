import{j as e}from"./jsx-runtime-DoxjgJx5.js";import{a as y}from"./index-Cu9bd8lq.js";import{F as C}from"./FullWidthAlert-DhexvuWd.js";import"./useFiles-cx7pZlDv.js";import"./VerificationSubmission-DL9jxYsQ.js";import"./RegularExpressions-CmcMRs19.js";import"./OrientationBanner-BX0HvA84.js";import{u as b}from"./useAccessRequirements-De8aEJGW.js";import{d as i}from"./ToastMessage-DjaqMC_A.js";import{C as x}from"./ConfirmationDialog-DZjTrOyQ.js";import{F as j}from"./FormControl-EVF2GEo2.js";import{F as I}from"./InputLabel-CtY5MIT3.js";import{R}from"./RadioGroup-BRNoHnJ5.js";import{F as a}from"./FormControlLabel-BehRBTI5.js";import{R as l}from"./Radio-eyhGV30W.js";import{T as v}from"./Typography-CaL9sKMg.js";function d(n){const c=e.jsxs(v,{variant:"smallText1",children:["Sage Bionetworks does not typically impose conditions for use on non-human data unless there is a legal, ethical or regulatory reason to do so. If you want to add conditions for use to this content, please contact the Synapse Access and Compliance Team (ACT) to discuss at"," ",e.jsx("a",{href:"mailto:act@sagebase.org",children:"act@sagebase.org"}),"."]}),{entityId:m,open:p,onClose:t}=n,[o,u]=y.useState(null),{mutate:f,isPending:r}=b({onSuccess:()=>{i("Successfully imposed restriction","success"),window.open("https://sagebionetworks.jira.com/servicedesk/customer/portal/8/group/15/create/134","_blank"),t()},onError:s=>{i(`Failed to impose restriction: ${s.reason}`,"danger")}});function g(){o?f(m):t()}function h(s){u(s.target.value==="true")}return e.jsx(x,{title:"Conditions for Use",onConfirm:()=>g(),titleHelpPopoverProps:{markdownText:"Conditions for use describes data use requirements that must be fulfilled before downloading.",helpUrl:"https://help.synapse.org/docs/Sharing-Settings,-Permissions,-and-Conditions-for-Use.2024276030.html#SharingSettings,Permissions,andConditionsforUse-ConditionsforUse"},confirmButtonProps:{disabled:o==null||r},cancelButtonProps:{disabled:r},onCancel:()=>t(),open:p,content:e.jsxs(j,{sx:{width:"100%"},children:[e.jsx(I,{id:"demo-radio-buttons-group-label",children:"Is this sensitive human data that must be protected?"}),e.jsxs(R,{value:o,onChange:h,children:[e.jsx(a,{control:e.jsx(l,{}),label:"Yes",value:!0}),e.jsx(a,{control:e.jsx(l,{}),label:"No",value:!1})]}),o===!1&&e.jsx(C,{variant:"warning",isGlobal:!1,description:c})]})})}try{d.displayName="ImposeRestrictionDialog",d.__docgenInfo={description:"",displayName:"ImposeRestrictionDialog",props:{entityId:{defaultValue:null,description:"",name:"entityId",required:!0,type:{name:"string"}},open:{defaultValue:null,description:"",name:"open",required:!0,type:{name:"boolean"}},onClose:{defaultValue:null,description:"",name:"onClose",required:!0,type:{name:"() => void"}}}}}catch{}export{d as I};
