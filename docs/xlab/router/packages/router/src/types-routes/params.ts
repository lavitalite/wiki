import type {RouteMap} from './route-map'

/**
 * Utility type for raw and non raw params liek: id+
 */

export type ParamValueOneOrMore<isRaw extends boolean> = [
    ParamValue<isRaw>,
    ...ParamValue<isRaw>[]
]


/**
 * Utility type for raw and non raw params like：id*
 */

export type ParamValueZeroOrMore<isRaw extends boolean> = true extends isRaw
    ? ParamValue<isRaw>[] | undefined | null
    : ParamValue<isRaw>[] | undefined



/**
 * Utility type ofr raw and non raw params like: id?
 * 
 */

export type ParamValue<isRaw extends boolean> = true extends isRaw
    ? string | number
    : string


/**
 * generate a type safe params for a route location. Requires the name of the route to be passed as a generic
 * @see {@link RouteParamGeneric}
 */

export type RouteParams<Name extends keyof RouteMap = keyof RouteMap> = 
    RouteMap[Name]['params']

export type RouteParamsRaw<Name extends keyof RouteMap = keyof RouteMap> = 
    RouteMap[Name]['paramsRaw']