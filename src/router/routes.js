const routes = [
  {
    path: "/",
    component: () => import("layouts/AuthLayout.vue"),
    children: [{ path: "", component: () => import("pages/LoginPage.vue") }],
  },
  {
    path: "/inicio",
    component: () => import("layouts/PrincipalLayout.vue"),
    children: [{ path: "", component: () => import("pages/InicioPage.vue") }],
  },
  {
    path: "/catalogo",
    component: () => import("layouts/PrincipalLayout.vue"),
    children: [{ path: "", component: () => import("pages/CatalogoPage.vue") }],
  },
  {
    path: "/compras",
    component: () => import("layouts/PrincipalLayout.vue"),
    children: [{ path: "", component: () => import("pages/ComprasPages.vue") }],
  },
  {
    path: "/ventas",
    component: () => import("layouts/PrincipalLayout.vue"),
    children: [{ path: "", component: () => import("pages/VentasPage.vue") }],
  },
  {
    path: "/inventario",
    component: () => import("layouts/PrincipalLayout.vue"),
    children: [
      { path: "", component: () => import("pages/InventarioPage.vue") },
    ],
  },
  {
    path: "/librodiario",
    component: () => import("layouts/PrincipalLayout.vue"),
    children: [{ path: "", component: () => import("pages/LibroDiario.vue") }],
  },
  {
    path: "/reportes",
    component: () => import("layouts/PrincipalLayout.vue"),
    children: [{ path: "", component: () => import("pages/ReportesPage.vue") }],
  },
  {
    path: "/estRes",
    component: () => import("layouts/PrincipalLayout.vue"),
    children: [
      { path: "", component: () => import("pages/EstadoResultado.vue") },
    ],
  },
  {
    path: "/estCapital",
    component: () => import("layouts/PrincipalLayout.vue"),
    children: [
      { path: "", component: () => import("pages/CapitalContable.vue") },
    ],
  },
  {
    path: "/balance",
    component: () => import("layouts/PrincipalLayout.vue"),
    children: [
      { path: "", component: () => import("pages/BalanceGeneral.vue") },
    ],
  },
  {
    path: "/estFlujo",
    component: () => import("layouts/PrincipalLayout.vue"),
    children: [{ path: "", component: () => import("pages/EstadoFlujo.vue") }],
  },
  {
    path: "/estClientes",
    component: () => import("layouts/PrincipalLayout.vue"),
    children: [
      { path: "", component: () => import("pages/EstadoCliente.vue") },
    ],
  },
  {
    path: "/estProv",
    component: () => import("layouts/PrincipalLayout.vue"),
    children: [
      { path: "", component: () => import("pages/EstadoProveedores.vue") },
    ],
  },
  {
    path: "/transaciones",
    component: () => import("layouts/PrincipalLayout.vue"),
    children: [
      { path: "", component: () => import("pages/TransaccionesPage.vue") },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
