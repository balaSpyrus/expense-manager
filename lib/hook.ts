import auth from "@/auth";
import { User } from "firebase/auth";
import { useState, useEffect } from "react";

export const useUserDetails = () => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true)
        auth.onAuthStateChanged((user) => {
            console.log(user);
            setUser(user);
            setLoading(false)
        });
    }, []);

    return { user, isLoading }

}