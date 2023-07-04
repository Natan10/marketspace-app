import { Announcement } from "@dtos/AnnoucementDTO";
import { UserDTO } from "@dtos/UserDTO";
import { staticURI } from "@services/api";

export function getAvatarUrl(user: UserDTO){
	return `${staticURI}/assets/avatars/${user.photo}`
}

export function getAnnouncementPhotosUrl(announcement: Announcement){
	const uris: string[] = [];

	announcement.images.forEach(image => {
		const uri = `${staticURI}/assets/products/${image}`;
		uris.push(uri);
	});

	return uris
}