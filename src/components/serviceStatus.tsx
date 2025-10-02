interface ServiceStatusProps {
  title: string;
  description: string;
  url: string;
}

export default async function ServiceStatus({
  title,
  description,
  url,
}: ServiceStatusProps) {
  let status = "down"; // assume down
  let uptime;
  
  try {
    const urlResp = await fetch(url, { 
      next: { revalidate: 60 } // cache for 60 seconds
    });
    
    if (urlResp.status === 200) {
      status = "up";
      
      // Only try to parse JSON if content-type is JSON
      const contentType = urlResp.headers.get('content-type');
      if (contentType?.includes('application/json')) {
        const data = await urlResp.json();
        if (data.uptime) {
          // convert seconds to human readable format
          const seconds = Math.floor(data.uptime);
          const days = Math.floor(seconds / (3600 * 24));
          const hours = Math.floor((seconds % (3600 * 24)) / 3600);
          const minutes = Math.floor((seconds % 3600) / 60);
          const secs = seconds % 60;
          uptime = `${days}d ${hours}h ${minutes}m ${secs}s`;
        }
      }
    }
  } catch (error) {
    console.error(`Failed to fetch status for ${title}:`, error);
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
        Status: {status === "up" ? "Online" : "Down"}
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