import{j as r}from"./jsx-runtime-DoxjgJx5.js";import{i as l,j as c,k as _,l as u}from"./VerificationSubmission-DL9jxYsQ.js";import{T as E}from"./Typography-CaL9sKMg.js";import{F as I}from"./FormGroup-DbSnk97O.js";import{F as f}from"./FormControlLabel-BehRBTI5.js";import{C as y}from"./Checkbox-CMxRAOuT.js";import{A as T}from"./Alert-D00uobdd.js";const d=[["Files",l],["Folders",c],["Tables",_],["Datasets",u]];function s(e){return d.forEach(([,a])=>{e&a&&(e=e-a)}),e===0}function i(e){const{value:a,onChange:p,disabled:m=!1}=e,o=!s(a);return r.jsxs(r.Fragment,{children:[r.jsx(E,{variant:"body1",mt:2.5,mb:1.25,sx:{fontWeight:700},children:"Include in View"}),r.jsx(I,{sx:{gap:1},children:d.map(([t,n])=>r.jsx(f,{control:r.jsx(y,{}),label:t,checked:(a&n)>0,disabled:o||m,onChange:()=>{p(a^n)}},t))}),o&&r.jsx(T,{severity:"warning",sx:{my:2.25},children:"A custom mask is in use. Changes cannot be made in the UI."})]})}try{s.displayName="isMaskSupportedInUI",s.__docgenInfo={description:"",displayName:"isMaskSupportedInUI",props:{}}}catch{}try{i.displayName="EntityViewMaskEditor",i.__docgenInfo={description:"",displayName:"EntityViewMaskEditor",props:{value:{defaultValue:null,description:"",name:"value",required:!0,type:{name:"number"}},onChange:{defaultValue:null,description:"",name:"onChange",required:!0,type:{name:"(mask: number) => void"}},disabled:{defaultValue:null,description:"",name:"disabled",required:!1,type:{name:"boolean"}}}}}catch{}export{i as E};
