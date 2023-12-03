const routes = [
  {
    path: "/login",
    component: () => import("layouts/AuthLayout.vue"),
    children: [{ path: "", component: () => import("pages/LoginPage.vue") }],
  },
  {
    path: "/",
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

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
