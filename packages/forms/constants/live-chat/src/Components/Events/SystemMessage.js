import styled from '@cogoport/front/styled';
import React from 'react';

const MessageText = styled.small`
	display: block;
	width: 100%;
	margin: 10px;
	color: darkgray;
	text-align: center;
`;

function SystemMessage({ message }) {
	return <MessageText>{message.text}</MessageText>;
}

export default SystemMessage;
