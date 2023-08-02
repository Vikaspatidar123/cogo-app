import { useTranslation } from 'next-i18next';

import styles from './styles.module.css';

import { RadioController } from '@/packages/forms';

const REPORT_TYPE_OPTIONS = ({ t = () => {} }) => [{
	name: 'daily', value: 'daily', label: t('settings:schedule_status_option_1'),
},
{
	name: 'weekly', value: 'weekly', label: t('settings:schedule_status_option_2'),
},
{
	name: 'monthly', value: 'monthly', label: t('settings:schedule_status_option_3'),
},
{
	name: 'never', value: 'naver', label: t('settings:schedule_status_option_4'),
}];
function ReprtTypeSelectOptions({ control, onChange, value }) {
	const { t } = useTranslation(['settings']);

	return (
		<div>
			<div className={styles.text}>{t('settings:schedule_alerts_text_5')}</div>
			<RadioController
				name="type"
				options={REPORT_TYPE_OPTIONS({ t })}
				handleChange={onChange}
				value={value}
				radioGroup
				control={control}
			/>
		</div>
	);
}

export default ReprtTypeSelectOptions;
