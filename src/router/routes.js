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

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
