import { Toast, Button } from '@cogoport/components';

// import Grid from '@cogoport/front/components/Grid';
import { useState, useMemo } from 'react';

import getField from '../../../../../packages/forms/Controlled';
// import FormItem from '../../../../common/ui/FormItem';
// import SubheadingSvg from '../../assets/subheading.svg';
import { SubHeadingIcon } from '../../configuration/icon-configuration';
import getControls from '../../configuration/inputcontrols';
import useGetStateFromPincode from '../../hooks/useGetStateFromPincode';
import { renderBtn } from '../../utils';

// import {
// 	ButtonWrapper,
// 	SubmitButton,
// 	DIV,
// 	Label,
// 	Title,
// 	Line,
// 	LineWrapper,
// 	Title2,
// } from './styles';

// const { Col, Row } = Grid;

import styles from './styles.module.css';

import { useForm } from '@/packages/forms';

function TraderDetails({
	quotaLoading = false,
	setFormDetails = () => {},
	fetchQuotaDetails = () => {},
	serviceRatesLoading = false,
	formDetails = {},
	setCountryDetails = () => {},
	countryDetails = {},
	isMobile = false,
}) {
	const [cityState, setCityState] = useState();
	const controls = getControls({ setCountryDetails, formDetails });
	const {
		handleSubmit,
		watch,
		formState: { errors },
		setValue,
		control,
	} = useForm();

	const [watchPincode, watchCountry] = watch(['postal_code', 'countryId']);
	const { cityLoading } = useGetStateFromPincode({
		watchPincode,
		watchCountry,
		setCityState,
	});
	console.log('cityLoading', cityLoading);
	const { list } = cityState || {};
	const { region, city } = list?.[0] || {};
	useMemo(() => {
		if (list?.length === 0) {
			Toast.error('Invalid Pincode');
		}
		if (city && region?.name) {
			// city?.name,
			// state :region?.name,

			setValue('city', city);
			setValue('state', region);
		}
	}, [city, region]);

	const submit = (values) => {
		setFormDetails(() => ({
			formValues: values,
			countryDetails,
		}));
		fetchQuotaDetails();
	};

	return (
		<div className={styles.main_div}>
			<form type="submit">
				<div className={styles.row_style}>
					<div className={styles.title_div}>
						<img src={SubHeadingIcon} alt="" className={styles.sub_heading_icon} />
						<div className={styles.title}>
							<div>Trader Details</div>
							<div className={`${isMobile ? styles.line_wrapper_mobile : styles.line_wrapper_web}`}>
								<div className={styles.line} />
							</div>
						</div>
					</div>
					{/* {(controls || [])
						.filter((items, index) => index < 2)
						.map((item) => {
							const Element = getField(item.type);
							return (
								<div key={item.name} action={errors[item.name]?.message}>
									<div className={styles.label}>
										{item?.label}
										<div className={styles.mandatory}>{item?.rules?.required && '*'}</div>
									</div>
									<FormItem label="" className={item.name}>
										<div>
											<Element
												className="element"
												{...item.name}
												placeholder={item.placeholder}
												style={{ width: '100%' }}
												key={item.name}
												control={control}
											/>
										</div>
									</FormItem>
									{errors[item.name]?.type === 'required'
									|| errors[item.name]?.type === 'pattern'
									|| errors[item.name]?.type === 'minLength'
									|| errors[item.name]?.type === 'maxValue' ? (
										<div className={styles.text}>
											{errors[item.name]?.message}
										</div>
										) : null}
								</div>
							);
						})} */}
					<div className={styles.title2_styles}>
						<div className={styles.title2}>
							Additional Details
							{' '}
							<div className={styles.optional}> (optional)</div>
						</div>
						<div className={`${isMobile ? styles.line_wrapper_mobile
							: styles.line_wrapper_web}${styles.line2}`}
						>
							<div className={styles.line} />
						</div>
					</div>
					{/* {(controls || [])
						.filter((items, index) => index > 1)
						.map((item) => {
							const Element = getField(item.type);
							return (
								<div key={item.name} action={errors[item.name]?.message}>
									<div className={styles.label}>{item?.label}</div>
									<FormItem label="" className={item.name}>
										<div>
											<Element
												className="element"
												{...item.name}
												placeholder={item.placeholder}
												style={{ width: '100%' }}
												key={item.name}
												control={control}
											/>
										</div>
									</FormItem>
									{errors[item.name]?.type === 'required'
									|| errors[item.name]?.type === 'pattern'
									|| errors[item.name]?.type === 'minLength'
									|| errors[item.name]?.type === 'maxValue' ? (
										<div className={styles.text}>
											{errors[item.name]?.message}
										</div>
										) : null}
								</div>
							);
						})} */}
				</div>
			</form>
			<div className={styles.button_wrapper}>
				<Button className={styles.submit_button} onClick={handleSubmit(submit)}>
					{renderBtn({ serviceRatesLoading, quotaLoading })}
				</Button>
			</div>
		</div>
	);
}
export default TraderDetails;
