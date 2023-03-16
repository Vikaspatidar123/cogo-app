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
	multiSelect = false,
	selectedId = [],
}) {
	const [labeledValue, setLabeledValue] = useState('category');

	const {
		productList = {},
		loading = false,
		globalFilter = '',
		setGlobalFilter,
		pagination = 1,
		setPagination,
		allprductData,
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
						multiSelect={multiSelect}
						selecteId={selectedId}
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
						multiSelect={multiSelect}
						selectedId={selectedId}
						allprductData={allprductData}
					/>
				)}
			</Modal.Body>

		</Modal>
	);
}

export default ProductCatalogue;
