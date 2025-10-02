"use client";
import statusesData from "@/app/statuses/statuses.json";

type Status = { title: string; description: string; url: string };
type Statuses = { [key: string]: Status };

const statuses: Statuses = statusesData;

export default function AdminStatuses() {
  async function addStatus() {
    const titleInput = document.querySelector(
      'input[placeholder="Title"]'
    ) as HTMLInputElement | null;
    const descriptionInput = document.querySelector(
      'input[placeholder="Description"]'
    ) as HTMLInputElement | null;
    const urlInput = document.querySelector(
      'input[placeholder="URL"]'
    ) as HTMLInputElement | null;
    const title = titleInput ? titleInput.value : "";
    const description = descriptionInput ? descriptionInput.value : "";
    const url = urlInput ? urlInput.value : "";

    // Add the new status to the JSON file
    statuses[title] = { title, description, url };
  }

  async function removeStatus(title: string) {
    delete statuses[title];
  }

  return (
    <div className="p-8 mt-12 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Service Statuses</h1>
      <hr className="border-white/20 mb-8" />
      <div>
        <ul className="flex flex-row w-full gap-4 justify-center items-start">
          <input
            type="text"
            placeholder="Title"
            className="border p-2 rounded w-full text-white"
          />
          <input
            type="text"
            placeholder="Description"
            className="border p-2 rounded w-full text-white"
          />
          <input
            type="text"
            placeholder="URL"
            className="border p-2 rounded w-full text-white"
          />
          <button
            onClick={addStatus}
            className="bg-blue-600 text-white text-sm px-8 rounded transition cursor-pointer hover:bg-blue-900"
          >
            Add Status
          </button>
        </ul>
      </div>
      <div className="flex flex-col gap-4 mt-8">
        {Object.values(statuses).map((status) => (
          <div
            key={status.title}
            className="border border-white/30 rounded-lg p-4 flex flex-col gap-2"
          >
            <h2 className="text-lg font-bold">{status.title}</h2>
            <p className="text-sm">{status.description}</p>
            <button
              onClick={() => removeStatus(status.title)}
              className="bg-red-600 text-white text-sm px-4 py-2 w-1/4 rounded transition cursor-pointer hover:bg-red-900"
            >
              Remove Status
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
