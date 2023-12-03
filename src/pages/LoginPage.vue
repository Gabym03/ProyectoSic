<template>
  <div class="q-pa-md App">
    <div class="container">
      <!-- Lado Izquierdo -->
      <div class="side left-side">
        <h2 class="title" style="color: white">
          Bienvenido a nuestro sistema contable
        </h2>
        <img
          src="https://i.pinimg.com/474x/fe/42/8e/fe428ecc2da0a0f756282f8108f588f1.jpg"
          class="logo"
        />
      </div>

      <!-- Lado Derecho -->
      <div class="side right-side">
        <div
          style="
            width: 50%;
            background-color: #f5f5f5;
            text-align: center;
            padding: 20px;
            box-sizing: border-box;
            margin-left: 150px;
          "
        >
          <h2 class="login-title" style="margin-bottom: 30px; color: #2196f3">
            Login
          </h2>
          <q-form>
            <q-input
              style="margin-bottom: 30px"
              outlined
              label="Usuario"
              v-model="usuario"
            />
            <q-input
              outlined
              label="Contraseña"
              v-model="contrasenia"
              type="password"
              style="margin-bottom: 30px"
            />
            <q-btn
              @click="iniciarSesion"
              label="Iniciar Sesión"
              class="q-mt-md button"
              style="background-color: #2196f3; color: white"
            />
            <q-btn
              @click="iniciarSesion"
              label="Iniciar Sesión con Google"
              class="q-mt-md button"
            />
          </q-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { auth, provider } from "src/boot/firebase";
import { signInWithRedirect, getRedirectResult } from "firebase/auth";
import { useRouter } from "vue-router";

const router = useRouter();
const usuario = ref("");
const contrasenia = ref("");

const iniciarSesionN = () => {
  // Lógica para iniciar sesión
};

function iniciarSesion() {
  signInWithRedirect(auth, provider);
  router.push("/inicio");
}
</script>
