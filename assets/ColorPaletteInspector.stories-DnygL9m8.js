import{j as t}from"./jsx-runtime-DoxjgJx5.js";import{C as o,a as l}from"./colorPalette-BSrfa2_g.js";import{t as c}from"./tinycolor-Begke6kS.js";import{B as m}from"./Box-Bt_N9PQN.js";import"./index-Cu9bd8lq.js";import"./createTheme-BIBP8v0l.js";import"./index-GEGPABih.js";import"./extends-CF3RwP-h.js";function n({color:e}){return t.jsx("div",{children:t.jsx(m,{display:"flex",justifyContent:"center",alignItems:"center",sx:{background:e,width:"100px",height:"20px",fontSize:"10px",color:e,"&:hover":{color:c(e).isDark()?"white":"black"}},children:e})})}function x(){return t.jsxs("div",{children:[t.jsx("h2",{children:"Odd Palette"}),t.jsx("div",{style:{display:"flex",flexWrap:"wrap"},children:o.reduce((e,r,s)=>(s%5===0?e.push([r]):e[e.length-1].push(r))&&e,[]).map((e,r)=>t.jsxs("div",{children:[t.jsxs("p",{children:["Odd ",r]}),e.map(s=>t.jsx(n,{color:s},s))]},"odd"+r))}),t.jsx("hr",{}),t.jsx("h2",{children:"Even Palette"}),t.jsx("div",{style:{display:"flex",flexWrap:"wrap"},children:l.reduce((e,r,s)=>(s%5===0?e.push([r]):e[e.length-1].push(r))&&e,[]).map((e,r)=>t.jsxs("div",{children:[t.jsxs("p",{children:["Even ",r]}),e.map(s=>t.jsx(n,{color:s},s))]},"even"+r))})," "]})}const g={title:"UI/ColorPaletteInspector",component:x},i={};var a,p,d;i.parameters={...i.parameters,docs:{...(a=i.parameters)==null?void 0:a.docs,source:{originalSource:"{}",...(d=(p=i.parameters)==null?void 0:p.docs)==null?void 0:d.source}}};const D=["Demo"];export{i as Demo,D as __namedExportsOrder,g as default};
