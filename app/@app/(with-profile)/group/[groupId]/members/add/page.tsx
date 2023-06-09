import getAllFriendsForUser from "@/app/@app/(with-profile)/friends/getAllFriendsForUser";
import AddMembersSheet from "./AddMembersSheet";

async function AddMembers({
  params,
}: {
  params: {
    groupId: string;
  };
}) {
  const userFriends = await getAllFriendsForUser();
  return (
    <AddMembersSheet
      userFriends={userFriends}
      groupId={parseInt(params.groupId)}
    />
  );
}

export default AddMembers;
