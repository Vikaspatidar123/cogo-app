import { Accordion, Pill } from '@cogoport/components';

import styles from './styles.module.css';

const titleInfo = () => (
	<div className={styles.headerDiv}>
		<div className={styles.header}>
			Bank-1
		</div>
		<Pill size="md" color="green">
			Verified
		</Pill>
	</div>
);

function BankInfo() {
	return (
		<div>
			<Accordion
				type="text"
				title={titleInfo()}
				style={{ width: '100%' }}
			>
				<div className={styles.flexDiv}>
                    <div className={styles.dataDiv}>
                        <div className={styles.labelText}>
                            Account Type
                        </div>
                        <div className={styles.valueText}>
                            Current Account
                        </div>
                    </div>
                    <div className={styles.dataDiv}>
                        <div className={styles.labelText}>
                            Account Type
                        </div>
                        <div className={styles.valueText}>
                            Current Account
                        </div>
                    </div>
                    <div className={styles.dataDiv}>
                        <div className={styles.labelText}>
                            Account Type
                        </div>
                        <div className={styles.valueText}>
                            Current Account
                        </div>
                    </div>
                    <div className={styles.dataDiv}>
                        <div className={styles.labelText}>
                            Account Type
                        </div>
                        <div className={styles.valueText}>
                            Current Account
                        </div>
                    </div>
                    <div className={styles.dataDiv}>
                        <div className={styles.labelText}>
                            Account Type
                        </div>
                        <div className={styles.valueText}>
                            Current Account
                        </div>
                    </div>
                    <div className={styles.dataDiv}>
                        <div className={styles.labelText}>
                            Account Type
                        </div>
                        <div className={styles.valueText}>
                            Current Account
                        </div>
                    </div>
                </div>
			</Accordion>
		</div>
	);
}

export default BankInfo;
