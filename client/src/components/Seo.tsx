import { useEffect } from "react";

type SeoProps = {
  title: string;
  description: string;
  url?: string;
  image?: string;
};

function ensureMeta(nameOrProp: { name?: string; property?: string }) {
  const selector = nameOrProp.name
    ? `meta[name="${nameOrProp.name}"]`
    : `meta[property="${nameOrProp.property}"]`;
  let el = document.head.querySelector(selector) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement("meta");
    if (nameOrProp.name) el.setAttribute("name", nameOrProp.name);
    if (nameOrProp.property) el.setAttribute("property", nameOrProp.property);
    document.head.appendChild(el);
  }
  return el;
}

export function Seo({ title, description, url, image }: SeoProps) {
  useEffect(() => {
    document.title = title;

    ensureMeta({ name: "description" }).setAttribute("content", description);

    ensureMeta({ property: "og:title" }).setAttribute("content", title);
    ensureMeta({ property: "og:description" }).setAttribute("content", description);
    ensureMeta({ property: "og:type" }).setAttribute("content", "website");

    if (url) ensureMeta({ property: "og:url" }).setAttribute("content", url);
    if (image) ensureMeta({ property: "og:image" }).setAttribute("content", image);

    ensureMeta({ name: "twitter:card" }).setAttribute("content", "summary_large_image");
    ensureMeta({ name: "twitter:title" }).setAttribute("content", title);
    ensureMeta({ name: "twitter:description" }).setAttribute("content", description);
    if (image) ensureMeta({ name: "twitter:image" }).setAttribute("content", image);
  }, [title, description, url, image]);

  return null;
}
