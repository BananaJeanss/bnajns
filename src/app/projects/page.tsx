import PinnedProject from "@/components/pinProject";

export const dynamic = "force-dynamic";

const reqUrl = "https://api.github.com/users/bananajeanss/repos";

let cachedString: string | null = null;
let cacheTime: number | null = null;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export default async function Projects() {
  let res;
  let data;
  if (!cacheTime || Date.now() - cacheTime > CACHE_DURATION) {
    cachedString = null;
    cacheTime = Date.now();
    res = await fetch(reqUrl);
    data = await res.json();
    cachedString = JSON.stringify(data);
    console.log("Fetched new data from GitHub API");
  } else {
    data = JSON.parse(cachedString as string);
    console.log("Using cached data");
  }

  return (
    <div className="flex items-center flex-col p-8 mt-12 min-h-screen">
      <h1 className="text-3xl font-bold">My Projects</h1>
      <p className="text-white/70 mt-2">Pulled from GitHub, cached for 5 minutes.</p>
      <hr className="border-t border-white/30 w-3/4 my-4" />
      <div className="flex flex-wrap gap-2 justify-center mt-4 w-full">
        {data
          .filter((repo: { fork: boolean }) => !repo.fork) // excludes forks
          .filter((repo: { owner: { login: string } }) => repo.owner.login === "BananaJeanss") // excludes repos ion own
          .sort(
            (a: { updated_at: string }, b: { updated_at: string }) =>
              new Date(b.updated_at).getTime() -
              new Date(a.updated_at).getTime()
          ) // sort by recently updated
          .map((repo: { id: number; html_url: string; name: string; description: string; language: string; updated_at: string }) => (
            <PinnedProject
              key={repo.id}
              url={repo.html_url}
              name={repo.name}
              description={repo.description}
              languages={repo.language}
              lastUpdated={repo.updated_at}
            />
          ))}
      </div>
    </div>
  );
}
