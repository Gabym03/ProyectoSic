<template>
  <div class="q-pa-md q-mx-auto">
    <h2 class="App">Inventario</h2>

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
const data = useCollection(collection(db, "Proveedor"));
const columns = ref([
  {
    name: "codigop",
    label: "C/Articulo",
    align: "left",
    field: "codigop",
    sortable: true,
  },
  {
    name: "nombrep",
    label: "Nombre",
    align: "left",
    field: "nombrep",
    sortable: true,
  },
  {
    name: "cantidad",
    label: "Existencia",
    align: "left",
    field: "cantidad",
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
    name: "nombret",
    label: "Proveedor",
    align: "left",
    field: "nombret",
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
