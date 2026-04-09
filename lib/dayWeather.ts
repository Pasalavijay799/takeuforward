export type DailyWeather = {
  color: string;
  condition: string;
  temperatureLabel: string;
};

type ConditionProfile = {
  color: string;
  label: string;
  tempOffset: number;
};

type MonthWeatherProfile = {
  baseTemp: number;
  conditions: ConditionProfile[];
};

const MONTH_WEATHER: MonthWeatherProfile[] = [
  {
    baseTemp: 2,
    conditions: [
      { color: "#5B84B7", label: "Snowy", tempOffset: -2 },
      { color: "#6A7E9A", label: "Cold", tempOffset: -1 },
      { color: "#7B8FA6", label: "Cloudy", tempOffset: 0 },
    ],
  },
  {
    baseTemp: 5,
    conditions: [
      { color: "#657FA5", label: "Cold", tempOffset: -1 },
      { color: "#5B84B7", label: "Snowy", tempOffset: -2 },
      { color: "#4A9A98", label: "Breezy", tempOffset: 0 },
    ],
  },
  {
    baseTemp: 12,
    conditions: [
      { color: "#3E998C", label: "Fresh", tempOffset: 0 },
      { color: "#4B8FA0", label: "Breezy", tempOffset: -1 },
      { color: "#74879A", label: "Cloudy", tempOffset: 0 },
      { color: "#C48A2D", label: "Sunny", tempOffset: 2 },
    ],
  },
  {
    baseTemp: 18,
    conditions: [
      { color: "#3E998C", label: "Fresh", tempOffset: 0 },
      { color: "#C48A2D", label: "Sunny", tempOffset: 2 },
      { color: "#4B8FA0", label: "Breezy", tempOffset: -1 },
    ],
  },
  {
    baseTemp: 24,
    conditions: [
      { color: "#C48A2D", label: "Sunny", tempOffset: 2 },
      { color: "#C47A1C", label: "Warm", tempOffset: 3 },
      { color: "#4B8FA0", label: "Breezy", tempOffset: -1 },
    ],
  },
  {
    baseTemp: 27,
    conditions: [
      { color: "#2E7BA7", label: "Rainy", tempOffset: 0 },
      { color: "#74879A", label: "Cloudy", tempOffset: -1 },
      { color: "#3C86B0", label: "Showers", tempOffset: -1 },
    ],
  },
  {
    baseTemp: 25,
    conditions: [
      { color: "#1F6D9B", label: "Stormy", tempOffset: -2 },
      { color: "#2E7BA7", label: "Rainy", tempOffset: -1 },
      { color: "#74879A", label: "Cloudy", tempOffset: -1 },
    ],
  },
  {
    baseTemp: 24,
    conditions: [
      { color: "#2E7BA7", label: "Rainy", tempOffset: -1 },
      { color: "#1F6D9B", label: "Stormy", tempOffset: -2 },
      { color: "#6E8F9E", label: "Misty", tempOffset: -1 },
    ],
  },
  {
    baseTemp: 21,
    conditions: [
      { color: "#6E8F9E", label: "Misty", tempOffset: -1 },
      { color: "#74879A", label: "Cloudy", tempOffset: 0 },
      { color: "#2E7BA7", label: "Rainy", tempOffset: -1 },
    ],
  },
  {
    baseTemp: 17,
    conditions: [
      { color: "#8D6B3D", label: "Crisp", tempOffset: -1 },
      { color: "#C48A2D", label: "Sunny", tempOffset: 1 },
      { color: "#4B8FA0", label: "Breezy", tempOffset: -1 },
    ],
  },
  {
    baseTemp: 11,
    conditions: [
      { color: "#6F8396", label: "Cool", tempOffset: -1 },
      { color: "#6E8F9E", label: "Misty", tempOffset: -1 },
      { color: "#74879A", label: "Cloudy", tempOffset: 0 },
    ],
  },
  {
    baseTemp: 4,
    conditions: [
      { color: "#657FA5", label: "Cold", tempOffset: -1 },
      { color: "#5B84B7", label: "Snowy", tempOffset: -2 },
      { color: "#74879A", label: "Cloudy", tempOffset: 0 },
    ],
  },
];

export function getDailyWeather(date: Date): DailyWeather {
  const profile = MONTH_WEATHER[date.getMonth()];
  const day = date.getDate();
  const variation = ((day * 5 + date.getMonth() * 3) % 5) - 2;
  const condition = profile.conditions[(day + date.getMonth() * 2) % profile.conditions.length];
  const temperature = Math.max(-2, profile.baseTemp + variation + condition.tempOffset);

  return {
    color: condition.color,
    condition: condition.label,
    temperatureLabel: `${temperature}°`,
  };
}
