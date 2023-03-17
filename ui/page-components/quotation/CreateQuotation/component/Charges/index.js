/* eslint-disable react-hooks/exhaustive-deps */
import { cl } from '@cogoport/components';
import { IcMMoney } from '@cogoport/icons-react';
import { useEffect, forwardRef, useImperativeHandle, useState } from 'react';

import chargesControls from '../../configuration/chargesControls';

import BasicCharge from './BasicCharge';
import IncoTermCharge from './IncotermCharge';
import styles from './styles.module.css';

import { useForm } from '@/packages/forms';
import getField from '@/packages/forms/Controlled';
import { shortFormatNumber } from '@/ui/commons/utils/getShortFormatNumber';

function Charges(props, ref) {
	const { submitForm, quoteRef, transportMode, editData = {}, createQuoteHook = {} } = props;
	const [totalQuotation, setTotalQuotation] = useState(0);

	const { control, watch, setValue, handleSubmit, formState:{ errors } } = useForm();
	const productValue = quoteRef?.current?.product?.totalProductValue;

	const SelectController = getField('select');
	const TextAreaController = getField('textarea');
	const watchCharges = watch();

	const {
		basicFreightCharges = 0,
		dutiesAndTaxes = 0, insurance = 0, additionalCharges = [], incotermCharges = [],
	} = watchCharges;

	useEffect(() => {
		setValue('incoterm', 'CIF');
	}, []);

	useEffect(() => {
		if (editData?.basicFreightCharges) {
			setValue('incoterm', editData?.incoterm);
			setValue('basicFreightCharges', editData?.basicFreightCharges);
			setValue('dutiesAndTaxes', editData?.dutiesAndTaxes);
			setValue('insurance', editData?.insurance);
			setValue('incotermCharges', editData?.additionalChargesList?.incotermCharges);
			setValue('additionalCharges', editData?.additionalChargesList?.additionalCharges);
			setValue('comments', editData?.comments);
		}
	}, [editData?.basicFreightCharges]);

	useEffect(() => {
		if (
			basicFreightCharges > 0
			|| dutiesAndTaxes > 0
			|| insurance > 0
			|| additionalCharges?.length > 0
			|| incotermCharges?.length > 0
			|| productValue > 0
		) {
			let extraCharges = 0;
			additionalCharges?.forEach((charge) => {
				extraCharges += +charge.value;
			});
			let incotermCharge = 0;
			incotermCharges?.forEach((charge) => {
				incotermCharge += +charge.value;
			});
			setTotalQuotation(
				+basicFreightCharges
					+ +dutiesAndTaxes
					+ +insurance
					+ productValue
					+ +extraCharges
					+ +incotermCharge,
			);
		}
	}, [JSON.stringify(watchCharges), productValue]);

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
				ref={quoteRef}
				setValue={setValue}
				watch={watch}
				transportMode={transportMode}
				createQuoteHook={createQuoteHook}
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
					{shortFormatNumber(totalQuotation, 'INR', true)}
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
