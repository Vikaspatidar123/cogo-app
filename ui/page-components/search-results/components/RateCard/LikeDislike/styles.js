import styled from '@cogoport/front/styled';

export const Container = styled.div`
	cursor: pointer;
	position: relative;

	color: #828282;
	margin-right: 20px;

	&.active {
		color: #356efd;
	}

	&.dislike {
		transform: rotate(180deg);
	}
`;

export const Count = styled.div`
	position: absolute;
	top: -8px;
	left: 14px;
	background: #9befa8;
	border-radius: 4px;
	padding: 2px 4px;
	font-weight: 500;
	font-size: 10px;
	text-align: center;
	color: #000000;
	z-index: 1;
`;

export const MainContainer = styled.div`
	display: flex;

	@media (max-width: 768px) {
		padding-right: 0;
	}
`;
