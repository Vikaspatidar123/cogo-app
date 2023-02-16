import { Button, toast } from '@cogoport/components';

// import toast from '@cogoport/front/components/admin/Toast';
import { IcMArrowRight } from '@cogoport/icons-react';
import { useEffect, useState } from 'react';

import getControls from '../../configurations/pricingcontrols';
import useEdit from '../../hooks/useEdit';

import {
	FormContainer,
	FormRow,
	FormCol,
	FormLabel,
	BtnContainer,
	SummaryTab,
	ErrTxt,
	Header,
} from './style';

import useForm from '@/packages/forms';
import getField from '@/packages/forms/Controlled/index';

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
	setActiveTab,
}) {
	const control = getControls();
	const {
		fields,
		handleSubmit,
		watch,
		setValue,
		formState: { errors },
	} = useForm(control);

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
	const { categoryDisplayName = '', subCategoryDisplayName = '' } =		productDetailsfromAPi || {};
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
	}, []);

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
			toast.error(error?.description?.message, {
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
		<div>
			<form>
				<Header>
					<SummaryTab>
						<div className="category">
							<div className="heading">Category</div>
							{!isEdit ? (
								<div className="subheading">{categoryDisplayName}</div>
							) : (
								<div className="subheading">{categoryName}</div>
							)}
						</div>
						<div className="icn">
							<IcMArrowRight />
						</div>
						<div className="subCategory">
							<div className="heading">Sub-Category</div>
							{!isEdit ? (
								<div className="subheading">{subCategoryDisplayName}</div>
							) : (
								<div className="subheading">{subCategoryName}</div>
							)}
						</div>
					</SummaryTab>
					<div className={`${profitpercentage > 0 ? 'green' : 'red'} profit`}>
						{renderProfit()}
					</div>
				</Header>

				<FormContainer>
					<FormRow>
						<FormCol className="hscode">
							<FormLabel>{fields.hsCode.label}</FormLabel>
							<NumberController {...fields.hsCode} />
						</FormCol>
						<FormCol>
							<div className="labelRow">
								<FormLabel>{fields.name.label}</FormLabel>
								{errors.name && (
									<ErrTxt>
										{errors.name.message}
										*
									</ErrTxt>
								)}
							</div>

							<TextController {...fields.name} className={`${errors?.name && 'error'}`} />
						</FormCol>
					</FormRow>
					<FormRow className="mid">
						<FormCol>
							<div className="labelRow">
								<FormLabel>{fields.costPrice.label}</FormLabel>
								{errors.costPrice && (
									<ErrTxt>
										{errors.costPrice.message}
										*
									</ErrTxt>
								)}
							</div>

							<NumberController
								{...fields.costPrice}
								className={`${errors.costPrice && 'error'}`}
							/>
						</FormCol>
						<FormCol>
							<div className="labelRow">
								<FormLabel>{fields.sellingPrice.label}</FormLabel>
								{errors.sellingPrice && (
									<ErrTxt>
										{errors.sellingPrice.message}
										*
									</ErrTxt>
								)}
							</div>

							<NumberController
								{...fields.sellingPrice}
								className={`${errors.sellingPrice && 'error'}`}
							/>
						</FormCol>
					</FormRow>
					<FormRow>
						<FormCol className="desc">
							<FormLabel>{fields?.description.label}</FormLabel>
							<TextAreaController {...fields.description} />
						</FormCol>
						<FormCol>
							<FormLabel>Product Image</FormLabel>
							<FileUploaderController {...fields.productImg} />
						</FormCol>
					</FormRow>
				</FormContainer>
				<BtnContainer>
					<Button
						className={`submitBtn ${(addProductLoading || editLoading) && 'disableBtn'}`}
						disabled={addProductLoading || editLoading}
						onClick={handleSubmit(onSubmit, onError)}
					>
						{!isEdit ? 'Submit' : 'Save'}
					</Button>
				</BtnContainer>
			</form>
		</div>
	);
}

export default Pricing;
