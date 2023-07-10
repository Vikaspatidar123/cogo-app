import { cl, CheckboxGroup } from '@cogoport/components';
import { IcMTick } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';

import options from '../../configurations/segmented-options';
import SERVICE_MAPPING from '../../constant/service-mapping';

import LoadingCard from './LoadingCard';
import LocationCard from './LocationCard';
import styles from './styles.module.css';

import AsyncSelect from '@/packages/forms/Business/AsyncSelect';

function Ports({
	activePortPair,
	setActivePortPair,
	spot_searches,
	portPairloading,
	selectedData,
	listFilters = {},
	setListFilter,
	source,
	stats,
}) {
	const { search_type, rateFilter, location } = listFilters;

	const renderComponent = () => {
		if (portPairloading) {
			return <LoadingCard />;
		}

		if (isEmpty(spot_searches)) {
			return (
				<div className={styles.section}>
					<div className={styles.title}>No Port Pairs Found</div>
					<div className={styles.sub_title}>
						Looks like you do not have any records for this section
					</div>
				</div>
			);
		}

		return (
			<>
				{(spot_searches || []).map((item, index) => (
					<LocationCard
						index={index}
						activePortPair={activePortPair}
						setActivePortPair={setActivePortPair}
						selectedData={selectedData}
						spotSearchId={item?.id}
						source={source}
						item={item}
					/>
				))}
			</>
		);
	};

	return (
		<div className={styles.container}>
			<div className={styles.filters}>
				<div className={styles.tags}>
					{SERVICE_MAPPING.map(({ label, value }, index) => (
						<div
							className={cl`${styles.tag} ${value === search_type ? styles.active : ''}`}
							key={value}
							role="presentation"
							onClick={() => (stats?.[value] > 0
								? setListFilter((prev) => ({
									...prev,
									search_type: value,
								}))
								: {})}
						>
							{value === search_type && <IcMTick />}
							<div className={cl`${styles.label} ${stats?.[value] === 0 ? styles.disabled : ''}`}>
								{options[index - 1]?.icon}
								{label}
								<span>
									(
									{stats?.[value] || 0}
									)
								</span>
							</div>
						</div>
					))}
				</div>

				<AsyncSelect
					isClearable
					asyncKey="locations"
					placeholder="Select port"
					value={location}
					onChange={(val) => setListFilter((prev) => ({
						...prev,
						location: val,
					}))}
					params={{
						filters: {
							type: ['airport', 'seaport'],
						},
					}}
					defaultOptions
				/>
				<CheckboxGroup
					value={rateFilter}
					name="rate_filter"
					onChange={(val) => {
						setListFilter((prev) => ({
							...prev,
							rateFilter: val,
						}));
					}}
					options={[
						{
							label : 'Rates Available',
							value : 'is_rates_available',
						},
						{
							label : 'Expiring Soon',
							value : 'is_expiring_soon',
						},
						{
							label : 'New Rates',
							value : 'is_new_rates',
						},
					]}
				/>
			</div>

			<div className={styles.pairs}>{renderComponent()}</div>
		</div>
	);
}

export default Ports;
