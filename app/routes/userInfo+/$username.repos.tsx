import { json, type LoaderArgs } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { getRepos } from '~/models/github-repos.server.ts'
import { invariantResponse } from '~/utils/misc.ts'

export async function loader({ params }: LoaderArgs) {
	const { username } = params
	invariantResponse(username, 'username should be defined')
	const userRepos = await getRepos(username)
	return json({ userRepos })
}

export default function Repos() {
	const { userRepos } = useLoaderData<typeof loader>()
	return (
		<ul className="overflow-y-auto overflow-x-hidden pb-12">
			{userRepos.map(repo => (
				<li key={repo.id} className="py-2 pl-8 pr-6 text-base lg:text-xl">
					<a href={repo.html_url} target="_blank" rel="noreferrer">
						{repo.full_name}
					</a>
				</li>
			))}
		</ul>
	)
}
