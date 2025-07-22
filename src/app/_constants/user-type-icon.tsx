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

export const USER_TYPE_ICONS: Record<
  string,
  { label: React.ReactNode; description: React.ReactNode }
> = {
  MOVIE_DETAIL_COLLECTOR: {
    label: <MovieIcon />,
    description: <GlassesIcon />,
  },
  MOVIE_SHARED_EMOTER: {
    label: <Popcorn />,
    description: <GlassesIcon />,
  },
  DRAMA_STORY_IMMERSER: {
    label: <WaterIcon />,
    description: <GlassesIcon />,
  },
  DRAMA_SOCIAL_FAN: {
    label: <GlassesIcon />,
    description: <GlassesIcon />,
  },
  VARIETY_DETAIL_ANALYST: {
    label: <TalkingIcon />,
    description: <GlassesIcon />,
  },
  VARIETY_REACTION_SHARER: {
    label: <PaperIcon />,
    description: <GlassesIcon />,
  },
  SPORTS_FULL_SUPPORTER: {
    label: <TalkIcon />,
    description: <GlassesIcon />,
  },
  SPORTS_MOMENT_LOVER: {
    label: <YellowWarnIcon />,
    description: <GlassesIcon />,
  },
  CONCERT_STAGE_DIVER: {
    label: <HeartIcon />,
    description: <GlassesIcon />,
  },
  CONCERT_FANCAM_LOVER: {
    label: <Heart2Icon />,
    description: <GlassesIcon />,
  },
};
