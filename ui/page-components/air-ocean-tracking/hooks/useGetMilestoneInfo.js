import { isFutureDate, isCurrentDate } from '../utils/dateCompare';

const useGetMilestoneInfo = ({ combineMileStoneList = [] }) => {
	let currentMilestoneIndex = null;
	let milestoneSubIndex = null;
	const combineMileStoneListLength = combineMileStoneList.length;

	combineMileStoneList.forEach((combineList, index) => {
		if (combineList.length === 1) {
			const isMilestoneCurrent = isCurrentDate(combineList[0]?.event_date);

			if (isMilestoneCurrent) {
				currentMilestoneIndex = index;
			}
		} else {
			const firstMilestoneDate = combineList[0]?.event_date;
			const lastMilestoneDate = combineList.slice(-1)[0]?.event_date;

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
