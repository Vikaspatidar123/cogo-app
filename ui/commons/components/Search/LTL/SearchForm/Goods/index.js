import { Popover } from '@cogoport/components';
import { isEmpty, startCase } from '@cogoport/utils';
import React, { useState, forwardRef } from 'react';

import GoodsDetails from './GoodsDetails';
// import {
// 	Container,
// 	Label,
// 	GoodsContent,
// 	TermsContainer,
// 	DetailsContainer,
// 	Details,
// 	ErrorMsg,
// } from './styles';
import styles from './styles.module.css';

import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';
import formatDate from '@/ui/commons/utils/formatDate';

function Goods({ searchData = {}, error }, ref) {
	const { detail = {} } = searchData || {};

	const [goodsDetail, setGoodsDetail] = useState(() => {
		if (!isEmpty(detail)) {
			return {
				cargoDate : detail?.cargo_readiness_date,
				commodity : detail?.commodity || 'all',
				cargoType : detail?.commodity_type,
			};
		}
		return {
			cargoDate : new Date(),
			cargoType : 'general_cargo',
			commodity : 'all',
		};
	});

	const [showPopover, setShowPopover] = useState(false);

	const content = () => (
		<div className={styles.goods_content}>
			<GoodsDetails
				setGoodsDetail={setGoodsDetail}
				goodsDetail={goodsDetail}
				setShowPopover={setShowPopover}
				searchData={searchData}
				ref={ref}
			/>
		</div>
	);

	const showFilledDetails = () => (
		<div className={styles.details_container}>
			<div className={styles.details}>
				{formatDate({
        	date       : goodsDetail?.cargoDate,
        	dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
        	formatType : 'date',
				})}
			</div>

			<div className={styles.details}>
				{goodsDetail?.cargoType === 'general_cargo' ? 'General' : 'Special'}
			</div>

			<div className={styles.details}>{startCase(goodsDetail?.commodity)}</div>
		</div>
	);
	return (
		<div className={styles.container}>
			<div className={styles.label}>Goods</div>
			<Popover
				render={content()}
				interactive
				animation="shift-away"
				visible={showPopover}
				placement="bottom"
			>
				<div>
					<div
						className={styles.terms_container}
						onClick={() => setShowPopover(!showPopover)}
					>
						{isEmpty(goodsDetail) ? (
							<div className="text">Select</div>
						) : (
            	showFilledDetails()
						)}
					</div>
					{error ? (
						<div className={styles.error_msg}>Goods are required</div>
					) : null}
				</div>
			</Popover>
		</div>
	);
}

export default forwardRef(Goods);
