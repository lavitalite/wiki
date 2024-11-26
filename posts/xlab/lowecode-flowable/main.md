/**
 * 关键技术栈：

Vue 3
Pinia (状态管理)
Vue Router
Element Plus
Uno CSS
SVG Icons

直观理解：
 */

```ts
import * as Icons from '@element-plus/icons-vue'

for (const [key, component] of Object.entries(Icons)){
    app.component(key, component)
}

function registerIcons(iconMap) {
    return Object.entries(iconMap).reduce((registry, [name, component]) =>{
        return registry[name] = component
    }, {})
}

function registerIcon(iconMap) {
    return Object.keys(iconMap).reduce((registry, key) => {
        return registry[key] = iconMap[key]
    }, {})
}

const lazyRegistryIcon {
    async getIcon(name){
    
    const iconModules = import.meta.glob('@/assets/icons/*.svg')
    const modPath = `./icons/${name}.svg`
    if(iconModules[modPath]){
        const mod = iconModules[modPath]()
        return mod.default
    }
      throw new Error(`Icon ${name} not found`);
}
    
}


```