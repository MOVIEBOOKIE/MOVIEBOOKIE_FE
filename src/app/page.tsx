import Home from "./(tabs)/home/page";
import TabsLayout from "./(tabs)/layout";

export default function WrappedTabsHome() {
  return (
    <TabsLayout>
      <Home />
    </TabsLayout>
  );
}
