<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <li class="navbar-brand">
        <router-link :to="{ name: 'Index' }">Home</router-link>
      </li>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarNav">
    <ul class="navbar-nav">
      <li class="nav-item active">
        <router-link :to="{ name: 'Index' }">Home</router-link>
      </li>
      <li class="nav-item active">
        <router-link :to="{ name: 'Accounts' }">Accounts</router-link>
      </li>
      <li class="nav-item">
        <router-link :to="{ name: 'CreateProductUpload' }">Create Product with upload</router-link>
      </li>
      <li v-if="user" class="nav-item"><a>Logged in with: {{ user.email }}</a></li>

      <li>
        <router-link :to="{ name: 'Account', params:{ id: user.id }}" v-if="loggedIn">
          Account
        </router-link>
      </li>
      <li v-if="!user" class="nav-item"><router-link :to="{ name: 'Signup' }">Signup</router-link></li>
      <li v-if="!user" class="nav-item"><router-link :to="{ name: 'Login' }">Login</router-link></li>
      <li v-if="user"><a v-on:click="Logout()" class="text-danger font-weight-bold" id="logoutBtn">Log out</a></li>
      <!--
      <li class="nav-item">
        <router-link :to="{ name: 'Products' }">Products</router-link>
      </li>
      
      <li class="nav-item">
        <router-link :to="{ name: 'CreateProduct' }">Create Product</router-link>
      </li>
      -->
      
    </ul>
  </div>
</nav>
</template>

<script>
import firebase from 'firebase'
import db from '@/firebase/init'

export default {
    name: 'Navbar',

    data(){
        return{
          user: null,
          loggedIn: null
        }
    },

    methods:{
        Logout(){
            //firebase logout function
            firebase.auth().signOut().then(() => {
                this.$router.push({ name: 'Index' })
            })
        },

        
  },
    

    created(){
      //if there is a user loggin is set to true
      if(firebase.auth().currentUser){
        this.loggedIn = true

        db.firestore().collection('users').where('user_id', '==', firebase.auth().currentUser.uid).get()
        .then(snapshot => {
        snapshot.forEach(doc => {
            //let user = doc.data()
            //user.id = doc.id
            this.user = doc.data()
            this.user.id = doc.id
            //console.log(user.id)
        })
        })
      }

        
      

        //firebase function to check if auth state changes
        firebase.auth().onAuthStateChanged((user) => {
            if(user){
                //if user logs in user is no longer null
                this.user = user
                //add click event to marker
    
            } else {
                //if user logs out set to null again
                this.user = null
            }
        })
    }
    }


</script>

<style scoped>
  li{
    padding: 0px 20px;
  }
  #navbarNav{
    justify-content: flex-end;
  }
  #logoutBtn{
    cursor: pointer;
  }
</style>