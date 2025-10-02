interface ServiceStatusProps {
  title: string;
  description: string;
  url: string;
}

const statusMessages: Record<number, string> = {
  500: "Internal Server Error",
  502: "Bad Gateway",
  503: "Service Unavailable",
  504: "Gateway Timeout",
  522: "Connection Timed Out",
  524: "A Timeout Occurred",
  404: "Not Found",
  429: "Too Many Requests",
  520: "Unknown Error",
  521: "Web Server Is Down",
  523: "Origin Is Unreachable",
};

export default async function ServiceStatus({
  title,
  description,
  url,
}: ServiceStatusProps) {
  let status = "down"; // assume down
  let uptime;
  let statusCode = 0; // if applicable

  try {
    const urlResp = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36",
        Accept: "application/json, text/plain, */*",
      },
    });

    if (urlResp.status === 200) {
      status = "up";
      console.log(`[ServiceStatus] ${title} - Status set to UP`);

      // Only try to parse JSON if content-type is JSON
      const contentType = urlResp.headers.get("content-type");

      if (contentType?.includes("application/json")) {
        const data = await urlResp.json();

        if (data.uptime) {
          // convert seconds to human readable format
          const seconds = Math.floor(data.uptime);
          const days = Math.floor(seconds / (3600 * 24));
          const hours = Math.floor((seconds % (3600 * 24)) / 3600);
          const minutes = Math.floor((seconds % 3600) / 60);
          const secs = seconds % 60;
          uptime = `${days}d ${hours}h ${minutes}m ${secs}s`;
          console.log(`[ServiceStatus] ${title} - Uptime: ${uptime}`);
        }
      }
    } else {
      if (urlResp.status) {
        statusCode = urlResp.status;
      }
    }
  } catch (error) {
    status = "down";
  }
  
  return (
    <div className="border border-white/30 rounded p-4 mb-4">
      <div className="flex items-center mb-2 flex-row">
        <span
          role="status"
          aria-label={status === "up" ? "Service up" : "Service down"}
          style={{
            display: "inline-block",
            width: 12,
            height: 12,
            borderRadius: "50%",
            backgroundColor: status === "up" ? "#16a34a" : "#dc2626",
            marginRight: 8,
            boxShadow: "0 0 0 1px #fff",
          }}
        ></span>
        <h3 className="font-semibold text-white">{title}</h3>
      </div>
      <p className="text-sm text-white/60 mb-2">{description}</p>
      <p className="flex flex-row items-center gap-2">
        Status: {status === "up" ? "Online" : "Down"}{" "}
        {statusCode
          ? `- ${statusCode} ${
              statusMessages[statusCode] ? statusMessages[statusCode] : ""
            }`
          : ""}
        <span className="text-xs text-white/40 break-all transition hover:text-white/80">
          <a href={url} rel="noopener noreferrer" target="_blank">
            {url}
          </a>
        </span>
      </p>
      {uptime && <p className="text-xs text-white/40">Uptime: {uptime}</p>}
    </div>
  );
}
