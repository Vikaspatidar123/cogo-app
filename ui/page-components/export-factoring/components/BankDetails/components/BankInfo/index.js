import { Accordion, Tooltip } from '@cogoport/components';
import { IcMEyeopen, IcMPdf } from '@cogoport/icons-react';
import { isEmpty, startCase } from '@cogoport/utils';

import styles from './styles.module.css';

import PdfViewer from '@/ui/page-components/export-factoring/common/PdfViewer';
import StatusBox from '@/ui/page-components/export-factoring/common/StatusBox';

const excludedKeys = ['documents', 'rejection_reason', 'exporter_bank_account_id', 'approval_status'];

const titleInfo = ({ index, approval_status }) => (
	<div className={styles.headerDiv}>
		<div className={styles.header}>
			Bank-
			{index + 1}
		</div>
		<StatusBox status={approval_status} />
	</div>
);

function BankInfo({
	bank = {},
	index,
}) {
	const { approval_status = '' } = bank || {};
	return (
		<div>
			<Accordion
				type="text"
				title={titleInfo({ index, approval_status })}
				style={{ width: '90%', margin: '20px 0px' }}
			>
				<div className={styles.flexDiv}>
					{Object.keys(bank)?.map((key) => {
						if (!excludedKeys.includes(key) && !isEmpty(bank?.[key])) {
							return (
								<div key={key} className={styles.dataDiv}>
									<div className={styles.labelText}>{startCase(key)}</div>
									<div className={styles.valueText}>{startCase(bank?.[key])}</div>
								</div>
							);
						}
						return null;
					})}

					{bank?.documents?.map((item) => (
						<div key={item?.document_type} className={styles.dataDiv}>
							<div className={styles.labelText}>
								{startCase(item?.document_type)}
							</div>
							<div className={styles.valueText}>
								<Tooltip
									content={<PdfViewer url={item.document_url} width="100%" />}
									placement="right"
									interactive
								>
									<div className={styles.docContainer}>
										<div style={{ display: 'flex' }}>
											<div>
												<IcMPdf height="20px" width="20px" />
											</div>
											<div>
												{startCase(item?.document_type)}
											</div>
										</div>
										<IcMEyeopen height="20px" width="20px" />
									</div>
								</Tooltip>
							</div>
						</div>
					))}
				</div>
			</Accordion>
		</div>
	);
}

export default BankInfo;
