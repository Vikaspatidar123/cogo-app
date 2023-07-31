import { IcMArrowBack } from '@cogoport/icons-react';
import { useTranslation } from 'next-i18next';

import styles from './styles.module.css';

import { Image, useRouter } from '@/packages/next';
import MapContainer from '@/ui/commons/components/CogoMaps2';

const getMapping = ({ t }) => ({
	exportCountry        : t('importExportDoc:document_control_export_label'),
	importCountry        : t('importExportDoc:document_control_import_label'),
	transportMode        : t('importExportDoc:document_control_transport_label'),
	manufacturingCountry : t('importExportDoc:document_control_manufacture_label'),
	hsCode               : t('importExportDoc:document_control_hscode_label'),
});

function Info({ prefillData, localStorageData }) {
	const { push } = useRouter();
	const { t } = useTranslation(['importExportDoc']);

	const MAPPING = getMapping({ t });

	const renderDetails = (name) => {
		if (['hsCode', 'transportMode'].includes(name)) return prefillData?.[name];
		const flagUrl = localStorageData?.[name]?.flag_icon_url;
		return (
			<div className={styles.country_info}>
				{flagUrl && <Image width={20} height={20} src={flagUrl} alt="" />}
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
				<h2>{t('importExportDoc:checkout_info_title')}</h2>
			</div>
			<div className={styles.map_container}>
				<MapContainer
					formInfo={localStorageData}
					mapZoom={3.7}
					// transportMode={transportMode}
					// exportCountry={exportCountry}
					// importCountry={importCountry}
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
