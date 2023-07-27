import { Button, Modal } from '@cogoport/components';

import styles from './styles.module.css';

import { useForm } from '@/packages/forms';
import FieldArray from '@/ui/page-components/export-factoring/common/FieldArray';
import { getAddCommercialInvoiceControls } from
	'@/ui/page-components/export-factoring/configurations/getAddCommercialInvoiceControls';
import useSubmitCommercialInvoiceDetails from
	'@/ui/page-components/export-factoring/hooks/useSubmitCommercialInvoiceDetails';

function AddCommercialInvoice({
	refetch,
	invoice,
	creditRequest,
	openAddInvoice,
	setOpenAddInvoice,
}) {
	const addCommercialInvoiceControls = getAddCommercialInvoiceControls();
	const { control, handleSubmit, formState: { errors } } = useForm();
	const { fid = '', sid = '', invoices = [] } = invoice || {};

	const { loading, onSubmit } = useSubmitCommercialInvoiceDetails({
		refetch,
		sid,
		creditRequest,
		setOpenAddInvoice,
	});

	return (
		<Modal
			show={openAddInvoice}
			onClose={() => setOpenAddInvoice((pv) => !pv)}
			size="lg"
		>
			<Modal.Header
				title="Add Invoice"
			/>
			<Modal.Body>
				<div className={styles.invoiceContent}>
					<div style={{ display: 'flex' }}>
						<div className={styles.textHead}>
							Total Invoices attached to the
						</div>
						<div style={{ fontWeight: 'bold' }}>
							FID:
							{' '}
							{fid}
						</div>
					</div>
					<div style={{ display: 'flex', flexWrap: 'wrap' }}>
						{invoices.map((x) => (
							<div className={styles.textInvoice} key={x}>
								{x?.invoice_number}
							</div>
						))}
					</div>
				</div>
				<form className={styles.formDiv}>
					{addCommercialInvoiceControls.map((item) => (
						<FieldArray
							key={item.name}
							{...item}
							control={control}
							name={item.name}
							error={errors?.[item.name]}
						/>

					))}
				</form>
			</Modal.Body>
			<Modal.Footer>
				<Button
					type="button"
					themeType="secondary"
					style={{ margin: '0px 10px' }}
					onClick={() => setOpenAddInvoice((pv) => !pv)}
				>
					Cancel
				</Button>
				<Button
					type="button"
					onClick={handleSubmit(onSubmit)}
					loading={loading}
					disabled={loading}
				>
					Submit
				</Button>
			</Modal.Footer>

		</Modal>
	);
}

export default AddCommercialInvoice;
