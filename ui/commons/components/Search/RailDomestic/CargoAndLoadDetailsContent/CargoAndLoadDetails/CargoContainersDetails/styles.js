import styled from '@cogoport/front/styled';

export const Container = styled.div``;

export const HeaderContainer = styled.header`
	display: flex;
	flex-direction: row;
	align-items: center;

	margin-bottom: 8px;
`;

export const Title = styled.div`
	color: #393f70;
	font-size: 14px;
	font-weight: 500;
`;

export const ContainerCountContainer = styled.div`
	margin: auto;

	display: flex;
	flex-direction: row;
	align-items: center;

	color: #393f70;
	font-size: 12px;
	font-weight: 400;

	& .container-count__value {
		margin-left: 2px;
		font-weight: 500;

		& .container-count__value--count {
			&.container-count__value--invalid {
				color: #cb6464;
				font-weight: 700;
			}
		}
	}

	& .container-count__value__text--invalid {
		color: #cb6464;
		margin-left: 24px;
	}
`;

export const ContainerDetailsFormContainer = styled.div`
	padding: 16px;
	background-color: #f7f5fc;
	border: 1px solid #ded7fc;
	border-radius: 8px;

	margin-bottom: 16px;
`;

export const ContainerDetailsListContainer = styled.div``;
