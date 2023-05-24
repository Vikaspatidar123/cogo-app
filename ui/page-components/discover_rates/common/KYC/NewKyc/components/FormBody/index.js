import { Button, cl, Toast } from '@cogoport/components';
import { useState } from 'react';

import ProgressBar from '../../../KycCampaignModal/ProgressBar';
import useSubmitKyc from '../../hooks/useSubmitKyc';
import Heading from '../Heading';

import { controls } from './controls';
import styles from './styles.module.css';

import { useForm } from '@/packages/forms';
import getField from '@/packages/forms/Controlled';
import { useRequest } from '@/packages/request';
import showErrorsInToast from '@/ui/commons/utils/showErrorsInToast';

function Form({ scope, agent_id, onFinalSubmit, ...rest }) {
	const {
		country_code,
		preferred_languages,
		country_id,
		showMobile = true,
		kyc_submitted_from,
	} = rest || {};
	const [isOpen, setIsOpen] = useState(false);
	const newControls = controls(country_code, isOpen, setIsOpen, rest);
	const {
		getValues,
		control,
		formState: { errors },
	} = useForm();
	const [show, setShow] = useState(false);
	const [mobile, setMobile] = useState({});
	const otpVarifyAPI = useRequest('post', false, scope)('/verify_user_mobile');
	const [formValue, setFormValue] = useState(null);
	const { submitKyc } = useSubmitKyc({
		scope,
		id                 : agent_id,
		mobileNumber       : mobile?.mobile_number,
		mobileCountryCode  : mobile?.mobile_country_code,
		preferredLanguages : preferred_languages,
		countryId          : country_id,
		onFinalSubmit,
		kyc_submitted_from,
	});

	const onSubmit = async (e) => {
		if (!showMobile) {
			const values = getValues();
			submitKyc(values);
		} else {
			e.preventDefault();
			const values = getValues();
			if (values) {
				setMobile({
					mobile_number       : values?.mobile?.mobile_number,
					mobile_country_code : values?.mobile?.mobile_country_code,
				});
				setFormValue(values);

				try {
					const res = await otpVarifyAPI.trigger({
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
			}
		}
	};
	const formStyle = { marginLeft: '-8px' };
	const buttonStyle = {
		minWidth     : '142px',
		height       : '44px',
		borderRadius : '10px',
		fontSize     : '14px',
	};
	return (
		<div className={cl`${styles.container} ${show ? styles.otp : ''}`}>
			<Heading
				isOtp={show}
				mobileNumber={mobile?.mobile_number}
				text={rest.text}
			/>
			{show ? (
				<ProgressBar
					formValues={formValue}
					scope={scope}
					id={agent_id}
					mobileNumber={mobile?.mobile_number}
					mobileCountryCode={mobile?.mobile_country_code}
					preferredLanguages={preferred_languages}
					countryId={country_id}
					onFinalSubmit={onFinalSubmit}
					kyc_submitted_from={kyc_submitted_from}
				/>
			) : (
				<form onSubmit={onSubmit} style={formStyle}>
					<div className={styles.form_wrapper}>
						<div className={styles.form_wrapper}>
							{newControls.map((item) => {
								const Element = getField(item.type);
								return (
									<div>
										<div className={styles.label}>{item.label}</div>
										<Element {...item} control={control} />
										<div>{errors?.[item.name]}</div>
									</div>
								);
							})}
						</div>
					</div>
					<div className={styles.button_div}>
						<Button type="submit" style={buttonStyle} className={styles.small}>
							{showMobile ? 'PROCEED' : 'SUBMIT BUSINESS VERIFICATION'}
						</Button>
					</div>
				</form>
			)}
		</div>
	);
}
export default Form;
