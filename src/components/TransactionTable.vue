<script setup>
import { ref, onMounted, watch, computed } from "vue";
import { api } from "../services/api";

const props = defineProps({ key: Number });
const data = ref([]);
const page = ref(1);
const itemsPerPage = 10;

const load = async () => {
    const month = new Date().toISOString().slice(0, 7);
    const res = await api.get(`/transactions?month=${month}`);
    data.value = res.data;
};

const paginatedItems = computed(() => {
    const start = (page.value - 1) * itemsPerPage;
    return data.value.slice(start, start + itemsPerPage);
});

const totalPages = computed(() =>
    Math.ceil(data.value.length / itemsPerPage)
);

onMounted(load);
watch(() => props.key, load);
</script>

<template>
    <v-card class="pa-4">
        <div v-if="paginatedItems.length > 0">
            <v-table>
                <thead>
                    <tr>
                        <th>Tipo</th>
                        <th>Motivo</th>
                        <th>Categoria</th>
                        <th>Fecha</th>
                        <th>Monto</th>
                    </tr>
                </thead>

                <tbody>
                    <tr v-for="(item, i) in paginatedItems" :key="i">
                        <td>{{ item[1] }}</td> <!-- Tipo -->
                        <td>{{ item[2] }}</td> <!-- Motivo -->
                        <td>{{ item[3] }}</td> <!-- Categoria -->
                        <td>{{ item[4] }}</td> <!-- Fecha -->
                        <td>${{ item[5] }}</td> <!-- Monto -->
                    </tr>
                </tbody>
            </v-table>

            <v-pagination v-model="page" :length="totalPages" class="mt-4" />
        </div>

        <div v-else class="text-center pa-10">
            <v-icon size="50" color="grey">
                mdi-inbox
            </v-icon>

            <div class="text-h6 mt-2">
                No hay registros en esta quincena
            </div>

            <div class="text-caption text-grey">
                Agrega tu primer movimiento para comenzar
            </div>
        </div>
    </v-card>
</template>