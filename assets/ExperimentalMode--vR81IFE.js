import{j as e}from"./jsx-runtime-DoxjgJx5.js";import{r as s}from"./index-Cu9bd8lq.js";import{C as f}from"./OrientationBanner-DAlOe-D5.js";import{a5 as u}from"./useFiles-CppbjU7S.js";import{d as i}from"./SynapseConstants-BzyMj965.js";import{a as h}from"./index.prod-iauMuJ6Z.js";import{u as x}from"./utils-B6ltzQPV.js";import{B as E}from"./Box-Bt_N9PQN.js";import{T as I}from"./Typography-D6GCV-CB.js";import{T as y}from"./Tooltip-CTVx2uGI.js";import{I as M}from"./IconButton-DhHKwBf8.js";import{I as _}from"./InfoOutlined-DE16MDj_.js";const l="experimental-mode",g="This mode gives you early access to features that are still in development. Please note that we do not guarantee an absence of errors, and that the data created using these features may be lost during product upgrade.";function m({onExperimentalModeToggle:t}){const[r,o]=s.useState(!1),a=new f;let n=!0;const p=x();s.useEffect(()=>(n&&u()&&o(!0),()=>{n=!1}),[]);const d=()=>{a.set(i,"true",{path:"/"}),o(!0),t&&t(!0)},c=()=>{a.remove(i,{path:"/"}),o(!1),t&&t(!1)};return e.jsxs(E,{sx:{display:"flex",alignItems:"center"},children:[e.jsx(I,{component:"label",variant:"body1",htmlFor:l,children:"Experimental Mode"}),e.jsx(y,{title:g,arrow:!0,placement:"top",children:e.jsx(M,{"aria-label":"info",color:"inherit",sx:{"&:hover":{backgroundColor:"transparent"}},children:e.jsx(_,{sx:{verticalAlign:"middle"}})})}),e.jsx(h,{id:l,width:35,height:20,onColor:p.palette.secondary.main,checkedIcon:!1,uncheckedIcon:!1,checked:r,onChange:r?c:d})]})}try{m.displayName="ExperimentalMode",m.__docgenInfo={description:"",displayName:"ExperimentalMode",props:{onExperimentalModeToggle:{defaultValue:null,description:"",name:"onExperimentalModeToggle",required:!1,type:{name:"((newValue: boolean) => void)"}}}}}catch{}export{m as E};
