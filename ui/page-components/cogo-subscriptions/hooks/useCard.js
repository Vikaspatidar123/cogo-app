import { useState } from 'react';

import useRedirectUrl from '../utils/redirectUrl';

const isSubscribed = ({
	subscribeTab,
	activeTab,
	prioritySequence,
	priority_sequence_active_plan,
}) => {
	if (subscribeTab === activeTab) {
		return prioritySequence >= priority_sequence_active_plan;
	}

	return activeTab === 'annual';
};

const useCard = ({
	activeTab,
	subscribeTab,
	item,
	priority_sequence_active_plan,
}) => {
	const {
		priority_sequence: prioritySequence = '',
		metadata = {},
		display_pricing = '',
	} = item || {};
	const active = display_pricing[activeTab]?.is_active_plan;

	const currency = display_pricing[activeTab]?.currency;

	const amount = display_pricing[activeTab]?.price;

	const lowerCurrency = currency && currency.toLowerCase();

	const crossedCurr = `prev_value_${lowerCurrency}`;

	const crossedAmount = metadata?.display_pricing?.[activeTab]?.[crossedCurr];
	const totalCrossedAmount = activeTab === 'annual' ? crossedAmount / 12 : crossedAmount;
	const totalAmt = activeTab === 'annual' ? amount / 12 : amount;

	const { redirectCheckoutSubscription } = useRedirectUrl();

	const [clickedPlan, setClickedPlan] = useState({});
	const plan_pricing_id = clickedPlan?.display_pricing?.[activeTab]?.id;

	const onSubmit = async (items) => {
		const id = items?.id;
		await setClickedPlan(items);
		redirectCheckoutSubscription({ id, activeTab, plan_pricing_id });
	};
	const subscribed = isSubscribed({
		subscribeTab,
		activeTab,
		prioritySequence,
		priority_sequence_active_plan,
	});
	return {
		onSubmit,
		subscribed,
		active,
		totalCrossedAmount,
		totalAmt,
		currency,
	};
};
export default useCard;
