import Login from "./components/Login";
import HiveIcon from './assets/hive-icon.svg'
import { useEffect, useState } from "react";
import UpdateProfileDataPage from "./components/UpdateProfileDataPage";
import Loading from "./components/Loading";
import { fetchSingleProfile } from "./api/hive";

function App() {

	const[username, setUsername] = useState('')
  const [loggedIn, setLoggedIn]= useState(false)
  const [loading, setLoading]= useState(false)
  const[postingData, setPostingData] = useState('{}')

  useEffect(() => {
		if(loggedIn) {
      setLoading(true)
			fetchSingleProfile(username)
			.then((response) => {
				setPostingData(JSON.stringify(JSON.parse(response[0].posting_json_metadata)))
				setLoading(false)
			})
		}
		// eslint-disable-next-line
	}, [loggedIn])

  return (
    <div className="app h-fit w-full bg-white">
      <div className="min-h-screen grid place-items-center w-full ">
        {
          !loading
          ?
          <div className="flex flex-col items-center">
            <div className="mb-[50px] flex flex-col md:flex-row items-center">
              <img className="h-[40px]" src={HiveIcon} alt="hive icon" />
              <span className="mt-[15px] md:mt-0 ml-[15px] font-bold text-[#FF1337] text-md md:text-xl lg:text-2xl">HIVE UPDATE PROFILE POSTING DATA</span>
            </div>
            {!loggedIn
              ?
              <div className="flex flex-col items-center">
                <span className="mb-[15px] text-[14px] font-medium">
                  Please login with Keychain to update your data.
                </span>
                <Login username={username} setUsername={setUsername} setLoggedIn={setLoggedIn} loading={loading} setLoading={setLoading} />
              </div>
              :
              <UpdateProfileDataPage username={username} postingData={postingData} setPostingData={setPostingData} />
            }
          </div>
          :
          <Loading />
        }
      </div>
    </div>
  );
}

export default App;
