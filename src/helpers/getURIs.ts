import { staticURI } from "@services/api";

export function getAvatarUrl(userImage: string){
	return `${staticURI}/assets/avatars/${userImage}`
}

export function getAnnouncementPhotosUrl(images: string[]){
	const uris: string[] = [];

	images.forEach(image => {
		const uri = `${staticURI}/assets/products/${image}`;
		uris.push(uri);
	});

	return uris
}