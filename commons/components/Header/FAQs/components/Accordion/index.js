import { useEffect, useState } from 'react';
import ArrowDownIcon from '../../assets/caret.svg';
import { Container, Heading, Content } from './styles';

function Accordion({ data, activeTab }) {
	const [expanded, setExpanded] = useState(false);

	useEffect(() => {
		setExpanded(false);
	}, [activeTab]);

	return (
		<Container>
			<Heading
				onClick={() => setExpanded(!expanded)}
				className={`${expanded && 'active'}`}
			>
				<span>{data.caption}</span>
				<ArrowDownIcon className={`caret ${expanded && 'active'}`} />
			</Heading>
			<Content className={`content ${expanded && 'open'}`}>
				<div>{data.data}</div>
			</Content>
		</Container>
	);
}

export default Accordion;
