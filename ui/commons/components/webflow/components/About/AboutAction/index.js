import { setAboutState } from '@cogo/app-store';
import { useDispatch } from '@cogo/store';
import React, { Children, cloneElement } from 'react';

let modifiedChildren = null;

function AboutAction({ children, slug, defaultData }) {
	const dispatch = useDispatch();

	modifiedChildren = Children.map(children, (child) => {
		const newProps = {
			onClick: async (e) => {
				if (child.props.onClick) {
					e.preventDefault();
				}
				await dispatch(
					setAboutState({
						isOpen: true,
						slug,
						defaultData,
					}),
				);
			},
		};
		return cloneElement(child, { ...newProps });
	});

	return <>{modifiedChildren || children}</>;
}

export default AboutAction;
