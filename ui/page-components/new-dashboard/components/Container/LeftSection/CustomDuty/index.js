import { Input, Select, Button } from '@cogoport/components';
import Image from 'next/image';

import styles from './styles.module.css';

function CustomDuty() {
	return (
		<div className={styles.container}>
			<div className={styles.text}>Custom Duty Calculator</div>
			<div className={styles.des}>Lorem ipsum dolor sit amet, consectetur adipiscing elit,</div>
			<div className={styles.seaction}>
				<div>
					<Input size="sm" className={styles.input_box} placeholder="Origin" />
					<Input size="sm" className={styles.input_box} placeholder="Destination" />
					<Select size="sm" className={styles.input_box} placeholder="Mode of Transport" />
					<Button themeType="accent" className={styles.button}>Check Now!</Button>
				</div>
				<div>
					<img
						width={200}
						height={200}
						src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIs6INuRlF426AseYxSgdlJP0OxojbkKmp6A&usqp=CAU"
						alt=""
					/>
				</div>
			</div>
		</div>
	);
}
export default CustomDuty;
