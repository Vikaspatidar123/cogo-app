/* eslint-disable react-hooks/exhaustive-deps */
import { cl } from '@cogoport/components';
import { IcMMoney } from '@cogoport/icons-react';
import { useEffect, forwardRef, useImperativeHandle, useState } from 'react';

import chargesControls from '../../configuration/chargesControls';
import { EXTRA_CHARGES_MAPPING } from '../../constant/charges';
import useCurrencyConversion from '../../hooks/useCurrencyConversion';

import BasicCharge from './BasicCharge';
import IncoTermCharge from './IncotermCharge';
import styles from './styles.module.css';

import { useForm } from '@/packages/forms';
import getField from '@/packages/forms/Controlled';
import formatAmount from '@/ui/commons/utils/formatAmount';

const SelectController = getField('select');
const TextAreaController = getField('textarea');

function Charges(props, ref) {
	const {
		quoteRef, editData = {}, consignmentValue = 0, watchCurrency = 'INR', ...rest
	} = props;

	const [totalQuotation, setTotalQuotation] = useState(0);
	const [exchangeRate, setExchangeRate] = useState(0);
	const [storeCurrency, setStoreCurrency] = useState({
		prevCurrency : undefined,
		currCurrency : undefined,
	});

	const { prevCurrency, currCurrency } = storeCurrency;
	const { getExchangeRate } = useCurrencyConversion({});
	const formHook = useForm({
		defaultValues: {
			incoterm: 'EXW',
		},
	});
	const { control, watch, setValue, handleSubmit, formState:{ errors } } = formHook;

	const watchCharges = watch();

	const {
		basicFreightCharges = 0,
		dutiesAndTaxes = 0, insurance = 0, additionalCharges = [], incotermCharges = [],
	} = watchCharges;

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
		if (editData?.incoterm) {
			setValue('incoterm', editData?.incoterm);
		}
	}, [editData?.incoterm]);

	useEffect(() => {
		(async () => {
			if (prevCurrency && currCurrency) {
				const rate = await getExchangeRate(prevCurrency, currCurrency);
				setExchangeRate(rate);
				if (basicFreightCharges) {
					setValue('basicFreightCharges', (basicFreightCharges * rate).toFixed(4));
				}
				if (dutiesAndTaxes) {
					setValue('dutiesAndTaxes', (dutiesAndTaxes * rate).toFixed(4));
				}
				if (insurance) {
					setValue('insurance', (insurance * rate).toFixed(4));
				}
			}
		})();
	}, [storeCurrency]);

	useEffect(() => {
		if (watchCurrency) {
			setStoreCurrency((prev) => ({
				prevCurrency : prev.currCurrency,
				currCurrency : watchCurrency,
			}));
		}
	}, [watchCurrency]);

	useEffect(() => {
		if (
			basicFreightCharges > 0
			|| dutiesAndTaxes > 0
			|| insurance > 0
			|| additionalCharges?.length > 0
			|| incotermCharges?.length > 0
			|| consignmentValue > 0
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
					+ consignmentValue
					+ +extraCharges
					+ +incotermCharge,
			);
		}
	}, [watchCharges, consignmentValue]);

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
				<div className={cl`${styles.incoterm} ${errors?.incoterm ? styles.error : ''}`}>
					<p className={`${styles.label} ${styles.incoterm_label}`}>
						Incoterm:
					</p>
					<SelectController {...chargesControls[0]} control={control} style={{ width: '130px' }} />
				</div>
			</div>

			<BasicCharge
				fields={chargesControls}
				formHook={formHook}
				ref={quoteRef}
				consignmentValue={consignmentValue}
				editData={editData}
				rest={rest}
			/>

			<div className={styles.hr} />

			{EXTRA_CHARGES_MAPPING.map(({ name = '', sequence = '' }) => (
				<IncoTermCharge
					key={name}
					chargeFields={chargesControls}
					exchangeRate={exchangeRate}
					formHook={formHook}
					name={name}
					index={sequence}
				/>
			))}

			<div className={styles.footer_section}>
				<div className={cl`${styles.total_quotation} ${styles.flex_box}`}>
					<span>Quotation Total:</span>
					{formatAmount({
						amount   : totalQuotation,
						currency : watchCurrency || rest.orgCurrency,
						options  : {
							style                 : 'currency',
							currencyDisplay       : 'symbol',
							notation              : 'standard',
							maximumFractionDigits : 2,
						},
					})}
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
