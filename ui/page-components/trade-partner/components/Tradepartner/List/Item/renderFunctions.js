import { Popover } from '@cogoport/components';
import { IcMOverflowDot, IcCGreenCircle, IcCYelloCircle } from '@cogoport/icons-react';

import Amount from './Amount';
import Date from './Date';
import popoverFunc from './Popover';
import styles from './styles.module.css';
import RenderTooltip from './TooltipText';

const itemFunctions = ({
	functions,
	deleteTradeParty = () => {},
	deleteLoading,
	setShowModal,
	setTradePartyDetails = () => {},
	setIsEdit = () => {},
	deleteModal,
	setDeleteModal = () => {},
	archived,
	getList,
	showmodal,
}) => {
	const newFunctions = {
		renderAmount: (itemData, field) => (
			<Amount currency={itemData.currency} field={itemData[field.key]} />
		),
		renderDate    : (itemData, field) => <Date itemData={itemData} field={field} />,
		renderTooltip : (itemData, field) => <RenderTooltip value={itemData[field.key]} />,
		renderStatus  : (itemData) => (
			<div className={styles.flex_div}>
				{itemData?.documentStatus === 'SENT' && <IcCGreenCircle width={9} height={9} />}
				{itemData?.documentStatus === 'DRAFTED' && (
					<IcCYelloCircle width={9} height={9} />
				)}
				<div className={styles.title}>{itemData?.documentStatus}</div>
			</div>
		),
		renderDots: (itemData) => (
			<div className={styles.popover_div}>
				<div className={showmodal || deleteModal ? 'hide' : ''}>
					<Popover
						placement="bottom-end"
						animation="shift-away"
						render={popoverFunc({
							itemData,
							deleteTradeParty,
							deleteLoading,
							setShowModal,
							setTradePartyDetails,
							setIsEdit,
							deleteModal,
							setDeleteModal,
							archived,
							getList,
						})}
						interactive
					>
						<IcMOverflowDot />
					</Popover>
				</div>
			</div>
		),
		...(functions || {}),
	};

	return {
		newFunctions,
	};
};

export default itemFunctions;
