/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Toast } from '@cogoport/components';
import { IcMArrowRight } from '@cogoport/icons-react';
import { useEffect, useState } from 'react';

import getControls from '../../../configuration/pricingcontrols';
// import useEdit from '../../hooks/useEdit';

import styles from './styles.module.css';

import { useForm } from '@/packages/forms';
import getField from '@/packages/forms/Controlled/index';

function Pricing({
	setHSCode,
	AddProductHandler,
	addProductLoading,
	loading,
	productDetailsfromAPi,
	prefiledValues,
}) {
	const { categoryDisplayName = '', subCategoryDisplayName = '' } =		productDetailsfromAPi || {};
	const [profitpercentage, setProfitPercentage] = useState(0);

	const { hsCode = undefined } = prefiledValues || {};
	console.log(hsCode, 'hsCode', prefiledValues);
	const controls = getControls();
	const {
		handleSubmit,
		watch,
		setValue,
		formState: { errors },
		control,
	} = useForm();

	const sp = watch('sellingPrice') || 0;
	const cp = watch('costPrice') || sp;

	useEffect(() => {
		if (cp >= 0 && sp > 0) {
			const profit = ((+sp - +cp) / +cp) * 100;
			setProfitPercentage(profit);
		}
	}, [sp, cp]);

	useEffect(() => {
		if (hsCode)setValue('hsCode', hsCode);
	}, [hsCode]);

	const onSubmit = (values) => {
		const allData = {
			prefiledValues,
			pricingDetails : values,
			logoUrl        : values?.productImg,
		};
		AddProductHandler(allData);
	};

	const onError = (error) => {
		if (error?.description) {
			Toast.error(error?.description?.message, {
				autoClose : 1000,
				style     : { color: 'white' },
			});
		}
	};

	const NumberController = getField('number');
	const TextController = getField('text');
	const TextAreaController = getField('textarea');
	const FileUploaderController = getField('file');

	const renderProfit = () => {
		if (profitpercentage > 0) {
			return `Profit: ${Math.round(Math.abs(profitpercentage))}%`;
		}
		if (profitpercentage === 0) {
			return 'Loss: 0% ';
		}
		return `Loss: ${Math.round(Math.abs(profitpercentage))}%`;
	};

	return (
		<div className={styles.container}>
			<form>
				<div className={styles.header}>
					<div className={styles.summary_tab}>
						<div className="category">
							<div className="heading">Category</div>
							<div className="subheading">{categoryDisplayName}</div>
						</div>
						<div className="icn">
							<IcMArrowRight />
						</div>
						<div className="subCategory">
							<div className="heading">Sub-Category</div>
							<div className="subheading">{subCategoryDisplayName}</div>
						</div>
					</div>
					<div className={`${profitpercentage > 0 ? 'green' : 'red'} profit`}>
						{renderProfit()}
					</div>
				</div>

				<div className={styles.form_container}>
					<div className={styles.form_row}>
						<div className={`${styles.form_col} ${styles.hscode}`}>
							<div className={styles.form_label}>{controls[0].label}</div>
							<NumberController
								{...controls[0]}
								control={control}
								value={hsCode}
							/>
						</div>
						<div className={styles.form_col}>
							<div className={`${styles.form_col}${styles.labelRow}`}>
								<div className={styles.form_label}>{controls[3].label}</div>
								{errors.name && (
									<div className={styles.error_text}>
										{errors.name.message}
										*
									</div>
								)}
							</div>

							<TextController
								{...controls[3]}
								className={`${errors?.name && 'error'}`}
								control={control}
							/>
						</div>
					</div>
					<div className={`${styles.form_row}`}>
						<div className={styles.form_col}>
							<div className="labelRow">
								<div className={styles.form_label}>{controls[2].label}</div>
								{errors.costPrice && (
									<div className={styles.error_text}>
										{errors.costPrice.message}
										*
									</div>
								)}
							</div>

							<NumberController
								{...controls[2]}
								className={`${errors.costPrice && 'error'}`}
								control={control}
							/>
						</div>
						<div className={styles.form_col}>
							<div className="labelRow">
								<div className={styles.form_label}>{controls[1].label}</div>
								{errors.sellingPrice && (
									<div className={styles.error_text}>
										{errors.sellingPrice.message}
										*
									</div>
								)}
							</div>

							<NumberController
								{...controls[1]}
								control={control}
								className={`${errors.sellingPrice && 'error'}`}
							/>
						</div>
					</div>
					<div className={styles.form_row}>
						<div className="desc">
							<div className={styles.form_label}>{controls[4]?.label}</div>
							<TextAreaController {...controls[4]} control={control} />
						</div>
						<div className={styles.form_col}>
							<div className={styles.form_label}>Product Image</div>
							<FileUploaderController {...controls[5]} control={control} />
						</div>
					</div>
				</div>
				<div className={styles.btn_container}>
					<Button
						disabled={addProductLoading}
						onClick={handleSubmit(onSubmit, onError)}
						loading={addProductLoading}
					>
						Submit
					</Button>
				</div>
			</form>
		</div>
	);
}

export default Pricing;
