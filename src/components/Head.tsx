import NextHead from "next/head";
import { FC, useMemo } from "react";

type Props = {
   title?: string;
   description?: string;
};

const seoConfig = {
   title: "Felix Grohs",
   teaser: "Fullstack Web Developer",
   seperator: ' - ',
   description: ''
};

const Head: FC<Props> = ({
   title: titleRaw,
   description: descriptionRaw
}) => {

   const title = useMemo(() => {
      return [titleRaw, seoConfig.title, seoConfig.teaser]
         .filter(Boolean)
         .join(seoConfig.seperator);
   }, [titleRaw]);

   const description = useMemo(() => {
      return descriptionRaw ?? seoConfig.description;
   }, [descriptionRaw]);

   return (
      <NextHead>
         <title>{title}</title>
         <meta name='title' property='og:title' content={title} />
         <meta name='description' property='og:description' content={description} />
      </NextHead>
   )
};

export default Head;