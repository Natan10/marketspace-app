import React,{ ReactNode, createContext, useContext, useState } from 'react';
import { AnnouncementPreviewDTO } from '@dtos/AnnoucementDTO';

type PreviewDataDTO = AnnouncementPreviewDTO & {
	announcementId?: string;
}

interface PreviewContextProps {
	previewData: PreviewDataDTO;
	setPreviewData: (data: PreviewDataDTO) => void;
}

const PreviewContext = createContext<PreviewContextProps>({} as PreviewContextProps);

interface PreviewProviderProps {
	children: ReactNode;
}

export function PreviewProvider({ children }: PreviewProviderProps){
	const [previewData, setPreviewData] = useState({} as PreviewDataDTO);

	return(
		<PreviewContext.Provider value={{previewData, setPreviewData}}>
			{children}
		</PreviewContext.Provider>
	)
}

export function usePreviewContext(){
	return useContext(PreviewContext);
}