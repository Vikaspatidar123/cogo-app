import { Select } from '@cogoport/components';
import { useState, useEffect } from 'react';

import { shortFormatNumber } from '../../common/getShortFromatNumber';
import EmptyState from '../../common/List/EmptyState';
import useTopProducts from '../../hooks/useGraphProductList';
import useTopProductList from '../../hooks/useTopProductList';
import useTotalRevenue from '../../hooks/useTotalRevenue';

import BuyerGraph from './BuyerGraph';
import ProductGraph from './ProductGraph';
import {
	Container,
	Revenue,
	Title,
	Card,
	Bar,
	Row,
	SelectDiv,
	BorderLine,
	EmptyIcon,
	SubContainer,
} from './style';

function Dashboard({ apiData, activeTab }) {
	const { list = [] } = apiData || {};
	const data = list?.map((x) => ({ label: `${x.name}`, value: `${x.id}` }));
	const [productId, setPartnerId] = useState();
	const {
		productList, loading, period, setPeriod,
	} = useTopProductList();
	const { topProduct, fetchTopProducts, loading: productLoading } = useTopProducts();
	const { totalRevenue = 0 } = useTotalRevenue();
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
		<Container>
			<Revenue>
				<Title className="mainHeading">Total Revenue</Title>
				<div>
					<div className="amount">{shortFormatNumber(totalRevenue?.data, 'INR')}</div>
				</div>
			</Revenue>
			<Card>
				<Bar />
				<Row>
					<Title>Top Products</Title>
					<SelectDiv>
						<Select
							options={OPTIONS}
							placeholder="Select"
							value={period}
							onChange={(e) => setPeriod(e)}
						/>
					</SelectDiv>
					<BorderLine />
				</Row>
				<div className="head">
					<Row>
						<div>Name </div>
						<div>Profit %</div>
						<div>Sold </div>
					</Row>
				</div>
				{loading && <span className="loader" />}
				{!loading && productList?.length === 0 ? (
					<EmptyIcon>
						<EmptyState height="10" message="No Data Available" />
					</EmptyIcon>
				) : (
					<ProductGraph productList={productList} loading={loading} />
				)}
			</Card>
			<Card>
				<Bar />
				<Row>
					<Title>Product Buyer Database</Title>
					<SelectDiv>
						<Select
							options={data}
							placeholder="Select"
							value={productId}
							onChange={(e) => onChange(e)}
						/>
					</SelectDiv>
					<BorderLine />
				</Row>
				{productLoading && <span className="loader" />}

				{!productLoading && topProduct?.length === 0 ? (
					<EmptyIcon>
						<SubContainer>
							<>Select Product Name From Filter</>
						</SubContainer>
						<EmptyState height="10" message="No Data Available" />
					</EmptyIcon>
				) : (
					<BuyerGraph topProduct={topProduct} productLoading={productLoading} />
				)}
			</Card>
		</Container>
	);
}

export default Dashboard;
