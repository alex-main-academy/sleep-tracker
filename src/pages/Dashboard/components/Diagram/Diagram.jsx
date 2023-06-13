import {
  XYPlot,
  XAxis,
  YAxis,
  HorizontalGridLines,
  LineSeries,
} from "react-vis";
import css from "./Diagram.module.scss";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";

const Diagram = () => {
  const isDarkMode = useSelector((state) => state.isDarkMode);
  const sleeps = useSelector((state) => state.user.sleeps);
  const [data, setData] = useState(null);

  useEffect(() => {
    if (sleeps) {
      const reversedSleeps = sleeps.slice().reverse();
      const chartData = reversedSleeps.map((sleep, index) => ({
        x: index,
        y: parseInt(sleep.durationHours),
      }));

      setData(chartData);
    }
  }, [sleeps]);

  return (
    <div className={css.diagram}>
      <div
        className={css.diagram__wrapper}
        style={
          isDarkMode
            ? { backgroundColor: "#360A46", stroke: "gray" }
            : { backgroundColor: "#FFFFFF", stroke: "#000000" }
        }
      >
        <XYPlot width={600} height={250} className={css.diagram__window}>
          <HorizontalGridLines />
          <LineSeries className={css.diagram__lines} data={data} />
          <XAxis />
          <YAxis />
        </XYPlot>
      </div>
    </div>
  );
};

export default Diagram;
