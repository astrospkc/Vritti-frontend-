export function groupJournalsByMonthAndWeek(journals) {
  const result = {};

  journals.forEach((journal) => {
    const date = new Date(journal.date);
    const monthYear = date.toLocaleString("default", {
      month: "long",
      year: "numeric",
    });
    const day = date.getDate();

    let week = "";
    if (day <= 7) week = "Week 1";
    else if (day <= 14) week = "Week 2";
    else if (day <= 21) week = "Week 3";
    else if (day <= 28) week = "week 4";
    else week = "Week 5";

    if (!result[monthYear]) result[monthYear] = {};
    if (!result[monthYear][week]) result[monthYear][week] = [];
    result[monthYear][week].push(journal);
  });

  return result;
}
