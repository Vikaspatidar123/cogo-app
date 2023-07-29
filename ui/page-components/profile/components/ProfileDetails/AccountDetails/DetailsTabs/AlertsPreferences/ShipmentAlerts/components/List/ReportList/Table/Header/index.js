import { Checkbox } from '@cogoport/components';
import { IcMArrowDoubleLeft, IcMArrowDoubleRight } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';

import styles from './styles.module.css';

function Header({ header, values }) {
	return (
		<div className={styles.container}>
			<div className={styles.icon_check}>
				<IcMArrowDoubleLeft width={18} height={18} />
				{!isEmpty(values) ? <Checkbox /> : null}
			</div>
			<div className={styles.list}>
				{
                    header.map((item) => <div className={styles.text}>{item}</div>)
                }
			</div>
			<div className={styles.icon}>
				<IcMArrowDoubleRight width={18} height={18} />
			</div>
		</div>
	);
}
export default Header;
