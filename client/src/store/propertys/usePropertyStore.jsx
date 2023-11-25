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
      removeSelectProperty: () => {
        set((state) => ({
          selectedProperty: (state.selectedProperty = ''),
        }));
      },
    }),
    {
      name: 'property-storage-select',
    },
  ),
);

export default usePropertyStore;
