"use strict";
class RouterMatcher {
    constructor(routes) {
        this.routs = [];
        this.pathMap = new Map();
        this.nameMap = new Map();
        this.addRoutes(routes);
    }
    addRoutes(routes) {
    }
    addRoute(config, parent) {
        const record = this.createRouteRecord(config, parent);
        // 注册路由记录
        this.routes.push(record);
        this.pathMap.set(record.path, record);
        if (record.name) {
            this.nameMap.set(record.name, record);
        }
    }
    processRoutes(routes, parentPath = '') {
        return routes.map(route => {
            // 构建完整路径
            const fullPath = parentPath + '/' + route.path.replace(/^\//, '');
            // 路径匹配
            const pattern = this.pathToRegxp(fullPath);
            // 处理子路由
            const children = route.children
                ? this.processRoutes(route.children, fullPath)
                : [];
            return {
                ...route,
                pattern,
                fullPath,
                children
            };
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
