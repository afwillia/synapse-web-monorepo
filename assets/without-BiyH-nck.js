import{bm as m,bn as a}from"./useFiles-J8vlhq7N.js";import{b as u}from"./_baseIndexOf-DlmoT9Yo.js";import{a as w}from"./toString-CYyvKWOl.js";import{b as p}from"./_initCloneObject-CKp18hZk.js";import{b as A,i as R}from"./merge-DLQdEICg.js";function x(i,n){var e=i==null?0:i.length;return!!e&&u(i,n,0)>-1}function I(i,n,e){for(var t=-1,f=i==null?0:i.length;++t<f;)if(e(n,i[t]))return!0;return!1}var L=200;function d(i,n,e,t){var f=-1,l=x,o=!0,b=i.length,s=[],g=n.length;if(!b)return s;e&&(n=w(n,p(e))),t?(l=I,o=!1):n.length>=L&&(l=a,o=!1,n=new m(n));n:for(;++f<b;){var r=i[f],h=e==null?r:e(r);if(r=t||r!==0?r:0,o&&h===h){for(var c=g;c--;)if(n[c]===h)continue n;s.push(r)}else l(n,h,t)||s.push(r)}return s}var j=A(function(i,n){return R(i)?d(i,n):[]});export{x as a,I as b,d as c,j as w};
