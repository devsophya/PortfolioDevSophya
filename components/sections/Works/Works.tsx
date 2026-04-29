"use client";

import { useState, useRef, useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import Image from "next/image";
import styles from "./Works.module.css";

interface Experience {
  id: string;
  company: string;
  role: string;
  period: string;
  duration: string;
  location: string;
  type: string;
  logo: string;
  descriptionKey: string;
  companyDescriptionKey: string;
  impactsKey: string[];
  keywordsKey: string[];
}

export default function Works() {
  const t = useTranslations("works");
  const locale = useLocale();
  const timelineRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  useEffect(() => {
    // Scroll to the end (most recent experience) on mount
    if (timelineRef.current) {
      timelineRef.current.scrollLeft = timelineRef.current.scrollWidth;
    }
  }, []);

  const getLocalizaDuration = (startDate: Date) => {
    const now = new Date();
    const months =
      (now.getFullYear() - startDate.getFullYear()) * 12 +
      (now.getMonth() - startDate.getMonth());

    if (months < 1)
      return locale === "pt"
        ? "< 1 mês"
        : locale === "es"
          ? "< 1 mes"
          : locale === "fr"
            ? "< 1 mois"
            : locale === "it"
              ? "< 1 mese"
              : locale === "ja"
                ? "< 1ヶ月"
                : locale === "zh"
                  ? "< 1个月"
                  : "< 1 mo";
    if (months === 1)
      return locale === "pt"
        ? "1 mês"
        : locale === "es"
          ? "1 mes"
          : locale === "fr"
            ? "1 mois"
            : locale === "it"
              ? "1 mese"
              : locale === "ja"
                ? "1ヶ月"
                : locale === "zh"
                  ? "1个月"
                  : "1 mo";
    if (months < 12) {
      const suffix =
        locale === "pt"
          ? "meses"
          : locale === "es"
            ? "meses"
            : locale === "fr"
              ? "mois"
              : locale === "it"
                ? "mesi"
                : locale === "ja"
                  ? "ヶ月"
                  : locale === "zh"
                    ? "个月"
                    : "mos";
      return `${months} ${suffix}`;
    }
    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;
    const yearSuffix =
      locale === "pt"
        ? years === 1
          ? "ano"
          : "anos"
        : locale === "es"
          ? years === 1
            ? "año"
            : "años"
          : locale === "fr"
            ? years === 1
              ? "an"
              : "ans"
            : locale === "it"
              ? years === 1
                ? "anno"
                : "anni"
              : locale === "ja"
                ? "年"
                : locale === "zh"
                  ? "年"
                  : years === 1
                    ? "yr"
                    : "yrs";
    if (remainingMonths === 0) return `${years} ${yearSuffix}`;

    const monthSuffix =
      locale === "pt"
        ? remainingMonths === 1
          ? "mês"
          : "meses"
        : locale === "es"
          ? remainingMonths === 1
            ? "mes"
            : "meses"
          : locale === "fr"
            ? "mois"
            : locale === "it"
              ? remainingMonths === 1
                ? "mese"
                : "mesi"
              : locale === "ja"
                ? "ヶ月"
                : locale === "zh"
                  ? "个月"
                  : remainingMonths === 1
                    ? "mo"
                    : "mos";

    const andWord =
      locale === "pt"
        ? "e"
        : locale === "es"
          ? "y"
          : locale === "fr"
            ? "et"
            : locale === "it"
              ? "e"
              : "";

    if (locale === "ja" || locale === "zh") {
      return `${years}${yearSuffix}${remainingMonths}${monthSuffix}`;
    }

    return `${years} ${yearSuffix} ${andWord} ${remainingMonths} ${monthSuffix}`;
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!timelineRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - timelineRef.current.offsetLeft);
    setScrollLeft(timelineRef.current.scrollLeft);
    timelineRef.current.style.cursor = "grabbing";
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
    if (timelineRef.current) {
      timelineRef.current.style.cursor = "grab";
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    if (timelineRef.current) {
      timelineRef.current.style.cursor = "grab";
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !timelineRef.current) return;
    e.preventDefault();
    const x = e.pageX - timelineRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Multiply by 2 for faster scrolling
    timelineRef.current.scrollLeft = scrollLeft - walk;
  };

  const experiences: Experience[] = [
    {
      id: "novorumo",
      company: "Covre",
      role: t("novorumo.role"),
      period: t("novorumo.period"),
      duration: t("novorumo.duration"),
      location: "São Paulo, Brasil · Full-time",
      type: t("novorumo.type"),
      logo: "/images/works/ImageCovre.webp",
      descriptionKey: "novorumo.description",
      companyDescriptionKey: "novorumo.companyDescription",
      impactsKey: ["novorumo.impact1", "novorumo.impact2", "novorumo.impact3"],
      keywordsKey: [
        "novorumo.keyword1",
        "novorumo.keyword2",
        "novorumo.keyword3",
        "novorumo.keyword4",
        "novorumo.keyword5",
        "novorumo.keyword6",
        "novorumo.keyword7",
        "novorumo.keyword8",
      ],
    },
    {
      id: "zf",
      company: "Nuvox",
      role: t("zf.role"),
      period: t("zf.period"),
      duration: t("zf.duration"),
      location: "São Paulo, Brasil · Híbrida",
      type: t("zf.type"),
      logo: "/images/works/ImageNuvox.png",
      descriptionKey: "zf.description",
      companyDescriptionKey: "zf.companyDescription",
      impactsKey: ["zf.impact1", "zf.impact2"],
      keywordsKey: [
        "zf.keyword1",
        "zf.keyword2",
        "zf.keyword3",
        "zf.keyword4",
        "zf.keyword5",
        "zf.keyword6",
        "zf.keyword7",
        "zf.keyword8",
        "zf.keyword9",
        "zf.keyword10",
        "zf.keyword11",
        "zf.keyword12",
        "zf.keyword13",
        "zf.keyword14",
        "zf.keyword15",
        "zf.keyword16",
        "zf.keyword17",
        "zf.keyword18",
        "zf.keyword19",
        "zf.keyword20",
        "zf.keyword21",
        "zf.keyword22",
        "zf.keyword23",
        "zf.keyword24",
        "zf.keyword25",
        "zf.keyword26",
        "zf.keyword27",
      ],
    },
    {
      id: "g2",
      company: "G2",
      role: t("g2.role"),
      period: t("g2.period"),
      duration: getLocalizaDuration(new Date(2025, 1, 1)),
      location: "São Paulo, Brasil · Remota",
      type: t("g2.type"),
      logo: "/images/works/ImageG2.jpg",
      descriptionKey: "g2.description",
      companyDescriptionKey: "g2.companyDescription",
      impactsKey: ["g2.impact1", "g2.impact2"],
      keywordsKey: [
        "g2.keyword1",
        "g2.keyword2",
        "g2.keyword3",
        "g2.keyword4",
        "g2.keyword5",
        "g2.keyword6",
      ],
    },
  ];

  return (
    <section id="works" className={styles.works}>
      <div className={styles.container}>
        <div className={styles.experienceCounter}>
          <span className={styles.counterNumber}>+3</span>
          <span className={styles.counterLabel}>{t("yearsOfExperience")}</span>
        </div>

        <h2 className={styles.title}>{t("title")}</h2>
        <p className={styles.subtitle}>{t("subtitle")}</p>

        <div
          className={styles.timeline}
          ref={timelineRef}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
        >
          <div className={styles.timelineLine}></div>

          {experiences.map((exp) => (
            <div key={exp.id} className={styles.timelineItem}>
              <div className={styles.timelineDot}></div>
              <div className={styles.experienceCard}>
                <div className={styles.durationBadge}>{exp.duration}</div>
                <div className={styles.logoWrapper}>
                  <Image
                    src={exp.logo}
                    alt={exp.company}
                    width={80}
                    height={80}
                    className={styles.companyLogo}
                  />
                </div>
                <div className={styles.experienceInfo}>
                  <h3 className={styles.company}>{exp.company}</h3>
                  <p className={styles.role}>{exp.role}</p>
                </div>
                <p className={styles.period}>{exp.period}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
