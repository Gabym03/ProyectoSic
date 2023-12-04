<template>
  <div class="librod">
    <div
      class="side left-side"
      style="margin-top: 30px; margin-left: 110px; margin-bottom: 30px"
    >
      <q-input
        style="max-width: 300px; background-color: rgb(216, 242, 242)"
        filled
        dense
        v-model="date"
        mask="date"
        :rules="['date']"
      >
        <template v-slot:append>
          <q-icon name="event" class="cursor-pointer">
            <q-popup-proxy
              cover
              transition-show="scale"
              transition-hide="scale"
            >
              <q-date v-model="date">
                <div class="row items-center justify-end">
                  <q-btn v-close-popup label="Close" color="primary" flat />
                </div>
              </q-date>
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>
      <div style="display: flex; margin-top: 30px">
        <q-input dark v-model="text" label="Cliente/Proveedor" />
        <q-input
          dark
          style="margin-left: 20px"
          v-model="text"
          label="Codigo C/P"
        />
      </div>
      <div style="display: flex; margin-top: 30px">
        <q-select
          style="width: 200px"
          v-model="model"
          :options="options"
          label="Tipo de Documento"
          dark
        />
        <q-input
          style="margin-left: 20px"
          v-model="text"
          label="Codigo soporte"
          dark
        />
        <q-input
          dark
          style="margin-left: 20px"
          v-model="text"
          label="Documento"
        />
      </div>
      <div style="margin-top: 30px">
        <p style="color: white; font-size: 18px; text-align: left">Concepto</p>
        <q-input v-model="text" filled autogrow dark style="max-width: 700px" />
      </div>
    </div>
    <div class="side right-side" style="margin-top: 30px">
      <q-card
        flat
        bordered
        class="my-card"
        style="max-width: 60%; margin-left: auto; margin-right: auto"
      >
        <q-card-section>
          <q-select
            v-model="datos.codigo"
            :options="mostrarSelectCodigo"
            label="Codigo Cuenta"
            @change="cargarNombreCuenta"
          />
        </q-card-section>
        <q-card-section>
          <q-input v-model="datos.nombre" label="Nombre cuenta" />
        </q-card-section>
        <q-card-section style="display: flex">
          <q-input v-model="text" label="Debe" />
          <q-input style="margin-left: 20px" v-model="text" label="Haber" />
        </q-card-section>
        <q-card-section>
          <q-btn label="Agregar" stack glossy color="primary" />
        </q-card-section>
      </q-card>
    </div>
  </div>
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

import { collection, getDocs } from "firebase/firestore";

import { db } from "boot/firebase";

const customRowClass = (row) => {
  return {
    "custom-row-class": true,
  };
};
const date = ref("2019/02/01");
const datos = ref({
  tipo: "",
  codigo: "",
  nombre: "",
});
const mostrarCodigo = [];
const mostrarSelectCodigo = ref();
const cargarDatos = async function () {
  // cargar los sistemas
  const querySnapshot1 = await getDocs(collection(db, "catalogo"));
  querySnapshot1.forEach((doc) => {
    // console.log(doc.data().nombre)

    mostrarCodigo.push(doc.data().codigo);
    // console.log(mostrarSistemas)
  });
  mostrarSelectCodigo.value = mostrarCodigo;
};
const cargarNombreCuenta = async function () {
  if (datos.value.codigo) {
    const codigoSeleccionado = datos.value.codigo;
    const docRef = await getDoc(
      query(
        collection(db, "catalogo"),
        where("codigo", "==", codigoSeleccionado)
      )
    );
    if (docRef.exists()) {
      datos.value.nombre = docRef.data().nombre;
    } else {
      // Manejar el caso en que no se encuentre el código
      datos.value.nombre = "";
    }
  } else {
    // Manejar el caso en que no se haya seleccionado ningún código
    datos.value.nombre = "";
  }
};

onMounted(() => {
  cargarDatos();
});
const columns = ref([
  {
    name: "codigo",
    label: "Cod. Cuenta",
    align: "left",
    field: "codigo",
    sortable: true,
  },
  {
    name: "nombre",
    label: "Nombre Cuenta",
    align: "left",
    field: "nombre",
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
