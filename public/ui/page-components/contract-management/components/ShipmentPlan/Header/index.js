import { Placeholder, Tooltip, cl } from '@cogoport/components';
import { IcMArrowBack } from '@cogoport/icons-react';
import { startCase, upperCase } from '@cogoport/utils';
import React from 'react';

import { SERVICE_ICON_MAPPING } from '../../../configurations/service-icon-mapping';
import { STATUS } from '../../../constants';
import { getItemDisplayString } from '../../../utils/getDisplayNames';

import styles from './styles.module.css';

import { useRouter } from '@/packages/next';
import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';

const START_INDEX = GLOBAL_CONSTANTS.zeroth_index;
const END_INDEX = 3;

const MAPPING = {
	fcl_freight: {
		countKey : 'fcl_freight_count',
		itemType : 'Port Pair',
	},
	lcl_freight: {
		countKey : 'lcl_freight_count',
		itemType : 'Port Pair',
	},
	air_freight: {
		countKey : 'air_freight_count',
		itemType : 'AirPort Pair',
	},
};

function Header({ data, loading }) {
	const { back, query } = useRouter();
	const { through = '' } = query || {};

	const {
		contract_reference_id = '',
		contract_name = '',
		status = '',
		services = [],
		source = '',
	} = data || {};

	return (
		!loading ? (
			<div className={styles.container}>
				<div className={`${styles.section} ${styles.section_one}`}>

					<div className={styles.left}>
						<IcMArrowBack onClick={back} className={styles.icon} />
						{through === 'techops' && <div className={styles.custom_tag}>Tech Ops</div>}

						<div className={styles.custom_tag}>
							Contract ID :
							{' '}
							{contract_reference_id || '--'}
						</div>

						{contract_name ? (
							<Tooltip
								content={<div>{contract_name}</div>}
								placement="right"
							>
								<div className={styles.custom_tag}>
									Contract Name :
									{' '}
									{startCase(contract_name)}
								</div>
							</Tooltip>
						) : null}

						{status ? <div className={cl`${styles.status} ${styles[status]}`}>{STATUS[status]}</div> : null}

						{source ? (
							<div className={styles.status}>
								Created from
								{' '}
								{startCase(source)}
							</div>
						) : null}
					</div>
					{/* <Terms
							onClick={() => {
								setShowTerms(true);
							}}
						>
							Terms & Conditions
						</Terms> */}
				</div>
				<div className={styles.section}>

					<div className={styles.left}>
						{(services || []).map((type) => {
							const { countKey, itemType } = MAPPING[type];
							const count = getItemDisplayString({
								count: data?.[countKey] || 0,
								itemType,
							});

							return (
								<div key={type} className={styles.contract_info}>
									<div className={styles.service_icon}>{SERVICE_ICON_MAPPING[type]}</div>

									<div className={styles.service_name}>
										{upperCase(type).slice(START_INDEX, END_INDEX)}
									</div>

									<div className={styles.tag}>{count}</div>
								</div>
							);
						})}
					</div>
				</div>

			</div>
		) : (
			<Placeholder height="100px" width="100%" margin="10px 0px" />
		)
	);
}

export default Header;
