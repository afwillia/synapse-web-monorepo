import{g as O,f as S,a as x,h as P,j as F,k as I,e as L,l as T,m as N,n as q,o as D,p as G,q as H,b as y,r as R,s as B,S as U}from"./_initCloneObject-CKdTzPLh.js";import{i as A,b as V,a as b}from"./isArray-ggc3KxVp.js";import{i as v}from"./_baseTimes-36S_kd0L.js";import{i as C}from"./identity-DKeuBCMA.js";function j(e,n,r){switch(r.length){case 0:return e.call(n);case 1:return e.call(n,r[0]);case 2:return e.call(n,r[0],r[1]);case 3:return e.call(n,r[0],r[1],r[2])}return e.apply(n,r)}var E=800,J=16,K=Date.now;function Q(e){var n=0,r=0;return function(){var i=K(),t=J-(i-r);if(r=i,t>0){if(++n>=E)return arguments[0]}else n=0;return e.apply(void 0,arguments)}}function W(e){return function(){return e}}var X=O?function(e,n){return O(e,"toString",{configurable:!0,enumerable:!1,value:W(n),writable:!0})}:C,Y=Q(X),w=Math.max;function Z(e,n,r){return n=w(n===void 0?e.length-1:n,0),function(){for(var i=arguments,t=-1,f=w(i.length-n,0),u=Array(f);++t<f;)u[t]=i[n+t];t=-1;for(var a=Array(n+1);++t<n;)a[t]=i[t];return a[n]=r(u),j(e,this,a)}}function $(e,n){return Y(Z(e,n,C),e+"")}function z(e,n,r){if(!v(r))return!1;var i=typeof n;return(i=="number"?S(r)&&x(n,r.length):i=="string"&&n in r)?P(r[n],e):!1}function k(e){return $(function(n,r){var i=-1,t=r.length,f=t>1?r[t-1]:void 0,u=t>2?r[2]:void 0;for(f=e.length>3&&typeof f=="function"?(t--,f):void 0,u&&z(r[0],r[1],u)&&(f=t<3?void 0:f,t=1),n=Object(n);++i<t;){var a=r[i];a&&e(n,a,i,f)}return n})}var nn="[object Object]",en=Function.prototype,rn=Object.prototype,_=en.toString,tn=rn.hasOwnProperty,an=_.call(Object);function fn(e){if(!A(e)||V(e)!=nn)return!1;var n=F(e);if(n===null)return!0;var r=tn.call(n,"constructor")&&n.constructor;return typeof r=="function"&&r instanceof r&&_.call(r)==an}function un(e){return function(n,r,i){for(var t=-1,f=Object(n),u=i(n),a=u.length;a--;){var o=u[e?a:++t];if(r(f[o],o,f)===!1)break}return n}}var on=un();function c(e,n,r){(r!==void 0&&!P(e[n],r)||r===void 0&&!(n in e))&&I(e,n,r)}function sn(e){return A(e)&&S(e)}function g(e,n){if(!(n==="constructor"&&typeof e[n]=="function")&&n!="__proto__")return e[n]}function ln(e){return L(e,T(e))}function pn(e,n,r,i,t,f,u){var a=g(e,r),o=g(n,r),h=u.get(o);if(h){c(e,r,h);return}var s=f?f(a,o,r+"",e,n,u):void 0,l=s===void 0;if(l){var p=b(o),d=!p&&N(o),m=!p&&!d&&q(o);s=o,p||d||m?b(a)?s=a:sn(a)?s=D(a):d?(l=!1,s=G(o,!0)):m?(l=!1,s=H(o,!0)):s=[]:fn(o)||y(o)?(s=a,y(a)?s=ln(a):(!v(a)||R(a))&&(s=B(o))):l=!1}l&&(u.set(o,s),t(s,o,i,f,u),u.delete(o)),c(e,r,s)}function M(e,n,r,i,t){e!==n&&on(n,function(f,u){if(t||(t=new U),v(f))pn(e,n,u,r,M,i,t);else{var a=i?i(g(e,u),f,u+"",e,n,t):void 0;a===void 0&&(a=f),c(e,u,a)}},T)}var hn=k(function(e,n,r){M(e,n,r)});export{z as a,$ as b,fn as c,on as d,Q as e,j as f,k as g,M as h,sn as i,un as j,W as k,hn as m,Z as o,Y as s,ln as t};
