import { BrowserRouter } from 'react-router-dom'
import routes from './routes'
import Layout from './routes/layout'
import { useAppDispatch } from './redux/hooks'
import { useEffect } from 'react'
import { getUserThunk } from './redux/actions'

function App() {
	const dispatch = useAppDispatch()
	useEffect(() => {
		dispatch<any>(getUserThunk())
	},[dispatch])
	return (
		<>
				<BrowserRouter>
					{routes.map((route, i) => (
						<Layout key={i} {...route} />
					))}
				</BrowserRouter>
		</>
	)
}

export default App
