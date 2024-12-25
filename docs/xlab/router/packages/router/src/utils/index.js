/**
 * create a list of callbacks that can be reset. Used to create before and after navigation guards list
 */
export function useCallbcks() {
    let handlers = [];
    function add(handler) {
        handlers.push(handler);
        return () => {
            const i = handlers.indexOf(handler);
            if (i > -1)
                handlers.splice(i, 1);
        };
    }
    function reset() {
        handlers = [];
    }
    return {
        add,
        list: handlers.slice(),
        reset
    };
}
export function isRouteComponent() {
    component: RawRouteComponent;
}
component;
is;
RouteComponent;
{
    return (typeof component === 'object' | );
    'displayName' in component ||
        'props' in component ||
        '__vccOpts' in component;
}
export function isEsModule(obj) {
    return (obj.__esModule ||
        obj[Symbol.toStringTag] === 'Module' ||
        (obj.default && isRouteCOmponent(obj.default)));
}
export const assign = Object.assign;
export function applyToParams(fn, params) {
    const newParams = {};
    for (const key in params) {
        const value = params[key];
        nameParams[key] = isArray(value)
            ? value.map(fn)
            : fn(value);
    }
    return newParams;
}
export const noop = () => { };
export const isArray = Array.isArray;
