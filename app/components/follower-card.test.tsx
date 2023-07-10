import { render, screen } from '@testing-library/react'
import { expect, test } from 'vitest'
import FollowerCard from './follower-card.tsx'
import { type Follower, UserType } from '~/models/github-followers.server.ts'

test('renders follower card', () => {
	const follower: Follower = {
		login: 'kevinpelgrims',
		id: 1175963,
		node_id: 'MDQ6VXNlcjExNzU5NjM=',
		avatar_url: 'https://avatars.githubusercontent.com/u/1175963?v=4',
		gravatar_id: '',
		url: 'https://api.github.com/users/kevinpelgrims',
		html_url: 'https://github.com/kevinpelgrims',
		followers_url: 'https://api.github.com/users/kevinpelgrims/followers',
		following_url:
			'https://api.github.com/users/kevinpelgrims/following{/other_user}',
		gists_url: 'https://api.github.com/users/kevinpelgrims/gists{/gist_id}',
		starred_url:
			'https://api.github.com/users/kevinpelgrims/starred{/owner}{/repo}',
		subscriptions_url:
			'https://api.github.com/users/kevinpelgrims/subscriptions',
		organizations_url: 'https://api.github.com/users/kevinpelgrims/orgs',
		repos_url: 'https://api.github.com/users/kevinpelgrims/repos',
		events_url: 'https://api.github.com/users/kevinpelgrims/events{/privacy}',
		received_events_url:
			'https://api.github.com/users/kevinpelgrims/received_events',
		type: UserType.User,
		site_admin: false,
	}

	render(<FollowerCard follower={follower} />)

	// Check that the avatar is displayed
	const avatar = screen.getByRole('img')
	expect(avatar).toHaveAttribute('src', follower.avatar_url)
	expect(avatar).toHaveAttribute('alt', follower.login)

	// Check that the login name is displayed
	const login = screen.getByText(follower.login)
	expect(login).toBeInTheDocument()

	// Check that the login name is a link to the follower's GitHub profile
	expect(login).toHaveAttribute('href', follower.html_url)
})
