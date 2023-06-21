// import { Tabs, TabPanel } from '@cogoport/components';

import Component from './Component';
import styles from './styles.module.css';

function AddMoreDays(props) {
	const {
		data: rateData,
		activeTab = '',
		// setActiveTab = () => {},
		originDetentionFreeLimit,
		originDemurrageFreeLimit,
		destinationDemurrageFreeLimit,
		destinationDetentionFreeLimit,
		mainServices = [],
		originDetentionAdditionalDays,
		originDEmurrageAdditionalDays,
		destinationDetentionAdditionalDays,
		destinationDemurrageAdditionalDays,
		localServicesDetails = [],
		localServicesRates = [],
		spot_search_id = '',
		refetch = () => {},
		rates = [],
		setShow,
	} = props;

	const COMPONENT_MAPPING = {
		origin: {
			detention: {
				freeLimit       : originDetentionFreeLimit,
				maxLimit        : rateData?.source === 'cogo_assured_rate' ? 14 : 21,
				additional_days : originDetentionAdditionalDays,
				rates,
			},

			demurrage: {
				freeLimit       : originDemurrageFreeLimit,
				maxLimit        : 21,
				additional_days : originDEmurrageAdditionalDays,
			},
		},

		destination: {
			detention: {
				freeLimit       : destinationDetentionFreeLimit,
				maxLimit        : rateData?.source === 'cogo_assured_rate' ? 14 : 21,
				additional_days : destinationDetentionAdditionalDays,
				rates,
			},

			demurrage: {
				freeLimit       : destinationDemurrageFreeLimit,
				maxLimit        : 21,
				additional_days : destinationDemurrageAdditionalDays,
			},
		},
	};

	const { service_rates = {} } = rateData;
	const params = {
		activeTab,
		mainServices,
		localServicesDetails,
		localServicesRates,
		spot_search_id,
		refetch,
		service_rates,
		rateData,
		setShow,
	};
	return (
		<div className={styles.container}>
			{/* <div style={{ display: 'flex' }}>
				<Tabs activeTab={activeTab} themeType="primary" onChange={setActiveTab}>
					<TabPanel name="origin" title="ORIGIN">
						<div />
					</TabPanel>

					<TabPanel name="destination" title="DESTINATION">
						<div />
					</TabPanel>
				</Tabs>
			</div> */}

			<div className={styles.days_content}>
				{Object.keys(COMPONENT_MAPPING[activeTab])
					.filter((key) => (
						(rateData?.service_type === 'fcl_freight'
								&& activeTab === 'destination'
								&& key === 'detention')
							|| rateData?.service_type === 'rail_domestic_freight'
					)).map((key) => {
						const componentProps = COMPONENT_MAPPING[activeTab][key];

						return (
							<Component
								key={`${activeTab}__${key}`}
								{...componentProps}
								type={key}
								{...params}
							/>
						);
					})}
			</div>
		</div>
	);
}
export default AddMoreDays;
