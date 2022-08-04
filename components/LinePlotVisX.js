import React from "react";
import { Axis } from "@visx/axis";
import { curveNatural } from "@visx/curve";
import { LinearGradient } from "@visx/gradient";
import { MarkerCircle } from "@visx/marker";
import { scaleLinear } from "@visx/scale";
import { LinePath } from "@visx/shape";
import { Text } from "@visx/text";
import { max, min } from "d3-array";

export default function LinePlotVisX({ player, data }) {
  if (data.length > 0 && player) {
    const height = 400;
    const width = 800;
    const padding = 55;

    const xScale = scaleLinear({
      domain: [
        min(data, d => min(d.values, d => d.game)),
        max(data, d => max(d.values, d => d.game)),
      ],
      range: [0 + padding, width - padding],
    });

    const yScale = scaleLinear({
      domain: [
        min(data, d => min(d.values, d => d.rating)),
        max(data, d => max(d.values, d => d.rating)),
      ],
      range: [height - padding, padding * 2],
    });

    const colors = {
      white: "#FFFFFF",
      black: "#1B1B1B",
      gray: "#98A7C0",
      darkGray: "#2A2A2A",
      accent: "#40FEAE",
      darkAccent: "#256769",
    };
    return (
      <svg height={height} width={width}>
        <rect
          x={0}
          y={0}
          width={width}
          height={height}
          style={{
            fill: colors.black,
          }}
          rx={14}
        />
        <Axis
          scale={xScale}
          top={height - padding}
          orientation="bottom"
          stroke={colors.darkGray}
          strokeWidth={1.5}
          tickStroke={colors.darkGray}
          tickLabelProps={() => ({
            fill: colors.gray,
            textAnchor: "middle",
            verticalAnchor: "middle",
          })}
        />
        <Axis
          hideZero
          scale={yScale}
          numTicks={5}
          left={padding}
          orientation="left"
          stroke={colors.darkGray}
          strokeWidth={1.5}
          tickStroke={colors.darkGray}
          tickLabelProps={() => ({
            fill: colors.gray,
            textAnchor: "end",
            verticalAnchor: "middle",
          })}
        />
        <LinearGradient
          id="line-gradient"
          from={colors.accent}
          to={colors.darkAccent}
        />
        <MarkerCircle
          id="marker-circle"
          fill={colors.gray}
          size={1.5}
          refX={2}
        />
        <LinePath
          data={data
            .filter(d => {
              return d.name === player;
            })[0]
            .values.map(g => {
              return [g.game, g.rating];
            })}
          x={d => xScale(d[0])}
          y={d => yScale(d[1])}
          stroke="url('#line-gradient')"
          strokeWidth={3}
          curve={curveNatural}
          markerEnd="url(#marker-circle)"
        />
        <LinePath
          data={data
            .filter(d => {
              return d.name === player;
            })[0]
            .values.map(g => {
              return [g.game, g.rating];
            })}
          x={d => xScale(d[0])}
          y={d => yScale(d[1])}
          fill="url('#background-gradient')"
          curve={curveNatural}
        />
        <Text
          style={{
            fill: colors.white,
            fontSize: 24,
            fontWeight: 600,
          }}
          x={padding / 2}
          y={padding}
        >
          {player}
        </Text>
      </svg>
    );
  } else {
    return null;
  }
}
