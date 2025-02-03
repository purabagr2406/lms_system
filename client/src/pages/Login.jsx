import { Button } from "@/components/ui/button"
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from "@/components/ui/tabs"
import { useLoginUserMutation, useRegisterUserMutation } from "@/features/api/authApi"
import { Loader2 } from "lucide-react"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"

const Login = () => {
	const [signupInput, setSignupInput] = useState({ email: "", username: "", password: "" });
	const [loginInput, setLoginInput] = useState({ email: "", password: "" });

	const [registerUser, { data: registerData,
		error: registerError,
		isLoading: registerIsLoading,
		isSuccess: registerIsSuccess }] = useRegisterUserMutation();
	const [loginUser, { data: loginData,
		error: loginError,
		isLoading: loginIsLoading,
		isSuccess: loginIsSuccess }] = useLoginUserMutation();
	
	const navigate = useNavigate();

	const changeInputHandler = (e, type) => {
		const { name, value } = e.target;
		if (type === "signup") {
			setSignupInput({ ...signupInput, [name]: value });
		}
		else {
			setLoginInput({ ...loginInput, [name]: value });
		}
	}
	const handleRegistration = async (type) => {
		const inputData = type === "signup" ? signupInput : loginInput;
		console.log(inputData);
		const action = type === "signup" ? registerUser : loginUser;
		await action(inputData);
	}

	useEffect(() => {
		if (registerIsSuccess && registerData) {
			toast.success(registerData.message || "Account Created Successfully");
		}
		if (registerError) {
			toast.error(registerError.data.message || "Account could not be created");
		}
		if (loginIsSuccess && loginData) {
			toast.success(loginData.message || "Logged In Successfully");
			navigate("/");
		}
		if (loginError) {
			toast.error(loginError.data.message || "Login Failed");
		}
	}, [loginIsLoading, registerIsLoading, loginData, registerData, loginError, registerError])
	return (
		<div className="flex items-center w-full justify-center mt-20">
			<Tabs defaultValue="login" className="w-[400px]">
				<TabsList className="grid w-full grid-cols-2">
					<TabsTrigger value="login">Login</TabsTrigger>
					<TabsTrigger value="signup">Signup</TabsTrigger>
				</TabsList>
				<TabsContent value="signup">
					<Card>
						<CardHeader>
							<CardTitle>Signup</CardTitle>
							<CardDescription>
								Create a new LMS Account and start learning.
							</CardDescription>
						</CardHeader>
						<CardContent className="space-y-2">
							<div className="space-y-1">
								<Label htmlFor="email">Email</Label>
								<Input type="email"
									id="email"
									name="email"
									value={signupInput.email}
									placeholder="Your Email Address"
									required={true}
									onChange={(e) => changeInputHandler(e, "signup")} />
							</div>
							<div className="space-y-1">
								<Label htmlFor="username">Username</Label>
								<Input id="username"
									placeholder="e.g. @rishabh1204"
									type="text"
									name="username"
									value={signupInput.username}
									required={true}
									onChange={(e) => changeInputHandler(e, "signup")} />
							</div>
							<div className="space-y-1">
								<Label htmlFor="newpassword">New Password</Label>
								<Input id="newpassword"
									type="password"
									name="password"
									value={signupInput.password}
									placeholder="8-12 charecters long, numbers, symbols"
									required={true}
									onChange={(e) => changeInputHandler(e, "signup")} />
							</div>
							<div className="space-y-1">
								<Label htmlFor="confirmpassword">Confirm Password</Label>
								<Input id="confirmpassword"
									type="password"
									required={true}
									onChange={(e) => changeInputHandler(e, "signup")} />
							</div>
						</CardContent>
						<CardFooter>
							<Button disabled={registerIsLoading} onClick={() => handleRegistration("signup")}>
								{
									registerIsLoading ? (
										<>
											<Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please Wait
										</>
									) : "Signup"
								}
							</Button>
						</CardFooter>
					</Card>
				</TabsContent>
				<TabsContent value="login">
					<Card>
						<CardHeader>
							<CardTitle>Login</CardTitle>
							<CardDescription>
								Login to your LMS Account and continue learing.
							</CardDescription>
						</CardHeader>
						<CardContent className="space-y-2">
							<div className="space-y-1">
								<Label htmlFor="email">Email Address</Label>
								<Input id="email"
									type="email"
									placeholder="e.g. abc@gmail.com"
									required={true}
									name="email"
									value={loginInput.email}
									onChange={(e) => changeInputHandler(e, "login")} />
							</div>
							<div className="space-y-1">
								<Label htmlFor="password">Password</Label>
								<Input id="password"
									type="password"
									required={true}
									name="password"
									value={loginInput.password}
									onChange={(e) => changeInputHandler(e, "login")} />
							</div>
						</CardContent>
						<CardFooter>
							<Button disabled={loginIsLoading} onClick={() => handleRegistration("login")}>
								{
									loginIsLoading ? (
										<>
											<Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please Wait
										</>
									) : "Login"
								}
							</Button>
						</CardFooter>
					</Card>
				</TabsContent>
			</Tabs>
		</div>
	)
}
export default Login;