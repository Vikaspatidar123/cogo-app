import { Checkbox } from '@cogoport/components';
import { IcMArrowDoubleLeft, IcMArrowDoubleRight } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import { forwardRef } from 'react';

import styles from './styles.module.css';

function Header({ header, props, values = [], scrollHandler, scrollHandlerRight, serviceName }, ref) {
	const { isEdit, setColumns } = props || {};

	const shipmentIds = values.map((item) => item?.shipment_id);

	const onCheck = (value) => {
		const checkedValue = value ? shipmentIds : [];
		setColumns((prev) => ({ ...prev, [`${serviceName}_shipment`]: checkedValue }));
	};
	return (
		<div className={styles.container}>
			<div className={styles.icon_check}>
				<IcMArrowDoubleLeft width={18} height={18} onClick={scrollHandlerRight} />
				{!isEmpty(values) ? <Checkbox disabled={!isEdit} onChange={(e) => onCheck(e.target.checked)} /> : null}
			</div>
			<div className={styles.list} ref={ref}>
				{
                    header.map((item) => <div className={styles.text}>{item}</div>)
                }
			</div>
			<div className={styles.icon} onClick={() => scrollHandler()} role="presentation">
				<IcMArrowDoubleRight width={18} height={18} />
			</div>
		</div>
	);
}
export default forwardRef(Header);
