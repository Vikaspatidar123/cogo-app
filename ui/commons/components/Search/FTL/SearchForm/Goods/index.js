import React, { useState, forwardRef } from 'react';
import { Popover } from '@cogoport/front/components/admin';
import isEmpty from '@cogo/utils/isEmpty';
import { startCase } from '@cogoport/front/utils';
import formatDate from '@cogo/globalization/utils/formatDate';
import GLOBAL_CONSTANTS from '@cogo/globalization/constants/globals.json';
import {
	Container,
	Label,
	GoodsContent,
	TermsContainer,
	DetailsContainer,
	Details,
	ErrorMsg,
} from './styles';
import GoodsDetails from './GoodsDetails';

const Goods = ({ searchData = {}, error, typeOfJourney = '' }, ref) => {
	const { detail = {} } = searchData || {};

	const [goodsDetail, setGoodsDetail] = useState(() => {
		if (!isEmpty(detail)) {
			return {
				cargoDate: detail.cargo_readiness_date,
				commodity: detail.commodity ? detail.commodity : 'all',
				cargoType: detail.commodity_type,
			};
		}

		return {
			cargoDate: new Date(),
			cargoType: 'general_cargo',
			commodity: 'all',
		};
	});

	const [showPopover, setShowPopover] = useState(false);

	const content = () => {
		return (
			<GoodsContent>
				<GoodsDetails
					setGoodsDetail={setGoodsDetail}
					goodsDetail={goodsDetail}
					showPopover={showPopover}
					setShowPopover={setShowPopover}
					searchData={searchData}
					ref={ref}
				/>
			</GoodsContent>
		);
	};

	const showFilledDetails = () => {
		return (
			<DetailsContainer>
				<Details>
					{formatDate({
						date: goodsDetail.cargoDate,
						dateFormat: GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
						formatType: 'date',
					})}
				</Details>

				<Details>
					{goodsDetail.cargoType === 'general_cargo' ? 'General' : 'Special'}
				</Details>

				<Details>{startCase(goodsDetail.commodity)}</Details>
			</DetailsContainer>
		);
	};
	return (
		<Container>
			<Label>Goods</Label>
			<Popover
				theme="light"
				content={content()}
				interactive
				animation="shift-away"
				visible={showPopover}
			>
				<div
					style={{
						pointerEvents: typeOfJourney === 'round' ? 'none' : null,
					}}
				>
					<TermsContainer onClick={() => setShowPopover(!showPopover)}>
						{isEmpty(goodsDetail) ? (
							<div className="text">Select</div>
						) : (
							showFilledDetails()
						)}
					</TermsContainer>
					{error ? <ErrorMsg>Goods are required</ErrorMsg> : null}
				</div>
			</Popover>
		</Container>
	);
};

export default forwardRef(Goods);
