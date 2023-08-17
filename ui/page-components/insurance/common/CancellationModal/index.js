import { Button, Input, Modal } from '@cogoport/components';
import { IcMLiveChat } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';
import { useState } from 'react';

import useGetCancellation from '../../hooks/useGetCancelInsurance';

import styles from './styles.module.css';

import { Image } from '@/packages/next';
import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';

const IMAGE_SRC = {
	claim  : GLOBAL_CONSTANTS.image_url.claim_svg,
	cancel : GLOBAL_CONSTANTS.image_url.cancel_svg,
};

const CONFIRM_MODAL_SRC = {
	claim  : GLOBAL_CONSTANTS.image_url.claim_policy,
	cancel : GLOBAL_CONSTANTS.image_url.sorry_svg,
};

function CancellationAndConfirmModal({
	cancelModal = false,
	cancellationPolicyDetails = {},
	setCancelModal = () => {},
	refetch = () => {},
}) {
	const [cancelConfirmModal, setCancelConfirmModal] = useState(false);
	const [cancellationReason, setCancellationReason] = useState();

	const { click = '', policyDetails = {} } = cancellationPolicyDetails || {};
	const { cogoPolicyNo = '', policyId = '' } = policyDetails || {};

	const { requestCancellation = () => {}, cancellationLoading = false } = useGetCancellation(
		{ setCancelModal, click, refetch },
	);

	const handleCancellation = () => {
		requestCancellation({ policyId, cancellationReason });
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
							<Image
								src={IMAGE_SRC[click]}
								height={150}
								width={150}
								alt="claim"
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
						<Button themeType="accent" onClick={() => setCancelModal(false)} className={styles.button}>
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
							<Image
								src={CONFIRM_MODAL_SRC[click]}
								width={150}
								height={150}
								alt="sure"
							/>
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
						<Button themeType="accent" onClick={() => setCancelModal(false)} className={styles.button}>
							Cancel
						</Button>
						<Button
							onClick={handleCancellation}
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
