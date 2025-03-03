import{j as e}from"./jsx-runtime-Du8NFWEI.js";import{o as L,Q as p,J as T}from"./useFiles-BCjzBg19.js";import{i as H,g as U}from"./SynapseConstants-B7WMEsjp.js";import{r as O}from"./index-Dl6G-zuu.js";import"./VerificationSubmission-BmZsZ0JS.js";import"./StringUtils-DFpF2_59.js";import{u as P}from"./useShowDesktop-CPh-208G.js";import"./OrientationBanner-D-CGIdAn.js";import{u as Q}from"./useGetGoalData-iQ-09RxZ.js";import{P as $}from"./PortalSectionHeader-BFCpE_Og.js";import{Q as V}from"./QueryCount-DXuZNzR7.js";import{g as F,a as K,_ as W,b as z,d as v,i as Y}from"./createTheme-C4MKIpuQ.js";import{r as J}from"./createSvgIcon-VNptiZ50.js";import{C as X}from"./Card-J02zcsj3.js";import{s as A,u as Z,c as ee}from"./styled-BwKg_4wT.js";import{B as te}from"./ButtonBase-6jsyScMO.js";import{C as re}from"./CardMedia-BuF7IbSb.js";import{C as oe}from"./CardContent-rt9aUcV1.js";import{T as b}from"./Typography-DrqHmlDD.js";import{I as se}from"./IconButton-BIc9jQ57.js";import{E as ae}from"./ExpandableContent-e6QXpV3Q.js";import{B as ne}from"./Button-DtfaTZY_.js";import{B as j}from"./Box-CaFleW7-.js";import{a as ie}from"./Skeleton-CW6YXi1_.js";function le(t){return K("MuiCardActionArea",t)}const h=F("MuiCardActionArea",["root","focusVisible","focusHighlight"]),ce=["children","className","focusVisibleClassName"],ue=t=>{const{classes:r}=t;return ee({root:["root"],focusHighlight:["focusHighlight"]},le,r)},de=A(te,{name:"MuiCardActionArea",slot:"Root",overridesResolver:(t,r)=>r.root})(({theme:t})=>({display:"block",textAlign:"inherit",borderRadius:"inherit",width:"100%",[`&:hover .${h.focusHighlight}`]:{opacity:(t.vars||t).palette.action.hoverOpacity,"@media (hover: none)":{opacity:0}},[`&.${h.focusVisible} .${h.focusHighlight}`]:{opacity:(t.vars||t).palette.action.focusOpacity}})),pe=A("span",{name:"MuiCardActionArea",slot:"FocusHighlight",overridesResolver:(t,r)=>r.focusHighlight})(({theme:t})=>({overflow:"hidden",pointerEvents:"none",position:"absolute",top:0,right:0,bottom:0,left:0,borderRadius:"inherit",opacity:0,backgroundColor:"currentcolor",transition:t.transitions.create("opacity",{duration:t.transitions.duration.short})})),me=O.forwardRef(function(r,a){const s=Z({props:r,name:"MuiCardActionArea"}),{children:c,className:o,focusVisibleClassName:u}=s,m=W(s,ce),l=s,n=ue(l);return e.jsxs(de,z({className:v(n.root,o),focusVisibleClassName:v(u,n.focusVisible),ref:a,ownerState:l},m,{children:[c,e.jsx(pe,{className:n.focusHighlight,ownerState:l})]}))});var C={},fe=Y;Object.defineProperty(C,"__esModule",{value:!0});var I=C.default=void 0,xe=fe(J()),he=e;I=C.default=(0,xe.default)((0,he.jsx)("path",{d:"M10 6 8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"}),"NavigateNext");function g({asset:t,link:r,countSql:a,title:s}){return e.jsx(X,{sx:{width:"200px",maxWidth:"200px",height:"auto",backgroundColor:"transparent",borderColor:"transparent",boxShadow:"none"},children:e.jsxs(me,{onClick:()=>window.open(r),children:[e.jsx(re,{component:"img",sx:{height:150,width:"100%",paddingX:2,overflow:"visible"},image:t,alt:s}),e.jsxs(oe,{sx:{display:"flex",alignItems:"center",justifyContent:"center"},children:[e.jsx(b,{variant:"h6",sx:{marginRight:1,fontSize:"16px",fontWeight:900},children:a&&e.jsx(V,{parens:!1,query:{sql:a}})}),e.jsx(b,{variant:"body1",children:s}),e.jsx(se,{sx:{color:"primary.main"},children:e.jsx(I,{})})]})]})})}try{g.displayName="GoalsV2Desktop",g.__docgenInfo={description:"",displayName:"GoalsV2Desktop",props:{countSql:{defaultValue:null,description:"",name:"countSql",required:!1,type:{name:"string"}},title:{defaultValue:null,description:"",name:"title",required:!0,type:{name:"string"}},summary:{defaultValue:null,description:"",name:"summary",required:!0,type:{name:"string"}},link:{defaultValue:null,description:"",name:"link",required:!0,type:{name:"string"}},asset:{defaultValue:null,description:"",name:"asset",required:!0,type:{name:"string"}}}}}catch{}function y({link:t,summary:r,countSql:a,title:s}){const c=e.jsxs("div",{children:[a&&e.jsx("span",{children:e.jsx(V,{parens:!1,query:{sql:a}})}),e.jsxs("span",{children:[" ",s," "]})]}),o=e.jsxs("div",{children:[e.jsx("p",{children:r}),e.jsx(ne,{variant:"contained",color:"secondary",href:t,children:"Explore"})]});return e.jsx(ae,{title:c,content:o})}try{y.displayName="GoalsV2Mobile",y.__docgenInfo={description:"",displayName:"GoalsV2Mobile",props:{countSql:{defaultValue:null,description:"",name:"countSql",required:!1,type:{name:"string"}},title:{defaultValue:null,description:"",name:"title",required:!0,type:{name:"string"}},summary:{defaultValue:null,description:"",name:"summary",required:!0,type:{name:"string"}},link:{defaultValue:null,description:"",name:"link",required:!0,type:{name:"string"}},asset:{defaultValue:null,description:"",name:"asset",required:!0,type:{name:"string"}}}}}catch{}const ge=1200,q=t=>{const{entityId:r,dataLink:a}=t,s=P(ge),c={concreteType:"org.sagebionetworks.repo.model.table.QueryBundleRequest",entityId:r,partMask:H|U,query:{sql:`select * from ${r} order by ItemOrder`}},{data:o}=L(c),{assets:u,error:m}=Q(r,o),l=p("TableId",o),n=p("CountSql",o),N=p("Title",o),S=p("Summary",o),k=p("Link",o),E=(o==null?void 0:o.queryResult.queryResults.rows.map((d,f)=>{const i=d.values;i.some(D=>D===null)&&console.warn("Row has null value(s) when no nulls expected");const _=l>-1?i[l]:void 0;let x;n>-1&&i[n]?x=i[n]:_&&(x=`SELECT * FROM ${_}`);const w=i[N],M=i[S],B=i[k],G=(u==null?void 0:u[f])??"";return{countSql:x,title:w,summary:M,link:B,asset:G}}))??[],R=s?g:y;return e.jsxs(j,{sx:{minHeight:"560px",padding:{xs:"40px",lg:"80px"}},children:[e.jsx($,{centered:!0,title:"What's in the Portal?",buttonText:"Start Exploring Data",link:a,sx:d=>({h2:{borderColor:ie(d.palette.primary.main,.2)},a:{marginTop:"24px",marginBottom:"30px"}})}),m&&e.jsx(T,{error:m}),e.jsx("div",{className:"Goals",children:e.jsx(j,{sx:{display:"flex",justifyContent:"space-between",flexDirection:s?"row":"column"},children:E.map((d,f)=>e.jsx(R,{...d},f))})})]})};try{q.displayName="GoalsV2",q.__docgenInfo={description:"",displayName:"GoalsV2",props:{entityId:{defaultValue:null,description:"",name:"entityId",required:!0,type:{name:"string"}},dataLink:{defaultValue:null,description:"",name:"dataLink",required:!0,type:{name:"string"}}}}}catch{}export{q as G};
