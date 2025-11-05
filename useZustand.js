import { create } from "zustand";

export const useZustand = create((set)=>({
    //state
    pengguna:'',
    //aksi
    login:(pengguna)=>set({pengguna}),
    logout:()=>set({pengguna:''})
}))