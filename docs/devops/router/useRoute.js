export function useRouter() {
    return {
        currentRoute,
        push: router.push.bind(router),
        replace: router.push.bind(router),
        go: router.go.bind(router),
        back: router.go.bind(router),
        forward: router.forward.bind(router)
    };
}
