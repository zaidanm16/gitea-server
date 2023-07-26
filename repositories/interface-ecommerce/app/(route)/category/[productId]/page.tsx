import Container from "@/components/ui/Container";
import Billboard from "@/components/billboard";
import ProductCard from "@/components/ui/ProductCard";
import NoResults from "@/components/ui/NoResult";

import getProducts from "@/actions/get-products";
import getCategory from "@/actions/get-category";
import getColors from "@/actions/get-colors";

import Filter from "./components/Filter";
import MobileFilters from "./components/MobileFilter";
import getRams from "@/actions/get-rams";
import getStorages from "@/actions/get-storages";

export const revalidate = 0;

interface CategoryPageProps {
  params: {
    categoryId: string;
  };
  searchParams: {
    colorId: string;
    ramId: string;
    storageId: string;
  };
}

const CategoryPage: React.FC<CategoryPageProps> = async ({
  params,
  searchParams,
}) => {
  const products = await getProducts({
    categoryId: params.categoryId,
    colorId: searchParams.colorId,
    ramId: searchParams.ramId,
    storageId: searchParams.storageId,
  });
  const rams = await getRams();
  const colors = await getColors();
  const storages = await getStorages();
  const category = await getCategory(params.categoryId);

  return (
    <div className="bg-white">
      <Container>
        {category && category.billboard && (
          <Billboard data={category.billboard} />
        )}
        <div className="px-4 sm:px-6 lg:px-8 pb-24">
          <div className="lg:grid lg:grid-cols-5 lg:gap-x-8">
            <MobileFilters rams={rams} storages={storages} colors={colors} />
            <div className="hidden lg:block">
              <Filter valueKey="ramId" name="RAM" data={rams} />
              <Filter valueKey="storageId" name="Storage" data={storages} />
              <Filter valueKey="colorId" name="Colors" data={colors} />
            </div>
            <div className="mt-6 lg:col-span-4 lg:mt-0">
              {products.length === 0 && <NoResults />}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {products.map((item) => (
                  <ProductCard key={item.id} data={item} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default CategoryPage;
