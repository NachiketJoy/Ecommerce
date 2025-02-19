import { COUPON_CODES } from "@/sanity/lib/sales/couponCodes"
import { getSalesDetails } from "@/sanity/lib/sales/getSalesDetails"

async function Banner() {
    const saleDetails = await getSalesDetails(COUPON_CODES.BFRIDAY);

    if (!saleDetails || Array.isArray(saleDetails) || !saleDetails?.isActive) {
        return null;
    }

    return (
        <div className="bg-gradient-to-r from-red-500 to-black text-white px-6 py-10 mx-4 mt-2 rounded-lg shadow-lg">
            <div className="container mx-auto flex items-center justify-between">
                <div className="flex-1">
                    <h2 className="text-3xl sm:text-5xl font-extrabold text-left mb-4">
                        {saleDetails.title}
                    </h2>
                    <p className="text-left text-xl sm:text-3xl font-semibold mb-6">
                        {saleDetails.description}
                    </p>
                    <div className="flex">
                        <div className="bg-white text-black py-4 px-6 rounded-full shadow-md transform hover:scale-105 transition duration-300">
                            <span className="font-bold text-base sm:text-xl">
                                Use code: {" "}
                                <span className="text-red-600">{saleDetails.couponCode}</span>
                            </span>
                            <span className="ml-2 font-bold text-base sm:text-xl">
                                for {saleDetails.discountAmount}% Off
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Banner