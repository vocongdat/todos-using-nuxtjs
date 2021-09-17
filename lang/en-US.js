export default async (context, locale) => {
  return await Promise.resolve({
    overview: 'Overview',
    stars: 'Stars',
    projects: 'Projects',
    chat: 'Chat',
    calender: 'Calender',
    settings: 'Settings',
    logout: 'Log out',
    thisWeek: 'This Week',
    search: 'Search',
  })
}
