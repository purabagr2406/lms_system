import { School } from 'lucide-react'
import React from 'react'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from './ui/button';


const Navbar = () => {
	const user = true;
	return (
		<div className='h-16 dark:bg-[#0A0A0A] bg-white border-b dark:border-b-gray-800 border-b-gray-200 fixed top-0 left-0 right-0 duration-300 z-10'>
			<div className='max-w-7xl mx-auto hidden md:flex justify-between items-center gap-10 h-full'>
				<div className='flex items-center gap-2'>
					<School size={"30"} />
					<h1 className='hidden md :block font-extrabold text-2xl'>E-learing</h1>
				</div>
				{/* user icons and darkmode  icon*/}
				<div>
					{
						user ? (
							<DropdownMenu>
								<DropdownMenuTrigger>Open</DropdownMenuTrigger>
								<DropdownMenuContent>
									<DropdownMenuLabel>My Account</DropdownMenuLabel>
									<DropdownMenuSeparator />
									<DropdownMenuItem>Profile</DropdownMenuItem>
									<DropdownMenuItem>Billing</DropdownMenuItem>
									<DropdownMenuItem>Team</DropdownMenuItem>
									<DropdownMenuItem>Subscription</DropdownMenuItem>
								</DropdownMenuContent>
							</DropdownMenu>

						) : (
							<div>
								<Button variant="outlint">Login</Button>
								<Button>Signup</Button>
							</div>
						)
					}
				</div>
			</div>
		</div>
	)
}

export default Navbar
