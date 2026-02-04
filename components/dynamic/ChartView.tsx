'use client';

import { ChartData } from '@/lib/types';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';

interface ChartViewProps {
  data: ChartData;
}

const COLORS = ['#0078d4', '#00bcf2', '#00b294', '#bad80a', '#ffc83d', '#ff8c00'];

export default function ChartView({ data }: ChartViewProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
      <h3 className="text-lg font-semibold mb-4">{data.title}</h3>
      <ResponsiveContainer width="100%" height={300}>
        {data.type === 'bar' && (
          <BarChart data={data.data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={data.xAxisKey || 'name'} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey={data.yAxisKey || 'value'} fill="#0078d4" />
          </BarChart>
        )}

        {data.type === 'line' && (
          <LineChart data={data.data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={data.xAxisKey || 'name'} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey={data.yAxisKey || 'value'} stroke="#0078d4" strokeWidth={2} />
          </LineChart>
        )}

        {data.type === 'pie' && (
          <PieChart>
            <Pie
              data={data.data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name}: ${((percent || 0) * 100).toFixed(0)}%`}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
            >
              {data.data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        )}
      </ResponsiveContainer>
    </div>
  );
}
