<template>
  <div class="q-pa-md q-mx-auto">
    <h2 class="App">Catálogo de Cuentas</h2>

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

    <q-btn
      style="margin-top: 100px; margin-left: 190px"
      @click="agregarCuenta"
      label="Agregar Cuenta"
      color="primary"
    />

    <!-- Formulario emergente para agregar/editar cuenta -->
    <q-dialog v-model="mostrarFormulario">
      <q-card>
        <q-card-section>
          <q-form @submit.prevent="guardarCuenta">
            <q-input v-model="cuentaActual.codigo" label="Código de Cuenta" />
            <q-input v-model="cuentaActual.nombre" label="Nombre de Cuenta" />
            <q-select
              v-model="cuentaActual.tipo"
              :options="tiposDeCuenta"
              label="Tipo de Cuenta"
            />

            <q-card-actions align="right">
              <q-btn @click="cancelarCuenta" label="Cancelar" />
              <q-btn type="submit" label="Guardar" color="primary" />
            </q-card-actions>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>
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
    name: "codigo",
    label: "Código",
    align: "left",
    field: "codigo",
    sortable: true,
  },
  {
    name: "nombre",
    label: "Nombre",
    align: "left",
    field: "nombre",
    sortable: true,
  },
]);
const customRowClass = (row) => {
  return {
    "custom-row-class": true,
  };
};
const cuentas = ref([
  // ... otras cuentas
]);
const tiposDeCuenta = ref(["Ingreso", "Gasto", "Activo", "Pasivo"]);

const cuentaActual = reactive({ codigo: "", nombre: "", tipo: "" });
const mostrarFormulario = ref(false);

const agregarCuenta = () => {
  mostrarFormulario.value = true;
  // Inicializar la cuenta actual para agregar una nueva cuenta
  cuentaActual.codigo = "";
  cuentaActual.nombre = "";
  cuentaActual.tipo = "";
};

async function guardarCuenta() {
  try {
    // Verificar campos vacíos
    if (!cuentaActual.codigo || !cuentaActual.nombre || !cuentaActual.tipo) {
      swal({
        title: "Espera",
        text: "Debes llenar todos los campos",
        icon: "warning",
        button: "Aceptar",
      });
      return; // Detener la ejecución si al menos un campo está vacío
    }

    // Agregar la cuenta a la base de datos
    const docRef = await addDoc(collection(db, "catalogo"), cuentaActual);
    console.log("Document written with ID: ", docRef.id);

    // Limpiar los campos después de agregar la cuenta
    cuentaActual.codigo = "";
    cuentaActual.nombre = "";
    cuentaActual.tipo = "";

    // Mostrar mensaje de éxito
    swal({
      title: "Excelente",
      text: "La cuenta se ha agregado correctamente",
      icon: "success",
      buttons: false,
      timer: 3000,
    });
    mostrarFormulario.value = false;

    // Redirigir o realizar cualquier otra acción necesaria después de agregar la cuenta
    // router.push("/");
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}
const data = useCollection(collection(db, "catalogo"));

const cancelarCuenta = () => {
  // Cancelar y cerrar el formulario
  mostrarFormulario.value = false;
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
