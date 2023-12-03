<template>
  <q-layout view="hHh lpR fFf">
    <q-header
      elevated
      class="bg-primary text-white"
      height-hint="98"
      style="display: flex"
    >
      <q-tabs align="left" style="margin-left: 50px">
        <q-route-tab
          to="/"
          icon="home"
          label="Inicio"
          style="margin-left: 30px"
        />
        <q-route-tab
          to="/catalogo"
          icon="list_alt"
          label="Catalogo"
          style="margin-left: 20px"
        />
        <q-route-tab
          to="/page2"
          icon="shopping_bag"
          label="Compras"
          style="margin-left: 20px"
        />
        <q-route-tab
          to="/page3"
          icon="paid"
          label="Ventas"
          style="margin-left: 20px"
        />
        <q-route-tab
          to="/page3"
          icon="inventory"
          label="Inventario"
          style="margin-left: 20px"
        />
        <q-route-tab
          to="/page3"
          icon="auto_stories"
          label="Libro Diario"
          style="margin-left: 20px"
        />
        <q-route-tab
          to="/page3"
          icon="feed"
          label="Reportes"
          style="margin-left: 20px"
        />
      </q-tabs>
      <q-tabs style="margin-left: auto; margin-right: 150px">
        <q-btn-dropdown class="glossy" color="black" icon="account_circle">
          <div class="row no-wrap q-pa-md">
            <div class="column items-center">
              <q-avatar size="72px">
                <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
              </q-avatar>

              <div class="text-subtitle1 q-mt-md q-mb-xs">{{ user }}</div>

              <q-btn
                color="primary"
                label="Logout"
                push
                size="sm"
                v-close-popup
              />
            </div>
          </div>
        </q-btn-dropdown>
      </q-tabs>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer elevated class="bg-grey-8 text-white">
      <q-toolbar>
        <q-toolbar-title>
          <div>Title</div>
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>
<script setup>
import { ref } from "vue";

const user = ref("Gaby");
</script>
