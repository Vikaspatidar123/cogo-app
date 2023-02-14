/* eslint-disable jsx-a11y/no-static-element-interactions */
import { Tooltip } from '@cogoport/components';
import { startCase } from '@cogoport/utils';
import { useEffect, useState } from 'react';

import Menu from '../Menu';

import DownArrow from './ic-dropdown-toggle.svg';
import styles from './styles.module.css';

import { useSelector } from '@/packages/store';

function UserName() {
	const {
		business_name, branch_name, total_branches,
	} = useSelector(
		({ profile }) => ({
			business_name: (profile.organization || {}).business_name || '',
			branch_name: (profile.branch || {}).branch_name || '',
			total_branches: (profile?.organization?.branches || []).length,
		}),
	);
	const [showPopover, setShowPopover] = useState(false);
	const [show, setShow] = useState(false);

	useEffect(() => {
		if (showPopover) {
			setShow(false);
		}
	}, [showPopover]);

	const renderBody = () => <Menu setShow={setShow} show={show} setShowPopover={setShowPopover} />;

	return (
		<div className={styles.container}>
			<Tooltip
				placement="bottom"
				animation="shift-away"
				content={renderBody()}
				theme="light"
				visible={showPopover}
				onClickOutside={() => setShowPopover(false)}
				interactive
				className={styles.tippy_box}
			>
				<div
					className={styles.container_flex}
					style={{ cursor: 'pointer' }}
					onClick={() => setShowPopover(!showPopover)}
				>
					<div className={styles.bussiness_name} size={14} color="#333">
						{startCase(business_name)}
						{branch_name && total_branches > 1 ? `- ${startCase(branch_name)}` : ''}
					</div>
					<DownArrow width={15} height={8} style={{ marginLeft: 16 }} />
				</div>
			</Tooltip>
		</div>
	);
}

export default UserName;
