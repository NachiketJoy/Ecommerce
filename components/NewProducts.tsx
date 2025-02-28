import { getAllProducts } from "@/sanity/lib/products/getAllProducts";
import Title from "./Title"
import ProductGrid from "./ProductGrid";
import { Product } from "@/sanity.types";
import Image from "next/image";
import { imageUrl } from "@/lib/imageUrl";

async function NewProducts({
    product
}: {
    product: Product[]
}) {
    return (
        <div className="container mx-auto">
            <Title
                title="N<b>e</b>w pr<b>o</b>du<b>c</b>ts"
                containerClass="my-24 !text-black text-center" />
            <div
                className={`group flex flex-col overflow-hidden`}>

                <div className="overflow-hidden flex justify-evenly">

                    {product.map((item: Product, index: number) => (
                        <div className="w-[200px]" key={index}>
                            {
                                item.image && (
                                    <Image
                                        className="object-contain"
                                        src={imageUrl(item.image).url()}
                                        alt={item.name || "Product Image"}
                                        width={275}
                                        height={275}
                                    />
                                )
                            }
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default NewProducts