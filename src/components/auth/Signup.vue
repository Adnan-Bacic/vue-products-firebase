<template>
    <div class="container mt-3">
        <div class="row">
            <div class="col-lg-12">
                <form v-on:submit.prevent="SignUp()" class="jumbotron">
                    <h1>Sign up</h1>
                    <div class="form-group">
                        <label for="email">Email</label>
                        <input type="email" name="email" id="email" class="form-control" v-model="email">
                    </div>
                    <div class="form-group">
                        <label for="password">Password</label>
                        <input type="password" name="password" id="password" class="form-control" v-model="password">
                    </div>
                    <div class="form-group">
                        <label for="address">Address</label>
                        <input type="text" name="address" id="address" class="form-control" v-model="address">
                    </div>
                    <div class="form-group">
                        <label for="phone">Phone</label>
                        <input type="number" name="phone" id="phone" class="form-control" v-model="phone">
                    </div>
                    <div class="form-group">
                        <label for="alias">Alias</label>
                        <input type="text" name="alias" id="alias" class="form-control" v-model="alias">
                    </div>
                    <p v-if="feedback" class="text-danger font-weight-bold">{{ feedback }}</p>
                    <button type="submit" class="btn btn-success btn-block">Signup</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import db from '@/firebase/init'
import firebase from 'firebase'
import slugify from 'slugify'

export default {
    name: 'Signup',

    data(){
        return{
            //input data
            email: null,
            password: null,
            address: null,
            phone: null,
            alias: null,

            feedback: null
        }
    },

    methods:{
        SignUp(){
            if(this.email && this.password && this.alias){
                this.feedback = null;

                this.slug = slugify(this.alias, {
                    //remove the unwanted characters with the replacements. set it to lowercase aswell
                    replacement: '-',
                    remove: /[$*_+~,()'"!\:@]/g, //we removed "-" from the remove
                    lower: true
                })
                //look into users collection for the slug
                let ref = db.firestore().collection('users').doc(this.slug)
                ref.get().then(doc => {
                    if(doc.exists){
                        this.feedback = 'This alias already exists';
                    } else {
                        //this.feedback = 'This alias is free to use';
                        //firebase auth function and firebase createuser function
                        firebase.auth().createUserWithEmailAndPassword(this.email, this.password)

                        //firebase credentials
                        .then(cred => {
                            //set is like add to insert data into the datanase
                            ref.set({
                                //database data
                                user_id: cred.user.uid,
                                alias: this.alias,
                                email: this.email,
                                phone: this.phone,
                                address: this.address
                            })
                            //at this point the user is added to the auth and database
                        }).then(() => {
                            //redirect
                            this.$router.push({ name: 'Index' })
                        })

                        .catch(err => {
                            console.log(err);
                            this.feedback = err.message
                        })
                    } 
                })
            } else {
                this.feedback = 'You must enter all fields';
            }
        }
    }
}
</script>

<style scoped>

</style>