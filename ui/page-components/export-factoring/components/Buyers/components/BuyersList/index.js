import { Accordion, Button } from '@cogoport/components';
import { IcMPlus } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import { useState } from 'react';

import AddPocModal from '../AddPocModal';
import PocDetails from '../PocDetails';

import styles from './styles.module.css';

import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';
import formatAmount from '@/ui/commons/utils/formatAmount';
import StatusBox from '@/ui/page-components/export-factoring/common/StatusBox';

const titleInfo = ({ company_name, buyer_approval_status }) => (
	<div className={styles.headerDiv}>
		<div className={styles.header}>
			{company_name}
		</div>
		<StatusBox status={buyer_approval_status} />
	</div>
);

function BuyersList({
	refetch,
	buyers = {},
	getCreditRequestResponse = {},
}) {
	const [openAddPoc, setOpenAddPoc] = useState(false);
	const {
		buyer_approval_status = '', company_name = '', payment_term = '', address_line_one = '',
		address_line_two = '', city = '', state = '', country = {}, zipcode = '',
		available_credit_limit = {}, poc_details = [],
	} = buyers || {};

	const {
		currency = GLOBAL_CONSTANTS.currency_code.USD,
		total_limit = '',
		utilized_amount = '',
	} = available_credit_limit || {};

	const utilizePercent = ((utilized_amount / total_limit) * 100)?.toFixed(2);

	return (
		<div className={styles.container}>
			<Accordion
				type="text"
				title={titleInfo({ company_name, buyer_approval_status })}
				style={{ width: '90%', margin: '10px 0px' }}
			>
				<div className={styles.flexDiv}>
					{buyer_approval_status === 'COMPLETED' && (
						<div className={styles.dataDiv}>
							<div className={styles.labelText}>
								Utilization
							</div>
							<div className={styles.valueText}>
								{formatAmount({
									amount  : utilized_amount,
									currency,
									options : {
										style                 : 'currency',
										currencyDisplay       : 'symbol',
										maximumFractionDigits : 2,
									},
								})}
								/
								{formatAmount({
									amount  : total_limit,
									currency,
									options : {
										style                 : 'currency',
										currencyDisplay       : 'symbol',
										maximumFractionDigits : 2,
									},
								})}
								&nbsp;(
								{utilizePercent || '-'}
								%)
								<div className={styles.barGraph}>
									<div
										className={styles.utilizeDiv}
										style={{ width: `${utilizePercent}%` }}
									/>
								</div>
							</div>
						</div>
					)}
					<div className={styles.dataDiv}>
						<div className={styles.labelText}>
							Payment Terms
						</div>
						<div className={styles.valueText}>
							{payment_term}
						</div>
					</div>
					<div className={styles.dataDiv}>
						<div className={styles.labelText}>
							Address
						</div>
						<div className={styles.valueText}>
							{address_line_one}
							,
							{' '}
							{address_line_two}
							,
							{city}
							,
							{state}
							,
							{' '}
							{country?.country_name}
							{' '}
							-
							{' '}
							{zipcode}
						</div>
					</div>
				</div>
				<div className={styles.horizontalLine} />
				<div className={styles.flexDiv} style={{ justifyContent: 'space-between' }}>
					<div>
						POC Details (
						{poc_details?.length}
						)
					</div>
					<Button
						themeType="accent"
						type="button"
						size="sm"
						onClick={() => setOpenAddPoc((pv) => !pv)}

					>
						<IcMPlus />
						Add POC
					</Button>
				</div>
				<div>
					{!isEmpty(poc_details) && poc_details?.map((poc) => (
						<PocDetails poc={poc} key={poc.id} />
					))}

				</div>
			</Accordion>
			{openAddPoc && (
				<AddPocModal
					refetch={refetch}
					openAddPoc={openAddPoc}
					setOpenAddPoc={setOpenAddPoc}
					buyers={buyers}
					getCreditRequestResponse={getCreditRequestResponse}
				/>
			)}
		</div>
	);
}

export default BuyersList;
