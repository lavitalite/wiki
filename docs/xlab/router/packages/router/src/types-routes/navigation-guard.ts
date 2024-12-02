

/**
 * Return type fro a Navigation Guard. Based on `TypesConfig`
 * @see {@link TypesConfig}
 */

export type NavigationGuardReturn = void | Error | boolean | RouteLocationRaw

/**
 * Navigation Guard with a type parameter for `this`
 * @see {@link TypesConfig}
 */

export interface NavigationGuardWithThis<T> {
    (
        this: T,
        to: RouteLocationNormalized,
        from: RouteLocationNormalizedLoaded,
        next: NavigationGuardNext
    ): _Awaitable<NavigationGuardReturn>
}


/**
 * In `router.beforeResolve((to) => {})`, the `to` is typed as `RouteLocationNormalizedLoaded`, not
 * `RouteLocationNormalized` like in `router.beforeEach()`. In practice it doesn't change much as users do not rely on
 * the difference between them but if we update the type in vue-router, we will have to update this type too.
 * @internal
 */

export interface _NavigationGuardResolved {
    (
        this: undefined,
        to: RouteLocationNormalizeLoaded,
        from: RouteLocationNormalizedLoaded,
        next: NavigationGuardNext
    ): _Awaitable<NavigationGuardReturn>
}

export interface NavigationGuard {
    (
        to: RouteLocationNormalized,
        from: RouteLocationNormalizedLoaded,
        next: NavigationGuardNext
    ): _Awaitable<NavigationGuardReturn>
}

/**
 * Navigation hook trigger after a navigation is settled
 */
export interface NavigationHookAfter {
    (
        to: RouteLocationNormalized,
        from: RouteLocationNormalizedLoaded,
        next: NavigationGuardNext
    ): unknown
}



/**
 * `next()` callback passed to navigation guards
 */

export interface NavigationGuardNext {
    (): void
    (error: Error): void
    (location: RouteLocationRaw): void
    (valid: boolean | undefined): void
    (cb: NavigationGuardNextCallback): void

}


export type NavigationGuardNextCallback = (
    vm: ComponentPublicInstance
) => unknown



