import { Menu, School } from 'lucide-react'
import React, { useEffect } from 'react'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from './ui/button';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import DarkMode from '@/DarkMode';
import { Sheet, SheetClose, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger, SheetDescription } from './ui/sheet';
import { Separator } from '@radix-ui/react-dropdown-menu';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useLogoutUserMutation } from '@/features/api/authApi';
import { toast } from 'sonner';
import { useSelector } from 'react-redux';
import userImage from '../assets/default-avatar-profile-icon-of-social-media-user-vector.jpg';


const Navbar = () => {
	const { user } = useSelector(store => store.auth);
	const [logoutUser, { data, isSuccess }] = useLogoutUserMutation();
	const logoutHandler = async () => {
		await logoutUser();
	};
	const navigate = useNavigate();
	useEffect(() => {
		if (isSuccess) {
			toast.success(data.message || "User Logged Out");
			navigate("/login");
		}
	}, [isSuccess]);
	// const user = true;

	return (
		<div className="h-16 dark:bg-[#020817] bg-gray-200 border-b dark:border-b-gray-800 border-b-gray-200 fixed top-0 left-0 right-0 duration-300 z-20 px-6 py-2 rounded-b-sm">
			{/* Desktop */}
			<div className="max-w-7xl mx-auto hidden md:flex justify-between items-center gap-10 h-full">
				<div className="flex items-center gap-2">
					<Link to="/" className='flex flex-row gap-2'>
						<School size={"30"} />
						<h1 className="hidden md:block font-extrabold text-2xl">ZESTARA</h1>
					</Link>
				</div>
				{/* user icons and darkmode  icon*/}
				<div className='flex items-center gap-8'>
					{
						user ? (
							<DropdownMenu>
								<DropdownMenuTrigger asChild>
									<Avatar>
										<AvatarImage src={user?.photoUrl || userImage} alt="@shadcn" onError={(e) => {
											e.target.onerror = null; // prevent infinite loop
											e.target.src = 'C:/Users/risha/OneDrive/Desktop/lm8/lms_system/client/src/assets/default-avatar-profile-icon-of-social-media-user-vector.jpg';
										}} />
										<AvatarFallback>
											<img className="w-[140%] max-w-xl" src={userImage}></img>
										</AvatarFallback>
									</Avatar>
								</DropdownMenuTrigger>
								<DropdownMenuContent>
									<DropdownMenuLabel>My Account</DropdownMenuLabel>
									<DropdownMenuSeparator />
									<Link to="my-learning"><DropdownMenuItem>Learning</DropdownMenuItem></Link>
									<Link to="profile"><DropdownMenuItem>Edit Profile</DropdownMenuItem></Link>
									{
										user.role === "instructor" && (
											<>
												<DropdownMenuSeparator />
												<Link to="/admin/dashboard"><DropdownMenuItem>Dashboard</DropdownMenuItem></Link></>
										)
									}
									<DropdownMenuItem onClick={logoutHandler}>Log Out</DropdownMenuItem>
								</DropdownMenuContent>
							</DropdownMenu>

						) : (
							<div className="flex items-center gap-2">
								<Button variant="outline" onClick={() => navigate("/login")}>Login</Button>
								<Button onClick={() => navigate("/login")}>Signup</Button>
							</div>
						)
					}
					<DarkMode />
				</div>
			</div>
			{/* Mobile */}
			<div className='flex md:hidden items-center justify-between px-4 h-full'>
				<Link to="/" className='flex flex-row gap-2'>
					<h1 className="font-extrabold text-2xl">ZESTARA</h1>
				</Link>
				<MobileNavbar user={user} />
			</div>

		</div>
	)
}

export default Navbar

const MobileNavbar = ({user}) => {
	// const { user } = useSelector(store => store.auth);
	const [logoutUser, { data, isSuccess }] = useLogoutUserMutation();
	const logoutHandler = async () => {
		await logoutUser();
	};
	const navigate = useNavigate();
	useEffect(() => {
		if (isSuccess) {
			toast.success(data.message || "User Logged Out");
			navigate("/login");
		}
	}, [isSuccess]);
	// const role = user.role;
	// const navigate = useNavigate();
	return (
		<Sheet>
			<SheetTrigger asChild>
				<Button size='icon' variant="outline" className="rounded-full  hover:bg-gray-100">
					<Menu />
				</Button>
			</SheetTrigger>
			<SheetContent className="flex flex-col">
				<SheetHeader className="flex flex-row item-center justify-between mt-2">
					<Link to="/" className='flex flex-row gap-2'>
						<School size={"30"} />
						<SheetTitle>ZESTARA</SheetTitle>
					</Link>
					<DarkMode />
				</SheetHeader>
				<Separator className='mr-2' />
				<nav className='flex flex-col space-y-4'>
					<Link to="/my-learning"><span>My Learning</span></Link>
					<Link to="/profile"><span>Edit Profile</span></Link>
					<Button onClick={logoutHandler}><span>Log Out</span></Button>
				</nav>
				{
					user?.role === "instructor" && (
						<SheetFooter>
							<SheetClose asChild>
								<Button type="submit" onClick={() => navigate("/admin/dashboard")}>Dashboard</Button>
							</SheetClose>
						</SheetFooter>
					)
				}
			</SheetContent>
		</Sheet>
	)
}