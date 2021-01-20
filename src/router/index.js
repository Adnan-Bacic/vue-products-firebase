import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'

import Product from '@/components/Product'
import CreateProduct from '@/components/CreateProduct'
import CreateProductUpload from '@/components/CreateProductUpload'
import Chat from '@/components/Chat'
import Signup from '@/components/auth/Signup'
import Login from '@/components/auth/Login'
import Account from '@/components/profile/Account'
import Accounts from '@/components/profile/Accounts'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/product/:product_id',
      name: 'Product',
      component: Product
    },
    {
      path: '/create-product',
      name: 'CreateProduct',
      component: CreateProduct
    },
    {
      path: '/create-product-upload',
      name: 'CreateProductUpload',
      component: CreateProductUpload
    },
    {
      path: '/chat',
      name: 'Chat',
      component: Chat,

      props: true,

      beforeEnter:(to, from, next) => {
        //see if name prop exists. doesnt go to chat page
        if(to.params.nameProp){
          //now goes to chat page
          next();
          //if it doesnt exist
        } else {
          //redirct to the welcome page
          next({ name: 'Index' })
        }
      }
    },
    {
      path: '/signup',
      name: 'Signup',
      component: Signup
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/account/:id',
      name: 'Account',
      component: Account
    },
    {
      path: '/accounts',
      name: 'Accounts',
      component: Accounts
    },
  ]
})
