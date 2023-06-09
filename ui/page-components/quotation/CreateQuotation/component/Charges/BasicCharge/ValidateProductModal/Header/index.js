import { Tooltip } from '@cogoport/components';
import { IcMInfo } from '@cogoport/icons-react';

import styles from '../styles.module.css';

function Header({ productLineItemDetails = [] }) {
	return (
		<div>
			{productLineItemDetails.length > 0 && (
				<div className={styles.successMsg}>
					Dont worry! Your payment was successful.
					<br />
					Please validate below HS Codes & check your results!
				</div>
			)}

			<div className={styles.title_container}>
				<div>
					<p className={styles.title}>Validate HS Code details</p>
					<div className={styles.line} />
				</div>

				<Tooltip
					placement="right-start"
					content={(
						<div style={{ fontSize: '12px' }}>
							To fetch accurate information, we need to re-validate your cargo and
							HS code information.
						</div>
					)}
					interactive
				>
					<IcMInfo height={13} width={13} fill="#F68B21" />
				</Tooltip>
			</div>
		</div>
	);
}

export default Header;
