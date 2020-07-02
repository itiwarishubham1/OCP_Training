import Vue from 'vue'
import Routers from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Shubham from '@/components/Shubham'


Vue.use(Routers)

export default new Routers({
  routes: [
    {
      path: '/test',
      name: 'Shubham',
      component: Shubham
    },
    {
      path: '/s',
      name: 'HelloWorld',
      component: HelloWorld
    }
  ]
  
})
