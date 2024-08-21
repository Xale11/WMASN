import { Flex } from "@chakra-ui/react";
import { Product } from "../data/StoreData";
import StoreCard from "./StoreCard";

interface Props {
  items: Product[] | undefined;
}

const StoreGrid = ({ items }: Props) => {
  return (
    <Flex
      w={"100%"}
      flexWrap={"wrap"}
      justifyContent={"center"}
      columnGap={"2em"}
      rowGap={"1em"}>
      {items &&
        items.map((item) => {
          return <StoreCard item={item} />;
        })}
    </Flex>
  );
};

export default StoreGrid;
