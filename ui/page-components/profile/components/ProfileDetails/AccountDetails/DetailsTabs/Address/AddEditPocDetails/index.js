import { Button, Modal } from '@cogoport/components';
import { useTranslation } from 'next-i18next';

import styles from './styles.module.css';
import useEditPocDetails from './useEditPocDetails';

import getField from '@/packages/forms/Controlled';

function AddEditPocDetails({
	getOrganizationBillingAddress = () => {},
	getOrganizationOtherAddresses = () => {},
	showPocModal,
	setShowPocModal = () => {},
	pocToUpdate = {},
	address_data = {},
	type = '',
	refetch,
}) {
	const { t } = useTranslation(['settings']);

	const {
		fields = {},
		handleSubmit = () => {},
		onCreate = () => {},
		loading = false,
		control = [],
		register,
	} = useEditPocDetails({
		getOrganizationBillingAddress,
		getOrganizationOtherAddresses,
		type,
		pocToUpdate,
		showPocModal,
		setShowPocModal,
		address_data,
		refetch,
	});

	return (
		<div>
			<Modal.Header title={showPocModal === 'edit' ? t('settings:edit_poc_details_label_1')
				: t('settings:edit_poc_details_label_2')}
			/>

			<Modal.Body>
				<div>
					{fields.map((item) => {
						const ELEMENT = getField(item.type);
						const isMobileNo = item.type === 'mobile_number';
						return (
							<div key={item.name} className={styles.field}>
								<div className={styles.lable}>{item.label}</div>
								<ELEMENT
									{...item}
									control={control}
									mobileSelectRef={isMobileNo ? register(item.name, item.rules).ref : undefined}
								/>
							</div>
						);
					})}
				</div>
				<div className={styles.button_container} />
			</Modal.Body>

			<Modal.Footer>
				<Button
					disabled={loading}
					style={{ marginRight: 8 }}
					onClick={() => setShowPocModal(false)}
					size="sd"
					themeType="secondary"
					type="button"
				>
					{t('settings:edit_or_add_button_label_1')}
				</Button>

				<Button
					disabled={loading}
					onClick={handleSubmit(onCreate)}
					size="sm"
					themeType="primary"
					type="submit"
				>
					{showPocModal === 'edit' ? t('settings:edit_or_add_button_label_2')
						: t('settings:edit_or_add_button_label_3')}
				</Button>
			</Modal.Footer>
		</div>
	);
}

export default AddEditPocDetails;
