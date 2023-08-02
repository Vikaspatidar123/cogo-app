import { cl } from '@cogoport/components';

import Contact from './Contact';
import styles from './styles.module.css';

import { Image } from '@/packages/next';
import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';
import formatAmount from '@/ui/commons/utils/formatAmount';

function Header({ statsList = {} }) {
	const { on_account_amount = 0, currency } = statsList;
	return (
		<div className={styles.container}>
			<div>
				<div className={styles.heading}>Payment Dashboard</div>
				<div className={cl`${styles.web_view} ${styles.des}`}>
					Get all the financial assistance you need from us.
				</div>
			</div>
			<div className={styles.mobile_view}>
				<Image
					src={GLOBAL_CONSTANTS.image_url.dollar_url}
					alt="dollar"
					width={21}
					height={21}
				/>
				<div className={styles.amount}>
					{formatAmount({
						amount  : on_account_amount,
						currency,
						options : {
							style                 : 'currency',
							currencyDisplay       : 'code',
							maximumFractionDigits : 2,
						},
					})}
				</div>
			</div>
			<div className={styles.web_view}>
				<Contact />
			</div>
		</div>
	);
}

export default Header;
