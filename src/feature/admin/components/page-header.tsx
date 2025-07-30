import { Button, Grid, Title } from "@mantine/core";
import { IconPlus, IconReload } from "@tabler/icons-react";

interface Props {
	title: string;
	onAdd: () => void;
	onReload: () => void;
	isLoading?: boolean;
}

export const PageHeader = ({ title, onAdd, onReload, isLoading }: Props) => {
	return (
		<Grid p="sm">
			<Grid.Col span={{ base: 12, xs: 4, lg: 6 }}>
				<Title order={2}>{title}</Title>
			</Grid.Col>
			<Grid.Col span={{ base: 12, xs: 8, lg: 6 }}>
				<Grid
					type="container"
					breakpoints={{
						xs: "20em",
						sm: "30em",
						md: "40em",
						lg: "50em",
						xl: "60em",
					}}
				>
					<Grid.Col span={{ base: 12, xs: 6 }}>
						<Button
							rightSection={<IconPlus size={16} />}
							onClick={onAdd}
							fullWidth
							color="hops.7"
							loading={isLoading}
							aria-label={`Lägg till ${title.toLocaleUpperCase()}`}
						>
							Lägg till
						</Button>
					</Grid.Col>
					<Grid.Col span={{ base: 12, xs: 6 }}>
						<Button
							loading={isLoading}
							rightSection={<IconReload />}
							fullWidth
							variant="outline"
							onClick={onReload}
						>
							Ladda om
						</Button>
					</Grid.Col>
				</Grid>
			</Grid.Col>
		</Grid>
	);
};
