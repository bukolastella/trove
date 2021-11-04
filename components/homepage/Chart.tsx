import React from "react";
import {
  ResponsiveContainer,
  LineChart,
  XAxis,
  Line,
  Tooltip,
  CartesianGrid,
  YAxis,
} from "recharts";
import { data } from "./Data";

const Chart = () => {
  return (
    <ResponsiveContainer width="100%">
      <LineChart
        data={data}
        margin={{ top: 5, right: 20, bottom: 5, left: 20 }}
        // activeDot={{ r: 8 }}
        // strokeWidth={4}
      >
        <XAxis dataKey="name" stroke="#898a8a" />
        {/* <Line type="monotone" dataKey="pricePerShare" stroke="#939060" /> */}
        <Line type="monotone" dataKey="equityValue" stroke="#939060" />
        {/* <Line type="monotone" dataKey="totalQuantity" stroke="#939060" /> */}
        <Tooltip />
        <CartesianGrid stroke="#e0dfdf" strokeDasharray="5 5" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default Chart;
