export function getWeek(day, from = new Date()) {
  from.setMonth(0)
  from.setDate(1)

  const diffDays = Math.ceil(
    (day.getTime() - from.getTime()) / (24 * 60 * 60 * 1000)
  )
  const week = Math.ceil(diffDays / 7) + 1

  return week
}
