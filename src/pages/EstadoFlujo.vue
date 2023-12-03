<template>
  <div class="q-pa-md q-mx-auto">
    <q-btn @click="regresar" color="primary" icon="arrow_back" />
    <h2 class="App">Estado Flujo de efectivo</h2>

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
const columns = ref([
  {
    name: "factura",
    label: "Factura",
    align: "left",
    field: "factura",
    sortable: true,
  },
  {
    name: "fecha",
    label: "Fecha",
    align: "left",
    field: "fecha",
    sortable: true,
  },
  {
    name: "proveedor",
    label: "Proveedor",
    align: "left",
    field: "proveedor",
    sortable: true,
  },
  {
    name: "concepto",
    label: "Concepto",
    align: "left",
    field: "concepto",
    sortable: true,
  },
  {
    name: "preciou",
    label: "Precio Unitario",
    align: "left",
    field: "preciou",
    sortable: true,
  },
  {
    name: "cantidad",
    label: "Cantidad",
    align: "left",
    field: "cantidad",
    sortable: true,
  },
  {
    name: "total",
    label: "Total",
    align: "left",
    field: "total",
    sortable: true,
  },
]);
function regresar() {
  router.push("/reportes");
}
</script>
