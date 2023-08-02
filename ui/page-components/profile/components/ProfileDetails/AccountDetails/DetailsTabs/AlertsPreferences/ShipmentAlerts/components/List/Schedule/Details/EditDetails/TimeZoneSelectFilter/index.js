import { useTranslation } from 'next-i18next';

import { getControls } from './configurations';
import styles from './styles.module.css';

import getField from '@/packages/forms/Controlled';

function TimeZoneSelectFilter({ control, value }) {
	const { t } = useTranslation(['settings']);

	const controls = getControls({ value, t });
	return (
		<div className={styles.container}>
			{(controls || []).map((item) => {
				const Element = getField(item.type);
				return (
					<div className={styles.box} key={item?.name}>
						<div className={styles.label}>{item.label}</div>
						<Element {...item} control={control} />
					</div>
				);
			})}
		</div>
	);
}
export default TimeZoneSelectFilter;
