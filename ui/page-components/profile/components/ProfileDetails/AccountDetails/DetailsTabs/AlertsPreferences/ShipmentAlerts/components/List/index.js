import { Button } from '@cogoport/components';
import { useTranslation } from 'next-i18next';

import useUpdate from '../../hooks/useUpdate';

import ReportList from './ReportList';
import Schedule from './Schedule';
import styles from './styles.module.css';

import { useRouter } from '@/packages/next';

function List({ props }) {
	const { isEdit = false } = props || {};
	const { query } = useRouter();
	const { t } = useTranslation(['settings']);

	const { onSubmit, setColumns, columns, control, handleSubmit } = useUpdate();
	const updateProps = { ...props, setColumns, columns, control };
	const onCancel = () => {
		props.setEdit(false);
	};
	return (
		<div className={styles.container}>

			<ReportList props={updateProps} />

			{query.type !== 'shipment' ? <Schedule props={updateProps} /> : null}

			{isEdit && query.type !== 'shipment' ? (
				<div className={styles.button}>
					<Button themeType="tertiary" type="button" onClick={() => onCancel()}>
						{t('settings:edit_or_add_button_label_1')}
					</Button>
					<Button themeType="secondary" type="button" onClick={() => onCancel()}>
						{t('settings:shipment_button_text')}
					</Button>
					<Button themeType="primary" type="button" onClick={handleSubmit(onSubmit)}>
						{t('settings:shipment_button_text_1')}
					</Button>
				</div>
			) : null}
		</div>
	);
}

export default List;
