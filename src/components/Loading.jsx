import LoadingIcon from '../assets/loading.gif'

const Loading = () => {
	return (
		<div className="grid place-items-center h-screen w-full bg-[#1E1E1E]">
			<div className='flex flex-col items-center'>
				<img className='h-[35px] w-[35px]' src={LoadingIcon} alt="loading icon" />
				<span className='mt-2 text-white'>LOADING</span>
			</div>
		</div>
	)
}

export default Loading