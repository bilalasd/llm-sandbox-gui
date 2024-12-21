// HeaderExample.js
"use client";
import { Box, Button, Header, Nav, Text } from "grommet";
import { Menu } from "grommet-icons";
import Link from "next/link";
import { useState } from "react";

export const CustomHeader = () => {
  const [show, setShow] = useState(false);

  const items = [
    { label: "Home", id: 1, link: "/" },
    { label: "Applications", id: 2, link: "/" },
    { label: "Settings", id: 3, link: "/settings" },
  ];

  return (
    <Header
      fill="horizontal"
      pad={{ vertical: "small" }}
      background="background-back"
    >
      {/* Logo */}
      <Button>
        <Box
          direction="row"
          align="start"
          gap="medium"
          pad={{ vertical: "small" }}
          responsive={false}
        >
          {/* <Hpe color="brand" /> */}

          <Box direction="row" gap="xsmall" wrap>
            <Text color="text-strong" weight="bold">
              HPE
            </Text>
            <Text color="text-strong">LLM Starter Kit Dashboard</Text>
          </Box>
        </Box>
      </Button>
      <Nav direction="row" gap="small">
        {items.map((item) => (
          <Link href={`${item.link}`} key={item.id}>
            <Button label={item.label} />
          </Link>
        ))}
      </Nav>
      <div className="lg:hidden">
        <Button
          a11yTitle="Search"
          icon={<Menu />}
          hoverIndicator
          onClick={() => {
            setShow(!show);
          }}
        />
      </div>
      {/* </Link> */}
    </Header>
  );
};
