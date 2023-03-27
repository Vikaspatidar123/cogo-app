import React from 'react';
import { Dot, LocationDiv } from './styles';

const ToolTipContent = ({ leftPincodes }) => {
	return (
		<>
			{(leftPincodes || []).map((item = {}) => {
				return (
					<LocationDiv>
						<Dot />
						{item.display_name}
					</LocationDiv>
				);
			})}
		</>
	);
};

export default ToolTipContent;
