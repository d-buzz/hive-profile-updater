import { useState } from "react"
import { generateUpdateAccountOperation } from "../api/hive"
import { broadcastKeychainOperation } from "../api/keychain"

const UpdateProfileDataPage = (props) => {
	const { username, postingData, setPostingData } = props
  const [updating, setUpdating]= useState(false)

	const handleUpdatePostingData = async () => {
		setUpdating(true)
		const operations = (await generateUpdateAccountOperation(username, postingData))
		
		broadcastKeychainOperation(username, operations)
		.then((response) => {
			const { success }  = response
			if(success) {
				alert('Updated profile data successfully')
				setUpdating(false)
			}
		})
	}

	return (
		<div className="flex justify-center w-screen">
			<div className="w-[80%]">
				<div className="w-full">
					<textarea className="pl-4 pr-4 pt-2 pb-2 min-h-[200px] max-h-[800px] resize-y w-full outline-none border-[2px] border-[#FF1337] disabled:opacity-80" value={postingData} onChange={(e) => setPostingData(e.target.value)} disabled={updating}/>
				</div>
				<div className="w-fit ml-auto">
					<button className="pl-4 pr-4 pt-2 pb-2 bg-[#FF1337] rounded-lg text-white uppercase font-semibold outline-none hover:bg-[#fc3d59] active:bg-[#f71537] disabled:opacity-80 disabled:hover:bg-[#FF1337] disabled:active:bg-[#FF1337] disabled:cursor-not-allowed" onClick={handleUpdatePostingData} disabled={updating}>{!updating ? 'Update' : 'Updating'}</button>
				</div>
			</div>
		</div>
	)
}

export default UpdateProfileDataPage