import Logo from './cogoport-logo.svg';
import { A, ContainerFlex } from './styles';

// import WebBot from '@/commons/components/WebBot';

function CompanyDetails() {
	return (
		<ContainerFlex alignItems="center">
			<A href="/dashboard">
				<Logo style={{ display: 'block' }} width={118} height={24} />
			</A>
			{/* <WebBot /> */}
		</ContainerFlex>
	);
}

export default CompanyDetails;
