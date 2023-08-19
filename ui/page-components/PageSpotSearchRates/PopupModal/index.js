import { Modal, Button } from '@cogoport/components';
import { IcMFtick, IcMCross } from '@cogoport/icons-react';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import styles from './styles.module.css';

import { InputController, SelectController } from '@/packages/forms';
import { Image } from '@/packages/next';
import { useGetUserLocationContent } from '@/ui/commons/components/UserLocationContentContext';
// import ExternalLink from '@/ui/components/ExternalLink';
// import { EMAIL_PATTERN } from '@/ui/constants';
// import useInviteUserOnSpotSearch from '@/ui/hooks/useInviteUserOnSpotSearch';

function PopupModal({
	show, onClose, searchIds, countriesOptions, defaultValue = '+91',
}) {
	const router = useRouter();
	const { locale } = router;

	const [status, setStatus] = useState(false);

	const methods = useForm();
	const { register, handleSubmit, formState: { errors }, reset } = methods;

	const {
		spotSearch_popupModal_img1,
	} = useGetUserLocationContent();

	// const {
	// 	inviteUser = () => { },
	// 	loading = false,
	// } = useInviteUserOnSpotSearch({ reset, searchIds, setStatus });

	const onSubmit = (form) => {
		// if (!loading) {
		// 	inviteUser(form);
		// }
	};

	return (
		<div>
			<Modal size="xl" show={show} onClose={onClose} className={styles.modal}>
				<IcMCross onClick={onClose} height={24} width={24} className={styles.cross_btn} />
				<div className={styles.email} style={status ? { padding: 0 } : {}}>
					<div className={styles.register_heading_container}>
						{!status && (
							<p className={styles.register_heading}>
								<span>Enter Details</span>
								{' '}
								Receive Quotes
							</p>
						)}
					</div>
					<div className={styles.main}>
						<div className={styles.left_container}>
							<div className={styles.container}>
								{status ? (
									<div className={styles.success_messege}>
										<IcMFtick color="#36BB22" height={100} width={100} />
										<span>Shortly Receive</span>
									</div>
								) : (
									<FormProvider {...methods}>
										<form className={styles.form_container} onSubmit={handleSubmit(onSubmit)}>
											<div className={styles.controller}>
												<div className={styles.controller_label}>
													Name
													<span style={{ color: '#ee3425' }}>*</span>
												</div>
												<InputController
													placeholder=""
													className={styles.controller_input}
													{...register('full_name', { required: true })}
												/>
												{errors.full_name && errors.full_name.type === 'required'
													&& (
														<span className={styles.errors}>
															error
														</span>
													)}
											</div>
											<div className={styles.controller}>
												<div className={styles.controller_label}>
													Email
													<span style={{ color: '#ee3425' }}>*</span>
												</div>
												<InputController
													placeholder=""
													className={styles.controller_input}
													{...register('email', {
														required: true,
														// pattern  : {
														// 	value   : EMAIL_PATTERN,
														// 	message : t('email_error_msg'),
														// },
													})}
												/>
												{errors.email && errors.email.type === 'required' && (
													<span
														className={styles.errors}
													>

														error

													</span>
												)}
												{errors.email && errors.email.type === 'pattern' && (
													<span
														className={styles.errors}
													>
														{errors.email.message}
													</span>
												)}
											</div>
											<div className={styles.controller}>

												<div className={styles.controller_label}>
													Mobile Number
													<span style={{ color: '#ee3425' }}>*</span>
												</div>
												<div className={styles.number_container}>
													<div>

														<SelectController
															className={styles.select}
															options={countriesOptions}
															name="country_code"
															id="country_code"
															placeholder="country code"
															value={defaultValue}
														/>
													</div>

													<div className={styles.input_container}>
														<InputController
															className={styles.input}
															type="number"
															placeholder=""
															name="whatsapp_number"
															id="number"
															{...register('mobile_number', { required: true })}
														/>
													</div>
												</div>
												{errors.mobile_number && errors.mobile_number.type === 'required'
													&& (
														<span className={styles.errors}>

															error

														</span>
													)}

											</div>
											<p className={styles.terms_and_conditions}>
												Submit
												<span
													role="presentation"
													onClick={() => router.push('https://www.cogoport.com/en-IN/terms-and-conditions')}
												>

													Terms of use

												</span>
												{' '}
												&
												{' '}
												<span
													role="presentation"
													onClick={() => router.push('https://www.cogoport.com/en-IN/privacy-policy')}
												>

													privacy_policy

												</span>
												.
											</p>
											<Button
												// loading={loading}
												className={styles.submit_btn}
												type="submit"
											>
												Submit
											</Button>
										</form>
									</FormProvider>
								)}

							</div>
						</div>
						{!status && (
							<div className={styles.vertical_line}>
								<div className={styles.vertical_line_part} />
								<span>or</span>
								<div className={styles.vertical_line_part} />
							</div>
						)}
						{!status && (
							<div className={styles.right_container}>
								<p className={styles.heading_2}>Get Access</p>
								<p className={styles.sub_heading_2}>Sign Now</p>
								{/* <ExternalLink
									className={styles.link_to}
									scope="app"
									label={(
										<>
											<div className={styles.left_text}>
												<span>{t('shipper')}</span>
												<span>
													{t('shipper_description')}
												</span>
											</div>
											<IcMArrowNext fill="#EE3425" className={styles.arrow_right_icon} />

										</>
									)}
									page="signup"
									section="rate_discovery"
								/>
								<ExternalLink
									className={styles.link_to}
									scope="partners"
									label={(
										<>
											<div className={styles.left_text}>
												<span>{t('carrier')}</span>
												<span>
													{t('carrier_description')}
												</span>
											</div>
											<IcMArrowNext fill="#EE3425" className={styles.arrow_right_icon} />

										</>
									)}
									page="signup"
									section="rate_discovery"
								/> */}

								<Image
									src={spotSearch_popupModal_img1}
									width={100}
									height={100}
									className={styles.right_container_image}
								/>
							</div>
						)}
						{/* {!status && (
							<div className={styles.right_container}>
								<div
									className={cl`
								${styles.ports}
								${data ? '' : styles.ports_no_data}
							`}
								>
									<div className={styles.port}>
										<IcALocationwhite className={styles.location_icon} />
										<div
											className={styles.port_detail}
										>
											<p
												className={styles.heading}
											>
												{origin_name}
											</p>
											<p className={styles.subheading}>{origin}</p>
										</div>
									</div>
									<div className={styles.arrow_container}>
										<IcMArrowNext className={styles.arrow_icon} />
									</div>
									<div className={styles.port}>
										<IcALocationwhite className={styles.location_icon} />
										<div className={styles.port_detail}>
											<p
												className={styles.heading}
											>
												{destination_name}
											</p>
											<p className={styles.subheading}>{destination}</p>
										</div>
									</div>
								</div>
								{data ? (
									<div className={styles.trade_details}>
										<div className={styles.feature_container}>
											<div className={styles.feature}>
												<div className={styles.email1}>
													<span className={styles.title}>
														{t('containers')}
													</span>
													<strong className={styles.strong}>
														{data?.detail.containers_count}
													</strong>
												</div>
											</div>
											<div className={styles.line} />
											<div className={styles.feature}>
												<div className={styles.email1}>
													<span className={styles.title}>
														{t('type')}
													</span>
													<strong className={styles.strong}>
														{data?.detail?.container_size}
														{' '}
														<span>{data?.detail?.container_type}</span>
													</strong>

												</div>
											</div>
										</div>
										<div className={styles.line} />
										<div className={styles.price_container}>
											<div className={styles.email1}>
												<span className={styles.title}>
													{t('rate')}
												</span>
												<strong className={styles.strong}>
													<span className={styles.currency}>
														{data?.rates[0].freight_price_currency}
													</span>
													{' '}
													<span className={styles.price}>
														{Math.ceil(data?.rates[0].freight_price)}
													</span>

												</strong>
											</div>
										</div>

									</div>
								) : null}
								<div className={styles.right_container_image}>
									<Image
										src={spotSearch_popupModal_img1}
										width={100}
										height={100}
										alt="truck_at_cogoport"
									/>
								</div>
							</div>
						)} */}
					</div>
				</div>
			</Modal>
		</div>
	);
}

export default PopupModal;
