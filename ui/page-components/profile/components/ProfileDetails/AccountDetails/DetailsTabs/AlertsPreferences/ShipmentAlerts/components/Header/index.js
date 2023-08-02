import { Button } from '@cogoport/components';
import { useTranslation } from 'next-i18next';

import styles from './styles.module.css';

import { useRouter } from '@/packages/next';

const TEXT_MAPPING = ({ t = () => {} }) => ({
	true  : t('settings:shipment_alerts_text_2'),
	false : t('settings:shipment_alerts_text_3'),
});
const defaultText = ({ t = () => {} }) => (
	<div>
		{t('settings:shipment_alerts_text_4')}
		<span className={styles.text}>
			{' '}
			{t('settings:shipment_alerts_text_5')}
			{' '}
		</span>
		{t('settings:shipment_alerts_text_6')}
		<span className={styles.text}>
			{t('settings:shipment_alerts_text_7')}
			{' '}
		</span>
		{t('settings:shipment_alerts_text_8')}
	</div>
);
const editText = ({ t = () => {} }) => (
	<div>
		{t('settings:shipment_alerts_text_9')}
	</div>
);

const DESCRIPTION_MAPPING = ({ t = () => {} }) => ({
	false : defaultText({ t }),
	true  : editText({ t }),
});

function Header({ props }) {
	const { setEdit, isEdit = false } = props;

	const { query, push } = useRouter();

	const { t } = useTranslation(['settings']);
	const HEADING = TEXT_MAPPING({ t });
	const DESCRIPTION = DESCRIPTION_MAPPING({ t });
	const onEdit = () => {
		if (query.type !== 'shipment') {
			setEdit(true);
		} else {
			push('/settings?activeTab=alerts_preferences');
		}
	};

	return (
		<div className={styles.container}>
			<div className={styles.text_box}>
				<div className={styles.head}>
					{t('settings:shipment_alerts_text_1')}
					{' '}
					{HEADING[isEdit]}
				</div>
				{DESCRIPTION[isEdit]}
			</div>
			{!isEdit ? (
				<Button
					type="button"
					onClick={() => onEdit()}
				>
					{t('settings:shipment_alerts_text_7')}
				</Button>
			) : (
				<Button
					type="button"
					onClick={() => setEdit(false)}
					themeType="secondary"
				>
					{t('settings:edit_or_add_button_label_1')}
				</Button>
			)}
		</div>
	);
}
export default Header;
