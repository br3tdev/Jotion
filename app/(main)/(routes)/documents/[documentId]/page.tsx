"use client";

import Toolbar from "@/components/toolbar";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";

export interface IDocumentIdProps {
  params: {
    documentId: Id<"documents">;
  };
}

export default function DocumentId({ params }: IDocumentIdProps) {
  const document = useQuery(api.documents.getById, {
    documentId: params.documentId,
  });

  if (document === undefined) {
    return <div>Loading...</div>;
  }

  if (document === null) {
    return <div>Document not found</div>;
  }

  return (
    <div className="pb-40">
      <div className="md:max-w-3xl lg:max-w-4xl mx-auto">
        <div className="h-[20vh]" />
        <Toolbar initialData={document} />
      </div>
    </div>
  );
}
