import {
  MovieIcon,
  GlassesIcon,
  AngryIcon,
  HeartIcon,
  Heart2Icon,
  PaperIcon,
  Popcorn,
  TalkIcon,
  TalkingIcon,
  WaterIcon,
  YellowWarnIcon,
} from "@/icons/index";

export enum UserTypeCode {
  MOVIE_DETAIL_COLLECTOR = "MOVIE_DETAIL_COLLECTOR",
  MOVIE_SHARED_EMOTER = "MOVIE_SHARED_EMOTER",
  DRAMA_STORY_IMMERSER = "DRAMA_STORY_IMMERSER",
  DRAMA_SOCIAL_FAN = "DRAMA_SOCIAL_FAN",
  VARIETY_DETAIL_ANALYST = "VARIETY_DETAIL_ANALYST",
  VARIETY_REACTION_SHARER = "VARIETY_REACTION_SHARER",
  SPORTS_FULL_SUPPORTER = "SPORTS_FULL_SUPPORTER",
  SPORTS_MOMENT_LOVER = "SPORTS_MOMENT_LOVER",
  CONCERT_STAGE_DIVER = "CONCERT_STAGE_DIVER",
  CONCERT_FANCAM_LOVER = "CONCERT_FANCAM_LOVER",
}

export const USER_TYPE_ICONS: Record<
  UserTypeCode,
  { label: React.ReactNode; description: React.ReactNode }
> = {
  [UserTypeCode.MOVIE_DETAIL_COLLECTOR]: {
    label: <MovieIcon />,
    description: <GlassesIcon />,
  },
  [UserTypeCode.MOVIE_SHARED_EMOTER]: {
    label: <Popcorn />,
    description: <GlassesIcon />,
  },
  [UserTypeCode.DRAMA_STORY_IMMERSER]: {
    label: <WaterIcon />,
    description: <GlassesIcon />,
  },
  [UserTypeCode.DRAMA_SOCIAL_FAN]: {
    label: <GlassesIcon />,
    description: <GlassesIcon />,
  },
  [UserTypeCode.VARIETY_DETAIL_ANALYST]: {
    label: <TalkingIcon />,
    description: <GlassesIcon />,
  },
  [UserTypeCode.VARIETY_REACTION_SHARER]: {
    label: <PaperIcon />,
    description: <GlassesIcon />,
  },
  [UserTypeCode.SPORTS_FULL_SUPPORTER]: {
    label: <TalkIcon />,
    description: <GlassesIcon />,
  },
  [UserTypeCode.SPORTS_MOMENT_LOVER]: {
    label: <YellowWarnIcon />,
    description: <GlassesIcon />,
  },
  [UserTypeCode.CONCERT_STAGE_DIVER]: {
    label: <HeartIcon />,
    description: <GlassesIcon />,
  },
  [UserTypeCode.CONCERT_FANCAM_LOVER]: {
    label: <Heart2Icon />,
    description: <GlassesIcon />,
  },
};
