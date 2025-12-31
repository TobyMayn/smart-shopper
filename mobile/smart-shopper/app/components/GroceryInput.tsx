import { useState, useEffect, useRef } from 'react';
import { View, TextInput, Pressable, Text, ActivityIndicator, Keyboard } from 'react-native';
import { Search, Plus } from 'lucide-react-native';
import { cn } from '../lib/utils'; // Assuming you're using NativeWind
import { getSuggestions } from '../services/groceryService';

interface GroceryInputProps {
  onAdd: (itemName: string) => void;
  isLoading?: boolean;
}

export function GroceryInput({ onAdd, isLoading }: GroceryInputProps) {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<TextInput>(null);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (query.length >= 2) {
        const results = await getSuggestions(query);
        setSuggestions(results);
        setShowSuggestions(results.length > 0);
      } else {
        setSuggestions([]);
        setShowSuggestions(false);
      }
    };

    const debounce = setTimeout(fetchSuggestions, 150);
    return () => clearTimeout(debounce);
  }, [query]);

  const handleAdd = (value: string) => {
    const trimmed = value.trim();
    if (trimmed) {
      onAdd(trimmed);
      setQuery('');
      setSuggestions([]);
      setShowSuggestions(false);
      Keyboard.dismiss(); // Closes the mobile keyboard
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    handleAdd(suggestion);
  };

  return (
    <View className="relative w-full z-50">
      <View className="flex-row gap-2 items-center">
        {/* Input Container */}
        <View className="relative flex-1 justify-center">
          <View className="absolute left-3 z-10">
            <Search size={18} className="text-muted-foreground" />
          </View>
          
          <TextInput
            ref={inputRef}
            placeholder="Add grocery item..."
            placeholderTextColor="#9ca3af"
            value={query}
            onChangeText={setQuery}
            onSubmitEditing={() => handleAdd(query)}
            onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
            className={cn(
              "h-12 pl-10 pr-4 bg-card border border-border/60 rounded-xl text-foreground",
              isLoading && "opacity-50"
            )}
            editable={!isLoading}
          />
        </View>

        {/* Add Button */}
        <Pressable 
          onPress={() => handleAdd(query)}
          disabled={!query.trim() || isLoading}
          className={cn(
            "h-12 w-12 items-center justify-center rounded-xl bg-primary",
            (!query.trim() || isLoading) && "opacity-50"
          )}
        >
          {isLoading ? (
            <ActivityIndicator color="white" size="small" />
          ) : (
            <Plus size={24} color="white" />
          )}
        </Pressable>
      </View>

      {/* Suggestions dropdown */}
      {showSuggestions && suggestions.length > 0 && (
        <View 
          className="absolute top-14 left-0 right-14 bg-card rounded-xl border border-border shadow-lg overflow-hidden z-50"
          style={{ elevation: 5 }} // Required for Android shadow/layering
        >
          {suggestions.map((suggestion) => (
            <Pressable
              key={suggestion}
              onPress={() => handleSuggestionClick(suggestion)}
              className="w-full px-4 py-4 border-b border-border/20 active:bg-muted"
            >
              <Text className="text-foreground text-sm font-medium">
                {suggestion}
              </Text>
            </Pressable>
          ))}
        </View>
      )}
    </View>
  );
}