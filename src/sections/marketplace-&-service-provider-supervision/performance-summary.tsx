import React from 'react';
import Chart from 'react-apexcharts';
import { Box, Typography, useTheme, useMediaQuery } from '@mui/material';
import { ApexOptions } from "apexcharts";
import { HeadingCommon } from "src/components/multiple-responsive-heading/heading";

export function PerformanceSummary() {
    const theme = useTheme();
    const isXs = useMediaQuery(theme.breakpoints.down('sm'));
    const isSm = useMediaQuery(theme.breakpoints.between('sm', 'md'));
    const chartOptions: ApexOptions = {
        chart: {
            type: 'bar',
            toolbar: { show: false },
        },
        title: {
            text: 'Most Popular Services',
            align: 'center',
            style: {
                fontSize: isXs ? '14px' : '18px',
                fontWeight: 600,
            },
        },
        xaxis: {
            categories: [
                'DJ & Entertainment',
                'Catering Service',
                'Photography & Video',
                'Venue Rental',
                'Hosts & Presenters'
            ],
            labels: {
                rotate: -15,
                style: {
                    fontSize: isXs ? '10px' : '12px',
                },
            }
        },
        yaxis: {
            labels: {
                style: {
                    fontSize: isXs ? '10px' : '12px',
                }
            }
        },
        colors: ['#2196f3'],
        dataLabels: {
            enabled: false
        },
        plotOptions: {
            bar: {
                columnWidth: '45%',
                distributed: true
            }
        },
        responsive: [
            {
                breakpoint: 768,
                options: {
                    chart: { height: 300 },
                },
            },
            {
                breakpoint: 480,
                options: {
                    chart: { height: 250 },
                },
            },
        ],
        markers: {
            discrete: [
                {
                    seriesIndex: 0,
                    dataPointIndex: 3,
                    fillColor: '#FF0000',
                    strokeColor: '#FF0000',
                    size: 5
                }
            ]
        }
    };

    const chartSeries = [{
        name: 'Service Requests',
        data: [35, 28, 22, 17, 9]
    }];
    return (
        <>
            <HeadingCommon title="Monitoring Event Market Trends" width={600} baseSize="22px" />
            <HeadingCommon title="Analysis of the most requested services and marketplace trends." baseSize="16px" />

            <Chart
                options={chartOptions}
                series={chartSeries}
                type="bar"
                height={isXs ? 250 : isSm ? 300 : 350}
            />
        </>
    )
}