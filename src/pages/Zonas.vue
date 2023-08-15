<template>
    <div class="content">
        <div class="md-layout">
            <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100">
            <md-card>
                <md-card-header data-background-color="green">
                <div class="md-size-100">  
                  <h4 class="title md-size-80">Zonas Registradas 
                    <md-button class="md-raised md-info md-size-20" style="float: right; margin-top: 10px" @click="openDialog()">Agregar</md-button>
                      <download-excel style="float: right; margin-right: 20px;"
                        :data   = "this.zonas"
                        :fields = "zonasFields"
                        :name = "zonasName">
                        <md-button class="md-button md-info md-raised" style="margin-top: 10px">
                          <md-icon>download</md-icon>
                        </md-button>
                      </download-excel>
                  </h4>
                </div>

                </md-card-header>
                <md-card-content>
                  <div>
                    <md-table v-model="this.zonas" table-header-color="green">
                      <md-table-row slot="md-table-row" slot-scope="{ item }">
                        <md-table-cell md-label="Zona">{{ item.descripcion }}</md-table-cell>
                        <md-table-cell md-label="Acciones">                         
                          <div>
                            <md-button class="md-icon-button md-fab md-warning md-raised" @click="editZona(item.idZona)">
                              <md-icon>edit</md-icon>
                            </md-button>
                          </div>
                          <div>
                          <md-dialog-confirm
                            :md-active.sync="activePopup"
                            :md-backdrop="false"
                            md-title = "¿Eliminar Zona?"
                            md-content = "La zona se borrará de la base de datos."
                            md-confirm-text="Aceptar"
                            md-cancel-text="Cancelar"
                            @md-confirm="deleteZona()"
                            />
                            <md-button class="md-icon-button md-fab md-danger md-raised" @click="changeId(item.idZona)">
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
                    <md-dialog-title v-if="isEdit">Editar zona</md-dialog-title>
                    <md-dialog-title v-else>Crear zona</md-dialog-title>
                    <div class="md-layout-item md-small-size-100 md-size-100">
                      <div class="md-layout md-gutter">
                        <div class="md-layout-item md-size-100">
                          <md-field>
                            <md-input placeholder="Ejemplo: San Nicolás Sur" v-model="newZona.descripcion" type="text"></md-input>
                          </md-field>
                        </div>
                      </div>
                    </div>
                    <md-dialog-actions>
                      <md-button class="md-danger" @click="closeDialog()">Cancelar</md-button>
                      <md-button class="md-primary" @click="saveZona()">Guardar</md-button>
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
import moment from 'moment';

export default {
  mounted() {
    this.getZonas()
  },
  data() {
    return {
      idDeleted: Number,
      zonas: [],
      activePopup: false,
      newZona: {
        idZona: null,
        descripcion: ''
      },
      showDialog: false,
      isEdit: false,
      zonasFields:{
        'zona': 'descripcion'
      },
      zonasName: 'Zonas ' + moment(Date.now()).format("DD-MM-YYYY")
    };
  },
  methods: {
    changeId(id) {
      this.idDeleted = id
      this.activePopup = true
    },
    editZona(idZona) {
      axios.get(Config.API_URL + 'get/Zona/'+idZona).then(response => {
        this.newZona.idZona = response.data[0].idZona
        this.newZona.descripcion = response.data[0].descripcion
      })
      this.isEdit = true
      this.showDialog = true
    },
    saveZona(){
      if (this.isEdit){
        this.updateZona()
      }else{
        this.createZona()
      }
    },
    updateZona() {
      var bodyFormData = new FormData();
      bodyFormData.append('idZona', this.newZona.idZona);
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
        this.closeDialog()
        this.getZonas()
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
        this.closeDialog()
        this.getZonas()
      });
    },
    deleteZona () {
      var bodyFormData = new FormData();
      bodyFormData.append('idZona', this.idDeleted) ;
      axios({
        method: 'PUT',
        url: Config.API_URL + 'delete/delZona',
        data: bodyFormData,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": "true"
        }
      }).then(response => {
        this.getZonas()
      });
    },
    getZonas () {
      axios.get(Config.API_URL + 'getH/Zona',{headers: {"Authorization": localStorage.token}}).then(response => {
      this.zonas = Object.freeze(response.data);
      });
    },
    cleanZona(){
      this.newZona.idZona = null
      this.newZona.descripcion = ''
    },
    closeDialog(){
      this.showDialog = false
      this.cleanZona()
    },
    openDialog(){
      this.cleanZona()
      this.isEdit = false
      this.showDialog = true
    }
  }
};
</script>
