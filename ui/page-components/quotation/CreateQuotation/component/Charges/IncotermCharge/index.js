/* eslint-disable react-hooks/exhaustive-deps */
import { Button } from '@cogoport/components';
import { useCallback, useEffect } from 'react';

import MappingConstant from '../../../utils/incotermConstant';
import Item from '../Item';

import { useFieldArray } from '@/packages/forms';

function IncoTermCharge(props) {
	const { control, chargeFields, watch, name, index: i } = props || {};

	const { fields, append, remove } = useFieldArray({
		control,
		name,
	});

	const { CHARGES, MAPPING } = MappingConstant();
	const watchIncoterm = watch('incoterm');

	const addIncotermCharges = () => {
		MAPPING[watchIncoterm]?.forEach((ele) => {
			append({
				name  : CHARGES[ele],
				value : 0,
			});
		});
	};

	const removeIncoterm = useCallback(() => {
		if (fields.length > 0) {
			fields.forEach(() => {
				remove({});
			});
		}
		addIncotermCharges();
	}, [watchIncoterm]);

	useEffect(() => {
		if (watchIncoterm && name === 'incotermCharges') {
			removeIncoterm();
		}
	}, [watchIncoterm]);

	return (
		<>

			<div>
				{(fields || []).map((field, index) => (
					<Item
						key={field?.id}
						info={field}
						index={index}
						remove={remove}
						control={control}
						controls={chargeFields[i].controls}
					/>
				))}
			</div>
			{fields.length !== 0 && name === 'incotermCharges' && <hr />}
			{name === 'additionalCharges' && (
				<Button
					themeType="linkUi"
					style={{ margin: '8px 0' }}
					onClick={() => append({ name: '', value: '' })}
				>
					+ Add More Charges
				</Button>
			)}
		</>

	);
}

export default IncoTermCharge;
