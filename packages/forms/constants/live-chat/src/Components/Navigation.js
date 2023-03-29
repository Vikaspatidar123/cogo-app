import React, { useState } from 'react';
import { TabPanel, Tabs } from '@cogoport/front/components';
import styled from '@cogoport/front/styled';
import Loader from './Loader';
import ActiveChats from '../Container/ActiveChats';
import AgentDetails from '../Container/AgentDetails';
import Archives from '../Container/Archives';

const Container = styled.div``;

const Navigation = ({ isReadyToRender }) => {
	const [activeTab, setActiveTab] = useState('chats');
	return (
		<Container>
			<Tabs activeTab={activeTab} onChange={(val) => setActiveTab(val)}>
				<TabPanel name="chats" title="Active chats">
					{isReadyToRender ? <ActiveChats activeTab={activeTab} /> : <Loader />}
				</TabPanel>
				<TabPanel name="archive" title="Archive">
					{isReadyToRender ? (
						<Archives handleTabChange={setActiveTab} />
					) : (
						<Loader />
					)}
				</TabPanel>
				<TabPanel name="agent" title="Agent details">
					{isReadyToRender ? <AgentDetails /> : <Loader />}
				</TabPanel>
			</Tabs>
		</Container>
	);
};

export default Navigation;
