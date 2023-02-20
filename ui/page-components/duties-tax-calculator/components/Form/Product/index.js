import { IcMArrowNext, IcMArrowBack } from '@cogoport/icons-react';
import { useState, useEffect } from 'react';

import getField from '../../../../../../packages/forms/Controlled';
// import HsCode from '../../../../hs-code-modal/component';
// import ProductCatalogue from '../../../../product-catalogue-modal';
import Button from '../../../common/Button';
import { ProductCartIcon } from '../../../configuration/icon-configuration';
import useCurrencyConversion from '../../../hook/useCurrencyConversion';
import useVerifyHscode from '../../../hook/useVerifyHscode';
import productFn from '../../../utils/productFn';
import ValidateHsModal from '../../ValidateHsModal';
// import {
// 	Title, Col, Label, BtnContainer, ErrorTxt,
// } from '../styles.module.css';

import style from '../styles.module.css';

import HyperLink from './HyperLine';
import ProductBox from './ProductBox';
// import { Container, TitleContainer } from './style';
import styles from './styles.module.css';

function Product({
	fields,
	error,
	handleSubmit,
	setStepper,
	setFormStepper,
	prevHandler,
	setFormData,
	setValue,
	watch,
	portDetails = {},
	prevCurr,
	setPrevCurr,
	isMobile = false,
	isQuotaLeft = false,
	prevHs,
	setPrevHs,
	productNewControls,
}) {
	const [showCatalogue, setShowCatalogue] = useState(false);
	const [showHsCodeModal, setShowHsCodeModal] = useState(false);
	const [showValidate, setShowValidate] = useState(false);
	const [selectedData, setSelectedData] = useState();

	const NumberSelector = getField('number');
	const CurrencySelector = getField('select');

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
	} =		productFn({
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
					<div>Product Details</div>
				</div>
				<div className={`${style.col} ${styles.currency}`}>
					<div className={style.label}>{fields?.currency?.label}</div>
					<CurrencySelector {...fields[4]} control={productNewControls} />
					{error?.currency && (
						<div className={style.error_txt}>
							*
							{error?.currency?.type}
						</div>
					)}
				</div>
			</div>
			<form>
				<div className={style.col}>
					<div className={style.label}>{fields[1]?.label}</div>
					<NumberSelector {...fields[1]} control={productNewControls} />
					{error?.hsCode && (
						<div className={style.error_txt}>
							*
							{error?.hsCode?.message || error?.hsCode?.type}
						</div>
					)}
				</div>
				<HyperLink
					setShowCatalogue={setShowCatalogue}
					setShowHsCodeModal={setShowHsCodeModal}
				/>
				<div className={style.col}>
					<div className={style.label}>{fields?.consignmentValue?.label}</div>
					<NumberSelector {...fields[2]} control={productNewControls} />
					{error?.consignmentValue && (
						<div className={style.error_txt}>
							*
							{error?.consignmentValue?.message || error?.consignmentValue?.type}
						</div>
					)}
				</div>
				<div className={style.col}>
					<div className={style.label}>{fields?.quantity?.label}</div>
					<NumberSelector {...fields[3]} control={productNewControls} />
					{error?.quantity && (
						<div className={style.error_txt}>
							*
							{error?.quantity?.message || error?.quantity?.type}
						</div>
					)}
				</div>
				<div className={style.btn_container}>
					<Button size="md" isPrev onClick={prevHandler}>
						<IcMArrowBack width={16} height={16} />
					</Button>
					<Button
						size="md"
						type="button"
						onClick={handleSubmit(submitHandler, errorHandler)}
						loading={verifySixDigitLoading}
					>
						Continue
						{' '}
						<IcMArrowNext />
					</Button>
				</div>
			</form>
			<ProductBox watch={watch} isMobile={isMobile} />
			{/* {showCatalogue && (
				<ProductCatalogue
					showCatalogue={showCatalogue}
					setShowCatalogue={setShowCatalogue}
					setSelectedData={setSelectedData}
					isMobile={isMobile}
				/>
			)}
			{showHsCodeModal && (
				<HsCode
					showHsCodeModal={showHsCodeModal}
					setShowHsCodeModal={setShowHsCodeModal}
					setSelectedData={setSelectedData}
					isMobile={isMobile}
				/>
			)} */}
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
					isMobile={isMobile}
				/>
			)}
		</div>
	);
}

export default Product;
