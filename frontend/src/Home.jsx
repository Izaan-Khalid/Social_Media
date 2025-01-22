import { Link } from "react-router-dom"

const Home = () => {
	return (
		<nav>
			<Link to="/">Home</Link>
			<Link to="/login">Login</Link>
		</nav>
	)
}

export default Home
