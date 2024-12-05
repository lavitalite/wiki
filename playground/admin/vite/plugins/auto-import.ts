import autoImport from 'unplugin-auto-import/vite'

export default function createAutoImport() {
  return autoImport({
    imports: [
      'vue',
      'vue-router',
      'pinia'
    ],
    dts: true,
    /** types for global registered components */
    types: [{
      from: 'vue-router',
      namse: ['RouterLink', 'RouterView']
    }]
  })
}