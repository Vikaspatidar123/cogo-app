import { cl, Button, Select } from '@cogoport/components';
import { IcAOceanTracking, IcAAirTracking } from '@cogoport/icons-react';
import { useState } from 'react';

import { headerFormOceanControls, headerFormAirControls } from '../../../configuration/headerFormControls';
import useGetListOperators from '../../../hooks/useGetListOperators';

import ImportCsvModal from './ImportCsvModal';
import OrTag from './OrTag';
import styles from './styles.module.css';

import { useForm } from '@/packages/forms';
import getField from '@/packages/forms/Controlled';

const options = [
	{
		value : 'ocean',
		label : (
			<div className={styles.options_container}>
				<IcAOceanTracking width={25} height={25} />
				<div className={styles.option_text}>Ocean</div>
			</div>
		),
	},
	{
		value : 'air',
		label : (
			<div className={styles.options_container}>
				<IcAAirTracking width={25} height={25} />
				<div className={styles.option_text}>Air</div>
			</div>
		),
	},
];

function Header() {
	const [toggle, setToggle] = useState('ocean');
	const [csvModal, setCsvModal] = useState(false);
	const { control } = useForm();

	const controls = toggle === 'air' ? headerFormAirControls : headerFormOceanControls;

	// const { loading, shippingLineList, airLineList } = useGetListOperators({ type: toggle });

	return (
		<div className={styles.container}>
			<h2>Track yours shipements!</h2>
			<div className={styles.form_container}>

				<div className={styles.row}>
					<Select
						className={styles.select_container}
						value={toggle}
						onChange={setToggle}
						options={options}
					/>

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
						<Button size="lg" type="button">Track</Button>
					</div>
					<div className={cl`${styles.col} ${styles.or_tag}`}>
						<OrTag />
					</div>
					<div className={styles.col}>
						<Button
							size="lg"
							type="button"
							themeType="accent"
							onClick={() => setCsvModal(true)}
						>
							Import .csv

						</Button>
					</div>
				</div>

			</div>
			<ImportCsvModal csvModal={csvModal} setCsvModal={setCsvModal} />
		</div>
	);
}
export default Header;
