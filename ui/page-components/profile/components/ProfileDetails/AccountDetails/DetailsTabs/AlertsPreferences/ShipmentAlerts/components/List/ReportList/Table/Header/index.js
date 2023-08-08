import { Checkbox } from '@cogoport/components';
import { IcMArrowDoubleLeft, IcMArrowDoubleRight } from '@cogoport/icons-react';
import { forwardRef } from 'react';

import styles from './styles.module.css';

function Header({ header, props, scrollHandler, scrollHandlerRight, serviceName }, ref) {
	const { isEdit, setColumns } = props || {};

	const onCheck = (value) => {
		setColumns((prev) => ({ ...prev, [`${serviceName}_shipment`]: value }));
	};
	return (
		<div className={styles.container}>
			<div className={styles.icon_check}>
				<IcMArrowDoubleLeft width={18} height={18} onClick={scrollHandlerRight} />

				<Checkbox
					disabled={!isEdit}
					onChange={(e) => onCheck(e.target.checked)}
				/>
			</div>
			<div className={styles.list} ref={ref}>
				{
                    (header || []).map((item) => <div className={styles.text} key={item}>{item}</div>)
                }
			</div>
			<div className={styles.icon} onClick={() => scrollHandler()} role="presentation">
				<IcMArrowDoubleRight width={18} height={18} />
			</div>
		</div>
	);
}
export default forwardRef(Header);
