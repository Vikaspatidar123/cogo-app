import { isEmpty } from '@cogoport/utils';

import useRaiseTicketControls from '../../../../../configurations/raise-ticket-config';

import FormField from './formField';
import styles from './styles.module.css';

import { UploadController } from '@/packages/forms';
import TextAreaController from '@/packages/forms/Controlled/TextAreaController';

function FormLayout(props) {
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
					Explain the problem you&apos;re facing in detail
				</div>
				<div>
					<TextAreaController
						control={control}
						name="description"
						rows={4}
						placeholder="Enter Remarks..."
						maxLength={200}
						rules={{ required: true }}
					/>
				</div>
				<div className={styles.form_field_error}>
					{errors?.description && 'Description is Required'}
				</div>

				<div className={styles.form_field_label}>
					Upload Any Supporting Documents
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
						Give additional information to raise the ticket:
					</div>
					<FormField fields={extraField} control={control} errors={errors} />
				</>
			)}
		</div>
	);
}

export default FormLayout;
