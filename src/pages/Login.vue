<template>
  <md-card class="md-card-profile">
    <div class="md-card-avatar">
      <img class="img" :src="cardUserImage" />
    </div>

    <md-card-content>
      <h4 class="card-title">¡Bienvenido!</h4>
      <div class="md-layout md-gutter md-alignment-center">
        <div class="md-layout-item md-small-size-100 md-size-20">
          <md-field>
            <label>Usuario</label>
          <md-input placeholder="Usuario" v-model="username" type="text"></md-input>
          </md-field>
          <md-field>
              <label>Contraseña</label>
              <md-input placeholder="Contraseña" v-model="password" type="password" @keyup.enter="login(username, password)"></md-input>
          </md-field>
        </div>
      </div>
      <md-button class="md-round md-info" @click="login(username, password)">Login</md-button>
    </md-card-content>
    <div>
      <md-snackbar :md-duration="4000" :md-active.sync="showSnackbar" md-persistent style="background-color: #f44336;">
      <span>{{ this.errorMessage }}</span>
      <md-button class="md-danger" @click="showSnackbar = false">OK</md-button>
    </md-snackbar>
    </div>

  </md-card>
</template>

<script>
import axios from 'axios'
import {Config} from '../config.js'

export default {
  mounted() {
    localStorage.setItem('token', "null");
    localStorage.setItem('role', "null");
    localStorage.setItem('username', "null");
  },
  props: {
    cardUserImage: {
      type: String,
      default: require("@/assets/img/logodlm.png")
    }
  },
  data() {
    return {
        username: '',
        password: '',
        showSnackbar: false,
        errorMessage: ""
    };
  },
  methods: {
      login (username, password) {
        var bodyFormData = new FormData();
        bodyFormData.append('username', username);
        bodyFormData.append('password', password);
        axios({
            method: 'POST',
            url: Config.API_URL + 'login',
            data: bodyFormData,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials": "true",
            }
        }).then(response => {
          if (!response.data.error){
            const role = response.data.role
            const username = response.data.username
            const token = response.data.token
            localStorage.setItem('role', role)
            localStorage.setItem('username', username)
            localStorage.setItem('token', `Bearer: ` + token)
            if (role === 'admin'){
              console.log("resumen")
              this.$router.push({name: 'Resumen'})
            }else{
              console.log("repartos")
              this.$router.push({name: 'Repartos'})
            }
          }
        }).catch(error => {
          this.errorMessage = error.response.status == 401 ? "Las credenciales ingresadas no son validas" : error
          this.showSnackbar = true
        });;
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
