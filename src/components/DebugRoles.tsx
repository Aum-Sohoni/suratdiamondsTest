
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAdminAuth } from "@/hooks/useAdminAuth";

export const DebugRoles = ({ userId }: { userId: string | undefined }) => {
    const [roles, setRoles] = useState<any[]>([]);
    const { isAdmin } = useAdminAuth();

    useEffect(() => {
        if (!userId) return;
        const fetchRoles = async () => {
            const { data, error } = await supabase
                .from("user_roles")
                .select("*")
                .eq("user_id", userId);

            if (data) setRoles(data);
            if (error) console.error("Debug fetch error:", error);
        };
        fetchRoles();
    }, [userId]);

    return (
        <div className="space-y-1">
            <p>Is Admin (Hook): {isAdmin ? "YES" : "NO"}</p>
            <p>DB Roles found: {roles.length}</p>
            {roles.map((r, i) => (
                <p key={i}>- Role: {r.role}</p>
            ))}
        </div>
    );
};
