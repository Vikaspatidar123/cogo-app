import { TabPanel, Tabs } from '@cogoport/components';
import { IcAInternational, IcAShipAmber } from '@cogoport/icons-react';
import React from 'react';
import { useSwipeable } from 'react-swipeable';

import GeoSelect from '../GeoSelect';

import styles from './styles.module.css';

function SearchRoutes({
	showRoutes,
	tab,
	setTab,
	loading,
	executeCaptcha,
	recaptchaRef,
	setIsFull,
}) {
	const geoSelectProps = {
		showRoutes,
		tab,
		loading,
		executeCaptcha,
		recaptchaRef,
	};
	const config = {
		delta                : { up: 100, down: 2 },
		touchEventOptions    : { passive: true },
		preventScrollOnSwipe : false,
	};

	const handlers = useSwipeable({
		onSwiped: () => {
			setIsFull(false);
		},
		onSwipedDown: () => {
			setIsFull(true);
		},
		...config,
	});

	return (
		<div
			{...handlers}
			className={styles.search_routes}
		>
			<div className={styles.tab_container}>
				<Tabs
					activeTab={tab}
					themeType="primary"
					onChange={setTab}
				>
					<TabPanel
						icon={<IcAShipAmber width={20} height={20} />}
						name="sea"
						title="Sea"
					/>

					<TabPanel
						icon={<IcAInternational width={20} height={20} />}
						name="air"
						title="Air"
					/>
				</Tabs>
				<GeoSelect
					{...geoSelectProps}
					key={tab}
				/>
			</div>
		</div>
	);
}

export default SearchRoutes;
