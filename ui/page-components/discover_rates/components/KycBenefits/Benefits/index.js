import React from 'react';

import PlainCards from './PlainCards';

const CARDS = [
	{
		title       : 'Search for Rates',
		description : 'Search for rates from FCL, LCL, Air and Haulage in one place',
		icon        : 'ic-search-spec',
		basis       : '28%',
	},
	{
		title: 'Book End to End Shipments',
		description:
			'Book shipments from your warehouse to your customer`s warehouse. All online, in just a few minutes',
		icon  : 'ic-truck',
		basis : '28%',
	},
	{
		title: 'Operations Support',
		description:
			'Let our team handle your entire shipment,'
			+ 'including coordination between trucker, customs, shipping line etc.',
		icon  : 'ic-settings',
		basis : '28%',
	},
];

function Benefits() {
	return <PlainCards cards={CARDS} />;
}
export default Benefits;
