// @ts-nocheck
/* eslint-disable */
/* This file was generated by Unframer for Framer project 28f3299f349ba0ff "Sense View Web App", do not edit manually */
"use client";
import {
  stdin_default
} from "./chunks/chunk-OQF75XUF.js";
import "./chunks/chunk-K5HAYHV7.js";

// virtual:line-menu-mobile-and-tablet
import { Fragment as Fragment2 } from "react";
import { ContextProviders } from "unframer";

// /:https://framerusercontent.com/modules/tmH6ipmIpSjix6oQHYr1/urp8bXCev2NbTmxwdGCP/bma95wcen.js
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { addFonts, addPropertyControls, ComponentViewportProvider, ControlType, cx, Floating, getFonts, SmartComponentScopedContainer, useActiveVariantCallback, useComponentViewport, useLocaleInfo, useOverlayState, useVariantState, withCSS, withFX } from "unframer";
import { AnimatePresence, LayoutGroup, motion, MotionConfigContext } from "unframer";
import * as React from "react";
import { useRef as useRef2 } from "react";
var LeftMenuItemFonts = getFonts(stdin_default);
var MotionDivWithFX = withFX(motion.div);
var cycleOrder = ["BwaTwtAmM", "EiUGiQikS"];
var serializationHash = "framer-wJnAI";
var variantClassNames = { BwaTwtAmM: "framer-v-1tctlfy", EiUGiQikS: "framer-v-1fppbkl" };
function addPropertyOverrides(overrides, ...variants) {
  const nextOverrides = {};
  variants?.forEach((variant) => variant && Object.assign(nextOverrides, overrides[variant]));
  return nextOverrides;
}
var transition1 = { bounce: 0.2, delay: 0, duration: 0.4, type: "spring" };
var transition2 = { delay: 0, duration: 0.15, ease: [0.44, 0, 0.56, 1], type: "tween" };
var animation = { opacity: 1, rotate: 0, rotateX: 0, rotateY: 0, scale: 1, skewX: 0, skewY: 0, transition: transition2 };
var animation1 = { opacity: 0, rotate: 0, rotateX: 0, rotateY: 0, scale: 1, skewX: 0, skewY: 0, transition: transition1, x: 0, y: 0 };
var animation2 = { opacity: 1, rotate: 0, rotateX: 0, rotateY: 0, scale: 1, skewX: 0, skewY: 0, transition: transition1, x: 0, y: 0 };
var animation3 = { opacity: 0, rotate: 0, rotateX: 0, rotateY: 0, scale: 1, skewX: 0, skewY: 0, x: 0, y: 0 };
var Transition = ({ value, children }) => {
  const config = React.useContext(MotionConfigContext);
  const transition = value ?? config.transition;
  const contextValue = React.useMemo(() => ({ ...config, transition }), [JSON.stringify(transition)]);
  return /* @__PURE__ */ _jsx(MotionConfigContext.Provider, { value: contextValue, children });
};
var Overlay = ({ children, blockDocumentScrolling, enabled = true }) => {
  const [visible, setVisible] = useOverlayState({ blockDocumentScrolling });
  return children({ hide: () => setVisible(false), show: () => setVisible(true), toggle: () => setVisible(!visible), visible: enabled && visible });
};
var Variants = motion.create(React.Fragment);
var humanReadableVariantMap = { PHONE: "EiUGiQikS", TABLET: "BwaTwtAmM" };
var getProps = ({ height, id, width, ...props }) => {
  return { ...props, variant: humanReadableVariantMap[props.variant] ?? props.variant ?? "BwaTwtAmM" };
};
var createLayoutDependency = (props, variants) => {
  if (props.layoutDependency) return variants.join("-") + props.layoutDependency;
  return variants.join("-");
};
var Component = /* @__PURE__ */ React.forwardRef(function(props, ref) {
  const fallbackRef = useRef2(null);
  const refBinding = ref ?? fallbackRef;
  const defaultLayoutId = React.useId();
  const { activeLocale, setLocale } = useLocaleInfo();
  const componentViewport = useComponentViewport();
  const { style, className, layoutId, variant, ...restProps } = getProps(props);
  const { baseVariant, classNames, clearLoadingGesture, gestureHandlers, gestureVariant, isLoading, setGestureState, setVariant, variants } = useVariantState({ cycleOrder, defaultVariant: "BwaTwtAmM", ref: refBinding, variant, variantClassNames });
  const layoutDependency = createLayoutDependency(props, variants);
  const { activeVariantCallback, delay } = useActiveVariantCallback(baseVariant);
  const onTap1ebxqwi = ({ overlay, loadMore }) => activeVariantCallback(async (...args) => {
    setGestureState({ isPressed: false });
    overlay.show();
  });
  const sharedStyleClassNames = [];
  const scopingClassNames = cx(serializationHash, ...sharedStyleClassNames);
  const ref1 = React.useRef(null);
  return /* @__PURE__ */ _jsx(LayoutGroup, { id: layoutId ?? defaultLayoutId, children: /* @__PURE__ */ _jsx(Variants, { animate: variants, initial: false, children: /* @__PURE__ */ _jsx(Overlay, { blockDocumentScrolling: false, children: (overlay) => /* @__PURE__ */ _jsx(_Fragment, { children: /* @__PURE__ */ _jsx(Transition, { value: transition1, children: /* @__PURE__ */ _jsxs(motion.div, { ...restProps, ...gestureHandlers, className: cx(scopingClassNames, "framer-1tctlfy", className, classNames), "data-framer-name": "TABLET", "data-highlight": true, id: `${layoutId}-1tctlfy`, layoutDependency, layoutId: "BwaTwtAmM", onTap: onTap1ebxqwi({ overlay }), ref: refBinding, style: { backgroundColor: "var(--token-931eace7-06cb-44e8-ac4a-af55fae6144b, rgb(255, 255, 255))", ...style }, ...addPropertyOverrides({ EiUGiQikS: { "data-framer-name": "PHONE" } }, baseVariant, gestureVariant), children: [/* @__PURE__ */ _jsx(motion.div, { className: "framer-113yv84", layoutDependency, layoutId: "GKfmvXHou", style: { backgroundColor: "var(--token-4bd2e29c-7da8-4c62-8d92-a0eae155ad0d, rgb(207, 207, 207))" } }), /* @__PURE__ */ _jsx(motion.div, { className: "framer-b3o1np", layoutDependency, layoutId: "JZQFtwBDt", style: { backgroundColor: "var(--token-931eace7-06cb-44e8-ac4a-af55fae6144b, rgb(255, 255, 255))" }, children: /* @__PURE__ */ _jsx(ComponentViewportProvider, { height: 41, y: (componentViewport?.y || 0) + 0 + (((componentViewport?.height || 58) - 0 - 58) / 2 + 1 + 0) + 8, children: /* @__PURE__ */ _jsx(SmartComponentScopedContainer, { className: "framer-o989jv-container", "data-framer-name": "L\xEDnea A1", layoutDependency, layoutId: "UnVyMx6ZB-container", name: "L\xEDnea A1", nodeId: "UnVyMx6ZB", rendersWithMotion: true, scopeId: "bma95wcen", whileHover: animation, children: /* @__PURE__ */ _jsx(stdin_default, { height: "100%", id: "UnVyMx6ZB", layoutId: "UnVyMx6ZB", name: "L\xEDnea A1", OPIM6lSNh: true, THGUCRQNd: true, variant: "QVsXp_y2O", width: "100%", xU9Xy0p3Y: "L\xEDnea A1 - OEE" }) }) }) }), /* @__PURE__ */ _jsx(AnimatePresence, { children: overlay.visible && /* @__PURE__ */ _jsx(Floating, { alignment: "center", anchorRef: refBinding, className: cx(scopingClassNames, classNames), collisionDetection: true, collisionDetectionPadding: 0, "data-framer-portal-id": `${layoutId}-1tctlfy`, offsetX: 0, offsetY: 8, onDismiss: overlay.hide, placement: "bottom", safeArea: false, zIndex: 11, children: /* @__PURE__ */ _jsxs(MotionDivWithFX, { __perspectiveFX: false, __smartComponentFX: true, __targetOpacity: 1, animate: animation2, className: "framer-3v7slx", "data-border": true, exit: animation1, initial: animation3, layoutDependency, layoutId: "bF5U_qu1d", ref: ref1, role: "dialog", style: { "--border-bottom-width": "1px", "--border-color": "var(--token-4bd2e29c-7da8-4c62-8d92-a0eae155ad0d, rgb(207, 207, 207))", "--border-left-width": "1px", "--border-right-width": "1px", "--border-style": "solid", "--border-top-width": "1px", backgroundColor: "var(--token-931eace7-06cb-44e8-ac4a-af55fae6144b, rgb(255, 255, 255))", borderBottomLeftRadius: 16, borderBottomRightRadius: 16, borderTopLeftRadius: 16, borderTopRightRadius: 16, boxShadow: "0px 10px 20px 0px rgba(0,0,0,0.05)" }, children: [/* @__PURE__ */ _jsx(ComponentViewportProvider, { children: /* @__PURE__ */ _jsx(SmartComponentScopedContainer, { className: "framer-jmu88m-container", layoutDependency, layoutId: "P6Bem9tfq-container", nodeId: "P6Bem9tfq", rendersWithMotion: true, scopeId: "bma95wcen", children: /* @__PURE__ */ _jsx(stdin_default, { height: "100%", id: "P6Bem9tfq", layoutId: "P6Bem9tfq", OPIM6lSNh: false, THGUCRQNd: true, variant: "QVsXp_y2O", width: "100%", xU9Xy0p3Y: "L\xEDnea A1 - OEE" }) }) }), /* @__PURE__ */ _jsx(motion.div, { className: "framer-1chk4kh", layoutDependency, layoutId: "NS9T7cYkV", style: { backgroundColor: "var(--token-4bd2e29c-7da8-4c62-8d92-a0eae155ad0d, rgb(207, 207, 207))" } }), /* @__PURE__ */ _jsx(ComponentViewportProvider, { children: /* @__PURE__ */ _jsx(SmartComponentScopedContainer, { className: "framer-yfrkpp-container", layoutDependency, layoutId: "bKzah3MnO-container", nodeId: "bKzah3MnO", rendersWithMotion: true, scopeId: "bma95wcen", children: /* @__PURE__ */ _jsx(stdin_default, { height: "100%", id: "bKzah3MnO", layoutId: "bKzah3MnO", OPIM6lSNh: false, THGUCRQNd: true, variant: "QVsXp_y2O", width: "100%", xU9Xy0p3Y: "L\xEDnea A1 - Nivel" }) }) }), /* @__PURE__ */ _jsx(motion.div, { className: "framer-6tpe8a", layoutDependency, layoutId: "UQZQlOSeo", style: { backgroundColor: "var(--token-4bd2e29c-7da8-4c62-8d92-a0eae155ad0d, rgb(207, 207, 207))" } }), /* @__PURE__ */ _jsx(ComponentViewportProvider, { children: /* @__PURE__ */ _jsx(SmartComponentScopedContainer, { className: "framer-sil9mx-container", layoutDependency, layoutId: "uMxNJ6Z3w-container", nodeId: "uMxNJ6Z3w", rendersWithMotion: true, scopeId: "bma95wcen", children: /* @__PURE__ */ _jsx(stdin_default, { height: "100%", id: "uMxNJ6Z3w", layoutId: "uMxNJ6Z3w", OPIM6lSNh: false, THGUCRQNd: true, variant: "QVsXp_y2O", width: "100%", xU9Xy0p3Y: "L\xEDnea A1 - Presi\xF3n" }) }) }), /* @__PURE__ */ _jsx(motion.div, { className: "framer-116wxm8", layoutDependency, layoutId: "m9lBNnSqb", style: { backgroundColor: "var(--token-4bd2e29c-7da8-4c62-8d92-a0eae155ad0d, rgb(207, 207, 207))" } }), /* @__PURE__ */ _jsx(ComponentViewportProvider, { children: /* @__PURE__ */ _jsx(SmartComponentScopedContainer, { className: "framer-6nrukz-container", layoutDependency, layoutId: "Rwo64PI4u-container", nodeId: "Rwo64PI4u", rendersWithMotion: true, scopeId: "bma95wcen", children: /* @__PURE__ */ _jsx(stdin_default, { height: "100%", id: "Rwo64PI4u", layoutId: "Rwo64PI4u", OPIM6lSNh: false, THGUCRQNd: true, variant: "QVsXp_y2O", width: "100%", xU9Xy0p3Y: "L\xEDnea A2 - OEE" }) }) }), /* @__PURE__ */ _jsx(motion.div, { className: "framer-16u6ppl", layoutDependency, layoutId: "W9LCHSSe9", style: { backgroundColor: "var(--token-4bd2e29c-7da8-4c62-8d92-a0eae155ad0d, rgb(207, 207, 207))" } }), /* @__PURE__ */ _jsx(ComponentViewportProvider, { children: /* @__PURE__ */ _jsx(SmartComponentScopedContainer, { className: "framer-7a60j1-container", layoutDependency, layoutId: "G4t8kmJgb-container", nodeId: "G4t8kmJgb", rendersWithMotion: true, scopeId: "bma95wcen", children: /* @__PURE__ */ _jsx(stdin_default, { height: "100%", id: "G4t8kmJgb", layoutId: "G4t8kmJgb", OPIM6lSNh: false, THGUCRQNd: true, variant: "QVsXp_y2O", width: "100%", xU9Xy0p3Y: "L\xEDnea A2 - Nivel" }) }) }), /* @__PURE__ */ _jsx(motion.div, { className: "framer-16ykq4i", layoutDependency, layoutId: "TofLZ1gc3", style: { backgroundColor: "var(--token-4bd2e29c-7da8-4c62-8d92-a0eae155ad0d, rgb(207, 207, 207))" } }), /* @__PURE__ */ _jsx(ComponentViewportProvider, { children: /* @__PURE__ */ _jsx(SmartComponentScopedContainer, { className: "framer-8xcjx0-container", layoutDependency, layoutId: "CaJK050Sz-container", nodeId: "CaJK050Sz", rendersWithMotion: true, scopeId: "bma95wcen", children: /* @__PURE__ */ _jsx(stdin_default, { height: "100%", id: "CaJK050Sz", layoutId: "CaJK050Sz", OPIM6lSNh: false, THGUCRQNd: true, variant: "QVsXp_y2O", width: "100%", xU9Xy0p3Y: "L\xEDnea A2 - Presi\xF3n" }) }) }), /* @__PURE__ */ _jsx(motion.div, { className: "framer-dr2aqp", layoutDependency, layoutId: "iJ_Otus1o", style: { backgroundColor: "var(--token-4bd2e29c-7da8-4c62-8d92-a0eae155ad0d, rgb(207, 207, 207))" } }), /* @__PURE__ */ _jsx(ComponentViewportProvider, { children: /* @__PURE__ */ _jsx(SmartComponentScopedContainer, { className: "framer-10em5zu-container", layoutDependency, layoutId: "K0jGm4h3W-container", nodeId: "K0jGm4h3W", rendersWithMotion: true, scopeId: "bma95wcen", children: /* @__PURE__ */ _jsx(stdin_default, { height: "100%", id: "K0jGm4h3W", layoutId: "K0jGm4h3W", OPIM6lSNh: false, THGUCRQNd: true, variant: "QVsXp_y2O", width: "100%", xU9Xy0p3Y: "L\xEDnea B1 - OEE" }) }) })] }) }) })] }) }) }) }) }) });
});
var css = ["@supports (aspect-ratio: 1) { body { --framer-aspect-ratio-supported: auto; } }", ".framer-wJnAI.framer-1w4u2v8, .framer-wJnAI .framer-1w4u2v8 { display: block; }", ".framer-wJnAI.framer-1tctlfy { align-content: center; align-items: center; cursor: pointer; display: flex; flex-direction: column; flex-wrap: nowrap; gap: 0px; height: min-content; justify-content: center; overflow: hidden; padding: 0px; position: relative; width: 810px; }", ".framer-wJnAI .framer-113yv84 { align-content: center; align-items: center; display: flex; flex: none; flex-direction: row; flex-wrap: nowrap; gap: 10px; height: 1px; justify-content: center; overflow: hidden; padding: 0px; position: relative; width: 100%; }", ".framer-wJnAI .framer-b3o1np { align-content: center; align-items: center; display: flex; flex: none; flex-direction: row; flex-wrap: nowrap; gap: 16px; height: min-content; justify-content: flex-start; padding: 8px 24px 8px 24px; position: relative; width: min-content; }", ".framer-wJnAI .framer-o989jv-container { flex: none; height: auto; position: relative; width: auto; will-change: var(--framer-will-change-effect-override, transform); }", ".framer-wJnAI .framer-3v7slx { align-content: center; align-items: center; display: flex; flex-direction: column; flex-wrap: nowrap; gap: 0px; height: min-content; justify-content: center; overflow: hidden; padding: 16px; position: relative; width: min-content; will-change: var(--framer-will-change-override, transform); }", ".framer-wJnAI .framer-jmu88m-container, .framer-wJnAI .framer-yfrkpp-container, .framer-wJnAI .framer-sil9mx-container, .framer-wJnAI .framer-6nrukz-container, .framer-wJnAI .framer-7a60j1-container, .framer-wJnAI .framer-8xcjx0-container, .framer-wJnAI .framer-10em5zu-container { flex: none; height: auto; position: relative; width: auto; }", ".framer-wJnAI .framer-1chk4kh, .framer-wJnAI .framer-6tpe8a, .framer-wJnAI .framer-116wxm8, .framer-wJnAI .framer-16u6ppl, .framer-wJnAI .framer-16ykq4i, .framer-wJnAI .framer-dr2aqp { align-content: center; align-items: center; align-self: stretch; display: flex; flex: none; flex-direction: row; flex-wrap: nowrap; gap: 10px; height: 1px; justify-content: center; overflow: hidden; padding: 0px; position: relative; width: auto; }", "@supports (background: -webkit-named-image(i)) and (not (font-palette:dark)) { .framer-wJnAI.framer-1tctlfy, .framer-wJnAI .framer-113yv84, .framer-wJnAI .framer-b3o1np, .framer-wJnAI .framer-3v7slx, .framer-wJnAI .framer-1chk4kh, .framer-wJnAI .framer-6tpe8a, .framer-wJnAI .framer-116wxm8, .framer-wJnAI .framer-16u6ppl, .framer-wJnAI .framer-16ykq4i, .framer-wJnAI .framer-dr2aqp { gap: 0px; } .framer-wJnAI.framer-1tctlfy > *, .framer-wJnAI .framer-3v7slx > * { margin: 0px; margin-bottom: calc(0px / 2); margin-top: calc(0px / 2); } .framer-wJnAI.framer-1tctlfy > :first-child, .framer-wJnAI .framer-3v7slx > :first-child { margin-top: 0px; } .framer-wJnAI.framer-1tctlfy > :last-child, .framer-wJnAI .framer-3v7slx > :last-child { margin-bottom: 0px; } .framer-wJnAI .framer-113yv84 > *, .framer-wJnAI .framer-1chk4kh > *, .framer-wJnAI .framer-6tpe8a > *, .framer-wJnAI .framer-116wxm8 > *, .framer-wJnAI .framer-16u6ppl > *, .framer-wJnAI .framer-16ykq4i > *, .framer-wJnAI .framer-dr2aqp > * { margin: 0px; margin-left: calc(10px / 2); margin-right: calc(10px / 2); } .framer-wJnAI .framer-113yv84 > :first-child, .framer-wJnAI .framer-b3o1np > :first-child, .framer-wJnAI .framer-1chk4kh > :first-child, .framer-wJnAI .framer-6tpe8a > :first-child, .framer-wJnAI .framer-116wxm8 > :first-child, .framer-wJnAI .framer-16u6ppl > :first-child, .framer-wJnAI .framer-16ykq4i > :first-child, .framer-wJnAI .framer-dr2aqp > :first-child { margin-left: 0px; } .framer-wJnAI .framer-113yv84 > :last-child, .framer-wJnAI .framer-b3o1np > :last-child, .framer-wJnAI .framer-1chk4kh > :last-child, .framer-wJnAI .framer-6tpe8a > :last-child, .framer-wJnAI .framer-116wxm8 > :last-child, .framer-wJnAI .framer-16u6ppl > :last-child, .framer-wJnAI .framer-16ykq4i > :last-child, .framer-wJnAI .framer-dr2aqp > :last-child { margin-right: 0px; } .framer-wJnAI .framer-b3o1np > * { margin: 0px; margin-left: calc(16px / 2); margin-right: calc(16px / 2); } }", ".framer-wJnAI.framer-v-1fppbkl.framer-1tctlfy { width: 390px; }", ".framer-wJnAI.framer-v-1fppbkl .framer-3v7slx { width: 392px; }", ".framer-wJnAI.framer-v-1fppbkl .framer-1chk4kh, .framer-wJnAI.framer-v-1fppbkl .framer-6tpe8a, .framer-wJnAI.framer-v-1fppbkl .framer-116wxm8, .framer-wJnAI.framer-v-1fppbkl .framer-16u6ppl, .framer-wJnAI.framer-v-1fppbkl .framer-16ykq4i, .framer-wJnAI.framer-v-1fppbkl .framer-dr2aqp { align-self: unset; width: 100%; }", '.framer-wJnAI[data-border="true"]::after, .framer-wJnAI [data-border="true"]::after { content: ""; border-width: var(--border-top-width, 0) var(--border-right-width, 0) var(--border-bottom-width, 0) var(--border-left-width, 0); border-color: var(--border-color, none); border-style: var(--border-style, none); width: 100%; height: 100%; position: absolute; box-sizing: border-box; left: 0; top: 0; border-radius: inherit; pointer-events: none; }'];
var Framerbma95wcen = withCSS(Component, css, "framer-wJnAI");
var stdin_default2 = Framerbma95wcen;
Framerbma95wcen.displayName = "Line menu mobile and tablet";
Framerbma95wcen.defaultProps = { height: 58, width: 810 };
addPropertyControls(Framerbma95wcen, { variant: { options: ["BwaTwtAmM", "EiUGiQikS"], optionTitles: ["TABLET", "PHONE"], title: "Variant", type: ControlType.Enum } });
addFonts(Framerbma95wcen, [{ explicitInter: true, fonts: [] }, ...LeftMenuItemFonts], { supportsExplicitInterCodegen: true });

