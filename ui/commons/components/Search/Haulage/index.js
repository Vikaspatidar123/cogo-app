/* eslint-disable import/no-cycle */
import { Tabs, TabPanel } from '@cogoport/components';
import { useState, useMemo } from 'react';

import styles from './styles.module.css';

import SearchForm from '@/ui/page-components/discover_rates/common/SearchForm';

const CONSTANT_KEYS = {
	TRAILER_FREIGHT : 'trailer_freight',
	HAULAGE_FREIGHT : 'haulage_freight',
};

const { TRAILER_FREIGHT, HAULAGE_FREIGHT } = CONSTANT_KEYS;

function Haulage({ extraParams }) {
	const [serviceType, setServiceType] = useState(TRAILER_FREIGHT);

	const componentProps = {
		[TRAILER_FREIGHT]: {
			mode: TRAILER_FREIGHT,
			extraParams,
		},
		[HAULAGE_FREIGHT]: {
			mode: HAULAGE_FREIGHT,
			extraParams,
		},
	};

	const SERVICE_TYPE_COMPONENT_MAPPING = useMemo(
		() => ({
			[TRAILER_FREIGHT] : SearchForm,
			[HAULAGE_FREIGHT] : SearchForm,
		}),
		[],
	);

	const ActiveSearchComponent = SERVICE_TYPE_COMPONENT_MAPPING[serviceType] || null;

	return (
		<div className={styles.direction}>
			<div className={styles.column}>
				<text className={styles.text}>Select Service Type</text>

				{/* <div className={styles.flex}> */}

				{/* </div> */}
			</div>
			<Tabs
				activeTab={serviceType}
				onChange={setServiceType}
				themeType="primary"
			>
				<TabPanel name={TRAILER_FREIGHT} title="Trailer">
					{ActiveSearchComponent && (
						<ActiveSearchComponent
							key={serviceType}
							{...(componentProps[serviceType] || {})}
						/>
					)}
				</TabPanel>
				<TabPanel name={HAULAGE_FREIGHT} title="Rail">
					{ActiveSearchComponent && (
						<ActiveSearchComponent
							key={serviceType}
							{...(componentProps[serviceType] || {})}
						/>
					)}
				</TabPanel>
			</Tabs>
		</div>
	);
}

export default Haulage;
