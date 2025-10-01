import ServiceStatus from "@/components/serviceStatus";
import statuses from "./statuses.json"

export default function Statuses() {
    // pull statuses from statuses.json first
    const serviceStatuses = Object.values(statuses);

    return (
        <div className="p-8 max-w-3xl mx-auto mt-16 min-h-screen">
            <h1 className="text-3xl font-bold mb-4">Service Statuses</h1>
            <hr className="border-white/20 mb-8" />
            {serviceStatuses.map((status) => (
                <ServiceStatus
                    key={status.title}
                    title={status.title}
                    description={status.description}
                    url={status.url}
                />
            ))}
        </div>
    )
}