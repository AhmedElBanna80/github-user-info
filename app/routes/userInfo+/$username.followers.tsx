import { type LoaderArgs, json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import  UserFollowersCard  from '~/components/follower-card.tsx'
import { getFollowers } from '~/models/github-followers.server.ts'
import { invariantResponse } from '~/utils/misc.ts'

export async function loader({ params }: LoaderArgs) {
	const { username } = params
	invariantResponse(username, 'username should be defined')
	const followers = await getFollowers(username)
    console.log(followers)
	return json({ followers })
}

export default function Followers() {
	const { followers } = useLoaderData<typeof loader>()
	return (
		<ul className="overflow-y-auto overflow-x-hidden pb-12">
			{followers.map(follower => (
				<li key={follower.login}>
				<UserFollowersCard follower={follower} />
				</li>
			))}
		</ul>
	)
}
