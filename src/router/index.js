import Vue from 'vue'
import Router from 'vue-router'
import homePage from '@/components/homePage'
import settingUp from '@/components/settingUp'
import timeControls from '@/components/timeControls'
import renewalPage from '@/components/adjustment/renewalPage'
import brushHead from '../components/adjustment/brushHead'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'homePage',
      component: homePage
    },
    {
      path: '/settingUp',
      name: '模式设置',
      component: settingUp
    },
    {
      path: '/timeControls',
      name: '日历',
      component: timeControls
    },
    {
      path: '/renewalPage',
      name: '版本更新',
      component: renewalPage
    },
    {
      path: '/brushHead',
      name: '刷头统计',
      component: brushHead
    }
  ]
})
