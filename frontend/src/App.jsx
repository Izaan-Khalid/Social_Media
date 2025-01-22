import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "./Home"
import Login from "./Login"
import Dashboard from "./Dashboard"
import Register from "./Register"

function App() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Register />} />
				<Route path="/dashboard" element={<Dashboard />} />
			</Routes>
		</Router>
	)
}

export default App
