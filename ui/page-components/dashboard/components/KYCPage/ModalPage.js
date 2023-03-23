import { Modal, Input, Upload } from '@cogoport/components';

// import { Input } from 'postcss';
import styles from './styles.module.css';

import { MobileNumberSelectController } from '@/packages/forms';
import SelectMobileNumber from '@/packages/forms/Business/SelectMobileNumber';

function ModalPage({ open, setOpen }) {
	return (
		<Modal
			// className={sty}
			size="md"
			show={open}
			onClose={() => setOpen(false)}
			placement="center"
		>
			<Modal.Header title="Get Additional Sport Searches for free!" />
			<Modal.Body>
				<p>We just need some additional details from you</p>
				<div>
					<p>Registration No. (PAN for India)</p>
					<div style={{ marginRight: '10px' }}>
						<Input size="md" placeholder="Medium" />
					</div>
				</div>
				<div>
					<p>Company's Address Proof</p>
					<div>
						<Upload />
					</div>
				</div>
				<div>
					<p>Mobile Number</p>
					{/* <div>
						<SelectMobileNumber />
						<MobileNumberSelectController
							control={control}
							name="mobile_number"
							type="mobile-number-select"
							placeholder="Mobile Number"
						/>
					</div> */}
				</div>
			</Modal.Body>
			<Modal.Footer>
				<p className={styles.para}>
					We attach great importance to protecting your private data, which is
					only used to verify your business and complete transactions

				</p>
				<button className={styles.button}>Avail Your Free Searches</button>
			</Modal.Footer>

		</Modal>
	);
}
export default ModalPage;
