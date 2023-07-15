/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Toast, cl } from '@cogoport/components';
import { IcMArrowRight } from '@cogoport/icons-react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import getControls from '../../configurations/pricingcontrols';
import useEdit from '../../hooks/useEdit';

import styles from './styles.module.css';

import { useForm } from '@/packages/forms';
import getField from '@/packages/forms/Controlled/index';

const NumberController = getField('number');
const TextController = getField('text');
const TextAreaController = getField('textarea');
const FileUploaderController = getField('file');

const THRESHOLD_VALUE = 0;

function Pricing({
	productDetailsfromAPi,
	addProductLoading,
	prefiledValues,
	isEdit,
	refetchProduct,
	setShowProduct,
	setHSCode,
	productClassificationId,
	productId,
	countryName,
	pdId,
	subCategoryCount,
	card = false,
	setActiveTab = () => {},
}) {
	const { t } = useTranslation(['common', 'productCatalogue']);
	const controls = getControls({ t });
	const {
		handleSubmit,
		watch,
		setValue,
		formState: { errors },
		control,
	} = useForm();

	const {
		data, editLoading, refetchPutEdit, addProduct,
	} = useEdit({
		setShowProduct,
		refetchProduct,
		setHSCode,
		productClassificationId,
		card,
		productId,
		setValue,
		isEdit,
		subCategoryCount,
		setActiveTab,
	});
	const { categoryDisplayName = '', subCategoryDisplayName = '' } = productDetailsfromAPi || {};
	const { hscode = '' } = prefiledValues || {};

	const [profitpercentage, setProfitPercentage] = useState(0);
	const { categoryName = '', subCategoryName = '' } = data || {};

	const sp = watch('sellingPrice') || 0;
	const cp = watch('costPrice') || sp;

	useEffect(() => {
		if (cp >= 0 && sp > 0) {
			const profit = ((+sp - +cp) / +cp) * 100;
			setProfitPercentage(profit);
		}
	}, [sp, cp]);

	useEffect(() => {
		if (!isEdit) setValue('hsCode', hscode);
	}, [hscode]);

	const onSubmit = (values) => {
		const item = { prefiledValues, pricingDetails: values, logoUrl: values?.productImg };
		if (isEdit) {
			refetchPutEdit({ values, proId: productId });
		} else {
			addProduct({ item, countryName, pdId });
		}
	};

	const onError = (error) => {
		if (error?.description) {
			Toast.error(error?.description?.message, {
				autoClose : 1000,
				style     : { color: 'white' },
			});
		}
	};

	const renderProfit = () => {
		if (profitpercentage > THRESHOLD_VALUE) {
			return `${t('productCatalogue:product_catalogue_add_product_modal_price_text_1')} 
			${Math.round(Math.abs(profitpercentage))}%`;
		}
		if (profitpercentage === THRESHOLD_VALUE) {
			return `${t('productCatalogue:product_catalogue_add_product_modal_price_text_2')} 0% `;
		}
		return `${t('productCatalogue:product_catalogue_add_product_modal_price_text_2')}
		 ${Math.round(Math.abs(profitpercentage))}%`;
	};

	return (
		<div className={styles.container}>
			<form>
				<div className={styles.header}>
					<div className={styles.summary_tab}>
						<div className={styles.category}>
							<div className={styles.heading}>
								{t('productCatalogue:product_catalogue_add_product_modal_price_text_3')}
							</div>
							{!isEdit ? (
								<div className={styles.sub_heading}>{categoryDisplayName}</div>
							) : (
								<div className={styles.sub_heading}>{categoryName}</div>
							)}
						</div>
						<div className={styles.icn}>
							<IcMArrowRight />
						</div>
						<div className={styles.sub_category}>
							<div className={styles.heading}>
								{t('productCatalogue:product_catalogue_add_product_modal_price_text_4')}
							</div>
							{!isEdit ? (
								<div className={styles.sub_heading}>{subCategoryDisplayName}</div>
							) : (
								<div className={styles.sub_heading}>{subCategoryName}</div>
							)}
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
							<NumberController {...controls[0]} control={control} value={hscode} />
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
								className={`${errors?.name && styles.error}`}
								control={control}
							/>
						</div>
					</div>
					<div className={`${styles.form_row}`}>
						<div className={styles.form_col}>
							<div className={styles.label_row}>
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
								className={`${errors.costPrice && styles.error}`}
								control={control}
							/>
						</div>
						<div className={styles.form_col}>
							<div className={styles.label_row}>
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
								className={`${errors.sellingPrice && styles.error}`}
							/>
						</div>
					</div>
					<div className={styles.form_row}>
						<div className={styles.desc}>
							<div className={styles.form_label}>{controls[4]?.label}</div>
							<TextAreaController {...controls[4]} control={control} />
						</div>
						<div className={styles.form_col}>
							<div className={styles.form_label}>
								{t('productCatalogue:product_catalogue_add_product_modal_price_text_5')}
							</div>
							<FileUploaderController {...controls[5]} control={control} />
						</div>
					</div>
				</div>
				<div className={styles.btn_container}>
					<Button
						className={cl`${styles.submit_btn} 
						${((addProductLoading || editLoading) && styles.disable_btn)}`}
						disabled={addProductLoading || editLoading}
						onClick={handleSubmit(onSubmit, onError)}
					>
						{!isEdit
							? t('productCatalogue:product_catalogue_add_prodyuct_modal_submit_button_label')
							: t('productCatalogue:product_catalogue_add_prodyuct_modal_save_button_label')}
					</Button>
				</div>
			</form>
		</div>
	);
}

export default Pricing;
