var x=e=>{throw TypeError(e)};var C=(e,t,s)=>t.has(e)||x("Cannot "+s);var i=(e,t,s)=>(C(e,t,"read from private field"),s?s.call(e):t.get(e)),d=(e,t,s)=>t.has(e)?x("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(e):t.set(e,s),p=(e,t,s,r)=>(C(e,t,"write to private field"),r?r.call(e,s):t.set(e,s),s),m=(e,t,s)=>(C(e,t,"access private method"),s);import{r as f}from"./index-Cu9bd8lq.js";import{S as U,s as k,h as w,g as q,n as R,u as L,a as j}from"./utils-BECe8vEQ.js";var a,l,o,h,u,g,M,K,A=(K=class extends U{constructor(t,s){super();d(this,u);d(this,a);d(this,l);d(this,o);d(this,h);p(this,a,t),this.setOptions(s),this.bindMethods(),m(this,u,g).call(this)}bindMethods(){this.mutate=this.mutate.bind(this),this.reset=this.reset.bind(this)}setOptions(t){var r;const s=this.options;this.options=i(this,a).defaultMutationOptions(t),k(this.options,s)||i(this,a).getMutationCache().notify({type:"observerOptionsUpdated",mutation:i(this,o),observer:this}),s!=null&&s.mutationKey&&this.options.mutationKey&&w(s.mutationKey)!==w(this.options.mutationKey)?this.reset():(r=i(this,o))==null||r.setOptions(this.options)}onUnsubscribe(){var t;this.hasListeners()||(t=i(this,o))==null||t.removeObserver(this)}onMutationUpdate(t){m(this,u,g).call(this),m(this,u,M).call(this,t)}getCurrentResult(){return i(this,l)}reset(){var t;(t=i(this,o))==null||t.removeObserver(this),p(this,o,void 0),m(this,u,g).call(this),m(this,u,M).call(this)}mutate(t,s){var r;return p(this,h,s),(r=i(this,o))==null||r.removeObserver(this),p(this,o,i(this,a).getMutationCache().build(i(this,a),this.options)),i(this,o).addObserver(this),i(this,o).execute(t)}},a=new WeakMap,l=new WeakMap,o=new WeakMap,h=new WeakMap,u=new WeakSet,g=function(){var s;const t=((s=i(this,o))==null?void 0:s.state)??q();p(this,l,{...t,isPending:t.status==="pending",isSuccess:t.status==="success",isError:t.status==="error",isIdle:t.status==="idle",mutate:this.mutate,reset:this.reset})},M=function(t){R.batch(()=>{var s,r,n,v,c,y,S,E;if(i(this,h)&&this.hasListeners()){const b=i(this,l).variables,O=i(this,l).context;(t==null?void 0:t.type)==="success"?((r=(s=i(this,h)).onSuccess)==null||r.call(s,t.data,b,O),(v=(n=i(this,h)).onSettled)==null||v.call(n,t.data,null,b,O)):(t==null?void 0:t.type)==="error"&&((y=(c=i(this,h)).onError)==null||y.call(c,t.error,b,O),(E=(S=i(this,h)).onSettled)==null||E.call(S,void 0,t.error,b,O))}this.listeners.forEach(b=>{b(i(this,l))})})},K);function T(e,t){const s=L(),[r]=f.useState(()=>new A(s,e));f.useEffect(()=>{r.setOptions(e)},[r,e]);const n=f.useSyncExternalStore(f.useCallback(c=>r.subscribe(R.batchCalls(c)),[r]),()=>r.getCurrentResult(),()=>r.getCurrentResult()),v=f.useCallback((c,y)=>{r.mutate(c,y).catch(D)},[r]);if(n.error&&j(r.options.throwOnError,[n.error]))throw n.error;return{...n,mutate:v,mutateAsync:n.mutate}}function D(){}export{T as u};
