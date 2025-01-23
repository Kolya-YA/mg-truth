<script setup lang="ts">
import { ref } from 'vue';
const isCartOpen = ref(false);
</script>

<template>
    <div>Cart Drawer
        <button @click="isCartOpen = !isCartOpen">Toggle Cart</button>
        <div v-if="isCartOpen" class="cart-drawer">
            <h2>Cart</h2>
            <ul>
                <li>Product 1</li>
                <li>Product 2</li>
                <li>Product 3</li>
            </ul>
        </div>
    </div>
</template>