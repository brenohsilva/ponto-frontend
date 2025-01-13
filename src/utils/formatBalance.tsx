export const formatBalance = (balance: number): string => {
  const totalMinutes = Math.round(balance * 60);
  const hours = Math.floor(Math.abs(totalMinutes) / 60);
  const minutes = Math.abs(totalMinutes) % 60;
  return `${balance < 0 ? "-" : "+"}${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}`;
};
