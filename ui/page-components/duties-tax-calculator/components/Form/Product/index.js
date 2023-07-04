/* eslint-disable react-hooks/exhaustive-deps */
import { Button } from '@cogoport/components';
import { IcMArrowNext, IcMArrowBack } from '@cogoport/icons-react';
import { useTranslation } from 'next-i18next';
import { useState, useEffect } from 'react';

import getField from '../../../../../../packages/forms/Controlled';
import HsCode from '../../../../hs-code-modal/component';
import ProductCatalogue from '../../../../product-catalogue-modal';
import { productControls } from '../../../configuration/controls';
import { ProductCartIcon } from '../../../configuration/icon-configuration';
import useCurrencyConversion from '../../../hook/useCurrencyConversion';
import useVerifyHscode from '../../../hook/useVerifyHscode';
import productFn from '../../../utils/productFn';
import ValidateHsModal from '../../ValidateHsModal';
import style from '../styles.module.css';

import HyperLink from './HyperLine';
import ProductBox from './ProductBox';
import styles from './styles.module.css';

const NumberSelector = getField('number');
const CurrencySelector = getField('select');

function Product({
	formHook,
	setStepper,
	setFormStepper,
	prevHandler,
	setFormData,
	portDetails = {},
	prevCurr,
	setPrevCurr,
	isQuotaLeft = false,
	prevHs,
	setPrevHs,
}) {
	const { t } = useTranslation(['common', 'dutiesTaxesCalculator']);
	const [showCatalogue, setShowCatalogue] = useState(false);
	const [showHsCodeModal, setShowHsCodeModal] = useState(false);
	const [showValidate, setShowValidate] = useState(false);
	const [selectedData, setSelectedData] = useState();

	const fields = productControls({ t });
	const { control, handleSubmit, watch, setValue, formState: { errors } } = formHook;

	const { exchangeApi } = useCurrencyConversion();

	const { hsCode = '', name = '', description = '' } = selectedData || {};
	const {
		currency: watchCurrency,
		consignmentValue: watchConsignmentValue,
		hsCode: watchHsCode,
	} = watch();

	const { verifySixDigitHs, verifySixDigitLoading } = useVerifyHscode();
	const {
		submitHandler, errorHandler, convertCurrency, validateSubmitHandler,
	} = productFn({
		t,
		setFormData,
		setFormStepper,
		setStepper,
		setValue,
		setPrevCurr,
		exchangeApi,
		watchCurrency,
		watchConsignmentValue,
		name,
		description,
		setShowValidate,
		isQuotaLeft,
		verifySixDigitHs,
		watchHsCode,
	});

	useEffect(() => {
		if (hsCode !== '') {
			setValue('hsCode', hsCode);
		}
		if (name !== '') {
			setValue('productName', name);
		} else if (description !== '') {
			setValue('productName', description);
		}
	}, [JSON.stringify(selectedData)]);

	useEffect(() => {
		if (watchCurrency !== prevCurr && watchConsignmentValue !== '') {
			convertCurrency(prevCurr, watchCurrency);
		}
	}, [watchCurrency]);
	return (
		<div className={styles.container}>
			<div className={styles.title_container}>
				<div className={style.title}>
					<img src={ProductCartIcon} alt="" />
					<div>{t('dutiesTaxesCalculator:form_product_title')}</div>
				</div>
				<div className={`${style.col} ${styles.currency}`}>
					<div className={style.label}>{fields[4]?.label}</div>
					<CurrencySelector {...fields[4]} control={control} />
					{errors?.currency && (
						<div className={style.error_txt}>
							*
							{errors?.currency?.type}
						</div>
					)}
				</div>
			</div>
			<form>
				{(fields || []).map((field, index) => (
					index !== 4 && field?.type !== 'hidden' && (
						<>
							<div className={style.col}>
								<div className={style.label}>{field?.label}</div>
								<NumberSelector {...field} control={control} key={field.name} />
								{errors?.[field?.name] && (
									<div className={style.error_txt}>
										*
										{errors?.[field?.name]?.message || errors?.[field?.name]?.type}
									</div>
								)}
							</div>
							{index === 1 && (
								<HyperLink
									setShowCatalogue={setShowCatalogue}
									setShowHsCodeModal={setShowHsCodeModal}
								/>
							)}
						</>
					)
				))}

				<div className={style.btn_container}>
					<Button size="md" themeType="secondary" onClick={prevHandler}>
						<IcMArrowBack width={16} height={16} />
					</Button>
					<Button
						size="md"
						type="button"
						onClick={handleSubmit(submitHandler, errorHandler)}
						loading={verifySixDigitLoading}
					>
						{t('common:continue')}
						<IcMArrowNext />
					</Button>
				</div>
			</form>
			<ProductBox watch={watch} />
			{showCatalogue && (
				<ProductCatalogue
					showCatalogue={showCatalogue}
					setShowCatalogue={setShowCatalogue}
					setSelectedData={setSelectedData}
				/>
			)}
			{showHsCodeModal && (
				<HsCode
					showHsCodeModal={showHsCodeModal}
					setShowHsCodeModal={setShowHsCodeModal}
					setSelectedData={setSelectedData}
				/>
			)}
			{showValidate && (
				<ValidateHsModal
					show={showValidate}
					setShow={setShowValidate}
					portDetails={portDetails}
					setVerifiedData={setSelectedData}
					hsCode={watchHsCode}
					validateSubmitHandler={validateSubmitHandler}
					handleSubmit={handleSubmit}
					isQuotaLeft={isQuotaLeft}
					prevHs={prevHs}
					setPrevHs={setPrevHs}
				/>
			)}
		</div>
	);
}

export default Product;
