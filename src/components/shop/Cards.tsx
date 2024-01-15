import { FC, useEffect, memo } from "react";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { ProductTypes } from "../../models/productTypes";
import { RootState, useAppDispatch } from "../../redux/app/store";
import { getFilteredProducts } from '../../redux/features/shopSlice';
import { Pagination, ProductCard } from "../common/index";
import { Option } from "../../models/OptionType";

interface CardsProps {
    gridClass?: string;
    size?: Option[];
    color?: string[];
    tag?: Option[];
    category?: Option[];
    minPrice?: number
    maxPrice?: number
    show: number
    sortBy?: string
    isNew: string
};

const Cards: FC<CardsProps> = ({ gridClass, size, color, tag, category, minPrice, maxPrice, show, sortBy, isNew }) => {
    const dispatch = useAppDispatch();
    const currentpage = useSelector((state: RootState) => state.pagination.currentPage);
    const { totalProductCount, filteredProducts } = useSelector((state: RootState) => state.shop);
    
    useEffect(() => {
        dispatch(getFilteredProducts({
            page: currentpage,
            take: show,
            categoryName: category,
            isNew: isNew,
            productTags: tag,
            productSizes: size,
            productColors: color,
            maxPrice: maxPrice,
            minPrice: minPrice,
            orderBy: sortBy,
        }));
    }, [dispatch, currentpage, size, color, minPrice, maxPrice, sortBy, show, category, tag, isNew]);

    return (
        <section className="bg-white">
            <div className="xl:w-[85%] w-[95%] mx-auto mt-[56px] mb-[69px]">
                {filteredProducts && filteredProducts.length > 0 ? (
                    <div className={`${gridClass === 'grid' ? 'grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1' : 'flex flex-col'} gap-8`}>
                        {filteredProducts?.map((product: ProductTypes) => (
                            <ProductCard
                                key={product.id}
                                product={product}
                                gridClass={gridClass}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="py-28 flex w-full justify-center items-center flex-col gap-3">
                        <span className="text-red-600 font-bold text-2xl text-center block">No product found.</span>
                    </div>
                )}
                <Pagination page={show} total={totalProductCount} />
            </div>
        </section>
    )
};

export default memo(Cards);