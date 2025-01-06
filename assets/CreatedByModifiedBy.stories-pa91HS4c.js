import{j as t}from"./jsx-runtime-Du8NFWEI.js";import{u as R}from"./SynapseConstants-BdJ0_Agj.js";import{aN as W}from"./useFiles-P9vMo4Jf.js";import"./VerificationSubmission-DL9jxYsQ.js";import{q as y,e as V,g as G,l as P}from"./RegularExpressions-C8kNf9Fd.js";import"./index-Dl6G-zuu.js";import"./OrientationBanner-xckBiTXb.js";import{a as Q}from"./useEntity-BzvOK3Vu.js";import{f as u}from"./DateFormatter-Dy7HcPFD.js";import{C as w}from"./ConditionalWrapper-Be926PbJ.js";import{d as f}from"./dayjs.min-d18Up55D.js";import{U as _}from"./UserBadge-cSen5h2E.js";import{B as K}from"./Box-CaFleW7-.js";import{B as z}from"./Breadcrumbs-uCeDhyA5.js";import{S as N}from"./Skeleton-CW6YXi1_.js";import{T as n}from"./Typography-DrqHmlDD.js";import{T as x}from"./Tooltip-BX9BRJvv.js";import{I as b}from"./InfoTwoTone-D-FIW5gs.js";import{u as H}from"./utils-BNvIpMjh.js";import{u as J}from"./useMediaQuery-DfCTVEwh.js";import"./useQuery-6SsvXKRa.js";import"./utils-Bx1BRerw.js";import"./tinycolor-Begke6kS.js";import"./createSvgIcon-CLD93Ce9.js";import"./createTheme-C4MKIpuQ.js";import"./index-GEGPABih.js";import"./styled-BwKg_4wT.js";import"./CheckCircleTwoTone-DTl0gYtq.js";import"./calculateFriendlyFileSize-B85TBsSb.js";import"./inputBaseClasses-u7jm9M-e.js";import"./Fade-Bx5Dq3o-.js";import"./useForkRef-CEBgoE3Z.js";import"./index-CarQ_cRE.js";import"./TransitionGroupContext-TdpM2qIg.js";import"./FullWidthAlert-RKqMk4_D.js";import"./spreadSx-CwcO6WA9.js";import"./Alert-CduaGk2B.js";import"./mergeSlotProps-BB45Ai_O.js";import"./isHostComponent-DVu5iVWx.js";import"./Paper-BrACm7G9.js";import"./IconButton-BIc9jQ57.js";import"./ButtonBase-6jsyScMO.js";import"./useIsFocusVisible-ByxglBfx.js";import"./Stack-DTWuWz9s.js";import"./AlertTitle-G3es5_Tb.js";import"./Grow-oX21w_XJ.js";import"./index-DJkgPHwn.js";import"./ClickAwayListener-D7YV5tOA.js";import"./ownerDocument-DW-IO8s5.js";import"./Button-DtfaTZY_.js";import"./Link-DxNs_73S.js";import"./cloneDeep-y9HxS-ZC.js";import"./_initCloneObject-CKp18hZk.js";import"./_baseTimes-36S_kd0L.js";import"./isArray-ggc3KxVp.js";import"./StringUtils-CZRvTQUP.js";import"./index-D9sWyi8_.js";import"./merge-DLQdEICg.js";import"./identity-DKeuBCMA.js";import"./useQueries-CrJ5bZfl.js";import"./useMutation-DjwfMZ6R.js";import"./useInfiniteQuery-Bs9yokNU.js";import"./omitBy-w2l-sioL.js";import"./_baseIndexOf-DlmoT9Yo.js";import"./toInteger-czOlq-ma.js";import"./isSymbol-BzKS7Qf1.js";import"./toString-CYyvKWOl.js";import"./_baseIteratee-BkvOliVA.js";import"./hasIn-BKZGDBi1.js";import"./pick-gVepvN2F.js";import"./_baseSlice-F8doVSIJ.js";import"./QueryFilterUtils-Djl6eBNu.js";import"./isNumber-BM-UBS4N.js";import"./InfiniteQueryUtils-CKlRW-xB.js";import"./timezone-Cq1SAuLw.js";import"./Popover-Dpp8g4Iu.js";import"./Modal-DRBkIs4b.js";import"./Backdrop-Bb0X61JD.js";import"./getScrollbarSize-Bqq2hMjQ.js";import"./ownerWindow-BN2rbQ_G.js";import"./createChainedFunction-BO_9K8Jh.js";import"./IconSvg-DrZNoLhB.js";import"./LayersTwoTone-Be5uNxsz.js";import"./ErrorOutlined-qWluJVEZ.js";import"./GetAppTwoTone-BARpdX8y.js";import"./InfoOutlined-CgkZO6RQ.js";import"./DeleteTwoTone-DDTGJUFj.js";import"./SkeletonTable-DaoaRpY-.js";import"./times-Bw9geEsI.js";import"./ToastMessage-DXUykkkh.js";import"./CSSTransition-DjYTukDI.js";import"./hasClass-D5ZjVvBY.js";import"./uniqueId-CSw6ftlJ.js";import"./Menu-tKUPxfG6.js";import"./MenuList-CQMQk4tL.js";import"./List-nAK0nmZc.js";import"./Divider-uKYf26yp.js";import"./dividerClasses-CxO2LWOw.js";import"./MenuItem-BF-m1c73.js";import"./Card-J02zcsj3.js";import"./Avatar-BXRn3zVs.js";import"./useControlled-1Y2rT-1r.js";import"./useId-BkqTTtmk.js";function X(){const o=H();return J(o.breakpoints.down("sm"))?null:t.jsx(n,{variant:"breadcrumb1",sx:{color:"grey.700"},children:"/"})}function g(o){var S;const{entityId:i,versionNumber:d}=o,s=`${i}${d?`.${d}`:""}`,{data:r}=Q(i,d),{data:c}=W({entityId:i,query:{sql:`SELECT * FROM ${s} LIMIT 0`},partMask:R,concreteType:"org.sagebionetworks.repo.model.table.QueryBundleRequest"},{enabled:!!(r&&y(r))}),T=(S=c==null?void 0:c.responseBody)==null?void 0:S.lastUpdatedOn,e=r?V(G(r.concreteType)):"",k="This is the user who created this Dataset. This may not be the same person who generated the files in this Dataset, or who originally uploaded these files to Synapse.",q=t.jsxs(t.Fragment,{children:[t.jsxs("p",{children:["This is when the configuration of this ",e," was last changed."]}),t.jsx("p",{children:"Configuration changes may be triggered by (for example):"}),t.jsxs("ul",{children:[t.jsxs("li",{children:["Editing the name of the ",e]}),t.jsxs("li",{children:["Updating the schema used by the ",e]})]}),t.jsxs("p",{children:["This does NOT reflect changes to the data displayed in the the"," ",e,"."]})]}),A=`This is when the configuration of this ${e} was last changed.`,F=`When data changes, the ${e} is rebuilt to reflect those changes. This is the last time changes were made to the data.`,j=`${s}-createdByTooltip`,B=`${s}-modifiedByTooltip`,I=`${s}-lastUpdatedTooltip`,l={width:"16px",height:"16px",ml:"4px",verticalAlign:"text-bottom"};return t.jsx(K,{sx:h=>({bgcolor:"grey.100",py:"10px",[h.breakpoints.down("sm")]:{p:"24px 40px"}}),children:t.jsxs(z,{separator:t.jsx(X,{}),sx:h=>({"& .MuiBreadcrumbs-ol":{justifyContent:"center",[h.breakpoints.down("sm")]:{gap:"4px"}}}),children:[t.jsx(w,{condition:!r,wrapper:N,children:t.jsxs(n,{sx:{color:"grey.700"},variant:"breadcrumb1","aria-describedby":j,children:[e," created by ",t.jsx(_,{userId:r==null?void 0:r.createdBy})," ","on ",u(f(r==null?void 0:r.createdOn)),r&&P(r)&&t.jsx(x,{id:j,title:k,children:t.jsx(b,{sx:l})})]})}),t.jsx(w,{condition:!r,wrapper:N,children:t.jsxs(n,{sx:{color:"grey.700"},variant:"breadcrumb1","aria-describedby":B,children:[r&&y(r)?"Configuration":e," last modified by ",t.jsx(_,{userId:r==null?void 0:r.modifiedBy})," on"," ",u(f(r==null?void 0:r.modifiedOn)),r&&y(r)&&t.jsx(x,{id:B,title:q,"aria-label":A,children:t.jsx(b,{sx:l})})]})}),T&&t.jsxs(n,{sx:{color:"grey.700"},variant:"breadcrumb1","aria-describedby":I,children:[e," last rebuilt on ",u(f(T)),t.jsx(x,{title:F,id:I,children:t.jsx(b,{sx:l})})]})]})})}try{g.displayName="CreatedByModifiedBy",g.__docgenInfo={description:"",displayName:"CreatedByModifiedBy",props:{entityId:{defaultValue:null,description:"",name:"entityId",required:!0,type:{name:"string"}},versionNumber:{defaultValue:null,description:"",name:"versionNumber",required:!1,type:{name:"number"}}}}}catch{}const Kr={title:"Synapse/EntityPage/CreatedByModifiedBy",component:g},a={args:{entityId:"syn36695878",versionNumber:1}},p={args:{entityId:"syn35197546"}},m={args:{entityId:"syn26302617"}};var M,v,C;a.parameters={...a.parameters,docs:{...(M=a.parameters)==null?void 0:M.docs,source:{originalSource:`{
  args: {
    entityId: 'syn36695878',
    versionNumber: 1
  }
}`,...(C=(v=a.parameters)==null?void 0:v.docs)==null?void 0:C.source}}};var E,D,O;p.parameters={...p.parameters,docs:{...(E=p.parameters)==null?void 0:E.docs,source:{originalSource:`{
  args: {
    entityId: 'syn35197546'
  }
}`,...(O=(D=p.parameters)==null?void 0:D.docs)==null?void 0:O.source}}};var U,$,L;m.parameters={...m.parameters,docs:{...(U=m.parameters)==null?void 0:U.docs,source:{originalSource:`{
  args: {
    entityId: 'syn26302617'
  }
}`,...(L=($=m.parameters)==null?void 0:$.docs)==null?void 0:L.source}}};const zr=["File","Table","Dataset"];export{m as Dataset,a as File,p as Table,zr as __namedExportsOrder,Kr as default};
