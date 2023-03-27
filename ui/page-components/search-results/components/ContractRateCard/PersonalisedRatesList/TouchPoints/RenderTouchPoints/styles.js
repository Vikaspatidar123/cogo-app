import styled from '@cogoport/front/styled';

export const LocationDiv = styled.div`
	position: relative;
	margin-bottom: 16px;
`;

export const Dot = styled.div`
	width: 14px;
	height: 14px;
	background-color: #5936f0;
	border-radius: 50%;
	position: absolute;
	left: -10px;
	top: 10px;
	transform: translateY(-50%);
	z-index: 1;
`;

export const HorizontalLine = styled.div`
	position: absolute;
	height: 100%;
	width: 2px;
	left: -5px;
	top: 18px;
	display: flex;
	border: 2px dashed #5936f0;
`;

export const Container = styled.div`
	.box:last-child .line {
		display: none;
	}
`;

export const Location = styled.div`
	margin-left: 16px;
`;
