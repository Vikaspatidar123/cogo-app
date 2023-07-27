import { Tooltip } from '@cogoport/components';

import styles from './styles.module.css';

import formatDate from '@/ui/commons/utils/formatDate';
import PdfViewer from '@/ui/page-components/export-factoring/common/PdfViewer';

const DETAILS_ARRAY = ['is_exporter_signed', 'is_buyer_signed', 'is_vendor_signed'];

function NoaSigning({
	data = {},
}) {
	const {
		overall_document_status = {},
		noa_details = {},
	} = data;

	const { offer_receivable: status_offer_receivable = '' } =	overall_document_status;

	const {
		is_buyer_signed = '',
		is_exporter_signed = '',
		is_vendor_signed = '',
		buyer_signed_noa = {},
		exporter_signed_noa = {},
		vendor_signed_noa = {},
		buyer_signing_authority_details = {},
		exporter_signing_authority_details = {},
		vendor_signing_authority_details = {},
	} = noa_details || {};

	const formMapping = {
		is_exporter_signed: {
			heading          : 'Signed by Exporter',
			subHeading       : 'Signing Pending with Exporter',
			status           : is_exporter_signed,
			docDetails       : exporter_signed_noa,
			signatoryDetails : exporter_signing_authority_details,
		},
		is_buyer_signed: {
			heading          : 'Signed by Buyer',
			subHeading       : 'Signing Pending with Buyer',
			status           : is_buyer_signed,
			docDetails       : buyer_signed_noa,
			signatoryDetails : buyer_signing_authority_details,
		},
		is_vendor_signed: {
			heading          : 'Signed by Cogo Fintech',
			subHeading       : 'Signing Pending with Cogo Fintech',
			status           : is_vendor_signed,
			docDetails       : vendor_signed_noa,
			signatoryDetails : vendor_signing_authority_details,
		},
	};

	return (
		status_offer_receivable === 'approved' && (
			<div style={{ margin: '20px 0px' }}>
				{DETAILS_ARRAY.map((details) => {
					const formFields = formMapping[details];
					return (
						<div className={styles.step} key={details}>
							<div className={styles.stepper}>
								<div
									className={styles.circle}
									style={{
										backgroundColor: `${formFields?.status ? '#abcd62' : '#bdbdbd'}`,
										border:
										`${formFields?.status ? '1px solid #abcd62' : '1px solid #bdbdbd'}`,
									}}
								/>
								{details !== 'is_vendor_signed'
								&& 								(
									<div
										className={styles.line}
										style={{
											borderLeft:
											`${formFields?.status ? '2px solid #abcd62' : '2px solid #bdbdbd'}`,
										}}
									/>
								)}
							</div>
							<div className={styles.content}>
								<div style={{ display: 'flex' }}>
									<div className={styles.headText}>
										{formFields?.status ? formFields.heading : formFields.subHeading}
									</div>
									{formFields?.status && (
										<div className={styles.flexBox}>
											<Tooltip
												content={(
													<PdfViewer
														url={formFields?.docDetails?.document_url}
														width="100%"
													/>
												)}
												placement="top-start"
												interactive
											>
												<div className={styles.linkText}>view pdf</div>
											</Tooltip>
											<div>
												(latest updated on&nbsp;
												{formatDate({
													date       : formFields?.docDetails?.updated_at,
													formatType : 'date',
												})}
												)
											</div>

										</div>
									)}
								</div>
							</div>
						</div>
					);
				})}
			</div>
		)
	);
}
export default NoaSigning;
