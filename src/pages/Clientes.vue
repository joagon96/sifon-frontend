<template>
  <div class="content">
    <div class="md-layout">
      <div
        class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100"
      >
        <md-card>
          <md-card-header data-background-color="green">
          <div class="md-size-100">  
            <h4 class="title md-size-80">Clientes Registrados
              <md-button class="md-raised md-info md-size-20" style="float: right; margin-top: 10px" @click="openDialog()">Agregar</md-button>
            </h4>
          </div>
          </md-card-header>
          <md-card-content>
            <div>
              <md-table v-model="this.clientes" table-header-color="green">
                <md-table-row slot="md-table-row" slot-scope="{ item }">
                  <md-table-cell md-label="Nombre">{{ item.nomapeCli }}</md-table-cell>
                  <md-table-cell md-label="Domicilio">{{ item.domicilio }}</md-table-cell>
                  <md-table-cell md-label="Teléfono">{{ item.telefonoCli }}</md-table-cell>
                  <md-table-cell md-label="Zona">{{ item.descripcion }}</md-table-cell>
                  <md-table-cell md-label="Acciones">
                    <div>
                      <md-button class="md-icon-button md-fab md-warning md-raised" @click="editCliente(item.idCliente)">
                        <md-icon>edit</md-icon>
                      </md-button>
                    </div>
                    <div>
                      <md-dialog-confirm
                        :md-active.sync="activePopup"
                        :md-backdrop="false"
                        md-title = "¿Eliminar Cliente?"
                        md-content = "El cliente se borrará de la base de datos."
                        md-confirm-text="Eliminar"
                        md-cancel-text="Cancelar"
                        @md-confirm="deleteCliente()"
                        />
                        <md-button class="md-icon-button md-fab md-danger md-raised" @click="changeId(item.idCliente)">
                          <md-icon>delete_forever</md-icon>
                        </md-button>
                    </div>
                  </md-table-cell>
                </md-table-row>
              </md-table>
            </div>
          </md-card-content>
          <div>
            <md-dialog :md-active.sync="showDialog" style="z-index: 5;">
              <md-dialog-title>Crear cliente</md-dialog-title>
              <div class="md-layout-item md-small-size-100 md-size-100">
                <div class="md-layout md-gutter">
                  <div class="md-layout-item md-size-100">
                    <md-field>
                      <label>Nombre y Apellido</label>
                      <md-input v-model="newClient.nombreApellido" type="text"></md-input>
                    </md-field>
                  </div>
                  <div class="md-layout-item md-size-100">
                    <md-field>
                      <label>Telefono</label>
                      <md-input v-model="newClient.telefono" type="text"></md-input>
                    </md-field>
                  </div>
                  <div class="md-layout-item">
                    <md-field>
                      <label>Domicilo</label>
                      <md-input v-model="newClient.domicilio" type="text"></md-input>
                    </md-field>
                  </div>
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
              <md-dialog-actions>
                <md-button class="md-danger" @click="closeDialog()">Cancelar</md-button>
                <md-button class="md-primary" @click="saveClient()">Guardar</md-button>
              </md-dialog-actions>
            </md-dialog>
          </div>
        </md-card>
      </div>
      <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100">
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import {Config} from '../config.js'

export default {
  name: 'DialogConfirm',
  
  mounted() {
    this.getClientes(),
    this.getZonas()
  },
  data() {
    return  {
      idDeleted: Number, 
      clientes: [],
      cliente: null,
      activePopup: false,
      value: null,
      showDialog: false,
      zonas: [],
      newClient: {
        idCliente: null,
        nombreApellido: null,
        telefono: null,
        domicilio: null,
        idZona: null
      },
      isEdit: false,
    };
  },
  methods: {
    changeId(id) {
      this.idDeleted = id
      this.activePopup = true
    },
    editCliente(idCliente) {
      axios.get(Config.API_URL + 'get/ClienteZDesc/'+idCliente).then(response => {
        this.newClient.idCliente = response.data[0].idCliente;
        this.newClient.nombreApellido = response.data[0].nomapeCli;
        this.newClient.domicilio = response.data[0].domicilio;
        this.newClient.telefono = response.data[0].telefonoCli;
        this.newClient.idZona = response.data[0].idZona;
      });
      this.isEdit = true
      this.showDialog = true
    },
    deleteCliente () {
      var bodyFormData = new FormData();
      bodyFormData.append('idCliente', this.idDeleted) ;
      axios({
        method: 'PUT',
        url: Config.API_URL + 'delete/delCliente',
        data: bodyFormData,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": "true"
        }
      }).then(response => {
        this.getClientes()
      });
    },
    getClientes () {
      axios.get(Config.API_URL + 'getH/ClienteZDesc',{headers: {"Authorization": localStorage.token}}).then(response => {
      this.clientes = Object.freeze(response.data);
    });
    },
    saveClient(){
      if (this.isEdit){
        this.updateClient()
      }else{
        this.createClient()
      }
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
        this.closeDialog()
        this.getClientes()
      });
    },
    updateClient() {
      var bodyFormData = new FormData();
      bodyFormData.append('idCliente', this.newClient.idCliente) ;
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
        this.closeDialog()
        this.getClientes()
      });
    },
    getZonas() {
      axios.get(Config.API_URL + 'getH/Zona').then(response => {
        this.zonas = Object.freeze(response.data)
      });
    },
    cleanClient(){
      this.newClient.idCliente = null;
      this.newClient.nombreApellido = null;
      this.newClient.telefono = null;
      this.newClient.domicilio = null;
      this.newClient.idZona = null;
    },
    closeDialog(){
      this.showDialog = false
      this.cleanClient()
    },
    openDialog(){
      this.cleanClient()
      this.isEdit = false
      this.showDialog = true
    }
  }
};

</script>

<style>
.title {
  font-size: 40px;
}
</style>
