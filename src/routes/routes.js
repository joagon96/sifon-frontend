import DashboardLayout from "@/pages/Layout/DashboardLayout.vue";

import Resumen from "@/pages/Resumen.vue";
import PlanillaReparto from "@/pages/PlanillaReparto.vue";
import ClientesEnReparto from "@/pages/ClientesEnReparto.vue";
import Zonas from "@/pages/Zonas.vue";
import Repartidores from "@/pages/Repartidores.vue";
import Clientes from "@/pages/Clientes.vue";
import Repartos from "@/pages/Repartos.vue";
import Historico from "@/pages/Historico.vue";
import Login from "@/pages/Login.vue";
import { isValidJwt, isAdmin } from "../pages";


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
        component: Resumen,
        beforeEnter (to, from, next) {
          if (!isValidJwt(localStorage.token) || !isAdmin(localStorage.role)) {
            next('/login')
          } else {
            next()
          }
        }
      },
      {
        path: "planillaReparto",
        name: "Planilla Reparto",
        component: PlanillaReparto,
        beforeEnter (to, from, next) {
          if (!isValidJwt(localStorage.token) || !isAdmin(localStorage.role)) {
            next('/login')
          } else {
            next()
          }
        }
      },
      {
        path: "clientesEnReparto",
        name: "Clientes en Reparto",
        props: true,
        component: ClientesEnReparto,
        beforeEnter (to, from, next) {
          if (!isValidJwt(localStorage.token) || !isAdmin(localStorage.role)) {
            next('/login')
          } else {
            next()
          }
        }
      },
      {
        path: "repartidores",
        name: "Repartidores",
        component: Repartidores,
        beforeEnter (to, from, next) {
          if (!isValidJwt(localStorage.token) || !isAdmin(localStorage.role)) {
            next('/login')
          } else {
            next()
          }
        }
      },
      {
        path: "zonas",
        name: "Zonas",
        component: Zonas,
        beforeEnter (to, from, next) {
          if (!isValidJwt(localStorage.token) || !isAdmin(localStorage.role)) {
            next('/login')
          } else {
            next()
          }
        }
      },
      {
        path: "clientes",
        name: "Clientes",
        component: Clientes,
        beforeEnter (to, from, next) {
          if (!isValidJwt(localStorage.token) || !isAdmin(localStorage.role)) {
            next('/login')
          } else {
            next()
          }
        }
      },
      {
        path: "repartos",
        name: "Repartos",
        component: Repartos,
        beforeEnter (to, from, next) {
          if (!isValidJwt(localStorage.token)) {
            next('/login')
          } else {
            next()
          }
        }
      },
      {
        path: "historico",
        name: "Historico",
        component: Historico,
        beforeEnter (to, from, next) {
          if (!isValidJwt(localStorage.token)) {
            next('/login')
          } else {
            next()
          }
        }
      }
    ]
  },
  loginPage
];

export default routes;
