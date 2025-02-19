'use client'

import { Button } from "@/components/ui/button";
import useBasketStore from "@/store/store";
import Link from "next/link";
import { useSearchParams } from "next/navigation"
import { useEffect } from "react";

function SuccessPage() {
    const searchParams = useSearchParams();
    const orderNumber = searchParams.get('orderNumber');
    const clearBasket = useBasketStore((state) => state.clearBasket);
    const sessionId = searchParams.get('sessionId');

    useEffect(() => {
        if (orderNumber) {
            clearBasket();
        }
    }, [orderNumber, clearBasket])

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
            <div className="bg-white p-12 rouunded-xl shadow-lg max-w-2xl w-full mx-4">
                <div className="flex justify-center mb-8">
                    <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center">
                        <svg className="h-8 w-8 text-green-600" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 48 48">
                            <path fill="#4caf50" d="M34.586,14.586l-13.57,13.586l-5.602-5.586l-2.828,2.828l8.434,8.414l16.395-16.414L34.586,14.586z"></path>
                        </svg>
                    </div>
                </div>
                <h1 className="text-4xl font-bold mb-6 text-center capitalize">
                    Thank you for your order!
                </h1>

                <div className="border-t border-b border-gray-200 py-6 mb-6">
                    <p className="text-lg text-center text-gray-700 mb-4">
                        Your order has been successfully processed.
                    </p>
                    <div className="space-y-2">
                        {orderNumber && (
                            <p className="text-gray-600 flex items-center space-x-5">
                                <span>Order Nuumber:</span>
                                <span className="font-mono text-sm text-green-600">
                                    {orderNumber}
                                </span>
                            </p>
                        )}
                        {sessionId && (
                            <p className="text-gray-600 flex justify-between">
                                <span>Transaction ID:</span>
                                <span className="font-mono text-sm">
                                    {sessionId}
                                </span>
                            </p>
                        )}
                    </div>
                </div>
                <div className="space-y-4">
                    <p className="text-gray-600">
                        A confirmation email hs been sent
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button asChild className="bg-green-600 hover:bg-green-700">
                            <Link href="/orders">View Order Details </Link>
                        </Button>
                        <Button asChild variant="outline">
                            <Link href="/">Continue Shopping </Link>
                        </Button>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default SuccessPage