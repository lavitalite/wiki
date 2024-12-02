

## 可选定义

`'blog/:year\d/[:month\d]'=>'Blog/archive',`

URL访问地址都可以被正确的路由匹配：
http://serverName/index.php/Home/blog/2013
http://serverName/index.php/Home/blog/2013/12

## 从头匹配和完全匹配

'new/:cate$'=> 'News/category'
http://serverName/index.php/Home/new/info

会匹配成功，而

http://serverName/index.php/Home/new/info/2

则不会匹配成功。


## 静态映射

'URL_ROUTER_ON'   => true, 
'URL_MAP_RULES'=>array(
    'new/top' => 'news/index?type=top'
)
注意：为了不影响动态路由的遍历效率，静态路由采用URL_MAP_RULES定义和动态路由区分开来

定义之后，如果我们访问： http://serverName/Home/new/top

其实是访问： http://serverName/Home/news/index/type/top

静态路由是完整匹配，所以如果访问： http://serverName/Home/new/top/var/test

尽管前面也有new/top，但并不会被匹配到news/index/type/top。

静态路由定义不受URL后缀影响，例如： http://serverName/Home/new/top.html 也可以正常访问。


## 控制器

外部URL访问控制层：负责响应外部请求
内部事件控制层:负责响应内部事件

# Vue Router is the official client-side routing solution for Vue.

声明式路由
配置式路由
约定式路由



## type declaration


```ts
export interface RouteRecord {
    currentRoute {
        value
    }

}

export interface Route {
    // looking at existing route
    currentRoute {
        value: string
    }
    hasRoute: () => boolean
    getRoutes: () => Array<RouteRecord> // get an arrary with all the route record
}

```


## configured route and declarative route

First, each route object in the routes configuration is called a route record

## Registering the router plugin

Once we've created our router instance, we need to register it as a plugin by calling use() on our application:
> Like with most Vue plugins, the call to use() needs to happen before the call to mount().

If you're curious about what this plugin does, some of its responsibilities include:

Globally registering the RouterView and RouterLink components.
Adding the global $router and $route properties.
Enabling the useRouter() and useRoute() composables.
Triggering the router to resolve the initial route.



## Accessing the router and current route

In component templates, the router instance is exposed as `$router` and `route`. 
Using option API, access the same two prperties as `this.$router` and `$this.route`
With the Composition API, we don't have access to the component instance via this.. The key thing to notice is that the composables useRouter() and useRoute() are used to access the router instance and current route respectively.





## single file compoennt

>Vue Router is most commonly used in applications built using a bundler (e.g. Vite) and SFCs (i.e. .vue files).
, if you're using the global builds of Vue and Vue Router, the libraries are exposed via global objects, rather than imports:

```js
const { createApp } = Vue
const { createRouter, createWebHistory } = VueRouter
```

## router and route

Throughout the guide, we will often refer to the router instance as `router`. This is the object returned by createRouter(). How you access that object in your application will depend on the context. For example, in a component using the Composition API, it can be accessed by calling useRouter(). With the Options API, it can be accessed using this.$router.
Similarly, the current route will be referred to as route. It can be accessed in components using useRoute() or this.$route, depending on which API the component is using.

## dynamic segement in path and matching pattern
path pattern
match path
exposed,mapped to `route.params` object

When a route is matched, the value of its params will be exposed as route.params in every component.
route params are mapped to fields in $route.params

pattern	matched path	route.params
/users/:username	/users/eduardo	{ username: 'eduardo' }
/users/:username/posts/:postId	/users/eduardo/posts/123	{ username: 'eduardo', postId: '123' }





### params value type limit




```js

const routes = [
    path: '/:orderId(\\d+)',
    path: '/:productName'
]

```


### repeatable params
mark a params as repeatable with `*` (0 or more) and `+`(1 or more)
```js
const route = [
    // /:chapters  -> will match / /1, /1/2, /1/2/3
    {path: ':chapters(\\d+)*'},
    // /:chapters -> will match /one, /one/two, /one/two/more
    {path: ':chapters+'}
]
// given {path:'/:chapters+', name:'chapter'}
router.resolve({name: 'chapters'}, params: {chapters: ['a','b']}).href
```

### optional params

you can mark a params as optional by using the `?` modifier(0 or 1)

```js
const routes = [
    {path: '/users/:userId(\\d+)?'}
]
```



 ## nesting routes

```js
const routes = [

    path: '/user/:id',
    component: User,
    children: [
        {
            // UserProfile will be render inside User's <router-view>
            // when /user/:id/profile is matched
            path: 'profile',
            component: UserProfile,
        }，
        {
            // UserPost will be render inside Users's <router-view>
            // when /user/:id/psots is matched
            path: 'posts',
            component: UserPost
        },
        {    
            // UserHome will be render inside User's <router-view>
            // when /user/:id is matched
            path: '', // empty nested path segement
            component: UserHome
        }
    ]
]

```

## declarative and programatic navigation


Inside a compoennt, to access the router instance,
```js
//the arugment can be a literal string, location descriptor object

// literal string path
router.push('/users/eduardo')

// object with path
router.push({ path: '/users/eduardo' })

// named route with params to let the router build the url
router.push({ name: 'user', params: { username: 'eduardo' } })

// with query, resulting in /register?plan=private
router.push({ path: '/register', query: { plan: 'private' } })

// with hash, resulting in /about#team
router.push({ path: '/about', hash: '#team' })


```

 ## pre-route navigation guard


 ## route meta field

