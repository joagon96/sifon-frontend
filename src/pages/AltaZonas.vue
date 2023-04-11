<template>
  <div class="content">
    <div class="md-layout">
      <div class="md-layout-item md-medium-size-100 md-size-100">
        <form>
          <md-card>
            <md-card-header data-background-color="green">
              <h4 class="title" v-if="this.idEdit">Editar Zona</h4>
              <h4 class="title" v-else>Crear Zona</h4>
              <p class="category">Completar datos</p>
            </md-card-header>

            <md-card-content>
              <div class="md-layout">
                <div class="md-layout-item md-small-size-100 md-size-50">
                  <md-field>
                    <label>Descripcion</label>
                    <md-input placeholder="Ejemplo: San Nicolás Sur" v-model="newZona.descripcion" type="text"></md-input>
                  </md-field>
                </div>             
                <div class="md-layout-item md-size-100 text-right">
                    <md-dialog-alert
                      :md-active.sync="first"
                      md-title="Zona Creada"
                      md-content="La zona se agregó a la base de datos."
                      md-confirm-text="Aceptar"
                      @md-closed="newZona.descripcion = ''"
                       />
                    <md-dialog-alert
                      :md-active.sync="second"
                      md-title="Zona Modificada"
                      md-content="Los datos de la zona fueron modificados."
                      md-confirm-text="Aceptar"
                      @md-closed="$router.push('Zonas')"
                       />
                    <div v-if="this.newZona.descripcion == ''">
                      <md-button class="md-raised md-success disabled" v-if="this.idEdit" @click="editZona()">Editar</md-button>
                      <md-button class="md-raised md-success disabled" v-else @click="createZona()">Crear</md-button>
                    </div>
                    <div v-else>
                      <md-button class="md-raised md-success" v-if="this.idEdit" @click="editZona()">Editar</md-button>
                      <md-button class="md-raised md-success" v-else @click="createZona()">Crear</md-button>
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
      axios.get(Config.API_URL + 'get/Zona/'+idRuta).then(response => {
      console.log(response.data[0])
      this.newZona.descripcion = response.data[0].descripcion;
      });
    }
  },
  methods: {
    editZona() {
      var bodyFormData = new FormData();
      bodyFormData.append('idZona', this.idEdit);
      bodyFormData.append('descripcion', this.newZona.descripcion);
      axios({
        method: 'PUT',
        url: Config.API_URL + 'update/modZona',
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
    createZona() {
      var bodyFormData = new FormData();
      bodyFormData.append('descripcionZona', this.newZona.descripcion);
      axios({
          method: 'POST',
          url: Config.API_URL + 'post/upZona',
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
      newZona: {
        descripcion: ''
      }
    };
  }
};
</script>