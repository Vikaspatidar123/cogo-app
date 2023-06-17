import { Button, Modal } from '@cogoport/components';
import { useTranslation } from 'next-i18next';
import { useEffect } from 'react';

import { contactInfoControls } from '../../../configurations/contact-info-controls';
import useCreateBillingAddress from '../../../hooks/useCreateBillingAddress';

import styles from './styles.module.css';

import { useForm } from '@/packages/forms';
import getField from '@/packages/forms/Controlled';
import { useSelector } from '@/packages/store';

function ContactInfo({
	showAddressModal,
	setShowAddressModal = () => { },
	billingAddress = () => { },
}) {
	const { t } = useTranslation(['cogoStore']);
	const { mobile_number, mobile_country_code } = useSelector(
		(state) => state.profile,
	);

	const { addressControls = [] } = contactInfoControls({ t });
	const {
		handleSubmit,
		control,
		formState: { errors },
		reset,
		setValue,
	} = useForm();

	useEffect(() => {
		setValue('mobileNumber', {
			number       : mobile_number,
			country_code : mobile_country_code,
		});
	}, [setValue, mobile_number, mobile_country_code]);

	const { createBillingAddress = () => { }, loading } = useCreateBillingAddress({
		setShowAddressModal,
		reset,
		billingAddress,
	});

	const onSubmit = (val) => {
		createBillingAddress(val);
	};

	const handleClose = () => {
		setShowAddressModal(false);
	};

	return (
		<Modal
			show={showAddressModal}
			size="md"
			closeOnOuterClick={handleClose}
			onClose={handleClose}
			placement="top"
		>
			<Modal.Header title={t('cogoStore:billing_address_modal_title')} />
			<Modal.Body>
				{addressControls.map((field) => {
					const { name, label, type } = field;
					const Element = getField(type);
					return (
						<div className={styles.contact_div} key={name}>
							<div className={styles.label}>{label}</div>
							<Element {...field} control={control} />
							{errors?.[name] && (
								<span className={styles.error}>{errors?.[name]?.message}</span>
							)}
						</div>
					);
				})}
			</Modal.Body>
			<Modal.Footer>
				<div className={styles.button_container}>
					<Button size="sm" themeType="tertiary" onClick={handleClose}>
						{t('cogoStore:cancel_button')}
					</Button>
					<Button
						size="sm"
						themeType="primary"
						onClick={handleSubmit(onSubmit)}
						loading={loading}
						disabled={loading}
					>
						{t('cogoStore:save_address_button')}
					</Button>
				</div>
			</Modal.Footer>
		</Modal>
	);
}
export default ContactInfo;
