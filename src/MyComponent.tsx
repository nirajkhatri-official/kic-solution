import React, {useState, useEffect, useRef} from 'react';
import {Text, View, TouchableOpacity, FlatList, TextInput} from 'react-native';

type Item = {
  id: number;
  name: string;
};

type MyComponentProps = {
  data: Item[];
};

const MyComponent = ({data = []}: MyComponentProps) => {
  const [selectedItems, setSelectedItems] = useState<Set<number>>(new Set());
  const [dataSource, setDataSource] = useState<Item[]>(data);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const inputRef = useRef<TextInput>(null);

  useEffect(() => {
    const filteredData = data.filter(item =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()),
    );
    setDataSource(filteredData);
  }, [searchTerm, data]);

  const handleSelect = (item: Item) => {
    setSelectedItems(current => {
      const updated = new Set(current);
      if (updated.has(item.id)) {
        updated.delete(item.id);
      } else {
        updated.add(item.id);
      }
      return updated;
    });
  };

  const handleClear = () => {
    setSearchTerm('');
    setDataSource(data);
    inputRef?.current?.clear();
  };

  return (
    <View>
      <TextInput
        placeholder="Search on list"
        ref={inputRef}
        onChangeText={setSearchTerm}
        value={searchTerm}
        accessibilityLabel="Search Input"
      />
      <TouchableOpacity onPress={handleClear}>
        <Text>Clear</Text>
      </TouchableOpacity>
      <FlatList
        data={dataSource}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}: {item: Item}) => {
          const isSelected = selectedItems.has(item.id);
          return (
            <TouchableOpacity onPress={() => handleSelect(item)}>
              <Text>{item.name}</Text>
              <Text
                accessibilityLabel={`${item?.name} ${
                  isSelected ? 'Selected' : 'Not Selected'
                }`}>
                {isSelected ? 'Selected' : 'Not Selected'}
              </Text>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default MyComponent;
