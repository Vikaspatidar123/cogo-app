import { ButtonIcon, Button, Popover, Input } from '@cogoport/components';
import { IcMDelete } from '@cogoport/icons-react';

import styles from './styles.module.css';

function ProductField() {
	return (
		<div className={styles.container}>
			{/* <Button className="text primary lg cta" onClick={() => setShowHsCodeModal(true)}>
				<IcMPlusInCircle width={16} height={16} />
				Add HS Code
			</Button> */}
			<div className={styles.input_box_container}>
				<div className={styles.col} style={{ width: '20%' }}>
					<p className={styles.label}>HS Code</p>
					<Input
						size="sm"
						placeholder="HS Code"
						disabled
					/>
				</div>
				<div className={styles.col} style={{ width: '45%' }}>
					<p className={styles.label}>HS Code</p>
					<Popover>
						<div>
							<Input
								size="sm"
								placeholder="Product Name"
								disabled
							/>
						</div>
					</Popover>
				</div>
				<div style={{ width: '15%' }}>
					<Button themeType="accent">Validate</Button>
				</div>
				<div>
					<ButtonIcon size="lg" icon={<IcMDelete />} themeType="primary" />
				</div>
			</div>

		</div>
	);
}

export default ProductField;
