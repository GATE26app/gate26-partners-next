import React from 'react';

import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Button,
  ChakraProps,
  Text,
  VStack,
} from '@chakra-ui/react';

import {
  TokDocsMenuType,
  TokDocsSubMenuTitle,
} from '@components/common/TokDocsDevTool/_fragments/TokDocsModal/TokDocsModal.data';

import LinkButton from 'components/common/LinkButton';

interface MenuListProps {
  title: string;
  menuData: TokDocsMenuType[];
  selectedMenu: string;
  setMenu: (title: TokDocsSubMenuTitle) => void;
}

function DocsMenuList({
  title,
  menuData,
  selectedMenu,
  setMenu,
}: MenuListProps) {
  return (
    <Accordion w="100%" allowToggle mb="30px">
      <Text color="secondary.500" mb="20px" fontWeight="bold">
        {title}
      </Text>
      {menuData.map((menu, idx) => {
        return (
          <React.Fragment key={idx}>
            {menu.href ? (
              <AccordionItem style={{ border: '0px' }}>
                <AccordionButton //
                  w="100%"
                  px={0}
                  textAlign="left"
                  alignItems="center"
                  _hover={{ hover: 'none' }}
                  _focus={{ boxShadow: 'none' }}
                >
                  <LinkButton
                    href={menu.href}
                    target="_blank"
                    {...buttonStyles}
                  >
                    {menu.name}
                  </LinkButton>
                </AccordionButton>
              </AccordionItem>
            ) : (
              <AccordionItem style={{ border: '0px' }}>
                <AccordionButton //
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                  w="100%"
                  px={0}
                  _hover={{ hover: 'none' }}
                  _focus={{ boxShadow: 'none' }}
                >
                  <Button //
                    as="span"
                    {...{ ...buttonStyles }}
                  >
                    {menu.name}
                  </Button>
                  <AccordionIcon />
                </AccordionButton>
                <AccordionPanel p="0">
                  <VStack align="flex-start">
                    {menu.subMenu?.map((sub, idx) => {
                      if (sub.href)
                        return (
                          <LinkButton
                            {...buttonStyles}
                            key={idx}
                            href={sub.href}
                            fontWeight="normal"
                            target="_blank"
                          >
                            {sub.name}
                          </LinkButton>
                        );

                      return (
                        <Button
                          key={idx}
                          {...buttonStyles}
                          fontWeight="normal"
                          color={
                            sub.name === selectedMenu
                              ? 'primary.300'
                              : 'gray.800'
                          }
                          onClick={() => setMenu(sub.name)}
                        >
                          {sub.name}
                        </Button>
                      );
                    })}
                  </VStack>
                </AccordionPanel>
              </AccordionItem>
            )}
          </React.Fragment>
        );
      })}
    </Accordion>
  );
}

const buttonStyles: ChakraProps & { variant: string } = {
  variant: 'unstyled',
  cursor: 'pointer',
  py: '10px',
  px: 0,
  fontWeight: 'bold',
  color: 'gray.800',
  textAlign: 'left',
};

export default DocsMenuList;
