import styled from '@cogoport/front/styled';

export const Scroll = styled.div`
	overflow-y: auto;
	transition: all 0.3s;

	@media (max-width: 760px) {
		display: none;
	}
`;

export const Container = styled.div`
	background: #f9f9f9;
	border-radius: 10px;
	padding: 20px;
	margin-bottom: 20px;
	min-height: 344px;
	transition: all 0.3s;

	@media (max-width: 760px) {
		display: none;
	}
`;

export const Title = styled.h3`
	font-weight: bold;
	font-size: 22px;
	line-height: 26px;
	color: black;
	margin: 0 0 10px;
`;
