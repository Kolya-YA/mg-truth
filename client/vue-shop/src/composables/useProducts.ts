import { computed, ref } from "vue";
import type { Product } from "@/types/Product";

// Mock products for development
const mockProducts: Product[] = [
	{
		id: 1,
		name: "The Design of Everyday Things",
		price: 29.99,
		description:
			"A powerful primer on how design serves as the interface between objects and users",
		category: "books",
		image: "https://placehold.co/140x200",
		featured: true,
		rating: { rate: 4.8, count: 120 },
	},
	{
		id: 2,
		name: "Clean Code",
		price: 34.99,
		description:
			"A handbook of agile software craftsmanship by Robert C. Martin",
		category: "books",
		image: "https://placehold.co/140x200",
		featured: true,
		rating: { rate: 4.9, count: 200 },
	},
	{
		id: 3,
		name: "Refactoring",
		price: 39.99,
		description: "Improving the design of existing code by Martin Fowler",
		category: "books",
		image: "https://placehold.co/140x200",
		featured: false,
		rating: { rate: 4.7, count: 150 },
	},
	{
		id: 4,
		name: "Domain-Driven Design",
		price: 44.99,
		description: "Tackling complexity in the heart of software by Eric Evans",
		category: "books",
		image: "https://placehold.co/140x200",
		featured: false,
		rating: { rate: 4.6, count: 180 },
	},
	{
		id: 5,
		name: "Patterns of Enterprise Application Architecture",
		price: 49.99,
		description: "Essential patterns for enterprise software by Martin Fowler",
		category: "books",
		image: "https://placehold.co/140x200",
		featured: true,
		rating: { rate: 4.5, count: 160 },
	},
];


export function useProducts() {
	const products = ref<Product[]>([]);
	const loading = ref<boolean>(false);
	const error = ref<string | null>(null);

	const featuredProducts = computed(() =>
		products.value.filter((product) => product.featured),
	);

	// Modify fetchProducts to use mock data
	async function fetchProducts() {
		loading.value = true;
		try {
			// const response = await fetch("https://fakestoreapi.com/products"); // TODO: Replace with your own API
			// products.value = await response.json();
			// Simulate API delay
			await new Promise((resolve) => setTimeout(resolve, 1000));
			products.value = mockProducts;
		} catch (err) {
			error.value =
				err instanceof Error ? err.message : "Failed to fetch products";
		} finally {
			loading.value = false;
		}
	}

	return {
		products,
		featuredProducts,
		loading,
		error,
		fetchProducts,
	};
}
