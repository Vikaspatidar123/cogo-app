import { Modal } from '@cogoport/components';
import { IcAFormsAndCertificates } from '@cogoport/icons-react';
import { useState } from 'react';

import useGetProductClassificationId from '../../hooks/useGetProductClassificationId';

import Pricing from './Price';
import styles from './styles.module.css';

function AddProductModal({
	showProduct,
	setShowProduct,
	prefiledValues = {},
	setIsEdit,
	refetchProduct,
}) {
	const [pdId, setProductClassificationId] = useState();
	const [productDetailsfromAPi, setProductDetailsfromApi] = useState({});
	const handleClick = () => {
		if (setIsEdit) {
			setIsEdit(false);
		}
		setShowProduct(false);
	};

	const { loading, addProductLoading, addProduct } = useGetProductClassificationId({
		setProductClassificationId,
		setProductDetailsfromApi,
		prefiledValues,
		refetchProduct,
	});
	const addProductHandler = async (data) => {
		await addProduct(data, setShowProduct, pdId);
	};
	return (
		<Modal show={showProduct} onClose={handleClick} onOuterClick={handleClick}>
			<div className={styles.styled_div}>
				<div className={styles.product_icon}>
					<IcAFormsAndCertificates width={25} height={25} />
				</div>
				<div>
					<div className={styles.title}>Add Product</div>
					<div className={styles.headline}>
						You are just a step away from adding your product!
					</div>
				</div>
				<Modal.Header />
			</div>

			<Pricing
				addProductHandler={addProductHandler}
				addProductLoading={addProductLoading || loading}
				productDetailsfromAPi={productDetailsfromAPi}
				prefiledValues={prefiledValues}
			/>
		</Modal>
	);
}

export default AddProductModal;
