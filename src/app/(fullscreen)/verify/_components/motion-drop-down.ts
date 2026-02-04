import { Variants } from "framer-motion";

/**
 * 드롭다운 메뉴의 등장/퇴장 애니메이션 변수
 */
export const dropdownVariants: Variants = {
  hidden: {
    opacity: 0,
    scaleY: 0,
    transformOrigin: "top",
  },
  visible: {
    opacity: 1,
    scaleY: 1,
    transformOrigin: "top",
    transition: {
      duration: 0.2,
      ease: "easeOut",
    },
  },
  exit: {
    opacity: 0,
    scaleY: 0,
    transformOrigin: "top",
    transition: {
      duration: 0.15,
      ease: "easeIn",
    },
  },
};

/**
 * 드롭다운 화살표 아이콘의 회전 애니메이션 변수
 */
export const arrowVariants: Variants = {
  closed: { rotate: 0 },
  open: { rotate: 180 },
};

/**
 * 드롭다운 목록 항목의 등장 애니메이션 변수
 * (custom prop을 받아 지연 효과를 적용)
 */
export const optionVariants: Variants = {
  hidden: { opacity: 0, y: -10 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.05,
      duration: 0.15,
    },
  }),
};
