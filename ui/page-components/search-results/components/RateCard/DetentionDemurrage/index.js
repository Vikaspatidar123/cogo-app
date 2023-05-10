import { Button } from '@cogoport/components';
import {
	IcMFtick,
	IcMArrowRotateDown,
	IcMArrowRotateUp,
} from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';

import AddMoreDays from './AddMoreDays';
import styles from './styles.module.css';

function TickIcon() {
	return <IcMFtick fill="#07bc0c" height="20px" width="20px" />;
}

function DetentionDemurrage(props) {
	const {
		data: rateData = {},
		show = '',
		setShow = () => {},
		setActiveTab = () => {},
		activeTab = '',
		details = {},
	} = props;
	const { service_details = {}, spot_search_id = '' } = details;

	const { service_rates = {} } = rateData;

	const mainServices = Object.values(service_rates).filter((item) => {
		const { service_type = '' } = item;
		return service_type === 'fcl_freight';
	});

	const localServicesDetails = Object.values(service_details).filter((item) => {
		const { service_type = '' } = item;
		return service_type === 'fcl_freight_local';
	});

	const minDays = (key) => {
		const min_days = mainServices.map((item) => item?.[key]?.free_limit || 0);
		return Math.min(...min_days);
	};

	const selectedDays = (key) => {
		const selected_days = mainServices.map((item) => item?.[key]?.additional_days);
		return selected_days[0];
	};

	const additionalDays = (key) => {
		const additionalDaysPresent = mainServices.find((service) => service?.[key]?.additional_days > 0) || {};

		if (isEmpty(additionalDaysPresent)) {
			return minDays(key);
		}

		const { free_limit = 0, additional_days = 0 } =	additionalDaysPresent?.[key] || {};

		if (additional_days) {
			return `${free_limit} Free + ${additional_days} Additional `;
		}

		return `${free_limit} Free`;
	};

	const maxDays = (key) => {
		const min_max = mainServices.map((item) => {
			const { slabs = [] } = item?.[key] || {};
			const length = slabs.length || 0;
			return slabs[length - 1]?.upper_limit || 0;
		});
		return Math.min(...min_max);
	};

	const originDetentionFreeLimit = minDays('origin_detention');
	const originDemurrageFreeLimit = minDays('origin_demurrage');
	const destinationDetentionFreeLimit = minDays('destination_detention');
	const destinationDemurrageFreeLimit = minDays('destination_demurrage');

	const originDetentionMaxLimit = maxDays('origin_detention');
	const originDemurrageMaxLimit = maxDays('origin_demurrage');
	const destinationDetentionMaxLimit = maxDays('destination_detention');
	const destinationDemurrageMaxLimit = maxDays('destination_demurrage');

	const originDetentionAdditionalDays = selectedDays('origin_detention');
	const originDEmurrageAdditionalDays = selectedDays('origin_demurrage');
	const destinationDetentionAdditionalDays = selectedDays(
		'destination_detention',
	);
	const destinationDemurrageAdditionalDays = selectedDays(
		'destination_demurrage',
	);

	const handleChange = (value) => {
		if (activeTab === value) {
			setShow(!show);
		} else {
			setShow(true);
			setActiveTab(value);
		}
	};

	return (
		<>
			<div className={styles.container}>
				<div style={{ display: 'flex', alignItems: 'flex-end' }}>
					<div className={styles.flex_column}>
						{originDetentionFreeLimit ? (
							<div style={{ display: 'flex' }}>
								<TickIcon />
								Origin Detention:
								{' '}
								{additionalDays('origin_detention')}
								{' '}
								Days
							</div>
						) : null}

						{originDemurrageFreeLimit ? (
							<div style={{ display: 'flex', marginTop: '6px' }}>
								<TickIcon />
								Origin Demurrage :
								{' '}
								{additionalDays('origin_demurrage')}
								{' '}
								Days
							</div>
						) : null}
					</div>

					{(originDemurrageMaxLimit || originDetentionMaxLimit)
					&& rateData?.source !== 'cogo_assured_rate' ? (
						<Button
							onClick={() => handleChange('origin')}
							size="md"
							themeType="secondary"
							className={styles.styled_button}
						>
							<div style={{ display: 'flex', alignItems: 'center' }}>
								<div style={{ marginRight: '6px' }}>+ Add More</div>
								{show && activeTab === 'origin' ? (
									<IcMArrowRotateUp width={18} height={18} />
								) : (
									<IcMArrowRotateDown width={18} height={18} />
								)}
							</div>
						</Button>
						) : null}
				</div>

				<div style={{ display: 'flex', alignItems: 'center' }}>
					<div className={styles.flex_column}>
						{destinationDetentionFreeLimit ? (
							<div style={{ display: 'flex', alignItems: 'center' }}>
								<TickIcon />
								Destination Detention :
								{' '}
								{additionalDays('destination_detention')}
								{' '}
								Days
							</div>
						) : null}

						{destinationDemurrageFreeLimit ? (
							<div style={{ display: 'flex', marginTop: '6px' }}>
								<TickIcon />
								Destination Demurrage :
								{' '}
								{additionalDays('destination_demurrage')}
								{' '}
								Days
							</div>
						) : null}
					</div>

					{(destinationDemurrageMaxLimit || destinationDetentionMaxLimit)
					&& rateData?.source !== 'cogo_assured_rate' ? (
						<Button
							onClick={() => handleChange('destination')}
							size="md"
							themeType="secondary"
							className={styles.styled_button}
						>
							<div style={{ display: 'flex', alignItems: 'center' }}>
								<div style={{ marginRight: '6px' }}>+ Add More</div>
								{show && activeTab === 'destination' ? (
									<IcMArrowRotateUp width={18} height={18} />
								) : (
									<IcMArrowRotateDown width={18} height={18} />
								)}
							</div>
						</Button>
						) : null}
				</div>
			</div>

			{show && (
				<AddMoreDays
					setSho={setShow}
					activeTab={activeTab}
					setActiveTab={setActiveTab}
					originDetentionFreeLimit={originDetentionFreeLimit}
					originDemurrageFreeLimit={originDemurrageFreeLimit}
					destinationDemurrageFreeLimit={destinationDemurrageFreeLimit}
					destinationDetentionFreeLimit={destinationDetentionFreeLimit}
					originDetentionMaxLimit={originDetentionMaxLimit}
					originDemurrageMaxLimit={originDemurrageMaxLimit}
					destinationDemurrageMaxLimit={destinationDemurrageMaxLimit}
					destinationDetentionMaxLimit={destinationDetentionMaxLimit}
					mainServices={mainServices}
					localServicesDetails={localServicesDetails}
					spot_search_id={spot_search_id}
					originDetentionAdditionalDays={originDetentionAdditionalDays}
					originDEmurrageAdditionalDays={originDEmurrageAdditionalDays}
					destinationDetentionAdditionalDays={
					destinationDetentionAdditionalDays
					}
					destinationDemurrageAdditionalDays={
					destinationDemurrageAdditionalDays
					}
					{...props}
				/>
			)}
		</>
	);
}
export default DetentionDemurrage;
