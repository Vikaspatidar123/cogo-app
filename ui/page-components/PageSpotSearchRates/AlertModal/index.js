/* eslint-disable no-param-reassign */
import { Modal, Button } from '@cogoport/components';
import { IcCFtick } from '@cogoport/icons-react';
import React, { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';

import styles from './styles.module.css';

import InputController from '@/packages/components/Controlled/InputController';
import SelectController from '@/packages/components/Controlled/SelectController';
import { useLegacyRequest } from '@/packages/request';
import { useTranslation } from '@/ui/components/LocaleTranslationContext';

function AlertModal({ show, onClose, data, id, countriesOptions }) {
	const { t } = useTranslation(['spot_search']);
	const methods = useForm();
	const { register, handleSubmit, formState: { errors } } = methods;
	const [success, setSucess] = useState(false);

	const [{ loading, error }, trigger] = useLegacyRequest({
		method : 'POST',
		url    : '/public_search/create_public_rates_update_subscription',
	}, { manual: true });

	const onSubmit = async (formdata) => {
		if (!formdata.whatsapp_number) {
			delete formdata.country_code;
			delete formdata.whatsapp_number;
		}
		formdata.spot_search_id = data.detail.id;
		formdata.auth_token = process.env.NEXT_PUBLIC_COGOVERSE_AUTH_TOKEN;
		formdata.utm_source = 'public_page';
		formdata.utm_medium = 'rate_discovery_price_alerts';
		try {
			const res = await trigger({ data: formdata });
			if (res) {
				setSucess(true);
			}
		} catch {
			console.error('error :: ', error);
		}
	};

	return (
		<div className={styles.modal_container}>
			<Modal size="xl" show={show} onClose={onClose} className={styles.modal}>
				<div className={styles.modal_header}>
					<h3>{t('alertmodal_heading')}</h3>
					<p>
						{t('alert_subheading')}
						<br />
						<strong>
							{data ? (
								<p className={styles.title}>
									{id === 'air' ? data.detail.origin_airport.name : data.detail.origin_port.name}
									{' '}
									{t('to')}
									{' '}
									{id === 'air'
										? data.detail.destination_airport.name : data.detail.destination_port.name}
								</p>
							) : null}
						</strong>
					</p>
				</div>
				{success ? (
					<div>

						<div className={styles.success}>

							<div className={styles.icon}><IcCFtick /></div>
							<div>{t('success')}</div>

						</div>
						<div className={styles.modal_footer}>
							<Button className={styles.btn} onClick={onClose}>Close</Button>
						</div>
					</div>
				)
					: (
						<FormProvider {...methods}>
							<form onSubmit={handleSubmit(onSubmit)}>
								<div className={styles.modal_body}>

									<div>
										<div className={styles.label}>
											<label htmlFor="name">
												{t('name')}
												{' '}
												<span className={styles.required}>*</span>
											</label>
										</div>

										<div className={styles.input_container}>

											<InputController
												{...register('name', { required: true })}
												className={styles.input}
												placeholder={t('name_placeholder')}
												name="name"
												id="name"
											/>

											{errors?.name && errors.name?.type === 'required'
												&& <div className={styles.error}>{t('name_error')}</div>}
										</div>
									</div>
									<div>
										<div className={styles.label}>
											<label htmlFor="name">
												{t('email')}
												{' '}
												<span className={styles.required}>*</span>
											</label>
										</div>
										<div className={styles.input_container}>
											<InputController
												{...register('email', {
													required : true,
													pattern  : {
														value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
													},
												})}
												className={styles.input}
												placeholder={t('email_placeholder')}
												type="email"
												name="email"
												id="email"
											/>
											{errors?.email && errors.email?.type === 'required'
												&& <div className={styles.error}>{t('email_error')}</div>}
											{errors?.email && errors.email?.type === 'pattern'
												&& <div className={styles.error}>{t('email_error_msg')}</div>}
										</div>
									</div>
									<div className={styles.numberselect}>
										<div className={styles.label}>
											<label htmlFor="name">{t('mob_number')}</label>
										</div>
										<div className={styles.number_container}>

											<div className={styles.countrycode}>
												<SelectController
													options={countriesOptions}
													name="country_code"
													id="country_code"
													placeholder={t('select_placeholder')}
													value="+91"
												/>

											</div>
											<div style={{ flex: 1 }}>
												<InputController
													className={styles.number_input}
													placeholder={t('mob_number_placeholder')}
													name="whatsapp_number"
													id="whatsapp_number"
													type="number"
												/>
											</div>
										</div>
									</div>

								</div>
								<div className={styles.modal_footer}>
									<Button
										className={styles.btn}
										loading={loading}
										onClick={handleSubmit(onSubmit)}
									>
										{t('subscribe_btn')}

									</Button>
								</div>
							</form>
						</FormProvider>
					)}
			</Modal>
		</div>
	);
}

export default AlertModal;
