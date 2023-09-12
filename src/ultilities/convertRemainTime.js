export function convertRemainTime(startAt, lastingTime) {
  console.log("lastingTime", lastingTime);
  if (lastingTime.includes("h")) {
    lastingTime = +lastingTime.split("h")[0] * 60 * 60;
  } else if (lastingTime.includes("m")) {
    lastingTime = +lastingTime.split("m")[0] * 60;
  } else if (lastingTime.includes("s")) {
    lastingTime = +lastingTime.split("s")[0];
  }
  let now = Date.now();
  let remainSecs = lastingTime - Math.floor(now - startAt) / 1000;
  if (remainSecs <= 0) return "0h 0m 0s";
  let secs = Math.floor(remainSecs % 60);
  let mins = Math.floor((remainSecs / 60) % 60);
  let hs = Math.floor(remainSecs / 60 / 60);

  return `${hs} hours ${mins}m ${secs}s`;
}
