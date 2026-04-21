"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import {
  FaTimes,
  FaPhone,
  FaEnvelope,
  FaLinkedin,
  FaGithub,
} from "react-icons/fa";
import styles from "./ContactModal.module.css";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  originPosition?: { x: number; y: number };
}

export default function ContactModal({
  isOpen,
  onClose,
  originPosition,
}: ContactModalProps) {
  const t = useTranslations("contact");
  const modalRef = useRef<HTMLDivElement>(null);
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = () => {
    setIsClosing(true);
    // Aguardar animação completar antes de fechar
    setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, 500); // Mesma duração da animação
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  if (!isOpen && !isClosing) return null;

  const style = originPosition
    ? {
        "--origin-x": `${originPosition.x}px`,
        "--origin-y": `${originPosition.y}px`,
      }
    : {};

  return (
    <div
      className={`${styles.overlay} ${isClosing ? styles.overlayClosing : ""}`}
      onClick={handleClose}
    >
      <div
        ref={modalRef}
        className={`${styles.modal} ${isClosing ? styles.modalClosing : ""}`}
        onClick={(e) => e.stopPropagation()}
        style={style as React.CSSProperties}
      >
        <button
          className={styles.closeButton}
          onClick={handleClose}
          aria-label="Close"
        >
          <FaTimes />
        </button>

        <div className={styles.content}>
          <div className={styles.avatarWrapper}>
            <Image
              src="/images/contacts/cartoon_sophya.svg"
              alt="Sophya Damiazo"
              width={120}
              height={120}
              className={styles.avatar}
            />
          </div>

          <h2 className={styles.name}>Sophya Damiazo</h2>
          <p className={styles.role}>{t("role")}</p>

          <div className={styles.contactInfo}>
            <a href="tel:+5519994644647" className={styles.contactItem}>
              <div className={styles.iconWrapper}>
                <FaPhone />
              </div>
              <div className={styles.contactText}>
                <span className={styles.label}>{t("phone")}</span>
                <span className={styles.value}>+55 (19)99816-4113</span>
              </div>
            </a>

            <a
              href="mailto:gustavieiradev@gmail.com"
              className={styles.contactItem}
            >
              <div className={styles.iconWrapper}>
                <FaEnvelope />
              </div>
              <div className={styles.contactText}>
                <span className={styles.label}>{t("email")}</span>
                <span className={styles.value}>sophyadamiazodev@gmail.com</span>
              </div>
            </a>

            <a
              href="https://www.linkedin.com/in/sophya-damiazo-695991268/"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.contactItem}
            >
              <div className={styles.iconWrapper}>
                <FaLinkedin />
              </div>
              <div className={styles.contactText}>
                <span className={styles.label}>LinkedIn</span>
                <span className={styles.value}>sophya-damiazo-695991268</span>
              </div>
            </a>

            <a
              href="https://github.com/devsophya"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.contactItem}
            >
              <div className={styles.iconWrapper}>
                <FaGithub />
              </div>
              <div className={styles.contactText}>
                <span className={styles.label}>GitHub</span>
                <span className={styles.value}>devsophya</span>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
