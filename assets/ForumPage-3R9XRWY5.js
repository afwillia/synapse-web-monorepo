import{j as r}from"./jsx-runtime-Du8NFWEI.js";import{r as o}from"./index-Dl6G-zuu.js";import{N as M,q as w}from"./useFiles-BCjzBg19.js";import{r as m,q as j,s as E}from"./VerificationSubmission-BmZsZ0JS.js";import"./StringUtils-DFpF2_59.js";import{k as F,S as L}from"./SynapseConstants-B7WMEsjp.js";import"./OrientationBanner-D-CGIdAn.js";import{u as R,a as A}from"./useForum-C1kZcNko.js";import{a as O}from"./useSubscription-xIfsZ8KT.js";import{d as V}from"./ToastMessage-2SG7nV1p.js";import{d as k}from"./dayjs.min-d18Up55D.js";import{I as U}from"./IconSvg-Cjnv710K.js";import{U as q,a as z}from"./UserBadge-WTkox1C4.js";import{u as B,g as P,S as H,C as l,c as G}from"./StyledTanStackTable-ciPkQpmn.js";import{B as S}from"./Button-DtfaTZY_.js";import{L as Y}from"./Link-DxNs_73S.js";import{F as X}from"./ForumThreadEditor-D9bnNXyz.js";import{S as W}from"./SubscribersModal-DgJcYtpw.js";import{C as J}from"./ConfirmationDialog-CMzsAtxl.js";import{T as K}from"./Typography-DrqHmlDD.js";const d=G();function Q(t){return[d.accessor("title",{header:e=>r.jsx(l,{...e,title:"Topic"}),cell:({row:e})=>r.jsxs(Y,{onClick:()=>t(e.original.id),children:[e.original.isPinned?r.jsx(U,{icon:"pushpin"}):r.jsx(r.Fragment,{}),e.original.title]}),enableSorting:!0,size:250}),d.accessor("createdBy",{header:e=>r.jsx(l,{...e,title:"Author"}),cell:({getValue:e})=>r.jsx(q,{userId:e()}),enableSorting:!1,size:60}),d.accessor("activeAuthors",{header:e=>r.jsx(l,{...e,title:"Active Users"}),cell:({getValue:e})=>e().map(i=>r.jsx("div",{className:"avatarContainer",children:r.jsx(z,{showCardOnHover:!0,className:"ActiveUsers",size:F,avatarSize:"MEDIUM",ownerId:i})},i)),enableSorting:!1}),d.accessor("numberOfReplies",{header:e=>r.jsx(l,{...e,title:"Replies"}),cell:({getValue:e})=>e().toLocaleString(),enableSorting:!0,minSize:10,size:20}),d.accessor("numberOfViews",{header:e=>r.jsx(l,{...e,title:"Views"}),cell:({getValue:e})=>e().toLocaleString(),enableSorting:!0,minSize:10,size:20}),d.accessor("lastActivity",{header:e=>r.jsx(l,{...e,title:"Activity"}),cell:({getValue:e})=>k(e()).format("L"),enableSorting:!0,size:30})]}function g({forumId:t,limit:e,filter:i,onClickLink:p}){var h;const[a,T]=o.useState([{desc:!0,id:"lastActivity"}]),c=o.useMemo(()=>{if(!M(a)){if(a[0].id=="lastActivity")return m.PINNED_AND_LAST_ACTIVITY;if(a[0].id=="numberOfReplies")return m.NUMBER_OF_REPLIES;if(a[0].id=="title")return m.THREAD_TITLE;if(a[0].id=="numberOfViews")return m.NUMBER_OF_VIEWS}return m.PINNED_AND_LAST_ACTIVITY},[a]),{data:s,hasNextPage:b,fetchNextPage:_}=R(t,e,c,!((h=a[0])!=null&&h.desc),i),y=o.useMemo(()=>(s==null?void 0:s.pages.flatMap(u=>u.results))??[],[s]),f=o.useMemo(()=>Q(p),[p]),x=B({data:y,columns:f,state:{sorting:a},onSortingChange:T,getRowId:u=>u.id,getCoreRowModel:P(),columnResizeMode:"onChange",manualSorting:!0,enableMultiSort:!1,enableFilters:!1});return r.jsxs("div",{className:"ForumTable",children:[r.jsx(H,{table:x,styledTableContainerProps:{sx:{my:2,maxHeight:"250px"}}}),b&&r.jsx(S,{variant:"outlined",color:"primary",onClick:()=>{_()},children:"Show more results"})]})}try{g.displayName="ForumTable",g.__docgenInfo={description:"",displayName:"ForumTable",props:{forumId:{defaultValue:null,description:"",name:"forumId",required:!0,type:{name:"string"}},limit:{defaultValue:null,description:"",name:"limit",required:!0,type:{name:"number"}},onClickLink:{defaultValue:null,description:"",name:"onClickLink",required:!0,type:{name:"(threadId: string) => void"}},filter:{defaultValue:null,description:"",name:"filter",required:!0,type:{name:"enum",value:[{value:'"NO_FILTER"'},{value:'"DELETED_ONLY"'},{value:'"EXCLUDE_DELETED"'}]}}}}}catch{}const Z="You will need to sign in for access to that resource";function N({forumId:t,limit:e,onClickLink:i}){const[p,a]=o.useState(!1),[T,c]=o.useState(!1),[s,b]=o.useState(!1),[_,y]=o.useState(!1),{subscription:f,isLoading:x,toggleSubscribed:h}=O(t,j.FORUM);function u(){try{h()}catch(D){V(D.reason,"danger")}}const{data:C}=A(t),{data:n}=w(),I=C==null?void 0:C.results.includes((n==null?void 0:n.ownerId)??""),v=()=>{(n==null?void 0:n.userName)=="anonymous"?c(!0):a(!0)};return r.jsxs("div",{className:"ForumTable",children:[r.jsxs("div",{className:"ForumTable__top-level-control",children:[r.jsx(W,{id:t,objectType:j.FORUM,showModal:_,handleModal:y}),r.jsx(S,{variant:f?"outlined":"contained",color:"primary",onClick:()=>u(),disabled:x,children:f?"Unfollow":"Follow"}),r.jsx(S,{variant:"contained",color:"primary",onClick:()=>v(),children:"New Thread"}),I&&r.jsx(S,{variant:"contained",color:"primary",onClick:()=>b(!s),children:s?"Hide Deleted Threads":"Show Deleted Threads"})]}),s&&r.jsxs(r.Fragment,{children:[r.jsx(K,{variant:"h4",children:"Deleted Threads"}),r.jsx(g,{onClickLink:i,forumId:t,limit:e,filter:E.DELETED_ONLY})]}),r.jsx(g,{onClickLink:i,forumId:t,limit:e,filter:E.EXCLUDE_DELETED}),r.jsx(X,{isReply:!1,id:t,onClose:()=>a(!1),isDialog:!0,openDialog:p}),r.jsx(J,{open:T,title:"Sign In Required",content:Z,onCancel:()=>c(!1),hasCancelButton:!1,onConfirm:()=>c(!1),confirmButtonProps:{children:"Sign In",className:L}})]})}try{N.displayName="ForumPage",N.__docgenInfo={description:"",displayName:"ForumPage",props:{forumId:{defaultValue:null,description:"",name:"forumId",required:!0,type:{name:"string"}},limit:{defaultValue:null,description:"",name:"limit",required:!0,type:{name:"number"}},onClickLink:{defaultValue:null,description:"",name:"onClickLink",required:!0,type:{name:"(threadId: string) => void"}}}}}catch{}export{N as F};
