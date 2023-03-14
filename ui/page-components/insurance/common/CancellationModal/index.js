import { Button, Input, Modal } from '@cogoport/components';
import { IcMLiveChat } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';
import { useState } from 'react';

import useGetCancellation from '../../hooks/useGetCancelInsurance';
import { claimPolicySvg, sorrySvg, cancelSvg, claimSvg } from '../constants';

import styles from './styles.module.css';

function CancellationAndConfirmModal({
	cancelModal = false,
	cancellationPolicyDetails = {},
	setCancelModal = () => {},
	click = '',
}) {
	const { cogoPolicyNo = '', policyId = '' } = cancellationPolicyDetails;
	const [cancellationReason, setCancellationReason] = useState();
	const { requestCancellation = () => {}, cancellationLoading = false } =	useGetCancellation({ setCancelModal });
	const [cancelConfirmModal, setCancelConfirmModal] = useState(false);
	const handleCancellation = () => {
		if (click === 'cancel') {
			requestCancellation({ policyId, cancellationReason });
		}
	};
	return (
		<Modal
			show={cancelModal}
			onClose={() => setCancelModal(false)}
			className="secondary md"
		>
			{!cancelConfirmModal && (
				<>
					<Modal.Body>
						<div className={styles.wrapper}>
							<img
								src={click === 'cancel' ? { cancelSvg } : { claimSvg }}
								height="150px"
								width="150px"
								alt=""
								className={styles.image}
							/>
							<div className={styles.text}>
								{startCase(click)}
								{' '}
								Policy !
							</div>
							<div className={styles.sub_text}>
								Are you sure you want to
								{' '}
								{click}
								{' '}
								this policy?
							</div>
						</div>
					</Modal.Body>
					<Modal.Footer>
						<Button themeType="accent" onClick={() => setCancelModal(false)}>
							No
						</Button>
						<Button onClick={() => setCancelConfirmModal(true)}>
							Yes
						</Button>
					</Modal.Footer>
				</>
			)}
			{cancelConfirmModal && (
				<>
					<Modal.Body>
						<div className={styles.wrapper}>
							{click === 'cancel' ? (
								<img src={sorrySvg} height="150px" width="150px" alt="" />
							) : (
								<img src={claimPolicySvg} alt="" />
							)}
							{click === 'cancel' && <div className={styles.text}>We are sorry to see you go!</div>}
							<div className={styles.sub_text}>
								Are you sure you want to
								{' '}
								{click}
								{' '}
								Policy
								{' '}
								<u>{cogoPolicyNo}</u>
								{' '}
								? We really
								recommend you to connect our help center for any assistance.
							</div>
						</div>
						<div className={styles.remarks}>
							<div className={styles.flex}>
								Enter remarks if any!
								<div className={styles.red}>*</div>
							</div>
							<Input
								onChange={(e) => {
									setCancellationReason(e);
								}}
								required
								placeholder="Type here..."
								prefix={<IcMLiveChat height={20} width={25} />}
							/>
						</div>
					</Modal.Body>
					<Modal.Footer>
						<Button themeType="accent" onClick={() => setCancelModal(false)}>
							Cancel
						</Button>
						<Button
							onClick={() => handleCancellation()}
							disabled={!cancellationReason}
							loading={cancellationLoading}
						>
							Submit
						</Button>
					</Modal.Footer>
				</>
			)}
		</Modal>
	);
}
export default CancellationAndConfirmModal;
