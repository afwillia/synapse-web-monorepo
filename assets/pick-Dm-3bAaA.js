import{a as _}from"./toString-CYyvKWOl.js";import{g as L,b as O}from"./cloneDeep-C-OZ4saa.js";import{a as x,b as m,c as o,t as v,h as A}from"./hasIn-7ckzHCV_.js";import{b as C}from"./_baseSlice-F8doVSIJ.js";import{c as E,a as F,d as P}from"./_initCloneObject-CKp18hZk.js";import{s as S,o as G,d as I}from"./merge-DLQdEICg.js";import{i as g}from"./_baseTimes-36S_kd0L.js";function N(n){var r=n==null?0:n.length;return r?x(n,1):[]}function c(n){return S(G(n,void 0,N),n+"")}function B(n){var r=n==null?0:n.length;return r?n[r-1]:void 0}function D(n,r){return r.length<2?n:m(n,C(r,0,-1))}function K(n,r){return r=o(r,n),n=D(n,r),n==null||delete n[v(B(r))]}function M(n){return I(n)?void 0:n}var R=1,T=2,h=4,Z=c(function(n,r){var e={};if(n==null)return e;var i=!1;r=_(r,function(s){return s=o(s,n),i||(i=s.length>1),s}),E(n,L(n),e),i&&(e=O(e,R|T|h,M));for(var t=r.length;t--;)K(e,r[t]);return e});function U(n,r,e,i){if(!g(n))return n;r=o(r,n);for(var t=-1,s=r.length,a=s-1,l=n;l!=null&&++t<s;){var u=v(r[t]),f=e;if(u==="__proto__"||u==="constructor"||u==="prototype")return n;if(t!=a){var d=l[u];f=i?i(d,u,l):void 0,f===void 0&&(f=g(d)?d:F(r[t+1])?[]:{})}P(l,u,f),l=l[u]}return n}function Y(n,r,e){for(var i=-1,t=r.length,s={};++i<t;){var a=r[i],l=m(n,a);e(l,a)&&U(s,o(a,n),l)}return s}function p(n,r){return Y(n,r,function(e,i){return A(n,i)})}var $=c(function(n,r){return n==null?{}:p(n,r)});export{D as a,Y as b,K as c,U as d,N as e,c as f,B as l,Z as o,$ as p};
