import{l as d}from"./index-UzTB7lVT.js";import{k as j,j as f,B as O}from"./useFiles-DMbskdo6.js";import{B as l}from"./BasicMockedCrudService-CLTZjBVD.js";const i=new l({idField:"id",autoGenerateId:!0});function k(p,g,m,c=f(O.REPO_ENDPOINT),y=201){return[d.rest.post(`${c}${p}`,async(t,o,s)=>{const e=i.create({request:await t.json(),response:m});return o(s.status(201),s.json({token:e.id}))}),d.rest.get(`${c}${j(":id")}`,async(t,o,s)=>{const e=t.params.id,r=i.getOneById(e);if(!e||!r)return o(s.status(404),s.json({message:"The mocked asynchronous job was not found"}));const{request:a,response:n}=r,u=typeof n=="function"?n(a):n,b=y<400?"COMPLETE":"FAILED";return o(s.status(200),s.json({jobState:b,jobCanceling:!1,requestBody:a,etag:"00000000-0000-0000-0000-000000000000",jobId:e,responseBody:u,startedByUserId:0,startedOn:"",changedOn:"",progressMessage:"",progressCurrent:100,progressTotal:100,exception:"",errorMessage:"",errorDetails:"",runtimeMS:100}))}),d.rest.get(`${c}${g(":asyncJobToken")}`,async(t,o,s)=>{const e=t.params.asyncJobToken,r=i.getOneById(e);if(!e||!r)return o(s.status(404),s.json({message:"The mocked asynchronous job was not found"}));const{request:a,response:n}=r,u=typeof n=="function"?n(a):n;return o(s.status(y),s.json(u))})]}export{k as g};