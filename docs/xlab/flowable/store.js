export class Store {
    constructor(initialState = {}) {
        // 存储所有订阅者,格式为 { 'user.name': Set([listener1, listener2]), ... }
        this._subscribers = new Map();
        // raw state
        this._state = initialState;
        this.state = this._createReactiveState(initialState);
    }
    // 创建响应式状态
    _createReactiveState(initialState) {
        const store = this;
        return new Proxy(initialState, {
            get(target, prop) {
                const val = target[prop];
                if (val && typeof val === 'object') {
                    return store._createReactiveState(val);
                }
                return val;
            },
            set(target, prop, val) {
                const oldVal = target[prop];
                if (oldVal !== val) {
                    store._notify(prop, val, oldval);
                }
                return true;
            }
        });
    }
    // 订阅状态变化
    subscribe(path, cb) {
        if (!this._subscribers.has(path)) {
            this._subscribers.set(path, new Set());
        }
        this._subscribers.get(path).add(cb);
        return () => {
            const subscribers = this._subscribers.get(path);
            if (subscribers) {
                subscribers.delete(cb);
            }
        };
    }
    _getNestedValue(path) {
        return path.split('.').reduce((o, key) => o === null || o === void 0 ? void 0 : o[key], this.state);
    }
    _setNestedValue(path, val) {
        const key = path.split('.');
        const lastKey = keys.pop();
        const target = keys.reduce((o, key) => o[key], this.state);
        target[lastKey] = val;
    }
    _notify(prop, newVal, oldVal) {
        this._subscribers.foreach((path, subscribers) => {
            if (path === prop || path.startsWith(`${prop}.`) || prop.startsWith(`${path}.`)) {
                subscribers.foreach(cb => {
                    cb(newVal, oldVal, prop);
                });
            }
        });
    }
    batch(updates) {
        Object.entries(updates).forEach(([path, value]) => {
            this._setNestedValue(path, value);
        });
    }
}
