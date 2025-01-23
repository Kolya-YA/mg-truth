<script setup lang="ts">
import type { Product } from "@/types/Product";
import ProductCard from "@/components/ProductCard.vue";

defineProps<{
	products: Product[];
	loading?: boolean;
}>();
</script>

<template>
  <div v-if="loading" class="">
    <div class="loader">Loader</div>
  </div>
  <div v-else class="list">
    <ProductCard
      v-for="product in products"
      :key="product.id"
      :product="product"
    />
  </div>
</template>
<!-- animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 -->
<style>
  .loader {
    display: grid;
    place-content: center;
    height: 200px;
    background-color: hsl(209, 60%, 96%);
  }

  .list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 1rem;
  }
</style>