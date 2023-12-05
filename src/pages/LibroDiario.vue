<template>
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
</template>
<script setup>
import { ref, onMounted } from "vue";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { db } from "boot/firebase";

import { useCollection } from "vuefire";
//componente derecho

let cliente = ref(false);
let proveedor = ref(false);

const toggleTercero = (marca) => {
  cliente.value = marca === "cliente";
  proveedor.value = marca === "proveedor";
};
const customRowClass = (row) => {
  return {
    "custom-row-class": true,
  };
};

const data = useCollection(collection(db, "Libro_Diario"));

const columns = ref([
  {
    name: "codigoc",
    label: "Cod. Cuenta",
    align: "left",
    field: "codigoc",
    sortable: true,
  },
  {
    name: "nombrec",
    label: "Nombre Cuenta",
    align: "left",
    field: "nombrec",
    sortable: true,
  },
  {
    name: "debe",
    label: "Debe",
    align: "left",
    field: "debe",
    sortable: true,
  },
  {
    name: "haber",
    label: "Haber",
    align: "left",
    field: "haber",
    sortable: true,
  },
]);
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
