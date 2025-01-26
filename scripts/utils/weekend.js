export function isWeekend(date) {
  let d = date.format("dddd");

  if (d === "Saturday") {
    return "Saturday";
  } else if (d === "Sunday") {
    return "Sunday";
  } else {
    return false;
  }
}
