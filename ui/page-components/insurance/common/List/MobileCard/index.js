import { Tooltip, Pill } from '@cogoport/components';
import { format } from '@cogoport/utils';

import styles from './styles.module.css';

const COLORCODE = {
	IMPORT : '#FFF7DF',
	EXPORT : '#FFE3E3',
};

const MobileCard = ({ item = {}, isMobile = false, functions = {} }) => {
	const { renderPort, renderStatus } = functions || {};

	const renderItem = (itm) => (
		<div className={isMobile ? styles.row_mobile : styles.row}>
			<div className={styles.styled_div}>
				<div>
					<Pill color={COLORCODE[itm?.policyType]} className={isMobile ? styles.pill_mobile : styles.pill}>
						{itm?.policyType}
					</Pill>
				</div>
				<div className={styles.date}>
					Transit Start:
					{' '}
					{format(itm?.transitDate, 'dd MMM yy')}
				</div>
			</div>
			<div className={styles.policy_number}>
				<u>{itm?.cogoPolicyNo}</u>
			</div>
			<div className={styles.coverage}>{renderPort(itm)}</div>
			<div className={styles.coverage}>Commodity</div>
			<div className={styles.coverage}>
				<Tooltip content={<div className={styles.tool_tip_text}>{itm?.subCommodity}</div>} theme="light">
					<div className={styles.info}>{itm?.subCommodity}</div>
				</Tooltip>
			</div>
			<div className={styles.coverage}>
				<div className={styles.line} />
			</div>

			<div className={styles.last}>
				<div>
					Created at:
					{format(itm?.createdAt, 'dd MMM yy')}
				</div>
				<div>{renderStatus(itm)}</div>
			</div>
		</div>
	);

	return renderItem(item);
};
export default MobileCard;
