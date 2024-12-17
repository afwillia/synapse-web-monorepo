import{j as e}from"./jsx-runtime-DoxjgJx5.js";import{r as u}from"./index-Cu9bd8lq.js";import{u as M}from"./utils-BECe8vEQ.js";import{u as B}from"./useMutation-BUHlmdy0.js";import{u as O}from"./useInfiniteQuery-DAY-6DSP.js";import{l as _,S as b,J as w,v as U}from"./useFiles-DFdLn1TY.js";import"./VerificationSubmission-DL9jxYsQ.js";import"./RegularExpressions-SKYrON-T.js";import{l as F}from"./LoadingScreen-Be03UZKS.js";import{d as P}from"./dayjs.min-D1RcYm3-.js";import{d as X}from"./DeleteTwoTone-Dtqgjh91.js";import{I as Y,A as J}from"./IconSvg-CesIlRas.js";import{W as H}from"./WarningDialog-CJhvw8gE.js";import{r as Z}from"./DownloadConfirmationUI-lzJj7LH5.js";import{C as $}from"./Card-C3hcFJq7.js";import{B as f}from"./Box-Bt_N9PQN.js";import{S as R}from"./Stack-BbdlCzXz.js";import{T as a}from"./Typography-D6GCV-CB.js";import{T as C}from"./Tooltip-CTVx2uGI.js";import{I as D}from"./IconButton-DhHKwBf8.js";import{n as A}from"./noop-DX6rZLP_.js";import{C as ee}from"./CopyToClipboardInput-BbFJ1wnv.js";import{C as oe}from"./ConfirmationDialog-Gg6sPqgv.js";import{T as ne}from"./TextField-CxQ_xk3E.js";import{F as T}from"./FormControlLabel-CARkfAdu.js";import{C as v}from"./Checkbox-BnrBea29.js";import{B as q}from"./Button-j3jTttn9.js";const h={openid:{displayName:"OpenID",description:"Access to your Synapse identity and certain user information"},view:{displayName:"View",description:"Permission to view the content which you can view"},modify:{displayName:"Modify",description:"Permission to modify the content which you can modify (create, change, delete)"},download:{displayName:"Download",description:"Permission to download the content which you can download"},authorize:{displayName:"Authorize",description:"Permission to authorize others to access the resources you control"},offline_access:{displayName:"Offline Access",description:"Permission to access the resources authorized here when you are not logged in, until you explicitly revoke access"},email:{displayName:"Email",description:"Permission to access the email address associated to your account"},profile:{displayName:"User Profile",description:"Permission to access your user profile information"}};function se(n){const{accessToken:o,keyFactory:i}=_();return O({...n,initialPageParam:void 0,queryKey:i.getPersonalAccessTokensQueryKey(),queryFn:async s=>await b.getPersonalAccessTokenRecords(o,s.pageParam),getNextPageParam:s=>s.nextPageToken})}function te(n){const{accessToken:o,keyFactory:i}=_(),s=M();return B({...n,onSuccess:async(...t)=>{await s.invalidateQueries({queryKey:i.getPersonalAccessTokensQueryKey()})},mutationFn:t=>b.createPersonalAccessToken(t,o)})}function ae(n){const{accessToken:o,keyFactory:i}=_(),s=M();return B({...n,onSuccess:async(...t)=>{n!=null&&n.onSuccess&&n.onSuccess(...t),await s.invalidateQueries({queryKey:i.getPersonalAccessTokensQueryKey()})},mutationFn:t=>b.deletePersonalAccessToken(t,o)})}P.extend(Z);const re="This token has expired. It no longer works and can only be deleted.";function N(n){const{accessToken:o,onDelete:i=A}=n,[s,t]=u.useState(!1),r=o.state==="EXPIRED",{mutate:l,isPending:p}=ae({onSuccess:()=>{i()},throwOnError:!0}),g=u.useCallback(()=>{r?l(o.id):t(!0)},[o.id,l,r]),d=e.jsx(H,{title:"Confirm Deletion",content:e.jsxs(e.Fragment,{children:[e.jsx(a,{variant:"body1",children:"If you delete this token, any applications using it will stop working. This action cannot be undone."}),e.jsx(a,{variant:"body1",fontWeight:"700",children:"Are you sure you want to delete this token?"})]}),confirmButtonText:"Delete Token",onCancel:()=>t(!1),onConfirm:()=>{l(o.id),t(!1)},confirmButtonColor:"error",open:s});return e.jsxs($,{sx:{my:2,height:"120px",width:"100%",p:1.5,pl:4,backgroundColor:r?"#fcf8e3":"inherit"},children:[d,e.jsxs(f,{display:"flex",alignItems:"center",justifyContent:"space-between",height:"100%",children:[e.jsxs(R,{flexGrow:1,gap:1,justifyContent:"space-between",children:[e.jsx(a,{variant:"headline3",sx:{fontSize:"16px"},children:o.name}),e.jsxs("div",{children:[e.jsx("span",{children:"Permissions: "}),o.scopes.map(c=>{let y=h[c];if(y===void 0){const j=c.charAt(0).toUpperCase()+c.slice(1);y={displayName:j,description:j}}return e.jsx(C,{title:y.description,children:e.jsx(a,{component:"span",variant:"smallText1",sx:{mx:.25,cursor:"default",color:"primary.main"},children:y.displayName})},c)})]}),e.jsxs("div",{children:[e.jsxs(a,{component:"span",variant:"smallText1",children:["Last used ",P(o.lastUsed).fromNow()]}),e.jsx(a,{component:"span",variant:"smallText1",color:"grey.700",children:" | "}),e.jsxs(a,{component:"span",variant:"smallText1",children:["Created ",P(o.createdOn).fromNow()]})]})]}),e.jsxs(f,{alignSelf:"flex-start",display:"flex",gap:1,alignItems:"center",children:[r&&e.jsx(C,{title:re,placement:"top",children:e.jsx(D,{children:e.jsx(Y,{icon:"warning",sx:{color:"warning.main",fontSize:"inherit"},wrap:!1})})}),e.jsx(C,{title:"Delete Token",placement:"top",children:e.jsx(D,{disabled:p,color:"error",onClick:g,children:e.jsx(X,{})})})]})]})]})}try{N.displayName="AccessTokenCard",N.__docgenInfo={description:"",displayName:"AccessTokenCard",props:{accessToken:{defaultValue:null,description:"Record referring to an access token, not a token itself",name:"accessToken",required:!0,type:{name:"AccessTokenRecord"}},onDelete:{defaultValue:null,description:"",name:"onDelete",required:!1,type:{name:"(() => void)"}}}}}catch{}const ie="You must provide a token name and at least one permission.";function S(n){const{onClose:o=A,onCreate:i=A}=n,[s,t]=u.useState(""),[r,l]=u.useState(!0),[p,g]=u.useState(!1),[d,c]=u.useState(!1),[k,y]=u.useState(null),{mutate:j,isPending:V,error:I,data:x}=te(),K=m=>{t(m.target.value)},Q=(m,G)=>!!m&&G.some(L=>L),W=()=>{if(Q(s,[r,p,d])){y(null);const m={scope:[],name:s};r&&m.scope.push("view"),p&&m.scope.push("download"),d&&m.scope.push("modify"),j(m),i()}else y(ie)},z=x?e.jsxs(e.Fragment,{children:[e.jsxs(a,{variant:"body1",children:[e.jsx(a,{variant:"body1",component:"span",fontWeight:700,children:"This token will not be able to be retrieved again."})," ","If needed, generate a new personal access token, and delete this one."]}),e.jsx("div",{children:e.jsx(ee,{value:x.token,inputWidth:"350px"})}),e.jsx(a,{variant:"body1",children:"This token grants access to your account functions and should be treated like a password."})]}):e.jsxs("div",{children:[e.jsx(ne,{autoFocus:!0,label:"Token Name",value:s,onChange:K,placeholder:"e.g. Synapse command line access on my laptop",sx:{mb:2}}),e.jsx(a,{variant:"label",children:"Token Permissions"}),e.jsxs(R,{gap:2,my:1,children:[e.jsxs("div",{children:[e.jsx(T,{control:e.jsx(v,{}),label:h.view.displayName,checked:r,onChange:()=>l(!r)}),e.jsxs(a,{variant:"smallText1",color:"grey.700",children:[h.view.description,". Required to use Synapse programmatic clients."]})]}),e.jsxs("div",{children:[e.jsx(T,{control:e.jsx(v,{}),label:h.download.displayName,checked:p,onChange:()=>g(!p)}),e.jsx(a,{variant:"smallText1",color:"grey.700",children:h.download.description})]}),e.jsxs("div",{children:[e.jsx(T,{control:e.jsx(v,{}),label:h.modify.displayName,checked:d,onChange:()=>c(!d)}),e.jsx(a,{variant:"smallText1",color:"grey.700",children:h.modify.description})]})]}),k&&e.jsx(w,{error:k}),I&&e.jsx(w,{error:I.reason})]});return e.jsx(oe,{open:!0,title:"Create New Personal Access Token",content:V?F:z,confirmButtonProps:{children:x?"Close":"Create Token",variant:x?"outlined":"contained"},hasCancelButton:!x,onCancel:o,onConfirm:x?()=>o():()=>{W()}})}try{S.displayName="CreateAccessTokenModal",S.__docgenInfo={description:"",displayName:"CreateAccessTokenModal",props:{onClose:{defaultValue:null,description:"",name:"onClose",required:!1,type:{name:"(() => void)"}},onCreate:{defaultValue:null,description:"",name:"onCreate",required:!1,type:{name:"(() => void)"}}}}}catch{}function E({title:n,body:o}){const[i,s]=u.useState(!1),{data:t,isLoading:r,error:l,fetchNextPage:p,hasNextPage:g}=se(),d=(t==null?void 0:t.pages.flatMap(c=>c.results))??[];return e.jsxs("div",{children:[e.jsxs(f,{display:"flex",gap:2,justifyContent:"space-between",children:[e.jsxs(f,{flexGrow:1,children:[e.jsx("h1",{children:n}),o]}),e.jsx(f,{flexShrink:0,alignSelf:"end",children:e.jsx(q,{variant:"contained",color:"primary",onClick:()=>s(!0),startIcon:e.jsx(J,{}),children:"Create New Token"})})]}),e.jsxs(U,{children:[i&&e.jsx(S,{onClose:()=>s(!1)}),e.jsxs("div",{children:[!r&&!l&&d.length===0&&e.jsx(a,{variant:"headline2",m:5,textAlign:"center",children:"You currently have no personal access tokens."}),e.jsxs(f,{maxWidth:"800px",mx:"auto",my:2.5,children:[d.map(c=>e.jsx(N,{accessToken:c},c.id)),r&&F,!r&&g&&!l&&e.jsx(f,{display:"flex",justifyContent:"flex-end",children:e.jsx(q,{variant:"contained",color:"primary",onClick:()=>{p()},children:"Load More"})})]}),l&&e.jsx(w,{error:l})]})]})]})}try{E.displayName="AccessTokenPage",E.__docgenInfo={description:"",displayName:"AccessTokenPage",props:{title:{defaultValue:null,description:"",name:"title",required:!0,type:{name:"string"}},body:{defaultValue:null,description:"",name:"body",required:!0,type:{name:"ReactNode"}}}}}catch{}export{E as A};
