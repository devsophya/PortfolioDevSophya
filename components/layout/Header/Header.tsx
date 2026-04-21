"use client";

import { useTranslations, useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import styles from "./Header.module.css";

const languages = [
  { code: "en", label: "English", image: "/images/header/eua.png" },
  { code: "pt", label: "Português", image: "/images/header/brasil.png" },
  { code: "fr", label: "Français", image: "/images/header/franca.png" },
  { code: "it", label: "Italiano", image: "/images/header/italia.png" },
  { code: "es", label: "Español", image: "/images/header/espanha.png" },
  { code: "zh", label: "中文", image: "/images/header/china.png" },
  { code: "ja", label: "日本語", image: "/images/header/japao.png" },
];

export default function Header() {
  const t = useTranslations("header");
  const locale = useLocale();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentLanguage = languages.find((lang) => lang.code === locale);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLanguageChange = (newLocale: string) => {
    router.replace(`/${newLocale}`);
    setIsOpen(false);
  };

  return (
    <header className={styles.header}>
      <div className={styles.navContainer}>
        <Link href="/" className={styles.logo}>
          <Image
            src="/images/header/cartoon_sophya.svg"
            alt="Sophya"
            width={128}
            height={128}
            style={{ objectFit: "cover", transform: "scale(1.35)", objectPosition: "center 50%" }}
          />
        </Link>

        <h1 className={styles.title}>SOPHYA DAMIAZO</h1>

        <div className={styles.languageSwitcher} ref={dropdownRef}>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={styles.languageButton}
          >
            <div className={styles.flagImage}>
              <Image
                src={currentLanguage?.image || ""}
                alt={currentLanguage?.label || ""}
                width={24}
                height={24}
                className={styles.flagImage}
              />
            </div>
            <svg
              className={`${styles.dropdownIcon} ${isOpen ? styles.open : ""}`}
              viewBox="0 0 24 24"
            >
              <path d="M19 9l-7 7-7-7"></path>
            </svg>
          </button>

          {isOpen && (
            <div className={styles.dropdown}>
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => handleLanguageChange(lang.code)}
                  className={`${styles.dropdownItem} ${
                    locale === lang.code ? styles.active : ""
                  }`}
                >
                  <div className={styles.flagImage}>
                    <Image
                      src={lang.image}
                      alt={lang.label}
                      width={24}
                      height={24}
                      className={styles.flagImage}
                    />
                  </div>
                  <span
                    className={`${styles.dropdownLabel} ${
                      locale === lang.code ? styles.active : ""
                    }`}
                  >
                    {lang.label}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
