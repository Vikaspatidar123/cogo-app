import styled from '@cogoport/front/styled';

export const Container = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	align-items: center;
	gap: 16px;
	flex-wrap: wrap;
`;

export const Box = styled.div`
	background: #f6f5fe;
	border-radius: 4px;
	padding: 4px;

	color: #393f70;

	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	gap: 4px;

	&.transit_insurance {
		background-color: #fff4d0;
	}
`;
