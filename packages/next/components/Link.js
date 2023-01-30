import Link from 'next/link';

import getModifiedRoutes from '../utils/getModifiedRoutes';

import { useSelector } from '@/packages/store';

function LinkComponent({
	href,
	as,
	children,
	withPrefix,
	...rest
}) {
	const organizationId = useSelector((s) => s?.profile?.organization
		?.id);

	const { newHref, newAs } = getModifiedRoutes({
		href, as, organizationId, withPrefix,
	});

	return (
		<Link {...rest} href={newHref} as={newAs}>
			{children}
		</Link>
	);
}

LinkComponent.defaultProps = {
	withPrefix : true,
	as         : '',
};

export default LinkComponent;
