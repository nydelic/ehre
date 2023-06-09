import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { validateCookieToken } from "@/app/(auth)/validateCookieToken";
import { completeProfile } from "@/app/@app/(with-profile)/(profile)/actions";
import getMainProfileData from "@/app/@app/complete-profile/getMainProfileData";
import getProfileIsIncomplete from "@/app/@app/complete-profile/getProfileIsIncomplete";
import { notFound, redirect } from "next/navigation";

export const metadata = {
  title: "Complete your profile",
};

export default async function CompleteProfile() {
  const isLoggedIn = validateCookieToken();

  if (isLoggedIn === false) {
    return notFound();
  }
  const profileIsIncomplete = await getProfileIsIncomplete();
  if (!profileIsIncomplete) {
    return redirect("/");
  }

  const mainProfileData = await getMainProfileData();

  async function completeProfileAction(formData: FormData) {
    "use server";
    const name = formData.get("name") as string;
    const nick = formData.get("nick") as string;

    await completeProfile({ name, nick });

    redirect("/");
  }

  return (
    <main className="p-4 h-full max-w-md mx-auto grid items-center">
      <div>
        <div className="text-center mt-12">
          <h1 className="text-2xl font-bold">Complete your profile</h1>
          <p className="text-sm text-muted-foreground mb-4">
            You need to complete your profile to use the app.
          </p>
          <form className="grid gap-2" action={completeProfileAction}>
            <Input
              name="name"
              placeholder="Name"
              defaultValue={mainProfileData?.name}
            />
            <Input
              name="nick"
              placeholder="Nickname"
              defaultValue={mainProfileData?.nick}
            />
            <Button>Save</Button>
          </form>
        </div>
      </div>
    </main>
  );
}
