"use client";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { RamColumn, columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import ApiList from "@/components/ui/api-list";

interface RamClientProps {
  data: RamColumn[];
}

export const RamClient: React.FC<RamClientProps> = ({ data }) => {
  const router = useRouter();
  const params = useParams();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Ram (${data.length})`}
          description="Manage RAM for your store"
        />
        <Button onClick={() => router.push(`/${params.storeId}/rams/new`)}>
          <Plus className=" mr-2 h-4 w-4" />
          Add New
        </Button>
      </div>
      <Separator />
      <DataTable columns={columns} data={data} searchKey={"name"} />
      <Heading title="API" description={"API calls for RAMs"} />
      <Separator />
      <ApiList entityName="rams" entityIdName="ramId" />
    </>
  );
};
