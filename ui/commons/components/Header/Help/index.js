import { Popover } from '@cogoport/components';
import { IcMHelpInCircle } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import { useState, useEffect } from 'react';

import Modals from './components/Modals';
import Support from './components/Support';
import styles from './styles.module.css';
import getDefaultValues from './utils/getDefaultValues';

import { useSelector } from '@/packages/store';

function Help() {
	const { agent, query } = useSelector(({ profile, general }) => ({
		agent : profile?.organization?.agent,
		query : general?.query,
	}));

	const [showPopover, setShowPopover] = useState(false);
	const [modalData, setModalData] = useState(null);

	useEffect(() => {
		if (!isEmpty(query)) {
			setModalData(getDefaultValues({ query }));
		}
	}, [query]);

	return (
		<div className={styles.styled_tooltip_container}>
			<Popover
				animation="shift-away"
				placement="bottom"
				visible={showPopover}
				onClickOutside={() => setShowPopover(false)}
				render={(
					<Support
						agent={agent}
						modalData={modalData}
						setModalData={setModalData}
						showPopover={showPopover}
						setShowPopover={setShowPopover}
					/>
				)}
				theme="light"
				interactive
			>
				<div className={styles.container}>
					<IcMHelpInCircle
						className={styles.help_circle}
						aria-label="help"
						onClick={() => setShowPopover((p) => !p)}
					/>
				</div>
			</Popover>
			<Modals modalData={modalData} setModalData={setModalData} />
		</div>
	);
}

export default Help;
