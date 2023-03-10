/* eslint-disable react-hooks/rules-of-hooks */
import { Toast, Tooltip, Button } from '@cogoport/components';
import { IcMArrowBack, IcMArrowNext, IcMBldo } from '@cogoport/icons-react';
import { useEffect, useState } from 'react';

import getControls from '../../../configurations/cargoControls';

import Sanction from './Sanction';
// import {
// 	Container,
// 	StyledRow,
// 	RedButton,
// 	Wrapper2,
// 	Heading,
// 	Line,
// 	HeadingWrapper,
// 	Flex2,
// 	StyledCol,
// 	LineWrapper,
// 	ContentWrapper,
// 	StyledDiv,
// 	DisplayDiv,
// 	Label,
// 	PreviousButton,
// 	ColoredYellow,
// 	PaddedDiv,
// 	StyledNext,
// 	StyledBack,
// 	BlackButton,
// 	StyledIcon,
// 	AlignDiv,
// } from './style';
import styles from './styles.module.css';

import { InputController, SelectController, useForm } from '@/packages/forms';

const cargoDetails = ({
	formDetails = {},
	setActiveStepper = () => {},
	setFormDetails = () => {},
	sanctionAPIloading = false,
	setCommodityName = () => {},
	setCommodityQuery = () => {},
	commodityQuery = '',
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
		setCommodityQuery,
		commodityQuery,
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
	} = useForm();

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
		if (watchCoverageFrom !== '' && watchCoverageTo !== '') {
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
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [descriptionPrefilled]);

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
									.map((item, index) => {
										const Element = item.type === 'text' ? InputController : SelectController;
										return (
											<div
												className={styles.col}
												key={item.name}
												// action={errors[item.name]?.message}
											>

												<Element
													key={item.name}
													{...fields[index]}
													control={control}
												/>
												<div>
													<span
														className={watch(fields[index]?.name) !== ''
															? styles.display : styles.hidden}
													>
														{fields[index]?.placeholder}
													</span>
												</div>

												{errors[fields[index]?.name]?.type === 'required'
												|| errors[fields[index]?.name]?.type === 'pattern'
												|| errors[fields[index]?.name]?.type === 'minLength' ? (
													<div className={styles.error_text}>
														{errors[fields[index]?.name]?.message}
													</div>
													) : null}
											</div>
										);
									})}
							</div>
							<div className={styles.padded_div}>
								<div className={styles.bordered_div}>
									<div className={isMobile
										? styles.label_mobile : styles.label}
									>
										Additional Required Fields

									</div>
									<div className={styles.row}>
										{fields
											.filter((items, index) => index > 3)
											.map((item, index) => {
												const Element = item.type === 'text'
													? InputController : SelectController;

												return (
													<div
														className={styles.col}
														key={item.name}
														action={errors[fields[index].name]?.message}
													>
														{fields[index].tooltip ? (
															<Tooltip
																content={fields[index].tooltip}
																placement="top-start"
																theme="light-border"
															>
																<div>

																	<Element
																		{...fields[index]}
																		control={control}
																	/>
																	<div>
																		<span
																			className={
																					watch(fields[index]?.name) !== ''
																						? styles.display : styles.hidden
																				}
																		>
																			{fields[index].placeholder}
																		</span>
																	</div>

																</div>
															</Tooltip>
														) : (
															<>
																<Element
																	{...fields[index]}
																	control={control}
																/>
																<div>
																	<span
																		className={
																			watch(fields[index].name) !== ''
																				? styles.display : styles.hidden
																		}
																	>
																		{fields[index].placeholder}
																	</span>
																</div>
															</>
														)}
														{(errors[fields[index].name]?.type === 'required'
															|| errors[fields[index].name]?.type === 'pattern'
															|| errors[fields[index].name]?.type === 'maxLength') && (
																<div className={styles.error_message}>
																	{errors[fields[index].name]?.message}
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
export default cargoDetails;
