/* eslint-disable react-hooks/exhaustive-deps */
import { cl, Button, Toast } from '@cogoport/components';
import { IcMArrowRight } from '@cogoport/icons-react';
import { useEffect, useState } from 'react';

import getControls from '../../../configuration/pricingcontrols';

import styles from './styles.module.css';

import { useForm } from '@/packages/forms';
import getField from '@/packages/forms/Controlled/index';
import { useSelector } from '@/packages/store';

function Pricing({
	addProductHandler,
	addProductLoading,
	productDetailsfromAPi,
	prefiledValues,
}) {
	const currency = useSelector((state) => state.profile.organization?.country?.currency_code);

	const [profitpercentage, setProfitPercentage] = useState(0);
	const { categoryDisplayName = '', subCategoryDisplayName = '' } = productDetailsfromAPi || {};

	const { hsCode = undefined } = prefiledValues || {};
	const controls = getControls({ currency });
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
		addProductHandler(allData);
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
		if (profitpercentage > 0) {
			return `Profit: ${Math.round(Math.abs(profitpercentage))}%`;
		}
		if (profitpercentage === 0) {
			return ' 0% ';
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
					<div className={`${profitpercentage >= 0 ? 'green' : 'red'} profit`}>
						{renderProfit()}
					</div>
				</div>

				<div className={cl`${styles.form_container} ${styles.flex_box}`}>
					{controls.map((field) => {
						const Element = getField(field?.type);
						return (
							<div className={styles.form_col}>
								<p className={styles.form_label}>
									{field?.label}
									{errors?.[field?.name] && (
										<div className={styles.error_text}>
											{errors?.[field?.name]?.type}
											*
										</div>
									)}
								</p>
								<Element
									control={control}
									{...field}
									className={field?.name === 'hsCode' && styles.disabled}
								/>
							</div>
						);
					})}
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
