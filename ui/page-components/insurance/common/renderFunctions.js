import { ButtonIcon, Pill, Popover } from '@cogoport/components';
import {
	IcMOverflowDot,
	IcMPreview,
	IcMDownload,
	IcMEdit,
	// IcMError,
	// IcMFtaskCompleted,
} from '@cogoport/icons-react';
import { format } from '@cogoport/utils';

import Coverage from '../components/ListView/Coverage';
import paymentStatus from '../components/ListView/status';

import styles from './styles.module.css';

const renderFunctions = ({
	// setClick = () => {},
	redirectBuy = () => {},
	downloadFunction = () => {},
	refetchPreview = () => {},
	isMobile = false,
	// showPreviewModal = false,
	setShowPreviewModal = () => {},
	previewloading = false,
	// cancellationFunction = () => {},
}) => {
	const ColorCode = {
		IMPORT : '#FFF7DF',
		EXPORT : '#FFE3E3',
		INLAND : '#B5F1CC',
	};
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
					<IcMPreview width={12} height={12} />
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
							<IcMDownload width={15} height={15} />
							<p>Download</p>
						</div>
						{/* <div
							className="text"
							role="presentation"
							onClick={() => {
								setClick('cancel');
								cancellationFunction({ itemData });
							}}
						>
							<IcMError width={11} height={11} />
							<ListClick>Cancel</ListClick>
						</div>
						<div
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

	const functions = {
		renderPort   : (itemData) => <Coverage isMobile={isMobile} itemData={itemData} />,
		renderStatus : (itemData) => paymentStatus[itemData?.status],
		renderIcon   : (itemData) => (
			<Popover
				theme="light"
				interactive
				trigger="click"
				content={(
					<Content
						itemData={itemData}
					/>
				)}
			>
				<ButtonIcon icon={<IcMOverflowDot />} themeType="primary" />
			</Popover>
		),
		renderPolicy: (itemData) => (
			<div>
				<Pill
					className={styles.tag}
					color={ColorCode[itemData?.policyType]}
				>
					{itemData?.policyType}
				</Pill>
				<div>{itemData?.cogoPolicyNo}</div>
				<div className={styles.text}>{itemData?.policyNo}</div>
			</div>
		),
		renderFormat  : (itemData) => format(itemData?.transitDate, 'dd MMM yy'),
		renderFormat2 : (itemData) => format(itemData?.createdAt, 'dd MMM yy'),
		renderRisk    : (itemData) => <div>{itemData?.riskCoverage?.split('_')?.join(' ')}</div>,
	};
	return { functions };
};
export default renderFunctions;
