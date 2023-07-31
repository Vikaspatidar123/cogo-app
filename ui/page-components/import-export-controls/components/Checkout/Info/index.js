import { useTranslation } from 'next-i18next';

import { getLabelMapping } from '../../../constant/lableMapping';

import styles from './styles.module.css';

import { Image } from '@/packages/next';
import MapContainer from '@/ui/commons/components/CogoMaps2';

const getMapping = ({ t }) => {
	const COUNTRY_ARR = [t('importExportControls:checkout_country_arr_1'),
		t('importExportControls:checkout_country_arr_2'), t('importExportControls:checkout_country_arr_3')];
	const HS_CODE_ARR = [t('importExportControls:checkout_hscode_arr_1'),
		t('importExportControls:checkout_hscode_arr_1')];

	return { COUNTRY_ARR, HS_CODE_ARR };
};

function RenderDetails({ name, prefillData = {}, localStorageData = {} }) {
	const { t } = useTranslation(['importExportControls']);

	const { COUNTRY_ARR, HS_CODE_ARR } = getMapping({ t });
	const imageUrl = localStorageData?.[name]?.flag_icon_url;

	if (COUNTRY_ARR.includes(name)) {
		return (
			<div className={styles.country_info}>
				{imageUrl ? (
					<Image
						src={imageUrl}
						alt={t('importExportControls:alt_flag')}
						width={23}
						height={23}
					/>
				) : null}
				<span>{prefillData?.[name]}</span>
			</div>
		);
	}
	if (HS_CODE_ARR.includes(name)) {
		return <span className={styles.hsCode}>{prefillData?.[name]}</span>;
	}
	return <span>{prefillData?.[name]}</span>;
}

function Info(props) {
	const { prefillData = {}, localStorageData = {} } = props;
	const { t } = useTranslation(['importExportControls']);

	const LABEL_MAPPING = getLabelMapping({ t });

	return (
		<div className={styles.container}>
			<div className={styles.map_container}>
				<MapContainer formInfo={localStorageData} height="300px" mapZoom={3} />
			</div>
			<div className={styles.data_container}>
				<div className={styles.row}>
					{(Object.keys(prefillData) || []).map((item) => {
						if (!prefillData?.[item]) return null;
						return (
							<div className={styles.col} key={item}>
								<div className={styles.label}>{LABEL_MAPPING?.[item]}</div>
								<div className={styles.value}>
									<RenderDetails name={item} {...props} />
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
}

export default Info;
