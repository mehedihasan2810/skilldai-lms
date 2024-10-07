import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface CourseTrackStore {
  bears: number;
  increase: (by: number) => void;
}

// Define a type that includes the middleware
export const useCourseTrackStore = create<CourseTrackStore>()(
  persist<CourseTrackStore>(
    (set, get) => ({
      bears: 1,
      increase: (by) => {
        console.log({by})
        set((state) => ({ bears: state.bears + by }))},
    }),
    {
      name: "track-course", // name of the item in storage (must be unique)
      storage: createJSONStorage(() => localStorage), // optional: specify the storage method (e.g., localStorage)
    }
  )
);

// import { create } from "zustand";
// import { persist, createJSONStorage } from "zustand/middleware";

// interface CourseTrackStore {
//   bears: number;
//   increase: (by: number) => void;
// }

// export const useCourseTrackStore = create<CourseTrackStore>(
//   persist<CourseTrackStore>(
//     (set, get) => ({
//       bears: 0,
//       increase: (by) => set((state) => ({ bears: state.bears + by })),
//     }),
//     {
//       name: "track-course", // name of the item in the storage (must be unique)
//     }
//   )
// );
