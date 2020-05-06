export const RedirectLessonsConfig = {
    list: `/lessons/list`,
    create: `/lessons/create`,
    info: (courseId: number, lessonId: number) => `/lessons/info/${courseId}/${lessonId}`,
}
