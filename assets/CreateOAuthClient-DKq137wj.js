import{j as t}from"./jsx-runtime-DoxjgJx5.js";import{r as u}from"./index-Cu9bd8lq.js";import{l as v,S as he}from"./useFiles-CppbjU7S.js";import"./OrientationBanner-DAlOe-D5.js";import{u as fe}from"./UserSearchBoxV2-y9OZFgpe.js";import"./VerificationSubmission-DL9jxYsQ.js";import"./RegularExpressions-SKYrON-T.js";import{u as k}from"./utils-BECe8vEQ.js";import{u as W}from"./useMutation-BUHlmdy0.js";import{u as ye}from"./useInfiniteQuery-DlMEkiEm.js";import{d as x}from"./ToastMessage-BeCqyzkW.js";import{W as ge}from"./WarningDialog-sRSvCqEX.js";import{d as Y}from"./DeleteTwoTone-Dtqgjh91.js";import{S as Ce}from"./LoadingScreen-Be03UZKS.js";import{C as xe}from"./ConfirmationDialog-BLk3tkY6.js";import{T as y}from"./TextField-BM400Yg9.js";import{I as Se}from"./InputAdornment-CMpygKTp.js";import{I as ve}from"./IconButton-DhHKwBf8.js";import{B as z}from"./Button-j3jTttn9.js";import{T as A}from"./Typography-D6GCV-CB.js";import{G as l}from"./Grid-zRSXpTvc.js";import{M as Z}from"./MenuItem-D3tilmmv.js";import{B as _e}from"./Box-Bt_N9PQN.js";import{A as Ie}from"./Alert-B6PGsAkP.js";const je={RS256:"RS256"};function tt(n){const{synapseClient:i,keyFactory:d}=v();return ye({...n,queryKey:d.getMyOAuthClientsQueryKey(),queryFn:async e=>await i.openIDConnectServicesClient.getAuthV1Oauth2Client({nextPageToken:e.pageParam}),initialPageParam:void 0,getNextPageParam:e=>e.nextPageToken})}function Ae(n){const i=k(),{accessToken:d,keyFactory:e}=v();return W({...n,mutationFn:a=>he.deleteOAuthClient(a,d),onSuccess:async(a,p,h)=>{await i.invalidateQueries({queryKey:e.getMyOAuthClientsQueryKey()}),n!=null&&n.onSuccess&&await n.onSuccess(a,p,h)}})}function be(n){const i=k(),{synapseClient:d,keyFactory:e}=v();return W({...n,mutationFn:a=>d.openIDConnectServicesClient.putAuthV1Oauth2ClientId({id:a.client_id,oAuthClient:a}),onSuccess:async(a,p,h)=>{await i.invalidateQueries({queryKey:e.getMyOAuthClientsQueryKey()}),n!=null&&n.onSuccess&&await n.onSuccess(a,p,h)}})}function Re(n){const i=k(),{synapseClient:d,keyFactory:e}=v();return W({...n,mutationFn:a=>d.openIDConnectServicesClient.postAuthV1Oauth2Client({oAuthClient:a}),onSuccess:async(a,p,h)=>{await i.invalidateQueries({queryKey:e.getMyOAuthClientsQueryKey()}),n!=null&&n.onSuccess&&await n.onSuccess(a,p,h)}})}const S="JSON",we="Are you absolutely sure?",Oe="Editing this detail will render your client invalid and will require you to resubmit verification. This action cannot be undone.",De=500,c=12,m=6,$=1,X=2;function ee({isShowingModal:n=!1,isEdit:i,onClose:d,client:e,setIsShowingConfirmModal:a,isShowingConfirmModal:p,setIsShowingModal:h}){const{synapseClient:F}=v(),[b,R]=u.useState(""),[s,g]=u.useState([{uri:""}]),[w,O]=u.useState(""),[D,U]=u.useState(""),[N,q]=u.useState(""),[P,T]=u.useState(""),[_,M]=u.useState(S),[te,re]=u.useState(!1),[ne,B]=u.useState(!1),[ae,ie]=u.useState(),[I,C]=u.useState(),f=u.useMemo(()=>({client_id:e==null?void 0:e.client_id,client_name:b,redirect_uris:(s==null?void 0:s.map(r=>r.uri))??[""],policy_uri:w,client_uri:D,sector_identifier_uri:N,userinfo_signed_response_alg:_===S?void 0:_,tos_uri:P,etag:e==null?void 0:e.etag}),[e==null?void 0:e.client_id,e==null?void 0:e.etag,b,D,w,s,N,_,P]);u.useEffect(()=>{var r;R((e==null?void 0:e.client_name)??""),g(((r=e==null?void 0:e.redirect_uris)==null?void 0:r.map(o=>({uri:o})))??[{uri:""}]),O((e==null?void 0:e.policy_uri)??""),U((e==null?void 0:e.client_uri)??""),q((e==null?void 0:e.sector_identifier_uri)??""),M((e==null?void 0:e.userinfo_signed_response_alg)??S),T((e==null?void 0:e.tos_uri)??"")},[n,e]),fe(()=>{f.client_id&&F.openIDConnectServicesClient.putAuthV1Oauth2ClientIdVerificationPrecheck({id:f.client_id,oAuthClient:f}).then(r=>{re(r.reverificationRequired)})},[f,F.openIDConnectServicesClient],De);const j=()=>{R(""),g([{uri:""}]),O(""),U(""),q(""),M(S),T(""),d()},V=()=>{a(!1),B(!1)},{mutate:se}=Re({onSuccess:()=>{x("Successfully created","success"),C(void 0),j()},onError:r=>{C(r)}}),{mutate:G,isPending:L}=be({onSuccess:()=>{x("Successfully saved","success"),C(void 0),j()},onError:r=>{C(r),h(!0)}}),{mutate:oe}=Ae({onSuccess:()=>{x("Successfully deleted","success"),j()},onError:r=>{x(r.reason,"danger")}}),ue=()=>{try{ie(f),te===!0?a(!0):i?G(f):se(f)}catch(r){x(r.reason,"danger")}},le=()=>{s&&g([...s,{uri:""}])},de=r=>{if(s){const o=[...s];o.splice(r,1),g(o)}},ce=(r,o)=>{if(s){const{name:E,value:pe}=r.target,J=[...s];J[o][E]=pe,g(J)}},Q={color:i?"error.main":void 0,"&.Mui-focused":{color:i?"error.main":void 0}},K=t.jsx(y,{onChange:r=>q(r.target.value),placeholder:"https://",type:"text",value:N,id:"sectorURI",label:"Sector Identifier URI",margin:"normal",InputLabelProps:{sx:Q},fullWidth:!0}),H=t.jsx(t.Fragment,{children:s==null?void 0:s.map((r,o)=>t.jsxs("div",{children:[t.jsx(y,{required:o===0,InputLabelProps:{sx:Q},label:o===0&&"Redirect URI(s)",name:"uri",fullWidth:!0,id:`redirect-uri-${o}`,onChange:E=>ce(E,o),value:r.uri,placeholder:"https://",type:"text",InputProps:{endAdornment:s.length>1&&t.jsx(Se,{position:"end",children:t.jsx(ve,{onClick:()=>de(o),children:t.jsx(Y,{sx:{color:"error.main"}})})})},margin:o===0?"normal":"dense"}),s.length-1===o&&t.jsx(z,{variant:"contained",color:"primary",onClick:le,disabled:r.uri.length===0,sx:{my:"10px"},children:"Add URI"})]},o))}),me=t.jsxs(t.Fragment,{children:[L&&t.jsx("div",{className:"SRC-center-text",children:t.jsx(Ce,{size:40})}),!L&&t.jsxs(t.Fragment,{children:[t.jsx(A,{variant:"body1",mb:"10px",children:"To protect you and your users, your consent screen and application will need to be verified by Sage Bionetworks. Before your consent screen and application are verified by Sage Bionetworks, you can still test your application with limitations."}),i&&t.jsxs(A,{sx:{mt:"16px"},variant:"label",children:["Client ID: ",e==null?void 0:e.client_id]}),t.jsxs(l,{container:!0,rowSpacing:$,columnSpacing:X,children:[t.jsx(l,{item:!0,md:m,xs:c,children:t.jsx(y,{label:"Client Name",required:!0,onChange:r=>R(r.target.value),placeholder:"Client Name",type:"text",value:b,id:"clientName",margin:"normal",fullWidth:!0})}),t.jsx(l,{item:!0,md:m,xs:c,children:t.jsx(y,{label:"Client Homepage",onChange:r=>U(r.target.value),placeholder:"https://",type:"text",value:D,id:"clientUri",fullWidth:!0,margin:"normal"})}),!i&&t.jsxs(t.Fragment,{children:[t.jsx(l,{item:!0,md:m,xs:c,children:H}),t.jsx(l,{item:!0,md:m,xs:c,children:K})]}),t.jsx(l,{item:!0,md:m,xs:c,children:t.jsx(y,{label:"Link to Privacy Policy",onChange:r=>O(r.target.value),placeholder:"https://",type:"text",value:w,fullWidth:!0,margin:"normal"})}),t.jsx(l,{item:!0,md:m,xs:c,children:t.jsx(y,{label:"Links to Terms of Service",onChange:r=>T(r.target.value),placeholder:"https://",type:"text",value:P,fullWidth:!0,margin:"normal"})}),t.jsx(l,{item:!0,md:m,xs:c,children:t.jsxs(y,{label:"User Info Signed Response Algorithm",value:_,onChange:r=>M(r.target.value),select:!0,fullWidth:!0,margin:"normal",children:[t.jsx(Z,{value:S,children:"JSON"}),t.jsx(Z,{value:je.RS256,children:"JWT"})]})})]}),i&&t.jsxs(_e,{sx:{backgroundColor:"rgb(178, 36, 42, 0.03)"},mt:"10px",padding:1,children:[t.jsx(A,{sx:{my:1},color:"error",variant:"headline3",children:"DANGER ZONE"}),t.jsx(A,{variant:"smallText1",children:"Editing the following information will render your client invalid and will require you to create it again and resubmit verification if needed."}),t.jsxs(l,{container:!0,rowSpacing:$,columnSpacing:X,children:[t.jsx(l,{item:!0,md:m,xs:c,children:H}),t.jsx(l,{item:!0,md:m,xs:c,children:K})]}),t.jsx(z,{onClick:()=>{B(!0),a(!0)},color:"error",variant:"text",startIcon:t.jsx(Y,{}),sx:{padding:0,mb:1},children:"DELETE CLIENT"})]})]}),I&&t.jsx(Ie,{severity:"error",children:I==null?void 0:I.reason})]});return t.jsxs(t.Fragment,{children:[t.jsx(xe,{open:n&&!p,onCancel:()=>{j(),C(void 0)},maxWidth:"md",title:i?"Client Details":"Create New OAuth Client",content:me,onConfirm:ue,confirmButtonProps:{children:"Save"}}),t.jsx(ge,{open:p,title:we,content:Oe,onCancel:V,onConfirm:()=>{ne?oe(e==null?void 0:e.client_id):G(ae),V()},confirmButtonColor:"error",confirmButtonText:"Yes, Continue"})]})}try{ee.displayName="CreateOAuthModal",ee.__docgenInfo={description:"",displayName:"CreateOAuthModal",props:{isShowingModal:{defaultValue:{value:"false"},description:"",name:"isShowingModal",required:!1,type:{name:"boolean"}},isEdit:{defaultValue:null,description:"",name:"isEdit",required:!0,type:{name:"boolean"}},onClose:{defaultValue:null,description:"",name:"onClose",required:!0,type:{name:"() => void"}},setIsShowingConfirmModal:{defaultValue:null,description:"",name:"setIsShowingConfirmModal",required:!0,type:{name:"(a: boolean) => void"}},isShowingConfirmModal:{defaultValue:null,description:"",name:"isShowingConfirmModal",required:!0,type:{name:"boolean"}},client:{defaultValue:null,description:"",name:"client",required:!1,type:{name:"OAuthClient"}},setIsShowingModal:{defaultValue:null,description:"",name:"setIsShowingModal",required:!0,type:{name:"(a: boolean) => void"}}}}}catch{}export{ee as C,tt as u};
