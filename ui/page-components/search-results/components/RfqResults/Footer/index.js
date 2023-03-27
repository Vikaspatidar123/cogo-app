import React from 'react';
import { useSelector } from '@cogo/store';
import { Button } from '@cogoport/front/components';
import useSaveRfq from '../../../hooks/useSaveRfq';
import { Container, ButtonWrap } from './styles';

const Footer = ({
	total = 1,
	hookSetters = () => {},
	bookedRates = [],
	id = '',
	data = {},
	filters = {},
	setBookedRates = () => {},
	rates = [],
	serial_id = 1,
	intLoading = false,
}) => {
	const { isMobile } = useSelector(({ general }) => ({ isMobile: general?.isMobile }));

	const { loading, handlePrevious, handleOverview, handleSave } = useSaveRfq({
		total,
		hookSetters,
		bookedRates,
		id,
		data,
		filters,
		setBookedRates,
		serial_id,
	});

	const divLoading = intLoading || loading;

	return (
		<Container>
			<Button
				style={{
					marginLeft : isMobile ? '10px' : '40px',
					color      : divLoading ? '#ffffff' : '#333333',
					background : divLoading ? '#c2c2c2' : '#ffffff',
					border     : divLoading ? '1px solid #c2c2c2' : '1px solid #333333',
				}}
				disabled={divLoading}
				onClick={handleOverview}
			>
				Skip to overview
			</Button>

			<ButtonWrap>
				{serial_id !== 1
					? (
						<Button
							style={{
								background   : divLoading ? '#c2c2c2' : '#ffffff',
								border       : divLoading ? '1px solid #c2c2c2' : 'none',
								color        : divLoading ? '#ffffff' : '#333333',
								marginRight  : '10px',
								marginBottom : isMobile ? '10px' : '0px',
							}}
							disabled={divLoading}
							onClick={() => handlePrevious()}
						>
							Previous
						</Button>
					) : null}

				<Button
					style={{ marginLeft: 'auto', marginRight: isMobile ? '10px' : '20px' }}
					onClick={handleSave}
					disabled={divLoading}
				>
					{rates.length ? 'Proceed & Save' : 'Proceed'}
				</Button>
			</ButtonWrap>
		</Container>
	);
};

export default Footer;
