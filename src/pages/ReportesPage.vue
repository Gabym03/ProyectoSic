<template>
  <div>
    <div class="row" style="margin-top: 100px">
      <div
        class="col-6 col-sm-3"
        v-for="(datos, index) in opciones"
        :key="index"
      >
        <div
          class="q-gutter-md q-mb-md text-center"
          style="width: 100%; padding: 1vh"
        >
          <q-card
            class="q-mb-md efect restarjeta change-color"
            style="
              background-color: #124a8ad0;
              cursor: pointer;
              border: 4px solid #1976d2;
            "
            @click="funcionParaRedirigir(datos.link)"
          >
            <q-icon
              :name="datos.url"
              class="q-pa-md imgres"
              style="
                height: 30vh;
                object-fit: cover;
                font-size: 200px;
                color: white;
              "
            />
            <div class="absolute-bottom text-h6" style="color: white">
              {{ datos.titulo }}
            </div>
          </q-card>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { useRouter } from "vue-router";
import { ref, defineComponent } from "vue";
const router = useRouter();

const opciones = ref([
  {
    id: 1,
    url: "fact_check",
    titulo: "Estado de resultados",
    link: "estRes",
  },
  {
    id: 2,
    url: "text_snippet",
    titulo: "Estado de capital contable del propietario",
    link: "estCapital",
  },
  {
    id: 3,
    url: "balance",
    titulo: "Balance General",
    link: "balance",
  },
  {
    id: 4,
    url: "query_stats",
    titulo: "Estado de flujo de efectivo",
    link: "estFlujo",
  },
  {
    id: 5,
    url: "account_circle",
    titulo: "Clientes",
    link: "estClientes",
  },
  {
    id: 6,
    url: "account_circle",
    titulo: "Proveedores",
    link: "estProv",
  },
]);

defineComponent({
  name: "Reportes-pdf",
});
const funcionParaRedirigir = (link) => {
  router.push("/" + link);
};
</script>
