import { AddIcon } from "@chakra-ui/icons"
import { Box, Button, ButtonGroup, FormControl, FormLabel, HStack, Icon, IconButton, Input, Popover, PopoverArrow, PopoverCloseButton, PopoverContent, PopoverTrigger, Select, Stack, Text, useDisclosure } from "@chakra-ui/react"
import { ChangeEvent, ReactNode, useRef, useState } from "react"
import { IconType } from "react-icons"
import { useAlbumListUpdate } from "./contexts/AlbumContext"

interface AlbumHeaderProps {
    headerIcon?: IconType
    iconColor?: string
    children?: ReactNode
}

const AlbumHeader = ({ headerIcon, iconColor, children } : AlbumHeaderProps) => {
    const inputRef = useRef(null)
    const [name, setName] = useState("")
    const [coverId, setCoverId] = useState(0)
    const [coverColor, setCovereColor] = useState("#FFF")
    const { insertRequest } = useAlbumListUpdate()
    const [isDisabled, setIsDisabled] = useState(true)  // control submit button
    const [isLoading, setIsLoading] = useState(false)
    const { isOpen, onOpen, onClose } = useDisclosure()  // control popover

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const str = e.currentTarget.value
        setName(str);
        setIsDisabled(str.length === 0)
    }

    const handleClose = () => {
        setName("")
        onClose()
    }

    const handleInsert = () => {
        setIsLoading(true)
        insertRequest(name, coverId, coverColor)
        setIsLoading(false)
        handleClose()
    }

    return (
        <Box style={{width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
            <HStack>
                <Icon as={headerIcon} color={iconColor} />
                <Text>{children}</Text>
            </HStack>
            <Popover
                isOpen={isOpen}
                initialFocusRef={inputRef}
                onOpen={onOpen}
                onClose={handleClose}
                placement='auto'
                closeOnBlur={false}
            >
                <PopoverTrigger>
                    <IconButton variant="unstyled" size="xs" aria-label="Add tag" icon={<AddIcon />} />
                </PopoverTrigger>
                <PopoverContent p={5}>
                    <PopoverArrow />
                    <PopoverCloseButton />
                    <Stack spacing={4}>
                        <FormControl>
                            <FormLabel>New Album</FormLabel>
                            <Input size='sm' ref={inputRef} onChange={handleChange} />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Select Icon</FormLabel>
                            <Select
                                placeholder="Icon Format"
                                mt={3}
                                onChange={(e) => setCoverId(parseInt(e.currentTarget.value))}
                            >
                                <option value={0}>Default</option>
                                <option value={1}>Star</option>
                                <option value={2}>Favorite</option>
                                <option value={3}>Beach</option>
                                <option value={4}>Plane</option>
                                <option value={5}>Flag</option>
                                <option value={6}>Academic</option>
                                <option value={7}>Mountain</option>
                            </Select>
                        </FormControl>
                        <FormControl>
                            <FormLabel>Select Icon Color</FormLabel>
                            <Input
                                variant="filled"
                                type="color"
                                value={coverColor}
                                onChange={(e) => setCovereColor(e.currentTarget.value)}
                                mt={3}
                            />
                        </FormControl>

                        <ButtonGroup display='flex' justifyContent='flex-end'>
                            <Button size='sm' variant='outline' onClick={handleClose}>
                                Cancel
                            </Button>
                            <Button 
                                size='sm' 
                                isDisabled={isDisabled} 
                                isLoading={isLoading} 
                                onClick={handleInsert} 
                                colorScheme='teal'
                            >
                                Save
                            </Button>
                        </ButtonGroup>
                    </Stack>
                </PopoverContent>
            </Popover>
        </Box>
    )
}

export default AlbumHeader