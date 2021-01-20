<template>
    <div class="container">
        <div class="row">
            <div class="col-lg-12">
                <h1 class="mt-3">All users</h1>
                <ul class="list-group">
                    <li class="list-group-item" v-for="user in usersArray" v-bind:key="user.id">
                        {{ user.alias }}
                        <br>
                        <router-link :to="{ name: 'Account', params:{ id: user.id } }">
                            <button class="btn btn-primary">See more</button>
                        </router-link>
                    </li>
                </ul>
            </div>
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
            usersArray: []
        }
    },

    

    created(){
        db.firestore().collection('users').get()
        .then(snapshot => {
        snapshot.forEach(doc => {
            let user = doc.data()
            user.id = doc.id
            this.usersArray.push(user)
        })
        })
    }
}
</script>