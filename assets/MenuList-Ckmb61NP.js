import{_ as j,b as H}from"./createTheme-BIBP8v0l.js";import{r as c}from"./index-Cu9bd8lq.js";import"./styled-DKRXvDfM.js";import{j as T}from"./jsx-runtime-DoxjgJx5.js";import{a as A,u as _}from"./useForkRef-Bm_QQ74L.js";import{g as O}from"./getScrollbarSize-Bqq2hMjQ.js";import{o as C}from"./ownerDocument-DW-IO8s5.js";import{L as z}from"./List-BhKoI0Qm.js";const N=["actions","autoFocus","autoFocusItem","children","className","disabledItemsFocusable","disableListWrap","onKeyDown","variant"];function w(n,t,r){return n===t?n.firstChild:t&&t.nextElementSibling?t.nextElementSibling:r?null:n.firstChild}function D(n,t,r){return n===t?r?n.firstChild:n.lastChild:t&&t.previousElementSibling?t.previousElementSibling:r?null:n.lastChild}function I(n,t){if(t===void 0)return!0;let r=n.innerText;return r===void 0&&(r=n.textContent),r=r.trim().toLowerCase(),r.length===0?!1:t.repeating?r[0]===t.keys[0]:r.indexOf(t.keys.join(""))===0}function h(n,t,r,b,m,y){let p=!1,u=m(n,t,t?r:!1);for(;u;){if(u===n.firstChild){if(p)return!1;p=!0}const d=b?!1:u.disabled||u.getAttribute("aria-disabled")==="true";if(!u.hasAttribute("tabindex")||!I(u,y)||d)u=m(n,u,r);else return u.focus(),!0}return!1}const J=c.forwardRef(function(t,r){const{actions:b,autoFocus:m=!1,autoFocusItem:y=!1,children:p,className:u,disabledItemsFocusable:d=!1,disableListWrap:g=!1,onKeyDown:x,variant:v="selectedMenu"}=t,F=j(t,N),a=c.useRef(null),M=c.useRef({keys:[],repeating:!0,previousKeyMatched:!0,lastTime:null});A(()=>{m&&a.current.focus()},[m]),c.useImperativeHandle(b,()=>({adjustStyleForScrollbar:(e,{direction:s})=>{const l=!a.current.style.width;if(e.clientHeight<a.current.clientHeight&&l){const f=`${O(C(e))}px`;a.current.style[s==="rtl"?"paddingLeft":"paddingRight"]=f,a.current.style.width=`calc(100% + ${f})`}return a.current}}),[]);const S=e=>{const s=a.current,l=e.key,f=C(s).activeElement;if(l==="ArrowDown")e.preventDefault(),h(s,f,g,d,w);else if(l==="ArrowUp")e.preventDefault(),h(s,f,g,d,D);else if(l==="Home")e.preventDefault(),h(s,null,g,d,w);else if(l==="End")e.preventDefault(),h(s,null,g,d,D);else if(l.length===1){const i=M.current,k=l.toLowerCase(),E=performance.now();i.keys.length>0&&(E-i.lastTime>500?(i.keys=[],i.repeating=!0,i.previousKeyMatched=!0):i.repeating&&k!==i.keys[0]&&(i.repeating=!1)),i.lastTime=E,i.keys.push(k);const R=f&&!i.repeating&&I(f,i);i.previousKeyMatched&&(R||h(s,f,!1,d,w,i))?e.preventDefault():i.previousKeyMatched=!1}x&&x(e)},L=_(a,r);let o=-1;c.Children.forEach(p,(e,s)=>{if(!c.isValidElement(e)){o===s&&(o+=1,o>=p.length&&(o=-1));return}e.props.disabled||(v==="selectedMenu"&&e.props.selected||o===-1)&&(o=s),o===s&&(e.props.disabled||e.props.muiSkipListHighlight||e.type.muiSkipListHighlight)&&(o+=1,o>=p.length&&(o=-1))});const K=c.Children.map(p,(e,s)=>{if(s===o){const l={};return y&&(l.autoFocus=!0),e.props.tabIndex===void 0&&v==="selectedMenu"&&(l.tabIndex=0),c.cloneElement(e,l)}return e});return T.jsx(z,H({role:"menu",ref:L,className:u,onKeyDown:S,tabIndex:m?0:-1},F,{children:K}))});export{J as M};