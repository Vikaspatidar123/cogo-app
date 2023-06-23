/* eslint-disable no-underscore-dangle */
import { Button, cl, Placeholder } from '@cogoport/components';

import useGetNews from '../../../hooks/useGetNews';
import useRedirectFn from '../../../hooks/useRedirectFn';
import getLoadingArr from '../../../utils/getLoadingArr';

import styles from './styles.module.css';

import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';
import formatDate from '@/ui/commons/utils/formatDate';

const LOADING_ARR = getLoadingArr(3);

const newsClickHandler = ({ slugName }) => {
	const url = `https://www.cogoport.com/blogs/${slugName}`;
	window.open(url);
};

function InfoContainer() {
	const { loading, data = [] } = useGetNews();

	const { redirectToBlogs } = useRedirectFn();

	const newData = loading ? LOADING_ARR : data;

	return (
		<div className={styles.container}>

			<div className={styles.card}>
				<h3 className={styles.title}>Important News</h3>
				{newData.map((news, index) => (
					<div
						key={news?._id || news}
						className={cl`${styles.row}
					${index === (data.length - 1) ? styles.last_row : ''}`}
					>
						{loading ? (
							<Placeholder height="25px" margin="0px 0px 5px 0px" />
						) : (
							<>
								<div className={styles.info_container}>
									<p className={styles.text}>
										{news?.name}
									</p>
									<p className={styles.date}>
										{formatDate({
											date       : news?._updated_on,
											dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
											timeFormat : GLOBAL_CONSTANTS.formats.time['hh:mm aaa'],
											formatType : 'dateTime',
										})}
									</p>
								</div>

								<Button
									themeType="linkUi"
									onClick={() => newsClickHandler({ slugName: news?.slug })}
									type="button"
								>
									Click Here

								</Button>

							</>
						)}
					</div>
				))}
				<Button themeType="linkUi" onClick={redirectToBlogs}>Show More</Button>
			</div>
		</div>
	);
}

export default InfoContainer;
