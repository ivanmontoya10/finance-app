<script setup>
import { ref, onMounted } from "vue";
import { api } from "../services/api";
import { useRouter } from "vue-router";

const months = ref([]);
const router = useRouter();

onMounted(async () => {
    const { data } = await api.get("/transactions/months");
    months.value = data;
});

const downloadExcel = (month) => {
    window.open(`http://localhost:3000/api/transactions/download?month=${month}`);
};

const goBack = () => {
    router.push("/");
};

const formatMonth = (monthStr) => {
    const [year, month] = monthStr.split("-");
    const date = new Date(year, month - 1);

    return new Intl.DateTimeFormat("es-MX", {
        month: "long",
        year: "numeric",
    }).format(date).replace(/^./, (c) => c.toUpperCase());
};
</script>

<template>
    <v-container>
        <v-btn icon variant="text" @click="goBack">
            <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
        <h1>Meses disponibles</h1>
        <v-row class="mt-14" v-if="months && months.length">
            <v-col v-for="month in months" :key="month" cols="12" md="4">
                <v-card>
                    <v-card-title>
                        {{ formatMonth(month) }}
                    </v-card-title>

                    <v-card-actions class="d-flex justify-center">
                        <v-btn color="success" @click="downloadExcel(month)">
                            Descargar
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>

        <!-- Mensaje cuando no hay registros -->
        <v-row v-else class="mt-14">
            <v-col cols="12">
                <v-card class="pa-6 text-center">
                    <v-card-text>
                        Aún no hay documentos generados para descargar.
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>