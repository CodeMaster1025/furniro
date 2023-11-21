import Pagination from "../common/Pagination";
import ProductCard from "../common/ProductCard";
import { selectFavProducts } from "../../redux/features/wishlistSlice";
import { useSelector } from "react-redux";
import { ProductTypes } from "../../models/productTypes";

const FavoritesContainer = () => {
    const favProducts = useSelector(selectFavProducts);

    return (
        <section className="bg-white">
            <div className="lg:max-w-[1236px] mx-auto mt-[56px] mb-[69px] lg:px-0 px-3">
                <h1 className="font-bold text-[#3A3A3A] mb-[32px] text-center lg:text-[30px] text-xl lg:leading-10">Your Favorite Products</h1>
                <div className="grid lg:grid-cols-4 gap-8 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 mt-8">
                    {favProducts.map((item: ProductTypes) => (
                        <ProductCard
                            key={item.id}
                            product={item}
                        />
                    ))}
                </div>
                <Pagination />
            </div>
        </section>
    )
}

export default FavoritesContainer