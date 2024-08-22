import { ContextProvider } from "@/contexts/context";
import { ProtectedRoutesProvider } from "@/providers/protectedRoutes.provider";
import { AzureProvider } from "@/providers/azureMsal.provider";
import { ColorThemeProvider } from "@/providers/colorTheme.provider";
import { LoadSettingsProvider } from "@/providers/loadSettings.provider";



export default ({ Component, pageProps }) => {
	return (
		<ContextProvider>
			<ColorThemeProvider>
				<AzureProvider>
					<ProtectedRoutesProvider>
						<LoadSettingsProvider>
							<Component { ...pageProps } />
						</LoadSettingsProvider>
					</ProtectedRoutesProvider>
				</AzureProvider>
			</ColorThemeProvider>
		</ContextProvider>
	);
}