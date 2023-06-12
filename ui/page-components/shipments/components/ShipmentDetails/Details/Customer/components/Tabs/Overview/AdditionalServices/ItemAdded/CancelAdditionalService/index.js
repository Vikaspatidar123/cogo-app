import { Button, Modal, Textarea } from '@cogoport/components';
import { useState } from 'react';

import styles from './styles.module.css';

import useUpdateAdditionalService from
	'@/ui/page-components/shipments/components/ShipmentDetails/hooks/useUpdateAdditionalService';

function CancelAdditionalService({
	id = '',
	showCancel = false,
	setShowCancel = () => {},
	refetch = () => {},
}) {
	const [remarkValues, setRemarkValues] = useState('');

	const onOuterClick = () => {
		setShowCancel(false);
	};
	const { updateServiceList, loading } = useUpdateAdditionalService({
		id,
		remarkValues,
		refetch,
		setShowCancel,
	});

	return showCancel ? (
		<Modal
			className="prinary md"
			show={showCancel}
			onClose={() => {
				setShowCancel(false);
			}}
			closable={false}
			onOuterClick={onOuterClick}
		>
			<Modal.Header title="Are you sure that you want to cancel your additional service" />

			<Modal.Body>
				<div style={{ height: '48vh' }}>
					<Textarea
						className={styles.text_area}
						style={{ resize: 'none' }}
						value={remarkValues}
						onChange={(e) => setRemarkValues(e?.target?.value)}
						placeholder="State reason for cancellation"
					/>
				</div>
			</Modal.Body>
			<Modal.Footer>
				<Button
					className="secondary sm"
					style={{ marginRight: '6px' }}
					onClick={() => {
						setShowCancel(false);
					}}
					themeType="secondary"
				>
					Cancel
				</Button>
				<Button onClick={updateServiceList} disabled={loading}>
					Submit
				</Button>
			</Modal.Footer>
		</Modal>
	) : null;
}

export default CancelAdditionalService;
