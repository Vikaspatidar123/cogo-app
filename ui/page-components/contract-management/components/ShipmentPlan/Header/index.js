// import Modal from '@cogoport/front/components/admin/Modal';

import { Placeholder, Tooltip, cl } from '@cogoport/components';
import { IcMArrowBack } from '@cogoport/icons-react';
import { format, startCase, upperCase } from '@cogoport/utils';
import React from 'react';

// import TermsAndConditionsModal from '../../../common/TermsAndConditionsModal';

import { SERVICE_ICON_MAPPING } from '../../../configurations/service-icon-mapping';
import { STATUS } from '../../../constants';

import styles from './styles.module.css';

import { useRouter } from '@/packages/next';
import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';
import formatDate from '@/ui/commons/utils/formatDate';

function Header({ data, loading }) {
	const { back, query } = useRouter();
	// const [showTerms, setShowTerms] = useState(false);
	const { through = '' } = query || {};
	const {
		contract_reference_id = '',
		contract_name = '',
		status = '',
		services = [],
		fcl_freight_count = 0,
		lcl_freight_count = 0,
		air_freight_count = 0,
		validity_left_days = '',
		validity_start_date = '',
		validity_end_date = '',
		source = '',
	} = data || {};
	return (
		<>
			{' '}
			{!loading ? (
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
							{contract_name && (
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
							)}
							{status && <div className={cl`${styles.status} ${styles[status]}`}>{STATUS[status]}</div>}
							{source && (
								<div className={styles.status}>
									Created from
									{startCase(source)}
								</div>
							)}
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
								let count;
								if (type === 'fcl_freight') {
									count = fcl_freight_count;
								} else if (type === 'lcl_freight') {
									count = lcl_freight_count;
								} else if (type === 'air_freight') {
									count = air_freight_count;
								}
								return (
									<div className={styles.contract_info}>
										<div className={styles.service_icon}>{SERVICE_ICON_MAPPING[type]}</div>
										<div className={styles.service_name}>{upperCase(type).slice(0, 3)}</div>
										<div className={styles.tag}>
											{count}
											{' '}
											Port Pairs
										</div>
									</div>
								);
							})}
						</div>

						<div className={styles.right}>
							<div className={styles.validity}>
								Validity :
								{' '}
								{formatDate({
									date: validity_start_date,
									dateFormat: GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
									formatType: 'date',
								})}
								{' '}
								to
								{' '}
								{formatDate({
									date: validity_end_date,
									dateFormat: GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
									formatType: 'date',
								})}
								{validity_left_days && status === 'active' && (
									<span>
										{validity_left_days}
										{' '}
										Days left
									</span>
								)}
							</div>
						</div>
					</div>
					{/* <Modal
						show={showTerms}
						className="primary lg"
						onClose={() => setShowTerms(false)}
						onOuterClick={() => setShowTerms(false)}
					>
						<TermsAndConditionsModal setShowTerms={setShowTerms} />
					</Modal> */}
				</div>
			) : (
				<Placeholder height="100px" width="100%" margin="10px 0px" />
			)}
		</>
	);
}

export default Header;
