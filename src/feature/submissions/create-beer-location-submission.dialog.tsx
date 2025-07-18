import ApiClientWrapper from "@common/api/api-client-wrapper";

import BeerLocationSubmissionDialogContent from "./create-beer-location-submission.content";

interface Props {
	onClose: () => void;
}

const BeerLocationSubmissionDialog = ({ onClose }: Props) => (
	<ApiClientWrapper>
		<BeerLocationSubmissionDialogContent onClose={onClose} />
	</ApiClientWrapper>
);

export default BeerLocationSubmissionDialog;
