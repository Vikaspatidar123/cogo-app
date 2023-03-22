import styled from '@cogoport/front/styled';

export const Card = styled.div`
	display: flex;
	align-items: center;
	border-right: 1px solid #e0e0e0;
	width: fit-content;
	padding: 0px 10px;

	:first-child {
		padding-left: 0px;
	}
	:last-child {
		border-right: none;
	}
`;

export const Tag = styled.div`
	color: #4f4f4f;
	font-size: 12px;
	border: 1px solid #e0e0e0;
	border-radius: 4px;
	padding: 4px 8px;
	margin: 0px 3px;
`;

export const ServiceIcon = styled.div`
	border: 0.5px solid #e0e0e0;
	border-radius: 100%;
	display: flex;
	padding: 4px;
`;

export const ServiceName = styled.div`
	color: #4f4f4f;
	font-size: 14px;
	margin: 0px 5px 0px 5px;
`;

export const Container = styled.div`
	display: flex;
	padding: 10px 0px;
`;

export const Validity = styled.div`
	font-size: 14px;
	color: #4f4f4f;
	padding: 0px 5px;

	span {
		color: #4f4f4f;
		font-weight: 500;
	}
`;
