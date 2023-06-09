import { Popover } from '@cogoport/components';
import { IcMOverflowDot } from '@cogoport/icons-react';

import Content from './Content';

function CardPopover({ showPopover, setShowPopover, setModalInfo, id = '' }) {
	return (
		<Popover
			placement="bottom"
			caret={false}
			visible={showPopover}
			onClickOutside={() => setShowPopover(false)}
			content={(
				<Content
					setModalInfo={setModalInfo}
					setShowPopover={setShowPopover}
					id={id}
				/>
			)}
		>
			<IcMOverflowDot onClick={() => setShowPopover(true)} />
		</Popover>
	);
}
export default CardPopover;
