import { test, expect } from '@playwright/test';

test('search for a GitHub user', async ({ page }) => {
  // Navigate to the homepage
  await page.goto('http://localhost:3000');

  // Enter a GitHub username into the search field
  await page.fill('input[name="username"]', 'kevinpelgrims');

  // Submit the form
  await page.click('button[type="submit"]');

  // Wait for the navigation to the user info page
  await page.waitForNavigation();

  // Check that the user's avatar is displayed
  const avatar = await page.$('img');
  expect(avatar).not.toBeNull();

  // Check that the user's login name is displayed
  const login = await page.textContent('h1 a');
  expect(login).toBe('Kevin Pelgrims');

  // Check that the "Public Repos" link is displayed
  const reposLink = await page.$('a[href$="repos"]');
  expect(reposLink).not.toBeNull();

  // Check that the "Followers" link is displayed
  const followersLink = await page.$('a[href$="followers"]');
  expect(followersLink).not.toBeNull();

  // Check that the "Following" link is displayed
  const followingLink = await page.$('a[href$="following"]');
  expect(followingLink).not.toBeNull();
});
