import styled from '@cogoport/front/styled';

export const Heading = styled.div`
	font-weight: 500;
	font-size: 28px;
	color: #2c3e50;
	margin-bottom: 24px;
`;

export const Container = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 33%;
	padding: 24px;

	@media (max-width: 768px) {
		width: 100%;
		flex-direction: row;
		padding: 16px 12px;
	}
`;

export const BottomText = styled.div`
	font-weight: 500;
	font-size: 28px;
	color: #033349;
	margin-bottom: 4px;
	text-align: center;

	@media (max-width: 768px) {
		font-size: 14px;
		text-align: unset;
	}
`;

export const SubText = styled.div`
	font-size: 16px;
	color: #828282;
	text-align: center;

	@media (max-width: 768px) {
		font-size: 12px;
		text-align: unset;
	}
`;

export const Content = styled.div`
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
`;

export const TextContainer = styled.div`
	@media (max-width: 768px) {
		display: flex;
		flex-direction: column;
		width: 70%;
		margin-left: 16px;
	}
`;
