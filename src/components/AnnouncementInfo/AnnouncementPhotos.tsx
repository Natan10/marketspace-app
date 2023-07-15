import { ImageSlider } from '../ImageSlider';

interface Props {
	photos: string[]
}

export function AnnouncementPhotos({photos}: Props){
	return(
		<ImageSlider photos={photos} />
	)
}