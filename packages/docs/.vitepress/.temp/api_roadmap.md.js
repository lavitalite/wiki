import { ssrRenderAttrs } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"api/roadmap.md","filePath":"api/roadmap.md"}');
const _sfc_main = { name: "api/roadmap.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}><p>API Design API Development API Documenting API Testing API Mocking and Virtualization API Governance API Monitoring API Security API Insight API monetization 3rd-party API connection (config-driven ) Evolving API Ecosystems</p><p>graphql rest</p><p>developer platform Open API API hub</p><p>is expected to return a single item.</p><p>orm dizzle prisma db oss</p><p>configuration-as-code (CaC) integrate with GitOps or continuous delivery workflows</p><p>, cloud-native architecture</p><p>automatic deployment</p><p>integration</p><p>reaplceble</p></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("api/roadmap.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const roadmap = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  roadmap as default
};
