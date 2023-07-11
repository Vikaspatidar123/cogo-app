import { useState } from 'react';

import { MOST_POPPULAR_INDEX } from '../../../../../constants/dimensions';
import useGetRequestCallback from '../../../../../hooks/useGetRequestCallback';
import Card from '../Card';
import EnterpriseDescription from '../EnterpriseDescription';
import Loading from '../Loading';

function RenderCard({ loading, userplan, activeTab, subscribeTab }) {
	const [activeHover, setActiveHover] = useState(MOST_POPPULAR_INDEX);
	const {
		requestCallback,
		callbackLoading,
		sortedPlan,
		priority_sequence_active_plan,
		activeIndex,
	} = useGetRequestCallback({ userplan, activeTab });
	if (loading) {
		return <Loading />;
	}
	return (
		<>
			{(sortedPlan || []).map((item, index) => (
				<Card
					key={item?.id}
					item={item}
					activeTab={activeTab}
					subscribeTab={subscribeTab}
					priority_sequence_active_plan={priority_sequence_active_plan}
					activeHover={activeHover}
					setActiveHover={setActiveHover}
					index={index}
					activeIndex={activeIndex}
				/>
			))}
			<EnterpriseDescription
				requestCallback={requestCallback}
				callbackLoading={callbackLoading}
				setActiveHover={setActiveHover}
				activeIndex={activeIndex}
			/>
		</>
	);
}
export default RenderCard;
