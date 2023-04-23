<template>
    <div class="content">
        <div class="md-layout">
            <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100">
            <md-card>
                <md-card-header data-background-color="green">
                <div class="md-size-100">  
                  <h4 class="title md-size-80">Repartidores Registrados
                    <md-button class="md-raised md-info md-size-20" style="float: right; margin-top: 10px" @click="openDialog()">Agregar</md-button>
                  </h4>
                </div>

                </md-card-header>
                <md-card-content>
                  <div>
                    <md-table v-model="this.repartidores" table-header-color="green">
                      <md-table-row slot="md-table-row" slot-scope="{ item }">
                        <md-table-cell md-label="Nombre">{{ item.nomapeRep }}</md-table-cell>
                        <md-table-cell md-label="Teléfono">{{ item.telefonoRep }}</md-table-cell>
                        <md-table-cell md-label="Acciones">
                          <div>
                            <md-button class="md-icon-button md-fab md-warning md-raised" @click="editRepartidor(item.idRepartidor)">
                              <md-icon>edit</md-icon>
                            </md-button>
                          </div>
                          <div>
                            <md-dialog-confirm
                              :md-active.sync="activePopup"
                              :md-backdrop="false"
                              md-title = "¿Eliminar Repartidor?"
                              md-content = "El repartidor se borrará de la base de datos."
                              md-confirm-text="Eliminar"
                              md-cancel-text="Cancelar"
                              @md-confirm="deleteRepartidor()"
                              />
                              <md-button class="md-icon-button md-fab md-danger md-raised" @click="changeId(item.idRepartidor)">
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
                    <md-dialog-title>Crear repartidor</md-dialog-title>
                    <div class="md-layout-item md-small-size-100 md-size-100">
                      <div class="md-layout md-gutter">
                        <div class="md-layout-item md-size-100">
                          <md-field>
                            <label>Nombre y Apellido</label>
                            <md-input v-model="newRep.nombreApellido" type="text"></md-input>
                          </md-field>
                        </div>
                        <div class="md-layout-item md-size-100">
                          <md-field>
                            <label>Telefono</label>
                            <md-input v-model="newRep.telefono" type="text"></md-input>
                          </md-field>
                        </div>
                      </div>
                    </div>
                    <md-dialog-actions>
                      <md-button class="md-danger" @click="closeDialog()">Cancelar</md-button>
                      <md-button class="md-primary" @click="saveRepartidor()">Guardar</md-button>
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
    this.getRepartidores()
  },
  data() {
    return {
      idDeleted: Number,
      repartidores: [],
      activePopup: false,
      value: null,
      newRep: {
        idRepartidor: null,
        nombreApellido: '',
        telefono: '',
      },
      showDialog: false,
      isEdit: false
    };
  },
  methods: {
    changeId(id) {
      this.idDeleted = id
      this.activePopup = true
    },
    editRepartidor(idRepartidor) {
      axios.get(Config.API_URL + 'get/Repartidor/'+idRepartidor).then(response => {
        this.newRep.idRepartidor = response.data[0].idRepartidor
        this.newRep.nombreApellido = response.data[0].nomapeRep
        this.newRep.telefono = response.data[0].telefonoRep
      })
      this.isEdit = true
      this.showDialog = true
    },
    saveRepartidor(){
      if (this.isEdit){
        this.updateRepartidor()
      }else{
        this.createRepartidor()
      }
    },
    updateRepartidor() {
      var bodyFormData = new FormData();
      bodyFormData.append('idRepartidor', this.newRep.idRepartidor);
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
        this.closeDialog()
        this.getRepartidores()
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
        this.closeDialog()
        this.getRepartidores()
      });
    },
    deleteRepartidor() {
      var bodyFormData = new FormData();
      bodyFormData.append('idRepartidor', this.idDeleted) ;
      axios({
        method: 'PUT',
        url: Config.API_URL + 'delete/delRepartidor',
        data: bodyFormData,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": "true"
        }
      }).then(response => {
        this.getRepartidores()
      });
    },
    getRepartidores () {
      axios.get(Config.API_URL + 'getH/Repartidor',{headers: {"Authorization": localStorage.token}}).then(response => {
        console.log(response.data);
        this.repartidores = Object.freeze(response.data);
      });
    },
    cleanRep(){
      this.newRep.idRepartidor = null
      this.newRep.nombreApellido = ''
      this.newRep.telefono = ''
    },
    closeDialog(){
      this.showDialog = false
      this.cleanRep()
    },
    openDialog(){
      this.cleanRep()
      this.isEdit = false
      this.showDialog = true
    }
  }
};
</script>