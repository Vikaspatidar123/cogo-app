import { cl, Select, Button } from '@cogoport/components';
import { IcAOceanTracking, IcAAirTracking } from '@cogoport/icons-react';
import { useTranslation } from 'next-i18next';

import useCreateTracker from '../../air-ocean-tracking/hooks/useCreateTracker';
import useGetOperatorList from '../../air-ocean-tracking/hooks/useGetOperatorList';

import styles from './styles.module.css';

import getField from '@/packages/forms/Controlled';

const getOptions = ({ t }) => [
	{
		value : 'ocean',
		label : (
			<div className={styles.options_container}>
				<IcAOceanTracking width={25} height={25} />
				<div className={styles.option_text}>{t('airOceanTracking:ocean_toggle_label')}</div>
			</div>
		),
	},
	{
		value : 'air',
		label : (
			<div className={styles.options_container}>
				<IcAAirTracking width={25} height={25} />
				<div className={styles.option_text}>{t('airOceanTracking:air_toggle_label')}</div>
			</div>
		),
	},
];

function Header() {
	const { t } = useTranslation(['common', 'airOceanTracking']);
	const options = getOptions({ t });
	const operatorData = useGetOperatorList();

	const {
		loading, formHook, trackingType, setTrackingType, controls,
		onSubmitHandler,
	} = useCreateTracker({ operatorData });

	const { control, handleSubmit, formState:{ errors } } = formHook;

	return (
		<div className={styles.container}>
			<div className={cl`${styles.text} ${styles.text_box}`}>
				Track all your Shipments with
				<span className={styles.title}> Cogoport Track & Trace!</span>

			</div>
			<div className={styles.form_container}>

				<div className={styles.row}>
					<Select
						className={styles.select_container}
						value={trackingType}
						onChange={setTrackingType}
						options={options}
						style={{ width: '120px' }}
					/>

					{controls.map((controlItem) => {
						const { name, type } = controlItem;
						const Element = getField(type);

						return (
							<div key={name} className={cl`${styles.col} ${styles.form_col}`}>
								<Element {...controlItem} control={control} />
								<p className={styles.errors}>{errors?.[name]?.message || errors?.[name]?.type}</p>
							</div>
						);
					})}
					<div className={styles.col}>
						<Button
							size="lg"
							type="button"
							className={styles.heading_btn}
							loading={loading}
							onClick={handleSubmit(onSubmitHandler)}
						>
							{t('airOceanTracking:track_button_label')}
						</Button>
					</div>

				</div>
			</div>
		</div>
	);
}

export default Header;
