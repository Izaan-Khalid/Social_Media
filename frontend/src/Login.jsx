import { useState } from "react"
import { useNavigate } from "react-router-dom"

const Login = () => {
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	})
	const [error, setError] = useState("")
	const navigate = useNavigate()

	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		})
	}

	const handleSubmit = async (e) => {
		e.preventDefault()
		setError("")

		try {
			const response = await fetch(
				"http://localhost:8000/api/users/login",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(formData),
				}
			)

			const data = await response.json()

			if (!response.ok) {
				throw new Error(data.message || "Login failed")
			}

			localStorage.setItem("token", data.token)
			console.log("Logged in successfully")
			navigate("/dashboard")
		} catch (err) {
			setError(err.message)
		}
	}

	return (
		<div>
			<div>
				<div>
					<h2>Sign in to your account</h2>
				</div>
				<form onSubmit={handleSubmit}>
					{error && (
						<div>
							<p>{error}</p>
						</div>
					)}
					<div>
						<div>
							<label htmlFor="email" className="sr-only">
								Email address
							</label>
							<input
								id="email"
								name="email"
								type="email"
								required
								placeholder="Email address"
								value={formData.email}
								onChange={handleChange}
							/>
						</div>
						<div>
							<label htmlFor="password" className="sr-only">
								Password
							</label>
							<input
								id="password"
								name="password"
								type="password"
								required
								placeholder="Password"
								value={formData.password}
								onChange={handleChange}
							/>
						</div>
					</div>

					<div>
						<button type="submit">Sign in</button>
					</div>
				</form>
			</div>
		</div>
	)
}

export default Login
