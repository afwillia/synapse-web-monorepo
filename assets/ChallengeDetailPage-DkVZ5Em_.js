import{j as t}from"./jsx-runtime-Du8NFWEI.js";import{r as C}from"./index-Dl6G-zuu.js";import{C as N}from"./ChallengeRegisterButton-3rqtRJsk.js";import{C as F}from"./ChallengeTeamWizard-BN7NOdtx.js";import{l as w,q as E,N as V}from"./useFiles-BCjzBg19.js";import{R as z}from"./VerificationSubmission-BmZsZ0JS.js";import"./StringUtils-DFpF2_59.js";import"./OrientationBanner-D-CGIdAn.js";import{u as M}from"./useGetEntityChallenge-Cna9arQU.js";import{a as W,b as O,c as H}from"./useTeamMembers-DlCtyM3s.js";import{u as U}from"./useGetUserTeams-CtuOxeFE.js";import{A as J,C as Q}from"./ConfirmationDialog-CMzsAtxl.js";import{j as Y,k as K}from"./useAccessRequirements-DQPQPtUF.js";import{a as X}from"./useEntity-BL2r9mB7.js";import{S as Z}from"./LoadingScreen-BDJMIc_E.js";import{A as $}from"./Alert-CduaGk2B.js";import{T as ee}from"./Typography-DrqHmlDD.js";import{B as v}from"./Button-DtfaTZY_.js";import{d as _}from"./ToastMessage-2SG7nV1p.js";function q(n){const{open:y,projectId:l,onRegisterComplete:g,onCancel:c}=n,{data:m,error:d}=X(l),{accessToken:T}=w(),{data:e,error:f}=M(l),b=!!T,{data:u,error:I}=E({enabled:b}),r=e==null?void 0:e.participantTeamId,o=u==null?void 0:u.ownerId,{data:s,error:j}=W(r,o,{enabled:!!(r&&o)}),{mutateAsync:h,isPending:p,error:R}=O(),{data:i,isSuccess:k,error:B}=Y(e==null?void 0:e.participantTeamId,{enabled:!!(e!=null&&e.participantTeamId)}),L=K((i==null?void 0:i.map(a=>String(a.id)))??[]),D=k&&L.every(a=>a.status==="success"&&a.data.isApproved),G=C.useCallback(async()=>{r&&o&&!(s!=null&&s.isMember)&&await h({teamId:r,userId:o}),g()},[h,g,r,s==null?void 0:s.isMember,o]),x=[d,f,I,j,B,R].filter(a=>!!a);let S=s!=null&&s.isMember?"Continue":"Register";return p&&(S="Registering..."),V(x)?!r||!y?t.jsx(t.Fragment,{}):t.jsx(J,{dialogTitle:"Challenge Terms and Conditions",subjectId:r,subjectType:z.TEAM,teamId:e==null?void 0:e.participantTeamId,renderAsModal:!0,requestObjectName:m==null?void 0:m.name,onHide:()=>{c()},customDialogActions:t.jsxs(t.Fragment,{children:[t.jsx(v,{variant:"outlined",onClick:c,children:"Cancel"}),t.jsx(v,{variant:"contained",onClick:()=>{G()},startIcon:p?t.jsx(Z,{}):void 0,disabled:!D||p,children:S})]})}):t.jsx($,{severity:"error",children:x.map((a,P)=>t.jsx(ee,{variant:"body1",children:a.reason},P))})}try{q.displayName="ChallengeRequirementsModal",q.__docgenInfo={description:`The challenge requirements modal will
 1. Display the access requirements that must be accepted to join a participant team. The component will guide the user through meeting the requirements.
 2. If the user has accepted the requirements, the user can click 'Register' to join the team
    If the user has not accepted the requirements, the user cannot register for the challenge.`,displayName:"ChallengeRequirementsModal",props:{open:{defaultValue:null,description:"",name:"open",required:!0,type:{name:"boolean"}},projectId:{defaultValue:null,description:"",name:"projectId",required:!0,type:{name:"string"}},onCancel:{defaultValue:null,description:"",name:"onCancel",required:!0,type:{name:"() => void"}},onRegisterComplete:{defaultValue:null,description:"",name:"onRegisterComplete",required:!0,type:{name:"() => void"}}}}}catch{}function A({projectId:n}){const{accessToken:y}=w(),l=!!y,[g,c]=C.useState(!1),[m,d]=C.useState(!1),[T,e]=C.useState(!1),{data:f}=E(),b=i=>{c(i)},u=()=>{d(!0)},I=()=>{e(!0)},{data:r}=M(n),{data:o}=U(r==null?void 0:r.id,1,0,{enabled:!!(l&&r)}),s=o&&o.results.length>0,{mutate:j}=H({onSuccess:()=>{_("You are no longer registered for this challenge","info")},onError:i=>{_(i.reason,"danger")}}),h=()=>{l&&r&&f&&j({teamId:r.participantTeamId,userId:f.ownerId})},p=()=>{d(!1)},R=()=>{d(!1),c(!s)};return t.jsxs(t.Fragment,{children:[t.jsx(N,{projectId:n,onJoinClick:u,onLeaveClick:I}),t.jsx(q,{open:m,projectId:n,onRegisterComplete:R,onCancel:p}),t.jsx(F,{projectId:n,onClose:()=>{b(!1)},isShowingModal:g}),t.jsx(Q,{open:T,title:"Leave this Challenge?",content:"Are you sure you want to leave this Challenge?",onCancel:()=>e(!1),onConfirm:()=>{h(),e(!1)}})]})}try{A.displayName="ChallengeDetailPage",A.__docgenInfo={description:"",displayName:"ChallengeDetailPage",props:{projectId:{defaultValue:null,description:"",name:"projectId",required:!0,type:{name:"string"}}}}}catch{}export{A as C};
