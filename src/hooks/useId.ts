import { useEffect, useState } from "react";

const formatId = (pattern: string, id: number): string => {
   if (typeof window === "undefined") return '';
   return pattern.replace('*', id.toString());
}

let _id = 0;

export default function useId(pattern: string) {
   const [id] = useState(formatId(pattern, ++_id));
   return id;
}