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
              <md-button class="md-raised md-info md-size-20" style="float: right; margin-top: 10px" @click="openDialog()">Agregar</md-button>
              <download-excel style="float: right; margin-right: 20px;"
                :data   = "this.clientesenreparto"
                :fields = "clientesenrepartoFields"
                :name = "clientesenrepartoName">
                <md-button class="md-button md-info md-raised" style="margin-top: 10px">
                  <md-icon>download</md-icon>
                </md-button>
              </download-excel>
            </h4>
          </div>
          </md-card-header>
          <md-card-content>
            <div>
              <md-table v-model="this.clientesenreparto" table-header-color="green">
                <md-table-row slot="md-table-row" slot-scope="{ item }">
                  <md-table-cell md-label="Nombre">{{ item.nomapeCli }}<md-icon v-if="item.deuda>0">error</md-icon></md-table-cell>
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
                    <div>
                      <md-button class="md-icon-button md-fab md-success md-raised" @click="deudaDialog(item.idCliente,item.nomapeCli,item.deuda)">
                        <md-icon>price_check</md-icon>
                      </md-button>
                    </div>
                  </md-table-cell>  
                </md-table-row>
              </md-table>
            </div>
          </md-card-content>
        </md-card>
        <div class="md-size-100">
            <md-button class="md-raised md-info md-size-20" style="float: right; margin-top: 10px" @click="showFinDialog = true">Finalizar Reparto</md-button>
        </div>
        <div class="md-size-100">
            <md-button class="md-raised md-success md-size-20" style="float: right; margin-top: 10px; margin-right: 10px;" @click="resumenReparto()">Ver Resumen</md-button>
        </div>
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
          <md-dialog-title>Editar cliente</md-dialog-title>
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
        <md-dialog-confirm
          :md-active.sync="showFinDialog"
          md-title="¿Finalizar reparto?"
          md-content="Una vez finalizado se generara una nueva planilla de reparto."
          md-confirm-text="Aceptar"
          md-cancel-text="Cancelar"
          @md-cancel="showFinDialog = false"
          @md-confirm="finishReparto()" />
      </div>

      <div>
        <md-dialog :md-active.sync="showDeudaDialog" style="z-index: 5;">
          <md-dialog-title>Deuda cliente {{this.deuda.cliente}}</md-dialog-title>
          <div class="md-layout-item md-small-size-100 md-size-100">
            <div class="md-layout md-gutter">
              <div class="md-layout-item md-size-100">
                <md-field>
                  <label for="movie">Fiado</label>
                  <md-input v-model="deuda.fiado" type="text" disabled></md-input>
                </md-field>
              </div>
              <div class="md-layout-item md-size-100">
                <md-field>
                  <label>Paga</label>
                  <md-input v-model="deuda.paga" type="number"></md-input>
                </md-field>
              </div>
              <div class="md-layout-item md-size-100">
                <md-field>
                  <label for="movie">Forma de pago</label>
                  <md-select md-dense v-model="deuda.comentario">
                    <md-option v-for="f in formasDePago" :key="f.id" :value="f.comentario">{{f.comentario}}</md-option>
                  </md-select>
                </md-field>
              </div>
            </div>
          </div>
          <md-dialog-actions>
            <md-button class="md-danger" @click="closeDeudaDialog()">Cancelar</md-button>
            <md-button class="md-primary"  @click="updateDeuda()">Guardar</md-button>
          </md-dialog-actions>
        </md-dialog>
      </div>

      <div>
        <md-dialog :md-active.sync="showResumenDialog" style="z-index: 5;">
          <md-dialog-title>Resumen</md-dialog-title>
          <div class="md-layout-item md-small-size-100 md-size-100">
            <div class="md-layout md-gutter">
              <div class="md-layout-item md-size-100">
                <md-field>
                  <label for="movie">Repartidor</label>
                  <md-input v-model="resumen.nomapeRep" type="text" disabled></md-input>
                </md-field>
              </div>
              <div class="md-layout-item md-size-33">
                <md-field>
                  <label>Bidones comprados 12L</label>
                  <md-input v-model="resumen.com12" type="number" disabled></md-input>
                </md-field>
              </div>
              <div class="md-layout-item md-size-33">
                <md-field>
                  <label>Bidones devueltos 12L</label>
                  <md-input v-model="resumen.dev12" type="number" disabled></md-input>
                </md-field>
              </div>
              <div class="md-layout-item md-size-33">
                <md-field>
                  <label>Bidones comprados 20L</label>
                  <md-input v-model="resumen.com20" type="number" disabled></md-input>
                </md-field>
              </div>
              <div class="md-layout-item md-size-33">
                <md-field>
                  <label>Bidones devueltos 20L</label>
                  <md-input v-model="resumen.dev20" type="number" disabled></md-input>
                </md-field>
              </div>
              <div class="md-layout-item md-size-33">
                <md-field>
                  <label>Sifones comprados</label>
                  <md-input v-model="resumen.comSoda" type="number" disabled></md-input>
                </md-field>
              </div>
              <div class="md-layout-item md-size-33">
                <md-field>
                  <label>Sifones devueltos</label>
                  <md-input v-model="resumen.devSoda" type="number" disabled></md-input>
                </md-field>
              </div>
              <div class="md-layout-item md-size-50">
                <md-field>
                  <label>Pago</label>
                  <md-input v-model="resumen.pago" type="number" disabled></md-input>
                  <md-icon>attach_money</md-icon>
                </md-field>
              </div>
              <div class="md-layout-item md-size-50">
                <md-field>
                  <label>Fiado</label>
                  <md-input v-model="resumen.fiado" type="number" disabled></md-input>
                  <md-icon>attach_money</md-icon>
                </md-field>
              </div>
            </div>
          </div>
          <md-dialog-actions>
            <download-excel style="float: right; margin-right: 10px;"
                :data   = "resumenData"
                :fields = "resumenFields"
                :name = "resumenName">
                <md-button class="md-button md-success md-raised">
                  Descargar
                </md-button>
              </download-excel>
            <md-button class="md-primary" @click="closeResumenDialog()">Aceptar</md-button>
          </md-dialog-actions>
        </md-dialog>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import {Config} from '../config.js'
