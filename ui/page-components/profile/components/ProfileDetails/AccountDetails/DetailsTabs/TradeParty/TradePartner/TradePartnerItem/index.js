// import animate, { fadeIn } from '@cogoport/front/animate';
import { IcMEdit } from '@cogoport/icons-react';
import { getByKey, startCase } from '@cogoport/utils';
import { useTranslation } from 'next-i18next';

import UpArrowIconSvg from '../../icons/show-up-arrow.svg';
import getConfig from '../config';

import AdditionalDetails from './AdditionalDetails';
import styles from './styles.module.css';

import { useSelector } from '@/packages/store';

/**
 * @typedef  {Object} 	[props]
 * @property {Object} 	[orgResponse]
 * @property {Object} 	[tradePartyType]
 * @property {string} 	[activeTab]
 * @property {Object} 	[data]
 * @property {function} [getTradePartnerList]
 * @property {function} [onClickEditButton]
 * @property {string} 	[marginBottom]
 */
function TradePartnerItem(props) {
	const {
		general: { isMobile = false },
	} = useSelector((state) => state);

	const {
		orgResponse,
		tradePartyType,
		activeTab,
		data,
		onClickEditButton,
		marginBottom,
		showHiddenContent,
		onClickShowHiddenContent,
	} = props;

	const columnsData = {
		pan                : () => getByKey(data, 'registration_number'),
		country            : () => getByKey(data, 'country.display_name'),
		companyType        : () => startCase(getByKey(data, 'company_type')),
		verificationStatus : () => getByKey(data, 'verification_status'),
	};

	const companyName = getByKey(data, 'business_name');

	const config = getConfig();

	// const FadeIn = animate({
	// 	enter: {
	// 		...fadeIn,
	// 		easing   : 'easeInOutQuad',
	// 		duration : 500,
	// 	},
	// 	exit: {
	// 		opacity  : [1, 0],
	// 		duration : 300,
	// 	},
	// });

	return (
		<div className={styles.container} style={{ marginBottom }}>
			<div className={styles.company_details_container}>
				<div className={styles.company_name_container}>
					<div className={styles.company_title}>
						Company Name :
					</div>

					<div className={styles.company_name}>{companyName}</div>
				</div>

				<div
					role="presentation"
					className={styles.toggle_container}
					onClick={onClickShowHiddenContent}
				>
					<UpArrowIconSvg
						className={styles.up_arrow_icon_svg}
						style={{
							transform: ` rotate(${showHiddenContent ? '180deg' : '0deg'})`,
						}}
					/>
				</div>
			</div>

			<div className={styles.list_item}>
				<div className={styles.row_container}>
					{config.list.map((item) => {
						const { key, label } = item;

						return (
							<di className={styles.col_container} key={key}>
								{label && <div className={styles.column_heading}>{label}</div>}

								<div
									className={styles.column_value}
									style={{ marginBottom: isMobile && '8px' }}
								>
									{key === 'verificationStatus' ? (
										<div
											className={` ${styles.status} ${
												styles[columnsData[key]()]
											} `}
										>
											{startCase(columnsData[key]()) || '---'}
										</div>
									) : (
										columnsData[key]() || '---'
									)}
								</div>
							</di>
						);
					})}

					<div className={styles.edit_icon_container} onClick={onClickEditButton}>
						<IcMEdit height={16} width={16} />
					</div>
				</div>
			</div>

			{showHiddenContent && (
				<div type={showHiddenContent ? 'enter' : 'exit'}>
					<div className={styles.flex_container}>
						<AdditionalDetails
							orgResponse={orgResponse}
							tradePartyType={tradePartyType}
							activeTab={activeTab}
							data={data}
						/>
					</div>
				</div>
			)}
		</div>
	);
}

export default TradePartnerItem;
