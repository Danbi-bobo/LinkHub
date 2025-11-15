import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import { MOCK_LINKS, MOCK_CLICK_LOGS } from '../mockData';

const StatCard: React.FC<{ title: string; value: string; icon: string }> = ({ title, value, icon }) => (
    <div className="bg-white border border-gray-200 p-6 rounded-xl flex items-center">
        <div className="bg-blue-100 p-3 rounded-full">
            <i className={`fa ${icon} text-blue-500 text-2xl`}></i>
        </div>
        <div className="ml-4">
            <p className="text-gray-500">{title}</p>
            <p className="text-2xl font-bold text-gray-900">{value}</p>
        </div>
    </div>
);

export const Analytics: React.FC = () => {
    const totalClicks = MOCK_CLICK_LOGS.length;
    const totalLinks = MOCK_LINKS.length;
    const activeLinks = MOCK_LINKS.filter(l => l.status === 'approved').length;
    
    const topLinksData = MOCK_LINKS
        .sort((a, b) => b.clicks - a.clicks)
        .slice(0, 5)
        .map(link => ({ name: link.title, clicks: link.clicks }));

    const clicksOverTimeData = [...Array(7)].map((_, i) => {
        const d = new Date();
        d.setDate(d.getDate() - (6 - i));
        const dateString = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        const clicks = MOCK_CLICK_LOGS.filter(log => new Date(log.timestamp).toDateString() === d.toDateString()).length;
        return { name: dateString, clicks };
    });

    const recentActivity = MOCK_CLICK_LOGS
        .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
        .slice(0, 5);


    return (
        <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard title="Total Clicks" value={totalClicks.toLocaleString()} icon="fa-mouse-pointer" />
                <StatCard title="Total Links" value={totalLinks.toLocaleString()} icon="fa-link" />
                <StatCard title="Active Links" value={activeLinks.toLocaleString()} icon="fa-check-circle" />
                <StatCard title="Avg. Clicks/Link" value={(totalClicks / totalLinks).toFixed(1)} icon="fa-chart-pie" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 bg-white border border-gray-200 p-6 rounded-xl">
                     <h3 className="text-xl font-bold mb-4">Clicks Over Time</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={clicksOverTimeData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(200, 200, 200, 0.5)" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip contentStyle={{ backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '0.5rem' }} />
                            <Legend />
                            <Line type="monotone" dataKey="clicks" stroke="#3b82f6" strokeWidth={2} activeDot={{ r: 8 }} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
                <div className="bg-white border border-gray-200 p-6 rounded-xl">
                    <h3 className="text-xl font-bold mb-4">Top Links</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={topLinksData} layout="vertical">
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(200, 200, 200, 0.5)"/>
                            <XAxis type="number" />
                            <YAxis type="category" dataKey="name" width={80} tick={{fontSize: 12}}/>
                            <Tooltip contentStyle={{ backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '0.5rem' }} cursor={{fill: 'rgba(59, 130, 246, 0.1)'}}/>
                            <Bar dataKey="clicks" fill="#3b82f6" barSize={20} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div className="bg-white border border-gray-200 p-6 rounded-xl">
                <h3 className="text-xl font-bold mb-4">Recent Activity</h3>
                <ul className="divide-y divide-gray-200">
                    {recentActivity.map(log => {
                        const link = MOCK_LINKS.find(l => l.id === log.linkId);
                        return (
                            <li key={log.id} className="py-3 flex items-center justify-between">
                                <p className="text-sm">Someone clicked on <span className="font-semibold text-blue-500">{link?.title}</span></p>
                                <p className="text-sm text-gray-500">{log.timestamp.toLocaleTimeString()}</p>
                            </li>
                        )
                    })}
                </ul>
            </div>
        </div>
    );
};