import{l}from"./index-BhHv-35z.js";import{M as h}from"./useFiles-DFdLn1TY.js";import{T as w}from"./TwoFactorAuthEnabledRequirement-BRQ6odxq.js";import"./OrientationBanner-6TFYkqd5.js";import"./jsx-runtime-DoxjgJx5.js";import"./index-Cu9bd8lq.js";import"./spreadSx-CwcO6WA9.js";import"./FullWidthAlert-BvVq9GNb.js";import"./Alert-B6PGsAkP.js";import"./createTheme-BIBP8v0l.js";import"./index-GEGPABih.js";import"./extends-CF3RwP-h.js";import"./styled-DKRXvDfM.js";import"./mergeSlotProps-D9SyexBH.js";import"./isHostComponent-DVu5iVWx.js";import"./useForkRef-Bm_QQ74L.js";import"./createSvgIcon-Dn0UJ7ef.js";import"./Paper-BxvgHMc4.js";import"./IconButton-DhHKwBf8.js";import"./ButtonBase-DSnjMKVu.js";import"./TransitionGroupContext-C4KIfRep.js";import"./useIsFocusVisible-Lp1_y5xp.js";import"./Stack-BbdlCzXz.js";import"./Box-Bt_N9PQN.js";import"./AlertTitle-CCxKidd9.js";import"./Typography-D6GCV-CB.js";import"./utils-B6ltzQPV.js";import"./index-zcEXKDIA.js";import"./Grow-Bb1htYw2.js";import"./ClickAwayListener-Ba-YFlDA.js";import"./ownerDocument-DW-IO8s5.js";import"./Tooltip-CTVx2uGI.js";import"./index-Bn-p0IzE.js";import"./useControlled-JEQ1v-P8.js";import"./useId-g68bhPgm.js";import"./Button-j3jTttn9.js";import"./util-CdUO4X_X.js";import"./index-C2pXwPwl.js";import"./useQuery-BEUP4ZKU.js";import"./utils-BECe8vEQ.js";import"./VerificationSubmission-DL9jxYsQ.js";import"./SynapseConstants-binLeAzi.js";import"./RegularExpressions-SKYrON-T.js";import"./tinycolor-Begke6kS.js";import"./InfoTwoTone-DHgeDUIO.js";import"./CheckCircleTwoTone-B0uYEdLD.js";import"./calculateFriendlyFileSize-DBeyIXBK.js";import"./Skeleton-DxEJ6_Wp.js";import"./inputBaseClasses-Db8tCxfW.js";import"./Fade-DPmnnOI3.js";import"./Link-DPsc3TBb.js";import"./cloneDeep-C-OZ4saa.js";import"./_initCloneObject-CKp18hZk.js";import"./_baseTimes-36S_kd0L.js";import"./isArray-ggc3KxVp.js";import"./StringUtils-tKdMMErg.js";import"./dayjs.min-D1RcYm3-.js";import"./index-BP6kg9I3.js";import"./merge-DLQdEICg.js";import"./identity-DKeuBCMA.js";import"./TwoFactorEnrollmentForm-D4D6IwHI.js";import"./LeftRightPanel-CqinvOCV.js";import"./useTwoFactorEnrollment-BYtWFydn.js";import"./useMutation-BUHlmdy0.js";import"./QueryFilterUtils-f9oQkV3H.js";import"./isNumber-BM-UBS4N.js";import"./TextField-CxQ_xk3E.js";import"./InputLabel-RHZu0c3g.js";import"./useFormControl-vG3XTiAH.js";import"./ownerWindow-BN2rbQ_G.js";import"./isMuiElement-yx-QWTmT.js";import"./LoadingScreen-Be03UZKS.js";import"./Backdrop-CoMkdzxE.js";import"./LinearProgress-DB_pgUJr.js";import"./IconSvg-CesIlRas.js";import"./LayersTwoTone-CUigHRcz.js";import"./ErrorOutlined-BBoV-crm.js";import"./GetAppTwoTone-BoMaJ6Ug.js";import"./InfoOutlined-DE16MDj_.js";import"./DeleteTwoTone-dIAufepT.js";import"./DialogContent-Bs2oSeTu.js";import"./Modal-lb1Ml_1a.js";import"./getScrollbarSize-Bqq2hMjQ.js";import"./createChainedFunction-BO_9K8Jh.js";import"./Divider-Buxfc7OL.js";import"./dividerClasses-wZ44pT98.js";import"./RequirementItem-3L_abKkV.js";import"./ConditionalWrapper-C6_4TcM5.js";import"./Avatar-DCROTjpC.js";const Zt={title:"Governance/Data Access Request Flow/Requirements/TwoFactorAuthEnabledRequirement",component:w,parameters:{stack:"mock"},argTypes:{isAuthenticated:{control:{type:"boolean"}}},args:{isAuthenticated:!0}};function n(c){return[l.rest.get(`${h}/auth/v1/2fa`,async(A,u,o)=>{const d={status:c?"ENABLED":"DISABLED"};return u(o.status(200),o.json(d))})]}const t={parameters:{msw:{handlers:[n(!0)]}}},r={parameters:{msw:{handlers:[n(!1)]}}};var m,p,i;t.parameters={...t.parameters,docs:{...(m=t.parameters)==null?void 0:m.docs,source:{originalSource:`{
  parameters: {
    msw: {
      handlers: [getTwoFactorAuthStatusHandler(true)]
    }
  }
}`,...(i=(p=t.parameters)==null?void 0:p.docs)==null?void 0:i.source}}};var e,a,s;r.parameters={...r.parameters,docs:{...(e=r.parameters)==null?void 0:e.docs,source:{originalSource:`{
  parameters: {
    msw: {
      handlers: [getTwoFactorAuthStatusHandler(false)]
    }
  }
}`,...(s=(a=r.parameters)==null?void 0:a.docs)==null?void 0:s.source}}};const tr=["Enabled","Disabled"];export{r as Disabled,t as Enabled,tr as __namedExportsOrder,Zt as default};
