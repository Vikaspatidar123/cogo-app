import { Modal, Button } from '@cogoport/components';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import additionalInformation from '../../../../configurations/additional-information';

import FormLayout from './FormLayout';
import styles from './styles.module.css';

import { useForm } from '@/packages/forms';

const translationKey = 'common:components_header_tickets_list';

function CreateTicket({
	createTicket = () => {},
	loading = false,
	setSelectedQuery = () => {},
}) {
	const { t } = useTranslation(['common']);

	const formProps = useForm();
	const { handleSubmit, watch } = formProps;
	const queryWatch = watch('ticket_type');
	const descriptionWatch = watch('description');

	const extraField =	additionalInformation({ t }).find(
		({ keyword }) => queryWatch?.toLowerCase()?.includes(keyword),
	) || {};

	const onSubmit = (val) => {
		createTicket(val, extraField?.name);
	};

	useEffect(() => {
		setSelectedQuery(queryWatch || '');
	}, [queryWatch, setSelectedQuery]);

	useEffect(() => {
		setSelectedQuery(descriptionWatch || '');
	}, [descriptionWatch, setSelectedQuery]);

	return (
		<>
			<Modal.Header title={t(`${translationKey}_create_ticket`)} />
			<Modal.Body className={styles.modal_body}>
				<FormLayout
					{...formProps}
					extraField={extraField}
					setSelectedQuery={setSelectedQuery}
				/>
			</Modal.Body>
			<Modal.Footer>
				<Button
					size="md"
					themeType="primary"
					onClick={handleSubmit(onSubmit)}
					disabled={loading}
				>
					{t(`${translationKey}_create_submit`)}
				</Button>
			</Modal.Footer>
		</>
	);
}

export default CreateTicket;
