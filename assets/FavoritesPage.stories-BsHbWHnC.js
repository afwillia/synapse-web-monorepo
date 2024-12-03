import{j as e}from"./jsx-runtime-DoxjgJx5.js";import{C as d,u as T,S as b,c as w,g as R,a as E,b as M,d as N,e as C}from"./StyledTanStackTable-uTB6J3Bk.js";import{r as i}from"./index-Cu9bd8lq.js";import{N as I}from"./NoSearchResults-B9722HCv.js";import{c as P}from"./useFavorites-Cl1tPPHT.js";import{P as z,l as O,a3 as A}from"./useFiles-DMbskdo6.js";import{f as g,e as f}from"./RegularExpressions-SKYrON-T.js";import{E as D}from"./EntityIcon-QnAeYBRq.js";import{I as G}from"./IconSvg-ESskBwc4.js";import{S as _}from"./LoadingScreen-Bc9rto4U.js";import{F as k}from"./FavoriteButton-D1QrvPWh.js";import{T as H}from"./TextField-BM400Yg9.js";import{I as U}from"./InputAdornment-CMpygKTp.js";import{S as V}from"./Stack-BbdlCzXz.js";import"./EnumFacetFilterUI-DXxIB2bs.js";import"./IconButton-DhHKwBf8.js";import"./createTheme-BIBP8v0l.js";import"./index-GEGPABih.js";import"./extends-CF3RwP-h.js";import"./styled-DKRXvDfM.js";import"./ButtonBase-DSnjMKVu.js";import"./TransitionGroupContext-C4KIfRep.js";import"./useForkRef-Bm_QQ74L.js";import"./useIsFocusVisible-Lp1_y5xp.js";import"./Box-Bt_N9PQN.js";import"./FormControlLabel-CARkfAdu.js";import"./useFormControl-vG3XTiAH.js";import"./useControlled-JEQ1v-P8.js";import"./Typography-D6GCV-CB.js";import"./Checkbox-BnrBea29.js";import"./createSvgIcon-Dn0UJ7ef.js";import"./Radio-lcFkrfOW.js";import"./createChainedFunction-BO_9K8Jh.js";import"./Dropdown-46h0S5ns.js";import"./ThemeProvider-BS-PCUTx.js";import"./index-SDyqs4cU.js";import"./Tooltip-CTVx2uGI.js";import"./index-Bn-p0IzE.js";import"./utils-B6ltzQPV.js";import"./index-zcEXKDIA.js";import"./ownerDocument-DW-IO8s5.js";import"./Grow-Bb1htYw2.js";import"./mergeSlotProps-D9SyexBH.js";import"./isHostComponent-DVu5iVWx.js";import"./useId-g68bhPgm.js";import"./hasClass-D5ZjVvBY.js";import"./Menu-xRAbfX1G.js";import"./Popover-CC5r9hFJ.js";import"./Modal-lb1Ml_1a.js";import"./Backdrop-CoMkdzxE.js";import"./Fade-DPmnnOI3.js";import"./getScrollbarSize-Bqq2hMjQ.js";import"./ownerWindow-BN2rbQ_G.js";import"./Paper-BxvgHMc4.js";import"./MenuList-Ckmb61NP.js";import"./List-BhKoI0Qm.js";import"./cloneDeep-C-OZ4saa.js";import"./_initCloneObject-CKp18hZk.js";import"./_baseTimes-36S_kd0L.js";import"./isArray-ggc3KxVp.js";import"./noop-DX6rZLP_.js";import"./Skeleton-DxEJ6_Wp.js";import"./useQuery-BEUP4ZKU.js";import"./utils-BECe8vEQ.js";import"./useMutation-BUHlmdy0.js";import"./useInfiniteQuery-Dl-ZZF67.js";import"./VerificationSubmission-DL9jxYsQ.js";import"./InfiniteQueryUtils-CKlRW-xB.js";import"./OrientationBanner-6BqxDXOp.js";import"./FullWidthAlert-7vG6655N.js";import"./Alert-B6PGsAkP.js";import"./AlertTitle-CCxKidd9.js";import"./ClickAwayListener-Ba-YFlDA.js";import"./Button-j3jTttn9.js";import"./SynapseConstants-BOdbxuBd.js";import"./tinycolor-Begke6kS.js";import"./InfoTwoTone-DHgeDUIO.js";import"./CheckCircleTwoTone-B0uYEdLD.js";import"./calculateFriendlyFileSize-DBeyIXBK.js";import"./inputBaseClasses-Db8tCxfW.js";import"./Link-DPsc3TBb.js";import"./StringUtils-tKdMMErg.js";import"./dayjs.min-D1RcYm3-.js";import"./merge-DLQdEICg.js";import"./identity-DKeuBCMA.js";import"./LayersTwoTone-CUigHRcz.js";import"./ErrorOutlined-BBoV-crm.js";import"./GetAppTwoTone-BoMaJ6Ug.js";import"./InfoOutlined-DE16MDj_.js";import"./DeleteTwoTone-dIAufepT.js";import"./LinearProgress-DB_pgUJr.js";import"./ConditionalWrapper-C6_4TcM5.js";import"./InputLabel-RHZu0c3g.js";import"./isMuiElement-yx-QWTmT.js";import"./Input-DkOuflLo.js";const p=w(),W=[p.display({id:"removeFavorite",cell:r=>e.jsx(k,{entityId:r.row.original.id}),size:60,enableResizing:!1,meta:{textAlign:"center"}}),p.accessor("name",{cell:r=>e.jsx("a",{rel:"noopener noreferrer",href:`${z.PORTAL}Synapse:${r.row.original.id}`,children:r.row.original.name}),enableGlobalFilter:!0,header:r=>e.jsx(d,{...r,title:"Name"}),size:400,enableColumnFilter:!1,sortingFn:"alphanumeric",enableSorting:!0}),p.accessor("type",{cell:r=>{const o=g(r.row.original.type);return e.jsxs(e.Fragment,{children:[e.jsx(D,{type:o,style:{marginRight:"5px"}}),f(o)]})},header:r=>e.jsx(d,{...r,title:"Type"}),size:160,enableGlobalFilter:!1,sortingFn:"alphanumeric",filterFn:"arrIncludes",meta:{enableMultipleSelect:!0,filterVariant:"enumeration",getDisplayText:r=>f(g(r))},enableSorting:!0})];function q(){const{accessToken:r}=O(),[o,y]=i.useState(""),[n,m]=i.useState(),{data:t,isLoading:l,isError:c,error:a}=P(),S=i.useMemo(()=>(t==null?void 0:t.results)??[],[t==null?void 0:t.results]),u=T({data:S,columns:W,getCoreRowModel:R(),getFilteredRowModel:E(),getSortedRowModel:M(),getFacetedRowModel:N(),getFacetedUniqueValues:C(),globalFilterFn:"includesString",state:{globalFilter:o},columnResizeMode:"onChange"});if(i.useEffect(()=>{c&&a&&m(a)},[c,a]),i.useEffect(()=>{m(r?void 0:new Error("Please sign in to access your favorites."))},[r]),n)return e.jsx(A,{error:n});const v=u.getRowModel().rows.length>0;return e.jsxs("div",{className:"FavoritesPage",children:[e.jsx(H,{InputProps:{startAdornment:e.jsx(U,{position:"start",children:e.jsx(G,{icon:"search",wrap:!1})})},type:"search",placeholder:"Favorite Name",value:o,onChange:j=>{y(j.target.value)},fullWidth:!0,sx:{mb:4,maxWidth:"800px"}}),e.jsx(b,{table:u,fullWidth:!1}),!v&&!l&&e.jsxs(V,{sx:{textAlign:"center"},my:2,gap:1,children:[e.jsx(I,{height:"150px"}),(t==null?void 0:t.results.length)==0?e.jsx("p",{children:"You currently have no favorites"}):e.jsx("p",{children:"No matching favorites found"})]}),l&&e.jsx("div",{className:"placeholder",children:e.jsx(_,{size:30})})]})}const Pr={title:"Synapse/FavoritesPage",component:q},s={};var x,h,F;s.parameters={...s.parameters,docs:{...(x=s.parameters)==null?void 0:x.docs,source:{originalSource:"{}",...(F=(h=s.parameters)==null?void 0:h.docs)==null?void 0:F.source}}};const zr=["Demo"];export{s as Demo,zr as __namedExportsOrder,Pr as default};
