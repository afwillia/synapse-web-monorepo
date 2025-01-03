import{G as E,H as g,I as w,J as m,E as e,i as A}from"./VerificationSubmission-DL9jxYsQ.js";const Q="Terms of Use",p="org.sagebionetworks.repo.model.TermsOfUseAccessRequirement",C="org.sagebionetworks.repo.model.docker.DockerRepository",_="org.sagebionetworks.repo.model.FileEntity",l="org.sagebionetworks.repo.model.table.MaterializedView",L="org.sagebionetworks.repo.model.table.SubmissionView",a="org.sagebionetworks.repo.model.table.Dataset",i="org.sagebionetworks.repo.model.table.DatasetCollection",I="org.sagebionetworks.repo.model.table.VirtualTable",T="org.sagebionetworks.repo.model.table.TableEntity",b=[E,L,a,i],S=[T,...b,l,I],U="org.sagebionetworks.repo.model.Folder",R="org.sagebionetworks.repo.model.Link",y="org.sagebionetworks.repo.model.Project",D="org.sagebionetworks.repo.model.file.S3FileHandle",k="org.sagebionetworks.repo.model.file.GoogleCloudFileHandle",O="org.sagebionetworks.repo.model.file.ExternalFileHandle",F="org.sagebionetworks.repo.model.file.ExternalObjectStoreFileHandle",f="org.sagebionetworks.repo.model.file.ProxyFileHandle",P="org.sagebionetworks.repo.model.table.FacetColumnValuesRequest",Y="org.sagebionetworks.repo.model.table.FacetColumnRangeRequest";function o(...s){return r=>!!(r&&typeof r=="object"&&"concreteType"in r&&s.includes(r.concreteType))}const x=o(D,k),G=o(O),$=o(R),Z=o(f,F,O),q=o(C),z=o(P),X=o(Y),j=o(m),ee=o(g),se=o(w),oe=o(_),re=o(p);function te(s){return s.node_type?s.node_type:s.type===void 0?e.PROJECT:d(s.type)}function ne(s){switch(s){case e.PROJECT:case e.FOLDER:return!0;case e.LINK:case e.DOCKER_REPO:case e.FILE:case e.TABLE:case e.SUBMISSION_VIEW:case e.ENTITY_VIEW:case e.DATASET:case e.DATASET_COLLECTION:case e.MATERIALIZED_VIEW:case e.VIRTUAL_TABLE:return!1;default:throw new Error(`Unknown entity type: ${s}`)}}function Ee(s){switch(s){case e.PROJECT:case e.FOLDER:case e.LINK:case e.DOCKER_REPO:case e.FILE:return!1;case e.TABLE:case e.SUBMISSION_VIEW:case e.ENTITY_VIEW:case e.DATASET:case e.DATASET_COLLECTION:case e.MATERIALIZED_VIEW:case e.VIRTUAL_TABLE:return!0;default:throw new Error(`Unknown entity type: ${s}`)}}function ae(s){switch(s){case e.PROJECT:return"Project";case e.FOLDER:return"Folder";case e.FILE:return"File";case e.TABLE:return"Table";case e.LINK:return"Link";case e.ENTITY_VIEW:return"View";case e.DOCKER_REPO:return"Docker Repository";case e.SUBMISSION_VIEW:return"Submission View";case e.DATASET:return"Dataset";case e.DATASET_COLLECTION:return"Dataset Collection";case e.MATERIALIZED_VIEW:return"Materialized View";case e.VIRTUAL_TABLE:return"Virtual Table";default:return console.warn("Entity type could not be mapped to name:",s),""}}function d(s){if(Object.values(e).includes(s))return s;switch(s){case"org.sagebionetworks.repo.model.Project":return e.PROJECT;case"org.sagebionetworks.repo.model.Folder":return e.FOLDER;case _:return e.FILE;case"org.sagebionetworks.repo.model.Link":return e.LINK;case"org.sagebionetworks.repo.model.docker.DockerRepository":return e.DOCKER_REPO;case T:return e.TABLE;case"org.sagebionetworks.repo.model.table.SubmissionView":return e.SUBMISSION_VIEW;case E:return e.ENTITY_VIEW;case a:return e.DATASET;case i:return e.DATASET_COLLECTION;case l:return e.MATERIALIZED_VIEW;case I:return e.VIRTUAL_TABLE;default:throw new Error(`Unknown entity type: ${s}`)}}function ie(s){switch(s){case e.PROJECT:return"org.sagebionetworks.repo.model.Project";case e.FOLDER:return"org.sagebionetworks.repo.model.Folder";case e.FILE:return"org.sagebionetworks.repo.model.FileEntity";case e.LINK:return"org.sagebionetworks.repo.model.Link";case e.DOCKER_REPO:return"org.sagebionetworks.repo.model.docker.DockerRepository";case e.TABLE:return"org.sagebionetworks.repo.model.table.TableEntity";case e.SUBMISSION_VIEW:return"org.sagebionetworks.repo.model.table.SubmissionView";case e.ENTITY_VIEW:return"org.sagebionetworks.repo.model.table.EntityView";case e.DATASET:return"org.sagebionetworks.repo.model.table.Dataset";case e.DATASET_COLLECTION:return"org.sagebionetworks.repo.model.table.DatasetCollection";case e.MATERIALIZED_VIEW:return"org.sagebionetworks.repo.model.table.MaterializedView";case e.VIRTUAL_TABLE:return"org.sagebionetworks.repo.model.table.VirtualTable";default:throw new Error(`Unknown entity type: ${s}`)}}function M(s){switch(s){case e.PROJECT:case e.FOLDER:case e.LINK:case e.DOCKER_REPO:case e.SUBMISSION_VIEW:case e.MATERIALIZED_VIEW:case e.VIRTUAL_TABLE:return!1;case e.FILE:case e.TABLE:case e.ENTITY_VIEW:case e.DATASET:case e.DATASET_COLLECTION:return!0;default:throw new Error(`Unknown entity type: ${s}`)}}const B=o(...S),Te=o(T),ce=o(L),V=o(a),W=o(i),_e=s=>V(s)||W(s),le=o(E);function Le(s){return(s.viewTypeMask&A)!=0}function Ie(s){return s.viewTypeMask===A}function K(s){return M(d(s.concreteType))}function ue(s){return K(s)?s.isLatestVersion?B(s)?V(s)?"Draft":"Current":`${s.versionNumber.toString()} (Current)`:s.versionNumber.toString():(console.warn("Entity isn't versionable:",s),"")}function v(s){return s.toLowerCase().startsWith("syn")?s.toLowerCase():`syn${s}`}const t=["name","description","id","etag","createdOn","modifiedOn","createdBy","modifiedBy","parentId","concreteType"],N=[...t,"versionNumber","versionLabel","versionComment","isLatestVersion"],n=[...N,"columnIds","isSearchEnabled"],c=[...n],u=[...c,"items"],Ae={[R]:[...t,"linksTo","linksToClassName"],[C]:[...t,"repositoryName","isManaged"],[_]:[...N,"dataFileHandleId","fileNameOverride"],[L]:[...c,"scopeIds"],[a]:[...u,"size","checksum"],[i]:[...u],[E]:[...c,"scopeIds","viewTypeMask","type"],[T]:n,[l]:[...n,"definingSQL"],[I]:[...n,"definingSQL"],[U]:t,[y]:[...t,"alias"]},Ce={ALL_TABLES:[e.TABLE,e.ENTITY_VIEW,e.SUBMISSION_VIEW,e.DATASET,e.DATASET_COLLECTION,e.MATERIALIZED_VIEW,e.VIRTUAL_TABLE],CONTAINER:[e.PROJECT,e.FOLDER]},H=/^10.\d{4,9}\/[-._;()/:a-z0-9]+$/i;function Re(s){return s=s.trim(),H.test(s)?`https://dx.doi.org/${s}`:""}const h=/^(syn\d+)(?:\.(\d+))?$/i;function Oe(s){const r=h.exec(s);return r&&{targetId:v(r[1]),targetVersionNumber:r[2]?parseInt(r[2]):void 0}}export{Ee as A,$ as B,x as C,Le as D,F as E,_ as F,k as G,Z as H,re as I,z as J,ee as K,se as L,j as M,X as N,Te as O,f as P,Ie as Q,h as S,p as T,b as V,_e as a,Ce as b,Re as c,ie as d,ae as e,ne as f,d as g,te as h,le as i,D as j,O as k,V as l,W as m,v as n,ce as o,Oe as p,B as q,M as r,K as s,ue as t,Ae as u,q as v,y as w,oe as x,G as y,Q as z};
