import{j as e}from"./jsx-runtime-DoxjgJx5.js";import{d as m}from"./dayjs.min-D1RcYm3-.js";import{r as c}from"./index-Cu9bd8lq.js";import{G as T,N as I,v as C}from"./useFiles-DFdLn1TY.js";import{f as y}from"./DateFormatter-Cu9Eje_m.js";import{m as U,u as N,F as O,M as B}from"./ConfirmationDialog-Gg6sPqgv.js";import{h as E,a as P,i as _}from"./useAccessRequirements-Cf1xallB.js";import{A as H}from"./SynapseConstants-binLeAzi.js";import{c as K,S,F as L}from"./VerificationSubmission-DL9jxYsQ.js";import{W as M}from"./WarningDialog-CJhvw8gE.js";import{U as A}from"./UserOrTeamBadge-Bu8diy_9.js";import{d as k}from"./DownloadConfirmationUI-lzJj7LH5.js";import{R as V}from"./RejectDataAccessRequestModal-COpuj_yT.js";import{U as p}from"./UserBadge-Dacv8zVU.js";import{T as s}from"./Typography-D6GCV-CB.js";import{S as n}from"./Skeleton-DxEJ6_Wp.js";import{B as b}from"./Button-j3jTttn9.js";import{a as W,t as G}from"./ThemesPlot-DTwb1x2M.js";m.extend(k);function v(d){const{submissionId:i,fileHandleId:o}=d,l=c.useMemo(()=>({fileHandleId:o,associateObjectId:i,associateObjectType:L.DataAccessSubmissionAttachment}),[o,i]);return e.jsx(O,{showDownloadIcon:!0,fileHandleAssociation:l},o)}function $(d){return e.jsx(M,{open:d.open,title:"Approve Request?",content:e.jsxs(e.Fragment,{children:[e.jsx(s,{variant:"body1",sx:{marginBottom:"10px"},children:"Approving the request will grant access to controlled data."}),e.jsx(s,{variant:"body1",children:"In addition, the user will receive an email notification alerting them that the request has been granted."})]}),onConfirm:d.onConfirm,onConfirmCallbackArgs:[],onCancel:d.onCancel,confirmButtonText:"Approve"})}function Y(d){const{data:i}=_(d.accessRequirementId,{throwOnError:!0});return i?e.jsx("div",{className:"AccessRequirementWikiContainer",children:e.jsxs("div",{className:"AccessRequirementWikiContent",children:[e.jsx(s,{variant:"headline1",children:"Access Requirement"}),e.jsx("hr",{}),e.jsx(B,{wikiId:i==null?void 0:i.wikiPageId,ownerId:i==null?void 0:i.ownerObjectId,objectType:i==null?void 0:i.ownerObjectType})]})}):e.jsx(n,{width:"100%",height:"600px"})}function w(d){var f;const{submissionId:i}=d,[o,l]=c.useState(!1),R=T(),{data:a,refetch:g}=U(i,{throwOnError:!0}),{mutateAsync:D}=N(),{data:r}=E(parseInt(a==null?void 0:a.accessRequirementId),{enabled:!!a}),{data:h,isLoading:x}=P(a==null?void 0:a.accessRequirementId,{enabled:!!a,throwOnError:!0}),[F,j]=c.useState(!1);function q(){return D({submissionId:(a==null?void 0:a.id)??"",newState:S.APPROVED})}const u=h==null?void 0:h.resourceAccess.filter(t=>t.accessType.includes(K.REVIEW_SUBMISSIONS)).map(t=>t.principalId);return e.jsxs("div",{className:"SubmissionPage",children:[e.jsx($,{open:F,onCancel:()=>{j(!1)},onConfirm:async()=>{try{await q()}catch(t){R(t)}j(!1),g()}}),o&&e.jsx(V,{submissionId:i,open:o,onClose:()=>l(!1)}),e.jsxs("div",{className:"SubmissionSummary",children:[e.jsx(s,{variant:"dataFieldKey",children:"Status"}),e.jsx(s,{variant:"headline3",children:a?a.state:e.jsx(n,{width:100})}),e.jsx("br",{}),a?a.state===S.SUBMITTED&&e.jsxs("div",{className:"ButtonContainer",children:[e.jsx(b,{onClick:()=>{j(!0)},color:"success",variant:"contained",children:"Approve"}),e.jsx(b,{onClick:()=>{l(!0)},color:"error",variant:"contained",children:"Reject"})]}):e.jsx(n,{width:200}),e.jsx(s,{variant:"dataFieldKey",children:"Access Requirement Name"}),e.jsx(s,{variant:"smallText1",children:(r==null?void 0:r.name)??e.jsx(n,{width:100})}),e.jsx("br",{}),e.jsx(s,{variant:"dataFieldKey",children:"Assigned Reviewer"}),e.jsxs(s,{variant:"smallText1",children:[x&&e.jsx(n,{width:100}),!x&&!I(u)&&u.map(t=>e.jsx(A,{principalId:t},t)),!x&&I(u)&&e.jsx(A,{principalId:H})]}),e.jsx("br",{}),e.jsx(s,{variant:"dataFieldKey",children:"Conditions"}),r?e.jsx(s,{variant:"smallText1",component:"div",children:e.jsxs("ul",{children:[e.jsxs("li",{children:["Expiration period:"," ",m.duration({milliseconds:r.expirationPeriod}).asDays()," ","day(s)",r.expirationPeriod===0&&" (no expiration)"]}),r.isCertifiedUserRequired&&e.jsx("li",{children:"User must be Certified"}),r.isValidatedProfileRequired&&e.jsx("li",{children:"User Profile must be Validated"}),r.isDUCRequired&&e.jsx("li",{children:"DUC is required"}),r.isIDURequired&&e.jsx("li",{children:"IDU is required"}),r.isIDUPublic&&e.jsx("li",{children:"IDU will be made public"}),r.isIRBApprovalRequired&&e.jsx("li",{children:"IRB Approval is required"}),r.areOtherAttachmentsRequired&&e.jsx("li",{children:"Other attachments are required"})]})}):e.jsx(n,{width:100}),e.jsx("br",{}),e.jsxs("div",{className:"SubmissionSummaryGrid",children:[e.jsx(s,{variant:"dataFieldKey",children:"Submitted By"}),e.jsx(s,{variant:"smallText1",children:a?e.jsx(p,{userId:a.submittedBy}):e.jsx(n,{width:100})}),e.jsx(s,{variant:"dataFieldKey",children:"Submitted On"}),e.jsx(s,{variant:"smallText1",children:a?y(m(a.submittedOn)):e.jsx(n,{width:100})}),e.jsx(s,{variant:"dataFieldKey",children:"Modified By"}),e.jsx(s,{variant:"smallText1",children:a?e.jsx(p,{userId:a.modifiedBy}):e.jsx(n,{width:100})}),e.jsx(s,{variant:"dataFieldKey",children:"Modified On"}),e.jsx(s,{variant:"smallText1",children:a?y(m(a.modifiedOn)):e.jsx(n,{width:100})}),e.jsxs(s,{className:"Key",variant:"dataFieldKey",children:["Data Requesters",`${a?` (${a.accessorChanges.length})`:""}`]}),a?a.accessorChanges.map(t=>e.jsxs(c.Fragment,{children:[e.jsx(s,{className:"Key DataAccessor",variant:"smallText1",children:e.jsx("span",{style:{whiteSpace:"nowrap"},children:e.jsx(p,{userId:t.userId},t.userId)})}),e.jsx(s,{className:"Value DataAccessor",variant:"smallText1",children:W(G(t.type.substring(0,t.type.indexOf("_"))))})]},t.userId)):e.jsx(n,{width:100}),e.jsx(s,{className:"Key",variant:"dataFieldKey",children:"Institution"}),e.jsx(s,{className:"Value",variant:"smallText1",children:a?a.researchProjectSnapshot.institution:e.jsx(n,{width:100})}),e.jsx(s,{className:"Key",variant:"dataFieldKey",children:"Project Lead"}),e.jsx(s,{className:"Value",variant:"smallText1",children:a?a.researchProjectSnapshot.projectLead:e.jsx(n,{width:100})})]})]}),e.jsxs("div",{className:"SubmissionRightPane",children:[e.jsx(C,{children:a?e.jsx(Y,{accessRequirementId:a.accessRequirementId}):e.jsx(e.Fragment,{})}),e.jsxs("div",{children:[(a==null?void 0:a.rejectedReason)&&e.jsxs(e.Fragment,{children:[e.jsx(s,{variant:"headline1",children:"Reason for rejection given by reviewer"}),e.jsx("hr",{}),e.jsx(s,{variant:"body1",style:{whiteSpace:"pre-line"},children:a.rejectedReason})]}),e.jsx(s,{variant:"headline1",children:"Contents of the Access Request"}),e.jsx("hr",{}),((f=a==null?void 0:a.researchProjectSnapshot)==null?void 0:f.intendedDataUseStatement)&&e.jsxs(e.Fragment,{children:[e.jsx(s,{variant:"headline2",children:"Intended Data Use Statement"}),e.jsx(s,{variant:"body1",style:{whiteSpace:"pre-line"},children:a.researchProjectSnapshot.intendedDataUseStatement})]}),e.jsx(s,{variant:"headline2",children:"Documents"}),(a==null?void 0:a.ducFileHandleId)&&e.jsxs(e.Fragment,{children:[e.jsx(s,{variant:"smallText2",children:"Data Use Certificate (DUC)"}),e.jsx(v,{submissionId:a.id,fileHandleId:a.ducFileHandleId})]}),(a==null?void 0:a.irbFileHandleId)&&e.jsxs(e.Fragment,{children:[e.jsx(s,{variant:"smallText2",children:"IRB Approval Letter"}),e.jsx(v,{submissionId:a.id,fileHandleId:a.irbFileHandleId})]}),(a==null?void 0:a.attachments)&&e.jsxs(e.Fragment,{children:[e.jsx(s,{variant:"smallText2",children:"Other Attachments"}),a.attachments.map(t=>e.jsxs(c.Fragment,{children:[e.jsx(v,{submissionId:a.id,fileHandleId:t}),e.jsx("br",{})]},t))]})]})]})]})}try{w.displayName="SubmissionPage",w.__docgenInfo={description:"Page for a Data Access Submission that a designated reviewer can view, and choose to approve or reject.",displayName:"SubmissionPage",props:{submissionId:{defaultValue:null,description:"The ID of the submission to view",name:"submissionId",required:!0,type:{name:"string | number"}}}}}catch{}export{w as S};
