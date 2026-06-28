<script setup>
import { reactive, ref, onMounted } from "vue";
import { api } from "../services/api";

const emit = defineEmits(["saved"]);
const valid = ref(false);
const formRef = ref(null);
const form = reactive({
    tipo: "Salida",
    motivo: "",
    categoria: "Gastos fijos",
    fecha: "",
    monto: ""
});

onMounted(() => {
    form.fecha = new Date().toISOString().slice(0, 10);
});

const save = async () => {
    const isValid = await formRef.value.validate();
    if (!isValid.valid) return;
    await api.post("/transactions", form);
    form.tipo = "Salida";
    form.motivo = "";
    form.categoria = "Gastos fijos";
    form.monto = "";
    form.fecha = new Date().toISOString().slice(0, 10);
    emit("saved");
};
</script>

<template>
    <v-card class="pa-4">
        <v-form ref="formRef" v-model="valid">
            <v-select v-model="form.tipo" :items="['Entrada', 'Salida']" label="Tipo"
                :rules="[v => !!v || 'Requerido']" />
            <v-text-field v-model="form.motivo" label="Motivo" :rules="[v => !!v || 'Requerido']" />
            <v-select v-model="form.categoria" :items="['Gastos fijos', 'Libre', 'Despensa', 'Mensualidades']" label="Categoría"
                :rules="[v => !!v || 'Requerido']" />
            <v-text-field v-model="form.fecha" label="Fecha" type="date" readonly />
            <v-text-field v-model="form.monto" label="Monto" type="number" :rules="[
                v => !!v || 'Requerido',
                v => v > 0 || 'Debe ser mayor a 0'
            ]" />
            <v-btn color="primary" class="mt-3" @click="save">
                Guardar
            </v-btn>
        </v-form>
    </v-card>
</template>