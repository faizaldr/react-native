import axios from "axios";

export const api = axios.create({
    baseURL:'http://10.10.206.169:3000',
    timeout: 5000,
})

export async function kirimPresensi(lat,lon,nama,waktu){
    try {
        const res = await api.post('/presensi',{lat:lat,lon:lon,nama:nama,waktu:waktu})
        return res.data
    } catch (error) {
        alert('gagal mengirim presensi')
        throw error
    }
}

export async function ambilPresensi(){
    try {
        const res = await api.get('/presensi')
        return res.data
    } catch (error) {
        alert('gagal mengambil presensi')
        throw error
    }
}