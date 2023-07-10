import { cssBundleHref } from '@remix-run/css-bundle'
import {
	json,
	type LoaderArgs,
	type LinksFunction,
	type V2_MetaFunction,
} from '@remix-run/node'
import {
	Link,
	Links,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
	useLoaderData,
	useNavigate,
} from '@remix-run/react'
import { withSentry } from '@sentry/remix'
import { href as iconsHref } from './components/ui/icon.tsx'
import { Toaster } from './components/ui/toaster.tsx'
import fontStylestylesheetUrl from './styles/font.css'
import tailwindStylesheetUrl from './styles/tailwind.css'
import { ClientHintCheck } from './utils/client-hints.tsx'
import { useNonce } from './utils/nonce-provider.ts'
import { Input } from './components/ui/input.tsx'
import { useCallback } from 'react'
import { getEnv } from './utils/env.server.ts'
import { makeTimings } from './utils/timing.server.ts'
import { getFlashSession } from './utils/flash-session.server.ts'
import { combineHeaders } from './utils/misc.ts'

export const links: LinksFunction = () => {
	return [
		// Preload svg sprite as a resource to avoid render blocking
		{ rel: 'preload', href: iconsHref, as: 'image' },
		// Preload CSS as a resource to avoid render blocking
		{ rel: 'preload', href: fontStylestylesheetUrl, as: 'style' },
		{ rel: 'preload', href: tailwindStylesheetUrl, as: 'style' },
		cssBundleHref ? { rel: 'preload', href: cssBundleHref, as: 'style' } : null,
		{ rel: 'mask-icon', href: '/favicons/mask-icon.svg' },
		{
			rel: 'alternate icon',
			type: 'image/png',
			href: '/favicons/favicon-32x32.png',
		},
		{ rel: 'apple-touch-icon', href: '/favicons/apple-touch-icon.png' },
		{
			rel: 'manifest',
			href: '/site.webmanifest',
			crossOrigin: 'use-credentials',
		} as const, // necessary to make typescript happy
		{ rel: 'icon', type: 'image/svg+xml', href: '/favicons/favicon.svg' },
		{ rel: 'stylesheet', href: fontStylestylesheetUrl },
		{ rel: 'stylesheet', href: tailwindStylesheetUrl },
		cssBundleHref ? { rel: 'stylesheet', href: cssBundleHref } : null,
	].filter(Boolean)
}

export const meta: V2_MetaFunction = () => {
	return [
		{ title: 'Github search' },
		{ name: 'description', content: 'Find github user info' },
	]
}

export async function loader({ request }: LoaderArgs) {
	const timings = makeTimings('root loader')

	const { flash, headers: flashHeaders } = await getFlashSession(request)
	return json(
		{
			ENV: getEnv(),
			flash,
		},
		{
			headers: combineHeaders(
				{ 'Server-Timing': timings.toString() },
				flashHeaders,
			),
		},
	)
}

export function App() {
	const data = useLoaderData<typeof loader>()
	const nonce = useNonce()
	const navigate = useNavigate()
	const handleSubmit = useCallback(
		(event: React.FormEvent<HTMLFormElement>) => {
			event.preventDefault()
			const data = new FormData(event.currentTarget)
			const value = data.get('username')
			navigate(`/userinfo/${value}`)
		},
		[navigate],
	)
	return (
		<html lang="en" className={`dark h-full overflow-x-hidden`}>
			<head>
				<ClientHintCheck nonce={nonce} />
				<Meta />
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width,initial-scale=1" />
				<Links />
			</head>
			<body className="bg-background text-foreground">
				<div className="space-between flex h-screen flex-col">
					<header className="container py-6">
						<nav className="flex ">
							<Link to="/">
								<div className="font-light">Github</div>
								<div className="font-bold">User Card</div>
							</Link>
							<form
								method="post"
								className="ml-10 flex flex-1 flex-row"
								onSubmit={handleSubmit}
							>
								<Input
									name="username"
									className="w-px(500) font-bold"
									placeholder="Enter Github User Name"
								></Input>
								<button
									className="ml-2 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
									type="submit"
								>
									Search
								</button>
							</form>
						</nav>
					</header>

					<div className="flex-1">
						<Outlet />
					</div>
				</div>
				<Toaster />
				<ScrollRestoration nonce={nonce} />
				<Scripts nonce={nonce} />
				<script
					nonce={nonce}
					dangerouslySetInnerHTML={{
						__html: `window.ENV = ${JSON.stringify(data.ENV)}`,
					}}
				/>
			</body>
		</html>
	)
}

export default withSentry(App)
