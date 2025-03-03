import{j as e}from"./jsx-runtime-Du8NFWEI.js";import{l as M,o as U,J as w,Q as i}from"./useFiles-BCjzBg19.js";import{i as Y,g as b}from"./SynapseConstants-B7WMEsjp.js";import{r as y}from"./index-Dl6G-zuu.js";import"./VerificationSubmission-BmZsZ0JS.js";import"./StringUtils-DFpF2_59.js";import"./OrientationBanner-D-CGIdAn.js";import{d as B}from"./dayjs.min-d18Up55D.js";import{f as Q}from"./DateFormatter-BMyRxqo_.js";import{S as $}from"./ShowMore-CuqZdAPw.js";function _({id:t,name:c,description:d,type:u,toolDetailPageURL:l,date:o,url:m,...n}){return e.jsxs("div",{...n,className:`cardContainer FeaturedToolCard ${n.className??""}`,children:[e.jsx("div",{className:"FeaturedToolCard__Type",children:e.jsx("span",{className:"SRC-tag",children:u})}),o&&e.jsx("div",{className:"FeaturedToolCard__Date",children:Q(B(parseInt(o)),"MMMM YYYY")}),e.jsx("div",{className:"FeaturedToolCard__Name",children:c}),e.jsx("div",{className:"FeaturedToolCard__Description",children:e.jsx($,{summary:d})}),e.jsx("a",{className:"FeaturedToolCard__Link",href:l?`${l}${t}`:m,children:"View Tool"})]})}try{_.displayName="FeaturedToolCard",_.__docgenInfo={description:"",displayName:"FeaturedToolCard",props:{id:{defaultValue:null,description:"",name:"id",required:!1,type:{name:"string"}},name:{defaultValue:null,description:"",name:"name",required:!0,type:{name:"string"}},description:{defaultValue:null,description:"",name:"description",required:!0,type:{name:"string"}},type:{defaultValue:null,description:"",name:"type",required:!0,type:{name:"string"}},date:{defaultValue:null,description:"",name:"date",required:!1,type:{name:"string"}},toolDetailPageURL:{defaultValue:null,description:"",name:"toolDetailPageURL",required:!1,type:{name:"string"}},url:{defaultValue:null,description:"",name:"url",required:!1,type:{name:"string"}}}}}catch{}function q({entityId:t,toolDetailPageURL:c,toolURLColumnName:d,idColumnName:u="id",nameColumnName:l="name",descriptionColumnName:o="description",typeColumnName:m="type",dateColumnName:n,filterClause:x}){const N=`SELECT * FROM ${t} ${x} LIMIT 3`,v={concreteType:"org.sagebionetworks.repo.model.table.QueryBundleRequest",entityId:t,partMask:Y|b,query:{sql:N}},{accessToken:V}=M(),[h,F]=y.useState([]),[g,L]=y.useState(),{data:a,error:f}=U(v);return y.useEffect(()=>{(()=>{try{const p=i(u,a),R=i(l,a),E=i(m,a),j=i(o,a),S=i(n,a),D=i(d,a),C=(a==null?void 0:a.queryResult.queryResults.rows.map(T=>{T.values.some(I=>I===null)&&console.warn("Row has null value(s)");const s=T.values;return{name:s[R],description:s[j],type:s[E],id:s[p],date:n?s[S]:void 0,url:d?s[D]:void 0}}))??[];if(f)throw f;if(C.length===0)return;F(C)}catch(p){console.error(p),L(p)}})()},[t,V,a,f,u,l,m,o,n]),g?e.jsx(w,{error:g}):e.jsx("div",{className:"FeaturedToolList",children:h.map(r=>e.jsx(_,{name:r.name,type:r.type,description:r.description,id:r.id,date:r.date,toolDetailPageURL:c,url:r.url},r.id))})}try{q.displayName="FeaturedToolsList",q.__docgenInfo={description:`Display a set of FeaturedToolCards (driven by a Table/View). Driven by the following annotations/column names:
'id', 'name', 'type', and 'description'.`,displayName:"FeaturedToolsList",props:{entityId:{defaultValue:null,description:"",name:"entityId",required:!0,type:{name:"string"}},idColumnName:{defaultValue:{value:"id"},description:"",name:"idColumnName",required:!1,type:{name:"string"}},nameColumnName:{defaultValue:{value:"name"},description:"",name:"nameColumnName",required:!1,type:{name:"string"}},descriptionColumnName:{defaultValue:{value:"description"},description:"",name:"descriptionColumnName",required:!1,type:{name:"string"}},typeColumnName:{defaultValue:{value:"type"},description:"",name:"typeColumnName",required:!1,type:{name:"string"}},dateColumnName:{defaultValue:null,description:"",name:"dateColumnName",required:!1,type:{name:"string"}},filterClause:{defaultValue:null,description:"",name:"filterClause",required:!0,type:{name:"string"}},toolDetailPageURL:{defaultValue:null,description:"",name:"toolDetailPageURL",required:!1,type:{name:"string"}},toolURLColumnName:{defaultValue:null,description:"",name:"toolURLColumnName",required:!1,type:{name:"string"}}}}}catch{}export{q as F};
