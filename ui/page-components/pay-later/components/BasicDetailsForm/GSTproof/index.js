import { Button } from '@cogoport/components';
import { IcMFtick, IcMTick } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';

import useCreateOrganizationCreditRequest from '../../../hooks/useCreateOrganizationCreditRequest';

import styles from './styles.module.css';

function GSTproof({
	proofUrl = '',
	handleSubmit = () => {},
	setProofUrl = () => {},
	hasRequestedForCredit = false,
	getCreditRequestResponse = {},
}) {
	const { business_name = '', tax_number = '', address = [] } = getCreditRequestResponse || {};
	const { createOrganizationCreditRequest = () => {} } = useCreateOrganizationCreditRequest();

	const submit = (values) => {
		createOrganizationCreditRequest({ proofUrl, values });
	};

	return (
		<>
			<div>
				{hasRequestedForCredit && <div>GST Proof</div>}
			</div>
			<div className={styles.file_container}>
				<div className={styles.file}>
					<img
						src={proofUrl}
						height="100%"
						width="100%"
						alt="proof"
					/>
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

					{!hasRequestedForCredit &&	(
						<div className={styles.button_wrapper}>
							<Button
								className={styles.cancel}
								themeType="secondary"
								size="sm"
								onClick={() => setProofUrl('')}
							>
								Upload New
							</Button>
							<Button themeType="accent" size="sm" onClick={handleSubmit(submit)}>
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
