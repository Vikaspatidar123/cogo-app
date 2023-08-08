/* eslint-disable react-hooks/exhaustive-deps */
import { Button } from '@cogoport/components';
import { useCallback, useEffect } from 'react';

import MappingConstant from '../../../utils/incotermConstant';
import Item from '../Item';
import styles from '../styles.module.css';

import { useFieldArray } from '@/packages/forms';

const { CHARGES, MAPPING } = MappingConstant();

function IncoTermCharge(props) {
	const { formHook, chargeFields, name, index: i, exchangeRate } = props || {};

	const { control, setValue, watch, formState:{ errors } } = formHook;

	const { fields, append, remove } = useFieldArray({
		control,
		name,
	});

	const watchIncoterm = watch('incoterm');
	const chargeList = watch(name);

	const addIncotermCharges = () => {
		MAPPING[watchIncoterm]?.forEach((ele) => {
			append({
				name  : CHARGES[ele],
				value : '',
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

	const changeCurrency = async () => {
		if (fields.length > 0) {
			fields.forEach((field, index) => {
				const incoValue = exchangeRate * chargeList[index].value;
				setValue(`${name}.${index}.value`, incoValue.toFixed(4));
			});
		}
	};

	useEffect(() => {
		if (exchangeRate !== 0) {
			changeCurrency();
		}
	}, [exchangeRate]);

	return (
		<>

			<div className={styles.charge_scroll}>
				{(fields || []).map((field, index) => (
					<Item
						key={field?.id}
						info={field}
						index={index}
						remove={remove}
						control={control}
						controls={chargeFields[i].controls}
						name={name}
						errors={errors[name]}
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
