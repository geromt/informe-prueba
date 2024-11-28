"use client";

import { AreaChart, Area, ResponsiveContainer } from "recharts";

export function AreaChartComponent({data}) {
    console.log(data)
    return (
        <>
            <h1>Area Chart</h1>
            <ResponsiveContainer width="100%" height={300}>
                <AreaChart width={500} height={300} data={data.wos_data}>
                    <Area type='monotone' dataKey='year' stroke='#8884d8' />
                </AreaChart>
            </ResponsiveContainer>
        </>
    );
}