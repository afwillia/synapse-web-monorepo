import{j as e}from"./jsx-runtime-DoxjgJx5.js";import{R as l,c as B}from"./VerificationSubmission-DL9jxYsQ.js";import{S as V,M as Y}from"./SelfSignAccessRequirement-DgPC_GUl.js";import{p as W}from"./pluralize-D3rOHoU0.js";import{a as X,r as i}from"./index-Cu9bd8lq.js";import{X as z}from"./useFiles-cx7pZlDv.js";import"./RegularExpressions-CmcMRs19.js";import"./OrientationBanner-BX0HvA84.js";import{f as K,g as Z,h as ee}from"./useAccessRequirements-De8aEJGW.js";import{E as te}from"./EntitySubjectsSelector-mZlcLW-j.js";import{T as se}from"./TeamSubjectsSelector-DDKapY-q.js";import{S as E}from"./Skeleton-D27KV3ni.js";import{T as R}from"./TextField-CtK4VpDg.js";import{A as _}from"./Alert-D00uobdd.js";import{T as b}from"./Typography-CaL9sKMg.js";import{F as y}from"./FormControlLabel-BehRBTI5.js";import{C as re}from"./Checkbox-CMxRAOuT.js";import{S as ne}from"./Stack-Dwyinhto.js";import{T as oe}from"./Tooltip-CQm22TSO.js";import{H as ae}from"./IconSvg-D7Q47tWe.js";import{R as ie}from"./RadioGroup-BRNoHnJ5.js";import{R as k}from"./Radio-eyhGV30W.js";const ce="Please select at least one resource for this Access Requirement to be associated with.",C=c=>{const f=c===l.ENTITY?"Synapse":"Team",T=c[0].toUpperCase()+c.slice(1).toLowerCase();return`${f} IDs were specified but not added to the subjects list. Please either clear out the Add ${f} IDs textbox or click the Add ${W(T)} button.`},le="Enter access requirement name. This will also be used when sending notifications for expiring or revoked approval. For example, 'The approval for the name access requirement was revoked...'",g={variant:"body1",fontWeight:700};function ue(c){switch(c){case l.ENTITY:return B.DOWNLOAD;case l.TEAM:return B.PARTICIPATE;default:throw new Error(`RestrictableObjectType ${c} does not have an access type specified.`)}}const G=X.forwardRef(function(f,T){const{subject:n,accessRequirementId:I,onSave:H,onError:h}=f,d=!n,[u,j]=i.useState(n?[n]:[]),[x,$]=i.useState(!1),[N,p]=i.useState(null),[S,q]=i.useState(""),[o,v]=i.useState(!1),[A,w]=i.useState((n==null?void 0:n.type)===l.TEAM?V:Y),[U,M]=i.useState(null),F=t=>{M(null),H(t.id.toString(),t.concreteType)},D=t=>{M(t.reason),h()},{mutate:O}=K({onSuccess:t=>F(t),onError:t=>D(t)}),{mutate:P}=Z({onSuccess:t=>F(t),onError:t=>D(t)}),{data:s,isLoading:J,error:L}=ee(I,{enabled:!!I});i.useEffect(()=>{s&&(w(s.concreteType),q(s.name),j(s.subjectIds),v(s.subjectsDefinedByAnnotations))},[s]);const a=i.useMemo(()=>{if(n)return n.type;if(s){const t=s.subjectIds;if(t.length>0)return t[0].type}return o?l.ENTITY:null},[n,s,o]),Q=i.useMemo(()=>{if(!a)return e.jsx(e.Fragment,{});function t(r){p(null),j(r)}function m(r){p(null),$(r.trim()!=="")}if(o)return e.jsx(e.Fragment,{});switch(a){case l.TEAM:return e.jsx(se,{subjects:u,onUpdate:r=>t(r),onUpdateTeamIDsTextbox:r=>m(r)});case l.ENTITY:return e.jsx(te,{subjects:u,onUpdate:r=>t(r),onUpdateEntityIDsTextbox:r=>m(r)});default:return console.error(`RestrictableObjectType ${a} does not have a selector implemented.`),e.jsx(e.Fragment,{})}},[a,u,o]);return i.useImperativeHandle(T,()=>({save(){const t=d&&!s||!a,m=!o&&(x||u.length===0);if(t||m){m&&!t&&(x?p(C(a)):u.length===0&&p(ce)),h();return}const r=ue(a);d||O({concreteType:A,subjectIds:u,name:S,accessType:r,subjectsDefinedByAnnotations:o}),d&&s&&P({...s,subjectIds:u,name:S,accessType:r,subjectsDefinedByAnnotations:o})}}),[x,a,u,S,A,s,d,h,O,P,o]),J||!a?e.jsxs(e.Fragment,{children:[e.jsx(E,{width:100,height:30}),e.jsx(E,{width:125,height:30}),e.jsx(E,{width:"100%",children:e.jsx(R,{})}),e.jsx(E,{width:100,height:30}),e.jsx(E,{width:"100%",children:e.jsx(R,{})})]}):L?e.jsx(_,{severity:"error",children:L.reason}):e.jsxs(e.Fragment,{children:[e.jsx(b,{...g,children:"Resources"}),a!==l.TEAM&&e.jsx(y,{control:e.jsx(re,{}),label:"Associated entities should be defined by annotations (DUO)",checked:o,onChange:()=>{p(null);let t=[];o&&(s?t=s.subjectIds:n&&(t=[n])),j(t),v(!o)}}),e.jsx(z,{children:Q}),N&&e.jsx(_,{severity:"error",children:N}),e.jsxs(ne,{direction:"row",gap:1,alignItems:"center",mb:1,mt:2,children:[e.jsx(b,{component:"label",htmlFor:"arName",...g,children:"Name"}),e.jsx(oe,{title:le,placement:"right",children:e.jsx(ae,{sx:{color:"grey.600"}})})]}),e.jsx(R,{id:"arName",name:"arName",value:S,placeholder:"Access requirement name",fullWidth:!0,onChange:t=>q(t.target.value)}),!d&&a!==l.TEAM&&e.jsxs(e.Fragment,{children:[e.jsx(b,{...g,mt:2,children:"Access requirement type"}),e.jsxs(ie,{value:A,onChange:(t,m)=>w(m),children:[e.jsx(y,{value:Y,control:e.jsx(k,{}),label:"Controlled - requests are in Synapse"}),e.jsx(y,{value:V,control:e.jsx(k,{}),label:"Click wrap"})]})]}),U&&e.jsx(_,{severity:"error",sx:{marginTop:2},children:U})]})});try{C.displayName="UNSAVED_SUBJECTS_ERROR_MESSAGE",C.__docgenInfo={description:"",displayName:"UNSAVED_SUBJECTS_ERROR_MESSAGE",props:{}}}catch{}try{G.displayName="SetAccessRequirementCommonFields",G.__docgenInfo={description:"",displayName:"SetAccessRequirementCommonFields",props:{subject:{defaultValue:null,description:"",name:"subject",required:!1,type:{name:"RestrictableObjectDescriptor"}},accessRequirementId:{defaultValue:null,description:"",name:"accessRequirementId",required:!1,type:{name:"string"}},onSave:{defaultValue:null,description:"",name:"onSave",required:!0,type:{name:"(accessRequirementId: string, accessRequirementConreteType: ACCESS_REQUIREMENT_CONCRETE_TYPE) => void"}},onError:{defaultValue:null,description:"",name:"onError",required:!0,type:{name:"() => void"}}}}}catch{}export{G as S};
