import{a,S as f}from"./isArray-ggc3KxVp.js";import{i as p}from"./isSymbol-BzKS7Qf1.js";import{bJ as h}from"./useFiles-cx7pZlDv.js";import{t as u}from"./toString-CYyvKWOl.js";import{a as b}from"./cloneDeep-aDrSbqZk.js";import{b as g}from"./_initCloneObject-CKdTzPLh.js";var y=/\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,d=/^\w*$/;function l(r,n){if(a(r))return!1;var t=typeof r;return t=="number"||t=="symbol"||t=="boolean"||r==null||p(r)?!0:d.test(r)||!y.test(r)||n!=null&&r in Object(n)}var I=500;function P(r){var n=h(r,function(i){return t.size===I&&t.clear(),i}),t=n.cache;return n}var S=/[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g,A=/\\(\\)?/g,C=P(function(r){var n=[];return r.charCodeAt(0)===46&&n.push(""),r.replace(S,function(t,i,e,o){n.push(e?o.replace(A,"$1"):i||t)}),n});function E(r,n){return a(r)?r:l(r,n)?[r]:C(u(r))}var $=1/0;function w(r){if(typeof r=="string"||p(r))return r;var n=r+"";return n=="0"&&1/r==-$?"-0":n}function Z(r,n){n=E(n,r);for(var t=0,i=n.length;r!=null&&t<i;)r=r[w(n[t++])];return t&&t==i?r:void 0}var m=f?f.isConcatSpreadable:void 0;function x(r){return a(r)||g(r)||!!(m&&r&&r[m])}function z(r,n,t,i,e){var o=-1,c=r.length;for(t||(t=x),e||(e=[]);++o<c;){var s=r[o];n>0&&t(s)?n>1?z(s,n-1,t,i,e):b(e,s):i||(e[e.length]=s)}return e}export{z as a,Z as b,E as c,l as i,C as s,w as t};
