import { cl, TabPanel, Tabs } from '@cogoport/components';

import styles from './styles.module.css';

import getField from '@/packages/forms/Controlled';

function OptSelector({ control, fields = [], transportMode, setTransportMode }) {
	return (
		<div className={cl`${styles.container} ${styles.flex_box}`}>
			<Tabs themeType="tertiary" activeTab={transportMode} onChange={setTransportMode}>
				<TabPanel title="Ocean" name="OCEAN" />
				<TabPanel title="Air" name="AIR" />
			</Tabs>
			<div className={cl`${styles.flex_box} ${styles.row}`}>
				{fields.map((field, index) => {
					// eslint-disable-next-line react/jsx-no-useless-fragment
					if (index === 0) return <></>;
					const Element = getField(field?.type);
					return (
						<div key={field?.key} className={styles.col}>
							<p>{field?.label}</p>
							<Element {...field} control={control} />
						</div>
					);
				})}

			</div>
		</div>
	);
}

export default OptSelector;
