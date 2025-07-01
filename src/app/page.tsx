import Home from "./(tabs)/home/page";
import TabsLayout from "./(tabs)/layout";
import FCMHandler from "./_components/FCM/fcm-handler";

export default function WrappedTabsHome() {
  return (
    <TabsLayout>
      <Home />
    </TabsLayout>
  );
}
