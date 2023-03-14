import { cl, TabPanel, Tabs } from '@cogoport/components';
import { IcMShip, IcMAirport } from '@cogoport/icons-react';

import styles from './styles.module.css';

import getField from '@/packages/forms/Controlled';

function OptSelector({ control, fields = [], transportMode, setTransportMode, errors }) {
	return (
		<div className={cl`${styles.container} ${styles.flex_box}`}>
			<Tabs themeType="tertiary" activeTab={transportMode} onChange={setTransportMode}>
				<TabPanel title="Ocean" name="OCEAN" icon={<IcMShip width={17} height={17} />} />
				<TabPanel title="Air" name="AIR" icon={<IcMAirport width={17} height={17} />} />
			</Tabs>
			<div className={cl`${styles.flex_box} ${styles.row}`}>
				{fields.map((field, index) => {
					// eslint-disable-next-line react/jsx-no-useless-fragment
					if (index === 0) return <></>;
					const Element = getField(field?.type);
					return (
						<div key={field?.key} className={styles.col}>
							<p>{field?.label}</p>
							<Element
								{...field}
								control={control}
								className={`${errors?.[field?.name] && styles.error}`}
							/>
						</div>
					);
				})}

			</div>
		</div>
	);
}

export default OptSelector;
