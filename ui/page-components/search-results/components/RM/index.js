import React, { useState } from 'react';
import { Popover } from '@cogoport/front/components';
import { useSelector } from '@cogo/store';
import Details from './Details';
import { AssistanceIcon } from './styles';

const RM = () => {
	const { skippable_checks, agent } = useSelector(({ profile }) => ({
		skippable_checks: profile?.organization?.skippable_checks,
		agent: profile?.organization?.agent,
	}));
	const [show, setShow] = useState(false);

	const showRmDetails =
		Object.keys(agent || {}).length &&
		!skippable_checks?.includes('hide_rm_detail');
	return (
		<>
			{showRmDetails ? (
				<Popover
					theme="light"
					show={show}
					interactive
					maxWidth={300}
					position="left"
					onOuterClick={() => setShow(false)}
					content={<Details />}
				>
					<AssistanceIcon onClick={() => setShow(true)}>?</AssistanceIcon>
				</Popover>
			) : null}
		</>
	);
};

export default RM;
