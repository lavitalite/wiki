import { RouteRecord } from "./types"

/**
 *   - 路由配置和注册
 *   - 路由匹配（包括动态路由、嵌套路由）
 *   - 路由导航（push、replace、go、back、forward）
 *   - 路由守卫（beforeEach、afterEach）
 *   - query参数和路径参数处理
 * 
 * 
 * 路由配置增强：
- 支持命名路由
- 支持路由别名
- 支持 meta 字段用于权限控制
- 支持 props 配置来解耦组件与路由

 *  导航守卫体系：
- 全局前置守卫 beforeEach
- 全局解析守卫 beforeResolve
- 路由独享守卫 beforeEnter
- 组件内守卫 beforeRouteEnter/Leave/Update
- 全局后置钩子 afterEach
 * 

 性能优化：
- 支持异步组件和懒加载
- 路由缓存优化
- 导航状态的精确控制

错误处理：
- 导航故障类型定义
- 完整的错误处理链
- 支持导航超时配置
 */
interface RouteConfig {
    path: string
    component: Component | (() => Promise<Component>)
    children?: RouteConfig[]
    name?: string
    meta?: Record<string, any>
    alias?: string | string[]
    redirect?: string | RedirectOption
    props: boolean | Object | Function // 组件属性
    beforeEnter?: NavigationGuard[] // 路由独享守卫
}

interface RouteMatchResult {
    path: string
    params: RouteParams
    query: RouteQuery
    fullPath: string
    hash: string
    matched: RouteRecord[]
    meta: RouteMeta
}





class RouterMatcher {


    private processRoutes(routes:RouteConfig[], parentPath = ''): RouteRecord[] {
       return routes.map(route => {
            // 构建完整路径
            const fullPath = parentPath + '/' + route.path.replace(/^\//, '').replace(/\/+/g, '/')
            
            // 路径匹配模式
            const pattern = this.pathToRegxp(fullPath)

            // 处理子路由
            const children = route.children
                ? this.processRoutes(route.children, fullPath)
                : []

            /**
             *     return {
                ...route,
                pattern,
                fullPath,
                children
            }
             */
            const record: RouteRecord = {
                ...route,
                pattern,
                fullPath,
                parent: undefined,
                children,
                components: {default: route.component},
                instances: {},
                meta: route.meta || {},
                beforeEnter: route.beforeEnter || [],
                props: this.normalizeProps(route.props)
            }
            return record
        })
    }

    pathToRegxp(path) {
        const segments = path.split('/')
        .filter(Boolean) //过滤''
        .map(segment => {
            if(segment.startsWith(':')){
                return `(?<${segment.slice(1)}>[^/]+)`
            } else if (segment === '*'){
                //通配符
                return '.*'
            }
            return segment
        })
        return new RegExp(`^/${segments.join('/')}/?$`)
    }
}