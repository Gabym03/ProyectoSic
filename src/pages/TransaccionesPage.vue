<template>
  <div class="librod">
    <div
      class="side left-side"
      style="margin-top: 30px; margin-left: 110px; margin-bottom: 30px"
    >
      <p
        style="
          margin-left: 250px;
          color: white;
          font-size: 18px;
          text-align: left;
        "
      >
        Fecha
      </p>
      <div style="display: flex">
        <div style="display: flex">
          <q-input
            style="margin-left: 0px"
            v-model="datos.factura"
            label="Factura"
            dark
          />
        </div>

        <q-input
          style="margin-left: 70px; max-width: 300px; background-color: white"
          filled
          dense
          v-model="datos.fecha"
          mask="date"
        >
          <template v-slot:append>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy
                cover
                transition-show="scale"
                transition-hide="scale"
              >
                <q-date v-model="datos.fecha">
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="Close" color="primary" flat />
                  </div>
                </q-date>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
      </div>
      <div style="display: flex; margin-top: 30px">
        <q-input dark v-model="datos.nombret" label="Cliente/Proveedor" />
        <q-input
          dark
          style="margin-left: 20px"
          v-model="datos.codigot"
          label="Codigo C/P"
        />

        <q-checkbox
          v-model="cliente"
          label="Venta"
          @click="toggleTercero('cliente')"
          style="margin-left: 20px; color: white"
        />

        <q-checkbox
          v-model="proveedor"
          label="Compra"
          @click="toggleTercero('proveedor')"
          style="color: white"
        />
      </div>
      <div style="display: flex; margin-top: 30px">
        <q-select
          style="width: 200px"
          v-model="datos.tipod"
          :options="mostrarSelectTipo"
          label="Tipo de Documento"
          dark
        />
        <q-input
          style="margin-left: 20px"
          v-model="datos.codigos"
          label="Codigo soporte"
          dark
        />
      </div>
      <div style="display: flex; margin-top: 30px">
        <q-input v-model="datos.cantidad" label="Cantidad" dark />
        <q-input
          dark
          style="margin-left: 20px"
          v-model="datos.preciou"
          label="Precio Unitario"
        />
        <q-select
          style="width: 200px; margin-left: 20px"
          v-model="datos.iva"
          :options="mostrarIva"
          label="Iva"
          dark
        />
      </div>
      <div style="display: flex; margin-top: 30px">
        <q-input v-model="datos.codigop" label="Codigo del producto" dark />
        <q-input
          dark
          style="margin-left: 20px"
          v-model="datos.nombrep"
          label="Nombre del producto"
        />
        <q-input
          dark
          style="margin-left: 20px"
          v-model="datos.preciov"
          label="Precio venta"
        />
      </div>
      <div style="margin-top: 30px">
        <p style="color: white; font-size: 18px; text-align: left">Concepto</p>
        <q-input
          v-model="datos.concepto"
          filled
          autogrow
          dark
          style="max-width: 700px"
        />
      </div>
    </div>
    <div class="side right-side" style="margin-top: auto; margin-bottom: auto">
      <q-card
        flat
        bordered
        class="my-card"
        style="max-width: 60%; margin-left: auto; margin-right: auto"
      >
        <q-card-section>
          <q-select
            v-model="datos.codigoc"
            :options="mostrarSelectCodigo"
            label="Codigo Cuenta"
          />
        </q-card-section>
        <q-card-section>
          <q-select
            v-model="datos.nombrec"
            :options="mostrarSelectNombre"
            label="Nombre de la cuenta"
          />
        </q-card-section>
        <q-card-section style="display: flex">
          <q-input v-model="datos.debe" label="Debe" />
          <q-input
            style="margin-left: 20px"
            v-model="datos.haber"
            label="Haber"
          />
        </q-card-section>
        <q-card-section>
          <q-btn
            label="Agregar"
            stack
            glossy
            color="primary"
            @click="agregar"
          />
        </q-card-section>
      </q-card>
      <div>
        <q-input
          dark
          style="
            width: 250px;
            margin-left: 200px;
            margin-top: 40px;
            margin-bottom: 80px;
          "
          v-model="datos.total"
          label="Total"
        />
      </div>
      <div style="margin-top: 10px">
        <q-btn
          class="botoncalcular efect"
          label="Calcular"
          glossy
          color="primary"
          style="margin-left: 10px"
          @click="calcular"
        />
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted } from "vue";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { db } from "boot/firebase";
import swal from "sweetalert";

let cliente = ref(false);
let proveedor = ref(false);

const toggleTercero = (marca) => {
  cliente.value = marca === "cliente";
  proveedor.value = marca === "proveedor";
};

