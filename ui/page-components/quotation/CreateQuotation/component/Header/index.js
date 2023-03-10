import { cl, Button } from '@cogoport/components';
import { IcMArrowBack, IcMPlus } from '@cogoport/icons-react';

import SellerAddress from './SellerAddress';
import styles from './styles.module.css';

import getField from '@/packages/forms/Controlled';

function Header({ control, fields }) {
	const SelectController = getField(fields[0]?.type);
	return (
		<div className={styles.container}>
			<div className={styles.title_container}>
				<div className={styles.icon_container}>
					<IcMArrowBack width={18} height={18} />
				</div>
				<h1>Create Quotation</h1>
			</div>
			<div className={styles.field_row}>
				<div className={cl`${styles.field_col} ${styles.buyer_col}`}>
					<SelectController {...fields[0]} control={control} />
					<div className={styles.or_tag}>
						<div className={styles.line} />
						<div className="text">OR</div>
						<div className={styles.line} />
					</div>
					<Button size="md" themeType="accent">
						<IcMPlus width={15} height={15} />
						Add New
					</Button>
				</div>
				<div className={styles.seller_col}>
					<SellerAddress />
				</div>
			</div>
		</div>
	);
}

export default Header;
