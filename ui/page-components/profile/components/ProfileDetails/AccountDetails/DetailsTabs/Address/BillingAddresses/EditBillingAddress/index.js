import { Button, Modal } from '@cogoport/components';
import { useTranslation } from 'next-i18next';

import styles from './styles.module.css';
import useEditBillingAddress from './useEditBillingAddress';

import getField from '@/packages/forms/Controlled';

function EditBillingAddress({
	organizationType = '',
	addressIdxToUpdate,
	getOrganizationBillingAddress = {},
	organizationBillingAddressesList = [],
	handleCloseModal = () => {},
	mobalType,
	getAddress,
}) {
	const { t } = useTranslation(['settings']);

	const {
		control,
		fields,
		showElements,
		handleSubmit,
		onCreate,
		loading,
		formState,
	} = useEditBillingAddress({
		organizationType,
		addressIdxToUpdate,
		getOrganizationBillingAddress,
		organizationBillingAddressesList,
		handleCloseModal,
		mobalType,
		getAddress,
	});
	const { errors = {} } = formState || {};

	return (
		<div>
			<Modal.Header title={`${mobalType ? t('settings:edit_or_add_button_label_2')
				: t('settings:edit_or_add_button_label_3')} ${t('settings:billing_details_placeholder_14')}`}
			/>
			<Modal.Body>
				<div className={styles.layout}>
					{fields.map((item) => {
						const Element = getField(item.type);
						const show = showElements[item.name];
						return (
							show ? (
								<div className={styles.field}>
									<div className={styles.lable}>{item.label}</div>
									<Element {...item} control={control} />
									{errors ? (
										<div className={styles.errors}>
											{errors[item?.name]?.message}
										</div>
									) : null}
								</div>
							) : null
						);
					})}
				</div>
			</Modal.Body>
			<Modal.Footer>
				<Button
					onClick={handleCloseModal}
					disabled={loading}
					themeType="secondary"
					style={{
						marginRight: 16,
					}}
					type="button"
				>
					{t('settings:edit_or_add_button_label_1')}
				</Button>

				<Button disabled={loading} onClick={handleSubmit(onCreate)} type="submit">
					{mobalType ? t('settings:billing_details_update_label') : t('settings:billing_details_add_label')}
				</Button>
			</Modal.Footer>
		</div>
	);
}

export default EditBillingAddress;
