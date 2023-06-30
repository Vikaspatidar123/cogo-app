import { Pill } from '@cogoport/components';

import styles from './styles.module.css';

import { useRouter } from '@/packages/next';

export const COLORCODE = {
	IMPORT : '#FFF7DF',
	EXPORT : '#FFE3E3',
	INLAND : '#B5F1CC',
};

function CogoPolicyNo({ itemData = {} }) {
	const { push } = useRouter();

	const { policyType = '', sid = '', shipmentId = '' } = itemData || {};

	return (
		<div className={styles.policy}>
			<div className={styles.pills_wrapper}>
				<Pill color={COLORCODE[policyType]} className={styles.pill_styled}>
					{policyType}
				</Pill>
				{sid && (
					<div
						onClick={() => {
							push(`/shipments/${shipmentId}`);
						}}
						color="#dce1ff"
						role="presentation"
						className={styles.pill_sid_styled}
					>
						SID-
						{sid}
					</div>
				)}
			</div>
			<div>{itemData?.cogoPolicyNo}</div>
		</div>
	);
}

export default CogoPolicyNo;
