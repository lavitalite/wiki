import {Component} from 'react'

export interface RouteConfig {
    path: string,
    component: Component | (() => Promise<Component>)
    children?: RouteConfig[]
    name?: string
    meta?: Record<string, any>
    alias?: string | string[]
    redirect?: string | RedirectOption
    props?: boolean | Object | Function
    beforeEnter?: NavigationGuard[]
}

export interface RouteRecord {
    path: string
    regex: RegExp
    components: {[key: string]: Component | (() => Promise<Component>)}
    instances: {[key:string]: Component}
    name?: string
    parent?: RouteRecord
    redirect?: string | RedirectOption
    matchAs?: string
    meta: Record<string, any>
    beforeEnter?: NavigationGuard[]
    props: Record<string, boolean | Object | Function>
}

export interface RouteMatchResult {
    path: string,
    params: RouteParams
    query: RouteQuery
    hash: string
    fullPath: string
    matched: RouteRecord[]
    meta: Record<string, any>
    name?: string
}

export interface RouteParams {
    [key: string]: string
}

export interface RouteQuery {
    [key: string]: string | string[] | null
}

export interface RedirectOption {
    name?: string
    path?: string
    params: RouteParams
    query:RouteQuery
}


export interface RedirectOption {
    name?: string
    path?: string
    params?: RouteParams
    query?: RouteQuery    
}

export type NavigationGuardNext = (to?: RouteMatchResult | false | ((vm:Component) => any) | void ) => void



export type NavigationGuard = (
    to: RouteMatchResult,
    from: RouteMatchResult | null,
    next: NavigationGuardNext
) => void | Promise<void>

export interface RouterOptions {
    routes: RouteConfig[]
    mode?: 'hash' | 'history'
    base?: string
    scrollBehavior?: (to: RouteMatchResult, from: RouteMatchResult, savedPosition: {x: number, y: number} | null) => {x: number, y: number}
}



export interface NavigationFailure {
    type: number
    to: RouteMatchResult
    from: RouteMatchResult
}