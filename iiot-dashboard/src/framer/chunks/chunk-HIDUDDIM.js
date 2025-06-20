// @ts-nocheck
/* eslint-disable */
/* This file was generated by Unframer for Framer project 28f3299f349ba0ff "Sense View Web App", do not edit manually */
// /:https://framerusercontent.com/modules/rUAHy8PINjYx54Gv58xv/q9joYUB2cWRVpGzy9rwV/VSiX4AWcw.js
import { jsx as _jsx } from "react/jsx-runtime";
import { addFonts, addPropertyControls, ControlType, cx, RichText, useComponentViewport, useLocaleInfo, useVariantState, withCSS } from "unframer";
import { LayoutGroup, motion, MotionConfigContext } from "unframer";
import * as React from "react";
import { useRef } from "react";
var cycleOrder = ["WPz1Rr9sT", "eHo8hhjIj", "TsDtmrNfF"];
var serializationHash = "framer-HXUNg";
var variantClassNames = { eHo8hhjIj: "framer-v-19wpmpe", TsDtmrNfF: "framer-v-1ygr7fn", WPz1Rr9sT: "framer-v-1yal2kp" };
function addPropertyOverrides(overrides, ...variants) {
  const nextOverrides = {};
  variants?.forEach((variant) => variant && Object.assign(nextOverrides, overrides[variant]));
  return nextOverrides;
}
var transition1 = { bounce: 0.2, delay: 0, duration: 0.4, type: "spring" };
var Transition = ({ value, children }) => {
  const config = React.useContext(MotionConfigContext);
  const transition = value ?? config.transition;
  const contextValue = React.useMemo(() => ({ ...config, transition }), [JSON.stringify(transition)]);
  return /* @__PURE__ */ _jsx(MotionConfigContext.Provider, { value: contextValue, children });
};
var Variants = motion.create(React.Fragment);
var humanReadableVariantMap = { "Desktop Open": "eHo8hhjIj", "Variant 7": "TsDtmrNfF", Desktop: "WPz1Rr9sT" };
var getProps = ({ height, id, text, width, ...props }) => {
  return { ...props, Moadgx10E: text ?? props.Moadgx10E ?? "Pregunta gen\xE9rica", variant: humanReadableVariantMap[props.variant] ?? props.variant ?? "WPz1Rr9sT" };
};
var createLayoutDependency = (props, variants) => {
  if (props.layoutDependency) return variants.join("-") + props.layoutDependency;
  return variants.join("-");
};
var Component = /* @__PURE__ */ React.forwardRef(function(props, ref) {
  const fallbackRef = useRef(null);
  const refBinding = ref ?? fallbackRef;
  const defaultLayoutId = React.useId();
  const { activeLocale, setLocale } = useLocaleInfo();
  const componentViewport = useComponentViewport();
  const { style, className, layoutId, variant, Moadgx10E, ...restProps } = getProps(props);
  const { baseVariant, classNames, clearLoadingGesture, gestureHandlers, gestureVariant, isLoading, setGestureState, setVariant, variants } = useVariantState({ cycleOrder, defaultVariant: "WPz1Rr9sT", ref: refBinding, variant, variantClassNames });
  const layoutDependency = createLayoutDependency(props, variants);
  const sharedStyleClassNames = [];
  const scopingClassNames = cx(serializationHash, ...sharedStyleClassNames);
  const isDisplayed = () => {
    if (baseVariant === "TsDtmrNfF") return false;
    return true;
  };
  return /* @__PURE__ */ _jsx(LayoutGroup, { id: layoutId ?? defaultLayoutId, children: /* @__PURE__ */ _jsx(Variants, { animate: variants, initial: false, children: /* @__PURE__ */ _jsx(Transition, { value: transition1, children: /* @__PURE__ */ _jsx(motion.div, { ...restProps, ...gestureHandlers, className: cx(scopingClassNames, "framer-1yal2kp", className, classNames), "data-framer-name": "Desktop", layoutDependency, layoutId: "WPz1Rr9sT", ref: refBinding, style: { ...style }, ...addPropertyOverrides({ eHo8hhjIj: { "data-framer-name": "Desktop Open" }, TsDtmrNfF: { "data-framer-name": "Variant 7" } }, baseVariant, gestureVariant), children: isDisplayed() && /* @__PURE__ */ _jsx(motion.div, { className: "framer-1m5mgqn", "data-framer-name": "Input", layoutDependency, layoutId: "IU8T879An", style: { backgroundColor: "var(--token-64079a37-4954-41cb-b95d-2e1da3e7982e, rgba(0, 165, 207, 0.2))", borderBottomLeftRadius: 16, borderTopLeftRadius: 16, borderTopRightRadius: 16 }, children: /* @__PURE__ */ _jsx(RichText, { __fromCanvasComponent: true, children: /* @__PURE__ */ _jsx(React.Fragment, { children: /* @__PURE__ */ _jsx(motion.h5, { style: { "--font-selector": "RlM7TWFucm9wZS12YXJpYWJsZVZGPUluZG5hSFFpSURRd01BPT0=", "--framer-font-family": '"Manrope Variable", "Manrope Placeholder", sans-serif', "--framer-font-size": "14px", "--framer-font-variation-axes": 'var(--extracted-198i5e0, "wght" 400)', "--framer-line-height": "1.4em", "--framer-text-color": "var(--extracted-1lwpl3i, var(--token-48c95b4e-44f6-4ac3-b044-c0cab34489dd, rgb(33, 33, 33)))" }, children: "Pregunta gen\xE9rica" }) }), className: "framer-jdnoug", fonts: ["FS;Manrope-variable"], layoutDependency, layoutId: "ibCtji7I1", style: { "--extracted-198i5e0": '"wght" 400', "--extracted-1lwpl3i": "var(--token-48c95b4e-44f6-4ac3-b044-c0cab34489dd, rgb(33, 33, 33))", "--framer-paragraph-spacing": "0px" }, text: Moadgx10E, verticalAlignment: "top", withExternalLayout: true }) }) }) }) }) });
});
var css = ["@supports (aspect-ratio: 1) { body { --framer-aspect-ratio-supported: auto; } }", ".framer-HXUNg.framer-y2vsvv, .framer-HXUNg .framer-y2vsvv { display: block; }", ".framer-HXUNg.framer-1yal2kp { align-content: center; align-items: center; display: flex; flex-direction: column; flex-wrap: nowrap; gap: 10px; height: min-content; justify-content: center; overflow: visible; padding: 0px; position: relative; width: 200px; }", ".framer-HXUNg .framer-1m5mgqn { align-content: center; align-items: center; display: flex; flex: none; flex-direction: row; flex-wrap: nowrap; gap: 10px; height: min-content; justify-content: flex-start; overflow: hidden; padding: 12px; position: relative; width: 100%; will-change: var(--framer-will-change-override, transform); }", ".framer-HXUNg .framer-jdnoug { -webkit-user-select: none; flex: 1 0 0px; height: auto; position: relative; user-select: none; white-space: pre-wrap; width: 1px; word-break: break-word; word-wrap: break-word; }", "@supports (background: -webkit-named-image(i)) and (not (font-palette:dark)) { .framer-HXUNg.framer-1yal2kp, .framer-HXUNg .framer-1m5mgqn { gap: 0px; } .framer-HXUNg.framer-1yal2kp > * { margin: 0px; margin-bottom: calc(10px / 2); margin-top: calc(10px / 2); } .framer-HXUNg.framer-1yal2kp > :first-child { margin-top: 0px; } .framer-HXUNg.framer-1yal2kp > :last-child { margin-bottom: 0px; } .framer-HXUNg .framer-1m5mgqn > * { margin: 0px; margin-left: calc(10px / 2); margin-right: calc(10px / 2); } .framer-HXUNg .framer-1m5mgqn > :first-child { margin-left: 0px; } .framer-HXUNg .framer-1m5mgqn > :last-child { margin-right: 0px; } }", ".framer-HXUNg.framer-v-19wpmpe.framer-1yal2kp { padding: 0px 0px 0px 80px; width: 279px; }", ".framer-HXUNg.framer-v-1ygr7fn.framer-1yal2kp { min-height: 44px; padding: 0px 0px 0px 80px; width: 296px; }"];
var FramerVSiX4AWcw = withCSS(Component, css, "framer-HXUNg");
var stdin_default = FramerVSiX4AWcw;
FramerVSiX4AWcw.displayName = "UserMsg";
FramerVSiX4AWcw.defaultProps = { height: 44, width: 200 };
addPropertyControls(FramerVSiX4AWcw, { variant: { options: ["WPz1Rr9sT", "eHo8hhjIj", "TsDtmrNfF"], optionTitles: ["Desktop", "Desktop Open", "Variant 7"], title: "Variant", type: ControlType.Enum }, Moadgx10E: { defaultValue: "Pregunta gen\xE9rica", displayTextArea: false, title: "Text", type: ControlType.String } });
var variationAxes = [{ defaultValue: 200, maxValue: 800, minValue: 200, name: "Weight", tag: "wght" }];
addFonts(FramerVSiX4AWcw, [{ explicitInter: true, fonts: [{ family: "Manrope", source: "fontshare", style: "normal", url: "https://framerusercontent.com/third-party-assets/fontshare/wf/6KNUAYMK3PTPQA22366IWF5JUVT35NZ3/E4CLT6PE4W64IV56BHAWFRZFLHPZIXFF/DEPNXL2T77QGX4DXZAN3G53TXHO2JEFP.woff2", variationAxes, weight: "400" }] }], { supportsExplicitInterCodegen: true });

export {
  stdin_default
};