// virtual:line-menu-mobile-and-tablet
import { WithFramerBreakpoints } from "unframer";
import { jsx } from "react/jsx-runtime";
var locales = [];
var defaultResponsiveVariants = {};
stdin_default2.Responsive = ({ locale, ...rest }) => {
  return /* @__PURE__ */ jsx(
    ContextProviders,
    {
      routes: { "OJApodFFO": { "path": "/blog/:slug" }, "Pt3zunCXR": { "path": "/blog" }, "augiA20Il": { "path": "/" } },
      children: /* @__PURE__ */ jsx(
        WithFramerBreakpoints,
        {
          Component: stdin_default2,
          variants: defaultResponsiveVariants,
          ...rest
        }
      ),
      framerSiteId: "28f3299f349ba0ffbaf4514e332ff2a5359687cd1069128f47d2d61a42e84f16",
      locale,
      locales
    }
  );
};
function ComponentWithRoot({ locale, ...rest }) {
  return /* @__PURE__ */ jsx(
    ContextProviders,
    {
      routes: {
        "OJApodFFO": {
          "path": "/blog/:slug"
        },
        "Pt3zunCXR": {
          "path": "/blog"
        },
        "augiA20Il": {
          "path": "/"
        }
      },
      children: /* @__PURE__ */ jsx(stdin_default2, { ...rest }),
      framerSiteId: "28f3299f349ba0ffbaf4514e332ff2a5359687cd1069128f47d2d61a42e84f16",
      locale,
      locales
    }
  );
}
Object.assign(ComponentWithRoot, stdin_default2);
export {
  ComponentWithRoot as default
};
