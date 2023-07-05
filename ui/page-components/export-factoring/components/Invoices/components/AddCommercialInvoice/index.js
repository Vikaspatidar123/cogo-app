import { Button, Modal } from '@cogoport/components';
import { useForm } from 'react-hook-form';

import styles from './styles.module.css';

import FieldArray from '@/ui/page-components/export-factoring/common/FieldArray';
import { getAddCommercialInvoiceControls } from '@/ui/page-components/export-factoring/configurations/getAddCommercialInvoiceControls';

function AddCommercialInvoice({ openAddInvoice, setOpenAddInvoice }) {
	const addCommercialInvoiceControls = getAddCommercialInvoiceControls();
	const { control, watch, handleSubmit, formState: { errors } } = useForm();

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
					<div style={{display: 'flex'}}>
						<div className={styles.textHead}>
							Total Invoices attached to the
						</div>
						<div style={{ fontWeight: 'bold' }}>
							FID: 3
						</div>
					</div>
					<div style={{ display: 'flex', flexWrap: 'wrap' }}>
						{[...Array(11).keys()].map((x) => (
							<div className={styles.textInvoice}>
								CI/001/00001
							</div>
						))}
					</div>
				</div>
				<form className={styles.formDiv}>
					{addCommercialInvoiceControls.map((item) => {
						if (item.type === 'fieldArray') {
							return (
								<FieldArray
									{...item}
									control={control}
									name={item.name}
									error={errors?.[item.name]}
								/>
							);
						}
					})}
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
				<Button type="button">
					Submit
				</Button>
			</Modal.Footer>

		</Modal>
	);
}

export default AddCommercialInvoice;
