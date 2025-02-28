import Banner from "@/components/Banner";
import NewProducts from "@/components/NewProducts";
import ProductsView from "@/components/ProductsView"
import { getAllCategories } from "@/sanity/lib/products/getAllCategories";
import { getAllProducts } from "@/sanity/lib/products/getAllProducts";
import { getProductsByLatest } from "@/sanity/lib/products/getLatestProducts";
import { searchProductsByName } from "@/sanity/lib/products/searchProductsByName";

// export const dynamic = 'force-static';
export const revalidate = 60;

export default async function Home({
  searchParams,
}: {
  searchParams: {
    query: string,
  }
}) {
  const products = await getAllProducts();
  const categories = await getAllCategories();
  const product = await getProductsByLatest(5);

  const { query } = await searchParams;
  const productSearch = query ? await searchProductsByName(query) : products;

  console.log(
    crypto.randomUUID().slice(0, 5) +
    `>>> Rendered the home page cache with ${products.length} products
    and ${categories.length} categories.`
  )

  return (
    <div>
      <Banner />

      <NewProducts product= {product}/>

      <div>
        {!productSearch.length ? (
          <h1 className="text-3xl font-bold mb-6 text-center">
            No products found for {query}
          </h1>
        ) : (
          <ProductsView products={productSearch} categories={categories} />
        )}
      </div>
    </div>
  );
}
