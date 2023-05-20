import styled from '@cogoport/front/styled';
import React, { useEffect, useState } from 'react';

// LOGIC:
import Navigation from './Components/Navigation';
import { ChatSDK } from './Logic';
import { useAuth } from './Logic/authorization';

// COMPONENTS:

// STYLED COMPONENTS:
const AppWrapper = styled.div`
	background: #f0f4f7;
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
`;

const Wrapper = styled.div`
	padding: 16px 0px;
	width: 95%;
	margin-top: 24px;
	max-width: 1000px;
	background: #ffffff;
	box-sizing: border-box;
	border-radius: 10px;
	border: 2px solid #dde2e6;
	box-shadow: 0px 0px 15px 0px rgba(51, 51, 51, 0.1);
`;

// CONSTANTS:
// const theme = {
// 	bgWhite   : '#FFFFFF',
// 	bgGray    : '#F0F4F7',
// 	primary   : '#4083F3',
// 	secondary : '#DDE2E6',
// };

function LiveChat() {
	const { isLoggedIn, agentData } = useAuth();
	const [isReadyToRender, setIsReadyToRender] = useState(false);

	// eslint-disable-next-line consistent-return
	useEffect(() => {
		if (isLoggedIn && agentData) {
			ChatSDK.init(agentData);
			return ChatSDK.destroy;
		}
	}, [agentData, isLoggedIn]);

	useEffect(() => {
		let isMounted = true;

		// Wait with render until app will get all necessary info from API
		ChatSDK.on('ready', () => {
			if (isMounted) {
				setIsReadyToRender(true);
			}
		});

		// eslint-disable-next-line no-return-assign
		return () => (isMounted = false);
	}, []);

	return (
		<AppWrapper>
			<Wrapper>
				<Navigation isReadyToRender={isReadyToRender} />
			</Wrapper>
		</AppWrapper>
	);
}

export default LiveChat;
