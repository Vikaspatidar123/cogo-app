import { Button, Toast, cl } from '@cogoport/components';
import { useState } from 'react';

import ProgressBar from '../ProgressBar';

import { controls } from './controls';
import styles from './styles.module.css';

import { useForm } from '@/packages/forms';
import getField from '@/packages/forms/Controlled';
import { useRequest } from '@/packages/request';
import { useSelector } from '@/packages/store';
import { APP_EVENT, trackEvent } from '@/ui/commons/constants/analytics';
import showErrorsInToast from '@/ui/commons/utils/showErrorsInToast';

function Form({
	trackAnalytics = false,
	agent_id,
	onFinalSubmit,
	...rest
}) {
	const { country_code, preferred_languages, country_id } = rest || {};
	const [isOpen, setIsOpen] = useState(false);
	const newControls = controls({ country_code, isOpen, setIsOpen, rest });
	const {
		control,
		formState: { errors },
		handleSubmit,
	} = useForm();

	const [show, setShow] = useState(false);
	const [mobile, setMobile] = useState({});
	const [{ loading }, otpVerifyAPI] = useRequest(
		{
			url    : '/verify_user_mobile',
			method : 'post',
		},
		{ manual: true },
	);
	const [formValue, setFormValue] = useState(null);
	const { organization } = useSelector((state) => state?.profile);

	const onSubmit = async (values) => {
		setMobile({
			mobile_number       : values?.mobile?.mobile_number,
			mobile_country_code : values?.mobile?.mobile_country_code,
		});
		setFormValue(values);
		try {
			trackEvent(APP_EVENT.kyc_requested_verfication, {
				company_name : organization.business_name,
				company_type : organization.account_type,
			});

			const res = await otpVerifyAPI({
				data: {
					id                  : agent_id,
					mobile_number       : values?.mobile?.mobile_number,
					mobile_country_code : values?.mobile?.mobile_country_code,
				},
			});

			if (!res.hasError) {
				setShow(true);
				Toast.success('OTP sent');
			} else {
				showErrorsInToast(res?.messages);
			}
		} catch (err) {
			showErrorsInToast(err?.data);
		}
	};

	return (
		<div className={cl`${styles.main} ${show ? styles.otp : ''}`}>
			{show ? (
				<ProgressBar
					formValues={formValue}
					id={agent_id}
					mobileNumber={mobile?.mobile_number}
					mobileCountryCode={mobile?.mobile_country_code}
					preferredLanguages={preferred_languages}
					countryId={country_id}
					onFinalSubmit={onFinalSubmit}
					trackAnalytics={trackAnalytics}
				/>
			) : (
				<form style={{ marginLeft: '-8px' }}>
					<div className={styles.form_wrapper}>
						{newControls.map((item) => {
							const Element = getField(item.type);
							return (
								<div key={item.name}>
									<div className={styles.label}>{item.label}</div>
									<Element {...item} control={control} />
									<div className={styles.error}>
										{errors?.[item.name]?.message}
									</div>
								</div>
							);
						})}
					</div>
					<div className={styles.wrapper_container}>
						<div className={styles.wrapper}>
							<text>
								We attach great importance to protecting your private data, which
								is only used to verify your business and complete transactions
							</text>
						</div>
						<Button disabled={loading} size="md" type="button" onClick={handleSubmit(onSubmit)}>
							Avail your free Searches
						</Button>
					</div>
				</form>
			)}
		</div>
	);
}

export default Form;
