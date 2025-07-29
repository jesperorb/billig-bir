import ApiClientWrapper from "@common/api/api-client-wrapper";

import CreateBeerLocationSubmissionDialogContent from "./create-beer-location-submission.content";

interface Props {
	onClose: () => void;
	open?: boolean;
}

const CreateBeerLocationSubmissionDialog = ({ open, onClose }: Props) => (
	<ApiClientWrapper>
		<CreateBeerLocationSubmissionDialogContent open={open} onClose={onClose} />
	</ApiClientWrapper>
);

export default CreateBeerLocationSubmissionDialog;
