import { Popover, Button } from '@cogoport/components';
import { IcMFilter } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import { useState } from 'react';

import Filters from './Filters';
import styles from './styles.module.css';

import { useSelector } from '@/packages/store';

function FilterButton({
	setFilters,
	filters,
	controls,
	filterBody,
	dynamicKey,
	isScrollable,
	filterButtonLabel,
	id_prefix = '',
}) {
	const [show, setShow] = useState(false);
	const isMobile = useSelector((state) => state?.general?.isMobile);

	const onClose = () => {
		setShow(false);
	};

	const onShow = () => {
		setShow(true);
	};

	const renderFilters = () => (
		<Filters
			onClose={onClose}
			setFilters={setFilters}
			filters={filters}
			controls={controls}
			dynamicKey={dynamicKey}
			isScrollable={isScrollable}
			id_prefix={id_prefix}
		/>
	);

	return (
		<Popover
			theme="light"
			render={renderFilters()}
			placement="bottom-end"
			animation="shift-away"
			interactive
			visible={show}
			onClickOutside={onClose}
		>
			<div>
				{filterBody ? (
					filterBody(onShow, show, id_prefix)
				) : (
					<Button
						size="sm"
						ghost
						onClick={onShow}
						id={`${id_prefix}_filter_btn`}
					>
						<div className={styles.main}>
							{!isMobile && filterButtonLabel}
							<div className={styles.icon_container}>
								<IcMFilter style={{ width: 12, height: 12 }} />
								{isEmpty(filters) ? null : <div className={styles.circle} />}
							</div>
						</div>
					</Button>
				)}
			</div>
		</Popover>
	);
}

export default FilterButton;
