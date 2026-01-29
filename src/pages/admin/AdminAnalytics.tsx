import { useState, useEffect } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import {
    Users,
    Eye,
    MapPin,
    BarChart3,
    Loader2,
    Globe,
    ArrowUpRight
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface AnalyticsEvent {
    id: string;
    event_type: string;
    page_path: string;
    metadata: any;
    user_id: string | null;
    session_id: string;
    created_at: string;
}

export const AdminAnalytics = () => {
    const [events, setEvents] = useState<AnalyticsEvent[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchAnalytics = async () => {
            try {
                const { data, error } = await (supabase.from("analytics_events" as any) as any)
                    .select("*")
                    .order("created_at", { ascending: false });

                if (error) throw error;
                setEvents((data as any) || []);
            } catch (err) {
                console.error("Error fetching analytics:", err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchAnalytics();
    }, []);

    const totalViews = events.length;
    const uniqueVisitors = new Set(events.map(e => e.session_id)).size;

    // Group by location (Country)
    const viewsByCountry = events.reduce((acc: any, event) => {
        const country = event.metadata?.location?.country || "Unknown";
        acc[country] = (acc[country] || 0) + 1;
        return acc;
    }, {});

    // Group by location (City)
    const viewsByCity = events.reduce((acc: any, event) => {
        const city = event.metadata?.location?.city || "Unknown";
        acc[city] = (acc[city] || 0) + 1;
        return acc;
    }, {});

    const sortedCountries = Object.entries(viewsByCountry)
        .sort(([, a]: any, [, b]: any) => b - a)
        .slice(0, 5);

    const sortedCities = Object.entries(viewsByCity)
        .sort(([, a]: any, [, b]: any) => b - a)
        .slice(0, 5);

    const stats = [
        {
            title: "Total Page Views",
            value: totalViews.toLocaleString(),
            icon: Eye,
            description: "Total events logged",
        },
        {
            title: "Unique Visitors",
            value: uniqueVisitors.toLocaleString(),
            icon: Users,
            description: "Based on session IDs",
        },
        {
            title: "Top Country",
            value: sortedCountries[0]?.[0] || "N/A",
            icon: Globe,
            description: `${sortedCountries[0]?.[1] || 0} visits`,
        },
        {
            title: "Top City",
            value: sortedCities[0]?.[0] || "N/A",
            icon: MapPin,
            description: `${sortedCities[0]?.[1] || 0} visits`,
        },
    ];

    return (
        <AdminLayout>
            <div className="space-y-8">
                <div>
                    <h1 className="text-3xl font-bold text-foreground">Analytics</h1>
                    <p className="text-muted-foreground">Monitor website traffic and visitor locations</p>
                </div>

                {/* Stats Grid */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    {stats.map((stat, index) => (
                        <Card key={index}>
                            <CardHeader className="flex flex-row items-center justify-between pb-2">
                                <CardTitle className="text-sm font-medium text-muted-foreground">
                                    {stat.title}
                                </CardTitle>
                                <stat.icon className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                {isLoading ? (
                                    <Skeleton className="h-8 w-24" />
                                ) : (
                                    <>
                                        <div className="text-2xl font-bold">{stat.value}</div>
                                        <p className="text-xs text-muted-foreground">{stat.description}</p>
                                    </>
                                )}
                            </CardContent>
                        </Card>
                    ))}
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                    {/* Top Locations Card */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <BarChart3 className="h-5 w-5" />
                                Top Countries
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            {isLoading ? (
                                <div className="space-y-4">
                                    {[1, 2, 3].map((i) => <Skeleton key={i} className="h-10 w-full" />)}
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {sortedCountries.map(([country, visits]: any) => (
                                        <div key={country} className="flex items-center justify-between p-2 border-b last:border-0">
                                            <span className="font-medium">{country}</span>
                                            <span className="text-muted-foreground">{visits} views</span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Top Cities Card */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <MapPin className="h-5 w-5" />
                                Top Cities
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            {isLoading ? (
                                <div className="space-y-4">
                                    {[1, 2, 3].map((i) => <Skeleton key={i} className="h-10 w-full" />)}
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {sortedCities.map(([city, visits]: any) => (
                                        <div key={city} className="flex items-center justify-between p-2 border-b last:border-0">
                                            <span className="font-medium">{city}</span>
                                            <span className="text-muted-foreground">{visits} views</span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>

                {/* Recent Events */}
                <Card>
                    <CardHeader>
                        <CardTitle>Recent Visitor Activity</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {isLoading ? (
                            <div className="space-y-4">
                                {[1, 2, 3, 4, 5].map((i) => <Skeleton key={i} className="h-12 w-full" />)}
                            </div>
                        ) : events.length === 0 ? (
                            <p className="text-muted-foreground text-center py-8">No analytics data yet</p>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm">
                                    <thead>
                                        <tr className="border-b text-left">
                                            <th className="pb-3 pr-4 font-semibold uppercase tracking-wider text-muted-foreground text-xs">Time</th>
                                            <th className="pb-3 pr-4 font-semibold uppercase tracking-wider text-muted-foreground text-xs">Event</th>
                                            <th className="pb-3 pr-4 font-semibold uppercase tracking-wider text-muted-foreground text-xs">Page</th>
                                            <th className="pb-3 pr-4 font-semibold uppercase tracking-wider text-muted-foreground text-xs">Location</th>
                                            <th className="pb-3 font-semibold uppercase tracking-wider text-muted-foreground text-xs">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {events.slice(0, 10).map((event) => (
                                            <tr key={event.id} className="border-b last:border-0 hover:bg-muted/50 transition-colors">
                                                <td className="py-4 pr-4 whitespace-nowrap">
                                                    {new Date(event.created_at).toLocaleString([], { hour: '2-digit', minute: '2-digit' })}
                                                </td>
                                                <td className="py-4 pr-4 capitalize font-medium">{event.event_type.replace('_', ' ')}</td>
                                                <td className="py-4 pr-4 text-muted-foreground">{event.page_path}</td>
                                                <td className="py-4 pr-4">
                                                    <div className="flex flex-col">
                                                        <span className="font-medium">{event.metadata?.location?.city || "Unknown"}</span>
                                                        <span className="text-xs text-muted-foreground">{event.metadata?.location?.country || "Earth"}</span>
                                                    </div>
                                                </td>
                                                <td className="py-4">
                                                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-secondary text-secondary-foreground">
                                                        Active
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </AdminLayout>
    );
};

export default AdminAnalytics;
