import React, { useState } from 'react';
import { View, Text, TouchableOpacity, LayoutAnimation, Platform, UIManager } from 'react-native';
import { TrendingDown, Store, ChevronDown, ChevronUp, Trash2 } from 'lucide-react-native';
import { cn } from '../lib/utils';
import type { ShoppingListItem } from '../types/grocery';

// Enable layout animations for Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

interface GroceryItemCardProps {
  item: ShoppingListItem;
  onRemove: (id: string) => void;
  animationDelay?: number;
}

export function GroceryItemCard({ item, onRemove }: GroceryItemCardProps) {
  const [expanded, setExpanded] = useState(false);

  const cheapest = item.cheapestPrice;
  const savings = item.potentialSavings || 0;
  const sortedPrices = [...item.prices].sort((a, b) => a.price - b.price);

  const toggleExpand = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(!expanded);
  };

  return (
    <View className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden mb-3">
      {/* Main content */}
      <View className="p-4">
        <View className="flex-row items-start justify-between">
          <View className="flex-1 mr-2">
            <Text className="text-base font-semibold text-gray-900" numberOfLines={1}>
              {item.name}
            </Text>
            {item.category && (
              <Text className="text-xs text-gray-500 mt-0.5">{item.category}</Text>
            )}
          </View>
          
          {/* Custom Button Alternative */}
          <TouchableOpacity
            onPress={() => onRemove(item.id)}
            className="h-8 w-8 items-center justify-center rounded-full bg-gray-50 active:bg-red-50"
          >
            <Trash2 size={18} className="text-gray-400 active:text-red-500" />
          </TouchableOpacity>
        </View>

        {/* Best price display */}
        {cheapest && (
          <View className="mt-3 flex-row items-center">
            <View className="flex-row items-baseline gap-1">
              <Text className="text-2xl font-bold text-gray-900">
                ${cheapest.price.toFixed(2)}
              </Text>
              <Text className="text-sm text-gray-500">/ {item.unit}</Text>
            </View>
            
            {savings > 0 && (
              /* Custom Badge Alternative */
              <View className="ml-3 bg-green-100 px-2 py-1 rounded-full flex-row items-center">
                <TrendingDown size={12} color="#16a34a" />
                <Text className="text-green-700 text-xs font-bold ml-1">
                  Save ${savings.toFixed(2)}
                </Text>
              </View>
            )}
          </View>
        )}

        {/* Best store */}
        {cheapest && (
          <View className="mt-2 flex-row items-center">
            <Store size={14} className="text-gray-400" />
            <Text className="text-sm text-gray-500 ml-1.5">Best at</Text>
            <View className="ml-2 border border-gray-200 px-2 py-0.5 rounded-md">
              <Text className="text-xs font-medium text-gray-700">
                {cheapest.storeName}
              </Text>
            </View>
          </View>
        )}

        {/* Expand button */}
        {item.prices.length > 1 && (
          <TouchableOpacity
            onPress={toggleExpand}
            className="mt-4 flex-row items-center py-1"
          >
            {expanded ? (
              <View className="flex-row items-center">
                <ChevronUp size={14} className="text-gray-400" />
                <Text className="text-xs text-gray-500 ml-1">Hide prices</Text>
              </View>
            ) : (
              <View className="flex-row items-center">
                <ChevronDown size={14} className="text-gray-400" />
                <Text className="text-xs text-gray-500 ml-1">
                  Compare {item.prices.length} stores
                </Text>
              </View>
            )}
          </TouchableOpacity>
        )}
      </View>

      {/* Expanded price comparison */}
      {expanded && (
        <View className="border-t border-gray-100 bg-gray-50 p-3">
          {sortedPrices.map((price, index) => (
            <View 
              key={price.storeId}
              className={cn(
                "flex-row items-center justify-between py-2 px-3 rounded-lg mb-1",
                index === 0 ? "bg-green-50" : "bg-transparent"
              )}
            >
              <Text className={cn(
                "text-sm",
                index === 0 ? "font-bold text-green-700" : "text-gray-600"
              )}>
                {price.storeName}
              </Text>
              
              <View className="flex-row items-center">
                <Text className={cn(
                  "text-sm font-semibold mr-2",
                  index === 0 ? "text-green-700" : "text-gray-900"
                )}>
                  ${price.price.toFixed(2)}
                </Text>
                
                {!price.inStock && (
                  <View className="border border-red-200 px-1.5 py-0 rounded">
                    <Text className="text-[10px] text-red-500 font-medium uppercase">
                      Out of stock
                    </Text>
                  </View>
                )}
              </View>
            </View>
          ))}
        </View>
      )}
    </View>
  );
}