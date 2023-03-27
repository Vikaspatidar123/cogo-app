import styled from '@cogoport/front/styled';

export const Container = styled.div`
	width: 100%;
	background: linear-gradient(99.65deg, #d2f8f2 14.21%, #a3d4ec 117.03%);
	margin-top: 15px;
	border-radius: 4px;
	padding: 15px;

	display: flex;
	justify-content: space-between;
	align-items: center;
`;

export const DetailCon = styled.div`
	display: flex;

	&.btn {
		display: flex;
		justify-content: flex-end;
	}
`;

export const DetailText = styled.div`
	font-weight: 700;
	font-size: 16px;
	line-height: 19px;
	color: #393f70;

	&.lead-text {
		font-weight: 400;
		font-size: 12px;
		color: #393f70;
	}
`;
