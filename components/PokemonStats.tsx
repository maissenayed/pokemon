import { useMemo } from "react";
import {
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Tooltip,
} from "recharts";

function PokemonStats({ stats }) {
  const statData = useMemo(() => {
    return stats?.map((el) => ({
      name: el.stat.name.replace("-", " "),
      value: el.base_stat,
    }));
  }, [stats]);

  return (
    <ResponsiveContainer height={200}>
      <RadarChart data={statData} className="capitalize">
        <PolarGrid />
        <PolarAngleAxis dataKey="name" />
        <PolarRadiusAxis domain={[0, 255]} />
        <Radar
          dataKey="value"
          stroke="#8884d8"
          fill="#8884d8"
          fillOpacity={0.6}
        />
        <Tooltip />
      </RadarChart>
    </ResponsiveContainer>
  );
}

export default PokemonStats;
