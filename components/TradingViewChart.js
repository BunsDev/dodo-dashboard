import { useRef, useEffect, useState } from "react";
import { useMeasure } from "react-use";
import dayjs from "dayjs";
import { createChart } from "lightweight-charts";
import { chartTypes } from "../constants";
import { dollarFormatter } from "../utils";

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

const VolumeChart = ({ data, label, type }) => {
  const ref = useRef();
  const [containerRef, { width }] = useMeasure();
  const [chart, setChart] = useState(null);
  const [tooltipValue, setTooltipValue] = useState(data[data.length - 1].value);

  const onCrosshairMove = (param) => {
    if (!param || !param.time) {
      setTooltipValue(data[data.length - 1].value);
    } else {
      const entry = data.find((d) => {
        return dayjs(d.time).isSame(dayjs(param.time));
      });
      if (entry) {
        setTooltipValue(entry.value);
      }
    }
  };

  useEffect(() => {
    if (ref.current) {
      const renderedChart = renderChart(ref, data, type);
      setChart(renderedChart);
      renderedChart.subscribeCrosshairMove(onCrosshairMove);
    }

    return () => {
      if (ref.current) {
        ref.current.innerHTML = "";
      }
    };
  }, [data, ref]);

  useEffect(() => {
    if (chart) {
      chart.resize(width, 300);
      chart.timeScale().fitContent();
    }
  }, [chart, width]);

  return (
    <div className="pl-2" ref={containerRef}>
      <div className="font-medium mb-1 text-gray-600">{label}</div>
      <div className="text-4xl font-bold leading-none mb-6">
        {dollarFormatter(tooltipValue)}
      </div>
      <div ref={ref}></div>
    </div>
  );
};

export default VolumeChart;
