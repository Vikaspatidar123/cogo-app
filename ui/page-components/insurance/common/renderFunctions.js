import { ButtonGroup } from '@cogoport/components';
import {
	IcMPreview,
	IcMDownload,
	IcMEdit,
	IcMError,
	IcMFtaskCompleted,
} from '@cogoport/icons-react';

import styles from './styles.module.css';

const renderFunctions = ({
	redirectBuy = () => {},
	downloadFunction = () => {},
	refetchPreview = () => {},
	setShowPreviewModal = () => {},
	previewloading = false,
	cancellationFunction = () => {},
}) => {
	function Content({ itemData = {} }) {
		const { status = '', policyId = '', policyType = '', transitMode = '' } = itemData || {};
		const options = [
			{
				children: (
					<div>
						{previewloading ? (
							<img
								src="https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/loading.svg"
								alt=""
								className={styles.image}
							/>
						)	:			(
							<>
								<IcMPreview width={10} height={10} className={styles.icon} />
								<span>Preview</span>
							</>
						)}
					</div>
				),
				onClick: () => {
					setShowPreviewModal(true);
					refetchPreview(itemData);
				},
				show: true,
			},
			{
				children: (
					<div>
						<IcMDownload width={10} height={10} className={styles.icon} />
						<span>Download</span>
					</div>
				),
				onClick: () => {
					downloadFunction({ itemData });
				},
				show: status === 'POLICY_GENERATED',
			},
			{
				children: (
					<div>
						<IcMError width={10} height={10} className={styles.icon} />
						<span>Cancel</span>
					</div>
				),
				onClick : () => { cancellationFunction({ itemData, click: 'cancel' }); },
				show    : status === 'POLICY_GENERATED',
			},
			{
				children: (
					<div>
						<IcMFtaskCompleted width={10} height={10} className={styles.icon} />
						<span>Claim</span>
					</div>
				),
				onClick : () => { cancellationFunction({ itemData, click: 'claim' }); },
				show    : status === 'POLICY_GENERATED',
			},
			{
				children: (
					<div>
						<IcMEdit width={10} height={10} className={styles.icon} />
						<span>Edit</span>
					</div>
				),
				onClick: () => {
					redirectBuy(
						policyId,
						transitMode,
						policyType,
					);
				},
				show: ['DRAFT', 'PAYMENT_INITIATED'].includes(status),
			},
		];

		const FilteredOptions = (options || []).filter((item) => item.show);

		return (
			<div>
				<ButtonGroup options={FilteredOptions} direction="vertical" size="sm" />
			</div>

		);
	}
	return { Content };
};
export default renderFunctions;
