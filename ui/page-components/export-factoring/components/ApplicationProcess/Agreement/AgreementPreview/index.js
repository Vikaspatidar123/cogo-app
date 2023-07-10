import { Input, Button } from '@cogoport/components';
import { IcMEyeopen, IcMDocument } from '@cogoport/icons-react';

import styles from './styles.module.css';

import useSubmitAgreement from '@/ui/page-components/export-factoring/hooks/useSubmitAgreement';

function AgreementPreview({
	getCreditRequestResponse = {}, refetch = () => {
	},
	method = '',
}) {
	const { sample_exportfactoring_agreement = '', documents = {} } = getCreditRequestResponse || {};
	const { offer_letter = '' } = documents;
	const { submit, loading } = useSubmitAgreement();
	const handleSubmit = async () => {
		const response = await submit(getCreditRequestResponse.credit_id, 'signing_authorities');
		if (response) {
			refetch();
		}
	};
	return (
		<>
			<p>
				Signing Mode :
				{' '}
				{method}
			</p>
			<div
				className={styles.download}
				onClick={() => window.open(sample_exportfactoring_agreement, '_blank')}
				role="presentation"
			>
				<Input
					suffix={<IcMEyeopen className={styles.icon} />}
					prefix={<IcMDocument />}
					value="RECEIVABLES PURCHASE AGREEMENT"
					readonly
					className={styles.download}
				/>
			</div>
			{offer_letter.active && (
				<div
					className={styles.download}
					onClick={() => window.open(offer_letter.active.document_url, '_blank')}
					role="presentation"
				>
					<Input
						suffix={<IcMEyeopen className={styles.icon} />}
						prefix={<IcMDocument />}
						value="OFFER LETTER"
						readonly
						className={styles.download}
					/>
				</div>
			)}
			<div className={styles.btn_container}>

				<Button onClick={handleSubmit} loading={loading} disabled={loading}>
					Submit
				</Button>
			</div>
		</>
	);
}

export default AgreementPreview;
