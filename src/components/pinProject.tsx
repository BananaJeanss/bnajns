import React from "react";

interface PinnedProjectProps {
  url: string;
  name: string;
  description: string;
  languages?: string | string[] | Record<string, unknown> | null;
  lastUpdated?: string;
}

const languagesColors: Record<string, string> = {
    JavaScript: "bg-yellow-500",
    TypeScript: "bg-blue-500",
    Python: "bg-[#3572A5]",
    Go: "bg-[#00ADD8]",
    CPP: "bg-[#f34b7d]",
    HTML: "bg-orange-500",
    GDScript: "bg-[#355570]",
};

export default function PinnedProject({
  url,
  name,
  description,
  languages,
  lastUpdated,
}: PinnedProjectProps) {
  // Coerce languages into a normalized string array to safely map
  const languageList: string[] = React.useMemo(() => {
    if (!languages) return [];
    if (Array.isArray(languages)) return languages.filter(Boolean) as string[];
    if (typeof languages === "string") return languages ? [languages] : [];
    if (typeof languages === "object") return Object.keys(languages);
    return [];
  }, [languages]);

  const colorKey = (lang: string) => {
    if (lang === "C++") return "CPP"; // map GitHub name to our local key
    return lang;
  };
  return (
    <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 border border-white/30 rounded-lg p-4 mb-4 hover:bg-white/5 transition flex flex-col justify-start">
      <h3 className="text-lg font-bold flex justify-start">
        <div className="flex items-center gap-2">
          {languageList.map((lang) => (
            <span
              key={lang}
              title={lang}
              className={`inline-block w-3 h-3 rounded-full ${
                languagesColors[colorKey(lang)] ?? "bg-gray-500"
              }`}
            />
          ))}
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white transition hover:text-blue-400"
          >
            {name}
          </a>
        </div>
      </h3>
      <p className="text-s text-white/70 mb-1">{description}</p>
    {languageList.length > 0 && (
        <div className="text-sm text-white/50">
      {languageList.map((lang) => (
            <p key={lang}>Language{languageList.length > 1 ? "s" : ""}: {lang}</p>
          ))}
        </div>
      )}
    {lastUpdated && (
        <div className="text-sm text-white/50 my-1">
          <p>Last Updated: {new Date(lastUpdated).toLocaleDateString()}</p>
        </div>
      )}
    </div>
  );
}
