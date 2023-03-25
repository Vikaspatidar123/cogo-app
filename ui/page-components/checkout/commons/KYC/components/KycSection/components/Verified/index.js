import { useEffect } from 'react';

import KYCVerifiedIcon from '../../icons/verified-icon.svg';

import FullView from './FullView';
import styles from './styles.module.css';

import { useRequest } from '@/packages/request';

function Verified({ channelPartnerDetails = {} }) {
	const [{ loading }, getOrganizationDocumentsAPI] = useRequest({
		url    : '/get_channel_partner_documents',
		method : 'get',
	}, { manual: true });

	useEffect(() => {
		getOrganizationDocumentsAPI({
			params: {
				partner_id    : channelPartnerDetails.id,
				account_types : ['importer_exporter'],
				filters       : {
					document_type : 'business_address_proof',
					status        : 'active',
				},
			},
		});
	}, []);

	const { data = [] } = getOrganizationDocumentsAPI;
	const { image_url = '' } = data[0] || {};

	return (
		<div className={styles.flex}>
			<div className={styles.container}>
				<KYCVerifiedIcon size={6} />
				<div className={styles.message_container}>
					<div className={styles.message_text}>Verification Complete</div>
					<div className={styles.message}>KYC Verified Successfully!</div>
				</div>
			</div>
			<div className={styles.border_right} />
			<div className={styles.container}>
				<div className={styles.text_tag}>Business Address Proof</div>
				<div
					className={styles.Pdf}
					style={{
						position  : 'relative',
						minWidth  : '150px',
						minHeight : '180px',
					}}
				>
					<object
						data={data?.[0]?.image_url}
						type="application/pdf"
						height="100%"
						width="100%"
					>
						<a href={data?.[0]?.image_url}>Business Address Proof</a>
					</object>
					<FullView
						containerStyle={{
							position : 'absolute',
							bottom   : 16,
							left     : 16,
							right    : 16,
						}}
						url={image_url}
					/>
				</div>
			</div>
		</div>
	);
}

export default Verified;
