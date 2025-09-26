import React from "react";

interface PinnedProjectProps {
  url: string;
  name: string;
  description: string;
  languages?: string[];
}

const languagesColors: Record<string, string> = {
    JavaScript: "bg-yellow-500",
    TypeScript: "bg-blue-500",
    Python: "bg-[#3572A5]",
    Go: "bg-[#00ADD8]",
    CPP: "bg-[#f34b7d]",
};

export default function PinnedProject({
  url,
  name,
  description,
  languages,
}: PinnedProjectProps) {
  return (
    <div className="w-1/4 border border-white/30 rounded-lg p-4 mb-4 hover:bg-white/5 transition">
      <h3 className="text-lg font-bold">
        <div className="flex items-center gap-2">
          {languages?.map((lang) => (
            <span
              key={lang}
              title={lang}
              className={`inline-block w-3 h-3 rounded-full ${
                languagesColors[lang] ?? "bg-gray-500"
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
      {languages && languages.length > 0 && (
        <div className="text-sm text-white/50">
          {languages.map((lang) => (
            <p key={lang}>Languages: {lang}</p>
          ))}
        </div>
      )}
    </div>
  );
}
