import { Button, cl } from '@cogoport/components';
import { merge } from '@cogoport/utils';
import { useTranslation } from 'next-i18next';
import { useState, useMemo } from 'react';

import getField from '../../../../../packages/forms/Controlled';
import getControls from '../../configuration/inputcontrols';
import useGetStateFromPincode from '../../hooks/useGetStateFromPincode';
import { renderBtn } from '../../utils';

import styles from './styles.module.css';

import { useForm, asyncFieldsLocations, useGetAsyncOptions } from '@/packages/forms';
import { Image } from '@/packages/next';
import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';

function TraderDetails({
	quotaLoading = false,
	setFormDetails = () => {},
	fetchQuotaDetails = () => {},
	serviceRatesLoading = false,
	formDetails = {},
	setCountryDetails = () => {},
	countryDetails = {},
}) {
	const { t } = useTranslation(['traderEligibilityCheck']);
	const countryOptions = useGetAsyncOptions(merge(asyncFieldsLocations(), {
		params: { filters: { type: ['country'] } },
	}));
	const [cityState, setCityState] = useState();
	const controls = getControls({ setCountryDetails, formDetails, countryOptions, t });
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

	const { list } = cityState || {};
	const { region, city } = list?.[0] || {};

	useMemo(() => {
		if (watchPincode === '') {
			setValue('city', '');
			setValue('state', '');
		} else if (city && region?.name) {
			setValue('city', city?.name);
			setValue('state', region?.name);
		}
	}, [city, region?.name, setValue, watchPincode]);

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
				<div>
					<div className={styles.title_div}>
						<Image
							src={GLOBAL_CONSTANTS.image_url.sub_heading_icon}
							alt=""
							className={styles.sub_heading_icon}
							width={30}
							height={30}
						/>
						<div className={styles.title}>
							<div>{t('traderEligibilityCheck:tec_form_title')}</div>
							<div className={cl`${styles.line_wrapper_mobile} ${styles.line_wrapper_web}`}>
								<div className={styles.line} />
							</div>
						</div>
					</div>
					{(controls || [])
						.filter((items, index) => index < 2)
						.map((item) => {
							const Element = getField(item.type);
							return (
								<div
									key={item.name}
									action={errors[item.name]?.message}
									className={styles.element_style}
								>
									<div className={styles.label}>
										{item?.label}
										<div className={styles.mandatory}>{item?.rules?.required && '*'}</div>
									</div>
									<div>
										<Element
											{...item}
											placeholder={item.placeholder}
											style={{ width: '100%' }}
											key={item.name}
											control={control}
										/>
									</div>
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
						})}
					<div className={styles.title2_styles}>
						<div className={styles.title2}>
							{t('traderEligibilityCheck:tec_form_additional_details')}
							{' '}
							<div className={styles.optional}> (optional)</div>
						</div>
						<div className={cl`${styles.line_wrapper_mobile} ${styles.line_wrapper_web}${styles.line2}`}>
							<div className={styles.line} />
						</div>
					</div>
					<div className={styles.additional_style}>
						{(controls || [])
							.filter((items, index) => index > 1)
							.map((item) => {
								const Element = getField(item.type);
								return (
									<div
										key={item.name}
										action={errors[item.name]?.message}
										className={styles.element_style}
										style={{ width: item?.width || '100%' }}
									>
										<div>
											<div className={styles.label}>{item?.label}</div>
											<div>
												<Element
													{...item}
													placeholder={item.placeholder}
													key={item.name}
													control={control}
												/>
											</div>
										</div>
									</div>
								);
							})}
					</div>
				</div>
			</form>
			<div className={styles.button_wrapper}>
				<Button
					className={styles.submit_button}
					size="md"
					themeType="primary"
					onClick={handleSubmit(submit)}
					loading={cityLoading}
					type="button"
				>
					{renderBtn({ serviceRatesLoading, quotaLoading, t })}
				</Button>
			</div>
		</div>
	);
}
export default TraderDetails;
