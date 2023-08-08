const DAY_MILLISECONDS = 1000 * 60 * 60 * 24;
const formatDate = (date) => {
  return new Date(date).toLocaleDateString("en-us", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};
function getRelativeTime(timestamp) {
  const rtf = new Intl.RelativeTimeFormat("ar", {
    numeric: "auto",
  });
  const daysDifference = Math.round(
    (timestamp - new Date().getTime()) / DAY_MILLISECONDS
  );

  return rtf.format(daysDifference, "day");
}
export { formatDate, getRelativeTime };
