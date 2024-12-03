import{j as e}from"./jsx-runtime-DoxjgJx5.js";import{r as u}from"./index-Cu9bd8lq.js";import{L as f,M as h,a as j}from"./ConfirmationDialog-DV4m9oIq.js";import{T as c}from"./Typography-D6GCV-CB.js";import{B as r}from"./Box-Bt_N9PQN.js";import{H as b}from"./IconSvg-ESskBwc4.js";import{B as g}from"./Button-j3jTttn9.js";import{C as E}from"./cloneDeep-C-OZ4saa.js";import{M as L}from"./MenuItem-D3tilmmv.js";import{T as S}from"./TextField-BM400Yg9.js";import{n as p}from"./noop-DX6rZLP_.js";import{L as y}from"./List-BhKoI0Qm.js";import{L as A}from"./ListItem-CA4Es91E.js";function m(t){const{text:n,tooltipMarkdownText:a}=t;return e.jsxs(e.Fragment,{children:[n,a&&e.jsx(f,{title:e.jsx(c,{variant:"body1",mb:0,children:e.jsx(h,{markdown:a})}),children:e.jsx(b,{sx:{ml:1,color:"grey.600",fontSize:"16px"}})})]})}function d(t){const{evaluations:n}=t;return e.jsxs(e.Fragment,{children:[e.jsx(c,{variant:"body1",children:"Available Evaluation Queues:"}),e.jsx(y,{dense:!0,children:n.map(a=>e.jsx(A,{children:e.jsx(m,{text:a.name,tooltipMarkdownText:a.submissionInstructionsMessage})},a.id))})]})}function T(t){const{evaluations:n,isSelectable:a}=t,[o,s]=u.useState(!1),i=a?2:8,l=n.length>=i;return e.jsx(r,{mt:2,children:l?e.jsxs(e.Fragment,{children:[e.jsx(g,{variant:"contained",sx:{mb:1},onClick:()=>s(!o),children:`${o?"Hide":"Show"} All Available Evaluation Queues`}),e.jsx(E,{in:o,children:e.jsx(d,{...t})})]}):e.jsx(e.Fragment,{children:e.jsx(d,{...t})})})}function C(t){const{evaluations:n,onChangeSelectedEvaluation:a=p}=t,[o,s]=u.useState(null);return e.jsx(j,{disablePortal:!1,value:o,onChange:(i,l)=>{s(l),a(l)},options:n,getOptionLabel:i=>i.name,renderOption:(i,l,M,v)=>e.jsx(L,{...i,children:e.jsx(m,{text:v.getOptionLabel(l),tooltipMarkdownText:l.submissionInstructionsMessage})}),renderInput:i=>e.jsx(S,{...i,label:"Selected Evaluation Queue"})})}function x(t){const{isSelectable:n=!0,onChangeSelectedEvaluation:a=p,evaluations:o}=t,s=o.length;if(u.useEffect(()=>{s===1&&n&&a(o[0])},[o,n,s,a]),s===0)return e.jsx(c,{variant:"body1",children:"No evaluations found"});if(s===1){const i=o[0];return e.jsx(r,{display:"flex",alignItems:"center",children:e.jsx(m,{text:i.name,tooltipMarkdownText:i.submissionInstructionsMessage})})}return e.jsxs(r,{className:"AvailableEvaluationQueueList",children:[n&&e.jsx(C,{...t}),e.jsx(T,{...t})]})}try{x.displayName="AvailableEvaluationQueueList",x.__docgenInfo={description:"",displayName:"AvailableEvaluationQueueList",props:{evaluations:{defaultValue:null,description:"",name:"evaluations",required:!0,type:{name:"Evaluation[]"}},isSelectable:{defaultValue:null,description:"",name:"isSelectable",required:!1,type:{name:"boolean"}},onChangeSelectedEvaluation:{defaultValue:null,description:"",name:"onChangeSelectedEvaluation",required:!1,type:{name:"((evaluation: Evaluation | null) => void)"}}}}}catch{}export{x as A};