import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const SITE = "https://thekingslibrary.in";
const SITE_NAME = "The King's Library";

const DEFAULT = {
  title: `${SITE_NAME} | 24×7 Study Library in Prayagraj`,
  description:
    "The King's Library in George Town, Prayagraj — a 24×7 peaceful study library with Wi‑Fi, AC, numbered desks, book store, and seat booking.",
};

/** Per-route titles & descriptions for Google when users land on inner pages. */
const PAGE_META = {
  "/": DEFAULT,
  "/gallery": {
    title: `Gallery | ${SITE_NAME} Prayagraj`,
    description:
      "View photos of The King's Library in Prayagraj — study desks, reading hall, AC rooms, and facilities for focused self-study.",
  },
  "/books": {
    title: `Book Store | Rent & Buy Books | ${SITE_NAME}`,
    description:
      "Search, rent, or purchase books from The King's Library in Prayagraj. Competitive exam books, study material, and real-time availability.",
  },
  "/seats": {
    title: `Reserve a Study Seat | ${SITE_NAME} Prayagraj`,
    description:
      "Book a study seat online at The King's Library, George Town, Prayagraj. Real-time seat availability by date and time slot.",
  },
  "/register": {
    title: `Student Registration | ${SITE_NAME}`,
    description:
      "Register online for a study seat at The King's Library, Prayagraj. 24×7 peaceful environment for competitive exam and academic preparation.",
  },
  "/login": {
    title: `Student Sign In | ${SITE_NAME}`,
    description:
      "Sign in to your The King's Library student portal — view fees, pay online, manage bookings, and access your dashboard.",
  },
  "/contact": {
    title: `Contact Us | ${SITE_NAME} George Town, Prayagraj`,
    description:
      "Contact The King's Library: Rajat Keshari, 20D/1E/13 C.Y. Chintamani Road, George Town, Prayagraj. Call 8382829192. Open 24×7.",
  },
  "/enquiries": {
    title: `Enquiries | ${SITE_NAME}`,
    description:
      "Send an enquiry to The King's Library, Prayagraj — ask about membership, book availability, seat booking, or library facilities.",
  },
  "/careers": {
    title: `Careers | ${SITE_NAME}`,
    description:
      "Career opportunities at The King's Library, Prayagraj. Join our team and help build an ideal place for learners.",
  },
};

function setMeta(name, content, attr = "name") {
  if (!content) return;
  let el = document.querySelector(`meta[${attr}="${name}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function setCanonical(href) {
  let el = document.querySelector('link[rel="canonical"]');
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", "canonical");
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

export default function PageMeta() {
  const { pathname } = useLocation();

  useEffect(() => {
    const meta = PAGE_META[pathname] || DEFAULT;
    const path = pathname === "/" ? "" : pathname;
    const url = `${SITE}${path}`;

    document.title = meta.title;

    setMeta("description", meta.description);
    setMeta("og:title", meta.title, "property");
    setMeta("og:description", meta.description, "property");
    setMeta("og:url", url, "property");
    setMeta("twitter:title", meta.title);
    setMeta("twitter:description", meta.description);

    setCanonical(url);
  }, [pathname]);

  return null;
}
