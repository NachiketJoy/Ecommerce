import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";
import { CouponCode } from "./couponCodes";

export const getSalesDetails = async (couponCode: CouponCode) => {
    const SALE_DETAILS_QUERY = defineQuery(`
        *[
            _type == "sale"
            && isActive == true
            && couponCode == $couponCode
        ] | order(validFrom desc)[0]
    `);

    try {
        const activeSaleDetails = await sanityFetch({
            query: SALE_DETAILS_QUERY,
            params: {
                couponCode
            }
        });

        return activeSaleDetails ? activeSaleDetails.data : '';

    } catch (err) {
        console.error("Error fetching sale details:", err);
        return [];
    }
};
