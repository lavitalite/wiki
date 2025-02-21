import type { MarkdownOptions } from "vitepress";
import { groupIconMdPlugin } from "vitepress-plugin-group-icons";
import footnote from 'markdown-it-footnote';

export const markdown: MarkdownOptions = {
  config: (md) => {
    md.use(footnote)
    md.use(groupIconMdPlugin)

    md.renderer.rules.heading_close = (tokens, idx, options, env, slf) => {
      let htmlResult = slf.renderToken(tokens, idx, options);
      if (tokens[idx].tag === 'h1') htmlResult += `\n<ClientOnly><ArticleMetadata v-if="($frontmatter?.aside ?? true) && ($frontmatter?.showArticleMetadata ?? true)" :article="$frontmatter" /></ClientOnly>`;
      return htmlResult;
    }
  }
}