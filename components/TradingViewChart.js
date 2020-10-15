import { useRef, useEffect, useState } from "react";
import Numeral from "numeral";
import { createChart } from "lightweight-charts";
import { chartTypes } from "../constants";
import { useMeasure } from "react-use";

const dollarFormatter = (num) => {
  return Numeral(num).format("$0.[00]a");
};

const renderChart = (ref, data, type) => {
  const chart = createChart(ref.current, {
    width: 600,
    height: 300,
    grid: {
      vertLines: {
        visible: false,
      },
    },
    layout: {
      textColor: "#9795A6",
    },
    localization: {
      priceFormatter: dollarFormatter,
    },
    priceScale: {
      borderVisible: false,
      position: "left",
      scaleMargins: {
        bottom: 0,
      },
    },
    timeScale: {
      borderColor: "rgba(0,0,0,0.2)",
      drawTicks: false,
    },
  });

  switch (type) {
    case chartTypes.BAR:
      const barSeries = chart.addHistogramSeries({
        color: "#6e5ce6",
      });
      barSeries.setData(data);
      break;
    case chartTypes.LINE:
      const lineSeries = chart.addAreaSeries({
        topColor: "rgba(110, 92, 230, 0.5)",
        bottomColor: "rgba(110, 92, 230, 0)",
        lineColor: "#6e5ce6",
        lineWidth: 4,
      });
      lineSeries.setData(data);
      break;
  }

  chart.timeScale().fitContent();

  return chart;
};

const VolumeChart = ({ data, type }) => {
  const ref = useRef();
  const [chart, setChart] = useState(null);
  const [containerRef, { width }] = useMeasure();

  useEffect(() => {
    if (ref.current) {
      const renderedChart = renderChart(ref, data, type);
      setChart(renderedChart);
    }

    return () => {
      if (ref.current) {
        ref.current.innerHTML = "";
      }
    };
  }, [ref]);

  useEffect(() => {
    if (chart) {
      chart.resize(width, 300);
      chart.timeScale().fitContent();
    }
  }, [chart, width]);

  return (
    <div ref={containerRef}>
      <div ref={ref}></div>
    </div>
  );
};

export default VolumeChart;
