import mock_image_1 from "../../../public/mock_imges/mock-image-1.png";
import mock_image_2 from "../../../public/mock_imges/mock-image-2.png";
import mock_image_3 from "../../../public/mock_imges/mock-image-3.png";
import mock_image_4 from "../../../public/mock_imges/mock-image-4.png";
import mock_image_5 from "../../../public/mock_imges/mock-image-5.png";
import mock_image_6 from "../../../public/mock_imges/mock-image-6.png";
import mock_image_7 from "../../../public/mock_imges/mock-image-7.png";
import mock_image_8 from "../../../public/mock_imges/mock-image-8.png";
import mock_image_9 from "../../../public/mock_imges/mock-image-9.png";
import mock_image_10 from "../../../public/mock_imges/mock-image-10.png";
import mock_image_11 from "../../../public/mock_imges/mock-image-11.png";

export const MOCK_DATA = [
  {
    imageUrl: mock_image_1,
    category: "영화",
    title: "인터스텔라",
    placeAndDate: "메가박스 코엑스 | 2025.05.10",
    description:
      "시간과 공간을 넘는 감동적인 여정시간과 공간을 넘는 감동적인 여정시간과 공간을 넘는 감동적인 여정",
    ddayBadge: "D-1",
    statusBadge: "모집중",
    progressRate: "90%",
    estimatedPrice: "14,000원",
  },

  {
    imageUrl: mock_image_2,
    category: "영화",
    title: "극한직업",
    placeAndDate: "을지영화관 | 2025.05.15",
    description:
      "치킨집 위장수사 코미디치킨집 위장수사 코미디치킨집 위장수사 코미디치킨집 위장수사 코미디치킨집 위장수사 코미디치킨집 위장수사 코미디치킨집 위장수사 코미디",
    ddayBadge: "D-6",
    statusBadge: "모집중",
    progressRate: "60%",
    estimatedPrice: "12,000원",
  },

  {
    imageUrl: mock_image_3,
    category: "예능",
    title: "환승연애2",
    placeAndDate: "좋은영화관 필름포럼 | 2025.05.20",
    description:
      "다양한 이유로 이별한 커플들이 한 집에 모여 지나간 연애를 되짚고 새로운 인연을 마주하며 자신만의 사랑을 찾아가는 연애 프로그램 환승연애 같이 볼 분 찾아요",
    ddayBadge: "D-5",
    statusBadge: "모집중",
    progressRate: "30%",
    estimatedPrice: "10,000원",
  },

  {
    imageUrl: mock_image_4,
    category: "드라마",
    title: "오징어게임3",
    placeAndDate: "좋은영화관 필름포럼 | 2025.05.30",
    description:
      "빚에 쫓기는 수백 명의 사람들이 서바이벌 게임에 뛰어든다. 거액의 상금으로 새로운 삶을 시작하기 위해. 하지만 모두 승자가 될 순 없는 법. 탈락하는 이들은 치명적인 결과를 각오해야 하는데 같이 볼 분 찾아요",
    ddayBadge: "D-15",
    statusBadge: "모집중",
    progressRate: "70%",
    estimatedPrice: "12,000원",
  },

  {
    imageUrl: mock_image_5,
    category: "콘서트",
    title: "아이유 콘서트 : 더 위닝",
    placeAndDate: "CGV 골드 클래스 | 2025.05.22",
    description:
      "안녕하세요 저는 아이유 없으면 못살아요. 근데 이런 저와 같은 감정을 느낀 사람과 함께 같이 콘서트 꼭 보고 싶어요 제발 저와 함께 아이유를 덕질해요 같이 볼분",
    ddayBadge: "D-7",
    statusBadge: "모집중",
    progressRate: "50%",
    estimatedPrice: "16,000원",
  },

  {
    imageUrl: mock_image_6,
    category: "스포츠",
    title: "KBO 리그 (KT 위즈 vs LG 트윈스)",
    placeAndDate: "CGV강변  | 2025.05.18",
    description:
      "KT위즈팬, LG트윈스팬 다같이 모여서 야구 즐겨봐요. 진 팀이 치맥쏘기 어때요",
    ddayBadge: "D-3",
    statusBadge: "모집중",
    progressRate: "90%",
    estimatedPrice: "15,000원",
  },

  {
    imageUrl: mock_image_7,
    category: "스포츠",
    title: "KBO 리그 (SSG 랜더스 vs 한화 이글스)",
    placeAndDate: "CGV용산  | 2025.05.18",
    description:
      "SSG 랜더스, 한화 이글스 다같이 모여서 야구 즐겨봐요. 진 팀이 치맥쏘기 어때요",
    ddayBadge: "D-3",
    statusBadge: "모집중",
    progressRate: "80%",
    estimatedPrice: "16,000원",
  },

  {
    imageUrl: mock_image_8,
    category: "스포츠",
    title: "국가대표 친선경기 (한국VS미국)",
    placeAndDate: "용산 칠인더시네마 | 2025.06.03",
    description:
      "세계 최강 미국과의 한판 승부⚽,국가대표 선수들의 뜨거운 땀과 열정이 가득한 경기 다 같이 응원하며 짜릿한 순간을 함께할 분 찾아요!",
    ddayBadge: "D-17",
    statusBadge: "모집중",
    progressRate: "30%",
    estimatedPrice: "20,000원",
  },

  {
    imageUrl: mock_image_9,
    category: "콘서트",
    title: "세븐틴 콘서트 : Be The Sun",
    placeAndDate: "CGV 청담씨네시티 | 2025.06.01",
    description:
      "캐럿이라면 이 무대 놓칠 수 없죠✨함께 떼창하고 울고 웃으며 최고의 추억 만들 분 구해요!",
    ddayBadge: "D-15",
    statusBadge: "모집중",
    progressRate: "60%",
    estimatedPrice: "17,000원",
  },

  {
    imageUrl: mock_image_10,
    category: "드라마",
    title: "더 글로리",
    placeAndDate: "시글로 건대점 | 2025.05.26",
    description:
      "복수를 위해 인생을 건 문동은의 이야기…마지막 퍼즐이 맞춰지는 순간까지 같이 집중해서 보고,끝나고 감상도 나눌 사람 있나요?",
    ddayBadge: "D-11",
    statusBadge: "모집중",
    progressRate: "40%",
    estimatedPrice: "12,000원",
  },

  {
    imageUrl: mock_image_11,
    category: "예능",
    title: "솔로지옥4 마지막회",
    placeAndDate: "좋은영화관 필름포럼 | 2025.05.27",
    description:
      "🔥지옥의 섬에서 벌어지는 뜨거운 썸과 심쿵의 연속🔥같이 보면서 누가 커플 될지 실시간으로 추리할 사람?",
    ddayBadge: "D-12",
    statusBadge: "모집중",
    progressRate: "35%",
    estimatedPrice: "11,000원",
  },
];
