<template>
  <md-card class="md-card-profile">
    <div class="md-card-avatar">
      <img class="img" :src="cardUserImage" />
    </div>

    <md-card-content>
      <h4 class="card-title">¡Bienvenido!</h4>
        <md-field>
            <label>Usuario</label>
        <md-input placeholder="Usuario" v-model="username" type="text"></md-input>
        </md-field>
        <md-field>
            <label>Contraseña</label>
            <md-input placeholder="Contraseña" v-model="password" type="text"></md-input>
        </md-field>
      <md-button class="md-round md-success" @click="login()">Login</md-button>
    </md-card-content>
  </md-card>
</template>

<script>
import axios from 'axios'
import {Config} from '../config.js'

export default {
  props: {
    cardUserImage: {
      type: String,
      default: require("@/assets/img/logodlm.png")
    }
  },
  data() {
    return {
        username: '',
        password: ''
    };
  },
  methods: {
      login () {
        var bodyFormData = new FormData();
        bodyFormData.append('username', username) ;
        bodyFormData.append('password', password) ;
        axios({
            method: 'GET',
            url: Config.API_URL + 'login',
            data: bodyFormData,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials": "true",
            }
        }).then(response => {
            const token = response.data.access_token
            localStorage.setItem('token', token)
            this.$router.push({name: 'Resumen'})
        });
        this.$router.push({name: 'Resumen'})
      }
  }
};
</script>

<style>
.md-card-profile {
    padding: 40px 40px 40px 40px;
    margin: 40px 40px 40px 40px;
}
</style>
