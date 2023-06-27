import { Button, Modal } from '@cogoport/components';

function AddCommercialInvoice({ openAddInvoice, setOpenAddInvoice }) {
	const a = 0;
	return (
		<Modal
			show={openAddInvoice}
			onClose={() => setOpenAddInvoice((pv) => !pv)}
			size="lg"
		>
			<Modal.Header>
				Add Invoice
			</Modal.Header>
			<Modal.Body>
				abcde123453
			</Modal.Body>
			<Modal.Footer>
				<Button>
					Submit
				</Button>
			</Modal.Footer>

		</Modal>
	);
}

export default AddCommercialInvoice;
