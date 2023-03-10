import { Button } from '@cogoport/components';

import Item from '../Item';

import { useFieldArray } from '@/packages/forms';

function AdditionalCharges(props) {
	const { control, chargeFields, watch } = props || {};

	const { fields, append, remove } = useFieldArray({
		control,
		name: 'additionalCharges',
	});

	return (
		<div>
			{(fields || []).map((field, index) => (
				<Item
					key={field?.id}
					info={field}
					index={index}
					remove={remove}
					control={control}
					controls={chargeFields[5].controls}
				/>
			))}

			<Button
				themeType="linkUi"
				onClick={() => append({ name: '', value: '' })}
			>
				+ Add More Charges
			</Button>
		</div>
	);
}

export default AdditionalCharges;
