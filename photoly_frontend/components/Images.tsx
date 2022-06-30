import {Box, Flex, Image} from "@chakra-ui/react";
import {ReactNode} from "react";
import ImageContextMenu from "./ImageContextMenu";
import {useContextMenu} from "../hooks/useContextMenu";

export default function Images(): ReactNode{
    const [showContext, handleContextMenu, anchorPoint] = useContextMenu();
    return (
        <>
            <Flex w={"100%"} justifyContent={"flex-start"} wrap={"wrap"}>
                <Box maxW='sm' overflow='hidden' p={2} onContextMenu={handleContextMenu}>
                    <Image src={"https://bit.ly/2Z4KKcF"} alt={"image"} borderRadius='lg'/>
                </Box>
                <Box maxW='sm' overflow='hidden' p={2} onContextMenu={handleContextMenu}>
                    <Image src={"https://bit.ly/2Z4KKcF"} alt={"image"} borderRadius='lg'/>
                </Box>
            </Flex>
            {showContext && <ImageContextMenu x={anchorPoint.x} y={anchorPoint.y}/>}
        </>

    )
}