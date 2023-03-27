import { Button } from '@cogoport/front/components/admin';
import React from 'react';
import { useSelector } from '@cogo/store';
import { Container, DetailCon, DetailText } from './styles';

const AddRate = ({ type, setAddRate = () => {} }) => {
	const { scope } = useSelector(({ general }) => ({
		scope: general?.scope,
	}));

	if (scope === 'app') {
		return <></>;
	}

	return (
		<Container>
			<DetailCon>
				<img
					src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/rates.svg"
					alt="rates"
					width={56}
					height={56}
				/>
				<div>
					<DetailText style={{ margin: '8px 0px 5px 0px' }}>
						{type !== 'rates-found'
							? 'No Rates Found!'
							: 'Not happy with the Rates Found ?'}
					</DetailText>

					<DetailText className="lead-text">
						Please add your sell price to book shipment. Make sure to gather
						market intelligence by talking to your customer, team members,
						managers, etc.
					</DetailText>
				</div>
			</DetailCon>

			<DetailCon className="btn">
				<Button
					onClick={() => {
						setAddRate(true);
					}}
					className="primary md"
				>
					Proceed With Booking
				</Button>
			</DetailCon>
		</Container>
	);
};

export default AddRate;
