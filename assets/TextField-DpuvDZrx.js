import{j as n}from"./jsx-runtime-DoxjgJx5.js";import{r as a,a as m}from"./index-Cu9bd8lq.js";import{s as c}from"./styled-DKRXvDfM.js";import{F as p,f as u,I as f,b as y}from"./InputLabel-RHZu0c3g.js";import{i as x}from"./inputBaseClasses-Db8tCxfW.js";const r=c(p,{label:"StyledFormControl"})(({theme:e})=>({"& label":{fontSize:"14px",transform:"none"},[`& .${u.root}`]:{marginLeft:"0","&.Mui-error":{color:"#c13415"}},[`& .${x.root}`]:{marginTop:e.spacing(3)},"& .MuiInputBase-multiline":{padding:"0px"},"& fieldset":{border:"none"}}));try{r.displayName="StyledFormControl",r.__docgenInfo={description:"",displayName:"StyledFormControl",props:{ref:{defaultValue:null,description:"",name:"ref",required:!1,type:{name:"((instance: HTMLDivElement | null) => void) | RefObject<HTMLDivElement> | null"}},component:{defaultValue:null,description:"",name:"component",required:!1,type:{name:"ElementType<any, keyof IntrinsicElements>"}}}}}catch{}function i(e){const o=a.useId(),{noWrapInFormControl:l,label:_,...s}=e,d=a.useMemo(()=>l?t=>n.jsx(m.Fragment,{children:t.children}):t=>n.jsx(r,{fullWidth:!0,sx:{my:1},children:t.children}),[l]);return n.jsxs(d,{children:[e.label&&n.jsx(f,{htmlFor:e.id||o,sx:{fontWeight:700,mb:"4px",pointerEvents:"unset","&::after":({palette:t})=>({content:e.required?'"*"':void 0,marginLeft:"3px",color:t.secondary.main})},children:e.label}),n.jsx(y,{id:o,...s})]})}try{i.displayName="TextField",i.__docgenInfo={description:"A styled text field built using MUI components and designed to match the Sage Design System (SDS) input fields.",displayName:"TextField",props:{noWrapInFormControl:{defaultValue:null,description:"",name:"noWrapInFormControl",required:!1,type:{name:"boolean"}}}}}catch{}export{r as S,i as T};