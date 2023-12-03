import { BrowserRouter } from 'react-router-dom'
import routes from './routes'
import Layout from './routes/layout'
import { useAppDispatch } from './redux/hooks'
import { useEffect } from 'react'
import { getUserThunk } from './redux/actions'
import { SnackbarProvider } from 'notistack'

function App() {
	const dispatch = useAppDispatch()
	useEffect(() => {
		if (localStorage.getItem('isLoggedIn')) dispatch<any>(getUserThunk())
	}, [dispatch])
	return (
		<>
			<SnackbarProvider maxSnack={3}>
				<BrowserRouter>
					{routes.map((route, i) => (
						<Layout key={i} {...route} />
					))}
				</BrowserRouter>
			</SnackbarProvider>
		</>
	)
}

export default App
