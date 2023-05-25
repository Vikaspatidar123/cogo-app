import { IcMTracking, IcMFsea, IcMFairport, IcMFftl } from '@cogoport/icons-react';

import styles from './styles.module.css';

const segementedOpt = (summaryData, activeTab, summaryLoading) => [
	{
		suffix: (
			<>
				{activeTab === 'ALL' && !summaryLoading ? (
					<div className={styles.count}>{summaryData?.totalPolicies}</div>
				) : (
					<div className={styles.text}>{summaryData?.totalPolicies}</div>
				)}
				{activeTab === 'ALL' && summaryLoading && (
					<img
						src="https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/loading.svg"
						alt=""
						style={{ width: '16px', height: '16px' }}
					/>
				)}
			</>
		),
		key: 'ALL',
		prefix:
	<div className={styles.code_div}>
		<IcMTracking fill="#BDBDBD" width={18} height={18} />
		<div>All</div>
	</div>,
		backgroundColor : '#7278ad',
		color           : '#eee7e7',
	},
	{
		suffix: (
			<>
				{activeTab === 'OCEAN' && !summaryLoading ? (
					<div className={styles.count}>{summaryData?.oceanTransitPolicies}</div>
				) : (
					<div className={styles.text}>{summaryData?.oceanTransitPolicies}</div>
				)}
				{activeTab === 'OCEAN' && summaryLoading && (
					<img
						src="https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/loading.svg"
						alt=""
						style={{ width: '16px', height: '16px' }}
					/>
				)}
			</>
		),
		key: 'OCEAN',
		prefix:
	<div className={styles.code_div}>
		<IcMFsea fill="#BDBDBD" width={18} height={18} />
		<div>Ocean</div>
	</div>,
		backgroundColor : '#7278ad',
		color           : '#eee7e7',
	},
	{
		suffix: (
			<div className={styles.code_div}>
				<div>Air</div>
				{activeTab === 'AIR' && !summaryLoading ? (
					<div className={styles.count}>{summaryData?.airTransitPolicies}</div>
				) : (
					<div className={styles.text}>{summaryData?.airTransitPolicies}</div>
				)}
				{activeTab === 'AIR' && summaryLoading && (
					<img
						src="https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/loading.svg"
						alt=""
						style={{ width: '16px', height: '16px' }}
					/>
				)}
			</div>
		),
		key             : 'AIR',
		prefix          : <IcMFairport fill="#BDBDBD" width={18} height={18} />,
		backgroundColor : '#7278ad',
		color           : '#eee7e7',
	},
	{
		suffix: (
			<div className={styles.code_div}>
				<div>Surface</div>
				{activeTab === 'ROAD' && !summaryLoading ? (
					<div className={styles.count}>{summaryData?.surfaceTransitPolicies}</div>
				) : (
					<div className={styles.text}>{summaryData?.surfaceTransitPolicies}</div>
				)}
				{activeTab === 'ROAD' && summaryLoading && (
					<img
						src="https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/loading.svg"
						alt=""
						style={{ width: '16px', height: '16px' }}
					/>
				)}
			</div>
		),
		key             : 'ROAD',
		prefix          : <IcMFftl fill="#BDBDBD" width={18} height={18} />,
		backgroundColor : '#7278ad',
		color           : '#eee7e7',
	},
];

export default segementedOpt;
