import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const usePropertyStore = create(
  persist(
    (set) => ({
      selectedProperty: '',
      selectProperty: ({ name, property_id }) => {
        set((state) => ({
          selectedProperty: (state.selectedProperty = { name, property_id }),
        }));
      },
      removeSelectProperty: ({ name, property_id }) => {
        set((state) => {
          if (
            state.selectedProperty &&
            state.selectedProperty.name == name &&
            state.selectedProperty.property_id == property_id
          ) {
            return (state.selectedProperty = {});
          }
          return state;
        });
      },
    }),
    {
      name: 'property-storage-select',
    },
  ),
);

export default usePropertyStore;
