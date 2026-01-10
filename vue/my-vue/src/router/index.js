import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },

    {
      // 一般路由設定範例
      path: '/routerParams',
      name: 'routerParams',
      component: () => import('../views/TestView.vue'),
    },

    {
      // 動態參數範例
      path: '/routerParams/:id', // :id 是動態參數，它會去接收 url 上的值, 加上:後，這就會變成是一個 dynamic parameter
      name: 'routerParamsWithId', // 注意 name 不能跟上面重複 (需要 unique)
      component: () => import('../views/TestWithIdView.vue'),
    },
    {
      // query 參數範例
      path: '/routerQuery',
      name: 'routerQueryName',
      component: () => import('../views/RouterQueryView.vue'),
    },

    {
      // 巢狀路由範例
      path: '/main/nestedRoutes',
      name: 'nestedRoutes',
      component: () => import('../views/NestedRoutesView.vue'),
    },

    {
      // 生命週期範例
      path: '/lifeCycle',
      name: 'lifeCycle',
      component: () => import('../views/02_LifeCycleView.vue'),
    },

    {
      // 響應式變數範例
      path: '/reactiveVariable',
      name: 'reactiveVariable',
      component: () => import('../views/03_ReactiveVariableView.vue'),
    },

    {
      // Binding 範例
      path: '/bindExample',
      name: 'bindExample',
      component: () => import('../views/04_BindView.vue'),
    },

    {
      // If 條件渲染範例
      path: '/ifExample',
      name: 'ifExample',
      component: () => import('../views/05_IfView.vue'),
    },

    {
      // For 列表渲染範例
      path: '/forExample',
      name: 'forExample',
      component: () => import('../views/06_ForView.vue'),
    },

    {
      // 事件處理範例
      path: '/eventExample',
      name: 'eventExample',
      component: () => import('../views/07_EventView.vue'),
    },

    {
      // 計算屬性範例
      path: '/computedExample',
      name: 'computedExample',
      component: () => import('../views/08_ComputedView.vue'),
    },

    {
      // Watch 監聽範例
      path: '/watchExample',
      name: 'watchExample',
      component: () => import('../views/09_WatchView.vue'),
    },

    {
      // 元件範例
      path: '/componentExample',
      name: 'componentExample',
      component: () => import('../views/10_ComponentView.vue'),
    },

    {
      // 環境變數範例
      path: '/envExample',
      name: 'envExample',
      component: () => import('../views/11_EnvView.vue'),
    },

    {
      // Pinia 狀態管理範例
      path: '/piniaExample',
      name: 'piniaExample',
      component: () => import('../views/12_PiniaView.vue'),
    },

    {
      // Axios 範例
      path: '/axiosExample',
      name: 'axiosExample',
      component: () => import('../views/13_AxiosView.vue'),
    },

    {
      // 404 沒有對應路由時，導向錯誤頁面
      // :pathMatch 是 dynamic parameter name，(.*) 是正則表示，匹配任意字串，* 是匹配多次
      // 例如 /abc/def/ghi 就會被收到 pathMatch 裡面，在使用 route.params.pathMatch 時，會得到 "abc/def/ghi"
      path: '/:pathMatch(.*)*',
      name: 'error',
      component: () => import('../views/ErrorView.vue'),
    },
  ],
})

export default router
