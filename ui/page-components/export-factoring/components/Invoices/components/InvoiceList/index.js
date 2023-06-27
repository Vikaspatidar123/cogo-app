import { Button } from '@cogoport/components';
import { IcMPlus } from '@cogoport/icons-react';

import styles from './styles.module.css';

function InvoiceList() {
	return (
		<div>
			<div className={styles.flexDiv}>
				<div style={{ display: 'flex' }}>
					<div className={styles.sidText}>FID: </div>
					<div className={styles.sidText}>SID: </div>
				</div>
				<Button
					type="button"
					size="md"
					themeType="tertiary"
				>
					<IcMPlus size={3} />
					Add Invoice
				</Button>
			</div>
            <div>
                <CommercialInvoiceList />
            </div>
		</div>
	);
}
export default InvoiceList;
