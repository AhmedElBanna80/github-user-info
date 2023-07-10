// Generated by https://quicktype.io

import { type GithubUserInfo } from "./github-user.server.ts"

export interface GithubRepo {
	id: number
	node_id: string
	name: string
	full_name: string
	private: boolean
	owner: GithubUserInfo
	html_url: string
	description: null | string
	fork: boolean
	url: string
	forks_url: string
	keys_url: string
	collaborators_url: string
	teams_url: string
	hooks_url: string
	issue_events_url: string
	events_url: string
	assignees_url: string
	branches_url: string
	tags_url: string
	blobs_url: string
	git_tags_url: string
	git_refs_url: string
	trees_url: string
	statuses_url: string
	languages_url: string
	stargazers_url: string
	contributors_url: string
	subscribers_url: string
	subscription_url: string
	commits_url: string
	git_commits_url: string
	comments_url: string
	issue_comment_url: string
	contents_url: string
	compare_url: string
	merges_url: string
	archive_url: string
	downloads_url: string
	issues_url: string
	pulls_url: string
	milestones_url: string
	notifications_url: string
	labels_url: string
	releases_url: string
	deployments_url: string
	created_at: string
	updated_at: string
	pushed_at: string
	git_url: string
	ssh_url: string
	clone_url: string
	svn_url: string
	homepage: null | string
	size: number
	stargazers_count: number
	watchers_count: number
	language: null | string
	has_issues: boolean
	has_projects: boolean
	has_downloads: boolean
	has_wiki: boolean
	has_pages: boolean
	has_discussions: boolean
	forks_count: number
	mirror_url: null
	archived: boolean
	disabled: boolean
	open_issues_count: number
	license: License | null
	allow_forking: boolean
	is_template: boolean
	web_commit_signoff_required: boolean
	topics: any[]
	visibility: Visibility
	forks: number
	open_issues: number
	watchers: number
	default_branch: DefaultBranch
}

export enum DefaultBranch {
	Master = 'master',
}

export interface License {
	key: string
	name: string
	spdx_id: string
	url: null | string
	node_id: string
}



export enum EventsURL {
	HTTPSAPIGithubCOMUsersKevinpelgrimsEventsPrivacy = 'https://api.github.com/users/kevinpelgrims/events{/privacy}',
}

export enum GistsURL {
	HTTPSAPIGithubCOMUsersKevinpelgrimsGistsGistID = 'https://api.github.com/users/kevinpelgrims/gists{/gist_id}',
}

export enum Login {
	Kevinpelgrims = 'kevinpelgrims',
}

export enum NodeID {
	MDQ6VXNlcjExNzU5NjM = 'MDQ6VXNlcjExNzU5NjM=',
}

export enum Type {
	User = 'User',
}

export enum Visibility {
	Public = 'public',
}



export async function getRepos(username: string): Promise<GithubRepo[]> {
    return await fetch(`https://api.github.com/users/${username}/repos`,{
		headers: {
			Authorization: `token ${process.env.GITHUB_TOKEN}`,
		},
	}).then((res) =>
        res.json() as Promise<GithubRepo[]>,
    )
}