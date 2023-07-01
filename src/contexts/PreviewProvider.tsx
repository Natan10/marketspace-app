import React,{ ReactNode, createContext, useContext, useState } from 'react';
import { AnnouncementPreviewDTO } from '@dtos/AnnoucementDTO';

interface PreviewContextProps {
	previewData: AnnouncementPreviewDTO;
	setPreviewData: (data: AnnouncementPreviewDTO) => void;
}

const PreviewContext = createContext<PreviewContextProps>({} as PreviewContextProps);

interface PreviewProviderProps {
	children: ReactNode;
}

export function PreviewProvider({ children }: PreviewProviderProps){
	const [previewData, setPreviewData] = useState({} as AnnouncementPreviewDTO);

	return(
		<PreviewContext.Provider value={{previewData, setPreviewData}}>
			{children}
		</PreviewContext.Provider>
	)
}

export function usePreviewContext(){
	return useContext(PreviewContext);
}