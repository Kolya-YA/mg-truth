<script setup lang="ts">
import { computed, onMounted } from "vue";
import { useProducts } from "@/composables/useProducts";
import ProductList from "@/components/ProductList.vue";

const { featuredProducts, loading, error, fetchProducts } = useProducts();

const FEATURED_LIMIT = 3;
const limitedFeaturedProducts = computed(() =>
	featuredProducts.value.slice(0, FEATURED_LIMIT),
);

onMounted(() => {
	fetchProducts();
});
</script>

<template>
  <section class="shop">
    <div class="wrapper">      
      <!-- Error message -->
      <div v-if="error" class="text-red-600 mb-4">
        {{ error }}
      </div>

      <ProductList
        :products="limitedFeaturedProducts"
        :loading="loading"
      />
      
      <!-- Shop page link -->
      <div class="shop__link">
        <a class="shop__link__link" href="/shop">
          To shop page
        </a>
      </div>
    </div>
  </section>
</template>


<style scoped>
  .shop {
    margin-block: 2rem;
  }

  .wrapper {
    /* max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 */
    max-width: 80rem;
    margin-inline: auto;
    padding-inline: 1rem;
    @media (min-width: 640px) {
      padding-inline: 1.5rem;
    }
    @media (min-width: 1024px) {
      padding-inline: 2rem;
    }
  }

  .shop__link {
    margin-block-start: 1.5rem;
    text-align: center;
  }

  .shop__link__link {
    display: inline-block;
    padding: 0.5rem 1rem;
    background-color: #2563eb;
    color: #fff;
    text-decoration: none;
    border-radius: 0.25rem;

    &:hover {
      background-color: #1d4ed8;
    }
  }
</style>