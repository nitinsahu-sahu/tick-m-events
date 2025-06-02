import { ApexOptions } from "apexcharts";

export const donutChartOptions: ApexOptions = {
  chart: {
    type: 'donut', // Explicitly specify the type as 'donut'
  },
  labels: ["Attendee Engagement"],
  colors: ["#2395D4"],
  plotOptions: {
    pie: {
      donut: {
        size: "60%",
      },
    },
  },
  dataLabels: {
    enabled: false,
  },
  legend: {
    show: false,
  },
};

export const chartOptions: ApexOptions = {
  chart: { type: "line", toolbar: { show: false } },
  xaxis: { labels: { show: false }, axisBorder: { show: false }, axisTicks: { show: false } },
  stroke: { curve: "smooth" },
  legend: { show: false },
  yaxis: { labels: { show: false } },
};

export const chartrevenuOptions: ApexOptions = {
  chart: {
    type: "line",
    toolbar: { show: false },
  },
  xaxis: {
    categories: ["April", "May", "June", "July", "August", "September", "October", "November"],
  },
  yaxis: {
    labels: {
      formatter: (value: any) => `$${value / 1000}K`,
    },
  },
  tooltip: {
    y: {
      formatter: (val: any) => `$${val.toLocaleString()}`,
    },
  },
  stroke: { curve: "smooth", width: 3 },
  colors: ["#2196f3"],
};

export const chartrevenuSeries = [
  {
    name: "Sales",
    data: [200000, 400000, 600000, 900000, 700000, 500000, 600000, 800000],
  },
];

// Donut Chart (Left Side)
export const donutBestSellingChartOptions: ApexOptions = {
  chart: { type: "donut" },
  labels: ["VIP", "Standard", "Early Bird"],
  legend: { show: false },
  colors: ["#2196F3", "#B0BEC5", "#424242"],
};
export const donutBestSellingChartSeries = [45, 30, 25];

interface EventData {
  type: string;
  color: string;
}

export const eventsDate: Record<string, EventData> = {
  "2024-03-27": { type: "event", color: "#007bff" }, // Blue event
  "2024-03-16": { type: "highlight", color: "#001f3f" }, // Dark event
};

export const salesRevenuChartOptions: ApexOptions = {
  chart: { type: "line", toolbar: { show: false } },
  xaxis: {
    categories: ["April", "May", "June", "July", "August", "September", "October"],
    labels: { style: { colors: "#777", fontSize: "12px" } },
  },
  yaxis: {
    labels: {
      formatter: (val) => `${val}k`,
      style: { colors: "#777", fontSize: "12px" },
    },
  },
  stroke: { curve: "smooth", width: 3 },
  grid: { strokeDashArray: 5 },
  tooltip: { theme: "light" },
  colors: ["#007BFF"],
};

export const salesRevenuChartSeries = [{ name: "Sales", data: [600, 400, 500, 700, 800, 300, 200] }];

export const latestSales = [
  {
    _id: "1",
    img: "/assets/images/avatar/avatar-1.webp",
    name: "Olivia Johanson",
    description: "High Performance Conert 2020",
  },
  {
    _id: "2",
    img: "/assets/images/avatar/avatar-2.webp",
    name: "Griezerman",
    description: "Fireworks Show New Year 2020",
  },
  {
    _id: "3",
    img: "/assets/images/avatar/avatar-3.webp",
    name: "Uli Trumb",
    description: "High Performance Conert 2020..",
  },
  {
    _id: "4",
    img: "/assets/images/avatar/avatar-4.webp",
    name: "Oconner",
    description: "High Performance Conert 2020..",
  }
  
]