import {
	IcMPreview,
	IcMDownload,
	IcMEdit,
	IcMError,
	// IcMFtaskCompleted,
} from '@cogoport/icons-react';

import styles from './styles.module.css';

const renderFunctions = ({
	// setClick = () => {},
	redirectBuy = () => {},
	downloadFunction = () => {},
	refetchPreview = () => {},
	// showPreviewModal = false,
	setShowPreviewModal = () => {},
	previewloading = false,
	// cancellationFunction = () => {},
}) => {
	// const ColorCode = {
	// 	IMPORT : '#FFF7DF',
	// 	EXPORT : '#FFE3E3',
	// 	INLAND : '#B5F1CC',
	// };
	function Content({ itemData = {} }) {
		return (
			<div>
				<div
					className={styles.text}
					role="presentation"
					onClick={() => {
						setShowPreviewModal(true);
						refetchPreview(itemData);
					}}
				>
					<IcMPreview width={10} height={10} />
					{previewloading ? (
						<img
							src="https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/loading.svg"
							alt=""
							className={styles.image}
						/>
					) : <p>Preview</p>}
				</div>
				{itemData?.status === 'POLICY_GENERATED' && (
					<>
						<div
							className={styles.text}
							role="presentation"
							onClick={() => {
								downloadFunction({ itemData });
							}}
						>
							<IcMDownload width={10} height={10} />
							<p>Download</p>
						</div>
						<div
							className={styles.text}
							role="presentation"
							onClick={() => {
								// cancellationFunction({ itemData });
							}}
						>
							<IcMError width={10} height={10} />
							<div>Cancel</div>
						</div>
						{/* <div
							className="text"
							role="presentation"
							onClick={() => {
								setClick('claim');
								cancellationFunction({ itemData });
							}}
						>
							<IcMFtaskCompleted width={11} height={11} />
							<ListClick>Claim</ListClick>
						</div> */}
					</>
				)}
				{['DRAFT', 'PAYMENT_INITIATED'].includes(itemData?.status) && (
					<div
						className={styles.text}
						role="presentation"
						onClick={() => {
							redirectBuy(
								itemData?.policyId,
								itemData?.transitMode,
								itemData?.policyType,
							);
						}}
					>
						<IcMEdit width={10} height={10} />
						<p>Edit</p>
					</div>
				)}
			</div>
		);
	}

	return { Content };
};
export default renderFunctions;
