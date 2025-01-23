<script setup lang="ts">
import type { Product } from "@/types/Product";

const props = defineProps<{
	product: Product;
}>();
</script>

<template>
  <div class="card">
    <img class="card__image" :src="product.image" :alt="product.name">
    <div class="card__content">
      <h3 class="card__name">{{ product.name }}</h3>
      <p class="card__description">{{ product.description }}</p>
    </div>
    <div class="card__footer">
      <span class="card__price">{{ product.price }}€</span>
      <button class="card__add-button">
        Add to cart
      </button>
    </div>
  </div>
</template>

<style>
  .card {
    display: grid;
    grid-template-rows: auto 1fr;
    gap: 1rem;
    border: 1px solid #e2e8f0;
    border-radius: 0.5rem;
    overflow: hidden;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
    transition: box-shadow 0.3s;

    &:hover {
      box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
     }
  }

    .card__image {
    max-width: 100%;
    height: 200px;
    object-fit: cover;
  }

  .card__content {
    padding-inline: 1rem;
  }
  
  .card__name {
    font-size: 1.25rem;
    margin: 0;
    font-weight: 600;
  }

  .card__description {
    margin-block: .3em;
    color: #4a5568;
  }

  .card__footer {
    display: flex;
    justify-content: space-between;
    align-items: center;    
    padding-block-end: 1rem;
    padding-inline: 1rem;
  }

  .card__price {
    font-size: 1.25rem;
    font-weight: 600;
  }

  .card__add-button {
    padding: 0.5rem 1rem;
    background-color: #3182ce;
    color: white;
    border: none;
    border-radius: 0.25rem;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
      background-color: #2c5282;
    }
  }

</style>
