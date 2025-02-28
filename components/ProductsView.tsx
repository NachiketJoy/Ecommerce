import { Category, Product } from "@/sanity.types";
import ProductGrid from "./ProductGrid";
import { CategorySelectorComponent } from "./ui/categorySelector";
import Title from "./Title";

interface ProductsViewProps {
    products: Product[];
    categories: Category[];
}

const ProductsView = ({
    products,
    categories
}: ProductsViewProps) => {
    return (
        <div className="flex flex-col">
            <div className="flex-1">
                <div className="relative">
                    <Title
                        title="L<b>i</b>st <b>o</b>f p<b>r</b>od<b>u</b>cts"
                        containerClass="mt-24 !text-black text-center" />

                    <div className="w-full sm:w-[200px] absolute top-12 right-6">
                        <CategorySelectorComponent categories={categories} />
                    </div>
                    <ProductGrid products={products} />

                    <hr className="w-1/2 sm:w-3/4" />
                </div>
            </div>
        </div>
    )
}

export default ProductsView;