import { isFutureDate, isCurrentDate } from '../utils/dateCompare';

import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';

const SINGLE_MILESTONE_INDEX = 1;
const LAST_INDEX = -1;
const ZEROTH_INDEX = GLOBAL_CONSTANTS.zeroth_index;

const useGetMilestoneInfo = ({ combineMileStoneList = [] }) => {
	let currentMilestoneIndex = null;
	let milestoneSubIndex = null;
	const combineMileStoneListLength = combineMileStoneList.length;

	combineMileStoneList.forEach((combineList, index) => {
		if (combineList.length === SINGLE_MILESTONE_INDEX) {
			const isMilestoneCurrent = isCurrentDate(combineList[ZEROTH_INDEX]?.event_date);

			if (isMilestoneCurrent) {
				currentMilestoneIndex = index;
			}
		} else {
			const firstMilestoneDate = combineList[ZEROTH_INDEX]?.event_date;
			const lastMilestoneDate = combineList.slice(LAST_INDEX)[ZEROTH_INDEX]?.event_date;

			const isFirstMilestonePastPresent = !isFutureDate(firstMilestoneDate) || isCurrentDate(firstMilestoneDate);
			const isLastMilestonePresentFuture = isFutureDate(lastMilestoneDate) || isCurrentDate(lastMilestoneDate);

			if (isFirstMilestonePastPresent && isLastMilestonePresentFuture) {
				currentMilestoneIndex = index;
			}
		}
	});

	if (currentMilestoneIndex) {
		const combineMileStoneSubArr = combineMileStoneList[currentMilestoneIndex];

		combineMileStoneSubArr.forEach((list, index) => {
			const milestoneDate = list?.event_date;

			if (isCurrentDate(milestoneDate)) {
				milestoneSubIndex = index;
			}
		});
	}
	return { currentMilestoneIndex, combineMileStoneListLength, milestoneSubIndex };
};

export default useGetMilestoneInfo;
