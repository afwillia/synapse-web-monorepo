import{j as e}from"./jsx-runtime-DoxjgJx5.js";import{r as s}from"./index-Cu9bd8lq.js";import{L as d}from"./LoginAwareButton-DepkgbQS.js";import{B as u}from"./Box-Bt_N9PQN.js";function a({showSpinner:t=!1,...i}){const[r,l]=s.useState(0),n=s.useRef(null);return s.useEffect(()=>{var o;if(n){const p=((o=n.current)==null?void 0:o.offsetWidth)??0;l(p)}},[]),e.jsxs("div",{"data-testid":"SpinnerButton",style:{position:"relative",width:"max-content"},children:[t&&e.jsx("div",{style:{position:"absolute",top:"8px",left:`${r/2-8}px`},children:e.jsx("span",{"data-testid":"SpinnerButton-spinner",className:"spinner"})}),e.jsx(u,{sx:{display:"flex"},ref:n,children:e.jsx(d,{...i,disabled:i.disabled||t,style:{opacity:t?.4:1}})})]})}try{a.displayName="SpinnerButton",a.__docgenInfo={description:"",displayName:"SpinnerButton",props:{ref:{defaultValue:null,description:"",name:"ref",required:!1,type:{name:"((instance: HTMLButtonElement | null) => void) | RefObject<HTMLButtonElement> | null"}},component:{defaultValue:null,description:"",name:"component",required:!1,type:{name:"ElementType<any, keyof IntrinsicElements>"}},showSpinner:{defaultValue:{value:"false"},description:"",name:"showSpinner",required:!1,type:{name:"boolean"}}}}}catch{}export{a as S};
