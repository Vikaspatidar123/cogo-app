import { Popover, Avatar } from '@cogoport/components';
import { IcMArrowDown } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';
import { useEffect, useState } from 'react';

import Menu from '../Menu';

import styles from './styles.module.css';

import { useSelector } from '@/packages/store';

function UserName() {
	const { business_name, branch_name, total_branches } = useSelector(
		({ profile }) => ({
			business_name  : (profile.organization || {}).business_name || '',
			branch_name    : (profile.branch || {}).branch_name || '',
			total_branches : (profile?.organization?.branches || []).length,
		}),
	);
	const [showPopover, setShowPopover] = useState(false);
	const [show, setShow] = useState(false);

	useEffect(() => {
		if (showPopover) {
			setShow(false);
		}
	}, [showPopover]);

	const renderBody = () => (
		<Menu setShow={setShow} show={show} setShowPopover={setShowPopover} />
	);

	return (
		<div className={styles.container}>
			<Popover
				placement="bottom"
				animation="shift-away"
				render={renderBody()}
				visible={showPopover}
				onClickOutside={() => setShowPopover(false)}
				interactive
				className={styles.tippy_box}
				caret={false}
			>
				<div
					className={styles.container_flex}
					style={{ cursor: 'pointer' }}
					onClick={() => setShowPopover(!showPopover)}
					role="presentation"
				>
					<Avatar
						src="https://cdn.cogoport.io/cms-prod/cogo_public/vault/original/avatar-placeholder.webp"
						alt="img"
						size="28px"
					/>
					<div className={styles.bussiness_name} size={14} color="#333">
						{startCase(business_name)}
						{branch_name && total_branches > 1 ? `- ${startCase(branch_name)}` : ''}
					</div>
					<IcMArrowDown width={15} height={18} />
				</div>
			</Popover>
		</div>
	);
}

export default UserName;
