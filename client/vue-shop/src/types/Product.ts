export interface Product {
		id: number;
		name: string;
		description: string;
		price: number;
		image: string;
		featured: boolean;
		category: "books" | "merch" | "other";
		rating: {
			rate: number; // form 0 to 5
			count: number; // positiv integer
		};
	}