import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";

export const getMyOrders = async (userId: any) => {

    if (!userId) {
        throw new Error("User ID is required to fetch orders");
    }

    const GET_ORDERS_QUERY = defineQuery(`
        *[
            _type == "order"
            && clerkUserId == $userId
        ] | order(orderDarw desc) {
            ...,
            products[]{
                ...,
                product->
            }
        }
    `);

    try {
        const orders = await sanityFetch({
            query: GET_ORDERS_QUERY,
            params: {
                userId
            }
        });

        return orders ? orders.data : [];

    } catch (err) {
        console.error("Error fetching orders:", err);
        throw new Error('Error fetching orders');
    }
};
