import React, { useState } from 'react';
import { useSelector } from '@cogo/store';
import { Checkbox } from '@cogoport/front/components';
import Header from './Header';
import Footer from './Footer';
import Info from '../Info';
import Loader from '../Loader';
import NoResultFound from '../NoResultFound';
import RateCard from '../RateCard';
import EnquiryCard from '../EnquiryCard';
import EnquriyStatus from '../AdditionalCards/EnquriyStatus';
import useGetRfqSpotSearches from '../../hooks/useGetRfqSpotSearch';
import { Container } from './styles';

const RfqResults = () => {
	const [bookedRates, setBookedRates] = useState({});
	const { isMobile, query, scope } = useSelector(({ general }) => ({
		isMobile: general?.isMobile,
		query: general?.query,
		scope: general?.scope,
	}));

	const {
		loading,
		list: { fullResponse },
		filters,
		hookSetters,
		refetch,
	} = useGetRfqSpotSearches(query?.rfq_id, query?.serial_id);

	const { id, serial_id, total, spot_search } = fullResponse || {};

	const isAwaitingResponse =
		spot_search?.detail?.negotiation_status === 'awaiting_responses';
	const isCompletedResponse =
		spot_search?.detail?.negotiation_status === 'completed';
	const handleBookResults = (cardId) => {
		setBookedRates({ ...bookedRates, [cardId]: !bookedRates[cardId] });
	};

	const handleRateCards = () => {
		if (loading) {
			return (
				<>
					<Loader isMobile={isMobile} scope={scope} />
					<Loader isMobile={isMobile} scope={scope} />
					<Loader isMobile={isMobile} scope={scope} />
				</>
			);
		}

		if (!loading && spot_search?.rates?.length === 0 && !isAwaitingResponse) {
			return (
				<NoResultFound
					id={id}
					type="no_result_found"
					headerData={spot_search?.detail}
					refetch={refetch}
					results_type="rfq"
					data={spot_search?.detail?.importer_exporter}
				/>
			);
		}

		return (
			<>
				{isCompletedResponse || isAwaitingResponse ? (
					<EnquriyStatus data={spot_search?.detail} refetch={refetch} />
				) : null}

				{(spot_search?.rates || []).map((item, i) => (
					<>
						<div
							style={{ display: 'flex', alignItems: 'center', width: '100%' }}
						>
							<Checkbox
								onChange={() => handleBookResults(item?.card)}
								checked={bookedRates[item?.card]}
							/>

							<RateCard
								data={item}
								id={item?.card}
								details={spot_search?.detail}
								refetch={refetch}
								results_type="rfq"
							/>
						</div>

						{((spot_search?.rates || []).length === 1
							? i === 0
							: i % 10 === 1) && !isAwaitingResponse ? (
							<EnquiryCard
								detail={spot_search?.detail}
								refetch={refetch}
								scope={scope}
								results_type="rfq"
							/>
						) : null}
					</>
				))}
			</>
		);
	};

	return (
		<Container>
			<Header total={total} serial_id={serial_id} />
			<Info
				data={spot_search?.detail}
				rates={spot_search?.rates}
				isMobile={isMobile}
				loading={loading}
				refetch={refetch}
				results_type="rfq"
			/>

			<div style={{ marginBottom: '100px', marginTop: '25px' }}>
				{handleRateCards()}
			</div>

			<Footer
				total={total}
				hookSetters={hookSetters}
				bookedRates={bookedRates}
				id={query?.rfq_id}
				data={spot_search?.detail}
				filters={filters}
				setBookedRates={setBookedRates}
				rates={spot_search?.rates}
				serial_id={serial_id}
				intLoading={loading}
			/>
		</Container>
	);
};

export default RfqResults;
