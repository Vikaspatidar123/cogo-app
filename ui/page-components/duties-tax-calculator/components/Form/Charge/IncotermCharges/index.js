import { IcMDelete } from '@cogoport/icons-react';
import { useTranslation } from 'next-i18next';
import { useEffect } from 'react';

import getField from '../../../../../../../packages/forms/Controlled';
import MappingConstant from '../../../../configuration/mappingConstant';
import style from '../../styles.module.css';

import styles from './styles.module.css';

import { useFieldArray } from '@/packages/forms';

const NumberSelector = getField('number');

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
	const { t } = useTranslation(['dutiesTaxesCalculator']);

	const { MAPPING, CHARGES } = MappingConstant();
	const { fields, append, remove } = useFieldArray({
		name: 'incotermCharges',
		control,
	});

	const { register } = control || {};

	const addIncotermCharges = () => {
		MAPPING[incoterm]?.forEach((ele) => {
			append({
				name  : CHARGES[ele],
				value : '',
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
		if (watchIncotermCharges.length > 0) {
			watchIncotermCharges.forEach((ele, index) => {
				setValue(`incotermCharges.${index}.value`, ele?.value);
			});
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [incoterm]);

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
									placeholder={t('dutiesTaxesCalculator:form_charge_incoterm_array_placeholder_2')}
									min={0}
									type="number"
									suffix={
										<div className={style.text}>{prevCurr}</div>
									}
									value={field.value}
									rules={{
										required : true,
										min      : {
											value   : 0,
											message : t('dutiesTaxesCalculator:form_charge_err_msg'),
										},
									}}
									{...register(`${name}.${index}.value`, {
										...(controls.find((controlItem) => controlItem.name === 'value' || {})
											.rules || {}),
									})}
								/>
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
