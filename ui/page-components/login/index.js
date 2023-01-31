import CogoportIcon from '../../../commons/icons/cogo-icon.svg';
import { PanelsLayout } from '../layout';

import LoginLeftPanel from './components/LoginLeftPanel';
import LoginRightPanel from './components/LoginRightPanel';
import leftPanelConfig from './configurations/left-panel-config.json';
import rightPanelConfig from './configurations/right-panel-config.json';

function Login() {
	const layoutProps = {
		activeComponentKey: 'login',
		cogoportIcon: <CogoportIcon />,
		leftPanel: {
			config: leftPanelConfig,
			component: <LoginLeftPanel />,
		},
		rightPanel: {
			config: rightPanelConfig,
			component: <LoginRightPanel />,
		},
	};

	return <PanelsLayout {...layoutProps} />;
}

export default Login;
