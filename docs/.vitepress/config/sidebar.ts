import type { DefaultTheme } from "vitepress";
import path, { basename } from 'node:path'
import fs from 'node:fs'
import matter from 'gray-matter';

// sidebar -------------------------------------------------------------------


/**
 * Sidebar Types from vitepress
 *
 * for further details 
 * @see https://github.com/vuejs/vitepress/blob/88101d36cde236117d2b375c8d63227105e3c059/types/default-theme.d.ts#L229 
 */



export const sidebar: DefaultTheme.Config['sidebar'] = buildSidebar({
  docRoot: '',
  ignoreDirs: ['.vitepress', 'public', 'node_modules'],
  groupCollapsedSize: 2,
  onSidebarResolved: (sidebar: DefaultTheme.SidebarMulti) => {
    console.dir(sidebar, { depth: null, colors: true });
    return sidebar
  },
})

interface SidebarOptions {
  dirIndex?: string;
  docRoot?: string;
  titleFromFile?: boolean;
  ignoreFiles?: string[];
  ignoreDirs?: string[];
  groupCollapsedSize: number;
  onSidebarResolved?: (sidebar: DefaultTheme.SidebarMulti) => DefaultTheme.SidebarMulti;
}




/**
 * @param {string} scanPath - scan path relative to srcDir
 * @param {ignoreFolder}
 * @param {ignoreFiles}
 * @param {object} options
 * @param {string} options.dirIndex
 * @param {string} options.docRoot 
 * @param {boolean} options.titleFromFile
 * @param {boolean} options.titleFromConfig
 * @returns {SidebarItem[] | SidebarMulti} 
 */


function buildSidebar(

  options: SidebarOptions
): DefaultTheme.SidebarMulti {
  const {
    docRoot = '',
    titleFromFile = false,
    ignoreDirs = ['.local'],
    groupCollapsedSize = 5,
    onSidebarResolved
  } = options;

  const sidebar: DefaultTheme.SidebarMulti = {};
  const contentPath = path.join(process.cwd(), docRoot)

  const topDirs = fs.readdirSync(contentPath, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory() && !ignoreDirs.includes(dirent.name))
    .map(dirent => dirent.name);

  for (const topDir of topDirs) {
    const topDirPath = path.join(contentPath, topDir)

    const topFiles = fs.readdirSync(topDirPath, { withFileTypes: true })
      .filter(dirent => dirent.isFile() && dirent.name.endsWith('.md'))
      .map(dirent => dirent.name)

    const groups: DefaultTheme.SidebarItem[] = [
      {
        text: formatTitle(topDir),
        collapsed: topFiles.length > groupCollapsedSize,
        items: topFiles.map(file => {
          const baseName = path.basename(file, '.md');
          const filePath = path.join(topDirPath, file)
          const { data } = matter.read(filePath);
          return { text: formatTitle(baseName), link: baseName }
        })
      }
    ]



    const subDirs = fs.readdirSync(topDirPath, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name);


    for (const subDir of subDirs) {
      const subDirPath = path.join(topDirPath, subDir);

      const group = fs.readdirSync(subDirPath)
        .filter(file => file.endsWith('.md'))
        .map(file => {
          const baseName = path.basename(file, '.md');
          const filePath = path.join(subDirPath, file)
          const { data } = matter.read(filePath);
          return {
            text: titleFromFile ? formatTitle(baseName) : data.title || formatTitle(baseName),
            link: `${subDir}/${baseName}`
          };
        });

      groups.push({
        text: formatTitle(subDir),
        collapsed: group.length > groupCollapsedSize,
        items: group
      })
    }

    sidebar[`/${topDir}/`] = {
      base: `/${topDir}/`,
      items: groups
    }
  }
  onSidebarResolved?.(sidebar)
  return sidebar
}


function formatTitle(name: string): string {
  return name
    .split(/[-_]/)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}