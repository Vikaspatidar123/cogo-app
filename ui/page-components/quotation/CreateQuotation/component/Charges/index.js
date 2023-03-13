/* eslint-disable react-hooks/exhaustive-deps */
import { cl } from '@cogoport/components';
import { IcMMoney } from '@cogoport/icons-react';
import { useEffect, forwardRef, useImperativeHandle } from 'react';

import chargesControls from '../../configuration/chargesControls';
// import AdditionalCharges from './AdditionalCharge';

import BasicCharge from './BasicCharge';
import IncoTermCharge from './IncotermCharge';
import styles from './styles.module.css';

import { useForm } from '@/packages/forms';
import getField from '@/packages/forms/Controlled';

function Charges(props, ref) {
	const { submitForm } = props;
	const { control, watch, setValue, handleSubmit, formState:{ errors } } = useForm();
	const SelectController = getField('select');
	const TextAreaController = getField('textarea');

	useEffect(() => {
		setValue('incoterm', 'CIF');
	}, []);

	useImperativeHandle(ref, () => ({
		handleSubmit: () => {
			const onSubmit = (value) => value;
			const onError = () => true;
			return new Promise((resolve) => {
				handleSubmit(
					(values) => resolve(onSubmit(values)),
					(values) => resolve(onError(values)),
				)();
			});
		},
	}));

	return (
		<div className={styles.container}>

			<div className={cl`${styles.heading_row} ${styles.flex_box}`}>
				<div className={styles.header}>
					<div className={styles.icon_container}>
						<IcMMoney width={18} height={18} fill="#fff" />
					</div>
					<h3 className={styles.title}>Charges</h3>
				</div>
				<div className={styles.incoterm}>
					<p className={`${styles.label} ${styles.incoterm_label}`}>Incoterm: </p>
					<SelectController {...chargesControls[0]} control={control} style={{ width: '130px' }} />
				</div>
			</div>

			<BasicCharge
				fields={chargesControls}
				control={control}
				errors={errors}
				submitForm={submitForm}
				ref={ref}
			/>

			<div className={styles.hr} />

			<IncoTermCharge
				watch={watch}
				chargeFields={chargesControls}
				control={control}
				errors={errors}
				name="incotermCharges"
				index="4"
			/>
			<IncoTermCharge
				watch={watch}
				chargeFields={chargesControls}
				control={control}
				errors={errors}
				name="additionalCharges"
				index="5"
			/>

			<div className={styles.footer_section}>
				<div className={cl`${styles.total_quotation} ${styles.flex_box}`}>
					<span>Quotation Total:</span>
					100
					{/* {shortFormatNumber(quotationTotal, currency || 'INR')} */}
				</div>

				<div className={styles.comment}>
					<p className={cl`${styles.label} ${styles.comment_label}`}>{chargesControls[6].label}</p>
					<TextAreaController {...chargesControls[6]} control={control} rows={4} />
				</div>
			</div>
		</div>
	);
}

export default forwardRef(Charges);
