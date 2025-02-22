import { Button } from '@cogoport/components';
import { IcMFtick, IcMTick } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';

import useCreateOrganizationCreditRequest from '../../../hooks/useCreateOrganizationCreditRequest';

import styles from './styles.module.css';

import getGeoConstants from '@/ui/commons/constants/geo';

function GSTproof({
	proofUrl = '',
	handleSubmit = () => {},
	setProofUrl = () => {},
	hasRequestedForCredit = false,
	getCreditRequestResponse = {},
	refetch = () => {},
}) {
	const geo = getGeoConstants();
	const REGISTRATION_LABEL = geo.others.registration_number.label;

	const { business_name = '', tax_number = '', address = [] } = getCreditRequestResponse || {};
	const { createOrganizationCreditRequest = () => {} } = useCreateOrganizationCreditRequest({ refetch });

	const submit = (values) => {
		createOrganizationCreditRequest({ proofUrl, values });
	};

	return (
		<>
			<div>
				{hasRequestedForCredit && (
					<div>
						{REGISTRATION_LABEL}
						{' '}
						Proof
					</div>
				)}
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
