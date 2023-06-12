import { Button, Modal } from '@cogoport/components';
import { IcAFormsAndCertificates, IcMArrowRight } from '@cogoport/icons-react';
import { useState, useEffect, useCallback } from 'react';

import getField from '../../../../../../packages/forms/Controlled/index';
import getControls from '../../../configurations/addProductControls';
import useCategory from '../../../hooks/useCategory';

import styles from './styles.module.css';

import { useForm } from '@/packages/forms';

function ModalDetails({ data = {}, setShow }) {
	const [profitPercentage, setProfitPercentage] = useState(0);
	const { hsCode, id } = data || {};
	const {
		handleSubmit,
		setValue,
		watch,
		formState: { errors },
		control,
	} = useForm();
	const [costPrice, sellingPrice] = watch(['costPrice', 'sellingPrice']);
	const {
		productDetails = {},
		getproductLoading = false,
		onSubmit,
		addProductLoading = false,
	} = useCategory({
		hsCode,
		setShow,
		hsCodeId: id,
	});
	const { categoryDisplayName, subCategoryDisplayName } = productDetails;

	useEffect(() => {
		if (hsCode) {
			setValue('hsCode', hsCode);
		}
	}, [hsCode, setValue]);

	const calculateProfit = useCallback(() => {
		const profit = ((sellingPrice - costPrice) / costPrice) * 100;
		setProfitPercentage(profit);
	}, [costPrice, sellingPrice]);

	useEffect(() => {
		if (costPrice >= 0 && sellingPrice > 0) {
			calculateProfit();
		}
	}, [calculateProfit, costPrice, sellingPrice]);

	const renderProfit = () => {
		if (profitPercentage > 0) {
			return `Profit: ${Math.round(Math.abs(profitPercentage))}%`;
		}
		if (profitPercentage === 0) {
			return 'Loss: 0% ';
		}
		return `Loss: ${Math.round(Math.abs(profitPercentage))}%`;
	};
	function Head() {
		return (
			<div className={styles.title_container}>
				<IcAFormsAndCertificates width={25} height={25} />
				<div className="title">Add Product</div>
			</div>
		);
	}
	const fields = getControls();
	return (
		<>
			<div className={styles.container}>
				{getproductLoading && 'Loading...'}
				<Modal.Header title={Head()} />
				<Modal.Body>
					<div className={styles.header}>
						<div className={styles.summary_tab}>
							<div className={styles.section}>
								<div className={styles.heading}>Category</div>
								<div className={styles.subheading}>{categoryDisplayName}</div>
							</div>
							<div className={styles.icn}>
								<IcMArrowRight />
							</div>
							<div className={styles.section}>
								<div className={styles.heading}>Sub-Category</div>
								<div className={styles.subheading}>{subCategoryDisplayName}</div>
							</div>
						</div>
						<div className={`${profitPercentage > 0 ? styles.green : styles.red} profit`}>
							{renderProfit()}
						</div>
					</div>
					<form>
						<div className={styles.row}>
							{fields.map((field) => {
								const Controller = getField(field.type);

								return (
									<div className={`${styles} ${styles.col}`}>
										<div className={styles.label}>{field.label}</div>
										<Controller {...field} control={control} />
										{errors[field.name]?.type === 'required'
										|| errors[field.name]?.type === 'minLength'
										|| errors[field.name]?.type === 'maxLength' ? (
											<div className={styles.text}>
												{errors[field.name]?.message || errors[field.name]?.type}
												*
											</div>
											) : null}
									</div>
								);
							})}
						</div>
					</form>
				</Modal.Body>
			</div>
			<Modal.Footer>
				<Button
					className="md"
					onClick={handleSubmit(onSubmit)}
					disabled={addProductLoading}
				>
					Add To Catalogue
				</Button>
			</Modal.Footer>
		</>
	);
}

export default ModalDetails;
