import { Checkbox, cl, Placeholder } from '@cogoport/components';
import { IcMArrowDoubleLeft, IcMArrowDoubleRight } from '@cogoport/icons-react';
import { forwardRef } from 'react';

import styles from './styles.module.css';

import { useRouter } from '@/packages/next';

const LOADER_ARRAY = [...Array(6).keys()];

function Header({
	header = [],
	isEdit = false,
	setColumns = () => {},
	scrollHandler = () => {},
	scrollHandlerRight = () => {},
	shipmentLoading = false,
	checkKey = '',
	columns = '',
	fixedPoint = [],
}, ref) {
	const { query } = useRouter();
	const onCheck = (value) => {
		setColumns((prev) => ({ ...prev, [checkKey]: value }));
	};
	if (shipmentLoading) {
		return (
			<div className={cl`${styles.container} ${styles.loading}`}>
				{LOADER_ARRAY.map((ele) => (
					<Placeholder
						className={styles.placeholder}
						width={100}
						height={20}
						key={ele}
					/>
				))}
			</div>
		);
	}

	return (
		<div className={styles.container}>
			<div className={styles.icon_check}>
				<IcMArrowDoubleLeft width={18} height={18} onClick={scrollHandlerRight} />

				<Checkbox
					disabled={!isEdit}
					onChange={(e) => onCheck(e.target.checked)}
					checked={columns?.[checkKey] || fixedPoint?.includes(checkKey)}
				/>
			</div>
			<div className={cl`${styles.list} ${query.type === 'shipment' && styles.shipment}`} ref={ref}>
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
