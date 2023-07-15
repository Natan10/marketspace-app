import { ISkeletonProps, Skeleton } from "native-base";

interface Props extends ISkeletonProps{}

export function HeadingLoad({...rest}: Props){
	return(
		<Skeleton 
			h={120}
			rounded={6}
			backgroundColor={'gray.500'}
			{...rest}
		/>
	)
}