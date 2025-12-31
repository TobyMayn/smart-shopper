import React from 'react';
import { View, Text, Platform } from 'react-native';
import { Wallet } from 'lucide-react-native';

export function AppHeader() {
  return (
    <View 
      // Safe Area handling is usually done in the parent Layout, 
      // but we add a border and background here.
      className="bg-background border-b border-border/40 z-50"
      style={{
        // Mimicking the "sticky" look if not using a Stack header
        paddingTop: Platform.OS === 'ios' ? 0 : 10 
      }}
    >
      <View className="max-w-lg mx-auto px-4 py-4">
        <View className="flex-row items-center gap-3">
          
          {/* Icon Container */}
          <View className="w-10 h-10 rounded-xl bg-primary items-center justify-center shadow-sm">
            <Wallet size={20} className="text-primary-foreground" />
          </View>

          {/* Text Container */}
          <View>
            <Text className="text-lg font-semibold text-foreground leading-tight">
              SmartCart
            </Text>
            <Text className="text-xs text-muted-foreground">
              Save on every shop
            </Text>
          </View>

        </View>
      </View>
    </View>
  );
}