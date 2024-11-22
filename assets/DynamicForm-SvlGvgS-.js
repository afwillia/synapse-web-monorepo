import{j as e}from"./jsx-runtime-DoxjgJx5.js";import{r as T}from"./index-Cu9bd8lq.js";import{u as f}from"./useQuery-BEUP4ZKU.js";import{u as P}from"./useMutation-BUHlmdy0.js";import{M as V}from"./MuiForm-DP0ibwhd.js";import"./isPlainObject-BDeK4qKc.js";import"./index.modern-BSaf6tm9.js";import"./_getPrototype-DSx75BAr.js";import{v as k}from"./index-Dl_32E6e.js";import"./styled-BNZh1-oq.js";import{d as h}from"./ToastMessage-DjaqMC_A.js";import"./SkeletonButton-BvfzBqnx.js";import"./SkeletonInlineBlock-CuT4NKvT.js";import"./SkeletonTable-WTp71Rcs.js";import{S as M}from"./SkeletonParagraph-CsTpS47q.js";import{B as o}from"./Box-D4TeY3X6.js";import{T as A}from"./Typography-CaL9sKMg.js";import{A as N}from"./Alert-D00uobdd.js";import{B as y}from"./Button-CnDFdqMc.js";function x(i){const{schemaUrl:n,uiSchemaUrl:m,postUrl:g,mutateFormDataBeforePost:c,onCancel:u,onSubmit:l}=i,[S,b]=T.useState({}),p=r=>({queryFn:async()=>{const a=await fetch(r);if(!a.ok)throw new Error("Error fetching schema");return a.json()}}),{data:j,status:D,isError:F,error:U}=f({...p(n),queryKey:["DynamicForm","schema",n]}),{data:E,status:v,isError:q,error:w}=f({...p(m),queryKey:["DynamicForm","uiSchema",m]}),{mutate:C,isPending:d}=P({mutationFn:async r=>{const a=c?c(r):r,s=await fetch(g,{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json"},body:JSON.stringify(a)});if(!s.ok){const B=await s.text();throw new Error(B)}return s.json()},onSuccess:()=>{h("Form submitted successfully!","success"),l&&l()},onError:r=>{h(`Error submitting form: ${r.message}`,"danger")}}),_=r=>{C(r)};if(D=="pending"||v=="pending")return e.jsxs(o,{children:[e.jsx(A,{variant:"body1",children:"Loading form..."}),e.jsx(M,{numRows:20,rowHeight:"40px"})]});const t=[];return F&&t.push(`Unable to retrieve schema: ${U.message}`),q&&t.push(`Unable to retrieve UI schema: ${w.message}`),t.length>0?e.jsxs(N,{severity:"error",children:["Unable to retrieve schema(s):"," ",t.map(r=>e.jsx(o,{children:r},r))]}):e.jsx(o,{sx:{p:"30px 10px"},children:e.jsx(V,{schema:j,uiSchema:E,formData:S,validator:k,onChange:({formData:r})=>b(r),onSubmit:({formData:r})=>_(r),disabled:d,children:e.jsxs(o,{sx:{display:"flex",gap:"10px",justifyContent:"flex-end"},children:[u&&e.jsx(y,{variant:"outlined",color:"primary",size:"large",onClick:u,children:"Cancel"}),e.jsx(y,{type:"submit",variant:"contained",color:"primary",size:"large",disabled:d,children:"Submit"})]})})})}try{x.displayName="DynamicForm",x.__docgenInfo={description:"",displayName:"DynamicForm",props:{schemaUrl:{defaultValue:null,description:"",name:"schemaUrl",required:!0,type:{name:"string"}},uiSchemaUrl:{defaultValue:null,description:"",name:"uiSchemaUrl",required:!0,type:{name:"string"}},postUrl:{defaultValue:null,description:"",name:"postUrl",required:!0,type:{name:"string"}},mutateFormDataBeforePost:{defaultValue:null,description:"",name:"mutateFormDataBeforePost",required:!1,type:{name:"((formData: any) => any)"}},onCancel:{defaultValue:null,description:"",name:"onCancel",required:!1,type:{name:"(() => void)"}},onSubmit:{defaultValue:null,description:"",name:"onSubmit",required:!1,type:{name:"(() => void)"}}}}}catch{}export{x as D};
