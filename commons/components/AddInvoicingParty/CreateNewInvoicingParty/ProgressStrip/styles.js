import styled from '@cogoport/front/styled';

export const Container = styled.div`
	width: 100%;
`;

export const Line = styled.div`
	flex: 1;
	border-top-style: solid;
	border-color: #bdbdbd;
	border-top-width: 1px;
`;

export const Steps = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin: 8px 0 8px 0;
`;

export const Step = styled.div`
	display: flex;
	align-items: center;
	cursor: pointer;
	transition: 0.5s;
	border-radius: 4px;
	user-select: none;
`;
