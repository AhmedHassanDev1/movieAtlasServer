

export const parseRunTime = (time: number | undefined) => {
  if (!time) return null;

  const hours = Math.floor(time / 60);
  const minutes = time % 60;

  return `${hours}h ${minutes}m`;
};