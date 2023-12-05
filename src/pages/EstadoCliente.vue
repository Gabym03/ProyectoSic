<template>
  <div class="q-pa-md q-mx-auto">
    <q-btn @click="regresar" color="primary" icon="arrow_back" />
    <h2 class="App">Clientes</h2>

    <q-table
      class="my-sticky-header-table"
      flat
      bordered
      :rows="data"
      :columns="columns"
      row-key="name"
      style="margin-left: auto; margin-right: auto; width: 80%"
    />

    <!-- Formulario emergente para agregar/editar cuenta -->
  </div>
</template>
<script setup>
import { ref, reactive } from "vue";
import swal from "sweetalert";
//componente derecho
import { useCollection } from "vuefire";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "boot/firebase";
import { useRouter } from "vue-router";
const router = useRouter();
const data = useCollection(collection(db, "Cliente"));
const columns = [
  {
    name: "Cliente",
    align: "left",
    label: "Cliente",
    field: "nombret",
    sortable: true,
  },
  {
    name: "Código del Cliente",
    align: "left",
    label: "Código del Cliente",
    field: "codigot",
    sortable: true,
  },
];
function regresar() {
  router.push("/reportes");
}
</script>
