// import MapContainer from '../../../common/MapContainer';

import styles from './styles.module.css';

const COUNTRY_ARR = ['exportCountry', 'importCountry', 'manufacturingCountry'];
const HS_CODE_ARR = ['importHsCode', 'exportHsCode'];

function Info({ MAPPING, prefillData = {}, localStorageData = {} }) {
	const renderDetails = (name) => {
		if (COUNTRY_ARR.includes(name)) {
			return (
				<div className={styles.country_info}>
					<img src={localStorageData?.[name]?.flag_icon_url} alt="" />
					<span>{prefillData?.[name]}</span>
				</div>
			);
		}
		if (HS_CODE_ARR.includes(name)) {
			return <span className={styles.hsCode}>{prefillData?.[name]}</span>;
		}
		return prefillData?.[name];
	};

	return (
		<div className={styles.container}>
			<div className={styles.map_container}>
				{/* <MapContainer formInfo={localStorageData} height="300px" /> */}
			</div>
			<div className={styles.data_container}>
				<div className={styles.row}>
					{(Object.keys(prefillData) || []).map((item) => {
						if (!prefillData?.[item]) return null;
						return (
							<div className={styles.col} key={item}>
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
