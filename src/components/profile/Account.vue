<template>
    <div class="container mt-3">
        <div v-if="profile">
            <h2>{{ profile.alias }}'s account</h2>
            <p>E-mail: {{ profile.email }}</p>
            <p>Phone number: {{ profile.phone }}</p>
            <p>Address: {{ profile.address }}</p>
        </div>     
    </div>
</template>

<script>
import db from '@/firebase/init'
import firebase from 'firebase'

export default {
    name: 'Accounts',

    data(){
        return{
            //profile variable
            profile: null,
        }
    },

    methods:{
        
    },

    created(){
        //set db vriable
        let ref = db.firestore().collection('users')

        

        //get 1 user - this users wall
        ref.doc(this.$route.params.id).get()
        .then(user => {
            this.profile = user.data();
        })

    }
}
</script>

<style scoped>
    
</style>