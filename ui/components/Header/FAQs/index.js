import { useState } from 'react';
import Tabs from '@cogoport/front/components/admin/Tabs';
import TabPanel from '@cogoport/front/components/admin/Tabs/TabPanel';
import { useSelector } from '@cogoport/front/store';
import { useRouter } from '@/temp/next';
import { Header, Container, Section, IconContainer } from './styles';
import Accordion from './components/Accordion';
import data from './configurations/data.json';
import listConfig from './configurations/list.json';
import BackIcon from './back.svg';

function FAQs() {
	const {
		general: { isMobile },
	} = useSelector((state) => state);

	const router = useRouter();

	const [activeTab, setActiveTab] = useState('about_cogoport');

	const handlePushToMenu = () => {
		router.push('/menu');
	};

	return (
		<Container>
			<Header>
				{isMobile ? (
					<IconContainer onClick={handlePushToMenu}>
						<BackIcon />
					</IconContainer>
				) : null}
				FAQs
			</Header>

			<Section>
				<Tabs
					activeTab={activeTab}
					onChange={setActiveTab}
					className="horizontal two"
				>
					{listConfig.tabs.map((tab) => (
						<TabPanel
							name={tab.key}
							title={tab.title}
							className="horizontal two"
						>
							{data?.[activeTab]?.map((item) => (
								<Accordion data={item} activeTab={activeTab} />
							))}
						</TabPanel>
					))}
				</Tabs>
			</Section>
		</Container>
	);
}

export default FAQs;
