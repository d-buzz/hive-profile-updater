import { useEffect, useState } from 'react'
import { keychainSignIn } from '../api/keychain'
import HiveKeychainButton from '../assets/keychain-button.svg'
import { generateSession, readSession } from '../utils/helpers'

const Login = (props) => {

	const { username, setUsername, setLoggedIn, setLoading } = props

	const [keychainInstalled, setKeychainInstalled] = useState(false)

	useEffect(() => {
		setTimeout(() => {
			if(window.hive_keychain) {
				setKeychainInstalled(true)
			}
		}, 500)
	}, [])


	useEffect(() => {
		const session = JSON.parse(localStorage.getItem('@session'))
		
		if(session) {
			setLoading(true)
		}

		if(session && keychainInstalled) {
			try {
				const decryptedSession = readSession(session)
				if(decryptedSession.username && decryptedSession.token) {
					keychainSignIn(decryptedSession.username).then((res) => {
						if(res.success) {
							localStorage.setItem('@session', JSON.stringify(generateSession({username: res.data.username, token: res.result})))
							setUsername(decryptedSession.username)
							setLoggedIn(true)
							setLoading(false)
						}
					})
				}
			} catch(e) {
				alert('session expired.')
				setLoading(false)
				localStorage.removeItem('@session')
			}
		} else {
			setLoading(false)
		}
	// eslint-disable-next-line
	}, [keychainInstalled])

	const handleKeychainLogin = () => {
		if(username) {
			keychainSignIn(username)
			.then((response) => {
				const { success } = response

				if(success) {
					localStorage.setItem('@session', JSON.stringify(generateSession({username: response.data.username, token: response.result})))
					setUsername('')
					setLoggedIn(true)
				}
			})
		} else {
			alert('Please enter a username')
		}
	}
	
	return (
		<div>
			<div>
				<input className='pt-2 pb-2 pl-4 pr-4 w-full border-[2px] border-[#FF1337] text-xl font-semibold rounded-md outline-none' type="text" placeholder='hive username' value={username} onChange={(e) => setUsername(e.target.value)} />
			</div>
			<div className='mt-[15px] cursor-pointer' onClick={handleKeychainLogin}>
				<img className='h-[80px] pointer-events-none' src={HiveKeychainButton} alt="keychain button" />
			</div>
		</div>
	)
}

export default Login