import LoadingRateCard from '@cogo/product/rfq/common/LoadingRateCard';
import Title from '@cogo/product/rfq/common/TitleCard';
import { RadioGroup } from '@cogoport/components';
import { IcMArrowLeft, IcMArrowRight } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';

import EmptyPage from '../../../../../common/Empty';
import EmptyRateCard from '../../../../../common/EmptyRateCard';
import RateCard from '../../../../../common/RateCard';

import styles from './styles.module.css';

function ListRate({
	activePortPair,
	setActivePortPair,
	totalLength,
	spot_searches,
	spot_search,
	portPairloading,
	portPairRateloading,
	selectedData,
	setSelectedData,
	setCardIds,
}) {
	const data = spot_searches[activePortPair];

	const handleBack = () => {
		if (activePortPair > 0) setActivePortPair(activePortPair - 1);
	};
	const handleNext = () => {
		if (activePortPair < totalLength - 1) setActivePortPair(activePortPair + 1);
	};
	const isLoading = portPairRateloading || portPairloading;

	const { detail } = spot_search || {};
	const {
		cheapest,
		max_detention,
		min_transit,
		negotiated_rates = [],
	} = spot_search?.rfq_rates || {};

	const isEmptyRate =		isEmpty(cheapest)
		&& isEmpty(min_transit)
		&& isEmpty(max_detention)
		&& isEmpty(negotiated_rates);

	const handleChange = (val) => {
		if (val.includes('negotiated')) {
			const indexVal = Number(val?.replace('negotiated', '')) || 0;
			setCardIds((prev) => {
				const id = data?.id;
				if (
					prev?.[id] === spot_search?.rfq_rates?.negotiated_rates[indexVal].card
				) {
					const copy = { ...prev };
					delete copy[data?.id];
					return copy;
				}
				return {
					...prev,
					[data?.id]: `${spot_search?.rfq_rates?.negotiated_rates[indexVal].card}/${val}`,
				};
			});
			setSelectedData((prev) => {
				if (prev?.[data?.id]?.value === val) {
					const copy = { ...prev };
					delete copy[data?.id];
					return copy;
				}
				return {
					...prev,
					[data?.id]: {
						value : val,
						rate  : spot_search?.rfq_rates?.negotiated_rates[indexVal],
						data,
					},
				};
			});
		} else {
			setCardIds((prev) => {
				const id = data?.id;
				if (prev?.[id] === spot_search?.rfq_rates[val]?.card) {
					const copy = { ...prev };
					delete copy[data?.id];
					return copy;
				}
				return {
					...prev,
					[data?.id]: `${spot_search?.rfq_rates[val]?.card}/${val}`,
				};
			});
			setSelectedData((prev) => {
				if (prev?.[data?.id]?.value === val) {
					const copy = { ...prev };
					delete copy[data?.id];
					return copy;
				}
				return {
					...prev,
					[data?.id]: { value: val, rate: spot_search?.rfq_rates?.[val], data },
				};
			});
		}
	};

	const rateOptions = [];
	(negotiated_rates || []).forEach((item, index) => {
		rateOptions.push({
			label: (
				<RateCard detail={detail} ratesBreakdown={item} typeName="new_rate" />
			),
			value: `negotiated${index}`,
		});
	});
	if (cheapest) {
		rateOptions.push({
			label: (
				<RateCard
					detail={detail}
					ratesBreakdown={cheapest}
					typeName="cheapest"
				/>
			),
			value: 'cheapest',
		});
	}
	if (max_detention) {
		rateOptions.push({
			label: (
				<RateCard
					detail={detail}
					ratesBreakdown={max_detention}
					typeName="max_detention"
				/>
			),
			value: 'max_detention',
		});
	}
	if (min_transit) {
		rateOptions.push({
			label: (
				<RateCard
					detail={detail}
					ratesBreakdown={min_transit}
					typeName="min_transit"
				/>
			),
			value: 'min_transit',
		});
	}

	const searchParams = { ...spot_searches[activePortPair]?.search_params };

	const renderComponent = () => {
		if (isLoading) {
			return <LoadingRateCard />;
		}

		if (isEmpty(spot_searches)) {
			return <EmptyPage shadow={false} />;
		}

		if (isEmptyRate) {
			return <EmptyRateCard />;
		}

		return (
			<RadioGroup
				options={rateOptions}
				value={selectedData[data?.id]?.value}
				onChange={(val) => handleChange(val)}
			/>
		);
	};
	return (
		<>
			{!isEmpty(spot_searches) && (
				<Title
					detail={spot_searches[activePortPair]?.detail}
					selected={selectedData[data?.id]?.value}
					activePortPair={activePortPair}
					portPairloading={portPairloading}
					searchParams={searchParams}
				/>
			)}
			<div className={styles.rate_container}>{renderComponent()}</div>
			<div>
				<div className={styles.button_box}>
					<div
						role="presentation"
						onClick={handleBack}
						className={activePortPair > 0
							? styles.next_back_div_clickable
							: styles.next_back_div}
					>
						<IcMArrowLeft width={20} height={20} />
						Back
					</div>
					<div className={styles.port_pair}>{activePortPair + 1}</div>
					<div
						role="presentation"
						onClick={handleNext}
						className={activePortPair < totalLength - 1
							? styles.next_back_div_clickable
							: styles.next_back_div}
					>
						Next
						{' '}
						<IcMArrowRight width={20} height={20} />
					</div>
				</div>
			</div>
		</>
	);
}

export default ListRate;
