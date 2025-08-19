import Image from "next/image";
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

/** Default renderer for plain Markdown images: keeps it simple & styled */
export function MdxImage(props: any) {
  const { src = "", alt = "", className = "", ...rest } = props;
  return (
    // plain <img> works for images in /public without knowing dims
    <img
      src={src}
      alt={alt}
      className={`rounded-xl border border-line my-3 ${className}`}
      {...rest}
    />
  );
}

/** Use this component in MDX when you want Next/Image optimization */
export function Figure({
  src,
  alt = "",
  width,
  height,
  caption,
  priority = false,
  className = "",
}: {
  src: string;
  alt?: string;
  width: number;
  height: number;
  caption?: string;
  priority?: boolean;
  className?: string;
}) {
  return (
    <figure className="my-4">
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        sizes="(max-width: 720px) 100vw, 720px"
        className={`rounded-xl border border-line ${className}`}
      />
      {caption ? (
        <figcaption className="text-muted text-sm mt-2">{caption}</figcaption>
      ) : null}
    </figure>
  );
}

export const mdxComponents = {
  img: MdxImage, // markdown ![]() will use this
  Figure, // explicit <Figure .../> for optimized images
  Button,
  Badge
};
