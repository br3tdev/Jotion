"use client";

import Image from "next/image";
import { useUser } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

export interface IDocumentsPageProps {}

export default function DocumentsPage(props: IDocumentsPageProps) {
  const { user } = useUser();
  return (
    <div className="h-full flex flex-col items-center justify-center space-y-4">
      <Image
        src={"/empty.png"}
        alt="Empty"
        width={300}
        height={300}
        className="dark:hidden"
      />

      <Image
        src={"/empty-dark.png"}
        alt="Empty"
        width={300}
        height={300}
        className="hidden dark:block"
      />

      <h2 className="text-lg font-medium">
        Welcome to {user?.firstName}&apos;s Jotion
      </h2>
      <Button>
        <PlusCircle className="mr-2 h-4 w-4" />
        Create a document
      </Button>
    </div>
  );
}
