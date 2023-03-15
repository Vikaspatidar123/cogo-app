import { Modal, Button, InputGroup, Input } from '@cogoport/components';
import { IcMInfo, IcABudgetingTools } from '@cogoport/icons-react';

import styles from './styles.module.css';

function LoadCalculater({
	showCalculater,
	setShowCalculater,
	watchContainerSize,
}) {
	const head = () => (
		<div className={styles.head_container}>
			<IcABudgetingTools width={40} height={40} />
			<div>
				<div className={styles.head}>Calculate Load</div>
				<div className={styles.sub_heading}>
					{`You have selected a ${watchContainerSize}
					container`}
				</div>
			</div>
		</div>
	);
	return (
		<Modal show={showCalculater} onClose={() => setShowCalculater()}>
			<Modal.Header title={head()} />
			<Modal.Body>
				<div className={styles.input_head}>
					<div>
						<div>Dimensions</div>
						<InputGroup>
							<Input placeholder="L" size="md" style={{ width: '20%' }} />
							<Input placeholder="W" size="md" style={{ width: '20%' }} />
							<Input placeholder="H" size="md" style={{ width: '20%' }} />
							<Input
								placeholder="m"
								size="md"
								disabled
								style={{ width: '15%' }}
							/>
						</InputGroup>
					</div>
					<div>
						<div>Weight</div>
						<Input placeholder="Weight" size="md" suffix="Kg" style={{ width: '80%' }} />
					</div>
				</div>
				<Input placeholder="Quantitiy" size="md" />
			</Modal.Body>
			<Modal.Footer>
				<Button>OK</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default LoadCalculater;
