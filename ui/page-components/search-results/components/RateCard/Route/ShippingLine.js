import React from 'react';
import { ShippingLine, Tooltip } from './styles';

const ShippingLineComp = ({
	show = false,
	showLogo = false,
	data = {},
	className = '',
	isMobile,
}) => (
	<Tooltip
		className={`${show ? '' : 'not-show'} ${className || ''} ${
			isMobile ? 'mobile' : 'web'
		}`}
	>
		{showLogo ? (
			<img
				src={showLogo}
				alt={data?.shipping_line?.short_name || data?.airline?.short_name}
				style={{ height: '24px' }}
			/>
		) : null}
		{data?.source === 'cogo_assured_rate' ? (
			<ShippingLine>Cogoport Assured</ShippingLine>
		) : (
			<ShippingLine>
				{data?.shipping_line?.short_name || data?.airline?.short_name}
			</ShippingLine>
		)}
	</Tooltip>
);

export default ShippingLineComp;
