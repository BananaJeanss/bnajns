import { auth, signOut } from "@/auth";

export default async function AdminPage() {
  const session = await auth();

  return (
    <div className="p-8 mt-12 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Admin</h1>
      <p className="mb-4">Hello {session?.user?.name}</p>
      <form
        action={async () => {
          "use server";
          await signOut({ redirectTo: "/" });
        }}
      >
        <button className="bg-red-600 px-4 py-2 rounded cursor-pointer">Sign Out</button>
      </form>
    </div>
  );
}