import { COUPON_CODES } from "@/sanity/lib/sales/couponCodes"
import { getSalesDetails } from "@/sanity/lib/sales/getSalesDetails"
import Form from 'next/form'


async function Banner() {
    const saleDetails = await getSalesDetails(COUPON_CODES.BFRIDAY);

    return (
        <div className="flex flex-col items-center h-auto mb-8 md:h-[50vh] bg-gradient-to-r from-red-500 to-black text-white px-6 py-10 mx-4 mt-2 rounded-lg shadow-lg">
            <div className="container mx-auto flex items-center justify-center md:justify-between">
                <h1 className="special-font hero-heading">s<b>h</b>op<b>sphere</b></h1>
                {saleDetails?.isActive ? (
                    <div>
                        <h2 className="text-3xl sm:text-5xl font-extrabold text-left mb-4">
                            {saleDetails?.title}
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
                ) : (
                    <img className="w-1/2 hidden md:block"
                        src="/images/banner.png" alt="banner img" />
                )}
            </div>
            {/* <Form action="/search" className="w-full sm:w-[70vh] sm:flex-1 sm:mx-4 mt-2 md:-mt-8 sm:mt-0"> using a search page*/} 
            <Form action="/" className="w-full sm:w-[70vh] sm:flex-1 sm:mx-4 mt-2 md:-mt-8 sm:mt-0">
                <input type="text" name="query" placeholder="Search for products"
                    className="bg-gray-100 text-gray-800 px-4 py-2 rounded focus:outline-none
                    focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 border w-full max-w-4xl"/>
            </Form>
        </div>
    )
}

export default Banner