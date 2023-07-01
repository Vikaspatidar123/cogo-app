import { Button } from '@cogoport/components';
import { IcCFtick } from '@cogoport/icons-react';

import styles from './styles.module.css';

import { useRouter } from '@/packages/next';
import { useSelector } from '@/packages/store';

function SuccessPage() {
	const {
		general: { query: { token = '' } = {} },
	} = useSelector((state) => state);

	const { push } = useRouter();

	const pushToDetailsPage = () => {
		if (token) {
			push('/ticket-details/[token]', `/ticket-details/${token}`, false);
		}
	};
	return (
		<div className={styles.container}>
			<div className={styles.layout_div}>
				<IcCFtick className={styles.success_icon} />
				<div className={styles.heading}>Thank you for your valuable time!</div>
				<div className={styles.sub_text}>Ticket Raised Sucessfully</div>
				<div className={styles.button_wrapper}>
					<Button themeType="primary" size="md" onClick={pushToDetailsPage}>
						View Details
					</Button>
				</div>
			</div>
		</div>
	);
}

export default SuccessPage;
