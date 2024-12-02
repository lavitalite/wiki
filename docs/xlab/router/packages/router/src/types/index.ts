import type {locationQuery, LocationQueryRaw} from '../query'
import type {PathParserOptions} from '../matcher'

import type {Ref, Component, DefineComponent} from 'vue'
import type {RouteRecord, RouteRecordNormalized} from '../matcher/types'
import type {HistoryState} from '../history/common'

import type {
    NavigationGuardWithThis,
    RoutLocation,
    RouteRecordRedirceOption,
    _RouteRecordProps,
    RouteRecordNameGeneric
} from '../typed-routes'


import type {_AwaitAble} from './utils'



export type Override<T,U> = Pick<T, Exclude<keyof T, keyof U>> & U

export type Immutable<T> = {
    readonly [P in keyof T]: Immutable<T[P]>
}

export type VueUseOptions<T> = {
    [K in keyof T]: Ref<T[K]> | T[K]
}


export interface RouteQueryAndHash {
    query?: LocationQueryRaw,
    hash?: string
}

export interface MatcherLocationAsPath {
    path: string
}


/**
 * Common options for all navigation methods
 */

export interface RouteLocationOptions {
    /**
     * Replace the entry in this history instead of pushing a new entry
     */
    replace?: boolean
    /**
     * Trigger the navigation even if the location is the same as the current one.
     * Note this will also add a new entry to the history unless `replace: true` is pass
     */
    force?: boolean
    /**
     * State to save using the history API.
     * More Info at https://developer.mozilla.org/en-US/docs/Web/API/History/state
     */
    state?: HistoryState
}

export interface RouteLocationNameRaw
    extends RouteQueryAndHash,
    LocationAsRelativeRaw,
    RouteLocationOptions {}


export interface _RouteLocationBase 
    extends Pick<MatcherLocation, 'name' | 'path' | 'params' | 'meta'> {
        /**
         * The whole location including the `search` and `hash`. This string is 
         * percentage encoded
         */
        fullPath: string
        /**
         * Object representation of the `search` property of the current location
         */
        query: LocationQuery
        /**
         * Hash of the current location. If present, starts with a `#`
         */
        hash: string
        /**
         * contains the location we were initially trying access before ending up on the current location
         */
        redirectedFrom: RouteLocation | undefined
    }

export type RouteComponent = Component | DefineComponent


export type Lazy<T> = () => Promise<T>


export type RawRouteComponet = RouteComponent | Lazy<RouteComponent>


export interface _RouteRecordBase extends PathParseOptions {
    /**
     * Path of the record. Should start with '/' unless the record is the child of another record
     */

    path: string

    /**
     * Where to redirect 
     */
    redirect?: RouteRecordRedirectOption

    /**
     * Alias for the record.
     */
    alias?: string | string[]

    name?: RouteRecordNameGeneric
    BeforeEnter?: 
        | NavigationGuardWithThis
        | NavigationGuardWithThis[]

    /**
     * data attach to the record
     */
    meta?: RouteMeta

    children?: RouteRecordRaw[]
    /**
     * Allow passing down params as props to the compoennt rendered by `router-view`
     */
    props?: RouteRecordProps | Record<string, _RouteRecordProps>
}



export interface MatcherLocationAsPath  {
    path: string
}

export interface MatcherLocatinoAsName {
    name: RouteRecordNameGeneric
    path?: undefined
    params?: RouterParamsGeneric
}

export interface MatcherLocationAsRelative {
    // to allow checking location.path == null
    /**
     * Ignored path property since we are dealing with a relative location. Only `undefined` is allowed.
     */
    path?: undefined
    params?: RouteParamsGeneric
  }
  



export type RouteRecordRaw = 
    | RouteRecordSingleView
    | RouteRecordSingleViewWithChildren
    | RouteRecordMultipleViews
    | RouteRecordMutlipleViewWithChildren
    | RouteRecordRedirect


export type MatcherLocationRaw = 
    | MatcherLocationAsPath
    | MatcherLocationAsName
    | MatcherLocationAsRelative

/**
 * Route Record defining one single component with the `component` option.
 */
export interface RouteRecordSingleView extends _RouteRecordBase {
    /**
     * Component to display when the URL matches this route.
     */
    component: RawRouteComponent
    components?: never
    children?: never
    redirect?: never
  
    /**
     * Allow passing down params as props to the component rendered by `router-view`.
     */
    props?: _RouteRecordProps
  }


/**
 * Route Record defining one single component with a nested view.
 */
export interface RouteRecordSingleViewWithChildren extends _RouteRecordBase {
    /**
     * Component to display when the URL matches this route.
     */
    component?: RawRouteComponent | null | undefined
    components?: never
  
    children: RouteRecordRaw[]
  
    /**
     * Allow passing down params as props to the component rendered by `router-view`.
     */
    props?: _RouteRecordProps
  }

  export interface RouteRecordMultipleViewsWithChildren extends _RouteRecordBase {
    /**
     * Components to display when the URL matches this route. Allow using named views.
     */
    components?: Record<string, RawRouteComponent> | null | undefined
    component?: never
  
    children: RouteRecordRaw[]
  
    /**
     * Allow passing down params as props to the component rendered by
     * `router-view`. Should be an object with the same keys as `components` or a
     * boolean to be applied to every component.
     */
    props?: Record<string, _RouteRecordProps> | boolean
  }