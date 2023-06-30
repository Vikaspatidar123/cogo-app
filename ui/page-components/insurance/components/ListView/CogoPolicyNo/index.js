import { Pill, cl } from '@cogoport/components';

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
			<Pill color={COLORCODE[policyType]} className={styles.pill_styled}>
				{policyType}
			</Pill>
			{sid && (
				<Pill
					onClick={() => {
						push(`/shipments/${shipmentId}`);
					}}
					color="#dce1ff"
					role="presentation"
					className={cl`${styles.pill_styled} ${styles.pill_sid_styled}`}
				>
					SID-
					{sid}
				</Pill>
			)}
			<div>{itemData?.cogoPolicyNo}</div>
		</div>
	);
}

export default CogoPolicyNo;
