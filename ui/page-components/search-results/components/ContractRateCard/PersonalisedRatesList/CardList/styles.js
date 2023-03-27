import styled from '@cogoport/front/styled';
import { IcMArrowDown } from '@cogoport/icons-react';

export const Container = styled.div`
	background: #ffffff;
	border-radius: 4px 14px 4px 4px;
	padding: 20px;
	min-height: 200px;
	margin: 30px 0;
	position: relative;
	box-shadow: 0 4px 10px rgba(0, 0, 0, 0.25);

	.accordion[aria-expanded='false'] {
		max-height: 0;
		transition: max-height 0.5s;
		overflow: hidden;
	}

	.accordion[aria-expanded='true'] {
		max-height: 1000px;
		transition: max-height 0.5s;
		overflow: hidden;
	}
`;

export const CustomText = styled.div`
	font-style: italic;
	font-weight: 400;
	font-size: 12px;
	color: #000000;
`;

export const ToggleIcon = styled(IcMArrowDown)`
	width: 12px;
	height: 12px;
	margin-left: 5px;

	transition: all 0.8s ease-in-out;

	transform: ${({ toggleDropdown }) =>
		toggleDropdown ? 'rotate(180deg)' : 'rotate(360deg)'};
`;

export const Insidecontainer = styled.div`
	display: flex;
	justify-content: space-between;
	margin: 10px 0;
	flex-direction: column;
`;

export const MainContainer = styled.div`
	margin-top: 30px;
	width: 100%;
`;

export const StyledHr = styled.span`
	display: flex;
	justify-content: center;
	align-items: center;
	border: 1px dashed #aab9d6;
	width: 95%;
	margin-bottom: 20px;
	margin-top: 20px;
`;

export const PortsContainer = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
	@media (min-width: 768px) {
		padding: 0 32px;
	}
`;

export const Details = styled.div`
	font-weight: 500;
	font-size: 12px;
	text-decoration-line: underline;
	cursor: pointer;
	color: #393f70;
	display: flex;
	align-items: center;
	justify-content: space-between;
`;

export const Footer = styled.div`
	background: #ded7fc;
	border-radius: 0px 0px 4px 4px;
	height: 30px;
	left: 0;
	position: absolute;
	bottom: 0;
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 14px;
`;
export const Wave = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 14%;
	height: 35px;
	padding: 12px;
	font-weight: 500;
	font-size: 12px;
	background: linear-gradient(92.37deg, #f0a8a9 9.25%, #f5bf9d 90.65%);
	border-radius: 4px 0px 15px;
	color: #393f70;
`;
export const Gradient = styled.span`
	position: absolute;
	width: 100%;
	left: 0;
	top: 0;
	height: 12px;
	background: linear-gradient(
		99.65deg,
		#f5bf9d 14.21%,
		rgba(239, 135, 152, 0.75) 117.03%
	);
	border-radius: 15px 100px 10px 15px;
`;
