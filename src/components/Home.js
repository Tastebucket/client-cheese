import CheesesIndex from "./cheeses/CheesesIndex"

const Home = (props) => {
	const { msgAlert, user } = props
	console.log('props in home', props)

	return (
		<>
			<CheesesIndex className='background' msgAlert= { msgAlert } user={user}/>
		</>
	)
}

export default Home
