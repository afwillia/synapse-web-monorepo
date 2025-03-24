import{l}from"./index-EtAtWy8s.js";import{M as h}from"./useFiles-Cek6Mpic.js";import{T as w}from"./TwoFactorAuthEnabledRequirement-j2Y0d9j5.js";import"./OrientationBanner-BlRVLq4e.js";import"./jsx-runtime-Du8NFWEI.js";import"./index-Dl6G-zuu.js";import"./index-C43BSGYv.js";import"./spreadSx-CwcO6WA9.js";import"./FullWidthAlert-B22pQuiY.js";import"./Alert-Dcz6JZ5x.js";import"./createTheme-BAeQEIuu.js";import"./index-GEGPABih.js";import"./styled-CVek1lbE.js";import"./mergeSlotProps-D1doMhlu.js";import"./isHostComponent-DVu5iVWx.js";import"./useForkRef-CEBgoE3Z.js";import"./createSvgIcon-DGYn73cf.js";import"./Paper-BMFCclTH.js";import"./IconButton-B2vXFIju.js";import"./ButtonBase-CJOJSfnP.js";import"./TransitionGroupContext-TdpM2qIg.js";import"./useIsFocusVisible-ByxglBfx.js";import"./Stack-Cg5HdmvL.js";import"./Box-DN73Q90z.js";import"./AlertTitle-D21D8EIu.js";import"./Typography-Cqa7rFgc.js";import"./useTheme-DGffmoS1.js";import"./Grow-DPWvTaVu.js";import"./index-BIzb42Jq.js";import"./utils-Cn9x6_1Z.js";import"./ClickAwayListener-D7YV5tOA.js";import"./ownerDocument-DW-IO8s5.js";import"./Tooltip-B_hdhCmy.js";import"./index-OQIcOgx6.js";import"./useControlled-1Y2rT-1r.js";import"./useId-BkqTTtmk.js";import"./Button-jaxqGIs_.js";import"./util-BbuHFHEZ.js";import"./useQuery-6SsvXKRa.js";import"./utils-Bx1BRerw.js";import"./VerificationSubmission-BmZsZ0JS.js";import"./SynapseConstants-BsarzBE5.js";import"./StringUtils-DFpF2_59.js";import"./tinycolor-Begke6kS.js";import"./InfoTwoTone-WscWG_aD.js";import"./CheckCircleTwoTone-ChmDaZaB.js";import"./calculateFriendlyFileSize-6vvdb7nH.js";import"./Skeleton-DmAZtRms.js";import"./inputBaseClasses-BQMLzgta.js";import"./Fade-BK4f5_SW.js";import"./Link-CFsiiapl.js";import"./cloneDeep-CU8tiSOH.js";import"./_initCloneObject-BtS9Lr92.js";import"./isArrayLike-DBJ5VOVB.js";import"./isObjectLike-Cu7zvyZq.js";import"./_baseTimes-36S_kd0L.js";import"./isArray-Dxzbedgu.js";import"./dayjs.min-d18Up55D.js";import"./chunk-K6AXKMTT-B5GX6HSq.js";import"./merge-CvkBQyYg.js";import"./identity-DKeuBCMA.js";import"./_isIterateeCall-DxE_HXvA.js";import"./TwoFactorEnrollmentForm-BP1AFFdZ.js";import"./LeftRightPanel-DBl-dkXe.js";import"./useTwoFactorEnrollment-D7N6DpK9.js";import"./useMutation-DjwfMZ6R.js";import"./QueryFilterUtils-DomWI--t.js";import"./isNumber-BR1aE1rr.js";import"./TextField-7rMRWESn.js";import"./InputLabel-WFlJj3PA.js";import"./useFormControl-CQLCXd-P.js";import"./ownerWindow-BN2rbQ_G.js";import"./isMuiElement-DAcuSkv2.js";import"./LoadingScreen-Cpeaoznz.js";import"./Backdrop-CB6sMj4E.js";import"./LinearProgress-Db_UF_B3.js";import"./IconSvg-ZKdC4hIZ.js";import"./LayersTwoTone-hfVo2OcY.js";import"./ErrorOutlined-Cv1ApGtt.js";import"./GetAppTwoTone-2-W2Mxbb.js";import"./InfoOutlined-BOPmYxHD.js";import"./DeleteTwoTone-BaSxwZ9v.js";import"./DialogContent-M7YUt3e5.js";import"./Modal-CE0HKq0N.js";import"./getScrollbarSize-Bqq2hMjQ.js";import"./createChainedFunction-BO_9K8Jh.js";import"./Divider-D-s4g8h5.js";import"./dividerClasses-Cy1O_LBt.js";import"./RequirementItem-DzUrGVjN.js";import"./ConditionalWrapper-Be926PbJ.js";import"./Avatar-DT6XU38z.js";const rr={title:"Governance/Data Access Request Flow/Requirements/TwoFactorAuthEnabledRequirement",component:w,parameters:{stack:"mock"},argTypes:{isAuthenticated:{control:{type:"boolean"}}},args:{isAuthenticated:!0}};function n(c){return[l.rest.get(`${h}/auth/v1/2fa`,async(A,u,o)=>{const d={status:c?"ENABLED":"DISABLED"};return u(o.status(200),o.json(d))})]}const t={parameters:{msw:{handlers:[n(!0)]}}},r={parameters:{msw:{handlers:[n(!1)]}}};var m,p,i;t.parameters={...t.parameters,docs:{...(m=t.parameters)==null?void 0:m.docs,source:{originalSource:`{
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
}`,...(s=(a=r.parameters)==null?void 0:a.docs)==null?void 0:s.source}}};const or=["Enabled","Disabled"];export{r as Disabled,t as Enabled,or as __namedExportsOrder,rr as default};
