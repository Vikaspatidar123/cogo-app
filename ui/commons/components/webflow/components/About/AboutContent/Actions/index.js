import { Link } from '@/packages/next';
import { setAboutState } from '@cogo/app-store';
import { Button, UICustomTheme } from '@cogo/deprecated_legacy/ui';
import { useDispatch } from '@cogo/store';
import React from 'react';

// import { ButtonWrap, buttonTheme } from './styles';
import styles from './styles.module.css';

const renderAction = (action) => (action.type === 'link' ? (
	<Link href={action.link.href} as={action.link.as}>
		<a {...action.link.props}>{action.display_text}</a>
	</Link>
) : (
	action.display_text
));

function Actions({ actions, show, className }) {
	const dispatch = useDispatch();
	const onActionClick = (_action) => {
		if (_action.type === 'modal') {
			show(_action.modal_id);
		}
		dispatch(
			setAboutState({
				isOpen : false,
				slug   : null,
			}),
		);
	};
	return (
		<UICustomTheme className={styles.button_theme}>
			<div className={`${styles.button_wrap} ${className}`}>
				{actions
					&& actions.map((action, i) => {
						if (i % 2 === 0) {
							return (
								<Button
									key={`action_${i + 1}`}
									themeType="primary rounded"
									onClick={() => onActionClick(action)}
								>
									{renderAction(action)}
								</Button>
							);
						}
						return (
							<Button
								key={`action_${i + 1}`}
								themeType="primary rounded outline"
								onClick={() => onActionClick(action)}
							>
								{renderAction(action)}
							</Button>
						);
					})}
			</div>
		</UICustomTheme>
	);
}

export default Actions;
