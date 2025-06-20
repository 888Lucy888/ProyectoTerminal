// @ts-nocheck
/* eslint-disable */
/* This file was generated by Unframer for Framer project 28f3299f349ba0ff "Sense View Web App", do not edit manually */
// /:https://framerusercontent.com/modules/8kVLrOc6Q1PwYBzP7TFB/7alPS1iUjBlBQfS73BAd/ixOf7_OYG.js
import { jsx as _jsx } from "react/jsx-runtime";
import { addFonts, cx, SVG, useComponentViewport, useLocaleInfo, useVariantState, withCSS } from "unframer";
import { LayoutGroup, motion, MotionConfigContext } from "unframer";
import * as React from "react";
import { useRef } from "react";
var serializationHash = "framer-IjpPE";
var variantClassNames = { hLQXkiylr: "framer-v-17c3d0t" };
var transition1 = { bounce: 0.2, delay: 0, duration: 0.4, type: "spring" };
var Transition = ({ value, children }) => {
  const config = React.useContext(MotionConfigContext);
  const transition = value ?? config.transition;
  const contextValue = React.useMemo(() => ({ ...config, transition }), [JSON.stringify(transition)]);
  return /* @__PURE__ */ _jsx(MotionConfigContext.Provider, { value: contextValue, children });
};
var Variants = motion.create(React.Fragment);
var getProps = ({ height, id, width, ...props }) => {
  return { ...props };
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
  const { style, className, layoutId, variant, ...restProps } = getProps(props);
  const { baseVariant, classNames, clearLoadingGesture, gestureHandlers, gestureVariant, isLoading, setGestureState, setVariant, variants } = useVariantState({ defaultVariant: "hLQXkiylr", ref: refBinding, variant, variantClassNames });
  const layoutDependency = createLayoutDependency(props, variants);
  const sharedStyleClassNames = [];
  const scopingClassNames = cx(serializationHash, ...sharedStyleClassNames);
  return /* @__PURE__ */ _jsx(LayoutGroup, { id: layoutId ?? defaultLayoutId, children: /* @__PURE__ */ _jsx(Variants, { animate: variants, initial: false, children: /* @__PURE__ */ _jsx(Transition, { value: transition1, children: /* @__PURE__ */ _jsx(motion.div, { ...restProps, ...gestureHandlers, className: cx(scopingClassNames, "framer-17c3d0t", className, classNames), "data-framer-name": "Variant 1", layoutDependency, layoutId: "hLQXkiylr", ref: refBinding, style: { ...style }, children: /* @__PURE__ */ _jsx(SVG, { className: "framer-699nob", "data-framer-name": "Headset mic", layout: "position", layoutDependency, layoutId: "fkVcJasNB", opacity: 1, svg: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 41 40"><g transform="translate(6.867 5)" id="ss10867175319_1"><path d="M 13.333 30.641 L 13.333 28.974 L 23.973 28.974 C 24.248 28.984 24.515 28.88 24.711 28.686 C 24.905 28.491 25.009 28.224 25 27.949 L 25 26.667 L 19.871 26.667 L 19.871 16.41 L 25 16.41 L 25 13.333 C 25 10.111 23.86 7.361 21.583 5.083 C 19.305 2.806 16.555 1.667 13.333 1.667 C 10.111 1.667 7.361 2.806 5.083 5.083 C 2.805 7.361 1.666 10.111 1.666 13.333 L 1.666 16.41 L 6.795 16.41 L 6.795 26.667 L 2.692 26.667 C 1.925 26.667 1.284 26.41 0.771 25.896 C 0.257 25.382 0 24.741 0 23.974 L 0 13.334 C 0 11.491 0.347 9.762 1.043 8.146 C 1.716 6.562 2.687 5.122 3.903 3.904 C 5.121 2.688 6.561 1.717 8.145 1.044 C 9.763 0.347 11.491 0 13.333 0 C 15.175 0 16.904 0.348 18.521 1.043 C 20.105 1.716 21.545 2.687 22.763 3.903 C 23.979 5.121 24.95 6.562 25.623 8.146 C 26.319 9.762 26.666 11.491 26.666 13.333 L 26.666 27.95 C 26.666 28.717 26.409 29.357 25.896 29.871 C 25.382 30.385 24.741 30.642 23.974 30.642 L 13.333 30.642 Z M 2.693 25 L 5.128 25 L 5.128 18.077 L 1.666 18.077 L 1.666 23.974 C 1.657 24.249 1.761 24.516 1.955 24.712 C 2.151 24.905 2.417 25.009 2.692 25 Z M 21.538 25 L 25 25 L 25 18.077 L 21.538 18.077 Z" fill="var(--token-48c95b4e-44f6-4ac3-b044-c0cab34489dd, rgb(33, 33, 33)) /* {&quot;name&quot;:&quot;Text primary&quot;} */"></path></g></svg>', svgContentId: 10867175319, withExternalLayout: true }) }) }) }) });
});
var css = ["@supports (aspect-ratio: 1) { body { --framer-aspect-ratio-supported: auto; } }", ".framer-IjpPE.framer-11lq2fn, .framer-IjpPE .framer-11lq2fn { display: block; }", ".framer-IjpPE.framer-17c3d0t { cursor: pointer; height: 40px; overflow: hidden; position: relative; width: 41px; }", ".framer-IjpPE .framer-699nob { flex: none; height: 40px; left: 0px; position: absolute; top: 0px; width: 41px; }"];
var FramerixOf7_OYG = withCSS(Component, css, "framer-IjpPE");
var stdin_default = FramerixOf7_OYG;
FramerixOf7_OYG.displayName = "Headset mic";
FramerixOf7_OYG.defaultProps = { height: 40, width: 41 };
addFonts(FramerixOf7_OYG, [{ explicitInter: true, fonts: [] }], { supportsExplicitInterCodegen: true });

export {
  stdin_default
};
