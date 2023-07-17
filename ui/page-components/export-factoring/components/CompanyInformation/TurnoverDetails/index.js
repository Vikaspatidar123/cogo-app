import { Select } from '@cogoport/components';
import React, { useEffect } from 'react';
import { useForm } from '@/packages/forms';

import getField from '@/packages/forms/Controlled';

export const controls = [
	{
		name: 'turnOver',

		type      : 'select',
		showLabel : false,
		options   : [
			{
				value : '0-0.4',
				label : 'Rs 0 to 0.4 Cr',
			},
			{
				value : '1.5-5',
				label : 'Rs 1.5 Cr. to 5Cr',
			},
			{
				value : '5-25',
				label : 'Rs 5Cr. to 25Cr.',
			},
			{
				value : '25-100',
				label : 'Rs 25Cr. to 100Cr.',
			},
			{
				value : '100-500',
				label : 'Rs 100 Cr. to 500 Cr.',
			},
			{
				value : '500-1000',
				label : 'Rs 500cr. to 1000 cr',
			},
		],
		span  : 6,
		rules : { required: 'Required' },
	},
];

function TurnoverDetails({ setUpdatedValues }) {
	const { control, handleSubmit, watch } = useForm();
	const allFields = watch();
	useEffect(() => {
		const spiltStringValue = allFields.turnOver?.split('-') || [];
		const value = {
			min_amount      : spiltStringValue[0] || 0,
			max_amount      : spiltStringValue[1] || 0,
			currency        : 'INR',
			min_amount_unit : 'C',
			max_amount_unit : 'C',
		};
		if (allFields.turnOver) {
			setUpdatedValues((prev) => ({ ...prev, turn_over_slab: value }));
		}
	}, [allFields.turnOver, setUpdatedValues]);
	return (
		<div>
			Select Turn Over
			{controls.map((item) => {
				const Element = getField(item.type);
				return <Element key={item.name} control={control} {...item} />;
			})}
		</div>
	);
}

export default TurnoverDetails;
