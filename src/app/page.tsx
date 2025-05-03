import TabsLayout from "./(tabs)/layout";
import Page from "./(tabs)/page";

export default function WrappedTabsHome() {
  return <TabsLayout>{<Page />}</TabsLayout>;
}
