import { ssrRenderAttrs } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"Data-API-builder/why-DBA.md","filePath":"Data-API-builder/why-DBA.md"}');
const _sfc_main = { name: "Data-API-builder/why-DBA.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}><p>free, with no premium tier run in cloud. independent of language, technology, and frameworks. It requires zero code and a single configuration file.</p><p>granular security controls</p><p>runtime</p><p>A predicate is an expression that evaluates to TRUE or FALSE. Predicates are used in the search condition of WHERE clauses and HAVING clauses, the join conditions of FROM clauses, and other constructs where a Boolean value is required.</p></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("Data-API-builder/why-DBA.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const whyDBA = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  whyDBA as default
};
