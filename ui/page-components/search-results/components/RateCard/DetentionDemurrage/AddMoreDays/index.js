import Component from './Component';

const OPTIONS = [
	{
		value : 'origin',
		label : 'ORIGIN',
	},
	{
		value : 'destination',
		label : 'DESTINATION',
	},
];

function AddMoreDays(props) {
	const {
		data: rateData,
		activeTab = '',
		setActiveTab = () => {},
		originDetentionFreeLimit,
		originDemurrageFreeLimit,
		destinationDemurrageFreeLimit,
		destinationDetentionFreeLimit,
		originDetentionMaxLimit,
		originDemurrageMaxLimit,
		destinationDemurrageMaxLimit,
		destinationDetentionMaxLimit,
		mainServices = [],
		originDetentionAdditionalDays,
		originDEmurrageAdditionalDays,
		destinationDetentionAdditionalDays,
		destinationDemurrageAdditionalDays,
		localServicesDetails = [],
		localServicesRates = [],
		spot_search_id = '',
		refetch = () => {},
	} = props;

	const COMPONENT_MAPPING = {
		origin: {
			detention: {
				freeLimit       : originDetentionFreeLimit,
				maxLimit        : originDetentionMaxLimit,
				additional_days : originDetentionAdditionalDays,
			},

			demurrage: {
				freeLimit       : originDemurrageFreeLimit,
				maxLimit        : originDemurrageMaxLimit,
				additional_days : originDEmurrageAdditionalDays,
			},
		},

		destination: {
			detention: {
				freeLimit       : destinationDetentionFreeLimit,
				maxLimit        : destinationDetentionMaxLimit,
				additional_days : destinationDetentionAdditionalDays,
			},

			demurrage: {
				freeLimit       : destinationDemurrageFreeLimit,
				maxLimit        : destinationDemurrageMaxLimit,
				additional_days : destinationDemurrageAdditionalDays,
			},
		},
	};

	const { service_rates = {} } = rateData;

	return (
		<div style={{ padding: '12px 20px' }}>
			<div style={{ display: 'flex' }}>
				{/* tabs required  ------->>>>>> */}
				{/* <SegmentedControl
					options={OPTIONS}
					activeTab={activeTab}
					setActiveTab={setActiveTab}
					separatorMarginRight={4}
				/> */}
			</div>

			<div style={{ display: 'flex' }}>
				{Object.keys(COMPONENT_MAPPING[activeTab]).map((key) => {
					const componentProps = COMPONENT_MAPPING[activeTab][key];

					return (
						<Component
							key={`${activeTab}__${key}`}
							{...componentProps}
							activeTab={activeTab}
							type={key}
							mainServices={mainServices}
							localServicesDetails={localServicesDetails}
							localServicesRates={localServicesRates}
							spot_search_id={spot_search_id}
							refetch={refetch}
							service_rates={service_rates}
							rateData={rateData}
						/>
					);
				})}
			</div>
		</div>
	);
}
export default AddMoreDays;