## Traverse history

This method takes a single integer as parameter that indicates by how many steps to go forward or go backward in the history stack, similar to window.history.go(n).

> It is worth mentioning that Vue Router navigation methods (push, replace, go) work consistently no matter the history option passed when creating the router instance.
>

## name views


```view

/settings/emails                                      /settings/profile
+-----------------------------------+                  +------------------------------+
| UserSettings                      |                  | UserSettings                 |
| +-----+-------------------------+ |                  | +-----+--------------------+ |
| | Nav | UserEmailsSubscriptions | |  +------------>  | | Nav | UserProfile        | |
| |     +-------------------------+ |                  | |     +--------------------+ |
| |     |                         | |                  | |     | UserProfilePreview | |
| +-----+-------------------------+ |                  | +-----+--------------------+ |
+-----------------------------------+                  +------------------------------+
```

The <template> section for UserSettings component in the above layout would look something like this:
```html
<!-- UserSettings.vue -->
<div>
  <h1>User Settings</h1>
  <NavBar />
  <router-view />
  <router-view name="helper" />
</div>
```



```js
{
    path: '/settings',
    component: UserSettings,
    children: [
        {
            path: 'profile',
            compoenents: {
                default: UserProfile,
                helper: UserProfilePreview
            }
        },
        {
            path: 'email',
            compoent: UserEmailSubscription
        }
    ]
}
```



## active links

## catch-all not found components

## react to url change


## navigation guards

globally, per-route, in-compoennt

Each guard function receives two arguments:
`to`: the target route location being navigate to
`from`: the current route location being navigate from


### pre-route guard

beforeEnter guards only trigger when entering the route, they don't trigger when the params, query or hash change
You can also pass an array of functions to beforeEnter, this is useful when reusing guards for different routes:

```js
function removeQueryParams(to){
    if (Object.keys(to.query).length) {
        return {path: to.path, query: {}, hash: to.hash}
    }
}

function removeHash(to) {
    if(to.hash) return {path: to.path, query: to.query, hash: ''}
}
```


## hook

intercept, post-action, pre-action: 拦截，前置和后置操作

## meta field


## data fething before or after navigation 

before rendering a user profile, you need to fetch the user's data from the server

`Fetching After Navigation`: perform the navigation first, and fetch data in the incoming component's lifecycle hook.show a progess bar or loading indicator or skelton indicating loading state while data is being fetched.

`Fetching Before Navigation`: Fetch data before navigation in the route enter guard, and perform the navigation after data has been fetched.


## scroll behaviour

when using client-side routing, we may want to scroll to top when navigating to a new route.
or preserve the scorlling position


## extend RouterLink

RouterLink component expose enough props to satisfy most application cofig need

```vue
<script setup>


defineOptions({
    inheritAttrs: false
})

const props = defineProps({
    ...RouterLink.props,
    inactvieClass: string
})


const isExternalLink = compouted(() => {
    return props.to === 'string' && props.to.startsWith('http')
})
</script>

<template>
    <a v-if="isExternalLink" v-bind="$attrs" :href="to" target="_blank">
    <router-link
        v-else
        v-bind="$props"
        custom
        v-slot="{isActive, href, navigate}"
    > 
        <a v-bind="$attrs" :href="href" @click="navigate" :class="isActive ? activeClass: inactiveClass"></a>
    </router-link>
<a/>
</template>
```



## ouput chunk bundle
```js
export default defineCofig({
    build: {
        output: {
             manualChunks: {
                'group-user': [
                    './src/UserDetails',
                    './src/UserDashBoard',
                    './src/UserProfile'
                ]
            }       
        }
    }
})

```


### navigation failures

Navigation Failures are Error instances with a few extra properties that gives us enough information to know what navigation was prevented and why

```js
import {NavigationFailuretype, isNavigationFailure} from 'vue-rotuer'


const failure = await router.push('/user/coesus/profile')

if(isNavigationFailur(failure, NavigationFailureType.aborted)){
    showToast('You hava unsaved changes, discard and leave anyway')
}


router.afterEach((to,from,failure) => {
    if(failure) {
        sendToAnalytics(to, from, failure)
    }
})
```



### Differentiating Navigation Failures
As we said at the beginning, there are different situations aborting a navigation, all of them resulting in different Navigation Failures. They can be differentiated using the isNavigationFailure and NavigationFailureType. There are three different types:

aborted: false was returned inside of a navigation guard to the navigation.
cancelled: A new navigation took place before the current navigation could finish. e.g. router.push was called while waiting inside of a navigation guard.
duplicated: The navigation was prevented because we are already at the target location.


### navigation Failures's properties
All navigation failures expose to and from properties to reflect the current location as well as the target location for the navigation that failed:

```js
// trying to access the admin page
router.push('/admin').then(failure => {
  if (isNavigationFailure(failure, NavigationFailureType.aborted)) {
    failure.to.path // '/admin'
    failure.from.path // '/'
  }
```
### Detecting Redirections
When returning a new location inside of a Navigation Guard, we are triggering a new navigation that overrides the ongoing one. Differently from other return values, a redirection doesn't prevent a navigation, it creates a new one. It is therefore checked differently, by reading the redirectedFrom property in a Route Location:

```js
await router.push('/my-profile')
if (router.currentRoute.value.redirectedFrom) {
  // redirectedFrom is resolved route location like to and from in navigation guards
}
```

### dynamic routing

Adding routes to your router is usually done via the routes option 
add or remove routes while the application is already running.