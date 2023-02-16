import { Modal } from '@cogoport/components';
import { IcAFormsAndCertificates } from '@cogoport/icons-react';
import { useState } from 'react';

import { StyledDiv, ProductIcn } from '../../components/HsCodeModal/style';
import useGetProductClassificationId from '../../hooks/useGetProductClassificationId';
import Pricing from '../Price';

function AddProductModal({
	showProduct,
	setShowProduct,
	prefiledValues = {},
	countryInfo = {},
	isEdit = false,
	productId,
	addProduct,
	addProductLoading,
	setHSCode,
	refetchProduct,
	productClassificationId,
	subCategoryCount,
	card,
	setActiveTab,
	isMobile,
}) {
	const [pdId, setProductClassificationId] = useState();
	const [productDetailsfromAPi, setProductDetailsfromApi] = useState({});

	const { loading } = useGetProductClassificationId({
		setProductClassificationId,
		setProductDetailsfromApi,
		prefiledValues,
	});
	const countryName = countryInfo?.name;
	return (
		<Modal
			show={showProduct}
			onClose={() => setShowProduct(false)}
			width={!isMobile ? 600 : 400}
		>
			<StyledDiv>
				<ProductIcn>
					<IcAFormsAndCertificates width={25} height={25} />
				</ProductIcn>
				<div>
					{isEdit ? (
						<div className="title">Edit Product</div>
					) : (
						<div className="title">Add Product</div>
					)}
					<div className="headline">
						You are just a step away from adding your product!
					</div>
				</div>
			</StyledDiv>

			<Pricing
				addProductLoading={addProductLoading}
				productDetailsfromAPi={productDetailsfromAPi}
				prefiledValues={prefiledValues}
				loading={loading}
				isEdit={isEdit}
				setShowProduct={setShowProduct}
				refetchProduct={refetchProduct}
				setHSCode={setHSCode}
				productClassificationId={productClassificationId}
				productId={productId}
				addProduct={addProduct}
				countryName={countryName}
				pdId={pdId}
				subCategoryCount={subCategoryCount}
				card={card}
				setActiveTab={setActiveTab}
			/>
		</Modal>
	);
}

export default AddProductModal;
