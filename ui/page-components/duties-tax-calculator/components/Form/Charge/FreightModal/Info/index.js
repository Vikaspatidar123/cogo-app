import { Tooltip } from '@cogoport/components';
import { IcMShip, IcMAirport, IcMPortArrow } from '@cogoport/icons-react';
import { useTranslation } from 'next-i18next';

import styles from './styles.module.css';

import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';

const MAX_NAME_LENGTH = 16;
const ZEROTH_INDEX = GLOBAL_CONSTANTS.zeroth_index;

const getTagMapping = ({ t, transportMode }) => {
	const TAG_MAPPING = {
		OCEAN: [t('dutiesTaxesCalculator:freight_modal_ocean_tag_1'),
			t('dutiesTaxesCalculator:freight_modal_ocean_tag_2'), t('dutiesTaxesCalculator:freight_modal_ocean_tag_3')],
		AIR: [t('dutiesTaxesCalculator:freight_modal_air_tag_1'), t('dutiesTaxesCalculator:freight_modal_air_tag_2'),
			t('dutiesTaxesCalculator:freight_modal_air_tag_3'), t('dutiesTaxesCalculator:freight_modal_air_tag_4')],
	};
	return TAG_MAPPING[transportMode];
};

function RenderName({ name }) {
	const stringifyName = name.toString();
	if (stringifyName.length < MAX_NAME_LENGTH) return name;

	return (
		<Tooltip theme="light-border" content={name}>
			<div className={styles.tooltip_name}>
				{' '}
				{stringifyName.slice(ZEROTH_INDEX, MAX_NAME_LENGTH)}
				...
			</div>
		</Tooltip>
	);
}

function Info({ transportMode, portDetails }) {
	const { t } = useTranslation(['dutiesTaxesCalculator']);
	const { origin = '', destination = '' } = portDetails || {};
	const TAG_MAPPING = getTagMapping({ transportMode, t });

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
					<div className={styles.port_name}><RenderName name={origin?.name} /></div>
					<IcMPortArrow width={15} height={15} />
					<div className={styles.port_name}><RenderName name={destination?.name} /></div>
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
