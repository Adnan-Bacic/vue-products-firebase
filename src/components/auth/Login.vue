<template>
    <div class="container mt-3">
        <div class="row">
            <div class="col-lg-12">
                <form v-on:submit.prevent="Login()" class="jumbotron">
                    <h1>Login</h1>
                    <div class="form-group">
                        <label for="email">Email</label>
                        <input type="email" name="email" class="form-control" v-model="email">
                    </div>
                    <div class="form-group">
                        <label for="password">Password</label>
                        <input type="password" name="password" class="form-control" v-model="password">
                    </div>
                    <p v-if="feedback" class="tex-danger font-weight-bold">{{ feedback }}</p>
                    <button class="btn btn-success btn-block">Login</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import firebase from 'firebase'

export default {
    name: 'Login',

    data(){
        return{
            //form data
            email: null,
            password: null,

            //feedback
            feedback: null
        }
    },

    methods:{
            Login(){
                if(this.email && this.password){
                    //firebase login
                    firebase.auth().signInWithEmailAndPassword(this.email, this.password)
                    .then(cred => {
                        console.log(cred.user)
                        //redirect
                        this.$router.push({ name:'Index' })
                    })
                    //catch errors
                    .catch(err => {
                        this.feedback = err.message;
                    })

                    //set feedback to null
                    this.feedback = null;
                } else {
                    this.feedback = 'Please fill in both email and password';
                }
            }
        }
}
</script>

<style scoped>
    
</style>