import{j as e}from"./jsx-runtime-Du8NFWEI.js";import{r as j}from"./index-Dl6G-zuu.js";import{p as L,g as V}from"./SqlFunctions-C2xMGs4N.js";import{l as k,S as C}from"./useFiles-BCjzBg19.js";import{g as F}from"./SynapseConstants-B7WMEsjp.js";import"./StringUtils-DFpF2_59.js";import{u as D}from"./use-deep-compare-effect.esm-COSQ_O61.js";import{g as u}from"./VerificationSubmission-BmZsZ0JS.js";import"./OrientationBanner-D-CGIdAn.js";import{M as N}from"./ConfirmationDialog-CMzsAtxl.js";import{S as M}from"./SkeletonTable-N_Br8t00.js";import{T as A}from"./Typography-DrqHmlDD.js";const K=[u.BOOLEAN_LIST,u.DATE_LIST,u.ENTITYID_LIST,u.INTEGER_LIST,u.STRING_LIST];function b({sql:d,searchParams:g,sqlOperator:_,isMarkdown:c=!1,columnLink:l,friendlyValuesMap:R,columnNameIsSectionTitle:h=!1,limit:E,additionalFiltersSessionStorageKey:q}){const{accessToken:T}=k(),[o,I]=j.useState(),[x,w]=j.useState();D(()=>{(async function(){var r;w(!0);const n=L(d),m=V(q,g,_),i={partMask:F,concreteType:"org.sagebionetworks.repo.model.table.QueryBundleRequest",entityId:n,query:{sql:d,limit:E,additionalFilters:m}},t=await C.getQueryTableResults(i,T);w(!1);const s=(r=t==null?void 0:t.queryResult)==null?void 0:r.queryResults;s?I(s):console.log("SubsectionRowRenderer: Error getting data")})()},[d,T,g,_]);const p=a=>{if(!R)return a;const n=R[a];return n||a};return e.jsxs("div",{className:"SubsectionRowRenderer",children:[x&&e.jsx(M,{numRows:2,numCols:1}),!x&&o&&o.rows.length>0&&o.headers.map((a,n)=>l&&a.name==l.linkColumnName?e.jsx(e.Fragment,{}):e.jsxs("div",{className:"SubsectionRowRenderer__item",role:"table",children:[e.jsx(A,{variant:h?"sectionTitle":"subsectionHeader",role:"heading",style:{paddingTop:"10px",marginBottom:"5px"},children:a.name}),h&&e.jsx("hr",{}),e.jsx("div",{role:"rowgroup",children:o.rows.map((m,f)=>{const i=m.values[n];if(!i)return e.jsx(e.Fragment,{});let t;if(K.includes(a.columnType))t=JSON.parse(i).map((r,S)=>e.jsxs("div",{className:"SubsectionRowRenderer__item__value",role:"row",children:[c&&e.jsx(N,{markdown:p(r)}),!c&&e.jsx("p",{children:p(r)})]},`row-${f}-col-${n}-multi-value`));else{let s;const r=p(i);if(c)s=e.jsx(N,{markdown:r});else if(l&&l.matchColumnName==a.name){const S=o.headers.findIndex(y=>y.name==l.linkColumnName),v=m.values;v.some(y=>y===null)&&console.warn("Row has null value(s) when no nulls expected"),S>-1?s=e.jsx("a",{rel:"noopener noreferrer",target:"_blank",href:v[S],children:r}):s=e.jsx("p",{children:r})}else s=e.jsx("p",{children:r});t=e.jsx("div",{className:"SubsectionRowRenderer__item__value",role:"row",children:s},`row-${f}-col-${n}-single`)}return t})})]},`header-${n}`))]})}try{b.displayName="SubsectionRowRenderer",b.__docgenInfo={description:"",displayName:"SubsectionRowRenderer",props:{sql:{defaultValue:null,description:"",name:"sql",required:!0,type:{name:"string"}},isMarkdown:{defaultValue:{value:"false"},description:"",name:"isMarkdown",required:!1,type:{name:"boolean"}},sqlOperator:{defaultValue:null,description:"",name:"sqlOperator",required:!1,type:{name:"enum",value:[{value:'"LIKE"'},{value:'"EQUAL"'},{value:'"IN"'},{value:'"HAS"'},{value:'"HAS_LIKE"'}]}},searchParams:{defaultValue:null,description:"",name:"searchParams",required:!1,type:{name:"Record<string, string>"}},columnLink:{defaultValue:null,description:"",name:"columnLink",required:!1,type:{name:"ColumnSpecifiedLink"}},friendlyValuesMap:{defaultValue:null,description:"",name:"friendlyValuesMap",required:!1,type:{name:"FriendlyValuesMap"}},columnNameIsSectionTitle:{defaultValue:{value:"false"},description:"",name:"columnNameIsSectionTitle",required:!1,type:{name:"boolean"}},limit:{defaultValue:null,description:"",name:"limit",required:!1,type:{name:"number"}},additionalFiltersSessionStorageKey:{defaultValue:null,description:"",name:"additionalFiltersSessionStorageKey",required:!1,type:{name:"string"}}}}}catch{}export{b as S};
