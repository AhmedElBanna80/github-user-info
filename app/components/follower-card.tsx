import { type Follower } from '~/models/github-followers.server.ts'
import { Card } from './ui/card.tsx'

export default function FollowerCard(props: { follower: Follower }) {
	const { follower } = props
	return (
		<Card>
			<div className="flex flex-col justify-center gap-2 pb-4 pl-8 pr-4 pt-12 lg:flex-row lg:justify-start lg:gap-4">
				<img
					src={follower.avatar_url}
					alt={follower.login}
					className="lg:h-22 lg:w-22 h-16 w-16 rounded-full object-cover sm:h-12 sm:w-12"
				/>
				<a
					href={follower.html_url}
					target="_blank"
					rel="noreferrer"
					className="text-bold"
				>
					{follower.login}
				</a>
			</div>
		</Card>
	)
}
