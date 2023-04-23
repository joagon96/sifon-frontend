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
              <md-button v-if="this.estadoReparto === 'pendiente'" class="md-raised md-info md-size-20" style="float: right; margin-top: 10px" @click="openDialog()">Agregar</md-button>
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
                  <md-table-cell md-label="Pago">{{item.pago}}$</md-table-cell>
                  <md-table-cell md-label="Fiado">{{item.fiado}}$</md-table-cell>
                  <md-table-cell md-label="Devuelve 12L">{{item.dev12}}</md-table-cell>
                  <md-table-cell md-label="Devuelve 20L">{{item.dev20}}</md-table-cell>
                  <md-table-cell md-label="Devuelve Soda">{{item.devSoda}}</md-table-cell>
                  <md-table-cell md-label="Observaciones">{{truncateText(item.observacion,15)}}</md-table-cell>
                  <md-table-cell md-label="Acciones">
                    <div>
                      <md-button class="md-icon-button md-fab md-warning md-raised" @click="editLineaReparto(item.idLR)">
                        <md-icon>edit</md-icon>
                      </md-button>
                    </div>
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
                  <label>Bidones 12L estimados</label>
                  <md-input v-model="newlineareparto.est12" type="text"></md-input>
                </md-field>
              </div>
              <div class="md-layout-item">
                <md-field>
                  <label>Bidones 20L estimados</label>
                  <md-input v-model="newlineareparto.est20" type="text"></md-input>
                </md-field>
              </div>
              <div class="md-layout-item">
                <md-field>
                  <label>Sifones Soda estimados</label>
                  <md-input v-model="newlineareparto.estSoda" type="text"></md-input>
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

      <div>
        <md-dialog :md-active.sync="showEditDialog" style="z-index: 5;">
          <md-dialog-title>Agregar cliente</md-dialog-title>
          <div class="md-layout-item md-small-size-100 md-size-100">
            <div class="md-layout md-gutter">
              <div class="md-layout-item md-size-100">
                <md-field>
                  <label for="movie">Cliente</label>
                  <md-input v-model="newlineareparto.nomapeCli" type="text" disabled></md-input>
                </md-field>
              </div>
              <div class="md-layout-item md-size-33">
                <md-field>
                  <label>Bidones estimados 12L</label>
                  <md-input v-model="newlineareparto.est12" type="number"></md-input>
                </md-field>
              </div>
              <div class="md-layout-item md-size-33">
                <md-field>
                  <label>Bidones comprados 12L</label>
                  <md-input v-model="newlineareparto.com12" type="number"></md-input>
                </md-field>
              </div>
              <div class="md-layout-item md-size-33">
                <md-field>
                  <label>Bidones devueltos 12L</label>
                  <md-input v-model="newlineareparto.dev12" type="number"></md-input>
                </md-field>
              </div>
              <div class="md-layout-item md-size-33">
                <md-field>
                  <label>Bidones estimados 20L</label>
                  <md-input v-model="newlineareparto.est20" type="number"></md-input>
                </md-field>
              </div>
              <div class="md-layout-item md-size-33">
                <md-field>
                  <label>Bidones comprados 20L</label>
                  <md-input v-model="newlineareparto.com20" type="number"></md-input>
                </md-field>
              </div>
              <div class="md-layout-item md-size-33">
                <md-field>
                  <label>Bidones devueltos 20L</label>
                  <md-input v-model="newlineareparto.dev20" type="number"></md-input>
                </md-field>
              </div>
              <div class="md-layout-item md-size-33">
                <md-field>
                  <label>Sifones estimados</label>
                  <md-input v-model="newlineareparto.estSoda" type="number"></md-input>
                </md-field>
              </div>
              <div class="md-layout-item md-size-33">
                <md-field>
                  <label>Sifones comprados</label>
                  <md-input v-model="newlineareparto.comSoda" type="number"></md-input>
                </md-field>
              </div>
              <div class="md-layout-item md-size-33">
                <md-field>
                  <label>Sifones devueltos</label>
                  <md-input v-model="newlineareparto.devSoda" type="number"></md-input>
                </md-field>
              </div>
              <div class="md-layout-item md-size-50">
                <md-field>
                  <label>Pago</label>
                  <md-input v-model="newlineareparto.pago" type="number"></md-input>
                  <md-icon>attach_money</md-icon>
                </md-field>
              </div>
              <div class="md-layout-item md-size-50">
                <md-field>
                  <label>Fiado</label>
                  <md-input v-model="newlineareparto.fiado" type="number"></md-input>
                  <md-icon>attach_money</md-icon>
                </md-field>
              </div>
              <div class="md-layout-item">
                <md-field>
                  <label>Observaciones</label>
                  <md-textarea v-model="newlineareparto.observacion" type="text" md-autogrow></md-textarea>
                </md-field>
              </div>
            </div>
          </div>
          <md-dialog-actions>
            <md-button class="md-danger" @click="closeEditDialog()">Cancelar</md-button>
            <md-button class="md-primary"  @click="updateLineaReparto()">Guardar</md-button>
          </md-dialog-actions>
        </md-dialog>
      </div>

      <div>
        <md-dialog :md-active.sync="showObservacion" style="z-index: 5;">
          <md-dialog-title>Observaciones</md-dialog-title>
          <div class="md-layout-item md-small-size-100 md-size-100">
            <div class="md-layout md-gutter">
              <p>aca van las observaciones</p>
            </div>
          </div>
          <md-dialog-actions>
            <md-button class="md-danger" @click="closeEditDialog()">Cancelar</md-button>
            <md-button class="md-primary"  @click="updateLineaReparto()">Guardar</md-button>
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
    this.getLineas()
  },
  data() {
    return {
      newlineareparto:{
        idLR: null,
        idCliente: null,
        nomapeCli: null,
        est12: null,
        est20: null,
        estSoda: null,
        com12: null,
        com20: null,
        comSoda: null,
        dev12:null,
        dev20:null,
        devSoda:null,
        pago: null,
        fiado: null,
        observacion: null
      },
      showDialog: false,
      showEditDialog: false,
      x: false,
      clientesZona: [],
      clientesenreparto: [],
      clientesFaltantes: [],
      estadoReparto: null
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
        this.estadoReparto = response.data[0].estado
        this.clientesenreparto = Object.freeze(response.data)
      });
    },
    editLineaReparto(idLR){
      axios.get(Config.API_URL + 'get/LineaRepartoTotal/'+idLR).then(response => {
        this.newlineareparto.idLR = response.data[0].idLR
        this.newlineareparto.idCliente = response.data[0].idCliente
        this.newlineareparto.nomapeCli = response.data[0].nomapeCli
        this.newlineareparto.est12 = response.data[0].est12
        this.newlineareparto.est20 = response.data[0].est20
        this.newlineareparto.estSoda = response.data[0].estSoda
        this.newlineareparto.com12 = response.data[0].com12
        this.newlineareparto.com20 = response.data[0].com20
        this.newlineareparto.comSoda = response.data[0].comSoda
        this.newlineareparto.dev12 = response.data[0].dev12
        this.newlineareparto.dev20 = response.data[0].dev20
        this.newlineareparto.devSoda = response.data[0].devSoda
        this.newlineareparto.pago = response.data[0].pago
        this.newlineareparto.fiado = response.data[0].fiado
        this.newlineareparto.observacion = response.data[0].observacion
      });
      this.showEditDialog = true
    },
    createLineaReparto() {
      var bodyFormData = new FormData();
      bodyFormData.append('idCliente', this.newlineareparto.idCliente);
      bodyFormData.append('idReparto', this.$route.params.idReparto);
      bodyFormData.append('est12', this.newlineareparto.est12);
      bodyFormData.append('est20', this.newlineareparto.est20);
      bodyFormData.append('estSoda', this.newlineareparto.estSoda);
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
        this.closeDialog()
        this.getLineas()
      });
    },
    updateLineaReparto(){
      var bodyFormData = new FormData();
      bodyFormData.append('idLR', this.newlineareparto.idLR);
      bodyFormData.append('idCliente', this.newlineareparto.idCliente);
      bodyFormData.append('idReparto', this.$route.params.idReparto);
      bodyFormData.append('est12', this.newlineareparto.est12);
      bodyFormData.append('est20', this.newlineareparto.est20);
      bodyFormData.append('estSoda', this.newlineareparto.estSoda);
      bodyFormData.append('com12', this.newlineareparto.com12);
      bodyFormData.append('com20', this.newlineareparto.com20);
      bodyFormData.append('comSoda', this.newlineareparto.comSoda);
      bodyFormData.append('dev12', this.newlineareparto.dev12);
      bodyFormData.append('dev20', this.newlineareparto.dev20);
      bodyFormData.append('devSoda', this.newlineareparto.devSoda);
      bodyFormData.append('pago', this.newlineareparto.pago);
      bodyFormData.append('fiado', this.newlineareparto.fiado);
      bodyFormData.append('observacion', this.newlineareparto.observacion);
      axios({
          method: 'PUT',
          url: Config.API_URL + 'update/modLineaReparto',
          data: bodyFormData,
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": "true"
          }
      }).then(response => {
        this.closeEditDialog()
        this.getLineas()
      });
    },
    cleanLinea(){
      this.newlineareparto.idLR = null
      this.newlineareparto.idCliente = null
      this.newlineareparto.nomapeCli = null
      this.newlineareparto.est12 = null
      this.newlineareparto.est20 = null
      this.newlineareparto.estSoda = null
      this.newlineareparto.com12 = null
      this.newlineareparto.com20 = null
      this.newlineareparto.comSoda = null
      this.newlineareparto.dev12 = null
      this.newlineareparto.dev20 = null
      this.newlineareparto.devSoda = null
      this.newlineareparto.pago = null
      this.newlineareparto.fiado = null
      this.newlineareparto.observacion = null
    },
    closeDialog(){
      this.showDialog = false
      this.cleanLinea()
    },
    closeEditDialog(){
      this.showEditDialog = false
      this.cleanLinea()
    },
    openDialog(){
      this.getClientesFaltantes()
      this.cleanLinea()
      this.isEdit = false
      this.showDialog = true
    },
    truncateText(text, stop, clamp){
      if (text) {
        return text.slice(0, stop) + (stop < text.length ? clamp || '...' : '')
      }
      return '-'
    }
  }
};

</script>

<style>
.title {
  font-size: 40px;
}

.md-tooltip{
  max-width: 500px !important;
  width: 400px !important;
}
</style>