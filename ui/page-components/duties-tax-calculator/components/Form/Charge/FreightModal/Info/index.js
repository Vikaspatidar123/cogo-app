import { Tooltip } from '@cogoport/components';
import { IcMShip, IcMAirport, IcMPortArrow } from '@cogoport/icons-react';
import { useTranslation } from 'next-i18next';

import styles from './styles.module.css';

const getTagMapping = ({ t, transportMode }) => {
	const TAG_MAPPING = {
		OCEAN: [t('dutiesTaxesCalculator:freight_modal_ocean_tag_1'), t('d:freight_modal_ocean_tag_2'),
			t('d:freight_modal_ocean_tag_3')],
		AIR: [t('dutiesTaxesCalculator:freight_modal_air_tag_1'), t('dutiesTaxesCalculator:freight_modal_air_tag_2'),
			t('dutiesTaxesCalculator:freight_modal_air_tag_3'), t('dutiesTaxesCalculator:freight_modal_air_tag_4')],
	};
	return TAG_MAPPING[transportMode];
};

function Info({ transportMode, portDetails }) {
	const { t } = useTranslation(['dutiesTaxesCalculator']);
	const { origin = '', destination = '' } = portDetails || {};
	const TAG_MAPPING = getTagMapping({ transportMode, t });

	const renderName = (name) => {
		if (name.length > 16) {
			return (
				<Tooltip theme="light-border" content={name}>
					<div className={styles.tooltip_name}>
						{' '}
						{name.slice(0, 16)}
						...
					</div>
				</Tooltip>
			);
		}

		return name;
	};
	return (
		<div className={styles.row}>
			<div className={`${styles.col} ${styles.transport_details}`}>
				<div>
					{transportMode === 'OCEAN' ? (
						<IcMShip width={22} height={22} fill="#034AFD" />
					) : (
						<IcMAirport width={22} height={22} fill="#EF9B9B" />
					)}
				</div>
				<div className={styles.transport}>{transportMode}</div>
			</div>
			<div className={`${styles.row} ${styles.section}`}>
				<div className={`${styles.col} ${styles.port_detail}`}>
					<div className={styles.port_name}>{renderName(origin?.name)}</div>
					<IcMPortArrow width={15} height={15} />
					<div className={styles.port_name}>{renderName(destination?.name)}</div>
				</div>

				<div className={styles.col}>
					{TAG_MAPPING.map((ele) => (
						<div key={ele} className={styles.tag}>{ele}</div>
					))}
				</div>
			</div>
		</div>
	);
}

export default Info;
