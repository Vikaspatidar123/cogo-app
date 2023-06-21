import Header from '../../common/Header';
import useListBanner from '../../hooks/useListBanner';
import useListCogoStoreBrands from '../../hooks/useListCogoStoreBrands';
import useListCogoStoreProductCategories from '../../hooks/useListCogoStoreProductCategories';
import useListProductStore from '../../hooks/useListProductStore';

import Banner from './Banner';
import Categories from './Categories';
import PopularStores from './PopularStores';
import styles from './styles.module.css';
import TrendingOffers from './TrendingOffers';

function CogoStore() {
	const { data: bannerData = {}, loading: bannerLoading } = useListBanner();
	const { data: categoryData = {}, loading: categoryLoading } = useListCogoStoreProductCategories();
	const { data: brandData = {}, loading: brandLoading } = useListCogoStoreBrands();
	const { data: storeData = {}, loading: storeLoading } = useListProductStore([
		'trending',
	]);

	return (
		<div className={styles.container}>
			<Header />
			<Banner data={bannerData} loading={bannerLoading} />
			<Categories data={categoryData} loading={categoryLoading} />
			<PopularStores data={brandData} loading={brandLoading} />
			<TrendingOffers data={storeData} loading={storeLoading} />

		</div>
	);
}
export default CogoStore;
