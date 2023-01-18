import styled from '@cogoport/front/styled';

export const Container = styled.section`
	display: flex;
	flex-direction: column;
	padding: 50px;
`;

export const TermsAndConditionsContainer = styled.div`
	border: 2px solid #bdbdbd;
	padding: 32px;
	overflow-y: auto;
	max-height: 60vh;
	box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1) inset;
	margin-bottom: 16px;
`;

export const Title = styled.div`
	width: 100%;
	display: flex;
	justify-content: center;
	font-weight: 700;
	font-size: 30px;
`;

export const TermsContainer = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
`;
