export default function DashboardCard({

    title,
    value,
    icon,
    subtitle

}) {

    return (

        <div className="stat-card">

            <div className="card-icon">

                {icon}

            </div>

            <h3 className="card-title">

                {title}

            </h3>

            <h2 className="card-value">

                {value}

            </h2>

            <p className="card-subtitle">

                {subtitle}

            </p>

        </div>

    );

}