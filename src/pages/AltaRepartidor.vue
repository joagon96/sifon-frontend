<template>
  <div class="content">
    <div class="md-layout">
      <div class="md-layout-item md-medium-size-100 md-size-100">
        <form>
          <md-card>
            <md-card-header data-background-color="green">
              <h4 class="title" v-if="this.idEdit">Editar Repartidor</h4>
              <h4 class="title" v-else>Crear Repartidor</h4>
              <p class="category">Completar datos</p>
            </md-card-header>

            <md-card-content>
              <div class="md-layout">
                <div class="md-layout-item md-small-size-100 md-size-100">
                  <md-field>
                    <label>Nombre y Apellido</label>
                    <md-input v-model="newRep.nombreApellido" type="text"></md-input>
                  </md-field>
                </div>      
                <div class="md-layout-item md-small-size-100 md-size-100">
                  <md-field>
                    <label>Telefono</label>
                    <md-input v-model="newRep.telefono" type="text"></md-input>
                  </md-field>
                </div>         
                <div class="md-layout-item md-size-100 text-right">
                    <md-dialog-alert
                      :md-active.sync="first"
                      md-title="Repartidor Creado"
                      md-content="El repartidor se agregó a la base de datos."
                      md-confirm-text="Aceptar"
                      @md-closed="cleanRep()"
                       />
                    <md-dialog-alert
                      :md-active.sync="second"
                      md-title="Repartidor Modificado"
                      md-content="Los datos del repartidor fueron modificados."
                      md-confirm-text="Aceptar"
                      @md-closed="$router.push('Repartidores')"
                       />
                    <div v-if="newRep.nombreApellido == '' || newRep.telefono == ''">
                      <md-button class="md-raised md-success disabled" v-if="this.idEdit" @click="editRepartidor()">Editar</md-button>
                      <md-button class="md-raised md-success disabled" v-else @click="createRepartidor()">Crear</md-button>
                    </div>
                    <div v-else>
                      <md-button class="md-raised md-success" v-if="this.idEdit" @click="editRepartidor()">Editar</md-button>
                      <md-button class="md-raised md-success" v-else @click="createRepartidor()">Crear</md-button>
                    </div>
                  </div>
              </div>
            </md-card-content>
          </md-card>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import {Config} from '../config.js'

export default {
  name: 'DialogAlert',
  created () {
    var idRuta = this.$route.params.idSelected
    this.idEdit = idRuta
    if (idRuta) {
      axios.get(Config.API_URL + 'get/Repartidor/'+idRuta).then(response => {
      console.log(response.data[0])
      this.newRep.nombreApellido = response.data[0].nomapeRep;
      this.newRep.telefono = response.data[0].telefonoRep;
      });
    }
  },
  methods: {
    cleanRep() {
      this.newRep.nombreApellido = ''
      this.newRep.telefono = ''
    },
    editRepartidor() {
      var bodyFormData = new FormData();
      bodyFormData.append('idRepartidor', this.idEdit);
      bodyFormData.append('nombreApellido', this.newRep.nombreApellido);
      bodyFormData.append('telefono', this.newRep.telefono);
      axios({
        method: 'PUT',
        url: Config.API_URL + 'update/modRepartidor',
        data: bodyFormData,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": "true"
        }
      }).then(response => {
        this.second = true
        console.log(response.data);
      });
    },
    createRepartidor() {
      var bodyFormData = new FormData();
      bodyFormData.append('nombreApellido', this.newRep.nombreApellido);
      bodyFormData.append('telefono', this.newRep.telefono);
      axios({
          method: 'POST',
          url: Config.API_URL + 'post/upRepartidor',
          data: bodyFormData,
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": "true"
          }
      }).then(response => {
        this.first = true
        console.log(response.data);
      });
    }
  },
  data() {
    return {
      first: false,
      second:false,
      idEdit: null,
      newRep: {
        nombreApellido: '',
        telefono: '',
      }
    };
  }
};
</script>