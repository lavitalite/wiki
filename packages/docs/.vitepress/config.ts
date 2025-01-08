
import { defineConfig } from "vitepress"
import { groupIconMdPlugin } from 'vitepress-plugin-group-icons'
import { fileURLToPath } from 'node:url'

export const BASE_PATH = '/wiki/'
export default defineConfig({
  srcDir: 'content',
  base: BASE_PATH,
  outDir: 'dist',
  cacheDir: 'cache',
  markdown: {
    config: (md) => {
      md.use(groupIconMdPlugin)
      const defaultRender = md.renderer.rules.image
      // image alias
      md.renderer.rules.image = (
        tokens,
        idx: number,
        options,
        env: any,
        self
      ) => {
        const token = tokens[idx];
        const attrs = token.attrs;

        if (!attrs) {
          return defaultRender!(tokens, idx, options, env, self);
        }

        const srcIndex = attrs.findIndex(([attr]) => attr === 'src');
        if (srcIndex >= 0) {
          const [attr, value] = attrs[srcIndex];

          // 确保路径是正确的
          if (value.startsWith('@oss/')) {
            const resolvedPath = value.replace(/^@oss\//, ''); // 移除前缀
            attrs[srcIndex][1] = `${BASE_PATH}oss/${resolvedPath}`; // 拼接相对路径
          }
        }

        return self.renderToken(tokens, idx, options);
      };
    }

  },
  vite: {
    configFile: fileURLToPath(import.meta.resolve('../vite.config.ts'))
  },
  themeConfig: {
    // theme-level options
  }
})