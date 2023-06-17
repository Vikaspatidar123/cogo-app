import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';

const style = {
	backgroundSize   : ' 100% 100%',
	backgroundRepeat : 'no-repeat',
	borderRadius     : '6px',
	width            : '100%',
	height           : '300px',
	cursor           : 'pointer',
	padding          : '10px 0',
};

const getCarouselData = ({ data = [], handelRouting }) => {
	const item = data.map(({ image_url = '', filters = {}, id = '' }) => ({
		key    : id,
		render : () => (
			<img
				src={image_url}
				alt={GLOBAL_CONSTANTS.image_url.banner_image}
				onClick={() => handelRouting(filters?.category, filters)}
				role="presentation"
				style={style}
			/>
		),
	}));
	return item;
};

export default getCarouselData;
