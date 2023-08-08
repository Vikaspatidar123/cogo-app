import { Modal } from '@cogoport/components';
import { IcAFormsAndCertificates } from '@cogoport/icons-react';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';

import useGetProductClassificationId from '../../hooks/useGetProductClassificationId';
import Pricing from '../Price';

import styles from './styles.module.css';

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
	const { t } = useTranslation(['common', 'productCatalogue']);
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
						<div className="title">{t('productCatalogue:product_catalogue_add_product_modal_text_1')}</div>
					) : (
						<div className="title">{t('productCatalogue:product_catalogue_add_product_modal_text_2')}</div>
					)}
					<div className="headline">
						{t('productCatalogue:product_catalogue_add_product_modal_text_3')}
					</div>
				</div>
				<Modal.Header />
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
