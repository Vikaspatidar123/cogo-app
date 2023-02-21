import { IcMDelete } from '@cogoport/icons-react';
import { useEffect } from 'react';

import getField from '../../../../../../../packages/forms/Controlled';
import MappingConstant from '../../../../configuration/mappingConstant';
import style from '../../styles.module.css';

import styles from './styles.module.css';

import { useFieldArray } from '@/packages/forms';

function IncotermCharges({
	name,
	control,
	incoterm,
	controls,
	error,
	watchIncotermCharges = [],
	setValue,
	formIncoterm,
	prevCurr,
}) {
	const { MAPPING, CHARGES } = MappingConstant();
	const { fields, append, remove } = useFieldArray({
		name: 'incotermCharges',
		control,
	});
	const { register } = control || {};
	const NumberSelector = getField('number');
	const addIncotermCharges = () => {
		MAPPING[incoterm]?.forEach((ele) => {
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
		if (incoterm !== formIncoterm) {
			removeIncoterm();
		}
	}, [incoterm]);

	useEffect(() => {
		if (watchIncotermCharges.length > 0) {
			watchIncotermCharges.forEach((ele, index) => {
				setValue(`incotermCharges.${index}.value`, ele?.value);
			});
		}
	}, []);

	return (
		<div>
			{(fields || []).map((field, index) => (
				<div className={`${styles.incoterm_column} ${style.col}`}>
					<div className={style.label}>{field?.name}</div>
					<div>
						<div className={styles.row}>
							<div className={styles.incoterm_col}>
								<NumberSelector
									key={`${name}.${field.id}.value`}
									name={`${name}.${index}.value`}
									control={control}
									placeholder="0"
									min={0}
									type="number"
									value={field.value}
									rules={{
										required : true,
										min      : {
											value   : 0,
											message : 'Should be greater than 0',
										},
									}}
									className="hideInput"
									{...register(`${name}.${index}.value`, {
										...(controls.find((controlItem) => controlItem.name === 'value' || {})
											.rules || {}),
									})}
								/>
								<div className={styles.text}>{prevCurr}</div>
							</div>

							<div
								className={styles.delete_icon}
								role="presentation"
								onClick={() => remove(index, 1)}
							>
								<IcMDelete fill="#e63946 " width={20} height={20} />
							</div>
						</div>
						{error?.incotermCharges?.[index] && (
							<div className={style.error_txt}>
								*
								{error?.incotermCharges?.[index]?.value?.message
									|| error?.incotermCharges?.[index]?.value?.type}
							</div>
						)}
					</div>
				</div>
			))}
		</div>
	);
}

export default IncotermCharges;
