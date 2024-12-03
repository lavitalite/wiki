import {createSbgIconsPlugin} from 'vite-plugin-svg-icons'
import path from 'node:path'

export default function createSvgIcon(isBuild) {
  return createSvgIconPlugin({
    iconDirs: [path.resolve(process.cwd()), 'src/assets/icon/svg'],
    symbolId: 'icon-[dir]-[name]',
    svgOptions: isBuild
  })
}
