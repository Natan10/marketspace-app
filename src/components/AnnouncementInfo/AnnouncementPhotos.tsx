import { ImageSlider } from '../ImageSlider';

interface Props {
	photos: string[];
	isDisabled?: boolean;
}

export function AnnouncementPhotos({photos, isDisabled = false}: Props){
	return(
		<ImageSlider photos={photos} isDisabled={isDisabled} />
	);
}