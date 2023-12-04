<template>
  <div class="q-pa-md q-mx-auto">
    <h2 class="App">Ventas</h2>

    <div class="tabla">
      <q-table
        :rows="data"
        :columns="columns"
        row-key="codigo"
        :row-class="customRowClass"
        style="
          width: 80%;
          margin-left: auto;
          margin-right: auto;
          margin-top: 30px;
        "
      >
        <template v-slot:header="props">
          <q-tr :props="props">
            <q-th
              v-for="col in props.cols"
              :key="col.name"
              :props="props"
              class="custom-header-class"
            >
              {{ col.label }}
            </q-th>
          </q-tr>
        </template>
        <template v-slot:body="props">
          <q-tr :props="props" :class="customRowClass(props.row)">
            <q-td v-for="col in props.cols" :key="col.name" :props="props">
              {{ col.value }}
            </q-td>
          </q-tr>
        </template>
      </q-table>
    </div>

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
    name: "cliente",
    label: "Cliente",
    align: "left",
    field: "cliente",
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
    name: "iva",
    label: "Iva",
    align: "left",
    field: "iva",
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
const customRowClass = (row) => {
  return {
    "custom-row-class": true,
  };
};
</script>
<style scoped>
.custom-header-class {
  background-color: #1976d2; /* Cambia el color de fondo según tus necesidades */
  color: #ffffff !important; /* Cambia el color del texto según tus necesidades */
}

.custom-row-class {
  background-color: white; /* Cambia el color de fondo según tus necesidades */
  color: black; /* Cambia el color del texto según tus necesidades */
}
</style>
