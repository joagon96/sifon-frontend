<template>
  <div class="content">
    <div class="md-layout">
      <div
        class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100"
      >
        <md-card>
          <md-card-header data-background-color="green">
          <div class="md-size-100">
            <h4 class="title md-size-80">Clientes en zona {{ this.$route.params.zonaSelected }}
              <md-button class="md-raised md-info md-size-20" style="float: right; margin-top: 10px" @click="showDialog = true">Agregar</md-button>
            </h4>
          </div>
          </md-card-header>
          <md-card-content>
            <div>
              <md-table v-model="this.clientesenreparto" table-header-color="green">
                <md-table-row slot="md-table-row" slot-scope="{ item }">
                  <md-table-cell md-label="Nombre">{{ item.nomapeCli }}</md-table-cell>
                  <md-table-cell md-label="Domicilio">{{ item.domicilio }}</md-table-cell>
                  <md-table-cell md-label="Compra 12L">{{item.com12}}</md-table-cell>
                  <md-table-cell md-label="Compra 20L">{{item.com20}}</md-table-cell>
                  <md-table-cell md-label="Compra Soda">{{item.comSoda}}</md-table-cell>
                  <md-table-cell md-label="Acciones">
                    <div>
                      <md-button class="md-icon-button md-fab md-danger md-raised" @click="deleteLineaReparto(item.idLR)">
                        <md-icon>delete_forever</md-icon>
                      </md-button>
                    </div>
                  </md-table-cell>  
                </md-table-row>
              </md-table>
            </div>
          </md-card-content>
        </md-card>
      </div>
      <div>
        <md-dialog :md-active.sync="showDialog" style="z-index: 5;">
          <md-dialog-title>Agregar cliente</md-dialog-title>
          <div class="md-layout-item md-small-size-100 md-size-100">
            <div class="md-layout md-gutter">
              <div class="md-layout-item md-size-100">
                <md-field>
                  <label for="movie">Cliente</label>
                  <md-select md-dense v-model="newlineareparto.idCliente">
                    <md-option v-for="c in clientesFaltantes" :key="c.idCliente" :value="c.idCliente">{{c.nomapeCli}}</md-option>
                  </md-select>
                </md-field>
              </div>
              <div class="md-layout-item">
                <md-field>
                  <label>Bidones 12L</label>
                  <md-input v-model="newlineareparto.com12" type="text"></md-input>
                </md-field>
              </div>
              <div class="md-layout-item">
                <md-field>
                  <label>Bidones 20L</label>
                  <md-input v-model="newlineareparto.com20" type="text"></md-input>
                </md-field>
              </div>
              <div class="md-layout-item">
                <md-field>
                  <label>Sifones Soda</label>
                  <md-input v-model="newlineareparto.comSoda" type="text"></md-input>
                </md-field>
              </div>
            </div>
          </div>
          <md-dialog-actions>
            <md-button class="md-danger" @click="showDialog = false">Cancelar</md-button>
            <md-button class="md-primary"  @click="createLineaReparto()">Guardar</md-button>
          </md-dialog-actions>
        </md-dialog>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import {Config} from '../config.js'

export default {
  created() {
    console.log(this.$route.params)
    //this.getClientesZona()
    this.getLineas()
    this.getClientesFaltantes()
  },
  data() {
    return {
      newlineareparto:{
        idCliente: null,
        nomapeCli: null,
        com12: null,
        com20: null,
        comSoda: null,
      },
      showDialog: false,
      x: false,
      clientesZona: [],
      clientesenreparto: [],
      clientesFaltantes: [],
    };
  },
  methods: {
    deleteLineaReparto(idSelected){
      var bodyFormData = new FormData();
      bodyFormData.append('idLineaReparto', idSelected) ;
      axios({
        method: 'DELETE',
        url: Config.API_URL + 'delete/delLineaReparto',
        data: bodyFormData,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": "true"
        }
      }).then(response => {
        console.log(response.data);
        this.getLineas()
        this.getClientesFaltantes()
      });
    },
    getClientesFaltantes() {
      axios({
          method: 'GET',
          url: Config.API_URL + 'get/ClientesFaltantes/' + this.$route.params.idZona + '/' + this.$route.params.idReparto ,
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": "true"
          }
      }).then(response => {
        this.clientesFaltantes=response.data
        console.log(response.data)
      });
    },
    getLineas() {
      axios({
          method: 'GET',
          url: Config.API_URL + 'get/RepartoxLineaReparto/' + this.$route.params.idReparto,
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": "true"
          }
      }).then(response => {
        console.log(response.data)
        this.clientesenreparto = Object.freeze(response.data)
      });
    },
    createLineaReparto() {
      var bodyFormData = new FormData();
      bodyFormData.append('idCliente', this.newlineareparto.idCliente);
      bodyFormData.append('idReparto', this.$route.params.idReparto);
      bodyFormData.append('com12', this.newlineareparto.com12);
      bodyFormData.append('com20', this.newlineareparto.com20);
      bodyFormData.append('comSoda', this.newlineareparto.comSoda);
      axios({
          method: 'POST',
          url: Config.API_URL + 'post/upLineaReparto',
          data: bodyFormData,
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": "true"
          }
      }).then(response => {
        this.showDialog = false
        this.getLineas()
        console.log(response.data);
      });
    }
  }
};

</script>

<style>
.title {
  font-size: 40px;
}
</style>