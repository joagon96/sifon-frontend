import DashboardLayout from "@/pages/Layout/DashboardLayout.vue";

import Resumen from "@/pages/Resumen.vue";
import AltaCliente from "@/pages/AltaCliente.vue";
import AltaRepartidor from "@/pages/AltaRepartidor.vue";
import AltaZonas from "@/pages/AltaZonas.vue";
import AltaReparto from "@/pages/AltaReparto.vue";
import PlanillaReparto from "@/pages/PlanillaReparto.vue";
import ClientesEnReparto from "@/pages/ClientesEnReparto.vue";
import Zonas from "@/pages/Zonas.vue";
import Repartidores from "@/pages/Repartidores.vue";
import Clientes from "@/pages/Clientes.vue";
import Repartos from "@/pages/Repartos.vue";
import Login from "@/pages/Login.vue";


let loginPage = {
  path: '/login',
  name: 'Login',
  component: Login
}

const routes = [
  {
    path: "/",
    component: DashboardLayout,
    redirect: "/login",
    children: [
      {
        path: "resumen",
        name: "Resumen",
        component: Resumen
      },
      {
        path: "altaCliente",
        name: "Alta Cliente",
        props: true,
        component: AltaCliente
      },
      {
        path: "altaRepartidor",
        name: "Alta Repartidor",
        props: true,
        component: AltaRepartidor
      },
      {
        path: "altaZona",
        name: "Alta Zona",
        props: true,
        component: AltaZonas
      },
      {
        path: "altaReparto",
        name: "Alta Reparto",
        component: AltaReparto
      },
      {
        path: "planillaReparto",
        name: "Planilla Reparto",
        component: PlanillaReparto
      },
      {
        path: "clientesEnReparto",
        name: "Clientes en Reparto",
        props: true,
        component: ClientesEnReparto
      },
      {
        path: "repartidores",
        name: "Repartidores",
        component: Repartidores
      },
      {
        path: "zonas",
        name: "Zonas",
        component: Zonas
      },
      {
        path: "clientes",
        name: "Clientes",
        component: Clientes
      },
      {
        path: "repartos",
        name: "Repartos",
        component: Repartos
      }
    ]
  },
  loginPage
];

export default routes;
