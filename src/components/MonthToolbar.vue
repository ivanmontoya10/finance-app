<script setup>
import { ref, onMounted } from "vue";
import { api } from "../services/api";

const emit = defineEmits(["monthChanged"]);
const months = ref([]);
const selectedMonth = ref("");

onMounted(async () => {
    const { data } = await api.get("/transactions/months");
    months.value = data;

    if (data.length) {
        selectedMonth.value = data[0];
        emit("monthChanged", data[0]);
    }
});

const changeMonth = () => {
    emit("monthChanged", selectedMonth.value);
};

const downloadExcel = () => {
    window.open(
        `http://localhost:3000/api/transactions/download?month=${selectedMonth.value}`
    );
};
</script>

<template>
    <v-card class="mb-4 pa-4">
        <v-row align="center">

            <v-col cols="8">
                <v-select v-model="selectedMonth" :items="months" label="Mes" @update:modelValue="changeMonth" />
            </v-col>

            <v-col cols="4">
                <v-btn color="success" block @click="downloadExcel">
                    Descargar Excel
                </v-btn>
            </v-col>

        </v-row>
    </v-card>
</template>