import { Button } from '@cogoport/components';
import { useTranslation } from 'next-i18next';

import useStatusReport from '../../hooks/useStatusReport';
import useUpdate from '../../hooks/useUpdate';

import ReportList from './ReportList';
import Schedule from './Schedule';
import styles from './styles.module.css';

import { useRouter } from '@/packages/next';

function List(props) {
	const { isEdit = false, setEdit } = props || {};
	const { query } = useRouter();
	const { t } = useTranslation(['settings']);
	const { reportData, refetch, loading } = useStatusReport();
	const {
		onSubmit = () => {},
		setColumns = () => {},
		columns = {},
		formHooks = {},
		setUserIds = [],
		userIds,
		setReset,
		reset,
		type,
		setType,
		isLoading,
	} = useUpdate({ reportData, refetch, setEdit, isEdit });
	const updateProps = {
		...props,
		setColumns,
		columns,
		formHooks,
		reportData,
		setUserIds,
		userIds,
		refetch,
		loading,
		reset,
		type,
		setType,
	};

	const { handleSubmit } = formHooks || {};
	const onCancel = () => {
		setEdit(false);
	};
	return (
		<div className={styles.container}>

			<ReportList {...updateProps} />

			{query.type !== 'shipment' ? <Schedule {...updateProps} /> : null}

			{isEdit && query.type !== 'shipment' ? (
				<div className={styles.button}>
					<Button
						themeType="tertiary"
						type="button"
						onClick={() => onCancel()}
						loading={isLoading || loading}
					>
						{t('settings:edit_or_add_button_label_1')}
					</Button>
					<Button
						themeType="secondary"
						type="button"
						loading={isLoading || loading}
						onClick={() => setReset(!reset)}
					>
						{t('settings:shipment_button_text')}
					</Button>
					<Button
						themeType="primary"
						type="button"
						loading={isLoading || loading}
						onClick={handleSubmit(onSubmit)}
					>
						{t('settings:shipment_button_text_1')}
					</Button>
				</div>
			) : null}
		</div>
	);
}

export default List;
