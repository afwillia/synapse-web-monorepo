import{j as e}from"./jsx-runtime-DoxjgJx5.js";import{r as o}from"./index-Cu9bd8lq.js";import{a as g,R as S,b as u,c as x,F as _,d as R,e as T,f as F,V as C,B as N}from"./useEntitySelection-lFb5L7uD.js";import{r as B}from"./react-sizeme-Vw-aaS2E.js";import{M as b}from"./immutable.es-DHy1u56X.js";import{E as l}from"./VerificationSubmission-DL9jxYsQ.js";import"./useFiles-J8vlhq7N.js";import"./RegularExpressions-SKYrON-T.js";import"./OrientationBanner-6BqxDXOp.js";import{u as I}from"./useEntity-B-_awyc4.js";const i=({parentContainerId:t,onSelect:c})=>{const{data:n}=I(t),[d,p]=o.useState(t),[E,y]=o.useState({items:[]}),f=o.useCallback(s=>{y({items:s})},[y]),w=(n==null?void 0:n.path.path[1].id)??void 0,m=b(),r=[l.FOLDER,l.FILE,l.LINK],h={type:g.PARENT_CONTAINER,parentContainerId:d??void 0,getProjectParams:{sort:"PROJECT_NAME"}};return e.jsx("div",{className:"EntityFinderReflexContainer",children:e.jsx(B.SizeMe,{children:({size:s})=>e.jsxs(S,{orientation:"vertical",windowResizeAware:!0,children:[e.jsx(u,{className:"TreeViewReflexElement",flex:.24,children:e.jsx(x,{selectedEntities:m,setDetailsViewConfiguration:()=>{},showDropdown:!1,initialScope:_.CURRENT_PROJECT,projectId:w,initialContainer:t,currentContainer:d,setCurrentContainer:p,treeNodeType:R.DUAL_PANE,setBreadcrumbItems:f,selectableTypes:r,hideScopeSelector:!0,showScopeAsRootNode:!1})}),e.jsx(T,{}),e.jsxs(u,{className:"DetailsViewReflexElement",children:[e.jsx(F,{configuration:h,versionSelection:C.DISALLOWED,selected:m,isIdSelected:()=>!1,isSelectable:()=>!1,visibleTypes:r,selectableTypes:r,selectColumnType:"none",toggleSelection:a=>{Array.isArray(a)?c(a[0]):c(a)},enableSelectAll:!1,setCurrentContainer:p}),e.jsx(N,{...E})]})]},(!!s.width).toString())})})};try{i.displayName="EntityFileBrowser",i.__docgenInfo={description:`Entity File Browser.  Essentially an EntityFinder where selection will call back (to change the page to the target entity)
TODO: From EntityBadgeIcons, show unlink functionality (add onUnlink and onUnlinkError in EntityFileBrowserProps!) and showHasWiki.`,displayName:"EntityFileBrowser",props:{parentContainerId:{defaultValue:null,description:"",name:"parentContainerId",required:!0,type:{name:"string"}},onSelect:{defaultValue:null,description:"",name:"onSelect",required:!0,type:{name:"(entity: Reference) => void"}}}}}catch{}try{i.displayName="EntityFileBrowser",i.__docgenInfo={description:`Entity File Browser.  Essentially an EntityFinder where selection will call back (to change the page to the target entity)
TODO: From EntityBadgeIcons, show unlink functionality (add onUnlink and onUnlinkError in EntityFileBrowserProps!) and showHasWiki.`,displayName:"EntityFileBrowser",props:{parentContainerId:{defaultValue:null,description:"",name:"parentContainerId",required:!0,type:{name:"string"}},onSelect:{defaultValue:null,description:"",name:"onSelect",required:!0,type:{name:"(entity: Reference) => void"}}}}}catch{}export{i as E};
