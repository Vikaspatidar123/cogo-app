import { isEmpty } from '@cogoport/utils';
import { useTranslation } from 'next-i18next';

import useRaiseTicketControls from '../../../../../configurations/raise-ticket-config';

import FormField from './formField';
import styles from './styles.module.css';

import { UploadController } from '@/packages/forms';
import TextAreaController from '@/packages/forms/Controlled/TextAreaController';

const translationKey = 'common:components_header_tickets_create';

function FormLayout(props) {
	const { t } = useTranslation(['common']);

	const {
		control,
		formState: { errors },
		extraField,
		setSelectedQuery = () => {},
	} = props;

	const raiseTicketControls = useRaiseTicketControls({ setSelectedQuery });

	return (
		<div className={styles.container}>
			{raiseTicketControls.map((itm) => (
				<FormField
					fields={itm}
					control={control}
					errors={errors}
					key={itm?.name}
				/>
			))}

			<div className={styles.form_field_container}>
				<div className={styles.form_field_label}>
					{t(`${translationKey}_ticket_type_label`)}
				</div>
				<div>
					<TextAreaController
						control={control}
						name="description"
						rows={4}
						placeholder={t(`${translationKey}_remarks_placeholder`)}
						maxLength={200}
						rules={{ required: true }}
					/>
				</div>
				<div className={styles.form_field_error}>
					{errors?.description && t(`${translationKey}_description_required`)}
				</div>

				<div className={styles.form_field_label}>
					{t(`${translationKey}_uploading`)}
				</div>
				<UploadController
					drag
					showProgress
					onlyURLOnChange
					multiple
					name="file_urls"
					uploadType="aws"
					control={control}
					uploadIcon="ic-upload"
				/>
			</div>

			{!isEmpty(extraField) && (
				<>
					<div className={styles.sub_header}>
						{t(`${translationKey}_additional_information`)}
					</div>
					<FormField fields={extraField} control={control} errors={errors} />
				</>
			)}
		</div>
	);
}

export default FormLayout;
