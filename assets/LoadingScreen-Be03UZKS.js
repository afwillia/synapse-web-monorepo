import{j as e}from"./jsx-runtime-DoxjgJx5.js";import{r as p}from"./index-Cu9bd8lq.js";import{B as f}from"./Backdrop-CoMkdzxE.js";import{B as x}from"./Box-Bt_N9PQN.js";import{T as n}from"./Typography-D6GCV-CB.js";import{B as y}from"./Button-j3jTttn9.js";import{L as d}from"./LinearProgress-DB_pgUJr.js";const B=e.jsx("div",{className:"bar-loader",children:e.jsx(d,{classes:{colorPrimary:"bar-background-color",barColorPrimary:"bar-color"}})});function i({size:r=20,margin:a="auto"}){return e.jsx("div",{role:"progressbar",className:"spinner",style:{height:`${r}px`,width:`${r}px`,backgroundSize:`${r}px`,margin:`${a}`}})}function l({show:r,currentProgress:a,onCancel:t,totalProgress:o,headlineText:c,hintText:s}){p.useEffect(()=>(document.body.style.cursor=r?"wait":"default",()=>{document.body.style.cursor="default"}),[r]);const u=e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"bar-loader",children:e.jsx(d,{"data-testid":"progress-bar",variant:"determinate",classes:{colorPrimary:"bar-background-color",barColorPrimary:"bar-color"},value:a/o*100})}),e.jsx(n,{variant:"headline3",mb:2,children:c}),e.jsx(n,{variant:"hintText",mb:2,children:s})]});return e.jsx(f,{open:r,onClick:()=>{},"aria-hidden":!1,sx:{backgroundColor:"rgba(255, 255, 255, 0.9)",zIndex:m=>m.zIndex.modal+1},children:e.jsxs(x,{display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column",children:[o?u:e.jsxs(e.Fragment,{children:[e.jsx(i,{size:40,margin:"16px"}),e.jsx(n,{variant:"headline3","data-testid":"spinner-hint-text",mb:2,children:s})]}),t&&e.jsx(y,{variant:"outlined",color:"primary",onClick:t,children:"Cancel"})]})})}try{i.displayName="SynapseSpinner",i.__docgenInfo={description:"",displayName:"SynapseSpinner",props:{size:{defaultValue:{value:"20"},description:"",name:"size",required:!1,type:{name:"number"}},margin:{defaultValue:{value:"auto"},description:"",name:"margin",required:!1,type:{name:"string"}}}}}catch{}try{l.displayName="BlockingLoader",l.__docgenInfo={description:"",displayName:"BlockingLoader",props:{show:{defaultValue:null,description:"",name:"show",required:!0,type:{name:"boolean"}},currentProgress:{defaultValue:null,description:"",name:"currentProgress",required:!1,type:{name:"number"}},totalProgress:{defaultValue:null,description:"",name:"totalProgress",required:!1,type:{name:"number"}},onCancel:{defaultValue:null,description:"",name:"onCancel",required:!1,type:{name:"(() => void)"}},hintText:{defaultValue:null,description:"",name:"hintText",required:!1,type:{name:"string"}},headlineText:{defaultValue:null,description:"",name:"headlineText",required:!1,type:{name:"string"}}}}}catch{}export{l as B,i as S,B as l};
