import {
  BallIcon,
  CamcorderIcon,
  DesertIcon,
  DizzinessIcon,
  DocumentIcon,
  FireIcon,
  GrinIcon,
  PartyIcon,
  PopcornIcon,
  SadIcon,
  SmileIcon,
  SpeakingIcon,
  SpeechBubbleIcon,
  TargetIcon,
  TelevisionIcon,
  YawnIcon,
} from "@/icons/index";

export const MOOD: Record<string, { icon: React.ReactNode; text: string }> = {
  STRESSED: {
    icon: <DizzinessIcon />,
    text: "하루하루가 전쟁이에요",
  },
  LAZY: {
    icon: <YawnIcon />,
    text: "똑같은 하루의 반복, 좀 지루해요",
  },
  SMILE: {
    icon: <SadIcon />,
    text: "누군가랑 웃고 수다 떨고 싶어요",
  },
  HAPPY: {
    icon: <PartyIcon />,
    text: "매일이 새롭고 행복해요",
  },
  RELAXED: {
    icon: <GrinIcon />,
    text: "한가하고, 마음도 꽤 여유로워요",
  },
};

export const CRITERION: Record<
  string,
  { icon: React.ReactNode; text: string }
> = {
  STORY: {
    icon: <DocumentIcon />,
    text: "스토리에 푹 빠져서 정주행하기 좋아해요",
  },
  VISUAL: {
    icon: <DesertIcon />,
    text: "영상미나 분위기가 예쁘면 끝까지 보게 돼요",
  },
  REVIEW: {
    icon: <SpeechBubbleIcon />,
    text: "후기도 꼼꼼히 보고, 평점이 높은 위주로 봐요",
  },
  DISCUSS: {
    icon: <SpeakingIcon />,
    text: "함께 보고 각자 감상을 나누는걸 좋아해요",
  },
  HOT_TREND: {
    icon: <FireIcon />,
    text: "요즘 핫한 작품은 놓칠 수 없어요친구들이 추천한 작품들은 무조건 챙겨봐요",
  },
  FIRED_TAG: {
    icon: <TargetIcon />,
    text: "친구들이 추천한 작품들은 무조건 챙겨봐요",
  },
};

export const CONTENT: Record<string, { icon: React.ReactNode; text: string }> =
  {
    MOVIE: {
      icon: <PopcornIcon />,
      text: "영화",
    },
    DRAMA: {
      icon: <TelevisionIcon />,
      text: "드라마",
    },
    SPORTS: {
      icon: <BallIcon />,
      text: "스포츠",
    },
    VARIETY: {
      icon: <SmileIcon />,
      text: "예능",
    },
    CONCERT: {
      icon: <CamcorderIcon />,
      text: "콘서트/VCR",
    },
  };
