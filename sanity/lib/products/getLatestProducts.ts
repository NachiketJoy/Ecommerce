import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";

export const getProductsByLatest = async (limit: number) => {
    const PRODUCTS_BY_LATEST = defineQuery(`
        *[
            _type == "product"
        ] | order(_createdAt desc) [0...$limit]
    `);

    try {
        const products = await sanityFetch({
            query: PRODUCTS_BY_LATEST,
            params: {
                limit
            }
        });

        return products.data || [];

    } catch (err) {
        console.error("Error fetching product by id:", err);
        return [];
    }
};
