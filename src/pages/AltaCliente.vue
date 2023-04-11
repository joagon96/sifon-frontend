<template>
  <div class="content">
    <div class="md-layout">
      <div class="md-layout-item md-medium-size-100 md-size-100">
          <form>
            <md-card>
              <md-card-header data-background-color="green">
                <h4 class="title" v-if="this.idEdit">Editar Cliente</h4>
                <h4 class="title" v-else>Crear Cliente</h4>
                <p class="category">Completar datos</p>
              </md-card-header>

              <md-card-content>
                <div class="md-layout">
                  <div class="md-layout-item md-small-size-100 md-size-100">
                    <md-field>
                      <label>Nombre y Apellido</label>
                      <md-input v-model="newClient.nombreApellido" type="text"></md-input>
                    </md-field>
                  </div>      
                  <div class="md-layout-item md-small-size-100 md-size-100">
                    <md-field>
                      <label>Telefono</label>
                      <md-input v-model="newClient.telefono" type="text"></md-input>
                    </md-field>
                  </div>
                  <div class="md-layout-item md-small-size-100 md-size-50">
                    <md-field>
                      <label>Domicilio</label>
                      <md-input v-model="newClient.domicilio" type="text"></md-input>
                    </md-field>
                  </div>      
                  <div class="md-layout-item md-small-size-100 md-size-50">
                    <div class="md-layout md-gutter">
                      <div class="md-layout-item">
                        <md-field>
                          <label>Zona</label>
                          <md-select md-dense v-model="newClient.idZona">
                            <md-option v-for="z in zonas" :key="z.idZona" :value="z.idZona">{{z.descripcion}}</md-option>
                          </md-select>
                        </md-field>
                      </div>
                    </div>
                  </div>  
                  <div class="md-layout-item md-size-100 text-right">
                    <md-dialog-alert
                      :md-active.sync="first"
                      md-title="Cliente Creado"
                      md-content="El cliente se agregó a la base de datos."
                      md-confirm-text="Aceptar"
                      @md-closed="cleanCliente()"
                       />
                    <md-dialog-alert
                      :md-active.sync="second"
                      md-title="Cliente Modificado"
                      md-content="Los datos del cliente fueron modificados."
                      md-confirm-text="Aceptar"
                      @md-closed="$router.push('Clientes')"
                       />
                    <div v-if="newClient.nombreApellido == '' || newClient.telefono == '' || newClient.domicilio == '' || newClient.idZona == null">
                      <md-button class="md-raised md-success disabled" v-if="this.idEdit" @click="editCliente()">Editar</md-button>
                      <md-button class="md-raised md-success disabled" v-else @click="createClient()">Crear</md-button>
                    </div>
                    <div v-else>
                      <md-button class="md-raised md-success" v-if="this.idEdit" @click="editCliente()">Editar</md-button>
                      <md-button class="md-raised md-success" v-else @click="createClient()">Crear</md-button>
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
    console.log(this.$route.params)
    this.getZonas();
    var idRuta = this.$route.params.idSelected
    this.idEdit = idRuta
    if (idRuta) {
      axios.get(Config.API_URL + 'get/ClienteZDesc/'+idRuta).then(response => {
      console.log(response.data[0])
      this.newClient.nombreApellido = response.data[0].nomapeCli;
      this.newClient.domicilio = response.data[0].domicilio;
      this.newClient.telefono = response.data[0].telefonoCli;
      this.newClient.idZona = response.data[0].idZona;
      this.newClient.descZona = response.data[0].descripcion;
      });
    }
  },
  methods: {
    getZonas() {
      axios.get(Config.API_URL + 'get/Zona').then(response => {
        console.log(response.data)
        this.zonas = Object.freeze(response.data)
      });
    },
    editCliente() {
      var bodyFormData = new FormData();
      bodyFormData.append('idCliente', this.idEdit) ;
      bodyFormData.append('nombreApellido', this.newClient.nombreApellido) ;
      bodyFormData.append('domicilio', this.newClient.domicilio) ;
      bodyFormData.append('telefono', this.newClient.telefono) ;
      bodyFormData.append('idZona', this.newClient.idZona) ;
      axios({
        method: 'PUT',
        url: Config.API_URL + 'update/modCliente',
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
    createClient() {
      var bodyFormData = new FormData();
      bodyFormData.append('nombreApellido', this.newClient.nombreApellido) ;
      bodyFormData.append('domicilio', this.newClient.domicilio) ;
      bodyFormData.append('telefono', this.newClient.telefono) ;
      bodyFormData.append('idZona', this.newClient.idZona) ;
      axios({
          method: 'POST',
          url: Config.API_URL + 'post/upCliente',
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
    },
    cleanCliente() {
      this.newClient.telefono = ''
      this.newClient.domicilio = ''
      this.newClient.nombreApellido = ''
      this.newClient.idZona = null
    }
  },
  data() {
    return {
      first: false,
      second:false,
      idEdit: null,
      zonas: [],
      newClient: {
        nombreApellido: null,
        telefono: null,
        domicilio: null,
        idZona: null,
        descZona: null
      }
    };
  }
};
</script>
