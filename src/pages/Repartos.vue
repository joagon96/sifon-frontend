<template>
    <div class="content">
        <div class="md-layout">
            <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100">
            <md-card>
                <md-card-header data-background-color="green">
                <div class="md-size-100">  
                  <h4 class="title md-size-80">Repartos
                    <md-button class="md-raised md-info md-size-20" style="float: right; margin-top: 10px" @click="openDialog()">Agregar</md-button>
                  </h4>
                </div>
                </md-card-header>

                <md-card-content>
                  <div>
                    <md-table v-model="this.repartos" table-header-color="green">
                      <md-table-row slot="md-table-row" slot-scope="{ item }">
                        <md-table-cell md-label="Zona">{{ item.descripcion }}</md-table-cell>
                        <md-table-cell md-label="Día">{{ item.dia }}</md-table-cell>
                        <md-table-cell md-label="Repartidor">{{ item.nomapeRep }}</md-table-cell>
                        <md-table-cell md-label="Estado">{{ item.estado }}</md-table-cell>
                        <md-table-cell md-label="Acciones">
                          <div>
                            <md-button class="md-icon-button md-fab md-warning md-raised" @click="editReparto(item.idReparto)">
                              <md-icon>edit</md-icon>
                            </md-button>
                          </div>
                          <div>
                            <md-dialog-confirm
                              :md-active.sync="activePopup"
                              :md-backdrop="false"
                              md-title = "¿Eliminar Reparto?"
                              md-content = "El reparto se borrara de la base de datos"
                              md-confirm-text="Eliminar"
                              md-cancel-text="Cancelar"
                              @md-confirm="deleteReparto()"
                              />
                              <md-button class="md-icon-button md-fab md-danger md-raised clickable" @click="changeId(item.idReparto)">
                                <md-icon>delete_forever</md-icon>
                              </md-button>
                          </div>
                          <div>
                            <md-button @click="showClientes(item.idZona, item.descripcion, item.idReparto)" class="md-icon-button md-fab md-info md-raised">
                                <md-icon>grid_on</md-icon>
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
                        <div class="md-layout-item md-size-50">
                          <md-field>
                            <label>Repartidor</label>
                            <md-select md-dense v-model="newReparto.idRepartidor">
                              <md-option v-for="r in repartidores" :key="r.idRepartidor" :value="r.idRepartidor">{{r.nomapeRep}}</md-option>
                            </md-select>
                          </md-field>
                        </div>
                        <div class="md-layout-item md-size-50">
                          <md-field>
                            <label>Zona</label>
                            <md-select md-dense v-model="newReparto.idZona">
                              <md-option v-for="z in zonas" :key="z.idZona" :value="z.idZona">{{z.descripcion}}</md-option>
                            </md-select>
                          </md-field>
                        </div>
                        <div class="md-layout-item md-size-50">
                          <md-field>
                            <label>Dia</label>
                            <md-select md-dense v-model="newReparto.dia">
                              <md-option v-for="d in dias" :key="d.id" :value="d.name">{{d.name}}</md-option>
                            </md-select>
                          </md-field>
                        </div>
                        <div v-if="this.isEdit" class="md-layout-item md-size-50">
                          <md-field>
                            <label>Estado</label>
                            <md-select md-dense v-model="newReparto.estado">
                              <md-option v-for="e in estados" :key="e.id" :value="e.name">{{e.name}}</md-option>
                            </md-select>
                          </md-field>
                        </div>
                      </div>
                    </div>
                    <md-dialog-actions>
                      <md-button class="md-danger" @click="closeDialog()">Cancelar</md-button>
                      <md-button class="md-primary" @click="saveReparto()">Guardar</md-button>
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
  mounted() {
    this.getRepartos()
    this.getRepartidores()
    this.getZonas()
  },
  data() {
    return {
      repartos: [],
      activePopup: false,
      newReparto: {
        idReparto: null,
        idZona: null,
        idRepartidor: null,
        dia: null,
        estado : null,
      },
      showDialog: false,
      isEdit: false,
      dias: [
        {id: 1, name: 'Lunes'},
        {id: 2, name: 'Martes' },
        {id: 3, name: 'Miercoles'},
        {id: 4, name: 'Jueves'},
        {id: 5, name: 'Viernes' },
        {id: 6, name: 'Sabado'},
        {id: 7, name: 'Domingo'}
      ],
      estados: [
        {id: 1, name: 'pendiente'},
        {id: 2, name: 'finalizado' }
      ],
      repartidores: [],
      zonas: [],
    };
  },
  methods: {
    showClientes(idz, dz, idr) {
      this.$router.push({
        name: "Clientes en Reparto",
        params: {
          idZona: idz,
          zonaSelected: dz,
          idReparto: idr
        }
      })
    },
    iraPlanilla(){
      this.$router.push({name: "Planilla Reparto"})
    },
    changeId(id) {
      this.idDeleted = id
      this.activePopup = true
    },
    saveReparto(){
      if (this.isEdit){
        this.updateReparto()
      }else{
        this.createReparto()
      }
    },
    editReparto(idReparto) {
      axios.get(Config.API_URL + 'get/RepartoTotal/'+idReparto).then(response => {
        this.newReparto.idReparto = response.data[0].idReparto
        this.newReparto.idZona = response.data[0].idZona
        this.newReparto.idRepartidor = response.data[0].idRepartidor
        this.newReparto.dia = response.data[0].dia
        this.newReparto.estado = response.data[0].estado
      });
      this.isEdit = true
      this.showDialog = true
    },
    createReparto() {
      var bodyFormData = new FormData();
      bodyFormData.append('idZona', this.newReparto.idZona);
      bodyFormData.append('idRepartidor', this.newReparto.idRepartidor);
      bodyFormData.append('dia', this.newReparto.dia);
      axios({
          method: 'POST',
          url: Config.API_URL + 'post/upReparto',
          data: bodyFormData,
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": "true"
          }
      }).then(response => {
        this.closeDialog()
        this.getRepartos()
      });
    },
    updateReparto() {
      var bodyFormData = new FormData();
      bodyFormData.append('idReparto', this.newReparto.idReparto);
      bodyFormData.append('dia', this.newReparto.dia);
      bodyFormData.append('idRepartidor', this.newReparto.idRepartidor);
      bodyFormData.append('idZona', this.newReparto.idZona);
      bodyFormData.append('estado', this.newReparto.estado)
      axios({
        method: 'PUT',
        url: Config.API_URL + 'update/modReparto',
        data: bodyFormData,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": "true"
        }
      }).then(response => {
        this.closeDialog()
        this.getRepartos()
      });
    },
    deleteReparto () {
      var bodyFormData = new FormData();
      bodyFormData.append('idReparto', this.idDeleted) ;
      axios({
        method: 'PUT',
        url: Config.API_URL + 'delete/delReparto',
        data: bodyFormData,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": "true"
        }
      }).then(response => {
        this.getRepartos()
      });
    },
    getRepartos () {
      axios.get(Config.API_URL + 'getH/RepartoTotal',{headers: {"Authorization": localStorage.token}}).then(response => {
      console.log(response.data);
      this.repartos = Object.freeze(response.data);
      });
    },
    getZonas() {
      axios.get(Config.API_URL + 'getH/Zona').then(response => {
        this.zonas = Object.freeze(response.data)
      });
    },
    getRepartidores() {
      axios.get(Config.API_URL + 'getH/Repartidor').then(response => {
        this.repartidores = Object.freeze(response.data)
      });
    },
    cleanReparto(){
      this.newReparto.idReparto = null
      this.newReparto.idZona = null
      this.newReparto.idRepartidor = null
      this.newReparto.dia = null
    },
    closeDialog(){
      this.showDialog = false
      this.cleanReparto()
    },
    openDialog(){
      this.cleanReparto()
      this.isEdit = false
      this.showDialog = true
    }
  }
};
</script>
<style>

</style>


