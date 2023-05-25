import { Popover } from '@cogoport/components';
import React, { useState } from 'react';

import Details from './Details';
import styles from './styles.module.css';

import { useSelector } from '@/packages/store';

function RM() {
	const { skippable_checks, agent } = useSelector(({ profile }) => ({
		skippable_checks : profile?.organization?.skippable_checks,
		agent            : profile?.organization?.agent,
	}));
	const [show, setShow] = useState(false);

	const showRmDetails = Object.keys(agent || {}).length
        && !skippable_checks?.includes('hide_rm_detail');
	return (
		<div>
			{showRmDetails ? (
				<Popover
					theme="light"
					show={show}
					interactive
					maxWidth={300}
					position="left"
					onOuterClick={() => setShow(false)}
					render={<Details />}
				>
					<div
						role="presentation"
						className={styles.assistance_icon}
						onClick={() => setShow(true)}
					>
						?
					</div>
				</Popover>
			) : null}
		</div>
	);
}

export default RM;
