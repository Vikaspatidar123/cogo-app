/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';

import MappingConstant from '../../../utils/incotermConstant';
import Item from '../Item';

import { useFieldArray } from '@/packages/forms';

function IncoTermCharge(props) {
	const { control, chargeFields, watch } = props || {};

	const { fields, append, remove } = useFieldArray({
		control,
		name: 'incotermCharges',
	});

	const { CHARGES, MAPPING } = MappingConstant();
	const watchIncoterm = watch('incoterm');
	console.log(watchIncoterm, 'watchIncoterm');
	const addIncotermCharges = () => {
		MAPPING[watchIncoterm]?.forEach((ele) => {
			append({
				name  : CHARGES[ele],
				value : 0,
			});
		});
	};
	const removeIncoterm = () => {
		fields.forEach(() => {
			remove({});
		});
		addIncotermCharges();
	};

	useEffect(() => {
		if (watchIncoterm) {
			removeIncoterm();
		}
	}, [watchIncoterm]);
	console.log(chargeFields, 'chargeFields');
	return (
		<div>
			{(fields || []).map((field, index) => (
				<Item
					key={field?.id}
					info={field}
					index={index}
					remove={remove}
					control={control}
					controls={chargeFields[4].controls}
				/>
			))}
		</div>
	);
}

export default IncoTermCharge;
