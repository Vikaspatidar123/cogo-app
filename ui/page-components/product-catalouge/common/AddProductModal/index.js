import { Modal } from '@cogoport/components';
import { IcAFormsAndCertificates } from '@cogoport/icons-react';
import { useState } from 'react';

import useGetProductClassificationId from '../../hooks/useGetProductClassificationId';
import Pricing from '../Price';

import styles from './styles.module.css';

// import { useSelector } from '@/packages/store';

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
	setIsEdit,
}) {
	const [pdId, setProductClassificationId] = useState();
	const [productDetailsfromAPi, setProductDetailsfromApi] = useState({});

	const handleClick = () => {
		if (setIsEdit) {
			setIsEdit(false);
		}
		setShowProduct(false);
	};

	const { loading } = useGetProductClassificationId({
		setProductClassificationId,
		setProductDetailsfromApi,
		prefiledValues,
	});
	const countryName = countryInfo?.name;
	return (
		<Modal
			show={showProduct}
			onClose={handleClick}
			onOuterClick={handleClick}
		>
			<div className={styles.styled_div}>
				<div className={styles.product_icon}>
					<IcAFormsAndCertificates width={25} height={25} />
				</div>
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
			</div>

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
				setIsEdit={setIsEdit}
			/>
		</Modal>
	);
}

export default AddProductModal;