import moment from 'moment';

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
      deuda:{
        idCliente: null,
        cliente: null,
        fiado: null,
        paga: null,
        comentario: null,
      },
      formasDePago:[
        {id: 1, comentario: "efectivo"},
        {id: 2, comentario: "transferencia bancaria"},
        {id: 3, comentario: "otro"}
      ],
      showDialog: false,
      showEditDialog: false,
      showFinDialog: false,
      showDeudaDialog: false,
      showResumenDialog: false,
      x: false,
      clientesZona: [],
      clientesenreparto: [],
      clientesFaltantes: [],
      clientesenrepartoFields:{
        'Nombre y Apellido': 'nomapeCli',
        'Domicilio': 'domicilio',
        'Compra 12': 'com12',
        'Compra 20': 'com20',
        'Compra Soda': 'comSoda',
        'Pago': 'pago',
        'Fiado': 'fiado',
        'Devuelve 12': 'dev12',
        'Devuelve 20': 'dev20',
        'Devuelve Soda': 'devSoda',
        'Observaciones': 'observacion'
      },
      clientesenrepartoName: 'Reparto en curso zona ' + this.$route.params.zonaSelected + ' ' + moment(Date.now()).format("DD-MM-YYYY"),
      resumen: {
        com12: null,
        com20: null,
        comSoda: null,
        pago: null,
        fiado: null,
        dev12: null,
        dev20: null,
        devSoda: null,
        nomapeRep: null,
      },
      resumenData:[],
      resumenFields:{
        'Repartidor': 'nomapeRep',
        'Bidones 12L comprados': 'com12',
        'Bidones 20L comprados': 'com20',
        'Sifones Soda comprados': 'comSoda',
        'Pago': 'pago',
        'Fiado': 'fiado',
        'Bidones 12L devueltos': 'dev12',
        'Bidones 20L devueltos': 'dev20',
        'Sifones Soda devueltos': 'devSoda'
      },
      resumenName: 'Resumen de Reparto en curso zona' + this.$route.params.zonaSelected + ' ' + moment(Date.now()).format("DD-MM-YYYY"),
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
        this.clientesenreparto = Object.freeze(response.data)
      });
    },
    getResumen() {
      axios({
          method: 'GET',
          url: Config.API_URL + 'resumen/reparto/' + this.$route.params.idReparto,
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": "true"
          }
      }).then(response => {
        this.resumen.nomapeRep = response.data[0].nomapeRep
        this.resumen.com12 = response.data[0].com12
        this.resumen.com20 = response.data[0].com20
        this.resumen.comSoda = response.data[0].comSoda
        this.resumen.dev12 = response.data[0].dev12
        this.resumen.dev20 = response.data[0].dev20
        this.resumen.devSoda = response.data[0].devSoda
        this.resumen.pago = response.data[0].pago
        this.resumen.fiado = response.data[0].fiado
        this.resumenData = Object.freeze(response.data)
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
    finishReparto(){
      axios({
          method: 'PUT',
          url: Config.API_URL + 'finalizar/reparto/' + this.$route.params.idReparto,
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": "true"
          }
      }).then(response => {
        this.getLineas()
      });
    },
    updateDeuda(){
      var bodyFormData = new FormData();
      bodyFormData.append('idCliente', this.deuda.idCliente);
      bodyFormData.append('pagado', this.deuda.paga);
      bodyFormData.append('comentario', this.deuda.comentario);
      axios({
          method: 'PUT',
          url: Config.API_URL + 'update/deuda',
          data: bodyFormData,
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": "true"
          }
      }).then(response => {
        this.getLineas()
        this.closeDeudaDialog()
      });
    },
    deudaDialog(id,cliente,deuda){
      this.deuda.fiado = deuda
      this.deuda.paga = 0
      this.deuda.cliente = cliente
      this.deuda.idCliente = id
      this.showDeudaDialog = true
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
    resumenReparto(){
      this.getResumen()
      this.showResumenDialog = true
    },
    closeResumenDialog(){
      this.showResumenDialog = false
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
    closeDeudaDialog(){
      this.showDeudaDialog = false
      this.deuda.idCliente = null
      this.deuda.cliente = null
      this.deuda.fiado = null
      this.deuda.paga = null
      this.deuda.comentario = null
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