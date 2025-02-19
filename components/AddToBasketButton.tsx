'use client';

import { Product } from "@/sanity.types"
import useBasketStore from "@/store/store";
import { useEffect, useState } from "react";

interface AddToBasketButtonProps {
    product: Product;
    disabled?: boolean;
}

function AddToBasketButton({
    product,
    disabled
}: AddToBasketButtonProps) {
    const { addItem, removeItem, getItemCount } = useBasketStore();
    const itemCount = getItemCount(product._id);

    const stock = product.stock ?? 0;
    const isAddDisabled = itemCount >= stock;

    const [isCLient, setIsClient] = useState(false)

    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isCLient) {
        return null;
    }

    return (
        <div className="flex items-center justify-center space-x-2">
            <button
                onClick={() => removeItem(product._id)}
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-200 ${itemCount === 0 ? "bg-gray-100 cursor-not-allowed" : "bg-gray-200 hover:bg-gray-300"} `}
                disabled={itemCount === 0 || disabled}
            >
                <span className={`text-xl font-bold ${itemCount === 0 ? "text-gray-400" : "text-gray-600"}`}>
                    -
                </span>
            </button>
            <span className="w-8 text-center font-semibold">{itemCount}</span>
            <button
                onClick={() => addItem(product)}
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-200 ${isAddDisabled ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-gray-600"} `}
                disabled={isAddDisabled}
            >
                <span className='text-xl font-bold text-white'>
                    +
                </span>
            </button>
        </div>
    )
}

export default AddToBasketButton