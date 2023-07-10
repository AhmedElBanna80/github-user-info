import { json, type DataFunctionArgs } from '@remix-run/node'
import { NavLink, Outlet, useLoaderData } from '@remix-run/react'
import clsx, { type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { getUserInfo } from '~/models/github-user.server.ts'
import { invariantResponse } from '~/utils/misc.ts'

export function cn(...inputs: ClassValue[]) {
	//@ts-ignore
	return twMerge(clsx(inputs))
}

export async function loader({ params }: DataFunctionArgs) {
	const { username } = params
	invariantResponse(username, 'username should be defined')
	const userData = await getUserInfo(username)
	console.log(userData)
	return json({ userData })
}

export default function Userinfo() {
	const { userData } = useLoaderData<typeof loader>()
	const ownerDisplayName = userData.name ?? userData.login
	const navLinkDefaultClassName =
		'line-clamp-2 block rounded-l-full py-2 pl-8 pr-6 text-base lg:text-xl'
	return (
		<div className="container flex h-full min-h-[400px] pb-12">
			<div className="grid w-full flex-grow grid-cols-4 bg-muted pl-2 md:container md:mx-2 md:rounded-3xl md:pr-0">
				<div className="relative col-span-1">
					<div className="absolute inset-0 flex flex-col">
						<div className="flex flex-col items-center justify-center gap-2 bg-muted pb-4 pl-8 pr-4 pt-12 lg:flex-row lg:justify-start lg:gap-4">
							<img
								src={userData.avatar_url}
								alt={ownerDisplayName}
								className="lg:h-22 lg:w-22 h-16 w-16 rounded-full object-cover sm:h-12 sm:w-12"
							/>
							<h1 className="md:text-md  text-center text-base lg:text-left lg:text-2xl">
								<a
									href={userData.html_url}
									className="text-sm text-indigo-500 hover:underline"
									target="_blank"
									rel="noreferrer"
								>
									{ownerDisplayName}
								</a>
							</h1>
						</div>
						<ul className="overflow-y-auto overflow-x-hidden pb-12">
							<li key="repos">
								<NavLink
									to="repos"
									className={({ isActive }) =>
										cn(navLinkDefaultClassName, isActive && 'bg-accent')
									}
								>
									Public Repos
								</NavLink>
							</li>
							<li key="followers">
								<NavLink
									to="followers"
									className={({ isActive }) =>
										cn(navLinkDefaultClassName, isActive && 'bg-accent')
									}
								>
									Followers
								</NavLink>
							</li>
							<li key="following">
								<NavLink
									to="following"
									className={({ isActive }) =>
										cn(navLinkDefaultClassName, isActive && 'bg-accent')
									}
								>
									Following
								</NavLink>
							</li>
						</ul>
					</div>
				</div>
				<main className="relative col-span-3 bg-accent md:rounded-r-3xl">
					<Outlet />
				</main>
			</div>
		</div>
	)
}
