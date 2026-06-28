<script setup>
import { ref } from "vue";
import TransactionForm from "../components/TransactionForm.vue";
import TransactionTable from "../components/TransactionTable.vue";
import MonthToolbar from "../components/MonthToolbar.vue";

const reloadKey = ref(0);
const reload = () => { reloadKey.value++; };
</script>

<template>
    <v-container class="pa-5">
        <v-card class="pa-4 mb-5 justify-center">
            <h2>💰 Control Financiero Personal</h2>
            <v-btn color="success" to="/meses" variant="text" size="large">
                Ver Historial de Meses
            </v-btn>
        </v-card>
        <TransactionForm @saved="reload" />
        <v-divider class="my-5" />
        <TransactionTable :key="reloadKey" />
    </v-container>
</template>