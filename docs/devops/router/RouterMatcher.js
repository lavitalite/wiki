class RouterMatcher {
    processRoutes(routes, parentPath = '') {
        return routes.map(route => {
            // 构建完整路径
            const fullPath = parentPath + '/' + route.path.replace(/^\//, '').replace(/\/+/g, '/');
            // 路径匹配模式
            const pattern = this.pathToRegxp(fullPath);
            // 处理子路由
            const children = route.children
                ? this.processRoutes(route.children, fullPath)
                : [];
            /**
             *     return {
                ...route,
                pattern,
                fullPath,
                children
            }
             */
            const record = {
                ...route,
                pattern,
                fullPath,
                parent: undefined,
                children,
                components: { default: route.component },
                instances: {},
                meta: route.meta || {},
                beforeEnter: route.beforeEnter || [],
                props: this.normalizeProps(route.props)
            };
            return record;
        });
    }
    pathToRegxp(path) {
        const segments = path.split('/')
            .filter(Boolean) //过滤''
            .map(segment => {
            if (segment.startsWith(':')) {
                return `(?<${segment.slice(1)}>[^/]+)`;
            }
            else if (segment === '*') {
                //通配符
                return '.*';
            }
            return segment;
        });
        return new RegExp(`^/${segments.join('/')}/?$`);
    }
}
export {};
