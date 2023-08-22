import { Modal, Button } from '@cogoport/components';
import { IcMArrowNext, IcMFtick, IcMCross } from '@cogoport/icons-react';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import useInviteUserOnSpotSearch from '../hooks/useInviteUserOnSpotSearch';

import styles from './styles.module.css';

import countryCodes from '@/.data-store/constants/countries.json';
import { InputController, SelectController } from '@/packages/forms';
import { Image } from '@/packages/next';
import ExternalLink from '@/ui/commons/components/ExternalLink';
import { useGetUserLocationContent } from '@/ui/commons/components/UserLocationContentContext';
import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';

const terms_url = 'https://www.cogoport.com/en-IN/terms-and-conditions';
const policy_url = 'https://www.cogoport.com/en-IN/privacy-policy';

function PopupModal({
	show, onClose, searchIds, defaultValue = '+91',
}) {
	const router = useRouter();
	const [status, setStatus] = useState(false);

	const methods = useForm();
	const { register, handleSubmit, formState: { errors }, reset } = methods;

	const {
		spotSearch_popupModal_img1,
	} = useGetUserLocationContent();

	const countriesOptions = countryCodes.map((item) => ({
		label : item?.mobile_country_code,
		value : item?.mobile_country_code,
	}));

	const {
		inviteUser = () => { },
		loading = false,
	} = useInviteUserOnSpotSearch({ reset, searchIds, setStatus });

	const onSubmit = (form) => {
		if (!loading) {
			inviteUser(form);
		}
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
													placeholder="Enter your name"
													className={styles.controller_input}
													{...register('full_name', { required: true })}
												/>
												{errors.full_name && errors.full_name.type === 'required'
													&& (
														<span className={styles.errors}>
															Please Enter Name
														</span>
													)}
											</div>
											<div className={styles.controller}>
												<div className={styles.controller_label}>
													Email
													<span style={{ color: '#ee3425' }}>*</span>
												</div>
												<InputController
													placeholder="Enter your Email id"
													className={styles.controller_input}
													{...register('email', {
														required : true,
														pattern  : {
															value   : GLOBAL_CONSTANTS.patterns.EMAIL,
															message : 'email',
														},
													})}
												/>
												{errors.email && errors.email.type === 'required' && (
													<span
														className={styles.errors}
													>

														Please Enter Email

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
															placeholder="Enter your number"
															name="whatsapp_number"
															id="number"
															{...register('mobile_number', { required: true })}
														/>
													</div>
												</div>
												{errors.mobile_number && errors.mobile_number.type === 'required'
													&& (
														<span className={styles.errors}>
															Please Enter Number
														</span>
													)}

											</div>
											<p className={styles.terms_and_conditions}>
												By clicking on submit, you are accepting the
												{' '}
												<span
													role="presentation"
													onClick={() => {
														router.push(terms_url);
													}}
												>

													Terms of use

												</span>
												{' '}
												&
												{' '}
												<span
													role="presentation"
													onClick={() => router.push(policy_url)}
												>

													Privacy Policy.

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
								<ExternalLink
									className={styles.link_to}
									scope="app"
									label={(
										<>
											<div className={styles.left_text}>
												<span>Shippers</span>
												<span>
													I'm looking to move my goods
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
												<span>Carriers / Partners</span>
												<span>
													I'm looking for loads to haul
												</span>
											</div>
											<IcMArrowNext fill="#EE3425" className={styles.arrow_right_icon} />

										</>
									)}
									page="signup"
									section="rate_discovery"
								/>

								<Image
									src={spotSearch_popupModal_img1}
									width={100}
									height={100}
									className={styles.right_container_image}
								/>
							</div>
						)}
					</div>
				</div>
			</Modal>
		</div>
	);
}

export default PopupModal;
