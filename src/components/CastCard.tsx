import Image from "next/image";
import type { CastMember } from "@/lib/tmdb";
import { getProfileUrl } from "@/lib/tmdb";

type Props = {
  member: CastMember;
};

export function CastCard({ member }: Props) {
  const profile = getProfileUrl(member.profile_path);

  return (
    <div className="w-28 shrink-0">
      <div className="relative aspect-square w-full overflow-hidden rounded-full bg-surface">
        {profile ? (
          <Image src={profile} alt={member.name} fill sizes="112px" className="object-cover" />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-2xl text-muted">
            {member.name.charAt(0)}
          </div>
        )}
      </div>
      <p className="mt-2 line-clamp-1 text-center text-sm font-medium text-foreground">
        {member.name}
      </p>
      <p className="line-clamp-1 text-center text-xs text-muted">{member.character}</p>
    </div>
  );
}
