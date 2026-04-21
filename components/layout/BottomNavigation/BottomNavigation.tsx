"use client";

import { useState, useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import ContactModal from "@/components/sections/ContactModal/ContactModal";
import styles from "./BottomNavigation.module.css";

interface NavItem {
  id: string;
  labelKey: string;
  icon: string;
}

export default function BottomNavigation() {
  const [active, setActive] = useState("home");
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [contactIconPosition, setContactIconPosition] = useState<{
    x: number;
    y: number;
  }>();
  const [previousActive, setPreviousActive] = useState("home");
  const t = useTranslations("bottomNav");
  const isNavigatingRef = useRef(false);

  useEffect(() => {
    const sections = ["home", "aboutme", "works", "projects", "contact"];

    const observer = new IntersectionObserver(
      (entries) => {
        // Só atualiza se não estiver navegando manualmente e se a modal não estiver aberta
        if (!isNavigatingRef.current && !isContactModalOpen) {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActive(entry.target.id);
              setPreviousActive(entry.target.id);
            }
          });
        }
      },
      {
        threshold: 0.5,
        rootMargin: "-100px 0px -100px 0px",
      }
    );

    // Observar as seções
    sections.forEach((sectionId) => {
      const element = document.getElementById(sectionId);
      if (element) {
        observer.observe(element);
      }
    });

    // Observer especial para detectar quando está no topo (home)
    const handleScroll = () => {
      if (
        window.scrollY < 100 &&
        !isNavigatingRef.current &&
        !isContactModalOpen
      ) {
        setActive("home");
        setPreviousActive("home");
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      sections.forEach((sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
          observer.unobserve(element);
        }
      });
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isContactModalOpen]);

  const handleNavigate = (
    id: string,
    event?: React.MouseEvent<HTMLButtonElement>
  ) => {
    if (id === "contact") {
      // Salvar qual seção estava ativa antes de abrir a modal
      setPreviousActive(active);
      // Capturar posição do ícone para animação
      if (event) {
        const button = event.currentTarget;
        const rect = button.getBoundingClientRect();
        setContactIconPosition({
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2,
        });
      }
      setIsContactModalOpen(true);
      setActive("contact");
      return;
    }

    isNavigatingRef.current = true;
    setActive(id);
    setPreviousActive(id);

    if (id === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      const element = document.getElementById(id);
      if (element) {
        const offset = 0;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    }

    // Resetar flag após a animação completar
    setTimeout(() => {
      isNavigatingRef.current = false;
    }, 1000);
  };

  const navItems: NavItem[] = [
    {
      id: "home",
      labelKey: "home",
      icon: "/images/bottomNavigation/IconHome.svg",
    },
    {
      id: "aboutme",
      labelKey: "aboutme",
      icon: "/images/bottomNavigation/IconAboutMe.svg",
    },
    {
      id: "works",
      labelKey: "works",
      icon: "/images/bottomNavigation/IconWorks.svg",
    },
    {
      id: "projects",
      labelKey: "projects",
      icon: "/images/bottomNavigation/IconProjects.svg",
    },
    {
      id: "contact",
      labelKey: "contact",
      icon: "/images/bottomNavigation/IconContact.svg",
    },
  ];

  const handleCloseContactModal = () => {
    setIsContactModalOpen(false);
    // Restaurar a seção que estava ativa antes de abrir a modal
    setActive(previousActive);
  };

  return (
    <>
      <ContactModal
        isOpen={isContactModalOpen}
        onClose={handleCloseContactModal}
        originPosition={contactIconPosition}
      />

      <nav className={styles.bottomNav}>
        <div className={styles.navContainer}>
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={(e) => handleNavigate(item.id, e)}
              className={`${styles.navItem} ${
                active === item.id ? styles.active : ""
              } ${item.id === "home" ? styles.homeItem : ""}`}
            >
              <div className={styles.iconWrapper}>
                <Image
                  src={item.icon}
                  alt={t(item.labelKey)}
                  width={24}
                  height={24}
                />
              </div>
              <span className={styles.label}>{t(item.labelKey)}</span>
            </button>
          ))}
        </div>
      </nav>
    </>
  );
}
