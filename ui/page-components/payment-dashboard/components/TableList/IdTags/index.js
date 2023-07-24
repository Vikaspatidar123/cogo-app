import { Flex, ToolTip } from '@cogoport/front/components';
import React from 'react';

const tagStyle = {
	padding: '2px 4px',
	backgroundColor: '#E6FBE9',
	marginRight: '8px',
	borderRadius: '4px',
	textAlign: 'center',
	fontSize: '10px',
};

const tagStyles = {
	padding: '2px 4px',
	backgroundColor: '#E6FBE9',
	marginRight: '8px',
	borderRadius: '4px',
	width: '38px',
	textAlign: 'center',
	fontSize: '10px',
};
const IdTags = ({ invoices }) => {
	// console.log(invoices, 'sdsjhd');
	const str = (invoices || [])?.toString()?.split(',')?.join(' , \n');
	const invoice = invoices?.[0] || '';
	if (invoices?.length > 1) {
		return (
			<Flex>
				<ToolTip placement="right" content={str}>
					<Flex>
						<div style={tagStyle}>{invoice}</div>
						<div style={tagStyles}>+ {invoices?.length - 1} More</div>
					</Flex>
				</ToolTip>
			</Flex>
		);
	}
	return invoices?.length === 1 ? (
		<div style={tagStyle}>{invoices?.[0]}</div>
	) : (
		''
	);
};

export default IdTags;
