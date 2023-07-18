import { staticURI } from "@services/api";

export function getAvatarUrl(userImage: string){
	if(userImage.match(/doodleipsum\.com/g)) {
		return userImage;
	}
	return `${staticURI}/assets/avatars/${userImage}`
}

export function getAnnouncementPhotosUrl(images: string[]){
	const uris: string[] = [];

	images.forEach(image => {
		if(image.match(/doodleipsum\.com/g)) {
			uris.push(image);
		}else if(image.match(/ImagePicker/g)){
			uris.push(image);
		}else{
			const uri = `${staticURI}/assets/products/${image}`;
			uris.push(uri);
		}
	});

	return uris
}