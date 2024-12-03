import{j as e}from"./jsx-runtime-DoxjgJx5.js";import{a as f}from"./index-Cu9bd8lq.js";import{S as I}from"./SynapseFullLogo-Bo6xAMPM.js";import"./VerificationSubmission-DL9jxYsQ.js";import"./RegularExpressions-SKYrON-T.js";import{l as L,r as _}from"./useFiles-DMbskdo6.js";import"./OrientationBanner-6BqxDXOp.js";import{S as B}from"./SageResourcesPopover-Dl2wqcYU.js";import{s as C}from"./styled-DKRXvDfM.js";import{M as N}from"./Menu-xRAbfX1G.js";import{M as R}from"./MenuItem-D3tilmmv.js";import{u as P}from"./utils-B6ltzQPV.js";import{u as z}from"./useMediaQuery-DetXi6Yl.js";import{B as l}from"./Box-Bt_N9PQN.js";import{B as t}from"./Button-j3jTttn9.js";import{I as j}from"./IconButton-DhHKwBf8.js";import{c as H}from"./createSvgIcon-Dn0UJ7ef.js";import{C as E}from"./Close-Bxs-S91i.js";import{D as A}from"./Divider-Buxfc7OL.js";const O=H(e.jsx("path",{d:"M3 18h18v-2H3zm0-5h18v-2H3zm0-7v2h18V6z"}),"MenuOutlined"),D="/LoginPlace:0",T="/Home:x",y="/Plans:0",S="/Profile:v/projects/all",c={fontSize:"18px",lineHeight:"24px",fontWeight:400},p={borderRadius:"0",p:{xs:"7px 10px",sm:"7px 30px"}},V=C(N)(()=>({"& .MuiPaper-root":{width:"100vw",height:"100vh",maxWidth:"100vw",maxHeight:"100vh",margin:0,top:"0 !important",left:"0 !important",transform:"none"}})),s=C(R)(()=>({fontSize:"36px",fontWeight:200,lineHeight:"32px",height:"80px",paddingLeft:"30px"})),k=({gotoPlace:n})=>{const{accessToken:b}=L(),r=!!b,x=_("/register1"),d=P(),m=z(d.breakpoints.down("md")),[h,u]=f.useState(null),v=i=>{u(i.currentTarget)},o=()=>{u(null)},[M,a]=f.useState(null),w=()=>{a(null)},g=()=>{n(D)};return e.jsxs(l,{sx:{display:"flex",justifyContent:"space-between",alignItems:"center",columnGap:"5px",p:{xs:"10px 5px",sm:"20px 15px"}},children:[e.jsx("a",{onClick:()=>n(T),children:e.jsx(I,{textColor:d.palette.primary[900]})}),!m&&e.jsxs(l,{sx:{display:"flex",justifyContent:"flex-end",alignItems:"center",gap:"20px"},children:[e.jsx(t,{sx:c,onClick:()=>n(y),children:"Plans"}),e.jsx(t,{sx:c,onClick:i=>a(i.currentTarget),children:"Portals"}),e.jsx(t,{sx:{...c,mr:"15px"},href:"https://sagebionetworks.org/",target:"_blank",children:"Sage Bionetworks"}),!r&&e.jsx(t,{size:"large",variant:"outlined",color:"secondary",sx:p,onClick:g,children:"Login"}),!r&&e.jsx(t,{size:"large",variant:"contained",color:"secondary",sx:p,href:x.toString(),children:"Register Now"}),r&&e.jsx(t,{size:"large",variant:"outlined",color:"secondary",sx:p,onClick:()=>{n(S)},children:"View Dashboard"})]}),e.jsx(B,{anchorEl:M,onClose:w}),m&&e.jsxs(l,{sx:{display:"flex",justifyContent:"flex-end",columnGap:"10px"},children:[e.jsx(j,{color:"secondary",sx:{borderWidth:1,borderStyle:"solid",borderRadius:"0",ml:"70px"},onClick:v,children:e.jsx(O,{})}),e.jsxs(V,{anchorEl:h,anchorOrigin:{vertical:"top",horizontal:"right"},keepMounted:!0,transformOrigin:{vertical:"top",horizontal:"right"},open:!!h,onClose:o,MenuListProps:{style:{width:"100%",height:"100%"}},children:[e.jsx(j,{onClick:o,sx:{position:"absolute",top:5,right:5,zIndex:1,color:"secondary.main",borderWidth:1,borderStyle:"solid",borderRadius:"0"},children:e.jsx(E,{})}),e.jsx(s,{sx:{mt:"70px"},onClick:()=>{n(y),o()},children:"Plans"}),e.jsx(s,{onClick:i=>{a(i.currentTarget),o()},children:"Portals"}),e.jsx(s,{onClick:()=>{window.open("https://sagebionetworks.org/","_blank"),o()},children:"Sage Bionetworks"}),e.jsx(A,{sx:{pt:"100px"}}),!r&&e.jsx(s,{sx:{mt:"30px",color:"secondary.main"},onClick:()=>{window.open(x.toString(),"_blank"),o()},children:"Register Now"}),!r&&e.jsx(s,{sx:{mb:"40px"},onClick:()=>{o(),g()},children:"Log In"}),r&&e.jsx(s,{sx:{mb:"40px",color:"secondary.main"},onClick:()=>{o(),n(S)},children:"View Dashboard"})]})]})]})};try{k.displayName="SynapseHomepageNavBar",k.__docgenInfo={description:"",displayName:"SynapseHomepageNavBar",props:{gotoPlace:{defaultValue:null,description:"",name:"gotoPlace",required:!0,type:{name:"(href: string) => void"}}}}}catch{}export{y as P,k as S};