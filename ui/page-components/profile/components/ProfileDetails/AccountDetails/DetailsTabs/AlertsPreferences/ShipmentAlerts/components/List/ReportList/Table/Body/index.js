import { Checkbox } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import { forwardRef, useEffect, useRef } from 'react';

import styles from './styles.module.css';

function Body({ values, header }, ref) {
	const { current } = ref;
	const { a } = current || {};

	const asd = useRef({});

	const scrollHandler = () => {
		asd.current.scrollLeft += 220;
	};

	useEffect(() => {
		if (a > 0) {
			scrollHandler();
		}
	}, [a]);

	if (isEmpty(values)) {
		return <div className={styles.empty}>No Ongoing Shipments</div>;
	}

	return (
		values.map((item) => (
			<div className={styles.container}>
				<div className={styles.icon_check}>
					<Checkbox />
				</div>
				<div className={styles.list} ref={asd}>

					{header.map((value) => (
						<div className={styles.text}>
							{item[value]}
						</div>
					))}

				</div>
				<div className={styles.icon} />
			</div>
		))
	);
}
export default forwardRef(Body);
