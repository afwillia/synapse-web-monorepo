import{j as e}from"./jsx-runtime-DoxjgJx5.js";import{r as f}from"./index-Cu9bd8lq.js";import{T as u}from"./SynapseTableConstants-2qH3fDlQ.js";import{l as h,G as w}from"./useFiles-DFdLn1TY.js";import{u as x}from"./useDownloadList-fY9buaNZ.js";import{I as g}from"./IconSvg-CesIlRas.js";import{L as y}from"./index-DQUvFaS1.js";import{L as j}from"./Link-DPsc3TBb.js";import{T as L}from"./Tooltip-CTVx2uGI.js";function l({to:a,className:c=""}){const{accessToken:o}=h(),s=w(),m="Click to view items in your download cart.",{data:t,isLoading:d,isError:n,error:r}=x();if(f.useEffect(()=>{n&&r&&o&&s(r)},[n,r,s,o]),!o||d)return e.jsx(e.Fragment,{});const i=(t==null?void 0:t.totalNumberOfFiles)??0;if(i===0)return e.jsx(e.Fragment,{});const p=e.jsx(L,{title:m,placement:"bottom",enterNextDelay:u,children:e.jsxs("span",{children:[e.jsx("span",{className:"SRC-primary-text-color",children:e.jsx(g,{icon:"cart"})}),e.jsx("span",{className:"download-cart-size",children:i})]})});return e.jsx(j,{to:a,component:y,className:`Download-Link v2 ${c}`,children:p})}try{l.displayName="ShowDownloadV2",l.__docgenInfo={description:`Nav bar item, displayed when files have been added to the Download Cart.
This must be configured with the URL of a page dedicated to showing the Download Cart.`,displayName:"ShowDownloadV2",props:{to:{defaultValue:null,description:"",name:"to",required:!0,type:{name:"string"}},className:{defaultValue:{value:""},description:"",name:"className",required:!1,type:{name:"string"}}}}}catch{}export{l as S};
