import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'lome',
    component: Home
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login.vue')
  },
  {
    path: '/index',
    name: 'index',
    component: () => import('../views/index.vue'),
    children: [{
      path: 'checkemr',
      name: 'checkEmr',
      component: () => import('../views/checkEmr.vue')
    },{
      path: 'uploademr',
      name: 'uploadEmr',
      component: () => import('../views/uploadEmr.vue')
    },{
      path: 'getEmr',
      name: 'getEmr',
      component: () => import('../views/getEmr.vue')
    }]
  },
  {
    path: '/manage',
    name: '/manage',
    component: () => import('../views/manage.vue'),
    children: [{
      path: 'manageNode',
      name: 'manageNode',
      component: () => import('../views/manageNode.vue')
    },{
      path: 'addNode',
      name: 'addNode',
      component: () => import('../views/addNode.vue')
    },{
      path: 'checkBlock',
      name: 'checkBlock',
      component: () => import('../views/checkBlock.vue')
    },{
      path: 'checkBlockInfo',
      name: 'checkBlockInfo',
      component: () => import('../views/checkBlockInfo.vue')
    }]
  },
  {
    path: '/patientLogin',
    name: 'patientLogin',
    component: () => import('../views/patientLogin.vue')
  },
  {
    path: '/patientIndex',
    name: 'patientIndex',
    component: () => import('../views/patientIndex.vue'),
    children: [{
      path: 'patientCheckInfo',
      name: 'patientCheckInfo',
      component: () => import('../views/patientCheckInfo.vue')
    },{
      path: 'patientCheckEmr',
      name: 'patientCheckEmr',
      component: () => import('../views/patientCheckEmr.vue')
    },{
      path: 'patientCheckMine',
      name: 'patientCheckMine',
      component: () => import('../views/patientCheckMine.vue')
    }]
  },{
    path: '/scan',
    name: 'scan',
    component: () => import('../views/scan.vue')
  }
  ,{
    path: '/patientViewEmr',
    name: 'patientViewEmr',
    component: () => import('../views/patientViewEmr.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
