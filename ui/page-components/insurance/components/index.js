import { Tooltip } from '@cogoport/components';
import { IcMArrowBack } from '@cogoport/icons-react';
import { useSelector } from 'react-redux';

import redirectUrl from '../common/redirectUrl';

import Description from './Description';
// import {
// 	Heading,
// 	Container,
// 	ContainerWrapper,
// 	StyledCol,
// 	TextType,
// 	Back,
// 	StyledDiv,
// 	Div,
// 	STyledRow,
// } from './styles';
import styles from './styles.module.css';
import TabsSection from './Tabs';

function CreateInsurance() {
	const { isMobile } = useSelector((state) => state);
	const { redirectList } = redirectUrl();
	return (
		<div className={styles.wrapper}>
			<div className={isMobile ? styles.heading_mobile : styles.heading}>
				<Tooltip content="Back To List View">
					<div className={styles.center}>
						<IcMArrowBack className={styles.icon} onClick={() => redirectList()} />
					</div>
				</Tooltip>
				<div className={styles.text_type}>Create Insurance</div>
			</div>

			<div className={styles.container_wrapper}>
				{!isMobile && (
					<div className={styles.container}>
						<div className={styles.row}>
							<div>
								<Description />
							</div>
							<div className={styles.column}>
								<TabsSection />
							</div>
						</div>
					</div>
				)}
				{isMobile && (
					<div className={styles.container}>
						<div className={styles.row_wrapper}>
							<Description isMobile={isMobile} />
						</div>
						<div className={styles.row_wrapper}>
							<TabsSection isMobile={isMobile} />
						</div>
					</div>
				)}
			</div>
		</div>
	);
}

export default CreateInsurance;
