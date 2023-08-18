import { Tooltip } from '@cogoport/components';

import styles from './styles.module.css';

import formatDate from '@/ui/commons/utils/formatDate';
import PdfViewer from '@/ui/page-components/export-factoring/common/PdfViewer';

function ExporterSigningDetails({
	data = {},
}) {
	const {
		offer_receivable_details = {},
	} = data;

	const {
		is_exporter_signed: is_exporter_signed_offer_receivable = '',
		exporter_signed_offer_receivable = {},
	} = offer_receivable_details || {};
	return (
		is_exporter_signed_offer_receivable && (
			<div style={{ display: 'flex' }}>
				<div className={styles.headText}>Signed By Exporter</div>
				<div className={styles.flexBox}>
					<Tooltip
						content={(
							<PdfViewer
								url={exporter_signed_offer_receivable?.document_url}
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
							date       : exporter_signed_offer_receivable?.updated_at,
							formatType : 'date',
						})}
						)
					</div>

				</div>
			</div>
		)
	);
}
export default ExporterSigningDetails;
