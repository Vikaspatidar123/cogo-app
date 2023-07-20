import { Button, Modal } from '@cogoport/components';
import { useTranslation } from 'next-i18next';

import styles from './styles.module.css';
import useMobileNoVerification from './useMobileNoVerification';

import OTPLayout from '@/packages/forms/Business/OTPLayout';
import getField from '@/packages/forms/Controlled';

const OTP_LENGTH = 4;

function MobileVerification({ type = '' }) {
	const { t } = useTranslation(['settings']);

	const {
		controls = [],
		formProps = {},
		errors = {},
		onSubmit = () => {},
		onErrors = () => {},
		showEnterOtpComponent = false,
		otpNumber = '',
		setOtpNumber = () => {},
		verifyMobileNumberAPI = {},
		sendOtpNumber = () => {},
		verifyOtpNumber = () => {},
	} = useMobileNoVerification({ type });

	const { handleSubmit = () => {}, control } = formProps;

	return (
		<div>
			<Modal.Header title={t('settings:heading_mobile_number_verification')} />

			<form>
				<Modal.Body>
					<div>
						{controls.map((item) => {
							const ELEMENT = getField(item.type);
							return (
								<div>
									<div className={styles.lable}>{item.label}</div>
									<ELEMENT {...item} control={control} />
									<div className={styles.errors}>
										{errors[item?.name]?.message}
									</div>
								</div>
							);
						})}
					</div>

					{showEnterOtpComponent ? (
						<div className={styles.otp_container}>
							<OTPLayout
								otpLength={OTP_LENGTH}
								setOtpValue={setOtpNumber}
								loading={false}
								sendOtp={(obj) => sendOtpNumber({ ...obj })}
							/>
						</div>
					) : null}
				</Modal.Body>
				<Modal.Footer>
					{!showEnterOtpComponent ? (
						<Button
							type="submit"
							size="xl"
							disabled={verifyMobileNumberAPI.loading}
							themeType="accent"
							className={styles.button}
							onClick={handleSubmit(onSubmit, onErrors)}
						>
							{t('settings:get_otp_button_label')}
						</Button>
					) : null}

					{showEnterOtpComponent ? (
						<Button
							type="submit"
							onClick={verifyOtpNumber}
							themeType="accent"
							className={styles.button}
							disabled={verifyMobileNumberAPI.loading || otpNumber?.length !== 4}
						>
							{t('settings:submit_button_label')}
						</Button>
					) : null}
				</Modal.Footer>
			</form>
		</div>
	);
}

export default MobileVerification;
