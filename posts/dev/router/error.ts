/**
 * bitwise flag so we can combine to chekc multi error
 */

export const enum ErrorTypes {
    // they must be literal to be used as value,
    // so we can't write 1 << 2
    MATHCER_NOT_FOUND = 1,
    NAVIGATION_GUARD_REDIRECt = 2,
    NAVIGATION_ABORTED = 4, 
    NAVIGATION_CANCELLED = 8,
    NAVIGATION_DUPLICATED = 16
}



export enum NavigationFailureType {
    /**
     * An aborted navigation is a navigation that failed because
     * a navigation guard return `false` or callled `next(false)`
     */
    aborted = ErrorTypes.NAVIGATION_ABORTED,
    /**
     * A cancelled navigation is a navigation that failed because a more recent
     * navigation finish started
     */
    cancelled = ErrorTypes.NAVIGATION_CANCELLED,
    /**
     * A duplicated navigation is a navigation that failed because it was 
     * initiated while already being at the exact same location
     */
    duplicated = ErrorTypes.NAVIGATION_DUPLICATED
}


/**
 * Extended Error that contains extra info regarding a failed navigation
 */
export interface NavigationFailure extends Error {
    type: 
        | ErrorTypes.NAVIGATION_ABORTED
        | ErrorTypes.NAVIGATION_CANCELLED
        | ErrorTypes.NAVIGATION_DUPLICATED
    /**
     * route location we were navigating from
     */
    from: RouteMatchResult
    /**
     * route location we were navigating to 
     * */ 
    to: RouteMatchResult
}


