import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const routes = [
  {
    path:"/",
    redirect:'/login'
  },
  {
    path:'/login',
    component:()=>import('@/views/Login/Login')
  },
  {
    path:'/home',
    component:()=>import('@/views/Home/home')
  }
]

const router = new VueRouter({
  routes
})

//挂载路由导航首位
router.beforeEach((to,from,next)=>{
  if(to.path==='/login') return next();
  //获取token
  const tokenStr = window.sessionStorage.getItem('token')
  if(!tokenStr) return next('./login')
  next()
})


export default router
