import styled from '@cogoport/front/styled';

export const Port = styled.div`
	font-size: 16px;
	font-weight: 700;
	line-height: 26px;
	align-items: center;
	max-width: 120px;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	color: #393f70;
`;

export const IconWrap = styled.div`
	display: flex;
	margin-left: 20px;
	margin-right: 20px;
	/* margin-top: 10px; */

	@media (max-width: 768px) {
		margin-right: 0px;
		margin-left: 0px;
		margin-top: 6px;
	}
`;

export const TripType = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`;

export const LocationDetailsDiv = styled.div`
	display: flex;
	justify-content: flex-start;
	align-items: center;
	padding: 0px 16px;
`;

export const Circle = styled.div`
	background: #b3d5fb;
	border-radius: 50%;
	height: 6px;
	width: 6px;
	border: 1px solid #4097f5;
`;

export const DottedLine = styled.div`
	width: 60px;
	margin: 2px 4px 0px;
	border-top: 2px dotted #7e87c1;
`;
