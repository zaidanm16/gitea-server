import Link from "next/link";

import Container from "@/components/ui/Container";
import MainNav from "@/components/MainNav";
import getCategories from "@/actions/get-categories";
import NavAction from "./NavAction";

const Navbar = async () => {
  const categories = await getCategories();

  return (
    <div className="border-b">
      <Container>
        <div className="relative px-4 sm:px-6 lg:px-8 flex h-16 items-center">
          <Link href="/" className="ml-4 flex lg:ml-0 gap-x-2">
            <p className="font-bold text-xl">EVAShop</p>
          </Link>
          <MainNav data={categories} />
          <NavAction />
        </div>
      </Container>
    </div>
  );
};

export default Navbar;
