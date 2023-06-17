import { Pagination } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import { useTranslation } from 'next-i18next';
import { useState, useEffect } from 'react';

import Header from '../../common/Header';
import StoreCardLoader from '../../common/StoreCardLoader';
import useListCogoStoreProductCategories from '../../hooks/useListCogoStoreProductCategories';
import useListCogoStoreProducts from '../../hooks/useListCogoStoreProducts';

import Categories from './Categories';
import Filter from './Filter';
import StoreCard from './StoreCard';
import styles from './styles.module.css';
import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';
import { useRouter } from '@/packages/next';

function Main() {
	const { t } = useTranslation(['cogoStore']);
	const { query } = useRouter();
	const { id = '', isCategory = false } = query || {};

	const [brandFilter, setBrandFilter] = useState({
		show      : false,
		brandList : [],
	});

	const [rangeFilter, setRangeFilter] = useState({
		show      : false,
		rangeList : {},
	});

	const [categoryInfo, setCategoryInfo] = useState({
		categoryId   : isCategory ? id : '',
		categoryName : 'All Products',
	});

	const { categoryId, categoryName } = categoryInfo;

	const { brandList } = brandFilter;
	const { rangeList } = rangeFilter;

	const {
		loading: listLoading,
		data: productsData,
		setCurrentPage,
		searchValue,
		setSearchValue,
	} = useListCogoStoreProducts({ categoryInfo, brandList, rangeList });

	const { data } = useListCogoStoreProductCategories();
	const { list: categories = [] } = data || {};

	const {
		list: productList = [],
		page,
		total_count = 0,
		page_limit = 0,
	} = productsData || {};

	const newList = listLoading ? [1, 2, 3, 4, 5, 6] : productList;

	useEffect(() => {
		if (isCategory && !isEmpty(categories)) {
			const displayName = (categories || []).find(
				(item) => item.id === id || undefined,
			)?.display_name;

			setCategoryInfo((prev) => ({
				...prev,
				categoryName: displayName,
			}));
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isCategory, categories]);

	const displayCategoryProduct = (category_id, display_name) => {
		if (!isEmpty(brandList)) {
			setBrandFilter({
				show      : false,
				brandList : [],
			});
		}

		if (!isEmpty(rangeList)) {
			setRangeFilter({
				show      : false,
				rangeList : [],
			});
		}

		if (!isEmpty(searchValue)) {
			setSearchValue('');
		}

		setCategoryInfo({
			categoryId   : category_id,
			categoryName : display_name || 'All Products',
		});
	};

	return (
		<div className={styles.main_container}>
			<Header />
			<div className={styles.sidebar}>
				<Categories
					categories={categories}
					categoryId={categoryInfo?.categoryId}
					setCategoryInfo={setCategoryInfo}
					displayCategoryProduct={displayCategoryProduct}
				/>
			</div>

			<div className={styles.main}>
				<div className={styles.main_header}>
					<div className={styles.title}>
						{categoryName}
						(
						{total_count}
						)
					</div>
					<Filter
						rangeFilter={rangeFilter}
						brandFilter={brandFilter}
						searchValue={searchValue}
						setRangeFilter={setRangeFilter}
						setBrandFilter={setBrandFilter}
						setSearchValue={setSearchValue}
						categoryId={categoryId}
					/>
				</div>

				<div className={styles.cards_container}>
					{listLoading && (
						<div className={styles.main_cards}>
							{(newList||[]).map((item) => (
								<StoreCardLoader key={item} width="288px" />
							))}
						</div>
					)}

					{!listLoading && total_count > 0 && (
						<>
							<div className={styles.main_cards}>
								{(newList||[]).map((product) => (
									<StoreCard key={product?.id} item={product} />
								))}
							</div>
							<div className={styles.pagination_container}>
								<Pagination
									type="number"
									currentPage={page}
									totalItems={total_count}
									pageSize={page_limit}
									onPageChange={setCurrentPage}
								/>
							</div>
						</>
					)}

					{!listLoading && total_count === 0 && (
						<div className={styles.empty_state}>
							<img
								src={GLOBAL_CONSTANTS.image_url.empty_category_image}
								alt={t('cogoStore:main_image_alt')}
								height={300}
								width={300}
							/>
							<span>
								{t('cogoStore:cogostore_components_main_empty_state')}
							</span>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}

export default Main;
