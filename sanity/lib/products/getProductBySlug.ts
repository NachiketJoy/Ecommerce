import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";
import { Product } from "@/sanity.types";

export const getProductBySlug = async (slug: string): Promise<Product | null> => {
    const PRODUCTS_BY_ID_QUERY = defineQuery(`
        *[
            _type == "product"
            && slug.current == $slug
        ] | order(name asc)[0]
    `);

    try {
        const product = await sanityFetch({
            query: PRODUCTS_BY_ID_QUERY,
            params: {
                slug
            }
        });

        return product.data || null;

    } catch (err) {
        console.error("Error fetching product by id:", err);
        return null;
    }
};