const datos = ref({
  fecha: "",
  nombret: "",
  codigot: null,
  tipod: "",
  codigos: null,
  codigoc: "",
  nombrec: "",
  concepto: "",
  debe: null,
  haber: null,
  cantidad: null,
  preciou: null,
  total: null,
  codigop: null,
  nombrep: null,
  totalv: null,
  preciov: null,
  iva: null,
  factura: "00011",
});
// Función para obtener la última factura desde el almacenamiento local
function obtenerUltimaFactura() {
  return localStorage.getItem("ultimaFactura");
}
function restablecerFacturaOriginal() {
  datos.value.factura = "00001";
  guardarUltimaFactura(datos.value.factura);
}

// Función para guardar la última factura en el almacenamiento local
function guardarUltimaFactura(numeroFactura) {
  localStorage.setItem("ultimaFactura", numeroFactura);
}
async function agregar() {
  try {
    const valordatos = Object.values(datos.value);
    if (valordatos.some((valor) => !valor)) {
      swal({
        title: "Esperaa!",
        text: "Debes llenar todos los campos",
        icon: "warning",
        buttons: false,
        timer: 3500,
      });
      return; // Detener la ejecución si al menos un campo está vacío
    }
    if (cliente.value) {
      const docRef = await addDoc(collection(db, "Cliente"), datos.value);
      const docRefL = await addDoc(collection(db, "Libro_Diario"), datos.value);
      console.log("Document written with ID: ", docRef.id);
      console.log("Document written with ID: ", docRefL.id);
      swal({
        title: "Excelente",
        text: "Se agrego correctamente",
        icon: "success",
        buttons: false,
        timer: 3000,
      });
      datos.value.tipod = "";
      datos.value.codigoc = "";
      datos.value.nombrec = "";
      datos.value.debe = "";
      datos.value.haber = "";
      datos.value.fecha = "";
      datos.value.nombret = "";
      datos.value.codigot = "";
      datos.value.codigos = "";
      datos.value.documento = "";
      datos.value.concepto = "";
      datos.value.cantidad = null;
      datos.value.preciou = null;
      datos.value.total = null;
      cliente.value = false;
      datos.value.codigop = null;
      datos.value.nombrep = null;
      datos.value.totalv = null;
      datos.value.preciov = null;
      datos.value.iva = null;
    } else {
      if (proveedor.value) {
        const docRef = await addDoc(collection(db, "Proveedor"), datos.value);
        const docRefL = await addDoc(
          collection(db, "Libro_Diario"),
          datos.value
        );
        console.log("Document written with ID: ", docRef.id);
        console.log("Document written with ID: ", docRefL.id);
        swal({
          title: "Excelente",
          text: "Se agrego correctamente",
          icon: "success",
          buttons: false,
          timer: 3000,
        });
        datos.value.tipod = "";
        datos.value.codigoc = "";
        datos.value.nombrec = "";
        datos.value.debe = "";
        datos.value.haber = "";
        datos.value.fecha = "";
        datos.value.nombret = "";
        datos.value.codigot = "";
        datos.value.codigos = "";
        datos.value.documento = "";
        datos.value.concepto = "";
        datos.value.cantidad = null;
        datos.value.preciou = null;
        datos.value.total = null;
        proveedor.value = false;
        datos.value.codigop = null;
        datos.value.nombrep = null;
        datos.value.totalv = null;
        datos.value.preciov = null;
        datos.value.iva = null;
      }
    }
    const numeroFactura = parseInt(datos.value.factura, 10) + 1;
    datos.value.factura = numeroFactura.toString().padStart(5, "0");
    guardarUltimaFactura(datos.value.factura);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}
function calcular() {
  let cantidad = parseFloat(datos.value.cantidad);
  let cu = parseFloat(datos.value.preciou);
  let pv = parseFloat(datos.value.preciov);
  let totales = 0;
  let totalesv = 0;
  if (Number.isFinite(cantidad) && Number.isFinite(cu) && Number.isFinite(pv)) {
    totales = cantidad * cu;
    totalesv = cantidad * pv;
    datos.value.total = totales;
    datos.value.totalv = totalesv;
  } else {
    console.log("No son números");
    console.error("Error en los datos:");
    console.error("cantidad:", cantidad);
    console.error("cu:", cu);
    console.error("pv:", pv);
  }
}

const mostrarCodigo = [];
const mostrarSelectCodigo = ref();
const mostrarNombre = [];
const mostrarSelectNombre = ref();
const mostrarSelectTipo = [
  "Factura de Venta",
  "Comprobante de Egreso",
  "Recibo de Caja",
  "Factura de Compra",
  "Comprobante de Contabilidad",
  "Nota de Credito",
];
const mostrarIva = ["ninguno", "13%"];

const cargarDatos = async function () {
  const querySnapshot1 = await getDocs(collection(db, "catalogo"));
  querySnapshot1.forEach((doc) => {
    mostrarCodigo.push(doc.data().codigo);
    mostrarNombre.push(doc.data().nombre);
  });
  mostrarSelectCodigo.value = mostrarCodigo;
  mostrarSelectNombre.value = mostrarNombre;
};
onMounted(() => {
  cargarDatos();
});
</script>
