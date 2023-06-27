import { PaymentMethodsDTO } from "./PaymentMethodsDTO";

export interface AnnouncementCard {
	id: number;
	photos: string[];
	title: string;
	price: number;
	isNew: boolean;
	isEnabled?: boolean;
}

export interface AnnoucementDTO {
	id: string;
	title: string;
	price: number;
	img: string;
	isNewProduct: boolean;
	isEnabled: boolean;
	avatar?: boolean;
}

export interface Announcement {
	id: number;
	title: string;
	description: string;
	images: string[];
	is_active: boolean;
	is_exchangeable: boolean;
	is_new: boolean;
	price: number;
	user_id: number;
	payment_methods: PaymentMethodsDTO
}