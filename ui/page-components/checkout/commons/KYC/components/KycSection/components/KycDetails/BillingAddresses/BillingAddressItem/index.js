import { Flex } from '@cogoport/front/components';
import { startCase } from '@cogoport/front/utils';
import React from 'react';

import DocIcon from '../icons/doc-icon.svg';

import styles from './styles.module.css';

function BillingAddressItem({
	isGstApplicable,
	data = {},
	index = 0,
	marginBottom,
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
		<Container marginBottom={marginBottom}>
			<IndexContainer>
				<Index>{index + 1}</Index>
			</IndexContainer>
			<AddressContainer>
				<div>{data.address}</div>

				<div className="gst-number">
					{!isGstApplicable
						? `GST Number : ${data.tax_number}`
						: `Address Type : ${startCase(data.address_type)}`}
				</div>

				<DocContainer>
					<Flex>
						<DocIcon style={{ marginRight: 8 }} />
						<DocText>{docName}</DocText>
					</Flex>
					<Flex>
						<LinkText onClick={handleOpenDocument}>View</LinkText>
					</Flex>
				</DocContainer>
			</AddressContainer>
		</Container>
	);
}

export default BillingAddressItem;
