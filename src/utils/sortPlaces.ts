import { IPlacesInput } from '../types';

export const sortPlaces = (data: ReadonlyArray<IPlacesInput>) => {
  const itemsWithGroupByCity: IPlacesInput[] = [];
  const otherItems: IPlacesInput[] = [];

  // Separating the items with true useGroupByCity and the rest
  data.forEach(item => {
    if (item.useGroupByCity) {
      itemsWithGroupByCity.push(item);
    } else {
      otherItems.push(item);
    }
  });

  // Sorting items with true useGroupByCity
  itemsWithGroupByCity.sort((a, b) => {
    if (a.id < b.id) return -1;
    if (a.id > b.id) return 1;
    return 0;
  });

  // Grouping the other items based on the city of the items with true useGroupByCity
  const groupedByCity: { [key: string]: IPlacesInput[] } = {};
  otherItems.forEach(item => {
    const foundGroup = itemsWithGroupByCity.find(groupItem => groupItem?.city?.id === item?.city?.id);
    const groupId = foundGroup ? foundGroup.id.toString() : 'other';
    groupedByCity[groupId] = groupedByCity[groupId] || [];
    if (groupId === 'other') {
      item.useGroupByCity = true;
    }
    groupedByCity[groupId].push(item);
  });

  // Rebuilding the Array by Ordering the Grouped Items and the Other Items
  const sortedGroupedData: IPlacesInput[] = [];
  itemsWithGroupByCity.forEach(groupItem => {
    sortedGroupedData.push(groupItem);
    const groupId = groupItem.id.toString();
    if (groupedByCity[groupId]) {
      sortedGroupedData.push(...groupedByCity[groupId]);
    }
  });

  const otherItemsSorted = groupedByCity['other'] || [];

  return [...sortedGroupedData, ...otherItemsSorted];
};