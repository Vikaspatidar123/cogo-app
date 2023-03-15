import { Select } from '@cogoport/components';
import { useState, useEffect } from 'react';

import EmptyState from '../../common/List/EmptyState';
import useTopProducts from '../../hooks/useGraphProductList';
import useTopProductList from '../../hooks/useTopProductList';

import BuyerGraph from './BuyerGraph';
import ProductGraph from './ProductGraph';
import styles from './styles.module.css';

function Dashboard({ apiData, activeTab }) {
	const { list = [] } = apiData || {};
	const data = list?.map((x) => ({ label: `${x.name}`, value: `${x.id}` }));
	const [productId, setPartnerId] = useState();
	const {
		productList, loading, period, setPeriod,
	} = useTopProductList();
	const { topProduct, fetchTopProducts, loading: productLoading } = useTopProducts();
	const OPTIONS = [
		{ label: 'This Month', value: 'MONTH' },
		{ label: 'This Year', value: 'YEAR' },
		{ label: 'This Week', value: 'WEEK' },
		{ label: 'This Quarter', value: 'QUARTER' },
	];

	const onChange = (e) => {
		setPartnerId(e);
		fetchTopProducts({ productId: e });
	};

	useEffect(() => {
		setPartnerId('');
	}, [activeTab]);

	return (
		<div className={styles.container}>
			<div className={styles.revenue} />
			<div className={styles.card}>
				<div className={styles.bar} />
				<div className={styles.row}>
					<div className={styles.title}>Top Products</div>
					<div className={styles.select_div}>
						<Select
							options={OPTIONS}
							placeholder="Select"
							value={period}
							onChange={(e) => setPeriod(e)}
						/>
					</div>
				</div>
				<div className="head">
					<div className={styles.row}>
						<div>Name </div>
						<div>Profit %</div>
						<div>Sold </div>
					</div>
				</div>
				{loading && <span className="loader" />}
				{!loading && productList?.length === 0 ? (
					<div className={styles.empty_icon}>
						<EmptyState height="10" message="No Data Available" />
					</div>
				) : (
					<ProductGraph productList={productList} loading={loading} />
				)}
			</div>
			<div className={styles.card}>
				<div className={styles.bar} />
				<div className={styles.row}>
					<div className={styles.title}>Product Buyer Database</div>
					<div className={styles.select_div}>
						<Select
							options={data}
							placeholder="Select"
							value={productId}
							onChange={(e) => onChange(e)}
						/>
					</div>
					<div className={styles.border_line} />
				</div>
				{productLoading && <span className="loader" />}

				{!productLoading && topProduct?.length === 0 ? (
					<div className={styles.empty_icon}>
						<div className={styles.sub_container}>
							<div>Select Product Name From Filter</div>
						</div>
						<EmptyState height="10" message="No Data Available" />
					</div>
				) : (
					<BuyerGraph topProduct={topProduct} productLoading={productLoading} />
				)}
			</div>
		</div>
	);
}

export default Dashboard;
