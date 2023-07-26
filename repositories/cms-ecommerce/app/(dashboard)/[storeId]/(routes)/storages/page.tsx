import { format } from "date-fns";

import prismadb from "@/lib/prismadb";

import { StorageColumn } from "./components/columns";
import { StorageClient } from "./components/client";

const StoragesPage = async ({ params }: { params: { storeId: string } }) => {
  const storages = await prismadb.storage.findMany({
    where: {
      storeId: params.storeId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedStorages: StorageColumn[] = storages.map((item) => ({
    id: item.id,
    name: item.name,
    value: item.value,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <StorageClient data={formattedStorages} />
      </div>
    </div>
  );
};

export default StoragesPage;
