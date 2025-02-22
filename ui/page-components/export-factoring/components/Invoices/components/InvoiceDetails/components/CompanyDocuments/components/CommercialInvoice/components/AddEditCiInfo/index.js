import { Button } from '@cogoport/components';
import { useState, useEffect } from 'react';

import styles from './styles.module.css';

import { useForm } from '@/packages/forms';
import getField from '@/packages/forms/Controlled';
import formatAmount from '@/ui/commons/utils/formatAmount';
import { getAddInvoiceDocumentsControls } from
	'@/ui/page-components/export-factoring/configurations/getAddInvoiceDocumentsControls';
import useSaveCiDocsDetails from '@/ui/page-components/export-factoring/hooks/useSaveCiDocsDetails';

const MIN_NET_INVOICE_VALUE = 0;

function AddEditCiInfo({
	data = {},
	creditRequest,
	setShowCiForm,
	refetch,
}) {
	const {
		offer_letter_approved_params = {},
		overall_document_status = {},
		document_url = '',
	} = data;

	const { commercial_invoice = '' } = overall_document_status || {};
	const { advance_rate = '' } = offer_letter_approved_params;

	const [amount, setAmount] = useState(0);
	const [netInvoice, setNetInvoice] = useState(0);
	const addInvoiceDocumentsControls = getAddInvoiceDocumentsControls();

	const {
		control, watch, handleSubmit, setValue, formState: { errors },
	} = useForm();

	const { loading, onCIDocSave } = useSaveCiDocsDetails({
		data,
		refetch,
		creditRequest,
	});

	const watchValues = watch();

	useEffect(() => {
		const {
			id, invoice_amount, currency, invoice_number,
			invoice_date, prior_payment, payment_terms, due_date,
		} = data || {};
		if (id) {
			setValue('ci_number', invoice_number);
			setValue('ci_date', new Date(invoice_date));
			setValue('prior_payment', prior_payment || 0);
			setValue('invoice_amount', { price: invoice_amount, currency });
			setValue('payment_term', payment_terms);
			setValue('due_date', new Date(due_date));
			setValue('commercial_invoice', document_url);
		}
	}, [data, setValue, document_url]);

	useEffect(() => {
		const invoiceAmount = watchValues?.invoice_amount?.price || 0;
		const priorPayment = watchValues?.prior_payment || 0;

		const amt = (advance_rate * (invoiceAmount - priorPayment)) / 100;
		setNetInvoice(invoiceAmount - priorPayment);
		setAmount(amt);
	}, [watchValues, advance_rate]);

	return (
		<div className={styles.container}>
			<div className={styles.formDiv}>
				{addInvoiceDocumentsControls.map((item) => {
					const Element = getField(item?.type);
					return (
						item?.type
						&& (
							<div className={styles.field} key={item.name}>
								<div className={styles.field_name}>{item?.label}</div>
								<Element control={control} {...item} />
								<div className={styles.error_text}>
									{errors?.[item?.name]?.message
										|| errors?.[item?.name]?.type}
								</div>
							</div>
						)
					);
				})}
			</div>
			<div className={styles.flexDiv}>
				<div>
					Net Invoice Amount:&ensp;
					{formatAmount({
						amount   : netInvoice,
						currency : watchValues?.invoice_currency,
						options  : {
							notation              : 'standard',
							style                 : 'currency',
							maximumFractionDigits : 10,
						},
					})}
				</div>
				<div>
					Max Funded Amount&nbsp; (
					{advance_rate}
					%):&ensp;
					{formatAmount({
						amount,
						currency : watchValues?.invoice_currency,
						options  : {
							notation              : 'standard',
							style                 : 'currency',
							maximumFractionDigits : 10,
						},
					})}
				</div>
			</div>
			<div className={styles.errorDiv}>
				{netInvoice < MIN_NET_INVOICE_VALUE && (
					'Prior Payment Cannot be more than Invoice Amount'
				)}
			</div>
			<div className={styles.buttonFlex}>
				{document_url && (
					<Button
						type="button"
						size="md"
						themeType="secondary"
						onClick={() => setShowCiForm((pv) => !pv)}
						style={{ marginRight: '10px' }}
					>
						Cancel
					</Button>
				)}
				<Button
					type="button"
					size="md"
					onClick={handleSubmit(onCIDocSave)}
					loading={loading}
					disabled={
							loading || netInvoice < MIN_NET_INVOICE_VALUE || commercial_invoice === 'approved'
						}
				>
					Save
				</Button>
			</div>
		</div>
	);
}
export default AddEditCiInfo;
