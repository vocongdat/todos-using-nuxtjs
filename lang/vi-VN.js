export default async (context, locale) => {
  return await Promise.resolve({
    overview: 'Tổng quan',
    stars: 'Đánh giá',
    projects: 'Dự án',
    chat: 'Trò chuyện',
    calender: 'Lịch',
    settings: 'Cài đặt',
    logout: 'Đăng xuất',
    thisWeek: 'Tuần này',
    search: 'Tìm kiếm',
  })
}
