import{j as t}from"./jsx-runtime-DoxjgJx5.js";import{r as f}from"./index-Cu9bd8lq.js";import{U as D,bl as I}from"./useFiles-DFdLn1TY.js";import{p as Q,g as te}from"./SqlFunctions-Drr0XsQh.js";import"./RegularExpressions-SKYrON-T.js";import{O as se,f as $}from"./SynapseConstants-binLeAzi.js";import{f as re,C as oe}from"./VerificationSubmission-DL9jxYsQ.js";import"./OrientationBanner-6TFYkqd5.js";import{c as ne,P as ie}from"./factory-DQ_FQLjW.js";import{d as A}from"./dayjs.min-D1RcYm3-.js";import{v as ae}from"./ConfirmationDialog-Gg6sPqgv.js";import{D as le,a as ue}from"./DialogContent-Bs2oSeTu.js";import{g as F}from"./UpsetPlot-6SE8P1Gh.js";import{B as g}from"./Box-CsPt-sI4.js";import{T as j}from"./Typography-D6GCV-CB.js";import"./LeftRightPanel-CqinvOCV.js";import{S as de}from"./TextField-CxQ_xk3E.js";import"./ActionRequiredCard-BZLM_Evk.js";import"./InputSizedButton-B5-0MGjd.js";import{I as ce}from"./InputLabel-RHZu0c3g.js";import{S as me}from"./TextField-BM400Yg9.js";import{M as pe}from"./MenuItem-D3tilmmv.js";import{S as E}from"./Skeleton-DxEJ6_Wp.js";const ve="species",he="observationphase",P={concreteType:"org.sagebionetworks.repo.model.table.QueryResultBundle",queryResult:{concreteType:"org.sagebionetworks.repo.model.table.QueryResult",queryResults:{concreteType:"org.sagebionetworks.repo.model.table.RowSet",tableId:"syn52408661",etag:"a3270cb2-4373-4e12-9981-e12326e54ad1",headers:[{name:"species",columnType:"STRING",id:"152514"},{name:"observationPhase",columnType:"STRING",id:"197976"},{name:"observationPhaseOrder",columnType:"INTEGER",id:"198102"},{name:"observationTimeMax",columnType:"INTEGER",id:"198103"},{name:"observationTimeUnits",columnType:"STRING",id:"198101"}],rows:[{rowId:9,versionNumber:4,values:["Danio rerio","embryo","1","7","days"]},{rowId:10,versionNumber:4,values:["Danio rerio","larval","2","3","months"]},{rowId:11,versionNumber:4,values:["Danio rerio","juvenile","3","6","months"]},{rowId:12,versionNumber:4,values:["Danio rerio","adult","4","12","months"]},{rowId:16,versionNumber:4,values:["Drosophila","embryo","1","24","hours"]},{rowId:17,versionNumber:4,values:["Drosophila","larval","2","5","days"]},{rowId:18,versionNumber:4,values:["Drosophila","pupal","3","12","days"]},{rowId:19,versionNumber:4,values:["Drosophila","adult","4","5","weeks"]},{rowId:1,versionNumber:4,values:["Mus musculus","prenatal","1","21","days"]},{rowId:2,versionNumber:4,values:["Mus musculus","postnatal","2","6","months"]},{rowId:20,versionNumber:4,values:["Rattus norvegicus","prenatal","1","23","days"]},{rowId:21,versionNumber:4,values:["Rattus norvegicus","neonatal","2","4","weeks"]},{rowId:22,versionNumber:4,values:["Rattus norvegicus","weanling","3","2","months"]},{rowId:23,versionNumber:4,values:["Rattus norvegicus","juvenile","4","3","months"]},{rowId:24,versionNumber:4,values:["Rattus norvegicus","adolescent","5","6","months"]},{rowId:25,versionNumber:4,values:["Rattus norvegicus","adult","6","12","months"]},{rowId:13,versionNumber:4,values:["Saccharomyces","log phase","1","7","days"]},{rowId:14,versionNumber:4,values:["Saccharomyces","stationary phase","2","2","weeks"]},{rowId:15,versionNumber:4,values:["Saccharomyces","death phase","3","3","weeks"]},{rowId:3,versionNumber:4,values:["Sus scrofa","prenatal","1","115","days"]},{rowId:4,versionNumber:4,values:["Sus scrofa","neonatal","2","3","months"]},{rowId:5,versionNumber:4,values:["Sus scrofa","weanling","3","6","months"]},{rowId:6,versionNumber:4,values:["Sus scrofa","juvenile","4","12","months"]},{rowId:7,versionNumber:4,values:["Sus scrofa","adolescent","5","2","years"]},{rowId:8,versionNumber:4,values:["Sus scrofa","adult","6","3","years"]}]}}};var B;const ye=(B=P.queryResult)==null?void 0:B.queryResults.headers.findIndex(e=>e.name.toLowerCase()===ve);var H;const O=(H=P.queryResult)==null?void 0:H.queryResults.headers.findIndex(e=>e.name.toLowerCase()===he),fe=ne(ie),ge=(e,s,a,c)=>{let i=-1;return{timepoints:s.map((n,r)=>{const o=parseFloat(n.values[a.observationTime]),u=n.values[a.observationTimeUnits];return n.rowId==c&&(i=r),e.add(o,u)}),hoverOverIndex:i}},M=e=>e.length==0?A().add(1,"days"):e.reduce((s,a)=>!s||a.isAfter(s)?a:s),xe=(e,s)=>{if(e.timepoints==null||e.timepoints.length==0)return[{x:[A().format()],y:[.5],mode:"lines",line:{color:"blue",width:2},customdata:[],hoverinfo:"none"}];const a=e.timepoints.reduce((i,l,n)=>{const r=i;return r[l.format()]||(r[l.format()]=[]),r[l.format()].push(s[n]),i},{});return e.timepoints.map((i,l)=>{const n=i.format(),r=l==e.hoverOverIndex,u=a[n].map(m=>m.rowId);return{x:[n,n,n],y:[0,.5,1],mode:"lines",line:{color:r?"black":"gray",width:r?2:1},customdata:[u,u,u],hoverinfo:"none"}})},be=(e,s,a,c,i,l)=>{const n=c.map(o=>o.x[0]),r=c.map(o=>{const u=o.customdata[0];if(u&&u.length>0){const m=u.length,p=i==null?void 0:i.filter(v=>u[0]==v.rowId);if(p&&p.length>0){const v=p[0],h=parseFloat(v.values[l.observationTime]),T=v.values[l.observationTimeUnits],d=m>1?`(${m})`:"";return`${h} ${T} ${d}`}}return""});return{hovermode:"closest",dragmode:!1,showlegend:!1,xaxis:{showgrid:!1,showticklabels:!0,showline:!1,zeroline:!1,tickvals:n,ticktext:r,tickangle:-45},yaxis:{range:[0,1.25],showgrid:!1,zeroline:!1,showline:!1,showticklabels:!1},shapes:[{type:"rect",x0:e.subtract(s.diff(e)/10).format(),x1:s.add(s.diff(e)/3).format(),y0:.25,y1:.75,fillcolor:a,opacity:.8,line:{width:0}}],margin:{l:0,r:0,t:60,b:60}}},q=({color:e,rowData:s,schema:a,widthPx:c,sql:i})=>{const[l,n]=f.useState(),[r,o]=f.useState(),[u,m]=f.useState(1),p=A(),v=f.useRef(null),h=l==null?void 0:l.points[0].customdata,T=s==null?void 0:s.filter(x=>h==null?void 0:h.includes(x.rowId)),d=r==null?void 0:r.points[0].customdata,N=f.useMemo(()=>ge(p,s,a,(d==null?void 0:d.length)>0?d[0]:void 0),[d,s,a,p]),y=M(N.timepoints),S=f.useMemo(()=>xe(N,s),[N,s]),R=T.map(x=>x.rowId);return t.jsxs("div",{ref:v,style:{width:c},children:[t.jsx(fe,{style:{width:c,height:"220px"},data:S,layout:be(p,y,e,S,s,a),config:{displayModeBar:!1},useResizeHandler:!0,onClick:x=>{n(x),o(void 0)},onDoubleClick:()=>{m(u+1)},onHover:x=>{o(x)},onUnhover:()=>{o(void 0)}},`Plot-${e}-${u}`),t.jsx(le,{onClose:()=>n(void 0),open:T&&T.length>0,children:t.jsx(ue,{children:t.jsx(ae,{topLevelEnumeratedFacetToFilter:{columnName:"observationType"},sql:i,searchParams:{ROW_ID:R.map(String).join(",")},sqlOperator:re.IN,lockedColumn:{columnName:"ROW_ID"},type:se,initialLimit:3})})})]})};try{M.displayName="getMaxDate",M.__docgenInfo={description:"",displayName:"getMaxDate",props:{}}}catch{}try{q.displayName="TimelinePhase",q.__docgenInfo={description:"",displayName:"TimelinePhase",props:{name:{defaultValue:null,description:"",name:"name",required:!0,type:{name:"string"}},color:{defaultValue:null,description:"",name:"color",required:!0,type:{name:"string"}},rowData:{defaultValue:null,description:"",name:"rowData",required:!0,type:{name:"Row[]"}},schema:{defaultValue:null,description:"",name:"schema",required:!0,type:{name:"ObservationCardSchema"}},widthPx:{defaultValue:null,description:"",name:"widthPx",required:!0,type:{name:"number"}},sql:{defaultValue:null,description:"",name:"sql",required:!0,type:{name:"string"}}}}}catch{}const C=({color:e,phaseName:s})=>t.jsxs(g,{sx:{display:"flex",alignItems:"center",gap:"7px"},children:[t.jsx(g,{sx:{backgroundColor:e,width:"20px",height:"20px"}}),t.jsx(j,{variant:"body1",children:s==null?void 0:s.toUpperCase()})]});try{C.displayName="TimelineLegendItem",C.__docgenInfo={description:"",displayName:"TimelineLegendItem",props:{color:{defaultValue:null,description:"",name:"color",required:!0,type:{name:"string"}},phaseName:{defaultValue:null,description:"",name:"phaseName",required:!0,type:{name:"string | null"}}}}}catch{}const L=({sql:e,additionalFilters:s,species:a,setSpecies:c})=>{var m,p;const i=Q(e),l=D({entityId:i,query:{sql:`SELECT distinct unnest(species) FROM ${i} WHERE species IS NOT NULL AND observationTime IS NOT NULL GROUP BY species`,additionalFilters:s},partMask:$,concreteType:"org.sagebionetworks.repo.model.table.QueryBundleRequest"}),{data:n,isLoading:r}=l,o=(p=(m=n==null?void 0:n.queryResult)==null?void 0:m.queryResults)==null?void 0:p.rows,u=o&&o.length>0?o[0].values[0]:void 0;return a==null&&u!=null&&c(u),r||!o||o.length<2?t.jsx(t.Fragment,{}):t.jsx(g,{children:t.jsxs(de,{children:[t.jsx(ce,{children:"Species"}),t.jsx(me,{sx:{marginLeft:"2px",marginBottom:"2px"},value:a,label:"Species",onChange:v=>{c(v.target.value)},children:o==null?void 0:o.map(v=>{const h=v.values[0];return t.jsx(pe,{value:h,children:h},h)})})]})})};try{L.displayName="TimelinePlotSpeciesSelector",L.__docgenInfo={description:"",displayName:"TimelinePlotSpeciesSelector",props:{sql:{defaultValue:null,description:"",name:"sql",required:!0,type:{name:"string"}},additionalFilters:{defaultValue:null,description:"",name:"additionalFilters",required:!1,type:{name:"QueryFilter[]"}},species:{defaultValue:null,description:"",name:"species",required:!1,type:{name:"string | null"}},setSpecies:{defaultValue:null,description:"",name:"setSpecies",required:!0,type:{name:"Dispatch<SetStateAction<string | null | undefined>>"}}}}}catch{}const Ie=e=>{const[s,a]=f.useState({width:1,height:2});return f.useEffect(()=>{const c=()=>{if(e.current){const i=e.current.getBoundingClientRect(),{width:l,height:n}=i,r=Math.round(l),o=Math.round(n);(s.width!=r||s.height!=o)&&a({width:r,height:o})}};return c(),window.addEventListener("resize",c),()=>{window.removeEventListener("resize",c)}},[s.height,s.width,e]),s},Te="observationphase",Ne="observationtime",_e="observationtimeunits",Se="observationsubmittername",we="observationtext",Re="observationtype",Ee="synapseid",Oe="doi",k=({sql:e,searchParams:s,sqlOperator:a,defaultSpecies:c,title:i,subTitle:l})=>{const n=Q(e),[r,o]=f.useState(c),u=f.createRef(),m=Ie(u),p=te(void 0,s,a)??[],v=r?{columnName:"species",concreteType:"org.sagebionetworks.repo.model.table.ColumnMultiValueFunctionQueryFilter",values:[r],function:oe.HAS}:void 0,h=[...p];v&&h.push(v);const T=D({entityId:n,query:{sql:`${e} WHERE observationTime IS NOT NULL`,sort:[{column:"observationTime",direction:"ASC"}],additionalFilters:h},partMask:$,concreteType:"org.sagebionetworks.repo.model.table.QueryBundleRequest"},{enabled:!!r}),{data:d,isLoading:N}=T,y=f.useMemo(()=>{var b;if(r)return(b=P.queryResult)==null?void 0:b.queryResults.rows.filter(_=>_.values[ye]==r)},[r]);if(N)return t.jsx(je,{});const S=I(Te,d),R=I(Ne,d),x=I(_e,d),G=I(Se,d),W=I(we,d),z=I(Oe,d),K=I(Re,d),Y=I(Ee,d),X={observationSubmitterName:G,synapseId:Y,observationType:K,observationText:W,observationTime:R,observationTimeUnits:x,doi:z},J=m.width&&y?m.width/y.length:0,Z=y==null?void 0:y.map(()=>"auto").join(" ");return t.jsxs(t.Fragment,{children:[r&&t.jsxs(t.Fragment,{children:[i&&t.jsx(j,{variant:"h2",children:i}),l&&t.jsx(j,{variant:"body1Italic",sx:{margin:"10px 0px"},children:l})]}),t.jsxs(g,{children:[t.jsxs(g,{sx:{display:"flex",justifyContent:"space-between"},children:[t.jsx(g,{children:!c&&t.jsx(L,{setSpecies:o,species:r,sql:e,additionalFilters:p})}),y&&t.jsx(g,{sx:{display:"flex",justifyContent:"flex-end",gap:"25px"},children:y.map((b,w)=>{const{colorPalette:_}=F(w,1);return t.jsx(C,{color:_[0],phaseName:b.values[O]},b.rowId)})})]}),r&&y&&t.jsx("div",{ref:u,children:t.jsx(g,{sx:{display:"inline-grid",gridTemplateColumns:Z,minWidth:m.width,maxWidth:m.width},className:"forcePlotlyDefaultCursor",children:y.map((b,w)=>{var V;const{colorPalette:_}=F(w,1),U=(V=d==null?void 0:d.queryResult)==null?void 0:V.queryResults.rows.filter(ee=>ee.values[S]==b.values[O]);return U?t.jsx(q,{name:b.values[O],color:_[0],rowData:U,schema:X,widthPx:J,sql:e},b.rowId):t.jsx(t.Fragment,{})})})})]})]})},je=()=>t.jsxs(g,{children:[t.jsxs(g,{sx:{display:"flex",justifyContent:"flex-end",gap:"10px"},children:[t.jsx(E,{height:"45px",width:"80px"}),t.jsx(E,{height:"45px",width:"80px"})]}),t.jsx(g,{sx:{display:"flex"},children:t.jsx(E,{height:"150px",width:"100%"})})]});try{k.displayName="TimelinePlot",k.__docgenInfo={description:"",displayName:"TimelinePlot",props:{sql:{defaultValue:null,description:"",name:"sql",required:!0,type:{name:"string"}},searchParams:{defaultValue:null,description:"",name:"searchParams",required:!1,type:{name:"Record<string, string>"}},sqlOperator:{defaultValue:null,description:"",name:"sqlOperator",required:!1,type:{name:"enum",value:[{value:'"LIKE"'},{value:'"EQUAL"'},{value:'"IN"'},{value:'"HAS"'},{value:'"HAS_LIKE"'}]}},title:{defaultValue:null,description:"",name:"title",required:!1,type:{name:"string"}},subTitle:{defaultValue:null,description:"",name:"subTitle",required:!1,type:{name:"string"}},defaultSpecies:{defaultValue:null,description:"",name:"defaultSpecies",required:!1,type:{name:"string"}}}}}catch{}export{k as T};
