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
	setHSCode,
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
	const AddProductHandler = async (data) => {
		const resp = await addProduct(data, setShowProduct, pdId);
		if (resp?.data?.message === 'Success') {
			refetchProduct();
		}
	};
	return (
		<Modal show={showProduct} onClose={handleClick} onOuterClick={handleClick}>
			<div className={styles.styled_div}>
				<div className={styles.product_icon}>
					<IcAFormsAndCertificates width={25} height={25} />
				</div>
				<div>
					<div className="title">Add Product</div>
					<div className="headline">
						You are just a step away from adding your product!
					</div>
				</div>
				<Modal.Header />
			</div>

			<Pricing
				setHSCode={setHSCode}
				AddProductHandler={AddProductHandler}
				addProductLoading={addProductLoading || loading}
				loading={loading}
				productDetailsfromAPi={productDetailsfromAPi}
				prefiledValues={prefiledValues}
			/>
		</Modal>
	);
}

export default AddProductModal;
