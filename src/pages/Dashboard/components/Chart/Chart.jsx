import { useSelector } from "react-redux";
import css from "./Chart.module.scss";
import { RadialChart } from "react-vis";
import { useEffect } from "react";
import { useState } from "react";

const Chart = () => {
  const isDarkMode = useSelector((state) => state.isDarkMode);
  const sleeps = useSelector((state) => state.user.sleeps);
  const [good, setGood] = useState(0);
  const [bad, setBad] = useState(0);

  useEffect(() => {
    if (sleeps) {
      sleeps.map((item) => {
        if (Number(item.durationHours) >= 6) {
          setGood((good) => (good += 1));
        } else {
          setBad((bad) => (bad += 1));
        }
      });
    }
  }, [sleeps]);

  const data = [
    { angle: bad, label: "Bad Sleep" },
    { angle: good, label: "Good Sleep" },
  ];

  const colorDomain = [0, 1];
  const colorRange = ["#9768D0", "#EDEEEE"];

  return (
    <div
      className={css.chart}
      style={
        isDarkMode
          ? { color: "#FFFFFF", backgroundColor: "#360A46" }
          : { color: "#000000", backgroundColor: "#FFFFFF" }
      }
    >
      <RadialChart
        data={data}
        width={270}
        height={270}
        radius={120}
        innerRadius={80}
        colorDomain={colorDomain}
        colorRange={colorRange}
      />
      <p className={css.chart__quality}>
        Sleep quality <span>{((good / (good + bad)) * 100).toFixed(0)}%</span>
      </p>
    </div>
  );
};

export default Chart;
