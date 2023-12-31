import { useDisclosure } from "@mantine/hooks";
import { AppShell, Burger, Group } from "@mantine/core";
import { NavbarUser } from "./NavBarUser";

export function UserAppShell({ children }) {
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 300, breakpoint: "sm", collapsed: { mobile: !opened } }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          Header User
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p="md">
        <NavbarUser />
      </AppShell.Navbar>
      <AppShell.Main> {children} </AppShell.Main>
    </AppShell>
  );
}
