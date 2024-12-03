import{j as e}from"./jsx-runtime-DoxjgJx5.js";import{r}from"./index-Cu9bd8lq.js";import"./useFiles-DMbskdo6.js";import"./VerificationSubmission-DL9jxYsQ.js";import"./RegularExpressions-SKYrON-T.js";import"./OrientationBanner-6BqxDXOp.js";import{c as g}from"./useWiki-4JISI98i.js";import{b as w,C as y}from"./ConfirmationDialog-DV4m9oIq.js";import{S as N}from"./LoadingScreen-Bc9rto4U.js";import{M as R}from"./MarkdownEditor-CS7BWPdY.js";import{T as h}from"./TextField-BM400Yg9.js";import{A as k}from"./Alert-B6PGsAkP.js";import{B as p}from"./Box-Bt_N9PQN.js";import{B as m}from"./Button-j3jTttn9.js";import{n as S}from"./noop-DX6rZLP_.js";const x="Unsaved Changes",M="Any unsaved changes may be lost. Are you sure that you would like to navigate away from this editor?",j="Could not save your changes. It is recommended that you copy your version of the wiki text so that it is not lost. ",I=l=>{const{open:E,ownerObjectId:v,ownerObjectType:A,wikiPage:a,onCancel:s=S,onSave:T=S}=l,[u,C]=r.useState(a.title),[o,f]=r.useState(a.markdown),[_,n]=r.useState(!1),d=()=>{a&&a.markdown!==o?n(!0):s()},{mutate:O,isPending:t,error:c}=g({onSuccess:()=>T()});return e.jsx(w,{open:E,onCancel:d,maxWidth:"xl",fullWidth:!0,title:"Edit Wiki Markdown",content:e.jsxs(e.Fragment,{children:[t&&e.jsx(N,{}),a&&e.jsxs(e.Fragment,{children:[a.parentWikiId&&e.jsx(h,{label:"Title",placeholder:"Title",fullWidth:!0,sx:{mb:2},value:u,onChange:i=>C(i.target.value)}),e.jsx(R,{text:o,setText:f}),e.jsx(y,{open:_,title:x,content:M,onCancel:()=>n(!1),onConfirm:()=>{n(!1),s()}})]}),c&&e.jsx(k,{severity:"error",children:j+c.reason})]}),actions:e.jsxs(p,{display:"flex",flexDirection:"row-reverse",justifyContent:"space-between",width:"100%",children:[e.jsxs(p,{display:"flex",gap:1,children:[e.jsx(m,{variant:"outlined",disabled:t,onClick:d,children:"Cancel"}),e.jsx(m,{variant:"contained",color:"primary",disabled:t,onClick:()=>{if(a){const i={ownerObjectId:v,ownerObjectType:A,wikiPage:{...a,title:u,markdown:o}};O(i)}},children:t?"Saving...":"Save"})]}),!1]})})};try{I.displayName="WikiMarkdownEditor",I.__docgenInfo={description:"",displayName:"WikiMarkdownEditor",props:{open:{defaultValue:null,description:"",name:"open",required:!0,type:{name:"boolean"}},ownerObjectType:{defaultValue:null,description:"",name:"ownerObjectType",required:!0,type:{name:"enum",value:[{value:'"ENTITY"'},{value:'"ENTITY_CONTAINER"'},{value:'"PRINCIPAL"'},{value:'"ACTIVITY"'},{value:'"EVALUATION"'},{value:'"SUBMISSION"'},{value:'"EVALUATION_SUBMISSIONS"'},{value:'"FILE"'},{value:'"MESSAGE"'},{value:'"WIKI"'},{value:'"FAVORITE"'},{value:'"ACCESS_REQUIREMENT"'},{value:'"ACCESS_APPROVAL"'},{value:'"TEAM"'},{value:'"TABLE"'},{value:'"ACCESS_CONTROL_LIST"'},{value:'"PROJECT_SETTING"'},{value:'"VERIFICATION_SUBMISSION"'},{value:'"CERTIFIED_USER_PASSING_RECORD"'},{value:'"FORUM"'},{value:'"THREAD"'},{value:'"REPLY"'},{value:'"FORM_GROUP"'},{value:'"FORM_DATA"'},{value:'"ENTITY_VIEW"'},{value:'"USER_PROFILE"'},{value:'"DATA_ACCESS_REQUEST"'},{value:'"DATA_ACCESS_SUBMISSION"'},{value:'"DATA_ACCESS_SUBMISSION_STATUS"'},{value:'"MEMBERSHIP_INVITATION"'}]}},ownerObjectId:{defaultValue:null,description:"",name:"ownerObjectId",required:!0,type:{name:"string"}},wikiPage:{defaultValue:null,description:"",name:"wikiPage",required:!0,type:{name:"WikiPage"}},onCancel:{defaultValue:null,description:"",name:"onCancel",required:!1,type:{name:"(() => void)"}},onSave:{defaultValue:null,description:"",name:"onSave",required:!1,type:{name:"(() => void)"}}}}}catch{}export{I as W};