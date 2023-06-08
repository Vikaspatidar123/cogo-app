import { IcMArrowBack } from '@cogoport/icons-react';

import MapContainer from '../../../common/MapContainer';

import styles from './styles.module.css';

import { useRouter } from '@/packages/next';

function Info({ MAPPING, prefillData, localStorageData }) {
	const { push } = useRouter();
	const {
		transportMode = '',
		exportCountry = {},
		importCountry = {},
	} = localStorageData || {};

	const renderDetails = (name) => {
		if (['hsCode', 'transportMode'].includes(name)) return prefillData?.[name];

		return (
			<div className={styles.country_info}>
				<img src={localStorageData?.[name]?.flag_icon_url} alt="" />
				<span>{prefillData?.[name]}</span>
			</div>
		);
	};

	return (
		<div className={styles.container}>
			<div className={styles.title_container}>
				<IcMArrowBack
					height={22}
					width={22}
					className={styles.back_arrow}
					onClick={() => {
						push('/saas/premium-services/import-export-doc');
					}}
				/>
				<h2>Documents Details</h2>
			</div>
			<div className={styles.map_container}>
				<MapContainer
					transportMode={transportMode}
					exportCountry={exportCountry}
					importCountry={importCountry}
				/>
			</div>
			<div className={styles.data_container}>
				<div className={styles.row}>
					{Object.keys(prefillData).map((item) => {
						if (!prefillData?.[item]) return null;
						return (
							<div className={styles.col}>
								<div className={styles.label}>{MAPPING?.[item]}</div>
								<div className={styles.value}>{renderDetails(item)}</div>
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
}

export default Info;
