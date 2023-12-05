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
          to="/inicio"
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
          to="/transaciones"
          icon="currency_exchange"
          label="Transaciones"
          style="margin-left: 20px"
        />
        <q-route-tab
          to="/compras"
          icon="shopping_bag"
          label="Compras"
          style="margin-left: 20px"
        />
        <q-route-tab
          to="/ventas"
          icon="paid"
          label="Ventas"
          style="margin-left: 20px"
        />
        <q-route-tab
          to="/inventario"
          icon="inventory"
          label="Inventario"
          style="margin-left: 20px"
        />
        <q-route-tab
          to="/librodiario"
          icon="auto_stories"
          label="Libro Diario"
          style="margin-left: 20px"
        />

        <q-route-tab
          to="/reportes"
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
                <img src="/src/images/user.jpg" />
              </q-avatar>

              <div class="text-subtitle1 q-mt-md q-mb-xs">{{ user }}</div>

              <q-btn
                color="primary"
                label="Logout"
                push
                size="sm"
                v-close-popup
                @click="cerrarSesion"
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
          <div>Gabriela Michelle Martiez Gomez - MG21054</div>
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>
<script setup>
import { ref, onMounted } from "vue";
import { auth, provider } from "src/boot/firebase";
import { signInWithRedirect, getRedirectResult, signOut } from "firebase/auth";
import { useRoute, useRouter } from "vue-router";
const router = useRouter();
const usuario = ref("");
const cerrarSesion = () => {
  signOut(auth)
    .then(() => {
      // Sign-out successful.
      //auth.currentUser = null;
      router.push("/");
    })
    .catch((error) => {
      // An error happened.
      console.log(error);
    });
};
onMounted(() => {
  if (auth.currentUser) {
    usuario.value = auth.currentUser;
  }
  getRedirectResult(auth)
    .then((result) => {
      const user = result.user;
      console.log(user);
      usuario.value = user;
    })
    .catch((error) => {
      console.log(error);
    });
});
</script>
