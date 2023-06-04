import { Button, Checkbox, Chips } from '@cogoport/components';
import { IcMPlus } from '@cogoport/icons-react';

import styles from '../styles.module.css';

function Form({
	addAddressControls = [],
	returnFeildFunction = () => {},
	showPoc = false,
	setShowPoc = () => {},
	checked = false,
	setChecked = () => {},
	addressType = '',
	setAddressType = () => {},
}) {
	const taxNumber = addAddressControls?.slice(6)?.[0];

	const OPTIONS = [
		{
			children : 'Factory',
			key      : 'factory',
		},
		{
			children : 'Office',
			key      : 'office',
		},
		{
			children : 'Ware House',
			key      : 'warehouse',
		},
	];

	return (
		<div className={styles.section}>
			<div className={styles.section_title}>
				<div className={styles.billing_title}>
					Billing Details
				</div>
			</div>
			<div className={styles.row}>
				{(addAddressControls || []).map((item, index) => {
					if (index < 6) {
						return returnFeildFunction({ item });
					}
					return null;
				})}
			</div>
			<div className={styles.checkbox_wrapper}>
				<Checkbox
					checked={checked}
					onChange={() => {
						setChecked(!checked);
						if (!checked) {
							setShowPoc(false);
						}
					}}
				/>
				<div className={styles.gst}>
					Include Tax Number
				</div>
			</div>
			{taxNumber && checked && (
				<>
					{returnFeildFunction({ item: taxNumber })}
					{!showPoc && (
						<Button
							themeType="accent"
							onClick={() => setShowPoc(!showPoc)}
							className={styles.poc_button}
						>
							<IcMPlus />
							Add POC
						</Button>
					)}
				</>
			)}
			<div className={styles.row}>
				{(addAddressControls || []).map((item, index) => {
					if (index > 6 && showPoc && checked) {
						return <>{returnFeildFunction({ item })}</>;
					}
					return null;
				})}
			</div>
			{!checked && (
				<div className={`${styles.checkbox_wrapper} ${styles.address_type}`}>
					<div className={styles.address_save}>
						Save address as
					</div>
					<div className={styles.checkbox_wrapper}>
						<Chips
							selectedItems={addressType}
							onItemChange={(e) => {
								setAddressType(e);
							}}
							items={OPTIONS}
						/>
					</div>
				</div>
			)}
		</div>
	);
}

export default Form;
