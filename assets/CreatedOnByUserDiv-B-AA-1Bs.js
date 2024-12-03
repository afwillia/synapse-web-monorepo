import{b as v,_ as b}from"./createTheme-BIBP8v0l.js";import{c as f,u as N}from"./ThemeProvider-BS-PCUTx.js";import{a,r as D}from"./index-Cu9bd8lq.js";import{c as s}from"./Dropdown-46h0S5ns.js";import{j as u}from"./jsx-runtime-DoxjgJx5.js";import{U as E}from"./UserBadge-DX-IOO9j.js";import{f as H}from"./DateFormatter-DvLN8vls.js";import{d as O}from"./dayjs.min-D1RcYm3-.js";const g=function(e){return a.forwardRef(function(t,d){return a.createElement("div",v({},t,{ref:d,className:f(t.className,e)}))})};var P=a.createContext(null);P.displayName="CardContext";var R=["bsPrefix","className","variant","as"],U={variant:null},x=a.forwardRef(function(e,t){var d=e.bsPrefix,l=e.className,o=e.variant,i=e.as,c=i===void 0?"img":i,m=b(e,R),n=N(d,"card-img");return a.createElement(c,v({ref:t,className:f(o?n+"-"+o:n,l)},m))});x.displayName="CardImg";x.defaultProps=U;var S=["bsPrefix","className","bg","text","border","body","children","as"],T=g("h5"),$=g("h6"),h=s("card-body"),k=s("card-title",{Component:T}),w=s("card-subtitle",{Component:$}),L=s("card-link",{Component:"a"}),W=s("card-text",{Component:"p"}),_=s("card-header"),q=s("card-footer"),A=s("card-img-overlay"),F={body:!1},r=a.forwardRef(function(e,t){var d=e.bsPrefix,l=e.className,o=e.bg,i=e.text,c=e.border,m=e.body,n=e.children,C=e.as,B=C===void 0?"div":C,I=b(e,S),p=N(d,"card"),j=D.useMemo(function(){return{cardHeaderBsPrefix:p+"-header"}},[p]);return a.createElement(P.Provider,{value:j},a.createElement(B,v({ref:t},I,{className:f(l,p,o&&"bg-"+o,i&&"text-"+i,c&&"border-"+c)}),m?a.createElement(h,null,n):n))});r.displayName="Card";r.defaultProps=F;r.Img=x;r.Title=k;r.Subtitle=w;r.Body=h;r.Link=L;r.Text=W;r.Header=_;r.Footer=q;r.ImgOverlay=A;function y(e){const{userId:t,date:d}=e;return u.jsxs("div",{className:"created-on",children:[u.jsxs("span",{children:["Created on ",H(O(d))," by "]}),u.jsx(E,{userId:t})]})}try{y.displayName="CreatedOnByUserDiv",y.__docgenInfo={description:"",displayName:"CreatedOnByUserDiv",props:{userId:{defaultValue:null,description:"",name:"userId",required:!0,type:{name:"string"}},date:{defaultValue:null,description:"",name:"date",required:!0,type:{name:"Date"}}}}}catch{}export{r as C,y as a};
