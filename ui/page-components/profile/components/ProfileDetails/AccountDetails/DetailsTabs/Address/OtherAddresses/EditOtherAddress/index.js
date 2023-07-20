import { Button, Modal } from '@cogoport/components';
import { useTranslation } from 'next-i18next';

import styles from './styles.module.css';
import useEditOtherAddress from './useEditOtherAddress';

import getField from '@/packages/forms/Controlled';

function EditOtherAddress({
	organizationType = '',
	address_key = '',
	otherAddressObjToUpdate = {},
	organizationOtherAddressesList,
	getOrganizationOtherAddresses,
	handleCloseModal = () => {},
	getAdd,
	mobalType,
}) {
	const { t } = useTranslation(['settings']);

	const { loading, control, showElements, fields, handleSubmit, onCreate } = useEditOtherAddress({
		organizationType,
		address_key,
		getOrganizationOtherAddresses,
		organizationOtherAddressesList,
		otherAddressObjToUpdate,
		handleCloseModal,
		getAdd,
		mobalType,
	});

	return (
		<div>
			<Modal.Header
				title={mobalType
					? `${t('settings:edit_or_add_button_label_2')} ${address_key?.label}`
					: address_key?.label}
			/>
			<Modal.Body>
				<div className={styles.layout}>
					{fields.map((item) => {
						const Controller = getField(item.type);
						const show = showElements[item.name];
						return (
							show ? (
								<div className={styles.field}>
									<div className={styles.lable}>{item.label}</div>
									<Controller {...item} control={control} />
								</div>
							) : null
						);
					})}
				</div>
			</Modal.Body>
			<Modal.Footer>
				<Button
					onClick={handleCloseModal}
					style={{
						marginRight: 16,
					}}
					themeType="secondary"
					disabled={loading}
					type="button"
				>
					{t('settings:edit_or_add_button_label_1')}
				</Button>

				<Button
					disabled={loading}
					onClick={handleSubmit(onCreate)}
					themeType="primary"
					type="submit"
				>
					{mobalType ? t('settings:billing_details_update_label') : t('settings:billing_details_add_label')}
				</Button>
			</Modal.Footer>
		</div>
	);
}

export default EditOtherAddress;
