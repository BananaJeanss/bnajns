import ServiceStatus from "@/components/serviceStatus";

export default function Statuses() {


    return (
        <div className="p-8 max-w-3xl mx-auto mt-16 min-h-screen">
            <h1 className="text-3xl font-bold mb-4">Service Statuses</h1>
            <hr className="border-white/20 mb-8" />
            <ServiceStatus
                title="ralseibot"
                description="A Discord bot for all your Ralsei-related needs, built with TypeScript and Discord.js. "
                url="https://ralseibot.bnajns.hackclub.app/health"
            />
            <ServiceStatus
                title="Powerbots"
                description="A simple, yet powerful discord bot, with multiple commands such as mod tools, image manipulation, fun commands, etc."
                url="https://powerbots.bnajns.hackclub.app/health"
            />
        </div>
    )
}