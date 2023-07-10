import { Button } from '@cogoport/components';
import { IcMFtick, IcMTick } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';

import useCreateOrganizationCreditRequest from '../../hooks/useCreateCreditRequest';

import styles from './styles.module.css';

function GSTproof({
	proofUrl = '',
	handleSubmit = () => {},
	setProofUrl = () => {},
	hasRequestedForCredit = false,
	getCreditRequestResponse = {},
	refetch = () => {},
	selectedGstDetails = {},
}) {
	const { business_name = '', tax_number = '', address = [] } = getCreditRequestResponse || {};
	const { createOrganizationCreditRequest = () => {}, loading } = useCreateOrganizationCreditRequest({ refetch });

	const submit = (val) => {
		const values = {
			...val,
			org_billing_address_id: selectedGstDetails?.address_details?.id,
		};
		createOrganizationCreditRequest({ proofUrl, values });
	};

	return (
		<>
			<div>
				{hasRequestedForCredit && <div>GST Proof</div>}
			</div>
			<div className={styles.file_container}>
				<div className={styles.file}>
					<object data={proofUrl} type="application/pdf" height="100%" width="100%">
						<a href={proofUrl}>Business Address Proof</a>
					</object>
				</div>
				<div className={styles.details}>
					<div>
						{business_name &&						(
							<div className={styles.detail}>
								<IcMFtick fill="#849E4C" width={14} height={14} />
								{' '}
								{startCase(business_name)}
							</div>
						)}
						{tax_number &&						(
							<div className={styles.detail}>
								<IcMFtick fill="#849E4C" width={14} height={14} />
								{' '}
								{startCase(tax_number)}
							</div>
						)}
						{address.length > 0 &&						(
							<div className={styles.detail}>
								<IcMFtick fill="#849E4C" width={14} height={14} />
								{' '}
								{address}
							</div>
						)}
					</div>

					{(!hasRequestedForCredit) &&	(
						<div className={styles.button_wrapper}>
							<Button
								className={styles.cancel}
								themeType="secondary"
								size="sm"
								onClick={() => setProofUrl('')}
							>
								Upload New
							</Button>
							<Button
								themeType="accent"
								size="sm"
								disabled={loading}
								loading={loading}
								onClick={handleSubmit(submit)}
							>
								<IcMTick />
								Confirm
							</Button>
						</div>
					)}
				</div>
			</div>
		</>
	);
}

export default GSTproof;
