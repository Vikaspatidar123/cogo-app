import { Modal } from '@cogoport/components';
import { useState } from 'react';

import useProductCategory from '../hooks/useProductCategory';
import useProductList from '../hooks/useProductList';

import header from './Header';
import ProductCategory from './ProductCategory';
import ProductList from './ProductList';

function ProductCatalogue({
	showCatalogue,
	setShowCatalogue,
	setSelectedData,
}) {
	const [labeledValue, setLabeledValue] = useState('category');

	const {
		productList = {},
		loading = false,
		globalFilter = '',
		setGlobalFilter,
		pagination = 1,
		setPagination,
	} = useProductList({ labeledValue });

	const { categoryViewData, categoryLoading } = useProductCategory({ labeledValue });

	return (
		<Modal
			show={showCatalogue}
			onClose={() => setShowCatalogue(false)}
			showCloseIcon={false}
			size="xl"
			scroll={false}
		>
			<Modal.Header title={header({
				labeledValue, setLabeledValue, globalFilter, setGlobalFilter,
			})}
			/>
			<Modal.Body>
				{labeledValue === 'category' && (
					<ProductCategory
						categoryViewData={categoryViewData}
						loading={categoryLoading}
						setSelectedData={setSelectedData}
						setShowCatalogue={setShowCatalogue}
					/>
				)}
				{labeledValue === 'list' && (
					<ProductList
						productList={productList}
						loading={loading}
						pagination={pagination}
						setPagination={setPagination}
						setSelectedData={setSelectedData}
						setShowCatalogue={setShowCatalogue}
					/>
				)}
			</Modal.Body>

		</Modal>
	);
}

export default ProductCatalogue;
