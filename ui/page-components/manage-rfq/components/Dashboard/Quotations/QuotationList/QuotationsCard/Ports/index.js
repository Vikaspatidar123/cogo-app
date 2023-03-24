import { Button, Popover } from '@cogoport/components';
import {
	IcMDelete,
	IcMOverflowDot,
	IcMCopy,
	IcMEdit,
	IcMEyeopen,
} from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';

import Route from '../../../../../../common/Route';

import styles from './styles.module.css';

import { useRouter } from '@/packages/next';

function Ports({ rfqItem, handleDeleteRfq, handleDuplicateRfq }) {
	const { push } = useRouter();
	const { spot_searches, status } = rfqItem || [];

	const moreData = [...spot_searches];
	moreData.splice(0, 3);

	const DuplicateAction = (
		<Button onClick={handleDuplicateRfq}>
			<IcMCopy width={12} height={12} />
			{' '}
			<span>Duplicate</span>
		</Button>
	);

	const viewButton = status !== 'uploaded' ? (
		<Button
			themeType="secondary"
			onClick={() => {
				push(
					// eslint-disable-next-line max-len
					`/manage-rfq/[rfq_id]?serial_id=${rfqItem?.serial_id}&created_at=${rfqItem?.created_at}&port=${rfqItem?.total_port_pair}`,
					// eslint-disable-next-line max-len
					`/manage-rfq/${rfqItem?.id}?serial_id=${rfqItem?.serial_id}&created_at=${rfqItem?.created_at}&port=${rfqItem?.total_port_pair}`,
				);
			}}
		>
			<IcMEyeopen width={14} height={14} />
			View
		</Button>
	) : (
		<Button />
	);

	return (
		<div className={styles.container}>
			<div className={styles.pairs}>
				{status === 'uploaded' ? (
					<div className={styles.uploaded}>
						Your file has been uploaded successfully. We are currently
						Processing it.
					</div>
				) : (
					<>
						{spot_searches.map((item, index) => (
							index < 3 && <Route rfqItem={rfqItem} item={item} />
						))}
					</>
				)}
			</div>

			<div className={!isEmpty(moreData) ? styles.view_more : styles.view_more_empty}>
				{!isEmpty(moreData) && (
					<Popover
						theme="light"
						interactive
						placement="left"
						content={(
							<div className={styles.modal_container}>
								{(moreData || []).map((item) => (
									<Route item={item} source="popover" />
								))}
							</div>
						)}
					>
						<div className={styles.more}>
							+
							{moreData.length}
							{' '}
							more
						</div>
					</Popover>
				)}
			</div>

			<div className={styles.live_button}>
				{status === 'draft' ? (
					<Button
						themeType="secondary"
						onClick={() => push(
							`/manage-rfq/create/?rfq_id=${rfqItem?.id}&stage=3&type=manual_entry`,
							`/manage-rfq/create/?rfq_id=${rfqItem?.id}&stage=3&type=manual_entry`,
						)}
					>
						<IcMEdit width={12} height={12} />
						Edit
					</Button>
				) : (
					viewButton
				)}

				{['is_expired', 'live'].includes(status) ? (
					<Popover
						theme="light"
						interactive
						placement="left"
						content={(
							<div className={styles.actions}>
								{DuplicateAction}
								<Button
									onClick={handleDeleteRfq}
								>
									<IcMDelete width={18} height={18} />
									{' '}
									<span>Delete</span>
								</Button>
							</div>
						)}
					>
						<span>
							<IcMOverflowDot width={20} height={20} />
						</span>
					</Popover>
				) : (
					<IcMDelete width={20} height={20} onClick={handleDeleteRfq} />
				)}
			</div>
		</div>
	);
}

export default Ports;
