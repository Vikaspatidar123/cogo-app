import { useTranslation } from 'next-i18next';

import MapContainer from '../../../common/MapContainer';
import { getLabelMapping } from '../../../constant/lableMapping';

import styles from './styles.module.css';

const getMapping = ({ t }) => {
	const COUNTRY_ARR = [t('importExportControls:checkout_country_arr_1'),
		t('importExportControls:checkout_country_arr_2'), t('importExportControls:checkout_country_arr_3')];
	const HS_CODE_ARR = [t('importExportControls:checkout_hscode_arr_1'),
		t('importExportControls:checkout_hscode_arr_1')];

	return { COUNTRY_ARR, HS_CODE_ARR };
};

function Info({ prefillData = {}, localStorageData = {} }) {
	const { t } = useTranslation(['importExportControls']);

	const { COUNTRY_ARR, HS_CODE_ARR } = getMapping({ t });
	const LABEL_MAPPING = getLabelMapping({ t });

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
				<MapContainer formInfo={localStorageData} height="300px" />
			</div>
			<div className={styles.data_container}>
				<div className={styles.row}>
					{(Object.keys(prefillData) || []).map((item) => {
						if (!prefillData?.[item]) return null;
						return (
							<div className={styles.col} key={item}>
								<div className={styles.label}>{LABEL_MAPPING?.[item]}</div>
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
