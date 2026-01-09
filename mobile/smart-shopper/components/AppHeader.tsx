import { Wallet } from 'lucide-react-native';
import {Text, View} from 'react-native';
import {verifyInstallation} from 'nativewind';

export default function AppHeader() {
  verifyInstallation();
  return (
    <View className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 border-b border-border/40">
      <View  className="container max-w-lg mx-auto px-4 py-4">
        <View className="flex items-center gap-3">
          <View className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-sm">
            <Wallet className="h-5 w-5 text-primary-foreground" />
          </View>
          <View>
            <Text className="text-lg font-semibold text-foreground leading-tight">SmartCart</Text>
            <Text className="text-xs text-muted-foreground">Save on every shop</Text>
          </View>
        </View>
      </View>
    </View>
  );
}