import { CheckboxGroup } from '@cogoport/components';
import { IcMArrowRotateRight } from '@cogoport/icons-react';

import styles from './styles.module.css';

import { withControl } from '@/packages/forms';

const CheckBoxCom = withControl(CheckboxGroup);

function TransShipmentsFilter({ isOpen, handleNav, fields, control }) {
	return (
		<>
			<div className={styles.header} role="presentation" onClick={() => handleNav('transshipments')}>
				<div className={styles.nav_heading}>
					Transshipments
				</div>
				<div className={styles.column}>
					<IcMArrowRotateRight
						height="8px"
						width="14px"
						className={isOpen.includes('transshipments') ? styles.open : ''}
					/>
				</div>
			</div>
			{isOpen.includes('transshipments') && (
				<div className={styles.check_box_wrapper}>
					<CheckBoxCom {...fields[0]} control={control} />
				</div>
			)}
			<div className={styles.line} />
		</>
	);
}

export default TransShipmentsFilter;
