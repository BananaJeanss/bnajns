import Image from "next/image";
import { Github, Mail } from "lucide-react";
import PinnedProject from "@/components/pinProject";
import DiscordSvg from "@/components/discordSvg";

export default function Home() {
  return (
    <div>
      <div
        className="flex flex-col items-center justify-center p-24 gap-3 relative"
        style={{
          height: "75vh",
          backgroundImage:
            "linear-gradient(to bottom, rgba(0,0,0,0.1) 50%, #171717 100%), url('/banner.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="absolute inset-0 bg-black/50 z-0" />
        <div className="relative z-10 flex flex-col items-center">
          <h1 className="text-4xl font-bold text-white">BananaJeans</h1>
          <p className="text-white">I do a lot of things</p>
          <hr className="my-4 w-150 border-white" />
          <ul>
            <li>
              <a
                href="https://github.com/BananaJeanss"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white"
              >
                <Github className="inline-block mr-2" />
                GitHub
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="p-8">
        <h2 className="text-2xl font-bold mb-4">About Me</h2>
        <p className="mb-4">
          I'm BananaJeans, a developer, sim-racer, and all-around tech
          enthusiast from Estonia.
        </p>
        <hr className="border-t border-white/30 mb-4 w-1/4" />
        <img
          src="https://readmefm.bnajns.hackclub.app/songdisplay?username=bananajeans&theme=dark&roundit=true"
          alt="readmefm last.fm last played"
          style={{ maxWidth: "40%", height: "auto", marginBottom: "1rem" }}
        />
        <p className="text-white/70 text-sm">
          from{" "}
          <a
            href="https://readmefm.bnajns.hackclub.app"
            className="text-red-400 transition hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            readme.fm
          </a>
        </p>
      </div>
      <hr className="border-t border-white/30" />
      <div className="p-8">
        <h2 className="text-2xl font-bold mb-4">Interests</h2>
        <ul className="list-disc list-inside">
          <li>All around development</li>
          <li>Sim racing</li>
          <li>Gaming</li>
          <li>Undertale/Deltarune</li>
        </ul>
      </div>
      <hr className="border-t border-white/30" />
      <div className="p-8">
        <h2 className="text-2xl font-bold">Pinned Projects</h2>
        <p className="mb-4">Some of my best projects, so far.</p>
        <div className="flex flex-wrap gap-4">
          <PinnedProject
            url="https://github.com/BananaJeanss/iRacingRPC"
            name="iRacingRPC"
            description="Discord Rich Presence for iRacing using Python"
            languages={["Python"]}
          />
          <PinnedProject
            url="https://github.com/BananaJeanss/slack.fm"
            name="slack.fm"
            description="last.fm bot for slack"
            languages={["JavaScript"]}
          />
          <PinnedProject
            url="https://github.com/BananaJeanss/ralseibot"
            name="ralseibot"
            description="A Discord bot for all your Ralsei-related needs, built with TypeScript and Discord.js."
            languages={["TypeScript"]}
          />
          <PinnedProject
            url="https://github.com/BananaJeanss/tchat"
            name="tchat"
            description="an terminal based chat app written in go"
            languages={["Go"]}
          />
          <PinnedProject
            url="https://github.com/BananaJeanss/roblox-outfit-finder"
            name="roblox-outfit-finder"
            description="A simple web app to find and display a Roblox user's saved outfits by their username."
            languages={["JavaScript"]}
          />
          <PinnedProject
            url="https://github.com/BananaJeanss/faucet"
            name="faucet"
            description="A simple and lightweight HTTP server, written in C++."
            languages={["CPP"]}
          />
        </div>
      </div>
      <hr className="border-t border-white/30" />
      <div className="p-8">
        <h2 className="text-2xl font-bold mb-4">Contact</h2>
        <p>
          <Mail className="inline-block mr-2 mb-2" />
          <a
            href="mailto:bananajeansc@gmail.com"
            className="transition hover:text-blue-400"
          >
            bananajeansc@gmail.com
          </a>
        </p>
        <p className="flex items-center gap-2 mb-2">
          <DiscordSvg className="w-6 h-6" />
          <a
            href="https://discord.com/users/269514812881502209"
            target="_blank"
            rel="noopener noreferrer"
            className="transition hover:text-blue-400"
          >
            BananaJeans
          </a>
        </p>
        <p>
          <Github className="inline-block mr-2 mb-2" />
          <a
            href="https://github.com/BananaJeanss"
            target="_blank"
            rel="noopener noreferrer"
            className="transition hover:text-blue-400"
          >
            BananaJeanss
          </a>
        </p>
      </div>
      <hr className="border-t border-white/30" />
      <div className="p-8 text-center text-sm text-white/50">
        {new Date().getFullYear()} BananaJeans. All {Math.random() < 0.5 ? "rights" : "lefts"} reserved.
      </div>
    </div>
  );
}
