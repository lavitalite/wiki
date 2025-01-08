import { ssrRenderAttrs } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"api/data-api-builder.md","filePath":"api/data-api-builder.md"}');
const _sfc_main = { name: "api/data-api-builder.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}><p>uses the singular name of an entity whenever the query is expected to return a single item.</p><p>uses the plural name of an entity whenever the query is expected to return a list of items.</p><p>book_by_pk(): to return zero or one entity books(): to return a list of zero or more entities</p><p>returning zero or more items support pagination and nextLink:</p><p>create base Configuration <code>dab-config.json</code> Create env-specific Configurations <code>dab-config.dev.json</code><code>dab-config.test.json</code><code>dab-config.prod.json</code></p><p>Setting env <code>DAB_ENVIRONMENT=development</code> or <code>DAB_ENVIRONMENT=production</code> variable determines which set of configurations to apply.</p><p>Accessing environment variables</p><p>&quot;BookDetail&quot;: { &quot;methods&quot;: [ &quot;GET&quot;, &quot;POST&quot; ] &quot;source&quot;: {</p><pre><code>identity provider
db provider
type: &quot;dbObject&quot; | &quot;3rd-endpoint&quot;
&quot;type&quot;: &quot;view&quot; | &quot;endpoint&quot; | &quot;table&quot; | &quot;store-procedure&quot;
&quot;object&quot;: &quot;dbo.vw_books_details&quot;,
&quot;key-fields&quot;: [ &quot;id&quot; ]
</code></pre><p>}, &quot;permissions&quot;: [{ &quot;role&quot;: &quot;anonymous&quot;, &quot;actions&quot;: [ &quot;read&quot; ] }] }</p></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("api/data-api-builder.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const dataApiBuilder = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  dataApiBuilder as default
};
