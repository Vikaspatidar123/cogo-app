import { IcMDocument } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';
import React from 'react';

import styles from './styles.module.css';

function BillingAddressItem({
	isGstApplicable,
	data = {},
	index = 0,
}) {
	const docAccessKey = isGstApplicable
		? 'tax_exemption_proof'
		: 'tax_number_document_url';

	const handleOpenDocument = () => {
		const url = data[docAccessKey];

		window.open(url, '_blank');
	};

	const docName = data[docAccessKey]?.split('/').pop();

	return (
		<div className={styles.container}>
			<div className={styles.index_container}>
				<div className={styles.Index}>{index + 1}</div>
			</div>
			<div className={styles.address_container}>
				<div>{data.address}</div>

				<div className="gst-number">
					{!isGstApplicable
						? `GST Number : ${data.tax_number}`
						: `Address Type : ${startCase(data.address_type)}`}
				</div>

				<div className={styles.doc_container}>
					<div>
						<IcMDocument style={{ marginRight: 8 }} />
						<div className={styles.DocText}>{docName}</div>
					</div>
					<div>
						<div
							className={styles.LinkText}
							role="presentation"
							onClick={handleOpenDocument}
						>
							View

						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default BillingAddressItem;
