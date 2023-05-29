import { cl, Toggle, Button } from '@cogoport/components';
import { useState } from 'react';

import { headerFormOceanControls, headerFormAirControls } from '../../../configuration/headerFormControls';

import OrTag from './OrTag';
import styles from './styles.module.css';

import { useForm } from '@/packages/forms';
import getField from '@/packages/forms/Controlled';

function Header() {
	const [toggle, setToggle] = useState(false);

	const { control } = useForm();

	const controls = toggle ? headerFormAirControls : headerFormOceanControls;
	return (
		<div className={styles.container}>
			<h2>Track yours shipements!</h2>
			<div className={styles.form_container}>
				<Toggle
					onLabel="Air Tracking"
					offLabel="Ocean Tracking"
					checked={toggle}
					onChange={(e) => setToggle(e.target.checked)}
				/>

				<div className={styles.row}>
					{controls.map((controlItem) => {
						const { name, type } = controlItem;
						const Element = getField(type);

						return (
							<div key={name} className={cl`${styles.col} ${styles.form_col}`}>
								<Element {...controlItem} control={control} />
							</div>
						);
					})}
					<div className={styles.col}>
						<Button size="lg" themeType="accent">Track</Button>
					</div>
					<div className={cl`${styles.col} ${styles.or_tag}`}>
						<OrTag />
					</div>
					<div className={styles.col}>
						<Button size="lg" themeType="accent">Import .csv</Button>
					</div>
				</div>

			</div>

		</div>
	);
}
export default Header;
