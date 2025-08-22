"use client";

import { AlertIcon, CheckIcon, CloseIcon } from "@/icons/index";
import Button from "./button";
import type { ReactNode } from "react";
import { motion } from "framer-motion";

interface ModalProps {
  iconType?: "alert" | "confirm" | "";
  title: string;
  description?: ReactNode;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  showCloseButton?: boolean;
  hideButtons?: boolean;
  children: ReactNode;
  onClose?: () => void;
  confirmButtonClassName?: string;
  isVerticalLayout?: boolean;
}

export default function Modal({
  iconType,
  title,
  children,
  description,
  confirmText,
  cancelText = "아니요",
  onConfirm,
  onCancel,
  onClose,
  showCloseButton = false,
  hideButtons = false,
  confirmButtonClassName,
  isVerticalLayout = false,
}: ModalProps) {
  const buttons = [
    onCancel && (
      <Button
        key="cancel"
        variant="secondary"
        onClick={onCancel}
        className="focus:bg-gray-850 bg-gray-800 text-gray-200"
      >
        {cancelText}
      </Button>
    ),
    onConfirm && (
      <Button
        key="confirm"
        onClick={onConfirm}
        className={confirmButtonClassName}
      >
        {confirmText}
      </Button>
    ),
  ].filter(Boolean);

  const orderedButtons = isVerticalLayout ? buttons.reverse() : buttons;

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <motion.div
        className="drap-shadow relative flex w-80 flex-col items-center rounded-2xl bg-gray-900 px-5 pt-6 pb-5"
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{
          duration: 0.3,
          ease: [0.4, 0.0, 0.2, 1],
        }}
      >
        {showCloseButton && (
          <button
            onClick={onClose}
            className="absolute top-2 right-2 z-10 text-gray-100"
          >
            <CloseIcon />
          </button>
        )}

        {iconType === "confirm" && <CheckIcon />}
        {iconType === "alert" && <AlertIcon />}

        <h3 className="title-3-semibold mt-4.75 text-center whitespace-pre-line">
          {title}
        </h3>
        <div className="body-3-regular mt-1 mb-4.5 text-center whitespace-pre-line text-gray-500">
          {description ?? children}
        </div>
        {!hideButtons && (
          <div
            className={`flex w-full gap-2.5 ${isVerticalLayout ? "flex-col" : "flex-row"}`}
          >
            {orderedButtons}
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}
