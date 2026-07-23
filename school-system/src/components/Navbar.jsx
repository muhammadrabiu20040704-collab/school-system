import { useEffect, useState } from "react";

export default function Navbar() {

    const [user, setUser] = useState(null);
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [greeting, setGreeting] = useState("");

    useEffect(() => {

        const savedUser = localStorage.getItem("user");

        if (savedUser) {

            setUser(JSON.parse(savedUser));

        }

        const interval = setInterval(() => {

        const now = new Date();

const hour = now.getHours();

const formattedDate = now.toLocaleDateString("en-NG", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
});

const formattedTime = now.toLocaleTimeString("en-NG", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
});

setDate(formattedDate);

setTime(formattedTime);

if (hour < 12) {

    setGreeting("Good Morning ☀️");

} else if (hour < 17) {

    setGreeting("Good Afternoon 🌤️");

} else {

    setGreeting("Good Evening 🌙");

}

        }, 1000);

        return () => {

            clearInterval(interval);

        };

        setDate(formattedDate);

setTime(formattedTime);


    }, []);

    const logout = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("user");

        window.location.href = "/login";

    };

    return (

        <div className="navbar">

            <div className="navbar">

                <h2>
                    Welcome {user?.name || "User"} 
                </h2>

                <h2>{greeting}</h2>

                <p>{date}</p>

                <p>{time}</p>

            </div>

            <div className="navbar">

                <button
                    onClick={logout}
                    className="btn btn-warning"
                >
                    Logout
                </button>

            </div>

        </div>

    );

}