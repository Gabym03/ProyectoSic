<template>
  <div class="q-pa-md q-mx-auto">
    <h2 class="App">Inventario</h2>

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

const columns = ref([
  {
    name: "codigoArticulo",
    label: "C/Articulo",
    align: "left",
    field: "codigoArticulo",
    sortable: true,
  },
  {
    name: "nombre",
    label: "Nombre",
    align: "left",
    field: "nombre",
    sortable: true,
  },
  {
    name: "existencia",
    label: "Existencia",
    align: "left",
    field: "existencia",
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
    name: "proveedor",
    label: "Proveedor",
    align: "left",
    field: "proveedor",
    sortable: true,
  },
]);
</script>
