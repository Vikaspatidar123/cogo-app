import { Checkbox } from '@cogoport/components';
import { useTranslation } from 'next-i18next';

import styles from './styles.module.css';

const HEADER = ({ t = () => {} }) => [
	t('settings:schedule_table_option_1'),
	t('settings:schedule_table_option_2'),
	t('settings:schedule_table_option_3'),
	t('settings:schedule_table_option_4'),
];

function Header({ setUserIds, list }) {
	const { t } = useTranslation(['settings']);

	const onCheck = (value) => {
		if (value?.target.checked) {
			setUserIds(list.map((item) => item.user_id));
		} else {
			setUserIds([]);
		}
	};
	const coloums = HEADER({ t });
	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<div className={styles.checkbox}>
					<Checkbox onChange={onCheck} />
				</div>
				{coloums.map((item) => <div key={item} className={styles.box}>{item}</div>)}
			</div>

		</div>
	);
}

export default Header;
