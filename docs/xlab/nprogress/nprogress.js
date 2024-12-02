;(function(root, factory){
    if(typeof define === 'function' && define.amd){
        define(factory)
    } else if (typeof exports === 'object') {
        module.exports = factory();
    } else {
        root.NProgress = factory()
    }
}(this, function(){
    var NProgress = {}
    var Settings = NProgress.settings = {
        minimum: 0.08,
        easing:'linear',
        positionUsing: '',
        speed:200,
        trickle: true,
        trickleSpeed: 200,
        showSpinner: true,
        barSelector: '[role="bar"]',
        spinnerSelector: '[role="spinner]',
        parent: 'body',
        template: '<div class="bar" role="bar"><div class="peg"></div></div><div class="spinner" role="spinner"><div class="spinner-icon></div></div>',
    }

    NProgress.configure = function(options) {
        var key,value;
        for(key in options) {
            value = options[key];
            if (value !== undefined && options.hasOwnProperty(key)) Settings[key] = value 
        }
        return this;
    }

    NProgress.status = null;

    NProgress.set = function(n) {
        var started = NProgress.isStarted();
        
        n = clamp(n, Settings.minimum, 1)
        NProgress.status = (n === 1 ? null: n);
        var progress = NProgress.render(!started),
            bar = progress.querySelector(Settings.barSelector),
            speed = Settings.speed,
            ease = Settings.easing;
        progress.offsetWidth;

        queue(function(next) {
            
        })
    }
    /**
     * renders the progress bar markup based on the setting.
     */
    NProgress.render = function(fromStart) {
        if(NProgress.isRendered()) return document.getElementById('nprogress')
        addClass(document.documentElement, 'nprogress-busy')
        var progress = document.createElement('div')
        progress.id = 'nprogress'
        progress.innerHTML = Settings.template
        

        var bar = progress.querySelector(barSelector),
            perc = fromStart ? '-100' : toBarPerc(NProgress.status || 0)
            parent = isDOM(Settings.parent)
                ? Settings.parent
                : document.querySelector(Settings.parent),
            spinner
        css(bar, {
            transiton: 'all 0 linear',
            transform: 'translate3d(' + perc + '%,0,0'
        })

    }
    /**
     * 
     * Helpers
     */
    function isDOM(obj){
        if(typeof HTMLElement === 'object'){
            return obj instanceof HTMLElement
        }
        return (
            obj &&
            typeof obj === 'object' &&
            obj.nodeType === 1 &&
            typeof obj.nodeName === 'string'
        )
    }

    function clamp(n, min, max) {
        if(n < min) return min
        if(n > max) return max
        return n
    }
   
    function toBarPerc(n) {
        return (-1 + n) * 100;
    }

    var css = (function(){
        var cssPrefixes = ['Webkit', 'O', 'Moz', 'ms'],
            cssProps = {}
        function camelCase(string){
            return string.replace(/^-ms-/, 'ms-').replace(/-[\da-z]/gi, function(match, letter){
                return letter.toUpperCase()
            })
        }
        function getVendorProp(name) {
            var style = document.body.style;
            if(name in style) return name;

            var i = cssPrefixes.length 
                capName = name.charAt(0).toUpperCase() + name.slice(1)
                vendorName;
            while(i--) {
                vendorName = cssPrefixes[i] + capName
            }
            return name;
        }
        function getStyleProp(name) {
            name = camelCase(name)
            return cssProps[name] || (cssProps[name] = getVendorProp(name))
        }
        function applyCss(element,prop, value) {
            prop = getStyleProp(prop)
            element.style[prop] = value
        }
        return function(element, properties){
            var args = arguments,
                prop,
                value;
            if (args.length == 2) {
                for (prop in properties) {
                    value = properties[prop]
                    if(value !== undefined && properties.hasOwnProperty(prop)) applyCss(element, prop, value)
                }
            } else {
                applyCss(element, args[1], args[2])
            }
        }
    })()
    function addClass(element,name) {}
}))

