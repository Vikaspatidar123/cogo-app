import { Checkbox } from '@cogoport/components';
import { IcMArrowDoubleLeft, IcMArrowDoubleRight } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import { forwardRef, useImperativeHandle, useRef } from 'react';

import styles from './styles.module.css';

const SCROLL_VALUE = 560;

function Header({ header, values }, ref) {
	const asd = useRef({});

	const imperativeFn = () => ({
		a: asd.current.scrollLeft + 1,
	});

	useImperativeHandle(ref, imperativeFn, [asd.current.scrollLeft]);

	const scrollHandler = () => {
		asd.current.scrollLeft += SCROLL_VALUE;
	};
	return (
		<div className={styles.container}>
			<div className={styles.icon_check}>
				<IcMArrowDoubleLeft width={18} height={18} onClick={scrollHandler} />
				{!isEmpty(values) ? <Checkbox /> : null}
			</div>
			<div className={styles.list} ref={asd}>
				{
                    header.map((item) => <div className={styles.text}>{item}</div>)
                }
			</div>
			<div className={styles.icon} onClick={scrollHandler} role="presentation">
				<IcMArrowDoubleRight width={18} height={18} />
			</div>
		</div>
	);
}
export default forwardRef(Header);
