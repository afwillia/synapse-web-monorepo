import{j as n}from"./jsx-runtime-DoxjgJx5.js";import{r}from"./index-Cu9bd8lq.js";import{C as s}from"./ConfirmationDialog-DZjTrOyQ.js";import{W as d}from"./WarningDialog-C9tqEkPU.js";import{E as u}from"./useEntitySelection-C6eWaSgW.js";import{B as m}from"./Box-D4TeY3X6.js";import{T as p}from"./Typography-CaL9sKMg.js";const c="Unsaved Changes",i=e=>{const[o,a]=r.useState([]),[l,t]=r.useState(!1);return n.jsxs(n.Fragment,{children:[n.jsx(d,{title:c,content:"Any unsaved changes will be lost. Are you sure you want to close the finder?",open:l,confirmButtonText:"Close Finder",onConfirm:()=>{t(!1),e.onCancel()},onCancel:()=>{t(!1)}}),n.jsx(s,{open:e.show,title:e.title,fullWidth:!1,maxWidth:"xl",titleHelpPopoverProps:e.titleHelpPopoverProps,confirmButtonProps:{children:e.confirmButtonCopy},onConfirm:()=>{e.onConfirm(o)},onCancel:()=>{o.length>0?t(!0):e.onCancel()},content:n.jsxs(m,{children:[n.jsx(p,{variant:"body1",mb:"10px",sx:{minWidth:"100%",width:0},children:e.promptCopy}),n.jsx(u,{...e.configuration,onSelectedChange:a})]})})]})};try{i.displayName="EntityFinderModal",i.__docgenInfo={description:"",displayName:"EntityFinderModal",props:{configuration:{defaultValue:null,description:"",name:"configuration",required:!0,type:{name:'Omit<EntityFinderProps, "onSelectedChange">'}},show:{defaultValue:null,description:"",name:"show",required:!0,type:{name:"boolean"}},title:{defaultValue:null,description:"",name:"title",required:!0,type:{name:"string"}},titleHelpPopoverProps:{defaultValue:null,description:"",name:"titleHelpPopoverProps",required:!1,type:{name:"HelpPopoverProps"}},onConfirm:{defaultValue:null,description:"",name:"onConfirm",required:!0,type:{name:"(selected: Reference[]) => void"}},confirmButtonCopy:{defaultValue:null,description:"",name:"confirmButtonCopy",required:!0,type:{name:"string"}},onCancel:{defaultValue:null,description:"",name:"onCancel",required:!0,type:{name:"() => void"}},promptCopy:{defaultValue:null,description:"",name:"promptCopy",required:!1,type:{name:"string"}}}}}catch{}export{i as E};
