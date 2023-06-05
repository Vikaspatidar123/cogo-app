import { Toast, Tooltip, Button } from '@cogoport/components';
import { IcMArrowBack, IcMArrowNext, IcMBldo } from '@cogoport/icons-react';
import { useEffect, useState } from 'react';

import getControls from '../../../configurations/cargoControls';

import Sanction from './Sanction';
import styles from './styles.module.css';

import { useForm } from '@/packages/forms';
import getField from '@/packages/forms/Controlled';

const useCargoDetails = ({
	formDetails = {},
	setActiveStepper = () => {},
	setFormDetails = () => {},
	sanctionAPIloading = false,
	setCommodityName = () => {},
	activeTab = '',
	isMobile,
	draftResponse = () => {},
	draftLoading = false,
	policyid = '',
	type = '',
	setCountryCode = () => {},
	setCountryDetails = () => {},
	countryDetails = {},
}) => {
	const [descriptionPrefilled, setDescription] = useState();
	const fields = getControls({
		setCommodityName,
		activeTab,
		formDetails,
		setDescription,
		descriptionPrefilled,
		transitType: type,
		setCountryCode,
		setCountryDetails,
	});
	const {
		control,
		handleSubmit,
		watch,
		reset,
		setError,
		formState: { errors },
		setValue,
	} = useForm({
		defaultValues: {
			riskCoverage      : 'ALL_RISK',
			incoterm          : formDetails?.incoterm || 'CIF',
			policyCommodityId : formDetails?.policyCommodityId || '',
			policyCountryId   : formDetails?.policyCountryId || '',
			cargoDescription  : formDetails?.cargoDescription || '',
			packaging         : formDetails?.packaging || '',
			trasitDate        : formDetails?.trasitDate || new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
			locationFrom      : formDetails?.locationFrom || '',
			locationTo        : formDetails?.locationTo || '',
		},
	});
	const [watchCountry, watchCoverageFrom, watchCoverageTo] = watch([
		'policyCountryId',
		'locationFrom',
		'locationTo',
	]);

	const submit = (values) => {
		Object.keys(values).forEach((itm) => {
			if (!values[itm]) {
				setError(itm, { type: 'required', message: 'required' });
			}
		});
		if (!Object.values(values).includes('')) {
			setFormDetails((prev) => ({
				...prev,
				...values,
			}));
			setActiveStepper(() => ({
				1   : true,
				2   : true,
				3   : 'pro',
				4   : 'pro',
				svg : 2,
			}));
		}
	};

	const saveDraft = (values) => {
		setFormDetails((prev) => ({
			...prev,
			...values,
		}));
		const draftPayload = { ...formDetails, ...values };
		draftResponse(draftPayload, policyid);
	};

	const prevButton = () => {
		setActiveStepper(() => ({
			1   : 'pro',
			2   : false,
			3   : false,
			svg : 1,
		}));
	};

	useEffect(() => {
		if (watchCoverageFrom && watchCoverageTo) {
			if (watchCoverageFrom === watchCoverageTo) {
				Toast.error('selected same locations');
			}
		}
	}, [watchCoverageFrom, watchCoverageTo]);

	useEffect(() => {
		setValue(
			'cargoDescription',
			descriptionPrefilled?.cargoDescription || formDetails?.cargoDescription || '',
		);
		setValue(
			'packaging',
			descriptionPrefilled?.packaging || formDetails?.packaging || '',
		);
	}, [descriptionPrefilled, formDetails, setValue]);

	return (
		<div>
			<div className={styles.container}>
				<div className={isMobile ? styles.yellow_line_mobile : styles.yellow_line} />
				<div className={styles.padded_div}>
					<div className={isMobile ? styles.heading_wrapper_mobile : styles.heading_wrapper}>
						<div className={styles.flex_2}>
							<div className={styles.heading}>Cargo Details</div>
						</div>
						<div className={styles.line_wrapper}>
							<div className={styles.line} />
						</div>
					</div>
					<div className={styles.content_wrapper}>
						<form type="submit">
							<div className={styles.row}>
								{fields
									.filter((items, index) => index < 3)
									.map((item) => {
										const Element = getField(item?.type);

										return (
											<div
												className={styles.col}
												key={item.name}
											>
												<div>{item.placeholder}</div>
												<Element
													key={item.name}
													{...item}
													control={control}
												/>
												{errors[item?.name]?.type === 'required'
												|| errors[item?.name]?.type === 'pattern'
												|| errors[item?.name]?.type === 'minLength' ? (
													<div className={styles.error_text}>
														{errors[item?.name]?.message}
													</div>
													) : null}
											</div>
										);
									})}
							</div>
							<div className={styles.padded_div_2}>
								<div className={styles.bordered_div}>
									<div className={isMobile
										? styles.label_mobile : styles.label}
									>
										Additional Required Fields

									</div>
									<div className={styles.row}>
										{fields
											.filter((items, index) => index > 2)
											.map((item) => {
												const Element = getField(item?.type);
												const renderingField = fields.find((ele) => ele.name === item.name);
												return (
													<div
														className={styles.col}
														key={item.name}
													>
														{renderingField.tooltip ? (
															<Tooltip
																content={renderingField.tooltip}
																placement="top"
															>
																<div>
																	<div>{renderingField.placeholder}</div>
																	<Element
																		{...renderingField}
																		control={control}
																	/>
																</div>
															</Tooltip>
														) : (
															<>
																<div>{renderingField.placeholder}</div>
																<Element
																	{...renderingField}
																	control={control}
																/>
															</>
														)}
														{(errors[renderingField.name]?.type === 'required'
															|| errors[renderingField.name]?.type === 'pattern'
															|| errors[renderingField.name]?.type === 'maxLength') && (
																<div className={styles.error_message}>
																	{errors[renderingField.name]?.message}
																</div>
														)}
													</div>
												);
											})}
									</div>
								</div>
							</div>
						</form>
						<div className={isMobile ? styles.wrapper_2_mobile : styles.wrapper_2}>
							<Button onClick={prevButton}>
								<IcMArrowBack width="22px" height="22px" />
							</Button>
							<Button onClick={handleSubmit(saveDraft)} themeType="accent" loading={draftLoading}>
								<div className={styles.align_div}>
									Save as Draft
									<IcMBldo width="22px" height="22px" />
								</div>
							</Button>
							<Button
								onClick={handleSubmit(submit)}
								disabled={
									sanctionAPIloading
									|| countryDetails?.checkSantion === 'BLOCKED'
									|| watchCoverageFrom === watchCoverageTo || !watchCountry
								}
							>
								<div className={styles.align_div}>
									Next Step
									<IcMArrowNext width="22px" height="22px" />
								</div>
							</Button>
						</div>
					</div>
					{countryDetails?.checkSantion && (
						<Sanction
							reset={reset}
							isMobile={isMobile}
							countryDetails={countryDetails}
							setCountryDetails={setCountryDetails}
						/>
					)}
				</div>
			</div>
		</div>
	);
};
export default useCargoDetails;
