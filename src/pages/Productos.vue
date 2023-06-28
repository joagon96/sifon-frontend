<template>
    <div class="content">
      <div class="md-layout">
        <div
          class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100"
        >
          <md-card>
            <md-card-header data-background-color="green">
            <div class="md-size-100">  
              <h4 class="title md-size-80">Productos</h4>
            </div>
            </md-card-header>
            <md-card-content>
              <div>
                <md-table v-model="this.productos" table-header-color="green">
                  <md-table-row slot="md-table-row" slot-scope="{ item }">
                    <md-table-cell md-label="Producto">{{ item.descripcionProducto }}</md-table-cell>
                    <md-table-cell md-label="Valor">{{ item.valor }}</md-table-cell>
                    <md-table-cell md-label="Acciones">
                      <div>
                        <md-button class="md-icon-button md-fab md-warning md-raised" @click="editProducto(item.idProducto)">
                          <md-icon>edit</md-icon>
                        </md-button>
                      </div>
                    </md-table-cell>
                  </md-table-row>
                </md-table>
              </div>
            </md-card-content>
            <div>
            <md-dialog :md-active.sync="showDialog" style="z-index: 5;">
              <md-dialog-title>Editar producto</md-dialog-title>
              <div class="md-layout-item md-small-size-100 md-size-100">
                <div class="md-layout md-gutter">
                  <div class="md-layout-item md-size-100">
                    <md-field>
                      <label>Producto</label>
                      <md-input v-model="producto.descripcionProducto" type="text" disabled></md-input>
                    </md-field>
                  </div>
                  <div class="md-layout-item md-size-100">
                    <md-field>
                      <label>valor</label>
                      <md-input v-model="producto.valor" type="text"></md-input>
                    </md-field>
                  </div>
                </div>
              </div>
              <md-dialog-actions>
                <md-button class="md-danger" @click="closeDialog()">Cancelar</md-button>
                <md-button class="md-primary" @click="updateProducto()">Guardar</md-button>
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
  import {Config} from '../config.js';
  
  export default {
    name: 'DialogConfirm',
    
    mounted() {
      this.getProductos()
    },
    data() {
      return  {
        productos: [],
        producto: {
            idProducto: null,
            descripcionProducto: null,
            valor: null
        },
        showDialog: false,
      };
    },
    methods: {
      editProducto(idProducto) {
        axios.get(Config.API_URL + 'get/Producto/'+idProducto,{headers: {"Authorization": localStorage.token}}).then(response => {
          this.producto.idProducto = response.data[0].idProducto;
          this.producto.descripcionProducto = response.data[0].descripcionProducto;
          this.producto.valor = response.data[0].valor;
        });
        this.showDialog = true
      },
      getProductos () {
        axios.get(Config.API_URL + 'get/Producto',{headers: {"Authorization": localStorage.token}}).then(response => {
        this.productos = Object.freeze(response.data);
      });
      },
      updateProducto() {
        var bodyFormData = new FormData();
        bodyFormData.append('idProducto', this.producto.idProducto) ;
        bodyFormData.append('valor', this.producto.valor) ;
        axios({
          method: 'PUT',
          url: Config.API_URL + 'update/producto',
          data: bodyFormData,
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": "true"
          }
        }).then(response => {
          this.closeDialog()
          this.getProductos()
        });
      },
      closeDialog(){
        this.showDialog = false
      },
      openDialog(){
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
  