import { Popover, Button } from '@cogoport/front/components';
import styled from '@cogoport/front/styled';
import React, { useEffect } from 'react';

import { getCustomer } from '../../Logic';

const Section = styled.div`
	padding: 8px;
	background-color: rgb(243, 247, 249);
	border: 1px solid #828282;
	border-radius: 10px;
	margin-bottom: 10px;
`;

const Heading = styled.div`
	font-weight: bold;
	font-size: 12px;
	line-height: 16px;
	letter-spacing: 0.04em;

	color: #000000;
	margin-bottom: 10px;
`;

const Row = styled.div`
	display: flex;
	align-items: center;
	padding: 6px 0px;
`;

const Label = styled.p`
	margin: 0px;
	font-size: 12px;
	line-height: 16px;
	display: flex;
	align-items: center;
	letter-spacing: 0.02em;
	color: #000000;
`;

const Value = styled.p`
	margin: 0px;
	font-weight: bold;
	font-size: 12px;
	line-height: 16px;
	display: flex;
	align-items: center;
	letter-spacing: 0.04em;

	color: #000000;
`;

function CustomerInfo({ users, userData, setUserData }) {
	const content = (
		<div style={{ width: '400px', maxHeight: '400px', overflow: 'auto' }}>
			<Section>
				<Heading>User Info</Heading>
				<Row>
					<Label>Name : </Label>
					<Value>{userData?.name}</Value>
				</Row>
				<Row>
					<Label>Visit : </Label>
					<Value>
						{userData?.last_visit?.geolocation?.city}
						,
						{' '}
						{userData?.last_visit?.geolocation?.region}
						,
						{' '}
						{userData?.last_visit?.geolocation?.country}
					</Value>
				</Row>
			</Section>
			<Section>
				<Heading>Session Info</Heading>
				{(userData.session_fields || []).map((item) => {
					const key = Object.keys(item)?.[0];
					return key ? (
						<Row>
							<Label>
								{key}
								{' '}
								:
								{' '}
							</Label>
							<Value>{item[key]}</Value>
						</Row>
					) : null;
				})}
			</Section>
			<Section>
				<Heading>Pages Visited</Heading>
				{(userData?.last_visit?.last_pages || []).map((item) => (
					<Row>
						<Label>{item?.title}</Label>
						<a href={item?.url} target="_blank" rel="noreferrer">
							{item?.url}
						</a>
					</Row>
				))}
			</Section>
			<Section>
				<Heading>Technology Info</Heading>
				<Row>
					<Label>IP Address</Label>
					<Value>{userData?.last_visit?.ip}</Value>
				</Row>
				<Row>
					<Label>User Agent</Label>
					<Value>{userData?.last_visit?.user_agent}</Value>
				</Row>
			</Section>
		</div>
	);

	const customer_id = users?.find((user) => user?.type === 'customer')?.id;

	const getCustomerInfo = async () => {
		if (customer_id) {
			const response = await getCustomer(customer_id);
			setUserData({ ...userData, ...(response || {}) });
		}
	};

	useEffect(() => {
		getCustomerInfo();
	}, [customer_id]);
	return (
		<Popover placement="bottom" content={content} theme="light" interactive>
			<Button
				style={{
					background  : 'transparent',
					color       : 'black',
					border      : 'none',
					boxShadow   : 'none',
					fontSize    : 18,
					fontWeight  : 'bold',
					marginRight : 10,
				}}
			>
				...
			</Button>
		</Popover>
	);
}

export default CustomerInfo;
